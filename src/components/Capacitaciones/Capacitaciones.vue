<template>
  <div>
    <bread-crumbs/>
    <v-container fluid>
      <v-row>
        <v-col
          cols="12"
          md="8"
          offset-md="2"
        >
          <v-card>
            <v-card-title>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                :label="$t('search')"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :search="search"
              :items="capacitaciones"
              :items-per-page="5"
              :loading="loadingVar"
              :loading-text="$t('loading-text')"
              class="elevation-1"
              :footer-props="{
                itemsPerPageText: $t('data-table.footer.rows-per-page'),
                itemsPerPageAllText: $t('data-table.footer.all'),
                pageText: $t('data-table.footer.page-text')
                }"
            >
              <template v-slot:top>
                <v-toolbar dense flat color="transparent">
                  <v-toolbar-title>Capacitaciones</v-toolbar-title>
                  <v-divider
                    class="mx-4"
                    inset
                    vertical
                  ></v-divider>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    text
                    elevation="2"
                    class="mb-2"
                    @click="newItem()"
                  >
                    {{ $t('new-item') }}
                  </v-btn>
                </v-toolbar>
              </template>
              <template  v-slot:[`item.fecha`]="{ item }">
                <router-link :to="{ name: 'grupos', params: { id: item.id }}">
                  {{ $moment(item.fecha, "YYYY-MM-DD").format('L') }}
                </router-link>
              </template>
              <template  v-slot:[`item.actions`]="{ item }">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon 
                    v-model="item.action"
                    @click="editItem(item)"
                    v-bind="attrs"
                    v-on="on"
                    >
                      {{ icons.mdiPencil }}
                    </v-icon>
                  </template>
                  <span>{{ $t('edit') }}</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon 
                    @click="deleteItem(item)"
                    v-bind="attrs"
                    v-on="on"
                    >
                      {{ icons.mdiTrashCan }}
                    </v-icon>
                  </template>
                  <span>{{ $t('remove') }}</span>
                </v-tooltip>
                <v-menu
                  bottom
                  right
                  offset-x
                  close-on-click
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-bind="attrs"
                      v-on="on"
                      icon
                    >
                    <v-icon>mdi-dots-vertical</v-icon>
                      
                    </v-btn>
                  </template>
                  <v-list dense>
                    <v-list-item link class="text-left" key="x-1" @click="onDownloadReportButtonClick(item)">
                      <v-list-item-title>{{ $t('components.capacitaciones.generate-report') }}</v-list-item-title>
                    </v-list-item>
                    <v-list-item link class="text-left" key="x-2" @click="onDownloadCertificateButtonClick(item)">
                      <v-list-item-title>{{ $t('components.capacitaciones.generate-certificates') }}</v-list-item-title>
                    </v-list-item>
                    <v-list-item link class="text-left" key="x-3" @click="onDC3ButtonClick(item)">
                      <v-list-item-title>{{ $t('components.capacitaciones.generate-dc-3') }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog
      v-model="loadingDialog"
      width="300"
      persistent
    >
      <v-card>
        <v-card-text>
          {{ $t('please-stand-by') }}
          <v-progress-linear
            indeterminate
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <dc-three/>
    <certificado/>
    <confirm-dialog ref="deleteDialogCapacitaciones" />
    <edit-box :submit="submitForm" ref="capacitacionesEditBox">
      <template #body="{ close, loading, error }">
        <editar-capacitacion 
          ref="editarCapacitacionForm"
          :close="close"
          :loading="loading"
          :error="error"
          :fieldsRelations="fieldsRelations"
        >
        </editar-capacitacion>
      </template>
    </edit-box>
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
  </div>
</template>

<script>
import { Action as capacitacionesAction } from '../../store/cruds/capacitaciones/capacitaciones/types'
import { Action as capacitadoresAction } from '../../store/cruds/capacitadores/capacitadores/types'
import { Action as cursosAction } from '../../store/cruds/cursos/cursos/types'
import { Action as clientesEmpresasAction } from '../../store/cruds/clientes_empresas/clientes_empresas/types'
import { Action as tiposCapacitacionesAction } from '../../store/cat/tipos_capacitaciones/types'
import { Action as duracionesAction } from '../../store/cruds/duraciones/duraciones/types'
import { Action as dc3DialogAction } from '../../store/cruds/capacitaciones/dc3_dialog/types'
import { Action as certDialogAction } from '../../store/cruds/capacitaciones/cert_dialog/types'
import { Action as editedItemAction } from '../../store/cruds/capacitaciones/edited_item/types'
import { Action as progBarAction } from '../../store/prog_bar/types'
import {
    mdiPencil,
    mdiTrashCan,
    mdiDotsVertical
  } from '@mdi/js'
import EditarCapacitacion from './EditarCapacitacion.vue'
import BreadCrumbs from './BreadCrumbs.vue'
import DcThree from './DC3/DC3.vue'
import Certificado from './Certificado/Certificado.vue'
import ConfirmDialog from '../ConfirmDialog.vue'
import EditBox from '../EditBox.vue'

export default {
  components: {
    EditarCapacitacion,
    EditBox,
    BreadCrumbs,
    DcThree,
    Certificado,
    ConfirmDialog
  },
  data () {
    return {
      snackbarText: '',
      snackbar: null,
      loadingDialog: false,
      search: '',
      icons: {
        mdiPencil,
        mdiTrashCan,
        mdiDotsVertical
      },
      marcador: {},
      loadingVar: true,
      fieldsRelations: {
        "fecha": "capacitaciones.date",
        "capacitadores": "capacitaciones.trainers",
        "id_cat_tipo_capacitacion": "capacitaciones.training_type",
        "id_cat_duracion": "capacitaciones.duration",
        "id_cliente_empresa": "capacitaciones.client",
      }
    }
  },
  computed: {
    capacitaciones : function(){ return this.$store.getters.getCapacitaciones ?? [] },
    headers() {
       return [ {
          text: 'ID',
          align: 'start',
          sortable: true,
          value: 'id',
        },
        { text: this.$t('fields.capacitaciones.date'), value: 'fecha' },
        { text: "Empresa", value: 'clienteempresa.nombre' },
        { text: "Registros", value: 'trabajadores_count' },
        { text: this.$t('actions'), value: 'actions', sortable: false },
      ]
    }
  },
  created: function(){
    Promise.all([
      this.$store.dispatch(`${[cursosAction.CURSOS]}`), 
      this.$store.dispatch(`${[capacitacionesAction.CAPACITACIONES]}`), 
      this.$store.dispatch(`${[capacitadoresAction.CAPACITADORES]}`),
      this.$store.dispatch(`${[tiposCapacitacionesAction.TIPOS_CAPACITACIONES]}`),
      this.$store.dispatch(`${[duracionesAction.DURACIONES]}`),
      this.$store.dispatch(`${[clientesEmpresasAction.CLIENTES_EMPRESAS]}`)
      ]).then(data => {
      this.loadingVar = false
    })
  },
  methods: {
    async onDownloadCertificateButtonClick(item){
      this.loadingDialog = true
      var error = null
      try {
        await this.$store.dispatch(`${[capacitacionesAction.CAPACITACION_CURSOS]}`, item.id)
        await this.$store.dispatch(`${[editedItemAction.CAPACITACIONES_EDITED_ITEM]}`, item)
      } catch (err) {
        error = err.error ? err.error : err;
      }
      if(error) {
        this.snackbarText = error
        this.snackbar = true
      } else {
        this.$store.dispatch(`${[certDialogAction.CERTIFICADO_DIALOG]}`, true)
      }
      this.loadingDialog = false
    },
    async onDC3ButtonClick(item){
      this.loadingDialog = true
      var error = null
      try {
        await this.$store.dispatch(`${[capacitacionesAction.CAPACITACION_CURSOS]}`, item.id)
        await this.$store.dispatch(`${[editedItemAction.CAPACITACIONES_EDITED_ITEM]}`, item)
      } catch (err) {
        error = err.error ? err.error : err;
      }
      if(error) {
        this.snackbarText = error
        this.snackbar = true
      } else {
        this.$store.dispatch(`${[dc3DialogAction.DC3_DIALOG]}`, true)
      }
      this.loadingDialog = false
    },
    async onDownloadReportButtonClick(item){
      this.loadingDialog = true
      var error = null
      try {
        await this.$store.dispatch(`${[capacitacionesAction.CAPACITACION_DOWNLOAD_REPORT]}`, {id: item.id})
      } catch (err) {
        error = err.error ? err.error : err;
      }
      if(error) {
        this.snackbarText = error
        this.snackbar = true
      }
      this.loadingDialog = false
    },
    submitForm () {
      this.$refs.editarCapacitacionForm.submit()
    },
    editItem (item) {
      this.$refs.capacitacionesEditBox.open(this.$t('edit'), { height: 400 }).then( () =>
      {
        Object.assign(this.$refs.editarCapacitacionForm.editedItem, item)
        this.$refs.editarCapacitacionForm.action = capacitacionesAction.CAPACITACIONES_ACT
      })
    },
    newItem () {
      this.$refs.capacitacionesEditBox.open(this.$t('create-new'), { height: 400 }).then( () =>
      {
        this.$refs.editarCapacitacionForm.clear()
        this.$refs.editarCapacitacionForm.action = capacitacionesAction.CAPACITACIONES_NEW
      })
    },
    deleteItem (item) {
      this.$refs.deleteDialogCapacitaciones.open( this.$tc('data-table.confirm-delete', 1), this.$t('remove'), { } )
      .then((confirm) => {
        if(confirm) {
          this.deleteItemConfirm(item)
        }
      })
    },
    deleteItemConfirm (item) {
      this.$store.dispatch(`${[progBarAction.LOADING]}`, true)
      this.$store.dispatch(`${[capacitacionesAction.CAPACITACIONES_DELETE]}`, item)
      .then(() => {
        this.$store.dispatch(`${[progBarAction.LOADING]}`, false)
      })
    }
  }
}
</script>