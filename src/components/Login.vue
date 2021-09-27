<template>
  <v-container fluid>
    <v-row>
      <v-col
        cols="12"
        md="6"
        offset-md="3"
      >
        <v-card>
          <ValidationObserver ref="obs">
            <v-container
              id="login"
              fluid
            >
              <v-form @keyup.native.enter="login">
                <v-row>
                  <v-col cols="12">
                    <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
                      <v-text-field
                        v-model="var_email"
                        :label="$t('components.login.email')"
                        :error-messages="errors"
                        prepend-icon="mdi-mail"
                        required
                      ></v-text-field>
                    </ValidationProvider>
                    <ValidationProvider name="password" rules="required" v-slot="{ errors }">
                      <v-text-field
                        v-model="var_password"
                        :error-messages="errors"
                        :label="$t('components.login.password')"
                        type="password"
                        required
                      ></v-text-field>
                    </ValidationProvider>
                    <v-btn
                      @click="login"
                    >
                    {{ $t('components.appbar.login') }}
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
          </ValidationObserver>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
import { Action as authAction } from '../store/auth/types'
import { Action as progAction } from '../store/prog_bar/types'

setInteractionMode('eager')

export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data(){
    return {
      var_email : "john@doe.com",
      var_password : "johnd123",
      errors: null,
    }
  },
  methods: {
    login() {
      this.$refs.obs.validate().then(res => {
        if(res){
          this.$store.dispatch(`${[progAction.LOADING]}`, true)
          let email = this.var_email
          let password = this.var_password
          this.$store.dispatch(`${[authAction.LOGIN]}`, { email, password })
          .then(() => this.$router.push('/'))
          .catch(err => {
            this.$refs.obs.setErrors(err.response.data.errors);
          })
          .finally(() => {
            this.$store.dispatch(`${[progAction.LOADING]}`, false)
          })
        }
      })
    }
  }
}
</script>