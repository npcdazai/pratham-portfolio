import { appMap } from '../../apps/registry'
import { useClock } from '../../hooks/useDevice'
import { useOS } from '../store'
import { profile } from '../../data/resume'

export function MenuBar() {
  const { topId } = useOS()
  const clock = useClock('mac')
  const activeName = topId ? appMap[topId]?.title : 'Finder'
  const menus = ['File', 'Edit', 'View', 'Window', 'Help']

  return (
    <div className="glass-dark fixed inset-x-0 top-0 z-[9999] flex h-7 items-center justify-between px-3 text-[13px] text-white/90">
      <div className="flex items-center gap-4">
        <span className="text-[15px] leading-none"></span>
        <span className="font-semibold">{activeName}</span>
        <div className="hidden items-center gap-4 sm:flex">
          {menus.map((m) => (
            <span key={m} className="text-white/80">{m}</span>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3.5 font-medium">
        <span title={profile.location}>📍</span>
        <span>🔋</span>
        <span>📶</span>
        <span>🔍</span>
        <span className="tabular-nums">{clock}</span>
      </div>
    </div>
  )
}
