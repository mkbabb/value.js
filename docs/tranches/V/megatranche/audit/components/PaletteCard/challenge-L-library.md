# CHALLENGE-L — PaletteCard: the library structure underneath (pass 2)

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, the tier
declared at spawn. The seat is declared, not inherited.

- Repository: `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`
- Subject: `demo/palettes/browser/card/PaletteCard/PaletteCard.vue` (364 L) + its five folder siblings,
  the four `card/composables/` modules, and the two `card/` siblings they share
  (`SwatchHoverMenu.vue`, `PaletteColorStrip.vue`)
- Axis: **library structure** — module boundaries, ownership, dependency direction, public surface
- Live probes: dev server `http://localhost:9000`, Playwright MCP, read-only except `localStorage`
  seeding in the MCP's isolated profile
- Verdict: **DEFECTIVE** — **2 new BLOCKERs reproduced live**, 4 new MAJOR, 4 new MINOR, on top of a
  prior pass whose entire docket I re-verified as still standing

### Supersession notice — nothing lost

A pass-1 CHALLENGE-L report (2026-07-24, Opus 5, 14 findings) already occupied this path. It is
**preserved verbatim** at
`docs/tranches/V/megatranche/audit/components/PaletteCard/challenge-L-library.pass-1-2026-07-24.md`
and its docket is carried forward in §5 below with a re-verification status per row. This file is
pass 2: it does not repeat pass-1's evidence, it re-checks it and adds what pass 1 did not reach —
**the expanded-card interaction surface**, which no audit of this component has ever exercised.

> Probe hygiene: the dev-server browser is **shared with other audit seats**. Mid-session another
> seat seeded a `"Malformed First"` palette that put the Palettes pane into its error boundary
> (`Cannot read properties of undefined (reading 'replace')` — an independent corroboration of
> pass-1 L-8's two-`slugify` finding, which is the only `.replace` on the card's name path) and
> repeatedly changed the route. I re-seeded a valid store. Route drift in the transcripts is that,
> not this component. Every measured number below was taken inside a single uninterrupted
> `evaluate` call.

---

## 0. Why pass 2 exists: the audit had never expanded a card

Pass-1 L-13 recorded that the mega-tranche visual matrix rendered **zero** PaletteCards. I confirmed
it and went one step further — I seeded palettes, **expanded** a card, and **hovered a swatch**. That
is the interaction the component exists for, and it is where its two worst library defects live.
Both are *ownership vacuums*: a CSS class **no module defines**, and a floating-position calculation
**no design-system module owns**. Both fire on every desktop hover of every expanded card, in every
host.

---

## L-15 · BLOCKER (new) — `.floating-panel` is a class **no module owns**

`SwatchHoverMenu.vue:37-51` teleports the swatch hover popover to `<body>` with one class and inline
coordinates:

```html
<Teleport to="body">
    <div v-if="open" class="floating-panel" :class="PANEL_LAYOUT" :style="floatingStyle" …>
```

`.floating-panel` is defined **nowhere in the repo and nowhere in glass-ui**:

```
$ grep -rn "floating-panel" --include='*.css' . --exclude-dir=node_modules --exclude-dir=.git
demo/styles/animations.css:2: * Shared keyframes (dialog, floating-panel, card-menu, shimmer, etc.)   ← a COMMENT
$ grep -rln "floating-panel" node_modules/@mkbabb/
(no output)
```

Measured in the running app — a synthetic probe element plus a full `document.styleSheets` scan:

```json
{ "computed": { "position": "static", "transform": "none",
                "background": "rgba(0, 0, 0, 0)", "zIndex": "auto",
                "border": "0px", "boxShadow": "none" },
  "rules": [], "ruleCount": 0 }
```

**Zero matching CSS rules.** Consequences, all live:

- `position: static` ⟹ the inline `top`/`left` are inert. CSS Positioned Layout L3, `static`:
  *"the box's `top`, `right`, `bottom`, and `left` properties have no effect."*
- No `background`, no `box-shadow`, no `z-index` ⟹ the action icons render bare on the page.
- The element lands at the **end of `<body>` in normal flow**.

**Mechanism.** Glass 7.0.0 was "adopted whole" at W44. `.floating-panel` was a design-system recipe
the demo never owned and glass-ui 7 does not ship. The reference dangles. This is unique-semantic-
ownership violated in its purest form: *nobody* owns this concept, and nothing in the toolchain can
see that — a class name is a string.

**Reproduction:** `/#/palettes` with one saved palette → click the card to expand → hover any swatch.
Measured geometry in L-16 below.

---

## L-16 · BLOCKER (new) — `useHoverPopover` reads `e.currentTarget` after dispatch; every swatch hover throws

`demo/palettes/browser/card/composables/useHoverPopover.ts:26-31`:

```ts
function onHover(index: number, e: PointerEvent) {
    if (!canHover.value || e.pointerType === "touch") return;
    cancelLeave();
    openIndex.value = index;
    nextTick(() => positionPanel(e.currentTarget as Element));   // ← line 30
}
```

`nextTick` defers to a microtask that runs **after** event dispatch completes. DOM Standard §2.2:
*"The `currentTarget` attribute … When an event is dispatched, this is set to the object whose
listener is being invoked, and **reset to null afterwards**."* So `positionPanel` receives `null` and
`null.getBoundingClientRect()` throws. **`as Element` is the masking assertion that let it past
`vue-tsc`** — a cast over a nullable value, which the standing edicts name directly.

**Captured live** (hover dispatched on the swatch wrapper with an `unhandledrejection` listener
installed):

```json
{ "captured": ["REJ:TypeError: Cannot read properties of null (reading 'getBoundingClientRect')"],
  "inline": "top: 0px; left: 0px; transform: translateX(-50%);" }
```

The panel geometry, with L-15 compounding:

```json
{ "step": "PANEL",
  "swatchWrap": { "x": 768, "y": 610.1, "w": 40, "h": 46.4 },
  "inline": "top: 0px; left: 0px; transform: translateX(-50%);",
  "computed": { "position": "static", "top": "0px", "left": "0px",
                "transform": "matrix(1, 0, 0, 1, -720, 0)", "zIndex": "auto",
                "bg": "rgba(0, 0, 0, 0)", "shadow": "none", "display": "flex" },
  "rect": { "x": -720, "y": 900, "w": 1440, "h": 40 },
  "parentIsBody": true,
  "actionBtns": [ { "a": "Edit color oklch(0.72 0.16 0)", "w": 28, "h": 28 },
                  { "a": "Copy color oklch(0.72 0.16 0)", "w": 28, "h": 28 } ] }
```

The swatch sits at **(768, 610)**. The "popover" is a **1440 px-wide bare strip at y = 900 starting
at x = −720** — half off-screen, full viewport width, transparent, at the bottom of the document.

**The structural cause, not the symptom.** `SwatchHoverMenu` keeps **two implementations of one
concept in one file**:

| branch | mechanism | state |
|---|---|---|
| `v-if="!canHover"` (touch) | `@mkbabb/glass-ui/popover` — the design system's Popover: real anchor positioning, focus management, accessible | **correct** |
| `v-else` (hover — **every desktop browser**) | hand-rolled `Teleport` + `getBoundingClientRect` + a class nobody defines + `aria-hidden="true"` (line 38's own comment: *"keyboard-inaccessible"*) | **broken** |

The design system already ships the answer and the component already imports it eight lines above
(`SwatchHoverMenu.vue:61`). The hover branch is a dual path (edict 2) reimplementing a glass-ui
primitive (edict 4). Pass-1 L-9 flagged one bespoke motion module; this is the same disease one
layer down, and it is not cosmetic — it throws.

---

## L-17 · MAJOR (new) — the swatches speak a `WatercolorDot` API glass-ui 7 does not have

`SwatchHoverMenu.vue:14-20` and `:29-36` pass `tag="button"` and `:aria-label`. So does
`CurrentPaletteEditor.vue:62,64,95-105`. glass-ui 7.0.0's declared prop set
(`node_modules/@mkbabb/glass-ui/dist/components/watercolor-dot/WatercolorDot.vue.d.ts`):

```ts
type __VLS_Props = { color: string; variant?: "solid" | "ghost"; animate?: boolean;
                     cycleDuration?: number; range?: [number, number]; seed?: string; };
```

No `tag`. No name plumbing. Measured DOM of a rendered swatch inside an expanded card:

```json
{ "tag": "SPAN",
  "attrs": { "aria-hidden": "true",
             "class": "w-9 h-9 sm:w-10 sm:h-10 shrink-0 cursor-pointer wa…",
             "data-testid": "watercolor-swatch", "data-variant": "solid",
             "style": "background-color: rgb(61, 90, 241); border-radius:…" },
  "focusablesInCard": ["BUTTON:Palette menu"] }
```

`tag="button"` is silently dropped. `:aria-label` is dropped. The element renders as a
`<span aria-hidden="true">`. **The only focusable element in an expanded PaletteCard is the "Palette
menu" button.** Every colour swatch — the card's primary content, carrying click-to-open, edit, copy
and add-to-palette — is keyboard-unreachable and invisible to assistive technology.
`@click.stop="$emit('click')"` (`SwatchHoverMenu.vue:35`) is bound to a non-interactive span.

`vue-tsc` cannot catch this: unknown attributes on a component are legal fallthrough attrs, not prop
errors. That is precisely why a stale design-system contract survives a green typecheck — the gate is
structural, and the structure is wrong. Pass-1 L-2 proved the *routing* to glass-ui is wrong; this
proves the *contract* is stale too.

---

## L-18 · MAJOR (new) — two live implementations of palette export; the card's menu drives the legacy one

The card's five export menu items (`PaletteCardMenu.vue:113-128` → `PaletteCard.vue:308-312` →
`usePaletteExport.ts:15-19`) resolve `./export` to the **file** `demo/palettes/export.ts` — 132 lines:
`exportAsJSON`, `exportAsCSSCustomProperties`, `exportAsTailwindConfig`, `exportAsSVG`, `exportAsPNG`.

The **directory** `demo/palettes/export/` holds **914 lines across 13 files** — the byte-exact W51
serializer set (`serializeJson`, `serializeCss`, `serializeTailwind`, `serializeSvg`, `serializePng`,
RFC-8785 canonicalization, SHA-256 digests, reload identity). Its consumers:

```
$ grep -rn "palettes/export/" --include='*.ts' --include='*.vue' demo/ test/ src/
demo/test/export/byte-exact.test.ts:23:} from "../../palettes/export/serializers";
```

**One test. Nothing else.** The collision is admitted in-source at
`demo/palettes/export/serializers.ts:5-9`:

> *"This module is intentionally NOT named `index.ts`: the sibling **legacy** `../export.ts` (the
> pre-contract routed seat that **W50 will replace**) still resolves `./export`…"*

Two homes named `export`, two implementations of json/css/tailwind/svg/png, one explicitly labelled
legacy and still the only one a user can reach — through this card's menu. This is the *superset* of
pass-1 L-8 (which found the two `slugify` homes): the duplication is not one helper, it is the whole
serializer layer, 914 lines of it dead to the running app.

Compounding: `usePaletteExport.ts:21` swallows every failure into `console.warn("Export failed:", e)`.
The card owns a user-visible feedback rail (`showFeedback`) that save/delete/visibility all use;
export alone fails silently.

---

## L-19 · MAJOR (new evidence on a known finding) — the measured cost of the `demo/ui/` shim layer

Pass-1 L-2 established that all 19 `demo/ui/*` directories are one-line glass-ui forwards, explicitly
forbidden by `docs/tranches/V/ARCHITECTURE.md` §1. I re-verified (19/19 still shims) and measured
what the routing choice costs.

**18 of the 19 shims target the glass-ui ROOT barrel**, not the per-component subpath — although
glass-ui 7 publishes 70 subpaths including `./button ./badge ./card ./popover ./dropdown-menu`:

```
demo/ui/button/index.ts     export { Button } from "@mkbabb/glass-ui";       ← root
demo/ui/input/index.ts      export { Input }  from "@mkbabb/glass-ui/forms"; ← the lone subpath
```

The root barrel `dist/glass-ui.js` statically imports **42 chunk files totalling 167,733 bytes** of
source. Live, on `/#/palettes`:

```json
{ "name": "@mkbabb_glass-ui.js?v=3094e483", "decodedBodySize": 234309 }
```

234 KB of design system pulled in through a layer whose entire content is
`export { Button } from "@mkbabb/glass-ui"`. The three chunks `PaletteCard` actually needs —
`badge-*.js` 2,011 B + `button-*.js` 2,960 B + `DropdownMenuTrigger-*.js` 3,152 B — total **8,123 B**.

Repo-wide census of the three doors in `demo/`:

```
shim sites (`…/ui/<x>`):        90
direct glass-ui root:           37
direct glass-ui subpath:        82
```

*Honest scope:* this is a **dev-graph** number. The production `gh-pages` Rollup build tree-shakes
the root barrel and 37 sites import the root directly regardless, so I am **not** claiming a
production payload regression — I did not measure one. The structural finding stands without it.

---

## L-20 · MAJOR (new evidence on a known finding) — the hand-rolled icon buttons, measured

Pass-1 L-7 counted 16 duplications of the icon-button recipe. I measured what they produce.

`PaletteCard.vue:96-104` uses the glass-ui atom, under the comment (lines 93-95):

> *"S.W5-4: 3rd copy of the hand-rolled icon-trigger recipe dies onto the glass-ui atom; **the sm
> square also cures the ~24px touch target**."*

The cure was applied to **one** site. Live measurement of the twins 20 lines away — the rename state
(reached by clicking an editable title on `/#/palettes`):

```json
{ "found": true, "rootFont": "16px",
  "btns": [ { "type": "submit", "w": 18, "h": 18, "aria": null,
              "cls": "p-0.5 rounded-sm hover:bg-accent/50 …" },
            { "type": "button", "w": 18, "h": 18, "aria": null,
              "cls": "p-0.5 rounded-sm hover:bg-accent/50 …" } ] }
```

versus the atom, same card, same probe:

```json
{ "name": "Palette menu", "w": 36, "h": 36, "cls": "button tap-squish focus-ring glass-wash " }
```

- glass-ui atom → **36 × 36**, named.
- hand-rolled twins (`PaletteRenameInput.vue:18-30`) → **18 × 18**, **`aria-label: null`**.

WCAG 2.5.8 (Target Size, Minimum, AA) requires 24 × 24 CSS px. `PaletteCardSwatches.vue:13-19`
(slug copy, `p-0.5` + `w-3 h-3`) computes to 16 px by the same arithmetic. The visual audit's
`namelessButtons` metric would have caught these — it never reached the renaming state.

The finding is structural, not cosmetic: the atom that owns min-size, focus ring and naming is
imported into this very file and then not used.

---

## L-21 · MINOR (new) — the card's expand animation pierces the reduced-motion guard

`useHeightTransition.ts:48`:

```ts
htmlEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
```

`demo/styles/animations.css:184-192` neutralises motion app-wide:

```css
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
}
```

That guard **cannot** stop this call. CSSOM-View defers to the CSS `scroll-behavior` property only
when the `behavior` option is `"auto"`; an explicit `"smooth"` forces a smooth scroll regardless. So
every card expansion smooth-scrolls the page for a user who asked for reduced motion. (The inline
`style.transition` strings the same composable writes *are* caught, by the `!important` duration
override — so the CSS guard is doing its job everywhere except the one place JS overrides it
explicitly.)

Pass-1 L-9 flagged `scrollIntoView` as a misplaced side effect inside a motion composable; this is
the sharper consequence.

---

## L-22 · MINOR (new) — the popover's centering transform is owned by one of its two call sites

`useHoverPopover.positionPanel` (lines 20-24) computes `left = rect.left + rect.width / 2` — a
**centre** coordinate — and hands it out raw. `SwatchHoverMenu` applies `floatingStyle` verbatim
(line 44) and adds nothing. So the `translateX(-50%)` that makes the coordinate *mean* what it
computes lives in the consumers:

- `PaletteCardSwatches.vue:31` — `:floating-style="{ ...floatingStyle, transform: 'translateX(-50%)' }"` ✓
- `CurrentPaletteEditor.vue:35` — `:floating-style="currentFloatingStyle"` ✗

Currently unobservable because L-15/L-16 destroy the position entirely — **latent**, and it becomes
live the moment those are cured.

---

## L-23 · MINOR (new) — `cssColor` is a dead public prop threaded through five call sites

`PaletteCard.vue:186` declares it; `PaletteCard.vue:226` is its only use:

```ts
const firstColor = computed(() => props.palette.colors[0]?.css ?? props.cssColor ?? EMPTY_PALETTE_SWATCH);
```

`firstColor` → `safeFirstColor` (line 230) → the `:safe-first-color` prop (line 144) → exactly one
binding, `PaletteCardSwatches.vue:10`, the slug chip's `color`/`borderColor`. That chip renders only
when `showSlug` is passed — `BrowsePane.vue:101` and `AdminUsersPanel.vue:147`, two of the five hosts
— **and** `displaySlug` is truthy. `cssColor` then matters only in the further intersection where
`palette.colors[0]` is `undefined`.

Five hosts pass it (`BrowsePane.vue:98`, `PalettesPane.vue:88`, `ExtractWorkbench.vue:149`,
`AdminUsersPanel.vue:145`, `MixSourceSelector.vue:266`). `MixSourceSelector` passes `""`, which `??`
does not catch — an empty string would reach `safeCss("")`, i.e. straight into the pass-1 L-1 throw
path.

A five-link chain and a public prop on five call sites to tint one chip that is almost never rendered
with it.

---

## L-24 · MINOR (new) — `tsconfig.demo.json` `paths` has drifted from `package.json#exports`

`vite.config.ts:37-50` **generates** the runtime alias set from `package.json#exports` precisely so it
*"can never drift from the exports map"*. Its TypeScript twin is hand-maintained, and has:

```
package.json#exports keys: ./color ./value ./css ./easing ./math ./transform ./quantize

--- tsconfig.demo paths entries ---
@mkbabb/value.js                   ./dist/index.d.ts                  *** MISSING ***
@mkbabb/value.js/color             ./dist/subpaths/color.d.ts         EXISTS
@mkbabb/value.js/parsing           ./dist/subpaths/parsing.d.ts       *** MISSING ***
@mkbabb/value.js/math              ./dist/subpaths/math.d.ts          EXISTS
@mkbabb/value.js/easing            ./dist/subpaths/easing.d.ts        EXISTS
@mkbabb/value.js/units             ./dist/subpaths/units.d.ts         *** MISSING ***
@mkbabb/value.js/transform         ./dist/subpaths/transform.d.ts     EXISTS
@mkbabb/value.js/quantize          ./dist/subpaths/quantize.d.ts      EXISTS
--- exports keys with no tsconfig path ---
   @mkbabb/value.js/value
   @mkbabb/value.js/css
```

Three dangling entries — `/parsing` and `/units` are **retired** subpaths, i.e. migration residue
(edict 2) — and two published subpaths with no entry, one of which (`/css`) is imported at 10 demo
sites and currently resolves only by node fallback. Inert today (a missing `paths` target falls back
to node resolution, which also fails), so this is dead config rather than an exploitable false
surface. Cure: generate the `paths` map from `exports` the way the Vite alias already is.

---

## 1. The decomposition, judged (pass-2 reading)

Pass-1 L-6 held that the six-file split "is not along seams". I agree and sharpen it: **four of six
are real seams; two are not**, and the god module was *distributed*, not dissolved.

| file | lines | owns state/behaviour? | verdict |
|---|---:|---|---|
| `PaletteCard.vue` | 364 | 11 props, **18 emits**, 1 exposed method, 2 composables, a 21-entry dispatch table | the god module, still |
| `PaletteCardMenu.vue` | 228 | own `useApiClient` + `isPublic`; kind-conditioned item set | **real seam** (wrong dependency — pass-1 L-3) |
| `PaletteRenameInput.vue` | 66 | own `localName`, focus/select, submit/cancel | **real seam** |
| `ActionFeedback.vue` | 58 | own auto-dismiss timer | **real seam** |
| `PaletteCardSwatches.vue` | 96 | **nothing** — 8 props in, 8 emits out, every one a pass-through | **not a seam** |
| `PaletteCardMeta.vue` | 64 | **nothing** — 5 sibling root nodes, no root element | **not a seam** |

**`PaletteCardSwatches` is a prop-drilling curtain.** All eight props (`openPopoverIndex`, `canHover`,
`floatingStyle`, `safeFirstColor`, `displaySlug`, `swatchClass`, `colors`, `isLocal`) are state the
parent obtained from `useHoverPopover()` and `useSafeAccentFn()`; all eight emits relay straight back
to that same composable's handlers. Extraction added a hop and 16 declarations and removed no
coupling. The proof that the seam is wrong sits in the same directory: `CurrentPaletteEditor.vue:233`
calls `useSwatchActions(...)` — which calls `useHoverPopover()` — **itself**, and needs no curtain.
Two components, one concept, two opposite ownership models.

**`PaletteCardMeta` is an `#include`, not a component.** Its template has five sibling root nodes and
no root element, so it can never carry a class, can never be styled at its root (edict 5 —
root-level styling is *structurally impossible* here), and its layout is wholly determined by the
parent's `flex items-center gap-2 min-w-0` row (`PaletteCard.vue:44`). It is unusable outside that
exact row. Its own extraction comment (lines 2-4) cites a *"PP-8 cap cure"* — it was split to get a
file under a line cap, which is the definition of a non-seam and exactly what
`feedback_kiss_no_contrivance` forbids.

**Counted coupling surface** of "the component": 11 props + 18 emits + 1 imperative exposed method +
(8 props + 8 emits) on the swatch child + (5 props + 2 emits) on the menu child. That is *more*
declared interface than the pre-split single file, spread across six files.

---

## 2. The lattice I would build greenfield

Pass-1 §4 proposed a lattice I substantially endorse. Pass 2 changes one thing and adds one: the
**Swatch belongs in glass-ui**, and `demo/palettes/export.ts` must die in favour of the byte-exact
set (pass 1 only split out `slug.ts`).

```text
@mkbabb/glass-ui  (the design system owns every recipe below — none of it lives in demo/)
  ./swatch    Swatch       — WatercolorDot + its popover as ONE component. Renders a real
                             <button>, named, keyboard-reachable, positioned by the reka-ui
                             Popover on BOTH pointer types. `.floating-panel` ceases to exist:
                             the Popover owns its own surface.       (kills L-15, L-16, L-17, L-22)
  ./button    Button       — already ships `icon-only`; the ONLY icon button in the app  (kills L-20)
  ./chip      FeedbackChip — the saved!/error beat; `./toast` already exists for the global case
  ./card      Card         — already ships; `cartoon-surface` stays decoration-only

demo/shared/ui/                    (already exists — EmptyState.vue, PaneHeader.vue)
  SwatchCard.vue    presentational shell: colors + slots #title #meta #actions #body,
                    `expanded`, the producer press register, no DTO, one `toggle` event

demo/palettes/
  model/      types.ts · kind.ts · slug.ts      pure TS, zero Vue, zero glass-ui   (kills pass-1 L-8)
  export/     serializers.ts + the 12 byte-exact modules   ONE home; export.ts DELETED    (kills L-18)
  ports/      usePalettePorts.ts                the command surface — already exists
  card/
    PaletteCard.vue         Palette DTO + injected port → SwatchCard. ONE `select` event out.
                            Every mutation through the port.       (kills pass-1 L-3, L-4, L-5)
    PaletteCardMenu.vue     renders the port's `CardAction[]`; no `action: string`; reads
                            availability from the PORT, never from transport  (kills pass-1 L-3)
    PaletteCardSwatches.vue calls useSwatchPopover() ITSELF; 2 props
    (PaletteCardMeta        DELETED — inline in the title row, or a real <PaletteChips> with a root)
    (ActionFeedback         DELETED — glass-ui FeedbackChip driven by port state, not defineExpose)

color-session/ink.ts   TOTAL: certifyAccentInk never throws on dynamic input   (kills pass-1 L-1)
demo/ui/               DELETED (19 forwarding dirs)                            (kills pass-1 L-2, L-19)
```

Three transpositions carry the elegance:

1. **Commands down, not events up.** The panes already provide `BROWSE_PORT_KEY` /
   `LIBRARY_PORT_KEY`. Inject the port in the card. 18 emits → 1. The menu renders *what the port
   offers*, so a menu item cannot exist without a handler — pass-1 L-3's entire defect class becomes
   unrepresentable, and L-5's `defineExpose` + `cardRefs` channel dissolves into port state keyed by
   the palette's one identity.
2. **One Swatch component, in the design system.** It deletes four findings at once — the orphan
   class, the `currentTarget` throw, the dropped `tag`/`aria-label` contract, and the split
   centering transform — plus the entire hover/touch dual path.
3. **Delete the alias layers**: `demo/ui/` (19 shims) and `demo/palettes/export.ts` (the legacy
   twin). Both are named-and-deferred migration residue; both are edict-2 violations the codebase's
   own comments already acknowledge.

Performance falls out rather than being chased: per-component glass-ui subpaths instead of a 234 KB
root barrel; one design-system Popover per open swatch instead of a Teleport per swatch; the CSS
`vj-*` transition family instead of a JS composable that writes inline `transition` strings and
forces two reflows per expand (`useHeightTransition.ts:32,56,63`).

---

## 3. What I checked and found sound (pass-2 negatives)

- **Published-surface hygiene holds.** No file in the card's cone imports `@mkbabb/value.js` at all;
  the whole `demo/palettes/` feature touches it twice, both correct subpaths:
  `mix.ts:14 → @mkbabb/value.js/color`, `export/png.ts:11 → @mkbabb/value.js/color`. No `@src/*`, no
  `dist/*`, no deep path. `grep -rn 'from "@mkbabb/value.js"' demo/` → **zero** bare-root imports,
  which matters because `exports` has no `"."` key: a bare-root specifier would be one a real
  consumer could not write. **The T.W1 dogfood keystone holds.**
- **`verbatimModuleSyntax` (edict 8): clean** across all six files — `PaletteCard.vue:168-169`,
  `PaletteCardMenu.vue:177-178`, `PaletteCardSwatches.vue:72`, `PaletteCardMeta.vue:59`.
- **No global keyframe forked into a component.** Both scoped `<style>` blocks in the folder
  (`PaletteCard.vue:337-364`, `ActionFeedback.vue:50-58`) contain only geometry custom properties for
  the shared `vj-morph` / `vj-celebrate` families. Edict 6 respected; the retired
  `golden-text-shimmer` fork is genuinely gone.
- **`card/index.ts` is a named re-export barrel**, not a star re-export — correct for SFCs whose
  scoped `<style>` makes the import side-effecting (PI-6).
- **`useTemplateRef`** used correctly at `PaletteRenameInput.vue:48`.
- **`useHoverPopover.close()` is bypassed** at four sites in `PaletteCard.vue` (277, 322, 327, 332)
  which null `openPopoverIndex` directly without cancelling the leave timer. I traced every re-open
  path (`onHover`, `onSwatchClick`) — each calls `cancelLeave()` first, so the divergence is
  **currently benign**. Recorded as an unowned invariant, **not** a defect.
- **`PaletteColorStrip`** (72 L) carries no colour maths and no glass-ui edge — `vue` + own types
  only. Clean.

---

## 4. Probe log (pass 2)

Live server `http://localhost:9000`, Chrome via Playwright MCP, read-only except `localStorage`
seeding in the MCP's isolated profile.

| # | action | result |
|---|---|---|
| 1 | read `visual/REPORT.{md,json}` + 2 shots for `/#/palettes`, `/#/browse` | empty states in all 4 matrices — zero cards ever captured (confirms pass-1 L-13) |
| 2 | seed `color-palettes`, `/#/palettes` | 3–4 cards render; menu trigger **36 × 36**, named |
| 3 | click title (editable) → rename state | 2 buttons **18 × 18**, `aria-label: null` (L-20) |
| 4 | synthetic probe `<div class="floating-panel">` + full stylesheet scan | `ruleCount: 0`; `position: static`, no bg/shadow/z-index (L-15) |
| 5 | expand card → `pointerenter` a swatch | panel at `{x:-720, y:900, w:1440, h:40}`, `parentIsBody:true` (L-15+L-16) |
| 6 | repeat with `unhandledrejection` listener | `REJ:TypeError: … null (reading 'getBoundingClientRect')` (L-16) |
| 7 | dump swatch element attrs + card focusables | `SPAN`, `aria-hidden="true"`, no label; only focusable = "Palette menu" (L-17) |
| 8 | `performance.getEntriesByType('resource')` for glass-ui | root barrel prebundle `decodedBodySize: 234309` (L-19) |
| — | interference | another seat's `"Malformed First"` seed put the pane in its error boundary and drifted the route repeatedly; re-seeded and re-ran |

No file under `src/`, `demo/`, `api/`, `test/`, `e2e/`, `docs/tranches/V/vnext/`, `scripts/dev/dev.sh`
or any `INBOX.md` was modified. Artifacts written: this file and the preserved
`challenge-L-library.pass-1-2026-07-24.md`.

---

## 5. Carried-forward docket (pass 1, re-verified this pass)

| id | severity | finding | pass-2 status |
|---|---|---|---|
| L-1 | **BLOCKER** | `certifyAccentInk` throws on the library's typed `Result`; one alpha'd palette colour destroys the pane | **STANDS** — `ink.ts:78` unchanged; independently corroborated by a live pane-boundary crash from another seat's malformed seed |
| L-2 | MAJOR | glass-ui imported through 19 prohibited one-line forwarding dirs while imported directly 4 lines away | **STANDS + measured** → L-19 |
| L-3 | MAJOR | cross-feature consumption; hosts wire 0/16, 4/16, 6/16, 15/16 of the emit surface ⇒ dead menu controls; card nested inside a `<button>` | **STANDS** — re-counted: BrowsePane 15, PalettesPane 6, ExtractWorkbench 4, AdminUsersPanel 3, MixSourceSelector 0 |
| L-4 | MAJOR | untyped string action bus with silent-drop default; `copyAll` orphan | **STANDS** — `grep -rn copyAll demo/ src/` → one hit, `PaletteCard.vue:294`, no producer |
| L-5 | MAJOR | feedback owned by the card, driven by `defineExpose` + `(el: any)` ref maps in two panes | **STANDS** — and the `el &&` guard means Vue's null-on-unmount call never deletes: instances are retained for the pane's lifetime |
| L-6 | MAJOR | six-file split cuts through the state | **STANDS + sharpened** → §1 (4 of 6 are real seams; 2 are not) |
| L-7 | MAJOR | 16 hand-rolled icon-button recipes beside the glass-ui atom | **STANDS + measured** → L-20 (18 × 18, nameless) |
| L-8 | MAJOR | two `slugify` homes, measured divergence, on the card's Export path | **STANDS + widened** → L-18 (the whole 914-line serializer layer is the duplicate) |
| L-9 | MINOR | bespoke JS height motion + `scrollIntoView` inside a feature composable | **STANDS + sharpened** → L-21 (it pierces the PRM guard) |
| L-10 | MINOR | two prop idioms and two hand-rolled `v-model`s in one folder | **STANDS** — `withDefaults`+`props.` at `PaletteCard.vue:182`, `ActionFeedback.vue:23`; 3.5 destructure at `PaletteCardMenu.vue:206`, `PaletteCardMeta.vue:61`, `PaletteRenameInput.vue:39` |
| L-11 | MINOR | `ActionFeedback` timer never disposed on unmount | **STANDS** — `ActionFeedback.vue:37-47`, no `onUnmounted` |
| L-12 | MINOR | ownership docs cite the excised `PaletteDialog` | **STANDS** — `constants.ts:5` cites `PaletteDialog.vue:403`; `find demo -name "PaletteDialog*"` → nothing |
| L-13 | INFO | visual audit rendered every card host empty — false-negative greens | **STANDS** — I read the four shots; `/#/palettes` = "No saved palettes yet.", `/#/browse` = "The commons is unreachable." |
| L-14 | INFO | the route rewrites itself; blocks live card probes | **STANDS** — I hit route drift repeatedly, though a shared browser confounds attribution this pass |

---

## 6. Pass-2 ranked docket

| id | severity | one line |
|---|---|---|
| L-15 | **BLOCKER** | `.floating-panel` defined by no module; hover popover is `position:static`, unstyled, measured at (−720, 900), 1440 px wide |
| L-16 | **BLOCKER** | `useHoverPopover.ts:30` reads `e.currentTarget` after dispatch → captured `TypeError` on every swatch hover; `as Element` masked it |
| L-17 | MAJOR | `WatercolorDot tag="button"` / `aria-label` dropped by glass-ui 7 → swatches are `<span aria-hidden>`; only focusable in an expanded card is the menu |
| L-18 | MAJOR | `export.ts` (132 L, legacy, live) vs `export/` (914 L, byte-exact, one test) — the whole serializer layer duplicated |
| L-19 | MAJOR | 18/19 `demo/ui` shims route to the glass-ui ROOT barrel: 234,309 B loaded live vs 8,123 B of chunks actually needed |
| L-20 | MAJOR | measured: hand-rolled rename buttons 18 × 18 and nameless, beside the atom's 36 × 36 named; WCAG 2.5.8 floor is 24 |
| L-21 | MINOR | `scrollIntoView({behavior:"smooth"})` pierces the app's `prefers-reduced-motion` guard by spec |
| L-22 | MINOR | `translateX(-50%)` owned by 1 of the 2 consumers of a centre-anchored coordinate (latent behind L-15/L-16) |
| L-23 | MINOR | `cssColor` — dead public prop threaded through 5 host call sites, reaching one rarely-rendered chip |
| L-24 | MINOR | `tsconfig.demo.json` `paths`: 3 dangling entries (2 retired subpaths), 2 published subpaths missing |
