# E — Architectural transpositions + close-residuals + cross-repo consumption

**Tranche letter**: E (value.js repo; fourth tranche).
**Successor to**: D — value.js's contract-v2 + api refactor + frontend cohesion + library hardening tranche, CLOSED at `docs/tranches/D/FINAL.md`, merged to master at `eae8afc`, tagged `v0.6.0` at `7ac4ecc`.
**Branch**: `tranche-e` (off master post-D-merge `eae8afc`).
**glass-ui peer**: tranche Q **closed** at `4b16de7`; post-Q ship `ce5aad8` (v1.9.3, contract-v2); **post-Q-close housekeeping cohort** `ce5aad8..66e9b8f` (5 commits incl. **`9275584` `./styles.css → dist/glass-ui.css`** — closes D's contract-v2 §2.1 keystone gap).
**keyframes.js peer**: HEAD `0909177` (unchanged since D open; code-side contract-v2 OK).
**speedtest peer**: HEAD `9d22bcdf` (tranche AI W6 + tranche CW seed pending — **monorepo workspace transposition**; value.js is a CONSUMER not author).
**fourier-analysis peer**: HEAD `926ca6a` (dev-resolution contract adopted; consumes value.js easings).
**Mode**: planning-only at open per the E-opening directive ("This is NOT an implementation phase. Tranche development only.").
**Open**: 2026-05-20.
**Precepts at open**: `68d9b20` (the contract-v2 codification SHA; no upstream movement since D close).

## §1 — Thesis

The E-opening directive (verbatim in `E-PROMPTS.md §1`) names the posture: "architectural transpositions in the sake of elegance, simplicity, and performance above all are both necessary and desirable. NO legacy code." The 6-agent audit (`audit/E-AUDIT-1..6`) decomposes this into:

1. **Architectural transpositions in `src/`** — `WhitePointColor<T>` intermediate class lift; `lerpLegacy` + 51 internal-conversion barrel exports retire; 152-branch `nameParser` replacement; `DIRECT_PATHS` table for `color2()` hot paths; the L8 storage-shape's logical conclusions (per-channel `keys()` caching + brand-eraser consolidation).
2. **Two-speed-backend retirement** — `routes/sessions.ts` + `routes/colors.ts` (286 LoC of pre-D.W2 legacy bypass the new pipeline). Plus `requireOwnership` wiring (D.W2 Lane C #6 authored-but-unwired); plus the `client.withTransaction` wiring for `deleteUser` + `fork`; plus the `middleware.ts` split; plus first backend tests (zero exist).
3. **E2e coverage expansion** — 14 user-facing interactive flows have no smoke coverage; the `reactivity-instant` flake under parallel load; smoke-safari WebKit project (D.W6 follow-up).
4. **Cross-repo consumption** — **adopt glass-ui's new `./styles.css` subpath** (closes D's `siblingFsAllowTransient` workaround); adopt the new motion-token canon (`--motion-duration-*` / `--motion-delay-*`); prepare for speedtest CW (monorepo workspace transposition — value.js is a CONSUMER).
5. **Vendor policy + CI hardening** — open the ~126-error generated shadcn-vue cluster's vendor policy; add benchmark CI gate + vue-tsc step + library build verification + Playwright browser cache + Node 22 matrix.
6. **Close-residuals** — A.W14-A.W18 doc-drift residuals; A-11 ConfigSliderPane retired-verify; 5 stale CLAUDE.md LoC counts.

E inherits D's six SOLID + two ACCEPTABLE substrates (per `E-AUDIT-3 §7 + §8`) — no D substrate is FRAGILE. E builds on a clean foundation; the work is architectural deepening + close-residual cleanup + cross-repo consumption.

The full audit-to-wave mapping is `findings.md`.

## §2 — Invariants E1–E5 + the 9 standing mandates

E inherits A + B + D's invariants (D1-D7 carried over) plus the 9 standing mandates per `E-PROMPTS.md §3 + E-AUDIT-1 §2-3`:

1. **E1 — Architectural transposition over patching.** When the audit identifies a structural opportunity (15 items in `E-AUDIT-5 §9`), prefer transposition over surface-fix. This is the explicit user directive at E-open. The bar is HIGHER than D5's "zero deferral" — it asks: "could this be elegantly transposed?" before "should this be patched?"
2. **E2 — NO LEGACY CODE.** The lone `@deprecated` (`lerpLegacy`) goes. Every `@deprecated` JSDoc, every `_legacy`/`Legacy`/`old`/`Old` marker, every aliased export-for-transition with zero consumers — DELETE at E.W1. Verified via grep at E.W1 sub-gate + at E close.
3. **E3 — Pipeline parity across `api/`.** D.W2 created the pipeline; D didn't migrate every route. E retires the two-speed backend — every route obeys `validate → authn → authz → service → repository → format → response` per `D-HARDEN-3 §2`. Verified via grep + 5-route random spot-check.
4. **E4 — Standing audit cadence as binding.** Per the user issuing "DEEPLY audit with N agents in parallel" three times across B + D + E-open, the audit cadence is now a CODIFIED PATTERN. Every E wave that closes a structural change runs a focused micro-audit (read-only); E.W5 close runs the full 7-lane close ceremony like D's.
5. **E5 — Zero silent deferral, with sharper escalation.** Inherits D5. Every finding in `findings.md` lands, retires, or names a destination. New gate: a deferral must record (a) the systemic blocker, (b) the smallest unblock action, (c) when re-checked. "Routes to a successor tranche" alone is INSUFFICIENT — the destination must be named with a triggering condition.

**The 9 standing mandates** (per `E-PROMPTS.md §3`, binding across every value.js tranche):

1. NO quick solutions, NO workarounds: idiomatic, gestalt approaches.
2. NO legacy code (codified as E2).
3. DRY / KISS.
4. Architectural transpositions are necessary and desirable.
5. Run linting and type checking at every interval.
6. DEEPLY audit with N agents in parallel.
7. Tranche development only / planning-only at open.
8. Chronically deferred items must be folded.
9. Recapitulate every prompt.

**Inherited D invariants D1-D7** all carry to E:
- D1 (close prior tranche first — satisfied; D is closed-and-merged-and-tagged).
- D2 (abrogate before patch — bound under E1).
- D3 (fail-explicit — bound; verify across the api/ pipeline-parity work).
- D4 (runtime evidence per wave — bound; per-wave Playwright probe).
- D5 (zero deferral — extended as E5).
- D6 (explicit pipeline / no effusive dynamicism — bound; sole remaining audit is `_relativeCalcExpr` lazy-closure in `parsing/color.ts:92` which `E-AUDIT-5` records as ACCEPTED MODULE-CYCLE DEBT, not violation).
- D7 (no nested Color/ValueUnit — bound; the 4 hardening primitives stay; recursion-guard suite stays in CI).

**Precept invariants 30-33 carry**:
- 30 (cross-repo dev-resolution / contract-v2) — verified GREEN at master HEAD (`npm run proof:resolution`).
- 31 (props fail-explicit) — verified.
- 32 (phantom-class corpus-grep) — verified.
- 33 (dead-code corpus-grep) — verified; E2 sharpens to "verify at E.W1 close" against the post-`lerpLegacy`-deletion state.

## §3 — Wave schedule (6 waves)

| Wave | Opens after | Headline | Closes on |
|---|---|---|---|
| **E.W0 HEADLINE** | open | open — state-at-open probe + glass-ui `./styles.css` adoption verify + `siblingFsAllowTransient` retire-or-narrow + chronically-deferred fold-confirm + coord refresh | smoke 21/21; the `./styles.css` adoption verified; `siblingFsAllowTransient` either retired or its residual narrowed-with-rationale; A-11 ConfigSliderPane verified retired |
| **E.W1** | W0 close | library architectural transposition + legacy retirement + barrel surface cleanup (v0.7.0 candidate — breaking) | `lerpLegacy` deleted + 51 internal-conversion exports moved behind `/internal` subpath + `WhitePointColor<T>` lifted + 152-branch nameParser replaced + `DIRECT_PATHS` table for `color2` hot paths + type-tidy lane + post-transposition bench (must hold L8's ≥ 5× + maintain or improve hot-path bench) |
| **E.W2** | W1 close | api/ pipeline parity + middleware split + transactional wiring + first backend tests | `routes/sessions.ts` + `routes/colors.ts` migrated to pipeline; `requireOwnership` wired; `client.withTransaction` wraps `deleteUser` + `fork` + `vote`; `api/src/middleware.ts` split into `middleware/*.ts`; first backend integration tests via vitest + MongoDB Memory Server |
| **E.W3** | W2 close | e2e/ coverage expansion + smoke-safari + flake fix + env-noise shared fixture | 14 interactive-flow specs added; reactivity-instant flake fixed (workers:1 or methodology refactor); smoke-safari WebKit project + 30s sustained spec; env-noise filter consolidated to fixture |
| **E.W4** | W3 close | vendor policy + CI hardening + bench gate + CW preparation + tooling refresh | vendor policy for generated shadcn-vue cluster authored; benchmark CI gate added; vue-tsc + library-build + CHANGELOG-changed + Node 22 matrix added; Playwright browser cache; Vite 7.3.3 adoption; CW peer-dep declarations verified; motion-token canon adopted |
| **E.W5 HEADLINE close** | W4 close | strengthened close — `FINAL.md`, doc drift, `coordination/Q.md` final state, merge to master, v0.7.0 tag | 7 read-only close-audit lanes + close-honesty checklist + `FINAL.md`; merge ceremony; v0.7.0 annotated tag |

**Critical path: 6 wave-slots** — W0 → W1 → W2 → W3 → W4 → W5. W2 (api/) and W3 (e2e/) are file-disjoint and gate-disjoint per the D-HARDEN-1 pattern; the orchestrator MAY parallelize them under worktree isolation (saves 1 wave-slot to 5). Default schedule is sequential for gate-isolation discipline.

E.W1 is foundational (architectural transposition changes the library shape; v0.7.0 candidate). E.W2-W4 build on the v0.7.0 substrate. E.W5 merges + tags.

## §4 — Per-wave anchors

Each wave spec under `waves/E.W0..E.W5.md` carries per-lane sub-gates, verification artefacts, and a commit plan.

- `waves/E.W0.md` — open + glass-ui `./styles.css` adoption + state-at-open probe + chronically-deferred fold-confirm + coord refresh.
- `waves/E.W1.md` — library transposition (5 lanes — legacy-clean + WhitePointColor lift + DIRECT_PATHS + nameParser + type-tidy).
- `waves/E.W2.md` — api/ pipeline parity (6 lanes — sessions/colors migration + withTransaction + ownership wiring + middleware split + cron/slugWords cleanup + first backend tests).
- `waves/E.W3.md` — e2e/ coverage + hardening (3 lanes — interactive-flow specs + smoke-safari + flake fix + env-noise fixture).
- `waves/E.W4.md` — vendor policy + CI + tooling (multiple lanes — vendor policy + bench gate + CI matrix + Vite upgrade + motion canon).
- `waves/E.W5.md` — close.

## §5 — File ownership

Each wave spec's "File bounds" section is the single source of truth. `E.md` does not duplicate the cross-walk.

Out of E's bounds:
- `glass-ui/` — read-only peer; E consumes but does not write. The 7 D-filed primitive/blob asks remain in `coordination/Q.md §3`.
- `keyframes.js/` — read-only peer; only the consumption-update ask is filed.
- `speedtest/`, `fourier-analysis/` — read-only peers; CW seed coordination is filed.
- `docs/tranches/C/` — the untracked C scaffold; not E's to write.
- Aurora + blob value.js-side demo migrations — precept-§10 blocked.

## §6 — Gate model (3 tiers — inherited from D's hardened §6)

1. **Tier 1 — invariants.** E1–E5 + 9 standing mandates + D1-D7 + precept invariants 30-33.
2. **Tier 2 — per-lane sub-gates.** Every wave lane carries one explicit sub-gate stated in the wave spec.
3. **Tier 3 — the wave gate.** A wave closes on the conjunction of sub-gates + the wave-qualified Playwright probe. E.W5 close additionally runs the close-honesty checklist + the merge-readiness 10-item matrix.

No gate closes on grep or claim alone — every sub-gate names an artefact.

## §7 — Cross-tranche debt

E inherits D's open `coordination/Q.md §3` rows + refreshes against the post-D peer activity (per `E-AUDIT-4`):

- **STANDING (glass-ui successor)** — the 7 primitive/blob gaps + `BlobDot` + `deriveAuroraPalette` + `<Tabs variant="underline">`. None shipped in glass-ui's post-Q window.
- **STANDING (keyframes.js)** — the consumption-update post-v0.6.0 (pin bump + AnimationOptions rename + Color.L migration); the precept-pin drift (different precepts tree).
- **NEW (speedtest CW)** — the monorepo workspace transposition (E.W4 sub-lane reserves preparation; value.js does not author CW).
- **MOOT** — the contract-v2 §2.1 keystone gap (PARTIALLY MITIGATED at glass-ui `9275584`; E.W0 verifies the consumption update closes the residual transient).

## §8 — Finding disposition (zero deferral with sharper escalation)

`findings.md §2` carries the full 6-audit-to-wave mapping. Every finding lands in an E wave, retires with rationale (and recorded triggering-condition for re-check), or names a cross-repo destination.

## §9 — Mode

Planning-only at open. The 6-lane audit wave executed (read-only); the synthesis is this substrate. The first execution session opens at E.W0 only after explicit user authorization.

## §10 — Authority

Plan substrate: this file + `E-PROMPTS.md` + `findings.md` + `audit/E-AUDIT-1..6` (six audit lanes) + `coordination/Q.md` (cross-repo manifest) + `dispatch/AGENT.md` (E agent contract) + `waves/E.W0..E.W5.md` (six wave specs) + `PROGRESS.md`.

Research-letter coherence: E uses the Greek-sequence convention `Eα = E-AUDIT-1 ... Eζ = E-AUDIT-6` — Latin sequence retained for the existing audit-doc naming (E-AUDIT-1 through E-AUDIT-6 in this file shape, no renames needed at open).
