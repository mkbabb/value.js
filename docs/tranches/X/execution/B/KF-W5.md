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

### X.KF.W5.a — Arm 0, THE FRONT-LOAD (S-0) — **DONE · G-XSS GREEN (both halves)**

**Seat**: Opus (`claude-opus-5[1m]`). **Substrate**: kf `master` == `origin/master` `7d958f21` at
open; zero tracked modifications; the two untracked rows (the §0m.0 survivors) never staged.
**Evidence**: `docs/tranches/X/keyframes/evidence/W5/G-XSS-unit-a.md` (the full receipt sheet).
Every figure below is read from the settled bytes and **double-run**; both runs agree.

**Acts, in order.**

1. **MEASURE — the gate's born state reproduces at the frontier.**
   ⟨`git grep -n 'innerHTML' origin/master -- demo/components/instrument/keyframes/composables/useHighlightCSS.ts`⟩
   → **2 lines**, `:111 el.innerHTML = s;` · `:123 el.innerHTML = h.value;`; property form
   ⟨`… | grep -v 'h\.value'`⟩ → **1**. Anchors verified at the true bytes, **none drifted**:
   `:104` bare `setCodeTheme()` · `:110`/`:117`/`:124` the marker · `:111` the sink · `:123` the
   hljs-escaped writer · `:31-40`/`:58-61` the singleton · `:147` the `highlight` export.

2. **THE FIXTURE, WRITTEN FIRST AND MEASURED RED.**
   `test/demo/instrument/highlight-css-roundtrip.test.ts` (create, the one file arm 0 owns in the
   four-party shared directory) drives the component path exactly as `KeyframesAddDialog.vue` wires
   it — `setHighlightingString` → `highlightAll` → `innerText` → emit.
   ⟨`npx vitest run --project demo test/demo/instrument/highlight-css-roundtrip.test.ts`⟩ against the
   **un-cured** composable → **4 failed (4)**: `100% { content: "<name> & <other>"; }` returned as
   `100% { content: " & "; }` (both tags swallowed); `children.length` ≠ 0; a crafted `?state=`
   payload minted a **live `<img src=x onerror=…>`**; and the empty-first-open case never
   colourised at all — the boolean marker read `"true"` and the session was inert.

3. **COMMIT 1 (S-0) — `a9fe060fc7c4c8138071a6aa141aa78d0b1f8148`**, one file, the sink cure **and**
   the KAD-14(a) marker redesign together, as the lock requires. `:111` → `el.textContent = s`. The
   marker becomes a module-level `WeakMap<HTMLElement, string>` recording **the source text the
   element's current markup was produced from** — a pass is skipped exactly when the element
   already shows the highlight of the text it holds — and `setHighlightingString` deletes the
   element's record because the element now holds raw text. KAD-14(a)'s trap is then structurally
   impossible: there is no boolean left to normalise. **`:123` is untouched** (the declared
   inversion): the escaped `h.value` write survives verbatim, at `:198` of the cured file. No live
   consumer of the old attribute exists — ⟨`git grep -n 'highlighted' origin/master -- .`⟩ returns
   prose only (`PlaybackRibbon.vue:161` + seven dated tranche docs).

4. **COMMIT 2 — `3fa103cd`**, the fixture. **GREEN 4/4** against the cured composable.

5. **COMMIT 3 — `2f688f9c` (KAD-5)**: `applyCodeTheme` (may reject) + a `setCodeTheme` **boundary**
   that handles the rejection once; both callers — the per-keydown ensure and `watch(isDark, …)` —
   go through it, so **no bare async call is left**. **Non-toast posture**, as the row requires: the
   demo's toast surface is structurally unreachable (the vue-sonner stylesheet is imported nowhere),
   so a toast would be an inert cure.

6. **COMMIT 4 — `54d5c20e` (KAD-14(b))**: the github stylesheet is written only when the theme
   actually changed; the per-keystroke whole-sheet re-parse is gone, the dark-mode flip still writes.

7. **COMMIT 5 — `f5f68034` (KAD-14(d))**: the shared `#highlightjs-theme` node is refcounted — the
   **last** holder out removes it. **Premise re-verified before grading, as the row demands**:
   `useCodeHighlight` has exactly two call sites (`KeyframesEditor.vue:176` ·
   `KeyframesAddDialog.vue:92`) and the dialog is rendered **unconditionally** inside the editor's
   toolbar (`KeyframesEditor.vue:75`, no `v-if`) — child and parent **do** co-terminate, so the row
   stays **LATENT**. N-2's three-concurrent-instances bank is about `useKeyframesEditor`, a
   **different composable** (⟨`git grep -n 'useCodeHighlight' -- demo/`⟩ → 2 call sites, neither in
   `KeyframesStringControls.vue`); recorded so it is not re-filed as a falsification. The cure lands
   regardless — co-termination is a property of one template, not of the composable.

8. **COMMIT 6 — `8bc83753` (KAD-14(e))**: `highlight` dropped from the return. Symbol census re-run
   at the settled bytes — `KeyframesEditor.vue:176` takes `{ highlightAll }`,
   `KeyframesAddDialog.vue:92` takes `{ setHighlightingString, highlightAll }`, the new fixture uses
   the same two: **consumers of `highlight` = ∅**. It survives as `highlightAll`'s internal
   per-element step. `vue-tsc` raises nothing at either consumer — the independent check on the
   delete.

**Gate readings, BEFORE → AFTER (double-run).**

| gate leg | command | before | after (run 1 / run 2) |
|---|---|---|---|
| **G-XSS** observable | `git grep -n 'innerHTML' <ref> -- …/useHighlightCSS.ts` | **2 lines** (`:111` sink · `:123` escaped writer) | **exactly ONE line**, `:198 el.innerHTML = h.value` — the `h.value` writer, `h = hljs.highlight(el.innerText, {language:"css"})` / same |
| **G-XSS** observable, property form | `… \| grep -v 'h\.value'` | **1** | **0 / 0** |
| **G-XSS** round-trip | `npx vitest run --project demo` | 30 files / 191 tests, fixture **ABSENT** | **31 files / 195 tests passed** / **31 / 195** |
| the fixture alone | `npx vitest run --project demo test/…/highlight-css-roundtrip.test.ts` | **4 failed (4)** | **4 passed (4)** |

Delta over the record's §Baseline: **+1 file / +4 tests**, all this unit's. **G-XSS: RED → GREEN,
both halves.** Falsifiers honoured at the bytes — the escaped write is neither deleted nor
rewritten; no new `innerHTML` write appears in the file; `setHighlightingString` assigns no
caller-supplied markup; the fixture was **not** re-homed into a library zone directory; and **no
tracked file in `test/demo/instrument/` was touched** (the nine are byte-identical; the unit's only
directory footprint is one added path).

**Instrument floors, measured and attributed — none of them moved by this unit.**
`npx tsc --noEmit -p tsconfig.test.json` → **24** (the record's banked floor, FINDING 3; ⟨`… | grep
-c 'highlight-css-roundtrip'`⟩ → **0**). `npx vue-tsc --noEmit -p tsconfig.json` → **34** across 24
files; ⟨`… | grep -c 'useHighlightCSS\|highlight-css-roundtrip'`⟩ → **0** (`KeyframesEditor.vue`'s
two are `TS2339 … 'KeyframeSelector'` at `(38,73)`/`(43,41)`, a different subject). `npm run lint` →
**4 `no-cycle` errors**, all the pre-existing `demo/scenes/cube/orbital-drag/**` ring; `npx eslint`
over the composable alone → clean. **The floors are carried, never reduced**: greening a leg by
deleting a sibling's pre-existing diagnostic would move another wave's RED.

**Instrument caveat, declared (not buried).** jsdom implements no `innerText` (measured:
`"innerText" in HTMLElement.prototype` → **false** at jsdom 29). It is the **reader** the component
uses, never this gate's **subject**, which is the writer — so the spec installs a `<pre>`-faithful
shim for its own duration and removes it in `afterAll` (the editable surface is `white-space: pre`,
where `innerText` and `textContent` agree byte for byte). The shim flatters nothing: the fixture was
**RED 4/4 with it installed** and went GREEN only when the writer changed.

**Bounds.** Two keyframes.js paths written — `…/composables/useHighlightCSS.ts` (modify, taken
whole) and `test/demo/instrument/highlight-css-roundtrip.test.ts` (create, by name) — plus this
record and `docs/tranches/X/keyframes/evidence/W5/`. **No `src/` byte, no `.vue` byte, no glass-ui
byte, no `scripts/dev/dev.sh`.** Six commits, each with its own pathspec **on the commit itself**,
each carrying the session trailer; nothing staged that was not this unit's.

**Residuals / carries.**
- **KAD-14(c)** (`onMounted :156-160`, SFC-side) **NOT TAKEN** — §Excluded, rides KAD-17's KF.W6
  packet; no `.vue` byte was written.
- **Nothing pushed.** Under KF-WRITE the push of `origin HEAD` is the **wave's close**, not a
  unit's; the six commits sit on kf `master` ahead of `origin/master` awaiting that close.
- **E13**: the record's open-time four-path sweep stands; this unit minted no mail, consumed no
  routed letter, and leaves **0 UNREAD in its scope**.
- **No escalation.** Every anchor resolved at the true bytes and the specified cure was reachable
  as specified.

### X.KF.W5.b — Arm A, THE CENSUS — **DONE · G-BASIS · G-TAX (relay) · G-SCOPE GREEN · G-ID GREEN-at-the-probe's-unit with 2 published residues**

**Seat**: Opus (`claude-opus-5[1m]`). **Bounds**: value.js docs only — `docs/tranches/X/keyframes/evidence/W5/CENSUS-unit-b.md`
(create) and this record. **Zero code paths, either repo. Zero `registry/adjudicated/` bytes**
(G-TAX performs no registry edit — all 58 `kf-*.md` were read-only witnesses, ⟨`ls
registry/adjudicated/kf-*.md | wc -l`⟩ → 58, none written). glass-ui read only at
`node_modules/`, never modified. **Evidence**: `docs/tranches/X/keyframes/evidence/W5/CENSUS-unit-b.md`
(689 L, the full receipt sheet; every figure below is derived there with its command). Every figure
is read from the settled bytes and **double-run**; both runs agree (sheet §7).

**Substrate.** kf `origin/master` **`7d958f21`**; kf HEAD `8bc83753` = `master`, **6 commits ahead**,
all of them `.a`'s S-0 front-load, **none under `src/`** — so B0 is measured at `7d958f21` as the
record declares, and the choice is stated rather than assumed (⟨`git ls-tree -r HEAD --name-only --
src | grep -c '\.ts$'`⟩ returns the same 153).

**Acts, in order.**

1. **THE SPEC'S OWN BYTES, CHECKED AGAINST THE CONFORMANCE SEAL — a divergence, found and explained.**
   ⟨`shasum -a 256 waves/KF-W5.md`⟩ → `216a9102…`; ⟨`grep -n 'waves/KF-W5.md'
   conformance/PASS-8/CHECK.md`⟩ → `:22 153eb206…`. **The live spec is not the pass-8 sealed spec.**
   Cause measured: ⟨`git log --oneline -5 -- …/KF-W5.md`⟩ → head **`ba6dcdb3`** (X·union repair r1,
   2026-08-30), *after* `3c4807d0` (X·KF CONFORMANT pass 8, 2026-08-29); ⟨`git show
   3c4807d0:…/KF-W5.md | shasum -a 256`⟩ → **`153eb206…`, the pass-8 hash exactly**; ⟨`git diff -U0
   3c4807d0 ba6dcdb3 -- …/KF-W5.md | grep -E '^@@'`⟩ → **`@@ -353 +353 @@`** and **`@@ -445 +445 @@`**
   — **two lines, changed in place, no line-number shift**, and they are the **X-union S-5 cure**
   (`4.0.0 → V at RC-P(V)`, the dated addendum-beside at §Carry B-16 and the KF.W2/KF.W3 bullet) that
   this record's own precondition row verified PRESENT at both sites. **Lawful under E-3.**
   **Consequence measured, not assumed**: ⟨`git show 3c4807d0:… | grep -cE 'KF-ES-[0-9]+|(^|[^-])\bL-2\b'`⟩
   → **22** (= live) and ⟨`… | awk 'NR>=309 && NR<=379 && /^\| \*\*/' | wc -l`⟩ → **46** (= live).
   **Every figure this unit publishes is invariant across the seal→live delta**, and both substrates
   are stated.

2. **G-BASIS — B0 declared with its probe, and all five rivals closed.**
   **B0 = ⟨`git ls-tree -r 7d958f21 --name-only -- src | grep -c '\.ts$'`⟩ → 153** (153/153);
   ⟨`… grep -c '\.d\.ts$'`⟩ → **0** (measured and excluded **as a cause**, not assumed). Unmoved by
   KF.W4: the same probe at `81a56990` → **153**.
   - **139 — DERIVED**: B0's own probe at the disqualified `8281638c` → **139**, exact. A dated
     reading of the same basis, not a rival.
   - **145 — DERIVED AND NOW EXTINCT**: the lane's `find src -type f -name '*.ts' | wc -l` walks the
     worktree where `ls-tree` reads the tree. **Run today it returns 153**, and ⟨`git status
     --porcelain -- src`⟩ → **0 rows**. The `139 − 2 deleted + 8 untracked` delta *was* the
     uncommitted WIP and **§B-12 settled it** — the two instruments now agree, which is the
     reconciliation completing rather than being argued.
   - **153 — ADOPTED**, and corroborated by the binding census itself: ⟨`grep -n 'KF.W5'
     CENSUS-2026-08-03.md`⟩ → `:194` *"per-component D/L/C over the **14 zones / 153+**"* — **both
     numerals re-derived from the tree at act 3**.
   - **"159 modules" — DERIVED, AND ITS ATTRIBUTION STRUCK.** §0 R-2 owed this figure to
     `scripts/gates/structure/index.mjs`'s own definition. **Read out of the script**: `SCOPES.src =
     { roots: ["src"], fileExtensions: [".ts"] }` (`:70-78`) with `!n.endsWith(".d.ts")` (`:142`) —
     **B0's predicate, character for character** — and its reporter (`:598-622`) prints violations,
     **never a module tally**; run live, ⟨`npm run proof:structure`⟩ → `PASS: scope=src clean (0
     violations across R1–R6)`, **no "159" anywhere in it**. The figure is **depcruise's**
     (⟨`npx depcruise --config .dependency-cruiser.cjs src`⟩ → `✔ … (159 modules, 687 dependencies
     cruised)`), and it **derives from B0 exactly**: the JSON graph partitions **159 = 153 under
     `src/` + 6 external `@mkbabb/value.js/{color,css,easing,math,transform,value}`**, with the 153
     **SET-EQUAL** to `git ls-tree`'s (both `comm` directions empty, **both runs** — cardinality was
     not enough). **FINDING: `FOLD-FORWARD §C` credits "159 modules" to `proof:structure`, and that
     attribution is FALSE at the bytes** — which is why the figure read as a disagreement for three
     rounds: it was credited to the one instrument that could not have produced it. Dated
     addendum-beside; no authority patched.
   - **80 — STRUCK, and now STRUCK-TERMINAL.** §0 R-2's sole recovery path was *"if B18's rule is
     found in its own text"*; **COHESION §0j.C KF-OGKF1 closes it** — *"the five conditional TCC
     re-reads never open"*. **This seat opened no Codex root.** The strike carries a measurement
     rather than a refusal: reconstructing *"public library surfaces"* as published export **names**
     over the three entries gives **141 + 79 + 3 → 178 distinct, +1 namespace export = 179**, plus an
     unexpanded `export * from "./engine"` — **2.2× over 80**, counting rule stated at the
     enumeration. No filtered subset of B0 lands on 80.

3. **G-BASIS — the zone census and the D/L/C matrix, denominated in B0.**
   ⟨`git ls-tree -r 7d958f21 … | awk -F/ …`⟩ → **14 zones summing to 153** (the census's *"14 zones /
   153+"*, reproduced from the tree). **The lane's 145 is explained zone by zone**, not just
   arithmetically: compile **+6** · engine **+4** · group **+1** · presets **−3** = **+8**, the four
   named carve/delete commits and nothing else.
   **Axes declared at the scoring site** — **D** design (API shape, defaults, refusals) · **L**
   library-contract truth (docblocks, types, published surface) · **C** code (structure, coupling,
   zone hygiene). **Coverage in the B10-21 shape, with OWNED defined at the enumeration** (a B0
   module named by a KF.W5 disposition that opens or reads it by path: §Bounds access rows ∪ rename
   subjects ∪ god-module roster ∪ presets floor ∪ `ingest/cssom.ts`; created `test/**` specs are not
   B0 modules and are excluded by construction). All 53 existence-checked: ⟨`git cat-file -e
   7d958f21:<path>` ×53⟩ → **53 OK / 0 MISS**, ⟨`comm -23 owned b0`⟩ → ∅.

   > **53 owned + 100 unowned = 153.** **Non-conflation lock live**: B18's `39 + 114 = 153` is a
   > **LEAF** count over a harness; mine is a **module** count over B0. The denominators coincide, the
   > subjects do not, and the agreement **must never be cited as corroboration**.

   | zone | owned/total | D (gates) | L (reach · contract defects) | C (god · stutter · allowlist) |
   |---|---|--:|---|---|
   | compile | 7/29 · 24.1% | 2 | 29/29 · 1 | 2 · 3 · 0 |
   | physics | 9/22 · 40.9% | 1 | 22/22 · 0 | 1 · 1 · 13 |
   | orchestration | 7/20 · 35.0% | 4 | **19/20** · 3 | 1 · 4 · 10 |
   | engine | 9/17 · 52.9% | 5 | 17/17 · 1 | 1 · 0 · 0 |
   | group | 5/15 · 33.3% | 1 | 15/15 · 0 | 1 · 1 · 0 |
   | internal | 1/9 · 11.1% | 1 | 9/9 · 0 | 0 · 0 · 0 |
   | resolve | 1/8 · 12.5% | 0 | 8/8 · 0 | 0 · 1 · 0 |
   | scroll | 0/7 · 0.0% | 0 | 7/7 · 0 | 0 · 0 · 0 |
   | waapi | 3/6 · 50.0% | 1 | 6/6 · 0 | 0 · 0 · 0 |
   | svg | 2/6 · 33.3% | 0 | 6/6 · 0 | 0 · 2 · 0 |
   | (root) | 4/5 · 80.0% | 1 | 5/5 · 1 | 0 · 0 · 1 |
   | presets | 3/3 · 100.0% | 0 | 3/3 · 0 (floor, `7e9ddf49`) | 1 · 0 · 0 |
   | ingest | 1/3 · 33.3% | 0 (KF.W2's boundary) | 3/3 · 0 | 1 · 0 · 0 |
   | constants | 1/3 · 33.3% | 0 | 3/3 · 0 | 0 · 0 · 0 |
   | **TOTAL** | **53/153 · 34.6%** | **11 distinct · 16 incidences** | **151/153 · 6** | **8 · 12 · 24** |

   **Both of the total row's counting rules are printed at the table** (5 gates land in 2–3 zones, so
   16 incidences over 11 distinct gates; 11 + G-XSS + 4 docs-side + 4 arm-D structural = **20**, the
   roster partitioned without remainder). Every denominator carries its probe: **g = 8** (the ≥437 L
   loop, no new entrant) · **s = 12** (the corrected D-6 predicate, act 4) · **a = 24** (`:62-88`,
   existence-asserted **24 OK / 0 DEAD**, confirming the record's FINDING 1 — D-1 CURED-AT-FRONTIER
   `fb509edd`, the live half is the assertion, which is `.e`'s to install) · **reach = 151/153** by
   transitive closure over the depcruise graph from the three published entries; **the two
   unreachable modules are the zone barrels `orchestration/index.ts` and `physics/index.ts`**.

   > **THE L-AXIS WARNING, recorded so no seat cites the matrix against the contract.** `reach` is a
   > **module-graph** metric and reads **98.7% GREEN**. The real defect is **symbol-level**:
   > `cssIdent` sits in a 100%-reachable module and ⟨`git grep -c 'cssIdent' 7d958f21 --
   > src/animation/{index,public,load-engine}.ts`⟩ → **0 / 0 / 0**. A module-reach metric scores that
   > zone perfect. **That is the G-L7d class one level up** — and it is the same failure mode arm A's
   > own KF-ES-20 row carries. **The L axis is scored at the SYMBOL; G-CSSIDENT is its instrument.**

   Reading, one line each: **engine** is the densest surface (5 of 11 gates, 52.9% owned) and holds
   the one *false* docblock; **orchestration** is the widest (4 gates · 4 of 12 stutters · 3 of 6
   contract defects) and the only zone whose barrel is unpublished; **compile** is the deepest unowned
   surface (24.1%) while holding the publication BLOCKER; **scroll is 0/7** — the one zone this wave
   does not touch, recorded as a fact (no registry row routes there), not as a gap.

4. **FINDING — the D-6 stutter predicate, AS WORDED, returns 10, not 12.** Taken literally
   (*"a basename token equal to its parent directory token"*, hyphen-tokenised) the probe returns
   **10** and drops **`orchestration/split-text/split-text.ts`** and
   **`orchestration/view-transition/view-transition.ts`** — precisely because their parent dirs are
   themselves hyphenated. With the **eponymous whole-name arm** added (`basename == parent` **OR**
   some hyphen-token of basename `== parent`) it returns **12/12**, a set **identical to D-6's
   enumeration, member for member**. **The SET is right; the WORDING is under-specified.** Dated
   addendum-beside (E-3, the spec is not patched) and **routed to `.e`**, which executes the rename
   programme against this predicate under S-7 — a literal reading would drop the two subjects S-7
   itself singles out as most hazardous (`split-text.ts` is *"last of all"*).

5. **G-ID — the gate's own probe, run, and audited at BOTH units.**
   ⟨`grep -cE 'KF-ES-[0-9]+|(^|[^-])\bL-2\b' KF-W5.md`⟩ → **22 / 22**, the record's banked figure;
   lines `3 · 30 · 32 · 260 · 276 · 297 · 328 · 329 · 330 · 358 · 365 · 374 · 386 · 412 · 417 · 442 ·
   456 · 458 · 469 · 478 · 481 · 484`. **COUNTING RULE AT THE ENUMERATION**: `grep -c` counts
   **LINES**; the file carries **58 OCCURRENCES** (34 `KF-ES-n` — `-1`×4 · `-8`×7 · `-20`×11 ·
   `-34`×4 · `-36`×4 · `-43`×4 — plus 24 `L-2`). **The gate's probe is stated at the LINE and its
   pass condition (*"fails on any bare …"*) at the OCCURRENCE. Both readings are published; neither
   is buried.**
   - **The two declared exception cells verified at their sites**: **E1 = `:417`** (the §Gates G-ID
     row's command/witness cells) · **E2 = `:456`** (RD-1's statement of the collision).
   - **LINE unit: 22 / 22 QUALIFIED.** The other twenty lines each name a record for every distinct id
     they carry (table in the sheet, line by line).
   - **OCCURRENCE unit**: a re-runnable ±80-char proximity probe over the record token set
     {`lane-library`, `kf-SquareScene`, `kf-EasingSidebar`, `kf-EasingScene`} → **58 · 51 qualified ·
     7 residue**, adjudicated by hand: **2 QUALIFIED by short-form attribution** (`:330`'s
     `(Sidebar)`/`(Scene)`) · **3 MENTION-OF-THE-DEFECT** · **2 genuinely BARE AT SITE**.

6. **FINDING — the round-3 G-ID cure was written BESIDE the defect, not AT it, and the probe's unit has hidden that for three passes.**
   `:386`'s ⟨ID QUALIFIED, repair round 3⟩ note says the bare `L-2` *"is now **lane-library `L-2`**"*.
   **At the bytes it is not**: occurrence 1 on that same line still reads `G-DEPCRUISE's L-2 leg ← the
   honest comment`, unqualified. The repair added the qualification **in a note on the same grep
   line**, so `grep -cE` has read the line as carrying its record ever since. `:412` occurrence 3 is
   the same shape in miniature (*"and for L-2 (cured, `81a56990`)"*, qualified two clauses earlier on
   the same line). **Fourth generation of the class the gate's own cell narrates**, and its mechanism
   is now named: **the probe and the pass condition are stated at different units**, so a cure that
   satisfies the line satisfies the probe while leaving the occurrence bare. **Durable cure, one
   sentence: state the probe at the occurrence (`grep -oE`) so the units cannot diverge again.**
   **No spec byte written** — the spec is IMMUTABLE (E-3) and outside this unit's writable set;
   **routed to KF.W10** as a doc-authority addendum, the destination §0 R-1.4's own ruling names.

7. **FINDING — a THIRD G-ID exception class exists de facto and is undeclared.** Three residue
   occurrences (`:330` once, `:386` twice) are **mentions of the defect** — a repair note or gate cell
   quoting the bare token in order to say it was bare. The gate's rationale already blesses the shape
   (*"a gate must be able to NAME the pattern it forbids"*) but its **exception set is drawn at two
   cells** and these sit outside both. **Booked as a named class rather than waived in silence**; the
   honest cure is to declare the third cell, not to widen the blessing informally. Routed to KF.W10
   with act 6. **RD-1 itself is re-verified and stands as written** — this seat adds nothing and
   subtracts nothing.

8. **G-TAX — the RD-2 relay row, which is this wave's WHOLE act at this end.**
   **Born state re-measured**: ⟨`grep -rn 'KF.W5-PARTIALS' registry/adjudicated/`⟩ → **3 lines, both
   runs** — `kf-AnimationControlsGroup.md:17` (**the mint**) · `kf-DemoGlobalChrome.md:17` (inherits,
   *"as fixed in the kf-AnimationControlsGroup record"*) · `kf-ControlsPaneWrapper.md:6` (inherits,
   *"as instantiated by the parent record"*); ⟨`grep -c 'SUPERSEDED\|superseded'` over the three⟩ →
   **0 · 1 · 0**, the single hit being `kf-DemoGlobalChrome.md:154`, whose subject is a **dead
   `dist/gh-pages` byte-offset coordinate** — a different subject, read at the bytes; **0 row hits**.
   **THE RELAY ROW** names all three records with their coordinates, the **superseded** authority
   `formation/keyframes/lane-frontend.md §10` and the **binding** one
   `formation/keyframes/CENSUS-2026-08-03.md §(a):177-206`, and requests a dated **E-3 addendum under
   each record's original id — an addendum, never an edit, never authored from this wave**.
   **What the relay ADDS is the mechanism, measured**: ⟨`grep -n '^## 10' lane-frontend.md`⟩ →
   **`:610 ## 10. Recommended wave order`**, whose **item 5** reads *"**S-6, S-7, S-5** — low-risk
   partials (skeleton plate, button shell, typewriter)"*; ⟨`grep -n 'KF.W5'
   CENSUS-2026-08-03.md`⟩ → **`:194` *"KF.W5 · D/L/C Tri-Fold Library Audit"***. **The superseded
   authority indexes waves by POSITION in a recommendation; the binding census names them by
   SUBJECT** — position 5 became "KF.W5" and its cargo became "KF.W5-PARTIALS". Not a typo: two
   naming schemes over one token, the older one calling itself *Recommended* in its own heading.
   **Reciprocated from the other end**, re-read at the bytes: `carry/KF-W6-CARRY.md:9` (*"…is
   **SUPERSEDED** by `CENSUS-2026-08-03 §(a)`"*) and `:13` (*"**KF.W5-PARTIALS ⇒ THIS WAVE**"*).
   **Third-party corroboration from a seat that inherited nothing**: `conformance/PASS-8/CHECK.md:65`
   re-homes five further bare tokens (`L-17` · `N-1` · `N-3` · `SUP-4` · `L-8`) as *"bare-token
   candidates from records using the **superseded `lane-frontend.md §10` seven-wave numbering**"* —
   **the mis-routing class is live beyond these three records**, which is why the relay earns its row.

9. **G-SCOPE — enumerate, then compare.**
   ⟨`awk 'NR>=309 && NR<=379 && /^\| \*\*/' KF-W5.md | wc -l`⟩ → **46 / 46**, and **each arm counted
   over its own sub-range** so the sum is five independent measurements: Arm 0 `309-320` **7** · Arm A
   `321-333` **8** · Arm B `334-360` **22** · Arm C `361-368` **3** · Arm D `369-379` **6**.
   §Excluded: ⟨`awk … /^[0-9]+\. \*\*/`⟩ → **6 numbered items**; ⟨`awk … /^   - \*\*/ | wc -l`⟩ → **7
   sub-bullets**, all under item 1 (`KF-SS-6` · `KF-SS-31` · `KF-SS-38` · `KF-SS-4` · `KF-ET-33` ·
   `KF-ET-35` · `KF-ES-36`). **7 + 5 = 12 re-homes**, destinations **KF.W6 ×11 · KF.W7 ×1** (KAD-13,
   whole). **46 + 12 = 58**, at the live bytes *and* at the pass-8 sealed bytes.
   **THE COMPARISON, which is the act the spec reserves to `.b`.** Freshest whole-corpus census =
   `conformance/PASS-8/CHECK.md` + `VERDICT.md` (2026-08-29): **CONFORMANT**, *"Census **CLEAN — 0
   escapes**"*, 2,633 rows · 58/58 records · 20 residuals adjudicated. ⟨`ls -d conformance/PASS-*/`⟩ →
   PASS-1…PASS-8, **no PASS-9**, so the citation needs no re-pointing at this seat. Freshest
   wave-specific = `PASS-6/KF-W5-CHECK.md`: **43 routed · 43 booked · 0 escaped**. **Re-derived here
   from bytes, inheriting neither figure**: the 43 routed ids were lifted from PASS-6 §1.2's by-record
   table and each counted in the spec — ⟨`grep -o -- "$id" KF-W5.md | wc -l` ×43⟩ → **every one ≥ 1,
   zero escaped** (densest `KAD-1` 36 · `C-8` 21 · `KAD-14` 16; singletons `KF-CB-36` · `KF-KC-27` ·
   `KF-TD-5` · `KF-TD-8` · `S★-2`). **One counting rule the comparison forced, and it is RD-1's own
   defect class one level up**: the loop has **42 rows, not 43** — kf-KeyframesStringControls and
   kf-TimelineHoverPreview each mint `C-8`, so **43 record-qualified routed ids = 42 distinct id
   TOKENS**. A byte-level check can only measure tokens; the 43 lives at the record. **Measured now,
   not described.**

10. **The two census-truth arms, SCORED — findings only, the bytes are KF.W6's (§0 R-1.3).**
    - **KF-ET-27** ⟨kf-EasingTarget⟩ **CONFIRMED at the frontier, both limbs.** `BALL_SIZE` encoded
      **three times across two languages** — `EasingTarget.css:163 --ball-size: 14px` ·
      `EasingTarget.vue:235 const BALL_SIZE = 14` (consumed at `:257`, the rail computed for 14) ·
      `design-idioms.css:180-182 var(--ball-size, **36px**)`, the shared fallback at **2.6×** the
      rail's own value. And the **FALSE CONTRACT naming this exact file**: `design-idioms.css:163`
      asserts *"is the seam EasingTarget reads via `getComputedStyle`"* while ⟨`git grep -c
      'getComputedStyle' 7d958f21 -- demo/scenes/easing/`⟩ → **0 hits** (the demo's nine live sites
      are in `instrument/timeline`, `scenes/amiga`, `scenes/spring`, `scenes/square` — **none under
      `scenes/easing/`**). **SCORE: L = FALSE** (an authority asserts a seam, by name, against a
      component that never opens it) · **D = SPLIT** (one geometry, three declarations, two languages,
      a default that renders against the wrong rail) · **C = benign**.
    - **kf-EasingSidebar `KF-ES-20`** **CONFIRMED, and it is the G-L7d class.** `font-roles.json:43`
      binds the `control-label` role to selector **`.labeled-field-label`**; `style.css:276-279`
      carries a demo `@layer demo-typography` override plus the prose claim *"glass-ui binds
      `.labeled-field-label` …"*. At the installed producer — ⟨glass-ui **7.0.0**⟩ —
      ⟨`grep -rl 'labeled-field-label' node_modules/@mkbabb/glass-ui/dist/ | wc -l`⟩ → **0**, while
      ⟨`grep -rl 'glass-label' …`⟩ → **2** (`dist/label-DJA3eNLS.js` · `dist/glass-ui.css`).
      **SCORE: L = FALSE twice over** (the JSON `note` and the CSS comment both assert a bind the dist
      does not make) · **D = VACUOUS** (*"a font census that matches zero elements is a green gate
      measuring nothing"*) · **C = dead** (unreachable override). **Cure is at the CENSUS, not the
      component** — the one-line role re-point `.labeled-field-label` → `.glass-label` — **riding
      KF.W6's demo sweep**, declared here so the identity is never re-booked.
    - **One motion, and the reason they score together**: both are **authorities that name something
      the tree does not contain** — a seam and a class. **SS-6 posture honoured**: KF-ES-20 is a
      *demo-side census defect naming a producer class*, not a producer defect; **no glass-ui byte was
      written or proposed**, and glass-ui was read only.

**Gate readings, BEFORE → AFTER (double-run).**

| gate | before (record §Baseline) | after (run 1 / run 2) |
|---|---|---|
| **G-BASIS** | **RED — the reconciliation is unwritten**; B0 = 153, the fifth rival owed to `scripts/gates/structure/index.mjs` | **GREEN** — B0 = 153 with its probe and ref; 139 · 145 derived; **159 derived as 153 + 6 externals with set-equality proven**, and its `proof:structure` attribution **struck as false**; 80 **STRUCK-TERMINAL** under §0j.C KF-OGKF1 with a 179-name measurement beside it; 14-zone census + D/L/C matrix in the B10-21 shape, **53 + 100 = 153** / identical |
| **G-ID** | **RED — the audit is unrun at open** (22 hits) | **GREEN at the LINE unit, 22/22** (the unit its own probe counts) — **RED by exactly 2 at the OCCURRENCE unit** (`:386` occ-1 · `:412` occ-3), + 3 qualified-by-mention under an undeclared class; both readings published / identical |
| **G-TAX** (relay leg) | **RED** — 3 header hits · 0 SUPERSEDED annotations · 0 row hits | **RELAY LEG GREEN** — the row names all three records, the superseded and binding authorities, the measured mechanism and two independent corroborations. **Annotation leg RED and unobservable by design** (SS-1/SS-2's act); **0 registry bytes written** / identical |
| **G-SCOPE** | **GREEN on the arithmetic, RED on the act** | **GREEN on both** — 46 (7·8·22·3·6) + 12 (7 + 5) = **58**, at live *and* sealed bytes; compared against PASS-8 (0 escapes, whole corpus) and PASS-6 (43/43/0), the latter **re-derived here from the spec's bytes**: 42 tokens, all ≥ 1, **0 escaped** / identical |

**Bounds.** Two value.js paths written — `docs/tranches/X/keyframes/evidence/W5/CENSUS-unit-b.md`
(create) and this record. **No keyframes.js byte, no `src/` byte, no `.vue` byte, no
`registry/adjudicated/` byte, no glass-ui byte, no `scripts/dev/dev.sh`.** Two commits, each with its
own pathspec **on the commit itself**, each carrying the session trailer.

**Residuals / carries.**
- **`.e` consumes the D-6 predicate correction (act 4)** — the SET (12) is unchanged; a literal
  reading of the wording drops `split-text/split-text.ts` and `view-transition/view-transition.ts`.
- **KF.W10 receives acts 6 and 7** as doc-authority addenda (two G-ID citation-form residues + one
  undeclared exception class). **No spec byte written here.**
- **SS-1/SS-2 receive RD-1 and RD-2** (acts 7 and 8). **No registry byte written here.**
- **`FOLD-FORWARD §C`'s "159 modules" attribution is FALSE** (act 2) — dated addendum-beside.
- **The pass-8 seal and the live spec differ by exactly the two X-union S-5 lines** (act 1); every
  figure published here is invariant across that delta, measured at both substrates.
- **Nothing pushed.** Under KF-WRITE the push is the **wave's close**, not a unit's; this unit wrote
  no keyframes.js byte in any case.
- **E13**: the record's open-time four-path sweep stands; this unit minted no mail, consumed no routed
  letter, and leaves **0 UNREAD in its scope**.
- **No escalation.** Every anchor resolved at the true bytes and every specified act was reachable as
  specified.
