import {Mutation} from "../types";

export default {
  [Mutation.GRUPOS_CAPACITACIONES](state, grupos_capacitaciones) {
    state.grupos_capacitaciones = grupos_capacitaciones
  },
  [Mutation.GRUPOS_TRABAJADORES_ACT](state, trabajador) {
    let editedIndex = state.grupos_capacitaciones.findIndex(x => x.id === trabajador.id)
    Object.assign(state.grupos_capacitaciones[editedIndex], trabajador)
  },
  [Mutation.GRUPOS_TRABAJADORES_NEW](state, trabajador) {
    state.grupos_capacitaciones.push(trabajador)
  },
  [Mutation.GRUPOS_TRABAJADORES_DELETE](state, ids) {
    ids.forEach(id => {
      let itemIndex = state.grupos_capacitaciones.findIndex(x => x.id === id)
      state.grupos_capacitaciones.splice(itemIndex, 1)
    })
  }
}