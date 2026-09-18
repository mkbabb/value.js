claude-opus-5[1m] (served model id)

# CHALLENGE — `EqCoefficientsPanel.vue` · axis **D** (DESIGN)

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/equation/EqCoefficientsPanel.vue` (17 lines)
**Posture** DEFECTIVE-until-the-tree-proves-otherwise. Every claim carries severity + `file:line` + its own falsifier. Superlatives carry them too (L-18 runs both ways).
**Method** Static + source-derived only. No browser. Contrast figures recomputed here from the shipped token literals with the WCAG 2.x relative-luminance formula (sRGB linearisation, `(L₁+0.05)/(L₂+0.05)`). Spacing figures computed from Tailwind v4's `--spacing: 0.25rem` against the app's own root-font rule. Livable-only claims marked `UNPROVEN-NEEDS-LIVE (SS-13)`.

**Read whole (read-only)** — the subject and its full import closure:
`web/src/components/ui/CollapsibleSection.vue` · `web/src/components/shared/CoefficientsSpectrum.vue` · `web/src/components/ui/tooltip/{Tooltip.vue,index.ts}` · `web/src/lib/types.ts`.
Host + substrate read for provenance: `web/src/style.css` · `web/src/App.vue` · `web/src/components/equation/EquationView.vue` (the sole consumer) · `web/src/components/equation/{FunctionInput,InfoCard,FrequencyGraph}.vue` · `web/src/components/visualization/CoefficientsPanel.vue` (the sibling wrapper over the same shared body) · `web/src/lib/equation/types.ts` · `api/routers/equations.py` · `web/e2e/**` · `web/dist/assets/{index-57FkGzlZ,NotationPills-CjQ8uEBB}.css` (built-CSS evidence, **stale** — see m-10).
Library evidence, **the old pin** — `web/node_modules/@mkbabb/glass-ui@4.0.0`: `dist/CollapsibleContent-C_s6fG7r.js`, `dist/CardAction-XH4YBVEK.js`, `dist/components/ui/card/Card.vue.d.ts`, `dist/styles/{index,cards,animations,configurator}.css`, `dist/styles/tokens/{color-radius,dark-arm,offsets-sizing,scheme-motion,shadow}.css`, `dist/styles/theme/{bridges,radius}.css`, `dist/styles/typography/{scale,utilities}.css`, `dist/styles/utilities/a11y-overrides.css`, `package.json`.
Library evidence, **the producer** — `/Users/mkbabb/Programming/glass-ui` @ **7.0.0**: `src/components/collapsible/{CollapsibleContent,CollapsibleTrigger}.vue`, `src/components/_shared/disclosure/disclosure.css`, `src/components/_shared/axes.ts`, `src/components/card/{Card.vue,styles.css}`, `src/components/configurator/styles.css`, `src/components/button/Button.vue`, `src/components/metric/Metric.vue`, `src/styles/{animations.css,typography/{scale,utilities}.css,theme/bridges.css,tokens/sizing-config.css,utilities/a11y-overrides.css}`, `MIGRATION.md`, `package.json` (73 export subpaths).
Also read: `node_modules/reka-ui@2.9.10` `dist/Primitive/{Primitive,Slot}.js`.

**Tally — 27 defects (2 BLOCKER · 8 MAJOR · 12 MINOR · 5 INFO) · 6 superlatives · 8 falsified candidates · 5 corrections to the hitherto corpus (incl. one to a prior pass on this same subject).**

> **Fold note.** A prior D-axis pass on this subject stands **folded** into this document: its findings are carried in substance, not re-derived, and every one of them was re-verified against the live tree for this pass. **Five of its claims are amended on direct evidence** — see §5 (X-1..X-5); the substantive one is X-2, which changes the *cure*, not the finding. Findings authored inside `CollapsibleSection.vue` or `CoefficientsSpectrum.vue` are marked `[inherited]` and cite the sibling challenge that owns them rather than re-litigating; what this document adds in those rows is the **compositional** consequence — what the wrapper's own choices do to them.

---

## §0 · Corpus fold (cited, not re-derived)

| corpus row | status here |
|---|---|
| `CENSUS-2026-08-03.md:102-105` — the uplift break surface: `metric-badge` ×7 files, `hover-card` ×2, `hover-popover` ×2, `DockIconButton` ×2, `DockDropdownTrigger` ×1, `ToastVariant`, lucide ×35 | **CONFIRMED and EXTENDED.** The subject imports none of them; its **host** imports two (`EquationView.vue:9-10` — `hover-card` + `metric-badge`), which is M-8. The extension: the break surface is **import-level only** and therefore misses this panel's *CSS-identifier* break (B-2) and its *prop-value* break (i-5). Recommend the §5 addendum a **CSS/prop arm** — this is the third independent request for that addendum (`CollapsibleSection/challenge-D-design.md` B-1; `CoefficientsSpectrum/challenge-D-design.md` M-4/M-8; here). |
| `CENSUS-2026-08-03.md:184-186` — F.W1 = the atomic tri-package uplift, "cure the break surface" | Not contested. This document adds **sequencing**: three of this panel's cures (M-1, M-2, m-1) are *different code* before and after F.W1 — see §4 Routing. |
| `CENSUS-2026-08-03.md:256-259` — "[P2] Uplift lands with no unit-test net"; vitest ABSENT, 29 single-chromium Playwright specs | **CONFIRMED and SHARPENED for this subject**: not one of the 29 exercises this route's panel (m-9). The panel is the *worst-covered* witness of B-2. |
| `lane-frontend.md:182` — `CollapsibleSection.vue` (72 LOC) "thin wrapper over glass-ui `Collapsible`" | Confirmed; the design consequence of "thin" is M-1 (it wraps the *primitive*, not the library's **section** register, which is what the sibling route uses). |
| `lane-frontend.md:180,428` — `CoefficientsSpectrum.vue` 168 LOC, SHADOW candidate | Not contested; the shared-body defects are the sibling challenge's. |
| `lane-frontend.md:384` — "**25 application sites**" consume the `cartoon-card` shim | **CONTRADICTED (arithmetic).** Live count: **21 application sites over 14 `.vue` files**; 25 is the raw string count including `style.css`'s own **4** self-references (`:98,:99,:101,:107`). 21 + 4 = 25. See m-12 — which also catches the shim's *own* prose claiming 14. |
| `lane-frontend.md:437` — `CoefficientsPanel`/`EqCoefficientsPanel` → `./metric-stack` (4.0.0) → `./metric` (7.0.0) | **CONFIRMED as the right target and re-timed**: `./metric` exists at 7 (`package.json` exports) and `Metric.vue:10,23,26,33` ships exactly the `loading` + `data-loading` + `aria-busy` contract B-1 says this panel lacks. Adopt **after** F.W1, never before (M-8). |
| `intakes/lane-fourier-r3-r6.md:79` — **R3-7a** TRUE / CARRY→F.W3: "35 Tooltip callsites over nine consumers", `CoefficientsSpectrum` 2 | **CONFIRMED** — and both of that file's callsites render *inside this panel*, so this wrapper is a live consumer of the F.W3 tooltip-adapter migration budget without owning a single tooltip line. |
| `intakes/lane-fourier-r3-r6.md:84` — **R3-10** TRUE / CARRY→F.W4: six dynamic `:is` families, `CoefficientsSpectrum.vue:132` one of the two dropped | **CONFIRMED at `:132`**; renders inside this panel (the Show-more chevron). No further claim here. |
| `CoefficientsSpectrum/challenge-D-design.md` — B-1 (tooltip trigger non-focusable), B-2 (rainbow-ramp bars below 3:1), M-4 (`variant="ghost"` deleted at 7), M-8 (`text-admin-label` deleted at 7), m-1 (orphan Tooltip below 13 coefficients) | **All re-verified true against the tree** and **not re-derived here**. Their compositional consequence for *this* wrapper is i-3 and i-5. |
| `CollapsibleSection/challenge-D-design.md` — B-1 (keyframes die at 7), B-2 (no heading semantics), M-3 (scroll-parent probe can never match), M-5 (`cm-serif` → generic serif), M-6 (250 ms timer short at 7), M-7 (no controlled `open`) | **All re-verified true.** Carried here as B-2, i-2, M-7(part), M-7(part), m-6 — always attributed, never re-derived. |

---

## §1 · What the component is, and the honest frame

Seventeen lines: one `<div class="cartoon-card px-3 py-2">`, one `<CollapsibleSection title subtitle :default-open="false">`, one `<CoefficientsSpectrum :components empty-text>`. No script beyond a single `defineProps`. No scoped style at all.

So the D-axis surface here is almost entirely **compositional**: which chrome it selects, which section register it joins, what padding ledger it opens, which states it declares, what motion it inherits, and what those choices cost when set beside the sibling wrapper that renders the *same* body one route away. Judged that way it is not thin. It is the seam where four design systems meet — the fourier-local `cartoon-card` shim, the local `CollapsibleSection`, the shared `CoefficientsSpectrum`, and glass-ui's own card/disclosure/section registers — and it reconciles none of them.

Two structural facts govern every finding below:

1. **It has a twin.** `visualization/CoefficientsPanel.vue` wraps the identical body in `<ConfiguratorLayer label="Coefficients" sub="Fourier spectrum">` (`:14`). Same strings, same body, different chrome. Every divergence between the two wrappers is a *decision*, not an accident, and is legible as such.
2. **It has no state authority.** Its mount, its gate, and its enter/leave motion are authored one level up (`EquationView.vue:212-213`). Those are design properties *of this panel*; they are provenanced to the host explicitly wherever cited.

---

## §2 · Findings (index)

| id | sev | claim (one line) | anchor |
|---|---|---|---|
| B-1 | BLOCKER | Zero of the three named states are covered, and the one it *declares* is provably dead code | `EqCoefficientsPanel.vue:14` · `EquationView.vue:213` |
| B-2 | BLOCKER | `[inherited]` The panel's only motion dies **silently** at F.W1 — and this is the least-tested surface it dies on | `CollapsibleSection.vue:60-65` · producer `animations.css` |
| M-1 | MAJOR | Same heading, two routes, 14 px here vs 20.4 px there — and the gap **widens to 1.85×** at 7.0.0 | `CollapsibleSection.vue:39` · `offsets-sizing.css:499` · producer `sizing-config.css:40` |
| M-2 | MAJOR | glass-ui-first violation: a resurrected dead class where `<Card>` shipped — and the naive cure is a **type error at 7** | `EqCoefficientsPanel.vue:12` · `style.css:107-111` · producer `axes.ts:22` |
| M-3 | MAJOR | The card frame renders at **0 px radius** while `--radius-card` = 1 rem and five of its children are pills | built CSS · `theme/radius.css:21,32` |
| M-4 | MAJOR | False affordance: a hover lift + shadow bloom on a non-interactive container, drifting **diagonally** | `dist/styles/cards.css:44-47` |
| M-5 | MAJOR | **The list is not the equation.** The panel enumerates *all* coefficients beside a formula rendered from a `budget` subset — nothing labels the difference | `EquationView.vue:213` · `api/routers/equations.py:90,126` |
| M-6 | MAJOR | A 300 px scroller inside a scroller: no containment, no gutter, no edge — and the column's fade misattributes to the panel | `CoefficientsSpectrum.vue:78` · `EquationView.vue:364-375` |
| M-7 | MAJOR | Three typefaces inside one 48 px card, and **none is Computer Modern** | `typography/utilities.css:66` · `theme/bridges.css:68` |
| M-8 | MAJOR | Post-uplift the panel is unreachable until its host compiles — which **masks** B-2 | `EquationView.vue:9-10` · CENSUS `:102-103` |
| m-1 | MINOR | The `#actions` slot is left empty, so cardinality sits behind the fold it should inform | `CollapsibleSection.vue:43` |
| m-2 | MINOR | Asymmetric vertical rhythm (14 px / 12 px); the closed panel is **58 % chrome** | derived, §3 m-2 |
| m-3 | MINOR | No header/body rule; both library registers ship one | `configurator.css:60-62` · `disclosure.css` |
| m-4 | MINOR | Trigger ≈32 px — under the house `--touch-target` floor, and **not** cured by 7 | `a11y-overrides.css:115-122` · `disclosure.css:40-43,55-61` |
| m-5 | MINOR | The subtitle over-promises: "Fourier spectrum" delivered without the spectrum; `FrequencyGraph` is misfiled | `EqCoefficientsPanel.vue:13` · `CoefficientsPanel.vue:5` |
| m-6 | MINOR | Collapsed-by-default **and** `v-if`-gated **and** unpersisted, in a route that caches everything else | `EquationView.vue:213` · `CollapsibleSection.vue:14` |
| m-7 | MINOR | The mount transition declares no reduced-motion intent; the mitigation is a substrate accident | `EquationView.vue:212,449-452` |
| m-8 | MINOR | A four-author padding ledger with no owner | `EqCoefficientsPanel.vue:12` |
| m-9 | MINOR | Zero automated coverage — the equation route has no spec at all | `web/e2e/` listing |
| m-10 | MINOR | The shipped `dist/` disagrees with the installed pin → deployed-preview sign-off is unsound | built CSS vs `node_modules` |
| m-11 | MINOR | The subtree's one fixed-px dimension is out of scale on the viewport that boosts the root font | `CoefficientsSpectrum.vue:78` · `style.css:40-50` |
| m-12 | MINOR | The shim's own prose miscounts its consumption (14 claimed / **21** actual), and the corpus miscounts it differently (25) | `style.css:101-102` · `lane-frontend.md:384` |
| i-1 | INFO | The 2 px frame is the panel's only edge cue, at **1.90 : 1** light / **2.08 : 1** dark against its own fill | computed |
| i-2 | INFO | No role, no label, no heading — and 7.0.0 hands over the region binding for free | `CollapsibleContent-C_s6fG7r.js` · producer `CollapsibleContent.vue:47-48` |
| i-3 | INFO | An admin-register type token leaks into the public tooltip — **and 7.0.0 deletes it** | `CoefficientsSpectrum.vue:110` |
| i-4 | INFO | The uplift silently *improves* two things and silently *removes* a third; none is recorded | §3 i-4 |
| i-5 | INFO | Roll-up: four adjudicated uplift breaks render **inside** this panel while it imports none of them | §3 i-5 |

---

## §3 · The findings in full

### B-1 · BLOCKER — zero state coverage, and the declared state is dead code

**Claim.** The axis names three states — empty, error, loading. This panel implements none, and the one it *declares* can never render.

**Provenance.**
- The panel passes `empty-text="Compute to see coefficients"` (`EqCoefficientsPanel.vue:14`).
- The branch it targets is `CoefficientsSpectrum.vue:138-140` — `<p v-else …>{{ emptyText }}</p>`, whose `v-else` pairs with `v-if="topComponents.length"` at `:78`.
- `topComponents = props.components.slice(0, expanded ? 40 : 12)` (`:37-39`) → empty **iff** `components` is empty.
- The sole consumer mounts behind `v-if="components.length"` (`EquationView.vue:213`). So `components.length ≥ 1` is a mount precondition, the `v-else` is unreachable **in this consumer**, and the prop, the copy and the branch are all dead. (The sibling wrapper passes its own `empty-text` and is *not* gated — `CoefficientsPanel.vue:15` — so the same prop is live one route away. The divergence is this wrapper's.)
- **Loading: absent.** `EquationView.vue:239` renders a "Recomputing…" banner, but inside the **right** panel's results block (`:236-241`). The left column is untouched. During a recompute the panel keeps presenting the previous run's coefficients — amplitude bars, phases, Re/Im to four significant figures (`CoefficientsSpectrum.vue:110-119`) — visually indistinguishable from fresh.
- **Error: absent.** Same structure (`:243`). On a failed recompute `result.value` is retained (it is only reassigned on success, `:97-107`), so `components` keeps its old value and the panel keeps rendering stale numbers *beside a visible error banner*.
- **Empty: worse than absent.** Because the gate is `v-if`, a zero-coefficient result does not show the declared message — it **unmounts the panel**, animating it away through `<Transition name="slide-down">` (`:212`). The user loses the data, the affordance's location, and their own open/closed choice in one stroke.

**Why BLOCKER.** A numeric readout that cannot distinguish *current* from *last known* is a correctness surface, not a polish surface. This panel is the only place in the route that exposes four-significant-figure coefficients — i.e. exactly the numbers a user copies out. And the fix is not exotic: glass-ui 7 ships the contract (`Metric.vue:10,15,23,26,33` — `loading` prop → `data-loading` + `aria-busy` + placeholder coalescing), which `lane-frontend.md:437` already routes this component family toward.

**Cure sketch (not applied — read-only lane).** Drop the parent `v-if` so the panel owns its own zero state and the declared copy goes live; pass a `pending`/`stale` flag derived from `computing` and dim + `aria-busy` the body; keep the panel mounted across errors with a local tone (`feedback-tone.css` exists at both versions).

**Falsifier.** Show any code path where this component mounts with `components.length === 0` (that revives `empty-text` and demotes this to MAJOR), or a left-column staleness cue I missed in `EquationView.vue:194-218` — I read that block whole, it contains `FunctionInput` and this panel and nothing else.

---

### B-2 · BLOCKER `[inherited]` — the panel's only motion dies silently at F.W1

**Owner:** `CollapsibleSection/challenge-D-design.md` **B-1**. Mechanism re-verified here, not re-derived:

1. `CollapsibleSection.vue:60-65` paints the reveal itself in an **unlayered scoped block** — `animation: collapsible-open 0.2s var(--ease-out)` and the `closed` twin.
2. Under the pin the names are real: `node_modules/@mkbabb/glass-ui/dist/styles/animations.css:18,29` define both, `dist/styles/index.css` pulls `animations.css` into the single `@mkbabb/glass-ui/styles` entry that `style.css:3` imports, and the built `dist/assets/index-57FkGzlZ.css` contains `collapsible-open` (1 occurrence).
3. **At 7.0.0 both keyframes are gone.** `grep '^@keyframes' glass-ui/src/styles/animations.css` → twelve names, none `collapsible-*`; `grep -rn collapsible glass-ui/src/styles/` → nothing.
4. The replacement is a **differently named** register: `CollapsibleContent.vue:49` applies `cn('disclosure-content', …)`, driven by `_shared/disclosure/disclosure.css:90-113` (`animation-name: disclosure-open`).
5. The consumer's rule both **outranks** it (unlayered scoped CSS beats `@layer`; and `(0,3,0)` beats `(0,2,0)` at equal layer) and, because it uses the `animation` **shorthand**, **overwrites** `animation-name` with a keyframe-less ident. Result: no animation at all — hard snap on open *and* close, with reka's `Presence` tearing down immediately for want of an `animationend`.

**What this wrapper adds — and why it stays BLOCKER here.** Two things.
- *This is the panel's only motion.* Its other motion (the mount `slide-down`) belongs to the host, and under `prefers-reduced-motion` the substrate strips its spatial leg anyway (m-7). Remove the reveal and the panel has none.
- *It dies where nothing is watching.* `vue-tsc` cannot type a keyframe name; the census records vitest ABSENT and 29 single-chromium Playwright specs (`CENSUS:256-259`) — and **none of the 29 touch this route's panel** (m-9). Every other `CollapsibleSection` consumer at least sits on a route with some spec (`contour-extraction.spec.ts:60,109`, `paper-performance.spec.ts:79-126`). This one has `visual-baseline.spec.ts:34` — a whole-page screenshot of `/equation` with the panel **collapsed by default** (m-6), so even the baseline cannot see the reveal. F.W1 ships this green through every gate that exists.

**Falsifier.** (i) 7 defines `collapsible-open` anywhere reaching the `styles` cascade — I read `src/styles/index.css`'s whole manifest; (ii) F.W1's plan already carries a keyframe-rename step; (iii) the emitted post-uplift order puts `disclosure.css` above the scoped rule; (iv) `disclosure-open` is aliased. Perceived result `UNPROVEN-NEEDS-LIVE (SS-13)`; the cascade resolution is static and complete.

---

### M-1 · MAJOR — one section, two routes, two type sizes — and the gap widens at 7

**Claim.** "Coefficients / Fourier spectrum" is one section of one product rendered through two chrome systems at a **1.46×** type disparity today, **1.85×** after F.W1, and this wrapper picked the off-scale side.

**Provenance.**
- Here: `CollapsibleSection.vue:39` — `<span class="cm-serif text-sm font-semibold tracking-tight">`. `text-sm` = 0.875 rem = **14 px** at the desktop root (`style.css:47` sets `html { font-size: 1rem }` ≥768 px; 15.75 px below).
- The twin, same strings, same body: `visualization/CoefficientsPanel.vue:14` — `<ConfiguratorLayer label="Coefficients" sub="Fourier spectrum" :default-open="false">`.
- `ConfiguratorLayer`'s header is the library's named **section** rung: `dist/styles/configurator.css:22-31` (`.configurator-section-label { font-size: var(--configurator-section-size); font-weight: var(--configurator-section-weight) }`) with `dist/styles/tokens/offsets-sizing.css:499-500` — `--configurator-section-size: var(--type-subheading)  /* 20.4px — √φ section rung */`, weight 600. So **20.4 px/600 vs 14 px/600 = 1.457×**.
- **`text-sm` is not a rung of the ladder at all.** The ladder is `--type-{admin-label,micro,caption,small,body,prose,subheading,heading,title}` (`typography/scale.css:86-120`), bridged to utilities as `--text-caption`/`--text-small`/… (`theme/bridges.css:12-22`). `text-sm` is Tailwind's own default and bypasses the bridge — the heading is **off-scale**, not merely small.
- The library minted that rung to cure this exact complaint: `configurator.css:20-23` — "the `<ConfiguratorLayer>` header label reads as a SECTION (√φ subheading, 20.4px / 600), NOT a row. Replaces the flat `text-small font-semibold text-foreground` span (D6-3: 'section labels read flat + undifferentiated')." This panel still ships the pre-D6-3 flat span — and with a *smaller* size than the one D6-3 replaced (`text-sm` 14 px < `text-small`).
- **The gap widens post-uplift.** At 7, `sizing-config.css:40` — `--configurator-section-size: var(--type-heading)  /* 25.9px — φ section rung (F10 widen) */`, and `scale.css:120` — `--type-heading: 1.618rem`. So F.W1 moves the twin to 25.9 px and leaves this one at 14 px: **1.85×**. Doing nothing is not neutral; it is a widening.

**Falsifier.** A scoped override raising `.collapsible-section` type (neither the panel, `CollapsibleSection`'s style block, nor `EquationView`'s touches `font-size`); or `--configurator-section-size` overridden downward fourier-side (`style.css` defines no `--configurator-*`). Perceived hierarchy `UNPROVEN-NEEDS-LIVE (SS-13)`; the numbers are static.

---

### M-2 · MAJOR — a resurrected dead class where the primitive shipped, and a cure that expires

**Claim.** `EqCoefficientsPanel.vue:12` styles a bare `<div>` with `.cartoon-card` — a fourier-local shim re-animating a class glass-ui deliberately retired — while the sanctioned replacement is installed and documented in the very version pinned.

**Provenance.**
- The shim, with its own confession: `style.css:98-111` — "glass-ui removed the `.cartoon-card` recipe at C.W5 (cards.css:2); `cartoon-surface` survives as a decoration-only utility… this shim is the fourier-local KISS stop-gap."
- The replacement is not a coordination ask; it is installed. `dist/components/ui/card/Card.vue.d.ts:33` — `export type CardSurface = "glass" | "cartoon" | "veil"`, documented at `:17-32` as "the Memphis-sticker decoration layered on top of the resolved tier: 2px border, offset-stamp shadow, hover-lift… **the retired `<CartoonCard>` was `tier="quiet" surface="cartoon"`**". `./card` is one of the pin's export subpaths, and the emitted component carries `rounded-card text-card-foreground scrollbar-hidden` plus `cartoon-surface` (`dist/CardAction-XH4YBVEK.js`) — i.e. the primitive would have resolved M-3 by construction.
- The shim also opts the panel out of the glass ladder by fiat — `style.css:110`, `background: var(--card)`, an opaque fill. The ladder has a **named** escape for exactly that intent: `CardTier` includes `opaque` — "`--glass-level:0` escape (AX.W54) … maps to `.glass-opaque`" (`Card.vue.d.ts:9-11,15`). The panel takes the effect without the name, so no downstream knob (`--glass-level`, the W55 bright-bucket adaptive tint) can see or retune it.
- **The cure expires at F.W1 — this is the amendment to the prior pass (X-2).** At 7.0.0 the decoration is no longer a `surface` value: `_shared/axes.ts:22-23` — `SURFACES = ["glass", "veil", "opaque"]`; the cartoon register became a boolean prop, `card/Card.vue:18,36` — `cartoon?: boolean` … `cartoon: false`, applied at `:86-87` as `'card rounded-card …', cartoon && 'cartoon-surface'`. And `opaque` moved *from* `CardTier` *to* `Surface` in the same cut (pin `Card.vue.d.ts:15` vs producer `axes.ts:22,26`). So `<Card surface="cartoon">` — correct today — is an invalid literal at 7. The correct sequencing is `<Card cartoon>` **after** the uplift; landing the pin-era form now buys a rewrite inside the same tranche.

**Falsifier.** Show `<Card surface="cartoon">` at the pin fails to reproduce the needed visual (the `.d.ts` enumerates border + stamp + lift, which is the entire shim); or that the subpath cost is prohibitive (`./card` is a dedicated subpath at both versions); or a project precept forbidding glass-ui adoption in `equation/` — the standing precept in the value.js corpus is the opposite (*glass-ui is the design system; add to it, don't re-implement*).

---

### M-3 · MAJOR — a hard-cornered frame around five pills

**Claim.** The panel's 2 px frame renders at **0 px** radius. The canonical card radius is 1 rem. Its own children are rounded. One 17-line component therefore holds two contradictory radius languages.

**Provenance (the built CSS is decisive — the emitted rule is the whole rule).**
- `dist/assets/index-57FkGzlZ.css` emits exactly: `.cartoon-card{box-shadow:var(--shadow-cartoon-md);transition:…;border-width:2px;translate:0}` + `.cartoon-card{border-color:var(--border);background:var(--card)}`. **No `border-radius`.** Source agrees at both versions — pin `dist/styles/cards.css:33-48` sets border-width/box-shadow/translate/transition only; producer `card/styles.css:98-102` sets `position/border-width/box-shadow` only.
- The canon: `theme/radius.css:32` — `--radius-card: var(--radius-2xl)`; `:21` — `--radius-2xl: 1rem`. Fourier overrides no `--radius*` token (`grep -n -- '--radius' src/style.css` → nothing). The primitive applies `rounded-card` at both versions (pin `dist/CardAction-XH4YBVEK.js`; producer `Card.vue:86`).
- The contradiction is *internal to the panel's own subtree*: the amplitude track and its fill are `rounded-full` (`CoefficientsSpectrum.vue:89,91`), the tooltip swatch is `rounded-full` (`:107`), the trigger is `rounded-control` from the library's own merge (`dist/CollapsibleContent-C_s6fG7r.js`), and the portaled tooltip surface is rounded by `glass-ui/tooltip`. A hard-cornered rectangle containing five pill-shaped children is not a register; it is an unreconciled seam.

**Falsifier.** Read glass-ui's `cards.css` immediately before C.W5 and show `.cartoon-card` had no radius either — that retires the *parity* half of the shim's claim while leaving the internal contradiction fully intact; or find a `rounded-*` utility on this element (`:12`'s whole class list is `cartoon-card px-3 py-2`); or establish a deliberate sharp-frame register — which the same route then violates at `EquationView.vue:394` (`.coeff-popover { @apply … rounded-lg }`).

---

### M-4 · MAJOR — a hover lift on an inert container, drifting diagonally

**Claim.** Hovering anywhere over the panel — including its dead padding — lifts the whole card and blooms its shadow. Nothing about the card is interactive. The lift also moves it **left as well as up**, against its own shadow's light logic.

**Provenance.**
- Emitted, not merely declared (`@apply` inlines the nested state rule): `dist/assets/index-57FkGzlZ.css` — `.cartoon-card:hover:not(:disabled){translate:var(--lift-sm) var(--lift-sm);box-shadow:var(--shadow-cartoon-lg)}`. Source: `dist/styles/cards.css:44-47`.
- `--lift-sm: -1px` (`tokens/offsets-sizing.css:10`) on **both** axes → up **and left**. The cast it sits in is `--shadow-cartoon-md: -4px 3px …` → `-lg: -6px 4px …` (`tokens/shadow.css:95,98`): a stamp offset left-and-**down**. A card that travels up-left while its shadow grows down-left reads as sliding *along* its shadow rather than off the page.
- The producer already fixed the axis: `src/styles/utilities/components.css:82-84` — `.hover-lift:hover{ translate: 0 var(--lift-sm); … }`, pure vertical and **opt-in by class**.
- The affordance is false at the element level. The only interactive thing inside is the trigger row (`CollapsibleSection.vue:36`), already `flex-1`, already carrying `tap-squish focus-ring rounded-control` from the library. The card's own `px-3 py-2` band, the `12 / N` readout, and every amplitude row (`.coeff-row { cursor: default }`, `CoefficientsSpectrum.vue:165-167`) are inert — and all of them lift.
- Secondary: a 1 px displacement of the whole card fires on pointer entry to the **padding**, i.e. while the pointer is still travelling toward the one real target — a small Fitts's-law tax paid at exactly the wrong moment. `UNPROVEN-NEEDS-LIVE (SS-13)` for the felt jitter; the geometry is static.

**Falsifier.** Show `.cartoon-card` scoped off this element (it is the root class, `:12`); or a rule suppressing hover for non-interactive hosts (the only guard is `:not(:disabled)`, and a `div` is never `:disabled`); or establish the whole-card lift as intended chrome — in which case the panel is missing the interactivity that would justify it.

---

### M-5 · MAJOR — the list is not the equation *(new this pass)*

**Claim.** The panel is titled "Coefficients" and sits in the same viewport as a rendered Fourier series — but the two describe **different term sets**, and nothing on either surface says so.

**Provenance (front to back).**
- The panel receives every coefficient the backend computed: `EquationView.vue:59-67` maps `result.value.coefficients` whole into `components`; `api/routers/equations.py:126` fills `coefficients=[_term_to_dto(t) for t in result["terms"]]` — **all** terms, for `n_harmonics` ∈ [1, 100] (`FunctionInput.vue:184`).
- The equation card renders a **budget-truncated** series: `equations.py:90` — `latex, energy = simplify_series(terms, req.budget, req.notation)`; the client re-derives it on every budget change through `simplifyCoefficients(components, budget, notation)` (`EquationView.vue:135`). `budget` defaults to **10** (`FunctionInput.vue:29`, min 2 at `:217`) while `nHarmonics` defaults to **20** (`:28`).
- The panel's own readout compounds it: `CoefficientsSpectrum.vue:72-75` prints `topComponents.length / totalComponents` — a **third** cardinality (12 collapsed / 40 expanded, `:37-39`). So a default session shows an equation built from ~10 terms, a panel header reading `12 / N`, and a list of N rows, with three different numbers and one label.
- The twin route has no such problem and that is the tell: `visualization/CoefficientsPanel.vue:10` feeds `store.epicycleData.components` — the components that *are* being drawn. The equation route reused the wrapper without reconciling what its title now denotes.
- Prose consequence, and why it is MAJOR not MINOR: the panel's four-significant-figure values (`:112`) are the copyable artefact of the whole route. A user reading `Amplitude 0.0312` for `n = 17` has no way to learn from this surface that `n = 17` is **not in the formula above it**. The correct cure is one word of copy plus one visual mark (dim or rule the below-budget rows), not new machinery — `budget` is already in scope at the host.

**Falsifier.** Show the equation card renders all terms (it does not — `simplify_series(terms, req.budget, …)`, and `latex_sigma` at `:95` is the Σ *form*, still built from the same term list but displayed via `eqMode`); or show a label reconciling them (the panel's only strings are `title`, `subtitle`, `empty-text` at `:13-14`, plus `12 / N` at `CoefficientsSpectrum.vue:74`); or show `budget ≥ totalComponents` always holds — `:217` caps budget at `vizHarmonics`, which is `min(effectiveN, nHarmonics)`, so it is *structurally* ≤ the term count.

---

### M-6 · MAJOR — a 300 px scroller inside a scroller, unguarded on three axes

**Claim.** The payload is a fixed-height inner scroll region nested inside the left column's own scroll region, with no scroll containment, no stable gutter and no edge treatment — and the numeral column sits exactly where the scrollbar lands.

**Provenance.**
- Inner scroller `[inherited]`: `CoefficientsSpectrum.vue:78` — `max-h-[300px] overflow-y-auto`.
- Outer scroller: `EquationView.vue:373-375` — `.eq-panel-left { @apply … overflow-y-auto min-h-0 flex-1 }`; at ≥1024 px the grid is `overflow: hidden` (`:346`), so the column genuinely owns the scroll. **The wrapper is the element that puts them in one box** — that composition is this file's.
- **No `overscroll-behavior` anywhere in the graph** (repo-wide grep → nothing). A wheel gesture over the list scrolls the list, then chains to the column the instant it bottoms — the classic disorienting hand-off, on a surface whose entire purpose is scanning.
- **No `scrollbar-gutter: stable`, no reserved inset.** Card padding is `px-3` = 12 px (`:12`); the row's last cell is `w-16 text-right … tabular-nums` (`CoefficientsSpectrum.vue:99-102`) — a right-aligned numeral ending flush at the scroller's inner edge. A classic scrollbar reflows every row on the frame the list crosses 300 px; an overlay scrollbar paints over the last digits while scrolling. Either way the most precise content sits nearest the moving part.
- **No edge treatment**, though `./fading-scroll` is exported at *both* versions.
- The column then paints a **second** fade over the top of it: `EquationView.vue:364-370`, a `::after` gradient `height: 2.5rem` to `var(--background)`, `z-index: 2`. A panel opened near the column's foot has its final ~40 px of coefficient rows washed toward the page colour — a *column*-level cue reading as a *panel*-level one, saying "more below" about the wrong scroller.

**Falsifier.** An `overscroll-behavior` rule I missed (grep was repo-wide); a platform default that contains chaining (there is none — chaining is the CSS default); or measurement showing the numeral column clears the gutter at every supported width. Scrollbar appearance is `UNPROVEN-NEEDS-LIVE (SS-13)`; the absence of every mitigation is static.

---

### M-7 · MAJOR — three typefaces in one 48 px card, and none of them is Computer Modern

**Claim.** The title is set in the browser's generic serif, the prose in system UI sans, the numerals in Fira Code — in an application that preloads three Computer Modern faces and presents itself as a paper-math surface. `[inherited]` for the `cm-serif` link (`CollapsibleSection/challenge-D-design.md` M-5); the **collision** is this wrapper's composition.

**Chain, fully resolved at the pin.**
1. Title: `CollapsibleSection.vue:39` applies `.cm-serif` → `dist/styles/typography/utilities.css:65-67`, `font-family: var(--font-serif-math, serif)`.
2. `--font-serif-math` is **defined nowhere**: `grep -rn font-serif-math node_modules/@mkbabb/glass-ui/dist/ src/ public/` returns exactly one line — the fallback consumer itself. So `.cm-serif` computes to generic `serif`.
3. **Not cured by the uplift**: producer `src/styles/typography/utilities.css:78` is the identical fallback, and the producer-wide grep returns the same single site. This is an unfilled *producer* seam and therefore also a glass-ui BH-inbox row under the standing relay law.
4. Prose: `style.css:20` puts `font-serif` on `html, body`; glass-ui bridges `--font-serif: var(--font-stack-text)` (`theme/bridges.css:68`, with `:61` stating outright that it "is a bridge alias … the library carries no display-serif voice"), and `tokens/scheme-motion.css:43` gives `--font-stack-text: "Plus Jakarta Sans", …, system-ui, sans-serif`. The app's body face is a **sans**.
5. And that sans is not even loaded: fourier imports `@mkbabb/glass-ui/styles` only (`style.css:3`), never the `styles/fonts` subpath that carries the faces — so the stack falls to `system-ui`.
6. Fourier's own remap is unreachable from here: `style.css:13-15` remaps `--font-sans` onto Computer Modern, but nothing in this panel's graph uses `font-sans`. Meanwhile `index.html` preloads `cmunrm/cmunbx/cmunti.woff` at font priority for a face this panel never reaches.
7. Numerals land correctly: `.fira-code` → `var(--font-mono)` (`typography/utilities.css:69-72`).

**Why it lands on *this* component.** This is where the mismatch is visible at closest range: a generic-serif title, a system-sans subtitle 6 px to its right (`CollapsibleSection.vue:40`, `ml-1.5`), and a monospace data table 4 px below — **three registers inside one 48 px closed card** (m-2). No other surface in the route stacks all three that tightly.

**Falsifier.** Define `--font-serif-math` anywhere in the cascade (I grepped both library versions and the whole app); or find a fourier-side override of `--font-serif`/`--font-stack-text` (the five hits in `src/` are all *reads*, no definitions). Note the stale `dist/` **contradicts** this and would falsify it if current — it emits `.cm-serif{font-family:var(--font-serif)}` with `--font-serif:var(--font-stack-serif)`, an older and coherent library. That is m-10, and it is why the deployed preview cannot settle this either way.

---

### M-8 · MAJOR — post-uplift the panel is unreachable until its host compiles

**Claim.** Nothing in this component breaks at the import level under F.W1. **Its host does** — so the panel cannot be seen at all until the host is cured, which matters because the panel's *own* uplift regression (B-2) is invisible by nature and will be masked by the noisier host break.

**Provenance.** `EquationView.vue:9-10` imports `HoverCard, HoverCardTrigger, HoverCardContent` from `@mkbabb/glass-ui/hover-card` and `MetricBadge` from `@mkbabb/glass-ui/metric-badge`. Both subpaths are on the census's enumerated removal list (`CENSUS:102-103`, restated as F.W1 work at `:184-186`). I enumerated the producer's 73 export subpaths: `./metric` exists; **`./metric-badge` and `./hover-card` do not**. Confirmed.

**Consequence for remediation order.** The obvious cure for m-1 — put the coefficient count in the collapsed header — is a one-line `MetricBadge` adoption *today*, and F.W1 would undo it inside the same tranche. Target `./metric` post-uplift, or plain type. Recorded here so the cure is not written twice.

**Falsifier.** Show `metric-badge`/`hover-card` still exported at 7 (they are not); or show `EquationView` is not among the census's seven `metric-badge` files — that changes the census count, not this panel's reachability.

---

### m-1 · MINOR — the `#actions` slot is empty, so cardinality sits behind the fold it should inform

`CollapsibleSection.vue:43` exposes `<slot name="actions" />`; this consumer passes nothing (`:13-15`). The collapsed header therefore reads "Coefficients — Fourier spectrum" and nothing else, while the **first line inside** is a right-aligned `12 / N` (`CoefficientsSpectrum.vue:72-75`). To learn whether opening is worth it you must open it. The number is already computed and already rendered — it is merely on the wrong side of the fold, and it is precisely the number that makes M-5 legible. **Falsifier:** show the count surfaces elsewhere in the collapsed column — `FunctionInput` surfaces `effectiveN`/`energyCaptured` (`EquationView.vue:205-206`), which is the harmonic budget, a *different* number (and see M-5: the confusion between them is the defect). **Cure target:** `./metric`, post-uplift (M-8).

### m-2 · MINOR — asymmetric vertical rhythm; the closed panel is 58 % chrome

Derived at the desktop root (16 px, `style.css:47`), Tailwind `--spacing: 0.25rem`:

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

Above the label 14 px; below the last row 12 px — a 2 px optical lean on a card whose entire visible chrome is 28 px. Closed height 8 + 32 + 8 = **48 px** around a 20 px label: **58 % padding**. Neither figure is a token decision; they are three authors' defaults stacked (m-8). **Falsifier:** measure the rendered box (`UNPROVEN-NEEDS-LIVE (SS-13)` for the optical effect); recompute if `line-height` differs from Tailwind's `text-sm` pairing. Below 768 px every row scales ×1.125 (`style.css:41`) — every row **except** the one in m-11.

### m-3 · MINOR — no rule between header and body

Open, the label and the coefficient table are separated by 10 px of whitespace and nothing else. Both library registers ship a hairline for exactly this — `dist/styles/configurator.css:60-62` binds `.configurator-layer` to `--configurator-divider-section`, minted (per `:44-58`) so that sections stop running together; 7 carries the idea into the disclosure register. The panel gets neither, because it is neither. **Falsifier:** establish a deliberate no-divider register for this route — plausible, since `EquationView` is divider-free throughout; in that case demote to INFO and read the row as "the panel inherits an undifferentiated hierarchy the library already solved."

### m-4 · MINOR — the trigger is under the house touch floor, and 7 does not cure it

Trigger height = 6 + 20 + 6 = **32 px** desktop (~36 px below 768 px, m-2 scale). WCAG 2.5.8 AA (24 px) passes; 2.5.5 AAA (44 px) fails; glass-ui's own floor is `--touch-target: 2.75rem` = 44 px, applied by `dist/styles/utilities/a11y-overrides.css:115-122` to exactly three selectors — `[data-size="icon"]`, `.expandable-container__trigger`, `.segmented-tabs__trigger`. `[data-slot="collapsible-trigger"]` is not among them. **And the uplift does not fix it** *(new this pass)*: at 7 the trigger receives `.disclosure-trigger` (`CollapsibleTrigger.vue:38`), whose recipe is radius + `touch-action` + focus ring only (`disclosure.css:40-52`); the `min-block-size: 2.75rem` lives on `.disclosure-group-trigger` (`:55-61`), the *group/accordion* register this consumer does not use. **Falsifier:** measure `clientHeight` on a coarse pointer (`UNPROVEN-NEEDS-LIVE (SS-13)`); or find a fourier-side coarse-pointer rule for this route (none).

### m-5 · MINOR — the subtitle over-promises, and the graph is misfiled

`subtitle="Fourier spectrum"` (`:13`) sets an expectation the panel then declines: the shared body's `#graph` slot — the actual spectrum plot — is filled by the *sibling* consumer (`visualization/CoefficientsPanel.vue:16-22`, `<FrequencyGraph :max-bars="40">`) and left empty here, a divergence the shared component documents as deliberate (`CoefficientsSpectrum.vue:5-10,68-69`). So the equation route's "spectrum" is a bar list. Compounding it: `FrequencyGraph.vue` **lives in `components/equation/`** and is imported only from `components/visualization/` (verified: the sole import is `CoefficientsPanel.vue:5`) — the graph is filed under the route that does not use it. Prose note: "Coefficients — Fourier spectrum" is a restatement, not a gloss; the em-dash slot (`CollapsibleSection.vue:40`) does no work — and M-5 shows exactly what work it *could* do. **Falsifier:** a product decision that the equation route deliberately omits the plot (plausible — the route already has `ConvergencePlot`); that retires the promise half and leaves the misfiling and the empty gloss.

### m-6 · MINOR — collapsed by default, `v-if`-gated, and unpersisted

`:default-open="false"` (`:13`) + `v-if="components.length"` (`EquationView.vue:213`) means: user computes → a 48 px collapsed strip slides in → the user must click again to see what they just asked for `[inherited: CollapsibleSection M-7]`. And the open state is per-mount only — `const open = ref(props.defaultOpen)` (`CollapsibleSection.vue:14`), no controlled binding, no persistence — while the route persists everything else it cares about (`saveCachedInputState`/`saveCachedResult`, `EquationView.vue:160-176`). Leave and return: collapsed again. glass-ui ships the state-memory shape (`useConfiguratorState`, present at both versions), unused here. **Falsifier:** show `default-open: false` is deliberate progressive disclosure (the sibling wrapper makes the same choice, so it likely is) — which narrows the finding to the missing persistence, anomalous precisely because this route caches everything else.

### m-7 · MINOR — the mount transition declares no reduced-motion intent

`<Transition name="slide-down">` wraps the panel (`EquationView.vue:212`); its classes translate 8 px in / 4 px out (`:449-452`) with **no** `prefers-reduced-motion` bracket — unlike the visualization route's equivalent (`VisualizationView.vue:306-310`), unlike the tab-panel entry (`style.css:92-96`), and unlike `CollapsibleSection`'s own reveal (`:66-71`). It is mitigated **by accident**: `a11y-overrides.css:12-16` rewrites `transition-property` to an `opacity, color, background-color, border-color, box-shadow !important` allowlist, dropping `translate`/`transform`, so the spatial leg snaps and the fade survives — the correct nuanced PRM reading. Held at MINOR *because* the mitigation is real today; it is one substrate change from being a real defect, and the consumer neither declares nor tests the intent. **Falsifier:** show 7 narrows that blanket rule (then this joins B-2's family and becomes MAJOR) — I checked: `glass-ui/src/styles/utilities/a11y-overrides.css` keeps the same allowlist shape; or find a local bracket in `EquationView.vue` (grep → none).

### m-8 · MINOR — a four-author padding ledger with no owner

`px-3 py-2` (this file, `:12`) over `py-1.5` (`CollapsibleSection.vue:36`) over `pb-1` (`:46`) over `pt-1` (`CoefficientsSpectrum.vue:67`) — four padding decisions in four files for one card, none aware of the others, producing m-2's asymmetry. The horizontal register *is* coherent (S-5), which makes the vertical incoherence sharper: one axis was standardised and the other was not. **Falsifier:** show a documented split of responsibility (card owns outer / section owns trigger / body owns content) — a defensible contract, under which the 14/12 lean becomes a bug *within* the contract rather than the absence of one.

### m-9 · MINOR — zero automated coverage of this route's panel

`web/e2e/` holds `contour-extraction`, `gallery`, `paper-performance`, `settings-persistence`, `visual-baseline`, `visualization-crud`, `visualization-ux`, `workspace-flow`. No `equation-*.spec.ts` exists; the only equation-route touch is `visual-baseline.spec.ts:34` (`{ slug: "equation", path: "/equation" }`) — a whole-page screenshot with this panel **collapsed** (m-6), so it cannot see the reveal, the empty branch, the stale-during-recompute path, or the disclosure at all. This is why B-2 can ship green. **Falsifier:** point to a spec that opens this panel.

### m-10 · MINOR — the shipped build disagrees with the installed pin

`dist/assets/index-57FkGzlZ.css` emits `.cartoon-card{… transition: translate var(--duration-normal) var(--ease-apple-spring), box-shadow … var(--ease-apple) …}` and `.cm-serif{font-family:var(--font-serif)}`; the installed 4.0.0 uses `--spring-smooth`/`--ease-standard` (`cards.css:40-42`) and `var(--font-serif-math, serif)` (`typography/utilities.css:66`). So `dist/` was built against an older library. Design consequence: any visual sign-off taken from the deployed preview is evidence about a tree that no longer exists — including, specifically, about M-7, where the stale build is *coherent* and the current tree is not. I used `dist/` only where it proves a **mechanism** (that `@apply` inlines a utility's nested `:hover`, M-4; that scoped rules emit at the computed specificity, B-2), never for token identity. **Falsifier:** rebuild and diff; if the fresh build matches `node_modules`, this row closes and M-4/B-2's mechanism claims stand on the fresh artefact instead.

### m-11 · MINOR — the one fixed-px dimension is out of scale where the type grows

Everything in the panel's box model is rem-derived and tracks `style.css:40-50`'s responsive root (1.125 rem below 768 px, 1 rem above) — except `max-h-[300px]` (`CoefficientsSpectrum.vue:78`), a raw pixel cap. On the narrow viewport type and padding grow 12.5 % while the cap does not, so the visible row count drops by ~⅛ on exactly the device with the least room, and M-6's inner scroller gets proportionally busier there. **Falsifier:** show the 300 px was chosen against a device constraint rather than a type scale; or show Tailwind resolving bracket values against `--spacing` (it does not — arbitrary values are literal).

### m-12 · MINOR — the shim miscounts itself, and the corpus miscounts it differently *(new this pass)*

`style.css:101-102` states: "Fourier consumes `.cartoon-card` at 14 application sites (13 files; one uses it 5 times)." **Live count: 21 sites over 14 `.vue` files** — `EquationView` 5, `FunctionInput` 2, `AdminUserList` 2, `VisualizationView` 2, and ten files at 1 each (this panel among them). The "one uses it 5 times" clause still matches `EquationView`, so the comment was true when written and has drifted by **7 sites** since. Separately, `lane-frontend.md:384` records "**25 application sites**" — that is the raw string count, which includes `style.css`'s own four self-references (`:98,:99,:101,:107`); 21 + 4 = 25. Two documents, two wrong numbers, in opposite directions, about the size of the single largest cross-repo carry in this app. It matters at the F.W1 scale estimate: the shim's cure is a 21-site migration, not 14 and not 25. **Falsifier:** re-run `grep -rn cartoon-card web/src --include=*.vue | wc -l` (→ 21) and `grep -rl … | wc -l` (→ 14); or show `.cartoon-card` reaching sites through a non-literal path (there is none — it is a Tailwind `@utility`, applied by literal class name only).

### i-1 · INFO — the frame is the only edge cue, at 1.90 : 1 light / 2.08 : 1 dark

Computed here from token literals (not carried): `--border` → `--neutral-4` = `hsl(32 26% 70%)`, Y = **0.4711**; `--card` = `hsl(36 48% 97%)`, Y = **0.9421** → **1.90 : 1**. Dark arm: `--neutral-4` = `hsl(30 16% 34%)`, Y = 0.0999 on `--card` = `hsl(24 8% 16%)`, Y = 0.0220 → **2.08 : 1**. The panel has no radius (M-3) and no divider (m-3), so this 2 px line is the whole boundary between a data table and the page. WCAG 1.4.11 targets boundaries needed to identify a *control*, which a decorative card is not — hence INFO, not a failure — but with M-3 and the offset stamp as the only other depth cue, containment reads thin, and the *dark* arm (where the stamp shadow all but vanishes on `hsl(24 8% 16%)`) is the weaker of the two despite the higher ratio. **Falsifier:** recompute against `--background` if the intended figure/ground pair is card-vs-page (light `--background` = `hsl(40 30% 98%)` → 1.97 : 1; the verdict does not move).

### i-2 · INFO — no role, no label, no heading — and 7 hands over the region binding free

The root `<div>` (`:12`) carries no `role`, no `aria-label`; the title is a `<span>` inside the trigger (`CollapsibleSection.vue:39`), so there is no heading at any level for "Coefficients" and no landmark `[inherited: CollapsibleSection B-2]`. At the pin the content region carries no `role="region"` either — `dist/CollapsibleContent-C_s6fG7r.js` forwards only a class string to reka's primitive. **7.0.0 adds both**: `src/components/collapsible/CollapsibleContent.vue:47-48` sets `role="region"` and `:aria-labelledby="ids.trigger"` off a shared disclosure id context. So F.W1 hands this panel a labelled region for free; what it does **not** hand over is a heading — that stays the consumer's. **Falsifier:** show reka-ui 2.9.10's `CollapsibleContent` already emitting `role="region"` (then the pin is fine and only the heading gap stands).

### i-3 · INFO — an admin-register type token in a public tooltip, and 7 deletes it

`CoefficientsSpectrum.vue:110` sets the tooltip detail grid to `text-admin-label`, bridged from `--type-admin-label` = `0.625rem` (10 px, `typography/scale.css:86`; `theme/bridges.css:15`) — a deliberately sub-control micro rung, used on a public equation-route readout. `[inherited]` — the choice-point is this wrapper's decision to render the shared body unmodified, which is otherwise its virtue (S-1). **And the token is deleted at 7** (`grep -rn admin-label glass-ui/src/styles/` → nothing), confirming `CoefficientsSpectrum/challenge-D-design.md` M-8: post-uplift the utility resolves to nothing and those four rows inherit the ambient size. Both the defect and its accidental cure land inside this panel. **Falsifier:** show `--type-admin-label` is a general micro rung despite its name (the bridge order places it *below* `--type-micro`, which argues the opposite); or find it re-minted elsewhere at 7.

### i-4 · INFO — the uplift silently improves two things and removes a third; none is recorded

An unrecorded improvement is an unverified one, and F.W1's diff review will not be looking for any of these:
1. **The false hover-lift disappears** — producer `card/styles.css:98-102` reduces `cartoon-surface` to `position/border-width/box-shadow`; no translate, no transition, no `:hover`. The lift becomes opt-in via `.hover-lift` (`utilities/components.css:73-93`). M-4 self-cures **for this inert container** — and silently *loses* the affordance on genuinely interactive cartoon cards elsewhere in fourier (m-12 says there are 21 sites to check, not 14).
2. **The content region gains `role="region"` + `aria-labelledby`** (i-2).
3. **The trigger loses its press feedback** *(new this pass)*. At the pin, `CollapsibleTrigger` merges `tap-squish focus-ring rounded-control transition-control` (`dist/CollapsibleContent-C_s6fG7r.js`). At 7 it merges `cn('disclosure-trigger', …)` (`CollapsibleTrigger.vue:38`), whose recipe (`disclosure.css:40-52`) supplies radius, `touch-action: manipulation` and a `box-shadow` focus ring — **no `tap-squish`**, though the utility still exists at 7 and is still used by `Button`, `Switch`, `Checkbox`, `ToggleGroupItem`, `PagerDots`. So the focus ring survives by a different mechanism (S-3 holds), the touch behaviour improves, and the press-squish is dropped from the panel's only control. Another CSS-arm row for the census addendum.
Also neutral-but-notable: 7's `.disclosure-content` sets `color: var(--muted-foreground-strong)` and `font-size: var(--type-small)` on the whole region (`disclosure.css:90-97`), and its body register is `padding: 0 0.25rem 1rem` (`:115-117`) against this consumer's `pb-1` = 4 px — so post-uplift this panel's inner padding will be 4 px where every library-native disclosure is 16 px, widening m-8's incoherence. **Falsifier for the row:** show `cartoon-surface` at 7 retains the lift (it does not — I read the whole utility), or fourier's shim re-adding it (`style.css:107-111` adds only `border-color` + `background`).

### i-5 · INFO — four adjudicated uplift breaks render *inside* a panel that imports none of them

Roll-up, so F.W1's per-file diff does not miss them: this component's rendered output at 7 is broken or degraded by (a) `variant="ghost"` on the Show-more button — deleted at 7, `ButtonProps` is `emphasis|tone|size|iconOnly|loading` (`Button.vue:18-40`), nearest equivalent `emphasis="quiet"` [`CoefficientsSpectrum` M-4]; (b) `text-admin-label` — deleted (i-3) [`CoefficientsSpectrum` M-8]; (c) `lucide-vue-next → @lucide/vue` at `CollapsibleSection.vue:3` and `CoefficientsSpectrum.vue:20`, two of the census's 35 sites (`CENSUS:105`); (d) the keyframe death (B-2). **Zero of these appear in the subject file, and two of the four appear on no census list.** The design consequence is a review-process one: a per-file uplift review of `EqCoefficientsPanel.vue` sees `cartoon-card px-3 py-2` and three tags, and concludes correctly that nothing here changes — while four things change. **Falsifier:** show any of (a)–(d) surviving 7 unchanged — each is cited to its producer line above.

---

## §4 · Superlatives (L-18 runs both ways)

**S-1 · The two-consumer extraction is exemplary, and this file is its proof.** The equation and visualization routes shared ~95 % of a coefficient readout; the shared body now lives once (`CoefficientsSpectrum.vue`), the single structural divergence is isolated in one named slot (`#graph`, `:68-70`), and the two wrappers are 17 and 25 lines. The header comment states the extraction's terms honestly, including what diverged and why (`:1-14`). Right shape, right reason, documented at the seam. **Falsifier:** find a second divergence forced through the shared component — a route-conditional prop, a `v-if` on route identity. I read it whole; there is none. (Intake **R3-7a** independently corroborates: the body is genuinely shared, 2 callsites, not a fork.)

**S-2 · The muted register clears AA in both arms from tokens alone.** Subtitle and every secondary string use `text-muted-foreground` on `var(--card)` with no local override. Recomputed here: light `--neutral-5` `hsl(30 22% 40%)` Y = 0.1440 on card Y = 0.9421 → **5.11 : 1**; dark `hsl(34 14% 62%)` Y = 0.3587 on Y = 0.0220 → **5.68 : 1**. Both clear 4.5 : 1 at the 12 px the subtitle actually renders. The panel earns this by *not* reaching for a colour. **Falsifier:** recompute; or find a fourier override of `--muted-foreground`/`--card` (`style.css` overrides only `--viz-amber`/`--section-color-5`, `:119-127`).

**S-3 · The trigger inherits a conformant focus ring unconditionally — and keeps it across the uplift.** At the pin, `CollapsibleTrigger` merges `tap-squish focus-ring rounded-control transition-control disabled:pointer-events-none disabled:opacity-disabled` through `cn()` (`dist/CollapsibleContent-C_s6fG7r.js`), so the consumer's six utilities (`CollapsibleSection.vue:36`) cannot displace the ring; at 7 the ring re-arrives as `.disclosure-trigger:focus-visible { box-shadow: var(--focus-ring-shadow) }` (`disclosure.css:45-48`). Keyboard-visible, house-standard, free — in a codebase where four other focus rings had to be hand-restored at the global layer (`style.css:133-141`). **Falsifier:** show `cn()` last-wins dropping `focus-ring` for a conflicting consumer utility (the consumer passes none in that family); or a global `outline: none` reset defeating it (there is none outside the forced-colors/focus blocks).

**S-4 · The reveal's reduced-motion guard is belt-and-braces, and declared.** `CollapsibleSection.vue:66-71` zeroes the animation under PRM even though the library's blanket rule already caps `animation-duration` at 0.01 ms (`a11y-overrides.css:6-10`). Redundant, defensive, and — unlike the mount transition (m-7) — **declared**, so the intent survives a substrate change. The right instinct in the wrong place: applied to the keyframe *names*, it would have prevented B-2. **Falsifier:** show the guard losing to the library's `!important` (it need not win — both reach the same result), or `animation: none` breaking reka's Presence unmount (Presence falls through on zero duration; the library's own blanket rule proves the pattern is expected).

**S-5 · The horizontal register is exactly in tune with its column.** `px-3 py-2` is the equation route's house card padding: six of the route's nine `cartoon-card` sites use precisely it (`InfoCard.vue:18`, `FunctionInput.vue:93,175`, `EquationView.vue:239,243,308`, and this file `:12`); the outliers are the centred error card (`p-4`, `:230`) and the fixed-height equation card (`:251`). The panel does not invent a padding — it joins one. **Falsifier:** show `px-3 py-2` is itself off-scale (it is `--spacing`-derived), or that six identical pairings across three files are coincidence rather than register.

**S-6 · The wrapper adds no CSS at all, and that is a real virtue here.** The file has **no `<style>` block** — no scoped rule, no `@apply`, no cascade contribution, no new specificity. In a repo where a consumer-authored scoped rule is about to silently destroy its own library's replacement animation (B-2), where four focus rings had to be re-added globally to defeat scoped-hash isolation (`style.css:133-141`), and where the sibling `ContourSettings.vue:357` repeats B-2's exact mistake, a wrapper that contributes zero declarations is the *only* one of this route's nine card sites that cannot be a cascade defendant. Every defect above is compositional or inherited precisely because of this. **Falsifier:** find a style block or a `:deep()` in the subject (there is none — the file is 17 lines and I quote it whole in §1).

---

## §5 · Corrections — to the prior pass on this subject, and to the corpus

| id | target | correction |
|---|---|---|
| **X-1** | prior pass, `m-4` | Cited `a11y-overrides.css:31-37` for the coarse-pointer touch floor. The block is at **`:115-122`**. Claim survives; provenance corrected. Extended: the floor is *also* not supplied at 7 (m-4). |
| **X-2** | prior pass, `M-2` | Presented `<Card surface="cartoon">` as **the** cure. It is the cure **only at the pin**: at 7.0.0 `SURFACES = ["glass","veil","opaque"]` (`axes.ts:22`) and the decoration is a boolean `cartoon` prop (`card/Card.vue:18,36,86-87`), so the pin-era literal is an invalid value post-uplift; `opaque` also migrated `CardTier → Surface`. The cure is version-scoped and must be **sequenced after F.W1**. Also: `CardSurface` is declared at `Card.vue.d.ts:33` (docblock `:17-32`, prop `:59`), not `:16-31`. |
| **X-3** | prior pass, `M-1` | Reported the two-route heading disparity as a static 1.46×. At 7 the twin's rung widens to `--type-heading` 25.9 px (`sizing-config.css:40`, `scale.css:120`), making it **1.85×**. Inaction is a widening, not a hold. |
| **X-4** | prior pass, `M-2`/`m-?` | Repeated the shim's self-reported "14 application sites (13 files)" without testing it. Live: **21 sites / 14 files** (m-12). |
| **X-5** | `lane-frontend.md:384` | "**25 application sites**" is a string count including `style.css`'s own 4 self-references. True application figure: **21**. F.W1's shim-retirement estimate should use 21 (m-12). |

*(A sixth, non-blocking drift: the prior pass cited `configurator.css:25-31` for `.configurator-section-label`; the rule opens at `:22` with the size at `:23` and the weight at `:25`. Substance unaffected.)*

---

## §6 · Falsified candidates (recorded so they are not re-litigated)

1. **"`CollapsibleSection`'s scoped CSS is code-split into `NotationPills`, so the equation route can render an unstyled collapsible."** The built CSS does place `[data-v-16a925e2]` in `dist/assets/NotationPills-CjQ8uEBB.css` — but `EquationView.vue:14` statically imports `FunctionInput`, which imports `CollapsibleSection`, so it is in the route's eager graph and the chunk is fetched with it. **FALSE.** Chunk naming is cosmetic here.
2. **"`collapsible-open`/`collapsible-close` are already dead at the pin, so the reveal never worked."** Defined at `dist/styles/animations.css:18,29`, imported into the single `styles` entry, and present in the built `index-*.css` (1 occurrence). **FALSE** — which is exactly what makes B-2 a *regression*.
3. **"`var(--ease-out)` in the reveal is undefined, so the animation is already invalid at computed-value time."** *(tested this pass)* `--ease-out` is bridged at both versions — pin `theme/bridges.css:326` + `tokens/scheme-motion.css:217`; producer `theme/bridges.css:357` + `tokens/scheme-spring.css:204`. **FALSE.** The timing function survives; only the *name* dies (B-2).
4. **"The hover lift survives `prefers-reduced-motion`, so it is also a motion-a11y defect."** `a11y-overrides.css:12-16` rewrites `transition-property` to an opacity/colour/shadow allowlist with `!important`, dropping `translate`. The hover **state** still applies, instantly — the correct nuanced PRM reading. **FALSE**; M-4 stands on false affordance and axis drift alone.
5. **"`@apply cartoon-surface` hard-fails the Tailwind build post-uplift."** `cartoon-surface` survives at `glass-ui/src/components/card/styles.css:98` and stays in the `styles` cascade, so the `@utility` remains registered for consumer `@apply`. **FALSE** — the shim compiles; it quietly loses the lift (i-4).
6. **"`cartoon-surface`'s `translate: 0` mints a containing block that mispositions the portaled tooltips."** The pin's own comment flags the concern (`cards.css:36-39`), but reka teleports `TooltipContent` to `body`, outside the card's subtree — traced through `ui/tooltip/Tooltip.vue:26-35` → `@mkbabb/glass-ui/tooltip` → reka `TooltipPortal`. **FALSE.**
7. **"7.0.0's `.disclosure-trigger` brings the 44 px touch floor for free."** *(tested this pass)* The `min-block-size: 2.75rem` is on `.disclosure-group-trigger` (`disclosure.css:55-61`), the group/accordion register; the plain trigger recipe (`:40-52`) has no floor. **FALSE** — m-4 does not self-cure.
8. **"The empty Tooltip trigger below 13 coefficients throws or dev-warns."** reka's `Slot` returns the comment children when `firstNonCommentChildrenIndex === -1` (`dist/Primitive/Slot.js`), so it degrades silently. **FALSE** as a crash; it remains a real orphan-primitive finding, owned by `CoefficientsSpectrum/challenge-D-design.md` **m-1**.

---

## §7 · Routing

| finding | wave | note |
|---|---|---|
| **B-2**, i-5(d) | **F.W1 (gate)** | must land *with* the bump. The census break surface has no CSS/prop arm; add one or the panel's motion dies green through every gate that exists (m-9). Third independent request for this addendum. |
| **M-8**, i-5(a)(b)(c) | **F.W1** | host cure (`hover-card`, `metric-badge`) + the four in-panel breaks that the subject file does not import. |
| **M-2**, **M-3**, m-12 | **F.W1 → F.W3** | `<Card cartoon>` **after** the uplift (X-2); the shim retirement is a **21-site** migration (m-12), not 14 and not 25. M-3 falls out of it for free. |
| **M-1**, m-3 | **F.W3** | join the library's *section* register (the twin already has); at 7 the rung is 25.9 px, so the cure is also the reconciliation (X-3). |
| **B-1**, **M-5**, m-1, m-6 | **F.W4** | the state + honesty cluster: drop the parent `v-if`, adopt `./metric`'s `loading`/`aria-busy`, label the budget/list divergence, put the count in `#actions`, persist `open`. B-1 and M-5 share one owner — what the panel is *claiming*. |
| **M-4**, m-2, m-8, m-4, i-1, i-2 | **F.W4** | affordance + proportion + a11y; M-4 partly self-cures at F.W1 (i-4), which is a reason to *record* it, not to skip it. Vertical rhythm needs **one** owner across the four files. |
| **M-6**, m-11 | **F.W4** | `overscroll-behavior: contain` + `scrollbar-gutter: stable` + `./fading-scroll`, and re-derive the 300 px cap from the type scale. |
| **M-7** | **F.W4 + glass BH relay** | `--font-serif-math` is an unfilled *producer* seam (unchanged at 7) — a glass-ui inbox row as well as a fourier one, per the standing BH/BI relay law. |
| m-7, m-9, m-10 | **F.W4 / F.W0** | declare the PRM intent; open an equation-route spec (m-9 is what makes B-2 shippable); rebuild `dist/` before any visual sign-off. |

---

## §8 · Verdict

**DEFECTIVE**, and instructively so: nothing is wrong with the seventeen lines *as written*. What is wrong is everything they delegate, and one thing they claim.

It selects a retired CSS class over the primitive that replaced it (M-2), and inherits from that a square frame among round children (M-3) and a hover lift on an inert box (M-4). It selects a local disclosure over the library's section register and inherits a heading 1.46× smaller than the same heading one route away — 1.85× after F.W1 (M-1) — a title in a font nobody chose (M-7), a reveal that stops existing the moment the pin moves (B-2), and a trigger under the house touch floor that the uplift does not raise (m-4). It declares an empty state its parent's gate makes unreachable, and covers none of the three states the axis names (B-1). And it tells the user these are "the coefficients" beside a formula built from a different subset of them (M-5) — the one defect that is neither inherited nor compositional but authored, in a `title` string, in this file.

Two things it does genuinely well and that must survive remediation: the shared-body extraction (S-1) and its total abstinence from local CSS and local colour (S-6, S-2, S-5).

**For F.W1, the item that must not be lost:** B-2 is a CSS-identifier break and i-5 is a prop-value break; the census's break surface is import-level only. Add the CSS/prop arm before the uplift lands, or this panel — the least-tested surface in the app — ships its regressions green.
