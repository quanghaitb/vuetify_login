import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueRouter from 'vue-router'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import './firebaseApp'
import firebase from 'firebase/app'
import VueConfirmDialog from 'vue-confirm-dialog'

let app = ''
Vue.use(VueRouter)
Vue.use(VueConfirmDialog)
Vue.config.productionTip = false
Vue.component('vue-confirm-dialog', VueConfirmDialog.default)

firebase.auth().onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  }
})
router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth && !currentUser) next('')
  else if (!requiresAuth && currentUser) next('dashboard')
  else next()
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
