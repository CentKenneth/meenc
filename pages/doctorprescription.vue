<template>
<v-card  
   >

    <v-app-bar
      
      absolute
      color="#01579B"
      dark
      scroll-target="#scrolling-techniques-6"
    >
      <v-app-bar-nav-icon href="/doctorservices"> <v-icon color="white">mdi-arrow-left</v-icon> </v-app-bar-nav-icon>
   <v-spacer> </v-spacer>   
      <v-toolbar-title  
          text
              color="#01579B"
              dark
              dense>
              PRESCRIPTION
      </v-toolbar-title>
    <v-spacer> </v-spacer> 
    </v-app-bar>
    <v-img
      :height="$vuetify.breakpoint.smAndDown ? '360' : '350'"
      src="https://media.istockphoto.com/photos/hospital-blurry-background-picture-id939102942?k=6&m=939102942&s=170667a&w=0&h=Df0vc28Ikv_Fk3pAiuiTMwEwLvdnFekfXmoGop2VN7s="
    ></v-img>

   <v-card
    color="blue-grey darken-1"
    dark
    :loading="isUpdating"
  >
    <template v-slot:progress>
      <v-progress-linear
        absolute
        color="green lighten-3"
        height="4"
        indeterminate
      ></v-progress-linear>
    </template>
  
    <v-form>
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="6"
          >
    
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
   
          </v-col>
          <v-col cols="12">
            <v-autocomplete
              v-model="friends"
              :disabled="isUpdating"
              :items="people"
              filled
              chips
              color="blue-grey lighten-2"
              label="Select"
              item-text="name"
              item-value="name"
              multiple
            >
              <template v-slot:selection="data">
                <v-chip
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  close
                  @click="data.select"
                  @click:close="remove(data.item)"
                >
                  <v-avatar left>
                    <v-img :src="data.item.avatar"></v-img>
                  </v-avatar>
                  {{ data.item.name }}
                </v-chip>
              </template>
              <template v-slot:item="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-item-content v-text="data.item"></v-list-item-content>
                </template>
                <template v-else>
                  <v-list-item-avatar>
                    <img :src="data.item.avatar">
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title v-html="data.item.name"></v-list-item-title>
                    <v-list-item-subtitle v-html="data.item.group"></v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </template>
            </v-autocomplete>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <v-divider></v-divider>
 
  </v-card>
 <v-card flat color="#BBDEFB" class="pa-1" >
   
  <v-row justify="center" >
    
    <v-col
    :max-width="$vuetify.breakpoint.smAndDown ? '100%' : '100%'"
    >
      <v-card ref="form" >
        <v-card-text>
          <v-text-field
            ref="name"
            v-model="name"
            :rules="[() => !!name || 'This field is required']"
            :error-messages="errorMessages"
            label="Message"
            placeholder="Short Message"
             prepend-icon="mdi-comment-account-outline"
            required
          ></v-text-field>

          <v-file-input
            multiple
            label="Prescription"
          ></v-file-input>
                
        </v-card-text>
        <v-divider class="mt-12"></v-divider>
        <v-card-actions>
          <v-btn text>
            Cancel
          </v-btn>
          <v-spacer></v-spacer>
          <v-slide-x-reverse-transition>
            <v-tooltip
              v-if="formHasErrors"
              left
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  class="my-0"
                  v-bind="attrs"
                  @click="resetForm"
                  v-on="on"
                >
                  <v-icon>mdi-refresh</v-icon>
                </v-btn>
              </template>
              <span>Refresh form</span>
            </v-tooltip>
          </v-slide-x-reverse-transition>
          <v-btn
            color="primary"
            text
            @click="submit"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
  </v-card>
  </v-card>
</template>
<script>
  export default {
    watch: {
      name () {
        this.errorMessages = ''
      },
    },

    methods: {
      addressCheck () {
        this.errorMessages = this.address && !this.name
          ? `Hey! I'm required`
          : ''

        return true
      },
      resetForm () {
        this.errorMessages = []
        this.formHasErrors = false

        Object.keys(this.form).forEach(f => {
          this.$refs[f].reset()
        })
      },
      submit () {
        this.formHasErrors = false

        Object.keys(this.form).forEach(f => {
          if (!this.form[f]) this.formHasErrors = true

          this.$refs[f].validate(true)
        })
      },
    }, data () {
      return {
        valid: true,
        form: {},
        show1: false,
        show2: true,
        show3: false,
        show4: false,
        loading: false,
        
        emailRules: [
                  v => !!v || "E-mail is required",
                  v => /.+@.+/.test(v) || "E-mail must be valid"
                ],
        collapseOnScroll: true,
      }
    },

    methods: {
      validate () {
        this.$refs.form.validate()
        console.log(this.$refs.form.validate())
      }
    }
  }
  
</script>

<script>
  export default {
    data () {
      const srcs = {
        1: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        2: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        3: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        4: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
        5: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
      }

      return {
        autoUpdate: true,
        friends: ['Sandra Adams', 'Britta Holt'],
        isUpdating: false,
        name: '',
        people: [
          { header: 'Patient' },
          { name: 'Sandra Adams', group: '', avatar: srcs[1] },
          { name: 'Ali Connors', group: '', avatar: srcs[2] },
          { name: 'Trevor Hansen', group: '', avatar: srcs[3] },
          { name: 'Tucker Smith', group: '', avatar: srcs[2] },
          { divider: true },
          { header: 'Patient' },
          { name: 'Britta Holt', group: '', avatar: srcs[4] },
          { name: 'Jane Smith ', group: '', avatar: srcs[5] },
          { name: 'John Smith', group: '', avatar: srcs[1] },
          { name: 'Sandra Williams', group: '', avatar: srcs[3] },
        ],
        title: 'The summer breeze',
      }
    },

    watch: {
      isUpdating (val) {
        if (val) {
          setTimeout(() => (this.isUpdating = false), 3000)
        }
      },
    },

    methods: {
      remove (item) {
        const index = this.friends.indexOf(item.name)
        if (index >= 0) this.friends.splice(index, 1)
      },
    },
  }
</script>