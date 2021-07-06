<template>
    <v-card
        :loading="loading"
        :max-width="$vuetify.breakpoint.smAndDown ? '400' : '100%'"
        class="my-1"    
    >
<!-- head -->
     <v-app-bar
      :collapse="!collapseOnScroll"
      :collapse-on-scroll="collapseOnScroll"
      absolute
      color="#01579B"
      dark
      scroll-target="#scrolling-techniques-6"
    >
    <v-btn icon>
           <v-app-bar-nav-icon href="/doctorlogin"> <v-icon color="white">mdi-arrow-left</v-icon> </v-app-bar-nav-icon>
          </v-btn>
      <v-spacer> </v-spacer>   
      <v-toolbar-title  
          text
              color="#01579B"
              dark
              dense>
             DOCTOR
      </v-toolbar-title>
    </v-app-bar>
    <!-- head -->

    <v-img
      :height="$vuetify.breakpoint.smAndDown ? '250' : '750'"
      src="https://media.istockphoto.com/photos/hospital-blurry-background-picture-id939102942?k=6&m=939102942&s=170667a&w=0&h=Df0vc28Ikv_Fk3pAiuiTMwEwLvdnFekfXmoGop2VN7s="
    ></v-img>

  

    <div>
        <v-card color="#BBDEFB" class="rounded-xl pa-6" :disabled="submitting">
          <v-card-title >Create Doctor's Account
            <v-icon
            >mdi-doctor</v-icon>
          </v-card-title>
          <v-row>
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="form['firstname']"
                :counter="10"
                label="First name"
              ></v-text-field>
            </v-col>

              <v-col
                cols="12"
                md="6"
              >
                <v-text-field
                  v-model="form['lastname']"
                  :counter="10"
                  label="Last name"
                ></v-text-field>
              </v-col>
          </v-row>



          <!-- ccc -->
          <v-container fluid>
                <v-row align="center">
                  <v-col
                  class="d-flex"
                  cols="12"
                  sm="6"
                  >
                  <v-select
                    v-model="form['degreelevel']"
                    :items="dlevels"
                    label="Degree Level"
                  ></v-select>
                </v-col>

                <v-col
                  class="d-flex"
                  cols="12"
                  sm="6"
                  >
                  <v-select
                    v-model="form['degreefield']"
                    :items="dfields"
                    label="Degree Field"
                  ></v-select>
                </v-col>
                  <v-col
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
                        v-model="date"
                        label="Birthday"
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
                        @click="$refs.dialog.save(date)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-dialog>
                </v-col>
            <!-- gender -->
            
                <v-col
                  class="d-flex"
                  cols="12"
                  sm="6"
                  >
                  <v-select
                    v-model="form['gender']"
                    :items="genders"
                    label="Gender"
                  ></v-select>
                </v-col>
              
          
            <!-- vvv -->
              <v-col
                class="d-flex"
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-model="form['clinicname']"
                  label="Medical Clinic Name">
                </v-text-field>
              </v-col>
              <v-col
                class="d-flex"
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-model="form['email']"
                  :rules="emailRules"
                  label="E-mail">
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
                    @click:append="show3 = !show3">
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
                    v-model="form['password_confirmation']"
                    name="input-10-2"
                    label="Confirm Password"
                    hint="At least 8 characters"
                    value=""
                    class="input-group--focused"
                    @click:append="show3 = !show3">
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
                Register
                </v-btn>
                </div>
                <div class="col-md .offset-md">Already have an account?
                <a href="/Doctorlogin">Login
                </a>
                </div>
            </div>
      </v-card>
    </div>
     <notifications group="foo" />
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
        submitting: false,
        date: '',
        password: 'Password',
        form: {
          'firstname': '',
          'lastname': '',
          'degreelevel': '',
          'degreefield': '',
          'bday': '',
          'gender': '',
          'clinicname': '',
          'email': '',
          'password': '',
          'password_confirmation': '',
          'role': 'doctor',
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
        dlevels: ['Doctorate', 'Professional', 'Master'+'s'], collapseOnScroll: true,
        dfields: ['Anesthesiologists', 'Dermatologists', 'Internists', 'Obstetricians and gynecologists','Ophthalmologists'
        , 'Pediatricians','Physicians', 'Psychiatrists', 'Surgeons'], collapseOnScroll: true,
        genders: ['Male', 'Female', 'Custom'], collapseOnScroll: true,


      }
     
    },

    methods: {
      async register() {

        try {

          this.submitting = true

          const res = await this.$axios.post('api/register', this.form)

          if (res.status === 201) {

            this.$notify({
              type: 'success',
              group: 'foo',
              title: 'Success!',
              text: 'Successfully Created'
            })

            this.form = {}

            this.$router.push('/doctorlogin')

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