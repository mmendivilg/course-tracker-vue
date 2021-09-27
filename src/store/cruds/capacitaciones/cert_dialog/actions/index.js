import {Action, Mutation} from '../types'

export default {
  [Action.CERTIFICADO_DIALOG]({commit}, dialog) {
    commit(`${[Mutation.CERTIFICADO_DIALOG]}`, dialog)
  },
}