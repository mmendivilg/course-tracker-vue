import axios from '../../../../../services/axios-auth'
import {Action, Mutation} from '../types'

export default {
  [Action.CLIENTES_EMPRESAS]({commit}) {
    return new Promise((resolve) => {
      axios.get('/clientes_empresas')
      .then(resp => {
        commit(`${[Mutation.CLIENTES_EMPRESAS]}`, resp.data)
        resolve(resp)
      })
      .catch(err => {
        console.log(err)
        // reject(err)
      })
    })
  },
  [Action.CLIENTES_EMPRESAS_DOWNLOAD_LOGO]({commit}, data){
    return new Promise((resolve) => {
      axios.get(`/cliente_empresa/logotipo/${data.id}`)
      .then(resp => {

        commit(`${[Mutation.CLIENTES_EMPRESAS_LOGO]}`, {id: data.id, data: resp.data})
        resolve(resp)
      })
      .catch(err => {
        console.log(err)
        // reject(err)
      })
    })
  },
  [Action.CLIENTES_EMPRESAS_RELOAD]({commit}, data){
    return new Promise((resolve, reject) => {
      axios.get(`/clientes_empresas/${data.id}`)
      .then(resp => {
        commit(`${[Mutation.CLIENTES_EMPRESAS_ACT]}`, resp.data)
        resolve(resp)
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
    })
  },
  [Action.CLIENTES_EMPRESAS_ACT]({commit}, data){
    return new Promise((resolve, reject) => {
      // console.log('data',data)

      axios.put(`/clientes_empresas/${data.id}`, { 
        nombre: data.nombre,
        rfc: data.rfc,
        registro_imss: data.registro_imss,
        contacto: data.contacto,
        id_cat_empresa_giro: data.id_cat_empresa_giro,
        calle: data.calle,
        numero: data.numero,
        codigo_postal: data.codigo_postal,
        ciudad: data.ciudad,
        estado: data.estado,
        pais: data.pais,
      })
      .then(resp => {
        commit(`${[Mutation.CLIENTES_EMPRESAS_ACT]}`, resp.data)
        resolve(resp)
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
    })
  },
  [Action.CLIENTES_EMPRESAS_NEW]({commit}, data){
    return new Promise((resolve, reject) => {
      axios.post('/clientes_empresas', { 
        nombre: data.nombre,
        rfc: data.rfc,
        registro_imss: data.registro_imss,
        contacto: data.contacto,
        id_cat_empresa_giro: data.id_cat_empresa_giro,
        calle: data.calle,
        numero: data.numero,
        codigo_postal: data.codigo_postal,
        ciudad: data.ciudad,
        estado: data.estado,
        pais: data.pais,
      })
      .then(resp => {
        commit(`${[Mutation.CLIENTES_EMPRESAS_NEW]}`, resp.data)
        resolve(resp)
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
    })
  },
  [Action.CLIENTES_EMPRESAS_DELETE]({commit}, data){
    return new Promise((resolve, reject) => {
      axios.delete(`/clientes_empresas/${data.id}`)
      .then(resp => {
        commit(`${[Mutation.CLIENTES_EMPRESAS_DELETE]}`, data.id)
        resolve(resp)
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
    })
  },
  [Action.CLIENTES_EMPRESAS_DELETE_LOGO]({commit}, data){
    return new Promise((resolve, reject) => {
      axios.delete(`/cliente_empresa/logotipo/${data.id}`)
      .then(resp => {
        commit(`${[Mutation.CLIENTES_EMPRESAS_DELETE_LOGO]}`, {id: data.id})
        resolve(resp)
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
    })
  },
  [Action.CLIENTES_EMPRESAS_UPDATE_LOGO]({commit}, data){
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('logotipo', data.logotipo, data.logotipo.name);
      axios.post(`/cliente_empresa/logotipo/${data.id}`, 
      formData, 
      {headers:{'Content-Type': 'application/json'}})
      .then(resp => {
        resolve(resp)
      })
      .catch((err, v) => {
        console.log(err)
        if(err && err.response && err.response.data){
          reject(err.response.data)
        }
        reject(err)
      })
    })
  },
}
