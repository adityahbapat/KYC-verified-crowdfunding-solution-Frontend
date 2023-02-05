<template>
  <div>
    <v-card-actions class="clr">
      <v-col cols="2">
        <router-link style="text-decoration: none; color: inherit" to="/">
          <v-btn text>Secure Patrons</v-btn></router-link
        >
      </v-col>

      <v-col cols="4" class="text-center"
        ><v-badge :color="content == 'Verified' ? 'green' : 'red'" dot
          ><v-btn
            elevation="4"
            rounded
            :color="content == 'Verified' ? 'green' : 'red'"
            >{{ content }}</v-btn
          ></v-badge
        >
      </v-col>
      <v-col cols="6" class="text-right">
        <v-btn
          class="mx-1 my-2"
          @click="$router.push({ path: '/createCampaign' })"
          >Create Campaign</v-btn
        >
        <v-btn class="mx-2" @click="scrollToWork()"> How it works!</v-btn>

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
        <v-btn
             class="mx-1" color="red" v-if="tkn!=null"  @click="logout()"
            >Logout</v-btn
          >
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
      <div class="d-flex" v-else style="flex-wrap: wrap;">
        <campaign-card
          v-for="(campaign, index) in campaignsList"
          :key="campaign[0]"
          :campaign="campaign"
          :id="campaigns[index]"
          class="mx-auto"
        ></campaign-card>
      </div>
    </v-container>
    <div class="working" ref="work">
      <v-container>
        <v-row>
          <v-col>
            <v-card class="mx-auto" elevation="0" tile>
              <v-img
                lazy-src="https://www.brainpulse.com/wp-content/uploads/2022/06/performance-marketing-strategy.png"
                max-height="200"
                max-width="350"
                src="https://www.brainpulse.com/wp-content/uploads/2022/06/performance-marketing-strategy.png"
              ></v-img>
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="text-overline mb-4">
                    Create a Campaign for Fundraising
                  </div>

                  <v-list-item-subtitle class="mb-1"
                    >Get yourself verified within minutes.
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>
          <v-col>
            <v-card class="mx-auto" elevation="0" tile>
              <v-img
                lazy-src="https://www.reliablesoft.net/wp-content/uploads/2020/11/digital-marketing-campaign.jpg"
                max-height="200"
                max-width="350"
                src="https://www.reliablesoft.net/wp-content/uploads/2020/11/digital-marketing-campaign.jpg"
              ></v-img>
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="text-overline mb-4">Share your Campaign</div>
                  <v-list-item-subtitle class="mb-1"
                    >All you need to do is share the Campaign with your friends,
                    family and others. In no time, support will start pouring
                    in.
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>
          <v-col>
            <v-card class="mx-auto" elevation="0" tile>
              
              <v-img
                lazy-src="https://www.instituteofcustomerservice.com/wp-content/uploads/2019/12/Online_money_mobile_480x320px.png"
                max-height="200"
                max-width="350"
                src="https://www.instituteofcustomerservice.com/wp-content/uploads/2019/12/Online_money_mobile_480x320px.png"
              ></v-img>
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="text-overline mb-4">
                    Request and Withdraw Funds
                  </div>
                  <v-list-item-subtitle class="mb-1"
                    >The funds raised can be withdrawn directly to the recipient
                    when 50% of the contributors approve of the Withdrawal
                    Request.
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import factory from "../../smart-contract/factory";
import Campaign from "../../smart-contract/campaign";
import campaignCard from "../components/campaignCard.vue";
import router from "@/router/index.js"

export default {
  data: () => ({
    campaigns: undefined,
    loading: true,
    hover: false,
    content: "Not Verified",
    campaignsList: undefined,
    tkn: null,
  }),
  components: {
    campaignCard,
  },
  created() {
    this.getDeployedCampaigns();
    console.log(window.localStorage.getItem("token"));
    if (window.localStorage.getItem("token")) {
      this.content = "Verified";
      this.tkn = localStorage.getItem('token')
    } else {
      this.content = "Not Verified";
    }
  },
  methods: {
      scrollToWork() {
      this.$refs["work"].scrollIntoView({ behavior: "smooth" });
    },
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
    logout(){
      window.localStorage.removeItem('token');
      router.push("/");
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
        this.campaignsList = summary;
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
