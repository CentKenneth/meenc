<template>
    <v-card flat>
   
        <v-app-bar
            color="#01579B"
            dark
            scroll-target="#scrolling-techniques-6"
        >
            <v-app-bar-nav-icon @click="$router.push('/patientservices')"> <v-icon color="white">mdi-arrow-left</v-icon> </v-app-bar-nav-icon>
                <v-spacer> </v-spacer>   
                <v-toolbar-title  
                text
                    color="#01579B"
                    dark
                    dense>
                    Schedule for Online Checkup
                </v-toolbar-title>
            <v-spacer></v-spacer> 
        </v-app-bar>

        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
        >

            <v-card-text v-if="selectedMessages">
                <v-card class="error white--text">
                    <v-card-title class="d-flex">
                        <div>
                            {{selectedMessages}}
                        </div>
                        <v-spacer></v-spacer>
                        <div>
                            <v-icon class="white--text" @click="selectedMessages = ''">
                                mdi-close
                            </v-icon>
                        </div>
                    </v-card-title>
                </v-card>
            </v-card-text>

            <v-card-text>
                <v-select
                    v-model="form.specialization"
                    :items="specialization"
                    @change="fetchDoctor"
                    :rules="fieldRules"
                    item-value="name"
                    item-text="name"
                    label="Select Specialization"
                >
                </v-select>
            </v-card-text>

            <v-card-text v-if="doctors.length > 0">
                <v-select
                    v-model="form.doctor_id"
                    :items="doctors"
                    @change="fetchDoctorInfo"
                    :rules="fieldRules"
                    item-value="id"
                    item-text="name"
                    label="Select Doctor"
                >
                </v-select>
            </v-card-text>

            <v-card-text v-if="doctors_info.length > 0">
                <v-card flat class="primary lighten-5">
                    <v-card-title>
                        Doctor Information
                    </v-card-title>
                    <v-card-text>
                        <v-row class="px-4">
                            <v-col cols="12">
                                <div>
                                    Name: {{doctors_info[0].name}}
                                </div>
                            </v-col>
                            <v-col cols="12">
                                <div>
                                    Degree Level: {{doctors_info[0].degreelevel}}
                                </div>
                            </v-col>
                            <v-col cols="12">
                                <div>
                                    Degree Field: {{doctors_info[0].degreefield}}
                                </div>
                            </v-col>
                            <v-col cols="12">
                                <div>
                                    Email: {{doctors_info[0].email}}
                                </div>
                            </v-col>
                            <v-col cols="12">
                                <div>
                                    Medical Clinic Name: {{doctors_info[0].clinicname}}
                                </div>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-card-text>

            <v-card-text v-if="doctors_info.length > 0 && schedules.length > 0">
                <v-card flat class="primary lighten-5">
                    <v-card-title>
                        Doctor Schedule This Week
                    </v-card-title>
                    <v-card-text class="d-flex">

                        <v-card
                            v-for="schedule in schedules"
                            :key="schedule.id" flat class="mx-2"
                            :class="selected == schedule.id ? 'purple' : schedule.status == 'pending' ? 'primary' : 'grey'"
                            :disabled="schedule.status != 'pending'"
                            style="cursor: pointer;"
                            @click="selectSched(schedule.id)"
                            width="170px">
                            <v-card-text class="white--text">
                                <div class="text-center">
                                    {{formatDate(schedule.start) + ' - ' + formatEnd(schedule.end)}}
                                </div>
                                <div v-if="schedule.status != 'pending'" class="text-center">
                                    Not Available
                                </div>
                            </v-card-text>
                        </v-card>

                    </v-card-text>
                </v-card>
            </v-card-text>

            <v-card-text v-if="doctors_info.length > 0 && schedules.length == 0">
                <v-card flat class="warning lighten-5">
                    <v-card-title>
                        No Schedule for this week
                    </v-card-title>
                </v-card>
            </v-card-text>

            <v-card-text>
                <v-card flat class="primary lighten-5">
                    <v-card-title>
                        Patient Information
                    </v-card-title>
                    <v-card-text class="px-7">
                        <v-row>
                            <v-col cols="12" md="6" lg="6">
                                <v-text-field
                                    v-model="form.name"
                                    :rules="fieldRules"
                                    label="Name">

                                </v-text-field>
                            </v-col>
                            <v-col cols="12" md="6" lg="6">
                                <v-text-field
                                    v-model="form.bday"
                                    :rules="fieldRules"
                                    type="date"
                                    label="Birthday">

                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="6" lg="6">
                                <v-text-field
                                    v-model="form.address"
                                    :rules="fieldRules"
                                    label="Address">

                                </v-text-field>
                            </v-col>
                            <v-col cols="12" md="6" lg="6">
                                <v-text-field
                                    v-model="form.weigth"
                                    :rules="fieldRules"
                                    label="Weight">

                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="6" lg="6">
                                <v-text-field
                                    v-model="form.heigth"
                                    :rules="fieldRules"
                                    label="Height">

                                </v-text-field>
                            </v-col>
                            <v-col cols="12" md="6" lg="6">
                                <v-textarea
                                    v-model="form.diagnosis"
                                    :rules="fieldRules"
                                    label="Diagnosis">

                                </v-textarea>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-card-text>

        </v-form>

        <v-card-actions class="px-4 pa-5 justify-center">
            <v-btn large class="primary rounded-lg" min-width="200" @click="submit">Submit</v-btn>
        </v-card-actions>

        <notifications group="foo" />

    </v-card>
</template>
<script>
    import moment from 'moment'
    import { mapActions, mapState } from 'vuex'

export default {
    middleware({ store, redirect }) {
      // If the user is not authenticated
      if (!store.state.auth.loggedIn) {
        return redirect('/patientlogin')
      }
    },
    data() {
        return {
            form: {
                "specialization": '',
                "doctor_id": '',
                "bday": '',
                "name": '',
                "weigth": '',
                "diagnosis": '',
                "heigth": ''
            },
            selectedMessages: '',
            valid: true,
            doctors: [],
            doctors_info: [],
            schedules: [],
            selected: '',
            fieldRules: [
                v => !!v || "this field is required",
            ],
            specialization: [
                {name: 'Anatomical Pathology', id: 1},
                {name: 'Anesthesiology', id: 2},
                {name: 'Cardiology', id: 3},
                {name: 'Cardiovascular or Thoracic Surgery', id: 4},
                {name: 'Clinical Immunology or Allergy', id: 5},
                {name: 'Critical Care Medicine', id: 6},
                {name: 'Dermatology', id: 7},
                {name: 'Diagnostic Radiology', id: 8}
            ]
        }
    },
    computed: {
      ...mapState('auth', [
        'user'
      ]),
    },
    methods: {
        ...mapActions('resource-actions', [
            'getDoctorBySpecialization'
        ]),
        async submit() {
            try {
                 const valid = this.$refs.form.validate()

                if(!this.selected) {
                    this.selectedMessages = 'Please fill other field and Select schedule'
                } else if(valid && this.selected) {
                    this.form.schedule_id = this.selected
                    this.form.patient_id = this.user.id

                    let res = await this.$axios.post(`api/authorized/patient-schedule`, this.form)

                    if(res.status == 201) {

                        this.$notify({
                            type: 'success',
                            group: 'foo',
                            title: 'Success!',
                            text: 'Successfully Scheduled!'
                        })

                        this.$router.push('/patientsummaryappointments')
                    }
                    
                }
            } catch(err) {
                this.$notify({
                    type: 'error',
                    group: 'foo',
                    title: 'Error!',
                    text: err.message
                })
            }
           
        },
        reset() {
            this.form = {
                "specialization": '',
                "doctor_id": '',
                "bday": '',
                "name": '',
                "weight": '',
                "diagnosis": '',
                "height": ''
            }
            this.schedules = []
            this.doctors_info = []
            this.selected = ''
        },
        formatDate(date) {
            return moment(date).format('MMMM DD, YYYY hh:mma')
        },
        formatEnd(date) {
            return moment(date).format('hh:mma')
        },
        selectSched(id) {
            this.selected = id
            console.log(id)
        },
        async fetchDoctor(value) {
            if(value) {
                let data = await this.$axios.get(`api/authorized/get-doctor-by-specialization/${value}`)
                if (data.status == 200 && data.data.length > 0) {
                    data.data.map(el => {
                        let obj = {
                            "id": el.id,
                            "name": el.name,
                            "degreelevel": el.degreelevel,
                            "degreefield": el.degreefield,
                            "email": el.email,
                            "clinicname": el.clinicname
                        }
                        this.doctors.push(obj)
                    })
                } else {
                    this.doctors = []
                    this.doctors_info = []
                    this.schedules = []
                } 
            }
        },
        async fetchDoctorInfo(val) {
            if(val != '') {
                this.doctors_info = this.doctors.filter(el => el.id == val)
                let data = await this.$axios.get(`api/authorized/get-doctor-schedule-by-id/${val}`)
                if (data.status == 200) {
                    data.data.map(el => {
                        let obj = {
                            "id": el.id,
                            "start": el.start,
                            "end": el.end,
                            "status": el.status,
                            "name": el.name
                        }
                        this.schedules.push(obj)
                    })
                }
            }
        }
    }
}
</script>
