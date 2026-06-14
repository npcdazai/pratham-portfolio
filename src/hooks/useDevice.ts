import { useEffect, useState } from 'react'

export type DeviceKind = 'mac' | 'ios'

function detect(): DeviceKind {
  if (typeof window === 'undefined') return 'mac'
  const coarse = window.matchMedia('(pointer: coarse)').matches
  const narrow = window.innerWidth < 820
  return coarse || narrow ? 'ios' : 'mac'
}

export function useDevice(): DeviceKind {
  const [device, setDevice] = useState<DeviceKind>(detect)

  useEffect(() => {
    let frame = 0
    const onResize = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => setDevice(detect()))
    }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return device
}

export function useClock(format: 'mac' | 'ios' = 'mac') {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000 * 15)
    return () => clearInterval(id)
  }, [])

  if (format === 'ios') {
    const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
    return time.replace(/\s?(AM|PM)$/i, '')
  }
  const day = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
  return `${day}  ${time}`
}
