<template>
  <v-card flat min-height="100%">
    <v-app-bar
      class="pa-0 primary lighten-1"
      dark
    >
      <v-app-bar-nav-icon href="/patientmedicalconcern"> <v-icon color="white">mdi-arrow-left</v-icon> </v-app-bar-nav-icon>
      <v-spacer> </v-spacer>   
      <v-toolbar-title  
          text
              dense>
              Medical Concern
      </v-toolbar-title>
    <v-spacer> </v-spacer> 
    </v-app-bar>

    <v-card flat class="mt-4 mb-16" >
      <v-card-title>
        <v-list-item-avatar>
          <v-img :src="doctor.profile ? doctor.profile : 'https://cdn.vuetifyjs.com/images/lists/1.jpg'"> </v-img>
        </v-list-item-avatar>
        Dr. {{doctor.doctor_name ? doctor.doctor_name : doctor.name}}
      </v-card-title>

      <div v-for="item in recent" :key="item.id">
        <div class="d-flex" :class="item.whosend == 'Doctor' ? 'justify-start': 'justify-end'">
          <v-card @click="viewImage(item)" width="50%" flat class="pa-2 ma-3 primary rounded-lg white--text" :class="item.whosend == 'Doctor' ? 'lighten-1': ''">
            <v-card-actions>
              <div v-if="item.image_url">
                <img :src="item.image_url" width="100px">
              </div>
              <div v-else>
                {{item.messages}}
              </div>
              <v-spacer></v-spacer>
              <div class="d-flex flex-column">
                <div class="d-flex mb-2">
                  <v-spacer></v-spacer>
                  <v-icon v-if="item.whosend == 'Patient'" class="justify-rigth" @click.stop="deleteMessage(item)">mdi-delete</v-icon>
                </div>
              </div>
            </v-card-actions>
            <v-card-actions class="pa-0 ma-0">
              <v-spacer></v-spacer>
               <div class="caption">
                  <div>
                    {{convertDate(item.created_at)}}
                  </div>
                  <div>
                    {{convertTime(item.created_at)}}
                  </div>
                </div>
            </v-card-actions>
          </v-card>
        </div>
      </div>

    </v-card>

    <v-app-bar
    absolute
    bottom
    >
      <v-icon size="34" @click="dialog = true">mdi-camera</v-icon>
      <v-text-field
        v-model="message"
        append-icon="mdi-send"
        bottom
        clear-icon="mdi-close-circle"
        clearable
        class="mt-2 px-2"
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

    <v-dialog v-model="dialog2" width="700">
      <v-card :disabled="submitting2" flat class="pa-4">
        <v-card-title>
          Are you sure you want to delete this message?
        </v-card-title>

        <v-card-actions>
          <v-btn
            @click="dialog2 = false"
          >
            Close
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="red"
            dark
            :disabled="submitting2"
            @click="confirmDelete"
          >
            Delete
          </v-btn>
        </v-card-actions>
        
      </v-card>
    </v-dialog>

  </v-card>
</template>
<script>
  import { mapState } from 'vuex'
  import moment from 'moment'

  export default {
    layout: 'patientDefault',
    data() {
      return {
        image: null,
        dialog: false,
        dialog2: false,
        message: null,
        submitting: false,
        submitting2: false,
        recent: [],
        deleteItem: null
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
    async mounted(){
      if(!this.doctor) this.$router.push('/patientmedicalconcern')
      await this.initialize()
      this.$nextTick(function () {
          window.setInterval(() => {
              this.initialize()
          },10000)
      })
    },
    methods: {
      convertDate(date) {
        return moment(date).format('MMM DD, YYYY')
      },
      convertTime(date) {
        return moment(date).format('hh:mm A')
      },
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
      deleteMessage(item) {
        this.deleteItem = item
        this.dialog2 = true
      },
      async confirmDelete() {
        this.submitting2 = true
        if(this.deleteItem) {
          let res = await this.$axios.post(`api/authorized/chat-delete/${this.deleteItem.id}`)
          if(res.status === 200) {
            await this.initialize()
            this.submitting2 = false
          }
        }
        this.dialog2 = false
      },
      viewImage(data) {
        if(data.image_url) {
          window.open(data.image_url)
        }
      }
    }
  }
  
  
</script>
