<template>
<v-card  
   >
    <v-app-bar
      
      absolute
      color="#01579B"
      dark
      scroll-target="#scrolling-techniques-6"
    >
      <v-app-bar-nav-icon href="/patientdoctors"> <v-icon color="white">mdi-arrow-left</v-icon> </v-app-bar-nav-icon>
   <v-spacer> </v-spacer>   
      <v-toolbar-title  
          text
              color="#01579B"
              dark
              dense>
              Doctor Information
      </v-toolbar-title>
    <v-spacer> </v-spacer> 
    </v-app-bar>
    
    
    <br>
    <br>
    <v-card flat color="#BBDEFB" class="pa-6">
      <v-app-bar-nav-icon href="/patientchat"> <v-icon color="blue">mdi-chat</v-icon> Chat</v-app-bar-nav-icon>
    <v-card-title class="d-flex justify-center">
      <img
          class="d-flex justify-center"
          height="50"  
          max-width="50"
          src="~assets/doctor/R.png"
      ><img>
      DR. ERICK GARCIA
    </v-card-title >
    
      <v-card-text :style="$vuetify.breakpoint.smAndDown ? 'width:100%;' : 'width:35%;'" class="mx-auto">
   

    <v-card-title class="d-flex justify-center">
    Dermatologist</v-card-title>
    <v-divider></v-divider>
   </v-card-text>

<v-card-title class="d-flex justify-center">
     <v-icon color="blue">mdi-at</v-icon>
    erickgarcia@gmail.com
    </v-card-title>
    <br>
    <v-card-title class="d-flex justify-center">
     <v-icon color="blue">mdi-phone</v-icon>
    09305843532
    </v-card-title>

<br><br><br><br>
   <v-card-title class="d-flex justify-center">
     <img
          class="d-flex justify-center"
          height="50"  
          max-width="50"
          src="~assets/icon/calendar.png"
      ><img>
    Monday, Tuesday, Thursday
    </v-card-title>
    <v-card-title class="d-flex justify-center">
    9AM-12NN</v-card-title>
   <br><br><br><br>
   
    <br>

    
    <v-card-actions class="d-flex flex-column my-0 py-0">
       

    </v-card-actions>

    </v-card>
    
  <!-- <v-img
      :height="$vuetify.breakpoint.smAndDown ? '650' : '750'"
      src="https://i1.wp.com/www.success.com/wp-content/uploads/legacy/sites/default/files/main/articles/searchresults.jpg?fit=1024%2C1024&ssl=1"
    >


    
   
        
        <v-container fluid>
              <v-row align="center" >
            <v-col
            cols="12"
            md="6"
            
          >
            <v-list-item-title class="text-h6"
            >
               Doctor: Sam Gabito
              </v-list-item-title>
          </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <v-list-item-title class="text-h6">
                Email: samgabito@gmail.com
              </v-list-item-title>
            </v-col>

          <v-col
            cols="12"
            md="6" >

           <v-list-item-title class="text-h6">
                Height: 179
              </v-list-item-title>

          </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <v-list-item-title class="text-h6">
                Weight: 57
              </v-list-item-title>
            </v-col>
        
            <v-col
              class="d-flex"
              cols="12"
              sm="6"
            >
              <v-list-item-title class="text-h6">
                Birthday: 2000-07-12
              </v-list-item-title>
            </v-col>
          
            <v-col
              class="d-flex"
              cols="12"
              sm="6"
            >
              <v-list-item-title class="text-h6">
              Gender: Male
              </v-list-item-title>
            </v-col>

            <v-col
              class="d-flex"
              cols="12"
              sm="6"
              >
             <v-list-item-title class="text-h6">
                Degree Level: Doctorate
              </v-list-item-title>
            </v-col>
            
            <v-col
              class="d-flex"
              cols="12"
              sm="6"
              >
              <v-list-item-title class="text-h6">
                Degree Field: , Physicians
              </v-list-item-title>
            </v-col>

            <v-col
              class="d-flex"
              cols="12"
              sm="6"
              >
              <v-list-item-title class="text-h6">
                Clinic: Medical Clinic
              </v-list-item-title>
            </v-col>
          </v-row>
        </v-container>
    </v-img> -->
</v-card>



</template>
  
