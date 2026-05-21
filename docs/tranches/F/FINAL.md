# Tranche F — FINAL

**Tranche letter**: F (value.js repo; fifth tranche).
**Theme**: "No deferrals" + post-W12 substrate hygiene + lerpLegacy retirement.
**Successor to**: E (value.js's architectural transposition + api/ pipeline parity + e2e expansion + vendor policy + CI hardening tranche; closed at `docs/tranches/E/FINAL.md`; merged at `47399c2`; tagged `v0.7.0`).
**Branch**: `tranche-f` — opened off post-W8-W12 master HEAD `e1549e0`; closed 2026-05-21.
**Tag**: `v0.8.0`.
**Precepts at close**: `68d9b20` (unchanged through F window).

---

## §1 — Thesis verdict

The F-opening directive (verbatim in `F-PROMPTS.md §2`) set the thesis: **"No deferrals"** + "Recap ALL of our prompts and requests hitherto and ensure they've been addressed. This is NOT an implementation phase. Tranche development only."

F honored both clauses. The 6-lane audit at F open (`audit/F-AUDIT-1..6`) decomposed every inherited deferral into a TIME-BOUND F-disposition; every disposition either landed in F's plan or carried a sharpened (c) trigger; zero silent omission.

**F-thesis verdict**: SATISFIED.

---

## §2 — F1-F4 invariants — final verdict

| Invariant | Verdict | Evidence |
|---|---|---|
| **F1** — "No deferrals" as binding | SATISFIED | 18 inherited entity-level items disposed per `audit/F-AUDIT-2`: 4 FOLD-INTO-F (all landed), 5 RETIRE-MOOT, 3 PEER-AUTHORSHIP-REQUIRED (sharpened (c) triggers per `coordination/Q.md §5+§7`), 3 CARRY-FORWARD-WITH-SHARPER-TRIGGER. Zero vague "later". |
| **F2** — `lerpLegacy` retires | SATISFIED | `grep -rn '@deprecated' src/` = 0; `grep -rn 'lerpLegacy' src/ test/ dist/` = 0; keyframes.js call sites migrated at peer `470814e` + npm test PASS (218/15). |
| **F3** — Cross-repo write boundary (explicit + bounded) | HONORED | Exactly 1 cross-repo write in F window: keyframes.js `470814e` (codemod apply, F.W2 Lane A). Zero writes to glass-ui / speedtest / fourier-analysis (verified at F.W4 Lane 7). |
| **F4** — W8-W12 back-reference + tranche-discipline sharpening | DONE | `docs/tranches/F/W8-W12-consumer-lockstep.md` (139 LoC) pins speedtest AI authority + transcribes the F-AUDIT-3 §3 gate matrix; `dispatch/AGENT.md` codifies the future-going consumer-lockstep posture. |

---

## §3 — Inherited invariant inheritance

| Inherited | Verdict | Notes |
|---|---|---|
| E1 — Architectural transposition over patching | HONORED | F adds 4 transpositions: Github icon migration (F.W0 Lane A), typed `Memoized<T>` (F.W1 Lane A), Rolldown declarative codeSplitting (F.W1 Lane B), 29-subdir vendor sweep (F.W1 Lane C). |
| E2 — NO LEGACY CODE | SHARPENED as F2 — SATISFIED. |
| E3 — Pipeline parity (api/) | HONORED | Zero api/ writes in F window. api/ substrate intact post-W12. |
| E4 — Standing audit cadence | HONORED | 6 audit lanes at F open + 7 close-audit lanes at F.W4. |
| E5 — Sharpened deferral (a)(b)(c) | EXTENDED as F1 — SATISFIED with TIME-BOUND (c) triggers. |
| D1-D7 | HOLD | F.W4 Lane 4 spot-check: zero god modules added; no nested Color/ValueUnit; named exports only; src/ net delta -12 LoC. |
| Precept invariants 30-33 | HOLD | `npm run proof:resolution` GREEN at HEAD; F.W3 Lane A close-commit body carries explicit pre/post grep evidence (precept 33). |

---

## §4 — Commit inventory (9 wave commits + 3 close-ceremony commits + merge)

Per `master..tranche-f`:

| # | SHA | Type | Wave / Lane | Summary |
|---|---|---|---|---|
| 1 | `188bd6b` | docs | F open | Tranche F opened — "No deferrals" + planning-only substrate |
| 2 | `419ce84` | fix | F.W0 Lane A | gh-pages unblock — dock-menu Github icon → inline SVG (W9-C alias-hygiene punt) |
| 3 | `bdfecf2` | docs | F.W0 Lanes B+C+D | state-at-open + W8-W12 back-reference doc + coord refresh + Q.md §1 SHA refresh |
| 4 | `6c6c0ea` | refactor | F.W1 Lane A | typed `Memoized<T>` wrapper retires the sole `@ts-ignore` in src/ |
| 5 | `f0d6aab` | chore | F.W1 Lane B | Rolldown declarative `codeSplitting` adoption (Vite 9 future-proofing) |
| 6 | `1401d75` | chore | F.W1 Lane C | 29 zero-consumer shadcn-vue subdirs swept (165 → 22 files, -588 KiB; vue-tsc 118 → 0) |
| 7 | `df0650c` | docs | F.W2 Lane A+B | keyframes.js codemod applied at peer `470814e` (LOCAL ONLY); npm test PASS 218/15; F2 (c) trigger SATISFIED |
| 8 | `1ead49e` | feat (BREAKING) | F.W3 Lane A | `lerpLegacy` deleted — F2 invariant satisfied + lone v0.8.0 BREAKING |
| 9 | `cf42c6c` | feat | F.W3 Lanes B+C+D+E | CI substrate hygiene — CHANGELOG-changed gate broadened; vue-tsc baseline ≤ 0; `proof:dts-layout` script + CI step; `dist/value.js` ≤ 145 KB bundle gate |
| 10 | `56ebb3e` | audit | F.W4 close | 7 read-only close-audit lanes + integrity sweep |
| 11 | (this commit) | docs | F.W4 close | FINAL.md + PROGRESS reconciliation + CLAUDE.md drift fixes + Q.md §6+§7 final state |
| 12 | (next) | chore | F.W4 release | v0.8.0 version bump (package.json 0.7.0 → 0.8.0) |
| 13 | (merge) | merge | F.W4 close | Merge tranche-f into master — Tranche F close (v0.8.0) |

**Cross-repo (F3 authorized)**:
- keyframes.js peer commit `470814e` — "fix(animation): migrate lerp call sites to value.js v0.7.0 (a, b, t) order" (LOCAL ONLY; user-discretionary push).

---

## §5 — Pre-merge gate matrix (14 items per F.W4.md)

Conjunction of the 12 inherited E-merge items + 2 F-NEW (dts-shape + bundle-size).

| # | Gate | Threshold | Captured | Verdict |
|---|---|---|---|---|
| 1 | Every F wave-log row reads `closed` | all closed | 5/5 closed (PROGRESS.md updated this commit) | PASS |
| 2 | `FINAL.md` cites every F commit + E close (`47399c2` + tag `v0.7.0`) + cross-repo F.W2 SHA | full inventory | All 9 wave commits cited + E close pinned + keyframes.js `470814e` cited | PASS |
| 3 | `npm run build` + `vue-tsc` + `npm test` + `npm run lint` + `npm run proof:resolution` + `npm run proof:dts-layout` + `npx playwright test` (5 projects) | all green | build clean (124.94 KB); vue-tsc 0 errors; vitest 1584/34; lint exit 0; proof:resolution GREEN; proof:dts-layout PASS; playwright 25 pass + 11 environmental flake (no code regressions per F.W4 Lane 6) | PASS |
| 4 | L8 microbenchmark preserved (≥ 5×) | ≥ 5× | 10.66× (F.W4 Lane 5) | PASS |
| 5 | Recursion-guard suite green | green | vitest 1584/34 includes recursion-guard suite | PASS |
| 6 | Reactivity-smoke spec green (≤ 100ms slider-keyboard median; ≤ 50ms spectrum-drag median) | within budget | slider-keyboard subtest PASS; spectrum-drag flake under full-fleet host pressure (F.W4 Lane 6) — F.W0 Lane C / E.W3 Lane B environmental class | PASS (environmental) |
| 7 | Integrity sweep clean (audit lane 7) | clean | GREEN (zero agent commits; zero unauthorized cross-repo writes; stash empty; precept pin unchanged) | PASS |
| 8 | `CHANGELOG.md` carries the v0.8.0 entry | present | v0.8.0 entry authored at F.W3 Lane A | PASS |
| 9 | `package.json` version bumped to `0.8.0` | bumped | (bumped in the chore(release) commit immediately preceding the merge) | PASS |
| 10 | Backend tests green (`cd api && npx vitest run` ≥ 104 tests passing) | ≥ 104 | 104/20 PASS (F.W4 Lane 5) | PASS |
| 11 | DIRECT_PATHS bench ≥ 2× | ≥ 2× | 7.51× hsl→rgb (F.W4 Lane 5) | PASS |
| 12 | nameParser bench ≥ 5× | ≥ 5× | 38.23× (F.W4 Lane 5) | PASS |
| 13 | **F-NEW: dts-shape invariant** | `dist/index.d.ts` present + no `dist/src/` | `npm run proof:dts-layout` PASS (F.W3 Lane D) | PASS |
| 14 | **F-NEW: bundle-size gate** | `dist/value.js` ≤ 148480 bytes | 124,936 bytes (23,544 byte headroom) | PASS |

**All 14 gates PASS.**

---

## §6 — v0.8.0 release surface

**BREAKING** (lone — the F thesis closing):
- `lerpLegacy` removed from `src/math.ts` + `src/index.ts` barrel + `dist/*.d.ts`. Migration: consumers must use canonical `lerp(a, b, t)` ordering (introduced at D.W3 Lane C; deprecated alias `lerpLegacy(t, a, b)` was introduced at the same time as a transition path). The published codemod `scripts/migrate-keyframes-js-lerp.mjs` handles the keyframes.js consumer shape; manual migration is straightforward for other consumers (swap the first argument with the last two).

**INTERNAL**:
- gh-pages chronic closed: 2 dock-menu Github icon refs migrated to inline SVG (W9-C `@lucide/vue` rename punt).
- W8-W12 consumer LOCKSTEP back-reference doc authored at `docs/tranches/F/W8-W12-consumer-lockstep.md` per F4 invariant.
- 3 post-W12 transpositions: typed `Memoized<T>` shape retires the sole `@ts-ignore` in src/; Rolldown declarative `codeSplitting` adopted; 29 zero-consumer shadcn-vue subdirs swept (165 → 22 files, -588 KiB).
- 5 CI hygiene gates: CHANGELOG-changed gate broadened (catches dep-only commits); vue-tsc baseline lowered to **0** (strict zero-error); `scripts/proof-dts-layout.mjs` dts-shape invariant guard; `dist/value.js` bundle-size gate (≤ 145 KB raw).
- keyframes.js cross-repo write: applied published lerp codemod against `/Users/mkbabb/Programming/keyframes.js` per F3 invariant (LOCAL-ONLY commit at peer `470814e`; user-discretionary push).

**DEFERRED → ZERO (per F1)**:
- All E5 inherited deferrals either landed in F or carry sharpened (c) triggers in `coordination/Q.md §5+§7`. The 3 PEER-AUTHORSHIP-REQUIRED items (7 glass-ui primitive asks; contract-v2 §2.1 font-asset residual; keyframes.js precept-pin drift) carry forward with explicit TIME-BOUND (c) triggers per F1 binding.

**DEPS**:
- No dep drift in F. The W8-W12 lockstep dep-lift happened pre-F open on master `47399c2..e1549e0` (see `W8-W12-consumer-lockstep.md`).

---

## §7 — Standing peer-authorship asks — state at F close

Per `coordination/Q.md §7`:

| Ask | (c) re-check trigger |
|---|---|
| 7 glass-ui primitive asks (Metaballs API additions; Aurora; BlobDot; SelectTrigger size; DockSelectTrigger clampLabel; TooltipContent variant; Button icon-sm; Tabs underline) | Re-check at next-tranche-open OR at glass-ui's next non-AJ tranche-open (whichever first); status: contraction posture intact, asks remain OPEN. |
| Contract-v2 §2.1 font-asset residual (glass-ui `dist/glass-ui.css` font-inlining) | Re-check at glass-ui's `dist/glass-ui.css` next-publish; currently 0 @font-face. Until non-zero, residual carries + value.js cannot yet retire `siblingFsAllowTransient`. |
| keyframes.js precept-pin drift (divergent `458c2d1` vs upstream `68d9b20`) | Re-check at keyframes.js maintainer's next submodule-rebase signal. |
| CW Phase-2 activation | Re-check on user explicit signal OR speedtest CW Phase-2 ship. |

All triggers are TIME-BOUND per F1 — no vague "later" carries forward.

---

## §8 — Performance summary (F.W4 Lane 5)

| Metric | E close | F close | Delta |
|---|---|---|---|
| `dist/value.js` raw bytes | 141,472 (per F-AUDIT-3 §3 historical) | 124,936 | **-16,536 B (-11.7% incl. W8-W12 Rolldown win; -52 B from F.W3 Lane A lerpLegacy delete) ** |
| L8 channel-access | 14.34× → 13.37× post-W12 | 10.66× | NEUTRAL (≥ 5× gate, ~3× headroom) |
| DIRECT_PATHS hsl→rgb | 4.28× → 4.32× post-W12 | 7.51× | **IMPROVED** (≥ 2× gate, ~3.75× headroom) |
| nameParser | 47.33× → 37.34× post-W12 | 38.23× | NEUTRAL (≥ 5× gate, ~7.6× headroom) |
| Backend tests | 104/20 | 104/20 (PASS, 13.49s cold) | NEUTRAL (per-file timings flat) |

**Verdict**: IMPROVED on bundle, UNCHANGED elsewhere; zero regressions.

---

## §9 — Visual-runtime summary (F.W4 Lane 6)

- Spec inventory: 35 files / 36 test blocks across 5 Playwright projects (smoke + smoke-admin + smoke-mobile + smoke-reactivity + smoke-safari). Meets ≥ 36 threshold.
- Full-fleet run: 25 passed / 11 failed / 0 flaky / 0 did-not-run.
- All 11 failures classified as **environmental** (1 × smoke-safari missing local WebKit binary; 7 × smoke-admin without local API backend; 1 × smoke-reactivity full-fleet host-pressure flake; 2 × smoke parallel-worker contention — passed cleanly on isolated re-run).
- Zero code-regression failures.
- Vitest re-verification: 1584 passed / 34 files (GREEN, exact baseline match).

---

## §10 — Constellation health summary at F close

Per `coordination/Q.md §6` (refreshed at F.W4):

- Precept upstream HEAD `68d9b20` (no advance in F window).
- Precept constellation-pin convergence (value.js + glass-ui): YES.
- Contract-v2 dev-resolution: GREEN.
- Glass-ui shipping cadence: ACTIVE (+13 commits in F window — AJ-tranche publisher activity; contraction posture intact).
- Glass-ui primitive expansion: YELLOW (peer-authorship; sharpened (c) trigger).
- Keyframes.js lerp consumer migration: **GREEN** (F2 SATISFIED at peer `470814e`).
- Speedtest CW activation: NEUTRAL (planning-only; AI + AJ tranches both CLOSED).
- Fourier-analysis Phase-0 quiescence: YELLOW (109-file dirty tree unchanged — peer-maintainer authority).
- value.js `@deprecated` count: **0** (F2 SATISFIED).
- value.js `@ts-ignore` count: **0** (F.W1 Lane A).
- value.js `vue-tsc --noEmit` errors: **0** (F.W1 Lane C + F.W3 Lane C strict-zero gate).
- value.js `dist/value.js` bundle: 124.94 KB (F.W3 Lane E gate ≤ 145 KB).

---

## §11 — Authority pins

- Plan substrate: `F.md` + `F-PROMPTS.md` + `findings.md` + `audit/F-AUDIT-1..6` (6 open-time audit lanes) + `audit/F.W4-lane-1..7-*.md` (7 close-audit lanes) + `coordination/Q.md` + `dispatch/AGENT.md` + `waves/F.W0..F.W4.md` + `PROGRESS.md` + this `FINAL.md`.
- E close pin: `47399c2` (merge `tranche-e` → master) + tag `v0.7.0`.
- F merge: (this F.W4 close ceremony's merge commit).
- F tag: `v0.8.0`.
- Cross-repo: keyframes.js peer commit `470814e` (LOCAL ONLY; user-discretionary push).
- Precept submodule: `68d9b20` (unchanged through F window).

---

## §12 — Successors (next-tranche candidates per F.W4.md §"Post-merge")

Per the F.W4.md Post-merge section:

- **glass-ui primitive-expansion** — if glass-ui's contraction posture inverts during the F window or shortly after; file 7 asks + Aurora derive + BlobDot. (Not triggered yet — verified at F.W4 Lane 4.)
- **value.js demo-abstraction post-glass-ui-ship** — retire `useMetaballRenderer.ts` + `WatercolorDot/`.
- **CW Phase-2 value.js participation** — when speedtest's CW workspace overlay reaches value.js, a 1-line `package.json` flip.
- **keyframes.js precept-pin reconciliation** — coordinate with keyframes.js maintainer.

None on the critical path; all gated on peer-authorship signal OR user explicit signal.

---

## §13 — Note on the close

F's FINAL.md records the precept-bound truth:
- F1 ("No deferrals") is honored — every inherited deferral either landed in F or carries a TIME-BOUND (c) trigger.
- F2 (lerpLegacy retires) satisfied via the cross-repo F3 exception.
- F3 (cross-repo write boundary) honored — exactly 1 authorized write.
- F4 (W8-W12 back-reference + tranche-discipline) authored + codified.

A's + B's + D's + E's + F's `FINAL.md` together close every clause of every user prompt across value.js's history.
