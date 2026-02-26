import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Brain, TrendingUp, AlertCircle, CheckCircle, Zap } from 'lucide-react'

interface Prediction {
  asset: string
  currentPrice: number
  predicted1h: number
  predicted24h: number
  predicted7d: number
  confidence: number
  signal: 'BUY' | 'SELL' | 'HOLD'
  aiModel: string
}

export default function AIPredictions() {
  const [predictions, setPredictions] = useState<Prediction[]>([
    {
      asset: 'BTC/USD',
      currentPrice: 47250,
      predicted1h: 47580,
      predicted24h: 48900,
      predicted7d: 51200,
      confidence: 87.5,
      signal: 'BUY',
      aiModel: 'Transformer-XL'
    },
    {
      asset: 'ETH/USD',
      currentPrice: 2950,
      predicted1h: 2985,
      predicted24h: 3120,
      predicted7d: 3350,
      confidence: 82.3,
      signal: 'BUY',
      aiModel: 'LSTM-Attention'
    },
    {
      asset: 'AAPL',
      currentPrice: 182,
      predicted1h: 181.5,
      predicted24h: 180,
      predicted7d: 178,
      confidence: 75.8,
      signal: 'SELL',
      aiModel: 'GRU-Ensemble'
    },
    {
      asset: 'TSLA',
      currentPrice: 235,
      predicted1h: 235.5,
      predicted24h: 236,
      predicted7d: 237,
      confidence: 68.2,
      signal: 'HOLD',
      aiModel: 'CNN-BiLSTM'
    }
  ])

  const [chartData, setChartData] = useState<any[]>([])

  useEffect(() => {
    // Generate prediction chart data
    const generateChartData = () => {
      const data = []
      const basePrice = 47250
      for (let i = 0; i < 24; i++) {
        const actual = basePrice + (Math.random() - 0.5) * 2000 + i * 50
        const predicted = basePrice + i * 70 + (Math.random() - 0.5) * 500
        const upperBound = predicted + 500
        const lowerBound = predicted - 500
        
        data.push({
          hour: `${i}h`,
          actual: Math.round(actual),
          predicted: Math.round(predicted),
          upperBound: Math.round(upperBound),
          lowerBound: Math.round(lowerBound)
        })
      }
      return data
    }

    setChartData(generateChartData())

    // Simulate real-time prediction updates
    const interval = setInterval(() => {
      setPredictions(prev => prev.map(pred => ({
        ...pred,
        predicted1h: pred.predicted1h + (Math.random() - 0.5) * 100,
        predicted24h: pred.predicted24h + (Math.random() - 0.5) * 200,
        predicted7d: pred.predicted7d + (Math.random() - 0.5) * 500,
        confidence: Math.min(95, Math.max(60, pred.confidence + (Math.random() - 0.5) * 5))
      })))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getSignalColor = (signal: string) => {
    switch (signal) {
      case 'BUY': return 'text-green-400 bg-green-500/20 border-green-500/30'
      case 'SELL': return 'text-red-400 bg-red-500/20 border-red-500/30'
      case 'HOLD': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30'
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-effect rounded-xl p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">AI-Powered Predictions</h2>
            <p className="text-gray-400">Multi-model ensemble with transformer architecture</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="glass-effect rounded-lg p-4">
            <div className="text-sm text-gray-400 mb-1">Active Models</div>
            <div className="text-2xl font-bold text-white">12</div>
          </div>
          <div className="glass-effect rounded-lg p-4">
            <div className="text-sm text-gray-400 mb-1">Avg Accuracy</div>
            <div className="text-2xl font-bold text-green-400">78.4%</div>
          </div>
          <div className="glass-effect rounded-lg p-4">
            <div className="text-sm text-gray-400 mb-1">Predictions/sec</div>
            <div className="text-2xl font-bold text-quantum-400">1,247</div>
          </div>
          <div className="glass-effect rounded-lg p-4">
            <div className="text-sm text-gray-400 mb-1">Training Data</div>
            <div className="text-2xl font-bold text-purple-400">5.2TB</div>
          </div>
        </div>
      </motion.div>

      {/* Prediction Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-effect rounded-xl p-6"
      >
        <h3 className="text-xl font-bold text-white mb-4">BTC/USD - 24h Prediction vs Actual</h3>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="hour" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
              labelStyle={{ color: '#999' }}
            />
            <Legend />
            <Line type="monotone" dataKey="actual" stroke="#0ea5e9" strokeWidth={2} name="Actual Price" />
            <Line type="monotone" dataKey="predicted" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" name="AI Prediction" />
            <Line type="monotone" dataKey="upperBound" stroke="#666" strokeWidth={1} strokeDasharray="2 2" name="Upper Bound" />
            <Line type="monotone" dataKey="lowerBound" stroke="#666" strokeWidth={1} strokeDasharray="2 2" name="Lower Bound" />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Predictions Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-effect rounded-xl p-6"
      >
        <h3 className="text-xl font-bold text-white mb-4">Multi-Asset Predictions</h3>
        <div className="space-y-3">
          {predictions.map((pred, index) => (
            <motion.div
              key={pred.asset}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="glass-effect rounded-lg p-4 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-quantum-400 to-purple-600 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-lg">{pred.asset}</div>
                    <div className="text-sm text-gray-400">{pred.aiModel}</div>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full border font-medium text-sm ${getSignalColor(pred.signal)}`}>
                  {pred.signal}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div>
                  <div className="text-xs text-gray-400 mb-1">Current</div>
                  <div className="font-bold text-white">${pred.currentPrice.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-1">1h Prediction</div>
                  <div className={`font-bold ${pred.predicted1h > pred.currentPrice ? 'text-green-400' : 'text-red-400'}`}>
                    ${pred.predicted1h.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-1">24h Prediction</div>
                  <div className={`font-bold ${pred.predicted24h > pred.currentPrice ? 'text-green-400' : 'text-red-400'}`}>
                    ${pred.predicted24h.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-1">7d Prediction</div>
                  <div className={`font-bold ${pred.predicted7d > pred.currentPrice ? 'text-green-400' : 'text-red-400'}`}>
                    ${pred.predicted7d.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-1">Confidence</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500"
                        style={{ width: `${pred.confidence}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-white">{pred.confidence.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* AI Models Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-effect rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <Zap className="w-6 h-6 text-yellow-400" />
            <h4 className="font-bold text-white">Transformer Models</h4>
          </div>
          <p className="text-gray-400 text-sm mb-3">Multi-head attention mechanism for pattern recognition across time series data</p>
          <div className="flex items-center gap-2 text-green-400 text-sm">
            <CheckCircle className="w-4 h-4" />
            <span>Active & Training</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-effect rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <Brain className="w-6 h-6 text-purple-400" />
            <h4 className="font-bold text-white">LSTM Networks</h4>
          </div>
          <p className="text-gray-400 text-sm mb-3">Long short-term memory for capturing long-range dependencies in market data</p>
          <div className="flex items-center gap-2 text-green-400 text-sm">
            <CheckCircle className="w-4 h-4" />
            <span>Active & Training</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-effect rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <AlertCircle className="w-6 h-6 text-quantum-400" />
            <h4 className="font-bold text-white">Ensemble Learning</h4>
          </div>
          <p className="text-gray-400 text-sm mb-3">Combining multiple models for improved accuracy and reduced prediction variance</p>
          <div className="flex items-center gap-2 text-green-400 text-sm">
            <CheckCircle className="w-4 h-4" />
            <span>Active & Training</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}