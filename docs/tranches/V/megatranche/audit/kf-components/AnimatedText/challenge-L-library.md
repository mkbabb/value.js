claude-opus-5[1m]

# CHALLENGE · `AnimatedText.vue` · axis **L (LIBRARY)** · **r2 (supersedes r1, folds it whole)**

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/shell/AnimatedText.vue` (126 L)
**Mode** static, read-only. No installs, no dev server, no browser. Livable-only claims marked **UNPROVEN-NEEDS-LIVE** for SS-13.
**Substrate** keyframes.js @ `969990f6`; vue **3.5.35**; tailwind **4.3.0**; glass-ui installed **7.0.0** (undeclared — lane-frontend F-1).
**Import graph (whole)** `vue` → `computed` (`:49`). That is the file's *entire* module edge. The LIBRARY reading therefore turns on what it does **not** import.
**Read whole this pass** the target; `shell/EditorStartScreen.vue` (191 L, sole consumer); `shell/TypingDots.vue` (125 L, in-`<h1>` sibling); `shell/index.ts`; `src/animation/index.ts:88–114`; `src/animation/orchestration/split-text/{split-text.ts,segment.ts}`; `src/animation/orchestration/stagger.ts:100–175`; `test/orchestration/split-text.test.ts`, `test/orchestration/split-a11y-oracle.test.ts`; glass-ui `dist/styles/{index,typography,typography/semantic,components}.css`, `dist/components/typewriter/*.d.ts`; `package.json` scripts + `tsconfig.json`.

**Posture** the component is assumed DEFECTIVE until the tree acquits it — and, per L-18, **the prior challenge is held to the same standard.** One r1 finding did not survive its own falsifier and is retracted here (R-1); one r1 premise is corrected (R-2). A false defect is worse than a missed one, so those two corrections lead.

---

## 0. Supersession notice — nothing from r1 is lost

r1 (this path, prior pass) filed **15 defects / 1 BLOCKER / 6 superlatives / 3 corpus contradictions**. This pass re-verified every one of them against the tree.

| r1 disposition | count | ids |
|---|---|---|
| **UPHELD** (re-verified this pass) | 14 | D-1 D-2 D-3 D-4 D-5 D-6 D-8 D-9 D-10 D-11 D-12 D-13 D-14 D-15 |
| **RETRACTED** (falsified by the tree) | 1 | **D-7** — see **R-1** |
| **CORRECTED** (conclusion stands, premise wrong) | 1 | **C-3** sub-claim — see **R-2** |
| **SHARPENED** (numeric off-by-one) | 1 | D-5 — see §3 |
| superlatives upheld | 6 | S-A S-B S-C S-D S-E S-F |
| corpus contradictions upheld | 2 | C-1 (`TypewriterText` is a category error) · C-2 (G-lane discharge is stale) |

**r2 adds 5 defects (N-1…N-5) and 1 superlative (S-G).**

**r2 ledger — defects 19 (1 BLOCKER · 4 MAJOR · 7 MINOR · 7 INFO) · superlatives 7 · corpus corrections 2 (one of them against r1 itself).**

---

## 1. Corrections against r1 — these lead, because a false defect is worse than a missed one

### R-1 — **RETRACT r1 D-7**: the `text-wrap: balance` substrate **does exist** on the consumer. r1's glob was non-recursive.

r1 D-7 (MINOR) asserted that AnimatedText's word-tier justification (`:14–16` *"inline-block wrappers, so `text-wrap: balance` still breaks at real word boundaries"*) pointed at a property nothing sets, citing:

> *"glass-ui's stylesheets carry no `text-wrap: balance` (`grep` over `dist/styles/*.css` → none)"*

That glob is **non-recursive**, and the declaration lives one directory down. Full chain, each link probed this pass:

```
demo/styles/style.css:3            @import "@mkbabb/glass-ui/styles"
  → package.json exports["./styles"] = "./dist/styles/index.css"
  → dist/styles/index.css          @import "./typography.css"
  → dist/styles/typography.css     @import "./typography/semantic.css"
  → dist/styles/typography/semantic.css
        @utility text-display-mega { font-family: var(--font-display);
          font-size: var(--type-display-mega); … text-wrap: balance; }
  → applied at EditorStartScreen.vue:27
        <h1 class="hero-display text-display-mega p-0">
```

Probe that separates the two globs:

```
$ grep -l  "text-wrap: balance" node_modules/@mkbabb/glass-ui/dist/styles/*.css   → (none)   ← r1's glob
$ grep -rl "text-wrap: balance" node_modules/@mkbabb/glass-ui/dist/styles/        → dist/styles/typography/semantic.css
```

Every `text-display-*` rung in that file carries `text-wrap: balance`. The demo's own `@layer demo-typography` override (`demo/styles/style.css:263–274`) touches only `font-weight` and `letter-spacing`, so `balance` survives it. Independent corroboration from the corpus: the G-lane row r1 itself cites records the same substrate — `docs/tranches/G/audit/r-animation-sota.md:109` describes the F.W16 shape as *"WORD spans with a visually-hidden AT mirror **+ `text-wrap: balance`**"*.

**D-7 met its own stated falsifier** (*"Produce a rule applying `text-wrap: balance` to the hero `<h1>`"*). It is retracted in full. The component's `:14–16` comment is **accurate**, and the word tier is justified as written.

*What survives from D-7:* only its second half, the stale-docs observation (`docs/frontend-design/demo/home.md:67, 187–188, 367–368, 414–416` cite `AnimatedText.vue:78–91` / `@keyframes liftDown`; the keyframe is `charLift` at `:103` and `:78–91` is the `words` computed — 8 hits re-verified this pass). That is re-filed as **INFO N-5b** below, against the docs, not against the component.

*What it converts into:* **N-1** — the substrate exists, and it is supplied **exclusively by the undeclared package**. That is a sharper finding than the one it replaces.

### R-2 — **CORRECT r1 C-3**: `.sr-only` is shipped by glass-ui too, unlayered, and currently wins the cascade

r1 C-3 stated: *"`.sr-only` is Tailwind's (`demo/styles/style.css:1`), **not glass-ui's** — so the a11y mirror survives a glass-less build."*

The premise is wrong. glass-ui ships it:

```
$ grep -rlo "\.sr-only{" node_modules/@mkbabb/glass-ui/dist/styles/   → dist/styles/components.css
  .sr-only{clip-path:inset(50%);white-space:nowrap;border-width:0;width:1px;
           height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}
```

and ships it **unlayered** (that file opens at top level with a bare `:root{…}` then bare utility selectors), whereas Tailwind v4's copy sits in `@layer utilities`. Unlayered beats layered, so **glass-ui's rule is the one in force today**.

**C-3's conclusion nonetheless stands**: Tailwind 4.3.0 is declared, ships `sr-only` as a core utility, and v4 source auto-detection scans `.vue` files under the project root, so the a11y mirror degrades *softly* under a glass-less build. The correction matters because it moves `.sr-only` from "insulated" to "currently served by the phantom, with a declared fallback" — a materially different risk statement, and it feeds N-1.

---

## 2. New findings (r2)

### N-1 — **MAJOR** — the word tier's justification is real, and supplied **only** by the undeclared dependency

Folds lane-frontend **F-1** and makes it component-specific. Three distinct cascade legs reach this component from `@mkbabb/glass-ui` — a package absent from **both** `package.json` and `package-lock.json` (F-1) — and **none of them crosses this file's import boundary**, so no static tool can see the coupling:

| leg | what it supplies | where declared | fallback if glass-ui vanishes |
|---|---|---|---|
| `text-wrap: balance` | the entire stated rationale for the WORD tier (`:14–16`, `:89`) | `dist/styles/typography/semantic.css` `@utility text-display-mega` | **none** — `grep -rn "text-wrap" demo/` returns only `pretty` on `<h2>` prose and `balance` on `.start-screen-subtitle` (`<h2>`, ≤1023px). Neither is an ancestor of the hero `<h1>`. |
| the rung | `--type-display-mega: clamp(5.382rem, 4rem + 9vw, 11.089rem)` = **177.4px** (the "177px" cited at `:19` and `:96`) and `--type-display-4: clamp(3.33rem, …)` floor **53.3px** (the "phone 54px" at `:96`) — the scale the `-0.09em` amplitude was calibrated against | `dist/styles/typography/scale.css` + `semantic.css` | none |
| `.sr-only` | the a11y mirror's *only* mechanism (`:21`) | `dist/styles/components.css` (unlayered — R-2) | **soft**: Tailwind 4.3.0's layered utility |

So a clean `npm ci` does not merely fail to build (F-1's whole-tree finding); *if the cascade were repaired without the package*, this component would lose the wrapping behaviour its two-tier architecture exists to serve, the rung its motion constant was tuned to, and the clip that keeps its accessible mirror invisible — the sr-only phrase becoming visible body text under the poster. **The component's complexity is collateralized by an unlocked, undeclared dependency, and its own import graph (`vue` only) advertises the opposite.**

**Falsifier.** Declaring `@mkbabb/glass-ui@7.0.0` + regenerating the lock kills this finding entirely (and is lane-frontend §10 step 1). Alternatively, a demo-side `text-wrap: balance` rule reaching `h1.hero-display` would sever the first and worst leg — none exists.

**Secondary, UNPROVEN-NEEDS-LIVE — the highest-value SS-13 probe on this component.** The demo and the library disagree, in prose, about whether the word tier actually preserves balance. `segment.ts:11–13` asserts that *"the per-glyph inline-blocks otherwise defeat `text-wrap: balance`, the AnimatedText X-5 lesson"* and answers it with **live whitespace text nodes** (`split-text.ts:119–122`); this file answers it with `margin-inline-end` and inline-block word wrappers (`:30–31`). Only a rendered viewport settles which is right. If the library is right, the word tier's stated benefit is *nominal* even with glass-ui present — which would re-open (on new grounds) the question D-7 asked for the wrong reason.

### N-2 — **MINOR** — no static gate reaches this file; the r1 defect class is structurally invisible to CI

r1 D-9 filed the missing *tests*. The missing *gates* are a separate and larger hole:

```
$ node -e require('eslint-plugin-vue')  → NOT INSTALLED        (no eslint.config.* at repo root)
$ node -e require('vue-tsc')            → NOT INSTALLED
package.json: "check": "tsc --noEmit && tsc --noEmit -p tsconfig.test.json"
              "lint":  "depcruise src"
tsconfig.json: "include": ["src/", "demo/"]
```

`tsconfig.json` *includes* `demo/`, but plain `tsc` cannot parse `.vue` — so every SFC `<script setup>` in the demo is **unchecked**, and `depcruise` is scoped to `src/` so `demo/` is outside the graph lint too. Consequences, exact:

- **D-2** (`const { offsetMs, cycleMs } = props`) is precisely what `vue/no-setup-props-reactivity-loss` exists to catch. The plugin is not installed.
- **D-4** (`$attrs` fan-out producing duplicate `id`s) has no template linter to see it.
- **D-11** (no prop validation) has no type-level or runtime gate.

This is *why* the file can carry those three: not oversight, but an absent instrument. Note the contrast with the library half, which is gated hard (`proof:publish`, `proof:owner-golden`, `demo:correctness`, two `splitText` oracles including a browser accessible-name gate).

**Falsifier.** A gate config — root or `demo/`-local — that typechecks or lints SFCs. I found none.

### N-3 — **MINOR** — copy/select yields mangled text; `splitText` does not have this defect

By construction (`:10–13`) the visible layer contains **no whitespace text nodes** — the inter-word gap is `margin-inline-end` (`:30–31`). So the rendered glyph stream is `Selectananimation`. The `sr-only` twin (`:21`) is `position:absolute; clip-path:inset(50%)` — still in the document, still caught by select-all — so a copy of the hero region yields `Select an animationSelectananimation`.

Partially masked by `EditorStartScreen.vue:18` `pointer-events-none` on `.hero-band`, which blocks *pointer* selection but not `Ctrl+A`, reader mode, translation extensions, or a text-extracting crawler on the LCP heading.

This is the exact trade `split-text.ts:119–122` refuses to make (*"Live whitespace: keeps the run wrappable at real break points"*) — one more line item under D-1, and the counterweight to S-B: the X-5 fix made the gap unrepresentable-as-zero at the cost of making the text uncopyable.

**Falsifier.** Select-all + copy on the rendered hero returning `Select an animation` once. **UNPROVEN-NEEDS-LIVE** (selection of clipped content is UA-dependent); the mechanism — zero space characters in the visual layer — is source-certain.

### N-4 — **INFO** — header arithmetic drift: `~2.7s` vs the file's own **2.216s**

`:96–97` — *"the sweep reads as one ripple crossing the line, then the poster holds still ~2.7s."*

From the file's own constants: 17 glyphs → last index 16 → max delay 16 × 55 = **880 ms**; each char's lift completes at 14% of the cycle (`:112`) = 0.14 × 3600 = **504 ms** after its own start. The line is therefore fully at rest from 1384 ms to the next wave at 3600 ms → **2216 ms ≈ 2.2 s**. The quoted figure is `3600 − 880 = 2720` ms — the settle tail is dropped. ~23% high.

Filed because the header is unusually load-bearing here, and because *every other* quantitative claim in it verifies (17 glyphs = 6+2+9 ✓; "~17 glyphs in ~0.9 s" = 880 ms ✓; "mega 177px" = 11.089rem = 177.4px ✓; "phone 54px" = 3.33rem = 53.3px ✓; the balance substrate ✓ per R-1). This is the one that drifted.

**Falsifier.** A different reading of "holds still" — per-char rest is 3600 × 0.86 = 3.1 s. Neither reading gives 2.7 s.

### N-5 — **INFO** — `0.25em` is a magic constant standing in for a font metric

`:31` `marginInlineEnd: '0.25em'` replaces the space character the design deliberately removed. Instrument Serif's real space advance is a metric, not 0.25em; at the 177px rung a 10% error is ~4px of visible word gap, and it re-drifts if `--font-display` is ever re-pointed. The literal also sits outside the demo's own "never a raw magic number" idiom, which `EditorStartScreen.vue:84–87` invokes explicitly for the band geometry (*"No raw vh/px magic number (the K.W3 M4/C5 ban holds)"*). `splitText`'s live-text-node approach makes the constant unnecessary.
**Falsifier.** Measure the rendered gap against `&nbsp;` at the same rung. **UNPROVEN-NEEDS-LIVE** for magnitude; the substitution is source-certain.

**N-5b — INFO — 8 stale doc references** (salvaged from the retracted D-7): `docs/frontend-design/demo/home.md:67, 187, 188, 191, 367, 368, 414, 416` cite `AnimatedText.vue:78–91` and `@keyframes liftDown`. The keyframe is `charLift` (`:103`); `:78–91` is the `words` computed. Four of those lines are *design decisions predicated on* the name. Against the docs, not the component.
**Falsifier.** A `liftDown` identifier anywhere in the tree — `grep -rn "liftDown" demo/ src/` → none.

---

## 3. Carried findings — verdicts re-verified this pass

Full text lives in r1; each row below records the probe that upheld it in r2, so the finding is standalone.

### **D-1 — BLOCKER — UPHELD.** The demo hand-rolls the primitive the library extracted **from this file**, and has never consumed it.

Re-verified: `split-text.ts:9–10` names *"the AnimatedText.vue precedent, generalised into a LIGHT primitive"*; `segment.ts:13` cites *"the AnimatedText X-5 lesson"*; `test/orchestration/split-text.test.ts:30` `const el = mount("Select an animation")` — this component's default string (`EditorStartScreen.vue:73`); a second browser gate `test/orchestration/split-a11y-oracle.test.ts` pins `PRE_SPLIT = "Select an animation"` against the **computed accessible name**. Exported publicly at `src/animation/index.ts:107` and LIGHT by the barrel's own boundary note (`:102–106`: *"composes `stagger` + the platform Intl.Segmenter; no parser/color edge — proof:boundary enrolls it off this barrel"*), so adoption costs the LCP node no parser graph. `grep -rn "splitText\|split-text" demo/` → **no output**.

r2 adds one line of proof to the stagger half. `stagger.ts:100–110` + `:168–170`: with `from:"first"`, `distanceFromOrigin(i) = |i − 0| = i` and *"the delay is exactly `distance · each` … no float drift"* — so `stagger(n,{each:offsetMs,from:"first"}).delays(n)[i] ≡ i * offsetMs`, which is **character-for-character** `:39`'s `(word.startIndex + ci) * offsetMs`. The sibling 60 lines away already calls it (`TypingDots.vue:28, 61–63`).

r1's honest counterweight stands and is not softened: `splitText` is DOM-mutating (`:166, 209, 258`), so adoption means the `ref` + `onMounted`/`onBeforeUnmount` + `revert()` shape — real cost, real hydration surface. The finding is not "two-line swap"; it is "the primitive was written for this consumer and still has none."

### **D-2 — MAJOR — UPHELD.** 2 of 3 declared props are non-reactive.
`:69` `const { offsetMs, cycleMs } = props` — initializer is the identifier `props`, not the `withDefaults`/`defineProps` macro call, so Vue 3.5's reactive-props-destructure transform does not fire (r1 proved this by an offline `compileScript(..., { propsDestructure: true })` run: the compiled template emits plain `_unref(cycleMs)` / `_unref(offsetMs)` — identity on a number — while `text` compiles to `__props.text`). Setup bindings shadow props in template scope, so `:24` and `:39` read frozen snapshots while `:21`/`:76` stay live. Latent (`EditorStartScreen.vue:28` passes neither), but both are JSDoc'd public knobs (`:58`, `:60`). Now also explained by **N-2**: no linter exists that could catch it.

### **D-3 — MAJOR — UPHELD.** `:82` `w.split("")` is a UTF-16 **code-unit** split — the library's own segmenter names it: `segment.ts:4–6` *"a naive `text.split("")` shreds into mojibake"*; `:59–61` marks even `Array.from` (code-**point**) as the merely-adequate fallback. Astral chars → lone surrogate pairs in separate inline-blocks; combining marks orphaned; `:81 index += w.length` counts code units so the delay index over-counts. Latent on ASCII — but the same file's sibling prop *is* exercised with a ZWJ sequence: `App.vue:50` `hint="or drag M. cubert 🙂‍↔️"`. Nothing but call-site luck keeps that string out of `text`. *(Corpus: contradicts the G-lane discharge — C-2.)*

### **D-4 — MAJOR — UPHELD.** `:37` `v-bind="$attrs"` sits **inside** the char `v-for`. r1's compiled output shows `_mergeProps({key,class},{ref_for:true}, _ctx.$attrs, {style})` with patch flag `17 /* FULL_PROPS */` per glyph. Consequences: N duplicate `id`s (invalid DOM); N listeners on `aria-hidden` nodes and none on the mirror; consumer `aria-*`/`lang`/`dir` land on the decorative half only. The `:51–52` justification covers `class`/`style` — the only two attrs `mergeProps` merges rather than clobbers — and does not extend to the id/event/ARIA surface it opened. *(r2 note: the merge order is safe — `:38`'s `animationDelay` survives `$attrs.style` because `mergeProps` merges style objects. That sub-case is a non-defect and is credited in S-D's neighbourhood, not charged here.)*

### **D-5 — MINOR — UPHELD, SHARPENED.** Hand-rolled stagger, unbounded against `cycleMs`. r1 wrote *"at the 66th glyph the delay exceeds one full cycle."* Exact: the first aliasing index is `⌈3600/55⌉ = 66` **0-based**, i.e. the **67th** glyph (index 65 → 3575 ms < 3600; index 66 → 3630 ms). One-off in the ordinal; the finding is unchanged — past that point the "one ripple" contract at `:16–18` silently becomes two, with no clamp and no warning. `stagger` does not fix this either (it is a pure ramp), so this is an argument for a modulo/normalisation at adoption time, not against D-1.

### **D-6 — MINOR — UPHELD.** `.wave-word { display: inline-block }` (`:90–92`) does **not** make a word unbreakable, contra `:88–89`. CSS Text 3 §5.1: *"For Web-compatibility there is a soft wrap opportunity before and after each replaced element or other atomic inline"* — and the chars are atomic inlines (`:98–99`), so the word's min-content width is one glyph. Shrink-to-fit = `min(max(min-content, available), max-content)`, so below the word's max-content the word breaks **mid-glyph**. `white-space: nowrap` is the missing declaration — and the codebase already knows it: the sibling in the same `<h1>` writes exactly that, for exactly this reason (`EditorStartScreen.vue:160–163` `.hero-dots { display: inline-block; white-space: nowrap; }` — *"one unbreakable inline unit"*).

r2 bounds the trigger from the tree: at 320px, `.hero-band` `padding-inline: clamp(2rem,5vw,4.5rem)` → 32px per side → 256px available; `--type-display-4` floor 53.3px. `"animation"` (9 glyphs, condensed serif ≈0.42em avg) ≈ 201px — **clears**. `"transformation"` (14) ≈ 313px — **does not**. So the default string holds the invariant that the CSS does not. MINOR, not MAJOR, for that reason. **UNPROVEN-NEEDS-LIVE** for the exact trigger width.

### ~~D-7~~ — **RETRACTED** (R-1). Its salvageable half is re-filed as N-5b.

### **D-8 — MINOR — UPHELD.** Hand-mirrored PRM block (`:118–125`) whose own comment concedes it duplicates the engine authority (`:119–120`), 60 lines from a sibling whose comment says that block was *replaced*: `TypingDots.vue:83–85` + `:91` `respectReducedMotion: true` → `src/animation/internal/reduced-motion.ts:153` `withReducedMotion`. Two PRM mechanisms in one `<h1>`. The CSS mirror is also weaker: cascade-evaluated once, vs the engine authority which *"re-consults this per tick"* (`reduced-motion.ts:54`) and so honours a mid-session OS toggle. Extends lane-frontend §6.5 (*"conscientious but inconsistent in mechanism"*, 13 sites) to its sharpest instance — inside a single element. Coupled to D-1: adopting the engine path dissolves it; an owner ruling that the hero stays template-only downgrades it to INFO, and the `@media` block is then correct as written.

### **D-9 — MINOR — UPHELD.** Zero test coverage on the LCP node. `grep -rln "AnimatedText\|wave-char\|hero-display\|charLift" test/` → none, across 27 `test/demo/*.test.ts` files. Note the asymmetry: `KfPillTabs` — a fork lane-frontend S-1 marks for deletion — has `test/demo/instrument/KfPillTabs.test.ts`; the LCP hero has nothing. The a11y mirror, the component's entire reason for its shape, has no assertion, while the primitive extracted from it carries two gates. The G-tranche also specified a standing guard that never landed (`docs/tranches/G/G.md:409`, an inter-word-gap > 0 assertion). See **N-2** for why: there is no instrument, not merely no test.

### **D-10 — INFO — UPHELD.** Two-sourced default: `cycleMs: 3600` (`:65`) and `var(--wave-cycle, 3.6s)` (`:100`). The CSS fallback is **dead** — `:24` sets the property unconditionally on the wrapper and custom properties inherit, so the `3.6s` branch is unreachable. Same shape for `offsetMs: 55` (`:64`) vs the prose `~55ms` (`:18`).

### **D-11 — INFO — UPHELD.** No prop validation. `cycleMs: 0` → `animation-duration: 0ms` → dead poster, silently. Negative `offsetMs` → negative delay → every glyph starts mid-cycle, wave inverted. No clamp, no `Number.isFinite`, no dev assert — against the library's own fail-explicit posture (`stagger.ts:139–147` **throws** `AnimationOptionError` rather than silently ignoring a bad `ease`). Compounded by N-2: nothing would catch it.

### **D-12 — INFO — UPHELD.** Colocation carry, unlanded. `docs/tranches/U/waves/U.B.md:135` (re-read this pass) orders the home-hero trio (`HeroAurora`/`AnimatedText`/`TypingDots`) moved out of the editor shell into `app/`, with `:394` and `:403` naming the importers. The file is still at `components/instrument/shell/`, and — r2 detail — it is not even in that directory's barrel: `shell/index.ts` exports 4 of 8 (`EditorShell`, `EditorHeader`, `EditorStartScreen`, `SharePopover`); `AnimatedText` and `TypingDots` are reached by relative path only. Three hero components sit in a directory named for a facility none of them serve.

### **D-13 — INFO — UPHELD.** Per-glyph `inline-block` (`:99`) terminates the shaping run, so kerning pairs and ligatures do not apply across glyph boundaries — at the 177px Instrument Serif rung, the rung where a display serif's kerning matters most. **Magnitude UNPROVEN-NEEDS-LIVE**; mechanism source-certain. r1's honest note re-verified and reinforced: `splitText`'s `by:"grapheme"` has the **identical** property (`split-text.ts:126` `span.style.display = "inline-block"`), so this is an inherent cost of the owner-ruled per-char design (`:3` *"should uplift each individual char"*) and **not** an argument against D-1.

### **D-14 — INFO — UPHELD.** `both` (`:100`) is inert: `forwards` never applies under `infinite`; `backwards` holds a 0% frame (`:104` `translateY(0)`) identical to the identity. A no-op token in a shorthand whose every other component is load-bearing.

### **D-15 — INFO — UPHELD.** Generic name for a single hard-coded effect (`charLift`'s amplitude, curve and phase are unreachable from props), plus two visually-hidden idioms in one demo — `.sr-only` (here `:21`, `CopyButton.vue:15`, `ControlsPaneWrapper.vue:134`) and the bespoke `.sr-only-slider` at `scenes/square/SquareScene.css:14–16`, whose comment calls itself *"the canonical sr-only clip pattern"*. Two canons. *(r2 note: R-2 adds a third copy of `.sr-only` itself — glass-ui's unlayered rule — so the count of visually-hidden mechanisms in force is 3, not 2.)*

---

## 4. Corpus reconciliation

### C-1 — **CONTRADICT lane-frontend S-5** (`AnimatedText → TypewriterText`, AMBER 126 L) — **UPHELD, independently re-verified**

S-5 (lane-frontend.md:354–363) proposed glass-ui's `TypewriterText`, hedged *"Verify `TypewriterText` supports per-char granularity before swapping."* It does not, and the swap is a category error. Installed type surface (`dist/components/typewriter/TypewriterText.vue.d.ts`, `types.d.ts`, `utils/typoStateMachine.d.ts`): `ngramSize`, `baseSpeed`, `variance`, `errorRate`, `maxCharsBeforeNotice`, `continueAfterTypoProbability`, `sequentialTypoDecay`, `correctionSpeedMultiplier`, `cursorVisible/Blink/Char`, `deletingSpeed`; `TypoState = "normal" | "typo_injected" | "typing_past" | "noticed" | "correcting" | "resuming"`. That is a **human-typing simulator with injected typos and backspacing** — it *reveals* text over time. `AnimatedText` applies a standing per-glyph phase wave to text already present. No per-char stagger surface, no lift, no per-fragment handle. r1's a11y half also holds: `dist/typewriter.js` already contains the same `sr-only` + `aria-hidden` mirror idiom, so there is no centralisation prize either.

**Amendment (unchanged from r1, restated):** S-5's 126 lines should leave lane-frontend §5's glass-shadow "evaluate" column (1 168 L total) and move to an **engine-dogfood** column against `splitText` (D-1). §5's roster is glass-only by construction, so the correct target was structurally invisible to that lane — a scope artefact, not an error of judgement. The reclassification also moves the verdict from AMBER/evaluate to BLOCKER/act: this is not optional consolidation, it is the demo failing to consume its own library.

### C-2 — **CONTRADICT `docs/tranches/G/audit/r-animation-sota.md:109`** ("demo grapheme-bug DISCHARGED") — **UPHELD**

Re-read this pass. The row states the F26-4 grapheme bug is discharged because *"F.W16 rewrote `AnimatedText.vue` to split by `/\s+/` into WORD spans … (the old raw-UTF-16 per-char split is gone)."* The raw UTF-16 per-char split is **back**, at `:82`. The T P-HERO per-char rebirth (`:2–20`, owner ruling *"should uplift each individual char"*) enumerates the **two** lessons it preserved — (a) the a11y mirror, (b) the X-5 gap — and is silent on the third, grapheme safety, which it dropped. The companion claim on the same line (*"`grep -rniE "splitText|Intl.Segmenter|grapheme" src/` → zero"*) is now stale in the other direction: `src/animation/orchestration/split-text/` exists. Both halves of the row need re-opening; the ledger row at `:253` (*"demo-fix DISCHARGED"*) with it.

### C-3 — **CONFIRM lane-frontend F-1, with r2's correction** — see **R-2** and **N-1**

r1's import- and token-boundary acquittals stand exactly: the file imports only `vue` (`:49`), and its scoped block references exactly one custom property, `--wave-cycle`, which it defines itself (`:24`, `:100`) — no `--type-*`, no `--color-*`, no `--z-*`. That is genuine insulation and is credited at S-E.

What r1 got wrong is the cascade boundary, which it called insulated because `.sr-only` was "Tailwind's". It is glass-ui's, unlayered, in force (R-2) — and `text-wrap: balance` and the type rungs come from the same undeclared package with **no** fallback (N-1). r1's landing conclusion nonetheless survives untouched: **D-1 is independently landable ahead of F-1**, because `splitText` lives in `src/` and is reached through the `vite.config.ts` self-alias, entirely inside the repo.

---

## 5. Superlatives (L-18, run in both directions)

**S-A — UPHELD — the a11y mirror is the origin of a shipped library contract.** `:21` sr-only span + `:23` `aria-hidden` on the whole visual layer + `inheritAttrs:false` (`:53`, required and correct on a two-root component) = 4 lines that `split-text.ts:5–10` promoted to the library's **default** posture (`a11y: true`, `applyA11y` at `:214–219`), citing this file by name, and that `test/orchestration/split-a11y-oracle.test.ts` gates in a real browser against the **computed accessible name**. A demo idiom becoming a library default with its own browser oracle is the strongest evidence a dogfood seam is live — which is exactly what makes D-1 a blocker rather than a nit. *Falsifier:* the visual layer contributing to the accessible name (it is `aria-hidden` on the common ancestor), or an ancestor `role`/`aria-*` suppressing the mirror (`EditorStartScreen.vue:27` is a plain `<h1>`).

**S-B — UPHELD — the X-5 regression is closed structurally, not cosmetically.** `:30–31` makes the inter-word gap a box-model property Vue's `whitespace:'condense'` cannot reach — the bug is not fixed, it is made unrepresentable. Two details most implementations miss: the last word gets `undefined`, not `0`, so no trailing margin survives; and the tag-hugging at `:33`/`:41–43` keeps *intra*-word boundaries free of text nodes even under a `whitespace:'preserve'` compiler setting. *Counterweight, filed honestly:* the same mechanism is what produces N-3's uncopyable text.

**S-C — UPHELD — the one motion parameter that must be relative, is.** `:109` `translateY(-0.09em)`. The header records the retired form (*"the old −10px was rung-blind at 177px"*, `:19–20`), and r2 measured the span it must survive: 177.4px (mega cap) → 53.3px (`--type-display-4` floor) — a 3.3× range across which a px amplitude is either a heave or a twitch. `em` is the only scale-invariant choice; nothing else in the file needed to be relative, and nothing else is.

**S-D — UPHELD — per-keyframe `animation-timing-function`, used correctly.** `:106`/`:110` declare **different** curves inside the keyframe blocks — launch `cubic-bezier(0.35,0,0.55,1)` over 0→6%, over-damped settle `cubic-bezier(0.22,1,0.36,1)` over 6→14%. This is the correct and frequently-misunderstood semantics (a keyframe's function governs the segment *beginning* at that offset), giving an asymmetry a shorthand easing cannot express, at zero runtime cost. The merged `14%, 100%` stop (`:112–113`) correctly leaves the identity→identity rest on the default. r2 adds: the 6% rise (216 ms) deliberately exceeds the 55 ms stagger step, so adjacent glyphs overlap into a traveling wave rather than 17 discrete pops — a considered number, not a default.

**S-E — UPHELD — zero teardown surface, and zero exposure at the import boundary.** No `onMounted`, no `onBeforeUnmount`, no listener, no rAF, no `ResizeObserver`, no engine handle, no interval — the entire script is one `computed` (`:74–84`). Nothing to leak, nothing to guard, no async-resolve-vs-unmount race. Contrast the machinery the sibling must carry for the engine path (`TypingDots.vue:67–69` early-unmount guard + `:103–107` stop-and-clear), and note `EditorStartScreen.vue:49–57` records a *"perpetual JS type-in interval"* deleted from this same hero. This component never acquired one — and it is the property a D-1 migration must not regress (`splitText` returns `revert()`/`dispose()` precisely because it *does* acquire).

**S-F — UPHELD — transform-only, compositor-friendly, on the LCP element.** Every animated property in `charLift` is `transform` (`:105`, `:109`, `:114`) — no layout, no paint. The hero `<h1>` is the demo's LCP node (`demo/styles/style.css:52–55`, which also seats a metric-matched fallback face so the box does not reflow on font arrival). Animating it on the compositor thread and nowhere else is exactly right, and the header states the intent (`:20`). r2 adds: `--wave-cycle` is set **once** on the wrapper (`:24`) and reaches all 17 glyphs by custom-property inheritance, while only the genuinely per-node value (`animation-delay`) is written per node — the naive version writes both on every char.

**S-G — NEW — the two-tier shape is *better* than the library primitive's, and must survive the migration.** `splitText`'s `buildUnits` (`split-text.ts:110–133`) emits a flat run of fragments with **no word grouping** — so under `by:"grapheme"` it inherits D-6's mid-word break exposure with no wrapper available to suppress it, and `SplitTextOptions` (`:44–76`) has no word-grouping knob (`by` is `"word" | "grapheme" | "line"`, never both). AnimatedText's word tier is the structure that *could* close D-6, one `white-space: nowrap` away. This is a genuine finding against the library surfaced by the demo, and it makes D-1's remedy a **merge**, not a replacement: keep the word tier, delegate segmentation + stagger + a11y. *Falsifier:* a word-grouping option on `SplitTextOptions`. There is none.

---

## 6. Landing order (if upheld)

1. **N-1 leg 1 is free of code**: declare `@mkbabb/glass-ui@7.0.0` + regenerate the lock (lane-frontend §10 step 1). Nothing else in this file is reproducible until it lands.
2. **N-2** — install `eslint-plugin-vue` + `vue-tsc` and put `demo/**/*.vue` under `check`. Do this *before* the code fixes, so D-2 / D-4 / D-11 are caught by an instrument rather than by a reviewer.
3. **D-2** (one line), **D-10** / **D-14** (two tokens) — free, no design question.
4. **D-4** — narrow the `$attrs` binding to `class` on the glyphs; everything else onto the mirror.
5. **D-6** — `white-space: nowrap` on `.wave-word`. **N-4** / **N-5b** — correct the header arithmetic and the 8 stale `liftDown` doc refs in the same motion.
6. **C-2 / D-3** — re-open the G-lane discharge row (both halves of `r-animation-sota.md:109` + the `:253` ledger row).
7. **D-1** (the BLOCKER) — adopt `splitText({ by:"grapheme", a11y:true, stagger:{ each: offsetMs, from:"first" } })` on a `ref`'d host in the `TypingDots.vue:71–107` lifecycle shape, **keeping the word tier** (S-G). Dissolves D-3, D-5, D-8 and N-3; independently landable ahead of F-1 (C-3). **D-9 must land with it** — the demo consumer is the missing gate on the primitive.
8. **D-12** — fold into whatever wave finally lands U.B5.

**Not recommended:** lane-frontend S-5's `TypewriterText` swap (C-1).
**Not to be re-filed:** r1 D-7 (R-1). The `text-wrap: balance` substrate is real; the component's `:14–16` comment is accurate.

---

## 7. Ledger

| | count |
|---|---|
| **defects** | **19** (14 carried + 5 new) |
| **blockers** | **1** (D-1) |
| **superlatives** | **7** (6 carried + S-G) |
| MAJOR | 4 — D-2, D-3, D-4, N-1 |
| MINOR | 7 — D-5, D-6, D-8, D-9, N-2, N-3, (D-7 retracted, not counted) |
| INFO | 7 — D-10, D-11, D-12, D-13, D-14, D-15, N-4 (+N-5, N-5b) |
| corpus contradictions | 2 upheld (C-1, C-2) + 1 confirm-with-correction (C-3) |
| **corrections against r1** | **2** — R-1 (retraction) · R-2 (premise) — plus 1 numeric sharpening (D-5) |
| UNPROVEN-NEEDS-LIVE → SS-13 | 5 — N-1 secondary (does `balance` engage over atomic inlines?) · D-6 trigger width · D-13 shaping magnitude · N-3 clipped-text selection · N-5 gap metric. **Highest value: N-1 secondary** — the demo and the library disagree in prose about the same named lesson. |

---

## Provenance note

Every keyframes.js and glass-ui path above was read from `/Users/mkbabb/Programming/keyframes.js` (including `node_modules/@mkbabb/glass-ui/dist/`), read-only. Executed this pass: `grep`, `sed`, `find`, `ls`, and four `node -e` probes (package versions, `exports` map lookup, module-resolution checks) — all read-only, none from inside a product tree. No installs, no dev server, no browser, no build. Nothing in keyframes.js, glass-ui, or value.js was written or mutated. The single write of this lane is this file, which supersedes its own r1 in place and carries every r1 finding forward by id so nothing is lost.
