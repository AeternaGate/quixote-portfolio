# AGENTS.md

Quixote.Dev portfolio. Vite + React 18 + TypeScript + Tailwind CSS + GSAP/ScrollTrigger + reactbits WebGL background. Preview with `npm run dev` (http://localhost:5177). Build with `npm run build` → `dist/`.

## Product truth (read before editing UI)

- `PRODUCT.md` is the source of truth. All project/contact content is **placeholder**; never fabricate real testimonials, metrics, emails, or links.
- Binding user directives: **no emojis** (icons are authored inline SVG), **one font** (Cormorant Garamond, loaded from Google Fonts), **EN/RU language switcher** (`useLang` hook → React context → `localStorage('quixote-lang')` persistence).
- Binding visual constraint: "wow effect" with a **field of scarlet/crimson roses** (the hero video backdrop).

## Architecture

- Entry: `index.html` (Vite) → `src/main.tsx` → `src/App.tsx`
- i18n: `src/i18n.ts` (EN/RU dictionaries) + `src/LangContext.tsx` (React context + localStorage)
- Styles: `src/styles/index.css` (Tailwind + custom CSS, palette tokens in `:root`)
- Components: `src/components/` — `Nav`, `Hero`, `Work`, `About`, `Contact`, `Footer`, `ScrollRose`, `ScrollReveal`, `Reveal`, `SilkBackground`
- Scroll-scrub: `ScrollRose` uses GSAP ScrollTrigger to map page scroll progress → `video.currentTime` on an all-intra MP4 (`rose-scroll.mp4`, 169 I-frames)
- Background: Silk (reactbits WebGL shader via @react-three/fiber + three.js), muted dark crimson `#3a0f12`
- Text reveal: `ScrollReveal` (reactbits adaptation) — word-by-word blur+opacity+rotate on GSAP ScrollTrigger
- Block reveal: `Reveal` wrapper — opacity 0→1, translateY 40→0, stagger by delay prop

## Impeccable design skill (this repo is governed by it)

- Skill base dir: `.opencode/skills/impeccable` (junction to the AionUi store). Commands: `node .opencode/skills/impeccable/scripts/<script>.mjs`.
- The design detector runs in **degraded regex mode** here (htmlparser2/css-select/css-tree/domutils unavailable) → its `[]` result is an **undercount, not a clean bill of health**. Run it manually with: `node .opencode/skills/impeccable/scripts/detect.mjs --json dist/index.html`. It also prints a "DEGRADED" warning to stderr — that is expected, not an error.
- `.impeccable/config.json` sets `buildPath: "comp"`. `/impeccable audit`, `/harden`, `/optimize` etc. follow the playbooks in `reference/`.

## Environment quirks (Windows / PowerShell)

- PowerShell console shows **garbled Cyrillic** for non-ASCII output — display-only; files are correct UTF-8. Don't "fix" encoding based on console output.
- This model **cannot read images** (`read` on PNG returns an error) — verify layout via snapshots, DOM measurements, and `evaluate_script`, not screenshots.
- The emulated browser is stuck at `prefers-reduced-motion: reduce` → the hero video **pauses and shows the poster**; that is correct behavior, not a bug. The wilting-rose animation is single-play (holds last frame); there is no way to visually observe the motion loop here.

## Assets (masters vs optimized copies)

`assets/` holds both masters and the optimized files wired into the HTML:
- `90ae…mp4` (10.9MB, 1926×1076) and `Generated Image….png` (2.5MB) are **masters — never wire these into HTML**.
- `PixVerse_V6_Image_Text_720P_Imagetovideo_anima (online-video-cutter.com).mp4` (1.96MB, 720×1162, 7s, 1 I-frame) — **original** wilting-rose master.
- **Active hero**: `rose-scroll.mp4` (3.77MB, 720×1162, 169 I-frames, all-intra, fully seekable) — same rose re-encoded for scroll-scrub. Poster: `rose-wilting-poster.webp` (5KB). Both wired into `ScrollRose.tsx`.
- `rose-field-720.mp4` (1.67MB, 1280×720) and `rose-poster.webp` (152KB) are **former** active assets, kept on disk as masters only.
- `rose-wilting-poster.png` (267KB) — superseded by WebP version.
- ffmpeg 9.0.1 installed via winget; use the full path `C:\Users\user\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-9.0.1-full_build\bin\ffmpeg.exe` (PATH needs a relogin to apply).

## Known ceilings (deliberate)

- Video is scrubbed by GSAP ScrollTrigger (page top→bottom = video start→end). Requires all-intra source so seeking is smooth; this makes the MP4 3.77MB vs 1.96MB original.
- The `#rosebg` element (`.rose-video`) uses `object-fit: contain` + `object-position: 50% 78%` so the portrait (720×1162) shows the flower centered in viewport, with `#1a0d0d` background filling bands.
- Contact chips use `href="#"` because contact data is placeholder (PRODUCT.md forbids fabricating real links).
- Three.js (Silk background) adds ~770KB gzipped to JS bundle — acceptable for WebGL depth layer; can code-split later if needed.
- No-JS visitors see nothing (React app). Acceptable for a portfolio.
- Reduced-motion: shows static poster, no scrub.

## Verification workflow (bounded)

After UI edits: `npm run build` → open `dist/index.html` in browser, check console for errors, test EN/RU both directions (reload must restore saved language), verify scroll-scrub video plays from top to bottom.
