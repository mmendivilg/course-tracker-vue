import {Mutation} from "../types";

export default {
  [Mutation.CAPACITADORES](state, capacitadores) {
    state.capacitadores = capacitadores
  },
  [Mutation.CAPACITADORES_ACT](state, capacitador) {
    let editedIndex = state.capacitadores.findIndex(x => x.id === capacitador.id)
    Object.assign(state.capacitadores[editedIndex], capacitador)
  },
  [Mutation.CAPACITADORES_NEW](state, capacitador) {
    state.capacitadores.push(capacitador)
  },
  [Mutation.CAPACITADORES_DELETE](state, id) {
    let itemIndex = state.capacitadores.findIndex(x => x.id === id)
    state.capacitadores.splice(itemIndex, 1)
  }
}