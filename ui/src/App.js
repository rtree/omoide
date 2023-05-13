/* global NDEFReader */

import { Web3Button } from '@web3modal/react'
import './App.css';
import { useAccount, useChainId, useConnect, useContractRead, useContractWrite } from 'wagmi'
import React, { useCallback,useState,useEffect } from 'react';
//import omoideArtifact from './OmoideStorage.json';
import omoideArtifact from './OmoideStorage.json';
import WebFont from 'webfontloader';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, CircularProgress } from '@mui/material';
import { AES  } from 'crypto-js';
import CryptoJS from 'crypto-js';

let key;
let uuid;

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function WriteComponent() {
  const chainId                  = useChainId()

  const { data, isLoading, write } = useContractWrite({
    address: omoideArtifact.networks[chainId].address,
    abi: omoideArtifact.abi,
    functionName: "storeData",
    args: ["testid","test"]
  })

  return (
    <div>
      <Button onClick={() => write()}>WRITE TO CHAIN</Button>
    </div>
  )
}

function Message() {
  key = "CVBNKFTYUHUHUIHUILHKULHULHUIbjkyukghyukVUKVYUKGBYHUIHIUl";
  const chainId                  = useChainId()
  const { data, isLoading, write } = useContractWrite({
    address: omoideArtifact.networks[chainId].address,
    abi: omoideArtifact.abi,
    functionName: "storeData",
    onSuccess(data){
      console.log(data);
      setOpenDialog(true);
      writeNFC();
    }
  })
  const [openDialog , setOpenDialog] = useState(false);
  const [openDialog2, setOpenDialog2] = useState(false);
  const [message, setMessage] = useState(`Dear,

  I am now typing in a garden of Lisboa. You are watching this because of my absence, right?

  As freely as God has given me life, I have joined my life with yours - - - 
   - - -

  Thanks,`);
  const onCloseDialog = ()=>{
    setOpenDialog(false); // Close the dialog
  }
  const onCloseDialog2 = ()=>{
    setOpenDialog2(false); // Close the dialog
  }
  const encryptMessage = (message, key) => {
    const encrypted = AES.encrypt(message, key).toString();
    return encrypted;
  };
  const decryptMessage = async (encrypted, key) => {
    console.log("decrykey:"+key);
    const decrypted = AES.decrypt(encrypted, key).toString(CryptoJS.enc.Utf8);
    return decrypted;
  };

  const onClick = async () => {
    const generatePrivateKey = async () => {
      const keyPair = await crypto.subtle.generateKey(
        {
          name: 'ECDSA',
          namedCurve: 'P-256'
        },
        true,
        ['sign', 'verify']
      );
  
      const privateKey = await crypto.subtle.exportKey('jwk', keyPair.privateKey);
      return privateKey.d;
    };

    try {
      const privateKey = await generatePrivateKey();
      console.log(privateKey);
      key = privateKey;
      uuid = generateUUID();
      console.log("pri :", key);
      console.log("uuid:", uuid);
      const encryptedMessage = encryptMessage(message, key);
      write({
        args: [uuid, encryptedMessage]
      });



      decryptMessage(encryptedMessage, key)
      .then(decryptedMessage => {
        console.log('Decrypted message:', decryptedMessage);
        // Use the decrypted message as needed
      })
      .catch(error => {
        console.error('Decryption error:', error);
      });


    } catch (error) {
      console.error(error);
    }
  };

  const writeNFC = useCallback(async () => {
    // replace all console.log calls with addLog
    if ('NDEFReader' in window) {
      console.log("write initiated");
      const ndef = new NDEFReader();
      console.log("write object created");
      try {
        const currentURL = window.location.href;
        const records = [
          {
            recordType: "url",
            data: `${currentURL}receiver/${uuid}`,
          },
          {
            recordType: "text",
            data: key,
          },
        ];
        console.log(records);
        await ndef.write({ records: records });
        console.log("write completed");
        scanNFC();
        onCloseDialog();
        setOpenDialog2(true);
      } catch (error) {
        //addLog(`Error: ${error}`);
      }
    } else {
      //addLog("> NDEFReader is not supported in this browser");
    }
  }, [onCloseDialog]);

  const scanNFC = useCallback(async () => {
    // replace all console.log calls with addLog
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
  }, [onCloseDialog]);

  return (
    <div style={{ textAlign: 'center' }}>
      <InputField type="text" multiline={true} defaultValue={message} onChange={(e) => setMessage(e.target.value)} /> {/* Set defaultValue prop */}
      <Button variant="contained" sx={{ borderRadius: 2}} onClick={onClick}>Save this forever onchain.</Button>

      <Dialog open={openDialog} onClose={onCloseDialog}>
        <DialogTitle>About to save</DialogTitle>
        <DialogContent>
          <DialogContentText>Please touch NFC tag.</DialogContentText>
          <CircularProgress></CircularProgress>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDialog2} onClose={onCloseDialog2}>
        <DialogTitle>Done!</DialogTitle>
        <DialogContent>
          <DialogContentText>Your message has been stored.</DialogContentText>
        </DialogContent>
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
      <WriteComponent></WriteComponent>
    </div>
  );
}

function Log({ logs }) {
  return (
    <div style={{ marginTop: '10px', border: '1px solid #000', padding: '10px', fontSize: '10pt',height: '100px', overflow: 'auto'}}>
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
    height: '400px'
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
    if ('NDEFReader' in window) {
      addLog('write initiated');
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
      <div>NFC and DEBUG</div>
      <Button onClick={scanNFC}>Start NFC Scan</Button>
      <Button onClick={writeNFC}>Write to NFC</Button>
      <Log logs={logs} />
    </div>
  );
}

export default App;
