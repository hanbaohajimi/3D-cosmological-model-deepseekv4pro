import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useDeviceDetect } from '@/hooks/useDeviceDetect'
import { useUniverseStore } from '@/store/useUniverseStore'
import { DEFAULT_POSITION } from '@/utils/camera'
import SolarSystem from './universe/SolarSystem'
import Starfield from './universe/Starfield'
import PostProcessing from './effects/PostProcessing'
import CameraController from './camera/CameraController'

// Advances simulated time every frame when playing
function TimeUpdater() {
  const lastTimeRef = useRef(0)
  useFrame((state) => {
    const now = state.clock.elapsedTime * 1000
    if (lastTimeRef.current === 0) { lastTimeRef.current = now; return }
    const dt = now - lastTimeRef.current
    lastTimeRef.current = now

    const store = useUniverseStore.getState()
    if (store.isPlaying) {
      const advance = dt * 86400 * store.speedMultiplier // dt(ms) → simulated days: 1 real sec = 1 sim day at 1x
      store.jumpToTimestamp(store.simulatedTimestamp + advance)
    }
  })
  return null
}

interface SceneProps {
  onLoaded: () => void
}

export default function Scene({ onLoaded }: SceneProps) {
  const { isMobile } = useDeviceDetect()

  return (
    <Canvas
      camera={{ position: DEFAULT_POSITION, fov: isMobile ? 55 : 50, near: 0.1, far: 800 }}
      dpr={isMobile ? [1, 1.5] : [1, 2]}
      gl={{
        antialias: false,
        alpha: false,
        powerPreference: 'high-performance',
      }}
      style={{ position: 'absolute', top: 0, left: 0 }}
      onCreated={() => {
        setTimeout(() => onLoaded(), 500)
      }}
    >
      <TimeUpdater />
      <PostProcessing />
      <CameraController />
      <ambientLight intensity={0.4} />
      <hemisphereLight args={['#334466', '#110022', 0.3]} />
      <Starfield />
      <SolarSystem />
    </Canvas>
  )
}
