claude-opus-5[1m]

# CHALLENGE · ChromeDock · axis D (DESIGN) — edition R2 (supersedes R1, folds it whole)

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/app/dock/ChromeDock.vue` (385 lines)
**Mode** static, read-only, source-derived. No installs, no dev server, no browser tooling. Livable-only claims marked `UNPROVEN-NEEDS-LIVE`.
**Date** 2026-08-04. Installed glass-ui **7.0.0** (`node_modules/@mkbabb/glass-ui/package.json`).
**Posture** the component is assumed DEFECTIVE until the tree proves otherwise; every claim carries its own falsifier and dies if the falsifier holds. Superlatives carry falsifiers too (L-18 runs both ways).

> **Edition note.** An R1 pass (same axis, same served model) filed D-1 … D-17 + S-1 … S-4 at this path. This edition **re-verified every R1 claim against the tree independently** and preserves the ID space so R1 citations stay resolvable. R2 adds D-18 … D-29 and S-5, and reconciles two places where R1 and R2 disagree (**D-19 vs S-1/D-8**, and **D-24 vs S-3**) explicitly rather than silently. Where R1's formulation is stronger than R2's independent one, R1's is kept and said so.

---

## Read set (whole-file, read-only)

| file | why |
|---|---|
| `demo/app/dock/ChromeDock.vue` | target |
| `demo/app/dock/MbabbMenu.vue`, `demo/app/dock/index.ts` | the `#items` slot occupant + barrel |
| `demo/app/App.vue` (1–70, 144–200, 315–345) | the sole host; prop/slot bindings; the `#backdrop` aurora |
| `demo/components/instrument/transport/injectionKeys.ts` | `CONTROLS_PANE_HOVER_KEY` |
| `demo/components/instrument/surfaceTabs.ts` (whole, 42 L) | `SURFACE_META` + `dockCardinality` **as imported by ChromeDock** |
| `demo/state/controlSurfaces.ts` (whole, 310 L) | `BUILT_IN_SURFACES` + the *other* `SURFACE_META`/`dockCardinality` |
| `demo/app/scene/scenes.ts` + `assets/icons/*.svg` | the `scene.icon` payloads |
| `demo/components/instrument/transport/controls-pane/ControlsPaneWrapper.{vue,css}` | what the toggle actually toggles (mobile = `bottom:0` Drawer) |
| `demo/styles/{style,layout,design-idioms}.css` | `--dock-top-anchor`, `--dropdown-min-width`, `icon-*` utilities, the z-contract |
| glass-ui `dist/`: `dock.js`, `dock.d.ts`, `components/dock/**` (`GlassDock`, `DockTrigger`, `DockControl`, `DockSeparator`, `useDockShellProps`, `constants`, `styles/{density,layers,layer-group,controls,controls/{triggers,icon-button,touch-floor},overflow,shell,shape}.css`), `components/select/*.d.ts`, `components/status-dot/StatusDot.vue.d.ts`, `status-dot.js`, `components/_shared/feedback.d.ts`, `styles/tokens/sizing.css`, `styles/typography/semantic.css`, `glass-ui.css` | the consumed contract |
| `node_modules/reka-ui/dist/Select/SelectTrigger.cjs` | `role="combobox"` confirmation |

## Resolved system constants — the arithmetic every geometry claim uses

`GlassDock` resolves `size ?? "md"` (`dock.js:516`); `--ui-scale: 1`, `--dock-scale: 1`.

| token | fine pointer | coarse pointer (`overflow.css` `@media (pointer: coarse)`) |
|---|---|---|
| `--dock-control-size` | **40px** | **44px** (`--dock-touch-target` floor) |
| `--dock-layer-height` | 40px | 44px |
| `--dock-layer-gap` | **6px** (0.375rem) | 4.68px |
| `--dock-icon-glyph` = `--dock-control-glyph-size` | **20px** (ratio 0.5) | **22px** |
| `dock-label` size = `--dock-control-size × --dock-label-ratio (0.5088)` | **20.35px** | 22.4px |
| `--dock-trigger-icon-size` (SelectTrigger chevron) | **12px** | 12px |
| `--dock-trigger-padding-inline` | 0.5rem × `--dock-scale` | scaled |
| `--dock-separator-height` = `--dock-h × 0.5`; `--dock-h = 40+12+3` | **27.5px** | — |
| `.dock-separator` margin (`layer-group.css`) | `0 6px` | `0 6px` |

Demo `@utility` ladder (`design-idioms.css:97–119`): `icon-xs 14 · icon-sm 16 · icon-md 20 · icon-lg 24` px.
glass-ui `--icon-*` tokens (`styles/tokens/sizing.css`): `xs 12 · sm 14 · md 16 · lg 20 · xl 24` px.

## Hitherto corpus folded

- **F-1** (`lane-frontend.md:15, 54`) — glass-ui is a phantom dependency: installed 7.0.0, absent from `package.json` **and** `package-lock.json`. **D-1 is F-1's first proven visual casualty.** R2 adds a second, independent provenance line for it: `docs/tranches/K/audit/layout-grid-k.md:50` (row **C4**) records `--dock-margin` as *"glass-ui `tokens.css:1304` · `0.5rem` · P2 / cross-repo"* — corroborating R1's citation of `K.W3.md:113,349`. Two separate K-lane artifacts agree the token was inherited, never owned. **Consequence for F-1's remediation order** (`lane-frontend.md:612`, "F-1 first — nothing below is reproducible until this lands"): it should read *F-1 first, **then a `--dock-*` / `--icon-*` / `--dropdown-*` shadow-token audit***, because D-1 and D-5(c) show the shadowing is load-bearing and has already failed silently once.
- **lane-frontend §6.3** — "98 unprefixed demo custom properties sharing a global namespace with glass-ui's … **no `--kf-*` namespace exists**." **D-5(c) instantiates it** with a measured uniform one-rung offset. R2 adds the policy citation that makes it deliberate: `layout.css:8–10` — *"Geometry tokens — **OUTSIDE `@layer`** so they override glass-ui's incidental same-named tokens (authoritative for the demo)."* The shadowing is a stated policy, not an accident, which is why D-1 was undetectable.
- **lane-frontend §6.5** — 13 PRM sites, none in `app/dock/`. Confirmed and **exonerated** (S-2): ChromeDock authors zero local motion. R2 independently re-verified glass-ui's side: `dock.js:423, 911` both instantiate `useMediaQuery("(prefers-reduced-motion: reduce)")`, and five dock stylesheets ship `@media (prefers-reduced-motion: reduce)` arms.
- **lane-frontend §4 / :170** — ChromeDock listed at 385 lines, glass-consuming, `GlassDock`/`DockControl`/`DockTrigger`/`DockSeparator` + `StatusDot` + `Select*`. Confirmed verbatim.
- **lane-frontend:460** — repeats the "the demo's icon seam themes via `currentColor`" narrative (echoing `ChromeDock.vue:36–37`). **Contradicted by the tree — D-3.** Zero of the six scene glyphs consume `currentColor`.
- **S-1/S-2** (`lane-frontend.md:264, 308, 613`) — the `KfPillTabs → SegmentedTabs` swap, whose *secondary* claim is flagged as *"a **design** argument that the 7.0.0 aria fix does not by itself answer."* Adjacent, one control over: **D-20** is the same species — glass-ui ships the semantic (`DockControl`'s `active` → `aria-pressed` + the `.glass-capsule` seat) and the consumer declines it. Whatever S-1 rules about role/state selection should bind D-20's toggle too.
- **S-8** (`lane-frontend.md:387`) — `TypingDots` is JUSTIFIED BESPOKE. **Contrast case:** D-5, D-22 and D-24 are the opposite verdict — bespoke choices that are *not* justified, because glass-ui ships the affordance and the consumer overrode it.
- `lane-library.md` (parse seams) — no overlap; ChromeDock consumes no parser surface.

---

## Verdict

| | R1 | R2 adds | total |
|---|---|---|---|
| **BLOCKER** | 1 | 1 | **2** |
| **MAJOR** | 4 | 5 | **9** |
| **MINOR** | 9 | 3 | **12** |
| **INFO** | 3 | 3 | **6** |
| **defects total** | 17 | 12 | **29** |
| **superlatives** | 4 | 1 | **5** |

**Cheapest kills for the SS-13 live pass — three observations decide six findings:**
1. `getComputedStyle(document.querySelector('[data-dock-tether=top]')).top` → kills or confirms **D-1**.
2. one Tab-order walk with the dock collapsed → kills or confirms **D-18**.
3. one screenshot of the open scene menu at DPR 1 and DPR 2, plus one of the *easing* scene's dock row → kills or confirms **D-2**, **D-4**, **D-19**, **D-24**.

---

# BLOCKER

## D-1 · The dock's sole positioning declaration is invalid-at-computed-value-time: `--dock-margin` no longer exists

**BLOCKER** · `ChromeDock.vue:216` · `demo/styles/layout.css:113–118, 78–96, 128–136, 159–166, 197–208` · **R1, ratified by independent R2 re-verification**

ChromeDock positions itself with exactly one declaration:

```html
<!-- ChromeDock.vue:213-217 -->
<div data-dock-tether="top"
     class="fixed left-1/2 -translate-x-1/2 z-dock flex items-center justify-center pointer-events-none"
     style="top: var(--dock-top-anchor);">
```

```css
/* layout.css:113-118 */
--dock-top-anchor: calc(
    min(max(var(--work-area-top-offset,0px), env(safe-area-inset-top,0px)),
        var(--dock-anchor-ceiling))
    + var(--dock-margin) / 4          /* ← */
);
```

**`--dock-margin` is defined nowhere in the resolution graph.** R2 re-ran the census independently and reproduces R1 exactly:

```
$ grep -rn "dock-margin" --exclude-dir=.git .           → 72 hits repo-wide (incl. node_modules)
                                                          9 consumption sites in demo/ (layout.css:80,92,117,135,161,166,204;
                                                          TransportDock.vue:389,395); the rest is docs/ prose
$ grep -rn -- "--dock-margin:" --exclude-dir=.git .      → 0 definitions, anywhere
$ grep -r "dock-margin" node_modules/@mkbabb/            → 0
$ grep -rho -- "--dock-[a-z0-9-]*:" node_modules/@mkbabb/glass-ui/dist/ | sort -u
                                                        → 60 --dock-* names; --dock-margin is NOT among them
$ grep -rn "@property" demo/styles/*.css                 → design-idioms.css:60 registers only --rail-width
$ ls tailwind.config* postcss.config*                    → none
$ grep -rn 'setProperty("--dock' demo/ src/              → 0
$ grep -c "dock-margin" demo/app/index.html              → 0
```

Two independent tranche records confirm it was **inherited, never owned**: `K.W3.md:113,349` and `docs/tranches/K/audit/layout-grid-k.md:50` (row C4), both citing glass-ui `tokens.css:1304 = 0.5rem`. It is gone from 7.0.0. Nothing declared it, so nothing flagged the removal — **this is F-1's cost, made concrete.**

**The cascade consequence is decidable from spec** (css-variables-1 §2.1, §3.2):

1. `var(--dock-margin)` has no fallback → substitutes the guaranteed-invalid value.
2. A custom property whose value contains a failed `var()` substitution is invalid-at-computed-value-time → **`--dock-top-anchor` computes to the guaranteed-invalid value.**
3. `top: var(--dock-top-anchor)` is therefore IACVT; `top` is not inherited → it computes to its **initial value, `auto`**.
4. `top: auto` on a `position: fixed` box resolves to the **static position**; the wrapper is the first flow child of the app root (`App.vue:4`, inside a renderless `TooltipProvider`), `body { margin: 0 }`.

The dock therefore loses simultaneously the `--dock-margin/4` breathing room, the golden optical offset (`--work-area-vertical-bias-top: 0.382`), the `--dock-anchor-ceiling` clamp, and — worst — **`env(safe-area-inset-top)` notch clearance**. The `@supports (anchor-name)` desktop tether (`layout.css:159–162`) is not a rescue on two counts: its own `top:` contains `var(--dock-margin)/4` and is equally IACVT, **and** the inline `style=` at `:216` outranks any stylesheet rule regardless.

**Blast radius** (same root, outside this component but noted): `--dock-band-reserve` (`:78`), `--dock-band-reserve-stable` (`:90`), `--dock-bottom-anchor` (`:128`), `--dock-menubar-reserve` (`:103`), `--dock-top-band-reserve` (`:119`), `--dock-top-anchor-stable` (`:197`) all carry the term. Below 1024px the mobile override re-declares `--work-area-max-height` **through** `--dock-band-reserve` (`:183`), so the whole `--work-area-height → --work-area-vertical-slack → --work-area-*-offset` chain goes IACVT in sequence — the mobile optical system, not merely the anchor addend.

**Culpability is ChromeDock's too, not only layout.css's.** Line 216 consumes a token it does not own **with no `var(…, fallback)`**. One fallback would have bounded the blast radius to "wrong spacing" instead of "no anchor". Note the tragedy: the thing D-1 voids (see the S-5 note) is the best proportional reasoning in the read set.

**Falsifier.** Any runtime-reachable definition of `--dock-margin` — a `:root` declaration in a sheet not read, an `@property` with `initial-value`, a `setProperty` call, an inline `<style>` in the served HTML, a glass-ui build artifact shipping it. Any one kills this outright. Six independent probes (repo source, whole `node_modules`, `@property`, tailwind config, `setProperty` call sites, served HTML) returned empty across two passes.
**`UNPROVEN-NEEDS-LIVE`:** the rendered y-offset of the static position. The *invalidity of `top`* is not — it follows from absence, by spec.

## D-18 · After 2 500 ms the app's only scene navigation becomes keyboard-unreachable

**BLOCKER** · `ChromeDock.vue:224, 225–345, 363–366` · glass-ui `dock.js:733, 817–838` · **R2**

```html
<!-- ChromeDock.vue:224 -->
<GlassDock ref="dockRef" :collapse-delay="2500" :start-collapsed="true" :fit-content="true">
```

No `always-expanded`; no `#persistent` / `#persistent-end` slot use — ChromeDock authors only `default` (225–345) and `collapsed` (363–366).

**Mechanism, entirely in the tree.** `dock.js:817–838` renders exactly two faces inside `.dock-layers`:

```
.dock-layer--full     inert = (V !== "full" && Z !== "full") || undefined   ← ChromeDock's #default:
                                                                             both SelectTriggers, the DockControl,
                                                                             the @mbabb DockTrigger
.dock-layer--summary  inert = (V !== "summary") || undefined, onClick       ← ChromeDock's #collapsed:
                                                                             no role, no tabindex, no name
```

`B = z ? "full" : "summary"` (`dock.js:733`), `z = alwaysExpanded || expanded`; `alwaysExpanded` is false, `startCollapsed` defaults **true** (`dock.js:520`) and ChromeDock asserts it. So from first paint, and again 2 500 ms after every hover exit:

- `.dock-layer--full` carries `inert` → **every** focusable inside leaves the tab order and the AX tree;
- `.dock-layer--summary` is a bare `<div class="dock-layer dock-layer--summary" onClick>` — `grep -n "tabindex" dock.js` returns hits only at `:1050` / `:1115` (the `DockLayer` roving-tabindex path), never on the summary; no `role`, no `aria-label`;
- GlassDock's `onFocusin` expander (`dock.js:801`) can never fire, because nothing inside is focusable to begin with.

**Net: the collapsed dock contains zero tab stops.**

`App.vue:4–26` mounts ChromeDock as the shell's only scene switcher (`@switch-scene="runSceneSwitch"`). The only other `runSceneSwitch` caller is `MbabbMenu`'s `onSceneRestore` (`MbabbMenu.vue:9, 92`) — share-URL restore, not navigation, and it lives inside the same inert layer. `grep -rn "switchScene\|runSceneSwitch" demo/` surfaces no alternate route control anywhere in the demo.

So a keyboard-only or switch-access user cannot change scenes, cannot open the controls panel, and cannot reach the `@mbabb` menu — at any moment after 2.5 s of pointer inactivity, which for a keyboard user is *always*. WCAG 2.1 **SC 2.1.1 Keyboard (A)**.

**This is ChromeDock's call, not glass-ui's.** `useDockShellProps.d.ts` ships `alwaysExpanded` as precisely this opt-out — *"the single opt-OUT of the collapse↔expand machinery"* — and the compiled default `collapseDelay` is **3600 ms** (`dock.js:516`), which ChromeDock shortens by 31 % (see D-13).

**Falsifier.** Any of: (a) a focusable descendant surviving in the collapsed dock — `#persistent`/`#persistent-end` sit **outside** `.dock-layers` (`dock.js:679–687`) and are exactly the escape hatch, but ChromeDock uses neither; (b) a document- or root-level keydown in glass-ui that expands on Tab — `dock.js` binds keydown only on `DockControl`'s press machinery, inside the inert layer; (c) `inert` unsupported in the target browsers (Chrome 102+, Safari 15.5+, Firefox 112+ all honour it); (d) a live tab-order walk that reaches the dock while collapsed. **(d) is the cheap kill.**

---

# MAJOR

## D-2 · The trigger glyphs are pinned to `--muted-foreground` and cannot follow the trigger's own hover/open ink

**MAJOR** · `ChromeDock.vue:242, 243, 251, 265, 292, 299, 313–316, 364, 365` · **R1, ratified**

glass-ui's `.dock-trigger` owns a four-state ink ladder (`components/dock/styles/controls/triggers.css`): a rest colour at `--opacity-icon-muted`, `:hover:not(:disabled) { color: var(--btn-hover-color, var(--foreground)) }`, and an open arm keyed on `[aria-expanded="true"] { color: var(--foreground) }` (R2 re-read the shipped `triggers.css` and confirms all three rules present).

The label (`<SelectValue/>`, a text descendant) **inherits** that ladder and brightens correctly. Every glyph inside the trigger carries an explicit `text-muted-foreground` — a *direct* `color` declaration in Tailwind's `utilities` layer, which orders after glass-ui's `components` layer and which inheritance can never beat. The glyph is **immovable** through all four states.

| element | resolved ink | contrast vs `--background: hsl(40 30% 98%)` |
|---|---|---|
| trigger **label**, rest | `hsl(24 10% 10%)` @ 0.8α | **9.01 : 1** |
| trigger **label**, hover/open | `--foreground` = `hsl(24 10% 10%)` | **14.5 : 1** |
| trigger **glyph**, *all states* | `--muted-foreground` = `hsl(30 22% 40%)` | **5.21 : 1** (reproduces the token file's own annotated figure — which validates the method) |

An icon+label lockup that must read as one unit opens at a 1.7× tonal split and *widens to 2.8×* the moment the pointer lands. The split is also inconsistent **within one row**: the collapse toggle's glyphs (`:334–339`) carry no `text-muted-foreground`, so they *do* track `.dock-icon-button`'s state ink. Two adjacent controls, opposite hover behaviour.

**Falsifier.** Show `.dock-trigger`'s state rules authored at a layer/specificity that defeats a `utilities`-layer `color` on a descendant — they are not; they set `color` on the *ancestor*, and inheritance never beats a direct declaration. Or show `text-muted-foreground` unreachable in the built demo CSS.
**`UNPROVEN-NEEDS-LIVE`:** the on-glass contrast figures above are computed against the flat page background; the dock is a live `backdrop-filter` plate over arbitrary scene content, so the *rendered* ratios need SS-13 (see D-23).

## D-3 · `text-muted-foreground` on scene glyphs is inert — the "everything themes via `currentColor`" claim is false for all six icons

**MAJOR** · `ChromeDock.vue:33–38` (the claim), `:242, :265, :364` (the inert class) · `scenes.ts:3–20` · `assets/icons/*.svg` · **R1, ratified**

`ChromeDock.vue:36–37` states a load-bearing design contract: *"…the dock renders `<component :is="scene.icon">` so the binding is single-sourced and **every survivor themes via `currentColor`**."*

| asset | payload | themes via `currentColor`? |
|---|---|---|
| `cube.svg` | `<svg 32×32><image width=32 height=32 image-rendering="pixelated" href="data:image/png;base64,…"/></svg>` | **no** — raster |
| `amiga.svg` | same shape | **no** — raster |
| `square.svg` | same shape | **no** — raster |
| `easing.svg` | `stroke="hsl(248, 88%, 71%)"`, `fill="hsl(248, 88%, 71%)"` | **no** — hardcoded literal |
| `spring.svg` | `stroke="var(--color-progress, currentColor)"` | **no** — `--color-progress` is defined (`style.css:163`), so the fallback never fires |
| `sequence.svg` | `stroke="var(--rainbow-violet\|blue\|cyan, currentColor)"` | **no** — `--rainbow-*` defined (`design-idioms.css:19–21`) |

R2 confirms the reversal is *deliberate and documented on the other side*: `scenes.ts:3–14` — *"The **EXPRESSIVE, COLORFUL** inline-SVG icon family (H.W10.S1/G1 — **reverses W5's monochrome `stroke="currentColor"` flip**)."* ChromeDock's comment is simply stale against the authority that owns the icons.

Three design-visible consequences:

1. **`text-muted-foreground` at `:242/:265/:364` is dead code on every scene glyph.** It encodes an intent that cannot land; a maintainer reading it believes the identity glyph is a muted-grey register. It is not.
2. **The dropdown mixes three theming regimes in one column** (`:263–267`) — three theme-frozen bitmaps, one hardcoded violet, two token-bound multicolour vectors. No single iconographic voice.
3. **R2 addition — the fallback is the odd one out.** The class *is* live on the Lucide `<Home>` glyph (`:243, :251, :365`), which renders `stroke="currentColor"`. So in the open scene menu one **grey** glyph sits among six **saturated** ones, on the row that is the navigation root — and grey-among-colour is the conventional *disabled* affordance. Home is also the landing scene, so this is the first dock a visitor sees.
4. `easing.svg`'s `hsl(248 88% 71%)` bypasses the demo's declared single accent authority (`style.css:121–136`, "THE VIOLET ACCENT AUTHORITY … ONE oklch family, BOTH themes") — a light-arm value frozen into an asset, unable to arm-swap in dark mode. It clears the 3:1 non-text floor in both arms (**3.47:1** light, **5.49:1** dark), so this is a token/identity defect, **not** a contrast defect; the contrast claim is declined.

**Falsifier.** Show that `?component` (vite-svg-loader, `convertColors:false` per `vite.config.ts`) rewrites `fill`/`stroke` literals or `<image>` payloads to `currentColor` at build — it does not; it wraps the markup verbatim in an SFC. Or show `--rainbow-*`/`--color-progress` undefined at the dock's cascade position, which would let two of six fall back.

## D-4 · Pixel-art scene glyphs are non-integer nearest-neighbour scaled, and rescaled *again* across the collapse morph

**MAJOR** · `assets/icons/{cube,amiga,square}.svg` rendered at `ChromeDock.vue:242, 265` (`icon-sm`) and `:364` (`icon-md`) · **R1, ratified + R2 DPR table**

Each of the three raster glyphs is a **32 × 32** bitmap with `image-rendering="pixelated"` — an explicit request for nearest-neighbour sampling; the author asserts pixel-grid integrity matters.

| CSS box | DPR 1 | DPR 2 |
|---|---|---|
| **16px** (`icon-sm`, expanded trigger + menu rows) | 0.5× — clean 2:1 | **1.0× — exact 1:1** |
| **20px** (`icon-md`, collapsed circle) | 0.625× — **fractional** | **1.25× — fractional** |

Nearest-neighbour at a fractional factor duplicates/drops source columns and rows unevenly: the grid shears and the glyph reads *broken* rather than *chunky*. So the expanded size is exactly right and the collapsed size is wrong at **both** common device-pixel ratios.

The collapsed pill is precisely where this bites, because it is the dock's **only** content at rest — and the component's own comment calls it the identity moment: `:355–359`, *"the collapsed content is now ICON-FORWARD: only the scene's colourful glyph … the scene's identity moment is the glyph, which is already the brand-voice pop."*

Compounding it: the **same** `currentIcon` component is 16px expanded (`:242`) and 20px collapsed (`:364`) — **+25 % across a shared-face crossfade** (`dock.js:733–745`, `outerCurrentLayer` / `outerLeavingLayer`). A shared element rendered at two sizes reads as a jump-cut, which is the one thing a morph exists to prevent.

**Falsifier.** Demonstrate that `.icon-md`'s `& svg { @apply size-5 }` (`design-idioms.css:108–113`) does not reach the `<image>` child's rendered box — it sets the `<svg>` box and the `<image width=32 height=32>` inside `viewBox="0 0 32 32"` scales with it, so it does. Or show a UA that snaps `image-rendering: pixelated` to integer ratios — none is specified to. Or show the three raster scenes never reach the collapsed face — `scenes.ts:136–160` places cube/amiga/square in `scenes`, and `:364` renders `currentIcon` for any of them.

## D-5 · Four glyph rungs in one dock row, none of them the dock's own; the demo `icon-*` utilities shadow glass-ui's `--icon-*` tokens one rung off

**MAJOR** · `ChromeDock.vue:242, 243, 251, 265, 292, 299, 313, 334–339, 364, 365` · `design-idioms.css:96–118` · glass-ui `styles/tokens/sizing.css`, `dock/styles/controls/icon-button.css`, `dock/styles/density.css` · **R1, ratified + R2 coarse-pointer arithmetic**

**(a) Four rungs, one row.**

| site | class / rule | px |
|---|---|---|
| `:242,:243` scene glyph — *rail-core, "identity LEADS"* | `icon-sm` | **16** |
| `:241,:291` both labels | `dock-label` | 20.35 |
| both chevrons | glass-ui `--dock-trigger-icon-size` | **12** |
| `:292,:299,:313` control-tab glyph — *contextual section* | `icon-md` | **20** |
| `:334–339` collapse toggle glyph — *nav, "NEVER leads — VERDICT #6"* | `icon-lg` | **24** |
| `:364,:365` collapsed pill glyph | `icon-md` | 20 |

The identity glyph is the **smallest** and a utility toggle the **largest** — the strict reverse of the file's own stated grammar (`:226–232`, `:321–325`). The rungs form no ladder either: 12→16→20→24 is ×1.333, ×1.25, ×1.20. The lead glyph is also 21 % smaller than its own label, while the subordinate section glyph matches its label.

**(b) None matches the dock's own rung, and the override breaks the density system.** `controls/icon-button.css` ships `.dock-icon-button > svg { width: var(--dock-icon-glyph, 1.25rem); height: … }`, and `--dock-icon-glyph = max(--dock-layer-height × 0.5, 1rem)` — **20px** fine, **22px** coarse, i.e. a ratio the system holds constant at 0.5. `icon-lg` lands in `@layer utilities`, which sorts after glass-ui's `@layer components`, so **24px wins**:

| pointer | capsule | system glyph (ratio) | ChromeDock glyph (ratio) |
|---|---|---|---|
| fine | 40px | 20px (**0.50**) | 24px (**0.60**) |
| coarse | 44px | 22px (**0.50**) | 24px (**0.545**) |

A ratio the system holds invariant **drifts with pointer type** because the consumer hard-codes both ends. The demo `icon-*` utilities are fixed `rem` literals that read neither `--ui-scale`, nor `--dock-scale`, nor the `--dock-control-floor` touch rung. The icon-button rule's own comment concedes the override is legal ("a DEFAULT, not a ceiling") — the *consequence* of exercising it is the drift above.

**(c) The namespace collision — lane-frontend §6.3 instantiated, measured.**

| stem | glass-ui token | demo utility | delta |
|---|---|---|---|
| `xs` | `--icon-xs: 0.75rem` (12) | `icon-xs` = `size-3.5` (14) | +1 rung |
| `sm` | `--icon-sm: 0.875rem` (14) | `icon-sm` = `size-4` (16) | +1 rung |
| `md` | `--icon-md: 1rem` (16) | `icon-md` = `size-5` (20) | +1 rung |
| `lg` | `--icon-lg: 1.25rem` (20) | `icon-lg` = `size-6` (24) | +1 rung |

A uniform one-rung offset under identical stems. Reading `icon-md` at `:292` and reaching for glass-ui's `--icon-md` yields 16px, not the 20px painted. Same hazard family as `--dropdown-min-width` (`layout.css:16`; glass-ui owns `--dropdown-text`, `--dropdown-input-height`, `--dropdown-icon-size` — not this one) and, fatally, `--dock-margin` (D-1).

**Falsifier.** A rule normalising the four rungs downstream (none: `icon-button.css` is the only dock glyph-size rule and it targets `.dock-icon-button > svg`, which the `<Select>` triggers are not), or a layer configuration placing glass-ui components after utilities (`style.css:1–15` imports `tailwindcss` first, glass-ui second, demo sheets third; Tailwind v4 `@utility` still emits into `utilities`).

## D-19 · The redundancy predicate is **false** on every live scene — the elision the whole T.B5 apparatus exists to perform never fires, and the arm it falls into is the ARIA-prohibited one

**MAJOR** · `ChromeDock.vue:116–134` (the claim + the predicate call), `:307–318` (the arm it lands in) · `surfaceTabs.ts:38–39` · `controlSurfaces.ts:149–154` · `scenes.ts:162–175` · **R2 — supersedes R1's reading in S-1 and D-8**

`ChromeDock.vue:118–120` asserts:

> "`1 ⇒ absent` when the sole tab's label is redundant with the scene identity the compass already shows (easing→"Easing", spring→"Spring" — **always true on the surviving scene set**)"

The predicate (`surfaceTabs.ts:38–39`) is a case-insensitive **string equality**:

```ts
const controlLabelRedundant =
    controlZone.kind === "inline" && !!input.sceneLabel &&
    controlZone.tab.label.trim().toLowerCase() === input.sceneLabel.trim().toLowerCase();
```

The comparands, from the tree:

| scene | `currentLabel` (`scenes.ts:163, 171`) | sole tab label (`SURFACE_META`, `surfaceTabs.ts:16–17`) | equal? |
|---|---|---|---|
| easing | **"Easing"** | **"Curve"** | **no** |
| spring | **"Spring"** | **"Physics"** | **no** |

The labels were deliberately changed at **T.E8 / item-7a** — `controlSurfaces.ts:149–152`: *"the scene-facet labels name the FACET, not the scene (the #17 cross-axis redundancy class: the scene-select already says Easing/Spring; the facet tab says what the surface IS — the Curve editor, the Physics instrument)."* That relabel is good design work, and it **silently disarmed the equality predicate that was written against the old labels.**

So on the easing and spring scenes: `controlLabelRedundant === false` → `controlZoneKind === "inline"` → `showControlSection === true` → `multipleControlTabs === false` → the render falls into the `v-else-if="inlineControlTab"` arm at **`:307–318`**, plus its flanking `<DockSeparator/>` at `:283`.

Three consequences, all design-visible:

1. **The elision never happens on any shipped scene.** The `absent` branch is reachable only via the count arm (`tabs.length === 0` → home, sequence); the *cross-axis redundancy* branch — the part the file calls the VERDICT #17 dup KILL, and the part R1's **S-1** singles out as "the genuinely rare part" — is dead on the live scene set.
2. **The comment at `:119–120` is false**, and it is load-bearing: it is the stated reason a future reader would not test the inline arm.
3. **It upgrades D-8 from latent to live.** R1 filed D-8 (`aria-label` on a `role=generic` div) as MINOR with the falsifier "the arm never renders on the surviving scene set." That falsifier **fails**: the arm renders on two of six scenes. D-8's a11y half is therefore live, and D-8's severity should be read as MINOR-live rather than MINOR-latent (kept at MINOR because a dropped `aria-label` on a correctly-textual element is low harm — the visible `<span>{{ label }}</span>` at `:317` names it fine for sighted and AT users alike).

**Where R1 and R2 disagree, and how it resolves.** R1's **S-1** praises the elision model, and its praise of the *model* stands (see the qualified S-1 below): `dockCardinality` is still a pure, single-sited, three-state function with a cross-axis clause, and `:283`'s placement inside the guard still removes divider-with-node. What does **not** stand is the implicit claim that the model is *achieving* its effect today. The model is sound; its predicate is stale. That is a maintenance failure filed against the component, not a retraction of the design.

**Falsifier.** A scene whose `currentLabel` is literally "Curve" or "Physics" (`scenes.ts:162–175` gives "Easing" and "Spring"); a normaliser or synonym table between facet labels and scene labels (`dockCardinality` has none — the whole function is 16 lines); or a `SURFACE_META` override for these two surfaces elsewhere in the cascade (`grep -rn "SURFACE_META" demo/` → the two registry definitions plus three importers, no overrides). **Cheap live kill:** navigate to `/easing` and look at the dock — if the row is `[Easing ▾] │ [∿ Curve]` this is confirmed; if it is `[Easing ▾]` alone, killed.

## D-20 · The panel toggle exposes no state at all; it encodes state by mutating its accessible **name**, and the dock's own selected-seat never paints

**MAJOR** · `ChromeDock.vue:327–341` · glass-ui `DockControl.vue.d.ts`, `dock.js:1149`, `controls/icon-button.css` · **R2** (supersedes and absorbs R1's D-9 second half)

```html
<!-- ChromeDock.vue:327-332 -->
<DockControl
    shape="icon"
    v-if="hasControlPanel"
    :aria-label="isControlsPanelOpen ? 'Close controls' : 'Open controls'"
    @click="emit('toggleControlsPanel')">
```

`DockControl.vue.d.ts` documents the affordance explicitly: *"`active?: boolean` — Selected/toggled state. **Stamps `aria-pressed` + `data-active`**; the icon shape composes the `.glass-capsule` selected seat."* ChromeDock passes neither `active`, nor `aria-pressed`, nor `aria-expanded`.

**(a) a11y.** In the AX tree this is an ordinary button whose *name* flips between two strings. A state-carrying accessible name is the documented anti-pattern: speech-recognition users target a name that has already changed ("click Open controls" fails the instant it opens), and SR users get no persistent state to query. The correct shapes for a disclosure/toggle are `aria-expanded` or `active`/`aria-pressed`; the markup has neither. The file **proves it knows this** — R1's D-9 notes the same file authors static names at `:241/:291` and a dynamic one here, i.e. it has two labelling policies; R2 sharpens the diagnosis: the dynamic one is not "the good one", it is the wrong mechanism for the job.

**(b) design.** `dock.js:1149` composes `.dock-icon-button glass-specular-track glass-capsule-hover`, adding `.glass-capsule` **only when `active`**. With `active` never true, the open controls panel has **no persistent seat on its own control** — the entire state signal is the glyph swap. glass-ui ships exactly the register for this (`--dock-control-active-bg`, `--dock-selected-accent = color-mix(in oklab, var(--foreground) 14%, transparent)`, with the documented rule *"selected reads as glass — never a saturated brand hue"*) and it is declined. A toggle with an invisible on-state is the single most common dock defect; this component has one, next to a `DockControl` API that solves it in one prop.

**Falsifier.** A wrapper or demo CSS stamping `data-active`/`aria-pressed` on this control (`grep -rn "aria-pressed\|data-active" demo/` → nothing on it), or an APG reading in which a name-mutating button is the recommended toggle pattern.

## D-21 · The two arms of one toggle use opposite icon conventions; the mobile arm points the wrong way

**MAJOR** · `ChromeDock.vue:333–340`, `:148` · `ControlsPaneWrapper.vue:22, 166, 282` · **R2**

```html
<template v-if="isMobile"> <ChevronUp v-if="isControlsPanelOpen"/> <ChevronDown v-else/> </template>
<template v-else">        <PanelLeftClose v-if="isControlsPanelOpen"/> <PanelLeftOpen v-else/> </template>
```

The **desktop** arm is *action*-conventioned and agrees with the `aria-label`: open → `PanelLeftClose` → "Close controls".

The **mobile** arm inverts it. The mobile controls surface is a **bottom-anchored Drawer**: `ControlsPaneWrapper.vue:22` — *"the Drawer is **pinned to `bottom:0`**"*; `:166` `import { Drawer, DrawerContent, DrawerTitle } from "@mkbabb/glass-ui/drawer"`; `:282` — *"The store open-fact ↔ the Drawer active detent. **Open ⇒ expanded; closed ⇒ peek.**"* For a bottom sheet the action glyphs are: closed → **up** (raise it), open → **down** (dismiss it). ChromeDock renders open → **up**, closed → **down** — i.e. an up-arrow labelled `aria-label="Close controls"` for a sheet whose close gesture is downward.

Under the alternative *state-indicator* reading (the chevron shows where the sheet is), the mobile arm is self-consistent — but then the desktop arm, inside the same `v-if/v-else` on the same control, is action-conventioned. **Either way one control speaks two grammars**, and one of the two contradicts its own accessible name.

**Falsifier.** Evidence the mobile controls surface expands *downward from the top dock* rather than rising from `bottom:0` (the tree says `bottom:0`); or a demo-wide convention doc electing the state-indicator reading for chevrons while keeping the action reading for panel glyphs — `demo/DESIGN.md` contains no such rule (checked).

## D-22 · The row gap is hand-rolled at `gap-2`, bypassing `--dock-layer-gap`, while the separators stay token-tuned

**MAJOR** · `ChromeDock.vue:225` · glass-ui `dock.js:817–830`, `layers.css`, `layer-group.css` · **R2**

```html
<!-- ChromeDock.vue:225 -->
<div class="flex items-center gap-2">
```

GlassDock already lays this slot out: `dock.js:817–830` wraps the `default` slot in `.dock-layers > .dock-layer.dock-layer--full`, and `layers.css` gives that layer `display:flex; align-items:center; gap: var(--dock-layer-gap, 0.375rem)`. By nesting one more flex row, ChromeDock reduces the system's gap to a **single child** (inert) and substitutes **8px** for the token's **6px** — a 33 % inflation that is invisible to `--dock-scale`, `--ui-scale`, and the coarse rung (4.68px).

The separators were **not** re-tuned: `.dock-separator { margin: 0 0.375rem }` (`layer-group.css`) is still keyed to the 6px token. Resulting gutters:

| | system intent | as built |
|---|---|---|
| item ↔ item | 6px | **8px** |
| item ↔ separator, each side | 6 + 6 = 12px | 8 + 6 = **14px** |
| **separator gutter : item gutter** | **2.00** | **1.75** |

`DockSeparator`'s stated purpose in its own d.ts is *"demarcates dock item GROUPS … for **affordance hierarchy**."* Widening the base gap while leaving the separator margin fixed compresses that contrast by 12.5 %: the divider reads less like a group boundary and more like another gap. The comment at `:226–232` claims the recut rides "glass-ui `DockSeparator` … zero hand-rolled dock-separator divs" — true of the divider, false of the rhythm it sits in. (This is the R1 comment's second half; the primitive is right, its metric is not.)

**Falsifier.** A demo declaration of `--dock-layer-gap: 0.5rem` — `grep -rn "dock-layer-gap" demo/` → **0 hits**. Or removal of the wrapper div, which makes `gap-2` moot and restores the token.

## D-23 · The dock floats over an animated `<canvas>` and does not tell the legibility observer

**MAJOR** · `ChromeDock.vue:224` (props bound) · `App.vue:45–47` · `HeroAurora.vue:24, 38` · glass-ui `useDockShellProps.d.ts`, `dock.js:713–718` · **R2**

`useDockShellProps.d.ts` documents `backgroundCanvas`: *"The **KNOWN** background-layer canvas the dock floats over (an aurora/blob `<canvas>`) — an element, a getter, or a CSS selector. When present, the observer downsamples it under the dock's box each settle (**the ANIMATED-backdrop case**); absent, it stack-walks the painted page background (**the static case**)."*

On the home route `App.vue:45–47` mounts `<HeroAurora />` into `EditorShell`'s `#backdrop`; `HeroAurora.vue:24, 38` renders glass-ui's `<Aurora>`, which paints into `.aurora-canvas`. ChromeDock is `fixed` at `z-dock` (40) directly over it (`ChromeDock.vue:215`). ChromeDock binds only `collapse-delay`, `start-collapsed`, `fit-content` (`:224`) — **no `background-canvas`**, and `dock.js:713–718` returns `null` when the prop is unset.

So on the app's landing route — the first surface every visitor sees, over a live animated field — the adaptive-legibility darkening runs the **static** stack-walk and reads the painted page background rather than the aurora actually beneath the dock. This is precisely the case the prop exists for, and it is one binding away. It also bounds D-2's contrast question: the figures there are computed against a flat background, and the aurora is what actually sits under the plate.

Credit where due: ChromeDock leaves `autoLuminance` at its default `true` (S-5), so the observer *runs* — it is just under-fed.

**Falsifier.** glass-ui auto-detecting a canvas under the dock without the prop (the d.ts states the opposite and `dock.js:713–718` confirms it), or `HeroAurora` painting to something other than a `<canvas>` (`glass-ui.css` `.aurora-canvas` says otherwise).
**`UNPROVEN-NEEDS-LIVE`:** the resulting contrast delta. The *wiring gap* is decided by the tree; the magnitude is not.

---

# MINOR

## D-6 · `[&>span]:line-clamp-none` is a no-op, and it advertises a label-truncation contract the dock does not have

**MINOR** · `ChromeDock.vue:241, 291` · **R1, ratified — R1's formulation is stronger than R2's independent one and is kept**

Both `<DockTrigger>` sites carry `class="dock-label [&>span]:line-clamp-none"`. There is **no `line-clamp` rule anywhere in the dock**: `DockTrigger` hosts **reka's** `SelectTrigger` directly (`dock.js:1222–1230` — `for === "select"` renders `ce` = reka `SelectTrigger`, never glass-ui's own `SelectTrigger.vue`, whose `[&>span]:line-clamp-1` is the rule being "overridden"). The override is cargo-culted from the wrong primitive.

The second half is the real cost. `triggers.css` sets only `white-space: nowrap` — no `max-width`, no `overflow`, no `text-overflow`. Combined with `:fit-content="true"` (`:224`) and `overflow` left at its `"grow"` default (*"content grows to fit then **overflows visibly past the cap**; nothing clips or scrolls"* — `useDockShellProps.d.ts`), **the dock label has no truncation contract at all**; the only width discipline left is `--dock-max-inline-size`, past which `.dock-scroll-x` flips the row to scroll. The longest live string is `"Matrix Controls"` (`surfaceTabs.ts:18`), and the demo already ships a mobile width-fit patch for exactly this failure class (`style.css:284–293`).

**Falsifier.** Any rule setting `line-clamp`, `max-inline-size`, or `text-overflow` on `.dock-trigger` or its `> span` in glass-ui 7.0.0; or a demo `--dock-max-inline-size` tuned for this dock (`grep -rn "dock-max-inline-size" demo/` → 0). **`UNPROVEN-NEEDS-LIVE`:** whether a live label reaches the cap.

## D-7 · The two adjacent dropdowns invert their glyph order

**MINOR** · `ChromeDock.vue:249–253, 263–267` vs `:298–302` · **R1, ratified + R2 measurement**

Scene items put the dot **first**: `StatusDot` → glyph → name (`:250–252`, `:264–266`). Control-tab items put it **second**: glyph → `StatusDot` → name (`:299–301`).

R2 measures the cost with the resolved sizes: with `gap-2` (8px), the scene row's text starts at 8 (dot) + 8 + 16 (glyph) + 8 = **40px** from the row's content origin; the controls row's at 20 (glyph) + 8 + 8 (dot) + 8 = **44px**. So the two menus differ in *both* column order **and** text-rail offset (4px), one separator apart, opened from adjacent triggers in the same pill. The selection dot loses its column; the eye has to re-find the state channel between menus; and the leading-rail idiom the scene list establishes (marker → glyph → name) is broken by its neighbour.

**Falsifier.** A design note ratifying the asymmetry, or a demonstration the two menus can never be compared (they open from triggers one separator apart in one dock row).

## D-8 · `aria-label` on a `role=generic` `<div>` — ARIA-prohibited **(now live, per D-19)**

**MINOR** · `ChromeDock.vue:307–311` · **R1, ratified; R2 kills R1's own falsifier**

```html
<div v-else-if="inlineControlTab" aria-label="Controls tab"
     class="dock-label dock-inline-tab flex items-center gap-2">
```

A bare `<div>` has implicit role `generic`; ARIA 1.2 §5.2.8.6 lists `aria-label`/`aria-labelledby` under **Prohibited States and Properties** for it. UAs are directed to ignore them; validators flag `aria-prohibited-attr`. The element is non-interactive and roleless, so the label names nothing — the adjacent `<span>{{ inlineControlTab.label }}</span>` (`:317`) already carries the text.

**R1 offered as its falsifier: "the inline arm never renders on the surviving scene set." D-19 kills that falsifier** — the arm renders on *easing* and *spring*, two of six shipped scenes. Severity held at MINOR because a dropped attribute on a correctly-textual element is low harm; but it is now a live defect, not a latent one, and the file's own comment (`:141–143`, "carried for T.B5 contract parity … never on the current scene set") is wrong about which scenes take it.

**Falsifier.** A `role` on the div that permits naming, or a scene set on which `controlLabelRedundant` is true (see D-19's falsifier).

## D-9 · Static `aria-label` on the two comboboxes vs a dynamic one on the sibling toggle — one component, two labelling policies

**MINOR** · `ChromeDock.vue:241, 291` vs `:330` · **R1, ratified; the toggle half is escalated to D-20**

reka's `SelectTrigger` renders `role="combobox"` (`node_modules/reka-ui/dist/Select/SelectTrigger.cjs`), and `DockTrigger` spreads `$attrs` onto it (`dock.js:1222`), so `aria-label="Scene"` lands on the combobox and sets its accessible **name**, removing `<SelectValue/>` from the name computation. Whether the current scene still reaches the user via the combobox's *value* is browser/AT-dependent for a non-`<input>` host, so that half is **`UNPROVEN-NEEDS-LIVE`** and is not claimed.

The decidable half is the inconsistency: the same file proves it can author a state-accurate label (`:330`) and declines to at `:241/:291`. `"Scene"` and `"Controls tab"` are *group* labels, not control names — better on a wrapping group, or dropped so the contents name the trigger. (R2 note: `:330`'s dynamism is itself the wrong mechanism — see **D-20** — so this is not "one good policy and one bad" but two different mistakes.)

**Falsifier / `UNPROVEN-NEEDS-LIVE`.** An AX-tree dump showing `AXValue = "Cube"` (or the scene announced alongside "Scene, combobox") kills the announcement half. The policy-inconsistency half survives it.

## D-10 · Phantom token: `var(--dock-label-padding-inline, 0.5rem)`

**MINOR** · `ChromeDock.vue:381` · **R1, ratified**

```
$ grep -rn "dock-label-padding-inline" demo/ node_modules/@mkbabb/glass-ui/dist/
  → demo/app/dock/ChromeDock.vue:381        (the only hit in either tree)
```

Defined nowhere; the fallback is the only value it will ever take. It presents as a themable seam and is a hardcoded `0.5rem`. glass-ui publishes the real seam for this exact measure — `--dock-trigger-padding-inline`, set per density rung in `density.css` and multiplied by `--dock-scale` — which is what would keep the inline arm's box in rhythm with the adjacent trigger, as `:373–379` claims ("It reads at the same inline height + padding a `DockSelectTrigger` occupies so the dock row keeps its rhythm"). At `md`/1× the two are equal by coincidence; they diverge at `sm` (0.4375rem), `lg` (0.625rem), `xl` (1rem), and on **any** coarse-pointer or `--ui-scale` device. **The claimed rhythm holds at exactly one density.** Same hazard family as D-1, caught here only by the fallback.

**Falsifier.** A reachable definition of `--dock-label-padding-inline`, or evidence `--dock-scale` is pinned to 1 (it is not — `--dock-coarse-scale: 0.78`, `--ui-coarse-scale: 1.5` are live in `sizing.css`, and `overflow.css` rescales on `pointer: coarse`).

## D-11 · The trailing `DockSeparator` is unconditional — the component violates its own elision doctrine

**MINOR** · `ChromeDock.vue:326` (cf. `:283` inside the guard) · **R1, ratified**

The leading separator is correctly gated inside `v-if="showControlSection"` (`:282–283`). The trailing one (`:326`) is not, while the group it introduces is `v-if="hasControlPanel"` (`:327`) plus `<slot name="items"/>` (`:344`). The doctrine the file states twice — `:118–125` and `controlSurfaces.ts:230–231` ("`absent` (0) draws NO node **AND** no flanking separator") — plus VERDICT #6 ("the superfluous divider") is not applied here. `hasControlPanel` is genuinely false on two live scenes (`home`, `sequence` → `[]`), so a host supplying no `#items` paints a 27.5px hairline with 14px of gutter and nothing after it.

The component is exported as a reusable dock (`index.ts:1`) with an *optional* slot and no slot obligation in `defineProps` (`:60–79`); its props doc explicitly contemplates other hosts (`:68–71`, "non-App hosts that don't drive the DFA"). The correct guard is one expression — `v-if="hasControlPanel || $slots.items"` — and GlassDock itself models the discipline (`dock.js:832, 838`: `$slots.persistent` / `$slots['persistent-end']` guards). glass-ui elides separators only under `overflow="wrap"` (`overflow.css`), not in force here.

**Falsifier.** Show `#items` is structurally mandatory. It is not: `App.vue:19–25` supplies it, nothing requires it. Or a `:last-child`/`:has()` elision rule for `.dock-separator` — none exists in any of `components/dock/styles/*.css`.

## D-12 · `shrink-0` asymmetry between the scene glyph and its `<Home>` fallback

**MINOR** · `ChromeDock.vue:242/243`, `:265/251`, `:364/365` · **R1, ratified**

Every branch pairs a `shrink-0` glyph against a fallback without it — three times, consistently:

```html
:242  <component v-if="currentIcon" … class="icon-sm shrink-0 text-muted-foreground" />
:243  <Home v-else                  … class="icon-sm text-muted-foreground" />          ← no shrink-0
:265  <component v-if="scene.icon"  … class="icon-sm shrink-0 text-muted-foreground" />
:251  <Home                         … class="icon-sm text-muted-foreground" />          ← no shrink-0
:364  <component v-if="currentIcon" … class="icon-md shrink-0 text-muted-foreground" />
:365  <Home v-else                  … class="icon-md text-muted-foreground" />          ← no shrink-0
```

Home is the app's **landing** scene, so the unprotected branch is the one a first-time visitor sees. Under flex pressure (the mobile width-fit at `style.css:289–292`, the `:fit-content` pill, coarse-pointer growth) the Home glyph is the one element in the row permitted to squash — and it squashes width-only, distorting the glyph. Compounds D-3(3): Home is already the only greyed glyph; it is also the only unprotected one.

**Falsifier.** `flex-shrink` set on the glyph elsewhere — `.dock-trigger` sets `flex-shrink: 0` on *itself* (`triggers.css`), not on children, and `.icon-sm` sets only `size-4`. **`UNPROVEN-NEEDS-LIVE`:** whether the row reaches shrink pressure in practice.

## D-13 · Two docks, two collapse clocks — 2500 ms vs 3600 ms

**MINOR** · `ChromeDock.vue:224` vs `TransportDock.vue:43` + glass-ui `dock.js:516` · **R1, ratified + R2 doc-drift note**

```
ChromeDock.vue:224    :collapse-delay="2500"
TransportDock.vue:43  <GlassDock :always-expanded="false" :fit-content="true">     ← no override → 3600
dock.js:516           collapseDelay ?? 3600
```

The top and bottom bands are co-visible on every desktop scene (`layout.css:107–136` anchors both). After a single pointer sweep across the stage they dissolve **1.1 s apart**, on a screen whose entire chrome idiom is a matched pair of glass pills. Nothing in the file justifies the 2500 — the prop is uncommented, unlike almost every other line here.

**R2 addition:** glass-ui's own JSDoc for the prop says *"Idle-collapse delay in ms (**default 2000**)"* while the compiled default is **3600** (`dock.js:516`). So 2500 was plausibly chosen against stale documentation, splitting the difference between a documented 2000 and an unknown real default. The demo has a token home for exactly this class of constant (`layout.css:13` — *"Recurring length homes (each routes a bracket-arbitrary literal to ONE token)"*) and does not use it. See also **D-18**: this literal is what sets the keyboard-unreachability window.

**Falsifier.** A design note ratifying an asymmetric collapse cadence, or a measurement showing the two bands are never simultaneously visible (they are).

## D-14 · `SURFACE_META` / `dockCardinality` exist twice; the dock and the in-panel strip read *different* copies

**MINOR** · `ChromeDock.vue:15–21` vs `ChannelControls.vue:248` · `surfaceTabs.ts:12–41` vs `controlSurfaces.ts:145–160, 278–309` · **R1, ratified**

```
ChromeDock.vue:18-21     import { SURFACE_META, dockCardinality } from "@components/instrument/surfaceTabs";
TransportDock.vue:237    import { dockCardinality }              from "@components/instrument/surfaceTabs";
ChannelControls.vue:248  import { … SURFACE_META … } from "@state";   → state/index.ts → controlSurfaces.ts:145
```

Two definitions of the label/icon registry and two of the cardinality function, in two modules, both self-describing as unique — `controlSurfaces.ts:141–144` ("**THE ONE SURFACE-METADATA REGISTRY** … both docks and the in-panel strip resolve every tab's `{label,icon}` from HERE") and `ChromeDock.vue:43–45` ("the {label,icon} metadata itself DERIVES from the ONE `SURFACE_META` registry"). R2 confirms `surfaceTabs.ts` is **not** a re-export: read whole (42 lines), every symbol is a local `const`/`function`.

This is a *design* hazard, not merely a code one: the duplicated payload is **user-facing copy and iconography** — the two most drift-prone design artifacts. The dock dropdown (`ChromeDock.vue:301`) and the in-panel tab strip (`ChannelControls.vue:302`) render the same surface's label and glyph **side by side on screen**, from independently editable sources. The T.E8 rationale for the facet labels lives only on the copy neither dock imports. The stated cure for the original triplication reduced three copies to two and updated the prose as if it had reached one.

**Falsifier.** `diff` the two `SURFACE_META` objects — identical today (`surfaceTabs.ts:12–19` ≡ `controlSurfaces.ts:145–160` modulo comments). A drift *surface*, not a present visual defect — hence MINOR. (D-19 shows the same divergence class has already bitten once, in the predicate that reads these labels.)

## D-24 · A health-status primitive carries the selection signal: `--success` green for the current row, a dashed "unknown" ring for every other

**MINOR** · `ChromeDock.vue:248, 250, 259, 264, 297, 300` · glass-ui `components/_shared/feedback.d.ts`, `glass-ui.css` (`FeedbackMark`), `DockControl.vue.d.ts` · **R2 — partially contradicts R1's S-3, which declined to file it**

All three `SelectItem` sites carry `hide-indicator` (`:248, :259, :297`), suppressing glass-ui's native check indicator, and substitute `<StatusDot :state="… ? 'online' : 'unknown'" />`.

glass-ui's vocabulary is explicitly a **health** axis: `STATUS_DOT_STATES = ["online","warning","error","unknown"]` (`components/_shared/feedback.d.ts`). The rendered paint (`glass-ui.css`, `FeedbackMark`):

```css
[data-state=online]  { --feedback-state-color: var(--success); }          /* filled disc + inner ring */
[data-state=unknown] { --feedback-state-color: var(--muted-foreground); }
[data-state=unknown]::before { background: 0 0; border-style: dashed; }   /* hollow, DASHED */
```

Two costs:

1. **Semantic colour.** The selected row's accent is `--success` — a hue reserved for success feedback — which directly contradicts the register the dock itself declares: `DockControl.vue.d.ts`, *"the `--dock-control-active-bg` 'selected reads as glass' tier — **never a saturated brand hue**, per W-REGISTER-IOS."* The token for this job exists and is unused: `--dock-selected-accent: color-mix(in oklab, var(--foreground) 14%, transparent)`.
2. **Dashed-as-unselected.** Five of six scene rows wear a *dashed hollow* ring — the conventional glyph for "state not established / indeterminate" — where the honest meaning is merely "not the current one". A menu reading "one scene healthy, six unknown" is a false signal about a set with no health dimension at all.

**Where R1 and R2 disagree, and how it resolves.** R1's **S-3** praises the triple encoding (hue + mark shape + weight) and explicitly declines to file the semantic stretch, on the ground that *"the rendered marks are a filled and a hollow dot, which is exactly right for the job."* R2 agrees with that half and it is why this is **MINOR, not MAJOR**: the filled/hollow *shape* contrast is correct, survives greyscale, CVD and forced-colors, and is the reason S-3 stands (see the qualified S-3 below). What R2 files is the *other* half — the **hue** (a reserved semantic green, against the dock's own written prohibition) and the **vocabulary** (a health enum standing in for a selection enum, with `hide-indicator` deliberately removing the primitive built for the job). Those are decidable from the tokens and the d.ts prose, independent of how the marks look.

**Falsifier.** A demo override remapping `[data-state=online]` away from `--success` in dock context (`grep -rn "feedback-state-color\|status-dot" demo/` → nothing); a kf design ruling electing status semantics for selection; or a demonstration that `--success` is not a reserved semantic hue in this system (`glass-ui.css` uses it for `[data-state=success]` check marks in the same primitive).

## D-25 · `SelectGroup` with no `SelectLabel` — an unnamed `role="group"`

**MINOR** · `ChromeDock.vue:247, 296` · **R2**

Both dropdowns wrap their items in `<SelectGroup class="dock-label">` with no `SelectLabel`. `SelectGroup` emits `role="group"`; an unnamed group adds an AX nesting level carrying zero information and is announced as a bare grouping boundary. The demo imports five `Select*` components (`:22–28`) and not `SelectLabel`. Either name the groups ("Scenes" / "Editor surfaces" — which would also give D-9's `aria-label="Scene"` a correct home) or drop the wrapper.

**Falsifier.** reka-ui omitting `role="group"` when unlabelled (it does not), or an AT that suppresses unnamed groups universally (they are announced by NVDA/JAWS as group boundaries).

## D-26 · `py-2 px-3` overrides the design system's item padding at three sites, in physical properties

**MINOR** · `ChromeDock.vue:248, 259, 297` · **R2**

glass-ui `SelectItem` ships its own padding; the demo overrides it identically at three call sites with a Tailwind literal rather than a token or a single class, and uses `px-` (physical) where the file's own scoped CSS correctly uses logical `padding-inline` (`:381`). Three copies of one spacing decision, none of which reads `--dock-scale` or any density rung — the same failure shape as D-5(b) and D-22, one layer down.

**Falsifier.** glass-ui `SelectItem` shipping zero padding (it does not — the override exists precisely because a default is being fought), or a demo token carrying `2/3` for menu rows (none).

---

# INFO

## D-15 · `easing` and `spring` share one glyph

**INFO** · `surfaceTabs.ts:16–17` / `controlSurfaces.ts:153–154`, rendered at `ChromeDock.vue:292, 299` · **R1, ratified**

```ts
easing: { value: "easing", label: "Curve",   icon: "Activity" },
spring: { value: "spring", label: "Physics", icon: "Activity" },
```

Two distinct surfaces resolve to the same `TAB_ICONS["Activity"]` (`ChromeDock.vue:52–58`). Wherever both are reachable in one dropdown the glyph column carries zero information and the icon is pure decoration. The naming work at `controlSurfaces.ts:149–152` was careful to make the *labels* name the facet rather than the scene; the iconography did not follow. (Note the irony with D-19: the label half of that same relabel is what disarmed the elision predicate.)

**Falsifier.** Prove `easing` and `spring` can never co-occur in one derived set — `surfacesFor` (`controlSurfaces.ts:95–120`) unions `facility.facets` and each scene declares its own, so today they do not. That makes this a latent hazard, which is why it is INFO.

## D-16 · The top dock rides `--z-dock`, which the z-contract documents as "the bottom dock band"

**INFO** · `ChromeDock.vue:215` · `demo/styles/style.css:32` · **R1, ratified**

```
style.css:32       --z-dock     :  40  the bottom dock band
```

The ordered-layer contract (`style.css:18–40`) is otherwise exemplary and single-sourced from glass-ui's scale. Its own prose simply does not name the top band, so the rung's documented meaning and its actual occupancy diverge. One word.

**Falsifier.** Any reading of the contract that already covers both bands — `:32` says "the bottom dock band", singular.

## D-17 · Zero `forced-colors` handling anywhere in the demo

**INFO** · `demo/` (whole tree) · mitigated by glass-ui `FeedbackMark` · **R1, ratified + R2 verification**

```
$ grep -rn "forced-colors" demo/    → (no output)
```

ChromeDock's state signals largely survive Windows High Contrast by delegation. R2 verified the mitigation in the **shipped** CSS: `glass-ui.css` `@media (forced-colors: active)` maps `--feedback-state-color: CanvasText`, sets `[data-state=unknown]::before { background: canvas }` and `[data-state=unknown]::after { background: canvastext }` with `forced-color-adjust: none` — so filled-vs-hollow survives; and `font-bold` (`:252, :266, :301`) is a non-colour channel. The demo-side gap is real but not ChromeDock-specific and is not loaded onto this component beyond the record. The one ChromeDock-owned surface with no forced-colors story is `.dock-inline-tab`'s `color: var(--foreground)` (`:384`) — which, per **D-19**, *does* render on two scenes.

**Falsifier.** A `forced-colors` block reachable from the demo cascade, or evidence the glass dock plate degrades acceptably (`adaptive-legibility.css` was not audited on this axis).

## D-27 · The mobile breakpoint is a hand-repeated literal

**INFO** · `ChromeDock.vue:148` · **R2**

`const isMobile = useMediaQuery("(max-width: 1023px)")` is one of **15** hand-repeated `1023px` sites in `demo/` (7 CSS, 3 JS/composable, plus prose). It is *consistent* today — including with `layout.css:180` and `ControlsPaneWrapper.css:40`, which is what makes D-21's mobile/desktop split coherent — but the value has no home. Two sibling files already write the tell in prose: `useControlsLayout.ts:56` and `ControlsPaneWrapper.vue:253` both say "the SAME 1023px". A shared constant (or a `matchMedia` on a CSS custom-media) would make the agreement structural.

**Falsifier.** A shared breakpoint constant these sites import (none exists), or a decision that the demo's breakpoints are deliberately per-site.

## D-28 · RTL is not supported anywhere in the demo; ChromeDock's specific exposures, recorded

**INFO** · `demo/` (whole tree) · `ChromeDock.vue:215, 248/259/297, 338–339` · **R2**

```
$ grep -rn 'dir="rtl"\|rtl:' demo/    → (no output)
```

This is a state-coverage gap, not a live defect, so it is INFO. Were RTL added, ChromeDock's exposures are exactly three: `px-3` at `:248/:259/:297` (physical — see D-26); `left-1/2 -translate-x-1/2` at `:215` (symmetric, safe); and `PanelLeftClose`/`PanelLeftOpen` at `:338–339` (direction-named glyphs for a rail that would move to the right — compounding D-21's convention problem). The scoped CSS at `:381` correctly uses logical `padding-inline` already.

**Falsifier.** Any RTL support in the demo, or a product decision that RTL is out of scope (which would make this a closed INFO rather than an open one).

## D-29 · Loading and error have no representation in the dock

**INFO** · `ChromeDock.vue:255–262`, `scenes.ts:104–124` · `App.vue:14, 336` · **R2**

Empty is total: `scenes: []` still yields a well-formed one-item Home menu (`:248–254` is outside the `v-for`). Loading has no representation — every scene is a lazily-imported chunk (`scenes.ts:104` `lazyScene`), and `@pointerenter="emit('warmScene', …)"` (`:261`) prefetches without surfacing any pending affordance, so a slow warm gives the trigger no state. Error has none at all: a `runSceneSwitch` failure (`useSceneTransition.ts:57`) leaves the trigger showing the destination label with no recovery path. Neither is a defect this axis can *call* without a product ruling — recorded for the state-coverage matrix, and noted as the flip side of S-4's genuinely good warming decision.

**Falsifier.** A pending/error affordance elsewhere in the shell that covers the dock's state (`EditorShell`'s skeleton covers the stage, not the dock).

---

# SUPERLATIVES

L-18 runs both ways. Five things this component does better than its peers — each with its own falsifier, and two of them explicitly **qualified** by R2 findings rather than quietly retracted.

## S-1 · The elision model is decided once, off-component, and removes the separator with the node — *qualified by D-19*

**`ChromeDock.vue:116–146, 273–319` + `surfaceTabs.ts:25–41`** · **R1, upheld with a qualification**

The near-universal failure mode for a contextual dock zone is to render a disabled single-option control, and — even when the control is elided — to leave its flanking divider behind. This component does neither. `dockCardinality` is a pure function over `(tabs, channels, sceneLabel)` returning a three-state zone **plus a cross-axis redundancy predicate**, and the render consumes it whole:

```
:282  <template v-if="showControlSection">
:283      <DockSeparator />        ← inside the guard; the node and its divider vanish together
:284      <Select v-if="multipleControlTabs" …>
:307      <div v-else-if="inlineControlTab" …>
```

The rare, correct part is comparing the sole tab's identity against the *adjacent* scene identity and rendering nothing on collision, rather than demoting to a static label. That is the right answer to "one option" and it is the answer most systems get wrong.

**Qualification (D-19).** The *model* stands; its *predicate* is stale. Because T.E8 relabelled `easing → "Curve"` and `spring → "Physics"`, the string equality never fires on the live scene set, so the cross-axis branch is currently dead code. The praise is for the design, not for a presently-achieved effect — and the fix is one comparand, not a redesign.

**Falsifier.** Find a scene where one non-redundant control surface renders a static label duplicating the scene name, or where an elided zone leaves a hairline. `:283`'s placement inside the guard makes the second impossible. (`:326`'s separator is *not* in a guard — D-11 — but it flanks no elided zone.)

## S-2 · Total motion delegation — zero local animation, so `prefers-reduced-motion` is honoured by construction

**`ChromeDock.vue:372–385`** (the entire `<style scoped>` block: three declarations — `padding-inline`, `white-space`, `color`; no `transition`, no `animation`, no `@keyframes`) · **R1, ratified by independent R2 verification**

Every moving part is glass-ui's: the collapse/expand aperture, the press spring, the chevron flip. R2 re-verified glass-ui's side in the **shipped** artifact: `dock.js:423` and `dock.js:911` each instantiate `useMediaQuery("(prefers-reduced-motion: reduce)")`, and five dock stylesheets (`crossfade`, `cta-seat`, `dock`, `shape`, plus `FeedbackMark`'s in `glass-ui.css`) ship `@media (prefers-reduced-motion: reduce)` arms.

lane-frontend §6.5 counted 13 PRM sites across the demo and **none** in `app/dock/`. That reads as a gap in a census and is in fact the opposite: there is nothing local to guard. This is the honest form of delegation — not a comment promising the library handles it, but *no local motion to handle*.

**Falsifier.** Any `transition`, `animation`, or JS-driven tween authored in ChromeDock. There is none.

## S-3 · Selection is multiply encoded and survives greyscale, CVD, and forced-colors — *qualified by D-24*

**`ChromeDock.vue:248–252, 297–301`** · **R1, upheld with a qualification**

```html
hide-indicator                                   ← native check suppressed
<StatusDot :state="… ? 'online' : 'unknown'" />  ← hue + MARK SHAPE (filled ring vs dashed hollow)
<span :class="… ? 'font-bold' : ''">             ← type weight
```

Three channels, only one of which is colour, so the state read survives greyscale, colour-vision deficiency and Windows High Contrast — R2 confirmed the forced-colors mapping in the shipped `glass-ui.css` (`online → CanvasText` filled; `unknown → canvas` hollow + `canvastext` centre dot), and `[data-motion]`'s pulse is disabled under PRM. reka supplies `aria-selected` independently, and `StatusDot` is passed **no `label`**, so `status-dot.js` emits `aria-hidden="true"` rather than announcing a redundant "online" — the correct use of that API.

**Qualification (D-24).** R1 declined to file the semantic stretch; R2 files half of it. The *mark shapes* are right and are why this superlative stands. The **hue** (`--success`, a reserved semantic green, against the dock's own written "never a saturated brand hue" rule) and the **vocabulary** (a health enum standing in for selection, with `hide-indicator` removing the primitive built for the job) are filed as MINOR. Good redundancy, wrong palette.

**Falsifier.** Show `font-bold` unreachable (it is generated), or `hide-indicator` unsupported in 7.0.0 (`SelectItem.vue.d.ts` declares `hideIndicator?: boolean`).

## S-4 · `@pointerenter` scene warming, and the home descriptor is correctly excluded from the loop

**`ChromeDock.vue:255–262` + `scenes.ts:126–190`** · **R1, ratified**

```html
:261  @pointerenter="emit('warmScene', scene.id)"
```

Each scene is a lazily-imported chunk (`scenes.ts:104`, `lazyScene`). Prefetching on dropdown hover collapses perceived switch latency to near-zero *without* a speculative fetch on mount — the correct latency/bandwidth trade, and a genuine perceived-performance **design** decision rather than an engineering one.

Separately, a structural trap avoided: `homeScene` is declared **outside** the `scenes` array (`scenes.ts:126–135` vs `:136`), so the explicit Home `<SelectItem>` at `:248` and the `v-for` at `:255` cannot double-render Home; and `currentIcon` (`:83–85`) searches only `props.scenes`, so home falls through to the `<Home>` fallback *by construction* rather than by a special case. Small, and easy to get wrong.

**Falsifier.** Show `homeSceneId` present in `scenes` (it is not — `HOME_SCENE_ID = "home"` at `scenes.ts:126`; the array's ids are cube/amiga/square/easing/spring/sequence), which would make `:248` a duplicate row.

## S-5 · `autoLuminance` correctly left at its default

**`ChromeDock.vue:224`** · **R2**

`GlassDock`'s `autoLuminance` defaults to `true` and is documented as *"default-ON for the dock — the surface most often over a live/bright backdrop … a dark-substrate consumer opts out."* ChromeDock is exactly that surface and declines to opt out — the right call, and one many consumers get wrong by disabling the observer to avoid its cost. The observer is rAF-throttled ≤ 4 Hz, IntersectionObserver-gated, and parks under PRM, so the cost is bounded. That D-23 shows it is under-*fed* (no `backgroundCanvas`) does not diminish the choice to leave it *on*.

**Falsifier.** Evidence that `autoLuminance` is harmful on this surface, or that ChromeDock disables it elsewhere (it binds only three props at `:224`).

> **A superlative filed against the *consumed* system, not the component, and therefore not counted.** `layout.css:53–136` is the best proportional reasoning in the read set: one named constant (`--phi`), a golden 0.382/0.618 vertical split, a deliberate `/4` vs `/φ` top-bottom asymmetry, a `--dock-anchor-ceiling` cap so the docks cluster to the *clamped card* rather than to unbounded viewport slack, `min()` nested **inside** `max(env(safe-area-inset-top))` so a notch still wins over the cap, and an `@supports`-gated anchor-positioning enhancement keyed on an explicit `[data-dock-tether]` opt-in rather than a `:has()` test on a utility class. **D-1 is a tragedy precisely because the thing it voids is this good.**

---

## Provenance

Every glass-ui claim is sourced from the **installed** `node_modules/@mkbabb/glass-ui/dist/` at 7.0.0 — compiled `dock.js` / `glass-ui.css` and the shipped `.d.ts` prose — not from a producer checkout, so every quoted rule is one the demo actually loads. Contrast figures are computed from light-arm token literals via WCAG 2.x relative luminance; the `--muted-foreground` figure reproduces the token file's own annotated 5.21:1, which validates the method. Resolved geometry is computed from `size ?? "md"` (`dock.js:516`) through `density.css` / `sizing.css` / `overflow.css`'s coarse arm, shown in the constants table above.

No file in keyframes.js, glass-ui, or value.js product source was written, mutated, or executed. No installs, no dev server, no browser tooling. This file is the only write.

**Queued for the SS-13 visual audit (`UNPROVEN-NEEDS-LIVE`):** D-1's rendered offset · D-2's on-glass contrast · D-6's actual overflow · D-9's AT announcement · D-12's shrink pressure · D-19's easing/spring dock row · D-23's contrast delta over the aurora.

**Edition history.** R1 — D-1 … D-17, S-1 … S-4. R2 (this edition) — re-verified all R1 claims independently against the shipped tree; added D-18 … D-29 and S-5; killed R1's own falsifier for D-8 via D-19; qualified S-1 (by D-19) and S-3 (by D-24); strengthened D-5 with the coarse-pointer ratio drift, D-13 with the glass-ui doc/code default divergence, and F-1's fold with the `layout.css:8–10` shadowing policy that made D-1 undetectable. Where R1's formulation was the stronger one — D-6's "wrong primitive" diagnosis, D-13's cross-dock framing, D-14's three-import table — R1's is kept verbatim and marked.
