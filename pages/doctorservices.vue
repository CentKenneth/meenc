<template>
  <div class="pa-0">
    
    <v-app-bar
      class="pa-0 primary lighten-1"
      dark
    >
    <v-spacer></v-spacer>
     <v-toolbar-title  
          text
          dense>
         MEENC HEALTH CARE
      </v-toolbar-title>
    <v-spacer></v-spacer>
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
                  @click="$router.push('/doctormedicalconcern')">
                  View all
                </v-btn>
              </div>
          </v-card-text>
        </v-card>
      </v-menu>
    </div>
    </v-app-bar>

    <v-card flat class="pa-4">

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
  import shared from '~/pages/_doctorshared'
  import head from '~/pages/_headServices'

  export default {
    layout: 'doctorDefault',

    mixins: [shared,head],

    data: () => ({
      menu: false,
      drawer: false,
      group: null,
    }),
  
  }
</script>