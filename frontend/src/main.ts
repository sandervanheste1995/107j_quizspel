import mutations from '@/store/mutations';
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import '@/assets/buefy.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGlassCheers, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.config.productionTip = false

library.add(faGlassCheers, faCheckCircle, faTimesCircle)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(Buefy, {
  defaultIconComponent: 'font-awesome-icon',
  defaultIconPack: 'fas',
})

new Vue({
  router,
  store,
  beforeCreate() { this.$store.commit(mutations.loadUser) },
  render: h => h(App)
}).$mount('#app')
