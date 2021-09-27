import {Mutation} from "../types";

export default {
  [Mutation.PUESTOS](state, puestos) {
    state.puestos = puestos
  },
  [Mutation.PUESTOS_TAG](state, puesto) {
    if( puesto ) {
      let itemIndex = state.puestos.findIndex(x => x.id === puesto.id)
      if( itemIndex === -1 ) {
        state.puestos.push(puesto)
      }
    }
  },
}