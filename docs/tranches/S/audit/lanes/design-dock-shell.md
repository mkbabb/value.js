# S design-assay lane — DOCK + SHELL

**Mode**: audit-only · Fable design assay against the editorial-instrument register (color-science atlas plate: Fraunces display, Fira readout, cartoon-offset shadow, crayon primaries, ink+grain, perceptually-true fields).
**Repo**: value.js @ `c5aa091` (tranche-q). Live probes against the dev server at `http://localhost:9000` (Vite dev, unminified — frame numbers are directional, not release-grade; the Playwright browser was SHARED with sibling lanes mid-session, so a few probes were re-run to isolate; every number below is from an isolated re-run unless flagged).
**Owns**: S-8 (collapsed dock grammar), S-7 (pill cutoffs), the view-select moment as-landed, per-view accent legibility (R.W4 B2 "reads subtly"), header/nav horizontal usage, shell transition feel vs S-9.

## Evidence index (all under `docs/tranches/S/audit/lanes/design-dock-shell/`)

| File | What it shows |
|---|---|
| `desktop-1440-light-picker.png` | 1440×900 light, picker+About — cream card faces, dock expanded w/ Tools |
| `desktop-1280-light-picker.png` | 1280×800 **light** — BOTH cards render mud-brown (bucket flip, P0-3); collapsed dock "Ho" clip (P0-1) in the same frame |
| `desktop-1440-dark-picker.png` | 1440×900 dark (generate view) — dark cards on a still-bright pink aurora field |
| `dock-expanded-light-closeup.png` / `dock-expanded-dark-closeup.png` | dock furniture both schemes |
| `dock-collapsed-light-closeup.png` / `dock-collapsed-dark-closeup.png` | collapsed pill: dot + "Ho"/"Ge" text clip, no icon, no chevron |
| `dock-palettes-trigger-light.png` | expanded trigger after switch — per-view orange icon vs pink ring/Tools (two voices) |
| `view-select-open-light.png` | the view-select menu open at 1440 light |
| `mobile-390-light-picker.png` / `mobile-390-palettes.png` / `mobile-390-view-select-open.png` | 390×844 — clipped overflow-menu trigger; mud faces in light scheme |
| `pane-swap-mid-120ms.png` / `pane-swap-mid-260ms.png` | pane-swap travel mid-flight (About departs right, Mix arrives) |
| `mbabb-menu-light.png` | @mbabb dropdown |

Console on every load: CORS preflight rejection of `https://api.color.babb.dev/colors/approved` from origin `localhost:9000` (`Access-Control-Allow-Origin: https://color.babb.dev`) — **S-11 evidence**, routed to the api lane: the dev client points at prod (`demo/@/lib/palette/api/client.ts` BASE_URL) and prod CORS only admits the prod origin.

---

## P0 findings

### P0-1 · S-8/S-7 — the collapsed dock clips its own content; the collapsed grammar is wrong at both ends

**Measured** (1440×900, light, picker view): collapsed root box **59×59px** (`--dock-collapsed-px: 59px`); the collapsed slot content needs ~100px — summary layer `scrollWidth 70 / clientWidth 40`; the label ("Home", 45.8px wide) ends at x=769.8 vs dock right edge 749.5 → **the text overruns the pill by 20.3px** and is hard-clipped to "Ho" painted over the WatercolorDot; the ChevronDown never paints at all. Reproduced identically in dark ("Ge" for Generate, `dock-collapsed-dark-closeup.png`) and at 1280 (`desktop-1280-light-picker.png`, top). This IS the user's "Pal" occlusion shot (S-8) and, per the measurements below, the likely "Palettes caret cropped" shot too (S-7): the **expanded** trigger never clips (chevron right 616.3 < trigger right 624.3; a 150-frame rAF sampler across a Palettes→Gradient switch measured max content-overflow **−325.8px**, i.e. zero frames overflowing, `overflow: visible` on the trigger) — the cutoff the user photographed is the *collapsed* pill's.

**Root cause is a producer/consumer grammar collision, and the producer is right**: glass-ui designs the collapsed dock as a **perfect circle** (`glass-ui/src/styles/dock/density.css:43` — "collapsed-perfect-circle ↔ expanded-pill identity", `aspect-ratio: 1`, ~44px floor; `dockMorphMeasure.ts:110` seeds the collapsed endpoint at the icon-square floor and refines to the real collapsed ROOT box — which CSS pins square). The consumer slot (`demo/@/components/custom/dock/Dock.vue:217-230`) stuffs dot + morph-keyed label span (`hidden sm:inline` text on ≥sm!) + chevron into a box that can never hold them. Text in the collapsed slot is architecturally unreachable.

**The collapsed grammar spec (S-8, exact)** — "the wax seal": the collapsed dock is the WatercolorDot in the live picked color filling the circle (it already carries the plate's chromatic voice + the watercolor texture of the register), with the **current view's icon inked over it** in the contrast-guarded ink (`--accent-view` is wrong here — use ink/foreground over the dot, the dot IS the accent), swapping on the existing `vj-morph` keyed by view. **NO text label, NO chevron** (the circle + hover/tap affordance is the producer's own tap-to-expand gate, `useDockTouchGate` — a caret on a seal is furniture). The current markup is already 80% there for <sm (`Dock.vue:225` icon `sm:hidden`); the fix is: delete the label span (line 226), un-gate the icon from `sm:hidden`, drop the chevron (line 229), center in the circle.
**Route**: value.js demo (`Dock.vue` collapsed slot). glass-ui KEEP — the circle grammar and the morph-measure floors are correct; no producer change. The trigger surface itself (tap-to-expand + morph) is already a glass-ui producer surface (`useDockTouchGate`, `onClickCollapsed`) — the demo only authors slot content, which is the right seam.

### P0-2 · Mobile dock tail is clipped off — dark toggle + share are unreachable at 390px

**Measured** (390×844): dock box x 39→351 (312px); the main layer's content spans 53→362; the **mobile overflow-menu trigger (`.dock-dropdown-trigger`, the ⋮) sits at 339.6→379.6 — 28.6px past the dock's right edge**, clipped by the dock's paint containment with `scrollLeft 0` and zero scroll affordance (`mobile-390-light-picker.png`: the pill visibly ends in a bare separator; the menu that holds **share-link, the DarkModeToggle, slug tools** is a sliver). `dock-scroll-x` technically permits swipe-scroll inside the pill — silent handling of an overflow that should not exist (precept: no silent handling).

**Root**: the mobile main-layer composition (`Dock.vue:137-211`) seats view-trigger (56px) + separator + PaneSegmentedControl (**143.1px** with full "Picker/About" text labels) + separator + overflow trigger (40px) + paddings ≈ 320px+ against a 312px aperture. The segmented control's full-word labels are the space hog.
**Route**: value.js demo — cut the mobile grammar: segmented control goes icon-or-shorter at <sm (root-level variant on `PaneSegmentedControl`, not per-instance), or the dock drops a separator pair (four vertical bars in 312px is furniture); glass-ui secondary — a `dock-scroll-x` dock whose content overflows should FAIL VISIBLY (fade + affordance) or refuse, never silently clip a control (file as producer ask; the coordination/Q.md channel exists).

### P0-3 · The adaptive-glass luminance bucket flips the LIGHT shell to mud, non-deterministically

**Measured** (1280×800, `htmlClass:""`, `vueuse-color-scheme: light`): the picker card (`pane-shell picker-shell`) computes `--glass-backdrop: dark` with `--glass-backdrop-luma: 0` — in the light scheme — and paints the dark-glass face; the dock in the SAME frame buckets `--glass-backdrop: light`. The atmosphere canvas is in WebGL mode (`getContext('2d')` → null, CSS `background-image: none`): the sampler reads an unreadable/black WebGL buffer as **luma 0 → "sits on black" → dark glass**. Result across same-scheme loads this session: 1440 load = cream atlas-plate faces (`desktop-1440-light-picker.png`); 1280 + 390 loads = mud-brown faces (`desktop-1280-light-picker.png`, `mobile-390-light-picker.png`) with register-collapsing casualties — the About subtitle ("The math, the science…") and Definition body are ILLEGIBLE (dark olive over dark brown), channel letters L/A/B/A near-invisible, mixed white/ink text regimes on one plate. The shell's entire light-scheme identity is a coin flip on sampler timing.

**Route**: **glass-ui producer** — `useGlassBackdropLuminance` must never resolve luma 0 from an unreadable canvas (WebGL without `preserveDrawingBuffer`/readback): skip the refine and hold the declarative bucket floor, or fail explicitly. Consumer secondary (value.js demo): `Dock.vue`/pane shells should thread `backgroundCanvas` consistently or opt out (`--glass-tint-strength: 0%`) until the producer cure — but per no-workarounds, the producer fix is the fix. This finding also contaminates S-20 ("a bit more glassy" judgments are being made against a broken face) and every dark-vs-light legibility report in the ledger.

---

## P1 findings

### P1-4 · Per-view accent: the contrast guard does NOT survive the hue turn, and at low chroma the whole axis vanishes (the B2 "reads subtly" root)

`style.css:175` derives `--accent-view: oklch(from var(--accent-live) l c calc(h + shift))` claiming (`:166-168`) "L and C are preserved, so the contrast guard … survives the turn." **Measured false post-gamut-map**: at the default pick (`--accent-live: oklch(0.62 0.2725 9.8)`), the painted sRGB per view and WCAG contrast vs white:
picker 3.90 · palettes 3.98 · browse 3.63 · extract 3.33 · **mix 2.74** · **generate 2.77** · gradient 3.80 · atmosphere 4.45 · blob 4.23. C=0.2725 is far outside sRGB at cyan/green hues, so the browser's chroma-reduction bends the painted L per hue — mix/generate icons fail even the 3:1 graphics floor on light glass (visible in `desktop-1440-dark-picker.png`'s washed cyan Generate icon). Worse: for a near-achromatic pick (C≈0), all 9 hue rotations paint the SAME gray — the "navigation reads chromatically" grammar disappears entirely for gray/white/black picks.
**Route**: value.js demo, but through **value.js src** — the library owns Ottosson analytical gamut mapping (`src/units/color/gamut.ts`) and `safeAccentColor` (`contrast.ts`); derive each view's accent by rotating hue THEN gamut-mapping to the cusp + re-guarding L (one resolver, JS-side, written as 9 static tokens per accent change — cheap), instead of trusting the browser's clamp. A low-C floor (e.g. min C for the view axis) keeps the axis legible on achromatic picks. This is the eat-your-own-dogfood fix: the demo currently outsources exactly the color science the library exists to do.

### P1-5 · Two accent voices on one control — the view-select moment is subtle because it's outnumbered

**Measured** (gradient view): trigger icon `oklch(0.62 0.2725 249.8)` (view-blue) while the same trigger's ring is `--dock-ring: oklch(0.620 0.2725 9.8)` (live-pink, set at `DockViewSelect.vue:55`), Tools label+icon = safeAccent pink (`Dock.vue:167`), Login/profile = pink, collapsed-slot icon = `--accent-view`. The B2 grammar lands on ONE 24px icon while four neighboring dock elements shout the live accent (`dock-palettes-trigger-light.png`: orange palette icon beside pink ring, pink Tools, pink Login). The view-select MENU doesn't speak the axis at all: non-current items are gray dots + gray icons; the current item's dot is `cssColorOpaque` (live), not its view hue (`DockViewSelect.vue:87`). And one item — Palettes — wears a `pastel-rainbow-text` one-off (`:97`, `utils.css:35`): a party trick where the systemic chromatic grammar should be (S-12 superfluity class).
**Verdict + spec**: ONE voice for the dock: the view-select trigger (icon + ring + open-state ring) speaks `--accent-view`; each MENU item's dot+icon speaks ITS OWN view hue (the menu becomes the color-wheel legend of the navigation — a genuinely atlas-plate move, and it previews P1-4's gamut-guarded tokens); Tools/Login stay live-accent (they're app chrome, not navigation). Kill the rainbow one-off.
**Route**: value.js demo (`DockViewSelect.vue`, `Dock.vue`).

### P1-6 · The view-select moment lands into a frozen frame (S-9 beat #1, measured)

rAF frame profile across a picker→palettes switch (1440, dev build): **first post-click frame 254.7ms**, then 71.4 / 70.9 / 51.0 / 40.8ms; 16 frames >28ms within 2.5s; one 62ms longtask. The choreography R.W4 shipped — trigger icon `vj-morph`, dock `vj-settle` scale beat (`Dock.vue:84-91`), `--view-hue-shift` sweep, pane travel — all fire INTO the stall (cold KeepAlive mount of the incoming pane), so the settle beat renders as a stutter, not a spring. The moment as-landed: well-designed grammar, eaten by the mount.
**Design verdict** (mechanisms → perf lane): the beat must be SEQUENCED, not simultaneous — dock settle + icon morph first (they're cheap), pane mount deferred one frame behind the travel start; or the settle beat keys off mount-complete. A moment that drops a quarter-second is worse than no moment.
**Route**: value.js demo (PaneSlot/usePaneRouter mount scheduling); perf lane owns the mount-cost mechanism.

### P1-7 · Shell motion frame budget: expand/collapse and the ambient floor (S-9 beats #2/#3)

- Dock hover-expand morph: worst 41.4ms, 7/76 frames >28ms. Collapse window: 11 frames in the 30-33ms band. The one-spring orchestrator is right; the cost is backdrop-filter + width-relayout per frame (mechanism → perf lane).
- **Ambient**: even idle windows showed sustained ~30ms beats (aurora WebGL + blob RAF under dev). Directional, but matches the user's global S-9/S-23 report.
- **Named mechanism flag**: `style.css:177` puts `transition: --view-hue-shift var(--duration-panel)` on `:root` with the `@property` registered `inherits: true` (verified live: syntax `<number>`, inherits true). Every frame of every view-switch sweep invalidates inherited custom-property style on the WHOLE document (every `--accent-view`/`--primary` consumer re-resolves). Design wants the hue to sweep; the plumbing shouldn't tax the tree. With P1-4's JS-side per-view tokens the sweep becomes one animated token on the few painted consumers.
**Route**: value.js demo (style.css); measurement/cure → perf lane.

### P1-8 · "@MBABB" — the wordmark is being eyebrow'd (S-5 verified + rooted)

The markup authors lowercase `@mbabb` (`ProfileSection.vue:99-101`) but the class `text-mono-caption` is glass-ui's EYEBROW utility — mono · caption · **uppercase** (`glass-ui/src/styles/typography/utilities.css:42,126`). A personal wordmark is not a section eyebrow; the uppercase + tracking reads as generic labelware (visible in every dock screenshot).
**Route**: value.js demo (`ProfileSection.vue:99`) — use a non-transforming mono utility (`text-mono-small` + size tune); glass-ui unchanged (the eyebrow utility is correct for eyebrows).

### P1-9 · Dock furniture off-register / generic (taste P1s)

1. **Login/Profile are hand-rolled `<button>`s** with 15-utility Tailwind piles (`ProfileSection.vue:42-47, 84-92`) instead of the glass-ui `<Button>` the codebase already migrated PaletteSlugBar to (G.W2 Lane F; S-17/S-21 discipline). Route: value.js demo.
2. **Two chevrons, two grammars**: "Home ⌄" (a Select) sits beside "Tools ⌄" (a BUTTON that swaps the whole dock layer, `Dock.vue:153-175`). Identical affordance, divergent behavior — the chevron on Tools promises a dropdown it doesn't open. Either Tools becomes a real popover or loses the chevron and gains the layer-swap affordance (e.g. the back-arrow motif it already uses inside). Route: value.js demo.
3. **Tools comes and goes**: the toggle-slot animates 0fr↔1fr off `actionBarContext` presence; across three same-view loads this session the dock rendered with and without Tools (measured `action-bar-toggle-inner` sw 86/cw 0 vs visible) — load-order-dependent furniture erodes the instrument read. Route: value.js demo (`usePaneRouter` actionBar timing).
4. **The collapsed-state text** (P0-1) and the **"— 06 / 16" dropdown counters** (S-14, picker-card lane owns the component; the shell verdict stands: ordinal counters are inventory-clerk furniture on an atlas plate — excise).
5. **Menu surface**: `SelectContent` is glass (`glass-reveal`, blur 13px — good) but the content root computes Jakarta with Fraunces only via a group class, and the `[&>span]:line-clamp-none` cancel-hack on the trigger (`DockViewSelect.vue:54`, Ad-18 marker) still awaits the filed glass-ui `clampLabel` prop (coordination/Q.md §3). Route: glass-ui producer (the filed ask), demo cleanup after.

---

## P2 findings

- **P2-10 · Header/nav horizontal usage**: dock 350×65 = 24.3% of 1440w, centered, `top-dock-inset`; the pill grammar is right for the register and the top corners' negative space reads intentional — **no additive fix**; do NOT grow the dock (S-12 excision instinct applies). The real horizontal waste the user senses is in-card (S-19, picker lane). At 390px the dock is 80% width and over-full (P0-2).
- **P2-11 · Pane plate grammar split (S-20 shell-level)**: left picker = cartoon-offset card; right About = flat squared sheet bleeding past the viewport fold with no offset shadow (`desktop-1440-light-picker.png`). One shell, two plate grammars. Route: value.js demo (`panes/` shell) — one cartoon-glass plate grammar at the PaneShell root, per S-21.
- **P2-12 · Dark scheme field inversion**: in dark mode the aurora field stays bright pink (`desktop-1440-dark-picker.png`) — dark plates float on a light field, inverting the scheme's depth logic; `--accent-live` correctly flips to the raw bright pick (`lab(92% 88.8 20)`). Route: value.js demo `useAtmosphere` (scheme-aware L ramp on the aurora atoms) — coordinate with the aurora lane (S-18).
- **P2-13 · Pane travel design**: the `vj-enter` travel (±110% slide + ∓2° cartoon swagger, opacity pinned, App.vue:296-305) reads RIGHT for the register mid-flight (`pane-swap-mid-*.png`) — keep; the simultaneous-mode co-mount never jumped layout in probes. The defect is P1-6's stall, not the choreography.
- **P2-14 · Collapse-at-rest variance** (needs repro): one load rested `collapsed` ≤1.5s after mount; an isolated re-run stayed `expanded` >6.6s with the pointer parked away (collapse-delay 5000). Non-deterministic first-rest. Route: glass-ui `useDockState` initial-timer semantics — file with repro if the perf lane's traces catch it.

## Candidate wave items

| Item | Covers | Root |
|---|---|---|
| W-DOCK-COLLAPSED-SEAL — collapsed = WatercolorDot seal + inked view icon, no text/chevron | P0-1 (S-8, S-7) | value.js demo `Dock.vue` |
| W-DOCK-MOBILE-FIT — mobile main-layer grammar cut + visible-overflow producer ask | P0-2 | demo + glass-ui ask |
| W-GLASS-LUMA-TRUTH — sampler must not read unreadable canvas as luma 0 | P0-3 | glass-ui producer |
| W-ACCENT-VIEW-GAMUT — per-view accents via library gamut-map + safe-guard; menu speaks per-view hues; one dock voice; kill rainbow one-off | P1-4, P1-5 | demo consuming value.js src |
| W-SWITCH-SEQUENCE — sequence the view-select moment around the mount; scope the hue-sweep invalidation | P1-6, P1-7 | demo (+ perf lane) |
| W-DOCK-FURNITURE — @mbabb case, glass-ui Button adoption, Tools grammar, clampLabel (filed) | P1-8, P1-9 | demo + glass-ui (filed) |
| W-PANE-PLATE-UNIFY — one cartoon-glass plate grammar at the PaneShell root | P2-11 (S-20) | demo panes/ |
