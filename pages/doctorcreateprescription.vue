<template>
<v-card  
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
              PRESCRIPTION
      </v-toolbar-title>
    <v-spacer> </v-spacer> 
    </v-app-bar>

 
 <v-card flat color="#BBDEFB" class="pa-1 mt-16">
  <v-data-table
    :headers="headers"
    :items="patient"
    class="elevation-1">
    <template v-slot:item.actions="{ item }">
    
      <v-icon
        
        @click="showPerspriction(item)"
        color="blue"
      >
        mdi-eye
      </v-icon>

    </template>
  </v-data-table>
  <v-dialog v-model="dialog" width="700" scrollable persistent>
    <v-card flat :disabled="submitting">
      <v-card-text>
        <v-row justify="center">
          <v-col :max-width="$vuetify.breakpoint.smAndDown ? '100%' : '100%'" >
            <v-card ref="form">
              <v-card-text class="pa-4">

                <v-row align="center" class="pa-4">
                  <v-col
                    cols="12">
                      <v-select
                        v-model="form['name']"
                        disabled
                        :items="patient"
                        item-text="name"
                        item-value="patient_id"
                        append-icon="mdi-account"
                        label="Patient Name">

                      </v-select>
                  </v-col>

                  <v-col
                    cols="12">
                      <v-textarea
                      ref="message"
                      append-icon="mdi-message"
                      v-model="form['prescription']"
                      label="Prescription:"
                      placeholder="Prescription"
                      counter="10"
                      ></v-textarea>
                  </v-col>

                </v-row>

              </v-card-text>

              <v-card-actions class="pa-4">
                <v-btn
                    outlined
                    class="secondary"
                    :disabled="submitting"
                    @click="dialog = false"
                  >
                  Close
                </v-btn>
              <v-spacer></v-spacer>
                <v-btn
                    rounded
                    color="green"
                    dark
                    :disabled="submitting"
                    @click="submit"
                  >
                  Send and Save as pdf
                </v-btn>
              </v-card-actions>

            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
  
  </v-card>
  <notifications group="foo" />
  </v-card>
</template>
<script>
  import { mapState } from 'vuex'
  import moment from 'moment'

  export default {
    data () {
      return {
        submitting: false,
        dialog: false,
        editedItem: {

        },
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
        patient: [],
        form: {
          name: '',
          date: '',
          prescription: ''
        }
      }
    },

    computed: {
      ...mapState('auth', [
        'user'
      ]),
    },

    mounted() {
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
              this.patient.push({
                  "patient_id": el.patient_id,
                  "name": el.patient_name,
                  "email": el.patient_email,
                  "phone": el.patient_phone,
                  "schedule_date": moment(el.schedule).format("MMMM DD, YYYY"),
                  "schedule_time": moment(el.schedule).format("h:mm:ss a"),
                  "sysmptoms": el.diagnosis,
                  "status": el.status,
              })
            })
          }

        } catch (err) {
          console.log(err)
        }
      },
      showPerspriction (item) {
        this.editedItem = Object.assign({}, item)
        this.form.name = this.editedItem.patient_id
        this.dialog = true
      },
      async submit() {
        this.submitting = true

        if(this.form.name && this.form.prescription) {
          let form = {
            patient_id: this.form.name,
            doctor_id: this.user.id,
            prescription: this.form.prescription
          }

          const res = await this.$axios.post(`api/authorized/create-prescription`, form)
  
          if(res.status === 201) {
            if(res.data.url) {
              this.dialog = false
              window.open(res.data.url)
            }
          }

        }

        this.submitting = false

      }
    }
  }
</script>
