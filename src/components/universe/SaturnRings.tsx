import { useMemo } from 'react'
import * as THREE from 'three'

interface SaturnRingsProps {
  innerRadius: number
  outerRadius: number
  color: string
}

export default function SaturnRings({ innerRadius, outerRadius, color: _color }: SaturnRingsProps) {
  const ringTexture = useMemo(() => {
    const size = 512
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = 64
    const ctx = canvas.getContext('2d')!

    // Create ring gradient
    const gradient = ctx.createLinearGradient(0, 0, size, 0)
    gradient.addColorStop(0, 'rgba(0,0,0,0)')
    gradient.addColorStop(0.05, 'rgba(180,160,120,0.1)')
    gradient.addColorStop(0.1, 'rgba(240,220,170,0.8)')
    gradient.addColorStop(0.2, 'rgba(255,240,190,0.95)')
    gradient.addColorStop(0.35, 'rgba(255,250,210,1.0)')
    gradient.addColorStop(0.45, 'rgba(220,200,150,0.85)')
    gradient.addColorStop(0.5, 'rgba(140,110,70,0.3)')
    gradient.addColorStop(0.55, 'rgba(220,200,150,0.85)')
    gradient.addColorStop(0.7, 'rgba(255,240,190,0.95)')
    gradient.addColorStop(0.85, 'rgba(220,190,150,0.6)')
    gradient.addColorStop(0.95, 'rgba(150,120,80,0.1)')
    gradient.addColorStop(1, 'rgba(0,0,0,0)')

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, size, 64)

    // Add fine ring details
    for (let x = 0; x < size; x++) {
      const alpha = Math.abs(Math.sin(x * 0.5) * 0.15) +
        Math.abs(Math.sin(x * 1.3 + 10) * 0.08) +
        Math.abs(Math.cos(x * 2.1 + 30) * 0.06)
      ctx.fillStyle = `rgba(255,240,200,${alpha})`
      ctx.fillRect(x, 0, 1, 64)
    }

    const texture = new THREE.CanvasTexture(canvas)
    texture.wrapS = THREE.RepeatWrapping
    return texture
  }, [])

  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[innerRadius, outerRadius, 128]} />
      <meshBasicMaterial
        map={ringTexture}
        side={THREE.DoubleSide}
        transparent
        opacity={0.95}
        depthWrite={false}
      />
    </mesh>
  )
}
