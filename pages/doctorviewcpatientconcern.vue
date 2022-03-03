<template>

<v-card  flat class="ma-2">
    <v-app-bar
      
      absolute
      color="#01579B"
      dark
      scroll-target="#scrolling-techniques-6"
    >
      <v-app-bar-nav-icon @click="$router.push('/doctorservices')"> <v-icon color="white">mdi-arrow-left</v-icon> </v-app-bar-nav-icon>
   <v-spacer> </v-spacer>   
      <v-toolbar-title  
          text
              color="#01579B"
              dark
              dense>
              Patient Concerns
      </v-toolbar-title>
    <v-spacer> </v-spacer> 
    </v-app-bar>

  <v-card-text class="pa-4 mt-16">
    <div class="d-flex">
      <v-spacer v-if="$vuetify.breakpoint.mdAndUp"></v-spacer>
      <div :style="$vuetify.breakpoint.mdAndUp ? 'width: 250px;' : 'width: 100%;'">
        <v-text-field
          @input="searchDoctor"
          placeholder="Search"
          outlined>

        </v-text-field>
      </div>
    </div>
    <v-data-table
      :headers="headers"
      :items="transactions"
      class="elevation-1">
      <template v-slot:item.actions="{ item }">
      
        <v-icon
          
          @click="showTable(item)"
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
      width="900"
    >
      <v-card flat>

        <v-card-title>
          Appointments
        </v-card-title>

        <v-card-text>
          <div class="d-flex">
            <v-spacer v-if="$vuetify.breakpoint.mdAndUp"></v-spacer>
              <div :style="$vuetify.breakpoint.mdAndUp ? 'width: 250px;' : 'width: 100%;'">
                <v-text-field
                  @input="searchPatient"
                  placeholder="Search"
                  outlined>

                </v-text-field>
            </div>
          </div>
          <v-data-table
            :headers="headers2"
            :items="transactionsDialog"
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

    <v-dialog
      v-model="dialog"
      :scrollable="true"
      persistent
      width="900"
    >
      <v-card flat :disabled="disabled" class="pa-2">

        <v-progress-linear
          v-if="disabled"
          indeterminate
          color="primary"
        ></v-progress-linear>

        <v-card-title>
          Patients Information Form
        </v-card-title>

        <v-card-text class="py-4 px-6">
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-row v-for="(layout, index) in layouts" :key="index">
              <v-col v-if="layout.title" class="title font-weight-bold">
                  {{layout.title}}
              </v-col>
              <template v-else>
                <v-col v-for="(fields, indx) in layout" :key="indx" class="pa-0 ma-0 px-2" cols="12" md="3">
                  <v-text-field
                    v-model="editedItem[fields]"
                    :label="labels[fields]"
                    outlined>

                  </v-text-field>
                </v-col>
              </template>

            </v-row>
          </v-form>
        </v-card-text>

        <v-card-actions class="pa-6">
          <v-btn outlined class="primary--text" @click="dialog = false">Close</v-btn>
          <v-spacer></v-spacer>
          <v-btn depressed class="primary" @click="save">Save</v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>

</v-card>
</template>

<script>
  import moment from 'moment'
  import { mapState } from 'vuex'
  import layout from '~/pages/patient-form-layout'
  import labels from '~/pages/patient-form-layout-labels'

  export default {
    layout: 'doctorDefault',

    middleware({ store, redirect }) {
      // If the user is not authenticated
      if (!store.state.auth.loggedIn) {
        return redirect('/doctorlogin')
      }
    },
    data: () => ({
      layouts: layout.layout,
      labels: labels.labels,
      disabled: false,
      valid: true,
      fieldRules: [
          v => !!v || "this field is required",
      ],
      editedIndex: false,
      editedItem: {
        "id": '',
        "status": '',

        "case-history": '',
        "other-history": '',
        "chief-complaints": '',
        "other-complaints": '',
        // external examination
        "cornea": "",
        "conjunctiva": "",
        "eyelids": "",
        "mgd": "",
        "lens": "",
        "pupil": "",
        "iris": "",
        "puncta": "",
        // refraction
        "oldrx-od": "",
        "oldrx-sph": "",
        "oldrx-cx": "",
        "oldrx-os": "",
        "oldrx-os-sph": "",
        "oldrx-os-cx": "",
        "oldrx-add": "",

        "newrx-od": "",
        "newrx-sph": "",
        "newrx-cx": "",
        "newrx-os": "",
        "newrx-os-sph": "",
        "newrx-os-cx": "",
        "newrx-add": "",

        "fva-odsc": "",
        "fva-ossc": "",
        "fva-ousc": "",
        "fva-odcc": "",
        "fva-oscc": "",
        "fva-oucc": "",

        "nva-ousc": "",
        "nva-oucc": "",
        "nva-pdod": "",
        "nva-pdos": "",
        "nva-pdou": "",

        "doctor-diagnosis": "",
        "management": "",
        "type-lens": "",
        "type-frame": "",

      },
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Patient Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Email', value: 'email' },
        { text: 'Mobile #', value: 'phone' },
        { text: 'Schedule Date', value: 'schedule_date' },
        { text: 'Schedule Time', value: 'schedule_time' },
        { text: 'Sysmptoms', value: 'sysmptoms' },
        { text: 'Action', value: 'actions', sortable: false },
      ],
      headers2: [
        {
          text: 'Patient Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Email', value: 'email' },
        { text: 'Mobile #', value: 'phone' },
        { text: 'Schedule Date', value: 'schedule_date' },
        { text: 'Schedule Time', value: 'schedule_time' },
        { text: 'Sysmptoms', value: 'sysmptoms' },
        { text: 'Status', value: 'status' },
        { text: 'Action', value: 'actions', sortable: false },
      ],
      dialog2: false,
      transactions: [],
      transactionsDialog: [],
      temptransactionsDialog: [],
      temptransactions: [],
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
        try {

          const form = {
            doctor_id: this.user.id,
            group_by: "patient_id",
          }

          // api request
          const transaction = await this.$axios.post(`api/authorized/get-patient-schedule-by-doctor`, form)
          
          // filter doctor email
          if (transaction?.data?.data) {
            transaction.data.data.forEach(el => {
              // push data to array
              this.transactions.push({
                  "name": el.patient_name,
                  "patient_id": el.patient_id,
                  "email": el.patient_email,
                  "phone": el.patient_phone,
                  "schedule_date": moment(el.schedule).format("MMMM DD, YYYY"),
                  "schedule_time": moment(el.schedule).format("h:mm:ss a"),
                  "sysmptoms": el.diagnosis,
              })
            })
          }

          this.temptransactions = this.transactions

        } catch (err) {

        }
      },
      async showTable(item) {

        this.transactionsDialog = []

        const form = {
          patient_id: item.patient_id,
          doctor_id: this.user.id
        }

        let res = await this.$axios.post(`api/authorized/get-patient-schedule-by-doctor`, form)

        if(res.status == 200) {

          res.data.data.forEach(r => {
            this.transactionsDialog.push({
                "id": r.id,
                "name": r.patient_name,
                "email": r.patient_email,
                "phone": r.patient_phone,
                "schedule_date": moment(r.schedule).format("MMMM DD, YYYY"),
                "schedule_time": moment(r.schedule).format("h:mm:ss a"),
                "sysmptoms": r.diagnosis,
                "status": r.status,
            })
          })

          this.temptransactionsDialog = this.transactionsDialog
          this.dialog2 = true
        }

      },
      searchDoctor(data) {

        let transaction = this.temptransactions.filter(doc => doc.name.includes(data) || doc.email.includes(data) || doc.phone.includes(data))

        if(transaction.length > 0) {
          this.transactions = transaction
        }
      },
      searchPatient(data) {
        let transaction = this.temptransactionsDialog.filter(doc => doc.name.includes(data) || doc.email.includes(data) || doc.phone.includes(data))

        if(transaction.length > 0) {
          this.transactionsDialog = transaction
        }
      },
      editItem (item) {
        this.editedIndex = this.transactionsDialog.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      async save() {
        this.disabled = true

        const valid = this.$refs.form.validate()

        if(valid) {

          let res = await this.$axios.post(`api/authorized/edit-patient-schedule`, this.editedItem)

          if(res.status == 200) {
            if (this.editedIndex > -1) {
              Object.assign(this.transactionsDialog[this.editedIndex], this.editedItem)
            } else {
              this.transactionsDialog.push(this.editedItem)
            }
          }

        }

        this.disabled = false
        this.dialog = false
      }
    },
  }
</script>
