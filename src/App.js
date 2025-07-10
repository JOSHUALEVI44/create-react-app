{/* Bitget Perpetual Chart */}
       <div className="mb-6">
         <BitgetPerpetualChart symbol={selectedChart} />
       </div>

       {/* Scan Progress */}
       {scanProgress > 0 && (
         <div className="bg-gray-900 rounded-lg p-4 border border-gray-700 mb-6">
           <div className="flex justify-between items-center mb-2">
             <span>Analyzing Bitget Perpetual Futures + Fear & Greed...</span>
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

       {/* SMC Opportunities for Bitget Perpetual Futures */}
       <div className="space-y-4">
         {opportunities.length === 0 && !isRunning && (
           <div className="text-center py-12 text-gray-400">
             <div className="text-6xl mb-4">🚀</div>
             <p className="text-xl">Click "Start Bitget Scanner" to find perpetual futures setups</p>
             <p className="text-sm mt-2">Fear & Greed • Order Blocks • Fair Value Gaps • Bounce Entries 📈</p>
           </div>
         )}

         {opportunities.map((opp) => {
           const smc = opp.smcAnalysis;
           const entry = opp.smartEntry;
           
           return (
             <div key={opp.id} className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-orange-500/50 transition-all">
               {/* Header */}
               <div className="flex items-center justify-between mb-4">
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-purple-500 rounded-full flex items-center justify-center">
                     <span className="text-white font-bold">{opp.symbol}</span>
                   </div>
                   <div>
                     <div className="text-xl font-semibold">{opp.symbol}/USDT</div>
                     <div className="text-gray-400 flex items-center gap-2">
                       ${parseFloat(opp.price).toFixed(4)}
                       {opp.isRealPrice && (
                         <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">REAL PRICE</span>
                       )}
                       <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded">BITGET PERP</span>
                       <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">SMC</span>
                       <button 
                         onClick={() => setSelectedChart(opp.symbol + 'USDT')}
                         className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded hover:bg-blue-500/30 transition-colors"
                       >
                         View Chart
                       </button>
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
                   {entry.fearGreedAdjustment && (
                     <div className="text-xs text-purple-400 mt-1">F&G Adjusted</div>
                   )}
                 </div>
               </div>

               {/* Fear & Greed Impact */}
               {fearGreedIndex && (
                 <div className="mb-4 p-3 bg-gray-800 rounded-lg border border-gray-600">
                   <div className="flex items-center justify-between">
                     <span className="text-sm font-medium text-gray-300">Market Sentiment Impact:</span>
                     <div className={`text-sm px-2 py-1 rounded ${
                       fearGreedIndex.value <= 25 ? 'bg-green-500/20 text-green-400' :
                       fearGreedIndex.value >= 75 ? 'bg-red-500/20 text-red-400' :
                       'bg-gray-500/20 text-gray-400'
                     }`}>
                       Fear & Greed: {fearGreedIndex.value}/100
                     </div>
                   </div>
                   <div className="text-xs text-gray-400 mt-1">
                     {fearGreedIndex.value <= 25 && "📉 Extreme Fear - Great buying opportunity"}
                     {fearGreedIndex.value > 25 && fearGreedIndex.value <= 45 && "⚠️ Fear - Market uncertainty, be cautious"}
                     {fearGreedIndex.value > 45 && fearGreedIndex.value <= 55 && "📊 Neutral - Balanced market conditions"}
                     {fearGreedIndex.value > 55 && fearGreedIndex.value <= 75 && "⚠️ Greed - Possible correction ahead"}
                     {fearGreedIndex.value > 75 && "📈 Extreme Greed - Be very cautious"}
                   </div>
                 </div>
               )}

               {/* Smart Money Concepts Analysis */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                 <div className="bg-gray-800 rounded-lg p-3 border border-gray-600">
                   <h5 className="text-sm font-semibold text-purple-400 mb-2">Order Block</h5>
                   {smc.orderBlock.present ? (
                     <div>
                       <div className={`text-xs px-2 py-1 rounded mb-1 ${
                         smc.orderBlock.type === 'bullish' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                       }`}>
                         {smc.orderBlock.type}
                       </div>
                       <div className="text-xs text-gray-400">
                         {smc.orderBlock.strength}% strength
                       </div>
                       <div className="text-xs text-gray-400">
                         Quality: {smc.orderBlock.quality}
                       </div>
                     </div>
                   ) : (
                     <div className="text-xs text-gray-500">Not detected</div>
                   )}
                 </div>

                 <div className="bg-gray-800 rounded-lg p-3 border border-gray-600">
                   <h5 className="text-sm font-semibold text-blue-400 mb-2">Fair Value Gap</h5>
                   {smc.fairValueGap.present ? (
                     <div>
                       <div className={`text-xs px-2 py-1 rounded mb-1 ${
                         smc.fairValueGap.direction === 'bullish' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                       }`}>
                         {smc.fairValueGap.direction}
                       </div>
                       <div className="text-xs text-gray-400">
                         {smc.fairValueGap.gapSize}% gap
                       </div>
                       <div className="text-xs text-gray-400">
                         {smc.fairValueGap.fillProbability}% fill prob
                       </div>
                     </div>
                   ) : (
                     <div className="text-xs text-gray-500">Not detected</div>
                   )}
                 </div>

                 <div className="bg-gray-800 rounded-lg p-3 border border-gray-600">
                   <h5 className="text-sm font-semibold text-green-400 mb-2">Bounce Entry</h5>
                   {smc.bounceEntry.identified ? (
                     <div>
                       <div className="text-xs px-2 py-1 rounded mb-1 bg-green-500/20 text-green-400">
                         {smc.bounceEntry.zone}
                       </div>
                       <div className="text-xs text-gray-400">
                         {smc.bounceEntry.bounceStrength}% strength
                       </div>
                       <div className="text-xs text-gray-400">
                         Status: {smc.bounceEntry.entryTrigger}
                       </div>
                     </div>
                   ) : (
                     <div className="text-xs text-gray-500">Not identified</div>
                   )}
                 </div>
               </div>

               {/* Smart Money Entry Levels */}
               <div className="bg-gray-800 rounded-lg p-4 border border-gray-600 mb-4">
                 <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                   <span className={`w-3 h-3 rounded-full ${
                     entry.positionSide === 'LONG' ? 'bg-green-500' : 'bg-red-500'
                   }`} />
                   {entry.positionSide} Perpetual Futures Setup
                   <span className="text-sm bg-orange-500/20 text-orange-400 px-2 py-1 rounded ml-2">
                     R/R: {entry.riskRewardRatio}:1
                   </span>
                 </h4>
                 
                 <div className="grid grid-cols-3 gap-4 mb-3">
                   <div>
                     <div className="text-xs text-gray-400 uppercase">Entry</div>
                     <div className="text-green-400 font-semibold text-lg">${entry.entry}</div>
                   </div>
                   <div>
                     <div className="text-xs text-gray-400 uppercase">Stop Loss</div>
                     <div className="text-red-400 font-semibold text-lg">${entry.stopLoss}</div>
                   </div>
                   <div>
                     <div className="text-xs text-gray-400 uppercase">Take Profit</div>
                     <div className="text-green-400 font-semibold text-lg">${entry.takeProfit}</div>
                   </div>
                 </div>

                 <div className="text-xs text-gray-400 bg-gray-700 rounded p-2">
                   <strong>Entry Reason:</strong> {entry.entryReason}
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
           );
         })}
       </div>
     </div>
   </div>
 );
};

export default CryptoDivergenceScanner;
