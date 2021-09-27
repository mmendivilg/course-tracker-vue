import {Action, Mutation} from '../types'

export default {
  [Action.CLIENTES_EMPRESAS_EDIT_DIALOG]({commit}, edit_dialog) {
    commit(`${[Mutation.CLIENTES_EMPRESAS_EDIT_DIALOG]}`, edit_dialog)
  },
}