/* global NDEFReader */
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { goerli, polygonMumbai, scrollTestnet, optimism } from 'wagmi/chains'
import { Web3Button } from '@web3modal/react'
import './App.css';
import { useAccount } from 'wagmi'
import Web3 from "web3";
import React, { useCallback } from 'react';
import omoideArtifact from './OmoideStorage.json';

function App() {
  const chains           = [goerli, polygonMumbai, scrollTestnet, optimism]
  const projectId        = '5b90bbc69d8aceaccdf7dab68ee6ae91'
  const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, version: 1, chains }),
    publicClient
  })
  const ethereumClient = new EthereumClient(wagmiConfig, chains)
  const { account } = useAccount();

  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <Web3Button />
        <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
        <Layout>
        </Layout>
      </WagmiConfig>
    </>
  );
}

function Layout(){
  return(
    <div>
      <div>
        <button>Execute</button>
      </div>
      <div>
        Message<input type="text"></input>
      </div>
      <div>
        facePic<input type="text"></input>
      </div>
    </div>
  );
}

function NFCComponent() {
  const scanNFC = useCallback(async () => {
    if ('NDEFReader' in window) {
      const ndef = new NDEFReader();
      try {
        await ndef.scan();
        console.log("> Scan started");
        ndef.onreading = ({ message, serialNumber }) => {
          console.log(`> Serial number: ${serialNumber}`);
          for (const record of message.records) {
            console.log(`> Record type:  ${record.recordType}`);
            console.log(`> Record id:    ${record.id}`);
            console.log(`> Record data:  ${record.data}`);
          }
        };
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    } else {
      console.log("> NDEFReader is not supported in this browser");
    }
  }, []);

  return (
    <div>
      <button onClick={scanNFC}>Start NFC Scan</button>
    </div>
  );
}

export default App;

/*
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { goerli, polygonMumbai, scrollTestnet, optimism } from 'wagmi/chains'
import { Web3Button } from '@web3modal/react'
import './App.css';
import { useAccount } from 'wagmi'

import omoideArtifact from './OmoideStorage.json';
import Web3 from 'web3';

function App() {
  const chains           = [goerli, polygonMumbai, scrollTestnet, optimism]
  const projectId        = '5b90bbc69d8aceaccdf7dab68ee6ae91'
  const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, version: 1, chains }),
    publicClient
  })
  const ethereumClient = new EthereumClient(wagmiConfig, chains)
  const { account } = useAccount();

  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <Web3Button />
        <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      </WagmiConfig>
    </>
  );
}

export default App;
*/