<template>
  <div
    class="home"
    :class="{
      active: isActiveFirstPage
     }">
    <div class="home__video">
      <video src="/video/Martell-Global-BG-1.mp4" autoplay loop muted preload="none"></video>
    </div>
    <div class="container">
      <div class="">
        <div class="home__logo">
          <img src="/img/logowordmark.svg" />
        </div>
        <div class="home__info flex flex__fdc flex__aic">
          <h1 class="h1 home__title">Welcome to the Martell Collector's Maison</h1>
          <p class="text home__text">Behind our doors you’ll find beautiful rooms, elegant halls, and cosy corners. But don’t just look and see. Inspiration comes to those who explore.</p>
        </div>
        <div class="flex flex__jcc">
          <Authorization v-if="authorizationIsVisible" />
          <div
            v-else
            class=" text-center"
          >
            <nuxt-link
              class="home__btn"
              to="explore"
            >
              enter
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Authorization from '~/components/Authorization.vue';
  import Header from '~/components/Header.vue';
  export default {
    props: {
      isActiveFirstPage: {
        type: Boolean,
        default: true
      }
    },

    components: {
      Authorization,
      Header
    },

    methods: {
    },

    middleware: 'auth',
    data() {
      return {
        authorizationIsVisible: false,
      };
    },

    mounted() {
      document.querySelector('.pageWrapper').classList.remove('light');
      document.querySelector('.header').classList.add('hidden');
    },
    destroyed() {
      document.querySelector('.header').classList.remove('hidden');
    }
  };
</script>

<style lang="scss" scoped>
  .home {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    height: 100vh;

    .container {
      @media screen and (max-width: 1440px) {
        padding: 0 15px;
      }
    }

    &__info {
      margin-bottom: 40px;
      @media (max-width: 1023px) {
        margin-bottom: 25px;
      }
      @media (max-width: 767px) {
        margin-bottom: 16px;
      }
    }

    &__title {
      text-align: center;
      max-width: 980px;
      margin-bottom: 40px;
      color: #fff;
      @media (max-width: 1023px) {
        margin-bottom: 16px;
      }
    }
    &__text {
      text-align: center;
      max-width: 600px;
      color: #fff;
    }

    &__logo {
      position: absolute;
      top: 77px;
      left: 0;
      right: 0;
      text-align: center;
    }

    &__btn {
      display: inline-block;
      position: relative;
      font: 13px 'Martell-Regular';
      letter-spacing: .55px;
      padding: 12px 34px;
      text-transform: uppercase;
      border: 1px solid rgba(255, 255, 255, .2);
      transition: border-color .35s ease;
      color: #fff;
      text-decoration: none;

      &::before, &::after {
        content: "";
        position: absolute;
        top: -1px;
        bottom: -1px;
        left: -1px;
        right: -1px;
        border: 1px solid #fff;
        transform: scale(.2);
        opacity: 0;
        transition: .3s ease-in-out;
        transition-property: transform, opacity;
      }
      &::before {
        border-right-color: transparent;
        border-bottom-color: transparent;
        transform-origin: top left;
      }
      &::after {
        border-left-color: transparent;
        border-top-color: transparent;
        transform-origin: bottom right;
      }

      &:hover {
        &::before, &::after {
          transform: none;
          opacity: 1;
        }
      }
    }
  }

  .home__video {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;

    video {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      z-index: -1;
    }
  }

  a:hover {
    text-decoration: none;
  }
</style>
