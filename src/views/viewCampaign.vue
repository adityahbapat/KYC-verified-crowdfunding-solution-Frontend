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
    <h3
      v-if="contributing"
      class="text-center"
      style="background-color: aquamarine"
    >
      Amount getting contributed please wait...
    </h3>
    <div v-if="loading">
      <v-skeleton-loader type="article, actions"></v-skeleton-loader>
      <v-skeleton-loader type="article, actions"></v-skeleton-loader>
      <v-skeleton-loader type="article, actions"></v-skeleton-loader>
    </div>
    <v-row v-else>
      <v-col cols="6">
        <v-container>
          <v-card style="border: 1px solid #9c77e0" class="mb-2">
            <v-card-title>
              Name:
              <span class="value">{{ campaignDetails[5] }}</span></v-card-title
            >
          </v-card>
          <v-card style="border: 1px solid #9c77e0" class="mb-2">
            <v-card-title>
              Description:
              <span class="value">{{ campaignDetails[6] }}</span></v-card-title
            >
          </v-card>
          <v-card style="border: 1px solid #9c77e0" class="mb-2">
            <v-card-title>
              Minimum Contribution:
              <span class="value">
                {{ web3.utils.fromWei(campaignDetails[0], "ether") }} ETH ($
                {{
                  web3.utils.fromWei(campaignDetails[0], "ether") * ethPrice
                }})
              </span></v-card-title
            >
          </v-card>
          <v-card style="border: 1px solid #9c77e0" class="mb-2">
            <v-card-title>
              Wallet Address Of Creator:
              <span class="value">{{ campaignDetails[4] }}</span></v-card-title
            >
          </v-card>
          <v-card style="border: 1px solid #9c77e0" class="mb-2">
            <v-card-title>
              Requests Count:
              <span class="value">{{ campaignDetails[2] }}</span></v-card-title
            >
          </v-card>
          <v-card style="border: 1px solid #9c77e0" class="mb-2">
            <v-card-title>
              Approvers Count:
              <span class="value">{{ campaignDetails[3] }}</span></v-card-title
            >
          </v-card>
        </v-container></v-col
      >
      <v-col cols="6">
        <v-container>
          <v-card style="background-color: rgba(156, 119, 224, 0.5)">
            <v-card-title>Campaign Balance</v-card-title>
            <v-card-subtitle>
              {{
                campaignDetails[1] > 0
                  ? web3.utils.fromWei(campaignDetails[1], "ether")
                  : "0, Become a Donor 😄"
              }}
              <span v-if="campaignDetails[1] > 0">
                ETH
                <span class="text-subtitle-1">
                  ( $
                  {{
                    (
                      web3.utils.fromWei(campaignDetails[1], "ether") * ethPrice
                    ).toFixed(4)
                  }})</span
                >
              </span>
            </v-card-subtitle>
            <v-divider></v-divider>
            <br />
            <v-card-text style="margin-top: -20px">
              target of {{ web3.utils.fromWei(campaignDetails[8], "ether") }}
              <span
                >( $
                {{
                  (
                    web3.utils.fromWei(campaignDetails[8], "ether") * ethPrice
                  ).toFixed(4)
                }}
                )</span
              >
              <br />
              <v-progress-linear
                :value="
                  (web3.utils.fromWei(campaignDetails[1], 'ether') * 100) /
                  web3.utils.fromWei(campaignDetails[8], 'ether')
                "
              ></v-progress-linear>
            </v-card-text>
          </v-card>
          <v-card
            class="my-5"
            style="background-color: rgba(156, 119, 224, 0.5); color: white"
          >
            <v-container>
              <h1>Contribute Now</h1>
              <br />
              Enter the amount of ETH you want to contribute
              <v-text-field
                label="Contribute for betterment of scoiety"
                filled
                dense
                v-model="contributionValue"
                type="number"
              ></v-text-field>
              <span
                style="margin-top: -10px !important"
                v-if="contributionValue"
                >(~ ${{ (contributionValue * ethPrice).toFixed(4) }})</span
              >
              <div class="d-flex justify-center">
                <v-btn
                  width="100%"
                  style="border: 1px solid white"
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
                  width="100%"
                  style="border: 1px solid white"
                  outlined
                  class="ma-2 white--text"
                  v-else-if="$store.state.wallet && $store.state.connected"
                  @click="contribute()"
                >
                  Contribute
                </v-btn>
                <v-btn
                  width="100%"
                  style="border: 1px solid white"
                  class="ma-2 white--text"
                  v-else
                >
                  <v-icon>mdi-download</v-icon>
                  <a
                    href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
                    target="_blank"
                    >Install Metamask</a
                  >
                </v-btn>
              </div>
            </v-container>
          </v-card>
          <v-card
            style="background-color: rgba(156, 119, 224, 0.5); color: white"
          >
            <v-container>
              <br />
              <div class="d-flex justify-center">
                <v-btn
                  light
                  width="100%"
                  @click="
                    $router.push({
                      path: '/campaignRequests/' + campaignId,
                    })
                  "
                  >View Withdrwal Requests</v-btn
                >
              </div>
              <br />
              <p>
                * You can see where these funds are being used & if you have
                contributed you can also approve those Withdrawal Requests :)
              </p>
            </v-container>
          </v-card>
        </v-container>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import getETHPrice from "../lib/getPrice";
import web3 from "../../smart-contract/web3";
import Campaign from "../../smart-contract/campaign";

export default {
  data() {
    return {
      campaignId: this.$route.params.id,
      campaignDetails: undefined,
      web3: web3,
      loading: true,
      contributionValue: null,
      contributing: false,
    };
  },
  async created() {
    this.loading = true;
    this.ethPrice = await getETHPrice();
    try {
      const campaign = Campaign(this.campaignId);
      this.campaignDetails = await campaign.methods.getSummary().call();
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
    async contribute() {
      this.contributing = true;
      try {
        const campaign = Campaign(this.campaignId);
        await campaign.methods.contibute().send({
          from: this.$store.state.accountId,
          value: web3.utils.toWei(this.contributionValue, "ether"),
        });
        this.$store.commit("setSnackbar", {
          content: "Amount Contributed Successfully",
          color: "success",
          isVisible: true,
        });
        this.$router.push({ path: "/crowdfunding" });
      } catch (err) {
        this.$store.commit("setSnackbar", {
          content: "Something went wrong",
          color: "error",
          isVisible: true,
        });
        console.log(err);
      }
      this.contributing = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
<style>
.v-card {
  border-radius: 10px !important;
}
.value {
  font-size: 1.25rem;
  font-weight: 500;
  margin-left: 5px;
  color: grey;
}
</style>
