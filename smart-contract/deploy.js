const HDWalletProvider = require("@truffle/hdwallet-provider");

const Web3 = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");
require("dotenv").config();

const provider = new HDWalletProvider(process.env.mnemonic, process.env.link);
const web3 = new Web3(provider);
const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("Attemping to deploy to accounts ", accounts[0]);

  const result = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: compiledFactory.evm.bytecode.object })
    .send({ from: accounts[0] });

  console.log("Contract deploy to ", result.options.address);
};

deploy();
