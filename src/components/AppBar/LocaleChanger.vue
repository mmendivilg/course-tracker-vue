<template>
  <div class="text-center locale-changer">
    <v-menu
      open-on-hover
      bottom
      offset-y
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="mx-2"
          plain
          v-bind="attrs"
          v-on="on"
        >
          <v-icon color="white">
            mdi-translate
          </v-icon>
          <v-icon small color="white">
            mdi-chevron-down
          </v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-subheader>{{ $t('components.appbar.locale-changer.languages') }}</v-subheader>
          <v-list-item-group
          color="primary"
          mandatory
          :value="this.$i18n.locale"
          >
            <v-list-item
              v-for="(lang, i) in langs"
              :key="`Lang${i}`"
              :value="lang"
              @click="changeLocale(lang)"
            >
              <v-list-item-title>{{ $t('components.appbar.locale-changer.'+lang) }}</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
      </v-list>
    </v-menu>
  </div>
</template>


<script>
import { Action as localeAction } from '../../store/locale/types'
export default {
  name: 'locale-changer',
  computed : {
    getLocale : function(){ return this.$store.getters.getLocale },
  },
  methods: {
    changeLocale(locale) {
      this.$store.dispatch(`${[localeAction.LOCALE]}`, locale)
    }
  },
  data () {
    return { 
      langs: ['en', 'es'] 
    }
  }
}
</script>