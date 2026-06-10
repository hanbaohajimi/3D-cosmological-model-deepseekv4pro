import { useRef, useCallback, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useUniverseStore } from '@/store/useUniverseStore'

export default function CameraController() {
  const controlsRef = useRef<any>(null!)
  const { cameraTarget, cameraLookAt, clearCameraTarget, setViewMode } = useUniverseStore()
  const { camera, gl } = useThree()
  const animatingRef = useRef(false)
  const startPosRef = useRef(new THREE.Vector3())
  const endPosRef = useRef(new THREE.Vector3())
  const startLookRef = useRef(new THREE.Vector3())
  const endLookRef = useRef(new THREE.Vector3())
  const progressRef = useRef(0)
  // Track previous target to detect changes
  const prevTargetRef = useRef<[number, number, number] | null>(null)

  // Context menu (right-click) to deselect
  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      const store = useUniverseStore.getState()
      store.setSelectedBody(null)
      store.setViewMode('free')
      store.clearCameraTarget()
    }
    gl.domElement.addEventListener('contextmenu', handler)
    return () => gl.domElement.removeEventListener('contextmenu', handler)
  }, [gl])

  // Animate camera to target
  useFrame((_, delta) => {
    if (!cameraTarget || !controlsRef.current) {
      animatingRef.current = false
      prevTargetRef.current = null
      return
    }

    // Detect if target changed — restart animation
    const targetChanged =
      !prevTargetRef.current ||
      prevTargetRef.current[0] !== cameraTarget[0] ||
      prevTargetRef.current[1] !== cameraTarget[1] ||
      prevTargetRef.current[2] !== cameraTarget[2]

    if (targetChanged) {
      startPosRef.current.copy(camera.position)
      startLookRef.current.copy(controlsRef.current.target)
      endPosRef.current.set(cameraTarget[0], cameraTarget[1], cameraTarget[2])
      endLookRef.current.set(cameraLookAt[0], cameraLookAt[1], cameraLookAt[2])
      progressRef.current = 0
      animatingRef.current = true
      prevTargetRef.current = [cameraTarget[0], cameraTarget[1], cameraTarget[2]]
      setViewMode('focused')
    }

    progressRef.current += delta * 1.5
    if (progressRef.current >= 1) {
      progressRef.current = 1
      animatingRef.current = false
      prevTargetRef.current = null
      camera.position.copy(endPosRef.current)
      controlsRef.current.target.copy(endLookRef.current)
      clearCameraTarget()
    } else {
      const t = progressRef.current
      const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
      camera.position.lerpVectors(startPosRef.current, endPosRef.current, ease)
      controlsRef.current.target.lerpVectors(startLookRef.current, endLookRef.current, ease)
    }
    controlsRef.current.update()
  })

  const handleStart = useCallback(() => {
    const store = useUniverseStore.getState()
    if (store.viewMode === 'focused' && store.selectedBody) {
      store.setViewMode('free')
      store.setSelectedBody(null)
    }
  }, [])

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.08}
      minDistance={4}
      maxDistance={500}
      maxPolarAngle={Math.PI * 0.85}
      target={[0, 0, 0]}
      onStart={handleStart}
    />
  )
}
