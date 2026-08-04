claude-opus-5[1m]

# CHALLENGE · `AnimatedText` · axis D (DESIGN)

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/shell/AnimatedText.vue` (126 lines)
**Mode** static, read-only, source-derived. No installs, no dev server, no browser tooling. Any claim that needs a rendered pixel is stamped **UNPROVEN-NEEDS-LIVE** and routed to the SS-13 visual audit.
**Date** 2026-08-03. keyframes.js is READ-ONLY evidence; the only file written by this lane is this one.

**Read whole (read-only):**

| file | why |
|---|---|
| `demo/components/instrument/shell/AnimatedText.vue` | the target |
| `demo/components/instrument/shell/EditorStartScreen.vue` | the sole consumer (`:28`) — owns the h1, the rung, the leading, the band |
| `demo/components/instrument/shell/TypingDots.vue` | the h1's other child; decides the heading's accessible name |
| `demo/components/instrument/shell/index.ts`, `demo/app/App.vue:50`, `demo/components/instrument/shell/EditorShell.vue:62` | the consumer's consumers (prop-surface reality) |
| `demo/styles/style.css` (`:42–67`, `:81–100`, `:256–294`) | `--font-display`, `font-synthesis:none`, metric-matched fallback, the `@layer demo-typography` rung override |
| `node_modules/@mkbabb/glass-ui/dist/styles/typography/scale.css`, `.../semantic.css` | `--type-display-mega` / `--type-display-4` values; the `text-display-mega` utility body |
| `node_modules/@mkbabb/glass-ui/dist/styles/tokens/color-radius.css`, `.../dark-arm.css` | `--foreground` / `--background` for the contrast computation |
| `node_modules/@mkbabb/glass-ui/dist/components/typewriter/**` | the S-5 counterpart contract + `splitGraphemes` |
| `node_modules/tailwindcss/dist/lib.mjs` | the `sr-only` utility body |

**Corpus folded:** census lane `formation/keyframes/lane-frontend.md` — **S-5** (AnimatedText → `TypewriterText`, AMBER/evaluate), **§6.3** (0 `--kf-*`, 98 unprefixed demo tokens, flat-namespace hazard), **§6.4** (`charLift` is 1 of 9 demo `@keyframes`), **§6.5** (`AnimatedText.vue:121` is 1 of 10 CSS PRM sites), **F-1** (glass-ui phantom dep — gates every "just use the primitive" remedy below). Cited inline; contradicted explicitly at **§5**.

**Severity convention.** `defects` = BLOCKER + MAJOR + MINOR. INFO rows are notes, not defects. Superlatives are graded under the same falsifier rule (L-18 runs both ways).

**Tally — defects 12 (BLOCKER 0 · MAJOR 3 · MINOR 9) · INFO 5 · SUPERLATIVE 5 · FALSIFIED-AND-DROPPED 3**

---

## 1. What the component actually is

Two-tier decomposition of one string. Tier 1 = words (`.wave-word`, `display:inline-block`, `margin-inline-end:0.25em` on all but the last) — owns wrapping and the inter-word gap. Tier 2 = chars (`.wave-char`, `display:inline-block`, `animation: charLift var(--wave-cycle,3.6s) infinite both`, `animation-delay = globalCharIndex × 55ms`) — owns the motion. A parallel `<span class="sr-only">{{ text }}</span>` carries the phrase to AT; the visual tier is `aria-hidden="true"`.

Verified arithmetic (`node`, no browser):

```
"Select an animation" → 3 words, 17 non-space chars
last delay          = 16 × 55ms  = 880ms
active envelope     = 880 + (0.14 × 3600) = 1384ms   → rest 2216ms per 3600ms cycle
alias threshold     = 3600 / 55  = 65.45 chars
visual textContent  = "Selectananimation"
h1   textContent    = "Select an animationSelectananimation"
```

Rungs (`glass-ui/dist/styles/typography/scale.css`): `--type-display-mega: clamp(5.382rem, 4rem + 9vw, 11.089rem)` → **177.4px** at the cap; `--type-display-4: clamp(3.33rem, 2.5rem + 4vw, 5.382rem)` → **~55px** at a 375px phone. So `-0.09em` = **16.0px** desktop / **4.9px** phone.

---

## 2. BLOCKERS

**None.** Nothing in this file breaks the shipped hero, and I will not manufacture one. The three MAJORs below are real costs and one falsified in-file invariant, not outages.

---

## 3. MAJOR

### D-1 · Per-char `inline-block` destroys cross-glyph shaping on the largest type on the page — and the file's own rationale never says so

**Severity** MAJOR · **Provenance** `AnimatedText.vue:99` (`.wave-char { display: inline-block; }`), `:33–41` (every glyph is its own element), consumer rung `EditorStartScreen.vue:27` (`text-display-mega` → 177.4px), `glass-ui/dist/styles/typography/semantic.css` (`@utility text-display-mega { font-family: var(--font-display); … }`), `demo/styles/style.css:56` (`--font-display: "Instrument Serif", …`).

`display:inline-block` makes each glyph an **atomic inline** in its own inline formatting context. Text shaping — GPOS `kern`, `liga`, `calt`, contextual alternates — runs *per text run inside one formatting context*. Two glyphs in two separate inline-blocks are two runs. Nothing can span them. So on the demo's poster line, at 177.4px, in a **condensed display serif**, every kern pair in `Se·el·le·ec·ct · an · ni·im·ma·at·ti·io·on` is silently discarded. Kerning error is proportional to size; this is the one place on the site where it is largest.

The condemning part is not the loss — the owner ruled per-char uplift and the loss is intrinsic to that ruling. It is that the component carries a **19-line rationale block** (`:2–20`) that records *two* recorded spacing lessons — the a11y mirror (F.W16a) and the X-5 inter-word gap — and is silent on the intra-word cost, which is the same concern one scale down. A cost this size on a hero that the sibling file calls "the P-HERO blessed reference" (`EditorStartScreen.vue:2`) should be a named, owner-visible deviation, not an unmentioned side effect.

**Falsifier** Dump Instrument Serif's GPOS (`https://fonts.gstatic.com/s/instrumentserif/v5/jizHRFtNs2ka5fXjeivQ4LroWlx-6zAjjH7Motmp5g.woff2`, preloaded at `demo/app/index.html:55–58`). If the face ships **no `kern` feature**, or ships one with **no pairs among** `{Se, el, le, ec, ct, an, ni, im, ma, at, ti, io, on}`, this claim dies outright. Font bytes are remote and the lane forbids network fetches → the font-data half is **UNPROVEN-NEEDS-LIVE**; the CSS half (no shaping context spans two inline-blocks) is certain and needs no probe.

**Remedy shape (not prescriptive)** none is cheap — the ruling and the mechanism are in tension. The honest minimum is to *record* the tradeoff in the rationale block, so the next reader does not re-derive it.

---

### D-2 · The PRM guard removes the benefit of the decomposition and keeps every cost

**Severity** MAJOR · **Provenance** `AnimatedText.vue:118–125`:

```css
@media (prefers-reduced-motion: reduce) {
    .wave-char { animation: none; }
}
```

Under `prefers-reduced-motion: reduce` the wave stops. Nothing else changes. The reduced-motion user still gets:

- 17 atomic inline boxes instead of one shaped text run → the full D-1 kerning loss, for zero motion;
- the D-3 mangled `textContent`;
- the D-7 `$attrs` fan-out;
- a dead `--wave-cycle` custom property still emitted inline (`:24`);
- `margin-inline-end:0.25em` standing in for a word space that could now simply *be* a word space.

The decomposition exists **only** to carry `animation-delay`. The component knows this — the sr-only mirror at `:21` exists precisely because the split has no semantic value. So the PRM branch guards the wrong layer: it silences the animation but leaves the machinery that only the animation justified. The honest reduced-motion state of this component is a single unsplit text node.

This is the sharpest design finding in the file, because it is a *pure* loss: the population that opted out of motion pays 100% of the motion's typographic and text-extraction cost and receives 0% of its benefit.

**Falsifier** Show a non-motion consumer of the split — a per-char class hook, a per-char hit target, a per-char measurement. Grep says there is none: `$attrs` is the only external reach into `.wave-char` (`:37`) and no consumer passes attrs (§4, D-7). If one exists, the split has independent justification and this claim dies.

**Cross-ref** census §6.5 lists `AnimatedText.vue:121` among 10 CSS PRM sites and grades the demo's PRM coverage "conscientious but inconsistent in mechanism". This lane sharpens that: here the *mechanism* is present and the *scope* is wrong.

---

### D-3 · The X-5 lesson is falsified in every non-rendered text path — `Selectananimation` recurs

**Severity** MAJOR · **Provenance** the in-file claim, `AnimatedText.vue:10–13`:

> "(b) X-5 gap — Vue's `whitespace: 'condense'` strips whitespace-only text nodes between sibling spans. The inter-word gap is a per-word `margin-inline-end: 0.25em` (never a rendered space character), **so the naive-split "Selectananimation" cannot recur.**"

The gap is a *margin*. Margins exist in layout, not in text. Verified by construction:

```
visual layer textContent = "Selectananimation"
whole <h1>   textContent = "Select an animationSelectananimation"
```

(the second string is the sr-only mirror at `:21` plus the visual tier; `TypingDots` contributes none — it is `aria-hidden` and its glyphs are `.` × 3, `TypingDots.vue:14–18`).

So the exact string the lesson swears cannot recur, recurs — in **every** path that reads text rather than pixels:

| path | what it sees |
|---|---|
| `Ctrl+A` → copy | `Select an animationSelectananimation` (Tailwind v4 `sr-only` is `position:absolute; clip-path:inset(50%)` — `node_modules/tailwindcss/dist/lib.mjs`; clipped text is still in the selection range and still copied) |
| Reader Mode / Safari Reader | same |
| machine translation (`translate.google`, browser built-in) | segments a 17-letter nonword; the sr-only copy translates separately → two divergent renderings of one heading |
| crawlers / og-scrapers / `document.title` derivations | the `<h1>` reads doubled and mangled |
| `page.getByRole("heading")` text assertions in Playwright | matches the doubled string |

**Falsifier (two arms, both checked)**
1. `user-select: none` on `.wave-char` would kill the *clipboard* arm. `grep -rn "user-select" demo/` → 5 hits, none in this component or its consumer (`OrbitalDrag.vue:349`, `design-idioms.css:295–296` under `body.is-dragging`, `useDragScrub.ts:32`). Not present.
2. `EditorStartScreen.vue:18` sets `pointer-events-none` on `.hero-band`, so a **pointer-initiated** drag cannot *start* on the hero. This narrows the clipboard arm — a page-wide `Ctrl+A`, a drag whose endpoints lie outside the hero, and every programmatic/extraction path are unaffected, because selection ranges are DOM positions, not hit tests. Severity acknowledged down from what an unblocked pointer-select would warrant, and held at MAJOR **because the in-file invariant is falsified**, not merely inconvenient.

A live probe that kills this claim: render the hero, `Ctrl+A`, paste, and observe a single clean `Select an animation`. → **UNPROVEN-NEEDS-LIVE** on the clipboard arm only; the `textContent` arm is decided by source.

---

## 4. MINOR

### D-4 · `split("")` is a UTF-16 code-unit split — astral chars, ZWJ sequences and combining marks are torn apart

**Severity** MINOR · **Provenance** `AnimatedText.vue:82` — `return { text: w, chars: w.split(""), startIndex };`

Executed (`node`, on this repo's own hero copy):

```
"🙂‍↔️".split("")  →  ["\ud83d", "\ude42", "‍", "↔", "️"]
```

Five boxes, two of them **lone surrogates** (each renders U+FFFD or an undefined glyph), the ZWJ gets its own zero-width `inline-block` that still receives a 55ms delay slot, and the VS-16 is orphaned from its base. Any NFD-decomposed accent (`e` + U+0301) is separated from its base by an `inline-block` boundary and will not compose. Any Arabic/Hebrew/Indic `text` loses cursive joining and shaping entirely — every letter renders in isolated form.

**This is not hypothetical for this design language.** `demo/app/App.vue:50` already ships an astral ZWJ sequence through a sibling hero prop:

```
<EditorStartScreen hint="or drag M. cubert &#x1F642;&#x200D;&#x2194;&#xFE0F;" />
```

`hint` lands on an `<h2>` (safe). `title` — same file, same component, same `withDefaults` block (`EditorStartScreen.vue:66–78`) — lands on `AnimatedText`. One prop over.

**The design system already owns the fix and does not ship it.** glass-ui 7.0.0 has `dist/components/typewriter/utils/graphemes.d.ts` → `export declare function splitGraphemes(text: string): string[]`. It is **not reachable**: `dist/components/typewriter/index.d.ts` re-exports `types`, `keyboard`, `pausePatterns`, `timing`, `typoStateMachine` and **omits `utils/graphemes`**; `dist/typewriter.d.ts` is `export * from "./components/typewriter"`; and `package.json` `exports` has 73 keys with exactly one wildcard, `./fonts/*` — no deep-import escape. So the local fix is `Array.from(w)` / `Intl.Segmenter("und", {granularity:"grapheme"})`, **plus** a glass-ui ask to export `splitGraphemes` — a BH/BI relay item under the standing glass-ui relay edict.

**Falsifier** Pin `text` to a BMP-only, non-combining, LTR-only contract (a `@param` note is not a pin) — or show a normalization step upstream. Neither exists.

---

### D-5 · `\s+` silently converts a non-breaking space into a *breakable* 0.25em gap

**Severity** MINOR · **Provenance** `AnimatedText.vue:77` — `.split(/\s+/)`

JS `\s` includes U+00A0 (verified: `/\s/.test(" ") === true`), U+202F, U+205F, U+FEFF. A NBSP's entire purpose is to *forbid* a line break at that position. This component consumes it, drops it, and replaces it with `margin-inline-end: 0.25em` between two atomic inlines — which is exactly a **breakable** position. So `M.&nbsp;cubert` typed into `title` would break across lines at the one place the author guaranteed it would not.

There is no way for an author to express "unbreakable gap" through this API. Not documented in the rationale block.

**Falsifier** Show the copy pipeline stripping NBSP before it reaches the prop, or show `.wave-word { white-space: nowrap }` plus a NBSP-preserving split. Neither exists.

---

### D-6 · The two documented timing knobs are frozen at setup — the component is half-reactive

**Severity** MINOR · **Provenance** `AnimatedText.vue:69`

```ts
const props = withDefaults(defineProps<{...}>(), { offsetMs: 55, cycleMs: 3600 });
const { offsetMs, cycleMs } = props;   // ← :69
```

Vue 3.5's reactive-props-destructure transform (`vue: ^3.5.35`, `package.json:109`) applies **only** to destructuring the `defineProps()` / `withDefaults(defineProps(), …)` call *in the declarator itself*. A two-step `const props = …` then `const { a, b } = props` is a plain read: `offsetMs` and `cycleMs` are captured **once**, at setup. Meanwhile `text` stays reactive because the computed reads `props.text` (`:76`) through the proxy.

Result: two typed, JSDoc'd, defaulted knobs (`:58`, `:60`) that a parent can bind and that will never respond, sitting beside one prop that does. A consumer wiring `:cycle-ms` to a slider — precisely what this demo's whole idiom is about — gets silence. Not a shipped break (no consumer passes either; `EditorStartScreen.vue:28` passes `:text` only), so: latent API dishonesty.

**Falsifier** Show the SFC compiler emitting a `__props.offsetMs` access for line 69 (i.e. the transform firing on a two-step destructure). It does not — the RFC restricts it to the declarator form. A compiled-output dump would settle it in one command.

---

### D-7 · `$attrs` fans out onto **N** elements — duplicate ids, N listeners, and ARIA landing inside `aria-hidden`

**Severity** MINOR · **Provenance** `AnimatedText.vue:37` (`v-bind="$attrs"` inside the char `v-for`) + `:53` (`defineOptions({ inheritAttrs: false })`) + the documented intent at `:51–52`:

> "`$attrs` bind to the per-char visual spans (the animated layer), not the host — **decorative classes** passed by a consumer still land on the moving glyphs."

The intent is scoped to *decorative classes*. The mechanism is not scoped at all. Everything in `$attrs` is replicated onto all 17 char spans:

| attr a consumer might pass | what happens |
|---|---|
| `id="hero-title"` | **17 elements share one id** — invalid HTML; any `aria-labelledby="hero-title"` resolves to a single glyph |
| `data-testid="hero"` | Playwright strict mode resolves 17 nodes → every locator throws |
| `@click` / `@mouseenter` | 17 listeners for one logical target |
| `aria-label`, `role`, `aria-live` | land **inside** `aria-hidden="true"` (`:23`) — AT can never reach them; the author's a11y intent is silently voided |
| `title="…"` | 17 competing native tooltips along one line |

The one attribute class the doc-comment names (`class`) is also the one class where fan-out is *mostly* harmless — and even there, a class carrying `padding`/`margin`/`background` multiplies 17×.

Latent today (no consumer passes attrs — `EditorStartScreen.vue:28` is `<AnimatedText :text="title" />` and it is the only render site, `grep -rn "AnimatedText" demo/` → 4 hits, 1 render, 1 import, 2 prose). Filed as a design-of-the-API defect, not a live break.

**Falsifier** A prop-level allowlist (e.g. `charClass?: string`) replacing the blanket spread, or a consumer contract forbidding non-class attrs. Neither exists.

---

### D-8 · The motion is calibrated to exactly one string and degrades in both directions

**Severity** MINOR · **Provenance** `AnimatedText.vue:39` (`(word.startIndex + ci) * offsetMs`), `:64–65` (`offsetMs: 55`, `cycleMs: 3600`), `:71–73` (the global-index comment, explicitly "17 for the default").

The stagger is **absolute** (ms per index), the cycle is **absolute** (ms). Nothing normalizes by `text.length`. Verified thresholds:

- **> 65 chars** (`3600 / 55 = 65.45`): the last char's delay exceeds one full cycle, so it is in phase with an *earlier* char's next iteration. The "one ripple crossing the line" (`:16–18`) becomes **two or more simultaneous ripples** — the exact visual the rebirth was meant to kill.
- **≈ 90+ chars**: three ripples; the poster reads as continuous shimmer.
- **≤ 5 chars**: the whole sweep is ≤ 220ms of stagger + 504ms envelope — a flicker, not a wave; the "sweep, rest, repeat" rhythm collapses.

`text` is `string`, unconstrained, with no clamp and no length-derived normalization. Compare the sibling: `TypingDots.vue:43–50` explicitly records the *opposite* lesson —

> "A FIXED short cycle — NOT text.length-derived (the headline bug was a title-sized 2.6s duration mis-applied to a 3-glyph ellipsis)."

— i.e. the demo already learned once that a duration tuned for one length misapplies to another. `TypingDots` solved it by fixing `count` at 3. `AnimatedText` has no such fixture.

**Falsifier** A documented contract pinning `text` to ~10–40 chars, or a `cycleMs = f(text.length)` derivation. Neither exists. (Note the two-way trap: fixing this via `cycleMs` is blocked by **D-6** — the knob is frozen.)

---

### D-9 · Empty / whitespace-only `text` produces an `<h1>` with no accessible name

**Severity** MINOR · **Provenance** `AnimatedText.vue:74–84` + `:21` + `TypingDots.vue:14`

`text = ""` (or `" "`, or `"\n\t"`) → `split(/\s+/).filter(w => w.length > 0)` → `[]` → the visual tier renders as an empty `<span aria-hidden="true">`, and the mirror renders as an empty `<span class="sr-only">`. The consumer's `<h1>` (`EditorStartScreen.vue:27`) then contains: an empty sr-only span, an empty aria-hidden span, and `<TypingDots />` — which is itself `aria-hidden="true"` (`TypingDots.vue:14`).

Net: **an `<h1>` with zero accessible name.** That is axe-core `empty-heading` and WCAG 2.4.6 / 1.3.1 territory, and it is the *first* heading on the page.

Visually the poster degrades to three floating dots with no words — the `.hero-dots` span (`EditorStartScreen.vue:160–163`) has no words to sit beside.

No guard anywhere: `text` has no default (`:57`), no `v-if`, no minimum. `EditorStartScreen`'s `title` defaults to `"Select an animation"` (`:73`) and is `title?: string` — a public prop; a consumer passing `title=""` reaches this state directly.

**Falsifier** A `v-if="words.length"` on the h1, a non-empty runtime assertion, or a required-non-empty type. None present.

---

### D-10 · Raw spatial constants in the one hero whose siblings ban them — and the two text layers disagree on word spacing

**Severity** MINOR · **Provenance** `AnimatedText.vue:31` (`'0.25em'`), `:109` (`translateY(-0.09em)`), `:64–65` (`55` / `3600`), `:108`/`:112` (`6%` / `14%`) — against `EditorStartScreen.vue:9`:

> "the φ BAND, derived from the work-area chain (**the K.W3 M4/C5 rule — never a raw vh/px offset**)"

and `:82–87`:

> "Derived ENTIRELY from the work-area chain … **No raw vh/px magic number** (the K.W3 M4/C5 ban holds)"

The consumer derives its band from `--work-area-top-offset` + `--work-area-height`, its mobile rung from `--type-display-4`, its deck from `--type-title`, its gutter from a `clamp()`. Twenty lines away, its only child hardcodes five constants. `-0.09em` is at least *rung-relative* (correctly — see S-4); `0.25em` is not relative to anything the type system knows.

The sharper half is a **within-composition inconsistency**: the visual tier's word gap is `0.25em`, while the sr-only mirror (`:21`) and the deck/hint prose one element down (`EditorStartScreen.vue:40–47`) use the **font's real space advance**, in the same face at adjacent rungs. Unless Instrument Serif's space happens to be exactly 0.250em, the poster's word rhythm and the deck's word rhythm are systematically different — in a composition whose entire argument (`EditorStartScreen.vue:31–39`) is "one family, two styles, the φ ladder read top-down".

**Falsifier** Measure Instrument Serif's `space` (U+0020) advance from `hmtx`/`hhea` (upm 1000 per the Capsize note at `demo/styles/style.css:78–80`). If it is **0.245–0.255 em**, the mismatch half of this claim dies and only the magic-number half stands. Font bytes are remote → **UNPROVEN-NEEDS-LIVE**. Note the correct token-shaped fix is not "measure once and hardcode better" but `margin-inline-end: 1ch`-class derivation or a real space character in a `white-space:pre`-safe wrapper.

---

### D-11 · The lift amplitude is chosen with no clearance against the consumer's negative leading budget

**Severity** MINOR · **Provenance** `AnimatedText.vue:109` (`translateY(-0.09em)`), `EditorStartScreen.vue:106` (`line-height: 0.92`), `demo/styles/style.css:78–80` (Instrument Serif metrics: upm 1000, ascent 1024, descent 400).

Arithmetic at the mega rung (177.4px), from the recorded metrics — not from a render:

```
em box height          = (1024 + 400)/1000            = 1.424 em  = 252.6 px
line box height        = line-height 0.92             = 0.92  em  = 163.2 px
half-leading (per side)= (0.92 − 1.424)/2             = −0.252 em = −44.7 px   ← NEGATIVE
baseline-to-baseline   = 163.2 px
line-2 ascent above its baseline = 1.024 em           = 181.7 px
⇒ line-2 ascender top sits 181.7 − 163.2 = 18.5 px ABOVE line-1's baseline
⇒ add the wave lift (0.09 em = 16.0 px) → 34.5 px above line-1's baseline
```

The two-line poster's line boxes already interpenetrate by design (a tight display setting, `line-height: 0.92`, deliberate — `EditorStartScreen.vue:103–104`). The wave then adds 16px of *unbudgeted* upward travel to line 2's glyphs, into the zone where line 1's descenders live. There is no clearance term anywhere: the lift is a constant, the leading is the consumer's, and neither knows about the other.

The default copy hides it: `"Select an animation"` balances as `Select an / animation` and **"Select an" carries no descenders** (no g/j/p/q/y), so no ink meets. Change one word — `"Pick a spring"`, `"Play any keyframe"` — and line-1 descenders meet line-2 ascenders that are 16px higher than the type designer's box allows. The stagger softens but does not remove it (line-2 chars fire 440–880ms after line-1 chars; the settle envelope is 504ms, so the tails overlap).

**Falsifier** Render at 1440px with a descender-bearing first line and observe no collision — the em-box arithmetic is an upper bound on *box* overlap, and real ink rarely fills the full ascent, so this may be pure headroom. → **UNPROVEN-NEEDS-LIVE**. The design claim standing regardless: the amplitude was picked against a *rung* (`:19` — "the old −10px was rung-blind at 177px") and never against the *leading*.

---

### D-12 · WCAG 2.2.2 — infinite auto-starting motion on the LCP element with no in-content pause mechanism

**Severity** MINOR · **Provenance** `AnimatedText.vue:100` (`infinite`), `:118–119` (the file names itself the LCP node), `demo/styles/style.css:53` (`the LCP <h1> (text-display-mega, EditorStartScreen.vue)`).

The wave starts automatically, repeats forever, and is presented in parallel with the whole editor. SC 2.2.2 (Pause, Stop, Hide, Level A) asks for a *mechanism* to pause/stop/hide moving content that auto-starts, runs > 5s, and is parallel to other content. Probed for one:

```
grep -rni "reduce.motion|reducedMotion|pauseMotion|motion-toggle" demo/app demo/state demo/composables
→ 4 hits, ALL engine-side respectReducedMotion plumbing
  (useSceneSwap.ts:28,45 · useSceneTransition.ts:16 · animationOptionsStore.ts:49)
```

No user-facing motion switch exists in the demo. The `prefers-reduced-motion` guard (`:121–124`) is the only relief, and it is an OS-level preference, not content-provided.

Held at **MINOR**, deliberately: whether a 16px glyph lift constitutes "moving content" under 2.2.2, and whether OS-level PRM discharges the "mechanism" requirement, are both genuinely contested among auditors. The *fact* — no in-content mechanism, infinite duration, LCP element — is not contested and is what is filed here.

**Falsifier** An owner ruling exempting decorative hero motion, a global motion toggle wired into the dock, or an authority citation that OS PRM satisfies 2.2.2 for this project.

---

## 5. INFO (notes, not defects)

**I-1 · `--wave-cycle` is the 99th unprefixed demo custom property, and it is set *inline* so it inherits into every descendant of the visual tier.** `:24` sets it on the `aria-hidden` wrapper; `:100` reads it. Census §6.3 records **0 `--kf-*` tokens** and 98 unprefixed demo properties sharing a flat global namespace with glass-ui's — this is one more, and it is invisible to that census's grep (which scans `styles/*.css`, not inline `:style` bindings). **No live collision**: `grep -rho -- "--wave-[a-z0-9-]*" node_modules/@mkbabb/glass-ui/dist/` → **0 hits**. Hazard only, filed to the token-namespace lane (census §10 item 7).

**I-2 · Two unlinked sources for one number.** JS default `cycleMs: 3600` (`:65`) and CSS fallback `var(--wave-cycle, 3.6s)` (`:100`). The inline style is *always* emitted, so the CSS fallback is unreachable — dead code that looks authoritative. Change one and the other lies.

**I-3 · `infinite both` — the `forwards` half is unreachable.** `both` = `backwards` + `forwards`; an infinite animation never ends, so `forwards` can never apply. `backwards` *is* doing real work: it holds the 0% frame (`translateY(0)`) through the per-char delay so no glyph pre-jumps at t=0. `backwards` is the precise declaration. Cosmetic.

**I-4 · ~17 perpetually-animating transformed inline-blocks promote ~17 compositor layers on the LCP node, for the life of the page.** They coexist with the Three.js Amiga scene, the WebGL cube, and the glass-ui `Aurora` backdrop (`HeroAurora.vue:37–41`). The PRM branch releases them; the default path never does. Cross-axis (perf), noted here because "transform-only, compositor-friendly" (`:20`) is a *design* claim in the rationale block and it is true per-element while unstated in aggregate.

**I-5 · Census S-5 refined, and partly contradicted.** Lane-frontend S-5 files `AnimatedText → TypewriterText` as AMBER/**evaluate**, 126 lines, with the caveat "Verify `TypewriterText` supports per-char granularity before swapping." Verified against the installed 7.0.0 contract (`dist/components/typewriter/TypewriterText.vue.d.ts`, `types.d.ts`): the props are `ngramSize`, `baseSpeed`, `variance`, `errorRate`, `maxCharsBeforeNotice`, `continueAfterTypoProbability`, `sequentialTypoDecay`, `correctionSpeedMultiplier`, `cursorVisible`, `cursorBlink`, `cursorChar`, `deletingSpeed`, `preBackspacePause`… — a **type-in simulator with typo injection, backspace correction and a caret**. It reveals text over time. `AnimatedText` presents all glyphs at once and *lifts* them. These are different motion species; `TypewriterText` cannot express a per-char lift wave at any prop setting, and adopting it would resurrect exactly the "perpetual JS type-in" the owner already excised at T.D12 (`EditorStartScreen.vue:49–55`).

> **S-5 should resolve to KEEP-BESPOKE on the motion**, with one narrow harvest: `splitGraphemes` (D-4) — which glass-ui ships but does not export, so the harvest is a producer ask, not a consumer swap.

Both remedies that reach into glass-ui are gated behind census **F-1** (glass-ui absent from `package.json` *and* `package-lock.json`; `npm ci` cannot reconstruct it) — nothing here is reproducible until F-1 lands.

---

## 6. SUPERLATIVES (graded under the same falsifier rule)

**S-1 · The two-layer a11y mirror is correct, minimal, and the thing per-char splitters almost always get wrong.** `:21` one `sr-only` span carrying the *whole* phrase; `:22–23` the visual tier `aria-hidden="true"`. AT hears `"Select an animation"`, never the `S…e…l…e…c…t` glyph stream. Verified end-to-end: the h1's only other child, `TypingDots`, is *also* `aria-hidden` (`TypingDots.vue:14`), so the heading's accessible name is **exactly** `text` — no leakage, no `"Select an animation . . ."`. Most char-split implementations either leave 17 exposed spans or bolt `aria-label` onto a container that AT then reads twice.
**Falsifier** Show AT announcing per-glyph or announcing the phrase twice. Would require the visual tier to be exposed or the mirror to be inside `aria-hidden` — neither is the case.

**S-2 · Transform-only motion ⇒ contrast is invariant under the animation.** `charLift` (`:103–116`) touches `transform` and nothing else — no `opacity`, no `color`, no `filter`. This is rarer than it sounds: the overwhelmingly common per-char idiom fades glyphs in, which drops the text below its contrast floor for part of every cycle. Here the ratio at every frame equals the ratio at rest. Computed from tokens (`glass-ui/dist/styles/tokens/color-radius.css`, `.../dark-arm.css`), the inherited ink (`EditorStartScreen.vue:109`, `color: var(--foreground)`) against `--background`:

| theme | fg | bg | ratio | WCAG |
|---|---|---|---|---|
| light | `hsl(24 10% 10%)` → `#1C1917` | `--neutral-0` `hsl(40 30% 98%)` → `#FBFAF8` | **16.8 : 1** | AAA (needs 4.5, large-text 3.0) |
| dark | `hsl(30 14% 90%)` → `#E9E6E2` | `--neutral-0` `hsl(24 9% 4%)` → `#0B0A09` | **15.9 : 1** | AAA |

**Falsifier / caveat** The hero is `pointer-events-none absolute` printing *over* the cube and the `Aurora` wash — by design ("overlap with the die's lower quadrant is WELCOME", `EditorStartScreen.vue:12–13`). The effective backdrop is therefore **not** `--background`, and the real ratio is **UNPROVEN-NEEDS-LIVE** for the SS-13 pass. What is proven here is the narrower and still-valuable claim: *this component contributes no contrast loss of its own, at any frame*.

**S-3 · The gap is a logical property and the sweep follows logical order.** `marginInlineEnd` (`:30`) not `margin-right`; the per-char delay is the **global character index** in source order (`:74–84`), so in an RTL context the wave sweeps right-to-left — *with* the reading direction, not against it. Two RTL correctness decisions in a component nobody would fault for ignoring RTL. (This does not rescue RTL *shaping* — see D-4 — but the two are independent, and this half is right.)
**Falsifier** Show `margin-right` or a reversed/absolute index anywhere. Neither exists.

**S-4 · The lift is rung-relative, and the file shows its work on why.** `:19` — "Em-relative lift (−0.09em — the old −10px was rung-blind at 177px)". A px lift that reads correctly at 54px is invisible at 177px; `-0.09em` holds a constant optical proportion from `--type-display-mega` (177.4px → 16.0px) to `--type-display-4` (~55px → 4.9px). The defect it replaced is named, the mechanism is stated, the rung values check out against `glass-ui/dist/styles/typography/scale.css`.
**Falsifier** Show a px/rem/vh amplitude, or show the em value failing to track a rung swap. Neither.

**S-5 · One clock, N phases — zero duration drift, zero pre-jump.** A single `--wave-cycle` on the parent (`:24`), inherited by every char; the only per-char value is `animation-delay` (`:39`). N spans share one duration by construction rather than by N synchronized declarations, and `both`'s backwards fill (I-3) holds each char at its 0% frame through its delay so nothing pops into existence at t=0. The naive alternative — per-char `animation-duration` — drifts the moment any one value is edited.
**Falsifier** Show a per-char duration, or a visible pre-delay jump (would require `fill-mode: none`/`forwards`).

---

## 7. FALSIFIED AND DROPPED — claims the tree killed

Recorded because L-18 runs both ways, and because each is an easy false-positive the next auditor will re-derive.

**X-1 · "`text-wrap: balance` is never applied — the `:15` rationale is stale prose." → DEAD.**
The h1 carries `text-display-mega` (`EditorStartScreen.vue:27`), and glass-ui's `@utility text-display-mega` body (`dist/styles/typography/semantic.css`) ends `… font-optical-sizing: auto; font-weight: var(--type-weight-display); text-wrap: balance;`. The demo's `@layer demo-typography` override (`demo/styles/style.css:264–274`) touches only `font-weight` and `letter-spacing` — it leaves `text-wrap: balance` intact. The `:15` claim is **backed**. Do not file this.

**X-2 · "Per-char inline-blocks create mid-word break opportunities, so `balance` will break `anima/tion`." → DEAD.**
`.wave-word` is `display: inline-block` (`:90–92`), so its used width is shrink-to-fit = `min(max(min-content, available), max-content)`, where *available* is the **h1's content width**, not the remaining space on the current line. So a word wraps internally only when the word alone exceeds the full line. Checked at both ends: "animation" at the 177.4px mega rung ≈ 670px against a 1296px content box (1440px viewport − 2×72px `clamp(2rem,5vw,4.5rem)` gutter); at the ~55px phone rung ≈ 208px against 311px (375 − 2×32). Never triggers. And in the pathological case (a word wider than the line) the split degrades *better* than unsplit text — it wraps instead of forcing horizontal overflow. The two-tier design is correct here; the missing `white-space: nowrap` on `.wave-word` is not a defect.

**X-3 · "The per-word trailing `margin-inline-end` skews centring / `balance` line widths." → DOWNGRADED TO NOTHING.**
Real in principle (a line-terminal margin is not hung the way a line-terminal space is), but the hero is `text-align: start` and left-seated at the page gutter (`EditorStartScreen.vue:18`, `:93`), so a trailing margin at the line's logical end is invisible in both LTR and RTL. It would only surface if the poster were ever centred. Not filed; noted so it is not re-derived.

---

## 8. Routed to SS-13 (live visual audit)

| # | probe | kills / confirms |
|---|---|---|
| P-1 | Dump Instrument Serif GPOS `kern` pairs | **D-1** |
| P-2 | `Ctrl+A` on the start screen → paste | **D-3** clipboard arm |
| P-3 | Measure the U+0020 advance (`hmtx`, upm 1000) | **D-10** mismatch half |
| P-4 | Render with a descender-bearing first line at 1440px; watch line-2 ascenders at the wave peak | **D-11** |
| P-5 | Sample the effective backdrop luminance under the h1 (over cube + Aurora), light and dark | **S-2** caveat |
| P-6 | `prefers-reduced-motion: reduce` + DevTools layer count on the h1 | **I-4** |

---

## 9. One-line verdict

The component gets the two hard things right — the accessibility mirror and the contrast-invariant, rung-relative, single-clock motion — and pays for them with an undocumented kerning loss on the largest type on the site (**D-1**), a reduced-motion branch that keeps every cost and drops the only benefit (**D-2**), and a recorded in-file invariant that its own `textContent` falsifies (**D-3**). Nothing here blocks. Everything here is cheap to record and most of it is cheap to fix.
