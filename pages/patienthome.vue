<template>
<v-card
    height="100%"
    flat
    class="mx-auto">

    <v-card-title class="py-3">
      <div class="text-h5">
        Hi! How can we help you?
      </div>
    </v-card-title>

    <v-card-text class="my-2">
      <v-card flat outlined color="#79e7f5">
        <div class="title pa-3">
          Start getting better today
        </div>
        <div class="px-3 pb-3">
          Choose from our healthy tips that would fit your need
        </div>
      </v-card>
    </v-card-text> 

    <v-card-text class="my-2">
      <v-card flat outlined color="#79e7f5">
        <div class="title pa-3 d-flex">
          <img
            class="d-flex justify-center"
            height="50"  
            max-width="50"
            src="~assets/tips/drink.png"
          ><img>
          <v-btn 
            text
            class="pt-10 ml-n4"
            color="#0277BD"  
            href="https://www.healthline.com/nutrition/27-health-and-nutrition-tips#TOC_TITLE_HDR_2">
              Don’t drink sugar calories
          </v-btn> 
        </div>
        <div class="px-3 pb-1">
          Sugary drinks are among the most fattening items you can put into your body.
        </div>
        <div class="px-3 pb-3">
          This is because your brain doesn’t measure calories from liquid sugar the same way it does for solid food (1Trusted Source).
        </div>
      </v-card>
    </v-card-text> 

    <v-card-text class="my-2">
      <v-card flat outlined color="#79e7f5">
        <div class="title pa-3 d-flex">
          <img
            class="d-flex justify-center"
            height="50"  
            max-width="50"
            src="~assets/tips/s.png"
          ><img>
          <v-btn 
            text
            class="pt-10 ml-n4"
            color="#0277BD"  
            href="https://www.healthline.com/nutrition/27-health-and-nutrition-tips#TOC_TITLE_HDR_2">
              Get enough sleep
          </v-btn> 
        </div>
        <div class="px-3 pb-1">
          The importance of getting enough quality sleep cannot be overstated.
        </div>
        <div class="px-3 pb-3">
          Poor sleep can drive insulin resistance, disrupt your appetite hormones, and reduce your physical and mental performance
        </div>
      </v-card>
    </v-card-text> 

  </v-card>
</template>
<script>
  export default {
    layout: 'patientDefault',
    middleware({ store, redirect }) {
      // If the user is not authenticated
      if (!store.state.auth.loggedIn) {
        return redirect('/patientlogin')
      }
    },
    data: () => ({
      drawer: false,
      group: null,
    }),
    methods: {
      logout(){
        this.$auth.logout().then(() => {this.$router.push('/patientlogin')})
      }
    }
  }
</script>
