claude-opus-5[1m]

# CHALLENGE · DemoGlobalChrome · axis D (DESIGN)

**Target** `keyframes.js/demo/components/instrument/transport/components/DemoGlobalChrome.vue` (49 lines)
**Axis** spacing/proportion · glass-ui conformance · typography · motion/PRM honesty · a11y · prose · state coverage
**Method** static, source- and build-artifact-derived. No browser. Every claim carries a falsifier; two claims were
killed by their own falsifier and are recorded below rather than shipped.
**Posture** the component was assumed DEFECTIVE until the tree proved otherwise. It is 22 lines of markup that
configure a third-party notification system for the entire demo, and it is the weakest surface in the transport
subtree by a wide margin.

**Read whole (read-only):** the target; `AnimationControlsGroup.vue` (its sole mount, line 118);
`controls-pane/RibbonBar.vue` (the sole `url(#rainbow-gradient)` consumer, :59);
`shell/EditorShell.vue` (:76 `:key="superKey"`); `app/index.html` (:80-89 the pre-paint theme script);
`styles/style.css`, `styles/design-idioms.css`, `styles/layout.css`; `demo/DESIGN.md` §§1-8;
`utils/toastGuard.ts`; all 24 `toast.*` call sites; `node_modules/vue-sonner@2.0.9` (`lib/index.js`, `lib/index.css`,
`package.json`); `@mkbabb/glass-ui@7.0.0` (`dist/toast.d.ts`, `dist/components/toast/*`, `dist/toast-B2PkL5Jm.js`,
`dist/styles/**`); the shipped build `dist/gh-pages/assets/*.css`.

**Hitherto corpus folded:** `formation/keyframes/lane-frontend.md` F-1 (glass-ui phantom dependency),
S-1..S-8 (bespoke shadow census); `keyframes.js/docs/tranches/U/audit/lane-17-demo-instrument-transport.md` §8
(DemoGlobalChrome mis-homed); `T/audit/lanes/14-at-structure.md` F3; `T/audit/lanes/13-demo-structure.md` F8.
Cited and extended below; contradicted once (§Contradictions).

---

## Verdict

| | count |
| --- | --- |
| BLOCKER | 1 |
| MAJOR | 8 |
| MINOR | 6 |
| **defects total** | **15** |
| superlatives | 3 |
| claims killed by their own falsifier | 2 |

The headline: **this component configures a notification system whose stylesheet the demo never imports.** Every
other finding on this page is downstream of, or survives, that fact. Six of the fifteen findings survive the
stylesheet fix and must be repaired independently.

---

## D-1 · BLOCKER · the vue-sonner stylesheet is never imported — the entire toast surface ships unpositioned

**Claim.** `vue-sonner@2.0.9` does not auto-inject its CSS: `lib/index.js` contains **zero** stylesheet imports, and
the CSS is a separate export (`package.json` `"./style.css": "./lib/index.css"`, 18 248 bytes). Nothing in
keyframes.js imports it. Consequently the `<Toaster>` at `DemoGlobalChrome.vue:28` renders with **no**
`position: fixed`, no `z-index`, no viewport offset, no per-toast `position: absolute`, no stacking transform, and no
enter/exit animation.

**Provenance.**
- `DemoGlobalChrome.vue:27-42` — the `<Teleport to="html"><Toaster …/></Teleport>`, the demo's only Toaster mount.
- `DemoGlobalChrome.vue:48` — `import { Toaster } from "vue-sonner";` — the component import, no style import.
- repo-wide `grep -rn "vue-sonner/style\|sonner.css"` excluding `node_modules`/`.git`/`dist` → **0 hits**.
- `node_modules/vue-sonner/lib/index.js` — `grep -c "\.css"` → **0**; no `createElement("style")`, no
  `adoptedStyleSheets`, no `insertRule`.
- `node_modules/vue-sonner/lib/index.css:1847` — `[data-sonner-toast] { position: absolute; opacity: 0;
  transform: var(--y); transition: … }`; `:~1900` `[data-sonner-toaster] { position: fixed; … z-index: 999999999 }`.
  These are ungated by `data-styled`, i.e. they are the *structural* rules `unstyled: true` does **not** opt out of —
  and they are absent.
- shipped build: all nine `dist/gh-pages/assets/*.css` files contain **0** occurrences of `data-sonner`;
  `z-index:999999999` → 0; `[data-sonner-toaster]{` → 0. The Toaster's Tailwind classes *are* present
  (`.w-64`, `.lg\:w-80`, `.max-w-\[90vw\]`, `.bg-foreground`), so the scanner saw the component — only the vendor
  sheet is missing.
- `demo/styles/style.css:1-16` — the four `@import`s are `tailwindcss`, `tw-animate-css`, `@mkbabb/glass-ui/styles`,
  `@mkbabb/glass-ui/styles/fonts`, `./design-idioms.css`, `./layout.css`. No sonner.

**Consequence (mechanism CONFIRMED from source; the exact pixel outcome UNPROVEN-NEEDS-LIVE for SS-13).**
The toaster `<section>`/`<ol>` become ordinary in-flow blocks appended to `<html>` **after** `<body>` (the Teleport
target, `:27`). `demo/styles/style.css:214-224` sets `html, body { overflow: hidden; min-height: 100dvh }` and
`:225-230` `height: 100dvh` at `≥1024px`. Root `overflow` propagates to the viewport, so the viewport clips and does
not scroll; the toaster's first flowed box therefore begins at `y ≥ 100dvh`. **Every toast in the demo — 24 call
sites, including the CSS-parse diagnostics that the codebase's own comments call "the product value" — is expected to
render entirely below the fold with no way to scroll to it.**

**Corroboration that nobody has looked at a toast lately.** `grep -rn "toast\|sonner" test/ e2e/` returns only
`compileToEntry({ ".toast": … })` fixtures — a CSS selector literal in the library's compile tests. **Zero tests
assert a rendered toast.** No proof script names the toaster.

**Falsifier.** Any one of these kills it: (a) an import of `vue-sonner/style.css` anywhere in the source graph;
(b) `data-sonner` selectors present in a shipped CSS chunk; (c) a demo-local re-implementation of
`[data-sonner-toaster] { position: fixed }` (grepped `demo/styles/**` — none); (d) a live render showing a toast
inside the viewport, which would mean some cascade path I did not find supplies the positioning. **(d) is the one
worth running first at SS-13** — it is the cheapest possible check and it decides the whole page.

**Note.** `dist/gh-pages/` could be stale. It is not load-bearing: the source-tree grep is the authoritative
evidence and the build merely agrees with it.

---

## D-2 · MAJOR · four toast types, one appearance — the error/success distinction is carried by glyph shape alone

**Claim.** `unstyled: true` (`:30`) opts out of sonner's per-type styling, `richColors` is not set, and the demo
supplies **one** `toast` class string (`:32`) with no per-type key (`classes` accepts `success`/`error`/`warning`/
`info` keys; none are given). Every toast therefore paints `bg-foreground text-background` — identical pixels for a
destructive parse failure and a success confirmation.

**Provenance.** `DemoGlobalChrome.vue:29-39`. Call sites: `useShareState.ts:37` (info), `:65,:71` (error),
`:83` (success); `KeyframesStringControls.vue:101` (success), `:105,:155,:162` (error), `:146` (warning);
`useKeyframeOps.ts:33,195` (error); `useTimelineBuild.ts:121,137,148,157` (error), `:133,:155` (success);
`useTimelineOps.ts:24` (error), `:34` (success); `CSSCodeEditor.vue:186` (success); `clipboard.ts:6` (success).
**All 24 sites are typed; not one is a default toast.**

The type icons *do* render (vue-sonner `lib/index.js` Toast render — the `[data-icon]` branch is gated on
`toastType !== "default"`, not on `unstyled`), and they are `fill="currentColor"` 20×20 SVGs. Under
`text-background` the success check, the error triangle, the warning and the info glyphs are all painted the *same*
colour. Type is conveyed by a 20px glyph silhouette and nothing else.

**Design-law provenance.** `demo/DESIGN.md:43-44` — *"Red is destructive only. `--accent-red` marks delete, clear,
error, and destructive feedback. It must not return to progress or ordinary chrome."* The demo's own design
authority names error feedback as a **colour** role. The toast surface — the demo's only error-feedback surface —
declines the role entirely. glass-ui's own toast implements it: `dist/toast-B2PkL5Jm.js` binds
`feedback-tone-destructive / -success / -warning / -info` off a `tone` prop.

**Falsifier.** Show a per-type `classes` key, a `richColors` prop, an `icon` class carrying a tone token, or a
DESIGN.md clause exempting notification surfaces from §2. None exist in the tree.

---

## D-3 · MAJOR · `grid grid-cols-1` puts the type icon on its own full-width row and never spaces title from description

**Claim.** The toast root class (`:32`) is `… grid grid-cols-1 gap-1 …`. vue-sonner's DOM under that root is
`[data-icon]`, then `[data-content]` (which *contains* `[data-title]` and `[data-description]`), then optional
`[data-cancel]`/`[data-button]`. So the grid items are **icon** and **content**, not title and description.

Two consequences, both decidable:
1. The 20×20 type icon becomes a full-width grid row **above** the text, left-aligned in a 256/320px pill — an
   orphaned glyph on its own line. sonner's intended `display: flex; align-items: center; gap: 6px` lives on
   `[data-sonner-toast][data-styled='true']` (`index.css:2201`), which `unstyled: true` switches off *by design*.
   The demo replaced a row layout with a column layout and did not notice the icon was in it.
2. `gap-1` (0.25rem) separates **icon from content**, never title from description. Title and description are two
   adjacent block `<div>`s inside `[data-content]` with no margin and no `[data-title]`/`[data-description]` CSS
   (that lives in the sheet D-1 shows is absent). The intended 4px title/description rhythm is applied to the wrong
   pair.

**Provenance.** `DemoGlobalChrome.vue:32-34`; `node_modules/vue-sonner/lib/index.js` Toast render (the
`[data-icon]` div and the `[data-content]` wrapper containing `[data-title]`/`[data-description]`);
`node_modules/vue-sonner/lib/index.css:2201`. Descriptions are live at 6+ sites
(`useShareState.ts:85`, `KeyframesStringControls.vue:106,148,157,164`, `useKeyframeOps.ts:35`), so the mis-applied
gap is not a latent case.

**Survives D-1's fix.** Importing the stylesheet does not change this: `[data-title]`/`[data-description]` spacing
rules are inside `[data-styled='true']` blocks that `unstyled: true` disables.

**Falsifier.** Show that `[data-icon]` is rendered inside `[data-content]` (it is not — it is a sibling), or that
`unstyled` suppresses the icon (it does not), or a `classes.content` entry restoring the row/leading (there is none —
`content` is not among the six keys supplied).

---

## D-4 · MAJOR · the Retry affordance is an unstyled UA button inside a near-black pill

**Claim.** `actionButton: ''` (`:35`) and `cancelButton: ''` (`:36`) supply empty class strings. sonner's own
action-button styling is gated: `index.css:153` `[data-sonner-toast][data-styled='true'] [data-button] { … }`, and
`data-styled` is `!Boolean(toast.component || toast.unstyled || unstyled)` → **false** here. So the button carries
`class=""` and receives no vendor styling **even after D-1 is fixed**.

`useKeyframeOps.ts:36` — `action: { label: "Retry", onClick: retry }` — is live. It is the demo's **only**
error-recovery affordance, attached to the async keyframe-mutation path. It renders as a UA-default `<button>`
(light `ButtonFace` chrome, system font, ~13px) sitting as a **full-width grid row** (D-3) inside a
`bg-foreground` pill that is `hsl(24 10% 10%)` in light theme.

**Provenance.** `DemoGlobalChrome.vue:35-36`; `useKeyframeOps.ts:24-40`; `vue-sonner/lib/index.css:153-171`;
`vue-sonner/lib/index.js` (`"data-styled": !Boolean(...unstyled)`).

**Falsifier.** Show a global `button { … }` reset in the demo cascade that would clothe it — `style.css`'s
`@layer base` resets only `* { @apply border-border }` and `html, body`; Tailwind's Preflight normalises button
appearance but supplies no fill, radius, or padding. Or show that no call site uses `action` — `useKeyframeOps.ts:36`
is the counter-example.

---

## D-5 · MAJOR · glass-ui 7.0.0 already ships `./toast`; this is a bespoke rental of the design system's own primitive

**Claim.** The demo's declared design system exports a complete toast family that this component reimplements badly:

```
@mkbabb/glass-ui/toast → Toast, ToastAction, ToastClose, ToastDescription, ToastTitle, Toaster,
                          toast(), useToast(), ToasterPosition
```

`dist/components/toast/index.d.ts`; `use-toast.d.ts` declares `tone: Tone`, `surface: Surface` (glass·veil·opaque),
`duration`, `action`. `dist/toast-B2PkL5Jm.js` is reka-ui-based with `data-tone`/`data-surface`/`data-reveal`,
`glass-reveal`, `rounded-panel`, the φ-derived overlay padding pair
(`--overlay-pad-inline: --spacing(6)`, `--overlay-pad-block: calc(var(--overlay-pad-inline) * 1.272)`), swipe
handling, and a **ToastClose** primitive. Its utilities are already in the demo's cascade — `glass-reveal` appears
64× and `feedback-tone-destructive`, `rounded-panel`, `reka-toast` all appear in the shipped
`dist/gh-pages/assets/index-CL_QYCiO.css`.

The standing law is explicit (`feedback_glass_ui_first_class`: *"Glass-ui is the design system; add variants/
primitives there, not in demo/ui/"*), and DESIGN.md §5 forbids *"permission to fork a second local vocabulary."*
Renting vue-sonner and hand-authoring eight raw Tailwind strings is exactly that fork — and it is the fork that
caused D-1, D-2, D-3 and D-4, none of which are possible with a primitive whose styles ship with the system.

**Cross-cite.** This is a **new row for the lane-frontend shadow census (S-1..S-8)**: `S-9 · vue-sonner Toaster
+ DemoGlobalChrome toast config → `@mkbabb/glass-ui/toast` — RED, rationale void against 7.0.0`. It is materially
worse than S-1 (KfPillTabs), whose fork at least renders. Sequencing rider: lane-frontend **F-1** (glass-ui is a
phantom dependency — absent from `package.json` and the lockfile) must land first; no glass-ui-consuming repair is
reproducible until it does.

**Falsifier.** Show that glass-ui's Toaster lacks a capability the demo needs — the audit surface is
promise/loading toasts and `toast.dismiss(id)` (`KeyframesEditor.vue:205`). glass-ui's `toast()` returns
`{ id, dismiss, update }`, so dismiss-by-handle is covered; a *promise* toast is not obviously covered and would be
the honest objection. It is not an objection to the eight hand-authored class strings.

---

## D-6 · MAJOR · the toast surface escapes the demo's documented depth contract entirely

**Claim.** `DESIGN.md:95-108` and `style.css:19-45` declare a strictly-ascending semantic z-scale
(`--z-behind` −10 … `--z-modal` 140) and state: *"Use semantic `z-*` utilities. Raw `z-[n]` values are not a design
escape hatch."* The toast surface:
- carries **no** `z-*` utility (`DemoGlobalChrome.vue:28-41`);
- is teleported **outside `<body>`** (`:27`), so it is not even in the stacking subtree the contract governs;
- once D-1 is fixed inherits sonner's `z-index: 999999999` (`vue-sonner/lib/index.css`), which is 7 143 571× the
  top declared rung and unreachable by any demo rung.

The contract's premise — *"a higher rung always paints over a lower one"* — becomes unfalsifiable for the one
surface that must, by definition, sit above modals *and* below nothing.

**Provenance.** `DemoGlobalChrome.vue:27-28`; `demo/styles/style.css:19-45`; `demo/DESIGN.md:95-108`;
`vue-sonner/lib/index.css` `[data-sonner-toaster] { z-index: 999999999 }`.

**Related, same root.** The Toaster sets no `offset`. sonner's defaults are `VIEWPORT_OFFSET = "24px"` /
`MOBILE_VIEWPORT_OFFSET = "16px"` (`lib/index.js:296-297`), i.e. flat literals. The demo derives every other fixed
band from tokens — `--dock-band-reserve`, `--dock-bottom-anchor`, `--dock-menubar-reserve`
(`layout.css:78-135`) — and DESIGN.md §4 states *"a component must not introduce a viewport literal that bypasses
those tokens."* A bottom-anchored toast that ignores `--dock-band-reserve` will occlude, or be occluded by, the
transport dock band. **Occlusion geometry: UNPROVEN-NEEDS-LIVE** (it needs a render at ≥1 breakpoint); the
token-bypass itself is confirmed from source.

**Falsifier.** Show a `z-*`/`offset` binding on the Toaster, or a DESIGN.md exemption for teleported chrome. Neither
exists.

---

## D-7 · MAJOR · error toasts auto-dismiss with no dismiss control — and they carry the diagnostics

**Claim.** `closeButton` is not set on the Toaster and is not among the six `classes` keys that are (it is present as
`closeButton: ''` at `:37`, which is a *class* for a button that never renders — see D-11). sonner's
`closeButton` prop defaults to `false`. `TOAST_LIFETIME = 4000` (`lib/index.js:298`). So:

- a toast can only be dismissed by hovering (pauses, does not dismiss), swiping (needs the CSS from D-1), or waiting;
- on touch there is no hover, so **no pause and no dismiss** — the content is strictly time-limited;
- the longest-lived toasts are precisely the ones carrying content the user must *read and act on*:
  `KeyframesStringControls.vue:105-108` (`description: (e as Error).message`, 10 000 ms),
  `:146-149` and `:155-158` (the verbatim compile-refusal reports the source comments call *"the product value —
  it teaches where kf's unique axes exceed pure CSS"*), `useKeyframeOps.ts:33-37` (10 000 ms + the Retry action).

WCAG 2.2.1 (Timing Adjustable) is the relevant floor; a 10 s window on a multi-sentence compiler diagnostic with no
extend/dismiss control does not clear it. glass-ui's family ships `ToastClose` and honours
`Number.POSITIVE_INFINITY` duration (`use-toast.d.ts`) — the primitive from D-5 solves this for free.

**Falsifier.** Show `closeButton` set true, a `duration: Infinity` on the diagnostic toasts, or a keyboard path that
dismisses. sonner's hotkey (`⌥/alt + T`, surfaced in the section's `aria-label`) *focuses* the region; it does not
dismiss, and with `closeButton` false there is no focusable control inside the toast to reach.

---

## D-8 · MAJOR · "DOCUMENT-LEVEL singletons" is false in lifetime — and the share-restore confirmation is dropped by construction

**Claim.** The header comment (`:2-7`) asserts these are *"the demo's DOCUMENT-LEVEL singletons"* that *"resolve
against the DOCUMENT … not the controls grid."* The mount contradicts it: `AnimationControlsGroup` is rendered with
`:key="superKey"` (`EditorShell.vue:76`), `superKey` is per-scene (`App.vue:191`
`currentScene.value.superKey`; `scenes.ts:67,131,140,148,156`). **Every scene switch unmounts and remounts
DemoGlobalChrome**, taking the `<defs>` node and the Toaster with it.

The Toaster teardown is not cosmetic. vue-sonner's `Observer.subscribe` (`lib/index.js:14-19`) **only pushes a
subscriber — it never replays `this.toasts`**. A Toaster mounted after a toast was published shows nothing. Now read
`useShareState.ts:76-86` in order:

```ts
if (result.activeScene && onSceneRestore) {
    onSceneRestore(result.activeScene);          // ← changes activeScene → superKey → keyed remount
}
toast.success("State restored!", { duration: 3000, description: "Animation state loaded from shared URL." });
```

The scene switch is requested, then the confirmation is published to the *current* Toaster's local list; on the next
render that Toaster is destroyed and a fresh one mounts empty. **The share-restore flow's only success signal is
dropped by construction**, and the same hazard applies to any toast published near a scene change.

**Provenance.** `DemoGlobalChrome.vue:2-7`; `EditorShell.vue:76`; `App.vue:191`;
`vue-sonner/lib/index.js:14-19` (`subscribe`) and `:24-27` (`addToast` publishes-then-appends);
`useShareState.ts:76-86`.

**Severity note.** Under D-1 this is moot (nothing is visible anyway). It **survives D-1's fix**, which is why it is
MAJOR and not INFO. DESIGN.md §6 is also implicated: *"Rationale prose is owned here. Comments may point to a
section; they do not mint a competing authority."* This comment mints a singleton claim the tree does not honour.

**Falsifier.** Show `superKey` stable across scenes (it is not), a `<KeepAlive>`/`<Transition>` preserving the
instance (`EditorShell.vue:75-103` has neither), or a replay in sonner's subscribe (there is none).

---

## D-9 · MAJOR · three different "rainbows" — and one control paints two of them across its two states

**Claim.** `#rainbow-gradient` (`:16-23`) declares six stops: red 0 %, **orange** 20 %, yellow 40 %, green 60 %,
blue 80 %, violet 100 %. The demo's other two rainbow ramps do not agree with it or with each other:

| ramp | stops | has orange | has cyan | has indigo | geometry |
| --- | --- | --- | --- | --- | --- |
| `#rainbow-gradient` (`DemoGlobalChrome.vue:16-23`) | 6 | **yes** | no | no | 45° (`x1/y1 0% → x2/y2 100%`) |
| `.progress-bar` (`design-idioms.css:133-143`) | 7 | **no** | **yes** (50 %) | no | `to right`, wraps red→red |
| `rainbow-vivid` (glass-ui `dist/styles/utilities/btn.css`) | 7 | yes | no | **yes** | `to right` |

DESIGN.md:45-48 pins the family as *"red, orange, yellow, green, cyan, blue, violet"* and forbids *"inventing another
hue for a gradient"*. `--rainbow-indigo` is **not** in the demo's pinned family and **not** declared in
`design-idioms.css:15-21`; it resolves from glass-ui's own token
(`dist/styles/tokens/scale-paper.css`: `--rainbow-indigo: oklch(0.566 0.206 294.1)`). So `rainbow-vivid` in the demo
renders six demo-authored HSL hues plus one glass-ui oklch hue — despite `design-idioms.css:10-12` asserting the
demo's copy is *"AUTHORITATIVE for the demo."*

The sharpest instance is a single control. `RibbonBar.vue:45-63`, the Apply-CSS paintbrush:
- **idle** → `:style="{ stroke: 'url(#rainbow-gradient)' }"` — the 6-stop, orange-bearing, 45° ramp from this file;
- **active** → `'rainbow-vivid text-white ribbon-apply--active'` — the 7-stop, indigo-bearing, horizontal ramp.

The same affordance's two states are painted by two different rainbows in two different geometries. DESIGN.md §2's
whole point is that a signal family is *pinned*.

**Provenance.** `DemoGlobalChrome.vue:16-23`; `design-idioms.css:10-21,130-143`; `RibbonBar.vue:49-60`;
`glass-ui/dist/styles/utilities/btn.css` (`rainbow-vivid`), `dist/styles/tokens/scale-paper.css`
(`--rainbow-indigo`); `demo/DESIGN.md:45-48`.

**Falsifier.** A DESIGN.md clause sanctioning per-site stop subsets, or a demo declaration of `--rainbow-indigo`
that would at least make `rainbow-vivid` demo-authoritative. Neither exists. (Note: the red→red **wrap** difference
is *not* part of this claim — a repeating sweep legitimately closes its loop where a static stroke does not.)

---

## D-10 · MINOR · raw viewport and width literals bypass the demo's owned geometry tokens

**Claim.** `:32` carries `lg:w-80 w-64 max-w-[90vw]`. DESIGN.md:88-90 — *"Work-area clamps, safe-area insets, and
the stable mobile reserve feed the dock; **a component must not introduce a viewport literal that bypasses those
tokens**"* — and §6 partitions *"lengths, ratios, viewport clamps"* to `layout.css`. `max-w-[90vw]` is a raw
bracketed viewport literal authored in a component, in the one unit family the demo has otherwise retired: its own
clamps use `svi`/`dvh` (`design-idioms.css:47-48` — `clamp(25rem, 33svi, 32rem)`, `60dvh`), which are the
dynamic-viewport units `vw` predates. The demo also owns a panel-width token, `--dock-panel-width: 17rem`
(`layout.css:14`), consumed as `min-w-[var(--dock-panel-width)]` by `MbabbMenu.vue:6`. The toast is 16 rem / 20 rem
instead.

**Arithmetic (for honesty about the severity).** `max-w-[90vw]` binds only below ~284 px of viewport
(256 px ÷ 0.9); at the `lg` rung it binds below ~356 px, unreachable since `lg` starts at 1024 px. It is therefore
near-inert — defensible only for the ~280 px Galaxy-Fold cover screen. It is a token-hygiene defect, not a layout
defect. **MINOR, deliberately.**

**Falsifier.** Show `--dock-panel-width` is scoped to dock panels only (its name suggests dock *or* header panels;
`MbabbMenu.vue:6` uses it for a dropdown, so the scope is already "floating panel"), or a DESIGN.md exemption for
vendor-configured surfaces.

---

## D-11 · MINOR · the padding proportion inverts the design system's overlay rule; three of six `classes` keys are dead

**Claim (a) — proportion.** `:32` sets `px-4 py-3` → inline 16 px, block 12 px, block/inline = **0.75**. glass-ui's
own Toast derives the pair from an explicit ratio: `--overlay-pad-inline: --spacing(6)` (24 px),
`--overlay-pad-block: calc(var(--overlay-pad-inline) * 1.272)` → block/inline = **1.272** (≈ √φ, and DESIGN.md:87
names `--phi: 1.618` as *"the sole named constant"* of the demo's derived geometry). The demo's toast does not merely
differ in magnitude; it **inverts the direction** of the system's overlay padding proportion — wider than tall where
the system is taller than wide. Aristotelian reading: the pill reads as a squat banner rather than a card, and the
squatness is what makes D-3's orphaned icon row visually cramped rather than merely odd.

**Claim (b) — dead configuration.** Of the six `classes` keys, three are empty strings for elements that either never
render or are unreachable: `closeButton: ''` (`:37`) styles a button gated behind a `closeButton` prop that is never
set (D-7); `cancelButton: ''` (`:36`) styles a `cancel` option no call site uses (`grep` over all 24 sites → 0).
Only `actionButton` (`:35`) is live, and it is live *and broken* (D-4). Three of six keys are decoration; the config
reads as a completeness ritual rather than a decision.

**Falsifier.** (a) Show a DESIGN.md padding rule for notification surfaces that sanctions 4/3 (there is none — §3
names two card registers, neither of which is this), or that glass-ui's 1.272 is incidental rather than derived (the
`calc()` is explicit). (b) Show a `cancel:` or `closeButton:` usage anywhere.

---

## D-12 · MINOR · the hidden `<svg>` is the demo's only decorative graphic without `aria-hidden`

**Claim.** `:14` — `<svg width="0" height="0" class="absolute">` — carries no `aria-hidden="true"` and no
`focusable="false"`. The demo has an established convention: `aria-hidden="true"` appears on 12 decorative nodes
including inline SVG/canvas — `SpringTarget.vue:83,107`, `SpringTrace.vue:20`, `SpringHeatmap.vue:37`,
`CubeTarget.vue:69`, `SequenceAxis.vue:6`, `SequencePlayhead.vue:9`, `SquareInstrument.vue:10,15,21,35`,
`EasingTarget.vue:94`. This is the one presentational graphic that opts out.

**Severity, honestly.** A zero-size `<svg>` containing only `<defs>` has no accessible name and is very likely
pruned from the AX tree by every current engine. This is a **convention** defect, not a demonstrated barrier —
hence MINOR, not MAJOR. It is one attribute.

**Falsifier.** An AX-tree dump showing the node absent in Chromium/WebKit/Gecko would reduce this to INFO; it would
not restore the convention.

---

## D-13 · MINOR · the toast has no boundary under forced-colors

**Claim.** The toast's entire visual identity is a **background inversion** (`bg-foreground text-background`, `:32`)
plus `shadow-lg`. It declares no `border`. Under `@media (forced-colors: active)` the UA overrides
`background-color` and `color` with system colours and suppresses `box-shadow`, so an unbordered inverted pill
becomes system `Canvas` on system `Canvas` — a boundary-less block of text floating over the app. The demo has
**zero** `forced-colors` rules (`grep -rn "forced-colors" demo/` → 0). glass-ui ships a forced-colors policy
(`dist/styles/accessibility.css`) but it targets state attributes — `[aria-current]`, `[aria-selected="true"]`,
`[aria-pressed]`, `[data-state=checked]`, `[aria-invalid]` — none of which a sonner `<li>` carries.

Secondary, same line: `shadow-lg` resolves to `0 10px 15px -3px #0000001a` (shipped CSS) — a 10 %-alpha **black**
shadow. In the dark arm the pill is `#e9e6e2` on a `#0b0a09` field, so the elevation cue is invisible; the demo's
own depth register (DESIGN.md §4, glass-ui `--shadow-color: var(--foreground)`) is theme-aware and was not used.

**Falsifier.** A forced-colors render showing a UA-supplied boundary (there is no UA border on a `<li>`), or a
glass-ui selector that matches `[data-sonner-toast]` (grep: 0 across `dist/styles/**`).

---

## D-14 · MINOR · `theme="system"` contradicts the app's explicit theme authority

**Claim.** `:40` hard-pins `theme="system"`. vue-sonner resolves that from `matchMedia("(prefers-color-scheme:
dark)")` alone (`lib/index.js:976`, and the live listener at `:1053-1061`). The demo's theme authority is **not**
the OS: `app/index.html:80-89` reads `localStorage['vueuse-color-scheme']` and applies `.dark` to
`document.documentElement`, and `DarkModeToggle` (`EditorShell.vue:44`, `MbabbMenu.vue:19`) is documented as *"the
sole theme command."* A user who forces light while the OS is dark gets `data-sonner-theme="dark"` on a toaster
whose contents are painted from `.dark`-driven app tokens.

**Severity, honestly.** Under `unstyled: true` the toast body's colours come from `bg-foreground`/`text-background`,
which *do* follow the app (the `.dark` class is on `<html>`, and the Teleport target is `<html>`, so the teleported
node is a `.dark` **descendant** and `@custom-variant dark (&:where(.dark, .dark *))` still matches). The mismatch
is therefore confined to sonner's own `--normal-bg/--normal-text` block, which reaches the close button and loader.
Both are currently unreachable. **MINOR — but it is a latent trap that only bites after D-1 and D-7 are fixed.**
The correct binding is the resolved app theme, not `"system"`.

**Falsifier.** Show the demo has no manual override (it does — the pre-paint script honours an explicit
`'light'`/`'dark'` value), or that sonner resolves `system` from the `.dark` class (it does not; `:976` is
matchMedia).

---

## D-15 · MINOR · six stops across a 16 px diagonal is below the band-resolution threshold — UNPROVEN-NEEDS-LIVE

**Claim.** The gradient's sole consumer strokes a `Paintbrush` at `icon-sm` (`RibbonBar.vue:56-58`;
`icon-sm` → `size-4` → 16 px, `design-idioms.css:102-107`). Six stops across a 16 px box on the 45° diagonal
(≈ 22.6 px of ramp) gives ~4.5 px per band, painted onto a ~1.5 px Lucide stroke. The perceived result is a muddled
polychrome rather than a legible spectrum; a 2–3 stop ramp reads as "rainbow" at that size where six does not.

**Falsifier.** A magnified render showing distinct bands on the stroke kills this. **UNPROVEN-NEEDS-LIVE — route to
SS-13.** Filed as MINOR precisely because it is the one claim on this page I cannot settle from the tree.

---

# Superlatives (L-18 both ways)

## S-1 · the hidden-paint-server technique is correct, and deliberately so

`:14` uses `width="0" height="0"` — **not** `display: none`, **not** `visibility: hidden`, **not** a
`hidden` attribute. This is the right call and a non-obvious one: an SVG paint server inside a `display: none`
subtree has historically failed to resolve through `url(#id)` in WebKit, and zero intrinsic dimensions is the
technique that survives every engine. The `class="absolute"` additionally removes the zero-box from flow so it
cannot perturb the fragment root it sits beside (`AnimationControlsGroup.vue:118`, a multi-root template).
Someone knew what they were doing on this line.

**Falsifier (runs against the praise).** If a modern engine resolved paint servers through `display:none`, the
technique would be merely conventional rather than necessary — but it would still be correct, and `width=0` remains
the strictly safer form. Nothing in the tree argues otherwise.

## S-2 · the inverted token pair is AAA in both theme arms, with zero literals

`bg-foreground` / `text-background` (`:32`) resolve to tokens, never to hex. Computed WCAG 2.x contrast from the
shipped values:

| arm | pill | text | ratio |
| --- | --- | --- | --- |
| light | `--foreground` `hsl(24 10% 10%)` → rel. luminance 0.01005 | `--background` `hsl(40 30% 98%)` → 0.96016 | **16.8 : 1** |
| dark | `--foreground` `#e9e6e2` → 0.79409 | `--background` `#0b0a09` → 0.00308 | **15.9 : 1** |

(Tokens from `glass-ui/dist/styles/tokens/color-radius.css` and the `.dark` block in the shipped
`dist/gh-pages/assets/index-CL_QYCiO.css`.) Both arms clear WCAG AAA (7:1) by more than 2×, in both directions, and
the inversion is the correct *semantic* choice for a notification — it reads as "not the page." The six gradient
stops likewise consume `var(--rainbow-*)` (`:17-22`) rather than literals, satisfying DESIGN.md §2's naming rule
even while D-9 shows the *set* is wrong.

**Falsifier.** A token re-tune that narrows either arm, or a demonstration that `text-background` is overridden
downstream. Neither is in the tree; `.text-background{color:var(--background)}` is the last-declared rule for that
class in the shipped CSS.

## S-3 · the paint-server rationale is genuinely load-bearing prose

`:9-13` explains *why* the `<defs>` cannot live with its consumer: *"the gradient must live where the SVG reference
can resolve it (the document's paint-server registry)."* That is the actual mechanism, it names the actual consumer
(the ribbon paintbrush), and it points at the token home (`design-idioms.css`). Compare the demo's more typical
comment register — dense tranche-ID archaeology — this one would let a stranger make the right decision. It is also
*correct*: `RibbonBar.vue:59` is indeed the sole `url(#…)` consumer in the demo, verified by grep.

**Falsifier (runs against the praise).** The *adjacent* claim in the same header — "DOCUMENT-LEVEL singletons" —
is false (D-8), so the praise is scoped to `:9-13` only and does not extend to `:2-7`. If the paint-server clause
were also inaccurate the superlative would fall; it is not.

---

# Claims killed by their own falsifier (recorded, not shipped)

**K-1 — "the toast title is not bold."** `text-body` (`@utility` in glass-ui `typography/semantic.css`) declares
`font-weight: 400`, and the title class is `font-bold text-body` (`:33`). Same specificity (0,1,0), so cascade order
decides, and authoring order in the class attribute is irrelevant. Measured in the shipped bundle: `.text-body` with
a `font-weight` declaration sits at byte 213 879; `.font-bold` recurs at **218 423** — *after* it. `.font-bold`
wins; the title **is** bold. **Claim dead.** (Residual INFO, not filed as a defect: the bundle carries two utility
corpora — glass-ui's precompiled sheet and the demo's Tailwind output — so `.text-body`, `.text-small` and
`.font-bold` each appear 2–3×, and this resolution is decided by bundle order rather than by anything in the source.
Currently correct; structurally fragile.)

**K-2 — "the SVG and CSS rainbows interpolate in different colour spaces."** SVG gradients interpolate in sRGB by
default and cannot take `oklab`; the demo uses `color-mix(in oklab, …)` elsewhere
(`SequenceTarget.vue:165`, `design-idioms.css`). But `.progress-bar` (`design-idioms.css:133-143`) declares a plain
`linear-gradient(to right, …)` with **no** `in oklab`, so both ramps are sRGB. No divergence. **Claim dead.**
(The *stop-set* divergence survives independently and is filed as D-9.)

---

# Contradictions and extensions of the hitherto corpus

**Extends `U/audit/lane-17-…md` §8 (MINOR · colocation).** Lane 17 correctly identified the mis-homing and quoted
the same header comment. Two refinements from this pass:
1. Lane 17 states the component is *"instantiated once at `AnimationControlsGroup.vue:117`."* The line is now
   **118**, and — more materially — "once" is true per render but false per session: `EditorShell.vue:76`
   `:key="superKey"` remounts it on every scene change (D-8). Lane 17's severity (MINOR · colocation) understates
   this: the re-home is not a tidiness fix, it is the fix for a **dropped share-restore confirmation**.
2. Lane 17, T-F3 and T-F8 all treat this file as a *placement* problem. On the design axis it is a
   **content** problem: the file would still ship an unstyled, tone-less, undismissable toast surface from any
   directory. Re-homing without D-1/D-2/D-5 moves the defect, it does not close it.

**Extends `formation/keyframes/lane-frontend.md` S-1..S-8.** Proposes a new census row **S-9 · vue-sonner Toaster
→ `@mkbabb/glass-ui/toast` — RED** (D-5). It ranks above S-1 (KfPillTabs, 217 lines, "rationale void"): S-1's fork
renders correctly and merely duplicates; S-9's fork does not render at all (D-1) and drops four capabilities the
system already ships (tone, surface, close, infinite duration).

**Consumes `lane-frontend.md` F-1 as a sequencing rider.** Every remediation on this page that routes through
glass-ui is blocked until `@mkbabb/glass-ui` is declared in `package.json` and locked. Fixing D-1 by importing
`vue-sonner/style.css` is the one-line stopgap that is *not* F-1-blocked — but it is a stopgap, and it does not
touch D-2, D-3, D-4, D-7, D-8, D-11 or D-13.

---

# Repair ordering (for the wave that consumes this)

1. **D-1** — one line. `@import "vue-sonner/style.css";` or an entry-module import. Not F-1-blocked. Do it first so
   the remaining findings become *observable* at SS-13 rather than merely deduced.
2. **D-8** — re-home DemoGlobalChrome above the `:key="superKey"` boundary (this is T-F3/lane-17 §8's move, now with
   a behavioural motive). The SVG `<defs>` and the Toaster travel together to `demo/app/` chrome.
3. **D-5** — replace the vue-sonner rental with `@mkbabb/glass-ui/toast` (**after F-1**). This closes D-2, D-3, D-4,
   D-7, D-11(b) and D-13 in one motion, because the system's primitive ships tone, surface, close, duration and its
   own CSS. Migrate the 24 call sites; the only capability to verify first is promise/loading toasts.
4. **D-9** — reconcile the three rainbows to one pinned stop set per DESIGN.md §2 (and decide indigo: declare it in
   `design-idioms.css` or stop consuming `rainbow-vivid`).
5. **D-6, D-10, D-12, D-14, D-15** — token/attribute hygiene, each independently landable.
