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
               <img
                height="80%"  
                
                src="~assets/M.svg"
               >
               </img>
     
      <v-toolbar-title  
           > <v-alert
              color="#01579B"
              dark
              dense>
              MEENC HEALTH CARE
          </v-alert>
      </v-toolbar-title>
      <v-spacer></v-spacer>
       
         

    </v-app-bar>
  <v-card
    height="200"  
    :max-width="$vuetify.breakpoint.smAndDown ? '400' : '100%'"
    class="mx-auto"
    color="#01579B"
  >
    <v-img
    :height="$vuetify.breakpoint.smAndDown ? '250' : '750'"
        src="https://qtxasset.com/fiercehealthcare/1562973884/GettyImages-898906336.jpg/GettyImages-898906336.jpg?OhHp8.hb4iZbXQ.xHf4.JzCZpWlc56My"
        
    ></v-img>

    <v-card
    color="#BBDEFB">
      
      <v-row 
      dense>
        <v-col cols="12">
          <v-card
            rounded
            color="#0277BD"
            dark
          >
          <v-card-title class="text-h5">
             Hi,
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
            <v-card-subtitle>Select from our services</v-card-subtitle>
          </v-alert>
          <v-alert
            outlined
            color="#00B0FF"
          >
            <div class="consult">
              <v-card-actions>
                  <v-btn 
                  text
                  color="#00B0FF"  
                  href="/patientlogin">
                    Set Appointment
                  </v-btn>
                  <div>
                  <v-img
                      height="50"  
                      max-width="50"
                      class="mx-auto"
                      src="https://th.bing.com/th/id/Rf5f51c189d52f38c05801b493782359b?rik=VwgogHXIkcWG7g&riu=http%3a%2f%2fwww.efilingplus.com%2fwp-content%2fuploads%2f2016%2f11%2fkey-filing-dates-reminder-icon.png&ehk=sohHPBdkvJ8IW2dAkh2kU8ti7eMOGG%2f1vapH1OXIN0E%3d&risl=&pid=ImgRaw"
                  ></v-img>
                  </div>
             </v-card-actions>
            </div>
          </v-alert>

          <v-alert
            outlined
            color="#00B0FF"
          >
            <div class="doctors">
              <v-card-actions>
                  <v-btn 
                  text
                  color="#00B0FF"  
                  href="/patientlogin">
                    Doctors
                  </v-btn>

                  <div>
                     <v-img
                height="50"  
                max-width="50"
                class="mx-auto"
                src="https://image.freepik.com/free-vector/doctor-icon-avatar-white_136162-58.jpg"
                ></v-img>
                  </div>
             </v-card-actions>
            </div>
          </v-alert>
        </v-col>
      </v-row>
    </v-card>
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

          <v-list-item>
            <v-list-item-icon>
              <v-icon color="white"
              >mdi-hospital</v-icon>
            </v-list-item-icon>
            <v-list-item-title><v-btn 
            text
            color="white"
               href="/secretarylogin" >
                Secretary
                </v-btn></v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-card>

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

