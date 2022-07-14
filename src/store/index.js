import { createStore } from 'vuex'

export default createStore({
  state: {
    tracks: []
  },
  mutations: {
    updateStateValue(state, { key, value }){
      state[key] = value
    }
  },
  actions: {
  },
  modules: {
  }
})
