<template>
  <v-breadcrumbs :items="breadcrumbs">
  </v-breadcrumbs>
</template>

<script>

export default {
  computed: {
    breadcrumbs() {
      return [
        {
          text: this.$t('dashboard'),
          exact: true,
          disabled: false,
          to: {
            name: 'home'
          }
        },
        {
          text: 'Clientes',
          disabled: true,
        }
      ]
    }
  },
}
</script>
