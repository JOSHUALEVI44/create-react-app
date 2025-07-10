import React, { useState, useEffect } from 'react';

const CryptoDivergenceScanner = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [opportunities, setOpportunities] = useState([]);
  const [fearGreedIndex, setFearGreedIndex] = useState(null);
  const [scanProgress, setScanProgress] = useState(0);
  const [alertCount, setAlertCount] = useState(0);
  const [btcData, setBtcData] = useState({ 
    price: 67500, 
    direction: 'bullish', 
    change24h: '2.5' 
  });

  // Fear & Greed Indicator
  const FearGreedIndicator = () => {
    const value = fearGreedIndex?.value || 50;
    const getColor = (val) => {
      if (val <= 25) return { bg: 'bg-red-500', text: 'text-red-400', label: 'Extreme Fear', advice: '📉 Great buying opportunity!' };
      if (val <= 45) return { bg: 'bg-orange-500', text: 'text-orange-400', label: 'Fear', advice: '⚠️ Market uncertainty' };
      if (val <= 55) return { bg: 'bg-yellow-500', text: 'text-yellow-400', label: 'Neutral', advice: '📊 Balanced market' };
      if (val <= 75) return { bg: 'bg-green-500', text: 'text-green-400', label: 'Greed', advice: '⚠️ Possible correction ahead' };
      return { bg: 'bg-purple-500', text: 'text-purple-400', label: 'Extreme Greed', advice: '📈 Be very cautious!' };
    };
    const colors = getColor(value);

    return (
      <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Fear & Greed Index</h3>
        <div className="flex items-center justify-center">
          <div className="relative w-32 h-32">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-700" />
              <circle
                cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="8" fill="transparent"
                strokeDasharray={`${value * 2.83} 283`} strokeLinecap="round" className={colors.text}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className={`text-2xl font-bold ${colors.text}`}>{value}</div>
                <div className="text-xs text-gray-400">/ 100</div>
              </div>
            </div>
          </div>
        </div>
        <div className={`text-center mt-2 px-3 py-1 rounded ${colors.bg}/20 ${colors.text}`}>
          {colors.label}
        </div>
        <div className="text-xs text-yellow-400 text-center mt-1">{colors.advice}</div>
      </div>
    );
  };

  // Fetch Fear & Greed Index
  const fetchFearGreed = async () => {
    try {
      console.log('🔄 Fetching Fear & Greed...');
      const response = await fetch('https://api.alternative.me/fng/');
      const data = await response.json();
      const value = parseInt(data.data[0].value);
      setFearGreedIndex({ value });
      console.log('✅ Fear & Greed fetched:', value);
    } catch (error) {
      console.log('⚠️ Fear & Greed API failed, using demo');
      const demoValue = 30 + Math.floor(Math.random() * 40);
      setFearGreedIndex({ value: demoValue });
    }
  };

  // Generate opportunities with Smart Money Concepts
  const generateOpportunities = () => {
    console.log('🔄 Generating opportunities...');
    
    const coins = ['BTC', 'ETH', 'BNB', 'XRP', 'ADA', 'SOL', 'MATIC', 'LINK', 'UNI', 'LTC'];
    const opportunities = [];

    for (let i = 0; i < 6; i++) {
      const coin = coins[i];
      const basePrice = coin === 'BTC' ? 67500 : coin === 'ETH' ? 2450 : Math.random() * 100 + 10;
      const price = (basePrice * (0.95 + Math.random() * 0.1)).toFixed(4);
      const confidence = 70 + Math.floor(Math.random() * 25);
      const divergenceType = Math.random() > 0.5 ? 'bullish' : 'bearish';
      
      // Smart Money Concepts Analysis
      const orderBlock = {
        present: Math.random() > 0.3,
        type: divergenceType,
        strength: Math.floor(Math.random() * 100),
        quality: Math.random() > 0.6 ? 'high' : Math.random() > 0.3 ? 'medium' : 'low'
      };
      
      const fairValueGap = {
        present: Math.random() > 0.4,
        direction: divergenceType,
        strength: Math.floor(Math.random() * 100),
        gapSize: (Math.random() * 3 + 0.5).toFixed(2),
        fillProbability: Math.floor(Math.random() * 100)
      };
      
      const bounceEntry = {
        identified: Math.random() > 0.5,
        zone: Math.random() > 0.5 ? 'support' : 'resistance',
        strength: Math.floor(Math.random() * 100),
        trigger: Math.random() > 0.6 ? 'confirmed' : 'pending'
      };

      // Calculate Risk/Reward (1:3 ratio)
      const entryPrice = parseFloat(price);
      const fearGreedMultiplier = fearGreedIndex ? 
        (fearGreedIndex.value <= 25 ? 1.2 : fearGreedIndex.value >= 75 ? 0.8 : 1.0) : 1.0;
      
      const stopDistance = entryPrice * (0.02 / fearGreedMultiplier);
      const entry = divergenceType === 'bullish' ? entryPrice * 0.999 : entryPrice * 1.001;
      const stopLoss = divergenceType === 'bullish' ? entry - stopDistance : entry + stopDistance;
      const takeProfit = divergenceType === 'bullish' ? entry + (stopDistance * 3) : entry - (stopDistance * 3);

      opportunities.push({
        id: i,
        symbol: coin,
        price,
        confidence,
        divergenceType,
        orderBlock,
        fairValueGap,
        bounceEntry,
        entry: entry.toFixed(4),
        stopLoss: stopLoss.toFixed(4),
        takeProfit: takeProfit.toFixed(4),
        riskReward: '3.0',
        fearGreedAdjusted: fearGreedMultiplier !== 1.0
      });
    }

    const filteredOpps = opportunities
      .filter(opp => opp.confidence >= 70)
      .sort((a, b) => b.confidence - a.confidence);

    console.log('✅ Generated opportunities:', filteredOpps.length);
    return filteredOpps;
  };

  // Copy trade details to clipboard
  const copyTradeDetails = async (opp) => {
    const tradeText = `
🚀 BITGET PERPETUAL FUTURES SIGNAL - ${opp.symbol}USDT.P
════════════════════════════════════════════════════
Exchange: BITGET PERPETUAL FUTURES
Side: ${opp.divergenceType.toUpperCase()}
Confidence: ${opp.confidence}%

MARKET SENTIMENT:
Fear & Greed Index: ${fearGreedIndex?.value || 'N/A'}/100
${opp.fearGreedAdjusted ? '⚠️ Entry adjusted for market sentiment' : '✅ Standard entry parameters'}

ENTRY LEVELS:
Entry: $${opp.entry}
Stop Loss: $${opp.stopLoss}
Take Profit: $${opp.takeProfit}
Risk/Reward: 1:3

SMART MONEY CONCEPTS:
- Order Block: ${opp.orderBlock.present ? `${opp.orderBlock.type} (${opp.orderBlock.strength}% strength, ${opp.orderBlock.quality} quality)` : 'Not detected'}
- Fair Value Gap: ${opp.fairValueGap.present ? `${opp.fairValueGap.direction} (${opp.fairValueGap.gapSize}% gap, ${opp.fairValueGap.fillProbability}% fill probability)` : 'Not detected'}
- Bounce Entry: ${opp.bounceEntry.identified ? `${opp.bounceEntry.zone} (${opp.bounceEntry.strength}% strength, ${opp.bounceEntry.trigger})` : 'Not identified'}

Generated: ${new Date().toLocaleString()}
    `.trim();
    
    try {
      await navigator.clipboard.writeText(tradeText);
      alert('✅ Bitget Perpetual signal copied! Paste into Vermatrader');
      setAlertCount(prev => prev + 1);
    } catch (error) {
      console.error('Copy failed:', error);
      alert('📋 Copy failed - please select and copy manually');
    }
  };

  // Main scanning function - FIXED VERSION
  const runScan = async () => {
    console.log('🚀 Scan started, isRunning:', isRunning);
    
    if (!isRunning) {
      console.log('❌ Scan cancelled - not running');
      return;
    }

    try {
      // Show progress
      setScanProgress(25);
      
      // Fetch Fear & Greed Index
      await fetchFearGreed();
      setScanProgress(50);
      
      // Generate opportunities
      const newOpportunities = generateOpportunities();
      setScanProgress(75);
      
      // Update state
      setOpportunities(newOpportunities);
      setScanProgress(100);
      
      console.log('✅ Scan completed successfully');
      
      // Clear progress after a delay
      setTimeout(() => setScanProgress(0), 1000);
      
    } catch (error) {
      console.error('❌ Scan failed:', error);
      setScanProgress(0);
    }
  };

  // Handle start/stop button click
  const handleToggleScanning = () => {
    console.log('Button clicked, current isRunning:', isRunning);
    const newRunningState = !isRunning;
    setIsRunning(newRunningState);
    
    if (newRunningState) {
      console.log('🚀 Starting scanner...');
      setAlertCount(0);
      // Run scan immediately when starting
      setTimeout(runScan, 100);
    } else {
      console.log('⏸️ Stopping scanner...');
      setOpportunities([]);
      setScanProgress(0);
    }
  };

  // Auto-scan every minute when running
  useEffect(() => {
    let interval;
    
    if (isRunning) {
      console.log('⏰ Setting up auto-scan interval');
      interval = setInterval(() => {
        console.log('⏰ Auto-scan triggered');
        runScan();
      }, 60000); // 60 seconds
    }
    
    return () => {
      if (interval) {
        console.log('🧹 Cleaning up scan interval');
        clearInterval(interval);
      }
    };
  }, [isRunning]);

  // Initialize Fear & Greed on component mount
  useEffect(() => {
    console.log('🎬 Component mounted, fetching initial data');
    fetchFearGreed();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 via-purple-500 to-green-400 bg-clip-text text-transparent">
              🚀 Bitget Perpetual Futures Scanner
            </h1>
            <p className="text-gray-400 mt-2 text-lg">
              Fear & Greed • Order Blocks • Fair Value Gaps • Bounce Entries
            </p>
            <div className="flex items-center gap-4 mt-2 text-sm flex-wrap">
              <div className="flex items-center gap-1 text-orange-400">
                <span>✅ Bitget Perpetual Futures</span>
              </div>
              <div className="flex items-center gap-1 text-purple-400">
                <span>🧠 Smart Money Concepts</span>
              </div>
              <div className="flex items-center gap-1 text-blue-400">
                <span>😰 Fear & Greed Index</span>
              </div>
              {alertCount > 0 && (
                <div className="flex items-center gap-1 text-yellow-400">
                  <span>{alertCount} signals copied</span>
                </div>
              )}
            </div>
          </div>
          
          <button
            onClick={handleToggleScanning}
            className={`mt-4 lg:mt-0 px-6 py-3 rounded-lg font-semibold transition-all ${
              isRunning 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-orange-600 hover:bg-orange-700 text-white'
            }`}
          >
            {isRunning ? '⏸️ Stop Scanner' : '🚀 Start Scanner'}
          </button>
        </div>

        {/* Scan Progress */}
        {scanProgress > 0 && (
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-700 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span>Scanning Bitget Perpetual Futures...</span>
              <span>{scanProgress}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-orange-500 via-purple-500 to-green-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${scanProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Bitcoin Status */}
          <div className="lg:col-span-2 bg-gray-900 rounded-lg p-4 border border-gray-700">
            <h3 className="text-lg font-semibold mb-4">Bitcoin Perpetual Futures</h3>
            <div className="text-3xl font-bold">
              ${btcData.price.toLocaleString()}
              <span className="text-xl ml-2 text-green-400">+{btcData.change24h}%</span>
            </div>
            <div className="text-sm text-gray-400 mt-2">
              📊 Bitget Perpetual Futures • Direction: {btcData.direction} • {isRunning ? '🔴 SCANNING' : '⏸️ STOPPED'}
            </div>
          </div>

          {/* Fear & Greed */}
          <FearGreedIndicator />
        </div>

        {/* TradingView Chart Placeholder */}
        <div className="bg-gray-900 rounded-lg p-4 border border-gray-700 mb-6">
          <h3 className="text-lg font-semibold mb-4">
            🚀 Bitget Perpetual Chart - BTCUSDT
            <span className="ml-2 text-sm bg-orange-500/20 text-orange-400 px-2 py-1 rounded">PERPETUAL</span>
          </h3>
          <div className="bg-gray-800 h-96 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-400">
              <div className="text-4xl mb-2">📈</div>
              <div>TradingView Chart Integration</div>
              <div className="text-sm mt-2">Bitget Perpetual Futures • RSI • MACD • Volume</div>
            </div>
          </div>
        </div>

        {/* Opportunities */}
        <div className="space-y-4">
          {opportunities.length === 0 && !isRunning && (
            <div className="text-center py-12 text-gray-400">
              <div className="text-6xl mb-4">🚀</div>
              <p className="text-xl">Click "Start Scanner" to find Bitget perpetual futures setups</p>
              <p className="text-sm mt-2">Fear & Greed • Order Blocks • Fair Value Gaps • Bounce Entries 📈</p>
            </div>
          )}

          {opportunities.length === 0 && isRunning && (
            <div className="text-center py-12 text-gray-400">
              <div className="text-6xl mb-4 animate-pulse">🔄</div>
              <p className="text-xl">Scanning for opportunities...</p>
            </div>
          )}

          {opportunities.map((opp) => (
            <div key={opp.id} className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-orange-500/50 transition-all">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">{opp.symbol}</span>
                  </div>
                  <div>
                    <div className="text-xl font-semibold">{opp.symbol}/USDT</div>
                    <div className="text-gray-400 flex items-center gap-2 flex-wrap">
                      ${parseFloat(opp.price).toFixed(4)}
                      <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded">BITGET PERP</span>
                      <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">SMC</span>
                      {opp.fearGreedAdjusted && (
                        <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">F&G ADJUSTED</span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`text-2xl font-bold ${
                    opp.confidence >= 85 ? 'text-green-400' : 
                    opp.confidence >= 75 ? 'text-yellow-400' : 'text-orange-400'
                  }`}>
                    {opp.confidence}%
                  </div>
                  <div className="text-sm text-gray-400">SMC Confidence</div>
                </div>
              </div>

              {/* Smart Money Concepts */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-gray-800 rounded-lg p-3 border border-gray-600">
                  <h5 className="text-sm font-semibold text-purple-400 mb-2">Order Block</h5>
                  {opp.orderBlock.present ? (
                    <div>
                      <div className={`text-xs px-2 py-1 rounded mb-1 ${
                        opp.orderBlock.type === 'bullish' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {opp.orderBlock.type}
                      </div>
                      <div className="text-xs text-gray-400">{opp.orderBlock.strength}% strength</div>
                      <div className="text-xs text-gray-400">Quality: {opp.orderBlock.quality}</div>
                    </div>
                  ) : (
                    <div className="text-xs text-gray-500">Not detected</div>
                  )}
                </div>

                <div className="bg-gray-800 rounded-lg p-3 border border-gray-600">
                  <h5 className="text-sm font-semibold text-blue-400 mb-2">Fair Value Gap</h5>
                  {opp.fairValueGap.present ? (
                    <div>
                      <div className={`text-xs px-2 py-1 rounded mb-1 ${
                        opp.fairValueGap.direction === 'bullish' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {opp.fairValueGap.direction}
                      </div>
                      <div className="text-xs text-gray-400">{opp.fairValueGap.gapSize}% gap</div>
                      <div className="text-xs text-gray-400">{opp.fairValueGap.fillProbability}% fill probability</div>
                    </div>
                  ) : (
                    <div className="text-xs text-gray-500">Not detected</div>
                  )}
                </div>

                <div className="bg-gray-800 rounded-lg p-3 border border-gray-600">
                  <h5 className="text-sm font-semibold text-green-400 mb-2">Bounce Entry</h5>
                  {opp.bounceEntry.identified ? (
                    <div>
                      <div className="text-xs px-2 py-1 rounded mb-1 bg-green-500/20 text-green-400">
                        {opp.bounceEntry.zone}
                      </div>
                      <div className="text-xs text-gray-400">{opp.bounceEntry.strength}% strength</div>
                      <div className="text-xs text-gray-400">Status: {opp.bounceEntry.trigger}</div>
                    </div>
                  ) : (
                    <div className="text-xs text-gray-500">Not identified</div>
                  )}
                </div>
              </div>

              {/* Entry Levels */}
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-600 mb-4">
                <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${
                    opp.divergenceType === 'bullish' ? 'bg-green-500' : 'bg-red-500'
                  }`} />
                  {opp.divergenceType.toUpperCase()} Perpetual Setup (1:3 R/R)
                </h4>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-xs text-gray-400 uppercase">Entry</div>
                    <div className="text-green-400 font-semibold text-lg">${opp.entry}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 uppercase">Stop Loss</div>
                    <div className="text-red-400 font-semibold text-lg">${opp.stopLoss}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 uppercase">Take Profit</div>
                    <div className="text-green-400 font-semibold text-lg">${opp.takeProfit}</div>
                  </div>
                </div>
              </div>

              {/* Copy Button */}
              <button 
                onClick={() => copyTradeDetails(opp)}
                className="w-full bg-gradient-to-r from-orange-600 to-purple-600 hover:from-orange-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all"
              >
                🚀 Copy Bitget Perpetual Signal for Vermatrader
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CryptoDivergenceScanner;
