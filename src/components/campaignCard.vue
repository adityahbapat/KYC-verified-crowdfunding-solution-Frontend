<template>
  <div
    @click="
      $router.push({
        path: '/campaign/' + id,
      })
    "
  >
    {{ id }}
    <v-card class="mx-auto my-12" max-width="374">
      <v-img height="250" :src="campaign[7]"></v-img>
      <v-card-title>{{ campaign[5] }}</v-card-title>
      <v-card-text>
        <div class="text-subtitle-1">By {{ campaign[4] }}</div>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-title
        >{{
          campaign[1] > 0
            ? web3.utils.fromWei(campaign[1], "ether")
            : "0, Become a Donor 😄"
        }}
        <v-span v-if="campaign[1] > 0"
          >ETH
          <span class="text-subtitle-1">
            ( $
            {{
              (web3.utils.fromWei(campaign[1], "ether") * ethPrice).toFixed(4)
            }})</span
          ></v-span
        ></v-card-title
      >

      <v-card-text style="margin-top: -20px">
        target of {{ web3.utils.fromWei(campaign[8], "ether") }}
        <span
          >( $
          {{ (web3.utils.fromWei(campaign[8], "ether") * ethPrice).toFixed(4) }}
          )</span
        >

        <v-progress-linear
          :value="
            (web3.utils.fromWei(campaign[1], 'ether') * 100) /
            web3.utils.fromWei(campaign[8], 'ether')
          "
        ></v-progress-linear>
      </v-card-text>
      <v-card-actions class="d-flex justify-center"
        ><v-btn color="#9c77e0" style="width: 100%"
          >Contribute</v-btn
        ></v-card-actions
      >
    </v-card>
  </div>
</template>

<script>
import getETHPrice from "../lib/getPrice";
import web3 from "../../smart-contract/web3";

export default {
  props: ["campaign", "id"],
  data() {
    return {
      ethPrice: "",
      web3: web3,
    };
  },
  async created() {
    this.ethPrice = await getETHPrice();
  },
};
</script>

<style lang="scss" scoped></style>
