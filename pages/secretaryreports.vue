<template
>
<v-container
    class="spacing-playground pa-0"
    fluid 
  >
    <v-app-bar
      class="mx-auto my-1"
      color="#01579B"
      elevation="none"
    >
    <v-app-bar-nav-icon href="/secretaryhome"> <v-icon color="white">mdi-arrow-left</v-icon> </v-app-bar-nav-icon>
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
    </v-app-bar>
    <v-card flat color="#BBDEFB" class="pa-6">
    <v-card-title class="d-flex justify-center">
      <img
          class="d-flex justify-center"
          height="50"  
          max-width="50"
          src="~assets/icon/services.png"
      ><img>
      Reports
    </v-card-title>
    <v-card-text :style="$vuetify.breakpoint.smAndDown ? 'width:100%;' : 'width:35%;'" class="mx-auto">
    </v-card-text>
    <v-card-actions class="d-flex flex-column my-0 py-0">
    </v-card-actions>
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
<v-card-text :style="$vuetify.breakpoint.smAndDown ? 'width:100%;' : 'width:35%;'" class="mx-auto">

          <v-alert  
            outlined
            color="#0277BD"
          >
            <div class="Appointment Schedule">
              <v-card-actions>
                <div> 
                  <img
                   class="d-flex justify-center"
                    height="50"  
                    max-width="50"    
                    src="~assets/icon/appointment.png"
                  ><img>
                </div> 
                  <v-btn 
                  text
                  color="#0277BD"  
                  href="/secretaryviewappointmentschedule">
                    View Appointment Schedule
                  </v-btn>  
             </v-card-actions>
             <v-card-subtitle>View appoint schedule for face to face consultation</v-card-subtitle>
            </div>
          </v-alert>

            <v-alert
            outlined
            color="#0277BD"
            >
            <div class="patients">
              <v-card-actions>
                  <img
                  class="d-flex justify-center"
                    height="50"  
                    max-width="50"
                    
                    src="~assets/icon/ma.png"
                ><img>
                  <v-btn 
                  text
                  color="#0277BD"  
                  href="/secretarysummaryappointment">
                    Approve Appointments
                  </v-btn>
             </v-card-actions>
             <v-card-subtitle>Summary of appointments</v-card-subtitle>
            </div>
          </v-alert>

          <v-alert
            outlined
            color="#0277BD"
          >
            <div class="patients">
              <v-card-actions>
                  <img
                  class="d-flex justify-center"
                    height="50"  
                    max-width="50"
                    
                    src="~assets/icon/history.png"
                ><img>
                  <v-btn 
                  text
                  color="#0277BD"  
                  href="/secretarymedicalhistory">
                    Medical History
                  </v-btn>
             </v-card-actions>
             <v-card-subtitle>Set schedule for online checkup</v-card-subtitle>
            </div>
          </v-alert>
</v-card-text>


        </v-col>
      </v-row>
    </v-card>
  </v-card>


  </v-container>


</template>
<script>
  export default {
    data: () => ({
      drawer: false,
      group: null,
    }),
    data: () => ({ value: 1 }),
  
  }
</script>