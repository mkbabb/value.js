# State, Routing, and Sharing Contract

## Authority

Each demo has one discriminated state model, one reducer/action boundary, one
URL codec, and one router binding. Components receive projections and dispatch
actions; they do not read or write the URL, storage, history, or API directly.
Route state is a shareable projection of application state, not a second store.

The readable route is the hash path. The canonical shared form is:

```text
https://host/#/route?v=1&s=<base64url(UTF-8(JCS(envelope)))>
```

```ts
type UrlEnvelope<Route extends string, State> = Readonly<{
    v: 1;
    route: Route;
    state: State; // deviations from the route defaults only
}>;
```

The outer `v=1` permits bounded preflight before decoding. It must equal the
envelope version. The envelope route must equal the hash route. A mismatch is
an error, never a redirect or coercion.

## Canonical codec

- Serialize JSON with RFC 8785/JCS ordering and number spelling.
- Encode the UTF-8 bytes with unpadded base64url.
- Omit fields equal to canonical route defaults, empty optional collections,
  and all transient/private fields.
- Re-encoding a decoded valid state must be byte-identical.
- Objects with duplicate or unknown keys are invalid.
- Numbers must be finite, preserve no negative-zero distinction, and satisfy
  their route schema bounds.
- A resolved share URL is at most `6144` UTF-16 code units; `s` is at most
  `6000` ASCII characters and its decoded JSON is at most `4500` UTF-8 bytes.
- Generic structural limits are depth `12`, `512` total JSON nodes, `64` keys
  per object, `128` members per array, `64` code units per key, and `1024` code
  units per string. Route schemas may tighten but never loosen these limits.
- Decode in this order: outer version and encoded length; alphabet; base64url;
  fatal UTF-8; JSON syntax/duplicate keys; generic limits; envelope/route;
  route schema; canonical re-encoding.

```ts
type UrlStateError =
    | "future-version"
    | "version-mismatch"
    | "route-mismatch"
    | "oversized"
    | "invalid-base64url"
    | "invalid-utf8"
    | "invalid-json"
    | "duplicate-key"
    | "unknown-key"
    | "invalid-schema"
    | "noncanonical";
```

Every error renders a visible refusal with reset and copy-diagnostic actions.
No invalid state is silently removed, rewritten, truncated, or replaced by a
partially decoded value.

## History and lifecycle law

- A semantic commit—route change, preset selection, add/remove/reorder,
  completed text edit, confirmed form, restored share, or settled direct
  manipulation—uses `push` exactly once when it changes canonical state.
- Continuous pointer, wheel, key-repeat, slider, scrub, orbit, pinch and curve-
  handle updates modify runtime-only preview state and readouts. They do not
  write committed application state, URL, or browser history per frame.
- Gesture release atomically commits and pushes the final canonical state once;
  no change produces no entry.
- `popstate`/router navigation decodes once and atomically replaces store state;
  it never echoes the same state back to history.
- Route leave cancels pending writers. Startup precedence is valid URL state,
  then explicitly admitted local preference, then canonical route defaults.
- Hover, focus, open popovers/dialogs, pointer identities, cursor coordinates,
  loading flags, animation frame time, credentials, sessions, file bytes,
  private API data, and ephemeral errors never enter URLs.

For a continuous interaction, history is an exact transaction:

1. `BEGIN` captures committed canonical state A and creates runtime-only
   preview state;
2. repeated updates render and announce the preview while committed state and
   URL remain A;
3. `COMMIT(B)` atomically dispatches once and pushes one canonical B entry when
   `B != A`;
4. cancel, lost capture, reset or route leave discards preview without a
   history write;
5. pop/hash navigation first cancels preview, then atomically replaces
   committed state without echo;
6. sharing refuses while preview is unsettled or explicitly commits through
   the same semantic action before encoding.

## Value route model

All color values use canonical value.js serialization. Every algorithm enum is
versioned; changing its output requires a new enum value, never silent drift.

| Route | Canonical defaults | Shareable deviations |
|---|---|---|
| `/` | `pane:"picker"`; `space:"oklch"`; `color:"lab(92% 88.8 20 / 82.7%)"`; `gamut:"css-local-minde"`; `precision:3` | pane, display space, canonical color, gamut algorithm, precision `0..6` |
| `/palettes` | `pane:"palettes"`; `mode:"list"`; `sort:"updated-desc"`; no selection | mode, sort, selected public palette revision |
| `/browse` | `pane:"browse"`; `q:""`; `sort:"featured"`; `tags:[]`; `curation:"all"` | normalized query, sort, sorted unique tag slugs, curation, cursor only when it is a stable public cursor |
| `/extract` | `pane:"extract"`; `count:8`; `space:"oklab"`; `algorithm:"median-cut"`; `quality:"balanced"`; no source | count `2..32`, space, versioned algorithm, quality; never file bytes, object URLs, EXIF, or local paths |
| `/mix` | `pane:"mix"`; `sources:[]`; `space:"oklch"`; `hue:"shorter"`; `premultiply:true`; `gamut:"css-local-minde"`; no recipe | at most 16 typed sources, weights, space, hue method, alpha policy, gamut, immutable recipe id/revision |
| `/generate` | `pane:"generate"`; `seed:"value"`; `engine:"harmony-v1"`; `count:6`; `harmony:"analogous"`; `energy:0.76`; `space:"oklch"` | seed up to 128 code units, engine, count `2..24`, harmony, energy `0..1`, space |
| `/gradient` | `pane:"gradient"`; linear `90deg`; interpolation `oklab shorter`; black at `0%`; white at `100%`; linear easing | kind/geometry, interpolation space/hue, `2..32` ordered typed stops, hints, versioned easing |
| `/atmosphere` | `pane:"atmosphere"`; canonical picker color; exact pinned `DEFAULT_AURORA_ATOMS` projection | Canonical color plus every structurally valid D17A atom deviation; never expanded `AuroraConfig`, pointer position, frame phase or GPU state |
| `/blob` | `pane:"blob"`; exact pinned `BLOB_CONFIG_DEFAULTS`; derived palette from canonical picker color; local `canvasSize` and `quality` preferences | `BlobPaletteSource` plus the other 47 semantic `BlobConfig` leaves as bounded deviations; never `MoodParams`, satellite phase, pointer, clock, buffer or GPU state |

Resource references are `{id, revision}` pairs. A mutable head is never enough
to reproduce a share. If a public state exceeds the URL bound, value may create
an explicit immutable `/api` share resource and place only its id/revision in
the URL. Previewing a share performs no palette or derivation write.

### Atmosphere field join

D17A keeps all 18 public `AuroraAtoms` leaves. The picker color lowers once to
`seed`. Primary shareable controls are `harmony`, `colorEnergy`,
`zones.count`, `zones.arrangement`, `noise`, `medium.kind`, and `motion`.
Advanced shareable controls are `lightnessScheme`, `lBand`, `hueSpread`,
`chromaVariance`, `chromaCounterpoint`, `interactivity.swirl`,
`interactivity.amplitude`, and `interactivity.scroll`; `medium.amount` exists
only for textured media and `interactivity.light` only for painterly media.
Smooth-plus-light, conflicting band/scheme state and every structurally inert
combination refuse instead of disappearing.

The exact defaults are the pinned producer defaults, not a second hand-written
schema:

```ts
{
    color: PICKER_DEFAULT_COLOR,
    atoms: {
        harmony: "analogous",
        colorEnergy: 0.76,
        zones: { count: 6, arrangement: "scattered" },
        noise: 0.5,
        medium: { kind: "smooth" },
        motion: "drifting",
        interactivity: { swirl: true },
    },
}
```

### Blob field join

D18A keeps all 49 public `BlobConfig` leaves. The URL owns the following 47
semantic leaves as validated deviations from the pinned producer-default hash:

```text
geometry: bodyRadius, satelliteCount, satelliteRadius, orbitRadius, eccentricity
satellites: mergeDuration, absorbedDuration, emergeDuration, orbitDuration
membrane: smoothK, merge, noiseAmp, noiseFreq, noiseSpeed, warpAmp, pulseFreq, pulseAmp
color: paletteStops, satelliteColors, hueRange, satShift, brightnessShift,
       colorNoiseFreq, colorNoiseSpeed, lightnessFloor
surface: lit, shadow, shadowSoftness, rimColor, lightDir, specStrength,
         specShininess, rimPower, rimStrength, iridescence, iridHue, iridSpeed,
         sssScale, sssPower, coreGlow, fissionAmp
interaction: pointerAttraction, pointerStrength, stretch, clickImpulse
top-level: morphT, tempo
```

`geometry.canvasSize` and `quality` remain live local preferences because
viewport dimensions and hardware quality are not portable semantics. Palette
authority is explicit:

```ts
type BlobPaletteSource =
    | { kind: "derived"; color: CanonicalCssColor }
    | {
          kind: "explicit";
          stops: readonly CanonicalCssColor[];
          satelliteColors?: readonly CanonicalCssColor[];
      };
```

Changing either producer schema changes the route-codec version. An unknown
producer field fails the total join and is never silently dropped.

### Value admin routes

Admin URL state is filtering/navigation only and sharing controls are disabled.
The codec rejects all user records, email/session identifiers, moderation
evidence, audit payloads, authorization state, and mutation bodies.

| Route | Defaults | Admitted URL fields |
|---|---|---|
| `/admin/users` | `q:""`; `status:"all"`; `role:"all"`; `sort:"updated-desc"` | q, status, role, sort, opaque cursor |
| `/admin/names` | `q:""`; `status:"pending"`; `sort:"created-asc"` | q, status, sort, opaque cursor |
| `/admin/audit` | `kind:"all"`; `actor:null`; `resource:null`; `sort:"created-desc"` | kind and public/redacted filter ids, sort, opaque cursor |
| `/admin/flagged` | `status:"open"`; `sort:"created-asc"` | status, sort, opaque cursor |
| `/admin/tags` | `q:""`; `sort:"name-asc"` | q, sort, opaque cursor |

Opaque admin cursors may be restored in the same authenticated session but are
not copied or advertised as shareable links.

## Keyframes route model

Runtime playback intent, current time, current iteration, pointer identities,
focus, Home-card selection and open panels are transient and never shareable.
Every shared keyframes route restores a stable paused frame and waits for scene
readiness. Authored timing parameters, settled transforms, explicit viewport/
playhead state and bounded `ProgramSpec` remain shareable where listed.

| Route | Canonical scene defaults | Shareable deviations |
|---|---|---|
| `/` | Route only; no serialized scene state and no `s` payload | None |
| `/cube` | orientation quaternion `[0,0,0,1]`; pan `[0,0]`; distance `6` | Canonical normalized orientation, pan `[-4,4]²`, distance `2..14` |
| `/amiga` | camera orientation `[0,0,0,1]`; target `[2.5,2.5,2.5]`; distance `11.96`; ball quaternion `[0,0,0,1]` | Canonical camera orientation, bounded target/distance and separate canonical ball quaternion; camera position is derived |
| `/square` | `duration:1000`; `easing:"ease"`; `distance:160`; `rotation:90`; `iterations:1`; position `[0,0]` | Duration `50..30000`, typed easing, distance `0..1000`, rotation `-1440..1440`, authored iterations `1..100`, position `[-1,1]²` |
| `/easing` | cubic Bézier `[0.25,0.1,0.25,1]`; duration `1000`; family `"standard"`; viewport `{zoom:1,pan:[0,0]}` | Typed curve, bounded duration, family filter, zoom `0.25..16`, pan `[-8,8]²` |
| `/spring` | mass `1`; stiffness `170`; damping `26`; velocity `0`; displacement `1`; tolerance `0.001`; viewport `{zoom:1,pan:[0,0]}` | Finite bounded physics parameters plus response zoom `0.25..16` and pan `[-8,8]²` |
| `/sequence` | playhead `0`; viewport `{zoom:1,pan:0}`; rate `1`; `loop:false`; `program:null` | Bounded playhead, timeline zoom `0.25..16` and pan, authored rate/loop, and bounded JSON-safe public `ProgramSpec`; never selection/focus or realm-bound `ResolvedAnimationPlan` |

Cube, Easing, and Sequence pointer identities and gesture phases are transient;
only their settled quaternion/viewport/timeline state is encoded. Keyframes has
no share server. When bounded sequence authoring cannot fit, the UI refuses URL
sharing and offers an explicitly downloaded, versioned local JSON artifact.

Quaternion URL tuples are finite, normalized and reject near-zero norms.
Canonical hemisphere is `w > 0`; when `w === 0`, the first nonzero of `x,y,z`
is positive. Encoding converts `-0` to `0`. A noncanonical quaternion refuses;
it is never silently rewritten in place.

## Ownership and gates

| Concern | Owner waves | Closure |
|---|---|---|
| Shared codec law and generated schemas | D02, M01–M02 | D25, M11, C07–C09 |
| Value route defaults and reducers | D01–D03, D06N–D24 | D25 |
| Immutable palette/share resources | A06–A14, A22S–A23S | A26, C03, C06 |
| Keyframes scene state | K02, K10–K12, M01–M10 | M11 |
| Security/privacy | A05, A20, D19–D24 | C06 |

Born-RED proof must include noncanonical payloads, duplicate keys, wrong-route
envelopes, future versions, pathological numeric values, oversized state,
clipboard denial, popstate storms, interrupted gestures, and URLs captured from
every route at every π viewport. A codec is not green merely because its own
encoder can decode its own output.
