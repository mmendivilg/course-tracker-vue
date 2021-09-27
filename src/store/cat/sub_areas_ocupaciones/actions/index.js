import axios from '../../../../services/axios-auth'
import {Action, Mutation} from '../types'

export default {
  [Action.SUB_AREAS_OCUPACIONES]({commit}) {
    return new Promise((resolve) => {
      axios.get('/cat_sub_areas_ocupaciones')
      .then(resp => {
        commit(`${[Mutation.SUB_AREAS_OCUPACIONES]}`, resp.data)
        resolve(resp)
      })
      .catch(err => {
        console.log(err)
        // reject(err)
      })
    })
  },
  [Action.SUB_AREAS_OCUPACIONES_VFORMATTED]({commit}) {
    return new Promise((resolve) => {
      axios.get('cat_sub_areas_ocupaciones/vselect-formatted')
      .then(resp => {
        commit(`${[Mutation.SUB_AREAS_OCUPACIONES_VFORMATTED]}`, resp.data)
        resolve(resp)
      })
      .catch(err => {
        console.log(err)
        // reject(err)
      })
    })
  },
}
