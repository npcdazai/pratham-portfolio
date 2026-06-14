import { motion } from 'framer-motion'
import { StatusBar } from './StatusBar'
import { apps, type AppDef } from '../../apps/registry'
import { profile } from '../../data/resume'

const dockIds = ['about', 'projects', 'contact', 'terminal']

function Icon({
  app,
  onOpen,
  big = false,
  highlight = false,
}: {
  app: AppDef
  onOpen: (a: AppDef) => void
  big?: boolean
  highlight?: boolean
}) {
  return (
    <button
      onClick={() => onOpen(app)}
      className={`relative flex flex-col items-center gap-1.5 ${highlight ? 'z-50' : ''}`}
    >
      {highlight && (
        <>
          <motion.span
            className="pointer-events-none absolute -top-12 z-10 text-3xl drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]"
            animate={{ y: [0, 9, 0] }}
            transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
          >
            👇
          </motion.span>
          <motion.span
            className="pointer-events-none absolute -inset-1 rounded-[18px] ring-2 ring-white"
            animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.08, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
        </>
      )}
      <motion.span
        whileTap={{ scale: 0.88 }}
        className="grid h-[60px] w-[60px] place-items-center rounded-[15px] text-[28px] text-white shadow-lg"
        style={{ background: app.gradient }}
      >
        <span className={app.glyph === 'in' ? 'text-xl font-bold lowercase' : ''}>{app.glyph}</span>
      </motion.span>
      {!big && <span className="text-[11px] font-medium text-white drop-shadow">{app.title}</span>}
    </button>
  )
}

export function Home({
  onOpen,
  highlightId,
  spotlight = false,
}: {
  onOpen: (a: AppDef) => void
  highlightId?: string | null
  spotlight?: boolean
}) {
  const gridApps = apps.filter((a) => !dockIds.includes(a.id))
  const dock = dockIds.map((id) => apps.find((a) => a.id === id)!).filter(Boolean)

  return (
    <motion.div
      className="absolute inset-0 flex flex-col"
      style={{
        background:
          'radial-gradient(120% 90% at 70% 0%, #ff9472 0%, #f2709c 35%, #5e5ce6 70%, #1b2a6b 100%)',
      }}
      initial={{ scale: 1.08, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 26 }}
    >
      <StatusBar dark />

      {/* game-style dim + blur backdrop; pointer-events-none so the glowing icon stays tappable */}
      {spotlight && (
        <div className="pointer-events-none absolute inset-0 z-40 bg-black/45 backdrop-blur-[3px]" />
      )}

      <div className="px-7 pt-2 text-white">
        <p className="text-[13px] font-medium opacity-80">Welcome to</p>
        <p className="text-[22px] font-bold leading-tight">{profile.name}'s Portfolio</p>
      </div>

      <div className="grid grid-cols-4 gap-x-4 gap-y-5 px-7 pt-7">
        {gridApps.map((a) => (
          <Icon key={a.id} app={a} onOpen={onOpen} highlight={highlightId === a.id} />
        ))}
      </div>

      <div className="mt-auto px-4 pb-3">
        <div className="glass-dark flex items-center justify-around rounded-[26px] px-3 py-3">
          {dock.map((a) => (
            <Icon key={a.id} app={a} onOpen={onOpen} big />
          ))}
        </div>
        <div className="mx-auto mt-2 h-1.5 w-32 rounded-full bg-white/70" />
      </div>
    </motion.div>
  )
}
