<template>
<v-card flat>

    <v-app-bar
      class="pa-0 primary lighten-1"
      dark
    >
      <v-app-bar-nav-icon @click="$router.push('/patientservices')"> <v-icon color="white">mdi-arrow-left</v-icon> </v-app-bar-nav-icon>
      <v-spacer> </v-spacer>   
      <v-toolbar-title  
          text
          dense>
            Medical Concern
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

    <v-card-text class="mt-4 pa-6">
      <v-list subheader  height="570">
        <v-subheader>Doctors</v-subheader>
        <v-list-item
          v-for="chat in recent"
          :key="chat.doctor_name"
        >

          <v-list-item-content>
            <v-list-item-title v-text="chat.doctor_name"></v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
          <v-app-bar-nav-icon @click="showMesssages(chat)"> <v-icon color="deep-purple accent-4">
              mdi-message-outline
            </v-icon>
              </v-app-bar-nav-icon>
          </v-list-item-icon>

        </v-list-item>
      </v-list>
    </v-card-text>

  </v-card>
  
</template>
<script>
  import { mapState, mapMutations } from 'vuex'
  import shared from '~/pages/_patientshared'
  import head from '~/pages/_headServices'

  export default {
    layout: 'patientDefault',
    mixins: [shared, head],

    middleware({ store, redirect }) {
      // If the user is not authenticated
      if (!store.state.auth.loggedIn) {
        return redirect('/patientlogin')
      }
    },
    data: () => ({
      recent: [],
      interval: null,
      previous: [{
        title: 'Travis Howard',
        avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
      }],
    }),
    computed: {
      ...mapState('auth', [
        'user'
      ]),
    },
    mounted(){
      // this.$nextTick(() => {
      //     window.setInterval(() => {
      //         console.log('yes')
      //     },1000);
      // })

      this.initialize()
    },
    methods: {
      ...mapMutations('chat', [
          'setDoctor'
      ]),
      async initialize(){

        let form = {
          patient_id: this.user.id,
          doctor_id: 'test',
        }

        let res = await this.$axios.post(`api/authorized/get-patient-chats`, form)

        if(res.status === 200) {
          this.recent = res.data.data
        }

      },
      showMesssages(data){
        this.setDoctor(data)
        this.$router.push('/patientchat')

      }
    }
  }
</script>
