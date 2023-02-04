import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.abi),
  "0x4F8F7222a88364c824048Dd7968F05CE9050EF4f"
);

export default instance;
