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
      <v-icon>mdi-account</v-icon>
      Services
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
            <div class="patients">
              <v-card-actions>
                 <div>   
                 <v-img
                 class="d-flex justify-center"
                    height="50"  
                    max-width="50"
                    src="https://image.freepik.com/free-vector/doctor-icon-avatar-white_136162-58.jpg"
                ></v-img>
                 </div> 
              
                  <v-btn 
                  text
                  color="#0277BD"  
                  href="/patientcreateappointment">
                    Set Schedule
                  </v-btn>
                
             </v-card-actions>
             
             <v-card-subtitle>Set schedule for online checkup</v-card-subtitle>
             
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
                 class="d-flex justify-center"
                    height="50"  
                    max-width="50"
                    src="https://image.freepik.com/free-vector/doctor-icon-avatar-white_136162-58.jpg"
                ></v-img>
                 </div>   
                  <v-btn 
                  text
                  color="#0277BD"  
                  href="/patientprescription">
                    Medical prescription
                  </v-btn>
             </v-card-actions>
             <v-card-subtitle>Set schedule for online checkup</v-card-subtitle>
            </div>
          </v-alert>
 

          <v-alert
         
            outlined
            color="#0277BD"
          >
            <div class="Appointment Schedule">
              <v-card-actions>
                
                  <div> 
                  <v-img
                   class="d-flex justify-center"
                    height="50"  
                    max-width="50"    
                    src="https://image.freepik.com/free-vector/doctor-icon-avatar-white_136162-58.jpg"
                ></v-img>
                </div> 
                  <v-btn 
                  text
                  color="#0277BD"  
                  href="/patientschedule">
                    Appointment Schedule
                  </v-btn>  
             </v-card-actions>
             <v-card-subtitle>Set schedule for online checkup</v-card-subtitle>
            </div>
          </v-alert>

          <v-alert
            outlined
            color="#0277BD"
          >
            <div class="patients">
              <v-card-actions>
                  <v-img
                  class="d-flex justify-center"
                    height="50"  
                    max-width="50"
                    
                    src="https://image.freepik.com/free-vector/doctor-icon-avatar-white_136162-58.jpg"
                ></v-img>
                  <v-btn 
                  text
                  color="#0277BD"  
                  href="/patienthistory">
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
<v-card >
  <v-bottom-navigation
  background-color="#BBDEFB"
    :value="value"
    color="#01579B"
    grow
  >
    <v-btn href="/dpatienthome">
      <span>Home</span>
      <v-icon>mdi-home</v-icon>
    </v-btn>

    <v-btn href="/patientservices">
      <span>Services</span>

      <v-icon>mdi-calendar-range</v-icon>
    </v-btn>

    <v-btn  href="/patientaccount">
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