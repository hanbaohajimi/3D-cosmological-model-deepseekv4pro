import { motion } from 'framer-motion'
import { Play, Pause, Gauge, Orbit } from 'lucide-react'
import { useUniverseStore } from '@/store/useUniverseStore'
import DatePicker from './DatePicker'

const SPEED_OPTIONS = [0.25, 0.5, 1, 2, 4]

export default function Controls() {
  const { isPlaying, setIsPlaying, speedMultiplier, setSpeedMultiplier } = useUniverseStore()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      style={{
        position: 'absolute',
        bottom: 120,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        pointerEvents: 'auto',
        padding: '6px 8px 6px 14px',
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border)',
        borderRadius: 20,
        backdropFilter: 'var(--glass-blur)',
        WebkitBackdropFilter: 'var(--glass-blur)',
      }}
    >
      {/* Play/Pause */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsPlaying(!isPlaying)}
        className="glass-btn"
        style={{ border: isPlaying ? undefined : '1px solid var(--accent)' }}
      >
        {isPlaying ? <Pause size={13} /> : <Play size={13} />}
        {isPlaying ? '暂停' : '播放'}
      </motion.button>

      <div style={{ width: 1, height: 20, background: 'var(--border)' }} />

      {/* Speed */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <Gauge size={13} color="var(--text-muted)" style={{ marginRight: 2 }} />
        {SPEED_OPTIONS.map((speed) => (
          <motion.button
            key={speed}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSpeedMultiplier(speed)}
            style={{
              padding: '4px 8px',
              borderRadius: 10,
              border: 'none',
              background: speedMultiplier === speed ? 'var(--accent-dim)' : 'transparent',
              color: speedMultiplier === speed ? 'var(--accent)' : 'var(--text-muted)',
              fontSize: 11,
              fontWeight: speedMultiplier === speed ? 500 : 400,
              cursor: 'pointer',
              fontFamily: 'inherit',
              minWidth: 30,
            }}
          >
            {speed}x
          </motion.button>
        ))}
      </div>

      <div style={{ width: 1, height: 20, background: 'var(--border)' }} />

      {/* Date Picker */}
      <DatePicker />
    </motion.div>
  )
}

// Orbit toggle — positioned top-left
export function OrbitToggle() {
  const { showOrbits, setShowOrbits } = useUniverseStore()

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.7 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setShowOrbits(!showOrbits)}
      className="glass-btn"
      style={{
        position: 'absolute',
        top: 80,
        left: 24,
        pointerEvents: 'auto',
        background: showOrbits ? 'var(--accent-dim)' : 'var(--bg-secondary)',
        border: showOrbits ? '1px solid var(--accent)' : '1px solid var(--border)',
        zIndex: 20,
      }}
    >
      <Orbit size={14} color={showOrbits ? 'var(--accent)' : 'var(--text-muted)'} />
      <span style={{ color: showOrbits ? 'var(--accent)' : 'var(--text-secondary)' }}>
        轨道 {showOrbits ? 'ON' : 'OFF'}
      </span>
    </motion.button>
  )
}
