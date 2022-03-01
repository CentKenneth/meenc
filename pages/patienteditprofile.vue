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
      <v-app-bar-nav-icon @click="$router.push('/patientaccount')"> <v-icon color="white">mdi-arrow-left</v-icon> </v-app-bar-nav-icon>
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
  export default {
    layout: 'patientDefault',
    middleware({ store, redirect }) {
      // If the user is not authenticated
      if (!store.state.auth.loggedIn) {
        return redirect('/patientlogin')
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
