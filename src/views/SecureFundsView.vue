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
          color="blue-grey"
          class="ma-2 white--text"
          @click="connect()"
          v-if="$store.state.wallet && !$store.state.connected"
        >
          Connect Wallet
          <v-icon v-if="!$store.state.connected" right dark>
            mdi-cloud-upload
          </v-icon>
        </v-btn>
        <v-btn v-else-if="$store.state.wallet && $store.state.connected">
          {{ $store.state.accountId }}</v-btn
        >
        <v-btn v-else>
          <v-icon>mdi-download</v-icon>
          <a
            href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
            target="_blank"
            >Install Metamask</a
          >
        </v-btn>
      </v-col>
    </v-card-actions>
  </div>
</template>

<script>
export default {
  data: () => ({}),
  methods: {
    connect() {
      if (window.ethereum) {
        window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then((data) => {
            this.$store.commit("setConnected", true);
            this.$store.commit("setAccountId", data[0]);
          });
      }
    },
    disconnect() {},
  },
  watch: {},
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
