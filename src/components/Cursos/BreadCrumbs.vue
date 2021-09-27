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
          text: this.$t('components.navigation-drawer.user-menu.courses'),
          disabled: true,
        }
      ]
    }
  },
}
</script>
