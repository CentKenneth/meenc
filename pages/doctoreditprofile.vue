<template>
  <v-card
    flat
    height="700"
    class="overflow-hidden"
    color="#1E88E5"
    dark>

    <v-toolbar
      flat
      color="#01579B"
    >
      <v-app-bar-nav-icon @click="$router.push('/doctoraccount')"> <v-icon color="white">mdi-arrow-left</v-icon> </v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-btn
        color="#01579B"
        fab
        small
        @click="isEditing = !isEditing"
      >
        <v-icon v-if="isEditing">
          mdi-close
        </v-icon>
        <v-icon v-else>
          mdi-pencil
        </v-icon>
      </v-btn>
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
    </v-toolbar>

    <v-card-text class="pa-10">

      <v-text-field
        v-model="form.name"
        :disabled="!isEditing"
        color="white"
        label="Name"
      ></v-text-field>

      <v-text-field
        v-model="form.email"
        :disabled="!isEditing"
        color="white"
        label="Email"
      ></v-text-field>

    </v-card-text>

    <v-card-actions class="pa-10">
      <v-spacer></v-spacer>
      <v-btn
        :disabled="!isEditing"
        color="success"
        @click="save"
      >
        Save
      </v-btn>
    </v-card-actions>
    <v-snackbar
      v-model="hasSaved"
      :timeout="2000"
      color="success"
      absolute
      top
      left
    >
      Your profile has been updated
    </v-snackbar>
  </v-card>
 
</template>
<script>
  import { mapState } from 'vuex'
  import shared from '~/pages/_doctorshared'

  export default {
    layout: 'doctorDefault',

    mixins: [shared],

    middleware({ store, redirect }) {
      // If the user is not authenticated
      if (!store.state.auth.loggedIn) {
        return redirect('/doctorlogin')
      }
    },
    data () {
      return {
        form: {
          name: null,
          email: null
        },
        hasSaved: false,
        isEditing: null,
        model: null,
        states: [
          { name: 'Male', abbr: 'M', id: 1 },
          { name: 'Female', abbr: 'F', id: 2 },
        ],
      }
    },

    computed: {
      ...mapState('auth', [
        'user'
      ]),
    },

    mounted() {
      this.form.name = this.user.name
      this.form.email = this.user.email
    },

    methods: {
      customFilter (item, queryText, itemText) {
        const textOne = item.name.toLowerCase()
        const textTwo = item.abbr.toLowerCase()
        const searchText = queryText.toLowerCase()

        return textOne.indexOf(searchText) > -1 ||
          textTwo.indexOf(searchText) > -1
      },
      async save () {
        this.isEditing = true
        this.form.id = this.user.id

        let res = await this.$axios.post(`api/authorized/update-user`, this.form)

        if(res.status === 200) {

          this.hasSaved = true
          
        }

        this.isEditing = false

        setTimeout(() => {
          this.hasSaved = false
        }, 1000)

      },
    },
  }
</script>
