<template>
  <v-container>
    <h3
      v-if="creating"
      class="text-center"
      style="background-color: aquamarine"
    >
      Campaign getting created please wait
    </h3>
    <div class="d-flex justify-center my-3">
      <v-card style="width: 600px; border: 3px solid #9c77e0">
        <v-container>
          <h3 class="text-center my-5">Create Campaigns</h3>

          <v-form class="my-5">
            <v-text-field
              label="Campaign Name"
              v-model="name"
              :error-messages="nameErrors"
              required
              @input="$v.name.$touch()"
              @blur="$v.name.$touch()"
            ></v-text-field>
            <v-textarea
              label="Campaign Description"
              v-model="desc"
              :error-messages="descErrors"
              required
              @input="$v.desc.$touch()"
              @blur="$v.desc.$touch()"
            ></v-textarea>
            <v-text-field
              label="Minimum Contribution Amount (ETH)"
              v-model="minAmount"
              :error-messages="minAmountErrors"
              required
              @input="$v.minAmount.$touch()"
              @blur="$v.minAmount.$touch()"
              type="number"
            ></v-text-field>
            <span v-if="minAmountInUsd">~$ {{ minAmountInUsd }}</span>
            <v-text-field
              label="Target Amount (ETH)"
              v-model="targetAmount"
              :error-messages="targetAmountErrors"
              required
              @input="$v.targetAmount.$touch()"
              @blur="$v.targetAmount.$touch()"
              type="number"
            ></v-text-field>
            <span v-if="targetAmountInUsd">~$ {{ targetAmountInUsd }}</span>
            <v-text-field
              label="Image Url"
              v-model="url"
              :error-messages="urlErrors"
              required
              @input="$v.url.$touch()"
              @blur="$v.url.$touch()"
            ></v-text-field>
            <div class="d-flex justify-center my-3">
              <v-btn
                color="#9c77e0"
                class="mx-1 black--text"
                @click="connect()"
                v-if="$store.state.wallet && !$store.state.connected"
              >
                Connect Wallet
                <v-icon v-if="!$store.state.connected" right dark>
                  mdi-cloud-upload
                </v-icon>
              </v-btn>
              <v-btn
                class="mx-1 black--text"
                v-else-if="$store.state.wallet && $store.state.connected"
                color="#9c77e0"
                @click="create()"
              >
                Create Campaign
              </v-btn>
              <v-btn v-else color="orange" class="mx-1 black--text">
                <v-icon>mdi-download</v-icon>
                <a
                  href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
                  target="_blank"
                  >Install Metamask</a
                >
              </v-btn>
            </div>
          </v-form>
        </v-container>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import getETHPrice from "../lib/getPrice";
import factory from "../../smart-contract/factory";
import web3 from "../../smart-contract/web3";
export default {
  data() {
    return {
      name: "",
      desc: "",
      minAmount: "",
      targetAmount: "",
      url: "",
      ethPrice: "",
      creating: false,
    };
  },
  mixins: [validationMixin],
  validations: {
    name: {
      required,
    },
    desc: {
      required,
    },
    minAmount: {
      required,
    },
    targetAmount: {
      required,
    },
    url: {
      required,
    },
  },
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    },
    descErrors() {
      const errors = [];
      if (!this.$v.desc.$dirty) return errors;
      !this.$v.desc.required && errors.push("Description is required.");
      return errors;
    },
    minAmountErrors() {
      const errors = [];
      if (!this.$v.minAmount.$dirty) return errors;
      !this.$v.minAmount.required && errors.push("Minimum Amount is required.");
      return errors;
    },
    targetAmountErrors() {
      const errors = [];
      if (!this.$v.targetAmount.$dirty) return errors;
      !this.$v.targetAmount.required &&
        errors.push("Target Amount is required.");
      return errors;
    },
    urlErrors() {
      const errors = [];
      if (!this.$v.url.$dirty) return errors;
      !this.$v.url.required && errors.push("Image Url is required.");
      return errors;
    },
    minAmountInUsd() {
      return this.minAmount * this.ethPrice;
    },
    targetAmountInUsd() {
      return this.targetAmount * this.ethPrice;
    },
  },
  async created() {
    this.ethPrice = await getETHPrice();
  },
  methods: {
    async create() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      try {
        this.creating = true;
        await factory.methods
          .createCampaign(
            web3.utils.toWei(this.minAmount, "ether"),
            this.name,
            this.desc,
            this.url,
            web3.utils.toWei(this.targetAmount, "ether")
          )
          .send({
            from: this.$store.state.accountId,
          });
        this.$store.commit("setSnackbar", {
          content: "Campaign Created Successfully",
          color: "success",
          isVisible: true,
        });
      } catch (err) {
        this.$store.commit("setSnackbar", {
          content: "Something went wrong",
          color: "error",
          isVisible: true,
        });
        console.log(err);
      }
      this.creating = false;
      this.$router.push({ path: "/crowdfunding" });
    },
    connect() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
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
};
</script>
<style scoped></style>
