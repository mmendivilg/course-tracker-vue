<template>
  <div>
    <v-dialog 
    v-model="isDialogActive" 
    @keydown.esc="isDialogActive = false"
    max-width="600px"
    persistent
    scrollable
    >
      <v-card>
        <v-toolbar
          dark
          color="primary"
          elevation="0"
          extended
          extension-height="30"
        >
          <v-list-item three-line class="text-left mt-4">
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">
                Certificados
              </v-list-item-title>
              <v-list-item-subtitle>{{$t('components.capacitaciones.dc3-enter-info', [cursosCapacitadores.length])}}</v-list-item-subtitle>
            </v-list-item-content>
              <v-list-item-icon>
                <v-btn
                  :disabled="loading" 
                  icon
                  @click="isDialogActive = false"
                >
                <v-icon>mdi-close</v-icon>
              </v-btn>
              </v-list-item-icon>
          </v-list-item>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text style="height: 300px;">
          <v-container :key="editedItemKey">
            <v-row v-for="item in cursosCapacitadores" :key="item.id_curso">
              <v-col>
                <curso-capacitador 
                  :curso="{id_curso: item.id_curso, nombre: getCursoNombre(item.id_curso)}"
                  :fecha="item.fecha"
                  :duracion="item.id_cat_duracion"
                  :capacitador="item.id_capacitador"
                  :ref="`${editedItemKey}cursosCapacitadores${item.id_curso}`"
                />
              </v-col>
            </v-row> 
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn 
            color="primary" 
            text 
            @click="submit"
            :loading="loading"
            :disabled="loading" 
          >OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <error-alert :dialog="errorDialog" />
  </div>
</template>

<script>
import ErrorAlert from '../../ErrorAlert.vue'
import CursoCapacitador from './CursoCapacitador.vue'
import { Action as certDialogAction } from '../../../store/cruds/capacitaciones/cert_dialog/types'
import { Action as capacitacionesAction } from '../../../store/cruds/capacitaciones/capacitaciones/types'

export default {
  components: {
    ErrorAlert,
    CursoCapacitador
  },
  data() {
    return {
      errorDialog: false,
      closeDialog: false,
      editedItem: null,
      editedItemKey: 0,
      cursosCapacitadores: [],
      fecha_menu: false,
      loading: false
    }
  },
  computed: {
    editedItemSt : function(){ return this.$store.getters.getCapacitacionesEditedItem ?? [] },
    cursos : function(){ return this.$store.getters.getCursos ?? [] },
    isDialogActive : {
      get: function(){ return this.$store.getters.isCertificadoDialogActive },
      set: function(val) {
        this.$store.dispatch(`${[certDialogAction.CERTIFICADO_DIALOG]}`, val)
      }
    }
  },
  watch: {
    editedItemSt (editedItem) {
      this.editedItem = Object.assign({}, editedItem)
      this.editedItemKey = this.editedItem.id
      this.cursosCapacitadores = this.editedItem.cursos_capacitadores ?? []
    },
    closeDialog: function () {
      this.$store.dispatch(`${[certDialogAction.CERTIFICADO_DIALOG]}`, false)
    },
  },
  methods: {
    async submit(){
      this.loading = true
      let cursos_capacitadores = []
      this.cursosCapacitadores.forEach((curso_fecha) => {
        let ref_value = eval(this.$refs[this.editedItemKey + 'cursosCapacitadores' + curso_fecha.id_curso])[0]
        let fecha = ref_value ? ref_value.fecha_new : []
        let id_cat_duracion = ref_value ? ref_value.id_cat_duracion : null
        let id_capacitador = ref_value ? ref_value.id_capacitador : []
        cursos_capacitadores.push( {
          id_curso: curso_fecha.id_curso,
          fecha: fecha,
          id_cat_duracion: id_cat_duracion,
          id_capacitador: id_capacitador
        } )
      })

      let data = {
        id: this.editedItem.id,
        cursos_capacitadores: cursos_capacitadores,
      }
      let error = null
      try {
        await this.$store.dispatch(`${[capacitacionesAction.CAPACITACIONES_ACT_CURSOS_CAPACITADORES]}`, data)
      } catch (e) {
        error = e.error
      }
      if(!error){
        try{
          await this.$store.dispatch(`${[capacitacionesAction.CAPACITACION_DOWNLOAD_CERTIFICADO]}`, {id: this.editedItem.id})
        } catch (e){
          error = e.error
        }
      }
      if(!error){
        this.loading = false
        this.isDialogActive = false
      } else {
        this.errorDialog = true
        this.loading = false
      }
    },
    getCurso(id){
      let index = this.cursos.findIndex(x => x.id === id)
      if(index>=0){
        return this.cursos[index]
      }
    },
    getCursoNombre(id){
      let curso = this.getCurso(id)
      if(curso){
        return curso.nombre
      }
    }
  }
}
</script>