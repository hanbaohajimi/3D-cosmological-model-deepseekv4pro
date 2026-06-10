export const DEFAULT_POSITION: [number, number, number] = [0, 80, 200]
export const DEFAULT_LOOKAT: [number, number, number] = [0, 0, 0]

/** Shared camera target calculation — used by Planet click and PlanetNav click */
export function calcCameraTarget(
  worldPos: [number, number, number],
  radius: number
): { target: [number, number, number]; lookAt: [number, number, number] } {
  const dist = radius * 5 + 5
  const [wx, wy, wz] = worldPos
  return {
    target: [wx + dist * 0.4, wy + dist * 0.35, wz + dist * 0.9],
    lookAt: [wx, wy, wz],
  }
}
