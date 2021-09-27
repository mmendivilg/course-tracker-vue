import {Action, Mutation} from '../types'

export default {
  [Action.DRAWER]({commit}, drawer) {
    commit(`${[Mutation.DRAWER]}`, drawer)
  },
  [Action.SETTINGS_DRAWER]({commit}, settings_drawer) {
    commit(`${[Mutation.SETTINGS_DRAWER]}`, settings_drawer)
  },
}