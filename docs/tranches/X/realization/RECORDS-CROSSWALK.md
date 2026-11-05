# Records crosswalk — V-D8 (realization execution, 2026-11-04)

Addendum seat for the records unit V-D8 of `realization/PLAN.md` §2 (E-3: no sealed document is patched; each section below sits beside the record it crosswalks). The falsifier is `realization/records-check.mjs`; every section's row keys are what it reads.

Classes used in the status column:
- **cured-at** `<sha | run>`: the reading is GREEN at that receipt.
- **superseded-by** `<wave>`: the label was routed (the `→` in its own LEDGER cell) to a wave that is CLOSED; that wave's terminal row is the disposition. This is FINAL Annex A's method.
- **glass-held → V-Gx**: the bytes are glass's; the value adoption read is unit V-G1 (10.1.5), V-G2 (10.2.0) or V-G3 (11.0.0). Re-read today: `npm view @mkbabb/glass-ui version` → `10.1.4` (none of the three is published).
- **owner-held → OA-x**: the realization PLAN §7 owner packet row.

## §1 · Track A honest-RED labels (LEDGER Track A table, lines 28–43)

| label | status | evidence / command |
| --- | --- | --- |
| `X-W0 HG-8's literal byte-diff clause — ESC-N1` | superseded-by X-W0.m VERIFY-ONLY adjudication (COHESION §0k.3): 18/18 hard GREEN · 8/8 fold GREEN; ESC-N1 disposed in FINAL Annex A (row `ESC-M1`, "one owner with ESC-M1 / K-R1") | `close/ANNEX-A-2026-11-04.md` |
| `X-W1 G-17` | cured-at ci `41920320369` (success, `0a2c35d74`, master) | `gh run view 41920320369 --json conclusion` → success |
| `X-W1 G-19` | cured-at deploy-pages `41939659512` (success, `0a2c35d74`, master) | `gh run view 41939659512 --json conclusion` → success |
| `X-W1 G-20` | cured-at ci `41920320369` + deploy-pages `41939659512` (deploy truth: served bundle = master build) | COHESION §0hr (served `index-B3dwCeez.js`) |
| `X-W2 G3` | cured-at the real-GPU lhci cell: TBT 52 / 61 ms at valid load (COHESION §0hb, the one witness binary Chrome 156); CI TBT stays a warn by ruling | COHESION line "the lhci GPU cell on the one witness binary" |
| `X-W2 G5` | superseded-by X-W11 (G5 release legs, VERIFIED 2026-11-02 §0hb.3) | LEDGER X-W11 row |
| `X-W3 G-21` | superseded-by the DR-11/G-21 bar ruling (COHESION §0gn: "keep their bar … only where the bar is measured moves") | COHESION `DR-11/G-21 keep their bar` |
| `X-W9 G3` | superseded-by X·P (parse-that W9/W10, the 4.1 cut residuals; PLAN §5) | `parse-that/waves/W9.md` |
| `X-W9 G12` | superseded-by X·P W10 `.c10` (V-C 6,226 MISS born RED; closes at value 4.3.0, PLAN §5 PW10z) | COHESION §0ht.1 |
| `X-W6 b1 B1-G3D` | superseded-by X-W11 (routed `B1-G3D → X-W11`, COHESION X-W6 CLOSED bullet) | COHESION `X-W6 CLOSED` |
| `X-W6 g1` | superseded-by X-W10 (routed `g1 → X-W10`) | COHESION `X-W6 CLOSED` |
| `X-W6 i3 I3-SEED-SIZE` | glass-held (O-53) → V-G3 (placement asked in O-136) | INBOX O-53 |
| `X-W7 G3` | superseded-by X-W7R / X-W7L (the glass repins that re-gated G3) | LEDGER X-W7R, X-W7L rows |
| `X-W7 G11` | superseded-by X-W11 G11 (zero legacy path, FINAL §5) | `close/FINAL.md` §5 |
| `X-W7 G14-grep` | superseded-by X-W7R B2-G14-grep (same grep, re-pinned) → see that row | LEDGER X-W7R row |
| `X-W7 CI-npm-test C-5/NG-6` | cured-at `480f58f7e`: vitest 1515/1515 ×2 (X-W11 RESUME eighteenth) | LEDGER 2026-11-01 X-W11 CLOSE event |
| `X-W7R B1-pin-10.0.1` | superseded-by X-W7L (owner: "All should be on 10.1."; glass 10.1.3 exact at `351615b9d`) | `package.json` `@mkbabb/glass-ui` = `10.1.3` |
| `X-W7R B2-G14-grep` | superseded-by X-W8 (shadcn and graph subtraction; G14 grep re-read at its close) | LEDGER X-W8 row |
| `X-W7R B5-smoke@10.0.1` | superseded-by X-W7L L6 smoke (re-classified at 10.1) → X-W12U | LEDGER X-W7L row |
| `X-W7R GLASS-VEIL-GREY O-62` | glass-held (O-62) → V-G2 (10.2.0 read set, O-135) | INBOX O-135 |
| `X-W7L INK-VEIL-MIDBAND` | glass-held (O-62 (a), glass token cure I-45 `95068476`) → V-G2 (VITEST-HELD ×5) | INBOX O-135 |
| `X-W7L ABOUT-PROSE-VEIL` | superseded-by X-W12U (routed) | LEDGER X-W12U row |
| `X-W7L L6 smoke 79 classified` | superseded-by X-W12U (routed) | LEDGER X-W12U row |
| `X-W7L C-5/NG-6` | cured-at `480f58f7e` (vitest 1515/1515 ×2) | as `X-W7 CI-npm-test C-5/NG-6` |
| `X-W12 drag-p95` | superseded-by X-W12U `.p` (O-80) | LEDGER X-W12U row |
| `X-W12 E-R1-2` | superseded-by X-W12U `.b` | LEDGER X-W12U row |
| `X-W12 DOCK-MORPH-ROOT` | glass-held → V-G2 (10.2.0 W-0.8 morph, O-135) | INBOX O-132 reply (`b2eb9950a`) |
| `X-W12 DOCK-TRIGGER-CLIP` | glass-held → V-G1 (OD-17 ring ⊂ clip, 10.1.5; O-134) | INBOX O-132 reply |
| `X-W12 DOCK-COLLAPSED-FORM` | glass-held (O-65) → V-G1 (OD-16 collapse settle, 10.1.5) and V-G2 (r4 squash, 10.2.0) | INBOX O-132 witness reply |
| `X-W12 GLASS-SELECT-GREY` | glass-held → V-G3 (11.0.0 lineage labels, O-136) | INBOX O-136 |
| `X-W12 SIDE-DOCK-EDGE` | glass-held → V-G3 (O-136) | INBOX O-136 |
| `X-W12 GLASS-VEIL-GREY` | glass-held (O-62) → V-G2 | INBOX O-135 |
| `X-W12 G3-PARK-CLOCK` | superseded-by X-W12 REPAIR 1 GROUND-CLOCK-ON-ROOT `0ec9bb1e` + pixel-snap `e1e26fe8` (LEDGER 2026-09-24) | LEDGER X-W12 REPAIR 1 event |
| `X-W12 UIA-V` | superseded-by X-W12U (routed; X-W12U IS the UIA-V supplement) | LEDGER X-W12U row |
| `X-W12U npm-test standing 7` | glass-held (O-62 (a)) → V-G2; its C-5/NG-6 limb cured-at `480f58f7e` | INBOX O-135 |
| `X-W12U smoke 15` | superseded-by X-W10 addendum (routed) | `waves/W10-ADDENDUM-*` |
| `X-W12U perf G2-constant` | superseded-by §0fu.1 (read through) | COHESION §0fu.1 |
| `X-W12U G3/G4` | superseded-by X-W2 G3 (routed) → cured-at the real-GPU lhci cell (row `X-W2 G3`) | above |
| `X-W12U O-5 SwiftShader informational` | informational by its own label; the GPU truth is the real-GPU cell (§0ge.2) | COHESION §0ge.2 |
| `X-W12U 844×390 CLS 0.00001` | superseded-by X-W8 `.i` → ESC-W8c-1 (Annex A) | `close/ANNEX-A-2026-11-04.md` |
| `X-W12U DOCK-CAP-ELLIPSE` | glass-held (O-83) → V-G1 (rx == ry at 390/430/844, 10.1.5) | value-DESIGN V-D12 G-10.1.5 |
| `X-W12U L3-6/X-8 held §11` | superseded-by X-W11 (held to §11 by its own label) | LEDGER X-W11 row |
| `X-W12U O-74 rows` | glass-held (O-74) → V-G3 (O-136) | INBOX O-136 |
| `X-W12U O-99` | glass-held (O-99) → V-G3 (O-136) | INBOX O-136 |
| `X-W5 g2` | superseded-by X-W6 `.s` (W5D4-SETTLE-READ, landed `201f737a`) | COHESION X-W5 routing bullet |
| `X-W5 B3` | superseded-by CC-056 (routed) | COHESION X-W5 routing bullet |
| `X-W5 A3` | superseded-by X-W8 (routed `A3/C2 → X-W8`) | COHESION X-W5 routing bullet |
| `X-W5 C3` | superseded-by X-W8 `.i` (routed) | COHESION X-W5 routing bullet |
| `X-W5 C7 DockStatusLamp:70` | superseded-by X-W8 `.h` (routed) | COHESION X-W5 routing bullet |
| `X-W5 A5-OUTLINE` | superseded-by X-W10 (routed) | COHESION X-W5 routing bullet |
| `X-W5 o12 O-12·3` | superseded-by X-W8 `.i` (routed as `O12-3-HOVER-GPU`) | COHESION X-W5 routing bullet |
| `X-W5 D1 headless` | superseded-by the real-GPU cell of record (§0ge.2; "D1 headless beside") | COHESION X-W5 routing bullet |
| `X-W8 ink D6/T-35` | glass-held (O-62 (a)) → V-G2 | INBOX O-135 |
| `X-W8 DOCK-SCROLL-MORPH` | glass-held (O-55) → V-G3 (O-136) | INBOX O-136 |
| `X-W8 e2e named rows` | superseded-by X-W10 / X-W2 (routed) | LEDGER X-W10, X-W2 rows |
| `X-W11 G9 O-117` | cured-at glass `10.1.3` exact repin (COHESION: "O-117's 'with glass 10.2.0' was a timing note … 10.1.3 is" the cure, both consumers GREEN) | COHESION O-117 bullet |
| `X-W11 w7 ×4 O-106 + R-vrb-1` | glass-held (O-106, W-E.4) → V-G3 (O-136) | INBOX O-136 |
| `X-W11 4 producer-held rows` | glass-held → V-G3 (E2E-HELD ×4, O-136) | `e2e/producer-held.json` |
| `X-W11 dead-band design row` | owner-held → OA-6 (A-3: dead band, identity chroma or floor) | PLAN §7 |

## §2 · PRE-X MT-REGISTER → X (the 15 zero-X-token records; X-W0-FOLD W0.24)

Records live at `docs/tranches/V/megatranche/registry/adjudicated/<name>.md`. The X row is the wave whose scope owns the record's subject (wave titles at `waves/W*.md`); the four BLOCKER identities are re-measured on the live tree at `1ad923777`.

| record | X row | re-measure on the live tree (command → reading) |
| --- | --- | --- |
| `AdminPane` | X-W3 (access, route closure) + X-W7 (MT-AU1 admin core, REFINEMENT-FOLD packet 6); its V′-W47/W52 shell residues ride this row | — |
| `AdminUsersPanel` | X-W7 (MT-AU1, homed) | — |
| `App` | X-W2 (boot boundary) + X-W5 (one route, one scene). **BLOCKER L-1 / MT-F012 (empty prod bundle):** `curl -s https://color.babb.dev/ \| grep -o 'assets/index-[^"]*\.js'` → `index-B3dwCeez.js`, `curl … \| wc -c` → **482,599 B**, and the §0hr reads show the app mounted with 0 page errors (§0hw.1): **CURED**. **BLOCKER C-1 (route-untrue boot):** `demo/app/main.ts:139` `await Promise.all([router.isReady(), …])` before mount: **CURED**. **BLOCKER D-4 (zero H1):** `demo/app/App.vue:99` `<h1` plus PaneShell's route `<h1>` seam (`demo/shared/ui/PaneHeader.vue:61`): **CURED**. | see cell |
| `ColorInput` | X-W6 (instruments) + X-W4 (semantic controls) | — |
| `ColorPicker` | X-W6 (instruments) + X-W12 (the picker's hierarchy). **BLOCKER C-2 ≡ D-1 (inert mobile action surface):** cure homed at X-W5 (nine-witness mobile command identity). D-1's aggravation, the `whenColorPickerReady` 40 × 50 ms poll and give-up, **still reads in the tree** (`demo/app/composables/usePaletteWiring.ts:38–59`); it is cured at root in §0hw.2 (V-D8.4): the wait becomes a one-shot `watch` on the picker ref | `git grep -n PICKER_WAIT_ATTEMPTS demo` |
| `ColorSpaceSelector` | X-W4 (semantic controls) + X-W12 (OD dockets) | — |
| `ConfigSliderPane` | X-W6 (instruments) | — |
| `Dock` | X-W12 (the dock) + X-W5; glass-held halves ride V-G1..V-G3 | — |
| `GenerateControls` | X-W7 (palette specimen and domain split) | — |
| `GradientStopEditor` | X-W6 (temporal scenes / gradient) | — |
| `Markdown` | X-W8 (shadcn and graph subtraction) | — |
| `chassis-fitness` | X-W5 (stage = measure law, Z-chassis-2/3) + X-W10 | — |
| `layout-gestalt` | X-W10 (canonical design and motion) | — |
| `library-band` | X-W9 (parser and library apotheosis) → X·P | — |
| `parser-band` | X-W9 → X·P (parse-that W9/W10) | — |

## §3 · Outbound id collisions, resolved (INBOX; rule: next id = max on disk + 1 at send time)

| id | kept subject | moved subject → new id | record |
| --- | --- | --- | --- |
| `O-130` | glass aurora plate-rung relay (`d8bf09bc6`, booked glass `fd44a9022`) | fourier follow-up to O-119 → O-132 | INBOX ERRATUM (D-39) |
| `O-132` | glass Safari field report OD-16/17/18 (booked glass `b2eb9950a`) | fourier follow-up to O-119 → O-133 (value reservation) → **O-149** | INBOX 2026-11-04 rows; §0hw.2 erratum |
| `O-133` | glass's own HA SegmentedTabs row (glass reply `063fcf7e5`) | value's reservation withdrawn → **O-149** | INBOX glass-ui-c7 reply (`a9c2b2496`) |

## §4 · CARRY-LEDGER §B–§F → X (the committed bytes; the working-tree +34-line hunk is OA-14's)

| row | X row or terminal disposition |
| --- | --- |
| `W46` | X-W0 (formation rulings) + X-W10 (canonical design and motion: seat, proportion and type law). W5.md:364 names the V′ W46 booking that never executed |
| `W47` | X-W5 (one route, one scene; W5.md:364–365 `… CH-6 → W47`) |
| `W48` | X-W6 (instruments and temporal scenes: the picker instrument) + X-W12 (the picker's hierarchy) |
| `W49` | X-W7 (palette specimen and domain split; W5.md:364 names W49–W52) |
| `W50` | X-W7 (W7.md:658: "DR-28's UI half was booked to V·W50, which never ran"); D55.iii `__Host-` cookie → owner-held OA-11 |
| `W52` | X-W3 (access) + X-W7 (MT-AU1); REFINEMENT-FOLD:485 |
| `W53` | X-W7 (workbenches' domain split) + X-W6 |
| `W54` | X-W6 (W6-atmosphere-tombstone.md:97: "V-prime W54 → vnext D17 → X-W6") + X-W2 (boot) |
| `W55` | X-W2 (W2.md:244/297: W55 CH-4 re-booked as an optional attestation, never the gate) + X-W11 (verified close) |
| `W56` | X-W11 (release and verified close; 4.1.0 → 4.2.0 on npm) |
| `D49 residue` | X-W0 track-or-archive (W0.md title) — terminal there |
| `D53.vi` | terminal: the app root is `demo/app/` today (`ls demo/app` → `main.ts`, `App.vue`); the rename is done |
| `scripts/dev/dev.sh` | owner-held → OA-13 (no seat touches it) |
| `B5` | owner-held (U-era packet P1..P8, never proxied) — booked terminal at X-W0 §0j |
| `E13 standing law` | standing law, carried by every X seat (INBOX sweeps); terminal as law, not a row |
| `keyframes: BOTH expectations DISCHARGED at W44 close (I-10, 2026-07-17)` | terminal (discharged at W44); kf now pins value 4.2.0 exact |
| `glass (BJ tranche)` | superseded-by the glass 10.x adoption chain (X-W7R → X-W7L → 10.1.3); remaining glass rows ride V-G1..V-G3 |
| `atlas/sci` | terminal at the X-EXT rows (INBOX I-32..I-34 routing) |
| `Deep-audit item — gh-pages prod-preview empty mount` | superseded-by X-W1 G-13 (MEASURE-AT-OPEN; `evidence/w1/boot/MEASURE-AT-OPEN-2026-09-17.md`, the "boot-guard quirk" claim read false) |
| `audit/rehearsal/ disposition` | X-W0 track-or-archive — terminal there |
| `Glass §7 fixes expected inbound (§D already rows them)` | superseded-by the glass 10.x adoption chain (as `glass (BJ tranche)`) |
| `ActionBarLayer local transition shim` | superseded-by X-W4 (action ownership) / X-W5 (scene action contract) |
