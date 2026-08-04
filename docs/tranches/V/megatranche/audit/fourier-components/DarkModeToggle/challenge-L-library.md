claude-opus-5[1m]

# CHALLENGE — `DarkModeToggle.vue` · axis **L (LIBRARY)**

**Target** `fourier-analysis/web/src/components/layout/DarkModeToggle.vue` (109 lines)
**Date** 2026-08-04 · **Posture** component presumed DEFECTIVE until the tree proves otherwise; every
claim below carries its own falsifier and dies if the falsifier fires.
**Tooling** static + source-derived ONLY (no browser). Two claims are marked
`UNPROVEN-NEEDS-LIVE` for SS-13. `fourier-analysis` was read-only throughout; this file is the
single write.

**Verdict: DEFECTIVE — 3 BLOCKER / 5 MAJOR / 5 MINOR / 4 INFO (17 defects), 5 superlatives.**

The component is 109 lines of clean, readable Vue. That is the trap. Its *import graph* is the
single most expensive object on the fourier first-paint critical path: **~318 KB gzipped of eager
JavaScript on every route**, to draw an 80 px sun/moon glyph in the header. Nothing in the file
itself looks wrong; the whole cost is in what four `import` lines drag behind them.

---

## §0 — Files read whole (read-only)

| File | Why |
|---|---|
| `web/src/components/layout/DarkModeToggle.vue` (109) | target |
| `web/src/components/decorative/FourierMorphSvg.vue` (41) | direct import `:19` |
| `web/src/composables/useFourierMorph.ts` (230) | direct import `:20` |
| `web/src/lib/svg-fourier.ts` (154) | direct import `:21` |
| `web/src/lib/easings.ts` (transitive, via `useFourierMorph:21-27`) | the value.js seam |
| `web/src/assets/fourier-paths/{sun,moon}.json` (225 687 + 224 944 bytes) | direct imports `:23-24` |
| `web/src/App.vue`, `components/layout/AppHeader.vue`, `router/index.ts`, `lib/colors.ts`, `main.ts`, `vite.config.ts`, `src/style.css`, `tsconfig.json` | the eager graph + the viz-palette path |
| `node_modules/@mkbabb/glass-ui/dist/{dark.js,useGlobalDark-C28t0VWJ.js,dark.d.ts}`, `dist/styles/tokens/*` | `useGlobalDark` contract + `--viz-*` tokens |
| `node_modules/@mkbabb/keyframes.js/dist/{keyframes.js,engine-*.js,timeline-*.js}` | `loadAnimationEngine` / `Animation.play|stop` / RAF playback semantics |
| `node_modules/@vueuse/core/dist/index.js` | `useDark` / `useStorage` defaults |
| `web/dist/**` (build of 2026-06-12 — **stale**, used only as corroboration, never as sole basis) | measured chunk composition |

---

## §1 — BLOCKERS

### L-1 · BLOCKER · 450 KB of Fourier JSON sits in the **eager entry chunk**, and this component is its sole importer

**Provenance.**
`DarkModeToggle.vue:23-24` statically imports `sun.json` (225 687 B) + `moon.json` (224 944 B).
The eager chain is unbroken and lazy-boundary-free:
`main.ts:3` → `App.vue:6` (`import AppHeader`) → `AppHeader.vue:6` (`import DarkModeToggle from "./DarkModeToggle.vue"`) → `DarkModeToggle.vue:23-24`.
Every *route* is lazy (`router/index.ts:45,60,72,80,90,100,109` — seven `component: () => import(...)`);
the header is not.

**Measured in the built artifact** (`web/dist/assets/index-dWFIqpKn.js`, the entry chunk):

| | bytes | gzip |
|---|---|---|
| entry chunk total | 491 312 | 227 416 |
| the two Fourier blobs inside it | **≈ 449 770 (91.6 %)** | **≈ 211 552 (93 %)** |

Blob boundaries located by literal search: sun payload begins at offset 25 916
(`100.19999694824219`, = `sun.json` `original.x[0]`) and its assembled object literal
`r4={original:…,partial_sums:t4,…,n_eval:o4}` closes at 251 160; moon begins at 251 164
(`70.52755363279978` = `moon.json` `original.x[0]`) and closes at 475 690
(`v4={original:c4,…}` at 475 604, immediately followed by `g4=["aria-label"]` — the compiled
`DarkModeToggle` render function, which is the proof that these two blobs and this component
are the same module group).

**What is actually consumed.** `prepareFourierShape` (`svg-fourier.ts:76-88`) reads exactly two
fields: `data.levels` and `data.partial_sums`. `interpolateAtHarmonicLevel:129` reads
`shape.data.levels`. **Nothing** in the toggle's path ever touches `original`, `decomposition`,
`eval_points`, `n_harmonics`, `n_samples`, `n_eval` — measured at **17.6 % of each blob**
(`original` 8.8 % + `decomposition` 6.1 % + `eval_points` 2.7 %), i.e. ~79 KB shipped and parsed for
nothing, and retained forever because `prepareFourierShape:87` returns `{ data, pointsByLevel }`
— it keeps a hard reference to the *whole* parsed object.

**Failure scenario.** A first-time visitor landing on `/paper` (the default redirect,
`router/index.ts:40-43`) downloads, decompresses and JSON-parses 450 KB of 50-harmonic,
512-sample Fourier decompositions of a sun and a moon before the paper can render — to paint an
icon whose CSS box is `5rem` (`DarkModeToggle.vue:78-79`). At the toggle's own default
`lowLevel: 5 / highLevel: 50` (`useFourierMorph.ts:63-64`) only the level-5 and level-50
partial-sum rows are ever reachable from this component; the other **8 of 10** levels
(`levels: [1,2,3,5,8,12,18,25,35,50]`, 512 points each) are pure ballast — a further ~80 % of
`partial_sums`.

**Falsifier.** Rebuild and inspect the entry chunk. If `sun.json`/`moon.json` land in a
non-preloaded chunk (a `manualChunks` entry, `import.meta.glob`, a `fetch`, or the toggle moving
behind `defineAsyncComponent`), L-1 dies. Also dies if `AppHeader` is ever route-lazy. Neither
holds in the current tree: `vite.config.ts:51-59` names five `manualChunks` and none matches
`assets/fourier-paths/*`, and `App.vue:23` renders `<AppHeader />` unconditionally.
**Corroboration caveat:** the byte table is from the 2026-06-12 `dist/`. The *structural* claim
(static import from an eagerly-rendered component, no lazy boundary) is derived from the current
source and does not depend on that build.

---

### L-2 · BLOCKER · The lazy-engine boundary is real, correct, and **defeated one import later** — `value.js` (+ co-chunked `katex`, 348 KB) rides the eager graph solely because of this component

**Provenance.** `useFourierMorph.ts:33-36` carries an explicit, load-bearing comment:

> *"keyframes 2.2.0 moves the value.js-bearing `Animation` engine behind the `loadAnimationEngine()`
> dynamic boundary, **so value.js no longer rides the eager bundle — it loads on first morph**."*

**The tree says otherwise.** Twelve lines earlier, the same file statically imports
`@/lib/easings` (`useFourierMorph.ts:21-27`), and `lib/easings.ts:11` + `:16` statically import
`@mkbabb/value.js`. So value.js is pulled at module-evaluation time, on the eager path, by the very
file whose comment claims it isn't.

**Sole eager puller = this component.** Exhaustive enumeration of value.js importers
(`grep -rn "@mkbabb/value.js" web/src` → 5 hits, 4 files):

| importer | eager? |
|---|---|
| `components/equation/ConvergencePlot.vue` | no — under `/equation`, lazy (`router:90`) |
| `components/equation/composables/useCurveTransition.ts` | no — same subtree |
| `components/equation/lib/harmonics.ts` | no — same subtree |
| `lib/easings.ts:11,16` | **YES** |

and `lib/easings.ts`'s importers are exactly three (`grep -rn "lib/easings" web/src`):
`useMorphConfig.ts:18` (only `/morph`, lazy), `stores/animation.ts:7` (imported only by
`visualization/*` route components, all lazy), and `useFourierMorph.ts:27` — **eager, via
`DarkModeToggle.vue:20`**.

**The amplification.** `vite.config.ts:56` declares `"vendor-math": ["@mkbabb/value.js", "katex"]`.
Because the two are welded into one chunk, pulling value.js eagerly pulls **katex** eagerly too.
Measured: `dist/assets/vendor-math-gh38gzwU.js` = **348 707 B / 107 019 B gzip**, and it contains
KaTeX (`"KaTeX parse error"` ×1, `\operatorname` ×17, `\left` ×19, `\dfrac` ×2). It is
`modulepreload`ed from `dist/index.html` on every route, and the entry chunk imports its specifier
twice. katex's own importers are `visualization/EquationPanel.vue:13` and
`equation/EquationResult.vue:6` — **both lazy**. So katex reaches first paint by co-chunking alone.

**What it is all for.** `DEFAULT_MORPH_CONFIG` (`useFourierMorph.ts:65-67`) sets
`settleOutEasing / morphEasing / settleInEasing` to `"linear"`, and `DarkModeToggle.vue:37` calls
`useFourierMorph()` with **no options** — so the component never resolves anything but
`getEasingFn("linear")` → `timingFunctions.linear`. Verified live against the installed package
(value.js 0.13.0): `timingFunctions.linear(0.5) === 0.5`. **~318 KB gzipped of eager JS
(L-1's 211 + this chunk's 107) is on the critical path so that a header icon can obtain `t => t`.**

**Failure scenario.** Every visitor to `/paper` (default route, no math, no morph) pays for KaTeX's
full renderer and value.js's colour/unit engine before first contentful paint, on every cold load,
forever — and the code comment tells the next maintainer the opposite, so the cost is invisible to
inspection.

**Falsifier.** Delete the `@/lib/easings` import from `useFourierMorph.ts` (or inline `linear`) and
rebuild: if `vendor-math` is still `modulepreload`ed in `index.html`, another eager importer exists
and L-2's *sole-cause* claim is wrong (the cost claim would survive, the attribution would not).
I could not run that build (read-only law), so the attribution rests on the four-file enumeration
above — which is exhaustive by `grep`.
**Explicitly NOT claimed:** that `vendor-paper` is this component's fault. `svg-fourier.ts:11`
does import `catmullRomToBezier` from `@mkbabb/pencil-boil` (and it is **dead weight here** —
`pointsToSvgPath` defaults `closed = true` at `:49`, so the `catmullRomToBezier` branch at `:52` is
unreachable from this component), but `App.vue:6` → `SvgFilters.vue:3` imports `useLineBoil` from
the same package eagerly and independently. DarkModeToggle is a **co-cause only** there. Recorded
so the eventual repair does not over-claim.

---

### L-3 · BLOCKER · The viz render path: flipping to **light** greys out 4 of the 5 `VIZ_COLORS` entries, and this component is the only thing in the app that can trigger the flip

**Where this component touches the viz path.** Census `lane-frontend.md:26-28` — *"Canvas 2D
contexts 4 · WebGL/WebGPU 0 — ABSENT · `<canvas>` 3"*; `:514` — *"Canvas2D throughout"*; `:83`
`BasisCanvas.vue` (547) is *"the primary Fourier renderer"*; `:131` `ConvergencePlot.vue` (410) and
`:133` `FrequencyGraph.vue` (247) own their own Canvas2D loops. All three read the shared reactive
palette (`BasisCanvas.vue:6,127,172,257,261,326`). That palette is re-resolved on **dark-class
flip** — census `lane-frontend.md:41` and `:554`: *"A `MutationObserver` on
`documentElement.class` re-runs `resolveVizColors()` on dark-mode flip (`App.vue:11-17`)."*
`DarkModeToggle.vue:69` (`toggleDark()`) is the **only** runtime writer of that class:
`grep -rn "useGlobalDark|toggleDark" web/src` → one file, this one, lines 18 and 33.

**The defect.** `lib/colors.ts:22-53` (`cssVarToHex`) has exactly four parse arms — hex `:29`,
`hsl(...)` `:31-36`, bare-HSL triplet `:39-42`, `rgb(...)` `:45-50` — and a `return "#888888"`
fallthrough at `:52`. Anything else greys out. glass-ui 4.0.0 emits `--viz-*` in **oklch**
(`dist/styles/tokens/color-radius.css:263-267`, `dark-arm.css:113-115`) and, in a `@supports`
arm, as **`light-dark(…, …)`** (`light-dark.css:145-147`). Neither form matches any arm.

Cascade, read out of the built stylesheet `dist/assets/index-57FkGzlZ.css` (offset · enclosing
rule · declaration — last matching declaration wins, `:root` and `.dark` are both specificity 0-1-0):

| token | `:root` plain | `@supports (color:light-dark(...)){:root{` | `.dark` |
|---|---|---|---|
| `--viz-fourier` | 151103 `#d73523` | **170318 `light-dark(#d73523,#eb7366)`** | 172163 `#eb7366` |
| `--viz-chebyshev` | 151125 `#3156b9` | **170360 `light-dark(#3156b9,#88a1e7)`** | 172185 `#88a1e7` |
| `--viz-legendre` | 151149 `#9541af` | **170404 `light-dark(#9541af,#ce8ee1)`** | 172209 `#ce8ee1` |
| `--viz-green` | 151207 `var(--section-color-4)` → §`--section-color-4` **169772 `light-dark(#30826b,#66ccaf)`** | — | via `.dark` 171857 `#66ccaf` |
| `--viz-amber` | **235759 `#9d6515`** (app override, `src/style.css:120`) | — | 235811 `#e8b96d` |

**Light mode** (no `.dark` class): the winning declaration for `fourier`, `chebyshev`, `legendre`
and (through substitution) `green` is the `@supports` one — a `light-dark(...)` token stream. The
computed value of an *unregistered* custom property is its token sequence with `var()` substituted
but `light-dark()` **unresolved**; `getComputedStyle(...).getPropertyValue("--viz-fourier")`
therefore returns `light-dark(#d73523, #eb7366)`, which matches no arm → **`#888888`**.
**Dark mode**: `.dark` wins with a plain hex → all five resolve correctly.

**Failure scenario.** A user on `/visualize` in dark mode sees the correct epicycle palette. They
click this toggle once. `toggleDark()` removes `.dark`; App.vue's observer fires;
`resolveVizColors()` rewrites `VIZ_COLORS.fourier / chebyshev / legendre / green` to `#888888`;
the three canvases repaint the entire instrument in flat grey. Toggling back restores it. The
palette is *theme-dependent in the worst possible way*: correct only in dark.

**Falsifier / status.** `UNPROVEN-NEEDS-LIVE` (SS-13): one `getPropertyValue("--viz-fourier")` in
a light-mode page settles it. If a browser returns a *resolved* hex for an unregistered custom
property holding `light-dark()`, or if the app's real (non-stale) build emits the `.dark`-style
plain hex for `:root` too, L-3 dies. The static half is airtight regardless: the four arms are
enumerable and none accepts `light-dark(` or `oklch(`.
**Corpus fold — do not re-invent.** `formation/fourier/lane-docs.md:400-402` already records
*"exactly four regex arms … and a `return "#888888"` fallthrough at `:52`. **No `oklch()` arm.**"*
and `:474` files the deletion as **W.L5** (NOT EXECUTED). **This challenge extends it in two ways
the corpus does not have:** (a) the *asymmetry* — the `@supports light-dark()` arm makes the failure
**light-mode-only**, so it is invisible to anyone auditing in dark; (b) the **trigger** — the
grey-out is not merely a boot condition, it is re-applied on every flip by this component, which is
the only flip source in the app.
**Ownership honesty.** The defective function is `lib/colors.ts`, not this file. It is reported here
because the axis asks for the viz render path *where this component touches it*, and this component
is the sole runtime trigger. Repair belongs to W.L5.

---

## §2 — MAJOR

### L-4 · MAJOR · TOCTOU: the re-entrancy guard is read **before** an `await`, so a double-click during first engine load runs two morphs concurrently and orphans one animation past unmount

**Provenance.** Guard: `DarkModeToggle.vue:63` — `if (morph.phase.value !== "idle") return;`.
Phase is not raised until **after** the dynamic import: `useFourierMorph.ts:145-149` is
`stopAnim(); const Animation = await getAnimationCtor();` and `phase.value = "settle-out"` is at
`:169`. `getAnimationCtor` awaits `loadAnimationEngine()`, which is `Promise.all` of **eight**
dynamic imports (`keyframes.js dist/keyframes.js:274-283`).

**Trace (cold cache, light mode).**
1. Click ①: phase `idle` → passes. `morphingToDark = true` (`:68`), `toggleDark()` → dark (`:69`).
   `morphTo(sun,moon)` runs `stopAnim()` (no-op, `currentAnim === null`) and suspends on the import.
   **Phase is still `"idle"`.**
2. Click ② during the fetch: guard passes again. Now `isDark === true`, so `from = moonShape`,
   `to = sunShape` (`:65-66`), `morphingToDark = false`, `toggleDark()` → **light**. Second
   `morphTo` runs its `stopAnim()` — still a no-op, because ①'s animation does not exist yet — and
   suspends on the same promise.
3. Engine resolves. Continuation ① sets `phase="settle-out"`, builds `animA`, assigns
   `currentAnim = animA`, plays. Continuation ② sets `phase="settle-out"`, builds `animB`, assigns
   `currentAnim = animB` — **overwriting the only reference to `animA` without stopping it**.

**Consequences.** (a) `animA` and `animB` tick the same three refs (`currentPoints`,
`harmonicLevel`, `morphProgress`) every frame for ~350 ms — last writer per frame wins, so the icon
flickers between a degrading sun and a degrading moon. (b) Net theme flipped twice (back to light)
while the last-completing sequence decides the displayed shape — a **persistent icon/theme
desync**, self-healing only in theme, never in shape. (c) The next click computes `from` from
`isDark` (`:65`) — a shape that may not be the one on screen → a hard jump on frame 1.
(d) **Teardown escape:** `onUnmounted(() => stopAnim())` (`useFourierMorph.ts:215`) stops
`currentAnim` only — `animA` is unreachable and keeps ticking (writing to a dead component's refs)
until its own duration expires. Bounded (≤350 ms), but it *is* an unstoppable animation surviving
unmount.

**Falsifier.** Set a local `busy` flag in `handleToggle` before `await`, or move
`phase.value = "settle-out"` above the `await` in `morphTo`; if either exists in the tree the claim
dies — neither does (`DarkModeToggle.vue:62-72` has no flag; `useFourierMorph.ts:145-169` is as
quoted). Also dies if `Animation.play()` on a stopped instance were a no-op that unregistered the
tick — it is not: `engine-*.js:937-938` `stop()` calls `_cancelWAAPI(); playback.stop();
settle(); _resolvePlay()` on the instance it is called on, and nothing ever calls it on `animA`.
Window width is `UNPROVEN-NEEDS-LIVE` (it is one network round-trip for 8 chunks); the *structure*
is proven.

### L-5 · MAJOR · Zero error posture + a permanently poisoned memoised promise: one failed chunk fetch kills every morph in the app forever, and can wedge the toggle in a non-idle phase

**Provenance.** `useFourierMorph.ts:38-44`:

```ts
let enginePromise: Promise<AnimationCtor> | null = null;
function getAnimationCtor(): Promise<AnimationCtor> {
    if (!enginePromise) enginePromise = loadAnimationEngine().then(e => e.Animation);
    return enginePromise;
}
```

The memo is keyed on *existence*, not on *fulfilment*. `loadAnimationEngine()` is eight network
`import()`s; a stale hashed chunk after redeploy, an offline blip, or a CDN 404 rejects it — and the
**rejected** promise is cached at module scope, shared by every `useFourierMorph()` instance in the
app (the toggle and `/morph`). Every later morph re-awaits the same rejection. There is no `catch`
anywhere: not in `getAnimationCtor`, not in `morphTo` (`:145-213`), and not in the caller —
`DarkModeToggle.vue:62` `async function handleToggle()` is bound directly to `@click` (`:4`), so a
rejection becomes an **unhandled promise rejection**, never surfaced to the user.

**Two distinct failure scenarios.**
1. *Rejection at `:149` (before the phase is raised).* `toggleDark()` at `DarkModeToggle.vue:69`
   has **already run**, so the theme flips but the icon never morphs — and `onMounted:58-60` is the
   only other shape writer, so the glyph is stuck showing the *previous* theme's shape for the rest
   of the session, on every subsequent click.
2. *Any throw after `:169`.* `phase` is left at `"settle-out"` / `"morph"` / `"settle-in"` and is
   never reset (the only `phase.value = "idle"` on the success path is `:210`). The guard at
   `DarkModeToggle.vue:63` then rejects **every future click**: the dark-mode toggle is
   permanently dead for the session.

**Falsifier.** A `try/finally` restoring `phase`, or a `.catch(() => { enginePromise = null; })`
on the memo, kills this. Neither is present. The *reachability* of path 2 is narrower than path 1
(the phase-1..3 bodies are arithmetic over pre-validated arrays), so path 2 is the lower-probability
half — but it is the one that bricks the control, and it costs 3 lines to close. Note the near-miss
that makes it real: `getEasingFn` (`lib/easings.ts:63`) is
`EASING_PRESETS[name]?.fn ?? EASING_PRESETS.linear.fn` — if value.js ever dropped a key,
`.fn` would be `undefined` and `easeOut(tRaw)` at `:172` would throw *after* the phase was raised.
I checked: value.js 0.13.0 supplies **all 22** keys in `EASING_LABELS` (probe run against the
installed package — `MISSING: []`), so this does not fire **today**. The unguarded shape means the
next value.js bump decides.

### L-6 · MAJOR · Nothing watches `isDark`: any external theme flip desyncs the icon permanently and poisons the next morph's `from` shape

**Provenance.** The shape is written in exactly two places: `onMounted` once
(`DarkModeToggle.vue:58-60`) and inside `handleToggle` (`:71`). There is **no** `watch(isDark, …)`
and no `onFlipSettled` registration in the file.

**Two live external writers of `isDark`.** glass-ui's `useGlobalDark` is
`createGlobalState(() => { const isDark = useDark({ initialValue: <undefined>, disableTransition: false }); … })`
(`dist/useGlobalDark-C28t0VWJ.js`), i.e. plain vueuse `useDark` with the default mode `"auto"`.
In the installed @vueuse/core 14.3.0: `useStorage` defaults **`listenToStorageChanges = true`**
(`dist/index.js:1908,2027,6606`) and the `auto` path binds a `prefers-color-scheme` media query
(`dist/index.js:1857,5978,5986`). Therefore:
1. **Cross-tab.** Tab A toggles → `localStorage["vueuse-color-scheme"]` changes → tab B's `isDark`
   flips through the `storage` event, without tab B's `handleToggle` ever running.
2. **OS scheme change** while the stored mode is still `"auto"` (any visitor who has never clicked
   the toggle) flips `isDark` the same way.

**Failure scenario.** Tab B's theme becomes dark; its header still shows the **sun** (its
`currentPoints` were last written at `onMounted` under light). Worse, the next click in tab B
computes `from = isDark ? moonShape : sunShape` = **moon** (`:65`) while the *sun* is on screen —
so phase 1 (`settle-out`) degrades a shape the user is not looking at: the icon snaps to a
half-resolved moon on the first tick, then morphs. `strokeColor` is coherent throughout (the idle
branch reads `isDark`, `:47-51`), which makes it worse: colour says moon, geometry says sun.

**Falsifier.** Add `watch(isDark, v => morph.setShape(v ? moonShape : sunShape))` (or use the
`onFlipSettled` hook glass-ui already exposes, `dark.d.ts` `UseGlobalDarkReturn.onFlipSettled`) —
the claim dies. Also dies if `useDark` were constructed with `listenToStorageChanges: false` or a
non-auto `initialValue`: it is not (`useGlobalDark-C28t0VWJ.js` passes only
`{ initialValue: a, disableTransition: !1 }`, and `a` is `undefined` because
`DarkModeToggle.vue:33` calls `useGlobalDark()` with no argument).

### L-7 · MAJOR · `prefers-reduced-motion` gates the 200 ms hover scale and **not** the 350 ms shape morph — and keyframes.js's opt-in is one property away

**Provenance.** `DarkModeToggle.vue:103-108` carries a PRM block that neutralises exactly one
thing: `transition: none` on `.sun-moon-toggle`, i.e. the `transform: scale(1.12)` hover
(`:85`, `:91`). The actual motion — 350 ms of per-frame path rewriting through
`settle-out → morph → settle-in` (`useFourierMorph.ts:166-208`) — is ungated.
The engine offers the switch: `Animation` accepts `respectReducedMotion`, and
`createTweenAnimation` (`useFourierMorph.ts:127-133`) passes `duration`, `iterationCount`,
`timingFunction`, `fillMode`, `useWAAPI` — **not** `respectReducedMotion`. Its default is
**false**: `engine-*.js:75` `respectReducedMotion: !1` in the defaults object, and `:101`
`respectReducedMotion = !1` on the instance. When it *is* set, the engine short-circuits to
`_playReducedMotion()` / `_snapToReducedMotion()` (`engine-*.js:876,905-906,915`), i.e. an instant
fill-forward — precisely the desired behaviour for an icon.

**Failure scenario.** A vestibular-sensitive user with `prefers-reduced-motion: reduce` clicks the
toggle and gets 21 frames of a sun dissolving into low-frequency harmonic soup and re-condensing as
a moon, at the top of every page. The repo demonstrably knows the idiom — `router/index.ts:16`
gates View Transitions on PRM, and census `lane-frontend.md:619` counts **8** `@media
(prefers-reduced-motion: reduce)` blocks.

**CONTRADICTION with the corpus (stated explicitly, as required).** `lane-frontend.md:619` lists
`layout/DarkModeToggle.vue:104` in the PRM-conformant column. **The tree disagrees**: line 104's
block covers only the CSS `transition` property; the component's motion is JS-driven path
mutation that the CSS rule cannot reach. The census row should read *partial — CSS hover only,
morph ungated*.

**Falsifier.** Pass `respectReducedMotion: true` at `useFourierMorph.ts:127-133`, or branch
`handleToggle` on `matchMedia("(prefers-reduced-motion: reduce)")` and call `morph.setShape(to)`
instead of `morphTo`. Either kills the finding. Also dies if `RAFPlayback` consulted PRM
unconditionally — it does not: `timeline-*.js:104` gates on `n?.respectReducedMotion`, and
`timeline-*.js:107-137` (`C = { …, respectReducedMotion: !1 }`) confirms the opt-in default.

### L-8 · MAJOR · 512-sample resolution for an 80 px glyph: a **57 KB** `d` string is rebuilt and re-parsed every frame — ~1.19 MB of path text per toggle

**Provenance.** `currentPath` is `computed(() => pointsToSvgPath(currentPoints.value))`
(`useFourierMorph.ts:81`), bound at `DarkModeToggle.vue:8` → `FourierMorphSvg.vue:9` `:d="path"`.
Every tick of all three phases writes `currentPoints` (`useFourierMorph.ts:175,189,204`), so the
computed re-runs and the SVG `d` attribute is re-parsed by the browser each frame.
`pointsToSvgPath` (`svg-fourier.ts:47-73`) emits one cubic segment **per input point** with raw,
unrounded float coordinates (`d += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${p2[0]},${p2[1]}``, `:69`),
and `lerpPoints` (`:94-106`) produces full-precision doubles.

**Measured** (re-implemented `pointsToSvgPath` verbatim against the real assets, 512 points/level —
`n_eval: 512` in both blobs):

| | |
|---|---|
| idle path (`level 50`, source coords) | **57 029 chars** |
| mid-morph path (`lerpPoints(sun₅, moon₅, 0.5)`) | **56 755 chars** |
| total path text built over one 350 ms morph (21 frames @ 60 fps) | **1 191 850 chars ≈ 1.19 MB** |
| sample | `M110.25062710873291,43.62053042417943 C110.08238056001859,43.31675276292879 …` — **17 significant digits per ordinate** |

**Failure scenario.** Each toggle allocates and discards ~1.19 MB of string, and forces 21 full
SVG path re-parses of ~57 KB each, to animate an element whose CSS box is `5rem` × `5rem`
(`:78-79`) — where sub-pixel precision beyond ~2 decimals in a `0 0 200 200` viewBox
(`DarkModeToggle.vue:11`) is unobservable. During `morph` the geometry is `lowLevel = 5` — five
harmonics — yet still serialised at 512 samples. On a low-end mobile device this is the most
expensive thing the header does.

**Falsifier.** Round coordinates (`toFixed(2)` ≈ 3.5× smaller), or decimate the point array for the
morph phases, or memoise the idle path. Measure the resulting `d.length`; if a shipped variant
already does any of these, the claim dies. It does not — `svg-fourier.ts:56-69` is unrounded string
concatenation with no sampling parameter, and `DarkModeToggle` passes no options that could change
it (`useFourierMorph()` bare, `:37`).

---

## §3 — MINOR

### L-9 · MINOR · Shape preparation runs in `setup()` (per-mount), not at module scope — and is duplicated verbatim in a second component, `as any` and all

`DarkModeToggle.vue:26-27` sits inside `<script setup>`, so it compiles into `setup()` and re-runs
on **every mount**: `prepareFourierShape` (`svg-fourier.ts:76-88`) walks 10 levels × 512 points ×
2 shapes = **10 240 tuple allocations** on the boot critical path, before first paint, every time.
Hoisting the two `const`s above the component (a plain module-scope statement in a separate
`<script>` block, or a `lib/fourier-shapes.ts`) makes them once-per-page.
The same four lines appear again, character-for-character, at
`components/morph/FourierMorphDemo.vue:95-100` — same imports, same `as any`, same variable names.
So on `/morph` the work is done twice and 20 480 tuples are live.
*Falsifier:* if Vue hoisted `<script setup>` top-level constants out of `setup()`, this dies — it
does not; only static template/vnode hoisting applies, statements with call expressions stay in
`setup()`. *Colocation verdict:* the shape prep belongs in one module both consumers import.

### L-10 · MINOR · One-frame flash to the *destination* colour at the start of every morph after the first

`morphProgress` is set to `1` when a morph completes (`useFourierMorph.ts:211`) and is **never
reset to 0** at the start of the next one — phase 1 only assigns it inside the tick callback
(`:176`), which first runs on the next animation frame. Meanwhile `phase.value = "settle-out"`
(`:169`) and `morphingToDark` (`DarkModeToggle.vue:68`) are set synchronously, and Vue's flush is a
microtask — which runs **before** the next rAF. Proof the first tick is not synchronous:
`Animation.play()` → `_playRAF()` → `playback.loop(cb)` → `_run` → `this._rafId = p(r)` where
`p` is `window.requestAnimationFrame` (`engine-*.js:887-890`, `timeline-*.js:93-100,117-119,52-59`);
`parse()` (`engine-*.js:669-670`) does not invoke frame callbacks.
So the render immediately after the click evaluates `strokeColor` (`DarkModeToggle.vue:52-55`) with
the **new** `[from,to]` pair and the **stale** `t = 1` → it paints the destination colour, then
snaps back to the origin colour on the next frame and eases forward. Visible as a
flash-forward-then-rewind, ~16 ms, on every toggle but the first (`morphProgress` starts at `0`,
`:84`). *Falsifier:* set `morph.morphProgress.value = 0` (or reset it at `:169`) — gone. Also dies
if `play()` ticked synchronously; traced above that it does not.

### L-11 · MINOR · Two `as any` casts silence a real type mismatch, and the prepared shape retains the whole parsed blob

`DarkModeToggle.vue:26-27` — `prepareFourierShape(sunData as any)`. With
`resolveJsonModule: true` + `strict: true` (`tsconfig.json:11,8`), the JSON module's inferred type
gives `decomposition.domain: number[]` and `levels: number[]`, while `FourierPathData`
(`svg-fourier.ts:15-28`) + `BasisDecomposition` (`lib/types.ts:8-12`) demand
`domain: [number, number]` — not assignable, hence the cast. The cast is `any`, not
`as unknown as FourierPathData`, so it also disables checking of `partial_sums`, `levels` and
`components` shape entirely: a regenerated asset with a renamed key would type-check clean and fail
at runtime inside `prepareFourierShape:81`. Separately, `svg-fourier.ts:87` returns
`{ data, pointsByLevel }` — the unused 17.6 % (`original`/`decomposition`/`eval_points`, see L-1)
is pinned in the heap for the component's whole lifetime.
*Falsifier:* replace with a typed loader whose return type is `FourierPathData`; if `tsc --noEmit`
passes with the cast removed, the mismatch claim dies (I did not run `tsc`, since it would write
`node_modules/.tmp` state into the read-only repo — the mismatch is derived from the two type
declarations quoted above).

### L-12 · MINOR · `<button>` has no `type` attribute

`DarkModeToggle.vue:2-6` — a bare `<button>`, which defaults to `type="submit"`. Harmless at its
current site (`AppHeader.vue:141`, no ancestor `<form>`), but it makes the component unsafe to
reuse inside one: a click would submit and navigate, and the morph's `await` would be torn down
mid-flight. One attribute. *Falsifier:* add `type="button"`; or find a `<form>` ancestor today —
there is none (`grep -n "<form" web/src/components/layout/*.vue` → empty).

### L-13 · MINOR · Dead arithmetic in `strokeColor`, and a hard-coded palette living in a layout component (with a comment the tree contradicts)

`DarkModeToggle.vue:47-51` — the idle branch is
`isDark ? lerpColor(SUN, MOON, 1) : lerpColor(SUN, MOON, 0)`, i.e. two `lerpColor` calls whose
results are, by construction, `MOON_COLOR` and `SUN_COLOR`. Six multiplications and three
`Math.round`s to recompute two constants, on every reactive read.
Colocation: `SUN_COLOR` / `MOON_COLOR` (`:30-31`) are raw RGB triples declared in a **layout**
component while the app has a palette module (`lib/colors.ts`) whose whole job is this.
And the comment at `:31` — *"`#c084fc` — matches `VIZ_COLORS.legendre`"* — is **false against the
tree**: `--viz-legendre` computes to `#9541af` (light) / `#ce8ee1` (dark)
(`dist/assets/index-57FkGzlZ.css` offsets 151149 / 172209; independently derived from
`oklch(0.532 0.180 317.5)` → `#9541af` and `oklch(0.739 0.134 318.1)` → `#ce8ee1`).
`#c084fc` is in fact `VIZ_COLORS.rainbow[4]` (`lib/colors.ts:15`) — the static rainbow, not
legendre. *Falsifier:* compute either oklch; if one lands on `#c084fc` the comment is right.
Neither does.

---

## §4 — INFO

### L-14 · INFO · `.value` in the template leaks composable internals into markup — systemic, not local

`DarkModeToggle.vue:8` binds `:path="morph.currentPath.value"`. This is *correct* (unwrapping
applies only to top-level setup bindings; `morph` is a plain object, so `.value` is required and
reactivity tracking is intact), but it hard-codes the composable's ref-ness into every consumer's
template. The identical idiom appears at `FourierMorphDemo.vue:13`, so it is a house pattern, not a
one-off. `toRefs`/destructuring at the call site would make the template ref-agnostic.
*Falsifier:* if the path ever failed to update, unwrapping would be the cause — it does not; reading
`.value` during render registers the dependency.

### L-15 · INFO · Composable contract hazard: `stopAnim()` **resolves** rather than aborts, so `setShape()` during a morph does not cancel it

`Animation.stop()` calls `_resolvePlay()` (`engine-*.js:937-938`), and `RAFPlayback.stop()` →
`_cleanup()` → `this._resolve?.()` (`timeline-*.js:120-127`). So the `new Promise(resolve => …)`
wrappers at `useFourierMorph.ts:170,186,199` **resolve** on stop, and `morphTo` proceeds to the
*next* phase instead of aborting. Consequence: `setShape()` (`:89-95`, which calls `stopAnim()`)
does not cancel an in-flight morph — the morph's later phases then overwrite the shape `setShape`
just installed. Not reachable from `DarkModeToggle` today (its only `setShape` is in `onMounted`,
`:59`), but the component depends on this contract and is one refactor (e.g. the L-6 `watch`) away
from tripping it. A generation counter checked after each `await` closes it.
*Falsifier:* if `stop()` rejected or set an aborted flag `morphTo` consulted, this dies. It does
neither.

### L-16 · INFO · The **R5-7 template-loop invisibility class does NOT apply here** — recorded so the F.W4 sweep does not mis-file it

R5-7 (intake `lane-fourier-r3-r6.md:125`, ADOPT-AS-FACT, carry → F.W4) is: *template-loop evidence
keyed to **component** callsites is blind to native HTML element loops* — demonstrated by
`instance.loop.paper-sidebar` deriving to `[]` while `PaperSidebar.vue` renders the whole TOC
through three native `<li v-for>` at lines 65/87/105 (cured by R6-5's `NATIVE_TEMPLATE_LOOP`
family, `lane-fourier-r3-r6.md:139`).
**This component has no `v-for` at all** — `DarkModeToggle.vue:1-14` is one `<button>` wrapping one
component callsite (`FourierMorphSvg`), and `FourierMorphSvg.vue:1-17` is `<svg>` + `<path>`, also
loopless. So the loop predicate cannot fire, and any instance derivation over this file is
*correct* by accident.
**The adjacent observation worth carrying** (same root cause, different predicate): the only
element that *does* anything here is the **native** `<path>` at `FourierMorphSvg.vue:8-15`, whose
`:d` is rewritten every frame (L-8). A derivation keyed to component callsites counts one node
(`FourierMorphSvg`) and sees **zero** of the per-frame native-element churn that constitutes this
component's entire runtime cost. R6-5's cure covers native *loops*; native *high-churn bindings*
remain outside the model. *Falsifier:* `grep -n "v-for" web/src/components/layout/DarkModeToggle.vue
web/src/components/decorative/FourierMorphSvg.vue` → empty (verified). If a `v-for` appears, re-file
under R5-7 proper.

### L-17 · INFO · The glass-ui shadow is real but the local fork is justified — and the sanctioned batching hook is unused

Folding `lane-frontend.md:419-421`: glass-ui ships a `DarkModeToggle`
(4.0.0: `dist/components/custom/controls/DarkModeToggle.vue.d.ts`, present in the installed tree;
7.0.0: `./dark-mode-toggle`), and the lane's recommendation — *"keep, but reconcile against the
7.0.0 props/tokens rather than let it drift"* — is **correct and I do not contest it**: the local
one is a product-signature Fourier morph, not a generic switch, and it does correctly consume
`useGlobalDark` from the producer (`:18`, `:33`).
What is *not* consumed is `onFlipSettled` — glass-ui's documented post-flip batching hook, whose
own doc comment names *"the atlas's palette memo + N-chart palette tween"* as its reason to exist
(`dist/composables/dark/useGlobalDark.d.ts`). fourier instead re-implements it as a raw
`MutationObserver` at `App.vue:11-17` that is **never disconnected** (benign — the observer's owner
is the root component — but it is a hand-rolled duplicate of a shipped, coalesced primitive, and it
is the L-3 trigger path). Producer also ships `installDarkModeSync` and `darkModeSyncScript()` for
exactly the pre-paint script hand-rolled at `index.html:22-32`; note the hand-rolled version omits
`documentElement.style.colorScheme`, which glass-ui's emits — so form controls and scrollbars paint
light until `useGlobalDark`'s `immediate: true` watcher runs at this component's setup.
*Falsifier:* if `onFlipSettled` were registered anywhere, or the producer's script string used —
`grep -rn "onFlipSettled|installDarkModeSync|darkModeSyncScript" web/src` → empty.

---

## §5 — SUPERLATIVES (L-18 runs both ways; each carries its own falsifier)

**S-1 · The closed-path seam is handled correctly, and almost nobody does this.**
`svg-fourier.ts:54-72` uses modular indexing on all four Catmull-Rom control points —
`(i-1+n)%n`, `i`, `(i+1)%n`, `(i+2)%n` — so the tangent at the wrap point is continuous and the
closed glyph has no kink where the sample array joins. The naive version (clamping at the ends) is
the overwhelmingly common implementation and produces a visible corner at `points[0]`.
*Falsifier:* render the level-1 sun (a near-circle, the most seam-revealing case); a discontinuity
at `M`'s coordinate would refute it. Static reading of `:58-69` shows none is possible.

**S-2 · The animation cannot escape the precomputed level table.**
Phase 1 clamps with `Math.max(lowLevel, level)` (`useFourierMorph.ts:175`) and phase 3 with
`Math.min(highLevel, level)` (`:204`), *and* `interpolateAtHarmonicLevel` clamps again at
`:131` before bracketing. Belt and braces, in the right order: the easing function may overshoot
(`ease-in-out-back` is in the preset list, `lib/easings.ts:34`), and the clamps mean an overshooting
`t` still resolves to a real bracketed pair rather than a `Map.get` miss. The `!loPoints ||
!hiPoints` guard at `:146-148` then returns `loPoints ?? hiPoints ?? []` instead of throwing.
*Falsifier:* find an easing whose output can drive `level` outside `[levels[0], levels[n-1]]` past
all three clamps. With `linear` in this component it is moot; with `back` presets on `/morph` the
clamps are what keep it green.

**S-3 · The composable owns its teardown.**
`onUnmounted(() => stopAnim())` (`useFourierMorph.ts:215`) — the composable, not the consumer,
registers the cleanup, which is the correct side of that boundary and means `DarkModeToggle` cannot
forget it. L-4's orphaned `animA` is the *only* escape, and it exists because of a missing
re-entrancy guard, not a missing teardown.
*Falsifier:* an animation that survives a normal (non-raced) unmount would refute — `stopAnim`
(`:115-120`) nulls and stops `currentAnim`, which is the only handle in the single-morph case.

**S-4 · The lazy-engine boundary is the right instinct, correctly executed — and it is worth saying so.**
`getAnimationCtor` (`:38-44`) keeps eight engine chunks off the critical path and memoises across
instances; the comment at `:33-36` shows the author reasoned about eager-bundle cost deliberately.
The design is right. L-2 is not "the author didn't think about bundle weight" — it is "one static
`import` of a sibling easing module silently undid a boundary that was otherwise built correctly",
which is a far more instructive failure and argues for keeping the boundary and fixing the edge.
*Falsifier:* if `loadAnimationEngine` resolved eagerly-bundled modules the boundary would be
decorative — it does not (`keyframes.js:274-283`, eight true `import()` expressions).

**S-5 · The accessible name is state-derived and correct in both directions.**
`:aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"` (`:5`) states the
*action*, not the state — the right choice for a `button` — and because `toggleDark` is synchronous
(`useGlobalDark-C28t0VWJ.js`: `useToggle(isDark)` wrapped in the transition-suppression helper), the
label updates on the same tick as the theme, with no window where it lies. The focus-visible ring
(`:98-101`) is present and `:focus { outline: none }` (`:94-96`) is correctly paired with it rather
than left bare.
*Falsifier:* an async `toggleDark` (e.g. one awaiting a View Transition) would open a lying-label
window. The producer's own doc is explicit that no View Transition is in this path
(`useGlobalDark.d.ts`: *"No View Transition is involved anywhere in this path"*).

---

## §6 — Corpus reconciliation

| Corpus row | This challenge |
|---|---|
| `lane-frontend.md:177,419-421` — DarkModeToggle 109 LOC, SHADOW of glass-ui's; *"keep, but reconcile against 7.0.0"* | **FOLD, uncontested** (L-17). Adds: `onFlipSettled` unused, `App.vue` MutationObserver duplicates it. |
| `lane-frontend.md:41,554` — `MutationObserver` re-runs `resolveVizColors()` on dark flip | **FOLD** — and identifies this component as the flip's **sole** runtime source (L-3). |
| `lane-docs.md:400-402` — `cssVarToHex` four arms, `#888888` fallthrough, **no `oklch()` arm**; `:474` W.L5 NOT EXECUTED | **FOLD + EXTEND** (L-3): the `@supports light-dark()` arm makes the grey-out **light-mode-only**, therefore invisible to dark-mode auditing; and it re-fires on every toggle. |
| `lane-docs.md:390-397` — five bare-root value.js specifiers, *"which value.js 4.0.0 no longer exports"* | **FOLD + CLARIFY.** Forward hazard, not a live break: `web/package.json:18` pins `^0.13.0` and the installed 0.13.0 exports only `"."` (`exports` keys = `["."]`). L-2's cost claim is about the *bundle*, not the specifier. |
| `lane-frontend.md:619` — `DarkModeToggle.vue:104` counted as a PRM site | **CONTRADICTED** (L-7): the PRM block covers the CSS hover transition only; the 350 ms JS morph is ungated and `respectReducedMotion` defaults `false`. |
| `lane-frontend.md:479` — keyframes peer floor note (7.0 peers `^6.0.0`; installed 4.3.0) | **CONSISTENT** — confirmed 4.3.0 installed; L-5's poisoned-memo defect is version-independent. |
| `lane-fourier-r3-r6.md:125` (R5-7) / `:139` (R6-5) — native-template-loop invisibility | **NOT APPLICABLE**, declared with evidence (L-16), plus the adjacent native-high-churn-binding observation for F.W4. |
| `CENSUS-2026-08-03.md:85-86`, `lane-frontend.md:26-28,514` — Canvas2D throughout, WebGL/WebGPU **absent** | **CONSISTENT.** This component touches no canvas; its viz-path contact is the palette (L-3). No WebGL claim is made anywhere in this challenge. |

---

## §7 — Counts

**Defects 17** — BLOCKER 3 (L-1, L-2, L-3) · MAJOR 5 (L-4 … L-8) · MINOR 5 (L-9 … L-13) ·
INFO 4 (L-14 … L-17).
**Blockers 3.** **Superlatives 5** (S-1 … S-5).
**`UNPROVEN-NEEDS-LIVE` (SS-13): 2** — L-3 (the `getPropertyValue` return for a custom property
holding `light-dark()`) and the *window width* half of L-4 (the engine-fetch race window; its
structure is statically proven).

**The one-line indictment.** Three of the five heaviest bytes on fourier's first paint —
450 KB of Fourier JSON, 348 KB of value.js+katex, and a 57 KB-per-frame path string — all trace to
a 109-line header button that draws an 80-pixel icon; and the file's own comments assert the
opposite of the tree on two of them.
