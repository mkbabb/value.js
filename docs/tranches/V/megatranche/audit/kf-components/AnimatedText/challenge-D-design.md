claude-opus-5[1m]

# CHALLENGE · `AnimatedText` · axis D (DESIGN)

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/shell/AnimatedText.vue` (126 lines)
**Mode** static, read-only, source-derived. No installs, no dev server, no browser tooling. Any claim needing a rendered pixel is stamped **UNPROVEN-NEEDS-LIVE** and routed to SS-13.
**Date** 2026-08-04. keyframes.js and glass-ui are READ-ONLY evidence; the only file written by this lane is this one.

> **Supersession note.** A prior axis-D pass wrote this path on 2026-08-03 (12 defects / 5 superlatives / 3 dropped). This pass re-derived the component independently and then reconciled. The prior pass is **not discarded**: every one of its findings was re-verified against the tree and carried forward, three of them strengthened with evidence it did not have. Provenance is marked per row — `[prior · verified]`, `[prior · strengthened]`, `[NEW]`. Nothing is lost: head, tail, or interval.
>
> The material change is **D-4**: the prior pass searched glass-ui for a grapheme splitter, found `splitGraphemes` unexported, and concluded the remedy was a producer ask gated behind census F-1. It did not look in **keyframes.js itself**, where `splitText` — grapheme-correct, whitespace-preserving, a11y-consolidating, barrel-exported, and written *from this component by name* — has been shipping since 2026-07-03. That relocates the remedy for four findings from "blocked on a producer ask" to "one import away", and it re-opens the census's S-5 verdict a second time.

**Read whole (read-only):**

| file | why |
|---|---|
| `demo/components/instrument/shell/AnimatedText.vue` | the target |
| `demo/components/instrument/shell/EditorStartScreen.vue` | the sole consumer (`:28`, `:62`) — owns the h1, the rung, the leading, the band |
| `demo/components/instrument/shell/TypingDots.vue` | the h1's other child; decides the heading's accessible name; the inv-ζ dogfood reference (`:8–9`) |
| `demo/components/instrument/shell/HeroAurora.vue` | what is painted UNDER the hero; the opacity ceiling (`:44`) |
| `demo/components/instrument/shell/index.ts` · `demo/app/App.vue:45–51` | the consumer's consumers — prop-surface reality, and the emoji evidence for D-5 |
| `demo/styles/style.css` (`:42–100`, `:250–294`) | `--font-display`, `font-synthesis:none`, the Capsize fallback, the `@layer demo-typography` rung override |
| **`src/animation/orchestration/split-text/{split-text,segment,refuse,index}.ts`** | **the library's own splitter — its docblock names this component as its precedent** |
| **`src/animation/index.ts:107`** | confirms `splitText` is barrel-exported |
| `node_modules/@mkbabb/glass-ui/dist/styles/typography/{scale,semantic}.css` | `--type-display-mega` / `-4`; the `text-display-mega` utility body |
| `node_modules/@mkbabb/glass-ui/dist/styles/tokens/{color-radius,dark-arm,light-dark}.css` | `--foreground` / `--background` / `--neutral-0` for the contrast computation |
| `node_modules/@mkbabb/glass-ui/dist/styles/components.css` | the resolved `.sr-only` body |
| `node_modules/@mkbabb/glass-ui/dist/components/typewriter/**` + `package.json` `exports` | the S-5 counterpart contract; `splitGraphemes` reachability |

**Corpus folded:** census lane `formation/keyframes/lane-frontend.md` — **S-5** (AnimatedText → `TypewriterText`, AMBER/evaluate), **S-8** (TypingDots justified bespoke, the inv-ζ seam), **§6.3** (0 `--kf-*`, 98 unprefixed demo tokens), **§6.4** (`charLift` is 1 of 9 demo `@keyframes`), **§6.5** (`:121` is 1 of 10 CSS PRM sites), **F-1** (glass-ui phantom dep). Cited inline; **contradicted explicitly at §5**.

**Severity convention.** `defects` = BLOCKER + MAJOR + MINOR. INFO rows are notes, not defects. Superlatives graded under the same falsifier rule (L-18 runs both ways).

**Tally — defects 14 (BLOCKER 0 · MAJOR 4 · MINOR 10) · INFO 6 · SUPERLATIVE 7 · FALSIFIED-AND-DROPPED 5**

---

## 1. What the component actually is

Two-tier decomposition of one string. Tier 1 = words (`.wave-word`, `display:inline-block`, `margin-inline-end:0.25em` on all but the last) — owns wrapping and the inter-word gap. Tier 2 = chars (`.wave-char`, `display:inline-block`, `animation: charLift var(--wave-cycle,3.6s) infinite both`, `animation-delay = globalCharIndex × 55ms`) — owns the motion. A parallel `<span class="sr-only">{{ text }}</span>` carries the phrase to AT; the visual tier is `aria-hidden="true"`.

Verified arithmetic (source-derived, no browser):

```
"Select an animation" → 3 words, 17 non-space chars
last delay          = 16 × 55ms            = 880ms
per-char envelope   = 0.14 × 3600          = 504ms
active envelope     = 880 + 504            = 1384ms   → poster fully still 2216ms of every 3600ms (61.6%)
alias threshold     = 3600 / 55            = 65.45 chars
visual textContent  = "Selectananimation"
h1   textContent    = "Select an animationSelectananimation"
```

Rungs (`glass-ui/dist/styles/typography/scale.css`): `--type-display-mega: clamp(5.382rem, 4rem + 9vw, 11.089rem)` → **86.1 – 177.4px**; `--type-display-4: clamp(3.33rem, 2.5rem + 4vw, 5.382rem)` → **53.3 – 86.1px**. So `-0.09em` = **16.0px** at the desktop cap / **4.8px** at the phone floor. The file's own shorthand ("mega 177px → phone 54px", `:95`) matches the resolved clamps to within 1px.

Face metrics, from this repo's own Capsize note (`demo/styles/style.css:78–79`): Instrument Serif **upm 1000, ascent 1024, descent 400, x-height 510** → content box **1.424em**, inside the consumer's **0.92em** line box (`EditorStartScreen.vue:106`).

---

## 2. BLOCKERS

**None.** Nothing in this file breaks the shipped hero, and I will not manufacture one — a false defect is worse than a missed one. The two candidates that a less careful pass would promote are both **latent**: D-5 (grapheme shredding) has no i18n layer to fire against (`grep -rn "vue-i18n\|useI18n\|dir=\"rtl\"" demo/ package.json` → nothing), and D-7 (frozen knobs) has no consumer binding either knob. The four MAJORs below are real costs, one falsified in-file invariant, and one un-consumed in-repo primitive — not outages.

---

## 3. MAJOR

### D-1 · Per-char `inline-block` destroys cross-glyph shaping on the largest type on the page — and the file's own rationale never says so — `[prior · strengthened]`

**Provenance** `AnimatedText.vue:99` (`.wave-char { display: inline-block; }`), `:33–41` (every glyph is its own element); consumer rung `EditorStartScreen.vue:27` (`text-display-mega`); `glass-ui/dist/styles/typography/semantic.css` (`@utility text-display-mega { font-family: var(--font-display); … }`); `demo/styles/style.css:56` (`--font-display: "Instrument Serif", …`).

`display:inline-block` makes each glyph an **atomic inline** with its own inline formatting context. Text shaping — GPOS `kern`, `liga`, `calt` — runs per text run *within* one formatting context. Two glyphs in two inline-blocks are two runs; nothing spans them. So on the poster line, at 177.4px, in a **condensed display serif**, every kern pair in `Se·el·le·ec·ct · an · ni·im·ma·at·ti·io·on` is silently discarded. Kerning error scales linearly with size; this is the one place on the site where it is largest.

The loss is intrinsic to the owner's per-char ruling. What condemns it is that the component carries a **19-line rationale block** (`:2–20`) recording *two* spacing lessons — the a11y mirror (F.W16a) and the X-5 inter-word gap — and is silent on the intra-word cost, which is the same concern one scale down.

**`[NEW]` — the severity is grounded in this project's own demonstrated threshold of care.** `demo/styles/style.css:256–260`:

> "glass-ui's `text-display-*` rungs hardcode font-weight:600 + **negative `--type-tracking-display`**, both tuned for Plus Jakarta Sans. Under the single-weight Instrument Serif … **the negative tracking crushes an already-condensed serif**"

`--type-tracking-display: -0.015em`. This team wrote an entire `@layer demo-typography` block (`style.css:264–274`, `letter-spacing: 0`) to correct a **0.015em** tracking error at exactly this rung, on exactly this face, calling the uncorrected state "crushed". Display-serif kern pairs routinely run −0.01em to −0.04em. The mechanism therefore exceeds the team's own shipped threshold of visible-defect, in the same declaration block, unremarked.

**Falsifier** Dump Instrument Serif's GPOS (`fonts.gstatic.com/.../instrumentserif/...woff2`, preloaded at `demo/app/index.html:55–58`). If the face ships **no `kern` feature**, or none among `{Se, el, le, ec, ct, an, ni, im, ma, at, ti, io, on}`, this dies outright. Font bytes are remote and the lane forbids network fetches → the font-data half is **UNPROVEN-NEEDS-LIVE**; the CSS half (no shaping context spans two atomic inlines) is normative and needs no probe.

**Note** `splitText` (D-4) does **not** fix this — its unit builder is also `display:inline-block` (`split-text.ts:125`). D-1 needs a design ruling, not a primitive.

---

### D-2 · The PRM guard removes the benefit of the decomposition and keeps every cost — `[prior · verified]`

**Provenance** `AnimatedText.vue:118–125`:

```css
@media (prefers-reduced-motion: reduce) {
    .wave-char { animation: none; }
}
```

Under `prefers-reduced-motion: reduce` the wave stops. Nothing else changes. The reduced-motion user still gets:

- 17 atomic inline boxes instead of one shaped text run → the full **D-1** kerning loss, for zero motion;
- the **D-3** mangled `textContent`;
- the **D-8** `$attrs` fan-out;
- a now-meaningless `--wave-cycle` still emitted inline (`:24`);
- `margin-inline-end:0.25em` standing in for a word space that could, in this branch, simply *be* a word space.

The decomposition exists **only** to carry `animation-delay`. The component knows this — the sr-only mirror at `:21` exists precisely because the split has no semantic value. So the PRM branch guards the wrong layer: it silences the animation and leaves the machinery that only the animation justified. The honest reduced-motion state of this component is a single unsplit text node.

This is a *pure* loss: the population that opted out of motion pays 100% of the motion's typographic and text-extraction cost and receives 0% of its benefit.

**Falsifier** Show a non-motion consumer of the split — a per-char class hook, hit target, or measurement. `$attrs` (`:37`) is the only external reach into `.wave-char`, and no consumer passes attrs (D-8). If one exists, the split has independent justification and this dies.

**Reconciliation with S-7** The guard's *frame choice* is exemplary (it rests at an identity frame — see **S-7**); its *scope* is wrong. Both are true and they are about different properties of the same four lines.

**Cross-ref** Census §6.5 lists `:121` among 10 CSS PRM sites and grades demo PRM coverage "conscientious but inconsistent in mechanism". This lane sharpens it: here the *mechanism* is present and the *scope* is wrong.

---

### D-3 · The X-5 lesson is falsified in every non-rendered text path — `Selectananimation` recurs, doubled — `[prior · strengthened]`

**Provenance** the in-file claim, `AnimatedText.vue:10–13`:

> "(b) X-5 gap — Vue's `whitespace: 'condense'` strips whitespace-only text nodes between sibling spans. The inter-word gap is a per-word `margin-inline-end: 0.25em` (never a rendered space character), **so the naive-split "Selectananimation" cannot recur.**"

The gap is a *margin*. Margins exist in layout, not in text.

```
visual layer textContent = "Selectananimation"
whole <h1>   textContent = "Select an animationSelectananimation"
```

(the second is the sr-only mirror at `:21` plus the visual tier; `TypingDots` contributes none — `aria-hidden`, `TypingDots.vue:14–18`). The `.sr-only` body resolves to `clip-path:inset(50%); white-space:nowrap; border-width:0; width:1px; height:1px; margin:-1px; padding:0; position:absolute; overflow:hidden` (glass-ui `dist/styles/components.css`) — clipped, **not** removed, so it remains in every text-extraction path.

The exact string the lesson swears cannot recur, recurs — in **every** path that reads text rather than pixels:

| path | what it sees |
|---|---|
| `Ctrl+A` → copy | `Select an animationSelectananimation` |
| Reader Mode / Safari Reader | same |
| machine translation | segments a 17-letter nonword; the mirror translates separately → two divergent renderings of one heading |
| crawlers / og-scrapers | the `<h1>` reads doubled and mangled |
| `page.getByRole("heading")` text assertions | matches the doubled string |

Find-in-page is **not** affected — Chrome matches `clip-path`-hidden rendered text, so the mirror satisfies Ctrl+F. I checked; do not file that.

**`[NEW]` — the lossless branch exists in this repo and was taken by the library nine days before this file was last touched.** `src/animation/orchestration/split-text/split-text.ts:119–121`:

```js
if (seg.kind === "space") {
    // Live whitespace: keeps the run wrappable at real break points.
    frag.appendChild(doc.createTextNode(seg.text));
```

and `segment.ts:9–13` states the reasoning, citing this component by name:

> "`"space"` — inter-unit whitespace — kept as a live text node so the browser can still wrap the run at real break opportunities; the per-glyph inline-blocks otherwise defeat `text-wrap: balance`, **the AnimatedText X-5 lesson**."

A real space text node between atomic inline units preserves the wrap opportunity **and** the copy fidelity. Two solutions to one problem; the demo shipped the lossy one, the library shipped the lossless one, and the library's docblock cites the demo as its source. See **D-4**.

**Falsifier (two arms, both checked)**
1. `user-select:none` on `.wave-char` would kill the *clipboard* arm. `grep -rn "user-select" demo/` → 5 hits, none in this component or its consumer (`OrbitalDrag.vue:349`; `design-idioms.css:295–296` under `body.is-dragging`; `useDragScrub.ts:32`). Not present.
2. `EditorStartScreen.vue:18` sets `pointer-events-none` on `.hero-band`, so a **pointer-initiated** drag cannot *start* on the hero. This narrows the clipboard arm — page-wide `Ctrl+A`, drags whose endpoints lie outside the hero, and every programmatic/extraction path are unaffected, because selection ranges are DOM positions, not hit tests. Held at MAJOR **because the in-file invariant is falsified**, not merely because copying is inconvenient.

Clipboard arm → **UNPROVEN-NEEDS-LIVE**; the `textContent` arm is decided by source.

---

### D-4 · `[NEW]` · The library ships the exact primitive this component hand-rolls, written *from* this component, barrel-exported, and consumed zero times

**Severity** MAJOR · **Provenance** `src/animation/orchestration/split-text/split-text.ts:1–34`, `segment.ts:1–14`, `src/animation/index.ts:107`, against `AnimatedText.vue:74–84` + `:21–23` + `:39`.

`splitText` is exported from the library barrel:

```
src/animation/index.ts:107:export { splitText, SplitTextRefusalError } from "./orchestration/split-text";
```

Its docblock names this component as its origin — `split-text.ts:1–10`:

> "`splitText` — an **a11y-FIRST** text-splitter that rides the existing engine (S.F2; SF-10). It shreds a text element's content into per-word / per-grapheme / per-line fragments (an animatable **cohort**) and hands back a **ready stagger** over that cohort, WITHOUT shredding the element's accessible name … so a screen reader reads "Select an animation", not the "S…e…l…e…c…t" per-glyph stream the split produced (**the AnimatedText.vue precedent, generalised into a LIGHT primitive**)."

It supplies, in one import, all four things this component hand-rolls — and supplies three of them *better*:

| AnimatedText hand-rolls | `splitText` ships | net |
|---|---|---|
| `w.split("")` (`:82`) | `segmentGraphemes` → `Intl.Segmenter` grapheme granularity, regex fallback (`segment.ts:62–77`) | fixes **D-5** |
| margin-as-space (`:30`) | live whitespace text nodes between units (`split-text.ts:119–121`) | fixes **D-3** |
| hand-built sr-only mirror + `aria-hidden` (`:21–23`) | `applyA11y` — `aria-label` on the container over a naming-capable role, `aria-hidden` on every fragment (`split-text.ts:213–219`) | **S-1** preserved, mirror retired, **D-10** closed (name never empties) |
| `index × offsetMs` (`:39`) | a ready `stagger` over the cohort (`split-text.ts:29–31`) | fixes **D-9**'s hand-multiplied absolute stagger |

It also refuses degenerate input explicitly (`split-text.ts:147`, `if (text.trim().length === 0) throw new SplitTextRefusalError("empty")`) where this component renders a nameless `<h1>` (**D-10**).

**Timeline** (`git log -1 --format=%ad --date=short`):

| artefact | date | commit |
|---|---|---|
| `src/animation/orchestration/split-text/` | **2026-07-03** | `48faab52 S.F2: SplitText primitive — orchestration/split-text/ (LIGHT)` |
| `demo/.../AnimatedText.vue` (last touch) | **2026-07-12** | `969990f6 refactor(demo-home): dissolve the at-sign wrapper …` |

`grep -rn "splitText" demo/` → **zero hits**. The primitive existed, was reachable from the barrel, was written from this component's own recorded lesson, and was not adopted when the file was next edited nine days later.

**Why this is a DESIGN defect and not merely a refactor opportunity.** The demo is the library's proving ground — census §1 counts 68 engine-consuming files and quotes the standing law from `TypingDots.vue:8–9`:

> "a dedicated substrate that CAN stagger: N explicit dot `<span>`s, each driven by its OWN engine animation — **the inv-ζ seam (the demo's signature animation IS the library, not pure CSS)**."

Census **S-8** grades TypingDots *justified bespoke* on precisely that ground. `TypingDots` sits **one span away** inside the same `<h1>` (`EditorStartScreen.vue:29`). So the hero heading contains, side by side: the component that exists to prove the demo's signature motion is the library, and the component that is the demo's most visible motion and is pure CSS — while the library's own splitter, written from it, goes unconsumed. That is a coherence defect at the LCP node, and it is the load-bearing one, because it converts D-3, D-5, D-9 and D-10 from "expensive or contested" into "one import".

**Falsifier** Three arms, any one kills it. (a) `splitText` is not reachable from the demo — it is: barrel export at `index.ts:107`, and the demo already self-aliases `@mkbabb/keyframes.js` → `src/animation/index.ts` (`vite.config.ts:37–60`). (b) `splitText` cannot express a resting per-glyph *lift* — it returns fragments + a stagger and imposes no motion, so the `charLift` keyframe (or a `CSSKeyframesAnimation` per fragment, as `TypingDots.vue:86–99` does) rides on top unchanged. (c) An owner ruling that the hero must stay template-only — `:119–120` gestures at this ("this template-only hero") but records it as a *description*, not a ruling, and the same file's PRM comment concedes the engine holds the authority it is mirroring by hand.

---

## 4. MINOR

### D-5 · `split("")` is a UTF-16 code-unit split — astral chars, ZWJ sequences and combining marks are torn apart — `[prior · verified]`

**Provenance** `AnimatedText.vue:82` — `return { text: w, chars: w.split(""), startIndex };`

```
"🙂‍↔️".split("")  →  ["\ud83d", "\ude42", "‍", "↔", "️"]
```

Five boxes, two of them **lone surrogates** (each renders U+FFFD or an undefined glyph), the ZWJ gets its own zero-width `inline-block` that still consumes a 55ms delay slot, the VS-16 is orphaned. NFD accents (`e` + U+0301) are separated from their base by an inline-block boundary and cannot compose. Arabic/Hebrew/Indic `text` loses cursive joining entirely — every letter renders in isolated form.

**Not hypothetical for this design language — verified verbatim at `demo/app/App.vue:50`:**

```html
<EditorStartScreen hint="or drag M. cubert &#x1F642;&#x200D;&#x2194;&#xFE0F;" />
```

An astral ZWJ sequence already ships through a sibling hero prop. `hint` lands on an `<h2>` (safe). `title` — same file, same component, same `withDefaults` block (`EditorStartScreen.vue:66–78`) — lands on `AnimatedText`. One prop over.

**The library already owns the fix and the demo does not use it — `[NEW]`.** `segment.ts:3–6` names this exact call as the anti-pattern:

> "Both ride the platform `Intl.Segmenter` (the SOTA bar GSAP's 2025 rewrite set: grapheme-correct splitting handles emoji, combining marks, and ZWJ sequences that **a naive `text.split("")` shreds into mojibake**)."

and even its *fallback* path is better (`segment.ts:71–73`: "code-point iteration (still better than `.split("")`, which breaks surrogate pairs)"). See **D-4**.

**`[prior · verified]`** — glass-ui's own `splitGraphemes` is **unreachable**, so the prior pass's producer-ask conclusion was correct *about glass-ui*: `dist/components/typewriter/index.d.ts` re-exports `types`, `keyboard`, `pausePatterns`, `timing`, `typoStateMachine` and **omits `utils/graphemes`**; `package.json` `exports` has 73 keys with exactly one wildcard (`./fonts/*`) and one typewriter subpath (`./typewriter`). Verified this pass by `node -e`. **But the ask is unnecessary** — the in-repo primitive (D-4) needs no producer change and is not gated behind census F-1.

**Falsifier** Pin `text` to a BMP-only, non-combining, LTR-only contract (a `@param` note is not a pin), or show upstream normalization. Neither exists.

---

### D-6 · `\s+` silently converts a non-breaking space into a *breakable* 0.25em gap — `[prior · verified]`

**Provenance** `AnimatedText.vue:77` — `.split(/\s+/)`

JS `\s` includes U+00A0, U+202F, U+205F, U+FEFF. A NBSP's entire purpose is to *forbid* a break at that position. This component consumes it, drops it, and substitutes `margin-inline-end: 0.25em` between two atomic inlines — which is exactly a **breakable** position (UAX #14 LB20 permits breaks around unresolved contingent-break atomic inlines). So `M.&nbsp;cubert` in `title` would break across lines at the one place the author guaranteed it would not.

There is no way to express "unbreakable gap" through this API, and the rationale block does not mention it.

**Falsifier** Show the copy pipeline stripping NBSP upstream, or `.wave-word { white-space: nowrap }` plus an NBSP-preserving split. Neither exists.

---

### D-7 · The two documented timing knobs are frozen at setup — the component is half-reactive — `[prior · verified]`

**Provenance** `AnimatedText.vue:69`

```ts
const props = withDefaults(defineProps<{...}>(), { offsetMs: 55, cycleMs: 3600 });
const { offsetMs, cycleMs } = props;   // ← :69
```

Vue 3.5's reactive-props-destructure transform (`vue: ^3.5.35`, `package.json:109`) applies **only** to destructuring the `defineProps()` / `withDefaults(defineProps(), …)` call *in the declarator itself*. A two-step `const props = …` then `const { a, b } = props` is a plain object read: both are captured **once**, at setup. Meanwhile `text` stays reactive because the computed reads `props.text` through the proxy (`:76`).

Result: two typed, JSDoc'd, defaulted knobs (`:58`, `:60`) that a parent can bind and that will never respond, beside one prop that does. A consumer wiring `:cycle-ms` to a slider — precisely this demo's whole idiom — gets silence. The initial render is correct and only updates are lost, which is the worst failure shape. Latent (no consumer binds either).

**Falsifier** Show the SFC compiler emitting a `__props.offsetMs` access for line 69. It does not — the RFC restricts the transform to the declarator form. A compiled-output dump settles it in one command.

---

### D-8 · `$attrs` fans out onto **N** elements — duplicate ids, N listeners, ARIA landing inside `aria-hidden` — `[prior · verified]`

**Provenance** `:37` (`v-bind="$attrs"` inside the char `v-for`) + `:53` (`defineOptions({ inheritAttrs: false })`) + the documented intent at `:51–52` ("decorative classes passed by a consumer still land on the moving glyphs").

The intent is scoped to *decorative classes*. The mechanism is not scoped at all — everything in `$attrs` is replicated onto all 17 spans:

| attr a consumer might pass | what happens |
|---|---|
| `id="hero-title"` | **17 elements share one id** — invalid HTML; `aria-labelledby` resolves to a single glyph |
| `data-testid="hero"` | Playwright strict mode resolves 17 nodes → every locator throws |
| `@click` / `@mouseenter` | 17 listeners for one logical target |
| `aria-label`, `role`, `aria-live` | land **inside** `aria-hidden="true"` (`:23`) — the author's a11y intent is silently voided |
| `title="…"` | 17 competing native tooltips along one line |

The one class the doc-comment names (`class`) is also where fan-out is *mostly* harmless — and even there a class carrying `padding`/`background` multiplies 17×. `grep -rn "inheritAttrs" demo/` returns **only this line**, so there is no house idiom backing the pattern.

Latent (`EditorStartScreen.vue:28` is `<AnimatedText :text="title" />`, the only render site). Filed as an API-design defect, not a live break.

**Falsifier** A prop-level allowlist (e.g. `charClass?: string`) replacing the blanket spread, or a consumer contract forbidding non-class attrs. Neither exists.

---

### D-9 · The motion is calibrated to exactly one string and degrades in both directions — `[prior · verified]`

**Provenance** `:39` (`(word.startIndex + ci) * offsetMs`), `:64–65` (`55` / `3600`), `:71–73` (the global-index comment, explicitly "17 for the default").

The stagger is **absolute** (ms per index); the cycle is **absolute** (ms); nothing normalizes by `text.length`.

- **> 65 chars** (`3600 / 55 = 65.45`): the last char's delay exceeds one cycle, so it runs in phase with an earlier char's next iteration. "One ripple crossing the line" (`:16–18`) becomes **two or more simultaneous ripples** — the exact visual the rebirth was meant to kill, and a direct falsification of `:73` ("one wave, left to right").
- **≈ 90+ chars**: three ripples; the poster reads as continuous shimmer, and the rest period vanishes.
- **≤ 5 chars**: the whole sweep is ≤220ms of stagger + a 504ms envelope — a flicker, not a wave.

`text` is `string`, unconstrained, with no clamp and no length-derived normalization. The sibling records the opposite lesson — `TypingDots.vue:43–46`:

> "A FIXED short cycle — **NOT text.length-derived** (the headline bug was a title-sized 2.6s duration mis-applied to a 3-glyph ellipsis)."

`TypingDots` solved it by fixing `count` at 3. `AnimatedText` has no such fixture. Note the two-way trap: fixing this via `cycleMs` is blocked by **D-7** — the knob is frozen. `splitText`'s ready stagger (**D-4**) is the shape that resolves both.

**Falsifier** A documented contract pinning `text` to ~10–40 chars, or a `cycleMs = f(text.length)` derivation. Neither exists.

---

### D-10 · Empty / whitespace-only `text` produces an `<h1>` with no accessible name — `[prior · verified]`

**Provenance** `:74–84` + `:21` + `TypingDots.vue:14`

`text = ""` (or `" "`, `"\n\t"`) → `split(/\s+/).filter(w => w.length > 0)` → `[]` → the visual tier renders an empty `<span aria-hidden="true">` and the mirror an empty `<span class="sr-only">`. The consumer's `<h1>` (`EditorStartScreen.vue:27`) then holds: an empty sr-only span, an empty aria-hidden span, and `<TypingDots />` — itself `aria-hidden="true"`.

Net: **an `<h1>` with zero accessible name** — axe-core `empty-heading`, WCAG 2.4.6 / 1.3.1 territory — and it is the first heading on the page. Visually the poster degrades to three floating dots with no words.

No guard: `text` has no default (`:57`), no `v-if`, no minimum. `EditorStartScreen`'s `title` is `title?: string` (`:73`) — a public prop; `title=""` reaches this state directly. Contrast `split-text.ts:147`, which refuses explicitly.

**Falsifier** A `v-if="words.length"` on the h1, a runtime assertion, or a required-non-empty type. None present.

---

### D-11 · Raw spatial constants in the one hero whose siblings ban them — and the two text layers disagree on word spacing — `[prior · verified]`

**Provenance** `:31` (`'0.25em'`), `:109` (`translateY(-0.09em)`), `:64–65` (`55`/`3600`), `:108`/`:112` (`6%`/`14%`) — against `EditorStartScreen.vue:9` ("the φ BAND, derived from the work-area chain — **the K.W3 M4/C5 rule — never a raw vh/px offset**") and `:82–87` ("Derived ENTIRELY from the work-area chain … **No raw vh/px magic number**").

The consumer derives its band from `--work-area-top-offset` + `--work-area-height`, its mobile rung from `--type-display-4`, its deck from `--type-title`, its gutter from a `clamp()`. Twenty lines away, its only child hardcodes five constants. `-0.09em` is at least rung-relative (correctly — **S-4**); `0.25em` is relative to nothing the type system knows.

The sharper half is a **within-composition inconsistency**: the visual tier's word gap is `0.25em` while the sr-only mirror (`:21`) and the deck/hint prose one element down (`EditorStartScreen.vue:40–47`) use the **font's real space advance**, in the same face at adjacent rungs. Unless Instrument Serif's space is exactly 0.250em, the poster's word rhythm and the deck's differ systematically — in a composition whose entire argument (`EditorStartScreen.vue:31–39`) is "one family, two styles, the φ ladder read top-down".

**Falsifier** Measure the U+0020 advance from `hmtx`/`hhea` (upm 1000 per `style.css:78–80`). If it is **0.245–0.255em**, the mismatch half dies and only the magic-number half stands. Font bytes are remote → **UNPROVEN-NEEDS-LIVE**. The token-shaped fix is not "hardcode better" but a derived gap — or, per **D-4**, a real space character, which is what `splitText` emits.

---

### D-12 · The lift amplitude is chosen with no clearance against the consumer's negative leading budget — `[prior · verified]`

**Provenance** `:109` (`translateY(-0.09em)`), `EditorStartScreen.vue:106` (`line-height: 0.92`), `demo/styles/style.css:78–79` (upm 1000, ascent 1024, descent 400).

At the mega rung (177.4px), from the recorded metrics — not from a render:

```
em box height           = (1024 + 400)/1000  = 1.424 em = 252.6 px
line box height         = 0.92               = 0.920 em = 163.2 px
half-leading (per side) = (0.92 − 1.424)/2   = −0.252 em = −44.7 px   ← NEGATIVE
baseline-to-baseline    = 163.2 px
line-2 ascent above its own baseline = 1.024 em = 181.7 px
⇒ line-2 ascender top sits 18.5 px ABOVE line-1's baseline
⇒ add the lift (0.09 em = 16.0 px) → 34.5 px above line-1's baseline
```

The metric-matched fallback is no looser: `ascent-override:96.6667% / descent-override:37.7604%` (`style.css:85–86`) → 1.344em content box. The two-line poster's line boxes already interpenetrate by design; the wave adds 16px of *unbudgeted* upward travel into the zone where line 1's descenders live. There is no clearance term: the lift is a constant, the leading is the consumer's, and neither knows about the other.

The default copy hides it — `"Select an animation"` balances as `Select an / animation` and **"Select an" carries no descenders** (no g/j/p/q/y), so no ink meets. It is safe by which letters the copywriter chose, not by construction. Change one word (`"Pick a spring"`, `"Play any keyframe"`) and line-1 descenders meet line-2 ascenders 16px higher than the type designer's box allows. The stagger softens but does not remove it (line-2 chars fire 440–880ms after line-1's; the settle envelope is 504ms, so tails overlap).

**Falsifier** Render at 1440px with a descender-bearing first line and observe no collision — the em-box arithmetic bounds *box* overlap, and real ink rarely fills the full ascent, so this may be headroom. → **UNPROVEN-NEEDS-LIVE**. The design claim stands regardless: the amplitude was picked against a *rung* (`:19`) and never against the *leading*.

---

### D-13 · WCAG 2.2.2 — infinite auto-starting motion on the LCP element with no in-content pause mechanism — `[prior · verified]`

**Provenance** `:100` (`infinite`), `:118–119` (the file names itself the LCP node), `demo/styles/style.css:53`.

The wave starts automatically, repeats forever, and is presented in parallel with the whole editor. SC 2.2.2 (Pause, Stop, Hide, Level A) asks for a *mechanism* to pause/stop/hide moving content that auto-starts, runs >5s, and is parallel to other content. Probed:

```
grep -rniE "reduce.motion|reducedMotion|pauseMotion|motion-toggle" demo/app demo/state demo/composables
→ 4 hits, ALL engine-side respectReducedMotion plumbing
  (useSceneSwap.ts:28,45 · useSceneTransition.ts:16 · animationOptionsStore.ts:49)
```

No user-facing motion switch exists. The `prefers-reduced-motion` guard (`:121–124`) is the only relief, and it is an OS-level preference, not content-provided.

Held at **MINOR** deliberately: whether a 16px glyph lift is "moving content" under 2.2.2, and whether OS PRM discharges the "mechanism" requirement, are genuinely contested among auditors. The *fact* — no in-content mechanism, infinite duration, LCP element — is not contested and is what is filed.

**Falsifier** An owner ruling exempting decorative hero motion, a global motion toggle in the dock, or a project authority citing OS PRM as satisfying 2.2.2.

---

### D-14 · `[NEW]` · The rationale's own arithmetic is wrong by 484ms — the one number a future tuner would trust

**Provenance** `AnimatedText.vue:96–97`:

> "Peak at 6%, ease-out settle by 14%, rest to 100% — the sweep reads as one ripple crossing the line, then **the poster holds still ~2.7s**."

From the file's own constants (`offsetMs: 55`, `cycleMs: 3600`, keyframes at 6%/14%):

| quantity | value |
|---|---|
| non-space glyphs in the default | 17 (`:72` says 17 ✓) |
| last glyph's start delay | 16 × 55 = **880ms** (`:18` "~0.9s" ✓) |
| per-glyph active window (0%→14%) | 0.14 × 3600 = **504ms** |
| last glyph settles at | 880 + 504 = **1384ms** |
| poster fully still | 3600 − 1384 = **2216ms ≈ 2.22s** |
| **claimed** | **~2.7s** |

`3600 − 880 = 2720` — the "2.7s" is the cycle minus the *start-time span*, with each glyph's own 504ms settle tail never subtracted. A 22% overstatement of the rest period.

This is filed as a defect rather than a typo because of what surrounds it. The file's rationale is keyed entirely to opaque tranche identifiers (`T P-HERO`, `OD-4`, `lane 01 F2`, `F.W16a`, `X-5`, `T.D10`) with no glossary reachable from the file, so it records *decisions* (55ms, 3600ms, −0.09em, 6%, 14%) without recoverable *criteria*. The single criterion it does volunteer — the rest/motion ratio a tuner would use to judge whether the cadence is still right — is arithmetically false. The prose is not trite or clichéd (it is unusually specific, and `:19`/`:95` check out exactly against the tokens — see **S-4**); it is unauditable in the one place it matters.

**Falsifier** Show different keyframe percentages or `cycleMs` — they are `:104–115` and `:65` verbatim. Kill the *severity* if "holds still" means per-glyph: a single glyph rests 3600 − 504 = 3096ms, which is not 2.7s either, and "the **poster** holds still" is unambiguous.

---

## 5. INFO (notes, not defects)

**I-1 · `--wave-cycle` is the 99th unprefixed demo custom property, and it is set *inline* so it inherits into every descendant of the visual tier.** `:24` sets it on the `aria-hidden` wrapper; `:100` reads it. Census §6.3 records **0 `--kf-*` tokens** and 98 unprefixed demo properties sharing a flat global namespace with glass-ui's — this is one more, and it is invisible to that census's grep (which scans `styles/*.css`, not inline `:style` bindings). **No live collision**: `grep -rho -- "--wave-cycle" demo/ node_modules/@mkbabb/glass-ui/dist/` → 0 hits outside this file. Hazard only; routed to the token-namespace lane (census §10 item 7). Note the library already carries the prefix idiom for classes (`fragmentClass = "kf-split"`, `split-text.ts:191`) — it simply has not reached demo tokens.

**I-2 · Two unlinked sources for one number.** JS default `cycleMs: 3600` (`:65`) and CSS fallback `var(--wave-cycle, 3.6s)` (`:100`). The inline style is *always* emitted (`:24` is unconditional), so the CSS fallback is **unreachable** — dead code that looks authoritative. Change one and the other lies.

**I-3 · `infinite both` — the `forwards` half is unreachable.** `both` = `backwards` + `forwards`; an infinite animation never ends, so `forwards` can never apply. `backwards` *is* doing real work: it holds the 0% frame (`translateY(0)`) through the per-char delay so no glyph pre-jumps at t=0. `backwards` is the precise declaration. Cosmetic.

**I-4 · ~17 perpetually-animating transformed inline-blocks promote ~17 compositor layers on the LCP node, for the life of the page** — including the **2216ms per cycle (61.6%)** during which nothing moves (§1, **D-14**). No `IntersectionObserver` gate, no `animation-play-state` pause, though the demo owns exactly that facility for scenes (`demo/composables/scene-runtime/useSceneVisibilityPause.ts`, census §7.2). They coexist with the Three.js Amiga scene, the WebGL cube, and the glass-ui `Aurora` backdrop. The PRM branch releases them; the default path never does. Worth recording because the sibling file celebrates removing the *other* perpetual loop one span away — `EditorStartScreen.vue:49–55`, "the perpetual JS type-in interval leaves (#19)". Cross-axis (perf), noted here because "transform-only, compositor-friendly" (`:20`) is a *design* claim in the rationale block: true per-element, unstated in aggregate. Does **not** delay LCP (transform-only; text paints at final position — **S-5**).

**I-5 · Census S-5 contradicted — twice. See §6.**

**I-6 · `[NEW]` · A primitive's public surface on a single-consumer, unexported component.** Three JSDoc'd props (`:57–61`), `inheritAttrs:false` + explicit `$attrs` routing, a defaults block — against: **one** consumer passing **one** prop (`EditorStartScreen.vue:28`; `grep -rn "AnimatedText" demo/` → 4 hits, 1 render, 1 import, 2 prose), and absence from `demo/components/instrument/shell/index.ts` (which exports only `EditorShell`, `EditorHeader`, `EditorStartScreen`, `SharePopover`). The file carries a primitive's defect surface (**D-7**, **D-8**, **D-9**, **D-10**) and none of a primitive's leverage. Each of those four is latent *only because of this* — which is exactly the state in which a defect survives review and then fires on first reuse.

---

## 6. Contradiction of the hitherto corpus

### C-1 · Census **S-5** nominates the wrong replacement — and the prior pass's replacement conclusion is also wrong

`lane-frontend.md:354–363` files **S-5 · `AnimatedText` → `TypewriterText` — AMBER/evaluate, 126 lines**, caveated "Verify `TypewriterText` supports per-char granularity before swapping."

**Arm 1 — `TypewriterText` is the wrong species `[prior · verified]`.** Against the installed 7.0.0 contract (`dist/components/typewriter/types.d.ts`, `TypewriterText.vue.d.ts`): `TypoState = "normal" | "typo_injected" | "typing_past" | "noticed" | "correcting" | "resuming"`; `TypoAction = {type:"type_wrong"} | {type:"backspace", frantic} | …`; options `ngramSize`, `baseSpeed`, `errorRate`, `correctionSpeedMultiplier`, `cursorBlink`, `deletingSpeed`, `preBackspacePause`; utils `keyboard`, `pausePatterns`, `timing`, `typoStateMachine`. It is a **type-in simulator with typo injection, backspace correction and a caret** — it reveals text over time. `AnimatedText` presents all glyphs at once and *lifts* them. Different motion species; `TypewriterText` cannot express a per-glyph lift wave at any prop setting, and adopting it would resurrect exactly the "perpetual JS type-in" the owner excised at T.D12 (`EditorStartScreen.vue:49–55`).

**Arm 2 — `[NEW]`, and this contradicts the prior pass as well as the census.** The prior pass concluded *"S-5 should resolve to KEEP-BESPOKE on the motion, with one narrow harvest: `splitGraphemes` — which glass-ui ships but does not export, so the harvest is a producer ask, not a consumer swap … gated behind census F-1."* The first half is right; the second half looked in the wrong repo. The correct counterpart is not in glass-ui at all — it is **`src/animation/orchestration/split-text/` in keyframes.js itself** (see **D-4**): barrel-exported at `src/animation/index.ts:107`, grapheme-correct (`segmentGraphemes` → `Intl.Segmenter`), whitespace-preserving (`split-text.ts:119–121`), a11y-consolidating (`applyA11y`), shipping a ready stagger — and its docblock names `AnimatedText.vue` as its precedent (`split-text.ts:9`).

Consequences of the correction:
- **No producer ask.** No glass-ui change is required.
- **Not gated behind F-1.** The remedy touches only keyframes.js's own barrel, which the demo already self-aliases (`vite.config.ts:37–60`). F-1 still gates `.sr-only` and `text-wrap: balance` (both resolve out of `node_modules/@mkbabb/glass-ui`) and must land before any wave, but it no longer gates *this* fix.
- **S-5 should be re-filed** as `AnimatedText → splitText(by:"grapheme")` — and re-severitied. It is no longer "evaluate whether a glass primitive fits"; it is "the demo does not consume the library primitive that was written from this component", which is a dogfooding-law finding (census S-8's own criterion) rather than a shadow-census one.

This is a lane-boundary artefact, not a lane-frontend error: the frontend lane's remit was the glass-ui shadow census, so a library-side primitive was outside its probe. `lane-library.md` is the adjacent territory.

**One caveat that keeps the re-file honest:** `splitText`'s unit builder is also `display:inline-block` (`split-text.ts:125`), so adopting it does **not** discharge **D-1** (kerning) or **D-2** (PRM scope). Those need a design ruling, not a primitive.

### C-2 · Census **§6.5** — refinement, not contradiction

§6.5 lists `:121` among 10 CSS PRM sites and calls the mechanism spread "conscientious but inconsistent". Both true. Refinement: this site is not drift — `:118–120` names the deviation ("the CSS mirror of the engine's `withReducedMotion` authority for this **template-only** hero") — and it is the structurally safest of the ten in its *frame choice* (**S-7**) while being the wrongest in its *scope* (**D-2**). If a wave unifies PRM mechanism, migrate this site alongside **D-4**, when the component is on the engine anyway.

### Corpus folded without contradiction

**S-8** (TypingDots justified bespoke) — confirmed by reading `TypingDots.vue:71–101`; used as the dogfood-law measure in **D-4**. **§6.3** — folded into **I-1**. **§6.4** — confirmed; no defect filed, because Vue's `scoped` transform rewrites `@keyframes` identifiers (see **X-5**). **F-1** — not re-litigated; it bounds **S-1** and **S-3** (both resolve out of `node_modules/@mkbabb/glass-ui`) and must land before any wave.

---

## 7. SUPERLATIVES (graded under the same falsifier rule)

**S-1 · The two-layer a11y mirror is correct, minimal, and the thing per-char splitters almost always get wrong.** `[prior · verified]` `:21` one `sr-only` span carrying the *whole* phrase; `:22–23` the visual tier `aria-hidden="true"`. AT hears `"Select an animation"`, never the `S…e…l…e…c…t` stream. Verified end-to-end across three files: the h1's only other child, `TypingDots`, is *also* `aria-hidden` (`TypingDots.vue:14`), so the heading's accessible name is **exactly** `text` — no leakage, no `"Select an animation . . ."`. Most char-split implementations either leave N exposed spans or bolt `aria-label` onto a container that AT then reads twice. This is the pattern the library later generalised (`split-text.ts:5–10`), and D-3/D-4 do not weaken it — the fix keeps the mirror's *intent* and moves it onto `applyA11y`.
**Falsifier** Show AT announcing per-glyph or announcing twice — requires the visual tier exposed or the mirror inside `aria-hidden`. Neither.

**S-2 · Transform-only motion ⇒ contrast is invariant under the animation, and the composited floor is computable.** `[prior · strengthened]` `charLift` (`:103–116`) touches `transform` and nothing else — no `opacity`, `color`, or `filter`. Rarer than it sounds: the common per-char idiom fades glyphs in, dropping text below its contrast floor for part of every cycle. Here the ratio at every frame equals the ratio at rest. The component declares **no color at all** — ink authority stays with the host (`EditorStartScreen.vue:109`, `color: var(--foreground)`), so it cannot drift from the theme.

| theme | fg | bg (`--neutral-0`) | ratio |
|---|---|---|---|
| light | `hsl(24 10% 10%)` → `#1C1917` | `hsl(40 30% 98%)` → `#FBFAF8` | **16.8 : 1** |
| dark | `hsl(30 14% 90%)` → `#E9E6E2` | `hsl(24 9% 4%)` → `#0B0A09` | **15.9 : 1** |

`[NEW]` — the prior pass marked the *effective* backdrop unprovable because the hero prints over the cube and the Aurora wash. The Aurora arm is in fact **bounded by construction**: `HeroAurora.vue:44` pins `HERO_AURORA_OPACITY_CEILING = 0.1` (strictly below the prototype's 0.15, asserted by `proof:cursor-light-subtle`, OWNER). Compositing the violet accent (`--accent-kf: light-dark(oklch(0.56 0.17 295), oklch(0.74 0.13 305))`) at that ceiling gives a floor of **≈14.7 : 1** light and **≈14.1 : 1** dark — still >3× AA and >2× AAA. So P-5 narrows from "unknown" to "the cube layer only".
**Falsifier / caveat** The un-washed rows are exact from tokens and die only if the demo overrides `--foreground`/`--neutral-0` (it overrides neither — `grep` over `demo/styles/*.css`). The Aurora-composited row is **approximate** (oklch→sRGB converted by hand, composited in gamma space, against a gradient field rather than a flat fill): direction and the ≥14:1 floor are robust, the exact figures are **UNPROVEN-NEEDS-LIVE**. The cube backdrop remains unbounded → SS-13 **P-5**.

**S-3 · The gap is a logical property and the sweep follows logical order.** `[prior · verified]` `marginInlineEnd` (`:30`), not `margin-right`; the per-char delay is the **global character index in source order** (`:74–84`), so in an RTL context the wave sweeps right-to-left — *with* the reading direction. Two RTL-correctness decisions in a component nobody would fault for ignoring RTL. (Does not rescue RTL *shaping* — **D-5** — but the two are independent and this half is right.)
**Falsifier** Show `margin-right` or a reversed/absolute index. Neither exists.

**S-4 · The lift is rung-relative, and the file shows its work on why.** `[prior · verified]` `:19` — "Em-relative lift (−0.09em — the old −10px was rung-blind at 177px)". A px lift readable at 54px is invisible at 177px; `-0.09em` holds constant optical proportion across a 3.3× ladder (177.4px → 16.0px; 53.3px → 4.8px). The defect it replaced is named, the mechanism stated, and the rung values check out against `scale.css` to within 1px — the one place in the file where the prose is checkable and checks out (contrast **D-14**).
**Falsifier** Show a px/rem/vh amplitude, or the em value failing to track a rung swap. Neither.

**S-5 · One clock, N phases — zero duration drift, zero pre-jump.** `[prior · verified]` A single `--wave-cycle` on the parent (`:24`) inherited by every char; the only per-char value is `animation-delay` (`:39`). N spans share one duration by construction rather than by N synchronized declarations, and `both`'s backwards fill (**I-3**) holds each char at its 0% frame through its delay so nothing pops into existence at t=0 — which is also why the animation contributes nothing to LCP or CLS.
**Falsifier** Show a per-char duration, or a visible pre-delay jump (would require `fill-mode: none`/`forwards`).

**S-6 · `[NEW]` · Per-keyframe timing functions — two curves for one gesture — and an inline delay that correctly survives a shorthand reset.** `:103–116` declares `animation-timing-function` *inside* the keyframes: `cubic-bezier(0.35, 0, 0.55, 1)` governs the 6% rise, then `cubic-bezier(0.22, 1, 0.36, 1)` — a strong ease-out quint — governs the 8% settle. That is the correct shape for a lift (fast off the baseline, long decelerating return) and it cannot be expressed by a single element-level curve. The 14%→100% segment inherits `ease` from the shorthand, invisibly, because both endpoints are `translateY(0)`.

The subtler correctness: `.wave-char` uses the `animation` **shorthand** (`:100`), which resets `animation-delay` to `0s`. The per-glyph delay is an **inline style** (`:38–40`). The cascade resolves per-longhand and an inline declaration outranks any author-stylesheet declaration by origin, so the stagger survives the shorthand's reset. This interaction usually ships broken; here it is right.
**Falsifier** Show the delays not applying (would require them in an author stylesheet rather than inline), or per-keyframe `animation-timing-function` being ignored (it is CSS Animations §3 normative for the segment *starting* at that keyframe).

**S-7 · `[NEW]` · The PRM guard rests at an *identity* frame — it cannot leave residue.** `:121–125` is `animation: none`. Most PRM guards are unsafe: killing an animation whose `0%` differs from the element's natural state strands it mid-effect or causes a jump, and authors then bolt on a compensating static declaration. Here the keyframe's boundary frames are `0% { translateY(0) }` and `14%,100% { translateY(0) }` (`:104–115`) — **both identical to the untransformed position** — so `animation: none` yields exactly the static design, with zero residual offset, zero layout shift, and no fallback declaration needed. Not luck: the animation was designed to begin and end at rest, and the guard exploits it. Structurally the strongest of census §6.5's ten CSS PRM sites.
**Reconciliation** This grades the guard's *frame choice*. **D-2** grades its *scope* and finds it wrong. Both hold; they concern different properties of the same four lines, and a repair must preserve S-7 while fixing D-2.
**Falsifier** Show a non-identity keyframe boundary, or a static `transform` on `.wave-char` that `animation:none` would expose. `:98–101` sets only `display` and `animation`.

---

## 8. FALSIFIED AND DROPPED — claims the tree killed

Recorded because L-18 runs both ways, and because each is an easy false-positive the next auditor will re-derive.

**X-1 · "`text-wrap: balance` is never applied — the `:15` rationale is stale prose." → DEAD.** `[prior · re-verified]`
The h1 carries `text-display-mega` (`EditorStartScreen.vue:27`), and glass-ui's `@utility text-display-mega` body (`dist/styles/typography/semantic.css`) ends `… font-optical-sizing: auto; font-weight: var(--type-weight-display); text-wrap: balance;`. All 8 `text-display-*` rungs carry it. The demo's `@layer demo-typography` override (`style.css:264–274`) touches only `font-weight` and `letter-spacing`, leaving `text-wrap: balance` intact. The `:15` claim is **backed**, and the word tier is genuinely load-bearing. Do not file this.

**X-2 · "Per-char inline-blocks create mid-word break opportunities, so `balance` will break `anima/tion`." → DEAD.** `[prior · re-verified]`
`.wave-word` is `display: inline-block` (`:90–92`), so its used width is shrink-to-fit = `min(max(min-content, available), max-content)`, where *available* is the **h1's content width**, not the remaining space on the line. A word wraps internally only if it alone exceeds the full line. Checked at both ends: "animation" at 177.4px ≈ 670px against a 1296px content box (1440 − 2×72px gutter); at the ~55px phone rung ≈ 208px against 311px (375 − 2×32). Never triggers. In the pathological case the split degrades *better* than unsplit text — it wraps instead of forcing overflow. The missing `white-space: nowrap` on `.wave-word` is not a defect.

**X-3 · "The per-word trailing `margin-inline-end` skews centring / balance line widths." → DROPPED.** `[prior · re-verified]`
Real in principle — a line-terminal margin is not hung the way a line-terminal space is, so at a `balance`-chosen break the trailing 0.25em (44.4px at the mega rung) stays as advance. But the hero is `text-align: start` and left-seated at the page gutter (`EditorStartScreen.vue:18`, `:93`), so it falls into the ragged edge in both LTR and RTL. It would surface only if the poster were ever centred or justified. Not filed; recorded so it is not re-derived.

**X-4 · `[NEW]` · "No `@media (forced-colors: active)` guard." → DROPPED — nothing is owed.**
The component declares no color, background, border, or shadow, and its motion is `transform`-only, which forced-colors does not disturb. The host's `color: var(--foreground)` is overridden to `CanvasText` by the UA. A guard here would be ceremony. Explicitly declining to file this.

**X-5 · `[NEW]` · "`@keyframes charLift` sits in the global keyframe namespace alongside the demo's 8 other definitions (census §6.4)." → DROPPED.**
Vue's SFC `scoped` transform rewrites `@keyframes` **identifiers** (and the `animation`/`animation-name` declarations referencing them), unlike custom-property names. `charLift` is therefore scope-suffixed and cannot collide. The namespace hazard applies to `--wave-cycle` only, which is filed as **I-1**.

---

## 9. State-coverage probes — including the ones that came back clean

Recording cleared probes matters as much as the defects; an unrecorded clean probe is re-run forever.

| state | verdict |
|---|---|
| empty / whitespace-only `text` | **D-10** — nameless `<h1>` |
| single word | **clean** — `wi < words.length - 1` → `0 < 0` false → no trailing margin |
| very long `text` | **D-9** — aliased ripples past ~65 glyphs |
| very short `text` | **D-9** — flicker, not a wave |
| `text` changes at runtime | **INFO, folded into I-6** — the `words` computed re-keys every span, restarting all N animations from phase 0 with a visible discontinuity. Unreachable today (the sole consumer's `title` is static) |
| loading / error | **N/A** — presentational leaf; no async, no fetch, no suspense boundary |
| RTL | **split** — directionality **correct** (**S-3**); cursive **shaping broken** (**D-5**). No i18n layer exists → latent |
| `prefers-reduced-motion: reduce` | **split** — frame choice exemplary (**S-7**), scope wrong (**D-2**) |
| `forced-colors: active` | **clean — nothing owed** (**X-4**) |
| high-contrast / increased-contrast | **clean** — inherits; **S-2** shows >3× headroom in both themes |
| zoom / 200% reflow | **clean by construction** — everything `em`- or `clamp()`-relative (`:31`, `:109`, `--type-display-*`); no px remains after the `:19` repair |
| keyboard focus | **N/A** — no interactive element, no tabindex, no focusable descendant |
| print | **not probed** — no `@media print` in the file or its host; out of axis-D scope for a screen demo, noted for completeness |

---

## 10. Routed to SS-13 (live visual audit)

| # | probe | kills / confirms |
|---|---|---|
| P-1 | Dump Instrument Serif GPOS `kern` pairs | **D-1** |
| P-2 | `Ctrl+A` on the start screen → paste | **D-3** clipboard arm |
| P-3 | Measure the U+0020 advance (`hmtx`, upm 1000) | **D-11** mismatch half |
| P-4 | Render with a descender-bearing first line at 1440px; watch line-2 ascenders at the wave peak | **D-12** |
| P-5 | Sample the effective backdrop luminance under the h1 — **cube layer only**, the Aurora arm is bounded at ≥14:1 by **S-2** | **S-2** residual caveat |
| P-6 | `prefers-reduced-motion: reduce` + DevTools layer count on the h1; compositor commits during the 2216ms rest window | **I-4** |

---

## 11. Repair order (sequencing, not a mandate)

1. **F-1 first** (census §10.1) — glass-ui declared and locked. It gates `.sr-only` and `text-wrap: balance`, hence **S-1** and **X-1**. It does **not** gate step 4 (see **C-1**).
2. **D-7, D-14, I-2** — one-line fixes: read `props.offsetMs`/`props.cycleMs` at the use sites; correct the 2.7s arithmetic; delete the unreachable CSS fallback. Zero visual delta.
3. **D-8** — move `$attrs` off the glyph loop; route `class`/`style` explicitly if the decorative intent is kept.
4. **D-3 + D-5 + D-9 + D-10 together, via `splitText(by:"grapheme")`** (**D-4**). One change restores live whitespace (clipboard fidelity), retires the naive splitter, replaces the hand-multiplied stagger with the library's own, moves the mirror onto `applyA11y`, and refuses empty text — and discharges the dogfooding inconsistency that census S-8 measures. Requires accepting an engine dependency in the hero, which is the *point*.
5. **D-6, D-11, D-12** — contract hardening: preserve NBSP; derive the word gap (or let step 4's real space characters supply it); take the leading as an input, or bound the lift against it.
6. **D-2** — make the PRM branch collapse the split, not just silence it. Cheap once step 4 lands (`splitText` has a revert path; `originalHTML` is snapshotted at `split-text.ts:196`). Must preserve **S-7**.
7. **D-1** — owner ruling required. Per-glyph motion and full kerning at the poster rung are mutually exclusive; the choice must be written down. Step 4 does not resolve it.
8. **D-13, I-4, I-6** — optional: a dock motion toggle; visibility-gate the animation; either give the component a second consumer or collapse its surface to what its one consumer uses.

---

## 12. One-line verdict

The component gets the two hard things right — the accessibility mirror and the contrast-invariant, rung-relative, single-clock, identity-resting motion — and pays for them with an undocumented kerning loss on the largest type on the site (**D-1**), a reduced-motion branch that keeps every cost and drops the only benefit (**D-2**), an in-file invariant its own `textContent` falsifies (**D-3**), and a library primitive written from this very component, shipping in the same repo nine days before its last edit, consumed zero times (**D-4**). Nothing here blocks. Everything is cheap to record, and the largest cluster of it is now one import from fixed.

---

## Provenance

Every quoted line was read in place. Files touched: **zero** — `/Users/mkbabb/Programming/keyframes.js` and `/Users/mkbabb/Programming/glass-ui` were read-only evidence throughout; no installs, no builds, no dev server, no browser tooling. The single write is this file. Token values are quoted from the **installed** `node_modules/@mkbabb/glass-ui/dist/` (the copy the demo actually resolves), not from the producer repo. Contrast ratios in **S-2** are computed by hand from those token values under WCAG 2.x sRGB linearisation; the Aurora-composited row is explicitly marked approximate. The prior pass's two load-bearing evidentiary claims were independently re-verified this pass: `demo/app/App.vue:50` ships `&#x1F642;&#x200D;&#x2194;&#xFE0F;` verbatim (**D-5**), and glass-ui's `splitGraphemes` is genuinely unreachable — `dist/components/typewriter/index.d.ts` omits `./utils/graphemes`, and `package.json` `exports` has 73 keys, one typewriter subpath, and a single `./fonts/*` wildcard (**C-1**). Five claims are **UNPROVEN-NEEDS-LIVE** and belong to SS-13: **D-1** (kern pairs), **D-3** (clipboard arm), **D-11** (space advance), **D-12** (ink clearance at peak), **I-4** (compositor cost) — plus the residual cube-layer arm of **S-2**.
