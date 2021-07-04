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
    <v-btn icon>
           <v-app-bar-nav-icon href="/secretaryhome"> <v-icon color="white">mdi-home</v-icon> </v-app-bar-nav-icon>
          </v-btn>
      <v-spacer> </v-spacer>   
      <v-toolbar-title  
          text
              color="#01579B"
              dark
              dense>
             DOCTOR
      </v-toolbar-title>
    </v-app-bar>
    <!-- head -->

    <v-img
      :height="$vuetify.breakpoint.smAndDown ? '250' : '750'"
      src="https://media.istockphoto.com/photos/hospital-blurry-background-picture-id939102942?k=6&m=939102942&s=170667a&w=0&h=Df0vc28Ikv_Fk3pAiuiTMwEwLvdnFekfXmoGop2VN7s="
    ></v-img>

  

    <div>
        <v-card color="#BBDEFB">
          <v-card-title >Create Doctor's Account
            <v-icon
            >mdi-doctor</v-icon>
          </v-card-title>
          <v-row>
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="firstname"
                :rules="nameRules"
                :counter="10"
                label="First name"
                required
              ></v-text-field>
            </v-col>

              <v-col
                cols="12"
                md="6"
              >
                <v-text-field
                  v-model="lastname"
                  :rules="nameRules"
                  :counter="10"
                  label="Last name"
                  required
                ></v-text-field>
              </v-col>
            </v-row>

                        <!-- ccc -->
          <v-container fluid>
                <v-row align="center">
                  <v-col
                    class="d-flex"
                    cols="12"
                    sm="6"
                    >
                  <v-dialog
                    ref="dialog"
                    v-model="modal"
                    :return-value.sync="date"
                    persistent
                    width="290px"
                    >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="date"
                        label="Birthday"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                         v-on="on"
                        ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="date"
                          scrollable
                        >
                          <v-spacer></v-spacer>
                          <v-btn
                            text
                            color="primary"
                            @click="modal = false"
                          >
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.dialog.save(date)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-dialog>
                         </v-col>
            <!-- gender -->
            
                  <v-col
                  class="d-flex"
                  cols="12"
                  sm="6"
                  >
                <v-select
                  :items="items"
                  label="Gender"
                ></v-select>
              </v-col>
              </v-row>
          </v-container>
            <!-- vvv -->
          
            <v-text-field
            v-model="Clinic"
            label="Clinic Name"
            required>
            </v-text-field>

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

                  <v-text-field
                    :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="show3 ? 'text' : 'password'"
                    name="input-10-2"
                    label="Confirm Password"
                    hint="At least 8 characters"
                    value=""
                    class="input-group--focused"
                    @click:append="show3 = !show3">
                    </v-text-field>
            
            <div class="text-center">
                <div class="col-md .offset-md">
                <v-btn
                rounded
                color="green"
                dark
                >
                Add
                </v-btn>
                </div>
            </div>
        </v-card>
      </div>
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
         
        },
          items: ['Male', 'Female', 'Custom'], collapseOnScroll: true,
      } 
    }
  }
</script>