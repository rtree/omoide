function SenderPage() {
    const [message, setMessage] = useState("");
    const [facePic, setFacePic] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const { account } = useAccount();
    const contract = useContract(omoideArtifact);
  
    async function handleSubmit(e) {
      e.preventDefault();
      setLoading(true);
  
      // Encrypt data
      const key = CryptoJS.lib.WordArray.random(256/8);
      const encryptedMessage = CryptoJS.AES.encrypt(message, key).toString();
      const encryptedFacePic = CryptoJS.AES.encrypt(facePic.toString('base64'), key).toString();
  
      // Generate hash and signature
      const dataHash = Web3.utils.keccak256(encryptedMessage + encryptedFacePic);
      const dataSignature = await account.sign(dataHash);
  
      // Store data
      const tx = await contract.methods.storeData(account.address, encryptedMessage, encryptedFacePic, dataHash, dataSignature).send({ from: account.address });
  
      setLoading(false);
    }
  
    function handleFileChange(e) {
      const file = e.target.files[0];
      if (file) {
        setFacePic(file);
      }
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit" disabled={loading}>Submit</button>
      </form>
    );
  }
  