export default {
    data() {
    return {
        slug: this.$route.name,
        categories: [
            { slug: 'patientlogin', name: 'MEENC - Patient Login', color: 'rgb(66, 153, 225)' },
            { slug: 'patientservices', name: 'MEENC - Patient Services', color: 'rgb(66, 153, 225)' },
            { slug: 'patientaccount', name: 'MEENC - Patient Account', color: 'rgb(236, 201, 75)' },
            { slug: 'patienthome', name: 'MEENC - Patient Home', color: 'rgb(237, 137, 54)' },
            { slug: 'patientdoctors', name: 'MEENC - List of Doctors', color: 'rgb(237, 137, 54)' },
            { slug: 'patientschedule', name: 'MEENC - Patient Schedule', color: 'rgb(237, 137, 54)' },
            { slug: 'patientschedulefacetoface', name: 'MEENC - Face to Face Schedule', color: 'rgb(237, 137, 54)' },
            { slug: 'patientmedicalconcern', name: 'MEENC - Medical Concerns', color: 'rgb(237, 137, 54)' },
            { slug: 'patientprescription', name: 'MEENC - Doctor Prescriptions', color: 'rgb(237, 137, 54)' },
            { slug: 'patientsummaryappointments', name: 'MEENC - Patient Appointments', color: 'rgb(237, 137, 54)' },
            { slug: 'patientsummaryappointmentsfacetoface', name: 'MEENC - Face to Face Appointments', color: 'rgb(237, 137, 54)' },

            { slug: 'doctorhome', name: 'MEENC - Doctor Home', color: 'rgb(237, 137, 54)' },
            { slug: 'doctoraccount', name: 'MEENC - Doctor Account', color: 'rgb(237, 137, 54)' },
            { slug: 'doctorservices', name: 'MEENC - Doctor Services', color: 'rgb(237, 137, 54)' },
            { slug: 'doctorviewcpatientconcern', name: 'MEENC - Patient Concern', color: 'rgb(237, 137, 54)' },
            { slug: 'doctorviewcpatientconcernfacetoface', name: 'MEENC - Face to Face Concern', color: 'rgb(237, 137, 54)' },
            { slug: 'doctorviewpaymentbills', name: 'MEENC - Payment Bills', color: 'rgb(237, 137, 54)' },
            { slug: 'doctormedicalconcern', name: 'MEENC - Medical Concern', color: 'rgb(237, 137, 54)' },
            { slug: 'doctorcreateprescription', name: 'MEENC - Prescription', color: 'rgb(237, 137, 54)' },
            { slug: 'doctorschedule', name: 'MEENC - Schedule', color: 'rgb(237, 137, 54)' },
            { slug: 'doctoreFtoFSchedule', name: 'MEENC - Face to Face Schedule', color: 'rgb(237, 137, 54)' },
        ]
    }
    },
    
    computed: {
        category() {
            return this.categories.find(c => c.slug === this.slug) || {}
        }
    },
    
    head() {
        return {
            title: this.category.name,
        }
    }
}