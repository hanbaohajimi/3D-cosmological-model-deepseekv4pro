import { useMemo, useRef } from 'react'
import * as THREE from 'three'

export default function Nebula() {
  const pointsRef = useRef<THREE.Points>(null!)
  const count = 1500

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    // Create several nebula clusters
    const clusters = [
      { center: [120, 15, -70], radius: 50, count: 500, hue: 0.6, sat: 0.5 },
      { center: [-100, -20, 60], radius: 45, count: 400, hue: 0.7, sat: 0.4 },
      { center: [30, 35, 120], radius: 55, count: 600, hue: 0.55, sat: 0.45 },
    ]

    let idx = 0
    for (const cluster of clusters) {
      for (let i = 0; i < cluster.count && idx < count; i++) {
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)
        const r = cluster.radius * Math.pow(Math.random(), 1.5)

        positions[idx * 3] = cluster.center[0] + Math.sin(phi) * Math.cos(theta) * r
        positions[idx * 3 + 1] = cluster.center[1] + Math.sin(phi) * Math.sin(theta) * r * 0.5
        positions[idx * 3 + 2] = cluster.center[2] + Math.cos(phi) * r

        const color = new THREE.Color()
        color.setHSL(
          cluster.hue + (Math.random() - 0.5) * 0.15,
          cluster.sat,
          0.15 + Math.random() * 0.35
        )
        colors[idx * 3] = color.r
        colors[idx * 3 + 1] = color.g
        colors[idx * 3 + 2] = color.b

        idx++
      }
    }

    return { positions, colors }
  }, [])

  const spriteTexture = useMemo(() => {
    const size = 128
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')!
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    gradient.addColorStop(0, 'rgba(255,255,255,0.6)')
    gradient.addColorStop(0.1, 'rgba(200,180,255,0.4)')
    gradient.addColorStop(0.3, 'rgba(100,80,200,0.15)')
    gradient.addColorStop(0.6, 'rgba(50,40,100,0.03)')
    gradient.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, size, size)
    return new THREE.CanvasTexture(canvas)
  }, [])

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
        size={10.0}
        vertexColors
        transparent
        opacity={0.6}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  )
}
