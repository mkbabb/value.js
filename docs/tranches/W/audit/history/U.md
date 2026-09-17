# Historical audit — tranche U (hostile seat)

## Model receipt

I observe myself to be **Claude Opus 4.5** — reported to me as *Opus 5 (1M context)*, exact model id
`claude-opus-5[1m]`. I record the discrepancy rather than resolving it: the harness label and my own
self-knowledge disagree, and an audit seat should say so.

**Scope**: `docs/tranches/U/` (202 files, 29 MB) at `/Users/mkbabb/Programming/value.js`, branch
`tranche-u`, HEAD `c654824e`. Cross-checked against the live tree, `git log --all`, the V′ reformation
corpus, and the sibling repos `../glass-ui`, `../keyframes.js`.

---

## §0 — The brief's premise is FALSE, and the false premise hides the real defect

The task brief states U "converged-hardened and then went terminal **without executing**," and calls
that "the single largest potential silent-drop surface in this repo."

**U executed.** All ten waves ran and closed on 2026-07-13, in one day, with real commits:

```
$ git log --oneline --all | grep -c "U\.W-"     # spot-verified below
```

Every commit SHA cited in `U/FINAL.md` resolves. I checked 47 of them with `git cat-file -t`; 46 are
live objects in this repo (`755a089` `f0f2965` `ca8dbca` `a16e1f4` `b9a9290` `cfa8c31` `be807ce`
`15e306e` `b3f4f76` `637686c` `a0d777d` `e824bf2` `a31f2d1` `43a196e` `6bed451` `faa49ce` `e57f541`
`87b4eca` `6667eb05` `7335786` `42608eb` `469f840` `2c35f6f` `217cd16` `33391b2` `616e84f` `d039952`
`7efc0b7` `fc14c01` `e82d27a` `d40e04c` `26d1392` `ca26848` `b54ce7f` `79eb278` `928c81f` `adf0327`
`a113eeb` `110b56f` `296b8b2` `ccf4b30` `5cecdf2` `ac78b90` `c515fc1` `e2900e3` `a4f9380` `138af33`).
The one miss, `17e0f522`, is a **glass-ui-side** object, correctly cited as foreign.

So U is not a formation that failed to execute. **U is a formation that executed, declared 77/77
zero-drop under a machine gate, and then had a large fraction of its landed work deleted four days
later by its own successor — with the deletion never booked against the U rows it reversed.**

That is a worse defect than the one the brief hypothesised, and it is invisible if you audit U's
documents instead of the tree.

---

## §1 — The commitment ledger

`U/DISPOSITION-LEDGER.md` and `U/FINAL.md` enumerate **104 distinct commitments**:

| Class | Count | Source |
|---|---|---|
| U-Fxx families | 77 | `FINAL.md §A` |
| Book-register books B1..B14 | 14 | `FINAL.md §BOOKS` |
| Chronic/disease classes | 6 | `FINAL.md §B` |
| T-close carried books | 3 | `FINAL.md §B.1` |
| Census orphans | 4 | `FINAL.md §C.1` |
| **Total** | **104** | |

Audited outcome for the 77 families (method: current tree + git history, never the close document's
own claim):

| Audited status | Count | Families |
|---|---:|---|
| **LANDED** (verified effective in the tree today) | **35** | F2 F6 F9 F16 F17 F18 F19 F20 F23 F24 F25 F26 F27 F34 F35 F37 F40 F43 F45 F46 F47 F48 F49 F51 F53 F58 F59 F62 F63 F66 F67 F68 F70 F71 F77 |
| **STILL_OPEN** | 20 | F4 F5 F7 F8 F10 F11 F12 F13 F15 F36 F38 F39 F41 F50 F52 F54 F56 F57 F61 F75 |
| **RETIRED_WITH_RATIONALE** | 8 | F21 F22 F28 F30 F44 F60 F69 F76 |
| **SILENTLY_DROPPED** | 6 | F14 F42 F65 F72 F73 F74 |
| **RE_BOOKED** (deferred at U, re-deferred at V under a new name) | 5 | F1 F3 F29 F55 F64 |
| **UNVERIFIED** | 3 | F31 F32 F33 |

**35 of 77 = 45% of U's family slate is verifiably effective in the tree today.** U's own close
verdict presents 77/77 as DECIDED with zero silent drops.

---

## §2 — THE CENTRAL FINDING: G-CLOSE-1 is a vacuous gate, and I proved it by running it

U's entire close credibility is one sentence in `FINAL.md:14-16`:

> The walk is **GATE-BACKED** — `scripts/gates/proof-close-ledger.mjs` (`npm run proof:close-ledger`,
> CI-wired via `test:dist`) parses this file against the ledger and RED-fails any dropped row or the
> Family-audit invariant. **Zero silent drops.**

I restored the gate from `git show a113eebf:scripts/gates/proof-close-ledger.mjs` into a scratch tree
with the U-close copies of both documents and ran it.

### 2.1 Baseline — reproduces GREEN

```
$ node scripts/gates/proof-close-ledger.mjs
  ledger §A families        : 77 (expected 77)
  FINAL  §A families walked : 77  (matched 77/77)
GATE GREEN: every ledger row → a FINAL.md disposition-with-evidence; ... Zero silent drops.
exit=0
```

### 2.2 Experiment A — the gate cannot detect the drop class it exists to detect

The gate's own header comment (`proof-close-ledger.mjs:11-15`) claims:

> REGENERABLE (the LoC-precept pattern — NOT a hardcoded checklist of 77 rows): the row set + the
> family integers are DERIVED by parsing the ledger's markdown tables at run time. **A row added to
> the ledger that FINAL.md fails to walk turns this gate RED at the diff; the number is never
> hardcoded, so it never drifts.**

I added one row to the ledger's §A table and left `FINAL.md` untouched:

```
| U-F78 | brand-new-unwalked-defect | U.W-CANON | build | a real new commitment nobody walked |
```

Result:

```
  ledger §A families        : 78 (expected 77)
  FINAL  §A families walked : 77  (matched 77/77)
GATE GREEN: ... Zero silent drops.
exit=0
```

**The gate printed the discrepancy in its own output and exited GREEN.** The bijection is implemented
as `for (let i = 1; i <= 77; i++)` (twice — `proof-close-ledger.mjs:131` and `:139`); it never
iterates `ledgerFam.keys()`. The header comment is a direct, checkable lie about the code beneath it.
**Any 78th commitment is undetectable by construction.**

### 2.3 Experiment B — "terminal-evidence cite" is satisfied by the word DEFERRED

The cite detector (`proof-close-ledger.mjs:64-79`) accepts a bare disposition keyword as evidence.
Its keyword alternation includes `DEFERRED`, `PARK`, `STILL-BOOKED`, `WATCH`, `UNFIRED`. I replaced
every one of the 77 evidence cells in `FINAL.md §A` with the single word `DEFERRED` (retaining only
the 8 hardcoded sub-invariant tokens the gate checks by name):

```
| U-F1 | x | x | x | DEFERRED  |
| U-F29 | x | x | x | DEFERRED  |
| U-F77 | x | x | x | DEFERRED  |
```

Result:

```
GATE GREEN: every ledger row → a FINAL.md disposition-with-evidence; ... Zero silent drops.
exit=0
```

**A FINAL.md that defers all 77 commitments with zero evidence passes G-CLOSE-1 and prints "Zero
silent drops."** Not one "carries NO terminal-evidence cite" violation fired.

### 2.4 What input WOULD make it RED

Deleting a `| U-Fn |` line from `FINAL.md §A` for n ≤ 77, or removing one of eight hardcoded keywords
(`split` on F6/F55, `W8|census` on F18/F19, `retire` on F20/F59/F60, `annex` on F54).

That is the gate's entire discriminating power: **it verifies that a markdown table has 77 rows and
that eight of them contain a specific word.** It never checks that a cited commit exists, that a
cited file exists, that a cited test passes, or that any behaviour changed. It is a spell-checker for
a table of contents, presented as a zero-silent-drop proof.

This is `green-over-broken` at the meta level: the gate that certifies the absence of lies is itself
the lie.

**Note the recidivism.** The user's own recorded feedback (`memory/feedback-proof-idiom-retired.md`,
2026-06-02) judged the grep-based `proof:*` invariant-codification idiom **"overfit junk," deleted it,
and ruled "Never re-introduce; enforce invariants structurally."** Six weeks later U minted **eleven**
new `scripts/gates/proof-*.mjs` files and a `test:dist` chain of ten of them. V.W42 then deleted them
again under the commit subject **"prune proof-theater"** (`6d6d3521`). The idiom has now been killed
twice and reborn once.

---

## §3 — The gate infrastructure U built no longer exists

Every `proof:*` gate U wired was deleted by V′ four days after U closed.

```
$ test -d scripts/gates && echo EXISTS || echo ABSENT
ABSENT

$ git log --oneline --all --diff-filter=D --name-only -- 'scripts/gates/*' | head
164343c1 feat(v4)!: value 4.0 producer surface + packed-surface gate; retire pre-v4 src trees
scripts/gates/proof-barrel-parity.mjs
scripts/gates/proof-close-ledger.mjs
scripts/gates/proof-css-parity.mjs
scripts/gates/proof-dts-surface.mjs
scripts/gates/proof-lib-correctness.mjs
scripts/gates/proof-pack-manifest.mjs
scripts/gates/proof-perf-target.mjs
scripts/gates/proof-round-trip-idempotent.mjs
scripts/gates/proof-serialize-fidelity.mjs
scripts/gates/proof-size-graph.mjs
scripts/gates/proof-subpath-budget.mjs
```

`package.json` at U close (`git show a113eebf:package.json`) carried 11 `proof:*` scripts and:

```
"test:dist": "npm run build && npm run proof:dts-surface && ... && npm run proof:close-ledger"
```

`package.json` today carries **zero** `proof:*` scripts and **no** `test:dist`. Replacement:
`scripts/ci/verify-packed-surface.mjs`, 140 lines, checking the v4 packed export surface only.

### 3.1 The CI that enforced them shrank 720 → 71 lines

```
$ git show a113eebf:.github/workflows/ci.yml | wc -l
720
$ wc -l < .github/workflows/ci.yml
71
$ rg -n "lighthouse|lhci|axe|playwright|test:e2e" .github/workflows/
(no matches)
```

Consequences, none of which are booked against the U rows they reverse:

- **U-F1 / U-F55-CI (`G-ORACLE-1`)** was "un-owned `continue-on-error` 2→0, **unrun projects 4→0**,
  CI-teeth gate wired hard." Today **no Playwright project runs in CI at all** — the metric U drove to
  zero is now at its maximum. `scripts/ci/oracle-slate-teeth.mjs` was deleted at W42.
- **U-F3 (Q14 LCP escalate)** cited `lighthouserc.json:13` **untouched** as proof of honesty (no gate
  re-baselining). The line is still there — `"largest-contentful-paint": ["error", {"maxNumericValue":
  2500}]` — but **nothing runs Lighthouse any more.** The honest gate was not weakened; its runner was
  removed. This is a `masked fallback` by subtraction: the config reads strict, the enforcement is nil.
- **U-F42 (`vacuous-ci-tripwire`)** — see §5.
- **U-F14 (`G-PERF-2`, the flagship dist ratio gate, "32/32 clean, re-probed live 2/2 at close")** —
  `proof-perf-target.mjs` deleted. No successor.
- **B5** — `FINAL.md §BOOKS`: *"**LANDED** — two STANDING CI-wired guards, GREEN on the tree."* Both
  (`proof-barrel-parity.mjs`, `proof-size-graph.mjs`) deleted. A book discharged as LANDED-standing
  became un-landed in four days.

I also note a **latent falsehood in B5 at U close itself**: `proof:size-graph` was **never in the
`test:dist` chain**. It was wired as a single standalone CI step (`ci.yml:188`). B5's phrase "two
STANDING CI-wired guards" was true only in the loosest sense for one of the two.

### 3.2 Four U-landed test artifacts were deleted as "proof-theater"

```
$ git log --all --diff-filter=D --name-status --oneline -- '*canon-sync*' '*ground-single-source*' '*session-single-source*' '*shot-policy*'
6d6d3521 chore(v-w42)!: prune proof-theater, orphaned probes, design residue; re-gate demo typecheck (soft, D48)
D	test/dist/ground-single-source.test.ts      ← U-F23, G-CANON-4, "4/4"
D	test/dist/shot-policy.test.ts               ← U-F50, G-CANON-7, "born-RED→GREEN"
D	test/session-single-source.test.ts          ← U-F46, G-DEMO-2, "7/7"
3b5956d0 / 7334c793
D	test/dist/canon-sync.test.ts                ← U-F21, G-CANON-2, "regenerable"
```

In three of four cases the **underlying cure survives** (`injectGroundTokens` at `vite.config.ts:15`
and `:154`; `sessionTokenRef` at `demo/platform/transport/client.ts:54`; no oversized tracked
binaries). Only the **regression guard** died. That is a defensible trade — but it was made under a
commit subject that names none of U-F21/F23/F46/F50, and no V document records the reversal against
those rows.

---

## §4 — Full F1..F77 audited disposition

Legend: **L** LANDED · **O** STILL_OPEN · **R** RETIRED_WITH_RATIONALE · **D** SILENTLY_DROPPED ·
**B** RE_BOOKED · **?** UNVERIFIED.

| ID | Family | U's stated disposition | Audited | Evidence |
|---|---|---|---|---|
| F1 | ci-oracle-slate-nonblocking | LANDED `755a089`, unrun projects 4→0 | **B** | ci.yml 720→71; zero playwright in CI; V-archive routes B7 "retire custom posture W4"→W42; journey re-gate → W55 (unexecuted) |
| F2 | adopt-trigger-disease (glass-ui) | DECIDED, cut UNFIRED | **L** | glass-ui `v5.0.0` tagged 2026-07-15, `v7.0.0` 2026-07-17; value adopted 7.0.0 at `f2c8f565` (W44) |
| F3 | q14-perf-redemption | ESCALATE structural-fact | **B** | `lighthouserc.json:13` intact, **no LHCI runner in any workflow**; → W55 CH-4, unexecuted |
| F4 | reduced-motion-dock-collapse | FOLDED→F2, OA-B1 cut-gated | **O** | cut fired 07-15/07-17; OA-B1 never attested; `W46-W48.md:141` "archaeology" |
| F5 | blob-card-seat | ANNEX-OWNER-ATTEST | **O** | `annex-packet.md §1`; → `W53-W54.md:153` archaeology, unexecuted |
| F6 | q5-ramp + proxy oracle | SPLIT-HOMED, census-green | **L** | ramp cure in tree `be807ce`; oracle-half gate script deleted with `scripts/gates/` |
| F7 | scene-transition-motion | ANNEX, OA-1 + T-58 MANDATE | **O** | `annex-packet.md §5`; W46-W48 + W53-W54 archaeology; never attested |
| F8 | generate-plate-species-chrome | ANNEX, OA-2 | **O** | `annex-packet.md §1`; `W53-W54.md:83` archaeology |
| F9 | picker-header-spacing-regime | CENSUS-RED RE-CURED GREEN | **L** | `cfa8c31`/`be807ce`; OA-6 gestalt tail → W46-W48:226 |
| F10 | console-veil-material | ANNEX, OA-3 | **O** | `annex-packet.md §1`; `W46-W48.md:80` archaeology |
| F11 | collapsed-dock-swatch-seam | ANNEX | **O** | `annex-packet.md §1`; W46-W48 + W53-W54 archaeology |
| F12 | dark-tint-muddiness | **Pole A/B UN-PICKED** | **O** | `annex-packet.md §4`; owner never picked; `W46-W48.md:80` archaeology |
| F13 | dock-edge-clip | demo half retired; producer OA-B2 cut-gated | **O** | cut fired; OA-B2 never attested; `W46-W48.md:141` |
| F14 | perf-ratio-nonportable-flake | LANDED `b3f4f76`, G-PERF-2 | **D** | `proof-perf-target.mjs` deleted `164343c1`; no successor; unnamed in CARRY-LEDGER and every V-PRIME wave spec |
| F15 | o26-softwaregl-nonflip | FOLDED→F42 headed-GPU annex | **O** | rides B8 → W55 CH-7, unexecuted |
| F16 | untracked-CLS-gate | LANDED `a0d777d`, 0.2146→0.0010 | **L** | cure in tree; CLS assertion at `lighthouserc.json:12` now unrun |
| F17 | q4-well-veil-silent-reversal | AUTHORED `e824bf2` | **L** | `audit/canon/q4-well-amendment.md` present |
| F18 | e5-addressed-half | FOLDED→W8-census | **L** | fold executed in `FINAL.md §C` |
| F19 | w8-remediation-live-defects | FOLDED→W8-census | **L** | ditto |
| F20 | doc-template-token | RETIRED at root | **L** | cured at rename |
| F21 | canon-structure-drift | LANDED `a31f2d1`, regenerable gate | **R** | `test/dist/canon-sync.test.ts` deleted `7334c793`/`3b5956d0`; canon wholly rewritten at V.W41; `W55-W56.md:145` archaeology |
| F22 | barrel-parity-drift | LANDED, **STANDING CI-wired** | **R** | `proof-barrel-parity.mjs` deleted; V-archive `DISPOSITION-LEDGER.md:200` "B5 barrel/size gates → retire W4" — recorded, but only in the **archived** ledger |
| F23 | ground-record-forked-read | LANDED `faa49ce`, test 4/4 | **L** | `injectGroundTokens` live at `vite.config.ts:15,154`; test deleted at W42 |
| F24 | dead-orphans + over-export | LANDED `e57f541`; ~150 over-exports RULED leave-as-is | **L** | irreversible retire; over-exports later cut anyway by the v4 exact-seven surface |
| F25 | gradient-stop-focus-invisible | LANDED `87b4eca` | **L** | `demo/styles/focus-ring.css` present; `o27-focus-affordance.spec.ts` present |
| F26 | dark-accent-below-floor | LANDED `6667eb05`, `safeAccentAgainstSurface` | **L** | **renamed** → `safeAccentColor` at `src/color/operations.ts:207`, consumed `demo/color-session/view-accent.ts:40`, `ink.ts:74,165`. Dock-icon 2.26:1 residual still rides F12 |
| F27 | tap-targets-aria-polish | FOLDED `87b4eca`, 7/7 | **L** | `test/slider-announcement.test.ts` present |
| F28 | kf-prm-expand-fixed-unreleased | STILL-BOOKED (WATCH), gate = kf tag > 5.2.0 | **R** | kf `v6.0.0` exists → **gate FIRED**; V-archive `:194` "B1 … HISTORICAL/RETIRED" |
| F29 | parseCSSValue-silent-truncation | LANDED, loud-fail `CSSParseError`, LIB 20/20 | **B** | `CSSParseError` **absent from tree**; `src/parsing/` deleted `164343c1`; v4 uses `Result`/`ParseIssue`. The parse-honesty class re-opened at V·π: live `parseCssColor("oklch()")` **shipping crash** (R1) |
| F30 | computed-color-normalized-serialization | LANDED, LIB-G2/G3/G5/G6 | **R** | host tree deleted; superseded by v4 `/css` public surface |
| F31 | transform-single-axis-expansion | LANDED, LIB-G7 | **?** | `src/subpaths/transform.ts` exists; **would verify**: assert `rotate(45deg)`→`rotateZ`, `scale(2)` stays 2D against built dist |
| F32 | math-trig-unit-leak | LANDED, LIB-G8 | **?** | `src/parsing/math.ts` deleted; `src/math.ts` survives. **Would verify**: `calc(sin(30deg)*100px)` → `50px` on dist |
| F33 | gradient-stop-position-roundtrip | LANDED, LIB-G9 | **?** | `test/gradient-parse.test.ts` exists; `W53-W54.md:83` archaeology. **Would verify**: positioned-stop round-trip assertion |
| F34 | library-naming-incoherence | FOLDED, LIB-G12 STANDING parity | **L** | `rg "export (const\|function) [a-z]+To[A-Z]" src/` → 1 unrelated hit (`coerceToSyntax`); parity holds — but the STANDING gate is deleted |
| F35 | transform-2D-recompose-missing | FOLDED, LIB-G11 | **L** | `recomposeMatrix2D` in `src/transform/decompose.ts`, `src/subpaths/transform.ts`, exported in `fixtures/public-types/value-v4.ts` |
| F36 | impersonation-dead-credential | LANDED `469f840`; live confirm B13 | **O** | api fix in tree; **B13 live confirm absent from CARRY-LEDGER and from the W56 spec** (W56 names headers only) |
| F37 | db-trust-boundary | LANDED `2c35f6f`; residual in `api/CLAUDE.md` | **L** | `api/CLAUDE.md` **deleted** at `164343c1`; residual **relocated** to `api/compose.yaml`, test retargeted `6d3e7870` |
| F38 | db-token-at-rest | LANDED `469f840`; live confirm B13 | **O** | `api/src/modules/session/__tests__/session-token-at-rest.test.ts` present; live confirm uncarried |
| F39 | frontend-missing-security-headers | LANDED `217cd16`, `_headers` artefact | **O** | `demo/color-picker/public/_headers` present, **but its CSP derivation cites three DEAD paths** (`demo/@/lib/palette/export.ts`, `demo/@/lib/palette/api/client.ts`, `demo/@/components/custom/dock/menus/ProfileSection.vue` — `demo/@` dissolved at W43 `bc06a0cd`). W54 requires dropping `'unsafe-inline'`. Live wire never confirmed |
| F40 | admin-audit-attribution | FOLDED `469f840` | **L** | `ADMIN_ACTOR_SLUG = "system:admin"` at `api/src/modules/admin/auth.ts:35` |
| F41 | duplicate-ncsu-origin | ESCALATE, attested-not-verified | **O** | `W55-W56.md:146` "U-F41 remains BANKED until NCSU VPN access"; **0 occurrences of NCSU/VPN in CARRY-LEDGER.md** |
| F42 | vacuous-ci-tripwire | ESCALATE, 3 `test.fail()` mapped BY NAME | **D** | all three still ship at the **exact cited lines**: `o16-computed-cascade.spec.ts:34`, `o26-aurora-perceptibility.spec.ts:57`, `o5-boot-pacing.spec.ts:48`; both named triggers (adopt cut, RP-2) have fired or been superseded; **no V-PRIME wave spec and no CARRY-LEDGER row names them** |
| F43 | slow-build-in-beforeAll | FOLDED `637686c` | **L** | build calls moved out of the unit suite; `test:dist` since deleted entirely |
| F44 | impl-detail-coupled-tests | FOLDED `637686c` | **R** | `value-unit.test.ts` removed with the pre-v4 tree |
| F45 | demo-cross-layer-inversion | LANDED `616e84f`, STANDING ESLint gate | **L** | `eslint.config.js:206` `no-restricted-imports` — **the exact line U cited** |
| F46 | session-token-triplication | LANDED `d039952`, test 7/7 | **L** | `sessionTokenRef` at `demo/platform/transport/client.ts:54`; test deleted at W42 |
| F47 | colocation-e1-violation | LANDED `616e84f`, G-DEMO-3a/3b | **L** | `eslint.config.js:241`, `:279` — exact cited lines |
| F48 | demo-state-fragility-cluster | FOLDED `7efc0b7` | **L** | ports live at `demo/palettes/usePalettePorts.ts`, `useBrowsePalettes.ts` |
| F49 | gitignore-auth-unanchored | LANDED `e57f541` | **L** | `.gitignore:11` `/auth/` |
| F50 | tracked-binary-bloat | LANDED `e57f541`; history-rewrite BOOKED | **O** | largest tracked file now 93 KB; `shot-policy.test.ts` deleted; **history-rewrite book uncarried anywhere** |
| F51 | stale-local-branches | EXECUTED at close | **L** | `book-register.md §2` |
| F52 | scratch-accumulation | EXECUTED; 2 items DEFERRED-with-rationale | **O** | both deferred items **still untracked today**: `docs/tranches/T/audit/pi/u-gestalt/`, `docs/tranches/T/audit/pi/u-bh-communique-draft.md` (`git status` `??`) |
| F53 | worktree-prune-proof | DEFERRED-WITH-PROOF | **L** | V.W42 pruned 16 stale `wf_*` worktrees (~11 GB) |
| F54 | **real-GPU-visual-oracle-never-run** | THE OWNER-ATTESTED ANNEX, `complete_with_misses` | **O** | never run; → V-archive "build W32" → `MAPPING.md` W32→**W55** → W55 unexecuted (frontier is W46). **See §6.1** |
| F55 | ci-slate-no-teeth + unmeasured-a11y | SPLIT: a11y RETIRED, CI-teeth LANDED | **B** | same mechanism as F1 |
| F56 | authed-populated-surface | LANDED `42608eb`; OA-2 owner | **O** | `e2e/smoke/admin/a11y-authed-*.spec.ts` present but unrun in CI; OA-2 → `W49-W52.md:128` archaeology |
| F57 | a11y-modality-gaps | LANDED `7335786`; OA-1 owner | **O** | `a11y-modality-support.spec.ts` present, unrun in CI; OA-1 → W55 |
| F58 | untested-web-modalities | LANDED, BR-10/BR-11 | **L** | `a11y-web-modality.spec.ts` present |
| F59 | unread-sources-of-record | RETIRED (round-4) | **L** | recorded retire |
| F60 | color-math-correctness-unaudited | RETIRED — VERDICT SOUND | **R** | the verdict's own evidence (F72/F73 anchors) was deleted, so the soundness claim is **no longer reproducible from the tree** |
| F61 | single-sourced-claims | FOLDED, 4 claims flagged | **O** | 3 of 4 unresolved (NCSU · TBT · born-RED register); honest at U, uncarried at V |
| F62 | families-that-are-two-mechanisms | FOLDED, bookkeeping | **L** | records the F6 split |
| F63 | npm-pack-ships-demo | LANDED `6bed451` | **L** | `package.json` `files: ["dist","!dist/gh-pages","!dist/gh-pages/**"]`; `proof-pack-manifest.mjs` deleted but `verify-packed-surface.mjs` is a real successor |
| F64 | size-gate-blind | LANDED, G-CANON-8 **STANDING** | **B** | `proof-size-graph.mjs` deleted; V-archive routes B5 "performance W31" → **W55**, unexecuted; `W55-W56.md:145` archaeology |
| F65 | lint-vacuity | LANDED (ACCEPT), rationale in `CLAUDE.md` | **D** | **`CLAUDE.md` deleted** at `164343c1` (163 lines). The owner-call rationale — the row's entire deliverable — no longer exists anywhere |
| F66 | typecheck-stale-dist | LANDED (PRETYPECHECK) | **L** | `package.json` `"pretypecheck": "npm run build"` |
| F67 | api-hono-advisory | LANDED `33391b2` | **L** | `api/package.json` hono `^4.12.25` |
| F68 | glass-ui-lock-adopt-drift | FOLDED→cut | **L** | lock now registry-only at glass-ui `^7.0.0` (`f2c8f565`) |
| F69 | parse-that-doc-lie | LANDED `a31f2d1` | **R** | `@mkbabb/parse-that` now **absent from package.json entirely** — the dependency the doc lied about was removed |
| F70 | root-zod-orphan | LANDED `6bed451` | **L** | root `zod` absent |
| F71 | dev-toolchain-advisories | LANDED (batch bump) | **L** | recorded |
| F72 | **test-ground-truth-circularity** | LANDED `fc14c01`, G-ORACLE-6 | **D** | `test/units/color/conversions/color-external-anchors.test.ts` **deleted** `7334c793`/`3b5956d0`. `rg "Sharma\|ground.truth\|external.anchor\|lindbloom" test/` → **NONE**. `test/v4-color-behavior.test.ts:66` asserts `(byte/255)/12.92` — a formula-derived expectation, i.e. **the exact circularity U cured, restored**. Unnamed in every live V doc |
| F73 | test-ground-truth-incomplete | LANDED `fc14c01`, Sharma 14→34 | **D** | `test/units/color/color-difference.test.ts` deleted. Mitigating: `deltaE`/CIEDE2000 is also absent from `src/` — the subject code was cut. **But no document records that supersession against F73** |
| F74 | conversion-silent-gamut-map | FOLDED, LIB-G10, `{gamut:'raw'}` | **D** | v4 exposes only `gamut: RgbGamut` (`src/color/model.ts:45`) and `gamut:"clip"` (`operations.ts:316`). **No `'raw'` escape hatch anywhere.** The capability is gone and unnamed in any V doc |
| F75 | precept-stale-label | RELAY-record; pin-advance BOOKED | **O** | book uncarried in CARRY-LEDGER |
| F76 | shared-surface-coordination (settle-guard) | LANDED, B4 live guard "RED-on-reseat" | **R** | `o10`/`o11`/`o21` specs present but unrun in CI; V-archive `:198` "B4 settle guard — dependency law retained; **custom guard not authority**" |
| F77 | library-cut-adopt-ordering | DECIDED `e82d27a`; cut owner-held | **L** | value `4.0.0` published; V-A126 rules U-F77/B1/B14 "HISTORICAL / RETIRED" |

---

## §5 — Silent drops

A silent drop = promised, absent from the tree, **and** named in no live successor document.

I tested this mechanically. `CARRY-LEDGER.md` is declared *"the complete fold-forward inventory
(nothing lost: head, tail, or interval)"* and *"The next formation consumes this file WHOLE; a row may
only leave it by landing or by explicit owner retirement."* Occurrence counts in that file:

```
U-F                      0        annex                    0
NCSU                     0        owner-attest             0
VPN                      0        B14                      0
impersonation            0        book-register            0
token-at-rest            0        attested-not-verified    0
test.fail                0        OA-1                     0
born-RED cure            0        OA-B1                    0
O-16                     0        Pole A                   0
O-26                     0        barrel                   0
size-graph               0        close-ledger             0
```

**The declared-complete fold source contains not one U-tranche identifier.** (The single `O-5` hit is
V's outbound mail id "reply to O-5 (SCI verdicts)" — an *alias collision* with U's `o5-boot-pacing`
oracle, not a carry.)

U residuals survive only through a **four-hop chain with the identifier dropped at the last hop**:

```
U/FINAL.md §BOOKS
  → docs/tranches/V/archive/DISPOSITION-LEDGER.md §3     (ARCHIVED, read-only)
  → an old V wave id (W4/W17/W28/W31/W32/W33)
  → docs/tranches/V/reformation/MAPPING.md               (junction table)
  → a V-PRIME wave W41..W56
  → CARRY-LEDGER.md §B — which no longer names the U row
```

In the V-PRIME wave specs, surviving U rows appear only as trailing one-word **"Archaeology"** lists
(`W46-W48.md:80,141,226`; `W49-W52.md:128`; `W53-W54.md:83,153`; `W55-W56.md:77,145`). 35 of 77
families appear; **42 do not appear in any V-PRIME wave spec at all.**

### The six confirmed silent drops

| # | What | Last seen | Evidence |
|---|---|---|---|
| 1 | **U-F72 external ground-truth anchors** — the cure for test-ground-truth *circularity* | `fc14c01` (2026-07-13) | test deleted `7334c793`/`3b5956d0`; `rg` for Sharma/anchors/lindbloom in `test/` → none; `test/v4-color-behavior.test.ts:66` reinstates a formula-derived expectation. Unnamed in CARRY-LEDGER and all V-PRIME specs |
| 2 | **U-F42 the three armed `test.fail()`** (B6 STILL-BOOKED) | `637686c` | still ship at `o16:34`/`o26:57`/`o5:48`; both named flip triggers have fired/been superseded; **and the CI that would run them was deleted**. Named nowhere in live V |
| 3 | **U-F74 `{gamut:'raw'}`** raw-OOB-channel escape hatch | `d40e04c` (LIB-G10 GREEN) | `src/color/model.ts:45` + `operations.ts:316` expose no `'raw'`; capability gone; unnamed anywhere |
| 4 | **U-F14 `proof:perf-target`** — the flagship dist perf gate | `b3f4f76` | `scripts/gates/proof-perf-target.mjs` deleted `164343c1`; no successor; unnamed in CARRY-LEDGER/V-PRIME |
| 5 | **U-F65 lint-depth rationale** — the row's entire deliverable | `a31f2d1` | its sole host `CLAUDE.md` deleted at `164343c1` (163 lines); text exists nowhere in the tree |
| 6 | **U-F73 Sharma CIEDE2000 34-pair table** | `fc14c01` | test deleted; subject code also cut (mitigating), but **no document records the supersession** |

### Adjacent, near-silent

- **B13** (U-F36 impersonation + U-F38 token-at-rest **live** confirms): W56 carries "deploy + M3
  live-wire headers" — the **headers** half (B12) only. The auth half is in no live spec.
- **U-F50 history-rewrite book** ("owner-decidable"): carried nowhere.
- **U-F75 precept pin-advance book**: carried nowhere.
- **U-F52's two deferred artefacts** are still untracked on disk today (`git status` `??`).

---

## §6 — Chronics / disease rows

### 6.1 The real-GPU oracle — SIX closes, FOUR names. The disease row of this repository.

| Close | Name it wore | Disposition |
|---|---|---|
| **N** | `X14 SwiftShader harness residual` | BOOK (`N/WAVES-2.md:110,185`; `N/waves/N.W9-prime.md:410`) |
| **R** | `R8-22 · X14 SwiftShader e2e harness residual` | **carry** (`R/audit/pass1/R8-DEFERRED.md:111`) |
| **S** | recorded caveat — all frame budgets measured under SwiftShader | `S/audit/w3-frame-budget-measure.md:61-67` |
| **T** | `O-3 real-GPU` / "the sanctioned headed-GPU class" | **2 MISS-RECORDED**; "real-GPU annex **hands to U-F54**" (`T/FINAL.md:62,382,431`) |
| **U** | `U-F54 real-GPU-visual-oracle-never-run` / **B8** | `complete_with_misses`; gate = "an owner-attested / real-GPU frame" |
| **V** | `CH-7: the real-GPU oracle RUNS` | W55 — **unexecuted** (frontier is W46) |

It has never run. Each close renamed it and re-deferred it with a fresh gate. `e2e/smoke/oracles/o3-headed-gpu-probe.spec.ts` is in the tree and, since the CI collapse, is not executed by anything.

### 6.2 Q14 / LCP ~5s — three closes

T (`Q14 RULED ESCALATION`, LCP 5141 / TBT 5988) → U-F3 (`escalate`, delivered-as-structural-fact) →
V `CH-4` (W55: *"p75 LCP ≤2.5s … the ~5s boot dies or V′ does not close"*) — unexecuted. Meanwhile the
enforcing runner was deleted, so the metric is now not even observed.

### 6.3 T.W8 HG6 taste verdict — three closes, still literally empty

`docs/tranches/T/audit/w8-certification/VERDICT-2026-07-12.md:33`:

```
> _(empty — the owner's verdict lands here)_
```

T.W8's own gate row: *"A package delivered but unruled leaves the wave OPEN, honestly."* T closed
CLOSE-READY anyway; U routed it to `annex-packet.md §6` (a STUB pointer); V carries it as one line
(`CARRY-LEDGER.md:40` — "B5 — the U-era owner packet P1..P8 (incl. T HG6): owner-held"). Un-ruled
across three closes.

### 6.4 The `proof:*` gate idiom — killed twice, reborn once

Owner ruling 2026-06-02: *"overfit junk," deleted, "Never re-introduce."* → U mints 11 new
`proof-*.mjs` + a 10-gate `test:dist` (2026-07-13) → V.W42 deletes them under **"prune proof-theater"**
(`6d6d3521`, `164343c1`). U's close verdict is built on an idiom the owner had already banned.

### 6.5 Test-ground-truth circularity — cured at U, restored at V

U-F72 cured "the round-trip-only blindness" with external vectors. The v4 cut deleted them;
`test/v4-color-behavior.test.ts:66` now asserts `(byte/255)/12.92` — the implementation's own formula.
The V·π parser proof gate independently re-found the same disease class in the parser
(*"coverage RED 0-of-52 TOTAL"*). Same defect, two subsystems, two names.

### 6.6 The three-way `B`-series alias collision (a chronic-tracing hazard, not a defect per se)

Three unrelated `B1..Bn` namespaces are live simultaneously:

1. U's **book-register B1..B14** (`U/FINAL.md §BOOKS`)
2. V-formation's **RF-29 adversary findings B1..B10** (`V/audit/REFORMATION-2026-07-16.md:87`)
3. V-PRIME's **owner brackets B1..B5** (`V-PRIME.md:108-111`, `CARRY-LEDGER.md:40`)

`CARRY-LEDGER.md:40` says "**B5** — the U-era owner packet P1..P8" (bracket-B5) while U's B5 is
"barrel/size gates" and RF-29's B5 is "11GB stale worktrees." Any future reader tracing "B5 forward"
lands on the wrong row. Add `O-5` (U oracle vs V mail id) and `W4`/`W40`-series to the collision set.
**The next tranche should namespace-prefix carried identifiers (`U:B5`, `RF29:B5`, `V':B5`).**

---

## §7 — Vacuous-gate register

For each, the question asked was: *what exact input makes this RED?*

| Gate | Where | Why it cannot fail as advertised |
|---|---|---|
| **G-CLOSE-1 `proof:close-ledger`** | `a113eebf:scripts/gates/proof-close-ledger.mjs` | **Proven by execution (§2).** A ledger row beyond F77 is undetectable (`for (let i=1; i<=77; i++)` at `:131`,`:139` — while the header at `:11-15` claims the opposite). All 77 evidence cells replaced by the word `DEFERRED` → GREEN. It checks markdown row-presence and eight keywords; it never validates a commit, file, or behaviour. |
| **G-CLOSE-3 `attested-not-verified`** | `proof-close-ledger.mjs:264-276` | Passes if four regexes (`/NCSU|X2/i`, `/TBT/i`, `/cure-ownership|test\.fail|O-16|O-26|O-5/i`, `/deploy-webhook/i`) match anywhere in the section. Prose containing the words passes. Cannot distinguish an honest caveat from a resolved claim. |
| **G-CLOSE-5 "GREEN-on-presentation"** | `FINAL.md §verdict`, B14 | The gate is satisfied by *presenting* a publish packet. `FINAL.md:345` states outright "an un-taken cut is NOT a defect." No input makes it RED except failing to write the document. |
| **G-CLOSE-4 `complete_with_misses`-frame-named** | `annex-packet.md §7` | Satisfied by *naming* each owner-attest obligation. Naming an unrun oracle is the pass condition. This is precisely how U-F54 has ridden six closes. |
| **§BOOKS completeness** | `proof-close-ledger.mjs:277-283` | `for (let i=1;i<=14;i++) new RegExp("\\bB"+i+"\\b").test(books)` — the literal token `B7` anywhere in the section passes. Outcome content is unchecked. |
| **B5 "two STANDING CI-wired guards"** | `FINAL.md:278` | `proof:size-graph` was never in `test:dist`; it was one standalone step (`ci.yml:188`). Both scripts have since been deleted. A "standing guard" with a 4-day lifespan. |
| **lighthouserc LCP/CLS/TBT assertions** | `lighthouserc.json:12,13,15` | Config is strict (`error`, 2500 ms). **No workflow invokes Lighthouse** (`rg "lighthouse\|lhci" .github/workflows/` → 0). Strict thresholds with no runner: unfalsifiable. |
| **The three `test.fail()` "tripwires"** | `o16:34`, `o26:57`, `o5:48` | A `test.fail()` inverts the assertion: the test passes *because* the code is broken and would fail if fixed. U-F42 correctly named this "vacuous-ci-tripwire" — then **left all three armed**, and V removed the CI that ran them. Now vacuous twice over. |

---

## §8 — Other close-class lies checked

- **Declared captures missing on disk** — I sampled hard and U comes out **well**. Every π/frame
  directory cited exists with real content: `audit/w-a11y/pi/` (30 PNGs), `audit/w-visual/frames/`
  (48 PNGs), `audit/w-visual/pi/gate/` (16 PNGs + probe logs + `gate-probe-log.json`),
  `audit/w-perf/pi/` (6 JPGs + `cls-delta-record.md`), `audit/w-close/{annex-packet,book-register,
  publish-presentation,relay-close}.md`, `audit/w-perf/u-f3-escalate.md`,
  `audit/sec/F41-ncsu-origin-escalate.md`, `audit/canon/q4-well-amendment.md`. **No fabricated
  artefact found.** The one declared-empty capture (`T/.../VERDICT-2026-07-12.md`) is honestly
  declared empty and *is* empty.
- **Masked fallbacks** — the dominant pattern here is not `try/catch` but **masking by subtraction**:
  strict configs retained while their runners are deleted (`lighthouserc.json`, all e2e specs, the
  three `test.fail()` tripwires). The artefact reads strict; nothing enforces it.
- **Alias smuggling** — **none found in U.** U-F29's "no alias" claim held (`parseCSSSubValue` survives
  only as a `CHANGELOG.md:303` history line). U-F26's `safeAccentAgainstSurface` → `safeAccentColor` is
  a v4-cut rename with the consumer migrated, not a compat shim. U-F37's residual was *relocated*
  (`api/CLAUDE.md` → `api/compose.yaml`) with its test retargeted, not shimmed.
- **Per-mechanism green over gestalt broken** — this is U's structural signature. U ran ten waves that
  each closed on their own gates. Four days later V.W44's charter records the product state:
  *"Born-RED: **the app is blank today**"* (`V-PRIME.md:83`). Every U wave was green; the app did not
  mount. U's own `EXECUTION-STATE.md:130` even carried a standing probe on the v5 tag while never
  probing whether the demo booted. The gestalt was never a U gate.
- **Partial counted as done** — B5 is the exemplar: two guards where one was never in the chain U said
  it was in, both discharged as "**LANDED** — GREEN on the tree," both deleted within the week.

---

## §9 — What the next tranche must consume from U

Ordered by risk. None of these appear in `CARRY-LEDGER.md`, which the next formation is instructed to
consume WHOLE.

1. **U-F54 / B8 real-GPU oracle** — six closes, four names, never run. Either run it or **terminally
   retire it with an owner ruling**. It must not receive a fifth name.
2. **U-F42 / B6 — the three armed `test.fail()`** at `o16:34`, `o26:57`, `o5:48`. Their flip triggers
   fired. Flip them, delete them, or re-arm them with a live gate.
3. **The CI hole.** 720 → 71 lines. Zero e2e, zero Lighthouse, zero a11y in CI. U's `unrun projects
   4→0` is now `all unrun`. The 84 e2e specs in `e2e/smoke/` are dead weight until W55.
4. **U-F72 conversion ground truth.** Restore external reference vectors, or accept that
   `convertColor` is validated only against its own formulas (`test/v4-color-behavior.test.ts:66`).
5. **The owner-attest slate** — OA-1..OA-6, OA-B1, OA-B2, and the **U-F12 Pole A/B bracket** (never
   picked). The cut-gated pair OA-B1/OA-B2 had its gate fire twice (glass-ui v5.0.0 2026-07-15,
   v7.0.0 2026-07-17) without discharge.
6. **U-F39 `_headers`** — re-derive the CSP against the post-W43/W44 resource graph. Its current
   derivation cites three paths that no longer exist, and W54 mandates dropping `'unsafe-inline'`.
7. **B11 (NCSU), B13 (deployed auth confirms), U-F50 history-rewrite, U-F75 pin-advance** — four
   books with no live carrier.
8. **U-F74 `{gamut:'raw'}`** — decide: restore the raw-channel escape hatch on the v4 surface, or
   record its retirement.
9. **U-F31/F32/F33** — UNVERIFIED. Assert on the built dist: `rotate(45deg)`→`rotateZ`,
   `calc(sin(30deg)*100px)`→`50px`, positioned-gradient-stop round-trip.
10. **Namespace the carried identifiers** (§6.6). Three live `B1..Bn` series is a chronic-laundering
    machine.
11. **Do not accept a document-parsing gate as a zero-drop proof again.** §2 is the reproduction.

---

## §10 — Verdict

Tranche U was **genuinely executed and unusually honest in its prose**. Its
`§attested-not-verified` section is the best instance of close-honesty in this repository: it named
four claims it could not verify and refused to launder them. Its π capture discipline is real. It
smuggled no aliases.

Its failure is structural, and it is threefold:

1. **The proof of the honesty was theatre.** G-CLOSE-1 cannot fail for any 78th commitment and accepts
   the word `DEFERRED` as terminal evidence — demonstrated by execution, not inference. "Zero silent
   drops," the phrase the close is built on, is unsupported by the mechanism cited to support it.
2. **Nine per-mechanism greens over a gestalt nobody ran.** Ten waves closed green; four days later the
   successor's charter records the app as blank.
3. **The successor deleted the work and booked the deletion against nothing.** 11 gate scripts, 4 test
   guards, 649 lines of CI, and one `CLAUDE.md` disappeared without a single V document naming the U
   rows they reversed — and the file declared "the complete fold-forward inventory" contains zero U
   identifiers.

**U's real close status is `complete_with_misses` on a slate of 104 commitments, of which 35 of 77
families are verifiably effective today, 20 are still open, 6 were silently dropped, and 5 were
re-booked under new names.**
