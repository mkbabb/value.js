served model id: `claude-opus-5[1m]`

# CHALLENGE — `SvgFilters.vue` · axis **L (LIBRARY)**

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/decorative/SvgFilters.vue` (178 lines; script `:1-56`, template `:58-178`)
**Coordinate** fourier-analysis `HEAD = cd26c65` on branch `m/w1-bump-migration` (dirty WT — subject file is NOT among the 28 modified paths; `git status --short` clean for it)
**Posture** subject assumed DEFECTIVE until the tree proves otherwise. Every row below carries severity + `file:line` + its own falsifier.
**Method** static + source-derived + git-pickaxe only. No browser. Livable-only claims carry `UNPROVEN-NEEDS-LIVE` for SS-13.

---

## VERDICT

**The component is dead.** All four SVG filters it defines are referenced by nothing — not in `web/src`, not in `index.html`, not in `public/`, not in `e2e/`, not in the built `dist/` assets, and (for two of the four) **not once in the entire git history of the repository**. The component nonetheless mounts at the application root (`web/src/App.vue:22`), enrols two subscribers into a process-wide `requestAnimationFrame` scheduler, and performs ~13 `querySelector` + `setAttribute` DOM writes per second, for the lifetime of every page view, against elements that paint zero pixels.

The two live filters were not "never wired" — they were **deliberately unwired and their definitions abandoned**, on 2026-03-06 and 2026-03-08 respectively, five months before this audit. The commit that killed the first one says so in its own message.

| | count |
|---|---|
| **Defects** | **15** |
| — BLOCKER | 1 |
| — MAJOR | 4 |
| — MINOR | 7 |
| — INFO | 3 |
| **Superlatives** | **5** |

---

## §0 · Import closure (read whole, read-only)

| Import | Resolves to | Read |
|---|---|---|
| `vue` (`ref, onMounted, watch`) — `:2` | framework | n/a |
| `@mkbabb/pencil-boil` (`useLineBoil`) — `:3` | `web/node_modules/@mkbabb/pencil-boil@0.4.1` → `src/index.ts:17` → `src/vue.ts` (159 lines) | ✅ whole |

`pencil-boil@0.4.1` is a **source-published** package (`package.json` `"main": "./src/index.ts"`, `"exports": {".": "./src/index.ts"}`) — Vite compiles its TypeScript in-tree, so `src/vue.ts` **is** the shipped artifact. There is no dist to disagree with. Its only other exports (`path.ts`, `celestial.ts`, `random.ts`) are consumed elsewhere (`lib/svg-fourier.ts:11`, `morph/FourierShapeExtractor.vue:144`) and are out of scope for this subject.

Comparator read (evidence only, not a dependency of the subject): `/Users/mkbabb/Programming/pencil-boil/src/vue.ts` @ **0.12.0** — the producer's current head. Used in §2 to prove two of the subject's reachable defects are already cured upstream.

Also read for consumer/mount facts: `App.vue`, `style.css:1-80`, `layout/DarkModeToggle.vue:1-60`, `main.ts`, `web/package.json`, `dist/assets/index-57FkGzlZ.css`.

---

## §1 · BLOCKER

### L-1 · BLOCKER · The entire component is dead code. All four filters are unreferenced; two have a dated death certificate, two were born dead.

**Claim.** `SvgFilters.vue` defines exactly four filters — `title-boil` (`:69`), `wobble-celestial` (`:96`), `paper-grain` (`:122`), `canvas-grain` (`:150`). An SVG `<filter>` in `<defs>` renders **only** when some element references it via the `filter` property/attribute. Zero such references exist anywhere in the product.

**Evidence — reference search (exhaustive, four independent nets):**

```
$ cd fourier-analysis/web
$ grep -rnF 'url(#' src/ index.html public/          → 0 hits   (no filter/mask/clip/gradient refs AT ALL)
$ grep -rn 'title-boil|wobble-celestial|paper-grain|canvas-grain' src/ index.html public/ e2e/
    src/components/decorative/SvgFilters.vue:26,38   ← its own querySelectors
    src/components/decorative/SvgFilters.vue:69,96,122,150 ← its own id= attributes
    (nothing else, in any file, of any type)
$ grep -on 'url(#[a-zA-Z0-9_-]*' dist/assets/*.css dist/assets/*.js  → 0 hits  (the SHIPPED bundle)
$ grep -rn 'filter[:=]' src/ --include='*.vue' --include='*.ts' --include='*.css' | grep -i 'url|#'  → 0 hits
$ grep -rn 'url(#\$\{|`url(#' src/                   → 0 hits   (no runtime-constructed reference)
```

The subject's own `querySelector` strings (`:26`, `:38`) are the **only** occurrences of `#title-boil` / `#wobble-celestial` in the tree, and `#paper-grain` / `#canvas-grain` occur **nowhere at all**.

**Evidence — provenance (git pickaxe, whole history, all paths):**

| Filter | Last consumer | Killed by | Date | Dead for |
|---|---|---|---|---|
| `title-boil` | `AppHeader.vue` — `style="filter: url(#title-boil)"` | `65c1565` | **2026-03-06** | ~5 months |
| `wobble-celestial` | `DarkModeToggle.vue` — `:filter="!isDark ? 'url(#wobble-celestial)' : undefined"` ×2 | `e9c7bc4` | **2026-03-08** | ~5 months |
| `paper-grain` | — | — | — | **born dead** |
| `canvas-grain` | — | — | — | **born dead** |

`65c1565`'s own commit message names the act: *"Paper: CM font title **(no boil)**"*. `e9c7bc4` (*"Fourier morph system for dark mode toggle"*) replaced the filtered sun/moon glyph with `FourierMorphSvg` — the live `DarkModeToggle.vue:7-12` carries no `filter` binding at all. Both commits deleted the **consumer** and left the **producer** plus its animation loop standing.

For the two grain filters: `git log --oneline -S '#paper-grain'` → **0 commits**; `git log --oneline -S '#canvas-grain'` → **0 commits**, over the full history, all paths. The reference form of those ids has never existed in this repository. (The pickaxe is sound here: `id="paper-grain"` does not contain the substring `#paper-grain`, so a zero result is a statement about *references* specifically. Contrast `#title-boil`, which the pickaxe does find — at `:26` and in `65c1565`.)

**Evidence — the paper texture that does exist comes from somewhere else.** `App.vue:24` applies `.paper-texture`, which is a **glass-ui** CSS class, not this filter:

```
$ grep -o '\.paper-texture[^}]*}' dist/assets/index-57FkGzlZ.css
  .paper-texture{background-image:var(--paper-clean-texture);background-repeat:repeat;
                 background-size:var(--paper-texture-size);background-blend-mode:multiply}
  .paper-texture{background-blend-mode:screen}
$ grep -rln 'paper-texture' node_modules/@mkbabb/  → glass-ui/dist/styles/{index,cards,glass/ladder,tokens/scale-paper}.css
```

A `background-image` recipe, unrelated to `feTurbulence`. `paper-grain` is not merely unused — it is **superseded and unaware**.

**Cost of the corpse.** This is not inert dead code. `App.vue:22` mounts the component at the SPA root; it never unmounts. Its script therefore runs for every page view:

- 2 subscribers enrolled into pencil-boil's singleton RAF loop (`vue.ts:134`), which then runs a `requestAnimationFrame` callback at display rate **for the entire session** (`vue.ts:54`);
- `boilFrame` advances every 150 ms and `wobbleFrame` every 160 ms (`:20-21`), each write scheduling a Vue watcher (`:47-48`);
- each watcher fire performs a `querySelector` **plus** a `setAttribute` (`:25-32`, `:37-44`) — ~13 DOM writes/second, ~46 800/hour;
- every write lands on an `feTurbulence` inside a `width="0" height="0"` SVG that no element filters through.

**Falsifier.** Produce any one of: (a) a `filter` property, `filter` attribute, `filter=` binding, or CSS `filter:` declaration in `web/src`, `index.html`, `public/`, or a shipped `dist/` asset whose value resolves to `#title-boil`, `#wobble-celestial`, `#paper-grain`, or `#canvas-grain`; (b) a runtime-constructed reference string (template literal, config object, JSON asset) yielding one of those fragments; (c) a consumer outside this repo that imports `SvgFilters.vue` (it is not exported — `web/` is a private app, `package.json:3` `"private": true`); (d) a `<use>`/`<image>` reference to the host `<svg>`. Any one of the four falsifies L-1 for that filter. I found none by five independent searches over source, history, and the built bundle.

**Remedy.** Delete `web/src/components/decorative/SvgFilters.vue` and its import + tag at `App.vue:7,22`. That single deletion also discharges L-2 through L-14 below, removes one of the three `pencil-boil` import edges named at `lane-frontend.md:481`, and removes 178 of the app's ~20.6k frontend LOC. Preserve the two boil filters in a scratch note **only if** a design intent to restore the title boil exists — the tree carries no such intent, and `65c1565`'s message is an explicit statement of the opposite.

---

## §2 · MAJOR

### L-2 · MAJOR · The pinned `pencil-boil@0.4.1` scheduler resurrects an empty, undisarmable RAF loop after any tab hide/show — and the path is reachable *only* for users who prefer reduced motion.

**Claim.** `vue.ts:76-92` restarts the singleton scheduler on `visibilitychange → visible` **unconditionally**, without checking whether any subscriber is active. If the subscriber set is empty (or was never populated), the loop restarts with nothing to do and no mechanism to stop, because the only disarm site is `stop()` (`vue.ts:138-142` → `maybeStopScheduler()`), which nothing will call.

**Evidence (0.4.1, the installed version):**

```ts
// vue.ts:84-90 — the resume branch
} else {
  for (const sub of subscribers) { if (sub.active) sub.lastTick = 0; }   // empty set: no-op
  ensureScheduler();                                                     // ← unconditional
}

// vue.ts:57-61
function ensureScheduler() {
  if (schedulerRunning || typeof window === 'undefined') return;
  schedulerRunning = true;
  rafId = requestAnimationFrame(schedulerTick);   // ← starts even with 0 subscribers
}

// vue.ts:34-55 — schedulerTick iterates `subscribers` (empty), then unconditionally re-requests:
  rafId = requestAnimationFrame(schedulerTick);   // :54 — no self-disarm on an empty set
```

**Reachability in fourier — and the a11y inversion.** `SvgFilters.vue` is the **sole** `useLineBoil` consumer in the repository (`grep -rn useLineBoil web/src` → `SvgFilters.vue:3,20,21` only). The trigger sequence:

1. A user with `prefers-reduced-motion: reduce` loads the app.
2. `useLineBoil`'s `watchEffect` (`vue.ts:148-151`) calls `start()`; `start()` returns at `vue.ts:129` on the PRM gate. **`subscribers` stays empty. `schedulerRunning` stays `false`.** Correct so far — this is the feature working.
3. The user switches tabs. The `hidden` branch (`vue.ts:79-83`) runs; `rafId` is already `null`, `schedulerRunning` already `false`; harmless.
4. The user switches back. The `else` branch (`:84-90`) runs. `ensureScheduler()` sees `schedulerRunning === false` and **starts a `requestAnimationFrame` chain over an empty subscriber set.**
5. Nothing can ever stop it: `maybeStopScheduler()` is called only from `stop()`, and `stop()` is called only from the `watchEffect` (which will not re-run — `frameCount` is the constant `8`) or `onUnmounted` (the root-mounted component never unmounts).

The result: a user who asked the platform for *less* motion pays a **permanent display-rate RAF callback** that a user who asked for none does not, for the remainder of the session. The accessibility affordance is the entry condition for the regression.

**Cured upstream.** The producer already fixed exactly this, and documented it. `/Users/mkbabb/Programming/pencil-boil/src/vue.ts:274-289` @ 0.12.0:

```ts
} else if (schedulerRunning && hasActiveSubscriber()) {
  // Resume ONLY with a live subscriber — a page whose marks all withdrew while hidden
  // (or never enrolled) must not resume an empty idle loop. …
  …
  armScheduler();
} else {
  // No active subscriber: disarm cleanly rather than leaving `schedulerRunning` dangling.
  schedulerRunning = false;
}
```

The phrase *"or never enrolled"* is the reduced-motion case named verbatim by the producer.

**Falsifier.** Show that (a) `subscribers` can never be empty at a `visibilitychange` in this app — refuted by `vue.ts:129` returning before `subscribers.add(sub)` under PRM; or (b) `schedulerTick` self-disarms on an empty set — refuted by `vue.ts:34-55`, which has no `subscribers.size` check and re-requests at `:54` on every path after the `schedulerRunning` guard at `:35`; or (c) some other site calls `maybeStopScheduler()` — `grep -n maybeStopScheduler vue.ts` → definition `:63`, one call site `:141` inside `stop()`; or (d) `visibilitychange` never fires for the affected population.
The *measured* per-frame cost (µs/frame, battery) is `UNPROVEN-NEEDS-LIVE`; the *code path* is fully static.

**Remedy.** Either arm of L-1's deletion or the already-booked `pencil-boil 0.4.1 → ^0.11.2` bump (`lane-frontend.md:60,481,636`; `CENSUS-2026-08-03.md:105,185,220`) closes this. **This row upgrades that carry's rationale from version-skew hygiene to a live reduced-motion perf defect.**

---

### L-3 · MAJOR · Reduced-motion is sampled once and never re-read — at *both* layers. A runtime preference flip is honoured in neither direction.

**Claim.** The component snapshots the media query into a plain `const` at setup time (`:7-9`) and the library samples it only inside `start()` (`vue.ts:129`), which is invoked from a `watchEffect` whose sole reactive dependency is `frameCount` — a compile-time constant `8` here (`:20-21`, `vue.ts:148-151`). No `MediaQueryList` change listener exists at either layer.

**Evidence:**

```ts
// SvgFilters.vue:7-9 — a boolean, not a ref, not a listener
const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// pencil-boil@0.4.1 vue.ts:96-99 — a function, called once per start()
function prefersReducedMotion(): boolean { … return window.matchMedia(…).matches; }
$ grep -n 'addEventListener' vue.ts  → :77 only (visibilitychange). No 'change' listener on any MQL.
```

Both failure directions are live: a user who enables `reduce` mid-session keeps the animation (the enrolled subscribers keep ticking; `:24`/`:36` re-read a stale `const`), and a user who disables `reduce` mid-session never gets it (the `watchEffect` will not re-run, so `start()` is never retried).

**Contrast with the sibling gate in the same tree.** `router/index.ts:15-17,138` calls `prefersReducedMotion()` **at each navigation** — a fresh read per use. The subject is the only PRM site in the app that caches the answer for the session.

**Cured upstream.** `/Users/mkbabb/Programming/pencil-boil/src/vue.ts:292-299` @ 0.12.0 — section header *"prefers-reduced-motion — reactive AND centrally enforced"*, backed by a module-level `prmRef` over a retained `prmQuery`.

**Falsifier.** Exhibit an MQL `change` listener, a `useMediaQuery`/`watch` binding, or a re-read of `matchMedia` on any path reachable after setup, at either layer. `grep -n 'addEventListener\|matchMedia' SvgFilters.vue vue.ts` → `SvgFilters.vue:9`, `vue.ts:77,98` — the first two are one-shot reads, the third is the visibility listener. None re-samples PRM. The *user-observable* consequence of a mid-session flip is `UNPROVEN-NEEDS-LIVE`; the absence of any listener is static.

---

### L-4 · MAJOR · Both animators fail silently and nothing observes them — and the tree proves the silent-failure mode actually fired, for five months, undetected.

**Claim.** Every failure path in the component is an unlogged `return`. There is no throw, no `console.warn`, no dev-mode assertion, no test.

**Evidence:**

```ts
// :24  if (reducedMotion || !svgRef.value) return;      ← two conditions, one silent exit
// :28  if (!turbEl) return;                             ← the id-drift / removal detector, muted
// :36, :40  identical pair for the wobble animator
```

Neither exit distinguishes *"correctly disabled"* (reduced motion) from *"structurally broken"* (the element is gone, the id was renamed, the filter was deleted). The two states are indistinguishable to every observer.

And there is no observer of any kind:
- **No unit-test runner.** `grep -rn vitest web/package.json` → no match. Corroborates `lane-frontend.md:48,646`.
- **No e2e coverage.** `grep -rn 'boil\|grain\|feTurbulence\|SvgFilters' web/e2e/` → **0 hits** across all 8 specs, including `visual-baseline.spec.ts`.
- **No type-level protection.** `vue-tsc -b` (the CI web gate) cannot see inside a `querySelector` string literal.

**Why this is MAJOR and not MINOR:** L-1 is the *outcome* of L-4. The mechanism is exact — `65c1565` (2026-03-06) removed `style="filter: url(#title-boil)"` from `AppHeader.vue` while leaving `applyBoilFrame` running. From that instant the component's *stated purpose* was unachievable, and the component's own reaction was to keep succeeding: `turbEl` is still found (the filter def is still there), `setAttribute` still succeeds, no code path is skipped, nothing degrades. The failure is invisible **by construction** because the animator's contract is stated against the *definition* it owns rather than the *consumers* it serves. Five months and roughly two dozen intervening commits produced not one signal. This is a design property of the error posture, not bad luck.

**Falsifier.** Exhibit any test, assertion, lint rule, type constraint, CI check, or runtime diagnostic in this repo that would have gone red between `65c1565` and `HEAD` as a consequence of `url(#title-boil)`'s removal. I searched `web/e2e/` (8 specs), `web/package.json` scripts, `.github/workflows/ci.yml`'s three jobs (`api-tests`, `web-build` = `vue-tsc + vite build`, `e2e-tests`), and found none. Producing one falsifies L-4.

---

### L-5 · MAJOR · **R5-7 class extension.** This component is *structurally invisible* to the callsite-keyed instance deriver — and R6's cure does not reach it, because R6's cure is loop-shaped and this blindness is element-shaped.

**Claim.** The adjudicated finding R5-7 (`intakes/lane-fourier-r3-r6.md:125`, verdict **TRUE / ADOPT-AS-FACT + CARRY→F.W4**) is that *"template-loop evidence keyed to component callsites is blind to native HTML element loops"* — the deriver's `instance.loop.paper-sidebar` leaf was literally `[]` while `PaperSidebar.vue` rendered the whole TOC through three native `<li v-for>`s at lines 65/87/105. R6 cured it with a `NATIVE_TEMPLATE_LOOP` family (`:139-140`, R6-5/R6-6).

**`SvgFilters.vue` is the same blindness one level up, and the cure misses it.** Its entire template (`:58-178`, 121 lines, 68% of the file) contains:

| | count |
|---|---|
| Component callsites (PascalCase tags / registered components) | **0** |
| Native elements (`svg`, `defs`, `filter`×4, `feTurbulence`×4, `feDisplacementMap`×2, `feColorMatrix`×2, `feBlend`×2) | **16** |
| `v-for` of any kind (native or component) | **0** |
| `v-if` / dynamic binding / slot | **0** |

Verified over the template range only (`sed -n '58,178p' … | grep -n 'v-for\|v-if\|v-bind\|<[A-Z]\|<template\b.*#\|<slot'`) → **no matches**. (The whole-file form of that grep hits `:5` `ref<SVGSVGElement…>` — a script-side type argument, not a template callsite; scoping to `:58-178` is required and is what is reported here.)

A deriver that forms template evidence from *registered component callsites* — the exact model R5-7 proved is in force — sees an empty leaf for this file, precisely as it did for `PaperSidebar`. But R6-5's remedy admits a `NATIVE_TEMPLATE_LOOP` family: it counts native elements **that carry a `v-for`**. `SvgFilters.vue` has no loops, so it registers **zero rows under both the broken model and the fixed one**. The R6 cure is a superset of the R5 model along the *loop* dimension only; the blindness here is along the *element* dimension.

**This is the derivation hole through which 178 lines of dead code survived four consecutive Codex census rounds.** R3–R6 counted 571 module edges, 512 physical callsites, 1 105 mounted subjects, 66 workflows (`:106`, R4-8, ADOPT-AS-FACT). `SvgFilters.vue` contributes to the *module-edge* and *workflow* counts (it is a `.vue` file with two imports) — and contributes **nothing** to the mounted-subject/callsite denominators that would have exposed it as a leaf with 121 template lines and no consumers. A denominator that cannot see native-element-only subtrees cannot ask "does anything reference this `<filter>`?", which is the exact question L-1 answers.

**Consequence for F.W4.** The intake lane's carry (`:125`, `:184-185`) instructs F.W4's per-component D/L/C audit to *"count native element loops or it will inherit exactly this blind spot."* **That instruction is necessary but not sufficient.** This row amends it: F.W4 must count native **elements**, not merely native **loops** — and must additionally derive *reference edges for id-addressed SVG resources* (`filter`, `mask`, `clipPath`, `linearGradient`, `pattern`, `marker`), which are consumed by string id from CSS and attributes and are therefore invisible to every import-graph-based reachability analysis in the corpus. A `<filter id="x">` has no module edge to its consumer; `url(#x)` is not an import. This is a whole class of dead code that the 571-edge module graph is constitutionally unable to detect.

**Falsifier.** Exhibit (a) a component callsite or any `v-for` in `SvgFilters.vue:58-178` — `grep` above returns nothing; (b) a deriver leaf (`instance.*.svg-filters` or equivalent) carrying non-empty rows for this file — the R3–R6 artifact root is access-withdrawn (`:121`, R5-3; `:127`, R5-8), so this half is asserted from the adjudicated R5-7/R6-5 model description rather than re-measured, and I mark it as such; (c) an import-graph or callsite-graph formulation under which `url(#id)` produces a countable edge — none of `571 moduleEdges` / `512 physicalCallsites` / `1105 mountedSubjects` (`:106`, R4-8) has an id-reference dimension.

---

## §3 · MINOR

### L-6 · MINOR · Six duplicated declarations implementing one parameterised unit.

`boilOffsets`/`wobbleOffsets` (`:12`/`:16`), `baseFreq`/`wobbleBaseFreq` (`:13`/`:17`), `applyBoilFrame`/`applyWobbleFrame` (`:23-33`/`:35-45`), the two `useLineBoil` calls (`:20-21`), the two `watch`es (`:47-48`), and the two prime calls (`:52-53`). The two functions are structurally identical modulo three substitutions (selector string, offsets array, base frequency) — 11 lines each, 22 lines total, where one `makeBoil(selector, offsets, base, intervalMs)` factory returning a `{ frame, apply }` pair is ~12. Every future edit must be applied twice, and **L-13 below is the direct product of that** — the two blocks have already drifted.

**Falsifier.** Show a semantic difference between `:23-33` and `:35-45` beyond the three literals. Diffing the two bodies token-for-token: `#title-boil`→`#wobble-celestial`, `boilOffsets`→`wobbleOffsets`, `baseFreq`→`wobbleBaseFreq`. Nothing else differs.

### L-7 · MINOR · Imperative DOM mutation where a declarative binding is available, and the imperative choice is what forces every other mechanism in the file.

`:32` and `:44` reach into the DOM with `setAttribute("baseFrequency", …)`. The same effect is one binding: `:base-frequency="boilFreq"` on `:79` with `const boilFreq = computed(() => …)`. The declarative form eliminates, in one stroke: `svgRef` (`:5`, `:60`), both `querySelector`s (`:25-27`, `:37-39`), both unchecked casts (L-9), both `watch`es (`:47-48`), the entire `onMounted` prime (`:50-55`, which is dead anyway — L-10), and both `!svgRef.value` guards. Roughly 20 of the script's 56 lines exist to service the imperative choice. Vue writes `baseFrequency` correctly on SVG elements (non-DOM-prop attributes fall through to `setAttribute`), so no capability is lost.

**Falsifier.** Show that Vue's SVG attribute patching mishandles `baseFrequency` (camelCase SVG attributes are preserved for SVG namespace elements — `shouldSetAsProp` rejects it because `SVGFETurbulenceElement.baseFrequencyX` is a readonly `SVGAnimatedNumber`, not a settable string prop), or exhibit a requirement for the update to bypass Vue's scheduler.

### L-8 · MINOR · `querySelector` on every animation tick instead of a stable cached reference.

`:25-27` and `:37-39` re-run a two-part descendant selector ~6.7 and ~6.25 times per second. Both target elements are created by this component's own template and are stable for its entire lifetime. A `useTemplateRef` (Vue 3.5, already the project's idiom per repo memory) or a one-time `onMounted` resolution into a module-local would reduce this to two lookups total. ~13 selector matches/second × session duration, for a value that provably cannot change.

**Falsifier.** Show a path on which the `feTurbulence` node is replaced after mount — the template (`:66-176`) is fully static with no `v-if`, `v-for`, `<component>`, or key, so Vue never re-creates it.

### L-9 · MINOR · The `as SVGFETurbulenceElement | null` casts (`:27`, `:39`) are unchecked and buy nothing.

`querySelector` returns `Element | null`. The cast asserts a subtype without validation — and then the code uses only `setAttribute`, which is declared on `Element`. The narrowed type is never exercised. Worse: the cast is *actively misleading*, because the members it appears to unlock (`baseFrequencyX`, `baseFrequencyY`) are readonly `SVGAnimatedNumber`s that **cannot** be used to do what this code does — the `setAttribute` route is the correct one, and it needs no cast at all. If a maintainer trusts the cast and reaches for `.baseFrequencyX.baseVal = freq`, they get a runtime error in exactly the file with no tests (L-4).

**Fix (if the component survives):** drop both casts, or use the type-argument form `querySelector<SVGFETurbulenceElement>(…)`, which returns `SVGFETurbulenceElement | null` without an assertion.
**Falsifier.** Exhibit a member of `SVGFETurbulenceElement` used anywhere in `:23-45` that is not inherited from `Element`. Only `setAttribute` is called.

### L-10 · MINOR · The `onMounted` + `requestAnimationFrame` prime (`:50-55`) is provably a no-op on every mount.

At `onMounted`, `boilFrame.value === 0` (initialised at `vue.ts:114`; the scheduler's first tick sets `lastTick = timestamp` at `vue.ts:44` and cannot advance the frame on that tick, and `onMounted` runs before any RAF callback in any case). Therefore `applyBoilFrame(0)` computes `boilOffsets[0] = 0` (`:12`) → `freq = 0.015` — **byte-identical to the template's own `baseFrequency="0.015"` at `:79`**. The wobble prime is the same: `wobbleOffsets[0] = 0` (`:16`) → `0.02` = `:106`. Both writes set the attribute to the value it already has.

The `requestAnimationFrame` wrapper is separately unmotivated: `onMounted` already guarantees the SVG is in the DOM, which is the only precondition either function has.

**Falsifier.** Show a mount on which `boilFrame.value ≠ 0` — requires the scheduler to advance a frame between `useLineBoil()` (setup, `:20`) and `onMounted`, which is synchronous within the same task and admits no RAF callback. Or show `boilOffsets[0] ≠ 0` — `:12` reads `[0, 0.002, …]`.

### L-11 · MINOR · `paper-grain` / `canvas-grain`: the turbulence **alpha** channel is never flattened, so the grain is modulated by two independent noise fields.

`:129-135` and `:157-163` generate `type="fractalNoise"`, which per SVG 1.1 §15.20 produces noise on **all four** RGBA channels. `:136-140` and `:164-168` then apply `feColorMatrix type="saturate" values="0"` — whose alpha row is the **identity** row; the saturate matrix operates on RGB only. The alpha channel therefore reaches `feBlend mode="multiply"` (`:141-145`, `:169-174`) still noisy, and `feBlend` operates on premultiplied RGBA, so the composite output varies with *both* the (now-grey) luminance noise *and* an uncorrelated alpha noise field. Canonical grain recipes flatten alpha with an explicit `feColorMatrix values="…0 0 0 0 1"` or an `feComponentTransfer`/`feFuncA type="table"` — neither is present.

**Falsifier.** Exhibit a specification clause under which `feColorMatrix type="saturate"` alters the alpha channel (SVG 1.1 §15.10 gives the saturate matrix with alpha row `0 0 0 1 0` — identity), or an explicit design note declaring double-modulated grain intended. The *visual* consequence is `UNPROVEN-NEEDS-LIVE`; the filter-graph semantics are static. Note this row is moot for shipping (L-1) and is filed so the recipe is not resurrected unfixed.

### L-12 · MINOR · Colocation / Goldilocks: one module fuses a behavioural unit with two script-free static assets.

`title-boil` + `wobble-celestial` are behavioural (they own all 56 script lines and the `pencil-boil` dependency edge). `paper-grain` + `canvas-grain` are pure static markup with zero script surface. Fusing them means the two static filters can exist only if the app instantiates a Vue component, mounts it at the root, and carries a runtime dependency edge to `@mkbabb/pencil-boil` — none of which they need. 178 lines is not oversized in the absolute, but the module has **two** distinct reasons to change and only one of them is a component. `lane-frontend.md:565` lists this file first among the twelve SVG surfaces and `:369` classes it "bespoke with no glass-ui analogue" — both readings assume a single coherent unit.

**Falsifier.** Show a script dependency of `paper-grain` or `canvas-grain` at `:121-175` — both subtrees are static markup, referenced by no line of `:1-56`.

---

## §4 · INFO

### L-13 · INFO · `canvas-grain`'s terminal `feBlend result="grained"` (`:173`) is inert — and its absence on `paper-grain`'s identical primitive (`:141-145`) is copy-paste drift.

The last primitive's output *is* the filter result; a `result` name on it is addressable by nothing. `paper-grain`'s otherwise byte-identical `feBlend` omits it. Two near-clone subtrees have already diverged on a meaningless attribute — the empirical confirmation of L-6.
**Falsifier.** Exhibit a primitive after `:174` in `#canvas-grain` that references `in="grained"` — `:175` is `</filter>`.

### L-14 · INFO · `frame % offsets.length` (`:30`, `:42`) is redundant.

`vue.ts:50` already returns `(currentFrame + steps) % frameTotal` with `frameTotal = normalizeFrameCount(toValue(frameCount))` = `boilOffsets.length` (`:20`) — the modulus is applied by the producer with the same divisor. `vue.ts:42` additionally re-clamps. The consumer re-applies a bound the library already guarantees.
**Falsifier.** Exhibit a path returning `currentFrame ≥ frameTotal` — `vue.ts:42` clamps and `:50` reduces; the only other write is the `ref(0)` initialiser at `:114`. Harmless defensiveness; filed as INFO because it signals a contract the consumer does not trust.

### L-15 · INFO · The `reducedMotion` gates at `:24` and `:36` re-implement a contract the library already owns.

Under `reduce`, `useLineBoil` returns at `vue.ts:129` before `subscribers.add(sub)`; `currentFrame` therefore never changes; the watchers at `:47-48` never fire; `applyBoilFrame`/`applyWobbleFrame` are never called. The component's own PRM check is unreachable-when-true. This is defensive duplication of a producer guarantee — and it is *also* the reason L-3's staleness has two independent surfaces to go stale on.
**Falsifier.** Exhibit a path on which `boilFrame` changes while `prefersReducedMotion()` is true at enrolment time — requires `subscribers` to contain the subscriber, which `vue.ts:129` prevents. (Note this does *not* rescue L-3: the *reverse* flip — `reduce` enabled after enrolment — leaves the subscriber enrolled and ticking, and `:24`'s stale `const` reads `false`.)

---

## §5 · SUPERLATIVES (L-18 runs both ways)

### S-1 · The teardown contract is complete and correctly bound. Zero leak on unmount.

`vue.ts:153-156` registers `onUnmounted` **synchronously inside `useLineBoil`'s setup-phase call**, so it binds to the calling component instance rather than a stale one; it stops the `watchEffect` handle *and* calls `stop()`, which deletes the subscriber (`:140`) and disarms the shared RAF when it was the last active one (`:141` → `:63-73`). The component's *own* mutations need no teardown because they target nodes it owns, which die with it. There is no dangling listener, no orphaned timer, no retained node reference, and no per-instance RAF. Verified by exhaustive grep: `grep -n 'setInterval\|setTimeout\|addEventListener\|requestAnimationFrame' SvgFilters.vue` → `:19` (a comment — *"instead of manual `setInterval`"*) and `:51` (a one-shot RAF, itself dead per L-10). **Zero retained handles of any kind in the component's own code.** This is the single hardest thing in the file to get right, and it is right.

### S-2 · Delegating frame cycling to a shared singleton scheduler is the correct architecture, and the code says why.

`:19` — *"Use pencil-boil's `useLineBoil` for frame cycling instead of manual `setInterval`"*. Two animation clocks at different rates cost **one** RAF callback, not two, and not two drifting `setInterval` timers that would tick off-vsync and force layout at arbitrary points in the frame. Set this against `lane-frontend.md:558-560` (Path B, `ConvergencePlot.vue:67-69`) — a second, *independent, ungated* rAF that `lane-frontend.md:644` books as a P3 reduced-motion gap. **This component chose the shared, visibility-paused, PRM-gated clock; the convergence plot did not.** On the architecture axis the subject is the better of the two, and the corpus's own carry list agrees by omission.

### S-3 · `color-interpolation-filters="sRGB"` on **4 of 4** filters (`:75`, `:102`, `:127`, `:155`).

The SVG default is `linearRGB`. Leaving the default in place makes turbulence-derived grain and displacement render visibly wrong (washed, wrongly weighted) and costs two extra colour-space conversions per primitive. Setting `sRGB` is the correct, non-obvious, easily-forgotten choice — and it is applied **uniformly**, including on the two filters (`paper-grain`, `canvas-grain`) that were never wired to anything and where nobody would have noticed the omission. That is discipline applied without a feedback signal.

### S-4 · The defs host's a11y and hit-testing posture is exactly right (`:59-65`).

`aria-hidden="true"` (never enters the accessibility tree) + `pointer-events: none` (never intercepts a hit test) + `width="0" height="0"` + `position: absolute` (occupies no layout). Critically, it does **not** use `display: none`, which is the common shortcut for hiding a defs host and which breaks `filter`/`gradient` reference resolution in several engines. Four correct decisions where at least one wrong one is the norm.

### S-5 · Two deliberate craft details in the animation math.

(a) `Math.round(x * 10000) / 10000` (`:31`, `:43`) quantises the attribute value, preventing float-drift strings like `"0.014000000000000002"` from being written into the DOM — which would bloat the attribute and defeat any engine-side filter-result cache keyed on the serialised attribute. (b) The two intervals are `150` and `160` ms (`:20-21`) over equal-length 8-frame cycles — 1 200 ms vs 1 280 ms, beating at 19.2 s. The two boils are deliberately prevented from locking into visual sync. Neither detail is required; both are the marks of someone who has actually watched the effect run.

---

## §6 · Corpus deltas — where this challenge amends the hitherto record

Folded, not re-derived: `formation/fourier/lane-frontend.md`, `formation/fourier/CENSUS-2026-08-03.md`, `audit/codex-provenance/intakes/lane-fourier-r3-r6.md`.

| # | Corpus row | Status | This challenge |
|---|---|---|---|
| 1 | `lane-frontend.md:178` — *"`SvgFilters.vue` \| 178 \| Global `<defs>` filters; `pencil-boil` `useLineBoil`; reduced-motion gated"* | **CONTRADICT** | LOC and mechanism exact. But the row reads as a live surface. **All four filters are unreferenced (L-1); two since 2026-03-06/03-08, two never.** Amend to: *"178 · four `<defs>` filters, **all four unreferenced**; live RAF subscription driving zero pixels; delete."* |
| 2 | `lane-frontend.md:565` — SvgFilters listed **first** among the *"SVG surfaces (12 files)"* | **CONTRADICT** | It is not a surface. It renders no pixels in any state. **The live SVG surface count is 11, not 12** — which propagates to `CENSUS-2026-08-03.md:86` (*"+ 12 SVG surfaces [FE §6]"*). |
| 3 | `lane-frontend.md:616` — reduced-motion coverage table, *"JS gate · `SvgFilters.vue:7-9,24,36` · early-returns from both boil animators"* | **CONTRADICT** | Counts as coverage in the 18-reference tally, but it gates **nothing visible**. Additionally the gate is non-reactive (L-3) and its component-side half is unreachable-when-true (L-15). Deducting it, the *effective* JS-gate count is 2 (`PaperView.vue:176`, `router/index.ts:15-17,138`), not 3. |
| 4 | `lane-frontend.md:369` — *"Bespoke with no glass-ui analogue: … `SvgFilters.vue` (178) · inline SVG primitives"* | **CONTRADICT (moot)** | The correct disposition is not "bespoke, keep" but **delete**. The glass-ui-analogue question does not arise for a component with no consumers. |
| 5 | `lane-frontend.md:60,481,636` + `CENSUS:105,185,220` — `pencil-boil 0.4.1 → ^0.11.2`, "7 minors", 3 import sites, folded into the P0 tri-package transaction | **SHARPEN + AGREE** | Version facts exact (installed `0.4.1`; 3 sites). **This lane upgrades the rationale**: 0.4.1 carries two *live* defects reachable only through this component — L-2 (empty-loop RAF resurrection, penalising reduced-motion users) and L-3 (non-reactive PRM) — **both already cured at producer 0.12.0** (`/Users/mkbabb/Programming/pencil-boil/src/vue.ts:274-289, 292-299`). Not skew hygiene: a perf + a11y cure. Also: after L-1's deletion the site count drops **3 → 2**, and `useLineBoil` leaves fourier's consumed surface entirely. |
| 6 | `lane-frontend.md:644` — *"[P3] Reduced-motion gap — `stores/animation.ts` + `ConvergencePlot.vue` rAF clocks are ungated"* | **EXTEND** | Correct as far as it goes; add a **third, inverted** row: pencil-boil 0.4.1's scheduler penalises users who *do* set `reduce` (L-2). The gap is not only "gates missing" but "the gate's own failure mode costs the protected population more." |
| 7 | `lane-frontend.md:645` — *"[P3] Dead deps — `class-variance-authority`, `clsx`, `tailwind-merge`, direct `reka-ui`"* | **EXTEND** | `@mkbabb/pencil-boil` is not a dead dep (2 of 3 edges live) but **1 of its 3 import edges is dead**. Dead *edges* are a distinct and under-counted class from dead *deps* — and dead **id-addressed SVG resources** (L-5) are a third class the corpus has no row for at all. |
| 8 | `lane-frontend.md:646` — *"[P3] No unit-test runner. vitest is ABSENT"* | **AGREE + SHARPEN** | Independently confirmed. **L-4 supplies the concrete cost:** the absence let a root-mounted component run a pointless animation loop for five months across ~two dozen commits with zero signal. This is the P3's proof-of-harm; it argues for promotion. |
| 9 | `intakes/lane-fourier-r3-r6.md:125` (**R5-7**, TRUE / ADOPT-AS-FACT + CARRY→F.W4) and `:139-140` (**R6-5/R6-6**, the `NATIVE_TEMPLATE_LOOP` cure) | **ADOPT + EXTEND (L-5)** | Both adopted unaltered. **Extension:** R6's cure is *loop*-shaped; this subject's invisibility is *element*-shaped (0 component callsites, 0 `v-for`, 16 native elements). F.W4's instruction at `:185` (*"must count native element loops"*) is necessary but **insufficient** — it must count native **elements**, and separately derive **`url(#id)` reference edges** for `filter`/`mask`/`clipPath`/`gradient`/`pattern`/`marker`, which no import- or callsite-graph can represent. |
| 10 | `intakes/lane-fourier-r3-r6.md:106` (**R4-8**) — 571 module edges / 512 physical callsites / 1 105 mounted subjects, thrice-reproduced | **AGREE, with a named blind spot** | The census is stable and live-corroborated; not challenged. But **none of its dimensions can express an `url(#id)` reference**, so no figure in it could ever have surfaced L-1. Recording the blind spot beside the adopted fact. |
| 11 | `CENSUS-2026-08-03.md:85-86` — *"Canvas2D throughout, **WebGL/WebGPU ABSENT**; three independent canvases … + 12 SVG surfaces"* | **AGREE (canvas) / CORRECT (SVG count)** | The subject touches **no** canvas or WebGL path. It is disjoint from Path A (`BasisCanvas`, store-rAF, `lane-frontend.md:516-556`), Path B (`ConvergencePlot`, own rAF, `:558-560`), and Path C (`FrequencyGraph`, watch-driven, `:561-563`) — it shares no context, no palette (`lib/colors.ts` / `resolveVizColors()`), no store, and no clock. **Its only contact with the viz render path is the shared display-rate RAF budget** it consumes for nothing (L-1/L-2), which competes with Path A and Path B's clocks. SVG-surface count corrects 12 → 11 per row 2. |

---

## §7 · Remedy, in order

1. **Delete `web/src/components/decorative/SvgFilters.vue`**; remove `App.vue:7` (import) and `App.vue:22` (tag). Discharges **L-1 … L-15** in one commit; −178 LOC; −1 `pencil-boil` edge; −2 RAF subscribers at the app root.
2. **Before deleting, re-run the L-1 falsifier at the tip of `m/w1-bump-migration`** (the WT is dirty across 28 paths; the subject is not among them, but a consumer could be). The four-net search in §1 is the exact procedure.
3. **Land `pencil-boil 0.4.1 → ^0.11.2`** with the P0 tri-package transaction regardless of (1) — L-2/L-3 are producer defects that will bite the next consumer, and `svg-fourier.ts:11` + `FourierShapeExtractor.vue:144` keep the dependency live.
4. **F.W4 amendment (L-5):** the per-component D/L/C model must count native **elements** (not only native loops), and must derive **id-reference edges** for SVG `url(#…)` resources. Without both, the census cannot detect this class of dead code and will re-certify the next one.
5. **Book the observability root cause (L-4):** a root-mounted component whose animator's contract is stated against a definition it owns, rather than the consumers it serves, cannot report its own irrelevance. Whatever replaces this component should assert on the *consumer* side or not animate at all.

---

## §8 · Falsifier index

| Row | Sev | Falsify by |
|---|---|---|
| L-1 | BLOCKER | Any `url(#…)` reference to the four ids, in source, history, or shipped bundle; or an external importer of the SFC |
| L-2 | MAJOR | `subscribers` provably non-empty at every `visibilitychange`; or `schedulerTick` self-disarming on an empty set; or a second `maybeStopScheduler()` call site |
| L-3 | MAJOR | An MQL `change` listener or post-setup PRM re-read at either layer |
| L-4 | MAJOR | Any test/assert/lint/type/CI check that would have gone red at `65c1565` |
| L-5 | MAJOR | A component callsite or `v-for` in `:58-178`; or a non-empty deriver leaf for this file; or an id-reference dimension in the 571/512/1105 census |
| L-6 | MINOR | A semantic difference between `:23-33` and `:35-45` beyond three literals |
| L-7 | MINOR | Vue mishandling `baseFrequency` on an SVG element; or a need to bypass the scheduler |
| L-8 | MINOR | A post-mount replacement path for the `feTurbulence` nodes |
| L-9 | MINOR | A non-`Element` member of `SVGFETurbulenceElement` used in `:23-45` |
| L-10 | MINOR | A mount where `boilFrame.value ≠ 0`, or `boilOffsets[0] ≠ 0` |
| L-11 | MINOR | A spec clause where `saturate` alters alpha; or a design note claiming intent (visual effect `UNPROVEN-NEEDS-LIVE`) |
| L-12 | MINOR | A script dependency of `#paper-grain` or `#canvas-grain` in `:1-56` |
| L-13 | INFO | A primitive referencing `in="grained"` after `:174` |
| L-14 | INFO | A path returning `currentFrame ≥ frameTotal` from `vue.ts` |
| L-15 | INFO | A path where `boilFrame` changes while PRM was true at enrolment |
| S-1 … S-5 | — | Superlatives are falsifiable too: a leak, listener, or timer surviving unmount (S-1); a per-instance clock (S-2); a filter missing `color-interpolation-filters` (S-3); an a11y-tree or hit-test appearance (S-4); a float-drift attribute write or a locked-sync interval pair (S-5) |
