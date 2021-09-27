import axios from '../../../../../../services/axios-auth'
import {Action, Mutation} from '../types'
import {Action as cursosAction} from '../../../../../cruds/cursos/cursos/types'
import {Action as puestosAction} from '../../../../../cat/puestos/types'
import {Action as departamentosAction} from '../../../../../cat/departamentos/types'
import { v4 as uuidv4 } from 'uuid';
import fileReader from '../../../../../../util/fileReader'

export default {
  [Action.GRUPOS_CAPACITACIONES]({commit}, id) {
    return new Promise((resolve) => {
      axios({
        method: 'get',
        url: `/capacitacion/grupos/${id}`
      })
      .then(resp => {
        commit(`${[Mutation.GRUPOS_CAPACITACIONES]}`, resp.data)
        resolve(resp.data)
      })
      .catch(err => {
        console.log(err)
      })
    })
  },
  [Action.GRUPOS_TRABAJADORES_ACT]({commit}, data){
    return new Promise((resolve, reject) => {
      axios.put(`/trabajadores/${data.id}`, { 
        nombres: data.nombres, 
        apellidos: data.apellidos, 
        numero_colaborador: data.numero_colaborador,
        id_capacitacion: data.id_capacitacion,
        aciertos: data.aciertos,
        preguntas: data.preguntas,
        observaciones: data.observaciones,
        rfc: data.rfc,
        id_cat_curso: data.id_cat_curso, 
        id_cat_departamento: data.id_cat_departamento,
        id_cat_puesto: data.id_cat_puesto,
        id_cat_sub_area_ocupacion: data.id_cat_sub_area_ocupacion,
        puesto: data.puesto,
        departamento: data.departamento,
        curso: data.curso
      })
      .then(resp => {
        commit(`${[Mutation.GRUPOS_TRABAJADORES_ACT]}`, resp.data)
        commit(`${[cursosAction.CURSOS_TAG]}`, resp.data.curso)
        commit(`${[puestosAction.PUESTOS_TAG]}`, resp.data.puesto)
        commit(`${[departamentosAction.DEPARTAMENTOS_TAG]}`, resp.data.departamento)
        resolve(resp)
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
    })
  },
  [Action.GRUPOS_TRABAJADORES_NEW]({commit}, data){
    return new Promise((resolve, reject) => {
      axios.post('/trabajadores', { 
        nombres: data.nombres, 
        apellidos: data.apellidos, 
        numero_colaborador: data.numero_colaborador,
        id_capacitacion: data.id_capacitacion,
        aciertos: data.aciertos,
        preguntas: data.preguntas,
        observaciones: data.observaciones,
        rfc: data.rfc,
        id_cat_curso: data.id_cat_curso, 
        id_cat_departamento: data.id_cat_departamento,
        id_cat_puesto: data.id_cat_puesto,
        id_cat_sub_area_ocupacion: data.id_cat_sub_area_ocupacion,
        puesto: data.puesto,
        departamento: data.departamento,
        curso: data.curso
      })
      .then(resp => {
        commit(`${[Mutation.GRUPOS_TRABAJADORES_NEW]}`, resp.data)
        commit(`${[cursosAction.CURSOS_TAG]}`, resp.data.curso)
        commit(`${[puestosAction.PUESTOS_TAG]}`, resp.data.puesto)
        commit(`${[departamentosAction.DEPARTAMENTOS_TAG]}`, resp.data.departamento)
        resolve(resp)
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
    })
  },
  [Action.GRUPOS_TRABAJADORES_DELETE]({commit}, ids){
    return new Promise((resolve, reject) => {
      axios.delete(`/trabajadores/delete`, {
        data: {
          ids: ids
        }
      })
      .then(resp => {
        commit(`${[Mutation.GRUPOS_TRABAJADORES_DELETE]}`, ids)
        resolve(resp)
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
    })
  },
  [Action.GRUPOS_UPLOAD_FILE]({commit}, data){
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      data.files.forEach(file => {
        formData.append('archivos[]', file, file.name);
      });
      axios.post(`/capacitacion/grupos/archivo/${data.id_capacitacion}`, formData, {headers:{'Content-Type': 'application/json'}})
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
  [Action.GRUPOS_DOWNLOAD_TEMPLATE]({commit}, data){
    return new Promise((resolve, reject) => {
      axios({
        url: '/capacitacion/grupos/plantilla',
        method: 'GET',
        responseType: 'blob',
      }).then((response) => {
          var fileURL = window.URL.createObjectURL(new Blob([response.data]));
          var fileLink = document.createElement('a');

          fileLink.href = fileURL;
          fileLink.setAttribute('download', 'trabajadores.xlsx');
          document.body.appendChild(fileLink);

          fileLink.click();
          resolve(response)
      });
    })
  }
}
