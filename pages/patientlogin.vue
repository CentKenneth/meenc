<template>
  <v-card
    flat
    :loading="loading"
    :max-width="$vuetify.breakpoint.smAndDown ? '400' : '100%'"
    style="background-color: #f2fffe;"
  >
    <v-app-bar
      :collapse="!collapseOnScroll"
      :collapse-on-scroll="collapseOnScroll"
      class="pa-0 primary lighten-1"
      dark
      scroll-target="#scrolling-techniques-6"
    >
      <v-app-bar-nav-icon @click="$router.push('/')"> <v-icon color="white">mdi-arrow-left</v-icon> </v-app-bar-nav-icon>

      <v-spacer> </v-spacer>  

      <v-toolbar-title  
          text
          color="#01579B"
          dark
          dense>
          PATIENT
      </v-toolbar-title>
      
    </v-app-bar>

  <v-container
      class="pt-10"
      fluid
    >
      <v-row
        align="center"
        justify="center"
      >
        <v-col
          cols="12"
          sm="8"
          md="4"
          lg="3"
        >
          <v-card class="mt-4" :flat="$vuetify.breakpoint.smAndDown" :class="$vuetify.breakpoint.smAndDown ? 'transparent' : 'primary lighten-5 rounded-lg pa-4'">

            <v-card-title class="d-flex justify-center">
              <v-icon>mdi-account</v-icon>
              Login
            </v-card-title>

            <v-card-text class="mx-auto">
              <v-form
                ref="form"
                v-model="valid"
                lazy-validation
              >

                <v-text-field
                  outlined
                  v-model="form.email"
                  :rules="emailRules"
                  label="E-mail"
                  append-icon="mdi-email"
                ></v-text-field>

                <v-text-field
                  outlined
                  v-model="form.password"
                  label="Password"
                  @click:append="show3 = !show3"
                  :rules="passwordRules"
                  :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show3 ? 'text' : 'password'"
                ></v-text-field>

              </v-form>

            </v-card-text>

            <v-card-actions class="d-flex flex-column my-0 py-0 pb-5">

        <v-btn
          rounded
          large
          class="mb-5"
          color="primary"
          dark
          @click="validate"
        >
        Login
        </v-btn>

        <div> 
            <v-btn 
              rounded
              elevation="2"
              color="green"
              dark
              @click="$router.push('/patientregister')"
            > 
              Create New Account
            </v-btn>
        </div>

            </v-card-actions>

          </v-card>
        </v-col>
      </v-row>
  </v-container>

  

  <notifications group="foo" />

  </v-card>

</template>
<script>
  import head from '~/pages/_headServices'

  export default {
    middleware({ store, redirect }) {
      // If the user is not authenticated
      if (store.state.auth.loggedIn) {
        return redirect('/patienthome')
      }
    },
    mixins: [
      head
    ],
    data () {
      return {
        valid: true,
        form: {},
        show1: false,
        show2: true,
        show3: false,
        show4: false,
        loading: false,
        password: 'Password',
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
        collapseOnScroll: true,
      }
    },

    methods: {
      async validate () {
        try {

          const valid = this.$refs.form.validate()
          this.loading = true

          if (valid) {

            const login = {
              username: this.form.email,
              password: this.form.password,
              grant_type: this.$config.CLIENT_GRANT_TYPE,
              client_id: this.$config.CLIENT_ID,
              client_secret: this.$config.CLIENT_SECRET_KEY
            }

            const res = await this.$auth.loginWith('local', { data: login })

            if (res.status == 200) {
              this.$router.push('/patienthome')
              this.$notify({
                type: 'success',
                group: 'foo',
                title: 'Success!',
                text: 'Successfully login!'
              })
            }

          }

        } catch (err) {

          // message if error
          this.$notify({
            type: 'error',
            group: 'foo',
            title: 'Error!',
            text: 'Please check your credentials thank you.'
          })

        } finally {

          this.loading = true
          
        }

      }
    }
  }
</script>