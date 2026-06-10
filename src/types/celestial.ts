export type CelestialType = 'star' | 'planet' | 'dwarf-planet' | 'moon';

export interface CelestialBody {
  id: string;
  name: string;
  nameEn: string;
  type: CelestialType;
  radius: number;
  realRadiusKm: number;
  orbitRadius: number;
  orbitSpeed: number;
  rotationSpeed: number;
  color: string;
  stripeColors?: string[];
  axialTilt: number;
  description: string;
  funFacts: string[];
  hasRings?: boolean;
  ringColor?: string;
  ringInnerRadius?: number;
  ringOuterRadius?: number;
  atmosphereColor?: string;
  isGlowing?: boolean;
}

export interface CelestialData extends CelestialBody {
  distanceFromSunKm: string;
  orbitalPeriodDays: string;
  temperatureMin: number;
  temperatureMax: number;
  composition: string[];
  exploration: string[];
  diameter: string;
  moonCount: number;
}

export interface CameraTarget {
  position: [number, number, number];
  lookAt: [number, number, number];
}

export type ViewMode = 'free' | 'focused';
