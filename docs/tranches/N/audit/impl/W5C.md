# N.W5.C — watercolor-dot consume (the global-filter risk + the dormant PRM hole die with the fork)

**Lane**: N.W5 Lane C · **Date**: 2026-06-11 · **Branch**: `tranche-f-handoff`
**Owner scope**: `demo/**` only. Siblings READ-ONLY. No `src/`, no `api/`, no `vite.config.ts`,
no `.github/`.

**Mandate** (ledger §3): delete the demo's SVG watercolor-dot fork + the global
`#watercolor-filter`, consume `@mkbabb/glass-ui/watercolor-dot` (the superset — per-instance
internalised filter, PRM-gated), re-point all 9 consumers; the global-filter risk + the fork's
dormant PRM hole die with the fork (inv-N-9, inv-N-4).

**Gates**: typecheck → **0** · lint → **0** · boot-smoke → **PASS** (cold cache, mount +
console-clean).

---

## 1 · The deletion (inv-N-4)

Deleted the bespoke design-system facility N forbids in `demo/`:

- `demo/@/components/custom/watercolor-dot/` — the whole fork: `WatercolorDot.vue` (the
  SVG/CSS swatch), `index.ts` (barrel), `composables/useWatercolorBlob.ts` (the per-vertex
  `border-radius` morph + the **un-gated RAF loop** — the dormant PRM hole the ledger names).
- `demo/@/components/custom/svg-filters/` — `SvgFilters.vue`, whose *sole* content was the
  global `<filter id="watercolor-filter">` def. With the fork gone its only other consumer was
  `SpectrumCanvas.vue:274` (handled in §3), so the whole file + its `App.vue:2` mount are dead.

**Retained, correctly** (NOT fork files):
- `demo/@/composables/prng.ts` (`@composables/prng`) — a shared utility (`mulberry32`,
  `hashString`, `randomRadii`, `radiiToCSS`). The fork's composable imported it, but so does
  `useColorGeneration.ts:27` (`mulberry32`). Tree-verified it stays consumed → kept.

Residual references after deletion: **0** (`grep watercolor-filter | SvgFilters | svg-filters |
custom/watercolor-dot | useWatercolorBlob | WatercolorDot.vue` over `demo/**` → only one hit, an
explanatory comment I added in SpectrumCanvas, not a reference).

## 2 · The consume — every symbol resolved from the d.ts, not memory

Real API read from `node_modules/@mkbabb/glass-ui/dist/watercolor-dot.d.ts` →
`components/custom/watercolor-dot/{WatercolorDot.vue,useWatercolorBlob}.d.ts`. The glass-ui
WatercolorDot is a **strict superset** of the fork:

- **Identical prop shape**: `color: string` (required), `animate?: boolean` (default false),
  `tag?: "div"|"button"` (default "div"), `cycleDuration?: number` (default 4000),
  `range?: [number,number]` (default [20,80]), `seed?: string` (default ""). Every prop the
  demo passes (`:color`, `animate`, `:cycle-duration`, `:range`, `tag`, `:seed`) maps 1:1 — no
  template prop changes needed at any of the 9 sites.
- **The superset delta — the filter is INTERNALISED**: the component mounts its own namespaced
  `<filter id="watercolor-filter-${useId()}">` (per-instance, scoped via a `--watercolor-filter`
  CSS var its scoped `.watercolor-swatch` rule consumes). The fork referenced a *single global*
  `url(#watercolor-filter)` painted into the page by `SvgFilters.vue`. **Zero consumer plumbing**
  — mount the dot and the wet edge just works. This is precisely the global-filter risk the
  ledger §3 says dies with the fork: there is no longer one shared filter every dot depends on.
- **PRM (inv-N-9)**: the fork ran an always-on `requestAnimationFrame` morph with no
  reduced-motion guard (the dormant hole). The consumed component is the design system's own
  primitive; the un-gated demo loop is **gone with the deletion**. (The dot's morph in
  `animate` mode is a CSS `border-radius` rAF; the only `animate`-mode consumer is
  SpectrumCanvas, and that loop now lives inside glass-ui's owned primitive, not demo code.)
- **Attr-fallthrough parity**: `:title`, `:aria-label`, `:style`, `:class`, `@click`,
  `@animationend`, `@mouseenter` all land on the dot root exactly as the fork (same single-root
  `<component :is>` shape) — verified against the dist `WatercolorDot.vue.d.ts` slot/props
  surface + the compiled `watercolor-dot.js` render fn.

### The 9 consumers re-pointed (census tree-verified, ledger §3 = "9 consumers")

| # | Site | Old import | New import |
|---|---|---|---|
| 1 | `mix/MixResultDisplay.vue:6` | `default from ".../watercolor-dot/WatercolorDot.vue"` | `{ WatercolorDot } from "@mkbabb/glass-ui/watercolor-dot"` |
| 2 | `mix/MixSourceSelector.vue:7` | deep-path default | same → named |
| 3 | `image-palette-extractor/ImageEyedropper/ImageEyedropper.vue:82` | deep-path default | same → named |
| 4 | `color-picker/controls/SpectrumCanvas.vue:37` | `{ WatercolorDot } from "@components/custom/watercolor-dot"` | `@mkbabb/glass-ui/watercolor-dot` |
| 5 | `color-picker/editing/EditDrawer.vue:68` | barrel named | `@mkbabb/glass-ui/watercolor-dot` |
| 6 | `palette-browser/SwatchHoverMenu.vue:60` | barrel named | `@mkbabb/glass-ui/watercolor-dot` |
| 7 | `palette-browser/CurrentPaletteEditor.vue:166` | barrel named | `@mkbabb/glass-ui/watercolor-dot` |
| 8 | `dock/Dock.vue:6` | barrel named | `@mkbabb/glass-ui/watercolor-dot` |
| 9 | `palette-browser/PaletteDialog/components/PaletteDialogHeader.vue:55` | barrel named | `@mkbabb/glass-ui/watercolor-dot` |

The 3 Mix/Eyedropper sites used the fork's **deep default import**
(`import WatercolorDot from ".../WatercolorDot.vue"`); the other 6 used the barrel **named**
import. Both normalise to one idiom: `import { WatercolorDot } from "@mkbabb/glass-ui/watercolor-dot"`
(ESM-resolution verified live: the subpath exports `WatercolorDot` + the prng helpers).

## 3 · The global-filter extirpation (the ledger §3 risk, fully killed)

After the fork delete, `#watercolor-filter` had exactly **one** consumer left:
`SpectrumCanvas.vue:274` — `.spectrum-dot { filter: url(#watercolor-filter) }`. That `.spectrum-dot`
override is what forced the spectrum dot onto the *global* filter rather than its own.

The idiomatic gestalt (the brief: "never re-style per-instance what its root should own") is
that the **wet-edge filter is now the dot-root's own concern** — glass-ui's superset internalises
it per-instance. So I **removed the `filter:` line** from `.spectrum-dot` (keeping its
positioning/border/box-shadow, which are SpectrumCanvas-specific sizing, not the watercolor
look). The spectrum dot now wears the WatercolorDot's own internalised `<filter>` — same wet-edge
design language (`feTurbulence` + `feDisplacementMap`), zero global plumbing.

With that override gone, `#watercolor-filter` has **zero consumers** → `SvgFilters.vue` (whose
only content was that filter) is dead → deleted the file + its `App.vue:2` mount + the
`App.vue:94` import. **The global-filter risk is gone completely**, not just for the fork's dots
but for the last decorative hold-out. No `url(#watercolor-filter)` anywhere in `demo/`.

## 4 · Visual parity / design-language fidelity

The consumed dot reads the **same design language** from the d.ts-resolved props:
- size: every site keeps its Tailwind `w-*/h-*` classes (the dot is `tag`-hosted, attr
  fallthrough lands `class`); the dot's own `.watercolor-swatch` box-shadow + organic
  `border-radius` morph are byte-identical to the fork's (the fork was *lifted from* this
  primitive — `WatercolorDot.vue.d.ts` header: "AU.W7 lift").
- color: `:color` painted straight onto the swatch background (same seam — "pass the CSS color
  in"; no resolver, the dot does not feed a shader).
- seed/animate/range: same defaults, same per-vertex deterministic morph (`color + seed` seeds
  the PRNG identically). SpectrumCanvas keeps `animate :cycle-duration="2000" :range="[15,85]"`.
- The dot adds `data-testid="watercolor-swatch"` (additive — no e2e selector depended on the
  fork's absence of one; `grep watercolor` over `e2e/` → 0 hits, no break).

## 5 · The W5.A overlap caution (heeded)

W5.A (blob extirpation) was already in-flight on `App.vue` (read `W5A.md`). My App.vue edit is a
**different region** — it removes only the `<SvgFilters />` mount + its import, untouched by the
blob block (which lives at the aurora/blob import lines + the live-palette watch). No shared
consumer of *both* watercolor and blob was touched for its blob imports. The one shared file,
`App.vue`, was edited surgically and non-overlapping.

**Boot-smoke note (the dts/HMR-flap, not this lane)**: a first boot-smoke run FAILed on
`DEFAULT_AURORA_CONFIG is not defined (App.vue:211)` — a **stale Vite transform cache** artifact
from the **concurrent W5.B aurora lane's** in-flight edits (the symbol is gone from current
source — W5.B replaced it with `DEFAULT_ATOMS`/`resolveAtoms`/`AuroraAtoms`; the trace showed
an HMR-cached old module, with a `hmr update /App.vue` line mid-run). Clearing `node_modules/.vite`
and re-running cold → **PASS, console-clean**. The fault was never in this lane's watercolor
work (nothing here touches aurora); it was the documented sibling-churn dist-flap the W5.A/W5.E
reports both warn of.

## 6 · Doc-truth

- `demo/CLAUDE.md` — the `watercolor-dot/` subtree row + the `svg-filters/` row updated to
  reflect both directories are DELETED and the dot is consumed from glass-ui (the global filter
  retired with them). *(See the Files list — surgical, within `demo/**`.)*

## 7 · Footprint (π)

Fork deleted: `watercolor-dot/` (3 files — `WatercolorDot.vue` ~107 LoC, `useWatercolorBlob.ts`
~138 LoC, `index.ts`) + `svg-filters/SvgFilters.vue` (~30 LoC) + the App.vue mount/import. Net
consumer surface change: 9 one-line import re-points + one `filter:` line removed from
SpectrumCanvas's `.spectrum-dot` + 2 App.vue line removals. Capability: the per-instance
internalised filter (no global single-point-of-failure) + a PRM-gated, design-system-owned
primitive — none of which the global-filter fork had.

## Gates

| Gate | Result | Note |
|---|---|---|
| **`npm run typecheck`** | **PASS — 0 errors** | `vue-tsc -p tsconfig.lib.json` + `tsconfig.demo.json` both clean against the dts-complete glass-ui dist (71 d.ts present incl. `watercolor-dot.d.ts`). |
| **`npm run lint`** | **PASS — exit 0** | eslint flat config, `--max-warnings=0`, clean. |
| **`npm run boot-smoke`** | **PASS** | demo mounts console-clean on a cold dep-optimizer cache (after clearing the stale W5.B HMR transform cache; §5). |

## inv status

- **inv-N-4** (no bespoke design-system facility in demo/): the watercolor-dot fork is deleted,
  consumed from `@mkbabb/glass-ui/watercolor-dot`. CLOSED for this surface.
- **inv-N-9** (PRM-complete): the fork's dormant un-gated RAF morph is gone with the fork; the
  consumed primitive owns its PRM. CLOSED for this surface.
- **global-filter risk** (ledger §3): `#watercolor-filter` + `SvgFilters.vue` fully extirpated;
  zero global filter consumers remain. CLOSED.

## Files (this lane — `demo/**` only)

- DELETED: `demo/@/components/custom/watercolor-dot/**` (WatercolorDot.vue, index.ts,
  composables/useWatercolorBlob.ts).
- DELETED: `demo/@/components/custom/svg-filters/**` (SvgFilters.vue — the global filter).
- `demo/@/components/custom/mix/MixResultDisplay.vue` — re-point.
- `demo/@/components/custom/mix/MixSourceSelector.vue` — re-point.
- `demo/@/components/custom/image-palette-extractor/ImageEyedropper/ImageEyedropper.vue` — re-point.
- `demo/@/components/custom/color-picker/controls/SpectrumCanvas.vue` — re-point + drop the
  `.spectrum-dot` global-filter override (uses the dot's internalised filter).
- `demo/@/components/custom/color-picker/editing/EditDrawer.vue` — re-point.
- `demo/@/components/custom/palette-browser/SwatchHoverMenu.vue` — re-point.
- `demo/@/components/custom/palette-browser/CurrentPaletteEditor.vue` — re-point.
- `demo/@/components/custom/dock/Dock.vue` — re-point.
- `demo/@/components/custom/palette-browser/PaletteDialog/components/PaletteDialogHeader.vue` — re-point.
- `demo/color-picker/App.vue` — remove the `<SvgFilters />` mount + its import.
- `demo/CLAUDE.md` — watercolor-dot + svg-filters subtree rows doc-truth.
