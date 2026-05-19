# Tranche A — FINAL

**Repo**: value.js. **Tranche**: A — value.js's first tranche, the close-the-regression-and-design-audit tranche.
**Opened**: 2026-05-18 at `70e61e9`. **Closed**: 2026-05-19.
**Closed by**: value.js tranche B.W0 — invariant B1 ("close A before new structural work"). A's W5 was complete in the working tree but committed nowhere; B.W0 Lane A ratified and committed it, Lane B re-scoped W6, Lane C ran this close ceremony.
**Precepts**: A ran under `docs/precepts` `3310a8c` (registered at A.W0). B.W0 advanced the shared pin to `3c32fae`; A's close acknowledges `3310a8c` as its working baseline.

## §1 — What A set out to do

The user opened A on a functional-regression report — a `stops.length` crash, a font 403, broken dropdowns/animations/dock — bundled with a 13-mandate design and functionality audit (`findings.md §1`). A's thesis: un-break the demo boot, then sweep the design surface to idiomatic glass-ui consumption.

## §2 — Wave-by-wave close

| Wave | Headline | Commits | Gate evidence |
|---|---|---|---|
| W0 HEADLINE | consumer un-break + repo hygiene | `bc7ad2c`, `c20f609`, `c43fc76` | `audit/W0-build-typecheck.md`, `audit/W0-playwright-boot/` — cold boot clean, 0 console errors / 0 non-2xx of 473 requests |
| W1 | Card surface + real-bug sweep | `92fe64d`, `efc7d25`, `17f8355` | `audit/W1-card-*.md`, `audit/W1-class-resolution.md`, `audit/W1-playwright/` |
| W2 | style co-location + resilience | `3b72007`, `f0b8c54`, `3a1b673`, `6b3b64e`, `3a44da3` | `audit/W2-lane-*.md`, `audit/W2-playwright/` — dock 0px from baseline |
| W3 | design tokens + hierarchy | `e58155f`, `8e99a7d`, `6cfded5`, `204c7f8` | `audit/W3-*.md` (7 docs), `audit/W3-playwright/` |
| W4 | interactive states + structure | `c011b18`, `c3df1e2`, `3f39026`, `191d66a` | `audit/W4-*.md` (4 docs), `audit/W4-playwright/` — Dock.vue 426→128, App.vue script →156 |
| W5 | accessibility + animation | `7088da4`, `5247313`, `36a4ad0` | `audit/W5-a11y.md`, `audit/W5-animation.md`, `audit/W5-playwright/` — 6 captures, 0 console errors, 0 stale-prop warnings |
| W6 | blob/aurora abstraction (conditional) | `065c6fe` | `audit/W6-deferred.md` — re-scoped; glass-ui APIs unshipped |
| W7 HEADLINE close | this ceremony | (B.W0 close commit) | `audit/W7-*.md` (7 lanes) + this file |

All keystone runtime faults are discharged: A-key-1 (keyframes alias / font 403), A-key-2 (`stops.length` Aurora crash), A-key-3 (GooBlob null-canvas RAF race), A-key-4 (`<Card variant>` black drop-shadow). The demo boots clean at three viewports, light and dark.

## §3 — The 13 mandates

| # | Mandate | Disposition |
|---|---|---|
| 1 | styling resilience | FULL — W2 (calc-chain de-tangle, scoped `<style>`, deprecated CSS retired) |
| 2 | design audit | FULL — W3 (φ scale, radii, shadow language) |
| 3 | four-state buttons | FULL — W4 |
| 4 | modals/dropdowns/hover | FULL — W4 overlay convergence + W5 a11y |
| 5 | duplicated components | FULL — W3 (`AdminListItem`), W4 |
| 6 | golden-ratio hierarchy | FULL — W3 |
| 7 | colocation + `@apply` | FULL — W2 |
| 8 | root-level restyling | PARTIAL — demo side done; 4 glass-ui-side root fixes filed `coordination/Q.md §3` |
| 9 | glass-ui for all | PARTIAL — residuals with named destinations (`audit/W6-deferred.md`; the `ui/alert/` fossil → B.W2) |
| 10 | flatten complex components | FULL — W4 (Dock/App decomposition) |
| 11 | skip duplicates | FULL |
| 12 | gaps in value.js AND glass-ui | PARTIAL — glass-ui side filed; **value.js `src/` library side scoped out of A → value.js B.W3** |
| 13 | Playwright user/admin flows; blob/aurora | PARTIAL — boot probes shipped every wave; the full flow suite + blob/aurora abstraction → B.W3 (e2e) and a glass-ui successor (`audit/W6-deferred.md`) |

Mandates 12 and 13 are the parts the user flagged repeatedly; both carry a named value.js-B destination.

## §4 — Research-finding disposition

`findings.md` is the authoritative per-finding ledger. Every finding from `research/Aa..Ag` either landed in a wave, retired with recorded rationale, or routed to a named destination. Aα runtime keystones — landed W0. Aβ styling resilience (19) — landed W1/W2. Aγ design tokens (13) — landed W3. Aδ interactive states (20) — landed W4 (`Ad-20`/`Ae-12` retire-rationale to be recorded in `A.md §8` by B.W4 — see §6). Aε structure + blob/aurora — structure landed W4; blob/aurora re-scoped W6.

## §5 — Close-honesty checklist (`precepts/SPEC §Close`)

- **Every FINAL claim grounded in PROGRESS.md or a cited artefact** — PASS. The wave table cites commit hashes verified by the plan-vs-actual lane (`audit/W7-plan-vs-actual.md`).
- **Every gate marked MET has a resolving evidence path** — PASS. Each wave row cites its `audit/` doc and Playwright dir.
- **Every cross-tranche debt entry names a destination** — PASS. `coordination/Q.md §3` (7 standing glass-ui gaps → glass-ui successor); `audit/W6-deferred.md` (blob/aurora → glass-ui successor + a value.js demo-abstraction tranche).
- **Integrity sweep clean** — PASS (`audit/W7-integrity-sweep.md`): zero unauthorized agent git mutations, zero stashed work, `docs/precepts` changed only as planned.
- **No wave-log row reads `planned`** — PASS after this close (W7 → closed).

## §6 — Close-audit findings routed to value.js tranche B

The 7-lane W7 close audit returned A clean against its own plan, and surfaced items for B (invariant B5 — zero silent deferral):

- **doc-drift** (`audit/W7-doc-drift.md`) — 14 items across 6 files (`CLAUDE.md` test/file counts, `A.md §8` missing `Ad-20`/`Ae-12` retire-records, `research/Ag` non-contiguous rename, stale glass-ui HEAD cites, phantom precept citations). → **B.W4** close-residuals lane.
- **idiomatic-gestalt** (`audit/W7-idiomatic-gestalt.md`) — `demo/@/components/ui/alert/` is a hand-rolled re-implementation of a primitive glass-ui ships (2 consumers); dead unused `ui/` barrels (`chart`, `table`, `calendar`). → **B.W2** component consolidation.
- **performance** (`audit/W7-performance.md`) — `useMetaballRenderer.ts:174` resolves `cssColorToRgb` via a 2D-canvas round-trip every frame; memoise on the input string. → routed with `audit/W6-deferred.md` (the demo-abstraction follow-up).
- **substrate-without-consumer** (`audit/W7-substrate-without-consumer.md`) — clean; one phantom token `var(--animation-slide-md)` referenced at `PaletteCard.vue` with no definition (predates A). → **B.W1** (invariant-32 phantom retirement, alongside `floating-panel-item`).

A's `FINAL.md` and value.js tranche B's `FINAL.md` together discharge the work the user opened with the turn-1 regression report.

## §7 — Close state

Tranche A is **closed**. W0–W5 executed and committed; W6 closed by re-scope; W7 is this ceremony. The demo boots; the 13 mandates are FULL or routed to a named destination; the integrity sweep is clean. value.js tranche B continues from B.W1.
