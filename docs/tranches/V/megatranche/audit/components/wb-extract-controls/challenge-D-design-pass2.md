# CHALLENGE-D · PASS 2 — `wb-extract-controls` — independent re-attack, verification, and correction

## Model receipt

I observe myself to be **Opus 5**, exact model ID `claude-opus-5[1m]` (1M-context arm) — the tier
this seat was explicitly spawned with. Seat declared, not inherited.

## Why this file is not `challenge-D-design.md`

I was directed to write `challenge-D-design.md`. **That file already existed** when I arrived
(mtime `2026-07-28 18:34`, 29 176 bytes, 18 findings, backed by archived probe scripts and PNGs
under `./evidence/`). Overwriting it would have destroyed evidence-linked work from a prior seat,
which no instruction authorises and which is strictly worse than a filename deviation.

I therefore ran my attack **independently and blind of the conclusions** (I read the component,
canon, report and screenshots and took my own measurements before reading pass 1), then read pass 1
and diffed. This file is the delta. It supersedes pass 1 on three specific claims and adds one
always-on MAJOR that pass 1 missed and one corrected mechanism. Everything else in pass 1 I
**confirm** and do not restate.

Pass 1 remains authoritative for D-1 through D-18 except where corrected below.

## Pin verification (re-run, independently)

```
$ shasum -a 256 /Users/mkbabb/Programming/value.js/demo/workbenches/extract/ExtractControls.vue
71aa0a65873c367ae3ae393283d4e81bcfc9cbb57b6f232eec9f930264d46c28
```

Byte-identical to the glass BJ W4 hold hash. **CONSUMER EDITS FORBIDDEN until Glass 8.** No source
edit lands from this seat. My additions to the blocked wave are in §5.

## Method

Independent live probe of the routed component in Chromium via Playwright against the running dev
server at `http://localhost:9000/#/extract`, plus the four Safari matrix PNGs and
`audit/visual/REPORT.json`. My text metrology differs deliberately from pass 1's: I measure a
string's rendered advance by rendering it into an off-DOM span carrying the target element's own
resolved `font` and `font-variant-numeric`, then comparing to the target's border-box width. Pass 1
used `scrollWidth == clientWidth`. That difference is the whole of §2.

---

## 1. Verdict

**DEFECTIVE** — unchanged from pass 1, and for the same central reason (certified ink applied as a
*field* rather than an *edge*). Pass 2 adjusts the ledger:

| | pass 1 | pass 2 |
|---|---|---|
| new MAJOR | — | **P2-1** — kC readout overflows its reservation by 36 % at *every* legal value |
| overturned negative | §6 "`w-5` reservation holds… met (by 0.3 px)" | **P2-2** — it does not hold; `"16"` needs 21.73 px in a 20 px box |
| overturned finding | D-9 "all three actions are nameless" | **P2-3** — not attributable; the route's nameless buttons are 5 `radio-group__item` nodes elsewhere. The *hover-only* half of D-9 survives |
| corrected mechanism | D-8 "no `align-self: stretch`" | **P2-4** — the token `--dock-separator-height` is **undefined** outside the Dock; stretch is not the cause, and β4's proposed cure would not work |
| overturned negative | §4 "token-backed, not ad hoc… **No motion finding**" | **P2-5** — measured `0.2s`, i.e. Tailwind's default, not `--duration-fast` (150 ms) |

---

## 2. P2-1 · MAJOR (NEW) — the kC readout overflows its reservation by 36 % at every legal value

`VISUAL-CONSTITUTION §4`, binding: *"Live numbers use tabular figures and **reserve their widest
legal representation** so value changes never reflow the settled chassis."*

`ExtractControls.vue:78` reserves `w-5` (= `1.25rem` = 20 px) for `chromaWeight.toFixed(1)`.

Measured live, rendering the string in the span's own resolved font (Fira Code, 11 px):

```
kC readout   box width   20.00 px
             "0.5"       27.16 px      → +7.16 px  (+35.8 %)
             "1.5"       27.16 px      → +7.16 px  (+35.8 %)
             overflow    visible
             text-align  start
             flex-shrink 1
```

`toFixed(1)` produces **three characters at every legal value in `0.0…1.5`**. There is no value at
which this readout fits its box. It is not clipped (`overflow: visible`), so the glyphs paint 7.16 px
outside their own border box while the flex solver allocates 20 px — every spacing relation to the
right of that span, including the gap before Reset, is off by 7 px permanently, in all four Safari
captures.

Pass 1 examined the k readout and declared the reservation law **met**; it did not examine the kC
readout at all. This is the larger half of the defect and it is always-on.

## 3. P2-2 · overturns pass 1 §6 — the k reservation does **not** hold at its widest legal value

Pass 1 §6, second negative:

> **`w-5` reservation holds at the widest legal k.** At k = 16: `scrollW 20 == clientW 20`,
> `overflows: false`, font 16.4 px. VISUAL-CONSTITUTION §4's "reserve their widest legal
> representation" is met (by 0.3 px, but met).

Measured, same method as P2-1, on the k label (`:15`, `text-mono-small`, Fira Code 16.4 px):

```
k label      box width   20.00 px
             "1"         10.87 px      → fits
             "16"        21.73 px      → +1.73 px OVERFLOW      (max is 16, :29)
             flex-shrink 1
```

**The method, not the arithmetic, is where pass 1 went wrong.** `scrollWidth` and `clientWidth` are
integer-rounded and do not report inline text overflowing a non-scrolling inline-level box — a
`<label>` whose text exceeds its width reports `scrollWidth == clientWidth` while the glyphs paint
outside it. Pass 1's `overflows: false` is an artifact of the predicate. Its "met by 0.3 px" is a
computed estimate, and its sign is inverted: the true margin is **−1.73 px**.

Consequence for the ledger: the reservation law is violated on **both** readouts, not neither.
Pass 1's §6 currently certifies as SOUND a clause that is DEFECTIVE, which is the most dangerous
kind of error in an audit record — a false negative that closes a row.

Both spans additionally carry `flex-shrink: 1` with no `shrink-0`, so the boxes are free to shrink
below 20 px under narrowing while `whitespace-nowrap` content cannot follow.

## 4. P2-3 · overturns pass 1 D-9 — the 3 nameless buttons are **not** this component's

Pass 1 D-9 states the route's `"namelessButtons": 3` are *"exactly this component's three
controls"* and prints, as its own proof:

```
nameless [('Upload image', 40, 40), ('Open camera', 40, 40), ('Reset', 40, 40)]
```

That output is self-refuting: it names all three. The predicate that produced it excluded `title`
from the accessible-name computation. Per accname, `title` **is** a valid name source when nothing
else supplies one, so a `<button title="Upload image">` with an SVG child has the accessible name
"Upload image".

My independent probe, using `aria-label || title || textContent`, on the same route:

```
buttons on route            29
nameless (by that predicate) 5   — all of them:
  <button data-slot="radio-group-item" class="radio-group__item shrink-0" …>   44 × 44
  (× 5, no title, no aria-label, no text)

the three ExtractControls seats:
  title="Upload image"   40 × 40   → NAMED
  title="Open camera"    40 × 40   → NAMED
  title="Reset"          40 × 40   → NAMED
```

The five nameless nodes are `radio-group-item` elements belonging to a different component. I cannot
reproduce the audit's count of exactly 3 under a name predicate that honours `title`, so **the
`namelessButtons: 3` row must not be charged to `wb-extract-controls`** without first recovering the
capture probe's name predicate.

**What survives of D-9, and it is real:** all three actions are icon-only and disclose their meaning
**solely through `title`**, which is hover-only and therefore unreachable on touch — where two of the
four audit matrices live. That is `PROPORTION-AUDIT PR-07` (*"every surviving action/drag seat has a
name/state"*), `PR-16` (*"no tooltip proliferation"*), and `§5.6`. Severity holds; the
`namelessButtons` attribution does not.

## 5. P2-4 · corrects pass 1 D-8 mechanism — the token is undefined, not unstretched

Pass 1 D-8 (correctly) finds two `DockSeparator`s at `h: 0` and (correctly) finds them forbidden by
the binding inventory. Its mechanism is wrong:

> The primitive derives its height from the Dock's fixed band; dropped into a `flex items-center`
> row with no `align-self: stretch` it collapses.

Measured on the separator element itself, live:

```
computed height              0px
--dock-separator-height      (EMPTY — property undefined at this element)
margin                       0px 6px
role                         separator
```

Producer rule, read from `glass-ui/dist/components/dock/styles/controls/…`:

```css
.dock-separator { @apply flex-shrink-0; width: 1px; height: var(--dock-separator-height);
                  margin: 0 0.375rem; background: var(--surface-tint-15); }
```

The height is **explicitly declared** from a custom property, so `align-self` never enters it. The
property is supplied by the Dock chassis; outside that scope `var(--dock-separator-height)` has no
substitution value, `height` becomes `unset` → `auto`, and an empty div is 0 px tall.

**Why the correction matters:** pass 1's blocked-wave clause **β4** proposes *"`DockSeparator` either
declares an intrinsic block size / `align-self: stretch`"*. `align-self: stretch` would **not** fix
this — an explicit `height: auto` beats stretch. The only producer-side cures are a fallback
(`var(--dock-separator-height, 1.5rem)`) or documenting the primitive as Dock-band-only. β4 must be
reworded. (It is moot if α.5 lands and both separators are deleted, which the canon requires.)

**Cost, quantified — new number.** 2 × (1 px + 12 px margin) = **26 px** of the control row spent on
zero ink. At a 300 px plate I measured the kC track collapse to **68.46 px**; returning those 26 px
is a **+38 % track** (68.46 → ~94.5). The invisible dividers cost more than a third of the surviving
axis — which sharpens pass 1's D-2 rather than duplicating it.

## 6. P2-5 · overturns pass 1 §4 — the icon transitions are **not** token-backed

Pass 1 §4 concludes:

> Measured `transition-duration: 0.2s`, `cubic-bezier(0.4, 0, 0.2, 1)`, resolved through Tailwind's
> `--default-transition-duration: var(--duration-fast, 150ms)` — token-backed, not ad hoc. …
> **No motion finding.**

The measurement and the conclusion contradict each other. `--duration-fast` is **150 ms**. If the
declaration resolved through it, the computed value would be `0.15s`. Measured, all three icons:

```
transition-property  color, background-color, border-color, outline-color,
                     text-decoration-color, fill, stroke, --tw-gradient-*
transition-duration  0.2s          ← Tailwind's own built-in default, not --duration-fast
```

Producer rule for `.slider-track`, in the **same rendered row**:

```css
transition: background var(--duration-fast) var(--ease-standard), border-color …
```

So within one visual row the track fades on producer tokens and the icons fade on a framework
constant — two motion registers in one component. `VISUAL-CONSTITUTION §6`: *"Spatial continuity
uses one producer-owned glass-ui spring register. Color/opacity effects use the corresponding short
effect curve."*

Also measured: the hand-rolled rail div computes `transition: all` (no duration, so nothing
animates — but it means the rail's gradient **snaps** on every k change while the sibling kC track
fades through `--duration-fast`).

**Severity: MINOR.** Pass 1 is right that nothing here is spatial motion and nothing animates a
layout-forcing property, so `prefers-reduced-motion` is not independently violated (the app carries
56 reduced-motion blocks; none need reach this component). The defect is tokenisation and register
consistency — not "no finding".

---

## 7. Independently confirmed (pass 1 findings I reproduced)

I reproduced these against the live build with my own probe and confirm them without restating the
analysis:

| Pass 1 | Confirmed by |
|---|---|
| D-3 range paints nothing | `.slider-track` k: `background-color: rgba(0,0,0,0)` (transparent, per `:32`); kC: `oklch(0.481452 0.0657404 28.6099)` uniform — no extent cue on either axis |
| D-5 hierarchy inversion | rail `434 × 24` at full-chroma seed tint vs the dashed drop-zone stage; visible in all four Safari PNGs, worst on `safari-mobile-light` |
| D-7 dead identity ring | `ringEqualsFill: true` — `backgroundColor` and `boxShadow` colour byte-identical in the undeveloped (default) state |
| D-8 two forbidden separators | `sepCount: 2`, `height: 0px` (mechanism corrected in §5) |
| D-10 `disabled` reaches 1 of 5 | Reset `disabled: true`/`aria-disabled: "true"`; Upload `false`; Camera `false`; both `[role="slider"]` spans `null`/`null`/`null` |
| D-11 axis composition unmet | k has no visible label at all; `kC` is jargon behind `title` |
| D-12 two type voices, off-matrix rung | k value **16.40 px**, kC label + value **11.00 px** → **1.49×**; `--type-micro` measures `0.6875rem`, absent from the §4 closed matrix; `--type-small` measures `clamp(0.875rem, 0.8rem + 0.25vw, 1.25rem)` — the kC *label* should be that, in Plus Jakarta Sans, and is Fira Code 11 px |
| D-14 dead `.touch-gate-target` | `querySelectorAll('.touch-gate-target').length` inside the cluster → **0**; because the block is `scoped` it carries a `[data-v-…]` selector and can only ever match this template, so it is provably dead |
| D-17 shorthand/longhand collision | `backgroundImage: none` in the undeveloped state — the `gradient` binding contributes nothing; `backgroundColor` overwrites the `background` shorthand and `"var(--muted)"` never paints |
| §6 negative: `verbatimModuleSyntax`, Vue 3.5 idiom, no horizontal overflow | confirmed |

One addition to D-14 that strengthens it: the affordance was **half-copied**.
`demo/picker/controls/ComponentSliders/ComponentSliders.vue:58` applies `touch-gate-target` to each
slider wrapper and drives `touch-gate-active` from
`ComponentSliders/composables/useSliderTouchGates.ts`. Extract received the *stylesheet* for the
gate and neither the class nor the composable — so its sliders get neither the pointer-capture
recovery nor the target floor, while carrying dead CSS that claims both.

## 8. Coverage gap pass 1 did not record

The four state matrices exist but **do not contain this route**:

```
$ ls docs/tranches/V/megatranche/audit/visual/shots/forced-colors-desktop/
adminusers.png  blob.png  browse.png  gradient.png  picker.png
```

Identical five-file contents for `reduced-motion-desktop/`, `rtl-desktop/`, `rtl-mobile/`,
`zoom-200-desktop/`. **`extract` appears in none of them.**

Pass 1 covered this gap admirably by running its own probes (`D-probe2.mjs` — forced-colors, RTL,
320, developed) and its findings stand on that evidence. But the *tracked* matrices still have no
extract row, so the record has no durable frame pair for D-1 or D-13. Under `EVIDENCE.md` / §8
(*"A visual claim without a tracked frame pair … is incomplete"*) those two findings are carried on
seat-local evidence only. **RC-4 of the blocked wave should require the five matrices to be extended
to `/#/extract` before any cure lands** — otherwise the cure cannot be proven not to have caused the
forced-colors result.

## 9. Additions to the blocked wave

The pin is verified. Pass 1's two-wave structure (`W·EC-α` consumer-only, `W·EC-β` producer-gated) is
sound and I adopt it. Three amendments:

**α.14 (new, from P2-1 / P2-2).** Re-reserve both readouts against their **measured** widest legal
string, not an eyeballed `w-5`, and add `shrink-0`:

- k label ≥ **21.73 px** (`"16"` at `text-mono-small`)
- kC readout ≥ **27.16 px** (`"0.5"`/`"1.5"` at whatever rung α.8 lands on)
- π: for every legal value, rendered-advance ≤ border-box width, measured by font metrology (not
  `scrollWidth`), at 1440 / 390 / 320.

**α.6 amended (from P2-3).** Keep the cure — visible text labels, or `aria-label` plus a
non-hover-only affordance — but strike the justification *"`namelessButtons: 3` are exactly this
component's three controls."* The seats are accessibly named via `title`; the defect is that `title`
is hover-only and touch-unreachable (PR-07 / PR-16 / §5.6). The `namelessButtons` row belongs to
five `radio-group__item` nodes on another component and should be re-homed by the visual-audit owner.

**β4 amended (from P2-4).** Strike *"declares an intrinsic block size / `align-self: stretch`"* —
`align-self` cannot override the explicit `height: var(--dock-separator-height)`. The producer-side
options are exactly two: ship a fallback (`var(--dock-separator-height, <intrinsic>)`), or document
the primitive as Dock-band-only. **The second is preferred**, since `OPTICAL-BENCH-COMPOSITIONS.md
§5` already rules Extract's divider inventory `[]` and the correct consumer action is deletion, not
repair — which makes β4 fully moot once α.5 lands and reduces the producer's Glass 8 obligation to
β1/β2/β3 alone.

**RC-4 (new release condition).** `/#/extract` is added to the `forced-colors-desktop`,
`rtl-desktop`, `rtl-mobile`, `zoom-200-desktop` and `reduced-motion-desktop` capture matrices, and
D-1 / D-13 are re-proved from tracked frames, **before** any styling change lands.

Nothing in this pass changes β1 (independent `--slider-range-bg`), β2 (≥ 24 × 24 operable thumb
seat while the glyph stays 12 × 24), or β3 (producer `forced-colors` track rule). β2 remains the
single true producer blocker: I measure both thumbs at exactly **12 × 24**, matching the
`smallTapTargets` rows in all four matrices, and `PROPORTION-AUDIT §5.7` rules explicitly that the
cure is seat geometry, not a fatter glyph — which a consumer cannot supply without a per-instance
override (edict 5).

## 10. Gestalt (concurring, with one sharpening)

Pass 1's central reading is right and I do not improve on it: the certified ink was applied to the
*field* instead of the *edge*, and the blockers fall out of that one inversion.

The sharpening pass 2 adds is about **where the rigor went**. Thirty-one of 151 lines in this file
are certification prose — born-RED records, six-decimal contrast measurements, named remediation
IDs. That prose governs *ink*. Not one line of it governs *geometry*. And every defect pass 2 adds
is geometric: a 20 px box holding 27 px of text at every value; a 20 px box holding 21.73 px at its
maximum; 26 px of row spent on two dividers that draw nothing; a token that does not resolve outside
the chassis it was written for.

Contrast was measured to six decimals. Boxes were eyeballed. The component's failure mode is not
carelessness — it is a rigor that was pointed at exactly one axis of the design and never turned
ninety degrees.
