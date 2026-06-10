import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MousePointer2, ScrollText } from 'lucide-react'
import { useDeviceDetect } from '@/hooks/useDeviceDetect'

export default function ZoomHint() {
  const [visible, setVisible] = useState(true)
  const { isTouch } = useDeviceDetect()

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 8000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            position: 'absolute',
            bottom: 160,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            pointerEvents: 'none',
          }}
        >
          <HintItem
            icon={<MousePointer2 size={14} />}
            text={isTouch ? '拖动旋转' : '拖拽旋转'}
          />
          <HintItem
            icon={<ScrollText size={14} />}
            text={isTouch ? '双指缩放' : '滚轮缩放'}
          />
          <HintItem
            icon={
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  border: '1.5px solid #8888aa',
                  background: 'transparent',
                }}
              />
            }
            text="点击天体探索"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function HintItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        padding: '6px 12px',
        borderRadius: 10,
        background: 'rgba(5,5,25,0.4)',
        border: '1px solid rgba(255,255,255,0.05)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
    >
      <span style={{ color: '#8888aa', display: 'flex' }}>{icon}</span>
      <span style={{ fontSize: 11, color: '#7777aa', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>
        {text}
      </span>
    </div>
  )
}
