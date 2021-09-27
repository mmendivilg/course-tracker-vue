<template>
  <ValidationObserver ref="ubObs">
    <v-container
      id="capacitador"
    >
      <v-form>
        <ValidationProvider name="capacitadores.title" rules="max:80" v-slot="{ errors }">
          <v-text-field
            v-model="editedItem.titulo"
            :label="$t('fields.capacitadores.title')"
            :error-messages="errors"
            :error-count=4
            @keydown.enter="textFieldEnter"
          ></v-text-field>
        </ValidationProvider>
        <ValidationProvider name="capacitadores.name" rules="required|max:80" v-slot="{ errors }">
          <v-text-field
            v-model="editedItem.nombres"
            :label="$t('fields.capacitadores.name')"
            :error-messages="errors"
            :error-count=4
            @keydown.enter="textFieldEnter"
          ></v-text-field>
        </ValidationProvider>
        <ValidationProvider name="capacitadores.last-name" rules="required|max:80" v-slot="{ errors }">
          <v-text-field
            v-model="editedItem.apellidos"
            :label="$t('fields.capacitadores.last-name')"
            :error-messages="errors"
            :error-count=4
            @keydown.enter="textFieldEnter"
          ></v-text-field>
        </ValidationProvider>
        <ValidationProvider name="capacitadores.stps-registry" rules="required|max:80" v-slot="{ errors }">
          <v-text-field
            v-model="editedItem.registro_stps"
            :label="$t('fields.capacitadores.stps-registry')"
            :error-messages="errors"
            :error-count=4
            @keydown.enter="textFieldEnter"
          ></v-text-field>
        </ValidationProvider>
      </v-form>
    </v-container>
  </ValidationObserver>
</template>


<script>
import { ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
import responses from "../../util/responses";
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
        nombres: null,
        apellidos: null,
        titulo: null,
      },
      errors: null,
      action: null,
    }
  },
  methods: {
    clear() {
      this.editedItem = {
        id: null,
        nombres: null,
        apellidos: null,
        titulo: null,
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
            titulo: this.editedItem.titulo,
            registro_stps: this.editedItem.registro_stps
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