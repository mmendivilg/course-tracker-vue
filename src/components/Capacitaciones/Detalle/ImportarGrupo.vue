<template>
  <v-row justify="center">
    <v-dialog 
      v-model="isDialogActive" 
      @keydown.esc="isDialogActive = false" 
      persistent 
      transition="dialog-top-transition" max-width="600px"
    >
      <v-card>
        <v-toolbar
          dark
          color="primary"
          elevation="0"
        >
          <v-toolbar-title>
            <span>{{ $t('components.capacitaciones.grupos.import.update-workers-bulk') }}</span>
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-stepper
            vertical
            class="elevation-0 transparent"
            value="3"
          >
            <v-stepper-step step="1" color="primary darken-2" complete complete-icon="mdi-numeric-1">
              {{ $t('components.capacitaciones.grupos.import.download-xlsx-file') }}
              <v-container class="text-left" style="position: absolute; margin-top:25px">
                <v-btn
                  elevation="2"
                  raised
                  color="primary" 
                  outlined
                  text
                  class="mb-2"
                  depressed
                  @click="onDownloadTemplateButtonClick"
                  :loading="loadingTemplate"
                >
                  <v-icon left>
                    mdi-download
                  </v-icon>
                  {{ $t('components.capacitaciones.grupos.import.download-xlsx-template') }}
                </v-btn>
              </v-container>
            </v-stepper-step>
            <v-stepper-content step="1" style="height:80px;"/>
            <v-stepper-step step="2" color="primary darken-2" complete complete-icon="mdi-numeric-2">
              {{ $t('components.capacitaciones.grupos.import.add-information-about-workers-xlsx') }}
              
            </v-stepper-step>
            <v-stepper-content  step="2"/>
            <v-stepper-step step="3" complete color="primary darken-2" complete-icon="mdi-numeric-3">
              {{ $t('components.capacitaciones.grupos.import.upload-xlsx-file') }}
              <v-container class="text-left" style="position: absolute; margin-top:25px; margin-bottom:25px">
                <v-btn
                  elevation="2"
                  color="primary" 
                  outlined
                  text
                  depressed
                  @click="onUploadButtonClick"
                  :loading="isUploading"
                >
                  {{ $t('components.capacitaciones.grupos.import.attach-xlsx-file') }}
                </v-btn>
                <input
                  ref="uploader"
                  class="d-none"
                  type="file"
                  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  @change="onFileChanged"
                />
              </v-container>
            </v-stepper-step>
            <v-stepper-content step="3" style="height:20px;"/>
          </v-stepper>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="isDialogActive = false">
            {{ $t('close') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <error-alert :dialog="errorDialog" />
    <v-snackbar
      v-model="snackbar"
    >
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="primary"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          {{ $t('close') }}
        </v-btn>
      </template>
    </v-snackbar>
  </v-row>
</template>


<script>
import { Action as editDialogAction } from '../../../store/cruds/capacitaciones/grupos_capacitaciones/trabajadores/edit_dialog/types'
import ErrorAlert from '../../ErrorAlert'
import responses from "../../../util/responses";
import { Action as gruposCapacitacionesAction } from '../../../store/cruds/capacitaciones/grupos_capacitaciones/grupos_capacitaciones/types'
const reponseUtil = new responses()

export default {
  components: {
    ErrorAlert
  },
  data () {
    return {
      loader: null,
      errorDialog: false,
      loading: false,
      errors: null,
      selectedFile: null,
      isUploading: false,
      loadingTemplate: false,
      snackbar: false,
      snackbarText: ''
    }
  },
  computed: {
    isDialogActive : {
      get: function(){ return this.$store.getters.isGruposImportDialogActive },
      set: function(val) {
        this.$store.dispatch(`${[editDialogAction.GRUPOS_IMPORT_DIALOG]}`, val)
      }
    }
  },
  watch: {
    loader () { 
      const l = this.loader
      this[l] = !this[l]
    }
  },
  methods: {
    onUploadButtonClick() {
      window.addEventListener('focus', () => {
      }, { once: true })

      this.snackbar = false
      this.$refs.uploader.click()
    },
    async onDownloadTemplateButtonClick(){
      this.loadingTemplate = true
      await this.$store.dispatch(`${[gruposCapacitacionesAction.GRUPOS_DOWNLOAD_TEMPLATE]}`, {})
      this.loadingTemplate = false
    },
    async onFileChanged(e) {
      this.isUploading = true
      this.selectedFile = e.target.files[0]
      let data = {
        id_capacitacion: this.$route.params.id,
        files: [ this.selectedFile ]
      }
      let result = {data:{total: 0}}
      let error = null
      try {
        result = await this.$store.dispatch(`${[gruposCapacitacionesAction.GRUPOS_UPLOAD_FILE]}`, data)
      } catch (e) {
        error = e.error
      }
      if(!error){
        await this.$store.dispatch(`${[gruposCapacitacionesAction.GRUPOS_CAPACITACIONES]}`, this.$route.params.id)
        this.snackbarText = this.$tc('components.capacitaciones.grupos.import.workers-imported-created', result.data.total)
      } else {
        this.snackbarText = error
      }
      this.$refs.uploader.value = ""
      this.selectedFile = null
      this.isUploading = false
      this.snackbar = true
      this.isDialogActive = false
    },
  }
}
</script>