<template>
<v-card
    height="100%"
    flat
    class="mx-auto">

    <v-app-bar
      absolute
      class="primary lighten-1 elevation-0"
      dark
      scroll-target="#scrolling-techniques-6"
    >
      <v-spacer> </v-spacer>   
      <v-toolbar-title  
          text
              color="#01579B"
              dark
              dense>
              HOME
      </v-toolbar-title>
    <v-spacer> </v-spacer>
    <div>
        <v-menu
          :close-on-content-click="false"
          :nudge-width="300"
          offset-x>
          <template v-slot:activator="{ on, attrs }">
            <v-icon @click="updateNotifications" color="white" v-bind="attrs" v-on="on">
              mdi-message
            </v-icon>
            <v-avatar class="ml-n3 mt-n3" size="16" color="red" style="color:white;">
              {{counter}}
            </v-avatar>
          </template>
          <v-card flat>
            <v-card-text class="">
              Messages
            </v-card-text>
            <v-card-text class="pt-0" v-if="notifications.length > 0">
                <div class="d-flex flex-column" v-for="notification in notifications" :key="notification.id">
                  <v-divider></v-divider>
                  <div class="py-3">
                    <div>
                      {{notification.messages}}
                    </div>
                    <div class="caption text-right">
                      {{convertDate(notification.created_at)}}
                    </div>
                  </div>
                </div>
                <v-divider></v-divider>
                <div class="pt-4 text-center">
                  <v-btn 
                    class="pa-0 mt-n2"
                    text
                    color="#0277BD"  
                    @click="$router.push('/patientmedicalconcern')">
                    View all
                  </v-btn>
                </div>
            </v-card-text>
          </v-card>
        </v-menu>
      </div>
    </v-app-bar>

    <v-card-title class="pt-16">
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
  import shared from '~/pages/_patientshared'
  import head from '~/pages/_headServices'

  export default {
    layout: 'patientDefault',
    mixins: [shared, head],
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
