SERVED MODEL: claude-opus-5[1m]

# F.W0 — Re-ground the substrate (frontend half) — EXECUTION RECORD

Track C · X·F (fourier-analysis). Spec: `docs/tranches/X/fourier/waves/F-W0.md` (599 lines, read whole).
Authorities of order: `EXECUTION-RUNBOOK.md` §1.3 (edges) · §3.4 (locks) · §5 (seat law) ·
`COHESION.md` §0i + §0j (every owner-gated item in this spec is RULED at §0j.D).

---

## Open

**Date**: 2026-09-17. **Opened by**: seat 0 (OPEN), on the owner's begin-word (COHESION §0j, verbatim).

### Preconditions — verified at the bytes AND in the ledger

F-W0 §1 `Opens after`: *"tranche X's execution gate lifts (owner begin-word for the X·F lane).
**No predecessor wave** — this is X·F's first *executing* file."* Runbook §1.3: *"F.W0 FIRST,
unconditionally; the pre-gate wave"*; §1.0's Track-C root set is `{F.W0}`.

| condition | receipt | verdict |
|---|---|---|
| Owner begin-word given | `COHESION.md` §0j, quoted verbatim 2026-09-17 | **MET** |
| Pre-acts P-1 · P-2 · P-3 CLOSED | `execution/LEDGER.md` §Pre-acts — `642a0098` · `fd40535c`+`0bed8379` · §0j | **MET** |
| No predecessor wave in the ledger | Track C table: F.W0 is the head; every other Track-C row `opens after` F.W0 (or deeper) | **MET** |
| Adjudicated fourier registry whole (66/66) | ⟨cmd⟩ `ls docs/tranches/V/megatranche/registry/adjudicated/fr-*.md \| wc -l` → **66** | **MET** |
| `INTAKE-ADJUDICATION-2026-08-03.md` present | ⟨cmd⟩ `ls …/audit/codex-provenance/INTAKE-ADJUDICATION-2026-08-03.md` → path returned | **MET** |
| `intakes/lane-fourier-r3-r6.md` present (the bare `R3-*` home, `:78`) | ⟨cmd⟩ `ls …/audit/codex-provenance/intakes/lane-fourier-r3-r6.md` → path returned | **MET** |
| `formation/fourier/CENSUS-2026-08-03.md` + `lane-frontend.md` present | ⟨cmd⟩ `ls …/formation/fourier/` → both returned | **MET** |
| Census of record FROZEN at its pinned digest | ⟨cmd⟩ `shasum -a 256 docs/tranches/X/fourier/conformance/CENSUS-CANONICAL.md \| awk '{print substr($1,1,12)}'` → **`f44362757458`** — identical to the digest §3/§3b/§8 pin | **MET** |
| S-3 cure present as a dated addendum-beside the NON-EDGE row (orchestrator note) | `F-W0.md` §6b, the **X·P (parse-that)** row: the NON-EDGE declaration stands unaltered, with the dated 2026-08-30 addendum adopting the consumption predicate **by predicate name** (`RC-P`, evaluated per `parse-that/RELEASE-CONDITION.md` §6a against registry coordinate `V`, *"never a wave number"*) | **PRESENT** |
| Owner-gated items RULED, never presumed | §0j.D: **OG-F1** freeze-with-adoption + worktree-as-baseline · **OG-F2/OG-V2** Codex-era-specific · **G-10** DELETE both in one breath · **G-15(a)** LAND / **(b)** the 1.125rem root GOES / **(c)** FROZEN-FOREVER + golden-file diff / **(d)** UNDECIDABLE + falsifier · **G-F7-1** NO TRIE (F.W7's, cited not consumed here) | **MET** |

**No precondition failed. F.W0 opens.**

### Mail sweep (E13 Step-0, runbook §5.3) — four paths

Run read-only, 2026-09-17, at this seat. Newest item per path, compared against **every** row of
`docs/tranches/V/coordination/INBOX.md`:

| # | path | newest | rowed? |
|---|---|---|---|
| 1 | `docs/tranches/V/` + `docs/tranches/V/coordination/` | `INBOX.md` (this ledger — self-excluded under the self-count law); next `value-inbox-2026-07-20-bbnf-coordination.md`@2026-07-21 | **YES** — outbound drafts of ours, none addressed to value.js |
| 2 | `../glass-ui/docs/tranches/BK/coordination/` | `glass-outbound-2026-08-29-valuejs-o20-ack.md`@2026-08-29 16:41 | **YES = I-30** |
| 3 | `../keyframes.js/docs/tranches/V/coordination/` | `VALUEJS-INBOUND-2026-07-27-library-band-r1-widened-k1-k4.md`@2026-07-27 | **YES** (ours, outbound) |
| 4 | `../sci-report/atlas/docs/tranches/P/coordination/` | `valuejs-inbound-2026-07-27-library-band-export-delta.md`@2026-08-03 | **YES** (ours, outbound) |

**BK confirmed still the newest glass-ui tranche dir** — ⟨cmd⟩ `ls -ldt docs/tranches/*/` in
`../glass-ui` → `BK/`@2026-09-17 12:28 ahead of `BJ/`@2026-08-03; ⟨cmd⟩ `find . -maxdepth 2 -type d
-name coordination -newermt '2026-08-01'` → `./BK/coordination` · `./BJ/coordination` only.

**Delta since the P-1 begin-word round**: ⟨cmd⟩ `find <the four paths> -maxdepth 1 -type f -newermt
'2026-09-16'` → **`value.js/docs/tranches/V/coordination/INBOX.md` alone** — the P-1 sweep line
itself. **0 unrowed letters. Nothing new to row. I-30 remains the ledger tail.** A dated sweep line
is appended at the file end.

**In-scope mail carried into this wave, not new**: I-30's routing clause (c) — *"OWED AT THE X·F END…
F.W0's FR-NP-32 pre-gate **keeps its BLOCKER** (measured at the adopted 4.0.0, still true in those
bytes) and gains the producer-side terminus this ACK supplies"* — is **already discharged in the spec**
at §3 row 1's dated 2026-09-17 addendum-beside. Nothing is owed back: the letter asks nothing.

**The wave's OWN mail surface** (fourier-side, G-3's object) is inventoried in the baseline below:
three extant 2026-05-29 letters, **untriaged**, no ledger. They become UNREAD mail on the day the
ledger exists — which is why G-3's triage-at-creation clause is a gate clause and not a courtesy.

---

## Baseline — the fifteen gates, run READ-ONLY, banked BEFORE any cure

Commands run from `/Users/mkbabb/Programming/fourier-analysis` (or `web/` where stated), BSD binaries
at `/usr/bin/` per §4's PORTABLE-COMMAND LAW (R4-2). **No `npm ci`, no build, no write, no `stash`,
no `reset`** — the tree is untouched by this seat. Volatile counts **double-run** (write-then-measure);
both passes agreed on every figure.

| gate | verdict | measured |
|---|---|---|
| **G-1** — 28-path M.W1a tree SETTLED | **RED-AS-EXPECTED** | `m/w1-bump-migration` · `cd26c65` · porcelain **28** = **27 ` M` + 1 `??`** (double-run: 28, 28). No `SUBSTRATE-LEDGER.md`, so no path carries a disposition |
| **G-2** — the O-14 letter COMMITTED | **RED-AS-EXPECTED** | `git ls-files docs/tranches/N/valuejs-inbound-2026-07-27-facility19-migration-table.md` → **empty**; file on disk 11,041 B, Jul 27 12:30 — the sole `??` row |
| **G-3** — the mail seat + root CLAUDE.md | **RED-AS-EXPECTED** | `ls …/fourier-analysis/CLAUDE.md` → *No such file or directory*; `ls …/docs/tranches/F/coordination/INBOX.md` → *No such file or directory*. **The surface is NOT empty**: `ls …/F/coordination/` → three letters, `head -1` each → *"# F — operator-window runbook (F.W3 binding)"* · *"# F-T-N1 — coordination ASK: drop the legacy `status` field from `FormattedPalette`"* · *"# F — vhost-correctness spec (inv-22 binding; F.α first land)"* — all **untriaged** |
| **G-4** — adopted producer stylesheet PARSES | **RED-AS-EXPECTED** (producer-owned) | installed `@mkbabb/glass-ui` = **4.0.0**; `grep -o '/\*' web/node_modules/@mkbabb/glass-ui/dist/styles/index.css \| wc -l` → **17**, `grep -o '\*/' …` → **8** (double-run: 17/8, 17/8). `web/src/style.css:1-3` = `@import "tailwindcss";` / `"tw-animate-css"` / **`@import "@mkbabb/glass-ui/styles";`** — the live import, confirmed. postcss repro half **UNRUN** (a toolchain act) |
| **G-5** — `npm ci && npm run build` completes | **RED-AS-EXPECTED** | `git ls-files web/dist \| wc -l` → **0**; `ls -ld web/dist` → present, **`Jun 12 18:13`**. Build act-half **UNRUN** (blocked on G-4; seat law) |
| **G-6** — manifest gate AUTHORED + born-RED facts MEASURED | **RED-AS-EXPECTED** | `dependencies` = the 11 named in §4. `devDependencies` carries **the five runtime devDeps** — `class-variance-authority · clsx · lucide-vue-next · reka-ui · tailwind-merge`. **`vaul-vue`, `@lucide/vue`, `embla-carousel-vue` are in NEITHER block** (three separate `false` probes); lock holds **0** `node_modules/vaul-vue` and **0** `node_modules/@lucide/vue`. Committed manifest (ABANDON-branch operand) `git show HEAD:web/package.json` → glass-ui **`^3.1.0`** · keyframes **`^2.2.0`** · value.js **`^0.10.0`**. No gate text exists (`SUBSTRATE-LEDGER.md` absent) |
| **G-7** — unused-code gate + lint floor, WIRED | **RED-AS-EXPECTED** | `web/tsconfig.json` = **13** compilerOptions, exactly the thirteen §4 names; `grep -c 'noUnusedLocals\|noUnusedParameters\|noUncheckedIndexedAccess'` → **0**. `scripts` = `dev \| build \| preview \| test:e2e \| test:e2e:ui` — **no `lint`**. No eslint/prettier in either block |
| **G-8** — type gate covers build config + specs | **RED-AS-EXPECTED** | `include` = `["src/**/*.ts","src/**/*.d.ts","src/**/*.vue","env.d.ts"]`; **exactly one** tsconfig in `web/`. `web/e2e/*.spec.ts` = **8** (double-run: 8, 8) — contour-extraction · gallery · paper-performance · settings-persistence · visual-baseline · visualization-crud · visualization-ux · workspace-flow. **The banked 8 is confirmed live; any 7-spec figure is superseded and forbidden** (→ G-12) |
| **G-9** — unit-runner SEAT | **RED-AS-EXPECTED** | `grep -c 'vitest' web/package.json` → **0**; no unit runner in `scripts` (see G-7) |
| **G-10** — F8-REACH-01/02 ruled in one breath | **RED-AS-EXPECTED** | `web/src/components/equation/InfoCard.vue` present, 1,516 B, **` M`**; `web/src/components/visualization/CanvasOverlayButton.vue` present, 595 B. Deadness re-confirmed live: `grep -rn 'CanvasOverlayButton' web/src` → **0**, `grep -rn 'InfoCard' web/src` → **0**. No ruling exists |
| **G-11** — ONE corrected anchor table | **RED-AS-EXPECTED** | `ls docs/tranches/F/SUBSTRATE-LEDGER.md` → *No such file or directory* — the artefact that would carry the table does not exist |
| **G-12** — ONE corrected-denominator table | **RED-AS-EXPECTED** | same absence; the live e2e denominator measures **8**, so the table's headline row is measurable but unpublished |
| **G-13** — producer pin re-derived at the ADOPTED commit | **RED-AS-EXPECTED** | producer `package.json` reads **9.0.0** (the spec's "8.0.0" witness, superseded upward — satisfies runbook §2.3's *"8.0.0+"*). Declared consumer pin **`^4.0.0`**; installed consumer **4.0.0**. **The pin cell is the COMMIT HASH** (P-4): `git -C ../glass-ui rev-parse --short=8 'v8.0.0^{commit}'` → **`17a11bc5`** — the ESC-1-ruled adoption target (§0i.3), resolving exactly. No pin table exists |
| **G-14** — Codex residues + worktrees DISPOSITIONED | **RED-AS-EXPECTED** | `ls /tmp/fourier-r4-files.sha256` → *No such file or directory* (**evaporated**, as §1d.3 records). `ls ~/.codex/worktrees` → **`7e28` · `9167` · `d0be`** — three, unchanged. `docs/constellation/tri-tranche-run/RUN-BOARD.md` → **` M`**, undispositioned |
| **G-15** — the four contradictions RULED in writing | **RED-AS-EXPECTED** | no `SUBSTRATE-LEDGER.md`, so none of (a)–(d) is written. (a)'s **read-only leg runs today**: `git show HEAD:web/package-lock.json` resolves typescript **5.9.3** / vue-tsc **2.2.12** — the committed compiler default for `noUncheckedSideEffectImports` is **false**, exactly as §4 G-15(a)(1) states; `ci.yml:95` and `deploy-pages.yml:114` both read `npx vue-tsc -b --force`. (b)'s witness is live: `web/src/style.css:40-50` = `html{font-size:1.125rem}` with the `@media (min-width:768px)` reset to `1rem` |

**15 of 15 RED. `greenBeforeCure` = ∅.** (R.2 satisfied: no gate is green before its cure.)

### Divergences measured at this open — facts for the units, never rulings

**D-1 · G-4's `(src is 15/6)` parenthetical does not resolve.** ⟨cmd⟩ `ls web/src/styles/index.css` →
*No such file or directory*; `ls web/src/styles/` → the directory itself is absent. The comparison
sheet the parenthetical names is gone from the tree; the gate's own operand — the **installed producer
dist**, 17/8 — is unaffected and RED. **Already convicted and dated at P-2** (`BASELINE-2026-09-17-kf-fourier.md`
§3 A-1); re-measured here and identical. **Not a gate flip**: G-4's GREEN is defined against the
producer sheet, never the src sheet. Carried to unit **e** for the G-11 anchor table as a
drift-correction row.

**D-2 · G-13's producer HEAD has drifted again, as the gate predicts.** ⟨cmd⟩ `git -C ../glass-ui
rev-parse --short=8 HEAD` → **`e91b7b7e`**, this seat, 2026-09-17 — beyond the eleven drifts §4 G-13's
receipt records. **Banked as a dated reading, never a live fact** (R3-3.10; the gate's MEASURE-AT-OPEN
clause is the cure and the drift is its evidence). The **pin cell is `v8.0.0^{commit}` = `17a11bc5`**,
which is stable by construction because it is a tag-resolved commit, not a HEAD.

**D-3 · G-10's count word diverges between the ruling and the spec; the enumeration governs, and the
live tree agrees with the enumeration.** `COHESION.md` §0j.D rules *"with FR-COB-17's 8-site
`:aria-pressed` lift in the **same commit** using **L's list (seven sites)**, not C's"* — the
parenthetical says **seven**, while `F-W0.md` §2a and §4 G-10 both enumerate **eight**: CanvasControlsDock
×5 (`:54/:59/:71/:77/:87`) · EditorControlsDock ×2 (`:143/:148`) · ConvergenceTimeline ×1 (`:61`).
**All eight resolve at the live tree**, measured this seat: ⟨cmd⟩ `grep -n "'is-active'"
web/src/components/visualization/CanvasControlsDock.vue \| awk -F: '{print $1}'` → **54 59 71 77 87**;
same over `EditorControlsDock.vue` → **143 148**; and `web/src/components/equation/convergence/ConvergenceTimeline.vue:61`
= `<Button variant="glass" size="icon" class="play-btn" :class="{ 'is-playing': playing }"
@click="emit('toggle-play')">` — the eighth site, carrying the `is-playing` spelling rather than
`is-active`, which is **exactly** the five-spelling hazard §6b rider (a) names (*"never key the
vocabulary-consolidation sweep on a bare `is-active` grep"*). **The ruling's substance — L's list, NOT
C's — is unambiguous and stands unaltered**; §0j.D's own rationale for rejecting C's list is that C
*"miscounts its own list as 'six' for seven"*, and the count word appears to have travelled from that
clause. **Unit f minutes this as a dated addendum-beside (E-3) and lifts the enumerated eight. It does
NOT re-open the ruling and does not presume a seventh-vs-eighth election.** If unit f judges the
count-word binding over the enumeration, that is an ESCALATION, not an implementer's call.

**D-4 · ConvergenceTimeline's path.** §2a-i lists it by basename; it lives at
`web/src/components/equation/convergence/ConvergenceTimeline.vue`, **not** under `visualization/`.
Tree-verified; ` M` in the porcelain. No bounds conflict (the enumeration is by basename), recorded so
no unit hunts for it under the wrong root.

### Standing posture banked at open

- **G-4 · G-5 · G-15(d) hold §7a's honest-RED-close relief BY NAME.** G-4 is producer-owned and
  `../glass-ui` is **READ-ONLY, always** (runbook §5.5); the corruption is in the **adopted 4.0.0
  bytes**, which no later tag alters (§3 row 1's 2026-09-17 addendum; I-30 routing (c)). **A
  consumer-side patch is a GATE FAILURE, not a gate pass.** The wave closes with these three RED **and
  says so**.
- **Therefore the `web/dist` quarantine does NOT run this wave** (§6a lock 2: `web/dist` is not touched
  until G-4 and G-5 are green; delete-before-rebuild destroys the only emission evidence the corpus
  has). No unit owns it.
- **No worktree** (§2c, deliberate): one writer, in place, on `m/w1-bump-migration`.
- **NO `git stash` anywhere** (§6a lock 10, runbook §5.5) — a stash would erase rows 24/25, the tree's
  only copies of two correct repairs. **No `git add -A`** — a wholesale add is a wave abort (§2b).
- **`scripts/dev/dev.sh` (value.js) is NEVER staged and NEVER touched** (§6a lock 9, binding cross-repo).
- **Census freeze**: `CENSUS-CANONICAL.md` @ `f44362757458` is the sole roster operand (§6a lock 11 ·
  runbook §5.6). No unit derives, samples or re-cuts a roster. The closure's self-test is one
  set-difference of §3b against the canonical's F.W0 roster — never a detector.
- **No new carry is authored** (§6a lock 11 / R-3.2). The only citable X·F carries are
  `carry/F-W1-CARRY.md` and `carry/F-W4-CARRY.md`, by path; this wave cites neither.

---

## Unit plan

**6 units, STRICTLY SERIAL — `a → b → e → c → d → f`** (§1 `Agents`, §2b Disjointness, binding per
runbook §5.1: *"Per-wave seat counts are declared in each spec's §State `Agents` line and are
binding"*). **Peak concurrency 1.** Unit *a* holds all 28 paths and must release them before any other
unit writes; *f* writes paths *a* releases; *d*'s measurements must be taken after *a* rules the branch
they are conditioned on. **No two units run concurrently, and no two share a modify path
concurrently by construction.**

**Model**: **opus** for all six. The spec names no Fable, fresh-Fable, adjudicator or design-author
seat for F.W0; every unit is a mechanical/measurement/doc seat, which runbook §5.1 assigns to *"Opus
solo for mechanical/challenge seats (censuses, greps, gate runs, single-file cures)"*.

**Ordered groups**: `[a] → [b] → [e] → [c] → [d] → [f]`.

### F.W0.a — substrate settle · G-1

- **Sections**: §4 G-1 (L304–307) · §2a File bounds (L87–118) + §2a-i the 28 paths (L114) · §2b
  (L120–122) · §2c (L124–126) · §3 rows 2 · 24 · 25 · 3 · 4 (L138–179) · §5 OG-F1 (L405–413) · §6a
  locks 1 · 9 · 10 (L419–431) · §7b commit plan (L482–487) · COHESION §0j.D OG-F1 ruling.
- **Writable**: `fourier/docs/tranches/F/SUBSTRATE-LEDGER.md` (create) · the 28 §2a-i paths as
  **commit objects only** (dispositioned by name; contents NOT edited — the execution gate stands over
  the 21 remaining ` M` SFCs).
- **Gates**: G-1.
- **Locks**: §6a lock 1 (substrate pre-gates FIRST; G-4·G-1·G-13·G-12 precede F.W1 sizing) · lock 9
  (pathspec only; `dev.sh` never staged) · lock 10 (G-1 gates G-15(a); **no `git stash` anywhere**) ·
  §2b (a releases every path b..f need; `git add -A` is a wave abort).
- **Brief**: Open `SUBSTRATE-LEDGER.md` (line 1 = SERVED MODEL). Under **OG-F1 as RULED at §0j.D —
  FREEZE-WITH-ADOPTION **and** WORKTREE-AS-BASELINE — G-1's minute becomes a **disclosure + the LAND
  set**, and GAB-13 discharges to a disclosure line. Write the 28-path minute: every path named with
  **LAND / ABANDON / LAND-WITH-CORRECTION** and its reason, derived from §2a-i's enumeration (the
  bounds authority) and re-verified against live `git status --porcelain`. **Rows 24 (`FR-EMT-25`,
  EquationModeToggle) and 25 (`C:S-2`, PaperSearchDropdown) are NAMED EXCEPTIONS that MUST LAND.** A
  wholesale reset is a gate FAILURE, not a gate pass. Commit the LAND set by **pathspec**, grouped by
  disposition, the two exceptions named in the message. Then bank the G-1 porcelain before/after
  beside the ledger. Commit 1: `docs(F.W0): substrate ledger + 28-path land-or-abandon minute`;
  commit 2+: the LAND set. **Never `git add -A`, never `stash`, never `reset --hard`.**

### F.W0.b — the mail seat · G-2, G-3

- **Sections**: §4 G-2 (L309–312) · §4 G-3 (L314–317) · §3 rows 30 · 31 · 32 · §6a lock 4 (L424) ·
  §2a rows for `CLAUDE.md` / `INBOX.md` / the O-14 letter (L93–96) · §6b glass-ui BH relay row (L439)
  + F.W10 row (L440) · §7b commit plan.
- **Writable**: `fourier/CLAUDE.md` (create) · `fourier/docs/tranches/F/coordination/INBOX.md`
  (create) · `fourier/docs/tranches/N/valuejs-inbound-2026-07-27-facility19-migration-table.md`
  (commit the existing bytes; do not edit).
- **Gates**: G-2, G-3.
- **Locks**: §6a lock 4 — **G-3 gates the SENDs**; no letter leaves before the seat exists. E13: no
  wave closes with UNREAD mail. **NO CRONS** (owner order; E13 sweeps are session-open acts). The
  three extant letters are **READ-ONLY** — the ledger records their state, it does not rewrite them.
- **Brief**: `git add` + commit the O-14 letter first (`chore(F.W0): commit the O-14 letter`) — G-2 is
  one act. Create `CLAUDE.md` at the fourier root and `docs/tranches/F/coordination/INBOX.md` as the
  E13-analogue ledger. **TRIAGE THE THREE EXTANT 2026-05-29 LETTERS INTO THE LEDGER AT CREATION**,
  each with a status and a disposition, **before any new letter is logged** (D-8): `F-OPERATOR-WINDOW.md`
  carries its **F.W3-binding** routing · `F-VHOST-CORRECTNESS.md` its **F.α-first-land / inv-22**
  routing · `F-T-N1-status-field-drop.md` is an **ASK** and carries its answer-or-defer state. A
  ledger created blind over three unlogged letters makes them unread mail on day one and F.W0 cannot
  close its own gate — the inventory is what makes G-3 satisfiable. Then **assemble and SEND** the
  **P-1** packet (nine entries, items 0–8; **`FR-NP-32` (≡ `fr-PaperSidebar M1`) FIRST** — cite both,
  never substitute, R4-9.8/S-23; FR-MSP-12 as item 8; **item 7 is a NEGATIVE ask — DOCK-ACTIVE is
  satisfied upstream: RECORD it in the packet, do NOT send it as a defect**) and the **P-6** packet
  (PAW-32/38/39/45/46/56 + fr-PaperView's 6 LATEX-RELAY riders + fr-PaperSidebar L-11/M2). Log both
  **SENT with dates** in the ledger. Producer rows ride the relay and **NEVER become frontend hacks**
  (FR-COB-8 S-4). `glass-ui` is READ-ONLY, always. Commit: `docs(F.W0): CLAUDE.md + INBOX — the E13
  mail seat`.

### F.W0.e — the three tables + the rulings · G-11, G-12, G-13, G-14, G-15

- **Sections**: §4 G-11 (L364–367) · G-12 (L369–372) · G-13 + its addendum + drift receipt (L374–384)
  · G-14 (L386–389) · G-15(a)–(d) (L391–401) · §5 owner rulings (L405–413) · §1d corrections
  (L75–80) · §3 rows 5 · 6 · 13 · 17 · 20 · 21 · 22 · 23 · 27 · 28 · 29 · 33 · 36 · 37 · §6a lock 3
  (L423) + lock 8 (L428) + lock 10 (L430) · §2a errata + COHESION rows (L92, L110) · COHESION §0j.D
  (OG-F1 · OG-F2/OG-V2 · G-15 ×4).
- **Writable**: `fourier/docs/tranches/F/SUBSTRATE-LEDGER.md` (append) ·
  `value.js/docs/tranches/V/megatranche/formation/fourier/CENSUS-2026-08-03.md` **ERRATA ADDENDUM
  ONLY** · `…/lane-frontend.md` **ERRATA ADDENDUM ONLY** ·
  `value.js/docs/tranches/X/COHESION.md` **APPEND-ONLY ADDENDUM** (§1 register row for the fourier
  mail-ledger surface + the §2 cross-edge, declared from this end).
- **Gates**: G-11, G-12, G-13, G-14, G-15(a), G-15(b), G-15(c), G-15(d).
- **Locks**: §6a lock 3 — **G-1 gates G-11 gates G-10's lift**: the anchor table MUST publish before
  unit *f* touches a line number · lock 8 — **E-3 everywhere**: CENSUS and lane-frontend corrections
  are **addenda, never patches**; the 66 adjudicated records + the intake adjudication are E-1
  immutable · lock 10 — G-15(a)'s tree-touching leg runs **only after G-1 is green**, on the settled
  tree, **no stash** · §5 rulings are taken from §0j.D, **never presumed and never re-opened**.
- **Brief**: Publish, into `SUBSTRATE-LEDGER.md`, in this order. **(1) G-11 — ONE corrected anchor
  table**, dated, with **COUNTING UNITS beside every pattern** (byte-offset vs occurrence vs line are
  anchor/unit differences, not errors — pt-leaf K7), the accuracy benchmarks in **both** directions
  (L-axis byte-exact at fr-ContourPreview; L's working-tree cites 76 lines adrift at
  fr-CanvasOverlayButton superlative 3), the ten named drift registers, and the standing rule
  **producer-side evidence carries the producer COMMIT HASH, never the version string**. Under OG-F1
  it **narrows to drift-correction**. Carry baseline **D-1** (the absent `web/src/styles/index.css`) as
  a drift-correction row. **(2) G-12 — ONE corrected-denominator table** WITH its denominator
  definitions (application-occurrences vs raw-grep-lines vs callsites), every contradiction in §4
  G-12 **reconciled, not averaged**, the live-confirmed **8 e2e specs** (any 7-spec figure SUPERSEDED
  and FORBIDDEN), and the ` M` SFC denominator published **ONCE** (27 ⇒ 24 SFCs ⇒ 21 remaining ⇒ 19
  untouched; "22 remaining" is superseded); bind **REGISTRY-FIRST as a PRECONDITION, not a courtesy**.
  **(3) G-13 — the pin table**: producer cell = a **COMMIT HASH measured live at this open**
  (`v8.0.0^{commit}` = `17a11bc5`, the ESC-1-ruled target per §0i.3; producer HEAD `e91b7b7e` banked
  as a **dated reading, never a live fact**), the **ADOPTED cell PROSPECTIVE** for F.W1, the
  **lattice** (keyframes.js@4.3.0 hard-deps value.js `^0.13.0` + optionalDeps glass-ui `~4.0.0` — the
  backward pin making F.W2 un-landable alone) + the true peer start state, the 4→**8** delta table
  re-derived and re-homed for `EasingCurve`, and the **asymmetry stated**: at 8.0.0 every load-bearing
  7.0.0 FINDING survives but CURES die — **say which**. Budget in **CALLSITES** (12/2/1 in 118 template
  lines), not imports. **(4) the stale-dist admissibility rule** (row 27). **(5) G-14**: all three
  worktrees (`7e28` — not purely mechanical, it owns `formation/codex-worktree-7e28/CENSUS.md` —
  `9167`, `d0be`) dispositioned; R3-9 recorded as an unverifiable assertion; R3-16+R4-11+R5-9+R6-10
  reduced to the **14-wave M board** with the 72/158/P29/slot superstructure **explicitly NOT
  transferred**; **R4-12 recorded as evaporated, consume nothing**, with its date; R5-3 re-hashed or
  dropped; X-7 registered; the **pin-hygiene rule** published; the dead M.W1b glass-4.1.0 gate + the
  J/K-deploy/M interlock declared **dead-by-supersession**, and `RUN-BOARD.md` dispositioned. Under
  §0j.D's OG-F2/OG-V2 ruling the R-coordinate rows become **records, not work**. **(6) the four G-15
  rulings AS RULED at §0j.D, each with its falsifier** — **(a) LAND**: the settled tree IS the
  committed substrate; ledger records *committed substrate GREEN, the RED is the uplift's, cure owned
  by F.W1/W2*; run the read-only pair (`git show HEAD:web/package{.json,-lock.json}` — typescript
  5.9.3 / vue-tsc 2.2.12, default `noUncheckedSideEffectImports` false) and, **after G-1 is green**,
  `(cd web && npx vue-tsc -b --force)` on the settled tree — **no stash artefact exists, by lock 10**.
  **(b) the `html{font-size:1.125rem}` under 768px GOES** (12.5% compounding with `--ui-scale:1.5` →
  67.5px against the token author's 60px); F.W1 absorbs the token-parity re-tune, F.W4 executes per
  component. **(c) FM-19 FROZEN-FOREVER with a golden-file diff** — the ruling **plus** the golden-file
  baseline must exist; FM-20/FM-23 cures are F.W4's. **(d) UNDECIDABLE on today's evidence** — write the
  ruling naming (i) the two measured coordinates (`fr-PaperSearch.md:28` K1 vs
  `fr-PaperSearchModal.md:63` PSM-24/R-3), (ii) the decider (a 4.0.0 emitted stylesheet), (iii) why it
  is unavailable (G-4 RED; `web/dist` inadmissible under row 27), **together with the falsifier** —
  after G-5, `/usr/bin/grep 'class\*=size-'` on the emitted CSS, the losing cell superseded by a
  **DATED E-3 ADDENDUM, never an in-place registry patch**. **(7) the recorded OPTIONs** (incl.
  FR-AUL-23's base-layer `border-color` rule — recorded, **not taken**). **(8) the honest-RED minute
  for G-4 · G-5 · G-15(d)** under §7a's relief, granted to all three **by name** — the wave closes with
  them RED and **says so**; no consumer patch, no quarantine, no stale-dist admission. **(9)** the
  CENSUS-2026-08-03 + lane-frontend **dated ERRATA ADDENDA** (never patches) and **(10)** the
  **COHESION append-only addendum**: §1 register row for the fourier mail-ledger surface + the §2
  cross-edge declared from this end. Commit: `docs(F.W0): anchor, denominator and pin tables; Codex
  dispositions; four rulings` (fourier side) and `docs(X·F): CENSUS + lane-frontend errata addenda;
  COHESION §1/§2` (value.js side).

### F.W0.c — toolchain gates · G-7, G-8, G-9

- **Sections**: §4 G-7 (L343–346) · G-8 (L348–351) · G-9 + its F.W9 disjointness clause (L353–357) ·
  §3 rows 15 · 16 · 17 · 18 · 19 · 38 · §2a rows for `web/tsconfig.json`, `web/e2e/`,
  `ci.yml`/`deploy-pages.yml` (L99, L102, L109) · §6a lock 7 (L427) · §6b F.W9/F.W10 row (L444) ·
  §7b format/lint cadence (L484).
- **Writable**: `fourier/web/tsconfig.json` · `fourier/.github/workflows/ci.yml` ·
  `fourier/.github/workflows/deploy-pages.yml` · `fourier/web/e2e/**` (the axe keystone-route
  extension **authored, not run**) · `fourier/docs/tranches/F/SUBSTRATE-LEDGER.md` (the G-7 first-run
  finding list + the widened `vue-tsc -b` output + any minuted exclusion ruling).
  **EXPLICITLY NOT WRITABLE**: `fourier/web/package.json` · `package-lock.json` — §2b is categorical:
  *"unit *a* holds all 28 paths — including `package.json`/`package-lock.json`, **whose only F.W0 act
  is a's land-or-abandon ruling**"*.
- **Gates**: G-7, G-8, G-9.
- **Locks**: **FR-IC-25 — an unwired gate is an ornament**: everything this unit adds is wired into
  `ci.yml`/`deploy-pages.yml` or it does not count · §6a lock 7 — row 16 (`fr-BasisSelector i-3` =
  `LC-missed-7`) is a **rider on `M-10`, never landed alone**, and carries the **WAVE-LOCK**: no
  `basisFilter` wiring without `normalizeBasisKey` (the store repeats the widening at
  `gallery.ts:38`) · **G-9 owns the SEAT, F.W9's G-F9-1 owns the FLOOR** (R-5, declared identically at
  both ends) — *"the seat is a precondition of the floor, never a down payment on it"*; **explicitly
  NOT green-by-coverage** · §7b — **no hand-formatting anywhere**; once G-7's floor lands it drives,
  before it lands touched files are left as found. **The DELETIONS route F.W3/W4** — this unit lands
  the gate, never the cleanup.
- **Brief**: Set `noUnusedLocals` + `noUnusedParameters`; **DECIDE `noUncheckedIndexedAccess`** — set
  it, or minute it as deferred **with M-10's `BasisKey` unit named as its consumer** (row 16). Stand
  up a lint floor that is **runnable AND wired into `ci.yml`**, and measure its first run against the
  twice-independently-predicted **16 findings / 12 files** (labels.ts rows are destructured locals,
  not params — the honest count stays 16/12); a divergence is minuted, not silently adopted. Widen
  G-8: extend `include` (or add a second project) to reach `vite.config.ts`, `playwright.config.ts`
  and the **8** `web/e2e/*.spec.ts`, and make `vue-tsc -b` green over the widened scope — **or record
  the exclusion as a ruling with its reason**. Stand up the unit-runner **SEAT**: a runner wired into
  `ci.yml`, inside G-8's type scope, with **ONE asserting spec** proving the seat live — and **author**
  (not run) the axe keystone-route extension to `/equations`, its justification prose corrected to the
  **4.0.0 `inert`** truth. **DECLARED BOUNDS QUESTION, stated at open so it is never an implementer's
  call**: G-9's word is *"a runner is **installed**"*, and a devDependency declaration would write
  `web/package.json` — a path §2b reserves entirely to unit *a*. **Honest default: satisfy "runnable +
  wired" without a manifest byte** (the repo's CI already invokes tools via `npx`; `ci.yml:95` /
  `deploy-pages.yml:114` read `npx vue-tsc -b --force`). **If the seat concludes the gate cannot be
  met without a manifest write, that is an ESCALATION under §7a — stop and return it; do not expand
  bounds.** Commit: `chore(F.W0): toolchain gates + lint floor + unit-runner seat + CI wiring`.

### F.W0.d — manifest gate AUTHORING · G-6

- **Sections**: §4 G-6 whole, incl. the R-4a re-cut and both GREEN halves (L329–341) · §6a lock 5
  (L425) · §3 rows 8 · 9 · 10 · 11 · 12 · 14 · 34 · 35 · §7 unit row (L472) · §7b verification
  artefacts (L485) · §8 the excluded DECLARE+LOCK landing (L500) + the `cva`/`clsx`/`reka-ui` row
  (L529).
- **Writable**: `fourier/docs/tranches/F/SUBSTRATE-LEDGER.md` (append the gate text + the
  branch-conditioned measurements) · `value.js/docs/tranches/V/megatranche/formation/fourier/lane-frontend.md`
  **DATED ERRATA ADDENDUM ONLY** (never patched in place).
  **EXPLICITLY NOT WRITABLE**: `fourier/web/package.json` · `package-lock.json` — §2b: *"unit *d*
  writes no manifest byte and is now doc-only"*.
- **Gates**: G-6.
- **Locks**: §6a lock 5 — **G-6 is a PRECONDITION-CHECK, not a landing**, and is **CONDITIONED ON
  G-1's ruled branch** (on LAND the measurements stand against the landed 4.0.0 manifest; on ABANDON
  they are recorded against the committed **3.1.0** manifest and **the gate transfers to F.W1
  unchanged** — no F.W0 exit criterion moves either way). The declare+lock landing is a limb of
  **F-W1 §4 Sequencing, intra-wave step 4** — the **TWELVE-limb** roster, *"cited whole, never
  restated"* — with **FR-EQC-7's vaul-vue gate INSIDE it** per **F-W1 §4's cross-edge 1**. The
  *"graph evaluates without a module-eval throw"* clause is **F.W1-DISCHARGED**. **F.W0 claims no
  credit for F.W1's half** (the FR-GIG-5 bar). **The `npm ci --omit=dev` run is F.W1's and cannot
  halt this wave** (§7a).
- **Brief**: With G-1's branch ruled (LAND, under §0j.D's worktree-as-baseline), write the manifest
  gate **as text** into `SUBSTRATE-LEDGER.md` with **(i) the four born-RED facts measured and dated,
  STAMPED WITH G-1's RULED BRANCH** — the two dep blocks as measured at this open; **`vaul-vue`,
  `@lucide/vue` and `embla-carousel-vue` in NEITHER block**; **0** `node_modules/vaul-vue` and **0**
  `node_modules/@lucide/vue` in the working lock; all five runtime devDeps `"dev": true` ⇒ **`npm ci
  --omit=dev` fails TODAY**. **(ii) The PRESCRIBED TRANSACTION named for F.W1 to land**: the five
  runtime packages moved into `dependencies`; **`tailwind-merge` ALONE deleted** (genuinely dead,
  doc-comment-only); `vaul-vue` declared+locked **or** the barrel→subpath retirement landed (rows
  34/35) so no edge needs it; `@lucide/vue` declared and present in the lock; the dead `@types/katex`
  row removed. **`embla-carousel-vue` is NOT in the set** — an optional peer at 4.0.0
  (`peerDependenciesMeta`), it cannot fail `npm ci --omit=dev` and does not belong in an all-or-nothing
  transaction (row 11); its declaration rides the F.W3/W4 adoption. **(iii) The dead-devDeps ERRATA
  ADDENDUM, in the SAME ACT as the authoring**: the `lane-frontend.md:70` / `web/DESIGN.md:33`
  contradiction corrected — **deleting `cva` / `clsx` / `reka-ui` is FORBIDDEN**; they are live
  glass-ui runtime peers on the button-chunk→`cn`→clsx chain, and F.W1 must not delete live peers on
  an uncorrected doc. **Bounds note**: `fourier/web/DESIGN.md` is **not a §2a row** — record the
  contradiction and its correction in the ledger and in the `lane-frontend.md` addendum; if a
  `DESIGN.md` byte is genuinely owed, **ESCALATE** rather than write outside §2a. Bank the gate text
  + its measurements as the verification artefact (**no `npm ci --omit=dev` transcript is F.W0's**).
  Commit: `docs(F.W0): manifest gate authored + born-RED measurements (landing is F.W1's)`.

### F.W0.f — the REACH ruling · G-10

- **Sections**: §4 G-10 (L359–362) · §3 rows 3 · 4 · 26 · §2a rows for `InfoCard.vue`,
  `CanvasOverlayButton.vue` and the 8 lift sites (L103–108) · §6a lock 3 (L423) + lock 6 (L426) ·
  §6b the F.W3/F.W4 row + both sweep-law riders (L441) · §7b archaeology, the five DELETE orders
  (L487) · COHESION §0j.D's **G-10 DELETE** ruling · runbook §3.4 (*"F.W0 G-10 lift-then-delete ONE
  commit"*).
- **Writable**: `fourier/web/src/components/equation/InfoCard.vue` (`git rm`) ·
  `fourier/web/src/components/visualization/CanvasOverlayButton.vue` (`git rm`) ·
  `fourier/web/src/components/visualization/CanvasControlsDock.vue` ·
  `fourier/web/src/components/visualization/EditorControlsDock.vue` ·
  `fourier/web/src/components/equation/convergence/ConvergenceTimeline.vue` ·
  `fourier/docs/tranches/F/SUBSTRATE-LEDGER.md` (the ruling + the STEP-2i divergence minute).
- **Gates**: G-10.
- **Locks**: **§6a lock 6 — G-10 IS ONE COMMIT.** Lift-then-delete; **a bare `git rm` is a gate
  FAILURE** (*"a bare `git rm` converts a paper defect into a live a11y regression"*). Restated at
  runbook §3.4 as a same-commit family that must not split. · **§6a lock 3 — G-1 → G-11 → the lift**:
  line numbers are **re-resolved via G-11's published anchor table before the lift is applied; the
  record's anchors are never followed raw.** · **L's list, NOT C's (K-11)**: C's version adds
  `aria-pressed` to `FullscreenViewer.vue:110`, a one-shot close **ACTION**, manufacturing FR-COB-4's
  own defect. · **FR-COB-4's toggle-vs-action law** governs which sites may receive `aria-pressed` at
  all. · **Sweep-law rider (a)** — *"never key the vocabulary-consolidation sweep on a bare `is-active`
  grep, it corrupts the PROP at `PaperView.vue:344`"* (five spellings live: `.is-active` /
  `.is-active-sub` / `.is-playing` / `.liked` / the prop). · **FR-COB-17 homes at F.W3, is SEQUENCED
  here**; FR-COB-2's F.W0 limb is discharged by the deletion, its sizing lock is F-W1's. ·
  **FR-COB-9/FR-COB-25 fold into this minute**; the register **deadness column** is the surviving act.
  · **FR-IC-23's one-edit law binds only KEEP/HARNESS** — under DELETE, `FR-IC-2` retires unmeasured,
  correctly.
- **Brief**: Write the **exact ruling for BOTH files IN ONE BREATH** (R-6: one breath, both rows) —
  **DELETE**, as RULED at COHESION §0j.D: *"F8-REACH-01 (`InfoCard.vue`) and F8-REACH-02
  (`CanvasOverlayButton.vue`): DELETE, in one breath"*, on the stated rationale (five DELETE orders
  already stood unexecuted; both files unreachable at the frontier; the constellation's subtraction
  law). **Minute the STEP-2i divergence** (skip self-reported at `partial-prior-run.json:207-211`,
  un-minuted; the five DELETE orders at `W3-button-ledger.md:93` · `M.md:141` ·
  `M-design-language.md:70` · `M-bump-migration.md:56`+`:199` · `A8-no-legacy-sweep.md:29`). Then, **in
  the SAME COMMIT as the two `git rm`s**, apply FR-COB-17's `:aria-pressed` lift at the sites
  **re-resolved through G-11**: CanvasControlsDock ×5 · EditorControlsDock ×2 · ConvergenceTimeline ×1.
  **Baseline D-3 above is binding on this unit**: §0j.D's parenthetical count word reads *"seven
  sites"* while `F-W0.md` §2a and §4 G-10 enumerate **eight**, and **all eight resolve live** (54 · 59
  · 71 · 77 · 87 / 143 · 148 / :61 — the eighth carrying `is-playing`, not `is-active`, which is
  precisely rider (a)'s hazard). **Lift the enumerated eight and minute the count-word divergence as a
  DATED ADDENDUM-BESIDE (E-3). Do not re-open the ruling; do not elect a seventh-vs-eighth reading on
  your own authority — if you judge the count word binding over the enumeration, ESCALATE.** Commit
  (ONE, family must not split): `refactor(F.W0): F8-REACH ruled — aria-pressed lift + rm
  CanvasOverlayButton`.

### Not a unit — producer-owned

**G-4** goes green **upstream** only; **G-5** goes green when G-4 and MISS-A7 clear. `../glass-ui` is
**READ-ONLY, always**; a consumer-side patch is a **GATE FAILURE**, not a gate pass (SS-6 / FR-COB-8
S-4). Under §7a's relief, **G-4 · G-5 · G-15(d) close honest-RED and the wave says so.** The
`web/dist` quarantine therefore does not run (§6a lock 2), and the F.W1 sizing that depends on a
parsing sheet stays blocked — which is the finding, not a defect.

---

## Unit receipts

*(empty at open; each unit appends its own receipts here, with its SERVED MODEL line and its commits)*

### F.W0.a

**SERVED MODEL: claude-opus-5[1m]** · substrate settle · **gate G-1** · 2026-09-17 ·
repo `/Users/mkbabb/Programming/fourier-analysis`, branch `m/w1-bump-migration`.

**Sections executed**: §4 G-1 · §2a + §2a-i · §2b · §2c · §3 rows 2 · 24 · 25 · 3 · 4 · §5 OG-F1 ·
§6a locks 1 · 9 · 10 · §7b commit plan · `COHESION.md` §0j.D (OG-F1).

#### Acts, in order

**Act 1 — the ruling read, never presumed.** ⟨cmd⟩ `/usr/bin/grep -n 'OG-F1' docs/tranches/X/COHESION.md`
→ `599:` ; quoted whole at §0j.D: **FREEZE-WITH-ADOPTION AND WORKTREE-AS-BASELINE**, *"G-1's minute becomes
a disclosure + the LAND set … GAB-13 discharges to a disclosure line."* Both limbs are what §1 of the ledger
now is.

**Act 2 — the bounds re-verified at the tree, not adopted from a ledger.** ⟨cmd⟩
`git rev-parse --abbrev-ref HEAD` → `m/w1-bump-migration` · `git rev-parse --short HEAD` → `cd26c65` ·
`git status --porcelain | wc -l` → **28** · `… | /usr/bin/grep -c '^ M'` → **27** ·
`… | /usr/bin/grep -c '^??'` → **1**. **Double-run: 28, 28.** The live listing reproduces F-W0 §2a-i
**item-for-item, in the same order, with no addition and no omission** — matching the baseline row banked at
this record's open.

**Act 3 — every one of the 27 diffs read line-by-line** (the reason column of the minute is that reading, not
a template). ⟨cmd⟩ `for f in $(git diff --name-only …); do git diff -U0 -- "$f" | /usr/bin/grep -E '^[+-]' …`
→ all 27 are M.W1a glass-ui-4.0.0 API-migration deltas in exactly five classes: the glass ladder renames
(`glass-subtle`→`glass-wash`, `glass-elevated`→`glass-floating`, `glass-medium`→`glass-resting`|`glass-floating`),
`UnderlineTabs`→`SegmentedTabs variant="underline"`, `Slider variant="glass-scrubber"`→`variant="standard"`,
MetricBadge `:amount`→`:value`, `DialogContent variant="opaque"`→`surface="opaque"`; plus the manifest/lock
bump (25+/25− and 1132+/1189−) and RUN-BOARD's S1 status row.

**Act 4 — the two NAMED EXCEPTIONS enumerated BEFORE ruling on the rest** (§3 row 25's explicit ordering
demand). ⟨cmd⟩ `git diff -- <EquationModeToggle.vue> <PaperSearchDropdown.vue>` → **exactly one changed line
each**: `glass-subtle` → `glass-wash` (§3 row 24, `FR-EMT-25`) and `glass-elevated` → `glass-floating`
(§3 row 25, `C:S-2`). Ledger §1.3.

**Act 5 — the disclosure measured** (§1.1). ⟨cmd⟩ `git show HEAD:web/package.json | /usr/bin/grep -E
'glass-ui|keyframes|value\.js'` at `cd26c65` → `^3.1.0` / `^2.2.0` / `^0.10.0`, against the worktree's
`^4.0.0` / `^4.3.0` / `^0.13.0`; ⟨cmd⟩ `/usr/bin/grep -m1 '"version"'
web/node_modules/@mkbabb/glass-ui/package.json` → `"version": "4.0.0",`.

**Act 6 — the 28-path minute written, then the LAND set committed by pathspec.** `SUBSTRATE-LEDGER.md`
created (line 1 = `SERVED MODEL: claude-opus-5[1m]`), §1.4's table carrying **one row per §2a-i path**, each
with a disposition and a reason, plus an explicit disambiguation that the table's `#` is the §2a-i path index
and **not** a §3 carry-row number (§3 row 24 is path 4; §3 row 25 is path 13).

**Act 7 — the after-porcelain banked from the settled bytes** (§1.8), and G-1's reading stated at §1.9.

#### Dispositions — all 28, by name

| disposition | count | note |
|---|---|---|
| **LAND** | **28** | 27 ` M` executed at `1193003`; the 1 `??` (O-14 letter) ruled LAND with its act routed to **G-2, unit *b*** |
| **LAND-WITH-CORRECTION** | **0** | empty for a BOUNDS reason, stated: F.W0 does not edit ` M` SFC contents (§2a; writable set = the 28 paths **as commit objects only**), so a correction is an F.W1/W3/W4 act by construction. No correction was suppressed to reach the empty set. |
| **ABANDON** | **0** | empty by RULING: OG-F1 adopts the worktree as baseline, and *"a wholesale reset is a gate FAILURE, not a gate pass"*. |

**GAB-13 (§3 row 2) DISCHARGED** to the one-line disclosure §0j.D prescribes; worker-DU's dissent recorded
verbatim, and the ruling makes DU's INFO grading right. **L-1's conditional (§3 row 3) did NOT fire** — the
ruling is not ABANDON, so the governance limb does not fall to MAJOR.

#### Commits

| # | hash | message |
|---|---|---|
| 1 | **`3079a92`** | `docs(F.W0): substrate ledger + 28-path land-or-abandon minute` |
| 2 | **`1193003`** | `chore(F.W0): LAND the 27 M.W1a working-tree paths (G-1, OG-F1 worktree-as-baseline)` — 27 files, both exceptions named in the message body |
| 3 | **`c429d7b`** | `docs(F.W0): bank the G-1 after-porcelain and the honest gate reading` |

Commit 3 exists because the AFTER porcelain and the LAND-set hash are only knowable **after** commit 2, and
WRITE-THEN-MEASURE forbids predicting either into commit 1. It splits no declared family (the only
must-not-split family in this wave is G-10's, at unit *f*).

#### Gate reading — BEFORE → AFTER

| gate | BEFORE (open) | AFTER (this unit's close) |
|---|---|---|
| **G-1** | **RED** — porcelain **28** (27 ` M` + 1 `??`); no `SUBSTRATE-LEDGER.md`, so **no path carried a disposition** | **RED-BY-RESIDUE-1.** Disposition limb **COMPLETE, 28/28**. Porcelain limb: **28 → 1** (double-run: 1, 1), the residue being exactly the ruled-LAND O-14 letter. **Turns GREEN at unit *b*'s G-2 act** (`chore(F.W0): commit the O-14 letter`), the next unit in the serial order — not claimed here. |

**Settled-tree receipts** (⟨cmd⟩, this seat, after commit 2): `git rev-parse --short HEAD` → **`1193003`** ·
`git diff --name-only HEAD | /usr/bin/grep -c .` → **0** (no tracked path diverges from HEAD) ·
`git show HEAD:web/package.json | /usr/bin/grep -E 'glass-ui|keyframes|value\.js'` → **`^4.0.0` / `^4.3.0` /
`^0.13.0`** — **the 4.0.0 premise is now held by a commit** · `git show 1193003 --name-only --format= |
/usr/bin/grep -c .` → **27** · both exceptions verified inside `1193003` at the bytes.

#### Law compliance

**No `git add -A`** (all three commits staged by explicit pathspec; the 27 were named individually) ·
**no `git stash` anywhere** (§6a lock 10 — so **no stash artefact exists** for G-15(a), as the lock promises) ·
**no `reset --hard`**, no `checkout --`, no force-push · **`value.js/scripts/dev/dev.sh` never touched and
never staged** (§6a lock 9) · **no contents of any ` M` SFC edited** — the 28 paths were handled **as commit
objects only** · **no write outside the writable set**: the only file authored is
`fourier/docs/tranches/F/SUBSTRATE-LEDGER.md`, and the porcelain before/after is banked **inside** it
because §2a declares it the wave's single durable artefact and the unit's writable set contains no second
path · **no worktree** (§2c: one writer, in place) · **E-3 honored**: nothing existing was patched in place.

**One self-caught defect, disclosed rather than quietly fixed.** The ledger's first draft cited the LAND-set
commit by a hash that **did not yet exist** — a predicted figure, which is exactly what WRITE-THEN-MEASURE
forbids. It was caught before any commit and replaced at both sites with a forward reference to §1.8, where
the hash is read from the settled tree. Recorded here because a seat's own bytes are the least-audited ones.

#### Residuals and routing — nothing dropped

| item | routed to |
|---|---|
| The `??` O-14 letter's commit | **G-2, unit *b*** — one act |
| `RUN-BOARD.md` content-claims (J/K-deploy/M interlock; dead M.W1b glass-4.1.0 gate) | **G-14, unit *e*** |
| `InfoCard.vue` (landed at `1193003`, then deleted) + `CanvasOverlayButton.vue` + the 8-site lift | **G-10, unit *f*** — ONE commit |
| Manifest DECLARE+LOCK banding | **F.W1** (R-4a). **G-6 is stamped `BRANCH = LAND`**: unit *d* measures against the landed 4.0.0 manifest at `1193003`; the ABANDON arm of §6a lock 5 did not fire. |
| Anchor re-resolution before any line-number act | **G-11, unit *e*** (§6a lock 3's first edge is now satisfied — the tree is settled) |
| `web/dist` quarantine | **does not run this wave** (§6a lock 2) |

**Releases**: all 28 paths are **RELEASED** as of `1193003` (§2b). The two G-10 lift sites carried in the
` M` set — `EditorControlsDock.vue` and `ConvergenceTimeline.vue` — are committed, so unit *f* lifts against
a base a commit holds. **Record D-4 re-confirmed**: `ConvergenceTimeline.vue` lives under
`equation/convergence/`, not `visualization/`.

**Escalations**: none. **`execution/LEDGER.md` untouched** — not in this unit's writable set; its F.W0 row is
the wave seat's.
