/*
*
* vuex最核心的管理对象store
* */


import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'


Vue.use(Vuex)
const state = {
  isUser: false,
  user: {},
  orderInfo: {
    order: {},
    number: ''
  },
  Menu: {
    type: '',
    isActive: false

  }

};


export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
