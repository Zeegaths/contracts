import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import contractABI from './abi.json';
import './index.css';

function App() {
  const contractAddress = "0x8199a8eE572d05221c1CDB908c868435399241c4";

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  const [inputMessage, setInputMessage] = useState('');
  const [contractMessage, setContractMessage] = useState('');

  async function sendMessageToContract() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      try {
        const transaction = await contract.setMessage(inputMessage);
        await transaction.wait();
        console.log('Message set successfully');
        getMessageFromContract(); // Retrieve updated message after setting
      } catch (err) {
        console.error('Error:', err);
      }
    }
  }

  async function getMessageFromContract() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      try {
        const message = await contract.getMessage();
        await message.wait()
        setContractMessage(message);
        console.log('Message retrieved successfully:', message);
      } catch (err) {
        console.error('Error:', err);
      }
    }
  }

  useEffect(() => {
    getMessageFromContract();
  }, []);

  const handleMessageChange = (e) => {
    setInputMessage(e.target.value);
  };

  return (
    <div className="App">
      <div>
        <input
          type="text"
          placeholder='Enter your message'
          value={inputMessage}
          onChange={handleMessageChange} 
        />
        <button onClick={sendMessageToContract}>Set Message</button>
      </div>
      <div>
        <button onClick={getMessageFromContract}>Get Message</button>
        {contractMessage && <p>{contractMessage}</p>}
      </div>
    </div>
  );
}

export default App;