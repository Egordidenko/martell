<template>
  <transition name="video-popup-transition">
    <div
      v-show="src"
      class="video-for-room"
    >
      <video
        :src="src"
        autoplay
        playsinline
        muted
        loop
      />
    </div>
  </transition>
</template>

<script>
  export default {

    props: {
      src: {
        type: String,
        default: '',
      },
    },

    data() {
      return {
        visible: false,
      };
    },

    methods: {
      play() {
        this.visible = true;
      },
      stop() {
        this.visible = false;
      },
    },

  };

</script>

<style lang="scss">
  .video-for-room {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    align-content: center;
    justify-content: center;
    z-index: 50;
    background: #000;

    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .video-popup-transition-enter-active, .video-popup-transition-leave-active {
    transition: opacity .5s;
  }

  .video-popup-transition-enter, .video-popup-transition-leave-to {
    opacity: 0;
    position: absolute;
  }
</style>
