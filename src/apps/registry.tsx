import type { FC } from 'react'
import { About, Projects, ExperienceApp, Skills, Contact, Resume, Terminal } from './content'
import { profile } from '../data/resume'

export type AppDef = {
  id: string
  title: string
  glyph: string
  gradient: string
  Component: FC
  size?: { w: number; h: number }
  /** opens an external url instead of a window/app */
  href?: string
}

const tile = (glyph: string, gradient: string) => ({ glyph, gradient })

export const apps: AppDef[] = [
  {
    id: 'about',
    title: 'About Me',
    ...tile('👤', 'linear-gradient(160deg,#0a84ff,#0040dd)'),
    Component: About,
    size: { w: 560, h: 580 },
  },
  {
    id: 'projects',
    title: 'Projects',
    ...tile('🗂️', 'linear-gradient(160deg,#ff9f0a,#ff375f)'),
    Component: Projects,
    size: { w: 600, h: 620 },
  },
  {
    id: 'experience',
    title: 'Experience',
    ...tile('💼', 'linear-gradient(160deg,#30d158,#149a4f)'),
    Component: ExperienceApp,
    size: { w: 620, h: 600 },
  },
  {
    id: 'skills',
    title: 'Skills',
    ...tile('🧩', 'linear-gradient(160deg,#bf5af2,#5e5ce6)'),
    Component: Skills,
    size: { w: 560, h: 560 },
  },
  {
    id: 'resume',
    title: 'Résumé',
    ...tile('📄', 'linear-gradient(160deg,#8e8e93,#48484a)'),
    Component: Resume,
    size: { w: 640, h: 640 },
  },
  {
    id: 'terminal',
    title: 'Terminal',
    ...tile('>_', 'linear-gradient(160deg,#3a3a3c,#1c1c1e)'),
    Component: Terminal,
    size: { w: 600, h: 420 },
  },
  {
    id: 'contact',
    title: 'Contact',
    ...tile('✉️', 'linear-gradient(160deg,#64d2ff,#0a84ff)'),
    Component: Contact,
    size: { w: 520, h: 600 },
  },
  {
    id: 'github',
    title: 'GitHub',
    ...tile('🐙', 'linear-gradient(160deg,#6e5494,#24292e)'),
    Component: () => null,
    href: profile.github,
  },
  {
    id: 'linkedin',
    title: 'LinkedIn',
    ...tile('in', 'linear-gradient(160deg,#0a66c2,#004182)'),
    Component: () => null,
    href: profile.linkedin,
  },
]

export const appMap = Object.fromEntries(apps.map((a) => [a.id, a])) as Record<string, AppDef>
