import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useDevice } from './hooks/useDevice'
import { Boot } from './os/Boot'
import { OSProvider } from './os/store'
import { MacDesktop } from './os/mac/Desktop'
import { Phone } from './os/ios/Phone'

export default function App() {
  const device = useDevice()
  const [booted, setBooted] = useState(false)

  return (
    <div className="h-full w-full">
      <AnimatePresence>{!booted && <Boot key="boot" onDone={() => setBooted(true)} />}</AnimatePresence>

      {booted &&
        (device === 'mac' ? (
          <OSProvider>
            <MacDesktop />
          </OSProvider>
        ) : (
          <Phone />
        ))}
    </div>
  )
}
