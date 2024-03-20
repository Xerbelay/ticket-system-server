import { createStore } from 'vuex'
import { userState } from './userState'
import { ticketState } from './ticketState'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user: userState,
    ticket: ticketState
  }
})
