# T — FINAL: the colocation + taste-consummation tranche closes (CLOSED 2026-07-13)

**Tranche**: T (the colocation grand restructure · the boot overture · the material ladder ·
the picker recomposition · motion liquid · surfaces & shell · the terminal owner certification ·
the Q14 perf-redemption close gate)
**Branch**: `tranche-t` (single writer for the design/close waves) · **Close authored**: 2026-07-12
**Charter**: `T.md` · **Board**: `PROGRESS.md` · **Mandate**: `MANDATE-2026-07-06.md §0` + addenda
§0.1–§0.8 (VERBATIM LAW; wins over every encoding) · **Ratified spec**: `audit/SYNTHESIS.md`
(as-amended pass-2 `2a38c11`; hardening pass `audit/hardening/VERDICT.md`, SOUND-WITH-AMENDMENTS,
all 34 MUSTFIX folded) read UNDER `audit/RATIFICATION-2026-07-09.md` (whose §0 verbatim owner text
wins over the corpus, the S precedent)
**Close verification acts**: `audit/w9-close/sweeps.log` (the static close gates, deterministic) ·
`audit/w9-close/book-reverify.md` (every `T.md §7` book re-probed live, NON-authoring lane) ·
`audit/pi/w9/q14-close-escalation.md` (the Q14 PERF REDEMPTION close-run measurement + the ruled
escalation) · `audit/T-MARK-2026-07-12.md` (the done-state census the successor folds forward)

**Tranche verdict: `complete_with_misses`.** The tranche's own gates hold against the live tree;
every miss below is named, none silently reconciled. The naming law binds throughout: gates-pass-
goal-unmet closes `complete_with_misses`, never `complete` (PP-16). The one goal the tranche
cannot meet inside its own window — the Q14 LCP/TBT budgets — closes by the RULED escalation
(§3), not by a re-baseline, a preset-swap, or a deferral (all three forbidden by the Q14 mandate).

> **THE CEREMONY FIRED 2026-07-13** on the owner's verbatim execution order
> (`docs/tranches/U/audit/RATIFICATION-2026-07-13.md`, coupled with the tranche-U ratification —
> T closed and U opened as ONE decision, exactly as reserved): the merge landed (`--no-ff`
> `tranche-t` → `master` **`6e14e90`**; the one conflict, `.github/workflows/ci.yml`, resolved to
> the tranche-t side — T.W0 adopted then superseded master's peel; merged tree byte-identical to
> `tranche-t` @ `bf564c7`), the annotated **`tranche-t-close`** tag is pushed, and the 12
> pre-ceremony lane worktrees are SWEPT (`audit/w9-close/ceremony-sweep.md` — every lane branch
> proven 0-unmerged-patches via `git cherry` before removal). The Q14 escalation (§3) is
> ACKNOWLEDGED-BY-EXECUTION-ORDER (the RATIFICATION §1.2 encoding); **the HG6 taste verdict
> REMAINS the owner's — PENDING, never proxied** (§8.3; U.W-VISUAL's wave-open census is the live
> instrument meanwhile). The deploy-lineage (O-25) + merged-tree e2e legs fired at the ceremony;
> their records amend `audit/w9-close/` at completion. The three terminals as originally reserved
> (historical, pre-ceremony text):
>
> 1. **The master merge (`--no-ff` `tranche-t` → `master`) + the annotated `tranche-t-close`
>    tag + the worktree cleanup** — the OWNER fires these, COUPLED with the tranche-U
>    ratification (T closes and U opens as ONE owner decision point). The FINAL.md close-READY
>    state is produced; the git ceremony is not performed. The 12 lane worktrees live at
>    authoring (`git worktree list`) are pre-ceremony debris to be swept at the merge (S swept 5
>    seed worktrees the same way).
> 2. **The Q14 PERF REDEMPTION escalation acknowledgement** (§3) — authored here as the RECORD
>    naming the physical blocker (the ruled disposition); the owner's acknowledgement lands at
>    ratification.
> 3. **The T.W8 owner certification verdict** (§1, HG6) — `audit/w8-certification/VERDICT-2026-07-12.md`
>    is the empty stub the owner's verbatim ruling lands into. The package PRESENTS, CERTIFIES
>    NOTHING (the honest delivered-but-unruled terminal — never a proxy sign-off).
>
> Everything else in this document is final. When the owner fires the ceremony, the §1 W9 row +
> this note amend in place (the S precedent) — the deploy-lineage verification (O-25 against the
> Production artifact) + the merge/tag SHAs + the swept-worktree capture land at that event.

---

## §1 — Per-wave verdicts (goal-vs-landed reconciled; misses named)

| Wave | Verdict | Gate evidence | Goal-vs-landed reconciliation | Misses → successor |
|---|---|---|---|---|
| **T.W0** substrate · oracle floor · packet dispatch · the §2 CI/deploy rider | **complete** (2026-07-10) | 11-row §Hard gate → **11/11 PASS**, zero FAIL/MISS. W0-1 GLASSUI-T-ASKS dispatch `6c8c88a` · W0-2 `proof:*` → `test:dist` (Q13 retain-5/excise-7) `8bbf069` · W0-3 legacy-grep-zero (16 files deleted) `9599319` · W0-4 doc-truth `18bf9f8`/`8345ea9` · W0-5 born-RED oracle floor `120970f` · W0-6 smoke-safari + O-25 + `--ring` `55f2991` · **W0-CI diet ~32.4→16.4 min** (`29070205121`) · **W0-X1/X2 LANDED** `bdfb4a5` (§4) · Q14 PI-1 baseline opened (`28836873580`, LCP 5563 / TBT 5618, honestly RED) `f8ed939`. Artefacts `audit/w0-close-artefacts.md` | Goal met + the only zero-miss close: the substrate stood, X1/X2 executed off the maintainer-book track, the oracle floor born-RED-by-design, the perf baseline honestly red into the PI-1 ledger | none open |
| **T.W1** the colocation grand restructure (E-1) | **complete_with_misses** (2026-07-10) | 11-row §Hard gate → **10 PASS + 1 FAIL**. E-1 landed WHOLE across 3 single-writer trees: src `f8e7eed` · api `dfa46c4` (TA-4 excised, `atomDiff` gone) · demo `77d21fc`; MOVE-MAP-first `eaad670`. dts additive-only 476→479 (0 removed); PR-7 keyframe census 19/19; zero shims / zero `export *`. Suites: vitest 2171/69 · playwright 61/3-skip · api 205/35 · tsc 0. Artefacts `audit/w1-close-artefacts.md` | Goal met: the whole tree is colocated, new design code is born colocated. The §Recovery cure caught a `.gitignore _*` swallowing 27 colocated `__tests__/` (`cf65472`) | **The ONE FAIL = row 6 / MOB-1**: `data-layout` witness unstamped + `style.css` aspect-law exception live → deferred to Fable with a named ratified-vs-ratified conflict (`App.vue:50-51`, D8-1). MOB-2 landed |
| **T.W2** the boot overture + the living field | **complete** (2026-07-10, round-2 gate `e1151de`) | 11-row §Hard gate → **9 PASS + 2 MISS-RECORDED**, zero FAIL. Overture landed WHOLE: W2-1 hydration-before-derivation `ed24358` (O-1/O-2 flips) · W2-2 gradient ground `f354f42` · W2-3 THE OVERTURE, O-24 reveal-only LCP law (light 2484→2128ms) `e02fa61` · W2-4 emerge beat `400fe15` · W2-5 T-26 Q2-NOW calibration `244459e`. Close cured 4 real classes (5b PRM `1f5b4b4` · PP-8 re-breach `a25c4d2` · one-shot release law `eb6d9a6` · WebKit veil-forever `d5b3e4d`). Q14 gate-8 MEASURED. Artefacts `audit/w2-close-artefacts.md` + `audit/pi/w2/w2-close-artefacts.md` | Goal met on the demo halves; `complete` on its own gate | The 2 MISS = the sanctioned headed-GPU / gitignored-archival env class (owner eye-frames · O-3 real-GPU — committed records + re-runnable harness `pi/w2/w2-annex.mjs`, non-downgrading). O-5 spike + O-26 headless honestly RED → W7/W9 |
| **T.W3** the material ladder · neutrals · ink | **complete_with_misses** (2026-07-10, round-2 gate) | 7-row §Hard gate → **7 PASS**, zero FAIL. Core `d99303f`; W3-2 ShadowPalette `9b7fbd2` · W3-3 search seat `e4dd2ee` · W3-5 ink-on-tier D6 `ba0706e`. C3 LAW + 9-row exception ledger in DESIGN.md. Census green: O-7 · O-9 · O-11 · O-18 (10/10). CSS 87.1 KiB gz ≤ 120. Artefacts `audit/w3-close-artefacts.md` + `w3-core-lane-record.md` + `w3-ink-lane-record.md` | Goal met: the four-rung ladder is the law; color = data only, chrome/material/type neutral (C3, Q18) | `_with_misses` = round-2 gate STRICTER than the lane self-close: (a) full 6-project suite not locally re-driven (the 4 census mints verified directly; full green on lane records + CI e2e-smoke `29131814948`); (b) O-11 gate-4 CDP layout flake (green solo ×3, self-healed retries=2). The ink lane's StructuredOutput `null` crash was a scope-overflow — its committed 4-commit work integrated green |
| **T.W4** the picker recomposition (the C1 knot, forced order) | **complete_with_misses** (2026-07-10, round-3 gate `388c4a9`) | 9-row §Hard gate → **8 PASS + 1 MISS-RECORDED**, zero FAIL. Forced order: W4-1 `b16eb07` → W4-2a `529bbbc` → W4-2b `79787ef` → W4-5 `dfd76b1` → W4-4+3 `f991554` → W4-7 `3c79556` → cap-cure `be155e1` (merge `26a08ce`); W4-6 `388c4a9`. **PI-4 same-commit LAW verified in git** (`dfd76b1` = seat formula + mobile gate + o12 mint + fixture together). Oracle re-runs at lane ports: o10-type-locks 12/12 · o10d 6/6 · o11 22/22 · o18 22/22 · o12-blob-seat 3/3 · blob-390 1/1. CSS 86.75 KiB gz. Artefacts `audit/w4-close-artefacts.md` + `w4-knot-lane-record.md` | Goal met: the picker knot landed whole in the forced order, the ×φ type re-cut + four-state ink grammar + flush blob seat live | The MISS = row 9, the PI-1 Lighthouse W4 delta row absent (later filed at W4.5 C-6 `4e5165b`) — **W4 is NOT a named Q14 gate** (only W2/W7/W9), so the deferral does not RED the wave |
| **T.W4.5** the mid-tranche checkpoint (Q6 "both.", cascade 1) | **complete_with_misses** (2026-07-11) | 4-row §Hard gate → **4/4 PASS**. 3 passes filed at close head `06b793c` (A boot · B ladder-neutrals-ink · C picker-seams). **17 filed rows → 17 dispositioned, zero silent drops**: 5 LAND-NOW (R1/R6 `baed206` · R2 `af18e07` · C-1 `5b79cb7` · C-6 `4e5165b`) · 7→W8 · 3→W6 · 2→producer. The owner delta-report DELIVERED (non-authoring assembler `8bdec9f`, informational, 9 brackets flagged, **NO certification package**). Artefacts `audit/w45-checkpoint/` | Goal met: the LIGHT critique caught drift a wave earlier (Q6's "both." two-stage), T-30/T-31/T-32 re-judged against the landed round-2+W4 state | `_with_misses` = the ONE env-class caveat (full 6-project run un-observed to completion; oracle subsets independently re-driven green). PI-1 mid-read LCP 5141 / TBT 5988, honestly RED |
| **T.W5** motion liquid (T-14; PI-5 split) | **complete_with_misses** (2026-07-11, round-4 gate) | 8-row §Hard gate → **7 PASS + 1 MISS-RECORDED**, zero FAIL. Liquid-easing family at per-spring clocks (R2–R5/R8/R10/R11); O-16 computed-cascade census GREEN both schemes; exit-law leave < enter; KEEP-set + Tranche-B zero-hunk proofs. CSS 88.00 KiB gz. vitest 2222/2222. Artefacts `audit/w5-close-artefacts.md` | Goal met: card transitions onto the liquid-glass curves | `_with_misses` = row 8 e2e all-project (132 passed / 3 failed; the 3 reds ALL forensically non-W5, non-product — a reka-ui Select detach flake + 2 stale gradient specs vs the owner-ORDERED W6 surfaces, since cured `24802b0`). R1 EXPECTED-RED carried with the PKT-1 cite, never weakened. T-48 residual → W8 |
| **T.W6** surfaces & shell + the T-31 dock-atop law | **complete_with_misses** (2026-07-11, gate #4 close-flip `5b64236`) | 11 rows → **11/11 PASS**, zero FAIL. 4 lanes: G `6bd778c` (+ tail `40f79a6`/`921a325`/`ee7b1dc`/`24802b0`) · D `b4711d8`+`6c14e33` (status-lamp `e4ddd32`/`c237d24`, T-31 two-band grid `d8f1fb1`) · E `5a66dd6` · N `d4e0032`. Named oracle legs GREEN: O-13/O-14/O-15a-b/O-17/O-19/O-20/O-21/O-22 + T-31 8/8 + MOB-1 discharged `a92f501`. **Row 9 flipped MISS→PASS** by deterministic runs at `5b64236` (lint 0 · typecheck 0 · vitest 2222/2222 · playwright ALL 6 = 146 passed / 2 skip / exit 0). Artefacts `audit/w6-close-artefacts.md §7` | Goal met: the shell, the dropdowns, the gradient plate, the Q5 letterform ramp ×2 sites (chip DEAD for T-10), the dock-atop STRUCTURAL law | `_with_misses` = the 3 standing born-RED producer legs (`test.fail()`, never weakened): O-16-R1 (PKT-1→W7) · O-5 (RP-2→W7) · O-26 (aurora headless→W9). NB: the artefact §1/§2 preserve the earlier BLOCKED gate-run narrative (banner flipped at §7) — honest historical record |
| **T.W6.5** the owner-audit remediation wave (§0.6, T-33..T-48) | **complete_with_misses** (2026-07-11) | 8-row §Hard gate → **7 PASS + 1 MISS-RECORDED**, zero FAIL. 4 lanes + Row E: S ShadowPalette R12 redesign `0ad772f` · P console veil re-seat + dynamic-max clamp `ad301e7` · I ink delineation (certifyAccentInk cusp cure, O-18 +IDENTITY/+GRAPHICS) `c2a911f` · M root-barrel ×10 + B2/B4 split + T-45 pseudo `7d3900a` · E kf `<EasingPicker>` seat `1a8f06c`. **HG7 GENUINE FAIL cured at close** the idiomatic §0.6 way: two cohesion-honest lifts (`ink.ts`→`ink-walk.ts` 423→292 · `useColorPipeline.ts`→`useAtmosphereFrameCoalesce.ts` 403→373; `69500b7`, behaviour-preserving); PI-1 W6.5 row filed → HG7 flips PASS. vitest 2233/2233. Close head `5e4f1f6`. Artefacts `audit/w65-close-artefacts.md` | Goal met: 16/16 T-33..T-48 rows dispositioned, zero silent drops | `_with_misses` = **HG5** (the "scroll-timeline chunk absent from eager" leg — a research §4.2 chunk-NAME misattribution; the real dead weight is library-side `src/subpaths/parsing.ts` → routed to **W7 dead-payload BY NAME**) + the standing born-RED legs |
| **T.W7** the adopt event (= S.W8 handed intact; the Q14 TBT/JS-eager delta gate row) | **TRIGGER-NOT-FIRED** — recorded as-is (PP-5: books never gates) | Re-probed 2026-07-12 at the T.W8 close: `git -C ../glass-ui tag --list 'v5*'` = EMPTY · `npm view @mkbabb/glass-ui version` = **4.2.0**. glass-ui pkg **5.0.0 in-tree** (HEAD `690fef91`, `tranche/BI`, BI GREENLIGHT 2026-07-12) but the cut is **USER-GATED + untagged** — no v5 tag, no registry v5 | **Not a miss**: a trigger-gated wave whose trigger did not fire inside T's window. The wave doc + the §3.10 MIGRATION walk hand to the successor intact. The cut is **imminent** (very likely to fire early in U's life) | The adopt-event class → §5 (HAND TO U): CI un-pin · L17 rename · L20 subpath · GAP-ARM/L2/L5 re-verify · the L2..L16 asks · the whole §7.2 producer-consume swap set · the HG5-routed `/parsing` dead-payload split |
| **T.W8** E-7 the hardening/critique wave (the terminal owner certification package) | **complete_with_misses** (2026-07-12; **HG6 owner verdict PENDING — the honest terminal**) | 6-row §Hard gate → **5 PASS + 1 MISS-RECORDED**, zero FAIL. 6 remediation lanes landed + merged (`83d8714`→`6d95871`; 29 LAND rows [§7.2 enumeration; the pre-P9 scalar read 24] + 9/11 §0.7 WR rows); 11 critique-pass journals filed (`passes/`); the package ASSEMBLED by the **non-authoring terminal-assembler** (`286619e`, docs-only) — 20 taste brackets B-01..B-20 (each pole a named reproducible state) + 2 flagged non-rows + boot screencast (1543 frames) + T-48 motion captures (8 hops) + the honest-red ledger + the owner-line index + the Q14 material. HG3: full 6-project e2e **160 passed / 2 skipped / exit 0** on lane ports 8790/8791 (owner's :9000 untouched; exactly the 3 born-RED legs reproduce). Artefacts `audit/w8-close-artefacts.md` + `audit/w8-certification/{PACKAGE,ROWS,VERDICT-2026-07-12,PROGRESS}.md` + `passes/*` (11) | Goal met to the package: the tranche's taste record is delivered, certified by no proxy | **HG5 MISS-RECORDED** (PP-8 caps breach — two W8-remediation-grown demo files over ≤400: `useAtmosphere.ts` 344→411 `c116250` [P9-R3/T-37 derive-seam] · `Markdown.vue` 396→408 `433ae22` [AB-1 KaTeX]; ZERO at baseline `5e4f1f6`; comment-heavy raw-LoC, not complexity — booked a **W9-handed re-encapsulation row**, splitting demo/ is a remediation act not a gate act). **HG6: THE OWNER'S VERDICT IS THE GATE — PENDING** (the empty stub; delivered-but-unruled, never a proxy sign-off) → §8 |
| **T.W9** close (the Q14 PERF REDEMPTION close gate) | **`complete_with_misses` — MERGED 2026-07-13** (master `6e14e90`, tag `tranche-t-close`; CLOSE-READY authored 2026-07-12) | Composite §Hard gate: the finding→item ledger walked WHOLE with evidence cites (§2, zero drops) · every `T.md §7` book re-probed live (`audit/w9-close/book-reverify.md`) · repo-wide sweeps re-run (§6) · **the Q14 close gate resolved to the RULED ESCALATION** (§3) · FINAL.md authored. Static close gates ALL GREEN (`audit/w9-close/sweeps.log`, HEAD `28f30ed`): lint 0 · typecheck (lib+demo) 0 · api tsc --noEmit 0 · vitest **74 files / 2241 / 2241 passed / 0 failed** · `npm run build` clean (dist/value.js 14.91 kB gz 5.89 kB, 1.65s) · `npm run gh-pages` clean (3.96s) | Goal met: the tranche's gates are proven to hold against the live tree (a verification act, not paperwork). The master merge + tag + deploy-lineage verification are the OWNER's ceremony (§8) — the close-READY state is produced, the git ops are not performed | **The Q14 escalation** (§3, budgets HONESTLY RED, redemption INHERITS to U's `U.W-PERF`) · **the e2e leg CERTIFIED** on the quiet machine (159 passed / 2 skip / 1 proven-flake O-7 — isolated re-pass 4/4 green; the 3 born-RED `test.fail()` legs the only named reds; matches W6 146/2-skip + W8 160/2-skip; `audit/w9-close/e2e-certification.md`) · the W8 HG5 re-encapsulation row → U · the owner-gated terminals (§8) |

**Wave-verdict honesty summary.** Two waves `complete` on their own gate (W0 zero-miss outright;
W2 `complete` with 2 non-downgrading env-class MISS). Eight waves closed `complete_with_misses` —
each miss named per row (W1 MOB-1 FAIL routed; W3 un-re-driven suite + CDP flake; W4 the
deferred-not-a-gate PI-1 row; W4.5 the un-observed suite; W5 the 3 non-W5 e2e reds; W6 the 3
standing born-RED producer legs; W6.5 the HG5 library-side dead-payload; W8 the HG5 caps breach
+ the HG6 pending owner verdict; W9 the Q14 escalation — the e2e leg since CERTIFIED on the quiet
machine, one proven O-7 flake). W7 is TRIGGER-NOT-FIRED (not a miss — PP-5). No green-over-broken was found; the born-RED legs are
carried by `test.fail()`, never weakened.

---

## §2 — The finding→item zero-drop ledger, reconciled (the completion criterion)

**The completion criterion is zero silent drops.** Every owner finding, every load-bearing fleet
find, and every deferred-fold row reconciles to exactly one of: **LANDED at root** (with the
evidence commit) · **BOOKED to tranche U by name** (with the owning U wave) · **PRODUCER-GATED**
(with the letter/communiqué cite) · **KILLED with rationale**. The enumeration is auditable:

**Enumeration method.** (1) The owner findings **T-1..T-61** are enumerated directly from
`MANDATE-2026-07-06.md §0` (T-1..T-29) + §0.5 (T-30..T-32) + §0.6 (T-33..T-48) + §0.7 (T-49..T-60)
+ §0.8 (T-61) — every integer in `[1,61]` appears exactly once in the census of record,
`audit/T-MARK-2026-07-12.md §2` (the per-finding state table this close certifies rather than
duplicates). (2) The **load-bearing fleet finds** beyond T-# are enumerated from `SYNTHESIS §1.2`
(MOB-1/MOB-2 · CC-1 · A11Y-F1..F4 · LEG-1..9 · PI-1..6 · DOC-1..13). (3) The **E-4 deferred-fold
table** (`SYNTHESIS §7`) — every S book + census row → its T home — is walked row-by-row. (4) The
**E-5 recap** — every `MANDATE §0/§0.1–§0.8` verbatim line addressed-or-booked — rides the W8
package's owner-line index (`audit/w8-certification/PACKAGE.md §3`, each owner line mapped to the
bracket/row that answers it). (5) The **E-1..E-7 edicts** each carry an inherited-status line
below. The successor's own zero-drop instrument is `docs/tranches/U/DISPOSITION-LEDGER.md` (77
U-Fxx families + the chronic set + the T-1..T-61 prompt-recap + the retired WINS) — every U-handed
row below resolves there.

### §2.1 — The owner findings T-1..T-61 (census pointer + the routing classes)

The complete per-finding state table is `audit/T-MARK-2026-07-12.md §2` (T-1..T-60) + `MANDATE §0.8`
(T-61); this close certifies its routing without re-transcribing 61 rows. The class distribution,
each row named at its cite in the T-MARK census:

- **LANDED at root (demo/src/api, discharged in T's waves)**: T-2 (W4-1 ×φ `b16eb07`/`f991554`) ·
  T-3/T-11/T-18/T-24 (W3-1 material + C3 law) · T-4 (W4.5 C-1 α-meter `5b79cb7`) · T-6 (W6 Lane-G
  tail `40f79a6` + O-19) · T-7 (W4-2 + W6.5 Lane-P `ad301e7`) · T-9 (W6-6 lamp `e4ddd32`/`c237d24`)
  · T-10/T-43 (W6-4 Q5 ramp ×2 sites, chip DEAD `5833474`) · T-12 (W3-3 `.search-seated` `e4dd2ee`)
  · T-13/T-19/T-41 (ShadowPalette W3-2 + W6.5 Lane-S R12 `0ad772f`) · T-14 (W5 motion liquid) ·
  T-15 (W4-6 display-voice census) · T-16 (W6-5 Generate re-seat `5571f2b`) · T-17 (W6 PreviewStrip
  O-14 `3372749`) · T-21 (W6-2 envelope plate/rail `5edd903`) · T-22/T-47 (W6-3 `a540dde` + W6.5
  Row E `1a8f06c`) · T-23 (W3-4 feather rest-floor) · T-28 (W4 R9 abrogate) · T-29 (W6-8 clip
  release `c237d24`) · T-30 (W4.5 R2 blur cure `af18e07` + W4-5 containment) · T-31 (W6 two-band
  grid `d8f1fb1`) · T-32 (W2-5 demo half `73762b2`) · T-33 (W6.5 Lane-P) · T-34 (W6.5 Lane-P) ·
  T-35 (W6.5 Lane-I `c2a911f`) · T-36 (W6-8 `c237d24`) · T-37 (W6-7 `3408433`) · T-40 (W6.5 weight
  pin) · T-45 (W6.5 Lane-M pseudo cap `7d3900a`, demo half) · T-46 (W6-2 `5edd903`+`ee7b1dc`).
- **LANDED-partial + a residual booked/producer-gated**: T-1 (demo hydration W2-1 `ed24358`;
  producer half GAP-ARM PRODUCER-GATED) · T-5 (W4-4 landed; ACTIVE seat P1-R1 → U; P5 letter-rail
  PRODUCER-GATED) · T-8 (seat/containment W4-5 `dfd76b1`; satellites-never-meatball → W8 WR-2 + GAP-L5
  PRODUCER-GATED) · T-25/T-26/T-27 (boot cures W2; aurora quality → GAP-L2/GAP-ARM/T-60 PRODUCER-GATED).
- **OPEN → BOOKED to U (the T.W8 remediation cures LANDED-but-OWNER-UNCERTIFIED; the still-reds
  inherit)**: T-42 (+ **T-61 §0.8** rules the whole-header-contraction direction; B-01) · T-48/T-58
  (motion MANDATE, WR-10; scheduling-not-easing) · T-49 (WR-1/WR-2 blob emerge/fission) · T-50 (WR-3
  veil) · T-51 (WR-4 title step-down) · T-53 (WR-5 dark caster) · T-54 (WR-6 WatercolorDot swap) ·
  T-55 (WR-7 verb-cluster) · T-56 (WR-8 palettes-ramp resolver, the **A-class resolver defect
  CONFIRMED** — the ramp walks to a 0.02 near-black clamp, monochrome in light / 1.24:1 in dark) ·
  T-57 (WR-9 `--dock-h` floor; +3.0px reflow measured) · T-59 (WR-11 rhythm regime) · T-39
  (Q14-pressure, the perf face → §3). **The terminal W8 state (this doc's own T.W8 §1 row +
  `audit/w8-certification/ROWS.md §4`): the 29 LAND rows (the `ROWS.md §4` enumeration + §1 pass tables
  count 29; its summary scalar reads "24" — the stale pre-P9 tally, un-bumped when the last-filed
  dock-nav-menus pass `95d806d` added P9-R1..R5) + 9/11 §0.7 WR cures LANDED + merged
  (WR-1..WR-6, WR-8, WR-9, WR-11; `83d8714`→`6d95871`), but the HG6 OWNER VERDICT is PENDING (the
  empty stub, never a proxy sign-off); WR-7 is a bracket-to-owner, WR-10 is W7/W9-by-law (its
  wake-gray compound half landed); T-42/T-61 B-01 is a taste bracket, un-landed.** They inherit to U
  NOT as an un-landed Remediate phase but as **owner-uncertified still-reds** — re-judged LIVE at
  U.W-VISUAL's W8-inheritance census (CENSUS-GREEN retire / CENSUS-RED re-cure) + T-39 → U.W-PERF
  (per `U/DISPOSITION-LEDGER.md`).
- **PRODUCER-GATED (glass-ui, the consolidated communiqué `f3f3c097`, BI inbox HEAD `24a7a764`)**:
  T-20 (P4 tabs pilling, DECLINE→escalate owner) · T-38 (aurora pointer relay) · T-52 (dock
  inline-edge clip, PRODUCER-FORENSIC ANSWERED) · T-60 (aurora gray-stage = glass-ui
  BG.W-VIZ-REVEAL-BLOOM one-shot, FORENSICALLY PINNED `71ae027`, demo EXONERATED, JOINS glass-ui's
  own UF-E10) + the producer halves of T-1/T-8/T-25/T-26/T-45.

**Zero drops in the T-1..T-61 set**: every finding is LANDED, or booked to U by name, or
producer-gated with a communiqué cite. No finding is silently reconciled; no LANDED finding that a
later owner audit re-bracketed (T-2→T-51, T-8→WR-2, T-14→T-48→T-58, T-31→T-57, T-34→T-50) hides
its re-open — both the landing and the re-open are shown in the T-MARK census.

### §2.2 — The load-bearing fleet finds (SYNTHESIS §1.2)

| Find | Disposition |
|---|---|
| **MOB-1** (P0) | **BOOKED to Fable** — the sole W1 FAIL; `data-layout` witness unstamped + `style.css` aspect-law exception, a ratified-vs-ratified D8-1 conflict (`App.vue:50-51`) → U (the demo/adopt lane) |
| **MOB-2** (P1) | **LANDED** W1-demo (route-derived pane choice) |
| **CC-1** `.glass-wash` zero-fill | PRODUCER-GATED (packet P8) + the W3 consume note; the two demo sites paint their rung post-fix |
| **A11Y-F1..F4** ink-on-tier | **LANDED** W3-5 (the certified referent + O-18 population census 10/10) |
| **LEG-1..9** (proof:* carry, orphans, `globals` devDep, stale comments) | **LANDED** W0 (legacy-grep-zero, 16 files deleted `9599319`) + W1 moves |
| **PI-1..6** (the perf riders) | **LANDED** at their waves (O-24 reveal-only W2 · O-12 seat + PI-4 same-commit W4 · O-23 coloc bundle-diff W1); **PI-1** the Q14 tracking ledger CLOSED OUT at W9 (§3) |
| **DOC-1..13** doc-truth | **LANDED-partial**: W0-4 the pre-E-1-safe set; the demo/api CLAUDE.md + root Structure rewrites are the W9 doc-rewrite lane's deliverable (item 8) — see §7 residuals |

### §2.3 — The E-4 deferred-fold table (SYNTHESIS §7) + the E-1..E-7 edicts

Every S book + census row reached its T home; the live-world re-verification is
`audit/w9-close/book-reverify.md` (2026-07-12, NON-authoring). The routing at close:

- **glass-ui 5.0.0 adopt (CHRONIC ~10 tranches) · CI un-pin · L17 rename** → W7, TRIGGER-NOT-FIRED
  → **HAND TO U** (the adopt-event class; §5).
- **GAP-ARM · GAP-L2 · GAP-L5 · PRM-expand · L20+RP-2 · the L2..L16 asks · S-3 letter-rail** →
  producer-gated, ride the unfired W7 → **HAND TO U** (several show in-tree progress toward the
  cure on the 5.0.0-IN-DEV tree, book-reverify §C; the definitive verdict is the adopt-time
  re-verify).
- **X1 · X2** (CHRONIC, 2nd carry) → **RULED-AT-RATIFICATION §2 into W0-EXECUTABLE, EXECUTED at
  W0-X1/W0-X2, re-verified live at close** → RETIRE (§4). Never a silent 3rd re-book.
- **L1 Normalized/Display brand** → W1-src, **CLOSED** — runtime-flag design ratified, the brand
  does NOT land (killed-with-rationale, permanent constraint; `audit/L1-normalized-display-brand-decision.md`).
- **TA-4 `/remix`+`/diff` api-hygiene** → W1-api, **DISCHARGED** (`atomDiff` write-only excised in
  the module move; content-hash diff at `routes/crud.ts:137`).
- **dup-`useDark` · PI-DRIFT-1** → W1-demo, **DISCHARGED** (folded onto the `useGlobalDark`
  singleton; drift 4→0 live sites, the 2 grep hits are past-tense comments).
- **`proof:*` carry (Q13)** → W0-2, **DISCHARGED** (`test:dist` = the 5 retained gates; 7 excised).
- **oracle-floor F3/F4** → W0-5, **DISCHARGED** (the mints landed).
- **`Color.try()` (12→3 wraps) · `usePaletteStore` migration (version 1) · S.H3 Pratt (PT-E no
  reply)** → PARK/DORMANT → **HAND TO U** (dormant, no fired trigger).
- **FN-7 · kf `resolveEasing` · CH-10 · CH-13 · R8-23 · R-5 · R-10** → W9 spec-status recheck (§D
  of book-reverify): **no fired trigger crosses value.js's consume-edge**; 3 drifts recorded
  (`random()` → Safari 26.2 stable but still Safari-only; scroll-timeline → Firefox-behind, not
  Baseline; kf touched its easing surface but the touch is a kf-internal subpath refactor, not a
  value.js-consume decision) — all KEEP-BOOKED → U.
- **The Discharged-in-S set** (srgb decode, ICtCp/Jzazbz, raytrace, vue-router 5, parse-that re-pin,
  K-W3DIFF) → NOT re-folded, recorded for zero-drop (S's record is closed history).

**The E-1..E-7 edicts**: **E-1** colocation → LANDED W1 (whole tree, 3 single-writer trees).
**E-2** producer request-packet series → DISPATCHED W0-1, re-stamped + consolidated at the BI
communiqué `f3f3c097`. **E-3** spec-retirement / no-restore ledger → SYNTHESIS §1.1 (R1–R11);
nothing restored (re-affirmed §7). **E-4** deferred-fold table → §7 above, walked. **E-5** the
mandate-§0 verbatim recap → the W8 owner-line index (`PACKAGE.md §3`), each line addressed-or-booked.
**E-6** batches-of-three (the §Recovery prevention half) → standing. **E-7** the T.W8 late-stage
hardening wave → executed as the terminal certification package.

---

## §3 — The Q14 PERF REDEMPTION disposition: the RULED close gate → the ESCALATION

**The Q14 PERF REDEMPTION close gate (RULED 2026-07-09, `RATIFICATION-2026-07-09.md §1`)**: the
§6.2 LCP/TBT budgets GREEN on the re-measured close run, OR a triumvirate-level owner escalation
naming the physical blocker — **no re-baseline, no preset-swap, no deferral** (the ruling forbids
all three: *"Accept no failures — divine a proper and idiomatic fix. No compromises."*). The full
record is `audit/pi/w9/q14-close-escalation.md`.

**Disposition: the ESCALATION.** Budgets stay HONESTLY RED at close; green is structurally
unreachable inside tranche T. This is the Q14-sanctioned close path — the escalation REPLACES the
old keep-red disposition; it is not a deferral, a re-baseline, or a gate edit.

### The close-run measurement of record

| Measure | Close-build value | Budget | Verdict |
|---|---|---|---|
| **LCP** (dynamic run of record: the W8 CI gh-pages row `6d95871`, apples-to-apples with the W0 baseline instrument) | **5141 ms** median | ≤ 2500 | **RED** — ~2.1× over |
| **TBT** | **5988 ms** median | ≤ 300 | **RED** — ~20× over |
| **CLS** | within budget (view-switch first-frame GREEN; the CLS mount-box reservation landed demo-side) | ≤ 0.1 | not the binding red |
| **JS eager (RP-2)** — entry `index-*.js` 184.9 + glass-ui 108.9 + vueuse 34.9 + lucide 1.6 + runtime/prng (FRESH close build, `npm run gh-pages`, 4.38s, exit 0) | **331.0 KiB gz** | ≤ 280 | **RED** — +51 KiB / ~1.18× over (directionally lower than the S re-baseline 347.9; still over, NOT cleared) |
| render-blocking index CSS | **88.4 KiB gz** | ≤ 120 | **GREEN** (31.6 headroom) |
| vendor-katex (W8 global-import cure) | **LAZY** — not modulepreloaded | — | **GREEN** (deferred off boot) |

**Honest instrument note (recorded, never laundered)**: the in-session local `lighthouse@12`
dynamic re-measure on the compressed :8195 server (mobile ×3 + desktop ×3) **HUNG** — the eager
WebGL blob's continuous RAF render defeats Lighthouse's CPU-quiet / network-quiet window detection
(the page never settles) under the 4× CPU throttle. **This stall IS a manifestation of the very
blocker being escalated**, not an instrument defect to route around; the run was killed, the
server torn down (:8195 clear). The dynamic run of record is the W8 CI gh-pages row (the baseline's
own instrument class). Every richness wave since W2 read the same honest RED floor — **no wave
moved the eager payload, so no wave could move the LCP floor**.

### The physical blocker, named (the escalation's core, for the owner at ratification)

> **Q14 PERF REDEMPTION — close disposition: ESCALATION (budgets HONESTLY RED).** The LCP
> (~5141ms, ~2.1× over) and TBT (~5988ms, ~20× over) budgets are red at close and CANNOT be made
> green inside tranche T. The single physical blocker is the **eager WebGL blob/aurora engine**
> (66 shader-source markers in the 184.9 KiB boot entry) parsing, compiling its shaders, and
> mounting a continuously-animating WebGL2 context **before first paint** — the ~505ms
> blob-engine-mount task (W6.5 Lane-M forensic) that holds FCP≈LCP at ~4.3s and inflates TBT.
> Making that engine lazy requires the **glass-ui 5.0.0 `/blob/config` eager-config/lazy-engine
> split (L20) landing TOGETHER with the goo-blob single-WebGL2 collapse / `settled` seam
> (GAP-L5)** — a **producer cut that is user-gated with no v5 tag** (`051e6957`, npm 4.2.0). The
> **T.W7 adopt trigger is UNFIRED**; the demo has spent every lever it owns (the O-24 reveal-only
> law W2, the Google-Fonts strike W2, KaTeX-lazy W8, the root-barrel sweep W6.5, the CLS
> mount-box reservation W8). Per the ruled amended gate — *"L20 + GAP-L5 land together or the
> re-baseline carries a third tranche"* — **the RP-2 re-baseline (eager JS 331.0 KiB > 280) and
> the LCP/TBT redemption INHERIT to tranche U's `U.W-PERF` wave** (registry §26;
> `U/DISPOSITION-LEDGER.md` U-F3 `q14-perf-redemption-uncloseable`, disp = escalate), cleared at
> the 5.0.0 adopt. No gate is weakened; the escalation is the ruled valid close (PP-16:
> gates-pass-goal-unmet → `complete_with_misses`), acknowledged by the owner at ratification
> (coupled with the tranche-U open).

**PI-1 ledger disposition**: the W9 close row is appended to `audit/pi1-delta-ledger.md` (the
gate's tracking instrument is CLOSED OUT with the final measurement); the W7 gate row stays
`pending` (the payload landings measure at the unfired adopt) → hands to U as-is.

---

## §4 — X1 / X2: the W0-executed outcomes, restated verbatim + re-verified live at close

X1/X2 were **RULED-AT-RATIFICATION §2 (cascade 5) into W0-EXECUTABLE items** (W0-X1/W0-X2), moved
off the maintainer-book track, and **EXECUTED at W0** (`bdfb4a5`; record `audit/w0-xhost-record.md`).
Per `T.W9.md §Scope 6`, this close restates the firing records verbatim and re-probes them live —
a close verifies the deployed lineage, never assumes it (`audit/w9-close/book-reverify.md §A`).

**The W0-executed verdict (verbatim):** *"X1 LANDED · X2 LANDED. api.color.babb.dev restored to
HEAD lineage and left I-era; the value.js deploy webhook repaired end-to-end; the NCSU `/colors/`
alias retired to a 301-redirect to color.babb.dev. All executed on `mbabb.fridayinstitute.net`
(the babb.dev spine host) over the granted SSH access."*

- **X1** — the prod api was CRASH-LOOPING (503) on a MongoDB `IndexOptionsConflict`. Cure: dropped
  the stale `sessions.expiresAt_1` index; redeployed `/srv/constellation/palette-api` **@ `0441aba`**
  via `scripts/deploy-hook.sh`; repointed the `value.js` webhook (dot-URL, HMAC intact) from the
  dead-dir `dispatch.sh` arm to the git-checkout `deploy-hook.sh`. **prod left I-era; `/health`
  `commit` == `origin/master` tip `0441aba`.**
- **X2** — the `/colors/` proxy block in the NCSU Apache vhost replaced with a `RewriteRule` →
  `https://color.babb.dev/ [R=301,L]`.

**Live re-probe at close (2026-07-12) — BOTH STILL HOLD**: `api.color.babb.dev/health` → **200**
(`commit: 0441aba`, mongo ok, ~2.8-day uptime) · `deploy.babb.dev/hooks/value.js` → **200** (hook
present, HMAC intact) · `mbabb.fi.ncsu.edu/colors/` → **301** → color.babb.dev · `color.babb.dev/`
→ **200**. **X1 EXECUTED + LIVE · X2 EXECUTED + LIVE — RETIRE, both discharged by execution**
(historical CLOSED residuals to U, not open books). O-25 (the prod-lineage oracle) is GREEN
against the deployed artifact; the no-silent-3rd-re-book law is satisfied by EXECUTION.

---

## §5 — The book successor table (supersedes `S/FINAL.md §5`; U's supersedes this one)

Books, never gates. Every row re-probed live 2026-07-12 (`audit/w9-close/book-reverify.md`). The
successor's own zero-drop instrument is `docs/tranches/U/DISPOSITION-LEDGER.md` (every U-handed row
resolves to a named U wave there).

### HAND TO TRANCHE U (open at T close)

| Book | State at close | U owner |
|---|---|---|
| **The 5.0.0 adopt-event class** (glass-ui 5.0.0 adopt · CI un-pin from `tranche/BG` · **L17** `Blob` rename · **L20** `/blob/config` subpath · the whole §7.2 producer-consume swap set P3/P5/P6/P7-gated) | W7 TRIGGER-NOT-FIRED (npm 4.2.0, pkg 5.0.0 in-tree USER-GATED); the cut is imminent (BI GREENLIGHT 2026-07-12) | **U.W-ADOPT** (U-F2 the disease row) |
| **GAP-ARM** cold-load arm-replay | REWORKED toward the cure in-tree (`useAurora.ts` now `armRuntime()` under `{immediate:true}`); verify-at-adopt | U.W-ADOPT (U-F2) |
| **GAP-L2** variance atoms door | door surface now present in-tree (`atoms.ts` + `atoms-fields.ts`); verify-at-adopt (OLDEST, S→T) | U.W-ADOPT / U.W-VISUAL |
| **GAP-L5** blob halves (`settled` seam NOW load-bearing · HERO preset · single-WebGL2 collapse) | rides the blob co-rebuild; no `settled` export at HEAD; **anchors the Q14 RP-2 clear** | U.W-ADOPT + **U.W-PERF** |
| **L20 `/blob/config`** + **RP-2** JS-eager re-baseline (331.0 KiB > 280) | land TOGETHER at the cut; the RP-2 re-baseline carries a third tranche (§3) | **U.W-PERF** (U-F3) |
| **The Q14 LCP/TBT redemption** | the ruled ESCALATION (§3); budgets red, producer-coupled to the unfired adopt | **U.W-PERF** (U-F3 escalate) |
| **The T.W8 remediation cures — LANDED-but-OWNER-UNCERTIFIED** (the 29 LAND rows [§7.2 enumeration; the pre-P9 scalar read 24] + 9/11 §0.7 WR cures LANDED+merged: WR-1..WR-6/WR-8/WR-9/WR-11, `83d8714`→`6d95871`, `ROWS.md §4`; HG6 owner verdict PENDING · WR-7 bracket-to-owner · WR-10 W7/W9-by-law · T-42+T-61 B-01 taste bracket) | landed, OWNER-UNCERTIFIED — the still-reds inherit for a live census re-judge, NOT an un-landed Remediate phase | **U.W-VISUAL** census (+ U.W-PERF for T-39) |
| **The W8 HG5 demo-caps re-encapsulation row** (`useAtmosphere.ts` 411 · `Markdown.vue` 408 over ≤400) | booked; splitting demo/ is a remediation act, not a gate act | U (the demo/hygiene lane) |
| **GLASSUI L2..L16 open asks** (L8 = 5th booking, ESCALATED) | ride the 5.0.0 cut / the W7 walk; per-item at book-reverify §C | U.W-ADOPT |
| **PRM-expand** (keyframes `springPlay` subscribers-only emit) | re-dispatched (`ad65733`, `tranche-u-dev`), STILL LIVE at kf 5.2.0; not value.js-gated | U.W-ADOPT (kf letter) |
| **The chronic cross-repo 7-set** (CH-10 · CH-13 · FN-7 · kf `resolveEasing` · R8-23 · R-5 · R-10) | all KEEP-BOOKED, no fired trigger crosses value.js's consume-edge (3 drifts recorded) | U.W-CANON / spec-status |
| **DORMANT/PARK**: `Color.try()` (3 wraps) · `usePaletteStore` migration (version 1) · S.H3 Pratt (PT-E no reply) | dormant, no fired trigger | U |
| **The doc-rewrite remainder** (demo/api CLAUDE.md + root Structure + DESIGN.md facilities, DOC-1..13 post-E-1) | the W9 doc-rewrite lane's deliverable; not landed at pause (§7) | U (the doc lane) |
| **The P1–P10 packet dispositions + the T-60 producer communiqué** (`f3f3c097`) | the 9 BLOCKING reds + the booked swaps ride the BI inbox; owner-visible until the producer ships | U.W-ADOPT (the letter lane) |

### RETIRE (discharged/killed in T — NOT handed to U)

- **X1 · X2** — EXECUTED at W0, live-verified at close (§4). Historical CLOSED residuals.
- **L1** Normalized/Display brand — CLOSED (runtime-flag ratified; brand killed-with-rationale;
  permanent constraint, no re-book).
- **TA-4** `/remix`+`/diff` api-hygiene — `atomDiff` write-only excised (W1-api module move).
- **dup-`useDark`** — folded onto the `useGlobalDark` singleton (W1-demo).
- **`proof:*` carry** — Q13 split executed (`test:dist` = 5 retained gates).
- **oracle-floor F3/F4** — the mints landed (W0-5).

---

## §6 — Close numbers + the oracle slate at close

### §6.1 — The static close gates (deterministic; `audit/w9-close/sweeps.log`, HEAD `28f30ed`, ALL GREEN)

| Gate | Result | Verdict |
|---|---|---|
| `npm run lint` | exit 0 | GREEN |
| `npm run typecheck` (lib + demo) | exit 0 | GREEN |
| api `tsc --noEmit` | exit 0 | GREEN |
| `npm test` (vitest) | **74 files · 2241 tests · 2241 passed · 0 failed** | GREEN |
| `npm run build` (library → dist) | clean; dist/value.js 14.91 kB (gz 5.89 kB), 1.65s | GREEN |
| `npm run gh-pages` (demo) | clean, built 3.96s (Q14 close build 4.38s) | GREEN |
| **e2e (6 projects)** | **CERTIFIED** — 159 passed / 2 skip / 1 proven-flake, quiet machine | GREEN (`audit/w9-close/e2e-certification.md`) |

**The e2e certification (the deferred leg, now run — GREEN modulo one proven flake + the named reds).**
The full 6-project suite was re-run on the quiet machine (load ~11, no concurrent fleet; lane ports
8290/8291, the owner's :9000 untouched) once both W8-successor workflows closed: **159 passed / 2
skip / 1 failed**. The one hard failure — O-7 census light (`o7-card-census.spec.ts:190`, the
"Generate" heading not visible after the 8s timeout) — is a PROVEN serialization-ordering FLAKE: the
exact spec re-run in isolation passes **4/4 / exit 0** (light + dark + both mobile frames), the
timeout-artifact signature the `workers:1` single-server config documents (`playwright.config.ts:88`),
not a deterministic assertion mismatch. O-7 has stood green across T.W2/W3/W6.5. The 3 standing
born-RED `test.fail()` legs (O-16-R1/O-5/O-26) reproduce as EXPECTED and are the only named reds;
`smoke-perf` frame budgets and `smoke-safari` sustained-30s (console-failures 0, L1 aurora cure +
blob-spazz NO-REPRO on WebKit) are green. This matches the two prior quiet-machine wave closes to the
leg — **W6 = 146 passed / 2 skip / exit 0** (`5b64236`), **W8 = 160 passed / 2 skip / exit 0**
(`6d95871`, ports 8790/8791) — same 3 born-RED legs, no product defect. The owner-gated merged-tree
re-run at the close ceremony (§8) stands as the final confirmation on the merged sha.

### §6.2 — Repo-wide sweeps (PP-8; regenerated, never hardcoded)

- **`as unknown as` ledger**: src **8** (the documented irreducible erasure class — `Color<T>`
  generic-component erasure + the DOM `CSSStyleDeclaration` no-string-index class) · api/src **1**
  (the `server.close()` handle). **`as any`**: src **0 real** (the one grep hit is a comment,
  `parsing/index.ts:509`) · api/src **0**. **Matches CLAUDE.md exactly.**
- **Caps**: `api/src` **0 files > 350 LoC** (clean). `demo/` (excl. `components/ui/` shadcn):
  **2 files > 400 LoC** — `demo/color-picker/composables/boot/useAtmosphere.ts` (411) +
  `demo/@/components/custom/markdown/Markdown.vue` (408) — **exactly the W8 HG5 re-encapsulation
  row** (§1 W8, both figures on record; the split is a remediation act → U, not a gate act).
- **Legacy grep**: the E-3 named set clean (W0-3 legacy-grep-zero held; `atomDiff` write-only
  excised; root-barrel `@mkbabb/value.js` imports in demo = **0**, the W6.5 Lane-M sweep held).

### §6.3 — The oracle slate at close (O-1..O-26)

Every named oracle leg is GREEN at its wave gate or an honest EXPECTED-RED with a packet cite. The
**3 standing born-RED legs** carried by-design (`test.fail()`, never weakened): **O-16-R1** (the
150ms `--default-transition-duration` clobber LIVE in the glass-ui dist, PKT-1 unlanded — flips
green the day it lands + a fresh demo rebuild) · **O-5** (the boot-pacing spike, RP-2 → the Q14
escalation) · **O-26** (aurora perceptibility headless leg; the headed annex is GREEN → the
real-GPU annex hands to U-F54). **O-25** (prod-lineage) GREEN against the deployed artifact (§4).

---

## §7 — Process lessons + the honest residuals

### §7.1 — Lessons (extending `T.md §9` / the S ledger)

1. **The named-site-not-population verification method was T's own indictment, and §6's oracle
   slate is the fix.** SYNTHESIS §1.1's A-class (green-gate-defect) findings — T-3/11/18/24,
   T-12, T-21, T-29 — were all "landed" at S against a named site while the population still
   failed. Every T oracle names the axis it must NOT proxy away; the census classes (O-7, O-9,
   O-14, O-18) are population gates by construction.
2. **A late owner audit re-brackets landed work — record both the landing and the re-open, never
   silently.** Five findings landed then re-opened (T-2→T-51, T-8→WR-2, T-14→T-48→T-58,
   T-31→T-57, T-34→T-50); the T-MARK census shows both. Taste evolution on ratified ground is not
   a reversal, and a re-carried chronic (GAP-L2 S→T, GAP-L5 K→N→M→S→T) is escalation, never a
   silent re-book.
3. **The Q14 escalation is the honest close of a producer-coupled goal.** No re-baseline hides the
   overage; no preset-swap launders the mobile signal; no deferral pretends a future wave owns it
   without naming the wave. The physical blocker is one sentence (the eager WebGL engine on the
   critical path), the cure is one producer cut (L20+GAP-L5), and the redemption inherits to a
   named U wave. The ruling that forbade the escape hatches is what forced the honesty.
4. **The StructuredOutput scope-overflow crash recurred (W3 ink lane `null`)** — its committed,
   green 4-commit work was recovered from the tree and integrated, per the terminal-crash law.
   Split scope; recover the work-order from the journal/tree; never blind-commit, never discard.
5. **A close verifies the deployed lineage, it never assumes it.** X1/X2 executed at W0 but the
   close re-curled `/health`, the webhook, and the NCSU 301 — all still live. O-25 guards the
   prod artifact at the ceremony.

### §7.2 — The honest residuals

- **The T.W8 owner-certification verdict is PENDING** — `audit/w8-certification/VERDICT-2026-07-12.md`
  is the empty stub; the package PRESENTS 20 taste brackets + the boot screencast + the Q14
  material, and CERTIFIES NOTHING until the owner rules (never a proxy sign-off). This is the
  honest terminal of the E-7 hardening wave.
- **The T.W8 Remediate phase LANDED its cures; what is PENDING is the OWNER CERTIFICATION** — the
  29 LAND rows (P1-R1/R2 · boot-A/B · AB-1..4 · P4-R1..R4 · E1-R1..R3 · P6-R1 · P7-R1/R2 · P8-R1/R2 ·
  P9-R1..R5 · A-3 · P11-R1..R3, `audit/w8-certification/ROWS.md §4` — this enumeration counts 29; the
  `ROWS.md §4` summary scalar "24 LAND rows" is the stale pre-P9 tally, un-bumped when the last-filed
  dock-nav-menus pass added P9-R1..R5) + 9/11 §0.7 WR cures (WR-1..WR-6,
  WR-8, WR-9, WR-11) LANDED + merged (`83d8714`→`6d95871`); WR-7 is a bracket-to-owner, WR-10 is
  W7/W9-by-law. The HG6 OWNER VERDICT is the empty stub (PENDING — never a proxy sign-off). These
  inherit to U's U.W-VISUAL as **owner-uncertified still-reds** re-judged at the W8-inheritance
  census (and T-39 → U.W-PERF), NOT as un-landed cures.
- **The producer-gated items ride the BI inbox** (`f3f3c097`, stamped glass-ui HEAD `24a7a764`):
  the 9 BLOCKING reds (T-60 reveal-bloom door · PKT-1 · GAP-L2 · GAP-L5 · the backdrop-filter
  ladder cure · GAP-ARM · T-38 · the spectrum-thumb UA-outline · T-52 dock clip) + the booked
  swaps. Every one is owner-visible on prod and un-closeable from value.js until the 5.0.0 cut.
- **The real-GPU annex (U-F54)** — O-26's headless leg is born-RED-by-design; the headed annex is
  GREEN, but a real-GPU frame-by-frame gate for the aurora perceptibility + the T-58 motion
  family is the successor's real-device instrument.
- **The doc-rewrite remainder** (DOC-1..13 post-E-1: demo/api CLAUDE.md + root Structure contracts
  + DESIGN.md facilities) — the W0-4 pre-E-1-safe set landed; the pattern-level rewrites are a U
  doc lane (item 8 of the W9 scope, not landed at the pause).

---

## §8 — THE OWNER-GATED CLOSE (EXECUTED at the 2026-07-13 ceremony; HG6 remains pending)

**Ceremony record**: item 1 EXECUTED (merge `6e14e90` + tag `tranche-t-close` + the 12-worktree
sweep, `ceremony-sweep.md`); item 2 ACKNOWLEDGED-BY-EXECUTION-ORDER (`U/audit/
RATIFICATION-2026-07-13.md §1.2`); item 3 **PENDING — the owner's, never proxied**. The original
reservation text follows (historical). The following were the OWNER's decision, COUPLED with the
tranche-U ratification — **T closes and U opens as ONE owner decision point**:

1. **The master merge + tag + worktree cleanup.** The `--no-ff` merge of `tranche-t` → `master`,
   the annotated `tranche-t-close` tag (carrying the `complete_with_misses` verdict + the finding
   census + the Q14 escalation), and the sweep of the 12 pre-ceremony lane worktrees — all fire on
   the owner's word, riding the now-fixed CI/deploy chain (the five-layer peel `be0a703`→`0441aba`;
   deploy-pages ships **Production** on `--branch=master`, the false-success Preview footgun dead).
   At that event the deploy-lineage verification (O-25 against the Production artifact, deployment
   id + environment + asset hashes vs the close sha) + the merged-tree e2e re-run + the merge/tag
   SHAs land, and the §1 W9 row + the header note amend in place. If budgets remain red per Q14
   (they do — §3), the designed `workflow_dispatch` manual lane ships the close, recorded, with
   the auto-deploy resumption condition named (CI green). **No gate weakened to ship** (the S
   precedent). This document does NOT merge, does NOT tag, does NOT push to master.

2. **The Q14 PERF REDEMPTION escalation acknowledgement.** §3 is authored as the RECORD naming the
   physical blocker (the ruled disposition, PP-16). The owner's acknowledgement lands at
   ratification.

3. **The T.W8 owner certification verdict.** The empty stub awaits the owner's verbatim ruling over
   the 20-bracket package (approve all landed defaults / rule per-axis inside the brackets / file
   further rows) + the Q14 pairing. Until then, W8 is delivered-but-unruled, honestly.

The successor tranche U opens on: this §5 books table, the `T.md §9` process-lessons ledger (with
the close-minted lessons above), the standing oracle slate (O-1..O-26 as close-state, incl. the
census/population classes T minted), the W8 certification package as the taste baseline, the
`audit/T-MARK-2026-07-12.md` done-state census as the inbound backlog, and the now-fixed CI/deploy
chain as its inherited floor. `U/DISPOSITION-LEDGER.md` is where every open row above receives its
DECIDED U-wave disposition, zero silent drops — a re-book is forbidden.

---

*Provenance: this close certifies (does not duplicate) `audit/T-MARK-2026-07-12.md` (the finding
census), `audit/w9-close/{sweeps.log,book-reverify.md}` (the static gates + the live book
re-probe), `audit/pi/w9/q14-close-escalation.md` (the Q14 measurement + escalation), and the eight
wave close-artefacts (`audit/w0..w8-close-artefacts.md`). `MANDATE-2026-07-06.md §0` + addenda
§0.1–§0.8 remain the ceiling; `RATIFICATION-2026-07-09.md §0` wins over the corpus. The independent
audit verifies these claims separately; the tree/live is truth.*
