<template>
<v-card  
   >
    <v-app-bar
      
      absolute
      color="#01579B"
      dark
      scroll-target="#scrolling-techniques-6"
    >
      <v-app-bar-nav-icon href="/doctormedicalconcern"> <v-icon color="white">mdi-arrow-left</v-icon> </v-app-bar-nav-icon>
   <v-spacer> </v-spacer>   
      <v-toolbar-title  
          text
              color="#01579B"
              dark
              dense>
              Patient Information
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
               Name: Cent Kenneth Peria
              </v-list-item-title>
          </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <v-list-item-title class="text-h6">
                Email: Cent Kenneth Peria
              </v-list-item-title>
            </v-col>

          <v-col
            cols="12"
            md="6" >

           <v-list-item-title class="text-h6">
                Height: 173
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
                Birthday: 1999-06-12
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
                Phone: 09308139291
              </v-list-item-title>
            </v-col>
            
            <v-col
              class="d-flex"
              cols="12"
              sm="6"
              >
              <v-list-item-title class="text-h6">
                Address: Cagayan, Davao City
              </v-list-item-title>
            </v-col>
          </v-row>
        </v-container>
    </v-img>
</v-card>



</template>
  
