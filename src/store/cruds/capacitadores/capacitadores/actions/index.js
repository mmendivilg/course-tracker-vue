import axios from '../../../../../services/axios-auth'
import {Action, Mutation} from '../types'

export default {
  [Action.CAPACITADORES]({commit}) {
    return new Promise((resolve) => {
      axios.get('/capacitadores')
      .then(resp => {
        commit(`${[Mutation.CAPACITADORES]}`, resp.data)
        resolve(resp)
      })
      .catch(err => {
        console.log(err)
        // reject(err)
      })
    })
  },
  [Action.CAPACITADORES_ACT]({commit}, data){
    return new Promise((resolve, reject) => {
      axios.put(`/capacitadores/${data.id}`, { 
        nombres: data.nombres, 
        apellidos: data.apellidos, 
        titulo: data.titulo,
        registro_stps: data.registro_stps,
      })
      .then(resp => {
        commit(`${[Mutation.CAPACITADORES_ACT]}`, resp.data)
        resolve(resp)
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
    })
  },
  [Action.CAPACITADORES_NEW]({commit}, data){
    return new Promise((resolve, reject) => {
      axios.post('/capacitadores', { 
        titulo: data.titulo,
        nombres: data.nombres,
        apellidos: data.apellidos,
        registro_stps: data.registro_stps,
      })
      .then(resp => {
        commit(`${[Mutation.CAPACITADORES_NEW]}`, resp.data)
        resolve(resp)
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
    })
  },
  [Action.CAPACITADORES_DELETE]({commit}, data){
    return new Promise((resolve, reject) => {
      axios.delete(`/capacitadores/${data.id}`)
      .then(resp => {
        commit(`${[Mutation.CAPACITADORES_DELETE]}`, data.id)
        resolve(resp)
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
    })
  },
}
