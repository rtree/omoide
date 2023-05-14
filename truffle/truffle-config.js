require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');
const { INFURA_API_KEY, MNEMONIC, LOCAL_MNEMONIC } = process.env;

module.exports = {
  networks: {
    local: {
      host: "172.25.48.1",
      port: 7545,
      network_id: "1337"
    },
    goerli: {
      provider: () => new HDWalletProvider(MNEMONIC, INFURA_API_KEY),
      network_id: '5',
      gas: 4465030,
      //gasPrice: 10000000000,
    },
    optimism: {
      provider: () => new HDWalletProvider(MNEMONIC, `https://opt-mainnet.g.alchemy.com/v2/zA7CaIEZafNN_hS2broBUYvuMvb3ed5U`),
      network_id: '10'
      //gas: 4465030,
      //gasPrice: 10000000000,
    },
    mumbai: {
      provider: () => new HDWalletProvider(MNEMONIC, `https://rpc-mumbai.maticvigil.com`),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
      },
      scrollAlpha: {
        provider: () => new HDWalletProvider(MNEMONIC, `https://alpha-rpc.scroll.io/l2`),
        network_id: 534353,
        confirmations: 2,
        },
    },
  mocha: {
    // timeout: 100000
  },      
  compilers: {
    solc: {
    version: "0.8.13",
    }
  }
};
