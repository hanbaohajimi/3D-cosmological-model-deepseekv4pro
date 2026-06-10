import { EffectComposer, Bloom, Vignette, ToneMapping } from '@react-three/postprocessing'
import { useDeviceDetect } from '@/hooks/useDeviceDetect'

export default function PostProcessing() {
  const { isMobile } = useDeviceDetect()

  return (
    <EffectComposer multisampling={0}>
      <Bloom
        luminanceThreshold={0.8}
        luminanceSmoothing={0.9}
        intensity={0.6}
        radius={0.4}
        mipmapBlur
      />
      <ToneMapping
        mode={2}
        middleGrey={0.6}
        maxLuminance={16}
        averageLuminance={1}
        adaptationRate={0.1}
      />
      <Vignette
        offset={isMobile ? 0.3 : 0.15}
        darkness={isMobile ? 0.3 : 0.5}
        eskil={false}
      />
    </EffectComposer>
  )
}
