<template>
  <v-app-bar
    app
    color="darken1"
  >
    <v-progress-linear
      :active="isLoading"
      indeterminate
      absolute
      top
      background-color="primary"
    ></v-progress-linear>
    
    <span v-if="isLoggedIn">
      <v-app-bar-nav-icon color="white" @click.stop="toggleDrawer"></v-app-bar-nav-icon>
    </span>
    <div class="d-flex align-center" @click="$router.push({ path: '/' })" style="cursor: pointer">
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="@/assets/logo_light.png/"
        transition="scale-transition"
        width="40"
        @click="$router.push({ path: '/login' })"
      />

    </div>

    <v-spacer></v-spacer>
    <v-btn
    plain
    @click.stop="toggleSettingsDrawer"
    icon
    color="white"
    >
      <v-icon>mdi-cog-outline</v-icon>
    </v-btn>

    <locale-changer/>

    <span v-if="!isLoggedIn">
      <v-btn @click="$router.push({ path: '/login' })" text color="white">
        {{ $t('components.appbar.login') }}
      </v-btn>
    </span>

    <span v-if="isLoggedIn">
      <user-menu/>
    </span>
  </v-app-bar>
</template>

<script>
import { Action as drawerAction } from '../../store/drawer/types'
import LocaleChanger from './LocaleChanger.vue'
import UserMenu from './UserMenu.vue'
export default {
  name: 'AppBar',
  components: {
    LocaleChanger,
    UserMenu
  },
  computed : {
    isLoggedIn : function(){ return this.$store.getters.isLoggedIn },
    isLoading : function(){ return this.$store.getters.isLoading },
    isDrawerActive : function(){ return this.$store.getters.isDrawerActive },
    isSettingsDrawerActive : function(){ return this.$store.getters.isSettingsDrawerActive },
  },
  methods: {
    toggleDrawer() {
      this.$store.dispatch(`${[drawerAction.DRAWER]}`, !this.isDrawerActive)
    },
    toggleSettingsDrawer() {
      this.$store.dispatch(`${[drawerAction.SETTINGS_DRAWER]}`, !this.isSettingsDrawerActive)
    }
  }
}
</script>

