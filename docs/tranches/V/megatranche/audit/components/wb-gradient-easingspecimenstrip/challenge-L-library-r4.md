# CHALLENGE-L (r4) — library structure · `EasingSpecimenStrip.vue`

## Model receipt

I observe myself to be **Opus 5 (1M context)**, exact model id `claude-opus-5[1m]` — the tier this
seat was spawned with, declared explicitly. Not inherited, not undeclared.

---

## Provenance — why `-r4`

The brief names `challenge-L-library.md`. That path was occupied when this seat opened, and so was
one successor:

```
$ ls -la docs/tranches/V/megatranche/audit/components/wb-gradient-easingspecimenstrip/
-rw-r--r--  46102  Jul 28 11:06  challenge-L-library.md      ← r2, findings L-1…L-13
-rw-r--r--  34440  Jul 28 17:34  challenge-L-library-r3.md    ← r3, findings L3-1…L3-8
```

Overwriting either destroys standing evidence no reading of the brief requires. The sibling corpus
establishes the house form for exactly this case:

```
$ ls wb-gradient-easingeditor/ | grep -i challenge-L
challenge-L-library-r2.md
challenge-L-library-r3.md
challenge-L-library-r4.md
challenge-L-library.md
```

This pass follows it. **I read both prior passes only after finishing my own derivation**, so that
novelty and corroboration could be separated honestly. Both are separated below. r2 and r3 are
strong; this pass claims **four novel findings** and one **correction to a standing r2 premise** —
and that correction is the strongest single result on this axis.

**No source edits landed from this seat.** The only file written is this report.

- **Subject:** `demo/workbenches/gradient/GradientVisualizer/easing/EasingSpecimenStrip.vue` (216 lines)
- **Corpus:** `easingCatalogue.ts` (231) · `useSpecimenRows.ts` (74) · `EasingAuthoringStage.vue` (116) ·
  host `GradientEasingEditor.vue` (295) · `package.json#exports` · `src/subpaths/` ·
  `src/foundation/math.ts` · `test/math.test.ts` · `test/v4-c1.test.ts` · `@mkbabb/glass-ui@7.0.0` dist
- Branch `tranche-u`, HEAD `c654824e`. Live probes against the dev server on `:9000`.

## Verdict

**DEFECTIVE.** One BLOCKER (novel, and it overturns r2's L-2 premise), three MAJOR/MINOR novel
findings, four independently corroborated.

r2 named the dominant mechanism as *published surfaces under-specify what they already know*. r3
found a second: *the persisted model is typed by a widget's `v-model` payload*. This pass finds a
third, and it is nastier than both, because it inverts the shape of the first:

> **The capability is not missing. It is published, unit-tested, pinned into the public-export
> census — and wrong.** value.js ships a `cubic-bezier()` serializer, asserts a rounding law for it
> in two test files, and that law disagrees with what the application actually emits for **29 of 30**
> presets. The symbol has zero production callers. r2 concluded the serializer was absent; it is
> present and unusable, which changes the cure from *add a function* to *retire a published symbol
> and re-home the concept* — a semver event, not an addition.

---

# Novel findings

## R4-1 — BLOCKER · the `cubic-bezier()` serializer is not missing: it is published, tested, census-pinned, dead, and byte-wrong · **corrects r2 L-2's premise**

r2's L-2 states, in bold:

> *"`grep -rn "export function serialize" src/` returns `serializeCssValue`, `serializeCssColor`,
> `serializeKeyframeSelector`, `serializeTimelineOptions` — **there is no `serializeTimingFunction`
> anywhere in `src/`.**"*

The grep is accurate and the conclusion does not follow: the function exists under a name that
cannot match `serialize`.

**`src/foundation/math.ts:113-120`:**

```ts
export function cubicBezierToString(x1: number, y1: number, x2: number, y2: number) {
    const formatNumber = (n: number) => {
        let s = n.toFixed(2);
        return s;
    };

    return `cubic-bezier(${formatNumber(x1)}, ${formatNumber(y1)}, ${formatNumber(x2)}, ${formatNumber(y2)})`;
}
```

It is **on the published surface**, not an internal:

| fact | evidence |
|---|---|
| exported from the `/math` barrel | `src/subpaths/math.ts:16` |
| present in the shipped build | `dist/subpaths/math.js`, `dist/subpaths/math.d.ts` (grep confirms both) |
| reachable by a real consumer | `package.json#exports["./math"]` → `./dist/subpaths/math.js` |
| unit-tested, 6 assertions | `test/math.test.ts:407-436` |
| **pinned into the public-export census** | `test/v4-c1.test.ts:333-336` |

The rounding law is not incidental — it is **asserted**, twice, by name:

```ts
// test/math.test.ts:412-414
it("should format numbers to two decimal places", () => {
    const result = cubicBezierToString(0, 0, 1, 1);
    expect(result).toBe("cubic-bezier(0.00, 0.00, 1.00, 1.00)");
});
// test/math.test.ts:432-434
expect(cubicBezierToString(0.123456, 0.789012, 0.345678, 0.901234))
    .toBe("cubic-bezier(0.12, 0.79, 0.35, 0.90)");
```

and the census locks the symbol into `/math`'s surface:

```ts
// test/v4-c1.test.ts:333-336
expect(Object.keys(math).sort()).toEqual([
    "clamp", "cubicBezier", "cubicBezierToString", "deCasteljau", "interpBezier",
    "lerp", "lerpArray", "logerp", "scale",
]);
```

**It has zero production callers.**

```
$ grep -rn 'cubicBezierToString' src/ demo/ test/ e2e/ node_modules/@mkbabb/glass-ui/dist/*.js
src/subpaths/math.ts:16              ← the re-export
src/foundation/math.ts:113           ← the definition
test/v4-c1.test.ts:334               ← the census
test/math.test.ts:11,407,409,414,419,427,432   ← its own unit tests
```

Nothing in `demo/`, nothing in `e2e/`, nothing in glass-ui.

**And it is byte-incompatible with the law that actually ships.** Measured against the demo's
`bezierLiteral` (`easingCatalogue.ts:48-51`) over the full published preset corpus:

```
$ node --input-type=module -e "
import { cubicBezierToString } from './dist/subpaths/math.js';
import { bezierPresets } from './dist/subpaths/easing.js';
const bezierLiteral = (q) => { const [x1,y1,x2,y2] = q.map(n => +n.toFixed(3));
                               return \`cubic-bezier(\${x1}, \${y1}, \${x2}, \${y2})\`; };
…"
linear         LIB: cubic-bezier(0.00, 0.00, 1.00, 1.00)   DEMO: cubic-bezier(0, 0, 1, 1)
ease           LIB: cubic-bezier(0.25, 0.10, 0.25, 1.00)   DEMO: cubic-bezier(0.25, 0.1, 0.25, 1)
ease-in        LIB: cubic-bezier(0.42, 0.00, 1.00, 1.00)   DEMO: cubic-bezier(0.42, 0, 1, 1)
ease-out       LIB: cubic-bezier(0.00, 0.00, 0.58, 1.00)   DEMO: cubic-bezier(0, 0, 0.58, 1)
ease-in-out    LIB: cubic-bezier(0.42, 0.00, 0.58, 1.00)   DEMO: cubic-bezier(0.42, 0, 0.58, 1)
smooth-step-3  LIB: cubic-bezier(0.65, 0.00, 0.35, 1.00)   DEMO: cubic-bezier(0.65, 0, 0.35, 1)
---
presets: 30   literal MISMATCHES lib-vs-demo: 29
```

**The three laws compose exactly.** r2 measured glass ≡ demo (`bezier: 30 compared, 0 mismatched`).
This pass measures library ≢ both, 29 of 30. So: two consumers agree with each other by hand-mirrored
comment, and the **library — the only party that owns the grammar — disagrees with both.** The `/math`
surface therefore advertises a `cubic-bezier()` minter that no shipped code can use. That is the
CHALLENGE-L failure mode named in the brief — *a false proof of the public API* — realised not by a
deep import but by a published symbol nobody can adopt.

Worse, adopting it is **not possible without breaking the app.** `interval.css` is the persisted
identity truth, and `tileIdFor()` (`easingCatalogue.ts:220`) matches tiles by literal string equality
against it. Swapping in the library's 2-decimal form would fail identity for all 30 tiles. The
library's serializer is not a neglected alternative to the consumers' copies; it is **wrong for the
domain**, which is why two independent teams forked away from it and neither reported it.

**Reproduction:** the node comparison above, deterministic, against `dist/` at HEAD `c654824e`.
Corroborating greps quoted inline.

**Why this changes r2's cure.** r2 prescribed *"value.js `/css` exports the exact inverse of what it
already parses"* — correct, but incomplete, because it assumed a green field. The real sequence is:

1. **Add** `serializeTimingFunction(ast: CssTimingFunction): string` to `src/css/` — the grammar's
   home, beside `parseTimingFunction`, mirroring the `parseCssColor`/`serializeCssColor` symmetry the
   library already got right. Emit the CSS-canonical minimal form (`+n.toFixed(3)`) — the form both
   consumers independently converged on. **Convergence between two unrelated implementations is the
   spec signal;** the library's `toFixed(2)` is the outlier, not the authority.
2. **Retire** `cubicBezierToString` from `src/foundation/math.ts` and `src/subpaths/math.ts`. This is
   a **published-surface removal** — a major-version event for `@mkbabb/value.js`, and the reason
   this is a BLOCKER rather than a MAJOR: it must be sequenced with a version cut, not slipped into a
   wave. Delete `test/math.test.ts:407-436` (6 assertions pinning a law we are rejecting) and drop the
   symbol from the `test/v4-c1.test.ts:334` census.
3. **Delete** `bezierLiteral` / `stepsLiteral` (`easingCatalogue.ts:48-56`) and the 8-line comment
   block at `:38-45` that codifies the duplication as law. A cross-repo invariant maintained by
   comment is the defect; the comment is not the fix.
4. **Relay to glass BJ:** `useEasingPicker.readout` consumes `serializeTimingFunction`. Byte-identity
   then holds **by construction**, and r2's observation that the whole invariant is guarded by exactly
   one e2e assertion on one preset (`o17-easing-composition.spec.ts:189-192`) stops mattering, because
   there is nothing left to drift.

Also dying with it: `formatNumber` (`src/foundation/math.ts:114-117`), a closure whose entire body is
`let s = n.toFixed(2); return s;`, re-allocated on every call.

---

## R4-2 — MAJOR · MT-F030: the house already mints the missing register, and it is dead · **`--radius-strip`**

r2's L-12 censuses the radii correctly (I reproduce its numbers below) and then **invents** a cure — a
halving derivation law, 16 → 8 → 4. That is a reasonable law. It is also unnecessary: glass already
ships a role token for precisely the register in dispute, and nothing uses it.

```
$ cat node_modules/@mkbabb/glass-ui/dist/styles/theme/radius.css
@theme { --radius: 0.625rem; --radius-xs: 4px; --radius-sm: 4px; --radius-md: 6px;
         --radius-xl: 12px; --radius-2xl: 1rem; --radius-3xl: 1.5rem; --radius-pill: 9999px;
         --radius-lg: var(--radius); --radius-card: var(--radius-2xl);
         --radius-panel: var(--radius-xl); --radius-dialog: var(--radius-card);
         --radius-input: var(--radius); --radius-button: var(--radius);
         --radius-field: var(--radius-2xl); --radius-strip: 0.75rem;      ← 12px
         --radius-control: var(--radius-pill); --radius-badge: var(--radius-pill); … }
```

Uses, exhaustively:

```
$ find node_modules/@mkbabb/glass-ui/dist -name '*.css' -print0 | xargs -0 grep -ho '[^;{}]*radius-strip[^;]*;' | sort -u
 --radius-strip: 0.75rem;          ← the declaration, and nothing else

$ grep -rn 'radius-strip\|rounded-strip' demo/ | wc -l
0
```

**One declaration, zero consumers, in either repo.** The design system minted a 12px *strip* register
— sitting exactly between the 6px control step and the 16px card — named after the exact element
class the owner is complaining about, and no surface in the corpus derives from it.

This matters for the disposition, not just the tidiness. r2's halving law would put the ramp strip and
readout rail at 8px — a value the house does not name. Using `--radius-strip` (12px) puts them on a
role-bearing token that already exists, which is what edict 5 (root-level, role-bearing styling)
actually asks for, and it removes the need to legislate a new derivation clause into DESIGN.md at all.

**Corroborated radius census** (my own live measurement, agreeing with r2's L-12 and r3's numbers):

| element | declaration | file:line | measured |
|---|---|---|---|
| `.fading-scroll` port | none | — | **0px** |
| `.rail-btn` | `var(--radius-input)` | `GradientEasingEditor.vue:274` | **4px** |
| ramp strip | `rounded-md` | `GradientEasingEditor.vue:153` | **6px** |
| `.readout-rail` | `rounded-md bg-well` | `GradientEasingEditor.vue:176` | **6px** |
| row card | `rounded-card` | `GradientEasingEditor.vue:114` | **16px** |
| `.specimen-dot` | `9999px` literal | `GradientEasingEditor.vue:242` | **9999px** |
| `.specimen-tile` | glass Chip cell | (none local) | **9999px** on 45×44 |
| `.glass-card` well | glass, radius not overridden | `EasingAuthoringStage.vue:93` | 16px |

`{0, 4, 6, 16, 9999}` — five registers in one 462×585 card.

**Proposed register, using only tokens that already exist:**

| element | today | proposed |
|---|---:|---|
| ramp strip, readout rail | 6px `rounded-md` | `--radius-strip` (12px) — the register's own token |
| `.rail-btn` | 4px `--radius-input` | `--radius-md` (6px) — `--radius-input` is a *text-input* role token, the wrong role for an icon ghost button, and is 4px only by the accident below |
| row card, authoring well | 16px | unchanged, `--radius-card` |
| `.specimen-dot` | `9999px` literal | `var(--radius-pill)` — the point register, via the token |
| `.specimen-tile` | 9999px | `--radius-card`, which lands **for free** the moment glass unorphans its CSS (R4-5) |

Two authored registers plus the pill for points, zero raw Tailwind steps, and no new derivation law.

**Refinement to r2 L-12 item 2 (not a novelty — credit r2).** r2 correctly found `--radius-input`
measuring `0.25rem` instead of glass's declared `0.625rem`, and attributed the winning `--radius:
0.25rem` to a Tailwind stock block inside glass's `dist/styles/components.css` imported at
`layer(components)`. I confirm the value and add the upstream origin:

```
$ grep -rn -- '--radius:' node_modules/tailwindcss/theme.css
node_modules/tailwindcss/theme.css:508:  --radius: 0.25rem;

$ find node_modules/@mkbabb/glass-ui/dist -name '*.css' -print0 | xargs -0 grep -ho -- '--radius: *[^;]*;' | sort -u
--radius: 0.25rem;
--radius: 0.625rem;
```

Measured live: `getComputedStyle(document.documentElement).getPropertyValue('--radius')` → **`0.25rem`**.

The root cause is upstream of both repos and is a **naming collision**: `--radius` is a Tailwind v4
stock theme variable, and glass chose the same name for its base radius. Any Tailwind consumer of
glass loses glass's base, and every derived token (`--radius-input`, `--radius-button`, `--radius-lg`)
silently collapses 10px → 4px. **Cure is FOLD-on-glass: rename to `--radius-base`.** A demo-side
`:root` re-assertion would be the masking fallback — do not. (r2 books the doc drift on the DESIGN.md
§Radii row; agreed, and the token rename is the upstream half of the same row.)

---

## R4-3 — MAJOR · the accessible name is on the wrong element: glass's focusable scroll port is unnamed while a non-scrollable div carries the label, and `FadingScroll` publishes the door

Measured live on `/#/gradient`:

```
port (.fading-scroll):  tabIndex 0,  role null,  ariaLabel null,
                        overflowX "auto",  scrollWidth 1482,  clientWidth 436
.strip-row:             role "group",  ariaLabel "Easing curve specimens",  scrollable false
portClasses:            "fading-scroll fading-scroll--x specimen-strip"
```

glass puts `tabindex="0"` on the scroll port, so **the port is a tab stop** — with no role and no
accessible name. Meanwhile `EasingSpecimenStrip.vue:86-90` puts the group role and the label on
`.strip-row`, measured `scrollable: false` — the inner content wrapper, not the scroll region.
Keyboard focus lands on an unnamed generic; the name decorates a non-interactive div.

`FadingScroll` publishes exactly the right door
(`node_modules/@mkbabb/glass-ui/dist/components/fading-scroll/FadingScroll.vue.d.ts`):

```ts
/** Name the scroll port and expose it as a region. */
ariaLabel?: string;
/** Reference visible naming text and expose the scroll port as a region. */
ariaLabelledby?: string;
```

The docstrings state the exact semantics the component hand-rolled one level in, and neither prop is
passed. Edict 4: the design system offers the primitive; the demo reimplemented it. This is distinct
from r2's L-7 (the `.closest('.fading-scroll')` class reach) and from r3's L3-4 (27 tab stops →
`ToggleGroup`); neither notices that the focusable port is nameless.

Two adjacent points, recorded with it:

**(a) The "documented DOM contract" claim is false.** `EasingSpecimenStrip.vue:59-60` calls
`.fading-scroll` *"its documented DOM contract."* The string `fading-scroll` appears in **no `.d.ts`**
anywhere in glass's dist; the published surface is the five props above plus `useFadingScroll`,
`NATIVE_SCROLL_TIMELINE`, `SNAP_TOLERANCE`; there is no `defineExpose`. The class is a CSS hook in
`styles/utilities/base-misc.css` — and glass's own docstring for `NATIVE_SCROLL_TIMELINE` already
mis-cites its home as `utilities/base.css`. The "contract" was drifting inside the producer before any
consumer read it. (Sharpens r2 L-7's mechanism.)

**(b) `useFadingScroll` already solves the arithmetic this component hand-rolls.** The reveal at
`EasingSpecimenStrip.vue:62-76` computes nearest-edge deltas from raw `getBoundingClientRect()`.
glass's composable publishes `normalizeHorizontalScrollLeft(scrollLeft, max, direction, type)` —
*"Normalize every browser RTL scrollLeft model to distance from inline-start"* — precisely the case
the hand-rolled arithmetic does not handle. `shots/rtl-desktop/gradient.png` and
`shots/rtl-mobile/gradient.png` exist in the capture matrix; whether the reveal misbehaves under RTL
I did not test — **that specific consequence is a hypothesis.** The structural point stands without
it: the producer owns the port and its scroll model, so *"keep the selected child in view on the
inline axis"* belongs there, as a `scrollToActive` prop (r2 L-7 / r3 reach the same cure).

**Cure.** `aria-label` moves onto `<FadingScroll>`; `role="group"` leaves `.strip-row` (it is not a
group once the port is a named region, and r3's L3-4 `ToggleGroup` supersedes it entirely).

---

## R4-4 — MINOR · `var(--motion-accent, var(--foreground))` is a live second path that silently discards the D6 contrast certification

`EasingSpecimenStrip.vue:204-211`:

```css
.specimen-tile[data-state="on"] .tile-glyph path { stroke: var(--motion-accent, var(--foreground)); }
.specimen-tile[data-state="on"] .tile-label      { color:  var(--motion-accent, var(--foreground)); }
```

The custom property is set **conditionally** by the host — `GradientEasingEditor.vue:115`:

```vue
:style="row.ink ? { '--motion-accent': row.ink } : undefined"
```

and `row.ink` is typed `string | null` (`useSpecimenRows.ts:32`), produced by
`safeCss(mid)` (`:68`) — the contrast-safe accent solver whose whole purpose (`useSpecimenRows.ts:7-9`)
is *"the eased ramp midpoint, contrast-certified against the resting plate (the D6 house guard)"*.

So when certification declines to yield an ink, the pressed tile inks to raw `--foreground` and the
guard is **bypassed rather than reported** — the selected state's contrast becomes uncertified, and
nothing surfaces it. Two paths, one of which quietly drops the guarantee: edict 2, masking fallback.
Not covered by r2 L-9 (`isStepsInterval` dual-truth) or by r3.

**Labelled honestly: the trigger condition is a hypothesis.** I did not establish that `safeCss` can
return `null` in practice. The two code paths, the conditional binding, and the `| null` in the type
are all confirmed by the citations above. Either way the resolution is a deletion: if `null` is
unreachable, both the CSS fallback and the `| null` are dead and should go; if it is reachable, the
degradation must be explicit, not a CSS fallback.

---

# Corroboration — findings I re-derived independently before reading r2/r3

Recorded because independent reproduction outranks citation, and because two of these are the marks
the brief requires this seat to judge.

| prior id | claim | this seat's independent evidence |
|---|---|---|
| r2 L-5 / r3 corrob. | **M3 / I-9** — glass 7 Chip CSS orphaned | `find … -name '*.css' -print0 \| xargs -0 grep -c glass-chip` → **only `styles/glass/glass-chip.css:1`, itself**; `glass.css` lists 18 `@import "./glass/*"` and omits it; **runtime: 0 `.glass-chip*` rules across 45 loaded sheets** |
| r2 L-1 / r3 corrob. | catalogue drops 6 of 30 presets | replayed `familyLabelFor` against `bezierPresets`: 30 presets → 9 families → `FAMILY_ORDER` keeps 7 → **quart(3) + quint(3) dropped**, 24 bezier + 3 steps = **27**; live DOM `tileCount: 27`, `familyCount: 8` |
| r2 L-12 / r3 corrob. | **MT-F030** radius incoherence | measured `{0, 4, 6, 16, 9999}` px in one 462×585 card (table in R4-2) |
| r2 L-3 | reduced motion has 5 homes | enumerated all 5 with the reactive/non-reactive split (below) |
| r2 L-11 | `tsconfig.demo.json#paths` rotted from `package.json#exports` | independently measured: exports has **7** keys and **no `.`** while the file's comment claims *"a CLOSED 8-key set"*; `paths` declares phantom `.`/`parsing`/`units` (and `ls dist/*.d.ts` → no matches) and omits `/value` + `/css`, the latter with 10 demo importers. **r2's addition is stronger than mine** — it traced `ts.resolveModuleName` and proved the block *inert* (TS self-reference resolves all seven through `exports` anyway). Cure stands: delete the entries. |
| r2 L-6 | per-instance override of the Chip cell geometry | `.specimen-tile` (`:163-170`) overrides the producer's `SHAPE.cell` recipe `"glass-chip--cell flex-col gap-1.5 px-2 py-2.5 text-micro"`; glass's `SIZE` map has only `sm\|md\|lg` — no rung reaches specimen scale, so the variant belongs in glass (`size="xs"`) |
| r3 L3-2 | `test/` imports `demo/` | `grep -rln '"\.\./demo/' test/ \| wc -l` → **10** files; `demo/test/` exists and is already wired (`vitest.config.ts:21`) |

**M3 mechanism, sharpened for the relay.** The orphan is not merely "incomplete glass" — it has a
precise causal chain, and it is the mechanical cause of half of OM-4:

1. Chip's base class list is `"glass-chip glass-capsule accent-tone …"` (`dist/chip-DFZQr6rV.js`).
2. `glass-capsule.css` **is** imported and sets `border-radius: var(--radius-pill)`.
3. The only rule that would override it —
   `.glass-chip--cell, .glass-chip--cell.glass-capsule { border-radius: var(--radius-card); }` —
   lives in the orphaned file.
4. ⇒ measured **9999px on a 45×44 box**. `data-shape="cell"` *is* present on the element (measured):
   the producer honours the prop, only its CSS is unreachable. **These are the owner's "full-circle
   preset chips."**

And the entire selection affordance is dead. Pressed vs unpressed, measured:

```
pressedTile   { dataState:"on", backgroundColor: oklab(0.925644 0.0094459 0.0291917/0.83872),
                borderColor: rgb(198,180,159), backgroundImage:"none", chipFloodT:"" }
unpressedTile {                backgroundColor: oklab(0.925644 0.0094459 0.0291917/0.83872),
                borderColor: rgb(198,180,159),                        chipFloodT:"" }
```

Byte-identical fill and border. `--chip-flood-t` is the **empty string** — its `@property`
registration is in the orphaned file, so the custom property is not even registered. Dead with it:
the `--accent-band` fill, `--accent-edge` border, `--accent-ink` text, the `plus-lighter` radial
flood, and the `scale: calc(1 + 0.12 * …)` punch. `--accent-band` *resolves*
(`accent-tone.css` is imported) but no rule consumes it. The only surviving pressed cue is the demo's
own ink change at `:204-211`. This makes the component's docblock claim at `:160-162` — *"The producer
Chip cell recipe … carries press/hover semantics **+ the pressed wash**"* — **false in the shipped
build** (r2 records this too).

**Disposition, exactly as briefed: FOLD-banked on glass, extend mark M3 with the mechanism. No local
CSS lands from this seat.** A local `.specimen-tile { border-radius }` / background patch would
satisfy the owner's eye by papering over an unreachable producer stylesheet, and would break the day
glass fixes the import — MT-F014, the masking fallback the standing edict forbids.

**Relay line for glass BJ:** `dist/styles/glass.css` omits `@import "./glass/glass-chip.css"` (and
there is no `glass-badge.css` at all), so `.glass-chip`, `.glass-chip--cell`,
`.glass-chip--interactive` and `@property --chip-flood-t` are unreachable in every consumer:
`shape="cell"` loses `--radius-card` to `glass-capsule`'s `--radius-pill`, and `mode="selectable"`'s
whole `data-state="on"` treatment is inert. Verified: 0 `.glass-chip*` rules in 45 loaded sheets. Also
orphaned by the same omission: the `@media (pointer: coarse)` `--touch-target` floor (r2 L-6 measures
the tile at 45.2 × 43.8, under glass's own 44px).

**Reduced-motion enumeration** (r2 L-3, my own tally):

| # | site | mechanism | reactive |
|---|---|---|---|
| 1 | **`EasingSpecimenStrip.vue:47`** | `useMediaQuery("(prefers-reduced-motion: reduce)")` | yes |
| 2 | `workbenches/mix/MixAnimationCanvas/composables/useMixingAnimation.ts:71` | `useMediaQuery(…)` | yes |
| 3 | `workbenches/extract/ImageEyedropper/composables/useInertiaGesture.ts:38` | `useMediaQuery(…)` | yes |
| 4 | `color-picker/composables/boot/useOverture.ts:96` | `window.matchMedia(…).matches` | **no** |
| 5 | `color-picker/composables/boot/useDockArrival.ts:26` | `window.matchMedia(…).matches` | **no** |

glass publishes both shapes the demo needs, and its docstring states the invariant all five violate
(`dist/composables/motion/core/useReducedMotion.d.ts`, reachable at `@mkbabb/glass-ui/motion-core`):

```ts
/** Read the current OS preference without subscribing (SSR-safe). */
export declare function readReducedMotion(): boolean;
/** Share one reactive OS preference and one MediaQueryList listener. */
export declare function useReducedMotion(): Readonly<Ref<boolean>>;
```

For this component the fix is one line, and it drops the file's only `@vueuse/core` dependency.

---

## Recorded non-finding

`REPORT.json` lists **12 `bleeding` entries** for `/#/gradient` in all four Safari matrices, and all
12 are this component's subtree (`div.strip-row`, `div.strip-family`, `span.family-eyebrow`,
`div.family-tiles`, `button.glass-chip.glass-capsule` ×3, `svg` ×2, `path` ×2, `span.tile-label`).
**Not a defect.** `capture.mjs:107-111` flags any element whose `getBoundingClientRect().right`
exceeds `clientWidth` — the intended state of horizontally-scrolled content in an `overflow-x: auto`
port. `overflowX` is `0` in all four matrices and the route does not appear in the report's
`horizontalOverflow` section (`REPORT.md:19` — *"horizontalOverflow — 0 · _none_"*). Measured
`scrollWidth 1482 / clientWidth 436, overflow-x: auto` — correctly clipped. r3 records the same
negative; I confirm it so no later seat files it from the JSON.

---

## What the Safari captures show

Read: `owner-marked/OM-4-easing-radius-incoherence.png`, `shots/safari-desktop-light/gradient.png`,
`shots/safari-desktop-dark/gradient.png`.

The open interval row is a 16px card holding, top to bottom: a 6px ramp bar; a scrolling strip of
**perfect circles**, each carrying a sparkline and a mono label, grouped under `css` / `sine` eyebrows
with hairline dividers; then a 6px readout well with `cubic-bezier(0, 0, 1, 1)` and two nearly-square
(4px) ghost buttons. In both schemes the pressed tile (`linear`) differs from its neighbours **only by
ink colour** — fill, border and elevation identical. The desktop capture also shows the strip clipped
mid-family at the pane's right edge: 8 of 27 tiles visible, with the next family's divider hairline
cut, and no visible affordance that 19 more exist.

**The split the brief demands.** *"Too rounded in some areas"* = the 9999px tiles = **glass's**, cause
proven above, cure = FOLD on M3. *"Not rounded enough in others"* = the 6px rails and 4px buttons
inside a 16px shell = **ours** — and partly a *token* defect (R4-2), because `--radius-input` never
held the value the design authority documents, and because the register the owner wants
(`--radius-strip`, 12px) is already minted and unused.

---

## Greenfield lattice

r2 §Greenfield and r3 §Greenfield state this well and I do not restate them. Two amendments follow
from this pass:

1. **`@mkbabb/value.js/css` gains `serializeTimingFunction`, and `/math` LOSES
   `cubicBezierToString`.** r2's lattice shows only the addition. The subtraction is the load-bearing
   half: leaving a second, byte-different, published minter alive is the dual path (edict 2), and
   removing a published export is a semver event that must be scheduled with a version cut. The
   correct end state is one minter, in the module that owns the grammar, with
   `parseTimingFunction ∘ serializeTimingFunction ≡ id` as a round-trip property test over the whole
   `bezierPresets` corpus — the symmetry the library already has for colours.

2. **The radius layer needs no new law.** r2 proposes a halving derivation clause for DESIGN.md.
   `--radius-strip` (12px) already exists between `--radius-md` (6) and `--radius-card` (16). The
   corpus should consume the role tokens the house already mints, and glass should rename its base
   `--radius` → `--radius-base` to end the Tailwind collision. Fewer laws, not more.

Otherwise: taxonomy → value.js `/easing` (r2 L-1, r3), model owns its interval as `{ css: string }`
(r3 L3-1), the strip becomes a `ToggleGroup` singleton bound to the open interval (r3 L3-4, r2 L-4),
`easingCatalogue.ts` dissolves, and demo assertions move to `demo/test/` (r3 L3-2). The dependency
direction after all of it: **`value.js → glass-ui → demo`, strictly** — three edges run against it
today (demo re-deriving library serialization, demo re-deriving library taxonomy, `test/` importing
`demo/`).

---

## Dispositions

| id | severity | disposition |
|---|---|---|
| **R4-1** | **BLOCKER** | **value.js version-cut wave.** Add `serializeTimingFunction` to `src/css/`; **retire** `cubicBezierToString` from `src/foundation/math.ts` + `src/subpaths/math.ts` + `test/math.test.ts:407-436` + the `test/v4-c1.test.ts:334` census; delete `bezierLiteral`/`stepsLiteral` and the `:38-45` comment; relay to glass BJ so `readout` consumes it. Supersedes r2 L-2's premise. |
| **R4-2** | **MAJOR** | Local: adopt `--radius-strip` / `--radius-md` / `--radius-card` / `--radius-pill`; token not literal at `GradientEasingEditor.vue:242`. **FOLD on glass:** rename `--radius` → `--radius-base` (Tailwind collision). Sequence **after** M3. Retires r2 L-12's proposed derivation clause as unnecessary. |
| **R4-3** | **MAJOR** | Local: `aria-label` onto `<FadingScroll>`. **Relay to glass BJ:** `scrollToActive` prop; document the port contract in `.d.ts` (it currently exists only as a CSS class). Composes with r2 L-7 + r3 L3-4. |
| **R4-4** | **MINOR** | Local: resolve `SpecimenRow.ink`'s nullability, then delete either the CSS fallback or the `\| null`. |
| M3 / I-9 | BLOCKER (glass) | **FOLD-banked on glass**, mechanism above. **No local CSS from this seat** (MT-F014). |
| r2 L-1, L-3, L-4, L-6, L-11 · r3 L3-1…L3-8 | as filed | corroborated where measured above; dispositions stand as written in those passes. |
