# h-refine-hardening-wave — REFINEMENT: T.W8's E-7 protocol refined into an executable playbook

**Lane class**: hardening / refinement-design (zero product-code, zero corpus edits — the amend
pass owns folding; this file REPORTS + carries the proposed playbook annex as its amendment
payload). **The owner is the terminal authority — every refinement below is judged by one
criterion: does it make the owner's ruling CHEAP.**
**Substrate**: `tranche-t` @ `786637e`. **Product under audit**: `waves/T.W8.md` (the E-7 wave
doc) against its own spec-of-record chain (`MANDATE-2026-07-06.md §0.2` + E-7 · `SYNTHESIS §3
T.W8`/§6.1/§6.2 · `T.md §8`/§12 Q6 · `t-prompts-recap.md F2` · `t-plan-audit-2.md F18` · the
T-26/R6 bracket template) and against the LIVE tree (`demo/@/composables/viewSchema.ts`,
`audit/owner-screenshots/` — 23 PNGs on disk).
**Relation to `h-wave-w8-w9`**: that lane certified E-7 EXECUTABLE at the wave-doc level (census
enumerable · bracket format cited · loop bounded at 3 · package defined) and filed HW-1..HW-9.
This lane does not re-report those. Its charge is one level deeper: WRITE the executable playbook
the wave doc promises, and report every place the corpus stalls, under-determines, or mis-types
when you actually try. The playbook is §P; the findings the writing exposed are §F.

**Bottom line**: the E-7 skeleton is sound and the pre-filter law (F18) is faithfully carried —
but the wave doc is a CONSTITUTION, not a playbook. Executing it verbatim stalls or forks at
eight determinable points: the remediation single-writer law keys on the wrong unit (SURFACE,
where the census's own anchors share FILES); the critique↔remediation loop's iteration step is
never scheduled; the bracket template as quoted in-wave strips the T-26 poles' concrete values;
the package has no BEFORE state though the owner's own 23 shots sit on disk; the taste-axis
roster and the per-axis DEFAULT — the two devices that make a ruling cheap — have no source; the
verdict has no named home; and the loop-halt residual is untyped (a stubborn DEFECT could be
laundered into a "bracket"). 1 MUSTFIX · 7 SHOULDFIX · 4 NOTE, then the playbook.

---

## §F FINDINGS

### RF-1 — MUSTFIX — "single-writer per surface" keys the writer law on the wrong unit: the census surfaces provably share FILES, so a batch of three parallel remediation lanes can two-write one file

**Evidence.** `T.W8.md:57-58` (§Scope-2): remediation lanes land filed rows "batches of three;
**single-writer per surface**; PP-8 per batch"; `:90` (§File bounds): "the filed rows' files
ONLY, single-writer per surface, lane worktrees cut from the wave head". The census partition
(`:52-55`) is NOT file-disjoint, by the corpus's own anchors:

- **picker vs About**: T-2 is ONE finding spanning both census surfaces — "the 'Lab' title"
  (picker) and "the 'about the color spaces' title" (About) — anchored at ONE file,
  `ColorSpaceSelector.vue:35` (SYNTHESIS §1.2 T-2 row; the About host *inherits* the trigger's
  weight — t-title-typography F2). A picker pass and an About pass filing title rows both anchor
  the same file. About is furthermore literally the picker view's right pane
  (`viewSchema.ts:96-105` — `picker: { left: "color-picker", right: "about" }`).
- **picker vs boot/atmosphere/blob**: the blob seat anchors `ColorPicker.vue:344-375`
  (SYNTHESIS §1.2 T-8) and `HeroBlob` mounts inside `ColorPicker.vue` (h-wave-w2-w3's verified
  cite, ColorPicker.vue:66); the picker surface's own rows (console/readout/title) anchor the
  same shell file.
- **dock+nav+menus vs boot/atmosphere/blob**: the boot overture's B1 beat is "the dock arriving
  AS the pill" (SYNTHESIS §2 D3) — boot rows and dock rows both reach `Dock.vue`.

`T.md §3.2` solves exactly this class for the DESIGN waves with explicit cross-wave clauses and
named single-writer file sets per wave; W8 has NO analogous clause — its writer key is the
surface name, and the dispatcher has no instruction for the case two surfaces' filed rows
intersect on a file. h-dag rated the same structural class MUSTFIX at round 2 (W2∥W3 boot-chain
collision). Here the collision is not hypothetical: T-2's single shared anchor guarantees it the
moment both title rows file.
**Where**: `waves/T.W8.md:57-58`, `:90`; (SYNTHESIS §3 T.W8 block carries the same phrase
implicitly via "remediation lanes land them", `SYNTHESIS.md:366`).
**Proposed amendment** (fold into T.W8 §Scope-2 + §File bounds; carried in the playbook §P.3):
the single-writer key is the **FILE**, not the surface. At each batch cut the dispatcher derives
a **shared-file map** from the batch's filed rows' anchors (MOVE-MAP-resolved); two surfaces
whose rows intersect on any file either (a) never ride the same batch, or (b) the intersecting
rows re-home to ONE lane which becomes the file's sole writer for the wave (the T.md §3.2
"single-writer map, total" device, applied at W8 batch granularity). Lane worktrees make the
violation silent (no merge conflict until integration), so the map is derived BEFORE dispatch,
never discovered at merge.

### RF-2 — SHOULDFIX — the critique↔remediation LOOP has a bound but no scheduled iteration: §Scope is linear (passes → lanes → package); nobody re-judges a surface after its rows land

**Evidence.** `T.W8.md:47-70` (§Scope) is a one-directional pipeline: item 1 passes file rows →
item 2 lanes land them → item 3 the package assembles → item 4 the slate runs. The ONLY text
implying iteration is the triumvirate clause `:82-83`: "**loop halt**: the third
critique↔remediation iteration on any one surface halts and routes". A bound on iterations
presupposes iterations exist — but no scope item, gate row, or cadence line schedules a
RE-critique of a remediated surface. Gate 1 (`:99-100`) checks rows "landed, or booked" —
landing is a commit-existence check, not a coherence re-judgment; the oracle slate (`:104`)
sees defect rows but taste-adjacent coherence rows have no oracle by construction (that is why
passes exist). As written, an orchestrator can satisfy every gate with exactly one pass per
surface and zero verification that the landed cure reads coherent — the "iteration" the halt
clause bounds never happens, and the bound is dead text.
**Where**: `waves/T.W8.md:47-70` vs `:82-83`; `§Format + lint cadence :127-129` (batch cadence
names suites only, never a re-pass).
**Proposed amendment** (playbook §P.3): each remediation batch that lands rows for a surface is
followed by that surface's **re-critique pass** (pass_{i+1}: scope = the landed rows' intent +
whole-surface coherence, same template, same probe-only bounds). Pass numbering is per-surface;
pass-3 files NO new lanes (its residual routes per RF-8). The loop is thus: pass_1 → lanes_1 →
pass_2 → lanes_2 → pass_3 → route residual. The halt clause's arithmetic becomes real.

### RF-3 — SHOULDFIX — the in-wave bracket template strips the T-26 poles' concrete VALUES; adjective-only poles satisfy the wave doc as written

**Evidence.** `T.W8.md:63-64`: "every taste axis presented as a BRACKET with both poles named
(the T-26 template: '**too muted ← target → too strong**'; t-prompts-recap F2's law), never a
point value". But the template's authority carries MORE than the quoted arrow: SYNTHESIS R6
(`SYNTHESIS.md:55`) writes the poles as **named concrete states** — "(analogous±28°, 0.7) too
muted ← target → (triad, 0.82) too strong" — and t-prompts-recap F2 (`:142-144`) states it as
"T-26 is the template: '**more than analogous/0.7, less than triad/0.82**'". The wave doc's
abbreviation keeps the adjectives and drops the values — so a package row reading "too dim ←
target → too glary" with no reproducible state at either pole passes the wave-doc law verbatim
while defeating its purpose: the owner cannot rule cheaply inside a bracket whose ends are
adjectives (nothing to move TOWARD; the next calibration re-litigates from scratch — the exact
F2 disease). The same abbreviation recurs at `:38` and `:102` ("both poles named" with no
definition of "named").
**Where**: `waves/T.W8.md:38, :63-64, :102, :118-119` vs `SYNTHESIS.md:55` +
`t-prompts-recap.md:142-144`.
**Proposed amendment** (playbook §P.4): define **pole = a named, reproducible state**: a value
tuple (analogous±28°/0.7), a shipped commit (`fe30d68`), or an archived frame — with the
qualitative reading attached ("too muted"). A bracket row whose pole carries an adjective only
is a defective package row (same enforcement class as the existing point-value prohibition).

### RF-4 — SHOULDFIX — the certification package has no BEFORE state: the owner's own 23 shots sit on disk with a corrected map, and the package spec never pairs them with the AFTER frames

**Evidence.** The package contents are enumerated three times (`T.W8.md:37-39` completion,
`:61-67` §Scope-3, `:101-103` gate 2): annotated frames per surface · both schemes · 3 viewports
· boot screencast · bracket table · owner-line index. Every element is AFTER-state. Yet the
cheapest possible ruling aid exists on disk: the owner's own 21+2 finding screenshots
(`audit/owner-screenshots/t-*.png`, 23 files verified) — the literal images the owner judged
wanting — plus the CORRECTED shot↔finding map (SYNTHESIS §1.0; the +1 mislabel three lanes
caught, lesson 16). The corpus's own evidence discipline demands before/after: t-precepts-recap
`:96` ("enumerates the golden delta; the **π before/after** archives") and T.md §8 `:431`
("π-class visual evidence per design wave, **assembled into the W8 owner package**") — but the
W8 package spec never says the per-wave π archives arrive as BEFORE/AFTER pairs, and never
mentions the owner shots at all. An owner ruling over after-only frames must re-audit each
surface from memory; an owner ruling over (their own shot → the cured frame) pairs rules by
delta in seconds.
**Where**: `waves/T.W8.md:37-39, :61-67, :101-103, :162-167` (§Evidence packets consumed lists
"the W2–W6 wave-close artefact sets (the frames baseline)" but the baseline never surfaces in
the package spec).
**Proposed amendment** (playbook §P.4): each per-surface spread opens with the **BEFORE panel**
— the owner's shot(s) for that surface per the §1.0 CORRECTED map (never the mandate's
best-effort map), or the S-baseline π frame where no owner shot exists — beside the AFTER
frames. The per-wave π archives are the AFTER source of record (sha-stamped; re-shot only if
stale vs the close head).

### RF-5 — SHOULDFIX — "every taste axis" has no roster source: nothing in the corpus enumerates which axes the bracket table must present, so two assemblers produce non-comparable packages

**Evidence.** The package must present "every taste axis" as a bracket (`T.W8.md:38, :63`), and
gate 6 has the owner "rule per-axis inside the brackets" (`:111`) — but no document enumerates
the axes or names their source. The corpus CARRIES a determinable seed set, scattered: the §12
taste rows (Q2 field composition · Q3 seat knob · Q4 rung assignments · Q5 Palettes form · Q9
rest-authority · Q11 line-locks/×φ · Q12 ring abrogation), the wave-gate eye-judge clauses
(W2-5 "owner eye-judge frames archived", T.W2.md:54 · W3-4/W4-7 the T-23 rest-floor
[0.45, 0.65] bracket · W6-1 netting re-judged on the W3 plate), and the R6/T-26 bracket itself.
Unsourced, the assembler improvises: a 3-axis table (under-presents; silent taste-by-default)
or a 40-axis table (the owner's ruling stops being cheap). Both defeat the wave.
**Where**: `waves/T.W8.md:38, :63-64, :111`; the scattered seeds per the cites above.
**Proposed amendment** (playbook §P.4 table 2): the bracket table's axis roster = (a) every §12
row the owner ruled with an in-bracket/taste shape, re-presented with its LANDED value; (b)
every wave-gate eye-judge clause (each carries its archived frames); (c) axes minted by critique
passes (each new axis cites the owner-line it answers — an axis with no owner-line routes to
the triumvirate as a bounds question). Roster size is bounded: (a)+(b) is ~12 rows today;
pass-minted additions are the only growth.

### RF-6 — SHOULDFIX — the ruling grammar lacks the corpus's own proven cheap-ruling device: a per-axis DEFAULT column and a one-line bulk approval

**Evidence.** Gate 6 (`T.W8.md:110-112`) gives the owner three verbs — "approve / rule per-axis
inside the brackets / file further rows" — over a bracket table with no stated default per axis.
The corpus's own ratification precedent is explicit about why defaults matter: `T.md §12:506`
"**DEFAULT = the synthesis's recommendation**" — the §12 gate is cheap precisely because the
owner can approve defaults wholesale and spend attention on exceptions (the S ratification did
exactly this: 11 rows, 5 flips). The W8 package as specified forces O(n) per-axis rulings with
no bulk verb.
**Where**: `waves/T.W8.md:110-112`; precedent `T.md:506-509`,
`S/audit/RATIFICATION-2026-07-05.md` (the S encode).
**Proposed amendment** (playbook §P.4/§P.5): every bracket row carries **LANDED (the default)**
at the arrow's center; the package cover sheet carries the one-line bulk verb — "approve all
defaults except the rows ruled below" — plus the per-axis verbs APPROVE / MOVE(value-in-bracket)
/ ROW(file a further row). Unruled-in-full still leaves the wave OPEN (`:112` unchanged).

### RF-7 — SHOULDFIX — the package and the verdict have no named file homes; W9 consumes "the owner's verdict (encoded)" by faith

**Evidence.** `T.W8.md:91` places the package at "`docs/tranches/T/audit/` (the certification
package + frames index)" — a directory, no name. `:139-143` (§Commit plan): "the owner-verdict
encoding commit (the verdict lands verbatim in **the record**, the S ratification precedent)" —
"the record" is unnamed. `T.W9.md:171` consumes "the owner's verdict (encoded)" with no path.
The S precedent IS named for the §12 gate (`PROGRESS.md:7`: `audit/RATIFICATION-<date>.md`
"whose §0 wins") — the W8 verdict, an equally binding owner ruling, has no analogous home. Six
session-limit walls into this tranche, an unnamed load-bearing artefact is exactly the class of
thing that lands in a commit message and vanishes from the next recovery's inventory.
**Where**: `waves/T.W8.md:91, :139-143, :131-137`; `waves/T.W9.md:171, :186-190` (§Evidence
packets consumed omits any package path).
**Proposed amendment** (playbook §P.4): fix the homes now —
`docs/tranches/T/audit/w8-certification/PACKAGE.md` (+ `frames/<surface>/…`, indexed in-file)
and `docs/tranches/T/audit/w8-certification/VERDICT-<date>.md` (verbatim; its §0 wins over the
package — the S ratification grammar). T.W9's evidence list cites both by path.

### RF-8 — SHOULDFIX — the loop-halt residual is untyped: "the residual becomes a package bracket" launders a third-iteration DEFECT into a taste question

**Evidence.** `T.W8.md:82-83`: the third iteration "halts and routes (the residual becomes a
package bracket for the owner, not a fourth lane pass)". A bracket is a TASTE instrument. But a
surface can churn three iterations on a DEFECT-class row (Class A/C/D — an oracle-visible wrong,
a producer-gated gap, a scope hole). Routing such a residual "as a bracket" presents a bug to
the owner as if it were a preference — the precise mis-filing `T.md §9` lesson 18 warns kills
("Mis-filing a bug as taste buries a live prod defect", R11's lesson). Gate 1 already carries
the honest alternative for defect rows: "booked with rationale on the record" (`:99-100`).
**Where**: `waves/T.W8.md:82-83` vs `:99-100` + `T.md:498-500` (lesson 18).
**Proposed amendment** (playbook §P.3): the halt routes BY CLASS — TASTE residual → a package
bracket row (both poles named per RF-3); DEFECT residual → a BOOKED row with rationale, carried
to the W9 books hand-off (`T.W8.md:157` already opens this door); PRODUCER residual → the
letter/inbox (the `:123` fence). The triumvirate types the residual when the pass cannot.

### RF-9 — NOTE — the census rows never mark which surfaces REQUIRE the headed-GPU probe class; "real GPU where it matters" defers the one judgment that must not be deferred

`T.W8.md:50` ("real GPU where it matters — the O-3 probe class") leaves per-surface GPU need to
the pass author — but h-oracle-slate already flagged the O-3 run-owner/cadence hole, and a
static-frame judgment of an aurora/WebGL surface is precisely the "never a static-frame-only
judgment" breach the same sentence forbids. The playbook census (§P.1) pre-marks the GPU class:
**boot/atmosphere/blob (REQUIRED — aurora + WebGL blob)** · **picker (REQUIRED — live field
ground + spectrum canvas + seat hover beats)** · gradient (recommended — plate + netting over
the field) · all others headless-sufficient. Pre-marked, a dispatcher cannot silently
under-probe the flagship surfaces.

### RF-10 — NOTE — surfaces have no DRIVE RECIPES, and the four population-keyed findings (T-14 · T-18/T-24 · T-23) dissolve into view-keyed passes without standing cross-cut checks

Item 1 commands "drive the owner-visible surface live" but no row says HOW (route, hash,
precondition). HW-7 flagged admin's fixture; the gap is general — boot is not a route but a
reload ritual (cold + returning-user, the O-2/O-3 preconditions); the dialog is an action;
easing is a sub-surface of the gradient view. And four owner findings are POPULATIONS, not
views: T-14 (all card transitions), T-18/T-24 (all glass materials/neutrals), T-23 (every pane
header at rest). A view-keyed census with no cross-cut rows lets each pass judge its slice and
nobody judge the population — the S named-site-not-population disease (lesson 14) re-entering
through the critique wave itself. The playbook census (§P.1) carries a drive-recipe column; the
pass template (§P.2) carries four STANDING cross-cut checks every pass must run (motion / neutrals
/ header-at-rest / contrast-spot), and the package presents those four as TRANCHE-level axes,
never per-surface fragments.

### RF-11 — NOTE — "the Q14 adjudication material" has no shape; the annex should reuse the §12 DEFAULT/alternatives grammar

`T.W8.md:66-67` puts the Q14 material "in the package" with no form. The owner is to adjudicate
budget/preset pairing — another ruling that should be cheap. The playbook (§P.4 item 5) gives it
one page: the PI-1 per-wave Lighthouse delta ledger (every wave's row), the run-of-record figures
(LCP 5563ms / TBT 5618ms, run `28836873580`), RP-2/L20 state at package time, and the decision
presented in the §12 grammar — DEFAULT (keep budgets red + ledger) vs live alternatives
(re-baseline / desktop preset), verbatim from `SYNTHESIS §8 Q14`.

### RF-12 — NOTE — pass records and the remediation-row ledger have no file convention

`T.W8.md:131-137` requires "the per-surface pass records (verdict + rows)" and "the remediation
row ledger (row → landed commit / book)" saved at close, with no paths. Six-wall recoveries lose
exactly the artefacts that have no canonical address (the PP-14 journal lesson). Playbook fixes:
`docs/tranches/T/audit/w8-certification/passes/<surface>.p<i>.md` (one file per pass iteration)
and `…/ROWS.md` (the single row ledger, append-only: row-id · surface · class · anchor · lane →
commit/book/bracket). PROGRESS.md cites the directory once.

---

## §P THE PLAYBOOK (the refinement product — proposed as T.W8's executable annex; the amend pass owns folding, e.g. as `waves/T.W8-PLAYBOOK.md` or an in-file §Playbook)

Everything below composes ONLY ratified corpus law — census (`T.W8.md:52-55`), batches of three
(E-6), the F18 pre-filter law, the F2/T-26 bracket law, the loop bound (`:82-83`), the
non-authoring assembler, gate 6 — plus the RF-1..RF-12 amendments above, marked where they bind.

### P.1 The surface census of record (12 rows; re-derived at wave-open against the live tree + the W1 MOVE-MAP — this table is the wave-open SEED, not a substitute)

Live-tree ground: `viewSchema.ts:35-49` names 14 ViewIds (9 primary + 5 admin). Every ViewId
maps into a census row (verified: picker+About = `picker`; palettes/browse+dialog = `palettes`,
`browse`; extract/mix/generate/gradient = themselves; easing = the gradient view's editor
sub-surface; boot/atmosphere/blob = the reload ritual + `atmosphere` + `blob`; admin = the 5
admin-* views). Before-shots follow the SYNTHESIS §1.0 CORRECTED map, never the mandate's
best-effort map (lesson 16).

| # | Surface | Drive recipe | Owner findings | Before-shots (corrected) | Owner-line anchors (mandate §0) | GPU (RF-9) |
|---|---|---|---|---|---|---|
| S1 | picker | route `picker`, left pane; drive sliders/readout/captions | T-2(half) T-4 T-5 T-7 | t-2000-27 (caption strip, §1.0) · t-2000-41 (T-5 sliders) · t-2001-51 (T-4 twin) · t-2002-09 (T-7 readout) | "Lab" title ×1.5 · "bottom text area … dynamic" · "properly contrasted … vertical ring … little glass card" · "numbers … contigulously" | **REQUIRED** |
| S2 | About | route `picker`, right pane; incl. the color-space reference pages it hosts (markdown/katex — HW-6: name-or-exclude at wave-open) | T-2(half) T-3 | t-2002-52 (T-3 sliver per §1.0) | "about the color spaces" title · "a bit too transparent … more cartoon" | no |
| S3 | palettes/browse + dialog | routes `palettes` + `browse`; open PaletteDialog; drive search | T-11 T-12 T-13 T-15 T-19 (T-20 = W7 re-judge note) | t-2004-55 · t-2005-08 · t-2005-53 · t-2006-46 · t-2008-34 · t-2008-51 | "Too glassy is this card" · "search area no styled the same" · "What happened to the shadow palette" · "This font is not right" · "shadow palette … in all cases" | no |
| S4 | extract | route `extract`; drop an image; drive the live-k ghost | T-19 host class | — | (shadow-palette line, host class) | no |
| S5 | mix | route `mix`; drive both source selectors | T-19 host class ×2 | — | (shadow-palette line, host class) | no |
| S6 | generate | route `generate`; open preset/harmony menus | T-16 T-17(partial) | t-2006-56 · t-2007-15/18 | "strange bottom left corner element" · "drop downs … color previews" | no |
| S7 | gradient | route `gradient`; drive stops + the rail | T-6 T-21 | t-2002-09 (T-6 sliver) · t-2009-29 | "gradient netting … more visible" · "buugged out … bottom bar … too short" | recommended |
| S8 | easing | route `gradient` → the easing editor | T-22 | t-2009-51 | "This area in easing is still a mess" | no |
| S9 | dock + nav + menus | every route; open view-select + Tools; the seal states | T-9 T-10 T-17 T-28 T-29 | t-2004-10 (T-9, §1.0) · t-2004-32 (T-10, §1.0) · t-2211-04 · t-2210-56 | "banner … removed" · "Only 'palletes' … rainbow" · §0.4 both lines | no |
| S10 | boot/atmosphere/blob | the RELOAD RITUAL (cold + returning-user, O-2/O-3 preconditions, both schemes) + routes `atmosphere`, `blob`; the blob judged at its About-host seat | T-1 T-8 T-25 T-26 T-27 | t-1959-21 · t-2004-10→(T-8 per mandate; §1.0: blob burial also at t-2002-52) | §0 sync line · §0 blob line · §0.1 · §0.3 | **REQUIRED** |
| S11 | admin | the `smoke-admin` addInitScript fixture (HW-7); all 5 admin-* views | (none — coverage + the admin-gold exception ledger) | — | — | no |
| S12 | reference doc pages (`assets/docs`, 11 pages) | via S2's host; DISPOSITION ROW: name-or-exclude-with-reason at wave-open (HW-6) | — | — | — | no |

**Standing cross-cut checks** (every pass runs all four; packaged as TRANCHE-level axes — RF-10):
XC-1 motion (T-14: transitions on the liquid family; the F6 KEEP set intact) · XC-2 neutrals
(T-18/T-24: the C3 law + exception ledger; rung membership) · XC-3 header-at-rest (T-23: the
rest-floor bracket state on THIS surface's header) · XC-4 contrast spot (the O-18 class at the
owner's reference color).

### P.2 The critique-pass template (verbatim-fillable; one file per pass — RF-12's home)

```markdown
# W8 pass · <surface Sn> · iteration <i of ≤3> · <date> · tree @ <sha>
DROVE: <recipe from P.1> at 390 · 1024 · 1440 × light · dark [× headed-GPU if P.1 marks REQUIRED]
JUDGED AGAINST: doctrine rows <D-#s applicable> · owner lines <the P.1 anchors, read verbatim
  from MANDATE §0> · the §4 retirement ledger (nothing retired may be cited as a defect)
VERDICT: COHERENT | ROWS-FILED        <!-- never "beautiful"/"certified" — lesson 12 -->
CROSS-CUTS: XC-1 <state> · XC-2 <state> · XC-3 <state> · XC-4 <state>
ROWS:
| id | class (A-defect/B-taste/C-book/D-scope) | anchor (file:line, MOVE-MAP-resolved) | seen by (O-# | NEW→triumvirate) | route (lane / packet / book) |
AXES OBSERVED (feeds the P.4 roster; each pole a NAMED STATE — RF-3):
| axis | pole-LOW (state) ← LANDED → pole-HIGH (state) | owner-line answered |
```

Binding rules: probe-only (`T.W8.md:89`); a row contradicting a §12 ruling or §4 retirement
HALTS to the owner (`:76-77`); producer-owned rows route to the letter/inbox, never demo forks
(`:58, :123`); a NEW-oracle row is a bounds expansion → triumvirate (`:79-81`).

### P.3 The remediation loop (bound = 3; iteration made real — RF-1/RF-2/RF-8 folded)

1. **Batch cut**: group filed rows by surface into lanes; ≤3 lanes per batch (E-6). Derive the
   **shared-file map** from the batch's row anchors; lanes intersecting on any file never ride
   one batch, or the intersecting rows re-home to ONE lane — the single-writer key is the FILE
   (RF-1). Lane worktrees from the wave head; PP-8 + `lint`/`typecheck`/`test` per batch;
   playwright per batch touching e2e-covered surfaces (`:127-129`).
2. **Re-critique**: each surface whose rows landed gets pass_{i+1} (same template; scope = the
   rows' intent + whole-surface coherence) — RF-2. A lane never re-judges its own landing.
3. **Bound**: max 3 passes per surface. Pass-3 files NO new lanes; its residual routes BY CLASS
   (RF-8): TASTE → a package bracket row · DEFECT → a booked row with rationale (→ the W9
   books hand-off) · PRODUCER → the letter/inbox. The triumvirate types ambiguous residuals.
4. **Worst-case arithmetic** (bounded, PP-10): 12 census rows → 4 pass-batches per iteration
   round; ≤3 rounds → ≤36 pass-slots + the remediation batches; the oracle slate + budgets +
   Lighthouse delta run ONCE at package assembly (`:129`).

### P.4 The certification package (exact shape — RF-3/RF-4/RF-5/RF-6/RF-7/RF-11 folded)

**Home** (RF-7): `docs/tranches/T/audit/w8-certification/` —
`PACKAGE.md` · `frames/<surface>/…` (indexed in PACKAGE.md) · `passes/<surface>.p<i>.md` ·
`ROWS.md` · `VERDICT-<date>.md`. Assembled by a NON-authoring agent = an agent that authored no
W2–W8 design/remediation code; it may annotate and index, never re-judge, never convert a
bracket to a point (`:117-119`).

**PACKAGE.md table of contents**:

- **§0 COVER SHEET** (one page — the cheap-ruling device, RF-6): the axis count; the three
  verbs — **APPROVE** (= the landed default) · **MOVE** (a value inside the bracket) · **ROW**
  (file a further row; re-enters P.3 re-bounded); the bulk line "approve all defaults except the
  rows ruled below"; the reminder that a package delivered but unruled leaves the wave OPEN
  (`:112`, unchanged).
- **§1 THE BRACKET TABLE** — one row per axis; roster per RF-5 = every §12 taste row
  (Q2/Q3/Q4/Q5/Q9/Q11/Q12) with its landed value + every wave-gate eye-judge clause (W2-5 field
  frames · the T-23 rest floor [0.45,0.65] as re-judged at W4-7 · the W6-1 netting band on the
  W3 plate) + pass-minted axes. Row grammar (poles are NAMED STATES — RF-3):

  `| axis | surface | pole-LOW (state) ← LANDED (default) → pole-HIGH (state) | owner-line | provenance (W-item/pass) | RULING (blank) |`

- **§2 PER-SURFACE SPREADS** (the census order): **BEFORE panel** — the owner's shot(s) per the
  §1.0 corrected map, or the S-baseline π frame (RF-4) → **AFTER panel** — annotated frames at
  390 · 1024 · 1440 × both schemes, sourced from the per-wave π archives (sha-stamped; re-shot
  only if stale vs the close head) → **PROSE CAPTION, ≤5 lines**: what changed, which T-#s it
  answers, the landed values. Prose serves the frames; it never argues.
- **§3 THE BOOT SCREENCAST** (path) + the O-3 headed-GPU record (both schemes; the S10 ritual).
- **§4 THE ORACLE + BUDGET STATE**: O-1..O-25 green / honest EXPECTED-RED with packet cites; the
  §6.2 budget rows; the fresh Lighthouse delta appended to the PI-1 ledger (`:104-107`).
- **§5 THE Q14 ANNEX** (RF-11): the PI-1 delta ledger · the run-of-record figures · RP-2/L20
  state · the decision in the §12 grammar (DEFAULT: budgets stay red + ledger; alternatives:
  re-baseline / desktop preset — `SYNTHESIS §8 Q14` verbatim).
- **§6 THE BOOKED-ROWS LEDGER**: every remediation row booked-not-landed, with rationale
  (gate 1's second arm), pre-formatted for the W9 books hand-off.

### P.5 The owner ruling + encode (gate 6 made cheap)

The owner rules on §0's verbs — a single "approve all defaults" line is a COMPLETE ruling; MOVE
and ROW verbs are exceptions by construction. The ruling lands verbatim in
`VERDICT-<date>.md` (§0 wins over the package — the S ratification grammar, RF-7); the encode
commit is the `:141-142` owner-verdict commit; ROW verbs re-enter P.3 as a fresh iteration
(bounded again at 3); T.W9 consumes the verdict + package BY PATH. THE OWNER'S VERDICT IS THE
GATE — nothing in this playbook softens `:110-112`.

---

## §CLEAN (verified sound while writing the playbook — evidence, not absence of alarm)

- **The census is TOTAL over the live view schema**: all 14 `ViewId`s (`viewSchema.ts:35-49`)
  map into the 11 default surfaces (verified row-by-row in P.1) — h-wave-w8-w9's T-#-coverage
  check extended to the ViewId axis; the only unmapped owner-visible tree is the HW-6
  reference-pages set, carried as P.1's S12 disposition row.
- **The F18 pre-filter law survives every playbook move**: no step above lets any agent certify
  taste; the pass VERDICT vocabulary is closed (COHERENT | ROWS-FILED); the assembler is
  defined non-authoring; the three ruling verbs keep the owner terminal.
- **The batches-of-three law (E-6) composes with the loop**: P.3's arithmetic closes (≤36
  pass-slots worst-case, 4 batches per round) — the wave is boundable without weakening the
  3-iteration halt.
- **Gate 6's "unruled = OPEN" is preserved verbatim** — the cheap-ruling devices (defaults,
  bulk verb, before/after pairs) reduce the owner's COST, never the owner's AUTHORITY.
- **The retired-spec fence holds in the template**: P.2 binds every pass to the §4 ledger
  ("nothing retired may be cited as a defect"), closing the `:120-122` prohibition into the
  fillable form itself.

---

*Lane artefact of the T hardening fleet. Findings RF-1..RF-12; the §P playbook is the proposed
amendment payload for T.W8 (folding owned by the amend pass). Zero corpus/product edits made.*
