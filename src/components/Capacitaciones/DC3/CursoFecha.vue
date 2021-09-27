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
          :label="$t('fields.capacitaciones.dc-3.date-range')"
          readonly
          prepend-icon="mdi-calendar"
          v-bind="attrs"
          v-on="on"
          class="px-4"
          clearable
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="fechas_new"
        :locale="$i18n.locale"
        range
      >
        <v-spacer></v-spacer>
        <v-btn
          text
          color="primary"
          @click="fecha_menu = false"
        >
          OK
        </v-btn>
      </v-date-picker>
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
      v-model="capacitadores_new"
      :items="capacitadores"
      :label="$t('fields.capacitaciones.trainers')"
      chips
      small-chips
      deletable-chips
      multiple
      :item-text="capacitadoresFormatted"
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
    fechas: {
      type: Array,
      required: true,
      default: function() {
        return []
      }
    },
    duracion: {
      type: Number,
      required: false
    },
    capacitadores_p: {
      type: Array,
      required: true,
      default: function() {
        return []
      }
    },
  },
  data: function () {
    return { 
      fecha_menu: false,
      id_cat_duracion: null,
      fechas_new: [],
      capacitadores_new: []
    }
  },
  created () {
    this.fechas_new = [...this.fechas]
    this.id_cat_duracion = this.duracion
    this.capacitadores_new = [...this.capacitadores_p]
  },
  methods: {
    formatDate(fecha){
      return fecha ? this.$moment(fecha).format('L') : ''
    },
    capacitadoresFormatted(item){
      return (item.titulo ? item.titulo + ' ' : '') +item.nombres + ' ' + item.apellidos
    },
  },
  computed: {
    duraciones : function(){ return this.$store.getters.getDuraciones ?? [] },
    capacitadores : function(){ return this.$store.getters.getCapacitadores ?? [] },
    formattedFecha: {
      get: function () {
        return this.fechas_new.map( fecha => this.formatDate(fecha) ).join(' - ')
      },
      set: function (fechas) {
        this.fechas_new = []
      }
    }
  }
}
</script>