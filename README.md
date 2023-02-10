## Secure Patrons : Crowdfunding Platform Powered by Ethereum Blockchain

### Problem Statement and Necessity
Crowdfunding is one of the most popular ways to raise funds for any project, cause or for helping any individual in need. With the onset of Covid we have seen a rise in Crowdfunding activities across the globe which includes small campaigns to help people get oxygen and medical help to large funds such as PM Cares.

The major problems with the Current Crowdfunding Platforms that we wanted to solve were :

Security:<br/>
As the funds become larger, they need to be heavily secure, although stringent measures such as symmetric encryption are in place to make e-payment safe and secure,it is still vulnerable to hacking. Blockchain — which has never been compromised yet — can provide that level of security.
Transparency and Anti-Fraud : We have seen, and continue to see a lot of crowdfunding scams happening around. There is no way to see where the funds are being used. We wanted to make the entire flow of funds transparent at every stage, so that there is no possibility of the money being misused.
Global contribution : With some of the platforms being country specific, it becomes hard for people from other countries to contribute to various campaigns. Using blockchain anyone in the world can contribute to the campaign. Transactions are quick and convenient.
We were highly inspired by the CryptoRelief initiative (www.cryptorelief.in) which raised more than ~1 billion dollars for Covid Relief in India from the entire global community, in a highly transparent manner.

A KYC (Know Your Customer) verified crowdfunding application is a platform that allows users to raise funds for projects or businesses through crowdfunding campaigns. The main difference from other crowdfunding platforms is that it requires all participants to go through a Know Your Customer (KYC) verification process.

The KYC process typically involves verifying the identity of the users, including their name, address, and other personal information. This is done to ensure that all participants in the crowdfunding campaigns are legitimate, and to minimize the risk of fraudulent activities such as money laundering or scams.

Once the KYC verification process is completed, users can participate in crowdfunding campaigns as either campaign creators or supporters. Campaign creators can create campaigns, set fundraising goals, and offer rewards to supporters. Supporters can then donate money to the campaigns they support, and receive rewards based on the amount they donate.

A KYC verified crowdfunding application provides a secure and trustworthy platform for crowdfunding activities, and can offer benefits such as increased transparency, improved regulation, and reduced risk.

We'll be using 5ire for deploying contacts and 5ire testnet. 5ire is a layer 1  blockchain ecosystem designed with economic and environmental sustainability at its core. They’re one of India’s fastest-growing unicorns, enabled by a community with people from all over the world.

### Tech Stack
Vue JS <br />
Vuetify <br />
Solidity <br />
Web3.js <br />
5ire <br />

### To run the application locally
Create .env in the main folder and add
```
VUE_APP_ENV_BACKEND=http://127.0.0.1:5000/
VUE_APP_JWT_KEY=token
```
run yarn install to install all the dependencies
run yarn dev to run the application locally

### Prerequisites to create Campaign and Contribute
Install Metamask as Google Chrome Extension and Create an account.
Request 5ire by sharing your ethereum address with them (5ire.org)

To Deploy your own Contract

### Create .env file in Ethereum directory and add these line to it.
```
mnemonic = 'Your mnemonic code'
link = 'Your 5ire end point link '
```

Do the Changes that you want to do inside the Solidity File

Compile the Contract node compile.js

Deploy Contract by going into smart-contract Directory and run. node deploy.js

Copy the contract deploy address and replace it in factory.js file.

Replace your "5ire end point link" in web3.js file

### Video Explanation of the project
https://www.youtube.com/watch?v=95f56iuBGOA
