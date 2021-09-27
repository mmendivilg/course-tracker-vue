<template>
  <ValidationObserver ref="ubObs">
    <v-container
      id="curso"
    >
      <v-form>
        <ValidationProvider name="cursos.name" rules="required|max:80" v-slot="{ errors }">
          <v-text-field
            v-model="editedItem.nombre"
            :label="$t('fields.cursos.name')"
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
        nombre: null
      },
      errors: null,
      action: null,
    }
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
            nombre: this.editedItem.nombre,
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