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
      <div class="d-flex justify-space-between align-center">
        <v-btn text @click="$router.push({ path: '/campaign/' + campaignId })"
          ><v-icon left> mdi-backburger </v-icon> Back to campaign</v-btn
        >
        <h4>
          Campaign Balance:
          <span class="value"
            >{{ web3.utils.fromWei(campaignDetails[1], "ether") }} ETH (~ ${{
              (
                web3.utils.fromWei(campaignDetails[1], "ether") * ethPrice
              ).toFixed("4")
            }})</span
          >
        </h4>
      </div>
      <div class="d-flex justify-space-between align-center my-5">
        <h2>Withdrawal request for campaign: {{ campaignDetails[5] }}</h2>
        <v-btn @click="$router.push({ path: '/createRequest/' + campaignId })"
          ><v-icon left> mdi-plus </v-icon> Create Request</v-btn
        >
      </div>
      <v-data-table
        :headers="headers"
        :items="requestList"
        :items-per-page="5"
        class="elevation-1"
      >
        <template v-slot:[`item.value`]="row">
          {{ web3.utils.fromWei(row.item.value, "ether") }} ETH (~ ${{
            (web3.utils.fromWei(row.item.value, "ether") * ethPrice).toFixed(
              "4"
            )
          }})
        </template>
        <template v-slot:[`item.approvalCount`]="row">
          {{ row.item.approvalCount }} / {{ approversCount }}
        </template>
        <template v-slot:[`item.approve`]="item">
          <v-btn
            color="green"
            class="white--text"
            @click="approveRequest(item.index)"
            >Approve</v-btn
          >
        </template>
        <template v-slot:[`item.finalize`]="item">
          <v-btn
            color="red"
            class="white--text"
            @click="finalizeRequest(item.index)"
            >Finalize</v-btn
          >
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script>
import getETHPrice from "../lib/getPrice";
import web3 from "../../smart-contract/web3";
import Campaign from "../../smart-contract/campaign";
export default {
  data() {
    return {
      loading: false,
      campaignId: this.$route.params.id,
      campaignDetails: [],
      ethPrice: 0,
      web3: web3,
      requestCount: 0,
      approversCount: 0,
      headers: [
        {
          text: "Description",
          align: "start",
          sortable: false,
          value: "description",
        },
        { text: "Amount", value: "value" },
        { text: "Recipient", value: "recipient" },
        { text: "Approval Count", value: "approvalCount" },
        { text: "Approve", value: "approve" },
        { text: "Finalize", value: "finalize" },
      ],
      requestList: [],
    };
  },
  async created() {
    this.loading = true;
    this.ethPrice = await getETHPrice();
    try {
      const campaign = Campaign(this.campaignId);
      this.campaignDetails = await campaign.methods.getSummary().call();
      this.requestCount = await campaign.methods.getRequestsCount().call();
      this.approversCount = await campaign.methods.approversCount().call();
      const requests = await Promise.all(
        Array(parseInt(this.requestCount))
          .fill()
          .map((element, index) => {
            return campaign.methods.requests(index).call();
          })
      );
      this.requestList = requests;
      console.log(this.requestList);
    } catch (e) {
      console.log(e);
    }
    this.loading = false;
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
    async approveRequest(id) {
      console.log("id", id);
      const campaign = Campaign(this.campaignId);
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.approveRequest(id).send({
        from: accounts[0],
      });
    },
    async finalizeRequest(id) {
      const campaign = Campaign(this.campaignId);
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.finalizeRequest(id).send({
        from: accounts[0],
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
