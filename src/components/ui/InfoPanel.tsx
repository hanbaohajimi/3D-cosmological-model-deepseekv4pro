import { motion, AnimatePresence } from 'framer-motion'
import { X, Ruler, Thermometer, Clock, Satellite, FlaskConical } from 'lucide-react'
import { useUniverseStore } from '@/store/useUniverseStore'
import { celestialData } from '@/data/educational'

export default function InfoPanel() {
  const { selectedBody, setSelectedBody, setViewMode } = useUniverseStore()

  const handleClose = () => {
    setSelectedBody(null)
    setViewMode('free')
  }

  const body = selectedBody ? celestialData[selectedBody.id] : null
  const isStar = body?.type === 'star'

  return (
    <AnimatePresence>
      {body && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(10,14,26,0.5)',
              pointerEvents: 'auto',
              zIndex: 9,
            }}
          />
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              right: 20,
              top: 90,
              width: 340,
              maxHeight: 'calc(100vh - 130px)',
              overflowY: 'auto',
              pointerEvents: 'auto',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: 20,
              padding: 24,
              backdropFilter: 'var(--glass-blur)',
              WebkitBackdropFilter: 'var(--glass-blur)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(79,195,247,0.05) inset',
              zIndex: 10,
            }}
          >
          {/* Close button */}
          <button
            onClick={handleClose}
            style={{
              position: 'absolute',
              top: 14,
              right: 14,
              background: 'var(--accent-dim)',
              border: 'none',
              borderRadius: 8,
              width: 28,
              height: 28,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-secondary)',
            }}
          >
            <X size={14} />
          </button>

          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 16 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              {body.name}
            </h2>
            <span style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 400 }}>
              {body.nameEn}
            </span>
          </div>

          {/* Type badge */}
          <span
            style={{
              display: 'inline-block',
              padding: '3px 10px',
              borderRadius: 20,
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: '1px',
              background: isStar ? 'rgba(255,180,50,0.15)' : 'rgba(100,150,255,0.15)',
              color: isStar ? '#ffcc66' : '#88aadd',
              marginBottom: 16,
              textTransform: 'uppercase',
            }}
          >
            {isStar ? '恒星 Star' : '行星 Planet'}
          </span>

          {/* Description */}
          <p style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: 20 }}>
            {body.description}
          </p>

          {/* Stats grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 10,
              marginBottom: 20,
            }}
          >
            <StatItem icon={<Ruler size={13} />} label="直径" value={body.diameter} />
            <StatItem icon={<Thermometer size={13} />} label="表面温度" value={`${body.temperatureMin}°C ~ ${body.temperatureMax}°C`} />
            <StatItem icon={<Clock size={13} />} label="公转周期" value={body.orbitalPeriodDays} />
            <StatItem icon={<Satellite size={13} />} label="卫星数量" value={`${body.moonCount} 颗`} />
            <StatItem icon={<Ruler size={13} />} label="距太阳距离" value={body.distanceFromSunKm} fullWidth />
          </div>

          {/* Composition */}
          <div style={{ marginBottom: 16 }}>
            <h4 style={{ fontSize: 12, fontWeight: 600, color: '#9999bb', marginBottom: 8, letterSpacing: '1px', textTransform: 'uppercase' }}>
              <FlaskConical size={12} style={{ display: 'inline', marginRight: 4 }} />
              主要组成
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {body.composition.map((comp, i) => (
                <span
                  key={i}
                  style={{
                    padding: '3px 8px',
                    borderRadius: 6,
                    fontSize: 11,
                    background: 'rgba(255,255,255,0.06)',
                    color: '#aaaacc',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  {comp}
                </span>
              ))}
            </div>
          </div>

          {/* Fun Facts */}
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 600, color: '#9999bb', marginBottom: 8, letterSpacing: '1px', textTransform: 'uppercase' }}>
              趣味知识
            </h4>
            <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
              {body.funFacts.slice(0, 3).map((fact, i) => (
                <li
                  key={i}
                  style={{
                    fontSize: 12,
                    lineHeight: 1.6,
                    color: '#9999bb',
                    padding: '6px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    display: 'flex',
                    gap: 8,
                  }}
                >
                  <span style={{ color: '#f0c060', flexShrink: 0 }}>✦</span>
                  {fact}
                </li>
              ))}
            </ul>
          </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function StatItem({
  icon,
  label,
  value,
  fullWidth,
}: {
  icon: React.ReactNode
  label: string
  value: string
  fullWidth?: boolean
}) {
  return (
    <div
      style={{
        padding: '10px 12px',
        borderRadius: 10,
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.05)',
        gridColumn: fullWidth ? 'span 2' : undefined,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4 }}>
        <span style={{ color: '#6666aa', display: 'flex' }}>{icon}</span>
        <span style={{ fontSize: 10, color: '#6666aa', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          {label}
        </span>
      </div>
      <div style={{ fontSize: 12, fontWeight: 500, color: '#ccddee' }}>
        {value}
      </div>
    </div>
  )
}
