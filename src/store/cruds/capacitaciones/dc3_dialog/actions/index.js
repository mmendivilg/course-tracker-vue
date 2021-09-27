import {Action, Mutation} from '../types'

export default {
  [Action.DC3_DIALOG]({commit}, dc3_dialog) {
    commit(`${[Mutation.DC3_DIALOG]}`, dc3_dialog)
  },
}