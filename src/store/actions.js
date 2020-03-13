/*
* 通过mutation间接更新state的多个方法的对象
* */

import {LOGIN, REGISTER} from './mutations-type'

import {register, login} from "../api/login";

export default {
  goToLogin({commit}, data) {
    return new Promise(async (resolve, reject) => {
      const user = await login(data)
      if (user.code === 0) {
        commit(LOGIN, {user})
        resolve({code: 0, data: '登录成功'})
      } else {
        reject({code: 400, data: '登录失败'})
      }
    })
  },
  goToRegister({commit}, data) {
    return new Promise(async (resolve, reject) => {
      const user = await register(data)
      if (user.code === 0) {
        commit(REGISTER, {user})
        resolve({code: 0, data: '注册成功'})
      } else {
        reject({code: 400, data: user.data})
      }
    })

  }


}
