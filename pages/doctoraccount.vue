<template>
  <div>
    <v-card  height="100%"
      flat
      class="mx-auto">
      <v-app-bar absolute
        class="primary lighten-1 elevation-0"
        dark
        scroll-target="#scrolling-techniques-6">
        <v-spacer></v-spacer>
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
                      @click="$router.push('/doctormedicalconcern')">
                      View all
                    </v-btn>
                  </div>
              </v-card-text>
            </v-card>
          </v-menu>
        </div>
      </v-app-bar>
      
      <v-list height="720" class="pa-4">

        <v-list-item @click="$router.push('/doctoreditprofile')">
            <v-list-item-icon >
              <v-icon>mdi-id-card</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Edit Profile</v-list-item-title>
        </v-list-item>

        <v-list-item @click="$router.push('/doctorpassword')">
          <v-list-item-icon>
            <v-icon>mdi-lock</v-icon>
          </v-list-item-icon>
          <v-list-item-title> Change Password</v-list-item-title>
        </v-list-item>

        <v-list-item link @click="logout">
          <v-list-item-icon>
            <v-icon>mdi-power</v-icon>
          </v-list-item-icon>
          <v-list-item-title> Logout </v-list-item-title>
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
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import shared from '~/pages/_doctorshared'
  import head from '~/pages/_headServices'

  export default {
    layout: 'doctorDefault',

    mixins: [shared,head],

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