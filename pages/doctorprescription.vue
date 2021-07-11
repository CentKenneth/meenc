<template>
<v-card  
   >

    <v-app-bar
      
      absolute
      color="#01579B"
      dark
      scroll-target="#scrolling-techniques-6"
    >
      <v-app-bar-nav-icon href="/doctorservices"> <v-icon color="white">mdi-arrow-left</v-icon> </v-app-bar-nav-icon>
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
    <v-img
      :height="$vuetify.breakpoint.smAndDown ? '360' : '350'"
      src="https://media.istockphoto.com/photos/hospital-blurry-background-picture-id939102942?k=6&m=939102942&s=170667a&w=0&h=Df0vc28Ikv_Fk3pAiuiTMwEwLvdnFekfXmoGop2VN7s="
    ></v-img>

 
 <v-card flat color="#BBDEFB" class="pa-1">
  <v-row justify="center">
    <v-col
    :max-width="$vuetify.breakpoint.smAndDown ? '100%' : '100%'"
    >
      <v-card ref="form">
        <v-card-text>

          <v-select
            label="Send To"
            :items="doctor"
            item-value="email"
            item-text="name"
            v-model="form['sendto']"
          >
          </v-select>

          <v-text-field
            v-model="form['name']"
            prepend-icon="mdi-email"
            label="Name"
          ></v-text-field>

          <v-text-field
            v-model="form['email']"
            prepend-icon="mdi-email"
            label="E-mail"
          ></v-text-field>

        

        <v-textarea
          ref="message"
          prepend-icon="mdi-message"
          v-model="form['message']"
          label="Message:"
          placeholder="Short Message"
          counter="10"
        ></v-textarea>

        <v-file-input
         ref="prescription"
          accept="image/*"
          v-model="form['prescription']"
          label="Prescription"
        ></v-file-input>

        <v-text-field
          v-model="form['price']"
          label="Price"
          placeholder="Price"
          prepend-icon="mdi-cash"
        ></v-text-field>

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
        form: {},
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
        const doctor = await this.$axios.get('api/authorized/patient-email')

        // filter doctor email
        if (doctor?.data) {
          doctor.data.map((el) => {
            // push data to array
            this.doctor.push({'id': el.id, 'email': el.email, name:  el.lastname +' ' + el.firstname})
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

            // api request
            const data = await this.$axios.post('api/authorized/prescription-transaction', this.form)

            // if status = 201 means created
            if (data.status == 201) {

              this.$notify({
                type: 'success',
                group: 'foo',
                title: 'Success!',
                text: 'Successfully Scheduled'
              })

              this.form = {}

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
