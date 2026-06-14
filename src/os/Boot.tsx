import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function Boot({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(id)
          setTimeout(onDone, 350)
          return 100
        }
        return p + Math.random() * 22
      })
    }, 180)
    return () => clearInterval(id)
  }, [onDone])

  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black"
      exit={{ opacity: 0 }}
    >
      <span className="text-7xl text-white"></span>
      <div className="mt-16 h-1.5 w-48 overflow-hidden rounded-full bg-white/20">
        <motion.div
          className="h-full rounded-full bg-white"
          animate={{ width: `${Math.min(progress, 100)}%` }}
          transition={{ ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  )
}
