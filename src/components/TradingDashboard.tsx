import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp, TrendingDown, DollarSign, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react'

interface MarketData {
  time: string
  price: number
  volume: number
}

interface Position {
  symbol: string
  quantity: number
  avgPrice: number
  currentPrice: number
  pnl: number
  pnlPercent: number
}

export default function TradingDashboard() {
  const [marketData, setMarketData] = useState<MarketData[]>([])
  const [positions, setPositions] = useState<Position[]>([
    { symbol: 'BTC/USD', quantity: 2.5, avgPrice: 45000, currentPrice: 47250, pnl: 5625, pnlPercent: 5.0 },
    { symbol: 'ETH/USD', quantity: 15, avgPrice: 2800, currentPrice: 2950, pnl: 2250, pnlPercent: 5.36 },
    { symbol: 'AAPL', quantity: 100, avgPrice: 175, currentPrice: 182, pnl: 700, pnlPercent: 4.0 },
    { symbol: 'TSLA', quantity: 50, avgPrice: 240, currentPrice: 235, pnl: -250, pnlPercent: -2.08 },
  ])

  const [stats] = useState({
    totalValue: 156750,
    dailyPnL: 3250,
    dailyPnLPercent: 2.12,
    winRate: 68.5,
    sharpeRatio: 2.34
  })

  useEffect(() => {
    // Generate initial market data
    const generateData = () => {
      const data: MarketData[] = []
      let price = 47000
      for (let i = 0; i < 50; i++) {
        price += (Math.random() - 0.5) * 500
        data.push({
          time: `${i}m`,
          price: Math.round(price),
          volume: Math.round(Math.random() * 1000000)
        })
      }
      return data
    }

    setMarketData(generateData())

    // Simulate real-time updates
    const interval = setInterval(() => {
      setMarketData(prev => {
        const newData = [...prev.slice(1)]
        const lastPrice = prev[prev.length - 1].price
        const newPrice = lastPrice + (Math.random() - 0.5) * 500
        newData.push({
          time: `${prev.length}m`,
          price: Math.round(newPrice),
          volume: Math.round(Math.random() * 1000000)
        })
        return newData
      })

      // Update positions
      setPositions(prev => prev.map(pos => ({
        ...pos,
        currentPrice: pos.currentPrice + (Math.random() - 0.5) * 10,
        pnl: (pos.currentPrice - pos.avgPrice) * pos.quantity,
        pnlPercent: ((pos.currentPrice - pos.avgPrice) / pos.avgPrice) * 100
      })))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div 
          className="glass-effect rounded-xl p-6"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Portfolio Value</span>
            <DollarSign className="w-5 h-5 text-quantum-400" />
          </div>
          <div className="text-3xl font-bold text-white">${stats.totalValue.toLocaleString()}</div>
          <div className="flex items-center gap-1 mt-2 text-green-400 text-sm">
            <ArrowUpRight className="w-4 h-4" />
            <span>+{stats.dailyPnLPercent}% today</span>
          </div>
        </motion.div>

        <motion.div 
          className="glass-effect rounded-xl p-6"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Daily P&L</span>
            <Activity className="w-5 h-5 text-green-400" />
          </div>
          <div className="text-3xl font-bold text-green-400">+${stats.dailyPnL.toLocaleString()}</div>
          <div className="text-gray-400 text-sm mt-2">Realized + Unrealized</div>
        </motion.div>

        <motion.div 
          className="glass-effect rounded-xl p-6"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Win Rate</span>
            <TrendingUp className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-3xl font-bold text-white">{stats.winRate}%</div>
          <div className="text-gray-400 text-sm mt-2">Last 30 days</div>
        </motion.div>

        <motion.div 
          className="glass-effect rounded-xl p-6"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Sharpe Ratio</span>
            <Activity className="w-5 h-5 text-yellow-400" />
          </div>
          <div className="text-3xl font-bold text-white">{stats.sharpeRatio}</div>
          <div className="text-gray-400 text-sm mt-2">Risk-adjusted returns</div>
        </motion.div>
      </div>

      {/* Chart */}
      <motion.div 
        className="glass-effect rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-xl font-bold text-white mb-4">BTC/USD - Real-time Price</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={marketData}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="time" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
              labelStyle={{ color: '#999' }}
            />
            <Area type="monotone" dataKey="price" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorPrice)" />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Positions */}
      <motion.div 
        className="glass-effect rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-xl font-bold text-white mb-4">Open Positions</h3>
        <div className="space-y-3">
          {positions.map((position, index) => (
            <motion.div
              key={position.symbol}
              className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  position.pnl >= 0 ? 'bg-green-500/20' : 'bg-red-500/20'
                }`}>
                  {position.pnl >= 0 ? (
                    <TrendingUp className="w-5 h-5 text-green-400" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-red-400" />
                  )}
                </div>
                <div>
                  <div className="font-bold text-white">{position.symbol}</div>
                  <div className="text-sm text-gray-400">{position.quantity} units @ ${position.avgPrice.toFixed(2)}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-white">${position.currentPrice.toFixed(2)}</div>
                <div className={`text-sm font-medium ${position.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {position.pnl >= 0 ? '+' : ''}{position.pnl.toFixed(2)} ({position.pnlPercent.toFixed(2)}%)
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Order Book Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div 
          className="glass-effect rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-xl font-bold text-white mb-4">Order Book - Bids</h3>
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => {
              const price = 47000 - i * 50
              const size = Math.random() * 10
              return (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-green-400">${price.toLocaleString()}</span>
                  <span className="text-gray-400">{size.toFixed(4)} BTC</span>
                </div>
              )
            })}
          </div>
        </motion.div>

        <motion.div 
          className="glass-effect rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-xl font-bold text-white mb-4">Order Book - Asks</h3>
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => {
              const price = 47050 + i * 50
              const size = Math.random() * 10
              return (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-red-400">${price.toLocaleString()}</span>
                  <span className="text-gray-400">{size.toFixed(4)} BTC</span>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </div>
  )
}