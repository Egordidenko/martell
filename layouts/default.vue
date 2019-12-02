<template>
  <div class="pageWrapper">
    <Header />
    <nuxt />
    <div class="tooltip-overlay"></div>
    <TransitionInner />
  </div>
</template>

<script>
  import Header from '~/components/Header';
  import TransitionInner from '~/components/TransitionInner';
  export default {
    transition: {
      name: 'parent-page',
      mode: 'in-out'
    },
    components:{
      Header,
      TransitionInner
    },
  };

</script>

<style lang="scss">
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

html, body {
  position: relative;
  height: 100%;
}

.pageWrapper {
  min-width: 320px;
  overflow: hidden;
  display: block;
  position: relative;
  height: 100%;
}

.container {
  width: 100%;
  margin: 0 auto;
  max-width: 81.75%;
  min-width: 320px;

  @media screen and (max-width: 1440px) {
      padding: 0 20px;
  }
  @media screen and (max-width: 1024px) {
     max-width: 100%;
  }
}

.flex {
  display: flex;
  position: relative;
  flex-wrap: wrap;

  &__fdc {
    flex-direction: column;
  }
  &__jcsb {
    justify-content: space-between;
  }
  &__jcc {
    justify-content: center;
  }
  &__aic {
    align-items: center;
  }
  &__aife {
    align-items: flex-end;
  }
}

  a {
    text-decoration: none;
  }

  .link {
    align-self: flex-start;
    border: none;
    border-bottom: 1px solid rgba(54, 62, 251, .2);
    background-color: transparent;
    font-family: 'Martell-Regular';
    font-size: 11px;
    line-height: 16px;
    letter-spacing: .55px;
    color: #363EFB;
    transition: border-color .2s ease-in-out;
    cursor: pointer;

    &:active {
      outline: none;
    }

    &:hover {
      border-color: transparent;
    }
  }

  .link--icon {
    display: inline-flex;
    align-items: center;
    border: none;

    span {
      margin-right: 6px;
      border-bottom: 1px solid transparent;
      transition: border-color .2s ease-in-out;
    }

    img {
      width: 10px;
      height: 10px;
    }

    &:hover {
      span {
        border-color: #363EFB;
      }
    }
  }

  .btn {
    display: inline-block;
    position: relative;
    border: 1px solid rgba(#363EFB, .2);
    padding: 7px 24px;
    font-family: 'Martell-Regular';
    font-size: 11px;
    letter-spacing: .55px;
    color: #363EFB;
    transition: .3s ease-in-out;
    transition-property: background-color, color;

    &::before, &::after {
      content: "";
      position: absolute;
      top: -1px;
      bottom: -1px;
      left: -1px;
      right: -1px;
      border: 1px solid #363EFB;
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

    &:active, &.is-active {
      background-color: #363EFB;
      color: #fff;
    }
  }

  .tooltip {
  display: block !important;
  z-index: 10000;

  .tooltip-inner {
    background: #001545;
    border-radius: 8px;
    padding: 5px 20px;
    font-family: 'Martell-Regular';
    font-size: 11px;
    line-height: (12/11);
    letter-spacing: 0.55px;
    color: #F8F8F8;
  }

  &[x-placement^="top"] {
    margin-bottom: 5px;
  }

  &[x-placement^="bottom"] {
    margin-top: 5px;
  }

  &[x-placement^="right"] {
    margin-left: 5px;
  }

  &[x-placement^="left"] {
    margin-right: 5px;
  }

  &[aria-hidden='true'] {
    visibility: hidden;
    opacity: 0;
    transition: opacity .3s, visibility .3s;
  }

  &[aria-hidden='false'] {
    visibility: visible;
    opacity: 1;
    transition: opacity .3s;
  }
}

.tooltip-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -100;
  opacity: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(#001545, .1);
  transition: opacity .3s ease-in-out;

  &.is-visible {
    z-index: 100;
    opacity: 1;
  }
}
</style>
