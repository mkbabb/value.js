# T · lane t-glassui-forward — the glass-ui FORTHCOMING trajectory map

**Charge**: audit the glass-ui forward work (READ-ONLY `../glass-ui`) — the BG board /
directive-ledger + the BH restructure plan — and map which T findings that forward work
ALREADY covers vs needs NEW asks, plus the timing windows the T request-packets must respect.
**Method**: read-only census of `../glass-ui` on branch `tranche/BG` (HEAD `0be1f4a3` at read,
version 4.2.0). Sources: `docs/tranches/BG/DIRECTIVE-LEDGER.md` (94 canonical directives / 7
workstreams), `docs/tranches/BG/CONSTRAINTS.md`, `docs/tranches/BH/PLAN.md` (the 5.0.0
restructure), `docs/tranches/BG/execution/{EXECUTION-PROGRESS.md, publish-and-cut.md,
bh-interleave-map.md}`, the `coordination/VALUEJS-S-ASKS-*.md` letters + reply, `GU-3-TRIAGE.md`,
and the `audit/visual/BG.W-*-DELTA.md` paint deltas. ZERO product-code changes; this lane writes
only this file. Every claim cites a producer file / doc / progress-row.

---

## §0 The forward shape (what "glass-ui 5.0.0" IS, so the T packets aim at the right cut)

Two interleaved tranches converge on ONE major:

- **BG** (`tranche/BG`, live, ~110 waves) — the **integration + verification** tranche. It cures
  the 4.2.0 regression wave (the ledger's histogram: 19 REGRESSED / 8 UNADDRESSED / 38 PARTIAL /
  3 DEFERRED / 19 ADDRESSED, `DIRECTIVE-LEDGER.md §9`). Build order (`BH/PLAN.md §3`): core
  **WS1→WS3→WS2→WS5→WS6→WS4→WS7**, then deep-morphism **WS8→WS11**, then the **WS12 coherence
  capstone LAST**. At read the frontier is deep into the F-family visual repairs (F9 viz, F2
  glass legibility) with ~29 not-done rows of 115 (`EXECUTION-PROGRESS.md §1`); most PENDING rows
  are PAINT-PENDING (source-landed, awaiting the dual-engine paint re-verify at `W-REFLECT`).
- **BH** (`docs/tranches/BH/`, developed, awaiting greenlight) — the **de-indirection + export
  reshape** tranche, cut JOINTLY with BG as **5.0.0** (`BH/PLAN.md §2-#4`). It collapses
  `src/subpaths/` (79 mirrors) + `src/api/` (854L) into ONE generated entry-set, deletes CLAUDE.md,
  and carries the export-surface breaks. The whole consumer-facing 5.0.0 break is small
  (`BH/PLAN.md §7`): **drop `./api` + re-home its 203 symbols + the `goo-blob → blob` rename**.

**The registry spine (`publish-and-cut.md §0`, inv-11)**: strictly linear on master —
`4.2.0 → 4.3.0 → 4.4.0 → 5.0.0`, each tag an ancestor of the next. value.js currently rides the
`file:../glass-ui` pin (tracks `tranche/BG` live, per §3.4 pin policy), so value.js sees BG source
BEFORE the cut; the **hard adopt-event is the npm `^4 → ^5` bump**, which for value.js is the T
equivalent of the S.W8 adopt row. **Consequence: every T producer packet has TWO landing horizons
— (a) the BG source landing (visible to value.js live via file:-pin, unblocks the T consuming
waves) and (b) the 5.0.0 npm cut (the version event, the MIGRATION row).** A packet that needs a
subpath/rename/token change is bound by the FREEZE gates in §1; a packet that only needs a src-level
behavior fix rides the F-family waves and is visible the moment it lands on `tranche/BG`.

---

## §1 THE TIMING WINDOWS (the binding output — the gates every T packet must respect)

Four freeze gates, in the order they close. A T packet that misses its gate becomes a post-5.0.0
minor (a second break event the owner's "one migration event" edict forbids, `BH/PLAN.md §2-#4`).

| # | Gate | What it freezes | Closes at | The T packets it binds |
|---|------|-----------------|-----------|------------------------|
| **W-1** | **WS12 export-regen freeze** (`BH.B2.1-swap`, `[WS12]`) | The published subpath/export SET. The regen re-derives `package.json` exports against the landed post-WS12 surface (`BH/PLAN.md §4-B2.1-swap`); after it runs, adding a subpath is a new minor. | After full BG close (WS12). | Any NEW subpath (**L20 `/blob/config`**, the `/well` idea if it lands as a subpath); the **Blob rename** (`goo-blob→blob`, R14, pinned to THIS row); the `/axes` grammar subpath (already landed F6.1). |
| **W-2** | **B4e MIGRATION authoring freeze** (`[WS12]`) | The 203-row MIGRATION table + every rename/token-retire ROW. Once B4e authors it "from a blank slate" (`BH/PLAN.md §4-B4e`), a late rename has no MIGRATION home. | After WS12, with B2.2 (`/api` fold). | Every T-driven **rename or token-retire** (the `--ring→--focus-ring-color` row already in; **L12 `/styles/fonts`** already in; any NEW T token rename — e.g. a `--well-bg` or a slider-checker seam that changes a token name). |
| **W-3** | **The F-family visual waves** (still PENDING/PAINT-PENDING pre-WS12) | The src-level behavior fixes (aurora, blob, glass legibility, motion). These are NOT export-surface — they can land any time before the cut, and value.js sees them live via file:-pin. | Rolling, before WS12. | GAP-ARM replay, L19 pointer door, the L2/A3 variance atoms, the F2.R1 register lifts, tabs pilling, the L5 blob residuals — the "behavior" packets. Earlier = value.js's own T consuming waves unblock sooner. |
| **W-4** | **The joint 5.0.0 tag** (`publish-and-cut.md §1`, the irreversible pre-tag close-battery) | Everything. The npm version event; value.js's `^5` adopt. | The tranche close. | The verify-at-cut walk (value.js re-verifies every folded ask on the built `dist`, the T equivalent of S.W8). |

**The load-bearing ordering fact**: WS12 has not landed; the frontier is still in the F-family
(`EXECUTION-PROGRESS.md`). So W-1/W-2 are STILL OPEN — a T packet that needs a subpath, a rename,
or a MIGRATION row has a real window, but it is the LAST window (the cut folds them all at once).
The behavior packets (W-3) have the widest window but the most value in landing early.

---

## §2 THE COVERAGE MAP — T finding → glass-ui forward work → verdict

Legend: **COVERED** (booked + landed/PAINT-PENDING; verify-at-cut, no re-ask) · **PARTIAL** (some
booked, a named residual owed) · **NEW ASK** (no BG/BH wave carries it — a fresh packet owed).

| T # | Finding (producer/joint slice) | glass-ui forward carrier | Verdict |
|-----|-------------------------------|--------------------------|---------|
| **T-1** | Load sync: background arrives showing a STALE/default field | **UN-BOOKED** — the GAP-ARM aurora arm-gap replay (`useAurora.ts:228/:262`) lives only in the value.js addendum letter (§3, F-1 below) | **NEW ASK** |
| **T-8** | Blob on-hover + satellite morphing (engine half) | **F9.R1 `W-BLOB-SATELLITE-SHADE`** (uSatColor[], bodyLightness/lightnessFloor) DONE `5df908ae`; **F9.R8 `W-BLOB-AFFECT-INTERACT`** (SDF hit-test, hover-lean, click-settle, ≥4 affect presets) PASS `e0320565` | **COVERED** (engine) + **PARTIAL** (L5 residuals: satellites-at-rest, HERO preset, scale-aware ceiling — §3, F-4) |
| **T-14** | Card transitions onto the liquid-glass easing curves | The producer motion canon (F5 family, `DOCK_SPRING {0.68,0.64}` byte-frozen; the `motion-canon` design doc extracted at BH B4c) is the SOURCE of the curves value.js consumes | **COVERED** (curves exist; the consume is demo — value.js binds its transitions to the producer tokens) |
| **T-17** | Dropdowns stylized (color previews) — the Select primitive half | **L18** Select chevron dead-code FIXED `d03579a1`; **L11** dropdown-menu glass tokens folded onto `W-DESHADCN` batch | **COVERED** (primitive) — the color-preview composition is demo |
| **T-20** | Glass-ui Tabs: triggers FILL the space, no gap, proper pilling | **UN-BOOKED for the geometry** — `SegmentedTabs` was CARVED (`W-COLOCATE`, 512→405L) and `W-TABS` standardized the engine (WS4-10 ADDRESSED), but NO wave carries the "triggers fill / no-gap pilling" geometry (grep of the WS4 converge specs + keystones for "no gap / fill the space / justify-stretch / trigger-width" = empty) | **NEW ASK** (producer-root, per the mandate's own tag) |
| **T-22** | The easing area still a mess | **L7 `EasingPicker v2`** (`btn-pill`×`glass-btn` co-occurrence fix, travel-dot rest, curve-glyph preset menu, PRM gate) folded onto `W-DESHADCN` | **COVERED** (batch) — verify-at-cut |
| **T-24** | Gray/black/white consistency audit; **T-27** loading "too gray" | **F2 glass family** (`no-gray`, `W-DARK-MATERIAL`, the warm-cream transmissive system) is the standing anti-gray spine; **F2.R1 `W-DARK-READABILITY-REPAIR`** the legibility census | **PARTIAL** — the neutral spine is landed; the boot-animation "gray" (T-27) is a transition-path defect (§3, F-2/F-3), NOT the glass spine |
| **T-25** | Aurora active behavior (drift/breath/pointer response) | **L1** WebKit aurora shader FIXED `d03579a1` + `proof:aurora-glsl-webkit`; **W-AUR-IMAGE-SOURCE** DONE (scheme/lBand door). The pointer-response door (**L19**) is UN-BOOKED | **PARTIAL** → **NEW ASK** on the pointer door (§3, F-2) |
| **T-26** | The variance bracket (C/H too muted; aurora not noticeable enough) | Only the **lightness** door landed (`W-AUR-IMAGE-SOURCE` I6 "deriveAurora scheme/lBand acted-on"). The **hueSpread + cross-stop chroma-variance** atoms (L2 second half) + the **A3 amplified range** are NOT built | **PARTIAL** → **NEW ASK** (the variance atoms, §3, F-2) |
| **T-28** | WatercolorDot current-color outline | **L3 `F9.R2 W-WATERCOLOR-RAF`** (rebuild on `useRAFLoop`) booked; **L10** WatercolorDot Safari sRGB wet-edge folded onto `F2.4` corner discipline | **COVERED** (rAF + sRGB) — the outline-fit recipe itself is a DEMO/value.js concern (WatercolorDot is a zero-GL value.js register, per `BG.W-BLOB-SATELLITE-SHADE-DELTA.md §5`) |
| **T-29** | Pseudo-dropdown clipped at edges | **L18** chevron fix repairs the view-select; the portal/overflow clip is a Select/Popover `content` surface — **L11** dropdown tokens touch the surface but no wave carries the OVERFLOW-CLIP fix | **PARTIAL** → possible **NEW ASK** if the clip roots in the producer portal (needs the T-nav/dropdown lane's surface identification) |
| **T-5** | Slider legibility + the vertical ring (producer slider half) | **L6** slider token pack (`--slider-thumb-border-w`, spectrum hover, fail-loud) + **A6** the dist-minify `backdrop-filter: none` drop folded onto `W-DESHADCN`/slider batch. **A6 is UN-BOOKED** (addendum) | **PARTIAL** — L6 batch COVERED; **A6 NEW ASK**; the dock-like RING is a demo composition over the producer dock/rail (WS2-08) |
| **T-11/T-12/T-13** | Cards too glassy; search styled inconsistently; shadow-palette surface too transparent (the material half) | The glass ladder is sound (`t-card-material` confirms 5 rungs); but there is **no recessed WELL rung** and `.input-bar` hard-binds the FLOATING rung — no BG wave mints either | **NEW ASK** (the WELL rung P-1 + the input-bar rung P-2, cross-ref `t-card-material §5`) |

---

## §3 THE NEW ASKS — the un-booked producer gaps (the T request-packet spine)

These carry NO BG/BH wave. Each is a fresh packet the T corpus must author against glass-ui. The
grep witness for "un-booked": the addendum items (A1/A2/A4=L19/A5=L20/A6/A7) appear ONLY in
`coordination/VALUEJS-S-ASKS-ADDENDUM-2026-07-05.md` — the BG reply (`§Reply` in the main asks doc)
dispositioned L1–L18 but the addendum, dispatched later the same day, was **never replied to or
folded into any wave** (the only "A7" hits in the execution tree are the WS12 concentricity arm,
unrelated). This is the single largest forward gap.

### F-1 · GAP-ARM — the aurora arm-gap replay (T-1 producer root cause) — **UN-BOOKED**
**Evidence**: `VALUEJS-S-ASKS-ADDENDUM §A7`; independently re-confirmed at HEAD by the sibling lane
`t-aurora-boot-active.md §F-1` (`useAurora.ts:228` wires the config deep-watch only inside
`armRuntime()` post-idle-arm, with no immediate replay; `:262` snapshots `getCfg()` at mount → any
URL/seed hydration landing in the construction→arm gap is dropped → a green seed cold-boots a
hot-pink field, forever, until the first in-session change).
**Root cause**: producer — one honest replay owed: `inst.update(getCfg())` after `inst.arm()`, or
`immediate: true` on the post-arm watch.
**Owner**: producer (the replay) + demo (hydration-first ordering — value.js's own T lane owns that half).
**Cure direction (gestalt)**: the arm boundary must REPLAY the live config at the moment it goes
live, not snapshot a stale one at construction — a mount that arms deferred owes a post-arm
reconciliation, so the first painted frame is ALWAYS the hydrated field. This is the load-bearing
producer fix behind T-1; it must land on `tranche/BG` (W-3 window) so value.js's T load-sync wave
can consume it, and it needs NO export change (rides the F-family).

### F-2 · The aurora VARIANCE atoms + the POINTER door (T-25/T-26/T-27) — **PARTIAL / UN-BOOKED**
**Evidence**: `VALUEJS-S-ASKS §L2` folded the LIGHTNESS door onto `W-AUR-IMAGE-SOURCE` (DONE — gate
arm I6 "deriveAurora scheme/lBand acted-on"), but the **hueSpread + cross-stop chroma-variance**
half of L2, the **A3 amplified range** ("strong in effect, greater C/H variance"), and the **L19
pointer door** (A4) are all un-carried. `t-aurora-boot-active.md §2.2/§F-` cites the same L2/A3
packet and the `uCursorBurst`/`uCursorVelocity` door as producer-owned.
**Root cause**: producer — the derive ceilings can't express the owner's bracket (T-26: more
presence than analogous/0.7, less than triad/0.82), and the engine exposes no pointer input.
**Owner**: producer (the atoms + the door) + demo (the calibration inside the bracket + the pointer
choreography — value.js's aurora lane owns those).
**Cure direction (gestalt)**: extend the AuroraAtoms door with a chroma/hue-variance axis sized for
the owner's bracket (the T-26 bracket becomes the SIZING SPEC), and a PRM-honest normalized-pointer
input (zero-cost when unset). L19 explicitly asks that the pointer grammar be shape-compatible with
the goo-blob pointer input (the L5 co-rebuild) since ONE pointer grammar spans backdrop + hero blob
on value.js's side — so this door and the blob's SDF pointer door should share a shape. Rides the
F-family (W-3); no export change.

### F-3 · The boot-animation quality triple (T-27: gray/slow/jittery) — **NOT the glass spine**
**Evidence**: T-27 names three defects on BOTH the boot animation and the per-pick transition. The
"gray" is a TRANSITION-PATH defect (interpolation crossing gray), distinct from the F2 anti-gray
glass spine which is landed.
**Root cause**: joint — the derive/transition must ride a chroma-preserving path (value.js color
math owns the interpolation; the producer aurora owns the field's arrival curve). The "jittery" is
the rAF coalesce/paint chain — GAP-ARM (F-1) is one contributor (the first-frame flip), plus the
aurora's own arm-cadence.
**Owner**: joint — value.js owns the chroma-preserving interpolation; producer owns the field
arrival + the arm-replay (F-1) + an optional palette-ease atom (`t-aurora-boot-active §222` asks a
producer palette-ease so the field doesn't step).
**Cure direction (gestalt)**: fold F-1 (arm-replay) + F-2 (variance/pointer) + a producer
palette-ease atom into ONE "boot + transition quality" packet, so the field's arrival is chroma-true,
paced, and hydrated on the first frame. This is the largest owner-pain cluster (T-1/T-25/T-27 all
converge here) and it is the most under-booked.

### F-4 · The L5 blob RESIDUALS (T-8 second half) — **PARTIAL**
**Evidence**: F9.R1/R8 landed the satellite-shade + affect + SDF hit-test (PASS, both engines), but
`t-blob-hero.md §3` + `w6-producer-gap-rows GAP-L5` record **satellites-at-rest UNBUILT, HERO preset
ABSENT, scale-aware deformation ceiling owed**. The `VALUEJS-S-ASKS §L5` reply folded these
constraints onto F9.R1 as CONSTRAINTS but the paint deltas verify only the shade + pointer, not the
rest-pose / HERO-preset / ±35%-curvature-ceiling.
**Root cause**: producer — the co-rebuild's rest-state + export-preset + curvature-bound half is not
yet in the verified surface.
**Owner**: producer (engine rows A–D in `t-blob-hero.md §4`) + demo (the entrance/moment beats).
**Cure direction (gestalt)**: the T blob packet re-cites the L5 residual rows (satellites-at-rest
guarantee keyed off a `settled` seam, the exported HERO preset the demo's ≥96px visible-bead gate
depends on, the scale-aware curvature ceiling) as an ADDENDUM to F9.R1 — NOT a re-ask of the shade
work. **Note the T-8 clip/z/placement half (no-clip, higher-z, into-the-card, all-screen-sizes) is
CONSUMER (value.js HeroBlob composition), not producer** — the producer's only placement stake is
the SDF pointer-events seam (landed F9.R8).

### F-5 · The WELL rung + the input-bar rung (T-11/T-12/T-13 material) — **NEW ASK**
**Evidence**: `t-card-material.md §5` P-1/P-2 — the glass ladder has 5 elevation rungs UP but no
recessed rung DOWN (the demo minted the well 6 times by hand), and `.input-bar`
(`utilities/components.css:205-212`) hard-binds the FLOATING (popover-weight) rung, so the search
pill imports dialog material into a card interior (measured 0.80/0.88 vs host 0.36/0.43).
**Root cause**: producer — the ladder is missing its recessed rung and the search recipe binds the
wrong rung.
**Owner**: producer (packets P-1/P-2) + demo (the 6-site consume).
**Cure direction (gestalt)**: mint `--glass-bg-well` (an opaque tone-step, no backdrop-filter,
scheme-registered like every rung) + a `.glass-well` composable with the dashed-edge affordance on
top; re-recipe `.input-bar` to a card-interior rung (or expose a rung seam). Both are ladder-shaped,
belong at the root, and — if either changes a TOKEN NAME — bind the **W-2 MIGRATION window**.

### F-6 · A6 (dist minify drops unprefixed `backdrop-filter: none`) + A2 (muted-ink alpha rung) — **UN-BOOKED**
**Evidence**: `VALUEJS-S-ASKS-ADDENDUM §A6` (the dist keeps only the `-webkit-` leg of the spectrum
override → Chrome liquefies every spectrum track) + `§A2` (the alpha/muted label rung measures
1.42:1/1.50:1 both schemes over glass — a register floor, not a consumer override). `§A1` (the
card field-floor orphan fallback needs a dark arm) was ASKED to fold onto F2.R1, but the landed
F2.R1 scope (`BG.W-DARK-READABILITY-REPAIR-DELTA.md`) covers only the demo census (avatar/badge/
captions) — A1/A2 are NOT in it.
**Root cause**: producer — a build-pipeline vendor-prefix-collapse (A6), a register-level ink floor
(A2), and a missing dark arm on the field-floor fallback (A1).
**Owner**: producer.
**Cure direction (gestalt)**: A6 = fix the cssnano/lightningcss prefix-collapse so the unprefixed
leg survives (value.js carries a marker-commented byte-restatement that retires the day it does);
A1/A2 = extend the F2.R1 register lift to the orphan field-floor dark arm + the muted-ink alpha
rung floor (substitution-over-paste, the DL5 pattern). These ride F2 (W-3).

---

## §4 THE COVERED ROWS — verify-at-cut, no re-ask (the T corpus records, does not re-book)

These are booked + landed (or PAINT-PENDING) in BG/BH; the T packets cite them as VERIFY-AT-CUT
rows (walked at value.js's T-equivalent of S.W8), exactly as the S letter's discipline demands.

- **L1** WebKit aurora shader (3 GLSL defects) — FIXED `d03579a1` + `proof:aurora-glsl-webkit`
  gate. Every Safari user had only seen the CSS fallback; now the real aurora compiles. (T-25 Safari.)
- **L18** Select chevron dead-code — FIXED `d03579a1` (repairs the dock view-select + every Select
  consumer). (T-17/T-29.)
- **F9.R1** blob satellite-shade (`uSatColor[]`, bodyLightness/lightnessFloor) — DONE, dual-engine
  PASS. (T-8 engine.) **F9.R8** blob affect/pointer/SDF hit-test — PASS `e0320565`. (T-8 on-hover.)
- **L3** WatercolorDot zombie rAF → `F9.R2 W-WATERCOLOR-RAF` (rebuild on `useRAFLoop`). (T-28.)
- **L6/L7/L8/L9/L11/L13/L14/L16** — the component batch folded onto `W-DESHADCN` (slider tokens,
  EasingPicker v2, clampLabel, skeleton seams, dropdown-menu tokens, dock hover-grade token,
  ConfiguratorRow label API, backdrop-prefix policy). (T-5/T-17/T-22.)
- **L10** aliasing (mask-based corner clip, paletteToCssGradient dither, WatercolorDot Safari sRGB)
  → `F2.4` corner discipline. (T-28/T-10.)
- **L17 / R14** GooBlob → **Blob** rename — booked at `BH.B2.1-swap` `[WS12]` + the B4e MIGRATION
  row, NO alias; value.js consumes by-name at its W8 adopt. **Timing-critical: freezes at W-1.**
- **L12** `/styles/fonts` = the 18th specifier — added to the B4e MIGRATION table (W-2, done).
- **W-AUR-IMAGE-SOURCE** (lightness door), **W-GATE-FIELD-AURORA** (the `^1.1.1` value.js peer pin
  + `field-aurora-aa` `wcagContrastRatio` witness) — DONE.

---

## §5 THE `--ring` STRAND — value.js is an UN-ROSTERED consumer (a discrete forward finding)

**Evidence**: `GU-3-TRIAGE.md §ASK-B` — WS10 `W-DESHADCN-TOKEN-REPLACE` renames
`--ring → --focus-ring-color` (no alias, clean break), folded into **BH B7** as the atlas migration
row. The B7 roster (`BH/PLAN.md §7`) names atlas + speedtest as the `--ring` fallback consumers.
**value.js is NOT on that roster** — but value.js carries a bare `box-shadow: 0 0 0 2px var(--ring)`
at `demo/@/components/custom/color-picker/controls/ColorInput.vue:338` (grep-verified, exactly one
site, no fallback). The instant the un-aliased rename lands at 5.0.0, that focus ring resolves to
nothing.
**Root cause**: the BH B7 by-name census (`P3.3-SIBLING-CONSUMER-ROSTER`) is a read-only grep of the
sibling tree; it counted atlas + speedtest but missed value.js's single site.
**Owner**: joint — value.js migrates the one site (`var(--ring)` → `var(--focus-ring-color,
var(--ring))`, fallback-first), and glass-ui adds value.js to the B7 roster + the MIGRATION row.
**Cure direction / timing**: this is a **W-2 (MIGRATION) window** item — the T packet must (a) ask
glass-ui to add value.js to the B7 `--ring` roster, and (b) value.js pre-migrates its one site
fallback-first BEFORE the cut so the `^4→^5` bump is a no-op. A one-line ask, but a silent-strand if
missed.

---

## §6 SYNTHESIS — the forward-trajectory verdict for the T corpus

1. **The blob is the best-covered owner finding** — F9.R1 + F9.R8 land the engine (shade + affect +
   SDF pointer, both engines PASS). The T-8 packet is mostly a value.js CONSUMER job (clip/z/
   placement) + a thin producer ADDENDUM (the L5 rest-pose/HERO-preset/curvature residuals, F-4).
2. **The aurora is the worst-covered** — the entire T-1/T-25/T-26/T-27 cluster (load sync + active
   behavior + variance + boot quality) roots in producer work that is UN-BOOKED (GAP-ARM replay,
   the variance atoms, the pointer door) because the value.js addendum letter was never
   dispositioned. This is the single highest-leverage forward packet (F-1/F-2/F-3).
3. **The freeze gates are still OPEN** — WS12 has not landed, so the export-regen (W-1) and MIGRATION
   (W-2) windows are live. The Blob rename, L20 `/blob/config`, the `--ring` roster add, and any
   T-new token rename ALL fold at the cut — but they must be IN the packet before B2.1-swap/B4e run.
4. **The behavior packets (W-3) want to land early** — GAP-ARM, variance atoms, pointer door, tabs
   pilling, the F2.R1 A1/A2 lifts, the L5 residuals are all src-level; value.js sees them live via
   file:-pin, so the sooner they land on `tranche/BG` the sooner value.js's own T waves unblock.
5. **Two genuinely new producer-root packets beyond the addendum**: **tabs pilling** (T-20, no
   geometry wave exists) and the **WELL rung + input-bar rung** (T-11/12/13, no ladder wave mints
   them). Both are ladder/primitive-shaped, belong at the root, and if they touch a token name they
   bind the MIGRATION window.
6. **The verify-at-cut discipline holds** — the covered rows (§4) are RECORDED not re-asked; the T
   corpus's producer-boundary packet should read exactly like the S letter: NEW asks with file:line,
   a hard-gate map for the ones on a T consuming wave's critical path, and a verify-at-cut list for
   the rest, all walked at value.js's 5.0.0 adopt.
