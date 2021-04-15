import Vue from 'vue'
import App from './App.vue'
import '@/index.css'
import Unicon from 'vue-unicons'
import { uniPlay, uniPen, uniSquareShape, uniTrash, uniTrashAlt, uniRedo, uniPlus, uniBars, uniSlidersV, uniShoppingCart, uniDirection, uniCreditCard, uniChart, uniServer, uniUsersAlt, uniCopy, uniFileUpload, uniFileDownload, uniEye, uniCloudDownload, uniDashboard } from 'vue-unicons/src/icons'
import VCalendar from 'v-calendar'
import VueResource from 'vue-resource'
import Notifications from 'vue-notification'
Unicon.add([uniPlay, uniPen, uniSquareShape, uniTrash, uniTrashAlt, uniRedo, uniPlus, uniBars, uniSlidersV, uniShoppingCart, uniDirection, uniCreditCard, uniChart, uniServer, uniUsersAlt, uniCopy, uniFileUpload, uniFileDownload, uniEye, uniCloudDownload, uniDashboard ])
Vue.use(Unicon)
Vue.use(Notifications)
Vue.use(VCalendar, {});

Vue.use(VueResource);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
