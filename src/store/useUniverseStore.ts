import { create } from 'zustand';
import type { CelestialBody } from '@/types/celestial';

interface UniverseState {
  selectedBody: CelestialBody | null;
  cameraTarget: [number, number, number] | null;
  cameraLookAt: [number, number, number];
  isPlaying: boolean;
  speedMultiplier: number;
  viewMode: 'free' | 'focused';
  planetWorldPositions: Record<string, [number, number, number]>;
  // Orbit toggle
  showOrbits: boolean;
  hoveredBodyId: string | null;
  // Time simulation
  simulatedTimestamp: number; // ms since epoch for simulated time
  epochTimestamp: number;     // ms since epoch — simulation start time

  setSelectedBody: (body: CelestialBody | null) => void;
  setCameraTarget: (target: [number, number, number], lookAt: [number, number, number]) => void;
  clearCameraTarget: () => void;
  setIsPlaying: (playing: boolean) => void;
  setSpeedMultiplier: (speed: number) => void;
  setViewMode: (mode: 'free' | 'focused') => void;
  setPlanetPosition: (id: string, pos: [number, number, number]) => void;
  setShowOrbits: (show: boolean) => void;
  setHoveredBodyId: (id: string | null) => void;
  jumpToTimestamp: (ts: number) => void;
  jumpToToday: () => void;
}

// 2026-06-10 00:00 UTC as epoch start
const EPOCH_TS = new Date('2026-06-10T00:00:00Z').getTime();

export const useUniverseStore = create<UniverseState>((set) => ({
  selectedBody: null,
  cameraTarget: null,
  cameraLookAt: [0, 0, 0],
  isPlaying: true,
  speedMultiplier: 1,
  viewMode: 'free',
  planetWorldPositions: {},
  showOrbits: true,
  hoveredBodyId: null,
  simulatedTimestamp: EPOCH_TS,
  epochTimestamp: EPOCH_TS,

  setSelectedBody: (body) => set({ selectedBody: body }),

  setCameraTarget: (target, lookAt) =>
    set({ cameraTarget: target, cameraLookAt: lookAt }),

  clearCameraTarget: () => set({ cameraTarget: null }),

  setIsPlaying: (playing) => set({ isPlaying: playing }),

  setSpeedMultiplier: (speed) => set({ speedMultiplier: speed }),

  setViewMode: (mode) => set({ viewMode: mode }),

  setPlanetPosition: (id, pos) =>
    set((state) => ({
      planetWorldPositions: { ...state.planetWorldPositions, [id]: pos },
    })),

  setShowOrbits: (show) => set({ showOrbits: show }),

  setHoveredBodyId: (id) => set({ hoveredBodyId: id }),

  jumpToTimestamp: (ts) => set({ simulatedTimestamp: ts }),

  jumpToToday: () => set({ simulatedTimestamp: Date.now() }),
}));
