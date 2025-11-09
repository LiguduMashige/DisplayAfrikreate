import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as d3 from 'd3';
import { TopGainersIcon, TopLosersIcon, HighestVolumeIcon, InfoIcon } from '../assets/icons/CryptoIcons';
import './CryptoMarket.css';

const CryptoMarket = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [selectedView, setSelectedView] = useState('gainers');
  const [loading, setLoading] = useState(true);
  const chartRef = useRef(null);

  // Simulated crypto data (in production, use CoinGecko API or similar)
  const generateCryptoData = () => {
    const cryptos = [
      { name: 'Bitcoin', symbol: 'BTC', price: 45230.50, change: 5.2, volume: 28500000000 },
      { name: 'Ethereum', symbol: 'ETH', price: 3125.80, change: 8.7, volume: 15200000000 },
      { name: 'Solana', symbol: 'SOL', price: 98.45, change: 12.3, volume: 2100000000 },
      { name: 'Cardano', symbol: 'ADA', price: 0.58, change: -3.5, volume: 850000000 },
      { name: 'Polygon', symbol: 'MATIC', price: 0.92, change: 6.8, volume: 680000000 },
      { name: 'Avalanche', symbol: 'AVAX', price: 38.20, change: -5.2, volume: 520000000 },
      { name: 'Polkadot', symbol: 'DOT', price: 7.32, change: 3.1, volume: 380000000 },
      { name: 'Chainlink', symbol: 'LINK', price: 15.67, change: -2.8, volume: 620000000 },
      { name: 'Litecoin', symbol: 'LTC', price: 72.45, change: 1.5, volume: 450000000 },
      { name: 'Stellar', symbol: 'XLM', price: 0.12, change: -4.1, volume: 280000000 }
    ];

    // Add some randomness
    return cryptos.map(crypto => ({
      ...crypto,
      price: crypto.price * (1 + (Math.random() - 0.5) * 0.02),
      change: crypto.change + (Math.random() - 0.5) * 2,
      volume: crypto.volume * (1 + (Math.random() - 0.5) * 0.1)
    }));
  };

  useEffect(() => {
    // Simulate API call
    const fetchData = () => {
      setLoading(true);
      setTimeout(() => {
        setCryptoData(generateCryptoData());
        setLoading(false);
      }, 1000);
    };

    fetchData();

    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (cryptoData.length > 0 && chartRef.current) {
      renderChart();
    }
  }, [cryptoData, selectedView]);

  const getFilteredData = () => {
    const sorted = [...cryptoData];
    switch (selectedView) {
      case 'gainers':
        return sorted.sort((a, b) => b.change - a.change).slice(0, 5);
      case 'losers':
        return sorted.sort((a, b) => a.change - b.change).slice(0, 5);
      case 'volume':
        return sorted.sort((a, b) => b.volume - a.volume).slice(0, 5);
      default:
        return sorted.slice(0, 5);
    }
  };

  const renderChart = useCallback(() => {
    const data = getFilteredData();
    const container = d3.select(chartRef.current);
    container.selectAll('*').remove();

    const width = chartRef.current.offsetWidth;
    const height = 400;
    const margin = { top: 40, right: 30, bottom: 80, left: 60 };

    const svg = container
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Scales
    const x = d3.scaleBand()
      .domain(data.map(d => d.symbol))
      .range([0, chartWidth])
      .padding(0.3);

    const yValue = selectedView === 'volume' 
      ? d => d.volume 
      : d => Math.abs(d.change);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, yValue)])
      .nice()
      .range([chartHeight, 0]);

    // Gradient definitions
    const defs = svg.append('defs');
    
    data.forEach((d, i) => {
      const gradient = defs.append('linearGradient')
        .attr('id', `gradient-${i}`)
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '0%')
        .attr('y2', '100%');

      const color = selectedView === 'volume' 
        ? '#8b5cf6' 
        : (d.change > 0 ? '#10b981' : '#ef4444');

      gradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', color)
        .attr('stop-opacity', 1);

      gradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', color)
        .attr('stop-opacity', 0.3);
    });

    // Bars
    g.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.symbol))
      .attr('width', x.bandwidth())
      .attr('y', chartHeight)
      .attr('height', 0)
      .attr('fill', (d, i) => `url(#gradient-${i})`)
      .attr('rx', 8)
      .transition()
      .duration(1000)
      .attr('y', d => y(yValue(d)))
      .attr('height', d => chartHeight - y(yValue(d)));

    // X Axis
    g.append('g')
      .attr('transform', `translate(0,${chartHeight})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .style('fill', '#ffffff')
      .style('font-size', '14px')
      .style('font-weight', '600');

    g.select('.domain').style('stroke', 'rgba(255, 255, 255, 0.2)');
    g.selectAll('.tick line').style('stroke', 'rgba(255, 255, 255, 0.2)');

    // Y Axis
    g.append('g')
      .call(d3.axisLeft(y).ticks(5).tickFormat(d => {
        if (selectedView === 'volume') {
          return `$${(d / 1000000000).toFixed(1)}B`;
        }
        return `${d.toFixed(1)}%`;
      }))
      .selectAll('text')
      .style('fill', '#ffffff')
      .style('font-size', '12px');

    g.select('.domain').style('stroke', 'rgba(255, 255, 255, 0.2)');
    g.selectAll('.tick line').style('stroke', 'rgba(255, 255, 255, 0.2)');

    // Value labels on bars
    g.selectAll('.label')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('x', d => x(d.symbol) + x.bandwidth() / 2)
      .attr('y', d => y(yValue(d)) - 10)
      .attr('text-anchor', 'middle')
      .style('fill', '#ffffff')
      .style('font-weight', '600')
      .style('font-size', '14px')
      .style('opacity', 0)
      .text(d => {
        if (selectedView === 'volume') {
          return `$${(d.volume / 1000000000).toFixed(2)}B`;
        }
        return `${d.change > 0 ? '+' : ''}${d.change.toFixed(2)}%`;
      })
      .transition()
      .delay(1000)
      .duration(500)
      .style('opacity', 1);
  }, [cryptoData, selectedView]); // eslint-disable-line react-hooks/exhaustive-deps

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  const formatVolume = (volume) => {
    if (volume >= 1000000000) {
      return `$${(volume / 1000000000).toFixed(2)}B`;
    }
    return `$${(volume / 1000000).toFixed(2)}M`;
  };

  return (
    <div className="crypto-market-container">
      <div className="crypto-header">
        <h3 className="crypto-title">Live Cryptocurrency Market</h3>
        <p className="crypto-subtitle">Real-time blockchain market data</p>
      </div>

      <div className="view-toggles">
        <button
          className={`toggle-btn ${selectedView === 'gainers' ? 'active gainers' : ''}`}
          onClick={() => setSelectedView('gainers')}
          title="Cryptocurrencies with the highest positive price change in 24 hours"
        >
          <TopGainersIcon size={20} />
          <span>Top Gainers</span>
          <div className="tooltip">
            <InfoIcon size={16} className="info-icon" />
            <span className="tooltip-text">Cryptocurrencies with the highest positive price change in 24 hours</span>
          </div>
        </button>
        <button
          className={`toggle-btn ${selectedView === 'losers' ? 'active losers' : ''}`}
          onClick={() => setSelectedView('losers')}
          title="Cryptocurrencies with the highest negative price change in 24 hours"
        >
          <TopLosersIcon size={20} />
          <span>Top Losers</span>
          <div className="tooltip">
            <InfoIcon size={16} className="info-icon" />
            <span className="tooltip-text">Cryptocurrencies with the highest negative price change in 24 hours</span>
          </div>
        </button>
        <button
          className={`toggle-btn ${selectedView === 'volume' ? 'active volume' : ''}`}
          onClick={() => setSelectedView('volume')}
          title="Cryptocurrencies with the highest trading volume in 24 hours"
        >
          <HighestVolumeIcon size={20} />
          <span>Highest Volume</span>
          <div className="tooltip">
            <InfoIcon size={16} className="info-icon" />
            <span className="tooltip-text">Cryptocurrencies with the highest trading volume in 24 hours</span>
          </div>
        </button>
      </div>

      {loading ? (
        <div className="crypto-loading">
          <div className="loading-spinner"></div>
          <p>Loading market data...</p>
        </div>
      ) : (
        <>
          <div ref={chartRef} className="crypto-chart"></div>

          <div className="crypto-table">
            <table>
              <thead>
                <tr>
                  <th>Cryptocurrency</th>
                  <th>Price</th>
                  <th>24h Change</th>
                  <th>Volume (24h)</th>
                </tr>
              </thead>
              <tbody>
                {getFilteredData().map((crypto, index) => (
                  <tr key={index} className="crypto-row">
                    <td className="crypto-name">
                      <strong>{crypto.name}</strong>
                      <span className="crypto-symbol">{crypto.symbol}</span>
                    </td>
                    <td className="crypto-price">{formatPrice(crypto.price)}</td>
                    <td className={`crypto-change ${crypto.change >= 0 ? 'positive' : 'negative'}`}>
                      {crypto.change >= 0 ? '▲' : '▼'} {Math.abs(crypto.change).toFixed(2)}%
                    </td>
                    <td className="crypto-volume">{formatVolume(crypto.volume)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default CryptoMarket;
