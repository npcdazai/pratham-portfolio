import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { apps } from '../../apps/registry'
import { useOS } from '../store'

const dockApps = apps // show all, including external links

export function Dock({ highlightId }: { highlightId?: string | null }) {
  const { open, windows } = useOS()
  const [hovered, setHovered] = useState<number | null>(null)
  const running = new Set(windows.map((w) => w.id))
  const containerRef = useRef<HTMLDivElement>(null)

  const scaleFor = (i: number) => {
    if (hovered === null) return 1
    const d = Math.abs(hovered - i)
    if (d === 0) return 1.55
    if (d === 1) return 1.28
    if (d === 2) return 1.1
    return 1
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-2 z-[9998] flex justify-center">
      <div
        ref={containerRef}
        className="glass pointer-events-auto flex items-end gap-1.5 rounded-2xl border border-white/40 px-2.5 py-1.5 shadow-2xl"
        onMouseLeave={() => setHovered(null)}
      >
        {dockApps.map((a, i) => {
          const scale = scaleFor(i)
          const highlighted = highlightId === a.id
          return (
            <div key={a.id} className="group relative flex flex-col items-center">
              {highlighted && (
                <>
                  <motion.span
                    className="pointer-events-none absolute -inset-1 rounded-[18px] ring-2 ring-white"
                    animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.08, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                  />
                  <motion.span
                    className="pointer-events-none absolute -top-12 text-3xl text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]"
                    animate={{ y: [0, 9, 0] }}
                    transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    👇
                  </motion.span>
                </>
              )}
              <motion.button
                onMouseEnter={() => setHovered(i)}
                onClick={() => open(a.id)}
                animate={{ scale, y: scale > 1 ? -8 * (scale - 1) : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 28 }}
                className="relative grid h-12 w-12 origin-bottom place-items-center rounded-[14px] text-2xl text-white shadow-md"
                style={{ background: a.gradient }}
                aria-label={a.title}
              >
                <span className={a.glyph.length <= 2 && !/\p{Emoji}/u.test(a.glyph) ? 'text-lg font-bold' : ''}>
                  {a.glyph}
                </span>
                <span className="pointer-events-none absolute -top-9 hidden whitespace-nowrap rounded-md bg-neutral-800/90 px-2 py-1 text-[11px] font-medium text-white group-hover:block">
                  {a.title}
                </span>
              </motion.button>
              <span
                className={`mt-0.5 h-1 w-1 rounded-full bg-neutral-700/70 transition ${
                  running.has(a.id) ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
