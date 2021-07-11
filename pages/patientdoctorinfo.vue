<template>
<v-card  
   >
    <v-app-bar
      
      absolute
      color="#01579B"
      dark
      scroll-target="#scrolling-techniques-6"
    >
      <v-app-bar-nav-icon href="/patientmedicalconcern"> <v-icon color="white">mdi-arrow-left</v-icon> </v-app-bar-nav-icon>
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


  <v-img
      :height="$vuetify.breakpoint.smAndDown ? '650' : '750'"
      src="https://i1.wp.com/www.success.com/wp-content/uploads/legacy/sites/default/files/main/articles/searchresults.jpg?fit=1024%2C1024&ssl=1"
    >


  
       
    <br>
    <br>
    <br>
        
        <v-container fluid>
              <v-row align="center" >
            <v-col
            cols="12"
            md="6"
            
          >
            <v-list-item-title class="text-h6"
            >
               Name: Sam Gabito
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
                
          <!-- gender -->
            <v-col
              class="d-flex"
              cols="12"
              sm="6"
            >
              <v-list-item-title class="text-h6">
                Birthday: 2000-07-12
              </v-list-item-title>
            </v-col>
          <!-- vvv -->
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
    </v-img>
</v-card>



</template>
  
