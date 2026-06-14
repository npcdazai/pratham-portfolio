import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { MenuBar } from './MenuBar'
import { Dock } from './Dock'
import { Window } from './Window'
import { TourFolders } from '../TourFolders'
import { useOS } from '../store'
import { apps } from '../../apps/registry'
import { profile } from '../../data/resume'

const WALLPAPER =
  'radial-gradient(120% 120% at 20% 10%, #ff7eb3 0%, #ff758c 18%, #7868e6 45%, #4d5bf2 68%, #1b2a6b 100%)'

function DesktopIcons() {
  const { open } = useOS()
  const desktopApps = apps.filter((a) =>
    ['about', 'projects', 'experience', 'resume', 'github', 'linkedin'].includes(a.id),
  )
  return (
    <div className="absolute right-5 top-12 flex flex-col gap-5">
      {desktopApps.map((a) => (
        <button
          key={a.id}
          onDoubleClick={() => open(a.id)}
          className="group flex w-20 flex-col items-center gap-1"
        >
          <span
            className="grid h-14 w-14 place-items-center rounded-2xl text-2xl text-white shadow-lg ring-0 transition group-active:scale-95 group-focus:ring-2 group-focus:ring-white/70"
            style={{ background: a.gradient }}
          >
            {a.glyph}
          </span>
          <span className="rounded px-1 text-[12px] font-medium text-white drop-shadow group-focus:bg-[#0a84ff]">
            {a.title}
          </span>
        </button>
      ))}
    </div>
  )
}

function Welcome() {
  const { windows, open } = useOS()
  if (windows.length) return null
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white"
    >
      <h1 className="text-5xl font-bold tracking-tight drop-shadow-lg">{profile.name}</h1>
      <p className="mt-2 text-lg font-medium text-white/90 drop-shadow">{profile.title}</p>
      <p className="mt-1 text-sm text-white/70">{profile.tagline}</p>
      <button
        onClick={() => open('about')}
        className="pointer-events-auto mt-6 rounded-full bg-white/20 px-5 py-2 text-sm font-semibold backdrop-blur transition hover:bg-white/30"
      >
        Open “About Me” →
      </button>
      <p className="mt-3 text-xs text-white/60">Tip: explore the Dock below ↓</p>
    </motion.div>
  )
}

export function MacDesktop() {
  const { windows, open } = useOS()
  const [tourDone, setTourDone] = useState(false)

  const pick = (id: string) => {
    open(id)
    setTourDone(true)
  }

  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: WALLPAPER }}>
      <MenuBar />
      <DesktopIcons />
      {tourDone && <Welcome />}
      <AnimatePresence>
        {windows.map((w) => (
          <Window key={w.id} win={w} />
        ))}
      </AnimatePresence>
      <Dock />

      <AnimatePresence>{!tourDone && <TourFolders onPick={pick} />}</AnimatePresence>
    </div>
  )
}
