<template>
<v-container>
  <v-card
    class="overflow-hidden"
    color="purple lighten-1"
    dark
  >
    <v-toolbar
      flat
      color="purple"
    >
      <v-icon>mdi-account</v-icon>
      <v-toolbar-title class="font-weight-light">
        Profile
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        color="purple darken-3"
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
    <v-card-text>
      <v-text-field
        :disabled="!isEditing"
        color="white"
        label="Name"
      ></v-text-field>

     <v-text-field
        :disabled="!isEditing"
        color="white"
        label="Username"
      ></v-text-field>

      <v-autocomplete
        :disabled="!isEditing"
        :items="states"
        :filter="customFilter"
        color="white"
        item-text="name"
        label="Address"
      ></v-autocomplete>
    <v-text-field
        :disabled="!isEditing"
        color="white"
        label="Password"
      ></v-text-field>


    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        :disabled="!isEditing"
        color="success"
        @click="save"
      >
        Update
      </v-btn>
    </v-card-actions>
    <v-snackbar
      v-model="hasSaved"
      :timeout="2000"
      absolute
      bottom
      left
    >
      Your profile has been updated
    </v-snackbar>
  </v-card>
</v-container>
</template>
<script>
  export default {
    data () {
      return {
        hasSaved: false,
        isEditing: null,
        model: null,
        states: [
          { name: 'Panabo City', abbr: 'PC', id: 1 },
          { name: 'Davao City', abbr: 'DC', id: 2 },
          { name: 'Tagum City', abbr: 'TC', id: 3 },
        ],
      }
    },

    methods: {
      customFilter (item, queryText, itemText) {
        const textOne = item.name.toLowerCase()
        const textTwo = item.abbr.toLowerCase()
        const searchText = queryText.toLowerCase()

        return textOne.indexOf(searchText) > -1 ||
          textTwo.indexOf(searchText) > -1
      },
      save () {
        this.isEditing = !this.isEditing
        this.hasSaved = true
      },
    },
  }
</script>