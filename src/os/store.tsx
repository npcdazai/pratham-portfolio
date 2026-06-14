import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import { appMap } from '../apps/registry'

export type WinState = {
  id: string
  z: number
  minimized: boolean
  maximized: boolean
  x: number
  y: number
  w: number
  h: number
}

type Store = {
  windows: WinState[]
  topId: string | null
  open: (id: string) => void
  close: (id: string) => void
  focus: (id: string) => void
  minimize: (id: string) => void
  toggleMax: (id: string) => void
  setBounds: (id: string, b: Partial<Pick<WinState, 'x' | 'y' | 'w' | 'h'>>) => void
}

const Ctx = createContext<Store | null>(null)

let openCount = 0

export function OSProvider({ children }: { children: React.ReactNode }) {
  const [windows, setWindows] = useState<WinState[]>([])
  const zRef = useRef(10)

  const focus = useCallback((id: string) => {
    setWindows((ws) => {
      const top = ++zRef.current
      return ws.map((w) => (w.id === id ? { ...w, z: top, minimized: false } : w))
    })
  }, [])

  const open = useCallback(
    (id: string) => {
      const def = appMap[id]
      if (!def) return
      if (def.href) {
        window.open(def.href, '_blank', 'noopener')
        return
      }
      setWindows((ws) => {
        const existing = ws.find((w) => w.id === id)
        const top = ++zRef.current
        if (existing) {
          return ws.map((w) => (w.id === id ? { ...w, z: top, minimized: false } : w))
        }
        const w = def.size?.w ?? 560
        const h = def.size?.h ?? 560
        const vw = window.innerWidth
        const vh = window.innerHeight
        const offset = (openCount++ % 5) * 28
        const x = Math.max(24, Math.min((vw - w) / 2 + offset - 60, vw - w - 24))
        const y = Math.max(44, 70 + offset)
        return [...ws, { id, z: top, minimized: false, maximized: false, x, y, w, h }]
      })
    },
    [],
  )

  const close = useCallback((id: string) => {
    setWindows((ws) => ws.filter((w) => w.id !== id))
  }, [])

  const minimize = useCallback((id: string) => {
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, minimized: true } : w)))
  }, [])

  const toggleMax = useCallback((id: string) => {
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, maximized: !w.maximized } : w)))
  }, [])

  const setBounds: Store['setBounds'] = useCallback((id, b) => {
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, ...b } : w)))
  }, [])

  const topId = useMemo(() => {
    const visible = windows.filter((w) => !w.minimized)
    if (!visible.length) return null
    return visible.reduce((a, b) => (a.z > b.z ? a : b)).id
  }, [windows])

  const value = useMemo(
    () => ({ windows, topId, open, close, focus, minimize, toggleMax, setBounds }),
    [windows, topId, open, close, focus, minimize, toggleMax, setBounds],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useOS() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useOS must be used within OSProvider')
  return ctx
}
