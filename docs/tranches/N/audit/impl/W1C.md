# N.W1.C — the mechanism-C remainder (impl lane report)

**Lane**: N.W1.C · **Date**: 2026-06-11 · **Branch**: `tranche-f-handoff`
**Ownership**: `vite.config.ts` · `scripts/check-types.mjs` (deleted) · `scripts/dev.sh` ·
`package.json` · `package-lock.json` · `tsconfig.demo.json` (the demo-program half of the
resolution mechanism — see §"Ownership note" below).
**Mandate**: the K.W2.5 mechanism-C remainder (dist-resolution + `build:watch`) — A3 is the
authoritative site census; the path-forward `path-forward-2026-06-03-postW2.md` defines mechanism-C.

---

## §0 — One-paragraph outcome

Mechanism-C is now fully wired on value.js's side: the demo resolves glass-ui from its published
`dist/` everywhere (the abrogated `development` source-resolution condition is gone from glass-ui's
`exports` map upstream, so the demo program's `customConditions:["development"]` was inert and is
removed), the `@mkbabb/value.js` self-alias points at value.js's own `dist/value.js` (not `src/`),
the value.js-scoped foreign-error filter `scripts/check-types.mjs` is deleted and `typecheck` is a
plain direct `vue-tsc -p` gate (both leaves), `dev.sh` watch-builds glass-ui's dist + value.js's own
dist during co-development, and `reka-ui` declares the honest `^2.9` with a refreshed lockfile.
**Two of the three gates pass green** (typecheck, build). **`npm run gh-pages` is BLOCKED on an
upstream glass-ui dist-CSS-incompleteness** (a missing `segmented-tabs.css` in glass-ui's gitignored
`dist/`), which is pre-existing (fails identically at baseline, before any of my edits), READ-ONLY to
this lane (sibling repo), and outside my touchable file set — recorded in §"Precondition blocker".

---

## §1 — What I did (the 4 items)

### Item 1 — self-alias → dist resolution (mechanism-C)

`vite.config.ts:44` — `"@mkbabb/value.js"` alias repointed
`path.resolve(import.meta.dirname, "src/index.ts")` → `"dist/value.js"`.

**Why it is load-bearing (not deletable):** glass-ui's published `dist/` imports the value.js core by
the bare `@mkbabb/value.js` specifier (verified: `node_modules/@mkbabb/glass-ui/dist/aurora.js`,
`color-CUYeFbgd.js`, `motion-curves.js`, `underline.js` each `import { … } from "@mkbabb/value.js"`).
A package never installs itself, so there is no `node_modules/@mkbabb/value.js` to walk up to — the
alias is mandatory. Under mechanism-C it points at value.js's OWN published surface (`dist/value.js`),
so the whole graph consumes one consistent published value.js (the demo's own `@src` imports plus
glass-ui's `@mkbabb/value.js` imports both land on the library; dist for glass-ui's hop).

Mirrored in `tsconfig.demo.json` (`paths["@mkbabb/value.js"] = ["./dist/index.d.ts"]`, the type
surface) for type-resolution honesty.

### Item 2 — retire the band-aids, restore the plain direct typecheck

- **`scripts/check-types.mjs` DELETED.** It was the value.js-scoped foreign-error filter that
  excluded glass-ui-internal diagnostics — needed ONLY because the demo program source-resolved
  glass-ui (pulling glass-ui's `src/.ts` into the program, which has no `.d.ts` trust boundary to
  skip-check). Under dist-resolution glass-ui resolves to its `dist/.d.ts`, which `skipLibCheck`
  (tsconfig.base.json) skips — so the demo program reports **zero** glass-ui-internal diagnostics and
  the filter is dead weight. Proven: `vue-tsc -p tsconfig.demo.json --noEmit` reports 0 total errors;
  `--explainFiles` shows glass-ui resolving exclusively from `glass-ui/dist/*.d.ts` (zero
  `glass-ui/src/*.ts` refs — no source-resolution leak).
- **`package.json` `typecheck` script** → `vue-tsc -p tsconfig.lib.json --noEmit && vue-tsc -p
  tsconfig.demo.json --noEmit` (the plain direct two-leaf gate; no script indirection, no filter).
- **`tsconfig.demo.json`** — removed `customConditions:["development"]` (inert since glass-ui's
  exports has no `development` key upstream) and rewrote the now-false "error-scoping contract"
  comment to describe the dist trust boundary. This file is the demo-program counterpart of
  vite.config.ts's resolution; the plain direct gate (item 2) is impossible without it (the
  `development` condition was the source-resolution mechanism the deleted filter compensated for —
  the two are a coupled pair).
- **`resolve.dedupe` KEPT (load-bearing — judgment-rule exception, documented in the file).**
  glass-ui's `dist/` externalizes `vue` + `reka-ui` (imports them by bare specifier) AND its
  symlinked package ships its OWN nested `vue`/`reka-ui` under `node_modules` (verified:
  `node_modules/@mkbabb/glass-ui/node_modules/reka-ui` exists; 31 dist files `import … from
  "reka-ui"`). Without dedupe those externalized imports resolve to glass-ui's NESTED copies while
  the demo's own imports resolve to the host copies → two Vue reactivity systems + two reka-ui
  instances (the Teleport `insertBefore` crash). Dedupe is therefore the half that MAKES
  dist-resolution single-instance — it is NOT a source-resolution band-aid. A3 lists it under
  "band-aids," but the judgment rule ("keep anything load-bearing for the gh-pages/lib builds, and
  say why") governs: removing it would two-instance the gh-pages build. Comment updated in-file to
  state this.
- **`server.fs.allow` widening KEPT (load-bearing — documented).** It exists for FONT-ASSET
  resolution off glass-ui's Tailwind-source `./styles` surface (the `@font-face url("../fonts/…
  woff2")` refs walk out of the symlinked package into glass-ui's repo-root `fonts/`). It was already
  NARROWED at E.W0 to only the font-asset half (the SFC-scoped component-CSS half closed then). It is
  not a source-resolution artefact; comment updated.

### Item 3 — `dev.sh` sibling watch-builds (`SIBLING_WATCH_BUILDS=(../glass-ui)`)

`scripts/dev.sh:37` was `SIBLING_WATCH_BUILDS=()` with the comment "value.js is the root publisher;
no on-disk @mkbabb siblings" — the OPPOSITE of mechanism-C. Now:

- `SIBLING_WATCH_BUILDS=("../glass-ui:dist/glass-ui.js")` (the `<repo-dir>:<dist entry artefact>`
  form; artefact = glass-ui's `exports["."].import`), plus `SIBLING_FIRST_PASS_TIMEOUT_S=120` and
  `WATCH_BUILD_GATE_TARGETS=()`.
- Ported the canonical `ensure_sibling_watch_builds()` + `wait_sibling_first_pass()` facility from the
  constellation standard (`../speedtest/scripts/dev.sh`, the only repo defining it; fourier references
  it with an empty array). Cold-checkout one-shot build, `build:watch` spawn under `track`, first-pass
  mtime gate so vite never paints a half-written dist.
- Added `start_self_watch_build()` — value.js's OWN `dist/value.js` is consumed by glass-ui's dist via
  the self-alias (item 1), so it must stay fresh too. value.js is the root publisher (not a sibling of
  itself), so its watch is started directly, not through `SIBLING_WATCH_BUILDS`.
- Wired into `cmd_up()`: `start_self_watch_build` + `ensure_sibling_watch_builds` before the backend,
  `wait_sibling_first_pass` before `start_frontend` (mirrors the existing "wait for backend port to
  bind before starting frontend" gate). `bash -n` syntax-clean; bash-3.2-safe `${arr[@]+…}` guards.

### Item 4 — `reka-ui ^2.0.0 → ^2.9` + lockfile refresh

- `package.json:95` devDependency `reka-ui` `^2.0.0` → `^2.9` (the lockfile already resolves 2.9.9;
  the declaration is now honest).
- `npm install --ignore-scripts` (the minimal form — `--ignore-scripts` to avoid the `prepare` rebuild
  side-effect): tree was `up to date`; lockfile now records `root.devDependencies.reka-ui = "^2.9"`
  (resolved 2.9.9 at top level). The install also refreshed the lockfile's stale `file:`-linked
  sibling metadata (glass-ui 3.3.0→3.10.1, keyframes peer ranges) to match the actual on-disk
  symlinked siblings — honest lockfile truth, not a pin change (the demo still consumes
  `file:../glass-ui`).

---

## §2 — Gates run + observed output

| Gate | Command | Result |
|---|---|---|
| typecheck | `npm run typecheck` | **EXIT 0** — green. lib program 0 errors, demo program 0 errors. (`--explainFiles` confirms glass-ui resolves from `dist/*.d.ts` only — no source-resolution leak; the deleted filter was genuinely unnecessary.) |
| build (lib) | `npm run build` | **green** — `✓ built in 604ms`; `dist/value.js 128.02 kB`, dts emitted. |
| gh-pages | `npm run gh-pages` | **BLOCKED — upstream glass-ui dist-CSS-incompleteness** (NOT my changes; see §3). |
| lint (sanity) | `npm run lint` | **EXIT 0** — green (no hygiene regression from my edits). |

Baseline (before any edits) for comparison:
- `npm run typecheck` (old `check-types.mjs`): 3 value.js errors — the known W1.A boot-break imports
  (`ComponentSliders` carousel, 2× `BouncyTabs`). W1.A fixed these concurrently; the post-change gate
  is 0.
- `npm run build`: green at baseline (library never touches glass-ui — inv-K-1).
- `npm run gh-pages`: **RED at baseline** with the identical `segmented-tabs.css` resolution error —
  confirming the gh-pages block is pre-existing and independent of this lane.

---

## §3 — Precondition blocker: glass-ui dist CSS incompleteness (gh-pages gate)

`npm run gh-pages` fails in PostCSS/Tailwind with:

```
CssSyntaxError: [postcss] tailwindcss: …ConfigSliderPane.vue?…lang.css:1:1:
  Can't resolve '../components/custom/tabs/segmented-tabs.css'
  in '/Users/mkbabb/Programming/glass-ui/dist/styles'
```

**Root cause (traced, conclusive):**
- `demo/@/styles/style.css:23` → `@import "@mkbabb/glass-ui/styles"` → glass-ui's
  `dist/styles/index.css`.
- `dist/styles/index.css:148` → `@import "../components/custom/tabs/segmented-tabs.css"` → resolves to
  `dist/components/custom/tabs/segmented-tabs.css`.
- That directory exists in glass-ui's dist but contains **only `.d.ts` files** (`SegmentedTabs.vue.d.ts`,
  `index.d.ts`, …) — the `segmented-tabs.css` was **not emitted to dist** by glass-ui's build. The file
  exists in glass-ui's `src/components/custom/tabs/segmented-tabs.css`.
- glass-ui's `dist/` is a **gitignored build artefact** (`git check-ignore` confirms): its current
  state is whatever the last local `npm run build`/`build:watch` produced. The dts cohort is complete
  (551 `.d.ts`, fresh today), but the **CSS** copy of the component stylesheets lagged — the
  `dist/styles/index.css` references a sibling CSS file the same build didn't copy.

**Disposition:** this is an upstream **glass-ui-owned** dist-build incompleteness (the CSS analogue of
the §8 C-DTS "dts-emitting `build:watch`" ask in `N.md` — glass-ui's watch keeps dts fresh but its CSS
component-copy is incomplete in the current snapshot). It is:
- **pre-existing** (fails identically at HEAD baseline, before any W1.C edit);
- **READ-ONLY to this lane** (`../glass-ui` is a sibling repo);
- **outside my touchable file set** (the fix is either glass-ui rebuilding its CSS dist completely, or
  the demo's `demo/@/styles/style.css` import surface changing — that file is W5/styling ownership, not
  W1.C).

**The W1 precondition needs widening.** `N.md §1` calls for "a dts-complete glass-ui dist (one clean
sibling rebuild)" as the W1 precondition. The dist is dts-complete but **css-incomplete**. The
precondition must be a fully clean glass-ui rebuild (JS + dts + **CSS component copy**), which is the
lead's to clear (a `cd ../glass-ui && npm run build` against a clean tree should emit
`dist/components/custom/tabs/segmented-tabs.css` and the gh-pages gate will then pass). My own
`dev.sh SIBLING_WATCH_BUILDS=(../glass-ui)` change (item 3) is precisely the dev-flow mechanism that
prevents this drift going forward — but a one-shot CI gh-pages gate depends on a pre-built complete
glass-ui dist.

My mechanism-C changes are orthogonal to this failure: the error is in PostCSS processing of
glass-ui's OWN dist `index.css` (an `@import` of a missing CSS file), entirely downstream of my JS
module-resolution changes (alias/dedupe/conditions affect JS resolution, not glass-ui's internal CSS
`@import` graph).

---

## §4 — Ownership note

`tsconfig.demo.json` is not literally in the named ownership list, but it is the demo-program half of
the resolution mechanism: the plain direct typecheck (item 2, explicitly assigned) is impossible
without removing its `customConditions:["development"]` (the source-resolution condition the deleted
`check-types.mjs` filter existed to compensate for — a coupled pair). Editing it is intrinsic to
"make the typecheck the plain direct gate." No file outside the mechanism-C resolution surface was
touched. Confirmed via `git status`: my diff is exactly `vite.config.ts`, `scripts/check-types.mjs`
(D), `scripts/dev.sh`, `package.json`, `package-lock.json`, `tsconfig.demo.json` (all other dirty
paths are concurrent sibling lanes — api/* = W2.A, demo/*.vue = W1.A, src/parsing/easing.ts = W7).

---

## §5 — CI follow-ups for W1.B (I did NOT touch `.github/**`)

- **`.github/workflows/ci.yml:64-72`** — the typecheck step COMMENT is now stale. It describes
  `npm run typecheck = node scripts/check-types.mjs`, "resolves glass-ui from source," and "excludes
  glass-ui-internal diagnostics." The STEP ITSELF is correct (`run: npm run typecheck` still works —
  I updated the script behind it). Only the comment needs updating to: "plain direct
  `vue-tsc -p tsconfig.{lib,demo}.json --noEmit`; glass-ui resolves from dist (`skipLibCheck` trust
  boundary), no foreign-error filter."
- **Boot-smoke / gh-pages CI**: whatever boot-smoke or gh-pages job W1.B adds will hit the §3 glass-ui
  dist-CSS-incompleteness unless the CI's glass-ui dist is a clean full rebuild (JS + dts + CSS). W1.B
  should ensure the CI glass-ui-build step (or the cohort precondition) runs glass-ui's full `build`,
  not a partial/cached dist.
- **`reka-ui ^2.9`**: if CI does `npm ci`, the refreshed lockfile is consistent (verified `npm ls
  reka-ui` resolves 2.9.9 top-level; the 7 nested refs are inside the symlinked siblings, collapsed by
  the vite `dedupe` at build/serve).

---

## §6 — Judgment-rule summary (what I retired vs kept, and why)

| Item (A3 "band-aid") | Disposition | Reason |
|---|---|---|
| `scripts/check-types.mjs` foreign-error filter | **DELETED** | Dist-resolution + `skipLibCheck` → 0 glass-ui-internal diagnostics; the filter is dead weight. Plain direct gate restored. |
| `tsconfig.demo.json` `customConditions:["development"]` | **DELETED** | The source-resolution mechanism; inert upstream (no `development` key in glass-ui exports). Required for the plain direct gate. |
| `@mkbabb/value.js` self-alias src→dist | **REPOINTED to dist** | Mechanism-C: one consistent published value.js surface; glass-ui's dist imports it. |
| `resolve.dedupe` (vue/reka family) | **KEPT** | Load-bearing: glass-ui's dist externalizes vue/reka but ships nested copies → without dedupe, two instances in the gh-pages build (Teleport crash). It is the half that MAKES dist-resolution single-instance. |
| `server.fs.allow` widening | **KEPT** | Load-bearing: font-asset walk off glass-ui's Tailwind-source `./styles` surface (already narrowed to font-only at E.W0). Not a source-resolution artefact. |
