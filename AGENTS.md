# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Commands

```sh
npm install        # install deps — requires Node ^20.19.0 || >=22.12.0 (enforced via package.json "engines")
npm run dev        # vite dev server with hot-reload
npm run build      # production build → dist/
npm run preview    # serve the built dist/ locally
npx vercel@latest deploy --prod --yes  # deploy the linked project to production
```

No linter, formatter, or test runner is configured. Type checking is IDE-only (Volar) — there is no `tsc` step.

## Architecture

Single-page Vue 3 app (Composition API, `<script setup>`, plain JS — no TypeScript) bundled by Vite. The whole experience is one fixed full-screen viewport: `body` has `overflow: hidden` and `height: 100vh`; routes swap inside a centered `<router-view>` while a fixed nav bar and footer persist (see `src/App.vue`).

### Theme system
Themes are **CSS custom properties only** — no JS state for colors. `src/style.css` defines variables under two scopes:
- `:root` = dark theme (default)
- `.nodark` = light theme

`App.vue` toggles by adding/removing the `nodark` class on the root `#back` div (`flag_isDark ? '' : 'nodark'`). To change a color, edit the variable in `style.css`, not per-component. Components reference colors via `var(--mk-primary)`, `var(--bg-secondary)`, etc. Background images for the About carousel are also CSS vars (`--bg-image1/2/3`).

### Routing
`src/router/index.js` uses `createWebHistory`. `Home` is statically imported; every other route is lazy-loaded via dynamic `import()`. `/About` is the personal profile and `/Project` is the rotating project hub, while `/Project/ai-sales-coach`, `/Project/car-rental`, and `/join/joinUs` are flat routes that *look* nested but are not children. `/:pathMatch(.*)*` → `404.vue`. Because history mode is used, deployment must rewrite unknown paths to `index.html`.

### The `compomnent/` directory (note the misspelling)
Components live in `src/compomnent/` — this is the actual folder name (typo intentional or not, it's load-bearing). Every view imports via the relative path `../compomnent/<file>.vue`. Do not "fix" the spelling without updating all imports. The `@/` alias (configured in both `vite.config.js` and `jsconfig.json`) maps to `src/` but is **not currently used** by existing code — views use relative paths.

### Static assets
`public/` holds large binaries: theme images (`dark1-3.png`, `light1-3.png`), music covers (`music1-7.*`), MP3s, and `h.jpg`. Project theme images use root-absolute paths such as `/dark1.png` so they work from nested history routes and production deployments. Some older views still reference other public assets with relative paths like `../../public/foo.png`; preserve the local pattern within a feature or migrate that feature consistently. `src/assets/` holds the custom font (`YouSheBiaoTiHei-2.ttf`, registered as `优设标题黑` in `style.css`) and `iconfont.{css,ttf}`.

### Icons
A single `iconfont` font family is registered in `src/assets/iconfont.css`; each icon is a `.icon-<name>` class with a `\eXXX` glyph. Use as `<i class="iconfont icon-xxx">`. The font file is `src/assets/iconfont.ttf`. To add an icon you must edit both the CSS (new `.icon-xxx:before` rule) and the TTF — there's no automated pipeline.

### Global features in App.vue
- **Theme toggle**: `flag_isDark` ref + the `.nodark` class swap described above.
- **Task drawer**: `TaskDrawer` is mounted globally and toggled by the floating `.task-float-btn`. State persists to `localStorage` under the key `qiushen_tasks` (see `src/compomnent/taskDrawer.vue`).

### Deployment and AI proxy
- Production is linked to the Vercel project `qiushen/personal-webpage`; deployment details are documented in `docs/06-deployment.md`.
- GitHub Pages publishes a separate no-AI static build from `.github/workflows/deploy-pages.yml` to `https://qiu-shen.github.io/`.
- The Pages workflow sets `VITE_ENABLE_AI_ASSISTANT=false` and `VITE_USE_HASH_ROUTER=true`; do not apply these settings to the Vercel production build.
- The browser calls `/api/chat`. `api/chat.js` is the Vercel Function that reads the server-only `DEEPSEEK_API_KEY` and forwards sanitized conversations to DeepSeek.
- Never move `DEEPSEEK_API_KEY` back into a `VITE_` variable; all Vite variables are public in the browser bundle.
- `vercel.json` provides the SPA fallback required by `createWebHistory` routes.

### Music player
`src/compomnent/musicPlayer.vue` is a full-screen overlay player driven entirely by props (`showMusicPlayer`, `MusicName`, `singer`, `imgUrl`, `musicUrl`) from the parent view (`music.vue`). It manages its own `<audio>` element, progress, volume, repeat/favorite flags, and ESC-to-close. The `waitUntil` helper polls on a 100ms timer until `audioElement.value.duration > 0` — kept because HTMLMediaElement exposes duration asynchronously.

## Conventions

- All UI text and comments are in Chinese. Match the existing language when editing.
- Vue SFCs use `<script setup>` only; no Options API anywhere.
- Scoped styles per component; theme colors come from CSS vars, not hardcoded values.
