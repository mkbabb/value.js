# CHALLENGE-L — PaletteCard: the library structure underneath (pass 3)

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, the tier declared
at spawn. The seat is declared, not inherited.

- Repository: `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `7cae8bd0`
  (the task named `c654824e`; the tree advanced by one docs commit during the wall-interrupted
  harvest — no source file in this component's cone differs)
- Subject: `demo/palettes/browser/card/PaletteCard/PaletteCard.vue` (364 L) + its five folder
  siblings + `card/composables/` (4 modules) + the two `card/` siblings they consume
- Axis: **library structure** — module boundaries, ownership, dependency direction, public surface
- Design system under test: `@mkbabb/glass-ui@7.0.0` (installed tree read directly, not from docs)
- Live probes: dev server `http://localhost:9000`, Playwright MCP, read-only except `localStorage`
  seeding in the MCP's isolated profile
- Verdict: **DEFECTIVE** — **1 new BLOCKER**, 5 new MAJOR, 2 new MINOR, 1 new INFO, and **one
  prior-pass negative overturned by measurement**

### Supersession notice — nothing lost

Two CHALLENGE-L reports already occupied this path. Both are preserved verbatim:

- `challenge-L-library.pass-1-2026-07-24.md` (14 findings, L-1..L-14)
- `challenge-L-library.pass-2-2026-07-27.md` (10 findings, L-15..L-24, plus a re-verification of
  pass-1's full docket)

Pass 3 does not repeat their evidence. It re-checks their dockets (§6), and it goes at the one thing
**neither pass measured**: the card's *root* — the producer "cartoon register" the card hand-rolls
instead of using `<Card>`. Pass 1 recorded `useLiquidPress` as **"legal"**
(`pass-1 …:73`); pass 2's greenfield lattice recorded **"`./card` Card — already ships;
`cartoon-surface` stays decoration-only"** (`pass-2 …:448`). **Both are wrong.** The register is dead
in the browser, and I measured it dead.

---

## 0. Why pass 3 exists: nobody had measured the card's own root

Pass 2 found two *ownership vacuums* in the expanded card — a class no module defines
(`.floating-panel`) and a position calculation no design-system module owns. Pass 3 finds the **third
and worst instance of the same mechanism, and it is on the collapsed card's root element**, which
means it fires on every PaletteCard in every host, in every route, on first paint.

The mechanism has a name now, and it is the single most important structural statement in this
report:

> **The component consumes design-system internals by string.** Class names, custom-property names
> and child-element shapes are copied out of glass-ui's source into the demo's template as literals.
> Literals do not participate in the type system, do not participate in `exports`, and do not break
> when the producer changes. So when glass-ui 7.0.0 moved, the demo did not — and *nothing failed
> loudly*. Three separate registers are now inert while their source comments still describe them
> working.

---

## L-25 · BLOCKER (new) — the `.cartoon-cast` span is dead markup; the rule it needs is in no stylesheet the app loads

`PaletteCard.vue:28-30` renders the producer's lagging cel caster:

```html
<!-- T.W5-R4 — the producer's inert cel cast (the exact child Card
     emits for surface=cartoon); rides --card-press-t, PRM-zeroed. -->
<span class="cartoon-cast" aria-hidden="true" />
```

**Measured on the live card** (Playwright MCP, `http://localhost:9000/#/palettes`, two seeded local
palettes, single uninterrupted `evaluate`):

```json
{
  "articles": 2,
  "labels": ["Palette: Sunset Ridge", "Palette: Deep Ocean"],
  "cast": { "w": 0, "h": 0, "position": "static", "zIndex": "auto",
            "boxShadow": "none", "display": "inline" },
  "cardRect": { "w": 462, "h": 100 }
}
```

The glass-ui rule this span exists to trigger declares
`position: absolute; inset: 0; z-index: -1; border-radius: inherit; box-shadow: var(--shadow-cartoon-md)`.
The element resolves **`position: static`, `z-index: auto`, `box-shadow: none`, `display: inline`,
0 × 0**. Every declaration is absent.

A full stylesheet scan of the running document (49 sheets, recursive through `@layer`/`@media`)
returns the only `.cartoon-cast` rules present:

```json
{ "cartoonCastRules": [
    { "sel": ".liquid-enter.is-cel > .cartoon-cast", "css": "… position: absolute; inset: 0px; z-index: -1; …" },
    { "sel": ".liquid-enter.is-cel > .cartoon-cast", "css": "… animation … " },
    { "sel": ".liquid-enter.is-cel > .cartoon-cast", "css": "… opacity: 1; " },
    { "sel": ".liquid-enter.is-cel > .cartoon-cast", "css": "… animation: auto …; translate: 0px; scale: 1; " } ],
  "cartoonSurfaceRules": [
    { "sel": ".cartoon-surface", "css": ".cartoon-surface { position: relative; border-width: 2px; box-shadow: var(--shadow-cartoon-md); }" } ] }
```

Four rules, all gated behind `.liquid-enter.is-cel >`. The card carries neither class. **The bare
`.cartoon-cast` rule is not in the cascade at all.**

**Root cause is in the producer package, and it is a packaging defect.** The bare rule lives in
`node_modules/@mkbabb/glass-ui/dist/styles/glass/glass-atom.css`, and that file is imported by
nothing:

```
$ grep -o '@import "[^"]*"' node_modules/@mkbabb/glass-ui/dist/styles/index.css | grep -c glass-atom
0
$ grep -o '@import "[^"]*"' node_modules/@mkbabb/glass-ui/dist/styles/glass.css | grep -c glass-atom
0
$ grep -rn 'glass-atom' --include="*.css" --include="*.js" node_modules/@mkbabb/glass-ui/dist \
    | grep -v 'styles/glass/glass-atom.css:'
badge-u65NClWn.js:56:	glass: "badge-atom--glass glass-capsule glass-atom"
$ grep -c "cartoon-cast" node_modules/@mkbabb/glass-ui/dist/glass-ui.css
0
```

`glass-atom.css` is orphaned inside glass-ui 7.0.0. Every class it defines — `.cartoon-cast`,
`.glass-atom`, `.badge-atom*` — is unreachable for any consumer that imports the published
`@mkbabb/glass-ui/styles` entry, which is exactly what `demo/styles/foundation.css:56-57` does.

**Why this is a library-structure defect and not a styling nit.** The demo took a *string* dependency
on a producer internal. A string dependency cannot be checked by `vue-tsc`, cannot be resolved
through `exports`, and cannot fail a build. The demo's own `tsconfig.demo.json` header celebrates
having "a real `.d.ts` trust boundary" with glass-ui — and the card then reaches straight past that
boundary with a class-name literal. The trust boundary covers the *component* surface and nothing
else, and this component's root is built entirely out of the part it does not cover.

**Reproduction.** `npm run dev`; seed two local palettes into `localStorage["color-palettes"]`;
`#/palettes`; `getComputedStyle(document.querySelector('[role=article] .cartoon-cast')).position` →
`"static"`.

**Cure (transposition, not patch).** Delete the span and the hand-rolled root. Use the primitive:
`<Card cartoon …>` (see L-27) and have **glass-ui** own the caster as Card's own child, so the demo
never names `.cartoon-cast` again. Relay the orphaned `glass-atom.css` to the glass-ui BH inbox as a
producer packaging bug (standing relay edict, `feedback-glassui-bhbi-relay`).

---

## L-26 · MAJOR (new, same mechanism as L-25) — the press drive writes a custom property that nothing reads

`PaletteCard.vue:259-267`:

```js
// T.W5-R4 — the producer press drive (the SAME wiring <Card> carries: the
// shared `press` spring clock, card amplitude, writing --card-press-t for
// the caster travel/spread). …
const press = useLiquidPress({
    pressVar: "--card-press-t",
    shrinkDepth: 0.02,
    maxStretch: 1.03,
});
```

The comment asserts a coupling: `--card-press-t` → caster travel/spread. **glass-ui's caster reads a
different property.** From the producer source:

```css
/* dist/styles/glass/glass-atom.css */
.cartoon-cast {
  --cast-travel: calc(6px * var(--motion-weight) * var(--cartoon-press-t));
  --cast-spread: calc(1 + 0.18 * var(--motion-weight) * var(--cartoon-press-t));
  …
}
/* dist/styles/tokens/property-regs.css */
@property --cartoon-press-t { syntax: "<number>"; inherits: true; initial-value: 0; }
```

`--cartoon-press-t`, not `--card-press-t`. Measured live on the card root:

```json
{ "inlineStyle": "--card-press-t: 0.0000; --flex-vel: 0.0000;",
  "cardPressT": "0.0000",
  "cartoonPressT": "0",
  "castTravel": "0px",
  "castSpread": "1",
  "castTranslate": "none",
  "castScale": "none" }
```

`--cartoon-press-t` sits at its registered initial value `0` — it is never written by anything. And a
recursive scan of every rule in the live document for consumers of either name returns:

```json
{ "readsCardPressT": [], "readsCartoonPressT": [] }
```

**Zero rules read `--card-press-t`. Zero rules read `--cartoon-press-t`.** The spring runs on every
`pointerdown`, writes a property no selector consumes, and the caster it is documented to drive is
not in the cascade anyway (L-25). Only the inline `scale` leg of `pressStyle` survives, and only past
`engageThreshold`.

This is the same mechanism as L-25 — a **string-named** coupling to a producer internal, invisible to
every gate — and the two together mean **the entire "producer CARTOON REGISTER" documented across
`PaletteCard.vue:7-18`, `28-29` and `259-262` does not exist at runtime**, except for the flat
`.cartoon-surface` shadow, which is a static `box-shadow` with no motion at all.

**Cure.** Delete `useLiquidPress` from this component. The press register belongs to `Card` in
glass-ui — one primitive owning its own spring, its own `pressVar` name and its own caster child, so
the name can never desynchronize across a package boundary.

---

## L-27 · MAJOR (new) — glass-ui 7's `Card` refutes the comment that justifies not using it

`PaletteCard.vue:12-15` is the recorded decision for hand-rolling the root:

```
// NOT <Card surface=cartoon>: the ratified Q4/T.W3-1 rung-2 WELL material
// (bg-well) stands — cartoon-surface is decoration-only by producer design,
// so the motion register lands tier-agnostic.
```

That justification was written against an API glass-ui no longer has. The installed 7.0.0
declaration (`node_modules/@mkbabb/glass-ui/dist/components/card/Card.vue.d.ts`):

```ts
export interface CardProps extends SurfaceProps {
    size?: CardSize;
    /** Static Memphis edge treatment; it does not add command behavior. */
    cartoon?: boolean;
    grid?: boolean;
    variant?: CardVariant;
    selected?: boolean;
    metal?: CardMetal;
    …
}
// SurfaceProps: { material?, tier?, surface?, deep?, shadow?, grain?, specular?, class? }
```

`cartoon` is a **boolean prop orthogonal to `material`/`surface`/`tier`** — not a `surface` value.
`<Card cartoon material="…">` is exactly the composition the comment claims is impossible. The
implementation confirms it (`dist/card-Bk96VI2R.js:76`):

```js
class: p(e)("card rounded-card text-card-foreground scrollbar-hidden",
            n.cartoon && "cartoon-surface", n.grid && "paper-grid", f.value, a.class)
```

Two further facts follow from the same file, and both contradict the comments:

1. **`Card` does not render a `.cartoon-cast` child.** Its render is a single `Surface` with a
   default slot. `PaletteCard.vue:28-29`'s "the exact child Card emits for surface=cartoon" is
   false.
2. **`Card` does not wire `useLiquidPress`.** `grep -o "card-press-t\|cartoon-press-t"
   dist/card-Bk96VI2R.js` → **no matches**. `PaletteCard.vue:259-260`'s "the SAME wiring `<Card>`
   carries" is false.

So the hand-roll buys nothing the primitive withholds, and forfeits everything the primitive gives:
`Surface`'s material/tier/specular/grain/deep axes, the `data-*` state contract, the `size` padding
scale, and future producer fixes. The comment is load-bearing documentation that is now
counter-factual — an edict-2 artifact (stale rationale kept alive as if current).

**Cure.** `<Card cartoon material="…" as="div" role="article">` with the well rung landed in glass-ui
(L-28). PaletteCard's root shrinks from a 24-line hand-rolled class expression + a fake cast child +
a press composable to one element with props.

---

## L-28 · MAJOR (new) — the card's material rung is a demo-local fork of glass-ui's Surface axis

The root's material is `bg-well border-card-edge` (`PaletteCard.vue:19`). Both tokens are **demo
property**:

```
demo/styles/foundation.css:136:    --color-card-edge: var(--card-edge);
demo/styles/foundation.css:143:    --color-well: var(--well-bg);
demo/styles/utils.css:105,133:     background: var(--well-bg);
demo/styles/utils.css:135:         border: 1.5px solid var(--card-edge);
$ grep -rl "well-bg\|card-edge" node_modules/@mkbabb/glass-ui/dist/styles/
(no matches)
```

glass-ui's material axis is closed and does not contain it
(`dist/components/surface/Surface.vue.d.ts`):

```ts
export type SurfaceMaterial = "content" | "elevated" | "functional" | "overlay";
```

So "the ratified Q4/T.W3-1 rung-2 WELL material" — the thing the card's whole existence-outside-`Card`
is justified by — is a **fifth material rung invented in `demo/styles/` and never landed in the
design system**. Edict 4 is explicit: variants and primitives belong in glass-ui, not in the demo.
Three demo components already consume it (`ShadowPalette`, `PaletteCardSkeleton`, `PaletteCard` —
`demo/styles/utils.css:42`), which is a design-system-sized constituency living outside the design
system.

Note the compounding: the demo forked a material rung *because* it thought `cartoon` and `material`
could not compose (L-27, false), and then hand-rolled the whole card root *because* of the fork.
One wrong premise generated the entire structure.

**Cure.** Land `well` on glass-ui's `SurfaceMaterial` union and delete `--well-bg`/`--card-edge` from
`demo/styles/`. Then `<Card cartoon material="well">` is the whole root. Relay to the glass-ui BH
inbox.

---

## L-29 · MAJOR (new) — three glass-ui primitives are re-implemented inside this six-file folder

The design system already ships each of these. Producer evidence is the installed `index.d.ts` in
each case.

| demo re-implementation | lines | glass-ui primitive that already exists | producer evidence |
|---|---:|---|---|
| `ActionFeedback.vue` (auto-dismiss success/error chip + own `setTimeout`) | 58 | `Toast`, `Toaster`, `useToast`, `toast()` | `dist/components/toast/index.d.ts` — 8 exports incl. `toast`, `useToast`, `type ToastHandle`, `type ToastOptions` |
| `composables/useHeightTransition.ts` (JS height morph, 2 forced reflows, inline `transition` strings, hardcoded 350/250 ms + two hardcoded cubic-beziers) | 88 | `ExpandableContainer` (`open` v-model, `surface`, slots) | `dist/components/expandable-container/index.d.ts`, `ExpandableContainer.vue.d.ts` |
| `PaletteCardMeta.vue:36-40` tag chips + `PaletteCardSwatches.vue:8-11` slug pill (two different hand-rolled `rounded-full` pills, in one component folder) | ~10 | `Chip` + `chipVariants` + `ChipProps` | `dist/components/chip/index.d.ts` |

`useHeightTransition.ts` is the most self-incriminating: its own header comment says the two
easings "match `--ease-out-expo`" and "match `--ease-standard`" — i.e. it inlines the *numeric
values* of two design-system tokens as JS string literals, which is the string-coupling mechanism of
L-25/L-26 again, one layer down. Token drift in glass-ui will silently desynchronize this card's
expand rhythm from every other expanding surface in the app.

This also settles a question pass 2 left open. Pass 2's lattice proposed inventing
`glass-ui ./chip FeedbackChip`. It does not need inventing: `./toast` and `./chip` both already ship.
The correct move is *adoption*, not addition.

**Cure.** Delete all three. `ActionFeedback` → `useToast()` driven by port state (which also kills
pass-1 L-5's `defineExpose` + `cardRefs` channel and pass-1 L-11's undisposed timer). The expand →
`<ExpandableContainer v-model:open>` (which also kills pass-2 L-21's PRM-piercing `scrollIntoView`).
The two pills → `<Chip>`.

---

## L-30 · MAJOR (new) — a leaf menu component hard-couples to the app-root transport provider, and *throws* without it

`PaletteCardMenu.vue:179,216`:

```ts
import { useApiClient } from "../../../../platform/transport/useApiClient";
const { availability } = useApiClient();
```

`demo/platform/transport/useApiClient.ts:53-62`:

```ts
export function useApiClient(): ApiClient {
    const client = inject(API_CLIENT_KEY);
    if (!client) {
        throw new Error(
            "useApiClient() requires an API_CLIENT_KEY provider — call provideApiClient() at App root.",
        );
    }
    return client;
}
```

The edge is `demo/palettes/browser/card/PaletteCard/` → `demo/platform/transport/` — a **four-level
climb out of the feature tree into the platform/boot layer**, made by the deepest leaf in the tree.
It is not optional and not guarded: `PaletteCard.vue:83-106` renders `PaletteCardMenu`
unconditionally, so **PaletteCard cannot be mounted anywhere the App root has not run
`provideApiClient()`** — not in a unit test, not in a fixture harness, not in a design gallery. The
component's testability is gated on the network layer being provisioned.

The dependency direction is inverted. A card menu's business is *what actions exist*; whether the
backend is reachable is the **pane's** knowledge, and the panes already own ports
(`BROWSE_PORT_KEY` / `LIBRARY_PORT_KEY`, per pass-2 §2). `useApiClient`'s own docstring names its
intended consumers as "`ApiOfflineChip`, `PaletteCardMenu`" — the design intent was for a leaf to
read transport, which is the structural error, stated in the source.

Note it also compounds pass-1 L-4: `apiOffline` disables `publish` and the visibility flip, but the
*other* menu items have no availability knowledge at all, so the menu is inconsistent about the very
state it reached across the boundary to obtain.

**Cure.** The port supplies `CardAction[]` with a `disabled`/`reason` per action. The menu renders
what the port offers and imports nothing from `platform/`. `useApiClient` then has exactly one
consumer (`ApiOfflineChip`), which is the right one.

---

## L-31 · MINOR (new) — `swatchClass` is a raw Tailwind class string as a public prop

`PaletteCard.vue:194-197`:

```ts
/** CSS class(es) for swatch size override (default: "w-9 h-9 sm:w-10 sm:h-10") */
swatchClass?: string | undefined;
…{ layout: "default", swatchClass: "w-9 h-9 sm:w-10 sm:h-10" }
```

Threaded through `PaletteCardSwatches.vue:83` → `SwatchHoverMenu` `:size-class`. Its one caller:

```
demo/workbenches/extract/ExtractWorkbench.vue:150:  swatch-class="w-12 h-12 sm:w-14 sm:h-14"
```

This is a per-instance styling override in prop clothing — edict 5, which requires styling at the
root component level. The axis being expressed is *size*, and the design system already names it:
`SIZES = ["xs","sm","md","lg","xl"]` (`dist/components/_shared/axes.d.ts`). A `size` prop on the
Swatch primitive (pass-2 §2 already wants a `glass-ui ./swatch`) makes the class string
unrepresentable and gives the extract workbench a named intent instead of two breakpoint literals it
must keep in sync by hand.

---

## L-32 · MINOR (new) — the card advertises a click affordance it does not have in 2 of its 5 hosts

`PaletteCard.vue:19` puts `cursor-pointer` on the root **unconditionally**, and line 26 emits `click`
unconditionally. Two hosts have nothing to do with it:

```
demo/workbenches/extract/ExtractWorkbench.vue:152:  @click="() => {}"
demo/workbenches/mix/MixSourceSelector.vue:264-267:  <PaletteCard :palette :css-color="''" />   ← no @click at all
```

`ExtractWorkbench` is forced to write a no-op handler to satisfy an event it does not want, and both
render a full-card pointer cursor over a surface that does nothing. In `ExtractWorkbench` the card is
`:expanded="true"` permanently, so the only thing click could have meant is already unavailable.

This is the interface-surface defect of pass-1 L-3 (hosts wire 0/16 and 4/16 of the emits) seen from
the CSS side: the component has no presentational mode, so its *affordance* is as over-declared as
its event surface. `cursor-pointer` should be conditional on a `selectable`/`interactive` axis, or —
better — the card should be a presentational shell (pass-2 §2's `SwatchCard`) that emits `toggle`
only when a host opts in.

---

## L-33 · INFO (new) — second instance of pass-1 L-12's stale-citation class

`demo/palettes/browser/card/composables/useHoverPopover.ts:6-8`:

```
 * Shared hover-timer + floating-panel positioning pattern.
 * Used by PaletteDialog (current swatches) and PaletteCard (expanded swatches).
```

```
$ find demo -name "PaletteDialog*"
(no output)
```

`PaletteDialog` was excised. The composable's actual second consumer is `useSwatchActions.ts:40`
(→ `CurrentPaletteEditor.vue:233`). Pass-1 L-12 recorded the identical defect at `constants.ts:5`
(which cites `PaletteDialog.vue:403`). Two independent stale citations of the same dead component,
in two files of the same cluster, is not a typo — it is the absence of any gate that reads the
prose. Recorded as INFO because the class is already booked; the count matters for the fold.

---

## 1. The decomposition, judged (pass-3 reading)

I adopt pass-2's table (4 of 6 are real seams; `PaletteCardSwatches` and `PaletteCardMeta` are not)
and add the finding that pass 1 and pass 2 both missed because they read the split and not the
root:

**The folder is a god module distributed across six files *and* a hand-rolled fork of a primitive.**
Those are two different defects and the second is worse, because the first is merely awkward while
the second is *silently broken*.

Quantified, the root hand-roll costs (`PaletteCard.vue` lines 5-30 + 163-180 + 259-267 + 337-364):

| item | what it is | live status |
|---|---|---|
| 24-line root class/`:style`/`v-bind` expression | fork of `<Card>`'s render | works only for the flat shadow |
| `<span class="cartoon-cast">` | fork of a Card child that Card does not have | **dead** (L-25) |
| `useLiquidPress({pressVar:"--card-press-t"})` | fork of a Card wiring that Card does not have | **unread** (L-26) |
| `bg-well` / `border-card-edge` | fork of glass-ui's `SurfaceMaterial` axis | works, in the wrong repo (L-28) |
| 5 scoped-`<style>` rules | badge outline + icon ink + `vj-morph` geometry | works |

Three of five forks are dead or misplaced. The one that "works" is the one that should not exist in
this repo at all.

**Interface surface, re-counted at pass 3** (`PaletteCard.vue:182-218`, `244`):
11 props + 17 emits + 1 exposed method = **29 declared members on the parent alone**; plus 8 + 8 on
`PaletteCardSwatches`, 5 + 2 on `PaletteCardMenu`, 1 + 1 on `PaletteCardMeta`, 1 + 2 on
`PaletteRenameInput`, 4 + 1 on `ActionFeedback`. **62 declared interface members across 876 lines of
SFC.** For comparison, `<Card>` — the primitive that would replace the largest single piece of it —
declares 13 props and 0 emits.

The import graph is a **star with all state at the centre**: five leaves, none importing another,
none owning state that the centre does not also hold (except the three real seams' local timers). A
star with stateless leaves is not a decomposition; it is one component with five `#include`s.

---

## 2. The lattice, pass-3 revision

Pass-2 §2's lattice stands. I revise it in three places, all in the direction of **adopting what
already ships rather than adding**:

```text
@mkbabb/glass-ui  — ADOPT (already ships, 7.0.0, verified in node_modules)
  ./card      Card                <Card cartoon material="well" as="div">  ← the whole card root
                                  Card OWNS the caster child + the press spring + the pressVar name
                                  (producer change: fold .cartoon-cast + useLiquidPress INTO Card)
                                                                       (kills L-25, L-26, L-27)
  ./surface   SurfaceMaterial     += "well"  ← land the demo's rung-2 fork here    (kills L-28)
  ./toast     useToast/toast      ← ActionFeedback dies                (kills L-29, pass-1 L-5/L-11)
  ./expandable-container          ← useHeightTransition dies           (kills L-29, pass-2 L-21)
  ./chip      Chip                ← both hand-rolled pills die                       (kills L-29)
  ./swatch    Swatch  (NEW — the one genuine addition; pass-2 §2)
                                                          (kills pass-2 L-15/16/17/22, L-31)
  ./button    Button              already ships icon-only                        (pass-2 L-20)
  — PRODUCER BUG TO RELAY: dist/styles/glass/glass-atom.css is imported by NOTHING;
    .cartoon-cast / .glass-atom / .badge-atom* are unreachable from @mkbabb/glass-ui/styles

demo/styles/
  — DELETE --well-bg / --card-edge once the rung lands upstream                     (L-28)

demo/palettes/
  model/      types.ts · kind.ts · slug.ts        pure TS, no Vue, no glass-ui   (pass-1 L-8)
  export/     serializers.ts + the 12 byte-exact modules; export.ts DELETED       (pass-2 L-18)
  ports/      usePalettePorts.ts  — exposes CardAction[] with per-action `disabled`+reason
                                    the menu reads THE PORT, never platform/transport   (L-30)
  card/
    PaletteCard.vue          <Card> + slots. Palette DTO + injected port.
                             ONE `select` event, emitted only when the host opts in    (L-32)
    PaletteCardMenu.vue      renders port.actions; no `action: string`; no platform import
    PaletteCardSwatches.vue  calls useSwatchPopover() ITSELF; 2 props
    (PaletteCardMeta   DELETED — <Chip> row inline in the title slot)
    (ActionFeedback    DELETED — useToast)
    (composables/useHeightTransition.ts  DELETED — ExpandableContainer)

demo/ui/                     DELETED (19 forwarding dirs, 29 lines)     (pass-1 L-2, pass-2 L-19)
color-session/ink.ts         certifyAccentInk made total                          (pass-1 L-1)
```

**The transposition that carries pass 3** is one sentence: **stop naming producer internals by
string.** Every defect in this report's new docket except L-30/L-31/L-32 is an instance of a demo
literal (`"cartoon-cast"`, `"--card-press-t"`, `"cubic-bezier(0.16, 1, 0.3, 1)"`, `"bg-well"`,
`"w-12 h-12 sm:w-14 sm:h-14"`) standing in for a typed producer surface. Replace each with a prop on
a primitive and the whole class becomes unrepresentable — `vue-tsc` starts covering the part of the
boundary it currently cannot see, and a glass-ui major bump breaks the build loudly instead of
quietly deleting the card's motion.

Measured payoff, conservatively: `PaletteCard.vue` 364 → ~150 lines; `ActionFeedback.vue` (58) and
`useHeightTransition.ts` (88) and `PaletteCardMeta.vue` (64) deleted outright = **−210 lines** and
**−3 folder files**; `demo/ui/` (19 dirs, 29 lines) deleted; the 234,309-byte glass-ui root barrel
(pass-2 L-19) replaced by the component subpaths the imports would then name.

---

## 3. What I checked and found sound (pass-3 negatives)

- **Published-surface hygiene still holds — re-verified independently.** The card's cone imports
  `@mkbabb/value.js` zero times. Across the whole demo the specifier distribution is
  `24 × /color`, `10 × /css`, `6 × /math`, `5 × /easing`, `4 × /quantize` — every one a key in
  `package.json#exports`. No `@src/*`, no `dist/*`, no deep path, no bare-root import (there is no
  `"."` key, so a bare root would be unwritable by a real consumer). **The T.W1 dogfood keystone
  holds.** This is the one axis on which this component is exemplary.
- **`verbatimModuleSyntax` (edict 8): clean** across all six files — `PaletteCard.vue:168` (`import
  type { Palette, PaletteColor }`) and `:169` (inline `type PaletteKind`), `PaletteCardMenu.vue:177-178`,
  `PaletteCardSwatches.vue:72`, `PaletteCardMeta.vue:59`.
- **`cartoon-surface` itself IS live** — I verified it rather than assuming, because L-25 could have
  been read as "the whole register is missing". It is a Tailwind v4 `@utility` in
  `dist/components/card/styles.css`, which *is* imported by `dist/styles/index.css`, and it resolves:
  measured `border-top-width: 2px`, `position: relative`, and the three-layer offset cartoon shadow
  `oklab(…/0.32) -3px 3px 0 0, …/0.26 -5px 5px 0 0, …/0.18 -7px 7px 0 0`. **The flat edge treatment
  works; only the caster and the press coupling are dead.**
- **`Badge` is unaffected by the orphaned `glass-atom.css`.** I checked before widening L-25: only
  `surface="glass"` badges carry `.badge-atom` (`badge-u65NClWn.js:54-56`), and this card uses the
  default `loud` surface at `PaletteCard.vue:64,72`. Not double-counted.
- **`card/index.ts` remains a named re-export barrel** (no star), correct for SFCs whose scoped
  `<style>` makes the import side-effecting.
- **`useTemplateRef` used correctly** at `PaletteRenameInput.vue:48` (edict 7).
- **No global keyframe forked into a component.** Both scoped `<style>` blocks in the folder carry
  only geometry custom properties for the shared `vj-morph`/`vj-celebrate` families
  (`PaletteCard.vue:356-363`, `ActionFeedback.vue:52-57`). Edict 6 respected.
- **The `--flex-vel` leg of `useLiquidPress` is also written and also unread** — I checked before
  filing it separately and it is the same defect as L-26, not a second one. Not double-counted.

---

## 4. Probe log (pass 3)

Live server `http://localhost:9000`, Chrome via Playwright MCP. Read-only except `localStorage`
seeding in the MCP's isolated profile.

| # | action | result |
|---|---|---|
| 1 | read `visual/REPORT.md` rows + the `safari-desktop-light` `browse.png` / `palettes.png` shots | **zero PaletteCards in either**: `/#/browse` = "The commons is unreachable. / Failed to load palettes"; `/#/palettes` = "· EMPTY PLATE · / No saved palettes yet." — re-confirms pass-1 L-13 with the images read directly |
| 2 | seed 2 local palettes, `#/palettes`, measure the card root + `.cartoon-cast` | `cast: {w:0, h:0, position:"static", zIndex:"auto", boxShadow:"none", display:"inline"}`; card `462 × 100` (L-25) |
| 3 | recursive scan of all 49 stylesheets for `cartoon-cast` / `cartoon-surface` | 4 rules, all `.liquid-enter.is-cel > .cartoon-cast`; 1 rule `.cartoon-surface` (L-25 + §3 negative) |
| 4 | recursive scan for any rule containing `var(--card-press-t` or `var(--cartoon-press-t` | `{ "readsCardPressT": [], "readsCartoonPressT": [] }` (L-26) |
| 5 | read the card's custom properties | inline `--card-press-t: 0.0000; --flex-vel: 0.0000`; computed `--cartoon-press-t: "0"`, `--cast-travel: "0px"`, `--cast-spread: "1"` (L-26) |
| 6 | enumerate focusables in a collapsed card | 1: "Palette menu", `36 × 36` — corroborates pass-2 L-17/L-20 |
| 7 | `grep` the installed glass-ui `dist/` for the producer facts | `Card.vue.d.ts` `cartoon?: boolean` orthogonal to `SurfaceProps`; `card-Bk96VI2R.js:76` class-only, no cast child, no press var; `SurfaceMaterial` 4-member union; `toast`/`expandable-container`/`chip` `index.d.ts` present (L-27, L-28, L-29) |
| 8 | `grep` for importers of `dist/styles/glass/glass-atom.css`; `grep -c cartoon-cast dist/glass-ui.css` | no importer; **0** occurrences in the compiled bundle (L-25 root cause) |
| — | interference | the dev browser is shared with other seats; the hash route drifted to the color-space reference page twice mid-session. Every number above was taken inside a single uninterrupted `evaluate` on a freshly navigated page. |

No file under `src/`, `demo/`, `api/`, `test/`, `e2e/`, `docs/tranches/V/vnext/`, `scripts/dev/dev.sh`
or any `INBOX.md` was modified. Artifacts written: this file, and
`challenge-L-library.pass-2-2026-07-27.md` (the verbatim preservation of pass 2).

---

## 5. Pass-3 ranked docket

| id | severity | finding |
|---|---|---|
| L-25 | **BLOCKER** | `.cartoon-cast` span is dead markup — measured `position:static`, `0 × 0`, `box-shadow:none`; the bare rule is in no loaded stylesheet because glass-ui 7.0.0 imports `glass-atom.css` from nowhere (`grep -c cartoon-cast dist/glass-ui.css` → 0) |
| L-26 | MAJOR | `useLiquidPress({pressVar:"--card-press-t"})` writes a property **0 rules read**; glass-ui's caster reads `--cartoon-press-t`, measured at its registered initial `0` — the documented press→caster coupling does not exist |
| L-27 | MAJOR | glass-ui 7's `Card` has `cartoon?: boolean` orthogonal to `material` — the comment at `PaletteCard.vue:12-15` justifying the hand-roll is counter-factual; `Card` also emits no cast child and wires no press (`card-Bk96VI2R.js:76`) |
| L-28 | MAJOR | the "rung-2 WELL material" is a demo-local fork: `--well-bg`/`--card-edge` live in `demo/styles/foundation.css:136,143`, absent from glass-ui, whose `SurfaceMaterial` is a closed 4-member union |
| L-29 | MAJOR | 3 shipped glass-ui primitives re-implemented in-folder: `Toast`/`useToast` → `ActionFeedback.vue` (58 L), `ExpandableContainer` → `useHeightTransition.ts` (88 L, with 2 token *values* inlined as JS strings), `Chip` → 2 different hand-rolled pills |
| L-30 | MAJOR | `PaletteCardMenu.vue:179` climbs 4 levels into `platform/transport/`; `useApiClient()` **throws** without an App-root provider, so PaletteCard is unmountable outside the app |
| L-31 | MINOR | `swatchClass?: string` — a raw Tailwind class string as a public prop (`ExtractWorkbench.vue:150`); the axis is `size`, which glass-ui already names |
| L-32 | MINOR | unconditional `cursor-pointer` + unconditional `click` emit; 2 of 5 hosts wire a no-op or nothing (`ExtractWorkbench.vue:152`, `MixSourceSelector.vue:264`) |
| L-33 | INFO | `useHoverPopover.ts:7` cites the excised `PaletteDialog` — second instance of pass-1 L-12's class in the same cluster |

**Overturned prior negative:** pass-1 `…:73` recorded the `useLiquidPress` import as **"legal"**, and
pass-2 `…:448` recorded **"`cartoon-surface` stays decoration-only"** in its greenfield lattice. Both
read the *import specifier* and neither measured the *effect*. The import is legal; the register it
serves is dead. **A published-subpath import can be perfectly legal and still be a structural
defect** — that is the lesson pass 3 contributes to the fold.

---

## 6. Carried-forward dockets, re-verified at pass 3

Pass-1 L-1..L-14 and pass-2 L-15..L-24 all **STAND**. Spot re-verification this pass, only where I
touched the same ground:

| id | pass-3 status |
|---|---|
| pass-1 L-2 / pass-2 L-19 | **STANDS, re-counted** — `demo/ui/` is **19 directories, 29 lines total** (`wc -l demo/ui/*/index.ts`), every one a single-line re-export of `@mkbabb/glass-ui` or a subpath. The dual path is live inside this one folder: `PaletteCard.vue:165-166` takes `Badge`/`Button` through the shim, `:170` takes `writeClipboard` direct from the same package, four lines apart |
| pass-1 L-3 | **STANDS, sharpened** — `MixSourceSelector.vue:246-267` nests `<PaletteCard>` inside a native `<button>`; I measured that a collapsed card **always** renders a `36 × 36` `<button aria-label="Palette menu">`, so that host produces `button > … > button` on **every** row, not just expanded ones |
| pass-1 L-4 | **STANDS** — `PaletteCardMenu.vue:225` emits `action: [action: string]`; `PaletteCard.vue:315-318` looks it up in a 21-entry `Record<string, () => void>` and `if (!fn) return` — a silent-drop masking fallback (edict 2) at the folder's *internal* boundary, where the type information existed on both sides and was deliberately erased in the middle |
| pass-1 L-10 | **STANDS, widened to three idioms** — `withDefaults` + `props.x` (`PaletteCard.vue:182`, `ActionFeedback.vue:23`); 3.5 reactive destructure (`PaletteCardMenu.vue:206`, `PaletteCardMeta.vue:61`, `PaletteRenameInput.vue:39`); bare `defineProps` with no binding at all (`PaletteCardSwatches.vue:75`). Three props idioms in one six-file folder |
| pass-1 L-13 | **STANDS** — I read `shots/safari-desktop-light/{browse,palettes}.png` directly. Both empty. The mega-tranche visual matrix contains **zero** rendered PaletteCards across all four Safari matrices, so every green row for `/#/palettes` and `/#/browse` is a false negative for this component |
| pass-2 L-18 | **STANDS** — `usePaletteExport.ts:9` imports from `./export` (the 132-line legacy module); the byte-exact `export/serializers.ts` has exactly one consumer, `demo/test/export/byte-exact.test.ts:23`. `export/serializers.ts:6-10` documents the collision *by design* ("intentionally NOT named `index.ts`… the sibling legacy `../export.ts`… still resolves `./export`"). The card's five Export menu items all route to the legacy path |
| pass-2 L-24 | **STANDS** — `tsconfig.demo.json` maps `@mkbabb/value.js/{parsing,units}` (retired: `src/subpaths/` holds `color css easing math quantize transform value`) and omits `@mkbabb/value.js/{value,css}` — and `/css` has **10 live demo importers** |

---

## 7. Verdict

**DEFECTIVE.** The strongest defect is **L-25**: the card's signature motion register is dead markup
against an orphaned producer stylesheet, and no gate in this repository could have caught it, because
the coupling is a string. It sits on the root element of every PaletteCard in every host, it has been
described as working in three source comments and certified sound by two prior audit passes, and it
took a `getComputedStyle` read to find.

The library-structure judgement, in one line: **this component is a hand-rolled fork of
`@mkbabb/glass-ui`'s `Card` — plus local forks of its `Toast`, `ExpandableContainer` and `Chip`, plus
a local fork of its `SurfaceMaterial` axis — and three of those forks are silently broken or
misplaced.** Unique semantic ownership is violated four times over, always in the same direction:
the demo owns what the design system should.
