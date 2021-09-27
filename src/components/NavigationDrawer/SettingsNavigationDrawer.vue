<template>
  <v-navigation-drawer 
    v-model="isSettingsDrawerActive" 
    mobile-breakpoint="960" 
    absolute temporary 
    right 
    width="300"
    overlay-opacity="0"
    >
    <v-list-item class="my-1">
      <span class="text-h5 font-weight-medium">
        {{$t('settings')}}
      </span>
      <v-spacer></v-spacer>
      <v-btn 
      icon 
      fab 
      @click="closeSettingsDrawer()"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-list-item>
    <v-divider></v-divider>
    <v-container class="py-1 pb-4">
      <v-list-item class="pl-0">
        <div class="font-weight-bold h8">
          {{$t('theme')}}
        </div>
      </v-list-item>
      <v-row align="center" justify="space-around">
        <v-btn-toggle 
        v-model="themeCurrent" 
        color="deep-purple accent-3" 
        tile group id="btnGroup" 
        mandatory>
          <v-col>
            <v-btn 
            class="capitalize" 
            active-class="colored" 
            :value="1"
            >
              <v-list-item-title>{{$t('light')}}</v-list-item-title>

              <v-list-item-icon>
                <v-icon>mdi-weather-sunny</v-icon>
              </v-list-item-icon>
            </v-btn>
          </v-col>
          <v-col>
            <v-btn 
            class="capitalize" 
            active-class="colored" 
            :value="2"
            >
              <v-list-item-title>{{$t('dark')}}</v-list-item-title>

              <v-list-item-icon>
                <v-icon>mdi-weather-night</v-icon>
              </v-list-item-icon>
            </v-btn>
          </v-col>

        </v-btn-toggle>
      </v-row>
    </v-container>
    <v-divider></v-divider>

    <v-divider></v-divider>
  </v-navigation-drawer>
</template>

<script>
import { Action as drawerAction } from '../../store/drawer/types'

export default {
  data: () => ({
    text: null,
  }),
  computed: {
    isSettingsDrawerActive : {
      get: function(){ return this.$store.getters.isSettingsDrawerActive },
      set: function(val) {
        this.$store.dispatch(`${[drawerAction.SETTINGS_DRAWER]}`, val)
      }
    },
    themeCurrent : {
      get: function(){ return !this.$vuetify.theme.dark ? 1 : 2 },
      set: function(val) {
        this.$vuetify.theme.dark = val === 1 ? false : true
      }
    },
  },
  methods: {
    closeSettingsDrawer(){
      this.$store.dispatch(`${[drawerAction.SETTINGS_DRAWER]}`, false)
    }
  }
}
</script>

<style>
.capitalize { text-transform: capitalize; }
.colored {
  background: #2196F0 !important;
  color: white !important;
}
</style>