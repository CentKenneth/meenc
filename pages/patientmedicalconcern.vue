<template>
<v-card flat>

    <v-app-bar
      absolute
      color="#01579B"
      dark
      scroll-target="#scrolling-techniques-6"
    >
      <v-app-bar-nav-icon @click="$router.push('/patientservices')"> <v-icon color="white">mdi-arrow-left</v-icon> </v-app-bar-nav-icon>
      <v-spacer> </v-spacer>   
      <v-toolbar-title  
          text
          color="#01579B"
          dense>
            Medical Concern
      </v-toolbar-title>
    <v-spacer> </v-spacer> 
    </v-app-bar>

    <v-card-text class="mt-16 pa-6">
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

  export default {
    layout: 'patientDefault',
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
