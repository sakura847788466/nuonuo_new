import ajax from './ajax'

const URL = window.NUONUOU.URL
export const WS = window.NUONUOU.WS
export const printPreview = (data) => ajax(URL + '/v1.1/printPreview?dsAppid=dsappid&dsToken=dstoken', data, 'POST')//提交打印
export const eInvoicePrint = (data) => ajax(URL + '/v1.1/eInvoicePrint?dsAppid=dsappid&dsToken=dstoken', data, 'POST')//预览
export const requestBilling = (order) => ajax(URL + '/v1.1/app/requestBilling', { order }, 'POST')//生成发票
export const getAuthorizeAddress = () => ajax(URL + 'v1.1/app/authorize')//获取授权跳转地址











