# HARDEN-1 — A↔Q de-duplication + boundary audit

**Artefact class**: hardening-lane deliverable. Drives the rewrite of `coordination/Q.md` and the A wave specs.
**Date**: 2026-05-18.
**Inputs**: value.js A — `A.md`, `findings.md`, `coordination/Q.md`, `waves/W0..W5.md`, `PROGRESS.md`. glass-ui Q — `Q.md`, `findings.md`, `coordination/CONSTELLATION.md`, `PROGRESS.md`, `waves/W0..W5.md`.
**Scope**: this file only. No other file is modified.

## §0 — The defect in one paragraph

A.md §1 declares A owns every value.js write. `coordination/Q.md §2` restates it and says Q's WRITER-in-value.js grant is withdrawn. Neither statement reached glass-ui Q's wave specs. Q.W1 Lane C ("value.js un-break") and Q.W2 Lane B ("value.js Card migration, 11 SFCs") still write value.js directly, with their own commit-hash deliverables and gate rows. Q.md §5 still says "value.js ... all receive resolver-config writes" and CONSTELLATION.md §4 still grants Q WRITER in value.js. The withdrawal lives only in A's repo; Q's plan never absorbed it. Two orchestrators both believe they own the same files. The result is a double-write race on `vite.config.ts` and 11 SFCs, plus a gate (Q.W1 hard gate (d)) that silently depends on a tranche in a different repo.

## §1 — Item-by-item overlap map

Every value.js-touching item in Q's six wave specs, cross-walked against A's wave items. Verdict column: DUPLICATE (same write, both plans claim it), PARTIAL (related, scopes differ), Q-ONLY (Q touches value.js, A does not), A-ONLY (A item with no Q equivalent — listed for completeness of the boundary).

| # | value.js write | Q wave:lane | Q citation | A wave:lane | A citation | Verdict |
|---|---|---|---|---|---|---|
| 1 | Retire `vite.config.ts` hard alias `@mkbabb/keyframes.js → ../keyframes.js/dist/...` | Q.W1 Lane C | `Q/waves/W1.md:23` | A.W0 Lane A item 1 | `A/waves/W0.md:16` | **DUPLICATE** |
| 2 | Add `resolve.conditions` to value.js Vite config | Q.W1 Lane C | `Q/waves/W1.md:24` | A.W0 Lane A item 2 | `A/waves/W0.md:17` | **DUPLICATE** |
| 3 | Route `gh-pages` demo build off the library `dist/` (clobber fix) | Q.W1 Lane C | `Q/waves/W1.md:25` | A.W0 Lane C item 2 | `A/waves/W0.md:33` | **DUPLICATE** — note the two plans disagree on the target dir (see §1a) |
| 4 | Resolve value.js WIP-vs-master canonical branch (Q-chron-1 / PD-3) | Q.W1 Lane C | `Q/waves/W1.md:26` | A.W0 Lane A item 4 | `A/waves/W0.md:19` | **DUPLICATE** |
| 5 | Confirm `package.json` carries no other `dist/`-pinned `@mkbabb/*` alias | Q.W1 Lanes D-G pattern (resolver sweep) applied to value.js via Lane C | `Q/waves/W1.md:23-26`, `Q.md §4 Q-break-5` | A.W0 Lane A item 3 | `A/waves/W0.md:18` | **DUPLICATE** (Q folds it into the Lane C resolver write) |
| 6 | Migrate 11 `<Card variant="pane">` SFCs to `tier` | Q.W2 Lane B | `Q/waves/W2.md:20-21` | A.W1 Lane A | `A/waves/W1.md:13-16` | **DUPLICATE** — Q.W2 Lane B even fixes the `tier` value (`tier="wash" :shadow="false"`), which A.W1 leaves as a per-site choice (see §1a) |
| 7 | glass-ui `Card` props fail-explicit (invariant 31) | Q.W2 Lane A | `Q/waves/W2.md:8-17` | A files it, A consumes it; A.W1 Lane A item 3 depends on it | `A/coordination/Q.md §3` row "Card props fail-explicit"; `A/waves/W1.md:16` | **Q-ONLY** (correct — glass-ui substrate; A is reader) |
| 8 | keyframes.js `package.json` `exports` 4-key fix | Q.W1 Lane A | `Q/waves/W1.md:10-14` | A reads it; A.W0 Lane A depends on it | `A/waves/W0.md:21`, `A/coordination/Q.md §2` | **Q-ONLY** (correct — keyframes.js is Q's writer surface) |
| 9 | glass-ui phantom `@mkbabb/value.js` devDep retiral | Q.W1 Lane B | `Q/waves/W1.md:16-18` | not in A's plan | — | **Q-ONLY** (correct — the write is in glass-ui's `package.json`, not value.js) |
| 10 | Aurora integration migration — `App.vue:321-334` off the retired `useAuroraBlobs`/`AuroraBlobsConfig` schema (A-key-2, the mount-fatal crash) | not in any Q wave | absent from Q's inheritance ledger — `coordination/Q.md §4` is the correction A hands Q | A.W0 Lane B | `A/waves/W0.md:23-28` | **A-ONLY** (Q never saw this fault; Q's probe ran on glass-ui's own demo) |
| 11 | GooBlob null-canvas guard `useMetaballRenderer.ts:131` (A-key-3) | not in any Q wave | — | A.W0 Lane C item 1 | `A/waves/W0.md:32` | **A-ONLY** |
| 12 | Wire a `typecheck` script into value.js `package.json` | not in any Q wave | — | A.W0 Lane C item 3 | `A/waves/W0.md:34` | **A-ONLY** |
| 13 | The W2–W5 demo design work (dock calc-chain, tokens, type scale, four-state buttons, decomposition, blob/aurora abstraction) | not in any Q wave | — | A.W2 / A.W3 / A.W4 / A.W5 | `A/waves/W2..W5.md` | **A-ONLY** (Q's demo-side scope stops at the Card migration) |

**Count**: 6 pure DUPLICATE items (1-6), 3 correct Q-ONLY items (7-9), 4 A-ONLY items (10-13). Items 1-6 are the de-duplication surface. Items 7-9 are the genuine Q-owned cross-repo halves and stay. Items 10-13 are A-owned and uncontested.

### §1a — Two latent conflicts inside the DUPLICATE set

The duplicates are not byte-identical. Where both plans specify the same write differently, a double-write is also a content conflict:

- **Item 3, the clobber target.** A.W0 Lane C routes the `gh-pages` build to `dist/gh-pages/` (`A/waves/W0.md:33`). Q.W1 Lane C routes it to `dist/gh-pages/` "mirror the existing `dist/hero-lab/` precedent" (`Q/waves/W1.md:25`). Same directory name, so this one happens to converge — but only by luck. If Q's lane author had picked `build/demo/` the two tranches would have shipped divergent build configs.
- **Item 6, the tier value.** Q.W2 Lane B hard-codes `<Card tier="wash" :shadow="false">` for all 11 sites (`Q/waves/W2.md:21`). A.W1 Lane A item 2 says "choose the correct `tier` per call-site from the surface convention `research/Ad` recommends" (`A/waves/W1.md:15`) — a per-site decision. These are different migrations. If both run, the second overwrites the first, and which design wins is decided by execution order, not by design review.

Both conflicts vanish once the boundary is enforced and only one tranche writes. They are listed because they prove the duplication is not harmless redundancy.

## §2 — Gate coupling (cross-tranche gate dependencies, both directions)

### §2a — A waves depending on Q

| A gate | Depends on | Q citation | Nature |
|---|---|---|---|
| A.W0 Lane A clean close | keyframes.js `exports` 4-key fix landed | `A/waves/W0.md:21,68`; Q.W1 Lane A `Q/waves/W1.md:10-14` | A.W0 Lane A retires the alias; the alias retired means value.js resolves keyframes.js through conditional exports — which only works once keyframes.js's `exports` map is correct. A cannot edit keyframes.js (`coordination/Q.md §2`). So A.W0 Lane A's *clean close* needs Q.W1 Lane A done. |
| A.W1 Lane A verification | glass-ui `Card` props fail-explicit | `A/waves/W1.md:3,16`; Q.W2 Lane A `Q/waves/W2.md:8-17` | A.W1's gate "Q.W2's `Card` warning is silent at boot" (`A/waves/W1.md:37`) needs the warning mechanism to exist. Without Q.W2 Lane A, A.W1 can still migrate but cannot verify by warning-absence. |
| A.W5 implementation lanes | glass-ui metaballs `positionSource` + Aurora `deriveAuroraPalette` + `BlobDot` + `ConfigSliderPane` | `A/waves/W5.md:11-25`; `A.md §9` | Not in Q's wave plan at all. A.md §9 already declares this a brittleness window with a named-successor fallback. |

### §2b — Q waves depending on A (the unstated, dangerous direction)

This is the coupling neither plan names. Q's gates assume Q writes value.js. Once A owns the value.js write, those same Q gates depend on A having run — but Q's wave specs never say so.

| Q gate | Now depends on | Q citation | Risk |
|---|---|---|---|
| Q.W1 hard gate (d) — "all 5 consumers `npm run build` + typecheck GREEN" | A.W0 having run (value.js is one of the 5 consumers; its build-green needs the alias retired, `resolve.conditions` added, AND A-key-2's Aurora crash fixed) | `Q/waves/W1.md:37` | **Hard cross-tranche dependency, currently unstated.** Q.W1 cannot close its gate (d) unless A.W0 closed first. Q's plan has no edge to A. |
| Q.W1 hard gate (c) — "value.js boots (dev) + builds ...; WIP-vs-master resolved" | A.W0 Lane A + Lane B + Lane C entirely | `Q/waves/W1.md:36` | Same. Gate (c) is literally A.W0's gate, restated in Q's repo. |
| Q.W1 hard gate (e) — "`npm run proof:resolution` PASSES" | `proof-resolution-contract.mjs` checks "no consumer Vite config carries a hard `dist/` alias" (`Q/waves/W0.md:34`). value.js is a consumer. The check passes only after value.js's alias is retired — an A.W0 write | `Q/waves/W0.md:34`, `Q/waves/W1.md:38` | The Q-authored gate script's pass condition includes a file A owns. Q's W1 close is gated on A's W0. |
| Q.W2 hard gate (b) — "value.js 11 sites migrated; value.js build + typecheck GREEN" | A.W1 Lane A having run | `Q/waves/W2.md:30` | Same shape one wave later. |
| Q.W5 consumer re-audit lane "value.js — un-break verified ...; 11 Card sites migrated; WIP-vs-master resolved" | A.W0 + A.W1 closed | `Q/waves/W5.md:24` | Q's close ceremony verifies A's work. This one is fine *as a reader-check* — see §3. The problem is only that W1/W2 also claim the *write*. |

### §2c — Circular / deadlock analysis

Walk the edges. Q.W1 gate (d)+(c)+(e) need A.W0 done. A.W0 Lane A needs Q.W1 Lane A done (keyframes.js `exports`). That is the loop:

```
A.W0 Lane A  ──needs──▶  Q.W1 Lane A  (keyframes.js exports fix)
Q.W1 gate (d/c/e)  ──needs──▶  A.W0  (value.js alias retire + boot)
```

It is not a true deadlock, because the loop runs *through different lanes of the same Q wave*. Q.W1 Lane A (keyframes.js) and Q.W1 gate-(d) (the 5-consumer verification) are not simultaneous — Lane A is explicitly first ("This lane lands FIRST + is verified against all 5 consumers", `Q/waves/W1.md:14`). The real ordering the loop forces is:

```
1. Q.W1 Lane A   keyframes.js exports fix lands
2. A.W0          value.js alias retire + resolve.conditions + Aurora fix + clobber + guard
3. Q.W1 gate (d) verifies value.js (now A-fixed) builds GREEN
```

So there is no cycle once you separate Q.W1's *lanes* from Q.W1's *gate*. But the plans as written hide this: Q.W1 Lane C *also* does step 2, which means Q.W1 internally does step 2 between its own Lane A and its own gate — and A.W0 *also* does step 2. Whichever runs second clobbers the first. The deadlock risk is low; the **double-write race is certain** if both plans execute as written. The fix is to delete Q.W1 Lane C and make Q.W1 gate (d) a reader-check that waits on A.W0 (§3, §4).

One genuine ordering hazard remains. Q.W1's hard gate is monolithic — (a) through (h) must all be green for the wave to close. Gate (d) needs A.W0. If A.W0 has not run, Q.W1 cannot close at all, and Q.W2..W5 are blocked behind it (`Q.md §3` critical path is linear). So an un-run A.W0 stalls the *entire Q tranche*, not just one lane. That is the deadlock-adjacent risk worth flagging: Q's linear critical path makes a single unstated cross-tranche dependency a whole-tranche stall.

## §3 — Clean boundary proposal

The principle from A.md §1 and `coordination/Q.md §2`: A writes value.js, Q writes glass-ui and keyframes.js, neither writes the other's repo. Apply it to every item in §1.

### §3a — Q lanes to DELETE (A owns the write)

| Q lane | Reason | Replaced by |
|---|---|---|
| **Q.W1 Lane C** ("value.js un-break") in full | Items 1-5 are all A.W0 writes. value.js is A's primary repo. | A.W0 Lanes A + C |
| **Q.W2 Lane B** ("value.js Card migration, 11 SFCs") in full | Item 6 is an A.W1 write. | A.W1 Lane A |

### §3b — Q lanes/gates to convert to READER-CHECK (Q verifies A's evidence, writes nothing)

| Q surface | New form |
|---|---|
| Q.W1 hard gate (c) "value.js boots + builds; WIP-vs-master resolved" | Reader-check: Q reads A's `audit/W0-playwright-boot/` + `audit/W0-build-typecheck.md` artefacts. Q does not boot or build value.js itself; it confirms A's gate evidence exists and is green. |
| Q.W1 hard gate (d) "all 5 consumers build GREEN" | Reader-check for value.js specifically: Q verifies via A's W0 evidence. Q still directly builds the other 4 consumers (fourier-analysis, bbnf-buddy, words/frontend, speedtest) — those have no peer tranche, so Q remains their writer. |
| Q.W2 hard gate (b) "value.js 11 sites migrated; build GREEN" | Reader-check: Q reads A's `audit/W1-class-resolution.md` + `audit/W1-playwright/`. |
| Q.W5 consumer re-audit lane "value.js" | Already a read-only audit lane — keep as-is. It is the correct reader posture; it just must not also imply Q did the writes. |

### §3c — Lanes that stay Q-WRITER (correct as written)

| Q lane | Surface | Why it stays |
|---|---|---|
| Q.W0 Lanes A/B/C | glass-ui `docs/`, `docs/precepts/`, `scripts/` | glass-ui-internal |
| Q.W1 Lane A | keyframes.js `package.json` | keyframes.js is Q's writer repo per `coordination/Q.md §2` and CONSTELLATION.md §4 |
| Q.W1 Lane B | glass-ui `package.json` (phantom devDep) + glass-ui Vite config | glass-ui-internal |
| Q.W1 Lanes D-G | fourier-analysis / bbnf-buddy / words/frontend / speedtest resolver configs | those 4 consumers have no peer tranche; Q is their sole writer |
| Q.W2 Lane A | glass-ui `Card` component | glass-ui-internal substrate; this is the fail-explicit A consumes |
| Q.W2 Lane C | bbnf-buddy 6 Card SFCs | bbnf-buddy has no peer tranche; Q is its writer |
| Q.W3 / Q.W4 / Q.W5 | glass-ui `styles/`, `tokens.css`, `docs/`, precepts | glass-ui-internal |

### §3d — A lanes (no change needed — A's plan is already correct)

A.W0 Lanes A/B/C and A.W1 Lane A already claim items 1-6 and 10-12. A.md §7 and `findings.md §4` already record the absorption. A's plan needs no scope change. A's *coordination doc* needs the gate-handoff protocol added (§6, §7). The one A-side gap: A.W0 Lane A's dependency on Q.W1 Lane A is recorded (`A/waves/W0.md:21`), but A's docs do not state that Q.W1's *gate* now depends on A.W0 — A should record the reverse edge so the handoff is legible from both repos.

### §3e — Airtight ownership table

| value.js surface | Item # | Owner | Writer wave:lane | Reader wave:lane (verifies, does not write) |
|---|---|---|---|---|
| `vite.config.ts` alias retire | 1 | **A** | A.W0 Lane A | Q.W1 gate (c/d) reader-check |
| `vite.config.ts` `resolve.conditions` | 2 | **A** | A.W0 Lane A | Q.W1 gate (e) `proof:resolution` reads it |
| `vite.config.ts` `gh-pages` outDir | 3 | **A** | A.W0 Lane C | Q.W1 gate (c) reader-check |
| value.js WIP-vs-master branch decision | 4 | **A** | A.W0 Lane A (recorded in `PROGRESS.md`) | Q.W1 gate (c), Q.W5 re-audit reader-check |
| `package.json` alias audit | 5 | **A** | A.W0 Lane A | Q.W1 gate (e) reader-check |
| 11 `<Card variant="pane">` SFCs | 6 | **A** | A.W1 Lane A | Q.W2 gate (b), Q.W5 re-audit reader-check |
| `App.vue` Aurora migration (A-key-2) | 10 | **A** | A.W0 Lane B | — (not in Q's ledger; `coordination/Q.md §4` informs Q) |
| `useMetaballRenderer.ts` null-guard | 11 | **A** | A.W0 Lane C | — |
| `package.json` `typecheck` script | 12 | **A** | A.W0 Lane C | — |
| W2–W5 demo design surfaces | 13 | **A** | A.W2..W5 | — |
| keyframes.js `package.json` `exports` | 8 | **Q** | Q.W1 Lane A | A.W0 Lane A reads the result |
| glass-ui `Card` fail-explicit | 7 | **Q** | Q.W2 Lane A | A.W1 Lane A consumes it |
| glass-ui phantom devDep | 9 | **Q** | Q.W1 Lane B | — |
| glass-ui metaballs/aurora API extensions | — | **Q** (if accepted) | not yet scheduled in Q | A.W5 consumes; `A.md §9` brittleness window |
| `docs/precepts` submodule | — | **Q** (advance, at Q close) | Q.W5 | A acknowledges new SHA in `PROGRESS.md` (§8) |

## §4 — Gate-handoff protocol (A.W0 ↔ Q.W1 across the repo boundary)

Neither orchestrator writes the other's repo. The handoff is evidence, passed by artefact, read at a recorded SHA.

### §4a — Ordering

The keyframes.js `exports` fix is upstream of value.js's clean boot. value.js's alias-retired Vite config is what `proof:resolution` checks. Q.W1 Lane A is therefore *before* A.W0 Lane A's close; A.W0 as a whole is *before* Q.W1's gate. Precise sequence:

```
Step 1   Q.W0 closes — proof-resolution-contract.mjs ships, contract doc + precept edict drafted.
                       (proof:resolution is expected-FAIL here; the fleet is mid-desync — Q/waves/W0.md:43)
Step 2   Q.W1 Lane A — keyframes.js package.json exports 4-key fix lands + pushed.
                       Q records the keyframes.js commit SHA.
Step 3   A.W0 opens — A reads keyframes.js at the SHA Q recorded in step 2.
                       A.W0 Lane A: retire value.js alias + add resolve.conditions.
                       A.W0 Lane B: Aurora migration.  A.W0 Lane C: GooBlob guard + clobber + typecheck script.
                       A.W0 closes on its own gate (Playwright ×3 + build + vue-tsc + npm test).
                       A records the W0 close commit SHA + publishes audit/W0-playwright-boot/ + audit/W0-build-typecheck.md.
Step 4   Q.W1 Lanes B, D-G — glass-ui devDep retiral + the other 4 consumers' resolver sweep
                       (these do not depend on A and may run in parallel with step 3).
Step 5   Q.W1 gate — Q reads A's W0 close SHA + A's W0 audit artefacts; verifies value.js is GREEN
                       from A's evidence (reader-check, §3b). Q runs proof:resolution — it now PASSES
                       because value.js's alias is gone (A's step-3 write) and the other consumers are
                       swept (Q's step-4 write). Q.W1 closes.
```

A.W0 runs **after** Q.W1 Lane A and **before** Q.W1's gate. Q.W1 Lane A is not a whole wave; it is one lane that lands and pushes early ("lands FIRST", `Q/waves/W1.md:14`). So the cross-repo gate is lane-granular, not wave-granular, and the ordering holds without a stall — provided Q.W1's gate is allowed to wait on A.W0 rather than do the value.js write itself.

### §4b — Who verifies value.js GREEN

A verifies value.js GREEN. A.W0's hard gate (`A/waves/W0.md:46-52`) is the authoritative value.js-GREEN signal: `npm run dev` boots clean, Playwright ×3 viewports zero console errors, `npm run build`, `vue-tsc`, `npm test`. Q does not re-run these. Q.W1 gate (d) for value.js becomes "A.W0 closed; A's `audit/W0-build-typecheck.md` shows build + typecheck green; A's `audit/W0-playwright-boot/` shows a clean ×3 boot" — a reader-check against A's published artefacts at A's recorded W0 SHA. `proof:resolution` is the one mechanical check Q runs that *touches* value.js's file, and it only reads `vite.config.ts` for alias-absence; that is a read, not a write, and it is correct for Q to run.

### §4c — If A.W0 has not run when Q.W1 reaches its gate

`coordination/Q.md §2` already says A holds a dependent lane and records the wait. The reverse must also hold and must be written into Q's plan: if A.W0 has not closed, Q.W1 *cannot* close gate (d) for value.js. Q.W1 then either (i) closes gate (d) for the 4 non-value.js consumers and records value.js as "pending A.W0" — a partial close with a named blocker — or (ii) Q.W1 holds. Q's plan today assumes Q does the value.js write inside Lane C, so it never confronts this. The protocol must add the explicit rule: **Q.W1's gate (d) value.js row is satisfied by A.W0's evidence; if absent, it is a recorded cross-tranche wait, not a Q failure.**

## §5 — Merged cross-tranche sequencing

The single timeline both tranches must agree on. Q's critical path (`Q.md §3`) is W0→W1→W2→W3→W4→W5 linear. A's (`A.md §3`) is W0→W1→W2→W3→W4→W5 linear. The cross-edges bind them at three points: keyframes.js exports (Q.W1 LaneA → A.W0), Card fail-explicit (Q.W2 LaneA → A.W1), metaballs/aurora API (unscheduled Q → A.W5).

| Order | Tranche/wave | Action | Gated by |
|---|---|---|---|
| 1 | Q.W0 | contract doc + `proof-resolution-contract.mjs` + AB+2 retrospective + precept edict draft | — |
| 2 | Q.W1 Lane A | keyframes.js `exports` 4-key fix lands + pushed; SHA recorded | Q.W0 close |
| 3 | **A.W0** | value.js un-break (alias + conditions + Aurora + guard + clobber + typecheck script); close on Playwright ×3 + build + vue-tsc + test; publish W0 audit artefacts | Q.W1 Lane A (step 2) |
| 4 | Q.W1 Lanes B, D-G | glass-ui devDep retiral + 4-consumer resolver sweep — parallel with step 3 | Q.W1 Lane A |
| 5 | Q.W1 gate + close | reader-check value.js GREEN from A.W0 evidence; `proof:resolution` PASSES; v1.8.6 | A.W0 close (step 3) + step 4 |
| 6 | Q.W2 Lane A | glass-ui `Card` fail-explicit (invariant 31) lands + pushed; SHA recorded | Q.W1 close |
| 7 | **A.W1** | value.js 11-site Card migration; close on warning-silent boot + Playwright re-probe | A.W0 close + Q.W2 Lane A (step 6) |
| 8 | Q.W2 Lane C + gate | bbnf-buddy 6-site migration; reader-check value.js Card sites from A.W1 evidence; v1.8.7 | A.W1 close (step 7) + step 6 |
| 9 | Q.W3, Q.W4 | glass-ui core-feature cohesion + token co-location — no value.js coupling | Q.W2 close |
| 9' | **A.W2, A.W3, A.W4** | value.js demo design waves — no glass-ui coupling except A.W4's filed gap items | A.W1 close; run in parallel with step 9 |
| 10 | Q.W5 | strengthened audit + consumer re-audit (value.js read-only) + π re-probe + precept advance (invariants 30-31) + FINAL.md | Q.W4 close + A.W0/A.W1 closed (re-audit reads them) |
| 11 | **A.W5** | value.js blob/aurora abstraction — depends on glass-ui shipping the metaballs/aurora API; if Q never schedules it, A.W5 re-scopes per `A.md §9` | A.W4 close + glass-ui API (unscheduled) |

The two tranches interleave at steps 2-3 and 6-7. After step 8 they decouple: Q.W3/W4/W5 and A.W2/W3/W4 run in parallel with zero shared writes. A.W5 is the one open tail — it waits on glass-ui API surface not in Q's plan, and A.md §9 already handles that with a named-successor fallback.

One observation for A's docs: A.W2/W3/W4 do not depend on Q at all. A's current `A.md §3` says "Two cross-repo gates: W1 ... and W5". That count is right. A.W2-W4 are genuinely independent and can proceed the moment A.W1 closes, regardless of where Q is. A's sequencing doc should state this so an A orchestrator does not idle waiting on Q between W1 and W5.

## §6 — The `docs/precepts` submodule

Both repos pin `docs/precepts`. `coordination/Q.md §0` and `§2` say neither A nor Q advances it without the other's acknowledgement; `CONSTELLATION.md §1` says Q "may advance" it (π-lane re-activation candidate); `Q.md §3 W5` and `Q/waves/W5.md:29-35` schedule a precept advance at Q close — invariants 30-31, the π lane re-activation, and the K-invariant-3 gate escalation, then "pushed; glass-ui pointer bumped".

State on disk right now:

- glass-ui pins `docs/precepts` at `3310a8c` (`heads/main`), submodule initialized.
- value.js's `.gitmodules` is **untracked** (`?? .gitmodules` in `git status`) and the submodule is **not registered in value.js's index** — `git submodule status` in value.js returns nothing; `docs/precepts/` exists on disk as a bare checkout (`.git` file + `.gitignore` only, no content pulled). value.js does not currently pin a precepts SHA at all.

Two coordination needs follow:

1. **value.js must formally pin `docs/precepts` before A's first commit.** A.md §2 says A reads `docs/precepts/instructions/` and adopts five invariants — but the submodule is not committed to value.js's tree. A.W0's first commit should `git add .gitmodules` and register the submodule at `3310a8c`, the SHA glass-ui currently pins, so both repos start the concurrent tranches from the same precept baseline. This is an A-side action; it is not in any A wave spec today. It belongs in A.W0 Lane A alongside the branch decision (Q-chron-1) — both are repo-hygiene preconditions for a clean first commit.

2. **Q.W5 advances precepts; A must acknowledge before A's own close.** Q.W5 pushes a new precepts SHA (invariants 30-31 + π + the gate escalation) and bumps glass-ui's pointer. `coordination/Q.md §2` already says A "acknowledges the new SHA in `PROGRESS.md` before A's own close; A does not advance it." That rule holds. The sequencing wrinkle: Q.W5 is step 10, A.W5 is step 11 — Q advances precepts *before* A closes, so A *can* acknowledge in time. But if A.W5 stalls on the brittleness window (`A.md §9`) and runs long, A could close late while precepts has moved again. A's close-honesty checklist should pin the precepts SHA A acknowledges, so a later precepts advance does not retroactively desync A's close record. Low risk, worth one line in A's close protocol.

There is no write conflict — only A acknowledges, only Q advances. The single defect is that value.js does not yet pin the submodule at all, which A.W0 must fix.

## §7 — Prioritized changes A's docs need

The rewrite of `coordination/Q.md` and the wave specs, in priority order.

1. **`coordination/Q.md` — add a "Q-side plan delta" section.** A's coordination doc records that A withdrew Q's WRITER grant, but it does not record that *Q's wave specs have not absorbed the withdrawal*. Add a section stating explicitly: Q.W1 Lane C and Q.W2 Lane B as written in glass-ui still write value.js and **must be deleted from Q's plan**; until Q's orchestrator deletes them, the boundary is contested on paper. This is the single highest-priority change — it makes the live conflict visible in A's repo and gives the A orchestrator the exact ask to send to Q.

2. **`coordination/Q.md §2` — add the reverse gate dependency.** §2 currently records only "A.W0 depends on Q.W1; A.W1 depends on Q.W2". Add the reverse edges: Q.W1's hard gate (c)+(d)+(e) depend on A.W0; Q.W2's hard gate (b) depends on A.W1; Q.W5's value.js re-audit lane reads A.W0+A.W1. State that these are reader-checks against A's published audit artefacts, not Q writes.

3. **`coordination/Q.md §2` — replace the §1 ledger table with the airtight ownership table** from §3e of this audit. The current §1 table lists the five Q-IDs and their Q waves; it should be superseded by the per-surface owner/writer/reader table so there is one unambiguous ownership record.

4. **`coordination/Q.md` — add §6 "Gate-handoff protocol".** Import §4 of this audit verbatim-in-substance: the step-1-to-5 ordering, "A verifies value.js GREEN", the "Q.W1 reader-check against A.W0 artefacts" rule, and the "if A.W0 has not run, Q.W1 records a cross-tranche wait" fallback.

5. **`coordination/Q.md` — add the merged cross-tranche timeline** from §5. A's `A.md §3` has a value.js-only timeline; the coordination doc should carry the interleaved one so an A orchestrator sees where A.W0/A.W1 sit relative to Q.W1 Lane A / Q.W2 Lane A.

6. **`waves/W0.md` — add the precepts submodule registration to Lane A.** Lane A item 4 resolves the branch question (Q-chron-1). Add an item 5: register `docs/precepts` in value.js's index at SHA `3310a8c` and `git add .gitmodules`, so value.js pins the same precept baseline glass-ui pins, before A's first commit. Cite §6 of this audit.

7. **`waves/W0.md` Dependencies block — state the reverse edge.** It currently says "Depends on: glass-ui Q.W1". Add: "Blocks (cross-tranche): Q.W1's hard gate (c/d/e) — Q.W1 cannot close its value.js gate rows until A.W0 has closed and published `audit/W0-*`."

8. **`waves/W1.md` — pin the Card `tier` decision.** §1a of this audit shows Q.W2 Lane B hard-codes `tier="wash" :shadow="false"` while A.W1 Lane A leaves `tier` per-site. A.W1 Lane A item 2 should either adopt `tier="wash" :shadow="false"` as the default and name the exceptions, or explicitly record that A owns the tier decision and Q's hard-coded value is non-binding. Either way the divergence must be resolved in A's spec, since A now owns the write.

9. **`waves/W1.md` Dependencies block — add the reverse edge**, mirroring item 7: A.W1 blocks Q.W2's hard gate (b).

10. **`A.md §7` — correct the framing of the inherited five items.** §7 says "A owns the value.js write for each". True, but it should add that Q's wave specs still duplicate the write and that closing the boundary requires a deletion *in Q's repo*, which A cannot perform — A can only file the request via `coordination/Q.md`. This keeps A.md honest about the fact that the de-duplication is not complete until Q acts.

11. **`A.md §3` / sequencing — note A.W2-W4 independence.** Add one line: A.W2, A.W3, A.W4 have no cross-repo gate; they proceed on A.W1 close regardless of Q's progress. Prevents an A orchestrator idling on a non-existent dependency.

12. **`PROGRESS.md` "Open dependencies" — add the reverse-direction entries** so the execution log carries both directions: "Q.W1 gate depends on A.W0 close + artefacts; Q.W2 gate depends on A.W1; A acknowledges Q's W5 precepts SHA before A close."

---

## Summary (10 lines)

1. Q's wave specs never absorbed A's withdrawal of Q's WRITER-in-value.js grant; Q.W1 Lane C and Q.W2 Lane B still write value.js directly.
2. Six pure-duplicate value.js writes exist: alias retire, `resolve.conditions`, gh-pages clobber, WIP-vs-master branch, `package.json` alias audit (all A.W0 vs Q.W1 Lane C), and the 11-site Card migration (A.W1 vs Q.W2 Lane B).
3. Two duplicates also conflict on content — the Card `tier` value and (latently) the clobber target dir — so a double-write would be decided by execution order, not design review.
4. Q.W1's hard gate (c)/(d)/(e) silently depend on A.W0 having run; Q.W2 gate (b) on A.W1; these reverse edges appear in no Q spec.
5. The A.W0↔Q.W1 loop is not a true deadlock — it runs through Q.W1's separate lanes — but Q's monolithic gate means an un-run A.W0 stalls the whole linear Q tranche.
6. Boundary fix: DELETE Q.W1 Lane C and Q.W2 Lane B; convert Q.W1 gate (c/d) and Q.W2 gate (b) value.js rows to reader-checks against A's published audit artefacts.
7. Handoff order: Q.W1 Lane A (keyframes.js exports) → A.W0 (value.js un-break, publishes W0 audit) → Q.W1 gate reads A's evidence; A verifies value.js GREEN, Q never re-builds it.
8. Merged timeline interleaves at two points (steps 2-3, 6-7) then decouples — A.W2/W3/W4 have zero Q coupling and need no wait.
9. value.js does not currently pin `docs/precepts` at all — `.gitmodules` is untracked, submodule unregistered; A.W0 must register it at `3310a8c` before A's first commit.
10. Twelve prioritized doc changes follow; the top one is making `coordination/Q.md` state explicitly that the boundary stays contested until Q's orchestrator deletes the two duplicate lanes from Q's repo.

**File**: `/Users/mkbabb/Programming/value.js/docs/tranches/A/audit/HARDEN-1-dedup-boundary.md`
