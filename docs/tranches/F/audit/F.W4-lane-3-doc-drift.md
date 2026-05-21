# F.W4 — Lane 3 — Doc-Drift Close-Audit

**Date**: 2026-05-21
**Branch**: `tranche-f`
**HEAD at audit**: `cf42c6c` (F.W3 close — CI substrate hygiene)
**Lane**: F.W4 audit lane 3 (per `docs/tranches/F/waves/F.W4.md` §"Read-only close audit lanes (7)").
**Mode**: READ-ONLY. Findings list actionable drift fixes for the close ceremony; this lane does NOT itself apply fixes.

---

## §0 — Procedure summary

Cross-checked the live tree at `cf42c6c` against the following documentation surfaces:

1. Root `CLAUDE.md` (project-instruction surface).
2. `demo/CLAUDE.md` (demo-tree surface).
3. `api/CLAUDE.md` (api-tree surface).
4. `docs/tranches/F/F.md` §0, §3, §7.
5. `docs/tranches/F/PROGRESS.md` — Wave log table + Open dependencies.
6. `docs/tranches/F/waves/F.W0.md` … `F.W3.md` (historical wave specs).

Reality probes run:

| Probe | Result |
|---|---|
| `npx vitest run` | **1584 passed / 34 files** |
| `find e2e -name '*.spec.ts' \| wc -l` | **35 specs** |
| `playwright.config.ts` projects | **5** (`smoke`, `smoke-admin`, `smoke-mobile`, `smoke-reactivity`, `smoke-safari`) |
| `npx vue-tsc --noEmit \| grep -c 'error TS'` | **0** (was 126 at E.W4; 118 at F.W0 close; 0 post-F.W1 Lane C; CI gate hardened to 0 at F.W3 Lane C) |
| `grep -rn lerpLegacy src/ test/ demo/` | **0** matches (purged at F.W3 Lane A) |
| `grep -rn '@deprecated' src/` | **0** matches |
| `package.json#version` | `0.7.0` (to be bumped → `0.8.0` at close ceremony) |
| `find demo/@/components/ui -mindepth 1 -maxdepth 1 -type d` | **22 subdirs** (was 51 pre-F.W1 Lane C; 29 deleted) |
| `dist/` artifacts | `dist/value.js` (ESM only — NO `value.cjs`), flat `*.d.ts` layout per W12-unblocker (`dist/index.d.ts`, `dist/math.d.ts`, …) |

---

## §1 — Per-doc verdicts

### 1.1 — Root `/Users/mkbabb/Programming/value.js/CLAUDE.md`

**Verdict**: MOSTLY ACCURATE with 3 drift items (1 build-command, 1 vendor-policy reference, 0 lerpLegacy — root CLAUDE.md does NOT carry the lerpLegacy mention; the prompt's claim was incorrect, the mention is in `demo/CLAUDE.md` only).

| Line | Surface | Reality | Drift kind |
|---|---|---|---|
| Line 8 | `npm run build        # library → dist/value.js + value.cjs + value.d.ts` | Build emits ESM-only `dist/value.js` + flat `dist/*.d.ts` (`index.d.ts`, `math.d.ts`, `easing.d.ts`, `utils.d.ts` + per-subdir dirs). NO `value.cjs`. NO `value.d.ts` — the barrel typings live at `dist/index.d.ts` per package.json `types` key. | Mild — pre-W12 description; post-W12 layout is flat. |
| Line 17 | `~1580+ tests across ~34 files` | 1584 / 34 — matches the spirit ("~"). | OK as-is; the existing disclaimer at lines 23-25 explicitly defers exact counts to per-tranche `FINAL.md`. NO fix needed for line 17. F's FINAL.md should pin 1584/34. |
| Line 18 | `~20+ specs across 3 projects` | 35 specs across 5 projects (smoke + smoke-admin + smoke-mobile + smoke-reactivity + smoke-safari). | Drift — "3 projects" stale; "20+" is a low estimate. The per-tranche-FINAL.md disclaimer (lines 23-25) softens this, but the "3 projects" phrasing is concretely wrong. |
| Line 94 | `VENDOR-POLICY.md … (accepted-noise; vue-tsc count gated at 126)` | VENDOR-POLICY.md now states "vue-tsc gate: 0 errors". F.W3 Lane C hardened the CI gate from 126 → 0. F.W1 Lane C reduced the actual count 118 → 0 by deleting 29 zero-consumer subdirs. | Drift — "gated at 126" is concretely wrong post-F.W1+F.W3. |

**No lerpLegacy mention in root CLAUDE.md** — the prompt's heads-up that "the `lerp(a, b, t)` mention is still correct; `lerpLegacy(t, a, b) aliased deprecated` is NO LONGER ACCURATE post-F.W3 Lane A" referred to a mention that is NOT present in `/Users/mkbabb/Programming/value.js/CLAUDE.md`. The phrasing matches the line at `demo/CLAUDE.md:145`. Verified via `grep -n lerpLegacy /Users/mkbabb/Programming/value.js/CLAUDE.md` → no match.

### 1.2 — `/Users/mkbabb/Programming/value.js/demo/CLAUDE.md`

**Verdict**: 2 drift items — 1 vendor-sweep stale, 1 lerpLegacy stale.

| Line | Surface | Reality | Drift kind |
|---|---|---|---|
| Lines 20-21 | `ui/ # shadcn-vue (reka-ui) — DO NOT hand-edit; ui/alert is a glass-ui re-export (B.W2); ui/table retired (B.W2)` | F.W1 Lane C deleted 29 ZERO-CONSUMER subdirs (`accordion`, `alert-dialog`, `aspect-ratio`, `auto-form`, `breadcrumb`, `calendar`, `carousel`, `chart`, `chart-area`, `chart-bar`, `chart-donut`, `chart-line`, `command`, `context-menu`, `drawer`, `form`, `menubar`, `navigation-menu`, `number-field`, `pagination`, `pin-input`, `progress`, `range-calendar`, `resizable`, `tags-input`, `textarea`, `toggle`, `toggle-group`, `v-calendar`). 22 subdirs remain. Pointer to `docs/tranches/F/audit/F.W1-lane-c-vendor-sweep.md` is missing. | Drift — needs a post-F.W1 Lane C note. |
| Line 145 | `\`lerp(a, b, t)\` canonical arg order (D.W3 Lane C L11); \`lerpLegacy(t, a, b)\` aliased deprecated` | `lerpLegacy` deleted at F.W3 Lane A. `grep -rn lerpLegacy src/` returns 0. v0.8.0 BREAKING. | Drift — F2 invariant satisfaction NOT reflected. The `lerp(a, b, t)` portion remains accurate; the `lerpLegacy` clause must be removed. |

Other parts of `demo/CLAUDE.md` (D.W3/D.W4 sections, `PaletteDialog/` colocated subtree, `viewSchema.ts`, injection-key pattern, custom-component subtree) verified accurate vs the live `demo/@/components/custom/` tree (14 subdirs match). The `goo-blob/` entry at line 77 correctly captures the D.W3 Lane C memoization detail.

### 1.3 — `/Users/mkbabb/Programming/value.js/api/CLAUDE.md`

**Verdict**: ACCURATE. No F-window drift.

- `api/` was untouched in F (confirmed via `git log --oneline e1549e0..cf42c6c -- api/` → no F.W0..F.W3 commits touch `api/`).
- The on-disk `api/src/` structure (16 directories) matches the doc's tree (sections lines 7-58).
- "9 collections / 27 indexes" matches `src/db.ts` claim.
- Middleware-split mention (E.W2 Lane E) is correct.
- One minor observation (NOT drift, NOT in F's scope): `api/src/services/` on disk contains `color/` and `session/` subdirs in addition to the doc-mentioned `palette/` + `admin/` — but the doc's tree lists `palette/` + `admin/` only. This is pre-F drift (was true at E close), out of Lane 3 scope. Flag as **possible E-close debt; NOT in F's fix scope** and leave for a future tranche to decide whether the `services/{color,session}/` subdirs warrant doc mention.

### 1.4 — `/Users/mkbabb/Programming/value.js/docs/tranches/F/F.md`

**Verdict**: §0, §3, §7 accurate at planning time; §3 wave statuses are now stale (all 5 waves landed; only F.W4 in flight).

| Section | Surface | Reality |
|---|---|---|
| §0 | "Master HEAD provenance" lists 8 lockstep commits `1fafd5d..e1549e0` and pins F open at `e1549e0`. | Verified via `git log --oneline 47399c2..e1549e0` — all 8 commits present in order. Accurate. |
| §3 | Wave schedule table — all 5 waves marked. F-text says "Status: planned" within each wave anchor. | F.W0..F.W3 actually landed (commits `188bd6b` → `cf42c6c`). F.W4 in progress at audit-time. F.md §3 is a planning-time substrate, so the "planned" status is HISTORICALLY accurate; close ceremony should leave F.md untouched as a historical record. **NO FIX NEEDED.** |
| §7 | Cross-tranche debt at F open — 4 FOLD + 5 RETIRE + 3 PEER + 3 CARRY. | Verified against `audit/F-AUDIT-2-deferred-ledger.md`. Accurate. |

**Conclusion**: F.md is a planning-time substrate. Treat it as immutable historical record. NO fix in close ceremony.

### 1.5 — `/Users/mkbabb/Programming/value.js/docs/tranches/F/PROGRESS.md`

**Verdict**: Wave log table has 5 rows ALL marked `planned`. Open dependencies still describe pre-F-W0 state.

| Section | Drift |
|---|---|
| Wave log (lines 65-71) | 5 rows: `planned / — / — / —`. Reality: F.W0=`188bd6b`+`419ce84`+`bdfecf2`; F.W1=`6c6c0ea`+`f0d6aab`+`1401d75`; F.W2=`df0650c`; F.W3=`1ead49e`+`cf42c6c`. ALL 5 rows need `closed` status + opened/closed timestamps + commit hashes. F.W4 is the close-in-flight ceremony itself; mark `open` until the close commit lands. |
| Open dependencies (lines 73-81) | Lists "F.W2 cross-repo write depends on F3 boundary authorization" — F.W2 has CLOSED (df0650c). The "depends" clauses for F.W2 / F.W3 should be retired or updated to read "SATISFIED". The 7 standing glass-ui asks + keyframes.js precept + CW Phase-2 + precept-SHA bullets remain accurate forward-looking debt. |

### 1.6 — Wave specs `F.W0.md` … `F.W3.md`

**Verdict**: HISTORICAL RECORD — do NOT edit.

These are planning substrates frozen at wave-open. The "Status: planned" headers + "TBD" placeholders (e.g., F.W3 Lane C "Replace `<BASELINE>` with the post-F.W0/F.W1 count (TBD at lane dispatch — likely ~112-118)") are correct AS OF the spec's authorship; the actual landed value (`0`) lives in the corresponding `audit/F.W3-lane-c-vuetsc-baseline.md`. The right reading discipline is: **wave specs describe plan, audit docs describe actual; do not retrofit either against the other.**

Per the prompt's own discipline: "any drift between the spec text and the actual implementation should be flagged but NOT corrected by Lane 3 — historical record."

**Specific spec-vs-actual deltas observed (FLAG ONLY; do NOT edit)**:

- F.W3.md Lane C: "Replace `<BASELINE>` with the post-F.W0/F.W1 count (TBD at lane dispatch — likely ~112-118)" — actual baseline applied was 0 (post-F.W1 Lane C dropped to zero). The wave spec's pre-dispatch estimate undershot the reality of the F.W1 vendor sweep.
- F.W3.md Lane F (optional types-key probe): the F.W3 close commit (`cf42c6c`) does not include a Lane F audit doc, suggesting Lane F was deferred. The audit dir contains lanes A-E but no F. Confirm via close-ceremony scope.
- F.W2 commit on tranche-f (`df0650c`) is doc-only (`docs(tranche-f/w2)`); the value.js-side substrate carries no source-tree change for F.W2 because the cross-repo write lives in keyframes.js. F.W2.md captures this in its spec; no drift.
- F.W4.md §"Verification artefacts" claims "`audit/F.W4-*` (7 close-audit lane outputs)" — this audit doc is the first of those 7. NO drift; it's an ongoing-ceremony artifact.

---

## §2 — Actionable drift fixes for the close ceremony

The orchestrator will address these in close ceremony per `F.W4.md §"Close ceremony"` items 5, 6, 7. Listed in priority/scope order:

### Root `CLAUDE.md`

1. **Line 8** — Update build description from `dist/value.js + value.cjs + value.d.ts` to the actual flat-W12 layout. Suggested phrasing: `library → dist/value.js (ESM) + flat dist/*.d.ts (W12-unblocker layout)`. Per `F.W4.md §"Close ceremony"` item 5: "Update root `CLAUDE.md` — test count + spec count post-F (vitest 1584, smoke 36, api 104, bench triple). New scripts (`proof:dts-layout`)."
2. **Line 18** — Update `~20+ specs across 3 projects` to reflect post-E.W3 Lane B 5-project partition. Suggested phrasing: `~36 specs across 5 projects` or keep the disclaimer and trim the "across 3 projects" tail to "across 5 projects" matching the existing disclaimer pattern.
3. **Line 94** — Update `vue-tsc count gated at 126` to `vue-tsc gate: 0 errors (hardened at F.W3 Lane C; post-F.W1 Lane C 29-subdir zero-consumer sweep)`. Optional: reference the audit doc `docs/tranches/F/audit/F.W1-lane-c-vendor-sweep.md`.
4. **Test + verify block (lines 14-21)** — Consider adding `npm run proof:dts-layout # F.W3 Lane D dts-shape invariant guard` after the `proof:resolution` line. Optional: also add `npm run codemod:keyframes-lerp` (note that this is a published-codemod entry point, primarily for peer-repo consumers).

### `demo/CLAUDE.md`

5. **Lines 20-21** — Update the `ui/` annotation to reflect post-F.W1 Lane C vendor sweep. Suggested phrasing: `ui/ # shadcn-vue (reka-ui) — DO NOT hand-edit; ui/alert is a glass-ui re-export (B.W2); ui/table retired (B.W2); 29 zero-consumer subdirs deleted (F.W1 Lane C; see docs/tranches/F/audit/F.W1-lane-c-vendor-sweep.md)`.
6. **Line 145** — Remove the `; \`lerpLegacy(t, a, b)\` aliased deprecated` tail. Keep `\`lerp(a, b, t)\` canonical arg order (D.W3 Lane C L11)` (still accurate). Add F.W3 Lane A reference if desired: `\`lerp(a, b, t)\` canonical arg order (D.W3 Lane C L11; lerpLegacy retired at F.W3 Lane A — v0.8.0 BREAKING)`.

### `api/CLAUDE.md`

7. **No F-window fix needed.** `api/` untouched in F. Per `F.W4.md §"Close ceremony"` item 7: "brief verify only." Brief-verify PASSED at this audit.
8. (Out-of-F-scope note for future tranche) `api/src/services/` on disk contains `color/` and `session/` subdirs not reflected in the `api/CLAUDE.md` tree (lines 30-34 list only `palette/` and `admin/`). This is pre-F drift; defer to a future tranche to decide doc reconciliation.

### `docs/tranches/F/PROGRESS.md`

9. **Wave log table (lines 65-71)** — Replace 5 `planned` rows with closed-state rows. Suggested commit pin mapping:
   - F.W0 — `closed` / opened 2026-05-21 / closed 2026-05-21 / commits `188bd6b, 419ce84, bdfecf2`.
   - F.W1 — `closed` / opened 2026-05-21 / closed 2026-05-21 / commits `6c6c0ea, f0d6aab, 1401d75`.
   - F.W2 — `closed` / opened 2026-05-21 / closed 2026-05-21 / commits `df0650c` (doc-only on value.js side; cross-repo write at keyframes.js side per F.W2 Lane A).
   - F.W3 — `closed` / opened 2026-05-21 / closed 2026-05-21 / commits `1ead49e, cf42c6c`.
   - F.W4 — `open` until the close commit lands (or `closed` with the close commit hash at the moment of close).
10. **Open dependencies (lines 73-81)** — Mark "F.W2 cross-repo write" + "F.W3 lerpLegacy delete depends on F.W2" as SATISFIED. Leave the 7 glass-ui asks + keyframes.js precept-pin + CW Phase-2 + precept-SHA-at-`68d9b20` bullets — they remain forward-looking debt.

### Other docs flagged by `F.W4.md §"Close ceremony"` (not strictly Lane 3 doc-drift, but adjacent)

11. **`docs/tranches/F/FINAL.md`** — NEW close doc (close ceremony item 1). Outside Lane 3's read-only scope. Lane 3 flags only that FINAL.md does NOT yet exist at `cf42c6c`.
12. **`CHANGELOG.md`** — v0.8.0 entry per close ceremony item 8. Outside Lane 3's read-only scope. Verified that F.W3 Lane A (`1ead49e`) commit message intent is to add a CHANGELOG entry; lane 3 does not parse CHANGELOG.md itself.
13. **`package.json` `version: "0.7.0"`** — Bump → `0.8.0` per close ceremony item from pre-merge gate #9. Outside Lane 3's read-only scope.

---

## §3 — Items that should NOT be edited (historical records)

1. **`docs/tranches/F/F.md`** §0, §1, §3 — planning-time substrate. The "Status: planned" notes are accurate AS OF planning-time. Wave-schedule table at §3 frames the planning intent. NO FIX.
2. **`docs/tranches/F/waves/F.W0.md` … `F.W3.md`** — wave specs are planning substrates. The "TBD" placeholders (e.g., F.W3.md Lane C's `~112-118` baseline guess) reflect pre-dispatch uncertainty; the actuals live in `docs/tranches/F/audit/F.W*.md`. NO FIX.
3. **`F-PROMPTS.md`, `findings.md`, `dispatch/AGENT.md`, `coordination/Q.md`** (the planning quartet) — these are F-open substrates. The orchestrator's close ceremony item 4 reconciles `coordination/Q.md §6` final state, but the historical body of these docs stays put.
4. **`audit/F-AUDIT-1..6` + `audit/F.W0..F.W3-lane-*`** — read-only forensic deliverables. NO FIX.
5. **`audit/F.W3-lane-a-lerplegacy-delete.md` + sibling close-of-wave audits** — sealed at their close commit. NO FIX.

---

## §4 — Verdict summary

| Doc | Verdict | # of drift items | Close-ceremony fix item refs |
|---|---|---:|---|
| Root `CLAUDE.md` | DRIFT (3) | 3 | items 1, 2, 3 (+ optional 4) |
| `demo/CLAUDE.md` | DRIFT (2) | 2 | items 5, 6 |
| `api/CLAUDE.md` | ACCURATE | 0 (F-window) | brief verify only (item 7) |
| `docs/tranches/F/F.md` | HISTORICAL — DO NOT EDIT | 0 | NO FIX |
| `docs/tranches/F/PROGRESS.md` | DRIFT (2) | 2 | items 9, 10 |
| `docs/tranches/F/waves/F.W*.md` | HISTORICAL — DO NOT EDIT | 0 | NO FIX (3 spec-vs-actual flags recorded above for orchestrator awareness) |

**Total close-ceremony actionable items**: 10 (items 1-10). Items 11-13 are adjacent F.W4 close-ceremony writes flagged for completeness but outside Lane 3's doc-drift scope.

**Doc-drift gate (Lane 3 sub-gate)**: PASS — drift catalogued, no doc edits required by this lane, all fixes routed to the close-ceremony writes per `F.W4.md §"Close ceremony"` items 5, 6, 7 (+ adjacent ceremony writes for PROGRESS.md, FINAL.md, CHANGELOG.md, package.json version bump).
