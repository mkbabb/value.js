# Hardening lane — h-overrule-ledger

**Charge**: adversarial re-verification of the **R1–R11 spec-retirement ledger** (`audit/SYNTHESIS.md
§1.1` == `T.md §4`, E-3-binding). Three axes: (a) each row's "what S shipped" + the **dies/survives
split** re-verified against git + the live tree, with a hunt for over-deletion hazards (a SURVIVES
symbol that actually dies, or a RETIRES symbol still consumed); (b) the three **"unlisted overrules"
F2.1–F2.3** (t-contradictions §2) re-derived from source; (c) hunt for **MISSING rows** — any T item
that silently contradicts landed S behavior without a ledger row.

**Substrate**: `tranche-t @ 2823b2d`. Product tree (`demo/ src/ api/`) **byte-identical to `cc4f4fa`**
(`git diff --name-only cc4f4fa..HEAD -- . ':(exclude)docs/**'` = empty) — every anchor below verified
against exactly the S-close product state. `tranche-s-close` → `4a6b62b` (product-identical). `../glass-ui`
read-only. All claims resolved statically against commits + tree; no :9000 probe needed.

**Relation to `h-seam-s-state`**: that sibling lane verified the **"what S shipped" cells** (commit
existence + `git log -S` attribution + live-tree anchors) and returned CLEAN. This lane does **not**
restate that; my net-new axes are the **dies/survives consumer-graph** (over-deletion hazards), the
**F2.1–F2.3 re-derivation**, and the **§3-omission accounting** (which rows are corpus-added vs
mandate-listed). Where I re-touch an anchor it is to test a *different* property (consumer reach, not
existence).

**Verdict**: the **operative R1–R11 ledger is complete and correct** — every owner-taste overrule of a
ratified/π-certified/gate-green S spec maps to a row; no retirement is missing; the dies/survives splits
carry no over-deletion hazard. The defects are in the **provenance metadata + the source-lane's
completeness prose**, not in the binding retirements. `mustFix = 0`, `shouldFix = 2`, + 2 NOTEs (one is
the clean-bill evidence trail). This is a clean bill on the retirements themselves, **backed by the
consumer-graph + commit evidence below**, not by absence of alarm.

---

## Part A — commit attribution + dies/survives, re-verified

Every cited S-landing commit exists with the attributed subject:

| commit | subject (verbatim head) | ledger row |
|---|---|---|
| `33ba703` | feat(S.W7-4 · gamut-guarded per-view accents) | R1 |
| `d843ae7` | feat(S.W6 · W6-4 blob hero redress) | R3 |
| `fe30d68` | feat(S · owner-ruling): variance pull-back | R6 |
| `e43601c` | feat(S.W5-6 · extract) | R7 |
| `a34d20f` | feat(S.W5-6 · mix) | R7 |
| `96a12ed` | feat(S.W7-1 · the wax seal) | R9 |
| `060b7fb` | feat(S.W6 · W6-1): cold-boot seed integrity | R11 |
| `ec1b200` | refactor(demo): … extract PaletteCardSkeleton (shadow-palette name attested) | R7 evidence |

**R1 dies/survives — the over-deletion hazard tested and CLEARED.** R1 RETIRES `entryAccent` +
`resolveViewAccentTokens`/`PRIMARY_VIEW_SHIFTS`/`PRIMARY_VIEW_IDS` claiming their "sole consumer dies";
it SURVIVES `resolveViewAccent`/`resolveSealInk`/`--accent-view`/`--primary`/the `@property` sweep. I
traced the full consumer graph:
- The 9 per-view tokens `--accent-view-<id>` are read by **exactly one** live site —
  `DockViewSelect.vue:44` (`var(--accent-view-${id})`, the per-row legend). All other tree hits are
  prose comments (`viewSchema.ts:81`, `useAtmosphereBoot.ts:26/78`, `style.css:215`,
  `view-accents.ts:33/203/218`). Critically, **`useAtmosphereBoot`/`useViewAccents` WRITE the 9 tokens,
  never read them** (`useViewAccents.ts:75-89` is a `setProperty` loop). So killing the per-row legend
  genuinely orphans the whole 9-token writer machinery → the RETIRES claim is sound, **no over-deletion**.
- SURVIVES is genuinely still-consumed: `resolveViewAccent` writes `--accent-view` (`useViewAccents.ts:96`)
  → `--primary: var(--accent-view)` (`style.css:224`) → the whole app; `resolveSealInk` writes
  `--seal-ink` (`:112`) → the dock wax glyph; `@property --accent-view` at `style.css:168`. All live.

**R3 / R6 / R9 anchors** re-verified against tree: R3 `ColorPicker.vue:344-377` = the W6-4 corner-break
LAW (center-on-radius-origin `top:calc(--radius-card − --blob-fp/2)`, `(R−r)/2R ≈ 33% ≥ 25%`, `--blob-fp:
8rem` <lg hand arm — all three RETIRES clauses present; Q7 presence + slot-owned footprint token SURVIVE).
R6 `keys.ts:46-47` = `harmony:"analogous"`, `colorEnergy:0.7`. R9 `Dock.vue:337` = the rim `border: 1px
solid …--accent-view` on `.dock-seal` (the **geometric parent** grid circle), NOT on `.dock-seal-wax`
(`:342`) — R9's "+A rim on the WRONG element" is structurally confirmed.

**Missing-rows hunt — CLEAN.** Every class-B (overrule) finding in the §1.1 class census (T-2, T-6, T-7,
T-8, T-10/17, T-23, T-26, + T-13/T-28 seams) maps to a row (R4, R5, R4, R3, R1, R2, R6, R7, R9). The
class-A/C/D `dies`/`retire` items in the §1.2 gate column (W0-2 proof:* excise, W3-5 BG_LIGHTNESS
constants, W4-3 static-range retire, W6-5/W6-8, MOB-1 `style.css:435`) are bug-fixes / scope-gaps, **not
owner-taste reversals of ratified specs** — correctly carrying no R-row. No overrule is unrecorded.

**F2.1/F2.2/F2.3 re-derived from the tree** (all hold): F2.1 — `variant="specimen"` has **zero** render
consumers (only the type union at `PaletteCardSkeleton.vue:82`); the register minted S.W5-1 shipped dead;
kills `e43601c`+`a34d20f` confirmed. F2.2 — `bg-card/75 backdrop-blur-sm` at `PaletteCard.vue:19`; all **9**
pane cards ship `tier="wash"`; S-20 "one card species" = `S/audit/SYNTHESIS.md:280,298`. F2.3 — rim on the
geometric parent (above); W7-1 "INTENTIONAL" π-cert real.

---

## Findings

### F-1 · SHOULDFIX — the fold DROPPED the "(unlisted)" tag on R9, and R6 is a fourth §3-omission the corpus never flags

**Location**: `audit/SYNTHESIS.md §1.1` R9 (:58) + R6 (:55); `T.md §4` R9 (:308) + R6 (:305); source
`audit/lanes/t-contradictions.md §2` (:220) + §4 (:423-425).

**Evidence**: The mandate's §3 "Known interactions" list is **exactly 7** rows
(`MANDATE-2026-07-06.md:163-171`): T-10, T-2/7, T-23, T-6, T-8, T-1, T-9 → ledger rows R1, R2, R3, R4,
R5, R10, R11. The ledger has **11** rows, so **four are corpus-added, not mandate-listed: R6, R7, R8, R9.**
- The source lane tags **all three** F2.x as `OVERRULE (unlisted)` (`t-contradictions.md:423/424/425`).
  Through the fold into the binding ledger, the tag **survived on R7 and R8** ("unlisted by mandate §3" /
  "(unlisted)") but was **DROPPED on R9** (= F2.3) — verified byte-for-byte: `grep -c unlisted` on the R9
  cell = **0** in *both* `SYNTHESIS.md:58` and `T.md:308`, while R7/R8 = 1. So a reader of the E-3-binding
  ledger cannot tell R9 was a §3-omission; the fold lost the classification for exactly one of the three.
  This is the "suspect-seam / dropped-in-the-fold" class the hardening charge targets.
- **R6 (T-26 vs rulings 3+6) is *also* §3-omitted** and carries no marker either (`grep -c unlisted` R6 =
  0). T-26 appears in the mandate **only as finding T-26** (`MANDATE:132`), never in the §3 interaction
  list — yet it reconciles against landed ratified S state (the `analogous/0.7` pull-back at `fe30d68`),
  the identical shape §3 uses to list T-6/T-23. So the true §3-omitted set is **four** (R6/R7/R8/R9), but
  the corpus's own thesis says "**at least three MORE**" (`t-contradictions:220`) and never names R6 as
  the fourth. (Defensible only if "unlisted" is scoped strictly to *overrules* — R6 is a recalibration —
  but the ledger nowhere states that scope, and R6 sits un-annotated among rows that do carry the flag.)

**Impact**: no retirement is lost (E-3 binds to all 11 rows regardless of provenance), so this is metadata
integrity, not spec loss. But it (a) makes the §3-omission provenance illegible in the binding artefact,
and (b) *understates the corpus's own central argument* (F2.4: "§3 is a best-effort sample, not the closed
set") by one concrete example.

**Proposed amendment**: restore `(unlisted by mandate §3)` on R9 in both `SYNTHESIS.md §1.1` and `T.md §4`;
add a one-line ledger-preamble split — "of these 11, seven are mandate-§3-listed (R1-R5, R10, R11) and four
are corpus-added §3-omissions (R6 recalibration; R7/R8/R9 overrules)"; correct `t-contradictions §2:220`
"at least three MORE" to name R6 as the fourth §3-omitted reconciliation.

### F-2 · SHOULDFIX — t-contradictions §2.4's "COMPLETE spec-retirement inventory" omits R5 and R6

**Location**: `audit/lanes/t-contradictions.md §2.4` (:265-276) — folds to the T charter per its own §6
("F2.4 → the T charter, a new ledger section").

**Evidence**: F2.4 demands "a single **spec-retirement ledger** enumerating EVERY retired S
spec/ruling/π-certification **by name and delta commit**", then gives "the current inventory": W7-4 legend
(R1), W5-2-rider (R2), W6-4 (R3), W4-2 + W4-1 (R4), S.W5-6 shadow (R7), S-20 card species (R8), W7-1 rim
(R9), Q6 scope, Q4 rainbow. It **omits R5** (T-6 webbing `9%/12%` → the intensity RETIRES) **and R6**
(T-26 `analogous/0.7` @ `fe30d68` → both point values RETIRE as operative). `grep` over the inventory
lines for `variance|analogous|triad|webbing|9%|intensity|T-26|T-6` = **empty**. Both are recalibrations
that DO retire a landed value per the operative ledger's own RETIRES cells (R5 "the 9%/12% intensity
values"; R6 "both point values as targets"), so by F2.4's own stated standard they belong in "EVERY
retired … by name and delta commit."

**Impact**: the **operative R1–R11 ledger already includes R5 and R6**, so if the amend pass folds the
*ledger* (not F2.4's prose) into the charter, nothing is lost — but if it folds F2.4's enumeration as the
"complete" list, two retirements silently drop. Either way the source lane's "complete inventory" is
self-contradictorily incomplete, weakening the F2.4 argument.

**Proposed amendment**: when F2.4 folds forward, reconcile the inventory to the full 11-row R-ledger (add
R5 webbing-intensity @ the `6955fca`-era facility, R6 variance @ `fe30d68`), OR scope the sentence
explicitly to "unlisted *overrules*" and cross-reference the two recalibrations already captured as R5/R6.

### F-3 · NOTE — R9's ledger anchor `Dock.vue:330-338` under-covers the RETIRES-named "gold border override"

**Location**: `SYNTHESIS.md §1.1` R9 (:58) + `T.md §4` R9 (:308) anchor `Dock.vue:330-338`.

**Evidence**: R9's RETIRES cell names "the `.dock-seal` die-rim **+ gold border override**". The die-rim
is `border: 1px solid …--accent-view` at `Dock.vue:337` (inside 330-338), but the **gold border override**
is `.dock-seal--admin { border-color: …--color-gold }` at `Dock.vue:339-341` — **outside** the 330-338
anchor. The §1.2 finding-map row for T-28 (`SYNTHESIS.md:102`) correctly cites `Dock.vue:330-341 dies`. So
§1.1/§4 and §1.2 disagree by 3 lines, and the tighter anchor excludes one of the two things the RETIRES
cell says retires.

**Proposed amendment**: widen the R9 anchor in `SYNTHESIS.md §1.1` + `T.md §4` to `Dock.vue:330-341` to
match §1.2 and cover the named gold override.

### F-4 · NOTE (clean-bill evidence) — the dies/survives splits + missing-rows hunt returned no over-deletion hazard and no unrecorded overrule

Recorded so the amend pass does not re-litigate the retirements themselves. Verified faithful: R1's
"sole consumer dies" chain (9 `--accent-view-<id>` tokens read only by `entryAccent`; the writer
composables never read them → RETIRES safe, SURVIVES genuinely still-consumed via `--primary`/`--seal-ink`);
R3/R6/R9 anchors + their RETIRES/SURVIVES clauses; F2.1 specimen-zero-consumers; F2.2 `bg-card/75` + 9 wash
panes; F2.3 rim-on-geometric-parent. The missing-rows hunt is clean — every class-B overrule maps to a row,
and every class-A/C/D `dies`/`retire` item is correctly a bug/scope item without an R-row. **The binding
retirements are sound; only their provenance metadata (F-1) and the source-lane completeness prose (F-2)
need repair.**

---

## Scope note

Verified: the R1–R11 commit attributions (existence + subject; `git log -S` attribution owned by
`h-seam-s-state`, not re-run), the R1/R3/R6/R9 dies/survives splits against the live consumer graph
(over-deletion hunt), the F2.1/F2.2/F2.3 re-derivation from the tree, the §3-omission accounting
(mandate §3 = 7 rows; ledger = 11; four corpus-added), and the fold-fidelity of the "unlisted" tag +
F2.4 inventory. Not in scope (sibling lanes): the pixel geometry of R9's "+1.5px/−2.5px" rim claim
(`t-outline-dropdown-clip`); the Q4/Q5 rainbow-un-excise ratification (`h-q-table`); the R2/R5 S-state
recovered-lane finalization (`h-seam-s-state`, CLEARED there). Everything in scope returned faithful on
the retirements; the two SHOULDFIX defects are metadata/prose, not lost specs.
