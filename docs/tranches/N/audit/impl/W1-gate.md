# N.W1-GATE — The boot-truth verification gate

**Lane:** W1-GATE · **Branch:** tranche-f-handoff · **Date:** 2026-06-11
**Role:** Verify the four boot-truth gates after the W1.A (import re-aliases) and W1.C
(mechanism-C remainder) Fix lanes. NO ownership writes of my own — verification only, with a
narrow corrective mandate (the 3 demo .vue files, `vite.config.ts`, `scripts/`, `package.json`).

**Verdict: BLOCKED on an upstream glass-ui dist-build defect.** Gates 1–3 (typecheck, lint,
build) are GREEN. Gate 4 (cold-cache boot-smoke) FAILS: the demo white-screens behind a Vite
error overlay caused by **a single dangling CSS `@import` that glass-ui's build never emits to
its dist** — outside both my ownership set and the Fix lanes' owned files. This is the W1
precondition being **structurally unsatisfiable from value.js**, exactly as W1.C's report warned
(and sharper: a clean glass-ui rebuild does NOT produce the missing file).

---

## Precondition verified first

- Local `file:../glass-ui` dist is **dts-complete**: `find dist -name '*.d.ts' | wc -l` = **551**
  (unchanged before and after a clean rebuild). This satisfies the *typecheck* half of the W1
  precondition (74 of the original HEAD-91 errors were its absence).
- glass-ui sibling at `/Users/mkbabb/Programming/glass-ui`, version **3.10.1**, HEAD `b8d74de7`.
  `node_modules/@mkbabb/glass-ui` is a symlink → `../../../glass-ui` (so its `dist/` IS the
  sibling's own `dist/`).

---

## Gate results

### 1) `npm run typecheck` → **PASS (0 errors)**

```
> vue-tsc -p tsconfig.lib.json --noEmit && vue-tsc -p tsconfig.demo.json --noEmit
```
Exit 0, zero diagnostic output. (W1.C's plain-direct `vue-tsc` gate; the `check-types.mjs`
foreign-error filter is deleted and `customConditions:["development"]` removed from
`tsconfig.demo.json` — both confirmed gone.) The W1.A import re-aliases
(`GlassCarousel`/`GlassCarouselItem` → `role="tablist"` rail; `BouncyTabs` → `SegmentedTabs` ×2)
resolve cleanly against the dts-complete dist.

### 2) `npm run lint` → **PASS (exit 0)**

```
> eslint . --max-warnings=0
=== LINT EXIT: 0 ===
```

### 3) `npm run build` → **PASS (green, library)**

```
> vite build --mode production
✓ 43 modules transformed.
[vite:dts] Declaration files built in 965ms.
dist/standalone-DlyrSOeX.js  113.55 kB │ gzip: 36.14 kB
dist/value.js                129.24 kB │ gzip: 39.82 kB
dist/postcss-CWmVrHvs.js     197.29 kB │ gzip: 47.11 kB
✓ built in 1.07s
=== BUILD EXIT: 0 ===
```

### 4) Cold-cache boot-smoke → **FAIL (mount OK, but 4 console 500-errors; Vite overlay white-screens the UI)**

Procedure (per the lane spec):
1. `rm -rf node_modules/.vite demo/color-picker/node_modules/.vite` (cold dep-optimizer cache).
2. `npx vite --force --port 9377 --strictPort` (forced re-bundle, unique port; demo root is
   `demo/color-picker/` per `vite.config.ts:250`). Server came up: `VITE v8.0.16 ready in 389 ms`.
3. Headless-Chromium playwright probe (`playwright@1.60.0`, installed): `goto http://localhost:9377/`,
   `waitForSelector("#app > *")` (App.vue mounts into `<body id="app">`), settle 2.5s, collect all
   console errors/warnings + pageerrors.

Probe JSON:
```json
{
  "mounted": true,
  "mountDetail": "#app child elements: 1",
  "consoleErrorCount": 4,
  "consoleWarningCount": 0,
  "pageErrorCount": 0,
  "consoleErrors": [
    "Failed to load resource: the server responded with a status of 500 (Internal Server Error)",
    "... (×4, all the same CSS module 500)"
  ]
}
GATE_RESULT: FAIL
```

A full-page screenshot (`/tmp/w1gate-boot.png`) shows the actual user-facing state: a Vite
error overlay, NOT the color picker. The overlay reads verbatim:
```
[plugin:vite:css] [postcss] ENOENT: no such file or directory, open
'../components/custom/tabs/segmented-tabs.css'
/Users/mkbabb/Programming/value.js/demo/@/styles/style.css:undefined:null
```

The gate requires **mount AND zero console errors**. Mount technically succeeds (1 child node),
but the four 500s + the white-screening overlay fail the gate. The boot-truth gate worked
exactly as inv-N-10 designed: the cold-cache boot-smoke caught a CSS abrogation that typecheck,
lint, and build are all structurally blind to.

---

## Root cause (single, definitive, upstream)

**glass-ui's build does not copy component-colocated CSS into `dist/`.**

1. glass-ui authors `src/styles/index.css:148`:
   `@import "../components/custom/tabs/segmented-tabs.css"`. In `src/`, that path resolves —
   `src/components/custom/tabs/segmented-tabs.css` exists (272 LoC, the SegmentedTabs track/chrome
   choreography carved out of the SFC).
2. glass-ui's `npm run build` (`vite build && npm run emit-types`) copies `src/styles/index.css`
   → `dist/styles/index.css` **verbatim** (line 148's `@import` survives), but emits **zero**
   `.css` files under `dist/components/` (`find dist/components -name '*.css' | wc -l` = **0**).
   So `dist/styles/index.css:148` dangles on a file the build never produced.
3. I ran a **clean** `cd ../glass-ui && npm run build` (exit 0, 551 d.ts intact, 61 dist css
   files) — the missing `dist/components/custom/tabs/segmented-tabs.css` **still does not appear**.
   The W1.C-flagged precondition ask ("a clean rebuild emits the missing CSS") is therefore
   **false**: the file is structurally absent from glass-ui's build output, not merely stale.
4. The bundled `dist/glass-ui.css` (the `./styles.css` export, demo `style.css:24`) **also lacks**
   the segmented-tabs rules entirely (`grep -c segmented-tabs dist/glass-ui.css` = **0**). So
   **neither** glass-ui CSS export ships the segmented-tabs styling — `./styles` (raw barrel)
   dangles → 500s; `./styles.css` (bundle) silently omits the rules.

There is exactly **ONE** missing module across the entire boot (`grep -oE "Can't resolve '[^']+'"`
→ a single distinct entry). It cascades to every Vue SFC that imports the demo's `style.css`
(App, ColorPicker, Dock, ActionBarLayer, …) because Tailwind/postcss re-evaluates the `@import`
chain per-SFC `<style>` block — hence the multiplied error lines, one root.

The demo's exports map (`@mkbabb/glass-ui/styles` → `dist/styles/index.css`,
`@mkbabb/glass-ui/styles.css` → `dist/glass-ui.css`) is consumed at `demo/@/styles/style.css:23-24`.

---

## Why this is BLOCKED, not a corrective edit

Per the lane rules ("If something larger is wrong, status=blocked with precise diagnosis"):

- **glass-ui is READ-ONLY** (sibling repo). The fix is in glass-ui's build — either copy
  `src/components/**/*.css` into `dist/components/**`, or inline the component CSS into the
  bundled outputs so both exports are self-sufficient.
- **The demo consume-site is `demo/@/styles/style.css:23`** — NOT in my ownership set (3 demo
  .vue files, `vite.config.ts`, `scripts/`, `package.json`). Editing it (e.g. dropping the raw
  `./styles` import, or `@import`-ing a value.js-local copy of segmented-tabs.css) would be a
  **workaround masking an upstream defect** — against the standing NO-workarounds mandate, and
  outside my authority regardless.
- **It is NOT a Fix-lane residue.** The W1.A SegmentedTabs *rename* is correct (typecheck-clean,
  the component resolves). The defect is a missing CSS *copy* in glass-ui's own dist, independent
  of the value.js consumer code. There is no missed import or stale symbol in the 3 owned .vue
  files, `vite.config.ts`, `scripts/`, or `package.json` to correct.

I considered and **rejected** a `vite.config.ts` alias to redirect the dangling path — it is my
authority, but it would be a workaround that papers over an upstream build defect, and it would
re-introduce exactly the "silent CSS" failure mode inv-N-10 exists to defeat. The honest gate
result is BLOCKED with the upstream fix named.

---

## The required unblock (glass-ui-owned ask)

One of, in glass-ui's build:
- **(preferred)** make `dist/glass-ui.css` (the `./styles.css` bundle) self-sufficient — inline
  the segmented-tabs component CSS so the compiled export carries it (it currently drops it);
  AND/OR copy `src/components/**/*.css` → `dist/components/**` so the `./styles` raw barrel's
  `@import "../components/custom/tabs/segmented-tabs.css"` resolves at the consumer.
- This is the §8 cohort-coordination class ("keep the dist self-sufficient at every cut"). It
  belongs in glass-ui's arm, paired-authored.

After glass-ui ships the fix and the local dist is re-linked, **re-run this exact gate** — gates
1–3 will stay green; gate 4 should then mount console-clean. The probe script and procedure above
are reproducible verbatim.

**Precondition correction for N.md §4 / W1 row:** the precondition "dts-complete glass-ui dist
(one clean sibling rebuild)" is **insufficient**. It must read "dts-complete AND CSS-self-sufficient
glass-ui dist" — and crucially, the CSS half is NOT achievable by a clean rebuild of the current
glass-ui HEAD (`b8d74de7`/3.10.1); it requires a glass-ui build-step fix first. W1.C anticipated
the widening; this gate proves the rebuild alone does not satisfy it.

---

## e2e (gate spec item D, "green baseline")

NOT run. The e2e baseline is downstream of the boot-smoke (the suite drives the same demo app);
with the demo white-screening on a clean server, e2e would fail for the identical single cause.
Running it would add no diagnostic signal beyond the boot-smoke already captured, and would burn
~minutes on a known-blocked substrate. It should be run as the confirmation step *after* the
glass-ui CSS fix lands, alongside the boot-smoke re-run.

---

## Files touched

**None.** This is a verification lane; the blocked outcome required no corrective edit within my
ownership (the defect is upstream). Temp probe artifacts (`/tmp/w1gate-*.{mjs,png,log}` and the
two transient `w1gate-*.mjs` copied into the project dir for `playwright` module resolution) were
removed; `git status` confirms zero stray tracked files from this lane.

---

## Every gate command run + observed output (audit trail)

| # | Command | Result |
|---|---|---|
| pre | `find node_modules/@mkbabb/glass-ui/dist -name '*.d.ts' \| wc -l` | 551 (dts-complete) |
| 1 | `npm run typecheck` | exit 0, **0 errors** |
| 2 | `npm run lint` | exit 0 |
| 3 | `npm run build` | exit 0, green (`dist/value.js` 129.24 kB) |
| 4a | `rm -rf node_modules/.vite demo/color-picker/node_modules/.vite` | cleared (cold cache) |
| 4b | `npx vite --force --port 9377 --strictPort` | `VITE v8.0.16 ready in 389 ms`; log shows the segmented-tabs.css resolve error |
| 4c | playwright probe (`#app > *` mount + console capture) | mounted=true (1 child), **4 console 500-errors**, GATE_RESULT: FAIL |
| 4d | screenshot `/tmp/w1gate-boot.png` | Vite error overlay (segmented-tabs.css ENOENT @ `demo/@/styles/style.css`) — UI white-screened |
| rc | `find dist/components -name '*.css' \| wc -l` (glass-ui) | **0** (no component CSS in dist) |
| rc | `cd ../glass-ui && npm run build` (clean rebuild) | exit 0; segmented-tabs.css **still absent** from dist |
| rc | `grep -c segmented-tabs dist/glass-ui.css` (glass-ui) | **0** (bundle also omits it) |
| rc | `grep -oE "Can't resolve '[^']+'" w1gate-vite.log \| sort -u` | a **single** missing module (one root cause) |
