SERVED MODEL: claude-opus-5[1m]

# X.F.W4 `.f` — dated addenda-beside, 2026-09-18

**Unit**: `.f` — shared lib/stores, the SCRUB ledger, the global-sheet residue, and the convergence study.
**Spec of record**: `docs/tranches/X/fourier/waves/F-W4.md` (IMMUTABLE — E-3; every correction below is beside it, never in it).
**Wave record**: `docs/tranches/X/execution/C/F-W4.md`.

⊘ **E-3.** `F-W4.md`, `CENSUS-CANONICAL.md`, the carries, the adjudicated registry and the frozen
audit artefacts are IMMUTABLE. Everything here is a dated correction **beside** them. Nothing in this
file edits a byte of any of those.

---

## A-f-1 · `G-F4-CENSUS-CELLS` — the clock census is not LOW BY ONE, it is LOW BY FOUR

**The cells.** `F-W4.md` §4 `G-F4-CENSUS-CELLS` names, among its RED set,
`<vjs>/docs/tranches/V/megatranche/formation/fourier/lane-frontend.md:558-559` and `:624`, under the
gloss *"(LOW BY ONE clock; repo total 4, FR-CP §5.1)"*. This unit owns that cell, and it is false in
the direction the gloss did not anticipate.

**What the cells say, quoted at the bytes** (read-only, frozen formation record, line coordinates
admissible under R2-2's carve-out):

⟨cmd⟩ `sed -n '558,559p' lane-frontend.md` →

> `### Path B — convergence plot (own rAF, independent)`
> `` `components/equation/ConvergencePlot.vue:93` `getContext("2d")`; own loop at `:67-69` ``
> `` `requestAnimationFrame(tick)`; redraw watchers at `:308` and `:319`. **Not** gated by ``
> `` `stores/animation.ts` — a second, ungated clock. ``

⟨cmd⟩ `sed -n '624p' lane-frontend.md` →

> `**⚠️ COVERAGE GAP (flag):** the two ungated animation clocks are `stores/animation.ts` (the`
> `epicycle rAF — … → *no match*) and `equation/ConvergencePlot.vue`'s own rAF (`:67-69`; the`
> `file's `reduce` block at `:405` is CSS-only and does not stop `tick`). The autoplay epicycle`
> `animation runs at full rate under `prefers-reduced-motion: reduce`. …`

**The measurement, taken at the live tree and double-run.** The instrument counts files containing a
`requestAnimationFrame(` **call** — not the identifier, for the reason recorded at A-f-2:

⟨cmd⟩ (from `fourier-analysis/web`, twice in one invocation)
`for f in $(grep -rl "requestAnimationFrame(" src/ | sort); do …; done` →

```
run 1: rAF CALL owners=8 consulting PRM=8
run 2: rAF CALL owners=8 consulting PRM=8
```

The eight, by path:

| # | rAF call owner | PRM gate |
|---|---|---|
| 1 | `components/decorative/SvgFilters.vue` | pre-existing |
| 2 | `components/equation/ConvergencePlot.vue` | `.b` (`1e40f02`) |
| 3 | `components/equation/composables/useCurveTransition.ts` | `.b` (`1e40f02`) |
| 4 | `components/paper/PaperView.vue` | pre-existing |
| 5 | `components/paper/useScrollNavigation.ts` | `.e` (`1a971c0` / `d0a87da`) |
| 6 | `components/visualization/composables/useCanvasHover.ts` | `.c` (`24b81ff`) |
| 7 | `router/index.ts` | pre-existing |
| 8 | `stores/animation.ts` | **this unit** |

**The correction, stated as arithmetic.** The gate's gloss carries `FR-CP §5.1`'s own correction of
the cell — *"LOW BY ONE clock; repo total 4"* — so the figure this wave inherited, already once
corrected upward, is **4**. Measured at the tree this wave executes on, it is **8**. The corrected
figure is therefore itself **low by four**, and the cell is low by five against the census's
uncorrected three.

⊘ The direction matters more than the magnitude: every figure downstream of this cell was computed
against a denominator HALF the real one, which is why `G-F4-PRM-CLOCK` could be opened against a
five-owner roster (the wave record's own baseline, gate 9) and closed against an eight-owner one.

⊘ **Not a reader error, and the distinction is the lesson.** `:624`'s sentence is true *as scoped*:
it names the two ungated ANIMATION clocks, and it is right about both. The other six are a
scroll-restoration clock, two view-transition clocks, a filter-boil clock, a hover-ease clock and a
curve-transition clock — none of them an animation clock in that sentence's sense. **The defect is
not the count; it is that a scoped count was carried downstream as a repo total.** A cell that says
"the two ungated animation clocks" and a cell that says "repo total 4" are answering different
questions, and the gate inherited the second as though it answered the first.

⊘ **Cross-repo disclosure, same shape as `.a`'s.** `G-F4-CENSUS-CELLS` requires the correction to
land *"in the same commit as the cure"*. The cure is a fourier byte and the correction is a value.js
byte, so one commit cannot hold both. They are ONE act landed adjacently, and each names the other:
this entry names fourier **`2ef87d1`**, and that commit's message names this file and this section by id.

---

## A-f-1b · The reduced arm, verified live rather than argued

The code-level fact is that `startLoop()` returns before reaching any `requestAnimationFrame` when
the preference is set. That is structural, but the gate asks for a RENDERED arm, so it was measured
in a browser — one bounded Playwright probe, two contexts, both arms, double-run (§5.2 probe
parsimony: no suite run, no screenshots, one page, 1.2 s per arm).

The instrument wraps `window.requestAnimationFrame` in the page and counts callbacks scheduled over
1.2 s on `/visualize`:

```
reducedMotion=reduce          matchMedia=true   rAF callbacks in 1.2s = 0    pageerrors=0
reducedMotion=no-preference   matchMedia=false  rAF callbacks in 1.2s = 15   pageerrors=0
```

Identical on both runs. **Zero scheduled frames in the reduced arm against fifteen in the
no-preference arm, and zero page errors in either** — the clock is parked, not merely gated on
paper, and parking it throws nothing.

⊘ What this probe does NOT establish is the PIXEL: that the parked frame shows the converged trace
rather than an empty canvas is guaranteed by `parkAtTerminalFrame`'s `t = TERMINAL_T` and by `.c`'s
matching loader cure, and a composited readback of a populated workspace in the reduced arm is
**SS-13**, flagged and not resolved inline.

---

## A-f-2 · A census instrument that counted its own documentation

Recorded because it happened to THIS seat, mid-measurement, and the next census will meet it again.

The first PRM census ran `grep -rln "requestAnimationFrame"` and read **8** owners. After this unit
wrote a comment in `lib/scheduler.ts` containing the words *"owns no `requestAnimationFrame` of its
own"*, the same instrument read **9** — the file had acquired no clock, only a sentence about one.
⊘ A census keyed on a bare identifier counts prose. The instrument of record for a clock census is
the **call shape** `requestAnimationFrame(`, and the figures in A-f-1 are taken with it. The earlier
8 and the later 8 agree only by coincidence of the same edit adding one prose mention while the
identifier count was already 8.

---

## A-f-3 · `SS-L-07 / SS-C-10` — the catalog's home, and why it is not `lib/speeds.ts`

The row prescribes *"no `lib/speeds.ts`, no `SpeedName`"* as the ABSENCE it charges, and names
`lib/easings.ts` → `EASING_OPTIONS` + `AnimationEasingName` as the idiom one file away.

`lib/speeds.ts` is **not** in this unit's writable set (the set enumerates
`lib/{api,api-problem,colors,easings,scheduler,defaults,types,bases,draftStorage,evaluators}.ts`),
so minting that path would be a write outside bounds. The catalog is therefore authored in
**`lib/defaults.ts`**, which already owns `ANIMATION_DEFAULTS` and `defaultAnimationSettings()` — the
shape the catalog constrains — so the value domain and its default now sit in one file rather than
two, and `DEFAULT_EASING` is spelled once where both the defaults and the coercion read it.

⊘ **The row's substance is landed, not its filename.** What it asks for is *"a literal-union catalog
[that] makes the banked L-11+M-10 empty-trigger state unrepresentable at the type level"*:
`ANIMATION_SPEEDS` / `AnimationSpeed` / `isAnimationSpeed` / `coerceAnimationSpeed` are that catalog.
⊘ **The wire half is cited, never authored**: `SS-C-1`'s persisted-atom row and the
`AnimationSettings.speed` contract are F.W5-W8's.

---

## A-f-4 · The store's `speed` surface — the runtime guarantee landed, the type narrowing declared

`coerceAnimationSpeed` runs in the animation store's own setter, so **no writer can put an
off-catalog value into `anim.speed`**, whatever its own types say. That is the runtime half and it is
whole.

The stronger form — typing the store's public `speed` as `AnimationSpeed` — was authored, measured
and **withdrawn**, disclosed rather than dropped. Pinia collapses a `WritableComputedRef<T, S>` to
its getter type at the store surface, so the narrow type propagates to the assignment sites, and
⟨cmd⟩ `npx vue-tsc -b --force` named exactly three, in two files outside this unit's bounds:

```
src/components/visualization/AnimationControls.vue(125,81): error TS2322: Type 'number' is not assignable to type '2 | 1 | 4 | 0.25 | 0.5'.
src/components/visualization/AnimationControls.vue(146,85): error TS2322: Type 'number' is not assignable to type '2 | 1 | 4 | 0.25 | 0.5'.
src/components/visualization/composables/useWorkspaceLoader.ts(76,28): error TS2322: Type 'number' is not assignable to type '2 | 1 | 4 | 0.25 | 0.5'.
```

All three are the same one-line shape (`anim.speed = $event` ×2 at a `SpeedSelect` binding, and
`if (as?.speed) anim.speed = as.speed` at the loader). **Declared to `.z`** as a three-line follow-up
that turns the runtime guarantee into a compile-time one; a seat does not widen its own bounds to
take it.

---

## A-f-5 · `SP-12`'s `resetMs` sweep — the deviant is measured, and it is outside this unit

The lock states the filed polarity is INVERTED and that **`UserSlugBar` is the deviant, not
`EquationResult`**. Measured at the live tree, ⟨cmd⟩ `grep -rn "resetMs" src/`:

```
src/composables/useMorphConfig.ts:99:    const { status, copy } = useClipboard({ resetMs: 2000 });
src/components/visualization/gallery/UserSlugBar.vue:25:const { status, copy } = useClipboard({ resetMs: 1500 });
src/components/equation/EquationResult.vue:26:const { status, copy } = useClipboard({ resetMs: 2000 });
```

**Three sites, two values.** 2000 is the producer-sanctioned figure and holds at two of the three;
`UserSlugBar.vue:25`'s **1500** is the sole deviation — the lock reproduces exactly. The
normalize-UP edit is `1500 → 2000` at one line.

⊘ `components/visualization/gallery/UserSlugBar.vue` is unit `.d`'s file under the wave's
disjointness law and is **not** in this unit's writable set. **No byte written.** The sweep's whole
finding is this measurement: one deviant, one line, named. **Declared to `.z`.**

---

## A-f-6 · `FR-GFC-1 = FR-GSB-1` — REFUSED at this end, and why refusing is the cure

`.d` escalated this row with *"the store half is two lines once `.f` widens it"* — the ask being the
`api.listVisualizations` signature, which is this unit's file.

**Measured at the server, which is the fact that decides it.** ⟨cmd⟩
`grep -n "async def list_visualizations" -A 6 api/routers/visualizations.py` →

```
async def list_visualizations(
    request: Request,
    limit: int = Query(default=20, ge=1, le=100),
    sort: str = Query(default="newest"),
    cursor: str = Query(default=""),
    owner: str = Query(default=""),
) -> Response:
```

The endpoint accepts **four** query parameters and none of them is a search term, a tier or a basis.
Widening the client signature to carry `q`/`tier`/`basis` would put them on the wire, the server
would ignore them, and the three inert controls would go on returning unfiltered pages — while the
client's own types now CLAIMED the filter existed. That is a filter that filters nothing, dressed as
a cure: the masking-fallback class this wave's law forbids by name.

**Verdict: NOT LANDED, refused with cause.** The row is a CONTRACT row and its home is F.W5-W8, as
`.d` also said. ⊘ The refusal is the seat's act and is recorded so no later reader takes the
un-widened signature for an oversight.

---

## A-f-7 · `VV-R2-B` — the ten dead exports are RETAINED, decided WITH `.d`'s `GCM-1`

The lock: *"`VV-R2-B`'s ten dead workspace exports are adoption-or-deletion decided WITH the `GCM-1`
repair unit, never deleted unilaterally."*

**This unit's census, at the live tree, each name grepped across `src` with the defining store and
`lib/defaults.ts` excluded** (the full transcript is in `F-W4-SCRUB-LEDGER.md` §3):

| export | store-member consumers outside `stores/workspace.ts` |
|---|---|
| `visualizationSlug` | **0** (11 textual hits: route-param spellings in `router/index.ts`, a `draftStorage` parameter name, and comments) |
| `visualizationETag` | **0** |
| `revision` | **0** |
| `loadVisualization` | **0** |
| `loadSnapshot` | **0** |
| `setVisibility` | **0** |
| `deleteVisualization` | **0** (3 textual hits: `api.deleteVisualization`'s own definition and `stores/gallery.ts:256`'s RAW api call, which is the row's own evidence) |
| `invalidateInFlightComputation` | **0** |
| `defaultContourSettings` | **0** |
| `defaultAnimationSettings` | **0** |

**10 of 10 reproduce.** The joint decision, with `.d`'s receipt as the other half:

> `.d`: *"**GCM-1 / GCM-25 / VV-BLK-1 — NOT LANDED.** GCM-3's half is landed in `GalleryView.vue`;
> the loader half is `VisualizationView.vue` + `stores/workspace.ts`, outside the set."*

The `GCM-1` wiring unit — route → `loadVisualization`, publish → `setVisibility`, delete → the store
action — is **un-landed**, and four of these ten exports are precisely the surface it adopts. The row
itself rules the shape: *"a single wiring unit at this component, not scattered repairs."* Deleting
them now would delete the wiring unit's landing site and force F.W5-W8 to re-author what is already
written and correct.

**Verdict: RETAINED FOR ADOPTION, not dead-by-disuse.** Nothing deleted. Routed to F.W5-W8 with
`GCM-1`, exactly as the lock requires, and recorded in the SCRUB ledger as a zero-consumer
measurement with a RETAIN disposition so the next census does not re-derive it as new.

---

## A-f-8 · `SvgFilters`' four `url(#id)` definitions — `.a`'s Residual 4, and what this unit can say about it

`.a` carried to `.f`: *"`SvgFilters.vue` defines `#title-boil` `:69`, `#wobble-celestial` `:96`,
`#paper-grain` `:122`, `#canvas-grain` `:150`, and nothing under `src` references any of them … ⊘ an
`url(#id)` edge is the edge no import graph represents."*

`components/decorative/SvgFilters.vue` is **not** in this unit's writable set — no byte written. What
this unit adds is the exclusion `.a` asked for, run at the bytes:

All three exclusion arms are discharged in `F-W4-SCRUB-LEDGER.md` §6, with the precise probe
`url(#<id>)`: **0** in `src`, **0** across glass-ui / latex-paper / pencil-boil `dist`, **0** in the
emitted `dist/` after a build.

⊘ **And the exclusion caught exactly the false positive `.a` warned about.** A SUBSTRING probe —
`grep -rl "paper-grain"` over glass-ui's `dist` — returns **three** files (`paper.css`,
`tokens/glass-fx.css`, `tokens/dark-arm.css`) and every hit is a CUSTOM PROPERTY NAME
(`--paper-grain-tooth`, `--paper-grain-tile`, `--paper-grain-relief`), not a filter reference. A
seat that ran the loose probe would have recorded a producer consumer that does not exist and left a
true dead surface standing on a false proof. The instrument of record for an `url(#id)` edge is
`url(#id)`. ⊘ The DELETION remains `.a`'s or a later wave's — the
file is outside this unit's bounds, and a zero-consumer proof is not a licence to write in a
sibling's file.

---

## A-f-9 · `style.css` residue — what `.a`–`.e` declared, and which items were already discharged

The disjointness law gives this unit the sheet's SECOND and final ownership window, for *"the
collected cross-route residue: PAW-55's `.katex-display` computed-`auto`, the `.sidebar-link`
font-weight transition, FR-EQR-22's unearned `!important` neighbourhood"*, plus anything `.a`–`.e`
declared. Measured before writing:

| declared item | measured at the bytes | disposition |
|---|---|---|
| `PAW-55` — `.katex-display{overflow-x:auto;overflow-y:visible}` | LIVE at `style.css:155-160`; per CSS Overflow 3 §3 the authored `visible` computes to `auto` | **CURED** (`overflow-y: clip` + `overflow-clip-margin`) |
| `.e`'s three light-arm section-ramp stops (`PV ★MF-10`) | the tokens are **producer** tokens (`glass-ui/dist/styles/tokens/{color-radius,dark-arm,light-dark}.css`), not app-authored; the app already forks `--section-color-5` locally at `:212`/`:217` | **CURED** in the app's own established override shape |
| `.sidebar-link` font-weight transition | NOT in `style.css` — the only `.sidebar-link` rule here is `.a`'s `:focus-visible` ring. The rule lives in `PaperSidebar.vue:383-391`, unit `.e`'s file, and `.e` already **deleted** `font-weight` from the transitioned set under `PV ★MF-6` (*"a reflow per frame plus synthesized-weight snapping … Deleted, not re-tuned"*) | **DISCHARGED-BY-PREDECESSOR** (`.e`); no byte written, and no leaf grown |
| `FR-EQR-22`'s unearned `!important` | NOT in `style.css`. ⟨cmd⟩ `grep -rn "!important" src/` → 5 live sites, all in `.b`'s `/equation` SFCs, and `EquationResult.vue:123` already carries `.b`'s landed cure comment | **DISCHARGED-BY-PREDECESSOR** (`.b`); no byte written |
| `fr-CP D-1`'s `golden` limb (`.b`, addendum §3) | `VIZ_TOKENS` = `fourier · chebyshev · legendre · amber`; `golden` absent, frozen at `#f0b632` | **CURED** — `--viz-golden` minted in this sheet, `["golden","--viz-golden"]` added to the resolver |

---

## A-f-10 · Rows DECLARED to a sibling or to `.z` — cure in hand, file out of bounds

Each is stated with its measurement so the receiving seat lands it rather than re-deriving it.

1. **`adminError.ts` re-points at the seam.** `components/visualization/gallery/adminError.ts`
   (unit `.d`) defines its own `problemMessage`, and its own header says *"the SHARED seam version of
   this helper belongs in `lib/api-problem.ts`, which is unit `.f`'s file … declared so `.f`'s SP-12
   sweep can cite it rather than re-derive it."* The seam version is now landed and is
   byte-equivalent in behaviour. The follow-up is **one import line**: replace the local definition
   with `export { problemMessage } from "@/lib/api-problem";`. Not written — `.d`'s file.
2. **The `!` at the two surviving `getAdminToken()!` sites** (`AdminFlaggedPanel.vue`,
   `AdminUserList.vue`, unit `.d`). The seam now accepts `AdminToken = string | null`, so those
   assertions are INERT rather than load-bearing; deleting them is hygiene, not a cure.
3. **`stores/gallery.ts`'s silent `if (!token) return`** (`GM-23`'s third posture, unit `.d`). With
   the seam answering, the posture can simply call through and let the one `ApiProblem` be reported.
4. **`lib/equation/api.ts` passes `retryOn429: false`** for both equation ops — the line `.b`'s
   addendum names as *"the moment (i) exists"*. (i) now exists on `ApiFetchOptions`.
5. **The three `anim.speed` assignment sites** (A-f-4).
6. **`UserSlugBar.vue:25`'s `resetMs: 1500 → 2000`** (A-f-5).
7. **`web/package.json`'s two dead dependencies** — `class-variance-authority` and `clsx`, zero
   references anywhere in `src`, `e2e`, `vite.config.ts` or `index.html`, and neither a glass-ui peer
   dependency. `package.json` is unit `.g`'s file under §1 (*"gates only"*), so the proofs are banked
   in `F-W4-SCRUB-LEDGER.md` §4 and the deletion is declared, not taken.
8. **`web/components.json`** points `aliases.utils` at `@/lib/utils`, which does not exist, in a tree
   with no shadcn-vue component under `src`. Also outside this unit's set.

---

## A-f-11 · Negative roster — held

⊘ `I-2`'s empty state survives (nothing in this unit touches `/equation`'s empty arm) · ⊘
`CanvasOverlayButton` is **not** re-created · ⊘ the **Tooltip shim is NOT deleted** and was never a
candidate: ⟨cmd⟩ `grep -rn "Tooltip" src/ | grep import` → **10 import sites across 10 files** · ⊘ `GM-19` not certified · ⊘
the CP KILL-6 migration not executed · ⊘ `moon.json` not regenerated · ⊘ no glass-ui byte touched
(READ-ONLY always; the two producer-shaped facts here ride A-f-8's exclusion and `.z`'s relay) · ⊘ no
`test.skip`, allowlist, `fixme`, try/catch-around-a-defect, copied producer selector or
`node_modules` patch anywhere in this unit · ⊘ no producer pin moved · ⊘ `scripts/dev/dev.sh`
untouched.
