import { useState } from 'react'
import { motion } from 'framer-motion'
import { CalendarSync, RotateCcw } from 'lucide-react'
import { useUniverseStore } from '@/store/useUniverseStore'

export default function DatePicker() {
  const { jumpToTimestamp, jumpToToday } = useUniverseStore()
  const [inputValue, setInputValue] = useState('')
  const [showInput, setShowInput] = useState(false)

  const handleJump = () => {
    const date = new Date(inputValue)
    if (!isNaN(date.getTime())) {
      jumpToTimestamp(date.getTime())
    }
    setShowInput(false)
    setInputValue('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleJump()
    if (e.key === 'Escape') setShowInput(false)
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      {/* Date jump input */}
      {showInput ? (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 160, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          style={{ display: 'flex', gap: 4, overflow: 'hidden' }}
        >
          <input
            type="date"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            style={{
              width: 130,
              padding: '4px 8px',
              borderRadius: 8,
              border: '1px solid var(--border)',
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              fontSize: 11,
              fontFamily: 'inherit',
              outline: 'none',
            }}
          />
          <button
            onClick={handleJump}
            style={{
              padding: '4px 8px',
              borderRadius: 8,
              border: '1px solid var(--accent)',
              background: 'var(--accent-dim)',
              color: 'var(--accent)',
              fontSize: 11,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            跳转
          </button>
        </motion.div>
      ) : (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowInput(true)}
          className="glass-btn"
          title="日期跳转"
        >
          <CalendarSync size={13} />
        </motion.button>
      )}

      {/* Today button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={jumpToToday}
        className="glass-btn"
        title="回到今天"
      >
        <RotateCcw size={13} />
        今天
      </motion.button>
    </div>
  )
}
