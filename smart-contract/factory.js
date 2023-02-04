import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x64c01253893495eAf7Ed6691f6e896812F908e22"
);

export default instance;
