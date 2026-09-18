# CHALLENGE-L — library structure · `demo/shell/dock/menus/ProfileSection.vue`

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, 1M-context variant) — the tier this seat
was explicitly spawned with. The declaration is honoured, not inherited.

Repository `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
Subject: `demo/shell/dock/menus/ProfileSection.vue` (181 lines, area `demo/shell`).

**Verdict: DEFECTIVE.** Ten findings, two BLOCKER. The premise handed to this seat — that the
library structure underneath this component is wrong — is confirmed by measurement, not by
argument. The component's single largest behaviour (the D6 two-referent certified-ink apparatus,
lines 22–31 plus a 10-line design comment) is **provably inert at runtime**, and the reason is a
library-boundary defect: value.js's demo maintains a private, now-stale replica of glass-ui's dock
paint model, reverse-engineered from glass-ui's internal DOM.

---

## 0 · The import graph, traced to its home

| # | specifier (`ProfileSection.vue`) | resolves to | verdict |
|---|---|---|---|
| L2 | `vue` | host `vue@3.5` | OK |
| L3–5 | `@lucide/vue` | devDependency `^1.16.0` | OK (demo is unpublished) |
| L6 | `@mkbabb/glass-ui/dock` | `dist/dock.js` (subpath export) | OK — the idiomatic edge |
| L7 | `../../../ui/button` | `demo/ui/button/index.ts` → `export { Button } from "@mkbabb/glass-ui"` | **L-3 DEFECT** — pure alias shim |
| L8 | `@mkbabb/glass-ui/dark` | `dist/dark.js` (subpath export) | OK |
| L9–12 | `../../../ui/dropdown-menu` | `demo/ui/dropdown-menu/index.ts` → root barrel | **L-3 DEFECT** |
| L13 | `../../../ui/avatar` | `demo/ui/avatar/index.ts` → root barrel | **L-3 DEFECT** |
| L14 | `../../../palettes/usePalettePorts` | `demo/palettes/usePalettePorts.ts` (275 L, 15 static imports) | **L-4 DEFECT** — shell → feature |
| L15 | `../../../color-session/useContrastSafeColor` | `demo/color-session/useContrastSafeColor.ts` (376 L) | carrier of **L-1**, **L-7**, **L-8** |

**Does it import `@mkbabb/value.js` correctly?** It imports it *not at all* — correct for a chrome
component. Its transitive reach into the library is `useContrastSafeColor → ink.ts →
@mkbabb/value.js/color` + `@mkbabb/value.js/css`, both **real published subpath keys** in
`package.json#exports`. No deep `src/` reach exists on this component's graph. That half of the
premise is **clean**; the published-surface defect is elsewhere (L-9).

---

## L-1 · BLOCKER — the live "chrome" probe is dead; value.js's demo owns a stale replica of glass-ui's dock paint

**Claim.** `ProfileSection` distinguishes two ink referents — `chrome` for the trigger on the dock
band, `floating` for the pill inside the popover (`ProfileSection.vue:28–31`, justified by a
10-line D6 comment at lines 22–27). **Both referents are the same number at runtime.** The
apparatus is inert.

**Mechanism.** `demo/color-session/useContrastSafeColor.ts:151–153`:

```ts
if (surface === "chrome") {
    const dock = document.querySelector<HTMLElement>(".glass-dock");
    if (dock) bg = getComputedStyle(dock).backgroundColor;
}
```

Measured live at `http://localhost:9000/#/` (Chromium, 1440×900), reproducing that exact code path
in-page:

```
dockBgRead:      "rgba(0, 0, 0, 0)"
liveChromeTint:  "undefined (LIVE PROBE DEAD -> static model)"
realPaintedBand: { selector: ".dock-plate", bg: "oklab(0.946496 0.00678277 0.0150976 / 0.808)" }
```

`.glass-dock` carries **no background-color at all**. glass-ui 7 paints the band on an
absolutely-positioned `z-index:-1` child —
`node_modules/@mkbabb/glass-ui/dist/components/dock/styles/dock.css`:

```css
.dock-plate { position: absolute; inset: 0; z-index: -1; …
  background: color-mix( in oklab, var(--glass-bg-dock, var(--glass-bg-resting)),
                         var(--glass-tint-source) var(--glass-tint-strength) ); … }
```

So `resolveCssColorAlpha("rgba(0,0,0,0)")` yields `alpha === 0`, `useContrastSafeColor.ts:217`
returns `undefined`, and the **static producer model** at `demo/color-session/ink.ts:118–122`
serves — permanently, silently, with no error and no failing test:

```ts
case "floating":
case "chrome": {                                   // ← ONE branch, two names
    const alpha = RUNG_ALPHA.floating[scheme];
    return alpha * FLOATING_TINT_L[scheme] + (1 - alpha) * ambientL;
}
```

`chrome` and `floating` are the *same case body*. Therefore `triggerInk === menuInk`, always.

**Magnitude of the model error.** Measured in dark scheme, live:

| quantity | measured | source |
|---|---|---|
| `--glass-bg-dock` (glass-ui's dedicated dock token) | `oklab(0.340251 … / **0.52**)` | live probe |
| `--glass-bg-floating` | `color(srgb … / **0.88**)` | live probe |
| real painted `.dock-plate` after tint mix | `color(srgb 0.384569 0.327254 0.277957 / **0.4544**)` | live probe |
| `ink.ts` model alpha for `"chrome"` | **0.88** (`RUNG_ALPHA.floating.dark`) | `ink.ts:31` |

**The demo models the dock band at α 0.88. The dock band is α 0.4544. Absolute error 0.4256 —
the model believes the band is ~94 % more opaque than it is.** glass-ui already publishes the
correct token, `--glass-bg-dock`; the demo's private model does not know it exists.

Composited-lightness error (computed against the local `dist/`, using the live measured ambients):

```
ambient L  light 0.6986   dark 0.1789
REAL band L light 0.8791  dark 0.3416
MODEL     L light 0.9397  dark 0.3251
ERROR       light +0.0606  dark -0.0165
```

**Consequence in delivered contrast.** Design target is `TEXT_CONTRAST_FLOOR + CERTIFY_HEADROOM`
= 4.5 + 1.25 = **5.75:1** (`ink.ts:15–17`). Measured, settled, against the real composited band:

| scheme | measured ratio | target | miss |
|---|---:|---:|---|
| light | **5.365** | 5.75 | −6.7 % (headroom breached; AA 4.5 still met) |
| dark | **8.259** | 5.75 | +43.6 % (accent voice crushed) |

**Reproduction.** Dev server live at `localhost:9000`; in DevTools console:
`getComputedStyle(document.querySelector('.glass-dock')).backgroundColor` → `"rgba(0, 0, 0, 0)"`.

**Root cause, stated as structure.** `demo/color-session/ink.ts` holds `RUNG_ALPHA`,
`FLOATING_TINT_L`, `CARD_L`, `PRODUCER_TINTS` — a hand-copy of glass-ui's material-ladder recipe —
and `useContrastSafeColor.ts` holds `TIER_BG_TOKEN` + `resolveLiveTint`, a scraper for glass-ui's
private class names and private CSS custom properties. **glass-ui owns the paint; therefore
glass-ui owns the composited lightness of each rung.** A consumer that re-derives it by
reverse-engineering the producer's DOM is structurally guaranteed to go stale on the producer's
next refactor — which is exactly what happened at Glass 7.

**Cure (architectural transposition, not a patch).** glass-ui exports one function from
`@mkbabb/glass-ui/tokens`:

```ts
export type GlassRung = "page" | "resting" | "floating" | "dock" | "well" | "veil";
/** The rung's composited OKLab L over the current ambient — resolved from the
 *  rung's OWN painted element and its own token, by the package that paints it. */
export function resolveRungLightness(rung: GlassRung, ambientL: number): number;
```

Then delete from value.js's demo: `ink.ts:24–36` (`PRODUCER_TINTS`, `RUNG_ALPHA`,
`FLOATING_TINT_L`, `WELL_FOREGROUND_FRACTION`), `ink.ts:93–127` (`resolveSurfaceLightness`),
`useContrastSafeColor.ts:50–54` (`TIER_BG_TOKEN`), `:80–221` (the whole canvas/probe instrument),
`:234–251` (`liveTintCache`). ~200 lines of demo code become one producer call. `ink.ts` keeps only
what is genuinely value.js's: `certifyAccentInk` / `resolveMutedInk` / `contrastInkFor` over
`safeAccentColor`. **This is mark M2 for the glass-ui BH relay** (E13 standing invariant), alongside
the existing M1 passive-`DarkModeToggle` ask.

---

## L-2 · BLOCKER — Dock feeds the *resting-certified* ink into a prop named `cssColorOpaque`

**Claim.** `ProfileSection`'s contract, in its own words (lines 22–27), is that it receives the raw
pick and certifies it per surface. It does not receive the raw pick.

`demo/shell/dock/Dock.vue`:

```ts
34: const cssColorOpaque = inject(CSS_COLOR_KEY)!;   // ← the raw opaque colour, right here
35: const safeAccent     = inject(SAFE_ACCENT_KEY)!; // ← certifyAccentInk(raw, RESTING)
…
220:  :css-color-opaque="safeAccent"                  // ← the WRONG one is passed
```

`SAFE_ACCENT_KEY` is `useContrastSafeColor`'s `safeAccentCss` — already
`certifyAccentInk(raw, resting)` (`useContrastSafeColor.ts:302–311`). `ProfileSection.vue:30–31`
then certifies **that** against `chrome`/`floating`. Two owners of one concept, composed in series,
with the naming lying about which is which. `MobileMenuDropdown.vue:24` inherits the same defect via
`Dock.vue:209`.

**Measured error of the composition.** Run against the local `dist/` build, ambient L 0.62, light
scheme, 5 probe colours (`certify(raw, chrome)` vs `certify(certify(raw, resting), chrome)`):

```
pick                  | DIRECT ratio | ACTUAL ratio
oklch(0.75 0.18 30)   |    5.751     |    7.262
oklch(0.62 0.22 260)  |    5.750     |    7.262
oklch(0.85 0.16 120)  |    5.752     |    7.262
oklch(0.5 0.2 340)    |    5.750     |    7.262
rgb(255 200 0)        |    5.750     |    7.269
```

The direct path lands the 5.75 target to three decimals. The shipped path over-certifies by
**+26.3 %** on every probe colour.

**And in the shipped state it is worse than that** — because L-1's model surface (L 0.9397) is
*lighter* than the real band (L 0.8791), the second certification short-circuits
(`ink.ts:138–142`) and returns its input unchanged. Measured live:

```
Login trigger computed color : "oklch(0.454991 0.15 30)"
--accent-live (root token)    : "oklch(45.499144080095% 0.15 30deg)"   ← byte-identical
```

The ink painted on the dock band is **exactly the resting-plate ink**. The surface-specific
certification — the entire stated purpose of `useSafeAccentFn(surface)` — never fires here.

**Reproduction.** `localhost:9000/#/`, DevTools console:
```js
getComputedStyle([...document.querySelectorAll('button')].find(b=>/Login|Profile/.test(b.textContent)))
  .color === getComputedStyle(document.documentElement).getPropertyValue('--accent-live').trim()
  .replace('45.499144080095%','0.454991').replace('deg','')   // → structurally equal
```

**Cure.** `Dock.vue:209,220` pass `cssColorOpaque`, not `safeAccent`. Better: `ProfileSection`
stops taking the colour as a prop at all and injects `CSS_COLOR_KEY` itself — it already injects
`SESSION_PORT_KEY`, so the prop is not buying decoupling. One referent enters, one certification
happens, at the surface that owns it.

---

## L-3 · MAJOR — `demo/ui/` is a 19-barrel pure-alias shim over glass-ui

Every file in `demo/ui/*/index.ts` is a bare re-export. In full:

```
demo/ui/button/index.ts        → export { Button } from "@mkbabb/glass-ui";
demo/ui/avatar/index.ts        → export { Avatar, AvatarImage, AvatarFallback } from "@mkbabb/glass-ui";
demo/ui/dropdown-menu/index.ts → export { DropdownMenu, …14 names } from "@mkbabb/glass-ui";
…19 directories, zero added behaviour…
```

Measured: **48 demo files** import through the shim; **79 demo files** import glass-ui directly
(37 root-barrel + 42 subpath specifiers across 17 subpaths). Two live paths to one component set —
a textbook dual path (edict 2) and a shadow shadcn namespace inside the demo when **glass-ui is the
design system** (edict 4).

Worse, the shims route through the *root barrel* even where glass-ui publishes a dedicated subpath.
Measured against `node_modules/@mkbabb/glass-ui/package.json#exports`:

```
SUBPATH-EXISTS: badge button card collapsible dialog dropdown-menu label
                popover select separator slider switch tooltip     (13)
no-subpath:     alert avatar checkbox input radio-group skeleton    (6)
```

`ProfileSection` therefore speaks **three different dialects of glass-ui in one file**:
subpath (`/dock`, `/dark`, lines 6+8), shim→root-barrel (`Button`, `DropdownMenu*`, lines 7+12),
shim→root-barrel-with-no-alternative (`Avatar`, line 13).

**Cure.** Delete `demo/ui/` whole. Rewrite the 48 consumers to the producer's own specifiers.
`ProfileSection` lines 7/12/13 become:

```ts
import { Button } from "@mkbabb/glass-ui/button";
import { DropdownMenu, … } from "@mkbabb/glass-ui/dropdown-menu";
import { Avatar, AvatarImage } from "@mkbabb/glass-ui";   // until glass-ui ships ./avatar
```

The six missing subpaths (`avatar`, `alert`, `checkbox`, `input`, `radio-group`, `skeleton`) are
**mark M3 for the glass-ui BH relay** — six one-line additions to its exports map close the last
root-barrel reach.

---

## L-4 · MAJOR — wrong direction of dependency: the shell imports a feature to learn who is logged in

`ProfileSection.vue:14` — `import { SESSION_PORT_KEY } from "../../../palettes/usePalettePorts";`

`demo/palettes/usePalettePorts.ts` is 275 lines that statically import **15** palette composables
(lines 4–18: `usePaletteStore`, `useBrowsePalettes`, `useAdminUsers`, `useColorNameQueue`,
`useSlugMigration`, `usePaletteActions`, `useFilteredList`, `useAdminAudit`, `useAdminFlagged`,
`useAdminTags`, `useVersionHistory`, `useTagEdit`, …). `ProfileSection` needs from it exactly one
`Symbol()` and one type.

The concept it needs is **session identity**, and identity's real implementation is *not* in
`palettes/` — `usePalettePorts.ts:5–7` imports it from elsewhere:

```ts
import { useAdminAuth } from "../platform/auth/useAdminAuth";
import { useUserAuth }  from "../platform/auth/useUserAuth";
import { useSession }   from "../platform/auth/useSession";
```

So `demo/platform/auth/` owns identity, `demo/palettes/` re-exports the key, and `demo/shell/`
imports the feature to reach the platform. Five shell files take this edge:

```
demo/shell/dock/Dock.vue:18
demo/shell/dock/DockViewSelect.vue:8
demo/shell/dock/layers/SlugEditLayer.vue:5
demo/shell/dock/menus/ProfileSection.vue:14
demo/shell/dock/menus/MobileMenuDropdown.vue:13
```

The shell is the application's chrome — the layer everything else sits inside. It must not depend
on a feature. Layering runs shell → platform → library; here it runs shell → feature → platform.

**Cure.** `SESSION_PORT_KEY` + `SessionPort` move to `demo/platform/auth/session-port.ts`.
`usePalettePorts` imports the key like every other consumer and `provide`s it. Zero behaviour
change; the edge inverts to shell → platform.

---

## L-5 · MAJOR — every demo import-boundary lint rule matches zero files

L-4 is unpoliced because the policing is dead. `eslint.config.js` carries four
`no-restricted-imports` objects; their file globs are:

```
demo/@/components/**   demo/@/lib/**   demo/@/composables/**   demo/color-picker/**
```

Measured:

```
GONE:   demo/@
GONE:   demo/@/components
GONE:   demo/@/lib
GONE:   demo/@/composables
EXISTS: demo/color-picker
```

`demo/@` was deleted by the W43 / RF-15 restructure (the tree is now `demo/{shell,palettes,
color-session,platform,picker,workbenches,scenes,ui,shared,styles}`). Three of the four objects
therefore match **no file at all**. The surviving object bans
`@components/custom/palette-browser/**/*.vue` — an alias with **0 occurrences in
`vite.config.ts`**, killed by the same restructure (`tsconfig.demo.json`'s one occurrence is a
comment recording the removal).

Confirmed clean run on the subject and its parent:

```
$ npx eslint demo/shell/dock/menus/ProfileSection.vue demo/shell/dock/Dock.vue
ESLINT-EXIT=0
```

Only `inv-K-1` (`src/**` must not import glass-ui) still enforces anything. **The demo module
lattice has no structural enforcement whatsoever.**

**Cure.** Re-express the bans against the *current* tree, as a layer rule rather than a path
blacklist — `demo/shell/**` may not import `demo/{palettes,workbenches,scenes,picker}/**`;
`demo/platform/**` may import nothing above itself; `demo/color-session/**` may not import
`demo/color-picker/**`. Four `no-restricted-imports` objects, glob-matched to directories that
exist.

---

## L-6 · MAJOR — two implementations of one menu, already drifted

`ProfileSection.vue` (desktop, `hidden lg:flex`) and `MobileMenuDropdown.vue` (mobile,
`lg:hidden`) are the same menu written twice. Measured with `difflib.SequenceMatcher` over
whitespace-stripped lines:

```
ProfileSection lines=181  MobileMenuDropdown lines=115
identical matched lines=88 => 76.5% of MobileMenuDropdown, 48.6% of ProfileSection

largest shared runs:
   28 lines  ProfileSection:154-181  Mobile:88-115   (@mbabb block, share row,
                                                      the 24-command GitHub SVG path,
                                                      the identical 6-line V-W44 comment)
   15 lines  ProfileSection:71-85    Mobile:46-60    (slug pill + 4 account rows)
    9 lines  ProfileSection:13-21    Mobile:12-20
    9 lines  ProfileSection:144-152  Mobile:79-87
    7 lines  ProfileSection:32-38    Mobile:25-31    (identical emits block)
    5 lines  ProfileSection:42-46    Mobile:33-37
```

`MobileMenuDropdown.vue:21–22` names the relationship outright: *"the desktop twin's cure,
verbatim (ProfileSection.vue)"*. Copy is not reuse, and the copies have **already diverged** — the
admin-identity state renders two different designs:

```
ProfileSection.vue:96      class="slug-pill … gold-shimmer"
                           style="border-color: var(--color-gold); color: var(--color-gold)"

MobileMenuDropdown.vue:67  class="slug-pill … text-muted-foreground"
                           style="border-color: var(--muted-foreground); color: var(--muted-foreground)"
```

Same application state, gold on desktop, grey on mobile. That is the dual-path failure mode
arriving on schedule.

(`.gold-shimmer` itself is correctly owned — it is a glass-ui utility,
`node_modules/@mkbabb/glass-ui/dist/styles/utilities/base-misc.css`. No edict-6 animation loss.)

**Cure.** One `DockAccountMenu.vue` owning the `DropdownMenuContent` (slug pill, the four account
rows, the @mbabb block, share, GitHub, dark-mode row) plus two thin trigger wrappers. 181 + 115
lines become roughly 130 + 25 + 20.

---

## L-7 · MINOR — the component constructs the ink instrument twice, and bumps a global cache epoch twice per mount

`ProfileSection.vue:28–29` calls `useSafeAccentFn` twice. Each call
(`useContrastSafeColor.ts:345–348`) performs `useGlobalDark()` + `inject(INK_AMBIENT_KEY)` +
`bumpProbeEpochOnMount()`. Line 43 then calls `useGlobalDark()` a third time.

`useGlobalDark` is harmless to repeat — it is a `createGlobalState` singleton
(`node_modules/@mkbabb/glass-ui/dist/dark-z_P5QwqI.js`: `var o, s = r(() => {…})`). But
`bumpProbeEpochOnMount` is not:

```ts
useContrastSafeColor.ts:68  const probeEpoch = ref(0);
                     :77    if (getCurrentInstance()) onMounted(() => probeEpoch.value++);
                     :239   const liveTintCache = new Map<InkSurface, TintCacheEntry>();
                     :245   if (hit && hit.darkClass === darkClass && hit.epoch === epoch) return hit.tint;
```

`probeEpoch` is a module-global mutable counter that is the **sole validity key** of a
module-global cache shared by every ink consumer in the app. ProfileSection alone registers two
`onMounted` hooks and invalidates every cached surface tint twice on its own mount — forcing full
`getComputedStyle` + canvas-readback re-probes for all consumers. There are 8 `useSafeAccentFn`
call sites plus `useContrastSafeColor`, `ConsoleRail.vue:133` and `useViewAccents.ts:89`; the epoch
has no owner and every consumer writes it.

Given L-1, the two instances ProfileSection builds are provably identical anyway.

**Cure.** After L-1 lands there is no probe, no epoch and no cache — this finding dissolves. Until
then: one `useSafeAccentFn` call, and the epoch bump belongs to the *boot writer* (one owner), not
to every consumer.

---

## L-8 · MINOR — `--accent-live` is a third home for the ink and desyncs across a scheme flip

Reproduction, driven through ProfileSection's own "Dark mode" row
(`ProfileSection.vue:167`, `@click="toggleDark()"`), sampling at +0 ms / +1 frame / +600 ms:

```
before    dark=false  ink=oklch(0.454991 0.15 30)     --accent-live=oklch(45.499144080095% 0.15 30deg)
immediate dark=false  ink=oklch(0.454991 0.15 30)     --accent-live=oklch(45.499144080095% 0.15 30deg)
nextFrame dark=true   ink=oklab(0.454991 0.129904 0.075)
                                                      --accent-live=oklch(45.499144080095% 0.15 30deg)
settled   dark=true   ink=oklch(0.848306 0.0831763 30) --accent-live=oklch(45.499144080095% 0.15 30deg)
```

At +600 ms the document is `.dark`, the rendered trigger ink has flipped to L 0.848, and
`--accent-live` still carries the **light-mode** value L 0.455 — ΔL 0.393. Everything styled off
`var(--accent-live)` (per `demo/styles/foundation.css:222`, `--primary` re-points onto it) paints
the light ink inside a dark document for that window. It reconverges seconds later, so this is a
transient, not a permanent, inconsistency — but it is two mirrors of one concept transiting
independently.

Contributing mechanism, and the one live MT-F009 residue:
`useContrastSafeColor.ts:242` keys cache validity on
`document.documentElement.classList.contains("dark")` — the DOM **effect** — while the recompute
that consumes it is driven by `isDark` — the **cause**. One concept, two signals, no ordering
guarantee between them.

**Correction to MT-F009 (stale as briefed).** The brief states "at least three parallel dark
stores plus a direct classList reader — five readers, no single owner." Measured on this tree:
**21 `useGlobalDark()` call sites, all resolving to one `createGlobalState` singleton**, and
**exactly one** direct classList reader (`useContrastSafeColor.ts:242`). The two `useDark` stores
named in the brief are already retired — `useMarkdownHighlighting.ts:68–80` and
`useMarkdownColors.ts:16–19` are *comments recording their removal*, not live code
(`grep -rn "useDark\b" demo/` returns only those two comment lines). MT-F009 should be re-scoped to
its single surviving instance.

---

## L-9 · INFO — `tsconfig.demo.json` `paths` is stale, self-contradicting, and entirely redundant

`package.json#exports` publishes **7** keys: `./color ./value ./css ./easing ./math ./transform
./quantize`. `tsconfig.demo.json` maps **8** and its comment calls them *"a CLOSED 8-key set"*:

| tsconfig `paths` key | target | on disk |
|---|---|---|
| `@mkbabb/value.js` | `./dist/index.d.ts` | **ABSENT** — and `"."` is not an export key at all |
| `@mkbabb/value.js/parsing` | `./dist/subpaths/parsing.d.ts` | **ABSENT** |
| `@mkbabb/value.js/units` | `./dist/subpaths/units.d.ts` | **ABSENT** |
| `/color /math /easing /transform /quantize` | present | OK (redundant) |
| `/css`, `/value` | **not mapped** | but they *are* published |

The whole block is dead weight. Measured with `tsc --traceResolution`, `@mkbabb/value.js/css` —
the specifier `ink.ts:8–11` uses, on this component's transitive graph — resolves through the
repo's own `package.json#exports` **self-reference**, never through `paths`:

```
======== Resolving module '@mkbabb/value.js/css' from '…/demo/color-session/ink.ts'. ========
Found 'package.json' at '/Users/mkbabb/Programming/value.js/package.json'.
Entering conditional exports.  Matched 'exports' condition 'types'.
======== …successfully resolved to '…/dist/subpaths/css.d.ts' ========
```

Two further stale claims in the same neighbourhood:

- `vite.config.ts:117–119` asserts *"glass-ui's published `dist/` imports the value.js core by the
  bare `@mkbabb/value.js` specifier (aurora/color paths, inv-K-2)"*. **Measured false**: zero bare
  imports; nine subpath imports —
  `grep -roh 'from "@mkbabb/value.js[^"]*"' node_modules/@mkbabb/glass-ui/dist/*.js` →
  `5 × /color, 3 × /css, 1 × /easing`. The bare-root alias the comment justifies cannot exist
  (`exports` has no `"."`), and nothing needs it.
- `node_modules/@mkbabb/value.js` is a **real directory, not a symlink** — a second, npm-installed
  copy of published 4.0.0 living inside the repo that builds it. `dist/subpaths/css.d.ts` local vs
  installed: **DIVERGENT** (12 490 vs 10 910 bytes), though the exported symbol lists are identical
  (`diff` of `export declare …` lines exits 0) — the delta is dts-bundler `_2` alias duplication.
  Harmless today because Vite's generated self-alias wins; a latent two-copy hazard nonetheless.

**Cure.** Delete the `@mkbabb/value.js*` entries from `tsconfig.demo.json#paths` entirely —
self-reference resolution already does the job and cannot drift from `exports`. Delete the stale
`vite.config.ts` prose. If the `.` root export is wanted, add it to `package.json#exports`; if not,
stop naming it anywhere.

---

## L-10 · INFO — the component is not a proof of the public API

`ProfileSection` writes no import a real consumer of `@mkbabb/value.js` could write — but it also
writes none a real consumer *would*. Its library reach is entirely transitive and entirely through
published subpaths. What it *does* falsely prove is the **demo's own** internal API: three imports
(`../../../ui/*`) and one (`../../../palettes/usePalettePorts`) work only because the demo shares
the repo layout. That is L-3 and L-4 restated; recorded here so the "false proof of the public
API" box is explicitly answered **NO for `src/`, YES for `demo/`**.

---

## The greenfield lattice

Structured today with no legacy, `demo/` is five strata; imports flow **down only**:

```
  ┌─ 5 · scenes/      routes, page composition                       (nothing imports it)
  ├─ 4 · workbenches/ gradient · mix · generate · extract · palettes  (features)
  ├─ 3 · shell/       dock · panes · router · view manager            (chrome)
  ├─ 2 · platform/    auth (+ session-port) · transport · storage     (app services)
  └─ 1 · color-session/ the colour spine: keys · ink · color-model    (pure, DOM-free)
         ↓
       @mkbabb/glass-ui  (design system — owns every rung's paint AND its lightness)
       @mkbabb/value.js  (colour maths — owns certification, never surfaces)
```

Concretely, for this component:

1. **`demo/ui/` does not exist.** Components come from `@mkbabb/glass-ui/<component>`. One dialect.
2. **`demo/platform/auth/session-port.ts`** owns `SESSION_PORT_KEY` + `SessionPort`. `shell` and
   `palettes` are both its consumers; neither is the other's.
3. **`demo/color-session/ink.ts`** is ~60 lines: `certifyAccentInk`, `resolveMutedInk`,
   `contrastInkFor`, over `@mkbabb/value.js/color`'s `safeAccentColor`. It contains **no model of
   any surface** and touches no DOM. The surface lightness arrives as a number from
   `@mkbabb/glass-ui/tokens#resolveRungLightness(rung, ambientL)`.
   `useContrastSafeColor.ts` shrinks from 376 lines to roughly 40, with no canvas, no
   `querySelector`, no global cache, no epoch.
4. **`demo/shell/dock/menus/DockAccountMenu.vue`** owns the menu content once;
   `ProfileSection.vue` and `MobileMenuDropdown.vue` become trigger wrappers (~25 lines each).
5. **The colour prop dies.** `DockAccountMenu` injects `CSS_COLOR_KEY` and calls
   `useSafeAccentFn(rung)` once per rung it actually paints. One raw colour in, one certification
   per surface, no series composition, no mis-named prop.
6. **Boundaries are lint-enforced against directories that exist** (L-5), so 2 and 3 cannot
   silently re-invert.

Net: −19 barrel files, −~330 lines of demo code, −1 duplicated menu, −1 dead probe instrument,
and the two BLOCKERs cease to be reachable states rather than being patched.

---

## Findings ledger

| id | severity | one line | evidence |
|---|---|---|---|
| L-1 | BLOCKER | live `chrome` probe dead → `triggerInk === menuInk`; demo models the dock band at α 0.88 vs real 0.4544 | `useContrastSafeColor.ts:151–153`, `:217`; `ink.ts:118–122`; live `.glass-dock` bg `rgba(0,0,0,0)`; glass-ui `dock.css .dock-plate`; ratios 5.365 / 8.259 vs 5.75 |
| L-2 | BLOCKER | `Dock.vue:220` passes resting-certified ink into the `cssColorOpaque` prop → double certification | `Dock.vue:34,35,220`; `ProfileSection.vue:30–31`; measured 7.262 vs 5.750 (+26.3 %) on 5 colours |
| L-3 | MAJOR | `demo/ui/` = 19 pure-alias barrels; 48 shim consumers vs 79 direct; 13 shims ignore a real glass-ui subpath | `demo/ui/*/index.ts`; `ProfileSection.vue:7,12,13`; glass-ui `exports` map |
| L-4 | MAJOR | shell → feature: 5 shell files reach `demo/palettes/usePalettePorts` for identity owned by `demo/platform/auth` | `ProfileSection.vue:14`; `usePalettePorts.ts:5–7,271`; 5 grep hits |
| L-5 | MAJOR | all demo import-boundary lint rules glob `demo/@/**`, which no longer exists → zero enforcement | `eslint.config.js` 4 objects; `demo/@` GONE; `eslint … ProfileSection.vue` exit 0 |
| L-6 | MAJOR | ProfileSection / MobileMenuDropdown = 88 identical lines (76.5 % of the mobile file), already drifted on the admin state | difflib run; `ProfileSection.vue:96` vs `MobileMenuDropdown.vue:67` |
| L-7 | MINOR | 2 × `useSafeAccentFn` → 2 `onMounted` epoch bumps invalidating a global tint cache app-wide | `ProfileSection.vue:28–29,43`; `useContrastSafeColor.ts:68–78,239–251,345–348` |
| L-8 | MINOR | `--accent-live` desyncs from the rendered ink across a scheme flip (ΔL 0.393 at +600 ms); one rogue classList scheme reader | live flip trace; `useContrastSafeColor.ts:242`; MT-F009 re-scoped |
| L-9 | INFO | `tsconfig.demo.json#paths` maps 8 keys for a 7-key `exports`; 3 targets absent, 2 exports unmapped; block wholly redundant | `tsc --traceResolution`; `ls dist/subpaths/`; `vite.config.ts:117–119` measured false |
| L-10 | INFO | component proves nothing about the public API; its repo-shape-dependent imports are demo-internal | restatement of L-3 / L-4 |

**Strongest defect: L-1.** It is the one that makes a documented, commented, deliberately-designed
behaviour a no-op in production without a single test noticing — and its cause is precisely the
premise this seat was given: a module boundary drawn in the wrong place, with the consumer owning
a model of the producer's internals.
