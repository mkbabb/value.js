# CHALLENGE-C · `demo/shell/dock/DockStatusLamp.vue` — implementation audit

## Model receipt

I observe myself to be **Opus 5 (`claude-opus-5[1m]`, 1M context)** — the model this seat was
spawned with, explicitly declared. No inherited or undeclared tier.

---

## Scope, substrate, method

| item | value |
|---|---|
| subject | `demo/shell/dock/DockStatusLamp.vue` (123 lines) |
| coupled units read whole | `demo/shell/dock/status-lamp.ts` (65) · `demo/platform/transport/availability.ts` (195) · `demo/platform/transport/useApiClient.ts` (62) · `demo/platform/transport/client.ts` (head) · `demo/palettes/browser/status/ApiOfflineChip.vue` (86) · `demo/shell/dock/Dock.vue:120-135,270-295` · `demo/styles/shell.css:20-45` |
| tests read whole | `test/status-lamp.test.ts` (160) · `e2e/smoke/oracles/o22-status-lamp.spec.ts` (85) · `e2e/smoke/oracles/t31-dock-band.spec.ts:95-140` |
| repo HEAD at audit | `4f78e57b` (branch `tranche-u`; the commission named `c654824e` — the branch advanced, subject file untouched since `Jul 17 14:48`) |
| live probes | 4 Playwright/CDP runs against `http://localhost:9000`, artefacts in `./probe/` |
| images read | `visual/shots/safari-desktop-light/picker.png` · `visual/shots/rtl-desktop/picker.png` · `visual/shots/forced-colors-desktop/picker.png` · `./probe/lamp-1440.png` · `./probe/lamp-390.png` |
| files written | only under `docs/tranches/V/megatranche/audit/components/shell-dock-dockstatuslamp/`. **No source edits.** |

**Verdict: DEFECTIVE.** Four MAJOR findings, four MINOR, three INFO. The component's own doc-comments
state three guarantees — *"guaranteed visible the moment the shell paints"*, *"the role + label stay
in the accessibility tree"*, *"the a11y role IS the register"* — and the live tree violates the
second outright at every viewport and the third at every viewport below 1024px. The visible remedy
string it exists to carry is rendered untypeable by its own `font-variant`.

---

## Findings, ranked

### C-1 · MAJOR — the `role="alert"` live region has **no accessible name at any width**, and **no accessible content at all below 1024px**

**Evidence — CDP `Accessibility.getPartialAXTree` on `.dock-status-lamp`**
(`./probe/p1-lamp.mjs`, output `./probe/p1-lamp.json`):

```
w1440 | ax= {'role': 'alert', 'name': '', 'ignored': False, 'childIds': 1}   labelDisplay block  innerText 'dev misconfigured — run `npm run dev`'
w1024 | ax= {'role': 'alert', 'name': '', 'ignored': False, 'childIds': 1}   labelDisplay block  innerText 'dev misconfigured — run `npm run dev`'
w1023 | ax= {'role': 'alert', 'name': '', 'ignored': False, 'childIds': 0}   labelDisplay none   innerText ''
w390  | ax= {'role': 'alert', 'name': '', 'ignored': False, 'childIds': 0}   labelDisplay none   innerText ''
```

Two distinct defects in one node.

**(a) `name: ""` at every width.** ARIA 1.2 §5.3.2 gives `alert` `nameFrom: author` only — the
`alert` role **does not take its accessible name from contents**. `DockStatusLamp.vue:12-20` sets no
`aria-label`, no `aria-labelledby`:

```
$ grep -c "aria-label\|aria-labelledby\|aria-live\|sr-only" demo/shell/dock/DockStatusLamp.vue
0
```

So the node is exposed as an **unnamed alert** in every matrix. At ≥1024 the live-region
*announcement* still carries the child text (`childIds: 1`), so the failure is partial; queried by
name (VoiceOver rotor, `getByRole("alert", {name})`), it is anonymous everywhere.

**(b) `childIds: 0` below 1024px — the alert is completely mute.** The only text node is
`.lamp-label`, and `DockStatusLamp.vue:67-69` hides it with `display: none`, which **removes the
subtree from the accessibility tree** (CSSOM/ARIA: `display:none` → not rendered → excluded).
The sibling dot is `aria-hidden="true"` (`:18`). Nothing is left. Measured `innerText: ''`,
`childIds: 0`.

**The component asserts the opposite in its own comment**, `DockStatusLamp.vue:64-66`:

> `The role + label stay in the accessibility tree (visually-hidden, not v-if'd).`

That prose is the proof this is an implementation bug, not a design choice: the author intended
visually-hidden and wrote `display:none`.

**The correct idiom is already present and working in this tree.** Measured live
(`./probe/p4-css.mjs`): injecting `<span class="sr-only">` yields
`position:absolute; width:1px` → `srOnlyWorks: true`. It is already used at
`demo/palettes/PalettesPane.vue:25`.

**Reproduction.** `node docs/tranches/V/megatranche/audit/components/shell-dock-dockstatuslamp/probe/p1-lamp.mjs`
against the live server; read `ax` for `w1023` / `w390`.

**Cure (gestalt, not patch).** The name must not be a side effect of a viewport query. Bind it once
on the region and let the visible text be decoration:

```
<span v-if="lamp" ... :role="lamp.role" :aria-label="lamp.label">
    <span class="lamp-dot" aria-hidden="true" />
    <span class="lamp-label" aria-hidden="true">{{ lamp.label }}</span>
</span>
```

and delete the `display:none` / `@media (min-width:1024px)` pair entirely — the label's visibility
becomes a pure paint concern (`max-width:0;overflow:hidden` or a container query), never an a11y one.

---

### C-2 · MAJOR — `font-variant: small-caps` renders the remedy as `` `NPM RUN DEV` `` — an untypeable command — and the string carries literal markdown backticks

`status-lamp.ts:54` emits the label `` dev misconfigured — run `npm run dev` ``.
`DockStatusLamp.vue:52` applies `font-variant: small-caps` to the whole chip.

`small-caps` renders lowercase letters as small **capitals**. The rendered instruction is therefore
`DEV MISCONFIGURED — RUN \`NPM RUN DEV\``. Shell commands are case-sensitive; `NPM RUN DEV` is not a
runnable command. **Read `./probe/lamp-1440.png`** (top-right, measured box `x 1168.4, w 255.6,
color rgb(219,36,36)`): the chip visibly reads `● DEV MISCONFIGURED — RUN \`NPM RUN DEV\``.

Compounding: the backticks are markdown fencing leaked into UI copy. They paint as literal grave
accents and are spoken by AT ("grave accent npm run dev grave accent"). And below 1024px this
already-corrupted string is the **only** on-screen carrier of the remedy (C-1), so the developer on
a phone sees a red dot and nothing else.

**Failure scenario.** A developer boots `dev:web-only` on a laptop, reads the lamp, types
`NPM RUN DEV`, gets `zsh: command not found: NPM`. The lamp's entire purpose — being the actionable
face of the dead banner — fails at the last inch.

**Cure.** A code literal must not live inside a `small-caps` run. Either drop `small-caps` for the
misconfigured face, or split the label into a small-caps prose part and a `<code>`-cased literal
(`font-variant: normal`), and strip the backticks. `availability.ts:119-130`
(`devMisconfigMessage`) already composes a correct, fact-naming string for the console — the lamp
should consume it rather than hand-copy a lossy third variant of it.

---

### C-3 · MAJOR — the live region is created by `v-if`, so it is inserted **together with** its content; the polite `status` face will commonly never be announced

`DockStatusLamp.vue:13` is `v-if="lamp"`. The region and its text therefore enter the accessibility
tree in the same mutation. For `aria-live="polite"` regions (`role="status"`, the `unavailable`
face at `status-lamp.ts:57-60`) this is the canonical announcement-miss pattern: NVDA/JAWS/VoiceOver
register live regions when they appear in the a11y tree and announce **subsequent** mutations;
insert-with-content is unreliable across all three.

**The repo's own e2e proves the region never pre-exists** —
`e2e/smoke/oracles/o22-status-lamp.spec.ts:40`:

```ts
await expect(page.locator(".dock-status-lamp")).toHaveCount(0);   // healthy backend
```

then `:56-60` asserts it appears already carrying `role="status"` and its variant after the latch
trips. Count 0 → count 1 with content: exactly the failure shape.

**Failure scenario.** Backend goes down mid-session. The latch flips `available → unavailable`
(`availability.ts:167-172`). A screen-reader user is told nothing; their next save silently degrades
to local-only. This is precisely the affordance the component was built to carry.

**Cure.** Mount the region permanently and toggle only its text. The variant space makes this clean:
`misconfigured` can only be latched at module-eval (`client.ts:34` → `availability.ts:151-164`, once,
before mount) and `markApiUnreachable` refuses to overwrite it (`:169`), so the two faces are
temporally disjoint. A permanently-mounted `role="status"` region whose text is `lamp?.label ?? ""`
covers the only transition that can happen at runtime; the boot-time misconfig face needs no live
region at all — its loud channel is already the `console.error` at `availability.ts:163`.

---

### C-4 · MAJOR — this component is a verbatim **fork** of `ApiOfflineChip.vue`, not a second seat of one primitive

`DockStatusLamp.vue:40-42` admits it: *"the ApiOfflineChip's exact register … one status language,
two seats."* It is not one language in two seats; it is two independent implementations.

**Measured duplication** (`python3` structural diff of the two `<style>` blocks, run this audit):

```
lamp decls 33   chip decls 24   identical 18
   align-items: center;
   background: color-mix(in oklab, var(--background) 55%, transparent);
   background: currentColor;
   background: transparent;
   border: 1px solid var(--card-edge);
   color: color-mix(in oklab, var(--foreground) 72%, transparent);
   color: var(--destructive, oklch(0.58 0.19 25));
   display: inline-flex;
   font-size: var(--type-mono-caption, 0.6875rem);
   font-variant: small-caps;
   gap: 0.4rem;   height: 0.4rem;   width: 0.4rem;
   letter-spacing: 0.06em;   line-height: 1;
   opacity: 0.35;   opacity: 1;
   white-space: nowrap;
```

**18 of the chip's 24 declarations (75%) are byte-identical in the lamp.** Both also ship the same
keyframe body (`0%,100%{opacity:1} 50%{opacity:.35}`) under two names
(`lamp-dot-pulse` / `offline-dot-pulse`), both `2.4s var(--ease-standard) infinite`, both wrapped in
`@media (prefers-reduced-motion: no-preference)`.

**Both label strings are duplicated too:**

```
$ grep -rn "dev misconfigured — run\|backend offline — saved locally" demo/
demo/shell/dock/status-lamp.ts:54:                label: "dev misconfigured — run `npm run dev`",
demo/shell/dock/status-lamp.ts:60:                label: "backend offline — saved locally",
demo/palettes/browser/status/ApiOfflineChip.vue:17:        dev misconfigured — run `npm run dev`
demo/palettes/browser/status/ApiOfflineChip.vue:25:        backend offline — saved locally
```

And the latch is derived twice: `status-lamp.ts:44-65` (a documented "pure resolver") vs
`ApiOfflineChip.vue:35-36` (`availability.value === "unavailable"` / `=== "misconfigured"` inline).
`status-lamp.ts:11-12` claims *"this module CONSUMES `availability.ts`, it never re-derives it"* —
true of the lamp, false of the seat it claims to speak with.

**Live consequence, already measured by a sibling seat** and consistent with my live-region census:
on populated palette surfaces both mount at once —
`registry/harvest/area-palettes.json:2125`: `globalAlertRoles = ["dev misconfigured — run \`npm run dev\`", "dev misconfigured — run \`npm run dev\`"]`.
Two **assertive** alerts, identical text, same instant.

**Edicts violated:** #2 (no dual paths), #3 (KISS/no contrivance), #4 (glass-ui is the design system —
this is a status-chip *primitive* hand-rolled twice in `demo/`), #5 (root-level styling).

**Cure.** One primitive. The chip is exactly the glass-ui `Badge`/status-chip shape; publish it
there (variant `status` × `alert`) and let both seats be `<StatusChip :variant :label>`. The whole
`<style>` block of `DockStatusLamp.vue` (`:35-123`, 88 lines) collapses to the three positioning
declarations that are genuinely band-chrome (`position/inset-inline-end/top/translate`).

---

### C-5 · MINOR — `--type-mono-caption` is a **phantom token**: 3 consumers, 0 definitions, 2 different fallbacks

```
$ grep -rn -- "--type-mono-caption" demo/ src/ node_modules/@mkbabb/glass-ui/dist/
demo/picker/controls/ComponentSliders/ComponentSliders.vue:310:    font-size: var(--type-mono-caption, var(--type-caption));
demo/shell/dock/DockStatusLamp.vue:54:    font-size: var(--type-mono-caption, 0.6875rem);
demo/palettes/browser/status/ApiOfflineChip.vue:47:    font-size: var(--type-mono-caption, 0.6875rem);
```

Zero `--type-mono-caption:` declarations exist in `demo/`, `src/`, or the glass-ui dist. Measured
computed value on the live lamp: `fontSize: "11px"` (`./probe/p4-css.mjs`) — i.e. the hardcoded
`0.6875rem` fallback, always. The token is decorative; the real value is a magic literal, and the
three consumers do **not** agree (`ComponentSliders` falls back to `var(--type-caption)`, a different
size). Edict #5: this is a per-instance hardcode wearing a token's clothes.

**Cure.** Either define `--type-mono-caption` once in `demo/styles/foundation.css` `:root` (or take
it from glass-ui typography), or delete the `var()` wrapper at all three sites. Not both.

---

### C-6 · MINOR — `resolveLampState`'s `default:` branch disables exhaustiveness checking

`status-lamp.ts:49-64` switches over the `ApiAvailability` union and ends with
`default: return null;`. TypeScript cannot then flag a missing case. `ApiAvailability`
(`availability.ts:40-44`) is a 4-member union today.

**Failure scenario.** A fifth state is added — say `"degraded"` for the rate-limit path that already
exists in `client.ts` (`MAX_RATE_LIMIT_RETRIES`, `readRateLimitResetSeconds`). `resolveLampState`
compiles clean, returns `null`, and the lamp goes dark for a state that was added *precisely* to be
surfaced. `npm run typecheck` (`vue-tsc … --noEmit`) reports nothing. The repo's standing law is
"enforce invariants structurally (types + tsc/eslint)" — this switch opts out of it.

**Cure.** Name the healthy states and close with a `never` guard:

```ts
case "unknown":
case "available":
    return null;
default: {
    const _exhaustive: never = availability;
    return _exhaustive;
}
```

---

### C-7 · MINOR — the `unavailable` face has **no selector**; `data-variant` is load-bearing for only one of its two values

`DockStatusLamp.vue:76-86` comments *"The `unavailable` face"* and then styles bare
`.dock-status-lamp` / `.lamp-dot`. Only `[data-variant="misconfigured"]` is selector-addressed
(`:91-107`). So the "variant matrix" is half declared and half implicit-default.

**Failure scenario.** Any third variant (`degraded`, `readonly`, `stale`) silently inherits the full
`unavailable` skin — muted ink, open ring, "no signal" glyph — with no rule to override and no
diagnostic. The `misconfigured ≠ unavailable` invariant the whole module is built around
(`status-lamp.ts:16-18`) is then *not* enforced by construction; it is enforced by there happening
to be exactly two variants.

**Cure.** Give both faces explicit `[data-variant="…"]` blocks and leave the base rule to carry only
the shared chip geometry. This also makes C-4's extraction mechanical.

---

### C-8 · MINOR — dev-gate asymmetry: the lamp gates the misconfig face on `import.meta.env.DEV`; its twin does not gate it at all

`DockStatusLamp.vue:31` + `status-lamp.ts:48` hard-gate the lamp on `isDev`, with a long rationale
at `status-lamp.ts:20-25`: the misconfig precondition is *"provably unreachable in production"*.
`ApiOfflineChip.vue:12-18` renders the **same** developer instruction with **no gate whatsoever**.

Exactly one of these is right:

- if the loopback precondition (`availability.ts:112-116`, requires `isLoopbackHost`) really makes
  `misconfigured` unreachable in prod, then threading `isDev` through `resolveLampState` **for the
  misconfigured branch** is contrivance (edict #3); or
- if it does not, `ApiOfflineChip` is a production bug that shows end users `run \`npm run dev\``.

Both cannot hold. (The `isDev` gate is *not* redundant for the `unavailable` face — that one is
deliberately prod-suppressed in favour of the chip — so the fix is per-variant, not wholesale.)

Related: the `isDev` gate is a **runtime** branch, not a compile-time elision. The SFC is statically
imported by `Dock.vue:14`, so in a `gh-pages` build Vue still instantiates the component and
evaluates the computed on every load, and the 88-line scoped `<style>` block is still extracted into
the CSS bundle (CSS extraction is static — it cannot see the `v-if`). *The byte cost is unmeasured
(building `gh-pages` would write outside my permitted paths); the mechanism is certain from
inspection.* Labelled a hypothesis on magnitude only.

---

### C-9 · MINOR (vacuous gate) — **no test in this repository would fail if the SFC were broken**

```
$ grep -c "DockStatusLamp\|mount(\|test-utils" test/status-lamp.test.ts
0
$ grep -rln "@vue/test-utils" test/ | wc -l
0                          # …though @vue/test-utils IS a devDependency
$ grep -n "expect(" e2e/smoke/oracles/o22-status-lamp.spec.ts | wc -l
10
$ grep -n "toHaveText\|textContent\|lamp-label\|innerText\|accessibleName" e2e/smoke/oracles/o22-status-lamp.spec.ts | wc -l
0
```

`test/status-lamp.test.ts` imports only `status-lamp.ts` and `availability.ts` (`:27-41`) — it tests
the **pure resolver**, never the component. `o22-status-lamp.spec.ts` makes 10 assertions, all on
count / visibility / `data-variant` / `role` / geometry, **none on text or accessible name**. And
`o22:21-27` records that the `misconfigured` face *cannot fire at all* under the e2e harness
(`webServer.env.VITE_API_URL` is set — `playwright.config.ts:121`), so the alert branch is never
exercised live.

**Named mutations that keep every gate green** (13 unit + 2 e2e):

| # | mutation to `DockStatusLamp.vue` | why it stays green |
|---|---|---|
| M1 | delete `<span class="lamp-label">{{ lamp.label }}</span>` (`:19`) | unit tests never touch the SFC; e2e asserts no text |
| M2 | replace `:role="lamp.role"` with literal `role="status"` (`:16`) | e2e only exercises the `unavailable` face, whose role *is* `status`; the `alert` branch is harness-excluded |
| M3 | replace `:data-variant="lamp.variant"` with literal `data-variant="unavailable"` (`:15`) | `o22:58` only ever asserts `"unavailable"` |
| M4 | change `v-if="lamp"` to `v-if="lamp && lamp.variant !== 'misconfigured'"` | `o22` test 1 expects count 0 when healthy; test 2 expects the unavailable face |
| M5 | delete the whole `<style>` block | no test reads a computed style of the lamp |

M1 alone deletes the component's only accessible content at every width and every gate passes.
That is the definition of a vacuous gate.

**Cure.** One `@vue/test-utils` mount test (the dependency is already installed and has zero
importers — the harness exists, unused) asserting, for both variants: the rendered `role`, the
computed **accessible name**, and that the name survives at `<1024px`. Plus one `o22` assertion
`await expect(lamp).toHaveAccessibleName(/backend offline/)`. Four lines close M1–M4.

---

### C-10 · INFO — perpetual `infinite` animation for a condition that is immutable for the process lifetime

`DockStatusLamp.vue:119-121`: `animation: lamp-dot-pulse 2.4s var(--ease-standard) infinite`.
Measured `playState: "running"` at all four viewports (`./probe/p1-lamp.json`), unbounded. The
`misconfigured` condition it pulses about is latched once at module-eval and can never change
(`availability.ts:151-164` runs once; `:169` refuses to overwrite it). A pulse signifies liveness;
this one signifies a constant. Compositor work continues for the life of the tab.

It is **correctly** reduced-motion-gated — see negative proof N-1. INFO, not a defect of correctness.

### C-11 · INFO — `pointer-events: none` makes the remedy unselectable, and there is no `title`

`DockStatusLamp.vue:51`. The chip carries an instruction the developer is meant to *run*; it cannot
be selected or copied, and has no `title` fallback. Below 1024px (C-1) it also has no visible text —
so the instruction is, at phone widths, unreachable by every channel: not visible, not readable by
AT, not copyable.

### C-12 · INFO — a `role="alert"` instrument mounted inside `<nav aria-label="Application navigation">`

`Dock.vue:293` mounts the lamp as a sibling root inside the nav landmark
(`o22:63-69` asserts exactly this seat). Landmark navigation therefore surfaces a nameless alert
(C-1) *inside* "Application navigation". The status instrument is not navigation. Structural, not
functional.

---

## Negative proofs — hypotheses tested and killed

These were live hypotheses under the "assume it is broken" premise. Each was probed and **cleared**;
recording them so the next seat does not re-spend the browser budget.

**N-1 · reduced motion is correctly gated.** `./probe/p4-css.mjs` with `reducedMotion: "reduce"`:
`anims: []`, `dotOpacityNow: "1"`. Both the `@keyframes` *and* the `animation` declaration sit inside
`@media (prefers-reduced-motion: no-preference)` (`:109-122`). CLEAN.

**N-2 · RTL is correct.** With `dir="rtl"`, measured lamp `box: [16, 255.6]` — flipped to the band's
inline start. `inset-inline-end` is the right property; no physical-property leak. CLEAN.

**N-3 · no collision with the dock pill, at any width or route.** `./probe/p3-collide.mjs`,
4 routes × {1024, 1100, 1280}:

```
1024 /          lampX 752.4 w 255.6 dockRight 740.9 gap 11.5 overlap False covered 0
1024 /#/browse  lampX 752.4 w 255.6 dockRight 684.8 gap 67.6 overlap False covered 0
1100 /          lampX 828.4 w 255.6 dockRight 780.1 gap 48.3 overlap False covered 0
1280 /          lampX 1008.4 w 255.6 dockRight 873.1 gap 135.3 overlap False covered 0
   (12 rows, min gap 11.5px, zero overlaps, zero covered interactive elements)
```

The 1024 breakpoint — where the 255.6px label switches on at the narrowest permitted width — clears
by 11.5px. Tight, but real. CLEAN.

**N-4 · no clipping under `.app-layout { overflow: hidden }`.** `clippedRight: 0` at 1440/1024/1023/390
(`shell.css:20-28` is the clipping ancestor; `.dock-band{position:relative}` at `:39-45` is the
positioning context, exactly as `Dock.vue:288-291` claims). CLEAN.

**N-5 · the apparent 390px occlusion of `button[aria-label="Cancel"]` is not real.** `p1` flagged the
lamp box `[348,43,26,18]` overlapping a button at `[348.9,38,22,22]`. `p3` resolved it: that button
lives inside `.dock-face` with `opacity: 0; pointer-events: none` — an inactive crossfade face.
`document.elementFromPoint` at the lamp centre returns `nav.dock-band`, not the button. **HYPOTHESIS
KILLED — not a finding.**

**N-6 · every token the component consumes resolves.** Measured computed values:
`borderRadius: "9999px"` (`--radius-pill` is real — `glass-ui/dist/styles/theme/radius.css`),
`borderColor: oklab(0.574 0.192 0.0997 / 0.55)` and `bg: … / 0.12` (`--destructive` + `--card-edge`
both real — `foundation.css:270`), `--ease-standard` real
(`glass-ui/dist/styles/tokens/scheme-spring.css`). No invalid-at-computed-value cascade anywhere.
CLEAN — except `--type-mono-caption`, which is C-5.

**N-7 · the visual REPORT contributes nothing to this component, and that is verified rather than
assumed.** All 60 captures ran against a **healthy** backend: `REPORT.md` records
`consoleErrors — 1` and it is `safari-desktop-light /#/: WebGL: context lost.` A misconfigured boot
emits `console.error("[value.js] value.js dev is MISCONFIGURED: …")` (`availability.ts:163`) — absent
from every row. I confirmed by reading the images: no lamp at the band's inline end in
`safari-desktop-light/picker.png` (1440×900 CSS), `rtl-desktop/picker.png`, or
`forced-colors-desktop/picker.png`. The lamp is *correctly* dark in all 60. **No `namelessButtons`
or `smallTapTargets` row belongs to this component** (it renders no button and is
`pointer-events:none`).

**N-8 · the "unclearable alert" hypothesis is NOT sustained.** I found the live server
(`pid 93401: vite --port 9000 --strictPort`, the exact spawn shape of `scripts/dev/dev.sh:289`)
serving a bundle with

```
$ curl -s "http://localhost:9000/@fs/…/demo/platform/transport/client.ts" | head -c 2500
import.meta.env = {"BASE_URL": "/", "DEV": true, "MODE": "development", "PROD": false, "SSR": false};
```

— **no `VITE_API_URL`** — while `dev.sh:287` exports it, which raised the hypothesis that the lamp's
own remedy cannot clear it. Checked: `ps eww -p 93401` shows no `VITE_*` in the process environment,
and `:3000` is not bound (`curl` → `000`), i.e. the full stack is not up. N-7 then settles it
positively: when the stack *is* up, the lamp is dark across 60 captures. The remedy is actionable.
**NOT a finding.** (What survives from this line of inquiry is C-2 and C-4: the remedy is rendered
untypeable and duplicated three ways.)

**N-9 · the known local hazard list is structurally inapplicable, and that is a positive result.**

```
$ grep -c "addEventListener\|requestAnimationFrame\|setInterval\|setTimeout\|onMounted\|onUnmounted\|onBeforeUnmount\|watch(\|watchEffect\|ResizeObserver\|IntersectionObserver\|MutationObserver\|fetch(\|await \|async " demo/shell/dock/DockStatusLamp.vue
0
```

The entire `<script setup>` is `DockStatusLamp.vue:24-32` — one import trio, one `useApiClient()`
destructure, one `const isDev`, one `computed`. No `defineModel` (→ no stale-read hazard), no
`ValueUnit` wrapping (→ no nesting accumulation), no oklch/HSV roundtrip (→ no `stableHue` hazard),
no rAF (→ not a PRM-RAF site), no reka-ui slider (→ no pointer-capture leak), no WebGL, no parsing
(→ no `parseCssColor` crash class), no listeners/observers/timers to leak, nothing unbounded.
`import type` discipline is correct (`status-lamp.ts:31`); no type-only import is un-`type`d
(edict #8 satisfied). **The defects here are entirely in the rendered contract, not in the runtime
mechanics** — which is why C-1..C-3 matter: they are the only failure surface this component has,
and all three are live.

---

## Synthesis — the one sentence

`DockStatusLamp` is mechanically inert and rhetorically confident: its script cannot leak, race, or
crash, and its comments assert three guarantees — first-paint visibility, "the role + label stay in
the accessibility tree", "the a11y role IS the register" — of which **the accessibility guarantee is
violated at every viewport (`name: ""`), fully void below 1024px (`childIds: 0`), announced by a
mechanism that will not announce (`v-if` on a live region), and carrying a remedy string its own
`font-variant` uppercases into an unrunnable command** — while the whole chip is a 75%-byte-identical
fork of `ApiOfflineChip` guarded by tests that would not notice if the text were deleted.

**Priority order for a repair wave:** C-4 first (extract the one primitive — it dissolves C-5, C-7,
and half of C-2 structurally), then C-1 + C-3 on the extracted primitive (name + permanent region,
fixing both seats at once), then C-2 (de-`small-caps` the literal), then C-9 (the four-line gate
that would have caught all of it).

---

## Appendix — probe artefacts

All under `docs/tranches/V/megatranche/audit/components/shell-dock-dockstatuslamp/probe/`:

| file | what it establishes |
|---|---|
| `p1-lamp.mjs` / `p1-lamp.json` | CDP AX tree + geometry + live-region census at 1440/1024/1023/390 → C-1, C-10 |
| `p2-origin.mjs` | env/origin interrogation (superseded by the `curl @fs` read) → N-8 |
| `p3-collide.mjs` / `p3.json` | 4 routes × 3 widths collision matrix; the 390 `Cancel` resolution → N-3, N-5 |
| `p4-css.mjs` | computed font-size/radius/colors, reduced-motion, RTL, `.sr-only` availability → C-5, N-1, N-2, N-6 |
| `lamp-1440.png` | the rendered chip: `● DEV MISCONFIGURED — RUN \`NPM RUN DEV\`` → C-2 |
| `lamp-390.png` | the dot-only compaction below 1024px → C-1 |

Re-run any probe with `node <path>` against a live `http://localhost:9000`.
