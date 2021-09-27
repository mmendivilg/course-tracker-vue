<template>
  <div>
    <v-dialog
        v-model="dialog"
        @keydown.esc="dialog = false"
        transition="dialog-bottom-transition"
        max-width="600px"
        persistent
        overlay-color="primary lighten-4"
        scrollable
        :style="{ zIndex: options.zIndex }"
      >
        <v-card class="pt-2 pb-1">
          <v-toolbar elevation="0">
            <v-toolbar-title class="primary--text mx-1">
              {{ title }}
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              class="mx-1"
              :disabled="loader" 
              text
              icon
              @click="close"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text :style="{ height: `${options.height}px` }">
            <slot 
              name="body" 
              :close="close" 
              :loading="loading" 
              :error="error"
            ></slot>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn 
              color="primary" 
              @click.native="agree"
              :loading="loader" 
              :disabled="loader" 
              outlined
            >{{ $t('save') }}</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
    <error-alert :dialog="errorDialog"></error-alert>
  </div>
</template>

<script>
import ErrorAlert from './ErrorAlert.vue'
export default {
  components: {
    ErrorAlert
  },
  props: {
    submit: {
      type: Function,
      required: true
    },
  },
  data: () => ({
    dialog: false,
    errorDialog: false,
    title: null,
    loader: false,
    options: {
      height: 200,
      zIndex: 200
    },
    resolve: null,
  }),
  updated() {
    if(this.resolve){
      this.resolve()
    }
  },
  methods: {
    open(title, options) {
      this.dialog = true
      this.title = title
      this.options = Object.assign(this.options, options)
      return new Promise((resolve, reject) => {
        this.resolve = resolve
      })
    },
    agree() {
      this.submit()
    },
    close() {
      this.dialog = false
    },
    error() {
      this.errorDialog = true
    },
    loading(value) {
      this.loader = value
    }    
  }
}
</script>
