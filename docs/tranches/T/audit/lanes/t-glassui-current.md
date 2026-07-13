# t-glassui-current — the glass-ui CURRENT-STATE ground-truth map

**Lane**: `t-glassui-current` (T DEVELOPMENT forensics fleet). **Mandate**:
`docs/tranches/T/MANDATE-2026-07-06.md`. **Charter**: full glass-ui CURRENT-STATE audit
(READ-ONLY `../glass-ui`) + verify the 14 OPEN GLASSUI-S-ASKS + the addenda (A1–A7, L19, L20)
+ produce the producer ground-truth the T request packets build on. **ZERO product-code
changes** — this file is the only write.

**Probed**: `../glass-ui` @ **`19ddbd71`** (`tranche/BG`, working-tree tip 2026-07-06 22:24,
still committing ~10-min cadence) + the **consumed dist** (built **2026-07-05 21:41**, labelled
`4.2.0`). value.js consumes glass-ui via **`file:../glass-ui`** — `node_modules/@mkbabb/glass-ui`
is a **symlink** to the source tree, so the consumed artifact is `../glass-ui/dist` (a
**gitignored local build**, NOT a registry pin). Ground-truth for the S-close ledger:
`docs/tranches/S/FINAL.md §5` + `letters/GLASSUI-S-ASKS.md` + `-ADDENDUM-2026-07-05.md`.
Producer disposition read from `../glass-ui docs/tranches/BG/coordination/VALUEJS-S-ASKS-*`
(their `652f58e8` §Reply) + the tranche/BG git log.

---

## §0 — The six load-bearing findings (one line each)

1. **G-CUR-1 (DIST STALENESS, producer/joint)** — the consumed dist (Jul-5 21:41, "4.2.0") is
   **39 source files behind** the tranche/BG tip (`19ddbd71`, Jul-6 22:24); dist is a gitignored
   LOCAL build. "The 4.2.0 dist we consume" is a moving target — every T consume MUST rebuild
   glass-ui, and the adopt-event must pin a rebuilt dist, not trust the version label.
2. **G-CUR-2 (GAP-ARM / A7, producer, OPEN)** — the aurora cold-load arm-replay defect is
   UNFIXED in source (`useAurora.ts:262` snapshots cfg at mount; the `:228` config watch has no
   `immediate`); only a docs commit (`9b891736`) filed it. **User-visible on prod** (flat pink
   field for any seed). The producer root of **T-1 / T-25 / T-27** (load desync + wrong-colour-on-load).
3. **G-CUR-3 (L2 variance door, producer, OPEN = the T-26/A3 sizing spec)** — `resolveAtoms`
   threads only `harmony/stopCount/temperatureShift` to `deriveAurora` (`atoms.ts:285-294`);
   `hueSpread` is hardcoded 28, there is NO chroma-variance atom, NO `lightnessScheme` atom, and
   the bell `chromaEasing` DESATURATES the ramp extremes (`color.ts:276`) — the "too muted"
   reading. The levers exist in `deriveAurora`; the ATOMS DOOR does not expose them.
4. **G-CUR-4 (the "L6–L16 → W-DESHADCN" fold did NOT deliver the fixes, producer)** —
   `BG.W-DESHADCN` landed as the tailwind-v4 / no-shadcn 233-file SWEEP (`6dddda04` DONE), NOT
   the L-item fixes. **L6 / L8 / L9 / L11 / L16 verified STILL OPEN in source.** T request
   packets must RE-ASK each by-name, not treat the fold as a discharge.
5. **G-CUR-5 (what DID discharge since S close, verify-at-adopt)** — **L1** Safari-aurora GLSL
   (`d03579a1` + the `proof:aurora-glsl-webkit` gate), **L3** watercolor zombie-rAF
   (`b01d0556`, present in dist), **L18** Select chevron (`d03579a1`), **L19** aurora pointer
   door (`interactivity.light/scroll` ship), **L5** SDF hit-test engine-half (`useBlobPointer`,
   F9.R8). **A1/A2** dark-arm is SOURCE-landed (F2.R1 tokenized) but **paint-PENDING** (not
   dual-engine verified).
6. **G-CUR-6 (three T findings already have their producer primitive — CONSUMER-adoption gaps)**
   — **T-28** ← WatercolorDot's `ghost` variant traces the SEEDED ORGANIC silhouette (the
   correct outline, vs the too-fine circular ring); **T-20** ← SegmentedTabs `layout:"full"`
   liquid-tab is equal-fill gapless pilling; **T-14** ← `--spring-snappy/smooth/bouncy` +
   `--ease-cartoon-punch` liquid tokens already ship.

---

## §1 — The consumption topology (what value.js actually pulls, and how)

`node_modules/@mkbabb/glass-ui -> ../../../glass-ui` (symlink). value.js therefore consumes
**`../glass-ui/dist`** directly — and `dist/` is **gitignored** (`git check-ignore dist/goo-blob.js`
→ ignored). So:

- There is **no version fence**. The consumed bytes are whatever `../glass-ui` last built. The
  `package.json` `"version": "4.2.0"` is frozen by the §3.4 file:-pin policy (origin/master stays
  4.2.0-era until the 5.0.0 cut) — it does NOT track the tranche/BG content the dist actually holds.
- **The consumed dist is STALE.** Built `2026-07-05 21:41`; **39 source files are newer**
  (`find src -type f -newer dist/glass-ui.js | wc -l` = 39), incl. `goo-blob/composables/useBlobPointer.ts`,
  the concentric/liquid-grid/dot-flow/fourier shader trees, and `composables/glass/wave/waveField.*`.
  The producer tip is `19ddbd71` (Jul-6 22:24) — the dist lags the tip by a full day of BG work.

**Import surface** (demo grep): barrel `@mkbabb/glass-ui` (41) · `/dock` (14) · `/watercolor-dot`
(11) · `/dom` (11) · `/goo-blob` (6) · `/search` (5) · `/tabs` (4) · `/motion-core` (4) ·
`/aurora` (3) · `/easing` (3) · `/confirm-dialog` (3) · `/color` (2) · `/configurator` ·
`/controls` · `/forms` · `/dark`. These are the primitives the T packets can touch.

> **G-CUR-1 (producer/joint, load-bearing).** Owner: **joint**. Root cause: `file:` symlink +
> gitignored dist = the consumed artifact is a local build with no content-addressed fence, and
> it is currently a day stale. **Cure direction (gestalt, not a patch):** the T adopt/consume
> discipline must (a) rebuild glass-ui as a gated pre-step of any consume-wave (`cd ../glass-ui
> && npm run build`), and (b) at the 5.0.0 cut, the adopt-event pins a REBUILT dist verified
> against a stamped producer HEAD — never trust the version label as a content signal while the
> file:-pin holds. This is the standing "HEAD-stamp corollary" (S letter §16) applied to the
> DIST, not just the source HEAD.

---

## §2 — The 14 OPEN GLASSUI-S-ASKS ledger (current state, verified in tree)

Legend: **DISCHARGED** (landed since S close, verify-at-adopt) · **OPEN** (unchanged / not
delivered) · **SOURCE/PAINT-PENDING** (source landed, dual-engine paint not verified).

| L# | S-close state | **T-current state** | Evidence (glass-ui tree) |
|---|---|---|---|
| **L1** | OPEN (P0 Safari) | **DISCHARGED** | `d03579a1` fixed the 3 GLSL defects (`flatCol`, vec4-consistent `structureTensorField`); `proof:aurora-glsl-webkit` gate minted (`8dcb033d`, in `package.json:874`-area scripts). Verify at adopt on WebKit26. |
| **L2** | OPEN | **OPEN** (the T-26/A3 sizing spec) | `atoms.ts` `AuroraAtoms` exposes seed/harmony/colorEnergy/zones/noise/medium/motion/interactivity — NO `lightnessScheme`/`lBand`/`hueSpread`/chroma-variance atom. `resolveAtoms` passes only `{harmony,stopCount,temperatureShift}` (`atoms.ts:285-294`). Levers exist unused in `deriveAurora` (`color.ts:133 hueSpread`, `:168 scheme`, `:174 lBand`). |
| **L3** | OPEN (P0 rAF) | **DISCHARGED** | `b01d0556` (`BG.W-WATERCOLOR-RAF`): `useWatercolorBlob.ts:183` now drives `useRAFLoop` (`pauseWhenHidden` + PRM). **Present in the consumed dist** (`dist/watercolor-dot.js` has `useRAFLoop`). |
| **L5** | OPEN (blob co-rebuild) | **PARTIAL / engine-half DISCHARGED** | SDF pointer hit-test LANDED: `useBlobPointer.ts:104 hitTest(clientX,clientY)` (F9.R8, `BG.W-BLOB-AFFECT-INTERACT` → `985525b2` DONE). BUT the single-WebGL2-engine collapse is NOT done — `goo-blob/shaders/metaball.wgsl.ts` (25.8 KB WGPU twin) still present; the L5 "drain the 529-LoC wgsl ratchet" is unmet. `uSatColor[]` (F9.R1) landed (`5df908ae`). |
| **L6** | OPEN | **OPEN** | Slider has size tokens (`--slider-track-height/-thumb-size` sm/md/lg, `Slider.vue:212-221`) but **NO `--slider-thumb-border-w`** token; no spectrum `cursor:grab`/scale-1.06 hover recipe; no `--slider-track-checker` seam (A6 companion). |
| **L7** | OPEN | **OPEN (verify-at-cut)** | `EasingPicker.vue` + `EasingConfigurator.vue` present; the v2 sub-asks (btn-pill×glass-btn co-occurrence, travel-dot rest, curve-glyph menu, PRM gate, README truth) not confirmed landed — full-component re-audit owed to a T packet. |
| **L8** | OPEN (P1, re-escalated) | **OPEN — 5th booking** | `DockSelectTrigger.vue` (42 lines) forwards `SelectTriggerProps` + `{class}` only — **no `clampLabel` prop, no truncation**. The named-owner hard ask remains undelivered. |
| **L9** | OPEN | **OPEN** | No `--skeleton-shimmer-delay` / `-duration` / `-tint` anywhere in `src/` — the pseudo-element inherit seam is still structurally dead. |
| **L10** | OPEN | **OPEN (verify)** | Mask-corner-clip primitive + `paletteToCssGradient` dither + WatercolorDot Safari wet-edge recal — not confirmed landed; T packet re-audit owed. |
| **L11** | OPEN | **OPEN** | No `--dropdown-menu-bg/border/shadow` tokens in `src/styles/`; dropdown-menu still lacks select-parity glass tokens. |
| **L12** | OPEN (time-sensitive) | **OPEN — window still open** | `/styles/fonts` not yet in a canonical `MIGRATION.md` 5.0.0 table (MIGRATION 5.0.0 body still blank per FINAL; BH export-surface regen in flight, `docs/tranches/BH/research/proto/regen-*`). Fold-claimed to BH.B4e; unverified. |
| **L13** | OPEN | **OPEN (verify)** | Dock collapsed-circle residual / `dock-scroll-x` loud-overflow / hover-morph off `--duration-panel` onto a hover-grade token — not confirmed; T packet owed. |
| **L14** | OPEN | **OPEN (verify)** | `ConfiguratorRow.vue` present (distinguishes from LabeledField) but the double-label API fix + crayon-register Slider variant not confirmed landed. |
| **L15** | OPEN/DORMANT | **OPEN/DORMANT** | Gold/admin shimmer primitive still booked on the ≥2-consumer bar — no producer primitive minted (correct restraint). |
| **L16** | OPEN | **OPEN** | `-webkit-backdrop-filter` in **2** stylesheets, plain `backdrop-filter` in **14** — the one-policy pick was not made. |
| **L17** | NOT FIRED (rename) | **OPEN — gated on 5.0.0** | Still `GooBlob.vue`, `goo-blob/`, subpath `./goo-blob` (`package.json:545`), `proof:blob-color-equivalence` under `goo-blob/`. Owner-ratified symbol rename accepted (`652f58e8`), lands at the cut. |
| **L20** | OPEN (RP-2 anchor) | **OPEN** | No `./goo-blob/config` (or `/blob/config`) subpath in `package.json` exports — the config-only atoms door does not exist; the eager-budget blocker stands. |

### §2.1 — Addenda (A1–A7, L19) current state
- **A1 + A2 (card field-floor dark arm + muted-ink rung → F2.R1):** **SOURCE-LANDED but
  PAINT-PENDING.** `cards.css:60-71` tokenizes `--card-field-floor-blend` (dark arm swaps
  `screen`→`normal` sink); `tokens/dark-arm.css` carries the dark overrides. BUT
  `BG.W-DARK-READABILITY-REPAIR` dual-engine paint is **FAIL→PENDING** (`6cd63133`, `222b75fe`
  — "fix owed, DELTA on disk"). value.js cannot treat the dark card floor as paint-correct until
  BG closes that PENDING. Binds **T-3 / T-11 / T-13 / T-18 / T-24**.
- **A3 (L2 owner amplification):** the "strong effect + greater C/H variance" bar is the SIZING
  SPEC for L2's atoms — still OPEN (see G-CUR-3). This is the DIRECT producer-side of **T-26**.
- **A4 / L19 (aurora pointer door):** **DISCHARGED.** `atoms.ts:90 AuroraInteractivityAtom`
  ships `light` (cursor-as-light) + `scroll`; `useCursorInteraction.ts` / `cursorModel.ts`
  present; consumed at W6-7 (`cd177d7`). FINAL: "L19 never fired" (door pre-existed the ask).
  The `light` axis is the producer door for **T-25/T-27** "better background interactability".
- **A5 / L20:** OPEN (see table).
- **A6 (slider spectrum `backdrop-filter:none` dist drop):** **OPEN.** Source declares BOTH legs
  (`Slider.vue:421-422`); the **dist keeps ONLY `-webkit-backdrop-filter:none`** (2×; the
  unprefixed leg is gone) — Chromium ignores the alias, so the spectrum track stays blurred.
  A minifier vendor-prefix-collapse defect in the dist pipeline; value.js carries the
  marker-commented restatement until the dist keeps the unprefixed leg.
- **A7 / GAP-ARM:** **OPEN** (see G-CUR-2). Docs-filed only (`9b891736`); `useAurora.ts` unchanged.

---

## §3 — T-finding → producer-primitive map (the request-packet substrate)

Each row: the T finding, its producer surface in the current tree, the owner (demo | producer |
joint | src), and the gestalt cure direction. This is the map the T request packets build on.

### Aurora / boot (T-1, T-25, T-26, T-27)
- **T-1 / T-25 load desync + boot quality** — **producer + joint.** Producer root = **GAP-ARM**
  (`useAurora.ts:262/:228`, OPEN): the armed-GPU arm renders the pre-hydration DEFAULT config
  because config hydration in the construct→arm gap is dropped. Cure: one honest replay
  (`inst.update(getCfg())` after `inst.arm()` at `:214`, or `immediate:true` on the `:228`
  watch) — a producer fix; value.js consumes at adopt. The ARRIVAL-ORDERING half (background vs
  blob vs hero) is demo choreography over the (now-correct) seed.
- **T-26 variance bracket (muted↔strong)** — **producer, the sizing spec.** Root = the L2 door
  is closed AND the derive muffles: `hueSpread` fixed at 28 with no consumer knob; bell
  `chromaEasing` desaturates ramp extremes (`color.ts:271-283`). Cure: L2 opens the door
  (`hueSpread` + a cross-stop chroma-variance atom + `lightnessScheme`) AND A3 sizes the ranges
  so the field can read STRONG presence with visibly greater C/H variance while staying subtle —
  the bracket (analogous/0.7 too muted ↔ triad/0.82 too strong) becomes the atom's range spec.
- **T-27 "too gray / slow / jittery"** — **joint.** GRAY: the per-pick field transition can
  cross low-chroma if it interpolates through gray; the aurora ramp's bell-desaturated extremes
  compound it (producer-contributory). SLOW/JITTERY: duration/curve + rAF paint pacing — largely
  demo, but the aurora `frameLoop.ts` master-tempo + PRM gate are the producer levers. Cure:
  a chroma-preserving transition path (demo) + confirm the derive doesn't sink chroma at the
  band edges (producer, ties to T-26).

### Blob (T-8, T-28)
- **T-8 blob morphing / z / no-clip / placement / all-sizes** — **joint (engine=producer,
  placement/z/clip=demo).** Producer engine work LANDED (affect registers + pointer truth
  `985525b2`; SDF `hitTest` for the corner-break click-through). The satellite morphing depth
  is the L5 co-rebuild's remaining engine surface. The "no clip outside bounds / higher z /
  into the card / down-left / all screen sizes" is demo composition CSS over the exported HERO
  preset. Note the L5 single-engine collapse (drop `metaball.wgsl`) is still owed.
- **T-28 watercolor-dot outline too fine / abrogate** — **demo, primitive ALREADY EXISTS.**
  WatercolorDot ships a **`ghost` variant** (`WatercolorDot.vue:36-45`) that traces the SAME
  seeded organic `border-radius` silhouette as a dashed border — the correct organic-edge
  outline. The owner's "too fine, obscures the dot" is a demo active-ring recipe (a fine
  circular ring) NOT using the ghost/organic silhouette. Cure: re-home the active outline onto
  the producer's seeded-silhouette recipe (or abrogate the ring), so it hugs the wet edge.

### Cards / neutrals (T-3, T-11, T-13, T-18, T-24)
- **producer levers RICH, demo application inconsistent.** The tier/tint/depth system:
  `--glass-bg-${tier}`, `--glass-tint-source` (default `var(--card)`), `--glass-tint-strength`
  (default 0%), `--glass-tint-ink`, `--glass-depth` LERP per tier (content 0.35 / popover 0.7 /
  menu 1, `tokens/glass-deep.css:119-125`), `cartoon-surface` utility. "Too transparent" =
  the demo card sits on a low-α tier / 0% tint; "more cartoon like the picker card" = compose
  `cartoon-surface` + raise the tier. The **producer question**: is the default Card alpha floor
  too low for a legibility floor? (A2's muted-ink rung fails 1.42:1/1.50:1 — a producer FLOOR
  ask, F2.R1, paint-PENDING.) T-24's neutral-consistency audit is chiefly a DEMO discipline of
  applying one tier ladder — the producer already provides it.

### Dropdowns / select / tabs / search (T-12, T-17, T-20, T-29)
- **T-17 dropdowns with colour previews** — **demo** (compose swatch into SelectItem) over the
  producer Select. **T-29 pseudo-dropdown clipped at edges** — **producer-candidate**: an
  overflow/portal clip on Select/Popover content; L11's dropdown-menu glass tokens + a portal
  overflow audit is the producer surface (verify SelectContent teleport + `--dropdown-menu-*`).
- **T-20 tabs fill space / no gap / proper pilling** — **demo, primitive EXISTS.** SegmentedTabs
  `layout:"full"` arms the LIQUID TAB (full-width equal-fill pill, `SegmentedTabs.vue:101`); the
  base `ui/tabs/TabsList` is `inline-flex justify-center` (content-width, NOT fill). Cure: the
  demo consumes `layout="full"` (or the producer confirms the full-layout pill is gapless).
- **T-12 search styled inconsistently** — **demo** (the Search primitive `/search` exists; the
  demo search area must adopt the same glass tier as its siblings).

### Motion / easing (T-14, T-22)
- **T-14 card transitions onto liquid-glass curves** — **demo, tokens EXIST.**
  `--spring-snappy/-smooth/-bouncy` (+`-duration`) + `--ease-cartoon-punch` ship
  (`transitions.css`, the F5.4/DR work). Cure: the demo's card transition families adopt these
  house springs uniformly. **T-22 easing area "still a mess"** — the EasingPicker/Configurator
  surface (L7) re-audit + the demo easing pane layout.

### Dock (T-5)
- **T-5 vertical dock-like ring + glass-card hierarchy around the sliders** — **joint.** The
  producer ships the dock rail primitives (`dock.css`, the rail-reinvent `82661310`) and the
  glass-card tiers; the RING encapsulating the letter column is a demo composition, but if it
  needs a producer rail variant that is a request packet (cf. the S-3 letter-rail ask). L8's
  `clampLabel` (OPEN) is the standing dock-select producer gap.

---

## §4 — Producer disposition vs delivery (the honesty ledger)

The producer's `652f58e8` §Reply dispositioned all 18 asks. **Delivery ≠ disposition** for the
component batch:

- **Same-day delivered (real):** L1, L18 (`d03579a1`), the aurora GLSL gate (`8dcb033d`). L3
  (`b01d0556`). L5 satellite-shade + affect/pointer (`5df908ae`/`985525b2`). These are genuine.
- **Fold-claimed but NOT delivered:** L6/L8/L9/L11/L13/L14/L16 were "folded onto W-DESHADCN" —
  but `BG.W-DESHADCN` (`6dddda04` DONE) is the **tailwind-v4 / no-shadcn-default 233-file sweep**
  (`0078e508`), a DIFFERENT scope. The specific L-item fixes verified **absent** in source
  (L6 no border-w token, L8 no clampLabel, L9 no skeleton seams, L11 no dropdown tokens, L16
  prefix split intact). **T packets must re-ask these by-name** — the fold routed them to a wave
  whose landed scope did not include them.
- **Paint-verify lag:** A1/A2 (F2.R1) source-landed, dual-engine **PENDING**. The BG discipline
  separates source-land (`[paint-pending]`) from dual-engine DONE; several T-relevant surfaces
  sit in the pending band. value.js should consume only the DONE-verified surfaces, and the
  adopt-event must re-check the pending set.

---

## §5 — What the T corpus should carry forward (spec-grade, for the request packets + folds)

1. **A producer request PACKET (E-2) re-asking, by-name, the undelivered component batch:**
   L2 (the T-26/A3 sizing door — highest leverage), L6, L8 (5th booking — escalate), L9, L11,
   L16, L20, plus the paint-close of A1/A2 (F2.R1) and A6 (dist unprefixed-leg). Each cites the
   current-tree file:line above.
2. **GAP-ARM (A7) as a hard producer ask** — it is user-visible on prod; the one-line replay
   fix is known; it is the producer root of T-1/T-25. Should not ride the slow batch.
3. **L17 rename + L20 config subpath as the 5.0.0 adopt-event payload** — both gate the value.js
   `/goo-blob → /blob` migration and the JS-eager RP-2 re-baseline.
4. **The DIST-rebuild discipline (G-CUR-1)** folded into the T consume/adopt lane: any wave that
   depends on a landed producer fix MUST rebuild glass-ui first; the consumed dist is a stale
   local artifact, not the version label.
5. **The three "primitive-already-exists" T findings (T-28 ghost outline, T-20 full-layout tabs,
   T-14 liquid tokens) are DEMO-adoption lanes, not producer asks** — route them to the demo
   waves with a citation to the existing producer surface, avoiding a redundant packet.

---

*Method note:* every state above is verified against the live `../glass-ui` tree at
`19ddbd71` (source) + the `2026-07-05 21:41` dist, with `file:line` / dist-grep / git-log
evidence inline. The finer P2 items marked "verify" (L7/L10/L13/L14) warrant a dedicated
component-level re-audit inside a T packet; this lane establishes the LEDGER + the disposition
honesty check, not the exhaustive per-component diff.
