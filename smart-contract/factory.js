import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x580530154Bf93DdFdAd2bC493a1c63C5a414689b"
);

export default instance;
