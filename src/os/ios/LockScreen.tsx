import { motion } from 'framer-motion'
import { StatusBar } from './StatusBar'
import { profile } from '../../data/resume'

export function LockScreen({ onUnlock }: { onUnlock: () => void }) {
  const now = new Date()
  const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: false })
  const date = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  return (
    <motion.div
      className="absolute inset-0 z-50 flex touch-none flex-col text-white"
      style={{
        background: 'radial-gradient(120% 90% at 30% 0%, #ff7eb3 0%, #7868e6 45%, #1b2a6b 100%)',
      }}
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={{ top: 0.8, bottom: 0 }}
      dragSnapToOrigin
      onDragEnd={(_, info) => {
        // Unlock on a meaningful upward swipe or a quick flick.
        if (info.offset.y < -70 || info.velocity.y < -350) onUnlock()
      }}
      exit={{ y: '-100%', opacity: 0.6 }}
      transition={{ type: 'spring', stiffness: 260, damping: 30 }}
    >
      <StatusBar dark />

      <div className="pointer-events-none mt-10 text-center">
        <p className="text-[17px] font-medium opacity-90">{date}</p>
        <p className="text-[84px] font-bold leading-none tracking-tight tabular-nums">{time}</p>
      </div>

      <div className="pointer-events-none mt-auto px-6 pb-3 text-center">
        <p className="text-[15px] font-semibold">{profile.name}</p>
        <p className="text-[13px] opacity-80">{profile.title}</p>
      </div>

      {/* Tap anywhere here OR swipe up to unlock */}
      <button onClick={onUnlock} className="flex flex-col items-center px-6 pb-8 pt-4">
        <motion.span
          className="text-2xl leading-none"
          animate={{ y: [0, -8, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          ⌃
        </motion.span>
        <span className="mt-1 text-[14px] font-medium opacity-90">Swipe up or tap to open</span>
        <span className="mt-5 h-1.5 w-32 rounded-full bg-white/70" />
      </button>
    </motion.div>
  )
}
