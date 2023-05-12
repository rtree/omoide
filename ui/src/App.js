import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { goerli, polygonMumbai, scrollTestnet, optimism } from 'wagmi/chains'
import { Web3Button } from '@web3modal/react'
import { useAccount, useContract } from 'wagmi'

import './App.css';

function HomePage() {
  return <Web3Button />
}
function App() {
  const chains = [goerli, polygonMumbai, scrollTestnet, optimism]
  const projectId = '5b90bbc69d8aceaccdf7dab68ee6ae91'
  const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, version: 1, chains }),
    publicClient
  })
  const ethereumClient = new EthereumClient(wagmiConfig, chains)

  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <HomePage />
      </WagmiConfig>

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
}

export default App;
