import { motion } from 'framer-motion'
import { useState } from 'react'
import { StatusBar } from './StatusBar'
import { profile } from '../../data/resume'

export function LockScreen({ onUnlock }: { onUnlock: () => void }) {
  const [dragged, setDragged] = useState(0)
  const now = new Date()
  const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: false })
  const date = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  return (
    <motion.div
      className="absolute inset-0 z-50 flex flex-col text-white"
      style={{
        background:
          'radial-gradient(120% 90% at 30% 0%, #ff7eb3 0%, #7868e6 45%, #1b2a6b 100%)',
      }}
      exit={{ y: '-100%', opacity: 0.6 }}
      transition={{ type: 'spring', stiffness: 260, damping: 30 }}
    >
      <StatusBar dark />
      <div className="mt-10 text-center">
        <p className="text-[17px] font-medium opacity-90">{date}</p>
        <p className="text-[84px] font-bold leading-none tracking-tight tabular-nums">{time}</p>
      </div>

      <div className="mt-auto px-6 pb-3 text-center">
        <p className="text-[15px] font-semibold">{profile.name}</p>
        <p className="text-[13px] opacity-80">{profile.title}</p>
      </div>

      <div className="px-6 pb-8">
        <div className="relative mx-auto h-14 w-full max-w-xs overflow-hidden rounded-full bg-white/15 backdrop-blur">
          <motion.button
            drag="x"
            dragConstraints={{ left: 0, right: 220 }}
            dragElastic={0.05}
            onDrag={(_, info) => setDragged(info.point.x)}
            onDragEnd={(_, info) => {
              if (info.offset.x > 120) onUnlock()
            }}
            className="absolute left-1 top-1 grid h-12 w-12 cursor-grab place-items-center rounded-full bg-white text-xl text-neutral-700 shadow active:cursor-grabbing"
          >
            →
          </motion.button>
          <span
            className="flex h-full items-center justify-center text-[15px] font-medium transition-opacity"
            style={{ opacity: dragged > 80 ? 0 : 0.8 }}
          >
            slide to unlock
          </span>
        </div>
        <div className="mx-auto mt-5 h-1.5 w-32 rounded-full bg-white/60" />
      </div>
    </motion.div>
  )
}
