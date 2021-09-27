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
              :search="search"
              :headers="headers"
              :items="cursos"
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
                <v-toolbar-title>{{ $t('components.navigation-drawer.user-menu.courses') }}</v-toolbar-title>
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
                <confirm-dialog ref="deleteDialogCursos"/>
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
    <edit-box :submit="submitForm" ref="cursosEditBox">
      <template #body="{ close, loading, error }">
        <editar-curso 
          ref="editarCursoForm"
          :close="close"
          :loading="loading"
          :error="error"
          :fieldsRelations="fieldsRelations"
        >
        </editar-curso>
      </template>
    </edit-box>
  </div>
</template>

<script>
import { Action as cursosAction } from '../../store/cruds/cursos/cursos/types'
import { Action as progBarAction } from '../../store/prog_bar/types'
import {
    mdiPencil,
    mdiTrashCan
  } from '@mdi/js'
import EditarCurso from './EditarCurso.vue'
import BreadCrumbs from './BreadCrumbs'
import ConfirmDialog from '../ConfirmDialog.vue'
import EditBox from '../EditBox.vue'

export default {
  components: {
    EditarCurso,
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
        "nombre": "cursos.name",
      }
    }
  },
  computed: {
    cursos : function(){ 
      return this.$store.getters.getCursos ?? [] },
    headers() {
       return [ {
          text: 'ID',
          align: 'start',
          sortable: true,
          value: 'id',
        },
        { text: this.$t('fields.cursos.name'), value: 'nombre' },
        { text: this.$t('actions'), value: 'actions', sortable: false },
      ]
    }
  },
  created: function(){
    this.$store.dispatch(`${[cursosAction.CURSOS]}`)
    .then(()=> {
      this.loadingVar = false
    })
  },
  methods: {
    submitForm () {
      this.$refs.editarCursoForm.submit()
    },
    editItem (item) {
      this.$refs.cursosEditBox.open(this.$t('edit'), { height: 120 }).then( () =>
      {
        Object.assign(this.$refs.editarCursoForm.editedItem, item)
        this.$refs.editarCursoForm.action = cursosAction.CURSOS_ACT
      })
    },
    newItem () {
      this.$refs.cursosEditBox.open(this.$t('create-new'), { height: 120 }).then( () =>
      {
        this.$refs.editarCursoForm.clear()
        this.$refs.editarCursoForm.action = cursosAction.CURSOS_NEW
      })
    },
    deleteItem (item) {
      this.$refs.deleteDialogCursos.open( this.$tc('data-table.confirm-delete', 1), this.$t('remove'), { } )
      .then((confirm) => {
        if(confirm) {
          this.deleteItemConfirm(item)
        }
      })
    },
    deleteItemConfirm (item) {
      this.$store.dispatch(`${[progBarAction.LOADING]}`, true)
      this.$store.dispatch(`${[cursosAction.CURSOS_DELETE]}`, item)
      .then(() => {
        this.$store.dispatch(`${[progBarAction.LOADING]}`, false)
      })
    }
  }
}
</script>