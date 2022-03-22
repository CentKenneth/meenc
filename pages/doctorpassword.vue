<template>
  <v-card
    height="700"
    class="overflow-hidden"
    color="#1E88E5"
    dark
  >
    <v-toolbar
      flat
      color="#01579B"
    >
      <v-app-bar-nav-icon @click="$router.push('/doctoraccount')"> <v-icon color="white">mdi-arrow-left</v-icon> </v-app-bar-nav-icon>

      <v-spacer></v-spacer>
      <v-btn
        color="#01579B"
        fab
        small
        @click="isEditing = !isEditing"
      >
        <v-icon v-if="isEditing">
          mdi-close
        </v-icon>
        <v-icon v-else>
          mdi-pencil
        </v-icon>
      </v-btn>
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
    </v-toolbar>

    <v-card-text class="pa-10">

      <v-text-field
        :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="passwordRules"
        :disabled="!isEditing"
        v-model="form['oldpassword']"
        :type="show3 ? 'text' : 'password'"
        name="input-10-2"
        label="Password"
        hint="At least 8 characters"
        value=""
        class="input-group--focused"
        @click:append="show3 = !show3">
      </v-text-field>

      <v-text-field
        :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="passwordRules2"
        :disabled="!isEditing"
        v-model="form['password']"
        :type="show2 ? 'text' : 'password'"
        name="input-10-2"
        label="New Password"
        hint="At least 8 characters"
        value=""
        class="input-group--focused"
        @click:append="show2 = !show2">
      </v-text-field>

      <v-text-field
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="passwordRules3"
        :disabled="!isEditing"
        v-model="form['confirmpassword']"
        :type="show1 ? 'text' : 'password'"
        name="input-10-2"
        label="Confirm Password"
        hint="At least 8 characters"
        value=""
        class="input-group--focused"
        @click:append="show1 = !show1">
      </v-text-field>

    </v-card-text>
    <v-card-actions class="pa-10">
      <v-spacer></v-spacer>
      <v-btn
        :disabled="!isEditing"
        color="success"
        @click="save"
      >
        Save
      </v-btn>
    </v-card-actions>
    <v-snackbar
      v-model="hasSaved"
      :timeout="2000"
      absolute
      bottom
      left
    >
      Your profile has been updated
    </v-snackbar>
  </v-card>
 
</template>
<script>

  import shared from '~/pages/_doctorshared'

  export default {
    layout: 'doctorDefault',

    mixins: [shared],

    middleware({ store, redirect }) {
      // If the user is not authenticated
      if (!store.state.auth.loggedIn) {
        return redirect('/doctorlogin')
      }
    },
    data () {
      return {
        form: {
          oldpassword: '',
          password: '',
          confirmpassword: ''
        },
        show3: false,
        show2: false,
        show1: false,
        hasSaved: false,
        isEditing: null,
        model: null,
        passwordRules: [
            v => !!v || "Old Password is required",
            v => {
                const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#.,)(_\$%\^&\*])(?=.{8,})/;
                return (
                    pattern.test(v) ||
                    "Min. 8 characters with at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"
                );
            }
        ],
        passwordRules2: [
            v => !!v || "New Password is required",
            v => {
                const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#.,)(_\$%\^&\*])(?=.{8,})/;
                return (
                    pattern.test(v) ||
                    "Min. 8 characters with at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"
                );
            }
        ],
        passwordRules3: [
            v => !!v || "Confirm Password is required",
            v => {
                const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#.,)(_\$%\^&\*])(?=.{8,})/;
                return (
                    pattern.test(v) ||
                    "Min. 8 characters with at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"
                );
            }
        ],
        tempass: [
          v => !!v || "Confirm Password is required",
          v => {
              const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#.,)(_\$%\^&\*])(?=.{8,})/;
              return (
                  pattern.test(v) ||
                  "Min. 8 characters with at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"
              );
          }
        ],
        states: [
          { name: 'Male', abbr: 'M', id: 1 },
          { name: 'Female', abbr: 'F', id: 2 },
        ],
      }
    },

    computed: {
      confirmpassword() {
        return this.form.confirmpassword
      },
      newpassword() {
        return this.form.password
      }
    },

    watch: {
      confirmpassword(val) {
        if(val != this.newpassword) {
          this.passwordRules3.push('Password did not match')
        } else {
          this.passwordRules3 = this.tempass
        }
      }
    },

    methods: {
      async save () {
        this.isEditing = true
        if(this.newpassword == this.confirmpassword) {

          let res = await this.$axios.post(`api/authorized/change-password`, this.form)

          if(res.status === 200) {

            this.hasSaved = true
            this.$auth.logout().then(() => {this.$router.push('/patientlogin')})
            
          } else if(res.status === 405) {
            console.log('error')
          }

        }
        this.isEditing = false
      },
    },
  }
</script>
