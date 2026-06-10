import { motion } from 'framer-motion'
import { Telescope } from 'lucide-react'

export default function LoadingScreen() {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(ellipse at center, #0a0a2e 0%, #020010 60%, #000000 100%)',
        gap: 24,
      }}
    >
      {/* Animated logo */}
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
          scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
        }}
        style={{
          width: 80,
          height: 80,
          borderRadius: 20,
          background: 'linear-gradient(135deg, rgba(100,150,255,0.15), rgba(200,100,255,0.1))',
          border: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Telescope size={32} color="#aaccff" />
      </motion.div>

      <div style={{ textAlign: 'center' }}>
        <h1
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: '#e0e0f0',
            letterSpacing: '2px',
            margin: 0,
            marginBottom: 8,
          }}
        >
          3D 宇宙探索
        </h1>
        <p
          style={{
            fontSize: 13,
            color: '#6666aa',
            margin: 0,
            letterSpacing: '1px',
          }}
        >
          SOLAR SYSTEM EXPLORER
        </p>
      </div>

      {/* Loading bar */}
      <div
        style={{
          width: 200,
          height: 2,
          borderRadius: 1,
          background: 'rgba(255,255,255,0.08)',
          overflow: 'hidden',
        }}
      >
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #4a6aaa, #88aaff, #4a6aaa)',
            borderRadius: 1,
          }}
        />
      </div>

      <p style={{ fontSize: 11, color: '#555577', letterSpacing: '2px' }}>
        正在加载宇宙模型...
      </p>
    </motion.div>
  )
}
