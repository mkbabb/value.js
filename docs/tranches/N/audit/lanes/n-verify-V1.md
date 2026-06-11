# LANE V1 — glass-ui cohort ground truth (VERIFIED with primary evidence)

Date: 2026-06-11 · value.js HEAD `0cb5dd2` branch `tranche-f-handoff`
Method: registry (`npm view`), tarball (`npm pack` 3.12.0), local tree reads, clean vite boot on :9451.

Note: NO prior `/tmp/n-audit-*.md` files existed; settled everything from PRIMARY evidence.

---

## (a) REGISTRY — `@mkbabb/glass-ui@3.12.0` (latest dist-tag)

`npm view @mkbabb/glass-ui dist-tags` → `{ latest: '3.12.0' }`. Versions tail: …3.11.0, 3.11.1, 3.11.2, **3.12.0**.

**Exports map (verbatim from registry):**
- `./aurora` → PRESENT (`dist/aurora.js`)
- `./dock` → PRESENT (`dist/dock.js`)
- `./carousel` → PRESENT (`dist/carousel.js`)
- `./goo-blob` → PRESENT (`dist/goo-blob.js`)
- `./watercolor-dot` → PRESENT (`dist/watercolor-dot.js`)
- `./tabs` → PRESENT (`dist/tabs.js`)
- **`./glass-carousel` → ABSENT.** No such subpath exists in any glass-ui version.

**Tarball CSS (`npm pack @mkbabb/glass-ui@3.12.0`, extracted):**
- `package/dist/styles/index.css` is **146 lines, CLEAN**. NO `@import "...segmented-tabs.css"` (grep count = 0). It ends with `@import "./components.css";` then `@source "../components";`.
- `segmented-tabs.css` is NOT shipped as a standalone file in the tarball (intentional — not imported).
- The segmented-tabs SFC styles ARE folded into `package/dist/glass-ui.css` (the scoped surface; grep count = 1). So the published 3.12.0 has **NO dangling @import** — the segmented-tabs.css ENOENT is NOT a registry/published defect.

**`deriveAurora` in published 3.12.0 dist:** PRESENT. `package/dist/aurora.js` export list includes `R as deriveAurora` (also `Aurora`, `useAurora`, `DEFAULT_AURORA_CONFIG`, `createAurora`, `cssToOklch`, etc.). `aurora.d.ts` = `export * from "./components/custom/aurora"`.

**`./tabs` exports (BOTH 3.12.0 and local 3.10.1):** the barrel emits **`SegmentedTabs`** only (`export { I as SegmentedTabs }` in 3.12.0; `export { L as SegmentedTabs }` local). **`BouncyTabs` is NOT exported** by either. `tabs.d.ts` = `export * from "./components/custom/tabs"`, whose index.d.ts exports `{ default as SegmentedTabs }`.

---

## (b) LOCAL — `/Users/mkbabb/Programming/glass-ui`

- Branch: **`tranche/AY`** · HEAD `58c4265a` · `package.json` version **`3.10.1`** (NOT 3.12.0).
- Dirty: `docs/precepts` modified + untracked AZ reflect scripts/specs (no dist changes staged).
- `dist/styles/index.css` line 148 RIGHT NOW: **`@import "../components/custom/tabs/segmented-tabs.css";`** (grep confirms line 148).
- `dist/components/custom/tabs/segmented-tabs.css` **DOES NOT EXIST** right now. Sampled ABSENT 4× over ~8s — persistently absent in the current dist (not a transient mid-second flap; the dist is in a broken/stale state).
- The glass-ui **SOURCE** still has both: `src/styles/index.css:148` references segmented-tabs.css AND `src/components/custom/tabs/segmented-tabs.css` exists. So a *complete* build emits it; the published 3.12.0 instead dropped the @import (carve to `@source`).

**Flap mechanism (explained):** glass-ui has a live `build:watch` running (PID 31281 `vite build --watch`) plus foreign dev servers (PID 32597 :5199, 32662 :5210). The watch rebuilds emit `dist/styles/index.css` (which carries the old `@import segmented-tabs.css` line because local HEAD is the 3.10.x lineage that still imports it) but the per-component CSS copy/emit of `segmented-tabs.css` lags or is skipped → ENOENT window. Earlier lanes that saw the file present caught a moment after a full emit; lanes that saw ENOENT (and the current state) caught the index.css-emitted-but-component-css-missing window. The local dist is the 3.10.x mechanism (import present); the 3.12.0 mechanism (no import) is registry-only.

---

## (c) PEER RANGES (registry 3.12.0 AND local HEAD agree)

`peerDependencies` (identical at registry 3.12.0 and local `tranche/AY` HEAD):
- `@mkbabb/value.js`: **`^0.10.0 || ^0.11.0`** — value.js 0.11.2 SATISFIES.
- `@mkbabb/keyframes.js`: `^2.2.0 || ^3.0.0 || ^4.0.0`
- `@mkbabb/pencil-boil`: **`^0.4.1`** (NEW peer — present at registry 3.12.0)
- `perfect-freehand`: **`^1.2.3`** (NEW peer — present at registry 3.12.0)

`devDependencies` (registry 3.12.0): `@mkbabb/value.js: ^0.10.0`, `@mkbabb/keyframes.js: ^2.2.0`, `@mkbabb/pencil-boil: ^0.4.1`, reka-ui `^2.9.7`, vite `^8.0.13`, vue `^3.5.34`.

Note: local `tranche/AY` package.json lists value.js peer `^0.10.0 || ^0.11.0` but does NOT yet list pencil-boil/perfect-freehand as peers (those landed in the 3.11.x/3.12.0 lineage that the local AY branch predates). Registry 3.12.0 has them.

---

## (d) LINEAGE — the stale-publish discovery (quoted verbatim)

Commit **`636adeae`** (glass-ui, "Mike Babb <mike7400@gmail.com>", Thu Jun 11 11:33:33 2026):
> "THE LINEAGE DISCOVERY: the registry 3.11.x/3.12.0 are stale-lineage publishes (pre-prune, no underline) — the cut moves to 3.13.0 with the full lineage map flagged at the cut"

So the registry `latest=3.12.0` is a STALE pre-prune artifact per glass-ui's own authoring; the *intended* clean cut is **3.13.0** (not yet published — registry tail tops out at 3.12.0).

**Pin-strategy verdict:** HOLD `file:../glass-ui` until 3.13.0 publishes. Pinning `^3.12.0` now would (1) consume a self-declared stale-lineage publish, and (2) NOT fix the value.js demo's `glass-carousel`/`BouncyTabs` import breaks (those are value.js-side bugs — see (e); they fail against 3.12.0 too). The right move is value.js-side: fix the two broken imports (see (e)); the glass-ui pin is orthogonal and should wait for 3.13.0.

---

## (e) FINAL VERDICT — what breaks the value.js demo boot on a CLEAN server

Booted a fresh `vite` from project root on **:9451** (`--strictPort`). The demo dep-scan FAILS immediately. Two distinct fatals, both from the value.js tree (not glass-ui-version-dependent — they fail against BOTH local 3.10.1 and registry 3.12.0):

**FATAL #1 (first, halts dep pre-bundle) — the glass-carousel import.**
Precise first error (verbatim from :9451 boot log):
```
Error: "./glass-carousel" is not exported under the conditions
["module", "browser", "development", "import"] from package
.../node_modules/@mkbabb/glass-ui (see exports field in .../package.json)
```
Source: `demo/@/components/custom/color-picker/controls/ComponentSliders.vue:117`
```
import { GlassCarousel, GlassCarouselItem } from "@mkbabb/glass-ui/glass-carousel";
```
NO glass-ui version exports `./glass-carousel`. The correct subpath is `./carousel`, and even that exports `Carousel`/`CarouselItem`/`GlassCarouselPager` — **NOT** `GlassCarousel`/`GlassCarouselItem`. Both the subpath AND the symbol names are wrong. This is the FIRST fatal that blocks boot.

**FATAL #2 (CSS, postcss) — the segmented-tabs.css dangling @import.**
Triggered by `demo/@/styles/style.css:23` `@import "@mkbabb/glass-ui/styles"` → resolves (via the `file:../glass-ui` symlink) to local `dist/styles/index.css:148` → dangling `@import "../components/custom/tabs/segmented-tabs.css"` → file absent. Verbatim from :9451 log:
```
[postcss] ENOENT: no such file or directory, open '../components/custom/tabs/segmented-tabs.css'
  Plugin: vite:css
  File: .../demo/@/styles/style.css
Unable to resolve `@import "../components/custom/tabs/segmented-tabs.css"`
  from /Users/mkbabb/Programming/glass-ui/dist/styles
```
This is a LOCAL-DIST defect (the stale 3.10.x dist with the @import but no emitted file). It would NOT occur against published 3.12.0 (clean CSS). It surfaces second because dep-scan (#1) aborts before CSS pre-transform; once #1 is fixed, #2 becomes the boot blocker on the current local symlink.

**LATENT #3 (not a boot-blocker; runtime undefined) — BouncyTabs.**
`demo/@/components/custom/mix/MixSourceSelector.vue:4` and `demo/@/components/custom/panes/PaneSegmentedControl.vue:18` both:
```
import { BouncyTabs } from "@mkbabb/glass-ui/tabs";
```
The `/tabs` subpath resolves, but `BouncyTabs` is NOT an exported symbol (only `SegmentedTabs`). This is a named-import-undefined → a render-time failure of those panes, not a dep-scan/boot fatal. The component was evidently renamed `BouncyTabs → SegmentedTabs` in glass-ui and value.js was not migrated.

### Settled summary
- The demo does NOT boot on a clean server. The precise FIRST fatal is the `./glass-carousel` export error (ComponentSliders.vue:117). The SECOND (once #1 fixed) is the segmented-tabs.css CSS ENOENT (local-dist-only). The THIRD (latent runtime) is `BouncyTabs` not being exported (2 sites).
- glass-ui itself is NOT the root cause of #1/#3 — those are stale value.js imports against renamed/removed glass-ui surfaces. #2 is a stale-local-dist artifact, clean in published 3.12.0.
- The required value.js fix: `glass-carousel`→`carousel` + `GlassCarousel`/`GlassCarouselItem`→`Carousel`/`CarouselItem`; `BouncyTabs`→`SegmentedTabs` (2 sites). Glass-ui pin should stay `file:../glass-ui` and migrate to **3.13.0** (the clean cut) when it publishes, not `^3.12.0` (self-declared stale lineage).
