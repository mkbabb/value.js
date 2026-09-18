# PD-FRONTEND — THE FRONTEND PROGRAM (armB, independent Fable formation) — 2026-07-19

Tree pins (G0′): value.js `tranche-u@db77dbd8` (4.0.0) · keyframes-v-exec `master@0dac636b`
(6.0.0, kf pins value EXACT 4.0.0) · glass-ui `master` 7.0.0 (advances fast — RE-PIN AT READ).
Canon: L1 (ingestion prompt) + L2 (packets P0–P6) + CONVERSATION-ADDENDA (C1–C23; addenda WIN
where they tighten). Evidence: armB sweeps (`sweep-value-demo.md`, `sweep-kf-demo.md`,
`sweep-probe.md`, `sweep-backtrace.md`); probe evidence set A at `fable-era/probe/`.
Formation phase only — NO source edits land from this document (L1 §0; phase labels per §7 law 4).
Independence firewall honored: zero Codex-corpus reads.

---

## 1. CHARTER

This program perfects the two demos as PRODUCTS: the value demo by refinement (the owner: "the
extant UI is quite good" — details, errors, curves, the little things), the kf demo by overhaul
(C4: a proper single-screen application a la value, multi-touch everywhere, mobile-first with
desktop affordances). It terminates shadcn residue in both apps (C5), gives both robust
URL-state + share (C6), and suffuses the glass-ui BREATH OF LIFE canon (C10; the 13 named
principles) into every screen of every app (C22), with a π/DELTA capture pair for every visual
claim and born-RED gates wherever the defect is live on disk today. Glass-ui-level needs are
never edited directly: they become named gap-prototype waves specced in glass idiom, batched and
relayed per the standing law. Design quality over checkbox coverage; probe parsimony in every
gate; KISS in the wave cut — 18 waves, nothing load-bearing dropped.

## 2. PROGRAM LAW (binds every wave)

- **PL-1 · Thrice (C20/L1 §8):** every wave's design artifact rides 2 Fable skeptics + 1 Fable
  adjudicator; convergence = two consecutive clean passes; ≤3 iterations then owner escalation.
- **PL-2 · Probe parsimony (C21 + the standing edict):** bounded capture matrices at two named
  viewports (390×844, 1440×900); evidence set A frames are the "before" images wherever they
  exist — no re-shooting what is already shot; batched probe runs (per-wave budgets stated);
  no dev-server marathons; fastidious static analysis first.
- **PL-3 · π/DELTA:** every visual claim = (before capture id, after capture id, one-line
  verdict); unpaired claims block wave close; the DELTA ledger (F-18) is the terminal registry.
- **PL-4 · Glass relay (L1 §4 + the BH-relay fond):** zero direct glass-ui edits from this
  program; every glass-level need lands as a precept-compliant wave addendum in glass idiom on
  the F-09 gap register, released as a BATCH to the glass BH inbox once swaths are isolated.
- **PL-5 · Terminal dispositions (L1 §7):** every audit-ledger row ends folded / banked (named
  re-trigger) / retired (rationale); a mark that rode ≥2 closes un-decided is tagged DISEASE and
  deciding it is a wave-level act. Counting a partial as done is the close-class lie.
- **PL-6 · Model honesty (P0.1/C17):** every seat reports the model actually serving it;
  a declaration is not execution. Formed-tranche execution is all-Fable (L1 §0); Opus is
  eligible ONLY for the mechanical sweeps flagged below AND only under per-tranche owner
  ratification.
- **PL-7 · Refinement law (C10):** value demo work is refinement, never rebuild; kf demo work
  may restructure but core features are never lost (machine-checked where a surface exists).
- **PL-8 · No shims, no dual paths (L1 §7):** stopgaps (the ActionBarLayer local
  `useLayerTransition`) retire on adoption; migrations move the consumer, not the compat layer.

---

## 3. THE WAVE SET

### F-PD-frontend-01 | value.js | THE VALUE EVERY-SCREEN AUDIT (C22, value arm)
- **Intent:** the Aristotelian proportionality + affordance audit of all 15 routes (picker,
  palettes, browse, extract, mix, generate, gradient, atmosphere, blob, 5 admin) at both form
  factors — remove / afford / refine marks per screen. Consumes the pre-glass-7 carried-forward
  UI corpus NOW (L1 §1/§4; CARRY-LEDGER §F incl. the gh-pages prod-preview empty-mount as the
  first probe) and the demo-side palette-API client surface (C7 intersection, noted for the API
  program).
- **Deliverables:** SCREEN-LEDGER (route × viewport matrix, capture ids, file:line anchors per
  mark); DISEASE tags per PL-5; glass-gap rows routed to F-09; the refinement backlog feeding
  F-02/04/06/07/08/10.
- **Gates:** 15/15 routes × 2 viewports covered; every mark anchored + captured; probe budget
  ≤2 runs (one sweep per viewport). Audit wave — it MINTS the program's born-RED rows.
- **π/DELTA:** the matrix is the π base; set A frames 01–06 + `value-mobile-390-*` reused as
  before-frames.
- **Deps:** none (opens the program). **Routing:** Fable (design judgment throughout).

### F-PD-frontend-02 | value.js | C3 — THE MOBILE TOOLBAR RESTORED
- **Intent:** the 5-action toolbar (reset/copy/random/palettes/extract) is buried below `lg`
  behind an icon-only layer-swap trigger (the "lost toolbar"). Restore it as a first-class
  mobile affordance, designed against the dock's 312px aperture constraint; dock-to-card
  growth + edge squish-stretch (principle 6) is the named motion vocabulary.
- **Deliverables:** thrice-converged design (both candidate forms per OD-5) then implementation;
  retirement of the kebab-burial as sole path; any GlassDock-level need → F-09 gap row.
- **Born-RED (live today):** at 390×844 no persistent tool affordance exists; the 5 actions
  require the icon-only Tools trigger swap — anchors `Dock.vue:71,132,182-204`,
  `ActionBarToggle.vue:82,96,103`, `ActionToolbar.vue:1-62`, `ActionBarLayer.vue:100-143`.
  RED = set A `04-value-mobile-home-390` (toolbar absent) + `05-…-kebab-menu` (the dropdown
  surrogate). GREEN = tools reachable in ≤1 obvious gesture with visible affordance, no burial.
- **π/DELTA:** before = set A 04/05; after = same-viewport captures; desktop non-regression vs
  `02-value-desktop-toolsbar-open-1440`.
- **Deps:** F-01; F-09 iff GlassDock change needed. **Routing:** Fable.

### F-PD-frontend-03 | glass-ui (spec+prototype) | C2 — EASINGPICKER COMPACT/HIGH-RES REDESIGN (named glass-gap prototype wave)
- **Intent:** the glass-ui `EasingPicker` draws unit-relative strokes (`stroke-width:0.035` of
  the box ≈ 10.6px at the 19rem seat) and quantizes drag to 3 decimals
  (`useEasingPicker.ts:162-163,191`; `EasingPicker.vue:396`) — the owner's "far too rounded, too
  large, low-res." Redesign in glass idiom: a compact/density-aware variant, screen-space
  hairline strokes (non-scaling-stroke or px-normalized), full-precision drag with display-only
  rounding, crisp specimen glyphs replacing the heavy `shape="cell"` pill chips. Magnetic
  overpull (principle 5) for handle drag past bounds.
- **Deliverables:** precept-compliant glass wave addendum (variant spec: density prop, stroke
  law, precision law per OD-4, specimen tile spec) + an isolated prototype (NOT landed in glass
  by this program — batched via F-09/PL-4).
- **Born-RED (live today):** `value-mobile-390-easing-editor.png` is the defect photograph
  (large rounded pill chips, low-res thumbnails, blobby curve). RED assertions: measured curve
  stroke ≥ ~8px at the 304px seat; drag emits 3-decimal-stepped control points.
- **π/DELTA:** before = `value-mobile-390-easing-editor/strip`; after = prototype captures at
  390 + 1440; stroke-px measurement recorded in the wave record.
- **Deps:** none for the spec; F-04 consumes; releases through F-09. **Routing:** Fable (deep
  design — this is an owner-marked centerpiece).

### F-PD-frontend-04 | value.js | C2 — THE EASING SEAT RE-FIT
- **Intent:** re-fit the demo seat (`GradientEasingEditor` + `EasingSpecimenStrip` +
  `EasingAuthoringStage`) to the redesigned picker: a real mobile size budget replacing the
  flat `min(100%, 19rem)` (`EasingAuthoringStage.vue:104-107`), zero-letterbox law kept, the
  three `:deep()` overrides shrunk to whatever the glass variant does not subsume.
- **Deliverables:** reworked seat components; override-surface reduction accounting.
- **Born-RED:** same photographic evidence as F-03, asserted at the seat level (no
  mobile-specific shrink exists on disk).
- **π/DELTA:** before/after 390×844 easing-editor pair; 1440 non-regression vs
  `03-value-desktop-gradient-1440`.
- **Deps:** F-03 (adopted variant), F-01. **Routing:** Fable.

### F-PD-frontend-05 | glass-ui (spec+prototype) | C10 — WATERCOLORDOT LIVES (named glass-gap prototype wave)
- **Intent:** hover animate/change + procedural beget are NET-NEW — no hover/beget API exists in
  glass `watercolor-dot` and every demo consumer passes static `color/seed/variant` (sweep §5,
  grep-proven). Design the living dot: engage-envelope hover (attack 40–60ms, t90 ≤150ms —
  principle 8), seeded procedural beget (offspring dots begotten from the parent's PRNG line),
  lull-filament idle (never falls to zero; CSS-only compositor breath; ZERO idle rAF —
  principle 9), Safari-honest (no per-frame SVG turbulence; paint-probe gates — principle 12);
  blur law compliance (fixed radii, layer-opacity animation — principle 11).
- **Deliverables:** glass wave addendum + isolated prototype: hover/beget API (props/events),
  idle breath, dose-column ruling per OD-6, perf-law compliance notes.
- **Born-RED (live today):** grep for hover/beget/spawn near every WatercolorDot site (glass +
  demo) = 0; dots are static.
- **π/DELTA:** after = interaction capture series (hover enter/exit, beget sequence) in both
  themes; idle-cost note (rAF dead at settle) in the wave record.
- **Deps:** none; F-06 consumes; releases through F-09. **Routing:** Fable (the breath-of-life
  canvas centerpiece).

### F-PD-frontend-06 | value.js | C10 — THE VALUE SUFFUSION (dots wired + slider-value watercolor styling)
- **Intent:** wire the living-dot behaviors at the ~20 consumer sites across 7 files (dock wax
  seal, ConsoleRail active-channel, SpectrumCanvas, mix, generate, eyedropper, empty-state,
  space selector, palette card surfaces); give the channel sliders' value readouts the
  watercolor-dot background treatment — today they are plain
  `<span class="channel-meter fira-code">` (`ComponentSliders.vue:84-86`).
- **Deliverables:** wired sites; the slider-value watercolor styling (thrice-converged design);
  removal of any local stopgaps the new API subsumes.
- **Born-RED (live today):** no dot backgrounds exist anywhere in the slider area; before-frame
  = `value-mobile-390-sliders-closeup` (plain numeric readouts 92.0 / 88.8 / 20.0 / 82.7%).
- **π/DELTA:** before = sliders-closeup; after = same frame; hover/beget captured at 3 sampled
  sites (one per consumer family — parsimony, not all 20).
- **Deps:** F-05. **Routing:** Fable.

### F-PD-frontend-07 | value.js | THE VALUE DETAIL PASS — curves, margins, paddings, EVERY screen
- **Intent:** discharge the F-01 refine backlog with the breath-of-life vocabulary:
  choreographed-never-batched (fade faster than stretch — principle 3), two-registers-two-
  intents (principle 7), momentum-marked curves (principle 4), the commit hard-cut
  (principle 10), the medium-recruitment dose column (principle 13). Refinement, never rebuild
  (PL-7).
- **Deliverables:** per-screen refinement commits mapped 1:1 to ledger rows; the demo
  MOTION-REGISTER table (which surface rides which register — gesture-scrubbed critically-
  damped vs fired underdamped).
- **Gates:** every F-01 refine row terminal per PL-5; the born-RED rows F-01 minted close GREEN
  with capture pairs; zero rows silently partial.
- **π/DELTA:** one before/after pair per ledger row, batched into ≤3 probe runs.
- **Deps:** F-01; sequenced after F-02/04/06 land. **Routing:** Fable.

### F-PD-frontend-08 | value.js | C5 — SHADCN TERMINAL ABROGATION (value)
- **Intent:** shadcn is already component-abrogated in the value demo (zero shadcn
  implementations remain); finish it terminally: dissolve `demo/ui/` (19 one-line re-export
  barrels, 48 import sites → direct `@mkbabb/glass-ui` imports, unifying the 48-barrel/79-direct
  two-track inconsistency); delete the stale root `components.json` (dead `demo/@` path + Sass
  ref — a live shadcn scaffold config on a shadcn-free repo); close the 4 reka-ui
  `AcceptableValue` type leaks (MixConfigBar:15, GenerateControls:33, AuroraPane:25,
  GradientVisualizer:28) via a glass-exported type (F-09 gap row); retire the ActionBarLayer
  local `useLayerTransition` shim on glass adoption (PL-8).
- **Deliverables:** barrel dissolution + import unification; deletions; leak closures; shim
  retirement.
- **Born-RED (live today):** `demo/ui/` exists (19 files); `components.json` exists at root;
  `grep 'from "reka-ui"'` in demo = 4. GREEN = all three greps zero + typecheck/build green +
  one boot capture proving no visual regression.
- **π/DELTA:** non-visual — build gates + the single boot capture.
- **Deps:** F-09 (type export + public layer-transition composable) for the last two items;
  barrel dissolution independent. **Routing:** the import rewrite is mechanical —
  Opus-ELIGIBLE under per-tranche owner ratification (L1 §0/PL-6); Fable-directed by default.

### F-PD-frontend-09 | glass-ui (spec/relay only) | THE GLASS GAP REGISTER + RELAY VEHICLE
- **Intent:** the standing vehicle for every glass-level need this program surfaces, per the
  batching law (L1 §4: release only once swaths are isolated and precept-compliant wave addenda
  written — the working glass agent is never interrupted piecemeal) and the BH-relay fond.
- **Deliverables:** the gap register, opening rows: (a) `AcceptableValue`-equivalent exported
  type; (b) public layer-transition composable (the glass-7 removal behind ActionBarLayer's
  shim); (c) EasingPicker compact variant (from F-03); (d) WatercolorDot living API (from
  F-05); (e) any GlassDock aperture need from F-02; (f) audit-sourced rows from F-01/F-11.
  Every row a named prototype or spec in glass idiom; ONE batch relay letter to the glass BH
  inbox.
- **Gates:** zero direct glass-ui edits from this program (PL-4, machine-checkable: no commits
  touch glass-ui); every gap row has spec-or-prototype; relay released as a batch after
  F-01+F-11 complete (or early per OD-2).
- **π/DELTA:** prototype captures travel with their source waves (F-03/F-05).
- **Deps:** fed by 01/02/03/05/08/11. **Routing:** Fable (spec authorship).

### F-PD-frontend-10 | value.js | C6 — URL STATE + SHARE, WHOLE-APP (value)
- **Intent:** the share facility exists but encodes ONLY `{space, color}` (`useColorUrl.ts`;
  share = `copyLink(window.location.href)`, App.vue:365-366). Build the general per-pane
  URL-state facility: palette slug, gradient stops+easing, mix inputs, generate config —
  human-readable params, schema-driven codec colocated per pane owner; hash mode kept (GH
  Pages); the generation-guard/debounce pattern extended, back/forward semantics preserved.
- **Deliverables:** URL-state schema + codecs; share flow emitting full state; boot-seed
  precedence (URL > localStorage > default, hydrate.ts law) extended coherently.
- **Born-RED (live today):** reproduction — author gradient stops, copy the share link, open
  fresh: stops LOST (only color+space survive). That reproduction script is the RED probe.
- **π/DELTA:** the round-trip probe RED→GREEN; one capture pair for the share affordance.
- **Deps:** F-01 (which panes carry shareable state is a ledger output). **Routing:** Fable
  (schema design); codec implementation Fable.

### F-PD-frontend-11 | keyframes.js (mode per OD-1) | C22 — THE KF EVERY-SCREEN AUDIT + MARKS FOLD
- **Intent:** the kf mirror of F-01: 7 scenes (home/cube/amiga/square/easing/spring/sequence) ×
  2 form factors + the chrome (docks, drawer, share, shortcuts modal); consumes the 15-row
  glass-§7 marks register (kf FOLD-FORWARD) and the sweep findings; certifies kf's C5 state
  (ZERO shadcn/reka runtime imports — already done; the gate makes it a certified fact, not a
  belief).
- **Deliverables:** kf SCREEN-LEDGER with capture ids INCLUDING the first kf desktop captures
  (the probe sweep's named un-shot gap — desktop claims are currently code-grounded prediction
  only); remove/afford/refine marks with anchors; DISEASE tags; C5-kf certification row.
- **Gates:** 7 scenes × 2 viewports covered; kf desktop captured (closes the named gap);
  every marks-register row dispositioned into F-12..16 or banked; `grep 'from "reka-ui"'` = 0
  certified.
- **π/DELTA:** before frames = `kf-mobile-390-landing` / `kf-mobile-390-animation-list` + the
  new desktop base set.
- **Deps:** none; OD-1 rules execution mode for the whole kf series. **Routing:** Fable.

### F-PD-frontend-12 | keyframes.js | C4a — THE MOBILE STAGE CURE
- **Intent:** cure the live render defect: at 390×844 the cube overflows the viewport
  bottom-right and the hero copy overlaps the cube body (set A, both frames); add
  `viewport-fit=cover` — missing repo-wide while NINE `env(safe-area-inset-*)` consumers exist
  (`layout.css:82,94,115,132,203` + stage split), so every notch/home-indicator inset silently
  resolves to 0 on iOS.
- **Deliverables:** viewport meta fix; stage/hero reconciliation (the `layout.css:180` band
  system vs the cube's 3D bounding box at narrow widths); safe-area re-verification.
- **Born-RED (live today):** `kf-mobile-390-landing.png` = the collision photograph;
  `grep -r viewport-fit` = 0. GREEN = no subject/copy intersection at 390×844; insets live on
  an iOS-profile emulation capture.
- **π/DELTA:** before = the two set A kf frames; after = same viewport; one safe-area emulation
  capture. Registry note: the `@supports not (height:100dvh)` 100vh fallbacks are RETIRED-OK
  (correctly gated legacy path — rationale recorded, no wave).
- **Deps:** F-11. **Routing:** Fable (the meta one-liner rides the wave; no separate sweep).

### F-PD-frontend-13 | keyframes.js | C4b — MULTI-TOUCH EVERYWHERE
- **Intent:** the cube's quaternion orbital facility is the reference implementation and is
  COMPLETE (pinch scale+pan+Z-twist, Safari gesture events, de-jumped pinch exit, inertia,
  axis-lock — sweep §3); every other animation scrubs single-pointer via `useDragScrub`
  (`:112-134`). Extract the gesture core into a shared module and give square, sequence (×2),
  spring, and easing scenes genuine multi-touch — with per-scene gesture SEMANTICS designed
  (what pinch/twist MEANS per scene), not merely wired.
- **Deliverables:** shared gesture module (colocation-correct home); the per-scene semantics
  table (thrice-converged design artifact); upgraded scenes; inertia where meaningful; cube
  non-regression.
- **Born-RED (live today):** `useDragScrub.ts` is single-pointer (`setPointerCapture` + one
  `pointermove`); a two-finger gesture on the square scene is inert.
- **π/DELTA:** one gesture capture series per upgraded scene (mobile viewport, bounded); cube
  non-regression capture.
- **Deps:** F-11, F-12 (stable stage first). **Routing:** Fable (gesture semantics are design).

### F-PD-frontend-14 | keyframes.js | C4c — SINGLE-SCREEN APP MATURATION + DESKTOP AFFORDANCES
- **Intent:** kf is already a single-screen glass-native SPA; mature it a la value and glass:
  per-scene `document.title` (today static "keyframes.js"), scene-navigation affordances,
  desktop dock/anchor polish (the `@supports (anchor-name)` tether system is the reference the
  mobile app must reach — C4 "optimized for desktop affordances too"), chrome hierarchy taking
  deep value/glass inspiration.
- **Deliverables:** per-scene titles (incl. on share-restore, with F-15); navigation/affordance
  refinements from the F-11 ledger; the desktop polish pass.
- **Born-RED (live today):** no per-scene title code exists (grep-proven); GREEN = title tracks
  scene + restored state.
- **π/DELTA:** desktop before/after against the F-11 desktop base; one mobile chrome pair.
- **Deps:** F-11, F-12. **Routing:** Fable.

### F-PD-frontend-15 | keyframes.js | C6 — HUMAN-READABLE URL STATE + SHARE (kf)
- **Intent:** replace the opaque `?state=` blob (`btoa(encodeURIComponent(JSON.stringify(…)))`,
  `hashSharing.ts:6-9`) with human-readable per-facet params (scene already in path;
  controls/options as legible params), preserving the existing robustness (try/catch decode,
  `isValidState` shape guard, initial-nav-only restore, vue-router-5 guard-return idiom);
  SharePopover updated; title-on-restore with F-14.
- **Deliverables:** readable codec; SharePopover update; restore path; old-link posture per
  OD-3.
- **Born-RED (live today):** the share URL is one opaque base64 blob; no per-facet legibility.
- **π/DELTA:** round-trip probe (share → fresh open → state restored) RED→GREEN; a URL
  legibility sample recorded in the wave record.
- **Deps:** F-14; OD-3. **Routing:** Fable.

### F-PD-frontend-16 | keyframes.js | THE KF DETAIL PASS — curves, margins, paddings, EVERY screen
- **Intent:** C10's "both demos" clause: the breath-of-life refinement of kf's screens —
  curves/paddings/margins, proportionality, motion-register discipline (kf is already
  glass-native, so this is refinement); the fixed-px caps pass (`--header-items-max-w:500px`,
  `--dock-panel-width:17rem`).
- **Deliverables:** ledger-mapped refinements; the kf MOTION-REGISTER table (two-registers law).
- **Gates:** every F-11 refine row terminal per PL-5; capture pairs per row.
- **π/DELTA:** per-row pairs batched into ≤3 probe runs.
- **Deps:** F-11..15 (rides last in the kf series). **Routing:** Fable.

### F-PD-frontend-17 | value.js | W53 — THE PERCEIVED-SPACE PLATE REBUILD (inherited vehicle)
- **Intent:** the named V-PRIME vehicle and the SOLE connection for any gamut-viz restore
  (L1 §4; P2.2 row 14: R-BOUNDARY is gated on THIS wave's actual needs). Rebuild the
  perceived-space plate against the restored color facilities; its needs-memo is the
  unblocking artifact deciding whether the sibling color program pulls R-BOUNDARY.
- **Deliverables:** the rebuilt plate; the needs-memo to the color program
  (pull/don't-pull R-BOUNDARY, with evidence).
- **Gates:** BLOCKED on the sibling color program landing R-DELTAE + R-GAMUT (cross-program
  dependency, explicit); plate visual gates minted born-RED at unblock time from the F-01
  ledger's plate marks.
- **π/DELTA:** plate before/after at both viewports.
- **Deps:** F-01; EXTERNAL: color program R-DELTAE/R-GAMUT. **Routing:** Fable.

### F-PD-frontend-18 | program (docs) | PROGRAM CLOSE — THE DELTA LEDGER + ZERO-DROP CERTIFICATION
- **Intent:** the close: every visual claim in F-01..17 paired (PL-3); every ledger row
  terminal (PL-5); the §5 landing map re-checked against L1/L2/addenda; the F-09 glass batch
  released; probe-budget accounting proving PL-2 was honored.
- **Deliverables:** the DELTA ledger (claim → capture pair → verdict); the residual register;
  the owner-decision sheet with recorded outcomes.
- **Gates:** zero unpaired visual claims; zero silent partials; zero un-dispositioned rows.
- **Deps:** all. **Routing:** Fable.

---

## 4. OWNER-DECISION DOCKET

| ID | Decision | Tension | Default |
|---|---|---|---|
| OD-1 | **kf demo execution mode** for F-11..16: (a) explicit owner grant for direct edits from this value-owned program, or (b) specs + bounded dispatches into kf's coordination inbox for the kf successor | C4 (addendum, WINS on scope) pulls the kf demo in-scope; P4.5 keeps kf demo/UI kf-owned and requires an explicit grant for cross-repo edits | (b) per protocol; single-program coherence argues (a) |
| OD-2 | **Glass batch release timing**: hold the F-09 relay for the full F-01+F-11 batch, or early-release the two centerpiece rows (EasingPicker, WatercolorDot) that gate four waves | L1 §4 batching law vs the critical path of F-03/04/05/06 | hold for the batch; early-release only the two centerpiece rows if the owner accepts the interruption cost |
| OD-3 | **kf old share-link posture** when `?state=` goes readable: hard cut (old links → home) vs a single-release decode-only reader (reads old, writes only new) | no-dual-paths edict (L1 §7/PL-8) vs link continuity | hard cut (edict-conformant); surface because real shared links die |
| OD-4 | **EasingPicker precision law**: full-float drag with display-only rounding vs an author-grid snap (with modifier-key bypass) | the "low-res" mark condemns 3-decimal stepping; some authors want snapping | full precision + display rounding; snap only as an explicit modifier |
| OD-5 | **C3 form**: persistent second-band mobile toolbar (costs vertical space) vs a redesigned one-gesture dock surface (keeps one band) | screen economy vs first-class affordance — owner marked this personally | thrice loop delivers both candidates; owner picks at the design gate |
| OD-6 | **WatercolorDot dose-column class** (principle 13): dots = substrate (NO medium recruitment, per the glass law) vs a whisper halo on hover | the perf/dose law leans NONE; the breath-of-life ask leans whisper | substrate-by-law, whisper-on-hover only if the glass agent ratifies the exception |

---

## 5. THE LANDING MAP (zero silent drops — every relevant row, cited)

**Addenda:** C2 → F-03/F-04 (+OD-4). C3 → F-02 (+OD-5). C4 → F-11..16 (+OD-1; sweep tempers
"mostly broken" to named defects — collision, insets, single-pointer scrub — all waved). C5 →
F-08 (value) + F-09 (named gap prototypes) + F-11 gate (kf certified already-done). C6 →
F-10 (value) + F-15 (kf, +OD-3). C7 → ROUTED to the sibling API program (STAY-at-/api per the
addendum's own reconciliation note; the demo-side client surface is audited in F-01 and handed
over). C8 → this program contributes 18 of the ≥50 mega-tranche waves. C10 → F-05/06/07/16 +
the 13 principles suffused via PL-* and wave vocabularies. C11 → demo-facing aspects land in
F-08 (barrel dissolution) + colocation checks inside F-01/F-11; library structure ROUTED to the
sibling structure program. C12/C13/C14 → ROUTED to the sibling parser/color programs (C13's
demo-facing zero-alloc consumption is exercised by F-17's plate). C16 → honored (isolation;
this file is the only write; zero Codex reads). C17 → PL-6 + per-wave routing notes; this seat
reports its served model. C18 → consumed (the backtrace sweep is an input; its D-rows land
below). C19 → ROUTED (parser program). C20 → PL-1. C21 → PL-2 + the 18-wave KISS cut. C22 →
F-01/F-11/F-18. C23 → this document IS the independent Fable frontend formation; the union is
the parent's act.

**L1:** §4 demo paragraph — Aristotelian audit → F-01/F-11; suffusion → F-05/06/07/16;
pre-glass-7 carried-forward corpus audited NOW → F-01 inputs (CARRY-LEDGER §F incl. the
prod-preview empty-mount first probe); recursive colocation → F-01/F-08/F-11 checks; glass
defect batching (never interrupt piecemeal) → F-09/PL-4/OD-2; W53 plate connection → F-17.
§7 edicts → PL-3/PL-5/PL-8 + born-RED gates throughout + phase labels (this doc = formation).
§8 thrice → PL-1. §9 return contract → F-18.

**L2:** P3.2 `demo/` row (KEEP as product; restructure; colocation; W53) → F-01/07/08/17.
P3.4 → ROUTED to the sibling gates program, with two named intersections honored here: the
DRIVEN a11y battery is KEEP-EARNED (no wave of mine may orphan it — F-18 checks) and W55 owns
the .github edit (no probe gate in this program touches CI). P4.5 → OD-1 + the F-11..16 mode
framing. P5 vehicles: W53 → F-17; W55 → routed note above; W56/SCI-1 → ROUTED (library);
kf FOLD-FORWARD 15-row marks register → F-11. P0.1 → PL-6.

**Backtrace (C18 output):** D1 → F-05/06/07/16. D2 → F-10. D3 → F-08/09. D4 → F-11..16 + OD-1.
D5 → ROUTED (parser program; noted: C14 un-tombstones BBNF — not a frontend matter). D6 →
F-02/03/04. F1–F3 mutations → ROUTED (library programs). F4 (api/ EXTRACT vs C7 STAY) →
ROUTED to the API program with the reconciliation duty named. The 13 principles → 1 (umbrella,
PL-7), 2 (glass-goal, F-09 spec language), 3/4/10 (F-07/F-16), 5 (F-03), 6 (F-02), 7 (the
motion-register tables, F-07/F-16), 8 (F-05), 9 (F-05/06 lull filament), 11/12 (F-05 + PL-2
probe honesty), 13 (OD-6).

**Value sweep:** conclusions 1–2 → F-08; 3 → F-02; 4 → F-03/04; 5 → F-05/06; 6 → F-10; the
stale `components.json` + ActionBarLayer shim → F-08 (+F-09 row b); the MEMORY.md `demo/@`
drift → recorded here as a stale-record note (downstream plans must cite the live flat tree).

**kf sweep:** viewport-fit + safe-area → F-12; 100vh gated fallbacks → RETIRED-OK registry note
(F-12); multi-touch cube-only → F-13; per-scene title + registry divergences → F-14; opaque
`?state=` → F-15; fixed-px caps → F-16; kf shadcn = zero → F-11 certification gate.

**Probe sweep:** evidence set A reuse → PL-2 + per-wave before-frames; the kf-desktop un-shot
gap → F-11 first capture obligation; the seat's Opus-served disclosure → PL-6 exemplar (its
code-grounded claims stand on file:line; its desktop predictions are demoted to
capture-required, which F-11 discharges).

## 6. RESIDUALS

- The value demo is ONE app (15 routes), not the multi-app MEMORY implies — C22's
  "every page of every app" resolves to 15 routes + 7 kf scenes + chrome; both matrices are
  finite and fully enumerated in F-01/F-11.
- kf desktop remains photographically unverified until F-11; no wave asserts a desktop visual
  fact before that capture lands.
- This program touches no CI, no .github, no glass-ui source, no `scripts/dev/dev.sh`, and
  lands no source edits in the formation phase.
