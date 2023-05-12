import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { arbitrum, goerli, mainnet, polygon, polygonMumbai } from 'wagmi/chains'
import { Web3Button } from '@web3modal/react'

const chains = [arbitrum, mainnet, polygon, goerli, polygonMumbai]
const projectId = '5b90bbc69d8aceaccdf7dab68ee6ae91'

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)

function HomePage() {
  return <Web3Button />
}

export default function App() {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <HomePage />
      </WagmiConfig>

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  )
}