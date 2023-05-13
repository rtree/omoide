import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { goerli, polygonMumbai, scrollTestnet, optimism } from 'wagmi/chains'
import { Web3Button } from '@web3modal/react'
import './App.css';
import { useAccount } from 'wagmi'

import omoideArtifact from './OmoideStorage.json';
import Web3 from 'web3';
/* import { useAccount, useContract } from 'wagmi' */


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
        {/* <SenderPage /> */}
        <Web3Button /> {/* Add the Web3Button here */}
      </WagmiConfig>

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
}

export default App;
