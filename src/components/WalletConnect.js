import React from 'react';
import useKrypticWallet from '../hooks/useKrypticWallet';
import { WalletIcon } from '../assets/icons/CryptoIcons';
import './WalletConnect.css';

const WalletConnect = () => {
  const { 
    walletDetected, 
    walletAddress, 
    isConnecting, 
    error,
    connect, 
    disconnect 
  } = useKrypticWallet();

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="wallet-connect">
      {!walletAddress ? (
        <button 
          className="connect-wallet-btn"
          onClick={connect}
          disabled={isConnecting || !walletDetected}
        >
          <WalletIcon size={20} />
          {isConnecting ? 'Connecting...' : walletDetected ? 'Connect Wallet' : 'No Wallet Detected'}
        </button>
      ) : (
        <div className="wallet-connected">
          <div className="wallet-info">
            <WalletIcon size={18} />
            <span className="wallet-address">{formatAddress(walletAddress)}</span>
          </div>
          <button className="disconnect-btn" onClick={disconnect}>
            Disconnect
          </button>
        </div>
      )}
      
      {error && (
        <div className="wallet-error">
          ⚠️ {error}
        </div>
      )}
    </div>
  );
};

export default WalletConnect;
