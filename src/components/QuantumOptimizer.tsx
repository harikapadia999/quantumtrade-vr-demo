import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Zap, Cpu, TrendingUp, Shield, Target, Sparkles } from 'lucide-react'

interface PortfolioAsset {
  symbol: string
  currentAllocation: number
  optimizedAllocation: number
  expectedReturn: number
  risk: number
}

export default function QuantumOptimizer() {
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [portfolio, setPortfolio] = useState<PortfolioAsset[]>([
    { symbol: 'BTC', currentAllocation: 30, optimizedAllocation: 35, expectedReturn: 12.5, risk: 8.2 },
    { symbol: 'ETH', currentAllocation: 25, optimizedAllocation: 28, expectedReturn: 15.3, risk: 9.1 },
    { symbol: 'AAPL', currentAllocation: 20, optimizedAllocation: 18, expectedReturn: 8.7, risk: 4.5 },
    { symbol: 'TSLA', currentAllocation: 15, optimizedAllocation: 12, expectedReturn: 18.2, risk: 12.3 },
    { symbol: 'CASH', currentAllocation: 10, optimizedAllocation: 7, expectedReturn: 2.1, risk: 0.1 },
  ])

  const [metrics] = useState({
    currentSharpe: 1.85,
    optimizedSharpe: 2.34,
    currentReturn: 11.2,
    optimizedReturn: 13.8,
    currentRisk: 7.5,
    optimizedRisk: 6.8,
    qubits: 127,
    iterations: 10000
  })

  const runOptimization = () => {
    setIsOptimizing(true)
    setProgress(0)

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsOptimizing(false)
          return 100
        }
        return prev + 2
      })
    }, 50)
  }

  useEffect(() => {
    if (progress === 100) {
      // Simulate portfolio update
      setTimeout(() => {
        setPortfolio(prev => prev.map(asset => ({
          ...asset,
          currentAllocation: asset.optimizedAllocation
        })))
        setProgress(0)
      }, 1000)
    }
  }, [progress])

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-effect rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center animate-pulse-slow">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Quantum Portfolio Optimizer</h2>
              <p className="text-gray-400">QAOA algorithm with {metrics.qubits} qubits</p>
            </div>
          </div>
          <button
            onClick={runOptimization}
            disabled={isOptimizing}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              isOptimizing
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:shadow-lg hover:shadow-orange-500/50'
            } text-white`}
          >
            {isOptimizing ? 'Optimizing...' : 'Run Optimization'}
          </button>
        </div>

        {isOptimizing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Quantum Circuit Execution</span>
              <span className="text-sm font-bold text-white">{progress}%</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-yellow-500 to-orange-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="mt-2 text-xs text-gray-400">
              Processing {metrics.iterations.toLocaleString()} iterations across {metrics.qubits} qubits...
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="glass-effect rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Cpu className="w-4 h-4 text-quantum-400" />
              <span className="text-sm text-gray-400">Qubits</span>
            </div>
            <div className="text-2xl font-bold text-white">{metrics.qubits}</div>
          </div>
          <div className="glass-effect rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-green-400" />
              <span className="text-sm text-gray-400">Iterations</span>
            </div>
            <div className="text-2xl font-bold text-white">{(metrics.iterations / 1000).toFixed(0)}K</div>
          </div>
          <div className="glass-effect rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-gray-400">Sharpe Gain</span>
            </div>
            <div className="text-2xl font-bold text-green-400">+{((metrics.optimizedSharpe - metrics.currentSharpe) / metrics.currentSharpe * 100).toFixed(1)}%</div>
          </div>
          <div className="glass-effect rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-gray-400">Risk Reduction</span>
            </div>
            <div className="text-2xl font-bold text-green-400">-{((metrics.currentRisk - metrics.optimizedRisk) / metrics.currentRisk * 100).toFixed(1)}%</div>
          </div>
        </div>
      </motion.div>

      {/* Performance Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-effect rounded-xl p-6"
        >
          <h3 className="text-xl font-bold text-white mb-4">Current Portfolio</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Expected Return</span>
              <span className="text-2xl font-bold text-white">{metrics.currentReturn}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Risk (Volatility)</span>
              <span className="text-2xl font-bold text-red-400">{metrics.currentRisk}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Sharpe Ratio</span>
              <span className="text-2xl font-bold text-yellow-400">{metrics.currentSharpe}</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-effect rounded-xl p-6 border-2 border-green-500/30"
        >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-green-400" />
            <h3 className="text-xl font-bold text-white">Quantum Optimized</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Expected Return</span>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-green-400">{metrics.optimizedReturn}%</span>
                <span className="text-sm text-green-400">+{(metrics.optimizedReturn - metrics.currentReturn).toFixed(1)}%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Risk (Volatility)</span>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-green-400">{metrics.optimizedRisk}%</span>
                <span className="text-sm text-green-400">-{(metrics.currentRisk - metrics.optimizedRisk).toFixed(1)}%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Sharpe Ratio</span>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-green-400">{metrics.optimizedSharpe}</span>
                <span className="text-sm text-green-400">+{(metrics.optimizedSharpe - metrics.currentSharpe).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Portfolio Allocation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-effect rounded-xl p-6"
      >
        <h3 className="text-xl font-bold text-white mb-4">Asset Allocation Optimization</h3>
        <div className="space-y-4">
          {portfolio.map((asset, index) => (
            <motion.div
              key={asset.symbol}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="glass-effect rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-bold text-white text-lg">{asset.symbol}</div>
                  <div className="text-sm text-gray-400">
                    Return: {asset.expectedReturn}% | Risk: {asset.risk}%
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400">Current → Optimized</div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold">{asset.currentAllocation}%</span>
                    <span className="text-gray-500">→</span>
                    <span className={`font-bold ${
                      asset.optimizedAllocation > asset.currentAllocation ? 'text-green-400' : 
                      asset.optimizedAllocation < asset.currentAllocation ? 'text-red-400' : 'text-gray-400'
                    }`}>
                      {asset.optimizedAllocation}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <div className="text-xs text-gray-400 mb-1">Current</div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-quantum-500 transition-all duration-500"
                      style={{ width: `${asset.currentAllocation}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-1">Optimized</div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500"
                      style={{ width: `${asset.optimizedAllocation}%` }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quantum Algorithm Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-effect rounded-xl p-6"
      >
        <h3 className="text-xl font-bold text-white mb-4">Quantum Algorithm Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="text-sm text-gray-400 mb-2">Algorithm</div>
            <div className="font-bold text-white">QAOA (Quantum Approximate Optimization Algorithm)</div>
          </div>
          <div>
            <div className="text-sm text-gray-400 mb-2">Backend</div>
            <div className="font-bold text-white">IBM Quantum System One</div>
          </div>
          <div>
            <div className="text-sm text-gray-400 mb-2">Circuit Depth</div>
            <div className="font-bold text-white">p=10 layers</div>
          </div>
        </div>
        <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
          <p className="text-sm text-gray-300">
            <strong className="text-yellow-400">Quantum Advantage:</strong> Traditional optimization would take hours for this portfolio size. 
            Quantum computing reduces it to seconds while exploring exponentially more solution combinations.
          </p>
        </div>
      </motion.div>
    </div>
  )
}