# CHALLENGE-D — `demo/workbenches/mix/MixConfigBar.vue` — the design is flawed

## Model receipt

I observe myself to be **Opus 5 (1M context)**, exact model ID `claude-opus-5[1m]`, as declared in
my spawning system prompt. The seat is declared, not inherited.

Axis: **DESIGN**. Subject: `demo/workbenches/mix/MixConfigBar.vue` (172 lines, `demo/workbenches`).
Repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.

Verdict: **DEFECTIVE**. Two BLOCKERs, seven MAJORs, two MINORs, one INFO.

---

## 0. Method and provenance

| Instrument | What it produced |
|---|---|
| Safari capture matrix | `docs/tranches/V/megatranche/audit/visual/shots/safari-{desktop,mobile}-{light,dark}/mix.png` — read, all four |
| `REPORT.md` / `STATES.json` | route rows for `/#/mix`; the six state matrices' route lists |
| Live dev server | `http://localhost:9000/#/mix` (listener confirmed IPv6-only: `lsof` → `node 93401 *:9000`; `curl http://127.0.0.1:9000` returns `000`, `curl "http://[::1]:9000/"` returns `200`) |
| Playwright, WebKit | computed styles, composited contrast (canvas-resolved sRGB + WCAG 2.x relative luminance), rects, ink ranges, focus/label association, mode-toggle reflow |
| glass-ui 7.0.0 dist | `Button.vue.d.ts`, `SelectItem.vue.d.ts`, `styles/typography/utilities.css` |
| Canon | `docs/tranches/V/VISUAL-CONSTITUTION.md`, `PROPORTION-AUDIT.md` |
| Frame captured this session | `frames/enabled-mix-1280-light.png` |

Contrast numbers below are composited through the real ancestor stack
(`BODY rgb(180,94,147)` → card `oklab(0.928268 … / 0.664)` → button `oklab(0.915626 … / 0.52)`),
with element `opacity` folded against the parent composite. Colors are resolved through a 1×1
canvas 2D context (the repo's own CSS-color-resolver idiom), not by regexing `oklab()` digits.

---

## 1. Visual truth — what the four Safari frames actually show

Desktop light/dark and mobile light/dark all show the same three shapes: two half-width select
capsules under two caps-tracked mono labels, and beneath them one full-bleed capsule reading
`⊘ Mix`. In every one of the four frames **the `Mix` capsule is the least visually present object
on the pane.** It is flatter than the "Selected" well above it, flatter than the two selects beside
it, and flatter than the `Colors`/`Palettes` segmented tabs above those. The one element the
constitution calls "the page's ONE verb" (`MixConfigBar.vue:158`) reads as disabled furniture.

That is not a vibe. It measures.

| Measurement (1280×800, light, live) | Value | Floor |
|---|---|---|
| `Mix` plate vs the pane behind it, **enabled** | **1.20 : 1** | 3:1 (WCAG 1.4.11 non-text) |
| `Mix` plate vs the pane behind it, **disabled** | 1.10 : 1 | — |
| `Mix` label ink vs its own plate, **disabled** | 3.14 : 1 | — |
| `Mix` label ink vs the pane, **disabled** | 2.86 : 1 | — |
| `section-label` ink vs the pane | **4.00 : 1** | 4.5:1 (WCAG 1.4.3, 14.048px) |
| Select trigger ink vs its plate | 9.66 : 1 | pass |

The enabled/disabled delta is `opacity: 1` vs `opacity: 0.5` and nothing else — 1.20:1 vs 1.10:1.
**Enabled and disabled are, to the eye, the same object.** The desktop-light frame and
`frames/enabled-mix-1280-light.png` are indistinguishable at the button.

Second visual truth, from the same frames: each cell's *label* is the dominant mark and the user's
*choice* is subordinate. Measured ink widths at 1280:

- `COLOR SPACE` label ink **110.5px**; the value it labels, `OKLab`, ink **52.3px** → **2.11×**.
- `HUE METHOD` label ink **100.5px**; `Shorter` ink **55.1px** → **1.82×**.

The label is uppercase Fira Code at `letter-spacing: 1.4048px` (0.1em). Caps + mono + tracking is
the loudest possible treatment for the least important text in the cell. Optical hierarchy inverted.

Third: the selects are 227px wide holding 52–55px of ink — **23.0%** and **24.3%** fill. The
chevron sits ~170px from the value. Meanwhile the `Mix` capsule is 462 × 40 = an **11.55:1** slab.
Nothing in this bar is sized by its job; everything is sized by whatever the grid handed it.

---

## 2. Findings

### D-1 · BLOCKER · `variant="primary-audacious"` is a dead attribute — the page's ONE verb ships as the default quiet secondary

`MixConfigBar.vue:162-170`:

```vue
<Button
    variant="primary-audacious"
    :disabled="!canMix"
    class="h-10 gap-2 font-medium font-display"
```

glass-ui 7.0.0's `Button` has **no `variant` prop**.
`node_modules/@mkbabb/glass-ui/dist/components/button/Button.vue.d.ts`:

```ts
export type ButtonEmphasis = "primary" | "secondary" | "quiet" | "text";
export interface ButtonProps extends PrimitiveProps {
    emphasis?: ButtonEmphasis;   // default "secondary"
    tone?: Tone;                 // default "neutral"
    size?: ButtonSize; iconOnly?: boolean; loading?: boolean;
    type?: …; disabled?: …; class?: …;
}
```

```
$ grep -rl "primary-audacious" node_modules/@mkbabb/glass-ui/dist/
(no output — 0 files)
```

So the string does not exist in the producer at all. Vue fallthrough deposits it on the DOM as a
junk HTML attribute and the component renders its defaults. Live DOM, this session:

```
data-slot=button | data-emphasis=secondary | data-tone=neutral | data-size=md |
class=button tap-squish focus-ring glass-wash glass-capsule glass-capsule-hover h-10 gap-2 font-medium font-display |
variant=primary-audacious
```

`data-emphasis=secondary`. `glass-wash glass-capsule`. The source comment two lines above the bug
(`MixConfigBar.vue:158-161`) says the deliberate-primary register is "consumed at the root
vocabulary, never a per-instance costume; `default` is the quiet glass capsule and read
disabled-forever over the wash tier." **The shipped code is exactly the failure the comment claims
to have avoided**, and the comment is the reason nobody re-checked it.

Measured cost: enabled plate **1.20:1** against its own pane (floor 3:1). The commit affordance has
no figure/ground separation in any of the four Safari matrices.

Family: this is not one typo. `grep -rn 'variant=' demo/ | wc -l` → **106**;
`grep -rn 'emphasis=' demo/ | wc -l` → **2**. The demo consumer surface is still speaking a
pre-7.0.0 Button dialect after `f2c8f565 feat(v-w44)!: adopt @mkbabb/glass-ui 7.0.0`. The sibling
`GenerateControls.vue:158` carries the identical dead `variant="primary-audacious"`.

**Cure (transposition, not patch).** Delete `variant` here and at `GenerateControls.vue:158`; pass
`emphasis="primary"` plus the named `tone` the commit deserves. Then close the family: a single
sweep that fails the build on any `variant=` reaching a glass-ui root — the 106-site dialect is a
silent-degradation surface, and Vue's fallthrough guarantees it will never announce itself.
Additionally delete the `h-10 gap-2 font-medium font-display` costume (see D-5, D-12); if a commit
verb needs a taller rung, that is `size="lg"` at the root, not four utilities per instance.

---

### D-2 · BLOCKER · the commit control is disabled-forever in the shipped default mode — the same silent glass-ui-7 degradation, one component upstream

`canMix` can never become true from `/mix` in Colors mode, because the only add-a-color affordance
renders non-interactive. `MixSourceSelector.vue:166-175` passes `tag="button"` to `WatercolorDot`.
`VISUAL-CONSTITUTION.md §4.2` records that glass-ui removed it: *"P051 removes the public
`tag="button"`/interactive-host branch in the clean major."* Live DOM this session:

```json
{ "tag": "SPAN", "ariaHidden": "true", "pe": "none", "tabIndex": -1,
  "ariaLabel": null, "hit": "DIV|swatch-row flex items-center gap-2.5 fle" }
```

A `SPAN`, `aria-hidden`, `pointer-events: none`, out of the tab order, **`aria-label` stripped**,
and `elementFromPoint` at its centre returns the parent row. The `aria-label="Add current color to
the mix"` written at `MixSourceSelector.vue:171` reaches no user by any modality.

Consequence for **this** seat: `MixConfigBar`'s `:disabled="!canMix"` is permanently true in the
default mode; the button ships with the `disabled` attribute (first probe: `disabled=""`,
`mix.disabled === true`), and per HTML a disabled `<button>` is not focusable — so the primary verb
is also permanently outside the tab order. The keyboard journey through this bar terminates at
`Hue method` with no verb.

The element belongs to `MixSourceSelector`; the *terminal state* belongs to `MixConfigBar`, and the
*mechanism is identical to D-1*: a pre-7.0.0 producer API handed to the 7.0.0 major, degrading
silently because neither Vue nor `vue-tsc` objects to an unknown prop on a component that accepts
fallthrough attributes.

**Cure.** Same sweep as D-1, widened from `Button.variant` to every retired producer prop
(`WatercolorDot.tag="button"` included). The add-slot becomes a named enclosing geometric
`<button>` with the `WatercolorDot` as its inert face, which is precisely what §4.2 prescribes.

---

### D-3 · MAJOR · the disabled state was never designed — only inherited

The shipped first-paint state of this component is `disabled`, and it says nothing. There is no
reason copy, no `aria-describedby`, no `title`, no hint anywhere in the 172 lines. The entire
disabled treatment is `opacity: 0.5`.

`VISUAL-CONSTITUTION.md §4.1`: *"Selected, failed, pending, withdrawn and **disabled** states are
never color-only. Role, accessible name, state/value and associated error/status are explicit."*
`PROPORTION-AUDIT.md` PR-08 (`ADD-AFFORDANCE`): *"Pending/failure/export/recovery truth only
transient."*

Measured: disabled label 3.14:1 against its plate, 2.86:1 against the pane, and the plate itself
1.10:1. WCAG exempts inactive controls from 1.4.3, which is exactly why an opacity-only disabled
treatment is a *design* failure rather than an audit failure: nothing forces it to be legible, so
nothing made it legible, and the user is left with an unreadable verb and no stated reason.

**Cure.** Bind the verb's blocked reason as durable text in the action region (`"Add 2 or more
colors to mix"`), wired via `aria-describedby`, and let the reason die when `canMix` flips. This is
one composition owned by the chassis action region, not a tooltip and not per-workbench prose.

---

### D-4 · MAJOR · `Hue method` is a no-op control in the shipped default state, and its preview quartet would draw four identical ramps as four distinct arcs

`demo/workbenches/mix/composables/useMixingState.ts:44` — the shipped default is
`const colorSpace = ref<PickerSpace>("oklab")`.

`src/color/anchors.ts:360-366`:

```ts
export const HUE_INDEX = { hsl: 0, hsv: 0, hwb: 0, lch: 2, oklch: 2 } as const;
```

`src/color/operations.ts:101-112` — `interpolateHue(a, b, progress, options.hue)` is reached **only
inside `if (i === hueIndex)`**. For `oklab`, `lab`, `rgb`, `xyz`, `hueIndex` is `undefined`, no
channel index ever equals it, and `options.hue` is never read. Four of the nine
`INTERPOLATION_SPACES` entries (`color-space-meta.ts:27-35`) therefore make `Hue method` inert —
**including the default the route lands on.** The Safari frames confirm the landing state:
`COLOR SPACE = OKLab`, `HUE METHOD = Shorter`.

The bar gives these two controls identical geometry (227px / 227px at 1280; 158px / 158px at 390),
identical labels, identical material. One does something; one does nothing. Nothing in the design
distinguishes them.

Worse, `MixConfigBar.vue:66-74` computes `hueRamps` by holding `colorSpace` fixed and varying only
`m.value` — the argument that is provably unread in acylindrical spaces. With ≥2 operands in the
default space the quartet renders **four pixel-identical chips presented as four distinct hue
arcs.** That contradicts the truth law the sampler's own header declares
(`demo/color-session/color-chips/sample.ts:15-19`: *"a chip that approximates the library output is
FORBIDDEN"*) — approximation is forbidden but tautology is currently shipped. This is confirmed by
construction from the code path, not by a rendered frame (D-2 makes the ≥2-operand state
unreachable from the UI, which is why no capture exists).

**Cure.** Derive `hueApplies = colorSpace in HUE_INDEX` from the library — one boolean, no new
vocabulary — and let it govern the control's existence, not its cosmetics: when the space has no
hue channel the row and its quartet are absent (the same honest-absence restraint already applied
to the operand ramps at `sample.ts:58`), rather than present-and-lying.

---

### D-5 · MAJOR · type jurisdiction inverted in both directions: labels wear the mono/value voice, the verb wears the display voice

Measured computed styles, live:

| Element | Family | Size | Transform | Tracking |
|---|---|---|---|---|
| `label.section-label` ×3 | `"Fira Code", …, monospace` | 14.048px (`--type-caption`) | `uppercase` | 1.4048px |
| `Button` "Mix" | `Fraunces, …, serif` | 16px | none | — | (weight 500)

Source of each: `.section-label { @apply text-mono-caption; color: var(--muted-foreground); }`
(`glass-ui/dist/styles/typography/utilities.css`), applied at `MixConfigBar.vue:98,121,145`; and
`font-display` in the per-instance class at `MixConfigBar.vue:165`.

`VISUAL-CONSTITUTION.md §4` type jurisdictions:

- *"control or label, including dropdown options → `text-small` → Plus Jakarta Sans, non-bold"*
- *"value, code, or provenance → `text-mono-small`, or the already-established `mono-caption`
  **where the content is a caption**"*
- *"This matrix is closed across all eighteen compositions"*, with exactly one named exception
  (P019's Picker identity/headline pair).

"Color space", "Hue method", "Size mismatch" are control labels. They are wearing the value/code
voice. "Mix" is a control. It is wearing Fraunces, the display/identity family. Both directions of
the matrix are crossed in one 172-line file.

The optical consequence is the inverted hierarchy already measured in §1: label ink 110.5px vs
value ink 52.3px, **2.11×**. Caps-tracking a muted mono label to twice the width of the live value
is why the desktop frames read as a form full of headers rather than a bar full of choices.

**Cure.** `.section-label` is the wrong recipe for a control label — the field label composition
belongs in glass-ui as `text-small`/Plus Jakarta Sans, and this component consumes it. Delete
`font-display`/`font-medium` from the Button. Note the sweep is wider than this seat: nine
`section-label` sites exist across gradient / generate / mix / search / admin.

---

### D-6 · MAJOR · the labels fail rendered contrast on the actual material tier

`section-label` ink measured **4.00:1** against the composited pane. At 14.048px desktop /
12.179px mobile that is normal text; WCAG 1.4.3 requires 4.5:1. `VISUAL-CONSTITUTION.md §4.1`:
*"Text, focus, boundaries and state meet their rendered contrast on the actual material tier; a
token name is not evidence."* The token (`--muted-foreground`) is fine in the abstract and fails
here, over the `glass-resting` card over the chromatic ambient field. This is precisely the failure
mode §4.1 was written to catch.

---

### D-7 · MAJOR · three controls of one species, three proportions, and the verb relocates 124.5px on a mode toggle

`VISUAL-CONSTITUTION.md §7 Mix`: *"Source mode, add/remove/reorder, method, unequal-palette
strategy, provenance and commit **share the same control grammar**."*

Measured widths of the three peer selects:

| Viewport | Color space | Hue method | Size mismatch |
|---|---|---|---|
| 1280 | 227px | 227px | **462px** |
| 390 | 158px | 158px | **324px** |

The unequal-palette strategy — same species, same material, same height — is **2.05×** its two
peers, purely because `MixConfigBar.vue:144` puts it in its own `flex flex-col` outside the
`grid grid-cols-2` at line 94. `grid-cols-2` is unconditional: no breakpoint, so mobile keeps a
two-up split of two 158px controls while the third goes full-bleed beneath them. Three peers, three
widths, zero reasons.

Toggling Colors → Palettes, measured live at 390:

```
mixTop colors  = 525.6      mixTop palettes = 650.1      Δ = +124.5px
```

The one primary verb jumps 124.5px down the page, instantaneously — the `v-if` at line 144 has no
transition — while its sibling result plate is wrapped in `<Transition name="vj-morph">`
(`MixPane.vue:111`). One pane, two motion grammars: a tokenized morph for the result, a hard cut
for the control that displaces the commit button under the user's finger.
`VISUAL-CONSTITUTION.md §6`: *"Spatial continuity uses one producer-owned glass-ui spring register…
A scene swap preserves the specimen and changes the surrounding instrument."*

**Cure.** The three method controls are one region: one grid whose track count is content-derived,
so the strategy row joins the same rhythm instead of breaking it, and the region — not the page —
absorbs the mode change. The commit verb's y-coordinate must not be a function of source mode.

---

### D-8 · MAJOR · the `<label>` elements label nothing; the accessible name arrives by a second, competing mechanism

Live, all three: `htmlFor: ""`, no control descendant, `label.control === null`. The `<label>`
element promises association and delivers none. The accessible name is supplied instead by
`aria-label` on the trigger (`MixConfigBar.vue:100,123,147`) — a duplicate of the visible text
through an unlinked path. Two labeling mechanisms, one of them inert; the visible one.

The workbench family cannot agree with itself, either: `GradientVisualizer.vue:163,180,197,229`
uses `<span class="section-label">` for the identical recipe. Same design problem, two different
wrong elements.

`VISUAL-CONSTITUTION.md §4.1` requires role, accessible name and state to be explicit;
`PROPORTION-AUDIT.md` §5 law 5 forbids marks that are not "data, status, labeled action, drag
affordance, focus/selection register or removed" — an inert `<label>` is none of those.

**Cure.** glass-ui owns a labelled-field Select composition that wires `label[for]` ↔ trigger `id`
once, at the root. Consumers pass a label string and stop hand-rolling `<label>` + `aria-label`.
That kills the duplication at the source instead of correcting nine call sites.

---

### D-9 · MAJOR · `/mix` has ZERO rows in every state matrix — RTL, forced-colors, 200% zoom, reduced-motion and keyboard-focus are entirely unobserved

```
$ python3 -c "…json.load(open('.../visual/STATES.json'))…"
zoom-200-desktop       -> ['#/', '#/gradient', '#/browse', '#/blob', '#/admin/users']
reduced-motion-desktop -> ['#/', '#/gradient', '#/browse', '#/blob', '#/admin/users']
forced-colors-desktop  -> ['#/', '#/gradient', '#/browse', '#/blob', '#/admin/users']
rtl-desktop            -> ['#/', '#/gradient', '#/browse', '#/blob', '#/admin/users']
rtl-mobile             -> ['#/', '#/gradient', '#/browse', '#/blob', '#/admin/users']
keyboard-focus-desktop -> ['#/', '#/gradient', '#/browse', '#/blob', '#/admin/users']

mix rows: []
```

Six matrices, thirty captures, `/mix` in none of them. `shots/{rtl,zoom-200,forced-colors,
keyboard-focus,reduced-motion}-*/` likewise contain only `picker/gradient/browse/blob/adminusers`.

Component side: `MixConfigBar.vue` has **no `<style>` block at all** — the file's last line is
`</template>` at 172. Zero scoped CSS, zero `@media (prefers-reduced-motion)`, zero `forced-colors`
handling, zero keyframes. Every one of those treatments is inherited from producers that were never
proven on this route, in a component that layers four utility overrides on top of them (D-12).
`VISUAL-CONSTITUTION.md §8`: *"A visual claim without a tracked frame pair and a named
geometry/color/timing/interaction delta is incomplete."* There is no frame pair here at all.

The forced-colors risk is concrete and named by the canon (§4.1: *"Focus remains visibly distinct
from selection in both schemes, forced colors and reduced transparency"*): this component's entire
enabled/disabled distinction is `opacity`, and its entire commit-plate presence is a translucent
`glass-wash`. Both are exactly the properties forced-colors and reduced-transparency neutralize.
Whether that state survives is currently unknown — which is the finding.

---

### D-10 · MINOR · 36px controls on a touch stage

Measured trigger height **36px** at both 1280 and 390, produced by the per-instance `class="h-9"`
at `MixConfigBar.vue:100,123,147`, sitting beside a 40px verb (`h-10`, line 165).
`REPORT.md` counts 4 `smallTapTargets` on `safari-mobile-light /#/mix` and
`safari-mobile-dark /#/mix`, 8 on each desktop matrix. `PROPORTION-AUDIT.md` §5 law 7: *"Visual
glyph size, operable target size and layout reservation are separate quantities"* — here they are
one quantity, hand-set, below the 44px touch floor, by a consumer override of a producer rung.

---

### D-11 · MINOR · the third vocabulary is hand-rolled, and it alone has no description lane

`MixConfigBar.vue:83-89` declares `STRATEGIES` and `strategyLabels` locally, while its two peers
consume `INTERPOLATION_SPACES` / `HUE_INTERPOLATION_METHODS` from `color-space-meta.ts` — which
carry a `description` per row (`color-space-meta.ts:27-42`) and feed the preview chips. Net design
outcome: the **most** semantically opaque option set in the bar — `"Discard extras"` /
`"Repeat to pad"` / `"Distribute"`, none of which states what happens to a 5-color and a 3-color
palette — is the **only** one with no `#description` row, no chip, and no explanation, in the mode
where it is the deciding control (`MixConfigBar.vue:150-154`).

The comment at line 16-18 celebrates having moved the interpolation vocabulary "to its neutral
`@lib/` home — no more cross-feature reach". The leftover-strategy vocabulary never made the trip.

**Cure.** Same neutral home, same `{value,label,description}` shape. KISS is satisfied by using the
home that exists, not by minting a local exception.

---

### D-12 · INFO · per-instance costume on root components, in a file whose comment forbids it

Four utility overrides on the `Button` root (`h-10 gap-2 font-medium font-display`, line 165) and
one on each of three `SelectTrigger` roots (`h-9`, lines 100/123/147). Owner edict 5 is
root-level styling; the comment at lines 158-161 asserts the register is *"consumed at the root
vocabulary, never a per-instance costume."* Seven per-instance costume classes follow in the next
twelve lines. The overrides are also the proximate cause of D-5 (`font-display`) and D-10 (`h-9`) —
this is not stylistic tidiness, it is where two other findings enter.

---

## 3. What is genuinely sound — the negative proof

I looked for these specifically and they hold:

- **Edict 8 (`verbatimModuleSyntax`)** — all four type-only imports are `import type`
  (`MixConfigBar.vue:12,13,14,15`). Clean.
- **Edict 7 (idiomatic Vue 3.5)** — reactive props destructure with a default at lines 25-45; no
  `defineModel` stale-read hazard exists here (the component is prop-in / emit-out, no local model).
  No `useTemplateRef` is warranted; no template refs are taken.
- **Edict 1 (no god modules)** — 172 lines, one job.
- **Edict 6 (animations never deleted)** — no keyframes exist in this file to move or delete.
- **The honest-absence law is genuinely honored.** `sampleInterpolationRamp` returns `null` below
  two parseable operands (`sample.ts:58`) and the `v-if` at lines 111/133 suppresses the chip. No
  canned swatch, no fabricated preview. This is the one place the file's stated restraint is
  actually implemented.
- **`#description` is a real producer slot** — `SelectItem.vue.d.ts` declares
  `{ default?: …} & { description?: … }`. The slot usage at lines 109/131 is correct and is not
  reaching past the design system.
- **No layout thrash from motion** — because there is no motion (D-7, D-9). Nothing animates a
  layout-forcing property here.
- **No horizontal overflow, no truncation.** `document.scrollWidth - clientWidth === 0` at 390;
  longest option strings (`"Decreasing"`, `"Discard extras"`) fit their 158px cells at 320px and up.
  `REPORT.md` `horizontalOverflow: 0` agrees.

---

## 4. Gestalt

Strip the twelve findings and one shape remains. **This component was written against a glass-ui
that no longer exists, and its comments are more confident than its code.** The two BLOCKERs are
the same defect twice — a retired producer prop handed to the 7.0.0 major, degrading in total
silence because Vue fallthrough turns a wrong prop into a decorative DOM attribute rather than an
error. One instance costs the workbench its primary visual hierarchy; the other costs it the
ability to be used at all.

Around that sits a bar with no proportional argument: three peer controls at two widths, values
occupying 23% of their own capsules, labels shouting at 2.11× the ink of the values they label, a
462×40 verb whose vertical position is a function of a tab it does not own, and an entire
state-space — RTL, forced colors, 200% zoom, reduced motion, keyboard focus — that has never once
been looked at.

The cure is not twelve patches. It is one architectural transposition: **the method region becomes
one labelled-field composition owned by glass-ui** — label voice, field rung, target floor, disabled
reason, focus and forced-colors treatment all resolved once at the root — and `MixConfigBar` shrinks
to what it should always have been: a declaration of which three fields exist, which of them the
current space makes meaningful, and one `emphasis="primary"` verb.

---

*Frames captured by this seat: `frames/enabled-mix-1280-light.png` (live 07-27, enabled state,
light) — kept because the enabled and disabled Safari captures are visually indistinguishable at
the button, which is itself the D-1 evidence.*
