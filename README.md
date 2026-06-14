# Pratham Mandavkar — OS Portfolio

An interactive portfolio that **feels like macOS on desktop** and **iOS on mobile**.
The same résumé content is presented through two operating-system shells, chosen
automatically based on the visitor's device.

## Experience

- **Desktop (macOS):** boot screen → desktop with wallpaper, top menu bar with live
  clock, draggable/resizable windows with traffic-light controls (close / minimize /
  maximize), desktop icons, and a magnifying Dock.
- **Mobile (iOS):** boot → lock screen (slide to unlock) → home screen with an app
  grid + bottom dock → full-screen apps with a home indicator to go back.

Apps: **About Me, Projects, Experience, Skills, Résumé, Terminal (interactive),
Contact, GitHub, LinkedIn**. All content comes from a single source of truth in
[`src/data/resume.ts`](src/data/resume.ts).

## Tech

React 18 · TypeScript · Vite · Tailwind CSS v4 · Framer Motion.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the production build
```

> Tip: resize the browser narrow (< 820px) or open on a phone to switch to the iOS shell.

## Structure

```
src/
  data/resume.ts        # all résumé content (single source of truth)
  apps/content.tsx      # the actual app screens (shared by both shells)
  apps/registry.tsx     # app list: id, icon, gradient, component
  hooks/useDevice.ts     # mac vs ios detection + clocks
  os/
    Boot.tsx            # startup screen
    store.tsx           # macOS window manager (open/close/focus/min/max)
    mac/                # Desktop, MenuBar, Dock, Window
    ios/                # Phone, LockScreen, Home, AppView, StatusBar
```
