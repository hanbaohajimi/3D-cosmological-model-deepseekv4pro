import { motion } from 'framer-motion'
import { Calendar } from 'lucide-react'
import { useUniverseStore } from '@/store/useUniverseStore'

function formatDate(ts: number): string {
  const d = new Date(ts)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}年${m}月${day}日`
}

export default function TimeDisplay() {
  const { simulatedTimestamp } = useUniverseStore()

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.6 }}
      style={{
        position: 'absolute',
        top: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        pointerEvents: 'auto',
        padding: '8px 18px',
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border)',
        borderRadius: 14,
        backdropFilter: 'var(--glass-blur)',
        WebkitBackdropFilter: 'var(--glass-blur)',
      }}
    >
      <Calendar size={14} color="var(--accent)" />
      <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)', letterSpacing: '0.5px' }}>
        {formatDate(simulatedTimestamp)}
      </span>
    </motion.div>
  )
}
