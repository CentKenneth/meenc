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
              Schedule for Online Checkup
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
            <v-autocomplete
              v-model="form['']"
              :loading="loading"
              :items="items"
              :search-input.sync="search"
              cache-items
              class="mx-4"
              flat
              hide-no-data
              hide-details
              label="Send to"
              solo-inverted>
          </v-autocomplete>

          <v-text-field
          v-model="form['email']"
          :rules="emailRules"
           prepend-icon="mdi-email"
          label="E-mail"
        ></v-text-field>

        <v-text-field
            ref="mobile#"
            v-model="form['phone']"
            :rules="[() => !!name || 'This field is required']"
            :error-messages="errorMessages"
            label="Mobile #:"
            placeholder="mobile number"
             prepend-icon="mdi-phone"
          ></v-text-field>
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

                  <!-- time -->
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

          <v-textarea
            ref="problem"
            v-model="form['sysmptoms']"
            prepend-icon="mdi-virus"
         
            label="Symptoms description :"
            placeholder="Short Description of patient's problems"
            counter="10"
          ></v-textarea>

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
  </v-card>
</template>
<script>
  export default {
    data () {
      return {
        show1: false,
        show2: true,
        show3: false,
        show4: false,
        modal: false,
        modal2: false,
        submitting: false,
        date: '',
        time: null,
        form: {
          'email': '',
          'phone': '',
          'schedule_date': '',
          'schedule_time': '',
          'sysmptoms': '',
        },
        emailRules: [
          v => !!v || "E-mail is required",
          v => /.+@.+/.test(v) || "E-mail must be valid"
        ],
        passwordRules: [
            v => !!v || "Password is required",
            v => {
                const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#.,)(_\$%\^&\*])(?=.{8,})/;
                return (
                    pattern.test(v) ||
                    "Min. 8 characters with at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"
                );
            }
        ],

      }
     
    },

    methods: {
      async register() {

        try {

          this.submitting = true

          const res = await this.$axios.post('api/schedule', this.form)

          if (res.status === 201) {

            this.$notify({
              type: 'success',
              group: 'foo',
              title: 'Success!',
              text: 'Successfully set an online consultation'
            })

            this.form = {}

            this.$router.push('/patientsetschedule')

          }

        } catch (err) {

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
