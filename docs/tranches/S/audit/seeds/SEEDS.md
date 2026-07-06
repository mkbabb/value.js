# S · PROTOTYPE SEEDS — the pre-ratification risk-retirement fleet (2026-07-04)

**Provenance**: workflow `wf_01c28a82-3c2` — 5 isolated-worktree lanes (batches of 3, the
rate-limit armor), cut from `tranche-q @ 6136a47`; ~891k subagent tokens, 420 tool calls,
0 errors, 5/5 returned. **Prototype code lives ONLY in the `.patch` files — nothing landed on
mainline.** Each seed ships `<name>.md` (report: intent/built/verdict/evidence/replay) +
`<name>.patch` (apply on a CLEAN `tranche-q` checkout to replay).

This closes the original S loop's step 3 (the prototyping fleet). The seeds retire the spec's
riskiest mechanisms BEFORE ratification; their spec amendments are recorded here as
**ratification-time riders** — SYNTHESIS.md and the wave docs are NOT reopened; the riders fold
into the wave docs at ratification alongside the §12 Q-table ruling.

## Verdicts

| Seed | Spec item | Verdict | Patch | Headline |
|---|---|---|---|---|
| `w0-dev-backend` | W0-1 (the S-11 root cure) | **VIABLE** | 348 LoC | Proven LIVE: bare web-only dev → loud `misconfigured` state + `DevMisconfigError` **before any fetch** (zero requests to prod observed); truth table proven across 6 cases — guard inert in production and on the honest full-stack path; playwright/CI surface unaffected |
| `w2-usecolorpipeline` | W2-1 transposition | **VIABLE_WITH_AMENDMENTS** | 421 LoC | The `defineModel` staleness IS resolvable at source (picker injects the App-owned ref — no round-trip left to be stale against); the second `shallowRef` copy fully eliminated; `stableHue` preserved bit-for-bit; 9 of 10 `COLOR_MODEL_KEY` injectors compile untouched; merged composable 397 LoC |
| `w4-title-component` | W4-1 (+ the Q5/W4-7 fallout) | **VIABLE_WITH_AMENDMENTS** | 336 LoC | All four affordance states (rest/hover/focus/open) proved live with ZERO per-instance overrides in both hosts; About gains live specimen conversions for free via `provide(COLOR_MODEL_KEY, useColorModel(model))`; **net-new producer defect found** (chevron, below) |
| `w7-wax-seal` | W7-1 (S-8) | **VIABLE** | 126 LoC | Seal fits the producer's collapsed circle 40/40 at 1440 AND 1280 (baseline: 70/40 "Ho" text clip); icon lives IN WatercolorDot's slot so wax+ink displace as one object; one-token CSS relative-color ink flip; Safari-true with zero new support floor; PRM degrades to a 100ms cross-fade via the existing two-tier guard |
| `w6-blob-redress` | W6-4 consumer half (S-4/Q7) | **VIABLE_WITH_AMENDMENTS** | 214 LoC | **GAP-1 CONFIRMED from the installed dist** (`uSatColor[]` absent at glass-ui 4.2.0/tranche-BG — per-satellite ink is consumer-impossible, stays L5); Q7 mount-gate (`v-if`, never display) cures the 390px clipped-smudge overflow; the size-law numbers corrected by live measurement; **net-new L5 item found** (pointer shaping, below) |

## Ratification-time riders (fold into the wave docs at ratification; SYNTHESIS not reopened)

### w0-dev-backend (2 — both minor/optional)
1. **W0-1**: `ApiOfflineChip` mounts only inside `CurrentPaletteEditor` under `v-if="savedColorStrings.length>0"` — the misconfig state is not guaranteed visible at first paint. Add: "surface the `misconfigured` state in an always-mounted dev banner (not only the save-conditional chip)." The unconditional `console.error` is load-bearing either way.
2. **W0-1**: optional `predev:web-only` guard (`test -f dist/value.js || npm run build`, mirroring the `prepare` idiom) so the named escape hatch boots on a cold checkout; the honest `dev`→dev.sh entrypoint already one-shot-builds.

### w2-usecolorpipeline (4)
1. **W2-1 `applyTokens` ∧ ≤400-LoC are in tension**: the merged composable holds 397 LoC only because 2 of the "4 root-token writes" (`--accent-live`, `--view-hue-shift`) stayed App-scoped (they read `useContrastSafeColor`/viewManager, not the color model). Edit: "one `applyTokens` sink for the COLOR-MODEL-DERIVED root-token writes; the other two stay App-scoped, OR unify into a sibling `useColorTokens` with the ≤400 cap applying per-file."
2. **W2-1 anchor list under-counts the blast radius**: append `keys.ts` (injected key/ActionBarContext type), `usePaneRouter.ts` (dead model-prop wiring), and the `NORMALIZED_COLOR_NAMES` relocation (2 importers) to the anchor cell.
3. **W2-1 persistence-precedence premise correction**: localStorage (`color-picker`) is WRITE-ONLY today — no boot restore exists, so there is no clobber to demote; the work is to ADD a localStorage→model restore gated behind URL-wins, sequenced with W6-1.
4. **W2-1 `savedColorStrings` twins diverge in OUTPUT** and the loser feeds the palettes pane: name the canonical formula (recommend the per-space `toFormattedString` version) and add a palettes-pane display check to the wave gate.

### w4-title-component (2)
1. **W4-1 open-state clause**: the producer's own chevron rule (glass-ui `SelectTrigger.vue:138` `[&[data-state=open]]:rotate-180`) is DEAD CODE — reka SelectIcon never carries `data-state`; the caret has never rotated in ANY glass-ui Select consumer. The rotation fix lands in glass-ui (key off the trigger's state); the demo carries a marker-commented consumer utility only until it ships. → also a NEW letter item (below).
2. **W4-1 rest clause** ("no padding rhythm survives"): enforce in the scoped block, not the utility list — glass-ui's slim `cn` does not resolve `p-0` against the producer's `px-3 py-2`.

### w7-wax-seal (2)
1. **W7-1**: the seal's ink resolves as ONE token (`--seal-ink`) — the seed's CSS relative-color flip (threshold L 0.62 off `--watercolor-color`) is the proven interim shape; W7-4's library resolver MAY absorb it as a 10th written token so the threshold is library-derived, not a CSS literal.
2. **S.W7 hard-gate item 1**: "at every viewport" → "at every viewport where the collapsed state is REACHABLE (the demo pins `always-expanded` below 1024px, `Dock.vue:111`; below that the gate is vacuous unless W7-2 changes the mobile collapse posture)."

### w6-blob-redress (4)
1. **W6-4/atmosphere §2 size law**: footprint `clamp(9rem,18cqi,13rem)` → `clamp(11rem,26cqi,13rem)` — measured: 18cqi of the real 695px pane = 125px, so the 9rem floor binds at 144px, a SHRINK from the shipped 176px; the 13rem cap needs a 1156px pane that never exists on the dual grid.
2. **Atmosphere §2 overflow clause**: "≥40% of the bead's diameter overflows" is jointly unsatisfiable with center-on-radius-origin (geometric max ≈ (R−r)/2R; measured 25–27% live) → "≥25% per broken edge", OR relocate the center to the card corner POINT if ≥40% is the wanted composition (a design call; more detached look).
3. **W6-4 visible-bead clause**: "≥96px" is out of consumer reach (~94px ceiling at the 26cqi footprint without starving the satellite ring) → condition on the L5 HERO preset landing; an in-window producer miss is RECORDED as the wave's producer-gap row and re-verifies at W8 (the same hedge shape the satellite gate carries).
4. **L5 append** → letter rider (below).

## Net-new producer findings → GLASSUI-S-ASKS riders (fold at letter dispatch — the dispatcher re-stamps HEAD then anyway)

1. **NEW item — Select chevron rotation is dead code**: `SelectTrigger.vue:138` `[&[data-state=open]]:rotate-180` targets an attribute reka's SelectIcon never carries; no glass-ui Select consumer has ever had a rotating caret (verified live on two consumers). Fix keys off the trigger's own state (e.g. `in-data-[state=open]:rotate-180`). Repairs every consumer including the dock view-select.
2. **L5 append — pointer shaping**: the GooBlob ROOT square (canvas `pointer-events:none`, root `auto`) intercepts sibling-card clicks in the corner-break composition (hit-test at (770,150) resolves to the goo-blob root over the About card) and offers a ghost copy-affordance on dead corners; no clean consumer cure (clip-path would clip the satellite overscan paint). Ask: SDF-shaped hit-testing or a root pointer-events seam.

## Cross-seed learnings (wave-brief material)

- **A fresh worktree cannot boot the demo without `npm run build` first** — mechanism-C self-aliases `@mkbabb/value.js` → the repo's OWN `dist/`; three lanes hit this independently. Every S-wave worktree brief must include the one-shot build (or the dist symlink, when `src/` is untouched).
- **Shared-browser contention corrupts probes** (S.md §13 lesson 7 re-confirmed live): the reliable vehicle is an owned headless Playwright via the repo's own install.
- **Second-vehicle corroboration of the W2-1/W6-1 boot-seed defect**: the w6 lane reproduced the URL→boot color corruption (green URL → pink `lab()`) on a FRESH headless profile with no storage.
- The w2 lane's live keypress probe is the instant-update oracle shape W2's gate wants: one `Home` keypress on the L-thumb must move model + `--slider-thumb-bg` + URL + `--accent-live` synchronously.
