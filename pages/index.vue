<template>
  
  <!-- <v-card
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
  </v-card> -->
  <v-card flat>
    <v-card-title class="d-flex justify-center">
      <img
          class="d-flex justify-center mt-10"
          height="200"  
          max-width="200"
          src="~assets/M.svg"
      ><img>
    </v-card-title>
    <v-card-text>
      <v-card @click="$router.push('/patientlogin')" max-width="300" flat class="primary lighten-3 mx-auto pa-5 rounded-lg title text-center">
        Patient
      </v-card>
      <v-card @click="$router.push('/doctorlogin')" max-width="300" flat class="primary lighten-3 mx-auto pa-5 rounded-lg title mt-2 text-center">
        Doctor
      </v-card>
    </v-card-text>
  </v-card>

</template>
<script>
  export default {
    layout: 'default',
    data: () => ({
      drawer: false,
      group: null,
    }),
  }
</script>

