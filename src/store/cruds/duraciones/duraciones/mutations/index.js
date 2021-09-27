import {Mutation} from "../types";

export default {
  [Mutation.DURACIONES](state, duraciones) {
    state.duraciones = duraciones
  },
  [Mutation.DURACIONES_ACT](state, duracion) {
    let editedIndex = state.duraciones.findIndex(x => x.id === duracion.id)
    Object.assign(state.duraciones[editedIndex], duracion)
  },
  [Mutation.DURACIONES_NEW](state, duracion) {
    state.duraciones.push(duracion)
  },
  [Mutation.DURACIONES_DELETE](state, id) {
    let itemIndex = state.duraciones.findIndex(x => x.id === id)
    state.duraciones.splice(itemIndex, 1)
  },
  [Mutation.DURACIONES_TAG](state, duracion) {
    if( duracion ) {
      let itemIndex = state.duraciones.findIndex(x => x.id === duracion.id)
      if( itemIndex === -1 ) {
        state.duraciones.push(duracion)
      }
    }
  },
}