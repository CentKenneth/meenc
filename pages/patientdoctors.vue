<template>

<v-card flat class="pa-4">
    <v-app-bar
      
      absolute
      color="#01579B"
      dark
      scroll-target="#scrolling-techniques-6"
    >
      <v-app-bar-nav-icon @click="$router.push('/patienthome')"> <v-icon color="white">mdi-arrow-left</v-icon> </v-app-bar-nav-icon>
      <v-spacer> </v-spacer>   
        <v-toolbar-title  
            text
                color="#01579B"
                dark
                dense>
                List of Doctors
        </v-toolbar-title>
      <v-spacer> </v-spacer> 
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
                    @click="$router.push('/patientmedicalconcern')">
                    View all
                  </v-btn>
                </div>
            </v-card-text>
          </v-card>
        </v-menu>
      </div>
  </v-app-bar>

  <div class="d-flex mt-16">
      <v-spacer v-if="$vuetify.breakpoint.mdAndUp"></v-spacer>
      <div :style="$vuetify.breakpoint.mdAndUp ? 'width: 250px;' : 'width: 100%;'">
        <v-text-field
          @input="searchDoctor"
          placeholder="Search"
          outlined>

        </v-text-field>
      </div>
    </div>
  
  <v-data-table
    :headers="headers"
    :items="doctors"
    class="elevation-1 pa-4"
  >
    <template v-slot:item.actions="{ item }">
     
      <v-icon
        @click="showDialog(item)"
        color="blue"
      >
        mdi-eye
      </v-icon>

    </template>
  </v-data-table>

  <v-dialog
    v-model="dialog"
    :scrollable="true"
    persistent
    width="800"
  >
    <v-card flat>
      <v-card-title class="d-flex justify-center">
        <img
            class="d-flex justify-center"
            height="50"  
            max-width="50"
            src="~assets/doctor/R.png"
        ><img>
        <div class="px-2">
          Dr. {{profile.name}} 
        </div>
      </v-card-title >
      <v-card-text class="pa-6">
        <div class="py-2 body-1">
          Specialization: {{profile.degreefield}}
        </div>
        <div class="py-2 body-1">
          Degree Level: {{profile.degreelevel}}
        </div>
        <div class="py-2 body-1">
          Clinic Name: {{profile.clinicname}}
        </div>
      </v-card-text>
      <v-card-actions class="pa-6">
        <v-spacer></v-spacer>
        <v-btn outlined class="primary--text" @click="dialog = false">Close</v-btn>
        <v-btn outlined class="primary--text" @click="sendMessage">Message</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</v-card>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
  import shared from '~/pages/_patientshared'
  import head from '~/pages/_headServices'

  export default {
    layout: 'patientDefault',
    mixins: [shared, head],
    data: () => ({
      dialog: false,
      search: null,
      dialogDelete: false,
      profile: {},
      headers: [
        {
          text: 'Doctor Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Email', value: 'email' },
        { text: 'Specialization', value: 'degreefield' },
        { text: 'Degree Level', value: 'degreelevel' },
        { text: 'Clinic Name', value: 'clinicname' },
        { text: 'Actions', value: 'actions' },
      ],
      doctors: [],
      tempDoctors: []
    }),

    computed: {
      ...mapState('auth', [
        'user'
      ]),
    },

    watch: {
    },

    mounted () {
      this.initialize()
    },

    methods: {
      ...mapMutations('chat', [
          'setDoctor'
      ]),
      async initialize () {
        try {

          // api request
          const doctor = await this.$axios.get(`api/authorized/doctor-email`)

          // filter doctor email
          if (doctor?.data) {
            doctor.data.forEach((el) => {
              // push data to array
              this.doctors.push({
                  "doctor_id": el.id,
                  "name": el.name,
                  "email": el.email,
                  "degreefield": el.degreefield,
                  "degreelevel": el.degreelevel,
                  "clinicname": el.clinicname,
              })
            })
          }

          this.tempDoctors = this.doctors

        } catch (err) {

        }
      },

      searchDoctor(data) {
        let docs = this.tempDoctors.filter(doc => doc.name.includes(data) || doc.email.includes(data))
        if(docs.length > 0) {
          this.doctors = docs
        }
      },

      sendMessage() {
        this.setDoctor(this.profile)
        this.$router.push('/patientchat')
      },

      showDialog (item) {
        this.dialog = true
        this.profile = item
      }
    },
  }
</script>
