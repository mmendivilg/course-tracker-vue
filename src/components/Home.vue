<template>
  <v-container>
    <v-row>
      <v-col
        class="d-flex align-center mt-6"
        cols="12"
        sm="6"
      >
        <h4>
          {{ $t('welcome') }}
        </h4>
      </v-col>
    </v-row>
  </v-container> 
</template>

<script>
  export default {
    name: 'Home',
    // data: function () {
    //   return {
    //     text:''
    //   }
    // },
  }
</script>
