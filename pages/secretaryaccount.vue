<template
>
<v-container
    class="spacing-playground pa-0"
    fluid
    
  >
 <v-card >
    <v-app-bar color="#01579B"
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-title style="color:white">Secretary </v-list-item-title>

      </v-list-item>
      <v-divider></v-divider>
      <v-app-bar-nav-icon href="/secretarylogin"> <v-icon color="white">mdi-power</v-icon> </v-app-bar-nav-icon>
    </v-app-bar>

    <v-list color="#00B0FF" height="530">
          <v-list-item link href="secretaryeditprofile">
            <v-list-item-icon>
              <v-icon>mdi-id-card</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Edit Profile</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-lock</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Change Password</v-list-item-title>
          </v-list-item>
        </v-list>
  </v-card>

<v-bottom-navigation
    background-color="#BBDEFB"
    :value="value"
    color="#01579B"
    grow
  >
    <v-btn href="/secretaryhome">
      <span>Home</span>
      <v-icon>mdi-home</v-icon>
    </v-btn>

    <v-btn href="/secretaryservices">
      <span>Services</span>

      <v-icon>mdi-calendar-range</v-icon>
    </v-btn>

    <v-btn  href="/secretaryaccount">
      <span>Account</span>
      <v-icon >mdi-account</v-icon>
    </v-btn>
  </v-bottom-navigation>


  </v-container>


</template>
<script>
  export default {
    data: () => ({
      drawer: false,
      group: null,
    }),
    data: () => ({ value: 2 }),
  }
</script>