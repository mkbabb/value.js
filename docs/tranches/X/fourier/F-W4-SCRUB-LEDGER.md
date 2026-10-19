SERVED MODEL: claude-opus-5[1m]

# `G-F4-DEAD-DEP` — the F.W4 SCRUB ledger

**Wave / unit**: X.F.W4, unit `.f` · **Date**: 2026-09-18 · **Tree**: `fourier-analysis @ m/w1-bump-migration`.
**Charter**: `F-W4.md` §2.L *SCRUB* — *"the deletion batch, every deletion carrying a zero-consumer proof."*
**Gate**: `G-F4-DEAD-DEP` — *"every deletion in the SCRUB carries a zero-consumer proof in the repair ledger; no dependency removed while still imported; the bundle diff recorded."*

⊘ **Negative roster, held throughout**: `I-2`'s empty state survives · `CanvasOverlayButton` is not
re-created (it was deleted at F.W0 `5842377` and stays deleted) · **the Tooltip shim is NEVER
deleted** — ⟨cmd⟩ `grep -rn "Tooltip" src/ | grep import` → **10 live import sites across 10 files**
(`PaperSidebar` · `BasisSelector` · `ContourSettings` · `CanvasControlsDock` · `EditorControlsDock` ·
`AnimationControls` · `VisualizationView` · `FunctionInput` · `CoefficientsSpectrum`, plus `App.vue`'s
producer `TooltipProvider`). It was never a candidate and is recorded here so no later census
proposes it.

⊘ **Proof standard.** A row is DELETED only on a zero-consumer proof taken at the live tree with the
DEFINING file excluded; a row measured dead but outside this unit's writable set, or held by a lock,
is recorded with its disposition and its holder, never quietly deleted and never quietly dropped.

---

## §1 DELETED — with the proof that licensed each one

### 1.1 `IU-25`'s dead client trio (`lib/api.ts`), fourier `dabbb17`

Row of record: `fr-ImageUpload.md:59` — *"Dead client trio (my re-grep: zero consumers of
`computeSha256`/`checkImageHash`/`imageUrl` outside api.ts); `checkImageHash` additionally
raw-`fetch`es outside the parametric core with a bare `throw`. → **F.W4** (delete or consume)."*

**Proof, this seat, at the live tree.** ⟨cmd⟩ for each symbol,
`grep -rn "<symbol>" src e2e | grep -v '^src/lib/api\.ts:'` →

| symbol | consumers outside `lib/api.ts` | note |
|---|---|---|
| `computeSha256` | **0** | |
| `checkImageHash` | **0** | also the module's ONLY raw `fetch` outside the parametric core, with a bare `throw` no typed catch could read |
| `imageUrl` | **0** | ⊘ its two siblings are LIVE and were not touched: `thumbnailUrl` **9**, `overlayUrl` **6** |

⊘ The pair was superseded, not merely unused: `store_image_asset` deduplicates by sha256 server-side
and the store's own comment says so (*"Always upload: store_image_asset deduplicates by sha256"*), so
a client-side hash-then-check had no remaining job.

**Verdict: DELETED.** 3 symbols, 15 source lines, 1 raw `fetch`, 1 bare `throw`.

### 1.2 `AnimationSettings`, an unused type import (`lib/api.ts`), fourier `dabbb17`

Not a SCRUB row but the same class, and it was the gate `G-F4-VUE-TSC-CLEAN`'s one site on this
unit's files: ⟨cmd⟩ `npx vue-tsc -b` → `src/lib/api.ts(5,5): error TS6196: 'AnimationSettings' is
declared but never used.` **DELETED**; the diagnostic is gone (§7).

---

## §2 MEASURED DEAD, NOT DELETED — recorded with its holder

These are zero-consumer surfaces in this unit's own files that **no adjudicated row books**. The
SCRUB's charter is an enumerated deletion batch, not a licence to subtract whatever a census finds,
so each is published with its proof and left standing rather than deleted on this seat's own
authority.

⟨cmd⟩ same instrument as §1.1, defining file excluded:

| symbol | file | consumers | why not deleted here |
|---|---|---|---|
| `getMe` | `lib/api.ts` | **0** | a wire wrapper over a LIVE endpoint (`GET /api/sessions/me`); deleting it is a contract decision, and the contract is F.W5-W8's |
| `evaluateBasis` | `lib/bases.ts` | **0** | the generic multi-basis dispatch — and `F-W4-CONV-STUDY.md` §4(3) puts this exact module under an adoption question routed to SS-3/SS-4. Deleting it now would pre-empt that decision |
| `loadDraftByVisualizationSlug` | `lib/draftStorage.ts` | **0** | the read half of the DB-v2 `by-visualization-slug` index; the index itself is live schema. Same `GCM-1` adoption gap as §3 |
| `deleteDraft` | `lib/draftStorage.ts` | **0** | ditto — the draft lifecycle's missing half, not residue |
| `generateCurveSVGPath` | `lib/easings.ts` | **0** externally | live INTERNALLY (`getEasingSVGPath` calls it); over-exported, not dead |
| `yieldToMain` | `lib/scheduler.ts` | **0** externally | live INTERNALLY (`processInChunks` calls it); over-exported, not dead |
| `ANIMATION_DEFAULTS` | `lib/defaults.ts` | **0** externally | live INTERNALLY (`defaultAnimationSettings()` reads it); over-exported, not dead |

⊘ The last three are the class a naive census miscounts: an export with no external consumer is not
dead code when the module itself calls it. Recorded so the next census does not book them as new.

---

## §3 `VV-R2-B` — the ten workspace-store exports: RETAINED, by lock

⊘ Lock: *"`VV-R2-B`'s ten dead workspace exports are adoption-or-deletion decided WITH the `GCM-1`
repair unit, never deleted unilaterally."*

**Census, this seat.** ⟨cmd⟩ for each name, `grep -rn "<name>" src | grep -v '^src/stores/workspace.ts' | grep -v '^src/lib/defaults.ts'`:

| export | store-member consumers | textual hits, and what they are |
|---|---|---|
| `visualizationSlug` | **0** | 11 — `router/index.ts`'s `/v/:visualizationSlug` route param, `draftStorage.ts`'s parameter of the same name, and comments |
| `visualizationETag` | **0** | 0 |
| `revision` | **0** | 0 |
| `loadVisualization` | **0** | 0 |
| `loadSnapshot` | **0** | 0 |
| `setVisibility` | **0** | 0 |
| `deleteVisualization` | **0** | 3 — `api.deleteVisualization`'s own definition and `stores/gallery.ts:256`'s RAW api call, which is the row's own evidence that the store action is bypassed |
| `invalidateInFlightComputation` | **0** | 0 |
| `defaultContourSettings` | **0** | 0 |
| `defaultAnimationSettings` | **0** | 0 |

**10 of 10 reproduce the banked figure.**

**Decision, taken WITH `.d`'s `GCM-1` receipt as the other half.** `.d` recorded: *"**GCM-1 /
GCM-25 / VV-BLK-1 — NOT LANDED.** GCM-3's half is landed in `GalleryView.vue`; the loader half is
`VisualizationView.vue` + `stores/workspace.ts`, outside the set."* The row itself rules the cure
shape — *"a single wiring unit at this component, not scattered repairs"* — and four of these ten
are exactly the surface that unit adopts (route → `loadVisualization`; publish → `setVisibility`;
delete → the store action).

**Verdict: RETAINED FOR ADOPTION.** Deleting them would delete the un-landed wiring unit's landing
site and force F.W5-W8 to re-author code that is already written and correct. Routed to F.W5-W8 with
`GCM-1`. ⊘ This is a decision, not a deferral: the row is answered, in the direction the lock
requires it be answered jointly.

---

## §4 Dependencies — proofs complete, deletion DECLARED (bounds)

`web/package.json` is unit `.g`'s file under `F-W4.md` §1 (*Shared*: `web/package.json` **(gates
only)**). The proofs are taken here; the edit is declared, not written.

⟨cmd⟩ for each dependency, `grep -rl -- "<dep>" src e2e vite.config.ts index.html | wc -l`:

| dependency | references | glass-ui peer? | verdict |
|---|---|---|---|
| `class-variance-authority` | **0** | no | **DELETE** — declared to `.z` |
| `clsx` | **0** | no | **DELETE** — declared to `.z` |
| `vue-component-type-helpers` | **0** | **YES** | **KEEP** — a peer dependency with no direct import is satisfied-by-declaration, not dead |
| `reka-ui` | 6 | yes | **KEEP** — the census cell *"direct `reka-ui` … 0 src imports"* is **FALSE today** |
| `tw-animate-css` | 1 | yes | KEEP |
| `@lucide/vue` · `@mkbabb/glass-ui` · `@mkbabb/keyframes.js` · `@mkbabb/latex-paper` · `@mkbabb/pencil-boil` · `@mkbabb/value.js` · `@vueuse/core` · `katex` · `pinia` · `vue-router` | 35 · 58 · 3 · 8 · 4 · 7 · 6 · 7 · 8 · 8 | — | KEEP |

⊘ **A census cell falsified in passing**: `lane-frontend.md:642`'s `[P3]` row names four dead deps —
*"`class-variance-authority`, `clsx`, `tailwind-merge`, and direct `reka-ui`"*. Two of the four are
wrong at this tree: **`tailwind-merge` is no longer a dependency at all** (absent from
`package.json`), and **`reka-ui` has 6 live consumers**. The row is right about the other two.
Dated correction beside, per E-3.

⊘ `web/components.json` points `aliases.utils` at `@/lib/utils`, and ⟨cmd⟩ `ls src/lib/utils.ts` →
`No such file or directory`, in a tree with no shadcn-vue component under `src`. Also outside this
unit's set; declared.

**Bundle consequence, measured (§5): both dead dependencies contribute ZERO emitted bytes today.**
Their cost is install surface and supply surface, not payload, and the declaration says so rather
than promising a saving that would not appear.

---

## §5 The bundle diff — recorded, including the part that did not move

Two builds, same `node_modules`, same machine: a detached worktree at `7b736f8` (this unit's first
commit, i.e. BEFORE any SCRUB deletion) and the live tree at `0a16b83` (this unit's last product
commit). ⟨cmd⟩ `npx vite build` in each, then `ls -l dist/assets`.

**Totals**

| | baseline `7b736f8` | after `0a16b83` | Δ |
|---|---|---|---|
| all emitted JS | 2,077,343 B | 2,080,018 B | **+2,675 B (+0.13 %)** |
| all emitted CSS | 525,248 B | 526,515 B | **+1,267 B (+0.24 %)** |

**Per-chunk, every chunk that moved**

```
-     33396  GalleryView.js          +     33455   (+59)
-    102574  VisualizationView.js    +    103001   (+427)
-      7088  basis-display.js        +      8561   (+1473)
-      3133  easings.js              +      3325   (+192)
-    488603  index.js (eager entry)  +    489127   (+524)
```

⊘ **The honest reading: this unit's span ADDED bytes, and the SCRUB is not why.** The growth is the
cures — the restore-seam coercers (`basis-display`, `easings`), the abortable backoff and the typed
admin problem (`index`), the shallow-ref/validation edits (`VisualizationView`, `GalleryView`). A
ledger that reported only the deletions would be reporting half of its own arithmetic.

**And the deletions' own share is ZERO, measured.** ⟨cmd⟩ `grep -rl` over `dist/assets` at BOTH
builds:

| probe | baseline | after |
|---|---|---|
| `computeSha256` | **0** | **0** |
| `checkImageHash` | **0** | **0** |
| `by-hash` (the deleted endpoint's path) | **0** | **0** |
| `class-variance-authority` | **0** | **0** |
| `clsx` | **0** | **0** |
| `tailwind-merge` | **0** | **0** |
| `url(#paper-grain)` (over the whole `dist/`) | **0** | **0** |

⊘ **The IU-25 trio was already tree-shaken out of the shipped bundle before it was deleted**, so the
deletion removes SOURCE surface — a contract, a raw `fetch` outside the parametric core, and a bare
`throw` — and not one shipped byte. Stating that is the point of recording a bundle diff: it tells
the next seat that dead-export deletion in this tree is a maintenance act, and that anyone who
schedules it for payload will be disappointed.

---

## §6 The `url(#id)` edges — `.a`'s Residual 4, exclusions run

`.a` carried: *"`SvgFilters.vue` defines `#title-boil` `:69`, `#wobble-celestial` `:96`,
`#paper-grain` `:122`, `#canvas-grain` `:150`, and nothing under `src` references any of them. ⊘ An
`url(#id)` edge is the edge no import graph represents — exclude a producer-package or emitted-CSS
consumer before deleting."*

The exclusion, run with the **precise** probe `url(#<id>)` rather than a substring match:

| id | `src` | glass-ui / latex-paper / pencil-boil `dist` | emitted `dist/` |
|---|---|---|---|
| `title-boil` | 0 | 0 | 0 |
| `wobble-celestial` | 0 | 0 | 0 |
| `paper-grain` | 0 | 0 | 0 |
| `canvas-grain` | 0 | 0 | 0 |

⊘ **A substring probe would have raised a false consumer here, and nearly did**: `grep -rl
"paper-grain"` over glass-ui's `dist` returns **three** files — `paper.css`, `tokens/glass-fx.css`,
`tokens/dark-arm.css` — and every hit is a CUSTOM PROPERTY NAME (`--paper-grain-tooth`,
`--paper-grain-tile`, `--paper-grain-relief`), not a filter reference. The instrument of record for
an `url(#id)` edge is `url(#id)`.

**All three exclusion arms discharged. The DELETION is not this unit's**:
`components/decorative/SvgFilters.vue` is outside this writable set, and a zero-consumer proof is not
a licence to write in a sibling's file. Handed back to `.z` complete.

---

## §7 `G-F4-VUE-TSC-CLEAN` and `G-F4-NO-UNUSED` — the SCRUB's regrowth gate

The charter binds the SCRUB to `G-F4-NO-UNUSED` *"so the class cannot regrow"*. Both legs are live
at this tree: `noUnusedLocals`/`noUnusedParameters` in `web/tsconfig.json` (landed F.W0 `b3b736c`)
and the ESLint config + CI wiring (landed by `.g`).

⟨cmd⟩ `npx vue-tsc -b --force`, double-run, at this unit's last product commit:

```
src/components/visualization/ContourEditorCanvas.vue(42,9): error TS6133: 'dragging' is declared but its value is never read.
```

**One diagnostic, tree-wide, and it is not this unit's**: `ContourEditorCanvas.vue` sits under `.c`'s
EVALUATE-ONLY lock (wave record, *"Two structural findings recorded at open"*), escalated by `.c` as
**A-c-1** and unwritable by any seat in this wave. ⟨cmd⟩ `npx eslint src/lib src/stores
src/composables` → exit **0**, zero output.

Baseline at wave-open was **18** diagnostics; this unit's own site (`lib/api.ts(5,5)` TS6196) is
cured at §1.2.
