<template>

    <v-card
        :loading="submitting"
        :max-width="$vuetify.breakpoint.smAndDown ? '400' : '100%'"
        style="background-color: #f2fffe;"  
    >
    <!-- head -->
    <v-app-bar
      :collapse="!collapseOnScroll"
      :collapse-on-scroll="collapseOnScroll"
      class="pa-0 primary lighten-1"
      dark
      scroll-target="#scrolling-techniques-6"
    >
      <v-app-bar-nav-icon @click="$router.push('/patientlogin')"> <v-icon color="white">mdi-arrow-left</v-icon> </v-app-bar-nav-icon>
      <v-spacer> </v-spacer>   
      <v-toolbar-title  
          text
              color="#01579B"
              dark
              dense>
              PATIENT
      </v-toolbar-title>
    </v-app-bar>

    <div>
      <v-card class="mx-auto my-4" :flat="$vuetify.breakpoint.smAndDown" :class="$vuetify.breakpoint.smAndDown ? 'transparent' : 'primary lighten-5 rounded-lg pa-4'" max-width="950" :disabled="submitting">
        <v-card-title >
          <v-icon class="mx-2"
          >mdi-account</v-icon>
          Sign Up

        </v-card-title>
    
        <!-- form-->
        <v-container fluid>
              <v-row align="center">
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="form['firstname']"
              :rules="fieldRules"
              :counter="10"
              label="Patient First name"
              prepend-icon="mdi-account-details"
            ></v-text-field>
          </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="form['lastname']"
                :rules="fieldRules"
                :counter="10"
                label="Patient Last name"
                prepend-icon="mdi-account-details"
              ></v-text-field>
            </v-col>

              <v-col
                class="d-flex"
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-model="form['email']"
                  :rules="emailRules"
                  label="E-mail"
                  prepend-icon="mdi-email"
                >
                </v-text-field>
              </v-col>

            <v-col
              class="d-flex"
              cols="12"
              sm="6"
              >
              <v-text-field
                  :type="show3 ? 'integers' : 'number'"
                  :rules="fieldRules"
                  v-model="form['phone']"
                  name="input-13-2"
                  label="Phone"
                  hint="input 11 integers"
                  value=""
                  class="input-group--focused"
                  prepend-icon="mdi-card-account-phone"
                >
              </v-text-field>
            </v-col>

         

            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="form['date']"
                :rules="fieldRules"
                type="date"
                label="Birth Day"
                placeholder="Birth Date"
                prepend-icon="mdi-cake-layered"
              ></v-text-field>
            </v-col>

                <!-- <v-col
                  class="d-flex"
                  cols="12"
                  sm="6"
                  >
                  <v-dialog
                    ref="dialog"
                    v-model="modal"
                    :return-value.sync="form['bday']"
                    persistent
                    width="290px"
                  >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form['bday']"
                      :rules="fieldRules"
                      label="Birthday"
                      prepend-icon="mdi-cake-variant"
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
                          @click="$refs.dialog.save(date)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                  </v-dialog>
                </v-col> -->
          <!-- gender -->
                <v-col
                  class="d-flex"
                  cols="12"
                  sm="6"
                >
                  <v-select
                    v-model="form['gender']"
                    :rules="fieldRules"
                    :items="items"
                    label="Gender"
                    prepend-icon="mdi-gender-male-female"
                  ></v-select>
              </v-col>
               <v-col
            cols="12"
            md="6" >

            <v-text-field
              v-model="form['height']"
              :rules="fieldRules"
              type="number"
              label="Height"
              placeholder="cm" 
              prepend-icon="mdi-human-male-height">
            </v-text-field>

          </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="form['weight']"
                :rules="fieldRules"
                type="number"
                label="Weight"
                placeholder="kg"
                prepend-icon="mdi-weight-kilogram"
              ></v-text-field>
            </v-col>
          <!-- vvv -->
          <!-- <v-col>
               <v-text-field
              v-model="form['bp']"
              :rules="fieldRules"
              
              label="bp"
              placeholder="Blood Pressure" 
              prepend-icon="mdi-water">
            </v-text-field>

          </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="form['temp']"
                :rules="fieldRules"
                type="number"
                label="temp"
                placeholder="Temperature"
                prepend-icon="mdi-thermometer-lines"
              ></v-text-field>
            </v-col> -->
            
            <v-col
              class="d-flex"
              cols="12"
              sm="6"
              >
                <v-text-field
                  name="input-13-2"
                  v-model="form['country']"
                  :rules="fieldRules"
                  label="Country"
                  value=""
                  class="input-group--focused"
                  prepend-icon="mdi-city-variant-outline"
                >
                </v-text-field>
            </v-col>

            <v-col
              class="d-flex"
              cols="12"
              sm="6"
              >
                <v-text-field
                  name="input-13-2"
                  v-model="form['city']"
                  :rules="fieldRules"
                  label="City"
                  value=""
                  class="input-group--focused"
                  prepend-icon="mdi-city-variant-outline"
                >
                </v-text-field>
            </v-col>

            <v-col
              class="d-flex"
              cols="12"
              sm="6"
              >
                <v-text-field
                  name="input-13-2"
                  v-model="form['zip']"
                  :rules="fieldRules"
                  label="Zip"
                  value=""
                  class="input-group--focused"
                  prepend-icon="mdi-city-variant-outline"
                >
                </v-text-field>
            </v-col>

            <v-col
              class="d-flex"
              cols="12"
              sm="6"
              >
                <v-text-field
                    name="input-13-2"
                    v-model="form['street_address']"
                    :rules="fieldRules"
                    label="Street Address"
                    value=""
                    class="input-group--focused"
                    prepend-icon="mdi-google-street-view"
                  >
                </v-text-field>
                
            </v-col>
            
            <v-col
              class="d-flex"
              cols="12"
              sm="6"
              >
                <v-text-field
                  :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="passwordRules"
                  v-model="form['password']"
                  :type="show3 ? 'text' : 'password'"
                  name="input-10-2"
                  label="Password"
                  hint="At least 8 characters"
                  value=""
                  class="input-group--focused"
                  @click:append="show3 = !show3"
                  prepend-icon="mdi-form-textbox-password">
                </v-text-field>
              </v-col>
              <v-col
              class="d-flex"
              cols="12"
              sm="6"
              >
                <v-text-field
                  :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show3 ? 'text' : 'password'"
                  name="input-10-2"
                  v-model="form['password_confirmation']"
                  label="Confirm Password"
                  hint="At least 8 characters"
                  value=""
                  class="input-group--focused"
                  @click:append="show3 = !show3"
                  prepend-icon="mdi-form-textbox-password">
                  </v-text-field>
              </v-col>
            </v-row>
        </v-container>
        <div class="text-center">
            <div class="col-md .offset-md">
            <v-btn
              rounded
              color="green"
              dark
              :disabled="submitting"
              @click="register"
              >
              Sign Up
            </v-btn>
            </div>

          <div class="col-md .offset-md">Already have an account?
              <a @click="$router.push('/patientlogin')">Login
              </a>
          </div>
        </div>
      </v-card>
      </div>
      <notifications group="foo" />
  </v-card>
</template>
<script>
  import moment from 'moment'
  export default {
    data () {
      return {
        show1: false,
        show2: true,
        show3: false,
        show4: false,
        modal: false,
        submitting: false,
        date: '',
        password: 'Password',
        form: {
          'firstname': '',
          'lastname': '',
          'height': '',
          'weight': '',
          'bp': '',
          'temp': '',
          'bday': '',
          'date': '',
          'gender': '',
          'email': '',
          'street_address': '',
          'city': '',
          'password': '',
          'password_confirmation': '',
          'role': 'patient',
          'zip': '',
          'country': '',
        },
        emailRules: [
          v => !!v || "E-mail is required",
          v => /.+@.+/.test(v) || "E-mail must be valid"
        ],
         fieldRules: [
          v => !!v || "this field is required",
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
        items: ['Male', 'Female', 'Custom'], collapseOnScroll: true,

      }
     
    },

    computed: {
      dateField() {
        return this.form['date']
      }
    },

    methods: {
      async register() {

        try {

          this.submitting = true

          this.form['temppass'] = this.form.password
          const res = await this.$axios.post('api/register', this.form)

          if (res.status === 201) {

            this.$notify({
              type: 'success',
              group: 'foo',
              title: 'Success!',
              text: 'Successfully Created'
            })

            const login = {
              username: this.form.email,
              password: this.form.password,
              grant_type: process.env.CLIENT_GRANT_TYPE,
              client_id: process.env.CLIENT_ID,
              client_secret: process.env.CLIENT_SECRET_KEY
            }

            const loginRes = await this.$auth.loginWith('local', { data: login })

            if (loginRes.status == 200) {
              this.$router.push('/patienthome')
            }

          }

        } catch (err) {

          this.$notify({
            type: 'error',
            group: 'foo',
            title: 'Error!',
            text: 'Please check your credentials thank you.'
          })

        } finally {

          this.submitting = false

        }
      }
    },

    watch: {
      dateField(val) {
        if(val) {
          let years = moment().diff(val, 'years')
          this.form['bday'] = years
        }
      }
    }

  }
</script>
