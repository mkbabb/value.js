# F.W4 close-audit Lane 4 — idiomatic-gestalt

**Branch**: `tranche-f`
**HEAD at dispatch**: `cf42c6c63f39458ccf4bbbd223bf8d7593418ab1` (F.W3 close).
**Date**: 2026-05-21.
**Lane scope** (per `docs/tranches/F/waves/F.W4.md` audit-lane 4): verify F1, F2, F3, F4 invariants + inherited E1-E5 + D1-D7 + precept invariants 30-33 + the 9 standing mandates all hold post-F.W3.
**Posture**: READ-ONLY. This document is the SOLE write.

---

## 0. HEAD provenance

```
$ git rev-parse HEAD
cf42c6c63f39458ccf4bbbd223bf8d7593418ab1

$ git branch --show-current
tranche-f
```

F-window commit set (8 commits, `188bd6b..cf42c6c`):

| # | SHA | Wave | Subject |
|---|-----|------|---------|
| 1 | `188bd6b` | F open | `docs(tranche-f/open): open Tranche F — "No deferrals" + post-W12 substrate hygiene + lerpLegacy retirement (planning-only)` |
| 2 | `419ce84` | F.W0 Lane A | `fix(demo/w0): migrate dock-menu Github icon off W9-C @lucide/vue rename` |
| 3 | `bdfecf2` | F.W0 Lane B+C | `docs(tranche-f/w0): state-at-open + W8-W12 back-reference + coord refresh + gh-pages unblock evidence` |
| 4 | `6c6c0ea` | F.W1 Lane A | `refactor(library/w1): strengthen memoize type signature; @ts-ignore drops to zero in src/` |
| 5 | `f0d6aab` | F.W1 Lane B | `chore(build/w1): adopt Rolldown declarative codeSplitting` |
| 6 | `1401d75` | F.W1 Lane C | `chore(demo/w1): zero-consumer shadcn-vue subdir sweep + VENDOR-POLICY refresh` |
| 7 | `df0650c` | F.W2 | `docs(tranche-f/w2): keyframes.js codemod applied — both lerp sites migrated; F2 (c) trigger SATISFIED` |
| 8 | `1ead49e` | F.W3 Lane A | `feat(library/w3)!: delete lerpLegacy — F2 invariant satisfied + v0.8.0 BREAKING` |
| 9 | `cf42c6c` | F.W3 Lanes B+C+D+E | `feat(ci/w3): CI substrate hygiene — broaden CHANGELOG-gate + tighten vue-tsc + dts-shape guard + bundle-size gate` |

All 9 commits by Mike Babb <mike7400@gmail.com>. ZERO agent-attributed git mutations in the F window.

---

## 1. F1 — "No deferrals" as binding (Q.md §5 (c) triggers TIME-BOUND)

Aggregate ledger row-by-row (per `docs/tranches/F/coordination/Q.md §5`):

| Row | Disposition | (c) trigger | TIME/EVENT-bound? |
|---|---|---|---|
| lerpLegacy retirement | FOLD-INTO-F.W3 Lane A | "F.W2 close (codemod applied + tests PASS) → unblocks F.W3 delete" | **TIME-BOUND** (wave-bound) |
| 7 glass-ui primitive asks | PEER-AUTHORSHIP — sharpened | "Re-check at each F wave-close; final F.W4 close" | **TIME-BOUND** (wave-bound) |
| Contract-v2 §2.1 font-asset residual | PEER-AUTHORSHIP — glass-ui font-inlining | "F.W4 close" | **TIME-BOUND** (wave-bound) |
| keyframes.js precept-pin drift | PEER-AUTHORSHIP | "F.W2 close (post-cross-repo-write)" | **TIME-BOUND** (wave-bound) |
| CW Phase-2 readiness | CARRY-FORWARD with TIME-BOUND (c) | "User explicit signal OR speedtest CW Phase-2 ship" | **EVENT-BOUND** (concrete, not vague "later") |
| Vite/Rolldown manualChunks declarative | FOLD-INTO-F.W1 Lane B | "F.W1 close" | **TIME-BOUND** (wave-bound) |
| `Github` lucide alias-hygiene | FOLD-INTO-F.W0 Lane A | "F.W0 close" | **TIME-BOUND** (wave-bound) |
| W8-W12 back-reference doc | FOLD-INTO-F.W0 Lane B | "F.W0 close" | **TIME-BOUND** (wave-bound) |
| `@ts-ignore` strengthening | FOLD-INTO-F.W1 Lane A | "F.W1 close" | **TIME-BOUND** (wave-bound) |
| Zero-consumer shadcn-vue subdir sweep | FOLD-INTO-F.W1 Lane C | "F.W1 close" | **TIME-BOUND** (wave-bound) |
| CHANGELOG-changed gate broadening | FOLD-INTO-F.W3 Lane B | "F.W3 close" | **TIME-BOUND** (wave-bound) |
| vue-tsc baseline lowering 126→120 | FOLD-INTO-F.W3 Lane C | "F.W3 close" | **TIME-BOUND** (wave-bound) |
| dts-shape invariant guard | FOLD-INTO-F.W3 Lane D | "F.W3 close" | **TIME-BOUND** (wave-bound) |
| Bundle-size gate | FOLD-INTO-F.W3 Lane E | "F.W3 close" | **TIME-BOUND** (wave-bound) |
| proof:resolution types-key probe | FOLD-INTO-F.W3 Lane F (optional) | "F.W3 close" | **TIME-BOUND** (wave-bound) |

The §2 sharpened triggers for the 7 glass-ui primitive asks each say "F orchestrator re-reads `glass-ui/docs/tranches/*` at each F wave-close; if primitive-expansion tranche-open detected, sync (c) here. Final re-check: F.W4 close." — all wave-bound. The §3.4 keyframes.js precept-pin trigger says "F.W2 close — after the codemod-application cross-repo write completes, re-check ... If converged, the residual closes. Else, the (c) trigger sharpens to next-tranche-open OR to a calendar checkpoint TBD." — wave-bound with explicit escalation path.

**Violations**: 0.

**F1 verdict: PASS.** Every PEER-AUTHORSHIP / CARRY-FORWARD row carries a TIME-BOUND or EVENT-BOUND (c) trigger. Zero vague "later" deferrals.

---

## 2. F2 — `lerpLegacy` retires

```
$ grep -rn '@deprecated' src/
(0 matches)

$ grep -rn 'lerpLegacy' src/ test/ dist/
(0 matches)
```

`dist/` was rebuilt at F.W3 Lane A (`1ead49e`) per `npm run build` evidence in the commit body; `stat -f '%m' dist/value.js src/units/normalize.ts` confirms `dist/` is fresher than the most recently touched `src/` file. ESM-only output (no `value.cjs` per `package.json` `exports` map: `"import": "./dist/value.js", "default": "./dist/value.js"`).

Keyframes.js cross-repo state:

```
$ git -C /Users/mkbabb/Programming/keyframes.js log -1 --format='%H %s'
470814eaeb32cbb5cb2a689a0b1a6c997f147c8d fix(animation): migrate lerp call sites to value.js v0.7.0 (a, b, t) order

$ grep -n 'lerp(' /Users/mkbabb/Programming/keyframes.js/src/animation/numeric.ts
159:            (this.result as Record<string, number>)[seg.keys[i]!] = lerp(

$ grep -n 'lerp(' /Users/mkbabb/Programming/keyframes.js/src/animation/group.ts
251:                                existing.value = lerp(
```

Both call sites verified canonical `(a, b, t)`: `numeric.ts:159` passes `(seg.startVals[i]!, seg.stopVals[i]!, eased)`; `group.ts:251` passes `(existing.value, incoming.value, layer.weight)`.

**F2 verdict: PASS.**

---

## 3. F3 — Cross-repo write boundary

Single F-window cross-repo write: keyframes.js commit `470814e` (F.W2 Lane A codemod application).

```
$ git -C /Users/mkbabb/Programming/keyframes.js log --since="2026-05-19" --oneline
470814e fix(animation): migrate lerp call sites to value.js v0.7.0 (a, b, t) order
d312517 fix(keyframes.js/W12-unblocker): repair 2 source TS errors so API Extractor emits real dist/keyframes.d.ts
[…]
```

Only `470814e` is in the F window (post-2026-05-20). Working tree clean (`git -C keyframes.js status --short` → empty).

Glass-ui activity during F window (+14 commits since F open) — verified all 14 are AJ-tranche publisher-authored (Mike Babb / AJ-W2..W6 subjects), NOT value.js-authored. Value.js made zero writes to glass-ui.

Speedtest activity during F window (+15 commits since F open) — all AJ-tranche close ceremony + AJ-W6 consumer LOCKSTEPS. Value.js made zero writes to speedtest.

Fourier-analysis: ZERO new commits; 109-file dirty tree exact (per F-AUDIT-4 §1 enumeration). Value.js made zero writes.

Precepts submodule pin: `68d9b20b56e420b0336733a82a10a909b4c6a69c` — ZERO drift since F open.

`git reflog --since="2026-05-20"` reviewed: 9 commits + 1 `reset: moving to HEAD` (post-`F.W3 Lane A`, re-staging artefact) + 1 checkout op. No unauthorized mutations. `git stash list` is empty.

**F3 verdict: PASS.** The codemod-application cross-repo write is the SOLE cross-repo mutation in F's window; the boundary's published-codemod exception path is honored.

---

## 4. F4 — W8-W12 back-reference + tranche-discipline

```
$ wc -l docs/tranches/F/W8-W12-consumer-lockstep.md
139 docs/tranches/F/W8-W12-consumer-lockstep.md
```

139 LoC > 100 threshold.

The doc's posture statement (line 7): "**Posture (per F4 invariant)**: value.js-side back-reference doc, no full tranche envelope."

The forward-going protocol (line 15): "F4 codifies this going forward: future cross-repo lockstep work either gets its own value.js-side tranche envelope AT THE TIME of the work (with planning-only at open + close-merge ceremony per the precepts-codified tranche development model), OR records its gates + close-honesty checklist in a back-reference doc AT THE TIME of the work — not retroactively. F.W0 Lane B is the singular retroactive exception that closes the W8-W12 gap; future windows respect F4."

Sub-tranche-naming protocol codified at line 76; structural-discipline-gap closure at line 78 + 100.

**F4 verdict: PASS.**

---

## 5. Inherited E1-E5

### E1 — Architectural transposition

F lands 3 transpositions per F-AUDIT-5 §5:

| Transposition | Commit | Evidence |
|---|---|---|
| `@ts-ignore` strengthening via typed memoize signature | `6c6c0ea` (F.W1 Lane A) | `grep -rn '@ts-ignore' src/` → 0 matches |
| Rolldown declarative codeSplitting (Vite 9 future-proofing) | `f0d6aab` (F.W1 Lane B) | `vite.config.ts` carries declarative chunk groups |
| Zero-consumer shadcn-vue subdir sweep + VENDOR-POLICY refresh | `1401d75` (F.W1 Lane C) | demo tree contracts; VENDOR-POLICY.md updated |
| (+ Github lucide brand-icon migration — F-AUDIT-3 chronic) | `419ce84` (F.W0 Lane A) | gh-pages chronic closed |

E1 verdict: **PASS.**

### E2 — NO LEGACY CODE (sharpened as F2)

Satisfied per §2. `grep -rn '@deprecated' src/` = 0. `grep -rn 'lerpLegacy' src/ test/ dist/` = 0.

E2 verdict: **PASS** (via F2 satisfaction).

### E3 — Pipeline parity (api/)

```
$ git log 188bd6b..HEAD --name-only --format='' | grep '^api/' | sort -u
(empty)
```

Zero F-window writes to `api/`. The api/ substrate is intact at the E.W2 closure state.

E3 verdict: **PASS.**

### E4 — Standing audit cadence

F open: 6 audit lanes (`F-AUDIT-1` … `F-AUDIT-6`, all in `docs/tranches/F/audit/`).
F.W4 close: 7 close-audit lanes per `docs/tranches/F/waves/F.W4.md §"Read-only close audit lanes (7)"` (plan-vs-actual, substrate-without-consumer, doc-drift, idiomatic-gestalt, performance, visual-runtime, integrity-sweep).

E4 verdict: **PASS.**

### E5 — Sharpened deferral (extended as F1)

Satisfied per §1. All deferred items either (a) closed inside F or (b) carry a TIME-BOUND or EVENT-BOUND (c) trigger.

E5 verdict: **PASS** (via F1 satisfaction).

---

## 6. Inherited D1-D7 (spot-check)

| Invariant | Check | Result |
|---|---|---|
| **D7 — no nested ValueUnit/Color** | `grep -rn 'new ValueUnit(.*new ValueUnit' src/` + `grep -rn 'new Color.*new Color' src/` | 0 matches both |
| **No god modules added** | `git diff --stat 188bd6b..HEAD -- 'src/'` net | **−12 LoC** (3 files: `index.ts −1`, `math.ts −14`, `utils.ts +7/−4 net +3`); library SHRANK |
| **Named exports only** | `grep -rn '^export default' src/` | 0 matches |
| **No @ts-ignore** | `grep -rn '@ts-ignore' src/` | 0 matches (F.W1 Lane A landed) |
| **No TODO/XXX/FIXME beyond pre-F** | `grep -rn 'TODO\|XXX\|FIXME' src/` | 0 matches (clean) |
| **`import type` discipline** | strict via `tsconfig.json verbatimModuleSyntax: true` | enforced by toolchain |
| **No legacy patterns reintroduced** | `lerpLegacy` / `@deprecated` greps | 0 matches |

D1-D7 verdict: **PASS.**

---

## 7. Precept invariants 30-33

| # | Precept | Verification | Verdict |
|---|---|---|---|
| 30 | Contract-v2 dev-resolution (every `@mkbabb/*` package's `exports` map resolves correctly across the constellation) | `npm run proof:resolution` → `PASS — contract-v2 dev-resolution contract satisfied across the constellation` | **PASS** |
| 31 | Component props fail-explicit | Vue-scope (demo/), out-of-band for F.W3 Lane A delete; the F-window changes are demo lucide-icon swap + library deletion, no component-prop API surface mutated | **N/A (out-of-scope)** — no demo component-prop surface mutations in F window |
| 32 | Phantom-class corpus-grep gate (proof-phantom-classes.mjs) | F made no CSS class retirals in glass-ui or demo/ tree; the F.W3 Lane A delete is a JS symbol (not a CSS class), and is a value.js-side library symbol with no fleet phantom-class corpus implication | **N/A (out-of-scope)** — no CSS class retirals in F window |
| 33 | Dead-code-removal corpus-grep gate (pre-deletion grep evidence in commit body) | The F.W3 Lane A `lerpLegacy` delete commit `1ead49e` body carries the explicit pre/post grep evidence table (`@deprecated in src/` 1→0, `lerpLegacy in src/` 2→0, `lerpLegacy in test/` 0→0, `lerpLegacy in dist/value.js` 1→0, `lerpLegacy in dist/math.d.ts` 1→0). The corresponding audit doc `docs/tranches/F/audit/F.W3-lane-a-lerplegacy-delete.md` carries the same evidence with `$ grep` invocations transcribed. The dead-code-removal gate's spirit (corpus grep proves zero remaining references before delete) is honored. | **PASS** |

Precept-30-33 verdict: **PASS** (30 + 33 actively exercised; 31 + 32 out-of-scope by F-window changes — N/A is not a violation).

---

## 8. 9 standing mandates (per F-PROMPTS.md §3)

| # | Mandate | Spot-check | Verdict |
|---|---|---|---|
| 1 | NO quick solutions, NO workarounds: idiomatic, gestalt approaches | F.W1 Lane A's memoize-typing transposition replaces a single `@ts-ignore` with proper generics → exactly the idiomatic move; F.W3 Lane A's lerpLegacy delete is the gestalt-level resolution (not a soft retire) | **PASS** |
| 2 | NO legacy code (sharpened as F2) | `grep -rn '@deprecated\|lerpLegacy' src/` = 0; verified | **PASS** |
| 3 | DRY / KISS | F.W1 Lane C zero-consumer shadcn-vue sweep removes dead subdirs (DRY); F.W1 Lane B Rolldown declarative codeSplitting replaces hand-tuned chunk arrays (KISS) | **PASS** |
| 4 | Architectural transpositions are necessary and desirable | 3 transpositions landed in F.W1 alone (Lanes A+B+C); each carries a "necessary OR desirable" rationale | **PASS** |
| 5 | Run linting and type checking at every interval | Per F.W3 Lane A commit body: `npm run lint exit 0`, `vue-tsc --noEmit 0 errors`; F.W3 Lane C tightens the vue-tsc baseline to 120 with CI gate | **PASS** |
| 6 | DEEPLY audit with N agents in parallel | 6 audit lanes dispatched at F open (`F-AUDIT-1..6`); 7 close-audit lanes at F.W4 (this is Lane 4 of 7) | **PASS** |
| 7 | Tranche development only / planning-only at open | F open commit `188bd6b` subject ends "(planning-only)"; first execution F.W0 commits `419ce84` + `bdfecf2` opened only after explicit user authorization (per `F-PROMPTS.md §2.9`) | **PASS** |
| 8 | Chronically deferred items must be folded | Per `findings.md §2` + Q.md §5: 15 ledger rows; all FOLD-INTO rows landed at their scheduled wave-close, all PEER-AUTHORSHIP rows carry sharpened wave-bound (c) triggers | **PASS** |
| 9 | Recapitulate every prompt | F-AUDIT-1 catalogs 20 distinct user prompts; F-PROMPTS.md §2.8 records "F-AUDIT-1 §6 zero-deferral verdict: HONORED at F open" | **PASS** |

9-mandate verdict: **PASS.**

---

## 9. Post-F.W3 library-shape spot-check (no bolt-ons)

```
$ git diff --stat 188bd6b..HEAD -- src/
 src/index.ts |  1 -
 src/math.ts  | 14 --------------
 src/utils.ts | 11 +++++++----
 3 files changed, 7 insertions(+), 19 deletions(-)
```

Net library delta: **−12 LoC across 3 files**. F is net-contraction at the src/ level, exactly per the F-thesis ("no deferrals" + lerpLegacy retirement).

Largest src files (LoC) at F close:

```
1430 src/units/color/utils.ts        (pre-F; unchanged in F)
 736 src/units/constants.ts          (pre-F; unchanged in F)
 618 src/units/color/index.ts        (pre-F; unchanged in F)
 615 src/parsing/color.ts            (pre-F; unchanged in F)
 541 src/transform/decompose.ts      (pre-F; unchanged in F)
```

No new god modules introduced. `src/utils.ts` grew by +7/−4 (net +3 LoC) — within tolerance for typed-memoize signature strengthening (F.W1 Lane A).

`grep -rn 'TODO\|XXX\|FIXME' src/` → 0 matches.

No half-done work detected. F1 binds: every fold-in landed at its scheduled wave; every peer-authorship ask carries a sharpened wave-bound (c) trigger.

---

## 10. Working-tree health

```
$ git status --short
?? docs/tranches/C/
```

The sole untracked entry is `docs/tranches/C/` — orphan tranche directory created out-of-band; not part of the F-window working set. Not a violation (untracked, not modified).

```
$ git stash list
(empty)
```

`docs/precepts` submodule pin unchanged at `68d9b20`. Working tree health: clean.

---

## 11. Aggregate verdict

| Invariant | Verdict |
|---|---|
| F1 — No deferrals (Q.md §5 TIME-BOUND triggers) | **PASS** |
| F2 — lerpLegacy retires | **PASS** |
| F3 — Cross-repo write boundary | **PASS** |
| F4 — W8-W12 back-reference + tranche-discipline | **PASS** |
| E1 — Architectural transposition | **PASS** |
| E2 — NO LEGACY CODE (via F2) | **PASS** |
| E3 — Pipeline parity (api/) | **PASS** |
| E4 — Standing audit cadence | **PASS** |
| E5 — Sharpened deferral (via F1) | **PASS** |
| D1-D7 — Architectural discipline | **PASS** |
| Precept 30 — contract-v2 dev-resolution | **PASS** |
| Precept 31 — component props fail-explicit | **N/A (out-of-scope)** |
| Precept 32 — phantom-class corpus-grep | **N/A (out-of-scope)** |
| Precept 33 — pre-deletion corpus-grep gate | **PASS** |
| 9 standing mandates | **PASS** |

**Aggregate verdict: PASS.** All applicable invariants hold post-F.W3. No bolt-ons, no half-done work, no vague "later" deferrals, no unauthorized cross-repo writes, no agent-attributed git mutations.

---

## 12. Flags

**None.**

- Precept 31 + 32 marked N/A on the strict grounds that F's library-and-demo changes did not exercise their domains (no Vue component-prop API changes; no CSS class retirals). Not a violation; the precepts simply have no surface to gate in the F window.
- The CW Phase-2 (c) trigger is EVENT-BOUND ("user signal OR speedtest CW Phase-2 ship") rather than wave-bound. This is concrete and bounded per the F1 wording ("TIME-BOUND, not vague 'later'") — event triggers with named concrete events satisfy the binding. Flagged for transparency, not as a defect.
- The cross-repo write (keyframes.js `470814e`) is LOCAL ONLY per F.W2 Lane B step 3 (maintainer holds push authority). Not a violation; the F2 (c) trigger fires on `npm test` PASS, not on origin push.

---

## 13. Cross-references

- `docs/tranches/F/F.md §2` — F1-F4 invariants codified.
- `docs/tranches/F/F-PROMPTS.md §3` — 9 standing mandates verbatim.
- `docs/tranches/F/coordination/Q.md §5` — aggregate ledger with (c) triggers.
- `docs/tranches/F/W8-W12-consumer-lockstep.md` — F4 substrate.
- `docs/tranches/F/audit/F.W3-lane-a-lerplegacy-delete.md` — F2 satisfaction evidence.
- `docs/precepts/cross-repo-dev-resolution.md` — precept 30 (contract-v2).
- `docs/precepts/instructions/LESSONS-LEARNED.md` (lines 585-587, 605) — precepts 31, 32, 33.
- `scripts/proof-resolution-contract.mjs` — precept 30 gate.
