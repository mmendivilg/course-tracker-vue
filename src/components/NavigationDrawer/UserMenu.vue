<template>
  <v-list
    dense
    nav
  >
    <v-list-item-group
        v-model="group_menu"
      >
      <v-list-item
      key="1"
      link
      :to="{path: '/capacitaciones'}"
      >
        <v-list-item-icon>
          <v-icon>mdi-cube-scan</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ $t('components.navigation-drawer.user-menu.trainings') }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
      key="2"
      link
      :to="{path: '/clientes_empresas'}"
      >
        <v-list-item-icon>
          <v-icon>mdi-calendar-text-outline</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ $t('components.navigation-drawer.user-menu.companies') }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
      key="3"
      link
      :to="{path: '/cursos'}"
      >
        <v-list-item-icon>
          <v-icon>mdi-calendar-text-outline</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ $t('components.navigation-drawer.user-menu.courses') }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
      key="4"
      link
      :to="{path: '/capacitadores'}"
      >
        <v-list-item-icon>
          <v-icon>mdi-calendar-text-outline</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ $t('components.navigation-drawer.user-menu.trainers') }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
      key="5"
      link
      :to="{path: '/duraciones'}"
      >
        <v-list-item-icon>
          <v-icon>mdi-calendar-text-outline</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ $t('components.navigation-drawer.user-menu.durations') }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
import { Action as drawerAction } from '../../store/drawer/types'

export default {
  data: () => ({
    group_menu: null,
  }),
  watch: {
    group_menu: function () {
      this.$store.dispatch(`${[drawerAction.DRAWER]}`, false)
    },
  }
}
</script>

<style>
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
  cursor: pointer;
}
#nav a:hover {
  text-decoration: underline;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>