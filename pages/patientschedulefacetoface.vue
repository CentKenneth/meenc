<template>
    <v-card flat>
   
        <v-app-bar
            class="pa-0 primary lighten-1"
            dark
        >
            <v-app-bar-nav-icon @click="$router.push('/patientservices')"> <v-icon color="white">mdi-arrow-left</v-icon> </v-app-bar-nav-icon>
                <v-spacer> </v-spacer>   
                <v-toolbar-title  
                    text
                    dense>
                    Schedule for Face to  Face Appointment
                </v-toolbar-title>
            <v-spacer></v-spacer> 
            <div>
                <v-menu
                :close-on-content-click="false"
                :nudge-width="300"
                offset-x>
                <template v-slot:activator="{ on, attrs }">
                    <v-icon @click="updateNotifications" color="white" v-bind="attrs" v-on="on">
                    mdi-message
                    </v-icon>
                    <v-avatar class="ml-n3 mt-n3" size="16" color="red" style="color:white;">
                    {{counter}}
                    </v-avatar>
                </template>
                <v-card flat>
                    <v-card-text class="">
                    Messages
                    </v-card-text>
                    <v-card-text class="pt-0" v-if="notifications.length > 0">
                        <div class="d-flex flex-column" v-for="notification in notifications" :key="notification.id">
                        <v-divider></v-divider>
                        <div class="py-3">
                            <div>
                            {{notification.messages}}
                            </div>
                            <div class="caption text-right">
                            {{convertDate(notification.created_at)}}
                            </div>
                        </div>
                        </div>
                        <v-divider></v-divider>
                        <div class="pt-4 text-center">
                        <v-btn 
                            class="pa-0 mt-n2"
                            text
                            color="#0277BD"  
                            @click="$router.push('/patientmedicalconcern')">
                            View all
                        </v-btn>
                        </div>
                    </v-card-text>
                </v-card>
                </v-menu>
            </div>
        </v-app-bar>

        <v-card flat class="primary lighten-5 rounded-lg mx-auto my-6 pa-4" max-width="950">
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
                            Selected Date and Time
                        </v-card-title>
                        <v-card-text class="d-flex flex-column">
                            <v-card class="primary pa-2" flat v-if="Object.keys(filteredSelected).length > 0">
                                <v-card-title class="white--text">
                                    <div class="text-center">
                                        {{filteredSelected.uniq}}
                                    </div>
                                    <div class="text-center px-2">
                                        {{formatDate(filteredSelected.start) + ' - ' + formatEnd(filteredSelected.end)}}
                                    </div>
                                    <v-spacer></v-spacer>
                                    <v-icon @click="selected = ''">mdi-close</v-icon>
                                </v-card-title>
                            </v-card>
                            <v-card flat v-else class="warning">
                                <v-card-title>
                                    No Date and Time selected, Please click slot on the calendar.
                                </v-card-title>
                            </v-card>
                        </v-card-text>
                    </v-card>

                    <v-card flat>
                        <v-card-actions>
                            <v-btn
                                outlined
                                large
                                class="mr-4"
                                color="grey darken-2"
                                @click="setToday"
                            >
                                Today
                            </v-btn>

                            <v-btn
                                fab
                                text
                                small
                                color="grey darken-2"
                                @click="prev"
                            >
                                <v-icon small>
                                mdi-chevron-left
                                </v-icon>
                            </v-btn>

                            <v-btn
                                fab
                                text
                                small
                                color="grey darken-2"
                                class="mr-2"
                                @click="next"
                            >
                                <v-icon small>
                                mdi-chevron-right
                                </v-icon>
                            </v-btn>

                            <v-toolbar-title v-if="$refs.calendar">
                                {{ $refs.calendar.title }}
                            </v-toolbar-title>

                            <v-spacer></v-spacer>

                            <div v-if="$vuetify.breakpoint.mdAndUp" style="width:220px;" class="mb-n4">
                                <v-select
                                    v-model="type"
                                    solo
                                    :items="types"
                                    item-value="value"
                                    item-text="name"
                                >
                                </v-select>
                            </div>
                        </v-card-actions>
                    </v-card>

                    <v-calendar
                        ref="calendar"
                        v-model="focus"
                        :type="type"
                        :events="filterEvents"
                        color="primary"
                        :event-ripple="false"
                        @click:more="viewDay"
                        @change="fetchData"
                        @click:event="showDialog"
                    >
                        <template v-slot:day-body="{ date, week }">
                            <div
                                class="v-current-time"
                                :class="{ first: date === week[0].date }"
                                :style="{ top: nowY }"
                            ></div>
                        </template>

                        <template v-slot:event="{ eventSummary }">
                            <div
                                class="v-event-draggable"
                                v-html="eventSummary()"
                            ></div>
                            <!-- <div
                                v-if="timed"
                                class="v-event-drag-bottom"
                                @mousedown.stop="extendBottom(event)"
                            ></div> -->
                        </template>

                    </v-calendar>
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
                                        disabled
                                        :rules="fieldRules"
                                        label="Name">

                                    </v-text-field>
                                </v-col>

                                <v-col cols="12" md="6" lg="6">
                                    <v-text-field
                                        v-model="form.weigth"
                                        disabled
                                        :rules="fieldRules"
                                        label="Weight">

                                    </v-text-field>
                                </v-col>
                                
                            </v-row>
                            <v-row>
                                
                                <v-col cols="12" md="6" lg="6">
                                    <v-text-field
                                        v-model="form.heigth"
                                        disabled
                                        :rules="fieldRules"
                                        label="Height">

                                    </v-text-field>
                                </v-col>

                                <v-col cols="12" md="6" lg="6">
                                    <v-textarea
                                        v-model="form.diagnosis"
                                        :rules="fieldRules"
                                        label="Concerns">

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
        </v-card>

        <notifications group="foo" />

        <v-dialog v-model="showDate" width="500">
            <v-card flat class="pa-3">
                <v-card-title>
                    <div>
                        Please select available time.
                    </div>
                    <v-spacer></v-spacer>
                    <v-icon @click="closeModal">
                        mdi-close
                    </v-icon>
                </v-card-title>
                <v-container v-if="filterTime.length > 0" class="d-flex" :class="$vuetify.breakpoint.smAndUp ? '' : 'flex-column'">
                    <v-card
                        v-for="schedule in filterTime"
                        :key="schedule.id" flat class="mx-auto"
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
                </v-container>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="selectTime" class="primary" depressed>
                        OK
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </v-card>
</template>
<script>
    import moment from 'moment'
    import { mapActions, mapState } from 'vuex'
  import shared from '~/pages/_patientshared'
  import head from '~/pages/_headServices'


export default {
    layout: 'patientDefault',
    mixins: [shared, head],
    middleware({ store, redirect }) {
      // If the user is not authenticated
      if (!store.state.auth.loggedIn) {
        return redirect('/patientlogin')
      }
    },
    data() {
        return {
            focus: '',
            type: 'week',
            events: [
            ],
            ready: false,
            types: [
                {name: 'Month', value: 'month'},
                {name: 'Week', value: 'week'},
                {name: 'Day', value: 'day'}
            ],
            showDate: false,
            filterTime: [],
            selectedData: '',

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
            specialization: ['Anesthesiologists', 'Dermatologists', 'Internists', 'Obstetricians and gynecologists','Ophthalmologists'
        , 'Pediatricians','Physicians', 'Psychiatrists', 'Surgeons']
        }
    },
    computed: {
      ...mapState('auth', [
        'user'
      ]),
      filteredSelected() {
            let sel = {}
            let items = null

            if(this.selected)
                items = this.schedules.filter(sched => sched.id == this.selected)

            if(items) {
                sel.start = items[0].start
                sel.end = items[0].end
                sel.uniq = items[0].uniq
            }

            return sel
        },
        filterEvents() {

            if(this.filteredSchedules.length > 0) {
                this.filteredSchedules.forEach((f) => {
                    let obj = {
                        time: true,
                        name: 'Slot ' + this.countAvailable(f),
                        start: moment(f).format('YYYY-MM-DD')
                    }

                    this.events.push(obj)
                })
            }

            return this.events
        },
        filteredSchedules() {
            let filterSched = []

            filterSched = [...new Set(this.schedules.map(item => item.uniq))]

            return filterSched.sort()

        },
        cal () {
            return this.ready ? this.$refs.calendar : null
        },
        nowY () {
            return this.cal ? this.cal.timeToY(this.cal.times.now) + 'px' : '-10px'
        },
    },
    created() {
        if(this.user) {
            this.form.name = this.user.name
            this.form.weigth = this.user.weight
            this.form.heigth = this.user.height
        }
    },
    methods: {
        ...mapActions('resource-actions', [
            'getDoctorBySpecialization'
        ]),
        countAvailable(data) {
            let count = 0

            let filterDate = this.schedules.filter(sched => sched.uniq == data)

            if(filterDate) {
                filterDate.forEach(f => {
                    if(f.status == 'pending') {
                        count++
                    }
                })
            }

            return count
        },
        viewDay ({ date }) {
            this.focus = date
            this.type = 'day'
        },
        fetchData() {
        },
        showDialog(event) {
            this.showDate = true
            
            this.selectedData = event.day.date
            this.filterTime = this.schedules.filter(sched => this.formatDate2(sched.start) == this.formatDate2(event.day.date))
            console.log(this.filterTime)
            console.log(this.schedules)
            console.log(event.day.date)
        },
        selectTime() {
            if(this.selected) {
                this.closeModal()
            }
        },
        closeModal() {
            this.showDate = false
            this.selectedData = ''
            this.filterTime = []
        },
        setToday() {
            this.focus = ''
        },
        prev () {
            this.$refs.calendar.prev()
        },
        next () {
            this.$refs.calendar.next()
        },
        async submit() {
            try {
                 const valid = this.$refs.form.validate()

                if(!this.selected) {
                    this.selectedMessages = 'Please fill other field and Select schedule'
                } else if(valid && this.selected) {
                    this.form.schedule_id = this.selected
                    this.form.patient_id = this.user.id

                    let res = await this.$axios.post(`api/authorized/patient-schedule-face`, this.form)

                    if(res.status == 201) {

                        let form = {
                            id: this.selected,
                            status: 'scheduled'
                        }

                        await this.$axios.post('api/authorized/schedule-doctor-update-f-t-f', form)

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
                    text: "Something went wrong"
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
            return moment(date).format('hh:mma')
        },
        formatDate2(date) {
            return moment(date).format('MMMM DD, YYYY')
        },
        formatEnd(date) {
            return moment(date).format('hh:mma')
        },
        selectSchedUniq(data) {
            this.selectedData = data
            this.filterTime = this.schedules.filter(sched => this.formatDate2(sched.start) == data)
        },
        selectSched(id) {
            this.selected = id
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
                let data = await this.$axios.get(`api/authorized/get-doctor-schedule-by-id-f-t-f/${val}`)
                if (data.status == 200) {
                    data.data.map(el => {
                        let obj = {
                            "id": el.id,
                            "start": el.start,
                            "end": el.end,
                            "status": el.status,
                            "name": el.name,
                            "uniq": this.formatDate2(el.start),
                        }
                        this.schedules.push(obj)
                    })
                }
            }
        }
    }
}
</script>
