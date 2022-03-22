<template>
  <v-card flat>
    <v-app-bar
      
      absolute
      color="#01579B"
      dark
      scroll-target="#scrolling-techniques-6"
    >
      <v-app-bar-nav-icon @click="$router.push('/patientservices')"> <v-icon color="white">mdi-arrow-left</v-icon> </v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title  
        text
        color="#01579B"
        dark
        class="text-center mx-auto"
        dense>
          My Face to Face Appointments
      </v-toolbar-title>
      <v-spacer></v-spacer>
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

    <v-card-text class="mt-16 pa-10">

      <div class="d-flex py-4">
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
      
      <v-data-table
        :headers="headers"
        :items="appointment"
        class="elevation-1" >
          <template v-slot:item.actions="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="showTable(item)"
            >
              mdi-eye
            </v-icon>
          </template>
        </v-data-table>

    </v-card-text>

    <v-dialog
      v-model="dialog"
      :scrollable="true"
      persistent
      width="500"
    >
      <v-card flat :disabled="disabled">

        <v-progress-linear
          v-if="disabled"
          indeterminate
          color="primary"
        ></v-progress-linear>

        <v-card-title>
          Edit Form
        </v-card-title>

        <v-card-text>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
                v-model="editedItem.bday"
                :rules="fieldRules"
                type="date"
                label="Birthday">

            </v-text-field>
            <v-text-field
                v-model="editedItem.address"
                :rules="fieldRules"
                label="Address">

            </v-text-field>
            <v-text-field
                v-model="editedItem.weight"
                :rules="fieldRules"
                label="Weight">

            </v-text-field>
            <v-text-field
                v-model="editedItem.height"
                :rules="fieldRules"
                label="Height">

            </v-text-field>
            <v-textarea
              v-model="editedItem.diagnosis"
              :rules="fieldRules"
              label="Diagnosis">

            </v-textarea>
          </v-form>
        </v-card-text>

        <v-card-actions class="pa-6">
          <v-btn outlined class="primary--text" @click="dialog = false">Close</v-btn>
          <v-spacer></v-spacer>
          <v-btn depressed class="primary" @click="save">Save</v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>

    <v-dialog
      v-model="dialog2"
      :scrollable="true"
      persistent
      width="900"
    >
      <v-card flat>

        <v-card-title>
          Appointments
        </v-card-title>

        <v-card-text>
          <v-data-table
            :headers="headers"
            :items="appointments"
            class="elevation-1" >
              <template v-slot:item.actions="{ item }">
                <v-icon
                  small
                  class="mr-2"
                  @click="editItem(item)"
                >
                  mdi-pencil
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
  import { mapActions, mapState } from 'vuex'
  import moment from 'moment'
  import shared from '~/pages/_patientshared'
  import head from '~/pages/_headServices'

  export default {
    layout: 'patientDefault',
    mixins: [shared, head],
    middleware({ store, redirect }) {
      // If the user is not authenticated
      if (!store.state.auth.loggedIn) {
        return redirect('/patientlogin')
      }
    },
    data: () => ({
      disabled: false,
      dialog2: false,
      dialog: false,
      valid: true,
      doctors: [],
      fieldRules: [
          v => !!v || "this field is required",
      ],
      headers: [
        { text: 'ID', value: 'id' },
        {
          text: 'Doctor Name',
          align: 'start',
          value: 'name',
        },
        { text: 'Schedule', value: 'schedule' },
        { text: 'Address', value: 'address', sortable: false },
        { text: 'Weight', value: 'weight', sortable: false },
        { text: 'Height', value: 'height', sortable: false },
        { text: 'Diagnosis', value: 'diagnosis', sortable: false },
        { text: 'Status', value: 'status', sortable: false },
        { text: 'Action', value: 'actions', sortable: false },
      ],
      appointment: [],
      appointments: [],
      temAppointment: [],
      editedIndex: -1,
      editedItem: {
        id: '',
        name: '',
        schedule: '',
        bday: '',
        address: '',
        weight: '',
        height: '',
        diagnosis: '',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      ...mapState('auth', [
        'user'
      ]),
    },

    created () {
      this.initialize()
    },

    methods: {
      async initialize () {
        const form = {
          patient_id: this.user.id,
          group_by: "doctor_id",
        }
        let res = await this.$axios.post(`api/authorized/get-patient-schedule-face`, form)

        if(res.status == 200) {
          res.data.data.forEach(r => {

            this.doctors.push({
              id: r.doctor_id,
              name: r.doctors_name,
            })

            this.appointment.push({
              id: r.id,
              doctor_id: r.doctor_id,
              name: r.doctors_name,
              schedule: moment(r.schedule).format("MMMM DD, YYYY, h:mm:ss a"),
              bday: moment(r.bday).format("MMMM DD, YYYY"),
              address: r.address,
              weight: r.weigth,
              height: r.heigth,
              diagnosis: r.diagnosis,
              status: r.status,
            })

          })

          this.temAppointment = this.appointment
        }

      },

      async filterTable(data) {
        if(data)
          this.appointment = this.temAppointment.filter(app => app.name == data)
        else
          this.appointment = this.temAppointment
      },

      editItem (item) {
        this.editedIndex = this.appointments.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.editedItem.bday = moment(this.editedItem.bday).format('YYYY-MM-DD')
        this.dialog = true
      },

      async showTable(item) {

        this.appointments = []

        const form = {
          patient_id: this.user.id,
          doctor_id: item.doctor_id
        }

        let res = await this.$axios.post(`api/authorized/get-patient-schedule-face`, form)

        if(res.status == 200) {

          res.data.data.forEach(r => {
            this.appointments.push({
              id: r.id,
              name: r.doctors_name,
              schedule: moment(r.schedule).format("MMMM DD, YYYY, h:mm:ss a"),
              bday: moment(r.bday).format("MMMM DD, YYYY"),
              address: r.address,
              weight: r.weigth,
              height: r.heigth,
              diagnosis: r.diagnosis,
              status: r.status,
            })
          })

          this.dialog2 = true
        }

      },

      async save () {

        this.disabled = true

        const valid = this.$refs.form.validate()

        if(valid) {
          
          this.editedItem.heigth = this.editedItem.height
          this.editedItem.weigth = this.editedItem.weight

          let res = await this.$axios.post(`api/authorized/edit-patient-schedule-face`, this.editedItem)

          if(res.status == 200) {
            if (this.editedIndex > -1) {
              Object.assign(this.appointments[this.editedIndex], this.editedItem)
            } else {
              this.appointments.push(this.editedItem)
            }
          }

        }

        this.disabled = false
        this.dialog = false

      },

    },
  }
</script>
