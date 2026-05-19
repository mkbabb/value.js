# Coordination — value.js D ↔ glass-ui ↔ keyframes.js

**Artefact class**: `coordination/Q.md` — value.js D's cross-repo manifest. Successor to `tranches/B/coordination/Q.md`. Q (glass-ui) is closed; this doc inherits B's §2a/§3/§9 state and refreshes against the post-Q glass-ui + the contract-v2 codification.
**Date**: 2026-05-19.
**This repo**: value.js, tranche D, branch `tranche-b` (D opens off B.W4 close).
**Peer repo (glass-ui)**: tranche Q **CLOSED** at `4b16de7` (v1.9.2; W0–W6); post-Q ship **contract-v2** at `ce5aad8` (v1.9.3). HEAD at D open: `e2e5303` (a Safari post-paint fix).
**Peer repo (keyframes.js)**: v2.1.1 / HEAD `0909177` — code-side contract-v2 OK.
**Shared submodule**: `docs/precepts` — value.js currently pinned at `3c32fae`; **fleet HEAD `68d9b20`** (the contract-v2 codification SHA, per `research/Dh-contract-v2.md §1`). **D.W0 advances value.js's pin to `68d9b20`** — see §6.

## §1 — Inheritance from B↔Q coordination

D inherits B's `coordination/Q.md` state. B closed every contested item; the cross-repo ledger at B close was:

- 7 standing glass-ui §3 gaps (NOT shipped at Q close) — still not shipped at D open (verified by `research/Dd-blob.md §3`).
- 1 SHIPPED (`Card` props fail-explicit, A.W1 consumed).
- 1 unchanged-PARTIAL (`UnderlineTabs` — B.W2 declined the wrong-shape migration; re-filed sharper).
- 1 RETIRED (`floating-panel-item` — B.W1 stripped, no glass-ui action needed).
- 1 newly filed (`<Tabs variant="underline">` on the provider family — the real ask).
- A↔Q contested boundary: MOOT.
- keyframes.js parity: coupling sound; 6 keyframes.js-side gaps filed.

## §2 — Glass-ui ship-state at D open (HEAD `e2e5303`)

Re-verified per `research/Dd-blob.md §3` and `research/Dc-aurora.md §1`. **No new ships since B close.** The metaballs/aurora/`BlobDot` surface is still gap-filled; the 7 metaballs additions + `BlobDot` + `deriveAuroraPalette` all stand.

## §3 — Glass-ui gap list (D's filing)

Inherits B's `§3` row set, **refreshes the metaballs row to 7 additions** (per `research/Dd-blob.md §3`), and **adds the algorithm sketch** for `deriveAuroraPalette` (per `research/Dc-aurora.md §3`).

| Gap | Evidence | Status | Wave (consumes) |
|---|---|---|---|
| **metaballs API additions (7)** — `positionSource` hook (G1), pointer input (G2), per-blob opacity (G3), HSV color perturbation (G4), context-loss recovery (G5), `MetaballCanvas mode="layout"` (G6, newly filed), `pauseOnHidden` (G7, newly filed) | `research/Dd-blob.md §3-4`; signature sketch in §4 of that doc | **STANDS — surface sharpened (7 items, was "5 + perturbation+context-loss")** | a value.js demo-abstraction tranche post-glass-ui-ship |
| **Aurora `deriveAuroraPalette(baseColor, opts)`** + `deriveAuroraConfig(baseColor, opts)` | `research/Dc-aurora.md §3` (~55 line algorithm sketch — two-cohort partition + 5-harmony hue gen + L-envelope; preserved from the older glass-ui `637955b` algorithm); §6 ships pseudocode. **D-HARDEN-5 §6 clarification**: the grayscale C=0 input case must collapse to a single-cohort lightness-only ramp (no hue generation when chroma is zero) — 1-line addition to the algorithm; recorded in `Dc-aurora.md §3.2`. | **STANDS — surface sharpened (algorithm + atmosphere-preset bundling + grayscale carve)** | glass-ui successor; a value.js demo-abstraction tranche post-ship |
| `BlobDot` organic-dot primitive | `research/Dd-blob.md §6`; 11 `WatercolorDot` consumers (16 instance sites — corrected from "11") | STANDS | glass-ui successor; value.js extirpation tranche post-ship |
| `SelectTrigger size` prop | unchanged from B `§3` | STANDS | B does not retire; demo markers stay |
| `DockSelectTrigger clampLabel` | unchanged | STANDS | as above |
| `TooltipContent variant="mono"` | unchanged | STANDS | as above |
| `Button size="icon-sm"` rung | unchanged | STANDS | as above |
| **`<Tabs variant="underline">` on the provider family** (the real ask, re-filed at B.W2) | glass-ui shipped header-only `<UnderlineTabs>`; demo needs underline as a `<Tabs>` provider variant preserving `<TabsContent>` + `data-state` + ARIA | OPEN | demo's `.underline-tabs` override stays until glass-ui ships |
| `Card` props fail-explicit | A.W1 consumed Q.W2 | RETIRED | — |
| `floating-panel-item` | B.W1 stripped — phantom class, never glass-ui-defined | RETIRED at B.W1 | — |

## §4 — A↔Q contested boundary

**MOOT** — Q closed without writing value.js; recorded in `B/coordination/Q.md §4`. No D action.

## §5 — Cross-tranche sequencing

D writes value.js only. No D wave blocks on a cross-repo ship:

| Order | Action | Cross-repo gate |
|---|---|---|
| 1 | D opens at B.W4 close | none |
| 2 | D.W0 — precept advance + B residuals + coord refresh | none |
| 3 | D.W1 — contract-v2 alignment | precepts at `68d9b20` (Lane 0 lands it); glass-ui already shipped contract-v2 |
| 4 | D.W2–W5 | none |
| 5 | D.W6 — close | `§3` reflects close state |

The aurora/blob value.js-side migrations are explicitly OUT of D's waves (precept-§10 blocked).

## §6 — The `docs/precepts` submodule

value.js entered D at `3c32fae` (B.W0's advance). **Fleet HEAD: `68d9b20`** — the contract-v2 codification (per `research/Dh-contract-v2.md §1`). **D.W0 Lane 0 advances value.js's pin `3c32fae → 68d9b20`.** glass-ui is at `68d9b20`; keyframes.js is at `458c2d1` (off-target — see §9).

Contract-v2 redefines invariant 30 in-place (per `research/Dh-contract-v2.md §3`):
- Publisher `exports["."]` is `{types, import, default}` — `development` key FORBIDDEN.
- Every `@mkbabb/*` publisher MUST declare `build:watch`.
- Consumer `resolve.conditions: ["development"]` + sibling-`src/` `fs.allow` widening are STRUCK.
- `proof-resolution-contract.mjs` inverted to forbid-what-it-once-required + new watch-build check.

D.W1 ships value.js's compliance (5 lanes single wave).

## §7 — Conflict-resolution protocol

Inherits B `§7`: D writes value.js only. D reads glass-ui at the Q-close `4b16de7` (and the post-Q `e2e5303` HEAD for `research/Dd-blob.md`'s 7-additions assay) per the wave audit docs. Each wave that depends on glass-ui surface shape re-reads at the wave open; D.W0 records the open-state.

## §8 — Summary table

| Item | Where | Status at D open |
|---|---|---|
| 7 standing glass-ui §3 primitive/blob gaps | §3 | unchanged at D open; rows refreshed (7-addition metaballs surface; algorithm sketch for aurora) |
| 1 SHIPPED gap (`Card`) | §3 | RETIRED |
| 1 unchanged-PARTIAL (`UnderlineTabs`) | §3 | re-filed sharper as `<Tabs variant="underline">` provider-family ask |
| 1 RETIRED (`floating-panel-item`) | §3 | retired at B.W1 |
| A↔Q contested boundary | §4 | MOOT |
| docs/precepts pin | §6 | value.js `3c32fae` → `68d9b20` at D.W0; fleet on `68d9b20` |
| contract-v2 alignment | §6 | value.js consumes at D.W1 |
| keyframes.js parity | §9 | code-side OK; precept-pin off-target |

## §9 — keyframes.js coordination (refresh + the 6+6 library research/challenge fold-ins)

`research/Dh-contract-v2.md §4` re-verified keyframes.js's contract-v2 alignment. **Refreshed verdict**: keyframes.js is **already contract-v2 compliant on the code side** at HEAD `0909177` (`build: abrogate development export condition — contract-v2`). Its `package.json` carries the 3-key shape + `build:watch`; its `vite.config.ts` drops `development` + the sibling-`fs.allow`.

### §9.1 — Precept-pin convergence (the standing ask)

The only contract-v2-side drift is the `docs/precepts` submodule pin — keyframes.js at `458c2d1`, fleet at `68d9b20`. **Refreshed ask**: a one-line submodule bump to `68d9b20`. The B-vintage filing's "6 keyframes.js gaps" framing was a maintainability inventory; those items route to keyframes.js's own maintenance schedule.

### §9.2 — New items from the library-perf research + challenge round (`audit/D-LIB-OPTIMIZATION-SYNTHESIS.md §4`)

Filed after the 6 research (Di–Dn) + 6 challenge agents audited both repos' library code. Each item is challenge-upheld; the speculative claims (R1–R12 in the synthesis doc) were dropped.

| # | Ask | Evidence | Source |
|---|---|---|---|
| **C1** | **Update `AnimationOptions` import name post value.js rename to `CSSAnimationOptions`** — value.js's `src/parsing/extract.ts:16-25` exported `AnimationOptions` (a CSS-shorthand-string type); keyframes.js's `src/animation/constants.ts:73-91` defines `AnimationOptions` (an engine-callable type) — a silent shadow with two genuinely-different shapes. value.js renames its export at **D.W1 Lane L6**; keyframes.js's only ask is to update the import name if it consumes value.js's old `AnimationOptions` symbol. | Dn K6 → CHALLENGE upheld | `Dn-cross-integration.md §3` |
| **C2** | **Declare parse-that as a peer-dependency** (or arrange workspace hoisting) — the `^0.8.1` (keyframes.js) vs `^0.8.2` (value.js) pin desync was REFRAMED at challenge: pin alignment is cosmetic, but the **real hazard is cross-realm Parser-class doubling** from `file:..` linking. Confirmed: nested `node_modules/@mkbabb/value.js/node_modules/@mkbabb/parse-that` exists in the install tree. Only a peer-dep declaration on keyframes.js OR workspace hoisting can fix this; pin alignment cannot. | Dn K8 → CHALLENGE REFRAMED with file-tree evidence | `Dn-cross-integration.md §4` |
| **C3** | **kf-1 (965-line `src/animation/index.ts` god module) — 7-module cohesive split** — the user's "NO god modules" rule binds; sketch follows. value.js cannot write keyframes.js but the split was sketched and CHALLENGE-verified faithful. | Dn §1 + CHALLENGE-Dn upheld | `Dn-cross-integration.md §1` |
| **C4** | **Add `"sideEffects": false` to keyframes.js's `package.json`** — verified absent (refresh of B `coordination/Q.md §9 kf-3`). Tree-shaking blocked without it. | Dn §4 → confirmed | refresh |
| **C5** | **kf-1 split sketch (the actual 7-module shape)**: `animation.ts` (~250 — the animation primitive + setOptions boundary lifted to `options.ts`), `options.ts` (~140 — config + setOptions), `playback.ts` (~180 — play/pause/seek + `_boundDraw` via module augmentation), `interp.ts` (~80 — the interpolation kernel), `events.ts` (~25 — emit/subscribe), `css-keyframes.ts` (~110 — CSS @keyframes parsing/extraction; consumes value.js's `parseCSSStylesheet`), `index.ts` (~50 — barrel). Per CHALLENGE-Dn caveats: `setOptions` boundary belongs in `options.ts` not `animation.ts`; `_boundDraw` bridges `animation/playback` via module augmentation. | Dn §1 + CHALLENGE faithful | this is the body of C3 — recorded for the keyframes.js maintainer |

### §9.3 — What value.js's library-perf round does NOT ask of keyframes.js

The synthesis (`audit/D-LIB-OPTIMIZATION-SYNTHESIS.md §5 R1`) explicitly rejected one cross-repo ship: shipping `resolveTimingFunction` from value.js to absorb keyframes.js's `utils.ts:86-87` cubic-bezier regex. CHALLENGE-Dn demonstrated the regex is an arithmetic shortcut (regex → 4 floats → `CSSCubicBezier(…)`), NOT parser-shaped; routing it through value.js's full parser would slow keyframes.js or be a net-wash byte move. **No ship; the regex stays where it is.**

Similarly, `flattenValueTree` (Dn K10) was DROPPED — single 17-line consumer in keyframes.js, KISS gate held.

### §9.4 — Value-side actions for the keyframes.js consumption

These value.js-side changes flow keyframes.js's way as part of D.W1 (D writes value.js; the items LAND in value.js's library):

- **L10** — value.js exports `type TimingFunction = (t: number) => number` from `src/easing.ts` and the barrel; keyframes.js can import the canonical name (no rename or change required on keyframes.js's side, just a type-cleanup opportunity at its own discretion). Per Dn K7 + CHALLENGE.
- **C1's value-side half** — value.js renames `AnimationOptions` → `CSSAnimationOptions` at D.W1 Lane L6.

value.js cannot write keyframes.js. All keyframes.js-side actions above are filed asks.

### §9.5 — Post-D-merge consumption update (v0.6.0)

When D merges to master and tags `v0.6.0`, keyframes.js needs two consumer-side updates (per `D-RELEASE-PLAN.md §2 BREAKING`):

| Action | What changes |
|---|---|
| **Bump `@mkbabb/value.js` pin** in keyframes.js's `package.json` (currently `file:..` — the bump is the tag reference) to acknowledge `^0.6.0` | breaking-change handshake |
| **Rename `AnimationOptions` imports** if keyframes.js imports value.js's `AnimationOptions` type (the CSS-shorthand-string type, NOT keyframes.js's same-named engine-options type) — rename to `CSSAnimationOptions`. The C1 ask above is the value.js-side rename; this is the consumer-side update. | breaking-change handshake |
| **Migrate `Color.components.get("L")` → `Color.L`** at any consumer site that reads Color channels through the (removed) Map. The L8 transposition collapses the Map storage to own properties. CHALLENGE-Di confirmed keyframes.js does not depend on `Color.components` directly — but a verification sweep at v0.6.0 consumption is prudent. | breaking-change verification |

These are filed asks. value.js's D close does NOT block on them; keyframes.js bumps on its own schedule. The v2-precept-style transient RED on the constellation-wide `proof:resolution` gate (until keyframes.js catches up) is acceptable per the precept text.

### §9.6 — Reactivity hardening summary (D writes the gates; both consumers benefit)

REACTIVITY-A + REACTIVITY-B verified that the 13-barrier reactivity topology in the value.js color picker AND the gold-standard `markRaw + rAF-poll bridge` pattern in the keyframes.js demo are both correct today. D ships three primitives that turn this topology argument into wall-clock evidence the merge gate enforces:

- `e2e/smoke/reactivity-instant.spec.ts` (D.W5) — spectrum-drag wall-clock ≤ 50 ms median.
- `bench/color-channel-access.mjs` (D.W1 L8) — channel-read post-L8 ≥ 5× faster.
- `useEffectCensus` DEV probe (D.W5, optional) — leak detection.

The keyframes.js demo's animation kernel already uses the gold-standard pattern; no D-side ship needed for keyframes.js's reactivity. The kf-1 7-module split sketch (C5 above) records the architectural recommendation for the keyframes.js maintainer's own schedule.

## §10 — Open question — contract-v2 codification + a precepts SHA

The precepts SHA `68d9b20` is named throughout this doc as the contract-v2 codification target. The agent that produced `research/Dh-contract-v2.md` cited it from glass-ui's `precepts@68d9b20`. D.W0 Lane 0 verifies the SHA against the actual precepts repository before the bump (the bump is the load-bearing change; the SHA must exist and codify contract-v2).

## §11 — `smoke-safari` follow-up beyond D (D-HARDEN-5 §4)

Pixel-7 in Playwright runs Chromium (not WebKit), so D.W5's `smoke-mobile` project catches mobile-layout regressions but not iOS-Safari engine-specific bugs (e.g. the W5-vintage iOS Safari `_data-driver` bug class — sub-pixel-layout reflow timing, the `100vh` family, scroll-snap quirks, font-rendering). Filed as a follow-up: a `smoke-safari` Playwright project + a single 30-second sustained spec exercising the picker + a view switch. Routes to a value.js testing-hardening tranche post-D (or the next pass after D close).
