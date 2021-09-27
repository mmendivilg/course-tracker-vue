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
              :items="capacitadores"
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
                <v-toolbar-title>Capacitadores</v-toolbar-title>
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
                <confirm-dialog ref="deleteDialogCapacitadores" />
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
    <edit-box :submit="submitForm" ref="capacitadoresEditBox">
      <template #body="{ close, loading, error }">
        <editar-capacitador 
          ref="editarCapacitadorForm"
          :close="close"
          :loading="loading"
          :error="error"
          :fieldsRelations="fieldsRelations"
        >
        </editar-capacitador>
      </template>
    </edit-box>
  </div>
</template>

<script>
import { Action as capacitadoresAction } from '../../store/cruds/capacitadores/capacitadores/types'
import { Action as progBarAction } from '../../store/prog_bar/types'
import {
    mdiPencil,
    mdiTrashCan
  } from '@mdi/js'
import EditarCapacitador from './EditarCapacitador.vue'
import EditBox from '../EditBox.vue'
import BreadCrumbs from './BreadCrumbs.vue'
import ConfirmDialog from '../ConfirmDialog.vue'

export default {
  components: {
    EditarCapacitador,
    EditBox,
    BreadCrumbs,
    ConfirmDialog
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
        "titulo": "capacitadores.title",
        "nombres": "capacitadores.name",
        "apellidos": "capacitadores.last-name",
        "registro_stps": "capacitadores.stps-registry",
      }
    }
  },
  computed: {
    capacitadores : function(){ 
      return this.$store.getters.getCapacitadores ?? [] },
    headers() {
       return [ {
          text: 'ID',
          align: 'start',
          sortable: true,
          value: 'id',
        },
        { text: this.$t('fields.capacitadores.name'), value: 'nombres' },
        { text: this.$t('fields.capacitadores.last-name'), value: 'apellidos' },
        { text: this.$t('fields.capacitadores.title'), value: 'titulo' },
        { text: this.$t('fields.capacitadores.stps-registry'), value: 'registro_stps' },
        { text: this.$t('actions'), value: 'actions', sortable: false},
      ]
    }
  },
  created: function(){
    this.$store.dispatch(`${[capacitadoresAction.CAPACITADORES]}`)
    .then(()=> {
      this.loadingVar = false
    })
  },
  methods: {
    submitForm () {
      this.$refs.editarCapacitadorForm.submit()
    },
    editItem (item) {
      this.$refs.capacitadoresEditBox.open(this.$t('edit'), { height: 330 }).then( () =>
      {
        Object.assign(this.$refs.editarCapacitadorForm.editedItem, item)
        this.$refs.editarCapacitadorForm.action = capacitadoresAction.CAPACITADORES_ACT
      })
    },
    newItem () {
      this.$refs.capacitadoresEditBox.open(this.$t('create-new'), { height: 330 }).then( () =>
      {
        this.$refs.editarCapacitadorForm.clear()
        this.$refs.editarCapacitadorForm.action = capacitadoresAction.CAPACITADORES_NEW
      })
    },
    deleteItem (item) {
      this.$refs.deleteDialogCapacitadores.open( this.$tc('data-table.confirm-delete', 1), this.$t('remove'), { } )
      .then((confirm) => {
        if(confirm) {
          this.deleteItemConfirm(item)
        }
      })
    },
    deleteItemConfirm (item) {
      this.$store.dispatch(`${[progBarAction.LOADING]}`, true)
      this.$store.dispatch(`${[capacitadoresAction.CAPACITADORES_DELETE]}`, item)
      .then(() => {
        this.$store.dispatch(`${[progBarAction.LOADING]}`, false)
      })
    },
  }
}
</script>