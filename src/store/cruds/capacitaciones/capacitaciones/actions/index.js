import axios from '../../../../../services/axios-auth'
import {Action, Mutation} from '../types'
import { v4 as uuidv4 } from 'uuid';
import fileReader from '../../../../../util/fileReader'

export default {
  [Action.CAPACITACIONES]({commit}) {
    return new Promise((resolve) => {
      axios.get('/capacitaciones')
      .then(resp => {
        // console.log(resp.data)
        commit(`${[Mutation.CAPACITACIONES]}`, resp.data)
        resolve(resp)
      })
      .catch(err => {
        console.log(err)
        // reject(err)
      })
    })
  },
  [Action.CAPACITACION_CURSOS]({commit}, id) {
    return new Promise((resolve, reject) => {
      axios.get(`/capacitacion/cursos/${id}`)
      .then(resp => {
        // console.log('resp.data', resp.data)
        let data = {
          id: id,
          cursos: resp.data
        }
        commit(`${[Mutation.CAPACITACION_CURSOS]}`, data)
        resolve(resp)
      })
      .catch(err => {
        console.log(err)
        if(err && err.response && err.response.data){
          reject(err.response.data)
        }
      })
    })
  },
  [Action.CAPACITACIONES_ACT]({commit}, data){
    return new Promise((resolve, reject) => {
      axios.put(`/capacitaciones/${data.id}`, { 
        fecha: data.fecha,
        capacitadores: data.capacitadores,
        id_cat_tipo_capacitacion: data.id_cat_tipo_capacitacion,
        id_cat_duracion: data.id_cat_duracion,
        id_cliente_empresa: data.id_cliente_empresa
      })
      .then(resp => {
        commit(`${[Mutation.CAPACITACIONES_ACT]}`, resp.data)
        resolve(resp)
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
    })
  },
  [Action.CAPACITACIONES_ACT_CURSOS_FECHAS]({commit}, data){
    return new Promise((resolve, reject) => {
      axios.put(`/capacitaciones/${data.id}`, { 
        cursos_fechas: data.cursos_fechas
      })
      .then(resp => {
        commit(`${[Mutation.CAPACITACIONES_ACT]}`, resp.data)
        resolve(resp)
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
    })
  },
  [Action.CAPACITACIONES_ACT_CURSOS_CAPACITADORES]({commit}, data){
    return new Promise((resolve, reject) => {
      // console.log('data', data)
      axios.put(`/capacitaciones/${data.id}`, { 
        cursos_capacitadores: data.cursos_capacitadores
      })
      .then(resp => {
        commit(`${[Mutation.CAPACITACIONES_ACT]}`, resp.data)
        resolve(resp)
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
    })
  },
  [Action.CAPACITACIONES_NEW]({commit}, data){
    return new Promise((resolve, reject) => {
      axios.post('/capacitaciones', { 
        fecha: data.fecha,
        capacitadores: data.capacitadores,
        id_cat_tipo_capacitacion: data.id_cat_tipo_capacitacion,
        id_cat_duracion: data.id_cat_duracion,
        id_cliente_empresa: data.id_cliente_empresa
      })
      .then(resp => {
        commit(`${[Mutation.CAPACITACIONES_NEW]}`, resp.data)
        resolve(resp)
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
    })
  },
  [Action.CAPACITACIONES_DELETE]({commit}, data){
    return new Promise((resolve, reject) => {
      axios.delete(`/capacitaciones/${data.id}`)
      .then(resp => {
        commit(`${[Mutation.CAPACITACIONES_DELETE]}`, data.id)
        resolve(resp)
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
    })
  },
  [Action.CAPACITACION_DOWNLOAD_DC3]({commit}, data){
    return new Promise((resolve, reject) => {
      axios({
        url: `/capacitacion/export/dc3/${data.id}`,
        method: 'GET',
        responseType: 'blob',
      }).then((response) => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement('a');

        fileLink.href = fileURL;
        let uuid = uuidv4()

        switch (response.headers['content-type']) {
          case 'application/zip':
            fileLink.setAttribute('download', `dc3-${uuid}.zip`)
            break;
          case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
            fileLink.setAttribute('download', `dc3-${uuid}.xlsx`)
            break;
          default:
            reject('Unknown type')
            break;
        }

        document.body.appendChild(fileLink);

        fileLink.click();
        resolve(response)
      }).catch((err, v) => {
        console.log(err)
        if(err && err.response && err.response.data){
          fileReader(err.response.data).then((file) => {
            reject( JSON.parse(file) )
          });
          return
        }
        reject(err)
      });
    })
  },
  [Action.CAPACITACION_DOWNLOAD_REPORT]({commit}, data){
    return new Promise((resolve, reject) => {
      axios({
        url: `/capacitacion/export/reporte/${data.id}`,
        method: 'GET',
        responseType: 'blob',
      }).then((response) => {
          var fileURL = window.URL.createObjectURL(new Blob([response.data]));
          var fileLink = document.createElement('a');
          let uuid = uuidv4()

          fileLink.href = fileURL;
          fileLink.setAttribute('download', `reporte-${uuid}.xlsx`);
          document.body.appendChild(fileLink);

          fileLink.click();
          resolve(response)
      }).catch((err, v) => {
        console.log(err)
        if(err && err.response && err.response.data){
          fileReader(err.response.data).then((file) => {
            reject( JSON.parse(file) )
          });
          return
        }
        reject(err)
      });
    })
  },
  [Action.CAPACITACION_DOWNLOAD_CERTIFICADO]({commit}, data){
    return new Promise((resolve, reject) => {
      axios({
        url: `/capacitacion/export/certificado/${data.id}`,
        method: 'GET',
        responseType: 'blob',
      }).then((response) => {
          var fileURL = window.URL.createObjectURL(new Blob([response.data]));
          var fileLink = document.createElement('a');
          let uuid = uuidv4()

          fileLink.href = fileURL;
          fileLink.setAttribute('download', `certificados-${uuid}.zip`);
          document.body.appendChild(fileLink);

          fileLink.click();
          resolve(response)
      }).catch((err, v) => {
        console.log(err)
        if(err && err.response && err.response.data){
          fileReader(err.response.data).then((file) => {
            reject( JSON.parse(file) )
          });
          return
        }
        reject(err)
      });
    })
  },
}
