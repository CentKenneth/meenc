<template>

  <v-card color="blue">

<!-- head -->

    <v-btn icon>
           <v-app-bar-nav-icon href="/secretaryhome"> <v-icon color="black">mdi-home</v-icon> </v-app-bar-nav-icon>
          </v-btn>
      <v-spacer> </v-spacer>   
    <!-- head -->   
    <v-card-title>
      Doctors
      <v-spacer></v-spacer>
      <v-text-field
      color="#01579B"
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="patients"
      :search="search"
      
    >
    </v-data-table>
  </v-card>
  
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
          { text: 'Gender', value: 'gender' },
          { text: 'Email', value: 'email' },
          { text: 'Clinic Name', value: 'clinic' },
        ],
        patients: [
          {
            name: 'Maryrose Burlaza',
            age: 21,
            gender: 'Female',
            email: 'maryrose@email.con',
            clinic: 'SPMC',
           
            
          },
          {
           name: 'Erick John Garcia',
            age: 22,
            gender: 'Male',
            email: 'erick@email.com',
            clinic: 'RC',
           
          },
          {
            name: 'Nicholas Gabito',
            age: 21,
            gender: 'Male',
            email: 'nicholas@email.com',
            clinic: 'PC',
            
          },
          {
            name: 'Elaine Segui',
            age: 20,
            gender: 'Female',
            email: 'elaine@email.com',
            clinic: 'SPMC',
           
          },
        ],
      }
    },
  }
</script>
