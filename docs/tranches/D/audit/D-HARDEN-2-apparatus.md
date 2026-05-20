# D-HARDEN-2 — Apparatus, docs, gate-tier-model audit (read-only, planning)

**Audit date**: 2026-05-19.
**Lane**: D-HARDEN-2 (parallel to D-HARDEN-1).
**Scope**: is D's plan substrate — 21 files / 4,631 LoC — over-built like B's first plan was (B's hardening round, lane 2: 22 docs / ~2,713 lines / 5 gate tiers → pared to ~16 docs / ~3 gate tiers)?
**Mode**: read-only. No mutating git; no edits except this file.
**Sources read**: every file under `docs/tranches/D/`; B's `PROGRESS.md` line 93 (hardening trigger); B's `dispatch/AGENT.md`; B's `findings.md` (post-hardening shape).

---

## §1 — LoC table

Per-file line count (`wc -l`), sorted by surface band.

| Band | File | LoC |
|---|---|---:|
| Top-level | `D.md` | 100 |
| Top-level | `D-PROMPTS.md` | 81 |
| Top-level | `findings.md` | 80 |
| Top-level | `PROGRESS.md` | 61 |
| Coordination | `coordination/Q.md` | 100 |
| Dispatch | `dispatch/AGENT.md` | 74 |
| Research | `research/Dc-aurora.md` | 589 |
| Research | `research/Dh-contract-v2.md` | 578 |
| Research | `research/Dd-blob.md` | 499 |
| Research | `research/Dg-playwright-coverage.md` | 498 |
| Research | `research/Db-backend-legacy.md` | 457 |
| Research | `research/De-frontend-god-modules.md` | 366 |
| Research | `research/Df-styling.md` | 358 |
| Research | `research/Da-hitherto-deferrals.md` | 287 |
| Waves | `waves/D.W2.md` | 87 |
| Waves | `waves/D.W5.md` | 78 |
| Waves | `waves/D.W3.md` | 73 |
| Waves | `waves/D.W1.md` | 71 |
| Waves | `waves/D.W0.md` | 70 |
| Waves | `waves/D.W4.md` | 66 |
| Waves | `waves/D.W6.md` | 58 |
| **Total** | 21 files | **4,631** |

Files >300 LoC: **8** — all research docs (`Dc 589`, `Dh 578`, `Dd 499`, `Dg 498`, `Db 457`, `De 366`, `Df 358`). `Da 287` falls just under. Total research-doc LoC: **3,632 (78% of the substrate)**.

Comparison anchor: B's plan substrate (non-audit, post-hardening) is **1,925 LoC across 20 files** (`/Users/mkbabb/Programming/value.js/docs/tranches/B/*.md` excluding `audit/`); B at first-plan / pre-hardening was ~2,713 / 22 docs. D's 4,631 / 21 docs is **+140%** vs B's pared substrate and **+71%** vs B's first plan. Most of the delta is research-doc weight (D's 8 lanes vs B's 5–7).

**Verdict**: D is heavier than B but the seven >300-line files are all research lanes whose scope is genuinely large (Dc carries a 55-line algorithm sketch; Dh quotes contract-v2 verbatim; Dg enumerates 14 views; Db audits 13 backend files). Apparatus weight (top-level + coordination + dispatch + waves) is **874 LoC across 13 files** — leaner than B's apparatus (1,159 LoC across 13 files). Bloat does NOT live in the apparatus; it lives in the long-tail research docs, and even there the depth is mostly justified by the user's audit directive.

---

## §2 — Duplication scan

| Check | Verdict | Evidence |
|---|---|---|
| `findings.md §1` duplicates `D-PROMPTS.md`? | **CLEAN** | `findings.md:8-10` is a 3-line pointer ("Verbatim user-prompt and precept recap is in `D-PROMPTS.md` … This file does not duplicate; it maps every finding to a wave.") — same pared shape as B's post-hardening `findings.md:9-11`. |
| `D-PROMPTS.md` duplicates `findings.md §1`? | **CLEAN** | `D-PROMPTS.md` is the prompt + precept ledger; `findings.md §2` is the audit-to-wave table. No content overlap. |
| `coordination/Q.md` carries stale B-vintage rows? | **MOSTLY CLEAN** | `coordination/Q.md:10-20` is an explicit "Inheritance from B↔Q coordination" §1 — by design references B's state. `§3` rows are D-refreshed (7-addition metaballs surface; algorithm sketch; 16-instance BlobDot — `coordination/Q.md:30-41`). `§4` is one line "MOOT — recorded in `B/coordination/Q.md §4`" — correct pointer, not stale row. `§9` keyframes.js explicitly notes B's "6 gaps" framing is stale and refreshes the verdict (`coordination/Q.md:90-96`). No silent staleness. |
| Wave specs duplicate scope already in their source research doc? | **MIXED** | Wave specs are mostly thin — `D.W2.md` (87 LoC) cites `research/Db-backend-legacy.md §1/§2/§3/§4/§6` rather than re-explaining; same pattern in `D.W3.md` (cites `research/De §1/§2/§6/§8`), `D.W4.md` (cites `research/Df §1/§2/§5/§6/§7/§8`), `D.W5.md` (cites `research/Dg §1/§2/§3/§6`). **Exception**: `research/Dh-contract-v2.md §5` (`Dh:480-562`, 84 lines) is a full "Recommended D-wave shape" — duplicates the L1–L5 lane plan that `waves/D.W1.md` (71 LoC) now carries. This is the only material wave-vs-research scope-duplication site. |
| `dispatch/AGENT.md` duplicates B's `dispatch/AGENT.md`? | **HIGH DUPLICATION** | `diff B/dispatch/AGENT.md D/dispatch/AGENT.md` shows ~67 of 74 lines are B→D rename + small adjustments (git clause verbatim; cross-repo boundary verbatim modulo letter; runtime-evidence verbatim modulo subset; build-hygiene verbatim modulo `build:watch` note). The header line 3 says "Inherits B's hardened dispatch contract … the deltas for D are at §What's new" but the whole contract is re-stated rather than truly inherited by reference. **Genuine D-deltas**: §"Fail-explicit (D3 — new in D)" (1 short section), §"E2e gate" (D.W5 framing), §"What's new in D" (5 bullets). The other 60+ lines are duplicated. |

**Duplication-finding count**: **2 material** (Dh §5 vs D.W1; AGENT.md vs B's AGENT.md) + **1 cosmetic** (the "Inherits" header in AGENT.md is hollow). Each is a candidate pare.

---

## §3 — Gate-tier verification

Per-wave check: does each wave carry **Tier-2 (per-lane sub-gates)** and **Tier-3 (wave gate as conjunction)**, and does any wave carry a **legacy `## Hard gate` list** that just restates sub-gates?

| Wave | LoC | Has explicit sub-gates? | Has Tier-3 conjunction? | Has legacy `## Hard gate` list? |
|---|---:|---|---|---|
| D.W0 | 70 | ✓ Sub-gate 0, A, B (`D.W0:20, 32, 44`) | ✓ `## Gate` (`D.W0:54-56`) "conjunction of sub-gates 0 + A + B + a single 1280×800 light boot probe" | **NO** |
| D.W1 | 71 | ✓ Sub-gate D.W1 single (`D.W1:58`) — author flags "single, since the 5 lanes are surgical" | ✓ same §Gate is the sub-gate (single-lane reduction) | **NO** |
| D.W2 | 87 | ✓ Sub-gate A, B, C, D (`D.W2:23, 29, 41, 58`) | ✓ `## Gate` (`D.W2:69-71`) "conjunction of sub-gates A–D + a backend integration probe" | **NO** |
| D.W3 | 73 | ✓ Sub-gate A, B, C (`D.W3:30, 36, 46`) | ✓ `## Gate` (`D.W3:56-58`) "conjunction of sub-gates A + B + C + a 3-viewport-light Playwright probe" | **NO** |
| D.W4 | 66 | ✓ Sub-gate A, B (`D.W4:20, 41`) | ✓ `## Gate` (`D.W4:50-52`) "conjunction of sub-gates A + B + a 3-viewport-light Playwright probe with a pixel-diff" | **NO** |
| D.W5 | 78 | ✓ Sub-gate A, B, C (`D.W5:28, 42, 51`) | ✓ `## Gate` (`D.W5:61-63`) "conjunction of sub-gates A + B + C. **All projects green**" | **NO** |
| D.W6 | 58 | — close-audit lanes (1–7) listed with named scope; no explicit "Sub-gate" markers (close ceremony reads as audit lanes + close ceremony) | ✓ `## Gate` (`D.W6:38-40`) "conjunction of the 7 close-audit lanes + the close-honesty checklist + the visual-runtime re-probe" | **NO** |

**Gate-tier-violation count**: **0**. Every wave conforms to the 3-tier shape (D1–D5 + invariants 30–33 Tier-1; per-lane sub-gates Tier-2; wave-gate conjunction Tier-3). **No `## Hard gate` legacy lists anywhere** — confirmed by `grep -nE "^## |^### " D/waves/*.md` (only `## Gate`, not `## Hard gate`).

Minor cosmetic note: D.W1 collapses to a single sub-gate (lanes are surgical/sequential), and D.W6 names "close audit lanes" instead of "Sub-gate N" labels. Both are legitimate reductions, not violations.

---

## §4 — Research-doc consolidation verdict

The 8 `research/Da..Dh` docs at a glance:

| Lane | Topic | LoC | Consolidation candidate? |
|---|---|---:|---|
| Da | hitherto-deferrals + prompt ledger | 287 | **NO** — singular role (the prompt ledger); cited from `findings.md` |
| Db | backend (api/) legacy | 457 | **NO** — singular scope (api/, 13 files); load-bearing for D.W2 |
| Dc | aurora deep dive + derive-from-color | 589 | **NO** (see below) |
| Dd | blob extirpation + glass-ui augmentation | 499 | **NO** (see below) |
| De | frontend god modules | 366 | **NO** — singular scope (demo/) |
| Df | styling + design idioms | 358 | **NO** — singular scope |
| Dg | Playwright coverage | 498 | **NO** — singular scope (e2e/) |
| Dh | contract-v2 alignment | 578 | **partial trim** — `§5` (lines 480-562, ~84 lines) is wave-shape duplication of `D.W1.md`; the spec is now in the wave |

**Dc + Dd merge into "Dc-d-glass-ui-blocked.md"?** Considered and **rejected**. Both depend on the same glass-ui ship, but their substantive content is disjoint: Dc carries the 30-field `AuroraConfig` + 55-line `deriveAuroraPalette` algorithm sketch (`Dc:235-414`); Dd carries the `useMetaballs` API table + the 7-gap surface (G1–G7) + the file-by-file extirpation delta (≈ −865 LoC). The shared scope is the "filed, glass-ui-blocked" disposition — a 1-row entry in `coordination/Q.md §3`. Merging would inflate one doc to ~1,080 LoC and lose the lane-letter discoverability (Dc is a derive-from-color spec; Dd is a metaball API audit). Keep them separate. The "same disposition" linkage is already named in `findings.md §3` and `coordination/Q.md §3`.

**Verdict**: research consolidation is NOT warranted. The only actionable pare in the research surface is `Dh §5`, which can compress to a 5-line "single wave, 5 lanes; see `waves/D.W1.md`" pointer.

---

## §5 — Orchestrator-direct rationale check

| Wave | Lanes | Orchestrator-owned? | Rationale |
|---|---|---|---|
| D.W0 | Lane 0 (orchestrator preamble) + Lane A + Lane B | Lane 0 only | Lane 0 is a precept submodule pointer advance — read precepts repo, verify SHA exists/codifies contract-v2, then `git checkout` the submodule. Inherently orchestrator (manipulates the index). Lanes A and B are agent-dispatchable. **Defensible.** |
| D.W1 | L1 + L2 + L3 + L4 + L5 | **Whole wave** (`D.W1:4` "Orchestrator-owned") | L1 = 1 `package.json` hunk; L2 = `vite.config.ts` constant + 5 callsites; L3 = port a script + add npm script; L4 = verification; L5 = doc edit. The wave spec's stated rationale is "the changes are surgical and cross-config." That is true for L1+L2+L3 individually but does NOT preclude agent dispatch (B.W0 dispatched the precept advance + multiple parallel B-residual lanes to agents). **Mild over-fit**: there's no contrivance-rationale parallel to B.W1's "layout is the user-named contrived surface" — the contract-v2 lanes are just small and sequential. Could be agent-dispatched as a single linear-lane agent with the 5 sub-edits in one prompt. **Defensible but light**. |
| D.W2 | Lanes A, B, C, D | **NO** — fully agent-dispatched | Backend split + service/repo + legacy excision. Per-lane explicit. Worktree isolation called out for A+B. Clean. |
| D.W3 | Lanes A, B, C | **NO** — fully agent-dispatched | PaletteDialog split + facade + codemod. Clean. |
| D.W4 | Lanes A, B | **NO** — fully agent-dispatched | Tailwind surfacing + design-idiom catalog. Clean. |
| D.W5 | Lanes A, B, C | **NO** — fully agent-dispatched | E2e expansion. Clean. |
| D.W6 | 7 close-audit lanes + ceremony | Read-only close (typical) | Audit lanes are dispatched agents; ceremony writes are orchestrator. Per precept policy. |

**Orchestrator-direct count**: 1.x of 7 waves (D.W1 whole + D.W0 Lane 0). **Balanced.** D.W1's whole-wave-orchestrator framing is the only mild over-fit — recommend explicitly justifying it ("5 lanes are mechanical and sequential; an agent could carry them but adds no parallelism") or down-rating to "agent-dispatchable, orchestrator if sequenced manually."

---

## §6 — Recommended apparatus paring

Conservative pares (do not lose content; eliminate genuine duplication / unnecessary wave-shape restatement). Expected total delta: **~70-90 LoC** (≈ 1.5-2% of substrate). D is NOT meaningfully over-built; the pares listed below are quality-of-life.

| # | Action | File | Lines pared | Delta |
|---|---|---|---:|---:|
| P1 | **Pare `Dh §5` "Recommended D-wave shape" to a 5-line pointer** at the wave: the L1–L5 table in `Dh:486-497` and the §5.2 ordering / §5.3 not-proposed / §5.4 single-or-split / §5.5 fit-in-D-plan sub-sections (`Dh:480-562`) are now executed by `waves/D.W1.md` (71 LoC). Keep §5's single-wave verdict + lane summary; route detail to the wave. | `research/Dh-contract-v2.md` | 84 → ~10 | **−74** |
| P2 | **Strip `dispatch/AGENT.md` to deltas-only.** Currently 74 LoC with ~60 lines verbatim from `B/dispatch/AGENT.md`. The header already says "Inherits B's hardened dispatch contract" — make it literal: keep the git clause (binding, MUST be visible at the contract surface — non-negotiable, do not link-out), then a section heading "Inherited verbatim from B" listing the inherited section names, then the D-only sections (Fail-explicit D3; the D.W5 e2e expansion note; What's new in D). | `dispatch/AGENT.md` | 74 → ~25-30 | **−45** |
| P3 | **D.W1 framing tweak** (no LoC change worth counting). Change `D.W1:4` "Orchestrator-owned (the changes are surgical and cross-config…)" to "Orchestrator-sequenced (5 surgical lanes; no parallelism gain from agent dispatch; orchestrator carries them in one commit)." Names the choice rather than implying contrivance. | `waves/D.W1.md` | 0 (rewording) | **0** |
| P4 | **No research consolidation.** Dc ↔ Dd merge rejected (§4); no other pair shares substrate. | — | — | **0** |
| P5 | **No `findings.md §1` deletion.** Already at the pointer shape that B's hardening landed on. | — | — | **0** |
| P6 | **No `coordination/Q.md` row pare.** No B-vintage stale rows; the inheritance is by-design and refreshed where needed. | — | — | **0** |

**Total recommended pare**: **−119 LoC** (≈ 2.6% of substrate).

After pare: **4,512 LoC / 21 files** (no doc deletion — every doc carries unique-enough content; only two trim sites). The substrate becomes leaner without losing any finding, gate, or rationale.

### What is NOT recommended

- Do not pare `research/Dc-aurora.md`'s 30-field aurora-config table or 55-line algorithm sketch (`Dc:135-410`) — they are the lane's load-bearing content; would lose precision on the glass-ui ask.
- Do not pare `research/Dh-contract-v2.md §1` (contract-v2 spec quote) or `§2` (value.js current-state vs target) — these are the wave's source authority.
- Do not collapse the 7-wave schedule into fewer waves. The waves are file-disjoint and the gate-isolation discipline (D.W2 backend vs D.W3 frontend vs D.W4 styling vs D.W5 e2e) is sound.
- Do not collapse the 3-tier gate model. All 7 waves conform; the model is leaner than B's pre-hardening 5-tier and matches the gate-tier verdict in B's hardening lane 2.

---

## §7 — Summary

D's apparatus is **substantially heavier than B's** in absolute LoC (+71% vs B's first plan, +140% vs B's pared) but the weight lives in research lanes (78% of substrate) whose depth is mandated by the user's 8-lane directive. The wave / coordination / dispatch / top-level shell is **leaner than B's** at the equivalent state. Gate-tier model conforms cleanly; zero legacy `## Hard gate` lists. No silent B-vintage staleness in `coordination/Q.md`; the inheritance is by-design and refreshed. The only duplication sites are (a) `Dh §5` wave-shape restating `D.W1.md`'s plan and (b) `dispatch/AGENT.md` re-stating B's contract under a hollow "Inherits" header. Recommended pare: **−119 LoC**, no doc deletions, no research consolidation, no wave restructure. D is not meaningfully over-built; the pares are quality-of-life, not load-bearing.
