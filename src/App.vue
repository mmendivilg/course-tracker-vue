<template>
  <v-app>
    <navigation-drawer/>
    <settings-navigation-drawer/>
    <app-bar/>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import { Action as authAction } from './store/auth/types'
import NavigationDrawer from './components/NavigationDrawer/NavigationDrawer.vue'
import SettingsNavigationDrawer from './components/NavigationDrawer/SettingsNavigationDrawer.vue'
import AppBar from './components/AppBar/AppBar.vue'
import store from './store'
import router from './router'

export default {
  name: 'App',
  components: {
    NavigationDrawer,
    SettingsNavigationDrawer,
    AppBar,
  },
  created: function () {
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function () {
        if (err.response && err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
          store.dispatch(`${[authAction.LOGOUT]}`)
          router.push('/login')
        }
        throw err;
      });
    });
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
.v-navigation-drawer {
z-index: 999999 !important;
}
.v-menu {
z-index: 999999 !important;
}
body {
  overflow-x: hidden;
}
</style>
