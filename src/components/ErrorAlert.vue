<template>
  <v-dialog 
  v-model="dialog" 
  max-width="290"
  >
    <v-card>
      <v-card-title class="headline"></v-card-title>
      <v-card-text>
        <v-icon
        large
        >
          mdi-alert
        </v-icon>
        {{$t('request-error')}}</v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          text
          @click="emitMsg"
        >
          {{$t('close')}}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
    props: {
      dialog: {
        type: Boolean,
        required: true
      }
    },
    data: function () {
      return { }
    },
    methods: {
      emitMsg(){
        this.$parent.errorDialog = false;
      }
    }
}
</script>

