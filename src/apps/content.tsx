import { useEffect, useRef, useState } from 'react'
import { profile, skills, experience, projects, education } from '../data/resume'

/* ---------- small shared bits ---------- */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-7">
      <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
        {title}
      </h3>
      {children}
    </section>
  )
}

const Avatar = ({ size = 84 }: { size?: number }) => (
  <div
    className="grid shrink-0 place-items-center rounded-3xl font-semibold text-white shadow-lg"
    style={{
      width: size,
      height: size,
      fontSize: size * 0.38,
      background: 'linear-gradient(150deg,#0a84ff,#5e5ce6 55%,#bf5af2)',
    }}
  >
    PM
  </div>
)

/* ---------- About ---------- */

export function About() {
  const facts = [
    ['Role', profile.title],
    ['Experience', '2.6+ years'],
    ['Location', profile.location],
    ['Focus', 'Fintech · Web & Mobile'],
  ]
  return (
    <div className="px-7 py-7 text-neutral-800">
      <div className="flex items-center gap-5">
        <Avatar />
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{profile.name}</h1>
          <p className="text-[15px] font-medium text-neutral-500">{profile.title}</p>
          <p className="mt-1 text-[13px] text-neutral-400">{profile.tagline}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {[
          { label: 'LinkedIn', icon: '💼', href: profile.linkedin, accent: '#0a66c2' },
          { label: 'GitHub', icon: '🐙', href: profile.github, accent: '#24292e' },
          { label: 'Email', icon: '✉️', href: `mailto:${profile.email}`, accent: '#0a84ff' },
        ].map((l) => (
          <a
            key={l.label}
            href={l.href}
            target={l.href.startsWith('http') ? '_blank' : undefined}
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition hover:brightness-105 active:scale-95"
            style={{ background: `${l.accent}14`, color: l.accent }}
          >
            <span>{l.icon}</span>
            {l.label}
            <span className="opacity-60">↗</span>
          </a>
        ))}
      </div>

      <Section title="About">
        <p className="text-[14px] leading-relaxed text-neutral-600 text-balance">{profile.summary}</p>
      </Section>

      <Section title="Overview">
        <div className="grid grid-cols-2 gap-3">
          {facts.map(([k, v]) => (
            <div key={k} className="rounded-2xl bg-neutral-100/80 px-4 py-3">
              <div className="text-[11px] uppercase tracking-wide text-neutral-400">{k}</div>
              <div className="mt-0.5 text-[14px] font-medium text-neutral-800">{v}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Education">
        <div className="rounded-2xl border border-neutral-200/70 px-4 py-3">
          <div className="text-[14px] font-semibold">{education.degree}</div>
          <div className="text-[13px] text-neutral-500">{education.school}</div>
          <div className="text-[12px] text-neutral-400">{education.period}</div>
        </div>
      </Section>
    </div>
  )
}

/* ---------- Projects ---------- */

export function Projects() {
  return (
    <div className="px-6 py-6">
      <div className="grid gap-4">
        {projects.map((p) => (
          <div
            key={p.name}
            className="rounded-3xl border border-neutral-200/70 bg-white/60 p-5 transition hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              {p.image ? (
                <div
                  className="h-12 w-12 shrink-0 overflow-hidden rounded-2xl shadow-sm"
                  style={{ background: p.imageContain ? '#fff' : undefined }}
                >
                  <img
                    src={p.image}
                    alt={`${p.name} logo`}
                    className={`h-full w-full ${p.imageContain ? 'object-contain p-1' : 'object-cover'}`}
                  />
                </div>
              ) : (
                <div
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-2xl shadow-sm"
                  style={{ background: `${p.accent}1a` }}
                >
                  {p.icon}
                </div>
              )}
              <div>
                <h3 className="text-[16px] font-semibold text-neutral-800">{p.name}</h3>
                <p className="text-[12px] text-neutral-500">{p.blurb}</p>
              </div>
            </div>
            <ul className="mt-3 space-y-1.5">
              {p.points.map((pt, i) => (
                <li key={i} className="flex gap-2 text-[13px] leading-relaxed text-neutral-600">
                  <span style={{ color: p.accent }}>▸</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full px-2.5 py-1 text-[11px] font-medium"
                  style={{ background: `${p.accent}14`, color: p.accent }}
                >
                  {s}
                </span>
              ))}
            </div>
            {p.links && (
              <div className="mt-3 flex flex-wrap gap-2 border-t border-neutral-200/70 pt-3">
                {p.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg px-3 py-1.5 text-[12px] font-semibold text-white shadow-sm transition hover:brightness-110 active:scale-95"
                    style={{ background: p.accent }}
                  >
                    {l.label} ↗
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---------- Experience ---------- */

export function ExperienceApp() {
  return (
    <div className="px-7 py-6">
      <div className="relative ml-2 border-l border-neutral-200 pl-6">
        {experience.map((job, i) => (
          <div key={i} className="relative mb-8 last:mb-2">
            <span className="absolute -left-[31px] top-1 grid h-4 w-4 place-items-center rounded-full bg-white">
              <span className="h-2.5 w-2.5 rounded-full bg-[#0a84ff]" />
            </span>
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <h3 className="text-[15px] font-semibold text-neutral-800">
                {job.role} · <span className="text-[#0a84ff]">{job.company}</span>
              </h3>
              <span className="text-[12px] text-neutral-400">{job.period}</span>
            </div>
            <p className="mb-2 text-[12px] text-neutral-400">{job.location}</p>
            <ul className="space-y-1.5">
              {job.points.map((pt, j) => (
                <li key={j} className="flex gap-2 text-[13px] leading-relaxed text-neutral-600">
                  <span className="text-neutral-300">•</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---------- Skills ---------- */

export function Skills() {
  return (
    <div className="px-7 py-6">
      {skills.map((g) => (
        <Section key={g.label} title={g.label}>
          <div className="flex flex-wrap gap-2">
            {g.items.map((s) => (
              <span
                key={s}
                className="rounded-xl border border-neutral-200/80 bg-white/70 px-3 py-1.5 text-[13px] font-medium text-neutral-700"
              >
                {s}
              </span>
            ))}
          </div>
        </Section>
      ))}
    </div>
  )
}

/* ---------- Contact ---------- */

export function Contact() {
  const links = [
    { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, icon: '✉️', accent: '#0a84ff' },
    { label: 'Phone', value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}`, icon: '📞', accent: '#30d158' },
    { label: 'LinkedIn', value: 'in/pratham-m', href: profile.linkedin, icon: '💼', accent: '#0a66c2' },
    { label: 'GitHub', value: 'npcdazai', href: profile.github, icon: '🐙', accent: '#6e5494' },
  ]
  return (
    <div className="px-7 py-7">
      <div className="mb-6 text-center">
        <Avatar size={72} />
        <h2 className="mt-3 text-xl font-bold text-neutral-800">Let's build something.</h2>
        <p className="text-[13px] text-neutral-500">Open to full-stack & frontend roles · {profile.location}</p>
      </div>
      <div className="grid gap-3">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target={l.href.startsWith('http') ? '_blank' : undefined}
            rel="noreferrer"
            className="flex items-center gap-4 rounded-2xl border border-neutral-200/70 bg-white/60 px-4 py-3 transition hover:shadow-md active:scale-[0.99]"
          >
            <span
              className="grid h-11 w-11 place-items-center rounded-xl text-xl"
              style={{ background: `${l.accent}1a` }}
            >
              {l.icon}
            </span>
            <div className="min-w-0">
              <div className="text-[11px] uppercase tracking-wide text-neutral-400">{l.label}</div>
              <div className="truncate text-[14px] font-medium text-neutral-800">{l.value}</div>
            </div>
            <span className="ml-auto text-neutral-300">›</span>
          </a>
        ))}
      </div>

      <a
        href={RESUME_PDF}
        download={RESUME_FILENAME}
        className="mt-4 flex items-center justify-center gap-2 rounded-2xl bg-[#0a84ff] py-3 text-[14px] font-semibold text-white shadow-md transition hover:brightness-105 active:scale-[0.99]"
      >
        ⬇️ Download Résumé (PDF)
      </a>
    </div>
  )
}

/* ---------- Resume ---------- */

const RESUME_PDF = '/resume.pdf'
const RESUME_FILENAME = 'Pratham_Mandavkar_Resume.pdf'

export function Resume() {
  const btn =
    'rounded-lg bg-[#0a84ff] px-3 py-1.5 text-[12px] font-semibold text-white transition hover:brightness-105 active:scale-95'
  const ghost =
    'rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-[12px] font-semibold text-neutral-700 transition hover:bg-neutral-50 active:scale-95'

  return (
    <div className="flex h-full flex-col bg-neutral-200">
      <div className="flex items-center justify-between gap-2 border-b border-black/5 bg-white/80 px-4 py-2 backdrop-blur">
        <span className="truncate text-[12.5px] font-medium text-neutral-500">{RESUME_FILENAME}</span>
        <div className="flex shrink-0 gap-2">
          <a href={RESUME_PDF} target="_blank" rel="noreferrer" className={ghost}>
            Open ↗
          </a>
          <a href={RESUME_PDF} download={RESUME_FILENAME} className={btn}>
            Download
          </a>
        </div>
      </div>

      <iframe
        src={`${RESUME_PDF}#view=FitH&toolbar=0`}
        title={`${profile.name} — Résumé`}
        className="min-h-0 w-full flex-1 bg-neutral-200"
      />

      {/* Fallback for browsers (often mobile Safari) that won't render PDFs inline */}
      <a
        href={RESUME_PDF}
        target="_blank"
        rel="noreferrer"
        className="border-t border-black/5 bg-white/80 py-2 text-center text-[12px] font-medium text-[#0a84ff] backdrop-blur sm:hidden"
      >
        Tap to open the PDF full-screen ↗
      </a>
    </div>
  )
}

/* ---------- Terminal ---------- */

type Line = { type: 'in' | 'out'; text: string }

const COMMANDS: Record<string, string> = {
  help: `Available commands:
  about       who is Pratham
  skills      tech stack
  experience  work history
  projects    featured work
  contact     how to reach me
  whoami      current user
  clear       clear the screen`,
  about: `${profile.name} — ${profile.title}\n${profile.summary}`,
  whoami: 'guest@pratham-portfolio',
  skills: skills.map((s) => `${s.label}: ${s.items.join(', ')}`).join('\n'),
  experience: experience.map((e) => `${e.period}  ${e.role} @ ${e.company}`).join('\n'),
  projects: projects.map((p) => `${p.icon}  ${p.name} — ${p.blurb}`).join('\n'),
  contact: `email: ${profile.email}\nphone: ${profile.phone}\ngithub: ${profile.github}\nlinkedin: ${profile.linkedin}`,
}

export function Terminal() {
  const [lines, setLines] = useState<Line[]>([
    { type: 'out', text: "Last login: today on ttys000\nType 'help' to get started." },
  ])
  const [value, setValue] = useState('')
  const endRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines])

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase()
    if (!cmd) return
    if (cmd === 'clear') {
      setLines([])
      return
    }
    const out = COMMANDS[cmd] ?? `zsh: command not found: ${cmd}  (try 'help')`
    setLines((l) => [...l, { type: 'in', text: raw }, { type: 'out', text: out }])
  }

  return (
    <div
      className="h-full overflow-auto bg-[#1a1a1c]/95 px-4 py-3 font-mono text-[12.5px] leading-relaxed text-neutral-200 os-scroll"
      onClick={() => inputRef.current?.focus()}
    >
      {lines.map((l, i) => (
        <div key={i} className="whitespace-pre-wrap">
          {l.type === 'in' ? (
            <span>
              <span className="text-[#30d158]">guest@pratham</span>
              <span className="text-neutral-500"> ~ % </span>
              {l.text}
            </span>
          ) : (
            <span className="text-neutral-300">{l.text}</span>
          )}
        </div>
      ))}
      <div className="flex">
        <span className="text-[#30d158]">guest@pratham</span>
        <span className="text-neutral-500"> ~ % </span>
        <input
          ref={inputRef}
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              run(value)
              setValue('')
            }
          }}
          className="ml-1 flex-1 bg-transparent caret-[#30d158] outline-none"
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
        />
      </div>
      <div ref={endRef} />
    </div>
  )
}
