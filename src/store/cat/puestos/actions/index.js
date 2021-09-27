import axios from '../../../../services/axios-auth'
import {Action, Mutation} from '../types'

export default {
  [Action.PUESTOS]({commit}) {
    return new Promise((resolve) => {
      axios.get('/cat_puestos')
      .then(resp => {
        commit(`${[Mutation.PUESTOS]}`, resp.data)
        resolve(resp)
      })
      .catch(err => {
        console.log(err)
        // reject(err)
      })
    })
  },
  [Action.PUESTOS_TAG]({commit}, puesto) {
    commit(`${[Mutation.PUESTOS_TAG]}`, puesto)
  }
}
