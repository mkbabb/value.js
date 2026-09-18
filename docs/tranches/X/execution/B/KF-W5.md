SERVED MODEL: claude-opus-5[1m]

# X.KF.W5 — D/L/C Tri-Fold Library Audit **and Repair** — EXECUTION RECORD

**Track B · X·KF · wave KF.W5.** Spec of record: `docs/tranches/X/keyframes/waves/KF-W5.md` (530 L,
IMMUTABLE under E-3 — corrections here are dated addenda-beside, never patches to the spec).
Order: `docs/tranches/X/EXECUTION-RUNBOOK.md` §1.2 · seat law §5 · locks §3.4.
Rulings: `docs/tranches/X/COHESION.md` §0i · §0j (esp. **§0j.C**) · §0k · §0l · §0m — read to file end
at this seat.

---

## Open

**Opened 2026-09-17** by seat 0 (OPEN), on the owner's 2026-09-17 begin-word (verbatim at COHESION §0j).

### Substrate of record — RE-DERIVED AT OPEN, and it has MOVED

The spec pins keyframes.js `origin/master` **`81a56990` or later**. At this seat's clock:

⟨`git -C ../keyframes.js rev-parse origin/master`⟩ → **`7d958f212fd519142ee9ed5e298d5afe456a7967`**
⟨`git -C ../keyframes.js rev-parse --abbrev-ref HEAD`⟩ → `master`; HEAD **==** `origin/master` (the
§B-12 settle landed; KF.W0 CLOSED).
⟨`git -C ../keyframes.js status --porcelain`⟩ → **2 rows, both untracked**, and both are the I-26 mail
cure's survivors (`docs/tranches/V/coordination/VALUEJS-INBOUND-2026-07-24-…` ·
`…-2026-07-27-…`) — the §0m.0 "six survivors" class. **Zero tracked modifications.** The wave's
whole basis is therefore `origin/master`, and the spec's disqualification of `8281638c` is moot: that
ref is 14 commits + the §B-12 reset behind.

**`81a56990` → `7d958f21` is KF.W4's landing** (14 commits, `fb509edd` … `7d958f21`). Every anchor in
the spec was authored at `81a56990`; **each was re-resolved at `7d958f21` at this seat** and the
§Baseline table below states, per gate, whether it reproduces. Two do not — both recorded as findings,
neither smoothed over.

### Preconditions

| # | precondition | verdict at open | receipt |
|---|---|---|---|
| **Opens after KF.W4** (runbook §1.2 · LEDGER row) | KF.W4 = the declared sequencing head; *"no repair packet and no UNIT may open before G-KFW4-1 lands"* | **MET** | LEDGER Track B row `KF.W4` = **CLOSED 2026-09-17 (honest-RED)**, CHECK 2 CONFORMANT-HONEST-RED; its commits are in the kf log at this seat (`fb509edd` … `7d958f21`) |
| **OP-1** — write authority for keyframes.js | the wave writes library bytes | **GRANTED** | COHESION §0j.C **KF-WRITE**: *"after §B-12, the sacred checkout on `master` (= `origin/master`) is the execution substrate for KF.W2 · W4 · **W5** · W6 · W7 · W8 · W9 · W10"*, *"under whose hand: the value.js orchestrator under the owner's 2026-09-17 grant"* |
| **OP-2** — KF.W0 §B-12 Substrate Settle | re-anchor at the frontier; the manifest schism folded by reference; the three lagging disk files reconciled | **MET** | LEDGER row `KF.W0` = **CLOSED 2026-09-17**; worktree == `origin/master` measured above. §0m.0's dated finding against that settle (untracked absorption, 124→6) is READ and carried: the absorbed docs are the frontier's own authority, and this wave cites `origin/master`, never the local checkout |
| **OP-3** — the TypingDots substrate inversion | for that one file the dirty worktree WAS the frontier | **SETTLED** | KF-W0 record `:1471-1473`: ⟨`git diff --stat origin/master -- …/TypingDots.vue`⟩ **empty**; the stamp states the measured `+4/−9` against the disqualified pin. *"Not RED."* With zero tracked dirt at open the inversion no longer exists — there is one substrate |
| **OP-4** — the `parseAnimationCSS` LOCUS | both dispositions pre-declared at §Carry B-16 | **RESOLVED — disposition (ii)** | KF-W0 record §Act 7: ⟨`git grep -n 'parseAnimationCSS' 81a56990 -- src demo`⟩ → 7 hits · 3 files · 1 declaration (`demo/…/utils/parseAnimationCSS.ts:26`) · **0 hits under `src`**. Therefore B-16 is **NOT a fifth G-OPTSET leg**; it is the demo-side **shadow-name** row routed to KF.W8's colocation decision, exactly as B-16 pre-stated. `.c` must not arm it |
| **OP-5** — the four RULINGS precede their fixes | `fromString` · `delay` · the PRM default · `singleTarget` | **RULED** | COHESION §0j.C **KF-W5R4**: (1) `fromString` **REPLACES** (idempotent; B-9's append is a MAJOR defect); (2) `delay` is **PER-PLAY** (one phase offset at play start); (3) PRM default **INVERTED to `respectReducedMotion: true` engine-wide**; (4) `singleTarget` gains a **SUPPORTED opt-out**, one ruling, one commit, in `.c`. **Never re-opened by a seat** |
| **OP-6** — KF.W4's gate (for re-homed rows) + the G-XSS observability rider | KF-AT-12 was this wave's stated premise | **PREMISE CURED AT THE FRONTIER; THE RIDER IS DISCHARGED** | ⟨`git show origin/master:package.json \| grep -n '"check"\|"lint"\|"test:demo"'`⟩ → `:37 "check": "vue-tsc --noEmit -p tsconfig.json && tsc --noEmit -p tsconfig.test.json && npm run proof:structure"` · `:44 "lint": "depcruise --config .dependency-cruiser.cjs src demo && eslint demo"` · `:47 "test:demo": "vitest run --project demo"`. Measured: `npx vitest run --project demo` → **30 files / 191 tests passed**. **G-XSS's round-trip half is OBSERVABLE TODAY** — the R-9b rider (*"authored RED and stays unobservable until KF.W4's one wiring step lands"*) is discharged by `fb509edd` |
| **S-5 cure** (orchestrator note) | `4.0.0→V at RC-P(V)` dated addendum-beside at KF-W5.md | **PRESENT, both sites** | ⟨`grep -n 'RC-P(V)' waves/KF-W5.md`⟩ → the §Sequencing KF.W2/KF.W3 bullet **and** the §Carry Arm B **B-16** row, each carrying *"DATED ADDENDUM-BESIDE — per X-union SEAMS.md S-5 cure, 2026-08-30"*. Nothing owed at open |

### E13 Step-0 — the four-path mail sweep

Swept read-only at this seat's clock, 2026-09-17, and compared against **every row** of
`docs/tranches/V/coordination/INBOX.md`, classification taken from each row's **status cell**, never
from a bare `grep -i unread` (X.P.W0 CHECK 1 D-1). `INBOX.md` is self-excluded (SELF-COUNT law).

1. `docs/tranches/V/` (11 `.md`) + `docs/tranches/V/coordination/` (17 `.md`) — the unrowed root files
   (`ARCHITECTURE.md`, `EVIDENCE.md`, `PALETTE-CONTRACT.md`, `VISUAL-CONSTITUTION.md`, …) are
   **authority documents, not mail**; the four unrowed `value-inbox-2026-07-20-*.md` are **OUR OWN
   OUTBOUND** — each header reads *"FROM: the value.js union-apotheosis program … → the active V-next
   Codex fleet"* — read at the bytes this seat, not inferred from the filename stem.
2. `../glass-ui/docs/tranches/BK/coordination/` — **BK re-confirmed as the newest tranche dir**
   ⟨`ls -dt ../glass-ui/docs/tranches/*/ | head -1`⟩ → `BK/`. 7 files; the three 2026-09-17 letters are
   rowed **I-32 · I-33 · I-34** (routing cells: X formation mail seat / X-W0.j / X-EXT-1..6 — **none
   routes to KF.W5**); `glass-outbound-2026-08-29-valuejs-o20-ack.md` = **I-30**; the two `ATLAS-*`
   files are atlas→glass, not value.js-addressed; `valuejs-outbound-2026-08-28-o20-…` is **O-20**.
3. `../keyframes.js/docs/tranches/V/coordination/` — 12 files. `VALUEJS-INBOUND-*` are **our own
   outbound** (the I-26 delivery cure, rowed); `ATLAS-INBOUND-*` / `GLASS-INBOUND-*` /
   `SPEEDTEST-INBOUND-*` are keyframes-addressed, **not ours**.
4. `../sci-report/atlas/docs/tranches/P/coordination/` — 28 files, all 2026-07-15…08-03; the
   value.js-addressed pair (`valuejs-inbound-2026-07-24-*`, `-07-27-*`) is rowed; the remainder are
   atlas's own P-lane records and keyframes↔atlas letters.

**Result: 0 unrowed · 0 new `I-n` minted here · 0 UNREAD in KF.W5's scope.** A dated sweep line is
appended at the INBOX file end.

---

## Baseline — the born-RED gate table, banked READ-ONLY at `7d958f21`

Every figure below is **measured at this seat and double-run** (both runs agree; the double-run block
is at the end of this section). No figure is inherited from the spec, from a lane, or from a sibling
wave's record.

| # | gate | command run (READ-ONLY) | output at open | born-state |
|---|---|---|---|---|
| **G-XSS** | share-URL sink is `textContent` | `git grep -n 'innerHTML' origin/master -- demo/components/instrument/keyframes/composables/useHighlightCSS.ts` | **2 lines** — `:111 el.innerHTML = s;` · `:123 el.innerHTML = h.value;`; property form `… \| grep -v 'h\.value'` → **1** | **RED** (as specced; reproduces exactly at the new ref) |
| | round-trip half | `npx vitest run --project demo` | **30 files / 191 tests passed**; `test/demo/instrument/highlight-css-roundtrip.test.ts` **ABSENT** | **RED by absence — and now OBSERVABLE** (rider discharged, `fb509edd`) |
| **G-ROLE** | `splitText` never overrides an implicit role | `git cat-file -e origin/master:test/orchestration/split-text-implicit-role.test.ts` | **ABSENT** | **RED by absence** |
| **G-REFUSE** | refused split leaves the DOM untouched | `… :test/orchestration/split-text-refuse.test.ts` | **ABSENT** | **RED by absence** |
| **G-REVERT** | `revert()` preserves an authored `aria-label` | `… :test/orchestration/split-text-revert.test.ts` | **ABSENT** | **RED by absence** |
| **G-STAGGER-DOC** | the stagger docblock example typechecks; P-8 answers | leg 1 `npx tsc --noEmit -p tsconfig.test.json`; leg 2 `… :test/group/group-viability.test.ts` | leg 1 → **24 pre-existing diagnostics** (`grep -c "error TS"`), fixture `test/orchestration/stagger-doc-example.test.ts` **ABSENT**; leg 2 file **ABSENT**. Witness verified: `stagger.ts:15-22` passes `{ animation, options: { delay } }`; `group/types.ts:27-29` `AnimationGroupInput` has **no `options` field** (re-read at the bytes) | **RED** — with the **instrument caveat** below |
| **G-PRM-FLIP** | a live PRM flip is observed on the WAAPI lane | `git grep -n 'snapToReducedMotion' origin/master -- src/` ; `git grep -l …` | **7 lines / 3 files** — import `frame.ts:14`, call `frame.ts:137`, decl `strategies.ts:76`, docblocks `strategies.ts:7,:10` + `index.ts:11,:23`. `git grep -l 'withReducedMotion' origin/master -- src/` → **11 files**, and `waapi/delegation.ts` is **not one of them** (the declared negative witness). `test/engine/prm-engagement.test.ts` **ABSENT** | **RED** (all receipts reproduce) |
| **G-DELAY** | `delay` obeys the ruling (PER-PLAY, §0j.C) | `… :test/engine/delay-semantics.test.ts` | **ABSENT** | **RED by absence**; the ruling is taken (OP-5) |
| **G-FROMSTRING** | `fromString` obeys the ruling (REPLACES, §0j.C) | `… :test/engine/fromstring-idempotence.test.ts` | **ABSENT** | **RED by absence**; the ruling is taken (OP-5) |
| **G-CSSIDENT** | `cssIdent` reachable from a published entry | `git grep -c '<name>' origin/master -- src/animation/index.ts src/animation/public.ts src/animation/load-engine.ts` for `cssIdent` · `reverseCSSTime` · `serializeTimingFunction` | **0 / 0 / 0 across all three files** (nine pairs, every one zero — the spec's declared negative witnesses). Chain re-verified: decl `backward/walk.ts:145` → `backward/index.ts:29` → `emit/index.ts:53`. `test/_root/public-surface.test.ts` **ABSENT** | **RED** |
| **G-OPTSET** | an option setter reaches the frames, or refuses | `git grep -n 'applyTimingFunction' origin/master -- src/animation/engine/option-setters.ts` ; `git grep -n 'setTimingFunction' origin/master -- src/` | `option-setters.ts:32` (decl) · `:149` (call); `engine/animation.ts:260` = the **sole** `setTimingFunction` declaration. `test/engine/option-setter-propagation.test.ts` **ABSENT** | **RED** — **four legs, not five** (OP-4 resolved demo-side) |
| **G-RAF** | `RAFPlayback` degrades, never wedges | `git show origin/master:src/animation/physics/playback.ts \| sed -n '110,152p'` ; `… :test/physics/raf-degrade.test.ts` | `_run` declared at `:113`; `const result = step(now)` with **no try/catch**; spec file **ABSENT** | **RED** |
| **G-RENDERER** | an editor round trip preserves a custom renderer | `git show origin/master:src/animation/engine/compile-bridge.ts \| sed -n '85,104p'` ; `… :test/engine/adopt-compiled-renderer.test.ts` | `adoptCompiled` transplants the compiler whole (`setCompilerFor(anim, compiler)`) and copies `anim.unflatten = source.unflatten`; spec file **ABSENT** | **RED** |
| **G-DEPCRUISE** | every LIGHT allowlist path resolves, and the baseline claim is TRUE | `npx depcruise --config .dependency-cruiser.cjs src` ; existence assertion over `LIGHT_BARREL_MODULES` ; the three-clause baseline oracle | `✔ no dependency violations found (**159 modules, 687 dependencies cruised**)`; **24 allowlist entries, 24 resolve, 0 DEAD**; (i) `grep -c 'knownViolations'` → **0** · (ii) no `--known-violations` flag in `lint` · (iii) `.dependency-cruiser-known-violations.json` **ABSENT** | **SPLIT — see the two findings below**: the **L-1 leg is GREEN-BEFORE-CURE**, and a **NEW RED** was minted in the same commit |
| **G-RING** | every ring has a written disposition | `npx depcruise … src --output-type err-long` (arm-D act) ; inventory MEASURE-AT-OPEN | runtime cycles **0** (the `✔` above); the **ring inventory is unmeasured at open** — a `depcruise` graph read is `.e`'s first act, and the banked 17 stays VOID as a denominator | **RED — the un-dispositioned inventory** (no ref disputes it) |
| **G-SHIM** (declared regression **floor**, not born-RED) | presets barrel stays three files, docblock stays true | `git ls-tree -r origin/master --name-only -- src/animation/presets` ; `git grep -c 'split by kind' origin/master -- src/` ; `npx vitest run` ; `npm run build` | **exactly 3** — `catalog.ts` · `classic-data.ts` · `index.ts`; **0** hits; vitest **library 1124 passed \| 1 expected fail \| 14 skipped (99 files passed, 5 skipped)** + **demo 30/191 passed**; build **✓ exit 0** | **GREEN — as the spec declares it** (cured at `7e9ddf49`; the floor's subject is the regression) |
| **G-STRUCT** | every god module and stutter carries a disposition | `for f in $(git ls-tree -r origin/master --name-only -- src \| grep '\.ts$'); do n=$(git show origin/master:$f \| wc -l); [ "$n" -ge 437 ] && echo "$n $f"; done` ; the parent-token predicate | **8 god modules** — `physics/spring/progress.ts` 484 · `engine/animation.ts` 478 · `orchestration/drag/draggable.ts` 470 · `ingest/cssom.ts` 466 · `compile/frame/compiler.ts` 461 · `compile/emit/entry.ts` 459 · `presets/classic-data.ts` 458 · `group/group.ts` 437 (**no new entrant**). **12 stutters** — `backward/backward.ts` · `format/format.ts` · `frame/compiled-frame.ts` · `group/group.ts` · `sequence/sequence.ts` · `split-text/split-text.ts` · `timeline/timeline.ts` · `view-transition/view-transition.ts` · `solver/solver.ts` · `resolve/element-resolve.ts` · `svg/draw-svg.ts` · `svg/morph-svg.ts` | **RED — 8 × 12 un-dispositioned**; both sets reproduce the spec's re-measured figures exactly at the NEW ref |
| **G-BASIS** | one counting basis, every rival derived or struck | `git ls-tree -r origin/master --name-only -- src \| grep -c '\.ts$'` ; `… grep -c '\.d\.ts$'` | **B0 = 153** · `.d.ts` = **0**. **The fifth rival now has a measured sibling**: `depcruise src` itself reports **159 modules** — the figure is still owed to `scripts/gates/structure/index.mjs`'s own definition, read out of the script, which is arm A/D's act | **RED — the reconciliation is unwritten** (B0 reproduces at the new ref unchanged) |
| **G-ID** | every carried id is record-qualified | `grep -cE 'KF-ES-[0-9]+\|(^\|[^-])\bL-2\b' waves/KF-W5.md` | **22 hits**, to be audited one by one by `.b` against the two declared exception cells | **RED — the audit is unrun at open** |
| **G-TAX** | KF.W5 has one meaning; this wave's act is the RELAY | `grep -rn 'KF.W5-PARTIALS' docs/tranches/V/megatranche/registry/adjudicated/` ; `grep -c 'SUPERSEDED\|superseded'` over the three | **3 header hits** — `kf-DemoGlobalChrome.md:17` · `kf-AnimationControlsGroup.md:17` · `kf-ControlsPaneWrapper.md:6`; **0** of the three carries a SUPERSEDED annotation **of that header** (kf-DemoGlobalChrome's single `SUPERSEDED` at `:154` is a byte-offset witness, a different subject — read at the bytes); **0 row hits** | **RED**, exactly as declared; **inbound-dependency leg stays unobservable** (SS-1/SS-2 owns it) |
| **G-SCOPE** | the wave's home is declared and no row is homeless | enumeration over the spec | §Carry **46** data rows (`awk` over `:309-379`, `^\| \*\*`) · §Excluded **6 numbered items carrying 12 re-homes** (item 1 = the seven-row prose sweep, items 2–6 = 5) → **46 + 12 = 58** | **GREEN on the arithmetic, RED on the act** — the comparison against the freshest census is `.b`'s |

### FINDING 1 — **GREEN-BEFORE-CURE (R.2): G-DEPCRUISE's L-1 leg was cured at the frontier by KF.W4**

The wave's one genuinely-RED arm-D row — D-1, *"`LIGHT_BARREL_MODULES` names **four missing paths**
(`physics/spring/{duration,reseat,linear-stops,timing-function}`), `LIGHT_FROM` is built off that list →
four LIGHT modules unguarded"*, which the spec re-verified **RED at `81a56990`** and called *"unmoved by
41 commits"* — **is GREEN at open**.

⟨`git show 81a56990:.dependency-cruiser.cjs | sed -n '55,78p' | grep spring`⟩ →
`"physics/spring/duration"` · `"physics/spring/reseat"` · `"physics/spring/linear-stops"` ·
`"physics/spring/timing-function"` — the four dead names, exactly as specced.
⟨`git show origin/master:.dependency-cruiser.cjs | sed -n '63,86p'`⟩ → `"physics/spring/solver/duration"` ·
`"physics/spring/solver/reseat"` · `"physics/spring/css/linear-stops"` · `"physics/spring/css/timing-function"`
— **the real homes**. Existence assertion over all **24** entries: **24 resolve, 0 DEAD**.
⟨`git log --oneline -S 'physics/spring/solver/duration' -- .dependency-cruiser.cjs`⟩ → **`fb509edd`**
*"ci(kf/merge-path): register plugin-vue, put the demo lane + lint on the blocking merge job,
essentials-only eslint, **depcruise past src/**, -monaco-themes (X.KF.W4 .b)"*.

**Disposition: CURED-AT-FRONTIER with its sha (`fb509edd`), the B-14 idiom, booked and never
re-booked.** `.e` books it as a cure by a sibling wave — **it may not claim it as this wave's work**,
and it must keep the **existence assertion** as a standing gate clause (the spec's own falsifier:
*"Fails if the four paths are re-pointed **without** the existence assertion"* — the re-point happened
elsewhere, so the assertion is now the whole live half of that leg).

### FINDING 2 — **the same commit made the honest baseline sentence FALSE; G-DEPCRUISE has a NEW live RED**

The `no-cycle` comment at `origin/master:.dependency-cruiser.cjs:130-142` still reads, verbatim:

> *"There is NO known-violations baseline: the historical `.dependency-cruiser-known-violations.json`
> ratchet was never created and is not wired (**`lint` is a bare `depcruise src`, no
> `--known-violations` flag**). …"*

⟨`git show origin/master:package.json | grep -n '"lint"'`⟩ → `:44 "lint": "depcruise --config
.dependency-cruiser.cjs src demo && eslint demo"`. The parenthetical's **first clause is now FALSE**
(`lint` is neither bare nor scoped to `src`); its second clause (**no `--known-violations` flag**) is
**TRUE**, and the sentence's load-bearing claim (no baseline ratchet) is **TRUE** — clauses (i)/(ii)/(iii)
of the three-clause oracle all hold at open.

G-DEPCRUISE's own falsifier — *"**Fails if the honest baseline sentence is deleted, weakened, or made
false**"* — therefore fires **on a clause a sibling wave moved out from under it**. `.e` cures it inside
the D-1+D-2 motion, as a **correction of the parenthetical to the live script**, never by deleting the
sentence (the L-19 obligation runs the other way) and never by reverting KF.W4's `lint`.

### FINDING 3 — **G-STAGGER-DOC leg 1's instrument is already RED; the gate needs an attribution rule**

`npx tsc --noEmit -p tsconfig.test.json` returns **24 diagnostics** at open (`TS6133` ×4 shown,
`TS2345` in `test/waapi/waapi-lifecycle.test.ts:241`, and 19 more) — **none of them this wave's**, and
the fixture the gate measures does not exist yet. `npx tsc --noEmit -p tsconfig.lib.json` (`check:lib`)
returns **3**. Both figures agree with KF.W4's independently-measured close (leg 2 = 24 · `check:lib` = 3),
which is the double-run this record relies on for them.

**Reading rule for leg 1, declared at open so no seat manufactures a pass**: the gate is GREEN iff
**zero diagnostics are attributable to `test/orchestration/stagger-doc-example.test.ts`**, with the
**24-diagnostic pre-existing floor** banked here and **not reduced by this wave** (those 24 belong to
KF.W4's honest-RED and to the UNIT packets). A seat that greens leg 1 by deleting a pre-existing error
has moved a sibling's RED, which is a HIGH defect.

### FINDING 4 — **OP-6's premise (KF-AT-12) is CURED at the frontier; the wave's stated premise is dated history**

`check` leg 1 is now `vue-tsc --noEmit -p tsconfig.json` (SFCs reached), `lint` reaches `demo` and runs
`eslint demo`, and `test:demo` exists and passes (30/191). The spec's premise sentence — *"no vue-tsc,
no eslint-plugin-vue, no eslint config; `check` is a THREE-LEG script whose first leg is a bare `tsc`…"* —
is **superseded by KF.W4's landing**, recorded here as a dated addendum-beside (E-3; the spec is not
patched). Two consequences bind execution: (a) **G-XSS's observability rider is DISCHARGED**; (b) the
**re-home reasoning is unchanged** — the demo rows still leave, by ownership (census S-2 → KF.W6), not
by instrument poverty.

### FINDING 5 — **the `.dependency-cruiser.cjs` coordinates have drifted; `.e` re-anchors by RULE NAME**

File is **261 L** at open (253 at `81a56990`). Re-derived by name this seat:
`LIGHT_BARREL_MODULES` **`:62-87`** (24 entries at `:63-86`) · `LIGHT_FROM` **`:92`** ·
rule 1 `no-cycle` **`:121`** with the honest comment at **`:130-142`** ·
`viaOnly.dependencyTypesNot` **`:156-157`** · rule 2 `leaf-no-engine-no-valuejs` **`:171`** ·
rule 3 `light-barrel-no-engine` **`:211`**. The spec's `81a56990` spellings (`:54-79`, `:84-86`, `:113`,
`:148-149`, `:163`, `:203`) are **dated readings**; the RULE NAMES are the anchors, as the spec itself
declares.

### Double-run block (WRITE-THEN-MEASURE)

Every published count above was re-run a second time at this seat; both runs agree:
`B0` **153 / 153** · god modules **8 / 8** · stutters **12 / 12** · allowlist entries **24 / 24** ·
allowlist DEAD **0 / 0** · G-XSS `innerHTML` **2 / 2** and property form **1 / 1** ·
`depcruise src` **✔ 0 violations, 159 modules, 687 deps** (both runs) · presets tree **3 / 3** ·
`snapToReducedMotion` **7 lines / 3 files** (both runs) · G-TAX **3 headers / 0 annotations / 0 rows**.

---

## Unit plan

**Five units, the spec's own arms** (`X.KF.W5.<x>`, WAVE_SPEC §5 form). Ordering is the spec's
§Sequencing S-0…S-7 and §Disjointness; concurrency is capped at **2** by the orchestrator, below the
spec's declared peak of 3, and **no two concurrent units share a modify path**. No seat is named Fable,
adjudicator or design-author anywhere in the spec, so **every seat is Opus** (M-12: Opus solo for
mechanical/challenge seats; receipts every seat, line 1 = SERVED MODEL).

| group | units | why this grouping |
|---|---|---|
| 1 | `.a` | **S-0 is unconditional**: the G-XSS `textContent` cure + the KAD-14(a) marker normalization land as **commit 1, before any other byte in any arm**. Nothing runs beside it |
| 2 | `.b` ∥ `.c` | `.b` writes **value.js docs only, zero code paths**; `.c` writes keyframes `src/**` + ten created specs. Disjoint by repo surface |
| 3 | `.d` | **S-5**: arm C *consumes* arm B's `singleTarget` ruling and never re-rules it; the ruling is one commit in `.c`. `.d`'s three `src` files are ones `.c` never opens |
| 4 | `.e` | **serial and alone, LAST** (§Disjointness): renames rewrite import sites across every zone, and `.e` renames three files `.c` modifies (`group/group.ts`, `split-text/split-text.ts`, `sequence/sequence.ts`). **S-6**: G-RING lands after B-6/B-8; G-STRUCT's splits after every arm-B ruling. **S-7**: renames last, `split-text.ts` last of all |

### `.a` — Arm 0, THE FRONT-LOAD

- **Sections**: §Bounds *Arm 0 — the demo annex* (`:267-272`) · §Carry *Arm 0 · THE FRONT-LOAD*
  (`:309-319`) · §Gates **G-XSS** (`:388-392`, the R3-3 verbatim re-cut, and `:400`) · §Sequencing
  **S-0** (`:429`) · §Disjointness `.a` clause (`:288-295`).
- **Writable**: kf `demo/components/instrument/keyframes/composables/useHighlightCSS.ts` ·
  kf `test/demo/instrument/highlight-css-roundtrip.test.ts` (**create, one file, by name**) ·
  vjs `docs/tranches/X/keyframes/evidence/W5/**` · vjs `docs/tranches/X/execution/B/KF-W5.md`.
- **Gates**: G-XSS (both halves).
- **Locks**: commit 1 of the wave, before any other byte in any arm; **the `:111` sink cure and the
  KAD-14(a) marker normalization are ONE commit** (the gate fails if they split); the nine tracked
  `test/demo/instrument/` files are READ-ONLY (four-party shared directory — KF.W4/W5/W7/W8) and the
  gate may not be greened by editing one.

### `.b` — Arm A, THE CENSUS

- **Sections**: §0 R-2 (`:37-53`) · §Bounds LAW A censuses (`:81-191`) · §Carry *Arm A · THE CENSUS*
  (`:321-332`) · §Gates **G-BASIS · G-ID · G-TAX · G-SCOPE** (`:416-419`) · §Sequencing RD-1…RD-4
  (`:454-459`).
- **Writable**: vjs `docs/tranches/X/keyframes/evidence/W5/**` · vjs
  `docs/tranches/X/execution/B/KF-W5.md`. **Zero code paths, either repo.**
- **Gates**: G-BASIS · G-ID · G-TAX (relay leg only) · G-SCOPE.
- **Locks**: the RD-2 relay row is G-TAX's **whole act at this end** — **G-TAX performs no registry
  edit**; all 58 `registry/adjudicated/kf-*.md` are read-only witnesses. The `"159 modules"` rival is
  closed by **reading `scripts/gates/structure/index.mjs`'s own definition**, not by argument.

### `.c` — Arm B, LIBRARY RULINGS AND CURES

- **Sections**: §0 R-3 (`:55-57`) · §Bounds *Arm B* (`:217-244`) · §Carry *Arm B* (`:334-359`) ·
  §Gates G-ROLE · G-REFUSE · G-REVERT · G-STAGGER-DOC · G-PRM-FLIP · G-DELAY · G-FROMSTRING ·
  G-CSSIDENT · G-OPTSET (`:401-409`) · §Sequencing S-2 · S-3 · S-4 (`:431-433`).
- **Writable** (kf): `src/animation/orchestration/split-text/split-text.ts` · `orchestration/stagger.ts` ·
  `group/{types,group,waapi,entries}.ts` · `engine/play-lifecycle/{strategies,frame,transport,events,index}.ts` ·
  `waapi/delegation.ts` · `internal/reduced-motion.ts` ·
  `orchestration/view-transition/view-transition.ts` · `engine/option-setters.ts` · `engine/animation.ts` ·
  `orchestration/sequence/sequence.ts` · `public.ts` · `index.ts` · `load-engine.ts` ·
  `compile/emit/index.ts` · `compile/emit/backward/backward.ts` · `constants/types.ts` ·
  `test/orchestration/{split-text.test.ts,split-a11y-oracle.test.ts}` · **creates**:
  `test/orchestration/{split-text-implicit-role,split-text-refuse,split-text-revert,stagger-doc-example}.test.ts` ·
  `test/group/group-viability.test.ts` ·
  `test/engine/{prm-engagement,delay-semantics,fromstring-idempotence,option-setter-propagation}.test.ts` ·
  `test/_root/public-surface.test.ts`. Plus vjs evidence + this record.
- **Gates**: G-ROLE · G-REFUSE · G-REVERT · G-STAGGER-DOC (2 legs) · G-PRM-FLIP · G-DELAY ·
  G-FROMSTRING · G-CSSIDENT · G-OPTSET.
- **Locks**: **S-2 RULE-BEFORE-FIX** — the four rulings are already taken at COHESION §0j.C KF-W5R4 and
  are **cited, never re-opened**; their ruling commits land before their fix commits, `fromString`
  (B-9) first. **S-4 families that must not split**: B-1+B-2+B-3 (one file, one landing) ·
  B-13+B-14+B-15 (the option-setter letter, four legs) · **the `setTargets` element contract — all
  THREE declarations carved in ONE commit** (`engine/animation.ts:465` · `group/group.ts:195` ·
  `sequence/sequence.ts:310`, re-verified at open). **S-3**: the publication decision precedes
  APPLY-UNIT and is **one ruling over THREE library names** (`cssIdent` · `reverseCSSTime` ·
  `serializeTimingFunction`) — `debounce`/`convertPixelsToCh` are **struck** from the GREEN condition.
  The **`singleTarget` ruling is ONE commit in `.c`** serving four rows; `.d` consumes it.
  **B-16 is NOT a leg here** (OP-4 resolved demo-side → KF.W8 shadow-name). `constants/types.ts:195`'s
  `| string` arm is KF.W4's and already landed at `0c52152a`; this wave takes `:182` only.

### `.d` — Arm C, THE ENGINE SEAM

- **Sections**: §Bounds *Arm C* (`:246-253`) · §Carry *Arm C* (`:361-367`) · §Gates **G-RENDERER ·
  G-RAF** (`:410-411`) · §Sequencing S-4 engine-seam packet · S-5 (`:433-434`).
- **Writable** (kf): `src/animation/engine/compile-bridge.ts` · `src/animation/engine/css/animation.ts` ·
  `src/animation/physics/playback.ts` · **creates** `test/engine/adopt-compiled-renderer.test.ts` ·
  `test/physics/raf-degrade.test.ts`. Plus vjs evidence + this record.
- **Gates**: G-RENDERER · G-RAF.
- **Locks**: **C-1 + C-2 land as ONE engine-seam packet** (reachable through the same editor path).
  **S-5**: consumes `.c`'s `singleTarget` ruling, never re-rules it, and does **not** open
  `group/group.ts`. The G-RENDERER cure is **library-side** (`adoptCompiled` preserves) — a demo-side
  re-supply is the forbidden shape; `usesDefaultRenderer` is the named instrument. G-RAF fails on a
  swallow: *"fail a frame loudly and recoverably, not wedge."*

### `.e` — Arm D, STRUCTURE (serial and alone, LAST)

- **Sections**: §Bounds *Arm D* (`:255-265`) · §Carry *Arm D* (`:369-378`) · §Gates **G-DEPCRUISE ·
  G-RING · G-SHIM · G-STRUCT** (`:412-415`) · §Sequencing S-6 · S-7 · the KF.W8 boundary (`:435-436`,
  `:444`).
- **Writable** (kf): `.dependency-cruiser.cjs` ·
  `src/animation/physics/spring/solver/{duration,reseat,solver,index}.ts` ·
  `src/animation/physics/spring/css/{linear-stops,timing-function,index}.ts` · the god-module roster
  **disposition-first** (`physics/spring/progress.ts` · `orchestration/drag/draggable.ts` ·
  `compile/frame/compiler.ts` · `compile/emit/entry.ts` · `presets/classic-data.ts`) · the **12 measured
  stutter paths** (rename + import migration, **one commit each**). Plus vjs evidence + this record.
  **Read + disposition only**: `ingest/cssom.ts` (KF.W2's boundary) · `presets/{index,catalog,classic-data}.ts`
  (regression floor).
- **Gates**: G-DEPCRUISE · G-RING · G-SHIM (floor) · G-STRUCT.
- **Locks**: **D-1 + D-2 are one motion** with D-4's two pass-throughs — **and D-1's four dead paths are
  CURED-AT-FRONTIER (`fb509edd`), booked with the sha and never claimed as this wave's work** (FINDING 1);
  what is live is the **existence assertion** and **FINDING 2's false parenthetical**. Every **rename +
  its import migration is ONE commit** (`git log --format=%H -1 -- <old> <new>` identical).
  **Renames LAST, `split-text/split-text.ts` last of all** (collides with B-1/B-2/B-3 and with
  `usability.mjs`'s `.wave-char`/`kf-split` coupling). **The 2 structural stutters are DECLINED-WHOLE at
  KF.W8 R-4** — this wave's denominator is the **12**, entire and this wave's. The ring inventory is
  **measured at open by `.e`'s own `depcruise` run**, per-ring dispositions, **never en-bloc**.

### Standing law for every unit of this wave

Idiomatic root-cause cures only — no try/catch around a defect, no `test.skip`, no allowlist, no copied
producer selector, no local `node_modules` patch. Writes only inside the unit's writable set; anything
else is an ESCALATION, returned, never taken. **glass-ui is READ-ONLY always** (SS-6 BH relay; a
producer row never becomes a demo-side hack). No `.vue` file is written by any arm, for any reason.
`scripts/dev/dev.sh` is never touched or staged, either repo. Pathspec commits only, with the pathspec
**on the commit itself** (four tracks share this index). Every created file's line 1 is
`SERVED MODEL: <model id>`. Every published count is read from the settled bytes and double-run.

---

## Unit receipts

_(empty at open; each unit appends its own section here, with its commits, gate readings and receipts)_
