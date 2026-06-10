import { useRef, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { CelestialBody } from '@/types/celestial'
import { usePlanetTexture, planetMaterials } from '@/hooks/usePlanetTexture'
import { useUniverseStore } from '@/store/useUniverseStore'
import SaturnRings from './SaturnRings'
import OrbitLine from './OrbitLine'
import { calcCameraTarget } from '@/utils/camera'

// Real mean longitudes at 2026-06-10 (J2000.0 + 9657 days), in radians
// Source: JPL approximate mean orbital elements
const ORBIT_DATA: Record<string, { period: number; phase: number }> = {
  mercury: { period: 88,    phase: 3.02 },
  venus:   { period: 225,   phase: 3.05 },
  earth:   { period: 365,   phase: 4.52 },
  mars:    { period: 687,   phase: 0.27 },
  jupiter: { period: 4333,  phase: 2.04 },
  saturn:  { period: 10759, phase: 0.24 },
  uranus:  { period: 30687, phase: 1.17 },
  neptune: { period: 60190, phase: 0.04 },
}

const MS_PER_DAY = 1000 * 60 * 60 * 24

interface PlanetProps {
  data: CelestialBody
}

export default function Planet({ data }: PlanetProps) {
  const planetRef = useRef<THREE.Mesh>(null!)
  const orbitRef = useRef<THREE.Group>(null!)
  const planetGroupRef = useRef<THREE.Group>(null!)
  const worldPosRef = useRef(new THREE.Vector3())
  const [localHovered, setLocalHovered] = useState(false)
  const {
    setSelectedBody, setCameraTarget, setIsPlaying,
    speedMultiplier, setPlanetPosition,
    simulatedTimestamp, epochTimestamp,
    showOrbits, hoveredBodyId, setHoveredBodyId,
  } = useUniverseStore()

  const texture = usePlanetTexture(data.id, data.color, data.stripeColors)
  const mat = planetMaterials[data.id] || { roughness: 0.8, metalness: 0.05, emissiveIntensity: 0.2 }
  const hasAtmosphere = data.id === 'earth'
  const orbitCfg = ORBIT_DATA[data.id] || { period: 365, phase: 0 }

  const atmosphereMaterial = useMemo(() => {
    if (!hasAtmosphere) return null
    return new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vWorldPos;
        void main() {
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          vWorldPos = worldPos.xyz;
          vNormal = normalize(mat3(modelMatrix) * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vWorldPos;
        uniform vec3 uViewPos;
        void main() {
          vec3 viewDir = normalize(uViewPos - vWorldPos);
          float fresnel = 1.0 - abs(dot(viewDir, vNormal));
          fresnel = pow(fresnel, 3.5);
          vec3 atmosphereColor = mix(
            vec3(0.15, 0.35, 0.8),
            vec3(0.4, 0.7, 1.0),
            fresnel
          );
          float alpha = fresnel * 0.45;
          gl_FragColor = vec4(atmosphereColor, alpha);
        }
      `,
      uniforms: { uViewPos: { value: new THREE.Vector3(0, 0, 0) } },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
  }, [hasAtmosphere])

  useFrame((state) => {
    // Time-driven orbit angle (absolute, not incremental)
    if (orbitRef.current) {
      const elapsedMs = (simulatedTimestamp - epochTimestamp) * speedMultiplier
      const elapsedDays = elapsedMs / MS_PER_DAY
      const angle = orbitCfg.phase + ((elapsedDays % orbitCfg.period) / orbitCfg.period) * Math.PI * 2
      orbitRef.current.rotation.y = angle
    }

    // Self rotation (incremental — planet spins continuously regardless of orbit position)
    if (planetRef.current) {
      planetRef.current.rotation.y += data.rotationSpeed * 0.01
    }

    // Atmosphere uniform
    if (atmosphereMaterial) {
      atmosphereMaterial.uniforms.uViewPos.value = state.camera.position
    }

    // Track world position (reuse pre-allocated Vector3)
    if (planetGroupRef.current) {
      planetGroupRef.current.getWorldPosition(worldPosRef.current)
      setPlanetPosition(data.id, [worldPosRef.current.x, worldPosRef.current.y, worldPosRef.current.z])
    }
  })

  const handleClick = (e: { stopPropagation: () => void; object: THREE.Object3D }) => {
    e.stopPropagation()
    setSelectedBody(data)
    setIsPlaying(false)
    planetGroupRef.current!.getWorldPosition(worldPosRef.current)
    const { target, lookAt } = calcCameraTarget(
      [worldPosRef.current.x, worldPosRef.current.y, worldPosRef.current.z],
      data.radius
    )
    setCameraTarget(target, lookAt)
  }

  const handlePointerOver = () => {
    setLocalHovered(true)
    setHoveredBodyId(data.id)
  }

  const handlePointerOut = () => {
    setLocalHovered(false)
    setHoveredBodyId(null)
  }

  // Orbit visibility logic
  const isOrbitHighlighted = hoveredBodyId === data.id
  const isOrbitDimmed = hoveredBodyId !== null && hoveredBodyId !== data.id

  return (
    <group ref={orbitRef}>
      {showOrbits && (
        <OrbitLine
          radius={data.orbitRadius}
          color={data.color}
          highlighted={isOrbitHighlighted}
          dimmed={isOrbitDimmed}
        />
      )}

      <group
        ref={planetGroupRef}
        position={[data.orbitRadius, 0, 0]}
        rotation={[0, 0, data.axialTilt]}
      >
        <mesh
          ref={planetRef}
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          <sphereGeometry args={[data.radius, 48, 48]} />
          <meshStandardMaterial
            map={texture}
            roughness={mat.roughness}
            metalness={mat.metalness}
            emissive={data.color}
            emissiveIntensity={mat.emissiveIntensity}
          />
        </mesh>

        {hasAtmosphere && atmosphereMaterial && (
          <mesh>
            <sphereGeometry args={[data.radius * 1.1, 64, 64]} />
            <primitive object={atmosphereMaterial} attach="material" />
          </mesh>
        )}

        {data.hasRings && (
          <SaturnRings
            innerRadius={data.ringInnerRadius || data.radius * 1.4}
            outerRadius={data.ringOuterRadius || data.radius * 2.2}
            color={data.ringColor || '#d4c090'}
          />
        )}

        {localHovered && (
          <mesh>
            <sphereGeometry args={[data.radius * 1.15, 32, 32]} />
            <meshBasicMaterial color="#4fc3f7" transparent opacity={0.2} depthWrite={false} />
          </mesh>
        )}
      </group>
    </group>
  )
}
