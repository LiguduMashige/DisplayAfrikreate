import React from 'react';

// Top Gainers Icon - Upward trend with green accent
export const TopGainersIcon = ({ size = 24, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M16 18L18.29 15.71L13.41 10.83L9.41 14.83L2 7.41L3.41 6L9.41 12L13.41 8L19.71 14.29L22 12V18H16Z"
      fill="currentColor"
      opacity="0.9"
    />
    <path
      d="M22 12L19.71 14.29L13.41 8L9.41 12L3.41 6L2 7.41"
      stroke="#10b981"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Top Losers Icon - Downward trend with red accent
export const TopLosersIcon = ({ size = 24, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M16 6L18.29 8.29L13.41 13.17L9.41 9.17L2 16.59L3.41 18L9.41 12L13.41 16L19.71 9.71L22 12V6H16Z"
      fill="currentColor"
      opacity="0.9"
    />
    <path
      d="M22 12L19.71 9.71L13.41 16L9.41 12L3.41 18L2 16.59"
      stroke="#ef4444"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Highest Volume Icon - Stacked bars
export const HighestVolumeIcon = ({ size = 24, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect x="4" y="12" width="3" height="10" rx="1.5" fill="currentColor" opacity="0.4" />
    <rect x="10" y="8" width="3" height="14" rx="1.5" fill="currentColor" opacity="0.6" />
    <rect x="16" y="4" width="3" height="18" rx="1.5" fill="currentColor" opacity="0.8" />
    <path
      d="M4 22H20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

// Trending Up Icon - General upward trend
export const TrendingUpIcon = ({ size = 24, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <polyline
      points="23 6 13.5 15.5 8.5 10.5 1 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <polyline
      points="17 6 23 6 23 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Trending Down Icon - General downward trend
export const TrendingDownIcon = ({ size = 24, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <polyline
      points="23 18 13.5 8.5 8.5 13.5 1 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <polyline
      points="17 18 23 18 23 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Activity/Volume Icon - Bar chart variant
export const ActivityIcon = ({ size = 24, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <line x1="12" y1="20" x2="12" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="18" y1="20" x2="18" y2="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="6" y1="20" x2="6" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Bitcoin Icon
export const BitcoinIcon = ({ size = 24, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    <path
      d="M12 6V18M9 8H13.5C14.8807 8 16 9.11929 16 10.5C16 11.8807 14.8807 13 13.5 13H9H14C15.3807 13 16.5 14.1193 16.5 15.5C16.5 16.8807 15.3807 18 14 18H9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Ethereum Icon
export const EthereumIcon = ({ size = 24, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12 2L5 12.5L12 16L19 12.5L12 2Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      d="M5 13.5L12 22L19 13.5L12 17L5 13.5Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

// Wallet Icon
export const WalletIcon = ({ size = 24, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M19 7H5C3.89543 7 3 7.89543 3 9V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V9C21 7.89543 20.1046 7 19 7Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3 9L12 2L21 9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="16" cy="15" r="2" stroke="currentColor" strokeWidth="2" />
  </svg>
);

// Chart Candlestick Icon
export const CandlestickIcon = ({ size = 24, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <line x1="6" y1="4" x2="6" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <rect x="4" y="8" width="4" height="6" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5" />
    
    <line x1="12" y1="2" x2="12" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <rect x="10" y="6" width="4" height="10" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5" />
    
    <line x1="18" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <rect x="16" y="10" width="4" height="4" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

// Info Icon with tooltip
export const InfoIcon = ({ size = 24, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    <path
      d="M12 16V12M12 8H12.01"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CryptoIcons = {
  TopGainersIcon,
  TopLosersIcon,
  HighestVolumeIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  ActivityIcon,
  BitcoinIcon,
  EthereumIcon,
  WalletIcon,
  CandlestickIcon,
  InfoIcon
};

export default CryptoIcons;
