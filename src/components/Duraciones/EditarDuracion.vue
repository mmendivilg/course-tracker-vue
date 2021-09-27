<template>
  <ValidationObserver ref="ubObs">
    <v-container id="duracion">
      <v-form>
        <ValidationProvider name="duraciones.hours" :rules="{ regex: /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/, required: true }" v-slot="{ errors }">
          <v-text-field
            v-model="editedItem.horas"
            :label="$t('fields.duraciones.labels.hours')"
            :error-messages="errors"
            :error-count=4
            @keydown.enter="textFieldEnter"
          ></v-text-field>
        </ValidationProvider>
        <ValidationProvider name="duraciones.name" rules="required|max:80" v-slot="{ errors }">
          <v-text-field
            v-model="editedItem.nombre"
            :label="$t('fields.duraciones.labels.name')"
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
import responses from '../../util/responses'
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
        horas: null,
        nombre: null
      },
      errors: null,
      action: null
    }
  },
  methods: {
    textFieldEnter(e){
      e.preventDefault()
      this.submit()
    },
    clear() {
      this.editedItem = {
        id: null,
        horas: null,
        nombre: null
      }
      this.$refs.ubObs.reset()
    },
    submit() {
      this.$refs.ubObs.validate().then(res => {
        if(res){
          this.loading(true)
          let data = {
            id: this.editedItem.id,
            nombre: this.editedItem.nombre,
            horas: this.editedItem.horas,
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