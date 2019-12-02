<template>
  <div class="products"
       :class="{
        active: activeProduct || transitionRoute,
      }">
    <div class="products__bg"></div>
    <div class="container">

      <ProductsThumbs
        :active-product="activeProduct"
        :opened-product="openedProduct"
        :active-route="transitionRoute"
        @setActiveProd="setActiveProd"
        @setOpenedProd="setOpenedProd"
      />

      <transition name="slide-prod-popup"></transition>

      <div class="flex flex__fdc flex__aic">
        <h1 class="products__title">{{ roomData.cornerTitle }}</h1>
        <ProductsOverview
          :active-product="activeProduct"
          :opened-product="openedProduct"
          :active-route="transitionRoute"
          @setActiveProd="setActiveProd"
          @setOpenedProd="setOpenedProd"
        />
        <div class="products__text">
          <p>{{ roomData.cornerDescription }}</p>
        </div>
      </div>
    </div>
    <VideoForRoom
      ref="videoForRoom"
      :src="roomData.video"
    />
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import ProductsOverview from '~/components/ProductsOverview.vue';
  import ProductsThumbs from '~/components/ProductsThumbs.vue';
	import VideoForRoom from '~/components/VideoForRoom.vue';

  export default {
    components: {
      ProductsOverview,
      ProductsThumbs,
			VideoForRoom
    },
    data() {
      return {
        activeProduct: '',
        openedProduct: '',
        transitionRoute: '',
        confirmationPopupIsOpened: false,
      };
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
      prod() {
        return this.products[this.$route.params.product];
      },
    },
    middleware: 'auth',
		mounted() {
			if (this.roomData.sliderTheme === 'light') {
				document.querySelector('.pageWrapper').classList.add('light');
			} else {
				document.querySelector('.pageWrapper').classList.remove('light');
			}
      if (!this.prod) {
        this.$store.commit('lastpage/SET_NAME', this.roomData.name);
      }
    },
		updated() {
			if (!this.prod) { //Workaround for getting back from product page
				if (this.roomData.sliderTheme === 'light') {
					document.querySelector('.pageWrapper').classList.add('light');
				} else {
					document.querySelector('.pageWrapper').classList.remove('light');
				}
			}
    },
    methods: {
      setActiveProd(id) {
        this.activeProduct = id;
      },
      setOpenedProd(id) {
        this.transitionRoute = id;

        setTimeout(() => this.activeProduct = '', 1000);

        setTimeout(() => this.$router.push({path: `/${this.$route.params.room}/${id}`}) , 500);
      },
    },
  };
</script>

<style lang="scss">

  .slide-prod-popup-enter-active, .slide-prod-popup-leave-active {
    transition: opacity .5s;
  }

  .slide-prod-popup-enter, .slide-prod-popup-leave-to {
    opacity: 0;
    position: absolute;
  }
  .products {
    position: relative;
    width: 100vw;
    height: 100vh;
    display: block;
    @media (max-width: 1023px) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-bottom: 40px;
    }

		.container {
			position: relative;
			z-index: 70;
      @media (max-width: 1280px) {
        max-width: 100%;
      }
		}

    &.active {
      .products__text,
      .products__title {
        opacity: 0;
        transition: opacity 300ms ease;
      }
    }
  }

  .products__bg {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    background-color: #323854;
  }

  .products__title {
    position: absolute;
    top: 13.8vh;
    left: 0;
    right: 0;
    z-index: 10;
    color: #fff;
    transition: opacity 300ms, color 100s;
    text-transform: uppercase;
    font-size: 100px;
		text-align: center;
    @media (max-height: 650px) {
      top: 12vh;
    }
    @media (max-width: 1023px) {
      position: static;
      // margin-top: 112px;
      font-size: 80px;
    }
    @media (max-width: 767px) {
      font-size: 40px;
    }

		.pageWrapper.light & {
			color: #001545;
		}
  }

  .products__text {
    color: #fff;
    text-align: center;
    margin: 0 auto;
    width: 100%;
    max-width: 700px;
    transition: opacity 300ms;
    @media (max-width: 1023px) {
      max-width: 356px;
    }

		.pageWrapper.light & {
			color: #001545;
		}
  }
</style>
