import {Mutation} from "../types";

export default {
  [Mutation.CLIENTES_EMPRESAS](state, clientes_empresas) {
    state.clientes_empresas = clientes_empresas
  },
  [Mutation.CLIENTES_EMPRESAS_ACT](state, cliente_empresa) {
    let editedIndex = state.clientes_empresas.findIndex(x => x.id === cliente_empresa.id)
    Object.assign(state.clientes_empresas[editedIndex], cliente_empresa)
  },
  [Mutation.CLIENTES_EMPRESAS_NEW](state, cliente_empresa) {
    state.clientes_empresas.push(cliente_empresa)
  },
  [Mutation.CLIENTES_EMPRESAS_DELETE](state, id) {
    let itemIndex = state.clientes_empresas.findIndex(x => x.id === id)
    state.clientes_empresas.splice(itemIndex, 1)
  },
  [Mutation.CLIENTES_EMPRESAS_DELETE_LOGO](state, data) {
    delete state.clientes_empresas_logotipos[data.id]
  },
  [Mutation.CLIENTES_EMPRESAS_LOGO](state, data) {
    state.clientes_empresas_logotipos[data.id] = data.data
  }
}