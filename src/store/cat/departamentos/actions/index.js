import axios from '../../../../services/axios-auth'
import {Action, Mutation} from '../types'

export default {
  [Action.DEPARTAMENTOS]({commit}) {
    return new Promise((resolve) => {
      axios.get('/cat_departamentos')
      .then(resp => {
        commit(`${[Mutation.DEPARTAMENTOS]}`, resp.data)
        resolve(resp)
      })
      .catch(err => {
        console.log(err)
        // reject(err)
      })
    })
  },
  [Action.DEPARTAMENTOS_TAG]({commit}, departamento) {
    commit(`${[Mutation.DEPARTAMENTOS_TAG]}`, departamento)
  }
}
