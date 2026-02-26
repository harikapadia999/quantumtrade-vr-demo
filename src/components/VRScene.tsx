import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Box, Sphere, MeshDistortMaterial, Float } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import { Eye, Maximize2, RotateCcw } from 'lucide-react'

function TradingDataCube({ position, color, label, value }: any) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01
      meshRef.current.rotation.y += 0.01
      if (hovered) {
        meshRef.current.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.1)
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
      }
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group position={position}>
        <Box
          ref={meshRef}
          args={[1, 1, 1]}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <meshStandardMaterial color={color} wireframe={hovered} />
        </Box>
        <Text
          position={[0, 1.5, 0]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
        <Text
          position={[0, -1.5, 0]}
          fontSize={0.4}
          color={color}
          anchorX="center"
          anchorY="middle"
          font="bold"
        >
          {value}
        </Text>
      </group>
    </Float>
  )
}

function PriceOrb({ position }: any) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.3
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.5
    }
  })

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} position={position}>
      <MeshDistortMaterial
        color="#0ea5e9"
        attach="material"
        distort={0.3}
        speed={2}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  )
}

function GridFloor() {
  return (
    <gridHelper args={[20, 20, '#0ea5e9', '#333']} position={[0, -3, 0]} />
  )
}

export default function VRScene() {
  const [autoRotate, setAutoRotate] = useState(true)

  const tradingData = [
    { position: [-3, 0, 0], color: '#10b981', label: 'BTC/USD', value: '$47,250' },
    { position: [0, 0, 0], color: '#8b5cf6', label: 'ETH/USD', value: '$2,950' },
    { position: [3, 0, 0], color: '#f59e0b', label: 'Portfolio', value: '$156K' },
    { position: [-3, 3, -2], color: '#ef4444', label: 'Risk', value: '2.3%' },
    { position: [3, 3, -2], color: '#06b6d4', label: 'Sharpe', value: '2.34' },
  ]

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-effect rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">VR Trading Environment</h2>
            <p className="text-gray-400">Immersive 3D data visualization - Use mouse to rotate and zoom</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className="px-4 py-2 rounded-lg glass-effect hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              <RotateCcw className={`w-4 h-4 ${autoRotate ? 'text-quantum-400' : 'text-gray-400'}`} />
              <span className="text-sm text-white">Auto Rotate</span>
            </button>
            <button className="px-4 py-2 rounded-lg glass-effect hover:bg-white/10 transition-colors flex items-center gap-2">
              <Eye className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-white">Enter VR</span>
            </button>
          </div>
        </div>

        <div className="relative w-full h-[600px] rounded-xl overflow-hidden bg-black/50">
          <Canvas camera={{ position: [0, 2, 10], fov: 60 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0ea5e9" />
            <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={1} castShadow />

            {/* Trading Data Cubes */}
            {tradingData.map((data, index) => (
              <TradingDataCube key={index} {...data} />
            ))}

            {/* Central Price Orb */}
            <PriceOrb position={[0, -1, -3]} />

            {/* Grid Floor */}
            <GridFloor />

            {/* Controls */}
            <OrbitControls 
              enableZoom={true} 
              enablePan={true} 
              autoRotate={autoRotate}
              autoRotateSpeed={1}
            />
          </Canvas>

          {/* VR Instructions Overlay */}
          <div className="absolute bottom-4 left-4 right-4 glass-effect rounded-lg p-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                  <span className="text-gray-300">Real-time Data</span>
                </div>
                <div className="flex items-center gap-2">
                  <Maximize2 className="w-4 h-4 text-quantum-400" />
                  <span className="text-gray-300">Drag to rotate</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-purple-400" />
                  <span className="text-gray-300">Scroll to zoom</span>
                </div>
              </div>
              <div className="text-quantum-400 font-medium">WebXR Ready</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* VR Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-effect rounded-xl p-6"
        >
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
            <Eye className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Spatial Trading</h3>
          <p className="text-gray-400 text-sm">Navigate through 3D market data with intuitive hand gestures and voice commands</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-effect rounded-xl p-6"
        >
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4">
            <Maximize2 className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Multi-Asset View</h3>
          <p className="text-gray-400 text-sm">Monitor multiple markets simultaneously in immersive 360° environment</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-effect rounded-xl p-6"
        >
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-4">
            <RotateCcw className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Real-time Updates</h3>
          <p className="text-gray-400 text-sm">Live market data streaming with sub-millisecond latency visualization</p>
        </motion.div>
      </div>
    </div>
  )
}