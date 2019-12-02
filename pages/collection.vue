<template>
  <div class="collection">
    <DragCursor></DragCursor>
    <div class="container">
      <div class="flex flex__fdc flex__aic">
        <h1 class="h2">Your Collection</h1>
        <p v-if="products.length > 0" class="collection__text text">Here is where we have stowed your favourite pieces. Keep looking, or carry on to Mystore to buy.</p>
        <p v-else="products.length > 0" class="collection__text text">Looks like there is nothing here, keep exploring. Return once you have found something.</p>
        <p v-if="errored" class="collection__text text error">Sorry, we could not retreive the collection requested.</p>
        <a class="collection__link link link--icon" v-bind:class="{disabled: products.length == 0}" href="" v-on:click.prevent="shareCollection" v-tooltip="copyLinkTooltip">
          <span>share</span>
          <img src="/share_blue.svg" alt="">
        </a>
        <input type="hidden" id="share-link" value="">
      </div>

    </div>

    <div class="slider-collection" :class="{inactive: products.length == 0}">
      <button class="slider-button-prev">
        <svg width="15px" height="15px" viewBox="0 0 15 15" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <path d="M4.21029811,6.8607697 L10.5710678,0.5 L11.2781746,1.20710678 L4.91740489,7.56787648 L11.2781746,13.9286462 L10.5710678,14.635753 L4.21029811,8.27498326 L4.20710678,8.27817459 L3.5,7.57106781 L3.50319133,7.56787648 L3.5,7.56468515 L4.20710678,6.85757837 L4.21029811,6.8607697 Z"></path>
        </svg>
      </button>
      <div v-if="products.length > 0" class="slider-container slider-collection"
        v-on:mouseover="showDragCursor"
        v-on:mouseout="hideDragCursor">
        <div class="slider-wrapper">
          <div
            v-for="(prod, index) of products"
            :key="prod.id"
            class="slider-slide"
          >
            <div class="collection__item flex flex__fdc flex__aic" :class="'collection__item--index-' + index">
              <div class="collection__item-img">
                <button class="link link--icon" @click="removeProduct(index)" @mouseover.stop="hideDragCursor">
                  <span>Delete</span>
                  <img src="/close_blue.svg" alt="">
                </button>
                <img :src="prod.data.preview" :alt="prod.data.name">
              </div>
              <p class="h2">{{ prod.data.name }}</p>
              <button class="link collection__edit" v-on:click="showInfo">Edit</button>
              <p class="description">{{prod.data.description}}</p>
              <a class="btn" v-if="prod.data.purchaseLink"
                :href="prod.data.purchaseLink"
                v-tooltip="'go to mystore to purchase item'"
                @mouseover.stop="hideDragCursor"
                target="_blank"
              >purchase</a>
              <button class="link collection__close" v-on:click="hideInfo">Close</button>
            </div>
          </div>
          <div class="slider-slide">
            <div class="collection__last flex flex__fdc flex__aic flex__jcc">
              <p>Share your Collection</p>
              <a class="collection__link link link--icon" href=""
                v-on:click.prevent="shareCollection"
                v-tooltip="copyLinkTooltip"
                @mouseover.stop="hideDragCursor">
                <span>share</span>
                <img src="/share_blue.svg" alt="">
              </a>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="slider-container slider-collection">
        <div class="slider-wrapper">
          <div
            v-for="n in 4"
            class="slider-slide"
          >
            <div class="collection__item flex flex__fdc flex__aic">
              <div class="collection__item-img">
                <img :src="'/prods/collection-default-' + n + '.png'" alt="Collection Product">
              </div>
            </div>
          </div>
        </div>
      </div>
      <button class="slider-button-next">
        <svg width="15px" height="15px" viewBox="0 0 15 15" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <path d="M4.21029811,6.8607697 L10.5710678,0.5 L11.2781746,1.20710678 L4.91740489,7.56787648 L11.2781746,13.9286462 L10.5710678,14.635753 L4.21029811,8.27498326 L4.20710678,8.27817459 L3.5,7.57106781 L3.50319133,7.56787648 L3.5,7.56468515 L4.20710678,6.85757837 L4.21029811,6.8607697 Z" transform="translate(7.389087, 7.567876) scale(-1, 1) translate(-7.389087, -7.567876) "></path>
        </svg>
      </button>
    </div>

    <nuxt-link :to='this.lastPage.link' class="text__content_back flex flex__fdc">
      <span class="text">Return to</span>
      <span class="title">{{ this.lastPage.name }}</span>
    </nuxt-link>
  </div>
</template>

<script>
  import Vue from 'vue'
  import DragCursor from '~/components/DragCursor.vue'
  import {mapGetters, mapActions} from 'vuex';
  import Swiper from 'swiper'
  import VTooltip from 'v-tooltip';
  import TweenLite from 'gsap'
  import axios from 'axios';

  Vue.use(VTooltip)

  export default {
    components: {
      DragCursor,
      Swiper
    },
    data() {
      return {
        sliderCollection: null,
        swiper: null,
        copyLinkTooltip: {
          content: "",
          placement: 'top-center',
          trigger: 'manual',
          show: false,
        },
        errored: false
      }
    },

    computed: {
      ...mapGetters({
        products: 'collection/getProducts',
        lastPage: 'lastpage/getLastPage',
      }),

      totalCost() {
        return this.products.reduce((acc, item) => {
          return acc + (+item.data.price);
        }, 0);
      },
    },

    middleware: 'auth',

    mounted() {
      this.getSharedCollection();
      document.querySelector('.pageWrapper').classList.add('light');
    },

    methods: {
      ...mapActions({
        deleteProduct: 'collection/deleteProduct',
        addProductToCollection: 'collection/addProductToCollection'
      }),
      removeProduct(index) {
        let product = document.querySelector('.collection__item--index-' + index);
        let productWrapper = product.parentElement;
        product.classList.add('is-hidden');
        setTimeout(() => {
          TweenLite.to(productWrapper, 1, {width: 0});
        }, 500)
        setTimeout(() => {
          this.deleteProduct(index);
          setTimeout(  ()=> {
            this.swiper.update()
          }, 10);
        }, 1500);
      },
      initSlider() {
        this.slider = document.querySelector('.collection .slider-container');
        this.swiper = new Swiper (this.slider, {
          init: true,
          slidesPerView: 1,
          grabCursor: this.products.length > 0 ? true : false,
          allowTouchMove: this.products.length > 0 ? true : false,
          wrapperClass: 'slider-wrapper',
          slideClass: 'slider-slide',
          navigation: {
            nextEl: '.slider-button-next',
            prevEl: '.slider-button-prev',
          },
          breakpoints: {
            768: {
              slidesPerView: 2
            },
            1024: {
              slidesPerView: 3
            }
          }
        })
      },
      showInfo(event) {
        document.querySelectorAll('.collection__item').forEach(item => {
          item.classList.remove('show-info')
        })
        event.target.closest('.collection__item').classList.add('show-info')
      },
      hideInfo() {
        event.target.closest('.collection__item').classList.remove('show-info')
      },

      copyToClipboard(url) {
        let textToCopy = document.querySelector('#share-link');
        textToCopy.value = url;
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

      shareCollection() {
          //Creating array to save
          let ids = Array();

          //Pushing product ids to array
          this.products.forEach( item => {
            ids.push(item.id);
          })

          //Pushing to server
          axios({
            method: 'POST',
            url: 'http://martellapi.dev.diffusion.digital/share.php',
            data: JSON.stringify(ids),
          }).then((response) => {
            this.copyToClipboard(location.protocol + '//' + location.host + '/collection/' + response.data.code);
          }).catch((e) => {
            console.log(e);
          });

      },

      getSharedCollection() {
        let collectionId = this.$route.params.collectionid
        if (collectionId){
          axios({
            method: 'GET',
            url: 'http://martellapi.dev.diffusion.digital/share.php',
            params: {
                  code: collectionId
                }
          }).then((response) => {
            //Clean up existing products
            this.products.forEach(product => {
              this.deleteProduct(product);
            })
            //Add ones from saved
            response.data.forEach(item => {
              this.addProductToCollection(item, true);
            });
          }).catch((e) => {
            console.log(e);
            this.errored = true;
            console.log(this.errored);
          }).then(() => {
            this.initSlider();
          });
        } else {
          this.initSlider();
        }
      },

      /* saveProduct() {
        if (this.isSaved) {
          alert('product is already saved');
        } else {
          this.addProductToCollection({
            data: this.prod,
            id: this.$route.params.room + '_' + this.$route.params.product,
          });
          alert('product added to your collection');
        }
      }, */

      showDragCursor() {
        let drag = document.querySelector('.drag-cursor') || false;

        if (drag) drag.classList.add('is-visible');

      },
      hideDragCursor() {
        let drag = document.querySelector('.drag-cursor') || false;

        if (drag) drag.classList.remove('is-visible');
      }
    },

  };

</script>

<style lang="scss" scoped>

  .collection {
    width: 100vw;
    padding-top: 148px;
    background-color: #F8F8F8;
    @media (max-width: 1023px) {
      padding-top: 170px;
    }
    @media (max-width: 767px) {
      padding-top: 80px;
    }

    &__text {
      margin-top: 16px;
      text-align: center;
      @media (max-width: 1023px) {
        margin: 16px auto 0;
        max-width: 610px;
      }
    }

    &__link {
      align-self: center;
      margin-top: 20px;
      @media (max-width: 767px) {
        margin-top: 8px;
      }

      &.disabled {
        visibility: hidden;
      }
    }

    &__item {
      position: relative;
      height: 100vh;
      padding: 62vh 30px 0;
      border-left: 1px solid #E8E5E5;
      text-align: center;
      transition: border-color .3s ease-in-out, opacity .5s ease-in-out;

      &::after {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        width: 1px;
        background-color: #363EFB;
        opacity: 0;
        transition: opacity .3s ease-in-out;
      }

      &.is-hidden {
        opacity: 0;
      }

      img {
        display: block;
        margin: 0 auto;
        @media (max-width: 1023px) {
          max-width: 200px;
        }
      }

      .h2 {
        transition: font-size .3s ease-in-out;
        @media (max-width: 767px) {
          font-size: 30px;
        }
      }

      .description {
        margin-top: 16px;
        margin-bottom: 24px;
        font-size: 16px;
        line-height: (20/16);
      }

      .link {
        align-self: auto;
      }

      .link:not(.collection__edit), .description, .btn {
        opacity: 0;
        pointer-events: none;
        transition: opacity .3s ease-in-out;
      }

      .collection__edit {
        margin-top: 20px;
        @media (min-width: 960px) {
          display: none;
        }
      }

      .collection__close {
        margin-top: auto;
        margin-bottom: 28px;
        @media (min-width: 960px) {
          display: none;
        }
      }

      &:hover {
        @media (min-width: 960px) {
          border-color: #363EFB;

          &::after {
            opacity: 1;
          }

          .link:not(.collection__edit), .description, .btn {
            opacity: 1;
            pointer-events: auto;
          }

          .h2 {
            font-size: 30px;
          }
        }
      }

      &.show-info {
        .link:not(.collection__edit), .description, .btn {
          opacity: 1;
          pointer-events: auto;
        }

        .collection__edit {
          display: none;
        }

        .h2 {
          font-size: 30px;
          @media (max-width: 767px) {
            font-size: 24px;
          }
        }
      }
    }

    &__item-img {
      position: absolute;
      bottom: 40vh;

      .link {
        margin-bottom: 20px;
      }
    }

    &__last {
      height: 100vh;
      border: 1px solid #E8E5E5;
      border-top: none;
      border-bottom: none;

      p {
        margin: 0 auto;
        text-align: center;
        @media (min-width: 960px) {
          max-width: 96px;
        }
      }
    }
  }


  .collection_back {
    position: relative;

    &:before {
      position: absolute;
      content: '';
      left: -25vw;
      right: -25vw;
      bottom: -50px;
      top: -60px;
      z-index: -1;
      background-color: #FFFBFB;
    }

    h5 {
      margin-bottom: 50px;
    }
  }

  .slider-collection {
    position: relative;
    margin-top: 100px;
    background-color: #F3F2F0;
    @media (max-width: 767px) {
      margin-top: 48px;
    }

    &.inactive {
      &::before {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 50;
        background-color: rgba(#fff, .8);
      }
    }
  }

  .slider-container {
    position: relative;
    padding: 0;
    z-index: 1;
    padding: 0 130px;
    @media (max-width: 1023px) {
      padding: 0 24px;
    }
    @media (max-width: 767px) {
      padding: 0 45px;
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
    flex-shrink: 0;
    overflow: hidden;
  }

  .slider-button-prev,
  .slider-button-next {
    position: absolute;
    top: calc(50% - 20px);
    z-index: 10;
    padding: 12px;
    border: none;
    background-color: transparent;
    outline: none;
    cursor: pointer;

    svg {
      display: block;
      width: 15px;
      height: 15px;
      fill: #363EFB;
      transition: fill .2s ease-in-out;
    }

    &.swiper-button-disabled {
      svg {
        fill: rgba(#363EFB, .2);
      }
    }
  }

  .slider-button-prev {
    left: 37px;
    @media (max-width: 767px) {
      left: 2px;
    }
  }
  .slider-button-next {
    right: 37px;
    @media (max-width: 767px) {
      right: 2px;
    }
  }

  .text__content_back {
    position: relative;
    padding: 100px 0 136px;
    text-align: center;
    background-color: #FFFBFB;
    color: #001545;
    @media (max-width: 767px) {
      padding: 40px 0 80px;
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

</style>
