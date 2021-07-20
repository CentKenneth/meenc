<template>
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
            </v-toolbar>

            
            
            <v-calendar
                ref="calendar"
                v-model="focus"
                :type="type"
                :events="events"
                color="primary"
                :event-ripple="false"
                @mousedown:event="startDrag"
                @mousedown:time="startTime"
                @mousemove:time="mouseMove"
                @click:date="startTime"
                @click:more="viewDay"
                @change="getEvents"
                @click:event="showDialog"
                @mouseup:time="endDrag"
                @mouseleave.native="cancelDrag"
            >
                <template v-slot:day-body="{ date, week }">
                    <div
                        class="v-current-time"
                        :class="{ first: date === week[0].date }"
                        :style="{ top: nowY }"
                    ></div>
                </template>

                <template v-slot:event="{ event, timed, eventSummary }">
                    <div
                        class="v-event-draggable"
                        v-html="eventSummary()"
                    ></div>
                    <div
                        v-if="timed"
                        class="v-event-drag-bottom"
                        @mousedown.stop="extendBottom(event)"
                    ></div>
                </template>

            </v-calendar>

        </v-sheet>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" persistent width="500">
        <v-card flat>
            <v-card-title>
                Event
            </v-card-title>
            <v-card-text class="py-0 my-0 pt-4">
                <v-text-field outlined label="Name" v-model="event_name">

                </v-text-field>
            </v-card-text>
            <v-card-actions class="px-6 pb-4">
                <v-spacer></v-spacer>
                <v-btn class="justify-center white--text" color="grey darken-2" @click="dialog = false">
                    Cancel
                </v-btn>
                <v-btn class="justify-center" color="primary" @click="dialog = false">
                    Update
                </v-btn>
                <v-btn class="justify-center white--text" color="red" @click="dialog = false">
                    Delete
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import moment from 'moment'
import { mapState } from 'vuex'
export default {
    name: "Schedule",
    data() {
        return {
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
        async fetchData() {
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
                    if(element.start == element.end)
                        delete element.end
                    this.events.push(element)
                })
            }

            console.log(this.events)

        },
        viewDay ({ date }) {
            this.focus = date
            this.type = 'day'
        },
        showDialog(event) {
            console.log(event)
            this.event_name = event.event.name
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
                console.log(this.dragTime)
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