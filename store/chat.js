export const state = () => ({
    doctor: '',
    patient: '',
})

export const mutations = {
    setDoctor(state, data) {
        state.doctor = data
    },
    setPatient(state, data) {
        state.patient = data
    }
}