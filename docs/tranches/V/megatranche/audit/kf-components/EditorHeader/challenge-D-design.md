claude-opus-5[1m]

# Challenge · `EditorHeader.vue` · axis D (DESIGN)

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/shell/EditorHeader.vue` (108 lines)
**Mode:** static, read-only. No installs, no dev servers, no browser tooling. Every claim is source-derived; the two claims that need a live surface are marked `UNPROVEN-NEEDS-LIVE` for SS-13.
**Read whole:** the target + `SharePopover.vue` (62) + `EditorShell.vue` (261, the sibling that supersedes it) + `shell/index.ts` + `styles/style.css` + `styles/layout.css` + `styles/design-idioms.css` + the installed `@mkbabb/glass-ui@7.0.0` `header-ribbon` / `dark-mode-toggle` / token / a11y-override surfaces.

---

## 0. Headline

| # | Finding | Severity |
|---|---|---|
| **D-1** | The component is **dead** (zero renderers) **and wholly superseded** — glass-ui 7.0.0's `HeaderRibbon` is this component's own API, upstreamed and hardened, and is already the live path at `EditorShell.vue:16`. Verdict: **DELETE**, not remediate. | **BLOCKER** |
| D-2 | Collapsed items stay in the tab order **and** the a11y tree — no `inert`, no `aria-hidden`. | MAJOR |
| D-3 | No group role, no accessible name on the action strip. | MAJOR |
| D-4 | Keyboard can never open the ribbon: `mouseenter` only, no focus-within, no Esc. | MAJOR |
| D-5 | Mouse-only event model; no coarse-pointer path; targets under the design system's own `--touch-target`. | MAJOR |
| D-6 | **No surface.** The icons float directly on the scene — no plate, no border, no radius, no forced-colors fallback. | MAJOR |
| D-7 | z-rung violation: `z-dock` (40, *"the bottom dock band"*) worn by a **top** header. | MAJOR |
| D-8 | Bypasses the demo's own top-band anchor (`--dock-top-anchor`, which folds `env(safe-area-inset-top)` + the φ optical offset) for a raw `top-0 py-2`. | MAJOR |
| D-9 | Motion incoherence: the two transition channels are desynchronised by 150 ms and the width channel is **dead for ~60 % of its duration**. | MAJOR |
| D-10 | `title="Toggle dark mode"` collides with `DarkModeToggle`'s own state-aware `aria-label` → label-in-name mismatch. **Propagates to the live shell.** | MAJOR |
| D-11 … D-18 | Contradicted `overflow` utility · proximity inversion at `lg` · a renamed magic number · contradictory hover semantics · un-tokenised 2 s dwell · physical-axis properties (RTL) · undocumented layout/slot contract · comments-as-archaeology | MINOR ×8 |
| D-19 | `icon-lg` namespace collision (demo 24 px vs glass-ui 20 px) — folds census §6.3. | INFO |
| **SUP-1 … SUP-4** | The slot contract that **became** the design system's · a reduced-motion outcome that is *ideal* by construction · the correct overlay pointer idiom · a prior audit finding demonstrably discharged. | superlative ×4 |

**Tally: 19 defects (1 BLOCKER · 9 MAJOR · 8 MINOR · 1 INFO) · 4 superlatives.**

### 0.1 The honesty caveat that governs every severity below

The component **ships zero bytes.** Probe:

```
$ grep -rl "header-items-wrapper\|header-collapsed" dist/gh-pages   → (no output)
$ grep -rl "header-ribbon__actions"                 dist/gh-pages   → dist/gh-pages/assets/index-CL_QYCiO.css
                                                                       dist/gh-pages/assets/index-B2hcFaCm.js
```

The built demo bundle carries glass-ui's ribbon and **not** this one. So D-2…D-19 are stated **as-if-rendered** and are unobservable to any user today — with exactly one exception, **D-10, which is copied verbatim into the live `EditorShell.vue:45`**. This is why only D-1 carries BLOCKER: the design verdict for this file is deletion, and every other row is source-hygiene evidence *for* that verdict rather than a shipping defect. I record this explicitly because the tempting claim — "dead scoped CSS bloats the bundle" — is **false here**, and a false defect is worse than a missed one.

---

## 1. D-1 — dead, and superseded by its own descendant (BLOCKER)

### 1.1 Dead

```
$ grep -rn "EditorHeader" --include="*.vue" --include="*.ts" demo/
demo/components/instrument/shell/index.ts:2:export { default as EditorHeader } from "./EditorHeader.vue";
```

One reference in the entire demo tree, and it is the barrel's own re-export. The barrel *is* consumed — `demo/app/App.vue:138` (`EditorShell`, `EditorStartScreen`) and `demo/app/dock/MbabbMenu.vue:81` (`SharePopover`) — which is precisely what launders the deadness past a dead-export gate. No dynamic import, no `defineAsyncComponent` by name, no template-string reference anywhere.

### 1.2 Superseded — the crosswalk

`EditorShell.vue:16` renders `<HeaderRibbon ref="headerRibbonRef" mode="persistent" placement="right">` with `#items`. glass-ui's component is not merely *similar*; its **slot contract is byte-for-byte this component's**:

```
node_modules/@mkbabb/glass-ui/dist/components/header-ribbon/HeaderRibbon.vue.d.ts
  declare var __VLS_7: { pinned: boolean; }
  type __VLS_Slots = {} & { anchor?: (props: typeof __VLS_7) => any; } & { items?: () => any; };
```

`EditorHeader.vue:36` — `<slot name="anchor" :pinned="isPinned">`; `:22` — `<slot name="items">`. Identical names, identical scoped prop. This component is the **origin design**; `HeaderRibbon` is it, upstreamed. Every axis-D row below is a line in the diff between the origin and the hardened descendant:

| concern | `EditorHeader.vue` | glass-ui `HeaderRibbon` (installed 7.0.0) |
|---|---|---|
| group semantics | none (bare `<div>`) | `role: "toolbar"`, `aria-label` (default `"Header actions"`) — `dist/header-ribbon.js` |
| collapsed region | `opacity:0; max-width:0; pointer-events:none` (`:101–107`) | `inert` + `aria-hidden` bound to `!expanded` — `dist/header-ribbon.js` |
| expand triggers | `mouseenter` only (`:13`) | `pointerenter` **with `e.pointerType !== "touch"` guard**, `focusin`/`focusout`, `Esc` → collapse + focus anchor |
| collapse | 2000 ms dwell timer (`:60`) | immediate on `pointerleave`; no magic dwell |
| stacking | `z-dock` = 40 (`:3`) | `z-index: var(--z-header)` = 35 — `components/header-ribbon/styles.css` |
| positioning | `absolute top-0 left-0 right-0` full-bleed (`:3`) | `position: fixed; width: max-content; inset-inline-start/end` per `placement` |
| axis | `margin-right` + `max-width` (`:92–93`) | `margin-inline-start/end` + `max-inline-size`, keyed to placement |
| cap token | `--header-items-max-w: 500px` (`layout.css:15`) | `--header-ribbon-actions-width, 30rem` (rem, consumer-overridable) |
| easing | `--duration-slow --ease-standard` (`:96–97`) | `--spring-snappy-duration --spring-snappy` (a real spring) |
| extra channel | none | `translate: ±0.375rem` — the collapse has **direction** |
| clipping | `overflow-hidden` utility **and** `overflow: visible` (`:18` vs `:99`) | `overflow: clip`, once |
| surface | none | `<Surface material="functional" surface="glass" specular="subtle">` + `radius-pill` + `--panel-padding` |
| reduced motion | delegated (see SUP-2) | explicit `@media (prefers-reduced-motion: reduce) { .header-ribbon__actions { transition: none } }` |
| forced colors | none | `@media (forced-colors: active) { .header-ribbon__band { border: 1px solid CanvasText } }` |
| coarse pointer | none | `@media (pointer: coarse) { padding: .75rem; max-inline-size: calc(100vw - 1.5rem) }` |

There is no column in which the local copy wins.

**Prior corpus.** This is the **third** time the verdict has been written. `keyframes.js/docs/tranches/U/audit/lane-18-demo-instrument-editors-shell-state.md:69–78` — *"**Fully dead:** EditorHeader.vue (108L) — zero importers anywhere in the repo … the barrel re-export is what hides it from `proof:no-dead-export`"*, proposal *"(a) **Delete EditorHeader.vue** and its barrel line — no legacy code."* Re-ratified as wave work at `docs/tranches/U/waves/U.B.md:389,402,407` (U.B5, "a NO-DEFERRAL row"). Neither executed. It also violates the standing `feedback_no_backwards_compat` and `feedback_glass_ui_first_class` laws: a demo-local fork sitting beside the published primitive it was promoted into.

**Falsifier.** Any of: a consumer outside `demo/` (the package `exports` map publishes only the library, not the demo); a dynamic/string-keyed registration; a documented external embed; or a `HeaderRibbon` capability regression that only the fork covers (I found none — the fork is a strict subset).

**Contradicts the hitherto corpus.** `formation/keyframes/lane-frontend.md` §4 lists `| 108 | EditorHeader.vue | G | header bar — DarkModeToggle |` as a live roster row of "editor chrome" with no deadness mark, and §5's shadow census (S-1…S-8) has **no row for it** — even though §3.1 records `/header-ribbon` at exactly 1 import. The tree disagrees with both: this is the census's **missing S-row**, and it is the *strongest* one in the corpus, because unlike S-3/S-4/S-5 ("evaluate") there is nothing to evaluate — the replacement is already rendering, one file away.

---

## 2. Accessibility (D-2 … D-5)

### D-2 — the collapsed strip stays focusable and stays in the a11y tree (MAJOR)

`:101–107` — `.header-collapsed { max-width: 0; margin-right: 0; opacity: 0; pointer-events: none; overflow: hidden; }`

None of those five declarations removes an element from sequential focus navigation or from the accessibility tree. Only `display:none`, `visibility:hidden`, `content-visibility:hidden`, or `inert` do. So in the collapsed (default — `:48` `isExpanded = ref(false)`, `:49` `isPinned = ref(false)`) state, a `Tab` press lands on the SharePopover trigger (`SharePopover.vue:4`) and then the dark-mode button, both at `opacity: 0` inside a 0-width clipping box. A screen-reader user hears "Share animation, button" for a control no sighted user can see; a sighted keyboard user's focus vanishes into a zero-width box with nothing to scroll into view. WCAG 2.4.7 (Focus Visible) and 2.4.3 (Focus Order).

This is the single defect `HeaderRibbon` most conspicuously fixes: `inert: !expanded || void 0`, `"aria-hidden": !expanded` (`dist/header-ribbon.js`).

**Falsifier.** Show that `pointer-events: none` or `max-width: 0` removes an element from the tab order (they do not), or that the two default items are themselves non-focusable (both render `<button>` — `SharePopover.vue:4`, `dark-mode-toggle.js` renders `i("button", …)`).

### D-3 — no group role, no accessible name (MAJOR)

`:2`, `:11`, `:16`, `:32` — four nested `<div>`s, zero `role`, zero `aria-label`, zero `aria-expanded`. The action strip is an unnamed generic container; the pin state (`:36`) is passed to a slot but never announced. `HeaderRibbon` ships `role="toolbar"` + `ariaLabel` with a default.

**Caveat, stated so the remedy is not itself a defect:** ARIA APG's `toolbar` pattern expects arrow-key roving with a single tab stop; glass-ui's ribbon supplies the role and the name but **not** the roving (`dist/header-ribbon.js` binds only `keydown.esc`). So "adopt `role="toolbar"`" is the right direction and an *incomplete* remedy in both codebases — a **glass-ui BH relay candidate** under the standing relay edict, not a kf-side fix.

**Falsifier.** An ancestor supplying the name/role. `EditorHeader`'s root is the outermost node it owns and it has no consumer to supply one.

### D-4 — keyboard cannot open it (MAJOR)

Expansion has exactly one trigger: `@mouseenter="onRibbonMouseEnter"` (`:13` → `:64–67`). The alternative is the pin at `:32–35`, a `<div>` with `@click` and no `tabindex`, no `role`, no key handler — reachable only if the (never-supplied, see D-17) `#anchor` slot happens to contain a real button. Compose with D-2 and the failure is complete: the keyboard user cannot cause the strip to become visible, but *can* tab into it while it is invisible. `HeaderRibbon` closes this with `onFocusin`/`onFocusout` feeding the same `expanded` computed, plus Esc-to-collapse-and-return-focus.

**Falsifier.** A consumer that passes a focusable `#anchor` whose focus/click path expands the strip — there is no consumer at all, so the contract is unsatisfiable rather than merely unsatisfied.

### D-5 — the touch path does not exist (MAJOR)

(a) **Event model.** `mouseenter`/`mouseleave` (`:4`, `:13`), not pointer events. On touch, browsers synthesise a `mouseenter` on tap and there is no reliable symmetric `mouseleave`, so a tap either expands-and-sticks until the 2 s dwell (`:60`) fires from an unrelated later event, or double-fires against the pin click. `HeaderRibbon` uses `pointerenter`/`pointerleave` and explicitly discards touch: `if (e.pointerType !== "touch") hovered = true`.

(b) **Target size.** `SharePopover.vue:7,11` — `p-0` around `<Share2 class="icon-lg">`; `icon-lg` is the demo's own `@utility icon-lg { @apply size-6 }` (`design-idioms.css:114–119`) = **24 × 24 px**. The dark-mode button is `aspect-square w-8` (`:26`) = **32 × 32 px**. Both clear WCAG 2.5.8 AA (24 px) — 24 px exactly, with zero margin — and both fall short of the design system's **own** declared coarse-pointer target, `--touch-target: 2.75rem` (44 px, `glass-ui/dist/styles/tokens/sizing.css`), whose `touch-hit-area` utility (`styles/utilities/a11y-overrides.css`) exists for exactly this and is unused here.

(c) **Optical inconsistency.** A two-item strip whose items are 24 px and 32 px, unpadded vs padded — the share glyph reads visibly smaller than its neighbour at the same optical weight.

**Falsifier.** (a) dies if a coarse-pointer stylesheet or a `useTouchGate` wrapper covers this component — it imports neither (`:43–46`). (b) dies if `icon-lg` resolves to ≥ 2.75 rem — it resolves to `size-6`.

---

## 3. Surface, stacking, proportion (D-6 … D-8)

### D-6 — there is no surface (MAJOR)

The component paints nothing: no background, no border, no radius, no shadow, no backdrop filter. Two icons sit directly on whatever the scene is rendering — the two-tier graph-paper substrate (`EditorShell.vue:238–260`), the Aurora hero wash (`HeroAurora.vue`), or an animating subject. glass-ui's ribbon wraps its items in `<Surface material="functional" surface="glass" specular="subtle">` with `border-radius: var(--radius-pill)` and `padding: var(--panel-padding)`, **and** supplies a `@media (forced-colors: active)` border so the band survives a forced-colors theme where glass backgrounds are dropped.

Consequence: the icon contrast has **no floor**. The computed ratios in D-14 hold only against the flat paper field; over the scene the backdrop is unbounded.

**Falsifier.** A parent-supplied plate. There is no parent. `UNPROVEN-NEEDS-LIVE` for the worst-case ratio over the animating subject — the *absence of any surface declaration* is source-decidable and is the claim; the specific failing ratio is not.

### D-7 — the wrong z-rung, and the one reserved for something else (MAJOR)

`:3` — `z-dock`. The demo's own ordered-layer contract (`styles/style.css:23–38`) reads:

```
--z-bar      :  30  the editor bars (header / menubar chrome)
--z-dock     :  40  the bottom dock band
```

A top header wearing the **bottom dock band's** rung. Three consequences: (i) it contradicts the contract's own gloss, which names `z-bar` for exactly this component class; (ii) it sits at the *same* rung as the real dock band, so header-vs-dock paint order falls back to DOM order — the precise non-determinism the ordered-layer contract exists to abolish; (iii) `layout.css:152` warns in prose that dock geometry *"keys on an EXPLICIT `[data-dock-tether]` opt-in attribute on the two real dock bands, NOT a `:has()` test on a generic `.z-dock` utility class"* — i.e. the repo already knows `z-dock` is being worn by non-dock nodes, and this is one of them. glass-ui resolves it with a rung the demo's contract does not even enumerate: `--z-header: 35` (`glass-ui/dist/styles/tokens`), used by `.header-ribbon`.

**Falsifier.** Evidence that this header is intended to paint above the bottom dock (nothing in the contract or the component says so), or that `z-bar`/`z-header` are unavailable (both are defined and Tailwind-bridged via `bridges.css`).

### D-8 — the top-band anchor and the φ ladder are bypassed (MAJOR)

`:3` — `top-0 … px-4 py-2`. Raw Tailwind rhythm: 0 px from the viewport edge, 16 px inline, 8 px block. Meanwhile `layout.css:112–118` defines the demo's top-band contract:

```css
--dock-top-anchor: calc(
    min(max(var(--work-area-top-offset, 0px), env(safe-area-inset-top, 0px)),
        var(--dock-anchor-ceiling)) + var(--dock-margin) / 4 );
```

— a golden-asymmetry anchor (top `+ margin/4`, bottom `+ margin/φ`) that folds the notch inset *and* the optical work-area offset, with a documented cap. `EditorHeader` participates in none of it: no safe-area inset (on a notched device the strip lands under the status bar), no `--dock-margin`, no φ. The file's entire spacing vocabulary — `px-4`, `py-2`, `gap-2`, `lg:gap-4`, `0.75rem` — is default Tailwind rhythm in a demo that owns `--space-phi-5: 2.618rem` / `--space-phi-6: 4.236rem` and a `--phi` divisor. Aristotelian proportion is asserted everywhere around this component and nowhere inside it.

**Falsifier.** A global rule applying safe-area padding to `.z-dock`/`absolute top-0` nodes — `layout.css:152` explicitly forbids keying layout on the `z-*` utility class, so no such rule exists by policy.

---

## 4. Motion (D-9)

### D-9 — two channels describing two different events (MAJOR)

`:95–98`:

```css
transition:
    max-width   var(--duration-slow)   var(--ease-standard),      /* 0.45s cubic-bezier(.4,0,.2,1) */
    margin-right var(--duration-slow)  var(--ease-standard),
    opacity     var(--duration-normal) var(--ease-decelerate);    /* 0.30s cubic-bezier(0,0,.2,1) */
```

Token values resolved from `glass-ui/dist/styles/tokens.css` + `theme/bridges.css`: `--duration-slow: 0.45s`, `--duration-normal: 0.3s`, `--ease-standard → --motion-ease-standard: cubic-bezier(0.4,0,0.2,1)`, `--ease-decelerate → --motion-ease-out: cubic-bezier(0,0,0.2,1)`.

**(a) The dead zone.** The animated cap is `--header-items-max-w: 500px` (`layout.css:15`). The strip's actual content is `24px (share) + 8px gap + 32px (toggle) = 64px`, or `72px` at `lg` (`gap-4`). Rendered width is `min(content, max-width)`, so **no visible width change occurs while `max-width > 72px`** — i.e. for the first ~86 % of the *value* range. Through `cubic-bezier(0.4,0,0.2,1)` that value is reached at roughly `t ≈ 0.60`, so **~270 ms of the 450 ms collapse produces no visible motion at all**; the whole geometric event is compressed into the last ~180 ms.

**(b) The desync.** The opacity channel finishes at 300 ms. The width channel *starts being visible* at ~270 ms. The user therefore sees: content fades to nothing over 300 ms at full width → then, after it is already gone, the empty space collapses. Two channels narrating two different events, 150 ms apart.

**(c) One ease for both directions.** A single declaration serves expand and collapse. `--ease-decelerate` is by definition the *entrance* ease (`bridges.css`: `--ease-decelerate: var(--motion-ease-out)`; the sibling `--ease-accelerate: var(--motion-ease-in)` exists and is unused here), so the exit runs fast-then-slow — the canonical "hesitant dismissal".

**(d) No carrier channel.** glass-ui's ribbon has the *same* structural cap problem (`--header-ribbon-actions-width` defaults to 30 rem ≈ 480 px against the same tiny content) — I flag that honestly rather than pretending the fork is uniquely wrong — but it survives it, because it adds `translate: ±0.375rem` (a channel with no dead zone), drives the width on `--spring-snappy` (a `linear()` spring that front-loads ~60 % of its travel in the first third), and shortens opacity to `--duration-fast` (0.2 s). EditorHeader has no third channel and back-loads the only geometric one.

**Prior corpus, unfolded.** `keyframes.js/docs/tranches/C/audit/animation/ios-animation-general.md:217` names this exact line: *"Header `max-width` morph (`:101`) is a continuity candidate begging for a spring"*, and `:281` prescribes `SpringProgress`-driven continuity. The prescription **landed** — in glass-ui's `HeaderRibbon`, on `--spring-snappy`. It never landed here. The C-tranche finding is discharged upstream and open downstream, which is the same fact as D-1 seen from the motion axis.

**Falsifier.** Measure the rendered width of `.header-items-wrapper` in a live tree; if it exceeds ~430 px (a consumer overriding `#items` with a much wider strip) the dead zone shrinks toward zero and (a)/(b) dissolve. With the default slot (`:22–28`) it cannot.

---

## 5. Copy, tokens, contract (D-10 … D-19)

### D-10 — the tooltip contradicts the accessible name (MAJOR · **propagates to the live shell**)

`:24–25` — `<DarkModeToggle title="Toggle dark mode" …>`. glass-ui's toggle computes its own name (`dist/dark-mode-toggle.js`):

```js
"aria-label": isDark ? "Switch to light mode" : "Switch to dark mode",
"aria-pressed": isDark,
...restAttrs                       // `title` lands here, on the same <button>
```

Result: one button whose **accessible name** is "Switch to dark mode" (state-aware; `aria-label` outranks `title`) and whose **visible tooltip** is "Toggle dark mode" (static, stale). Voice-control users read the visible label and say "click Toggle dark mode", which does not match the accessible name (WCAG 2.5.3 Label in Name). The `title` is also redundant — the component is already named, already `aria-pressed`.

This is the one row that outlives deletion: **`EditorShell.vue:45` carries the identical `title="Toggle dark mode"`**, and that file renders. Fixing it there is independent of D-1.

**Falsifier.** If `title` is judged not to be a "visible label" for 2.5.3, the claim degrades from a WCAG failure to a stale-copy/redundancy defect — it does not disappear, because the two strings are still inconsistent by inspection.

### D-11 — `overflow-hidden` is dead, and the clip intent is stated twice, contradictorily (MINOR)

`:18` declares the utility `overflow-hidden`; `:99` declares `overflow: visible` on the same element. The scoped rule wins on two independent grounds: specificity (`.header-items-wrapper[data-v-…]` = 0-2-0 vs `.overflow-hidden` = 0-1-0) and cascade layers (Tailwind v4 emits utilities inside `@layer utilities`; Vue's scoped `<style>` is injected unlayered, and unlayered beats layered). Only `.header-collapsed { overflow: hidden }` (`:106`) restores clipping, and only while collapsed. Secondary consequence on **expand**: `overflow` is not in the transition list, so `visible` applies at `t=0` while the box is still ~0 px wide — the ~64–72 px of content spills its box for ~60 ms at rising opacity (~35 % by then). The spill paints *under* the anchor (DOM order, `:32` follows `:16`), so the visible artefact is limited to the overhang past the anchor's own box.

**Falsifier.** Show Tailwind utilities emitted unlayered *and* at ≥ 0-2-0 specificity. Both would have to be true.

### D-12 — proximity inversion at `lg` (MINOR)

`:18` `gap-2 lg:gap-4` (0.5 rem → 1 rem intra-strip) against `:93` `margin-right: 0.75rem` (strip → anchor). Below `lg` the ordering is correct (0.5 < 0.75: items group, anchor separates). At `lg` it **inverts** — the anchor sits 0.75 rem from the strip while the strip's own members sit 1 rem apart, so Gestalt proximity binds the pin *more tightly* to the last item than the items bind to each other. glass-ui gets the ratio right and keeps it breakpoint-invariant (`gap: 0.5rem` + `margin-inline: 0.75rem`) — and additionally carries the grouping in a plate rather than in whitespace alone (D-6).

**Falsifier.** A design intent that the anchor read as a member of the strip rather than its handle — contradicted by `:31` ("Anchor — always visible") and by the anchor living outside the collapsible wrapper.

### D-13 — the token that renamed a magic number (MINOR)

`:89–92` claims the STY-5 improvement: *"reads the named layout token … instead of a magic pixel literal"* — and then, in the same comment, *"(same 500px value)"*. `layout.css:15` confirms: `--header-items-max-w: 500px`. The literal was moved, not derived. It is a `px` value in a `rem`/φ scale; it is ~7× the content it caps; nothing consumes it but this one rule; and its only functional role is to set the length of D-9's dead zone. As a design constraint it is inert. Cf. `keyframes.js/docs/tranches/J/audit/styling-design-system.md:21,42,146` and `docs/tranches/J/waves/J.W7b-impl.md:28`, which book the row as closed. glass-ui's equivalent is at least a rem and consumer-overridable (`--header-ribbon-actions-width, 30rem`).

**Falsifier.** A second consumer of `--header-items-max-w`, or a derivation (`calc`, `min()`, a container query) making 500 px a computed bound. `grep` finds one consumer and no derivation.

### D-14 — contradictory hover semantics; the contrast arithmetic (MINOR)

`:26` — `scale-on-hover hover:opacity-50`. `scale-on-hover` is glass-ui's `@utility` (`styles/utilities/btn.css`) scaling to `--scale-hover: 1.08` (`design-idioms.css:40–41`): *advance*. `hover:opacity-50`: *recede*. Two opposite affordance semantics on one control, fired by one event. **The live shell already resolved this** — `EditorShell.vue:46` is `aspect-square w-8 scale-on-hover`, with the opacity fade dropped.

Computed, since the axis asks for ratios where decidable. Tokens: `--foreground: hsl(24 10% 10%)` / `--background: --neutral-0: hsl(40 30% 98%)` (light); `hsl(30 14% 90%)` / `hsl(24 9% 4%)` (dark).

| theme | rest | hover (α = 0.5, composited in sRGB) |
|---|---|---|
| light | **16.8 : 1** | **3.32 : 1** |
| dark | **15.9 : 1** | **4.49 : 1** |

Both hover values clear WCAG 1.4.11 (3:1 non-text). So **this is not a contrast failure on the paper field**, and I decline to claim one. What it is: the hover state spends 80 % of the light-theme contrast headroom and lands 0.32 above the floor — and because of D-6 there is no plate guaranteeing that field, so the floor is not guaranteed either. `UNPROVEN-NEEDS-LIVE` for the ratio over the animating scene.

**Falsifier.** Re-derive with a compositing model other than sRGB-space alpha blend, or with different theme tokens; the qualitative claim (a hover affordance that halves the control's contrast at the moment of targeting) survives either way.

### D-15 — the un-tokenised 2 s dwell (MINOR)

`:60` — `2000`. The only bare numeric literal in the file, in a repo whose durations are all tokens (`--duration-instant|control|fast|normal|slow|panel|xl|xxl`), with no rationale recorded. Two seconds is a long dismissal: the strip stays open across a deliberate pointer exit for eight frames past the 250 ms window a user reads as "responding to me". `HeaderRibbon` needs no dwell at all — it collapses on `pointerleave` and buys the forgiveness back with focus-within and Esc.

**Falsifier.** A UX rationale in the ledger for a 2 s hover-out grace on this ribbon; the comment (`:53–55`) documents only *which library owns the handle*, never the constant.

### D-16 — physical-axis properties; RTL (MINOR)

`:92–93` `max-width` / `margin-right`, `:3` `left-0 right-0`. Under `dir="rtl"` the flex main axis reverses, so within `:11` the strip renders to the right of the anchor — and `margin-right` then places its 0.75 rem gap on the **outer** edge while the strip↔anchor gap collapses to 0. `HeaderRibbon` is fully logical (`margin-inline-start`/`margin-inline-end` selected by `data-placement`, `max-inline-size`, `inset-inline-*`).

Scoped honestly: the demo is `<html lang="en">` (`demo/app/index.html:2`) with **no** `dir` attribute and no RTL machinery anywhere (`grep dir="rtl"|useTextDirection demo/` → nothing). So this is a portability/idiom defect with zero user impact today — MINOR, not MAJOR — recorded because the axis asks for RTL coverage and the answer is "absent and unexercised".

**Falsifier.** Any RTL surface in the demo. There is none.

### D-17 — the layout and slot contracts are undeclared (MINOR)

(a) `:3` is `absolute` with no positioned-ancestor guarantee and no documentation of the requirement; dropped into a static container it positions against the initial containing block. `HeaderRibbon` is `position: fixed` — self-sufficient by construction.
(b) `#items` has default content (`:22–28`) but `#anchor` (`:36`) and `#left` (`:8`) have none, and nothing — no prop, no type, no comment — declares that `#anchor` is *required*. With no slot the anchor is an empty zero-size `<div>` carrying the only pin/unpin handler in the component, so the pin is unreachable and the ribbon degrades to hover-only. This makes the comment at `:31`, **"Anchor — always visible"**, false in the component's own default render.

**Falsifier.** A declared required-slot contract or a default anchor. Neither exists.

### D-18 — comments are edit-history, not design rationale (MINOR)

Nine comment lines (`:6, :15, :31, :53–55, :89–91`). Their content is wave archaeology — "W1.S4", "J.W7b STY-5" — resolvable only against this repo's tranche ledger. What a reader needs and does not get: what the pin *means*, why 2 s, that `#anchor` is mandatory, that a positioned ancestor is required, why the cap is 500. One of the nine (`:31`) is false (D-17b) and one (`:89–91`) overstates its own fix (D-13). A design surface should document its contract; this one documents its diffs.

**Falsifier.** Reader-facing rationale elsewhere — the barrel (`index.ts`) carries none and there is no `CLAUDE.md`/doc entry for the component.

### D-19 — `icon-lg` collides across the boundary (INFO · folds census §6.3)

The demo defines `@utility icon-lg { @apply size-6 }` = **24 px** (`design-idioms.css:114–119`). glass-ui defines `--icon-lg: 1.25rem` = **20 px** (`dist/styles/tokens/sizing.css`), bridged to Tailwind as `--spacing-icon-lg` (`theme/bridges.css`). Two "large icon" scales, differing by 20 %, live in one cascade under near-identical names: an author writing `size-icon-lg` gets 20 px, `icon-lg` gets 24 px. Reached by this component transitively via `SharePopover.vue:11`.

This is the concrete instance of the hazard census `lane-frontend.md` §6.3 names abstractly — *"No `--kf-*` namespace exists … Demo tokens are unprefixed and therefore share a flat global namespace with glass-ui's — a collision surface worth a lane of its own."* **Corroborated, with a named collision.**

**Falsifier.** Show `icon-lg` and `--icon-lg` resolving to the same length, or that the demo utility shadows the glass token in a way that makes them one scale. They are separate mechanisms (a Tailwind `@utility` vs a `@theme` spacing bridge) and separate values.

---

## 6. Superlatives (L-18 runs both ways)

**SUP-1 — the API that became the design system's.** The slot contract at `:22` / `:36` — `items` with a sensible default, `anchor` exposing `{ pinned }` — is reproduced **exactly** in glass-ui 7.0.0's published types (`HeaderRibbon.vue.d.ts`: `anchor?: (props: { pinned: boolean }) => any`, `items?`). Separating the always-visible handle from the collapsible payload, and publishing the pin state to the handle's renderer rather than styling it internally, is a genuinely good factorisation: it lets the consumer own the affordance while the container owns the state machine. This design was correct enough to be promoted into the design system verbatim. *Falsifier: evidence that the glass component predates this file and the influence ran the other way — the demo's own `docs/tranches/H/glass-ui-AX-handoff.md:90` and `docs/tranches/F/audit/a-demo-post-e.md:189` discuss `EditorHeader` as the extant local surface being handed up.*

**SUP-2 — a reduced-motion outcome that is ideal, for free.** The component has no `@media (prefers-reduced-motion: reduce)` block, which reads as a gap — and is not one. glass-ui's global override (`dist/styles/utilities/a11y-overrides.css`) fires `*:not([data-allow-motion]) { transition-duration: 0.1s !important; transition-property: opacity, color, background-color, border-color, box-shadow !important; }`. Against `:95–98` that drops `max-width` and `margin-right` from the transition entirely and caps `opacity` at 100 ms — i.e. under PRM the accordion becomes an **instant collapse with a 100 ms fade**, which is precisely the correct reduced-motion behaviour for a disclosure. The property list happens to be exactly the partition the override wants. *Falsifier / the caveat that keeps this from being unqualified: the component never imports the cascade that guarantees it (`EditorShell.vue:131` imports `@styles/style.css`, `EditorHeader` imports nothing), so the delegation is implicit and unowned — glass-ui's own ribbon states it locally (`transition: none` under PRM) rather than relying on the global. Reconciles census §6.5, which lists 13 PRM sites without EditorHeader: the absence is not a gap.*

**SUP-3 — the correct overlay pointer idiom.** `:3` `pointer-events-none` on the full-bleed root with `pointer-events-auto` restored on exactly the two interactive children (`:7`, `:12`). This is right, and non-obviously so: a full-width bar over an interactive scene must not swallow gestures, and — because the root only enters the hover chain via its `auto` descendants — the same idiom silently shrinks the `mouseleave` region (`:4`) from "the whole top strip" to "the union of the two children", which is the behaviour you want. glass-ui reaches the identical construction independently (`.header-ribbon { pointer-events: none }` + `.header-ribbon__band { pointer-events: auto }`), corroborating it as the sanctioned idiom rather than a happy accident. *Falsifier: a pointer-events model in which ancestors of a hovered `auto` descendant are excluded from the hover chain — they are not.*

**SUP-4 — a prior audit finding, demonstrably discharged.** `keyframes.js/docs/tranches/D/audit/frontend-findings.md:27,122` flagged *"In-component `setTimeout` debounce/hover blobs — hand-rolled"* naming `EditorHeader.vue:50,56,63`. The current source (`:56–62`) is `useTimeoutFn(fn, 2000, { immediate: false })` with vueuse owning the handle and `tryOnScopeDispose` owning teardown — the leak class is gone, `start`/`stop` are named at the call site, and the comment records why. A closed loop, verifiable against the cited finding. *Falsifier: a residual raw `setTimeout`/`clearTimeout` in the file — there is none (`:42–85`).*

---

## 7. Verdict

**DELETE the file and its barrel line** (`shell/index.ts:2`). Do not remediate: D-2…D-9 and D-11…D-19 are each, individually, already fixed in the primitive that is already installed and already rendering one file away (§1.2 crosswalk), and repairing them locally would re-fork the design system in violation of `feedback_glass_ui_first_class`. This is the third writing of that verdict (`U/audit/lane-18` F2 → `U/waves/U.B.md` U.B5 → here); the correct wave action is execution, not re-adjudication.

**Two rows survive deletion and need separate homes:**

1. **D-10** — `title="Toggle dark mode"` on `DarkModeToggle` also sits at the live `EditorShell.vue:45`. Remove the `title`; the component names itself, state-aware.
2. **D-3's caveat** — glass-ui's `HeaderRibbon` publishes `role="toolbar"` without APG arrow-key roving. A **glass-ui BH relay** item under the standing relay edict, not kf-side work.

**Census reconciliation.** `formation/keyframes/lane-frontend.md` — §4 roster row for `EditorHeader.vue` is **contradicted** (listed as live editor chrome; it renders nowhere and ships no bytes); §5 shadow census is **extended** with the missing row `EditorHeader → HeaderRibbon`, which is stronger than every existing S-row because the replacement is already in the tree and already rendering; §6.3 (flat token namespace) is **corroborated** with the concrete `icon-lg` 24 px / `--icon-lg` 20 px collision; §6.5 (PRM sites) is **reconciled** — the absence is correct delegation, not a gap.

---

### Provenance note

Every claim above is sourced from `/Users/mkbabb/Programming/keyframes.js` (source, `docs/tranches/`, `dist/gh-pages/`, and `node_modules/@mkbabb/glass-ui@7.0.0`) read-only. No file in keyframes.js was written, mutated, or executed; no installs, no dev server, no browser tooling. Contrast ratios are computed by hand from the resolved token values (sRGB relative luminance, WCAG 2.x formula, sRGB-space alpha compositing) and are marked `UNPROVEN-NEEDS-LIVE` wherever the backdrop is not the flat theme field.
