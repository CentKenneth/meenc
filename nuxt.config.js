export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'testapp',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // axios configuration
  axios: {
    baseURL: process.env.BASEURL
  },

  // auth configuration
  auth: {
    redirect: {
      login: '/auth/login',
      logout: '/auth/login',
      home: '/auth/dashboard',
      callback: '/auth/login'
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
          logout: { url: '/oauth/logout', method: 'post' },
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
