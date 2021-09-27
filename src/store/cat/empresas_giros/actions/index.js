import axios from '../../../../services/axios-auth'
import {Action, Mutation} from '../types'

export default {
  [Action.EMPRESAS_GIROS]({commit}) {
    return new Promise((resolve) => {
      axios.get('/cat_empresas_giros')
      .then(resp => {
        commit(`${[Mutation.EMPRESAS_GIROS]}`, resp.data)
        resolve(resp)
      })
      .catch(err => {
        console.log(err)
        // reject(err)
      })
    })
  }
}
