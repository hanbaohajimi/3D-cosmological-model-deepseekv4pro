import { motion } from 'framer-motion'
import { RotateCcw, Telescope } from 'lucide-react'
import { useUniverseStore } from '@/store/useUniverseStore'
import { DEFAULT_POSITION, DEFAULT_LOOKAT } from '@/utils/camera'

export default function TopBar() {
  const { setSelectedBody, setViewMode, setCameraTarget, setIsPlaying } = useUniverseStore()

  const handleReset = () => {
    setSelectedBody(null)
    setViewMode('free')
    setIsPlaying(true)
    setCameraTarget(DEFAULT_POSITION, DEFAULT_LOOKAT)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        pointerEvents: 'auto',
      }}
    >
      {/* Logo / Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: 'linear-gradient(135deg, rgba(79,195,247,0.2), rgba(100,150,255,0.15))',
            border: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Telescope size={18} color="#aaccff" />
        </div>
        <div>
          <h1
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: 'var(--text-primary)',
              letterSpacing: '0.5px',
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            3D 宇宙探索
          </h1>
          <p
            style={{
              fontSize: 11,
              color: 'var(--text-muted)',
              margin: 0,
              letterSpacing: '1px',
            }}
          >
            SOLAR SYSTEM EXPLORER
          </p>
        </div>
      </div>

      {/* Reset button */}
      <motion.button
        whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.12)' }}
        whileTap={{ scale: 0.95 }}
        onClick={handleReset}
        className="glass-panel"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 16px',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 12,
          background: 'var(--bg-secondary)',
          color: 'var(--text-secondary)',
          fontSize: 13,
          cursor: 'pointer',
          backdropFilter: 'var(--glass-blur)',
          fontFamily: 'inherit',
          letterSpacing: '0.3px',
        }}
      >
        <RotateCcw size={14} />
        重置视角
      </motion.button>
    </motion.div>
  )
}
