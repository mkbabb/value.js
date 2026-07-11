# T.W6 · Lane D — THE REMAINDER close record (W6-6 + W6-8 + the T-31 LAW)

**Lane**: D (dock+nav), the completion half — the prior Lane D landed W6-4 + W6-7
(merged `b4711d8`; NOT re-touched here per the §Recovery resume law).
**Branch**: `t-w6-laneD-remainder`, cut from `tranche-t` @ `a92f501`.
**Commits (item-scoped, per the §Commit plan)**:

| Item | Commit | One line |
|---|---|---|
| W6-6 | `e4ddd32` | T-9 re-home — the banner orphan dies (SFC + barrel export); the dock STATUS LAMP lands (band chrome, dev-gated, first-paint) |
| W6-8 | `c237d24` | T-29 settle-stamped clip release · T-36 true-button box-model (§0.6 rider) · native-title retirement · the separator fold |
| T-31 | `d8f1fb1` | THE DOCK-ATOP LAYOUT LAW — two-band grid shell; the fixed overlay + `--dock-total` + `z-dock` trio retired together |
| PP-8 | `a9f5e88` | the ActionBarToggle colocated lift (Dock.vue 468→336 · App.vue 400) — zero behavior change, oracles re-green post-lift |

## §1 W6-6 — the banner dies into the dock STATUS LAMP (T-9 / R10)

- The App.vue MOUNT left at W5 (`011918f`, the one round-4 App.vue writer); this
  lane excised the ORPHAN: `DevMisconfigBanner.vue` deleted + the `status/index.ts`
  export dropped (grep-zero on `DevMisconfigBanner` across demo/e2e/test/scripts).
- The affordance re-homed: `dock/DockStatusLamp.vue` + the pure resolver
  `dock/status-lamp.ts` (born colocated, E-1). Band chrome at the inline-end —
  out-of-flow (the pill's centring never shifts), visible at FIRST PAINT in every
  dock state, never a collapsible layer, never gated on a palette save. The
  register is the ApiOfflineChip's exact instrument language (Fira small-caps,
  hairline edge, status pulse): misconfigured = ALERT (filled destructive lamp);
  unavailable = STATUS (muted open ring). Dot-only below lg (the 390 pill is
  never crowded).

### O-22 — the variant matrix (gate GREEN)

| availability | isDev | face |
|---|---|---|
| misconfigured | true | `misconfigured` · role **alert** · "dev misconfigured — run \`npm run dev\`" |
| unavailable | true | `unavailable` · role **status** · "backend offline — saved locally" |
| unknown / available | true | none (a healthy band carries no lamp) |
| any | false | none (**dev-gated** — the lamp ships dark in production) |

- **Closed-form half**: `test/status-lamp.test.ts` — 14/14 green (the full matrix
  + misconfigured ≠ unavailable distinctness on BOTH variant and role).
- **Live e2e half**: `e2e/smoke/oracles/o22-status-lamp.spec.ts` — 2/2 green
  (no false lamp + the banner negative watch; the `unavailable` variant under a
  REAL aborted transport, band-seat + role + geometry asserted). HARNESS BOUND
  recorded in-spec: the misconfigured face cannot fire under the e2e webServer
  (it sets `VITE_API_URL`, disarming the triad's first leg by design).
- **Live misconfigured probe** (the face the harness can't reach): a bare
  `npx vite` (no `VITE_API_URL`, loopback, prod BASE_URL) on a lane port —
  `.dock-status-lamp[data-variant="misconfigured"]` rendered at first paint,
  `role=alert`, **the loud `console.error` fired** (probed live 2026-07-11;
  frame `o22-lamp-misconfigured-1280.png`).

### The S.W0-1 seed-rider CONTRACT VERIFICATION record (R10 survives column — byte-preserved)

`git diff a92f501..HEAD -- demo/@/lib/palette/api/` is **EMPTY** — the whole
transport/availability seam is byte-identical; the lamp only READS the latch
through the injected api-client seam. The four survives rows, each verified
executable (test/status-lamp.test.ts §"S.W0-1 seed-rider contract"):

1. **The transport latch** — untouched (`availability.ts`); the triad
   (`detectDevMisconfig`) asserted leg-by-leg.
2. **Synchronous `DevMisconfigError`** — `assertApiAttemptAllowed()` throws in
   the call frame under the misconfigured latch (never a later rejection, never
   the generic `ApiUnavailableError`).
3. **Loud `console.error`** — `initApiEnvironment` fires it exactly once with
   the actionable message (asserted + probed live on the bare server).
4. **misconfigured ≠ unavailable** — `markApiUnreachable()` never relabels a
   designed misconfig; the two lamp faces are distinct in variant, role, ink,
   and dot form (filled vs open ring).

## §2 W6-8 — the clip release + the register pass (T-29 / T-36 / O-15b)

- **T-29 (DEMO-owned, no portal)**: the slot's state machine grew `.is-settled`
  — stamped on the grid-columns `transitionend` (PRM included: the global guard
  shortens transitions to 0.01ms, never removes them) and on the boot-seated
  double-rAF; dropped the instant presence drops. At settled-visible rest the
  inner box computes `overflow: visible` — the ×1.1 hover capsule + the
  box-shadow states render WHOLE. `overflow-clip-margin` REJECTED as sole cure
  (Safari ships none — the forensic's own note honored).
- **T-36 (§0.6 owner rider, binding)**: the Tools trigger steps the compact
  4px sticker seat up to the Button-primitive px-3/py-2 scale through the
  producer's OWN `--dock-compact-control-padding` token hook (never a
  specificity fight), + `margin-inline` off the folded separator + the label's
  em-gap. Landed box: `padding 8px 12px`, `margin-inline 4px` (oracle-pinned).
- **Native-title retirement**: the ×4 Dock.vue sites + SlugEditLayer ×2 (+ the
  unlabeled submit gains `aria-label`) + the two passive DarkModeToggle rows
  (`aria-hidden` — the rows' own "Dark mode" text is the accessible name).
  Dock-tree grep on native `title="` → **zero** (the one remaining hit is
  `GenericActionBar.vue`'s `:title` — a DECLARED ActionButton prop, not a
  native attribute; renders as `aria-label` + visible label). The icon-only
  glass-tooltip register remains the standing E-2 packet candidate (recorded
  at `t-outline-dropdown-clip.md §2` — no new dispatch needed).
- **The separator fold**: the desktop `DockSeparator` moved INSIDE the animated
  inner box — the pair enters as ONE gesture with the 0fr→1fr arrival; the
  v-if pop grammar dies.
- **Gate**: O-15b **4/4 green** (settled-rest release + whole-shadow via the
  keyboard-modality focus ring — the one box-shadow the register paints by
  default, `--dock-active-shadow` ships `none` · the T-36 box-model · zero
  native title incl. the action-bar layer · the separator fold); O-15a still
  **2/2 green** (no regression on the prior half's seal watch).

## §3 T-31 — THE DOCK-ATOP LAYOUT LAW (owner-verbatim; B-1 + C-5 books consumed)

Landed per the pass-B §3 sharpened structural spec (`w45-checkpoint/passes/
ladder-neutrals-ink.md`):

- `.app-layout`: flex column → **two-band grid** (`auto 1fr`, `row-gap:
  var(--dock-gap)` — the designed gap token). `<nav class="dock-band">` IS row 1:
  in-flow, offsets zero, `min-height: var(--dock-h)` (the collapse morph never
  jitters the band — the collapsed seal is height-pinned square by producer
  construction); `<main class="pane-main">` centres the scene in row 2.
- **The retired trio, together**: the fixed overlay at Dock.vue's root · the
  `--dock-total` padding reservation (token DELETED; `--content-max-h` base is
  now the scene band's honest `100%`, the desktop/ultra-wide designed clamps
  unchanged) · the load-bearing `z-dock`. The paint order no longer depends on
  the producer `z-dock → --z-index-dock → --z-dock` chain — the P9
  single-point-of-failure that reproduced the owner's shot is severed. ZERO
  z-index arms minted; portaled menus keep chrome z (SelectPortal — verified).
- The pass-B **0–1px worst case** dies: at 1100×430 the card top sits a full
  `--dock-gap` below the pill (probed + framed).
- Doc-truth: `demo/DESIGN.md` §Layout + §Z-tier re-narrated; the dead
  `top-dock-inset` @theme bridge excised.

**Gate GREEN 8/8** (`e2e/smoke/oracles/t31-dock-band.spec.ts`): band structure
(grid, 2 rows, in-flow nav, zero z-arms, designed gap ≥7px, band floor ≥40px) ·
retired-utilities negative watch on the live root · the `elementFromPoint`
occlusion probe (100-point grid over the band) across **views (picker ·
Palettes · Mix) × scroll × both schemes × 390 × 1100×430 × 2560×1080** — zero
card hits · the ultra-wide pin re-confirmed in-band.

### Recorded residual (NOT this lane's — the boot chain is W2's, closed)

**The cold-load dock-arrival stall (pre-existing, live-bisected)**: the FIRST
page load of a fresh SwiftShader browser process can leave the W2 dock-arrival
veil (`overture-dock-veiled`) unreleased 20–30s+ (observed stuck ≥30s; the
churning WatercolorDot radius transitions sit in the arrival fallback's await
set). **Reproduced identically at the pre-T-31 head `c237d24`** (fixed-overlay
layout) — T-31 is NOT the cause; the class pre-dates the band law. The t31
oracle carries a recorded warm-up navigation (harness-shaping, no gate
weakened); the flake routes to the wave log for the W8 slate (it is also the
Q14/T-39 load-quality face). Boot-chain files untouched by this lane.

## §4 Suites at the lane close (head `a9f5e88`)

- `npm run lint` 0 · `npm run typecheck` 0 (lib + demo) · `npm test`
  **2222/2222 (73 files)** (was 2208/72 at the cut — +14 status-lamp).
- Lane oracles POST-lift: O-22 2/2 + matrix 14/14 · O-15a/b 6/6 · T-31 8/8 —
  all 16 e2e legs green in one run (lane ports 8293/8294; the owner's :9000
  untouched throughout).
- The full 6-project close-run: launched on the lane ports at close — tally
  recorded by the dispatch report (StructuredOutput evidence field).
- Tool-artefact grep over this record + the touched docs: EMPTY (M-1).
- PP-8: no demo file > 400 LoC (Dock.vue 468→336 via the ActionBarToggle
  colocated lift `a9f5e88`; App.vue back to exactly 400 by tightening this
  lane's own added comment).

## §5 Visual evidence (on-disk, gitignored per the standing convention)

`docs/tranches/T/audit/w6-laneD-remainder/`:
`t31-band-1280-light.png` · `t31-band-1280-dark.png` · `t31-band-390-light.png`
· `t31-band-1100x430-light.png` (the worst case, cured) · `w68-tools-rest.png`
· `w68-tools-hover.png` (the capsule whole, un-cut) ·
`o22-lamp-unavailable-1280.png` · `o22-lamp-misconfigured-1280.png` ·
`o22-lamp-misconfigured-390.png` (dot-only compaction).
