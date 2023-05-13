/* global NDEFReader */
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { goerli, polygonMumbai, scrollTestnet, optimism } from 'wagmi/chains'
import { Web3Button } from '@web3modal/react'
import './App.css';
import { useAccount } from 'wagmi'
import Web3 from "web3";
import React, { useCallback,useState,useEffect } from 'react';
import omoideArtifact from './OmoideStorage.json';
import WebFont from 'webfontloader';

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

  useEffect(() => {
    document.body.style.backgroundColor = '#1C1C1C';
    document.body.style.fontSize = '18pt';
    document.body.style.color = '#5D6D74';
    WebFont.load({
      google: {
        families: ['VT323'] // Load 'VT323' font from Google Fonts
      }
    });
    
  }, []);

  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <Web3Button />
        <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
        <Layout>
        </Layout>
        <NFCComponent>  </NFCComponent>
      </WagmiConfig>
    </>
  );
}

function Log({ logs }) {
  return (
    <div style={{ marginTop: '20px', border: '1px solid #000', padding: '10px' }}>
      <h3>Logs:</h3>
      <ul>
        {logs.map((log, index) => (
          <li key={index}>{log}</li>
        ))}
      </ul>
    </div>
  );
}
function Button({ onClick, children }) {
  const style = {
    padding: '10px 20px',
    margin: '10px',
    fontSize: '14px',
    cursor: 'pointer',
    borderRadius: '30px',
    backgroundColor: '#E8673C',
    color: 'white',
    border: 'none'
  };

  return (
    <button style={style} onClick={onClick}>
      {children}
    </button>
  );
}

function InputField({ label, multiline, ...rest }) {
  const style = {
    display: 'flex',
    flexDirection: 'column',
    margin: '10px',
    height: '300px'
  };

  const labelStyle = {
    marginBottom: '5px',
    color: 'white'
  };

  const textareaStyle = {
    fontSize: '24pt',
    height: '100%',
    backgroundColor: 'black', // Black background
    color: '#00FF00', // Green text
    fontFamily: 'VT323',
    border: 'none' // Remove border
  };


  return (
    <div style={style}>
      <label style={labelStyle}>{label}</label>
      {multiline ? (
        <textarea style={textareaStyle} {...rest} />
      ) : (
        <input {...rest} />
      )}
    </div>
  );
}

function Layout() {
  const defaultText = `Dear,

  I am now typing in a garden of Lisboa. You are watching this because of my absence, right?
  - - -
  
  Thanks,`;

  return (
    <div style={{ textAlign: 'center' }}>
      <InputField type="text" multiline={true} defaultValue={defaultText} /> {/* Set defaultValue prop */}
      <Button>Save this forever onchain.</Button>
    </div>
  );
}

function NFCComponent() {
  const [logs, setLogs] = useState([]);

  const addLog = useCallback((message) => {
    setLogs((prevLogs) => [...prevLogs, message]);
  }, []);

  const scanNFC = useCallback(async () => {
    // replace all console.log calls with addLog
    if ('NDEFReader' in window) {
      const ndef = new NDEFReader();
      try {
        await ndef.scan();
        addLog("> Scan started");
        ndef.onreading = ({ message, serialNumber }) => {
          addLog(`> Serial number: ${serialNumber}`);
          for (const record of message.records) {
            addLog(`> Record type:  ${record.recordType}`);
            addLog(`> Record id:    ${record.id}`);
            addLog(`> Record data:  ${record.data}`);
          }
        };
      } catch (error) {
        addLog(`Error: ${error}`);
      }
    } else {
      addLog("> NDEFReader is not supported in this browser");
    }
  }, [addLog]);

  const writeNFC = useCallback(async () => {
    // replace all console.log calls with addLog
    if ('NDEFReader' in window) {
      const ndef = new NDEFReader();
      try {
        await ndef.write({ records: [{ recordType: "text", data: "Hello NFC" }] });
        addLog("> Write completed");
      } catch (error) {
        addLog(`Error: ${error}`);
      }
    } else {
      addLog("> NDEFReader is not supported in this browser");
    }
  }, [addLog]);

  return (
    <div style={{ textAlign: 'left', fontSize: '14pt' }}>
      <div>NFC Reader</div>
      <Button onClick={scanNFC}>Start NFC Scan</Button>
      <Button onClick={writeNFC}>Write to NFC</Button>
      <Log logs={logs} />
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