# W3-7 — the `--view-hue-shift` sweep-tax retirement (the mechanism decision)

**Spec of record**: `docs/tranches/S/waves/S.W3.md` W3-7 · SYNTHESIS §3.5 W3-7 ·
`audit/lanes/design-dock-shell.md` P1-7 (the named mechanism flag).
**Nature**: SEQUENCED note. **The mechanism decision is recorded HERE (W3-7); the
CONSUME is W7-4** ("W7-4's JS-side per-view tokens", = design-dock-shell P1-4). Nothing
in style.css is edited at W3 — retiring the tax before the JS token replacement lands
would only turn the hue SWEEP into a SNAP (a visual regression), because the current
`--accent-view` derivation *depends on* `--view-hue-shift`.

---

## §1 — The tax, precisely (what P1-7 flagged)

`demo/@/styles/style.css`, `:root` block, three coupled declarations:

```css
@property --view-hue-shift {           /* registered, inherits: true, syntax "<number>" */
    syntax: "<number>";
    inherits: true;
    initial-value: 0;
}
:root {
    --view-hue-shift: 0;                                    /* App.vue writes this per view */
    --accent-view: oklch(from var(--accent-live) l c calc(h + var(--view-hue-shift)));
    --primary: var(--accent-view);
    transition: --view-hue-shift var(--duration-panel) var(--ease-standard);  /* ← the sweep */
}
```

App.vue writes `--view-hue-shift` (a `<number>` of degrees) on `documentElement` when the
view changes; the registered `@property` + the `:root` `transition` make that number
INTERPOLATE over `--duration-panel`, and because `--accent-view` (→ `--primary`, the glass
tint, focus ring, every accent consumer) derives from it via CSS relative color, the whole
interactive layer SWEEPS to the new view's hue.

**The cost** (P1-7, verified live): the transition sits on `:root` and the property is
`inherits: true`. Every frame of every view-switch sweep invalidates inherited
custom-property style on the WHOLE document — every `--accent-view` / `--primary` consumer
in the tree re-resolves each frame, not just the handful that actually paint the accent.
The design intent (hue sweeps on navigation) is right; the plumbing taxes the entire tree
to animate a value only a few elements read.

## §2 — The decision: how the tax retires once W7-4 lands

W7-4 lands the per-view accent as a **JS-side per-view token** (the accent is computed in
App.vue / the pipeline and written directly, no CSS relative-color intermediate). At that
point, retire the tax by the following mechanism (the ordered edit W7-4 consumes):

1. **Delete** the `:root { transition: --view-hue-shift … }` declaration — the
   inherited-property transition is the tax itself.
2. **Delete** the `@property --view-hue-shift` registration AND the
   `--accent-view: oklch(from … calc(h + var(--view-hue-shift)))` relative-color derivation.
   Both are vestigial once the accent is a resolved JS token; the `<number>`-on-`:root`
   registration (the thing that forces whole-tree recalc) goes with them.
3. **Delete** App.vue's `--view-hue-shift` writer watch
   (`watch(() => currentConfig.value.accentHueShift, deg => setProperty("--view-hue-shift", …))`);
   App now writes the per-view accent token W7-4 defines.
4. **Preserve the sweep** on the BOUNDED accent-painting surface — two admissible forms,
   W7-4 picks by how it lands the token:
   - **CSS-scoped (preferred if the token stays a CSS var).** Move the transition off
     `:root` onto the specific accent-painting scope, and transition the RESOLVED
     properties the browser interpolates natively (`color` / `background-color` /
     `border-color` — and, for the token itself, a `@property … syntax:"<color>"`
     registration that is NOT `inherits:true` on `:root`). The sweep animates only where
     the accent paints; no whole-tree inherited-property recalc.
   - **JS-native (preferred if W7-4 animates in JS).** The accent already rides an
     rAF-coalesced path in App.vue (W3-1 · `cssColorOpaqueFrame` → `safeAccentCss` →
     `--accent-live`). Fold the per-view hue turn into that same one-derive-per-frame
     interpolation (value.js `interpolate`/`lerp` over `--duration-panel`), writing the
     resolved per-view accent once per frame. No CSS transition, no `@property`, no
     inheritance tax at all — one token, written by the existing coalesced clock.

Either form eliminates the `:root`-inherited-property recalc while keeping the chromatic
navigation sweep the design wants — "the plumbing shouldn't tax the tree" (P1-7), realized.

## §3 — Sequencing contract (why NOT now)

- **W3 (here)**: decision recorded; style.css untouched. The tax persists as a KNOWN,
  on-record item — never a silent miss (§No-workaround).
- **W7-4**: lands the JS per-view token AND executes §2's ordered edit in the SAME wave
  (the token replacement and the tax deletion are one change — decoupling them would ship
  a hue SNAP in between). S.W3.md §Hand-off already binds this: "W7-4's per-view tokens
  retire the W3-7 tax."
- **S.W9 close**: re-verify the `:root` transition on `--view-hue-shift` is GONE and the
  sweep still reads (design) at the §6.2 view-switch budget (perf).
