<template>
  <div class="product-thumbs">
    <div
      class="product-thumbs__item"

      v-for="(prod, key) of products"
      :key="key"

      v-bind:class="{
        active: activeProduct === key || openedProduct === key,
        light: lightThumbs[key]
      }"
    >
      <img
        :src="prod.thumbnail"
        alt=""

        @mouseout="handleMouseOut()"
        @mouseover="handleMouseOver(key)"
        @click="handleFigureClick(key)">
      <p>
        {{prod.name}}
      </p>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    props: {
      activeProduct: {
        type: String,
        default: '',
      },
      openedProduct: {
        type: String,
        default: '',
      },
    },
    data: function() {
      return {
        transitionRoute: {
          type: String,
          default: '',
        },

        productItem: null,
        lightThumbs: {
          type: Array,
          default: '',
        },

        lottieInit: {},
        isTransition: false
      }
    },
    computed: {
      ...mapGetters({
        roomsData: 'rooms/getRoomsData',
      }),
      roomData() {
        return this.roomsData[this.$route.params.room];
      },
      products() {
        return this.roomData.products;
      },
    },

    mounted() {
      this.productItem = document.querySelector('.product-item');

      if (this.$route.params.product) {
        setTimeout(() => { this.initScrollToggle() }, 1000);
      }
    },

    created() {
      this.$bus.$on('lottie:init', (anim) => {
        this.lottieInit = anim;
      });
    },

    destroyed() {
      this.destroyScrollToggle()
    },

    methods: {
      handleMouseOut() {
      if (this.isTransition) return;

        this.$emit('setActiveProd', '')
      },

      handleMouseOver(key) {
        this.$emit('setActiveProd', key)
      },

      handleFigureClick(key) {
        this.transitionRoute = key;

        this.$bus.$emit('transition:product', key);

        if (this.productItem !== null) {
          this.productItem.classList.add('is-animate');

          setTimeout(() => {

            window.scrollTo(0, 0);

            setTimeout(() => this.productItem.classList.remove('is-animate'), 1000);

          }, 200);

          this.$emit('setOpenedProd', key);
        } else if (!this.productItem) {

          this.isTransition = true;

          if (this.lottieInit.wrapper.classList.contains('is-hidden')) this.lottieInit.wrapper.classList.remove('is-hidden');

          this.lottieInit.setDirection(1);
          this.lottieInit.play();


          setTimeout(() => {
            this.$emit('setOpenedProd', key);
          }, 800);

          setTimeout(() => {
            this.lottieInit.wrapper.classList.add('is-hidden')
            this.lottieInit.setDirection(-1);
            this.lottieInit.play();
          }, 2000);
        }

      },

      scrollTogle() {
        let windowHeight = document.documentElement.clientHeight;
        if (document.querySelector('.blockquote')) {
          let quoteTop = document.querySelector('.blockquote').getBoundingClientRect().top;
          let quoteBgHeight = 0;
          if (document.documentElement.clientWidth > 1023) quoteBgHeight = 560;
          else if (document.documentElement.clientHeight > 767 && document.documentElement.clientHeight <= 1023) quoteBgHeight = 180;
          else quoteBgHeight = 75;

          document.querySelectorAll('.product-thumbs__item').forEach((item, key) => {
            if (quoteTop < item.getBoundingClientRect().bottom) {
              this.lightThumbs[key] = true;
              // console.log(this.lightThumbs);
              //item.classList.add('light')
            } else {
              this.lightThumbs[key] = false;
            //  item.classList.remove('light')
            }
            if (quoteTop + quoteBgHeight < item.getBoundingClientRect().bottom) {
              this.lightThumbs[key] = false;
              //item.classList.remove('light')
            }
          })
        }
      },
      initScrollToggle() {
        window.addEventListener('scroll', this.scrollTogle);
      },
      destroyScrollToggle() {
        window.removeEventListener('scroll', this.scrollTogle);
      }
    }

  };

</script>

<style lang="scss">
  .product-thumbs {
    position: fixed;
    top: 0;
    left: calc(9.125vw - 15px);
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: 300;
    @media (max-width: 1024px) {
      left: 20px;

      &:before {
        position: absolute;
        content: '';
        left: 0;
        right: 0;
        top: -10px;
        width: 100%;
        height: 1px;
        background: #E8E8EC;
      }
    }
    @media (max-width: 1023px) {
      flex-direction: row;
      top: inherit;
      right: 0;
      left: 0;
    }

    .product-item & {
      @media (max-width: 1023px) {
        bottom: 0;
        z-index: 1000;
        height: 80px;
        padding-top: 10px;
        background-color: #fff;

        &::before {
          content: none;
        }
      }
    }

    &__item {
      position: relative;
      width: 58px;
      height: 58px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;

      margin: 10px 0;
      background: rgba(#E8E8EC, .2);
      transition: transform 300ms, background-color 300ms;
      transform: scale3d(1, 1, 1);
      max-width: 100%;
      cursor: pointer;

      @media (max-width: 1023px) {
        margin: 0 10px 10px 0;

        &:last-child {
          margin: 0 0 10px 0;
        }
      }

      .pageWrapper.light & {
        background-color: #E8E8EC;
      }

      &.active {
        transform: scale3d(1.14, 1.14, 1);
        background-color: #E8E8EC;

        .pageWrapper.light & {
          background-color: #D6D6DB;
        }

        p {
          opacity: 1;
          color: #fff;
          @media (max-width: 1024px) {
            left: 0;
            top: calc(-20px);
          }

          .product-item & {
            color: #001545;
          }
        }
      }

      img {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 70%;
        height: 70%;
        object-fit: contain;
      }

      p {
        position: absolute;
        left: calc(80px);
        opacity: 0;
        pointer-events: none;
        width: max-content;
        font: 11px/12px 'Martell-Regular';
      }
    }

  }

  .pageWrapper {
    .product-thumbs__item.light {
      background: rgba(#E8E8EC, .2);

      &.active {
        background-color: #E8E8EC;
      }

      p {
        color: #fff;
      }
    }
  }

  @media screen and (max-width: 568px) {
    .product-thumbs {
      /*width: 700px;*/
      /*max-width: 100%;*/
      /*overflow: scroll;*/
      /*justify-content: flex-start;*/
    }
  }

</style>
