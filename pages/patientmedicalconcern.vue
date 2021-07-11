<template>
<v-card  
   >

    <v-app-bar
      
      absolute
      color="#01579B"
      dark
      scroll-target="#scrolling-techniques-6"
    >
      <v-app-bar-nav-icon href="/patientservices"> <v-icon color="white">mdi-arrow-left</v-icon> </v-app-bar-nav-icon>
   <v-spacer> </v-spacer>   
      <v-toolbar-title  
          text
              color="#01579B"
              
              dense>
              Medical Concern
      </v-toolbar-title>
    <v-spacer> </v-spacer> 
    </v-app-bar>
    
 <v-card flat color="#BBDEFB" class="pa-1">
  <v-row justify="center">
    <v-col
    :max-width="$vuetify.breakpoint.smAndDown ? '100%' : '100%'"
    >
    </v-col>
  </v-row>

  </v-card
  >

    <v-toolbar
    >
     



      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-toolbar>

    <v-list subheader  height="570">
      <v-subheader>Doctors</v-subheader>

      <v-list-item
        v-for="chat in recent"
        :key="chat.title"
      >
        <v-list-item-icon>
         <v-app-bar-nav-icon href="/patientdoctorinfo"> <v-icon  >
            mdi-information
          </v-icon>
            </v-app-bar-nav-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title v-text="chat.title"></v-list-item-title>
        </v-list-item-content>
<!--  -->
        <v-list-item-icon>
         <v-app-bar-nav-icon href="/patientchat"> <v-icon :color="chat.active ? 'deep-purple accent-4' : 'grey'">
            mdi-message-outline
          </v-icon>
            </v-app-bar-nav-icon>
        </v-list-item-icon>
      </v-list-item>
    </v-list>

  </v-card>
  
</template>
<script>
  export default {
    data: () => ({
      recent: [
        {
          active: true,
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Sam Gabito',
        },
        {
          active: true,
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Mike Carlson',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Cindy Baker',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Ali Connors',
        },
      ],
      previous: [{
        title: 'Travis Howard',
        avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
      }],
    }),
  }
</script>
