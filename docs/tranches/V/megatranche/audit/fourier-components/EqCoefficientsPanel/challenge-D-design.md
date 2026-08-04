claude-opus-5[1m] (served model id)

# CHALLENGE — `EqCoefficientsPanel.vue` · axis **D** (DESIGN)

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/equation/EqCoefficientsPanel.vue` (17 lines)
**Posture** DEFECTIVE-until-the-tree-proves-otherwise. Every claim carries severity + `file:line` + its own falsifier. Superlatives carry them too (L-18 runs both ways).
**Method** Static + source-derived only. No browser. Contrast figures computed from the shipped token literals with the WCAG 2.x relative-luminance formula. Spacing figures computed from the Tailwind v4 `--spacing: 0.25rem` scale against the app's own root font-size rule. Livable-only claims marked `UNPROVEN-NEEDS-LIVE (SS-13)`.

**Read whole (read-only)** — the subject; every file it imports and every file those import:
`web/src/components/ui/CollapsibleSection.vue` · `web/src/components/shared/CoefficientsSpectrum.vue` · `web/src/components/ui/tooltip/Tooltip.vue` + `index.ts` · `web/src/lib/types.ts`.
Substrate + host read for provenance: `web/src/style.css` · `web/src/App.vue` · `web/index.html` · `web/public/fonts.css` · `web/package.json` · `web/src/components/equation/EquationView.vue` (the sole consumer) · `web/src/components/visualization/CoefficientsPanel.vue` (the sibling wrapper over the same shared body) · `web/src/components/equation/FrequencyGraph.vue` (the `#graph` payload this consumer declines) · `web/src/components/equation/{FunctionInput,InfoCard}.vue` (the route's other `cartoon-card` sites) · `web/dist/assets/index-57FkGzlZ.css` + `NotationPills-CjQ8uEBB.css` (built-CSS evidence, **stale** — see m-10) · `web/e2e/**`.
Library evidence, **the old pin**: `web/node_modules/@mkbabb/glass-ui@4.0.0` — `dist/CollapsibleContent-C_s6fG7r.js`, `dist/components/ui/{collapsible,card}/*.d.ts`, `dist/components/custom/configurator/ConfiguratorLayer.vue.d.ts`, `dist/styles/{index,cards,animations,typography,theme/bridges,theme/radius,configurator}.css`, `dist/styles/tokens/{color-radius,dark-arm,light-dark,offsets-sizing,scheme-motion,shadow}.css`, `dist/styles/typography/{scale,utilities}.css`, `dist/styles/utilities/{a11y-overrides,base}.css`, `package.json` (80 export subpaths).
Library evidence, **the producer**: `/Users/mkbabb/Programming/glass-ui` @ **7.0.0** — `src/components/collapsible/*`, `src/components/_shared/disclosure/{disclosure.css,disclosure-context.ts}`, `src/components/card/{Card.vue,styles.css}`, `src/components/configurator/*`, `src/components/metric/*`, `src/styles/index.css`, `src/styles/animations.css`, `src/styles/utilities/components.css`, `src/styles/typography/utilities.css`, `src/styles/theme/bridges.css`, `src/styles/theme/radius.css`, `src/index.ts`, `package.json`, `CHANGELOG.md`, `MIGRATION.md`.

**Hitherto corpus folded** — `docs/tranches/V/megatranche/formation/fourier/{CENSUS-2026-08-03.md,lane-frontend.md,lane-crud.md}` and the adjudicated intake `audit/codex-provenance/intakes/lane-fourier-r3-r6.md`. Overlaps cited by row id; one corpus **extension** filed at B-1 (the census break surface is import-level only and does not carry this component's CSS-level break).

**Tally — 25 defects (2 BLOCKER · 8 MAJOR · 11 MINOR · 4 INFO) · 5 superlatives · 5 falsified candidates.**

---

## 0 · What the component is, and the honest frame

Seventeen lines. One root `<div class="cartoon-card px-3 py-2">`, one `<CollapsibleSection title="Coefficients" subtitle="Fourier spectrum" :default-open="false">`, one `<CoefficientsSpectrum :components subtitle empty-text>`. No script beyond a single `defineProps`.

So the D-axis surface of this file is almost entirely **compositional**: which chrome primitive it selects, what padding ledger it opens, what states it declares, what motion it inherits, and what its choices cost when set beside the sibling wrapper that renders the *same* body. Judged that way it is not a thin file at all — it is the place where four independent design systems (the fourier `cartoon-card` shim, the local `CollapsibleSection`, the shared `CoefficientsSpectrum`, and glass-ui's own card/disclosure register) meet, and it reconciles none of them.

Every finding below is anchored either in this file or in a file it imports (transitive findings are labelled `[inherited]` with the choice-point named), plus the host `EquationView.vue` where the panel's mount, gate and motion are authored — those are design properties *of this panel* even though the lines live one level up, and each is provenanced there explicitly.

---

## 1 · Findings

| id | sev | claim (one line) | anchor |
|---|---|---|---|
| B-1 | BLOCKER | The panel's only motion dies **silently** at the F.W1 uplift — keyframes removed at glass 7, consumer shorthand defeats the replacement | `CollapsibleSection.vue:57-71` |
| B-2 | BLOCKER | Zero of the three named states are covered; the one it declares is **provably dead code** | `EqCoefficientsPanel.vue:14`, `EquationView.vue:213` |
| M-1 | MAJOR | Same section heading renders 14px/600 here and 20.4px/600 in the sibling route; `text-sm` is not a glass-ui type rung | `CollapsibleSection.vue:39`, `offsets-sizing.css:499` |
| M-2 | MAJOR | glass-ui-first violation: dead-class shim on a bare `<div>` where `<Card surface="cartoon">` shipped in the installed pin | `EqCoefficientsPanel.vue:12`, `style.css:107-111` |
| M-3 | MAJOR | The card frame has **0px radius** while `--radius-card` = 1rem and every child is rounded | built CSS, `theme/radius.css:21,32` |
| M-4 | MAJOR | False affordance: hover lift + shadow bloom fires on a non-interactive container, and drifts **diagonally** | built CSS `.cartoon-card:hover` |
| M-5 | MAJOR | Nested scroll trap: 300px scroller inside a scroller, no containment, no gutter, numerals under the scrollbar | `CoefficientsSpectrum.vue:78`, `EquationView.vue:373-375` |
| M-6 | MAJOR | Three unrelated typefaces in 17 lines, and **none is Computer Modern** — `.cm-serif` resolves to generic `serif` | `typography/utilities.css:65-67`, `theme/bridges.css:68` |
| M-7 | MAJOR | Auto-scroll-on-open measures against the wrong element → dead band; the column's bottom fade occludes the last rows | `CollapsibleSection.vue:24-25`, `App.vue:26` |
| M-8 | MAJOR | The panel is **unreachable** post-uplift until its host is cured — `EquationView` imports two removed subpaths | `EquationView.vue:9-10`, CENSUS §break-surface |
| m-1 | MINOR | The `#actions` slot is left empty: no cardinality in the collapsed header | `CollapsibleSection.vue:43` |
| m-2 | MINOR | Vertical rhythm asymmetric 14px/12px; the closed panel is 58% chrome | derived, see §2 m-2 |
| m-3 | MINOR | No header/body divider; title and data run together when open | `disclosure.css`, `configurator.css:60-62` |
| m-4 | MINOR | Trigger ≈32px tall — under glass-ui's own `--touch-target: 2.75rem` floor, and outside the coarse-pointer carve | `a11y-overrides.css:31-37` |
| m-5 | MINOR | Prose over-promises: "Fourier spectrum" delivered without the spectrum graph the sibling route gets | `EqCoefficientsPanel.vue:13` |
| m-6 | MINOR | Collapsed-by-default *and* gated by `v-if` → a second interaction to reach the just-computed payload; open state never persists | `EquationView.vue:213`, `CollapsibleSection.vue:14` |
| m-7 | MINOR | The mount transition has no local `prefers-reduced-motion` guard; mitigation is a substrate accident | `EquationView.vue:212,449-452` |
| m-8 | MINOR | Double padding ledger with no owner: card `px-3 py-2` over the disclosure's own `py-1.5`/`pb-1`/`pt-1` | `EqCoefficientsPanel.vue:12` |
| m-9 | MINOR | Zero automated coverage — no equation-route spec exists at all | `web/e2e/` listing |
| m-10 | MINOR | The shipped `dist/` disagrees with the installed pin → any sign-off from the deployed build is unsound | built CSS vs `node_modules` |
| m-11 | MINOR | The subtree's only fixed-px dimension is out of scale on the exact viewport that boosts the root font-size | `CoefficientsSpectrum.vue:78`, `style.css:40-50` |
| i-1 | INFO | The 2px frame is the panel's only edge cue and sits at ≈1.90:1 against its own fill | computed |
| i-2 | INFO | The root `div` carries no `role`/`aria-label`; glass 4's content region carries neither — glass 7 **adds** both | `CollapsibleContent-C_s6fG7r.js`, `glass-ui@7 CollapsibleContent.vue:47-48` |
| i-3 | INFO | An admin-register type token leaks into the public tooltip through the shared body | `CoefficientsSpectrum.vue:110` |
| i-4 | INFO | The uplift silently **improves** two things here, which is its own risk: unrecorded improvements are unverified improvements | see §3 |

---

## 2 · The findings in full

### B-1 · BLOCKER — the panel's only motion dies silently at the F.W1 uplift

**Claim.** The disclosure reveal is the single piece of motion this component owns. Under the installed pin it works. Under glass-ui 7 it becomes a hard instantaneous pop, with no exit animation at all, and **nothing in either gate notices**.

**The chain, each link read:**

1. The consumer paints the reveal itself, in an *unlayered* scoped block:
   `CollapsibleSection.vue:60-65` — `.collapsible-content[data-state="open"] { animation: collapsible-open 0.2s var(--ease-out); }` and the `closed` twin.
2. Its own header comment asserts these are canonical: `CollapsibleSection.vue:57-59` — "`collapsible-open` / `collapsible-close` are canonical glass-ui animations (see `@mkbabb/glass-ui/styles/animations.css`); the consumer-side shadow rules have been excised."
3. Under the pin that assertion **holds**: `node_modules/@mkbabb/glass-ui/dist/styles/animations.css:18` and `:29` define both keyframes over `--reka-collapsible-content-height`, and `dist/styles/index.css:162` imports `animations.css` into the single `@mkbabb/glass-ui/styles` entry that `style.css:3` pulls in. The built `dist/assets/index-57FkGzlZ.css` contains `@keyframes collapsible-open` (1 occurrence). So the reveal is real today.
4. **At glass-ui 7.0.0 both keyframes are gone.** `grep -n '^@keyframes' /Users/mkbabb/Programming/glass-ui/src/styles/animations.css` returns twelve names — `tooltip-in`, `fade-in`, `scale-in`, `slide-up`, `dock-in`, `shimmer-sweep`, `shimmer`, `shake`, `metal-shimmer-sweep`, `typewriter-blink`, `glass-reveal-out`, `glass-reveal-out-reduced`. No `collapsible-*`. A repo-wide `grep -rn collapsible src/styles/` in the producer returns nothing.
5. Glass 7's replacement is a *differently named* register: `glass-ui@7 src/components/collapsible/CollapsibleContent.vue:49` applies `cn('disclosure-content', props.class)`, and `src/components/_shared/disclosure/disclosure.css:90-113` drives it — `.disclosure-content { animation-duration: var(--spring-smooth-duration); animation-timing-function: var(--spring-smooth); }`, `.disclosure-content[data-state="open"] { animation-name: disclosure-open; }`.
6. The consumer's rule **wins** and **destroys** the replacement. Two independent reasons, both provable: (a) the consumer's block is a Vue *scoped* style, emitted unlayered — the built CSS shows `.collapsible-content[data-state=open][data-v-16a925e2]{animation:collapsible-open .2s var(--ease-out)}` in `dist/assets/NotationPills-CjQ8uEBB.css` — and in the CSS cascade unlayered declarations beat every `@layer`, and `disclosure.css`'s rules are layered; (b) even at equal layer, `(0,3,0)` beats `(0,2,0)`. And because the consumer uses the `animation` **shorthand**, it resets `animation-name` to `collapsible-open` — an ident that matches no `@keyframes` — so glass 7's `animation-name: disclosure-open` is overwritten rather than merely competed with.
7. Consequence: `animation-name` resolves to a keyframe-less ident → no animation runs. reka-ui's `Presence` gates unmount on `animationend`; with no animation it tears down immediately. Open and close both become hard snaps, with the content's `overflow: hidden` (`CollapsibleSection.vue:54-56`) now clipping nothing.

**Why BLOCKER rather than MAJOR.** Not because a lost 200ms hurts — because of *who does not see it*. This is a CSS-identifier break: `vue-tsc` cannot type a keyframe name, and the census records the whole suite as 29 single-chromium Playwright specs with vitest ABSENT (CENSUS §"[P2] Uplift lands with no unit-test net", lines 256-258) — and none of those 29 touch this route at all (m-9). The census's enumerated break surface is **import-level only**: "removed subpaths in live use (`metric-badge` ×7 files, `hover-card` ×2, `hover-popover` ×2), removed dock members (`DockIconButton` ×2, `DockDropdownTrigger` ×1), **`ToastVariant` definition-absent → hard typecheck break**" (CENSUS lines 102-104; repeated in the F.W1 work item at lines 184-186). A removed **keyframe** consumed by a *consumer-authored* rule is a different class of break and appears on no list. F.W1 as currently specified would ship it green.

**Corpus extension filed.** CENSUS §"the uplift break surface" should gain a *CSS-identifier* arm alongside the import arm. Two known members, both in this component's own import graph: `collapsible-open`/`collapsible-close` (here) and — same mechanism, same file family — `ContourSettings.vue:357` which cites the identical "shipped at `@mkbabb/glass-ui/styles/animations.css`" claim. The general shape of the search is `grep -rn 'animation:\s*[a-z-]*' web/src --include=*.vue` cross-checked against the producer's `@keyframes` inventory.

**Falsifier.** Any one of these kills it: (i) glass-ui 7 defines `collapsible-open` somewhere outside `src/styles/animations.css` that reaches the `styles` export cascade (`src/styles/index.css:173-202` is the full manifest; I read it); (ii) F.W1's plan already carries a keyframe-rename step; (iii) the consumer's scoped rule turns out to be layered such that `disclosure.css` wins (inspect the emitted order post-uplift); (iv) `disclosure-open` is aliased to `collapsible-open` at 7. `UNPROVEN-NEEDS-LIVE (SS-13)` for the *perceived* result only — the CSS resolution above is static and complete.

---

### B-2 · BLOCKER — zero state coverage, and the one state it declares is dead code

**Claim.** The axis names three states: empty, error, loading. This panel implements none, and the `empty-text` it passes can never render.

**Provenance and proof.**
- The panel passes `empty-text="Compute to see coefficients"` at `EqCoefficientsPanel.vue:14`.
- The empty branch it targets is `CoefficientsSpectrum.vue:138-140` — `<p v-else …>{{ emptyText }}</p>`, whose `v-else` pairs with `v-if="topComponents.length"` at `:78`.
- `topComponents` is `props.components.slice(0, expanded ? 40 : 12)` (`:37-39`), so it is empty **iff** `components` is empty.
- The sole consumer mounts the panel behind `v-if="components.length"` — `EquationView.vue:213`. Therefore `components.length ≥ 1` is a mount precondition, `topComponents.length ≥ 1` always holds inside, and the `v-else` is **unreachable in this consumer**. Dead prop, dead copy, dead branch.
- **Loading:** absent. `EquationView.vue:239` renders a "Recomputing…" banner, but it is inside the `<!-- Results -->` block of the **right** panel (`:236-241`); the left column's panel is untouched. During a recompute the panel therefore continues to present the *previous* run's coefficients with no staleness cue whatsoever — amplitude bars, phases, Re/Im, all four significant figures of them (`CoefficientsSpectrum.vue:110-119`), indistinguishable from fresh.
- **Error:** absent. Same structure — the error banner is a right-panel sibling (`EquationView.vue:243`). On a failed recompute `result.value` is retained (it is only reassigned on success; `:37` initialises from cache and `doCompute` at `:91` guards), so `components` keeps its old value and the panel keeps rendering stale numbers *beside a visible error*.
- **Empty:** worse than absent. Because the gate is `v-if`, a zero-coefficient result does not produce the declared empty message — it **unmounts the whole panel**, animating it out through `<Transition name="slide-down">` (`EquationView.vue:212`). The user loses not just the data but the affordance's location and their own open/closed choice.

**Design law engaged.** A numeric readout that cannot distinguish "current" from "last known" is a correctness surface, not a polish surface — the panel is the only place in the route that shows *four-significant-figure* coefficient values (`CoefficientsSpectrum.vue:112`), i.e. exactly the kind of number a user copies.

**Cure sketch (not applied — read-only lane).** Drop the parent `v-if` so the panel owns its own zero state and the declared copy becomes live; pass a `stale`/`pending` flag from `computing` and let the shared body dim + suppress the `AnimatedDigit` damping while pending; keep the panel mounted across errors with a local tone. Note the tone token family is already available: `dist/styles/feedback-tone.css` at the pin, `src/components/_shared/feedback/feedback-tone.css` at 7 (`src/styles/index.css:184`).

**Falsifier.** Show a code path where `EqCoefficientsPanel` mounts with `components.length === 0` (that would revive `empty-text` and demote this to MAJOR), or a left-column staleness cue I missed in `EquationView.vue:194-218`. I read that block whole.

---

### M-1 · MAJOR — the same section heading is two different type sizes in two routes

**Claim.** "Coefficients / Fourier spectrum" is one section of one product, rendered through two chrome systems at a 1.46× type-size disparity, and this component picked the off-scale one.

**Provenance.**
- Here: `CollapsibleSection.vue:39` — `<span class="cm-serif text-sm font-semibold tracking-tight">{{ title }}</span>`. `text-sm` = `0.875rem` = **14px** at the desktop root (`style.css:44-49` sets `html { font-size: 1rem }` at ≥768px), 15.75px below that.
- The sibling wrapper over the *same* `CoefficientsSpectrum`, with the *same* `label`/`sub` strings: `visualization/CoefficientsPanel.vue:14` — `<ConfiguratorLayer label="Coefficients" sub="Fourier spectrum" :default-open="false">`.
- `ConfiguratorLayer`'s header is the library's named **section** register: `dist/styles/configurator.css:25-31` — `.configurator-section-label { font-size: var(--configurator-section-size); font-weight: var(--configurator-section-weight); … }`, and `dist/styles/tokens/offsets-sizing.css:499-500` — `--configurator-section-size: var(--type-subheading); /* 20.4px — √φ section rung */`, `--configurator-section-weight: 600`.
- So: **20.4px/600** in the visualization route, **14px/600** here. 1.457×.
- Worse than a disparity: `text-sm` is not a rung of glass-ui's ladder at all. The ladder is `--type-{caption,small,body,…,subheading}` (`dist/styles/typography/scale.css:100-120`), bridged to `text-*` utilities as `--text-caption`/`--text-small`/`--text-body` (`dist/styles/theme/bridges.css:15-20`). `text-sm` is Tailwind's own default and bypasses the bridge entirely — the heading is *off-scale*, not merely small.
- The library's own commentary names the exact failure this rung was minted to cure: `configurator.css:20-23` — "the `<ConfiguratorLayer>` header label reads as a SECTION (√φ subheading, 20.4px / 600), NOT a row. Replaces the flat `text-small font-semibold text-foreground` span (D6-3: 'section labels read flat + undifferentiated')." This panel is still shipping the pre-D6-3 flat span.

**Falsifier.** Show a scoped override raising `.collapsible-section` type in either the panel or its route (I grepped `EquationView.vue`'s style block and `CollapsibleSection.vue`'s — neither touches font-size), or show `--configurator-section-size` overridden downward in fourier (`style.css` sets no `--configurator-*` token). Perceived hierarchy: `UNPROVEN-NEEDS-LIVE (SS-13)`; the numbers are static.

---

### M-2 · MAJOR — glass-ui-first violation: a resurrected dead class where the replacement primitive shipped in the installed pin

**Claim.** `EqCoefficientsPanel.vue:12` styles a bare `<div>` with `.cartoon-card`, a fourier-local shim that re-animates a class glass-ui deliberately retired — while the sanctioned replacement, `<Card surface="cartoon">`, is present and documented in the very version installed.

**Provenance.**
- The shim, with its own confession: `style.css:98-111` — "glass-ui removed the `.cartoon-card` recipe at C.W5 (cards.css:2); `cartoon-surface` survives as a decoration-only utility… The shim re-binds the class against `cartoon-surface`… restoring parity with the pre-C.W5 visual without touching glass-ui. Cross-repo re-publish recorded as a coordination ask; this shim is the fourier-local KISS stop-gap."
- The replacement is not a coordination ask — it is installed. `dist/components/ui/card/Card.vue.d.ts:16-31` declares `export type CardSurface = "glass" | "cartoon" | "veil"` and documents `cartoon` as "the Memphis-sticker decoration layered on top of the resolved tier: 2px border, offset-stamp shadow, hover-lift. Composes onto ANY tier; **the retired `<CartoonCard>` was `tier="quiet" surface="cartoon"`**." `./card` is one of the pin's 80 export subpaths.
- The shim also opts the panel out of the glass ladder by fiat: `style.css:110` — `background: var(--card)`, an opaque fill. The ladder has a *named* escape for exactly that intent — `CardTier` includes `opaque — '--glass-level:0' escape (AX.W54)… maps to '.glass-opaque'` (`Card.vue.d.ts:9-11`). The panel takes the effect without the name, so nothing downstream (the `--glass-level` knob, the W55 bright-bucket adaptive tint) can see or retune it.
- Consequence at the *panel* scale, not the repo scale: this is the design system's card, in the design system's app, built out of a class the design system deleted — and the two concrete divergences that follow are M-3 (radius) and M-4 (the lift), both of which `<Card surface="cartoon">` would have resolved by construction.
- Fourier repeats the shim at 14 application sites over 13 files (`style.css:101-102`), of which the equation route holds nine (`grep -n cartoon-card src/components/equation/*.vue`: this file `:12`, `InfoCard.vue:18`, `FunctionInput.vue:93,175`, `EquationView.vue:230,239,243,251,308`). This panel is one witness of fourteen; the class-level cure belongs at F.W1, but the *component-level* choice is authored here.

**Falsifier.** Show that `<Card surface="cartoon">` at the pin fails to reproduce the needed visual (the `.d.ts` enumerates border + offset-stamp + lift, which is the whole shim), or that the barrel/subpath cost is prohibitive (`./card` is a dedicated subpath, so it is not), or a project precept that forbids glass-ui component adoption in `equation/` (I found the opposite standing precept in the value.js corpus: glass-ui is the design system; add to it, don't re-implement).

---

### M-3 · MAJOR — the card frame has no radius while every child is rounded

**Claim.** The panel's 2px frame renders at **0px** corner radius. The canonical card radius is 1rem. Its own children are rounded. One 17-line component therefore contains two contradictory radius languages.

**Provenance (built CSS is decisive here — the emitted rule is the whole rule).**
- `dist/assets/index-57FkGzlZ.css` emits exactly two `.cartoon-card` blocks plus the hover: `.cartoon-card{box-shadow:var(--shadow-cartoon-md);transition:translate …;border-width:2px;translate:0}` and `.cartoon-card{border-color:var(--border);background:var(--card)}`. **No `border-radius`.** The pin's source agrees: `dist/styles/cards.css:33-48` (`@utility cartoon-surface`) sets border-width, box-shadow, translate, transition — nothing else. So does glass 7's (`glass-ui@7 src/components/card/styles.css:98-102`, which adds only `position: relative`).
- The canon: `dist/styles/theme/radius.css:32` — `--radius-card: var(--radius-2xl)`, and `:21` — `--radius-2xl: 1rem`. Fourier overrides no `--radius*` token (`grep -n -- '--radius' src/style.css` → nothing). glass 7's `Card.vue:86` applies `rounded-card`, i.e. the primitive would have carried it.
- The contradiction is internal, within the panel's own subtree: the amplitude track and its fill are `rounded-full` (`CoefficientsSpectrum.vue:89,91`), the tooltip swatch is `rounded-full` (`:107`), the trigger is `rounded-control` from the library's own merge (`CollapsibleContent-C_s6fG7r.js`, CollapsibleTrigger `cn("tap-squish focus-ring rounded-control transition-control …")`), and the portaled tooltip surface is rounded by `glass-ui/tooltip`. A hard-cornered 2px rectangle containing five pill-shaped children is not a register — it is an unreconciled seam.
- The shim's parity claim (`style.css:104-105`, "restoring parity with the pre-C.W5 visual") is at minimum incomplete on this axis: the retired recipe resolved through `.glass-cartoon`, which the producer changelog records as a glass-card sibling (`glass-ui@7 CHANGELOG.md:687,4010`), and glass surfaces carry `--radius-card`. Marked as *unproven for the historical recipe specifically* — see falsifier.

**Falsifier.** Read glass-ui's `cards.css` at the commit immediately before C.W5 and show `.cartoon-card` had no radius either (that would retire the parity half of the claim while leaving the internal contradiction fully intact); or show a fourier-side `rounded-*` utility on this element (`EqCoefficientsPanel.vue:12` is the whole class list: `cartoon-card px-3 py-2`); or establish a deliberate sharp-frame register — but note the register would then be violated by `.coeff-popover { @apply … rounded-lg }` in the same route (`EquationView.vue:394`).

---

### M-4 · MAJOR — a hover lift on a non-interactive container, drifting diagonally

**Claim.** Hovering anywhere over the panel — including its dead padding — lifts the whole card and blooms its shadow. Nothing about the card is interactive. The lift also moves the card **left as well as up**, against the shadow's own light logic.

**Provenance.**
- Emitted, not merely declared — `@apply` inlines the nested state rule: `dist/assets/index-57FkGzlZ.css` contains `.cartoon-card:hover:not(:disabled){translate:var(--lift-sm) var(--lift-sm);box-shadow:var(--shadow-cartoon-lg)}`. Source at the pin: `dist/styles/cards.css:44-47`.
- `--lift-sm: -1px` (`dist/styles/tokens/offsets-sizing.css:10`), applied to **both** axes → `translate: -1px -1px`, i.e. up **and left**. The cast it sits in is `--shadow-cartoon-md: -4px 3px 1px …` → `-lg: -6px 4px 1px` (`dist/styles/tokens/shadow.css:95,98`): a stamp offset left-and-down. A hover that travels up-left while its shadow grows down-left reads as the card sliding *along* its own shadow rather than off the page.
- The producer already fixed the axis: `glass-ui@7 src/styles/utilities/components.css:82-84` — `.hover-lift:hover…{ translate: 0 var(--lift-sm); box-shadow: var(--shadow-md); }`. Pure vertical, opt-in by class.
- The affordance is false at the *element* level: the only interactive thing inside is the trigger row (`CollapsibleSection.vue:36`), which is already `flex-1` and already carries `tap-squish` + `focus-ring` + `rounded-control` from the library. The card's own `px-3 py-2` band, the count readout, the amplitude rows (`.coeff-row { cursor: default }`, `CoefficientsSpectrum.vue:165-167`) — all inert, all lifting.
- Secondary cost: a 1px displacement of the whole card *while the pointer travels toward the trigger* is a Fitts's-law tax on the one target that matters, and it fires on pointer entry to the padding, i.e. before the user is anywhere near the trigger. `UNPROVEN-NEEDS-LIVE (SS-13)` for the felt jitter; the geometry is static.

**Falsifier.** Show `.cartoon-card` scoped away from the panel (it is on the root element, `:12`), or a rule suppressing the hover for non-interactive hosts (none exists — the guard is only `:not(:disabled)`, and a `div` is never `:disabled`), or establish that the whole-card lift is intended chrome, in which case the panel is missing the interactivity that would justify it.

---

### M-5 · MAJOR — a 300px scroller nested inside a scroller, unguarded on three axes

**Claim.** The panel's payload is a fixed-height inner scroll region placed inside the left column's own scroll region, with no scroll containment, no stable gutter, and no edge treatment — and the numerals column sits exactly where the scrollbar lands.

**Provenance.**
- Inner scroller: `CoefficientsSpectrum.vue:78` — `class="space-y-1 max-h-[300px] overflow-y-auto"`.
- Outer scroller: `EquationView.vue:373-375` — `.eq-panel-left { @apply flex flex-col gap-3 w-full pb-8 overflow-y-auto min-h-0 flex-1; }`. On ≥1024px the grid itself is `overflow: hidden` (`:346`), so the left column is genuinely the scroll owner.
- **No `overscroll-behavior`** anywhere in the panel's graph (`grep -rn overscroll web/src` → nothing). A wheel gesture over the coefficient list therefore scrolls the list, then chains to the column the instant the list bottoms — the classic disorienting hand-off, on a surface whose entire purpose is to be scanned.
- **No `scrollbar-gutter: stable`** and no reserved right inset. The card's horizontal padding is `px-3` = 12px (`EqCoefficientsPanel.vue:12`), and the row's last cell is `class="w-16 text-right fira-code text-muted-foreground tabular-nums"` (`CoefficientsSpectrum.vue:99-102`) — a right-aligned four-character numeral whose glyphs end flush at the scroller's inner edge. A classic (space-taking) scrollbar reflows every row by its width on the exact frame the list crosses 300px; an overlay scrollbar paints over the last digits during scroll. Either way the panel's most precise content is the content nearest the moving part.
- **No edge treatment.** The pin exports `./fading-scroll` (one of 80 subpaths) and 7 exports it too, so the masked-edge primitive was available in both directions; the panel uses neither, so the list's top and bottom are hard cuts mid-row.
- The column then adds a *second* fade over the top of all this: `EquationView.vue:364-370` paints a `::after` gradient `height: 2.5rem` to `var(--background)` across the column's bottom, `z-index: 2`. A panel opened near the column's foot has its final ~40px of coefficient rows washed toward the page colour — legible-ish, but the wash is a *column*-level cue reading as a *panel*-level fade, so it says "more content below" about the wrong scroller.

**Falsifier.** Any of: an `overscroll-behavior` rule I missed (grep was repo-wide); a platform default that contains chaining (there is none — chaining is the CSS default); or measurement showing the numeral column clears the gutter at every supported width. Overlay-vs-classic scrollbar appearance is `UNPROVEN-NEEDS-LIVE (SS-13)`; the absence of every mitigation is static and complete.

---

### M-6 · MAJOR — three typefaces in seventeen lines, and none of them is Computer Modern

**Claim.** The panel's title is set in the browser's generic serif, its prose in the system UI sans, its numerals in Fira Code — in an application that preloads three Computer Modern faces and describes itself as a paper-math surface.

**Provenance (chain fully resolved at the installed pin).**
1. Title: `CollapsibleSection.vue:39` applies `.cm-serif`. Definition at the pin: `dist/styles/typography/utilities.css:65-67` — `@utility cm-serif { font-family: var(--font-serif-math, serif); }`.
2. `--font-serif-math` is **defined nowhere**. `grep -rn -- "font-serif-math" node_modules/@mkbabb/glass-ui/dist/ src/ public/` returns exactly one line: the fallback consumer above. So `.cm-serif` computes to the generic `serif` keyword → Times New Roman / Liberation Serif, whatever the UA supplies.
3. This is **not** cured by the uplift: `glass-ui@7 src/styles/typography/utilities.css:77-79` is byte-identical in intent, and `grep -rn font-serif-math` in the producer returns the same single fallback site.
4. Body/prose: `style.css:20` applies `font-serif` to `html, body`. Tailwind's `font-serif` reads `--font-serif`, which glass-ui bridges in `@theme inline` (`dist/styles/theme/bridges.css:12` opens the block; `:68`) as `--font-serif: var(--font-stack-text)`, and `dist/styles/tokens/scheme-motion.css:43` gives `--font-stack-text: "Plus Jakarta Sans", "Plus Jakarta Sans Fallback", system-ui, sans-serif`. The bridge comment is explicit: "`--font-serif` is a bridge alias for the demo configurator's 'serif' control slot — it resolves to the SAME text register (the library carries no display-serif voice)." So the app's body face is a **sans**.
5. And Plus Jakarta Sans is not even loaded — fourier imports `@mkbabb/glass-ui/styles` only (`style.css:3`), never the separate `@mkbabb/glass-ui/styles/fonts` subpath the library documents as the face carrier (`dist/styles/index.css:10,24`). So the stack falls to `system-ui`.
6. Fourier's own remap is unreachable from here: `style.css:13-15` sets `@theme { --font-sans: "Computer Modern Serif", … }`, and the file's own header claims "the brand fork remaps the `font-sans` Tailwind utility onto Computer Modern Serif" (`:5-6`) — but nothing in this panel's graph uses `font-sans`. Meanwhile `index.html:12-14` preloads `cmunrm.woff`, `cmunbx.woff`, `cmunti.woff` at font priority, and `public/fonts.css:15-36` declares the four Computer Modern faces. Three render-blocking-priority preloads for a face this panel never reaches.
7. Numerals do land correctly: `.fira-code` → `var(--font-mono)` (`dist/styles/typography/utilities.css:69-72`) and `public/fonts.css:69` supplies the face.

Net, inside 17 lines: **Times** (title, via a dead custom property), **system-ui sans** (the tooltip prose, the "Show more" button label, the empty copy), **Fira Code** (indices, amplitudes, phases). The one face the product is *about* appears only in KaTeX (`style.css:52-61`) and a handful of hand-written `font-family: "Computer Modern Serif"` declarations elsewhere (`EquationModeToggle.vue:70`, the canvas `ctx.font` sites).

**Why this lands on *this* component.** The panel is where the mismatch is visible at closest range: a serif title, a sans subtitle 6px to its right (`CollapsibleSection.vue:39`), and a mono data table 4px below — three registers inside one 48px-tall closed card.

**Falsifier.** Define `--font-serif-math` anywhere in the cascade and the title claim dies (I grepped both library versions and the whole app). Show `--font-serif` or `--font-stack-text` overridden fourier-side (`grep -rn -- "--font-stack-text|--font-text|--font-serif" src/` returns only five *consumer* reads at `AppHeader.vue:326`, `HarmonicLevelGrid.vue:150`, `MorphPhaseConfig.vue:121`, `FourierMorphDemo.vue:190,215` — no definitions). Note the stale `dist/` *contradicts* this and would falsify it if it were current: it emits `.cm-serif{font-family:var(--font-serif)}` and `--font-serif:var(--font-stack-serif)`, i.e. an older, coherent library. That is m-10, and it means the deployed preview cannot be used as evidence either way.

---

### M-7 · MAJOR — the open-scroll affordance measures against the wrong element

**Claim.** `CollapsibleSection` tries to scroll a newly-opened section into view. In this consumer it resolves the *wrong* scroll container, producing a dead band in which opening the panel leaves it partly or wholly out of sight.

**Provenance.**
- The mechanism: `CollapsibleSection.vue:17-28` — on open, after `setTimeout(…, 250)`, take `rootEl.$el`, then `const scrollParent = el.closest('.overflow-y-auto, .overflow-auto') ?? el.parentElement;` and scroll only `if (rect.bottom > scrollParent.getBoundingClientRect().bottom)`.
- `closest()` matches **class names**, not computed overflow. The real scroll owner is `.eq-panel-left`, whose overflow arrives via `@apply … overflow-y-auto …` inside a *scoped style* (`EquationView.vue:373-375`) — so the element's class attribute is `eq-panel-left` (`:197`) and carries no literal `overflow-y-auto`. `closest()` cannot see it.
- What it matches instead is the app shell: `App.vue:26` — `<main class="flex-1 min-h-0 flex flex-col overflow-y-auto">`, a literal class. So the guard compares the section's rect against `<main>`'s rect.
- The two rects differ by a real margin at ≥1024px: the grid adds `padding: 0.5rem` with `padding-bottom: 0.75rem` (`EquationView.vue:344-345`), the column adds `pb-8` (`:374`), and the `::after` fade occupies the last `2.5rem` (`:366-367`). A panel whose bottom sits below `.eq-panel-left`'s visible foot but above `<main>`'s foot — a band on the order of 12–52px, plus whatever the fade occludes — fails the guard and is never scrolled. The user opens the section and the section stays under the fade.
- Secondary: the 250ms delay is a hand-tuned magic number against the 0.2s reveal (`CollapsibleSection.vue:61,64`) — and it is *unconditional*, so under `prefers-reduced-motion`, where the animation is forced to 0.01ms both by the consumer's own guard (`:66-71`) and by the library's blanket rule (`dist/styles/utilities/a11y-overrides.css:6-10`), the user still waits a quarter second for a scroll decision about an already-settled layout.
- Tertiary: `el.scrollIntoView({block:'end'})` when it *does* fire scrolls every scrollable ancestor, so the effect is not scoped to the column it was reasoning about.

**Falsifier.** Show an ancestor between the panel and `<main>` bearing a literal `overflow-y-auto`/`overflow-auto` class (I read the chain: `.eq-panel-left` `:197` → `.eq-panel-left-wrap` `:196` → `.eq-grid` `:194` → the route root `:193` → `<main>` `App.vue:26`); or show that `.eq-panel-left`'s foot coincides with `<main>`'s at every breakpoint (the padding/`pb-8`/fade above says otherwise). The size of the dead band is `UNPROVEN-NEEDS-LIVE (SS-13)`; its existence is static.

---

### M-8 · MAJOR — post-uplift the panel is unreachable until its host compiles

**Claim.** Nothing in this component breaks at the import level under F.W1. Its host does, so the panel cannot be seen at all until the host is cured — which matters here because the panel's *other* uplift regression (B-1) is invisible-by-nature and will be masked by the noisier host break.

**Provenance.** `EquationView.vue:9-10` imports `HoverCard, HoverCardTrigger, HoverCardContent` from `@mkbabb/glass-ui/hover-card` and `MetricBadge` from `@mkbabb/glass-ui/metric-badge`. Both subpaths are on the census's enumerated removal list — "removed subpaths in live use (`metric-badge` ×7 files, `hover-card` ×2, `hover-popover` ×2)" (CENSUS lines 102-103), restated as F.W1 work at lines 184-186. The producer's replacement family for the badge is `./metric` (`glass-ui@7 src/components/metric/{Metric,MetricCell,MetricRow,MetricStack}.vue`); `./hover-card` has no same-named successor in the 7 export list.

**Consequence for this panel's remediation order.** The obvious cure for m-1 (put a coefficient count in the collapsed header) is a one-line `MetricBadge` adoption *today* — and it would be undone by F.W1 within the same tranche. Target `./metric` instead, after the uplift, or use plain type. Recording that here so the cure does not get written twice.

**Falsifier.** Show `metric-badge`/`hover-card` still exported at 7 — I enumerated `package.json` exports for the producer (80 → the 7 list contains `./metric`, no `./metric-badge`, no `./hover-card`). Or show `EquationView` is not among the census's seven metric-badge files, which would only change the count, not this component's reachability.

---

### m-1 · MINOR — the `#actions` slot is left empty, so cardinality is behind the disclosure

`CollapsibleSection` exposes a header-right slot — `CollapsibleSection.vue:43`, `<slot name="actions" />` — and this consumer passes nothing (`EqCoefficientsPanel.vue:13-15`). The consequence is a decision the user cannot make: the collapsed header says "Coefficients — Fourier spectrum" and nothing else, while the *first line inside* is a right-aligned `12 / 20` count (`CoefficientsSpectrum.vue:72-75`). To learn whether opening is worth it, you must open it. The information is already computed and already rendered — it is merely on the wrong side of the fold. **Falsifier:** show the count is available elsewhere in the collapsed left column (`FunctionInput` surfaces `effectiveN`/`energyCaptured` per `EquationView.vue:205-206`, which is the harmonic budget, not the coefficient count — a related but distinct number, and arguably the confusion is the point). Cure target per M-8: `./metric`, post-uplift.

### m-2 · MINOR — asymmetric vertical rhythm; the closed panel is 58% chrome

Derived stack at the desktop root (16px, `style.css:44-49`), Tailwind `--spacing: 0.25rem`:

| band | source | px |
|---|---|---|
| card top pad | `EqCoefficientsPanel.vue:12` `py-2` | 8 |
| trigger top pad | `CollapsibleSection.vue:36` `py-1.5` | 6 |
| label line-box | `text-sm` → `line-height: 1.25rem` | 20 |
| trigger bottom pad | same | 6 |
| content top pad | `CoefficientsSpectrum.vue:67` `pt-1` | 4 |
| … content … | | |
| content bottom pad | `CollapsibleSection.vue:46` `pb-1` | 4 |
| card bottom pad | `py-2` | 8 |

Above the label: 14px. Below the last content row: 12px — a 2px optical lean, on a card whose whole visible chrome is 28px. Closed height 8+32+8 = **48px** for a 20px label: 58% of the closed panel is padding. Neither number is a token decision; they are three independent authors' defaults stacked (m-8). **Falsifier:** measure the rendered box (`UNPROVEN-NEEDS-LIVE (SS-13)` for optical effect); recompute if `line-height` differs from Tailwind's `text-sm` pairing. Mobile multiplies every row by 1.125 (`style.css:40-43` sets `html { font-size: 1.125rem }` below 768px) — every row *except* the one in m-11.

### m-3 · MINOR — no rule between header and body

When open, the label and the coefficient table are separated by 10px of whitespace and nothing else. Both library registers ship a hairline for exactly this: `dist/styles/configurator.css:60-62` binds `.configurator-layer` to `--configurator-divider-section`, minted "so the sections run together" would stop being true across both plates (`:44-58`), and glass 7 carries the same idea into the disclosure register. The panel gets neither, because it is neither. **Falsifier:** show a deliberate no-divider register for this route — but note `EquationView.vue` uses `divider`-free cards throughout, so the register may be real; in that case demote to INFO and read this row as "the panel inherits an undifferentiated hierarchy the library already solved."

### m-4 · MINOR — trigger below the house touch floor

Trigger box height = 6 + 20 + 6 = **32px** desktop, ~36px mobile (m-2 scale). WCAG 2.5.8 AA (24px) passes; 2.5.5 AAA (44px) fails; and glass-ui's own house floor is `--touch-target: 2.75rem` = 44px — applied by `dist/styles/utilities/a11y-overrides.css:31-37` to exactly three selectors: `[data-size="icon"]`, `.expandable-container__trigger`, `.segmented-tabs__trigger`. `[data-slot="collapsible-trigger"]` is not among them, so the library's floor does not reach this control even though the library minted the control. **Falsifier:** measure `clientHeight` on a coarse pointer (`UNPROVEN-NEEDS-LIVE (SS-13)`); or show a fourier-side coarse rule (none — `grep -rn "pointer: coarse" src/` finds no equation-route rule).

### m-5 · MINOR — the subtitle over-promises the content

`subtitle="Fourier spectrum"` (`EqCoefficientsPanel.vue:13`) sets an expectation the panel then declines to meet: the shared body's `#graph` slot — the actual spectrum plot — is passed by the *sibling* consumer (`visualization/CoefficientsPanel.vue:16-22`, `<FrequencyGraph :max-bars="40">`) and left empty here, a divergence the shared component documents as deliberate (`CoefficientsSpectrum.vue:6-10, 68-69`). So the equation route's "spectrum" is a bar list. Compounding the oddity, `FrequencyGraph.vue` **lives in `components/equation/`** and is imported only from `components/visualization/` (`grep -rn FrequencyGraph src/`) — the graph is filed under the route that doesn't use it. Secondary prose note: "Coefficients — Fourier spectrum" is a restatement, not a gloss; the em-dash slot (`CollapsibleSection.vue:40`) is doing no work. **Falsifier:** a product decision that the equation route deliberately omits the plot (plausible — the route already has `ConvergencePlot`); that retires the promise half and leaves the misfiling.

### m-6 · MINOR — collapsed-by-default *and* `v-if`-gated, with no memory

`:default-open="false"` (`EqCoefficientsPanel.vue:13`) + `v-if="components.length"` (`EquationView.vue:213`) means: user computes → a 48px collapsed strip slides in → user must click to see what they just asked for. And the open state is per-mount only: `const open = ref(props.defaultOpen)` (`CollapsibleSection.vue:14`), no persistence, while the route persists everything else it cares about (`saveCachedInputState`, `saveCachedResult`, `EquationView.vue:160-172`). Leave the route and return: collapsed again. glass-ui ships the state-memory shape for this — `useConfiguratorState` (`dist/useConfiguratorState-kiIlun8I.js`, typed at `dist/components/custom/configurator/useConfiguratorState.d.ts`) — unused here. **Falsifier:** show `default-open: false` is a deliberate progressive-disclosure choice (the sibling route makes the same choice, so it likely is) — in which case the finding narrows to the missing persistence, which the route's own caching habit makes anomalous.

### m-7 · MINOR — the mount transition declares no reduced-motion intent

`<Transition name="slide-down">` wraps the panel (`EquationView.vue:212`) and its classes translate 8px on enter / 4px on leave (`:449-452`), with **no** `prefers-reduced-motion` bracket — unlike the visualization route, which brackets its equivalent (`VisualizationView.vue:306-310`, "bracketed by `prefers-reduced-motion` — the glass-ui …"), and unlike `style.css:92-96`, which brackets the tab entry. It is mitigated *accidentally*: the library's blanket rule (`a11y-overrides.css:12-16`) rewrites `transition-property` to `opacity, color, background-color, border-color, box-shadow !important`, dropping `translate`/`transform` from the transitioned set, so the spatial part snaps and the fade survives — which is the correct nuanced read. But the consumer neither declares nor tests it, so it is one substrate change away from being a real defect. Severity held at MINOR *because* the mitigation is real today. **Falsifier:** show glass 7 narrows or removes that blanket rule (then this becomes MAJOR and joins B-1's family); or show a local bracket I missed (`grep -n prefers-reduced-motion src/components/equation/EquationView.vue` → nothing).

### m-8 · MINOR — a padding ledger with three authors and no owner

`px-3 py-2` (this file, `:12`) sits over `py-1.5` (`CollapsibleSection.vue:36`) over `pb-1` (`:46`) over `pt-1` (`CoefficientsSpectrum.vue:67`) — four padding decisions in four files for one card, none aware of the others, producing m-2's asymmetry. Note the horizontal register *is* coherent (see S-5), which makes the vertical incoherence the sharper finding: someone standardised one axis and not the other. **Falsifier:** show a documented split of responsibility (card owns outer, section owns trigger, body owns content) — that would be a defensible contract, but then the 14/12 asymmetry is a bug *within* the contract rather than an absence of one.

### m-9 · MINOR — zero automated coverage of this route

`web/e2e/` contains `contour-extraction`, `gallery`, `paper-performance`, `settings-persistence`, `visual-baseline`, `visualization-crud`, `visualization-ux`, `workspace-flow`. There is no `equation-*.spec.ts`, and `grep -rn -i "coefficient|collapsib" e2e/` returns only visualization-route and paper-route matches (`visualization-ux.spec.ts:120`, `paper-performance.spec.ts:79-126`, `contour-extraction.spec.ts:60,109`). So the disclosure, the empty branch, the stale-during-recompute path and the reveal animation are all unexercised — which is precisely why B-1 can ship green. **Falsifier:** point to a spec that opens this panel.

### m-10 · MINOR — the shipped build disagrees with the installed pin

`dist/assets/index-57FkGzlZ.css` emits `.cartoon-card{…transition:translate var(--duration-normal) var(--ease-apple-spring),box-shadow var(--duration-normal) var(--ease-apple)…}` and `.cm-serif{font-family:var(--font-serif)}` with `--font-serif:var(--font-stack-serif)`. The installed glass-ui 4.0.0 uses `--spring-smooth`/`--ease-standard` (`dist/styles/cards.css:40-42`) and `var(--font-serif-math, serif)` (`typography/utilities.css:66`), and defines no `--font-stack-serif` at all (grep → nothing). So `dist/` was built against an older library. Design consequence: any visual sign-off taken from the deployed preview is evidence about a tree that no longer exists — including, specifically, evidence about M-6, where the stale build is *coherent* and the current tree is not. I used `dist/` only where it proves a **mechanism** (that `@apply` inlines a utility's nested `:hover` rule, M-4; that scoped specificity emits as computed, B-1) and never for token identity. **Falsifier:** rebuild and diff; if the fresh build matches `node_modules`, this row closes and M-4/B-1's mechanism claims stand on the fresh artefact instead.

### m-11 · MINOR — the one fixed-px dimension is out of scale where the type grows

Everything in the panel's box model is rem-derived and therefore tracks `style.css:40-50`'s responsive root (1.125rem below 768px, 1rem above) — except `max-h-[300px]` (`CoefficientsSpectrum.vue:78`), a raw pixel cap. On the narrow viewport, type and padding grow 12.5% while the list's height cap does not, so the visible row count drops by roughly one-eighth on exactly the device with the least room to spare — and the inner scroller (M-5) gets proportionally busier there. **Falsifier:** show `max-h-[300px]` chosen against a device constraint rather than a type scale; or show Tailwind resolving the arbitrary value against `--spacing` (it does not — bracket values are literal).

### i-1 · INFO — the frame is the panel's only edge cue, at ≈1.90:1 against its own fill

Computed from token literals: `--border` → `--neutral-4` → `hsl(32 26% 70%)`, relative luminance **0.4714**; `--card` → `hsl(36 48% 97%)`, luminance **0.9421** → ratio **1.90:1**. The panel has no radius (M-3) and no divider (m-3), so this 2px line is the entire boundary between the coefficient table and the page. WCAG 1.4.11 targets boundaries needed to *identify a control*, which a decorative card is not, so this is INFO rather than a contrast failure — but combined with M-3 and the offset stamp being the only other depth cue, the panel's containment reads thin. **Falsifier:** recompute against `--background` rather than `--card` if the intended figure/ground pair is card-vs-page; or show a `.dark` arm that differs materially (`dark-arm.css:46,64` → `hsl(30 16% 34%)` on `hsl(24 8% 16%)`, a stronger step).

### i-2 · INFO → the a11y surface is thin today and the uplift **improves** it

The panel's root `<div>` (`:12`) carries no `role`, no `aria-label`, no heading. The title is a `<span>` inside the trigger (`CollapsibleSection.vue:39`) — so there is no heading at any level for "Coefficients", and no landmark. At the pin, the content region carries no `role="region"` either: `dist/CollapsibleContent-C_s6fG7r.js` shows CollapsibleContent forwarding only `class="overflow-hidden transition-collapse data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down"` to reka's primitive — no role, no `aria-labelledby`. Glass 7 **adds both**: `glass-ui@7 src/components/collapsible/CollapsibleContent.vue:47-48` sets `role="region"` and `:aria-labelledby="ids.trigger"` off a shared disclosure id context (`_shared/disclosure/disclosure-context.ts:13`). So F.W1 hands this panel a labelled region for free. What it does *not* hand over is a heading — that remains the consumer's to add. **Falsifier:** show reka-ui's `CollapsibleContent` already emitting `role="region"` at 2.9.10 (then the pin is fine and only the heading gap stands).

### i-3 · INFO — an admin type token in a public tooltip

`CoefficientsSpectrum.vue:110` sets the tooltip's detail grid to `text-admin-label`, bridged from `--type-admin-label` (`dist/styles/theme/bridges.css:15`). The panel is a public equation-route readout; the admin register is a distinct, deliberately-smaller rung. `[inherited]` — the choice-point is this panel's decision to render the shared body unmodified, which is otherwise its virtue (S-1). **Falsifier:** show `--type-admin-label` is a general micro rung despite its name (`typography/scale.css` places it below `--type-micro` in the bridge order, which argues the opposite).

### i-4 · INFO — the uplift also *improves* two things here, unrecorded

Flagging both, because an unrecorded improvement is an unverified one and F.W1's diff review will not be looking for them:
1. **The false hover-lift disappears.** `glass-ui@7 src/components/card/styles.css:98-102` reduces `cartoon-surface` to `position: relative; border-width: 2px; box-shadow: var(--shadow-cartoon-md)` — no translate, no transition, no `:hover`. The lift becomes opt-in via `.hover-lift` (`src/styles/utilities/components.css:73-93`). For this non-interactive container that is a straight win (M-4 self-cures); for genuinely interactive cartoon cards elsewhere in fourier it is a silent *loss* of affordance, which belongs on the census's CSS arm beside B-1.
2. **The content region gains `role="region"` + `aria-labelledby`** (i-2).
   Also neutral-but-notable: glass 7's `.disclosure-content` sets `color: var(--muted-foreground-strong)` and `font-size: var(--type-small)` on the region (`disclosure.css:90-97`), and its body register is `padding: 0 0.25rem 1rem` (`:115-117`) against this consumer's `pb-1` = 4px — so post-uplift the panel's inner padding will be 4px where every library-native disclosure in the app is 16px. **Falsifier for the whole row:** show `cartoon-surface` at 7 retains the lift (it does not — I read the whole utility), or show fourier's shim re-adding it (`style.css:107-111` adds only `border-color` and `background`).

---

## 3 · Superlatives (L-18 runs both ways)

**S-1 · The two-consumer extraction is exemplary, and this file is the proof.** The equation and visualization routes shared ~95% of a coefficient readout; the shared body now lives once (`CoefficientsSpectrum.vue`), the single structural divergence is isolated in one named slot (`#graph`, `:68-70`), and the two wrappers are 17 and 25 lines. The header comment states the extraction's terms honestly, including what diverged and why (`:1-14`). This is the right shape, done for the right reason, and documented at the seam. **Falsifier:** find a second divergence forced through the shared component — e.g. a route-conditional prop or a `v-if` on route identity inside `CoefficientsSpectrum`. I read it whole; there is none. (Intake row **R3-7a** independently confirms this file among the nine Tooltip consumers with 2 callsites, i.e. the shared body is genuinely shared, not a fork.)

**S-2 · The muted register clears AA in both arms from tokens alone.** Subtitle and all secondary text use `text-muted-foreground` on `var(--card)` with no local override. Computed: light `--muted-foreground` → `--neutral-5` → `hsl(30 22% 40%)` (luminance 0.1440) on `--card` `hsl(36 48% 97%)` (0.9421) = **5.11:1**; dark `hsl(34 14% 62%)` (0.3588) on `hsl(24 8% 16%)` (0.0220) = **5.68:1**. Both clear 4.5:1 for normal text at the 12px the subtitle actually renders. The panel earns this by *not* reaching for a custom colour. **Falsifier:** recompute; or find a fourier override of `--muted-foreground`/`--card` (`style.css` overrides only `--viz-amber`/`--section-color-5`, `:113-124`).

**S-3 · The trigger inherits a conformant focus ring, unconditionally.** `dist/CollapsibleContent-C_s6fG7r.js` shows CollapsibleTrigger merging `"tap-squish focus-ring rounded-control transition-control disabled:pointer-events-none disabled:opacity-disabled"` with the consumer's class list through `cn()` — so the consumer's six utilities (`CollapsibleSection.vue:36`) cannot displace the ring, the tap feedback, or the disabled semantics. This panel gets a keyboard-visible, house-standard focus treatment without a line of its own, in a codebase where four other focus rings had to be hand-restored at the global layer (`style.css:136-141`). **Falsifier:** show `cn()` last-wins dropping `focus-ring` for a conflicting consumer utility (the consumer passes none in that family), or a global `outline: none` reset that defeats it (`grep -rn "outline:\s*none" src/style.css` → only inside the forced-colors and focus blocks).

**S-4 · The consumer's own reduced-motion guard is belt-and-braces, and correct.** `CollapsibleSection.vue:66-71` zeroes the reveal animation under `prefers-reduced-motion` even though the library's blanket rule already caps `animation-duration` at 0.01ms (`a11y-overrides.css:6-10`). Redundant, defensive, and — unlike the mount transition (m-7) — *declared*, so the intent survives a substrate change. That is the right instinct expressed in the wrong place: had the same instinct been applied to the keyframe *names*, B-1 would not exist. **Falsifier:** show the guard's specificity losing to the library's `!important` (it does not need to win — both reach the same result), or show `animation: none` breaking reka's Presence unmount (Presence falls through on zero-duration; the pin's own blanket rule proves the pattern is expected).

**S-5 · The horizontal register is exactly in tune with its column.** `px-3 py-2` is the equation route's house card padding: six of the route's nine `cartoon-card` sites use precisely it (`InfoCard.vue:18`, `FunctionInput.vue:93,175`, `EquationView.vue:239,243,308`, and this file `:12`); the outliers are the centred error card (`p-4`, `:230`) and the fixed-height equation card (`:251`). The panel does not invent a padding — it joins one. **Falsifier:** show `px-3 py-2` is itself off the token scale (it is not — `--spacing`-derived) or that the six sites are coincidence rather than register (the identical pairing across three files argues register).

---

## 4 · Falsified candidates (recorded so they are not re-litigated)

1. **"CollapsibleSection's scoped CSS is code-split into `NotationPills`, so the equation route can render an unstyled collapsible."** The built CSS does place `[data-v-16a925e2]` in `dist/assets/NotationPills-CjQ8uEBB.css`. But `EquationView.vue:14` statically imports `FunctionInput`, which imports `CollapsibleSection` — so it is in the route's eager graph and the chunk is fetched with it. **FALSE.** Chunk naming is cosmetic here.
2. **"`collapsible-open`/`collapsible-close` are already dead under the installed pin, so the reveal never worked."** They are defined at `dist/styles/animations.css:18,29`, imported into the single `styles` entry at `dist/styles/index.css:162`, and present in the built `index-*.css`. **FALSE** — which is exactly what makes B-1 a *regression* rather than a pre-existing defect.
3. **"The hover lift survives `prefers-reduced-motion`, so it is also a motion-a11y defect."** `a11y-overrides.css:12-16` rewrites `transition-property` to an opacity/colour/shadow allowlist with `!important`, dropping `translate`. The hover state still applies, instantly — the correct nuanced reading of PRM (remove animation, not state). **FALSE**; M-4 stands on false affordance and axis drift only.
4. **"`@apply cartoon-surface` hard-fails the Tailwind build post-uplift, because the utility is removed."** `cartoon-surface` survives at `glass-ui@7 src/components/card/styles.css:98` and `src/styles/index.css:183` keeps `components/card/styles.css` in the `styles` cascade, so the `@utility` remains registered for consumer `@apply`. **FALSE** — the shim compiles; it just quietly loses the lift (i-4).
5. **"`cartoon-surface`'s `translate: 0` mints a containing block that mispositions the portaled tooltips."** The pin's own comment flags the concern (`cards.css:36-39`, "a card surface that often hosts portaled content"), but reka-ui teleports `TooltipContent` to `body`, outside the card's subtree — verified through the shim `ui/tooltip/Tooltip.vue:26-35` → `@mkbabb/glass-ui/tooltip` → reka `TooltipPortal`. **FALSE.**

---

## 5 · Verdict

The component is **DEFECTIVE**, and interestingly so: nothing is wrong with the seventeen lines *as prose*. What is wrong is everything they delegate. It selects a retired CSS class over the primitive that replaced it (M-2), and inherits from that choice a square frame among round children (M-3) and a hover lift on an inert box (M-4). It selects a local disclosure over the library's section register and inherits a heading 1.46× smaller than the same heading one route away (M-1), a title in a font nobody chose (M-6), a dead auto-scroll (M-7), and a reveal that will stop existing the moment the pin moves (B-1). It declares an empty state the parent's own gate makes unreachable, and covers none of the three states the axis names (B-2).

Two things it does genuinely well, and they should survive any remediation: the shared-body extraction (S-1) and the discipline of using only house tokens for colour and horizontal rhythm (S-2, S-5).

**For F.W1, the one item that must not be lost:** B-1 is a CSS-identifier break, and the census's break surface is import-level only. Add the CSS arm before the uplift lands, or the panel's motion dies green.
