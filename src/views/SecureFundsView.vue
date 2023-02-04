<template>
  <div>
    <v-card-actions class="clr">
      <v-col cols="3">
        <router-link style="text-decoration: none; color: inherit" to="/">
          <v-btn text>Secure Patrons</v-btn></router-link
        >
      </v-col>

      <v-col cols="4" class="text-center"
        ><v-badge :color="content == 'Verified' ? 'green' : 'red'" dot 
          ><v-btn
            elevation="4"
            outlined
            rounded
            :color="content == 'Verified' ? 'green' : 'red'"
            >{{ content }}</v-btn
          ></v-badge
        >
      </v-col>
      <v-col cols="5" class="text-right">
        <v-btn
          class="mx-1 my-2"
          @click="$router.push({ path: '/createCampaign' })"
          >Create Campaign</v-btn
        >
        <v-btn class="mx-2"> How it works!</v-btn>

        <v-btn
          v-if="$store.state.wallet && !$store.state.connected"
          color="blue-grey"
          class="ma-2 white--text"
          @click="connect()"
        >
          Connect Wallet
          <v-icon v-if="!$store.state.connected" right dark>
            mdi-cloud-upload
          </v-icon>
        </v-btn>

        <v-btn
          outlined
          class="mx-1"
          v-else-if="$store.state.wallet && $store.state.connected"
        >
          {{ $store.state.accountId.substring(0, 10) + "..." }}
        </v-btn>
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
    <v-container class="my-5">
      <div v-if="loading || !campaigns">
        <div class="d-flex">
          <v-skeleton-loader
            class="mx-auto"
            width="300"
            type="card"
          ></v-skeleton-loader>
          <v-skeleton-loader
            class="mx-auto"
            width="300"
            type="card"
          ></v-skeleton-loader>
          <v-skeleton-loader
            class="mx-auto"
            width="300"
            type="card"
          ></v-skeleton-loader>
        </div>
      </div>
      <div class="d-flex" v-else>
        <campaign-card
          v-for="(campaign, index) in campaigns"
          :key="campaign[0]"
          :campaign="campaign"
          :id="campaigns[index]"
          class="mx-auto"
        ></campaign-card>
      </div>
    </v-container>
  </div>
</template>

<script>
import factory from "../../smart-contract/factory";
import web3 from "../../smart-contract/web3";
import Campaign from "../../smart-contract/campaign";
import campaignCard from "../components/campaignCard.vue";
export default {
  data: () => ({
    campaigns: undefined,
    loading: true,
    hover: false,
    content: "Not Verified",
  }),
  components: {
    campaignCard,
  },
  created() {
    this.getDeployedCampaigns();
    console.log(window.localStorage.getItem("token"));
    if (window.localStorage.getItem("token")) {
      this.content = "Verified";
    } else {
      this.content = "Not Verified";
    }
  },
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
    async getDeployedCampaigns() {
      this.loading = true;
      this.campaigns = await factory.methods.getDeployedCampaigns().call();
      this.getSummary();
    },
    async getSummary() {
      try {
        const summary = await Promise.all(
          this.campaigns.map((campaign, i) =>
            Campaign(this.campaigns[i]).methods.getSummary().call()
          )
        );
        this.campaigns = summary;
      } catch (e) {
        console.log(e);
      }
      this.loading = false;
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
