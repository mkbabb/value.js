# A — Progress

Execution log for tranche A. Updated at wave boundaries. Planning-only at A open per user directive; no implementation commits exist at the time of this entry.

## 2026-05-18 — A open (planning round)

### Round 1 — research wave (5 angles + Playwright probe)

Five research lanes dispatched in parallel, each authoring a deliverable under `research/`. The five angles map to the Greek sequence α β γ δ ε, transliterated `a b g d e`.

| Lane | Angle | Deliverable | Headline finding |
|---|---|---|---|
| Aα | runtime keystone | `research/Aa-runtime-keystone.md` | three stacked fatal faults + one cosmetic; A-key-2 is the user's `stops.length` crash, absent from glass-ui Q's ledger |
| Aβ | styling resilience | `research/Ab-styling-resilience.md` | 19 findings; the dock `calc()` chain folds back on itself |
| Aγ | design tokens + hierarchy | `research/Ag-design-tokens-hierarchy.md` | 13 findings; `font-mono-code`/`text-2xs`/`text-pane-description` undefined classes silently dropped |
| Aδ | interactive states | `research/Ad-interactive-states.md` | 20 findings; four-state gaps; `<SelectTrigger class="h-9">` ×11 |
| Aε | structure + blob/aurora | `research/Ae-structure-blob-aurora.md` | `Dock.vue`/`App.vue` god-components; GooBlob duplicates glass-ui `useMetaballs`; Aurora built against a deleted schema |

Playwright probe (Vite dev server, 3 viewports). Three captures in `research/screenshots/`.

### Round 2 — challenge pass

`research/A-challenge.md` — five adversarial challenges. Two changed the plan: the gap list became evidenced problem statements; the Aurora work split across W0 (boot) and W5/W6 (picker-derived).

### Round 3 — plan synthesis

`A.md` synthesized — thesis, five invariants, a 6-wave schedule, hard gates, cross-tranche debt. Wave specs `waves/W0..W5.md`. Cross-repo coordination `coordination/Q.md`.

## 2026-05-18 — Hardening round (6-lane audit)

Six hardening lanes dispatched in parallel against the round-3 plan, each authoring an audit doc under `audit/`.

| Lane | Angle | Deliverable | Headline correction |
|---|---|---|---|
| HARDEN-1 | A↔Q de-dup boundary | `audit/HARDEN-1-dedup-boundary.md` | 6 pure-duplicate value.js writes between A.W0/A.W1 and Q.W1-C/Q.W2-B; Q's gate silently depends on A; value.js does not pin `docs/precepts` |
| HARDEN-2 | W0 keystone | `audit/HARDEN-2-w0-keystone.md` | A-key-3 line is `:178-179` not `:131`; the cascade is an App-subtree crash not a hook-tail; `vue-tsc` not installed; `dist/` already clobbered; font 403 is a `server.fs` fault; keyframes.js already fixed at `8d824ee` |
| HARDEN-3 | design waves W1-W3 | `audit/HARDEN-3-design-waves.md` | 12 findings unassigned; W2 under-scoped; the 11 Card sites are not homogeneous; Ag has 13 findings not 14 |
| HARDEN-4 | W4-W5 + blob/aurora | `audit/HARDEN-4-w4-w5-blob.md` | W5 un-closeable (close ceremony over an open dependency); `usePopupMutex` split hazard; gap-list error — Ae-15 struck, `ConfigSliderPane` re-framed |
| HARDEN-5 | coverage gaps | `audit/HARDEN-5-coverage-gaps.md` | accessibility, animation, and the e2e suite were entirely uncovered; `hero-lab` scope unrecorded |
| HARDEN-6 | methodology | `audit/HARDEN-6-methodology.md` | brittleness window mislabeled; zero-deferral claim overstated; wave specs lack per-lane sub-gates; style tics |

### Synthesis — augmented wave-set

The plan was re-synthesized from the hardening audits:

- **Wave-set augmented 6 → 8.** The former W5 illegally combined the close ceremony with an open cross-repo dependency (`HARDEN-4`); it split into W6 (the conditional blob/aurora abstraction, carrying the dependency) and W7 (the clean close). A new W5 absorbs the accessibility, animation, and e2e-integrity scope the five-angle audit never covered (`HARDEN-5`).
- **De-dup hardened.** `coordination/Q.md` rewritten with the contested-boundary statement, the airtight ownership table, the reverse gate-dependency edges, the merged cross-tranche timeline, and the gate-handoff protocol. Q.W1 Lane C and Q.W2 Lane B are flagged for deletion from Q's plan.
- **12 prior-unassigned findings routed** — Ab-1..7 and Ab-16..19 into W2's added fourth lane, Ag-6 into W3. `A.md §8` is now honest.
- **W0 corrected** — line numbers, the cascade description, and four missed items added: `vue-tsc` install, `dist/` clear, the `server.fs` font fix, the `docs/precepts` submodule registration. The keyframes.js dependency is discharged.
- **Gap list corrected** — Ae-15 struck (the glass `Select` is already complete); the config-pane gap re-framed as non-adoption of glass-ui's existing `./configurator`.
- **`A.md §9`** reframed from a brittleness window to a cross-repo dependency (no tree-breaking, no suspended gates).
- `findings.md` and `research/Aa` carry correction notes for the A-key-2 cascade and A-key-3 line citation.

### State at A open (post-hardening)

Plan substrate: `A.md`, `findings.md`, `research/Aa..Ae` + `A-challenge.md`, `research/screenshots/` (3), `audit/HARDEN-1..6`, `coordination/Q.md`, `dispatch/AGENT.md`, `waves/W0..W7.md`, this file. No implementation has run — the session is tranche development only.

## 2026-05-18 — A.W0 HEADLINE close — consumer un-break + repo hygiene

User directive lifted the planning-only constraint and authorized tranche execution in totality. W0 executed by the orchestrator directly (the three lanes are surgical, tightly file-coupled across `vite.config.ts`/`package.json`, and must land atomically for one boot gate — direct execution is befitting per `dispatch/AGENT.md`).

### What landed

- **A-key-1** — `vite.config.ts` hard alias `@mkbabb/keyframes.js` → deleted `dist/keyframes.js` retired. `resolve.conditions: ["development", "module", "browser"]` added, mode-scoped to the demo modes (dev, gh-pages, hero-lab), never `production`. `server.fs.allow` set to the shared parent directory — fixes the `fira-code-latin.woff2` 403.
- **A-key-2** — `App.vue` Aurora integration migrated off the retired `useAuroraBlobs`/`AuroraBlobsConfig` schema: `reactive(structuredClone(DEFAULT_AURORA_CONFIG))`, `useAurora(canvasRef, () => auroraConfig, { onInitError })`, `provide("auroraConfig", auroraConfig)`. `atmosphereCanvas` changed from `useTemplateRef` to a plain `ref` (matches glass-ui Aurora.vue's own pattern; satisfies `useAurora`'s `Ref` signature). `AuroraPane.vue` renders an honest "under rework" state — W6 rebuilds its slider table against the live 30-field `AuroraConfig`.
- **A-key-3** — `useMetaballRenderer.ts` null-canvas RAF race guarded; the loop ends rather than reschedule when the canvas is gone.
- **A-key-4** — NOT touched in W0; the 11 `<Card variant="pane">` sites are W1's migration.
- **Build hygiene** — `gh-pages` build `outDir` → `dist/gh-pages/`; `.github/workflows/node.js.yml` `publish_dir` follows. `dist/` cleared; library build verified library-only. `vue-tsc@^2.2.0` + `typecheck` script added.
- **Repo hygiene** — `master` fast-forwarded to `70e61e9` (Q-chron-1's "diverged" premise was false); tranche commits land on `master`. `docs/precepts` submodule registered at `3310a8c`.

### Contact-revealed scope

- **Vue-instance dedup.** `vue-tsc`'s first run exposed glass-ui's nested `vue@3.5.30` vs value.js's `vue@3.5.29` — two Vue instances, a runtime + type hazard. Fixed as repo hygiene: `resolve.dedupe: ["vue"]` (Vite) + `tsconfig` `paths` pin for `vue`/`@vue/*` (tsc). Recorded in `audit/W0-build-typecheck.md`.
- **246 pre-existing demo type errors.** The demo had never been typechecked. `src/` is clean; the 246 are latent shadcn-vue + custom-component debt. The W0 typecheck gate is scoped to W0's changed surface (clean); the 246-error backlog is a scope-reveal finding routed to a dedicated demo type-debt effort (value.js tranche B candidate).

### Gate evidence

`audit/W0-build-typecheck.md` + `audit/W0-playwright-boot/` (4 captures). Cold-start boot clean; Playwright ×3 viewports + opened color-space Select, **0 console errors, 0 non-2xx** of 473 requests; `npm test` 1409 passed; library build clean; gh-pages writes `dist/gh-pages/` without clobbering `dist/value.js`.

### Commits

- `bc7ad2c` — `chore(tranche-a/w0)`: register `docs/precepts` submodule + tranche A plan substrate.
- `c20f609` — `fix(tranche-a/w0)`: un-break the demo boot.

The pre-existing uncommitted `src/` WIP (`vite-source-export.ts`, `index.ts`, `units.ts`, `normalize.ts`, the new `parsing/*.ts`) is untouched by W0 and deliberately not committed — it predates the tranche and is outside A's scope (`A.md §5`).

### Cross-tranche

glass-ui Q.W1's hard gate (c/d/e) can now reader-check value.js GREEN against `audit/W0-*` (`coordination/Q.md §7`). The keyframes.js dependency was already discharged at `8d824ee`.

## Wave log

| Wave | Status | Opened | Closed | Commits |
|---|---|---|---|---|
| W0 HEADLINE — consumer un-break + repo hygiene | closed | 2026-05-18 | 2026-05-18 | bc7ad2c, c20f609 |
| W1 — Card surface + real-bug sweep | planned | — | — | — |
| W2 — style co-location + resilience | planned | — | — | — |
| W3 — design tokens + hierarchy | planned | — | — | — |
| W4 — interactive states + structure | planned | — | — | — |
| W5 — accessibility + animation + e2e integrity | planned | — | — | — |
| W6 — blob/aurora idiomatic abstraction (conditional) | planned | — | — | — |
| W7 HEADLINE close — strengthened close | planned | — | — | — |

## Open dependencies

- A.W1 depends on glass-ui Q.W2 Lane A (`Card` props fail-explicit).
- A.W6 depends on glass-ui shipping the `coordination/Q.md §3` extension set — not in glass-ui Q's current wave plan; W6 re-scopes per `A.md §9` if unscheduled.
- Reverse direction: glass-ui Q.W1 hard gate (c/d/e) depends on A.W0 close + artefacts; Q.W2 hard gate (b) depends on A.W1; Q.W5's value.js re-audit reads A.W0 + A.W1 (`coordination/Q.md §2`).
- The A↔Q boundary is contested until glass-ui Q deletes Q.W1 Lane C and Q.W2 Lane B from its plan (`coordination/Q.md §0-1`). A's orchestrator sends the request; Q's response is recorded here when received.
- A.W0 registers `docs/precepts` at `3310a8c`; A acknowledges Q's W5 precepts advance before A close.
