import { motion } from 'framer-motion'
import { planets, sunData } from '@/data/planets'
import { useUniverseStore } from '@/store/useUniverseStore'
import { calcCameraTarget } from '@/utils/camera'
import type { CelestialBody } from '@/types/celestial'

function PlanetIcon({ body, selected }: { body: CelestialBody; selected: boolean }) {
  const color = body.color
  const size = selected ? 52 : 44

  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      {/* Saturn ring */}
      {body.hasRings && (
        <div
          style={{
            position: 'absolute',
            top: '45%',
            left: '-18%',
            width: '136%',
            height: '14%',
            borderRadius: '50%',
            background: `linear-gradient(90deg, transparent 5%, ${color}88 20%, ${color}cc 50%, ${color}88 80%, transparent 95%)`,
            transform: 'rotate(-15deg)',
            boxShadow: selected ? `0 0 8px ${color}66` : 'none',
            transition: 'all 0.3s ease',
          }}
        />
      )}
      {/* Planet body */}
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: `radial-gradient(circle at 35% 35%, ${color}, rgba(0,0,0,0.6))`,
          boxShadow: selected
            ? `0 0 20px var(--accent), 0 0 8px ${color}aa`
            : `0 0 4px ${color}44`,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />
    </div>
  )
}

export default function PlanetNav() {
  const { setSelectedBody, setCameraTarget, setIsPlaying, setViewMode, selectedBody, planetWorldPositions } = useUniverseStore()
  const allBodies = [sunData, ...planets]

  const handleClick = (body: CelestialBody) => {
    setSelectedBody(body)
    setIsPlaying(false)
    setViewMode('focused')

    const worldPos = planetWorldPositions[body.id]
    if (worldPos) {
      const { target, lookAt } = calcCameraTarget(worldPos, body.radius)
      setCameraTarget(target, lookAt)
    } else {
      const { target, lookAt } = calcCameraTarget([body.orbitRadius, 0, 0], body.radius)
      setCameraTarget(target, lookAt)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      style={{
        position: 'absolute',
        bottom: 24,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: 10,
        pointerEvents: 'auto',
        padding: '10px 16px',
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border)',
        borderRadius: 20,
        backdropFilter: 'var(--glass-blur)',
        WebkitBackdropFilter: 'var(--glass-blur)',
        overflowX: 'auto',
        maxWidth: 'calc(100vw - 32px)',
      }}
    >
      {allBodies.map((body) => {
        const isSelected = selectedBody?.id === body.id

        return (
          <motion.button
            key={body.id}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
            animate={{ scale: isSelected ? 1.1 : 1 }}
            onClick={() => handleClick(body)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 6,
              padding: '8px 14px',
              borderRadius: 16,
              border: isSelected
                ? '1.5px solid var(--accent)'
                : '1px solid transparent',
              background: isSelected
                ? 'var(--accent-dim)'
                : 'transparent',
              cursor: 'pointer',
              fontFamily: 'inherit',
              minWidth: 68,
              transition: 'border 0.2s, background 0.2s',
            }}
          >
            <PlanetIcon body={body} selected={isSelected} />
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: isSelected ? 600 : 400,
                  color: isSelected ? 'var(--accent)' : 'var(--text-primary)',
                  transition: 'color 0.2s',
                  lineHeight: 1.3,
                }}
              >
                {body.name}
              </div>
              <div
                style={{
                  fontSize: 9,
                  color: 'var(--text-muted)',
                  letterSpacing: '0.5px',
                  lineHeight: 1.2,
                }}
              >
                {body.nameEn}
              </div>
            </div>
          </motion.button>
        )
      })}
    </motion.div>
  )
}
