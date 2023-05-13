/* global NDEFReader */

import { Web3Button } from '@web3modal/react'
import './App.css';
import { useAccount, useChainId, useConnect, useContractRead, useContractWrite } from 'wagmi'
import React, { useCallback,useState,useEffect } from 'react';
//import omoideArtifact from './OmoideStorage.json';
import omoideArtifact from './OmoideStorage.json';
import WebFont from 'webfontloader';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, CircularProgress } from '@mui/material';

/*
function WriteComponent() {
  const chainId                  = useChainId()

  const { data, isLoading, write } = useContractWrite({
    address: omoideArtifact.networks[chainId].address,
    abi: omoideArtifact.abi,
    functionName: "storeData",
    args: ["testid","test"]
  })

  return (
    <button onClick={() => write()}>write data</button>
  )
}
*/

function Message() {
  const chainId                  = useChainId()
  const { data, isLoading, write } = useContractWrite({
    address: omoideArtifact.networks[chainId].address,
    abi: omoideArtifact.abi,
    functionName: "storeData",
    onSuccess(data){
      console.log(data);
      setOpenDialog(true);

    }
  })
  const [openDialog, setOpenDialog] = useState(false);
  const [message, setMessage] = useState(`Dear,

  I am now typing in a garden of Lisboa. You are watching this because of my absence, right?
  - - -
  
  Thanks,`);
  const onCloseDialog = ()=>{
    setOpenDialog(false); // Close the dialog
  }
  const onClick = ()=>{
    write({
      args: ["testid",message]
    }
    );
  };
  const writeNFC = useCallback(async () => {
    // replace all console.log calls with addLog
    if ('NDEFReader' in window) {
      const ndef = new NDEFReader();
      try {
        await ndef.write({ records: [{ recordType: "text", data: "Hello NFC" }] });
        //addLog("> Write completed");
      } catch (error) {
        //addLog(`Error: ${error}`);
      }
    } else {
      //addLog("> NDEFReader is not supported in this browser");
    }
  }, [onCloseDialog]);

  return (
    <div style={{ textAlign: 'center' }}>
      <InputField type="text" multiline={true} defaultValue={message} onChange={(e) => setMessage(e.target.value)} /> {/* Set defaultValue prop */}
      <Button variant="contained" sx={{ borderRadius: 2}} onClick={onClick}>Save this forever onchain.</Button>

      <Dialog open={openDialog} onClose={onCloseDialog}>
        <DialogTitle>Save keys for lovers</DialogTitle>
        <DialogContent>
          <DialogContentText>Please touch NFC tag.</DialogContentText>
          <CircularProgress></CircularProgress>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function App() {
  const { connect, }             = useConnect();
  const { address, isConnected } = useAccount();
  const chainId                  = useChainId()

  const { data } = useContractRead({
    address: omoideArtifact.networks[chainId].address,
    abi: omoideArtifact.abi,
    functionName: "getData",
    args: ["testid"]
  })

  console.log("here", address )
  console.log("chainId", chainId )
  console.log("isConnected", isConnected )
  console.log("data", data )

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
    <div>
      <Web3Button  />
      <Message />
      <NFCComponent> </NFCComponent>
    </div>
  );
}

function Log({ logs }) {
  return (
    <div style={{ marginTop: '20px', border: '1px solid #000', padding: '10px', fontSize: '10pt',height: '100px', overflow: 'auto'}}>
      <ul>
        {logs.map((log, index) => (
          <li key={index}>{log}</li>
        ))}
      </ul>
    </div>
  );
}
/*
function Button({ onClick, children }) {

  const style = {
    padding: '10px 20px',
    margin: '10px',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '12px',
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
*/
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
    <div style={{ textAlign: 'left', marginTop: '200px', border: '1px solid #000', padding: '10px' }}>
      <div>NFC</div>
      <Button onClick={scanNFC}>Start NFC Scan</Button>
      <Button onClick={writeNFC}>Write to NFC</Button>
      <Log logs={logs} />
    </div>
  );
}

export default App;
