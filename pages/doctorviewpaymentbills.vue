<template>

<v-card  flat 
   >
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
              Patient Bills
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
                    @click="$router.push('/doctormedicalconcern')">
                    View all
                  </v-btn>
                </div>
            </v-card-text>
          </v-card>
        </v-menu>
      </div>
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
      width="800"
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
              v-model="editedItem.payments"
              :rules="fieldRules"
              label="Payments"
            >
            </v-text-field>

            <v-select
              v-model="editedItem.payment_status"
              :items="['Unpaid', 'Paid', 'Canceled']"
              :rules="fieldRules"
              label="Status"
            >
            </v-select>
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
  import shared from '~/pages/_doctorshared'
  import head from '~/pages/_headServices'

  export default {
    layout: 'doctorDefault',

    mixins: [shared,head],

    middleware({ store, redirect }) {
      // If the user is not authenticated
      if (!store.state.auth.loggedIn) {
        return redirect('/doctorlogin')
      }
    },
    data: () => ({
      disabled: false,
      valid: true,
      fieldRules: [
          v => !!v || "this field is required",
      ],
      editedIndex: false,
      editedItem: {
        id: '',
        payment_status: '',
        payments: '',
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
        { text: 'Payments', value: 'payments' },
        { text: 'Payment Status', value: 'payment_status' },
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
                  "payments": el.payments,
                  "payment_status": el.payment_status,
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
                "payment_status": r.payment_status,
                "payments": r.payments ? '₱' + r.payments : '₱'+0,
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
