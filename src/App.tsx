import { useState, Suspense } from 'react'
import Scene from './components/Scene'
import UILayer from './components/ui/UILayer'
import LoadingScreen from './components/ui/LoadingScreen'

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden', background: '#000' }}>
      <Suspense fallback={null}>
        <Scene onLoaded={() => setIsLoaded(true)} />
      </Suspense>
      {!isLoaded && <LoadingScreen />}
      <UILayer visible={isLoaded} />
    </div>
  )
}
