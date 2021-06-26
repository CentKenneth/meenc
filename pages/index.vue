<template>
<v-container
    class="spacing-playground pa-0"
    fluid 
  >
    <v-app-bar
      class="mx-auto my-1"
      color="#01579B"
      elevation="none"
      :max-width="$vuetify.breakpoint.smAndDown ? '400' : '100%'"
    >
      <v-app-bar-nav-icon 
          color="white"
          @click="drawer = true">
      </v-app-bar-nav-icon>
                
       <v-spacer></v-spacer>
          
          <v-alert
              color="#01579B"
              dark
              dense>
              MEENC HEALTH CARE
          </v-alert>
      <v-spacer></v-spacer>
       
         

    </v-app-bar>
    
  <v-card
    height="200" 
    outlined
    :max-width="$vuetify.breakpoint.smAndDown ? '400' : '100%'"
    class="mx-auto"
    color="white"
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

          <v-list-item  >
            <v-list-item-icon>
              <v-icon
              color="white">mdi-doctor</v-icon>
            </v-list-item-icon>
            <v-list-item-title><v-btn 
                text
                color="white"
                 href="/doctorlogin" >
                Doctor
                </v-btn>
                </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon 
              color="white"
              >mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title><v-btn 
              text
              color="white"
               href="/patientlogin" >
                Patient
                </v-btn></v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-card>

   <v-card-title class="d-flex justify-center">
      <img
          class="d-flex justify-center"
          height="300"  
          max-width="300"
          src="~assets/M.svg"
      ><img>
     
    </v-card-title>

  </v-container>


</template>
<script>
  export default {
    data: () => ({
      drawer: false,
      group: null,
    }),
  }
</script>

