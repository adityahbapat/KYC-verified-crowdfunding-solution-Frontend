<template>
  <div>
    <v-card-actions class="clr">
      <v-col cols="3">
        <router-link style="text-decoration: none; color: inherit" to="/">
          <v-btn text>Secure Patrons</v-btn></router-link
        >
      </v-col>
      <v-col cols="9" class="text-right">
        <v-btn class="mx-2"> How it works!</v-btn>
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

        <!-- <v-btn v-else-if="$store.state.wallet && $store.state.connected">
          {{  $store.state.accountId.substring(0,10)+"..." }}</v-btn
        > -->
        <v-menu offset-y v-else-if="$store.state.wallet && $store.state.connected">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
        outline
        class="mx-1"
          v-bind="attrs"
          v-on="on"
        >
          {{$store.state.accountId.substring(0, 10) + "..."}} <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
        >
          <v-list-item-title><v-btn>Disconnect Wallet</v-btn></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
        
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
