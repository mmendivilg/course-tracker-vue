import {Action, Mutation} from '../types'

export default {
  [Action.CLIENTES_EMPRESAS_EDITED_ITEM]({commit}, edited_item) {
    commit(`${[Mutation.CLIENTES_EMPRESAS_EDITED_ITEM]}`, edited_item)
  },
  [Action.CLIENTES_EMPRESAS_IS_NEW_ITEM]({commit}, is_new_item) {
    commit(`${[Mutation.CLIENTES_EMPRESAS_IS_NEW_ITEM]}`, is_new_item)
  },
}