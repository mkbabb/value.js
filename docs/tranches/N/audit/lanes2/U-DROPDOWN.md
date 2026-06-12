# Lane U-DROPDOWN — U7 / U8 / U23 grounding + the glass-ui Select work-order

**Fleet**: second N-tranche deep-audit (lanes2). **Mode**: tranche-dev only (no code edited).
**Live app**: http://localhost:9000 (HEAD `199fd15` + 0.12.0; glass-ui resolved at **3.13.0**
via `node_modules/@mkbabb/glass-ui -> ../../../glass-ui` symlink, realpath
`/Users/mkbabb/Programming/glass-ui`).
**Evidence shot**: `docs/tranches/N/audit/lanes2/shots/u-dropdown-u8-colorspace-unbounded.png`
(live color-space dropdown overflowing the card + viewport).

The three findings are **one defect family with two roots**:
- **U8 + U23 share a single root**: glass-ui's collision-bound max-height class is authored but
  **never emitted into the consumer's CSS** (a glass-ui-owned `@source` breakage). The dropdown is
  therefore unbounded (U8); the open-zoom then animates an over-tall box and visibly sweeps (U23).
- **U7 is a second, smaller root**: glass-ui already unifies trigger+item type at one token
  (`--dropdown-text`); the demo *breaks* that parity by overriding only the trigger.

---

## U7 — trigger ↔ item font-size parity

### Live measurement (color-space dropdown, the U7 screenshot u07)
| Surface | Computed font-size (live) | Source of size |
|---|---|---|
| Trigger ("Lab") | **32.928px** italic, `Fraunces` | demo override `sm:text-display` |
| Items ("RGB"…) | **20.672px** (text span identical) | glass-ui default `--dropdown-text` |

Ratio 32.9 / 20.7 ≈ **1.59×** — the items shrink well below the trigger. The user's u07 (dock
view-select) shows the same family: trigger "Home" large/bold, listed items in plain weight at a
smaller rung. Dock trigger measured live = **16.4px** (`text-small font-display`, Plus Jakarta).

### Where glass-ui sets the sizes (the ROOT — both already point at one token)
- **Item size** — `glass-ui/src/components/ui/_shared/menuItemVariants.ts:37`: the shared CVA base
  carries `"text-dropdown"`. All 13 menu/picker item SFCs (SelectItem, DropdownMenuItem, …) compose
  this, so every item row reads the `--dropdown-text` rung in one place.
  `SelectItem.vue:29` applies `menuItemVariants(...)`.
- **Trigger size** — `glass-ui/src/components/ui/select/SelectTrigger.vue:47`: the base class string
  carries `"text-dropdown"` (the comment at `:32-37` is explicit: "the font … is W50's
  picker-family `--dropdown-text` bound, untouched here").
- **The token contract** — `glass-ui/src/styles/tokens/offsets-sizing.css:185-186`:
  > "Scale-contract … PRIMARY (`--dropdown-text`) → **item rows, triggers**, filter inputs, empties."

  And `:182-183`: "A consumer wanting the family LARGER … overrides `--dropdown-text` directly
  (e.g. `var(--type-body)`); the override re-resolves every family surface."
  Resolved live: `--dropdown-text` = `calc(clamp(0.875rem, 0.8rem + 0.25vw, 1.25rem) * 1)` (one
  fluid rung, read by BOTH trigger and item at the glass-ui root).

### So U7's defect is a CONSUMER override, not a glass-ui-root gap
`demo/@/components/custom/color-picker/display/ColorSpaceSelector.vue:17` sets the trigger to
`italic text-title sm:text-display` (hero scale, 32.9px) while leaving the items at the default
`text-dropdown` (20.7px) — `SelectItem` at `:24` only adds `text-prose`, which still resolves
smaller than the hero trigger. The demo broke the parity glass-ui guarantees; it did not inherit a
glass-ui bug.

### U7 work-order (the root fix the user is asking for — "items the SAME scaled size as the trigger")
The user wants an *audacious* trigger AND items that track it — i.e. scale the WHOLE picker family
together, not just the trigger. glass-ui already ships the lever; expose it as a first-class prop so
consumers stop hand-overriding the trigger and silently desyncing the items:

1. **glass-ui root** — add a `scale`/`display` size register to the Select family that overrides
   `--dropdown-text` on the **content root** (so trigger + items + labels re-resolve together), e.g.
   a `<Select size="display">` or a `--dropdown-text` set on `SelectContent`/`SelectTrigger` shared
   scope. Today only `SelectTrigger` has a `size` prop (`SelectTrigger.vue:11-13`) and it governs
   **height only** (`--control-h-sm/md`, `:35-37`), explicitly NOT the font. Extend it to a
   font-rung register that writes `--dropdown-text` for the whole family.
2. **demo consumer** — `ColorSpaceSelector.vue` drops the per-trigger `sm:text-display` hand-override
   and instead requests the audacious family rung via the new prop, so the option rows scale WITH the
   hero "Lab" label (and U31's "much larger, hero-like" numbers stay congruent).

This is a glass-ui-root authoring item (the prop) + a one-line demo consumer change.

---

## U8 — collision-bound + inner-scroll (the unbounded dropdown)

### Reproduced live (color-space dropdown, 16 items, 1440×900 viewport)
`SelectContent` computed at open:
- `class` (in DOM) DOES contain `[max-height:var(--reka-popper-available-height,60dvh)]` **and**
  `overflow-y-auto` (verbatim from `glass-ui/src/components/ui/select/SelectContent.vue:47`).
- reka computed the bound correctly: inline `--reka-popper-available-height: 608.640625px`.
- **But `getComputedStyle(content).maxHeight === "none"`.** The class is on the element, the rule is
  not in the cascade.
- Result: content `height` = **745px**, `bottom` = **1025px** vs `window.innerHeight` = **900px** →
  **overflows the viewport by 125px** (the "Adobe RGB" tail is clipped off-screen). `overflow-y: auto`
  is set but never triggers because the box is never clamped.

### Root cause — glass-ui's own `@source` points at a directory that does not exist in its dist
I scanned every loaded stylesheet on the live page:
```
backingRulePresent: { "max-height:var(--reka-popper-available-height": FALSE }   // ← NO rule
                    { "reka-select-trigger-height":  true }   // value-arbitrary utils DO emit
                    { "reka-select-trigger-width":   true }
                    { "reka-select-content-transform-origin": true }
```
**No CSS rule defining `max-height: var(--reka-popper-available-height,60dvh)` exists anywhere in the
demo's loaded CSS.** The class string is in the DOM `class` attr, but Tailwind never generated the
rule, so it no-ops — the textbook **P9 dependency-utility-scan failure** the constellation
grand-audit named (`MEMORY.md` / `constellation-grand-audit`).

The mechanism, traced to file:line:
- The demo imports glass-ui's Tailwind surface via `demo/@/styles/style.css:52`
  `@import "@mkbabb/glass-ui/styles"`, which resolves (package.json `exports["./styles"]`) to
  **`glass-ui/dist/styles/index.css`**.
- That file at **`glass-ui/dist/styles/index.css:160`** declares **`@source "../components";`** —
  intended to make Tailwind scan glass-ui's component class usage so glass-ui-internal arbitrary
  utilities get emitted into the consumer build.
- `@source "../components"` resolves relative to `dist/styles/` → **`glass-ui/dist/components/`**.
  That directory **does not exist**: `find dist/components` = **0 files** (0 `.vue`, 0 `.js`). The
  compiled components are bundled flat as `dist/*.js` (e.g. `dist/SelectScrollDownButton-CiDUxfEj.js`,
  which *does* contain the `reka-popper-available-height` string).
- So the `@source` glob scans a non-existent path; the arbitrary `[max-height:var(...)]` class — which
  lives ONLY in glass-ui source (`src/components/ui/select/SelectContent.vue`, never scanned) and in a
  flat `dist/*.js` bundle (not under `dist/components`, so never reached) — is **never extracted as a
  candidate → never compiled → dead at runtime**.

Why the OTHER reka arbitrary utilities (`origin-(--…)`, `h-(--…)`, `min-w-(--…)`) survive while THIS
one dies: those are *arbitrary-value-on-a-known-utility* forms whose base patterns also appear in
scanned DEMO source, so the JIT emits them; the failing one is a *fully-arbitrary property:value
bracket* `[max-height:var(--reka-popper-available-height,60dvh)]` — a unique string that appears
**only** in glass-ui's un-scanned source. It is the precise class that bounds the dropdown, and it is
the one that vanishes.

**Ownership: glass-ui-root.** The demo's own `@source` directives
(`demo/@/styles/style.css:60-61`) cover only the DEMO tree (`../../color-picker`, `../`) — they were
added at N.W2.B for the desktop `lg:flex` utilities and were NEVER meant to reach glass-ui's source.
glass-ui's own `@source "../components"` is the surface that is supposed to self-emit glass-ui's
internal arbitrary utilities, and it is broken in the published dist (wrong path). **Every
arbitrary-bracket utility glass-ui authors silently dies in every consumer** — the Select
max-height is just the one the user caught.

### The keyframes.js reference mechanism (the donor design — READ from kf source)
kf's easing-curve picker is **the same glass-ui Select primitive**, but kf bounds it from its OWN
(scanned) source, so kf's clamp works where the demo's dies:

- **`keyframes.js/demo/@/components/custom/EasingSelect.vue:29`**:
  ```html
  <SelectContent class="max-h-[var(--easing-dropdown-max-h)]">
  ```
  The clamp is an arbitrary class applied **on the consumer side**, living in kf's OWN demo source
  tree (which kf's Tailwind `@source` scans), so it **IS** emitted — unlike glass-ui's internal one.
- **`keyframes.js/demo/@/styles/design-idioms.css:113`** defines the token:
  ```css
  --easing-dropdown-max-h: min(24rem, 60dvh);   /* the cap; its 60dvh half is the reconciled unit */
  ```
- kf also uses `overflow-y-auto` from glass-ui's `SelectContent` base, so once the height is capped
  the long grouped easing list (dozens of curves across `EASING_GROUPS`) **scrolls inside the panel**
  instead of running off the page. The kf groups + separators
  (`EasingSelect.vue:30-83`, `SelectGroup`/`SelectLabel`/`SelectSeparator`) all live inside that one
  bounded, inner-scrolling content.

**kf's collision/scroll mechanism precisely**:
1. reka-ui's popper measures available space and writes `--reka-popper-available-height` inline
   (verified live: `608.640625px` on the demo's wrapper) and flips `data-side=top` when the bottom is
   short. This is the *collision detection* — it works on the demo too.
2. The content must then **consume** that variable via a real `max-height` rule. kf does this with a
   consumer-authored, self-scanned arbitrary class capped at `min(24rem, 60dvh)` (a *fixed* cap, not
   the reka var — simpler and viewport-relative).
3. `overflow-y-auto` on the bounded content turns the surplus into an **inner scroll**.

The donor lesson for value.js: bound on the consumer side with a self-scanned class (kf's approach)
**and/or** fix glass-ui's `@source` so its internal bound emits. The robust answer does both (below).

---

## U23 — the open-animation jerk

### Traced live (6-frame `requestAnimationFrame` sample of the color-space open)
- Content `animation-name: enter`, `animation-duration: 0.15s` (tw-animate `animate-in`).
- The animation is **`zoom-in-95` + `fade-in-0`**: a uniform 3D scale `matrix3d(0.95…)` → `1.0` with
  opacity `0 → 1`, sampled across the 6 frames (0.95→0.958→0.966→0.996→0.999→1, opacity 0→0.98).
- `transform-origin` resolves to **`50% 0px`** (center, top edge) — bound at
  `glass-ui/src/components/ui/select/SelectContent.vue:47` via `origin-(--reka-select-content-transform-origin)`,
  which reka aliases to `--reka-popper-transform-origin: 50% 0px` (inline on the wrapper).
- The `popover-animate` utility is defined at **`glass-ui/src/styles/utilities/animate.css:10-14`**:
  `data-[state=open]:animate-in … fade-in-0 … zoom-in-95`.

### What double-animates / why it jerks
The jerk is **not** two competing CSS animations on the same node — there is one `enter` animation.
The jerk is the **uniform `zoom-in-95` scale applied to an over-tall, unbounded box** (the U8 root):

- Because U8 leaves the content **745px tall** (no max-height), `zoom-in-95` scales the *entire* 745px
  column from 0.95→1.0 about a **top** origin. The bottom edge therefore travels
  `745px × 0.05 ≈ 37px` downward over 0.15s while the top barely moves — the long list visibly
  **shoots/sweeps downward** as it fades in. On a correctly-bounded ~600px panel the same zoom moves
  the bottom only `~30px` AND the panel would `data-side`-flip when short; unbounded, it can't flip
  and the full over-tall sweep is exposed.
- Secondary contributor: the demo trigger is visually **left-aligned** to a narrow hero label while
  glass-ui's `SelectContent` default is `align: 'center'` (`SelectContent.vue:23`), so the
  center-top scale origin (`50% 0`) does **not** sit over the trigger anchor — the panel scales about
  a point offset from where the eye expects it to grow, adding a slight lateral "settle." A
  short/bounded panel hides this; the tall one magnifies it.

**Therefore U23 is downstream of U8**: fix the max-height bound (panel becomes ~600px, inner-scrolls,
can flip side) and the `zoom-in-95` animates a small, stable, origin-anchored box — the sweep
disappears. The independent polish (align the scale origin to the anchor edge for off-center
triggers) is a small glass-ui-root refinement on top.

---

## The work-order spec — glass-ui Select/dropdown (ROOT, not per-consumer)

All items are **glass-ui-owned** unless tagged `[demo]`. Files are read-only here; cited file:line is
the binding site.

### WO-1 (U8 / U23 root) — make glass-ui's internal max-height bound actually emit
The collision bound is authored correctly at
`glass-ui/src/components/ui/select/SelectContent.vue:47`
(`[max-height:var(--reka-popper-available-height,60dvh)] overflow-y-auto`). It does not reach
consumers because `glass-ui/dist/styles/index.css:160` `@source "../components"` targets the
**non-existent** `dist/components/` directory. Fix at the glass-ui root, choose the robust path:

- **Primary (recommended)** — stop relying on consumer JIT for glass-ui's OWN structural utilities.
  Pre-compile the dropdown's bound into glass-ui's shipped `dist/styles/components.css` (a static
  rule, not a scan-dependent arbitrary class), OR replace the arbitrary bracket with a **named
  glass-ui `@utility`** (e.g. `dropdown-bound`) defined in glass-ui's source CSS so it is emitted
  with the rest of glass-ui's utility layer regardless of the consumer's `@source` reach. Structural
  bounds must never depend on the consumer scanning glass-ui's `.vue` source.
- **Also fix the broken `@source`** — point `@source` at the real distribution surface (where the
  class strings actually live: the flat `dist/*.js` bundles, or restore a `dist/components/` tree),
  so EVERY glass-ui-internal arbitrary utility (not just this one) self-emits. This closes the whole
  P9 class for glass-ui, satisfying value.js's **inv-N-7 (zero phantom classes)** and **inv-N-10
  (abrogation-truth: exports/utility diff at every cut)** structurally.
- Adopt the kf consumer-cap idiom as the donor pattern for the *default*: cap at `min(24rem, 60dvh)`
  (kf `design-idioms.css:113`) as a sane ceiling, then let reka's `--reka-popper-available-height`
  tighten it further when the viewport is short. The result is collision-bound **and** inner-scrolling
  on long lists (the 16-item color-space list, the dozens-of-curves easing list).
- **Acceptance**: open the color-space dropdown on a 900px-tall viewport →
  `getComputedStyle(content).maxHeight !== "none"`, `content.getBoundingClientRect().bottom <=
  innerHeight`, surplus scrolls inside. A backing CSS rule for the bound exists in the loaded
  stylesheet (the live probe used here flips to `true`).

### WO-2 (U23 polish, after WO-1) — origin-anchored open
With the panel bounded, keep the `enter` (`zoom-in-95`+`fade-in-0`, 0.15s) but ensure the scale
**origin tracks the anchor edge** for non-center-aligned triggers. Either honor reka's
`--reka-popper-transform-origin` faithfully (it already encodes the side) or document that audacious
left-aligned consumer triggers should pass `align="start"` so the `50% 0` origin sits over the label.
`popover-animate` (`glass-ui/src/styles/utilities/animate.css:10`) stays; only the origin/anchor
coherence is refined. **Acceptance**: the open no longer sweeps; the panel grows from the trigger
edge.

### WO-3 (U7 root) — one prop scales the whole picker family
glass-ui already binds trigger + item to one rung (`--dropdown-text`; offsets-sizing.css:185-186;
SelectTrigger.vue:47; menuItemVariants.ts:37). Add a **font-rung register** to the Select family
(extend `SelectTrigger`'s existing `size` prop — today height-only at `SelectTrigger.vue:35-37` —
into a `display`/`audacious` register that writes `--dropdown-text` on the shared Select scope, so
trigger AND items AND labels re-resolve together). This is the documented lever at
offsets-sizing.css:182 ("override `--dropdown-text` directly … re-resolves every family surface"),
promoted from a raw-token override to a first-class prop.
- **[demo]** `ColorSpaceSelector.vue:17` drops the bespoke `sm:text-display` trigger override and
  requests the audacious family rung via the new prop, so option rows scale WITH the hero "Lab"
  label. The dock view-select (`DockViewSelect.vue`) likewise rides one rung for trigger + items.
- **Acceptance**: trigger and item computed font-size sit on the same rung (or a documented
  proportional pair); the user's "items must be the SAME scaled font-size as the trigger" holds by
  construction, app-wide, from one glass-ui prop.

### Consumer audit (where the demo bends the glass-ui Select — for W6/W5 fix-up)
Both demo selects re-export glass-ui's Select verbatim
(`demo/@/components/ui/select/index.ts` = pure `export … from "@mkbabb/glass-ui"`), so the root fix
propagates to all of them:
- `demo/@/components/custom/color-picker/display/ColorSpaceSelector.vue` (U7/U8/U23 — the trigger
  override + the unbounded list).
- `demo/@/components/custom/dock/DockViewSelect.vue` (U7 dock-trigger/item rung; already adds
  `[&>span]:line-clamp-none` band-aids at `:54`).
- Other Select consumers verified present:
  `mix/MixConfigBar.vue`, `gradient/EasingSelector.vue`, `generate/GenerateControls.vue`,
  `panes/AuroraPane.vue`, `hero-lab/components/HeroControls.vue`.

---

## Cross-references for the tranche
- U8/U23 land in the **glass-ui-owned** dropdown-robustness item; the user's directive (LEDGER U8)
  explicitly says "FIRST-CLASS in glass-ui; study how the keyframes.js easing-curve picker dropdown
  does it and bring that mechanism" — donor = `EasingSelect.vue:29` + `design-idioms.css:113`.
- The `@source "../components"` breakage is the glass-ui half of the constellation **P9
  dependency-utility-scan gap** and feeds N **inv-N-7 / inv-N-10**; recommend an entry in the
  glass-ui tranche (BA) abrogation/dist-hygiene lane.
- U7 (the prop) is a glass-ui authoring item + a demo consumer simplification (fits N.W6 suffusion
  + the U30a/U31 "audacious dropdown / hero numbers" asks).
