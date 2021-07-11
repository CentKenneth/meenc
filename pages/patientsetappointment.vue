<template>
<v-card  
   >

    <v-app-bar
      
      absolute
      color="#01579B"
      dark
      scroll-target="#scrolling-techniques-6"
    >
      <v-app-bar-nav-icon href="/patientservices"> <v-icon color="white">mdi-arrow-left</v-icon> </v-app-bar-nav-icon>
   <v-spacer> </v-spacer>   
      <v-toolbar-title  
          text
              color="#01579B"
              dark
              dense>
              Appointment Schedule
      </v-toolbar-title>
    <v-spacer> </v-spacer> 
    </v-app-bar>
    <v-img
      :height="$vuetify.breakpoint.smAndDown ? '300' : '350'"
      src="https://media.istockphoto.com/photos/hospital-blurry-background-picture-id939102942?k=6&m=939102942&s=170667a&w=0&h=Df0vc28Ikv_Fk3pAiuiTMwEwLvdnFekfXmoGop2VN7s="
    ></v-img>

  
 <v-card flat color="#BBDEFB" class="pa-1">
  <v-row justify="center">
    <v-col
    :max-width="$vuetify.breakpoint.smAndDown ? '100%' : '100%'"
    >
      <v-card ref="form">
        <v-card-text>
          <v-row align="center">
           <v-col
            cols="12"
            md="6"
          >

          <v-select
            label="Send To"
            :items="doctor"
            item-value="email"
            item-text="name"
            v-model="form['sendto']"
            prepend-icon="mdi-send"
          >
          </v-select>
          </v-col>
          <v-col
          class="d-flex"
          cols="12"
          sm="6"
          >

            <v-text-field
              v-model="form['name']"
              prepend-icon="mdi-email"
              label="Name"
            ></v-text-field>
          </v-col>
              <v-col
              class="d-flex"
              cols="12"
              sm="6"
              >
          <v-text-field
            v-model="form['email']"
            prepend-icon="mdi-email"
            label="E-mail"
          ></v-text-field>
          </v-col>
            <v-col
            class="d-flex"
            cols="12"
            sm="6"
            >

          <v-text-field
            name="input-13-2"
            v-model="form['address']"
            label="Address"
            value=""
            class="input-group--focused"
            prepend-icon="mdi-map-marker-outline"
          >
          </v-text-field>
        </v-col>
              <v-col
              class="d-flex"
              cols="12"
              sm="6"
              >
          <v-text-field
            v-model="form['phone']"
            label="Mobile #:"
            placeholder="mobile number"
            prepend-icon="mdi-phone"
          ></v-text-field>
          </v-col>
              <v-col
              class="d-flex"
              cols="12"
              sm="6"
              >
          <!-- date -->
          <v-dialog
              ref="dialog1"
              v-model="modal"
              :return-value.sync="form['schedule_date']"
              persistent
              width="290px"
              >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="form['schedule_date']"
                  label="Date Schedule"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date"
                scrollable
              >
                <v-spacer></v-spacer>
                <v-btn
                  text
                  color="primary"
                  @click="modal = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.dialog1.save(date)"
                >
                  OK
                </v-btn>
              </v-date-picker>
          </v-dialog>
          </v-col>
              <v-col
              class="d-flex"
              cols="12"
              sm="6"
              >

                 
          <v-dialog
              ref="dialog2"
              v-model="modal2"
              :return-value.sync="form['schedule_time']"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="form['schedule_time']"
                  label="Time Schedule"
                  prepend-icon="mdi-clock-time-four-outline"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="modal2"
                v-model="time"
                full-width
              >
            <v-spacer></v-spacer>
            <v-btn
              text
              color="primary"
              @click="modal2 = false"
            >
              Cancel
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.dialog2.save(time)"
            >
              OK
            </v-btn>
          </v-time-picker>
        </v-dialog>
        </v-col>
              <v-col
              class="d-flex"
              cols="12"
              sm="6"
              >
        <v-textarea
          ref="problem"
          prepend-icon="mdi-virus"
          v-model="form['sysmptoms']"
          label="Symptoms description :"
          placeholder="Short Description of patient's problems"
          counter="10"
        ></v-textarea>
        </v-col>
          </v-row>  
        </v-card-text>
        <v-divider class="mt-12"></v-divider>
        <v-card-actions>
         
          <v-spacer></v-spacer>
        
          <v-btn
           rounded
              color="green"
              dark
              :disabled="submitting"
              @click="submit"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
  </v-card>
  <notifications group="foo" />
  </v-card>
</template>
<script>
  import { mapState } from 'vuex'
  export default {
    data () {
      return {
        form: {
         
        },
        submitting: false,
        modal2: false,
        modal: false,
        doctor: [],
        date: '',
        time: '',
        
       
        
        
      }
     
    },

    computed: {
      ...mapState('auth', [
        'user'
      ]),
    },

    mounted() {
      this.getDoctor()
    },

    methods: {
      async getDoctor() {

        // api request
        const doctor = await this.$axios.get('api/authorized/doctor-email')

        // filter doctor email
        if (doctor?.data) {
          doctor.data.map((el) => {
            // push data to array
            this.doctor.push({'id': el.id, 'email': el.email, name: 'Dr. ' + el.lastname})
          })
        }

      },
      async submit() {
        try {

          if (Object.keys(this.form).length > 0) {

            // submitting to true
            this.submitting = true

            // put user id to form
            this.form['user_id'] = this.user.id
              this.form['transactiontype'] = "Appointment"
              this.form['status'] = "Pending"
            

            // api request
            const data = await this.$axios.post('api/authorized/schedule-appointment', this.form)

            // if status = 201 means created
            if (data.status == 201) {

              this.$notify({
                type: 'success',
                group: 'foo',
                title: 'Success!',
                text: 'Successfully Scheduled'
              })

              this.form = {transactiontype:'Appointment',
              status:'Pending'}

            }

          }

        } catch(err) {

          this.$notify({
            type: 'error',
            group: 'foo',
            title: 'Error!',
            text: err.message
          })

        } finally {
          this.submitting = false
        }
        
      }
    }

  }
</script>
