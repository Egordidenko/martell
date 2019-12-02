<template>
    <div class="product-item">
    <DragCursor :isLight="true"></DragCursor>

     <ProductsThumbs
       :active-product="activeProduct"
       :opened-product="openedProduct"
       @setActiveProd="setActiveProd"
       @setOpenedProd="setOpenedProd"
     />

      <div class="container text-center">

        <div class="product-item__view flex flex__fdc">
          <div class="product-item__img">
            <img :src="prod.image" :alt="prod.name">
          </div>
          <h1 class="product-item__title">{{ prod.name }}</h1>
          <p>{{ prod.description }}</p>

          <div class="product-item__buttons">
            <a class="btn" href="" v-on:click.prevent="saveProduct" v-tooltip="collectTooltip" v-on:mouseover="noticeAboutSavedProduct" v-on:mouseout="hideNoticeAboutSaved">
              Collect
            </a>
            <a v-if="prod.purchaseLink" class="btn" :href="prod.purchaseLink" target="_blank">purchase</a>
          </div>
          <div class="product-item__links">
            <a class="link" href="" v-on:click.prevent="copyToClipboard" v-tooltip="copyLinkTooltip">share</a>
            <input type="hidden" id="share-link" :value="siteUrl">
            <a v-if="prod.detailsLink" class="link" :href="prod.detailsLink" target="_blank">details</a>
          </div>
        </div>

        <div v-html="prod.contentHTML" class="product-item__content"></div>

        <!--div class="product-item__add">
          <h5 class="text">Paired perfectly with</h5>
          <div class="product-item__add-slider slider-container">
            <div class="slider-wrapper">
              <div class="product-slot slider-slide">
                <img src="/prods/text/1.png" alt="">
                <p>Haku Table</p>
              </div>
              <div class="product-slot slider-slide">
                <img src="/prods/text/2.png" alt="">
                <p>Haku Table</p>
              </div>
              <div class="product-slot slider-slide">
                <img src="/prods/text/3.png" alt="">
                <p>Haku Table</p>
              </div>
            </div>
          </div>
        </div-->

        <nuxt-link :to="{name: 'room'}" class="text__content_back flex flex__fdc">
          <span class="text">Return to</span>
          <span class="title">{{ roomData.name }}</span>
        </nuxt-link>
      </div>
    </div>
</template>

<script>
  import Vue from 'vue'
  import DragCursor from '~/components/DragCursor.vue'
  import ProductsThumbs from '~/components/ProductsThumbs.vue';
  import {mapGetters, mapActions} from 'vuex';
  import Swiper from 'swiper';
  import VTooltip from 'v-tooltip';

  Vue.use(VTooltip)

  export default {
    components: {
      DragCursor,
      ProductsThumbs,
      Swiper
      //VideoForRoom,
    },
    data() {
      return {
        confirmationPopupIsOpened: false,
        activeProduct: '',
        openedProduct: '',
        slider: null,
        siteUrl: window.location.href,
        copyLinkTooltip: {
          content: "",
          placement: 'top-center',
          trigger: 'manual',
          show: false,
        },
        collectTooltip: {
          content: "item already in your collection",
          placement: 'top-center',
          trigger: 'manual',
          show: false,
        }
      }
    },
    middleware: 'auth',
    computed: {
      ...mapGetters({
        roomsData: 'rooms/getRoomsData',
        isProductSaved: 'collection/isProductSaved',
      }),
      roomData() {
        return this.roomsData[this.$route.params.room];
      },
      products() {
        return this.roomData.products;
      },
      prod() {
        return this.products[this.$route.params.product];
      },
      isSaved() {
        return this.isProductSaved(this.$route.params.room + '/' + this.$route.params.product);
      },
      saveBtnText() {
        return this.isSaved ? 'saved' : 'save';
      },
    },
    created() {
      if(!this.prod) {
        this.$router.replace({path: '/'});
      }
    },
    mounted() {
      document.querySelector('.pageWrapper').classList.add('light');
      window.scrollTo(0, 0);
      this.init();

    setTimeout(() => {
      this.isRouteDone();
    }, 800);

    },
    updated() {
      this.init();
    },
    destroyed() {
    },
    methods: {
      ...mapActions({
        addProductToCollection: 'collection/addProductToCollection',
      }),

      isRouteDone() {
        let product = document.querySelector('.product-item');
        product.classList.add('transition-done');
      },


      init() {

          this.slider = document.querySelector('.product-item .slider-container');

          let swiper = new Swiper (this.slider, {
            init: true,
            // loop: true,
            slidesPerView: 1,
            grabCursor: true,
            wrapperClass: 'slider-wrapper',
            slideClass: 'slider-slide',
            navigation: {
              nextEl: '.slider-button-next',
              prevEl: '.slider-button-prev',
            },
            breakpoints: {
              1024: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
            }
          })

          document.querySelectorAll('.product-item__slider .slider-slide').forEach(item => {
            item.addEventListener('mouseover', () => {
              document.querySelector('.drag-cursor').classList.add('is-visible')
            })
            item.addEventListener('mouseout', () => {
              document.querySelector('.drag-cursor').classList.remove('is-visible')
            })
          })

          this.$store.commit('lastpage/SET_NAME', this.prod.name);

          // this.headerChangeDark();

          this.relatedSlider = document.querySelector('.product-item__add-slider');
          let related = new Swiper (this.relatedSlider, {
            slidesPerView: 1,
            spaceBetween: 16,
            wrapperClass: 'slider-wrapper',
            slideClass: 'slider-slide',
            breakpoints: {
              768: {
                slidesPerView: 'auto',
                allowTouchMove: false,
              }
            }
          })

      },

      closeConfirmationPopup() {
        this.confirmationPopupIsOpened = false;
      },
      openConfirmationPopup() {
        this.confirmationPopupIsOpened = true;
      },
      headerChangeDark() {
        let header = document.querySelector('.header');
        header.classList.add('is-dark')
      },

      setActiveProd(id) {
        this.activeProduct = id;
      },
      setOpenedProd(id) {
        this.activeProduct = '';
        this.$router.push({path: `/${this.$route.params.room}/${id}`});
      },

      copyToClipboard() {
        let textToCopy = document.querySelector('#share-link')
        textToCopy.setAttribute('type', 'text')
        textToCopy.select()

        try {
          let successful = document.execCommand('copy');
          var msg = successful ? 'successfully' : 'unsuccessfully';
          this.copyLinkTooltip.content = 'Link was copied ' + msg;
          this.copyLinkTooltip.show = true;
        } catch (err) {
          this.copyLinkTooltip.content = 'Oops, unable to copy';
          this.copyLinkTooltip.show = true;
        }

        setTimeout(() => {
          this.copyLinkTooltip.show = false;
        }, 2000)

        textToCopy.setAttribute('type', 'hidden')
        window.getSelection().removeAllRanges()
      },

      saveProduct(event) {
        if (!this.isSaved) {
          this.addProductToCollection(this.$route.params.room + '/' + this.$route.params.product);
          event.target.classList.add('is-active');
          setTimeout(() => {
            event.target.classList.remove('is-active');
          }, 2000);
        }
      },

      noticeAboutSavedProduct() {
        if (this.isSaved) {
          this.collectTooltip.show = true;
        }
      },

      hideNoticeAboutSaved() {
        this.collectTooltip.show = false;
      }

    },
  };
</script>

<style lang="scss">
  .product-item {
    position: relative;
    z-index: 1;
    width: 100vw;

    .container {
      padding: 0 50px;
      @media (max-width: 767px) {
        padding: 0 15px;
      }
    }

    .product-item__view {
      position: relative;
      padding: 140px 0 88px;
      text-align: center;
      @media (max-width: 767px) {
        padding: 60px 0 36px;
      }

      &::before {
        position: absolute;
  		  content: '';
  		  left: -50vw;
  		  right: -50vw;
  		  top: 0;
        bottom: 0;
  		  background-color: #F8F8F8;
      }

      >* {
        position: relative;
        z-index: 10;
      }

      p {
        margin: 0 auto 18px;
        max-width: 580px;
      }
    }

  .text-center {
    transform: translate3d(0, 30px, 0);
    }

    &__img {
      margin-bottom: 24px;
      text-align: center;

      img {
        @media (max-width: 767px) {
          max-width: 195px;
        }
      }
    }

    .product-item__title {
      margin-bottom: 14px;
      font-size: 60px;
      @media (max-width: 767px) {
        font-size: 30px;
      }
    }

    .product-item__buttons {
      margin-bottom: 24px;
      @media (max-width: 767px) {
        margin-bottom: 16px;
      }

      >* {
        &:not(:first-child) {
          margin-left: 10px;
        }
      }
    }

    .product-item__links {
      >* {
        display: inline-block;
        &:not(:first-child) {
          margin-left: 8px;
        }
      }
    }

	  .text__content {
    $img1-width: percentage(380/980);
		.blockquote {
      display: flex;
      align-items: flex-start;
      position: relative;
      padding-top: 105px;
      margin: 0 auto 164px;
      max-width: 1015px;
      color: #fff;
      @media (max-width: 1023px) {
        margin-bottom: 90px;
        padding-top: 145px;
        flex-direction: column;
      }
      @media (max-width: 767px) {
        margin-bottom: 40px;
        padding-top: 130px;
      }

      &::before {
        position: absolute;
  		  content: '';
  		  left: -50vw;
  		  right: -50vw;
  		  top: 0;
        height: 560px;
  		  background-color: #001545;
        background-image: url(/prods/background_texture.jpeg);
        background-repeat: no-repeat;
        background-size: cover;
        @media (max-width: 1023px) {
          height: auto;
          bottom: 180px;
        }
        @media (max-width: 767px) {
          bottom: 75px;
        }
      }

      img, blockquote {
        position: relative;
        z-index: 10;
      }

      >img {
        z-index: 50;
        width: $img1-width;
        flex: none;
        @media (max-width: 1023px) {
          width: auto;
          max-width: 238px;
        }
        @media (max-width: 767px) {
          max-width: 165px;
        }
      }
		}

		blockquote {
      @media (max-width: 1023px) {
        margin-top: 90px;
        width: 100%;
      }
      @media (max-width: 767px) {
        margin-top: 40px;
      }

      $text-padding-left: 120px;
      $text-padding-left-md: 86px;
      $text-padding-left-sm: 60px;
		  p {
        position: relative;
        padding-left: $text-padding-left;
        font-family: 'SangBleuEmpire-Regular';
  			font-size: 40px;
        line-height: (50/40);
        letter-spacing: -0.02px;
        @media (max-width: 1023px) {
          padding-left: $text-padding-left-md;
          max-width: 580px;
        }
        @media (max-width: 767px) {
          padding-left: $text-padding-left-sm;
          font-size: 30px;
        }

        &::before {
          content: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHdpZHRoPSIzMnB4IiBoZWlnaHQ9IjI3cHgiIHZpZXdCb3g9IjAgMCAzMiAyNyIgdmVyc2lvbj0iMS4xIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gIDxkZXNjPkNyZWF0ZWQgd2l0aCBMdW5hY3k8L2Rlc2M+ICA8cGF0aCBkPSJNMCAxNy41OTM1QzAgMjMuNDI5IDQuMjc4MDcgMjcgOC40NzA1OSAyN0MxMi4wNjQyIDI3IDE0Ljg4NzcgMjQuODIyNiAxNC44ODc3IDIxLjE2NDVDOS4yNDA2NCAxOS43NzEgNi4yNDU5OSAxNi4yIDYuMjQ1OTkgMTIuMDE5NEM2LjI0NTk5IDguNjIyNTggOC41NTYxNSA0LjYxNjEzIDE0LjIwMzIgMC42OTY3NzRMMTMuODYxIDBDNC40NDkyIDUuNzQ4MzkgMCAxMS42NzEgMCAxNy41OTM1Wk0xNy4xMTIzIDE3LjU5MzVDMTcuMTEyMyAyMy40MjkgMjEuMzkwNCAyNyAyNS41ODI5IDI3QzI5LjE3NjUgMjcgMzIgMjQuODIyNiAzMiAyMS4xNjQ1QzI2LjM1MjkgMTkuNzcxIDIzLjM1ODMgMTYuMiAyMy4zNTgzIDEyLjAxOTRDMjMuMzU4MyA4LjYyMjU4IDI1LjY2ODUgNC42MTYxMyAzMS4zMTU1IDAuNjk2Nzc0TDMwLjk3MzMgMEMyMS41NjE1IDUuNzQ4MzkgMTcuMTEyMyAxMS42NzEgMTcuMTEyMyAxNy41OTM1WiIgaWQ9IuKAnCIgZmlsbD0iI0ZGRkZGRiIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9Im5vbmUiIC8+PC9zdmc+);
          position: absolute;
          top: 0;
          left: 70px;
          @media (max-width: 1023px) {
            left: 40px;
          }
          @media (max-width: 767px) {
            content: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHdpZHRoPSIyNHB4IiBoZWlnaHQ9IjIwcHgiIHZpZXdCb3g9IjAgMCAyNCAyMCIgdmVyc2lvbj0iMS4xIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gIDxkZXNjPkNyZWF0ZWQgd2l0aCBMdW5hY3k8L2Rlc2M+ICA8cGF0aCBkPSJNMCAxMy4wMzIzQzAgMTcuMzU0OCAzLjE2ODk0IDIwIDYuMjc0NTEgMjBDOC45MzY0MiAyMCAxMS4wMjc5IDE4LjM4NzEgMTEuMDI3OSAxNS42Nzc0QzYuODQ0OTIgMTQuNjQ1MiA0LjYyNjY2IDEyIDQuNjI2NjYgOC45MDMyM0M0LjYyNjY2IDYuMzg3MSA2LjMzNzg5IDMuNDE5MzUgMTAuNTIwOSAwLjUxNjEyOUwxMC4yNjc0IDBDMy4yOTU3IDQuMjU4MDYgMCA4LjY0NTE2IDAgMTMuMDMyM1pNMTIuNjc1OCAxMy4wMzIzQzEyLjY3NTggMTcuMzU0OCAxNS44NDQ3IDIwIDE4Ljk1MDMgMjBDMjEuNjEyMiAyMCAyMy43MDM3IDE4LjM4NzEgMjMuNzAzNyAxNS42Nzc0QzE5LjUyMDcgMTQuNjQ1MiAxNy4zMDI0IDEyIDE3LjMwMjQgOC45MDMyM0MxNy4zMDI0IDYuMzg3MSAxOS4wMTM3IDMuNDE5MzUgMjMuMTk2NyAwLjUxNjEyOUwyMi45NDMyIDBDMTUuOTcxNSA0LjI1ODA2IDEyLjY3NTggOC42NDUxNiAxMi42NzU4IDEzLjAzMjNaIiBpZD0i4oCcIiBmaWxsPSIjRkZGRkZGIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZT0ibm9uZSIgLz48L3N2Zz4=);
            left: 20px;
          }
        }

        &::after {
          content: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHdpZHRoPSIzM3B4IiBoZWlnaHQ9IjI4cHgiIHZpZXdCb3g9IjAgMCAzMyAyOCIgdmVyc2lvbj0iMS4xIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gIDxkZXNjPkNyZWF0ZWQgd2l0aCBMdW5hY3k8L2Rlc2M+ICA8cGF0aCBkPSJNMTQuODg3NyA5LjQwNjQ1QzE0Ljg4NzcgMy41NzA5NyAxMC42MDk2IDAgNi40MTcxMSAwQzIuODIzNTMgMCAwIDIuMTc3NDIgMCA1LjgzNTQ4QzUuNjQ3MDYgNy4yMjkwMyA4LjY0MTcxIDEwLjggOC42NDE3MSAxNC45ODA2QzguNjQxNzEgMTguMzc3NCA2LjMzMTU1IDIyLjM4MzkgMC42ODQ0OTIgMjYuMzAzMkwxLjAyNjc0IDI3QzEwLjQzODUgMjEuMjUxNiAxNC44ODc3IDE1LjMyOSAxNC44ODc3IDkuNDA2NDVaTTMyIDkuNDA2NDVDMzIgMy41NzA5NyAyNy43MjE5IDAgMjMuNTI5NCAwQzE5LjkzNTggMCAxNy4xMTIzIDIuMTc3NDIgMTcuMTEyMyA1LjgzNTQ4QzIyLjc1OTQgNy4yMjkwMyAyNS43NTQgMTAuOCAyNS43NTQgMTQuOTgwNkMyNS43NTQgMTguMzc3NCAyMy40NDM4IDIyLjM4MzkgMTcuNzk2OCAyNi4zMDMyTDE4LjEzOSAyN0MyNy41NTA4IDIxLjI1MTYgMzIgMTUuMzI5IDMyIDkuNDA2NDVaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjUgMC41KSIgaWQ9IuKAnSIgZmlsbD0iI0ZGRkZGRiIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9Im5vbmUiIC8+PC9zdmc+);
          display: inline-block;
          margin-left: 20px;
          @media (max-width: 767px) {
            content: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHdpZHRoPSIyNXB4IiBoZWlnaHQ9IjIxcHgiIHZpZXdCb3g9IjAgMCAyNSAyMSIgdmVyc2lvbj0iMS4xIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gIDxkZXNjPkNyZWF0ZWQgd2l0aCBMdW5hY3k8L2Rlc2M+ICA8cGF0aCBkPSJNMTEuMDI3OSA2Ljk2Nzc0QzExLjAyNzkgMi42NDUxNiA3Ljg1ODk4IDAgNC43NTM0MiAwQzIuMDkxNSAwIDAgMS42MTI5IDAgNC4zMjI1OEM0LjE4MzAxIDUuMzU0ODQgNi40MDEyNyA4IDYuNDAxMjcgMTEuMDk2OEM2LjQwMTI3IDEzLjYxMjkgNC42OTAwNCAxNi41ODA2IDAuNTA3MDMxIDE5LjQ4MzlMMC43NjA1NDcgMjBDNy43MzIyMiAxNS43NDE5IDExLjAyNzkgMTEuMzU0OCAxMS4wMjc5IDYuOTY3NzRaTTIzLjcwMzcgNi45Njc3NEMyMy43MDM3IDIuNjQ1MTYgMjAuNTM0OCAwIDE3LjQyOTIgMEMxNC43NjczIDAgMTIuNjc1OCAxLjYxMjkgMTIuNjc1OCA0LjMyMjU4QzE2Ljg1ODggNS4zNTQ4NCAxOS4wNzcgOCAxOS4wNzcgMTEuMDk2OEMxOS4wNzcgMTMuNjEyOSAxNy4zNjU4IDE2LjU4MDYgMTMuMTgyOCAxOS40ODM5TDEzLjQzNjMgMjBDMjAuNDA4IDE1Ljc0MTkgMjMuNzAzNyAxMS4zNTQ4IDIzLjcwMzcgNi45Njc3NFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuNSAwLjUpIiBpZD0i4oCdIiBmaWxsPSIjRkZGRkZGIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZT0ibm9uZSIgLz48L3N2Zz4=);
            margin-left: 10px;
          }
        }
		  }

		  span {
        display: block;
        margin-top: 24px;
        padding-left: $text-padding-left;
        @media (max-width: 1023px) {
          padding-left: $text-padding-left-md;
        }
        @media (max-width: 767px) {
          padding-left: $text-padding-left-sm;
        }
		  }

      img {
        display: block;
        margin-top: 95px;
        margin-left: -80px;
        width: percentage(582/600);
        @media (max-width: 1023px) {
          margin-top: 90px;
          margin-left: auto;
          width: percentage(496/668);
        }
        @media (max-width: 767px) {
          margin-top: 40px;
          width: percentage(225/345);
        }
      }
		}

    .design {
      display: flex;
      position: relative;
      margin-left: auto;
      margin-bottom: 90px;
      max-width: 980px;
      flex-wrap: wrap;
      align-items: flex-start;
      @media (max-width: 1023px) {
        padding-top: 280px;
      }
      @media (max-width: 767px) {
        margin-bottom: 40px;
        padding-top: 200px;
      }

      >img {
        z-index: 50;
        width: $img1-width;
        flex: none;
        @media (max-width: 1023px) {
          width: auto;
          max-width: 238px;
        }
        @media (max-width: 767px) {
          max-width: 165px;
        }
      }

      .text__content_info {
        width: percentage(600/980);
        @media (max-width: 1023px) {
          width: percentage(430/668);
        }
        @media (max-width: 767px) {
          width: calc(100% - 165px);
        }

        .text-block {
          margin: 0 auto;
          max-width: 380px;
          color: #001545;
          @media (max-width: 1023px) {
            position: absolute;
            top: 0;
            left: percentage(86/668);
          }

          h2 {
            margin-bottom: 14px;
            font: 40px 'SangBleuEmpire-Regular';
            @media (max-width: 767px) {
              font-size: 30px;
            }
            @media (max-width: 767px) {
              margin-bottom: 8px;
            }
          }

          p {
            &:not(:last-child) {
              margin-bottom: 20px;
              @media (max-width: 767px) {
                margin-bottom: 12px;
              }
            }
          }
        }

        img {
          display: block;
          margin-top: 80px;
          margin-left: -80px;
          width: percentage(680/600);
          @media (max-width: 1023px) {
            margin-top: 140px;
            margin-left: -60px;
            width: percentage(495/430);
          }
          @media (max-width: 767px) {
            margin-top: 140px;
            margin-left: -40px;
            width: calc(100% + 45px);
          }
        }

        + p {
          margin-left: percentage(100/980);
          margin-top: 40px;
          max-width: 380px;
          @media (max-width: 1023px) and (min-width: 760px) {
            margin-top: 90px;
          }
        }
      }
    }

	  }

	  .product-item__slider {
  		position: relative;
      padding-top: 88px;
      padding-bottom: 172px;
  		color: #fff;
      @media (max-width: 1023px) {
        padding-bottom: 90px;
      }
      @media (max-width: 767px) {
        padding-top: 40px;
        padding-bottom: 45px;
      }

  		&:before {
  		  position: absolute;
  		  content: '';
  		  left: -25vw;
  		  right: -25vw;
  		  bottom: 0;
  		  top: 0;
  		  background-color: #001545;
        background-image: url('/prods/background_texture2.jpeg');
        background-repeat: no-repeat;
        background-size: cover;
  		}

      >* {
        position: relative;
        z-index: 10;
      }

      h3 {
        font-family: 'SangBleuEmpire-Regular';
        font-size: 40px;
        letter-spacing: -0.1px;
        text-align: center;
        font-weight: 400;
        @media (max-width: 767px) {
          font-size: 30px;
        }
      }

      p {
        margin: 12px auto 0;
        max-width: 360px;
        text-align: center;
      }

      .slider-container {
        margin-top: 64px;
        @media (max-width: 767px) {
          margin-top: 40px;
        }
      }

      .slide__text_author {
        font-style: italic;
        @media (max-width: 767px) {
          font-style: normal;
        }
      }
	  }

    .combinations {
      margin: 100px auto 164px;
      max-width: 888px;
      @media (max-width: 1023px) {
        margin-bottom: 100px;
        padding-bottom: 200px;
      }
      @media (max-width: 767px) {
        margin-top: 48px;
        margin-bottom: 50px;
        padding-bottom: 125px;
      }
    }

    .combinations__img {
      position: relative;
      width: percentage(380/888);
      flex: none;
      @media (max-width: 1023px) {
        position: static;
      }
      @media (max-width: 767px) {
        width: auto;
        max-width: 224px;
      }
    }

    .combinations__img-main {
      display: block;
      width: 100%;
    }

    .combinations__img-decoration {
      position: absolute;
      left: percentage(320/380);
      top: percentage(266/380);
      @media (max-width: 1023px) {
        left: auto;
        right: 0;
        top: auto;
        bottom: 0;
      }
      @media (max-width: 767px) {
        width: 105px;
      }
    }

    .combinations__info {
      width: percentage(390/888);
      @media (max-width: 1023px) {
        width: 100%;
        max-width: 390px;
        margin-left: percentage(170/668);
        margin-top: 24px;
      }
      @media (max-width: 767px) {
        margin-left: 50px;
      }

      h2 {
        margin-bottom: 12px;
        font-family: 'SangBleuEmpire-Regular';
        font-size: 40px;
        letter-spacing: -0.1px;
        font-weight: 400;
        color: #001545;
        @media (max-width: 767px) {
          margin-bottom: 8px;
          font-size: 30px;
        }
      }

      a {
        margin-top: 24px;
        @media (max-width: 767px) {
          margin-top: 16px;
        }
      }
    }

	  .product-item__add {
		position: relative;
    padding: 94px 0 118px;
    @media (max-width: 767px) {
      padding: 40px 0 64px;
    }

		&:before {
		  position: absolute;
		  content: '';
		  left: -25vw;
		  right: -25vw;
		  bottom: 0;
		  top: 0;
		  z-index: -1;
		  background-color: #FFFBFB;
		}

		h5 {
		  margin-bottom: 100px;
      text-align: center;
      @media (max-width: 767px) {
        margin-bottom: 50px;
      }
		}

    .product-item__add-slider {
      max-width: none;
      margin: 0 -15px;
      padding: 0 97px;

      .slider-wrapper {
        @media (min-width: 760px) {
          justify-content: center;
        }
      }
    }

    .product-slot {
      // margin: 0 8px;
      @media (min-width: 760px) {
        max-width: 180px;
      }

      img {
        display: block;
        margin: 0 auto;
        width: 100%;
        height: 220px;
        object-fit: contain;
        object-position: bottom;
      }

      p {
        margin: 20px auto 0;
        max-width: 118px;
        font-family: 'SangBleuEmpire-Regular';
        font-size: 24px;
        line-height: (32/24);
        text-align: center;
        color: #001545;
        @media (max-width: 767px) {
          font-size: 20px;
        }

        a {
          color: inherit;
        }
      }
    }
	  }

    .text__content_back {
      position: relative;
      padding: 100px 0 136px;
      text-align: center;
      color: #001545;
      @media (max-width: 767px) {
        padding: 40px 0 160px;
      }

      &:before {
  		  position: absolute;
  		  content: '';
  		  left: -25vw;
  		  right: -25vw;
  		  bottom: 0;
  		  top: 0;
  		  z-index: -1;
  		  background-color: #FFFBFB;
  		}

      .title {
        position: relative;
        margin-top: 24px;
        font: 60px 'SangBleuEmpire-Regular';
        line-height: 1;
        @media (max-width: 767px) {
          margin-top: 8px;
          font-size: 30px;
        }

        &::before {
          content: "";
          position: absolute;
          top: calc(100% + 40px);
          left: calc(50% - 3px);
          transform: rotate(45deg);
          width: 7px;
          height: 7px;
          border: 1px solid currentColor;
          border-left-color: transparent;
          border-top-color: transparent;
          @media (max-width: 767px) {
            top: calc(100% + 24px);
          }
        }

      }

      span, a {
        color: inherit;
      }
    }

	  .slider-container {
  		position: relative;
  		padding: 0;
  		z-index: 1;
      @media (max-width: 1023px) {
        max-width: 496px;
        margin: 0 auto;
        overflow: hidden;
      }
      @media (max-width: 767px) {
        max-width: 254px;
      }
	  }

	  .slider-wrapper {
  		z-index: 1;
  		display: flex;
  		box-sizing: content-box;
  		position: relative;
  		width: 100%;
  		height: 100%;
	  }

	  .slider-slide {
  		width: percentage(480/1180);
  		flex-shrink: 0;
  		overflow: hidden;
	  }

	  .slide__img {
  		img {
  		  display: block;
  		  width: 100%;
  		  height: 100%;
  		  object-fit: cover;
  		}
	  }

	  .slide__text {
  		display: flex;
  		flex-direction: column;
  		align-items: flex-start;
  		margin-top: 20px;
	  }

    .slider-button-prev,
    .slider-button-next {
      position: absolute;
      bottom: 45%;
      z-index: 10;
      padding: 12px;
      border: none;
      background-color: transparent;
      outline: none;
      cursor: pointer;
      @media (max-width: 1023px) {
        bottom: 40%;
      }

      svg {
        display: block;
        width: 15px;
        height: 15px;
        fill: #fff;
        transition: fill .2s ease-in-out;
      }

      &.swiper-button-disabled {
        svg {
          fill: rgba(#fff, .2);
        }
      }
    }

    .slider-button-prev {
      right: calc(100% + 56px);
      @media (max-width: 1060px) {
        right: calc(100% + 4px);
      }
      @media (max-width: 1023px) {
        right: auto;
        left: 0;
      }
    }
    .slider-button-next {
      left: calc(100% + 56px);
      @media (max-width: 1060px) {
        left: calc(100% + 4px);
      }
      @media (max-width: 1023px) {
        left: auto;
        right: 0;
      }
    }

    @media screen and (max-width: 1023px) {
      .product-thumbs {
        opacity: 0;
      }
    }

	}

.product-item.transition-done {
  @media screen and (max-width: 1023px) {
    .product-thumbs {
      opacity: 1;
      transition: opacity .35s ease .3s;
    }
  }

  .text-center {
    transform: translate3d(0px, 0px, 0px);
  }
}

.product-item.transition-done.is-animate {
  .text-center {
    opacity: 0;
    animation: fade 1s ease .2s, fadeTrasnform .75s ease .2s;
  }
}

@keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeTrasnform {
  from {
    transform: translate3d(0px, 30px, 0px);
  }
  to {
    transform: translate3d(0px, 0px, 0px);
  }
}


</style>
