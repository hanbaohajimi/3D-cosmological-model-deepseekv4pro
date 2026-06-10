import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useDeviceDetect } from '@/hooks/useDeviceDetect'

export default function Starfield() {
  const { isMobile } = useDeviceDetect()
  const count = isMobile ? 5000 : 15000
  const pointsRef = useRef<THREE.Points>(null!)

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const radius = 350

    for (let i = 0; i < count; i++) {
      // Uniform distribution on a large sphere
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = radius * (0.5 + Math.random() * 0.5)

      positions[i * 3] = Math.sin(phi) * Math.cos(theta) * r
      positions[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * r
      positions[i * 3 + 2] = Math.cos(phi) * r

      // Star color based on temperature
      const temp = Math.random()
      if (temp < 0.08) {
        // Blue-white stars (hottest)
        colors[i * 3] = 0.7
        colors[i * 3 + 1] = 0.8
        colors[i * 3 + 2] = 1.0
      } else if (temp < 0.25) {
        // White stars
        const b = 0.7 + Math.random() * 0.3
        colors[i * 3] = b
        colors[i * 3 + 1] = b
        colors[i * 3 + 2] = b
      } else if (temp < 0.65) {
        // Yellow stars (like our Sun)
        colors[i * 3] = 1.0
        colors[i * 3 + 1] = 0.75 + Math.random() * 0.25
        colors[i * 3 + 2] = 0.4 + Math.random() * 0.3
      } else {
        // Orange/red stars (coolest)
        colors[i * 3] = 0.8 + Math.random() * 0.2
        colors[i * 3 + 1] = 0.4 + Math.random() * 0.3
        colors[i * 3 + 2] = 0.2 + Math.random() * 0.2
      }
    }
    return { positions, colors }
  }, [count])

  // Generate a glow sprite texture
  const spriteTexture = useMemo(() => {
    const size = 64
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')!
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    gradient.addColorStop(0, 'rgba(255,255,255,1)')
    gradient.addColorStop(0.05, 'rgba(255,255,255,0.95)')
    gradient.addColorStop(0.15, 'rgba(255,255,240,0.7)')
    gradient.addColorStop(0.4, 'rgba(200,220,255,0.2)')
    gradient.addColorStop(0.7, 'rgba(100,120,200,0.03)')
    gradient.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, size, size)
    return new THREE.CanvasTexture(canvas)
  }, [])

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.00002
      pointsRef.current.rotation.x += 0.00001
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        map={spriteTexture}
        size={3.5}
        vertexColors
        transparent
        opacity={0.95}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  )
}
