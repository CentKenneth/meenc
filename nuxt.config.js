export default {
  // Global page headers: https://go.nuxtjs.dev/config-head

  head: {
    title: 'MEENC',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/logo.jpg' }
    ]
  },

  ssr: false,

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/auth.js', ssr: false },
    { src: '~/plugins/vue-notification.js', ssr: false },
  ],

  // axios configuration
  axios: {
    baseURL: process.env.BASEURL
  },

  router: {
    middleware: ['auth']
  },

  // auth configuration
  auth: {
    redirect: {
      login: false,
      logout: false,
      callback: false,
      home: false
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/oauth/token',
            method: 'post',
            Accept: 'application/json',
            propertyName: 'access_token'
          },
          user: {
            url: '/api/authorized/auth',
            method: 'get',
            propertyName: 'data'
          }
        },
        tokenRequired: true,
        tokenType: 'Bearer'
      }
    },
    fullPathRedirect: true
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules

  buildModules: [
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/auth',
    '@nuxtjs/dotenv',
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
