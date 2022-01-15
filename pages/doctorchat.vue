<template>
  <div>
    <v-app-bar
      absolute
      color="#01579B"
      dark
      scroll-target="#scrolling-techniques-6"
    >
      <v-app-bar-nav-icon @click="$router.push('/doctormedicalconcern')"> <v-icon color="white">mdi-arrow-left</v-icon> </v-app-bar-nav-icon>
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
          {{patient.patient_name}}
      </v-card-title>

      <div v-for="item in recent" :key="item.id">
        <div class="d-flex" :class="item.whosend == 'Patient' ? 'justify-start': 'justify-end'">
          <v-card @click="viewImage(item)" width="50%" flat class="pa-2 ma-3 primary rounded-lg white--text" :class="item.whosend == 'Patient' ? 'lighten-1': ''">
            {{item.messages}}
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

  </div>
</template>
<script>
  import { mapState } from 'vuex'
  export default {
    data() {
      return {
        message: null,
        recent: []
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
    mounted(){
      if(!this.patient) this.$router.push('/doctormedicalconcern')
      this.initialize()
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
      viewImage(data) {
        if(data.image_url) {
          window.open(data.image_url)
        }
      }
    }
  }
  
  
</script>
