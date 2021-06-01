<template
>
<v-container
    class="spacing-playground pa-1"
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
          <v-btn icon>
           <v-app-bar-nav-icon href="/doctorlogin"> <v-icon color="white">mdi-logout</v-icon> </v-app-bar-nav-icon>
          </v-btn>
    
    </v-app-bar>
  
  <v-card
    height="200"  
    :max-width="$vuetify.breakpoint.smAndDown ? '400' : '100%'"
    class="mx-auto"
    color="#01579B"
  >
    <v-img
        src="https://qtxasset.com/fiercehealthcare/1562973884/GettyImages-898906336.jpg/GettyImages-898906336.jpg?OhHp8.hb4iZbXQ.xHf4.JzCZpWlc56My"
        height="200px"
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
              <v-app-bar-nav-icon  >
          <v-icon color="white">mdi-magnify</v-icon> </v-app-bar-nav-icon>
            </v-card-title>

            <v-spacer></v-spacer>
          <v-btn icon>
           <v-app-bar-nav-icon href="chats"> <v-icon color="white">mdi-message-text</v-icon> </v-app-bar-nav-icon>
          </v-btn>
          </v-card>


         <v-alert
            outlined
            color="#00B0FF"
          >
            <div class="consult">
              <v-card-actions>
                  <v-btn 
                  text
                  color="#00B0FF"  
                  href="/secretaryadddoctor">
                    Add New Doctor
                     <v-icon
                color="#00B0FF"
                right
              >
                mdi-hospital
              </v-icon>
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
                    <v-alert
            outlined
            color="#00B0FF"
          >
            <div class="doctors">
              <v-card-actions>
                  <v-btn 
                  text
                  color="#00B0FF"  
                  href="secretarydoctors">
                    View Doctors
                                <v-icon
                color="#00B0FF"
                right
              >
                mdi-open-in-new
              </v-icon>
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
          <v-alert
            outlined
            color="#00B0FF"
          >
            <div class="consult">
              <v-card-actions>
                  <v-btn 
                  text
                  color="#00B0FF"  
                  href="/secretarydoctorsappoinment">
                    Doctor's Appointments
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


        </v-col>
      </v-row>
    </v-card>


    <!-- profile -->
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
         <v-list>
          <v-list-item class="px-2">
            <v-list-item-avatar>
              <v-img src="https://scontent.fceb1-2.fna.fbcdn.net/v/t1.6435-9/175139102_2818262691718739_2511921647492250868_n.jpg?_nc_cat=100&ccb=1-3&_nc_sid=09cbfe&_nc_eui2=AeEcq-0EvYvLVpyZNXRLk56IpW9S2D6pfhmlb1LYPql-GdNVjzJUswtmpM4lc3ZvkRUm4alT9drKH22fHqSaYSA3&_nc_ohc=31nMaq4QDMsAX8_LBDq&_nc_ht=scontent.fceb1-2.fna&oh=83b51cff20334e6c30238e8880e15de7&oe=60D5A81E"></v-img>
            </v-list-item-avatar>
          </v-list-item>
          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title class="title">
                Cent Kenneth Peria
              </v-list-item-title>
              <v-list-item-subtitle
              >centkenneth.peria@dnsc.edu.ph.com</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
          <v-list-item>
            <v-list-item-icon>
              <v-icon color="white">mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title >
                <v-btn text
                color="white"
               href="/doctorhome" >
                    Home
                </v-btn>
            </v-list-item-title>
          </v-list-item>

          <v-list-item  >
            <v-list-item-icon>
              <v-icon
              color="white">mdi-wrench</v-icon>
            </v-list-item-icon>
            <v-list-item-title><v-btn 
                text
                color="white"
                 href="/doctorsettings" >
                Settings
                </v-btn>
                </v-list-item-title>
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