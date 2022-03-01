<template>
  <div class="pa-0">
    
    <v-app-bar
      class="mx-auto my-1"
      color="#01579B"
      elevation="none"
    >
    <v-app-bar-nav-icon @click="$router.push('/doctorhome')"> <v-icon color="white">mdi-arrow-left</v-icon> </v-app-bar-nav-icon>
    <v-spacer></v-spacer>
    <v-alert
        color="#01579B"
        dark
        dense>
        MEENC HEALTH CARE
    </v-alert>
    <v-spacer></v-spacer>
    </v-app-bar>

    <v-card flat color="#BBDEFB" class="pa-4">

      <v-card-title class="d-flex justify-center">
        <img
          class="d-flex justify-center"
          height="50"  
          max-width="50"
          src="~assets/icon/services.png">
        <img>
        Services
      </v-card-title>

      <v-card-text
        @click="$router.push('/doctorviewcpatientconcern')"
        class="ma-0 pa-4 rounded-lg"
        color="#BBDEFB" style="border: 2px solid #1976d2; cursor:pointer;">

        <img
          height="50"  
          max-width="50"
          src="~assets/icon/consult.png" />

        <v-btn 
          class="pa-0 mt-n2"
          text
          color="#0277BD"  
          @click="$router.push('/doctorviewcpatientconcern')">
          Online Schedule
        </v-btn> 

        <div class="caption black--text">
          View patients Online consultation
        </div>

      </v-card-text>

      <v-card-text
        @click="$router.push('/doctorviewcpatientconcernfacetoface')"
        class="ma-0 pa-4 rounded-lg my-4"
        color="#BBDEFB" style="border: 2px solid #1976d2; cursor:pointer;">

        <img
          height="50"  
          max-width="50"
          src="~assets/icon/consult.png" />

        <v-btn 
          class="pa-0 mt-n2"
          text
          color="#0277BD"  
          @click="$router.push('/doctorviewcpatientconcernfacetoface')">
          Face to Face Schedule
        </v-btn> 

        <div class="caption black--text">
          View patients Online Face to Face Consultation
        </div>

      </v-card-text>

      <v-card-text
        @click="$router.push('/doctorviewpaymentbills')"
        class="ma-0 pa-4 rounded-lg my-4"
        color="#BBDEFB" style="border: 2px solid #1976d2; cursor:pointer;">

        <img
          height="50"  
          max-width="50"
          src="~assets/icon/rb.png" />

        <v-btn 
          class="pa-0 mt-n2"
          text
          color="#0277BD"  
          @click="$router.push('/doctorviewpaymentbills')">
          Payment Bills
        </v-btn> 

        <div class="caption black--text">
          View patients payments
        </div>

      </v-card-text>

      <v-card-text
        @click="$router.push('/doctormedicalconcern')"
        class="ma-0 pa-4 rounded-lg my-4"
        color="#BBDEFB" style="border: 2px solid #1976d2; cursor:pointer;">

        <img
          height="50"  
          max-width="50"
          src="~assets/icon/chat.png" />

        <v-btn 
          class="pa-0 mt-n2"
          text
          color="#0277BD"  
          @click="$router.push('/doctormedicalconcern')">
          Medical concerns
        </v-btn> 

        <div class="caption black--text">
          Send medical concerns, conditions and vital signs for your doctor
        </div>

      </v-card-text>

      <v-card-text
        @click="$router.push('/doctorcreateprescription')"
        class="ma-0 pa-4 rounded-lg my-4"
        color="#BBDEFB" style="border: 2px solid #1976d2; cursor:pointer;">

        <img
          height="50"  
          max-width="50"
          src="~assets/icon/prescription.png" />

        <v-btn 
          class="pa-0 mt-n2"
          text
          color="#0277BD"  
          @click="$router.push('/doctorcreateprescription')">
          Create prescription
        </v-btn> 

        <div class="caption black--text">
          Create electronic prescription to patient
        </div>

      </v-card-text>

      <v-card-text
        @click="$router.push('/doctorschedule')"
        class="ma-0 pa-4 rounded-lg my-4"
        color="#BBDEFB" style="border: 2px solid #1976d2; cursor:pointer;">

        <img
          height="50"  
          max-width="50"
          src="~assets/icon/appointment.png" />

        <v-btn 
          class="pa-0 mt-n2"
          text
          color="#0277BD"  
          @click="$router.push('/doctorschedule')">
          Add Appointment slot
        </v-btn> 

        <div class="caption black--text">
          View appoint schedule for Online Appointment
        </div>

      </v-card-text>

      <v-card-text
        @click="$router.push('/doctoreFtoFSchedule')"
        class="ma-0 pa-4 rounded-lg my-4"
        color="#BBDEFB" style="border: 2px solid #1976d2; cursor:pointer;">

        <img
          height="50"  
          max-width="50"
          src="~assets/icon/appointment.png" />

        <v-btn 
          class="pa-0 mt-n2"
          text
          color="#0277BD"  
          @click="$router.push('/doctoreFtoFSchedule')">
          Face to Face Slot
        </v-btn> 

        <div class="caption black--text">
          View appoint schedule for face to face consultation
        </div>

      </v-card-text>

    </v-card>

  </div>
</template>
<script>
  export default {
    layout: 'doctorDefault',

    data: () => ({
      drawer: false,
      group: null,
    }),
    data: () => ({ value: 1 }),
  
  }
</script>