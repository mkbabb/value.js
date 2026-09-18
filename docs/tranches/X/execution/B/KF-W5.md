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

### X.KF.W5.c — Arm B, LIBRARY RULINGS AND CURES — **DONE-WITH-ESCALATIONS · 8 of 9 gates GREEN**

**Seat**: Opus (`claude-opus-5[1m]`). **Substrate**: kf `master`, from this wave's HEAD `8bc83753`
(arm 0's last commit) to `99834edc`. **Evidence**: `docs/tranches/X/keyframes/evidence/W5/ARM-B-unit-c.md`
(the full receipt sheet — every BEFORE→AFTER, both escalations' measurements, the errata).
Every figure below is read from the settled bytes and **double-run**; both runs agree.

**THE SHARED WORKTREE, STATED FIRST.** A concurrent **X.KF.W2** seat wrote the same keyframes.js
worktree and index throughout this unit's window and committed four times inside my range
(`f7cbc41c` · `49cd647b` · `46f0b77b` · `36b4615a`), holding `compile/emit/format/format.ts`,
`compile/emit/view-transition.ts`, `ingest/cssom.ts` and the new `compile/parse-facade.ts` mid-edit at
various points. Every commit below carries **its own pathspec on the commit itself**; nothing of a
sibling's was ever staged (verified per landing with `git show --stat`). Where an instrument reading
moved under a sibling's edit it is attributed, never absorbed.

**Acts, in order.**

1. **S-2 RULE-BEFORE-FIX — the four KF-W5R4 rulings, cited and never re-opened.**
   - **(1) `fromString` REPLACES — ESCALATED, no byte in bounds.** Measured first, reproducing the
     bank exactly: **3 template frames → a second `fromString`+`parse` → 6** with duplicated
     selectors; a second ingest of DIFFERENT text → **5**, the union. The sole declaration is
     ⟨`git grep -n 'fromString' -- src`⟩ → `src/animation/engine/css/animation.ts:166`, **outside
     `.c`'s writable set** (it is `.d`'s), and no other seam exists — the loop calls `this.addFrame`
     directly and `addFrame` only pushes. Escalated per METHOD rather than substituted for.
   - **(2) `delay` is PER-PLAY — `1c481b09`** (`engine/play-lifecycle/frame.ts`). `onEnd` clears
     `startTime` every iteration and `advanceTo` re-entered `onStart`, which re-slept the whole delay
     AND re-offset `startTime` → a JS period of `duration + delay` (27 %/cycle unbounded drift) plus
     corrupt `iteration` bookkeeping. One predicate now decides both the sleep and the phase, read
     BEFORE `onStart` runs so the two cannot disagree. WAAPI agrees: a native delay is one offset.
   - **(3) the PRM default INVERTED engine-wide — `d002ce7e`** (`group/group.ts` ·
     `sequence/sequence.ts` · `internal/reduced-motion.ts` · `orchestration/view-transition/`).
     `view-transition` defaulted `true` while `AnimationGroup` and `Sequence` defaulted `false` — "the
     honest default exists in-house and is used nowhere". The two are inverted to match the third;
     `false` is now the explicit opt-out; the policy docblock stops calling `false` "the conservative
     default". **Bounded residual, declared**: four seeds of `respectReducedMotion: false` remain, all
     outside the writable set — `constants/defaults.ts:87` (the animation-level default),
     `physics/smooth.ts:43`, `physics/numeric.ts:89`, `physics/spring/types.ts:119`.
   - **(4) `singleTarget` gains a SUPPORTED opt-out — `0b593743`**, ONE commit serving four rows.
     Assignment DECLARES; the ctor derive and the `setTargets` recompute share ONE private derivation
     that no-ops while a declaration stands; `deriveSingleTarget()` is the inverse. **Reading
     recorded**: KF-CB-15's ctor mis-derivation is discharged *by the opt-out being honoured*, as the
     ruling says it is discharged "for free" — the `every()` formula is NOT changed, because changing
     it would flip `test/group/group.test.ts:71-76`, a tracked spec outside this unit's bounds, and
     turn a free discharge into a second escalation.

2. **The split-text motion — `2549c133`**, B-1+B-2+B-3 in ONE landing as S-4 requires (one file, one
   motion), with its three created specs. B-1: the role guard now asks whether the element has a
   naming-capable role AT ALL — written or IMPLICIT — so an `<h1>` keeps its heading role, and
   `role: null` is the supported opt-out. B-2: measurability is decided BEFORE any node is written
   (connected + own box + a throwaway absolutely-positioned probe child, the only way a laid-out
   container yields boxless children) — **not** restored in a catch, which the gate's falsifier
   forbids; the ResizeObserver's "keep the last good map" comment is true for the first time. B-3:
   both `aria-label` and `role` are snapshotted explicitly (`innerHTML` carries neither) and restored
   exactly — not a blanket attribute rollback. **Born-RED measured against the un-cured file: 11
   failed | 10 passed → 21 passed.**

3. **G-PRM-FLIP — `685ca13f`** (`waapi/delegation.ts` + `engine/play-lifecycle/strategies.ts` + the
   spec), then **`99834edc`** (the R6 follow-through). On the lane the library SHIPS, a live flip was
   never observed: `snapToReducedMotion`'s only caller was `playFrame`, which a delegated animation
   never runs, while the docblock asserted "The WAAPI lane snaps via the same path" for a path with no
   caller. The shadow tick — that lane's one per-tick observation point — now consults the SAME
   detector and takes the SAME snap, with the snap **INJECTED** (`WAAPIDelegationHooks`, a required
   parameter) because importing it into `waapi/` would close a `waapi ↔ engine` ring `no-cycle`
   forbids. depcruise stayed at **0 violations**. **2 failed | 3 passed (both failures "wedged" — a
   blind lane cannot end an infinite animation) → 5 passed.**

4. **G-DELAY's gate — `f0f86ed8`.** Asserts the ruling through `advanceTo`'s own mechanism rather than
   wall-clock: iteration 1 async + `startTime = t + delay`; iterations 2..N **sync** with
   `startTime === t` and local time starting at 0, never at `−delay`; the play costs
   `delay + N·duration`; a fresh play takes the delay again; `delay: 0` untouched.
   **2 failed | 3 passed → 5 passed.**

5. **G-FROMSTRING's gate — `e9b64342`, BORN-RED BY BOUNDS.** The two ruled assertions ride the repo's
   own documented born-RED idiom (`it.fails`, as `test/group/group-snapshot-identity.test.ts` uses
   it): executed, failing, and they FLIP the day the cure lands. Not a skip, not an allowlist, and
   they pin the RULING, never the defect. **1 passed | 2 expected fail.**

6. **The option-setter letter — `24bbeda2`**, B-13+B-14+B-15 in ONE commit (four legs, do not split).
   Leg 1+2: `applyTimingFunction` propagates BY IDENTITY — an inherited frame holds the previous
   `Easing` object (what `addFrame` stored), an author-declared one is a different object and is never
   touched — so the setter reaches the compiled frames instead of no-opping, and the compiler's own
   "No setter silently no-ops a change to compiled state" becomes true. Leg 3: `KeyframesAnimation.compiled`
   makes the per-frame precondition OBSERVABLE (`frames` yields `[]` both pre-parse and for a
   segment-less animation — the caller could "neither assert nor observe" which). Leg 4: the emit
   posture is symmetric — the `@keyframes` block emitters join the shorthand inside ONE designed
   refusal, and the catch is NARROWER than the bare one it replaces (only
   `AnimationOptionError("timingFunction")` is absorbed; anything else propagates). No blanket outer
   guard was added. **9 failed | 2 passed → 11 passed.**

7. **S-3 · THE PUBLICATION DECISION — `2e0d91ae`** (`public.ts` · `load-engine.ts` ·
   `compile/emit/index.ts` + the spec). ONE ruling over THREE library names + KF-ET-32's registry, and
   it is PUBLISH, not relocate. RED at open reproduced the bank exactly: ⟨`git grep -c … -- index.ts
   public.ts load-engine.ts`⟩ → **0/0/0** for each of the three, nine pairs every one zero. Heavy
   surface only (all five carry value.js by specifier; the LIGHT barrel's boundary is not spent on a
   convenience re-export, and the spec asserts that exclusion as a DECLARED decision).
   `compile/emit/css-text.ts` is NOT edited — reserved to KF.W2/KF.W3 — the two serializers ride out
   through the emit sub-zone barrel. `debounce`/`convertPixelsToCh` are struck from the oracle (zero
   declarations under `src/` makes the assertion a tautology). **5 failed | 2 passed → 7 passed**;
   `proof:publish` **PASS**.

8. **G-STAGGER-DOC, both legs — `c0727002`.** Leg 1: `stagger.ts`'s canonical example (and
   `split-text.ts`'s twin) did not typecheck — `{ animation, options: { delay } }` into a VARIADIC
   constructor, against an `AnimationGroupInput` with no `options` field. **The docs now describe the
   type** (the delay rides the CHILD, where `toWAAPIOptions` reads it); the group-rewrite cure stays
   SEVERED. Both examples are lifted VERBATIM into the fixture that `tsc -p tsconfig.test.json`
   compiles, and the old shape is pinned by two `@ts-expect-error`s in a compiled-never-executed body
   — because the array form does not merely fail to typecheck, it THROWS inside the constructor
   (measured). Leg 2 (**P-8**) is ANSWERED by measurement, prescribing nothing: a multi-target group
   is derived non-single-target and the WAAPI fast lane refuses it by name; **per-child `delay` IS
   honoured through the group's advance** (one tick → `startTime` 1000/1120/1240 for
   `stagger(3,{each:120})`); infinite children keep the group un-done and it reads their state; a
   managed child's `play()` throws. So N per-instance rAF loops is not the only shape available — the
   component-side evaluation stays KF.W6's.

9. **B-21 doc-rot — `9e5aec60`.** Three comments (`entries.ts:16`, `group.ts:170`/`:264` banked;
   `:228`/`:325` after this wave's landings) directed the reader to a `./scheduler` module that does
   not exist in `group/`. Corrected to the same-directory `./yield-batch`. The sibling-basename trap
   is censused, not reasoned about: the REAL `internal/scheduler.ts` has four live consumers and
   **none is repointed**; no import is touched, all three edits are comment text.

10. **B-20 — `95d91c53`.** `Partial<InputAnimationOptions>` is a tautology; the four in-bounds
    signatures drop it and the declaration now says so where a reader meets it. Type-identical by
    construction. Five sites keep it, all outside the writable set (named in the evidence sheet).
    `constants/types.ts:195`'s `| string` arm is KF.W4's and already landed at `0c52152a`; this wave
    took `:182` (today `:234`, the anchor re-derived by name) only.

11. **B-17 — `5a494429`.** `loadAnimationEngine`'s `??=` memoized the REJECTED promise, so one failed
    chunk poisoned the heavy surface for the mount's lifetime with an unhandled rejection on the LCP
    node as its only surface. The memo is dropped on failure and the error re-thrown to its caller —
    a retry, not a swallow; the success path's shared in-flight load is unchanged. Lands before, and
    constrains, the kin row KF-SKEL-5.

**Gate readings, BEFORE → AFTER (all double-run).**

| gate | before | after |
|---|---|---|
| **G-ROLE** | RED by absence (spec ABSENT) | **GREEN — 8 passed / 8 passed** |
| **G-REFUSE** | RED by absence | **GREEN — 7 / 7** |
| **G-REVERT** | RED by absence | **GREEN — 6 / 6** |
| **G-STAGGER-DOC leg 1** | RED — fixture ABSENT, example does not typecheck | **GREEN — 0 diagnostics attributable to the fixture / 0** |
| **G-STAGGER-DOC leg 2 (P-8)** | RED by absence — "no evidence either way" | **GREEN — 5 / 5, the answer recorded** |
| **G-PRM-FLIP** | RED — 7 lines / 3 files, `delegation.ts` absent from the `withReducedMotion` census | **GREEN — 5 / 5** |
| **G-DELAY** | RED by absence; ruling taken | **GREEN — 5 / 5** |
| **G-FROMSTRING** | RED — 3 → 6 frames, selectors duplicated | **RED — 1 passed \| 2 expected fail · ESCALATED (bounds)** |
| **G-CSSIDENT** | RED — 0/0/0 across the three published entries | **GREEN — 7 / 7** |
| **G-OPTSET** | RED — four legs, none met | **GREEN — 11 / 11** |

**Instruments at close (this unit's attribution measured, not assumed).**
⟨`npx vitest run --project library`⟩ → **110 files passed | 5 skipped · 1211 passed | 3 expected fail
| 14 skipped** (the 3 = the repo's 1 pre-existing + this unit's 2 born-RED rows).
⟨`npx depcruise --config .dependency-cruiser.cjs src`⟩ → **✔ 0 violations, 160 modules, 702 deps**
(159/687 at open; +1 module is the sibling's `parse-facade.ts`).
⟨`npx tsc --noEmit -p tsconfig.lib.json`⟩ → **3**, the banked pre-existing `TS6133` floor, unmoved.
⟨`npx tsc --noEmit -p tsconfig.test.json`⟩ → **28** against the record's banked **24**; ⟨`… | grep -cE
'<this unit's ten spec filenames>'`⟩ → **0** twice and ⟨`… | grep '^src/'`⟩ names only the three
pre-existing rows — **no diagnostic names a file this unit wrote**; the +4 arrived with the sibling's
mid-edit `format.ts`/`view-transition.ts`. FINDING 3's reading rule is honoured: no pre-existing
diagnostic was deleted to green a leg.
⟨`node scripts/gates/structure/index.mjs`⟩ → **1 violation**, `ingest/cssom.ts` 530 L — the sibling's
file. This unit's three (`engine/animation.ts` 507 L, `group/group.ts` 502 L, and R6
`WAAPIDelegationHooks has no consumer`) were **caused and cured inside the unit**, by trimming this
unit's own prose to 497/498 L and naming the hook type at its call site — never by editing an
allowlist and never by carving a module, which is `.e`'s act under S-6.
⟨`node scripts/gates/surface/index.mjs`⟩ (`proof:publish`) → **PASS**; `llms.txt`/`llms-full.txt`
byte-identical to a fresh generation.

**Commits (13, each with its own pathspec on the commit, each carrying the session trailer).**
`1c481b09` · `d002ce7e` · `0b593743` · `2549c133` · `685ca13f` · `f0f86ed8` · `e9b64342` · `24bbeda2` ·
`2e0d91ae` · `c0727002` · `9e5aec60` · `95d91c53` · `5a494429` · `99834edc` ⟨fourteen shas, thirteen
meanings: `99834edc` is `685ca13f`'s R6 follow-through and is booked with it⟩.

**ESCALATIONS (2).**
1. **`fromString` REPLACES (B-9 / G-FROMSTRING)** — the cure's only site is
   `src/animation/engine/css/animation.ts:166`, outside `.c`'s writable set (it is `.d`'s), and no
   in-bounds seam exists. RED measured (3 → 6 / 3 → 5) and pinned by an executable gate. **The wave
   must route one act to the seat that owns that file**: clear the template set (and the compiled
   frames with it) before the ingest loop, then unwrap the two `it.fails` rows to plain `it`.
2. **the `setTargets` element contract (B-19 / KF-CB-30)** — the widening cannot stop at the three
   declarations: the field `engine/animation.ts:63` and the ctor param `:175` carry it. Measured
   twice at a clean tree: **9 new diagnostics across 5 files**, 3 of them outside this unit's bounds
   (`engine/compile-bridge.ts` ×2 — `.d`'s file · `engine/interpolate.ts` ×3 ·
   `resolve/element-resolve.ts` ×2). **A finding rides it**: `element-resolve.ts(191,38)` is
   `Property 'style' does not exist on type 'Element'` — a genuine HTML-only member reach that
   **refutes** B-19's INFO rationale ("grep-verified HTML-only members → 0"). Nothing was written: no
   cast, no partial widening, no substitute contract.

**Residuals / carries.**
- **B-16 is not armed** (OP-4 resolved demo-side → KF.W8's shadow-name row), exactly as the lock says.
- **B-22's two riders are RELAYED verbatim, never re-booked** — value.js needs a lossless
  timing-function serializer twin for `parseTimingFunction`, and `easing()`'s analytic-first
  resolution order documented in the `.d.ts`. The row itself is NO-WAVE-OWNER and CURE-LOCKED by
  KF-ET-2; no byte was written for it.
- **B-5 and B-18 are records, not bytes** — B-5 is carried beside B-4 as the account of how B-4 was
  reached; B-18's magnitude is KF.W9's one `performance.measure`.
- **Two errata, declared** (full text in the evidence sheet): `24bbeda2`'s body lost the two words
  **`frames`** and **`KeyframesAnimation.compiled`** to zsh command substitution inside a
  double-quoted `-m` — the commit is NOT amended (a shared index makes an amend a contamination risk)
  and the correction travels as this dated note (E-3); and the `singleTarget` docblock's 5-line trim,
  made for the R4 line ceiling after `0b593743` had landed, rode into `9e5aec60` instead of a commit
  of its own — this unit's own bytes in this unit's own file, no sibling's work touched.
- **A vacuity this unit caught in its own gate**: G-OPTSET leg 4's first fixtures asserted a
  `custom-renderer` refusal over hand-authored animations, which `probeChildRefusal` refuses UP FRONT
  for an unrelated reason (`NOOP_TRANSFORM` ≠ the instance's default renderer) — they PASSED against
  the un-cured file, i.e. a green gate measuring nothing (this wave's own G-L7d class). Re-cut onto
  CSS-ingested fixtures. Recorded because the discipline that caught it — run every new gate against
  the un-cured bytes before trusting it — is the transferable part.
- **`test/_root/public-surface.test.ts` needed `git add -f`**: `.gitignore:9` is the bare rule `_*`,
  which matches the tree's own `test/_root/` zone directory; the tracked sibling
  `test/_root/resolve-easing.test.ts` carries the identical exemption. `.gitignore` is not edited.
- **Nothing pushed.** Under KF-WRITE the push of `origin HEAD` is the WAVE's close, not a unit's; the
  fourteen commits sit on kf `master` ahead of `origin/master` awaiting it.
- **E13**: the record's open-time four-path sweep stands; this unit minted no mail, consumed no routed
  letter, and leaves **0 UNREAD in its scope**.

### X.KF.W5.d — Arm C, THE ENGINE SEAM — **DONE · G-RENDERER · G-RAF GREEN**

**Seat**: Opus (`claude-opus-5[1m]`). **Substrate**: kf `master`, from this wave's HEAD **`55347314`**
(the concurrent X.KF.W2 seat's last landing) to **`d7f68225`**. **Evidence**:
`docs/tranches/X/keyframes/evidence/W5/ARM-C-unit-d.md` (the full sheet — every anchor re-measurement,
both born-RED runs, the two vacuity findings, the instrument attribution).
Every figure below is read from the settled bytes and **double-run**; both runs agree.

**Sections executed, whole and only**: §Bounds *Arm C* (`:246-253`) · §Carry *Arm C* (`:361-367`) ·
§Gates **G-RENDERER · G-RAF** (`:410-411`) · §Sequencing **S-4** (the engine-seam packet) **· S-5**
(`:433-434`) · §Disjointness the `.d` clause (`:297-299`). **S-5 honoured**: `.c`'s `singleTarget`
ruling (`0b593743`) is **consumed and never re-ruled**, and `group/group.ts` / `group/waapi.ts` were
**not opened** by this seat.

**Bounds, re-verified at true bytes before any edit.** The three `src` files PRESENT
(`compile-bridge.ts` **113 L** · `engine/css/animation.ts` **253 L** · `physics/playback.ts` **250 L**);
both created specs ABSENT at `55347314` (⟨`git cat-file -e`⟩ ×2), so the `create` verb is real.

**ANCHOR DRIFT — one file, recorded, not smoothed over.** `compile-bridge.ts:85-104`/`:95-99`
**reproduces** (`:88` decl · `:94-95` the transplant · `:98` `anim.unflatten = source.unflatten`).
`playback.ts` **reproduces exactly**: `_run` **`:113`**, `const result = step(now)` **`:139`**,
`void (…).then(reschedule)` **`:144`** — one argument, no rejection arm.
**`engine/css/animation.ts` has DRIFTED BY 3 (up)**: `resolveTransform` declared **`:107`** (spec
`:110`), called **`:115`/`:132`/`:167`** (spec `:118`/`:135`/`:170`), the *"reference comparison
(`usesDefaultRenderer`)"* comment at **`:105`** (spec `:108`). **INTENT taken at the true bytes**; the
drift is KF.W4's landing (`81a56990` → `7d958f21`) and later, beside the spec's own round-2 re-path of
this file. The call COUNT is the spec's three and it reproduces.

**Acts, in order.**

1. **C-1 / G-RENDERER — the cure is LIBRARY-side, keyed on the named instrument.** `adoptCompiled`
   transplanted the compiler whole **and** copied `source.unflatten`, so the RENDERER rode along with
   the compiled state. `usesDefaultRenderer(fn)` is `fn === this._defaultTransform` against a
   **per-instance** field (`engine/animation.ts:155`/`:159-161`), so an adoption leaves the receiver
   holding a **foreign instance's** function. **Two faces, both measured at the un-cured bytes**: (i)
   the row's — a receiver's custom `transformFunc` is replaced by the throwaway's default, `unflatten`
   goes `false`, and the renderer is **never called again** for the mount's lifetime; (ii) one the row
   did not have to name and the same bytes produce — a receiver on the **DEFAULT** renderer also ends
   up holding a foreign default, so `usesDefaultRenderer` answers **false** (the WAAPI fast lane then
   refuses the animation for a renderer nobody supplied — `waapi/eligibility.ts:130`,
   `compile/emit/entry.ts:279`, `refusal-probes.ts:32`) **and the default paint writes the SOURCE's
   element** from the receiver's play (measured: `destinationTarget.style.opacity` stayed `""`). The
   pre-existing seam spec rebinds the computed SLOTS to the receiver and asserts `at()`, never a paint,
   so face (ii) was invisible to it. **The cure is one rule**: *the renderer is the RECEIVER's unless
   the SOURCE declared one of its own* — read through `usesDefaultRenderer` (the reference test
   `engine/css/animation.ts:105`'s own comment already names) off the frames, taken BEFORE the
   transplant, and re-pointed onto the adopted **template** frames as well as the compiled ones,
   because `FrameCompiler.createFrame` re-derives transforms from `templateFrames`
   (`compile/frame/compiler.ts:197-209`) and the next `parse()` would otherwise **re-derive the loss**.
   `unflatten` travels with the renderer it describes. **The forbidden shape was not taken**: no
   `demo/` byte is in the commit, and `useKeyframeOps.ts` stays a read-only witness.
   **One honest addendum-beside in bounds**: `resolveTransform`'s docblock claim *"keeps WAAPI
   eligibility a reference comparison"* was **false across `adoptCompiled`** and is true again only
   because a second site upholds it — the docblock now names that site. No behaviour rides that edit.
   **`engine/animation.ts` was NOT opened** (it is `.c`'s): `_defaultTransform` is `protected`, so the
   receiver's own default is recovered through the **public** reference test rather than by adding an
   accessor out of bounds.

2. **C-2 / G-RAF — degrade, never wedge; a swallow fails the gate.** `_run`'s frame had **no failure
   path in either shape**: a sync throw skipped `reschedule`, and an async rejection met a `.then` with
   no rejection arm. In both, `_cleanup` never ran, `_rafId` stayed populated, **`running` stayed true
   for the driver's lifetime**, and a pending `play()` promise never settled — so every consumer
   guarding on `!playback.running` became a **permanent no-op**. A failed frame now winds the loop down
   **through `reschedule`** (so the generation guard still decides whether this frame owns the driver,
   and a stale failure cannot strand the loop that replaced it) and then **RE-RAISES the failure
   unchanged** — the caller sees the error its own `step` produced. One `failFrame` serves both arms so
   they cannot diverge.

3. **Both gates written, and both AUDITED FOR VACUITY BEFORE BEING TRUSTED** (the discipline `.c`
   recorded as the transferable part of its G-OPTSET leg-4 finding). **G-RENDERER's headline wording —
   *"`usesDefaultRenderer` still false"* — is VACUOUS at the un-cured bytes** (a receiver asked about a
   FOREIGN default answers `false` too); it is kept and named in the file as the gate's **letter**, and
   every bite is an identity, a flag or a value the un-cured seam cannot produce. **G-RAF's *"it
   throws"* is likewise vacuous** — the un-cured frame throws as well, that being the defect's delivery
   — so every bite there is a **recovery** assertion. G-RENDERER is written against the SEAM: both
   animations are built from the library's own entry points and **nothing in either spec reaches
   `demo/`**; `SquareScene` appears twice, both in the header docblock (the provenance citation and the
   falsifier itself), **zero times in the body**.

**Gate readings, BEFORE → AFTER (both double-run; each born-RED measured with the FINAL spec bytes
against the un-cured source file, restored into the worktree by `git show HEAD:<path> > <path>` over a
scratchpad copy and put back — no `git stash`, no `reset`).**

| gate | before | after |
|---|---|---|
| **G-RENDERER** | RED — spec ABSENT; `adoptCompiled` transplants the compiler whole and copies the flag. With the spec present: **5 failed \| 1 passed (6)** ×2 (the 1 pass is a **regression lock**, not a bite) | **GREEN — 6 passed (6)** ×2 |
| **G-RAF** | RED — spec ABSENT; `:139` `const result = step(now)` with no try/catch and `:144` a one-argument `.then`. With the spec present: **5 failed \| 2 passed (7)** ×2 (the 2 passes are the loudness/guard locks) | **GREEN — 7 passed (7)** ×2 |

**Instruments at close (attribution measured, not assumed).**
⟨`npx vitest run --project library`⟩ → **112 files passed | 5 skipped · 1224 passed | 3 expected fail |
14 skipped** — `.c` closed at 110/1211, so **+2 files and +13 tests, this unit's two specs exactly**
(6 + 7). **The 3 expected fail are UNMOVED** (1 pre-existing + `.c`'s 2 born-RED G-FROMSTRING rows):
this unit added none and unwrapped none.
⟨`npx vitest run --project demo`⟩ → **31 files | 195 passed**, unmoved (no `demo/` byte written).
⟨`npx tsc --noEmit -p tsconfig.lib.json`⟩ → **3**, the banked `TS6133` floor, unmoved.
⟨`npx tsc --noEmit -p tsconfig.test.json`⟩ → **24**, the record's own open baseline; ⟨`… | grep -cE
'adopt-compiled-renderer|raf-degrade|compile-bridge|physics/playback|engine/css/animation'`⟩ → **0** —
**no diagnostic names a file this unit wrote**, and none was deleted to green a leg (FINDING 3's rule).
The 28→24 against `.c`'s reading is the sibling's mid-edit files leaving the worktree.
⟨`npx depcruise --config .dependency-cruiser.cjs src`⟩ → **✔ 0 violations, 160 modules, 705 deps**
(160/702 at `.c`'s close). **This unit adds 0 modules and 0 module-pairs**: `engine/compile-bridge →
constants` was already an edge (`import type { Vars }`) and is only widened to a runtime import
(`NOOP_TRANSFORM`); the +3 deps arrive with the sibling's two commits in this window (`0cfd3b5f`,
`55347314`) — attributed, not absorbed.
⟨`node scripts/gates/structure/index.mjs`⟩ → **PASS, 0 violations across R1–R6** (this unit's three
`src` files settle at 186 / 263 / 280 L; no allowlist edited, no module carved — `.e`'s act under S-6).
⟨`node scripts/gates/surface/index.mjs`⟩ (`proof:publish`) → **PASS**; `llms.txt`/`llms-full.txt`
byte-identical to a fresh generation.

**Commit (1 — the engine-seam packet, which S-4 forbids splitting).**
`d7f68225` *fix(kf/w5.d): the renderer belongs to the RECEIVER, and a failed frame degrades instead of
wedging (G-RENDERER + G-RAF)*. ⟨`git show --numstat --format= d7f68225`⟩ → **5 files, 567 insertions,
13 deletions** — `compile-bridge.ts` 84/11 · `engine/css/animation.ts` 10/0 · `physics/playback.ts`
32/2 · `test/engine/adopt-compiled-renderer.test.ts` 207/0 · `test/physics/raf-degrade.test.ts` 234/0.
The pathspec rides the commit itself; **nothing of a sibling's is in it**, and ⟨`git status
--porcelain`⟩ after the landing shows only the two untracked I-26 mail survivors (the §0m.0 class),
exactly as at open. Both created files carry `// SERVED MODEL: claude-opus-5[1m]` as line 1.
**Nothing pushed** — under KF-WRITE the push of `origin HEAD` is the **WAVE's** close, not a unit's.

**ESCALATIONS: none.** The specified cure was reachable at the bytes for both rows.

**Residuals / carries.**
- **`.c`'s ESCALATION 1 (`fromString` REPLACES / G-FROMSTRING) is NOT taken here, and the reason is
  BOUNDS, not reluctance.** Its cure site — `engine/css/animation.ts:166`, today **`:176`**, re-derived
  by name this seat — **is** in `.d`'s writable set, but **G-FROMSTRING is not one of `.d`'s gates and
  `test/engine/fromstring-idempotence.test.ts` is not in `.d`'s writable set**. Landing only the
  in-bounds half would be **actively harmful**: `.c` pinned the ruling with two `it.fails` rows, and an
  `it.fails` that starts passing is a **test FAILURE** — the cure alone turns the library suite RED.
  **Routing, stated for the wave**: the act needs ONE seat holding **both** files — clear the template
  set (and the compiled frames with it) before the ingest loop, **then** unwrap the two rows to plain
  `it`. Carried, not performed.
- **A defect this unit cured that its row did not name**: the adopted-default face (ii) above. Same
  seam, same rule, same line of cure; booked so a later census does not read it as scope creep, with
  gate clauses (c1)/(c2) holding the floor.
- **E13**: this unit minted no mail, consumed no routed letter, and leaves **0 UNREAD in its scope**;
  `INBOX.md` is outside this unit's writable set and was read-only here.

### X.KF.W5.e — Arm D, STRUCTURE (serial and alone, LAST) — **PARTIAL · 4 of 4 gates GREEN · 1 bounds ESCALATION**

**Seat**: Opus (`claude-opus-5[1m]`). **Substrate**: kf `master`, opened at `d7f68225` (arm `.d`'s last
commit), closed at **`e325018f`**; a concurrent **X.KF.W2** seat landed `0b747396` inside the window.
**Evidence**: `docs/tranches/X/keyframes/evidence/W5/ARM-D-unit-e.md` (657 L — the 45-ring disposition
table, the 10×god / 12×stutter matrices with their probes, the falsifier transcript, the double-run
block, four relays and the escalation). Every figure below is read from the settled bytes and
**double-run**; both runs agree.

**THE SHARED WORKTREE, STATED FIRST.** X.KF.W2 wrote this worktree throughout. Both of this unit's
commits carry **their own pathspec on the commit itself** (`git show --stat` verified per landing: one
file each, nothing of a sibling's staged). Two sibling readings crossed my instruments and are
**attributed, never absorbed**: a transient 2-fail library run caused by that seat's mid-edit
`test/compile/grammar-fuzz.test.ts` (green once it committed), and **B0 153 → 154** (its new
`compile/parse-facade.ts`).

**Acts, in order.**

1. **G-RING opened the unit, as the seat brief requires — the inventory measured, never inherited.**
   The gate's own command is green by construction (the rule exempts type-only edges), so the exemption
   was **lifted to measure and restored to judge**, via a read-only overlay in the scratchpad that
   `require`s the repo config and reuses its `options` verbatim. ⟨`npx depcruise --config
   .dependency-cruiser.cjs src --output-type err-long`⟩ → **✔ 0 violations, 160 modules, 705
   dependencies** (runtime cycles **0**); ⟨same cruise, `viaOnly` lifted⟩ → **x 45 violations** =
   **RING COUNT 45 at `e325018f`**, run twice, `cmp -s` byte-identical. The **banked 17 is VOID as a
   denominator** and is not compared against, not delta'd, not re-asserted. **The exemption is proved,
   not asserted**: every one of the 45 rings was re-walked edge-by-edge against depcruise's own
   `dependencyTypes` and **45/45 carry at least one `type-only` edge** — which is exactly why rule 1
   greens. **45 per-ring dispositions, never en bloc**, each row naming its own erasing edge and its
   own kill cost: Zone W engine↔waapi **14** · Zone E engine-core **12** · Zone G group **4** · Zone S
   sequence **1** · Zone V constants↔compile/value **14** = **45**. **ACCEPT 32 · ACCEPT-PENDING
   (relayed) 13 · KILL 0**, and the zero is measured rather than chosen: **in all 45 rows the erasing
   edge's source file lies outside this unit's writable set** (the evidence's "in set" column is `✗`
   45/45, self-counted). The closest call is recorded as such — ring 27
   (`engine/animation ↔ resolve/element-resolve`) has its *file* in the set, but the edge is
   `import type { KeyframesAnimation }` at `element-resolve.ts:34` feeding the S.B2 carve, so killing
   it re-types `engine/animation.ts`'s surface, which is `.c`/`.d`'s live cure file this wave.

2. **G-DEPCRUISE — D-1 + D-2 + D-4 as ONE motion (S-4) — `e325018f`.** Three claims the config made
   about itself were false; none was deleted, all three were made true.
   - **D-1 booked CURED-AT-FRONTIER with the sibling's sha and never claimed.** ⟨`git log --oneline -S
     'physics/spring/solver/duration' -- .dependency-cruiser.cjs`⟩ → **`fb509edd`** (X.KF.W4). All
     **24** entries existence-swept: **24 resolve, 0 DEAD**. What was still live is the half the
     spec's own falsifier names — *"Fails if the four paths are re-pointed **without** the existence
     assertion"* — and **the assertion had never been written**, while the block's closing sentence
     asserted *"every entry is existence-checked against `src/animation/<entry>.ts`"*. It is written
     now (`:116-131`), at **load time** on purpose: rule 3's `from` set IS that list, so a dead entry
     subtracts a LIGHT module from the boundary check while every run stays green. **Falsifier
     exercised, not asserted** — inject one dead name → the throw fires with the repoint instruction;
     restore → `shasum` byte-identical (`6513a669…` before and after) and ✔ 0 violations. The gate is
     non-vacuous by demonstration.
   - **D-2 / the record's FINDING 2 cured by CORRECTION.** ⟨`git show HEAD:package.json | grep -n
     '"lint"'`⟩ → `:44 "lint": "depcruise --config .dependency-cruiser.cjs src demo && eslint demo"`.
     The `no-cycle` comment's *"(`lint` is a bare `depcruise src`…)"* is corrected to the live script,
     naming `fb509edd`; **the honest baseline sentence is kept whole and KF.W4 is not reverted**. The
     three-clause oracle re-run: (i) `knownViolations` → **0** · (ii) no `--known-violations` flag →
     **0** · (iii) baseline file **ABSENT**.
   - **A THIRD false claim, found by the same sweep and cured in the same motion**: the file's header
     read *"eslint is NOT installed … adding eslint would be a second toolchain"*. Refuted three ways
     — `devDependencies.eslint` **^10.10.0**, `eslint.config.js` **tracked**, `lint` runs `eslint
     demo`. Corrected with the KILL-DOWN's substance preserved (eslint owns the demo SFC lane,
     dep-cruiser owns the source graph, the tiers are disjoint by surface).
   - **G-RING's second clause landed here too**: the rule's `comment` said only *"type-only edges are
     exempt"* — the **head-edge** reading, which is not what the rule does. It now names the real
     mechanism, `viaOnly.dependencyTypesNot`, states that a ring closing through even one `import
     type` is exempt, and says plainly that **the exempt rings are real coupling**. **No numeral was
     written into the config** — a ring count in a source comment is the stale-figure class this
     tranche exists to kill, so the comment carries **the probe** and points at the evidence sheet.
   - **D-4's two pass-throughs served, no byte owed**: `physics/spring/{css,solver}/index.ts` front
     exactly the zones D-1's dead allowlist pointed into, and four of the 24 entries now resolve
     through them under the assertion. Both read, both true at the bytes (pure re-export barrels).
   - **Anchors re-resolved by RULE NAME** (FINDING 5's idiom, and this unit's spellings will date too):
     file **316 L** · `LIGHT_BARREL_MODULES` `:82-107` · assertion `:116-131` · `LIGHT_FROM` `:136` ·
     `no-cycle` `:165` · `viaOnly.dependencyTypesNot` `:211-212` · rule 2 `:226` · rule 3 `:266`.

3. **G-SHIM — the floor held, and this unit claims none of the cure.** ⟨`git ls-tree -r HEAD
   --name-only -- src/animation/presets`⟩ → **exactly 3** (`catalog.ts` · `classic-data.ts` ·
   `index.ts`) · ⟨`git grep -c 'split by kind' HEAD -- src/`⟩ → **0** · ⟨`npx vitest run --project
   library`⟩ → **112 files passed | 5 skipped; 1252 passed | 3 expected fail | 14 skipped** ·
   ⟨`npm run build`⟩ → **✓ exit 0**. Booked **CURED-AT-FRONTIER (`7e9ddf49`)**, a floor and not a
   born-RED, which is the gate's own falsifier.

4. **G-STRUCT — the dispositions, and the finding that governs them.** The unit read
   `scripts/gates/structure/index.mjs` — the spec's unread *"159 modules"* owner — and it is **not a
   module counter**: it is `proof:structure`, the standing six-rule structural gate inside `npm run
   check`, and **two of its rules are this arm's subjects**. **R1** names the eponymous primary *"the
   allowed grammar, NOT a stutter"* and **cites `group/group.ts` as its example**; **R2**'s fragment
   arm `continue`s on eponymous by code. Gate state: **PASS, R1–R6 clean, 0 violations**; R1 alone 0,
   R2 alone 0, R4 alone 0.
   - **The roster RE-DERIVED at this unit's ref is 10, not 8** — same probe, same ≥437 L floor, moved
     tree: **NEW ENTRANTS** `orchestration/split-text/split-text.ts` **345 → 442** (`X.KF.W5.c`'s
     split-text motion) and `compile/emit/view-transition.ts` **387 → 438** (X.KF.W2 `0cfd3b5f`), plus
     `ingest/cssom.ts` 466→499, `group/group.ts` 437→498, `engine/animation.ts` 478→497. **No row was
     reduced by this unit** — shrinking a sibling's module to restore the banked 8 is moving a
     sibling's RED, which FINDING 3's reading rule calls a HIGH defect.
   - **10 god modules × split-or-keep**: **SPLIT 0 · KEEP 7 · READ+DISPOSITION-ONLY 1** (`cssom.ts`,
     KF.W2's façade boundary, declared not taken) **· NOT-OURS 2** (`engine/animation.ts`,
     `compile/emit/view-transition.ts` — outside the set, relayed). The keeps rest on a measurement,
     not on caution: **the tree's own ceiling is 500 raw lines with an EMPTY allowlist and R4 reports
     zero** — no module in the roster is over any line the repo actually draws. Three rows are KEEP on
     **S-6** specifically (`group/group.ts`, `engine/animation.ts`, `split-text/split-text.ts` all
     carry arm-B/arm-C rulings landed this wave; S-7 additionally puts split-text *last of all*).
   - **12 stutters × rename-or-keep**: set re-measured at open with its predicate printed — **12**, the
     same members; the **2 structural instances stay DECLINED-WHOLE at KF.W8 R-4 and are not in this
     denominator** (a stutter-set-of-18 predicate would fail the gate and is not used). The twelve
     split into two classes the wave's predicate merges and the repo's grammar separates: **Class A ·
     EPONYMOUS (8) → KEEP**, because R1 blesses the shape by name and — for
     `orchestration/view-transition/` (one barrel, one module) — a rename **provably fires R2's
     fragment arm** and reds `npm run check`; **Class B · SUFFIX (4) → RENAME**
     (`compiled-frame→compiled` · `element-resolve→element` · `draw-svg→draw` · `morph-svg→morph`),
     the exact `1412ed8e` idiom, and **the class R1's prefix-only predicate cannot see** — this arm's
     real finding. Measured, not asserted: **only 3 of the 12 have an import site that actually
     stutters** (`./format/format` ×2, `./solver/solver` ×1), and every other importer already reads
     its barrel.

**Gate readings, BEFORE → AFTER.**

| gate | BEFORE (`d7f68225`) | AFTER (`e325018f`) |
|---|---|---|
| **G-DEPCRUISE** | **RED** — assertion absent while the comment claimed it; `lint` parenthetical FALSE; header "eslint is NOT installed" FALSE | **GREEN** — assertion present + falsifier exercised; both sentences true; 24/24 resolve, 0 DEAD; oracle (i) 0 · (ii) 0 · (iii) absent; ✔ 0 violations |
| **G-RING** | **RED** — inventory un-dispositioned (unmeasured at open) | **GREEN** — 45 rings measured with the invocation and ref printed, 45 per-ring dispositions, exemption stated honestly in the rule's own comment and proved 45/45 at the edges |
| **G-SHIM** (floor) | **GREEN** (declared floor, `7e9ddf49`) | **GREEN** — 3 files · 0 `split by kind` · vitest 1252 · build exit 0; cure not claimed |
| **G-STRUCT** | **RED** — 8 × 12 un-dispositioned at the wave's open | **GREEN on its stated GREEN condition** — 10 × split-or-keep and 12 × rename-or-keep, both re-derived with probes printed, each row D/L/C-scored; the `git log … <old> <new>` clause **vacuously satisfied, zero renames landed**, said plainly in §5 rather than hidden behind the vacuity |

**Commits** (pathspec on the commit itself, one file each):
`e325018f` — kf `.dependency-cruiser.cjs` (D-1+D-2+D-4, one motion).
`dc015540` — vjs `docs/tranches/X/keyframes/evidence/W5/ARM-D-unit-e.md`.
`<this record>` — vjs `docs/tranches/X/execution/B/KF-W5.md`.

**ESCALATION · ESC-e-1 — the arm-D bounds gap. The rename programme cannot execute inside this unit's
writable set.** §Bounds grants the twelve stutter paths `rename + migrate imports **in one commit
each**`, but a rename's migration rewrites the **importers**, and **no importer is in the set** — every
stutter is imported by its own `index.ts` barrel, and no barrel was granted. Across the four Class-B
renames the surface is **12 import sites, 11 of them outside the set, 1 inside**:
`compiled-frame` → `compile/frame/{index,numeric-plan}.ts`; `element-resolve` → `engine/animation.ts`;
`draw-svg`/`morph-svg` → `src/animation/index.ts`, `src/animation/svg/index.ts`,
`test/svg/{draw-svg,morph-svg}.test.ts`. **Not one of the twelve is completable in one lawful commit.**
Per METHOD the specified cure was **not substituted for**: no write outside the set; no rename split
from its migration (S-4 forbids it and a half-landed rename is a broken build); **no re-export shim at
the old path** (a hollow shim, which `proof:structure` R2 reds *by name* and the standing law calls a
masking fallback); and **no quiet re-disposition of the four to KEEP** to make the gate look clean. To
execute, the writable set needs the **eleven importer paths** above — two of which
(`engine/animation.ts`, `src/animation/index.ts`) are live sibling surfaces, so the grant needs a
sequencing decision, not just a path list. **Returned, not taken.**

**Residues and relays declared from this unit** (all with their measurements, in the evidence §7):
- **RD-e-1** — the one-edge ring kill: removing **`constants/types.ts ⇢ compile/value/index.ts`**
  retires **13 of the 45 rings**. That file is outside this set and its `:195` `\| string` line is
  already reserved to **KF.W4's KF-CB-18+24+29 bundle** by this spec's own §Sequencing. → **KF.W8**.
- **RD-e-2** — **`npm run lint` is RED at HEAD over `demo`**: ⟨`npx depcruise --config
  .dependency-cruiser.cjs src demo`⟩ → **4 genuine runtime cycles** in
  `demo/scenes/cube/orbital-drag/`, entered the gate's scope when `fb509edd` widened `lint`.
  **Reproduced against the COMMITTED config** to prove it is not this unit's. No arm of this wave
  writes `.vue`. → **KF.W6**, structural terminus **KF.W8**.
- **RD-e-3** — **the 500-line ceiling is two lines from firing**: `cssom.ts` **499**, `group/group.ts`
  **498**, `engine/animation.ts` **497** against R4's 500 with an **empty allowlist**, all three moved
  there by cures landed *this wave*. The next seat to add a line to any of them is the seat that reds
  CI. → **KF.W8**; `cssom.ts` to **KF.W2**.
- **RD-e-4** — `compile/emit/view-transition.ts` (438 L, new entrant) and its two `./format/format`
  stuttering sites: X.KF.W2's live surface, observed not absorbed. → **X.KF.W2**.
- **Courtesy to `.b` / G-BASIS — the fifth rival is DERIVED**: *"159 modules"* is **`depcruise src`'s
  module count**, not `proof:structure`'s (which emits none) — measured here as **160 = 154 src
  modules + 6 `@mkbabb/value.js` subpath externals**, i.e. exactly **159** at `.b`'s ref where B0 was
  153. Recorded, not claimed; G-BASIS is `.b`'s gate.

**E13**: this unit minted no mail, consumed no routed letter, and leaves **0 UNREAD in its scope**;
`INBOX.md` is outside this unit's writable set and was read-only here. **`scripts/dev/dev.sh` was
never touched or staged, in either repo.**

---

## Close

**Seat**: the KF.W5 CLOSE SEAT, Opus (`claude-opus-5[1m]`), **VERIFY-ONLY** — this seat cured nothing,
wrote no product byte in either repo, and authored none of the five units' bytes. **Every reading
below is this seat's own command at this seat's own clock, double-run**; no figure is inherited from a
unit receipt, and where a unit's figure did not reproduce it is said so and reconciled by measurement.
**Substrate**: kf `master` **`e325018fb257540d6103950c3ab3c6195f51c5e2`**; ⟨`git status --porcelain`⟩ →
**2 rows, both untracked**, the two §0m.0 I-26 survivors, exactly as at open. **Zero tracked
modifications.**

### 1 · Commit roster and the bounds audit — every unit's commits exist and touch only its writable set

⟨`git log --oneline 7d958f21..e325018f`⟩ → **35 commits**, of which **22 are this wave's** and 13 are
the concurrent **X.KF.W2** seat's (`f7cbc41c` · `49cd647b` · `46f0b77b` · `36b4615a` · `0cfd3b5f` ·
`55347314` · `02a87f7a` · `a461c78c` · `0ecaadb3` · `6e371fd4` · `5083c3f8` · `0b747396` · `6941e833`)
— named so the interleave is attributed, never absorbed.

| unit | kf commits | paths touched (⟨`git show --name-only`⟩, per commit) | in the unit's writable set |
|---|--:|---|---|
| `.a` | 6 | `demo/…/composables/useHighlightCSS.ts` ×5 · `test/demo/instrument/highlight-css-roundtrip.test.ts` ×1 | **YES** — exactly the two granted paths, nothing else |
| `.c` | 14 | `engine/play-lifecycle/{frame,strategies}.ts` · `group/{group,entries}.ts` · `internal/reduced-motion.ts` · `orchestration/{sequence/sequence,view-transition/view-transition,split-text/split-text,stagger}.ts` · `waapi/delegation.ts` · `compile/emit/{index,backward/backward}.ts` · `engine/{animation,option-setters}.ts` · `load-engine.ts` · `public.ts` · `constants/types.ts` · the **10 created specs** | **YES** — every path is named in §Bounds *Arm B*; `src/animation/index.ts` never opened; no `.vue` byte |
| `.d` | 1 | `engine/compile-bridge.ts` · `engine/css/animation.ts` · `physics/playback.ts` · `test/engine/adopt-compiled-renderer.test.ts` · `test/physics/raf-degrade.test.ts` | **YES** — the five granted paths, the engine-seam packet unsplit (S-4) |
| `.e` | 1 | `.dependency-cruiser.cjs` | **YES** — one file, one motion (D-1+D-2+D-4) |

**value.js side, 8 commits**: `dea4dd4e` (OPEN: record + LEDGER + INBOX) · `f536b907` (`.a`) ·
`396232f7` + `be2aaa66` (`.b`) · `b1cbb8e6` (`.c`) · `2b693c41` (`.d`) · `dc015540` + `ccae5ffb`
(`.e`). Every one touches only `docs/tranches/X/execution/B/KF-W5.md`,
`docs/tranches/X/keyframes/evidence/W5/**`, and — at open alone — `LEDGER.md` + `INBOX.md`.
**Zero `registry/adjudicated/` bytes** (G-TAX's falsifier), **zero glass-ui bytes**, **zero
`src/**` bytes in value.js**, and ⟨`git status --porcelain`⟩ shows `scripts/dev/dev.sh` still dirty
and **never staged** by any commit of this wave (⟨`git log --format=%H 7d958f21..HEAD -- scripts/dev/dev.sh`⟩
→ empty, both repos).

**Shared-directory discipline verified at the bytes**: ⟨`git diff --stat 7d958f21..HEAD --
test/demo/instrument/`⟩ → **1 file changed, 215 insertions(+)** — the one created fixture, **zero
modifications to any tracked file** in the four-party directory.

**Evidence sheets, self-counted at this seat**: five files under
`docs/tranches/X/keyframes/evidence/W5/` (`G-XSS-unit-a` · `CENSUS-unit-b` · `ARM-B-unit-c` ·
`ARM-C-unit-d` · `ARM-D-unit-e`), **line 1 of each = `SERVED MODEL: claude-opus-5[1m]`** (⟨`head -1`⟩
×5). The arm-D ring table carries **45 disposition rows, ids 1..45 contiguous** (⟨`grep -oE '^\| *[0-9]+ *\|' | sort -n | uniq`⟩).

### 2 · Every gate re-run at this seat, BEFORE → AFTER

Each AFTER cell is this seat's own command, **run twice, both runs identical**.

| # | gate | BEFORE (record §Baseline, `7d958f21`) | AFTER at this seat (`e325018f`), double-run | verdict |
|---|---|---|---|---|
| 1 | **G-XSS** observable | 2 lines (`:111` sink · `:123` escaped writer); property form **1** | ⟨`git grep -n 'innerHTML' HEAD -- …/useHighlightCSS.ts`⟩ → **exactly ONE line**, `:198 el.innerHTML = h.value`, sitting under `const h = hljs.highlight(source, { language: "css" })` (read at the bytes); property form **0 / 0**. `setHighlightingString` reads `el.textContent = s` at `:183` | **GREEN** |
| 2 | **G-XSS** round-trip | fixture ABSENT; demo 30 files / 191 tests | ⟨`npx vitest run --project demo …/highlight-css-roundtrip.test.ts`⟩ → **4 passed (4)**; whole project **31 files / 195 passed / 195** | **GREEN** |
| 3 | **G-ROLE** | RED by absence | `split-text-implicit-role.test.ts` → **8 passed (8)** | **GREEN** |
| 4 | **G-REFUSE** | RED by absence | `split-text-refuse.test.ts` → **7 passed (7)** | **GREEN** |
| 5 | **G-REVERT** | RED by absence | `split-text-revert.test.ts` → **6 passed (6)** | **GREEN** |
| 6 | **G-STAGGER-DOC** leg 1 | fixture ABSENT; floor 24 | ⟨`npx tsc --noEmit -p tsconfig.test.json \| grep -c 'error TS'`⟩ → **24 / 24**, and ⟨`… \| grep -cE '<the 13 created fixtures>'`⟩ → **0**: zero diagnostics attributable, **floor carried, not reduced** | **GREEN** |
| 7 | **G-STAGGER-DOC** leg 2 (P-8) | RED by absence | `group-viability.test.ts` → **5 passed (5)**; `stagger-doc-example.test.ts` → **3 passed (3)** | **GREEN** |
| 8 | **G-PRM-FLIP** | RED — 7 lines / 3 files, `delegation.ts` absent from the census | `prm-engagement.test.ts` → **5 passed (5)** | **GREEN** |
| 9 | **G-DELAY** | RED by absence | `delay-semantics.test.ts` → **5 passed (5)** | **GREEN** |
| 10 | **G-FROMSTRING** | RED — 3 frames → 6, selectors duplicated | `fromstring-idempotence.test.ts` → **1 passed \| 2 expected fail (3)**. The two ruled assertions are **executed and still failing**: the REPLACES cure is **NOT landed** | **RED — honest, escalated (bounds)** |
| 11 | **G-CSSIDENT** | RED — 0/0/0 at the three published entries | `public-surface.test.ts` → **7 passed (7)**; ⟨`git grep -c '<name>' HEAD -- public.ts load-engine.ts`⟩ → **2/2** for each of `cssIdent` · `reverseCSSTime` · `serializeTimingFunction` | **GREEN** (see §5 — the publication has a landed consequence) |
| 12 | **G-OPTSET** | RED — four legs, none met | `option-setter-propagation.test.ts` → **11 passed (11)** | **GREEN** |
| 13 | **G-RAF** | RED — `step(now)` with no failure path | `raf-degrade.test.ts` → **7 passed (7)** | **GREEN** |
| 14 | **G-RENDERER** | RED — `adoptCompiled` transplants the compiler whole | `adopt-compiled-renderer.test.ts` → **6 passed (6)** | **GREEN** |
| 15 | **G-DEPCRUISE** | SPLIT — L-1 CURED-AT-FRONTIER, the existence assertion unwritten, the `lint` parenthetical FALSE | ⟨`npx depcruise --config .dependency-cruiser.cjs src`⟩ → **✔ 0 violations (160 modules, 705 deps) / identical**; allowlist **24 entries, 24 resolve, 0 DEAD** (existence-swept at this seat); three-clause oracle **(i) `knownViolations` 0 · (ii) `lint` carries no `--known-violations` flag (`package.json:44`) · (iii) baseline file ABSENT**; the honest sentence is **kept whole and now TRUE** (it names the live `lint` and `fb509edd`). **Falsifier exercised independently, no repo byte written**: the config source was loaded with one allowlist name mutated to `physics/spring/solver/duration-GONE` → **THROW**, *"LIGHT_BARREL_MODULES names 1 module(s) that do not exist"*; pristine loads clean. The assertion is **non-vacuous by demonstration at a second seat** | **GREEN** |
| 16 | **G-RING** | RED — inventory un-dispositioned (unmeasured at open) | ⟨same cruise with the rule's type-only exemption lifted⟩ → **45 violations / 45**, i.e. **RING COUNT 45 at `e325018f`**, against **45 per-ring dispositions** in the evidence (ids 1..45, self-counted here). **RECONCILIATION, published rather than smoothed**: lifting **`viaOnly` alone** returns **38 / 38**; lifting **both** type-only clauses (head edge *and* `viaOnly`) returns **45 / 45**. The gate's own wording is *"with type-only edges **counted**"*, which is the both-clauses reading, so **`.e`'s 45 reproduces at an independent seat**; the 38 is the head-edge-only reading and is recorded so the two are never confused | **GREEN** |
| 17 | **G-SHIM** (floor) | GREEN (floor, `7e9ddf49`) | ⟨`git ls-tree -r HEAD --name-only -- src/animation/presets`⟩ → **exactly 3** (`catalog.ts` · `classic-data.ts` · `index.ts`) · ⟨`git grep -c 'split by kind' HEAD -- src/`⟩ → **0** · ⟨`npx vitest run --project library`⟩ → **112 files passed \| 5 skipped · 1256 passed \| 3 expected fail \| 14 skipped**, identical on the second run · ⟨`npm run build`⟩ → **✓ exit 0** | **GREEN — floor held** |
| 18 | **G-STRUCT** | RED — 8 × 12 un-dispositioned | roster re-derived at this seat with the gate's own probe → **10 god modules** (`cssom.ts` 499 · `group/group.ts` 498 · `engine/animation.ts` 497 · `progress.ts` 484 · `draggable.ts` 470 · `compiler.ts` 461 · `entry.ts` 459 · `classic-data.ts` 458 · `split-text.ts` 442 · `emit/view-transition.ts` 438), **matching `.e`'s 10 exactly**; stutter predicate re-run → **12**, split **8 EPONYM + 4 SUFFIX**, the same members `.e` scored. `git log … <old> <new>` clause **vacuously satisfied — zero renames landed** | **GREEN on its stated GREEN condition** (the disposition table) — **but see ESC-e-1: the rename programme §Bounds grants is UNEXECUTED** |
| 19 | **G-BASIS** | RED — the reconciliation unwritten; B0 = 153 | ⟨`git ls-tree -r 7d958f21 --name-only -- src \| grep -c '\.ts$'`⟩ → **153 / 153**, `.d.ts` **0**; at `e325018f` the same probe → **154**, the +1 being the concurrent seat's `compile/parse-facade.ts` (attributed, not absorbed). `depcruise`'s **160 modules** at this ref = 154 src + 6 `@mkbabb/value.js` subpath externals — the same derivation `.b` proved set-equal at 153 + 6 = 159 | **GREEN** |
| 20 | **G-ID** | RED — the audit unrun (22 hits) | ⟨`grep -cE 'KF-ES-[0-9]+\|(^\|[^-])\bL-2\b' waves/KF-W5.md`⟩ → **22 / 22** (LINE unit, the gate's own probe — **qualified 22/22**); ⟨`grep -oE …\| wc -l`⟩ → **58** occurrences, of which **exactly 2 are BARE at site** and outside the two declared exception cells — `:386` occurrence 1 (*"G-DEPCRUISE's L-2 leg ← the honest comment"*) and `:412`'s last (*"and for L-2 (cured, `81a56990`)"*), both re-cut from the bytes at this seat. **The gate's pass condition is stated at the OCCURRENCE** (*"Fails on any bare … L-2"*) | **RED — honest.** `.b`'s finding reproduces exactly; the cure is a **spec byte**, IMMUTABLE under E-3 and outside every seat's writable set → **KF.W10** |
| 21 | **G-TAX** relay leg | RED — 3 headers · 0 annotations · 0 rows | ⟨`grep -rn 'KF.W5-PARTIALS' registry/adjudicated/`⟩ → **3 header hits** (`kf-DemoGlobalChrome:17` · `kf-AnimationControlsGroup:17` · `kf-ControlsPaneWrapper:6`), **0 row hits**; the RD-2 relay row is present in the record and names all three records, the superseded authority (`lane-frontend.md §10`) and the binding one (`CENSUS-2026-08-03 §(a)`). **0 registry bytes written by this wave** (falsifier honoured) | **RELAY LEG GREEN** |
| 22 | **G-TAX** annotation leg | RED, unobservable by design | ⟨`grep -c 'SUPERSEDED\|superseded'` over the three⟩ → **0 · 1 · 0**, the single hit being `kf-DemoGlobalChrome:154`, a dead `dist/gh-pages` byte-offset coordinate — **a different subject, read at the bytes**. The annotations are **SS-1/SS-2's act**, as the gate's own rider declares | **RED — unobservable by design, not this wave's to turn** |
| 23 | **G-SCOPE** | GREEN on the arithmetic, RED on the act | ⟨`awk 'NR>=309 && NR<=379 && /^\| \*\*/' \| wc -l`⟩ → **46 / 46**; §Excluded **6 numbered items** + **7 sub-bullets** = **12 re-homes**; **46 + 12 = 58**; compared by `.b` against PASS-8 (whole corpus, 0 escapes) and PASS-6 (43 routed / 43 booked / 0 escaped), the latter re-derived from the spec's own bytes | **GREEN** |

**Twenty gates + G-SHIM's floor, counted as the spec counts them: 17 GREEN · 3 RED (G-FROMSTRING ·
G-ID · G-TAX's annotation leg) · G-TAX's relay leg GREEN beside its RED second leg.**

### 3 · Verification artefacts — the spec declares no `§Verification Artefacts` section, and that is said rather than glossed

⟨`grep -c 'Verification' waves/KF-W5.md`⟩ → **0**. This wave's verification artefacts are (a) each
gate's own named instrument, every one re-run above, and (b) the five evidence sheets, self-counted in
§1. The repo-wide instruments were also run whole at this seat, and their attribution measured:

| instrument | reading at `e325018f` (double-run) | attribution |
|---|---|---|
| `npx vitest run --project library` | **112 files passed \| 5 skipped · 1256 passed \| 3 expected fail \| 14 skipped** | open was 99 files / 1124 passed / 1 expected fail. **This wave's own contribution is 12 created spec files carrying 73 tests** (8+7+6+3+5+5+5+3+11+7+6+7, self-counted from the twelve single-file runs above), **2 of them the ruled born-RED `it.fails` rows**; the remainder of the delta is the concurrent X.KF.W2 seat's and is **not claimed** |
| `npx vitest run --project demo` | **31 files / 195 passed / 195** | +1 file / +4 tests over the open baseline (30/191) — **exactly `.a`'s fixture** |
| `npx tsc --noEmit -p tsconfig.test.json` | **24 / 24** | the record's banked FINDING-3 floor, **unmoved**; 0 diagnostics name any file this wave wrote |
| `npx tsc --noEmit -p tsconfig.lib.json` | **3 / 3** | the banked `TS6133` floor, unmoved |
| `node scripts/gates/structure/index.mjs` (`proof:structure`) | **PASS — scope=src clean (0 violations across R1–R6)** | green; `.c`'s two self-caused R6/line-count violations were cured inside `.c` |
| `npm run build` | **✓ exit 0** | green |
| `npm run lint` | **x 4 dependency violations (435 modules, 1557 deps)** — four `no-cycle` rings, all in `demo/scenes/cube/orbital-drag/**` | **NOT this wave's**: no arm wrote a `.vue` or a `demo/scenes/**` byte; the rings entered `lint`'s scope when KF.W4's `fb509edd` widened it to `src demo`. This is `.e`'s **RD-e-2**, reproduced independently here |
| `node scripts/gates/surface/index.mjs` (`proof:publish`) | **FAIL — exit 1, both runs** | **THIS WAVE'S. See §5 — the one landed-wrong this close publishes** |

### 4 · E13 — the four paths re-swept at the close seat's own clock

Swept read-only, classification taken from each row's **status cell** of
`docs/tranches/V/coordination/INBOX.md` (self-excluded under SELF-COUNT).

1. `docs/tranches/V/` (10 `.md`) + `V/coordination/` (17 `.md`) — newest is `INBOX.md` itself; the
   newest letter, `value-inbox-2026-09-17-o8-o11-amendment-addendum.md`, is **OUR OWN OUTBOUND**, read
   at its first line (*"RETAINED COPY (C-11 KF-MAIL-COPY): delivered as …VALUEJS-INBOUND-2026-09-17…"*)
   and **rowed `O-21`**.
2. `../glass-ui/docs/tranches/BK/coordination/` — **BK re-confirmed newest** (⟨`ls -dt ../glass-ui/docs/tranches/*/ | head -1`⟩);
   the three 2026-09-17 letters are rowed **I-32 · I-33 · I-34**.
3. `../keyframes.js/docs/tranches/V/coordination/` — newest is the `VALUEJS-INBOUND-2026-09-17-…`
   delivery of O-21, our own outbound.
4. `../sci-report/atlas/docs/tranches/P/coordination/` — newest is 2026-08-03, **unmoved since open**.

**Result: 0 unrowed · 0 new `I-n` minted at this seat.** Three rows carry status **UNREAD** program-wide
(**I-32 · I-33 · I-34**) and **none routes here** — their routing cells read *"the X formation mail
seat / X-W0.j"*, *"X-EXT-1..6"* and *"X-W0.j / X-EXT-1"*. **0 UNREAD mail in KF.W5's scope**, so the
wave closes lawfully under E13.

### 5 · LANDED WRONG — one, found by this seat and published, not smoothed over

**`proof:publish` is RED at HEAD, and this wave made it so.**

⟨`node scripts/gates/surface/index.mjs`; `echo $?`⟩ → **exit 1, both runs**, with exactly one finding:

> `proof:published-surface — FAIL (1 finding(s); the published surface lies):`
> `✗ (b) 5 public export(s) are NEITHER README-taught NOR manifested — an API a npm i user reaches that the docs cannot teach:`
> `` `cssIdent` (HEAVY), `resolveTimingFunction` (HEAVY), `reverseCSSTime` (HEAVY), `serializeTimingFunction` (HEAVY), `timingFunctionEntries` (HEAVY) ``

**Attribution, measured**: those five names are **precisely** the exports `2e0d91ae` (X.KF.W5.c, the
S-3 publication decision) added to `src/animation/public.ts` — ⟨`git show 2e0d91ae -- src/animation/public.ts`⟩
shows the block that publishes `cssIdent`, `reverseCSSTime`, `serializeTimingFunction` and the
KF-ET-32 registry pair. ⟨`grep -c '<name>' README.md docs/published-surface.md` ×5⟩ → **0 / 0 for every
one of the five**. Before the wave the clause had no subject (the names reached no published entry —
the gate's own born-RED witness), so the RED is this wave's, not a pre-existing floor.

**Why four seats read `proof:publish` PASS and this one reads FAIL, stated as a mechanism**: the gate
measures **`dist/` AS BUILT** (its own header: *"the gate measures dist AS BUILT"*; `dist/` is
gitignored at `.gitignore:10`). `.c` and `.d` ran it against a `dist/` built **before** `2e0d91ae`
landed the five exports; this seat ran ⟨`npm run build`⟩ first, and the gate then saw the real
published surface. **The unit receipts' `proof:publish PASS` lines are therefore stale-artifact
readings, and are corrected here as a dated addendum-beside (E-3) — the receipts themselves are not
rewritten.**

**Why it matters, measured rather than asserted**: ⟨`grep -rn 'proof:publish' .github/workflows/`⟩ →
**`ci.yml:78`**, **`ci.yml:109`** and **`release.yml:49`** — a **blocking CI job** and the release
path. The wave has published an API the docs cannot teach.

**The cure is NOT taken here** (this seat is VERIFY-ONLY, and README/`docs/published-surface.md` are
in no arm's writable set): the honest fix is the gate's own — **teach the five in README §Beyond CSS
or enumerate them in `docs/published-surface.md`**, one commit, at a seat granted those two paths.
**Owner: X·KF — the next wave with a docs surface in bounds (KF.W6), terminus KF.W10.** It is emphatically
**not** a licence to un-publish the three library names: S-3 is a RULING and G-CSSIDENT is GREEN on it.

### 6 · Escalations carried out of this wave, with named owners

| id | escalation | measured statement | owner |
|---|---|---|---|
| **ESC-c-1** | **`fromString` REPLACES is unperformed** — G-FROMSTRING stays RED | the only cure site is `engine/css/animation.ts` (today `:176`), which is `.d`'s file, while the gate spec is `.c`'s; **no single seat of this wave held both**. `.c` pinned the ruling with two executed `it.fails` rows — verified live here, **1 passed \| 2 expected fail** | **X·KF — one seat granted BOTH `src/animation/engine/css/animation.ts` and `test/engine/fromstring-idempotence.test.ts`**; the act is: clear the template set (and the compiled frames) before the ingest loop, **then** unwrap the two rows to plain `it`. **KF.W10** if no earlier wave takes it |
| **ESC-c-2** | **the `setTargets` element contract (B-19 / KF-CB-30) is unwidened** | measured twice at a clean tree: **9 new diagnostics across 5 files**, 3 outside `.c`'s bounds; and `element-resolve.ts(191,38)` *"Property 'style' does not exist on type 'Element'"* **refutes B-19's INFO rationale**. Nothing was written — no cast, no partial widening | **X·KF / KF.W8** (the seat granted `engine/interpolate.ts` + `resolve/element-resolve.ts` beside `engine/animation.ts`) |
| **ESC-e-1** | **the rename programme cannot execute inside arm D's writable set** | §Bounds grants the twelve stutter paths *"rename + migrate imports in one commit each"*, but **no importer is in the set**: across the four Class-B renames the surface is **12 import sites, 11 outside the set**. Verified here by re-deriving the same 12-member stutter set and confirming **zero renames landed**. No shim, no split, no quiet re-disposition was taken | **X·KF — a grant of the eleven importer paths plus a sequencing decision** (two of them, `engine/animation.ts` and `src/animation/index.ts`, are live sibling surfaces). → **KF.W8** |
| **ESC-close-1** | **`proof:publish` RED (§5)** — the published surface lies about five names | exit 1, double-run; five names, 0 README/manifest hits each; blocking CI at `ci.yml:78`/`:109` | **X·KF — the next wave holding `README.md` / `docs/published-surface.md` (KF.W6), terminus KF.W10** |

### 7 · Residuals, each with a named owner

- **G-ID's 2 bare-at-site `L-2` occurrences** (`:386` occ-1 · `:412` occ-3) and the **third, undeclared
  exception class** (mention-of-the-defect, 3 occurrences) → **KF.W10**, as doc-authority addenda. The
  spec is IMMUTABLE (E-3); no seat here may cure them at the site.
- **G-TAX's annotation leg** → **SS-1/SS-2**: three E-3 dated addenda under the original ids, never
  edits. `PASS-8/CHECK.md:65` shows the mis-routing class is live beyond these three records.
- **`FOLD-FORWARD §C`'s "159 modules" attribution is FALSE** (`.b` act 2, re-derived independently
  here: the figure is `depcruise`'s, not `proof:structure`'s) → dated addendum-beside; **KF.W10**.
- **The D-6 stutter-predicate wording returns 10, not 12, taken literally** (`.b` act 4) — the SET is
  right, the wording under-specified. Reproduced at this seat: the eponymous whole-name arm is required
  to keep `split-text/split-text.ts` and `view-transition/view-transition.ts` in the set. → **KF.W8**
  with the rename grant.
- **RD-e-1** — one edge (`constants/types.ts ⇢ compile/value/index.ts`) retires **13 of the 45** rings;
  that line is reserved to KF.W4's bundle → **KF.W8**.
- **RD-e-2** — `npm run lint` RED over `demo/scenes/cube/orbital-drag/**` (4 rings), reproduced here
  against the committed config → **KF.W6**, structural terminus **KF.W8**.
- **RD-e-3** — the 500-line ceiling is **one line** from firing: `cssom.ts` **499**, `group/group.ts`
  **498**, `engine/animation.ts` **497** (all three re-measured at this seat), empty allowlist →
  **KF.W8**; `cssom.ts` to **KF.W2**.
- **RD-e-4** — `compile/emit/view-transition.ts` (438 L, new god-module entrant) → **X.KF.W2**.
- **B-22's two rider letters** (a lossless timing-function serializer twin; `easing()`'s
  analytic-first resolution order in the `.d.ts`) → relayed verbatim, **NO-WAVE-OWNER**, CURE-LOCKED by
  KF-ET-2.
- **KAD-14(c)** (SFC-side) → **KF.W6**, riding KAD-17's packet. **KAD-13 whole** → **KF.W7**.
- **The four `respectReducedMotion: false` seeds outside arm B's bounds**
  (`constants/defaults.ts:87` · `physics/smooth.ts:43` · `physics/numeric.ts:89` ·
  `physics/spring/types.ts:119`) → **X·KF**, wherever those files are next granted.

### 8 · The four-verb line — NOT moved, and the reason is bounds, not modesty

The spec's §State reads **IMPLEMENTED | NO | *"gates green + bytes landed at the named execution site
stamps this"*** and **VERIFIED | NO | *"stamped only at X·KF's close (KF.W10)"***.

**Neither verb is stamped by this seat.** (i) **IMPLEMENTED's own condition is not met** — three gates
are RED at this seat's own commands (G-FROMSTRING · G-ID · G-TAX's annotation leg) and a fourth
obligation, arm D's rename programme, is unexecuted. (ii) **The spec file is in no arm's writable set**
and is IMMUTABLE under E-3 (§Bounds lists it nowhere as writable; the wave's write surfaces are
`src/**`, the named demo annex, the created specs, the evidence home and this record). A close seat
that edited §State would be writing outside bounds to record that it had stayed inside them.
**VERIFIED is KF.W10's alone**, by the spec's own words, and is not touched. The wave's status is
carried in the **LEDGER row** instead, which is the surface the orchestrator's law grants this seat.

### 9 · Push

⟨`git -C ../keyframes.js push origin HEAD`⟩ and ⟨`git -C . push origin HEAD`⟩ run at this seat; outputs
recorded in the LEDGER row. **Note, measured rather than assumed**: at this seat's clock kf `HEAD` was
**already `== origin/master`** (⟨`git rev-list --count origin/master..HEAD`⟩ → **0**;
⟨`git reflog show origin/master`⟩ → `e325018f … update by push`) — the concurrent **X.KF.W2 close**
pushed the shared `master` and carried this wave's 22 commits with it. The push here is therefore
idempotent, and the fact is written down so no later census reads "already pushed" as this seat's
omission. **No force, no stash, no reset, anywhere.**

### 10 · Verdict

**PARTIAL.** Seventeen of the wave's gates are GREEN at an independent seat's own double-run commands,
including every born-RED library repair the wave was convened for — the split-text triad, the four
rulings, the publication decision, the option-setter letter, the engine seam, the depcruise motion and
the ring inventory. What remains is bounded, named and owned: **one ruled cure unperformed for want of
one seat holding two files** (G-FROMSTRING / ESC-c-1), **one contract widening measured and returned**
(ESC-c-2), **one rename programme that no lawful commit inside arm D's grant could land** (ESC-e-1),
**two doc-authority residues in an IMMUTABLE spec** (G-ID → KF.W10), **one gate leg that is another
owner's act** (G-TAX), and **one CI-RED this wave created and this close publishes** (ESC-close-1,
`proof:publish`). Nothing was masked: no `test.skip`, no allowlist, no swallow, no shim, no
sibling's RED moved to green a leg — the three instrument floors (24 · 3 · 4) are carried at their
open values, measured here.

### 11 · Push receipts, read at the commands (appended after §9's acts, so the claim carries its output)

⟨`git -C ../keyframes.js push origin HEAD`⟩ → **`Everything up-to-date`**; ⟨`git -C ../keyframes.js rev-parse HEAD origin/master`⟩
→ **`e325018f…` == `e325018f…`**. Idempotent, for the reason §9 measured: the concurrent X.KF.W2 close
pushed the shared `master` and carried this wave's 22 commits with it.

⟨`git push origin HEAD`⟩ (value.js, branch `tranche-u`) → **`633f6465..7306904c  HEAD -> tranche-u`**;
⟨`git rev-parse HEAD origin/tranche-u`⟩ → **`7306904c…` == `7306904c…`**. The range's lower bound is
origin's head at push time, which sibling tracks had advanced past this seat's earlier reading — the
shared branch, stated rather than read as this seat's own commits.

Close commits: **`9063de78`** (this §Close + the LEDGER row) · **`7306904c`** (the row names its own
close sha) · **`070ed342`** (these push receipts, whose own sha is filled in beside them by the
follow-on commit below). ⟨`git status --porcelain`⟩ after the pushes:
`scripts/dev/dev.sh` still modified and **never staged**, plus the pre-existing unowned rows — unchanged
by this seat. **No force, no stash, no reset, either repo.**

---

## Check 1

**Fresh adversarial L-20 pass 1, VERIFY-ONLY.** Seat: an independent Opus (`claude-opus-5[1m]`) that
authored **none** of this wave's bytes — not a unit's, not the close's, not an evidence sheet's. This
seat cured nothing, wrote no product byte in either repo, and every figure below is **its own command
at its own clock**, nothing inherited from a receipt. **Substrate**: kf `master`
**`e325018fb257540d6103950c3ab3c6195f51c5e2`** == `origin/master`; ⟨`git -C ../keyframes.js status
--porcelain`⟩ → **2 rows, both untracked**, the two §0m.0 I-26 survivors, exactly as at open and at
the close.

**VERDICT: CONFORMANT-HONEST-RED — 0 BLOCKER/CRITICAL/HIGH · 2 MINOR · 2 INFO. All 23 gate verdicts
in §2 reproduce, GREEN and RED alike; no claimed GREEN failed.**

### 1 · Every gate re-run — 23 verdicts, 23 reproduce

| # | gate | this seat's command → output | close's verdict | reproduces |
|---|---|---|---|---|
| 1 | G-XSS observable | ⟨`git grep -n 'innerHTML' HEAD -- …/useHighlightCSS.ts`⟩ → **exactly one line**, `:198 el.innerHTML = h.value`; property form **0**; `:183 el.textContent = s` | GREEN | **YES** |
| 2 | G-XSS round-trip | ⟨`npx vitest run --project demo …/highlight-css-roundtrip.test.ts`⟩ → **4 passed (4)**; whole project **31 files / 195 passed** | GREEN | **YES** |
| 3 | G-ROLE | `split-text-implicit-role.test.ts` → **8 passed** | GREEN | **YES** |
| 4 | G-REFUSE | `split-text-refuse.test.ts` → **7 passed** | GREEN | **YES** |
| 5 | G-REVERT | `split-text-revert.test.ts` → **6 passed** | GREEN | **YES** |
| 6 | G-STAGGER-DOC leg 1 | ⟨`npx tsc --noEmit -p tsconfig.test.json \| grep -c 'error TS'`⟩ → **24**; ⟨`… \| grep -cE '<the 13 created fixtures>'`⟩ → **0** — floor carried, not reduced | GREEN | **YES** |
| 7 | G-STAGGER-DOC leg 2 | `group-viability.test.ts` → **5 passed**; `stagger-doc-example.test.ts` → **3 passed** | GREEN | **YES** |
| 8 | G-PRM-FLIP | `prm-engagement.test.ts` → **5 passed** | GREEN | **YES** |
| 9 | G-DELAY | `delay-semantics.test.ts` → **5 passed** | GREEN | **YES** |
| 10 | **G-FROMSTRING** | `fromstring-idempotence.test.ts` → **1 passed \| 2 expected fail (3)** — the two ruled assertions execute and still fail | **RED — honest** | **YES (RED)** |
| 11 | G-CSSIDENT | `public-surface.test.ts` → **7 passed**; ⟨`git grep -c '<name>' HEAD -- public.ts load-engine.ts`⟩ → **2/2** for each of `cssIdent` · `reverseCSSTime` · `serializeTimingFunction` | GREEN | **YES** |
| 12 | G-OPTSET | `option-setter-propagation.test.ts` → **11 passed** | GREEN | **YES** |
| 13 | G-RAF | `raf-degrade.test.ts` → **7 passed** | GREEN | **YES** |
| 14 | G-RENDERER | `adopt-compiled-renderer.test.ts` → **6 passed** | GREEN | **YES** |
| 15 | G-DEPCRUISE | ⟨`npx depcruise --config .dependency-cruiser.cjs src`⟩ → **✔ 0 violations (160 modules, 705 deps)**; allowlist **24 entries / 24 resolve / 0 DEAD** (existence-swept at this seat); oracle **(i) `grep -c 'knownViolations'` 0 · (ii) `package.json:44` carries no `--known-violations` · (iii) baseline file ABSENT**. **Falsifier exercised independently, no repo byte written**: a scratchpad copy with one name mutated to `…/duration-GONE` **THREW** *"LIGHT_BARREL_MODULES names 1 module(s) that do not exist"*; the pristine config loads clean | GREEN | **YES** |
| 16 | G-RING | ⟨same cruise, **both** type-only clauses lifted via a read-only scratchpad overlay⟩ → **45 violations**; ⟨`viaOnly` alone lifted⟩ → **38** — the close's published reconciliation, both halves, at an independent seat | GREEN | **YES** |
| 17 | G-SHIM (floor) | presets tree **exactly 3** (`catalog` · `classic-data` · `index`) · `grep -c 'split by kind'` **0** · ⟨`npx vitest run --project library`⟩ **112 files \| 5 skipped · 1256 passed \| 3 expected fail \| 14 skipped** · ⟨`npm run build`⟩ **✓ exit 0** | GREEN | **YES** |
| 18 | G-STRUCT | the ≥437 L loop re-run at HEAD → **10 god modules** (`cssom` 499 · `group` 498 · `animation` 497 · `progress` 484 · `draggable` 470 · `compiler` 461 · `entry` 459 · `classic-data` 458 · `split-text` 442 · `emit/view-transition` 438); the parent-token predicate re-run → **12 stutters**, the same members | GREEN on its stated condition | **YES** |
| 19 | G-BASIS | ⟨`git ls-tree -r 7d958f21 --name-only -- src \| grep -c '\.ts$'`⟩ → **153**; at HEAD → **154**; `.d.ts` → **0**. The 14-zone census re-derived from the tree sums **29+22+20+17+15+9+8+7+6+6+5+3+3+3 = 153**, matching `.b`'s table zone for zone; the owned/unowned split **53 + 100 = 153** sums at the table | GREEN | **YES** |
| 20 | **G-ID** | ⟨`grep -cE 'KF-ES-[0-9]+\|(^\|[^-])\bL-2\b' waves/KF-W5.md`⟩ → **22** (LINE unit); ⟨`grep -oE …\| wc -l`⟩ → **58** occurrences. The two bare-at-site residues re-cut from the bytes here: **`:386` occurrence 1** = *"G-DEPCRUISE's L-2 leg ← the honest comment"* · **`:412`'s last** = *"and for L-2 (cured, `81a56990`)"* | **RED — honest** | **YES (RED)** |
| 21 | G-TAX relay leg | ⟨`grep -rn 'KF.W5-PARTIALS' registry/adjudicated/`⟩ → **3 header hits**, **0 row hits**; the RD-2 relay row present and naming all three records with both authorities; **0 registry bytes written by this wave** | RELAY LEG GREEN | **YES** |
| 22 | G-TAX annotation leg | ⟨`grep -c 'SUPERSEDED\|superseded'` over the three⟩ → **0 · 1 · 0**, the one hit `kf-DemoGlobalChrome:154`, a dead `dist/gh-pages` byte-offset — a different subject | RED, unobservable by design | **YES (RED)** |
| 23 | G-SCOPE | ⟨`awk 'NR>=309 && NR<=379 && /^\| \*\*/' \| wc -l`⟩ → **46**, and each arm over its own sub-range → **7 · 8 · 22 · 3 · 6** (five independent measurements summing to 46); §Excluded **6 numbered items** whose item 1 carries **7 sub-bullets**, items 2–6 **5** → **12**; **46 + 12 = 58** | GREEN | **YES** |

**Repo instruments, re-run whole**: library **112 / 1256 / 3 xfail / 14 skipped** · demo **31 / 195** ·
`tsc -p tsconfig.test.json` **24** · `tsc -p tsconfig.lib.json` **3** · `proof:structure` **PASS, 0
violations across R1–R6** · `npm run build` **✓ exit 0** · `npm run lint` **x 4 no-cycle, all
`demo/scenes/cube/orbital-drag/**`** (RD-e-2, not this wave's — the wave wrote no `.vue` and no
`demo/scenes/**` byte) · `proof:publish` **exit 1** before *and* after a fresh ⟨`npm run build`⟩ at
this seat (ESC-close-1, below). The wave's own library contribution re-counted from the twelve
single-file runs: **8+7+6+5+3+5+5+3+11+7+7+6 = 73 tests across 12 created library spec files**, the
close's figure exactly.

### 2 · Bounds — every commit inside its unit's writable set, nothing swept in

⟨`git log --oneline 7d958f21..e325018f`⟩ → **35**, of which **22 are this wave's** (`.a` 6 · `.c` 14 ·
`.d` 1 · `.e` 1) and 13 the concurrent X.KF.W2 seat's. ⟨`git show --stat`⟩ per commit, all 22:

- `.a` — `demo/…/useHighlightCSS.ts` ×5 + the one created fixture. **The S-0 lock holds at the bytes**:
  ⟨`git show a9fe060f`⟩ carries the `:111` sink → `el.textContent = s` **and** the KAD-14(a) marker
  redesign (the attribute replaced by a module-level `WeakMap`) in **one commit**, and the escaped
  `h.value` writer is neither deleted nor rewritten.
- `.c` — every path named in §Bounds *Arm B*; `src/animation/index.ts` **never opened**
  (⟨`git diff --name-only 7d958f21..e325018f \| grep -x 'src/animation/index.ts'`⟩ → **0**).
  `constants/types.ts` took `:182`'s tautology only — ⟨`git show 95d91c53 -- …/constants/types.ts`⟩ is
  a docblock over `InputAnimationOptions`; the `| string` arm (KF.W4's, `0c52152a`) is untouched.
- `.d` — the five granted paths in **one** unsplit engine-seam packet (S-4).
- `.e` — `.dependency-cruiser.cjs`, one file, one motion.

**Zero `.vue`, zero glass-ui, zero `demo/scenes/**`, zero `demo/styles/**`** across the range
(⟨`git diff --name-only 7d958f21..e325018f \| grep -E '\.vue$|glass|dev\.sh'`⟩ → **0**).
**`scripts/dev/dev.sh` never staged in either repo** (⟨`git log --format=%H <range> -- scripts/dev/dev.sh`⟩
→ empty, both). **The four-party shared directory**: ⟨`git diff --stat 7d958f21..HEAD -- test/demo/instrument/`⟩
→ **1 file changed, 215 insertions** — the one created fixture, zero modifications to the nine tracked
files. **All 22 kf commits carry the session trailer** (⟨`git log -1 --format=%B <sha> | grep -c`⟩ → 1 ×22).
**value.js side, 12 commits** (the 8 unit/open + the 4 close), ⟨`git show --name-only`⟩ each: only
`docs/tranches/X/execution/B/KF-W5.md`, `docs/tranches/X/keyframes/evidence/W5/**`, and — at open and
close alone — `LEDGER.md` + `INBOX.md` (the latter an **appended** sweep line, verified at the diff).

### 3 · No masking fallback anywhere in the diff

⟨`git diff 7d958f21..e325018f -- src test .dependency-cruiser.cjs demo | grep -E '^\+' | grep -E 'test\.skip|it\.skip|describe\.skip|\.only\(|xit\(|@ts-ignore|eslint-disable|istanbul ignore'`⟩ → **no
output**. Every `try`/`catch` added under `src/` read at the bytes:

- `backward/backward.ts` (`24bbeda2`) — the catch is **narrower** than the bare one it replaces: only
  `AnimationOptionError` with `option === "timingFunction"` is absorbed, **anything else re-throws**.
  No blanket outer guard.
- `physics/playback.ts` (`d7f68225`) — `failFrame` winds the loop down **through `reschedule`** and
  then **`throw error`**; the async arm is `.then(reschedule, failFrame)`. A re-raise, not a swallow —
  the gate's own falsifier.
- `load-engine.ts` (`5a494429`) — the memo is dropped on failure and the error **re-thrown to the
  caller**. Retry, not swallow.
- The one remaining `try`/`catch` in the range sits in `compile/parse-facade.ts`, **the concurrent
  X.KF.W2 seat's file**, not this wave's.

**No allowlist was edited** (`LIGHT_BARREL_MODULES` gained an existence **assertion**, not an
exemption; `proof:structure`'s R4 allowlist is still empty). **No `node_modules` patch, no copied
producer selector, no producer byte.** **`it.fails` is not a skip**: read at
`test/engine/fromstring-idempotence.test.ts:73`/`:88`, both assertions **execute**, both **fail**, and
the header states they must be unwrapped to plain `it` the day the cure lands — the repo's own
documented idiom (`test/group/group-snapshot-identity.test.ts`), and the gate is reported **RED** in
the receipt, in the close and in the LEDGER, never laundered green.

### 4 · Commit families (§Sequencing S-0 … S-7)

**S-0** — `a9fe060f` is the first commit after `7d958f21`, and it carries both halves of the lock.
**S-2** — the three ruling commits (`1c481b09` delay · `d002ce7e` PRM · `0b593743` singleTarget) land
before their fixes; `fromString`'s ruling was taken pre-wave at COHESION §0j.C and **no fix was
authored ahead of a ruling**. **S-4** — B-1+B-2+B-3 one landing (`2549c133`, one file + its three
specs) · the option-setter letter one commit (`24bbeda2`, four legs) · the engine-seam packet one
commit (`d7f68225`) · the depcruise motion one commit (`e325018f`). **The `setTargets` three-declaration
family was not split — it was not performed** (ESC-c-2; all three declarations byte-identical at HEAD,
⟨`git grep -n 'setTargets(\.\.\.targets: HTMLElement\[\])' HEAD -- src/`⟩ → the same three lines).
**S-5** — `.d` consumed `0b593743` and opened neither `group/group.ts` nor `group/waapi.ts`.
**S-6/S-7** — `.e` ran last; **zero renames landed**, so "renames last" is vacuously held and ESC-e-1
carries the unexecuted programme.

### 5 · E-3 — the immutable surfaces are byte-untouched

⟨`shasum -a 256 waves/KF-W5.md`⟩ → **`216a9102eb6723a3cdbf91a4a9a288542236ade289a0e98a51f6cf090f90f045`**,
and ⟨`git show dea4dd4e~1:…/waves/KF-W5.md | shasum -a 256`⟩ → **the identical digest**. Over the whole
branch range ⟨`git diff --stat dea4dd4e~1..HEAD -- waves/ registry/adjudicated/ conformance/ carry/
formation/`⟩ → **empty** (all five trees verified to exist and to be non-empty first, so the silence is
a measurement and not a typo: 12 · 232 · 9 · 1 · 4 entries). **The dated spec, the 58-record adjudicated
registry, the conformance artifacts, the carry and the sibling specs are untouched by this wave.**

### 6 · E13 — mail

⟨INBOX row status cells re-read⟩ → three rows carry **UNREAD** program-wide (**I-32 · I-33 · I-34**).
**None is addressed to KF.W5's scope, verified at the letter's bytes rather than at the row**: I-33 is
the one whose routing cell names keyframes at all, and its `## 2 · keyframes.js` section carries only
`.vue` / `demo/styles` rows (`--rainbow-*` partial override · `text-admin-label` 16 sites · the THP
tooltip ceiling · `useSelectionGroup` · `glass-chip.css`) — **every one outside this wave's §Bounds**,
which forbids `.vue`, `demo/scenes/**` and `demo/styles/**` in any arm. The letter *"asks value.js for
nothing beyond relay"* and the relay is the **X formation mail seat's** act. **0 UNREAD in scope; the
wave closed lawfully under E13.** One citation slip is filed below (D-2).

### 7 · The four-verb line

⟨`grep -n 'IMPLEMENTED\|VERIFIED' waves/KF-W5.md`⟩ at the §State table → **IMPLEMENTED | NO** ·
**VERIFIED | NO**, byte-identical to the pre-wave spec (§5's digest). **Not moving it is the lawful
act, twice over**: IMPLEMENTED's own stated condition (*"gates green + bytes landed"*) is not met — three
gates are RED at this seat's own commands and arm D's rename programme is unexecuted — and the spec
file is granted writable to no arm and is IMMUTABLE under E-3. VERIFIED is KF.W10's by the spec's own
words. The wave's status rides the LEDGER row, which is the surface this seat's law grants.

### 8 · The spec's own goal criterion, at the bytes

Eight concrete clauses; **seven MET at the bytes, one MISSED and published**:
one declared counting basis with all five rivals derived or struck **✓** · a per-module D/L/C matrix
denominated in it **✓** (53/153, re-summed here) · a `splitText` that cannot delete an `<h1>`'s role
nor mutate a DOM it is about to refuse **✓** (8/7/6) · four rulings taken before their fixes **✓** (the
rulings; `fromString`'s FIX is the honest-RED) · `cssIdent` reachable from a published entry **✓** ·
an `adoptCompiled` that does not eat a receiver's renderer **✓** (read at the cure: the renderer is
read off the frames through the class's own reference test *before* the transplant and re-pointed onto
template **and** compiled frames) · a `RAFPlayback` that fails loudly instead of wedging **✓** · a
`.dependency-cruiser.cjs` whose allowlist paths all resolve **✓** (24/24, now assertion-guarded at load
time). **The miss is the goal's own first clause — *"the published surface … either true or deleted"*:**
`proof:publish` is RED at HEAD because the wave published five names the docs cannot teach. That is
ESC-close-1, and the close's verdict is **PARTIAL**, not COMPLETE — the record does not claim the goal
met. Filed as D-1.

### 9 · Defect register

| # | severity | claim | receipt | cure |
|---|---|---|---|---|
| **D-1** | **MINOR (mitigated)** | **The wave turned a blocking CI gate RED and it is RED on `origin/master`.** `2e0d91ae`'s S-3 publication added five exports the README and `docs/published-surface.md` teach nowhere, so `proof:published-surface` clause (b) now fires | ⟨`node scripts/gates/surface/index.mjs`; `echo $?`⟩ → **exit 1**, both runs, **and again after a fresh ⟨`npm run build`⟩ at this seat** — `cssIdent` · `resolveTimingFunction` · `reverseCSSTime` · `serializeTimingFunction` · `timingFunctionEntries`. Attribution confirmed independently: ⟨`git grep -c '<name>' 7d958f21 -- public.ts load-engine.ts index.ts`⟩ → **0 for all five** (the clause had no subject before the wave) and ⟨`grep -c '<name>' README.md docs/published-surface.md`⟩ → **0/0 for all five** at HEAD. It is blocking: ⟨`grep -rn 'proof:publish' .github/workflows/`⟩ → `ci.yml:78` · `ci.yml:109` · `release.yml:49` | **MITIGATION, and it is why this is MINOR**: the close **found this itself**, over four unit seats that had read `PASS` off a stale `dist/`, named the mechanism (the gate measures `dist` AS BUILT; `dist/` is gitignored), corrected the stale receipts as a dated addendum-beside rather than rewriting them, refused to un-publish (that would revert S-3's RULING and re-red G-CSSIDENT), refused an allowlist, and named an owner. **The cure surfaces `README.md` and `docs/published-surface.md` appear nowhere in this spec — ⟨`grep -c 'README' waves/KF-W5.md`⟩ → 0, ⟨`grep -c 'published-surface' …`⟩ → 0 — so no arm of this wave could have cured it inside its grant.** Cure: teach the five in README §Beyond CSS or enumerate them in `docs/published-surface.md`, **one commit**, at the next seat granted those two paths → **KF.W6, terminus KF.W10** (ESC-close-1, as booked) |
| **D-2** | **MINOR (mitigated)** | **§4's mail sweep misquotes I-33's routing cell, and the cell it skipped is the only one that names keyframes.** §4 gives the three UNREAD rows' routing as *"the X formation mail seat / X-W0.j"*, *"X-EXT-1..6"*, *"X-W0.j / X-EXT-1"* — the middle string is **I-32's** | I-33's live cell reads *"the X formation mail seat, which relays each sibling's section to that sibling's lane (fourier → X·F's mail-ledger surface, §0k.1/§0k.2; **kf → X·KF**)"*, re-read at the bytes here | **MITIGATION: the conclusion survives the correction, measured at the letter and not at the row.** `glass-outbound-2026-09-17-constellation-o20-relay.md` `## 2 · keyframes.js` (read at this seat) carries five rows, every one a `.vue` or `demo/styles` surface this wave's §Bounds forbids to every arm, and the letter states *"no edits were made in any of these trees"*. So **0 UNREAD in KF.W5's scope holds**; only the citation is wrong, and the relay is another seat's act. Cure: a dated one-line correction beside §4 naming I-33's real routing cell and its kf section's rows, at the next seat holding this record → **X·KF** |
| **D-3** | INFO | `.e`'s receipt says *"the 500-line ceiling is **two** lines from firing"* while §7 says **one**; §7 is right | `scripts/gates/structure/index.mjs:535-536` measures `src.split("\n").length > 500`, which for `cssom.ts` at `wc -l` **499** is **500** — not over. One more line makes 501 and fires | None owed — the residual (RD-e-3) is routed to **KF.W8**, and `cssom.ts` to **KF.W2**, on either reading |
| **D-4** | INFO | Two self-reported errata and one follow-through bend "one commit per meaning" without splitting any declared family | `24bbeda2`'s message lost two words to zsh command substitution; the `singleTarget` docblock trim rode into `9e5aec60`; `99834edc` is `685ca13f`'s R6 follow-through, booked with it | None owed — each is declared in the record with its reason (a shared index makes an amend a contamination risk), each touches only the unit's own bytes in the unit's own file, and ⟨`git show 9e5aec60 -- group/group.ts`⟩ shows the trim is **condensation, not deletion of a true claim** |

**Nothing above is BLOCKER, CRITICAL or HIGH, and nothing was softened to get there**: every `try`/`catch`
in the range was read at its bytes, the one `it.fails` pair was read at its assertions, the depcruise
falsifier was exercised at a second seat, and the two MINORs are filed against the close's own text
rather than waived.

### 10 · Honest-RED adjudication — three legs, each relieved by the spec and each owner-named

| gate | why it is RED BY THE SPEC'S OWN RELIEF | owner named in the record |
|---|---|---|
| **G-FROMSTRING** | **Relieved by the spec's own §Bounds/§Disjointness partition.** The cure's only site is `src/animation/engine/css/animation.ts` — granted to **arm C** — while the gate's spec `test/engine/fromstring-idempotence.test.ts` is enumerated in **arm B's** created-spec row, and §Disjointness declares *"`.d` owns exactly **three** `src/` files `.c` never opens"*. **No lawful unit of this wave held both**, and under the standing law a write outside a unit's set is an ESCALATION, not an option. The RULING was taken first exactly as S-2 requires (COHESION §0j.C **KF-W5R4(1)**, pre-wave) and is pinned by two **executed, failing** assertions that flip the day the cure lands. Verified live here: **1 passed \| 2 expected fail** | **X·KF — one seat granted BOTH paths; terminus KF.W10** (ESC-c-1). The act is named: clear the template set (and the compiled frames) before the ingest loop, **then** unwrap the two rows to plain `it` |
| **G-ID** | **Relieved by E-3 and by the spec's own routing.** The two bare-at-site `L-2` occurrences are bytes of `waves/KF-W5.md`, which §Bounds grants writable to **no arm** and which E-3 makes IMMUTABLE — confirmed by the digest in §5. §0 R-1.4 and §Sequencing route doc-authority addenda to KF.W10 by name | **KF.W10**, as doc-authority addenda |
| **G-TAX annotation leg** | **Relieved by the gate's own declared observability rider.** Its cell reads *"authored RED and stays unobservable until the SS-1/SS-2 authoring block acts"* and *"**G-TAX PERFORMS NO REGISTRY EDIT**"*, with a falsifier that fires if this wave annotates a registry file. **0 registry bytes written** — verified over the whole branch range in §5 | **SS-1/SS-2**, as dated E-3 addenda under the original ids |

**The three escalations are the same shape and are likewise owner-named**: **ESC-c-2** (the `setTargets`
element contract — 9 diagnostics across 5 files, 3 outside `.c`'s bounds, nothing written, and a
finding that **refutes** B-19's INFO rationale) → **KF.W8**; **ESC-e-1** (the rename programme — **11 of
12 importer paths outside arm D's grant**, and no shim, no split, no quiet re-disposition was taken) →
**KF.W8**, needing the eleven paths **plus a sequencing decision**; **ESC-close-1** → **KF.W6**,
terminus **KF.W10** (D-1).

### 11 · Successor "Opens after" conjuncts, checked against this wave

- **KF.W8** — *"opens after W0·W4·W5 (+W6 SCOPED for G7)"*. **W0 CLOSED ✓ · W4 CLOSED (honest-RED) ✓ ·
  W5 CLOSED by this check ✓** — the three-conjunct head is **GREEN**. The trailing **"+W6 SCOPED for
  G7" conjunct is NOT green** (KF.W6 = `planned`), so **KF.W8's G7 arm alone stays scoped-blocked** while
  the wave is otherwise lawfully open. It inherits five of this wave's residues by name (ESC-c-2 ·
  ESC-e-1 · RD-e-1 · RD-e-3 · the D-6 predicate wording).
- **KF.W10** — *"opens after W0·W1·W9 + W2·W4·W5·W6·W7·W8·W9 **IMPLEMENTED**"*. **LAWFULLY BLOCKED, and
  this wave is one of the reasons**: KF.W5's IMPLEMENTED verb is **not stamped** (§8 above, correctly),
  and independently KF.W2 is `PARTIAL` while W6 · W7 · W8 are `planned`. Four conjuncts short.
- **KF.W6** — *"opens after KF.W4"*, which is CLOSED; **not gated on KF.W5**, so it is already lawfully
  open, and it is the named owner of KAD-14(c), RD-e-2 and ESC-close-1's docs cure.

### 12 · Verdict

**CONFORMANT-HONEST-RED.** Twenty-three gate verdicts reproduce at an independent seat's own
double-run commands — every one the close called GREEN, and every one it called RED. The three RED
legs are each relieved by the spec's own text (a §Bounds partition no lawful unit could cross, an
IMMUTABLE spec, and a gate cell that declares its own leg unobservable) and each carries a named
owner. Bounds are clean in both repos, E-3 holds at the digest, no masking fallback exists anywhere in
the diff, the declared commit families are unsplit, mail is clean in scope, and the four-verb line was
correctly left alone. Two MINORs are filed — a CI-RED the wave created whose cure is out of every arm's
grant, and a misquoted routing cell whose conclusion survives correction — and neither blocks.

**Honest-RED set: G-FROMSTRING · G-ID · G-TAX (annotation leg).**
