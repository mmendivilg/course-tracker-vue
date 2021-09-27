<template>
    <v-dialog v-model="dialog" :max-width="options.width" scrollable :style="{ zIndex: options.zIndex }">
      <v-card class="pa-3">
        <v-toolbar
           elevation="0"
           dense
           class="transparent"
        >
          <v-toolbar-title><span class="subtitle-1 font-weight-medium">{{ title }}</span></v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn @click.native="cancel" icon>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text  style="height: 160px; border 1px solid black;">
          <v-list>
            <template v-for="(child, index) in items">
              <v-list-item
                :key="'A'+index"
              >
                <v-list-item-content>
                  <v-list-item-subtitle v-html="'ID '+child.id"></v-list-item-subtitle>
                  <v-list-item-title v-html="child.nombres"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider
                v-if="index < items.length - 1"
                :key="'B'+index"
              ></v-divider>
            </template>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :color="options.color" block outlined @click.native="agree">{{ message }}</v-btn>
          <v-spacer></v-spacer>
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
    items: [],
    options: {
      color: 'info',
      width: 500,
      zIndex: 200
    }
  }),
  methods: {
    open(items, title, message, options) {
      this.dialog = true
      this.title = title
      this.message = message
      this.items = items
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