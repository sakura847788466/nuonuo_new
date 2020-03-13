/*
* 直接更新state的多个方法的对象
* */

import {
  LOGIN, REGISTER,
} from './mutations-type'
import localStorage from '../util/localStorage'

export default {
  [REGISTER](state,{user}){
    localStorage.set('user', JSON.stringify(user))
    state.isUser = true
    state.user = user
  },
  [LOGIN](state, {user}) {
    localStorage.set('user', JSON.stringify(user))
    state.isUser = true
    state.user = user
  },
  LOGIN_OUT(state) {
    localStorage.clear()
    state.isUser = false
    state.user = {}
  },
  IS_LOGIN(state) {
    const user = localStorage.get('user')
    if (user) {
      state.user = JSON.parse(user)
      state.isUser = true
    } else {
      state.isUser = false
    }
  },
  SET_ORDERINFO(state, data) {
    if (data.type === 'order') {
      state.orderInfo.order = data.order
    } else {
      state.orderInfo.number = data.number
    }
  }
}
