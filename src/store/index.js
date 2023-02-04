import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accountId: null,
    connected: false,
    wallet: false,
  },
  getters: {},
  mutations: {
    setAccountId(state, accountId) {
      state.accountId = accountId;
    },
    setConnected(state, connected) {
      state.connected = connected;
    },
    setWallet(state, wallet) {
      state.wallet = wallet;
    }
  },
  actions: {},
  modules: {},
  plugins: [createPersistedState()],
});
