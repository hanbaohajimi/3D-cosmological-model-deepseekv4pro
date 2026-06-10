import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Asteroid belt: Mars orbit=24, Jupiter orbit=55
// Real belt extends ~2.1-3.3 AU — in our scale that's roughly 30-48
const KIRKWOOD_GAPS = [
  { center: 33.0, width: 1.5 },
  { center: 37.0, width: 1.2 },
  { center: 41.0, width: 1.0 },
  { center: 45.0, width: 1.5 },
]

function beltDensity(radius: number): number {
  const INNER = 30, OUTER = 48
  if (radius < INNER || radius > OUTER) return 0
  let d = 1.0
  if (radius < INNER + 1.0) d *= (radius - INNER) / 1.0
  if (radius > OUTER - 1.0) d *= (OUTER - radius) / 1.0
  for (const gap of KIRKWOOD_GAPS) {
    const dist = Math.abs(radius - gap.center)
    const hw = gap.width / 2
    if (dist < hw) d *= 0.05 + 0.95 * (dist / hw)
  }
  return Math.max(0, d)
}

function asteroidColor(): THREE.Color {
  const r = Math.random()
  // Brighter than real life for visibility — still conveys composition variety
  if (r < 0.65) {
    // C-type carbonaceous — dark warm gray
    return new THREE.Color(0.28 + Math.random() * 0.12, 0.25 + Math.random() * 0.10, 0.20 + Math.random() * 0.08)
  }
  if (r < 0.90) {
    // S-type silicaceous — lighter gray-brown
    return new THREE.Color(0.50 + Math.random() * 0.18, 0.44 + Math.random() * 0.15, 0.38 + Math.random() * 0.12)
  }
  // M-type metallic — brighter
  return new THREE.Color(0.62 + Math.random() * 0.18, 0.55 + Math.random() * 0.16, 0.48 + Math.random() * 0.14)
}

export default function AsteroidBelt() {
  const pointsRef = useRef<THREE.Points>(null!)
  const count = 10000

  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const INNER = 30, OUTER = 48, Y_SPREAD = 0.6

    let accepted = 0
    const maxAttempts = count * 4
    let attempts = 0

    while (accepted < count && attempts < maxAttempts) {
      attempts++
      const radius = INNER + Math.random() * (OUTER - INNER)
      if (Math.random() > beltDensity(radius)) continue

      const angle = Math.random() * Math.PI * 2
      const y = ((Math.random() + Math.random() + Math.random()) / 3 - 0.5) * Y_SPREAD * 2

      positions[accepted * 3] = Math.cos(angle) * radius
      positions[accepted * 3 + 1] = y
      positions[accepted * 3 + 2] = Math.sin(angle) * radius

      const c = asteroidColor()
      colors[accepted * 3] = c.r
      colors[accepted * 3 + 1] = c.g
      colors[accepted * 3 + 2] = c.b

      // Power-law: many small, few large. Range ~0.08 to ~3.0
      const u = Math.random()
      sizes[accepted] = 0.1 + 3.0 * Math.pow(u, 3.0)
      accepted++
    }

    // Fill remaining with nearby duplicates
    while (accepted < count) {
      const s = Math.floor(Math.random() * accepted)
      positions[accepted * 3] = positions[s * 3] + (Math.random() - 0.5) * 0.5
      positions[accepted * 3 + 1] = positions[s * 3 + 1] + (Math.random() - 0.5) * 0.1
      positions[accepted * 3 + 2] = positions[s * 3 + 2] + (Math.random() - 0.5) * 0.5
      colors[accepted * 3] = colors[s * 3]
      colors[accepted * 3 + 1] = colors[s * 3 + 1]
      colors[accepted * 3 + 2] = colors[s * 3 + 2]
      sizes[accepted] = sizes[s] * 0.6
      accepted++
    }

    return { positions, colors, sizes }
  }, [])

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (800.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
          vColor = color;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          float dist = length(gl_PointCoord - 0.5) * 2.0;
          float alpha = 1.0 - smoothstep(0.0, 1.0, dist);
          alpha = pow(alpha, 1.2);
          if (alpha < 0.01) discard;
          gl_FragColor = vec4(vColor, alpha * 0.9);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
    })
  }, [])

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.00012
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <primitive object={material} attach="material" />
    </points>
  )
}
