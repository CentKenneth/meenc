<template>
    <div>
        <v-card flat class="pa-6">
            <v-card-text class="d-flex px-0">
                <v-spacer></v-spacer>
                <v-btn @click="addDoctors" depressed class="primary" large>
                    <v-icon color="white">mdi-plus</v-icon>
                    Add Patient
                </v-btn>
            </v-card-text>
            <v-data-table
                :headers="headers"
                :items="patients"
                class="elevation-1">
                <template v-slot:item.actions="{ item }">
                
                <v-icon
                    @click="edit(item)"
                    color="blue"
                >
                    mdi-pencil
                </v-icon>

                </template>
            </v-data-table>
    
        </v-card>

        <v-dialog 
            v-model="dialog"
            persistent 
            max-width="700">
            <v-card :disabled="disabled" flat>

                <v-progress-linear
                    v-if="disabled"
                    indeterminate
                    color="primary">
                </v-progress-linear>

                <v-card-title class="px-8 pt-4">
                    {{action}} Record
                </v-card-title>

                <v-card-text class="px-8 py-4">
                    <v-form
                        ref="form"
                        v-model="valid"
                        lazy-validation>

                        <v-row v-if="Object.keys(filterField(form)).length > 0">
                            <v-col
                                v-for="key in Object.keys(filterField(form))"
                                :key="key"
                                class="d-flex"
                                cols="12"
                                sm="6" >

                                <v-text-field
                                    v-if="key == 'password' || key == 'password_confirmation'"
                                    :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                                    :rules="passwordRules"
                                    v-model="form[key]"
                                    :type="showPass ? 'text' : 'password'"
                                    name="input-10-2"
                                    :label="label[key]"
                                    hint="At least 8 characters"
                                    class="input-group--focused"
                                    @click:append="showPass = !showPass"
                                    :prepend-icon="icon[key]">
                                </v-text-field>

                                <v-dialog
                                    v-else-if="key == 'bday'"
                                    ref="dialog"
                                    v-model="bdayModal"
                                    :rules="fieldRules"
                                    persistent
                                    width="290px"
                                    >
                                    <template v-slot:activator="{ on, attrs }">

                                        <v-text-field
                                            v-model="date"
                                            :label="label[key]"
                                            :prepend-icon="icon[key]"
                                            readonly
                                            v-bind="attrs"
                                            v-on="on">
                                        </v-text-field>

                                    </template>
                                    <v-date-picker
                                        v-model="date"
                                        scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        text
                                        color="primary"
                                        @click="bdayModal = false">
                                        Cancel
                                    </v-btn>
                                    <v-btn
                                        text
                                        color="primary"
                                        @click="form[key] = date, bdayModal = false">
                                        OK
                                    </v-btn>
                                    </v-date-picker>
                                </v-dialog>

                                <v-select
                                    v-else-if="isSelect(key)"
                                    v-model="form[key]"
                                    :rules="fieldRules"
                                    :items="getItems(key)"
                                    :label="label[key]"
                                    :prepend-icon="icon[key]"
                                ></v-select>

                                <v-text-field
                                    v-else
                                    v-model="form[key]"
                                    :rules="key == 'email' ? emailRules : fieldRules"
                                    :prepend-icon="icon[key]"
                                    :label="label[key]">
                                </v-text-field>

                            </v-col>
                        </v-row>

                    </v-form>
                </v-card-text>

                <v-card-actions class="px-8 pb-8">
                    <v-btn large depressed @click="closeModal">Close</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn class="primary" depressed large @click="saveForm">{{action == 'Add' ? 'Save' : 'Update'}}</v-btn>
                </v-card-actions>

            </v-card>
        </v-dialog>
        <notifications group="foo" />
    </div>
</template>
<script>
import moment from 'moment'

export default {
    layout: 'admin',
    data() {
        return {
            updatedId: null,
            showPass: false,
            bdayModal: false,
            disabled: false,
            valid: true,
            date: '',
            form: {
                'firstname': '',
                'lastname': '',
                'height': '',
                'weight': '',
                'gender': '',
                'email': '',
                'street_address': '',
                'city': '',
                'password': '',
                'password_confirmation': '',
                'role': 'patient',
                'zip': '',
                'country': ''
            },
            label: {
                'firstname': 'First Name',
                'lastname': 'Last Name',
                'height': 'Height',
                'weight': 'weight',
                'gender': 'Gender',
                'email': 'Email',
                'street_address': 'Street Address',
                'city': 'City',
                'role': 'patient',
                'zip': 'Zip Code',
                'country': 'Country',
                'password': 'Password',
                'password_confirmation': 'Confirm Password',
            },
            icon: {
                'firstname': 'mdi-account-details',
                'lastname': 'mdi-account-details',
                'height': 'mdi-human-male-height',
                'weight': 'mdi-weight-kilogram',
                'gender': 'mdi-gender-male-female',
                'street_address': 'mdi-google-street-view',
                'city': 'mdi-city-variant-outline',
                'zip': 'mdi-city-variant-outline',
                'country': 'mdi-city-variant-outline',
                'email': 'mdi-email',
                'password': 'mdi-form-textbox-password',
                'password_confirmation': 'mdi-form-textbox-password',
            },
            dialog: false,
            action: 'Add',
            patients: [],
            headers: [
                {
                    text: 'Patient Name',
                    align: 'start',
                    sortable: false,
                    value: 'name',
                },
                { text: 'Email', value: 'email' },
                { text: 'Action', value: 'actions', sortable: false },
            ],

            emailRules: [
                v => !!v || "E-mail is required",
                v => /.+@.+/.test(v) || "E-mail must be valid"
            ],

            fieldRules: [
                v => !!v || "this field is required",
            ],

            passwordRules: [
                v => !!v || "Password is required",
                v => {
                    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#.,)(_\$%\^&\*])(?=.{8,})/;
                    return (
                        pattern.test(v) ||
                        "Min. 8 characters with at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"
                    );
                }
            ],
            items: {
                'gender': ['Male', 'Female', 'Custom'],
            }
        }  
    },
    async mounted() {
        await this.initialize()
    },
    methods: {
        async initialize () {
            try {

            // api request
            const patients = await this.$axios.get(`api/authorized/get-patients`)

            // filter doctor email
            if (patients?.data) {
                this.patients = []
                patients.data.forEach(el => {
                    // push data to array
                    this.patients.push({
                        "id": el.id,
                        "name": el.name,
                        "firstname": el.firstname,
                        "lastname": el.lastname,
                        "height": el.height,
                        "weight": el.weight,
                        "gender": el.gender,
                        "street_address": el.street_address,
                        "city": el.city,
                        "zip": el.zip,
                        "country": el.country,
                        "temppass": el.temppass,
                        "email": el.email,
                        "created": moment(el.created_at).format("MMMM DD, YYYY"),
                    })
                })
            }

            } catch (err) {
                console.log(err)
            }
        },
        edit(item) {

            if(item) {

                Object.keys(this.form).forEach(f => {
                    this.form[f] = item[f]
                })

                this.form['password'] = item['temppass']
                this.form['password_confirmation'] = item['temppass']
                this.updatedId = item.id

                this.dialog = true
                this.action = 'Update'
            }

        },
        addDoctors() {
            this.dialog = true
        },
        isSelect(key) {
            let select = [
                'gender'
            ]

            if(select.includes(key)) {
                return true
            }

            return false
        },
        getItems(key) {
            let items = []

            if(this.items[key]) {
                return this.items[key]
            }

            return items
        },
        closeModal() {
            this.form = {
                'firstname': '',
                'lastname': '',
                'height': '',
                'weight': '',
                'gender': '',
                'email': '',
                'street_address': '',
                'city': '',
                'password': '',
                'password_confirmation': '',
                'role': 'patient',
                'zip': '',
                'country': ''
            }

            this.dialog = false
            this.action = 'Add'
            this.updatedId = null
        },
        filterField(form) {
            let newForm = {}

            Object.keys(form).forEach(f => {
                if(f != 'role')
                    newForm[f] = form[f]
            })

            return newForm
        },
        async saveForm() {
            try {

                this.disabled = true

                const valid = this.$refs.form.validate()

                if(valid) {

                    if(this.action == 'Add') {

                        this.form['temppass'] = this.form['password']

                        const res = await this.$axios.post('api/authorized/create-user', this.form)

                        if (res.status === 201) {

                            this.$notify({
                                type: 'success',
                                group: 'foo',
                                title: 'Success!',
                                text: 'Successfully Created'
                            })

                            await this.initialize()
                            this.closeModal()

                        }

                    } else {
                        const payload = new FormData()

                        payload.append('id', this.updatedId)
                        payload.append('firstname', this.form.firstname)
                        payload.append('lastname', this.form.lastname)
                        payload.append('height', this.form.height)
                        payload.append('weight', this.form.weight)
                        payload.append('gender', this.form.gender)
                        payload.append('street_address', this.form.street_address)
                        payload.append('email', this.form.email)
                        payload.append('city', this.form.city)
                        payload.append('zip', this.form.zip)
                        payload.append('country', this.form.country)
                        payload.append('password', this.form.password)
                        payload.append('password_confirmation', this.form.password)
                        payload.append('temppass', this.form.password)

                        const res = await this.$axios.post('api/authorized/update-users', payload)

                        if (res.status === 200) {

                            this.$notify({
                                type: 'success',
                                group: 'foo',
                                title: 'Success!',
                                text: 'Successfully Updated'
                            })

                            await this.initialize()
                            this.closeModal()

                        }

                    }

                }

                this.disabled = false

            } catch (err) {
                this.$notify({
                    type: 'erorr',
                    group: 'foo',
                    title: 'Error!',
                    text: err.message
                })

                this.disabled = false

            }
            
        }
    }
}
</script>
