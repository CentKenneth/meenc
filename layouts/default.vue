<template>
  <v-app class="app">
    <Nuxt />
  </v-app>
</template>
<script>
  export default {
    data () {
      return {
        drawer: true,
        items: [
          { title: 'Home', icon: 'mdi-home-city', url: '/doctorhome' },
          { title: 'My Account', icon: 'mdi-account', url: '/doctoraccount' },
          { title: 'Services', icon: 'mdi-medical-bag', url: '/doctorservices' },
          { title: 'Logout', icon: 'mdi-power', url: '/' },
        ],
        mini: false,
      }
    }
  }
</script>
<style>
  .app {
    background-color: #f2fffe !important;
  }
</style>


