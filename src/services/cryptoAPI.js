/**
 * Crypto API Service - Connects to CoinGecko API
 * Free API, no authentication required
 */

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

/**
 * Fetch real-time crypto price data
 */
export const getCryptoPrice = async (cryptoId = 'bitcoin') => {
  try {
    const response = await fetch(
      `${COINGECKO_API}/simple/price?ids=${cryptoId}&vs_currencies=usd&include_24hr_change=true&include_market_cap=true&include_24hr_vol=true`
    );
    const data = await response.json();
    return data[cryptoId];
  } catch (error) {
    console.error('Error fetching crypto price:', error);
    return null;
  }
};

/**
 * Fetch historical OHLC data for candlestick chart
 * @param {string} cryptoId - Crypto ID (bitcoin, ethereum, etc.)
 * @param {number} days - Number of days (1, 7, 30, 90, 365)
 */
export const getCandlestickData = async (cryptoId = 'bitcoin', days = 1) => {
  try {
    const response = await fetch(
      `${COINGECKO_API}/coins/${cryptoId}/ohlc?vs_currency=usd&days=${days}`
    );
    const data = await response.json();
    
    // Format: [[timestamp, open, high, low, close], ...]
    return data.map(candle => ({
      time: candle[0] / 1000, // Convert to seconds
      open: candle[1],
      high: candle[2],
      low: candle[3],
      close: candle[4]
    }));
  } catch (error) {
    console.error('Error fetching candlestick data:', error);
    return [];
  }
};

/**
 * Fetch market data for multiple cryptocurrencies
 */
export const getTopCryptos = async (limit = 10) => {
  try {
    const response = await fetch(
      `${COINGECKO_API}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=true&price_change_percentage=24h`
    );
    const data = await response.json();
    
    return data.map(crypto => ({
      id: crypto.id,
      symbol: crypto.symbol.toUpperCase(),
      name: crypto.name,
      price: crypto.current_price,
      priceChange24h: crypto.price_change_percentage_24h,
      marketCap: crypto.market_cap,
      volume: crypto.total_volume,
      image: crypto.image,
      sparkline: crypto.sparkline_in_7d?.price || []
    }));
  } catch (error) {
    console.error('Error fetching top cryptos:', error);
    return [];
  }
};

/**
 * Map time range to days for API
 */
export const timeRangeToDays = (range) => {
  const mapping = {
    '1h': 1,    // 1 hour data (closest is 1 day)
    '24h': 1,   // 1 day
    '7d': 7,    // 7 days
    '1m': 30,   // 1 month
    '3m': 90,   // 3 months
    '1y': 365   // 1 year
  };
  return mapping[range] || 1;
};

/**
 * Get crypto ID from symbol
 */
export const symbolToCryptoId = (symbol) => {
  const mapping = {
    'BTC': 'bitcoin',
    'ETH': 'ethereum',
    'BNB': 'binancecoin',
    'ADA': 'cardano',
    'SOL': 'solana',
    'DOT': 'polkadot',
    'MATIC': 'matic-network',
    'AVAX': 'avalanche-2'
  };
  return mapping[symbol.toUpperCase()] || 'bitcoin';
};

/**
 * Format large numbers (market cap, volume)
 */
export const formatLargeNumber = (num) => {
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
  if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
  return `$${num.toFixed(2)}`;
};
