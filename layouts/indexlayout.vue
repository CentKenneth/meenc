<template>
  <v-card
    class="mx-auto overflow-hidden"
    height="750"
  >
    <v-app-bar
      color="dark"
      elevation="absolute"
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title >MEENC HEALTH CARE</v-toolbar-title>
    </v-app-bar>
    <div>    <img
      class="text center"
      height="100%"
      width="100%"
      src="~assets/logo.jpg"
    ><img>
</div>
    

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
    
      <v-list>
        <v-list-item-group
          v-model="group"
          active-class="deep-white--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-icon>
              <v-icon >mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title >
                <v-btn text
               href="/" >
                    Home
                </v-btn>
            </v-list-item-title>
          </v-list-item>

          <v-list-item  >
            <v-list-item-icon>
              <v-icon>mdi-doctor</v-icon>
            </v-list-item-icon>
            <v-list-item-title><v-btn text
                 href="/doctorlogin" >
                Doctor
                </v-btn>
                </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title><v-btn text
               href="/patientlogin" >
                Patient
                </v-btn></v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-info</v-icon>
            </v-list-item-icon>
            <v-list-item-title><v-btn text
               href="#" >
                About
                </v-btn></v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>
<script>
  export default {
    data: () => ({
      drawer: false,
      group: null,
    }),
  }
</script>