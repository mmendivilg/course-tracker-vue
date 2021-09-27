import axios from '../../../../../services/axios-auth'
import {Action, Mutation} from '../types'

export default {
  [Action.DURACIONES]({commit}) {
    return new Promise((resolve) => {
      axios.get('/cat_duraciones')
      .then(resp => {
        commit(`${[Mutation.DURACIONES]}`, resp.data)
        resolve(resp)
      })
      .catch(err => {
        console.log(err)
        // reject(err)
      })
    })
  },
  [Action.DURACIONES_ACT]({commit}, data){
    return new Promise((resolve, reject) => {
      axios.put(`/cat_duraciones/${data.id}`, { 
        nombre: data.nombre,
        horas: data.horas
      })
      .then(resp => {
        commit(`${[Mutation.DURACIONES_ACT]}`, resp.data)
        resolve(resp)
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
    })
  },
  [Action.DURACIONES_NEW]({commit}, data){
    return new Promise((resolve, reject) => {
      axios.post('/cat_duraciones', { 
        nombre: data.nombre,
        horas: data.horas
      })
      .then(resp => {
        commit(`${[Mutation.DURACIONES_NEW]}`, resp.data)
        resolve(resp)
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
    })
  },
  [Action.DURACIONES_TAG]({commit}, duracion){
    commit(`${[Mutation.DURACIONES_TAG]}`, duracion)
  },
  [Action.DURACIONES_DELETE]({commit}, data){
    return new Promise((resolve, reject) => {
      axios.delete(`/cat_duraciones/${data.id}`)
      .then(resp => {
        commit(`${[Mutation.DURACIONES_DELETE]}`, data.id)
        resolve(resp)
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
    })
  },
}
