import { useMemo } from 'react'
import { Line } from '@react-three/drei'

interface OrbitLineProps {
  radius: number
  color: string
  highlighted: boolean
  dimmed: boolean
}

export default function OrbitLine({ radius, color, highlighted, dimmed }: OrbitLineProps) {
  const points = useMemo(() => {
    const pts: [number, number, number][] = []
    const segments = 256
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2
      pts.push([Math.cos(angle) * radius, 0, Math.sin(angle) * radius])
    }
    return pts
  }, [radius])

  const opacity = highlighted ? 0.8 : dimmed ? 0.08 : 0.3
  const lineColor = highlighted ? '#ffffff' : color

  return (
    <Line
      points={points}
      color={lineColor}
      transparent
      opacity={opacity}
      depthWrite={false}
      lineWidth={highlighted ? 1.2 : 0.5}
    />
  )
}
