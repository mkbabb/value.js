# Coordination — value.js A ↔ glass-ui Q

**Artefact class**: `coordination/<peer-letter>.md` — value.js A's cross-repo manifest, paired with glass-ui Q's `coordination/CONSTELLATION.md`.
**Date**: 2026-05-18 (A open; hardened same day by `audit/HARDEN-1`).
**This repo**: value.js, tranche A, HEAD `70e61e9`, branch `w.w2.1-value-js-prebuild`.
**Peer repo**: glass-ui, tranche Q (in flight), HEAD `95098d1`.
**keyframes.js**: HEAD `8d824ee` — already carries the `development` export condition (the keyframes.js side of A-key-1 is fixed; see §2).
**Shared submodule**: `docs/precepts` — see §6. value.js does not yet pin it; A.W0 registers it.

When ≥2 repos run tranches concurrently with shared touchpoints, each publishes a coordination artefact. value.js A adopts glass-ui's constellation-coordination practice: glass-ui Q published `CONSTELLATION.md`; this file is value.js A's counterpart. (`HARDEN-6 §1` confirmed the precept spec has no `SPEC §"Document Set"` clause mandating this — it is an adopted practice, not a precept requirement.)

## §0 — The contested boundary, stated plainly

A.md §1 declares A owns every value.js write. This document withdraws glass-ui Q's WRITER-in-value.js grant. That withdrawal lives only in value.js's repo. glass-ui Q's wave specs have not absorbed it: **Q.W1 Lane C ("value.js un-break") and Q.W2 Lane B ("value.js Card migration, 11 SFCs") still write value.js directly**, with their own commit-hash deliverables and gate rows (`audit/HARDEN-1 §0-1`). Two orchestrators currently believe they own the same files.

The boundary is not closed until glass-ui Q's orchestrator deletes Q.W1 Lane C and Q.W2 Lane B from Q's plan — a write in glass-ui's repo that A cannot perform. A files that request here. Until Q acts, the merged sequencing in §5 and the gate-handoff protocol in §7 are what prevent a double-write.

## §1 — Q-side plan delta requested

A asks glass-ui Q's orchestrator to make these changes to Q's wave specs:

- **Delete Q.W1 Lane C** ("value.js un-break"). Its five items — alias retire, `resolve.conditions`, `gh-pages` clobber fix, WIP-vs-master decision, `package.json` alias audit — are all A.W0 writes. value.js is A's primary repo.
- **Delete Q.W2 Lane B** ("value.js Card migration, 11 SFCs"). It is an A.W1 write. Q.W2 Lane B also hard-codes `<Card tier="wash" :shadow="false">` for all 11 sites; A.W1 has determined the 11 sites are not homogeneous (10 are `wash` panes, `ColorPicker.vue` is a `resting` plate — `audit/HARDEN-3`), so Q's hard-coded value is wrong for one site and must not be the binding migration.
- **Convert Q.W1 hard gate (c)/(d)/(e) and Q.W2 hard gate (b)** from value.js writes to reader-checks against A's published audit artefacts (§7).
- Keep Q.W1 Lane A (keyframes.js `exports`), Lane B (glass-ui devDep), Lanes D–G (the other 4 consumers), Q.W2 Lane A (`Card` fail-explicit), Q.W2 Lane C (bbnf-buddy) — those are correct Q-writer surfaces.

## §2 — Airtight ownership table

Per-surface owner, writer, and reader. This supersedes any ledger that lists items by Q-ID alone.

| value.js / cross-repo surface | Owner | Writer wave:lane | Reader (verifies, does not write) |
|---|---|---|---|
| `vite.config.ts` alias retire | A | A.W0 Lane A | Q.W1 gate (c/d) reader-check |
| `vite.config.ts` mode-scoped `resolve.conditions` | A | A.W0 Lane A | Q.W1 gate (e) `proof:resolution` reads it |
| `vite.config.ts` `server.fs.allow` (font 403 fix) | A | A.W0 Lane A | — |
| `vite.config.ts` `gh-pages` outDir → `dist/gh-pages/` | A | A.W0 Lane C | Q.W1 gate (c) reader-check |
| `package.json` alias audit + `vue-tsc` devDep + `typecheck` script | A | A.W0 Lane C | Q.W1 gate (e) reader-check |
| value.js WIP-vs-master branch decision | A | A.W0 Lane A (recorded in `PROGRESS.md`) | Q.W1 gate (c), Q.W5 re-audit |
| `docs/precepts` submodule registration | A | A.W0 Lane A (§6) | — |
| `App.vue` Aurora migration (A-key-2) | A | A.W0 Lane B | — (not in Q's ledger; §4 informs Q) |
| `useMetaballRenderer.ts` null-guard (A-key-3) | A | A.W0 Lane C | — |
| 11 `<Card variant="pane">` SFCs | A | A.W1 | Q.W2 gate (b), Q.W5 re-audit |
| value.js W2–W7 demo design surfaces | A | A.W2..W7 | — |
| keyframes.js `package.json` `exports` | keyframes.js / Q | already landed at `8d824ee` | A.W0 Lane A reads it |
| glass-ui `Card` props fail-explicit | glass-ui / Q | Q.W2 Lane A | A.W1 consumes it |
| glass-ui phantom `@mkbabb/value.js` devDep retiral | glass-ui / Q | Q.W1 Lane B | — |
| glass-ui metaballs/aurora API extensions | glass-ui / Q (if accepted) | not yet scheduled in Q | A.W6 consumes; §3, A.md §9 |
| `docs/precepts` advance | glass-ui / Q (Q close) | Q.W5 | A acknowledges new SHA in `PROGRESS.md` before A close |

Reverse gate dependencies, the direction Q's plan does not name (`audit/HARDEN-1 §2b`): Q.W1 hard gate (c)/(d)/(e) depend on A.W0 having closed; Q.W2 hard gate (b) depends on A.W1; Q.W5's value.js re-audit lane reads A.W0 + A.W1. These are reader-checks against A's published `audit/W0-*` and `audit/W1-*` artefacts, not Q writes.

## §3 — glass-ui gap list (A hands to Q)

Evidenced problem statements with consumer counts, not finished API; the concrete shape is a glass-ui design decision (`research/A-challenge.md` C2). The hardening pass (`audit/HARDEN-4`) verified each gap against glass-ui HEAD `95098d1`: 8 of the original 11 stand, 1 is struck, 2 are re-framed.

| Gap | Evidence | Status after hardening | A wave that consumes it |
|---|---|---|---|
| metaballs per-frame `positionSource` hook + pointer input + per-blob opacity + color perturbation + context-loss recovery | `research/Ae` Ae-10 | STANDS — ~200 deletable lines of `useMetaballRenderer.ts` (corrected from 319; `audit/HARDEN-4` found the mood-coupled perturbation, `smin` silhouette, and `POS_SCALE` overflow contract are deeper-coupled than Ae-10 stated) | A.W6 |
| Aurora `deriveAuroraPalette(baseColor, opts)` — one color to a coherent palette | `research/Ae` Ae-11 | STANDS | A.W6 |
| `BlobDot` — a lightweight seeded-PRNG organic-dot primitive | `research/Ae` Ae-13 | STANDS — `WatercolorDot` reimplemented locally, 11 demo consumers | A.W6 |
| config-slider tuning pane | `research/Ae` Ae-14 | RE-FRAMED — not a missing primitive; glass-ui already ships `./configurator` with `ConfiguratorRow` + `useConfiguratorState`. The gap is non-adoption. A.W4 builds a local `ConfigSliderPane`, A.W6 migrates it onto glass-ui `./configurator` | A.W4 (local), A.W6 (adopt) |
| complete glass `Select` surface | `research/Ae` Ae-15 | STRUCK — false finding. `demo/@/components/ui/select` already re-exports the full glass-ui `Select` family (`Select`/`SelectContent`/`SelectItem`/…) from `@mkbabb/glass-ui` (`audit/HARDEN-4`). No gap | — |
| `SelectTrigger` `size` prop (`sm` = `h-9`) | `research/Ad` Ad-16 | STANDS — `<SelectTrigger class="h-9">` repeated 11× | A.W4 |
| `DockSelectTrigger`/`SelectTrigger` `clampLabel` prop | `research/Ad` Ad-18 | STANDS — a `[&>span]:line-clamp-none` child-selector hack | A.W4 |
| `TooltipContent` `variant="mono"` | `research/Ad` Ad-17 | STANDS — 7 of 8 tooltips re-specify a mono recipe | A.W4 |
| `Button` `size="icon-sm"` rung | `research/Ad` Ad-5 | STANDS — ~7 inline icon buttons re-implement `Button ghost icon` | A.W4 |
| Tabs `underline` variant | `research/Ab` Ab-10 | STANDS — the demo overrides reka-ui `button[role="tab"]` by attribute selector | A.W2 |
| `Card` props fail-explicit | `research/Aa` A-key-4 | STANDS — this is glass-ui Q's own Q-card-2; already in Q's plan | A.W1 |

Named destination: glass-ui Q for the `Card` fail-explicit (its Q-card-2) and the open question of whether Q schedules the metaballs/aurora extensions. If Q declines or defers, the destination becomes a glass-ui successor tranche plus value.js tranche B, and A.W6 re-scopes per `A.md §9`.

## §4 — Attribution correction handed to Q

glass-ui Q's `findings.md §1` concludes the consumer breakage "is NOT a glass-ui substrate regression" and that "glass-ui's demo renders every probed surface cleanly (Qζ Playwright probe)." Q's probe ran against glass-ui's own demo.

A's Playwright probe of value.js's demo (`research/Aa`, `audit/HARDEN-2`, `research/screenshots/`) found A-key-2 — a mount-fatal crash: the demo's Aurora integration was never migrated off the retired `useAuroraBlobs`/`AuroraBlobsConfig` API, so `useAurora` throws in `flattenPalette(cfg.palette=undefined)` and the throw tears down the App component subtree mid-mount. This is the fault behind the user's pasted `stops.length` stack. It is absent from Q's inheritance ledger.

Q's "not a substrate regression" conclusion still holds — A-key-2 is a consumer-side un-migrated integration, owned by value.js A. A requests Q record in its next `findings.md` revision or `PROGRESS.md` entry that the value.js headline crash is A-key-2, not Q-break-1/2, so Q's narrative matches the runtime evidence. The fix is A.W0 Lane B; Q writes nothing.

## §5 — Merged cross-tranche sequencing

The single timeline both tranches must agree on. The cross-edges bind A and Q at two points (keyframes.js exports — already discharged at `8d824ee`; `Card` fail-explicit); the metaballs/aurora API is a third, unscheduled edge.

| Order | Tranche/wave | Action | Gated by |
|---|---|---|---|
| 1 | Q.W0 | dev-resolution contract + `proof-resolution-contract.mjs` + AB+2 retrospective + precept edict | — |
| — | keyframes.js | `exports` `development` condition — already landed at `8d824ee` | (discharged) |
| 2 | **A.W0** | value.js un-break + repo hygiene; close on cold-start Playwright ×3 + build + `vue-tsc` + test; publish `audit/W0-*` | precept-register (self) |
| 3 | Q.W1 Lanes A/B/D-G | keyframes.js verification + glass-ui devDep retiral + 4-consumer resolver sweep — parallel with step 2 | Q.W0 close |
| 4 | Q.W1 gate + close | reader-check value.js GREEN from A.W0 evidence (§7); `proof:resolution` PASSES | A.W0 close + step 3 |
| 5 | Q.W2 Lane A | glass-ui `Card` fail-explicit (invariant 31) lands + pushed; SHA recorded | Q.W1 close |
| 6 | **A.W1** | value.js 11-site Card migration; close on warning-silent boot + Playwright re-probe | A.W0 close + Q.W2 Lane A (step 5) |
| 7 | Q.W2 Lane C + gate | bbnf-buddy 6-site migration; reader-check value.js Card sites from A.W1 evidence | A.W1 close + step 5 |
| 8 | **A.W2 / A.W3 / A.W4 / A.W5** | value.js demo design + a11y/animation/e2e waves — zero glass-ui coupling; proceed on A.W1 close regardless of Q's progress | A.W1 close |
| 8' | Q.W3 / Q.W4 | glass-ui core-feature cohesion + token co-location — parallel with step 8 | Q.W2 close |
| 9 | Q.W5 | strengthened audit + value.js read-only re-audit + precept advance (invariants 30-31) + FINAL.md | Q.W4 close |
| 10 | **A.W6** | value.js blob/aurora abstraction — depends on glass-ui shipping the metaballs/aurora API; re-scopes per `A.md §9` if unscheduled | A.W5 close + glass-ui API |
| 11 | **A.W7** | value.js strengthened close + FINAL.md | A.W6 close/re-scope |

A.W2 through A.W5 have no cross-repo gate (`audit/HARDEN-1 §5`); an A orchestrator does not idle waiting on Q between A.W1 and A.W6.

## §6 — The `docs/precepts` submodule

At A.W0 the precepts baseline was `3310a8c` (`heads/main`); value.js's `.gitmodules` was untracked and the submodule unregistered in value.js's index (`audit/HARDEN-1 §6`). A.W0 Lane A registered `docs/precepts` at `3310a8c`, and value.js tranche B.W0 advanced the registered SHA to `3c32fae` (commit `de8c573`, "advance shared submodule to 3c32fae"). value.js's index now pins `3c32fae`; the `3310a8c` baseline below is the A-open historical state.

Two coordination actions follow:

1. A.W0 Lane A registers `docs/precepts` in value.js's index at SHA `3310a8c` and tracks `.gitmodules`, so both repos start the concurrent tranches from the same precept baseline. This also resolves a methodology nit — value.js's on-disk precepts checkout predates the glass-ui edits that added the coordination-artefact clause, the 7-lane close ceremony, and `STYLE.md`; registering at `3310a8c` brings value.js current (`audit/HARDEN-6`).
2. Q.W5 advances precepts (invariants 30-31 + the π-lane re-activation). A acknowledges the new SHA in `PROGRESS.md` before A's own close and does not advance it. A's W7 close-honesty checklist pins the precepts SHA A acknowledged, so a later precepts advance does not retroactively desync A's close record.

There is no write conflict — only A registers and acknowledges, only Q advances.

## §7 — Gate-handoff protocol (A.W0 ↔ Q.W1 across the repo boundary)

Neither orchestrator writes the other's repo. The handoff is evidence, passed by artefact, read at a recorded SHA.

- **Ordering.** keyframes.js's `exports` fix is already landed (`8d824ee`), so A.W0 has no upstream keyframes.js dependency. A.W0 closes on its own gate and publishes `audit/W0-playwright-boot/` + `audit/W0-build-typecheck.md`. Q.W1's gate then reads those artefacts.
- **Who verifies value.js GREEN.** A verifies. A.W0's hard gate (`waves/W0.md`) is the authoritative value.js-GREEN signal — cold-start boot, Playwright ×3, build, `vue-tsc`, `npm test`. Q does not re-run them. Q.W1 gate (d)'s value.js row becomes "A.W0 closed; A's `audit/W0-build-typecheck.md` shows build + typecheck green; A's `audit/W0-playwright-boot/` shows a clean ×3 boot." Q still directly builds the 4 non-value.js consumers — they have no peer tranche.
- **`proof:resolution`.** Q's `proof-resolution-contract.mjs` reads value.js's `vite.config.ts` for alias-absence. That is a read, not a write, and is correct for Q to run.
- **If A.W0 has not run when Q.W1 reaches its gate.** Q.W1 closes gate (d) for the 4 non-value.js consumers and records value.js as "pending A.W0" — a partial close with a named cross-tranche blocker, not a Q failure. Q.W1's monolithic gate must be relaxed to allow this, or Q.W1 holds; either way Q does not write value.js to unblock itself.

## §8 — Conflict-resolution protocol

- Neither orchestrator commits in the other's primary repo. A commits value.js; Q commits glass-ui and keyframes.js.
- A reads glass-ui and keyframes.js at the SHAs recorded here; if either advances mid-tranche, A re-reads before the dependent wave.
- If A and Q both need the same glass-ui surface, Q owns it — glass-ui is Q's primary. A files the need in §3 and waits.
- The contested boundary (§0) is resolved when Q deletes Q.W1 Lane C and Q.W2 Lane B. A's orchestrator sends §1 to Q's orchestrator as the explicit ask. A records Q's response in `PROGRESS.md`.
