import omoideArtifact from "./truffle/build/contracts/OmoideStorage.json";
import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";

let web3;
let account;
let contract;

async function initialize() {
    const provider = new WalletConnectProvider({
        rpc: {
            80001: 'https://rpc-mumbai.maticvigil.com/', // For Mumbai Testnet, use this RPC
        },
        chainId: 80001, // This is the chainId for Mumbai Testnet
    });
    
    await provider.enable();

    web3 = new Web3(provider);

    account = (await web3.eth.getAccounts())[0];
      
    const contractAbi = omoideArtifact.abi;
    const contractAddress = omoideArtifact.networks[1337].address;

    contract = new web3.eth.Contract(contractAbi, contractAddress);

    document.getElementById("data-form").addEventListener("submit", storeData);
}

async function storeData(event) {
    event.preventDefault();

    const uuid = document.getElementById("uuid").value;
    const message = document.getElementById("message").value;
    const profilePic = document.getElementById("pic").value;

    const dataHash = web3.utils.keccak256(message + profilePic);
    const dataSignature = web3.eth.accounts.sign(dataHash, account).signature;

    const result = await contract.methods.storeData(uuid, message, profilePic, dataHash, dataSignature).send({ from: account });

    console.log(result);
}

window.onload = initialize;
