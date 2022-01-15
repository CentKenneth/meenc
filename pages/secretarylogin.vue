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
  <v-app-bar-nav-icon href="/"> <v-icon color="white">mdi-arrow-left</v-icon> </v-app-bar-nav-icon>
    <v-spacer></v-spacer>
        <v-toolbar-title  
          text
              color="#01579B"
              dark
              dense>
              SECRETARY
      </v-toolbar-title>
    </v-app-bar>
    <!-- head -->

    <v-img
      :height="$vuetify.breakpoint.smAndDown ? '250' : '750'"
      src="https://th.bing.com/th/id/OIP.zmT8WMtoF7CcUrhQ5JRCUQHaE8?pid=ImgDet&rs=1"
    ></v-img>

    <v-card flat color="#BBDEFB" class="pa-6">

    <v-card-title class="d-flex justify-center">
      <v-icon>mdi-hospital</v-icon>
      Login
    </v-card-title>

    <v-card-text :style="$vuetify.breakpoint.smAndDown ? 'width:100%;' : 'width:35%;'" class="mx-auto">
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

    <v-card-actions class="d-flex flex-column my-0 py-0">

        <v-btn
          rounded
          large
          color="primary"
          dark
          @click="validate"
        >
        Login
        </v-btn>

        <br>
    </v-card-actions>

    </v-card>
  <notifications group="foo" />
  </v-card>

</template>
<script>
  export default {
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
              grant_type: process.env.CLIENT_GRANT_TYPE,
              client_id: process.env.CLIENT_ID,
              client_secret: process.env.CLIENT_SECRET_KEY
            }

            const res = await this.$auth.loginWith('local', { data: login })

            if (res.status == 200) {
              this.$router.push('/secretaryhome')
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
            text: err.message
          })

        } finally {

          this.loading = true
          
        }

      }
    }
  }
</script>