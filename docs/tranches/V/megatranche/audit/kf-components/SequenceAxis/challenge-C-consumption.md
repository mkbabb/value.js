claude-opus-5[1m]

# CHALLENGE · `SequenceAxis` · axis C (CONSUMPTION)

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/sequence/SequenceAxis.vue` (49 L)
**Date** 2026-08-06 · **Mode** static, source-derived. No browser tooling (law). Live-only claims are marked `UNPROVEN-NEEDS-LIVE` for SS-13.
**Writes** this file only. keyframes.js + glass-ui read as evidence.

## 0. Read set (whole, read-only)

The component imports **nothing** — zero `import` statements, zero `@mkbabb/*` module edges. Its consumption surface is therefore entirely (a) the props contract, (b) the CSS cascade, (c) the grid its parent owns. Read in full:

| file | why |
|---|---|
| `demo/scenes/sequence/SequenceAxis.vue` | the target |
| `demo/scenes/sequence/SequenceTarget.vue` | sole call-site (`:66`), prop source (`:155`) |
| `demo/scenes/sequence/SequenceTarget.css` | the grid the axis places itself into; the parent's reach-in rules |
| `demo/scenes/sequence/SequencePlayhead.vue` | the sibling sub-unit that names the *same* domain |
| `demo/scenes/sequence/useSequenceDemo.ts` | `STAGGER_MAX = 1600` (`:74`), `ROW_COUNT = 5` (`:59`) |
| `demo/styles/design-idioms.css` | `.stage-field-x` (`:205`), `§LABEL-subgrid` (`:250`) |
| `demo/styles/style.css`, `demo/styles/font-roles.json`, `demo/DESIGN.md` | cascade entry, mono contract, field law |
| `node_modules/@mkbabb/glass-ui/dist/styles/typography/utilities.css`, `.../typography/scale.css`, `.../tokens/scheme-motion.css`, `.../tokens/color-radius.css`, `dist/axes.d.ts`, `dist/components/timeline/*.d.ts` | every token/utility the axis actually resolves against; the shadow-primitive check |

**Tally — defects 7 · blockers 0 · superlatives 4.**

Blockers = 0 is a deliberate call, not a pass: the axis is `aria-hidden`, non-interactive, and imports no library, so no failure mode here crashes, blocks input, or removes AT-reachable information. The one genuinely release-blocking fact in its neighbourhood (**F-1**, the phantom glass-ui dependency) is owned upstream; C-7 below only corrects its blast-radius model.

---

## 1. The seam finding

### C-1 · MAJOR · The axis and its sibling playhead place the same normalized domain on two boxes with different origins — and **it is impossible for both to be right**

*Provenance.*

- `SequenceAxis.vue:22` — `.seq-axis { grid-column: 2 }`, i.e. the axis is an in-flow item of the **stage** grid.
- `SequenceTarget.css:43–44` — `.seq-stage { grid-template-columns: var(--label-col) 1fr; gap: 0.5rem 0 }`. The stage's **column-gap is 0**. Column 2 therefore begins at `--label-col` (3.25rem) from the stage's content edge.
- `SequenceTarget.css:73` — `.seq-row { column-gap: var(--col-gap) }` (0.75rem), declared on the **subgrid**, not on the stage. `.seq-track` is `grid-column: 2` of *that* subgrid (`:107`).
- `SequenceTarget.css:39` — the parent defines `--track-inset: calc(var(--label-col) + var(--col-gap))` — an explicit, named admission that the row track's left edge is `--col-gap` right of column 2's line.
- `SequencePlayhead.vue:25,28` — the sibling opts **out** of the grid (`grid-column: unset`, absolute) and hand-positions at `left: calc(1rem + var(--track-inset))`, documenting at `:7` that `--track-inset` is "inherited from the parent `.seq-stage` cascade".

`--track-inset` inherits into `.seq-axis` exactly as it does into the playhead. The axis consumes it **nowhere**.

*The algebra* (measured from `.seq-stage`'s padding box; `padding: 0.75rem 1rem 1rem`, `SequenceTarget.css:45`):

| element | left edge | right edge |
|---|---|---|
| `.seq-axis` (grid col 2, stage gap 0) | `1rem + 3.25rem` = **4.25rem** | content-box right |
| `.seq-playhead-track` (hand-inset) | `1rem + 4rem` = **5rem** | content-box right |
| `.seq-track` (row subgrid col 2) | `4.25rem` **or** `5rem`, per subgrid-gutter resolution | content-box right |

All three agree at `p = 1` and diverge linearly toward `p = 0`. The divergence is `--col-gap` = **12px** at the origin, ~1.8 % of a ~650px axis (48rem card − padding − 3.25rem label col) ⇒ ~29 ms of a 1600 ms domain, and — because the "0" label is `translateX(0)`-hugged (`:37`) — the *entire* `0` glyph sits left of the zero gate it names.

*Why "impossible for both to be right" is airtight, without a browser.* The playhead's origin is `--label-col + --col-gap` **by construction** (`:39`, `:28`). The axis's origin is the stage's column-2 line, which is `--label-col` **by construction** (stage column-gap 0). The row track's origin is one or the other. Whichever the UA picks, exactly one of the two sub-units is off by `--col-gap`, and the two comments claiming the same thing —

- `SequenceAxis.vue:3–4` "Spans the SHARED track column (2) so the tick labels resolve against the track width"
- `SequencePlayhead.vue:21–22` "Spans the shared row-track column (inset past the label column) so `left: %` resolves against the track width — the SAME axis the handles ride"

— cannot both be true of boxes whose left edges differ by a nonzero token. One of them is prose describing a geometry the file does not have.

*Which one.* The evidence points at the axis: the author minted `--track-inset` **because** the inset is real, and the handles (`SequenceTarget.vue:98`, `left: calc(p*100%)` inside `.seq-track`) plus the balls ride the track box, so the track is the majority frame. Under CSS Grid L2 a subgridded axis honours gutters specified on the subgrid itself, insetting items from the parent's lines — which makes the axis the outlier by the full 12px (or 6px if the UA centres the gutter on the parent's zero-width one). Direction and magnitude: `UNPROVEN-NEEDS-LIVE`.

*Root cause, and it is a consumption fault.* `design-idioms.css:250–261` (`§LABEL-subgrid`) is the demo's own documented idiom for exactly this layout, and it puts `column-gap: 0.75rem` on the **parent** (`.labeled-field-grid:260`) with the subgrid rows declaring none — so every direct child of the parent shares one frame by construction. `.seq-stage` inverts the idiom (gap 0 on the parent, gap on the subgrid row), which is precisely what creates two frames and forces the `--track-inset` hand-compensation. The axis is the sub-unit that didn't get the memo.

*Falsifier.* In the live gh-pages demo, `$0=document.querySelector('.seq-axis').getBoundingClientRect()` vs `document.querySelector('.seq-track').getBoundingClientRect()`: if `left` and `width` match to <1px, C-1's blame flips to `SequencePlayhead` (which would then be 12px right of the track it claims to span) — the seam is still defective, with a different owner. Only `axis.left === track.left === playheadTrack.left` kills C-1 outright, and that requires `--track-inset` to resolve to `--label-col`, which `SequenceTarget.css:39` forbids arithmetically.

---

## 2. Idiom-consumption findings

### C-2 · MINOR · `.stage-field-x` paints **four** rules under **five** ticks; the fifth tick names nothing

`SequenceAxis.vue:6` composes `.stage-field-x`, and `:4–5` asserts "`.stage-field-x` paints the quarter rules, the ticks NAME them." The idiom (`design-idioms.css:205–211`) is `repeating-linear-gradient(to right, var(--border) 0 1px, transparent 1px calc(100% / 4))` — period 25 % of the box, so hairlines land at 0 / 25 / 50 / 75 %. The band that would start at 100 % lies at `[100%, 100%+1px]`, entirely outside the painting area. `AXIS_QUARTERS` (`SequenceTarget.vue:155`) is `[0, 0.25, 0.5, 0.75, 1]` — five labels. The `1600` tick labels a rule that does not exist, and (per C-1) the four that do exist ride the axis's own mis-registered box, so the "graph paper" hairlines are off the tracks by the same 12px.

Secondary: `DESIGN.md:82–83` and `design-idioms.css:194–195` describe `.stage-field-x` as the *stage's* coordinate frame / "graph paper" — the sibling scene applies it to the travel surface itself (`SpringTarget.vue:63` on the drag rail, `:141` on the sampler track), so the field rules sit *under* the moving subject. Here it is confined to a 1.1rem strip (`:24`) above the rows, leaving every actual travel lane ungraduated; `SequenceTarget.css:33–35`'s claim that the stage "OWNS its time grid (the `.stage-field-x` rules live inside it)" is true only of a 17.6px band.

*Falsifier.* A screenshot showing a hairline at the axis's right edge (would prove a 5th rule and kill the primary claim), or a repo rule adding `background-size`/`border-right` to `.seq-axis` (there is none — the component's scoped block is `:20–48` in full).

### C-3 · MINOR · The parent styles the child's private root class across the file boundary, with no declared contract

`SequenceTarget.css:221–223` (`.seq-stage.is-powering-on .seq-axis { animation: seq-ruler-wipe … }`) and `:238–242` (the MANDATORY PRM degrade) both target `.seq-axis` — a class defined only in `SequenceAxis.vue:21`. This works solely because Vue applies the parent's scope id to a child component's **root node**; it is documented Vue behaviour, so this is a fragility claim, not a breakage claim. But: nothing in the 49-line child says its root class is load-bearing for a parent animation, so a reader of the component in isolation cannot see the contract, and any re-root (a wrapper div, a fragment/multi-root refactor, a rename) silently deletes the power-on wipe **and** its reduce-motion suppression with no build, type, or lint error. Note the same cluster does this correctly one file over: `SequencePlayhead.vue:6–7` explicitly documents the inherited-variable contract it depends on. The failure is symmetric (animation and its PRM guard die together), so this is not an a11y hazard — hence MINOR, not MAJOR.

*Falsifier.* A test, gate, or `:deep()`/documented-marker convention that pins `.seq-axis` as a public hook. `grep -rn "seq-axis" test/ scripts/` → no matches; `scripts/gates/visual/index.mjs:75` shoots the `sequence` scene whole, so a broken selector shows up only as a golden diff on a decorative 420 ms boot, i.e. probably not at all.

### C-4 · MINOR · The props contract admits states the stylesheet cannot render

`SequenceAxis.vue:17` — `defineProps<{ quarters: readonly number[]; staggerMax: number }>()`.

`readonly number[]` admits unsorted, duplicated, and out-of-`[0,1]` input, while the CSS encodes three unstated invariants: `left: calc(var(--tick-p) * 100%)` (`:30`) assumes `q ∈ [0,1]` — a `q > 1` tick escapes the frame with no clamp and no overflow guard; `:first-child`/`:last-child` edge-hugging (`:36–41`) assumes **ascending order with 0 first and 1 last** — pass `[1, 0]` and the `1600` label gets `translateX(0)`, overflowing the frame by its full width; `:key="q"` (`:9`) assumes uniqueness. None of this is expressible in the current type and none is checked at runtime. The type could carry it (a `readonly [0, ...number[], 1]` shape, or a normalizing `computed`), and the value.js `clamp` the sibling already imports (`SequencePlayhead.vue:15`, used at `:10` to guard exactly this class of prop) is one line away in the same directory.

*Falsifier.* The sole call-site passes a frozen `as const` literal (`SequenceTarget.vue:155`), so there is **no live defect today** — this is contract quality, not a bug. It dies if the component is proven single-call-site-forever (it isn't: it is a colocated sub-unit created by an explicit ≤500 L split seam, i.e. reuse is the stated posture).

### C-5 · INFO · The ruler renders `0 400 800 1200 1600` with no unit anywhere in the component

`:12` — `{{ Math.round(q * staggerMax) }}`. The `ms` unit appears on the per-row labels (`SequenceTarget.vue:87`, `@{{…}}ms`) but never on the ruler, and the axis has no legend. Graded INFO because the axis is `aria-hidden` (so nothing is lost to AT) and the adjacent row labels supply the unit visually. Worth noting the AT path is weaker than it looks, though: the row sliders expose `aria-valuenow="Math.round(row.at)"` with **no `aria-valuetext`** (`SequenceTarget.vue:101–103`), so a screen reader announces bare numbers there too — the millisecond unit is never announced anywhere in the scene. That defect belongs to `SequenceTarget`, not here.

*Falsifier.* A visible `ms` legend elsewhere on the stage. The header carries only `stagger × 5` and a `%` metric (`SequenceTarget.vue:15–24`).

### C-6 · INFO · The ruler names a domain **no traveller rides** — a third mapping in one storyboard

Three coordinate mappings coexist inside `.seq-stage`:

1. axis ticks — origin `stage col-2`, domain width `W_axis` (`SequenceAxis.vue:30`);
2. playhead + row handles — origin `track.left`, domain `W_track` (`SequencePlayhead.vue:46`; `SequenceTarget.vue:98`);
3. travellers — `translateX((row-start + ball-p·(1−row-start)) · (100cqw − var(--ball-size)))` with `left: 0` (`SequenceTarget.css:193–199`), i.e. the ball's **left edge** spans `[0, W−25.6px]`, so its centre at proportion `p` is `p·(W−25.6) + 12.8`.

Mapping 3 diverges from mapping 2 by `12.8 − 25.6p` px: **+12.8px at `p=0`**, 0 at midpoint, −12.8px at `p=1`. At rest (`ball-p = 0`) the traveller's centre therefore sits 12.8px right of the handle grip it is documented to rest on (`SequenceTarget.css:200` "the traveller rests ON its gate"), putting the 6.4px grip at the ball's left edge rather than under it. Mapping 3 is a deliberate no-overflow inset (its comment says so at `:190–192`), and it is owned by `SequenceTarget.css`, not by the axis — it is filed here because the axis is the scene's **naming authority** and it names a domain that neither the ball's rest position nor (per C-1) the playhead shares. Reconciling C-1 fixes 1↔2; 3 stays unreconciled unless the ruler adopts the same `--ball-size` inset.

*Falsifier.* A live `getBoundingClientRect()` comparison of `.seq-ball` centre vs `.seq-handle::after` centre on row 0 showing ≤2px — impossible unless `--ball-size` resolves to 0. `UNPROVEN-NEEDS-LIVE` for the visual verdict only; the arithmetic is closed.

### C-7 · MINOR · 100 % of this component's visual specification resolves from the **undeclared** glass-ui package — the census's `b` label is import-scoped and understates F-1's blast radius

`lane-frontend.md:255` files `sequence/SequenceAxis.vue` as **`b`**, and `:163` defines the legend honestly: "**b** = no glass-ui *import*". Under that definition the row is correct. But the module graph is not the consumption graph here — the axis has zero imports, so *every* styling input it has is cascade-resolved, and each one traces to glass-ui:

| input | resolves to |
|---|---|
| `text-mono-caption` (`:10`) | `@utility text-mono-caption` — `glass-ui/dist/styles/typography/utilities.css:1` → `--font-mono`, `--type-caption` (`typography/scale.css`), `--type-tracking-caps: 0.1em` (`tokens/scheme-motion.css:1`) |
| `text-muted-foreground` (`:10`) | Tailwind color utility over `--muted-foreground` — `glass-ui/dist/styles/tokens/color-radius.css` |
| `tabular-nums` (`:10`) | present in both Tailwind core and `glass-ui/.../utilities.css` (`@layer components`) |
| `.stage-field-x` ink (`:6`) | demo-owned rule (`design-idioms.css:205`), but its `var(--border)` is glass-ui's (`tokens/color-radius.css`) |

All of it arrives through the single `@import "@mkbabb/glass-ui/styles"` at `demo/styles/style.css:3` — the exact import **F-1** proves is backed by no `package.json` entry and no lockfile row. So under F-1 this file is not an unaffected bespoke leaf: it is a silent casualty (font family, size, caps tracking, colour, and hairline ink all evaporate) that the `b` classification renders invisible. Not a new blocker — F-1's own deduction is that the build dies at the first component import long before the cascade matters — but the "42 files touch glass-ui" figure is an import-graph **lower bound**, and any F-1 remediation spec that scopes its regression surface to the 42 will under-test.

*Falsifier.* Find `.text-mono-caption` or `--muted-foreground` defined anywhere under `demo/styles/`. `grep -rn "\.text-mono-caption" demo/styles/*.css` → 0 hits; `grep -rn "\-\-muted-foreground:" demo/styles/` → 0 hits. Both are vendor-only.

---

## 3. Superlatives (L-18, with falsifiers)

### CS-1 · The R1 value.js parser-crash class is **unreachable** here, provably

The brief asks for value.js transitive exposure "where reachable". It is not. The component has no `import` statement of any kind (`:16–18` is the whole script block); it emits a `number` into a text node (`:12`) and a `number` into an unregistered custom property (`:11`). No colour string, no `parseCssColor`, no `ValueUnit`, no engine parse. The nearest value.js edge in the cluster is `clamp` from `@mkbabb/value.js/math` (`SequencePlayhead.vue:15`, `SequenceTarget.vue:134`) — a pure numeric helper on the math subpath, nowhere near the `oklch()` crash surface. **Falsifier:** any dynamic class/style string on this component reaching a value.js-parsed sink; there is none, and its only two props are typed `number`.

### CS-2 · Correct `aria-hidden` on a decorative ruler whose domain is exposed elsewhere

`:6` marks the whole strip `aria-hidden="true"`. This is the right call, not laziness: five bare numbers would enter the AT tree as orphans with no accessible name, while the domain they describe is already exposed structurally by the row sliders (`aria-valuemin="0"` / `:aria-valuemax="demo.STAGGER_MAX"` / `:aria-valuenow`, `SequenceTarget.vue:99–104`). **Falsifier:** if the sliders did not carry the min/max/now triple, hiding the only visible time labels would be an information loss rather than de-duplication. (They do carry it — but see C-5 on the missing `aria-valuetext`, which weakens this justification without inverting it.)

### CS-3 · Compliant under the demo's own mono contract — the census-reddening trap is avoided deliberately

`demo/styles/font-roles.json:82` `_monoContract` (RULED, T.D4) permits a mono leaf only if it is real code, an explicit `data-register="code"` chip, a vendor-owned data voice, **or** "(b) a tabular numeric readout (`tabular-nums`)" — and closes with "A new demo-authored mono UI label reds the census." `:10` pairs `text-mono-caption` with `tabular-nums` on content that is purely numeric, landing squarely in clause (b). The pairing is not incidental: it is the thing that makes this call-site legal. **Falsifier:** drop `tabular-nums` from `:10` and the same class becomes a bare mono UI label — a census RED. That the negative case is one token away is what makes the positive one a superlative.

### CS-4 · The ruler is derived, never transcribed — it cannot drift from the engine's domain

`:12` computes `Math.round(q * staggerMax)`; `staggerMax` is threaded from the single source `STAGGER_MAX = 1600` (`useSequenceDemo.ts:74`) via `SequenceTarget.vue:66`, the same constant that bounds `reseatRow`'s clamp (`useSequenceDemo.ts:328`) and the handles' `aria-valuemax`. There is not one hardcoded millisecond literal in the file, and `SequenceTarget.vue:152–155` states the discipline explicitly. Retiming the sequence re-labels the ruler for free. The component is therefore **correct in the value domain and wrong only in the pixel domain** (C-1) — a much better failure than the reverse. **Falsifier:** a literal `1600`, `400`, or a second copy of the quarter array anywhere in the sequence tree; `grep -n "1600" demo/scenes/sequence/` finds only `useSequenceDemo.ts:74`.

---

## 4. Considered and rejected (a false defect is worse than a missed one)

1. **"`text-mono-caption`'s `letter-spacing: 0.1em` breaks `translateX(-50%)` centring."** Real but negligible: trailing letter-space at `--type-caption` = `clamp(0.75rem, 0.71rem + 0.21vw, 1rem)` = 12–16px ⇒ 1.2–1.6px, so the centring error is **0.6–0.8px** — two orders below C-1's 12px, and uniform across ticks. Not filed.
2. **"The mobile query compresses `.seq-axis` to `0.95rem` (`:44–47`) but leaves the tick's `line-height: 1.1rem` (`:32`) — the labels clip."** They do not: the ticks are `position: absolute` (`:28`), the container has no `overflow`, and the 2.4px overhang falls inside the stage's 0.5rem row-gap (`SequenceTarget.css:44`). The compression achieves its purpose via the container's height, which is what the grid measures. Not filed.
3. **"`SequenceAxis` is an S-x shadow of a glass-ui primitive."** Checked and **rejected — I concur with the census.** `./axes` (`glass-ui/dist/axes.d.ts`) is the design-system *prop* axes (Surface/Size/Tone/…), not a chart axis. `grep -rlni "tick\|ruler\|gridline" dist --include="*.d.ts"` returns only motion/scroll/webgl composables — no tick or ruler primitive exists in 7.0.0. `ContinuousMarkers` (`dist/components/timeline/ContinuousMarkers.vue.d.ts`) is segment-boundary *buttons* driven by `TimelineSegment[]` + a `boundaryX` callback, i.e. an interactive overlay, not a labelled time ruler; adopting it would require inventing segments this scene does not have. `lane-frontend.md:398`'s placement of "axis/playhead" in **Bespoke, no glass counterpart** stands. Not filed.
4. **"The power-on wipe is native CSS `@keyframes` (`SequenceTarget.css:222,228`) rather than the library — an inv-ζ dogfooding gap."** Rejected: inv ζ as used throughout this tree (`useSequenceDemo.ts:38,41`; `SequenceTarget.css:204,214`; `useSquareDemo.ts:117`) is the **anti-rAF / no-second-clock** law, not a ban on declarative CSS. A one-shot 420 ms boot with no JS clock satisfies it. Not filed.
5. **Vue number→custom-property binding** (`:11`, `'--tick-p': q`). Checked: Vue 3 routes `--*` through `setProperty` and appends no unit, and `q = 0` is not nullish so it is not dropped. Correct as written. Not filed.

---

## 5. Corpus reconciliation

| corpus id | this challenge |
|---|---|
| **F-1** (phantom glass-ui dep, RED) | **Concur + extend.** C-7: an import-free file whose entire visual spec is vendor-resolved. The 42-file figure is an import-graph lower bound. |
| **`G`/`b` legend** (`lane-frontend.md:163`) | **Refine, not contradict.** The legend is import-scoped by its own definition and correct under it; `b` ≠ glass-free for cascade-only consumers (C-7). |
| **S-3 / S-4** (timeline + scrubber shadows) | **Adjacent, untouched.** If S-4 lands `ScrubberTimeline`, note it exposes only `modelValue`/`label` (`ScrubberTimeline.vue.d.ts:27–32`) — no tick-label API — so a scrubber swap does **not** subsume this axis. The C-1 origin split must be fixed in `.seq-stage`'s grid, independently of any glass adoption. |
| **S-8** ("keep, it dogfoods the engine") | Same logic **does not** apply here: this component dogfoods nothing (CS-1), so no library-coverage argument protects it from a future consolidation. Its justification for existing is purely that no primitive exists (§4.3). |
| `lane-library.md` parse seams | **No overlap.** No parse surface is reachable from this component (CS-1). |

## 6. `UNPROVEN-NEEDS-LIVE` (hand-off to SS-13)

One probe settles the whole geometry cluster, at any viewport, in the gh-pages demo:

```js
[".seq-axis", ".seq-track", ".seq-playhead-track"]
  .map(s => { const r = document.querySelector(s).getBoundingClientRect();
              return [s, Math.round(r.left), Math.round(r.width)]; })
```

- three identical `left` values ⇒ **C-1 dies** (and `--track-inset` is a no-op token worth deleting);
- `axis.left = track.left − 12` ⇒ C-1 confirmed against the axis (expected);
- `playhead.left = track.left + 12` ⇒ C-1 confirmed against the playhead (blame flips, defect stands).

Also live-only: C-2's visual verdict (is a 17.6px hairline band legible as graph paper?), and C-6's 12.8px rest offset between traveller and gate.
