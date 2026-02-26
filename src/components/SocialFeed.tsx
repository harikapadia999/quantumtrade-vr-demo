import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, TrendingUp, Copy, Star, MessageCircle, Share2, Award } from 'lucide-react'

interface Trader {
  id: string
  name: string
  avatar: string
  verified: boolean
  followers: number
  winRate: number
  totalReturn: number
  copiers: number
}

interface Trade {
  id: string
  trader: Trader
  action: 'BUY' | 'SELL'
  asset: string
  price: number
  quantity: number
  timestamp: string
  likes: number
  comments: number
}

export default function SocialFeed() {
  const topTraders: Trader[] = [
    {
      id: '1',
      name: 'CryptoKing',
      avatar: '👑',
      verified: true,
      followers: 45200,
      winRate: 78.5,
      totalReturn: 245.3,
      copiers: 1250
    },
    {
      id: '2',
      name: 'QuantMaster',
      avatar: '🎯',
      verified: true,
      followers: 38900,
      winRate: 82.1,
      totalReturn: 312.7,
      copiers: 980
    },
    {
      id: '3',
      name: 'AITrader',
      avatar: '🤖',
      verified: true,
      followers: 52100,
      winRate: 75.3,
      totalReturn: 198.4,
      copiers: 1580
    }
  ]

  const [trades] = useState<Trade[]>([
    {
      id: '1',
      trader: topTraders[0],
      action: 'BUY',
      asset: 'BTC/USD',
      price: 47250,
      quantity: 2.5,
      timestamp: '2 minutes ago',
      likes: 234,
      comments: 45
    },
    {
      id: '2',
      trader: topTraders[1],
      action: 'SELL',
      asset: 'ETH/USD',
      price: 2950,
      quantity: 15,
      timestamp: '5 minutes ago',
      likes: 189,
      comments: 32
    },
    {
      id: '3',
      trader: topTraders[2],
      action: 'BUY',
      asset: 'AAPL',
      price: 182,
      quantity: 100,
      timestamp: '8 minutes ago',
      likes: 156,
      comments: 28
    }
  ])

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-effect rounded-xl p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Social Trading</h2>
            <p className="text-gray-400">Follow and copy expert traders</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="glass-effect rounded-lg p-4">
            <div className="text-sm text-gray-400 mb-1">Active Traders</div>
            <div className="text-2xl font-bold text-white">12,547</div>
          </div>
          <div className="glass-effect rounded-lg p-4">
            <div className="text-sm text-gray-400 mb-1">Total Copiers</div>
            <div className="text-2xl font-bold text-green-400">45,892</div>
          </div>
          <div className="glass-effect rounded-lg p-4">
            <div className="text-sm text-gray-400 mb-1">Avg Win Rate</div>
            <div className="text-2xl font-bold text-quantum-400">72.3%</div>
          </div>
          <div className="glass-effect rounded-lg p-4">
            <div className="text-sm text-gray-400 mb-1">Volume Today</div>
            <div className="text-2xl font-bold text-purple-400">$2.4B</div>
          </div>
        </div>
      </motion.div>

      {/* Top Traders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-effect rounded-xl p-6"
      >
        <h3 className="text-xl font-bold text-white mb-4">Top Performing Traders</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topTraders.map((trader, index) => (
            <motion.div
              key={trader.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
              className="glass-effect rounded-lg p-6 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-quantum-400 to-purple-600 flex items-center justify-center text-2xl">
                    {trader.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{trader.name}</span>
                      {trader.verified && (
                        <Award className="w-4 h-4 text-quantum-400" />
                      )}
                    </div>
                    <div className="text-sm text-gray-400">{trader.followers.toLocaleString()} followers</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Win Rate</span>
                  <span className="font-bold text-green-400">{trader.winRate}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Total Return</span>
                  <span className="font-bold text-quantum-400">+{trader.totalReturn}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Copiers</span>
                  <span className="font-bold text-white">{trader.copiers.toLocaleString()}</span>
                </div>
              </div>

              <button className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-quantum-500 to-purple-600 hover:shadow-lg hover:shadow-quantum-500/50 transition-all text-white font-medium flex items-center justify-center gap-2">
                <Copy className="w-4 h-4" />
                Copy Trader
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Live Trade Feed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-effect rounded-xl p-6"
      >
        <h3 className="text-xl font-bold text-white mb-4">Live Trade Feed</h3>
        <div className="space-y-4">
          {trades.map((trade, index) => (
            <motion.div
              key={trade.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="glass-effect rounded-lg p-4 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-quantum-400 to-purple-600 flex items-center justify-center text-xl">
                    {trade.trader.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-white">{trade.trader.name}</span>
                      {trade.trader.verified && (
                        <Award className="w-3 h-3 text-quantum-400" />
                      )}
                      <span className="text-xs text-gray-500">{trade.timestamp}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        trade.action === 'BUY' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {trade.action}
                      </span>
                      <span className="font-bold text-white">{trade.asset}</span>
                      <span className="text-gray-400">@</span>
                      <span className="text-white">${trade.price.toLocaleString()}</span>
                    </div>
                    <div className="text-sm text-gray-400 mt-1">
                      Quantity: {trade.quantity} | Total: ${(trade.price * trade.quantity).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-3 border-t border-white/10">
                <button className="flex items-center gap-2 text-gray-400 hover:text-quantum-400 transition-colors">
                  <Star className="w-4 h-4" />
                  <span className="text-sm">{trade.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-gray-400 hover:text-quantum-400 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm">{trade.comments}</span>
                </button>
                <button className="flex items-center gap-2 text-gray-400 hover:text-quantum-400 transition-colors">
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm">Share</span>
                </button>
                <button className="ml-auto flex items-center gap-2 px-3 py-1 rounded-lg bg-quantum-500/20 hover:bg-quantum-500/30 text-quantum-400 transition-colors">
                  <Copy className="w-4 h-4" />
                  <span className="text-sm font-medium">Copy Trade</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Social Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-effect rounded-xl p-6"
        >
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-4">
            <Copy className="w-6 h-6 text-white" />
          </div>
          <h4 className="font-bold text-white mb-2">Auto Copy Trading</h4>
          <p className="text-gray-400 text-sm">Automatically replicate trades from top performers in real-time</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-effect rounded-xl p-6"
        >
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <h4 className="font-bold text-white mb-2">Performance Analytics</h4>
          <p className="text-gray-400 text-sm">Detailed statistics and historical performance of every trader</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-effect rounded-xl p-6"
        >
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-white" />
          </div>
          <h4 className="font-bold text-white mb-2">Community Insights</h4>
          <p className="text-gray-400 text-sm">Learn from discussions and analysis shared by expert traders</p>
        </motion.div>
      </div>
    </div>
  )
}