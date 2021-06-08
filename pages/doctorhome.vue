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
      <v-img
          src="https://qtxasset.com/fiercehealthcare/1562973884/GettyImages-898906336.jpg/GettyImages-898906336.jpg?OhHp8.hb4iZbXQ.xHf4.JzCZpWlc56My"
          :height="$vuetify.breakpoint.smAndDown ? '250' : '750'"
      ></v-img>
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
            <v-card-subtitle>Select from our services</v-card-subtitle>
            <v-card-subtitle></v-card-subtitle>
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
    data: () => ({ value: 0 }),
  
  }
</script>