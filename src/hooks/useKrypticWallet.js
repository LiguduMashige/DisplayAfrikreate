import { useState, useEffect } from 'react';

const useKrypticWallet = () => {
  const [walletDetected, setWalletDetected] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);

  // Check if Kryptic wallet is available
  useEffect(() => {
    const checkWallet = () => {
      if (window.PhenixKryptic || window.kryptic || window.ethereum) {
        setWalletDetected(true);
        console.log('✅ Wallet detected');
      } else {
        setWalletDetected(false);
        console.log('❌ No wallet detected');
      }
    };

    checkWallet();

    // Check again after a delay (wallet might load after page)
    const timeout = setTimeout(checkWallet, 1000);
    return () => clearTimeout(timeout);
  }, []);

  // Connect wallet
  const connect = async () => {
    setIsConnecting(true);
    setError(null);

    try {
      let address;

      // Try PhenixKryptic first
      if (window.PhenixKryptic) {
        address = await window.PhenixKryptic.connect();
      } 
      // Fallback to standard Ethereum provider
      else if (window.ethereum) {
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        });
        address = accounts[0];
      } 
      else {
        throw new Error('No wallet provider found');
      }

      setWalletAddress(address);
      localStorage.setItem('walletAddress', address);
      return address;
    } catch (err) {
      setError(err.message);
      console.error('Wallet connection error:', err);
      return null;
    } finally {
      setIsConnecting(false);
    }
  };

  // Disconnect wallet
  const disconnect = () => {
    setWalletAddress(null);
    localStorage.removeItem('walletAddress');
  };

  // Sign message
  const signMessage = async (message) => {
    if (!walletAddress) {
      throw new Error('Wallet not connected');
    }

    try {
      let signature;

      if (window.PhenixKryptic) {
        signature = await window.PhenixKryptic.signMessage(message);
      } else if (window.ethereum) {
        signature = await window.ethereum.request({
          method: 'personal_sign',
          params: [message, walletAddress]
        });
      } else {
        throw new Error('No wallet provider available');
      }

      return signature;
    } catch (err) {
      console.error('Sign message error:', err);
      throw err;
    }
  };

  // Get balance
  const getBalance = async () => {
    if (!walletAddress) return null;

    try {
      if (window.ethereum) {
        const balance = await window.ethereum.request({
          method: 'eth_getBalance',
          params: [walletAddress, 'latest']
        });
        // Convert from wei to ether
        return parseInt(balance, 16) / 1e18;
      }
      return null;
    } catch (err) {
      console.error('Get balance error:', err);
      return null;
    }
  };

  // Auto-reconnect if previously connected
  useEffect(() => {
    const savedAddress = localStorage.getItem('walletAddress');
    if (savedAddress && walletDetected) {
      setWalletAddress(savedAddress);
    }
  }, [walletDetected]);

  return {
    walletDetected,
    walletAddress,
    isConnecting,
    error,
    connect,
    disconnect,
    signMessage,
    getBalance
  };
};

export default useKrypticWallet;
