# CHALLENGE-D — `demo/workbenches/mix/MixConfigBar.vue` — the design is flawed

**Round 5** · 2026-07-29 · repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`

Prior rounds are preserved and **not** re-litigated:
`challenge-D-design.2026-07-27-r1-prior.md`,
`challenge-D-design.2026-07-28-r2-prior.md`,
`challenge-D-design.2026-07-28-r3-prior.md`,
`challenge-D-design.2026-07-28-r4-prior.md`.

r1 found the dead `variant` and the inert hue axis. r2 corrected the touch-floor evidence and proved
the preview apparatus never renders. r3 found `h-9` deletes the producer's padding and that dark
inverts protagonist and support. r4 removed a false PASS from the record (the 320px shear) and
measured the verb's own word. Round 5 does the two things a fifth round is uniquely placed to do:

> **1. It brings a binding authority that no round of this component has ever opened.**
> `OPTICAL-BENCH-COMPOSITIONS.md` is cited by `VISUAL-CONSTITUTION.md §4.2` and
> `PROPORTION-AUDIT.md PR-05` as *"the binding topology decision"*. Zero prior D or C round of this
> component references it (`grep -rl "OPTICAL-BENCH" challenge-*.md` → empty). Opened, it lands
> three charges **by name**: the composition's Card count must be `0`, its housing must be a
> chassis, and it forbids *"no shadow Card/**local grid**"* — the `grid grid-cols-2` that r4's
> headline defect (the 320px shear) traces back to is prohibited by the table that decides this
> route's topology, and the pane's `<Card tier="resting">` is the "nested unearned Card" §6 names
> as a live defect.
>
> **2. It tests whether the repo's own accessibility remedies reach this component. They do not.**
> `demo/styles/foundation.css` ships `@media (prefers-contrast: more)` explicitly to make *"the
> muddiest text token rise to the foreground floor."* `prefers-contrast` has **zero** prior coverage
> in any round of this component. Measured: the remedy's root tokens move, and **not one pixel of
> this bar responds** — the labels because a producer `:not()` rule resolves them from a token the
> remedy does not touch, the verb because it matches **none** of the five selectors in the remedy's
> border bump. The four contrast failures banked by r1/r3/r4 therefore have **no escape hatch in
> the shipped product**.

## Model receipt

I observe myself to be **Opus 5 (1M context)**, exact model ID `claude-opus-5[1m]` — the tier this
seat was explicitly spawned with. The seat is declared, not inherited.

---

## Verdict

**DEFECTIVE.** This round contributes **three MAJORs**, **one MINOR**, **one prior-round closure**,
and **two negative proofs**. Every prior-round BLOCKER stands unrebutted. Nothing found this round
rescues the component; one thing found this round removes its last remaining excuse.

---

## Evidence base for this round

| Instrument | What it produced |
|---|---|
| `OPTICAL-BENCH-COMPOSITIONS.md` §3 line 43, §5 (Card inventory, boundary table, PR-33 `S122`, binding type matrix), §6 | R5-1, and the closure of r4's open canon conflict (R5-5) |
| **Media-block simulation probe** (Playwright `evaluate`): the `@media (prefers-contrast: more)` and `@media (prefers-reduced-transparency: reduce)` declarations from `demo/styles/foundation.css` injected **verbatim** as an unlayered `:root, .dark` sheet, computed styles read before / during / after | R5-2, and the labelled non-result R5-4 |
| **Selector-match probe**: `btn.matches()` against each of the five selectors in the prefers-contrast border bump | R5-2(b) — no cascade ambiguity |
| **Token-resolution probe**: `--card` / `--surface-reduced-opaque` resolved through a scratch element | negative proof N-2 |
| `demo/styles/foundation.css:665-698` (forced-colors roster) + `demo/color-session/color-chips/{PreviewRamp,PreviewStrip}.vue` + consumer census | R5-3 |
| `grep -rn "InstrumentChassis" demo/` | R5-1(a) — the binding housing has never been built |
| glass-ui 7.0.0 `dist/styles/typography/utilities.css` | the `.section-label` cascade mechanism |
| Shipped captures `visual/shots/safari-{desktop,mobile}-{light,dark}/mix.png` — read as images | §0 |

Live origin `http://localhost:9000/#/mix`. The browser was **shared with concurrent seats** during
this round (tab list showed four peers; two probes were lost to peer navigations and one to a peer's
modal). Every number below was re-taken after a fresh `goto` and is internally consistent within its
own probe call. Where the contention prevented a decisive test, it is recorded as such (R5-4) rather
than reported as a finding.

**Writes:** only under
`docs/tranches/V/megatranche/audit/components/wb-mix-configbar/`. One probe file was transiently
created at `test/__probe_hue_deadcontrol.test.ts` and removed in the same minute;
`git status --porcelain test/` returns empty. Recorded rather than concealed. No source edits land.

---

## R5-1 · MAJOR · NEW AUTHORITY — the binding topology table forbids, by name, the two structures this component is built out of

`VISUAL-CONSTITUTION.md §4.2`: *"The binding value.js inventory in `OPTICAL-BENCH-COMPOSITIONS.md
§5` selects `[]` and `reserve="none"` for all eight P122 workbenches."*
`PROPORTION-AUDIT.md PR-05`: *"`OPTICAL-BENCH-COMPOSITIONS.md §5` is binding."*

Both prior D and C rounds argue against `VISUAL-CONSTITUTION` and `PROPORTION-AUDIT`. Neither has
ever opened the document those two documents defer to:

```
$ grep -rl "OPTICAL-BENCH" docs/tranches/V/megatranche/audit/components/wb-mix-configbar/challenge-*.md
(no output)
```

Opened, it decides three things about this exact composition.

### (a) The Mix composition's Card count is `0`; the shipped pane is a Card

`OPTICAL-BENCH-COMPOSITIONS.md §5`, first paragraph — *"The Card inventory is terminal"*:

> "Browse and Library use exactly one Card shell per rendered palette entity; their
> fields/lanes/empties/inspectors contain none; **the other sixteen compositions have Card count
> `0`.** Every retained shell has the exact data tuple `{size:"sm", material:"content",
> tier:"quiet", surface:"opaque", shadow:false, grain:false, specular:"off"}`…"

`§3` line 43, the Mix row, states the housing:

> "**Mix** | P122 `golden`: N-operand rack/trough 61.8033989%; result/method/provenance
> 38.1966011% … | **Landmark-neutral chassis; no shadow Card/local grid.** | W26."

Shipped (`demo/workbenches/mix/MixPane.vue:62`):

```vue
<Card tier="resting" class="relative pane-scroll-fade w-full overflow-y-auto overflow-x-hidden min-w-0 h-full">
```

Two separate breaches in one line. The composition's legal Card count is `0` and it ships `1`; and
`tier="resting"` is not even the one legal retained tuple, whose tier is `quiet`. §6's live-defect
list names this exact species — *"**nested unearned Card**"* — and §6 forecloses the workaround in
advance: *"Feature waves may refine content within these bounds; changing topology requires an
explicit revision to this artifact and the affected pair, **never an ad hoc local Card, divider,
reserve or breakpoint.**"*

And the housing the table prescribes has never been built at all:

```
$ grep -rn "InstrumentChassis" demo/
(no output)
```

Zero occurrences in the entire demo tree. `Card tier="resting"` is not a MixConfigBar line — it is
`MixPane`'s — but it is the container this component was designed into, and the same `Card` pattern
is copied verbatim at `GeneratePane.vue:31` and `GradientPane.vue:20`, i.e. three of the eight P122
workbenches ship the forbidden shell with identical text. **Charged here as the frame this
component's proportions were authored against**, and relayed to the pane's own seat.

### (b) The `grid grid-cols-2` is prohibited by name, and it is the root of r4's headline defect

`MixConfigBar.vue:94`:

```vue
<div class="grid grid-cols-2 gap-2">
```

`§3` Mix row: *"Landmark-neutral chassis; no shadow Card/**local grid**."*
`§5` producer/consumer seam 1: *"P122 / one main and producer proportion. glass-ui owns named
regions/phases/material, exact `golden`/`preview-dominant` proportions … Regions are
landmark-neutral; **value owns the route main and adds no grid CSS.**"*

Prior rounds charged this grid on consequences — r4 R4-1 proved it shears `Decreasing` at 320px in
both engines; r3 R3-4 proved it inverts importance; r2/r3 measured `gridTemplateColumns:
"227px 227px"` with the third control at `w: 462` outside it. **None of them knew the grid is
forbidden by the table that decides this route's topology.** This matters for the cure's shape: r4
prescribed `grid-cols-1 sm:grid-cols-2` as the local arm of its fix. Under §5 that is *also* a
defect — §6's live-defect list includes *"breakpoint"* alongside the ad-hoc Card, and PR-33 forbids
*"breakpoint-specific copy."* The legal cure is not a better grid; it is **no grid** — the fields
become dial-region children and the producer's `--instrument-dial-gap` owns their separation, which
responds without a breakpoint because *"responsive resolution remains producer-owned behind the same
semantic property"* (PR-33).

### (c) PR-33 requires consumer spacing-override count `0`; this file declares twelve

`§5 · PR-33 · P122-8 chassis regions` defines a six-value producer tuple and its enforcement:

> `S122 = (--instrument-dial-padding-inline, --instrument-dial-padding-block,
> --instrument-control-padding-inline, --instrument-control-padding-block, --instrument-dial-gap,
> --instrument-control-gap)` … "control gap is the separation between adjacent action children."
> **Forbidden consumer behavior: "No value declaration/override/copy/substitute for the six
> properties; no local padding, compensating margin or breakpoint-specific copy."**
> Required observation: "record the six mapped equalities and **consumer override/copy count `0`**."

Inventory of this file's geometry declarations:

| line | declaration | resolved | which `S122` member it substitutes |
|---|---|---|---|
| 93 | `gap-3` | 12px | `--instrument-control-gap` (separation between the bar's own action children) |
| 94 | `gap-2` | 8px | `--instrument-dial-gap` (field↔field) |
| 97, 120, 144 | `gap-1` ×3 | 4px | label↔field interval — no producer member; minted |
| 110, 132 | `gap-2` ×2 | 8px | option row interval |
| 165 | `gap-2` | 8px | icon↔label interval inside the verb |
| 100, 123, 147 | `h-9` ×3 | 36px | producer `SelectTrigger size` register |
| 165 | `h-10` | 40px | producer `Button size` register |

**Eight gap declarations across three distinct values, plus four height declarations. Required
count: `0`.** Prior rounds charged the four heights (r2 D-3, r3 R3-1, r4 R4-8). The **eight gaps have
never been charged at all**, and PR-33 is the clause that forbids them — including the `gap-1` that
does not substitute a producer member but *mints* a third interval value inside a composition whose
interval owner is named.

`VISUAL-CONSTITUTION.md §3.7` says the same thing from the other side: *"Spacing is container-scaled
from glass-ui tokens. No desktop-tight/mobile-airy fork and no breakpoint pile."* Three hand-set
constants are not container-scaled by any definition; at `--ui-scale: 1.5` the producer's intervals
grow and these three do not.

**Cure.** One move covers (b) and (c) and most of r3's and r4's local arms: the bar stops being a
layout and becomes content. Its three fields are dial-region children and its verb is an
action-region child; `--instrument-dial-gap` and `--instrument-control-gap` own every interval; the
grid, the three `gap-*` values and the four heights are deleted, not retuned. That is the shape
§5 already prescribes, and it is subtractive.

---

## R5-2 · MAJOR · NEW — the repo's own elevated-contrast remedy is a measured no-op on every element of this bar

`demo/styles/foundation.css:723-749` ships an explicit remedy, and its doc-comment states its intent:

> "`@media (prefers-contrast: more)` — the elevated-contrast layer (BR-6). ONE override token set
> (not per-component): the low-contrast decorative tints (the U-F12 warm-brown muddiness) DROP,
> borders thicken toward full-ink, and **the muddiest text token rises to the ink floor.** The glass
> calms so the text floor holds over it."

```css
@media (prefers-contrast: more) {
  :root, .dark {
    --glass-tint-strength: 0%;
    --glass-level: 0.1;
    --border:          color-mix(in oklab, var(--foreground) 78%, var(--background));
    --card-edge:       color-mix(in oklab, var(--foreground) 55%, transparent);
    --muted-foreground: color-mix(in oklab, var(--foreground) 88%, var(--background));
  }
  .console-well, .app-layout .glass-resting, .app-layout .console-well,
  .slug-pill, [role="tab"] { border-width: 2px; }
}
```

Three prior rounds banked contrast failures in this component — r1 D-6 (labels fail on the actual
material tier), r3 R3-2 (caption 4.367 light / 3.681 dark, dark worse), r4 R4-2 (the verb's own word,
3.24:1 / 2.77:1). **No round asked whether the product already has a remedy for them.** It has one,
and it does not reach this component.

Measured by injecting the block above **verbatim** as an unlayered `:root, .dark` sheet and reading
computed styles before / during / after (dark scheme, live page):

| quantity | before | with `prefers-contrast: more` applied | delta |
|---|---|---|---|
| `--muted-foreground` (root) | `hsl(34 14% 62%)` | `color-mix(in oklab, hsl(30 14% 90%) 88%, hsl(24 9% 4%))` | **remedy applied** |
| `--glass-level` (root) | `1` | `0.1` | **remedy applied** |
| `--glass-tint-strength` (root) | `4%` | `0%` | **remedy applied** |
| `label.section-label` computed `color` | `rgb(195,185,172)` | `rgb(195,185,172)` | **0** |
| Mix verb `border-width` | `0px` | `0px` | **0** |
| Select trigger `border-width` | `1px` | `1px` | **0** |
| `--opacity-disabled` | `0.5` | `0.5` | **0** |

The remedy demonstrably took effect at the root and **nothing in the bar moved.** Two independent
mechanisms, each individually sufficient:

**(a) The label color is resolved by a rule that does not read the token the remedy raises.**
`node_modules/@mkbabb/glass-ui/dist/styles/typography/utilities.css`:

```css
.section-label { @apply text-mono-caption; color: var(--muted-foreground); }
.section-label:not(.section-label--tinted) { color: color-mix(in oklab, var(--neutral-5), var(--foreground) 22%); }
```

The second rule is specificity `0,2,0` and wins over the first (`0,1,0`) for every untinted
`.section-label` — which is all three of this component's labels (`:98`, `:121`, `:145` pass no
modifier). It resolves from `--neutral-5` and `--foreground`. The `prefers-contrast: more` block
sets exactly five properties and **neither of those two is among them**. The no-delta is therefore
deductively closed, not merely observed: the remedy raises `--muted-foreground`, and the rule that
actually paints these labels stopped reading `--muted-foreground` one specificity step earlier.

**(b) The verb matches none of the five selectors in the border bump.** Selector-matched live, so no
cascade or layer ambiguity is involved:

```json
"verbClasses": "button tap-squish focus-ring glass-wash glass-capsule h-10 gap-2 font-medium font-display",
"verbMatchesBump": [],          // vs ['.console-well','.app-layout .glass-resting',
                                //     '.app-layout .console-well','.slug-pill','[role="tab"]']
"verbBorderW": "0px"            // in all three registers
```

The bump's own comment says *"one weight bump, not per-component"* — but its selector list **is** a
per-component enumeration, and `button.glass-wash` is not in it. Neither is `.glass-control-edge`,
so the three Select triggers hold at `1px` too.

**(c) And `--opacity-disabled` is untouchable by construction.** r4 R4-2's 3.24:1 / 2.77:1 is caused
by `opacity: 0.5` veiling fill, border, specular and glyph as one composited object. Opacity is a
compositing operation, not a color token; **no token-override layer can reach it.** `prefers-contrast`
does not set it, `prefers-reduced-transparency` does not set it, and neither could without a rule
that names the disabled register directly. So the component's headline contrast defect is
structurally outside the reach of the repo's entire accessibility token layer.

**Why this is the round's second headline.** It changes the disposition of four prior findings. r1
D-6, r3 R3-2 and r4 R4-2 could each have been graded "real, but the elevated-contrast register
rescues the users who need it." That defence is now measured and refuted: a user with
`prefers-contrast: more` set sees **the identical bar**, to the pixel, in every register this probe
could read. The failures are unconditional.

**Cure.** Two, at two altitudes. Locally: the labels leave `.section-label` for the `text-small`
control register the canon assigns them (R5-5), which reads `--foreground`, not the shadowed
`--neutral-5` path. At the producer, via the standing BH relay: `.section-label`'s
`:not(.section-label--tinted)` override should resolve *through* `--muted-foreground` rather than
around it, so a consumer's contrast register can reach it — every glass-ui consumer inherits this
seam, not just this file. And the disabled register needs a real design (a token, a border, an
explicit `aria-disabled` + reason) rather than a global alpha, because alpha is the one treatment no
preference query can override.

---

## R5-3 · MAJOR · NEW — the preview chip's whole content is a paint the forced-colors roster was written to protect, and it is not on the roster

`demo/styles/foundation.css:665-698` defines a two-tier forced-colors policy and states its own
membership rule:

> "COLOR-SURFACE ROSTER (the two-tier `forced-color-adjust` policy below reuses it): **the surfaces
> whose whole PURPOSE is to show a color — the actual content of a color tool — must survive WHCM's
> system-color substitution.** The chrome (buttons, labels, borders, the dock) adopts system colors
> by default (`auto`)."

```css
@media (forced-colors: active) {
  canvas, .spectrum-picker, .gamut-overlay, .atmosphere-canvas, [data-glass-field-canvas],
  .gradient-rail, .rail-handle, .readout-rail, .swatch-row > *, .generate-swatch,
  .shadow-swatch, .goo-blob-canvas, .watercolor-swatch,
  .glass-slider[data-variant="spectrum"] .slider-range, [data-color-surface]
  { forced-color-adjust: none; }
```

Fourteen named members plus one attribute hook. The T-17 preview chips are not among them:

```
$ grep -c "preview-chip\|preview-strip" demo/styles/foundation.css
0
```

Both chip forms are pure paint and nothing else:

- `PreviewRamp.vue:35` — `:style="{ backgroundImage: gradient }"`, a 16-stop
  `linear-gradient(90deg, …)`. WHCM strips background images. The chip becomes an empty
  2.618rem × 1em box with a ring.
- `PreviewStrip.vue:41,49-50` — `class="preview-chip preview-strip"` with per-segment
  `:style="{ backgroundColor: stop }"`. WHCM substitutes background colors. The strip becomes a row
  of identical system-colored blocks.

Neither carries `data-color-surface`, the roster's own extension hook.

**The MixConfigBar instance is latent; the family is live.** r4 R4-4 proved by exhaustion that
`operandColors` is empty in every reachable state, so `PreviewRamp` renders nowhere today — I am not
claiming an observable failure in this component and it is labelled a **latent** defect. But
`PreviewStrip` is the same module, carries the same `.preview-chip` class, and **does** render on two
shipped routes:

```
$ grep -rn "PreviewStrip" demo/ | grep -v color-chips
demo/workbenches/generate/GenerateControls.vue:245:  <PreviewStrip :stops="presetStops(p)" />
demo/workbenches/generate/GenerateControls.vue:274:  <PreviewStrip :stops="harmonyStops(h)" />
demo/scenes/atmosphere/AuroraPane.vue:132:          <PreviewStrip :stops="auroraHarmonyStops(atoms, h)" />
```

So the roster omission is a **proven family defect with live members**, and MixConfigBar's arm is the
one that ships the day r4's operand-seat cure lands — i.e. the wave that fixes R4-4 ships this defect
into a route that currently hides it. That is the reason to record it now rather than after.

`PROPORTION-AUDIT.md §5.5`: *"A small icon/mark is either data, status, labeled action, drag
affordance, focus/selection register or removed."* Under forced colors the chip becomes none of
those — it is an empty rectangle occupying the layout of a data mark. And the chip is
`aria-hidden="true"` by design (`PreviewRamp.vue:33`), correctly, because the description text is the
a11y truth — but that means a **sighted** WHCM user is the one class of user who gets neither the
paint nor a substitute.

**Cure.** One roster line. Both forms already share `class="preview-chip"`, so
`.preview-chip` added to the `forced-color-adjust: none` list at `foundation.css:680-697` cures
`PreviewRamp` and `PreviewStrip` and every future chip in the module. Alternatively
`data-color-surface` on the module's root, which is the hook the roster already exposes for exactly
this. Cost: one selector. This is the cheapest finding in five rounds.

---

## R5-4 · MINOR · UNRESOLVED, labelled — the reduced-transparency arm could not be settled by this round's method

`demo/styles/foundation.css:751-791` ships `@media (prefers-reduced-transparency: reduce)` with an
`!important` opaque override on `.glass-wash` — which the Mix verb carries
(`verbHasGlassWash: true`, measured). Injecting that block verbatim as an unlayered sheet and
re-reading, the verb's `background-color` was **unchanged**
(`oklab(0.414855 0.00942762 0.0161359 / 0.6304)` before and during).

**I do not report this as a finding.** An unlayered injected `!important` interacts with cascade
layers in ways that make simulation an unreliable proxy for a real media match, and I could not
distinguish "the block does not reach the verb" from "my injection does not reproduce the match."
The decisive test is a genuine `emulateMedia({ reducedTransparency: 'reduce' })` navigation, which
the shared, concurrently-driven browser did not afford this round. **Labelled a hypothesis; owed to
round 6.** It is cheap: one page load with one emulation flag.

Recorded so the next round does not re-derive the setup: the block sets `--glass-level: 0`,
`--glass-tint-strength: 0%`, `--surface-reduced-opaque: var(--card)`, then forces
`backdrop-filter: none !important` and `background-color: var(--surface-reduced-opaque,
var(--card)) !important` on `.glass-resting, .glass-floating, .glass-wash, .veil-surface,
[data-surface="veil"]`. The question to answer is whether the verb's `α = 0.6304` plate goes opaque —
and, separately, whether the `opacity: 0.5` disabled veil survives it (per R5-2(c), it must).

---

## R5-5 · CLOSURE — r4's open canon conflict over `.section-label` resolves 2–1 against `demo/DESIGN.md`

r4 R4-6 left a question deliberately open:

> "the demo's own design document sanctions the register the tranche constitution forbids, and names
> this file as an intended consumer. **One of the two documents must yield** before any wave can
> close the row."

It framed the conflict as two-sided: `VISUAL-CONSTITUTION.md §4` (controls/labels → `text-small`,
Plus Jakarta Sans) versus `demo/DESIGN.md:52-58` (*"Use glass-ui's named utilities — … `.section-label`
… consumed by the gradient / mix / generate control bars"*).

It is not two-sided. `OPTICAL-BENCH-COMPOSITIONS.md §5 · Binding type matrix` is a **third**
authority and it states the same rule independently:

> "The type relation is exact across `ALL18`: … **controls/labels → `text-small` + non-bold Plus
> Jakarta Sans**; values/code/provenance → `text-mono-small` or the already-established
> `mono-caption` + Fira Code. P019's `1/√φ` Picker pair is the sole paired-scale exception…"

Three facts settle the precedence:

1. **Two tranche-canon documents agree against one demo artifact.** `VISUAL-CONSTITUTION.md §4` calls
   its matrix *"closed across all eighteen compositions"*; `OPTICAL-BENCH-COMPOSITIONS.md` calls its
   copy *"exact across `ALL18`"*. `demo/DESIGN.md` is a working style note with no ratification
   clause.
2. **Only one of the three has change control.** `OPTICAL-BENCH-COMPOSITIONS.md §6`: *"changing
   topology requires an explicit revision to this artifact and the affected pair, never an ad hoc
   local Card, divider, reserve or breakpoint,"* and W32 returns a nonconforming frame *"to its named
   owner."* An artifact with an amendment procedure outranks one without.
3. **The canon already anticipated the mono-caption escape and closed it.** Both matrices permit
   `mono-caption` *"where the content is a caption" / for "values/code/provenance"* — an explicit
   carve-out that does not cover a control label. The exception was drafted; it does not reach here.

**Disposition of the row, now closed:** `demo/DESIGN.md:52-58` is the artifact that must yield. That
does not make this a MixConfigBar finding — the register is a family (`GradientVisualizer` ×4,
`GenerateControls` ×2, `MixSourceSelector`, `SearchFilterBar` ×4, `AdminTagsPanel`, `TagEditPopover`)
and its owner is the canon. But r4's blocker on the row is removed: **no wave is now waiting on a
canon adjudication that has already been decided by the third document.**

Independently, R5-2(a) supplies a *functional* argument that arrives at the same place: staying on
`.section-label` is what puts these labels behind the `:not()` rule that the elevated-contrast
remedy cannot reach. The jurisdiction question and the accessibility question have the same answer.

---

## Negative proof — what round 5 checked and found sound

Recorded so a sixth round does not re-spend the browser time.

| N | Claim | Evidence |
|---|---|---|
| **N-1** | **The `prefers-contrast` remedy itself is not broken** — it applies correctly at the root | measured: `--muted-foreground`, `--glass-level`, `--glass-tint-strength` all change on injection. The failure in R5-2 is that *this component* is unreachable, not that the remedy is inert. |
| **N-2** | **The reduced-transparency fallback token is genuinely opaque** | `--surface-reduced-opaque` falls back to `var(--card)`; resolved through a scratch element: `--card` = `hsl(26 22% 17%)` → **`rgb(53,42,34)`**, alpha 1. I suspected a translucent-substituting-for-translucent defect and it is **not one**. |
| **N-3** | **The `#description` "honest absence" contract is correctly implemented at the leaf** | `sample.ts:58` returns `null` below two operands; both call sites guard it; measured `allChips: 0` across all nine rows with the menu open, with no placeholder swatch. `VISUAL-CONSTITUTION §7 · Mix` — *"No shadow palette filler appears when an operand is absent"* — is met. (What the rows do *with* that null is r4 R4-4's charge, not this one.) |
| **N-4** | **The selection marker exists and agrees with `aria-selected`** | menu open, live: exactly one row with `data-state="checked"` / `aria-selected="true"`, carrying the producer's gutter node `<span class="inline-block w-2 h-2 rounded-pill">`; no `hide-indicator` anywhere in this file. (r4 R4-3a's charge is about the marker's *species* versus the registered selector, which stands; the marker's *existence and agreement* is sound.) |
| **N-5** | **The dropdown does not clip its own list at desktop height** | `viewport.scrollHeight 449 / clientHeight 358` is a real scroll, but `overflowX: 0` and the panel is keyboard- and wheel-scrollable with the producer's own viewport. It is a proportion charge (r2, r4 R4-3c), not a containment failure. |
| **N-6** | **No new console or page error is introduced by any state this round exercised** | `REPORT.json` `/#/mix` all four matrices: `consoleErrors: []`, `pageErrors: []`, `failedRequests: []`; no error raised during the injection probes. |

---

## Canon conformance — round-5 delta only

Prior rounds' tables stand. This round adds one authority and changes two rows.

| Authority | Clause | Prior status | Round-5 status |
|---|---|---|---|
| **`OPTICAL-BENCH-COMPOSITIONS.md §5` (new authority)** | the other sixteen compositions have Card count `0`; retained tuple `tier:"quiet"` | never opened | **FAIL** — `MixPane.vue:62` `<Card tier="resting">`; count `1`, tier illegal (R5-1a) |
| **`OPTICAL-BENCH-COMPOSITIONS.md §3` line 43 (new)** | Mix: *"Landmark-neutral chassis; no shadow Card/local grid"* | never opened | **FAIL** — `MixConfigBar.vue:94` `grid grid-cols-2`; `InstrumentChassis` count in `demo/` = **0** (R5-1b) |
| **`OPTICAL-BENCH-COMPOSITIONS.md §5 · PR-33` (new)** | consumer override/copy count `0` for the six `S122` properties; no local padding | never opened | **FAIL** — 8 gap declarations (3 distinct values) + 4 height declarations (R5-1c) |
| `VISUAL-CONSTITUTION §4.1` | rendered contrast on the actual material tier | FAIL (r1 D-6, r3 R3-2, r4 R4-2) | **FAIL, and now unconditional** — the repo's `prefers-contrast: more` remedy produces zero measured delta anywhere in this bar (R5-2) |
| `VISUAL-CONSTITUTION §4` type matrix | control/label → `text-small`, Plus Jakarta Sans | FAIL, **owner disputed** (r4 R4-6) | **FAIL, owner resolved** — third authority agrees 2–1; `demo/DESIGN.md` yields (R5-5) |
| `PROPORTION-AUDIT §5.5` | a small mark is data/status/action or removed | — | **FAIL (latent)** — under forced colors the chip is an empty rectangle in a data mark's layout; family live on `/#/generate`, `/#/atmosphere` (R5-3) |

---

## Gestalt — what round 5 adds

r4's synthesis was *"designed without contact — every decision locally reasonable, none checked
against the thing it lands on."* Round 5 confirms it from a direction r4 could not reach, and
sharpens it into something more uncomfortable:

> **The component is not merely out of contact with its neighbours; it is out of contact with the
> documents that already decided its shape, and out of reach of the remedies the product already
> ships for its failures.** §5 of the binding topology table specified this composition — a
> landmark-neutral chassis, no Card, no local grid, producer-owned intervals, `text-small` labels —
> and every one of those five decisions was made differently in the file. Meanwhile `foundation.css`
> ships a hand-built elevated-contrast layer whose stated purpose is to rescue exactly the muddy
> low-contrast text this bar is made of, and it rescues none of it, because the one register the
> bar's labels use resolves around the token the remedy raises, and the bar's verb is invisible for a
> reason (`opacity`) that no token layer can address.

That is the fifth round's contribution to the transposition: **the cure is not a set of edits to this
file, it is a deletion of this file's layout.** r1 asked for a labelled-field composition; r2 asked
to split the node by job; r3 asked to stop asserting geometry; r4 asked to collapse the grid and fix
the shear. §5 already specifies all four as one thing — dial-region fields, action-region verb,
producer intervals, no grid, no Card. Every prior round independently rediscovered a fragment of a
composition that was ratified before any of them ran.

Ordering, folding into r4's:

0. **Re-open the topology row** (R5-1) — the composition is specified and unbuilt. `InstrumentChassis`
   count in `demo/` is `0`; the eight P122 workbenches ship `Card tier="resting"` instead, three of
   them with byte-identical class strings. This is a W18/W26 obligation, not a component patch, and
   r4's local `sm:grid-cols-2` arm must **not** land — §5 forbids the breakpoint too.
1. r4's step 0 producer arm (`text-overflow: ellipsis` on the producer value span) — still wanted,
   still a BH relay item, and independent of the topology.
2. r3's step 1 + R5-1(c) — delete every hard-coded dimension **and every hand-set gap**, not just the
   heights. Consumer override/copy count `0` is the acceptance test and it is already written.
3. R5-3 — one roster line, `.preview-chip` into the `forced-color-adjust: none` set. Cure it before
   the operand-seat wave makes it visible, and it fixes two live routes today.
4. r2's split + R5-2 — the verb moves into the chassis action region and takes a **designed** disabled
   register with it (token, border, `aria-disabled` + reason). A global `opacity: 0.5` is the one
   treatment no user preference can escape, which is why it cannot be the design.
5. R5-5 — the type row is unblocked; `demo/DESIGN.md:52-58` is the artifact to amend, and the family
   (11 sites across 7 files) moves together.

## Disposition

`REMOVE` the local grid, the eight consumer gap declarations, the four height declarations and the
unearned `Card`; `ADD-AFFORDANCE` for the disabled register (a design, not an alpha) and the
forced-colors chip; `TIGHTEN` the type row against a now-uncontested canon. **No source edits land
from this formation.** The `.section-label` `:not()` token path, the `SelectItem` marker law, the
value-span `text-overflow`, the Button `variant → emphasis|tone` crosswalk and the `WatercolorDot`
seat regression remain **glass-ui BH/BI relay** items under the standing relay edict. The
`InstrumentChassis` composition (R5-1) is a **W18/W26 topology obligation** and outranks every local
cure proposed in rounds 1–4.
