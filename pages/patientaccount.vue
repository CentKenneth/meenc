<template>
  <v-container
    class="spacing-playground pa-0"
    fluid
  >
 <v-card >
    <v-app-bar color="#01579B">
      <v-app-bar-nav-icon @click="$router.push('/patienthome')"> <v-icon color="white">mdi-arrow-left</v-icon> </v-app-bar-nav-icon>
    </v-app-bar>
    <v-list color="#0277BD" height="720" >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>
        <v-list-item-title v-if="user" style="color:white">{{user.name}}</v-list-item-title>
      </v-list-item>
        <v-list-item @click="$router.push('/patienteditprofile')">
            <v-list-item-icon >
              <v-icon color="white">mdi-id-card</v-icon>
            </v-list-item-icon>
            <v-list-item-title style="color:white">Edit Profile</v-list-item-title>
        </v-list-item>

        <v-list-item @click="$router.push('/patientpassword')">
          <v-list-item-icon>
            <v-icon color="white">mdi-lock</v-icon>
          </v-list-item-icon>
          <v-list-item-title style="color:white"> Change Password</v-list-item-title>
        </v-list-item>

        <v-list-item link @click="logout">
          <v-list-item-icon>
            <v-icon color="white">mdi-power</v-icon>
          </v-list-item-icon>
          <v-list-item-title style="color:white"> Logout </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>
<script>
  import { mapState } from 'vuex'
  export default {
    middleware({ store, redirect }) {
      // If the user is not authenticated
      if (!store.state.auth.loggedIn) {
        return redirect('/patientlogin')
      }
    },
    data: () => ({
      drawer: false,
      group: null,
    }),
    computed: {
      ...mapState('auth', [
        'user'
      ]),
    },
    methods: {
      logout(){
        this.$auth.logout().then(() => {this.$router.push('/patientlogin')})
      }
    }
  }
</script>