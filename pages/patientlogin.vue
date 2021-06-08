<template>
  <v-card
    :loading="loading"
    :max-width="$vuetify.breakpoint.smAndDown ? '400' : '100%'"
    class="my-1"
  >
  
      <!-- head -->
     <v-app-bar
      :collapse="!collapseOnScroll"
      :collapse-on-scroll="collapseOnScroll"
      absolute
      color="#01579B"
      dark
      scroll-target="#scrolling-techniques-6"
    >
    <v-icon
      large
      color="#BBDEFB"
      href="/">
      mdi-arrow-left-bold-box-outline
    </v-icon>
    <v-btn text
      href="/">
      Back
    </v-btn>


       <v-spacer> </v-spacer>   
      <v-toolbar-title  
          text
              color="#01579B"
              dark
              dense>
              PATIENT
      </v-toolbar-title>
      
    </v-app-bar>
<!-- head -->
    <v-img
      :height="$vuetify.breakpoint.smAndDown ? '250' : '750'"
      src="https://th.bing.com/th/id/OIP.TQCo8L6PiW7sIs_Qv6EHzgHaE8?pid=ImgDet&rs=1"
    ></v-img>
  <v-card color="#BBDEFB" >
      <v-card-title >Login
        <v-icon
        >mdi-account</v-icon>
      </v-card-title>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required>
        </v-text-field>
        <v-text-field
                :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show3 ? 'text' : 'password'"
                name="input-10-2"
                label="Password"
                hint="At least 8 characters"
                value=""
                class="input-group--focused"
                @click:append="show3 = !show3">
        </v-text-field>
        <div class="text-center">
          <v-btn
            rounded
            color="primary"
            dark
            a href="/patienthome"
          > Login
          </v-btn>
        </div>
        <div class="text-center">
          <div class="col-md .offset-md">
            <a href="#">Forgot Password?</a>
          </div>
          <div class="col-md .offset-md "> <v-btn 
                rounded
                elevation="2"
                color="green"
                dark
                href="/patientregister" 
                > Create New Account
                </v-btn>
          </div>
        </div>
      </v-card>
    </v-container>
  </v-card>
</template>
<script>
  export default {
    data () {
      return {
        show1: false,
        show2: true,
        show3: false,
        show4: false,
        password: 'Password',
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => (`The email and password you entered don't match`),
        },collapseOnScroll: true,
      }
    },
  }
</script>