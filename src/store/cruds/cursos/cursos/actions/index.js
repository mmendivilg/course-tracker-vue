import axios from '../../../../../services/axios-auth'
import {Action, Mutation} from '../types'

export default {
  [Action.CURSOS]({commit}) {
    return new Promise((resolve) => {
      axios.get('/cat_cursos')
      .then(resp => {
        commit(`${[Mutation.CURSOS]}`, resp.data)
        resolve(resp)
      })
      .catch(err => {
        console.log(err)
        // reject(err)
      })
    })
  },
  [Action.CURSOS_ACT]({commit}, data){
    return new Promise((resolve, reject) => {
      axios.put(`/cat_cursos/${data.id}`, { 
        nombre: data.nombre 
      })
      .then(resp => {
        commit(`${[Mutation.CURSOS_ACT]}`, resp.data)
        resolve(resp)
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
    })
  },
  [Action.CURSOS_NEW]({commit}, data){
    return new Promise((resolve, reject) => {
      axios.post('/cat_cursos', { 
        nombre: data.nombre
      })
      .then(resp => {
        commit(`${[Mutation.CURSOS_NEW]}`, resp.data)
        resolve(resp)
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
    })
  },
  [Action.CURSOS_TAG]({commit}, curso){
    commit(`${[Mutation.CURSOS_TAG]}`, curso)
  },
  [Action.CURSOS_DELETE]({commit}, data){
    return new Promise((resolve, reject) => {
      axios.delete(`/cat_cursos/${data.id}`)
      .then(resp => {
        commit(`${[Mutation.CURSOS_DELETE]}`, data.id)
        resolve(resp)
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
    })
  },
}
