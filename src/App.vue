<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import web3 from "../smart-contract/web3";
export default {
  name: "App",

  data: () => ({
    //
  }),
  async created() {
    const accounts = await web3.eth.getAccounts();
    if(accounts.length > 0) {
      this.$store.commit("setConnected", true);
      this.$store.commit("setAccountId", accounts[0]);
    }
    if (window.ethereum) {
      this.$store.commit("setWallet", true);
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          this.$store.commit("setConnected", true);
          this.$store.commit("setAccountId", accounts[0]);
        } else {
          this.$store.commit("setConnected", false);
        }
      });
    } else {
      this.$store.commit("setWallet", false);
    }
  },
};
</script>

<style>
html {
  scroll-behavior: smooth;
}
</style>
