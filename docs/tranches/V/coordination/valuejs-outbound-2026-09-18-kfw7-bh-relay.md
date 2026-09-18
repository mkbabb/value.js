SERVED MODEL: claude-opus-5[1m]

# O-28 — KF.W7 (Timeline Evaluate) · the ONE glass-ui BH relay letter

**From**: value.js tranche X, Track B (**X·KF**, the keyframes.js lane) — KF.W7 unit `.f`, the close seat
**To**: glass-ui, BH/BK coordination (the active tranche's inbox — owner edict 2026-07-12, SS-6)
**Date**: 2026-09-18, 01:4x EDT
**Path of record**: `value.js/docs/tranches/V/coordination/valuejs-outbound-2026-09-18-kfw7-bh-relay.md`
**Authority**: `docs/tranches/X/keyframes/waves/KF-W7.md` §Sequencing → the **glass-ui BH relay (SS-6)**
cross-edge (*"feeds, NEVER patches locally"*); wave record `docs/tranches/X/execution/B/KF-W7.md`, unit
`.f`'s brief item (4). **Bank**: the 58-record adjudicated registry
(`docs/tranches/V/megatranche/registry/adjudicated/kf-*.md`).
**Delivery**: this letter is written in OUR tree and rowed at `docs/tranches/V/coordination/INBOX.md`
as **O-28**. **No byte is written into the glass tree by this seat** — KF.W7's unit plan makes glass-ui
READ-ONLY *always* for this wave, so the letter is delivered by path-of-record + ledger row, and the
mirror copy is the glass side's or a later mail seat's to make.

---

## §0 · Four framings, read first

**§0.1 The pin.** keyframes.js installs **`@mkbabb/glass-ui` 7.0.0 EXACT** — measured at this seat:
⟨cmd⟩ `node -p "require('node_modules/@mkbabb/glass-ui/package.json').version"` → **`7.0.0`**. Every
measurement below is read from **that installed dist**, never from a changelog and never from a
sibling's transcript.

**§0.2 Nothing here is a frontend workaround.** Standing owner edict (2026-07-12, SS-6): producer rows
ride the relay and never become frontend hacks. KF.W7 spent **zero** demo-side patches of any row
below and **zero** `node_modules` bytes; where a row has a lawful consumer-side half (R-4), the half is
named as the consumer's and the producer ask is the *smaller* one that remains.

**§0.3 This letter is the `/timeline` half O-26 reserved for it.** KF.W6's communiqué (**O-26**, same
24 h) closes its §2 negative space with *"`/timeline` (A-8/A-9) — KF.W7's evaluation; not this wave's
inventory."* R-1..R-3 below are that evaluation's product.

**§0.4 The verdict this evaluate reached, stated up front so no row reads as a complaint.** KF.W7 ruled
**six surfaces KEEP-BESPOKE, zero SWAP** (`docs/tranches/X/keyframes/evidence/W7/G1-VERDICT-TABLE.md`).
R-1..R-3 are therefore **capability facts that closed a route**, not defects — they are filed so the
producer can weigh them, and so no later seat re-derives them as novelty (killed-claim #15's lock).

---

## §1 · The inventory — one row per banked id, mechanism measured at the installed 7.0.0 dist

Word set: **LIVE** = an ask you have not seen · **NOTICE** = information for your ledger, no ask ·
**CARRIED** = the row travels because our spec routes it, and the ask already stands open elsewhere.

### R-1 · **C-15 (banked, `kf-KeyframeTimeline`)** — the `./timeline` subpath exports ONE runtime binding against seven shipped-but-unreachable modules, and there is no deep-import escape hatch (LIVE)

- **Measured, every figure by command at the installed dist, double-run:**
  - ⟨cmd⟩ `ls dist/components/timeline/` → **nine** files: `ContinuousMarkers.vue.d.ts` ·
    `ContinuousRail.vue.d.ts` · `ContinuousTimeline.vue.d.ts` · `GlassTimeline.vue.d.ts` ·
    `ScrubberTimeline.vue.d.ts` · `SegmentedTimeline.vue.d.ts` · `geometry.d.ts` · `index.d.ts` ·
    `types.d.ts`.
  - ⟨cmd⟩ `wc -l dist/components/timeline/index.d.ts` → **2**, and the two lines are
    `export { default as GlassTimeline } from "./GlassTimeline.vue";` +
    `export type { TimelineSegment, TimelineSegmentGradient, TimelineSegmentState, } from "./types";`
    — **one component, three types.**
  - ⟨cmd⟩ `grep -c '^export' dist/timeline.js` → **1**; the line is `export { me as GlassTimeline };`.
  - ⟨cmd⟩ `Object.keys(exports).length` → **73** subpaths; those matching `/timeline/i` → **`./timeline`
    alone**; the package's **only** wildcard subpath is **`./fonts/*`**.
- **The consequence, stated as a fact and not as a grievance**: **six of the nine declaration modules —
  the five variant SFCs (`ContinuousRail` · `ContinuousMarkers` · `ContinuousTimeline` ·
  `ScrubberTimeline` · `SegmentedTimeline`) and `geometry` — are re-exported by nothing**, while the
  seventh, `types.d.ts`, *is* reachable because `index.d.ts` re-exports its three type names. The type
  surface is partly reachable; **the component surface is not.** There is no `./timeline/*` wildcard, so
  a consumer cannot deep-import them without violating its own export-map law (our G-W6-2 class). We did
  not try.
- **Ask (yours to weigh, either answer closes it)**: (a) re-export the variant SFCs and `geometry` from
  `./timeline` (or add a `./timeline/*` wildcard), **or** (b) state in the docs that `GlassTimeline` is
  the whole intended surface and the variants are its private implementation — in which case those six
  declaration modules are published surface area nothing can address, and could be internalised.

### R-2 · **C-15's decisive absence** — `geometry.d.ts` publishes no percent↔position map and no zoom/pan (NOTICE; the single fact that most decided our verdict)

- **Measured**: ⟨cmd⟩ `grep -o 'declare function [A-Za-z]*' dist/components/timeline/geometry.d.ts` →
  **seven** names, all weighted-segment math: `fillFor` · `segmentWeight` · `createContinuousGeometry` ·
  `stitchedRailGradient` · `stitchedRegionWindow` · `continuousFillWidth` · `popoverPayloadFor`.
  ⟨cmd⟩ `grep -cE 'percent|zoom|pan\(' …/geometry.d.ts` → **1**, and that one hit is **prose inside the
  `fillFor` docblock** — **zero** exported percent↔position map, **zero** zoom, **zero** pan.
- **Why it is filed**: our rail is an N-marker zoom/pan instrument. Adopting `GlassTimeline`'s playhead
  alone would have installed a **second geometry authority** in one box with no shared map to reconcile
  them — so the swap was declined on mechanism, not on taste. **Filed as a capability gap, not a
  defect**; no ask is minted. If a future glass timeline grows a percent↔position map, tell us and we
  re-open the evaluate at that major.

### R-3 · **`SliderVariant` has no `"timeline"` member** (NOTICE, with the counter-evidence lock beside it)

- **Measured**: ⟨cmd⟩ `grep 'export type SliderVariant' dist/components/slider/types.d.ts` →
  `export type SliderVariant = "standard" | "spectrum";`
- **Recorded** as the fact that closes the Slider-primitive route for our timeline rail. **The
  counter-evidence lock rides with it, in the bank's own words** (`kf-PlaybackRibbon.md`, its routing-law
  paragraph): *"note the C axis's own §7 caution rides with it — this ribbon is the NON-bespoke case (it
  consumes the real `Slider`) and carries BLOCKERs anyway, so "swap onto the primitive" is never
  sufficient as a cure."* We weighed that before ruling, and it is concordant: **a `"timeline"` member
  would not by itself have changed the verdict.** No ask.

### R-4 · **reka `TooltipContentImpl` `ariaLabel`'s `textContent` fallback** — the default accessible name for a multi-node tooltip is a run-on of everything inside it (LIVE — the small ask, because the consumer half is ours)

- **Measured**: ⟨cmd⟩ `grep -n 'ariaLabel' node_modules/reka-ui/dist/Tooltip/TooltipContentImpl.js` →
  **`:87`** `const ariaLabel = computed(() => props.ariaLabel || currentElement.value?.textContent);` —
  **props-first, `textContent` otherwise, and the element is captured once**, so the fallback does not
  re-derive when the content swaps (our ghost→image swap is exactly that case).
- **The prop DOES reach through you** — measured, and this is why the ask is small:
  `dist/components/tooltip/TooltipContent.vue.d.ts` types its props as
  `TooltipContentProps & { class?; surface? }`, and reka's `TooltipContentProps extends
  TooltipContentImplProps` (`reka-ui/dist/index4.d.ts:10054` → `:10040-10049`), which declares
  `ariaLabel?: string`. **So passing `:aria-label` at a glass `TooltipContent` is lawful today**; the
  consumer-side cure is ours and is designed
  (`docs/tranches/X/keyframes/evidence/W7/G9-A11Y-DESCRIPTION-DESIGN.md`).
- **Ask**: surface `ariaLabel` as a **documented, recommended** prop on glass's `TooltipContent` (it is
  currently reachable only by reading reka's types through your intersection), and **consider a dev-mode
  warning** when the content slot is multi-node and the prop is absent. Nothing structural.

### R-5 · **glass `TooltipContent` consumes none of reka's `--reka-tooltip-content-available-height`** (LIVE — banked `kf-TimelineHoverPreview` **D-15**)

- **Banked row, verbatim** (`kf-TimelineHoverPreview.md:58`): *"**D-15 — no height cap or aspect-ratio on
  the capture while the cheap element beside it IS capped**; reka publishes
  `--reka-tooltip-content-available-height` on the content style (my read) and glass's TooltipContent
  consumes none of it."*
- **Re-measured at this seat, both ends**: ⟨cmd⟩ `grep -ro 'tooltip-content-available-height'
  reka-ui/dist/Tooltip/TooltipContentImpl.js | wc -l` → **1** (reka publishes it); ⟨cmd⟩
  `grep -ro 'reka-tooltip-content-available-height' glass-ui/dist/ | wc -l` → **0** (glass consumes it
  nowhere); ⟨cmd⟩ `grep -ro 'max-height' glass-ui/dist/components/tooltip/ | wc -l` → **0**.
- **Consequence at our surface**: a tall captured thumbnail inside a tooltip has no ceiling from the
  producer, while the cheap text element beside it is capped — so the panel can exceed the viewport with
  the variable that would have bounded it sitting unread on the same element.
- **Ask**: have glass's tooltip content element set `max-height` from
  `--reka-tooltip-content-available-height` **by default** (overridable), so every consumer inherits the
  collision-aware ceiling reka already computes. Our interim consumes the variable on our own preview
  root — **an interim, recorded as one**, and it is a consumer-side read of a published custom property,
  not a patch of your bytes.

### R-6 · **KF-AV-32 — two `useTouchGate()` instances in one ribbon arm and DISARM each other** (LIVE; banked NO-WAVE-OWNER, *"noted in the BH relay"* by the record itself)

- **Banked row, verbatim** (`kf-AnimationVisualizer.md:76`): *"two independent `useTouchGate()` instances
  arm and DISARM each other inside one ribbon: the installed gate keeps a module-level Set + one shared
  document `touchstart` handler that deactivates every active instance whose controlEl does not contain
  the touch target — so arming the ball's gate disarms the slider's and vice versa; a touch user
  re-taps-to-arm on every switch between the two halves of one instrument."*
- **Re-measured at the installed chunk by this seat** —
  `dist/useTouchGate-B4mzQcHJ.js` (84 L, 1,964 B), read whole:
  - **module-level registry**: `var i = /* @__PURE__ */ new Set(), a = !1;`
  - **one shared document handler**: `document.addEventListener("touchstart", o, { passive: !0 })`, and
    `o` is `for (let t of i) { if (!t.isActive()) continue; let n = t.controlEl(); n &&
    !n.contains(e.target) && t.deactivate(); }` — **every other active instance is deactivated by a touch
    that lands outside its own control element**, including a touch inside the *same ribbon*.
  - **per-instance timer**: `function l(a = 3e3)` — the 3 s arm window the row names.
- **Two live instances in one ribbon, at our bytes**: ⟨cmd⟩ `git grep -n 'useTouchGate' HEAD -- demo/` →
  `demo/components/playback/AnimationVisualizer.vue:101 const gate = useTouchGate();` and
  `demo/components/playback/PlaybackRibbon.vue:134 const gate = useTouchGate();`.
- **Ask**: a **per-group or per-scope** gate facility — e.g. `useTouchGate({ group })`, or an opt-out from
  the module-level Set — so that two gates belonging to one instrument do not disarm each other. The
  record's own words for the shape: *"one gate per ribbon, or a producer-side group facility."* We have
  **not** worked around it (a demo-side re-implementation of your gate is exactly the frontend hack the
  edict forbids).

### R-7 · **KF-SCR-2 — the void italic register** (CARRIED, **not re-asked**: the ask is open at O-26 R-12)

- Our spec routes KF-SCR-2 to this relay. **It was already relayed hours earlier by KF.W6's communiqué**
  (**O-26**, row **R-12**, *"`text-caption` is italic while no italic face ships"* — with the font
  decision asked there). **This letter mints no second ask**; a duplicate ask to one counterparty in one
  day is not two reports, it is noise.
- **What this row adds, because it is KF.W7's own surface and O-26's eight-site tally did not name it**:
  `demo/scenes/sequence/SequenceScrubber.vue:11` is one of the consumer sites, and it sits on a surface
  this wave ruled **KEEP-BESPOKE** — so the register stays ours to spend on and the decision at R-12
  binds it.
- **Re-measured here anyway, so the row is not carried on a sibling's transcript**: glass's
  `dist/styles/typography/semantic.css` declares `@utility text-caption { … font-style: italic; … }`;
  ⟨cmd⟩ `ls dist/fonts/ | grep -ci italic` → **0** italic faces ship; ⟨cmd⟩
  `grep -ro 'font-synthesis' glass-ui/dist/ | wc -l` → **0** (glass declares it nowhere); our
  `demo/styles/style.css:100` sets `font-synthesis: none`. **Answer it once, at R-12.**

---

## §2 · Negative space — considered, and deliberately NOT re-filed

1. **The `cn` padding-group seam (TEP-12 / MCP-31 family)** — **already relayed**; our spec says so by
   name (*"the `cn` padding-group seam is ALREADY relayed … — not re-filed"*) and this seat obeys. No row.
2. **KF-SCR-2** — carried at R-7 as a cross-reference to **O-26 R-12**, with no second ask (above).
3. **SpringTrace C-3's library export** (`resolveLinearStops` / `sampleNormalizedSpring`) — a
   **keyframes.js library-side** decision, not a glass ask. KF.W7 took the DECISION (the export is
   warranted, on C-15's precedent) and declared the implementation edge to KF.W5/KF.W8. Not yours; not
   sent.
4. **The `/timeline` rows A-8/A-9 from your O-20 disposition** — they are answered by R-1..R-3 rather than
   re-asked: our evaluate is the answer O-26 §2.6 promised you.
5. **Every other producer-adjacent row of this wave** — the `TimelineHoverPreview` layout pair's *demo*
   half, the ghost/cache family, the a11y description family — are **ours**, and three of them are
   carried as this wave's own residuals, not as asks on you.

---

## §3 · What KF.W7 shipped meanwhile, every interim recorded AS an interim

- **Six surfaces KEEP-BESPOKE, zero SWAP** — so no consumer of yours changed shape on account of this
  wave, and **no glass component was removed, replaced or shimmed.**
- **The scrub seam landed LIVE** (wired, guarded, single-engine) on our own components; the preview
  subject is a detached clone, so nothing in it reaches a glass surface.
- **Our tooltip mount narrowed from the root barrel to the published `@mkbabb/glass-ui/tooltip`
  subpath** — a *consumer* hygiene act on our side (it shrinks our runtime import graph and lets our
  tests mount the real glass `Tooltip` rather than a stub). Recorded here because it is the only change
  this wave made to how it consumes your package. **No deep import, no private chunk, no patch.**
- **R-5's interim** (reading `--reka-tooltip-content-available-height` on our own preview root) is the
  one interim this letter is the counterparty to; it retires the day R-5 lands.

---

## §4 · Reply asks

Row it in your ledger; reply **by row id `R-1`..`R-7`**; name any row you think we mis-read. The rows
that carry a live question are **R-1** (re-export or declare the dispatcher final), **R-4** (document and
recommend `ariaLabel`; consider the dev-warn), **R-5** (default `max-height` from the available-height
variable), **R-6** (a per-group touch gate). **R-2 · R-3 are NOTICE** and **R-7 is answered at O-26
R-12** — no second answer is owed for it.

Reply path unchanged: your `docs/tranches/BK/coordination/` on your side; our `GLASS-INBOUND-*` grammar
in `value.js/docs/tranches/V/coordination/` on ours.

— value.js, X·KF **KF.W7 unit `.f`** (the close seat)
