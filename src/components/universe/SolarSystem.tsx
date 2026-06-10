import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { planets } from '@/data/planets'
import Sun from './Sun'
import Planet from './Planet'
import AsteroidBelt from './AsteroidBelt'
import Nebula from './Nebula'
import PlanetLabel from './PlanetLabel'

// Dust particles near the sun
function SunDust() {
  const meshRef = useRef<THREE.InstancedMesh>(null!)
  const count = 500

  useEffect(() => {
    if (!meshRef.current) return
    const dummy = new THREE.Object3D()
    const radius = 3.5
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = radius * (1 + Math.random() * 1.5)
      dummy.position.set(
        Math.sin(phi) * Math.cos(theta) * r,
        Math.sin(phi) * Math.sin(theta) * r * 0.3,
        Math.cos(phi) * r
      )
      const s = 0.02 + Math.random() * 0.06
      dummy.scale.setScalar(s)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
      meshRef.current.setColorAt(i, new THREE.Color(1, 0.8, 0.3))
    }
    meshRef.current.instanceMatrix.needsUpdate = true
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true
  }, [count])

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0005
    }
  })

  return (
    <instancedMesh
      ref={meshRef}
      args={[new THREE.SphereGeometry(0.03, 3, 3), undefined, count]}
      matrixAutoUpdate={false}
    >
      <meshBasicMaterial transparent opacity={0.6} depthWrite={false} />
    </instancedMesh>
  )
}

export default function SolarSystem() {
  return (
    <group>
      <Nebula />
      <Sun />
      <SunDust />
      {planets.map((planet) => (
        <Planet key={planet.id} data={planet} />
      ))}
      <AsteroidBelt />
      <PlanetLabel />
    </group>
  )
}
