# I-SEED — Tranche I forward-carry ledger (predecessor-authored at H close)

**Authored**: 2026-05-26 at H close (post-H.W4 close, pre-H.W5 merge).
**Authoring HEAD**: `tranche-h` @ `afeda68` (H.W4 close).
**Author**: H orchestrator.
**Purpose**: Seed for the I tranche's audit phase. Items here are NOT I-mandatory; they are the predecessor's enumeration of "what would I audit if I were opening I tomorrow."

I begins (per the established G→H pattern) with a 6-agent audit + planning-only opening. This document is one input to that audit. The I orchestrator should treat it as advisory, not binding.

---

## §1 — Repo state at H close

- Branch: `master` (post-H merge; tag `v0.10.0`).
- HEAD: (the merge commit — TBD at merge time).
- `as any` in src/: **0** (G2 cap ≤ 5).
- `as unknown as` in src/: **2** (H2 cap ≤ 2; both irreducible per H2 policy — DOM + clone-reinterpret).
- `@ts-ignore` / `@deprecated` in src/+demo/: **0** (F2 + extended).
- vue-tsc: **0 errors**.
- vitest: **1584 / 34**.
- api vitest: **115 / 22**.
- e2e specs: **36** (5 projects).
- 9 proof scripts: all exit 0 at full applicability.
- `dist/value.js`: **124,130 B** (≤ 148,480 ceiling; H.W4 Lane A Rolldown strip −1,291 B).
- `withTransaction` sites in api/: **16** (H1 maximalist closure; 3 documented carve-outs).
- demo/ files > 400 LoC (excluding shadcn-vue ui/): **0** (H3 closure).

---

## §2 — Items the predecessor declares CLOSED at H

These are explicit "stop carrying these" callouts. The I orchestrator should not re-audit them unless a new signal surfaces.

| Item | H disposition | Predecessor verdict |
|---|---|---|
| H-AUDIT-6 §3 defect (createPalette + patchPalette orphan-version) | REPAIRED at H.W1 Lane A | CLOSED |
| H-AUDIT-6 §1.4 7 admin-tree cross-collection sites | WRAPPED in-wave at H.W1 Lane A.2 (per F1) | CLOSED |
| H-OPP-1 typed XYZ_FUNCTIONS mapped-type | RETIRED at H.W2 Lane A | CLOSED |
| H-OPP-2 `proof:as-unknown-as-budget` codification | CODIFIED at H.W2 Lane B (budget = 2; tightened from plan's 3) | CLOSED |
| Type-predicate `normalize.ts:319` | RETIRED at H.W2 Lane C | CLOSED |
| H-OPP-3 `demo/@/lib/palette/api.ts` 484 LoC | DECOMPOSED to 9 modules at H.W3 Lane A | CLOSED |
| Gap #5 demo/ god-module audit | AUDITED + 2 REMEDIATED at H.W3 Lane B (PointerDebugOverlay + PaletteCard) | CLOSED |
| `colorSpaceInfo` data lift | LIFTED at H.W3 Lane C | CLOSED |
| Demo `@ts-ignore` corpus | RETIRED via `*.css?inline` module decl at H.W3 Lane D | CLOSED |
| `plugins/vite-source-export.ts` bare `fs` outlier | FIXED `node:fs` at H.W3 Lane E | CLOSED |
| H-SEED §3 #1 Rolldown `//#region` strip | STRIPPED at H.W4 Lane A (−1,291 B) | CLOSED |
| H-SEED §3 #2 bench provenance hygiene | REPOINTED to symbol refs at H.W4 Lane B | CLOSED |
| H-AUDIT-6 §3 reactivity-instant flake | MITIGATED at H.W4 Lane C (2 sites: slider-keyboard + symmetric spectrum-drag) | CLOSED |
| CI release/publish docs gap | CODIFIED at H.W4 Lane D (`docs/RELEASE.md` NEW) | CLOSED |
| CONTRIBUTING.md playwright + publish gaps | FILLED at H.W4 Lane E | CLOSED |
| api/tsconfig strictness gap (H-AUDIT-6 §1.2) | LIFTED to root parity at H.W1 Lane B (4 flags + 36 errors repaired) | CLOSED |

---

## §3 — Items relayed for I-audit consideration

The I orchestrator may choose to audit these. None are mandatory; each is the predecessor's "I noticed this; tomorrow's audit may want to look at it" pointer.

### #1 — demo/ `as any` ratio (not yet under a cap)

Lane C of H.W3 noted a pre-existing `(colorSpaceInfo as any)[space]` at `demo/@/components/custom/color-picker/controls/ComponentSliders.vue:162`. Demo `as any` is not under the G2/H2 cap (those are src/-scoped). The I orchestrator may want to:
- Survey demo/ `as any` count (informational).
- Decide whether demo/ should have its own budget (parallel to G2's src/ cap).
- If yes, codify with a `proof:as-any-budget-demo` script + cap = current count.

Not a defect; just an unaudited surface. The decision is policy-shaped, not type-shaped.

### #2 — `dispatch.ts` LoC drift watch

H.W2 Lane A's typed `XyzFunctionsTable` + 2 lookup helpers added ~28 B (mostly to `dispatch.ts`). The current `dispatch.ts` LoC count after H.W2 is in the 320-340 range (G.W4 remediation brought it to 312; H.W2 lifted it slightly). The G3 ≤ 350 LoC cap STILL HOLDs. The I orchestrator may want to:
- Verify the current LoC count at I open.
- Decide whether to remediate (split further) or LEAVE if still within budget.

This is a borderline-monitoring item, not an active defect.

### #3 — `as unknown as` count = 2 — codified irreducibles

The 2 residue sites (`normalize.ts:117` DOM, `parsing/color.ts:59` clone-reinterpret) are policy-documented at the source-line + codified by `proof:as-unknown-as-budget` (budget = 2; strict). The I orchestrator may want to:
- Re-examine whether a future TypeScript release ships features that retire either case (DOM types could grow an index signature on CSSStyleDeclaration; a satisfies-based pattern could replace the clone-reinterpret).
- If TypeScript lands these features, retire the case + tighten the budget further.

Not actionable until a TypeScript release ships the relevant features. Informational.

### #4 — Chronic 6-tranche carry items

9 items at 7-tranche carry at H close (per H-AUDIT-2 + ratified at H.W0 Block A as Option C+A+D):
1-7. 7 glass-ui primitive asks (Aurora; BlobDot; SelectTrigger size; DockSelectTrigger clampLabel; TooltipContent variant; Button icon-sm; Tabs underline) — re-check at glass-ui's next non-AK tranche-open.
8. Metaballs API shapes — PEER-AUTHORSHIP draft published; AL coordination informational; speedtest AL ratifies publisher-retirement on its own cadence.
9. keyframes.js precept-pin drift (`458c2d1` vs `68d9b20`) — re-check at keyframes.js maintainer's next submodule-rebase signal.
10. keyframes.js peer commit `470814e` (R11) — LEAVE LOCAL per G ratification (status unchanged).
11. Contract-v2 §2.1 glass-ui font-inlining — re-check at glass-ui's `dist/glass-ui.css` next-publish.

The I orchestrator may want to:
- Re-audit each item's status at I open.
- Selectively retire any that have become moot (per Block A Option D).
- Sharpen (c) triggers further if cadence has shifted.

These are NOT I-mandatory; they are PEER-AUTHORSHIP carry-forwards.

### #5 — CW Phase-2 (speedtest doesn't consume value.js)

Per H-AUDIT-4: speedtest does NOT consume value.js. CW Phase-2 framing remains INFORMATIONAL. The I orchestrator should re-verify this at I open — speedtest may have shipped a value.js consumer between H close and I open.

### #6 — bench-gate inline shell → scripts/proof-bench.mjs

G-OPP-SCRIPTS-4 (deferred at G and H). The inline 60+ line shell in `node.js.yml` could be extracted to a script. Borderline cost/benefit. I orchestrator may want to:
- Sharpen the trigger: only fold if the inline shell needs to grow OR if a 2nd CI consumer of the bench gate appears.

### #7 — Cron transactional semantics (api/src/cron.ts)

`api-withTransaction-coverage.md §4.2` notes `cron.cleanup` is functionally cross-collection (sessions + votes) but deliberately doesn't wrap (each sweep is independently idempotent; orphan-vote sweep depends on a stable palettes snapshot). The I orchestrator may want to:
- Re-examine whether the idempotency assumption holds across MongoDB version bumps or new vote operations introduced post-H.
- If a new vote op disrupts the idempotency, fold a wrap into a future api/-track wave.

Not actionable now; defensive note.

### #8 — Performance regression watch

H.W2 Lane A's typed mapped-type added 2 lookup helpers; bench gates GREEN but DIRECT_PATHS HSL→RGB dropped slightly (3.17× → 4.19× via JIT, then settled at 4.19×). The I orchestrator may want to:
- Run `npm run bench` at I open + verify gates still GREEN.
- If a perf regression class appears, surface as a candidate FOLD item.

Routine.

---

## §4 — Architectural posture observations

The H thesis was polish-grade — invariant tightening + defect repair + decomposition completion. Architectural posture observations:

- **The substrate is now in unusually good shape**. 0 `as any`, 2 `as unknown as` (both irreducible), 0 `@ts-ignore`, 0 god modules in `src/` (G3) or `demo/` (H3), 16 wrapped cross-collection sites with a standing reference, 9 proof scripts at full applicability, api/tsconfig at root strictness parity.
- **The "next theme" question is open**. G/H were retrospectively-themed (close known gaps). I could be:
  - **forward-themed** — pick a new architectural direction (e.g. Metaballs migration if speedtest's `glass-ui/MetaballCanvas` lands; CSS Custom Properties first-class; OKLCH gamut-mapping perf; etc.).
  - **maintenance-themed** — a "no-thesis" tranche that just bumps deps + lands chronic-carry retirements as they become moot.
  - **API-themed** — a backend-focused tranche (cron transactional semantics; api/ further decomposition if any service exceeds 400 LoC; new endpoints).

The choice is the I orchestrator's. The H-thesis closing left no immediate "you must fold this in I" items.

### v1.0.0 declaration?

H ratified v0.10.0 (Block E) — v1.0.0 was deferred as a separate marketing/comms decision. By H close, the substrate justifies v1.0.0 (as documented in H.md §7 Block E option ii):
- `as any` 0 (vs the typical ecosystem benchmark of any-tolerance).
- `as unknown as` ≤ 2 (and codified).
- No god modules in `src/` or `demo/`.
- Full proof-script suite.
- Cascade-correctness closed.
- 5 minor releases of stability (v0.6.0 → v0.10.0).

The I orchestrator may want to surface v1.0.0 as a ratification block at I open. The decision is user-shaped, not code-shaped.

---

## §5 — Authority

This document is the predecessor-authored seed for I. It is informational + advisory, not binding. The I orchestrator's 6-agent audit at I open should treat this as one input among:
- The 6 H-AUDIT-* documents (still on tranche-h).
- The H FINAL.md.
- The state of the repo at I open (HEAD).
- Cross-repo state (peer manifest at I open).
- Any new prompts the user issues at I open.

The I-thesis is to be decomposed at I open, not pre-declared here.
