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
    <v-spacer></v-spacer>
       <v-toolbar-title >
               <img
                height="40"  
                max-width="50"
                src="~assets/M.svg"
                >
               </img>
      </v-toolbar-title>
          <v-alert
              color="#01579B"
              dark
              dense>
              MEENC HEALTH CARE
          </v-alert>
    <v-spacer></v-spacer>
    </v-app-bar>

    <v-card
    :max-width="$vuetify.breakpoint.smAndDown ? '100%' : '100%'"
      class="mx-auto"
      color="#01579B"
    >
    <v-card
    color="#BBDEFB">
      <v-row dense>
        <v-col cols="12">



          

          <v-alert
            outlined
            color="#0277BD"
          >
            <div class="patients">
              <v-card-actions>
                <div>  
                  <v-img
                    height="50"  
                    max-width="50"
                    class="mx-auto"
                    src="https://image.freepik.com/free-vector/doctor-icon-avatar-white_136162-58.jpg"
                ></v-img>
                  </div>
                  <v-btn 
                  text
                  color="#0277BD"  
                  href="/doctorpatients">
                    Patients

                  </v-btn>
             </v-card-actions>
            </div>
          </v-alert>
          <v-alert
            outlined
            color="#0277BD"
          >
            <div class="patients">
              <v-card-actions>
                <div>  
                  <v-img
                    height="50"  
                    max-width="50"
                    class="mx-auto"
                    src="https://image.freepik.com/free-vector/doctor-icon-avatar-white_136162-58.jpg"
                ></v-img>
                  </div>
                  <v-btn 
                  text
                  color="#0277BD"  
                  href="/doctorprescription">
                    Send Prescription
                  </v-btn>
             </v-card-actions>
            </div>
          </v-alert>

          <v-alert
            outlined
            color="#0277BD"
          >
            <div class="patients">
              <v-card-actions>
                <div>  
                  <v-img
                    height="50"  
                    max-width="50"
                    class="mx-auto"
                    src="https://image.freepik.com/free-vector/doctor-icon-avatar-white_136162-58.jpg"
                ></v-img>
                  </div>
                  <v-btn 
                  text
                  color="#0277BD"  
                  href="/doctorschedule">
                    Appointment Schedule

                  </v-btn>
             </v-card-actions>
            </div>
          </v-alert>

          <v-alert
            outlined
            color="#0277BD"
          >
            <div class="patients">
              <v-card-actions>
                <div>  
                  <v-img
                    height="50"  
                    max-width="50"
                    class="mx-auto"
                    src="https://image.freepik.com/free-vector/doctor-icon-avatar-white_136162-58.jpg"
                ></v-img>
                  </div>
                  <v-btn 
                  text
                  color="#0277BD"  
                  href="/doctorhistory">
                    Medical History

                  </v-btn>
             </v-card-actions>
            </div>
          </v-alert>



        </v-col>
      </v-row>
    </v-card>
  </v-card>
<v-card >
  <v-bottom-navigation
  background-color="#BBDEFB"
    :value="value"
    color="#01579B"
    grow
  >
    <v-btn href="/doctorhome">
      <span>Home</span>
      <v-icon>mdi-home</v-icon>
    </v-btn>

    <v-btn href="/doctorservices">
      <span>Services</span>

      <v-icon>mdi-calendar-range</v-icon>
    </v-btn>

    <v-btn  href="/doctoraccount">
      <span>Account</span>

      <v-icon >mdi-account</v-icon>
    </v-btn>
  </v-bottom-navigation>
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