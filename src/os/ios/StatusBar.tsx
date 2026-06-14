import { useClock } from '../../hooks/useDevice'

export function StatusBar({ dark = false }: { dark?: boolean }) {
  const time = useClock('ios')
  const color = dark ? 'text-white' : 'text-black'
  return (
    <div className={`flex h-11 shrink-0 items-center justify-between px-6 text-[15px] font-semibold ${color}`}>
      <span className="tabular-nums">{time}</span>
      <div className="flex items-center gap-1.5 text-[13px]">
        <span>📶</span>
        <span>📡</span>
        <span>🔋</span>
      </div>
    </div>
  )
}
