# t-load-sync — T-1: the cold-load arrival choreography (design lane, Fable)

**Mandate row**: T-1 — "The synchronization between the various items — background, blob,
hero titles, etc — does not seem to be right. On page load in particular." [t-1959-21]
**Method**: live frame-by-frame cold-load probes at tranche-t HEAD against a private vite
on `:9337` (`VITE_API_URL=http://localhost:59999`, the owner's `:9000` untouched). CDP
screencast (png, per-frame timestamps) + an injected arrival log (paint entries, DOM-mark
MutationObserver, `document.fonts`, 120ms computed-style samples). Eight runs: 4 headless
(the π-gate vehicle, `"css"` substrate) + 4 HEADED on the real GPU (`"webgl"` — the
owner's path): warm-returning light, warm-returning 6× CPU-throttled, true-first-visit,
warm-returning dark. Warm runs primed with `oklch(70% 0.2 150)` (green) so every
default-vs-derived divergence is chromatically unmissable. Frames + logs regenerable via
the scratchpad harness (`coldload-probe.mjs`); the archived record consulted at
`docs/tranches/S/audit/pi/w6-{before,after}/cold/` + `w6-after/DELTA.md`.
**Owner shot**: `t-1959-21.png` — the Lab picker header mid-load: title + readout inked in
the red/default register over a warm field while the blob bead sits already-arrived at the
corner. The shot is one instant of the smear characterized below.

---

## §1 The measured choreography (headed, real GPU, 1440×900)

### 1.1 Warm-returning · light · normal CPU (`H-warm-light`)

| t (ms) | arrival | clock family | register |
|---|---|---|---|
| 0–30 | compositor white → flat olive ground (`--saved-bg` `#6e7400`, the persisted GREEN-derived base stop) | pre-paint (index.html inline) | correct material, instant |
| 181 | card + dock + title DOM mount; plate-land begins (440ms spring-snappy); About slot still empty | Vue mount | title arrives **PINK-inked** (the pre-hydration default accent) |
| 285 | Fraunces lands → glyph swap on title + hero numbers | font network | FOUT **mid-plate-land** |
| ~331→423 | title ink morphs pink→green (`--duration-fast` color transition chasing the late token write); **About card POPS fully-formed** (its async chunk, no entrance); dock still mid nub→pill morph | Vue mount + chunk fetch | two grammars side-by-side |
| 508 | aurora arms (idle tick) → 450ms opacity fade of a **DEFAULT-PINK field** over the olive ground | idle clock B (`scheduleAfterFirstPaint`) | **GAP-ARM made visible** |
| 512 | blob canvas inserted → **POPS** (first GL frame appears; no arrival treatment) | idle clock A (`useIdleReady` + async chunk) | pop |
| ~700–760 | channel sliders finish the stagger; spectrum painted (beats 2–3 of the picker's orchestrated open) | Vue mount (+180/+220ms beats) | correct |
| ~1000 | aurora fade completes → **the page has turned pink**: default-pink atmosphere under an all-green UI (green spectrum, green sliders, green accents, green blob) over frame edges of olive ground | — | terminal state CONTRADICTS the seed |

Frame cites (probe archive): `f000_t1ms` (white) · `f002_t273ms` (olive ground + dock nub)
· `f008_t331ms` (pink-inked title, empty right slot) · `f016_t423ms` (green title, About
popped) · `f024_t531ms` (dock pill complete, spectrum fading in) · `f048_t776ms` (field
half-pink, blob popped) · `f072_t1034ms` (settled: pink field, green instrument).

### 1.2 Warm-returning · 6× CPU throttle (`H6-warm-throttled`)

Same actors, the smear stretches 0.1s → 3.6s **and the order reshuffles**: ground 107ms →
mount 1082ms → fonts 2179ms (**FOUT 1.1s after the title landed, on a settled title**) →
FCP 2304ms → blob 3078ms → aurora arm 3110ms (fade completes ~3.6s). Blob and aurora swap
arrival order vs 1.1 (both idle-scheduled — a race, not a sequence).

### 1.3 True first visit (`HB-first-visit`)

No persisted `--saved-bg` → the fouc-guard resolves `var(--saved-bg, var(--background))`
with style.css not yet parsed (dev serves CSS through JS modules): **white/blank to
~535ms**, then theme-paper ground + dock nub, DOM at 382ms but first-paint 579ms,
full UI pops ~820ms, aurora arm 873ms → fade to ~1.3s. GAP-ARM is invisible here — the
default seed happens to MATCH the default aurora config (self-consistent pink) — which is
exactly why the defect class survived every fresh-context gate: it is a
**returning-user** defect (same precondition class the `w6-before` README recorded for
the stale-persistence corruption).

### 1.4 Warm-returning · dark (`HD-warm-dark`)

Mount 271ms → fonts 410ms → aurora arm 686ms → fade to 1 at ~1150ms. The terminal state
is the worst of the four: dark cards + green seed settle under a **BRIGHT PINK light-band
field** — GAP-ARM (default palette) compounding GAP-L2 (no dark L-band atoms door; the
recorded producer gap row). The cold load reads dark-olive → light-pink: the W6-1
entrance clause ("no dark→light snap at load") is honored in EASING but violated in
DESTINATION — the fade's target material flips the page's scheme. Frames: `f021_t604ms`
(dark cards on olive, pre-arm) · `f077_t1199ms` (dark cards on bright pink).

---

## §2 Findings

### LS-1 — GAP-ARM is THE load-sync defect: the field arrives as the wrong material (CONFIRMED live, real GPU)

- **Evidence**: §1.1 frames `f048`/`f072` and §1.4 `f077` — the armed WebGL field fades
  in default-pink over a green-derived ground and green UI, every cold load. Code:
  glass-ui `useAurora.ts:262` (`createAurora(canvas, getCfg(), …)` — mount-time config
  snapshot) + `:228` (the config deep-watch wired only inside `armRuntime()`, no
  immediate replay) — every seed write landing in the construction→arm gap is dropped;
  the demo's hydration ALWAYS lands there (`useAtmosphere.ts:188-199` seed watch fires in
  setup; arm happens on the idle tick). Matches the standing row
  `docs/tranches/S/audit/w6-producer-gap-rows.md §GAP-ARM` bit-for-bit.
- **Root-cause**: producer arm-gap — the runtime arms against a stale snapshot and never
  replays the live config.
- **Owner**: producer (the fix is the recorded one-line class: replay `getCfg()` at arm —
  `inst.update(getCfg())` after `inst.arm()`, or `{ immediate: true }` on the deep-watch).
- **Cure direction (spec-grade)**: the T corpus encodes this as a REQUEST-PACKET row
  (E-2) with a **cold-load canvas-pixel acceptance probe on real GPU** (see LS-7), and
  the load-choreography wave is sequenced AFTER the producer cure or the S.W8 adopt —
  choreographing a wrong-material arrival is polishing a lie. No demo shim (E-3; the
  gap-row's no-workaround law stands).

### LS-2 — The demo's accent/token axis is hydration-blind on the first commit (the same gap class, demo-owned)

- **Evidence**: §1.1 — the title arrives PINK-inked at `f008_t331ms`, morphs to green by
  `f016_t423ms` (`ColorSpaceSelector.vue:170` `transition: color var(--duration-fast)`
  chasing the late token). Code order in `App.vue`: the pipeline (and with it the
  rAF-coalesced `opaqueFrameLatest`, seeded from the DEFAULT model —
  `useColorPipeline.ts:304`) is created at `:181`; the atmosphere/accent boot consumes it
  at `:221`; URL/storage hydration lands at `:298-299` — setup-LATE. The immediate
  watches in `useAtmosphereBoot.ts:69-75` + `useViewAccents` therefore write
  DEFAULT-pink tokens for the first commit; the rAF republish (green) lands a frame
  later and every ink surface recolors DURING the plate-land.
- **Root-cause**: two hydration orders — derived-token seeding is setup-early, model
  hydration is setup-late; the coalesced ref carries the pre-hydration default across
  the first commit.
- **Owner**: demo.
- **Cure direction**: **hydration-before-derivation as an ordering law**: the color
  pipeline's boot sequence is (1) resolve the seed — URL hash, else storage, else
  default — (2) THEN construct the derivation graph (coalesced ref seeded from the
  hydrated value), (3) THEN wire the token sinks; App.vue's setup order follows the law
  structurally (hydration lifted above `useColorPipeline`/`useAtmosphereBoot`, or the
  pipeline takes the hydrated seed as a constructor input). Nothing on screen may ever
  carry the default's color unless the default IS the seed. This is a transposition of
  the boot region, not a `flush` patch (E-3).

### LS-3 — Five independent clock families; the "choreography" is a smear with non-deterministic order

- **Evidence**: §1.1–1.2 measured clocks: (a) pre-paint ground 0ms (index.html inline);
  (b) Vue-mount 181ms — plate-land + beats (`ColorPicker.vue:312-326, 379-399`);
  (c) font network 285ms (normal) / 2179ms (throttled — FOUT on a settled title);
  (d) idle clock A — blob `useIdleReady` + async chunk, 512/3078ms
  (`ColorPicker.vue:124-125`); (e) idle clock B — aurora `scheduleAfterFirstPaint` +
  450ms fade, 508/3110ms (`App.vue:326-332`; glass-ui `useAurora.ts:81-114`). Clocks (d)
  and (e) swap order between runs 1.1 and 1.2 — a race. No two families share an origin,
  a curve, or a gate.
- **Root-cause**: W3-2's idle-deferral and W6-1's entrance were landed as LOCAL cures
  (each element defers/arrives correctly in isolation); no shell-level composition was
  ever specified — the page has entrances, not an entrance.
- **Owner**: demo (composition); joint for the two producer surfaces below (LS-5, LS-6).
- **Cure direction**: **ONE composed overture, ordered by gating, not by timing** — the
  target design in §3. Deferred WORK stays (W3-2 untouched: chunks fetch and GL arms on
  idle); deferred APPEARANCE is choreographed: every deferred element owns a reserved
  footprint from beat zero and MATERIALIZES through the house grammar when its work
  completes, gated so the beat ORDER is invariant under any CPU/network stretch.

### LS-4 — Sibling surfaces arrive in different grammars: bespoke plate-land vs pop vs morph

- **Evidence**: the picker card lands with the 3-beat orchestrated open
  (`ColorPicker.vue:379-399` plate-land 440ms; SpectrumCanvas `field-paint-in 420ms
  180ms` delay; `--stagger-base: 220ms` channel cascade). The About card has NO entrance
  — it pops fully-formed on its chunk-fetch clock (§1.1 `f008→f016`; PaneSlot's
  `<Transition>` has no `appear`, and the pane transition-name is empty/idle at first
  mount). The dock arrives as a collapsed nub at 273ms and springs to the full pill by
  ~531ms on glass-ui's `--dock-morph-t` clock (`Dock.vue:131` mounts `GlassDock`
  `:start-collapsed="false"`, yet the mount visibly morphs) — a third grammar.
- **Root-cause**: the entrance is a per-component property (one component got a designed
  open at R.W3; the others got whatever their mount/chunk/morph mechanics produce).
- **Owner**: demo (About/pane slots; the plate family); joint (the dock's mount-morph —
  either glass-ui exposes an "arrive expanded, no mount morph / join-entrance hook" or
  the demo gates the dock's reveal to the plate beat).
- **Cure direction**: **one arrival grammar, three voices**: every top-level surface
  (both cards, the dock) arrives through the SAME plate-land family with designed stagger
  offsets (the §3 beat sheet); in-card fills keep their existing beats, re-keyed to the
  shared timeline. `appear`-class entrances for pane slots so first-mount and view-swap
  speak the same motion language (T-14's liquid-glass curve audit applies to the same
  family — one curve set).

### LS-5 — The blob pops: no arrival pose exists at either half

- **Evidence**: §1.1 blob canvas inserted 512ms, first GL frame appears with no
  transition — glass-ui `GooBlob.vue` carries only a `filter` transition (`:358`), no
  entrance; the demo mounts it bare behind `v-if="blobReady"`
  (`ColorPicker.vue:66-70, 124-125`). At `f048_t776ms` it sits fully-formed,
  heavy, dark-forest-green at the card corner. Under throttle it pops at 3.1s — the last
  arrival, undesigned.
- **Root-cause**: the genesis brief's mood/emerge grammar exists for satellites
  (orbit/merge/absorb/emerge) but no BODY-ARRIVAL pose was ever specified; the W3-2
  deferral made the pop later, not designed.
- **Owner**: joint — the emerge pose is engine-side (producer, rides the L5 HERO-preset
  ask / `blob-genesis.md` grammar); the demo owns WHEN (the §3 ornament beat) and the
  reserved footprint (already law, `S.W4-2`).
- **Cure direction**: **the blob EMERGES, never appears**: a producer arrival pose
  (goo-scale from the card edge, the same smin-field grammar the satellites use;
  PRM = static first frame) triggered by the demo at the ornament beat — if the chunk
  lands early it WAITS for the beat; if late it emerges on completion through the same
  pose. Encode in the E-2 request packet alongside the T-8 hover/satellite work (same
  engine surface, one packet).

### LS-6 — Fraunces is a network actor inside the entrance (FOUT on the display voice)

- **Evidence**: `index.html:17-22` — Google-Fonts stylesheet, `display=swap`,
  non-render-blocking `media="print"` swap; fonts land 285ms (normal) / 2179ms
  (throttled) — the title + hero numerals visibly swap glyphs mid-plate-land (§1.1) or
  1.1s after settle (§1.2). The display voice (the brand's letterform) is the LAST thing
  to become itself on a slow network.
- **Root-cause**: third-party font on the network clock with `swap` semantics inside a
  designed entrance.
- **Owner**: demo.
- **Cure direction**: **the display face is present at the title's first commit**:
  self-host Fraunces (single variable-font woff2) + `<link rel="preload">` +
  `font-display: optional`-class behavior for the cold path — the overture never runs in
  a fallback serif. One face source, deterministic; the CDN dependency (also a privacy
  surface) retires. (Fira/Jakarta already ride the glass-ui corpus — same law.)

### LS-7 — The close-gate instrument is structurally blind to this defect class

- **Evidence**: `w6-after/DELTA.md` "vehicle honesty note" — headless Chromium resolves
  the aurora to the `"css"` substrate, where the placeholder consumes the always-live
  `resolvedPalette` (`useAtmosphere.ts:86-97`): the archived cold frames show a CORRECT
  derived green field and "no snap", while the real-GPU path pinks out (§1.1). My own
  headless runs reproduce the blindness exactly (aurora "arrived" at 225ms, correct
  colors, no arm fade). The headed annex verified `--saved-bg` tracking + field walk but
  never a POST-ARM canvas-pixel read — GAP-ARM sailed through the S.W6 close and W9
  books to the owner's eyes.
- **Root-cause**: the gate's vehicle (headless) exercises a different substrate than the
  judged surface; the honesty note recorded the difference but no compensating probe was
  mandated.
- **Owner**: demo (instrument spec).
- **Cure direction**: the T corpus's verification spec requires **a real-GPU headed
  cold-load probe with canvas-pixel assertions on the ARMED WebGL field** (returning-user
  precondition: primed storage + non-default seed), in BOTH schemes, as a standing e2e or
  gate annex — the `atmosphere-cold-load.spec.ts` returning-user arm extended from
  `--saved-bg` truth to FIELD truth. Choreography rows are additionally judged on
  screencast frames (order invariance under 6× throttle), not DOM timestamps alone.

### LS-8 — The dark cold load ends light (destination violates the W6-1 clause)

- **Evidence**: §1.4 — dark scheme settles under a bright pink light-band field
  (`f077_t1199ms`); GAP-ARM (default palette) × GAP-L2 (no dark L-band door —
  `w6-producer-gap-rows.md §GAP-L2`) compound. The entrance clause "no explicit
  dark→light snap at load" (S.W6 §46-49) is met by the EASING and defeated by the
  DESTINATION.
- **Root-cause**: two recorded producer gaps landing on the same frame; the clause was
  specified over the transition, not the terminal material.
- **Owner**: producer (both rows already recorded/dispatched); the T corpus re-states the
  law over the terminal state.
- **Cure direction**: restate W6-1's law as **material-invariance of the load**: at every
  cadence point INCLUDING t=∞, the page presents one material family derived from the
  hydrated seed in the active scheme. Acceptance = the LS-7 probe's dark arm (field
  luma-band + hue-family assertions post-arm).

---

## §3 The TARGET choreography — one overture, one clock family

The design (Fable register; consumes the house motion tokens — `--spring-snappy`,
`--spring-smooth`, `--ease-decelerate`, `--duration-*` — no new curves; T-14's easing
audit and this share one family):

**Laws**

1. **Hydrate → derive → commit** (LS-2): no surface ever paints a color the hydrated
   seed did not produce. The default is a seed like any other — never a flash.
2. **One material from t0** (extends W6-1): the ground IS the field's base stop; the
   field arrives as ITSELF texturing in over its own base (needs LS-1's producer cure);
   dark scheme = the dark-band material at every cadence point (LS-8). First visit inlines
   the DEFAULT seed's derived base as a build-time constant in index.html (the ground is
   never `--background` theme paper, and never white — LS-3(a)/§1.3).
3. **Work defers, appearance composes** (LS-3): W3-2's idle mechanics are untouched;
   every deferred element reserves its footprint at beat time and materializes through
   the house grammar on completion. No element may pop.
4. **Order by gating, not by timing** (LS-3): each beat arms on the PRIOR beat's
   completion event (animationend / isArmed / chunk-resolved), so throttling stretches
   the overture without reshuffling it. Racing idle callbacks cannot reorder the page.
5. **PRM collapses the overture to instant states** (existing law, kept).

**The beat sheet** (normal-CPU targets; every offset a token on one shell-owned timeline
— `--overture-*` custom properties written once at the App/useAtmosphereBoot level, so
DevTools shows ONE clock):

| beat | element | grammar | target |
|---|---|---|---|
| B0 · ground | body ground (saved/default derived base stop) | pre-paint, instant | 0ms |
| B1 · plates | left card + right card + dock — ONE plate-land family, staggered (dock +0, left +40ms, right +120ms); dock arrives AS the pill (no mount nub-morph — LS-4) | plate-land 440ms `--spring-snappy` | 180–740ms |
| B2 · field | aurora derive-in over its own base, gated on `isArmed && B1-complete`; `"css"` substrate: present from B0 | 450ms `--ease-decelerate` | complete ≤1.2s | *[SUPERSEDED-AT-HARDENING: this B2 row carried the CURRENT fade; the doctrine adopts the t-aurora-boot §2.1 re-cut — 0.9s `--ease-decelerate`, gate re-cut to `isArmed ∧ dock-plate-landed` (620ms), settle ≤1.6s (bracket [1.4, 1.7]s, Q2 annex). B0/B1/B3/B4 remain adopted verbatim — h-refine-doctrine F-2 + h-refine-overture F-6.]*
| B3 · instrument | spectrum field-paint-in + channel stagger (existing beats, re-keyed to the shared timeline) | existing | ≤1.0s |
| B4 · ornament | blob EMERGES at the card corner (producer pose, LS-5); early chunk waits for B4, late chunk emerges on arrival | goo-emerge ~500ms | ≤1.5s |

Fonts are struck from the timeline entirely (LS-6): the display face is present at B1 or
the title does not yet ink (never a fallback-serif commit).

**Ownership**: demo — the shell timeline + beat gating, hydration ordering, pane-slot
`appear` grammar, font self-hosting, first-visit ground constant; producer (request
packets, E-2) — GAP-ARM replay-at-arm (recorded), GAP-L2 dark band (recorded), the blob
emerge pose (new, rides the T-8/L5 packet), the dock arrive-expanded hook (new, small);
joint — the LS-7 real-GPU acceptance probe guards the whole.

**Interactions folded**: T-14 (same curve family), T-8 (blob packet shares the emerge
surface), T-23 (the header's at-rest shading joins B1's dock voice), W3-2/W6-1 (both
PRESERVED and composed, per the S.W6 §46 rider: "a designed entrance, never a reverted
deferral").
