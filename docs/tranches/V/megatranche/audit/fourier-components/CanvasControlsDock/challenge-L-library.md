claude-opus-5[1m] (served model id)

# CHALLENGE — `CanvasControlsDock.vue` · axis **L (LIBRARY)**

**Subject.** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/CanvasControlsDock.vue`
(132 lines; census row `formation/fourier/lane-frontend.md:93` — *"`GlassDock` + `DockIconButton` view controls"*).

**Posture.** The component is assumed DEFECTIVE until the tree proves otherwise. Every row below carries a
severity, a `file:line` receipt, and the falsifier that would kill it. **L-18 runs both ways** — §3's
superlatives carry falsifiers too, and §4 records four hypotheses I raised and then *killed* against the tree.

**Law observed.** `fourier-analysis` was read-only evidence; the single write of this lane is this file. No
browser tooling. One static execution was performed — `./node_modules/.bin/vue-tsc --noEmit -p tsconfig.json`
(non-`-b`, emits nothing; `tsconfig.tsbuildinfo` mtime unchanged at `Jul 13 15:10` after the run) — because a
typing claim I was about to file could only be settled by measurement. It was, and the claim died (§4.1).

**Read whole.** The subject + every import: `web/src/components/ui/tooltip/{index.ts,Tooltip.vue}`;
`@mkbabb/glass-ui@4.0.0` `dist/components/custom/dock/{GlassDock,DockIconButton,DockSeparator}.vue.d.ts`,
`composables/useDockShellProps.d.ts`, `dock/index.d.ts`, `components/custom/hover-popover/HoverPopover.vue.d.ts`,
the compiled `dist/dock.js`, and the dock style authority `dist/styles/dock.css` + `dist/styles/dock/*.css` +
`dist/styles/dock-controls/icon-button.css` + `dist/styles/tokens/offsets-sizing.css`;
`lucide-vue-next@1.0.0/dist/esm/defaultAttributes.js`; `reka-ui/dist/Tooltip/TooltipTrigger.js`. Plus the
consumer seam `VisualizationView.vue`, the composable it reflects (`composables/useViewState.ts`), the two
stores its emits reach (`stores/workspace.ts`, `stores/gallery.ts`), the render path it touches
(`BasisCanvas.vue`, `FullscreenViewer.vue`), the two sibling docks (`EditorControlsDock.vue`,
`AnimationControls.vue`), and `web/e2e/gallery.spec.ts`.

**Corpus folded (not re-invented).** `formation/fourier/lane-frontend.md` §2 inventory, §5 removed-surface
table (`:474`, `:475`), §6 render path (`:512-556`), §7 priorities; `formation/fourier/CENSUS-2026-08-03.md`
§3a/§5; and the adjudicated intake `audit/codex-provenance/intakes/lane-fourier-r3-r6.md` rows **R3-7a**,
**R3-10**, **R5-7**. Overlaps are cited by row id; one census figure is **confirmed exactly** (§5.1) and one
carry is explicitly *cleared* for this file (§5.2).

---

## §1 — Tally

| severity | count | ids |
|---|---:|---|
| BLOCKER | **1** | L-1 |
| MAJOR | 6 | L-2 … L-7 |
| MINOR | 8 | L-8 … L-15 |
| INFO | 3 | L-16 … L-18 |
| **defects** | **18** | |
| superlatives | 8 | S-1 … S-8 |
| hypotheses refuted by their own falsifier | 4 | §4 |

---

## §2 — Defects

### L-1 · BLOCKER — the Publish control is re-entrant; N clicks during the in-flight window create N public gallery rows

**Provenance.** `CanvasControlsDock.vue:70-74`:

```
<Tooltip v-if="hasContour" text="Publish to Gallery" side="bottom">
    <DockIconButton :class="{ 'is-active': publishing }" @click="$emit('publish')">
        <Upload class="h-4.5 w-4.5" :class="{ 'animate-pulse': publishing }" />
```

The component **receives** `publishing: boolean` (`:16`) and spends it entirely on paint — an `is-active`
class and an `animate-pulse` — while leaving the button **enabled and clickable** for the whole async window.

**Chain (every hop verified in the tree).**
`VisualizationView.vue:106-118` `handlePublish()` has **no re-entry guard**: its only early return is
`if (!store.imageSlug || !store.contour) return;` (`:107`); `publishing.value = true` is set *after* it, and
nothing rejects a second call. → `store.createSnapshot()` (`:110`) is `createSnapshot: saveVisualization`
(`stores/workspace.ts:460`), and `saveVisualization` (`:344-365`) unconditionally calls
`api.createVisualization({ visibility: "draft", … })` — **a POST that mints a new slug on every call**; there
is no idempotency key and no existing-slug reuse. → `gallery.publish(snapshot.slug, …)`
(`stores/gallery.ts:219-235`) PATCHes *that* slug to `visibility: "public"` and toasts `"Published!"`.

Two clicks ⇒ **two distinct draft visualizations ⇒ two distinct public gallery rows ⇒ two success toasts**,
from one user intent. This is persisted-data corruption, not a cosmetic race.

**The substrate already paid for the fix.** `DockIconButton` renders a real `<button>` host by default
(`DockIconButton.vue.d.ts` — `as` default `"button"`), so `:disabled="publishing"` falls through natively; and
glass-ui ships the disabled paint free at `dist/styles/dock.css:109-113`
(`.dock-icon-button:disabled { opacity: var(--opacity-disabled); … }`). The component declines a one-attribute
fix it is already holding the signal for.

**Failure scenario.** Workspace with a contour; double-click the Upload icon inside ~1 s. Result: two rows in
`/gallery` for one contour, two `"Published!"` toasts, and `publishing` flipped back to `false` by whichever
`finally` lands second.

**Falsifier.** Any of: (a) `handlePublish` guarding `if (publishing.value) return`; (b) `saveVisualization`
reusing `visualizationSlug.value` instead of POSTing; (c) `api.createVisualization` being idempotent per
`(image_slug, contour_hash)`; (d) the button carrying `disabled`/`aria-disabled`. **None hold** — (a)
`VisualizationView.vue:106-118` read whole; (b) `stores/workspace.ts:344-365` read whole (`visualizationSlug`
is *written* at `:358`, never read as a guard); (c) not adjudicable statically from `web/` alone and therefore
the only surviving escape — mark **UNPROVEN-NEEDS-LIVE for SS-13** *only* for the server-side dedup arm; the
client-side duplication (two POSTs) is proven; (d) `CanvasControlsDock.vue:71` carries neither.

---

### L-2 · MAJOR — `v-model:expanded` binds a prop that neither this component nor the substrate declares: the write leg is a permanent silent no-op, and a contradictory `expanded` attribute is stamped on the substrate's own state element

**Provenance.** `VisualizationView.vue:212` binds `v-model:expanded="dockExpanded"`, which desugars to
`:expanded="dockExpanded"` **plus** `@update:expanded`. But `CanvasControlsDock`'s `defineProps` (`:9-17`)
declares **no `expanded`** — only `isEditing`, `showImageOverlay`, `showGhost`, `showEquation`, `hasData`,
`hasContour`, `publishing`. The component's own comment (`:31-33`) states the intent correctly — *"surface the
dock's expanded state to the parent … via a typed event"* — i.e. **one-way, emit-only**. `v-model:` is the
**two-way** sugar. The parent used the wrong form, and the child never declared the prop that would have made
it real.

**Where the phantom lands.** `expanded` is undeclared ⇒ it stays in `$attrs`. The root of `CanvasControlsDock`
is a single component (`<GlassDock>`, `:41`) ⇒ attrs fall through to `GlassDock`. `DockProps`
(`dist/components/custom/dock/composables/useDockShellProps.d.ts`, read whole) has **no `expanded` member** —
the expansion surface is *imperative* (`GlassDock.vue.d.ts` exposes `expand()` / `collapse()` /
`expanded: Ref<boolean>`, no prop, no model). ⇒ it stays in *GlassDock's* `$attrs`. `GlassDock` sets
`inheritAttrs: !1` (`dist/dock.js:582`) and re-binds attrs explicitly onto the **inner** element:
`j({ ref_key: "dockEl", ref: _ }, t.$attrs, { class: ["glass-dock", [ …, { expanded: W.value, collapsed: !W.value, … } ] ] })`
(`dist/dock.js` GlassDock render). `expanded` is not a special boolean attribute, so Vue stamps it literally.

**Two live consequences.**
1. **The write leg is dead forever.** Nothing in the chain consumes an `expanded` prop. If the parent ever
   sets `dockExpanded = true` programmatically (the natural next feature — "expand the dock when the user
   enters edit mode"), the dock will not move. The binding *reads* as bidirectional and is not.
2. **Contradictory DOM truth on `.glass-dock`.** When expanded, that element carries the substrate's own
   `expanded` **class** *and* an `expanded="false"`→`"true"` **attribute** written one tick behind it by the
   parent's echo. The project's e2e already selects on this exact element —
   `web/e2e/gallery.spec.ts:107` `page.locator(".controls-dock-anchor .glass-dock")` — so any future
   `[expanded]` / `:not([expanded])` predicate reads a stale, non-standard signal.

**Failure scenario.** `dockExpanded` is `true`; a maintainer writes `dockExpanded = false` to force-collapse
the dock. Nothing happens — the dock stays expanded — and `.glass-dock` now reads `class="… expanded …"` with
`expanded="false"`.

**Falsifier.** Either (a) `DockProps` carrying an `expanded` prop or `defineModel`, or (b) `CanvasControlsDock`
declaring `expanded` and forwarding it to the exposed `expand()`/`collapse()`. Neither exists: (a) the full
`DockProps` interface was read (`fitContent`, `position`, `alwaysExpanded`, `shape`, `orientation`, `density`,
`overflow`, `containerName`, `collapseDelay`, `startCollapsed`, `layout`, `autoLuminance`, `backgroundCanvas`
— that is the entire surface); (b) `CanvasControlsDock.vue:9-17` read whole. Not graded BLOCKER because no
*current* code exercises the write leg — the defect is latent + a DOM-truth lie, not a live break.

---

### L-3 · MAJOR — 6 of the 7 dock controls have **no accessible name**; the `Tooltip` wrapper supplies a *description*, not a name, and only while open

**Provenance.** Seven `DockIconButton` instances: `:46` (View options — **labelled**), `:54`, `:59`, `:71`,
`:77`, `:87`, `:93` (**all unlabelled**). Each unlabelled one contains exactly one lucide `<svg>` and no text.

**Why the Tooltip does not rescue them — proven statically, three hops.**
1. `web/src/components/ui/tooltip/Tooltip.vue:26-37` renders reka-ui `TooltipTrigger as-child` + `TooltipContent`.
2. `reka-ui/dist/Tooltip/TooltipTrigger.js:88` emits exactly one aria hook:
   `"aria-describedby": unref(rootContext).open.value ? unref(rootContext).contentId : void 0` — a
   **description**, and only `open`. `grep -c "aria-label" @mkbabb/glass-ui/dist/tooltip.js` → **0**; same in
   the `TooltipProvider` chunk → **0**. Accessible-*name* computation never consults `aria-describedby`.
3. `lucide-vue-next@1.0.0/dist/esm/defaultAttributes.js` (read whole) is
   `{xmlns, width, height, viewBox, fill, stroke, stroke-width, stroke-linecap, stroke-linejoin}` — **no
   `aria-hidden`, no `role`, no `<title>`**. The svg contributes nothing to the name either.

So Publish, Equation, Edit, Fullscreen, Image-overlay and Contour-trace are, to assistive technology, six
unnamed buttons. The repo ships `@axe-core/playwright` (`web/package.json` devDependencies) — the gate exists
and this surface is not under it (`web/e2e/gallery.spec.ts:114` asserts only the *one* labelled control).

**In-repo inconsistency (this is a component choice, not a house style).** The sibling dock labels its
controls: `EditorControlsDock.vue:105` `aria-label="Magnet radius"`, `:136` `aria-label="Overlay options"`;
`AnimationControls.vue:67,82` carry dynamic `:aria-label`. `CanvasControlsDock` labels **1 of 7**.

**Failure scenario.** A screen-reader user tabs the expanded dock and hears "button, button, button, button,
button" — with the description only announced after the 250 ms hover-open cadence that a keyboard user never
triggers.

**Falsifier.** Any of: reka's `TooltipTrigger` setting `aria-label`/`aria-labelledby` (it does not — `:88` is
its only aria emission); lucide defaulting a `<title>` (it does not); glass-ui's `Tooltip` bundle injecting a
name (grep → 0). *Axis note:* this also lands on the a11y axis; it is filed here because the **contract of the
`Tooltip` adapter** — the thing this component leans on for naming — is a library-surface defect.

---

### L-4 · MAJOR — the scoped `.dock-separator` re-declares a **public substrate class**, silently overriding the substrate's entire rule set, and has already drifted from its own copy in the sibling dock

**Provenance.** `CanvasControlsDock.vue:67` and `:82` render `<div class="dock-separator" />`; `:106-112`
re-declares the class:

```
.dock-separator { width: 1px; height: 1.5rem; margin: 0 0.125rem;
                  background: color-mix(in srgb, var(--foreground) 20%, transparent); flex-shrink: 0; }
```

`.dock-separator` is **not a free name** — it is glass-ui's public dock authority, owned at
`dist/styles/dock/layer-group.css:35-40` inside `@layer components`:

```
.dock-separator { @apply flex-shrink-0; width: 1px; height: var(--dock-separator-height);
                  margin: 0 0.375rem; background: var(--surface-tint-15); }
```
plus the orientation arms at `:45-52` (`.glass-dock.vertical .dock-separator`,
`.dock-separator[data-orientation="vertical"]`), the grid arm at `:56-62`, and the wrap arm at
`dist/styles/dock/overflow.css:166-168`.

**Mechanism (hard, not a specificity guess).** Vue SFC `<style scoped>` output is **unlayered** CSS; the
substrate's rules live in `@layer components` (`layer-group.css:35`, and `style.css:1` `@import "tailwindcss"`
establishes `theme, base, components, utilities`). Unlayered normal declarations **beat every cascade layer**.
The local block therefore wins unconditionally for every property it names, regardless of selector weight.

**Measured divergence** (`dist/styles/dock/shell.css:24` `--dock-separator-height: calc(var(--dock-h) * .5)`;
`dist/styles/tokens/offsets-sizing.css:239` `--dock-h: calc(var(--size-icon-btn) + 0.75rem + 3px)`; `:210`
`--size-icon-btn: 2.5rem`):

| property | substrate | this file | delta |
|---|---|---|---|
| `height` | `calc((2.5rem + .75rem + 3px) * .5)` = **27.5 px** | `1.5rem` = **24 px** | −12.7 %, and **decoupled** from `--dock-h`/density |
| `margin` | `0 0.375rem` (6 px) | `0 0.125rem` (2 px) | 3× tighter |
| `background` | `var(--surface-tint-15)` | `color-mix(in srgb, var(--foreground) 20%, transparent)` | different tone authority |
| vertical/grid/wrap arms | orientation-aware | **overridden to the axis-blind 1 px sliver** | reintroduces the exact bug `DockSeparator` was built to kill |

That last row is the substrate's own words: `DockSeparator.vue.d.ts` — *"The raw `.dock-separator` class was
axis-blind — a fixed VERTICAL 1px hairline that paints a useless 1px-wide sliver in a column (vertical) dock."*
glass-ui **ships `<DockSeparator>`** and exports it (`dock/index.d.ts`). This file re-implements it worse.

**Copy-paste drift, already visible.** `EditorControlsDock.vue:84,131` uses `<span class="dock-separator" />`
with its own scoped copy at `:179-185` — identical `width`/`height`/`background`, **no `margin`**, and a
different host tag (`span` vs `div`). Two sibling docks, one substrate class, three divergent definitions.

**Failure scenario.** Set `orientation="vertical"` (or `density="compact"`) on this dock. The substrate's
perpendicular-hairline and `--dock-h`-tracked height rules are inert — the divider paints as a 1 px × 24 px
vertical sliver in a column, dividing nothing.

**Falsifier.** If the scoped block were emitted inside `@layer components`, or if `.dock-separator` were a
local-only name. Neither: Vue emits scoped CSS unlayered, and `layer-group.css:35` proves the name is the
substrate's.

---

### L-5 · MAJOR — the `view-dot` "something is on" indicator is **stuck on from first paint**, so it carries zero information in the default state

**Provenance.** `CanvasControlsDock.vue:48` — `<span v-if="showImageOverlay || showGhost" class="view-dot" />`
— an amber dot on the collapsed-affordance trigger whose whole job is to signal that a hidden view option is
active. Its source of truth is `composables/useViewState.ts:19-20`:

```
const showGhost = ref(true);
const showImageOverlay = ref(typeof saved.overlay === "boolean" ? saved.overlay : false);
```

`showGhost` **defaults to `true`**. The dot is therefore painted on **every fresh load of every workspace**,
before the user has toggled anything. It can only read "off" if the user explicitly disables Contour trace —
i.e. the indicator is on in the default state and off in a non-default state, the inverse of its purpose.

**Compounded by L-11.** `showGhost` is the one flag `useViewState` never persists (`:43-49` writes only
`editing`, `overlay`, `equation`), so even a user who turns it off gets the dot back on the next reload.

**Failure scenario.** Load `/w/<slug>` with a fresh profile: the dock renders collapsed with an amber dot,
implying an active overlay. Open the popover — both toggles read their defaults, one of which the user never
set.

**Falsifier.** `showGhost` defaulting to `false`, or the dot being gated on *non-default* state (e.g.
`showImageOverlay || !showGhost`). Neither: `useViewState.ts:19` and `CanvasControlsDock.vue:48` read whole.

---

### L-6 · MAJOR — two of the eleven glass-ui 4→7 removed-surface sites live in this 132-line file

**Provenance.** `CanvasControlsDock.vue:6` `import { HoverPopover } from "@mkbabb/glass-ui/hover-popover";`
and `:7` `import { GlassDock, DockIconButton } from "@mkbabb/glass-ui/dock";`.

**Corpus (exact overlap, cited not restated).** `lane-frontend.md:474` — *"`./hover-popover` removed | **2
imports** — `CanvasControlsDock.vue:6`, `EditorControlsDock.vue:4` | → `<Popover>`. `CHANGELOG.md:217`,
**5.0.0**"*. `lane-frontend.md:475` — *"`DockIconButton` removed (member-level) | **2 imports** —
`CanvasControlsDock.vue:7`, `EditorControlsDock.vue:6` | → `<DockControl>` (`shape="icon"` default) … 'The
five legacy SFCs are DEFINITION-ABSENT — clean break, no alias'"*. `lane-frontend.md:639` books both under
[P1]; `CENSUS-2026-08-03.md:257` books the same cure set.

**Concentration is the finding.** This file is **12 % of the removed-surface budget** (2 of 11 import sites,
`lane-frontend.md:639`) at **0.6 %** of the frontend SFC corpus (132 of ~20.6k LOC, `CENSUS §3a`) — and both
of its glass-ui imports are dead at 7.0.0. Seven `DockIconButton` instances (`:46,54,59,71,77,87,93`) migrate
to `<DockControl>`; the `HoverPopover` at `:44` migrates to `<Popover>` and must re-establish the
`keep-dock-open` hold under whatever the successor names it.

**Failure scenario.** Bump `@mkbabb/glass-ui` past 4.x: both specifiers resolve to nothing and the module
fails to build — the DEFINITION-ABSENT clean break, no alias.

**Falsifier.** A 7.0.0 alias or deprecation shim for either subpath/member. `lane-frontend.md:475` records the
producer's own words against it ("no alias"). **Not currently broken**: `vue-tsc --noEmit` at the pinned
`^4.0.0` returns exactly one error, in `PaperView.vue(12,8)` (`@mkbabb/latex-paper/theme`), unrelated to this
file — so this is an upgrade blocker, not a live break, and is graded MAJOR accordingly.

---

### L-7 · MAJOR — the icon-glyph sizing is split two ways; five glyphs are frozen out of the substrate's `--dock-scale` ladder and the other two pass a size that is **dead**

**Provenance.** Two idioms in one 60-line template:
`class="h-4.5 w-4.5"` at `:47, :72, :78, :88, :94` (five glyphs) vs `:size="20"` at `:55, :60` (two glyphs).

**The substrate's contract.** `dist/styles/dock-controls/icon-button.css:132-134`, inside `@layer components`:
```
.dock-icon-button > svg { width: var(--dock-icon-glyph, 1.25rem); height: var(--dock-icon-glyph, 1.25rem); }
```
with `dist/styles/tokens/offsets-sizing.css:287` `--dock-icon-glyph: calc(1.25rem * var(--dock-scale))` and
`:264` `--dock-scale: calc(var(--ui-scale) * var(--dock-local-scale, 1))`. The file's own comment
(`icon-button.css:125-131`) states the intent: *"the glyph scales WITH the box on the `--dock-scale`
multiplier instead of swimming at a fixed consumer size … at 1.5× the glyph is 30px in a 60px box … A consumer
passing an explicit lucide size class still WINS (utility layer > component layer) — a DEFAULT, not a ceiling."*

**Both arms are wrong, in opposite directions.**
- `h-4.5 w-4.5` is a Tailwind **utility** (`calc(var(--spacing) * 4.5)` = 1.125rem = **18 px**). Tailwind v4
  declares `@layer theme, base, components, utilities` at `style.css:1`, so utilities outrank the substrate's
  `components` rule. Those five glyphs are **pinned at 18 px** and do **not** ride `--ui-scale`. At the 1.5×
  desktop proportion the substrate names, the dock box grows and these glyphs do not.
- `:size="20"` sets the svg's presentational `width`/`height` **attributes**. CSS in `@layer components` beats
  presentational attributes, so `.dock-icon-button > svg` wins and the two popover glyphs render at
  `--dock-icon-glyph` regardless. **`:size="20"` is dead code** — it has no rendered effect.

Net: within one dock, five glyphs at a frozen 18 px and two at a scaling 20 px; the two that *look* explicitly
sized are the two that aren't. (The sibling `EditorControlsDock.vue:144` uses `:size="20"` uniformly — the
divergence is local to this file.)

**Failure scenario.** A user raising `--ui-scale` for accessibility gets a larger dock, larger popover glyphs,
and five unchanged 18 px glyphs — the dock's primary actions shrink relative to everything around them.

**Falsifier.** `--dock-icon-glyph` being unset (then `h-4.5` and the `1.25rem` fallback would merely differ by
2 px, no scaling break) — refuted by `offsets-sizing.css:287`; or Tailwind utilities *not* outranking
`@layer components` — refuted by the layer order Tailwind itself declares plus the substrate's own comment at
`icon-button.css:129-130` conceding the utility wins.

---

### L-8 · MINOR — five toggle buttons take the class arm of a two-arm substrate contract and drop the semantic arm

`:54, :59, :71, :77, :87` all use `:class="{ 'is-active': … }"`. The substrate's selector is
`dist/styles/dock-controls/icon-button.css:109`:
`&:is(.is-active, .active, [aria-expanded="true"], [aria-pressed="true"])`. The substrate treats
`aria-pressed="true"` as **equivalent for paint** — so `:aria-pressed="showImageOverlay"` would buy the
identical active treatment *and* the toggle semantics that L-3 shows are absent, in one attribute instead of a
class. **Falsifier:** if `aria-pressed` were not in that comma group; it is, at `:109`.

### L-9 · MINOR — the R5-7 class recurs: raw `<div>`s standing in for a substrate component are invisible to the substrate's marker-keyed and callsite-keyed derivations

**R5-7** (`intakes/lane-fourier-r3-r6.md:125`, ADOPT-AS-FACT + CARRY→F.W4) generalizes as: *evidence keyed to
component callsites is blind to native elements.* Its canonical instance is `PaperSidebar.vue`'s native
`li v-for` at 65/87/105. **This file has no `v-for`** — so it is not a member of the literal loop set — but it
reproduces the class in the sibling form the axis brief asks about:

1. **Substrate-marker blindness.** `dist/dock.js:625` seats the `#rail` line by
   `_.value?.querySelector("[data-rail-anchor]")`; `DockSeparator` stamps that marker
   (`dist/dock.js:1225` `"data-rail-anchor": e.anchor || void 0`). The raw `<div class="dock-separator">` at
   `:67`/`:82` carries no marker, so the dock's seam read returns `null` and *removes* the offset
   (`dock.js:627-629`). Latent today — this dock passes no `#rail` slot, so `q.value` is false and `Z()`
   returns early; it becomes live the moment a rail is added.
2. **Registry blindness.** R5-7's receipt shows instance leaves keyed
   `"callsiteId": "callsite:<file>:<line>:<Component>:<path>"`. Both separators are native `<div>`s and
   register nowhere — any per-dock item denominator over this component counts **5** of its **7** slot
   children. This is the same undercount R5-7 books, one level up: not a loop, a *primitive substitution*.

**Falsifier.** If `DockSeparator` also failed to register (it is a component callsite — it does), or if the
seam read enumerated DOM children rather than the marker (`dock.js:625` is a marker `querySelector`).

### L-10 · MINOR — `toggleFullscreen` is open-only; the emit name lies about the contract

`:93` emits `toggleFullscreen`; the only handler, `VisualizationView.vue:221`, is
`@toggle-fullscreen="showFullscreen = true"` — it can never close. The dock offers no exit affordance
(`FullscreenViewer.vue:110` owns that). A "toggle" that is one-way is a contract defect at the emit boundary:
a future second consumer will reasonably bind it as a toggle. **Falsifier:** any handler performing
`showFullscreen = !showFullscreen`; `grep "toggle-fullscreen"` → one site, `:221`.

### L-11 · MINOR — `showGhost` is the one view flag never persisted, and this dock is the surface that exposes it

`useViewState.ts:43-49` persists `editing`, `overlay`, `equation` to `fourier_visualizer_view_state`;
`showGhost` is absent from the writer and from `loadViewState`'s return type (`:6`). This dock offers
"Contour trace" (`:58-62`) beside "Image overlay" (`:53-57`) as visually symmetric peers whose persistence
behaviour is asymmetric and undisclosed. **Falsifier:** a second persistence site for `showGhost`;
`grep -n "showGhost" composables/useViewState.ts` → `:19` (init) and `:51` (return) only.

### L-12 · MINOR — mixed import provenance for one concern inside one file

`:5` imports `Tooltip` from the local adapter `@/components/ui/tooltip` while `:6-7` import from
`@mkbabb/glass-ui/*` directly. The adapter (`ui/tooltip/Tooltip.vue:13-17`) is a pure re-wrap of
`@mkbabb/glass-ui/tooltip`'s three primitives. **Corpus:** R3-7a (`intakes/lane-fourier-r3-r6.md:79`,
CARRY→F.W3) budgets *"35 Tooltip callsites over 9 consumers"* with **`CanvasControlsDock 6`** — see §5.1,
confirmed exactly. Cost of the adapter here is real: it fixes `:side-offset="6"` / `:collision-padding="8"`
(`Tooltip.vue:32-33`) for all six callsites, so `side="bottom"` at `:70,76,86,92` cannot tune its offset.

### L-13 · MINOR — the ghost/overlay toggle pair is implemented in three sibling docks under two different emit names

`CanvasControlsDock` emits `toggleImageOverlay` / `toggleGhost` (`:23-24`);
`EditorControlsDock.vue:41-42` emits **`toggleOverlay`** / `toggleGhost`;
`AnimationControls` receives the same pair inside `FullscreenViewer.vue:136-137` as
`toggle-ghost` / `toggle-image-overlay`. Same action, two names, three implementations, and divergent prop
optionality (`showGhost: boolean` here at `:12` vs `showGhost?: boolean` at `EditorControlsDock.vue:30`).
**Falsifier:** a shared composable or a single owning dock; `grep -rn "toggleOverlay\|toggleImageOverlay"` →
the three sites above, no shared seam.

### L-14 · MINOR — `dockExpanded` dangles across the dock's own unmount

The dock is `v-if`-gated by `VisualizationView.vue:210` (`hasData || (isEditing && store.contour)`). The watch
at `:34-37` is setup-scoped, so on unmount it stops **without** emitting a final `false`; the parent's
`dockExpanded` retains `true`. On remount a fresh watch fires `undefined → false` and self-corrects, but for
the interval between the mount commit and the pre-flush watcher run, `.controls-dock-anchor` carries a stale
`dock-centered`. **Falsifier:** an `onScopeDispose`/`onUnmounted` emitting `false` (absent — the file has zero
lifecycle hooks, §3 S-2), or `flush: "post"` making the window observable. Whether a paint lands in that
window is **UNPROVEN-NEEDS-LIVE (SS-13)**; the dangling parent state is proven statically.

### L-15 · MINOR — two silent postures on the Publish path this dock owns

(a) `VisualizationView.vue:107` returns silently when `store.imageSlug` is falsy while `hasContour` is true —
the user clicks Publish and *nothing* happens, no toast, no state change. (b) On success the dock's entire
feedback is the `animate-pulse` stopping (`:72`); the `"Published!"` toast comes from
`stores/gallery.ts:230`, i.e. a different module's courtesy, not this control's contract.
**Falsifier:** a toast/aria-live on the empty-slug branch (`VisualizationView.vue:106-118` read whole — none),
or a `role="status"` region in this file (none).

### L-16 · INFO — two emit idioms for one job

`:19` binds `const emit = defineEmits<…>()`, used exactly once (`:36`, `update:expanded`); the other six events
go through template `$emit('…')` string literals (`:54, :59, :71, :77, :87, :93`). Both are type-checked in
Vue 3.5, so this is style, not correctness — but it is two vocabularies in a 40-line template.

### L-17 · INFO — the entire `update:expanded` machinery is inert at ≥1024 px

`:29-37` exists to drive `.controls-dock-anchor.dock-centered` (`VisualizationView.vue:210, 461-465`). That
class is fully neutralized at the desktop breakpoint: `VisualizationView.vue:467-474` resets
`left: auto; right: .5rem; transform: none` for `.controls-dock-anchor` **and** `.dock-centered` alike. The
component's only script logic — the ref, the watch, the emit, the phantom prop of L-2 — therefore has effect
only below 1024 px. The comment at `:31-33` ("VisualizationView, which centres the anchor on expand") does not
disclose this.

### L-18 · INFO — this dock's `toggleFullscreen` creates the one state where the inline canvas redraws while fully occluded

Census `lane-frontend.md:512-556` §6 Path A: `BasisCanvas.vue:419` watches
`[anim.t, anim.easedT, props.showGhost, props.showImageOverlay]` → `drawFrame()`; `:425-447` gates the shared
rAF clock via `IntersectionObserver` → `anim.setCanvasVisible`, reference-counted across inline + fullscreen
canvases (`stores/animation.ts:95`). `FullscreenViewer.vue:105-127` is `Teleport` + `v-if="show"`, so its
`BasisCanvas` mounts only while open — but the inline one stays mounted behind the fixed backdrop.
`BasisCanvas.vue:427` claims the gate parks the loop when the canvas is *"hidden behind the fullscreen layer"*;
**`IntersectionObserver` does not detect occlusion**, so the inline canvas reports visible and keeps
redrawing. Defect owner is `BasisCanvas`/`VisualizationView`, not this file — it is booked here because this
dock's `:93` emit is the sole entry into that state, which is exactly the render-path touch this axis asks for.
**Falsifier:** the fullscreen backdrop unmounting or `display:none`-ing the inline stage
(`VisualizationView.vue:198` only adds `is-hidden` for *editing*, not fullscreen).

---

## §3 — Superlatives (each with its falsifier — L-18 runs both ways)

**S-1 · Goldilocks, measured.** 132 lines for 7 controls, 7 props, 7 emits, one watch, three CSS rules. It is
the smallest of the three dock consumers — 132 vs `AnimationControls` 224 vs `EditorControlsDock` 230
(`lane-frontend.md:89-93`) — and does one job. *Falsifier:* a second responsibility in the file (state
ownership, fetching, persistence). There is none — every prop is read-only and every interaction is an emit.

**S-2 · Zero teardown surface, proven by enumeration.**
`grep -cE "addEventListener|setInterval|setTimeout|requestAnimationFrame|onUnmounted|onBeforeUnmount|new ResizeObserver|new IntersectionObserver|new MutationObserver"`
over the file → **0**. The single `watch` (`:34-37`) is setup-scoped and auto-stops. No Teleport (the census's
two are elsewhere — R3-11), no portal, no timer, no observer, no listener. *Falsifier:* any of those tokens
appearing; the count is zero.

**S-3 · The in-band direction is right.** `:31-33`'s stated reform — replacing an out-of-band
`defineExpose(dockExpanded)` the parent reached into with a typed emit — reads the substrate's exposed
reactive `expanded` (`GlassDock.vue.d.ts`: `expanded: Ref<boolean, boolean>`) through a getter watch rather
than polling it imperatively. The *mechanism* is correct; L-2 is a defect of the parent's binding **form**,
not of this design. *Falsifier:* if `expanded` were not reactively readable through the exposed proxy — it is
(`dist/dock.js` `t({ expanded: S, … })` where `S` is the `useDockState` ref).

**S-4 · `is-active` is the substrate's real public vocabulary, not an invented class.** I opened this expecting
a dead class painting nothing. `dist/styles/dock-controls/icon-button.css:109` proves it live:
`&:is(.is-active, .active, [aria-expanded="true"], [aria-pressed="true"])` → the full
`--dock-active-{bg,color,scale,border,shadow}` token cohort. *Falsifier: applied and it held.*

**S-5 · `--viz-amber` is a real, contrast-adjudicated app token.** `:128-129` is not a magic colour:
`web/src/style.css:113-125` defines it in both schemes with a documented axe carry — *"D.W4.d — light-mode
`--viz-amber` darken (axe contrast carry). glass-ui ships light `--viz-amber` at `hsl(35 70% 42%)` ≈ 3.54:1"* →
`hsl(35 76% 35%)` light / `hsl(37 73% 67%)` dark. Shared with 6 other files. *Falsifier: applied and it held.*

**S-6 · The exposed-state read is type-safe — measured, not assumed.** `:29`
`ref<InstanceType<typeof GlassDock>>()` + `:35` `dockRef.value?.expanded`, against a `__VLS_WithSlots`
intersection component, typechecks clean. `./node_modules/.bin/vue-tsc --noEmit -p tsconfig.json` → exactly one
diagnostic, `src/components/paper/PaperView.vue(12,8) TS2882`, unrelated. *Falsifier: applied and it killed my
hypothesis — see §4.1.*

**S-7 · Not in the dynamic-`:is` budget.** R3-10 (`intakes/lane-fourier-r3-r6.md:84`, CARRY→F.W4) budgets six
live dynamic `<component :is>` families, two of them in this component's neighbours
(`CoefficientsSpectrum.vue:132`, `EditorControlsDock.vue:144`). `grep -c "component :is"` on this file → **0**.
This component is explicitly **cleared** from that carry.

**S-8 · The dock-keep contract is honoured.** `:44` passes `keep-dock-open` on the `HoverPopover`. That prop is
the substrate's ref-counted collapse-timer hold (`HoverPopover.vue.d.ts` `keepDockOpen`: *"hold the parent dock
open while this popover is visible … the dock's collapse timer is ref-counted"*), and it also stamps
`data-glass-dock-portal`/`-owner` so the dock's click-away treats the portal as inside. *Falsifier:* omit it
and the dock's 2 000 ms idle-collapse (`DockProps.collapseDelay`, default 2000) would close under the open
popover. The one substrate contract this composition genuinely needed, it took.

---

## §4 — Hypotheses I raised and then killed (recorded so they are not re-raised)

1. **`InstanceType<typeof GlassDock>` collapses to `{ $slots }`.** `__VLS_WithSlots<T,S> = T & { new(): { $slots: S } }`;
   TS infers `infer R` from the **last** construct signature of an intersection, which would make `:35`
   `dockRef.value?.expanded` a TS2339. **REFUTED by measurement** — the typecheck is clean (S-6). Modelled
   TS behaviour, not observed TS behaviour.
2. **`FullscreenViewer` keeps a second canvas permanently mounted** (it is bound `:visible` with no `v-if` at
   `VisualizationView.vue:282`), doubling every dock-triggered redraw. **REFUTED** — `FullscreenViewer.vue:107`
   is `v-if="show"` *inside* the Teleport; the canvas mounts only while open. What survives is the narrower,
   correctly-attributed L-18.
3. **`is-active` paints nothing.** **REFUTED** — `icon-button.css:109` (S-4).
4. **`--viz-amber` is undefined, so `.view-dot` paints transparent.** **REFUTED** — `style.css:113-125` (S-5).

---

## §5 — Corpus reconciliation

**5.1 · R3-7a confirmed exactly, at the component grain.** The intake
(`intakes/lane-fourier-r3-r6.md:79`) sums 35 Tooltip callsites over nine consumers with
**`CanvasControlsDock 6`**. Live: `grep -c "<Tooltip" CanvasControlsDock.vue` → **6** (`:53, :58, :70, :76,
:86, :92`). Exact. The F.W3 migration budget for this file is 6 callsites + 1 barrel import (`:5`).

**5.2 · R3-10 cleared for this file** — see S-7. **R5-7 applies in a sibling form, not literally** — see L-9;
I record the distinction rather than claiming loop membership this file does not have.

**5.3 · No contradiction of the corpus found.** `lane-frontend.md:93` (132 LOC, `GlassDock` +
`DockIconButton`), `:302-303` (the two import lines), `:474-475` (the two removed surfaces) and
`§6:512-556` (the render path) all match the live tree at HEAD `cd26c653`. The one figure the corpus does not
carry and this lane adds is the **7 `DockIconButton` instances** (`:46,54,59,71,77,87,93`) behind the
`:475` "2 imports" row — the member-level migration cost is 7 sites in this file, not 2.

---

## §6 — Verdict

**DEFECTIVE.** One BLOCKER (L-1, duplicate persisted gallery rows from a re-entrant control this component
holds the guard signal for and does not use), six MAJORs, eleven lesser rows. The component is *small and
clean-shaped* — S-1/S-2 are real, and its designer's instincts on in-band coupling (S-3) and the dock-keep
contract (S-8) were right. What it fails at is the **substrate boundary**: it re-declares a public glass-ui
class and silently overrides it (L-4), takes half of a two-arm active-state contract (L-8), pins glyphs out of
the substrate's scale ladder while passing a size that does nothing (L-7), and lets its parent bind a
`v-model` to a prop no layer of the stack declares (L-2). Four of the six MAJORs would be *deleted, not fixed,*
by adopting what glass-ui already ships (`DockSeparator`, `aria-pressed`, `--dock-icon-glyph`, `:disabled`).
