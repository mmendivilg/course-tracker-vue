<template>
  <div>
    <ValidationObserver ref="ubObs">
      <v-container
        id="capacitacion"
      >
        <v-form>
          <v-menu
            v-model="fecha_menu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
            >
            <template v-slot:activator="{ on, attrs }">
              <ValidationProvider name="capacitaciones.date" rules="required" v-slot="{ errors }">
                <v-text-field
                  v-model="formattedFecha"
                  :label="$t('fields.capacitaciones.date')"
                  :error-messages="errors"
                  :error-count=4
                  @keydown.enter="textFieldEnter"
                  v-bind="attrs"
                  readonly
                  v-on="on"
                  prepend-icon="mdi-calendar"
                ></v-text-field>
              </ValidationProvider>
            </template>
            <v-date-picker
              v-model="editedItem.fecha"
              @input="fecha_menu = false"
              :locale="$i18n.locale"
            ></v-date-picker>
          </v-menu>
          <ValidationProvider name="capacitaciones.trainers" rules="required" v-slot="{ errors }">
            <v-select
              v-model="editedItem.capacitadores"
              :items="capacitadores"
              :label="$t('fields.capacitaciones.trainers')"
              chips
              :error-messages="errors"
              multiple
              :item-text="capacitadoresFormatted"
              item-value="id"
            />
          </ValidationProvider>
          <ValidationProvider name="capacitaciones.training_type" rules="required" v-slot="{ errors }">
            <v-select
              v-model="editedItem.id_cat_tipo_capacitacion"
              :items="tipos_capacitaciones"
              :label="$t('fields.capacitaciones.training_type')"
              :error-messages="errors"
              item-text="nombre"
              item-value="id"
            />
          </ValidationProvider>
          <ValidationProvider name="capacitaciones.duration" rules="required" v-slot="{ errors }">
            <v-select
              v-model="editedItem.id_cat_duracion"
              :items="duraciones"
              :label="$t('fields.capacitaciones.duration')"
              :error-messages="errors"
              item-text="nombre"
              item-value="id"
            />
          </ValidationProvider>
          <ValidationProvider name="capacitaciones.client" rules="required" v-slot="{ errors }">
            <v-select
              v-model="editedItem.id_cliente_empresa"
              :items="clientes_empresas"
              :label="$t('fields.capacitaciones.client')"
              :error-messages="errors"
              item-text="nombre"
              item-value="id"
              @change="clienteEmpresaDialog"
            />
          </ValidationProvider>
        </v-form>
      </v-container>
    </ValidationObserver>
    <cliente-empresa-card ref="clienteEmpresaCard"/>
  </div>
</template>


<script>
import { ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
import responses from "../../util/responses";
import ClienteEmpresaCard from "../ClientesEmpresas/ClienteEmpresaCard.vue"
const reponseUtil = new responses()

setInteractionMode('eager')

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    ClienteEmpresaCard
  },
  props: {
    close: {
      type: Function,
      required: true
    },
    error: {
      type: Function,
      required: true
    },
    loading: {
      type: Function,
      required: true
    },
    fieldsRelations: {
      type: Object,
      required: false,
      default: function() {
        return {}
      }
    }
  },
  data () {
    return {
      editedItem: {
        id: null,
        fecha: '',
        capacitadores: [],
        id_cat_tipo_capacitacion: null,
        id_cat_duracion: null,
        id_cliente_empresa: null
      },
      errors: null,
      fecha_menu: false,
      cliente_empresa: {
        nombre: null,
        rfc: null,
        registro_imss: null,
        contacto: null
      },
      action: null,
    }
  },
  computed: {
    capacitadores : function(){ return this.$store.getters.getCapacitadores ?? [] },
    tipos_capacitaciones : function(){ return this.$store.getters.getTiposCapacitaciones ?? [] },
    duraciones : function(){ return this.$store.getters.getDuraciones ?? [] },
    clientes_empresas : function(){ return this.$store.getters.getClientesEmpresas ?? [] },
    formattedFecha(){
      return this.editedItem.fecha ? this.$moment(this.editedItem.fecha).format('L') : ''
    }
  },
  methods: {
    clear() {
      this.editedItem = {
        id: null,
        fecha: '',
        capacitadores: [],
        id_cat_tipo_capacitacion: null,
        id_cat_duracion: null,
        id_cliente_empresa: null
      }
      this.$refs.ubObs.reset()
    },
    textFieldEnter(e){
      e.preventDefault();
      this.submit();
    },
    clienteEmpresaDialog(id){
      var cliente_empresa_id = this.clientes_empresas.findIndex(x => x.id === id)
      this.$refs.clienteEmpresaCard.open(this.clientes_empresas[cliente_empresa_id])
    },
    capacitadoresFormatted(item){
      return (item.titulo ? item.titulo + ' ' : '') +item.nombres + ' ' + item.apellidos
    },
    submit() {
      this.$refs.ubObs.validate().then(res => {
        if(res){
          this.loading(true)
          let data = {
            id: this.editedItem.id,
            fecha: this.editedItem.fecha,
            capacitadores: this.editedItem.capacitadores,
            id_cat_tipo_capacitacion: this.editedItem.id_cat_tipo_capacitacion,
            id_cat_duracion: this.editedItem.id_cat_duracion,
            id_cliente_empresa: this.editedItem.id_cliente_empresa
          }
          this.$store.dispatch(`${[this.action]}`, data)
          .then((response, request) => {
            this.loading(false)
            this.close()
          })
          .catch(err => {
            if(err && err.response && err.response.data && err.response.data.errors) {
              this.$refs.ubObs.setErrors(reponseUtil.fix(err.response.data.errors, this.fieldsRelations))
            } else {
              this.error()
            }
            this.loading(false)
          })
        }
      })
    }
  }
}
</script>