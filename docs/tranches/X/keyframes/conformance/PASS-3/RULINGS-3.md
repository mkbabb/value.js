# X·KF REPAIR ROUND 3 — CROSS-WAVE RULINGS

**Seat**: cross-wave rulings, repair round 3 · 2026-08-28
**Authority**: `PASS-3/UNION.md` (read whole) · the 11 PASS-3 per-wave check files · `PASS-2/RULINGS-2.md` + `PASS-1/RULINGS.md` (the standing laws of rounds 1–2 remain binding except where amended here) · the 11 wave specs at `docs/tranches/X/keyframes/waves/` · the 58-record corpus at `docs/tranches/V/megatranche/registry/adjudicated/` · `carry/KF-W6-CARRY.md` · READ-ONLY probes of keyframes.js at **`origin/master 81a56990736ced5b5edde0b84c527680ac7689b1`** (the frontier of record, re-verified this seat: `git rev-parse origin/master` exact). Local `8281638c` remains **DISQUALIFIED** — citable only as a named historical measurement context, never as a witness substrate.
**Pass-3 verdict being repaired**: DEFECTIVE 11/11 · 114 defects · 3 BLOCKER · 2 CRITICAL · 6 HIGH · 6 fresh hard escapes · 4 fresh double-homings · R2-5/R2-7 both partially unapplied. All four pass-2 BLOCKER/CRITICALs verified CLOSED; carriage 97.8%; **the severity head is NON-MONOTONE** (6→11 top-tier, all new, one manufactured by a round-2 cure).
**Law** (unchanged, restated): every cross-wave defect gets exactly ONE owning cure a single wave can apply; per-wave repair seats execute these rulings verbatim; E-3 everywhere (specs are `planned`, repaired in place; registry amended by addenda under original ids); nothing here authorizes execution or opens product source. **R2-5 and R2-7 remain in force and are this round run to COMPLETION**: (i) R2-5 executes as a FULL-SURFACE sweep — every witness, every anchor, BOTH baselines checked for silent mis-resolution, and an import-graph census for every delete/repoint/shim act (LAW A); (ii) the R2-7 Re-anchor seat runs again, LAST, and **its own close certification is audited against the file bytes before the round closes** — a certification is written per LAW B or not at all.

**13 rulings** (2 laws + 11 cases). Ruling → per-wave directive map at §END.

---

## LAW A · THE IMPORT-GRAPH LAW — a delete/repoint/shim act's consumer census is derived from the import graph at the frontier, never from line counts, never from the wave tree's own text

**Why now**: KF-W6's F-5 delete was authorized on a consumer census the CARRY invented and the spec propagated; R2-5's re-run covered the delete family's *line counts* (all of which reproduce) and never the *import graph* the delete depends on. A line count proves a file exists; it does not prove who imports it.

**Law, binding on every seat that writes, carries, or leaves standing an act that deletes, repoints, or shims a module** `M` at path `P`: the act's row carries a consumer census **derived by this command shape, executed at `origin/master` at write time, pasted with its outputs**:

```
# (1) SPECIFIER census — every import-specifier variant of M:
git grep -nF '<T>' origin/master -- .
#     where <T> = the longest unambiguous path tail of P minus extension
#     (e.g. transport/composables/useAnimationGroupPlayback), repeated for every
#     relative-depth spelling and EVERY alias root that can reach P
#     (tsconfig/vite paths: @components/…, @state, @src/…, …) as its own pattern.
# (2) SYMBOL census — every consumer of M's exported names:
git grep -n '\b<exportedSymbol>\b' origin/master -- demo/ test/ src/ scripts/
#     each hit RESOLVED to its own import specifier and compared against P —
#     a consumer of a SIBLING module with the same basename is NOT a consumer of M
#     (the exact W6 failure: the named "repoint target" imported the REAL module).
# (3) The consumer set = (1) ∪ the (2)-resolved hits. Prose/docs hits are recorded
#     as non-import context, never counted as consumers.
```

The census is inherited from **no** CARRY row, no bank paraphrase, no lane doc, no prior pass — those may corroborate, never source. A delete row whose census was not derived this way is BLOCKER-defective at pass 4 on sight, cited to this law.

---

## LAW B · THE CLOSURE-CLAIM BAN — no spec claims complete enumeration in its own voice; the claim lives in the freshest conformance census artifact, cited by path

**Why now**: the fourth consecutive closure-by-enumeration failure. Pass 1: 32 hard escapes; pass 2: 9, all fresh; pass 3: 6, all fresh — in every generation the enumerated set was cured perfectly and the class was not closed. Meanwhile spec-voiced closure sentences ("every row landed", "escaped 0", "NO line number anywhere", "the mint's complete input set") were each falsified at the next pass — W6's closing certificate by `L-EST-12`, W1's §11 row 7 by its own cross-edges, W0's C-17.R by `KAD-12`/`LP-8`/`F1(c)`, W10's `escaped 0` by the un-enumerated mechanism D.

**Law, binding program-wide from this round forward**:

1. **No wave spec asserts, in its own voice, a completeness/closure/zero-escape claim over any enumerable set** — census carriage, anchor cleanliness, exception rosters, input-set completeness, "all N booked", "nothing escapes".
2. **The lawful form**: the closure clause **cites the freshest conformance census artifact by repo path and date** — e.g. *"census carriage per `docs/tranches/X/keyframes/conformance/PASS-3/KF-W6-CHECK.md §1` (2026-08-28)"* — and states what the artifact found, including its defects. The claim lives in the artifact; when a newer pass supersedes it, the citation is re-pointed, never the claim re-asserted in spec voice.
3. **Corollary (the W1 lesson), binding on every cure**: no cure text may commission or assert a certification its own receipts do not reproduce. A cure that orders a sentence written must paste, beside the order, the measurement that makes the sentence true at the substrate it names. A cure that cannot paste that measurement orders the honest sentence instead.

Repair seats this round convert every existing spec-voiced closure sentence they touch to form (2); the Re-anchor seat sweeps for the remainder.

---

## R3-1 · BLOCKER (KF-W6) — the F-5 shim delete is re-authorized on the TRUE consumer census; the delete-plus-repoint becomes one atomic bounded act

**LAW A census, executed by this seat at `81a56990`** (commands + outputs, the census of record):

- The shim: `demo/components/instrument/transport/composables/useAnimationGroupPlayback.ts` — one line, `export { useAnimationGroupPlayback } from "../AnimationControlsGroup/useAnimationGroupPlayback";`.
- Specifier census `git grep -nF 'transport/composables/useAnimationGroupPlayback' origin/master -- .` → **exactly ONE live import**: `test/demo/state/no-shadow-playback-authority.test.ts:21`. (Three further hits are docs prose — `docs/tranches/U/audit/lane-20…:116`, `V/audit/R1-05…:87`, `V/audit/R2-06-demo-target-tree.md:34/:126` — non-import context.)
- Symbol census over `useAnimationGroupPlayback` (demo/ test/ src/): the named "repoint target" **`test/demo/instrument/useAnimationGroupPlayback.test.ts:5` imports the REAL module** (`…/transport/AnimationControlsGroup/useAnimationGroupPlayback`) — it is **not a shim consumer**; nothing to repoint; G-W6-3's bound is unfalsifiable against it.
- **The in-tree authority already states the correct census**: keyframes' own `docs/tranches/V/audit/R2-06-demo-target-tree.md:126` — *"1-line re-export. NOT dead — consumed by `test/demo/state/no-shadow-playback-authority.test.ts:21` (R1-05 missed test/). DELETE + repoint that test."* The bank (`kf-AnimationControlsGroup.md:74`) named `:21` and no filename; the CARRY (`KF-W6-CARRY.md:55`) substituted the wrong filename; the spec propagated it into a delete authorization.

**Cure (exact), owner KF-W6**:

1. **§Bounds delete row (L29) re-cut**: *"delete | F-5; its ONE consumer is `test/demo/state/no-shadow-playback-authority.test.ts:21` — LAW A census at `81a56990` (RULINGS-3 R3-1), corroborated by `keyframes.js docs/tranches/V/audit/R2-06-demo-target-tree.md:126`."*
2. **§Bounds gains the real consumer**: `test/demo/state/no-shadow-playback-authority.test.ts` | modify | repoint `:21` to the real module (the relative spelling its instrument sibling already uses at `:5`: `../../../demo/components/instrument/transport/AnimationControlsGroup/useAnimationGroupPlayback`). The delete and this repoint are **ONE atomic commit**, declared at §Commits.
3. **§Bounds L83 re-cut**: `test/demo/instrument/useAnimationGroupPlayback.test.ts` is NOT a shim consumer — the *"repoint"* verb is **struck**. If the ACG L-1 move-to-the-component-seam act survives on the bank's own words, the row is retained as move-only with that reason; otherwise the row is struck whole. Either way no repoint claim survives.
4. **§Carry W6-B (ACG L-5) corrected by dated E-3 addendum**, stating where the error entered (the CARRY's filename substitution at `:55`); the CARRY gains the addendum row and the spec's owed-addenda list gains its next item.
5. **G-W6-3 restated falsifiably**: GREEN = the shim is deleted AND `git grep -nF 'transport/composables/useAnimationGroupPlayback' <tree-at-execution> -- demo/ test/ src/` → **0** AND `no-shadow-playback-authority.test.ts:21` imports the real module AND that suite still collects. Falsifier: *"fails if the shim is deleted while any import specifier still traverses `transport/composables/`, or if the delete lands in a different commit from the `:21` repoint."*

---

## R3-2 · BLOCKER (KF-W1) — the cure letter names the MEASURED TREE truthfully: the 252-dirty worktree record, never `8281638c`; the two tree-identity gates are re-keyed; the addendum states the anchor duality

**Facts of record** (W1 check D3-1/D3-2, spot-confirmed): at `8281638c` the import census is **81** across a subpath alphabet (`/parsing` 24 · `/units` 26 · …) sharing no line with O-11's certified **61** split (`/css` 29 · `/value` 15 · `/color` 7 · `/math` 5 · `/easing` 3 · `/transform` 2); `/css` and `/value` do not exist at that sha. The 252-dirty sacred-checkout **worktree** reproduces O-11's split **byte-exactly**. C-6/G-KF1-4 as written order `8281638c` inscribed as "the tree it matched" — a new false certification commissioned by the cure of a false certification (SCH-4 inside SCH-4's cure).

**Cure (exact), owner KF-W1**:

1. **C-6 and G-KF1-4 re-cut**. The addendum withdraws *"matches your tree exactly"* by naming a **worktree-state record**, not a sha: *"the census matched the keyframes.js UNCOMMITTED WORKTREE at the sacred checkout — HEAD `8281638c` + 252 dirty paths (`git status --porcelain | wc -l` → 252, measured 2026-08-28) — a state no sha names and no recipient can re-derive; byte-identical on all six census lines (61 = /css 29 · /value 15 · /color 7 · /math 5 · /easing 3 · /transform 2). It does NOT match bare `8281638c` (81 imports, disjoint subpath alphabet) and does NOT match `81a56990` (62)."* Per LAW B corollary, the measurement above rides beside the commissioned sentence in the spec.
2. **The two tree-identity gates re-keyed off bare HEAD** (D3-6): G-KF1-2 and G-KF1-4 name their repo AND substrate in every command — frontier legs run `in keyframes-v-exec` at `origin/master` (the idiom G-KF1-3/G-KF1-10 already use); **historical-census legs run against the worktree-state record** (the dirty worktree at the sacred checkout, dated, porcelain 252), never bare `HEAD`. `8281638c` may appear only as a named historical measurement context inside that record.
3. **The letter's amendment addendum states the ANCHOR DUALITY explicitly**: *"Two substrates, each named at each use: cures and forward anchors bind to `origin/master 81a56990` (the frontier of record); the historical census is certified against the dirty-worktree record above. No certification cites a sha as 'the tree measured' unless the census reproduces at that sha."* The final clause is written into C-6 as a LOCK (LAW B corollary, verbatim).
4. **The wave's inverted thesis restated** (D3-2): the sentences *"they certified a tree they had not measured"* / *"both packets measured the stale tree"* / *"import-census off-by-one"* are **struck with dated corrections** — the packets measured a live tree precisely and named no sha; the defect was unreachability plus sha-less certification, not mismeasurement. §1's Goal criterion, C-5 and C-6's causal account restated; the operational payload (re-anchor at `origin/master`; the §5a drift table) is untouched — it is correct.

---

## R3-3 · BLOCKER (KF-W5) — G-XSS's observable half re-cut so GREEN is reachable without deleting the CORRECT escaped write: allowlist-by-coordinate with the escape mechanism named

**Facts of record at `81a56990`** (re-derived this seat): `demo/components/instrument/keyframes/composables/useHighlightCSS.ts` carries exactly **two** `innerHTML` writes — `:111 el.innerHTML = s;` inside `setHighlightingString` (the KAD-1/KAD-2 sink this wave cures to `textContent`) and `:123 el.innerHTML = h.value;` inside `highlight()`, where `h = hljs.highlight(el.innerText, { language: "css" })`. hljs entity-escapes `.value`; the bank says so (`kf-KeyframesAddDialog.md:42`: *"the sibling writer :123 escapes via `hljs.highlight().value`"*). The ruled KAD-3/KAD-14(a) cure redesigns the marker, not the highlighter — post-cure the file-wide `grep → 0` oracle returns 1 forever.

**Cure (exact), owner KF-W5** — the gate's observable half becomes, **verbatim**:

> **G-XSS · observable half (re-cut, RULINGS-3 R3-3).** Command: `git grep -n 'innerHTML' <ref> -- demo/components/instrument/keyframes/composables/useHighlightCSS.ts`. **GREEN** iff the output is **exactly one line**, and that line is the known-escaped writer inside `highlight()` — the assignment of `h.value`, where `h` is produced by `hljs.highlight(el.innerText, { language: "css" })`. **Escape mechanism named: hljs output-escaping** (`hljs.highlight().value` entity-escapes; banked at `kf-KeyframesAddDialog.md:42`). At `81a56990` that line is `:123`; the line number is a convenience — the identifying predicate is the `h.value` write. Any other `innerHTML` line is RED — in particular `setHighlightingString`'s `el.innerHTML = s` (`:111` at `81a56990`, the KAD-1/KAD-2 sink), which the cure converts to `textContent`. Equivalent property form, also lawful and stated beside it: `git grep -n 'innerHTML' <ref> -- <the file> | grep -v 'h\.value'` → **0**. **Falsifier**: fails if GREEN is reached by deleting or rewriting the escaped `h.value` write (the highlighter); fails if any new `innerHTML` write appears in the file; fails if `setHighlightingString` still assigns caller-supplied markup via `innerHTML`.

The cure surface is unchanged (marker redesign + the `:111` sink → `textContent`); the gate remains the wave's unconditional sequencing head — the re-cut command still runs under any shell with no KF.W4 wiring. The repair seat sweeps the wave's remaining file-wide count-oracles for the same inversion class before close (the round-2 G-DEPCRUISE property-form re-cut is the template and is verified sound).

---

## R3-4 · CRITICAL (KF-W4) — §Bounds row 78 re-filed at the true file; the cure-lock re-anchored; the SUBJECT-IDENTITY CHECK ruled and swept over every symbol-bearing bounds row

**Facts of record at `81a56990`** (re-derived this seat): `seedFor` is declared `EasingSidebar.vue:99` (its `bezierPresets` reach at `:112`; uses `:122`/`:163`); `syncGap` is declared `EasingSidebar.vue:132` (calls `:138`/`:162`). `git grep -n 'seedFor\|syncGap' origin/master -- demo/scenes/easing/useEasingDemo.ts` → **0 hits, both names**. Only row 78's `:255-257` (the `[0,0,1,1]` reset) genuinely belongs to `useEasingDemo.ts`.

**Cure (exact), owner KF-W4**:

1. **Row 78 re-filed**: `EasingSidebar.vue` `:42-49` caption · `:86-89` comment · **`:99` `seedFor` (its `bezierPresets` reach `:112`) · `:132-137` `syncGap`** ‖ `useEasingDemo.ts` `:255-257` the `[0,0,1,1]` reset — modify-carve, these lines only. The cure-lock's subject is now inside its own §Bounds.
2. **G-KFW4-14's CURE-LOCK re-anchored at the true file** at all three quoting sites: *"gate `seedFor` on `NAMED_EASING_BEZIER` — in `EasingSidebar.vue` — never merge the catalogues."* Its falsifier (*"fails if the caption is corrected while `seedFor` still reaches `bezierPresets`"*) is now reachable.
3. **THE SUBJECT-IDENTITY CHECK is hereby ruled** (the R2-5 completion for the silent-mis-resolution class): *for every §Bounds row naming a symbol, the seat runs `git grep -n '<symbol>' origin/master -- '<the row's own file>'` and the command must return the row's stated lines — an anchor's CONTENT must mention its SUBJECT.* R2-5 checked existence; this checks identity. Run over row 78 as written, that command prints nothing — it would have caught this before the file was written.
4. **The check is swept over ALL of W4's symbol-bearing rows in the same motion**, and the sweep's known members are cured now: row 68's file-less `(:56)` — the pinned constant lives at `test/demo/scenes/orbital-inertia-parity.test.ts:29`, the shipped `0.95` at `demo/scenes/cube/orbital-drag/OrbitalDrag.vue:56`, **both files named** (D-5); row 64's fourth `types.ts` = `demo/scenes/cube/orbital-drag/types.ts`, not "the group twin" (D-8); row 69's quoted header is `:9`, not `:8` (D-9); R-7's `proof:idioms` cure inventory restated at **three** sites (`design-idioms.css:3`/`:43` + `layout.css:10`) so G-KFW4-8's 33-line denominator can go green (D-6).

---

## R3-5 · CRITICAL (KF-W4) — the five unbooked banked ids are booked at their banked sentences; the nine-block partition is RETIRED; pass-4 census partitions enumerate BY RECORD

**Cure (exact), owner KF-W4** — each id booked per the corpus routing, whole sentences resolved:

1. **KC-17** (`kf-KeyframeCardList.md:121`) — enters G-KFW4-1's witness column **beside KC-37** (the banked sentence adds *both* witnesses to the KC-13 ≡ KF-CE-16 row); its mechanism stated: the `frames: any[]` `noUncheckedIndexedAccess` witness of exactly the flag pair rows 1/4 stand on.
2. **kf-ChromeDock m-8** (`:41`) — booked beside the fold row's other three riders (`:128` TS2322 · C-8 · m-1/C-7): the `String(id)` `AcceptableValue` laundering at `:239`/`:289`.
3. **kf-EditorShell L-6/C-18** (`:40`) — booked beside its sentence-mate C-21 at row 3: the unread `const props` + `object|null` annotation-laundering, named members of the gate's class.
4. **kf-TimelineTrack m-1 · D-m5** (`:59`) — carry row 4 restated as the **five**-id merged group `C-10/C-11/D-m6/m-1/D-m5` (→ KF.W7 cure, KF.W4 enforcement-by-fold; KF-W7 already carries the merged group whole at its end — verified). A banked merged group is never truncated.

**ORDER, program-wide, for pass 4**: the nine-block partition (built at pass 1, re-used by passes 2 and 3 and twice declared "an independent re-derivation") is **RETIRED as a census instrument** — for W4 and for every wave. Each pass-4 check enumerates **by record**: a per-record, id-keyed harvest from the 58 records' bytes, resolving **whole sentences** — every *"Riders this component contributes"* list, every merged group's full id set, every *"this corpus adds the X and Y witnesses"* clause. A prior partition may be consulted only AFTER the seat's own enumeration, as a diff target, and the diff is reported. Per LAW B, no pass-4 check inherits any prior pass's denominator.

---

## R3-6 · HIGH (KF-W8) — G8 leg (i) restated at the frontier's TWO sites; the `EditorStartScreen.vue:102` phantom-directory comment gets a booked act

**Fact of record** (re-derived this seat): `git grep -n 'editor-shell/' origin/master -- demo` → **2**: `demo/app/App.vue:144` and `demo/components/instrument/shell/EditorStartScreen.vue:102` — both comments citing the phantom `editor-shell/` directory (the real home is `shell/`); both exactly G8's subject.

**Cure (exact), owner KF-W8**:

1. G8 leg (i)'s today-reading restated: *"today: **2** — `App.vue:144` · `EditorStartScreen.vue:102`"*, both sites printed.
2. **The second site gets a booked act**: §Bounds gains a modify-carve row for `demo/components/instrument/shell/EditorStartScreen.vue` — *"the `:102` comment token `editor-shell/` → `shell/`, this line only"* — attached to the same cure family as the `App.vue:144` correction, with its §Commits mention. G8's GREEN (0) is thereby reachable inside bounds; its falsifier gains: *"fails if leg (i) is driven to 0 by an edit outside the two enumerated sites."*

---

## R3-7 · HIGH (KF-W9) — the play-lifecycle witness family re-derived at the frontier layout; all five sites re-anchored; the SUBSTRATE-INVERSION row restated as a frontier fact

**Facts of record** (`git ls-tree` + symbol grep at `81a56990`, this seat): the module is a **directory**, `src/animation/engine/play-lifecycle/{events,frame,index,strategies,transport}.ts`, carved at **`53b907c5`** from `engine/play-lifecycle.ts` (the `./play-lifecycle` specifier resolves to the dir barrel, unchanged). Successor map, verified by symbol:

| old cite (at `8281638c`) | frontier home |
|---|---|
| `:214` `const flipped = withReducedMotion(` | `engine/play-lifecycle/frame.ts:131` (the `snapToReducedMotion(anim)` call at `:137`) |
| `:337-341` the `snapToReducedMotion` docblock | `engine/play-lifecycle/strategies.ts:66-75` docblock + declaration `:76` |
| `:376` `return beginPlay(anim._playback, () => withReducedMotion(` | `engine/play-lifecycle/strategies.ts:109` |

**Cure (exact), owner KF-W9**:

1. **All five citing sites re-anchored** (`:69` §Bounds library row · `:107` KF-KE-8 · `:110` KF-TD-1 · `:218` G-KFW9-6 · `:219` G-KFW9-7) under the R2-7 idiom: file + symbol, line parenthetical, per the map above.
2. **The KF-TD-1 SUBSTRATE-INVERSION row restated as a frontier fact**: the module is now a directory (carve `53b907c5`); the lane-flip it records is dated to the pre-carve layout; the row states the split so KF.W5's docblock cure (B-6, already correctly re-anchored at `strategies.ts:66-75`) lands in the right file — the two waves' anchors now agree, cross-cited.
3. The library-reference family enters the wave's re-derivation receipt block, curing D3-4's false universal for this family (the block's scope statement per LAW B).

---

## R3-8 · HIGH (KF-W8 × KF-W4, rider KF-W7) — the plugin-vue registration collision declared at both ends: G10 becomes a dependency-cite of W4's booked commit 2; G11/G12 re-gate on the cite

**The collision** (verified at both specs' bytes): KF-W4 §Bounds claims the absent `plugins` array, item 3 (ME-32 ≡ R-10) books it, commit 2 is *"plugin-vue REGISTRATION (only vitest.config.ts changes)"* — and KF-W8's G10 is born RED **solely** on that absence, with G11/G12 gated on G10, while W4 lands first by W8's own §State. Neither spec declares it.

**Cure (exact)**:

1. **Owner KF-W8**: G10 re-cut from born-RED act to **INBOUND-DEPENDENCY GATE**: *"the plugin-vue registration is KF.W4's booked act (KF-W4 §Bounds `vitest.config.ts` row · item 3 ME-32 ≡ R-10 · commit 2), and W4 lands first (§State). G10 GREEN = (a) W4's commit 2 landed — witness: `vitest.config.ts` declares the plugins line, provenance W4's §Commits; (b) this wave's own residual act: `+@vue/test-utils` devDep — the ONE manifest change this wave needs. G10 performs no `vitest.config.ts` edit."* G11/G12's *"Gated on G10"* becomes *"gated on the KF.W4 commit-2 dependency-cite (G10)"*. Rows 24's *"one `vitest.config.ts` edit closes R-10 + C-10 + the KAD fold"* restated: **the edit is W4's**; W8's rows close on it by dependency. §Bounds' `package.json` carve narrows to the `+@vue/test-utils` devDep alone (D-8; the `exports · sideEffects · scripts` claims are struck — see §END DH-2).
2. **Owner KF-W4** (reciprocal, one motion): its → KF.W8 cross-edge declares *"commit 2 discharges KF.W8 G10's RED condition"* by gate id.
3. **Rider, owner KF-W7** (the cost-model outlier): OP-4/§Bounds/G11 stop costing `@vitejs/plugin-vue` as an ADD — the devDep exists at `package.json:81` (`^6.0.7`, W4 struck exactly that add as a no-op); W7's cost restates as wiring only, and the registration act is W4's commit 2, cited by the same anchor. W7's `vitest.config.ts` posture is reconciled in §END DH-2.

---

## R3-9 · HIGH (KF-W9) — G-KFW9-6's witness restated truthfully: `reducedMotionScale` has three live library consumers; the in-tree precedent the cure follows is NAMED

**Facts of record** (re-derived this seat at `81a56990`): `reducedMotionScale` — exported `src/animation/index.ts:50`; defined `internal/reduced-motion.ts:125`; **three live consumers** at `physics/spring/progress.ts:153` / `:232` / `:385`, each `this.amplitudeScale = reducedMotionScale(…)` (import `:2`; the scalar applied at `:323`/`:352`). Demo consumers: **0**. The bank says only *"exported on the LIGHT barrel"* (`kf-AmigaScene.md:47`); *"used by nothing"* is the spec's unbanked amplification.

**Cure (exact), owner KF-W9**:

1. **Both sites restated** (`:98` §A anchor row · `:218` G-KFW9-6): *"exported on the LIGHT barrel (`index.ts:50`); zero DEMO consumers; **three LIBRARY consumers** (`physics/spring/progress.ts:153/:232/:385`, each assigning `this.amplitudeScale`)"*. The *"used by nothing"* wording is struck as unbanked.
2. **The precedent named**: the wave's central adjudicated cure is the intensity form, and **the shipped in-tree precedent is the spring lane** — `SpringProgress.amplitudeScale` consumes `reducedMotionScale(respectReducedMotion)` as a multiplicative intensity scalar (applied at `:323`/`:352`): exactly the mechanism the scene cures order. G-KFW9-6's RED restated to the gap it actually measures: *"the demo half does not yet consume the resolver the library half already ships."*
3. A dated note records `docs/published-surface.md:35`'s *"manifest-only"* as the likely inheritance source of the false claim (a spec-side note; the keyframes doc is not edited by this wave).

---

## R3-10 · HIGH — THE W10-SEAM CLASS: one coordinated ruling over the five one-ended edges; each edge gets a booked act at its SOURCE wave; W10 gains the inbound-dependency table that makes OP-4 fulfillable by construction

Five edges, discovered independently by five seats, all pointing at the close wave. Each is cured at its **source** end; W10 indexes all five.

1. **Edge W0 (E-10 — the C-17-mint consumption edge), owner KF-W0**: §Sequencing's KF.W10 row gains the answer, per W0's own C-22 precedent (*an answer in §Carry but not the edge table leaves the seam half-open*): *"KF.W0's C-17 MINT PRECEDES KF.W10's CARRY-FORWARD RECORD block (`KF-W10.md` §6.A ordering 3, `:363`/`:374`); CARRY-C-3/CARRY-C-5 consume the ids C-17 assigns."*
2. **Edge W3 (KF-HA-19 — the R1-framing triple's third member, the one adverse to the wave's headline), owner KF-W3**: booked by bytes beside its two carried siblings on the E-14 dissent-preservation surface — the adverse member is carried exactly as the four preserved dissents are, with its bank anchor; W10's triple-cite becomes resolvable.
3. **Edge W7 (zero KF.W10 references against W10's three), owner KF-W7**: gains a **→ KF.W10 cross-edge row** declaring the acceptance form W10's terminal table needs — this wave produces, per governed surface, the SWAP-verdict receipt in W10's G-2 alphabet form *"`DISCHARGED by KF.W7 SWAP verdict <surface>, <date>`"* — so W10's terminal table consumes a declared output instead of silence.
4. **Edge W9 (D3-3 — the OD-V3/OD-V5 capture packet, W10's hard OP-4 precondition), owner KF-W9**: S-10 gains the KF.W10 cross-edge (**PRECEDES — W10 depends**); S-8's family (iii) gains the **1280 arm** beside 390 and enumerates the **four duplicating scenes and both transport homes** (in-panel card, floating pill); the OD-V5 390 at-rest observation enters as a named member; **§Bounds gains the surface-receipt row** so W10's *"both waves' bounds blocks"* sentence becomes true from this end.
5. **Edge W10 (D-4 — KF-W8 R-4's three re-open triggers), owner KF-W10**: the `KF-W8-R-4-STRUCT-PAIR` record carries **all three conditions verbatim from `KF-W8.md:298`** — they are the successor's evaluation instrument and the record is the one place R-4 puts them. The existing *"does not re-open the ruling"* posture stands beside them with the clause: *"carrying the conditions is not scheduling; a successor evaluates them against KF.W8 R-4 via this record."*

**And, owner KF-W10**: §6.C (or §2b.1, extended) gains the **INBOUND-DEPENDENCY TABLE** — all five edges with their source-wave anchors (W0 §Sequencing KF.W10 row · W3 §Excluded E-14's KF-HA-19 line · W7 → KF.W10 cross-edge · W9 S-10 edge + S-8 capture family + §Bounds receipt row · KF-W8:298 → this file's trigger block) — so OP-4 and the terminal table are fulfillable **by construction**. §2b.1's census declares **mechanism D (sibling wave specs)** as an enumerated routing surface (curing D-9, the surface where the escape hid), and restates the tally at the re-derived figure per LAW B (citing the PASS-3 check).

---

## R3-11 · THE REMAINDER — the six fresh escapes · the four double-homings · U-2's four families · U-3's five members · the R2-5/R2-7 completion, as per-wave directives

**(a) The six fresh hard escapes** (UNION §1.2), owner per corpus routing: **1** R-4's three triggers → R3-10.5 (KF-W10). **2** kf-SequenceScene *countable-cell* datum (W0 E-2) → KF-W0: carried by id beside the F-1 fold booking — the *"24-member"* countable-cell signature (killed-claims #14). **3** kf-AmigaScene per-file re-anchor datum (W0 E-4) → KF-W0: the C-21/G-0.9 per-file clause carries the corpus's one measured offset — *"comment-only drift, useAmigaDemo −2 below `:73`"* — as G-0.9's exemplar row. **4** kf-SpringTrace D-15 no-re-book guard (W0 E-6) → KF-W0: a one-line guard row — *"kf-SpringTrace D-15: KF.W0 fold-adjacent, NO RE-BOOK (banked `:72`)"* — disambiguated from kf-EditorHeader's D-15/D-17. **5** kf-ChromeDock m-8 → R3-5.2 (KF-W4). **6** kf-EditorShell L-6/C-18 → R3-5.3 (KF-W4).

**(b) The four double-homings** (UNION §1.4): **DH-1** plugin-vue → R3-8. **DH-2 `package.json` (W3/W4/W7/W8)** — the R2-12 both-ends law extended to the whole surface: each claimant's row names the other three claims and its own carve. W4 owns `scripts` (`check`/`check:lib`/`lint`/`test:*`); the export-surface DECISION is KF.W5's (W8's G2 measures only — its own words); **W8's carve narrows to `+@vue/test-utils`** (R3-8.1); **W7** either consumes W4's commit 2 (no own `vitest.config.ts` write) or declares its authoring edge honestly — the *"for VERIFICATION not authoring"* scope-sentence is corrected either way. **DH-3 `test/demo/instrument/` (four parties)** — the R2-12 law extended from the W5↔W7 pair to all four: each wave's §Disjointness names ALL other claimants' files by name (W8's 9-tracked modify + `resize-tracks` + 4 creates · W7's 4 creates + 9 read-only · W4's 2 creates + its `resize-tracks` cure site · W5's `highlight-css-roundtrip` create); *"Neither wave owns the directory"* becomes the four-party statement; W4's nine-vs-ten self-contradiction cured (nine tracked; the `resize-tracks.test.ts` double-count struck; row 67's "nine other" → **eight**). **DH-4 `scripts/observe/demo/usability.mjs` (KF-W6)** — one posture, stated identically at §Bounds and §Sequencing: *"read-only for this wave alone; written ONLY inside the KF.W4∥KF.W6 atomic bundle (one commit, both seats); never unilaterally, never concurrently"* — the "Read-only witnesses (never modified)" list header no longer covers it.

**(c) U-2's four anchor-rot families**: **(1)** KF-W1 cross-edges 2/11 — the four dead coordinates (`:393`/`:431`/`:54`/`:332`) dropped; edges ride the stable anchors §1 already names; §11 row 7's certification restated per LAW B (cite the PASS-3 check; no "no line number anywhere" in spec voice) — cures D3-3/D3-4. **(2)** KF-W8 — the live coordinate is `KF-W6.md:417`; the retired `:410` spelling is not re-issued anywhere; the `:269(b)` reuse struck (D-10). **(3)** KF-W9 — `⟨X-W6 §MATRIX⟩` re-anchored to `X/waves/W11.md` §G8 + `X/waves/W6.md` **§8 Verification Artefacts** (the numbered heading), the bolded MATRIX label cited as an inline label, parenthetical (D3-7). **(4)** KF-W7 — the two disclosed raw-line spec-local labels converted to the idiom at the repair seat's touch.

**(d) U-3's five stale-substrate families**: **(1)** KF-W1 whole → R3-2. **(2)** KF-W9 D3-1 → R3-7. **(3)** KF-W5 — G-PRM-FLIP's three cells re-anchored at the frontier (docblock → `strategies.ts:66-75` + decl `:76`, matching B-6; the `snapToReducedMotion` count restated at the frontier's 7 lines/4 files, the `2` retired as the `8281638c` figure; `playFrame` → `frame.ts:121`, call `:137`); the `:3` header's three struck denominators re-stated with probe+ref or struck (rings MEASURE-AT-OPEN · god modules 8 · stutters 12 — G-STRUCT/G-BASIS's own failure words). **(4)** KF-W8 G9 — the oracle re-keyed off the local index: the tracked-set leg becomes `git ls-tree -r --name-only origin/master | grep '\.test\.ts$'` (132 at this writing), the gate naming its ref; `git ls-files` (the disqualified index, 122) is retired. **(5)** KF-W4 row 78 → R3-4.

**(e) R2-5/R2-7 run to completion** — restated from the preamble as directives: every repair seat this round executes R2-5 as the FULL-SURFACE sweep (every witness · every anchor · both baselines checked for **silent mis-resolution** via the R3-4 SUBJECT-IDENTITY check · LAW A import-graph census for every delete/repoint/shim). The **Re-anchor seat runs LAST** over all touched files, and before the round closes its own certification is **audited**: the certification is written per LAW B (citing this round's re-anchor receipts), and the pass-4 union seat verifies it against the bytes as its first act.

**(f) Per-wave residue directives** (each check's surviving tail, executed verbatim from its register): **KF-W0** — D-1 (the two repo-qualified letters at C-14/G-0.10, *"NONEXISTENT path"* struck loudly); D-2 (C-17.R: row 13 named, **KAD-12** adopted, the `/number-field` claim re-keyed to the carry's **`LP-8 ≡ KF-CO-35`**, the coined **`F1(c)`** retired for the record's real ids); D-3 (30 firings + 2 anti-firings, G-0.9 keyed to 30); D-5 (the 200/48 sweep re-run with both readings pasted; C-1.G membership re-derived from the 44-record post-discard set — which lands E-1/E-2); E-3 (the `:447` transit roster carries the PlaybackRibbon **and** SequenceScrubber KF-AV-28 limbs + the §7 caution + the NON-bespoke limb); E-5 (C-17.R row 4's cell regains *"owned by KF.W6"*); D-6 (the scope word on G-0.4's two probes). **KF-W2** — D-1 (the exclusion basis re-derived by READING, not token-matching; the eight escapes booked: KF-ES-3 with W9's trigger-register arm + the W4 fold cross-cited · KF-HA-13 cross-cited to W6 + W10 §6.C-H · KF-CO-48 cross-cited to its full W5 booking · KF-CB-1 entered in the census the twice-carried KF-CB-33 organ lock widens, with D-14's instance carried); the positive-posture register completed (**S-5/C-S5** — the corpus's only positive posture over a typed ParseIssue — and **SUP-D**, the refusal-surfaced-verbatim twin, beside X15); D-3 (G-W2-6's published contract gains the **frozen-parse-boundary** fact — façade parse results are deep-frozen, which is what makes KC-2 a loud TypeError; W9's AT arm cross-cited); D-15 (kf-SpringTrace C-2 cited WITH its ruling-12 kill qualifier, M-25); D-5 (**the BH-relay DECLARED NEGATIVE is struck** — the sentence instructing later seats not to raise a relay is removed as contrary to the standing BH/BI edict; the two banked postures naming the relay are carried; the flag-upward stands); D-8 (the `4.1.x` literal → the RC-P(V) predicate form W3's ratified law requires); D-9..D-12 minors per register. **KF-W3** — D-1 (the routed/surplus membership law restated self-consistently: the split is owner-derived, the X-13 criterion reconciled, `routedTotal` auditable); R3-10.2; D-3/D-4/D-5/D-6 per register (the "424" sourced or struck). **KF-W5** — R3-3 + (d)(3) + D-4 (the created-spec enumeration states its split: **ten files / nine gates**, G-STAGGER-DOC owning two, at all three sites) + D-5 (KF-SS-31 **0/4**; *"1–3 hits each"* corrected) + D-6 (24 entries) + D-7 (the strike-reason corrected: `lane-library.md:154` sources `:233-248`) + D-8 (the bare `L-2` at `:243` qualified) + D-9/D-10. **KF-W6** — R3-1 + DH-4 + D-P3-2 (**SPF-10** booked with its mechanism — the `shape="cell"` erosion row — in the glass-conformance surface its record names) + D-P3-3 (**L-EST-12** restored to the ID-ALIASES trail beside its two siblings) + D-P3-4 (CubeTarget **#8/#9** dispositioned, not adjectival) + D-P3-5 (the census figure restated on a reproducible basis — 421 collapsed / 473 strict pairs, the 392 struck — per LAW B, citing the PASS-3 check). **KF-W7** — R3-10.3 + R3-8.3 + DH-2/DH-3 declarations + D5 (the census of record restated on the re-derivable basis: **138** by the stated rule, or the 150 rule stated so it reproduces — per LAW B) + D2 (G5's witness re-derived at the frontier or struck) + D7 (the taxonomy-reconciliation receipt made to return what it claims) + D8 (`PR-CAUTION` restated as paraphrase or quoted verbatim) + D9 (the G10 placeholder resolved) + (c)(4). **KF-W8** — R3-6 + R3-8.1 + (c)(2) + (d)(4) + D-2 (G13 leg (i) re-cut: bind the subordination receipt to **W5 D-6's twelve / G-STRUCT by gate id**; the 11/8/3 struck; if a by-name enumeration is kept it cites `lane-library.md §7.3`'s sixteen at **9 live / 7 gone** with `1412ed8e`'s six renames attributed) + D-4 (AUDITED = the commanded **12**) + D-5 (G7 leg (iii) re-cut to implement the predicate — an import-grep, not a bare text grep, with the CSS-comment false positive named) + D-6 (G15's command scoped so its green is reachable under its own pad allowance — the pad's `id`/comment lines carved by coordinate, the born count stated) + D-11 (the L-18 blanket scoped to 13/15 with the two declared exceptions) + D-9/D-12/D-13. **KF-W9** — R3-7 + R3-9 + R3-10.4 + D3-4 (the re-derivation receipt block gains the library-reference family; the universal scoped per LAW B) + D3-5 (the cross-edge set enumerated at S-10; the count restated at its enumeration or struck) + D3-6 (the residue command amended to `##` **or `###`**, the kf-ChannelOptions h3 member named) + (c)(3) + D3-8 (the two paths written in full). **KF-W10** — R3-10.5 + the inbound table + D-9 (mechanism D declared) + D-1 (§B-8's verb re-cut to **RULED** — the sentence is now program law as **LAW A** of this file; evidence = `RULINGS-3.md` by path — no phantom W4 fold) + D-2 (§B-3's evidence re-homed: the dock-contract re-verify ids (CH2-02 ×4: BG-5 · GU-1 · GU-2 · subject-legible) ride W9's new capture-receipt §Bounds row (R3-10.4) and W6's TransportDock bounds rows, both sibling corrections declared from W10's row) + D-3 (the seven verbless rows each get exactly one verb from the alphabet; row 14's *"DISCHARGED BY CONSTRUCTION"* enters the alphabet by declaration or is re-verbed; D-8's third lawful shape **ENUMERATED-NOT-MINTED** added with the 11-of-13 denominator) + D-5 (G-6's live-blocker corrected — I-28/I-29 are **ROWED** at `INBOX.md:96-97`; the gate's real RED restated: no terminal verbs, D-GAP-6 and O-8 unclosed) + D-6 (the five glass-producer rows re-routed to the **successor** batch by name — O-20 departed 2026-08-28 carrying zero aurora cargo; §4a's register re-opened for the next batch is the vehicle) + D-7 (three load-bearing orderings) + D-10 (`DISSENT-4` → a declared positional key).

---

## §END · PER-WAVE DIRECTIVE MAP (what each round-3 repair seat executes, verbatim, from the rulings above)

| seat | n | directives |
|---|--:|---|
| **KF-W0** | 6 | R3-10.1 (the mint edge answered in the edge table) · R3-11(f) D-1 (two repo-qualified letters) · D-2 (C-17.R: row 13 named · KAD-12 adopted · LP-8 ≡ KF-CO-35 re-keyed · F1(c) retired) · D-5 (sweep re-run; C-1.G from the 44-record set — lands E-1/E-2) + R3-11(a)2-4 (countable-cell · useAmigaDemo datum · D-15 guard) · D-3 (30 + 2) · E-3 + E-5 + D-6 |
| **KF-W1** | 4 | R3-2 (truthful tree + thesis restated + tree-identity gates re-keyed + anchor-duality addendum + the LAW-B lock into C-6) · (c)(1) (cross-edges 2/11; §11 row 7 per LAW B) · D3-5 (six rows / five records) · tail D3-7/D3-8/D3-9/D3-10/D3-11 |
| **KF-W2** | 7 | D-1 (read-not-token basis; the 8 escapes booked) · the positive register completed (S-5/C-S5 · SUP-D) · D-3 (frozen-parse-boundary into G-W2-6) · D-15 (C-2's kill qualifier) · D-5 (BH-relay negative STRUCK) · D-8 (RC-P(V) predicate) · D-9..D-12 |
| **KF-W3** | 3 | D-1 (membership law self-consistent; routedTotal auditable) · R3-10.2 (KF-HA-19 booked) · D-3/D-4/D-5/D-6 |
| **KF-W4** | 7 | R3-4 (row 78 + cure-lock + SUBJECT-IDENTITY sweep incl. D-5/D-8/D-9/D-6) · R3-5 (five ids booked; merged group whole; partition retired) · D-3 (nine files; row 67 → eight) · D-4 (40/47, balance seven) · D-7 + D-10 (figures per command) · D-11 (no-silent-deletion reaches check:lib/lint/test:*) + D-12 (the O-21 amendment cited by id) · R3-8.2 + DH-2 reciprocal |
| **KF-W5** | 4 | R3-3 (G-XSS re-cut, exact witness text) · (d)(3) (G-PRM-FLIP re-anchored; the `:3` denominators probed or struck) · D-4 + D-5 + D-6 + D-7 + D-8 · D-9/D-10 + DH-3 naming |
| **KF-W6** | 4 | R3-1 (LAW-A census; delete+repoint atomic; CARRY addendum; G-W6-3 falsifier) · DH-4 (one posture) · D-P3-2 + D-P3-3 + D-P3-4 (SPF-10 · L-EST-12 · #8/#9) · D-P3-5 (census basis per LAW B) |
| **KF-W7** | 4 | R3-10.3 (→ KF.W10 edge + the DISCHARGED receipt form) · R3-8.3 + DH-2/DH-3 (cost model; vitest.config.ts posture; four-party naming) · D5 (census of record re-derivable per LAW B) · D2 + D7 + D8 + D9 + (c)(4) |
| **KF-W8** | 5 | R3-6 (G8 two sites; EditorStartScreen booked act) · R3-8.1 (G10 dependency-cite; G11/G12 re-gated; carve → +@vue/test-utils) · D-2 (G13 leg (i) re-cut by gate id) · (d)(4) (G9 → origin/master ls-tree) · D-4 + D-5 + D-6 + D-11 + (c)(2) + D-9/D-12/D-13 |
| **KF-W9** | 4 | R3-7 (play-lifecycle five sites; SUBSTRATE-INVERSION restated) · R3-9 (truthful witness; the spring-lane precedent named) · R3-10.4 (OD-V3/OD-V5: cross-edge + 1280 arm + four scenes + two homes + bounds receipt row) · D3-4 + D3-5 + D3-6 + (c)(3) + D3-8 |
| **KF-W10** | 5 | R3-10.5 (the three triggers verbatim) + the INBOUND-DEPENDENCY table + D-9 (mechanism D) · D-1 (§B-8 → RULED, evidence = this file) · D-2 (§B-3 re-homed via W9's receipt row + W6's dock bounds) · D-3 + D-8 (verbs lawful; ENUMERATED-NOT-MINTED added) · D-5 + D-6 + D-7 + D-10 |
| **RE-ANCHOR seat** | 1 | R2-7 re-run: LAST writer under `waves/`, over every touched file; its close certification written per LAW B and audited by the pass-4 union seat as its first act |

**Frontier of record for every keyframes-side re-measurement: `origin/master 81a56990736ced5b5edde0b84c527680ac7689b1`.** Local `8281638c` remains DISQUALIFIED (a named historical measurement context only — R3-2 governs its sole lawful citation form). Value-side re-measurements bind to the current tree bytes at the executing seat's clock.

*Cross-wave rulings seat, repair round 3. Sole write = this file. Nothing here stamps any wave; E-3 holds — registry corrections land as addenda under original ids; spec repairs execute at the per-wave seats; the PASS-1/PASS-2/PASS-3 check files are never edited. Every frontier fact cited in a case ruling above was re-derived by this seat at `81a56990` before it was written (LAW A / R2-5), and the census receipts are pasted where the cures land.*
