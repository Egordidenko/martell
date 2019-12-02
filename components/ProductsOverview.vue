<template>
  <div
    ref="container"
    class="product-overview"
    :class="{'is-visible': isOverviewVisible}"
  >
    <div class="product-overview__bg">
      <img
        alt=""

        :src="roomData.productsBackground"
        :class="{
          hidden: activeProduct !== '' || openedProduct !== '' || transitionRoute !== ''
        }"
      >
      <div class="product-overview__overlay"></div>
    </div>
    <div class="product-overview__prods">
      <div
       class="product-overview__img"

       v-for="(prod, key) of products"
       :key="key"
      >
        <div
          class="product-overview__titleContainer"

          :class="{
            active: transitionRoute === key
          }"
        >
            <div class="product-overview__mask">
              <h1 class="product-overview__title">{{ prod.name }}</h1>
            </div>
          </div>
        <div
          class="product-overview__point"

          :class="{
            hidden: (activeProduct !== '' || openedProduct !== '') &&
                    (activeProduct !== key && openedProduct !== key),
            active: activeProduct === key || openedProduct === key || transitionRoute === key
          }"

          @mouseover="handleMouseOver(key)"
          @mouseout="handleMouseOut()"
          @click="handleFigureClick(key)"
        >
          <span>{{ prod.index }}</span>
        </div>

        <img
          class="product-overview__prod"
          style="visibility: hidden"
          alt=""

          :src="prod.figure"
          :data-pos-x="prod.pos.x"
          :data-pos-y="prod.pos.y"

          :data-point-pos-x="prod.figurePointPos.x"
          :data-point-pos-y="prod.figurePointPos.y"

          :class="{
            hidden: ((activeProduct !== '' || openedProduct !== '') &&
                    (activeProduct !== key && openedProduct !== key)),
            active: activeProduct === key || openedProduct === key || transitionRoute === key
          }"

          @load="setFigureProps"
          @mouseover="handleMouseOver(key)"
          @mouseout="handleMouseOut()"
          @click="handleFigureClick(key)"
        >
       </div>
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

        isOverviewVisible: false,

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
    },

    created() {
      this.$bus.$on('lottie:init', (anim) => {
        this.lottieInit = anim;
      });
      this.$bus.$on('transition:product', (key) => {
        this.transitionRoute = key;
      });
    },

    methods: {
      handleFigureClick(key) {
        this.transitionRoute = key;
        this.isTransition = true;

        if (this.lottieInit.wrapper) {
          if (this.lottieInit.wrapper.classList.contains('is-hidden')) this.lottieInit.wrapper.classList.remove('is-hidden');

          this.lottieInit.setDirection(1);
          this.lottieInit.play();

          setTimeout(() => {
            this.lottieInit.wrapper.classList.add('is-hidden')
            this.lottieInit.setDirection(-1);
            this.lottieInit.play();
          }, 2000);
        }

        setTimeout(() => {
          this.$emit('setOpenedProd', key);
        }, 800);
      },

      handleMouseOut() {
        if (this.isTransition) return;

        this.$emit('setActiveProd', '')
      },

      handleMouseOver(key) {
        if (this.isTransition) return;

        this.$emit('setActiveProd', key)
      },

      setFigureProps(e) {
        const $img = e.target;
        const imgWidth = $img.width;
        const left = $img.getAttribute('data-pos-x');
        const top = $img.getAttribute('data-pos-y');
        $img.removeAttribute('data-pos-x');
        $img.removeAttribute('data-pos-y');
        const $containerImage = new Image();

        const leftPoint = $img.getAttribute('data-point-pos-x');
        const topPoint = $img.getAttribute('data-point-pos-y');

        $img.removeAttribute('data-point-pos-x');
        $img.removeAttribute('data-point-pos-y');

        const $point = {
          el: $img.previousElementSibling,
          x: leftPoint,
          y: topPoint
        };

        $containerImage.onload = () => {
          const containerWidth = $containerImage.width;

          // make img twice smaller for better quality
          const resImgWidth = imgWidth / containerWidth * 100;
          $img.style.cssText = `
          width: ${resImgWidth}%;
          top: ${top}%;
          left: ${left}%;
          `;

          this.isOverviewVisible = true;
        };

        $containerImage.src = this.roomData.productsBackground;

        this.setPointsProps($point);
      },

      setPointsProps(point) {
        point.el.style.cssText = `
          top: ${point.y}%;
          left: ${point.x}%;
        `;
      },
    },
  };

</script>

<style lang="scss">
  .product-overview {
    position: relative;
    margin: 15.3vh auto 20px;
    opacity: 0;
    transition: opacity .4s ease-in;
    @media (max-height: 800px) {
      margin-top: 13vh;
      margin-bottom: 32px;
    }
    @media (max-width: 1023px) {
      margin-top: 0;
    }

    &.is-visible {
      opacity: 1;
    }

    &__bg {
      img {
        max-width: 100%;
        height: 72vh;
        object-fit: contain;
        // transition: opacity 300ms;
        @media (max-height: 650px) {
          height: 68vh;
        }
        @media (max-width: 1023px) and (min-width: 760px) {
          margin-top: -12px;
        }

        &[src*="boutique_bg.png"] {
          margin-top: 32px;
          margin-bottom: 16px;
          height: 69vh;
          @media (max-height: 650px) {
            height: 66vh;
          }
          @media (max-width: 1023px) {
            margin-bottom: 0;
            margin-top: 12px;
          }
        }

        &[src] {
          @media (max-width: 1023px) {
            height: auto;
            max-height: 70vh;
          }
        }
      }

      &.hidden {
        // opacity: 0.4;
      }
    }

    .product-overview__overlay {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(#06021B, .5);
      opacity: 0;
      transition: opacity .3s ease-in-out;

      .products.active & {
        opacity: 1;
      }
    }

    &__img {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
    &__point {
      position: absolute;
      width: 18px;
      height: 18px;
      background-color: #fff;
      color: #fff;
      border-radius: 50%;
      z-index: 2;
      cursor: pointer;
      display: flex;
      /* display: none; */
      justify-content: center;
      align-items: center;
      transition: opacity 300ms;
      opacity: 0.5;

      &.active {
        opacity: 1;
      }

      &.hidden {
        opacity: 0.3;
      }

    }

    &__prods {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;


      img {
        position: absolute;
        height: auto;
        transform: scale(1);
        cursor: pointer;
        transition: opacity 300ms, transform 300ms;
        z-index: 1;

        &.hidden {
          opacity: 0.3;
        }

        &.active {
          transform: scale(1.04);
        }
      }
    }
  }

  .product-overview__titleContainer {
    color: #fff;
    text-align: center;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity .25s ease .1s;
    pointer-events: none;

    &.active {
      opacity: 1;
      transition: opacity .35s ease;

      .product-overview__title {
        transform: translate3d(0, 0, 0);
        transition: transform .35s ease;
      }
    }
  }

  .product-overview__mask {
    overflow: hidden;
  }

  .product-overview__title {
    font-size: 100px;
    text-transform: uppercase;
    line-height: 1em;
    transform: translate3d(0, 30px, 0);
    transition: transform .35s ease;


    @media (max-width: 1023px) {
      font-size: 80px;
    }

    @media (max-width: 767px) {
      font-size: 40px;
    }
  }



  @media screen and (max-width: 991px) {
    .product-overview {
      max-width: 650px;
    }
  }

</style>
