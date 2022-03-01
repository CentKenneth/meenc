<template
>
<div
    class="spacing-playground pa-0"
    fluid 
  >
    <!-- <v-app-bar
      class="mx-auto"
      color="#01579B"
      elevation="none"
    >
    <v-app-bar-nav-icon 
          color="white"
          @click="drawer = true">
      </v-app-bar-nav-icon>
    <v-spacer></v-spacer>

       <v-toolbar-title >
               <img
                height="40"  
                max-width="50"
                src="~assets/M.svg"
               >
               <img>
      </v-toolbar-title>
          <v-alert
              color="#01579B"
              dark
              dense>
              MEENC HEALTH CARE
          </v-alert>
    <v-spacer></v-spacer>
    </v-app-bar> -->
    


    <!-- menu -->
  <v-card
    height="400" 
    outlined
    :max-width="$vuetify.breakpoint.smAndDown ? '400' : '100%'"
    class="mx-auto"
    
  >
  <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
        color="#0277BD"  
      >
      <v-list>
        <v-list-item-group
          v-model="group"
          active-class="deep-white--text text--accent-4"
          
        >
          <v-list-item>
            <v-list-item-icon>
              <v-icon 
              color="white"
              >mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title><v-btn 
              text
              color="white"
              @click="$router.push('/doctoraccount')">
              Account
              </v-btn></v-list-item-title>
          </v-list-item>

          <!-- <v-list-item>
            <v-list-item-icon>
              <v-icon 
              color="white"
              >mdi-hospital</v-icon>
            </v-list-item-icon>
            <v-list-item-title><v-btn 
              text
              color="white"
              @click="$router.push('/secretaryregister')">
                Add Secretary
                </v-btn></v-list-item-title>
          </v-list-item> -->

        

           <v-list-item>
            <v-list-item-icon>
              <v-icon 
              color="white"
              >mdi-medical-bag</v-icon>
            </v-list-item-icon>
            <v-list-item-title><v-btn 
              text
              color="white"
               @click="$router.push('/doctorservices')">
                Services
                </v-btn></v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon 
              color="white"
              >mdi-power</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              <v-btn 
                text
                color="white"
                @click="logout"
              >
                Logout
              </v-btn>
            </v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
  </v-navigation-drawer>

       <v-card
    :max-width="$vuetify.breakpoint.smAndDown ? '100%' : '100%'"
      class="mx-auto"
      color="#01579B"
    >
      
    <v-card
    color="#BBDEFB" >
      <v-row 
      dense>
        <v-col cols="12">
          <v-card
            rounded
            color="#0277BD"
            dark
          >
          <v-card-title class="text-h5">
             Hi!
            </v-card-title>

            <v-card-subtitle>How can we help you?</v-card-subtitle>
          </v-card>
          
         <v-alert
            outlined
            color="#0277BD"
          >
            <div class="title">
              Start getting better today
            </div>
            <v-card-subtitle>Choose from our healthy tips that would fit your need</v-card-subtitle>
            <v-card-subtitle></v-card-subtitle>
          </v-alert>
        </v-col>
         <v-col cols="12">
        </v-col>
      </v-row>
    </v-card>
    <v-card
    :max-width="$vuetify.breakpoint.smAndDown ? '100%' : '100%'"
      class="mx-auto"
      color="#01579B"
    >
    <v-card
    color="#BBDEFB">
      <v-row dense>
        <v-col cols="12">



          
<v-card-text :style="$vuetify.breakpoint.smAndDown ? 'width:100%;' : 'width:95%;'" class="mx-auto">

         <v-alert
            outlined
            color="#0277BD"
          >
            <div class="patients">
              <v-card-actions>
                 <div>   
                 <img
                 class="d-flex justify-center"
                    height="50"  
                    max-width="50"
                    src="~assets/tips/drink.png"
                ><img>
                 </div> 
                  <v-btn 
                  text
                  color="#0277BD"  
                  href="https://www.healthline.com/nutrition/27-health-and-nutrition-tips#TOC_TITLE_HDR_2">
                     Don’t drink sugar calories
                  </v-btn> 
                  
             </v-card-actions>
             <v-card-subtitle>Sugary drinks are among the most fattening items you can put into your body.</v-card-subtitle>
              <v-card-subtitle> This is because your brain doesn’t measure calories from liquid sugar the same way it does for solid food (1Trusted Source).</v-card-subtitle>
             <div class="d-flex justify-center"> 
                 </div>
                  
            </div>
            
          </v-alert>

            <v-alert
            outlined
            color="#0277BD"
          >
            <div class="patients">
              <v-card-actions>

                  <div>   
                    <img
                        class="d-flex justify-center"
                        height="50"  
                        max-width="50"
                        src="~assets/tips/s.png"
                    ><img>
                  </div> 
                  <v-btn 
                    text
                    color="#0277BD"  
                    href="https://www.healthline.com/nutrition/27-health-and-nutrition-tips#TOC_TITLE_HDR_2">
                    Get enough sleep
                  </v-btn> 
                  
             </v-card-actions>
             <v-card-subtitle>The importance of getting enough quality sleep cannot be overstated.</v-card-subtitle>
              <v-card-subtitle> Poor sleep can drive insulin resistance, disrupt your appetite hormones, and reduce your physical and mental performance</v-card-subtitle>
                  
            </div>
            
          </v-alert>
</v-card-text>


        </v-col>
      </v-row>
    </v-card>
  </v-card>
  </v-card>  
  </v-card>
    <!-- menu -->
</div>
</template>
<script>
  export default {
    middleware({ store, redirect }) {
      // If the user is not authenticated
      if (!store.state.auth.loggedIn) {
        return redirect('/doctorlogin')
      }

      if(store.state.auth.loggedIn && store.state.auth.user.role != 'doctor') {
        return redirect('/patientlogin')
      }
    },
    data: () => ({
      drawer: false,
      group: null,
    }),
    methods: {
      async logout() {
        this.$auth.logout().then(() => {this.$router.push('/doctorlogin')})
      }
    }
  }
</script>
