claude-opus-5[1m]

# CHALLENGE — `CanvasOverlayButton` · axis D (DESIGN)

**Target** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/CanvasOverlayButton.vue` (25 lines)
**Date** 2026-08-04 · **Method** static + source-derived only (no browser tooling; livable-only claims marked `UNPROVEN-NEEDS-LIVE` for SS-13)
**Pin** `@mkbabb/glass-ui@^4.0.0` installed (`web/package.json:14`, `node_modules/@mkbabb/glass-ui/package.json` → `4.0.0`); producer latest `/Users/mkbabb/Programming/glass-ui/package.json` → `7.0.0`
**Posture** DEFECTIVE-until-proven. 14 defects · 2 blockers · 4 superlatives.

---

## §0 · The whole target (transcribed for provenance)

```vue
 1  <script setup lang="ts">
 2  /**
 3   * A.W3.b — canvas-overlay icon-button wrapper.
 4   *
 5   * Forwards every attr/listener to `<Button variant="glass" size="icon">` and
 6   * surfaces the `active` flag as both `aria-pressed` and the legacy
 7   * `.is-active` class, matching the glass-ui canon for toggle buttons.
 8   */
 9  import { Button } from "@mkbabb/glass-ui/button";
10
11  defineProps<{
12      active?: boolean;
13  }>();
14  </script>
15
16  <template>
17      <Button
18          variant="glass"
19          size="icon"
20          :aria-pressed="active"
21          :class="{ 'is-active': active }"
22      >
23          <slot />
24      </Button>
25  </template>
```

**Import closure read whole (read-only).** One import: `@mkbabb/glass-ui/button` → `dist/button.js` → `dist/button-BNDWhAZb.js` (the compiled `Button.vue` + its cva). Its style closure, reached through `web/src/style.css:3` (`@import "@mkbabb/glass-ui/styles"`) → `dist/styles/index.css` and its 20-file `@import` cascade. Read in full: `tokens/offsets-sizing.css`, `tokens/scale-paper.css`, `tokens/light-dark.css`, `tokens/color-radius.css`, `tokens/dark-arm.css`, `tokens/glass.css`, `glass/surfaces.css`, `utilities/base.css`, `utilities/a11y-overrides.css`, `dock-controls/icon-button.css`, `dock-controls/triggers.css`, `dock/layer-group.css`. Producer counterparts read at `/Users/mkbabb/Programming/glass-ui/src/components/button/Button.vue` and `src/styles/{utilities/responsive.css,tokens/*}`.

**The one fact that governs everything below** — the cva the component invokes, verbatim from `dist/button-BNDWhAZb.js`:

```js
// base
"btn-pill tap-squish focus-ring whitespace-nowrap text-[length:var(--control-text)] font-medium
 cursor-pointer active:scale-(--scale-press-btn) disabled:pointer-events-none
 disabled:cursor-not-allowed disabled:opacity-disabled
 [&_svg:not([class*=size-])]:size-(--ui-glyph) [&_svg]:shrink-0 [&_svg]:pointer-events-none"

// variant.glass
"glass-wash btn-glass text-foreground
 hover:bg-(--glass-bg-resting) hover:border-(--glass-border-resting)
 active:bg-(--glass-bg-floating) active:border-(--glass-border-floating)
 aria-pressed:bg-[color-mix(in_srgb,var(--foreground)_10%,var(--glass-bg-resting))]"

// size.icon
"h-(--control-h-md) w-(--control-h-md) p-0"
```

So the rendered class list contains `btn-glass` — **not** `glass-btn`. Hold that distinction; §D-3 turns on it.

---

## §1 · Hitherto corpus — fold, not re-invent

| Source | What it already established | This challenge's relation |
|---|---|---|
| `fourier-analysis/docs/audits/runs/2026-06-16-M-deep-audit/A8-no-legacy-sweep.md:29` (A8-14, `medium`) | "dead component (zero consumers)… functionality subsumed by `DockIconButton`" → **DELETE outright** | **ADOPTED + ESCALATED** to BLOCKER (D-2); the reason is now uplift cost, not hygiene |
| same run, `raw-findings.json:2919,2968,2980` (DOCK-ACTIVE) | "`.is-active` is a dead class: a toggled button looks identical to an idle one… `CanvasOverlayButton.vue:7` even labels `.is-active` 'the legacy class'" | **ADOPTED AND SHARPENED** — D-3 supplies the mechanism the M-run asserted but did not locate (`btn-glass` ≠ `glass-btn`), and **PARTIALLY CONTRADICTS** the "looks identical to an idle one" half: on `<Button>` the `aria-pressed:` cva arm *does* paint. See D-3/D-6. |
| `2026-06-17-M-critique-audit/findings-index.txt:105,144` (CHR-26, A8-21) · `partial-prior-run.json:207-211` (A3-05) | plan STEP 2i (`DELETE CanvasOverlayButton.vue`) **skipped** on the executed branch | **ADOPTED** as the provenance for D-2's "5× ordered, 0× executed" |
| `fourier-analysis/docs/tranches/A/audit/W3-button-ledger.md:93` | "naked wrapper component forwarding `active` as `aria-pressed`; `<Button variant="glass" size="icon">` IS the surface" | **ADOPTED** — the A-tranche ledger already judged the wrapper redundant at authoring time |
| `.../formation/fourier/lane-frontend.md` §5 + `CENSUS-2026-08-03.md:102-104,185-186` | break surface = metric-badge ×7 files · hover-card/-popover ×4 · dock members ×3 · `ToastVariant` · lucide rename ×35 · tri-package deadlock | **CONTRADICTED BY OMISSION** — D-1 is a census gap: the `<Button>` prop-level break is absent from both, and it is ~4× the metric-badge surface |
| `.../audit/codex-provenance/intakes/lane-fourier-r3-r6.md` (38/52 TRUE) | R3/R6 registry-auditor provenance (`R3-1`..`R3-5`, `R3-HA-001`, …) | **NO OVERLAP.** Grep of that lane for `CanvasOverlay` / `is-active` / `Button` / `variant="glass"` → the only hit is the substring `DockIconButton` inside an unrelated row. This challenge asserts no claim that lane adjudicated; no row id applies. Recorded so the absence is a finding, not an oversight. |

---

## §2 · BLOCKERS

### D-1 · BLOCKER · The 4→7 uplift removes **both** props this component passes — and the census never counted it

**Claim.** `variant` and `size="icon"` are the component's only two configuration acts (lines 18–19). glass-ui 7.0.0 deletes **both** from `Button`'s API. Neither appears in the census break surface, because both prior instruments measured at the wrong granularity.

**Provenance.**

*Installed 4.0.0* — `dist/button-BNDWhAZb.js` props block: `{ variant, size, class, type, disabled, asChild, as }`; `size` accepts `default|xs|sm|lg|icon|icon-sm`; `variant` accepts 14 names including `glass`.

*Producer 7.0.0* — `/Users/mkbabb/Programming/glass-ui/src/components/button/Button.vue:15-31`:
```ts
export type ButtonEmphasis = "primary" | "secondary" | "quiet" | "text";
export type ButtonSize = Extract<Size, "xs" | "sm" | "md" | "lg">;   // ← no "icon"
export interface ButtonProps extends PrimitiveProps {
    emphasis?: ButtonEmphasis;   // ← "variant" is GONE
    tone?: Tone;
    size?: ButtonSize;
    iconOnly?: boolean;          // ← the icon register moved here
    loading?: boolean;
    ...
}
```

*Why the census missed it.* `lane-frontend.md` §5 measured an **export-map diff** (`node -e 'diff Object.keys(exports)'`, 14 added / 21 removed subpaths) plus **member-level** dock removals. `./button` survives in both maps — verified: `'./button' in exports` is `True` for 4.0.0 **and** 7.0.0. A subpath diff is structurally blind to a prop-level rewrite behind a surviving subpath. `lane-frontend.md:475` is the only `Button`-matching row in the break table and it is `DockIconButton`.

*Size of the omission* (measured in `/Users/mkbabb/Programming/fourier-analysis/web`):
```
grep -rn 'variant="glass"' src/ | wc -l   →  12 sites /  8 files
grep -rn 'size="icon"'    src/ | wc -l   →  38 sites / 21 files
grep -rn 'size="icon-sm"' src/ | wc -l   →   0
```
38 `size="icon"` sites is **5.4× the metric-badge surface** (7 files) the census *does* budget.

**The design consequence, not merely the typecheck one.** The two arms degrade *asymmetrically*:

- `size="icon"` → `size` is a **declared** prop with a closed union, so `"icon"` is a hard `vue-tsc` TS2322. Loud. Safe.
- `variant="glass"` → `variant` is **not declared** in 7.0.0, so it falls to `$attrs` and lands on the DOM as a literal `variant="glass"` attribute. `web/tsconfig.json` sets **no** `vueCompilerOptions.strictTemplates` (verified: `grep -rn "strictTemplates\|vueCompilerOptions" tsconfig*.json` → empty), and Volar's default `strictTemplates: false` tolerates unknown component props. **This break is silent.** Every one of the 12 sites will typecheck green, render a junk attribute, and quietly fall back to `emphasis: "secondary"` / `tone: "neutral"` — a *different surface tier* with no diagnostic anywhere.

**Also load-bearing at the a11y layer.** The WCAG 2.5.5 coarse-pointer floor is keyed to the reflected size attribute, and the key **changes**:

- 4.0.0 `dist/styles/utilities/a11y-overrides.css:110-122` — `@media (pointer: coarse) { [data-size="icon"] { min-block-size: var(--touch-target, 2.75rem); min-inline-size: … } }`, with the comment "Targets `Button size=\"icon\"` (via the `data-size=\"icon\"` attr Button.vue reflects)". Button reflects `"data-size": r.size` (`button-BNDWhAZb.js`). ✅ fires today.
- 7.0.0 `src/styles/utilities/responsive.css:3-8` — the same floor, re-keyed to `[data-control-target]`, which `Button.vue:89` sets as `:data-control-target="iconOnly ? '' : undefined"`.

⇒ A mechanical `size="icon"` → `size="md"` migration **silently drops the 44px touch floor on all 38 sites.** Only `size="md" icon-only` preserves it.

**Falsifier.** Any of: (a) a `variant` or a `size: "icon"` member in 7.0.0's `ButtonProps`; (b) a `./button` alias/back-compat shim in producer `src/components/button/index.ts`; (c) a row in `lane-frontend.md` §5 or `CENSUS-2026-08-03.md` naming the `Button` `variant`/`size` break; (d) `strictTemplates: true` reachable in fourier's vue-tsc config, which would make the `variant` arm loud rather than silent. Any one kills the corresponding limb.

---

### D-2 · BLOCKER · Five terminal `DELETE` verdicts, zero executions — the file is unreachable and has been for ~7 weeks

**Claim.** The component has **zero consumers**. Five independent adjudications issued a terminal `DELETE`; none executed. Design work on this file is spending the mega-tranche's budget on the wrong question.

**Provenance.** `grep -rn "CanvasOverlay" web/src/` → **empty** (only the file's own two self-references, at lines 5 and 21, both inside itself). The verdict trail:

| # | Where | Verdict |
|---|---|---|
| 1 | `docs/audits/runs/2026-06-16-M-deep-audit/A8-no-legacy-sweep.md:29` (A8-14) | "DELETE `web/src/components/visualization/CanvasOverlayButton.vue` outright" |
| 2 | `docs/tranches/M/M.md:141` | "dead component, 0 consumers — **DELETE** outright" |
| 3 | `docs/tranches/M/design/M-design-language.md:70` | same, restated in the design-language authority |
| 4 | `docs/tranches/M/design/M-bump-migration.md:56,70,199` | STEP `2i  DELETE CanvasOverlayButton.vue` |
| 5 | `docs/tranches/M/M-AMENDMENT-critique-hardening.md:34,54` | "**DELETE `CanvasOverlayButton.vue`** (dead) — pending" |

And the recorded miss: `2026-06-17-M-critique-audit/partial-prior-run.json:207-211` — "CanvasOverlayButton.vue **NOT deleted** — plan STEP 2i (dead-component removal) **skipped**"; `PROGRESS.md:16` lists it in M.W1's owed γ-residue.

**Why BLOCKER and not hygiene.** Three compounding reasons, all design-axis:

1. It is an **unreachable design surface that documents a false canon** (D-4) into the repository. Dead code that merely sits is cheap; dead code that *asserts a design rule* is a teaching artifact, and this one teaches the wrong rule to the 12 live `variant="glass"` sites.
2. Under D-1 it becomes **uplift work**: F.W1 must either migrate it (`variant`→`emphasis`, `size="icon"`→`iconOnly`) or delete it. Migrating a zero-consumer file is pure waste.
3. It is the **canary** for D-1. Its 2 props are exactly the 2 removed props. Whatever F.W1 does here is the template for 38 real sites.

**Falsifier.** A dynamic/string-keyed consumer (`:is=`, `defineAsyncComponent`, a `components` map, a route record, a test fixture, a Storybook story) resolving to this SFC. The M-run's own residual doubt (`raw-findings.json:1528`: "is it possible it was used in a dynamically-rendered path or via a string key?") is discharged here: `grep -rn "CanvasOverlay" /Users/mkbabb/Programming/fourier-analysis` across the **whole repo including docs, tests and specs** returns only audit-prose hits and the file itself. Produce a consumer of any kind → D-2 dies.

---

## §3 · MAJOR

### D-3 · MAJOR · `.is-active` is **inert** — and the mechanism is a one-word class-name transposition

**Claim.** Line 21 emits `is-active`. Nothing in the resolved stylesheet — neither glass-ui nor fourier — can match it on this element. The M-run asserted the deadness (`raw-findings.json:2968`: "`.dock-icon-button.is-active` has NO backing paint"); it did not locate *why* the `<Button>` case fails. Here it is.

**Provenance.** Every `.is-active` **rule** shipped by glass-ui 4.0.0 (`grep -rn "is-active" node_modules/@mkbabb/glass-ui/dist/`, CSS hits only):

| Rule | File:line | Matches this element? |
|---|---|---|
| `.glass-btn.is-active, .glass-btn[aria-pressed="true"]` | `glass/surfaces.css:111-112` | ❌ element carries **`btn-glass`**, not `glass-btn` |
| `.dock-icon-button:is(.is-active, .active, [aria-expanded="true"], [aria-pressed="true"])` | `dock-controls/icon-button.css:109` | ❌ not a dock control |
| `.is-active` (nested under dock triggers) | `dock-controls/triggers.css:100,106` | ❌ not a dock trigger |
| `.dock-layer-item-host.is-active`, `.dock-layer-group.vertical …` | `dock/layer-group.css:310,329` | ❌ not a dock layer |

`glass-btn` and `btn-glass` are **two different, deliberately distinct utilities** in the same file:
- `glass/surfaces.css:57` — `.glass-btn` = "the FIXED-square icon primitive (width/height: var(--size-icon-btn) + contain:paint)"; it owns the `.is-active` / `[aria-pressed="true"]` paint at :111.
- `glass/surfaces.css:182` — `.btn-glass { backdrop-filter: var(--glass-blur-btn); }` — a **blur re-point only** (AX.W52: "re-points the backdrop at `--glass-blur-btn`… so the glass button variants actually read as liquid glass"). It carries **no** state register.

The Button cva emits the latter. So the icon-button state paint at `surfaces.css:111` is one letter-order away and never fires.

fourier supplies no rescue: all 8 `.is-active` rules in `web/src` are `<style scoped>` and compound-prefixed — `.sidebar-link.is-active` (`PaperSidebar.vue:240`), `.easing-chip.is-active` (`EasingPicker.vue:84`), `.filter-toggle.is-active` (`GallerySearchBar.vue:159`), `.preset-pill.is-active` (`FunctionInput.vue:244`), `.eq-toggle-btn.is-active` (`EquationModeToggle.vue:63`), `.nav-dropdown-item.is-active` (`AppHeader.vue:340`), `.floating-toc-item.is-active` (`MobileFloatingToc.vue:371,376`). None matches a glass `<Button>`, and scoping would bar them anyway. The target SFC itself has **no `<style>` block** (25 lines, §0 — the file ends at `</template>`).

**Falsifier.** Produce a shipped or fourier-authored rule that matches `.is-active` on an element carrying `btn-pill tap-squish focus-ring glass-wash btn-glass` — i.e. a bare `.is-active { … }`, a `.btn-glass.is-active`, an unscoped fourier global, or a `@layer` rule reaching it. One such rule kills D-3.

---

### D-4 · MAJOR · The doc comment asserts a canon that does not exist, and contradicts itself inside one sentence

**Claim.** Lines 6–7 are false on both halves and mutually inconsistent.

> `surfaces the 'active' flag as both 'aria-pressed' and the legacy '.is-active' class, matching the glass-ui canon for toggle buttons.`

1. **Self-contradiction.** A class cannot be simultaneously "**legacy**" and "matching the **canon**". Those are antonyms in this codebase's own vocabulary. The sentence licenses the emission of a thing it concedes is obsolete.
2. **The canon claim is false for this component's family.** glass-ui 4.0.0's canon for a `<Button>` toggle is `aria-pressed` **alone** — the cva encodes `aria-pressed:bg-[color-mix(in_srgb,var(--foreground)_10%,var(--glass-bg-resting))]` on the `glass` variant, and on **all 14** variants (`button-BNDWhAZb.js`). There is no `.is-active` arm anywhere in the Button family. `.is-active` is the **dock** canon (`dock-controls/icon-button.css:109`) and the **`.glass-btn` icon-primitive** canon (`surfaces.css:111`) — two families this component is not in. The comment imports a rule across a family boundary and calls it universal.
3. **The provenance stamp is stale.** "A.W3.b" (line 3) refers to a tranche closed long before the 3.1.0→4.0.0 migration that rewrote the surrounding token vocabulary (`glass-subtle`→`glass-wash`, etc., per `lane-frontend.md` §5 prior-art). Nothing re-dated it.
4. **The forwarding claim is imprecise.** "Forwards **every** attr/listener" (line 5) is true only for undeclared attrs. `active` is *consumed* and never forwarded, and `variant`/`size` are set here — the sentence reads as a transparent pass-through when the component is in fact opinionated. See D-10 for the sharper consequence.

**Prose-quality verdict.** 6 lines of JSDoc carrying 1 stale stamp, 1 self-contradiction, 1 false universal, and 1 over-broad forwarding claim. Density of error per line here is higher than in the template.

**Falsifier.** Show `.is-active` in glass-ui's documented Button contract (`CHANGELOG.md`, `docs/precepts/`, `DESIGN.md`), or a Button-family CSS rule keyed to it. Either would make line 7 true and retire D-4.2.

---

### D-5 · MAJOR · An icon-only-button wrapper with **no accessible-name discipline**

**Claim.** The component's entire reason to exist is standardizing an icon toggle. It standardizes the decorative half (variant, size, pressed register) and omits the **mandatory** half: an icon-only control's accessible name.

**Provenance.** The props block is `{ active?: boolean }` (lines 11–13) — that is the whole API. There is no `label` prop, no `aria-label` default, no required-slot contract, no dev-mode warning. The rendered content is `<slot />` (line 23) and the base cva sets `[&_svg]:pointer-events-none` + `[&_svg:not([class*=size-])]:size-(--ui-glyph)` — i.e. the design explicitly anticipates a bare SVG child, which contributes **zero** accessible name. `size="icon"` sets `p-0` with no text affordance. Result: unless every consumer independently remembers `aria-label`, the control is announced as "button, toggle button, pressed" with **no name** — WCAG 4.1.2 Name/Role/Value failure.

Contrast the producer's own framing: glass-ui 7.0.0 `Button.vue:26` documents `iconOnly` as "*Square geometry for an accessibly named icon command*" — the naming duty is explicit and delegated. A wrapper interposed precisely to encode house rules is the correct place to **discharge** that duty, and it does not.

Aggravating: `aria-pressed` (line 20) makes the omission *worse*, not neutral. Adding a toggle role to an unnamed control produces a strictly more confusing SR announcement than a plain unnamed button, because the listener now knows a state changed but not of what.

**Falsifier.** A default `aria-label`, a required label prop, a `useId`-backed labelling contract, an ESLint/`vue-a11y` rule in fourier enforcing `aria-label` on this component, or a runtime dev warning. Also killed if glass-ui's `Button` injects a fallback name (it does not: `button-BNDWhAZb.js` sets only `data-slot`/`data-variant`/`data-size` + `type`/`disabled`).

---

### D-6 · MAJOR · The toggled state is signalled on **one channel only** — weaker than every sibling canon it invokes

**Claim.** Because D-3 kills the class arm, the *sole* surviving on-state signal is the cva's `aria-pressed:` background tint. That tint is single-channel, and materially quieter than the two canons the doc comment appeals to.

**Provenance — the three registers side by side:**

| Register | Channels changed | Source |
|---|---|---|
| **This component** (`Button variant="glass"` + `aria-pressed`) | **background only** — `color-mix(in srgb, var(--foreground) 10%, var(--glass-bg-resting))` | `button-BNDWhAZb.js`, variant `glass` |
| `.glass-btn` icon primitive | **background + border-color + color** — `--surface-tint-10`, `--surface-tint-25`, `--foreground` | `glass/surfaces.css:111-115` |
| Dock icon button | background + border + ink, via the shared four-state comma-group | `dock-controls/icon-button.css:109` |

The hover arm of the *same* variant changes **two** channels (`hover:bg-(--glass-bg-resting) hover:border-(--glass-border-resting)`). So on this control **hover is a louder signal than pressed** — a state-hierarchy inversion: the transient affordance out-shouts the persistent one. For a toggle whose whole job is to persist a binary, that is backwards.

The mix is 10% `--foreground` over `--glass-bg-resting`, where `--glass-bg-resting = color-mix(in srgb, var(--card) calc((1 - (1 - var(--glass-opacity-resting)) * var(--glass-level)) * 100%), transparent)` (`tokens/glass.css:139`) — a partially-transparent surface over an unknown backdrop.

**Status.** The structural claim (one channel; hover louder than pressed) is **static-decidable and asserted**. The perceptual claim (that a 10%-foreground bg shift over a translucent resting glass is at/below the just-noticeable threshold on fourier's canvas backdrops) is `UNPROVEN-NEEDS-LIVE` — it needs an SS-13 readback of the composited ΔL\* on a real `/visualize` backdrop in both arms.

**Falsifier.** A second channel on the pressed state reachable on this element — a shipped `aria-pressed` border/ink/outline rule matching `btn-glass`, a fourier global, or a `:has()`/`@layer` arm I did not enumerate. Also killed if the live ΔL\* readback lands comfortably above JND, which would retire the perceptual half while leaving the hierarchy-inversion half intact.

---

## §4 · MINOR

### D-7 · MINOR · `active?: boolean` is optional with no default — the toggle role vanishes when it is `undefined`

`defineProps<{ active?: boolean }>()` (lines 11–13) with no `withDefaults`. Vue removes an attribute bound to `undefined`/`null`; it renders `aria-pressed="false"` for `false`. So `active === undefined` ⇒ **no `aria-pressed` attribute at all** ⇒ the control is announced as a plain button, not an unpressed toggle. Any consumer whose flag arrives from an optional store field or an `undefined`-initialised ref silently loses toggle semantics — and, per D-3, has no visual state either, so nothing surfaces the loss. A control that *is* a toggle should always declare its state. `withDefaults(..., { active: false })` is the one-line cure.
**Falsifier.** Evidence that Vue omits `aria-pressed` for `false` too (it does not — `patchAttr` removes only on `value == null`), or a consumer contract guaranteeing `active` is always supplied (moot: zero consumers, D-2).

### D-8 · MINOR · Name and location promise specificity the implementation does not have

`CanvasOverlayButton`, filed under `components/visualization/`, contains nothing canvas-, overlay-, or visualization-specific: it is `<Button variant="glass" size="icon">` + a pressed register. It is a **`GlassIconToggle`**. The name blocks reuse by the 5 other `is-active`-toggle sites that need exactly this (`EasingPicker.vue:26`, `GallerySearchBar.vue:69`, `EquationModeToggle.vue:14,24`, `FunctionInput.vue:162`) — all of which hand-rolled their own instead, which is plausibly *why* the component ended up with zero consumers. A design-system wrapper named for one call site is a wrapper nobody else can find.
**Falsifier.** Canvas/overlay-specific behaviour in the file (there is none — §0 is the whole file), or a naming precept in fourier's design docs mandating call-site-scoped wrapper names.

### D-9 · MINOR (latent) · No `type="button"` — a form-submit hazard the wrapper is the right place to close

glass-ui 4.0.0's Button forwards `type: u.type` with **no default** (`button-BNDWhAZb.js`), and reka-ui's `Primitive` injects none (`node_modules/reka-ui/dist/Primitive/Primitive.js` — no `"button"` literal). A bare `<button>` inside a `<form>` defaults to `type="submit"`. An icon-toggle wrapper hardcoding `variant` and `size` should hardcode `type="button"` in the same breath; it does not.
**Currently latent only:** `grep -rn "<form" web/src/` → **empty**. Zero forms in fourier today. Recorded because the wrapper is meant to be reusable and this is the exact class of default a wrapper exists to fix.
**Uplift note — this one IMPROVES.** 7.0.0 `Button.vue:54` — `type: nativeButton.value ? (props.type ?? "button") : undefined`. The hazard is cured by default at 7.0.0. ✅
**Falsifier.** A `type` default in 4.0.0's Button or in reka-ui `Primitive`; or a fourier form appearing, which would promote this to MAJOR.

### D-10 · MINOR · The hardcoded `variant`/`size` are **not** invariants — attr fallthrough overrides them

The component's only design contribution is pinning `variant="glass" size="icon"`. Vue merges fallthrough attrs via `renderComponentRoot` → `cloneVNode(root, fallthroughAttrs)` → `mergeProps(vnode.props, extraProps)`, and `mergeProps` lets **later** arguments win for non-`class`/`style`/`onX` keys. Fallthrough is the later argument. So `<CanvasOverlayButton variant="outline" size="lg"/>` overrides both pins, and the wrapper's sole guarantee evaporates with no diagnostic. `class` is exempt (it merges), so `is-active` survives — but it is inert anyway (D-3). Enforcing the pin needs `inheritAttrs: false` + an explicit `v-bind="$attrs"` placed *before* the pinned props, or declaring `variant`/`size` as props and refusing them.
**Status** `UNPROVEN-NEEDS-LIVE` for the merge-order half.
**Falsifier.** Mount `<CanvasOverlayButton variant="outline"/>` and read the rendered class list: if it still carries `glass-wash btn-glass`, the template props won and D-10 dies.

### D-11 · MINOR · State coverage — no busy/loading register at all

Axis-mandated states: **empty** — n/a (slot-driven, no data). **error** — n/a. **loading/busy** — **absent**. A canvas-overlay toggle plausibly gates async work (publish, overlay-image load — cf. the sibling `CanvasControlsDock.vue:71` which threads a `publishing` flag through `is-active`, conflating "in flight" with "on"). This component offers no third state, so a consumer must either conflate it into `active` (as the dock does) or reach around the wrapper. 4.0.0's Button has no `loading` either, so the wrapper cannot delegate.
**Uplift note — this one IMPROVES.** 7.0.0 `Button.vue:28,38,90,92` ships `loading?: boolean` → `data-loading` + `aria-busy` + activation suppression via `interactionDisabled`. ✅
**Falsifier.** A busy/disabled affordance reachable through the current API without a second element.

---

## §5 · INFO (proportion, contrast, typography)

### D-12 · INFO · Glyph-to-box ratio is **0.40** — thin against the icon-button canon

`size="icon"` → box `--control-h-md = max(calc(2.5rem × --ui-scale), --control-floor)`; base cva → glyph `--ui-glyph = calc(1rem × --ui-scale)` (`tokens/offsets-sizing.css:149-152`; `--ui-glyph` per the same partial). Both ride `--ui-scale`, so the ratio is **scale-invariant at 1rem/2.5rem = 0.40** — desktop (16/40 px) and coarse alike (`--ui-scale: 1.5` → 24 px glyph in a `max(60, 44) = 60` px box, still 0.40). Aristotelian read: the conventional icon-button register sits at 0.50–0.60 (24-in-40, 20-in-40); 0.40 leaves a ~12px annulus of empty glass on every side and reads as an under-filled circle. **Credit where due:** the invariance is deliberate and good — one `--ui-scale` grows glyph and box in lockstep, so the proportion never *drifts*. The critique is the constant, not the mechanism. Affects all 38 `size="icon"` sites, not just this one.
**Falsifier.** A recorded ratio in glass-ui's `DESIGN.md` / `docs/precepts/` fixing 0.40 as the house register — that would make this an intentional signature, not a defect.

### D-13 · INFO · Focus-ring contrast computes to **≈1.93:1** — below WCAG 1.4.11's 3:1 — and the uplift does **not** fix it

The base cva carries `focus-ring` → `.focus-ring:focus-visible { outline: none; box-shadow: var(--focus-ring-shadow); }` (`utilities/base.css:174-178`). Token: `--focus-ring-shadow: 0 0 0 2px color-mix(in srgb, var(--ring) 30%, transparent), 0 0 8px color-mix(in srgb, var(--ring) 15%, transparent)` (`tokens/scale-paper.css:65-67`). Light arm: `--ring: hsl(24 10% 10%)` (`tokens/color-radius.css:102`) ≈ `rgb(28,25,23)`; `--background: var(--neutral-0) = hsl(40 30% 98%)` (`color-radius.css:40,57`) ≈ `rgb(251,249,248)`.

The 2px stop has zero blur/spread beyond the ring, so it composites against whatever is *behind* the button:
`0.30 × (28,25,23) + 0.70 × (251,249,248) = (184,182,180)` → relative luminance **0.469**; background luminance **0.950**. Contrast `(0.950+0.05)/(0.469+0.05)` = **1.93 : 1**. The second stop is an 8px blurred 15% glow and cannot rescue it.

**Not cured by the uplift.** 7.0.0 keeps the identical formula and values, merely renaming the input: `--focus-ring-shadow: 0 0 0 var(--focus-ring-width) color-mix(in srgb, var(--focus-ring-color) 30%, transparent)` (`src/styles/tokens/scale-paper.css:67-70`) with `--focus-ring-color: hsl(24 10% 10%)` / dark `hsl(48 10% 70%)` (`color-radius.css:160`, `dark-arm.css:115`) — same hues, same 30%.

**Status** the arithmetic is exact and static; the *applicability* is `UNPROVEN-NEEDS-LIVE` — an overlay button on fourier's canvas sits on a rendered backdrop, not `--background`, so the true adjacent colour must be read live (SS-13). A **glass-ui-level substrate** finding inherited here, not authored here.
**Falsifier.** A live readback showing the real adjacent surface pushes it ≥3:1; or a higher-specificity focus rule on `.btn-glass`/`.btn-pill` I did not find; or an accepted reading that SC 1.4.11 does not govern focus indicators (note the forced-colors arm at `a11y-overrides.css:80-95` *does* meet the bar via `outline: 2px solid Highlight` — see S-3).

### D-14 · INFO · fourier's root-font fork inflates every glass-ui control token 12.5% below 768px

`web/src/style.css:41-52` — `html { font-size: 1.125rem }`, reverting to `1rem` only at `≥768px`. glass-ui's whole control ladder is `rem`-denominated (`--control-h-*`, `--ui-glyph`, `--control-text`, `--touch-target: 2.75rem`), calibrated at a 16px root. Below 768px every one of them silently grows 12.5% — `--control-h-md` 40→45px, `--touch-target` 44→49.5px, `--ui-glyph` 16→18px. This *helps* touch targets and is arguably why the mobile read holds up, but it means the coarse `--ui-scale: 1.5` amplification (`tokens/light-dark.css:19`) compounds on top of an already-inflated base: 2.5rem × 1.5 at an 18px root = **67.5px**, not the 60px the token author computed. Recorded as an unbudgeted interaction between a fourier-local global and a glass-ui-global scalar — relevant to F.W1 because the 7.0.0 ladder will be re-tuned against a 16px assumption.
**Falsifier.** A `@theme`/`:root` re-normalisation in fourier that restores a 16px reference for the control tokens specifically (none found in `style.css`, 143 lines read whole).

---

## §6 · SUPERLATIVES (L-18 runs both ways)

### S-1 · SUPERLATIVE · The `aria-pressed` binding is the *correct* primitive — and, unknowingly, the only one that works

Line 20 is the single best decision in the file. Of the two idioms the component emits, `aria-pressed` is simultaneously (a) the semantically correct ARIA toggle contract, (b) the **only** one glass-ui 4.0.0's Button cva actually paints (`aria-pressed:bg-[…]` on all 14 variants), (c) the arm the `.glass-btn` primitive *also* honours (`surfaces.css:112` selects `[aria-pressed="true"]` alongside `.is-active`), and (d) the arm that **survives the 4→7 uplift untouched** — it is a DOM attribute, not a prop, so unlike `variant`/`size` (D-1) it needs no migration. The component chose the durable half of a two-idiom bet and hedged with the dead half.
**Falsifier.** Show `aria-pressed` unpainted at this element — i.e. that `@source "../*.js"` (`dist/styles/index.css:222`) fails to reach `dist/button-BNDWhAZb.js`, so the JIT never mints the utility. Verified reachable: the glob resolves to `dist/*.js` in the shipped context (the directive's own comment records the BA.W-EMISSION repair from the dead `../components` target), fourier imports that exact cascade file at `style.css:3`, and the arbitrary value's target token `--glass-bg-resting` is defined (`tokens/glass.css:139`). If a build readback shows the utility absent, S-1 collapses **and D-6 escalates to BLOCKER** — the toggle would then have no visual state whatsoever. This is the single highest-value live probe on this component.

### S-2 · SUPERLATIVE (inherited) · The WCAG 2.5.5 touch floor lands automatically, with no per-consumer `min-h-[44px]`

`size="icon"` reflects `data-size="icon"` (`button-BNDWhAZb.js`), which `a11y-overrides.css:110-122` keys the coarse-pointer 44px floor to — explicitly, by name, in its own comment. Combined with `--control-h-md: max(calc(2.5rem × --ui-scale), --control-floor)` and the coarse lift `--control-floor: var(--touch-target, 2.75rem)` (`tokens/light-dark.css:19-20`), the target is floored **twice, independently**. Belt-and-braces done properly: the `max()` clamp survives a consumer dialling `--ui-scale` below 1, and the `min-block-size` floor survives a component that never reads `--control-h-*`. Honest attribution: authored by glass-ui, inherited by this component — but the component *did* pick the one size value that trips it.
**Falsifier.** A rule of higher specificity setting a fixed `block-size` on this element (none found), or `data-size` failing to reflect. Note D-1 shows this superlative is **fragile across the uplift** — the key changes to `[data-control-target]`.

### S-3 · SUPERLATIVE (inherited) · Three independent a11y capability arms, all correct, all free

The component's class list buys, with no local code:
1. **prefers-reduced-motion** — `.tap-squish:active { scale: 1 }` under PRM (`utilities/base.css:273-278`), *plus* the blanket `transition-property: opacity, color, background-color, border-color, box-shadow !important` spatial kill (`a11y-overrides.css:6-17`), *plus* the deliberate override of the `[data-allow-motion]` carve ("*accessibility is absolute*", `a11y-overrides.css:19-30`). The press squish is neutralised via the `scale` **longhand identity**, not `transform: none` — the correct choice under individual-transform authoring, and one most codebases get wrong.
2. **forced-colors** — `.focus-ring:focus-visible { outline: 2px solid Highlight; outline-offset: 2px }` (`a11y-overrides.css:80-95`), restoring the box-shadow ring that WHC strips. The base cva emits `focus-ring`, so this fires. Notably this arm **passes** the contrast bar D-13 flags on the normal-mode arm.
3. **coarse-pointer comfort** — S-2.

That is a substrate a 25-line wrapper had to do nothing to earn, and it is the strongest argument that reaching for glass-ui at all was right.
**Falsifier.** Any of the three arms failing to match this element's class list — each was checked against the emitted `btn-pill tap-squish focus-ring … glass-wash btn-glass` string in §0.

### S-4 · SUPERLATIVE · Zero CSS debt — the file adds nothing to fourier's chronic override problem

25 lines, **no `<style>` block**, no scoped CSS, no `!important`, no `@utility` patch, no local token. Set against the same repo's chronic register — the `cartoon-card` shim behind a fourier-local `@utility` across 22 application sites, and the 7 `!important` hacks, both named as "the most chronic outstanding legacy debt" in `A8-no-legacy-sweep.md:8` — this component is the discipline the rest of the tree lacks. Its defects (D-1..D-14) are all *inherited or declarative*; none is an override fighting the design system. If D-2 resolves to migrate rather than delete, this is the cheapest file in `visualization/` to fix.
**Falsifier.** A `<style>` block or any CSS authored in the file — §0 is the file in full; it ends at `</template>` on line 25.

---

## §7 · Tally and disposition

| Sev | ids | n |
|---|---|---|
| BLOCKER | D-1, D-2 | 2 |
| MAJOR | D-3, D-4, D-5, D-6 | 4 |
| MINOR | D-7, D-8, D-9, D-10, D-11 | 5 |
| INFO | D-12, D-13, D-14 | 3 |
| **Defects total** | | **14** |
| SUPERLATIVE | S-1, S-2, S-3, S-4 | 4 |

**Recommended disposition — DELETE, and harvest D-1.** D-2 makes every other finding on this file moot: the correct action is the one five prior adjudications already ordered. But the file must not be deleted *quietly*, because **D-1 is the real yield** and this component is where it surfaced. Before `git rm`, F.W1 must fold into the census:

1. `Button.variant` **removed** at 7.0.0 (`emphasis`+`tone`) — **12 sites / 8 files**, and the break is **silent** under fourier's default `strictTemplates: false`.
2. `Button.size="icon"` **removed** at 7.0.0 (`iconOnly`) — **38 sites / 21 files**, a hard TS2322.
3. The WCAG 2.5.5 coarse floor **re-keys** `[data-size="icon"]` → `[data-control-target]`; a `size="icon"` → `size="md"` migration that omits `icon-only` **silently drops the 44px touch floor on all 38 sites**.
4. Prop-level API diffs on **surviving** subpaths are a blind spot of the export-map method used in `lane-frontend.md` §5. `./button` is one instance; the same method should be re-run member-wise across all 21 subpaths that survive 4.0.0→7.0.0.

**Highest-value live probe (SS-13), one line:** build `web/` and grep the emitted CSS for `aria-pressed`. Present ⇒ S-1 stands and D-6 is MAJOR. Absent ⇒ S-1 collapses and **D-6 escalates to BLOCKER for all 12 `variant="glass"` toggle sites**, not just this dead one.
