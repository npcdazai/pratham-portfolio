import { motion, useDragControls } from 'framer-motion'
import { appMap } from '../../apps/registry'
import { useOS, type WinState } from '../store'

function TrafficLights({
  onClose,
  onMin,
  onMax,
}: {
  onClose: () => void
  onMin: () => void
  onMax: () => void
}) {
  const dot = 'group/btn grid h-3 w-3 place-items-center rounded-full'
  return (
    <div className="group flex items-center gap-2">
      <button onClick={onClose} className={`${dot} bg-[#ff5f57]`} aria-label="Close">
        <span className="text-[8px] font-bold leading-none text-black/50 opacity-0 group-hover:opacity-100">
          ✕
        </span>
      </button>
      <button onClick={onMin} className={`${dot} bg-[#febc2e]`} aria-label="Minimize">
        <span className="text-[9px] font-bold leading-none text-black/50 opacity-0 group-hover:opacity-100">
          −
        </span>
      </button>
      <button onClick={onMax} className={`${dot} bg-[#28c840]`} aria-label="Maximize">
        <span className="text-[7px] font-bold leading-none text-black/50 opacity-0 group-hover:opacity-100">
          ⤢
        </span>
      </button>
    </div>
  )
}

export function Window({ win }: { win: WinState }) {
  const { close, minimize, toggleMax, focus, setBounds, topId } = useOS()
  const def = appMap[win.id]
  const dragControls = useDragControls()
  if (!def) return null
  const Body = def.Component
  const isTop = topId === win.id

  const maxBounds = { x: 0, y: 28, w: window.innerWidth, h: window.innerHeight - 28 - 84 }
  const x = win.maximized ? maxBounds.x : win.x
  const y = win.maximized ? maxBounds.y : win.y
  const w = win.maximized ? maxBounds.w : win.w
  const h = win.maximized ? maxBounds.h : win.h

  return (
    <motion.div
      className="absolute flex flex-col overflow-hidden rounded-xl border border-black/10 bg-white shadow-2xl"
      style={{ zIndex: win.z }}
      initial={{ opacity: 0, scale: 0.92, y: y + 16, x }}
      animate={{
        opacity: win.minimized ? 0 : 1,
        scale: win.minimized ? 0.4 : 1,
        x,
        y: win.minimized ? window.innerHeight : y,
        width: w,
        height: h,
        pointerEvents: win.minimized ? 'none' : 'auto',
      }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 360, damping: 30 }}
      drag={!win.maximized}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragConstraints={{ left: -w + 120, right: window.innerWidth - 120, top: 28, bottom: window.innerHeight - 100 }}
      onDragEnd={(_, info) => setBounds(win.id, { x: win.x + info.offset.x, y: win.y + info.offset.y })}
      onMouseDown={() => focus(win.id)}
    >
      {/* Title bar */}
      <div
        className="flex h-10 shrink-0 items-center gap-3 border-b border-black/5 bg-[#f6f6f6]/90 px-4 backdrop-blur"
        onPointerDown={(e) => !win.maximized && dragControls.start(e)}
        onDoubleClick={() => toggleMax(win.id)}
        style={{ cursor: win.maximized ? 'default' : 'grab' }}
      >
        <TrafficLights
          onClose={() => close(win.id)}
          onMin={() => minimize(win.id)}
          onMax={() => toggleMax(win.id)}
        />
        <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 text-[13px] font-semibold text-neutral-500">
          {def.title}
        </div>
      </div>

      <div className={`os-scroll flex-1 overflow-auto ${isTop ? '' : 'opacity-95'}`}>
        <Body />
      </div>
    </motion.div>
  )
}
