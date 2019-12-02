export default {
  mode: 'spa',
  router: {
    //mode: 'hash', // tern this off after server setup
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'Martell Collector\'s Maison',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: process.env.npm_package_description || ''},
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {rel: "apple-touch-icon", sizes: "180x180", href: "/apple-icon.png"},
      {rel: "apple-touch-icon", sizes: "120x120", href: "/apple-icon.png"},
      {rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png"},
      {rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png"},
      {rel: "icon", type: "image/png", sizes: "96x96", href: "/favicon-96x96.png"},
      {rel: "manifest", href: "/manifest.json"},
      {rel: 'stylesheet', href: 'https://unpkg.com/swiper/css/swiper.min.css'}
    ],
    script: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TweenMax.min.js' },
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#fff'},
  /*
  ** Global CSS
  */
  css: [
    '~/assets/fonts.css',
    '~/assets/config.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/bodymovin.min.js' },
    { src: '~/plugins/bus.js' }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: '',
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    },
  },
  transition: {
    name: 'page',
    mode: '',
  }
};
