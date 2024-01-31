require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
require('dotenv').config()
module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia : {
       url: process.env.URL,
       accounts: [process.env.KEY]
     },
   },
};


