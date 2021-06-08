<template>
<container >
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
  <v-card color="#BBDEFB">
    
    <v-card-title>
      Patients
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table 
    style="background-color:#BBDEFB"
    height="350"
      :headers="headers"
      :items="patients"
      :search="search"
    >
    </v-data-table>
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

</container>
</template>
<script>
  export default {
    data () {
      return {
        search: '',
        headers: [
          {
            text: 'NAMES',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Age', value: 'age' },
          { text: 'Sex', value: 'sex' },
          { text: 'Height(cm)', value: 'height' },
          { text: 'Weight(kg)', value: 'weight' },
          { text: 'Phone', value: 'phone' },
        ],
        patients: [
          {
            name: 'Maryrose Burlaza',
            age: 21,
            sex: 'Female',
            height: 167,
            weight: 55,
            phone: '09306749353',
            
          },
          {
           name: 'Erick John Garcia',
            age: 22,
            sex: 'Male',
            height: 170,
            weight: 60,
            phone: '09354459243',
          },
          {
            name: 'Nicholas Gabito',
            age: 21,
            sex: 'Male',
            height: 180,
            weight: 66,
            phone: '09778457312',
          },
          {
            name: 'Elaine Segui',
            age: 20,
            sex: 'Female',
            height: 168,
            weight: 54,
            phone: '09307846922',
          },
        ],
      }
    },
  }
</script>
