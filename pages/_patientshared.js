import { mapState } from 'vuex'
import moment from 'moment'

export default {
    data() {
        return {
            notificationsCounter: 0,
            notifications: [],
        }
    },
    computed: {
        ...mapState('auth', [
          'user'
        ]),
        counter() {
            return this.notificationsCounter
        }

      },
    async mounted() {
        await this.getNotifications()
    },
    methods: {
        async getNotifications() {
            const data = await this.$axios.post(`api/authorized/patient-chats-notifications`, {
                patient_id: this.user.id
            })

            if(data.status == 200) {
                data.data.data.forEach(notif => {
                    if(notif['is_view'] == 'No') this.notificationsCounter++
                })

                this.notifications = data.data.data
            }
        },
        convertDate(date) {
            return moment(date).format('MMMM DD, YYYY HH:mm A')
        },
        async updateNotifications() {
            const notifications = await this.$axios.post(`api/authorized/patient-chats-update-notifications`, {
                patient_id: this.user.id
            })

            if(notifications.status == 200) {
                this.notificationsCounter = 0
                await this.getNotifications()
            }
        }
    }
}