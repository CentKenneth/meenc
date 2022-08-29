<template>
    <div>
        <v-row class="pa-2">
            <v-col cols="12" md="4">
                <v-card
                    tile
                    height="100%"
                    class="mx-auto primary lighten-5 px-4 py-8 rounded-lg elevation-4">
                        <v-card-title class="justify-center grey--text" style="font-size: 30px;">
                            Doctors
                        </v-card-title>
                        <v-card-text class="text-center font-weight-bold py-3 primary--text" style="font-size: 50px;">
                            {{numDoctors}}
                        </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="4">
                <v-card
                    tile
                    height="100%"
                    class="mx-auto primary lighten-5 px-4 py-8 rounded-lg elevation-4">
                        <v-card-title class="justify-center grey--text" style="font-size: 30px;">
                            Patients
                        </v-card-title>
                        <v-card-text class="text-center font-weight-bold py-3 primary--text" style="font-size: 50px;">
                            {{numPatients}}
                        </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="4">
                <v-card
                    tile
                    height="100%"
                    class="mx-auto primary lighten-5 px-4 py-8 rounded-lg elevation-4">
                        <v-card-title class="justify-center grey--text" style="font-size: 30px;">
                            Transactions
                        </v-card-title>
                        <v-card-text class="text-center font-weight-bold py-3 primary--text" style="font-size: 50px;">
                            {{transactions}}
                        </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        
    </div>
</template>

<script>

export default {
    layout: 'admin',
    data() {
        return {
            numDoctors: 8,
            numPatients: 12,
            transactions: 14,
            lineData: {
                labels: ['test1'],
                datasets: [
                    {
                        label: 'Data One',
                        backgroundColor: 'blue',
                        data: [3,3],
                    },
                    {
                        label: 'Data Two',
                        backgroundColor: 'red',
                        data: [4,2],
                    },
                ],
            },
        }
    },

    async mounted() {
        await this.initialize()
    },

    methods: {
        async initialize() {

            const reports = await this.$axios.get(`api/authorized/get-reports`)
            console.log(reports.data)

            if(reports.status === 200) {

                this.numDoctors = reports.data.numDoctors
                this.transactions = reports.data.transactions
                this.numPatients = reports.data.numPatients

            }

        }
    }
}
</script>
