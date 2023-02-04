<template>
  <div>
    <v-card-actions class="clr">
      <v-col>
        <router-link style="text-decoration: none; color: inherit" to="/">
          <v-btn text>Secure Patrons</v-btn></router-link
        >
      </v-col>
      <v-col class="text-right">
        <v-btn class="mx-1">Create Campaign</v-btn>
        <v-btn class="mx-1">How it works!</v-btn>
        <v-btn
          :loading="loading3"
          :disabled="loading3"
          color="blue-grey"
          class="ma-2 white--text"
          @click="loader = 'loading3'"
        >
          Connect Wallet
          <v-icon right dark> mdi-cloud-upload </v-icon>
        </v-btn>
      </v-col>
    </v-card-actions>
  </div>
</template>  

<script>
// import axios from "axios";

export default {
  data: () => ({
    loader: null,
    loading3: false,
  }),

  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    },
  },
};
</script>

<style>
.clr {
  background-color: #9c77e0;
}

.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}

@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

@-o-keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>