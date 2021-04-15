import Vue from 'vue'
import App from './App.vue'
import '@/index.css'
import Unicon from 'vue-unicons'
import { uniPlay, uniPen, uniSquareShape, uniTrash, uniTrashAlt, uniRedo, uniPlus, uniBars, uniSlidersV, uniShoppingCart, uniDirection, uniCreditCard, uniChart, uniServer, uniUsersAlt, uniMultiply, uniCopy, uniSave } from 'vue-unicons/src/icons'
import VCalendar from 'v-calendar'
import VueResource from 'vue-resource'
import VueSimpleAlert from "vue-simple-alert"

Unicon.add([uniPlay, uniPen, uniSquareShape, uniTrash, uniTrashAlt, uniRedo, uniPlus, uniBars, uniSlidersV, uniShoppingCart, uniDirection, uniCreditCard, uniChart, uniServer, uniUsersAlt, uniMultiply, uniCopy, uniSave])
Vue.use(Unicon)

Vue.use(VCalendar, {});

Vue.use(VueResource);
Vue.use(VueSimpleAlert);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
