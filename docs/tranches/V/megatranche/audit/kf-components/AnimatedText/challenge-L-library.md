claude-opus-5[1m]

# CHALLENGE · `AnimatedText.vue` · axis **L (LIBRARY)**

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/shell/AnimatedText.vue` (126 L)
**Mode** static, read-only. No installs, no dev server, no browser tooling. One executed probe: an **offline SFC compile** of the target run from the session scratchpad against `keyframes.js/node_modules/@vue/compiler-sfc` (read-only; nothing written into any product tree). Its output is quoted as evidence under D-2 and D-4.
**Substrate** `keyframes.js` @ `969990f6` (last commit touching the target: `refactor(demo-home): dissolve the at-sign wrapper and custom component tier into canonical homes`); vue **3.5.35**; tailwind **4.3.0**; glass-ui installed **7.0.0**.
**Read whole:** the target; its sole consumer `shell/EditorStartScreen.vue` (191 L); its in-`<h1>` sibling `shell/TypingDots.vue` (125 L); the library modules `src/animation/orchestration/split-text/{split-text.ts,segment.ts}`, `src/animation/orchestration/stagger.ts`; `demo/styles/style.css`; glass-ui `dist/components/typewriter/{types,TypewriterText.vue}.d.ts` + `dist/typewriter.js`.
**Posture** the component is assumed DEFECTIVE until the tree acquits it. Every claim below carries a falsifier; three of them are marked where the tree *acquits*.

**Tally — defects 15 (1 BLOCKER · 3 MAJOR · 5 MINOR · 6 INFO) · superlatives 6 · corpus contradictions 3.**

---

## 0. The one-paragraph verdict

The component is *craft-solid at the CSS layer and structurally correct on a11y* — it is, in fact, the documented origin of a shipped library primitive. That is also its indictment. `keyframes.js` ships `splitText` (`src/animation/orchestration/split-text/split-text.ts`), whose own docstring names **this file** as the precedent it generalised (`:9`) and whose test mounts **this file's default string** (`test/orchestration/split-text.test.ts:30`). The demo — the library's proving ground, 68 engine-consuming files — has **zero** `splitText` consumers. The component that donated the idiom never consumed the product. Beneath that headline sit a compiled-proof reactivity break on 2 of its 3 declared props, a UTF-16 `.split("")` the library's own segmenter documents as the anti-pattern (and which a T-tranche audit row already declared discharged), and an `$attrs` fan-out onto every glyph.

---

## 1. BLOCKER

### D-1 — BLOCKER — the demo hand-rolls the primitive the library extracted **from this file**, and never consumes it

**Provenance.**

| what | where |
|---|---|
| the hand-roll | `AnimatedText.vue:74–84` (`props.text.split(/\s+/)` → `.filter` → `.map(w => ({ chars: w.split(""), startIndex }))`) + `:39` (`(word.startIndex + ci) * offsetMs`) |
| the primitive | `src/animation/orchestration/split-text/split-text.ts:230` `export function splitText(el, { by: "word" \| "grapheme" \| "line", a11y, stagger, … })` |
| the primitive **names this file** | `split-text.ts:9` — *"a screen reader reads 'Select an animation', not the 'S…e…l…e…c…t' per-glyph stream the split produced (**the AnimatedText.vue precedent, generalised into a LIGHT primitive**)"* |
| the primitive's test uses this file's default | `test/orchestration/split-text.test.ts:30` `const el = mount("Select an animation");` — `AnimatedText`'s default arrives via `EditorStartScreen.vue:73` `title: "Select an animation"` |
| it is publicly reachable | `src/animation/index.ts:107` `export { splitText, SplitTextRefusalError } from "./orchestration/split-text";` — and `vite.config.ts` self-aliases `@mkbabb/keyframes.js` → `src/animation/index.ts`, so the demo import costs nothing |
| consumers in `demo/` | **0** — `grep -rn "splitText" demo/` → no output |
| consumers in `src/` | in-degree **1** (its own barrel) per lane-library.md §"module table" row `split-text/split-text.ts \| 345 \| 1` |

**What the primitive would have replaced, line for line.** `splitText` returns `{ fragments, stagger, delays, revert, dispose }` — i.e. the cohort (D-3's `.split("")` → `segmentGraphemes` via `Intl.Segmenter`), the ready stagger (D-5's inline arithmetic → `stagger.ts:133`), and the a11y consolidation (`applyA11y`, `split-text.ts:214–219`) that this component implements by hand at `:21`/`:23`. Three of this file's four responsibilities are already owned upstream.

**Why BLOCKER and not MAJOR.** This is not a runtime break — the poster animates correctly today. It is a break of the **inv-ζ dogfood contract** that the sibling component in the *same `<h1>`* states as law: `TypingDots.vue:8–9` — *"the inv-ζ seam (the demo's signature animation IS the library, not pure CSS)"*. `splitText`'s only in-tree validation is 2 test files (`test/orchestration/split-text.test.ts`, `test/orchestration/split-a11y-oracle.test.ts`); it has never been driven by a real consumer, and the one consumer it was written for is 60 lines away and still hand-rolling. Any downstream claim that `splitText` is fit for purpose is unproven at the origin case.

**The honest counterweight (do not skip it).** `splitText` is **DOM-mutating** (`el.replaceChildren(...)`, `split-text.ts:166, 209, 258`), which collides with Vue's render ownership: adopting it means the `<span ref>` + `onMounted`/`onBeforeUnmount` + `revert()` shape, i.e. exactly `TypingDots.vue:71–107`. That is a real cost and a real regression surface (SSR/hydration, `text` prop changes mid-life). The finding is *not* "this is a two-line swap"; it is "the demo owes the primitive a consumer, and this is the consumer it was written for."

**Falsifier.** Any of: (a) a `splitText` consumer anywhere in `demo/` (grep says none); (b) an owner ruling exempting the template-only hero from inv-ζ — the target's own `:120` phrase *"this template-only hero"* gestures at one, but no ruling document was found; (c) a demonstration that `splitText`'s `by: "grapheme"` cohort cannot carry a per-fragment CSS `animation-delay` (it can — `fragments` are real `HTMLElement`s and `delays[]` is materialised at `:265`).

---

## 2. MAJOR

### D-2 — MAJOR — 2 of the 3 declared props are **not reactive**; the public prop contract is a lie for `offsetMs` and `cycleMs`

`AnimatedText.vue:69`:

```ts
const props = withDefaults(defineProps<{ text: string; offsetMs?: number; cycleMs?: number }>(), { offsetMs: 55, cycleMs: 3600 });  // :55–67
const { offsetMs, cycleMs } = props;                                                                                                 // :69
```

Vue 3.5's reactive-props-destructure transform applies **only** to a destructuring pattern whose initializer *is* the `defineProps`/`withDefaults` macro call. Destructuring a previously-bound `props` identifier is ordinary JS and is not transformed. Compiled output (my scratchpad run, `compileScript(..., { propsDestructure: true })` — the transform explicitly **enabled**, and it still does not fire):

```js
const props = __props;
const { offsetMs, cycleMs } = props;
…
style: _normalizeStyle({ '--wave-cycle': `${_unref(cycleMs)}ms` })                      // ← plain const number
…
animationDelay: `${(word.startIndex + ci) * _unref(offsetMs)}ms`                        // ← plain const number
…
_createElementVNode("span", _hoisted_1, _toDisplayString(__props.text), 1 /* TEXT */)   // ← text IS reactive
```

`_unref` on a number is identity. So `text` tracks the parent and `offsetMs`/`cycleMs` freeze at setup. The file is **half-reactive**, and the split is invisible at the call site: `props.text` is read reactively at `:76` inside the `computed`, four lines below the destructure that kills the other two.

**Bite today: none.** The sole consumer passes neither prop (`EditorStartScreen.vue:28` `<AnimatedText :text="title" />`). This is a latent contract defect on a public, documented (`:58`, `:60` JSDoc) API — MAJOR, not BLOCKER, precisely because no live consumer observes it.

**Falsifier.** Show the compiled output binding `offsetMs`/`cycleMs` through `__props.` or a getter — my run says it does not, with `propsDestructure` forced on. Or show that no consumer will ever bind them, which the JSDoc contradicts by advertising them.

**Fix (one line, either direction):** drop `:69` and read `props.offsetMs`/`props.cycleMs` in the template, or move the destructure *into* the macro call.

### D-3 — MAJOR — `w.split("")` is a UTF-16 **code-unit** split; the library's own segmenter documents it as the anti-pattern

`AnimatedText.vue:82` — `return { text: w, chars: w.split(""), startIndex };`

`src/animation/orchestration/split-text/segment.ts:4–6`:

> *"grapheme-correct splitting handles emoji, combining marks, and ZWJ sequences that **a naive `text.split("")` shreds into mojibake**"*

`.split("")` breaks surrogate pairs (any astral codepoint → two lone surrogates → two `<span>`s of `�`), separates combining marks from their base (`e` + U+0301 renders the accent alone in its own inline-block), and shreds ZWJ emoji sequences into their components. `segment.ts:62` `segmentGraphemes` (`Intl.Segmenter`, `granularity: "grapheme"`, with a `Array.from` codepoint fallback at `:73`) is the in-repo answer.

**Bite today: none** — the default `"Select an animation"` is pure ASCII. But `text: string` is a **required public prop** on a component named `AnimatedText`, and the consumer's `title` is itself a prop (`EditorStartScreen.vue:66–71`) that any caller can set.

**Corpus contradiction — see §5, C-2.** `docs/tranches/G/audit/r-animation-sota.md:109` declares this exact bug DISCHARGED. It is not; the per-char rebirth (`AnimatedText.vue:2–20`) reintroduced it and the ledger row was never re-opened.

**Falsifier.** Prove `text` is unreachable from non-ASCII input — it is not (public prop, chained through a second public prop). Or prove `.split("")` is grapheme-safe — `segment.ts:4–6` and `:59–61` say otherwise in this repo's own voice.

### D-4 — MAJOR — `v-bind="$attrs"` fans every consumer attribute onto **N glyph spans**, on an `aria-hidden` layer

`AnimatedText.vue:37` puts `v-bind="$attrs"` inside the per-char `v-for` (`:34`), under `defineOptions({ inheritAttrs: false })` (`:53`). Compiled:

```js
_createElementBlock("span", _mergeProps(
  { key: `${ci}-${ch}`, class: "wave-char" },
  { ref_for: true },
  _ctx.$attrs,                                   // ← every attr, on every glyph
  { style: { animationDelay: … } }
), _toDisplayString(ch), 17 /* TEXT, FULL_PROPS */)
```

Four consequences, all certain from the compiled form:

1. **Duplicate IDs.** `<AnimatedText id="hero-line">` emits 17 elements with `id="hero-line"` — invalid DOM, and `getElementById`/`aria-labelledby`/`document.querySelector` all silently take the first glyph.
2. **N-fold listeners on a layer AT cannot reach.** `@click` lands on all 17 `aria-hidden="true"` spans (`:23`) and on **none** of the `sr-only` mirror (`:21`) — a consumer that makes the hero interactive gets a keyboard/AT dead end by construction.
3. **`FULL_PROPS` patch flag (17)** on every glyph: Vue abandons the fast path and full-diffs all props of all N nodes on every re-render of the fragment. Negligible at 17 glyphs; it is a *scaling* property of a component whose input length is unbounded.
4. **The `sr-only` mirror never receives attrs** — so `data-testid`, `lang`, `dir`, or a `class` intended for the whole component apply to the decorative half only. `dir="rtl"` on the visual layer with an unmarked mirror is a live correctness split.

The comment at `:51–52` justifies only case (4)-as-a-feature ("decorative classes … still land on the moving glyphs"). `class` and `style` are the *only* attrs Vue merges rather than overwrites; the justification does not extend to the id/event/aria surface it silently opened.

**Falsifier.** Show the component is private-by-convention and its only call site will never pass an attribute — `EditorStartScreen.vue:28` passes none today, which makes this latent, not absent. A narrower binding (`:class="$attrs.class"` on the chars, the rest on the mirror) removes the whole class of failure at zero cost.

---

## 3. MINOR

### D-5 — MINOR — the stagger is hand-rolled arithmetic **and** unbounded: the wave aliases past 65 glyphs

`AnimatedText.vue:39` — `animationDelay: \`${(word.startIndex + ci) * offsetMs}ms\``, with `startIndex` accumulated at `:78–82`.

`stagger(count, { each, from: "first" })` (`src/animation/orchestration/stagger.ts:133`) is the library's owned delay-distribution primitive and produces exactly this ramp — *"the delay is exactly `distance · each` … no float drift"* (`stagger.ts:165–166`). The sibling in the same `<h1>` already consumes it: `TypingDots.vue:28, 61–63`.

The hand-roll additionally has **no bound against `cycleMs`**. With the defaults, `3600 / 55 = 65.45` — at the 66th glyph the delay exceeds one full cycle and the wave wraps: glyph 66 fires in phase with glyph 1, so the "one ripple crossing the line" contract asserted at `:16–18` silently becomes two ripples, then three. No clamp, no normalisation, no warning.

**Falsifier.** Cap `text` at ≤65 non-space glyphs by contract — nothing in the tree does (`text: string`, `EditorStartScreen.vue:66` `title?: string`). Or show that `animation-delay > animation-duration` on an `infinite` animation does not alias — it does, by definition of the phase offset.

### D-6 — MINOR — `display: inline-block` on `.wave-word` does **not** make a word unbreakable; the asserted invariant is unenforced

`AnimatedText.vue:88–92`:

> *"Words own wrapping: inline-block keeps each word **unbreakable** so the line breaks only at real word boundaries (the balance substrate)."*

An `inline-block` with `width: auto` is shrink-to-fit: `min(max(min-content, available), max-content)`. Its children here are per-char `inline-block`s (`:98–99`) — atomic inlines, each a soft-wrap opportunity — so the word's **min-content width is one glyph**, not the whole word. When available inline size drops below the word's max-content, the word breaks mid-word with no hyphen. `inline-block` prevents *nothing*; `white-space: nowrap` (or `text-wrap: nowrap`) on `.wave-word` is the declaration that would make the comment true, and it is absent.

Whether it fires at a supported rung is **UNPROVEN-NEEDS-LIVE**: the longest default word is `animation` (9 glyphs) at `text-display-mega` desktop / `--type-display-4` ≤1023px (`EditorStartScreen.vue:117–127`), inside `.hero-band { padding-inline: clamp(2rem, 5vw, 4.5rem) }` on a `w-screen` band (`:18, :93`). The *mechanism* is certain from source; only the *trigger width* needs a viewport.

**Falsifier.** Render the hero at the narrowest supported viewport with the longest supported word and observe no mid-word break at any rung — that acquits the trigger, not the missing declaration.

### D-7 — MINOR — the two-tier design is justified by a `text-wrap: balance` substrate **that does not exist on the consumer**, and the library recorded the opposite conclusion

`AnimatedText.vue:14–16` justifies the WORD tier: *"inline-block wrappers, so `text-wrap: balance` still breaks at real word boundaries"*; `:89` calls it *"the balance substrate"*.

`grep -rn "text-wrap" demo/` returns **exactly 3 hits**:

```
demo/components/instrument/shell/AnimatedText.vue:15        ← the claim itself
demo/components/instrument/shell/EditorStartScreen.vue:174  ← .start-screen-prose { text-wrap: pretty }
demo/components/instrument/shell/EditorStartScreen.vue:184  ← .start-screen-subtitle { text-wrap: balance }  (≤1023px only)
```

Neither lands on `<h1 class="hero-display text-display-mega p-0">` (`EditorStartScreen.vue:27`). `.hero-display` sets only `line-height/font-weight/font-synthesis/color` (`:105–110`); the `@layer demo-typography` rung override (`demo/styles/style.css:263–274`) sets only `font-weight`/`letter-spacing`; glass-ui's stylesheets carry no `text-wrap: balance` (`grep` over `dist/styles/*.css` → none). **The substrate is not applied to this element at any breakpoint.**

Worse, the library's own segmenter records the opposite conclusion about the same lesson — `segment.ts:11–13`:

> *"kept as a live text node so the browser can still wrap the run at real break opportunities; **the per-glyph inline-blocks otherwise defeat `text-wrap: balance`**, the AnimatedText X-5 lesson"*

`splitText` therefore solves X-5 with **live whitespace text nodes** (`split-text.ts:119–122`), a different mechanism from this file's `margin-inline-end` (`:30–31`). Both are defensible; the demo and the library having *divergent* answers to the same named lesson, with the demo's justification pointing at a property nothing sets, is the defect.

Second instance of the same drift: `docs/frontend-design/demo/home.md:67, 188, 368, 414` all cite `AnimatedText.vue:78–91` `@keyframes liftDown`. The keyframe is `charLift` at `:103` and lines 78–91 are the `words` computed. Four stale doc references to a keyframe that no longer exists under a name that no longer exists.

**Falsifier.** Produce a rule applying `text-wrap: balance` to the hero `<h1>` (Tailwind utility, glass-ui cascade, or inherited) — I searched demo CSS, the scoped blocks, and glass-ui `dist/styles/` and found none. Inheritance would not help: `text-wrap` is inherited, but no ancestor sets `balance` either (only `pretty` on the sibling prose class, which is not an ancestor).

### D-8 — MINOR — a hand-mirrored PRM `@media` block that its own sibling **retired** onto the engine authority

`AnimatedText.vue:118–125` carries `@media (prefers-reduced-motion: reduce) { .wave-char { animation: none } }`, and its comment concedes the duplication outright: *"the CSS mirror of the engine's `withReducedMotion` authority for this template-only hero"* (`:119–120`).

`TypingDots.vue:83–85`, 60 lines away in the same `<h1>`:

> *"`respectReducedMotion` routes the PRM resting frame through the shared `withReducedMotion` authority (**replacing the old hand-mirrored `@media` block**)."*

— and does it at `:91` `respectReducedMotion: true`. The authority is `src/animation/internal/reduced-motion.ts:153` `withReducedMotion`, consumed by `group/lifecycle.ts:79`.

So one `<h1>` ships **two** PRM mechanisms, and the CSS one is the one its sibling's changelog says was replaced. Note the CSS mirror is *also weaker*: `animation: none` on a media query is evaluated once by the cascade, whereas the engine authority *"re-consults this per tick"* (`reduced-motion.ts:54`), i.e. it honours a mid-session OS toggle. lane-frontend §6.5 lists `AnimatedText.vue:121` as one of 10 PRM sites and calls the mechanism spread *"conscientious but inconsistent"* — this is that inconsistency at its sharpest, inside a single element.

**Falsifier.** Show that a template-only CSS animation cannot route through `withReducedMotion` — true *as long as* D-1 stands. The two findings are coupled: adopting `splitText` + a `CSSKeyframesAnimation` (the `TypingDots` shape) dissolves D-8 for free. If the owner rules the hero stays template-only, D-8 downgrades to INFO and the `@media` block is correct.

### D-9 — MINOR — zero test coverage, on the LCP node, for a contract the library tests twice

```
$ grep -rln "AnimatedText\|wave-char\|hero-display" test/   → (no output)
```

The a11y mirror (`:21`/`:23`) — the component's *entire reason for its current shape* — has no assertion anywhere. Meanwhile the primitive extracted from it carries **two** gates: `test/orchestration/split-text.test.ts` (jsdom cohort/stagger/a11y-attribute/revert) and `test/orchestration/split-a11y-oracle.test.ts` (the browser **computed accessible-name equality** oracle, per `split-text.test.ts:7–9`).

Additionally, the G-tranche specified a standing guard that is not in the tree: `docs/tranches/G/G.md:409` — *"an `AnimatedText` inter-word-gap > 0 assertion … revert the spacing → the inter-word-gap assertion reds"*. `grep -rln "wave-word\|inter-word\|Selectan" test/` matches only `test/orchestration/split-text.test.ts`. The X-5 regression that the file's own header (`:10–13`) treats as the lesson-of-record is guarded by prose alone.

**Falsifier.** Point at a Playwright/vitest spec asserting either the accessible name of the hero `<h1>` or a non-zero inter-word gap. I found none in `test/`.

---

## 4. INFO

| id | finding | provenance | falsifier |
|---|---|---|---|
| **D-10** | **Two-sourced default.** `cycleMs: 3600` (`:65`) and `var(--wave-cycle, 3.6s)` (`:100`) encode the same number twice. The CSS fallback is **dead**: `:24` sets `--wave-cycle` unconditionally on the wrapper, so the `3.6s` branch is unreachable. Drift-by-edit surface with no consumer. | `:24, :65, :100` | Find a render path where `--wave-cycle` is unset — `:24` is not conditional. |
| **D-11** | **No prop validation.** `cycleMs: 0` → `animation-duration: 0ms` → the poster is dead (no error, no warning). Negative `offsetMs` → negative `animation-delay`, i.e. every glyph starts mid-cycle, wave inverted. `offsetMs`/`cycleMs` are plain `number` with no clamp, no `Number.isFinite` guard, no dev-mode assert. Contrast the library's fail-explicit posture: `stagger.ts:139–147` **throws** `AnimationOptionError` rather than silently ignoring a bad `ease`. | `:55–67`; `stagger.ts:139–147` | Show a caller-side guard — there is none; the props are public. |
| **D-12** | **Colocation carry, unlanded.** `U.B5` ordered the home-hero trio (`HeroAurora`/`AnimatedText`/`TypingDots`) **out** of the shared editor shell into `app/` (`docs/tranches/U/waves/U.B.md:135, 394–403`; `docs/tranches/U/audit/lane-18-…:66–88, 210`). The file is still at `components/instrument/shell/`, its sole consumer is `shell/EditorStartScreen.vue:62`, and that consumer is itself hero-only. Three components sit in a directory named for a facility none of them serve. | tree path; `U.B.md:135` | A ruling superseding U.B5 — none found in `docs/tranches/V/`. |
| **D-13** | **Per-glyph `inline-block` disables cross-glyph shaping.** Kerning pairs and ligatures do not apply across element boundaries, so the 177 px Instrument Serif poster renders with default advance widths only — precisely the rung where a display serif's kerning matters most. Mechanism certain from source (`:99`); **magnitude UNPROVEN-NEEDS-LIVE**. Honest note: `splitText`'s `by: "grapheme"` mode has the identical property (`split-text.ts:126` `span.style.display = "inline-block"`), so this is a cost of the owner-ruled per-char design, **not** an argument against D-1. Unrecorded and unmitigated either way (no `font-kerning` / `text-rendering` / `letter-spacing` compensation anywhere in the file). | `:99`; `split-text.ts:126`; `style.css:44–55` (Instrument Serif is the display face) | Measure the `sr-only` mirror's width against the summed glyph-span widths; equal ⇒ no shaping loss at this face/rung. |
| **D-14** | **`both` fill-mode is a no-op.** `animation: charLift var(--wave-cycle, 3.6s) infinite both` (`:100`). `backwards` would hold the `0%` frame during the delay and `forwards` the `100%` frame after the (never-reached) end — but `0%` and `100%` are both `translateY(0)` (`:105, :114`), the identity. Superfluous token in a shorthand whose every other component is load-bearing. | `:100, :104–115` | Show a frame where `both` changes the rendered transform — `0%`/`100%` are identical. |
| **D-15** | **Name/behaviour mismatch + a second local `sr-only` idiom.** `AnimatedText` is a maximally generic name for a component that performs exactly one effect (`charLift`) with the amplitude, curve, and phase hard-coded (`:103–116`) and no way to reach them from props. Separately, the demo carries two visually-hidden idioms: Tailwind's `.sr-only` (here `:21`, plus `CopyButton.vue:15`, `ControlsPaneWrapper.vue:134`) and a bespoke `.sr-only-slider` clip pattern (`scenes/square/SquareScene.css:14–16`) documented as *"the canonical sr-only clip pattern"* — two canons. | `:21`; `SquareScene.css:14–16` | An owner ruling that `.sr-only-slider` is a distinct (focusable-exempt) case — its comment argues so; the *"canonical"* wording is the contested part. |

---

## 5. Corpus reconciliation (fold, cite, contradict)

### C-1 — **CONTRADICT** lane-frontend **S-5** (`AnimatedText` → glass-ui `TypewriterText`, "AMBER, 126 lines")

lane-frontend.md:354–363 files this component under the glass-ui shadow census and proposes `TypewriterText`, with the rationale *"the accessibility concern `TypewriterText` exists to solve centrally"*, hedged by *"Verify `TypewriterText` supports per-char granularity before swapping."* I verified. **It does not, and the a11y premise is also void.**

`node_modules/@mkbabb/glass-ui/dist/components/typewriter/TypewriterText.vue.d.ts` props: `ngramSize`, `baseSpeed`, `variance`, `errorRate`, `firstAnimationSpeedFactor`, `maxCharsBeforeNotice`, `continueAfterTypoProbability`, `sequentialTypoDecay`, `correctionSpeedMultiplier`, `cursorVisible/Blink/Char`, `startDelay`, `loop`, `pauseAfterType`, `pauseAfterDelete`, `deletingSpeed`. `types.d.ts` declares `TypoState`, `TypoContext`, `TypoAction` (`type_wrong` / `notice` / `backspace` / `resume`).

`TypewriterText` is a **typing simulator with typo injection and backspacing** — it *reveals* text over time. `AnimatedText` performs an **infinite idle phase-wave over already-rendered text**. There is no per-char stagger, no lift, no phase offset, and no per-fragment handle in the entire surface. This is a category error, not a swap.

The a11y half is void too: `grep -o "sr-only\|aria-hidden" dist/typewriter.js` → `1 sr-only, 2 aria-hidden` — the **same mirror idiom `AnimatedText.vue:21/:23` already implements**. There is no centralisation prize.

**Amendment.** S-5's 126 lines should move out of the glass-shadow "evaluate" column (which lane-frontend totals at 1 168 L) and into an **engine-dogfood** column against `splitText` (D-1). lane-frontend §5's roster is glass-only by construction, so the correct target was structurally invisible to it — this is a scope artefact of that lane, not an error of judgement.

### C-2 — **CONTRADICT** `docs/tranches/G/audit/r-animation-sota.md:109` (grapheme bug "DISCHARGED")

> *"**The F26-4 demo grapheme-bug is DISCHARGED:** F.W16 rewrote `AnimatedText.vue` to split by `/\s+/` into WORD spans … (the old raw-UTF-16 per-char split is gone)."*

The raw UTF-16 per-char split is **back**, at `AnimatedText.vue:82` (`w.split("")`). The discharge was true of the F.W16 word-split; the T P-HERO per-char rebirth (`:2–20`, owner ruling *"should uplift each individual char"*) reintroduced it. The rebirth's header enumerates the **two** lessons it preserved — (a) the a11y mirror, (b) the X-5 gap — and does not mention the third (grapheme safety), which it dropped. The G row should be re-opened; see D-3.

The same G-lane row's companion claim — *"`grep -rniE "splitText|Intl.Segmenter|grapheme" src/` → zero"* — is also now stale in the *other* direction: `src/animation/orchestration/split-text/` exists (`git log`: `48faab52 S.F2: SplitText primitive`). The engine's text story is no longer "the typewriter preset and the demo."

### C-3 — **CONFIRM (with an addendum)** lane-frontend **F-1** (glass-ui phantom dependency), and bound its bite on this component

lane-frontend.md:54–69 establishes glass-ui 7.0.0 installed, absent from both `package.json` and `package-lock.json`. Its bite on `AnimatedText` specifically:

- **Import boundary: ZERO exposure.** The file imports only `vue` (`:49`). It is one of the 21 `.vue` files with no glass-ui import (lane-frontend §3). *Superlative* — see S-E.
- **Token boundary: ZERO exposure.** Its scoped block references exactly one custom property, `--wave-cycle` (`:24`, `:100`), which it defines itself. No `--type-*`, no `--color-*`, no `--z-*`.
- **Cascade boundary: TOTAL, but ambient.** `.sr-only` is Tailwind's (`demo/styles/style.css:1`), not glass-ui's — so the a11y mirror survives a glass-less build. But `demo/styles/style.css:3` `@import "@mkbabb/glass-ui/styles"` is the cascade root; under a clean `npm ci` the build fails at that import long before this component renders. F-1 is a whole-tree blocker, not a component-level one.
- **Replacement boundary: the one real bite.** lane-frontend §10 orders "F-1 first — nothing below is reproducible until this lands." Under C-1 that ordering does **not** gate this component: the correct target is `splitText`, which lives in `src/` and is reached through the `vite.config.ts` self-alias, entirely inside the repo. **D-1 is independently landable ahead of F-1.**

---

## 6. Superlatives (L-18, the other direction)

### S-A — the a11y mirror is the origin of a shipped library contract

`:21` `<span class="sr-only">{{ text }}</span>` + `:23` `aria-hidden="true"` on the entire visual layer. Compiled confirmation: `_hoisted_1 = { class: "sr-only" }` with `_toDisplayString(__props.text)`, and the sibling span's static `"aria-hidden": "true"`. Consequence: the LCP `<h1>`'s accessible name computes to `"Select an animation"` — the per-glyph stream never reaches AT, and neither does `TypingDots` (also `aria-hidden`, `TypingDots.vue:14`).

This is not merely correct; **`split-text.ts:5–10` promoted it to the library's default posture** (`a11y: true`, `applyA11y` at `:214–219`), citing this file by name, and `test/orchestration/split-a11y-oracle.test.ts` exists to gate it in a browser. A demo component whose a11y idiom becomes a library default with its own browser oracle is the strongest possible evidence of a live dogfood seam — which is exactly what makes D-1 a blocker rather than a nit.

**Falsifier.** Show the visual layer contributing to the accessible name (it is `aria-hidden` on the common ancestor of all glyphs), or an ancestor `role`/`aria-*` that suppresses the mirror (`EditorStartScreen.vue:27` is a plain `<h1>`).

### S-B — the X-5 regression is closed **structurally**, not cosmetically

`:30–31` `marginInlineEnd: wi < words.length - 1 ? '0.25em' : undefined`. The historical failure (`docs/tranches/G/audit/a-demo-playwright.md:23`, `G.md:406`) was a whitespace-only text node between `inline-block` boxes being collapsed to a 0 px gap — the hero LCP rendering `"Selectananimation"`. The fix does not re-tune the separator; it **removes the entire failure mode** by making the gap a box-model property that Vue's `whitespace: 'condense'` cannot reach. The bug is not fixed, it is made unrepresentable.

Two details most implementations get wrong and this one does not: the last word gets `undefined` rather than `0`, so no trailing margin survives to offset a centred or right-ragged line; and the tag-hugging at `:33`/`:41–43` (`>​<span` … `</span​></span​>`) keeps the *intra-word* boundaries free of text nodes, so no stray space can appear between glyphs even under a `whitespace: 'preserve'` compiler setting. Belt and braces, and the braces are load-bearing under a configuration change. (`.prettierrc` sets no `htmlWhitespaceSensitivity`, so Prettier's `"css"` default preserves it for inline elements — the formatter will not undo this.)

**Falsifier.** A rendered inter-word gap of 0 px. The mechanism is a margin, not a text node; only `margin-inline-end` being overridden could zero it, and nothing in the demo targets `.wave-word`.

### S-C — the one motion parameter that must be relative, is

`:109` `transform: translateY(-0.09em)`. The header records the retired form: *"the old −10px was rung-blind at 177px"* (`:19–20`). The hero spans `text-display-mega` (desktop) → `--type-display-4` (≤1023 px, `EditorStartScreen.vue:124–126`); a px amplitude reads as a violent heave at the phone rung and an invisible twitch at the mega rung. `em` makes the wave amplitude a constant *fraction of the glyph*, which is the only scale-invariant choice. Nothing else in the file needed to be relative, and nothing else is.

**Falsifier.** Show `font-size` fixed across all rungs for this element — `EditorStartScreen.vue:117–127` explicitly steps it.

### S-D — per-keyframe `animation-timing-function`, used correctly

`:106` and `:110` declare **different** curves inside the keyframe blocks: `cubic-bezier(0.35, 0, 0.55, 1)` governs 0%→6% (the launch) and `cubic-bezier(0.22, 1, 0.36, 1)` governs 6%→14% (the settle, an over-damped ease-out). This is the correct and frequently-misunderstood semantics — a timing function declared *in* a keyframe governs the segment that *begins* at that keyframe, not the one that ends there. The result is a launch/settle asymmetry that a single shorthand easing cannot express, at zero runtime cost. The `14%, 100%` merged stop (`:112–113`) correctly leaves the long rest segment on the default, since it is an identity→identity interval.

**Falsifier.** Show either curve applying to the wrong segment — per CSS Animations §4, the per-keyframe function applies forward from its own offset.

### S-E — zero teardown surface, and zero phantom-dep exposure at the import boundary

No `onMounted`, no `onBeforeUnmount`, no listener, no `rAF`, no `ResizeObserver`, no engine handle, no `setInterval` — the file's entire script is one `computed` (`:74–84`). There is nothing to leak and nothing to guard, which is the correct trade for a purely declarative effect. Contrast the necessary machinery its sibling carries for the engine path (`TypingDots.vue:67–69` early-unmount guard + `:103–107` stop-and-clear) — and note that the T.D12 excision comment at `EditorStartScreen.vue:49–57` records a *"perpetual JS type-in interval"* that was deleted from this same hero. This component never acquired one.

Import graph: `vue` only (`:49`). Under lane-frontend F-1 it is insulated at both the import and token boundaries (C-3).

**Falsifier.** Find a subscription, timer, or observer in the file — there is none.

### S-F — transform-only, compositor-friendly, on the LCP element

Every animated property in `charLift` is `transform` (`:105`, `:109`, `:114`). No `top`, no `margin`, no `opacity`-plus-layout, nothing that triggers layout or paint. The hero `<h1>` is the demo's LCP node (`demo/styles/style.css:52–55`, which also seats a metric-matched `"Instrument Serif Fallback"` so the box does not reflow on font arrival) — animating it on the compositor thread and nowhere else is exactly right, and the header states the intent (`:20` *"Transform-only, compositor-friendly"*). Under PRM the whole thing rests (D-8 notwithstanding, the *behaviour* is correct).

**Falsifier.** A layout- or paint-triggering property inside `@keyframes charLift` — `:103–116` contains only `transform` and `animation-timing-function`.

---

## 7. Landing order (if the challenge is upheld)

1. **D-2** (one line) and **D-10**/**D-14** (two tokens) — free, no design question.
2. **D-4** — narrow the `$attrs` binding to `class` on the glyphs, everything else on the mirror.
3. **D-7** — either apply `text-wrap: balance` to `.hero-display` (making the comment true) or delete the claim; fix the four stale `liftDown` refs in `docs/frontend-design/demo/home.md`. **D-6** rides along (`white-space: nowrap` on `.wave-word`).
4. **C-2 / D-3** — re-open the G-lane discharge row.
5. **D-1** (the blocker) — adopt `splitText({ by: "grapheme", a11y: true, stagger: { each: offsetMs, from: "first" } })` on a `ref`'d host, in the `TypingDots.vue:71–107` lifecycle shape. This dissolves **D-3, D-5, and D-8** and is independently landable ahead of lane-frontend F-1 (C-3). **D-9** must land with it: the demo consumer is the missing gate on the primitive.
6. **D-12** — fold into whatever wave finally lands U.B5.

**Not recommended:** lane-frontend S-5's `TypewriterText` swap (C-1).

---

## Provenance note

Every keyframes.js and glass-ui path above was read from `/Users/mkbabb/Programming/keyframes.js` (including its `node_modules/@mkbabb/glass-ui/dist/`), read-only. The only executed code was `node` running an SFC compile and three `node -e` arithmetic/version probes, all from the session scratchpad; nothing was installed, no dev server was started, no browser was driven, and no file in keyframes.js, glass-ui, or value.js was written or mutated. The single write of this lane is this file. Claims requiring a rendered viewport are marked **UNPROVEN-NEEDS-LIVE** (D-6 trigger width, D-13 magnitude) and are deferred to the SS-13 visual audit.
