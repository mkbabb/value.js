# CHALLENGE-L — library structure under `demo/shell/dock/DockStatusLamp.vue`

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, the tier
declared at spawn. Declared, not inherited.

Repository `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
Subject: `demo/shell/dock/DockStatusLamp.vue` (123 lines) + its colocated resolver
`demo/shell/dock/status-lamp.ts` (65 lines).

---

## Verdict

**DEFECTIVE.** The premise holds. The component itself is small and disciplined; the structure
under it is not. Twelve findings, three of which are load-bearing:

1. **One concept, two homes.** `DockStatusLamp` and `demo/palettes/browser/status/ApiOfflineChip.vue`
   are the same component written twice — byte-identical labels, byte-identical roles, 11-of-13
   byte-identical CSS declarations, twin keyframes under two names. The mechanism is a *placement*
   error: the pure resolver was homed in the consumer's directory (`shell/dock/`) instead of beside
   the state it resolves (`platform/transport/`), so the second seat cannot reuse it without a
   `palettes → shell` lateral edge. **The duplication is structurally forced.**
2. **A phantom design token, live-measured.** `--type-mono-caption` has **zero definition sites** in
   the repo *or* in glass-ui; `getComputedStyle(document.documentElement).getPropertyValue('--type-mono-caption')`
   returns `""`. Three demo sites consume it, each behind a different masking fallback. The lamp
   therefore paints at a hard-coded **11px** where the design system's caption rung is
   `clamp(0.75rem, 0.71rem + 0.21vw, 1rem)` (≥12px, fluid). glass-ui already ships the exact recipe
   as `@utility text-mono-caption` — which the demo uses in eight other places, one of them inside
   this same `shell/dock/` tree.
3. **The published surface the demo "proves" is not the published surface that ships.**
   `tsconfig.demo.json` declares three `paths` entries whose targets do not exist
   (`dist/index.d.ts`, `dist/subpaths/parsing.d.ts`, `dist/subpaths/units.d.ts`) and **omits** the
   two published subpaths the demo uses 11 times (`/css` ×10, `/value`). Those fall through to
   `node_modules/@mkbabb/value.js` — a **real installed 4.0.0 tarball inside the repo that is
   4.0.0**, whose `css.d.ts` is 10 910 bytes against the live `dist/`'s 12 490. `vue-tsc` checks the
   demo against the stale copy; Vite bundles the live one.

---

## What I ran

```
$ grep -rlo -- "--type-mono-caption:" demo/ src/ node_modules/@mkbabb/glass-ui/dist/
(no output — zero definition sites)

$ node -e "console.log(Object.keys(require('./package.json').exports).join(' '))"
./color ./value ./css ./easing ./math ./transform ./quantize

$ node -e "...tsconfig.demo.json paths keys..."
vue @vue/* @mkbabb/value.js @mkbabb/value.js/color @mkbabb/value.js/parsing
@mkbabb/value.js/math @mkbabb/value.js/easing @mkbabb/value.js/units
@mkbabb/value.js/transform @mkbabb/value.js/quantize

$ test -f dist/index.d.ts && echo EXISTS || echo MISSING
MISSING
$ test -f dist/subpaths/parsing.d.ts …  → parsing MISSING
$ test -f dist/subpaths/units.d.ts …    → units MISSING

$ ls -l dist/subpaths/css.d.ts node_modules/@mkbabb/value.js/dist/subpaths/css.d.ts
-rw-r--r--  12490  Jul 27 11:52  dist/subpaths/css.d.ts
-rw-r--r--  10910  Jul 17 21:10  node_modules/@mkbabb/value.js/dist/subpaths/css.d.ts
```

Live probe, dev server at `http://localhost:9000` (Playwright, WebKit-equivalent Chromium engine,
read-only — 6 evaluates, 2 navigations, 2 resizes):

```
--type-mono-caption  →  ""            (phantom)
--type-caption       →  "clamp( 0.75rem, 0.71rem + 0.21vw, 1rem )"
--radius-pill        →  "9999px"      (real — the lamp's `, 9999px` fallback is dead weight)
--destructive        →  "light-dark(hsl(0 72% 50%), hsl(0 80% 60%))"   (real — fallback dead)

.dock-status-lamp  computed fontSize        = 11px
                   computed borderRadius    = 9999px
                   data-variant             = "misconfigured"
                   role                     = "alert"
                   offsetParent.className   = "dock-band overture-dock-land"

@ innerWidth 1440 →  .lamp-label display=block   lamp.innerText = "dev misconfigured — run `npm run dev`"
@ innerWidth 430  →  .lamp-label display=none    lamp.innerText = ""     ← empty role="alert"
```

CSS duplication, measured by normalized declaration-set intersection:

```
lamp `.dock-status-lamp` decls: 18   chip `.api-offline-chip` decls: 13
IDENTICAL: 11
only in chip: ['border-radius: var(--radius-pill)', 'padding: 0.3rem 0.7rem']
only in lamp: [5 positioning decls, 'pointer-events: none', 'padding: 0.3rem 0.55rem',
               'border-radius: var(--radius-pill, 9999px)']
```

---

## The import cone, traced

| Edge | From → To | Direction | Verdict |
|---|---|---|---|
| `DockStatusLamp.vue:24` | → `vue` | external | ✅ |
| `DockStatusLamp.vue:25` | `shell/dock` → `platform/transport/useApiClient` | feature → platform | ✅ correct direction |
| `DockStatusLamp.vue:26` | `shell/dock` → `./status-lamp` | sibling | ⚠️ see L-1 — *the module is in the wrong home* |
| `status-lamp.ts:31` | `shell/dock` → `platform/transport/availability` (`import type`) | feature → platform | ✅ |
| `useApiClient.ts:19,20` | `platform/transport` → `./client.js`, `./availability.js` | intra-module | ✅ |
| `client.ts:26–28` | → `vue`, `./api-problem.js`, `./availability.js` | intra-module | ✅ |
| `DockStatusLamp.vue:31` | → `import.meta.env.DEV` | leaf → build env | ⚠️ L-12 |
| `DockStatusLamp.vue:36` | → `../../styles/foundation.css` (`@reference`) | feature → styles root | ✅ house idiom |

**No `@src/*` import. No deep `src/` reach. No `@mkbabb/value.js` import at all.** The T.W1
demo-dogfood keystone holds for this component — see *Negative proofs* below. The cone is 6 modules
deep and acyclic. `verbatimModuleSyntax` is satisfied (`status-lamp.ts:31` is `import type`; every
other import is a value import).

---

## Findings

### L-1 · MAJOR — one concept, two homes; the resolver is homed in the consumer

`DockStatusLamp.vue` + `status-lamp.ts` and `demo/palettes/browser/status/ApiOfflineChip.vue` are two
implementations of one concept: *(api availability) → (variant, role, label, dot, pill)*.

Evidence of identity:

- **Labels byte-identical.** `status-lamp.ts:54` `label: "dev misconfigured — run \`npm run dev\`"`
  vs `ApiOfflineChip.vue:17` (same string, as template text). `status-lamp.ts:60`
  `label: "backend offline — saved locally"` vs `ApiOfflineChip.vue:25`.
- **Roles identical.** `status-lamp.ts:39` `role: "alert" | "status"`; `ApiOfflineChip.vue:13` `role="alert"`,
  `:21` `role="status"`.
- **CSS 11-of-13 identical** (measured above). The two differences are *proof of the third defect*:
  the chip writes `border-radius: var(--radius-pill)` and the lamp writes
  `var(--radius-pill, 9999px)` — the same token, one with a needless fallback (L-2).
- **Keyframes are twins under two names.** `DockStatusLamp.vue:110-118` `@keyframes lamp-dot-pulse
  {0%,100%{opacity:1} 50%{opacity:.35}}` / `2.4s var(--ease-standard) infinite`; identical body at
  `ApiOfflineChip.vue:82-89` as `offline-dot-pulse`.
- The duplication is **documented rather than cured**: `status-lamp.ts:8-9` states the lamp speaks
  "the instrument register the per-surface `ApiOfflineChip` already speaks", and
  `DockStatusLamp.vue:41-42` "one status language, two seats."

**Mechanism.** The pure resolver was placed in `demo/shell/dock/status-lamp.ts` — inside the *consumer's*
feature directory — rather than beside the state it resolves (`demo/platform/transport/availability.ts`).
`ApiOfflineChip` lives in `demo/palettes/`. For it to reuse `resolveLampState` it would have to write
`import { resolveLampState } from "../../../shell/dock/status-lamp"` — a **feature → shell** edge,
exactly the boundary crossing this challenge names as illegal (and one the demo otherwise honours:
the only `palettes → shell` edges in the tree are two `import type { ViewId }` type-only edges,
`demo/palettes/usePalettePorts.ts:19` and `demo/picker/ColorPicker.vue:130`). **The wrong home forces
the second implementation.** Unique semantic ownership is violated by placement, not by carelessness.

**Reproduction.** `demo/palettes/browser/status/ApiOfflineChip.vue:36-37` re-derives the matrix
`availability.value === "unavailable"` / `=== "misconfigured"` inline, in a file that has no access
to the tested resolver, and consequently is covered by **zero** of `test/status-lamp.test.ts`'s
matrix rows.

**Live-observed second-order risk (labelled HYPOTHESIS).** `DockStatusLamp` is mounted
unconditionally at `Dock.vue:293`; `ApiOfflineChip` is mounted at
`CurrentPaletteEditor.vue:116` under `v-if="savedColorStrings.length > 0"`. On the palettes route
with ≥1 saved colour and a misconfigured latch, **two `role="alert"` nodes carrying identical text**
would be in the tree simultaneously — a double announcement. I measured
`document.querySelectorAll('[role="alert"]').length === 1` on `/#/palettes` with an empty session
(the chip's gate was false), so the collision is *not yet reproduced*; the predicate is quoted, the
outcome is inferred.

**Cure (transposition, not patch).** One home for the concept, in the transport layer that owns the
state, and one presentational component in the design system's register:

- `demo/platform/transport/api-status.ts` — move `resolveLampState` here verbatim, rename
  `resolveApiStatus(availability, { dev }) → ApiStatusFace | null`. It becomes a *platform* module
  both features may depend on downward. Delete `demo/shell/dock/status-lamp.ts`.
- Both seats consume it. `ApiOfflineChip` becomes a 5-line render of the same face; the dock lamp
  becomes the same render plus its band placement. See L-3 for what the render should actually be.

---

### L-2 · MAJOR — `--type-mono-caption` is a phantom token, masked by three different fallbacks

**Zero definition sites.** `grep -rlo -- "--type-mono-caption:" demo/ src/ node_modules/@mkbabb/glass-ui/dist/`
returns nothing. Live: `getPropertyValue('--type-mono-caption')` → `""`.

**Three consumption sites, three different masks:**

| site | fallback |
|---|---|
| `demo/shell/dock/DockStatusLamp.vue:54` | `0.6875rem` (magic literal) |
| `demo/palettes/browser/status/ApiOfflineChip.vue:47` | `0.6875rem` (magic literal) |
| `demo/picker/controls/ComponentSliders/ComponentSliders.vue:310` | `var(--type-caption)` (the real token) |

**Measured consequence.** `.dock-status-lamp` computes to `fontSize: 11px` — a fixed rung that never
participates in the fluid caption scale `--type-caption: clamp( 0.75rem, 0.71rem + 0.21vw, 1rem )`.
The lamp is the only caption in the dock band that does not scale with the viewport, and at every
viewport it is *below* the system's 12px caption floor.

**Root mechanism — the name is a utility, not a token.** glass-ui ships
`@utility text-mono-caption { font-family: var(--font-mono); font-size: var(--type-caption);
letter-spacing: var(--type-tracking-caps); text-transform: uppercase; }`
(`node_modules/@mkbabb/glass-ui/dist/styles/typography/utilities.css`). Someone read the *utility*
name and wrote `var(--type-mono-caption)` as if a matching custom property existed. It never did.
The demo already consumes the real utility in eight places — including **inside this same tree**,
`demo/shell/dock/menus/ProfileSection.vue:132`, and `demo/palettes/browser/card/PaletteCard/PaletteCardMenu.vue:37`.

This is edict-2 (masking fallback hiding a broken contract) and edict-4 (the design system owns this
recipe) in one line of CSS. The lamp also hand-rolls `letter-spacing: 0.06em` where the system's
caps rung is `--type-tracking-caps: 0.1em`.

**Cure.** Delete the three `var(--type-mono-caption, …)` sites; apply `text-mono-caption` (or
`class="fira-code text-mono-caption"`, the established pairing at `ConsoleRail.vue:75`). The
`var(--radius-pill, 9999px)` and `var(--destructive, oklch(0.58 0.19 25))` fallbacks in the same file
are likewise dead — both tokens resolve live — and the sibling chip already writes `--radius-pill`
bare, proving the fallback unnecessary.

---

### L-3 · MAJOR — three glass-ui primitives hand-rolled in demo CSS

`node_modules/@mkbabb/glass-ui/package.json` exports, among 60+ subpaths:

- **`./status-dot`** — `StatusDot { state?: "online"|"warning"|"error"|"unknown"; size?: "sm"|"md";
  label?: string }`. Its own JSDoc: *"Accessible identity. Omit when adjacent text already names the state."*
- **`./chip`** — `Chip { mode: "static"; shape: "pill"; size: "sm"; tone?; surface? }`; `chipVariants`
  SIZE.sm = `gap-1 px-2.5 py-1 text-caption`.
- **`./pulse`** — `PulseState = "active"|"idle"|"success"|"warning"`.

`DockStatusLamp.vue` re-implements all three in 88 lines of scoped CSS: the pill
(`:43-62` — inline-flex, gap, pill radius, hairline `--card-edge`, `--background` 55% wash), the dot
(`:79-86` + `:104-107` — 0.4rem, open ring vs filled), and the pulse (`:109-122`).
`ApiOfflineChip.vue` re-implements the same three again (L-1).

The demo already imports `Chip` from `@mkbabb/glass-ui/chip` at
`demo/workbenches/gradient/GradientVisualizer/easing/EasingSpecimenStrip.vue:14`, so the house
precedent exists and this component departs from it. `StatusDot` and `Pulse` have **zero** demo
consumers — two shipped design-system primitives that the app hand-rolls instead.

Note that adopting `StatusDot`'s `label` prop would have prevented L-4 **by construction**: the prop
exists precisely because a bare dot has no accessible identity.

**Cure.** `<Chip mode="static" shape="pill" size="sm" :tone="face.tone"><StatusDot :state="face.state"
:label="face.label" />{{ face.label }}</Chip>`. The `misconfigured`→`error` and `unavailable`→`unknown`
mapping is a two-line addition to the moved resolver (L-1). If the *filled vs open ring* distinction
is not expressible in `StatusDotState`, that variant belongs in glass-ui — edict 4 — not in a demo
`[data-variant]` override.

---

### L-4 · MAJOR — `role="alert"` with an empty accessible name below 1024px (reproduced)

`DockStatusLamp.vue:67-69` sets `.lamp-label { display: none }`, lifted to `display: inline` only at
`@media (min-width: 1024px)` (`:70-74`). The dot is `aria-hidden="true"` (`:18`). The root carries
`:role="lamp.role"` (`:16`) — `"alert"` in the misconfigured face.

The in-file comment at `:65-66` asserts: *"The role + label stay in the accessibility tree
(visually-hidden, not v-if'd)."* **That is false.** `display: none` removes an element from the
accessibility tree — CSS Display §1.3: a `display: none` box "generates no boxes… and its contents
are not rendered", and HTML-AAM excludes non-rendered subtrees from accessibility APIs.
`visibility: hidden` and `display: none` are both exclusions; the "visually-hidden" idiom the comment
invokes (clip-rect / `sr-only`) is *not* what the code does.

**Reproduction, measured:**

```
resize → 430×900,  http://localhost:9000/#/
  getComputedStyle('.lamp-label').display  = "none"
  lamp.getAttribute('role')                = "alert"
  lamp.innerText                           = ""          ← empty alert
  lamp.getBoundingClientRect()             = 25.99 × 17.99
resize → 1440×900
  .lamp-label display = "block",  innerText = "dev misconfigured — run `npm run dev`"
```

Under 1024px a screen reader is handed an assertive live region with no content. This is a
*library-structure* finding, not merely an a11y one: the accessible name is a property of the
**face** (owned by the resolver, `status-lamp.ts:40` already carries `label`), but the *rendering
decision that destroys it* lives in the SFC's media query with no contract between them.

**Coverage gap that let it through:** `test/status-lamp.test.ts` asserts the pure matrix and never
mounts the SFC (see L-6 for why it cannot). `e2e/smoke/oracles/o22-status-lamp.spec.ts:56-83` asserts
`data-variant`, `role`, and geometry — never the accessible name, and only at the default desktop
viewport. The visual audit's a11y probe records `smallTapTargets / imgNoAlt / namelessButtons` only
(`REPORT.json → results[].probe.a11y`) — `namelessButtons` inspects buttons, so an unnamed `alert`
is invisible to it. Three suites, zero coverage.

**Cure.** `StatusDot`'s `label` (L-3), or `sr-only` instead of `display:none`. Never `display:none`
on the only text in a live region.

---

### L-5 · MAJOR — two paths to `@mkbabb/glass-ui/dock` in adjacent lines

```
demo/shell/dock/Dock.vue:4   import { GlassDock, DockLayerGroup, DockLayer } from "./";
demo/shell/dock/Dock.vue:5   import { DockControl, DockSeparator } from "@mkbabb/glass-ui/dock";
```

Line 4 goes through `demo/shell/dock/index.ts`, whose entire content is:

```
export { GlassDock, DockLayerGroup, DockLayer } from "@mkbabb/glass-ui/dock";
export { default as Dock } from "./Dock.vue";
```

Line 5 goes direct. **Ten other demo sites** use the direct form
(`GradientVisualizer.vue:13`, `MixResultDisplay.vue:3`, `ExtractWorkbench.vue:187`,
`ExtractControls.vue:98`, `ImageEyedropper.vue:95`, `ConfigSliderPane.vue:20`,
`ActionButton.vue:55`, `DockViewSelect.vue:3`, `Dock.vue:5`, `ActionBarToggle.vue:5`).
`Dock.vue:4` is the **only** consumer of the barrel's re-export, and it sits directly above a line
doing it the house way. `demo/shell/dock/index.ts` also imports its own directory from within that
directory (`Dock.vue` → `./` → `./Dock.vue`), a self-referential barrel hop.

The barrel's second export (`Dock`) has exactly one consumer, `demo/color-picker/App.vue:167`.
`DockStatusLamp` is *not* in the barrel — `Dock.vue:14` imports it relatively — so the barrel's
"public surface" is arbitrary: two of the directory's nine components are published, seven are not,
by no stated rule.

Edict 2 (dual path) + edict 3 (contrivance). **Cure:** delete `demo/shell/dock/index.ts`; rewrite
`Dock.vue:4` to the direct specifier and `App.vue:167` to `import Dock from "../shell/dock/Dock.vue"`.
Net: −1 file, −1 indirection, one path to the design system everywhere.

---

### L-6 · MAJOR — the api-client "DI seam" is a false seam, and it is what stranded the resolver

`useApiClient.ts:2-16` claims the seam exists so consumers "depend on the provided client, not a
hidden module import" and "never a hard module-singleton import" (echoed at `DockStatusLamp.vue:28-29`).

The provided object **is** the module singletons:

```
useApiClient.ts:36-44
export function createApiClient(): ApiClient {
    return { request, adminRequest, sessionToken: sessionTokenRef,
             availability: apiAvailability, baseUrl: BASE_URL };
}
```

`createApiClient()` takes **no parameters**. `availability` is literally `apiAvailability`, the
module `ref` exported at `availability.ts:47`. There is exactly one provider
(`App.vue:189 provideApiClient()`) and three consumers (`DockStatusLamp.vue:30`,
`ApiOfflineChip.vue:35`, `PaletteCardMenu.vue:216`), all of which read only `availability`. No
call site anywhere constructs a different client; no test substitutes one. The indirection is
unsubstitutable by construction — it is a `provide/inject` wrapper around a module import.

**It is not free.** `useApiClient()` throws when no provider stands above (`useApiClient.ts:56-60`),
so `DockStatusLamp.vue` **cannot be unit-mounted** without an App-root provider. That is precisely
why the pure matrix had to be extracted into a separate module and tested there instead of asserting
against the component — and that extraction, homed in the dock directory, is the proximate cause of
L-1. A contrivance produced a mislocated module which forced a duplicate implementation.

**Cure.** Either give the seam a reason to exist (`createApiClient(deps)` with an injectable
transport, so tests can drive faces through the component) or delete it and import `apiAvailability`
directly — three consumers, three one-line edits. Do not keep a seam that cannot seam.

---

### L-7 · MINOR — demo unit tests have two homes; `status-lamp` lives in the library's tree

`test/status-lamp.test.ts:39-41` imports `../demo/shell/dock/status-lamp` and
`../demo/platform/transport/availability`. `test/` is the *library* suite — `vitest.config.ts`
states "the test tree mirrors the src shape (test/units/color/…, test/parsing/…, …)". The demo suite
home is `demo/test/**`, added deliberately at V′.W40-S3 bracket B7 for exactly this reason
("they were silently dropped outside the `test/**` glob").

Measured: **11 files under `test/` reach into `demo/`**, spanning 21 distinct demo modules
(`workbenches/gradient/*`, `workbenches/extract/*`, `color-session/*`, `palettes/mix`,
`picker/controls/*`, `shell/viewSchema`, `shell/dock/status-lamp`, `platform/transport/availability`,
`color-picker/composables/boot/view-accents`). Meanwhile `demo/test/` holds three files. Two homes,
no rule distinguishing them.

**Cure.** `test/` mirrors `src/` only; every demo suite moves to `demo/test/<area>/…`. The
status-lamp suite becomes `demo/test/platform/api-status.test.ts` once L-1's move lands.

---

### L-8 · MINOR — two dead barrel hops publish `ApiOfflineChip` to nobody

`demo/palettes/browser/status/index.ts:7` re-exports `ApiOfflineChip`; `demo/palettes/browser/index.ts:46`
re-exports it again from that barrel. The only consumer imports it **relatively**:
`CurrentPaletteEditor.vue:193 import ApiOfflineChip from "../status/ApiOfflineChip.vue"`.

`grep -rn 'from "\.\./browser"\|palettes/browser"' demo/` → **no hits**: the outer barrel has zero
importers at all. The inner barrel's own header even records the fact — "ApiOfflineChip's live
consumer is CurrentPaletteEditor (internal, direct relative import)" — and publishes it anyway.
A file whose sole content is a re-export nobody consumes is public surface for its own sake
(edict 3). **Cure:** delete `demo/palettes/browser/status/index.ts`; drop line 46 of the outer barrel.

---

### L-9 · MINOR — the contract pointers in the doc comments name modules that do not exist

Both files direct the reader to paths killed at W43 (RF-15), when every demo `@…` alias was retired:

- `demo/shell/dock/status-lamp.ts:14` — *"the transport latch … live untouched in
  `@lib/palette/api/availability.ts`"*. Real path: `demo/platform/transport/availability.ts`.
  The `@lib` alias no longer exists (`tsconfig.demo.json` — "No `@styles`/`@components`/`@utils`/
  `@lib`/`@composables`/`@assets` project alias survives").
- `demo/palettes/browser/status/index.ts:5` — *"re-homed as the dock status lamp
  (`@components/custom/dock/DockStatusLamp.vue`)"*. Real path: `demo/shell/dock/DockStatusLamp.vue`;
  `@components` is likewise dead, and `demo/@/components/custom/dock/` no longer exists on disk.

These are the *only* pointers to the S.W0-1 honesty contract a reader is given. Both are broken.
Doc-drift is a structure finding when the doc is the map of the structure.

---

### L-10 · MINOR — the component's layout contract is non-local and unenforced

`DockStatusLamp.vue:44-47` is `position: absolute; inset-inline-end: 0; top: 50%; translate: 0 -50%`,
with no positioned ancestor of its own. Measured `offsetParent.className = "dock-band overture-dock-land"`.

The positioning context is authored in a third module and mounted by a fourth:

- `demo/styles/shell.css:39-40` — `.dock-band { position: relative; … }`, with a comment that names
  the dependency: *"position: relative seats the band-chrome instruments (the W6-6 status lamp)."*
- `demo/color-picker/App.vue:26` — `<nav class="dock-band">`.

The component is *mounted* from `Dock.vue:293` but *positions against* `App.vue`'s `<nav>`. Nothing —
no type, no test, no lint — enforces that `.dock-band` keeps `position: relative`; if it is ever lost,
the lamp silently escapes to the next positioned ancestor or the initial containing block. Note also
`.dock-band { overflow: hidden }` (`shell.css:26`), so the failure mode is *disappearance*, not
misplacement. The e2e oracle checks the lamp is inside the `nav` landmark
(`o22-status-lamp.spec.ts:63-70`) and that its mid-Y falls in the dock's band (`:79-83`) — it would
catch a gross escape, but only in the `unavailable` face, only at the desktop viewport, and it never
asserts `inset-inline-end`.

**Cure.** The band's own stylesheet should own the seat: `.dock-band > .dock-status-lamp {
position:absolute; inset-inline-end: 0; … }` in `shell.css` beside the `position:relative` that makes
it work, leaving the component to own only its own appearance. Alternatively the band becomes a grid
with a named `status` area and the lamp is placed in flow — no absolute positioning at all, and the
`overflow:hidden` trap goes away.

---

### L-11 · INFO — `.fira-code` is declared twice; the demo copy shadows a design-system utility

`demo/styles/utils.css:9-11` declares `.fira-code { font-family: var(--font-mono); }`. glass-ui
already ships `@utility fira-code { font-family: var(--font-mono); font-feature-settings: "liga", "calt"; }`
(`dist/styles/typography/utilities.css`), imported at `demo/styles/foundation.css:56-57`.

Live probe on a synthetic `<span class="fira-code">`: `fontFamily = "Fira Code", … monospace`,
`fontFeatureSettings = "calt", "liga"` — the design-system utility's feature settings survive
because the demo redeclaration happens to set only the one property they agree on. The demo
declaration is therefore a no-op duplicate today, and a latent shadow tomorrow: any future divergence
in glass-ui's `fira-code` font-family is silently overridden by the demo's unlayered copy.
`DockStatusLamp.vue:14` applies the class. **Cure:** delete `demo/styles/utils.css:9-11`.

---

### L-12 · INFO — `import.meta.env.DEV` read raw in a leaf SFC

`DockStatusLamp.vue:31 const isDev = import.meta.env.DEV;`. The resolver was deliberately written to
take `isDev` as an argument for testability (`status-lamp.ts:24-25`), which is right — but the *value*
is then sourced from the build environment inside a leaf presentational component. There are only
three `import.meta.env.DEV` reads in the whole demo (`status-lamp.ts` comment,
`DockStatusLamp.vue:31`, `useCustomColorNames.ts:52`); there is no env seam. Minor today; it becomes
L-6's problem the moment anyone wants to exercise the dev-gated face in a story or a mounted test.
**Cure:** fold the gate into the moved `api-status.ts` (`resolveApiStatus(availability)` reading
`import.meta.env.DEV` once at module scope, with the pure `(availability, isDev)` core still exported
for the matrix test).

---

### L-13 · MAJOR — the demo's declared value.js type surface ≠ the published export map

*(Outside this component's import cone — `DockStatusLamp` imports no library code — but squarely on
the CHALLENGE-L axis: "does the demo import from `@mkbabb/value.js` through the published subpath
export map… a false proof of the public API".)*

```
package.json#exports :  ./color  ./value  ./css  ./easing  ./math  ./transform  ./quantize     (7, no ".")
tsconfig.demo paths  :  .  /color  /parsing  /math  /easing  /units  /transform  /quantize     (8)
```

Three defects in one drift:

1. **Three declared type paths whose targets do not exist.** `dist/index.d.ts` MISSING,
   `dist/subpaths/parsing.d.ts` MISSING, `dist/subpaths/units.d.ts` MISSING (verified with `test -f`
   against a freshly built `dist/`, 2026‑07‑27 11:52). The `.` root entry is worse than dead: an
   `exports` map without a `"."` key means a real consumer writing `import … from "@mkbabb/value.js"`
   gets `ERR_PACKAGE_PATH_NOT_EXPORTED`. The demo declares types for an import no consumer can write.
   `vite.config.ts:44-51` generates its runtime alias set *from the exports map*, so the runtime and
   the typechecker disagree about whether the bare specifier exists at all.
2. **Two published subpaths have no `paths` entry — including the demo's second-most-used.**
   `@mkbabb/value.js/css` is imported at **10** demo sites and `@mkbabb/value.js/value` at one;
   neither is in `tsconfig.demo.json`. They resolve through `node_modules`.
3. **`node_modules/@mkbabb/value.js` is a real installed 4.0.0 tarball inside the repo that is
   4.0.0** — not a symlink (`readlink` → not a symlink; own `package.json`, `LICENSE`, `README.md`,
   `dist/`, dated Jul 17 21:10). So `/css` and `/value` **typecheck against a stale copy while Vite
   bundles the live one**, and the two have measurably diverged:

   ```
   dist/subpaths/css.d.ts                              12490 B  Jul 27 11:52
   node_modules/@mkbabb/value.js/dist/subpaths/css.d.ts 10910 B  Jul 17 21:10
   $ diff …
   < declare type Alpha_2 = number | "none";
   < declare type Channel_2 = number | "none";
   < declare type ChannelsBySpace_2 = { … };        (present live, absent installed)
   ```

The T.W1 demo-dogfood keystone — "the demo consumes value.js ONLY through the published subpaths…
a real `.d.ts` trust boundary" (`tsconfig.demo.json` header) — is therefore only *half* true: for
`/css` and `/value` the trust boundary is a two-week-old artifact, and for `.`, `/parsing`, `/units`
it points at nothing. **Cure:** generate `tsconfig.demo.json#paths` from `package.json#exports` the
same way `vite.config.ts` already generates its aliases (one script, one source of truth), and remove
`@mkbabb/value.js` from the repo's own `node_modules` so there is exactly one copy of the library in
the graph.

---

## The greenfield lattice

Structuring this today with no legacy, the concept *"the backend's reachability, made visible"*
is **one platform module + one presentational component + two placements**:

```
demo/platform/transport/
  availability.ts        ← unchanged: the latch, the two errors, the misconfig triad (already correct)
  api-status.ts          ← NEW HOME. The pure face resolver, beside the state it resolves.
                            export type ApiStatusFace = {
                                state: StatusDotState;      // glass-ui's vocabulary: "error" | "unknown"
                                role: "alert" | "status";
                                label: string;
                            };
                            export function resolveApiStatus(
                                a: ApiAvailability, isDev: boolean
                            ): ApiStatusFace | null      // ← the O-22 matrix, unchanged
  useApiClient.ts        ← either given a real parameter, or deleted (L-6)

demo/shared/ui/
  ApiStatusPill.vue      ← ONE presentational component, ~20 lines:
                            <Chip mode="static" shape="pill" size="sm" :tone="…" :role="face.role">
                              <StatusDot :state="face.state" :label="face.label" />
                              <span :class="labelClass">{{ face.label }}</span>
                            </Chip>
                            props: { compact?: boolean }   // compact ⇒ label is sr-only, never display:none
                            zero hand-rolled pill CSS, zero hand-rolled dot CSS, zero local keyframes

demo/shell/dock/Dock.vue           <ApiStatusPill class="dock-band-instrument" compact-below="lg" />
demo/palettes/browser/card/
   CurrentPaletteEditor.vue        <ApiStatusPill />
demo/styles/shell.css              .dock-band > .dock-band-instrument { position:absolute; inset-inline-end:0; … }
                                   ← the seat lives with the `position: relative` that makes it work
```

Deletions this makes possible: `demo/shell/dock/status-lamp.ts`,
`demo/palettes/browser/status/ApiOfflineChip.vue`, `demo/palettes/browser/status/index.ts`,
`demo/shell/dock/index.ts`, `demo/styles/utils.css:9-11`, ~170 lines of duplicated scoped CSS, one of
two identical keyframe blocks, and every `var(--type-mono-caption, …)`. Additions: one 20-line SFC
and one moved file. `demo/shared/ui/` **already exists** (`EmptyState.vue` lives there), so this is
not a new shared directory — edict 3 is satisfied.

Direction of every edge in that lattice is downward: `shell → shared → platform` and
`palettes → shared → platform`. No feature→feature edge, no feature→shell edge, one home per concept.
The `test/` suite for the matrix moves to `demo/test/platform/api-status.test.ts` and gains the rows
it cannot express today (compact face keeps its accessible name; both seats render the same face).

---

## Negative proofs

Things this challenge told me to suspect that I checked and found **clean**:

- **No deep `src/` reach, no illegal library import.** `DockStatusLamp.vue` imports `vue`,
  `../../platform/transport/useApiClient`, `./status-lamp`. Its full transitive cone
  (`useApiClient.ts` → `client.ts`, `availability.ts` → `api-problem.ts`) imports only `vue` and its
  own siblings. Zero `@src/*`, zero `../../../src/*`, zero `@mkbabb/value.js` at any depth. The
  T.W1 keystone holds for this component. (L-13 is about the demo's *global* value.js resolution
  posture, not this cone.)
- **`verbatimModuleSyntax` satisfied.** The one type-only import in the cone,
  `status-lamp.ts:31 import type { ApiAvailability }`, is correctly `import type`.
- **No god module.** `DockStatusLamp.vue` is 123 lines of which 88 are CSS and 11 are comment; the
  script block is 8 lines. `status-lamp.ts` is one pure total function. Neither is a god module and
  nothing was added to one.
- **Animations preserved.** `lamp-dot-pulse` (`:109-122`) is a component-scoped keyframe, which
  edict 6 explicitly permits. My proposed cure *moves* it (into the glass-ui `Pulse`/`StatusDot`
  primitive or a tokenized global) — it never deletes it. The `@media (prefers-reduced-motion:
  no-preference)` guard is correct and must survive the move.
- **Idiomatic Vue 3.5.** No props to destructure, no template ref needed, no `defineModel`
  round-trip; `computed` over an injected `Ref` is the right shape. Nothing here needs
  `useTemplateRef` or `shallowRef`.
- **No back-compat shim, no alias, no migration path** in the component or its resolver. The dead
  `DevMisconfigBanner` was genuinely deleted, and `o22-status-lamp.spec.ts:37` keeps a negative watch
  on its class — that is the *right* way to retire a component, and it is working.
- **`ActionBarLayer`'s `useLayerTransition` reimplementation** (a named historical suspect): not in
  this component's cone. `demo/shell/dock/layers/ActionBarLayer.vue` is a sibling, not a dependency —
  out of scope for this seat.
- **Visual audit corpus:** all 60 captures show **0** `blankOrNearBlank`, **0** `pageErrors`, **0**
  `horizontalOverflow`, **0** `darkClassMissing` for every route; the single `consoleError`
  (`safari-desktop-light /#/`: "WebGL: context lost.") is the blob renderer, unrelated to this
  component. I read `shots/safari-mobile-light/picker.png` — the dock band renders correctly and the
  lamp is **absent from every capture** (the harness ran with a reachable backend), which is itself
  the note in L-4: this component has zero pixels in the audit corpus.
