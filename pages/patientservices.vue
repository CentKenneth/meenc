<template
>
  <div>
    <v-app-bar
      class="primary lighten-1 elevation-0"
      dark
    >
      <v-app-bar-nav-icon @click="$router.push('/patienthome')"> <v-icon color="white">mdi-arrow-left</v-icon> </v-app-bar-nav-icon>
    <v-spacer></v-spacer>
        <v-toolbar-title  
              text
                  color="#01579B"
                  dark
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
                    @click="$router.push('/patientmedicalconcern')">
                    View all
                  </v-btn>
                </div>
            </v-card-text>
          </v-card>
        </v-menu>
      </div>
    </v-app-bar>

    <v-card flat  class="pa-4">

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
        v-for="(service, index) in services"
        :key="index"
        @click="$router.push(service.url)"
        class="ma-0 pa-4 rounded-lg my-2"
        color="#BBDEFB" style="border: 2px solid #1976d2; cursor:pointer;">

        <img
          height="50"  
          max-width="50"
          :src="require(`~/assets/icon/${service.img}.png`)" />

        <v-btn 
          class="pa-0 mt-n2"
          text
          color="#0277BD"  
          @click="$router.push(service.url)">
          {{ service.title }}
        </v-btn> 

        <div class="caption black--text">
          {{ service.subtitle }}
        </div>

      </v-card-text>

    </v-card>

  </div>
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
      services: [
        {
          title: 'Online checkup',
          subtitle: 'Set schedule for online checkup',
          url: '/patientschedule',
          img: 'schedule'
        },
        {
          title: 'Face to Face Appointment',
          subtitle: 'Set schedule for Face to Face Appointment',
          url: '/patientschedulefacetoface',
          img: 'schedule'
        },
        {
          title: 'Medical concerns',
          subtitle: 'Send medical concerns, conditions and vital signs for your doctor',
          url: '/patientmedicalconcern',
          img: 'chat'
        },
        {
          title: 'Doctors prescription',
          subtitle: 'View the doctor’s diagnosis and instruction',
          url: '/patientprescription',
          img: 'prescription'
        },
        {
          title: 'My Appointments',
          subtitle: 'Summary of appointments',
          url: '/patientsummaryappointments',
          img: 'ma'
        },
        {
          title: 'My Face to Face Appointments',
          subtitle: 'My Face to Face Appointments',
          url: '/patientsummaryappointmentsfacetoface',
          img: 'ma'
        }
      ],
      drawer: false,
      group: null,
    })
  
  }
</script>