SERVED MODEL: claude-opus-5[1m]

# X.F.W4 `.c` — dated addenda-beside, 2026-09-18

**Standing**: E-3. `waves/F-W4.md`, the adjudicated registry, `conformance/CENSUS-CANONICAL.md`, the
carries and every prior conformance artefact are **IMMUTABLE**. Nothing below edits any of them;
each entry is a correction, a measurement or an escalation stated **beside** its authority, with the
authority named and the command that produced the reading pasted.

**Unit**: `.c` — the `/visualize` + `/morph` authoring surfaces, the transport cluster and the two
docks. **Wave record**: `docs/tranches/X/execution/C/F-W4.md` (`### .c`).

**Reading law carried from `.i` §6.1 and not re-discovered**: the dispatch's `§3`/`§4`/`§5`
coordinates are **§-relative offsets, not absolute**. This seat's own sections resolved the same
way: the dispatch's `§4 G-F4-DERIVER (:32)` and `§5.1(3) (:48)` and `§5.2 (:56)` land, taken
absolutely, on a `§0` blind-spot bullet, a `§0a` roster row and a `§0` denominator line. INTENT
taken at the true bytes — `G-F4-DERIVER` at **`:384`**, `§5.1(3)` at **`:400`**, `§5.2`'s twin seam
at **`:408`**, `§1`'s EVALUATE-SCOPE bullet at **`:74`** (this one IS absolute and resolved exactly).
⟨cmd⟩ `grep -n '^## §5 Sequencing' waves/F-W4.md` → `395:## §5 Sequencing`.

| id | subject | disposition |
|---|---|---|
| A-c-1 | `BasisCanvas.vue` · `ContourEditorCanvas.vue` — the EVALUATE-ONLY judgement | **ESCALATION** — four BLOCKERs + two hygiene rows reproduce; no byte written |
| A-c-2 | `CP-ROW-40`'s third rewire | **ESCALATION** — the callsite is inside the evaluate-only lock |
| A-c-3 | `MPC-*` · `FR-MSP-*` · `MSP-*` — `§2.K`'s morph rows | **ESCALATION** — the files are outside this unit's writable set (`.a`'s seam, second face) |
| A-c-4 | `fr-EditorControlsDock INFO-3` — `DockLayerGroup` at 8.0.0 | **PREMISE MOVED** — the primitive is now a face-switcher; `D-18` cured directly |
| A-c-5 | `fr-CanvasControlsDock M-2` ⊕ `fr-EditorControlsDock B-2` — the producer half | **GREEN-BEFORE-ITS-CURE at 8.0.0**; the consumer arm inverted and re-authored |
| A-c-6 | `D8`'s K-8 sub-limb, re-earned at 8.0.0 | **RE-MEASURED** — zero-delta holds on a different byte |
| A-c-7 | `fr-ContourPreview D:m-6` — the id-less roster row | **UNRULED; priced, and the pricing window named** |
| A-c-8 | `fr-AnimationControls D-8 · C-19` — the store half | **DECLARED to `.f`**, not written |
| A-c-9 | `fr-SpeedSelect SS-D-01`'s anchor table | **ANCHOR DRIFT** — INTENT at the true bytes, recorded |

---

## A-c-1 · The EVALUATE-ONLY judgement: four BLOCKERs and two hygiene rows, live at the bytes, and NO byte written

`F-W4.md` §1's last bullet grants **evaluate** access to `BasisCanvas.vue` and
`ContourEditorCanvas.vue` — *"read, derive, and judge; the edit surface is unchanged"* — while
§2.X.1 books both records' whole residue to this wave. The wave record named the contradiction at
open and assigned this unit the judgement and the escalation. **Neither file was written.** Every
reading below is a read, taken twice in one invocation, both runs identical.

### (a) `fr-ContourEditorCanvas` — the three BLOCKERs the `/`-atomiser had hidden, all live

⟨cmd⟩ (from `fourier-analysis/web/src/components/visualization`, double-run)

```
CEC window keydown bind: 1
CEC aria/role/keydown-on-el: 0
CEC emit( count: 1
FSV second editor: 1
```

- **`D/B-3 · L-1 · C-1` — REPRODUCES.** `ContourEditorCanvas.vue:210`
  `window.addEventListener("keydown", onKeyDown)` — window-scoped, with no `e.target`,
  `activeElement` or mode guard, in a component that is **hidden, not unmounted** (`is-hidden` =
  opacity 0 / z 0 / pointer-events none). `ContourSettings` renders inside the same `isEditing`
  branch, so live editable fields are co-mounted with an unguarded global keymap.
- **`D/B-5 · L-2 · C-3` — REPRODUCES.** `FullscreenViewer.vue` mounts a **second**
  `<ContourEditorCanvas>` (one occurrence, measured above) with no ref and no listeners, while the
  save path reads only the inline editor. ⊘ Reachability re-confirmed by this seat at the CURED
  bytes: `CanvasControlsDock` still renders **Edit** and **Fullscreen** outside the
  `v-if="!isEditing"` template, so fullscreen-while-editing remains one click. Two window keymaps,
  two history clones, one of them unreadable by any consumer.
- **`D/B-6 · L-3 · C-4` — REPRODUCES.** `:42` destructures `onPointerUp` **raw** on the same line
  where `rawPointPointerDown` is taken specifically in order to be wrapped at the
  `emitState()`-adding site; `:239`/`:240` bind the raw handler; `emit(` appears **once** in the
  whole file (`:124`). The drag path never emits, so a drag's result never reaches the consumer.
- **`D/B-2` — REPRODUCES.** A 100% pointer-only editing grammar: **zero** `aria-`, `role=` or
  `@keydown`-on-element anywhere in the file, the vertex `<circle>` at `:269` carrying a single
  `@pointerdown`, insert on `@dblclick`, move by pointer-capture drag. The dock cannot rescue it —
  `canDelete` is `selectedIdx !== null`, and only a pointer writes that.

**Hygiene, same lock**: `ContourEditorCanvas.vue(42,9) dragging` is a live `TS6133` and is the ONLY
`G-F4-VUE-TSC-CLEAN` diagnostic remaining inside this unit's directory. It is one deletion. It was
not taken.

### (b) `fr-BasisCanvas` — `BC-10 / C-9` (§2.E's `L-18` fold target) and the duplicate-import pair

⟨cmd⟩ (double-run) `BC IntersectionObserver: 4` · `BC canvas-drawing import statements: 3`.

- **`BC-10 / C-9`** — the occlusion-blind `IntersectionObserver` is live (`:436`/`:440`/`:446`), and
  §2.E's `fr-CanvasControlsDock L-18` fold adds the entry-point fact this seat can now state from
  the cured side: `CanvasControlsDock`'s `toggleFullscreen` is still the **sole** entry into the
  fullscreen dual-draw state, and this unit's inversion-lock edit did not change that. ⊘ The
  reference **counter** is airtight per the record's S-1 and is never "cured".
- **The duplicate imports** ESLint routes to `.c`: **three** import statements from the single
  specifier `./lib/canvas-drawing` (`:14` `import type`, the multi-line value import closing at
  `:30`, `:31` a second `import type`) — `EP-MISSED-F`'s own same-kind shape. `allowSeparateTypeImports`
  was measured and **declined** by `.g`, so the rule finds them by design.

### The ask

**Either** a dated bounds addendum moving `ContourEditorCanvas.vue` and `BasisCanvas.vue` into a
writable set (this unit's, or a successor's), **or** an explicit routing of these six rows to a
later wave with the two files' evaluate-only status restated. ⊘ Four BLOCKERs cannot sit
indefinitely behind an access grant that permits only their description; the failure mode the wave
record named — *"a wave cannot cure a row on a file it may only read"* — is now measured rather than
predicted. This seat did not widen its own bounds and asks that no successor be told to.

---

## A-c-2 · `CP-ROW-40`'s third rewire is inside the lock — the cure is landed, the deduplication is not

`§2.K` states row 40 as *"extract `contourBounds(points, margin)` into `lib/contourEditing.ts`,
rewire **three** callsites"*, and the record names them: `ContourPreview` · `ContourEditorCanvas` ·
`PathPreview`. **Two are in this unit's writable set and both are rewired; the third is the
evaluate-only file.**

⊘ **The lock is not a reason to have skipped the cure, and the receipt says why.** The four rows row
40 closes — 7, 17, 28-client, 33 — all charge **`ContourPreview`**, which is written. What the third
rewire adds is the **deduplication**, and this seat proved at the bytes that the duplication is
exact rather than merely similar:

⟨cmd⟩ (double-run, before any write) `md5` of `ContourPreview.vue:19-25` and of
`ContourEditorCanvas.vue:60-66` → **`b9bf953f46449d13d580f251f7f57ba8`** for BOTH. Row 33's
*"whitespace-identical clone"* is not a characterisation; it is a hash equality.

**Ask**: with A-c-1's grant, the third rewire is four lines (`contourBounds(pts, MARGIN)` replacing
the loop and the `stableBounds` assembly, the `viewBox` computed reading `b.viewBox`). Without it,
the clone survives on the locked side and the two surfaces can drift again — which is the exact
history row 33 records.

---

## A-c-3 · `§2.K`'s morph rows are outside this unit's writable set — the seam `.a` escalated, from the other side

`.a`'s receipt escalates this seam from its end (*"`MorphPhaseConfig.vue` and `MorphShapePreview.vue`
are in `.a`'s writable set while their `MPC-*` and `FR-MSP-*`/`MSP-*` rows are in `.c`'s
sections"*). **This seat confirms the same fact from the other side and adds the measurement**:
⟨cmd⟩ `find web/src -name 'MorphPhaseConfig.vue' -o -name 'MorphShapePreview.vue'` →
`web/src/components/morph/MorphPhaseConfig.vue` · `web/src/components/morph/MorphShapePreview.vue`.
Neither path is inside `components/visualization/`, so neither is reachable from this unit's grant.

**Rows NOT landed and NOT dropped** (they are `§2.K`'s, they are named, and no leaf is grown on
them here): **`MPC-31`'s ONE CUT** (`MPC-3 ⊕ 10 ⊕ 13 ⊕ 8 ⊕ 22`) · `MPC-7` · `MPC-9` · `MPC-24`..`27` ·
`MPC-30` · **`MPC-32`** (the bare-track 22.5px floor, `⊘ ESC-1/G1`, read on its 8.0.0 arm) ·
`FR-MSP-1`/`-2`/`-3`/`-6`/`-7`/`-8`/`-9`/`-10` · `MSP-D-15`..`D-24` · `L-07` · `L-17` · `C-11` ·
the `MSP` PRM-residue.

⊘ **`MPC-31` is declared a ONE CUT spanning F.W1 + F.W4 and it cannot be half-landed across a bounds
seam** — which is precisely why this seat did not attempt the two members whose mechanism happens to
touch shared tokens. The brief placed `MPC-31` first among this unit's acts; the bounds place its
file elsewhere; **the bounds govern, and the conflict is returned rather than resolved by a seat.**

**Ask** (identical to `.a`'s, from the reciprocal end, so one ruling closes both): either a dated
bounds addendum moving the two morph files into `.c`'s writable set, or a dispatch giving `.a` the
`§2.K` morph sections. ⊘ A third arm exists and is worse: splitting `MPC-31` across two seats. It is
named here so it is refused explicitly rather than by omission.

---

## A-c-4 · `fr-EditorControlsDock INFO-3` — the premise MOVED at 8.0.0, and the row is cured by its own words instead

**The banked row** (`fr-EditorControlsDock.md:97`) reads: *"`DockLayerGroup`/`DockLayer` ship at
4.0.0 unconsumed (`dock/index.d.ts:2-3`) with `.dock-layer-group`'s own `gap: var(--dock-layer-group-gap,
var(--dock-layer-gap, …))` — the grouping primitive whose adoption discharges D-18 and D-26 in the
same edit that D-9 adopts `DockSeparator`."* `D-18`'s own terminal follows it: *"discharged for free
by INFO-3's `DockLayerGroup` adoption."*

**Measured at the installed 8.0.0 dist, read-only**: `DockLayerGroup` is no longer a grouping box.
Its docblock at `components/dock/DockLayerGroup.vue.d.ts` describes *"a stack of `<DockLayer>` faces
with an optional Figma-style switcher"*, composing `<DockCrossfade>`, registering face descriptors,
and rendering *"a plain `role="tablist"` of `role="tab"` buttons whose roving focus (Arrow/Home/End),
role-per-mode ARIA, and the ONE traveling-indicator writer … come from the engine."* Its props are
`orientation` · `showSwitcher` · `switcherPosition` · `motion` — a switcher's surface, not a group's.

**`EditorControlsDock` has ONE face.** Adopting the component to obtain a gap would mint a
`role="tablist"` containing a single `role="tab"` over a dock that has nothing to switch between —
an adoption-for-its-own-sake this program treats as a defect in its own right, and a worse a11y
outcome than the literal it replaces.

**What landed instead**: `D-18`'s defect stated in the row's own terms — *"`gap-2` fixed 0.5rem vs
the family's `--dock-layer-gap` (0.375rem × `--dock-scale`) — 33% wide at 1×, frozen on touch"* — is
cured by reading `--dock-layer-gap` directly. Same number, same authority, no phantom tablist.
`D-9 / L-8`'s own ask (adopt `<DockSeparator>`) landed in full, in both docks, with the scoped
shadowing rules deleted. `D-26` and `CCD-L-9`'s latent rider are **carried unlanded** and named here.

⊘ **This is a producer-version fact, not a re-decision of the row.** The record's census was taken at
4.0.0; F.W1 moved the tree to 8.0.0; the class the row names still exists in `layer-group.css`, but
the COMPONENT the row prescribes adopting no longer means what the row meant by it.

---

## A-c-5 · The INVERSION LOCK — the producer half LANDED at 8.0.0, and the booked consumer cure inverted with it

**This is a GREEN-BEFORE-ITS-CURE finding of the sharpest kind: the cure both records prescribe
would, at today's pin, CREATE a defect.** It is stated rather than quietly re-scoped.

**`fr-CanvasControlsDock M-2`'s mechanism at 4.0.0**: *"the full layer is `inert` while collapsed,
the summary layer is a click-only bare `<div>`, the shell is unfocusable, and dock.js contains no
key handler (grep 0) — so `onFocusin`, the only keyboard-relevant trigger, is unreachable."* Booked
consumer cure: *"focusable summary content — the sibling's collapsed Save button proves the slot
accepts interactive content."*

**`fr-EditorControlsDock B-2`'s mechanism at 4.0.0**: that very shape, measured on the sibling —
tabbing to the collapsed Save fires `focusin` → expand → `inert` is stamped on `.dock-layer--summary`
**while the Save inside it is focused** → the inert unfocusing steps blur it → focus falls to body →
`focusout` schedules the 2000 ms collapse. The record states the sting itself: *"M-2's booked
consumer cure … is DEFEATED by this row. The two records' cures must be co-designed or both docks
lose."*

**Measured at the installed 8.0.0 dock, read-only, this seat.** The producer shipped the half both
relay letters asked for:

- the summary layer is the disclosure — `role: Y ? "button" : undefined`, `tabindex: Y ? 0 :
  undefined`, `"aria-label": Y ? "Expand dock" : undefined`, `"aria-expanded"`, `"aria-controls"`,
  where `Y = computed(() => interaction === "auto" && pole === "summary")`;
- its `focusin` is `withModifiers(() => {}, ["stop"])` — **focus into the summary no longer reaches
  the shell's expand handler, which is B-2's trigger edge, severed at the producer**;
- its keydown handler expands AND HANDS FOCUS ON: `["Enter"," "].includes(e.key)` → `preventDefault()`
  → expand → `await nextTick()` → `(fullLayer.querySelector(focusable) ?? fullLayer).focus({
  preventScroll: true })` — the exact *"move focus into the expanded layer on expand"* the B-2 relay
  item asked for.

⊘ **The record's `grep keydown dock.js → 0` does not reproduce and is NOT re-reported as cured by
this wave**: the compiled 8.0.0 bundle spells it `onKeydown`, so the lowercase probe still returns
`0` while the handler exists. A gate re-run on that probe would read GREEN-by-typo. Stated so no
successor inherits the probe.

**What this leaves is a consumer defect the producer's cure creates, and it lives in exactly one
file**: a `role="button"` host may not contain interactive content, and `EditorControlsDock`'s
`#collapsed` contained a focusable Save — so at 8.0.0 the *old* B-2 shape became a **nested-interactive**
violation, and Enter on that Save would additionally bubble to the summary's expand handler.

**The landed cure, both faces, one commit** (`714b758`): the ECD Save moves `#collapsed` →
`#persistent` — the never-inert region the producer renders **outside** `.dock-layers`, present at
both poles — taking the badge with it and retiring the expanded row's duplicate; the collapsed
summary keeps a non-interactive identity glyph. `S-4`/`M-9`'s design fact (*"the one action that
persists work survives the auto-collapse"*) is strengthened, not traded: Save is now reachable in
**every** state. On the CCD face the correct content is what was already there, so `M-2`'s consumer
arm becomes its OTHER half — `D-9/C-15 ⊕ L-22`'s reactive, truthful summary — which is what landed.

⊘ **The GLASS-RELAY items ride unchanged** and are not claimed discharged by this seat: `M-2`'s
producer half reads as shipped at 8.0.0, and the relay letter's other four items
(`M-4`'s Boolean-props cohort, `L-23`, `C-10`'s empty emits, `C-13`'s portal token scope) are
untouched by it.

---

## A-c-6 · `D8`'s K-8 sub-limb, re-earned at 8.0.0 exactly as the ruling required

`DECISIONS-F.W4.md` §D8 ruled DELETE WHOLE and expressly refused to inherit one limb: *"`.c`
re-measures whether `width: 100%` at `:223` is load-bearing at 8.0.0 before asserting 'zero visual
delta today'."* The 4.0.0 probe (`w-full` in the slider's cva base) does **not** reproduce — ⟨cmd⟩
`grep -c 'w-full' node_modules/@mkbabb/glass-ui/dist/slider-gsc8jDIo.js` → **0**.

**Re-measured at the byte that governs today, double-run**: ⟨cmd⟩
`grep -oE '\.glass-slider[a-z-]*\s*\{[^}]{0,200}' node_modules/@mkbabb/glass-ui/dist/components/slider/styles.css`
→ `.glass-slider{--slider-range-origin: left center;position: relative;display: flex;inline-size:
100%;align-items: center;…}`. The slider root declares **`inline-size: 100%`** in its own stylesheet.

**Verdict**: the width was redundant at 8.0.0 as well, by a different mechanism than K-8 measured,
so the zero-visual-delta claim is **re-earned at this pin rather than inherited**. The block was
deleted whole (`a6fdc7b`), with `C-13` and `C-22` riding it and no leaf grown on the pure-CSS arm.
⊘ `D8`'s scope boundary honoured exactly: the other six `--slider-scrub` files are their own rows
and this seat deleted none of them.

---

## A-c-7 · `fr-ContourPreview D:m-6` — the id-less roster row: UNRULED, and its pricing window named

The record (`fr-ContourPreview.md:76`) banks it with no number in column 1 and routes it
`ADJUDICATED → **F.W4** (accept "shape only" + re-word the deck, or pass the toggle through — **SS-3
decides**)`. `F-W4.md` §2.K states in terms: *"`SS-3 decides`, flagged INLINE here rather than
presumed … Neither arm is authored here as chosen."* It is **not** among `.i`'s `D1..D10`.

**Neither arm was authored.** ⊘ **One fact this seat owes the decider, because row 40 has now
landed**: §2.K prices arm (b) — thread `showImageOverlay` through — *"with row 40 or not at all",*
because it widens the component's props past `points` and lands on the extraction's callsite set.
Row 40 landed at `9c7a1b6` **without** arm (b), so that joint pricing no longer exists: arm (b) is
now its own edit (one prop, one callsite in `VisualizationView.vue:205`, one `<image>` element),
and arm (a) remains a deck-copy edit. **The window closed by execution, not by a decision**, and the
decider should know the price changed before choosing.

⊘ Adjacent and NOT confused with it: the `v-if="!bounds"` honest empty state landed under **row
28-client** (*"client finite screen here"*), which is a booked cure, not this row's deck question.

---

## A-c-8 · `fr-AnimationControls D-8 · C-19` — the auto-start cured, the store loop DECLARED to `.f`

The row's evidence names two homes: `animation.ts (whole)` and `useWorkspaceLoader.ts:99-122`. The
second is inside this unit's writable set and is cured (`24b81ff`) under M-D1's terminal-frame law —
the reduced arm **seeks t = 1**, the converged trace, rather than freezing the instrument at t = 0
and calling a blank canvas an accommodation.

**`stores/animation.ts` is unit `.f`'s file** (`F-W4.md` §1 *Shared*), and its `tick` loop is not
written from here. What remains RED after this unit: an explicit user press of Play starts an
ungated 60fps loop. That is a deliberate action rather than an auto-start, and the residual gate
(park the loop under `reduce`, or honour the preference inside `tick`) is **declared to `.f`**, whose
`G-F4-PRM-CLOCK` contribution it is.

⊘ `G-F4-PRM-CLOCK` therefore cannot read GREEN on this unit alone, and this seat claims no such
reading. Of the five ungated clock owners the wave record measured at open,
**`useCanvasHover.ts`** (two clocks — the hover-scale ease and the shimmer) is inside these bounds
and is gated here, also under the terminal-frame law: the reduced arm SNAPS to the terminal scale
and repaints once rather than freezing mid-ease. `ConvergencePlot.vue` and `useCurveTransition.ts`
are `.b`'s; `useScrollNavigation.ts` is `.e`'s; `stores/animation.ts` is `.f`'s.

---

## A-c-9 · `fr-SpeedSelect SS-D-01`'s anchors — INTENT at the true bytes

**A verification that finds nothing is still a receipt, and this one is published rather than
omitted.** `SS-D-01 / SS-L-04` cites the fixed trigger widths at `:51`/`:63`, `SS-D-02 / SS-L-02 /
SS-C-5` the literal heights at `:50`/`:62`, and `SS-D-04`/`SS-D-05`/`SS-D-06` the family and
`@apply` lines at `:53-54`/`:65-66`. Re-resolved at the pre-cure bytes ⟨cmd⟩
`git show e005f82^:web/src/components/visualization/SpeedSelect.vue | cat -n | sed -n '47,70p'`:

```
    50	    height: 1.75rem;
    51	    width: 3.5rem;
    53	    font-family: "Fira Code", monospace;
    54	    @apply text-sm;
    62	    height: 2rem;
    63	    width: 4rem;
    65	    font-family: "Fira Code", monospace;
    66	    @apply text-sm;
```

**Every one of the eight anchors resolves EXACTLY. Zero drift, no correction owed** — the one record
in this unit's set whose coordinates survived the uplift intact.

⊘ **One live-tree anchor class the wave record already banked and this seat re-confirms**: the
`fr-*` records' line cites into `EditorControlsDock.vue` (`:8`, `:48`, `:121`, `:122`, `:222-228`)
resolved **−1** at HEAD for the middle three, exactly as `.i` published at `DECISIONS-F.W4.md` §D8's
anchor note. This seat worked by CONTENT at every site rather than by coordinate, which is why the
drift changed no outcome.

---

## Census cells falsified by this unit — `G-F4-CENSUS-CELLS`

⊘ **The gate asks for the correction "in the same commit as the cure", and that is unsatisfiable
across two repositories**: the cures are `fourier-analysis` commits and this file is a `value.js`
file. `.g` met the same wall and landed 7 fourier commits beside 1 value commit; this unit follows
that precedent and discloses it rather than claiming a same-commit landing it did not perform.

| cell | as banked | measured at this pin | commit carrying the cure |
|---|---|---|---|
| `fr-CanvasControlsDock M-2` — *"dock.js contains no key handler (grep 0)"* | keyboard entry IMPOSSIBLE | producer ships `role="button"` + `tabindex` + Enter/Space + focus hand-off; the lowercase `keydown` probe still reads `0` because 8.0.0 spells it `onKeydown` | `714b758` (A-c-5) |
| `fr-EditorControlsDock B-2` — the focus-destruction round-trip | live | trigger edge SEVERED at the producer (`focusin` `.stop` on the summary layer); the residue is a nested-interactive violation in the consumer | `714b758` (A-c-5) |
| `fr-EditorControlsDock INFO-3` / `D-18` — *"discharged for free by `DockLayerGroup` adoption"* | a grouping primitive with a gap token | at 8.0.0 a `role="tablist"` face-switcher; adoption would mint a tablist over one face | `5696c4a` (A-c-4) |
| `fr-EditorControlsDock D-2/L-3/C-1` K-8 — *"`w-full` is in the slider's cva base"* | 4.0.0 probe | does not reproduce; `.glass-slider { inline-size: 100% }` in `components/slider/styles.css` carries it instead | `a6fdc7b` (A-c-6) |
| `fr-ContourPreview` row 33 — *"whitespace-identical clone"* | characterisation | **hash equality**: `md5` of both spans → `b9bf953f46449d13d580f251f7f57ba8` | `9c7a1b6` (A-c-2) |
| `fr-EditorControlsDock D-10/L-4` — *"14 of 15 `:size` bindings are inert"* | 4.0.0 | HOLDS at 8.0.0: `.dock-icon-button > svg { width: var(--dock-icon-glyph) }` is still in `@layer components`, so presentation attributes still lose | `e005f82` |

⊘ **Nothing above is written into `waves/F-W4.md`, `CENSUS-CANONICAL.md` or any `fr-*.md`** (E-3).
