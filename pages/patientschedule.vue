<template>
 <v-card flat>
   
    <v-app-bar
      absolute
      color="#01579B"
      dark
      scroll-target="#scrolling-techniques-6"
    >
      <v-app-bar-nav-icon href="/patientservices"> <v-icon color="white">mdi-arrow-left</v-icon> </v-app-bar-nav-icon>
   <v-spacer> </v-spacer>   
      <v-toolbar-title  
          text
              color="#01579B"
              dark
              dense>
              Schedule for Online Checkup
      </v-toolbar-title>
        <v-spacer> </v-spacer> 
        </v-app-bar>
  
     <br>
     <br>
        <br>
        <v-card-text>
                <v-select :items="specialization" item-value="id" item-text="name" label="Category">
                </v-select>
            </v-card-text>

            <v-card-text>
                <v-select :items="doctors" item-value="id" item-text="name" label="Select Doctor">
                </v-select>
            </v-card-text>

            <v-card-text>
                <v-card flat class="primary lighten-5">
                    <v-card-title>
                        Doctor Information
                    </v-card-title>
                    <v-card-text >
                        <v-row class="px-4">
                            <v-col cols="12">
                                <div>
                                    Name:
                                </div>
                            </v-col>
                            <v-col cols="12">
                                <div>
                                    Gender:
                                </div>
                            </v-col>
                            <v-col cols="12">
                                <div>
                                    Degree Level:
                                </div>
                            </v-col>
                            <v-col cols="12">
                                <div>
                                    Specialization:
                                </div>
                            </v-col>
                            <v-col cols="12">
                                <div>
                                    Email:
                                </div>
                            </v-col>
                            <v-col cols="12">
                                <div>
                                    Medical Clinic Name:
                                </div>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-card-text>

            <v-card-text>
                <v-card flat class="primary lighten-5">
                    <v-card-title>
                        Doctor Schedule This Week
                    </v-card-title>
                    <v-card-text class="d-flex">
                        <v-card flat class="blue mx-2" width="150px">
                            <v-card-text class="white--text">
                                <div class="text-center">
                                    July 20, 2021
                                </div>
                            </v-card-text>
                        </v-card>
                        <v-card flat class="blue mx-2" width="150px">
                            <v-card-text class="white--text">
                                <div class="text-center">
                                    July 21, 2021
                                </div>
                            </v-card-text>
                        </v-card>
                        <v-card flat class="blue mx-2" width="150px">
                            <v-card-text class="white--text">
                                <div class="text-center">
                                    July 22, 2021
                                </div>
                            </v-card-text>
                        </v-card>
                        <v-card flat class="blue mx-2" width="150px">
                            <v-card-text class="white--text">
                                <div class="text-center">
                                    July 23, 2021
                                </div>
                            </v-card-text>
                        </v-card>
                        <v-card flat class="purple mx-2" width="150px">
                            <v-card-text class="white--text">
                                <div class="text-center">
                                    July 24, 2021
                                </div>
                                <div class="text-center">Selected</div>
                            </v-card-text>
                        </v-card>
                        <v-card flat class="grey mx-2" width="150px">
                            <v-card-text class="white--text">
                                <div class="text-center">
                                    July 25, 2021
                                </div>
                                <div class="text-center">Scheduled</div>
                            </v-card-text>
                        </v-card>
                        <v-card flat class="blue mx-2" width="150px">
                            <v-card-text class="white--text">
                                <div class="text-center">
                                    July 26, 2021
                                </div>
                            </v-card-text>
                        </v-card>
                    </v-card-text>
                </v-card>
            </v-card-text>

            <v-card-text>
                <v-card flat class="primary lighten-5">
                    <v-card-title>
                        Time
                    </v-card-title>
                    <v-card-text class="d-flex">
                        <v-card flat class="blue mx-2" width="150px">
                            <v-card-text class="white--text">
                                <div class="text-center">
                                    7:00 am - 9:00 am
                                </div>
                            </v-card-text>
                        </v-card>
                        <v-card flat class="blue mx-2" width="150px">
                            <v-card-text class="white--text">
                                <div class="text-center">
                                    9:00 am - 11:00 am
                                </div>
                            </v-card-text>
                        </v-card>
                        <v-card flat class="purple mx-2" width="150px">
                            <v-card-text class="white--text">
                                <div class="text-center">
                                    1:00 pm - 3:00 pm
                                </div>
                                <div class="text-center">Selected</div>
                            </v-card-text>
                        </v-card>
                        <v-card flat class="grey mx-2" width="150px">
                            <v-card-text class="white--text">
                                <div class="text-center">
                                    3:00 pm - 5:00 pm
                                </div>
                                <div class="text-center">Scheduled</div>
                            </v-card-text>
                        </v-card>
                    </v-card-text>
                </v-card>
            </v-card-text>

            <v-card-text>
                <v-card flat class="primary lighten-5">
                    <v-card-title>
                        Patient Information
                    </v-card-title>
                    <v-card-text class="px-7">
                        <v-row>
                            <v-col cols="6">
                                <v-text-field label="Name">

                                </v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field type="date" label="Birthday">

                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6">
                                <v-text-field label="Address">

                                </v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field label="Weight">

                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6">
                                <v-text-field label="Height">

                                </v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-textarea label="Diagnosis">

                                </v-textarea>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-card-text>

            <v-card-actions class="px-4">
                <v-spacer></v-spacer>
                <v-btn class="primary">Submit</v-btn>
            </v-card-actions>

        </v-card>
   
</template>
<script>

export default {
    data() {
        return {
            doctors: [
                {name: 'leonhail', id: 1},
                {name: 'test', id: 2},
                {name: 'man', id: 3}
            ],
            specialization: [
                {name: 'Anesthesiologists', id: 1},
                {name: 'Dermatologists', id: 2},
                {name: 'Internists', id: 3},
                {name: 'gynecologists', id: 4},
                {name: 'Ophthalmologists', id: 5},
                {name: 'Pediatricians', id: 6},
                {name: 'Physicians', id: 7},
                {name: 'Psychiatrists', id: 8},
                {name: 'Surgeons', id: 9}
            ]
        }
    },
}
</script>
