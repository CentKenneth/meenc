<template>
  <div>
    <v-app-bar
      absolute
      color="#01579B"
      dark
      scroll-target="#scrolling-techniques-6"
    >
      <v-app-bar-nav-icon @click="$router.push('/patientmedicalconcern')"> <v-icon color="white">mdi-arrow-left</v-icon> </v-app-bar-nav-icon>
      <v-spacer> </v-spacer>   
      <v-toolbar-title  
          text
              color="#01579B"
              dark
              dense>
              Medical Concern
      </v-toolbar-title>
    <v-spacer> </v-spacer> 
    </v-app-bar>
    <v-card flat class="mt-16">
      <v-card-title>
        <v-list-item-avatar>
          <v-img src="https://cdn.vuetifyjs.com/images/lists/1.jpg"> </v-img>
        </v-list-item-avatar>
        Dr. {{doctor.doctor_name}}
      </v-card-title>

      <div v-for="item in recent" :key="item.id">
        <div class="d-flex" :class="item.whosend == 'Doctor' ? 'justify-start': 'justify-end'">
          <v-card @click="viewImage(item)" width="50%" flat class="pa-2 ma-3 primary rounded-lg white--text" :class="item.whosend == 'Doctor' ? 'lighten-1': ''">
            {{item.messages}}
          </v-card>
        </div>
      </div>

    </v-card>
    <v-app-bar
      absolute
      bottom
    >
      <v-icon size="34" class="mt-n4" @click="dialog = true">mdi-camera</v-icon>
      <v-text-field
        v-model="message"
        append-icon="mdi-send"
        filled
        bottom
        clear-icon="mdi-close-circle"
        clearable
        label="Message"
        @click:append="send"
        type="text"
      ></v-text-field>
    </v-app-bar>

    <v-dialog v-model="dialog" width="700">
      <v-card :disabled="submitting" flat class="pa-4">
        <v-card-title>
          Upload Image
        </v-card-title>

        <v-card-text>
          <v-form>

          </v-form>
          <v-file-input
            v-model="image"
            class="file-input-small-chips required"
            label="Image"
            dense
            outlined
            chips
            :rules="[
              v => !!v || 'Image is required.',
              v => !v || v.size < 3000000 || 'Image size should be less than 3 MB.',
            ]"
            accept="image/png, image/jpeg, image/bmp"
            prepend-icon="mdi-camera"
          ></v-file-input>
        </v-card-text>

        <v-card-actions>
          <v-btn
            dark
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="green"
            dark
            :disabled="submitting"
            @click="submit"
          >
            Send
          </v-btn>
        </v-card-actions>
        
      </v-card>
    </v-dialog>

  </div>
</template>
<script>
  import { mapState } from 'vuex'
  export default {
    data() {
      return {
        image: null,
        dialog: true,
        message: null,
        submitting: false,
        recent: []
      }
    },
    computed: {
      ...mapState('chat', [
        'doctor'
      ]),
      ...mapState('auth', [
        'user'
      ]),
    },
    mounted(){
      if(!this.doctor) this.$router.push('/patientmedicalconcern')
      this.initialize()
    },
    methods: {
      async initialize(){

        let form = {
          patient_id: this.user.id,
          doctor_id: this.doctor.doctor_id,
        }

        let res = await this.$axios.post(`api/authorized/get-patient-chats-by-doctor`, form)

        if(res.status === 200) {
          this.recent = res.data.data
        }
      },
      async send(){

        if(this.message) {

          let form = {
            patient_id: this.user.id,
            doctor_id: this.doctor.doctor_id,
            messages: this.message,
            whosend: 'Patient',
          }

          let res = await this.$axios.post(`api/authorized/patient-chats`, form)

          if(res.status === 201) {
            this.message = null
            await this.initialize()
          }

        }

      },
      async submit() {
        this.submitting = true

        if(this.image) {

          const payload = new FormData()

          payload.append('image', this.image)
          payload.append('patient_id', this.user.id)
          payload.append('doctor_id', this.doctor.doctor_id)
          payload.append('messages', this.image.name)
          payload.append('whosend', 'Patient')

          let res = await this.$axios.post(`api/authorized/patient-chats-with-upload`, payload)

          if(res.status === 201) {
            this.image = null
            this.dialog = false
            await this.initialize()
          }

        }

        this.submitting = false
        
      },
      viewImage(data) {
        if(data.image_url) {
          window.open(data.image_url)
        }
      }
    }
  }
  
  
</script>
