<template>
  <v-dialog
    v-model="dialog"
    max-width="600"
    :style="{ zIndex: options.zIndex }"
  >
    <v-card>
      <v-card-title class="headline">
        {{ cliente_empresa.nombre }}
      </v-card-title>
      <v-list class="transparent">
        <v-list-item>
          <v-list-item-title class="text-left">
            {{ $t('fields.clientes-empresas.rfc') }}
          </v-list-item-title>
          <v-list-item-subtitle class="text-right">
            {{ cliente_empresa.rfc }}
          </v-list-item-subtitle>
        </v-list-item>
        <v-list-item>
          <v-list-item-title class="text-left">
            {{ $t('fields.clientes-empresas.imss-registry') }}
          </v-list-item-title>
          <v-list-item-subtitle class="text-right">
            {{ cliente_empresa.registro_imss }}
          </v-list-item-subtitle>
        </v-list-item>
        <v-list-item>
          <v-list-item-title class="text-left">
            {{ $t('fields.clientes-empresas.contact') }}
          </v-list-item-title>
          <v-list-item-subtitle class="text-right">
            {{ cliente_empresa.contacto }}
          </v-list-item-subtitle>
        </v-list-item>
        <v-list-item>
          <v-list-item-title class="text-left">
            {{ $t('fields.clientes-empresas.activities') }}
          </v-list-item-title>
          <v-list-item-subtitle class="text-right">
            {{ cliente_empresa.giro }}
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="success"
          text
          @click="close"
        >
          {{ $t('close') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    options: {
      zIndex: 200
    },
    cliente_empresa: {
      nombre: null,
      rfc: null,
      registro_imss: null,
      contacto: null,
      giro: null,
    }
  }),
  methods: {
    open(cliente_empresa, options) {
      this.options = Object.assign(this.cliente_empresa, cliente_empresa)
      this.options = Object.assign(this.options, options)
      this.dialog = true
    },
    close() {
      this.dialog = false
    }
  }
}
</script>