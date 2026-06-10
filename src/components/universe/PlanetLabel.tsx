import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useUniverseStore } from '@/store/useUniverseStore'

function createLabelTexture(name: string, nameEn: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 128
  const ctx = canvas.getContext('2d')!

  // Background pill
  const bgWidth = 300
  const bgHeight = 90
  const bgX = (512 - bgWidth) / 2
  const bgY = (128 - bgHeight) / 2

  ctx.fillStyle = 'rgba(0, 0, 0, 0.6)'
  ctx.beginPath()
  ctx.roundRect(bgX, bgY, bgWidth, bgHeight, 20)
  ctx.fill()

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.roundRect(bgX, bgY, bgWidth, bgHeight, 20)
  ctx.stroke()

  // Chinese name
  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 36px "PingFang SC", "Microsoft YaHei", sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(name, 256, 48)

  // English name
  ctx.fillStyle = '#aaaacc'
  ctx.font = '18px "Inter", sans-serif'
  ctx.fillText(nameEn, 256, 82)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.minFilter = THREE.LinearFilter
  return texture
}

export default function PlanetLabel() {
  const groupRef = useRef<THREE.Group>(null!)
  const { selectedBody, planetWorldPositions } = useUniverseStore()

  const labelTexture = useMemo(() => {
    if (!selectedBody) return null
    return createLabelTexture(selectedBody.name, selectedBody.nameEn)
  }, [selectedBody?.id])

  useFrame(() => {
    if (!groupRef.current || !selectedBody) return
    const pos = planetWorldPositions[selectedBody.id]
    if (pos) {
      const yOffset = selectedBody.radius + 2.0
      groupRef.current.position.set(pos[0], pos[1] + yOffset, pos[2])
      groupRef.current.visible = true
    } else {
      groupRef.current.visible = false
    }
  })

  if (!selectedBody || !labelTexture) return null

  return (
    <group ref={groupRef}>
      <sprite scale={[5, 1.25, 1]}>
        <spriteMaterial
          map={labelTexture}
          transparent
          depthWrite={false}
          depthTest={false}
        />
      </sprite>
    </group>
  )
}
