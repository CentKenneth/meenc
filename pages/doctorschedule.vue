<template>
<v-card> 
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
              Appointment slot
      </v-toolbar-title>
      
    <v-spacer> </v-spacer> 
    </v-app-bar>
<br>
<br>
<br>

  <v-container class="pt-6">
      
    <v-row class="text-center">
      <v-col col="12">
        <v-sheet height="100%">

            <v-toolbar flat>

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

                <div style="width:220px;" class="mb-n4">
                    <v-select
                        v-model="type"
                        solo
                        :items="types"
                        item-value="value"
                        item-text="name"
                    >
                    </v-select>
                </div>
                <v-btn
                    large
                    class="ml-4 mt-n3"
                    color="primary"
                    @click="addEvent"
                >
                    Add Event
                </v-btn>
            </v-toolbar>
            
            <v-calendar
                ref="calendar"
                v-model="focus"
                :type="type"
                :events="events"
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

        </v-sheet>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" persistent scrollable width="500">
        <v-card flat :disabled="disabled">
            <v-card-title>
                Event
            </v-card-title>
            <v-card-text class="py-0 my-0 pt-4">

                <v-text-field outlined label="Name" v-model="form.name">
                </v-text-field>

                <v-text-field outlined label="Start Date" type="date" v-model="form.start_date">
                </v-text-field>

                <v-text-field outlined label="Start Time" type="time" v-model="form.start_time">
                </v-text-field>

                <v-text-field outlined label="End Date" type="date" v-model="form.end_date">
                </v-text-field>

                <v-text-field outlined label="End Time" type="time" v-model="form.end_time">
                </v-text-field>

            </v-card-text>
            <v-card-actions class="px-6 pb-4">
                <v-spacer></v-spacer>
                <v-btn class="justify-center white--text" color="grey darken-2" @click="dialog = false">
                    Cancel
                </v-btn>
                <v-btn class="justify-center" color="primary" @click="saveSchedule">
                    {{action}}
                </v-btn>
                <v-btn v-if="action == 'Update'" class="justify-center white--text" color="red" @click="deleteEvent">
                    Delete
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <notifications group="foo" />
  </v-container>
  </v-card>
</template>
<script>
import moment from 'moment'
import { mapState } from 'vuex'
export default {
    name: "Schedule",
    data() {
        return {
            disabled: false,
            action: 'Add',
            form: {},
            event_name: '',
            dialog: false,
            dragEvent: null,
            dragStart: null,
            createEvent: null,
            createStart: null,
            extendOriginal: null,
            value: '',
            ready: false,
            focus: '',
            colors: ['#2196F3', '#3F51B5', '#673AB7', '#00BCD4', '#4CAF50', '#FF9800', '#757575'],
            names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
            types: [
                {name: 'Month', value: 'month'},
                {name: 'Week', value: 'week'},
                {name: 'Day', value: 'day'}
            ],
            type: 'week',
            events: [
            ],
        }
    },

    computed: {
      cal () {
        return this.ready ? this.$refs.calendar : null
      },
      nowY () {
        return this.cal ? this.cal.timeToY(this.cal.times.now) + 'px' : '-10px'
      },
      ...mapState('auth', [
        'user'
      ]),
    },

    async mounted() {
        await this.fetchData()
    },

    methods: {
        async deleteEvent() {
            this.disabled = true
            const data = await this.$axios.post('api/authorized/schedule-doctor-delete/' + this.form.id)

            if (data.status == 200) {

                this.dialog = false

                this.$notify({
                    type: 'success',
                    group: 'foo',
                    title: 'Success!',
                    text: 'Successfully Deleted!'
                })

                await this.fetchData()

            }

            this.disabled = false
        },
        addEvent() {
            this.form = {}
            this.action = "Add"
            this.dialog = true
        },
        async saveSchedule() {
            if (this.action == 'Add') {

                this.disabled = true

                this.form.start = this.form.start_date + ' ' + (this.form.start_time ? this.form.start_time : '00:00:00')
                this.form.user_id = this.user.id

                if (this.form.end_date)
                    this.form.end = this.form.end_date + ' ' + (this.form.end_time ? this.form.end_time : '00:00:00')
                else
                    this.form.end = this.form.start

                const data = await this.$axios.post('api/authorized/schedule-doctor-create', this.form)

                if (data.status == 201) {

                    this.dialog = false

                    this.$notify({
                        type: 'success',
                        group: 'foo',
                        title: 'Success!',
                        text: 'Successfully Created!'
                    })

                    await this.fetchData()

                }

                this.disabled = false

            } else {
                this.disabled = true

                this.form.start = this.form.start_date + ' ' + (this.form.start_time ? this.form.start_time : '00:00:00')

                if (this.form.end_date)
                    this.form.end = this.form.end_date + ' ' + (this.form.end_time ? this.form.end_time : '00:00:00')
                else
                    this.form.end = this.form.start

                const data = await this.$axios.post('api/authorized/schedule-doctor-update', this.form)

                if (data.status == 200) {

                    this.dialog = false

                    this.$notify({
                        type: 'success',
                        group: 'foo',
                        title: 'Success!',
                        text: 'Successfully Updated!'
                    })

                    await this.fetchData()

                }

                this.disabled = false

            }
        },
        async fetchData() {
            this.events = []
            const data = await this.$axios.get('api/authorized/schedule-doctor-get', {
                params: {
                    user_id: this.user.id,
                    end: this.$refs.calendar.lastEnd.date,
                    start: this.$refs.calendar.lastStart.date,
                }
            })

            if (data?.data?.data) {
                data.data.data.forEach(element => {
                    element.timed = true
                    if (moment(element.start).format('HH:mm') == '00:00')
                        element.start = moment(element.start).format('YYYY-MM-DD')
                    if(element.start == element.end)
                        delete element.end
                    this.events.push(element)
                })
            }

        },
        viewDay ({ date }) {
            this.focus = date
            this.type = 'day'
        },
        showDialog(event) {
            
            this.action = 'Update'
            this.form.name = event.event.name
            this.form.start_date = moment(event.event.start).format('yyyy-MM-DD')
            this.form.start_time = moment(event.event.start).format('HH:mm')

            if (event.event.id)
                this.form.id = event.event.id

            if (event.event?.end) {
                this.form.end_date = moment(event.event.end).format('yyyy-MM-DD')
                this.form.end_time = moment(event.event.end).format('HH:mm')
            }

            this.dialog = true
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
        getCurrentTime () {
            return this.cal ? this.cal.times.now.hour * 60 + this.cal.times.now.minute : 0
        },
        scrollToTime () {
            const time = this.getCurrentTime()
            const first = Math.max(0, time - (time % 30) - 30)

            this.cal.scrollToTime(first)
        },
        updateTime () {
            setInterval(() => this.cal.updateTimes(), 60 * 1000)
        },
        startDrag ({ event, timed }) {
            if (event && timed) {
            this.dragEvent = event
            this.dragTime = null
            this.extendOriginal = null
            }
        },
        async startTime (tms) {
            try {
                const mouse = this.toTime(tms)

                if (this.dragEvent && this.dragTime === null) {
                const start = this.dragEvent.start

                this.dragTime = mouse - start
                } else {

                this.createStart = this.roundTime(mouse)

                const date = moment(this.createStart).format("YYYY-MM-DD HH:mm")

                this.createEvent = {
                    id: this.events.length,
                    name: `Event #${this.events.length}`,
                    color: this.rndElement(this.colors),
                    start: date,
                    end: date,
                    user_id: this.user.id,
                    timed: true,
                }

                this.events.push(this.createEvent)

                await this.$axios.post('api/authorized/schedule-doctor-create', this.createEvent)

                }
            } catch (err) {

            }
            
        },
        extendBottom (event) {
            this.createEvent = event
            this.createStart = event.start
            this.extendOriginal = event.end
        },
        mouseMove (tms) {
            const mouse = this.toTime(tms)

            if (this.dragEvent && this.dragTime !== null) {
            const start = this.dragEvent.start
            const end = this.dragEvent.end
            const duration = end - start
            const newStartTime = mouse - this.dragTime
            const newStart = this.roundTime(newStartTime)
            const newEnd = newStart + duration

            this.dragEvent.start = newStart
            this.dragEvent.end = newEnd
            } else if (this.createEvent && this.createStart !== null) {
            const mouseRounded = this.roundTime(mouse, false)
            const min = Math.min(mouseRounded, this.createStart)
            const max = Math.max(mouseRounded, this.createStart)

            this.createEvent.start = min
            this.createEvent.end = max
            }
        },
        endDrag () {
            this.dragTime = null
            this.dragEvent = null
            this.createEvent = null
            this.createStart = null
            this.extendOriginal = null
        },
        cancelDrag () {
            if (this.createEvent) {
            if (this.extendOriginal) {
                this.createEvent.end = this.extendOriginal
            } else {
                const i = this.events.indexOf(this.createEvent)
                if (i !== -1) {
                this.events.splice(i, 1)
                }
            }
            }

            this.createEvent = null
            this.createStart = null
            this.dragTime = null
            this.dragEvent = null
        },
        roundTime (time, down = true) {
            const roundTo = 15 // minutes
            const roundDownTime = roundTo * 60 * 1000

            return down
            ? time - time % roundDownTime
            : time + (roundDownTime - (time % roundDownTime))
        },
        toTime (tms) {
            return new Date(tms.year, tms.month - 1, tms.day, tms.hour, tms.minute).getTime()
        },
        convertToTime (tms) {
            return new Date(parseInt(moment(tms).format('YYYY')), parseInt(moment(tms).format('MM')), parseInt(moment(tms).format('DD')) , parseInt(moment(tms).format('HH')), parseInt(moment(tms).format('mm'))).getTime()
        },
        getEventColor (event) {
            const rgb = parseInt(event.color.substring(1), 16)
            const r = (rgb >> 16) & 0xFF
            const g = (rgb >> 8) & 0xFF
            const b = (rgb >> 0) & 0xFF

            return event === this.dragEvent
            ? `rgba(${r}, ${g}, ${b}, 0.7)`
            : event === this.createEvent
                ? `rgba(${r}, ${g}, ${b}, 0.7)`
                : event.color
        },
        getEvents ({ start, end }) {
            console.log(start)
        },
        rnd (a, b) {
            return Math.floor((b - a + 1) * Math.random()) + a
        },
        rndElement (arr) {
            return arr[this.rnd(0, arr.length - 1)]
        },
    }

}
</script>
<style lang="scss" scoped>
    .v-current-time {
        height: 2px;
        background-color: #ea4335;
        position: absolute;
        left: -1px;
        right: 0;
        pointer-events: none;

        &.first::before {
            content: '';
            position: absolute;
            background-color: #ea4335;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            margin-top: -5px;
            margin-left: -6.5px;
        }
    }
    .v-event-draggable {
        padding-left: 6px;
    }

    .v-event-timed {
        user-select: none;
        -webkit-user-select: none;
    }

    .v-event-drag-bottom {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 4px;
        height: 4px;
        cursor: ns-resize;

        &::after {
            display: none;
            position: absolute;
            left: 50%;
            height: 4px;
            border-top: 1px solid white;
            border-bottom: 1px solid white;
            width: 16px;
            margin-left: -8px;
            opacity: 0.8;
            content: '';
        }

        &:hover::after {
            display: block;
        }
    }
</style>