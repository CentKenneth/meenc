<template>
  <v-card
  height="700"
    class="overflow-hidden"
    color="#1E88E5"
    dark
  >
    <v-toolbar
      flat
      color="#01579B"
    >
      <v-btn color="#01579B" href="secretaryaccount"
       fab
        small>
        
        <v-icon> mdi-arrow-left-bold</v-icon></v-btn>
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

    <v-card-text>
      <v-text-field
        :disabled="!isEditing"
        color="white"
        label="Name"
      ></v-text-field>



      <v-autocomplete
        :disabled="!isEditing"
        :items="states"
        :filter="customFilter"
        color="white"
        item-text="name"
        label="Gender"
      ></v-autocomplete>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
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
      absolute
      bottom
      left
    >
      Your profile has been updated
    </v-snackbar>
  </v-card>
 
</template>
<script>
  export default {
    data () {
      return {
        hasSaved: false,
        isEditing: null,
        model: null,
        states: [
          { name: 'Male', abbr: 'M', id: 1 },
          { name: 'Female', abbr: 'F', id: 2 },
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
