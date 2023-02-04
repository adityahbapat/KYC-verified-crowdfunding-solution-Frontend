import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  console.log("we are in the browser and meta mask is installed");
  web3 = new Web3(window.ethereum);
} else {
  console.log("we are on the server *OR* meta mask is not running");
  const provider = new Web3.providers.HttpProvider(
    "https://chain-node.5ire.network/"
  );
  web3 = new Web3(provider);
}

export default web3;
