import { AnimatePresence } from 'framer-motion'
import TopBar from './TopBar'
import PlanetNav from './PlanetNav'
import InfoPanel from './InfoPanel'
import Controls, { OrbitToggle } from './Controls'
import TimeDisplay from './TimeDisplay'
import ZoomHint from './ZoomHint'

interface UILayerProps {
  visible: boolean
}

export default function UILayer({ visible }: UILayerProps) {
  if (!visible) return null

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10 }}>
      <AnimatePresence>
        <TopBar />
        <TimeDisplay />
        <OrbitToggle />
        <PlanetNav />
        <InfoPanel />
        <Controls />
        <ZoomHint />
      </AnimatePresence>
    </div>
  )
}
