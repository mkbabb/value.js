claude-opus-5[1m]

# CHALLENGE · `AnimatedText.vue` · axis C — CONSUMPTION

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/shell/AnimatedText.vue` (126 lines)
**Axis:** how this component consumes keyframes.js (the library) and glass-ui (the design system) — subpath choices, shadow components, value.js transitive exposure, props/emits contract, sibling seams.
**Mode:** static, read-only. No installs, no dev servers, no browser tooling. Live-only claims are marked **UNPROVEN-NEEDS-LIVE** for SS-13.
**Tree probed:** `/Users/mkbabb/Programming/keyframes.js` (demo + `src/` + `node_modules/@mkbabb/{glass-ui,value.js}` + `docs/` + `test/` + `scripts/gates/`).

**Tally: 9 defects (1 BLOCKER · 4 MAJOR · 4 MINOR) · 3 INFO (2 of them corpus contradictions) · 4 SUPERLATIVES.**

---

## 0. The import manifest — the whole of it

```
demo/components/instrument/shell/AnimatedText.vue:49:import { computed } from "vue";
```

That is the entire consumption surface. **One import. `vue`.**

- keyframes.js: **0 imports**
- `@mkbabb/glass-ui`: **0 imports** (any subpath)
- `@mkbabb/value.js`: **0 imports** (direct or transitive)

Against a demo where 68 files import the library under test (`lane-frontend.md:37–38`) and 42 import glass-ui (`lane-frontend.md:77`), this is the tree's most-viewed node consuming nothing. Everything below follows from that.

---

## 1. Findings

### C-1 · **BLOCKER** · The hero declines `splitText` — the LIGHT primitive the library extracted *from this very component*

**Provenance.** `src/animation/orchestration/split-text/split-text.ts:1–11`:

> `splitText` — an a11y-FIRST text-splitter … the container carries the whole pre-split string as its accessible name (`aria-label`, over a naming-capable `role`) while every visual fragment is `aria-hidden` — so a screen reader reads "Select an animation", not the "S…e…l…e…c…t" per-glyph stream the split produced (**the AnimatedText.vue precedent, generalised into a LIGHT primitive**). GSAP's 2025 SplitText rewrite is the reference bar.

The library's own docstring names this file. It shipped the generalisation. And:

```
$ grep -rn "splitText\|SplitText" demo/
→ (no output)
```

Zero demo consumers. The primitive that `AnimatedText.vue` motivated is dogfooded by nothing, least of all `AnimatedText.vue`.

**The three standard defenses, each killed by the tree:**

| Defense | Status | Evidence |
|---|---|---|
| "`splitText` is heavy / behind `loadAnimationEngine`" | **FALSE** | `src/animation/index.ts:102–107` — exported off the **sync root barrel**, tagged `LIGHT … no parser/color edge`. No `await`, no dynamic chunk. |
| "importing kf into the LCP hero adds a package edge" | **FALSE** | `TypingDots.vue:28` — `import { loadAnimationEngine, stagger } from "@mkbabb/keyframes.js"` — and `TypingDots` renders **inside the same `<h1>`, one span away** (`EditorStartScreen.vue:28–29`). The barrel, `stagger`, and `@mkbabb/value.js/math` are *already* in the hero's module graph. Marginal package cost of adopting `splitText`: **zero**. |
| "per-char is what the a11y gate rules out" (the corpus's own claim, `docs/tranches/T/audit/lanes/26-plan-vs-landed-FGH.md:63`) | **FALSE against the shipped contract** | `split-text.ts:41` `SplitBy = "word" \| "grapheme" \| "line"`; `:47–55` `a11y?: boolean` defaults **true**. `splitText(el, { by: "grapheme" })` yields per-grapheme fragments **with** a consolidated accessible name. The owner's per-char edict and the a11y gate are both satisfiable by one call. |

**Compounding.** `splitText` does not merely match the hand-roll — it *fixes two live defects in it* (C-2, C-5 below) and carries a dedicated oracle (`test/orchestration/split-a11y-oracle.test.ts:153` — "the split container's COMPUTED accessible name == the pre-split string") that `AnimatedText` is not enrolled in (C-9).

**The seam.** `splitText` calls `el.replaceChildren(...)`, so it cannot be pointed at the `<h1>` (which also hosts `TypingDots`, `EditorStartScreen.vue:29`). It wants a dedicated `<span ref>` inside the `h1`, mounted in `onMounted`. That is an implementation note, not an obstacle — `TypingDots.vue:55,71–101` already runs exactly that shape (a `useTemplateRef` cohort driven in `onMounted`) three lines away in the same file's sibling.

**Falsifier.** Produce (a) a ruling that defers the `AnimatedText → splitText` migration, or (b) a demonstration that `splitText`'s output cannot express a per-grapheme wave with a shared cycle and per-index delay. I searched `docs/` for both: `grep -rn "AnimatedText" docs/ | grep -i "split\|migrat\|defer\|carry"` returns rulings *about* the split posture (lane-26 above) but **no deferral**; and `SplitTextResult` exposes `fragments`, `stagger`, and materialized `delays` (`split-text.ts:82–98`) — the exact three things the template hand-computes. Either finding would demote this to MAJOR. Neither exists in the tree as of `8281638c`.

---

### C-2 · **MAJOR** · `split("")` re-opens F26-4, a *formally discharged* grapheme defect — and the corpus still reads DISCHARGED

**Site.** `AnimatedText.vue:82` — `return { text: w, chars: w.split(""), startIndex };`

`String.prototype.split("")` splits by **UTF-16 code unit**. Astral characters shatter into lone surrogates; combining marks and ZWJ sequences detach from their base.

**The library names this exact bug in its own source.** `src/animation/orchestration/split-text/segment.ts:4–7`:

> Both ride the platform `Intl.Segmenter` (the SOTA bar GSAP's 2025 rewrite set: grapheme-correct splitting handles emoji, combining marks, and ZWJ sequences that **a naive `text.split("")` shreds into mojibake**).

…and ships the fix as `segmentGraphemes` (`segment.ts:56–77`), with a code-point fallback for runtimes lacking `Intl.Segmenter`.

**The regression, with its own paper trail.** `docs/tranches/G/audit/r-animation-sota.md:109`:

> **The F26-4 demo grapheme-bug is DISCHARGED:** F.W16 rewrote `AnimatedText.vue` to split by `/\s+/` into WORD spans … the old raw-UTF-16 per-char split is gone.

The word-split was then rejected by the owner ("should uplift each individual char", quoted at `AnimatedText.vue:3–4`), and the per-char rebirth **restored `split("")`**. The file's header enumerates the lessons it took care to preserve — `:5–13`, "(a) a11y mirror (F.W16a)" and "(b) X-5 gap" — and **F26-4 is not among them.** It fell out of the ledger. `r-animation-sota.md:109` is now false against the tree.

**Live near-miss, one prop away.** `demo/app/App.vue:50`:

```
<EditorStartScreen hint="or drag M. cubert &#x1F642;&#x200D;&#x2194;&#xFE0F;" />
```

That is U+1F642 ZWJ U+2194 U+FE0F — a 5-code-unit ZWJ emoji sequence, live in the tree, bound to the **sibling prop** of the one `AnimatedText` consumes (`EditorStartScreen.vue:67` `title?: string`; `:28` `<AnimatedText :text="title" />`). The codebase demonstrably passes ZWJ text into this component family. `split("")` on that string yields 5 spans of mojibake.

**Falsifier.** Show that `title` is contractually ASCII-restricted. It is not: `title?: string`, unconstrained, defaulted (`EditorStartScreen.vue:73`), and publicly bindable — `EditorShell.vue:62` already mounts `<EditorStartScreen />` with a second call site at `App.vue:50`. Alternatively, show `split("")` is grapheme-safe; `segment.ts:4–7` and `:73–76` refute that in the library's own words.

---

### C-3 · **MAJOR** · Non-reactive props destructure — `offsetMs`/`cycleMs` freeze at setup, `text` does not

**Site.** `AnimatedText.vue:69` — `const { offsetMs, cycleMs } = props;`

This is **not** Vue 3.5's reactive-props-destructure. That transform fires only on a destructuring pattern applied **directly to the `defineProps()` call**. Here `defineProps` is wrapped in `withDefaults` and assigned to `props` (`:55–67`), and the destructure is a *separate statement* on a reactive object — a plain read that snapshots the values.

The template then reads the frozen setup-scope bindings, not the props:

- `:24` — `:style="{ '--wave-cycle': \`${cycleMs}ms\` }"`
- `:39` — `animationDelay: \`${(word.startIndex + ci) * offsetMs}ms\``

Consequence: `:offset-ms` and `:cycle-ms` are **write-once at mount**. A parent that rebinds them is silently ignored.

**The asymmetry is the tell that this is an accident, not a design.** `text` *is* reactive — `:76` reads `props.text` inside the `computed`. Three props, one contract, two behaviours, no comment acknowledging the split.

**Corroboration.** `grep -rn "} = props;" demo/ --include="*.vue" --include="*.ts"` returns **exactly one hit: this line.** Across 58 `.vue` files, it is the sole instance. And nothing would catch it: `grep -rn "propsDestructure" vite.config.ts demo/` → 0; `ls eslint.config.* .eslintrc*` → no eslint config in the repo root (so no `vue/no-setup-props-destructure`).

**Falsifier.** Point at a `@vitejs/plugin-vue` `script.propsDestructure` option in the build config, or a Vue release that transforms `const {} = props`. Neither exists — vue is `3.5.35` (`node_modules/vue/package.json`), plugin-vue `^6.0.7` (`package.json:79`), zero `propsDestructure` occurrences anywhere in the tree.

---

### C-4 · **MAJOR** · `v-bind="$attrs"` inside the `v-for` fans every fallthrough attribute onto N glyph spans

**Site.** `AnimatedText.vue:37` — `v-bind="$attrs"` sits on the **per-char** span inside `v-for="(ch, ci) in word.chars"` (`:34`).

With the default title ("Select an animation", 17 non-space glyphs — the count the file itself asserts at `:72`), **every** fallthrough attribute is emitted **17 times**.

The stated intent (`:51–52`) is *classes*:

> `$attrs` bind to the per-char visual spans (the animated layer), not the host — decorative classes passed by a consumer still land on the moving glyphs.

But `$attrs` is undifferentiated. It carries `id`, `data-*`, `title`, `role`, `aria-*`, and every `onXxx` listener alongside `class`. Concretely:

- **`id="x"` → 17 duplicate ids.** Invalid HTML; `getElementById` returns the first; any `aria-labelledby="x"` / `for="x"` association resolves to a single glyph.
- **`@click` → 17 listeners**, one per glyph, none on the host — a consumer wiring a click on the hero gets 17 handlers and no coverage of the inter-word gaps.
- **`aria-*` → dead on arrival.** All 17 copies land inside the `aria-hidden="true"` subtree (`:23`). Meanwhile the element that *is* the accessible name — the `sr-only` span at `:21` — receives **nothing**. A consumer passing `aria-describedby` or `role` to make the hero more accessible instead writes into the branch AT cannot see.

That last point is the sharp one: the attrs contract and the a11y contract point in opposite directions, and nothing in the file reconciles them.

**Falsifier.** Argue the consumer set is closed and passes no attrs. That is true *today* — `EditorStartScreen.vue:28` passes only `:text`, and it is the sole call site (`grep -rn "AnimatedText" demo/` → 3 hits: the import, the tag, and a prose mention in `TypingDots.vue:4`). But `inheritAttrs: false` plus an explicit `$attrs` bind plus a comment advertising the behaviour is a **published contract**, not an internal detail — the component invites exactly the usage that breaks it. Demote to MINOR only if the component is sealed to a single call site by ruling.

---

### C-5 · **MAJOR** · The fake inter-word gap is the strategy the library evaluated and rejected

**Site.** `AnimatedText.vue:29–32` — the inter-word gap is `margin-inline-end: 0.25em` on the word wrapper. Never a rendered space. The template glues the tags shut to guarantee it (`:33`, `:41–43` — the `><span` / `</span\n>` idiom).

The hack was **earned**: `docs/tranches/G/audit/a-demo-playwright.md:23` measured the original defect ("Select" right-edge = 178px, "an" left-edge = 178px → **0px gap**; "the single most visible defect in the demo and it's on the most important element"), and `AnimatedText.vue:10–13` correctly diagnoses the mechanism (Vue's `whitespace: 'condense'` strips whitespace-only text nodes between sibling elements at **compile** time).

**But the library shipped the better answer, and named this component while doing it.** `segment.ts:9–13`:

> `"space"` (inter-unit whitespace — kept as a **live text node** so the browser can still wrap the run at real break opportunities; the per-glyph inline-blocks otherwise defeat `text-wrap: balance`, **the AnimatedText X-5 lesson**).

`split-text.ts:120–121` implements it:

```js
// Live whitespace: keeps the run wrappable at real break points.
frag.appendChild(doc.createTextNode(seg.text));
```

`createTextNode` runs at **runtime**, in the DOM — Vue's compile-time `condense` never sees it. The primitive is structurally immune to the bug that forced the margin, so the margin is a workaround for a constraint the recommended path does not have.

**What the margin costs:**

1. **The visual layer's text content is `Selectananimation`.** Every glyph span is adjacent to the next with no whitespace node anywhere in the subtree. Selecting the poster and copying yields the unspaced run — plus, separately, the `sr-only` mirror's correct copy of the phrase (Tailwind's `sr-only` is `position:absolute;width:1px;height:1px;clip:rect(0,0,0,0)` — present in the DOM, hence selectable). The aria-hidden layer's *visual* correctness was restored; its *textual* correctness was not.
2. **A phantom 0.25em at every wrapped line end.** A real space is collapsed/hung at a line break; a `margin-inline-end` is not. Every line that breaks after a non-final word carries 0.25em of trailing width into the `text-wrap: balance` line-length computation — skewing the very algorithm the two-tier split exists to serve (SUP-2).

**Falsifier.** For (1) the exact clipboard string: **UNPROVEN-NEEDS-LIVE** — hand it to SS-13. The *source* fact underneath it is static and certain: no whitespace text node exists anywhere between the glyph spans (`:33`, `:41–43`). For (2): measure a wrapped two-line hero at ≤1023px and show the trailing margin is collapsed — **UNPROVEN-NEEDS-LIVE**; per CSS Text, margins on atomic inlines are not subject to line-end trimming, so I expect it holds.

---

### C-6 · **MINOR** · No invariant between `offsetMs` and `cycleMs` — the documented reading silently inverts past ~65 glyphs

`offsetMs` (`:64`, default 55) and `cycleMs` (`:65`, default 3600) are independent, unvalidated numbers. The design depends on a relation between them that nothing enforces: `(glyphCount − 1) × offsetMs` must stay well under `cycleMs` for the "one ripple, then hold" reading the file documents (`:16–18`, `:96–97`).

At defaults that relation breaks at **≈66 glyphs** (`65 × 55 = 3575 ≈ 3600`). Past it, delays wrap the cycle and a second ripple runs concurrently with the first — the poster reads as continuous churn rather than a sweep-and-rest. No clamp, no `validator`, no comment. C-3 makes it uncorrectable after mount.

`stagger`'s own `StaggerOptions` (`src/animation/index.ts:94–99`, `src/animation/orchestration/stagger.ts`) owns exactly this normalization, and `SplitTextResult.delays` (`split-text.ts:96`) hands back the materialized ramp.

**Falsifier.** Show a ruling capping hero titles at <66 glyphs, or a clamp I missed. `grep -n "clamp\|Math.min\|Math.max" AnimatedText.vue` → 0 hits.

---

### C-7 · **MINOR** · Unvalidated `cycleMs` has a silent-death failure mode

`:24` writes `--wave-cycle: ${cycleMs}ms` with no validation. `:100` consumes it as `animation: charLift var(--wave-cycle, 3.6s) infinite both`.

A negative or `NaN` `cycleMs` produces an invalid `<time>`. `var()` substitution then makes the whole `animation` shorthand **invalid at computed-value time** — the property resolves to its initial value (`animation: none`) and the hero goes still. Critically, the `3.6s` var-fallback **does not rescue it**: the custom property *is* set, just to garbage, so the fallback arm never fires. No console error, no visible fallback, and (per C-3) no way to correct it after mount.

**Falsifier.** Show that the CSSOM coerces a negative `animation-duration` to `0s` rather than dropping the declaration — **UNPROVEN-NEEDS-LIVE** for the exact browser behaviour. The static half — that `cycleMs` reaches the cascade with zero validation — is certain.

---

### C-8 · **MINOR** · The cycle constant lives in two languages with no link

`3600` at `:65` (the prop default) and `3.6s` at `:100` (the `var()` fallback) are the same number, unlinked. Change one and the fallback lies.

The sibling sets the house standard and this file departs from it: `TypingDots.vue:44–53` hoists `CYCLE_MS`, `STEP_MS`, `REST_OPACITY` to named constants, each with a rationale comment and a cited gate ceiling. `AnimatedText` inlines both magic numbers.

**Falsifier.** Show the fallback is unreachable (it is not — it fires whenever `--wave-cycle` is unset, e.g. if the wrapper's inline style is stripped or the char span is ever rendered outside the wrapper).

---

### C-9 · **MINOR** · Zero automated coverage, on the node that carries the demo's accessible name

```
$ grep -rn "AnimatedText" test/ e2e/     → (no output)
$ ls -d e2e tests test                    → test    (no e2e/ directory exists)
```

The hand-rolled a11y mirror — the component's single most load-bearing behaviour — has **no test at any level**. The library primitive it declined has a dedicated one: `test/orchestration/split-a11y-oracle.test.ts:153`, "the split container's COMPUTED accessible name == the pre-split string", with a companion browser-scrub assertion at `:213` ("the fragments ANIMATE under the ready stagger").

Adopting `splitText` (C-1) would enroll the hero in an oracle that already exists and already passes.

**Falsifier.** Produce a test, snapshot, or e2e spec exercising this component. I found none by any name.

---

## 2. INFO

### C-10 · INFO · R1 is unreachable here — and stays unreachable on the recommended path

The R1 class (`parseCssColor("oklch()")` shipping crash, value.js 4.0.0) is **not reachable** from `AnimatedText`: zero imports beyond `vue`, zero color strings in the template or CSS (`translateY`, `cubic-bezier` only, `:103–116`).

This is not a defense of the hand-roll, because the recommended replacement is *also* R1-free:

- `stagger` and `splitText` carry exactly one value.js edge — `src/animation/internal/leaves.ts:28`, `export { clamp, scale, lerp, lerpArray } from "@mkbabb/value.js/math"`.
- `/math` is a **gate-verified clean leaf**: `scripts/gates/surface/boundary.mjs:122–128` allow-lists it, and `:382–398` (`W97 math-subpath-clean`) bundles it as its own rolldown entry and asserts its static graph.
- Measured on the installed copy: `node_modules/@mkbabb/value.js/dist/subpaths/math.js` is **1 110 bytes**, has **zero** import specifiers, and contains **zero** occurrences of `parseCssColor` or `oklch`.

So the "keep the LCP hero clean of value.js" argument buys nothing that the light path does not already give: ~1.1 KB of pure math, no parser, no color engine. Combined with the fact that the sibling in the same `<h1>` already pulls the barrel (C-1), the R1 exposure delta of adopting `splitText` is **exactly zero**.

### C-11 · INFO · **Corpus contradiction — S-5 names the wrong counterpart**

`lane-frontend.md:354–363` and `CENSUS-2026-08-03.md:130` route `AnimatedText → TypewriterText` (glass-ui `/typewriter`), with the follow-up "Verify `TypewriterText` supports per-char granularity before swapping."

**The tree contradicts this.** `node_modules/@mkbabb/glass-ui/dist/components/typewriter/TypewriterText.vue.d.ts` and `types.d.ts` describe a **typing simulator**, not a per-char animator: `baseSpeed`, `errorRate`, `maxCharsBeforeNotice`, `continueAfterTypoProbability`, `sequentialTypoDecay`, `backspaceAcceleration`, `preBackspacePause`, `cursorChar`, `cursorBlink`, plus a full `TypoState`/`TypoAction` machine. Its runtime reveals via `slice(0, n)` (`grep -o "slice(0" dist/typewriter.js` → 4 hits) and exposes **no per-character node cohort at all** — `grep -o "split(\"\")" dist/typewriter.js` → 0.

`TypewriterText` *reveals* characters over time. `AnimatedText` *lifts* characters that are already visible. Different problem, different output shape. S-5's own question is therefore answerable now, statically: **`TypewriterText` does not support per-char granularity, because it does not emit per-char elements** — the reveal *is* the product.

The genuine shadow is not in glass-ui at all. It is in-repo: keyframes.js's own `splitText` (C-1). S-5 should be **re-homed from the glass-ui shadow census to the dogfood census**, where it joins S-8 (`TypingDots`, "JUSTIFIED BESPOKE" *because* it dogfoods) as its exact inverse: bespoke **and** non-dogfooding, on the more visible node.

The `lane-frontend.md:363` "partial justification" (owner rejected word-granular) also does not survive: `splitText`'s `by: "grapheme"` (`split-text.ts:41`) satisfies the owner's edict directly.

### C-12 · INFO · F-1 does not reach this file, but the design system does

The phantom-dependency finding (`lane-frontend.md:15` — `@mkbabb/glass-ui` in `node_modules` at 7.0.0, absent from `package.json` **and** `package-lock.json`) does not touch `AnimatedText` through imports: it has none. It reaches it through the **cascade** — see SUP-2, where the hero's wrapping substrate arrives from `@utility text-display-mega` in a package that `npm ci` would not install. If F-1 is ever exercised on a clean checkout, this component's word tier loses its stated reason to exist along with the rest of the cascade.

---

## 3. Superlatives (L-18 runs both ways)

### SUP-1 · The a11y mirror is right, and the library agrees in writing

`:21` — one `sr-only` span carrying the whole phrase. `:23` — the visual layer `aria-hidden="true"`. AT hears "Select an animation", never the glyph stream.

This is not merely correct; it is the pattern the library subsequently **codified as its default**. `split-text.ts:47–55`, `a11y?: boolean` defaulting `true`: "consolidate the accessible name onto the container … and mark every fragment `aria-hidden`". And `split-text.ts:9–10` credits the source by filename: "the AnimatedText.vue precedent, generalised into a LIGHT primitive."

The component **originated the right answer for a whole-library primitive.** That is the highest form of demo value there is, and it should be said plainly even while C-1 says the component never adopted the generalisation it earned.

*Falsifier:* show the `sr-only` class is unresolved (it would make the mirror visible, not absent). Tailwind v4 (`package.json:101`, `^4.3.0`) ships `sr-only` as a core utility, `@import "tailwindcss"` is the first line of `demo/styles/style.css`, no `@source` narrowing exists (`grep -rn "@source" demo/styles/*.css` → 0), and `CopyButton.vue:15` uses the same class independently.

### SUP-2 · Silent, correct consumption of a glass-ui contract it never imports — I tried to kill this and the tree refuted me

`:14–16` justifies the two-tier structure by claiming the word wrappers exist "so `text-wrap: balance` still breaks at real word boundaries."

I set out to file this as stale rationale — the S-1 pattern, where a documented justification outlives the fact behind it. `grep -rn "text-wrap" demo/` returns only `pretty` and a `balance` on the *subtitle* (`EditorStartScreen.vue:174,184`), nothing on the `<h1>`. The claim looked unsupported.

**It is supported, from `node_modules`.** `EditorStartScreen.vue:27` puts `text-display-mega` on the hero, and `node_modules/@mkbabb/glass-ui/dist/styles/typography/semantic.css` defines:

```css
@utility text-display-mega { font-family: var(--font-display); font-size: var(--type-display-mega);
  line-height: var(--type-leading-display); letter-spacing: var(--type-tracking-display);
  font-optical-sizing: auto; font-weight: var(--type-weight-display); text-wrap: balance; }
```

The hero really does get `text-wrap: balance`, and it really does arrive from the design system. `AnimatedText` accommodates a glass-ui typography contract that is applied **in a different file, by a class it never sees, from a package it never imports** — and reasons about it correctly across all three hops. On a consumption axis, structural consumption this careful is rarer and worth more than an import statement.

*Falsifier (mine, and it failed):* find no `text-wrap: balance` on the hero's cascade path. It is there, at the utility, in the installed 7.0.0.

### SUP-3 · The fragment root is handled, not stumbled into

The template has **two** root nodes (`:21` and `:22`). Vue warns on fragment roots receiving fallthrough attrs ("Extraneous non-props attributes … could not be automatically inherited"). `defineOptions({ inheritAttrs: false })` at `:53` pre-empts the warning and forces an explicit placement decision, with a comment stating the intent (`:51–52`).

The *placement* is wrong (C-4). The *awareness* is not — and this is the only reasoned `inheritAttrs: false` in `components/instrument/shell/`. Fixing C-4 is a one-line move of `v-bind="$attrs"` from the char span to the wrapper at `:22`; the hard part (recognising a fragment root needs a decision at all) is already done.

### SUP-4 · Token-derived motion amplitude, not a magic pixel

`:109` — `translateY(-0.09em)`, replacing a prior `-10px` the file itself indicts as "rung-blind at 177px" (`:19`). The lift now scales with the type rung, and both ends of the range are named (`:96`, "mega 177px → phone 54px") and real: `text-display-mega` on desktop, `--type-display-4` below `lg` (`EditorStartScreen.vue:125`).

It is also transform-only — no layout, no paint invalidation on the LCP element — which the file states (`:20`) and the keyframe block (`:103–116`) honours: every frame is a `transform`, with per-frame `animation-timing-function` for the asymmetric lift/settle. Under a demo whose whole subject is animation quality, the LCP node not causing layout is the right invariant, correctly held.

*Falsifier:* find a non-transform property in `charLift`, or a raw px lift. There is neither.

---

## 4. Verdict

The component is **well-crafted and badly placed.** Every local decision — the a11y mirror, the em-relative lift, the transform-only keyframes, the PRM guard, the accommodation of `text-wrap: balance` — is defensible and several are exemplary. What it does not do is **consume anything**, on the one node where the demo's entire purpose is to consume.

The gap is unusually stark because the library did not merely happen to ship a fitting primitive: it shipped `splitText` **from this component's own precedent**, made it LIGHT and parser-free so a hero could use it, gave it grapheme-correct segmentation that fixes C-2, live-whitespace segments that fix C-5, an a11y default that formalises SUP-1, and a dedicated oracle that would close C-9 — and then no one came back for the hero. `TypingDots`, rendered one span away inside the same `<h1>`, already imports the barrel and already uses `stagger`. The distance between the two files is three lines of `EditorStartScreen.vue`; the distance between their consumption postures is the whole finding.

**Corpus corrections filed:** S-5 is re-homed (C-11 — `TypewriterText` is a category error; the counterpart is in-repo `splitText`), and `docs/tranches/G/audit/r-animation-sota.md:109`'s "F26-4 DISCHARGED" is **false against the tree** (C-2).

**For SS-13 (live):** the hero clipboard string (C-5), trailing-margin behaviour at a wrapped line end (C-5), and the negative-`cycleMs` failure mode (C-7).
