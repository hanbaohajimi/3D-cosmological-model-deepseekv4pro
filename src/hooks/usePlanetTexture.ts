import { useMemo } from 'react';
import * as THREE from 'three';

const SIZE = 512;

function createMercuryTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext('2d')!;

  // Base gray
  ctx.fillStyle = '#a8a8a8';
  ctx.fillRect(0, 0, SIZE, SIZE);

  // Surface noise
  for (let i = 0; i < 6000; i++) {
    const x = Math.random() * SIZE;
    const y = Math.random() * SIZE;
    const r = Math.random() * 4 + 0.5;
    const shade = 120 + Math.random() * 100;
    ctx.fillStyle = `rgba(${shade},${shade},${shade},${Math.random() * 0.3})`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Craters
  for (let i = 0; i < 200; i++) {
    const x = Math.random() * SIZE;
    const y = Math.random() * SIZE;
    const r = Math.random() * 16 + 3;
    ctx.strokeStyle = `rgba(0,0,0,${Math.random() * 0.4 + 0.2})`;
    ctx.lineWidth = Math.random() * 2 + 1;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = `rgba(50,50,50,${Math.random() * 0.15})`;
    ctx.fill();
  }

  return tex(canvas);
}

function createVenusTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext('2d')!;

  // Base yellow-cream
  const bg = ctx.createLinearGradient(0, 0, 0, SIZE);
  bg.addColorStop(0, '#e8d5a0');
  bg.addColorStop(0.3, '#f0dfb0');
  bg.addColorStop(0.5, '#e5c890');
  bg.addColorStop(0.7, '#edd8a8');
  bg.addColorStop(1, '#dcc890');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, SIZE, SIZE);

  // Cloud swirl patterns
  for (let i = 0; i < 40; i++) {
    const y = (i / 40) * SIZE;
    ctx.strokeStyle = `rgba(255,240,210,${Math.random() * 0.25 + 0.05})`;
    ctx.lineWidth = 4 + Math.random() * 8;
    ctx.beginPath();
    ctx.moveTo(0, y);
    for (let x = 0; x < SIZE; x += 20) {
      ctx.lineTo(x, y + Math.sin(x * 0.02 + i * 2) * 15 + Math.cos(x * 0.015 + i) * 10);
    }
    ctx.stroke();
  }

  // Yellowish haze
  ctx.fillStyle = 'rgba(240,210,150,0.15)';
  ctx.fillRect(0, 0, SIZE, SIZE);

  return tex(canvas);
}

function createEarthTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext('2d')!;

  // Ocean base
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, SIZE);
  oceanGrad.addColorStop(0, '#2255aa');
  oceanGrad.addColorStop(0.2, '#3366cc');
  oceanGrad.addColorStop(0.5, '#4477cc');
  oceanGrad.addColorStop(0.8, '#3366cc');
  oceanGrad.addColorStop(1, '#2255aa');
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, SIZE, SIZE);

  // Continents (simplified land masses)
  ctx.fillStyle = '#3a8c3a';
  // North America-ish
  ctx.beginPath(); ctx.ellipse(SIZE * 0.2, SIZE * 0.25, 80, 100, 0.2, 0, Math.PI * 2); ctx.fill();
  // South America-ish
  ctx.beginPath(); ctx.ellipse(SIZE * 0.22, SIZE * 0.65, 35, 70, 0.1, 0, Math.PI * 2); ctx.fill();
  // Europe-ish
  ctx.beginPath(); ctx.ellipse(SIZE * 0.48, SIZE * 0.22, 55, 35, 0, 0, Math.PI * 2); ctx.fill();
  // Africa-ish
  ctx.beginPath(); ctx.ellipse(SIZE * 0.5, SIZE * 0.52, 45, 85, 0, 0, Math.PI * 2); ctx.fill();
  // Asia-ish
  ctx.beginPath(); ctx.ellipse(SIZE * 0.7, SIZE * 0.3, 90, 60, -0.1, 0, Math.PI * 2); ctx.fill();
  // Australia-ish
  ctx.beginPath(); ctx.ellipse(SIZE * 0.78, SIZE * 0.7, 25, 20, 0, 0, Math.PI * 2); ctx.fill();

  // Add brown/tan variation to land
  ctx.fillStyle = 'rgba(180,140,60,0.3)';
  for (let i = 0; i < 400; i++) {
    const x = Math.random() * SIZE;
    const y = Math.random() * SIZE;
    ctx.beginPath();
    ctx.arc(x, y, Math.random() * 10 + 2, 0, Math.PI * 2);
    ctx.fill();
  }

  // White cloud wisps
  for (let i = 0; i < 30; i++) {
    const y = Math.random() * SIZE;
    ctx.strokeStyle = `rgba(255,255,255,${Math.random() * 0.3 + 0.1})`;
    ctx.lineWidth = 3 + Math.random() * 6;
    ctx.beginPath();
    ctx.moveTo(0, y);
    for (let x = 0; x < SIZE; x += 10) {
      ctx.lineTo(x, y + Math.sin(x * 0.03 + i * 5) * 8);
    }
    ctx.stroke();
  }

  // Ice caps
  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  ctx.fillRect(0, 0, SIZE, 25);
  ctx.fillRect(0, SIZE - 25, SIZE, 25);

  return tex(canvas);
}

function createMarsTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext('2d')!;

  // Base rusty red
  const bg = ctx.createLinearGradient(0, 0, 0, SIZE);
  bg.addColorStop(0, '#d44a1a');
  bg.addColorStop(0.3, '#cc4420');
  bg.addColorStop(0.5, '#c04018');
  bg.addColorStop(0.7, '#d05020');
  bg.addColorStop(1, '#c84418');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, SIZE, SIZE);

  // Dark volcanic regions
  for (let i = 0; i < 20; i++) {
    const x = Math.random() * SIZE;
    const y = Math.random() * SIZE;
    const r = 20 + Math.random() * 60;
    const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
    grad.addColorStop(0, 'rgba(80,20,0,0.4)');
    grad.addColorStop(0.5, 'rgba(100,30,0,0.2)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  }

  // Surface texture
  for (let i = 0; i < 3000; i++) {
    const x = Math.random() * SIZE;
    const y = Math.random() * SIZE;
    const r = Math.random() * 3 + 0.5;
    const shade = Math.random() > 0.5 ? '255,200,180' : '100,30,10';
    ctx.fillStyle = `rgba(${shade},${Math.random() * 0.15})`;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  }

  // Polar ice caps
  ctx.fillStyle = 'rgba(255,240,230,0.6)';
  ctx.fillRect(0, 0, SIZE, 18);
  ctx.fillStyle = 'rgba(255,240,230,0.5)';
  ctx.fillRect(0, SIZE - 18, SIZE, 18);

  return tex(canvas);
}

function createJupiterTexture(stripeColors: string[]): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext('2d')!;

  const colors = stripeColors || ['#d4c5a9', '#c4b69c', '#b8a080', '#d4c5a9', '#a08060', '#c4b69c', '#d4c5a9'];

  // Bold horizontal bands
  const bandCount = 14;
  for (let i = 0; i < bandCount; i++) {
    const yStart = (i / bandCount) * SIZE;
    const yEnd = ((i + 1) / bandCount) * SIZE;
    const ci = i % colors.length;
    const baseColor = colors[ci];

    for (let y = yStart; y < yEnd; y++) {
      const turbulence = Math.sin(y * 0.15 + i * 2.3) * 0.2 + Math.cos(y * 0.08) * 0.15;
      const r = Math.min(255, Math.max(0, parseInt(baseColor.slice(1, 3), 16) + turbulence * 40));
      const g = Math.min(255, Math.max(0, parseInt(baseColor.slice(3, 5), 16) + turbulence * 30));
      const b = Math.min(255, Math.max(0, parseInt(baseColor.slice(5, 7), 16) + turbulence * 20));
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.fillRect(0, y, SIZE, 2);
    }
  }

  // Great Red Spot
  const spotCx = SIZE * 0.45;
  const spotCy = SIZE * 0.38;
  const spotGrad = ctx.createRadialGradient(spotCx, spotCy, 0, spotCx, spotCy, 50);
  spotGrad.addColorStop(0, 'rgba(210,90,40,0.85)');
  spotGrad.addColorStop(0.3, 'rgba(200,80,35,0.7)');
  spotGrad.addColorStop(0.6, 'rgba(180,70,40,0.4)');
  spotGrad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = spotGrad;
  ctx.beginPath();
  ctx.ellipse(spotCx, spotCy, 45, 22, 0.05, 0, Math.PI * 2);
  ctx.fill();

  // Smaller storms
  for (let i = 0; i < 8; i++) {
    const sx = Math.random() * SIZE * 0.8 + SIZE * 0.1;
    const sy = Math.random() * SIZE * 0.7 + SIZE * 0.15;
    const sr = 4 + Math.random() * 12;
    const sGrad = ctx.createRadialGradient(sx, sy, 0, sx, sy, sr);
    const hue = Math.random() > 0.5 ? 'rgba(220,180,120' : 'rgba(200,160,100';
    sGrad.addColorStop(0, `${hue},0.5)`);
    sGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = sGrad;
    ctx.beginPath(); ctx.arc(sx, sy, sr, 0, Math.PI * 2); ctx.fill();
  }

  return tex(canvas);
}

function createSaturnTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext('2d')!;

  const bg = ctx.createLinearGradient(0, 0, 0, SIZE);
  bg.addColorStop(0, '#f0e0b8');
  bg.addColorStop(0.25, '#e8d5a0');
  bg.addColorStop(0.5, '#f5e8c8');
  bg.addColorStop(0.75, '#e0cc90');
  bg.addColorStop(1, '#edd8a8');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, SIZE, SIZE);

  // Subtle bands
  for (let i = 0; i < 20; i++) {
    const y = (i / 20) * SIZE;
    const alpha = 0.03 + Math.abs(Math.sin(i * 0.7)) * 0.08;
    ctx.fillStyle = `rgba(180,150,100,${alpha})`;
    ctx.fillRect(0, y, SIZE, SIZE / 20);
  }

  // Cloud wisps
  for (let i = 0; i < 15; i++) {
    const y = Math.random() * SIZE;
    ctx.fillStyle = `rgba(255,245,220,${Math.random() * 0.15})`;
    ctx.fillRect(0, y, SIZE, 1 + Math.random() * 3);
  }

  return tex(canvas);
}

function createUranusTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext('2d')!;

  const bg = ctx.createLinearGradient(0, 0, 0, SIZE);
  bg.addColorStop(0, '#b8e8f0');
  bg.addColorStop(0.3, '#7ec8e3');
  bg.addColorStop(0.5, '#90d8ec');
  bg.addColorStop(0.7, '#6ab8d8');
  bg.addColorStop(1, '#a0d8e8');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, SIZE, SIZE);

  // Very faint bands
  for (let i = 0; i < 8; i++) {
    const y = (i / 8) * SIZE;
    ctx.fillStyle = 'rgba(255,255,255,0.04)';
    ctx.fillRect(0, y, SIZE, 4);
  }

  return tex(canvas);
}

function createNeptuneTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext('2d')!;

  const bg = ctx.createLinearGradient(0, 0, 0, SIZE);
  bg.addColorStop(0, '#3355cc');
  bg.addColorStop(0.3, '#2244bb');
  bg.addColorStop(0.5, '#4466dd');
  bg.addColorStop(0.7, '#2244aa');
  bg.addColorStop(1, '#3355cc');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, SIZE, SIZE);

  // Bright blue storm spots
  for (let i = 0; i < 12; i++) {
    const sx = Math.random() * SIZE;
    const sy = Math.random() * SIZE;
    const sr = 5 + Math.random() * 18;
    const sGrad = ctx.createRadialGradient(sx, sy, 0, sx, sy, sr);
    sGrad.addColorStop(0, 'rgba(150,200,255,0.5)');
    sGrad.addColorStop(0.5, 'rgba(100,160,240,0.2)');
    sGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = sGrad;
    ctx.beginPath(); ctx.arc(sx, sy, sr, 0, Math.PI * 2); ctx.fill();
  }

  // Subtle banding
  for (let i = 0; i < 6; i++) {
    const y = (i / 6) * SIZE;
    ctx.fillStyle = 'rgba(100,150,255,0.06)';
    ctx.fillRect(0, y, SIZE, 6);
  }

  return tex(canvas);
}

function createSunTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext('2d')!;

  // Base gradient
  const bg = ctx.createRadialGradient(SIZE / 2, SIZE / 2, 0, SIZE / 2, SIZE / 2, SIZE / 2);
  bg.addColorStop(0, '#fffde0');
  bg.addColorStop(0.15, '#fff9c0');
  bg.addColorStop(0.35, '#ffe860');
  bg.addColorStop(0.6, '#ff9900');
  bg.addColorStop(0.85, '#e85500');
  bg.addColorStop(1, '#cc3300');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, SIZE, SIZE);

  // Granulation
  for (let i = 0; i < 5000; i++) {
    const x = Math.random() * SIZE;
    const y = Math.random() * SIZE;
    const r = Math.random() * 3 + 0.5;
    const alpha = Math.random() * 0.25;
    ctx.fillStyle = Math.random() > 0.5
      ? `rgba(255,255,220,${alpha})`
      : `rgba(200,120,20,${alpha})`;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  }

  // Sunspots
  for (let i = 0; i < 25; i++) {
    const x = Math.random() * SIZE;
    const y = Math.random() * SIZE * 0.5 + SIZE * 0.25;
    const r = Math.random() * 18 + 6;
    const spotGrad = ctx.createRadialGradient(x, y, r * 0.2, x, y, r);
    spotGrad.addColorStop(0, 'rgba(40,15,0,0.7)');
    spotGrad.addColorStop(0.6, 'rgba(80,30,0,0.4)');
    spotGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = spotGrad;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  }

  return tex(canvas);
}

function tex(canvas: HTMLCanvasElement): THREE.CanvasTexture {
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function usePlanetTexture(
  planetId: string,
  color: string,
  stripeColors?: string[],
): THREE.CanvasTexture {
  return useMemo(() => {
    switch (planetId) {
      case 'sun': return createSunTexture();
      case 'mercury': return createMercuryTexture();
      case 'venus': return createVenusTexture();
      case 'earth': return createEarthTexture();
      case 'mars': return createMarsTexture();
      case 'jupiter': return createJupiterTexture(stripeColors || []);
      case 'saturn': return createSaturnTexture();
      case 'uranus': return createUranusTexture();
      case 'neptune': return createNeptuneTexture();
      default: {
        // Generic rocky texture for any unknown body
        const canvas = document.createElement('canvas');
        canvas.width = SIZE;
        canvas.height = SIZE;
        const ctx = canvas.getContext('2d')!;
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, SIZE, SIZE);
        for (let i = 0; i < 1000; i++) {
          const x = Math.random() * SIZE; const y = Math.random() * SIZE;
          ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.1})`;
          ctx.beginPath(); ctx.arc(x, y, Math.random() * 3, 0, Math.PI * 2); ctx.fill();
        }
        return tex(canvas);
      }
    }
  }, [planetId, color, stripeColors?.join()]);
}

// Export planet-specific material properties
export const planetMaterials: Record<string, {
  roughness: number;
  metalness: number;
  emissiveIntensity: number;
}> = {
  sun: { roughness: 0, metalness: 0, emissiveIntensity: 1.5 },
  mercury: { roughness: 0.7, metalness: 0.1, emissiveIntensity: 0.65 },
  venus: { roughness: 0.45, metalness: 0.02, emissiveIntensity: 0.75 },
  earth: { roughness: 0.55, metalness: 0.05, emissiveIntensity: 0.7 },
  mars: { roughness: 0.65, metalness: 0.08, emissiveIntensity: 0.7 },
  jupiter: { roughness: 0.35, metalness: 0.02, emissiveIntensity: 0.75 },
  saturn: { roughness: 0.4, metalness: 0.02, emissiveIntensity: 0.7 },
  uranus: { roughness: 0.3, metalness: 0.02, emissiveIntensity: 0.8 },
  neptune: { roughness: 0.3, metalness: 0.02, emissiveIntensity: 0.85 },
};
