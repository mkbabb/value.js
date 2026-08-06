claude-opus-5[1m] (served model id)

# CHALLENGE — `InfoCard.vue` · axis D (DESIGN)

**Target.** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/equation/InfoCard.vue` — 43 lines.
**Substrate.** fourier-analysis HEAD `cd26c65`, branch `m/w1-bump-migration`; the file is one of the
24 in-scope dirty paths (`git status --porcelain` → ` M web/src/components/equation/InfoCard.vue`).
Per adjudicated intake **R4-9** (`lane-fourier-r3-r6.md:107`, ADOPT-AS-FACT) this is byte-identical
to the tree F.W0 opens on — nothing below is stale-at-HEAD.
**Pin.** `@mkbabb/glass-ui ^4.0.0` (installed 4.0.0) against producer 7.0.0 at
`/Users/mkbabb/Programming/glass-ui`. **Method.** Static + source-derived only; no browser. Every
rendered-geometry claim is computed from the shipped CSS + token values and carries its falsifier.
**Writes.** This file only. Both product trees read-only.

**Prior on the target: DEFECTIVE.** It survives on two counts (§2) and fails on twenty-one (§1),
including two BLOCKERs — one of which makes every other finding in this file *latent by
construction*.

**Read-set (whole, read-only).** `InfoCard.vue` · `lib/equation/notation.ts` · `lib/equation/types.ts`
· `web/src/style.css` · `web/src/main.ts` · `web/vite.config.ts` · `web/package.json` ·
`glass-ui@4.0.0` `dist/metric-badge.js` + `dist/MetricBadge-BpC0R_Ec.js` +
`dist/components/custom/metric-badge/MetricBadge.vue.d.ts` + `dist/coalesceMetric-5qIeZnTx.js` +
`dist/styles/{utilities/components.css, utilities/a11y-overrides.css, cards.css,
typography/utilities.css, typography/scale.css, tokens/color-radius.css, tokens/offsets-sizing.css,
tokens/scheme-motion.css, theme/radius.css}` · `lucide-vue-next@1.0.0 dist/esm/Icon.js` +
`shared/src/utils/hasA11yProp.js` + `defaultAttributes.js` · producer `glass-ui@7.0.0`
`package.json` + `CHANGELOG.md` + `src/components/metric/{index.ts,types.ts,Metric.vue,styles.css}` ·
`fourier web/src/components/equation/EquationView.vue`.

---

## §0 — THE HEADLINE: this component is not mounted, and never has been

`InfoCard.vue` is one of exactly **2 orphan SFCs out of 66** in `web/src`. It has **zero callsites**,
and — per `git log -S` — it has had zero callsites **since the commit that created it**.

```
$ grep -rni "InfoCard\|info-card" web/src/          → 0 hits (exit 1)
$ git log --oneline -S "InfoCard" -- web/src        → (empty)
$ git log --oneline -- .../equation/InfoCard.vue    → 6049995 (A.W3.c), b5b4bc7 (birth)
$ for f in $(find src -name '*.vue'); do … done      → ORPHAN: src/components/visualization/CanvasOverlayButton.vue
                                                        ORPHAN: src/components/equation/InfoCard.vue
                                                        orphan_count=2 of 66
```

**Every path by which it could be reached is closed, and each was checked separately:**

| Reachability path | Probe | Result |
|---|---|---|
| Static `import` / SFC tag | `grep -rni "InfoCard\|info-card" web/src` | 0 |
| Global registration | `web/src/main.ts:1-11` (whole file) | no `app.component(...)`; only `createPinia`, `router`, `mount` |
| Auto-import resolver | `web/vite.config.ts:7-21` | `plugins: [latexPaperPlugin(...), vue()]` — no `unplugin-vue-components`; and an auto-resolver would still leave the literal tag `<InfoCard`/`<info-card` in a template, which grep excludes |
| `import.meta.glob` | `grep -rn "import.meta.glob" web/src` | 0 |
| Dynamic `defineAsyncComponent` by path | `grep -rn "InfoCard" web/src` (path string would contain the name) | 0 |

**Falsifier (any ONE of these kills the finding):** a non-empty result from any row above; a
`components:` option registering it; a build-graph dump (`vite build --mode gh-pages` +
`rollup` module list) that contains `InfoCard.vue`. I ran the first five; the sixth is the
live confirmation left to SS-13.

### §0a — And the live twin is a *diverged fork* of it

`EquationView.vue:274-304` contains InfoCard's template body **inlined verbatim**, wrapped in a
`HoverCard`. It is the same tier-pill markup (same `15%`/`30%` `color-mix`, same
`inline-flex items-center px-2 py-0.5 rounded-full text-sm font-semibold border-[1.5px]`), the same
`<MetricBadge>`, the same `<Info>`+`<p>` description row. Three divergences, and every one of them
is the LIVE copy having been refined after the fork:

| | `InfoCard.vue` (orphan) | `EquationView.vue` (live) |
|---|---|---|
| unit prose | `unit="% energy captured"` (:33) | `unit="% energy"` (:294) |
| icon sizing | `class="h-3.5 w-3.5 …"` (:39) | `class="size-3.5 …"` (:300) |
| vertical rhythm | `space-y-2` on the parent (:18) | `mt-2` on the description row (:299) |
| guard | none | `v-if="tierInfo"` (:274) |

This is decisive for D-2 below: **the live copy shortened the unit string, and the orphan never
received the fix.** The orphan is the abandoned ancestor, kept alive only by sweep automation — its
sole working-tree change in the whole bump migration is
`- :amount=… / + :value=…` (`git diff`), i.e. the F/M-wave rename sweep paid maintenance on a
component nothing renders.

**Consequence for the register below.** Findings D-2 … D-19 are all *real properties of the
authored surface* and all *presently unobservable*, because the surface is never painted. I grade
them on the authored artifact (the axis is DESIGN, and the artifact is the design), and mark the
whole block `LATENT` — they become live defects the instant anyone mounts it, and they are exactly
what a naive "adopt the orphan into the pane" cure would ship.

### §0b — a methodological gap this exposes in the R3–R6 derivation model

Intake **R5-7** (`lane-fourier-r3-r6.md:125`, ADOPT-AS-FACT) established that fourier's derived
registries are keyed to *component callsites* and are therefore blind to native element loops.
**The same keying is structurally blind to orphan modules**: a module with zero callsites inflates
the 66-workflow module denominator (**R4-8**, `:106`) and contributes nothing to the 512
`physicalCallsites` figure — it can never appear as a *finding*, only as an unnoticed absence in a
denominator. R5-7's cure (a `NATIVE_TEMPLATE_LOOP` family) does not reach this class.
**CARRY-TO-WAVE → F.W4:** the per-component audit needs a *module-minus-callsite* difference pass,
not only a callsite enumeration. Cost: one `for`-loop; yield here: 2 of 66 files.
**Falsifier:** produce a Codex registry leaf that names `InfoCard.vue` as a subject or a callsite.

---

## §1 — DEFECT REGISTER (21)

Severity ladder: **BLOCKER** = must not ship / blocks the wave · **MAJOR** = user-visible failure or
standards violation · **MINOR** = craft failure a reviewer should reject · **INFO** = recorded, not
actionable alone.

### D-1 · BLOCKER · orphan module carried across seven tranches of audits
`InfoCard.vue:1-43` (whole file). Zero callsites since birth (§0). Yet it has been *counted as a
live surface* by at least four prior audit generations:
`docs/tranches/A/PROGRESS.md:385` books it as one of "13 `<MetricBadge>` adoptions … across 8 files";
`docs/audits/runs/2026-05-27-D-audit/…/DA-design-A4-equation-morph-chrome.md:48` lists
`InfoCard.vue:18` among cards that "render FLAT and borderless" — a rendering claim about a
component that does not render; `2026-06-16-M-deep-audit/raw-findings.json:519` counts
`InfoCard.vue:32` in a 12-occurrence `:amount=` migration budget; and the formation CENSUS
(`CENSUS-2026-08-03.md` §2 C-4) budgets it as one of "7 files for the `./metric` cure".
**Failure scenario:** F.W1 spends three edits (subpath, component identifier, prop reconciliation —
see D-20) migrating a file with no consumers; F.W4's per-component audit spends a full D/L/C lane on
an unreachable surface; and the `MetricBadge`-adoption count that justified the A.W3 primitive
adoption is overstated by one file and one call site.
**Falsifier:** §0 table.
**Disposition: DELETE.** Not migrate, not fix. That drops the census C-4 budget 7 → 6 files and
retires D-2…D-19 at zero cost. If the intent was ever an always-visible tier panel, the correct
move is to extract the *live* twin (`EquationView.vue:283-302`) into this file and mount it — but
that is a design decision, not a migration, and it must first fix D-2…D-9.

### D-2 · BLOCKER (latent) · the metric value is clipped to zero width — the number disappears
`InfoCard.vue:31-36` against `glass-ui@4.0.0 dist/styles/utilities/components.css:7-47`.

The library pill is hard-bounded:

```css
.metric-badge { display:inline-flex; gap:var(--metric-badge-gap,0.125rem);
                max-width:var(--metric-badge-max-width,8rem);
                padding:var(--metric-badge-padding-block,.125rem) var(--metric-badge-padding-inline,.5rem);
                overflow:hidden; flex-shrink:0; }          /* :7,:14,:15,:18-19,:20,:21 */
```

The value span carries `truncate` (⇒ `overflow:hidden`, so its flex *automatic minimum size* is 0)
and default `flex-shrink:1`; the unit span carries `shrink-0`
(`MetricBadge-BpC0R_Ec.js:55` render fn). InfoCard passes a **17-character English sentence** as the
`unit` (`:33 unit="% energy captured"`) at `size="sm"` ⇒ `text-micro` = `--type-micro: 0.6875rem`
(`typography/scale.css:87`, *fixed, non-fluid*) in `--font-stack-mono: "Fira Code", …`
(`tokens/scheme-motion.css:46`; Fira Code advance = 0.6 em exactly).

| | desktop (`html{font-size:1rem}`, `style.css:45-50`) | mobile (`html{font-size:1.125rem}`, `style.css:40-43`) |
|---|---|---|
| content box | 8rem − 2×0.5rem − 2×1px = **110 px** | 144 − 18 − 2 = **124 px** |
| unit (17 ch) | 17 × 0.6 × 11 = **112.2 px** | 17 × 0.6 × 12.375 = **126.2 px** |
| value `"97.3"` + gap | 26.4 + 2 = 28.4 px | 29.7 + 2.25 = 32.0 px |
| flex resolution | deficit 30.6 px, unit `shrink-0` ⇒ **all absorbed by the value ⇒ value width 0** | deficit 34.2 px ⇒ **value width 0** |

At width 0 `text-overflow: ellipsis` has no room to paint even the ellipsis. **The badge renders the
unit alone — "% energy capture‹clip›" — and the measured quantity, the entire reason the badge
exists, is gone.** It fails at *both* breakpoints, and the threshold is not close: the value
survives only for a monospace advance ≤ 0.446 em (desktop) / 0.437 em (mobile); the narrowest
shipping monospaces sit at 0.5 em.

Note the library's own internal tension this call site detonates: `components.css:41-47` gives every
child `overflow-wrap: anywhere` so a long value "breaks WITHIN the badge rather than being clipped" —
but `shrink-0` on the unit means the flex algorithm never asks the unit to compress, so
`overflow-wrap` never engages on the one span that overflows.
**And the live twin already fixed this** by shortening to `unit="% energy"` (9 ch ⇒ 59.4 + 26.4 + 2 =
87.8 px < 110 px, fits) — see §0a. That is direct in-tree evidence that this exact failure was
observed and cured on the other fork.
**Falsifier:** mount it and read `document.querySelector('.metric-badge__amount').getBoundingClientRect().width`;
> 0 kills the finding. Equally: set `--metric-badge-max-width` at the call site (the library ships
the knob at `components.css:15` and InfoCard never uses it), or move the prose to `label`/`context`.
**UNPROVEN-NEEDS-LIVE** for the exact pixel; the *sign* of the deficit is proven arithmetically.

### D-3 · MAJOR (latent) · all three tier pills fail WCAG AA contrast in light mode
`InfoCard.vue:20-30` × `notation.ts:24-42` × `tokens/color-radius.css:72` (`--card: hsl(36 48% 97%)`).
The pill paints `color: info.color` on `background: color-mix(in srgb, info.color 15%, transparent)`
composited over `--card`, at `text-sm font-semibold` (14 px / 600 — **below** the 18.66 px-bold
large-text threshold, so the 4.5:1 floor applies).

| tier | literal (`notation.ts`) | fg L | tinted bg L | contrast | AA 4.5:1 |
|---|---|---|---|---|---|
| `identified` "Conjectured" | `hsl(38, 92%, 50%)` :32 | 0.4413 | 0.8417 | **1.82:1** | ✗ (−59 %) |
| `symbolic` "Exact" | `hsl(142, 71%, 45%)` :26 | 0.4070 | 0.8269 | **1.92:1** | ✗ |
| `spline` "Approximate" | `hsl(0, 84%, 60%)` :38 | 0.2276 | 0.7690 | **2.95:1** | ✗ |

(sRGB relative luminance per WCAG 2.x; `color-mix(… 15%, transparent)` = α 0.15 premultiplied over
`--card`.) **The repository already knows this failure mode and has a cure it cannot reach here:**
`style.css:117-125` darkens `--viz-amber` from glass-ui's `hsl(35 70% 42%)` (≈3.54:1) to
`hsl(35 76% 35%)` (≈4.6:1) precisely because the shipped amber fails AA for normal text. But
`TIER_INFO` colors are **raw literals in a TS module**, not tokens — so the D.W4.d darken sails past
them, and the *worst* offender in the file (1.82:1) is an amber one hue-step from the token that was
explicitly fixed. This is the token-vs-literal seam, caught red-handed.
**Falsifier:** any of the three ratios recomputed above 4.5:1; or a light-mode `--card` materially
darker than `hsl(36 48% 97%)` (it is not — `light-dark.css:98` confirms the same value).
Dark mode (`dark-arm.css:64` `--card: hsl(24 8% 16%)`) is not asserted here and is **UNPROVEN-NEEDS-LIVE**.

### D-4 · MAJOR (latent) · the energy value color fails AA too
`InfoCard.vue:35` `:color="eColor"` → `notation.ts:44-48`, applied by
`MetricBadge-BpC0R_Ec.js:55` as an inline `style="color:…"` on `.metric-badge__amount`, over
`--metric-badge-bg` on `--card`, at `text-mono-micro` = **11 px** (`typography/utilities.css:50-55`,
`scale.css:87`). Against `--card` (L 0.9421): amber **2.02:1**, green **2.17:1**, red **3.57:1** —
all below 4.5:1, at the *smallest* type in the component. Same falsifier as D-3.

### D-5 · MAJOR · red for "Approximate" collides with the app's error register
`notation.ts:36-41` assigns `hsl(0, 84%, 60%)` to the `spline` tier — the **expected, normal**
outcome of a numerical Fourier fit. In the same view, red is the error surface:
`EquationView.vue:243` renders the computation-failure card as
`cartoon-card … border-red-500/30 bg-red-500/5`. So a healthy approximate result and a failed
computation are painted in the same semantic color, one above the other.
**Failure scenario:** a user runs a spline-tier expression, gets a correct answer, and reads the red
"Approximate" chip as a failure state. **Falsifier:** find a non-error use of red in this view that
establishes red as a neutral/informational tone; I find none (`EquationView.vue:243` is the only
red).
**Cure:** the ladder should be tone-of-confidence (e.g. token `--viz-*` neutral → amber → the
existing green), reserving red for `--destructive`.

### D-6 · MAJOR (latent) · tier color and energy color are independent — contradictory chips, 8 px apart
`InfoCard.vue:19-37`: `info.color` (from `TIER_INFO[tier]`) and `eColor` (from
`energyColor(energy)`, `notation.ts:44-48`, thresholds 0.99 / 0.95) are computed from **different
inputs** and rendered side by side in one `gap-2` row. A symbolic (exact) closed form truncated to a
small `budget` (`types.ts:19`) yields tier `symbolic` with `energy_captured` < 0.95 ⇒ a **green
"Exact" pill beside a red "90.0"**, with no text reconciling them. The reverse also occurs:
`spline` at energy 0.995 ⇒ **red "Approximate" beside green "99.5"**.
**Falsifier:** show that the API guarantees `tier === "symbolic" ⇒ energy_captured ≥ 0.99`. Nothing
in `types.ts:24-34` or `notation.ts` states such a coupling, and `budget` is a free request
parameter (`types.ts:19`).

### D-7 · MAJOR · the unknown-tier fallback asserts a false sentence
`InfoCard.vue:13` — `TIER_INFO[props.tier] ?? TIER_INFO.spline`. `props.tier` is typed
`EquationTier` (`types.ts:2`), a closed 3-union, so under types the `??` is dead. But the value
originates as **JSON from the API** (`ComputeEquationResponse.tier`, `types.ts:26`) — an unchecked
boundary. Any tier the backend adds (or any transport hiccup) renders the pill as red
**"Approximate"** with the description *"Coefficients computed numerically via cubic-spline
integration, truncated to the top terms by amplitude."* — a **specific, testable, and false claim
about how the user's answer was computed**. A silent-default is defensible for a color; it is not
defensible for a provenance sentence.
**Falsifier:** a runtime validator between the API response and this prop. `grep -n "tier" web/src/lib/equation/types.ts`
shows a bare interface field; no zod/valibot/parse layer exists in the read-set.
**Cure:** `TIER_INFO[tier]` with an explicit `undefined` branch rendering a neutral "Unknown tier"
chip and *no* mechanism sentence.

### D-8 · MAJOR (latent) · zero state coverage; the library's empty-value machinery is defeated
`InfoCard.vue:32` — `:value="(energy * 100).toFixed(1)"`. MetricBadge ships a `placeholder` prop and
a coalescer whose emptiness test is exactly `value == null || value === ""`
(`coalesceMetric-5qIeZnTx.js:4`; `MetricValue = string | number | null | undefined`,
`utils/coalesceMetric.d.ts:4`), which paints `text-muted-foreground/40` + an em-dash. By
pre-formatting to a string at the call site, InfoCard guarantees the coalescer never fires:
- `energy = NaN` ⇒ `"NaN"` ⇒ `isEmpty:false` ⇒ **the literal text "NaN" rendered in danger red** and
  passed to `energyColor(NaN)` (`notation.ts:45-47`: both `>=` comparisons are false ⇒ red).
- `energy = undefined` ⇒ `NaN*100` ⇒ same.
- `energy = null` ⇒ `0` ⇒ **"0.0"**, silently claiming zero energy captured.

There is additionally **no loading state and no error state**: the component has no `v-if`, no
skeleton, no guard (contrast the live twin's `v-if="tierInfo"`, `EquationView.vue:274`, and
`EquationView.vue:239/243` which own the computing/error cards). Passing raw `Number` to `:value`
and using `placeholder="—"` recovers all three states for free.
**Falsifier:** a caller that validates `energy` before passing it — there is no caller at all (D-1).

### D-9 · MAJOR (latent) · the badge is dressed as an interactive control it isn't
`MetricBadge-BpC0R_Ec.js:55` puts `cursor-pointer` and
`focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2` on the root
unconditionally, and `components.css:50-66` adds a hover rung-lift
(`--metric-badge-hover-bg` + `scale: 1.02`), an `:active { scale: 0.96 }` press, and a
`:focus-visible { box-shadow: var(--focus-ring-shadow) }`. InfoCard mounts it (`:31-36`) with **no
`@click`, no `tabindex`, no `role`, no wrapping control**. Result: a pointer cursor, a hover lift and
a press-scale on a read-only readout — a textbook affordance lie — plus a focus style that is
unreachable, which is the more insidious half (dead a11y affordance suggests coverage that isn't
there).
This is a **glass-ui 4.0.0 conformance defect the consumer inherits**, and it is the second-strongest
argument (after D-20) for adopting 7.0.0's `Metric`, whose styles carry no `cursor-pointer`
(`glass-ui@7 src/components/metric/styles.css`).
**Falsifier:** show a `tabindex`/handler on this call site, or a `--metric-badge-*` knob that
suppresses the pointer cursor (none exists — the cursor is a hard-coded utility in the render
function, not a token).
**Relay:** this is a component/glass-ui-level observation ⇒ standing BH-inbox relay law applies at
wave time.

### D-10 · MINOR · Aristotelian proportion: the frame weighs the same as the gutter
`InfoCard.vue:18` — `px-3 py-2 space-y-2`. The vertical padding (`py-2` = 8 px) is **exactly equal**
to the inter-block gutter (`space-y-2` = 8 px), while horizontal padding is 12 px. A container reads
as containing only when its frame exceeds its internal divisions; here the top/bottom margin has no
more authority than the space between the chip row and the description, so the card reads as framed
left–right and unframed top–bottom. The 3:2 horizontal:vertical padding ratio compounds it. The fix
is one token: `py-3` (12 px, isotropic frame) with `space-y-2` retained, or `p-3` + `space-y-1.5`.
**Falsifier:** a house rule setting frame = gutter deliberately; the sibling cards contradict it —
`EquationView.vue:230` uses `p-4` (isotropic) for the same register.

### D-11 · MINOR (latent) · the two chips in one `items-center` row are different heights
`InfoCard.vue:19-36`. Tier pill: `text-sm` (0.875 rem, paired line-height 1.25 rem = 20 px) +
`py-0.5` (2×2 px) + `border-[1.5px]` (2×1.5 px) = **27 px**. MetricBadge:
`min-height: 1.5rem` = **24 px** (`components.css:16`, dominating its 11 px + 4 px + 2 px content
box). A 3 px delta, centered — so 1.5 px of asymmetric optical drift on both edges of a 27 px row.
On mobile (root 18 px) it becomes 30 px vs 27 px, the same 3 px. Radii agree
(`rounded-full` vs `--radius-badge → --radius-pill: 9999px`, `theme/radius.css:25,46`), which makes
the height mismatch the *only* mismatch and therefore the visible one.
**Falsifier:** measure both `getBoundingClientRect().height` live — **UNPROVEN-NEEDS-LIVE** for the
exact px; the inequality follows from the cited CSS.
**Cure:** `min-h-6` on the pill, or `--metric-badge-min-height: 1.6875rem` at the call site.

### D-12 · MINOR · a third border spelling inside a 2 px cartoon frame
`InfoCard.vue:21-22` — `border-[1.5px]`, an arbitrary-value escape hatch, nested inside a
`cartoon-card` whose border is `2px` (`cards.css:34`). Three weights (2 px frame, 1.5 px pill, 1 px
badge from `components.css:29`) in a 43-line component, only one of which comes from a token. Prior
art confirms this is systemic, not local:
`2026-06-16-M-deep-audit/raw-findings.json:1835` catalogues **24** `border-[1.5px]` sites and names
`InfoCard.vue:22` explicitly — **the line still holds at HEAD** (verified: `:22` is
`border-[1.5px]`).
**Falsifier:** a `--border-width-pill: 1.5px` token in glass-ui 4.0.0 — `grep` finds none.

### D-13 · MINOR (latent) · typographic register collision: prose in the numeral slot
`InfoCard.vue:33` puts *"% energy captured"* — an English phrase — into MetricBadge's `unit` slot,
which the library renders `font-mono text-muted-foreground` at 11 px
(`MetricBadge-BpC0R_Ec.js:55`; `typography/utilities.css`). The `unit` slot's monospace voice exists
for symbols and dimensions (`%`, `ms`, `px`); `label`/`abbreviation` are the annotation slots and the
`.d.ts` says so ("Full annotation slot … Tracked uppercase, muted",
`MetricBadge.vue.d.ts` `label`). This is also fought by the app's brand voice: fourier remaps
`--font-sans` to Computer Modern Serif and sets `body { @apply … font-serif }`
(`style.css:13-15, 17-22`), so this one 8 px-gap row runs serif-14-semibold → mono-11-regular →
serif-14-muted in three steps. It is the proximate cause of D-2.
**Falsifier:** a house convention documenting prose in `unit`; the library's own d.ts contradicts it.

### D-14 · MINOR (latent) · no live region on a value that changes under the user
`InfoCard.vue:19-37`. The tier chip and the energy figure both change when a recomputation lands
(the live twin's source, `displayEnergy`, is reassigned at `EquationView.vue:115` and `:139`). The
row carries no `role="status"`, no `aria-live="polite"`, no `aria-atomic`. A sighted user sees the
chip flip green→red; a screen-reader user is told nothing. (The live twin sidesteps this by living
inside a `HoverCard` — on-demand, so it *is* announced on open. An always-visible InfoCard has no
such excuse.)
**Falsifier:** an ancestor live region — none exists; the orphan has no ancestor at all.

### D-15 · MINOR · prose defects in all three tier descriptions
`notation.ts:24-42`.
- `identified` (:33-34): *"The formula matches but is not proven."* — **matches what?** No
  antecedent; the preceding sentence's objects are "numerical coefficients" and "rational functions
  of n". Two passive constructions ("was detected", "is not proven") in 24 words.
- `spline` (:39-40): *"truncated to the top terms by amplitude"* — **how many terms?**
  Unquantified, and the answer is *already in the payload*: `effective_n`
  (`types.ts:33`) and `term_count` (`types.ts:45`) are both returned and neither is ever surfaced by
  this component. The one number that would make the sentence actionable is discarded.
- `symbolic` (:27-28) is the good one — 9 words, active, exact — which is the standard the other
  two should meet.

### D-16 · INFO (latent) · a read-only panel that lifts under the cursor
`InfoCard.vue:18` `cartoon-card` → `style.css:107-111` `@apply cartoon-surface` →
`cards.css:44-47`:
```css
&:hover:not(:disabled) { translate: var(--lift-sm) var(--lift-sm);   /* -1px -1px, offsets-sizing.css:10 */
                         box-shadow: var(--shadow-cartoon-lg); }
```
The shim inherits the hover-lift wholesale, so a non-interactive information panel physically
displaces under the pointer — motion signalling an affordance that does not exist. Graded INFO, not
MAJOR, on two counts: (a) `--lift-sm` is only −1 px; (b) glass-ui's reduced-motion policy already
strips the *tween* (see S-4), leaving an instant 1 px shift, which is displacement but arguably not
"animation" under WCAG 2.3.3. The residual is real but small.
**Falsifier:** a `:not(.cartoon-card--static)` carve in the shim, or a reduced-motion rule that
neutralises `translate` itself rather than its transition — `a11y-overrides.css:6-30` does the
latter only for the transition property list.

### D-17 · INFO · icon optical alignment off by ~1 px
`InfoCard.vue:39` — `mt-0.5` (2 px) to seat a 14 px glyph in a 20 px line box; geometric centering
wants (20 − 14)/2 = 3 px, and cap-height centering usually wants slightly more, not less. **But**
fourier remaps the body face to Computer Modern Serif (`style.css:13-15`), whose cap-height/x-height
ratio differs from the Tailwind default assumption, so the correct nudge is empirical.
**UNPROVEN-NEEDS-LIVE** (SS-13): screenshot the row and measure the icon's optical center against
the first line's cap-height. `mt-0.5` may well be right for CM Serif.

### D-18 · INFO · two spellings of one size utility across the fork pair
`InfoCard.vue:39` `h-3.5 w-3.5` vs `EquationView.vue:300` `size-3.5`. Repo-wide: 15 files use
`h-3.5`, 2 use `size-3.5`. The orphan uses the *majority* spelling and the live twin the modern one —
so this is a repo-level consistency item (recorded for F.W3's sweep), not a defect of this file
alone. Downgraded accordingly.

### D-19 · INFO · dead CSS still ships
Tailwind v4 discovers candidates by **directory scan**, not by import graph, so every utility in this
never-mounted file is emitted into the production bundle. In practice the cost here is ~0 (all its
utilities — `border-[1.5px]` ×24, `h-3.5` ×15, `cartoon-card` ×17 — are shared with live files); the
finding is recorded because it is the general mechanism by which orphans stop being free, and
because it means `grep`-based "is this class used?" audits will keep returning true for dead code.
**Falsifier:** a `content` allowlist in the Tailwind config that excludes it — `vite.config.ts:35-37`
wires `@tailwindcss/postcss` with no content restriction.

### D-20 · MAJOR · the 7.0.0 break here is **not** a subpath rename — the census understates it
`InfoCard.vue:4` — `import { MetricBadge } from "@mkbabb/glass-ui/metric-badge"`. CENSUS §3a
("The uplift break surface") records `metric-badge ×7 files` among "removed subpaths in live use",
which reads as a specifier rewrite. **The producer tree says otherwise.** Three distinct breaks
stack on this one import:

1. **Subpath** — `./metric-badge` absent from `glass-ui@7.0.0 package.json exports`; `./metric`
   present. Producer's own note: `CHANGELOG.md:25` — "`./metric-badge` | consolidated → `./metric`
   (`Metric`)".
2. **Component identifier gone** — `glass-ui@7 src/components/metric/index.ts` exports
   `Metric`, `MetricCell`, `MetricRow`, `MetricStack`. There is **no `MetricBadge.vue`** in the
   7.0.0 tree (`find src -ipath "*metric*" -name "*.vue"` → 4 files, none named MetricBadge). So
   `<MetricBadge>` at `:31` must become `<Metric>` at every one of the 7 sites, not just the import
   line.
3. **`color` prop deleted, with no carrier** — `MetricProps` (`glass-ui@7
   src/components/metric/types.ts:8-24`) is `{value, unit, placeholder, loading, label, context,
   class, size, orientation}`. **No `color`, no `tone`**; `grep -n "color\|tone" Metric.vue` → 0
   hits, and `styles.css:4` hard-codes `color: var(--foreground)`. InfoCard's `:color="eColor"`
   (`:35`) — and therefore the whole `energyColor()` ladder at `notation.ts:44-48` — **has no
   destination at 7.0.0.** The same deletion hits `EquationView.vue:296` (the live twin) and every
   other `:color`-passing MetricBadge site.

Also removed at 7.0.0: root `coalesceMetric` / `METRIC_PLACEHOLDER` (`CHANGELOG.md:70-71` — "pass
`placeholder` on the `/metric` components"). Gained: `loading?: boolean` and `context?: string` —
which happen to be the exact cures for D-8 (loading state) and D-13/D-2 (a prose slot that is not
`unit`).
**CARRY-TO-WAVE → F.W1, and it revises the budget:** the `./metric` cure is not 7 one-line edits. It
is 7 files × (specifier + tag + `color`-channel redesign), and the `color` redesign is a *design*
decision (how does a semantic-confidence tone survive into 7.0.0?) that must be made once, centrally,
before the sweep. **This challenge's single largest contribution to F.W1 planning.**
**Falsifier:** a `color` prop, a `tone` prop, or a `--metric-color` custom-property hook anywhere in
`glass-ui@7 src/components/metric/`; or a compat alias exporting `MetricBadge` from `./metric`
(`index.ts` shows none).

**Break surface at this file, complete (census cross-walk):**

| census break-surface item | present in `InfoCard.vue`? | evidence |
|---|---|---|
| `metric-badge` subpath (×7 files) | **YES** — `:4`; and see the three-way escalation above | CENSUS §2 C-4 names this file |
| `lucide-vue-next → @lucide/vue` (×35 sites) | **YES** — `:3` `import { Info }` | CENSUS §3a |
| `hover-card` (×2), `hover-popover` (×2) | **NO** here — but the live twin imports it (`EquationView.vue:9`), so the twin carries this file's *function* into that break too | — |
| dock members (`DockIconButton`, `DockDropdownTrigger`) | NO | — |
| `ToastVariant` definition-absent (hard typecheck break) | NO | — |
| `cartoon-card` shim (25 sites) | **YES** — `:18`; 7.0.0's sanctioned form is `<Card surface="cartoon">` (`glass-ui@4 CardAction-XH4YBVEK.js:49` already shows the mechanism) | CENSUS §3a "InfoCard→`./card`" convergence candidate |

**All of which is spent on a file nothing renders (D-1).** Recommendation stands: delete, and let the
`./metric` + `@lucide/vue` budgets drop by one file each.

### D-21 · MAJOR · the tonal-accent recipe is hand-rolled here for the Nth time
`InfoCard.vue:23-27` re-derives the fill/edge/text tonal triple
(`color-mix(… 15%, transparent)` / `… 30%` / solid) inline. Prior art, corroborated and still true at
HEAD: `2026-06-16-M-deep-audit/findings-index.txt:352` and `design-synth.json:347` count **~57**
re-derivations across `NotationPills`, `EquationModeToggle`, `BasisSelector`, `InfoCard`,
`HarmonicLevelGrid`, and name it "the single largest gap … the colour-pop accent system the user
wants suffused, yet it has no glass-ui home (IconChip covers icon-glyph tone, NOT background/border/
text accent fills)". The `2026-06-17-M-critique` re-audit sharpens it to "33 fill-sites + 40
edge-sites across 18 components" (`raw-findings.json:2911`).
**This challenge adds the reason it matters on the DESIGN axis specifically:** because the recipe is
inline and untokenised, **it is unreachable by the contrast cure** — D-3's 1.82:1 failure cannot be
fixed at the token layer the way `--viz-amber` was (`style.css:117-125`), because there is no token.
A `<ToneChip tone="…">` primitive that is contrast-safe *by construction* fixes D-3, D-5, D-12 and 56
other sites in one move.
**Falsifier:** an existing glass-ui 4.0.0 or 7.0.0 primitive taking a free-form tone and producing an
AA-safe fill/edge/text triple — `icon-chip` (4.0.0) and `chip` (7.0.0) both own glyph tone only.
**Relay:** glass-ui BH inbox (standing law).

---

## §2 — SUPERLATIVES (L-18 runs both ways) — 5

**S-1 · Zero bespoke CSS, zero `!important`.** `InfoCard.vue` has **no `<style>` block at all**;
the entire surface is glass-ui tokens + Tailwind utilities + two inline `color-mix` bindings. In a
repo where the M-critique found triple-`!important` specificity collapses in a sibling
(`FunctionInput.vue:251-253`, `raw-findings.json:2911`) and three independent spellings of the same
2 px border recipe (`raw-findings.json:1846` — `cartoon-card`, bare `border-2 border-foreground/15
rounded-xl`, and raw CSS in `PaperSidebar.vue:162-165`), this file introduces no fourth spelling and
no specificity debt. **Falsifier:** any `<style>` block or `!important` in the file — there is none.

**S-2 · Genuinely pure presentational.** `:8-14` — type-only `defineProps<{}>()`, two `computed`s, no
watchers, no lifecycle hooks, no store access, no side effects, no template refs. The component is a
total function of its props. This is the correct shape for a tier/energy readout and it is why the
cure for D-1 is cheap in either direction (delete, or mount and fix in place). **Falsifier:** any
`watch`/`onMounted`/`useStore` — none.

**S-3 · The decorative icon *is* hidden from assistive tech — my hypothesis, falsified by the tree.**
I opened this audit expecting a missing `aria-hidden` on `:39`'s `<Info>`. The tree says no:
`lucide-vue-next@1.0.0 dist/esm/Icon.js:41` emits
`...!slots.default && !hasA11yProp(props) && { "aria-hidden": "true" }`, and
`shared/src/utils/hasA11yProp.js:8-14` treats any `aria-*`/`role`/`title` prop as opt-out. InfoCard
passes only `class`, so the SVG ships `aria-hidden="true"` correctly. Recorded as a superlative *and*
as a hazard for F.W1: the `@lucide/vue` migration (35 sites) must preserve this default, because 35
call sites are silently depending on it. **Falsifier:** the rendered SVG lacking the attribute —
**UNPROVEN-NEEDS-LIVE** for the DOM, proven from the dependency source.

**S-4 · The inherited reduced-motion posture is exemplary, and the component adds nothing ungated.**
`glass-ui@4.0.0 dist/styles/utilities/a11y-overrides.css:6-30` does the nuanced thing rather than the
blunt thing: it preserves opacity/color transitions while restricting
`transition-property` to `opacity, color, background-color, border-color, box-shadow !important` —
spatial channels (`translate`, `scale`, `transform`) are stripped, not the whole cascade — **and** it
overrides its own `[data-allow-motion]` escape hatch under `reduce` with the stated principle
"a user who asks for reduced motion outranks any per-element motion-allow … accessibility is
absolute" (`:18-30`). InfoCard authors **zero** motion of its own; the only transition it inherits on
its own content (`transition-colors` on `.metric-badge__amount`) is in the *allowed* list, so it
correctly survives `reduce` rather than being needlessly killed. This is better than most of what
this constellation ships. **Falsifier:** an authored `transition`/`animation`/`@keyframes` in the
file — none. (The 1 px residual displacement is D-16, and is a property of the shim, not of this
component's authorship.)

**S-5 · The icon-gutter construction is the correct one.** `:38-39` —
`flex gap-1.5 items-start` + `shrink-0` on the glyph. `items-start` (not `items-center`) is what
keeps the icon at the *first* line when the description wraps to three lines — and
`identified`'s description (`notation.ts:33-34`, 133 chars) certainly will. `shrink-0` is what stops
the flex algorithm from squashing a 14 px glyph into an ellipse when the prose is long. Both are
bugs-by-default that this file avoids. The strongest evidence they are right: when the live twin was
forked and refined (§0a), it changed the icon's *size spelling* and the row's *margin* — and kept
`shrink-0`, `items-start` and `gap-1.5` verbatim (`EquationView.vue:299-300`). **Falsifier:**
`items-center` or a missing `shrink-0` — neither is present.

---

## §3 — CORPUS RECONCILIATION (fold, don't re-invent)

| Corpus row | This challenge |
|---|---|
| CENSUS §2 **C-4** — "metric-badge '7 imports / 6 files' is 7 files … Budget 7 files for the `./metric` cure" (names InfoCard) | **AGREE** on the count; **EXTEND materially** — see D-20: the cure is specifier + identifier + a deleted `color` prop, and **one of the 7 is dead** ⇒ effective budget **6 files**, plus one central design decision (the `color` channel). |
| CENSUS §3a — break surface: `metric-badge ×7`, `hover-card ×2`, `hover-popover ×2`, dock ×3, `ToastVariant`, `lucide-vue-next ×35`, pencil-boil | **AGREE**; walked item-by-item against this file (D-20 table). 2 of 7 items land here. |
| CENSUS §3a — "CANDIDATES — … `NotationPills→./chip`, **`InfoCard→./card`**" | **CONTRADICT (partly).** The convergence candidate is misidentified: the surface worth converging is `EquationView.vue:274-304` (the *live* HoverCard twin), not `InfoCard.vue`. Converging the orphan produces a `./card` adoption with zero consumers. |
| CENSUS §3a — "the `@utility cartoon-card` resurrection shim (25 sites)" | **AGREE**, `:18` is one of them; live-verified 25 occurrences / 15 files today. |
| CENSUS §3a — "the `--viz-amber` WCAG darken" carry | **AGREE and SHARPEN**: D-3 shows the darken's *reach* is the defect — three literal tier colors in `notation.ts` bypass it, and the worst (1.82:1) is an amber. |
| CENSUS §3a — "vitest ABSENT; the only frontend gates are `vue-tsc` + 29 Playwright tests on a single chromium project" | **AGREE and EXTEND**: `@axe-core/playwright` runs in exactly 2 specs (`visualization-ux`, `visualization-crud`); the `/equation` route is touched by **one** test (`visual-baseline.spec.ts`, 1 `test(`). So D-3/D-4's contrast failures are **outside the axe gate's reach even if the component were mounted**. |
| Intake **R4-9** (ADOPT-AS-FACT) — audited scope byte-identical to the tree F.W0 opens on | **FOLDED** as this challenge's staleness guarantee. |
| Intake **R4-8** (ADOPT-AS-FACT) — 66 workflows / 512 physicalCallsites / 131 modules | **FOLDED and EXTENDED** — §0b: 66 is a *module* denominator; 2 of those 66 have zero callsites and are structurally invisible to a callsite-keyed derivation. |
| Intake **R5-7** (ADOPT-AS-FACT) — deriver blind to native template loops | **PARALLEL FINDING** (§0b): the same keying is blind to orphan modules; R5-7's `NATIVE_TEMPLATE_LOOP` cure does not reach this class. New carry for F.W4. |
| Intake §5/§6 — no row touches InfoCard, metric-badge, cartoon-card, or contrast | **NO OVERLAP** to cite; nothing in the 38/52 TRUE set is contradicted by this file. |
| `docs/tranches/A/PROGRESS.md:385` (fourier) — "13 `<MetricBadge>` adoptions across 8 files … InfoCard.vue × 1" | **CONTRADICT**: a dead adoption. Live count of *reachable* MetricBadge adoptions is 12 across 7 files. |
| `2026-05-27-D-audit/…A4:48` — "`InfoCard.vue:18` … renders FLAT and borderless" | **CONTRADICT**: it renders not at all. The `cartoon-card` finding itself was correct and was cured (`style.css:107-111`); the *enumeration* wrongly included an orphan — the same error CENSUS C-4 inherited. |
| `2026-06-16-M-deep-audit` D2-01 (`findings-index.txt:352`) — ~57× tonal-accent re-derivation, no glass-ui home | **AGREE and SHARPEN** (D-21): the recipe's untokenised inline form is *why* the contrast cure cannot reach it. |
| `2026-06-16-M-deep-audit/raw-findings.json:1835` — 24 `border-[1.5px]` sites incl. `InfoCard.vue:22` | **AGREE, re-verified at HEAD** — `:22` still reads `border-[1.5px]`. |

---

## §4 — UNPROVEN-NEEDS-LIVE (SS-13 probe list, ordered by value)

1. **D-2 clip.** Mount the component (or set `unit="% energy captured"` on the live twin) and read
   `.metric-badge__amount` `getBoundingClientRect().width` and the host's `scrollWidth` vs
   `clientWidth`, at 375 px and 1280 px. Predicted: amount width **0**, host `scrollWidth > clientWidth`.
2. **D-3/D-4 contrast, dark mode.** Light mode is computed from tokens; **dark** (`--card:
   hsl(24 8% 16%)`, `dark-arm.css:64`) is not asserted here. Run axe on `/equation` in both schemes —
   noting the axe gate currently never visits this route (§3).
3. **D-11 chip heights.** Measure both `getBoundingClientRect().height`; predicted 27 vs 24 (desktop).
4. **S-3 confirmation.** Assert the rendered `<svg>` carries `aria-hidden="true"`.
5. **D-16 residual.** With `prefers-reduced-motion: reduce` forced, hover the card and diff
   `getComputedStyle(...).translate`; predicted: an instant, untweened `-1px -1px`.
6. **D-17 optical alignment.** Screenshot the icon/prose row in Computer Modern Serif and measure the
   glyph's optical center against the first line's cap-height.
7. **D-1 final proof.** A production `vite build` module graph containing no `InfoCard`.

---

## §5 — DISPOSITION

**Recommend DELETE `web/src/components/equation/InfoCard.vue` at F.W1**, before the tri-package
sweep touches it.

Rationale, in order of force: it has never been reachable (D-1, proven five ways); its function is
already shipping in a *refined* fork 200 lines away (§0a); keeping it costs F.W1 three real edits
(D-20) plus an F.W4 audit lane; and it carries two blockers and eleven further defects that a future
"just mount the InfoCard" cure would ship whole. The `./metric` and `@lucide/vue` budgets each drop
by one file. Deleting it also removes the artifact that has been mis-inflating adoption and break
counts through four audit generations (§3).

**If the owner instead wants an always-visible tier panel** — a defensible product call, since the
current design hides provenance behind a 200 ms hover — then the correct move is: extract the
*live* twin (`EquationView.vue:283-302`) into this file, mount it in both places, and fix **D-2, D-3,
D-4, D-5, D-6, D-7, D-8, D-9** first. Six of those eight are cured for free by adopting glass-ui
7.0.0's `Metric` (`loading`, `context`, no `cursor-pointer`) plus a contrast-safe `ToneChip`
primitive (D-21) — which is to say the *design* answer and the *uplift* answer are the same answer,
and F.W1 should take them together.

**Two glass-ui BH-inbox relays fall out** (standing formation invariant): D-9 (`cursor-pointer` +
press-scale hard-coded on a component with no interactive contract) and D-21 (no tonal-accent
primitive; contrast-safety must be constructional, not per-site).

---

## §6 — TALLY

| | count |
|---|---|
| Defects | **21** (D-1 … D-21) |
| — BLOCKER | **2** (D-1 orphan module · D-2 metric value clipped to zero width) |
| — MAJOR | 9 (D-3, D-4, D-5, D-6, D-7, D-8, D-9, D-20, D-21) |
| — MINOR | 6 (D-10 … D-15) |
| — INFO | 4 (D-16 … D-19) |
| Superlatives | **5** (S-1 … S-5) |
| Hypotheses raised and falsified by the tree | 2 (missing `aria-hidden` → S-3; MetricBadge scoped `font-weight` defeating `font-semibold` → the rule is correctly `.metric-badge__label[data-v-1657dbc5]`, label-only) |
| Corpus rows folded | 14 (§3) — 3 CONTRADICT, 2 EXTEND-materially, 9 AGREE |
| New carries proposed | F.W1 (D-20 budget revision + `color`-channel design decision), F.W4 (§0b module-minus-callsite pass), 2 glass-BH relays |
| Live probes owed | 7 (§4) |
