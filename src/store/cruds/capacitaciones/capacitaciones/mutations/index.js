import {Mutation} from "../types";

function getCursosDatos(cursos, capacitacion, cursos_datos_property) {
  capacitacion[cursos_datos_property] = capacitacion[cursos_datos_property] ?? []

  cursos.forEach( (curso) => {
    let curso_fecha = capacitacion[cursos_datos_property].findIndex(c_f => c_f.id_curso === curso.id)
    if(curso_fecha==-1){
      capacitacion[cursos_datos_property].push({id_curso: curso.id, fechas: []})
    }
  })
  capacitacion[cursos_datos_property] = capacitacion[cursos_datos_property].filter( (curso_fecha) => {
    let curso = cursos.findIndex(c => c.id === curso_fecha.id_curso)
    return curso > -1
  })
}

export default {
  [Mutation.CAPACITACIONES](state, capacitaciones) {
    state.capacitaciones = capacitaciones
  },
  [Mutation.CAPACITACIONES_ACT](state, capacitacion) {
    let editedIndex = state.capacitaciones.findIndex(x => x.id === capacitacion.id)
    Object.assign(state.capacitaciones[editedIndex], capacitacion)
  },
  [Mutation.CAPACITACIONES_NEW](state, capacitacion) {
    state.capacitaciones.push(capacitacion)
  },
  [Mutation.CAPACITACIONES_DELETE](state, id) {
    let itemIndex = state.capacitaciones.findIndex(x => x.id === id)
    state.capacitaciones.splice(itemIndex, 1)
  },
  [Mutation.CAPACITACION_CURSOS](state, data) {
    let id = data.id
    let cursos = data.cursos ?? []
    let editedIndex = state.capacitaciones.findIndex(x => x.id === id)
    let capacitacion = state.capacitaciones[editedIndex]
    getCursosDatos( cursos, capacitacion, 'cursos_fechas' )
    getCursosDatos( cursos, capacitacion, 'cursos_capacitadores' )

    Object.assign(state.capacitaciones[editedIndex], capacitacion)
  },
}