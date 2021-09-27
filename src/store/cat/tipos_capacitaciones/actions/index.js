import axios from '../../../../services/axios-auth'
import {Action, Mutation} from '../types'

export default {
  [Action.TIPOS_CAPACITACIONES]({commit}) {
    return new Promise((resolve) => {
      axios.get('/cat_tipos_capacitaciones')
      .then(resp => {
        commit(`${[Mutation.TIPOS_CAPACITACIONES]}`, resp.data)
        resolve(resp)
      })
      .catch(err => {
        console.log(err)
        // reject(err)
      })
    })
  }
}
