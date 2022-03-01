<template>
  <v-container
    class="spacing-playground pa-0"
    fluid
  >
    <v-card >
    <v-app-bar color="#01579B">
      <v-app-bar-nav-icon @click="$router.push('/doctorhome')"> <v-icon color="white">mdi-arrow-left</v-icon> </v-app-bar-nav-icon>
    </v-app-bar>
    <v-list color="#0277BD" height="720" >
      <!-- <v-list-item @click="dialog = true" class="px-2">
        <v-list-item-avatar>
          <v-img :src="user.profile ? user.profile : 'https://randomuser.me/api/portraits/men/85.jpg'"></v-img>
        </v-list-item-avatar>
        <v-list-item-title v-if="user" style="color:white">{{user.name}}</v-list-item-title>
      </v-list-item> -->
        <v-list-item @click="$router.push('/doctoreditprofile')">
            <v-list-item-icon >
              <v-icon color="white">mdi-id-card</v-icon>
            </v-list-item-icon>
            <v-list-item-title style="color:white">Edit Profile</v-list-item-title>
        </v-list-item>

        <v-list-item @click="$router.push('/doctorpassword')">
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

    <v-dialog
      v-model="dialog"
      persistent
    >

      <v-card flat :disabled="disabled">

        <v-card-title>
          <v-spacer></v-spacer>
          <v-icon @click="dialog = false">mdi-close</v-icon>
        </v-card-title>

        <v-card-text>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-file-input
              v-model="form.signature"
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
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-btn color="gray" @click="dialog = false">Close</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="save">Save</v-btn>
        </v-card-actions>

      </v-card>
      
    </v-dialog>
  </v-container>
</template>
<script>
  import { mapState } from 'vuex'
  export default {
    layout: 'doctorDefault',

    middleware({ store, redirect }) {
      // If the user is not authenticated
      if (!store.state.auth.loggedIn) {
        return redirect('/doctorlogin')
      }
    },
    data: () => ({
      disabled: false,
      form: {
        signature: null
      },
      drawer: false,
      group: null,
      dialog: false,
      valid: true
    }),
    computed: {
      ...mapState('auth', [
        'user'
      ]),
    },
    created() {
      console.log(this.user)
    },
    methods: {
      logout(){
        this.$auth.logout().then(() => {this.$router.push('/doctorlogin')})
      },
      async save() {
        this.disabled = true

        const valid = this.$refs.form.validate()

        if(valid) {
          const payload = new FormData()

          payload.append('id', this.user.id)
          payload.append('profile', this.form.signature)

          const res = await this.$axios.post(`api/authorized/update-user`, payload)
  
          if(res.status === 200) {
            this.$auth.setUser(res.data)
            this.dialog = false
          }
        }

        this.disabled = false

      }
    }
  }
</script>