<template>
  <v-app class="app">
    <v-card flat class="d-flex" :class="$vuetify.breakpoint.smAndDown ? 'flex-column' : ''" height="100%">

      <div v-if="$vuetify.breakpoint.smAndDown" class="primary pa-5 pb-n5">
        <v-icon color="white" @click="drawer = true">mdi-menu</v-icon>
      </div>

      <v-card-title v-else class="ma-0 pa-0">
        <v-navigation-drawer
          class="primary lighten-1"
          :mini-variant.sync="mini"
          permanent>

          <v-list-item class="px-2">
            <v-list-item-avatar @click="dialog = true" style="cursor: pointer;">
              <v-img :src="user.profile ? user.profile : 'https://randomuser.me/api/portraits/men/85.jpg'"></v-img>
            </v-list-item-avatar>

            <v-list-item-title class="white--text">{{user.name ? user.name : 'User'}}</v-list-item-title>

            <v-btn
              icon
              @click.stop="mini = !mini"
            >
              <v-icon color="white">mdi-chevron-left</v-icon>
            </v-btn>
          </v-list-item>

          <v-divider></v-divider>

          <v-list dense>
            <v-list-item-group
              v-model="selectedItem"
            >
              <v-list-item
                v-for="item in items"
                :key="item.title"
                @click="$router.push(item.url)"
                link
              >
                <v-list-item-icon>
                  <v-icon color="white">{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title class="white--text">{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>
      </v-card-title>
      
      <v-card-text class="ma-0 pa-0">
        <Nuxt />
      </v-card-text>

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

      <v-navigation-drawer
        class="primary lighten-1"
        v-model="drawer"
        absolute
        temporary >
        <v-list
          nav
          dense
        >
          <v-list-item-group
            v-model="selectedItem"
          >
            <v-list-item
              v-for="item in items"
              :key="item.title"
              @click="$router.push(item.url)"
              link
            >
              <v-list-item-icon>
                <v-icon color="white">{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title class="white--text">{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </v-card>
  </v-app>
</template>
<script>
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        selectedItem: 0,
        drawer: false,
        items: [
          { title: 'Home', icon: 'mdi-home-city', url: '/patienthome' },
          { title: 'Acount', icon: 'mdi-account', url: '/patientaccount' },
          { title: 'Doctors', icon: 'mdi-doctor', url: '/patientdoctors' },
          { title: 'Services', icon: 'mdi-medical-bag', url: '/patientservices' },
        ],
        mini: true,
        form: {
          signature: null
        },
        disabled: false,
        dialog: false,
        valid: true
      }
    },
    computed: {
      ...mapState('auth', [
        'user'
      ]),
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
<style>
  .app {
    background-color: #f2fffe !important;
  }

</style>


