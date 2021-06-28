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
    <v-app-bar-nav-icon 
          color="white"
          @click="drawer = true">
      </v-app-bar-nav-icon>
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
    


    <!-- menu -->
    <v-card
    height="400" 
    outlined
    :max-width="$vuetify.breakpoint.smAndDown ? '400' : '100%'"
    class="mx-auto"
    
  >
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
              color="white">mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title><v-btn 
                text
                color="white"
                 href="/doctorlogin" >
                Home
                </v-btn>
                </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon 
              color="white"
              >mdi-calendar-range</v-icon>
            </v-list-item-icon>
            <v-list-item-title><v-btn 
              text
              color="white"
               href="/doctorservices" >
                Services
                </v-btn></v-list-item-title>
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
               href="/doctoraccount" >
                Account
                </v-btn></v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon 
              color="white"
              >mdi-power</v-icon>
            </v-list-item-icon>
            <v-list-item-title><v-btn 
              text
              color="white"
               href="/" >
                Logout
                </v-btn></v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  <v-img
          src="https://qtxasset.com/fiercehealthcare/1562973884/GettyImages-898906336.jpg/GettyImages-898906336.jpg?OhHp8.hb4iZbXQ.xHf4.JzCZpWlc56My"
          :height="$vuetify.breakpoint.smAndDown ? '250' : '750'"
      ></v-img>

       <v-card
    :max-width="$vuetify.breakpoint.smAndDown ? '100%' : '100%'"
      class="mx-auto"
      color="#01579B"
    >
      
    <v-card
    color="#BBDEFB" >
      <v-row 
      dense>
        <v-col cols="12">
          <v-card
            rounded
            color="#0277BD"
            dark
          >
          <v-card-title class="text-h5">
             Hi, Cent!
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
            <v-card-subtitle>Choose from our healthy tips that would fit your need</v-card-subtitle>
            <v-card-subtitle></v-card-subtitle>
          </v-alert>
        </v-col>
      </v-row>
    <v-timeline
    align-top
    :dense="$vuetify.breakpoint.smAndDown"
  >
    <v-timeline-item
      v-for="(item, i) in items"
      :key="i"
      :color="item.color"
      :icon="item.icon"
      fill-dot
    >
      <v-card
        :color="item.color"
        dark
      >
        <v-card-title class="text-h6">
          Lorem Ipsum Dolor
        </v-card-title>
        <v-card-text class="white text--primary">
          <p>Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.</p>
          <v-btn
            :color="item.color"
            class="mx-0"
            outlined
          >
            Button
          </v-btn>
        </v-card-text>
      </v-card>
    </v-timeline-item>
  </v-timeline>
    </v-card>
  </v-card>
  
     
  </v-card>
    <!-- menu -->

   
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
