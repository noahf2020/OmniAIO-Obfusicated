import Vue from 'vue'
import App from './App.vue'
import '@/index.css'
import Unicon from 'vue-unicons'
import { uniPlay, uniPen, uniSquareShape, uniTrash, uniTrashAlt, uniRedo, uniPlus, uniBars, uniSlidersV, uniShoppingCart, uniDirection, uniCreditCard, uniChart, uniServer, uniUsersAlt, uniCopy, uniFileUpload, uniFileDownload, uniMultiply } from 'vue-unicons/src/icons'
import VCalendar from 'v-calendar'
import VueResource from 'vue-resource'
import VueCardFormat from 'vue-credit-card-validation'
import VueSimpleAlert from "vue-simple-alert"

Unicon.add([uniPlay, uniPen, uniSquareShape, uniTrash, uniTrashAlt, uniRedo, uniPlus, uniBars, uniSlidersV, uniShoppingCart, uniDirection, uniCreditCard, uniChart, uniServer, uniUsersAlt, uniCopy, uniFileUpload, uniFileDownload, uniMultiply ]);
Vue.use(Unicon);

Vue.use(VueCardFormat);

Vue.use(VCalendar, {});

Vue.use(VueResource);
Vue.use(VueSimpleAlert);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app')
