<template>
    <div class="drag-cursor" v-bind:class="{light: isLight}">drag</div>
</template>

<script>
  export default {
    props: {
      isLight: false,
    },
    data() {
      return {
        dragCursorLeftPosition: -100,
        dragCursorTopPostion: -100
      }
    },
    mounted() {
      document.addEventListener("mousemove", e => {
        this.dragCursorLeftPosition = e.clientX + 10;
        this.dragCursorTopPostion = e.clientY + 10;
      });

      requestAnimationFrame(this.render);
    },
    methods: {
      render() {
        document.querySelector('.drag-cursor').style.transform = `translate3d(${this.dragCursorLeftPosition}px, ${this.dragCursorTopPostion}px, 0)`;
        requestAnimationFrame(this.render);
      }
    }
  }
</script>

<style lang="scss">
  .drag-cursor {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -100;
    opacity: 0;
    border: 1px solid #363EFB;
    padding: 8px 13px;
    font-family: 'Martell-Regular';
    font-size: 10px;
    line-height: 1;
    color: #363EFB;
    transition: opacity .3s ease-in-out;

    &.light {
      border-color: #fff;
      color: #fff;
    }

    &.is-visible {
      z-index: 1000;
      opacity: 1;
    }
  }
</style>
