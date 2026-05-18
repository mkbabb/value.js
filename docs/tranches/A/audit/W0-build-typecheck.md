# A.W0 — Build + typecheck + boot evidence

Close evidence for A.W0 (consumer un-break + repo hygiene). Captured 2026-05-18 on `master` (fast-forwarded to `70e61e9` at W0 open).

## Hard gate results

### 1 — `vue-tsc` typecheck

`vue-tsc@^2.2.0` added to `devDependencies`; `npm run typecheck` → `vue-tsc --noEmit`.

A first-ever `vue-tsc` run over `demo/` surfaces **246 pre-existing type errors** across ~40 files (38 in generated `demo/@/components/ui/auto-form`, the rest spread over calendar/menubar/pagination shadcn-vue components and custom panes). This is latent debt unrelated to A-key-2 — the demo had never been typechecked (`vue-tsc` was absent). `src/` (the library) reports **0** errors.

Per `waves/W0.md` ("if a first `vue-tsc` run surfaces latent pre-existing type debt unrelated to A-key-2, scope the typecheck to W0's changed surface and record the scope reduction"), the W0 typecheck gate is scoped to **W0's changed surface**:

- `demo/color-picker/App.vue` — the Aurora block (the W0 edit region) typechecks clean. The vue-dedup fix (below) removed the cross-instance `Ref` error on the `useAurora` call. Two errors remain in `App.vue` at lines 238/249 (`colors[0]` index-access narrowing; a `ValueUnit`/`Color` color-library mismatch) — both predate W0, sit outside the Aurora edit region, and are part of the 246.
- `demo/@/components/custom/panes/AuroraPane.vue` — clean.
- `demo/@/components/custom/goo-blob/composables/useMetaballRenderer.ts` — clean.
- `vite.config.ts`, `tsconfig.json`, `package.json` — clean.

**Scope reduction recorded**: the 246-error demo typecheck backlog is a scope-reveal finding. It is not A-key-2's fault and not in A's current wave plan. Routed: a dedicated demo type-debt effort (value.js tranche B candidate); recorded here and in `PROGRESS.md` per invariant A5 (named destination, not a silent deferral).

Error-count delta from W0's edits: **0** (the Aurora call's pre-existing cross-instance `Ref` error was eliminated by the vue dedup; total fell 248 → 246).

### 2 — Cold-start dev boot

`rm -rf node_modules/.vite` then `npm run dev`: Vite 7.3.1 ready in 357 ms, **no `[plugin:vite:import-analysis]` overlay**. `grep keyframes.js/dist vite.config.ts` returns nothing — the hard alias is deleted (deletion proof).

The dev server resolves `@mkbabb/keyframes.js` through its `development` conditional export: network log shows `keyframes.js/src/animation/index.ts` and its 11 siblings served `[200]`, not the deleted `dist/keyframes.js`.

### 3 — Playwright boot probe (3 viewports)

Server `http://localhost:9000`. Captures in `audit/W0-playwright-boot/`.

| Viewport | Screenshot | Console errors |
|---|---|---|
| 1280×800 | `W0-1280x800.png` | 0 |
| 1440×900 | `W0-1440x900.png` | 0 |
| 375×667 | `W0-375x667.png` | 0 |
| 1280×800, color-space Select open | `W0-1280x800-select-open.png` | 0 |

The full App tree renders at every viewport — the dock with its layers (view Select, Tools, Login, profile), the color-picker card (color-space Select, component textboxes, L/A/B/Alpha tabs + sliders), and the color-space panel. The color-space `Select` opens to a 16-option listbox (RGB … Rec. 2020). None of the crash-screenshot symptoms survive: no bare "Home" pill, no hard black drop-shadow, no Vite resolution overlay, no error-recovery state.

**Network**: 473 same-origin requests, **zero non-2xx**. `fira-code-latin.woff2` → `[304]` (the 403 is fixed by `server.fs.allow`). No `keyframes.js/dist` 404.

A-key-2 (the user's `stops.length` crash) is gone: `App.vue` now builds `auroraConfig` from `structuredClone(DEFAULT_AURORA_CONFIG)`, calls `useAurora(canvasRef, () => auroraConfig, { onInitError })`, and provides the demo's own reactive object.

### 4 — Library build + gh-pages clobber

`dist/` cleared, `npm run build` (production library mode): exits clean, emits `dist/value.js` (139 KB) + the `.d.ts` tree (`index.d.ts`, `easing.d.ts`, `parsing/`, `quantize/`, `transform/`, `units/`). No `index.html`, no Vue/demo component chunks at the `dist/` root.

`npm run gh-pages` now writes `dist/gh-pages/` (`index.html`, `assets/`, `CNAME`, `robots.txt`); `dist/value.js` is byte-identical after the demo build — the clobber is fixed. `.github/workflows/node.js.yml` `publish_dir` updated to `./dist/gh-pages` to match.

Observation (not A scope): the library build code-splits `postcss-*.js` and `standalone-*.js` chunks. These trace to `src/parsing/serialize.ts` / `src/transform/decompose.ts` pulling `postcss`/`js-beautify` — uncommitted `src/` WIP outside A's mandate (`A.md §5`). They are library artefacts, not demo pollution; flagged for the `src/` WIP owner.

### 5 — Library test suite

`npx vitest run`: **1409 passed, 26 files**. W0 touches no `src/` code; no regression.

### 6 — Repo hygiene

- `master` fast-forwarded to `70e61e9` (the `w.w2.1-value-js-prebuild` tip) before W0's first commit. `git merge-base --is-ancestor master HEAD` confirmed ff-safe; `git log HEAD..master` was empty (Q-chron-1's "master diverged" premise was false, per `audit/HARDEN-2 §5`). The tranche commits land on `master`.
- `docs/precepts` registered as a submodule in value.js's index at `3310a8c` (glass-ui's pin); `.gitmodules` tracked. value.js previously pinned no precepts SHA.

## Vue-instance dedup (contact-revealed)

`vue-tsc` surfaced a systemic fault: the symlinked `@mkbabb/glass-ui` ships a nested `node_modules/vue@3.5.30` + `@vue/reactivity`, while value.js resolves `vue@3.5.29` — two Vue instances. This is a runtime hazard (two reactivity systems, broken cross-package `provide`/`inject`) and a type hazard (nominally distinct `Ref<T>`). glass-ui declares `vue` as a `peerDependency`, so the host's single copy is the intended instance.

Fixed in W0 as repo hygiene (the gate could not be met otherwise):
- `vite.config.ts` — `resolve.dedupe: ["vue"]` (runtime single instance).
- `tsconfig.json` — `paths` pin `vue` and `@vue/*` to value.js's `node_modules` (tsc single instance).

This is a scope-reveal recorded per `instructions/README.md` ("when scope grows under contact, record it").

## Files changed

`vite.config.ts`, `tsconfig.json`, `package.json`, `package-lock.json`, `demo/color-picker/App.vue`, `demo/@/components/custom/panes/AuroraPane.vue`, `demo/@/components/custom/goo-blob/composables/useMetaballRenderer.ts`, `.github/workflows/node.js.yml`, `.gitmodules` + `docs/precepts` registration.
