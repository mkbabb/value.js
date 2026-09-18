# Tranche V — Architecture

**V-A168 current-stage override:** Value4 and Keyframes6 are immutable, and Glass's registry-only pair install is proven. The active acyclic cut is W17a product-green strict/native Glass rehearsal → W33a nonterminal publication → W17b value consumer refresh/routed mount → W18–W32 → W33b final close. W18 follows W6; W29's before coordinate is immutable/reconstructible; a declined Q003 hypothesis cannot authorize corrupt bytes. Historical transport steps must not trigger a producer rebuild, workaround or held-archive install.

## 1. Physical demo tree

```text
demo/
  app/                  # entry, composition root, router, app shell
  public/
    prepaint-seed.js    # synchronous same-origin seed latch; no derivation copy
  shell/                # dock, boot shell, scene continuity; no renderer state
  color-session/        # active color/specimen, editing target, accent/ink and action context
  picker/               # picker model, controls, display, spectrum, hero specimen
  palettes/             # endpoints, DTOs, operation state, persistence, browse, inventory, admin
  workbenches/
    generate/
    extract/
    mix/
    gradient/
    easing/
  scenes/
    atmosphere/         # owns renderer/state and exposes one shell lifecycle adapter
    blob/               # owns renderer, morphology, configuration and material state
    about/
  platform/
    transport/          # generic HTTP transport only; no palette endpoints or DTOs
    auth/
    storage/
    workers/
  shared/
    ui/                  # only genuinely app-owned controls with 2+ consumers
    content/             # deliberately authored typed pedagogical snippets
  styles/
    foundation.css       # reset, tokens, global type/material primitives only
    shell.css
```

Route leaves live with their feature. There is no `panes/` dumping ground, `demo/@`, TS/Vite project alias, `@src`, or one-line glass-ui forwarding directory.

### Closed route inventory

The member router contains exactly eleven first-class product destinations: `/` Picker, `/palettes` Library, `/browse` Browse, `/extract` Extract, `/mix` Mix, `/generate` Generate, `/gradient` Gradient, `/easing` Easing, `/atmosphere` Atmosphere, `/blob` Blob, and `/about` About. Easing is a peer of Gradient, not a nested route miniature; About is a quiet trailing destination, not Picker's permanent right-hand companion. The five operational routes remain `/admin/users`, `/admin/names`, `/admin/audit`, `/admin/flagged`, and `/admin/tags`. Account is a Dock-opened Dialog and storage recovery is an inline `/palettes` state, so neither mints another route or main landmark.

W6 owns the feature-local lazy leaves; W19 owns route records, Dock reachability, title/H1 and transition settlement; W18 owns About's structural article; W27 owns both Gradient and Easing bodies. No forwarding route, hidden view-schema alias, query mode or compatibility redirect stands in for `/about` or `/easing`.

Import direction:

```text
app → shell / color-session / feature / platform / shared
shell → color-session / platform / shared
feature → color-session / own descendants / platform / shared / published packages
color-session → platform / shared / published packages
platform → shared / external packages
shared → external packages
```

Cross-feature internal imports are forbidden by construction. `color-session` is the explicit product domain shared by Picker, palettes, workbenches, shell and admin; it is not a generic bucket. Palette transport, DTO, cache and operation semantics stay in `palettes/`, while only generic auth/HTTP primitives live in platform. Atmosphere owns all renderer state and offers shell one lifecycle adapter. When two live consumers need another semantic object, it is promoted once; superficial similarity does not earn a shared home.

Styles colocate with their single owner. `foundation.css` retains only truly global reset, type, material, focus, and layout primitives. The current large stylesheet is not split for a line-count trophy: the shell block and feature-specific rules move; legitimate global CSS stays.

Frame-zero color has one pre-module bridge. `public/prepaint-seed.js` is an authored, same-origin classic script loaded synchronously in `<head>` after the critical ground CSS and before the app module. It contains no color-space or atom derivation: it resolves persisted/OS scheme, synchronously applies root `.dark` plus `colorScheme`, validates and selects strict numeric URL → versioned-storage → resolved-scheme-default tokens, and freezes the typed `window.__VALUE_GROUND_BOOT__` ready-or-invalid-default union. On ready it writes `--ground-seed`, and the critical CSS custom-property graph is the sole initial seed→seven-atom projection. On invalid default it exposes the static semantic configuration error and initializes no seed/atoms. Hydration consumes that exact union and, on ready, reads the computed atom tokens; it never re-runs precedence or replaces the first frame with a TS-derived twin. The old build injector, stop cache, embedded token placeholders, and duplicate initial derivation are deleted together.

## 2. Library DAG

The selected final-object model is:

```text
foundation/result + math
            ↓
color/model + color/space-schema
            ↓
color/conversions → color/operations
            ↓
value/model → value/operations
            ↓
css/grammar-composition
            ↓
css/stylesheet + css/timeline
```

### Color

`SpaceId` is the exact closed union below and `ChannelsBySpace` is an exhaustive mapping from every ID to its immutable channel tuple. One final `Color<S extends SpaceId>` holds `{space, channels: ChannelsBySpace[S], alpha}`; there is no string index signature, structural cross-realm cast, mutable channel facade, or per-space subclass. Every named factory requires all color channels, defaults only omitted alpha to numeric `1`, and returns `Result<Color<S>,ColorIssue>` rather than throwing or manufacturing a nominal instance. The sole missing-component sentinel is the cross-realm-stable string literal `"none"`: `Channel = number | "none"` and `Alpha = number | "none"`. `undefined`, `null`, `NaN`, infinities and optional color channels are invalid.

The following table is the complete 4.0 space contract. Numeric ranges are the physical coordinates used for in-range vectors; they are not a hidden gamut clamp. Except for Kelvin's defined 1000–40000 K domain, factories preserve finite out-of-range coordinates so `gamut:"raw"` remains observable, while every operation that clips/maps must receive its policy explicitly. A percentage maps linearly onto the stated range except OKLCH chroma, whose CSS percentage reference is 0.4 while finite numeric/raw chroma remains valid through 0.5. Hue `%` maps 0–100 to 0–360 degrees. Alpha accepts number 0–1 or 0–100%, is stored as number 0–1, emits `%` when present, and is omitted only when exactly numeric `1`.

| `SpaceId` | `ChannelsBySpace` physical coordinates; accepted units → canonical units | Named factory | Canonical CSS spelling / library display only | Total conversion anchor |
|---|---|---|---|---|
| `rgb` | `[r,g,b]`, each 0–255; number or 0–100% → bare number | `rgb(r,g,b,alpha=1)` | `rgb(r g b / α%)` | encoded sRGB ↔ linear sRGB ↔ XYZ D65 |
| `hsl` | `[h,s,l]`; h 0–360 number/deg/% → deg, s/l 0–1 number or 0–100% → % | `hsl(h,s,l,alpha=1)` | `hsl(hdeg s% l% / α%)` | HSL ↔ encoded sRGB ↔ XYZ D65 |
| `hsv` | `[h,s,v]`; h 0–360 number/deg/% → deg, s/v 0–1 number or 0–100% → % | `hsv(h,s,v,alpha=1)` | no CSS spelling; numeric library display `hsv(hdeg s% v% / α%)` only | HSV ↔ encoded sRGB ↔ XYZ D65 |
| `hwb` | `[h,w,b]`; h 0–360 number/deg/% → deg, w/b 0–1 number or 0–100% → % | `hwb(h,w,b,alpha=1)` | `hwb(hdeg w% b% / α%)` | HWB ↔ encoded sRGB ↔ XYZ D65 |
| `lab` | `[l,a,b]`; l 0–100 number/% → %, a/b −125–125 number or −100–100% → bare | `lab(l,a,b,alpha=1)` | `lab(l% a b / α%)` | Lab D50 ↔ XYZ D50 ↔ Bradford ↔ XYZ D65 |
| `lch` | `[l,c,h]`; l 0–100 number/% → %, c 0–150 number or 0–100% → bare, h 0–360 number/deg/% → deg | `lch(l,c,h,alpha=1)` | `lch(l% c hdeg / α%)` | LCH ↔ Lab D50 ↔ XYZ D50 ↔ Bradford ↔ XYZ D65 |
| `oklab` | `[l,a,b]`; l 0–1 number or 0–100% → %, a/b −0.4–0.4 number or −100–100% → bare | `oklab(l,a,b,alpha=1)` | `oklab(l% a b / α%)` | OKLab ↔ XYZ D65 |
| `oklch` | `[l,c,h]`; l 0–1 number or 0–100% → %, c numeric/raw 0–0.5 while 0–100% maps to 0–0.4 → bare, h 0–360 number/deg/% → deg | `oklch(l,c,h,alpha=1)` | `oklch(l% c hdeg / α%)` | OKLCH ↔ OKLab ↔ XYZ D65 |
| `xyz` | `[x,y,z]`, each reference 0–1; number or 0–100% → % | `xyz(x,y,z,alpha=1)` | `color(xyz x% y% z% / α%)`; parse `xyz-d65` to the same ID | identity XYZ D65 |
| `kelvin` | `[kelvin]`, 1000–40000; number/K → K | `kelvin(kelvin,alpha=1)` | no CSS spelling; numeric library display `kelvin(kelvinK / α%)` only | exact bounded piecewise coefficient formula below → encoded sRGB → XYZ D65; inverse is the integer nearest-curve argmin below |
| `srgb-linear` | `[r,g,b]`, each reference 0–1; number or 0–100% → bare | `linearSrgb(r,g,b,alpha=1)` | `color(srgb-linear r g b / α%)` | linear sRGB ↔ XYZ D65 |
| `display-p3` | `[r,g,b]`, each reference 0–1; number or 0–100% → bare | `displayP3(r,g,b,alpha=1)` | `color(display-p3 r g b / α%)` | encoded Display P3 ↔ XYZ D65 |
| `a98-rgb` | `[r,g,b]`, each reference 0–1; number or 0–100% → bare | `a98Rgb(r,g,b,alpha=1)` | `color(a98-rgb r g b / α%)` | encoded Adobe RGB 1998 ↔ XYZ D65 |
| `prophoto-rgb` | `[r,g,b]`, each reference 0–1; number or 0–100% → bare | `prophotoRgb(r,g,b,alpha=1)` | `color(prophoto-rgb r g b / α%)` | encoded ProPhoto RGB ↔ XYZ D50 ↔ frozen D50/D65 Bradford pair ↔ XYZ D65 |
| `rec2020` | `[r,g,b]`, each reference 0–1; number or 0–100% → bare | `rec2020(r,g,b,alpha=1)` | `color(rec2020 r g b / α%)` | encoded Rec.2020 under the sign-extended BT.1886 gamma-2.4 transfer—not PQ—↔ XYZ D65 |
| `ictcp` | `[i,ct,cp]`; i 0–1 number/% → bare, ct/cp −0.5–0.5 number or −100–100% → bare | `ictcp(i,ct,cp,alpha=1)` | no CSS spelling; numeric library display `ictcp(i ct cp / α%)` only | BT.2100 PQ ICtCp ↔ relative XYZ D65, media white Y=1 |
| `jzazbz` | `[jz,az,bz]`; jz 0–0.222 number or 0–100% → bare, az/bz −0.5–0.5 number or −100–100% → bare | `jzazbz(jz,az,bz,alpha=1)` | no CSS spelling; numeric library display `jzazbz(jz az bz / α%)` only | Safdar Jzazbz ↔ absolute XYZ D65 at 203 cd/m² media white ↔ relative XYZ D65 |

Only the thirteen CSS-native rows carry a canonical `parseCssColor`→`serializeCssColor` round trip. The `hsv`, `kelvin`, `ictcp` and `jzazbz` numeric library displays above are specification notation only: `/css` rejects those spellings, no parser/serializer round trip exists for them, and a caller must explicitly convert the object to a chosen `CssColor` before serialization.

`SPACE_SCHEMA` freezes unit normalization as conversion math, not parser folklore. An `rgb` source channel enters the encoded-sRGB transfer as `channel/255`, and XYZ egress stores `255·encoded`; percentages first denormalize to the same 0–255 physical coordinate. HSL/HSV/HWB hue enters cylindrical math as `h/360`; finite hue egress is `360·(((turn % 1)+1)%1)` and therefore lies in `[0,360)`, except that a powerless hue emits `"none"` under the law below. No converter may consume the 0–255 or degree coordinate as though it were already normalized.

The two wide-gamut definitions that were previously name-only are exact. For ProPhoto encoded `E` and linear `L`, with sign applied after the positive-arm calculation, decode is `|E| <= 1/32 ? |E|/16 : |E|^1.8`—equality takes the linear arm—and encode is `|L| < 1/512 ? 16|L| : |L|^(1/1.8)`—equality takes the power arm. Its row-major linear-RGB→XYZ-D50 matrix is `[0.7977666449006423,0.13518129740053308,0.0313477341283922; 0.2880748288194013,0.711835234241873,0.00008993693872564; 0,0,0.8251046025104601]`; the frozen inverse is `[1.34578688164715854,-0.255572087379794644,-0.0511018649755452734; -0.544630705124901970,1.50824774284514707,0.0205274474364214067; 0,0,1.21196754563894560]`. XYZ-D50→D65 is `[0.95547342148807501,-0.023098454948764641,0.063259243200570692; -0.028369709333863888,1.0099953980813041,0.021041441191917334; 0.012314014864481979,-0.020507649298898967,1.3303659262421239]`; XYZ-D65→D50 is `[1.0479297925449969,0.022946870601609652,-0.05019226628920524; 0.02962780877005599,0.9904344267538799,-0.017073799063418826; -0.009243040646204504,0.015055191490298152,0.7518742814281371]`. Neither inverse is recomputed from production constants.

Rec.2020 uses the sign-extended BT.1886 gamma-2.4 transfer: `decode(E)=sign(E)·|E|^2.4` and `encode(L)=sign(L)·|L|^(1/2.4)`. Its row-major linear-RGB→XYZ-D65 matrix is `[0.6369580483012914,0.14461690358620832,0.1688809751641721; 0.2627002120112671,0.6779980715188708,0.05930171646986196; 0,0.028072693049087428,1.0609850577107909]`; the frozen inverse is `[1.7166511879712671,-0.35567078377639227,-0.25336628137365974; -0.66668435183248909,1.6164812366349393,0.015768545813911149; 0.017639857445310866,-0.042770613257808537,0.94210312123547368]`. Positive, zero and negative vectors freeze the exponent and sign extension; PQ and the piecewise BT.2020 OETF are absent.

Kelvin's forward curve is equally frozen rather than named by approximation. For input `k`, let `t=clamp(k,1000,40000)/100` and `clip8(x)=min(255,max(0,x))`. The encoded-sRGB byte coordinates are `r8 = t<=66 ? 255 : clip8(329.698727446·(t−60)^−0.1332047592)`, `g8 = t<=66 ? clip8(99.4708025861·ln(t)−161.1195681661) : clip8(288.1221695283·(t−60)^−0.0755148492)`, and `b8 = t>=66 ? 255 : t<=19 ? 0 : clip8(138.5177312231·ln(t−10)−305.0447927307)`. Divide each by 255, then apply the one frozen encoded-sRGB transfer and RGB→XYZ-D65 matrix above; no byte rounding occurs on this path. Independent literal XYZ vectors are: `1000→[0.433013017923913,0.253883443187417,0.026204891601576]`, `1900→[0.494583049878115,0.377023507095822,0.046728235586310]`, `1901→[0.494653884873520,0.377165177086631,0.046751847251445]`, `6500→[0.939743393712359,0.991183300791134,1.046611106615018]`, `6600→[0.950455927051671,1.000000000000000,1.089057750759878]`, `6601→[0.939795347751710,0.978678841400077,1.085504224326558]`, and `40000→[0.483949485032096,0.487827321567982,1.014770379940695]`, each at `5e-12`. Thus every branch, clamp, discontinuity and coefficient bites independently before the inverse searches the resulting curve.

The type authorities are literal and exhaustive:

```ts
type SpaceId =
  | "rgb" | "hsl" | "hsv" | "hwb" | "lab" | "lch" | "oklab"
  | "oklch" | "xyz" | "kelvin" | "srgb-linear" | "display-p3"
  | "a98-rgb" | "prophoto-rgb" | "rec2020" | "ictcp" | "jzazbz";
type Channel = number | "none";
type Alpha = number | "none";
type ChannelsBySpace = {
  rgb: readonly [r:Channel,g:Channel,b:Channel];
  hsl: readonly [h:Channel,s:Channel,l:Channel];
  hsv: readonly [h:Channel,s:Channel,v:Channel];
  hwb: readonly [h:Channel,w:Channel,b:Channel];
  lab: readonly [l:Channel,a:Channel,b:Channel];
  lch: readonly [l:Channel,c:Channel,h:Channel];
  oklab: readonly [l:Channel,a:Channel,b:Channel];
  oklch: readonly [l:Channel,c:Channel,h:Channel];
  xyz: readonly [x:Channel,y:Channel,z:Channel];
  kelvin: readonly [kelvin:Channel];
  "srgb-linear": readonly [r:Channel,g:Channel,b:Channel];
  "display-p3": readonly [r:Channel,g:Channel,b:Channel];
  "a98-rgb": readonly [r:Channel,g:Channel,b:Channel];
  "prophoto-rgb": readonly [r:Channel,g:Channel,b:Channel];
  rec2020: readonly [r:Channel,g:Channel,b:Channel];
  ictcp: readonly [i:Channel,ct:Channel,cp:Channel];
  jzazbz: readonly [jz:Channel,az:Channel,bz:Channel];
};
type Color<S extends SpaceId> = Readonly<{
  space: S;
  channels: ChannelsBySpace[S];
  alpha: Alpha;
}>;
```

`SPACE_SCHEMA satisfies Record<SpaceId, SpaceSchema>` is the one authority for tuple keys, physical ranges, normalization, accepted/canonical units, factory identity, syntax family and anchor pair. `CONVERSION_ANCHORS satisfies Record<SpaceId,{toXYZ,fromXYZ}>` is statically assembled and total. The public `convertColor` returns a typed color result and every conversion uses that one anchor graph; public raw helpers and direct pairwise bypasses are absent. All 17×17 ordered conversions are therefore defined without a late registry.

The public `/color` contract is final-object-only and exact. `AnyColor` preserves the space/channel discriminant, every operation reports invalid/missing/non-finite input through `Result`, and hue at the public boundary is always degrees:

```ts
type Result<T, E> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly error: E };
type AnyColor = { [S in SpaceId]: Color<S> }[SpaceId];
type RgbGamut = "srgb" | "display-p3" | "a98-rgb" | "prophoto-rgb" | "rec2020";
type HueInterpolationMethod = "shorter" | "longer" | "increasing" | "decreasing";

function rgb(r: Channel, g: Channel, b: Channel, alpha?: Alpha): Result<Color<"rgb">, ColorIssue>;
function oklch(l: Channel, c: Channel, h: Channel, alpha?: Alpha): Result<Color<"oklch">, ColorIssue>;
function convertColor<S extends SpaceId>(color: AnyColor, space: S): Result<Color<S>, ColorIssue>;
function mixColors<S extends SpaceId>(
  from: AnyColor,
  to: AnyColor,
  progress: number,
  options: { readonly space: S; readonly hue?: HueInterpolationMethod },
): Result<Color<S>, ColorIssue>;
function mapColorToGamut<S extends SpaceId>(
  color: Color<S>,
  target: RgbGamut,
): Result<Color<S>, ColorIssue>;
function safeAccentColor(
  accent: AnyColor,
  surface: AnyColor,
  options: { readonly minimumRatio: number; readonly gamut: RgbGamut },
): Result<Color<"oklch">, ColorIssue>;
function interpolateHue(
  fromDegrees: number,
  toDegrees: number,
  progress: number,
  method?: HueInterpolationMethod,
): Result<number, ColorIssue>;
```

The other fifteen named factories have the same failure-explicit factory shape as `rgb`/`oklch`. `convertColor` is raw by definition: it never clips or maps, so no option can imply that it does. `mixColors` follows CSS Color 4 premultiplied-alpha interpolation in its named space and rejects progress outside `[0,1]`. `mapColorToGamut` returns the source-space color after mapping to the named RGB gamut and guarantees that reconversion to that gamut is in range; no consumer epsilon loop follows it. `safeAccentColor` requires two opaque, finite colors. It keeps the accent hue, maps each candidate into the requested gamut, searches the lower and upper OKLCH-lightness intervals for the nearest candidate meeting the requested WCAG ratio against the actual surface, chooses the smaller absolute lightness displacement (darker on an exact tie), and returns `contrast_unreachable` if neither interval can meet the ratio. No background-lightness proxy, `minContrast * 0.1`, guessed warm surface, CSS fallback, under-floor success or empty-string success exists. `interpolateHue` consumes and returns physical degrees, normalizes its result to `[0,360)`, defaults to `shorter`, and reports non-finite inputs; normalized turns are private conversion math. Old `RGBColor`/`OKLCHColor` classes, structural `Color` lookalikes, raw OKLab/OKLCH transforms, public pairwise conversion primitives, `color2`, identity-on-error operations and their aliases are deleted rather than forwarded.

One ordinary `ANCHOR_ORACLE satisfies Record<SpaceId,AnchorOracleRow>` fixture is the independent authority; it is test data, not a second runtime registry or framework. Every row contains literal `source`, literal `expectedXyzD65`, literal `xyzD65`, literal `expectedSource`, tolerances and exactly one class. The fixture may import the public functions and types under test, but no production schema, conversion constant, matrix, generated inverse or direct path; no expected coordinate is computed at test time. Classes are closed: `bijective` is exactly `rgb|lab|oklab|xyz|srgb-linear|display-p3|a98-rgb|prophoto-rgb|rec2020|ictcp|jzazbz`; `hue-degenerate` is exactly `hsl|hsv|hwb|lch|oklch`; `lossy-kelvin` is exactly `kelvin`. Bijective and chromatic hue-degenerate rows compare both literal directions independently; a self-round-trip or agreement between two production paths is never independent evidence.

The fixture's required off-axis literal corpus is below. For every row, `source` is also the independent `expectedSource` for the listed `xyzD65`; the table's XYZ tuple is independently copied as both `expectedXyzD65` and `xyzD65`, never derived in the test. Tolerances apply per coordinate.

| Space | Literal source / expected source | Literal XYZ D65 / expected XYZ D65 | Tolerance |
|---|---|---|---|
| `rgb` | `[51,102,153]` | `[0.118655305792428,0.125059256092527,0.319266107173931]` | `5e-12` |
| `hsl` | `[210,0.5,0.4]` | `[0.118655305792428,0.125059256092527,0.319266107173931]` | `5e-12` |
| `hsv` | `[210,0.666666666666667,0.6]` | `[0.118655305792428,0.125059256092527,0.319266107173931]` | `5e-12` |
| `hwb` | `[210,0.2,0.4]` | `[0.118655305792428,0.125059256092527,0.319266107173931]` | `5e-12` |
| `lab` | `[41.520823927408273,-4.573089932636027,-33.494194592438951]` | `[0.118655305792428,0.125059256092527,0.319266107173931]` | `5e-10` |
| `lch` | `[41.520823927408273,33.804943764605554,262.225262078801393]` | `[0.118655305792428,0.125059256092527,0.319266107173931]` | `5e-10` |
| `oklab` | `[0.499314455845208,-0.033043487605947,-0.092966592064777]` | `[0.118655305792428,0.125059256092527,0.319266107173931]` | `5e-10` |
| `oklch` | `[0.499314455845208,0.098664377124183,250.433057420175430]` | `[0.118655305792428,0.125059256092527,0.319266107173931]` | `5e-10` |
| `xyz` | `[0.118655305792428,0.125059256092527,0.319266107173931]` | `[0.118655305792428,0.125059256092527,0.319266107173931]` | `1e-15` |
| `kelvin` | `[6500]` | `[0.939743393712359,0.991183300791134,1.046611106615018]` | XYZ `5e-10`; inverse `1 K` |
| `srgb-linear` | `[0.25,0.5,0.75]` | `[0.417250460809805,0.464888327372306,0.777329208763456]` | `5e-12` |
| `display-p3` | `[0.25,0.5,0.75]` | `[0.185191446424396,0.201138953801658,0.555139553598780]` | `5e-12` |
| `a98-rgb` | `[0.25,0.5,0.75]` | `[0.167731664285196,0.190703689213077,0.543242011509365]` | `5e-12` |
| `prophoto-rgb` | `[0.25,0.5,0.75]` | `[0.143626568507974,0.237359627237413,0.650856733596718]` | `5e-12` |
| `rec2020` | `[0.25,0.5,0.75]` | `[0.134934199419380,0.167618043984836,0.537251004042137]` | `5e-12` |
| `ictcp` | `[0.4278802843622844,-0.11570435976969046,0.27872894737532694]` | `[0.41239079926595934,0.21263900587151027,0.01933081871559182]` | `5e-9` |
| `jzazbz` | `[0.13438473104350065,0.1178852626079724,0.11187810901317233]` | `[0.41239079926595934,0.21263900587151027,0.01933081871559182]` | `5e-9` |

Missing components have no numeric fallback. Same-space construction preserves `"none"` in every one of the 17 final objects; parsing and canonical CSS serialization preserve it byte-for-byte only for the CSS-native `CssColor` subset fixed below. A conversion with a missing non-hue channel returns `color_missing_channel`; so does hue `"none"` outside the exact powerless predicates. Hue `"none"` is accepted by conversion and emitted by inverse conversion only when derived chroma is powerless: HSL `s·(1−|2l−1|)=0`, HSV `s·v=0`, HWB `w+b>=1`, LCH `c<=0.0015`, and OKLCH `c<=0.000004`. On those arms the result is mathematically hue-independent and no numeric hue is substituted; just-below/equal/just-above threshold vectors prevent an epsilon drift. Alpha-independent conversion carries alpha `"none"`; opacity/compositing requiring it returns `color_missing_alpha`. Mixing/interpolation must first resolve the same powerless/missing law and otherwise returns the named typed issue. `/css` never emits the library-only `hsv`, `kelvin`, `ictcp` or `jzazbz` functions: a caller first uses `convertColor` to choose a CSS-native `CssColor`, then calls `serializeCssColor`. There is no general library-string serializer, implicit output-space choice or browser/WAAPI fallback; unresolved nonpowerless `"none"` returns its typed issue.

Kelvin alone is lossy. `fromXYZ` returns the integer `argmin k∈{1000,…,40000}` of `(X-Xk)^2+(Y-Yk)^2+(Z-Zk)^2`, where `(Xk,Yk,Zk)=toXYZ(kelvin(k))` under the exact coefficient formula above; both endpoints participate and an exact tie chooses the lower `k`. Alpha passes unchanged. Non-finite XYZ returns the typed non-finite issue before search. An implementation may optimize the search, but must equal the exhaustive integer oracle; Kelvin is never admitted to a bijective round-trip assertion.

`/color` also owns the sole final Color→byte projection:

```ts
type RGBA8 = readonly [r:number,g:number,b:number,a:number];
function toRgba8(
  color: AnyColor,
  options: {readonly gamut:"clip"},
): Result<RGBA8,ColorIssue>;
```

`toRgba8` requires a fully numeric color, converts through the authoritative anchors to extended encoded sRGB, and applies the explicitly requested terminal `clip` to `[0,1]`; because the transfer is monotone, this is equivalent at the 0/1 boundaries to clipping linear sRGB before encoding. Each encoded channel and straight, non-premultiplied alpha is quantized as `roundHalfEven(255·x)`. Missing channels/alpha and non-finite values return their typed issues; no zero substitution, generic `Math.round`, palette-local matrix/transfer path or canvas authority exists. W8 proves all 17 spaces plus channel boundaries, half-even ties, alpha, chromatic, achromatic and out-of-gamut vectors.

Conversion, normalization, gamut, difference, mixing, interpolation, and CSS serialization are free functions that depend downward. CSS color syntax is a `/css` grammar object, not a partially formed `Color`. Ordinary parameterized tests cover every one of the 17 schema rows' factory/object minimum, maximum, percentage denormalization, alpha default, alpha `"none"`, channel `"none"`, out-of-range raw preservation and literal bidirectional conversion oracle. The thirteen CSS-native rows additionally carry canonical `parseCssColor`→`serializeCssColor` round trips; the four library-only rows prove explicit conversion to a chosen `CssColor` before serialization and prove their library spellings are rejected by `/css`. A generated 17×17 matrix covers finite numeric conversion tolerances through the one anchor graph. Born-RED additions are off-axis RGB/hue scale vectors; below/equal/above positive and negative ProPhoto `1/32`/`1/512` decode/encode vectors; positive/zero/negative Rec.2020 gamma-2.4 vectors; below/equal/above each powerless predicate; and Kelvin on-curve, off-curve, both endpoints and exact lower-tie vectors. These are product tests, not a new meta gate.

### Values and animation carriers

Focused final immutable `CssScalar`, `CssCall`, and `CssList` objects own CSS value identity and serialization-friendly structure. They define unit compatibility, identity padding, cloning-as-value, browser-resolution provenance, and color carriage. They do not own DOM elements, layout caches, browser epochs, parser registration, or frame mutation.

`/value` exposes one pure semantic predicate, `isLayoutTrackingUnit(unit: string): boolean`. Its closed table returns true for `%`, `var`, `calc`, the viewport families `vh|vw|vmin|vmax|vi|vb`, every `sv*|lv*|dv*` counterpart, and `cqw|cqh|cqi|cqb|cqmin|cqmax`; it returns false for unitless, absolute, angle, time and font-relative units. The table is private to value.js—consumers receive classification, not another list to copy. It imports no browser code.

Keyframes owns the separate mutable `InterpSlot` used by its structure-of-arrays hot loop. Compilation projects each immutable final CSS value into stable slots once and builds its authored-shape sinks once. A numeric sink writes a bare number without allocation; unit/color/list sinks serialize through the slot's formatter. Group composition owns compatible composite slots rather than converting through a boxed value shape. Thus emission, custom-transform application and group output project slots directly without nominal `instanceof` dependence; `plain-vars.ts`, `PlainProjection`, `_plainProj`, array-boxed `ValueUnit` leaves and an authored-plain `unflatten` API all disappear. Slot identity, clone behavior, projection and allocation lifetime are keyframes concerns. There is no compatibility wrapper that makes immutable values pretend to be mutable `ValueUnit`s.

### Parsing

`ParseResult<T> = {readonly ok:true;readonly value:T;readonly diagnostics:readonly []} | {readonly ok:false;readonly diagnostics:readonly [ParseIssue,...ParseIssue[]]}` is the only parse-failure protocol: success diagnostics are exactly the readonly empty tuple and failure diagnostics are readonly and nonempty. Issues carry UTF-16 source spans, expected/actual, and stable codes. Full-consumption is explicit. `CssColorSpace` is exactly the thirteen CSS-native final spaces—`rgb|hsl|hwb|lab|lch|oklab|oklch|xyz|srgb-linear|display-p3|a98-rgb|prophoto-rgb|rec2020`—and `CssColor` is their discriminated `Color<S>` union. `/css` owns `parseCssColor(source: string): ParseResult<CssColor>`, `serializeCssColor(color: CssColor): Result<string,ColorIssue>`, and `parseTimingFunction(source: string): ParseResult<CssTimingFunction>`; `/color` owns neither parser nor serializer, and no library-wide string serializer exists. `parseCssColor` accepts only context-free concrete CSS color text: the four library spellings plus `var()`, `currentColor`, system colors, relative colors and other context-dependent forms return a nonempty diagnostic—`color_context_required` for context-required forms—never a partial Color or substitute. The timing parser freezes the successful AST as this closed union:

```ts
type CssTimingFunction =
  | { kind: "keyword"; name: "linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out" }
  | { kind: "cubic-bezier"; x1: number; y1: number; x2: number; y2: number }
  | { kind: "steps"; count: number; position: "jump-start" | "jump-end" | "jump-none" | "jump-both" }
  | { kind: "linear-function"; stops: readonly CssLinearStop[] };
type CssLinearStop = {
  output: number;
  input: readonly [] | readonly [number] | readonly [number, number];
};
```

All stored numbers are finite; `cubic-bezier` restricts `x1/x2` to `[0,1]` while leaving finite `y1/y2` unclamped. `steps()` defaults to `jump-end`, normalizes `start/end` to `jump-start/jump-end`, and normalizes `step-start/step-end` to count 1; count is a positive integer and `jump-none` requires at least 2. A `linear-function` retains one or two authored percentage inputs per comma item as fractions; its compiler expands doubled inputs and performs the CSS linear used-value canonicalization without mutating the AST. Keyword constants and every successful node compile through pure numeric `/easing` constructors, not a parser registry. Malformed ranges/arity, non-finite values or trailing input remain named diagnostics.

`/easing` is parser-free and exposes total, failure-explicit numeric construction only:

```ts
type EasingFunction = (progress: number) => number;
type JumpPosition = "jump-start" | "jump-end" | "jump-none" | "jump-both";
type LinearEasingStop = { readonly output: number; readonly input: number };
function linear(progress: number): number;
function easeOutExpo(progress: number): number;
function smoothStep3(progress: number): number;
function easeInBounce(progress: number): number;
function CubicBezier(x1: number, y1: number, x2: number, y2: number): Result<EasingFunction, EasingIssue>;
function steppedEase(count: number, position?: JumpPosition): Result<EasingFunction, EasingIssue>;
function linearEasing(stops: readonly LinearEasingStop[]): Result<EasingFunction, EasingIssue>;
function easing(name: string): Result<EasingFunction, EasingIssue>;
const jumpTerms: readonly ["jump-start", "jump-end", "jump-none", "jump-both"];
const bezierPresets: Readonly<Record<BezierPresetName, readonly [number, number, number, number]>>;
```

Each constructed function is defined for every finite progress value and exposes no partial/throwing evaluation arm. `easeOutExpo`, `smoothStep3` and `easeInBounce` remain canonical direct numeric implementations because tracked consumers call them; they are neither reconstructed from description data nor hidden behind dynamic lookup. Together with `easeOutCubic`, `easeInOutSine`, `easeInOutCubic`, `easeInOutQuad`, `easeInOutExpo` and `easeInOutCirc`, they form the exact nine named numeric functions. `CubicBezier` and `steppedEase` are the exact clean-major names promised to Glass; `CSSCubicBezier`, `steps` as a second constructor name, and compatibility aliases are absent. Unknown catalog names, invalid step/bezier/linear parameters and non-finite inputs are errors, never identity easing. CSS spelling, `start`/`end` normalization and `steps(...)` text remain `/css` responsibilities; public/internal `parseSteps`, `getTimingFunction`, parser registries and silent fallback to `linear` are deleted. `linearEasing` consumes the parser-independent numeric used-value stop type, so `/easing` imports no `/css` AST. Keyframes accepts an already-callable numeric easing directly, resolves catalog names through failure-explicit `/easing`, and sends CSS text through `/css`; malformed explicit timing is diagnosed rather than inherited/defaulted. `timingFunctionDescriptions` is not a Value 4 export or registry: the exact display copy each UI renders moves into bbnf-buddy `src/animation/easingGroups.ts` and Keyframes `demo/utils/reference-data/animationDescriptions.ts`, with no library forwarding table or cross-consumer alias. The live typed `@property` AST metadata is `CSSPropertyDescriptor`; the bare `PropertyDescriptor` name and any alias disappear from source and declarations. Grammar composition injects the recursive value parser once; late global serializer/conversion registration dies.

### Browser

Computed-value resolution is not a value.js package capability. W8 deletes `convertToPixels`, `getComputedValue`, `getLayoutEpoch`, `bumpLayoutEpoch`, their auto-installed resize listener, DOM metrics/cache modules and their public tests from value.js after W2 freezes behavior. W17 transposes that one mechanism—not a copy—into Keyframes' existing resolve ownership at new file `src/animation/resolve/browser.ts`: the adapter owns explicit `{element,property,epoch}`, pixel/unit resolution and cache invalidation; `AnimationVisualizer.vue`, `resize-tracks.test.ts` and `computed-resolution.test.ts` repoint to it. It consumes pure `/value` `isLayoutTrackingUnit` and no seventh value entry. Pure `/value` and `/css` never import `window`, `HTMLElement`, layout or browser adapters.

## 3. Public product surface

The 4.0 package exports only:

| Entry | Responsibility |
|---|---|
| `/color` | color model, spaces, conversion, color operations and the sole `RGBA8`/`toRgba8` byte projection |
| `/value` | pure CSS value model/operations and `isLayoutTrackingUnit` |
| `/css` | value/stylesheet/timeline/timing parsing, `CSSPropertyDescriptor`, and serialization |
| `/easing` | pure numeric easing functions, types and the canonical preset catalog |
| `/math` | general numeric primitives |
| `/transform` | matrix/path geometry |
| `/quantize` | image/color quantization |

This is the exact W7/W9 artifact contract for `package.json`; it describes the planned clean build and does **not** claim that the current 3.1 checkout, a tarball or the registry already contains these files:

```json
{
  "exports": {
    "./color": { "types": "./dist/subpaths/color.d.ts", "import": "./dist/subpaths/color.js" },
    "./value": { "types": "./dist/subpaths/value.d.ts", "import": "./dist/subpaths/value.js" },
    "./css": { "types": "./dist/subpaths/css.d.ts", "import": "./dist/subpaths/css.js" },
    "./easing": { "types": "./dist/subpaths/easing.d.ts", "import": "./dist/subpaths/easing.js" },
    "./math": { "types": "./dist/subpaths/math.d.ts", "import": "./dist/subpaths/math.js" },
    "./transform": { "types": "./dist/subpaths/transform.d.ts", "import": "./dist/subpaths/transform.js" },
    "./quantize": { "types": "./dist/subpaths/quantize.d.ts", "import": "./dist/subpaths/quantize.js" }
  }
}
```

For Value 4, `exportsSha256` is exactly the lowercase hexadecimal SHA-256 of the UTF-8 RFC 8785 canonical bytes of the in-tarball `package.json.exports` value—only that object, not the surrounding package file, declaration text or tar metadata. The artifact record separately carries `declarationSha256`, keyed by each of the seven literal `types` target paths above; each value is the lowercase hexadecimal SHA-256 of that packed `.d.ts` member's exact bytes with no newline normalization. W33 records those fields from the sole release-candidate tarball and registry bytes. The W7 bootstrap manifest records only supplied transport facts and intentionally omits guessed export/declaration hashes; a held/defective bootstrap never satisfies release evidence. The same field law applies to Keyframes `K_NEXT` and Glass `G_NEXT` using their own in-tarball export maps and every literal `types` target. No aggregate declaration hash is allowed to masquerade as `exportsSha256`.

There is no `"."` export, top-level `main`/`types`, default condition, wildcard or private-dist entry. The package root, `/units`, `/parsing`, and `/browser` are removed with no export-map alias or forwarding file. Generic `sleep`, `isObject`, and case helpers move to their actual consumer or die. A single manifest drives build entries and `package.json`; no 492-line mirror exists.

The same W7/W9 artifact contract fixes the seven declaration files below. The exact 17 factory names are independent named exports, not a `colorFactories` object or compatibility namespace. `ChannelsBySpace` and `SpaceId` are the exact structural definitions in §2 above. The `/value`, `/math`, `/transform` and `/quantize` blocks close the previously prose-only entries: every public runtime and type export must equal its block, with no default, wildcard, namespace, unlisted helper or value/type-kind drift. `/css` is exactly 19 runtime and 33 type exports; `/easing` is exactly 16 runtime and five type exports, including nine named numeric functions. The Glass `G_NEXT` slice remains exactly `/color` + `/css` + `/easing`.

```ts
// @mkbabb/value.js/color
export type SpaceId =
  | "rgb" | "hsl" | "hsv" | "hwb" | "lab" | "lch" | "oklab"
  | "oklch" | "xyz" | "kelvin" | "srgb-linear" | "display-p3"
  | "a98-rgb" | "prophoto-rgb" | "rec2020" | "ictcp" | "jzazbz";
export type Channel = number | "none";
export type Alpha = number | "none";
export type ChannelsBySpace = {
  rgb: readonly [r: Channel, g: Channel, b: Channel];
  hsl: readonly [h: Channel, s: Channel, l: Channel];
  hsv: readonly [h: Channel, s: Channel, v: Channel];
  hwb: readonly [h: Channel, w: Channel, b: Channel];
  lab: readonly [l: Channel, a: Channel, b: Channel];
  lch: readonly [l: Channel, c: Channel, h: Channel];
  oklab: readonly [l: Channel, a: Channel, b: Channel];
  oklch: readonly [l: Channel, c: Channel, h: Channel];
  xyz: readonly [x: Channel, y: Channel, z: Channel];
  kelvin: readonly [kelvin: Channel];
  "srgb-linear": readonly [r: Channel, g: Channel, b: Channel];
  "display-p3": readonly [r: Channel, g: Channel, b: Channel];
  "a98-rgb": readonly [r: Channel, g: Channel, b: Channel];
  "prophoto-rgb": readonly [r: Channel, g: Channel, b: Channel];
  rec2020: readonly [r: Channel, g: Channel, b: Channel];
  ictcp: readonly [i: Channel, ct: Channel, cp: Channel];
  jzazbz: readonly [jz: Channel, az: Channel, bz: Channel];
};
export type Result<T, E> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly error: E };
export type ColorIssue = Readonly<{ code:
  | "color_invalid_input"
  | "color_non_finite"
  | "color_out_of_range"
  | "color_missing_channel"
  | "color_missing_alpha"
  | "color_progress_out_of_range"
  | "contrast_unreachable"
}>;
export type Color<S extends SpaceId> = Readonly<{
  space: S;
  channels: ChannelsBySpace[S];
  alpha: Alpha;
}>;
export type AnyColor = { [S in SpaceId]: Color<S> }[SpaceId];
export type RGBA8 = readonly [r: number, g: number, b: number, a: number];
export type RgbGamut = "srgb" | "display-p3" | "a98-rgb" | "prophoto-rgb" | "rec2020";
export type HueInterpolationMethod = "shorter" | "longer" | "increasing" | "decreasing";
type ColorFactory<S extends SpaceId> =
  (...args: [...ChannelsBySpace[S], alpha?: Alpha]) => Result<Color<S>, ColorIssue>;
export const rgb: ColorFactory<"rgb">;
export const hsl: ColorFactory<"hsl">;
export const hsv: ColorFactory<"hsv">;
export const hwb: ColorFactory<"hwb">;
export const lab: ColorFactory<"lab">;
export const lch: ColorFactory<"lch">;
export const oklab: ColorFactory<"oklab">;
export const oklch: ColorFactory<"oklch">;
export const xyz: ColorFactory<"xyz">;
export const kelvin: ColorFactory<"kelvin">;
export const linearSrgb: ColorFactory<"srgb-linear">;
export const displayP3: ColorFactory<"display-p3">;
export const a98Rgb: ColorFactory<"a98-rgb">;
export const prophotoRgb: ColorFactory<"prophoto-rgb">;
export const rec2020: ColorFactory<"rec2020">;
export const ictcp: ColorFactory<"ictcp">;
export const jzazbz: ColorFactory<"jzazbz">;
export function convertColor<S extends SpaceId>(color: AnyColor, space: S): Result<Color<S>, ColorIssue>;
export function mixColors<S extends SpaceId>(
  from: AnyColor,
  to: AnyColor,
  progress: number,
  options: { readonly space: S; readonly hue?: HueInterpolationMethod },
): Result<Color<S>, ColorIssue>;
export function mapColorToGamut<S extends SpaceId>(color: Color<S>, target: RgbGamut): Result<Color<S>, ColorIssue>;
export function safeAccentColor(
  accent: AnyColor,
  surface: AnyColor,
  options: { readonly minimumRatio: number; readonly gamut: RgbGamut },
): Result<Color<"oklch">, ColorIssue>;
export function interpolateHue(
  fromDegrees: number,
  toDegrees: number,
  progress: number,
  method?: HueInterpolationMethod,
): Result<number, ColorIssue>;
export function toRgba8(color: AnyColor, options: { readonly gamut: "clip" }): Result<RGBA8, ColorIssue>;
```

```ts
// @mkbabb/value.js/value
import type { AnyColor } from "./color.js";

export type CssScalar = Readonly<{
  kind: "scalar";
  payload:
    | Readonly<{ type: "number"; value: number; unit: string }>
    | Readonly<{ type: "keyword"; value: string }>
    | Readonly<{ type: "color"; value: AnyColor }>;
}>;
export type CssCall = Readonly<{
  kind: "call";
  name: string;
  args: readonly CssValue[];
}>;
export type CssList = Readonly<{
  kind: "list";
  separator: "space" | "comma" | "slash";
  items: readonly CssValue[];
}>;
export type CssValue = CssScalar | CssCall | CssList;
export function isLayoutTrackingUnit(unit: string): boolean;
```

```ts
// @mkbabb/value.js/css
import type { Color, ColorIssue, Result } from "./color.js";
import type { JumpPosition } from "./easing.js";
import type { CssList, CssScalar, CssValue } from "./value.js";

export type CssColorSpace =
  | "rgb" | "hsl" | "hwb" | "lab" | "lch" | "oklab" | "oklch"
  | "xyz" | "srgb-linear" | "display-p3" | "a98-rgb" | "prophoto-rgb" | "rec2020";
export type CssColor = { [S in CssColorSpace]: Color<S> }[CssColorSpace];
export type ParseIssue = Readonly<{
  code:
    | "css_syntax"
    | "trailing_input"
    | "keyframe_selector_invalid"
    | "color_context_required"
    | "syntax_descriptor_invalid"
    | "syntax_mismatch"
    | "animation_option_invalid"
    | "timeline_option_invalid";
  start: number;
  end: number;
  expected: readonly string[];
  actual: string | null;
}>;
export type ParseResult<T> =
  | { readonly ok: true; readonly value: T; readonly diagnostics: readonly [] }
  | { readonly ok: false; readonly diagnostics: readonly [ParseIssue, ...ParseIssue[]] };
export type CssLinearStop = Readonly<{
  output: number;
  input: readonly [] | readonly [number] | readonly [number, number];
}>;
export type CssTimingFunction =
  | Readonly<{ kind: "keyword"; name: "linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out" }>
  | Readonly<{ kind: "cubic-bezier"; x1: number; y1: number; x2: number; y2: number }>
  | Readonly<{ kind: "steps"; count: number; position: JumpPosition }>
  | Readonly<{ kind: "linear-function"; stops: readonly CssLinearStop[] }>;
export type Declaration = Readonly<{
  name: string;
  value: CssValue;
  important: boolean;
}>;
export type KeyframeSelector =
  | Readonly<{ kind: "percent"; value: number }>
  | Readonly<{
      kind: "named";
      name: "entry" | "exit" | "cover" | "contain";
      offset?: number;
    }>;
export type KeyframeRule = Readonly<{
  selectors: readonly KeyframeSelector[];
  declarations: readonly Declaration[];
  timingFunction?: CssTimingFunction;
  composition?: "replace" | "add" | "accumulate";
}>;
export type CSSPropertyDescriptor = Readonly<{
  syntax?: string;
  inherits?: boolean;
  initialValue?: CssValue;
}>;
export type CustomFunctionParameter = Readonly<{
  name: string;
  syntax?: string;
  default?: CssValue;
}>;
export type CustomFunctionDescriptor = Readonly<{
  parameters?: readonly CustomFunctionParameter[];
  result?: CssValue;
  declarations?: readonly Declaration[];
}>;
export type CSSAnimationOptions = Readonly<{
  name?: string;
  duration?: number;
  delay?: number;
  iterationCount?: number;
  direction?: "normal" | "reverse" | "alternate" | "alternate-reverse";
  fillMode?: "none" | "forwards" | "backwards" | "both";
  timingFunction?: CssTimingFunction;
  composition?: "replace" | "add" | "accumulate";
}>;
export type ScrollerKeyword = "nearest" | "root" | "self";
export type TimelineAxis = "block" | "inline" | "x" | "y";
export type ViewInset = Readonly<{ start: string; end?: string }>;
export type AnimationTimelineValue =
  | Readonly<{ kind: "auto" }>
  | Readonly<{ kind: "none" }>
  | Readonly<{ kind: "name"; name: string }>
  | Readonly<{ kind: "scroll"; scroller?: ScrollerKeyword; axis?: TimelineAxis }>
  | Readonly<{ kind: "view"; axis?: TimelineAxis; inset?: ViewInset }>;
export type RangePhase =
  | "normal" | "cover" | "contain" | "entry" | "exit"
  | "entry-crossing" | "exit-crossing";
export type RangeBoundary = Readonly<{ phase?: RangePhase; offset?: string }>;
export type AnimationRangeValue = Readonly<{
  start: RangeBoundary;
  end?: RangeBoundary;
}>;
export type TimelineScopeValue =
  | Readonly<{ kind: "none" }>
  | Readonly<{ kind: "all" }>
  | Readonly<{ kind: "names"; names: readonly string[] }>;
export type TriggerType = "once" | "repeat" | "alternate" | "state";
export type AnimationTriggerValue = Readonly<{
  type?: TriggerType;
  timeline?: AnimationTimelineValue;
  range?: AnimationRangeValue;
}>;
export type CSSTimelineOptions = Readonly<{
  timeline?: AnimationTimelineValue;
  timelines?: readonly AnimationTimelineValue[];
  range?: AnimationRangeValue;
  timelineScope?: TimelineScopeValue;
  trigger?: AnimationTriggerValue;
}>;
export type ScrollTimelineDescriptor = Readonly<{
  source?: string;
  orientation?: TimelineAxis;
}>;
export type ViewTimelineDescriptor = Readonly<{
  subject?: string;
  axis?: TimelineAxis;
  inset?: string;
}>;
export type StyleRule = Readonly<{
  kind: "style";
  selectors: readonly string[];
  declarations: readonly Declaration[];
  children?: readonly StylesheetItem[];
}>;
export type KeyframesBlock = Readonly<{
  kind: "keyframes";
  name: string;
  rules: readonly KeyframeRule[];
}>;
export type PropertyRule = Readonly<{
  kind: "property";
  name: string;
  descriptor: CSSPropertyDescriptor;
}>;
export type CustomFunctionRule = Readonly<{
  kind: "function";
  name: string;
  descriptor: CustomFunctionDescriptor;
}>;
export type StylesheetItem =
  | KeyframesBlock
  | PropertyRule
  | CustomFunctionRule
  | Readonly<{
      kind: "scope";
      root?: readonly string[];
      limit?: readonly string[];
      children: readonly StylesheetItem[];
    }>
  | Readonly<{ kind: "starting-style"; children: readonly StylesheetItem[] }>
  | Readonly<{ kind: "scroll-timeline"; name: string; descriptor: ScrollTimelineDescriptor }>
  | Readonly<{ kind: "view-timeline"; name: string; descriptor: ViewTimelineDescriptor }>
  | StyleRule
  | Readonly<{
      kind: "unknown";
      atName: string;
      prelude: string;
      body: string | null;
      children?: readonly StylesheetItem[];
    }>;
export type Stylesheet = readonly StylesheetItem[];
export type CollectedRule<R extends StylesheetItem = StylesheetItem> = Readonly<{
  rule: R;
  path: readonly number[];
}>;
export function parseCssScalar(source: string): ParseResult<CssScalar>;
export function parseCssValue(source: string): ParseResult<CssValue>;
export function parseCssValues(source: string): ParseResult<CssList>;
export function parseKeyframeSelector(source: string): ParseResult<KeyframeSelector>;
export function parseCssColor(source: string): ParseResult<CssColor>;
export function serializeCssColor(color: CssColor): Result<string, ColorIssue>;
export function parseStylesheet(source: string): ParseResult<Stylesheet>;
export function collectKeyframes(
  stylesheet: Stylesheet,
): readonly CollectedRule<KeyframesBlock>[];
export function collectDeclarations(
  declarations: readonly Declaration[],
): ReadonlyMap<string, Declaration>;
export function collectPropertyDescriptors(
  stylesheet: Stylesheet,
): readonly CollectedRule<PropertyRule>[];
export function collectCustomFunctions(
  stylesheet: Stylesheet,
): readonly CollectedRule<CustomFunctionRule>[];
export function collectStyleRules(
  stylesheet: Stylesheet,
): readonly CollectedRule<StyleRule>[];
export function collectAnimationOptions(
  declarations: readonly Declaration[],
): readonly CSSAnimationOptions[];
export function coerceToSyntax(source: string, syntax: string): ParseResult<CssValue>;
export function parseAnimationTimeline(source: string): ParseResult<AnimationTimelineValue>;
export function parseAnimationRange(source: string): ParseResult<AnimationRangeValue>;
export function collectTimelineOptions(
  declarations: readonly Declaration[],
): CSSTimelineOptions;
export function serializeTimelineOptions(options: CSSTimelineOptions): Readonly<{
  "animation-timeline"?: string;
  "animation-range"?: string;
  "timeline-scope"?: string;
  "animation-trigger"?: string;
}>;
export function parseTimingFunction(source: string): ParseResult<CssTimingFunction>;
```

This block is the complete `/css` surface, not a Glass-only slice. Exactly ten functions—`parseCssScalar`, `parseCssValue`, `parseCssValues`, `parseKeyframeSelector`, `parseCssColor`, `parseStylesheet`, `coerceToSyntax`, `parseAnimationTimeline`, `parseAnimationRange` and `parseTimingFunction`—consume the full source and use the one `ParseResult`. They share one grammar: `parseCssValue` returns the natural normalized root, collapsing a singleton to `CssScalar`/`CssCall`, while `parseCssValues` always returns a top-level `CssList` and wraps a singleton as a one-item `separator:"space"` list. Thus the full-list API has a distinct type invariant without a second parse path; it is the sole clean replacement for both old `parseCSSValues` and older `parseCSSSubValue`, with neither old name retained.

`parseKeyframeSelector` is the sole selector-token parser. It maps standard `from` to the same frozen typed `{kind:"percent",value:0}` selector as authored `0%`, and `to` to the same typed percent selector at `1` as authored `100%`; canonical stylesheet/private serialization emits `0%` and `100%`, and reparsing preserves those typed values. A named selector stores `offset` only when an authored percentage follows its phase name; that number is a finite normalized fraction in `[0,1]`, and absence preserves the bare spelling rather than becoming zero. Its ordinary vectors are `from`, `to`, authored `0%`/`100%`, bare `entry`, explicit `entry 0%`, `entry 50%`, `exit 100%`, the grammar's existing mixed-case policy, malformed text, negative and above-100 percentages, and parse→private-serializer→parse round trips that distinguish absent from zero. `parseStylesheet` invokes the same production. Keyframes retains timeline-phase resolution, consumes this AST, and deletes its duplicate selector regex/token parser. This correction changes neither `/css`'s 19 runtime exports nor its 33 type exports.

The same canonical `/css` grammar, rather than a second stylesheet normalizer, accepts the declared value/custom-function/stylesheet arithmetic already consumed by immutable Keyframes 5.3.5: numeric `calc(1px + 2px)`, conditional `if(supports(...))`, `sibling-index()`, and arithmetic inside `@function`. Focused ordinary vectors prove immutable AST success and canonical parse→serialize→parse round trips for all four families, plus exact readonly-nonempty diagnostics for malformed operator, function and `supports` arms. W7 may build the exact-seven bootstrap transport only after those focused vectors and the full ordinary aggregate are green. W17 then deletes Keyframes' local parser with no fallback, alias or dual grammar. These grammar corrections do not change the fixed runtime/type export counts unless a separately enumerated declaration defect proves otherwise.

`parseStylesheet` validates animation/timeline declaration grammar while original UTF-16 coordinates exist, elides leading and inter-rule CSS block comments, admits zero-argument `animation-timeline: view()` and validates every comma-separated `animation` shorthand/list arm through the same canonical structural grammar. `collectAnimationOptions` and `collectTimelineOptions` then accept exactly one caller-selected declaration list and are total typed projections; neither may merge unrelated selectors/containers or fabricate a `ParseIssue` span from a spanless AST. One shared private structural expansion—not text, regex, serialization/reparse or a consumer classifier—expands shorthand into its represented animation subproperties. Cascade is applied per subproperty by `!important` then source order: a later shorthand resets every represented shorthand field, while a later longhand overrides only its own field; the same expansion lets `collectTimelineOptions` observe the shorthand's timeline reset. `collectAnimationOptions` returns a frozen row list with one `CSSAnimationOptions` per effective `animation-name` entry, or one default row when any animation declaration exists; other component lists repeat or truncate to that row count under the CSS repeatable-list law. A consumer that deliberately supports one animation selects `.at(0)` explicitly, so no producer truncation is silent. `collectDeclarations` remains the only general keyed reducer and retains its existing important/later law for non-shorthand declarations.

Every recursive stylesheet collector instead returns source-ordered `CollectedRule<R>` rows. `path` is the immutable zero-based index path from the stylesheet root through `children` to `rule`; it preserves the conditional/layer ancestry for consumer evaluation and never flattens context. `collectKeyframes` therefore neither concatenates duplicate blocks nor chooses a winner. W17 Keyframes follows each path, evaluates supported ancestor contexts or emits a named unsupported-context diagnostic, and then selects the last applicable duplicate in source order. Ordinary vectors cover two same-name blocks selecting only the later applicable block and an inactive/unsupported ancestor never being silently flattened. `collectPropertyDescriptors`, `collectCustomFunctions` and `collectStyleRules` obey the same located-row law; none silently applies map last-write semantics. Together with the selected-list option collectors they retain the cohesive pure stylesheet/custom-function/animation/timeline grammar, while `serializeTimelineOptions` is its typed inverse. The recursive `StylesheetItem` union preserves nested containers, typed custom functions, named scroll/view timeline registrations, unknown at-rules and the collision-free `CSSPropertyDescriptor`; `AnimationTriggerValue`/`TriggerType` remain because Keyframes consumes those types through `CSSTimelineOptions`. No parser here imports DOM or Keyframes.

The rest of the 3.x parsing facade is terminally reduced rather than hidden as extra `/css` exports. `parseLinearStops` and `parseSteps` fold into `parseTimingFunction`; consumer-less `parseSpring`/`lowerSpringEasing` retire in favor of Keyframes' existing physics authority. `parseAnimationTimelineList`, `parseAnimationRangeBoundary`, `parseTimelineScope`, `parseAnimationTrigger`, `parseAnimationShorthand`, `parseSyntaxDescriptor`, `validateSyntax`, `serializeAnimationTimeline`, `serializeAnimationRange`, `serializeTimelineScope` and `serializeAnimationTrigger` become private structural implementation arms of the public operations above. The private shorthand arm returns typed component rows and is shared by `parseStylesheet`, `collectAnimationOptions` and `collectTimelineOptions`; it never becomes a second public parser or a serialization/reparse path. `extractNamedTimelines` becomes one Keyframes-local derived projection in `../keyframes.js/src/animation/scroll/grammar.ts`; the value export and implementation are deleted, so there is one owner and no second grammar. `parseCSSTime` is removed from value's public surface; its sole external site, `../keyframes.js/src/animation/engine/options.ts`, calls `parseCssScalar` and explicitly converts `s`/`ms`, while W9's duration grammar remains private inside `collectAnimationOptions`.

Exactly four text-only helpers transpose once into `../keyframes.js/src/animation/compile/emit/css-text.ts`: `formatCSS` and `serializeStylesheetItem` from `src/parsing/stylesheet/serialize.ts`, `reverseAnimationShorthand` from `src/parsing/animation-shorthand.ts`, and `reverseCSSTime` from `src/parsing/units.ts`. W17 re-points their existing Keyframes emit/editor callers and deletes the value implementations/exports/tests in the same cut; no forwarding export survives. `serializeStylesheet`, `serializeDeclaration`, `serializeKeyframeSelector`, `stylesheetToString`, `reverseCSSIterationCount`, `parseCSSPercent`, `evaluateMathFunction`, parser objects/constants/errors, registration APIs, parse-that utilities and their public option/sink types are either private grammar detail needed by the retained block or deleted when consumer-less. In particular `CSS_WIDE_KEYWORDS`, `CSSString`, `CSSFunction`, `CSSJSON`, `CSSValues`, `CSSValueUnit`, the nominal `CSSColor`, `CSSParseError`, `registerColorNames`, `clearCustomColorNames`, `getCustomColorNames`, `istring`, `identifier`, `none`, `integer`, `number`, `succeed`, `fail`, `tryParse`, `parseResult`, `ParseCSSValuesOptions`, `JumpTerm`, `StepsArgs`, `SyntaxComponentName`, `ParsedColorUnit`, `NamedTimelineRegistry`, `ParseDiagnostic` and `OnParseError` are not 4.0 exports; `ParseIssue`/`ParseResult`, `JumpPosition`, `CssColor`, the closed AST types above and the final color/value types replace their public roles without aliases.

```ts
// @mkbabb/value.js/easing
import type { Result } from "./color.js";

export type EasingFunction = (progress: number) => number;
export type EasingIssue = Readonly<{ code:
  | "easing_non_finite"
  | "bezier_x_out_of_range"
  | "step_count_invalid"
  | "jump_position_invalid"
  | "linear_stop_invalid"
  | "easing_name_unknown"
}>;
export type JumpPosition = "jump-start" | "jump-end" | "jump-none" | "jump-both";
export type LinearEasingStop = Readonly<{ output: number; input: number }>;
export type BezierPresetName =
  | "linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out" | "smooth-step-3"
  | "ease-in-sine" | "ease-out-sine" | "ease-in-out-sine"
  | "ease-in-quad" | "ease-out-quad" | "ease-in-out-quad"
  | "ease-in-cubic" | "ease-out-cubic" | "ease-in-out-cubic"
  | "ease-in-quart" | "ease-out-quart" | "ease-in-out-quart"
  | "ease-in-quint" | "ease-out-quint" | "ease-in-out-quint"
  | "ease-in-expo" | "ease-out-expo" | "ease-in-out-expo"
  | "ease-in-circ" | "ease-out-circ" | "ease-in-out-circ"
  | "ease-in-back" | "ease-out-back" | "ease-in-out-back";
export function linear(progress: number): number;
export const easeOutCubic: EasingFunction;
export const easeInOutSine: EasingFunction;
export const easeInOutCubic: EasingFunction;
export const easeInOutQuad: EasingFunction;
export const easeInOutExpo: EasingFunction;
export const easeInOutCirc: EasingFunction;
export const easeOutExpo: EasingFunction;
export const smoothStep3: EasingFunction;
export const easeInBounce: EasingFunction;
export function CubicBezier(x1: number, y1: number, x2: number, y2: number): Result<EasingFunction, EasingIssue>;
export function steppedEase(count: number, position?: JumpPosition): Result<EasingFunction, EasingIssue>;
export function linearEasing(stops: readonly LinearEasingStop[]): Result<EasingFunction, EasingIssue>;
export function easing(name: string): Result<EasingFunction, EasingIssue>;
export const jumpTerms: readonly ["jump-start", "jump-end", "jump-none", "jump-both"];
export const bezierPresets: Readonly<Record<BezierPresetName, readonly [number, number, number, number]>>;
```

```ts
// @mkbabb/value.js/math
export function clamp(value: number, min: number, max: number): number;
export function scale(value: number, fromMin: number, fromMax: number, toMin?: number, toMax?: number): number;
export function lerp(start: number, end: number, progress: number): number;
export function lerpArray(
  start: Float64Array,
  stop: Float64Array,
  progress: number,
  out: Float64Array,
): Float64Array;
export function logerp(start: number, end: number, progress: number): number;
export function deCasteljau(progress: number, points: readonly number[]): number;
export function cubicBezier(
  progress: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): readonly [x: number, y: number];
export function interpBezier(
  progress: number,
  points: readonly (readonly [x: number, y: number])[],
): readonly [x: number, y: number];
export function cubicBezierToString(x1: number, y1: number, x2: number, y2: number): string;
```

```ts
// @mkbabb/value.js/transform
export type Vec4 = readonly [x: number, y: number, z: number, w: number];
export type Mat4 = readonly [
  number, number, number, number,
  number, number, number, number,
  number, number, number, number,
  number, number, number, number,
];
export type DecomposedMatrix2D = Readonly<{
  translateX: number;
  translateY: number;
  scaleX: number;
  scaleY: number;
  angle: number;
  skew: number;
}>;
export type DecomposedMatrix3D = Readonly<{
  translate: readonly [x: number, y: number, z: number];
  scale: readonly [x: number, y: number, z: number];
  skew: readonly [xy: number, xz: number, yz: number];
  quaternion: Vec4;
  perspective: Vec4;
}>;
export type Point = Readonly<{ x: number; y: number }>;
export type PathSample = Readonly<{ x: number; y: number; angle: number }>;
export function decomposeMatrix2D(
  a: number,
  b: number,
  c: number,
  d: number,
  e: number,
  f: number,
): DecomposedMatrix2D;
export function decomposeMatrix3D(matrix: Mat4): DecomposedMatrix3D | null;
export function recomposeMatrix2D(matrix: DecomposedMatrix2D): readonly [number, number, number, number, number, number];
export function recomposeMatrix3D(matrix: DecomposedMatrix3D): Mat4;
export function slerp(from: Vec4, to: Vec4, progress: number): Vec4;
export function interpolateDecomposed(
  from: DecomposedMatrix2D,
  to: DecomposedMatrix2D,
  progress: number,
): DecomposedMatrix2D;
export function interpolateDecomposed(
  from: DecomposedMatrix3D,
  to: DecomposedMatrix3D,
  progress: number,
): DecomposedMatrix3D;
export class PathGeometry {
  constructor(pathData: string);
  readonly totalLength: number;
  getTotalLength(): number;
  getPointAtLength(length: number): Point;
  getPointAtT(progress: number): Point;
  sampleAtLength(length: number): PathSample;
}
export function getTotalLength(pathData: string): number;
export function getPointAtLength(pathData: string, length: number): Point;
```

```ts
// @mkbabb/value.js/quantize
import type { Color, Result } from "./color.js";

export type QuantizeOptions = Readonly<{
  k?: number;
  maxIterations?: number;
  targetPixels?: number;
  chromaWeight?: number;
  dedupeThreshold?: number;
}>;
export type QuantizedColor = Readonly<{
  color: Color<"oklch">;
  population: number;
}>;
export type QuantizeIssue = Readonly<{ code:
  | "quantize_invalid_dimensions"
  | "quantize_pixel_length_mismatch"
  | "quantize_invalid_option"
}>;
export function quantizePixels(
  pixels: Uint8ClampedArray,
  width: number,
  height: number,
  options?: QuantizeOptions,
): Result<readonly QuantizedColor[], QuantizeIssue>;
export function dominantColor(
  pixels: Uint8ClampedArray,
  width: number,
  height: number,
): Result<QuantizedColor | null, QuantizeIssue>;
```

The seven declaration files may use only the shown type-only imports between capability modules; `/easing` remains parser-free, `/color` remains CSS-parser-free, `/value` imports only the final color type, and `/quantize` returns final `Color<"oklch">` objects through the one `Result` rather than exporting raw RGB/OKLab/OKLCH tuples or CSS strings. The nine named easing exports above are their sole implementations, not wrappers. Dynamic Fourier/catalog lookup uses failure-explicit `easing(name)`; its exact name vectors cover each direct camel-case export and canonical CSS/catalog spelling, including `easeOutExpo`/`ease-out-expo`, `smoothStep3`/`smooth-step-3` and `easeInBounce`/`ease-in-bounce`. The `timingFunctions` aggregate, `timingFunctionDescriptions`, property/identity fallback and description forwarding table are absent from source, declarations and current Value documentation; the two consumer UIs own only their rendered description copy. `cubicBezierToSVG` is absent while the actively consumed numeric `cubicBezierToString` remains. No name in any block is an alias for a 3.x export. W7's one fresh bootstrap pack compares every runtime export name and every type-only declaration name against these blocks before W17 may migrate a consumer; until then every coordinate and hash remains unobserved.

**HISTORICAL (V-A123):** Preparation and packing share one unconditional law. `prepare` removes prior package output and runs the authoritative seven-entry production build every time; it never branches on `test -f dist/value.js` or another existence/freshness guess. W7's ordinary package fixture may plant a stale sentinel/old entry in an isolated `dist`, pack, fresh-install and prove the sentinel/old root are absent while the new fixture and all seven runtime/type entries are present; that disposable test output is not a transport. The exact-seven Value4 transport and its manifest are historical; Value4 is now immutable, and W17 does not recreate Value rehearsal bytes. A held/defective pack is neither a W17 rehearsal nor a W33 release candidate. No ignored `dist`, source-only green result, bootstrap hash, HEAD identity or predicted integrity is release evidence. W33 applies the same unconditional law to the fresh Glass7 candidate.

## 4. Consumer cut

The cut is one ordered constellation event:

1. Internally land the final-object DAG and exact entry modules without publishing a duplicate surface.
2. Repoint value.js demo and every `CONSUMER-CUT.md` BUILD repository to the exact 4.0 entries. The cut manifest covers every import plus every nominal construction, `instanceof`, clone, mutable-value and parser-result callsite; keyframes/glass are the core dependency chain, not the census boundary.
3. Delete root/old entries and all self aliases in the same cut.
4. For every parser consumer, apply and test the boundary behavior already named by `CONSUMER-CUT.md` and the W2 ratified callsite manifest: propagate `ParseResult` diagnostics, convert them to its named typed domain error, or deliberately reject/throw at that named boundary. W2 may discover a missed callsite, but it may not reopen the failure protocol or leave the behavior as an implementation choice. An import rewrite is not a semantic migration.
5. Remove glass-ui from keyframes runtime/optional dependencies; glass is demo/development material there, never a production cycle.
6. **V-A130 current stage:** W3 records Glass asks as LANDED/RED/DECLINED, while Value4 and Keyframes6 are immutable and the registry-only pair install is proven. Glass alone must close declaration/HeaderRibbon/Q003 native behavior, remove stale demo-canon names and produce the fresh strict Glass7 candidate; W17 then refreshes the stale routed consumer. No Keyframes re-close, Value rehearsal/bootstrap replacement, alias, shim, undeclared reach, consumer/timing workaround, file link, hoisting or dual path; rehearsal hashes are not release coordinates.
7. **V-A130 current stage:** W33 freshly builds and packs one designated sole Glass release-candidate tarball, publishes that exact file, requires fetched registry bytes and decoded `dist.integrity` SHA-512 to match it, verifies a fresh external install, and reruns every downstream BUILD consumer. W33 alone records Glass as **SHIPPED** from the observed coordinate plus exact source/test/Browser evidence. The noncandidate verifier remains isolated and unpublished; the immutable Value4/Keyframes6 tags are never moved or reused.

No released or registry compatibility window exists. The value-side C1 may merge locally as one complete major cut before sibling repositories integrate, because W11–W15 consume it and no old path survives inside that package; W17 must still make every sibling green before W33 publishes or updates manifests.

Keyframes consumes exactly `/css`, `/value`, `/math`, `/easing`, `/color`, and `/transform`. Its library build externalizes exactly those six fully qualified Value4 entries after resolving each through the packed artifact's `exports` map; neither the removed root, a package-prefix predicate, `/units`, `/parsing`, `/quantize`, nor a `/browser` entry survives. Its U covenant is terminal in `CONSUMER-CUT.md`: timing and keyframe-selector text use `/css` `ParseResult`, named selector offsets use the one normalized optional field while Keyframes retains phase resolution, final values compile once into keyframes-owned slots, the WAAPI literal becomes `isLayoutTrackingUnit`, the sole computed-resolution/epoch/cache mechanism moves into Keyframes' browser resolver, `CSSPropertyDescriptor` replaces the colliding bare type, and the canonical catalog gains the six quart/quint rows. No shallow flatten mode is added. The presentation-only path sampler remains one keyframes-local helper with explicit `flipY`, while value's unused full-element `cubicBezierToSVG` dies. Glass consumes exactly `/color`, `/css`, and `/easing`: `/css` parses CSS color text, `/color` owns final objects/conversion/mixing/gamut/actual-surface contrast/degree-domain hue, and `/easing` owns numeric curves. Its source imports, `vite.library.ts`, live bundle profiler and ordinary bite tests agree on those three literal peers and reject the dead root, prefix umbrellas, private paths, old raw/nominal/direct primitives, `parseSteps` and silent identity. Atlas, bbnf-buddy, bbnf-lang, fourier-analysis, muster, sci-report and speedtest consume only the entries fixed in `CONSUMER-CUT.md`; generic helpers and UI descriptions are localized. W2's manifest and the Value/Keyframes producer portions are complete; W17/W33 now apply only the surviving Glass/downstream consumer rows and known conversion renames.

## 5. API structure

The existing physical `modules` container remains; each module is a vertical domain. V changes trust/composition, not this directory name:

```text
api/src/
  app.ts                # process composition only
  modules/
    namespace/          # one spelling law + permanent claim repository
    principal/
    meta/               # health + mounted-schema OpenAPI only
    admin/
    color/
    palette/
  platform/
    db/
    http/
    operations/          # receipt namespace/key/binding primitive
    audit/
```

`principal/` owns Principal, credential, session and `/sessions*` behavior; the legacy `session/` module is deleted rather than forwarded. `namespace/` owns the shared canonical-spelling function and NamespaceClaim repository used by principal and palette; neither consumer grows its own normalizer. `meta/` owns only `/health` and mounted-schema `/openapi.json`; the custom `/docs` handler and hand-maintained `route-table.ts` are deleted in W10. Routes validate/authenticate/authorize and call a narrow service. Services own transactions and policies; repositories own persistence. `Services` aggregation and route/service re-exports are replaced by narrow ports wired once in `app.ts`. Error types describe stable mechanisms, not aliases for unrelated cases.

### Deployment edge

The production browser sees one authority, `https://color.babb.dev`, and only relative `/api` transport. Non-proxying DNS reaches a dual-stack L4 TCP load balancer with PROXY v2, then redundant private NGINX+njs/QuickJS TLS edges. One catch-all raw-buffer dispatcher serves immutable SPA assets, executes the projection-only API classifier and inspects original request-target bytes before normalized routing; it strips one literal `/api`, preserves query bytes, reconstructs the exact header allowlist and binds it into the origin MAC. Hono has no public DNS or plaintext listener and requires the edge security group, private-CA client certificate, exact SNI/Host and signed frame. The edge validates the exact response-header/cookie grammar and fully settles bounded cookie-changing origin responses. `PALETTE-LOCAL-RAIL.md` runs the identical edge artifact at the singular `https://value.localhost:4173` authority with trusted local PKI and a private local origin; production and local profiles reject one another. Cloudflare HTTP proxy/Worker/WAF/Pages/VPC ingress, direct browser API, CORS credential path and unsigned/plaintext dev bypass are absent, not standby routes. `PALETTE-DOMAIN.md §Trusted edge identity and shared abuse windows` owns the exact transport, byte, correlation, cookie and log law; `research/auth-cookie-order.md` explicitly limits settlement to the origin/edge boundary and requires stale-token failure plus visible recovery if browser response order reverses. W10/W16 implement it locally and W33 proves the deployed rail.

## 6. Reduction proof

V judges architecture by fewer concepts and edges, not smaller files alone:

- runtime SCCs 14+4 → 0;
- root/subpath facade duplication 1,008 lines → one authored surface per entry;
- 17 color subclasses → one final generic object;
- project aliases and `demo/@` → 0;
- parent/self-barrel imports → 0;
- parser failure protocols → 1;
- DOM-tainted pure-value fields/imports → 0;
- dead forwarding barrels → 0;
- net authored logic must fall unless a wave records a concrete new product capability that explains growth.

These are execution diagnostics and review facts, not a custom CI gate.

## 7. Build, conventions & operational guidance (folded from the retired CLAUDE.md set — RF-6)

The eight `CLAUDE.md` files died at W40 (owner totality ruling; `git ls-files '*CLAUDE.md'` is
empty). Their still-substantive guidance is single-sourced here (L2). No standalone `CLAUDE.md`
returns. §1–§6 above own topology and the reduction proof; §5 is the re-formed **target** api;
this section records the **current running** substrate's build/convention/operational facts.

### Build & verify modes

```
npm run build         # library → dist/value.js (ESM) + dist/*.d.ts (flat layout)
npm run build:watch   # vite build --watch (fleet dev orchestration)
npm run gh-pages      # demo → dist/gh-pages/ (vendor chunks via Rolldown codeSplitting)
npm run dev           # HONEST full local stack: scripts/dev.sh up — local api + mongo rs0 +
                      #   VITE_API_URL wired + dev CORS. Palette features round-trip.
npm run dev:web-only  # frontend ONLY (bare vite). No backend: palette/API features CORS-die
                      #   against prod; the UI surfaces an explicit "dev misconfigured" state.
npm test              # vitest (jsdom) unit suite (count → the per-tranche FINAL/gate doc)
npx playwright test   # smoke projects: desktop / admin / mobile / reactivity / perf / safari
npm run lint          # eslint flat config — the src/ glass-ui import-ban + a hygiene smoke
                      #   gate; correctness depth is carried by the type system + review
npm run typecheck     # vue-tsc --noEmit (lib + demo); api: cd api && npx tsc --noEmit
```

`npm run dev` boots the full stack because the demo's palette API needs a CORS-permissive
local backend. Bare vite with no `VITE_API_URL` targets the cross-origin prod api, whose
allow-list excludes localhost, so every palette request preflight-dies. Rather than mislabel
that "backend offline", the demo detects the precondition (unset `VITE_API_URL` + loopback
origin + cross-origin base) and enters a designed `misconfigured` state (loud console error +
a distinct UI chip) — never a silent prod fallback. **Rejected**: adding localhost to prod
`ALLOWED_ORIGINS` (dev must not target prod). Exact test/spec counts belong in the per-tranche
gate doc, never inlined here (they drift each wave).

### TypeScript conventions

- `strict:true`, **`verbatimModuleSyntax:true`**, `moduleResolution:bundler`, `target:ES2022`,
  `lib:ES2023`.
- **`import type` for every type-only import** (enforced by `verbatimModuleSyntax`). This is
  load-bearing at runtime: a mixed value/type import that should have been `import type` breaks
  the Vite runtime — the modernization caught six such mixed imports in `demo/` that had been
  silently shipping.
- Named exports only, no defaults (enables tree-shaking). Color matrices stored row-major
  (3×3); transform matrices column-major (4×4, CSS convention). Color components normalized to
  `[0,1]` internally, denormalized on output.
- **Minimize `as any` / `as unknown as`** — prefer typed narrowing + branded nominal types.
  `src/` holds **0** `as any`; the `as unknown as` sites are one accepted irreducible erasure
  class (`Color<T>` generic-component erasure + the DOM `CSSStyleDeclaration` no-string-index
  boundary), each carrying a load-bearing inline comment; the count is regenerable
  (`grep -rn 'as unknown as' src/ | wc -l`), never hardcoded. `api/src` holds the same
  discipline: **0** `as any`, **1** `as unknown as` (the `@hono/node-server` `server.close()`
  third-party stub gap). The discipline stands by the type system + eslint + review, not by a
  committed grep budget-script.

### Colocation idiom

Components colocate with their sub-components, composables, skeletons and constants,
recursively at component grain; only genuinely module/global-level composables and styles live
in a `composables/` or `styles/` directory; the backend gets the abstracted equivalent (module
verticals own model + schema + routes + service + repository). **No god modules**: every
`demo/` file (excluding the vendored `demo/@/components/ui/` shadcn-vue tree) stays ≤ 400 LoC;
no `api/src` file exceeds 350 LoC. This is the same law §1's physical tree enforces; it is
restated once here as the standing convention register — §1 remains the topology authority.

### API operational guidance (current running substrate — Hono + MongoDB)

The current api is Hono + MongoDB (Docker Compose; **not** Cloudflare Workers + D1), deployed
behind the babb.dev Apache TLS spine at `https://api.color.babb.dev`, loopback-bound
`127.0.0.1:8130:3000`. Nine collections / 22 explicit indexes. The re-formed **target** edge
(§5 Deployment edge) supersedes this transport at W10/W33; today's substrate is what runs.

- **Request pipeline** — `validate → authn → authz → service → repository → format → response`.
  Routes validate (zod schema), authenticate, authorize, then call a narrow service; services
  own transactions and policy; **only** `repository/` + the inject-services factory touch raw
  `db`. Every failure throws a typed `ApiError` routed through `onError → toResponseEnvelope`
  (canonical `application/problem+json`) — no ad-hoc `c.json({error})`.
- **Middleware order** — `OPTIONS→204+CORS` · CORS headers · 64 KB body limit · rate limit
  (60 read / 10 write per-min per-IP; login 5/min, registration 3/min) · `sanitizeBody`
  ($-prefixed-key injection guard) · `injectServices` (DI) · `resolveSession` · `idempotency`
  (opt-in `Idempotency-Key`). Admin routes additionally require a timing-safe
  `Authorization: Bearer {ADMIN_TOKEN}` and emit an `admin_audit` event.
- **Cross-collection writes** wrap in `services.withTransaction(session => …)` with `session`
  threaded through; adding a new cross-collection write site without that wrapper is the
  regression the invariant guards against.
- **Mongo-discipline residual (U-F37, justified divergence).** The prod compose runs
  `mongod --replSet rs0 --bind_ip_all` with no SCRAM auth / no `--keyFile` and credential-free
  `MONGODB_URI` — an EXPLICIT, documented defense-in-depth residual, bounded because the `mongo`
  service publishes no host port (internal compose bridge only), the `api` service is
  loopback-bound behind the Apache TLS terminator, and both carry container hardening
  (`read_only`, `cap_drop:[ALL]`, `no-new-privileges`, tmpfs `noexec,nosuid`). `.env.example`
  advertises only wired vars (`ADMIN_TOKEN`, `ALLOWED_ORIGINS`, `PORT`). Wiring full
  SCRAM + keyFile remains the owner's deploy-time election.
