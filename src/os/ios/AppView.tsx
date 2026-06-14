import { motion } from 'framer-motion'
import { StatusBar } from './StatusBar'
import type { AppDef } from '../../apps/registry'

export function AppView({ app, onClose }: { app: AppDef; onClose: () => void }) {
  const Body = app.Component
  const isTerminal = app.id === 'terminal'

  return (
    <motion.div
      className="absolute inset-0 z-30 flex flex-col bg-[#f2f2f7]"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 280, damping: 28 }}
    >
      <div className={isTerminal ? 'bg-[#1a1a1c]' : 'glass'}>
        <StatusBar dark={isTerminal} />
        <div className="relative flex h-12 items-center justify-center border-b border-black/5">
          <button
            onClick={onClose}
            className={`absolute left-4 flex items-center gap-0.5 text-[16px] font-medium ${
              isTerminal ? 'text-[#0a84ff]' : 'text-[#0a84ff]'
            }`}
          >
            ‹ Home
          </button>
          <span className={`text-[16px] font-semibold ${isTerminal ? 'text-white' : 'text-neutral-800'}`}>
            {app.title}
          </span>
        </div>
      </div>

      <div className="os-scroll flex-1 overflow-auto">
        <Body />
      </div>

      <div className="flex h-6 shrink-0 items-center justify-center">
        <button onClick={onClose} className="h-1.5 w-32 rounded-full bg-black/40" aria-label="Home" />
      </div>
    </motion.div>
  )
}
