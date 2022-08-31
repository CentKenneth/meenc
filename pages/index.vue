<template>
  <div>
    <v-container
      class="pt-10"
      fluid
    >
      <v-row
        align="center"
        justify="center"
      >
        <v-col
          cols="12"
          sm="8"
          md="4"
          lg="3"
        >
          <v-card class="mt-16" :flat="$vuetify.breakpoint.smAndDown" :class="$vuetify.breakpoint.smAndDown ? 'transparent' : 'primary lighten-5 rounded-lg pa-4'" >

            <v-card-title class="d-flex justify-center py-6">
              <v-avatar class="profile elevation-4" size="164">
                <img
                  src="~assets/M.svg" />
              </v-avatar>
            </v-card-title>

            <v-card-title class="mt-n10 pb-0">
              <div class="mx-auto text-center pa-2">
                MEENC Health Care
              </div>
            </v-card-title>

            <v-card-text>
              <div class="mx-auto text-center title pa-2">
                Login as
              </div>
              <v-btn
                large
                @click="$router.push('/patientlogin')"
                class="primary lighten-3 mx-auto pa-5 rounded-lg title d-flex">
                <v-icon class="mr-3" size="30">mdi-account</v-icon>
                <div>
                  Patient
                </div>
              </v-btn>
              <v-btn
                large
                @click="$router.push('/doctorlogin')"
                class="primary lighten-3 mx-auto pa-5 rounded-lg title mt-2 d-flex">
                <v-icon class="mr-3" size="30">mdi-doctor</v-icon>
                <div>
                  Doctor
                </div>
              </v-btn>
            </v-card-text>

          </v-card>

        </v-col>

      </v-row>

    </v-container>

  </div>
</template>
<script>
  export default {
    layout: 'default',
    mounted() {
      console.log(this.$config.BASEURL)
      console.log(process.env.BASEURL)
      console.log(process)
    },
    data: () => ({
      drawer: false,
      group: null,
    }),
  }
</script>

