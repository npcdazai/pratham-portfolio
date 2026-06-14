import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { LockScreen } from './LockScreen'
import { Home } from './Home'
import { AppView } from './AppView'
import { TourFolders } from '../TourFolders'
import { appMap, type AppDef } from '../../apps/registry'

export function Phone() {
  const [locked, setLocked] = useState(true)
  const [openApp, setOpenApp] = useState<AppDef | null>(null)
  const [tourDone, setTourDone] = useState(false)

  const handleOpen = (a: AppDef) => {
    if (a.href) {
      window.open(a.href, '_blank', 'noopener')
      return
    }
    setOpenApp(a)
  }

  const pick = (id: string) => {
    setOpenApp(appMap[id] ?? null)
    setTourDone(true)
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      <Home onOpen={handleOpen} />

      <AnimatePresence>
        {openApp && <AppView key={openApp.id} app={openApp} onClose={() => setOpenApp(null)} />}
      </AnimatePresence>

      {/* After unlocking, black-blur the screen and spotlight the two folders */}
      <AnimatePresence>
        {!locked && !tourDone && <TourFolders key="tour" onPick={pick} />}
      </AnimatePresence>

      <AnimatePresence>
        {locked && <LockScreen key="lock" onUnlock={() => setLocked(false)} />}
      </AnimatePresence>
    </div>
  )
}
