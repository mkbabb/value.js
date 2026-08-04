claude-opus-5[1m]

# CHALLENGE · `AnimatedText.vue` · axis C — CONSUMPTION · **r2 (supersedes r1 in place)**

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/shell/AnimatedText.vue` (126 lines)
**Axis** how this component consumes keyframes.js (the library) and glass-ui (the design system) — subpath choices, shadow components (S-1..S-8), value.js transitive exposure (R1 where reachable), props/emits contract quality, sibling seams.
**Mode** static, read-only. No installs, no dev servers, no browser tooling. Live-only claims marked **UNPROVEN-NEEDS-LIVE** for SS-13.
**Substrate** keyframes.js `master` HEAD `8281638c`; kf `6.0.0`; installed glass-ui **7.0.0** (undeclared — lane-frontend **F-1**); value.js `4.0.0`; vue `3.5.35`; plugin-vue `^6.0.7`.
**Corpus folded** `formation/keyframes/lane-frontend.md` (S-1..S-8, F-1, §3.1 subpath census), `formation/keyframes/lane-library.md` (§3.3 LIGHT/HEAVY firewall, §4 parse seams, §4.6 R1 blast radius), `CENSUS-2026-08-03.md`.

> **r2 disposition.** An r1 pass occupied this path. Every one of its twelve citations was re-probed against the tree; **all twelve hold**. r2 therefore *carries* r1's ledger by id rather than re-deriving it, and adds: **one severity dissent** (C-1), **two corrections** (C-9, SUP-1), **four new findings** (C-13..C-16), **one new superlative** (SUP-5). Nothing from r1 is dropped.

**Tally: 12 defects (0 BLOCKER · 5 MAJOR · 7 MINOR) · 4 INFO (2 of them corpus contradictions) · 5 SUPERLATIVES.**

---

## 0. The import manifest — the whole of it

```
demo/components/instrument/shell/AnimatedText.vue:49:import { computed } from "vue";
```

One import. `vue`.

| edge | count |
|---|--:|
| `@mkbabb/keyframes.js` / `@kf-engine` symbols | **0** |
| `@mkbabb/glass-ui` symbols (any of 73 subpaths) | **0** |
| `@mkbabb/value.js` symbols (direct or transitive) | **0** |

Against a demo where **68** files import the library under test and **42** import glass-ui (`lane-frontend.md:37-38,77`), this is the tree's most-viewed node consuming nothing. It is one of lane-frontend's 21 no-glass `.vue` (§4 roster, `126 | AnimatedText.vue | b`). Everything below follows from that.

Two design-system surfaces *are* consumed — **through the cascade, not through an import**, so no import-graph lint can see them:

| surface | producer | site |
|---|---|---|
| `text-wrap: balance` | **glass-ui** `@utility text-display-mega` (`dist/styles/typography/semantic.css`) | host `<h1 class="hero-display text-display-mega p-0">`, `EditorStartScreen.vue:27` |
| `.sr-only` | **glass-ui** `dist/styles/components.css` (Tailwind also defines it; glass-ui imports later at `styles/style.css:3` and wins) | `AnimatedText.vue:21` |

Both arrive from the package lane-frontend F-1 proved is absent from `package.json` **and** `package-lock.json`. See C-12.

---

## 1. Findings

### C-1 · **MAJOR** *(r1 filed BLOCKER — dissent recorded below)* · The hero declines `splitText`, the LIGHT primitive the library extracted **from this very component**

**Provenance.** `src/animation/orchestration/split-text/split-text.ts:1-11`:

> `splitText` — an a11y-FIRST text-splitter … the container carries the whole pre-split string as its accessible name (`aria-label`, over a naming-capable `role`) while every visual fragment is `aria-hidden` — so a screen reader reads "Select an animation", not the "S…e…l…e…c…t" per-glyph stream the split produced (**the AnimatedText.vue precedent, generalised into a LIGHT primitive**). GSAP's 2025 SplitText rewrite is the reference bar.

The library's docstring names this file, quotes its default title, and re-uses its own "S…e…l…e…c…t" phrasing (`AnimatedText.vue:12-14`). `segment.ts:13` goes further and cites this component's bug ledger by id: "**the AnimatedText X-5 lesson**".

```
$ grep -rln "splitText" demo/     → 0 files
$ grep -n  "stagger" demo/components/instrument/shell/AnimatedText.vue
  58:        /** Per-char stagger step, ms of delay per global char index. */
```

Line 58 is the finding in miniature: the prop's own JSDoc **names** the library's delay-distribution primitive (`stagger`, exported off the LIGHT barrel at `src/animation/index.ts:94`) while `:39` hand-rolls `(word.startIndex + ci) * offsetMs`. `SplitTextResult` returns the exact three things the template computes by hand — `fragments`, `stagger: StaggerFn`, materialized `delays: number[]` (`split-text.ts:88-90`).

**The three standard defenses, each killed by the tree:**

| defense | status | evidence |
|---|---|---|
| "`splitText` is heavy / behind `loadAnimationEngine`" | **FALSE** | `src/animation/index.ts:102-107` — off the **sync LIGHT barrel**, tagged "LIGHT: composes `stagger` + the platform `Intl.Segmenter`; no parser/color edge — `proof:boundary` enrols it off this barrel". No `await`, no dynamic chunk. Reconfirmed by the demo's own doctrine, `demo/kf-engine.ts:5-7`: "The LIGHT surface (SpringProgress, RAFPlayback, **stagger**, decay, …) is statically imported from the barrel". |
| "importing kf into the LCP hero adds a package edge" | **FALSE** | `TypingDots.vue:28` already does `import { loadAnimationEngine, stagger } from "@mkbabb/keyframes.js"` — and `TypingDots` renders **inside the same `<h1>`, one span away** (`EditorStartScreen.vue:28-29`). The barrel is already in the hero's graph. Marginal cost: **zero**. |
| "per-char is what the a11y gate rules out" (`docs/tranches/T/audit/lanes/26-plan-vs-landed-FGH.md:63`) | **FALSE against the shipped contract** | `split-text.ts:46` `by?: SplitBy` where `SplitBy = "word" \| "grapheme" \| "line"`; `:54` `a11y?: boolean` defaults **true**, applied at `:128`. `splitText(el,{by:"grapheme"})` yields per-grapheme fragments **with** a consolidated accessible name. The owner's per-char edict and the a11y gate are satisfied by one call. |

**Compounding.** Adopting it does not merely match the hand-roll — it *fixes* C-2 (grapheme-correct segmentation) and C-5 (live whitespace text nodes), *formalises* SUP-1, and *enrols* the hero in an oracle that already exists and already passes: `test/orchestration/split-a11y-oracle.test.ts:153` "the split container's COMPUTED accessible name == the pre-split string", with a companion at `:213` "the fragments ANIMATE under the ready stagger (browser scrub)".

**The seam (implementation note, not obstacle).** `splitText` calls `el.replaceChildren(...)`, so it cannot be aimed at the `<h1>` — which also hosts `TypingDots` (`EditorStartScreen.vue:29`). It wants a dedicated `<span ref>` inside the `h1`, driven in `onMounted`. `TypingDots.vue:55,71-101` runs exactly that shape three lines away.

**Falsifier.** Produce (a) a ruling deferring the `AnimatedText → splitText` migration, or (b) a demonstration that `splitText` cannot express a per-grapheme wave on a shared cycle with per-index delay. For (a) `grep -rn "AnimatedText" docs/ | grep -i "split\|migrat\|defer\|carry"` returns rulings *about* split posture but **no deferral**; for (b) `split-text.ts:82-98` exposes fragments + stagger + delays. Neither exists at `8281638c`.

> **Severity dissent (r2 vs r1).** r1 graded this **BLOCKER**. r2 grades it **MAJOR**. The evidence is identical and undisputed; the disagreement is purely calibration. Nothing here fails at runtime, fails the build, or degrades the shipped hero at its default props: the poster paints, reads correctly to AT, and rests under PRM. A BLOCKER grade would make a *non-consumption* — however embarrassing on a dogfood axis — indistinguishable from a shipping crash (the R1 class, `lane-library §4.6`). r2 reserves BLOCKER for the latter. **The arbiter should read this as one finding with two proposed severities, not two findings.**

---

### C-2 · **MAJOR** · `split("")` re-opens F26-4, a *formally discharged* grapheme defect — and the corpus still reads DISCHARGED

**Site.** `AnimatedText.vue:82` — `return { text: w, chars: w.split(""), startIndex };`

`String.prototype.split("")` splits by **UTF-16 code unit**. Astral characters shatter into lone surrogates; combining marks and ZWJ sequences detach from their base. Each shard then gets its own `animation-delay` (`:39`) and lifts at a different phase before rendering as U+FFFD.

**The library names this exact bug in its own source.** `segment.ts:3-6`:

> Both ride the platform `Intl.Segmenter` (the SOTA bar GSAP's 2025 rewrite set: grapheme-correct splitting handles emoji, combining marks, and ZWJ sequences that **a naive `text.split("")` shreds into mojibake**).

…and ships the fix as `segmentGraphemes` (`segment.ts:56-77`) with an `Array.from` code-point fallback for runtimes lacking `Intl.Segmenter` — "still better than `.split("")`, which breaks surrogate pairs" (`:71`).

**The regression has its own paper trail.** `docs/tranches/G/audit/r-animation-sota.md:109`:

> **The F26-4 demo grapheme-bug is DISCHARGED:** F.W16 rewrote `AnimatedText.vue` to split by `/\s+/` into WORD spans … the old raw-UTF-16 per-char split is gone.

The word-split was then rejected by the owner ("should uplift each individual char", quoted at `AnimatedText.vue:3-4`), and the per-char rebirth **restored `split("")`**. The file's header enumerates the lessons it took care to preserve — `:5-13`, "(a) a11y mirror (F.W16a)", "(b) X-5 gap" — and **F26-4 is not among them.** It fell out of the ledger. `r-animation-sota.md:109` is now false against the tree.

**Live near-miss, one prop away.** `demo/app/App.vue:50` (verified verbatim):

```
<EditorStartScreen hint="or drag M. cubert &#x1F642;&#x200D;&#x2194;&#xFE0F;" />
```

U+1F642 ZWJ U+2194 U+FE0F — a 5-code-unit ZWJ sequence, live in the tree, bound to the **sibling prop** of the one `AnimatedText` consumes (`EditorStartScreen.vue:67` `title?: string`; `:28` `<AnimatedText :text="title" />`). It renders through the plain `<h2 v-if="hint">`, so it does **not** break today — but the codebase demonstrably feeds ZWJ text into this component family, one prop over, and `title` is the same unconstrained `string`.

**Falsifier.** Show `title` is contractually ASCII-restricted. It is not: `title?: string`, unconstrained, defaulted (`EditorStartScreen.vue:73`), publicly bindable, with two mount sites (`EditorShell.vue:62`, `App.vue:50`). Or show `split("")` is grapheme-safe — `segment.ts:3-6,71` refutes that in the library's own words.

---

### C-3 · **MAJOR** · Non-reactive props destructure — `offsetMs`/`cycleMs` freeze at setup, `text` does not

**Site.** `AnimatedText.vue:69` — `const { offsetMs, cycleMs } = props;`

This is **not** Vue 3.5's reactive-props-destructure. That transform fires only on a destructuring pattern applied **directly to the `defineProps()` call**. Here `defineProps` is wrapped in `withDefaults` and assigned to `props` (`:55-67`); the destructure is a *separate statement* over an already-materialized object — a plain, one-shot read that snapshots the values into the render closure.

The template then reads the frozen setup-scope bindings:

- `:24` `:style="{ '--wave-cycle': `${cycleMs}ms` }"`
- `:39` `animationDelay: `${(word.startIndex + ci) * offsetMs}ms``

Consequence: `:offset-ms` and `:cycle-ms` are **write-once at mount**. A parent rebinding them is silently ignored.

**The asymmetry is the tell that this is an accident, not a design.** `text` *is* reactive — `:76` reads `props.text` inside the `computed`. Three props, one contract, two behaviours, no comment acknowledging the split.

**Corroboration.** `grep -rn "} = props;" demo/ --include="*.vue" --include="*.ts"` → **exactly one hit: this line**, across 184 demo files. The same-directory sibling reads `props.count` at its use sites (`TypingDots.vue:63`). Nothing would catch it: `grep -rn "propsDestructure" vite.config.ts demo/` → 0; no eslint config in the repo root, so no `vue/no-setup-props-destructure`.

**Live impact today: none** — `EditorStartScreen.vue:28` passes only `:text`. Graded on the contract, not on today's paint.

**Falsifier.** Point at a `@vitejs/plugin-vue` `script.propsDestructure` option in the build config, or a Vue release that transforms `const {} = props`. Neither exists (vue `3.5.35`, plugin-vue `^6.0.7`, zero `propsDestructure` occurrences tree-wide).

---

### C-4 · **MAJOR** · `v-bind="$attrs"` inside the `v-for` fans every fallthrough attribute onto N glyph spans

**Site.** `AnimatedText.vue:37` — `v-bind="$attrs"` sits on the **per-char** span, inside two nested `v-for`s (`:26` words × `:34` chars). With the default title (17 non-space glyphs — the count the file itself asserts at `:72`), **every** fallthrough attribute is emitted **17 times**.

The stated intent (`:51-52`) is *classes*: "decorative classes passed by a consumer still land on the moving glyphs." But `$attrs` is undifferentiated — it carries `id`, `data-*`, `title`, `role`, `aria-*`, `style`, and every `onXxx` listener alongside `class`:

- **`id="x"` → 17 duplicate ids.** Invalid HTML; `getElementById` returns the first; any `aria-labelledby="x"`/`for="x"` resolves to a single glyph.
- **`@click` → 17 listeners**, one per glyph, none on the host — no coverage of the inter-word gaps.
- **`aria-*` → dead on arrival.** All 17 copies land inside the `aria-hidden="true"` subtree (`:23`); `aria-hidden` on an ancestor removes the whole branch from the accessibility tree. Meanwhile the element that *is* the accessible name — the `sr-only` span at `:21` — receives **nothing**. A consumer passing `aria-describedby` or `role` to make the hero *more* accessible writes into the branch AT cannot see.
- **`style`** merges against the local `:style` at `:38`; `animation-delay` is precisely what a caller would reach for, and the local binding wins.

The attrs contract and the a11y contract point in opposite directions, and nothing in the file reconciles them.

**Falsifier.** Argue the consumer set is closed. True *today* — `EditorStartScreen.vue:28` passes only `:text`, and it is the sole call site (`grep -rn "AnimatedText" demo/` → 3 hits: import, tag, and a prose mention at `TypingDots.vue:4`). But `inheritAttrs:false` + an explicit `$attrs` bind + a comment advertising the behaviour is a **published contract**, in a shared `shell/` barrel (`shell/index.ts`). Demote to MINOR only if the component is sealed to one call site by ruling.

---

### C-5 · **MAJOR** · The fake inter-word gap is the strategy the library evaluated and rejected

**Site.** `AnimatedText.vue:29-32` — the gap is `margin-inline-end: 0.25em` on the word wrapper, never a rendered space; the template glues the tags shut to guarantee it (`:33`, `:41-43`, the `><span` / `</span\n>` idiom).

The hack was **earned**: `docs/tranches/G/audit/a-demo-playwright.md:23` measured the original defect ("Select" right-edge = 178px, "an" left-edge = 178px → **0px gap**; "the single most visible defect in the demo and it's on the most important element"), and `:10-13` correctly diagnoses the mechanism (Vue's `whitespace:'condense'` strips whitespace-only text nodes at **compile** time).

**But the library shipped the better answer, and named this component while doing it.** `segment.ts:9-13`:

> `"space"` (inter-unit whitespace — kept as a **live text node** so the browser can still wrap the run at real break opportunities; the per-glyph inline-blocks otherwise defeat `text-wrap: balance`, **the AnimatedText X-5 lesson**).

implemented at `split-text.ts:119-121` — `frag.appendChild(doc.createTextNode(seg.text))`. `createTextNode` runs at **runtime**, in the DOM; Vue's compile-time `condense` never sees it. The primitive is structurally immune to the bug that forced the margin.

**What the margin costs:**

1. **The visual layer's text content is `Selectananimation`.** No whitespace node exists anywhere in the subtree. Selecting and copying the poster yields the unspaced run — plus, separately, the `sr-only` mirror's correct copy (glass-ui's `.sr-only` is `clip-path:inset(50%);…position:absolute`, present in the DOM, hence selectable). Visual correctness was restored; textual correctness was not. In-page find on any multi-word query fails against the visual layer.
2. **A phantom 0.25em at every wrapped line end.** A real space is collapsed/hung at a break; a `margin-inline-end` is not. Every line breaking after a non-final word carries 0.25em of trailing width into the `text-wrap: balance` line-length computation — skewing the very algorithm the two-tier split exists to serve (SUP-2).
3. **Every soft-wrap opportunity in the visual layer is now a CB boundary between atomic inlines** (`display:inline-block` word boxes). Browsers do break there — which is exactly why the word tier is needed to stop *intra*-word breaks (SUP-2) — but the run has no belt-and-braces: an ancestor `white-space:nowrap`, or any UA declining the CB break, leaves three unbreakable boxes and a horizontally overflowing mega rung.

**Falsifier.** (1) exact clipboard string and (2) trailing-margin behaviour at a wrapped line end and (3) a 320px render: **UNPROVEN-NEEDS-LIVE**, hand to SS-13. The *source* facts underneath — no whitespace text node between glyph spans (`:33`, `:41-43`) — are static and certain.

---

### C-6 · **MINOR** · No invariant between `offsetMs` and `cycleMs` — the documented reading silently inverts past ~66 glyphs

`offsetMs` (`:64`, default 55) and `cycleMs` (`:65`, default 3600) are independent, unvalidated numbers. The design depends on a relation nothing enforces: `(glyphCount − 1) × offsetMs` must stay well under `cycleMs` for the "one ripple, then hold" reading the file documents (`:16-18`, `:96-97`).

At defaults that breaks at **≈66 glyphs** (`65 × 55 = 3575 ≈ 3600`). Past it, delays wrap the cycle and a second ripple runs concurrently with the first — continuous churn, not a sweep-and-rest. No clamp, no validator, no comment (`grep -n "clamp\|Math.min\|Math.max" AnimatedText.vue` → 0 hits). C-3 makes it uncorrectable after mount.

`stagger`'s `StaggerOptions` (`src/animation/index.ts:94-99`) owns exactly this normalization; `SplitTextResult.delays` (`split-text.ts:90`) hands back the materialized ramp.

**Falsifier.** A ruling capping hero titles below 66 glyphs, or a clamp I missed.

---

### C-7 · **MINOR** · Unvalidated `cycleMs` has a silent-death failure mode

`:24` writes `--wave-cycle: ${cycleMs}ms` with no validation; `:100` consumes it as `animation: charLift var(--wave-cycle, 3.6s) infinite both`.

A negative or `NaN` `cycleMs` yields an invalid `<time>`. `var()` substitution then makes the whole `animation` shorthand **invalid at computed-value time**; `animation` is not inherited, so it resolves to its initial value (`animation-name: none`) and the hero goes still. The `3.6s` fallback **does not rescue it** — the custom property *is* set, just to garbage, so the fallback arm never fires. No console error, no visible fallback, and (per C-3) no correction after mount.

**Falsifier.** Show the CSSOM coerces a negative `animation-duration` to `0s` rather than dropping the declaration — **UNPROVEN-NEEDS-LIVE** for exact UA behaviour. The static half — `cycleMs` reaches the cascade with zero validation — is certain.

---

### C-8 · **MINOR** · The cycle constant lives in two languages with no link

`3600` at `:65` (prop default) and `3.6s` at `:100` (the `var()` fallback) are the same number, unlinked. Change one and the fallback lies. Because the wrapper at `:24` always sets `--wave-cycle`, the fallback is unreachable on every shipped path — a dead duplicate that can drift and red nothing.

The sibling sets the house standard and this file departs from it: `TypingDots.vue:44-53` hoists `CYCLE_MS`, `STEP_MS`, `REST_OPACITY` to named constants, each with a rationale comment and a cited gate ceiling.

**Falsifier.** Show the fallback is reachable — it fires only if `--wave-cycle` is unset (a char span rendered outside the wrapper, or an SSR path with inline styles stripped; `vite.config.ts` declares three SPA modes, no SSR).

---

### C-9 · **MINOR** · **CORRECTED (r1 overstated)** · Coverage is not zero — it is browser-only, and therefore invisible to `npm test`

r1 filed "Zero automated coverage" on the strength of `grep -rn "AnimatedText" test/ e2e/` → no output. That grep is correct but the conclusion is **wrong**: it never looked at `scripts/`. The component *is* covered, by a live gate:

```
$ grep -rln "AnimatedText\|wave-char\|charLift" test/ scripts/
scripts/observe/demo/usability.mjs
```

`scripts/observe/demo/usability.mjs:159-296` (`npm run audit:lighthouse`'s sibling, "usability observation — G.W11 live behavior + T.D10 per-char hero contract", `:72`) asserts the full contract: **(2a)** inter-word gap > 0 across same-line `.wave-word` pairs (`:246-259`), **(2b)** the `sr-only` mirror spells the title *with spaces* + the `text-display-*` balance host survives (`:260-275`), **(2c)** `charCount === glyphCount` and strictly monotone per-char delays (`:276-296`).

The corrected finding is narrower and still real:

- Zero coverage under either vitest project (`library`, `demo`; `vitest.config.ts:38-57`). The `words` computed is a pure `string → {text,chars,startIndex}[]` function — trivially unit-testable, untested.
- The only enforcement requires a booted browser, so under this audit's no-browser law the shipped behaviour is **UNPROVEN-NEEDS-LIVE** end to end, and C-2/C-3/C-4 are all invisible to `npm test`.
- r1's positive half stands: the library primitive the component declined carries a dedicated a11y oracle (`test/orchestration/split-a11y-oracle.test.ts:153,213`) that adopting `splitText` would enrol the hero in for free.

**Falsifier.** A `test/**` spec naming the component. The grep above is exhaustive over `test/` and `scripts/`.

---

### C-13 · **MINOR (NEW in r2)** · The motion constants bypass glass-ui's motion register entirely

**Sites.** `:64` `offsetMs: 55` · `:65` `cycleMs: 3600` · `:109` `translateY(-0.09em)` · `:106` `cubic-bezier(0.35,0,0.55,1)` · `:110` `cubic-bezier(0.22,1,0.36,1)`.

glass-ui 7.0.0 ships the registers these shadow (`dist/styles/tokens/scheme-motion.css`, `tokens/motion-registers.css`):

```
--duration-instant .1s · --duration-control .12s · --duration-fast .2s · --duration-normal .3s
--duration-slow .45s · --duration-panel .55s · --duration-xl 1s · --duration-xxl 1.5s
--motion-stagger-default: 80ms          ← the per-item stagger step
--motion-weight: 0.618                  ← the global motion register (→ 0 under PRM)
--ease-standard / --ease-out / --ease-in / --ease-out-expo / --ease-apple / --ease-spring
```

The contrast lives *inside the same hero*. The immediate parent is fanatical about never authoring a raw number — `EditorStartScreen.vue:83-96` ("No raw vh/px magic number (the K.W3 M4/C5 ban holds)"), `:110-117` ("step one φ tier down via the published `--type-display-4` token (never a raw px)"). The hero's **geometry** is fully tokenized; the hero's **motion** is five raw literals, in the one file whose subject is motion.

**Honest scope.** Neither bezier equals a published glass-ui ease (`--ease-out-expo` is `cubic-bezier(0.16,1,0.3,1)`; `grep -r` for both literals across `src/` returns nothing, so kf's easing registry does not name them either). The remediation is *either* adopt the nearest published curve *or* publish the hero's curves as tokens. The defect is the **absence of any register membership** — not a mis-picked token.

**Falsifier.** Produce a ruling exempting the hero's clocks from the token discipline. The file's own provenance block (`:1-21`, T.D10 / OD-4 / lane 01 F2) rules on ink, granularity and a11y; it is silent on clocks. Such a ruling drops this to INFO.

---

### C-14 · **MINOR (NEW in r2)** · The PRM guard is a hardcoded binary mirror of a mechanism that is not binary

**Site.** `:118-125`:

> PRM guard: … under `prefers-reduced-motion` every char rests at its 0%/100% frame (no wave) — **the CSS mirror of the engine's `withReducedMotion` authority** for this template-only hero.

The authority it names is not a boolean. `src/animation/internal/reduced-motion.ts:96-121`:

> `ReducedMotionPolicy = boolean | number` … a `number` ∈ [0,1] — the INTENSITY: under an active query the surface scales its motion AMPLITUDE to this fraction … **the OS exposes only a binary signal; kf provides the MECHANISM, the app provides the policy.**

glass-ui exposes a third register for the same posture: `--motion-weight: 0` under `@media (prefers-reduced-motion: reduce)`, plus `:where([data-reorder],[data-autoplay]){--motion-weight:0}` — a register an app can drive.

So one `<h1>` carries **two** PRM mechanisms: `TypingDots` routes through the engine authority (`TypingDots.vue:99` `respectReducedMotion: true` — "replacing the old hand-mirrored `@media` block", `:88-92`), `AnimatedText` hardcodes `animation: none`. The hero's chars can never express a non-binary policy and cannot participate in `--motion-weight` at all — `-0.09em` is a literal, not `calc(-0.09em * var(--motion-weight))`.

Note the direction of travel: `TypingDots`'s comment records that it *migrated off* a hand-mirrored `@media` block onto the shared authority. `AnimatedText` is the un-migrated half of the same pair.

**Falsifier.** Today both resolve to the same binary paint (`TypingDots` passes `true`), so there is **no live divergence** — this is mechanism-consumption only. If the app commits to binary PRM permanently, it is cosmetic.

---

### C-15 · **MAJOR (NEW in r2)** · The live gate's per-char oracle is code-unit-based — it structurally cannot catch C-2

**Site.** `scripts/observe/demo/usability.mjs:239` builds the oracle as

```js
glyphCount: mirrorText.replace(/\s+/g, "").length,
```

— UTF-16 `.length`, the **same wrong counter** as `AnimatedText.vue:82` — and `:276-284` asserts `probe.charCount === probe.glyphCount`, failing with "the word-lump split is the REJECTED state".

For a 2-code-unit astral char the component emits 2 spans and the gate expects 2. For the 5-code-unit ZWJ sequence live at `App.vue:50` it emits 5 and expects 5. **The (2c) assertion passes on shredded text**, and reports it as the owner's ruled per-char contract being honoured.

This is why C-2 survived a formal discharge (`r-animation-sota.md:109`) and a dedicated live gate without either noticing: the component and its only oracle share one defect. Any C-2 remediation that does not also change `:239` to a grapheme count (`[...new Intl.Segmenter(undefined,{granularity:"grapheme"}).segment(s)].length`, or simply `splitText`'s own `fragments.length`) leaves the gate green on both the old and the new behaviour — i.e. leaves it unable to bite.

**Falsifier.** Show `.length` is grapheme-correct (it is not), or show the gate has a second clause that counts graphemes — `:276-296` is quoted in full above and has none.

---

### C-16 · **INFO (NEW in r2)** · `.sr-only` has two producers in the cascade and one undeclared consumer

`AnimatedText.vue:21` styles the component's entire a11y contract with a class it never declares. Two packages define it:

- Tailwind v4 core utility, via `demo/styles/style.css:1` `@import "tailwindcss"`.
- **glass-ui**, `dist/styles/components.css` → `.sr-only{clip-path:inset(50%);white-space:nowrap;border-width:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}`, via `style.css:3` `@import "@mkbabb/glass-ui/styles"`.

glass-ui imports later, so its copy is the one in force (and `clip-path:inset(50%)` — not the older `clip:rect()` — is what makes the mirror selectable/copyable, the mechanism behind C-5(1)). This corrects r1's SUP-1 falsifier, which attributed the class to Tailwind alone. It also widens C-12: F-1's phantom package supplies **both** of this component's cascade dependencies.

---

## 2. INFO

### C-10 · INFO · R1 is unreachable here — and stays unreachable on the recommended path

The R1 class (`parseCssColor("oklch()")` shipping crash, value.js 4.0.0) is **not reachable** from `AnimatedText`: zero imports beyond `vue`, zero color strings in template or CSS (`translateY`, `cubic-bezier` only, `:103-116`), and `--wave-cycle` is a custom property written straight to `style`, never a value.js parse. The demo's real R1 surface is elsewhere (`lane-library §4.6`: `useSquareTumble.ts:22`, `useSquareDemo.ts:82`, `keyframeSelector.ts:15`, `animationDescriptions.ts:76`, `KeyframesEditor.vue:186`).

This is **not** a defense of the hand-roll, because the recommended replacement is also R1-free:

- `stagger` and `splitText` carry exactly one value.js edge — `src/animation/internal/leaves.ts:28`, `export { clamp, scale, lerp, lerpArray } from "@mkbabb/value.js/math"`.
- `/math` is a **gate-verified clean leaf**: `scripts/gates/surface/boundary.mjs:122-128` allow-lists it (W97 `math-subpath-clean`), with a specifier-end lookahead at `:152` so `/mathx` cannot sneak through.
- Measured on the installed copy: `node_modules/@mkbabb/value.js/dist/subpaths/math.js` is **1 110 bytes**, has **zero** import specifiers, and contains **zero** occurrences of `parseCssColor` or `oklch`.

So "keep the LCP hero clean of value.js" buys nothing the LIGHT path does not already give: ~1.1 KB of pure math, no parser, no color engine — and the sibling in the same `<h1>` already pulls the barrel. **R1 exposure delta of adopting `splitText`: exactly zero.**

### C-11 · INFO · **Corpus contradiction — S-5 names the wrong counterpart**

`lane-frontend.md:354-363` and `CENSUS-2026-08-03.md:130` route `AnimatedText → TypewriterText` (glass-ui `/typewriter`), hedging "Verify `TypewriterText` supports per-char granularity before swapping."

**The tree answers the hedge: it does not.** The installed contract (`dist/components/typewriter/TypewriterText.vue.d.ts` + `types.d.ts`) is a **type-in simulator**:

```
Props:   text?, words?: TypewriterWord[], ngramSize?, baseSpeed?, variance?, errorRate?,
         firstAnimationSpeedFactor?, maxCharsBeforeNotice?, continueAfterTypoProbability?,
         sequentialTypoDecay?, correctionSpeedMultiplier?, cursorVisible?, cursorBlink?,
         cursorChar?, startDelay?, loop?, pauseAfterType?, pauseAfterDelete?, deletingSpeed?,
         respectReducedMotion?
Types:   TypoState = "normal"|"typo_injected"|"typing_past"|"noticed"|"correcting"|"resuming"
         TypoAction = type_correct | type_wrong | type_past_correct | notice | backspace | resume
Exposed: startTyping / stopTyping / reset / pause / resume / setCharPosition / forceWord
Emits:   start / complete / wordComplete
```

Its runtime reveals via `slice(0,n)` (`grep -o "slice(0" dist/typewriter.js` → 4 hits) and emits **no per-character node cohort at all** (`grep -o 'split("")' dist/typewriter.js` → 0); the blink is a CSS keyframe (`animations.css` `@keyframes typewriter-blink`).

`TypewriterText` *reveals* characters over time. `AnimatedText` *lifts* characters already visible. Different problem, different output shape; swapping would delete the T.D10 per-char uplift the owner ruled for. The genuine shadow is not in glass-ui at all — it is in-repo, keyframes.js's own `splitText` (C-1), which lane-frontend could not see because §5's roster is glass-ui-only by construction.

**S-5 should be re-homed** from the glass-ui shadow census to a *dogfood* census, where it becomes the exact inverse of S-8 (`TypingDots`, "JUSTIFIED BESPOKE" *because* it dogfoods): bespoke **and** non-dogfooding, on the more visible node. lane-frontend's "partial justification" at `:363` (owner rejected word-granular) also does not survive — `by:"grapheme"` (`split-text.ts:46`) satisfies the edict directly.

### C-12 · INFO · F-1 does not reach this file by import, but the design system does

F-1 (`lane-frontend.md:15` — glass-ui 7.0.0 in `node_modules`, absent from `package.json` **and** `package-lock.json`) touches `AnimatedText` through **zero** imports. It reaches it through the cascade, twice: the `text-wrap: balance` substrate the two-tier split exists to serve (SUP-2) and the `.sr-only` rule the entire a11y mirror depends on (C-16). On a clean `npm ci`, this component loses both its stated reason to exist *and* its accessible-name mechanism — while its own source stays green under every lint the repo runs, because it imports nothing.

That is the sharpest statement of this axis available: **a component with no import edges cannot be protected by any import-graph gate, and this one has two hard dependencies on an undeclared package.**

---

## 3. Superlatives (L-18 runs both ways)

### SUP-1 · The a11y mirror is right, and the library agrees in writing *(provenance corrected in r2)*

`:21` one `sr-only` span carrying the whole phrase; `:23` the visual layer `aria-hidden="true"`. AT hears "Select an animation", never the glyph stream.

This is not merely correct; it is the pattern the library subsequently **codified as its default** — `split-text.ts:47-54`, `a11y?: boolean` defaulting `true`: "consolidate the accessible name onto the container … and mark every fragment `aria-hidden`", applied at `:128` and `:205`. And `split-text.ts:9-10` credits the source by filename. **The component originated the right answer for a whole-library primitive** — the highest form of demo value there is, and it should be said plainly even while C-1 says it never adopted the generalisation it earned.

*Falsifier (r1's, corrected):* r1 attributed `.sr-only` to Tailwind. Both Tailwind **and** glass-ui define it; glass-ui imports later and wins (C-16). The mirror resolves either way, so the superlative stands — but its provenance is the design system, not the utility framework, which makes it evidence for C-12 as well.

### SUP-2 · Silent, correct consumption of a glass-ui contract it never imports — r1 tried to kill this and the tree refuted it

`:14-16` justifies the two-tier structure by claiming the word wrappers exist "so `text-wrap: balance` still breaks at real word boundaries."

r1 set out to file this as stale rationale (the S-1 pattern). `grep -rn "text-wrap" demo/` returns only `pretty` and a `balance` on the *subtitle* (`EditorStartScreen.vue:174,184`) — nothing on the `<h1>`. r2 re-ran the probe and reached the same dead end, then found the same refutation: `EditorStartScreen.vue:27` puts `text-display-mega` on the hero, and `node_modules/@mkbabb/glass-ui/dist/styles/typography/semantic.css` defines that utility with `text-wrap: balance` (alongside `--font-display`, `--type-display-mega`, `--type-leading-display`, `--type-tracking-display`).

The hero really does get `balance`, and it really does arrive from the design system. `AnimatedText` accommodates a glass-ui typography contract applied **in a different file, by a class it never sees, from a package it never imports** — and reasons correctly across all three hops. The word-tier `inline-block` is what keeps the per-glyph atomic inlines from becoming intra-word break opportunities, so `balance` still breaks only at real word boundaries. On a consumption axis, structural consumption this careful is rarer, and worth more, than an import statement. The live gate guards the host (`usability.mjs:208-213`).

*Falsifier (attempted twice, failed twice):* find no `text-wrap: balance` on the hero's cascade path. It is there, at the utility, in the installed 7.0.0.

### SUP-3 · The fragment root is handled, not stumbled into

The template has **two** root nodes (`:21`, `:22`). Vue cannot auto-inherit fallthrough attrs onto a fragment root and warns when asked to. `defineOptions({ inheritAttrs: false })` at `:53` pre-empts that and forces an explicit placement decision, with a comment stating the intent (`:51-52`). The *placement* is wrong (C-4); the *awareness* is not — and this is the only reasoned `inheritAttrs:false` in `components/instrument/shell/`. Fixing C-4 is a one-line move of `v-bind="$attrs"` to the wrapper at `:22`; the hard part is already done.

### SUP-4 · Token-derived motion amplitude, not a magic pixel

`:109` `translateY(-0.09em)` replaces a prior `-10px` the file itself indicts as "rung-blind at 177px" (`:19`). The lift now scales with the type rung, and both ends of the range are named (`:96`, "mega 177px → phone 54px") and real (`text-display-mega` desktop; `--type-display-4` below `lg`, `EditorStartScreen.vue:125`). It is also transform-only — no layout, no paint invalidation on the LCP element — stated at `:20` and honoured by the keyframe block (`:103-116`): every frame is a `transform`, with per-frame `animation-timing-function` for the asymmetric lift/settle.

*Falsifier:* find a non-transform property in `charLift`, or a raw px lift. Neither exists. (C-13's register critique is orthogonal: the *amplitude* is correctly relative; the *clock and curve* are unregistered.)

### SUP-5 · **NEW in r2** · The last-word margin conditional is a real, honoured sibling seam

`:30-31` — `wi < words.length - 1 ? '0.25em' : undefined`. The trailing word deliberately gets **no** margin, which is what lets `.hero-dots` (`EditorStartScreen.vue:29`) sit flush against the final glyph, honouring the sibling's own stated contract: "one unbreakable inline unit beside the last word (the dots never wrap apart from the title's final glyph)" (`EditorStartScreen.vue:151-154`). The template whitespace between the two components carries a newline, so Vue's `condense` removes it outright rather than condensing to a space — the ellipsis reads as part of the last word by construction. Two components, two files, one glyph-level seam, no coordinating token: correct on both sides.

*Falsifier:* an unconditional margin would float the dots 0.25em off the last glyph — measurable at the `.hero-dots` left edge. **UNPROVEN-NEEDS-LIVE.**

---

## 4. Verdict

The component is **well-crafted and badly placed.** Every local decision — the a11y mirror, the em-relative lift, the transform-only keyframes, the PRM guard, the accommodation of `text-wrap: balance`, the flush seam for its sibling — is defensible and several are exemplary. What it does not do is **consume anything**, on the one node where the demo's entire purpose is to consume.

The gap is unusually stark because the library did not merely happen to ship a fitting primitive: it shipped `splitText` **from this component's own precedent**, made it LIGHT and parser-free so a hero could use it, gave it grapheme-correct segmentation that fixes C-2, live-whitespace segments that fix C-5, an a11y default that formalises SUP-1, and a dedicated oracle that would close C-9 — and then no one came back for the hero. `TypingDots`, rendered one span away inside the same `<h1>`, already imports the barrel, already uses `stagger`, and has already migrated its PRM off a hand-mirrored `@media` block onto the shared authority. The distance between the two files is three lines of `EditorStartScreen.vue`; the distance between their consumption postures is the whole finding.

r2's own contribution sharpens the *why it persisted*: the component and its only live oracle share one defect (C-15), and the component's two hard dependencies are on a package no lint can see it using (C-12/C-16). This is a node that cannot be caught by any gate the repo currently runs.

**Recommended order.** C-3 (one line) → C-4 (one-line move) → **C-2 + C-15 + C-1 together** (adopt `splitText({by:"grapheme"})` off the LIGHT barrel *and* fix the gate's `.length` oracle in the same wave, or the gate stays unable to bite) → C-11 (re-home S-5; 126 L moves from the glass column to a dogfood column) → C-13/C-14 (register membership) → C-9 (a unit test over `words` would have caught C-2 and C-3 statically).

**Corpus corrections filed:** S-5 is re-homed (C-11 — `TypewriterText` is a category error); `docs/tranches/G/audit/r-animation-sota.md:109`'s "F26-4 DISCHARGED" is **false against the tree** (C-2); r1's "zero automated coverage" is **overstated** (C-9 — the gate exists, in `scripts/observe/`); r1's `.sr-only` provenance is **corrected** (SUP-1/C-16 — glass-ui, not Tailwind).

**For SS-13 (live):** the hero clipboard string and the trailing-margin behaviour at a wrapped line end and a 320px render (C-5); the negative-`cycleMs` failure mode (C-7); the `.hero-dots` flush seam (SUP-5).

---

## Provenance note

Every keyframes.js, glass-ui and value.js claim is sourced from the read-only trees at `/Users/mkbabb/Programming/keyframes.js` (HEAD `8281638c`) and its installed `node_modules/@mkbabb/{glass-ui@7.0.0,value.js@4.0.0}`. All twelve r1 citations were independently re-probed before being carried. No file in any repo was written, mutated or executed apart from this challenge document; no installs, no dev servers, no browser tooling. Live-behaviour claims are marked **UNPROVEN-NEEDS-LIVE** and belong to the SS-13 visual audit.
