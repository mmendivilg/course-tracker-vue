<template>
  <div>
    <v-container>
      <v-avatar size="150" tile v-if="showLogo">
        <div class="remove-logo-img">
          <v-btn v-if="editedItem.id_logotipo" icon @click="deleteLogo">
            <v-icon> mdi-close-circle-outline </v-icon>
          </v-btn>
        </div>
        <img :src="logotipo" />
      </v-avatar>
      <v-avatar v-if="!showLogo" size="150" color="darken2" tile><span class="white--text">{{ $t('logo') }}</span></v-avatar>
    </v-container>
    <ValidationObserver ref="ubObs">
      <v-container
        id="cliente-empresa"
      >
        <v-form>
          <ValidationProvider name="clientes-empresas.logo" rules="image|size:2000" v-slot="{ errors }">
            <v-file-input
              v-model="logoFileInput" 
              :label="$t('fields.clientes-empresas.logo-click')"
              :error-messages="errors"
              :error-count=4
              @keydown.enter="textFieldEnter"
              @change="selectedFile"
            >
            </v-file-input>
          </ValidationProvider>
          <ValidationProvider name="clientes-empresas.name" rules="required|max:80" v-slot="{ errors }">
            <v-text-field
              v-model="editedItem.nombre"
              :label="$t('fields.clientes-empresas.name')"
              :error-messages="errors"
              :error-count=4
              @keydown.enter="textFieldEnter"
            ></v-text-field>
          </ValidationProvider>
          <ValidationProvider name="clientes-empresas.rfc" rules="max:20" v-slot="{ errors }">
            <v-text-field
              v-model="editedItem.rfc"
              :label="$t('fields.clientes-empresas.rfc')"
              :error-messages="errors"
              :error-count=4
              @keydown.enter="textFieldEnter"
            ></v-text-field>
          </ValidationProvider>
          <ValidationProvider name="clientes-empresas.imss-registry" rules="max:80" v-slot="{ errors }">
            <v-text-field
              v-model="editedItem.registro_imss"
              :label="$t('fields.clientes-empresas.imss-registry')"
              :error-messages="errors"
              :error-count=4
              @keydown.enter="textFieldEnter"
            ></v-text-field>
          </ValidationProvider>
            <ValidationProvider name="clientes-empresas.street" rules="max:80" v-slot="{ errors }">
              <v-text-field
                v-model="editedItem.calle"
                :label="$t('fields.clientes-empresas.street')"
                :error-messages="errors"
                :error-count=4
                @keydown.enter="textFieldEnter"
              >
              </v-text-field>
            </ValidationProvider>
            <ValidationProvider name="clientes-empresas.number" rules="max:80" v-slot="{ errors }">
              <v-text-field
                v-model="editedItem.numero"
                :label="$t('fields.clientes-empresas.number')"
                :error-messages="errors"
                :error-count=4
                @keydown.enter="textFieldEnter"
              >
              </v-text-field>
            </ValidationProvider>
            <ValidationProvider name="clientes-empresas.zip-code" rules="max:80" v-slot="{ errors }">
              <v-text-field
                v-model="editedItem.codigo_postal"
                :label="$t('fields.clientes-empresas.zip-code')"
                :error-messages="errors"
                :error-count=4
                @keydown.enter="textFieldEnter"
              >
              </v-text-field>
            </ValidationProvider>
            <ValidationProvider name="clientes-empresas.city" rules="max:80" v-slot="{ errors }">
              <v-text-field
                v-model="editedItem.ciudad"
                :label="$t('fields.clientes-empresas.city')"
                :error-messages="errors"
                :error-count=4
                @keydown.enter="textFieldEnter"
              >
              </v-text-field>
            </ValidationProvider>
            <ValidationProvider name="clientes-empresas.state" rules="max:80" v-slot="{ errors }">
              <v-text-field
                v-model="editedItem.estado"
                :label="$t('fields.clientes-empresas.state')"
                :error-messages="errors"
                :error-count=4
                @keydown.enter="textFieldEnter"
              >
              </v-text-field>
            </ValidationProvider>
            <ValidationProvider name="clientes-empresas.country" rules="max:80" v-slot="{ errors }">
              <v-text-field
                v-model="editedItem.pais"
                :label="$t('fields.clientes-empresas.country')"
                :error-messages="errors"
                :error-count=4
                @keydown.enter="textFieldEnter"
              >
              </v-text-field>
            </ValidationProvider>
          <ValidationProvider name="clientes-empresas.contact" rules="max:180" v-slot="{ errors }">
            <v-text-field
              v-model="editedItem.contacto"
              :label="$t('fields.clientes-empresas.contact')"
              :error-messages="errors"
              :error-count=4
              @keydown.enter="textFieldEnter"
            ></v-text-field>
          </ValidationProvider>
          <ValidationProvider name="clientes-empresas.activities" rules="" v-slot="{ errors }">
            <v-select
              v-model="editedItem.id_cat_empresa_giro"
              :items="empresas_giros"
              :label="$t('fields.clientes-empresas.activities')"
              :error-messages="errors"
              item-text="nombre"
              item-value="id"
              chips
              small-chips
              deletable-chips
            />
          </ValidationProvider>
        </v-form>
      </v-container>
    </ValidationObserver>
    <confirm-dialog ref="deleteDialogLogoClientesEmpresas"/>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
import { Action as clientesEmpresasAction } from '../../store/cruds/clientes_empresas/clientes_empresas/types'
import responses from "../../util/responses"
import ConfirmDialog from '../ConfirmDialog.vue'

const reponseUtil = new responses()
setInteractionMode('eager')

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    ConfirmDialog
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
      showLogo: false,
      logoFileInput: null,
      dialogDeleteLogo: false,
      editedItem: {
        id: null,
        nombre: null,
        rfc: null,
        registro_imss: null,
        contacto: null,
        calle: null,
        numero: null,
        codigo_postal: null,
        ciudad: null,
        estado: null,
        pais: null,
      },
      errors: null,
    }
  },
  computed: {
    logotipo: function() { return this.$store.getters.getClienteEmpresaLogotipo(this.editedItem.id) ?? [] },
    empresas_giros : function(){ return this.$store.getters.getEmpresasGiros ?? [] },
  },

  methods: {
    selectedFile(file) {
      // console.log('this.logoFileInput', this.logoFileInput)
    },
    clear() {
      this.editedItem = {
        id: null,
        nombre: null,
        rfc: null,
        registro_imss: null,
        contacto: null,
        calle: null,
        numero: null,
        codigo_postal: null,
        ciudad: null,
        estado: null,
        pais: null,
      }
      this.$refs.ubObs.reset()
    },
    textFieldEnter(e){
      e.preventDefault();
      this.submit();
    },
    deleteLogo () {
      this.$refs.deleteDialogLogoClientesEmpresas.open( this.$t('confirm-delete-logo'), this.$t('remove'), { } )
      .then((confirm) => {
        if(confirm) {
          this.deleteLogoConfirm()
        }
      })
    },
    async deleteLogoConfirm(){
      this.dialogDeleteLogo = false
      this.loading(true)
      var error = null
      try {
        await this.$store.dispatch(`${[clientesEmpresasAction.CLIENTES_EMPRESAS_DELETE_LOGO]}`, {id: this.editedItem.id})
        await this.$store.dispatch(`${[clientesEmpresasAction.CLIENTES_EMPRESAS_RELOAD]}`, {id: this.editedItem.id})
      } catch (err) {
        if(err && err.response && err.response.data && err.response.data.errors) {
          await this.$refs.ubObs.setErrors(reponseUtil.fix(err.response.data.errors, this.fieldsRelations));
        }
        error = err
      }
      if(!error){
        this.showLogo = false
      } else {
        this.error()
        this.close()
        this.logoFileInput = null
      }
      this.loading(false)
    },

    async submit(){
      let validation = await this.$refs.ubObs.validate();
      if(validation){
        this.loading(true)
        let data = {
          id: this.editedItem.id,
          nombre: this.editedItem.nombre,
          rfc: this.editedItem.rfc,
          registro_imss: this.editedItem.registro_imss,
          contacto: this.editedItem.contacto,
          id_cat_empresa_giro: this.editedItem.id_cat_empresa_giro,
          calle: this.editedItem.calle,
          numero: this.editedItem.numero,
          codigo_postal: this.editedItem.codigo_postal,
          ciudad: this.editedItem.ciudad,
          estado: this.editedItem.estado,
          pais: this.editedItem.pais,
        }

        let capacitacion_response = null
        let error = null

        try {
          capacitacion_response = await this.$store.dispatch(`${[this.action]}`, data)
        } catch (err) {
          if(err && err.response && err.response.data && err.response.data.errors) {
            await this.$refs.ubObs.setErrors(reponseUtil.fix(err.response.data.errors, this.fieldsRelations));
          }
          error = err.error
        }
        
        if(!error && this.logoFileInput){
          try {
            var logoData = {
              id: capacitacion_response.data.id,
              logotipo: this.logoFileInput
            }
            await this.$store.dispatch(`${[clientesEmpresasAction.CLIENTES_EMPRESAS_UPDATE_LOGO]}`, logoData)
            await this.$store.dispatch(`${[clientesEmpresasAction.CLIENTES_EMPRESAS_RELOAD]}`, {id:capacitacion_response.data.id})
          } catch (err) {
            error = err.error
          }
        }

        if(!error && this.logoFileInput){
          try {
            var result = await this.$store.dispatch(`${[clientesEmpresasAction.CLIENTES_EMPRESAS_DOWNLOAD_LOGO]}`, {id:capacitacion_response.data.id})
          } catch (err) {
            error = err.error
          }
        }
        if(error) {
          this.error()
        }
        this.logoFileInput = null
        this.close()
        this.loading(false)
      }
    }
  }
}
</script>

<style>
.remove-logo-img{
  position:absolute;
  top:0px;left:0px;
}
</style>