import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { usePlanetTexture } from '@/hooks/usePlanetTexture'
import { sunData } from '@/data/planets'

export default function Sun() {
  const sunRef = useRef<THREE.Mesh>(null!)
  const glowRef = useRef<THREE.Mesh>(null!)
  const coronaRef = useRef<THREE.Mesh>(null!)

  const texture = usePlanetTexture(sunData.id, sunData.color)

  const glowTexture = useMemo(() => {
    const size = 256
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')!
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    gradient.addColorStop(0, 'rgba(255,200,50,0.6)')
    gradient.addColorStop(0.2, 'rgba(255,150,0,0.4)')
    gradient.addColorStop(0.4, 'rgba(255,100,0,0.2)')
    gradient.addColorStop(0.7, 'rgba(255,50,0,0.05)')
    gradient.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, size, size)
    return new THREE.CanvasTexture(canvas)
  }, [])

  useFrame((state) => {
    sunRef.current.rotation.y += sunData.rotationSpeed * 0.3
    if (glowRef.current) {
      glowRef.current.rotation.z += 0.0005
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.02
      glowRef.current.scale.setScalar(scale)
    }
    if (coronaRef.current) {
      coronaRef.current.rotation.z -= 0.0003
    }
  })

  return (
    <group>
      {/* Sun body */}
      <mesh ref={sunRef}>
        <sphereGeometry args={[sunData.radius, 64, 64]} />
        <meshBasicMaterial map={texture} />
      </mesh>

      {/* Inner glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[sunData.radius * 1.3, 32, 32]} />
        <meshBasicMaterial
          map={glowTexture}
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Outer corona */}
      <mesh ref={coronaRef}>
        <sphereGeometry args={[sunData.radius * 1.8, 32, 32]} />
        <meshBasicMaterial
          map={glowTexture}
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Light source */}
      <pointLight intensity={12} color="#fff8e0" distance={500} decay={0.25} />
    </group>
  )
}
