<template>
  <div class="text-center">

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
          plain
          small
          fab
          color="white"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <v-list>
        <v-list-item>
          <v-list-item-avatar>
             <v-icon
             large
             >mdi-account-circle</v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ authUserName }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
        <v-divider></v-divider>
        <v-list>
          <v-list-item-group  color="primary"
            v-model="group_avatar"
          >
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ $t('components.appbar.user-menu.my-account') }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="logout">
              <v-list-item-icon>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ $t('components.appbar.user-menu.logout') }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
  </div>
</template>


<script>
import { Action as authAction} from '../../store/auth/types'

export default {
  name: 'UserMenu',
  data: () => ({
    group_avatar: null,
  }),
  methods: {
    logout: function () {
      this.$store.dispatch(`${[authAction.LOGOUT]}`)
      .then(() => {
        this.$router.push('/login')
      })
    }
  },
  computed : {
    authUserName : function(){ return this.$store.getters.authUserName },
  },
}
</script>