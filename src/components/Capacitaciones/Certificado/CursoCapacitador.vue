<template>
  <v-card outlined>
    <v-card-title>{{ curso.nombre }}</v-card-title>
    <v-menu
      v-model="fecha_menu"
      :close-on-content-click="false"
      :nudge-right="40"
      transition="scale-transition"
      offset-y
      min-width="auto"
      @keydown.esc="fecha_menu = false"
      >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="formattedFecha"
          :label="$t('fields.capacitaciones.certificate.date')"
          @keydown.enter="textFieldEnter"
          v-bind="attrs"
          readonly
          v-on="on"
          class="px-4"
          prepend-icon="mdi-calendar"
          clearable
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="fecha_new"
        @input="fecha_menu = false"
        :locale="$i18n.locale"
      ></v-date-picker>
    </v-menu>
    <v-select
      v-model="id_cat_duracion"
      :items="duraciones"
      :label="$t('fields.capacitaciones.duration')"
      item-text="nombre"
      item-value="id"
      class="px-4"
      chips
      small-chips
      deletable-chips
    />
    <v-select
      v-model="id_capacitador"
      :items="capacitadores"
      :label="$t('fields.capacitaciones.certificate.trainer')"
      chips
      small-chips
      deletable-chips
      :item-text="formatTrainer"
      item-value="id"
      class="px-4"
    />
  </v-card>
</template>

<script>
export default {
  props: {
    curso: {
      type: Object,
      required: true
    },
    fecha: {
      type: String,
      required: false
    },
    duracion: {
      type: Number,
      required: false
    },
    capacitador: {
      type: Number,
      required: false
    },
  },
  data: function () {
    return { 
      fecha_menu: false,
      id_cat_duracion: null,
      fecha_new: null,
      id_capacitador: null
    }
  },
  created () {
    this.fecha_new = this.fecha
    this.id_cat_duracion = this.duracion
    this.id_capacitador = this.capacitador
  },
  methods: {
    formatDate(fecha){
      return fecha ? this.$moment(fecha).format('L') : ''
    },
    formatTrainer(item){
      return (item.titulo ?? '') +item.nombres + ' ' + item.apellidos
    },
  },
  computed: {
    duraciones : function(){ return this.$store.getters.getDuraciones ?? [] },
    capacitadores : function(){ return this.$store.getters.getCapacitadores ?? [] },
    formattedFecha: {
      get: function () {
        return this.formatDate(this.fecha_new)
      },
      set: function (fechas) {
        this.fecha_new = null
      }
    }
  }
}
</script>