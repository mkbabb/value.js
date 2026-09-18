SERVED MODEL: claude-opus-5[1m]

# SITTING DOSSIER 2 — the EIGHT cross-wave escalations S-1..S-8, far-end bytes gathered

**Seat**: SITTING-DOSSIER-2, 2026-09-17. **Posture**: GATHER ONLY — this file rules nothing and
elects nothing. Every option below is quoted from the spec/fold that authored it; every measurement
is a read-only command run against the live tree at this seat's own clock (working tree `tranche-u`,
HEAD `79298655`). The orchestrator rules.

**Why this file exists** (⟨`sed -n '458,460p' docs/tranches/X/W0/OWNER-SITTING-2026-09-17.md`⟩):
> **five waves cannot open lawfully until they are answered** — X-W5 (S-1, S-7), X-W6 (S-7, S-8),
> X-W7 (S-4, S-5, S-6, S-7), X-W8 (S-4, S-8), X-W9 (S-3), X-W10 (S-2).

COHESION §0j rules none of the eight; §5 returns all eight **ESCALATED — UNRULED**.

---

## S-1 — `bindPane` ownership: `W5.md §5` vs ⟨Dock.md · R-8⟩'s `DockCommand` registry

**Docket row** (⟨`sed -n '64p' W0/OWNER-SITTING-2026-09-17.md`⟩): *"`bindPane` ownership — `W5.md §5`
vs ⟨Dock.md · R-8⟩'s `DockCommand` registry; **"Both cannot be true."** … X-W5 (W5F-01/02/11/64;
gates A3, A4) — X-W5-FOLD CE-1: "ESCALATION REQUIRED BEFORE W5 OPENS"."*

**Routing clause** (⟨`sed -n '223p' refinement/X-W5-FOLD.md`⟩), verbatim:
> **CE-1 · X-W5.a ⟂ X-W8 (MT-DOCK-LAYERS-1) — the `bindPane` conflict. ESCALATION REQUIRED BEFORE
> W5 OPENS.** W5.md §5 gives `usePaneRouter.bindPane` ownership of "the instance refs it dispatches
> onto". `Dock.md` **R-8** narrows `bindPane` to non-command uses, moves command dispatch to a
> `DockCommand` provide/inject registry at MT-DOCK-LAYERS-1, declares "this wave may not claim C-3",
> and **supersedes G-I's seam text** so G-I's cure lands at X-W8 and "the gate no longer waits on any
> sibling". Both cannot be true. Affected: W5F-01, W5F-02, W5F-11, W5F-64; gates A3, A4.

**Side A — the wave spec** (⟨`sed -n '162,163p' waves/W5.md`⟩), verbatim:
> `PaneSlot.onMount` becomes required and generic over the mounted instance type, invoked
> `(instance, liveKey)`; `usePaneRouter` gains `bindPane(slot)` and owns the instance refs it
> dispatches onto.

**Side B — the registry record** (⟨`grep -n 'R-8' docs/tranches/V/megatranche/registry/adjudicated/Dock.md`⟩ → `:150`), verbatim:
> **MT-APP-1's `bindPane` (App.md:104) is hereby NARROWED to the non-command instance uses** (C-3's
> ref-identity cure; `applyExternalColor`/`commitEdit`/`cancelEdit` plumbing) — it may not resurrect
> command dispatch through instance refs, and this wave may not claim C-3. G-I's r2 seam text ("the
> null-ref CURE lands in MT-APP-1") is SUPERSEDED: G-I's cure now lands HERE and the gate no longer
> waits on any sibling.

**Options as enumerated** (no spec states a default; both folds refuse to elect):
(a) **W5 keeps `bindPane` whole** — R-8's narrowing is overturned; X-W8 loses the registry cure.
(b) **R-8 governs** — W5.a lands `bindPane` for non-command instance uses only (`applyExternalColor`/
`commitEdit`/`cancelEdit`); the `DockCommand` provide/inject registry lands at X-W8 (MT-DOCK-LAYERS-1),
W5 may not claim C-3, and A3's *cure* moves to X-W8 while A3's *witness* stays W5's (W5-FOLD §4 CE-1:
*"A3's **witness** is W5's; A3's **cure** is contested"*).
**Stated dissent**: `Dock` **DISSENT-1** preserves worker-O's two-wave shape — **overruled**; the
sanctioned split line is *"sequenced commits under ONE name"*, never a second wave name (W5F-01 cell).

**Live-tree measurement** (read-only, this seat):
- ⟨`grep -rn 'bindPane' demo/ | wc -l`⟩ → **0**. The symbol does not exist; nothing is being taken away.
- ⟨`grep -rn 'DockCommand' demo/ | wc -l`⟩ → **0**; ⟨`ls demo/shell/dock/`⟩ → no `commands.ts`
  (ActionBarToggle · ActionButton · ActionToolbar · ColorInput · Dock.vue · DockStatusLamp ·
  DockViewSelect · ParseEchoReadout · composables · index.ts · layers · menus · status-lamp.ts).
- ⟨`wc -l < demo/shell/usePaneRouter.ts`⟩ → **231**; ⟨`sed -n '206,212p' demo/shell/usePaneRouter.ts`⟩
  shows the live `paneRefs.gradient.value?.reset?.()` / `?.copyCSS?.()` / `?.seedFromPalette?.()`
  dispatch triple — W5F-01's structurally-dead mobile channel, unchanged.
**Reading**: both cures are greenfield. Neither option is a migration; the choice is purely *where the
new mechanism is authored*, so cost is bounds-motion only, not rework.

**Downstream cost**:
- (a) moves X-W8's BUILD list (⟨`sed -n '192p' …/Dock.md`⟩ names `D2-01 · D2-02 · D3-01 (G-I/G-L arms
  + registry, per R-8/R-9)`) back onto X-W5 and re-opens Dock **G-I**'s sibling wait — an **E-3
  addendum at `docs/tranches/V/megatranche/registry/adjudicated/Dock.md`** (a pinned authority;
  epoch rule ⇒ addendum-not-patch), plus a W5 §4 widen for `demo/shell/dock/**`.
- (b) costs **nothing in W5 bounds** but re-words W5 §5 unit 1's own sentence ⇒ **E-3 addendum at
  `docs/tranches/X/waves/W5.md`** (§5.1 mechanism clause) and a matching note at `refinement/
  X-W5-FOLD.md` §4 CE-1. Gate **A4** (*"delete ONE `bindPane` argument … `vue-tsc` must exit
  non-zero"*, `waves/W5.md:248`) survives under (b) — narrowed `bindPane` still takes arguments —
  but its scope narrows to the non-command uses. Gate **A3** (`waves/W5.md:247`) cannot close at W5
  under (b): its cure is X-W8's, so A3 becomes a two-wave gate (witness W5 / cure W8).
- Either way **W5F-11**'s `usePaneRouter` module split stays X-W8's, and **W5F-34**'s lock holds:
  *"C3 cannot close while G-L is RED (§4 CE-1/CE-6)"*.

---

## S-2 — GAB-5 / K-8 per-verb seat, under the VC:194 + B-13 + R-B collision

**Docket row** (⟨`sed -n '65p' W0/OWNER-SITTING-2026-09-17.md`⟩): *"GAB-5/K-8 per-verb seat under the
VC:194 + B-13 + R-B collision (cl.2 prohibition standing) … **X-W10** (owner/canon item)."*

**Routing clause — spine packet 9** (⟨`sed -n '509,513p' REFINEMENT-FOLD-2026-08-28.md`⟩), verbatim:
> TWO escalations must clear at the W0 sitting BEFORE the owning waves open: … (ii) **GAB-5/K-8**
> per-verb seat → X-W10 owner/canon item under the VC:194 + B-13 + R-B collision, with the standing
> cl.2 prohibition on executing challenge-D's Generate seat table while R-B stands.

**Far-end bytes — X-W10-FOLD X-W10.70** (⟨`sed -n '1259,1267p' refinement/X-W10-FOLD.md`⟩), verbatim:
> **BINDING (K-8, the seat's own kill, caught by neither reader).** Challenge-D's per-verb DELETE
> table is **DEMOTED from ruling to input** because its canon citation is selective:
> `CONVERGENCE-REAUDIT-2026-07-29.md:104-125` makes the scene `action` role optional **and the same
> terminal diagram assigns the Dock "active-scene commands"**; `VISUAL-CONSTITUTION.md:194` and
> `DECISIONS.md` B-13 bind Generate's three verbs into ONE Dock control set; and GenerateControls-adj
> ruling **R-B**, a standing adjudication, ruled the PLATE cluster the violation and banked its
> retirement INTO the dock set. **No seat may execute challenge-D's command-seat table for Generate
> while R-B stands un-overturned.** A corpus may argue canon change; it may not silently overrule it.

**The three canon bytes, quoted**:
- ⟨`sed -n '194p' docs/tranches/V/VISUAL-CONSTITUTION.md`⟩: *"… Regenerate, Save/Publish and Copy live
  in one Dock control set. … The generated palette is a draft specimen, not a flat strip plus
  unrelated buttons."*
- ⟨`grep -n 'B-13' docs/tranches/V/DECISIONS.md`⟩ → `:120` *"| B-13 | Generate actions use one Dock
  control set, not a dropdown by default and not three registers. | W25 |"*
- **R-B** (carried at X-W4-FOLD W4·103): *"the PLATE cluster is the violation and retires INTO the
  dock set"*.

**Options as enumerated** (X-W4-FOLD W4·103 + X-W10.70; the question is *dock set vs route-local*):
(a) **Dock set wins** — canon stands as written (VC:194 + B-13 + R-B); challenge-D's per-verb DELETE
table stays demoted to input and the route-local Generate/Gradient/Mix verbs retire INTO the dock set.
(b) **Route-local wins** — the owner overturns R-B and amends VC:194/B-13; only then may a seat
execute challenge-D's command-seat table.
**Stated default / dissent**: the fold records *"this row is the ONE place in the fold where the corpus
asks X-W10 to make a **product** decision rather than state a law; it is carried as an owner item"*
(X-W10-FOLD `:1268-1270`). **The cl.2 prohibition is the standing posture** — i.e. (a) holds by
default until an owner act overturns R-B. Neither fold elects.

**Live-tree measurement** (read-only):
- ⟨`ls demo/shell/dock/layers/`⟩ → `ActionBarLayer.vue` · **`GenericActionBar.vue`** · `SlugEditLayer.vue`
  — the renderer GAB-5 indicts is live.
- ⟨`sed -n '206,212p' demo/shell/usePaneRouter.ts`⟩ confirms the fold's r-LC caveat verbatim in the
  tree: Gradient's `reset` / `copyCSS` / **`seedFromPalette`** exist **only** through
  `paneRefs.gradient.value?.…` — i.e. `seedFromPalette` has **no route-local seat**, so option (b)
  would have to *create* one.
**Reading**: the duplication GAB-5 names is real on the Generate/Mix side and *absent* on two of
Gradient's three verbs — the asymmetry is the decision's actual content.

**Downstream cost**:
- (a) costs **no bounds motion**: the renderer + untyped descriptor branch *"die independently at
  X.W4.d (its bounds already order it)"* either way, and the per-verb seat question *"does not gate
  that DELETE and must not be bundled into it"* (X-W10.70 sequencing clause). X-W10 books it as a
  stated law; **no E-3 addendum needed**.
- (b) requires **E-3 addenda at TWO pinned authorities** —
  `docs/tranches/V/VISUAL-CONSTITUTION.md` (:194) and `docs/tranches/V/DECISIONS.md` (B-13, W25) —
  plus an overturn of R-B at the GenerateControls adjudicated record, plus a new route-local seat for
  `seedFromPalette`/`reset` in `demo/workbenches/gradient/`, which is **X-W6** bounds, not X-W10's.
  It moves X-W4.d's GAB bounds and re-opens the MP-3 same-change guard lock (spine §3 b.2).

---

## S-3 — `src/color/model.ts` barred TWICE while four W9 rows must read/re-export it

**Docket row** (⟨`sed -n '66p' W0/OWNER-SITTING-2026-09-17.md`⟩): *"`src/color/model.ts` barred
**twice** while four W9 rows must read/re-export `SPACE_SCHEMA`/`SPACE_IDS`/`Color<S>` … **X-W9**
(§1a n.6, §14 delta 6) — spine §2 e.20: "an adjudication for the W0 sitting, not a bounds edit"."*

**Routing clause — spine §2 e.20** (⟨`sed -n '621p' REFINEMENT-FOLD-2026-08-28.md`⟩), verbatim:
> `src/color/model.ts` barred TWICE by two different rules (Do-NOT-touch the file; Triumvirate the
> mathematics) while four W9 rows require reading/re-exporting `SPACE_SCHEMA`/`SPACE_IDS`/`Color<S>`
> | ESCALATED, not assumed (X-W9-FOLD §1a n.6, §14 delta 6) — an adjudication for the W0 sitting,
> not a bounds edit | X-W0 sitting

**§1a n.6** (⟨`sed -n '92,99p' refinement/X-W9-FOLD.md`⟩), verbatim:
> 6. **The `src/color/model.ts` collision is an ADJUDICATION, not a bounds edit, and is escalated
> rather than assumed.** Four rows (W9.5, W9.11, W9.24-adjacent, W9.25) require reading from or
> re-exporting `SPACE_SCHEMA`/`SPACE_IDS`/`Color<S>` — *[filename-only census, this seat]*:
> `SPACE_SCHEMA` and `SPACE_IDS` live in `src/color/model.ts`. The spec bars that file **twice, by
> two different rules**: §File Bounds "Do NOT touch" (the **file**) and §Triumvirate Dispatch (the
> file's **conversion mathematics**). Those are not the same rule and the spec does not distinguish
> them. No fold row assumes a reading. → X-W0, §14 delta 6.

**§14 delta 6** (⟨`sed -n '809p' refinement/X-W9-FOLD.md`⟩), verbatim:
> | **6** | `src/color/model.ts` | **ADJUDICATION OWED — NOT a bounds edit** | **W9.5** (publish
> `SPACE_SCHEMA`/`SPACE_IDS`) · **W9.11** (retarget `convertColor`/`mixColors` return positions for
> `ColorIn`) · **W9.23-(ii)** (the drift cure, if chosen) | … **→ X-W0.** No fold row assumes a
> reading; W9.5 and W9.11 are **undeliverable** until it is ruled |

**The two bars, at the wave spec's own bytes**:
- ⟨`sed -n '61,63p' waves/W9.md`⟩ — §Triumvirate Dispatch: *"**File-bound expansion that invalidates
  the wave**: any cure that requires editing `src/color/model.ts`'s **conversion mathematics**, or
  that adds a file under `src/` not named in §4. The colour model is not in scope; a cure that
  reaches it means the crash class was mis-rooted."*
- ⟨`sed -n '110,113p' waves/W9.md`⟩ — §File Bounds: *"**Do NOT touch**: … `src/color/model.ts` · any
  peer repository tree (packets only, RD-11)."*

**Options as the fold enumerates them** (§14 delta 6's framing — the spec *"does not distinguish a
**re-export** or a **return-type retarget** from a **mathematics edit**"*):
(a) **Narrow reading** — "Do NOT touch" governs the *mathematics* only; a pure **read** and a
**re-export** (and a return-type retarget) are permitted; W9.5/W9.11 deliverable as filed.
(b) **Broad reading** — untouchable in any form; W9.5/W9.11 **undeliverable**, to be re-shaped (publish
from a *new* `src/` file — which itself trips Triumvirate Dispatch's *"adds a file under `src/` not
named in §4"*) or deferred.
No default is stated; **X-W9-FOLD explicitly refuses**: *"No fold row assumes a reading."* Two
**companion** rulings owed by the same wave (⟨`sed -n '840p' …X-W9-FOLD.md`⟩) — the Result-consumption
dissent (EAS-21 vs F-4) and the config-parity dissent (PC-17 vs three NWO bookings) — are **not** S-3,
recorded here so they are not folded into it.

**Live-tree measurement** (⟨`grep -n 'export' src/color/model.ts`⟩):
- `:56 export const SPACE_SCHEMA = {` · `:76 export const SPACE_IDS = Object.freeze(Object.keys(SPACE_SCHEMA) as SpaceId[]);`
- `:38 export type Color<S extends SpaceId> = Readonly<{` · `:43 export type AnyColor` · `:4 export type SpaceId`
**All three symbols are already `export`ed from `src/color/model.ts` today.** Under (a) W9.5's
"publish" need is satisfiable by a *re-export barrel edit outside* `model.ts` with **zero bytes
changed inside it** — the narrow reading may cost no edit to the barred file at all. Corroborating
(⟨`sed -n '760p' refinement/X-W9-FOLD.md`⟩, NG-4, **RED**): *"`SPACE_SCHEMA` carries no ranges/units;
the 17-space table exists only at `picker-color.ts:52-70` (byte-diffed identical); **5** declarations
of "the channels of a space"; … the kelvin bound in **two packages**"*.

**Downstream cost**:
- (a) unblocks W9.5 / W9.11 / W9.24-adjacent / W9.25 with **no §4 bounds edit** if the re-export lands
  in a file already in W9 §4; if it must land in a *new* `src/` file, Triumvirate Dispatch fires and
  an **E-3 addendum at `docs/tranches/X/waves/W9.md` §4 + §Triumvirate Dispatch** is required.
- (b) kills gate **NG-4** as filed (*"The channel domain is published"*, `X-W9-FOLD:760`) — it cannot
  go green without publishing a schema — and re-opens the M-10 dead-`SPACE_IDS` and the two-package
  kelvin bound with no owner. X-W9's §14 says W9.5/W9.11 are *"undeliverable"* under (b); the wave
  would open with two units struck ⇒ **E-3 addendum at `waves/W9.md` §5 + the fold's §14**.

---

## S-4 — `UserSortMenu.vue:8` cure COLLISION: X-W7 B-4's null-DELTA vs X-W8 G-9's quiet migration

**Docket row** (⟨`sed -n '67p' W0/OWNER-SITTING-2026-09-17.md`⟩): *"X-W7 ⟂ X-W8 — spine packet 14: "a
live CrossEdge both folds record and neither elects — sitting item"."*

**Routing clause — spine packet 14** (⟨`sed -n '547,551p' REFINEMENT-FOLD-2026-08-28.md`⟩), verbatim:
> 14. **BROWSE-SEARCH — HOMED X-W7.** BoundsDelta packet B-4: `BrowsePane.vue` already owned
> (`W7.md:107`); widenings for `MiniColorPicker.vue`, `UserSortMenu.vue`, `PaginationBar.vue`,
> `search/index.ts`. The `UserSortMenu.vue:8` cure COLLISION with X-W8 G-9 (null-DELTA vs quiet
> migration) is a live CrossEdge both folds record and neither elects — sitting item.

**Side A — X-W7's B-4** (⟨`sed -n '449,451p' refinement/X-W7-FOLD.md`⟩): *"`demo/palettes/browser/
search/MiniColorPicker.vue` · `UserSortMenu.vue` · `browser/search/index.ts`. `BrowsePane.vue` IS in
bounds …, but the three search leaves are not. … SFB-4's same-change rider cannot land; US-7/US-8/
US-13 remain "MT-AU1 named-adopt else NO-WAVE-OWNER"."* And ⟨`sed -n '340p' …X-W7-FOLD.md`⟩ **W7.133**:
*"a CURE COLLISION on `UserSortMenu.vue:8`. X-W8's G-9 holds that byte under a null-DELTA proof; the
record's own cure is a quiet migration of the same line. **Two waves, one line, two incompatible
proofs.**"* ⟨`:475`⟩ **CE-3** adds: *"Additionally ⟨AdminListSkeleton.md⟩'s arbiter rider records that
**G-9's census as written misses `AdminListSkeleton`**. … a boundary ruling, not a wave decision."*

**Side B — X-W8's G-9** (⟨`sed -n '309,317p' waves/W8.md`⟩), verbatim:
> **G-9 — the dead Button/Skeleton axes are gone, and the change is provably paint-neutral.**
> 0 `variant=` on a glass `Button` in the two consumers; 0 `surface=`/`variant=` on `Skeleton` in
> `AdminListSkeleton.vue`; a committed null-DELTA pair (1440×900 and 390×844, both schemes, stated
> tolerance) shows zero pixel change.
> *RED today*: `PaginationBar.vue:8,22` `variant="outline"`, `UserSortMenu.vue:8` `variant="ghost"` —
> `Button.vue.d.ts` declares `emphasis|tone|size|iconOnly|loading|type|disabled|class`, **no** `variant`.

**Options as enumerated — X-W8-FOLD CE-5, quoting ⟨UserSortMenu.md · R-G⟩ whole** (⟨`sed -n '443,454p'
refinement/X-W8-FOLD.md`⟩), verbatim:
> *(a)* X-W8.b/G-9 deletes the dead attribute under a null-DELTA pair proving **zero pixel change**;
> *(b)* DEFECT-LEDGER:23784's cure is `emphasis="quiet"`, which *changes* paint; *(c)* V·MEGA-W-GEN-1
> **G5** migrates ghost→quiet at ~48 non-pinned sites. *"(b)/(c) satisfied would FAIL (a)'s gate, and
> (a) satisfied preserves the possibly-wrong register forever … the register decision is design
> content → **X-W10 rules**; X-W8's deletion may land first (mechanically safe either way); **if
> quiet wins, G-9's null-DELTA baseline must be re-stamped in the same commit** — otherwise the gate
> outlaws the cure."*
**Stated default**: CE-5's own words — *"X-W8's deletion may land first (mechanically safe either
way)"*, with **X-W10 ruling the register**. Dissent, from the other side (`PaginationBar` DISSENT #6):
*"a green G-9 is never citable as the cure of D-5's design limb"*; **M5** (X-W4 arm): *"X-W8's
same-touch edits these exact attribute lists — sequence the two waves' touches; the `iconOnly` arm
carries an INTENDED geometry delta and may not ride under W8's null-DELTA gate."*

**Live-tree measurement** (read-only, this seat):
- ⟨`sed -n '8p' demo/palettes/browser/search/UserSortMenu.vue`⟩ → `                variant="ghost"` — **RED as filed, byte-exact.**
- ⟨`sed -n '8p;22p' demo/palettes/browser/admin/PaginationBar.vue`⟩ → `variant="outline"` ×2 — **RED as filed.**
- ⟨`sed -n '13p;15p;16p;18p' demo/palettes/browser/admin/AdminListSkeleton.vue`⟩ → four
  `<Skeleton surface="glass" variant="breath" …>` lines — **RED as filed**, and CE-3's "G-9's census
  misses `AdminListSkeleton`" is answered by W8.md's own G-9 text, which **does** name it.
- ⟨`sed -n '552p' refinement/X-W8-FOLD.md`⟩: *"**G-9 names exactly two files.**"* — i.e. the fold's own
  count (two) disagrees with the gate's three surfaces (`UserSortMenu` · `PaginationBar` · `AdminListSkeleton`).

**Downstream cost**:
- **(a) delete-first** (CE-5's default): X-W8 lands, X-W7 must **not** touch `:8` ⇒ B-4's widen narrows
  to the non-`:8` rows; SFB-4's same-change rider still has no home ⇒ **E-3 addendum at
  `refinement/X-W7-FOLD.md` §BoundsDelta B-4**. If X-W10 later elects `emphasis="quiet"`, CE-5
  *requires* the null-DELTA baseline re-stamped in the same commit ⇒ a second touch of `waves/W8.md`
  G-9's *RED today* cell.
- **(b) quiet-migration-first**: G-9's null-DELTA gate goes **unsatisfiable** as written (paint changes)
  ⇒ **E-3 addendum at `waves/W8.md` G-9** restating the proof, and X-W7 §4 must gain `UserSortMenu.vue`
  ⇒ addendum at `waves/W7.md` §4.
- **Third-order**: CE-8 records that X-W7's `strictTemplates` *"double-covers G-9"* — if W7 lands first
  *"G-9's RED cells go GREEN by compiler, not by this wave's act"*. The **order of X-W7 vs X-W8** is
  therefore part of this ruling, not only the verb.

---

## S-5 — `PaletteCard.vue` verb: `W7.md §5.d` "deletes" vs §4's modify-carve grant

**Docket row** (⟨`sed -n '68p' W0/OWNER-SITTING-2026-09-17.md`⟩): *"X-W7 — spine §2 e.18: "the sitting
elects the verb before unit .d opens"."*

**Routing clause — spine §2 e.18** (⟨`sed -n '619p' REFINEMENT-FOLD-2026-08-28.md`⟩), verbatim:
> | e.18 | `W7.md` §5.d says PaletteCard.vue "deletes"; §4 grants modify-carve — ActionFeedback.md
> authored every row against the §5 reading | Tension recorded (X-W7-FOLD §1a C-4); the sitting elects
> the verb before unit .d opens | X-W7 |

**X-W7-FOLD §1a C-4** (⟨`sed -n '36p' refinement/X-W7-FOLD.md`⟩), verbatim:
> **C-4 · §5's `X.W7.d` says "`PaletteCard.vue` deletes"; §4 grants it `modify-carve`.** A delete is
> not within a carve. Under the reading rule the access verb governs, so as written X.W7.d must stop
> at carve and the deletion is a formation-boundary amendment. `ActionFeedback.md:9` has already read
> the §5 prose as authoritative ("X.W7.d … **deletes PaletteCard.vue**") and authored every AF-row
> against a successor surface that the bounds table does not authorise creating by deletion. Recorded,
> not resolved. ⟨ActionFeedback.md · Wave authority⟩ ⟨W7.md §4, §5.d⟩

**Side A — §5.d** (⟨`sed -n '222,223p' waves/W7.md`⟩), verbatim:
> - **Mechanism**: rename, menu, feedback, versions, tags, export, publication, vote, feature, and
>   delete move to the selected-entity inspector; `PaletteCard.vue` deletes once every consumer has
>   moved.

**Side B — §4 File Bounds** (⟨`sed -n '98,101p' waves/W7.md`⟩), verbatim:
> | `demo/palettes/browser/card/PaletteCard/PaletteCard.vue` | modify-carve |
> | `demo/palettes/browser/card/PaletteCard/PaletteCardMeta.vue` | modify-carve |
> | `demo/palettes/browser/card/PaletteCard/PaletteCardMenu.vue` | modify-carve |
> | `demo/palettes/browser/card/PaletteCard/PaletteCardSwatches.vue` | modify |

**Options exactly as the fold enumerates them** (⟨`sed -n '464p' refinement/X-W7-FOLD.md`⟩), verbatim:
> `demo/palettes/browser/card/PaletteCard/PaletteCard.vue`: §5.d says "deletes"; §4 grants
> `modify-carve` (§1a C-4). **Either §4 gains `delete` or X.W7.d stops at carve.**

**Stated default / dissent**: C-4 states the **reading rule's** outcome — *"Under the reading rule the
access verb governs, so **as written** X.W7.d must stop at carve and the deletion is a
formation-boundary amendment"* — i.e. carve is the default absent an owner act. Counter-pressure,
verbatim: `ActionFeedback.md:9` authored **every** AF-row against the delete reading, and
⟨`sed -n '456p' …X-W7-FOLD.md`⟩ names the casualties if carve wins — *"every ActionFeedback row — which
`ActionFeedback.md` authored against a successor surface §4 does not authorise creating (§1a C-4)"*;
⟨`:669`⟩ closes *"executable — except the deletion §5.d assumes (§1a C-4, §BoundsDelta B-7)."*

**Live-tree measurement** (read-only):
- ⟨`ls demo/palettes/browser/card/PaletteCard/`⟩ → `ActionFeedback.vue` · **`PaletteCard.vue`** ·
  `PaletteCardMenu.vue` · `PaletteCardMeta.vue` · `PaletteCardSwatches.vue` · `PaletteRenameInput.vue`
  — note `ActionFeedback.vue` **already exists in the tree**, so the AF successor surface is not
  wholly hypothetical.
- ⟨`grep -rln 'PaletteCard\.vue\|from.*PaletteCard' demo/ --include='*.vue' --include='*.ts' | wc -l`⟩
  → **3** importing files; ⟨`grep -rln 'PaletteCard' demo/ … | wc -l`⟩ → **17** files mention the name.
  §5.d's precondition is *"once every consumer has moved"* — three consumers, not a long tail.
- The successor `PaletteSpecimen.vue` §5.c promises is **not yet in the tree** (⟨`ls …/card/`⟩ above);
  §5.c's Files line is *"`demo/palettes/browser/card/**` (create `PaletteSpecimen.vue`)"*
  (⟨`sed -n '215,216p' waves/W7.md`⟩) — the glob covers creation, not deletion.

**Downstream cost**:
- **Elect DELETE**: `waves/W7.md` §4 must gain a `delete` row for `PaletteCard.vue` ⇒ **E-3 addendum at
  `docs/tranches/X/waves/W7.md` §4** (and §4a Disjointness re-checked against X-W10's `.plate-ink`
  row 17, which names sibling files). Every AF-row becomes deliverable; sub-gate **G13** (`W7.md:232`)
  keeps its "one mutation, one owner, one visible result" arm intact.
- **Elect CARVE**: §5.d's sentence must be amended ⇒ **E-3 addendum at `waves/W7.md` §5.d**, and
  `ActionFeedback.md`'s rows are re-homed or re-based — X-W7-FOLD `:456` names the rows that die
  without the widen (W7.33/34/35/36, W7.37's second site, W7.128/129/130/131 incl. the A-2 BLOCKER,
  W7.134). That is the larger blast radius by the fold's own enumeration.

---

## S-6 — the AdminGate deletion seam, CONTESTED between X-W3 and X-W7

**Docket row** (⟨`sed -n '69p' W0/OWNER-SITTING-2026-09-17.md`⟩): *"AdminGate deletion seam CONTESTED |
**X-W3 ⟂ X-W7** — spine packet 6: "neither wave's gate goes green over the other's edit"."*

**Routing clause — spine packet 6** (⟨`sed -n '486,488p' REFINEMENT-FOLD-2026-08-28.md`⟩), verbatim:
> The AdminGate BLOCKER's deletion seam stays CONTESTED between X-W3 and X-W7 exactly as X-W3-FOLD
> F-1 prints it — neither wave's gate goes green over the other's edit. ⟨X-W7-FOLD.md B-2 ·
> X-W3-FOLD.md F-1⟩

**X-W3-FOLD §CrossEdges §A** (⟨`sed -n '714,721p' refinement/X-W3-FOLD.md`⟩), verbatim:
> **§A — X-W3 ⇄ X-W7 · the AdminGate deletion seam (CONTESTED).** F-1's guard is X-W3's; the 21
> `if (!token)` deletions are claimed by **both** waves in different records (`AAP-3`/`ATP-3` behind
> the X-W3.6 gate; `AF-1` at X-W7). The pane-side unauthorized state is unambiguously X-W7's. **Edge
> law**: neither wave reports the AdminGate identity closed alone; whichever wave lands second
> inherits the seam, and its gate may not go green over the other's edit.

**X-W3-FOLD F-1, the mechanism** (⟨`sed -n '115,124p' refinement/X-W3-FOLD.md`⟩), verbatim:
> **F-1 · `AAP-3` + `ATP-3` + `AF-1` ≡ `AdminUsersPanel L-5` ≡ MT-AU1 — the AdminGate: authority
> costumed as an empty collection** (cl.2 · **BLOCKER** ×3, one identity) … `if (!token) return;`
> exits **before** `loading`/`loadError` are touched, so the branch chain lands on the TRUE-EMPTY
> plate … **21 `if (!token)` sites across 5 composables** — flagged 3 · tags 2 · colorNameQueue 5 …
Also ⟨`sed -n '70,72p' …X-W3-FOLD.md`⟩: *"**The AdminGate class is FOUR members, not three.**"*

**Side X-W7 — W7-FOLD W7.61** (⟨`sed -n '188p' refinement/X-W7-FOLD.md`⟩), verbatim:
> **BLOCKER: an unauthenticated stranger is told, as fact, that the collection is empty, and is
> handed operable controls** (cl.1, one identity across all five panels). … **This is the wave's
> single highest-value row: one cure, five surfaces, all in bounds.**

**Options as enumerated** (neither fold elects; the "Edge law" is stated, the *order* is not):
(a) **X-W3 first** — F-1's guard lands behind the X-W3.6 gate; X-W7 inherits the seam and W7.61's
"one cure, five surfaces" becomes a verification, not an edit.
(b) **X-W7 first** — W7.61's five-surface cure lands; X-W3 inherits the seam and F-1's guard becomes
the verification.
**The binding constraint either way** (X-W3-FOLD §A, verbatim): *"neither wave reports the AdminGate
identity closed alone; whichever wave lands second inherits the seam, and its gate may not go green
over the other's edit."* Precedent cited in the same clause: the `VersionHistoryDrawer` record's
two-wave carve — *"recorded so neither wave's gate goes green over the other's edit"*.
**Rider that constrains (a)** (⟨`sed -n '654p' …X-W3-FOLD.md`⟩ **S-11/G-22**): *"Two E-1 riders bind
X-W3's share of the AdminGate class: **the born-RED route spec lands FIRST** (audit arm + tag arm)"*,
plus the fixture-estate caveat (`admin-populated.ts:153` returns `json("", 204)` vs the live route's
`200 {deleted:true}`; repair is X-W1's CC-031) — *"until then this wave's guard-spec green is not
load-bearing."* **Direction already fixed for the sibling edge** (⟨`sed -n '723,724p' …X-W3-FOLD.md`⟩
**§B**): *"`G-11`'s `201`-with-appended-revision is the input X-W7's `VHD-4` cure consumes …
Direction: **X-W3 first**."*

**Live-tree measurement** (read-only, this seat):
- ⟨`grep -rn 'if (!token)' demo/ | wc -l`⟩ → **21** — F-1's census reproduces **exactly**, unmoved.
- ⟨`grep -rln 'if (!token)' demo/`⟩ → `demo/palettes/useAdminTags.ts` · `useAdminFlagged.ts` ·
  `useAdminAudit.ts` · `useColorNameQueue.ts` · `useAdminUsers.ts` — **five composables**, matching
  F-1's "21 sites across 5 composables".
- Neither `waves/W3.md` nor `waves/W7.md` contains the string `AdminGate` (⟨`grep -n 'AdminGate'
  waves/W3.md waves/W7.md`⟩ → no output): the identity lives **only** in the fold + registry layer,
  which is why no wave spec can be read to own it.

**Downstream cost**:
- Electing an order costs **no bounds motion in either wave** — both already hold their side's files
  (X-W3 the composables behind X-W3.6; X-W7 the five panels). The cost is **gate wording**: the wave
  landing second must have its gate re-worded to read against the other's post-state ⇒ an **E-3
  addendum at that wave's fold** (`X-W3-FOLD.md` §S-11/G-22 **or** `X-W7-FOLD.md` W7.61's gate cell),
  never a rewrite of the wave spec's §6.
- **(a) X-W3 first** matches §B's fixed direction and S-11's "born-RED route spec lands FIRST" rider —
  but inherits X-W1's CC-031 fixture repair as a precondition for a load-bearing green. **(b) X-W7
  first** decouples from CC-031 but strands F-1's route guard as the second edit, and the X-W3.6 gate
  must then be re-based on a tree where the 21 sites are already cured.

---

## S-7 — `ErrorBoundary.vue` path: three folds, two paths (W0.22)

**Docket row** (⟨`sed -n '70p' W0/OWNER-SITTING-2026-09-17.md`⟩): *"X-W5 ⟂ X-W6 ⟂ X-W7 — spine packet
12: "the path must be resolved at the sitting before any of the three opens it"."*

**Routing clause — spine packet 12** (⟨`sed -n '530,538p' REFINEMENT-FOLD-2026-08-28.md`⟩), verbatim:
> 12. **BOUNDARY-SCOPE (AboutPane AB-4/AB-5) — FORMATION-BOUNDARY.** … Attached contention for the
> sitting: `ErrorBoundary.vue` is named by NO dated X wave, yet THREE folds add it to their bounds
> deltas at TWO different paths (X-W5: `demo/shell/ErrorBoundary.vue`; X-W6/X-W7:
> `demo/color-picker/ErrorBoundary.vue`) — the path must be resolved at the sitting before any of the
> three opens it. NAMESPACE GUARD: shell-dock-actionbarlayer's AB-4/AB-5 (X-W8-FOLD W8.31/G-8) are
> DIFFERENT identities; cite ⟨record.md · id⟩ or not at all.

**The three folds' own bytes**:
- **X-W5 §3 BD-07** (⟨`sed -n '203p' refinement/X-W5-FOLD.md`⟩), verbatim: *"| **BD-07** |
  `demo/shell/ErrorBoundary.vue` | modify | W5F-52..W5F-55 (11 rows), W5F-07, W5F-51 | **No X wave
  names the component** (`grep waves/*.md` → 0). The successor is declared cross-surface residue; W5
  owns only the containment altitude. |"*
- **X-W6 n.10** (⟨`sed -n '1025p' refinement/X-W6-FOLD.md`⟩), verbatim: *"| n.10 |
  `demo/color-picker/ErrorBoundary.vue` | add `modify` — **contested with X-W5** (cl.4) | MX-CLUSTER
  member; single boundary = two-pane outage | W6·266's blast radius |"*
- **X-W7 §BoundsDelta** (⟨`sed -n '460p' refinement/X-W7-FOLD.md`⟩), verbatim: *"`demo/color-picker/
  ErrorBoundary.vue` (**no X wave names it** — repo-wide grep 0; W7.136, and the terminus of every
  "the boundary catches it" row)"*.
- **X-W10 §4 row 17 + row 24** (⟨`sed -n '1673p;2150p' refinement/X-W10-FOLD.md`⟩): row 17 lists
  `demo/color-picker/ErrorBoundary.vue` among *"the `.plate-ink` five"*, *"unowned for this purpose"*;
  row 24: *"`demo/color-picker/ErrorBoundary.vue` | **BOUNDARY** (or ADD with row 17) | **zero hits
  across all twelve wave files.** … EB-7's role act (`alert` → `alertdialog`) needs the same file.
  **Two unowned obligations on one unowned file**"*. — i.e. a **fourth** fold, already on the
  `color-picker/` path.

**Options as enumerated** (the spine states the contention, not a menu; the enumerable forms are):
(a) **`demo/color-picker/ErrorBoundary.vue`** — the path X-W6, X-W7 and X-W10 all already write.
(b) **`demo/shell/ErrorBoundary.vue`** — X-W5's BD-07 path, which would require a **file move** as
part of W5's shell-truth unit (the wave that owns `demo/shell/`).
No default is stated. X-W5's own cell concedes the weaker claim — *"W5 owns only the containment
altitude"*, the component itself *"is declared cross-surface residue"*.

**Live-tree measurement** (read-only, decisive):
- ⟨`find demo -name 'ErrorBoundary*'`⟩ → **`demo/color-picker/ErrorBoundary.vue`** (one file).
- ⟨`test -f demo/shell/ErrorBoundary.vue`⟩ → **NO**. X-W5's BD-07 path **does not exist in the tree**.
- ⟨`grep -rln 'ErrorBoundary' demo/`⟩ → `demo/color-picker/App.vue` — the sole consumer.
- ⟨`sed -n '50p;140p' demo/color-picker/App.vue`⟩ → `<ErrorBoundary message="This panel hit an
  unexpected error.">` … `</ErrorBoundary>` wrapping the whole two-pane grid — confirming W7.567's
  blast-radius claim (*"App.vue:50/:140's boundary spans both panes"*) byte-for-byte.
**Reading**: X-W5's path is an authoring error, not a rival location — (a) is a spelling correction;
(b) is a file move with a consumer rewrite.

**Downstream cost**:
- (a) costs **one line** in X-W5's BoundsDelta ⇒ **E-3 addendum at `refinement/X-W5-FOLD.md` §3
  BD-07** correcting the path. X-W6 n.10, X-W7 §BoundsDelta and X-W10 rows 17/24 need **no change**.
  The `contested with X-W5` flag on X-W6 n.10 resolves to a shared-file sequencing note (three waves,
  one file) rather than a path fork.
- (b) costs a **file move** inside X-W5's shell-truth unit + an `App.vue` import rewrite, and forces
  **E-3 addenda at THREE files** (`X-W6-FOLD.md` n.10, `X-W7-FOLD.md` §BoundsDelta, `X-W10-FOLD.md`
  §4 rows 17 and 24), plus re-stamping X-W10 row 17's `.plate-ink` five-site census (⟨W7.606: *"exactly
  5 declarations (… EmptyState.vue:102, ErrorBoundary.vue:84)"*⟩).
- **Residual either way**: the *ownership* question is untouched by the path. W7.136: *"NO X wave names
  `ErrorBoundary.vue`. Repo-wide grep over `waves/*.md` → 0"* — the sitting must **also** say which wave
  (or the boundary register) owns it, or the path ruling leaves eleven W5 rows, the MX-CLUSTER member
  and X-W10's EB-7 role act all still unowned.

---

## S-8 — MT-CSP-1 ⇄ the X carry-cut ledger: ⟨ConfigSliderPane⟩ in no wave's table, the CC id absent

**Docket row** (⟨`sed -n '71p' W0/OWNER-SITTING-2026-09-17.md`⟩): *"**X-W6 · X-W8 · W0.1** — X-W6-FOLD
§2 e.12: "both belong at the X-W0 sitting (§0a n.9)"."*

**Routing clause — X-W6-FOLD §2 e.12** (⟨`sed -n '1071p' refinement/X-W6-FOLD.md`⟩), verbatim:
> | e.12 | **`ConfigSliderPane.vue` / MT-CSP-1 ⇄ the X ledger** | the file is in no wave's table and
> the CC id is absent | plus the **X-W8 CC-105 vs CSP G-PAINT** tension — both belong at the X-W0
> sitting (§0a n.9) |

**§0a n.9, the formation flag** (⟨`sed -n '199,204p' refinement/X-W6-FOLD.md`⟩), verbatim:
> 9. **`BlobPane.md` raises a formation flag this fold cannot resolve and does not bury.** … **`MT-CSP-1`
> is absent from the X ledger and `ConfigSliderPane.vue` is in no X wave's file table.** The file exists
> (`demo/scenes/ConfigSliderPane.vue`, measured) and five BlobPane rows discharge through its
> `G3`/`G8`/`G-PAINT` gates. §3 adds it to W6 bounds as the only wave whose rows need it; §4 carries the
> `X-W8 CC-105 ⇄ CSP G-PAINT` tension to the X-W0 sitting.

⟨`sed -n '1036p' …X-W6-FOLD.md`⟩ n.21 adds the bounds row (*"add `modify`"*, riders W6·190/191/196/198);
⟨`sed -n '105p' COHESION.md`⟩ §4: *"MT-CSP-1 … **ORPHANED from the X carry-cut ledger — 10 identity-folds
hang on it**"*.

**The X-W8 side — W0.1** (⟨`sed -n '108,120p' refinement/X-W0-FOLD.md`⟩), verbatim:
> **W0.1 — The CC-105 ⇄ CSP G-PAINT tension is the sitting's business, by name, and neither wave may
> elect it silently.** … two live registers claim the `--slider-track-bg` sites — X-W8 books
> `ConfigSliderPane.vue:202` under **CC-105 BLOCKED-ON the 8.0.0 repin** with receiving surface
> X-W4.g, while the standing ConfigSliderPane adjudication's **G-PAINT single cut** (C-3/D-3/D-4/D-14)
> proved … **that the demo CAN paint the range today** — i.e. one register says "wait for glass 8",
> the other says "curable now". **cure-lock (verbatim)**: "the CSP G-PAINT ruling and the CC-105
> booking **must be reconciled by the X-W0 sitting, not silently by either wave**".

**The wave-spec byte** (⟨`sed -n '106,109p' waves/W8.md`⟩): *"The `--slider-track-bg` style sites
(`GenerateControls.vue:305`, `ExtractControls.vue:32,75`, `ConfigSliderPane.vue:202`,
`ComponentSliders.vue:197`) — CC-105, BLOCKED-ON **X-W0's 8.0.0 repin census event**, receiving surface
**X-W4.g**. The slider *import line* in those files is in bounds; the CSS var is not."* — and the
sitting's **anti-double-book rider** (⟨`:463-466` OWNER-SITTING⟩): *"**the bank must not resurrect it.**
W0.1 books the CC-105 ⇄ G-PAINT *tension*; **S-8 books the missing carry-cut id** … Two rows, one file,
**no double-book**."*

**Two questions, enumerated** (the docket names both; neither fold elects either):
**Q1 — the missing CC id.** (a) **Mint a carry-cut id for MT-CSP-1** in `CARRY-CUT-LEDGER.md`.
(b) **Book it at the NO-WAVE-OWNER / formation-boundary register** as a named orphan (X-W0-FOLD
⟨`:1106`⟩ routes slate entry 24 → *"**X-W6/X-W8** (MT-CSP-1's orphaned carry-cut id — 10
identity-folds hang on it)"*, without electing).
**Q2 — CC-105 vs G-PAINT.** (a) **Wait for glass 8** (X-W8's booking; receiving surface X-W4.g).
(b) **Curable now** (the CSP register's G-PAINT single cut, the later measurement-backed ruling).
**Stated lean, not an election**: W0.1's dissent cell — *"the record refuses to elect; this addendum
refuses too. **Both readings are preserved.**"* — with the seat's note that it *"routes the identity to
the CSP register (the later, measurement-backed ruling)"*. **§seq**: *"X-W0.j (batch 3) precedes the
sitting (batch 4) … a FAIL that reads "the bank stays shut" closes it by accident."*

**Live-tree measurement** (read-only, this seat):
- ⟨`find demo -name 'ConfigSliderPane*'`⟩ → **`demo/scenes/ConfigSliderPane.vue`** — exists (§0a n.9's
  "measured" reproduces).
- ⟨`grep -rn 'ConfigSliderPane' docs/tranches/X/waves/`⟩ → **one hit**, `waves/W8.md:107`, and it sits
  inside the **BLOCKED-ON carve**, not a File Bounds grant. **No wave's §4 table names the file.**
- ⟨`grep -c 'ConfigSliderPane\|MT-CSP' …/registry/CARRY-CUT-LEDGER.md`⟩ → **0**. **No CC id names it** —
  the orphan is real, not stale prose.
- ⟨`grep -rn 'slider-track-bg' demo/ | wc -l`⟩ → **8** live sites (W8.md enumerates 5 file:line pairs
  across 4 files; the delta is multiple occurrences per file, not new files).
- Glass frontier, for Q2: registry still **8.0.0**; I-30's glass 9.0.0 is tag-pinned, its PUT walled by
  an npm token = **OWNER ACT**. A repin census event that never fires leaves CC-105 blocked
  indefinitely — which is what makes Q2 live rather than academic.

**Downstream cost**:
- **Q1(a)**: one appended row ⇒ **E-3 addendum at `…/registry/CARRY-CUT-LEDGER.md`** (pinned authority
  ⇒ dated addendum, never in-place rewrite) + `COHESION.md` §4's BlobPane cell extended in place;
  unblocks the 10 identity-folds and X-W6's n.21 bounds add. **Q1(b)**: zero ledger motion, but X-W6's
  five BlobPane rows (`G3`/`G8`/`G-PAINT`) cannot discharge ⇒ X-W6 opens with five rows stranded.
- **Q2(a)**: `:202` stays out of X-W6's reach; n.21's `modify` grant must be carved to exclude the CSS
  var ⇒ **E-3 addendum at `refinement/X-W6-FOLD.md` n.21**; X-W4.g stays the receiving surface;
  open-ended hold under the glass-9.0.0 owner wall. **Q2(b)**: `waves/W8.md:107`'s CC-105 cell must
  record the var as no longer BLOCKED-ON here ⇒ **E-3 addendum at `waves/W8.md`**, carrying G-PAINT's
  caution (*"the naive retire-the-variant cure collapses the thumb to width 0"*).
- **Both**: the anti-double-book rider binds — W0.1 and S-8 are two rows on one file.

---

## D-20 — the frames obligation (appended per the seat's instruction)

**The ruling** (⟨`grep -n 'D-20' docs/tranches/V/apotheosis/OWNER-RULINGS-2026-07-20.md`⟩ → `:47`),
verbatim:
> | D-20 | **Mobile toolbar: D03A capability registry + the dock-morph candidate** (toolbar re-emerges
> as a collapsed dock state — single-screen identity, glass dock idiom). **Final form at the design
> gate, with DesignSync frames, after W-ING binds the BREATH OF LIFE corpus.** | OD-5 resolved; C3
> wave shaped |

**The frames obligation, isolated**: *"Final form at the design gate, **with DesignSync frames**,
after W-ING binds the BREATH OF LIFE corpus."* — i.e. D-20's final form may not be settled without
DesignSync frames produced at the design gate, and not before W-ING's binding.

**Where it binds in X** (⟨`grep -n 'D-20' docs/tranches/X/waves/W10.md`⟩ → `:39`), verbatim:
> | OP-1 | **CC-104 / DR-32** — DesignSync callable at open, or the owner names the substitute in
> writing and **D-20's frames obligation is amended in the SAME ruling** | Tool schema **resolves in
> this harness** (`DesignSync`, loaded 2026-08-03). Callability against a real design-system project
> is **UNPROVEN** — `list_projects` is the open probe. Ruling still owed either way. |

**The carry-cut cell** (⟨`grep -n 'D-20' docs/tranches/V/megatranche/registry/CARRY-CUT-LEDGER.md`⟩
→ `:226`), verbatim:
> | CC-104 | DR-32 (DesignSync / Fable design pathway) | reg | a ruled design gate depends on a tool
> the corpus books unavailable; the design-system project does not exist | **FOLD → the X-W10
> wave-open precondition**: DesignSync callable at open, or the owner names the substitute in writing
> and **D-20's frames obligation is amended in the SAME ruling** | DISEASE-REGISTRY:421 |

**Reading, for the orchestrator**: all three authorities agree on one clause — a substitute for
DesignSync may be named **only** in a ruling that **also** amends D-20's frames obligation, in the
same act. This is X-W10's wave-open precondition **OP-1** (`W10.md:368` spelling), which the sitting
returned UNRULED alongside S-1..S-8; it is **not** discharged by COHESION §0j.C, whose `OP-1` resolves
to `KF-OP1`, the keyframes reset (X-W0-FOLD's disambiguation — *"a disambiguation, never a re-name"*).
