<template>
  <v-card flat>
    <v-app-bar
      absolute
      color="#01579B"
      dark
      scroll-target="#scrolling-techniques-6"
    >
      <v-app-bar-nav-icon href="/doctormedicalconcern"> <v-icon color="white">mdi-arrow-left</v-icon> </v-app-bar-nav-icon>
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
    <v-card flat class="mt-16 mb-16">
      <v-card-title>
        <v-list-item-avatar>
          <v-img :src="patient.profile ? patient.profile : 'https://cdn.vuetifyjs.com/images/lists/1.jpg'"> </v-img>
        </v-list-item-avatar>
          {{patient.patient_name}}
      </v-card-title>

      <div v-for="item in recent" :key="item.id">
        <div class="d-flex" :class="item.whosend == 'Patient' ? 'justify-start': 'justify-end'">
          <v-card @click="viewImage(item)" width="50%" flat class="pa-2 ma-3 primary rounded-lg white--text" :class="item.whosend == 'Patient' ? 'lighten-1': ''">
            <v-card-actions>
              <div v-if="item.image_url">
                <img :src="item.image_url" width="100px">
              </div>
              <div v-else>
                {{item.messages}}
              </div>
              <v-spacer></v-spacer>
              <v-icon v-if="item.whosend == 'Doctor'" @click.stop="deleteMessage(item)">mdi-delete</v-icon>
            </v-card-actions>
          </v-card>
        </div>
      </div>

    </v-card>
    <v-app-bar
      absolute
      bottom
    >
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
  export default {
    layout: 'doctorDefault',

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
        'patient'
      ]),
      ...mapState('auth', [
        'user'
      ]),
    },
    async mounted(){
      if(!this.patient) this.$router.push('/doctormedicalconcern')
      await this.initialize()
      this.$nextTick(function () {
          window.setInterval(() => {
              this.initialize()
          },10000)
      })
    },
    methods: {
      async initialize(){

        let form = {
          patient_id: this.patient.patient_id,
          doctor_id: this.user.id,
        }

        let res = await this.$axios.post(`api/authorized/get-doctor-chats-by-patient`, form)

        if(res.status === 200) {
          this.recent = res.data.data
        }
      },
      async send(){

        if(this.message) {

          let form = {
            patient_id: this.patient.patient_id,
            doctor_id: this.user.id,
            messages: this.message,
            whosend: 'Doctor',
          }

          let res = await this.$axios.post(`api/authorized/patient-chats`, form)

          if(res.status === 201) {
            this.message = null
            await this.initialize()
          }

        }

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
