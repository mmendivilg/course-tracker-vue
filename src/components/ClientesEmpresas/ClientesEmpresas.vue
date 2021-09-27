<template>
  <div>
    <bread-crumbs/>
    <v-container fluid>
      <v-row>
        <v-col
          cols="12"
          md="10"
          offset-md="1"
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
              :search="search"
              :headers="headers"
              :items="clientes"
              :items-per-page="5"
              :loading="loadingVar"
              class="elevation-1"
              :footer-props="{
                itemsPerPageText: $t('data-table.footer.rows-per-page'),
                itemsPerPageAllText: $t('data-table.footer.all'),
                pageText: $t('data-table.footer.page-text')
                }"
            >

              <template v-slot:top>
              <v-toolbar dense flat color="transparent">
                <v-toolbar-title>{{ $t('components.navigation-drawer.user-menu.companies') }}</v-toolbar-title>
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
                <confirm-dialog ref="deleteDialogClientesEmpresas" />
              </v-toolbar>
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
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <edit-box :submit="submitForm" ref="clientesEmpresasEditBox">
      <template #body="{ close, loading, error }">
        <editar-cliente-empresa 
          ref="editarClienteEmpresaForm"
          :close="close"
          :loading="loading"
          :error="error"
          :fieldsRelations="fieldsRelations"
        >
        </editar-cliente-empresa>
      </template>
    </edit-box>
  </div>
</template>

<script>
import { Action as clientesEmpresasAction } from '../../store/cruds/clientes_empresas/clientes_empresas/types'
import { Action as progBarAction } from '../../store/prog_bar/types'
import { Action as empresasGirosAction } from '../../store/cat/empresas_giros/types'
import {
    mdiPencil,
    mdiTrashCan
  } from '@mdi/js'
import EditarClienteEmpresa from './EditarClienteEmpresa.vue'
import BreadCrumbs from './BreadCrumbs.vue'
import ConfirmDialog from '../ConfirmDialog.vue'
import EditBox from '../EditBox.vue'

export default {
  components: {
    EditarClienteEmpresa,
    BreadCrumbs,
    ConfirmDialog,
    EditBox
  },
  data () {
    return {
      search: '',
      icons: {
        mdiPencil,
        mdiTrashCan
      },
      marcador: {},
      loadingVar: true,
      fieldsRelations: {
        "nombre": "clientes-empresas.name",
        "rfc": "clientes-empresas.rfc",
        "registro_imss": "clientes-empresas.imss-registry",
        "contacto": "clientes-empresas.contact",
        "logotipo": "clientes-empresas.logotipo",
        "calle": "clientes-empresas.street",
        "numero": "clientes-empresas.number",
        "codigo_postal": "clientes-empresas.zip-code",
        "ciudad": "clientes-empresas.city",
        "estado": "clientes-empresas.state",
        "pais": "clientes-empresas.country",
      },
    }
  },
  computed: {
    clientes : function(){ 
      return this.$store.getters.getClientesEmpresas ?? [] 
    },
    headers() {
       return [ {
          text: 'ID',
          align: 'start',
          sortable: true,
          value: 'id',
        },
        { text: this.$t('fields.clientes-empresas.name'), value: 'nombre' },
        { text: this.$t('fields.clientes-empresas.rfc'), value: 'rfc' },
        { text: this.$t('fields.clientes-empresas.imss-registry'), value: 'registro_imss' },
        { text: this.$t('fields.clientes-empresas.contact'), value: 'contacto' },
        { text: this.$t('actions'), value: 'actions', sortable: false},
      ]
    }
  },
  async created(){
    await this.$store.dispatch(`${[empresasGirosAction.EMPRESAS_GIROS]}`)
    await this.$store.dispatch(`${[clientesEmpresasAction.CLIENTES_EMPRESAS]}`)
    .then((resp)=> {
      var promises = []
      resp.data.forEach((item) => {
        if(item.logotipo)
        promises.push(this.$store.dispatch(`${[clientesEmpresasAction.CLIENTES_EMPRESAS_DOWNLOAD_LOGO]}`, {id:item.id, logotipo:item.logotipo}))
      })
      if(promises.length>0){
        Promise.all(promises).then(data => {
          this.loadingVar = false
        })
      } else {
        this.loadingVar = false
      }
    })
  },
  methods: {
    submitForm () {
      this.$refs.editarClienteEmpresaForm.submit()
    },
    editItem (item) {
      this.$refs.clientesEmpresasEditBox.open(this.$t('edit'), { height: 400 }).then( () =>
      {
        Object.assign(this.$refs.editarClienteEmpresaForm.editedItem, item)
        this.$refs.editarClienteEmpresaForm.showLogo = !!item.id_logotipo
        this.$refs.editarClienteEmpresaForm.action = clientesEmpresasAction.CLIENTES_EMPRESAS_ACT
      })
    },
    newItem () {
      this.$refs.clientesEmpresasEditBox.open(this.$t('create-new'), { height: 400 }).then( () =>
      {
        this.$refs.editarClienteEmpresaForm.clear()
        this.$refs.editarClienteEmpresaForm.showLogo = false
        this.$refs.editarClienteEmpresaForm.action = clientesEmpresasAction.CLIENTES_EMPRESAS_NEW
      })
    },
    deleteItem (item) {
      this.$refs.deleteDialogClientesEmpresas.open( this.$tc('data-table.confirm-delete', 1), this.$t('remove'), { } )
      .then((confirm) => {
        if(confirm) {
          this.deleteItemConfirm(item)
        }
      })
    },
    deleteItemConfirm (item) {
      this.$store.dispatch(`${[progBarAction.LOADING]}`, true)
      this.$store.dispatch(`${[clientesEmpresasAction.CLIENTES_EMPRESAS_DELETE]}`, item)
      .then(() => {
        this.$store.dispatch(`${[progBarAction.LOADING]}`, false)
      })
    },
    defaultItem () {
      return Object.assign({}, this.defaultObItem) 
    }
  }
}
</script>