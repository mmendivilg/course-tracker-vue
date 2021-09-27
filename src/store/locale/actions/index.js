import {Action, Mutation} from '../types'
import { i18n } from '../../../i18n'
import axios from '../../../services/axios-auth'
// import moment from 'moment'

export default {
  [Action.LOCALE]({commit}, locale) {
    i18n.locale = locale
    // var moment_locale = ''
    // if(locale == 'es'){
    //   moment_locale = 'es-mx'
    // }
    // if(locale == 'en'){
    //   moment_locale = 'en-us'
    // }
    // moment.locale(moment_locale)
    axios.defaults.headers.common['Language'] = locale
    commit(`${[Mutation.LOCALE]}`, locale)
  },
}