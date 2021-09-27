import {Mutation} from "../types";

export default {
  [Mutation.DEPARTAMENTOS](state, departamentos) {
    state.departamentos = departamentos
  },
  [Mutation.DEPARTAMENTOS_TAG](state, departamento) {
    if( departamento ) {
      let itemIndex = state.departamentos.findIndex(x => x.id === departamento.id)
      if( itemIndex === -1 ) {
        state.departamentos.push(departamento)
      }
    }
  },
}