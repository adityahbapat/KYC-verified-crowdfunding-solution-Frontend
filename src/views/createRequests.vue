<template>
  <div>
    <v-card-actions class="clr">
      <v-col cols="3">
        <router-link style="text-decoration: none; color: inherit" to="/">
          <v-btn text>Secure Patrons</v-btn></router-link
        >
      </v-col>
      <v-col cols="9" class="text-right">
        <v-btn class="mx-1" @click="$router.push({ path: '/createCampaign' })"
          >Create Campaign</v-btn
        >
        <!-- <v-btn class="mx-2"> How it works!</v-btn> -->
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
    <v-container>
      <h3
        v-if="creating"
        class="text-center"
        style="background-color: aquamarine"
      >
        Withdraw request getting created please wait...
      </h3>
      <v-btn text @click="$router.go(-1)"
        ><v-icon left> mdi-backburger </v-icon>Back to requests</v-btn
      ><v-card class="my-5">
        <v-container>
          <v-form>
            <v-textarea label="Description" v-model="description" />
            <v-text-field label="Amount in ether" v-model="amount" />
            <span v-if="amount"
              >( ~ $ {{ (ethPrice * amount).toFixed(4) }})</span
            >
            <v-text-field
              label="Recipient Wallet Address"
              v-model="recipient"
            />
            <div class="d-flex justify-center">
              <v-btn @click="createRequest" color="#9c77e0" width="100%"
                >Create Request</v-btn
              >
            </div>
          </v-form></v-container
        >
      </v-card>
    </v-container>
  </div>
</template>

<script>
import web3 from "../../smart-contract/web3";
import Campaign from "../../smart-contract/campaign";
import getETHPrice from "../lib/getPrice";
export default {
  data() {
    return {
      description: "",
      amount: "",
      recipient: "",
      creating: false,
      ethPrice: 0,
    };
  },
  created() {
    getETHPrice().then((data) => {
      this.ethPrice = data;
    });
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
    async createRequest() {
      this.creating = true;
      const campaign = Campaign(this.$route.params.id);
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(
          this.description,
          web3.utils.toWei(this.amount, "ether"),
          this.recipient
        )
        .send({
          from: accounts[0],
        });
      this.creating = false;
      this.$router.push({ path: "/campaigns/" + this.$route.params.id });
    },
  },
};
</script>

<style lang="scss" scoped></style>
