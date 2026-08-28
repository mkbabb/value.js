# KF-W5 — PASS-3 FRESH ADVERSARIAL SPEC CHECK (L-18/L-20)

**Subject**: `/Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/waves/KF-W5.md` — 336 L, read whole at this seat's clock.
**Seat**: FRESH. Nothing inherited from `PASS-1/KF-W5-CHECK.md`, `PASS-2/KF-W5-CHECK.md`, `PASS-1/RULINGS.md`, `PASS-2/RULINGS-2.md`, or from any prior PASS-3 text at this path. Every census row re-enumerated **from the 58 adjudicated records by bytes**; every witness re-executed at the keyframes frontier.
**Substrate of record**: keyframes.js `origin/master` **`81a56990736ced5b5edde0b84c527680ac7689b1`** (`git rev-parse origin/master`, this seat). Local HEAD `8281638c` is **1 ahead / 41 behind** (`git rev-list --count 8281638c..origin/master` → **41**) / **252 dirty** — DISQUALIFIED as witness substrate. **Every probe below is a read-only `git show` / `git ls-tree` / `git grep` / `git cat-file` at `origin/master`. No product source was opened for writing; no working-tree byte was read as a witness.**
**Sole write of this seat**: this file.

**VERDICT: DEFECTIVE.**
Axis 1 (census) **CLEAN** · Axis 2 (authority reality) **CLEAN with one false strike-reason** · Axis 3 (M-25 depth) **CLEAN** · Axis 4 (gates born-RED at the frontier) **FAIL — one BLOCKER, one MAJOR** · Axis 5 (posture) **PASS with one MINOR**.

---

## §1 · Axis 1 — ID-KEYED CENSUS (full re-enumeration by bytes; nothing inherited)

### 1.1 Which records route

`for f in kf-*.md; do grep -c 'W5' "$f"; done` over the 58 records → **22 files carry the token**. Resolved by reading every hit:

- **16 route at least one row** — kf-AnimatedText · kf-App.skeleton · kf-CopyButton · kf-EasingScene · kf-EasingSidebar · kf-EasingTarget · kf-EditorStartScreen · kf-KeyframeCard · kf-KeyframesAddDialog · kf-KeyframesEditor · kf-KeyframesStringControls · kf-SpringPhysicsFacet · kf-SpringScene · kf-TimelineHoverPreview · kf-TimingFunctionPanel · kf-TypingDots.
- **3 carry a `KF.W5-PARTIALS` header hit only** — kf-AnimationControlsGroup `:17` · kf-ControlsPaneWrapper `:6` · kf-DemoGlobalChrome `:17`. `grep -rn 'KF.W5-PARTIALS' registry/adjudicated/` → **exactly 3 hits, all headers, 0 row hits** — G-TAX's own probe reproduces exactly.
- **3 are FALSE POSITIVES on the bare token, correctly outside the spec's 16** — kf-SquareInstrument `:7`/`:21` (`R.W5`, tranche R) · kf-OrbitalDrag `:82` (`P.W5.S3`, tranche P) · kf-HeroAurora `:32` (routing-law prose naming the taxonomy, routes nothing).
- **kf-SquareScene and kf-ChannelOptions return `grep -c 'W5'` = 0** at the bytes — the spec's own correction ("naming them 'routing' records was this file's own miscount") **reproduces**; their engine-seam / engine-lane rows are homed by §0 R-1, not by token.
- No alternate routing token exists: no 0-W5 record routes by "tri-fold", "library letter", "library roster" or "library arm".

### 1.2 The routed ids, enumerated then checked for booking

| record | routed ids | booked at |
|---|---|---|
| kf-AnimatedText | KF-AT-8 · KF-AT-9 · KF-AT-12 · KF-AT-23 | B-1 · B-2 · Arm A · B-3 |
| kf-App.skeleton | KF-SKEL-9 · KF-SKEL-16 · KF-SKEL-20 | §Excl 2 · 3 · 4 |
| kf-CopyButton | KF-CB-30 · KF-CB-35 · KF-CB-36 | B-19 · B-20 · B-21 |
| kf-EasingTarget | KF-ET-1 · KF-ET-27 · KF-ET-32 · KF-ET-33 · KF-ET-35 | B-22 · Arm A · B-12 · §Excl 1 · §Excl 1 |
| kf-EasingSidebar | KF-ES-20 | Arm A |
| kf-EasingScene | KF-ES-36 | §Excl 1 |
| kf-EditorStartScreen | KF-EST-5 · KF-EST-17 · P-8 | B-4 · B-17 · B-4 leg 2 |
| kf-KeyframeCard | KF-KC-27 | B-7 |
| kf-KeyframesAddDialog | KAD-1 · KAD-2 · KAD-3 · KAD-5 · KAD-13 · KAD-14 · KAD-17 | Arm 0 ×5 · §Excl 5 · §Excl 6 |
| kf-KeyframesEditor | KF-KE-10 | B-9 |
| kf-KeyframesStringControls | N-8 · C-8 | B-10 · B-11 |
| kf-SpringPhysicsFacet | SPF-20 | fold at B-9 |
| kf-SpringScene | KF-SS-4 · KF-SS-6 · KF-SS-31 · KF-SS-38 | §Excl 1 (all four; `:151` roster line carries -38 and -4) |
| kf-TimelineHoverPreview | C-8 ⟨`:85`, ≡ KF-SKEL-16⟩ | §Excl 3 (folded) |
| kf-TimingFunctionPanel | KF-TFP-21 · KF-TFP-27 | B-13 (one row, two ids) |
| kf-TypingDots | KF-TD-1 · KF-TD-5 · KF-TD-8 · S★-2 | B-6 · B-8 · B-18 · B-5 |

**routedTotal = 43** (4+3+3+5+1+1+3+1+7+1+2+1+4+1+2+4). **bookedCount = 43. escapedCount = 0.**

### 1.3 The spec's own ledger arithmetic, re-derived rather than inherited

Table rows counted mechanically in the file: **Arm 0 = 7** · **Arm A = 8** · **Arm B = 22** (B-1…B-22) · **Arm C = 3** · **Arm D = 6** → **46**. §Excluded = item 1's seven prose rows + items 2–6 → **12**. **46 + 12 = 58** ✓.

The 30/13 split reproduces: §Excluded's 12 rows carry **13** ids (item 3 carries KF-SKEL-16 **and** kf-TimelineHoverPreview C-8); 43 − 13 = **30** ids across **27** §Carry rows (Arm 0 5/5 · Arm A 3/3 · Arm B 22/19, since B-4 = KF-EST-5+P-8, B-9 = KF-KE-10+SPF-20, B-13 = KF-TFP-21+KF-TFP-27) ✓.

**AXIS 1 — CLEAN.** No escape by bytes. No row inside a table the tally omits. No double-home. No id renamed or re-homed away from its bank.

---

## §2 · Axis 2 — AUTHORITY REALITY (every cross-spec receipt re-resolved at its anchor)

| receipt as written | re-resolution at the bytes | verdict |
|---|---|---|
| `KF-W4.md` §Carry → *"The ten rulings this spec owes"* → **R-1**, reading *"Census S-2's owner is **hereby** named: KF.W6 … with **KF.W10** taking any doc-authority addenda"* | heading at `KF-W4.md:90`; R-1 spans `:92`–`:116`; the sentence at **`:115`**, verbatim. Stable anchor, no line number carried | ✓ |
| `KF-W6-CARRY.md` → the **"KF.W4-PROSE SPLITS BY MECHANISM"** bullet, quoted as *"Census S-2's owner is therefore named: KF.W6 for prose-with-code, KF.W4 for the citation gate"*, **exact** | `carry/KF-W6-CARRY.md:12` contains that sentence **byte-for-byte** | ✓ |
| `KF-W6-CARRY.md:170` (KF-AT-6/S-5 constraint) · `:248` (KAD-3 well-swap) · `:319` (RD-4 KeyframesAddDialog) · `:356` (the → KF.W5 edge naming KF-AT-8 blocker-of-the-migration + KAD-1 front-load) · `:9-13` (KF.W5-PARTIALS ⇒ THIS WAVE) | all five resolve; CARRY unmodified since 10:49 | ✓ |
| `KF-W7.md` §Bounds — *"its `innerHTML` BLOCKER is KF.W5's, front-loaded, NOT gated here"* | `waves/KF-W7.md:57`, verbatim; reciprocated again at `:329` and `:348` | ✓ |
| KF.W7's four created fixtures in the shared `test/demo/instrument/` | `KF-W7.md:63-66` — `timeline-mount-projection` · `timeline-mount-keyboard` · `timeline-hover-preview` · `sequence-scrubber-mount`; `:68` strikes the former create-glob; `:72` names the nine tracked files read-only | ✓ (filename disjointness holds) |
| KF.W8 **R-4** declines both structural instances; G13's subordination re-cut | `KF-W8.md:294-299` R-4 declines the pair together; `:4` records the R2-5(a) re-cut citing **G-STRUCT by gate id, never by number** — which satisfies W5's "quote 12 **or** quote the SET"; `:266-267` independently re-derives the 8/3-missing split | ✓ |
| KF.W4 reciprocates the third rider at **row 3 / G-KFW4-2+3** | `KF-W4.md:46` (package.json scripts + devDeps), `:195` G-KFW4-1's redefined `check` | ✓ |
| `CENSUS-2026-08-03` `:34` SCH-3 · `:38` SCH-7 · §(a)`:194-196` · `:177-206` taxonomy | all four resolve verbatim (`:196` is the charter verb *"kills the 17 type-rings, 9 god modules, presets shim ladder, name stutters, depcruise L-1/L-2"*) | ✓ |
| `intakes/lane-keyframes-b10-b21.md` `:76` (X-4) · `:108` (B10-21) · `:245` (KF.W5 routing) | all three resolve verbatim | ✓ |
| `lane-library.md` substrate = `8281638c`; §0 headline **145** by `find src -type f -name '*.ts' \| wc -l`; §7.1 god modules **9**; §7.3 **16 measured + 2 structural**; §3.2 **17** type-rings; §3.5 the two defects | all resolve; the spec's characterisation of the lane's substrate is correct | ✓ |
| §Excluded's **re-run receiving-end counts** (the ten to KF.W6, three controls, two at KF.W7) | 14 of 15 reproduce exactly. **KF-SS-31 does not** — see **D-5** | ✗ |
| D-1's strike reason: `:216-230` **and** `:233-248` had *"zero provenance … not in `lane-library.md`"* | `lane-library.md:154` **does** anchor `:233-248` (`doNotFollow: node_modules`). See **D-7** | ✗ |

**AXIS 2 — CLEAN on substance** (the KF.W4 / CARRY / KF.W7 / KF.W8 / census / lane / intake receipts all resolve at their anchors, and the two stable-anchor re-cuts of RD-3 and §0 R-1.4 are correct and durable), **defective on two printed sub-claims** (D-5, D-7).

---

## §3 · Axis 3 — M-25 DEPTH (locks, riders, dissents)

Re-read against the banks, not against the prior passes:

- **Preserved dissents**: §0 R-3 (KF-KE-10 MAJOR vs SPF-20 BLOCKER, bank governs, dissent preserved and stated as the reason B-9 heads the ruling queue) ✓ · B-19 (*"Reader-2's MINOR as dissent"* against the ruled INFO) ✓ · B-14 (RR-A whole-at-BLOCKER / RR-B WAAPI-half-BLOCKER, ruled RESCOPED-BY-SUBSTRATE) ✓ · B-4 (kf-TypingDots ruling 3 overruling reader-2's demotion, *"the kill demotes the CURE only, never the defect"*) ✓ · B-6 (C's S★-4 second bullet STAYS KILLED; L's S-3 SURVIVES SCOPED) ✓.
- **Cure-locks**: B-22's KF-ET-2 lock (never *"bind `cssValue`"*, never a silent approximation) carried, row itself NOT taken ✓ · §Excl 1 KF-SS-38's *"the sweep must not resurrect the killed claim"* ✓ · §Excl 6's *"the killed BLOCKER arm (mangled parse) is DEAD and must stay dead"* ✓ · §Excl 2's *"the cure may not be authored in a way that resurrects C·D-4's premise"* ✓ · KAD-14(a) marker trap carried as a MUST-CARRY into KF.W6 ✓.
- **Riders carried, not merely cited**: LP-7's rider and ME-32 are **carried as Arm 0 rows** (7 rows, not 5) precisely because G-XSS's observability depends on them — the M-25 hole named and closed ✓ · kf-ChromeDock M-4's MbabbMenu MUST-CARRY rider travels with the packet ✓ · KF-AV-28 correctly **absent** (no governed row here).
- **Fold identities never re-booked**: SPF-20 ≡ B-9 · THP C-8 ≡ KF-SKEL-16 · KF-CB-15 folded as C-3's witness · KF-CB-6 folded at B-7 · KF-CE-42 folded at B-11 · KF-ET-34 folded at §Excl 1 · KF-SKEL-14 kin at §Excl 4 ✓.
- **Transcription-only**: not present. Every arm carries a mechanism, a lock, or a ruling.

**AXIS 3 — CLEAN.**

---

## §4 · Axis 4 — GATES: born-RED with REAL witnesses AT THE FRONTIER

### 4.1 What re-executes exactly (the arm-B/C/basis witnesses)

Every one of these was re-run this seat at `81a56990` and **reproduces to the line**:

`git ls-tree -r 81a56990 --name-only -- src | grep -c '\.ts$'` → **153** (B0) · `.d.ts` → **0** · same probe at `8281638c` → **139** · `git status --porcelain -- src` → **84 M / 2 D / 8 ??** → 139 − 2 + 8 = **145** ✓ — the whole G-BASIS reconciliation is arithmetically true at the bytes.
God-module sweep at the ≥437 floor over all 153 files → **exactly eight**: `progress.ts` 484 · `engine/animation.ts` 478 · `draggable.ts` 470 · `ingest/cssom.ts` 466 · `compile/frame/compiler.ts` 461 · `emit/entry.ts` 459 · `classic-data.ts` 458 · `group/group.ts` 437 — **no new entrant**, and `engine/play-lifecycle.ts` is MISSING (cured at `53b907c5`) ✓.
Stutter predicate, run verbatim as printed → **12**, the identical twelve paths ✓.
`.dependency-cruiser.cjs` **253 L**; `no-cycle` `:113`; comment `:116-131` with the honest denial at **`:125-129`** verbatim; `viaOnly.dependencyTypesNot` at **`:148-149`**; rule 2 `:163`; rule 3 `:203`; `grep -c 'knownViolations'` → **0**; `grep -c 'known-violations'` → **3** (the denial) ✓ — G-DEPCRUISE's re-cut three-clause oracle is correct and the round-1 inversion is genuinely killed.
**D-1 is RED at the frontier**: `physics/spring/{duration,reseat,linear-stops,timing-function}.ts` all **MISSING**; the real files are `solver/{duration,reseat}.ts` and `css/{linear-stops,timing-function}.ts`; all seven §Bounds paths PRESENT ✓.
Presets → `catalog.ts`, `classic-data.ts`, `index.ts` only; `grep -c 'split by kind'` → **0** ✓ (G-SHIM honestly declared a floor).
`\./scheduler` → **exactly** `entries.ts:16`, `group.ts:170`, `group.ts:264`; `group/yield-batch.ts` and `internal/scheduler.ts` both exist ✓.
`backward/walk.ts` `cssIdent` → **5 hits**: `:9` docblock, `:89`/`:110`/`:131` applications, `:145` declaration ✓. `cssIdent` re-exported **only** at `emit/index.ts:53`; **zero** in `index.ts`/`public.ts`/`load-engine.ts`, and the same for `reverseCSSTime`/`serializeTimingFunction`/`debounce`/`convertPixelsToCh` ✓.
`backward/backward.ts` `:253-257` unguarded block chain, `:259-266` the try/catch, `compileToCSS` at **`:352`** ✓. `engine/css/animation.ts:108` *"reference comparison (`usesDefaultRenderer`)"*, `resolveTransform` `:110` ✓. `compile-bridge.ts:88-98` (`setCompilerFor` `:95`, `anim.unflatten = source.unflatten` `:98`) ✓. `physics/playback.ts` `_run` `:113`, `const result = step(now)` **`:139`** (inside the cited `:110-152`) ✓. `strategies.ts:66-75` docblock over `snapToReducedMotion` declared `:76`, quoted verbatim ✓. `frame.ts:22`/`:36-38`/`:85` ✓. `group.ts:159-161` ctor derivation, `:195-204` setTargets recompute ✓. `group/waapi.ts:31-33` ✓. `stagger.ts:15-22` docblock example passing `options:` ✓. `types.ts:182` `Partial<…>`, `:195` `| string` ✓. `view-transition.ts:197` `respectReducedMotion = true` ✓. `delegation.ts:53-64` shadowTick ✓. `load-engine.ts:123-124` `??=` ✓. `animation.ts:219` `get frames()` ✓.
Test tree: zone dirs re-derived, **no `test/animation/`** ✓; `test/orchestration/{split-text,split-a11y-oracle}.test.ts` the only split specs ✓; `split-text.test.ts:72-76` is exactly the explicit-`role="heading"` test ✓; `split-a11y-oracle.test.ts` `PRE_SPLIT` at `:51`/`:97`/`:173` ✓; `test/demo/instrument/` holds **exactly the nine** named files and **not** `highlight-css-roundtrip.test.ts` ✓. `tsconfig.lib.json` include `["src/"]`; `tsconfig.test.json` include `["test/","bench/","demo/env.d.ts"]` ✓. All three named shas exist with the described subjects ✓.

**This is a genuinely re-measured arm D and a genuinely re-anchored arm B/C.** The failures below are the residue.

### 4.2 The failures

**D-1 · BLOCKER — G-XSS's "unconditionally observable half" is an INVERTED ORACLE, in the wave's own sequencing head.**
The gate's second command is `grep -n 'innerHTML' <useHighlightCSS.ts>` → **0**, *"which runs today under any shell"*. At the frontier the file has **two** `innerHTML` writes:

```
demo/components/instrument/keyframes/composables/useHighlightCSS.ts
  :111  el.innerHTML = s;          ← KAD-1/KAD-2, the sink this wave cures to textContent
  :123  el.innerHTML = h.value;    ← the hljs-escaped write, inside highlight()
```

`:123` is the **correct** write — `h = hljs.highlight(el.innerText, {language:"css"})`, and the bank itself says so (`kf-KeyframesAddDialog.md:42`: *"the sibling writer :123 escapes via `hljs.highlight().value`"*). It is not this wave's cure surface: KAD-3/KAD-14(a) redesign the **marker** (`:110`/`:117`/`:124`), not the highlighter. After the ruled cure lands, the grep returns **1**, forever. A seat driving this oracle to GREEN must delete the escaped highlighter write — i.e. delete the component's highlighting, or ship a contrivance.

This is the **exact class** repair round 2 identified as its sharpest find (G-DEPCRUISE's `grep -c 'known-violations' → 0` would have driven a seat to *"delete a true statement"*), surviving un-caught in the one gate the wave calls its only unconditional sequencing head and the one half it says needs no KF.W4 wiring. Cure: assert the **property** — `grep -n 'innerHTML' … | grep -v 'hljs'` → 0, or a line-scoped assertion that `setHighlightingString` writes `textContent`; never a file-wide count.

**D-2 · MAJOR — the wave's own subject sentence quotes the three denominators arm D struck, with no probe and no ref.**
`KF-W5.md:3`: *"…the depcruise pair **lane-library `L-1`/`L-2`**, the **17 type-rings**, the **9 god modules**, the presets shim ladder, the **16 name stutters**, and the counting-basis reconciliation…"* Arm D re-measured all three at `81a56990`: rings are **MEASURE-AT-OPEN** (D-3: *"VOID as a denominator"*), god modules are **8** (D-5), stutters are **12** (D-6). D-3/D-6's own in-row uses are correctly quarantined (*"banked at `8281638c` … VOID"*, and R-14's addendum is carried verbatim with its correcting sentence beside it); `:3` is not. Two of this file's own gates fail on it by their own words — G-STRUCT *"Fails on any module or stutter figure quoted without the probe and ref that produced it"* and G-BASIS *"Fails on … any figure quoted without its probe."* The header is where a reader takes the wave's scope.

**D-3 · MAJOR — G-PRM-FLIP is the one gate whose witness was never re-anchored; its coordinates die at the ref of record.**
§Gates' preamble asserts *"Every witness is a banked, already-measured observation cited by its own record-qualified id **and RE-VERIFIED at `81a56990` before this writing (R2-5)**."* G-PRM-FLIP's cells carry three `8281638c` measurements:
- *"or the **`:337-341`** docblock is corrected to the truth"* — a bare coordinate with no file and no record, resolving into `engine/play-lifecycle.ts`, **MISSING at `81a56990`** (`git cat-file -e` → absent; carved at `53b907c5`). B-6 re-anchored the same docblock to `strategies.ts:66-75`; the gate did not.
- *"`snapToReducedMotion` — grep **2 hits**"* — `git grep -c` at `8281638c` → **2**; at `origin/master` → **7 lines across 4 files** (import `frame.ts:14`, call `frame.ts:137`, declaration `strategies.ts:76`, plus docblocks).
- *"sole caller `playFrame` (**`:199-222`**, the rAF lane)"* / B-6's *"(`:219`)"* — at the frontier `playFrame` is declared `frame.ts:121` and calls `snapToReducedMotion` at **`:137`**.
The mechanism survives the carve (the delegated lane still never consults `withReducedMotion`; `shadowTick` `delegation.ts:53-64` re-verified) — **the row is RED, the gate's receipts are not.** Round 2 scoped itself to arm D by its own words (*"The repair's whole subject is … arm D and its three gates"*); this is what that scoping left behind.

**D-4 · MAJOR — "the nine created library specs" enumerates TEN filenames, three times.**
`:108` says *"the **nine** created library specs, homed by ZONE and **enumerated by full filename**"* and then lists: `split-text-implicit-role` · `split-text-refuse` · `split-text-revert` · `stagger-doc-example` · `group-viability` · `prm-engagement` · `delay-semantics` · `fromstring-idempotence` · `option-setter-propagation` · `public-surface` — **ten**. Repeated at §Disjointness (*"its **nine** created specs by full filename"*) and in G-XSS's falsifier (*"the **nine** library specs' homes"*). Nine is the **gate** count (G-STAGGER-DOC takes two files, legs 1 and 2); the file count is ten. This is the same defect class G-SCOPE fired on at pass 1 (*"a row **inside** a table the tally does not count"*), in a wave whose §Carry law is *"enumerated (not asserted)"*. Ownership is by filename, so an off-by-one in the owned set is a disjointness statement that does not match its own list.

**D-5 · MAJOR — the §Excluded re-run receipt is stale on one of its ten, and its summary sentence is false.**
`:316` prints, as this seat's re-run: *"KF-SS-31 **0 / 1**"*. Re-run with the block's own command (`grep -o <id> <file> | wc -l`): **CARRY 0 / `waves/KF-W6.md` 4** — hits at `KF-W6.md:152`, `:158`, `:356`, `:384`. `waves/KF-W6.md` (mtime 14:06) predates `KF-W5.md` (14:22), so the figure was false when written, not overtaken. `:318`'s restatement — *"all ten are now booked by id in `waves/KF-W6.md` (**1–3 hits each**)"* — is false for the same row. The other fourteen counts reproduce exactly (KF-SS-4 0/2 · KF-SS-6 0/1 · KF-SS-38 0/1 · KF-ET-33 0/2 · KF-ET-35 0/2 · KF-ES-36 0/2 · KF-SKEL-9 0/3 · KF-SKEL-20 0/1 · KAD-17 0/1 · KAD-1 12/16 · KAD-3 2/1 · KF-AT-8 2/5 · KAD-13 2 · KF-SKEL-16 2). The block's entire subject is that a frozen reading of a moving tree is a defect; it struck round 1's sentence for exactly this and then reproduced it at one cell.

**D-6 · MINOR — D-1/§Bounds print "25 entries" for a 24-entry allowlist.**
`git show origin/master:.dependency-cruiser.cjs | sed -n '55,78p' | grep -c '"'` → **24**; the array spans `:54` (`const … = [`) to `:79` (`];`). The **range is right** and the four dead paths are right and RED; the count is not. In the one arm-D row the spec calls *"the row that proves the re-measurement was a measurement and not a formality"*, and under a gate that fails *"any figure quoted without its probe"*, the figure that was quoted does not reproduce.

**D-7 · MINOR — a strike reason refuted by the authority it cites.**
D-1's note: *"`:216-230` and `:233-248` had **zero provenance** — in no adjudicated record, **not in `lane-library.md`** (which anchors `:56-79`, `:82-85`, `:113`, `:120-128`, `:160`, `:200`)."* `lane-library.md:154` reads: *"`options.tsPreCompilationDeps: true`, `doNotFollow: node_modules` (**`:233-248`**)."* The **strike is correct** (both ranges are wrong at the frontier and `viaOnly` genuinely lives at `:148-149`), and `:216-230` genuinely has no provenance — but `:233-248` was lane-sourced, and the sentence that retires it says otherwise while enumerating the lane's anchors as if exhaustively.

**D-8 · MINOR — G-ID still fails its own probe, at a site the file says it closed.**
`:243` (the BORN-STATE AUDIT paragraph) reads *"G-DEPCRUISE's **L-2** leg ← the honest comment"* — a bare `L-2` outside the two cells G-ID declares as exceptions (its own command/witness cells and RD-1). The gate's pass condition is *"Fails on any bare `KF-ES-n` or bare `L-2` outside the two declared exception cells"*, while `:264` asserts *"All eight are now qualified at their sites"* and Arm A asserts *"every id in this file is record-qualified."* Every `KF-ES-n` hit **does** now qualify (re-run this seat: all sites carry `kf-EasingSidebar` / `kf-EasingScene`, including `KF-ES-43` → kf-EasingScene) — the residue is one `L-2`.

### 4.3 Born-state ledger, re-checked

| declared | re-checked at `81a56990` |
|---|---|
| G-DEPCRUISE L-1 leg **RED at the ref of record** | ✓ four dead paths, unmoved by 41 commits |
| G-DEPCRUISE L-2 leg **CURED-AT-FRONTIER** | ✓ `:125-129` honest denial present; oracle correctly re-cut to the property |
| G-SHIM **declared regression floor, not born-RED**, cure `7e9ddf49` | ✓ honest; the three shims are gone and the docblock is true |
| G-STRUCT / G-RING / G-BASIS **MEASURE-AT-OPEN with probes printed** | ✓ all three probes run and reproduce (153 · 8 · 12; rings honestly declared unmeasured) |
| G-TAX born-RED | ✓ 3 unannotated header hits today |
| G-XSS born-RED, observability rider declared | RED ✓ but the oracle is inverted — **D-1** |
| G-PRM-FLIP born-RED | row RED ✓, receipts at the disqualified ref — **D-3** |
| the other eleven arm-B/C gates | ✓ every witness re-resolves at the frontier |

**AXIS 4 — FAIL** (D-1 BLOCKER; D-2/D-3/D-4 MAJOR; D-6/D-8 MINOR).

---

## §5 · Axis 5 — POSTURE

| item | finding |
|---|---|
| **W4 head honored** | ✓ §Sequencing declares `→ KF.W4` **BLOCKING for the re-homed rows, not for this wave's bounds**; KF-AT-12 is stated as the wave's PREMISE, not its cure; the three riders KF.W4 owes are named (`noUnusedLocals` · depcruise-over-demo · `--project demo`/`test:demo`), and KF.W4 reciprocates at `:46`/`:195` |
| **W4's `npm run check` re-cut COMPOSES with the live scripts** | ✓ frontier `check` = `tsc --noEmit && tsc --noEmit -p tsconfig.test.json && npm run proof:structure` (`package.json:37`); KF-W4 `:195` redefines it as `vue-tsc --noEmit -p tsconfig.json && tsc --noEmit -p tsconfig.test.json && npm run proof:structure` — **leg 2 is preserved**, so G-STAGGER-DOC leg 1's `npx tsc --noEmit -p tsconfig.test.json` (correctly re-cut from `tsconfig.lib.json`, whose include is `["src/"]`) rides an instrument that survives W4. **MINOR (D-9)**: OP-6 states *"`check` = plain `tsc`"* — the frontier `check` is three legs, and the third is `proof:structure`, the very script G-BASIS's fifth rival (*"159 modules"*) is owed to and calls *"the one rival the reconciliation still owes"*. Naming the script in OP-6 would close the loop the wave leaves open |
| **W3 gated-unscheduled** | ✓ `→ KF.W2/KF.W3 · Parser Consumption (GATED)` — *"KF.W3 is gated on the parse-that release condition (PLAW-BIND → V.L1/V.L5 → packed Value release). This wave must NOT pre-empt the 4.0.0→4.1.x repin."* B-16's OP-4 both-dispositions pre-declaration keeps the row alive under either resolution without pre-empting the seam |
| **KF-AV-28 present where governed** | ✓ correctly **absent** — `grep -c 'KF-AV-28' KF-W5.md` → 0. The rider governs AnimationVisualizer / SequenceScrubber / PlaybackRibbon rows (`KF-W7.md:7`, `KF-W9.md:206-207`); KF.W5 carries none |
| **O-21 (not O-20) at W1's mint sites** | ✓ not this wave's surface — `grep -c` → **0** for both ids. Verified at the sibling: `KF-W1.md` `:32` · `:79` · `:136` · `:191-194` · `:315` all read **O-21** as the mint, with `O-20` appearing only as the MINT LAW's measured ledger maximum |
| **W10's carry-routed obligations closed by CARRIAGE, not omission** | ✓ `KF-W10.md` carries **KF-W8-R-4-STRUCT-PAIR** ⟨origin **KF.W5 D-6**⟩ at `:92` / `:148` / `:438` with terminal verb **`DECLINED-FOR-X·KF, carried forward`**, RECORD-ONLY and not re-graded; KF-AT-21 booked at `:83`/`:100`/`:177`/`:212`; C-7's citation law (*`345/12/57 @ 8281638c`*) at `:309` with C-8's slot-number falsifier beside it. KF.W5's *"nothing here may be re-booked at W10"* and *"this wave's counting-basis row must not absorb them"* both hold from this end |

**AXIS 5 — PASS with one MINOR (D-9).**

---

## §6 · Register

| # | sev | claim | receipt |
|---|---|---|---|
| **D-1** | **BLOCKER** | G-XSS's unconditional half is an inverted oracle: `grep -n 'innerHTML' useHighlightCSS.ts → 0` is unreachable without deleting the correct escaped write | frontier `useHighlightCSS.ts` has `:111 el.innerHTML = s` (the sink) **and** `:123 el.innerHTML = h.value` (hljs-escaped, per the bank `kf-KeyframesAddDialog.md:42`); post-cure the grep returns 1 |
| **D-2** | MAJOR | `:3` quotes *"17 type-rings · 9 god modules · 16 name stutters"* with no probe and no ref, after arm D struck all three | frontier: rings MEASURE-AT-OPEN (D-3), god modules **8** (sweep at ≥437 over 153 files), stutters **12** (printed predicate). G-STRUCT + G-BASIS both fail on it by their own words |
| **D-3** | MAJOR | G-PRM-FLIP's witnesses were never re-anchored; §Gates' "every witness RE-VERIFIED at `81a56990`" is false of it | `:337-341` → `engine/play-lifecycle.ts` **MISSING** at the frontier (`git cat-file -e`); *"grep 2 hits"* is the `8281638c` count (7 lines / 4 files today); `playFrame :199-222`/`:219` → declared `frame.ts:121`, call site `:137` |
| **D-4** | MAJOR | *"the **nine** created library specs … enumerated by full filename"* enumerates **ten**; repeated at §Disjointness and in G-XSS's falsifier | ten `test/**.test.ts` create-paths in the `:108` cell; nine is the gate count (G-STAGGER-DOC owns two files). Ownership is by filename |
| **D-5** | MAJOR | the §Excluded re-run receipt prints **KF-SS-31 0 / 1**; measured **0 / 4** — and *"1–3 hits each"* is false | `grep -o 'KF-SS-31' waves/KF-W6.md \| wc -l` → **4** (`:152`, `:158`, `:356`, `:384`); KF-W6.md mtime 14:06 < KF-W5.md 14:22, so false at write time. The other 14 counts reproduce exactly |
| **D-6** | MINOR | D-1/§Bounds print *"25 entries"* for `LIGHT_BARREL_MODULES`; the array holds **24** | `sed -n '55,78p' \| grep -c '"'` → 24; array spans `:54`–`:79`. Range and the four dead paths are correct |
| **D-7** | MINOR | the strike reason *"`:233-248` … not in `lane-library.md`"* is refuted by that file | `lane-library.md:154` anchors `:233-248` for `doNotFollow: node_modules`. The strike's outcome is right; `:216-230` genuinely has no provenance |
| **D-8** | MINOR | G-ID fails its own probe at `:243` (bare `L-2`) while the file asserts all eight sites are qualified | `:243` *"G-DEPCRUISE's L-2 leg"*, outside the two declared exception cells. All `KF-ES-n` sites **do** now qualify |
| **D-9** | MINOR | OP-6's *"`check` = plain `tsc`"* understates the live script | frontier `package.json:37` — three legs, the third `npm run proof:structure`, the script G-BASIS's *"159 modules"* rival is owed to |
| **D-10** | MINOR | `group/types.ts:27-30` overshoots the declaration | `AnimationGroupInput` spans `:27-29` at the frontier; the claim (**no `options` field**) is true |

**routedTotal 43 · bookedCount 43 · escapedCount 0 · verdictLocal DEFECTIVE.**

---

## §7 · What this pass does not dispute

The census is whole and honest in both directions; the ledger arithmetic is printed and reproduces; every dissent, lock and rider survives; the round-2 substrate repair of arm D was **real** — B0, the 139/145 derivation, the eight god modules, the twelve stutters, the depcruise re-anchors, the presets fold, the `./scheduler` triple, the `cssIdent` five-hit count and the whole test-tree re-homing all reproduce **exactly** at `81a56990` this seat. The failures above are residue at the two edges the round-2 repair declared out of its own scope (the header sentence and the arm-B gate cells) plus one inverted oracle it did not turn on the head gate — **the same class it caught in arm D and did not re-run over arm 0.**
