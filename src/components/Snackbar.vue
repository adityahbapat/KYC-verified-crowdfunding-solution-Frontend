<template>
  <v-snackbar
    multi-line
    v-model="$store.state.snackbar.isVisible"
    dark
    :timeout="2000"
    :color="$store.state.snackbar.color"
    top
    center
  >
    <v-layout align-center>
      <!-- <v-icon class="pr-3" dark large>{{ $store.state.snackbar.snackbar.icon }}</v-icon> -->
      <v-layout column>
        <div class="font-16">{{ $store.state.snackbar.content }}</div>
      </v-layout>
    </v-layout>
    <!-- 
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="$store.commit('closeSnackbar')">
          Close
        </v-btn>
      </template> -->
  </v-snackbar>
</template>
<script>
export default {
  name: "Snackbar",
  computed: {},
};
</script>
