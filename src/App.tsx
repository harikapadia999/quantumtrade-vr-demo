import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, Brain, Zap, Globe, Mic, Eye, Activity } from 'lucide-react'
import TradingDashboard from './components/TradingDashboard'
import VRScene from './components/VRScene'
import AIPredictions from './components/AIPredictions'
import QuantumOptimizer from './components/QuantumOptimizer'
import VoiceTrading from './components/VoiceTrading'
import SocialFeed from './components/SocialFeed'

type ViewMode = 'dashboard' | 'vr' | 'ai' | 'quantum' | 'voice' | 'social'

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('dashboard')
  const [isVRSupported, setIsVRSupported] = useState(false)

  useEffect(() => {
    // Check for WebXR support
    if ('xr' in navigator) {
      (navigator as any).xr?.isSessionSupported('immersive-vr').then((supported: boolean) => {
        setIsVRSupported(supported)
      })
    }
  }, [])

  const navItems = [
    { id: 'dashboard' as ViewMode, icon: Activity, label: 'Trading Dashboard', color: 'from-blue-500 to-cyan-500' },
    { id: 'vr' as ViewMode, icon: Eye, label: 'VR Environment', color: 'from-purple-500 to-pink-500' },
    { id: 'ai' as ViewMode, icon: Brain, label: 'AI Predictions', color: 'from-green-500 to-emerald-500' },
    { id: 'quantum' as ViewMode, icon: Zap, label: 'Quantum Optimizer', color: 'from-yellow-500 to-orange-500' },
    { id: 'voice' as ViewMode, icon: Mic, label: 'Voice Trading', color: 'from-red-500 to-rose-500' },
    { id: 'social' as ViewMode, icon: Globe, label: 'Social Trading', color: 'from-indigo-500 to-violet-500' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-quantum-400 to-purple-600 flex items-center justify-center glow-effect">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gradient">QuantumTrade 2030</h1>
                <p className="text-xs text-gray-400">Next-Gen VR/AR Trading Platform</p>
              </div>
            </motion.div>

            <div className="flex items-center gap-2">
              <div className="px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-medium">
                ● LIVE DEMO
              </div>
              {isVRSupported && (
                <div className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-400 text-xs font-medium">
                  VR Ready
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="fixed top-20 left-0 right-0 z-40 px-6">
        <div className="container mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => setViewMode(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                  viewMode === item.id
                    ? 'glass-effect glow-effect'
                    : 'bg-white/5 hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <item.icon className={`w-4 h-4 ${viewMode === item.id ? 'text-quantum-400' : 'text-gray-400'}`} />
                <span className={`text-sm font-medium ${viewMode === item.id ? 'text-white' : 'text-gray-400'}`}>
                  {item.label}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-36 pb-8 px-6">
        <div className="container mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={viewMode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {viewMode === 'dashboard' && <TradingDashboard />}
              {viewMode === 'vr' && <VRScene />}
              {viewMode === 'ai' && <AIPredictions />}
              {viewMode === 'quantum' && <QuantumOptimizer />}
              {viewMode === 'voice' && <VoiceTrading />}
              {viewMode === 'social' && <SocialFeed />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 glass-effect border-t border-white/10 py-3 px-6">
        <div className="container mx-auto flex items-center justify-between text-xs text-gray-400">
          <div>Built with React + Three.js + WebXR</div>
          <div className="flex items-center gap-4">
            <span>Real-time Market Data</span>
            <span>●</span>
            <span>AI-Powered Predictions</span>
            <span>●</span>
            <span>Quantum Optimization</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App