import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accountId: null,
    connected: false,
    wallet: false,
    dirname: null,
    id: null,
    snackbar: {
      content: "",
      color: "",
      icon: "",
      isVisible: false,
    },
  },
  getters: {
    getSnackbar: (state) => {
      return state.snackbar;
    },
  },
  mutations: {
    setAccountId(state, accountId) {
      state.accountId = accountId;
    },
    setConnected(state, connected) {
      state.connected = connected;
    },
    setWallet(state, wallet) {
      state.wallet = wallet;
    },
    setSnackbar(state, payload) {
      state.snackbar = payload;
    },
    closeSnackbar(state) {
      state.snackbar.isVisible = false;
    },
  },
  actions: {},
  modules: {},
  plugins: [createPersistedState()],
});
