<template>

<v-card  
   >
    <v-app-bar
      
      absolute
      color="#01579B"
      dark
      scroll-target="#scrolling-techniques-6"
    >
      <v-app-bar-nav-icon href="/patienthome"> <v-icon color="white">mdi-arrow-left</v-icon> </v-app-bar-nav-icon>
   <v-spacer> </v-spacer>   
      <v-toolbar-title  
          text
              color="#01579B"
              dark
              dense>
              List of Doctors
      </v-toolbar-title>
    <v-spacer> </v-spacer> 
    </v-app-bar>
<br>
<br>
<br>
   <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>

  <v-data-table
    :headers="headers"
    :items="transactions"
    :search="search"
    
  >
  </v-data-table>
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Doctors</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to download this prescription?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn href="#" color="green darken-1" text @click="deleteItemConfirm">Download</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
     
      <v-icon
        
        
      >
        mdi-message
      </v-icon>

    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  

</v-card>
</template>

<script>
import { mapState } from 'vuex'
  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Doctor Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Email', value: 'email' },
        { text: 'Degree Field', value: 'degreefield' },
        { text: 'Degree Level', value: 'degreelevel' },
        { text: 'Birthday', value: 'bday' },
        { text: 'Gender', value: 'gender' },
        { text: 'Clinic Name', value: 'clinicname' },
        { text: 'Actions', value: 'actions' },

        
      ],
      transactions: [],
      degreefield: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        email: '',
        degreefield: '',
        degreelevel: '',
        bday: '',
        gender:'',
        clinicname:'',

      },
      defaultItem: {
        name: '',
        email: '',
        degreefield: '',
        degreelevel: '',
        bday: '',
        gender:'',
        clinicname:'',
      },
    }),

    computed: {
      ...mapState('auth', [
        'user'
      ]),
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    mounted () {
      this.initialize()
    },

    methods: {
      async initialize () {
        try {

          // api request
          const user = await this.$axios.get(`api/authorized/doctor-email`)

          // filter doctor email
          if (user?.data) {
            user.data.map((el) => {
              // push data to array
              this.transactions.push({
                  "name": el.name,
                  "email": el.email,
                  "degreefield": el.degreefield,
                  "degreelevel": el.degreelevel,
                  "bday": el.bday,
                  "gender": el.gender,
                  "clinicname": el.clinicname,
              })
            })
          }

        } catch (err) {

        }
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.desserts.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>

