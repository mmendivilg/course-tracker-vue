import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import axios from './services/axios-auth'
import vuetify from './plugins/vuetify';
import * as VeeValidate from 'vee-validate';
import VueFileAgent from 'vue-file-agent';
import { i18n } from './i18n'
import validationMessagesEs from 'vee-validate/dist/locale/es'
import validationMessagesEn from 'vee-validate/dist/locale/en'
import "./vee-validate";
import moment from 'moment'

// var Rollbar = require('vue-rollbar');
Vue.use(VeeValidate, {
  i18nRootKey: 'messages', // customize the root path for validation messages.
  i18n,
  dictionary: {
   es: validationMessagesEs,
   en: validationMessagesEn,
  }
});
moment.locale('es-mx')
Vue.prototype.$moment = moment

Vue.use(VueFileAgent);
// Vue.use(Rollbar, {
//   accessToken: 'c95eea863f884766827316ccd2ced6bc',
//   captureUncaught: true,
//   captureUnhandledRejections: true,
//   enabled: true,
//   source_map_enabled: true,
//   environment: 'production',
//   payload: {
//     client: {
//          javascript: {
//             code_version: '1.0'
//          }
//     }
//   }
// });

Vue.prototype.$axios = axios;
axios.defaults.headers.common['Language'] = i18n.locale

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')

