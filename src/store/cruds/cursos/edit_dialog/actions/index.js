import {Action, Mutation} from '../types'

export default {
  [Action.CURSOS_EDIT_DIALOG]({commit}, edit_dialog) {
    commit(`${[Mutation.CURSOS_EDIT_DIALOG]}`, edit_dialog)
  },
}