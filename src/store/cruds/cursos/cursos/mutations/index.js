import {Mutation} from "../types";

export default {
  [Mutation.CURSOS](state, cursos) {
    state.cursos = cursos
  },
  [Mutation.CURSOS_ACT](state, curso) {
    let editedIndex = state.cursos.findIndex(x => x.id === curso.id)
    Object.assign(state.cursos[editedIndex], curso)
  },
  [Mutation.CURSOS_NEW](state, curso) {
    state.cursos.push(curso)
  },
  [Mutation.CURSOS_DELETE](state, id) {
    let itemIndex = state.cursos.findIndex(x => x.id === id)
    state.cursos.splice(itemIndex, 1)
  },
  [Mutation.CURSOS_TAG](state, curso) {
    if( curso ) {
      let itemIndex = state.cursos.findIndex(x => x.id === curso.id)
      if( itemIndex === -1 ) {
        state.cursos.push(curso)
      }
    }
  },
}