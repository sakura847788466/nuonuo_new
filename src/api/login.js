import ajax from './ajax'

const URL = window.NUONUOU.LOGIN_URL
const CODE_URL = window.NUONUOU.CODE_URL

export const register = (data) => ajax(URL + '/user/userRegister', data, 'POST')//注册
export const login = (data) => ajax(URL + '/user/userLogin', data, 'POST')//登录

export const getSendSMS = (data) => ajax(CODE_URL+'/v2.0/account/sendSMS',data,'POST')//验证码
export const checkSendSMS = (data) => ajax(CODE_URL+'/CheckMobile',data,'POST')//校验验证码