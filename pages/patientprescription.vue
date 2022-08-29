<template>

<v-card flat>
    <v-app-bar
      class="pa-0 primary lighten-1"
      dark
    >
      <v-app-bar-nav-icon @click="$router.push('/patientservices')"> <v-icon color="white">mdi-arrow-left</v-icon> </v-app-bar-nav-icon>
   <v-spacer> </v-spacer>   
      <v-toolbar-title  
          text
          dense>
          Prescriptions
      </v-toolbar-title>
    <v-spacer> </v-spacer> 
    <div>
        <v-menu
        :close-on-content-click="false"
        :nudge-width="300"
        offset-x>
        <template v-slot:activator="{ on, attrs }">
            <v-icon @click="updateNotifications" color="white" v-bind="attrs" v-on="on">
            mdi-message
            </v-icon>
            <v-avatar class="ml-n3 mt-n3" size="16" color="red" style="color:white;">
            {{counter}}
            </v-avatar>
        </template>
        <v-card flat>
            <v-card-text class="">
            Messages
            </v-card-text>
            <v-card-text class="pt-0" v-if="notifications.length > 0">
                <div class="d-flex flex-column" v-for="notification in notifications" :key="notification.id">
                <v-divider></v-divider>
                <div class="py-3">
                    <div>
                    {{notification.messages}}
                    </div>
                    <div class="caption text-right">
                    {{convertDate(notification.created_at)}}
                    </div>
                </div>
                </div>
                <v-divider></v-divider>
                <div class="pt-4 text-center">
                <v-btn 
                    class="pa-0 mt-n2"
                    text
                    color="#0277BD"  
                    @click="$router.push('/patientmedicalconcern')">
                    View all
                </v-btn>
                </div>
            </v-card-text>
        </v-card>
        </v-menu>
    </div>
    </v-app-bar>

  <v-card-text class="mt-2">
    <div class="d-flex">
      <v-spacer v-if="$vuetify.breakpoint.mdAndUp"></v-spacer>
      <div :style="$vuetify.breakpoint.mdAndUp ? 'width: 250px;' : 'width: 100%;'">
        <v-select
          :items="doctors"
          clearable
          @change="filterTable"
          placeholder="Filter by Doctor"
          item-text="name"
          outlined>

        </v-select>
      </div>
    </div>
    
  </v-card-text>

  <v-card-text class="pt-0">
    <v-data-table
      :headers="headers"
      :items="prescription"
      class="elevation-1"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon
          @click="showItem(item)"
          color="blue"
        >
          mdi-eye
        </v-icon>

      </template>
    </v-data-table>
  </v-card-text>
    

  <v-dialog
      v-model="dialog2"
      :scrollable="true"
      persistent
      width="800"
    >
      <v-card flat>

        <v-card-title>
          Prescriptions
        </v-card-title>

        <v-card-text>
          <v-data-table
            :headers="headers"
            :items="prescriptions"
            class="elevation-1" >
              <template v-slot:item.actions="{ item }">
                <v-icon
                  small
                  :disabled="item.url == ''"
                  class="mr-2"
                  @click="showPrescription(item)"
                >
                  mdi-eye
                </v-icon>
              </template>
            </v-data-table>
        </v-card-text>

        <v-card-actions class="pa-6">
          <v-spacer></v-spacer>
          <v-btn outlined class="primary--text" @click="dialog2 = false">Close</v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>
  
</v-card>
</template>

<script>
import { mapState } from 'vuex'
  import shared from '~/pages/_patientshared'
  import head from '~/pages/_headServices'

  export default {
    layout: 'patientDefault',
    mixins: [shared,head],
    data: () => ({
      dialog2: false,
      dialog: false,
      editedItem: {},
      doctors: [],
      headers: [
        {
          text: 'Doctor Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Prescription', value: 'prescription' },
        { text: 'Actions', value: 'actions' },
      ],
      prescription: [],
      tempprescription: [],
      prescriptions: []
    }),

    computed: {
      ...mapState('auth', [
        'user'
      ]),
    },

    mounted () {
      this.initialize()
    },

    methods: {
      async initialize () {
        const form = {
          patient_id: this.user.id,
        }

        let res = await this.$axios.post(`api/authorized/get-prescription`, form)

        if(res.status == 200) {
           res.data.data.forEach(r => {

            this.doctors.push({
              id: r.doctor_id,
              name: r.doctor_name,
            })

            this.prescription.push({
              doctor_id: r.doctor_id,
              name: r.doctor_name,
              prescription: r.prescription,
              url: r.url
            })

          })

          this.tempprescription = this.prescription
        }

      },

      async filterTable(data) {
        if(data)
          this.prescription = this.tempprescription.filter(app => app.name == data)
        else
          this.prescription = this.tempprescription
      },

      async showItem (item) {
        this.prescriptions = []
        const form = {
          patient_id: this.user.id,
          doctor_id: item.doctor_id,
        }

        let res = await this.$axios.post(`api/authorized/get-prescription-by-doctor`, form)

        if(res.status === 200) {
          res.data.data.forEach(r => {

            this.prescriptions.push({
              doctor_id: r.doctor_id,
              name: r.doctor_name,
              prescription: r.prescription,
              url: r.url
            })

          })

          this.dialog2 = true

        }

      },

      showPrescription(item){
        if(item.url) {
          window.open(item.url)
        }
      }

    },
  }
</script>

