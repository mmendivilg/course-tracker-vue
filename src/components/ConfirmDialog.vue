<template>
    <v-dialog v-model="dialog" :max-width="options.width" :style="{ zIndex: options.zIndex }">
      <v-card rounded="sm" class="pa-3">
        <v-toolbar
           elevation="0"
           dense
           class="transparent"
        >
          <v-toolbar-title class="subtitle-1 font-weight-medium">{{ title }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn @click.native="cancel" icon>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-actions>
          <v-btn block @click.native="agree" depressed :color="options.color" outlined>{{ message }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    resolve: null,
    reject: null,
    message: null,
    title: null,
    options: {
      color: 'primary',
      width: 500,
      zIndex: 200
    }
  }),
  methods: {
    open(title, message, options) {
      this.dialog = true
      this.title = title
      this.message = message
      this.options = Object.assign(this.options, options)
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },
    agree() {
      this.resolve(true)
      this.dialog = false
    },
    cancel() {
      this.resolve(false)
      this.dialog = false
    }
  }
}
</script>

<style>

</style>