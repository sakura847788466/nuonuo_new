import Vue from 'vue'
import Router from 'vue-router'
const routerPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}
const Home = () => import('./views/Home/Home.vue')
// const Wx = () => import('./views/Wx/Wx.vue')
const FirstPage = () => import('./views/FirstPage/FirstPage.vue')
const Test = () => import('./views/Test/Test.vue')

Vue.use(Router)
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  }, {
    path: '/firstPage',
    name: 'firstPage',
    component: FirstPage
  }, {
    path: '/Test',
    name: 'Test',
    component: Test
  }

]

export default new Router({
  // mode: 'history',
  routes
})
