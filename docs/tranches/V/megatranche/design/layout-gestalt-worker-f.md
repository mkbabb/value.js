# M-13 · The Layout Gestalt — worker-F design

**MODEL RECEIPT:** `claude-fable-5` (Fable 5) — worker-F, the designated Fable design seat of the
M-12 tri-fold (L-14: design synthesis runs tri-fold; this is the F worker, blind to worker-O).
Not an Opus seat, by charter; recorded per L-11.

**Band:** DESIGN — no source edits; deliverable = this design + wave specs.
**Charter (owner, verbatim in intent):** mobile better takes up space — full width (handling
pathologically wide screens) and height; bespoke and optimized for mobile; without contrivance:
one layout where befitting, a perfectly optimized variant per platform otherwise; only the most
modern layout facilities.

**Measured ground consumed (re-verified, not re-derived):** MT-F028 (mobile delivers ~8% of desktop
content at 73–88% height coverage; ultrawide 65% content-width coverage at 3440 from
`shell.css:69-71`; three parallel adaptation mechanisms; one `container-type` at `shell.css:83`
feeding 18 `cqi` consumers), MT-F022 #4 (200% zoom = the mobile code path and its reflow is CORRECT
— protected, not regressed), DEFECT-LEDGER App D-1/D-2/D-3 and ConfigSliderPane D-2,
VISUAL-CONSTITUTION §3/§3.1/§7 (read directly — the challengers' citations check out), and the
installed producer artifact `@mkbabb/glass-ui@7.0.0` (read directly, decisive — see §1).

Mechanism census run by this seat today (commands in §6 gates):

```
width/aspect-conditional @media in demo (css+vue)   7   (of 34 total @media; the rest are preference/capability)
Tailwind lg:* fork utilities                        12
data-layout references                              12
mobilePaneIndex references                           9
container-type declarations in demo                  1   (shell.css:83)
```

---

## 0. The one architectural fact this design stands on

**The producer already built the mechanism.** Verified against the installed artifact, not prose —
`node_modules/@mkbabb/glass-ui/dist/components/instrument-chassis/`:

- `InstrumentChassis` ships slots `stage / inspector / action`, typed
  `proportion: "golden" | "preview-dominant"` (exactly §3 law 1's two legal ratios, as
  `61.8033989fr/38.1966011fr` and `66.6666667fr/33.3333333fr` grid columns), typed `boundaries`,
  `reserve`, `state`, `tone`.
- **The chassis is itself a container** (`container-type: inline-size`) and **ships its own narrow
  arm**: `@container (max-width: 44.9375rem)` collapses stage+inspector to one column — the §3
  law 6 stacked sequence (stage → inspector → action), producer-owned, at a producer-owned
  threshold (719px of *container* width, not viewport).
- Its interior rhythm already rides `cqi` clamps (`--instrument-dial-padding-inline:
  clamp(1rem, 3cqi, 1.5rem)` etc.).

So the layout gestalt is not an invention; it is a **transposition** (D-2's cure, verbatim: "the
`left`/`right` axis, `mobilePaneIndex`, `pane-wrapper--left/--right`, the ghost slot,
`pane-container--dual` and the desktop/mobile v-if fork all die in one cut"). The demo stops
running a parallel layout system and hands composition to the producer that already owns it. Every
law below is stated so that the design ends with **fewer mechanisms and fewer lines than today** —
the deletion ledger is in §2.

A consequence worth recording: **the aspect law dissolves with the dual-pane grid.** The JS
compound query `(min-width: 1024px) and (min-aspect-ratio: 1.1)` exists to keep TWO side-by-side
instrument panes off portrait tablets. Under one-chassis-per-route there is no pane pair; whether
the *inspector* sits beside the *stage* is a pure inline-size question, and the producer's 719px
container threshold answers it correctly on every device probed in the ledger: portrait tablet
1024×1366 → chassis ~992px → side-by-side golden (stage 613 / inspector 379 — legitimate, with
1366px of block room); landscape phone 844×390 → chassis ~812px → side-by-side (correct: stacking
in 390px of block would be worse); 390×844 → stacked. The X6 double-WebGL rationale for the v-if
fork dissolves the same way: one DOM tree per route = one mount = one WebGL context, by
construction rather than by arbitration.

---

## 1. The mechanism law — THE CONTAINER TREE

**One geometry mechanism replaces the three.** Stated as law:

1. **One viewport binding.** `.app-layout { height: 100dvh; display: grid;
   grid-template-rows: auto 1fr }` (already shipped, already modern — MT-F028: `dvh/svh` 8,
   `100vh` 0) is the ONLY place demo layout reads the viewport. It becomes the root container:
   `container: frame / size`. Its size is definite by construction (viewport-bound grid), so
   `size` containment has no circularity, and `cqb`/block-axis queries become available to every
   descendant.
2. **Geometry adapts only through the container tree**: `frame` (size) → route scene root
   (inline-size; for the eight chassis routes the chassis IS the scene container,
   producer-owned) → region interiors, which prefer **queryless fluidity** —
   `repeat(auto-fit|auto-fill, minmax(measure, 1fr))`, `clamp()`, `cqi`/`cqb` — and use a
   `@container` arm only where a region genuinely changes composition. The existing 18 `cqi`
   consumers keep working: their nearest inline-size container becomes the chassis/scene root
   instead of `.pane-wrapper`.
3. **JS holds no breakpoint.** `useBreakpoint` in App.vue, the `[data-layout]` stamp and its four
   CSS witnesses, `isDesktop`, `mobilePaneIndex`, and the v-if dual tree all die. One DOM tree per
   route; the CSS reflows it.
4. **`:has()` covers presence, not width.** Composition that keys on *what is rendered* (an
   inspector slot filled or empty) is the producer's `data-has-inspector` today; where the demo
   needs the same idiom (e.g. the admin query bar with/without an active filter tray) it uses
   `:has()`, never a JS-toggled class. This deletes the `pane-container--dual` class plumbing
   (`currentConfig.right !== null` in App.vue:59) with the architecture.
5. **`@media` survives only for preferences and capability** — `prefers-reduced-motion`,
   `prefers-color-scheme`, `forced-colors`, `prefers-reduced-transparency`, `@supports`. These are
   not geometry adaptation and are out of this law's scope. **Width/height/aspect/orientation
   `@media` in demo = 0** (7 today). The two foundation.css token arms (`:471` desktop dock
   tightening, `:479` ultrawide `--content-max-h`) re-home as `@container frame` token arms or die
   with the caps they feed (§3).
6. **Tailwind responsive prefixes carry no layout.** The `lg:` fork (12 utilities) = 0.

### What each facility buys, by what it deletes (the required justification)

| facility | deletes |
|---|---|
| `container: frame / size` on `.app-layout` | the JS `useBreakpoint` fork; the `[data-layout]` stamp + 4 witness rules (shell.css:110-125); the aspect compound query in BOTH homes (App.vue:311, shell.css:129, foundation.css:471) |
| producer chassis `@container` narrow arm | the v-if mobile/desktop dual tree (App.vue:77-138); the Tailwind `lg:` fork; the `PaneSegmentedControl` mobile pane selector (canon-retired); `mobilePaneIndex` (9 refs) |
| `grid-template-areas` on the two non-chassis scene classes (admin, about) | the `pane-wrapper--left/--right/--ghost` wrapper divs and the ghost-pane apparatus (App.vue:399-409) |
| `repeat(auto-fit/auto-fill, minmax())` interiors | the ultrawide pane-max cap (shell.css:69-71) and BOTH `--content-max-h` clamp arms — density replaces caps (§3) |
| `cqb` (via the `frame` size container) | any need for `svh` math inside the fixed frame — the configurator preview pin is container-relative (§5.1) |
| `:has()` presence idiom | `pane-container--dual` JS class plumbing |
| subgrid (admin review list only) | per-row column re-declaration: one column truth on the list, rows are `grid-template-columns: subgrid` — the §7 "one review-row anatomy" becomes structural |

Net: three mechanisms → one; App.vue's template halves; shell.css loses the witnesses, the dual
grid, and the cap. This is a **negative-line design**.

---

## 2. The mobile law — full width, full height, full CONTENT

MT-F028's finding is precise: mobile does not under-use width (92–96% spanned); it under-delivers
content (~8%) and voids height (73–78% on thin routes). The cure is therefore not cosmetic:

1. **Content parity by construction.** One scene per route, one DOM tree: the 390px arm renders
   the SAME regions as desktop, stacked by the producer's narrow arm. The pane-amputation class
   (App D-1's inert action bars, ConfigSliderPane D-2's vanished configurator, the ~8% text ratio)
   becomes unrepresentable — there is no second tree to fork liveness or content. (L-8: structure,
   not a gate; the parity gate in §6 exists only as regression witness.)
2. **Document scroll, universally declared.** `.pane-main { overflow-y: auto;
   overscroll-behavior: contain }` at every width. On desktop, compositions fit the band
   (`max-block-size: 100%`) and the rule is inert; on narrow, the scene flows past the band and
   the §3-law-6 one-document-scroll sequence emerges — **no query, no fork**. Height voids die
   because content-height is content's: thin routes content-hug and the band centers them (the
   73–78% void rows were half-empty *fixed* panes, not short documents).
3. **dvh/svh discipline** is already won at the frame (100dvh, 0×100vh). Below the frame, block
   fractions ride `cqb` against `frame` — URL-bar geometry is absorbed once, at the root.
4. **390px purpose gate.** Every route's purpose exercisable at 390×844 — the born-RED is /blob's
   configurator (31 rows, present-and-operable) and the nine D-1 action-bar controls.
5. **200% zoom rides the same path and must stay correct** (MT-F022 #4). Under this design
   1440@200% = 720 effective < 719 producer threshold → the stacked arm — same code path as
   today's correct reflow, now with content parity (the zoom-200 blob amputation dies with D-2).

---

## 3. The ultrawide law — GROWTH IS SPENT, NEVER SHED

The RED input: 65% coverage at 3440, a ~600px symmetric dead gutter left over from a cap sized for
two 32rem cards (`--pane-max * 2 + --pane-gap`). The law replaces the leftover with decisions:

1. **The cap dies with the pane pair.** The scene spans the band minus a **fluid, declared
   gutter**: `--scene-gutter: clamp(1rem, 1.5cqi, 2.5rem)` (one token; absorbs `--app-padding-x`).
   Margin at every width is a token you can read, not a residue. At 3440: gutter 40px/side →
   coverage ≈ 97%.
2. **Surplus inline space goes to the composition's elastic region** — the protagonist:
   - **Instrument stages grow.** A spectrum plane, an image sampler, a gradient meniscus, a blob
     stage at 2000px is a *better laboratory bench* — more chroma resolution, finer sampling.
     The chassis `fr` ratios already do this; nothing new is built.
   - **Control racks wrap, never stretch.** Inspector interiors are
     `repeat(auto-fit, minmax(18rem, 1fr))`: at 390 that is one column; at a 1290px golden
     inspector (3440) it is three. No gangly 1200px rows, no dead inspector margin, and the SAME
     declaration serves every width — this single idiom is what lets the caps die.
   - **Fields densify.** Browse/Library specimen fields are `auto-fill` grids: width = more
     palettes visible. Admin review lists spread their data columns across the full main width
     (§7 canon) on the subgrid template.
   - **The Easing curve is the named exception**: canon clamps its stage at 19–22rem; its surplus
     goes to catalogue/specimen strips (auto-fit), and only after those saturate does margin earn.
3. **Prose margin is EARNED by the type law.** /about keeps `max-inline-size: 66ch`; its flanking
   margin is the §4 measure law speaking, and /about is the sole route exempt from the coverage
   gate — by citation, not by silence.
4. **The height caps die too.** `--content-max-h`'s two clamp arms (52rem desktop / 38rem at
   21:9) reserve vertical dead space on tall displays for the same historical reason as the width
   cap. The band's `1fr` bounds the scene; compositions declare `max-block-size: 100%` and center.
   The 21:9 `@media` arm is deleted, not re-homed.

**Gate (born-RED at 65%):** scene content-box ≥ 90% of viewport width at 3440×1440 on every member
route except /about; AND stage inline-size at 3440 > stage at 1440 (the surplus provably reached
the protagonist, not the gutter).

---

## 4. Per-route composition table

Terms: **one-layout** = one composition, fluidly reflowed (the producer narrow arm stacks the same
region sequence; no region changes role). **bespoke-mobile** = the narrow arm is a *different
composition* (regions change posture/disclosure). Canon §3.1's mobile-order column decided most
rows — where the mobile order is the desktop sequence stacked, bespoke would be contrivance.

| route | verdict | composition & reason |
|---|---|---|
| `/` Picker | **one-layout** | Golden chassis (stage=optical stage, inspector=controls). Canon mobile order "stage, then shallow controls" IS the stacked desktop sequence. Ultrawide: stage elastic, rack auto-fits. The About companion is retired (D-2); an absent inspector leaves no filler. |
| `/palettes` Library | **one-layout** | Owner-state selector → field → selected inspector at canon's 64–66.7%/33.3–36%. Same sequence stacked at 390; `auto-fill` slip field carries both ends of the width range. Selected inspector content-hugs; empty lane collapses (§3 law 2) — `:has()`/`data-has-inspector`, not JS. |
| `/browse` | **one-layout** | Isomorphic to Library: search → results field → selected inspector. Same reasons. |
| `/extract` | **one-layout** | Image IS the stage; "source, sampled result, controls" stacks unchanged. Stage elastic at ultrawide (a bigger sampling bench). |
| `/mix` | **one-layout** | Operand rack → trough/result → controls. The rack is the interesting cell: `auto-fit` wrap keeps 2–12 operands legible at 390 (wraps to rows) and at 3440 (one long rack) with one declaration — canon demands legibility at 2, 3, and 12. |
| `/generate` | **one-layout** | Specimen → model inspector → commit; canon's mobile order verbatim. One of the 73–78% height-void routes today — cured by content-hug + document flow (§2.2). |
| `/gradient` | **one-layout** | The meniscus rail is the one protagonist that is *horizontal by nature* — it wants every width it can get at every arm. Stops/code inspector stacks under it on narrow. |
| `/easing` (route to be created — W27 owns the body) | **one-layout** | Curve stage container-clamped 19–22rem (canon); catalogue/specimen strips auto-fit around it. The layout law binds it at birth; this band does not build it. |
| `/atmosphere` | **BESPOKE-MOBILE** | The route's purpose is *tune-while-observing*: a configurator whose preview scrolls away is purposeless. Narrow arm: preview PINNED at `min(42cqb, --stage-pin-max)`, essentials scroll beneath, advanced stays a scroll-confined disclosure — a different composition than the desktop side-by-side, earned by the feedback loop. (Glass ask G-1; degraded posture without it still passes the purpose gate, §5.1.) |
| `/blob` | **BESPOKE-MOBILE** | Same posture as Atmosphere, same reason — and this is the direct cure for ConfigSliderPane D-2 (the display-none-below-1024 anti-pattern): 31 rows present and operable at 390. Canon: "preview; essentials; advanced/reset/compare". The Dock `Picker\|Blob` toggle dies with the architecture (W19's cut). |
| `/about` (route to be created — W18 owns the body) | **one-layout** | A measure-bound article (66ch) is the same composition at literally every width. The sole ultrawide-coverage exemption (§3.3). |
| `/admin/*` ×5 | **one-layout** (scene) with **row-level container collapse** | Scene = query bar → review list, full main width (§7: companion REMOVED, not restyled). The bespoke-ness lives in ONE place: the review row, a subgrid row whose columns collapse to a stacked disclosure under a container arm — §7's "responsive disclosure" made structural. Five routes, one row anatomy, zero scene forks. |

Bespoke count: **2 of 16** — exactly the two routes whose purpose breaks under plain stacking.
Neither lazy uniformity (the configurators earn their variant) nor contrivance (nobody else gets
one).

---

## 5. Exemplar CSS — the two hardest routes (sketch-grade)

### 5.0 The shell frame (context for both)

```css
/* shell.css after the cut — the WHOLE layout surface */
.app-layout {
    container: frame / size;              /* definite size: viewport-bound grid — no circularity */
    display: grid;
    grid-template-rows: auto 1fr;         /* dock band · scene band (unchanged, already modern) */
    row-gap: var(--dock-gap);
    height: 100dvh;                       /* THE one viewport binding */
    overflow: hidden;
    padding: var(--dock-inset) var(--scene-gutter) 0.5rem;
}
:root { --scene-gutter: clamp(1rem, 1.5cqi, 2.5rem); }   /* margin is a token, not a residue */

.pane-main {                              /* the scene band */
    display: grid;                        /* centers a short scene; a tall one fills */
    align-content: safe center;
    overflow-y: auto;                     /* inert when the scene fits; THE document scroll on narrow */
    overscroll-behavior: contain;
    min-height: 0; min-width: 0;
}
.route-scene { max-block-size: 100%; inline-size: 100%; }
/* DELETED: .pane-container, --dual, the pane-max cap, the [data-layout] witnesses,
   the @media dual-grid arm, --content-max-h and both its @media re-pins. */
```

### 5.1 `/blob` — the bespoke configurator (hardest: cures D-2, needs the producer)

```vue
<!-- The scene IS the chassis; regions are canon §3.1's -->
<InstrumentChassis proportion="preview-dominant" :boundaries="[]" reserve="none"
                   class="route-scene scene-config">
    <template #stage>     <GooBlob …/>                    </template>  <!-- persistent hero preview -->
    <template #inspector> <ConfigSliderPane …/>           </template>  <!-- essentials + advanced disclosure -->
    <template #action>    <!-- Copy JSON · Reset · Compare -->        </template>
</InstrumentChassis>
```

```css
/* Wide arm (producer side-by-side ≥ 719px container): preview-dominant 66.67/33.33;
   the inspector is scroll-confined so the preview never leaves the bench.
   → GLASS ASK G-1: a typed chassis posture (`scroll="inspector"`) making the composition
     minmax(0,1fr) rows with .instrument-inspector { overflow-y:auto } when the chassis
     has definite block size. Consumer CSS on .instrument-inspector would be a fork — not done. */
.scene-config { block-size: 100%; }

/* Narrow arm (producer's own @container (max-width: 44.9375rem) stack): the PIN.
   The stage keeps a container-relative block fraction; the console scrolls beneath;
   the action region stays in thumb reach. All three postures are chassis behavior → G-1: */
.scene-config {
    --instrument-stage-pin: min(42cqb, 24rem);  /* cqb resolves against `frame` (size container) —
                                                   the chassis is inline-size and is skipped for
                                                   the block axis. UNKNOWN U-1: engine agreement
                                                   (Safari/Chromium) on cqb-through-inline-container
                                                   — one rehearsal probe before W-LG2 executes. */
}
/* Degraded posture if G-1 has not landed: the producer stack still renders ALL regions in
   document flow — preview, then 31 operable rows, then actions. The 390 purpose gate passes
   WITHOUT the ask; only the pin/scroll-confinement waits on it. No local chassis clone in the
   interim (feedback_kiss_no_contrivance / edict: glass-ui owns chassis primitives). */
```

Honest unknowns, `/blob`: U-1 (cqb axis fallback, above); U-2 — GooBlob's WebGL canvas must resize
losslessly through the container reflow (today it survives breakpoint remount, which is the
*harder* case, so this is expected-GREEN but probed, not assumed); U-3 — the producer threshold
719px puts a 700px window in the stacked arm with the pin: acceptable (it is exactly the
200%-zoom-at-1440 geometry, which canon says is the mobile grammar).

### 5.2 `/` Picker — the protagonist route (hardest one-layout: golden + ultrawide + parity)

```vue
<InstrumentChassis proportion="golden" :boundaries="[]" reserve="none"
                   class="route-scene scene-picker">
    <template #stage>     <!-- optical stage: spectrum plane · meniscus · readout headline --> </template>
    <template #inspector> <div class="picker-rack"> <!-- channel rail · space selector · controls --> </div> </template>
    <template #action>    <!-- the one glass-ui action set --> </template>
</InstrumentChassis>
```

```css
.scene-picker { block-size: 100%; }

/* The inspector interior: the ONE declaration that serves 390 → 3440.
   390 (stacked arm): one column. 1440 golden inspector (~380px): one column.
   3440 golden inspector (~1290px): three columns — the ultrawide surplus is SPENT
   on parallel control groups instead of stretched sliders or dead margin. */
.picker-rack {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
    gap: var(--instrument-control-gap);
}

/* The stage is elastic by the chassis's own 61.8fr — nothing to declare.
   In-stage rhythm keeps riding cqi against the chassis (the 18 existing consumers re-parent
   here unchanged). The spectrum plane may declare aspect-ratio + max-block-size: 100% so
   block growth follows inline growth until the band bounds it. */
```

Honest unknowns, Picker: U-4 — whether the channel rail reads better as stage furniture (canon:
"compact channel veil" inside the one vertical argument) or as rack content at ultrawide; this is
the optical-bench composition's call (OPTICAL-BENCH-COMPOSITIONS ratification), not the layout
law's — the layout supports both. U-5 — with About retired to its own route, `/`'s inspector holds
controls only; §3 law 2 requires an absent inspector to leave no filler — `data-has-inspector`
already guarantees it (producer, verified in the shipped JS).

---

## 6. Wave specs (FORMATION-LAWS template)

### WAVE LG-1 — The transposition: one scene per route, one container tree

```
WAVE LG-1 — the frame law + the one-scene shell (D-2's "one cut")
  DEFECT      MT-F028: node docs/tranches/V/megatranche/audit/probes/layout-utilization.mjs →
              65% content-width @3440; text 69/893 (~8%) at 390 on /; three mechanisms
              (7 width/aspect @media · 12 lg:* · JS isMobile fork) — census commands below, run
              2026-07-27 by this seat with today's outputs pasted in the header.
  BORN        RED (every gate below fails against today's tree)
  SCOPE       demo/color-picker/App.vue (single-scene shell: nav band + <main> + one route scene),
              demo/shell/viewSchema.ts (left/right axis → one scene per ViewId; PaneConfig loses
              right/rightLabel/defaultPaneIndex), demo/shell/usePaneRouter.ts +
              useViewManager.ts (mobilePaneIndex dies; ONE mount = ONE registration — D-1's cure),
              demo/shell/PaneSegmentedControl.vue (deleted), demo/styles/shell.css (§5.0 end
              state), foundation.css layout-token arms (:471, :479 die; --scene-gutter born).
              Panes render INTO chassis slots as-is — interior restyling is NOT this wave.
  STRUCTURE   (L-8) the fork classes become unrepresentable: one DOM tree per route means
              breakpoint-desynchronised liveness (D-1), pane amputation (~8% parity), and the
              retired pane selector cannot be expressed. Gates below are regression witnesses only.
  GATES       g1 coverage: layout-utilization.mjs (extended to assert) — scene content-box
                 ≥ 90% viewport width @3440×1440, all member routes except /about.
                 RED today: 65% (MT-F028).
              g2 parity: per-route rendered text @390×844 ≥ 0.9 × same route @1440×900.
                 RED today: /: 69/893 ≈ 0.08.
              g3 height: content-height coverage ≥ 90% @390 on #/browse #/generate #/mix.
                 RED today: 73–78%.
              g4 census: grep -rEn "@media[^{]*(min-width|max-width|min-aspect|max-aspect|orientation)"
                 demo --include="*.css" --include="*.vue" | wc -l  == 0. RED today: 7.
              g5 census: grep -rEon "\blg:[a-z-]+" demo --include="*.vue" | wc -l == 0. RED: 12.
              g6 census: grep -rn "data-layout\|mobilePaneIndex\|PaneSegmentedControl" demo | wc -l
                 == 0. RED today: 12+9+n.
              g7 D-1 witness: the ledger's p3.mjs regenerate probe @390 —
                 specimenChanged:true. RED today: false.
  π           matrices {390×844@3, 1440×900, 3440×1440} × routes {/, /blob, /browse, /admin/users};
              selector main > .route-scene; committed under
              docs/tranches/V/megatranche/design/pi/lg1/ (force-added past .gitignore:34 — L-7).
  DELTA       the MT-F028 probe table re-run, before/after, pasted side by side.
  CARRIES     App D-1 (BUILD, here — registration is the mount), App D-2 (BUILD, here — this IS
              the transposition), App D-3 (FOLD → chassis proportion prop; the shell stops
              declaring grid-template-columns), App D-12 (FOLD — mobilePaneIndex dies here).
              Original ids preserved.
  BANKS       none. (The aspect law is not banked — it is dissolved with rationale in §0; if a
              portrait-tablet regression is ever measured, the re-trigger is the g1–g3 probe
              matrix which includes 1024×1366 from LG-2 on.)
  ENV         dev server localhost:9000, API-less: geometry claims valid, data-backed content
              invalid (cancels out of parity ratios — both arms API-less). Structurally blind to
              build defects (MT-F012 is another wave); a built-bundle re-witness of g1–g3 is owed
              at the mega-tranche close per L-12.
  COMPLETABLE yes — if only this wave ever lands, the tree has one layout mechanism, full-width
              ultrawide, content-parity mobile, and D-1/D-2/D-3 closed. One session: the cut is
              large but it is ONE transposition already specified by D-2's cure; route interiors
              are explicitly out of scope.
```

### WAVE LG-2 — The configurator bespoke arm (Atmosphere + Blob)

```
WAVE LG-2 — tune-while-observing: the pinned-preview narrow posture
  DEFECT      ConfigSliderPane D-2: WebKit sweep on /#/blob — 1024px ⇒ 31 rows; 1000/390 ⇒ 0
              rows (.config-console absent). shots/zoom-200-desktop/blob.png shows the same
              amputation at 200% zoom.
  BORN        RED (0 rows at 390 and at 720×450@2 today)
  SCOPE       demo/scenes/* for atmosphere+blob only: the two scenes adopt the §5.1 composition
              (preview-dominant chassis; essentials always-rendered; advanced scroll-confined
              disclosure per canon §3.1). The Dock Picker|Blob toggle deletion arrives with LG-1.
              Producer posture (pin + scroll-confined inspector) consumed IF G-1 landed; the
              degraded document-flow posture otherwise (both pass g1–g2).
  STRUCTURE   (L-8) the pane owns its narrow composition — there is no toggle to inherit and no
              display:none arm to write; the 0-rows state is unrepresentable in the template.
  GATES       g1 purpose@390: /#/blob 390×844 — .config-console present, row count == 31, first
                 row's slider operable (ArrowRight changes its readout). RED today: absent.
              g2 zoom-200 (MT-F022 #4 non-regression + cure): 720×450@2 — same stacked arm,
                 console present, no vertical clipping of the action bar. RED today.
              g3 pin (G-1-gated, two-stage): @390 with console scrolled to its LAST row, the
                 preview canvas remains ≥ 30% visible in-viewport. RED today; if G-1 unlanded at
                 execution, g3 is reported BLOCKED-ON-G-1 with the degraded posture's measured
                 scroll-to-preview distance recorded — never silently waived.
              g4 /#/atmosphere parity: rowCount ≥ 3 @390 (its today's-working narrow arm must not
                 regress through the re-composition). GREEN today — regression witness, named as
                 such (L-3 exception: protective, not born-RED).
  π           {390×844@3, 720×450@2, 1440×900} × {/#/atmosphere, /#/blob}; selectors
              .instrument-stage / .config-console; committed under design/pi/lg2/.
  DELTA       shots/safari-mobile-light/blob.png (today: Picker + toggle) vs the after-frame
              (preview + 31 rows).
  CARRIES     ConfigSliderPane D-2 (BUILD, here). The D-9 SliderDef API growth
              (rank/collapsed/disabled) stays with the ConfigSliderPane cure wave — FOLD reference
              only, id preserved.
  BANKS       B-1: adopt producer pin posture the moment G-1 ships — re-trigger:
              `node -e "const f=require('fs');process.exit(/scroll|stage-pin/.test(f.readFileSync('node_modules/@mkbabb/glass-ui/dist/components/instrument-chassis/styles.css','utf8'))?0:1)"`
              (exit 0 ⇒ fire the adoption). Mechanically checkable per L-4.
  ENV         dev server, API-less (both routes are API-free — fully valid here). WebKit AND
              Chromium per MT-F022 L-9 corollary. U-1 (cqb axis) probed in rehearsal BEFORE the
              wave executes; if engines disagree, the pin falls back to a frame-container
              @container arm token — still one mechanism.
  COMPLETABLE yes — needs LG-1's scene shell; if LG-1 landed and only LG-2 ever follows, /blob and
              /atmosphere are whole on every device. (Ordering dependency stated: LG-2 executes
              after LG-1; its own evidence closes it.)
```

### WAVE LG-3 — Density interiors: racks wrap, fields fill, rows subgrid

```
WAVE LG-3 — the elastic interiors (ultrawide spend + rack/field/list grammar)
  DEFECT      MT-F028: at 3440 the surplus goes to dead gutter; today stage width @3440 == stage
              width @1440 (both capped at 512px per pane, probe-app-D.mjs) — the protagonist
              receives nothing.
  BORN        RED (g1–g3 fail today)
  SCOPE       picker rack (§5.2 .picker-rack), mix operand rack, browse/library specimen field
              (auto-fill), admin review list (ONE grid template + subgrid rows + the row's
              container-collapse disclosure arm). No new components; region interiors only.
  STRUCTURE   (L-8) one auto-fit/auto-fill declaration per interior replaces every would-be
              width arm; the admin column truth lives once (subgrid), so per-row drift is
              unrepresentable.
  GATES       g1 spend: stage inline-size @3440 > stage @1440 on /, /extract, /gradient.
                 RED today: equal (512-capped).
              g2 rack wrap: picker inspector rack column count @3440 ≥ 2 (getComputedStyle
                 grid-template-columns track count). RED today: 1.
              g3 field density: visible specimen columns on /#/browse @3440 ≥ 2 × @1440.
                 RED today (capped field).
              g4 rack floor: @390 every auto-fit interior == 1 column, zero horizontal document
                 scroll (scrollWidth ≤ clientWidth on <html>). Must hold in the same run.
              g5 admin one-truth: grep — exactly ONE grid-template-columns declaration for the
                 review-list scope; rows carry subgrid. RED today (no such structure).
  π           {390, 1440, 3440} × {/, /#/browse, /#/mix, /#/admin/users}; committed under
              design/pi/lg3/.
  DELTA       probe-app-D.mjs stage-width rows before/after at all three matrices.
  CARRIES     App D-3's ratio residue closes fully here (interior tracks obey the chassis ratio).
  BANKS       none.
  ENV         dev server, API-less — browse/library/admin fields render EMPTY states; g3 is
              measured against a seeded fixture list (the probe injects N slips) and says so; a
              live-data re-witness is owed when the API band lands. Blindness stated per L-12.
  COMPLETABLE yes — each interior is independently landable; even without LG-1 the field/rack
              declarations improve the current tree (they are cap-independent). If only LG-3 ever
              lands, the interiors are elastic and the admin row anatomy is one.
```

---

## 7. Glass asks (coordination, not local builds — feedback_glassui_bhbi_relay)

To the active glass-ui BH inbox; nothing below is built locally in the interim:

- **G-1 — chassis scroll/pin posture** (the one load-bearing ask): a typed InstrumentChassis
  posture for configurator instruments — wide arm: `.instrument-inspector` scroll-confined
  (`minmax(0,1fr)` composition rows + `overflow-y:auto`) when the chassis has definite block
  size; narrow arm: the stage holds `--instrument-stage-pin` (consumer token, e.g.
  `min(42cqb, 24rem)`) while the inspector scrolls and `.instrument-action` may sit
  `position: sticky; inset-block-end: 0`. Rationale: canon §3.1 Atmosphere/Blob name
  "scroll-confined advanced disclosure" as chassis-level composition; consumer CSS on
  `.instrument-*` selectors is a fork of the producer's recipe (the exact class MT-F014
  documents). Degraded document-flow posture is acceptable interim (LG-2 g3 two-stage).
- **G-2 — confirmation, not change**: the chassis narrow threshold (`44.9375rem`) and the
  stacked order (stage → inspector → action) are adopted as-published as the app-wide narrow
  grammar; asking glass to *confirm* the threshold is a stable public contract (a named token or
  documented constant) so the demo's rehearsal probes may pin it without reading dist bytes.
- **Not asks** (verified already shipped, consumed as-is): typed `proportion` golden /
  preview-dominant (D-3's cure — present in 7.0.0), `data-has-inspector` empty-collapse,
  interior `cqi` rhythm, `boundaries`/`reserve`.

---

## 8. What this design refuses (recorded for the arbiter)

- **No fourth mechanism, no wrapper components, no shared/ dirs** — the scene classes live on
  existing SFC roots; the chassis is the producer's.
- **No per-route breakpoint tables in JS** — viewSchema keeps labels/icons/accent, loses geometry.
- **No svh math below the frame** — cqb against `frame` covers it, one viewport read total.
- **No coverage theater**: /about's margin is earned by the 66ch law and *exempted by citation*;
  Easing's stage clamp is canon and its surplus routes to the strips. A 90% gate with silent
  exemptions would be the vacuous-gate class (L-2); both exemptions are named in the gate spec.
- **No probing spree**: this design cites the banked MT-F028/D-ledger numbers and one grep census
  run today; the two named unknowns (U-1 cqb axis, U-2 WebGL resize) get ONE rehearsal probe each
  before LG-2, per the probe-parsimony edict.
