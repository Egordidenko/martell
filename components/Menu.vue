<template>
  <nav
    class="nav"
    :class="{
      opened: opened
    }"
  >
      <div class="nav__video">
        <video src="/video/Martell-Global-BG-1.mp4" autoplay loop muted preload="none"></video>
      </div>
      <ul class="menu flex flex__aic flex__fdc">
        <li
          v-for="(room, key) of roomsData"
          :key="key"
          class="menu__item"
          @mouseover="hideMenuItems" @mouseout="showMenuItems"
        >
          <nuxt-link
            class="menu__item-link"
            :to="`/${key}`"
          >
            <span class="menu__item_pre">{{ room.navText }}</span>
            {{ room.name }}
          </nuxt-link>
        </li>

        <li 
          class="menu__item"

          @mouseover="hideMenuItems"
          @mouseout="showMenuItems">

          <nuxt-link
            class="menu__item-link"
            to="/collection"
          >
            <span class="menu__item_pre">browse</span>
            Collections
          </nuxt-link>
        </li>
      </ul>
  </nav>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    props: {
      opened: {
        type: Boolean,
        default: false,
      },
    },
    data: function() {
      return {
        lottieInit: {}
      }
    },
    computed: {
      ...mapGetters({
        roomsData: 'rooms/getRoomsData',
      }),
    },

    created() {
      this.$bus.$on('lottie:init', (anim) => {
        this.lottieInit = anim;
      });

      this.$router.beforeEach((to, from, next) => {
        next();
      });
    },

    mounted() {
      this._changeRoute();
    },

    methods: {
      closeMenu() {
        this.$emit('closeMenu');
      },

      hideMenuItems(event) {
        event.target.closest('.menu').querySelectorAll('.menu__item a').forEach(item => {
          item.style.color = 'rgba(255, 255, 255, 0.1)';
        })
        event.target.style.color = '';
      },
      
      showMenuItems(event) {
        event.target.closest('.menu').querySelectorAll('.menu__item a').forEach(item => {
          item.style.color = '';
        })
      },

      _changeRoute() {
        const self = this;

        const links = [...document.querySelectorAll('.menu__item-link')].map((link) => ({
          link
        }))

        for (let key in links) {
          links[key].link.addEventListener('click', function(e) {
            self.lottieInit.wrapper.classList.remove('is-hidden')
            self.lottieInit.setDirection(1);
            self.lottieInit.play();

            setTimeout(() => { 
              self.closeMenu()
            }, 900);

            setTimeout(() => {
              self.lottieInit.wrapper.classList.add('is-hidden')
              self.lottieInit.setDirection(-1);
              self.lottieInit.play();
            }, 2000);

          })
        }
      }
    },

  };

</script>

<style lang="scss">

  .menu__item {
    color: #fff;
    margin-bottom: 45px;
    opacity: 0;
    transform: translateY(30px);
    transition: opacity .35s var(--easeOutCubic), transform .4s var(--easeOutCubic);

    &_pre {
      position: absolute;
      left: 0;
      right: 0;
      top: -5px;
      text-align: center;
      margin: 0 auto;
      font: 10px 'Martell-Regular';
      opacity: 0;
      transition: opacity .35s ease;
    }

    a {
      font: 60px 'SangBleuEmpire-Regular';
      line-height: 1em;
      color: #fff;
      position: relative;
      transition: color .35s ease;
      // @media (max-width: 1060px) {
      //   color: #fff;
      // }

      &:hover {
        color: #fff;
        transition: color .35s ease;

        .menu__item_pre {
          opacity: 1;
          transition: opacity .35s ease;
        }
      }
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  .nav {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    height: 100vh;
    background: #001545;
    z-index: 2;
    min-width: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity .35s var(--easeInCubic);
    pointer-events: none;

    &.opened {
      pointer-events: auto;
      opacity: 1;
      transition: opacity .35s var(--easeOutCubic);

      .menu__item {
        opacity: 1;
        transform: translateY(0);
        transition: opacity .35s var(--easeOutCubic), transform .4s var(--easeOutCubic);

        &:nth-child(1) {
          transition-delay: 0s;
        }
        &:nth-child(2) {
          transition-delay: .15s;
        }
        &:nth-child(3) {
          transition-delay: .3s;
        }
        &:nth-child(4) {
          transition-delay: .45s;
        }
        &:nth-child(5) {
          transition-delay: .6s;
        }

      }
    }

    &__video {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;

      video {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }


/*  media*/

  @media screen and (max-width: 568px) {
    .menu__item a {
      font-size: 40px;
    }
    .nav {
      min-width: auto;
    }
  }

</style>
