<template>
  <div
    class="explore"
    :class="{
      active: activeRoom
      }">
    <div class="explore__bg"></div>

    <div class="video-slider-container">
      <div class="swiper-container video-slider-thumbs">
        <div class="swiper-wrapper">
          <div
            class="slider-slide swiper-slide"
            v-for="(item, key) of roomsData"
            :key="item.key"
          >
            <div class="slide-video">
              <video :src=item.video autoplay loop muted>
              </video>
              <img :src=item.sliderBg alt="">
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="slider-container explore-slider" :style="{height: currentWindowHeight + 'px'}">
        <div class="slider-wrapper">
          <div
            class="slider-slide"
            v-for="(item, key) of roomsData"
            :key="item.key"
          >
            <div
              class="slide__inner"
              :class="{
                active: activeRoom === key,
                light: roomsData[key].sliderTheme === 'light'
              }">
              <a :href="key"
                class="slide__inner_out js-link-slide"

                :data-route="key"
                >
                  <img
                    :src="item.sliderImg"
                    class="slide__img"
                  >
                <div>
                  <div class="slide__img-helper"></div>
                </div>
                <div class="slide__info flex flex__fdc flex__jsc">
                  <div class="room-link slide__title">
                    <div class="slider__text-top text">enter the room</div>
                      {{ item.sliderTitle }}
                    <div class="slider__text-bottom text">
                      {{ item.sliderText }}
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="slider-controls">
        <div class="slider-btn slider-btn-prev" slot="button-prev">
          <svg width="15" height="21" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.071 0v16.656L12.728 12l1.414 1.414-7.07 7.071-1.415-1.414L0 13.413 1.414 12l4.657 4.656V0h2z" fill-rule="evenodd"/>
          </svg>
        </div>
        <div class="slider-btn slider-btn-next" slot="button-next">
          <svg width="15" height="21" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.071 0v16.656L12.728 12l1.414 1.414-7.07 7.071-1.415-1.414L0 13.413 1.414 12l4.657 4.656V0h2z" fill-rule="evenodd"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import VideoForRoom from '~/components/VideoForRoom.vue';

  import Swiper from 'swiper'

  export default {
    components: {
      Swiper,
      VideoForRoom
    },
    data() {
      return {
        activeRoom: '',
        pageWrapper: null,
        sliderExplore: null,
        currentWindowHeight: window.innerHeight,
      };
    },
    computed: {
      ...mapGetters({
        roomsData: 'rooms/getRoomsData',
      }),
    },
    middleware: 'auth',
    created() {
      this.setActiveRoom();
    },
    mounted: function() {
      this.initChangeTheme();
      this.initSlider();
      this._handleChangeRoute();
      this.$store.commit('lastpage/SET_NAME', 'Home Page');
    },
    methods: {
      setActiveRoom() {
        const rooms = Object.keys(this.roomsData);
      },

      _handleChangeRoute() {
        const self = this;

        let slides = [...document.querySelectorAll('.js-link-slide')].map((item) => ({
          slide: item,
          _route: item.dataset.route
        }));

        slides.forEach((item) => {
          item.slide.removeAttribute('data-route');
          item.slide.addEventListener('click', function(e) {
            e.preventDefault();

            self.$router.push({path: `/${item._route}`});
          })
        })
      },

      initChangeTheme() {
        let pw = document.querySelector('.pageWrapper');
        this.pageWrapper = pw;
      },

      initSlider() {
        window.addEventListener('resize', () => {
          this.currentWindowHeight = window.innerHeight
        })


        let self = this;
        this.slider = document.querySelector('.explore .slider-container');

        let videoThumbs = new Swiper('.video-slider-thumbs', {
          direction: 'vertical',
          slidesPerView: 1,
          effect: 'fade',
          speed: 700,
        });


        let swiper = new Swiper (this.slider, {
          direction: 'vertical',
          slidesPerView: 1,
          mousewheel: true,
          loop: true,
          speed: 700,
          navigation: {
            nextEl: '.slider-btn-next',
            prevEl: '.slider-btn-prev'
          },
          thumbs: {
            swiper: videoThumbs
          },
          wrapperClass: 'slider-wrapper',
          slideClass: 'slider-slide',
          on: {
            init: function () {
              const rooms = Object.values(self.roomsData);
              let activeIndex = this.realIndex;
              if (rooms[activeIndex].sliderTheme === 'light') {
                self.pageWrapper.classList.add('light');
                self.pageWrapper.classList.remove('dark');
              } else {
                self.pageWrapper.classList.add('dark');
                self.pageWrapper.classList.remove('light');
              }

              this.update();
            },
            transitionStart: function () {
              const rooms = Object.values(self.roomsData);
              let activeIndex = this.realIndex;

              if (rooms[activeIndex].sliderTheme === 'light') {
                self.pageWrapper.classList.add('light');
                self.pageWrapper.classList.remove('dark');
              } else {
                self.pageWrapper.classList.add('dark');
                self.pageWrapper.classList.remove('light');
              }
              videoThumbs.update();
            }
          }
        });
      }
    },
  };
</script>

<style lang="scss">

  .dark {
    .explore__bg {

    }
  }

  .light {
    .explore__bg {
      background-color: #ccc;
    }
  }

  .video-slider-container {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    pointer-events: none;
    width: 100%;
    height: 100vh;
    z-index: 0;
  }

  .video-slider-thumbs {
    height: 100%;
    .slider-slide {
      height: 100vh;
      opacity: 0;

      &.swiper-slide-thumb-active {
        opacity: 1;
      }

      .slide-video {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        margin: auto;

        video, img {
          object-fit: cover;
          object-position: center;
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
        }

        img {
          display: none;
        }
      }
    }
  }

  .explore {
    position: relative;
    width: 100vw;
    height: 100%;
    overflow: hidden;
    z-index: 2;

    &__bg {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgb(5, 2, 25);
      opacity: .7;
      pointer-events: none;
      /*z-index: 1;*/

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &.active {
      .slide__img {
        .explore-slider & {
          opacity: .6;
        }
      }
    }
  }

  .explore-bg-transition-enter-active, .explore-bg-transition-leave-active {
    transition: opacity .5s;
  }

  .explore-bg-transition-enter, .explore-bg-transition-leave-to {
    opacity: 0;
    position: absolute;
  }

  .explore-slider {
    &.slider-container {
      width: 100%;
      height: 100vh;
      margin: 0 auto;
    }
    .slider-slide {
      height: 100vh;
      position: relative;
    }
  }

  .slide__inner {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    &_out {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      &:hover {
        .slider__text-top {
          transform: translate3d(0, 0, 0);
          opacity: 1;
          transition: opacity .3s var(--easeOutCubic), transform .35s var(--easeOutCubic);
        }
        .slider__text-bottom {
          transform: translate3d(0, 0, 0);
          opacity: 1;
          transition: opacity .45s var(--easeOutCubic), transform .5s var(--easeOutCubic);
        }
        .slide__img {
          .explore-slider & {
            opacity: .6;
          }
        }
      }
    }
  }

  .slide__img {
    object-fit: cover;
    object-position: center;
    max-width: 100%;
    transition: opacity .2s ease-in-out;
    .explore-slider & {
      @media (max-width: 1060px) {
        opacity: .6;
      }
    }

    .pageWrapper.light & {
      @media (max-width: 1060px) {
        opacity: 1;
      }
    }

    &-helper {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-color: #979797;
      opacity: 0;
    }
  }

  .slider__text-top {
    color: #fff;
    text-align: center;
    text-transform: uppercase;
    font: 11px/12px 'Martell-Regular';
    transform: translate3d(0, 10px, 0);
    opacity: 0;
    transition: opacity .3s var(--easeInCubic), transform .3s var(--easeInCubic);
    padding-bottom: 10px;
    @media (max-width: 1060px) {
      opacity: 1;
      transform: none;
      position: absolute;
      bottom: calc(100% + 20px);
      left: 0;
      right: 0;
    }
    @media (max-width: 767px) {
      bottom: 100%;
    }

    .slide__inner.light & {
      color: #001545;
    }
  }

  .pageWrapper.active {
    .slider__text-top {

    }
  }

  .slider__text-bottom {
    text-align: center;
    margin: auto;
    max-width: 360px;
    color: #fff;
    z-index: 1;
    transform: translate3d(0, 10px, 0);
    opacity: 0;
    transition: opacity .3s var(--easeInCubic), transform .3s var(--easeInCubic);
    padding-top: 10px;
    @media (max-width: 1060px) {
      opacity: 1;
      transform: none;
      position: absolute;
      top: calc(100% + 12px);
      left: 0;
      right: 0;
    }
    @media (max-width: 767px) {
      top: 100%;
    }

    .slide__inner.light & {
      color: #001545;
    }
  }

  .slider-controls {
    position: absolute;
    right: calc(9.125% + 0px);
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 2;
    @media (max-width: 1440px) {
      right: 3%;
    }
    @media (max-width: 1200px) {
      top: inherit;
      left: 0;
      right: 0;
      bottom: calc(30px);
      flex-direction: row;
    }
  }

  .slide__title {
    font: 100px 'SangBleuEmpire-Regular';
    color: #fff;
    text-decoration: none;
    z-index: 2;
    text-align: center;
    line-height: 1em;
    position: relative;
    width: max-content;
    @media (max-width: 1060px) {
      margin: auto;
    }

    .slide__inner.light & {
      color: #001545;
    }
  }

  .slide__info {
    position: absolute;
    @media (max-width: 1060px) {
      top: 0;
      bottom: 0;
    }
  }

  .slider-btn {
    height: 60px;
    width: 60px;
    position: relative;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    &:focus {
      outline: none;
    }

    svg {
      fill: #fff;
      opacity: .2;
      transition: opacity .35s var(--easeOutCubic);

      .pageWrapper.light & {
        fill: #001545;
      }
    }

    &-prev {
      svg {
        transform: rotate(180deg);
      }
    }

    &:before {
      position: absolute;
      content: '';
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      border: 2px solid #fff;
      border-radius: 50%;
      opacity: 0;
      transform: scale(1.1);
      transition: opacity .35s var(--easeInCubic), transform .4s var(--easeInCubic);

      .pageWrapper.light & {
        border-color: #001545;
      }
    }

    &:hover {

      svg {
        opacity: 1;
        transition: opacity .35s var(--easeOutCubic);
      }
      &:before {
        opacity: 1;
        transform: scale(1);
        transition: opacity .35s var(--easeOutCubic), transform .4s var(--easeOutCubic);
      }
    }
  }

  @media screen and (max-width: 1024px) {
    .slider-controls {
      right: calc(5px);
    }

    .video-slider-thumbs .slider-slide .slide-video img {
      display: block;
    }

    .video-slider-thumbs .slider-slide .slide-video video {
      display: none;
    }
  }

  @media screen and (max-width: 991px) {
    .slider__text {
      bottom: calc(-60px)
    }
  }

  @media screen and (max-width: 1024px) {
    .slide__title {
      width: 100%;
    }
  }

  @media screen and (max-width: 568px) {
    .slide__title {
      font-size: 40px;
    }
  }

</style>
