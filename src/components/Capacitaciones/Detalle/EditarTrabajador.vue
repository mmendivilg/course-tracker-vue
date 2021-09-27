<template>
  <ValidationObserver ref="ubObs">
    <v-container
      id="capacitador"
    >
      <v-form>
        <ValidationProvider name="trabajadores.name" rules="required|max:100" v-slot="{ errors }">
          <v-text-field
            v-model="editedItem.nombres"
            :label="$t('fields.trabajadores.name')"
            :error-messages="errors"
            :error-count=4
            @keydown.enter="textFieldEnter"
          ></v-text-field>
        </ValidationProvider>
        <ValidationProvider name="trabajadores.last-name" rules="required|max:100" v-slot="{ errors }">
          <v-text-field
            v-model="editedItem.apellidos"
            :label="$t('fields.trabajadores.last-name')"
            :error-messages="errors"
            :error-count=4
            @keydown.enter="textFieldEnter"
          ></v-text-field>
        </ValidationProvider>
        <ValidationProvider name="trabajadores.course" rules="" v-slot="{ errors }">
          <v-combobox
            v-model="editedItem.curso"
            :items="cursos"
            :search-input.sync="search"
            hide-selected
            persistent-hint
            small-chips
            item-text="nombre"
            item-value="id" 
            :error-messages="errors"
            :label="$t('fields.trabajadores.course')"
            deletable-chips
          >
            <template v-slot:no-data>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    <span v-html="$t('no-results-matching-error', {search: search})"></span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-combobox>
        </ValidationProvider>
        <ValidationProvider name="trabajadores.worker-number.full" rules="max:80" v-slot="{ errors }">
          <v-text-field
            v-model="editedItem.numero_colaborador"
            :label="$t('fields.trabajadores.worker-number.full')"
            :error-messages="errors"
            :error-count=4
            @keydown.enter="textFieldEnter"
          ></v-text-field>
        </ValidationProvider>
        <ValidationProvider name="trabajadores.rfc" rules="max:20" v-slot="{ errors }">
          <v-text-field
            v-model="editedItem.rfc"
            :label="$t('fields.trabajadores.rfc')"
            :error-messages="errors"
            :error-count=4
            @keydown.enter="textFieldEnter"
          ></v-text-field>
        </ValidationProvider>
        <ValidationProvider name="trabajadores.right-guesses" rules="integer|max:100" v-slot="{ errors }">
          <v-text-field
            v-model="editedItem.aciertos"
            :label="$t('fields.trabajadores.right-guesses')"
            :error-messages="errors"
            :error-count=4
            @keydown.enter="textFieldEnter"
          ></v-text-field>
        </ValidationProvider>
        <ValidationProvider name="trabajadores.questions" rules="integer|max:100" v-slot="{ errors }">
          <v-text-field
            v-model="editedItem.preguntas"
            :label="$t('fields.trabajadores.questions')"
            :error-messages="errors"
            :error-count=4
            @keydown.enter="textFieldEnter"
          ></v-text-field>
        </ValidationProvider>
        <ValidationProvider name="trabajadores.observations.full" rules="max:100" v-slot="{ errors }">
          <v-text-field
            v-model="editedItem.observaciones"
            :label="$t('fields.trabajadores.observations.full')"
            :error-messages="errors"
            :error-count=4
            @keydown.enter="textFieldEnter"
          ></v-text-field>
        </ValidationProvider>
        <ValidationProvider name="trabajadores.department" rules="" v-slot="{ errors }">
          <v-combobox
            v-model="editedItem.departamento"
            :items="departamentos"
            :search-input.sync="search"
            hide-selected
            persistent-hint
            small-chips
            item-text="nombre"
            item-value="id" 
            :error-messages="errors"
            :label="$t('fields.trabajadores.department')"
            deletable-chips
          >
            <template v-slot:no-data>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    <span v-html="$t('no-results-matching-error', {search: search})"></span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-combobox>

        </ValidationProvider>
        <ValidationProvider name="trabajadores.position" rules="" v-slot="{ errors }">
          <v-combobox
            v-model="editedItem.puesto"
            :items="puestos"
            :search-input.sync="search"
            hide-selected
            persistent-hint
            small-chips
            item-text="nombre"
            item-value="id" 
            :error-messages="errors"
            :label="$t('fields.trabajadores.position')"
            deletable-chips
          >
            <template v-slot:no-data>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    <span v-html="$t('no-results-matching-error', {search: search})"></span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-combobox>
        </ValidationProvider>
        <ValidationProvider name="trabajadores.occupation-sub-area" rules="" v-slot="{ errors }">
          <v-select
            v-model="editedItem.id_cat_sub_area_ocupacion"
            :items="sub_areas_ocupaciones"
            :label="$t('fields.trabajadores.occupation-sub-area')"
            :error-messages="errors"
            item-text="nombre"
            item-value="id"
            clearable
            small-chips
            deletable-chips
          />
        </ValidationProvider>
      </v-form>
    </v-container>
  </ValidationObserver>
</template>


<script>
import { ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
import responses from "../../../util/responses";
const reponseUtil = new responses()

setInteractionMode('eager')

export default {
  components: {
    ValidationProvider,
    ValidationObserver
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
        nombres: '',
        apellidos: '',
        titulo: '',
      },
      errors: null,
      action: null,
      search: null,
    }
  },
  computed: {
    cursos : function(){ return this.$store.getters.getCursos ?? [] },
    puestos : function(){ return this.$store.getters.getPuestos ?? [] },
    departamentos : function(){ return this.$store.getters.getDepartamentos ?? [] },
    sub_areas_ocupaciones : function(){ return this.$store.getters.getSubAreasOcupacionesVformatted ?? [] },
  },
  methods: {
    clear() {
      this.editedItem = {
        id: null,
        nombre: null
      }
      this.$refs.ubObs.reset()
    },
    textFieldEnter(e){
      e.preventDefault();
      this.submit();
    },
    submit() {
      this.$refs.ubObs.validate().then(res => {
        if(res){
          this.loading(true)
          let data = {
            id: this.editedItem.id,
            nombres: this.editedItem.nombres,
            apellidos: this.editedItem.apellidos,
            numero_colaborador: this.editedItem.numero_colaborador,
            rfc: this.editedItem.rfc,
            id_capacitacion: parseInt(this.$route.params.id),
            aciertos: this.editedItem.aciertos,
            preguntas: this.editedItem.preguntas,
            observaciones: this.editedItem.observaciones,
            curso: this.editedItem.curso,
            departamento: this.editedItem.departamento,
            puesto: this.editedItem.puesto,
            id_cat_sub_area_ocupacion: this.editedItem.id_cat_sub_area_ocupacion,
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