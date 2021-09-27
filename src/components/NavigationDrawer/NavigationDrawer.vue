<template>
  <v-navigation-drawer
      v-model="isDrawerActive"
      mobile-breakpoint="960"
      temporary
      app
      style="position:fixed; top:0; left:0; overflow-y:scroll;"
    >
     <v-list-item>
        <v-list-item-content>
          <v-container>
            <v-row justify="space-around">
                <v-img
                  alt="Course Tracker Logo"
                  class="shrink"
                  contain
                  src="@/assets/logo_horiz_100_27.png/"
                  width="100"
                />
            </v-row>
          </v-container>
          <v-list-item-subtitle>
            Virtual Management
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <span v-if="isLoggedIn">
        <user-menu/>
      </span>
    </v-navigation-drawer>
</template>

<script>
import { Action as drawerAction } from '../../store/drawer/types'
import UserMenu from './UserMenu.vue'

export default {
  components: {
      UserMenu
  },
  computed: {
    isLoggedIn : function(){ return this.$store.getters.isLoggedIn },
    isDrawerActive : {
      get: function(){ return this.$store.getters.isDrawerActive },
      set: function(val) {
        this.$store.dispatch(`${[drawerAction.DRAWER]}`, val)
      }
    }
  }
}
</script>