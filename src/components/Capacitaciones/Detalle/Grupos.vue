<template>
  <v-container fluid class="mb-10">
    <bread-crumbs/>
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
          v-model="selected"
          :search="search"
          show-select
          :headers="headers"
          :items="grupos"
          :items-per-page="10"
          :loading="loadingVar"
          :loading-text="$t('loading-text')"
          :footer-props="{
            itemsPerPageText: $t('data-table.footer.rows-per-page'),
            itemsPerPageAllText: $t('data-table.footer.all'),
            pageText: $t('data-table.footer.page-text')
          }"
          :custom-sort="customSort"
          @contextmenu:row="ctxMenuShow"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar dense flat color="transparent">
              <v-toolbar-title class="pl-3">Grupos</v-toolbar-title>
              <v-divider
                class="mx-4"
                inset
                vertical
              ></v-divider>
              <!-- Only Visible in sm and larger devices -->
              <v-btn
                elevation="2"
                class="mr-3 d-none d-sm-block"
                color="primary"
                rounded
                text
                @click="importGroup"
              >
                <v-icon class="mr-2" small>mdi-plus-box-multiple</v-icon>
                {{ $t('import') }}
              </v-btn>
              <!-- Only Visible in smaller than sm devices -->
              <v-btn
                elevation="2"
                class="mr-3 d-sm-none"
                color="primary"
                fab
                small
                text
                @click="importGroup"
              >
                <v-icon>mdi-plus-box-multiple</v-icon>
              </v-btn>
              <v-btn
                icon
                v-if="selected.length"
                @click="deleteSelected"
              >
              <v-icon>mdi-trash-can</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  text
                  elevation="2"
                  @click="newItem()"
                >
                  {{ $t('components.capacitaciones.grupos.new-worker') }}
                </v-btn>
            </v-toolbar>
          </template>
          <template  v-slot:[`item.status`]="{ item }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-chip
                  class="ma-2"
                  small
                  v-if="!itemStatus(item)"
                  text-color="error"
                  color="transparent"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>
                    mdi-alert-circle-outline
                  </v-icon>
                </v-chip>
              </template>
              <span>{{$t('components.capacitaciones.grupos.missing-information')}}</span>
            </v-tooltip>
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
    <v-menu 
      v-model="ctxMenu_showMenu" 
      :position-x="ctxMenu_x" 
      :position-y="ctxMenu_y" 
      absolute offset-y transition="none"
      rounded="lg"
      >
      <v-list dense>
        <v-list-item-group
          v-model="ctxMenu_group_menu"
            >
          <v-list-item key="1" @click="editItemConfirm">
            <v-list-item-icon>
              <v-icon>mdi-pencil</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              {{ $t('edit') }}
            </v-list-item-content>
          </v-list-item>
          <v-list-item key="2" @click="dialogDelete = true">
            <v-list-item-icon>
              <v-icon>mdi-trash-can</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              {{ $t('remove') }}
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
    <confirm-dialog ref="deleteDialogGrupos" />
    <confirm-delete-many ref="deleteManyDialogGrupos" />
    <importar-grupo />
    <edit-box :submit="submitForm" ref="trabajadoresEditBox">
      <template #body="{ close, loading, error }">
        <editar-trabajador 
          ref="editarTrabajadorForm"
          :close="close"
          :loading="loading"
          :error="error"
          :fieldsRelations="fieldsRelations"
        >
        </editar-trabajador>
      </template>
    </edit-box>
  </v-container>
</template>

<script>
import BreadCrumbs from './BreadCrumbs.vue'
import { Action as gruposCapacitacionesAction } from '../../../store/cruds/capacitaciones/grupos_capacitaciones/grupos_capacitaciones/types'
import { Action as cursosAction } from '../../../store/cruds/cursos/cursos/types'
import { Action as departamentosAction } from '../../../store/cat/departamentos/types'
import { Action as puestosAction } from '../../../store/cat/puestos/types'
import { Action as subAreasOcupacionesAction } from '../../../store/cat/sub_areas_ocupaciones/types'
import EditarTrabajador from './EditarTrabajador.vue'
import { Action as progBarAction } from '../../../store/prog_bar/types'
import { Action as editDialogAction } from '../../../store/cruds/capacitaciones/grupos_capacitaciones/trabajadores/edit_dialog/types'
import { Action as trabajadoresAction } from '../../../store/cruds/capacitaciones/grupos_capacitaciones/grupos_capacitaciones/types'
import ImportarGrupo from './ImportarGrupo'
import ConfirmDialog from '../../ConfirmDialog.vue'
import ConfirmDeleteMany from '../../ConfirmDeleteMany.vue'
import EditBox from '../../EditBox'
import {
    mdiPencil,
    mdiTrashCan
  } from '@mdi/js'

export default {
  components:{
    BreadCrumbs,
    EditarTrabajador,
    ImportarGrupo,
    ConfirmDialog,
    ConfirmDeleteMany,
    EditBox
  },
  data: function () {
    return {
      search: '',
      ctxMenu_group_menu: null,
      ctxMenu_showMenu: false,
      ctxMenu_x: 0,
      ctxMenu_y: 0,
      id: null,
      selected: [],
      loadingVar: true,
      icons: {
        mdiPencil,
        mdiTrashCan
      },
      sortableColumns: {
        "curso.nombre": {
          column: "curso",
          property: "nombre"
        },
        "departamento.nombre": {
          column: "departamento",
          property: "nombre"
        },
        "puesto.nombre": {
          column: "puesto",
          property: "nombre"
        },
        "subareaocupacion.codigo_sub_area": {
          column: "subareaocupacion",
          property: "codigo_sub_area"
        }
      },
      fieldsRelations: {
        "nombres": "trabajadores.name",
        "apellidos": "trabajadores.last-name",
        "numero_colaborador": "trabajadores.worker-number.full",
        "rfc": "trabajadores.rfc",
        "aciertos": "trabajadores.right-guesses",
        "preguntas": "trabajadores.questions",
        "observaciones": "trabajadores.observations.full",
        "curso": "trabajadores.course",
        "departamento": "trabajadores.department",
        "puesto": "trabajadores.position",
        "id_cat_sub_area_ocupacion": "trabajadores.occupation-sub-area",
      }
    };
  },
  computed: {
    grupos : function(){ return this.$store.getters.getGruposCapacitaciones ?? [] },
    cursos : function(){ return this.$store.getters.getCursos ?? [] },
    ctxMenu_items() {
      return [
          { title: this.$t('edit'), icon: "mdi-pencil" },
          { title: this.$t('remove'), icon: "mdi-trash-can" },
        ]
    },
    headers() {
       return [ {
          text: 'ID',
          align: 'start',
          sortable: true,
          value: 'id',
        },
        { text: this.$t('fields.trabajadores.name'), value: 'nombrecompleto' },
        { text: this.$t('fields.trabajadores.course'), value: 'curso.nombre' },
        { text: this.$t('fields.trabajadores.worker-number.short'), value: 'numero_colaborador' },
        { text: this.$t('fields.trabajadores.department'), value: 'departamento.nombre' },
        { text: this.$t('fields.trabajadores.position'), value: 'puesto.nombre' },
        { text: this.$t('fields.trabajadores.occupation-sub-area'), value: 'subareaocupacion.codigo_sub_area' },
        { text: this.$t('fields.trabajadores.right-guesses'), value: 'aciertos' },
        { text: this.$t('fields.trabajadores.questions'), value: 'preguntas' },
        { text: this.$t('fields.trabajadores.observations.short'), value: 'observaciones' },
        { text: this.$t('status'), value: 'status' },
        { text: this.$t('actions'), value: 'actions', sortable: false },
      ]
    }
  },
  created: function(){
    Promise.all([
      this.$store.dispatch(`${[gruposCapacitacionesAction.GRUPOS_CAPACITACIONES]}`, this.$route.params.id), 
      this.$store.dispatch(`${[cursosAction.CURSOS]}`), 
      this.$store.dispatch(`${[departamentosAction.DEPARTAMENTOS]}`), 
      this.$store.dispatch(`${[subAreasOcupacionesAction.SUB_AREAS_OCUPACIONES]}`), 
      this.$store.dispatch(`${[subAreasOcupacionesAction.SUB_AREAS_OCUPACIONES_VFORMATTED]}`), 
      this.$store.dispatch(`${[puestosAction.PUESTOS]}`), 
      ]).then(data => {
      this.loadingVar = false
    })
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.setId(null, to.params.id)
    });
  },
  methods: {
    ctxMenuShow(e, item) {
      e.preventDefault();
      this.ctxMenu_group_menu = null;
      this.ctxMenu_showMenu = false;
      this.ctxMenu_x = e.clientX;
      this.ctxMenu_y = e.clientY;
      this.toEditItem = Object.assign({}, item.item)
      this.toDeleteItem = Object.assign({}, item.item)
      this.$nextTick(() => {
        this.ctxMenu_showMenu = true;
      });
    },
    customSort(items, index, isDesc) {
      items.sort((a, b) => {
        if (index[0] == "status") {
          if (!isDesc[0]) {
            return this.itemStatus(a) < this.itemStatus(b) ? -1 : 1;
          } else {
            return this.itemStatus(b) < this.itemStatus(a) ? -1 : 1;
          }
        } else if (index[0] in this.sortableColumns){
          let column = this.sortableColumns[index[0]].column
          let property = this.sortableColumns[index[0]].property
          let compareA = a[column] ? a[column][property] : ''
          let compareB = b[column] ? b[column][property] : ''
          if (!isDesc[0]) {
            return compareA < compareB ? -1 : 1;
          } else {
            return compareB < compareA ? -1 : 1;
          }
        } else {
          if (!isDesc[0]) {
            return a[index[0]] < b[index[0]] ? -1 : 1;
          } else {
            return b[index[0]] < a[index[0]] ? -1 : 1;
          }
        }
      });
      return items;
    },
    itemStatus(item){
      if (!item.curso) return false
      if (!item.numero_colaborador) return false
      if (!item.departamento) return false
      if (!item.puesto) return false
      if (!item.subareaocupacion) return false
      if (!item.aciertos) return false
      if (!item.preguntas) return false
      return true
    },
    setId(err, id) {
      if (err) {
        console.error(err);
      } else {
        this.id = id;
      }
    },
    getIds (selected) {
      var ids = []
      selected.forEach(item => {
        ids.push(item.id)
      })
      return ids
    },
    editItemConfirm() {
      this.editItem(this.toEditItem)
    },
    submitForm () {
      this.$refs.editarTrabajadorForm.submit()
    },
    editItem (item) {
      this.$refs.trabajadoresEditBox.open(this.$t('edit'), { height: 650 }).then( () =>
      {
        Object.assign(this.$refs.editarTrabajadorForm.editedItem, item)
        this.$refs.editarTrabajadorForm.action = trabajadoresAction.GRUPOS_TRABAJADORES_ACT
      })
    },
    newItem () {
      this.$refs.trabajadoresEditBox.open(this.$t('create-new'), { height: 650 }).then( () =>
      {
        this.$refs.editarTrabajadorForm.clear()
        this.$refs.editarTrabajadorForm.action = trabajadoresAction.GRUPOS_TRABAJADORES_NEW
      })
    },
    importGroup () {
      this.$store.dispatch(`${[editDialogAction.GRUPOS_IMPORT_DIALOG]}`, true)
    },
    deleteItem (item) {
      this.$refs.deleteDialogGrupos.open( this.$tc('data-table.confirm-delete', 1), this.$t('remove'), { } )
      .then((confirm) => {
        if(confirm) {
          this.deleteItemConfirm(item)
        }
      })
    },
    deleteItemConfirm (item) {
      this.$store.dispatch(`${[progBarAction.LOADING]}`, true)
      this.$store.dispatch(`${[gruposCapacitacionesAction.GRUPOS_TRABAJADORES_DELETE]}`, [item.id])
      .then(() => {
        this.$store.dispatch(`${[progBarAction.LOADING]}`, false)
      })
    },
    deleteSelected(){
      this.$refs.deleteManyDialogGrupos.open(this.selected, this.$tc('data-table.confirm-delete', this.selected.length), this.$t('remove'), { } )
      .then((confirm) => {
        if(confirm) {
          this.deleteSelectedConfirm()
        }
      })
    },
    deleteSelectedConfirm () {
      this.$store.dispatch(`${[progBarAction.LOADING]}`, true)
      this.$store.dispatch(`${[gruposCapacitacionesAction.GRUPOS_TRABAJADORES_DELETE]}`, this.getIds(this.selected))
      .then(() => {
        this.selected = []
        this.$store.dispatch(`${[progBarAction.LOADING]}`, false)
      })
    },
  }
}
</script>

<style lang="css">
.data-container {
  position: relative;
  margin: 0px;
  margin: 0px 0px 0px 10px;
}
.box-container{
    width: 100%;
    height: 100%;            
    position: absolute;
    top: 0;
    left: 0;
    padding-left: 30px;
    padding-right: 20px;
}
.stack-top{
  margin: 75px 0px 0px -30px;
}
.custom-btn {
  text-transform: none !important;
}

</style>