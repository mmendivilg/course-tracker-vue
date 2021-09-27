import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist';
import localForage from 'localforage';
import axios from '../services/axios-auth'
import VueAxios from 'vue-axios'
import auth from './auth';
import prog_bar from './prog_bar';
import drawer from './drawer';
import locale from './locale';
import capacitadores from './cruds/capacitadores/capacitadores';
import capacitadores_edited_item from './cruds/capacitadores/edited_item';
import capacitadores_edit_dialog from './cruds/capacitadores/edit_dialog';
import cursos from './cruds/cursos/cursos';
import cursos_edited_item from './cruds/cursos/edited_item';
import cursos_edit_dialog from './cruds/cursos/edit_dialog';
import clientes_empresas from './cruds/clientes_empresas/clientes_empresas';
import clientes_empresas_edited_item from './cruds/clientes_empresas/edited_item';
import clientes_empresas_edit_dialog from './cruds/clientes_empresas/edit_dialog';
import capacitaciones from './cruds/capacitaciones/capacitaciones';
import capacitaciones_edited_item from './cruds/capacitaciones/edited_item';
import capacitaciones_edit_dialog from './cruds/capacitaciones/edit_dialog';
import capacitaciones_dc3_dialog from './cruds/capacitaciones/dc3_dialog';
import capacitaciones_cert_dialog from './cruds/capacitaciones/cert_dialog';
import tipos_capacitaciones from './cat/tipos_capacitaciones';
import duraciones from './cruds/duraciones/duraciones';
import duraciones_edited_item from './cruds/duraciones/edited_item';
import duraciones_edit_dialog from './cruds/duraciones/edit_dialog';
import grupos_capacitaciones from './cruds/capacitaciones/grupos_capacitaciones/grupos_capacitaciones';
import trabajadores_edited_item from './cruds/capacitaciones/grupos_capacitaciones/trabajadores/edited_item';
import trabajadores_edit_dialog from './cruds/capacitaciones/grupos_capacitaciones/trabajadores/edit_dialog';
import departamentos from './cat/departamentos'
import puestos from './cat/puestos'
import sub_areas_ocupaciones from './cat/sub_areas_ocupaciones'
import empresas_giros from './cat/empresas_giros'

Vue.use(Vuex)
Vue.use(VueAxios, axios)


const vuexStorage = new VuexPersist({
  key: process.env.VUE_APP_STORAGE_KEY,
  storage: localForage,
  asyncStorage: true,
  modules: ['auth'],
});


export default new Vuex.Store({
  plugins: [vuexStorage.plugin],
  modules: {
    auth,
    prog_bar,
    drawer,
    locale,
    capacitadores,
    capacitadores_edited_item,
    capacitadores_edit_dialog,
    cursos,
    cursos_edited_item,
    cursos_edit_dialog,
    clientes_empresas,
    clientes_empresas_edited_item,
    clientes_empresas_edit_dialog,
    capacitaciones,
    capacitaciones_edited_item,
    capacitaciones_edit_dialog,
    capacitaciones_dc3_dialog,
    capacitaciones_cert_dialog,
    tipos_capacitaciones,
    duraciones,
    duraciones_edited_item,
    duraciones_edit_dialog,
    grupos_capacitaciones,
    departamentos,
    puestos,
    sub_areas_ocupaciones,
    trabajadores_edited_item,
    trabajadores_edit_dialog,
    empresas_giros
  }
});