<template>
  <v-card>
    <v-card-title>
      My Patients
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
