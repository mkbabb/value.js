# S.W6 — ATMOSPHERE + HERO (Fable: aurora + blob; S-4/S-18)

**Name**: W6 — Atmosphere + hero (aurora truth + blob redress)
**Opens after**: S.W2 (+ round-2 close; round 3 — runs parallel with S.W5). Boot-seed integrity rides the pipeline (W2-1).
**Spec of record**: `audit/SYNTHESIS.md §3.8` (items W6-1..W6-6) · §0.6/§0.7 (REDRESS not reinvent; the four-defect aurora composite, wiring INTACT) · the §7.1 hard-gate map (L2 → W6-2/W6-3; L1 → W6-5) · Q7 outcome from `S.md §12` (**FLIP, RATIFIED 2026-07-05**: full blob presence at EVERY viewport, idiomatic — `audit/RATIFICATION-2026-07-05.md §2.2`; §0.6's "not reinvented" is amended there: the rebuild is JOINT — producer engine via L5, value.js the consumer contract) · **the W0-8 genesis brief (`audit/blob-genesis.md`) — this wave's blob items CONSUME it** · the `audit/seeds/SEEDS.md` w6 riders (folded into W6-4).
**On any divergence between this wave doc and its spec-of-record sections, the spec wins** (the S.md charter clause, restated here so the rule is self-evident in-file).
**Agents**: ≤4 — Fable + frontend-design (seed+scheme / derive / blob / safari+config), π archives light/dark × cold/live.
**Hard gate**: composite (§Hard gate) — cold-load e2e at a URL color paints the derived field first frame, light + dark · dark L band ≤0.42 (L2-hedged per the hard-gate map) · ≥2 distinct satellite beads (producer-cut-hedged) · Q7 full presence at EVERY viewport with the <lg perf gate green · π archives light/dark × cold/live.
**Status**: PENDING (RATIFIED 2026-07-05; gated on S.W2 + round-2 close).

---

## §Goal criterion

The first painted frame derives from the boot color; dark mode gets the dark field; the field
varies H AND C legibly; the blob reads as the picked color made flesh with a legible satellite
show. (SYNTHESIS §3.8 Goal, verbatim.)

## §Completion criterion

Cold-load e2e at a URL color paints the derived field first frame, light + dark; dark-field L
band ≤0.42 **once letter L2 lands — if the producer door hasn't landed in-window, the miss is
RECORDED as the wave's producer-gap row and the band re-verifies at the W8 adopt** (the same
fallback W6-4's satellite gate already carries; books never gates — the L2-dependent halves of
W6-2/W6-3 carry this identical hedge); a static hero screenshot shows ≥2 distinct satellite
beads (post-producer-cut, else the demo-geometry half's own gate); π archives light/dark ×
cold/live. (SYNTHESIS §3.8 Completion, verbatim.)

---

## §Scope (SYNTHESIS §3.8 item table, transcribed verbatim — anchors + evidence lanes intact)

| # | Item | Anchors | Evidence lane |
|---|---|---|---|
| W6-1 | **Cold-boot seed integrity** (S-18 anchor): fix the normalized-persistence corruption (`syncColorToStorage` persists the NORMALIZED unit's string — re-parsed as CSS it is the stale hot-pink the user sees every cold load); the first aurora frame derives from the boot color or nothing paints; `--saved-bg` becomes the derived base stop (boot → first frame is one material). Rides W2-1's precedence fix (the URL-clobber half) | `useAppColorModel.ts:74-78`; `useAtmosphere.ts:84-95` | design-blob-atmosphere P0-1; state-color P0-1 |
| W6-2 | **Scheme threading** (dark truth): consumer passes `useGlobalDark` → the atoms door once G-1 lands (letter L2 — `AuroraAtoms` lacks a lightness-scheme atom, suggested `lightnessScheme` (+`lBand`), NOT bare `scheme`: the atoms door already speaks "scheme" for the HUE axis, and L2 is the naming authority — the final name is the producer's call; `deriveAurora`'s internal `scheme`/`lBand` levers already exist and are dead code from the door); the dark L band `[0.18,0.42]` becomes reachable; interim: no demo shim (no-workarounds — the producer fix is the fix); an L2 miss in-window → record + re-verify at W8 (the hard-gate map — the wave still closes) | `atoms.ts:102-139` (producer); `useAtmosphere.ts:60-65` | aurora-derive P1; design-admin F-3; design-blob-atmosphere P0-2 |
| W6-3 | **Field derivation richness** (S-18's H/C half): chroma-adaptive hue spread (24°+40°·(1−C/0.3), clamp [24°,64°]) · C bell with an 0.04 floor (no dead-gray zones; neutral seeds stay alive) · scheme-banded L · richer default harmony (design call in-wave) · the CSS element layers CAPPED AT FOUR (three exist; the dock halo is the ONLY net-new; any 5th is excised); `hueSpread`/chroma-variance atoms = letter L2 | `keys.ts:22-33`; §3 brief in design-blob-atmosphere | aurora-derive P1; design-blob-atmosphere §3 |
| W6-4 | **Blob hero redress, demo half** (S-4 anchor — the demo half stays consume/config/placement; Q7's first-principles rebuild is the JOINT producer path: L5 co-rebuild grounded in the W0-8 genesis brief, which this item CONSUMES): footprint **`clamp(11rem,26cqi,13rem)`** (seed rider 1, corrected by live measurement — 18cqi of the real 695px pane = 125px, so the old 9rem floor bound at 144px, a SHRINK from the shipped 176px; the 13rem cap needs a 1156px pane that never exists on the dual grid); visible bead ≥96px **conditioned on the L5 HERO preset landing** (seed rider 3: ~94px consumer ceiling at the 26cqi footprint without starving the satellite ring — an in-window producer miss is RECORDED as the wave's producer-gap row and re-verifies at W8, the same hedge shape the satellite gate carries); corner-break placement LAW owned by the pane slot (bead center on the radius origin with **≥25% overflow per broken edge** — seed rider 2: the ≥40% clause is jointly unsatisfiable with center-on-radius-origin (geometric max ≈ (R−r)/2R; measured 25–27% live) — OR relocate the center to the card corner POINT if ≥40% is the wanted composition, a design call in-wave (the more detached look); nothing paints over it — kills the About-card burial with zero z hacks); **full presence at EVERY viewport per Q7's FLIP** (RATIFIED 2026-07-05: the <lg presence law is NEW design scope — footprint, placement, overflow discipline, GL lifecycle DESIGNED, not toggled — with perf as a HARD gate; the seed's mount-gate rider is OBSOLETE-as-cure (it implemented absence); its findings carry as constraints: the 390px clipped-smudge overflow, and hidden-but-mounted holds a LIVE GL context); ramp ceiling tracks the picked C (the 0.16 ceiling literally cannot show the advertised ink); mood FSM KEPT and bound to real app moments (scrub→excited, save→happy drip, idle→sleepy-as-contained-pose); PRM = static single-frame render. Producer halves (satellites-at-rest, scale-aware deformation, single-GPU-surface policy, HERO preset, chord-dent, DPR, `uSatColor[]` — GAP-1 now dist-confirmed: absent at glass-ui 4.2.0/tranche-BG, consumer-impossible, stays L5) = letter L5 + the W8 consume | `HeroBlob.vue:15`; `ColorPicker.vue:18-22`; `useAtmosphere.ts:100,112-116`; `audit/blob-genesis.md` (W0-8) | blob-greenfield-tech §5; design-blob-atmosphere §2; SEEDS.md w6-blob-redress; RATIFICATION §2.2 |
| W6-5 | **Safari verification**: the missing WebKit blob repro stood up on `smoke-safari` (the literal spazz was NOT reproducible on desktop Chrome; the dual-WebGL2-contention hypothesis needs the WebKit vehicle); aurora re-verify post-L1 shader cure; the centroid-in-wrapper spazz assertion | `smoke-safari` project | blob-greenfield S-blob-5; safari-truth |
| W6-6 | **Config-pane redress**: `ConfigSliderPane` single-label (the doubled sans+mono rows), the floating action pill un-occluded, readouts paired with labels; crayon Slider variant + ConfiguratorRow label API = letter L14 | `ConfigSliderPane.vue` | design-blob-atmosphere P1-7 |
| W6-7 | **Pointer-reactive atmosphere** (NEW — owner ruling 2026-07-05, `audit/OWNER-RULING-2026-07-05-aurora.md` §1.3): the mouse influences the field (parallax/attraction/local bloom — design call in-wave, PRM-honest); ONE pointer grammar across backdrop + hero (must not fight the blob's pointer choreography); demo consume half only — if the producer aurora exposes no pointer door, the L19 letter ask stands with the standing hedge (in-window miss → producer-gap row, re-verify at W8); NO engine fork | `useAtmosphere.ts` · the aurora consume surface | OWNER-RULING-2026-07-05-aurora; ADDENDUM L19 |
| W6-8 | **The card field-floor integration** (NEW — forensics `audit/card-lighting-forensics-2026-07-05.md` artifact 1, the owner's "light source within the card"): mount `data-paper-field` on the demo's aurora plane (the one-attribute demo half — the producer's field-floor fallback gate at their `cards.css:121-126` then disarms the orphan amber radials that today paint on EVERY glass card with no dark arm); after landing, RE-MEASURE the artifact-3 contrast rows (the hot-zone 2.61:1 → expected ≥4.2:1); residuals route: alpha muted rung + the dark-arm damping = ADDENDUM (producer F2.R1 home); the W4-1 title-ink-vs-plate-luminance follow-up → W7-3's accent system (cross-ref, recorded) | the aurora plane mount point (App/atmosphere root) | card-lighting-forensics-2026-07-05 |

### Post-ratification owner-ruling riders (2026-07-05, binding — `audit/OWNER-RULING-2026-07-05-aurora.md`, §0 verbatim wins)

1. **W6-1 entrance clause**: the "boot → first frame is one material" law EXTENDS to the
   entrance — no explicit dark→light/light→dark snap at load. W3-2's idle-deferral mechanics
   STAY (the perf gate holds); the ARRIVAL is designed (derive-in on the house motion grammar,
   PRM-honest). A designed entrance, never a reverted deferral.
2. **W6-3 amplification**: the field must read as STRONG presence with visibly GREATER derived
   C and H variance off the pick — "subtle, though, but with more noticeable" (variance ≠
   noise; the derive-tuning triumvirate halt still binds). The producer variance atoms
   (`hueSpread`/chroma) were already L2 — the ruling is their amplification-by-owner
   (ADDENDUM dispatch).

## §Triumvirate dispatch

Mandatory on:

- **bounds expansion**: any `../glass-ui` write — the L1 shader defects, the L2 atoms door, the
  L5 engine redress are ALL producer-owned (letter + adopt, never a fork); any `src/` write;
- **non-local gate failures**: the cold-load e2e still painting stale hot-pink after W6-1 (the
  normalized-persistence root mis-diagnosed, or a second corruption channel); the derived-field
  first-frame failing WITH the seed fixed (a paint-ordering defect, not a seed defect —
  different root); the Safari blob repro implicating the DEMO's consume geometry rather than
  the producer contention hypothesis (re-route the L5 ask on evidence);
- **loop halt**: the third iteration of any derive-tuning loop halts and routes (tuning is a
  design call in-wave, not an endless sweep).

## §File bounds · disjointness · worktrees

| Unit | Files | Access |
|---|---|---|
| seed + scheme (W6-1, W6-2 consume half) | `useAppColorModel.ts:74-78` · `useAtmosphere.ts` | modify |
| derive (W6-3) | `demo/@/components/custom/panes/keys.ts` · `useAtmosphere.ts` (derive params) | modify |
| blob (W6-4) | `HeroBlob.vue` · `ColorPicker.vue:18-22` (slot placement law) · blob config | modify |
| safari + config (W6-5, W6-6) | `e2e/smoke/safari/**` (new repro + assertions) · `ConfigSliderPane.vue` | create/modify |

`useAtmosphere.ts` is shared by the seed and derive units — one writer or sequenced. Do NOT
touch: `../glass-ui` (zero files), `src/`, `api/`, the dock/shell (W7's), `docs/precepts/`.
Parallel units in sibling worktrees cut from the wave head.

## §Hard gate (verbatim-faithful to SYNTHESIS §3.8 + the §7.1 hard-gate map)

1. Cold-load e2e at a URL color paints the DERIVED field first frame, light AND dark (no stale
   hot-pink; no unstyled flash) — rides W2-1's URL-wins precedence.
2. Dark-field L band ≤0.42 — **L2-hedged**: if the producer door hasn't landed in-window, the
   miss is RECORDED as the wave's producer-gap row and the band re-verifies at the W8 adopt;
   NO demo shim in the interim (the wave still closes).
3. Field richness: H AND C visibly track the pick (chroma-adaptive spread in-band; no dead-gray
   zones at neutral seeds); CSS element layers ≤4 (any 5th excised).
4. Static hero screenshot shows ≥2 distinct satellite beads (post-producer-cut, else the
   demo-geometry half's own gate: footprint/overflow/burial laws verified — the corrected
   clamp + ≥25%-per-broken-edge law, seed riders 1/2); Q7's FULL PRESENCE landed at EVERY
   viewport (the <lg presence designed, its perf gate green — never a toggle); the
   visible-bead ≥96px reading conditioned on the L5 HERO preset (an in-window producer miss
   RECORDED as the producer-gap row, re-verified at W8); PRM renders a static single frame.
5. Safari: the WebKit blob repro exists on `smoke-safari` (spazz assertion + centroid-in-wrapper);
   aurora re-verified post-L1 (or the L1 producer-gap row recorded).
6. π archives light/dark × cold/live.
7. `npm run lint` 0 · `npm run typecheck` 0 · `npm test` green · e2e 5-project green.
8. **(2026-07-05 riders)** The entrance carries no explicit load snap (W6-1 clause — capture in
   the cold-load π pair); the field reads STRONG with visibly greater C/H variance, subtle in
   register (W6-3 amplification — the π DELTA names it); W6-7 pointer-reactivity landed (one
   pointer grammar) or the L19 producer-gap row recorded.
9. **(forensics)** The in-card amber wash is DEAD on every glass card, light + dark (W6-8's
   `data-paper-field` landed — verify by the forensics doc's own T1 toggle method); the
   contrast rows re-measured (hot zone ≥4.2:1); the two producer residuals + the W7-3 ink
   cross-ref recorded, never shimmed.

## §No-workaround prohibitions (binding)

- **NO demo shim for the dark L band** — the producer fix (L2) is the fix; the hedge is a
  RECORDED miss, never an interim scheme hack (SYNTHESIS W6-2, verbatim).
- **NO blob reinvention IN THE DEMO** — Q7's first-principles rebuild is the JOINT producer
  path (L5 co-rebuild grounded in the W0-8 genesis brief); value.js owns the consumer contract
  + compositional law; demo work stays consume/config/placement (SYNTHESIS §0.6 as amended by
  RATIFICATION §2.2).
- **NO aurora rewiring** — the wiring is provably INTACT; only the four named defects are
  touched (SYNTHESIS §0.7; aurora-derive non-findings recorded: do not rebuild).
- **NO z-index hacks** for the corner-break law — the pane slot owns placement.

## §Format + lint cadence

`npm run lint` + `npm run typecheck` + `npm test` after each unit batch and before close;
`npx playwright test --project=smoke-safari` after W6-5 lands and at close; the cold-load e2e
after W6-1 and at close.

## §Verification artefacts (π lane)

Saved at close (cited in `PROGRESS.md`): **π paired archives — light/dark × cold/live** (the
four-quadrant set, baseline + close + DELTA); the cold-load e2e output (first-frame capture);
the static hero satellite screenshot; the Safari repro record (spazz assertion output; aurora
post-L1 status); the L2/L1 producer-gap rows if fired; per-unit commit hashes.

## §Commit plan

W6-1 seed integrity (own commit with body — the S-18 anchor); W6-2 scheme threading (consume
half; the gap row if L2 unlanded); W6-3 derive richness (design-call record in body); W6-4 blob
redress (placement law + Q7); W6-5 Safari verification (specs); W6-6 config redress; π + status
commit at close.

## §Dependencies

- **Depends on**: S.W2 (boot-seed integrity rides the pipeline; W2-1's precedence fix is the
  URL-clobber half of S-18).
- **Blocks**: S.W7's round-4 entry (round barrier — NOT a dependency edge).

## §BOOKS opened/serviced (books-never-gates)

- **L2 (atoms door) / L1 (WebKit shader) / L5 (blob engine redress)** — letter items with the
  hard-gate-map hedges: an in-window miss → the wave's producer-gap row + re-verify at W8.
- **The 5.0.0 adopt (S.W8)** — consumes `uSatColor[]`/`bodyLightness`/`lightnessFloor` and
  deletes any interim satellite fallback (none may be authored here).

## §Evidence packets consumed

`audit/lanes/design-blob-atmosphere-vision.md` · `audit/lanes/aurora-derive-audit.md` (wiring
INTACT — the non-findings bind) · `audit/lanes/blob-greenfield-tech.md` ·
`audit/lanes/safari-truth.md` · `audit/lanes/state-color-pipeline.md` P0-1 ·
`audit/lanes/design-admin.md` F-3 · `letters/GLASSUI-S-ASKS.md` L1/L2/L5 ·
**`audit/blob-genesis.md` (the W0-8 genesis brief — consumed by the blob items)** ·
`audit/seeds/SEEDS.md` (w6-blob-redress riders + measurements-as-constraints).

## §Hand-off

W7 enters at round 4 after this wave and W5 both close (round barrier). W7-7's dark-scheme
aurora inversion closes via W6-2 (cross-ref, not a second fix). The producer-gap rows (if any)
ride to S.W8's adopt walk and S.W9's book re-verification.
