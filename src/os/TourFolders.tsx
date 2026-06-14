import { motion } from 'framer-motion'
import { apps } from '../apps/registry'

const FOLDER_IDS = ['projects', 'experience']

/**
 * Game-style focus overlay: blacks out + blurs the whole screen and spotlights
 * only the Projects and Experience folders. Picking one clears the blur.
 */
export function TourFolders({ onPick }: { onPick: (id: string) => void }) {
  const folders = FOLDER_IDS.map((id) => apps.find((a) => a.id === id)!).filter(Boolean)

  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-lg" />

      <motion.div
        className="relative text-center"
        initial={{ y: 14, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">Welcome 👋</h2>
        <p className="mt-1.5 text-[13px] text-white/60 sm:text-[15px]">
          Open a folder to begin — my Projects, then my Experience
        </p>
      </motion.div>

      <div className="relative mt-10 flex gap-8 sm:gap-14">
        {folders.map((a, i) => (
          <motion.button
            key={a.id}
            onClick={() => onPick(a.id)}
            whileTap={{ scale: 0.94 }}
            className="group flex flex-col items-center gap-3"
            initial={{ opacity: 0, y: 26, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.25 + i * 0.15, type: 'spring', stiffness: 240, damping: 20 }}
          >
            <span className="relative grid place-items-center">
              <motion.span
                className="pointer-events-none absolute -inset-2.5 rounded-[34px] ring-2 ring-white/70"
                animate={{ opacity: [0.3, 0.95, 0.3], scale: [1, 1.06, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />
              <motion.span
                className="grid h-24 w-24 place-items-center rounded-[28px] text-4xl text-white shadow-2xl transition group-hover:brightness-110 sm:h-28 sm:w-28 sm:text-5xl"
                style={{ background: a.gradient }}
                animate={{ y: [0, -9, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
              >
                {a.glyph}
              </motion.span>
            </span>
            <span className="flex items-center gap-2 text-[16px] font-semibold text-white sm:text-[18px]">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-[#0a84ff] text-[11px]">
                {i + 1}
              </span>
              {a.title}
            </span>
          </motion.button>
        ))}
      </div>

      <motion.p
        className="relative mt-12 text-[12px] text-white/40"
        animate={{ opacity: [0.35, 0.8, 0.35] }}
        transition={{ duration: 2.2, repeat: Infinity }}
      >
        the blur clears once you open one ↑
      </motion.p>
    </motion.div>
  )
}
