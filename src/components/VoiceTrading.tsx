import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, MicOff, Volume2, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react'

interface VoiceCommand {
  id: string
  command: string
  interpretation: string
  action: string
  status: 'processing' | 'executed' | 'failed'
  timestamp: string
}

export default function VoiceTrading() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [commands, setCommands] = useState<VoiceCommand[]>([
    {
      id: '1',
      command: 'Buy 2 Bitcoin at market price',
      interpretation: 'Market order: BUY 2 BTC',
      action: 'Order executed at $47,250',
      status: 'executed',
      timestamp: '2 minutes ago'
    },
    {
      id: '2',
      command: 'Set stop loss for Ethereum at 2800',
      interpretation: 'Stop-loss order: ETH @ $2,800',
      action: 'Stop-loss order placed',
      status: 'executed',
      timestamp: '5 minutes ago'
    },
    {
      id: '3',
      command: 'Show me portfolio performance',
      interpretation: 'Query: Portfolio analytics',
      action: 'Dashboard updated',
      status: 'executed',
      timestamp: '8 minutes ago'
    }
  ])

  const exampleCommands = [
    'Buy 5 Ethereum at market price',
    'Sell 100 shares of Apple',
    'Set stop loss for Bitcoin at 45000',
    'Show me my portfolio',
    'What is the current price of Tesla?',
    'Place limit order for Ethereum at 2900'
  ]

  const toggleListening = () => {
    setIsListening(!isListening)
    if (!isListening) {
      // Simulate voice recognition
      setTimeout(() => {
        const randomCommand = exampleCommands[Math.floor(Math.random() * exampleCommands.length)]
        setTranscript(randomCommand)
        
        setTimeout(() => {
          const newCommand: VoiceCommand = {
            id: Date.now().toString(),
            command: randomCommand,
            interpretation: `Interpreted: ${randomCommand}`,
            action: 'Processing...',
            status: 'processing',
            timestamp: 'Just now'
          }
          setCommands(prev => [newCommand, ...prev])
          
          setTimeout(() => {
            setCommands(prev => prev.map(cmd => 
              cmd.id === newCommand.id 
                ? { ...cmd, status: 'executed' as const, action: 'Order executed successfully' }
                : cmd
            ))
            setIsListening(false)
            setTranscript('')
          }, 2000)
        }, 1000)
      }, 2000)
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
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center">
            <Volume2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Voice Trading Interface</h2>
            <p className="text-gray-400">Natural language processing for hands-free trading</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="glass-effect rounded-lg p-4">
            <div className="text-sm text-gray-400 mb-1">Commands Today</div>
            <div className="text-2xl font-bold text-white">47</div>
          </div>
          <div className="glass-effect rounded-lg p-4">
            <div className="text-sm text-gray-400 mb-1">Success Rate</div>
            <div className="text-2xl font-bold text-green-400">98.3%</div>
          </div>
          <div className="glass-effect rounded-lg p-4">
            <div className="text-sm text-gray-400 mb-1">Avg Response</div>
            <div className="text-2xl font-bold text-quantum-400">0.8s</div>
          </div>
          <div className="glass-effect rounded-lg p-4">
            <div className="text-sm text-gray-400 mb-1">Languages</div>
            <div className="text-2xl font-bold text-purple-400">12</div>
          </div>
        </div>
      </motion.div>

      {/* Voice Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-effect rounded-xl p-8"
      >
        <div className="flex flex-col items-center justify-center space-y-6">
          <motion.button
            onClick={toggleListening}
            className={`w-32 h-32 rounded-full flex items-center justify-center transition-all ${
              isListening
                ? 'bg-gradient-to-br from-red-500 to-rose-500 shadow-lg shadow-red-500/50 animate-pulse'
                : 'bg-gradient-to-br from-quantum-500 to-purple-600 hover:shadow-lg hover:shadow-quantum-500/50'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isListening ? (
              <Mic className="w-16 h-16 text-white" />
            ) : (
              <MicOff className="w-16 h-16 text-white" />
            )}
          </motion.button>

          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-2">
              {isListening ? 'Listening...' : 'Click to speak'}
            </h3>
            <p className="text-gray-400">
              {isListening ? 'Say your trading command' : 'Tap the microphone and speak naturally'}
            </p>
          </div>

          <AnimatePresence>
            {transcript && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="w-full max-w-2xl glass-effect rounded-lg p-6"
              >
                <div className="flex items-start gap-3">
                  <Volume2 className="w-5 h-5 text-quantum-400 mt-1" />
                  <div className="flex-1">
                    <div className="text-sm text-gray-400 mb-1">You said:</div>
                    <div className="text-lg text-white font-medium">{transcript}</div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Example Commands */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-effect rounded-xl p-6"
      >
        <h3 className="text-xl font-bold text-white mb-4">Example Voice Commands</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {exampleCommands.map((cmd, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
              onClick={() => {
                setTranscript(cmd)
                setIsListening(true)
                setTimeout(() => {
                  const newCommand: VoiceCommand = {
                    id: Date.now().toString(),
                    command: cmd,
                    interpretation: `Interpreted: ${cmd}`,
                    action: 'Order executed successfully',
                    status: 'executed',
                    timestamp: 'Just now'
                  }
                  setCommands(prev => [newCommand, ...prev])
                  setIsListening(false)
                  setTranscript('')
                }, 2000)
              }}
            >
              <Volume2 className="w-4 h-4 text-quantum-400" />
              <span className="text-sm text-gray-300">{cmd}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Command History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-effect rounded-xl p-6"
      >
        <h3 className="text-xl font-bold text-white mb-4">Recent Commands</h3>
        <div className="space-y-3">
          {commands.map((cmd, index) => (
            <motion.div
              key={cmd.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="glass-effect rounded-lg p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3 flex-1">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    cmd.status === 'executed' ? 'bg-green-500/20' :
                    cmd.status === 'processing' ? 'bg-yellow-500/20' :
                    'bg-red-500/20'
                  }`}>
                    {cmd.status === 'executed' ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : cmd.status === 'processing' ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      >
                        <TrendingUp className="w-5 h-5 text-yellow-400" />
                      </motion.div>
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-white mb-1">{cmd.command}</div>
                    <div className="text-sm text-gray-400 mb-1">{cmd.interpretation}</div>
                    <div className={`text-sm font-medium ${
                      cmd.status === 'executed' ? 'text-green-400' :
                      cmd.status === 'processing' ? 'text-yellow-400' :
                      'text-red-400'
                    }`}>
                      {cmd.action}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">{cmd.timestamp}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* NLP Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-effect rounded-xl p-6"
        >
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4">
            <Volume2 className="w-6 h-6 text-white" />
          </div>
          <h4 className="font-bold text-white mb-2">Multi-Language Support</h4>
          <p className="text-gray-400 text-sm">Trade in English, Spanish, Mandarin, Hindi, and 8 more languages</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-effect rounded-xl p-6"
        >
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
          <h4 className="font-bold text-white mb-2">Intent Recognition</h4>
          <p className="text-gray-400 text-sm">Advanced NLP understands context and trading intent with 98% accuracy</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-effect rounded-xl p-6"
        >
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-4">
            <Mic className="w-6 h-6 text-white" />
          </div>
          <h4 className="font-bold text-white mb-2">Noise Cancellation</h4>
          <p className="text-gray-400 text-sm">AI-powered noise filtering works in any environment</p>
        </motion.div>
      </div>
    </div>
  )
}