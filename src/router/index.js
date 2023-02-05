import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import SecureFundsView from "../views/SecureFundsView.vue";
import VerifyView from "../views/VerifyView.vue";
import viewCampaign from "../views/viewCampaign.vue";
import CreateCampaign from "../views/createCampaign.vue";
// import CampaignView from '../views/CampaignView.vue'
import LoginView from "../views/LoginView.vue";
import createRequests from "../views/createRequests";
import withdrawalRequests from "../views/withdrawalRequests";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/crowdfunding",
    name: "SecureFundsView",
    component: SecureFundsView,
  },
  {
    path: "/verify",
    name: "VerifyView",
    component: VerifyView,
  },
  {
    path: "/campaign/:id",
    name: "viewCampaign",
    component: viewCampaign,
  },
  {
    path: "/campaignRequests/:id",
    name: "withdrawalRequests",
    component: withdrawalRequests,
  },
  {
    path: "/createCampaign",
    name: "CreateCampaign",
    component: CreateCampaign,
  },
  {
    path: "/createRequest/:id",
    name: "createRequests",
    component: createRequests,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
