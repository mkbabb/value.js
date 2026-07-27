# CHALLENGE-L — PaletteCard: the library structure underneath it

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, the tier
declared at spawn. The seat is declared, not inherited.

- Repository: `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
- Subject: `demo/palettes/browser/card/PaletteCard/PaletteCard.vue` (364 L) + its five folder
  siblings and the four `card/composables/` modules it draws on.
- Axis: **library structure** — module boundaries, ownership, dependency direction, public surface.
- Verdict: **DEFECTIVE**. One BLOCKER (a library-contract violation that crashes every host pane),
  six MAJOR, five MINOR, two INFO.

Measured sizes (`wc -l`):

```
      58 demo/palettes/browser/card/PaletteCard/ActionFeedback.vue
     364 demo/palettes/browser/card/PaletteCard/PaletteCard.vue
     228 demo/palettes/browser/card/PaletteCard/PaletteCardMenu.vue
      64 demo/palettes/browser/card/PaletteCard/PaletteCardMeta.vue
      96 demo/palettes/browser/card/PaletteCard/PaletteCardSwatches.vue
      66 demo/palettes/browser/card/PaletteCard/PaletteRenameInput.vue
      88 demo/palettes/browser/card/composables/useHeightTransition.ts
      67 demo/palettes/browser/card/composables/useHoverPopover.ts
      17 demo/palettes/browser/card/composables/useLeaveTimer.ts
     116 demo/palettes/browser/card/composables/useSwatchActions.ts
    1164 total
```

---

## 0. The ratified law this component is measured against

`docs/tranches/V/ARCHITECTURE.md` §1 (Physical demo tree) is the tranche-V structural authority. It
states the target tree and then, verbatim:

> "There is no `panes/` dumping ground, `demo/@`, TS/Vite project alias, `@src`, or **one-line
> glass-ui forwarding directory**."

and the import lattice, verbatim:

```text
app → shell / color-session / feature / platform / shared
shell → color-session / platform / shared
feature → color-session / own descendants / platform / shared / published packages
color-session → platform / shared / published packages
platform → shared / external packages
shared → external packages
```

> "**Cross-feature internal imports are forbidden by construction.** … Palette transport, DTO, cache
> and operation semantics stay in `palettes/`…"

`palettes/` is a **feature**. `demo/shared/ui/` is the ratified home for "only genuinely app-owned
controls with 2+ consumers". `demo/ui/` does not appear in the ratified tree at all.

Two of the findings below are direct, quotable violations of that text.

---

## 1. The import ledger — every import of the six files, traced to its home

| # | File:line | Specifier | Resolves to | Verdict |
|---|---|---|---|---|
| 1 | `PaletteCard.vue:164` | `vue` | external | legal |
| 2 | `PaletteCard.vue:165` | `../../../../ui/badge` | `demo/ui/badge/index.ts` → **one line**: `export { Badge, badgeVariants, type BadgeVariants } from "@mkbabb/glass-ui";` | **VIOLATING EDGE** (L-2) |
| 3 | `PaletteCard.vue:166` | `../../../../ui/button` | `demo/ui/button/index.ts` → **one line**: `export { Button } from "@mkbabb/glass-ui";` | **VIOLATING EDGE** (L-2) |
| 4 | `PaletteCard.vue:167` | `@lucide/vue` | external | legal |
| 5 | `PaletteCard.vue:168` | `../../../types` (`import type`) | `demo/palettes/types.ts` — own feature | legal |
| 6 | `PaletteCard.vue:169` | `../../../utils` | `demo/palettes/utils.ts` — own feature | legal (but see L-8) |
| 7 | `PaletteCard.vue:170` | `@mkbabb/glass-ui` (`writeClipboard`) | published package, **direct** | legal — and 4 lines below #2/#3 the *same package* through a barrel: the dual path is intra-file |
| 8 | `PaletteCard.vue:171` | `@mkbabb/glass-ui/motion` (`useLiquidPress`) | published package subpath | legal |
| 9 | `PaletteCard.vue:172` | `../../../../color-session/useContrastSafeColor` | `demo/color-session/` | legal by lattice (`feature → color-session`) — **but it is the crash edge, L-1** |
| 10 | `PaletteCard.vue:173-174` | `../composables/useHoverPopover`, `useHeightTransition` | own descendants | legal |
| 11 | `PaletteCard.vue:175-180` | `../PaletteColorStrip.vue`, 5 folder siblings | own descendants | legal |
| 12 | `PaletteCardMenu.vue:177-178` | `../../../types`, `../../../utils` (`import type`) | own feature | legal |
| 13 | `PaletteCardMenu.vue:179` | `../../../../platform/transport/useApiClient` | `demo/platform/` | legal by lattice — **semantically inverted, L-3** |
| 14 | `PaletteCardMenu.vue:190` | `../../../../ui/dropdown-menu` | one-line glass-ui forward | **VIOLATING EDGE** (L-2) |
| 15 | `PaletteCardSwatches.vue:71` | `@mkbabb/glass-ui` (`writeClipboard`) | direct | legal |
| 16 | `PaletteCardSwatches.vue:72-73` | `../../../types`, `../SwatchHoverMenu.vue` | own feature/descendant | legal |
| 17 | `PaletteCardMeta.vue:58-59`, `PaletteRenameInput.vue:36-37`, `ActionFeedback.vue:20-21` | `vue`, `@lucide/vue`, own types | — | legal |

**Published-surface finding (negative):** *none of the six files imports `@mkbabb/value.js` at all.*
The published surface is seven subpaths (`node -e "console.log(Object.keys(require('./package.json').exports))"`
→ `./color ./value ./css ./easing ./math ./transform ./quantize`; there is **no `"."` root export**).
So there is **no deep-path violation** here — the card writes no `@src/…` and no `dist/…` import, and
a real consumer could write every specifier in this folder except the three `demo/ui/*` barrels
(which are repo-local). The card's *only* library edge is indirect, through
`demo/color-session/ink.ts` — and that indirection is exactly where the BLOCKER lives.

`verbatimModuleSyntax` (edict 8): **clean.** Every type-only import in the six files is `import type`
or inline `type` (`PaletteCard.vue:168,169`; `PaletteCardMenu.vue:177,178`; `PaletteCardSwatches.vue:72`;
`PaletteCardMeta.vue:59`).

---

## 2. Findings

### L-1 · BLOCKER — the card feeds untrusted color strings into a throwing wrapper over a Result-returning library; one alpha'd palette color destroys the whole pane

**The edge.** `PaletteCard.vue:229-230`

```ts
const { safeCss } = useSafeAccentFn("well");
const safeFirstColor = computed(() => safeCss(firstColor.value));
```

`firstColor` (`PaletteCard.vue:226`) is `props.palette.colors[0]?.css ?? props.cssColor ?? "#888"` —
i.e. **arbitrary user/API data**. The chain is:

`useSafeAccentFn().safeCss` (`demo/color-session/useContrastSafeColor.ts:353-359`)
→ `certifyAccentInk` (`demo/color-session/ink.ts:130-143`)
→ `certify` (`ink.ts:69-79`) → `safeAccentColor` from `@mkbabb/value.js/color`.

`ink.ts:78` is the defect:

```ts
if (!result.ok) throw new Error(`Ink certification failed: ${result.error.code}`);
```

The library deliberately returns a typed `Result` and **documents its contract by rejecting
non-opaque input** — `src/color/operations.ts:213-214`:

```ts
if (accent.alpha === "none" || surface.alpha === "none") return err({ code: "color_missing_alpha" });
if (accent.alpha !== 1 || surface.alpha !== 1) return err({ code: "color_invalid_input" });
```

`certifyAccentInk` honours the *parse* failure gracefully (`ink.ts:136` `if (!accent) return css;`) but
converts every *certification* failure into an exception. `PaletteCard` calls it inside a `computed`
consumed by the template, so the throw happens **during render** and unwinds to the pane's error
boundary.

**Library-level reproduction** (run at repo root, against the exact `dist/` the dev server aliases to):

```
$ node --input-type=module -e "
import { convertColor, oklch, safeAccentColor } from './dist/subpaths/color.js';
import { parseCssColor } from './dist/subpaths/css.js';
function parseOklch(s){ const p=parseCssColor(s); if(!p.ok) return null; const c=convertColor(p.value,'oklch'); return c.ok?c.value:null; }
for (const s of ['lab(50% 20 10 / 82.7%)','#e11d48','lab(92% 88.8 20 / 82.7%)','oklch(0.7 0.1 200 / 0.5)']) {
  const a=parseOklch(s); const surf=oklch(0.95,0,0,1);
  const r=safeAccentColor(a, surf.value, { minimumRatio: 4.5+1.25, gamut:'srgb' });
  console.log(s,'=> safeAccent', r.ok? 'OK' : 'ERR '+r.error.code);
}"
lab(50% 20 10 / 82.7%) => safeAccent ERR color_invalid_input
#e11d48 => safeAccent OK
lab(92% 88.8 20 / 82.7%) => safeAccent ERR color_invalid_input
oklch(0.7 0.1 200 / 0.5) => safeAccent ERR color_invalid_input
```

**Any** palette color carrying alpha < 1 fails certification. `ink.ts:78` then throws.

**Live reproduction** (Playwright against the live dev server, `http://localhost:9000`):

1. `localStorage.setItem('color-palettes', JSON.stringify({version:1,palettes:[{id:'p',slug:'p',name:'Probe',isLocal:true,colors:[{css:'lab(50% 20 10 / 82.7%)',position:0},{css:'#0ea5e9',position:1}]}]}))`
2. full reload of `http://localhost:9000/#/palettes`, settle 2 s
3. observed:

```json
{ "url": "http://localhost:9000/#/palettes",
  "boundary": true,
  "bodyHead": "→\nPalettes\nTools\nLogin\n@mbabb\n\nThis panel hit an unexpected error.\n\ncolor_non_finite\n\nTry again",
  "articles": 0 }
```

The same seed with `lab(92% 88.8 20 / 82.7%)` reproduces identically. The same seed with
`['#e11d48','#0ea5e9']` produces **no** boundary. The pane is destroyed, zero cards render, and the
only user recovery is clearing site data — the poison is *persisted*.

**The alpha'd lab string is not synthetic.** It is what the shipped app had already written to this
browser's storage before I touched it (dumped from the live profile):

```
[ "color-picker", "{\"inputColor\":\"lab(92% 88.8 20 / 82.7%)\",\"savedColors\":[]}" ]
```

So the app persists alpha'd colors through the picker, and any palette saved from that state is a
loaded gun aimed at every pane that hosts a card.

*Attribution note (honesty):* the boundary message is `color_non_finite`, while the dist-level repro
of `safeAccentColor` yields `color_invalid_input`; both are `ink.ts` throw sites
(`ink.ts:59` `Invalid ink surface: …`, `ink.ts:78` `Ink certification failed: …`, `ink.ts:47`
`Ink color is missing lightness`). The *class* of defect — a Result-to-throw wrapper on the card's
render path — is CONFIRMED by code and by the crash/no-crash contrast; the exact throw site of that
one run is a HYPOTHESIS (I did not attach a debugger). `PaletteCard.vue:230` is the **only**
`safeCss` consumer in the palettes area (`grep -rn "useSafeAccentFn\|safeCss(" demo/` → the other
five consumers are in `workbenches/gradient`, `workbenches/extract/ExtractControls`,
`scenes/about`, `shell/dock/menus` ×2), which is why the palettes route is where it lands.

**Mechanism.** Ownership inversion at the library boundary. The library owns "certification may fail,
here is a typed error"; the demo's `ink.ts` unilaterally re-declares that contract as "certification
cannot fail" and the card consumes the re-declaration on untrusted input. A total function was made
partial at the wrong layer.

**Cure (gestalt, not patch).** `ink.ts` must be the *only* place that knows about certification
failure, and it must be **total**: `certifyAccentInk(css, surfaceL, floor): string` returns the input
`css` (or the muted-ink token) for every non-certifiable input — exactly as it already does for
unparseable input at `ink.ts:136`. Add the alpha pre-condition there (the library states it at
`operations.ts:214`; the wrapper must respect it) and delete all three `throw` sites on the
*dynamic-input* paths, keeping throws only for `requiredOklch` on **producer literals**
(`ink.ts:53` — a build-time constant failing is a genuine invariant break). Then no consumer of ink
can crash a pane, and `PaletteCard` needs no guard at all.

---

### L-2 · MAJOR — the card imports glass-ui through 19 one-line forwarding directories that the ratified architecture explicitly forbids, while importing the same package directly six lines away

**Evidence.** `PaletteCard.vue:165-171`:

```ts
import { Badge } from "../../../../ui/badge";      // → demo/ui/badge/index.ts (1 line)
import { Button } from "../../../../ui/button";    // → demo/ui/button/index.ts (1 line)
…
import { writeClipboard } from "@mkbabb/glass-ui";        // same package, direct
import { useLiquidPress } from "@mkbabb/glass-ui/motion";  // same package, direct
```

`demo/ui/button/index.ts` in full: `export { Button } from "@mkbabb/glass-ui";`
`demo/ui/badge/index.ts` in full: `export { Badge, badgeVariants, type BadgeVariants } from "@mkbabb/glass-ui";`

Measured shape of the shim layer:

```
$ for d in demo/ui/*/; do echo "$d $(ls $d)"; done
demo/ui/alert/ index.ts        demo/ui/label/ index.ts
demo/ui/avatar/ index.ts       demo/ui/popover/ index.ts
demo/ui/badge/ index.ts        demo/ui/radio-group/ index.ts
demo/ui/button/ index.ts       demo/ui/select/ index.ts
demo/ui/card/ index.ts         demo/ui/separator/ index.ts
demo/ui/checkbox/ index.ts     demo/ui/skeleton/ index.ts
demo/ui/collapsible/ index.ts  demo/ui/slider/ index.ts
demo/ui/dialog/ index.ts       demo/ui/switch/ index.ts
demo/ui/dropdown-menu/ index.ts demo/ui/tooltip/ index.ts
demo/ui/input/ index.ts
```

19 directories, 19 files, **zero app-owned components**. Debt size: 49 demo files import through the
barrels, 14 import `@mkbabb/glass-ui` directly —

```
$ grep -rl "ui/badge\|ui/button\|…\|ui/radio-group" demo --include="*.vue" --include="*.ts" | wc -l
49
$ grep -rn "from \"@mkbabb/glass-ui\"" demo --include="*.vue" | wc -l
14
```

`ARCHITECTURE.md` §1: "There is no … one-line glass-ui forwarding directory." The ratified tree has
`shared/ui/` ("only genuinely app-owned controls with 2+ consumers") and no `demo/ui/`.
`git log --oneline -3 -- demo/ui/button/index.ts` → `f2c8f565 feat(v-w44)!: adopt @mkbabb/glass-ui
7.0.0…`, `a61094e3 feat(v-w43b3)!: home the feature UI trees; demo/@ dies (D-c)` — the barrels are
the surviving husk of the excised shadcn tree.

**Mechanism.** Aliasing: two names for one concept (edict 2, no aliases; edict 3, no contrivance).
It also *hides* the design-system boundary — a reader of `PaletteCard.vue` cannot tell that `Badge`
and `Button` are producer atoms subject to glass-ui's variant law, which is precisely why L-7 below
(hand-rolled buttons next to producer atoms) went unnoticed for so long.

**Cure.** Delete `demo/ui/` entirely; rewrite the 49 importers to the bare specifier
(`import { Badge, Button } from "@mkbabb/glass-ui"`). This is a pure find/replace with no runtime
delta (the barrels are re-exports), it removes 19 directories, and it makes every producer-atom
consumption grep-visible in one query. No shim, no codemod residue, no `shared/ui` re-home.

---

### L-3 · MAJOR — the card is consumed cross-feature, and the hosts wire 0/16, 4/16, 6/16 and 15/16 of its emit surface: menu controls that provably do nothing

**Structural violation.** `ARCHITECTURE.md` §1: "Cross-feature internal imports are forbidden by
construction." Measured card-specific violations:

```
demo/workbenches/mix/MixSourceSelector.vue:8:import { PaletteCard, PaletteColorStrip } from "../../palettes/browser/card";
demo/workbenches/extract/ExtractWorkbench.vue:197-200: … PaletteCard, PaletteCardSkeleton } from "../../palettes/browser/card";
```

(the same law is broken 20+ more times across `workbenches/*` and `shell/*` → `palettes/…`; e.g.
`demo/shell/dock/DockViewSelect.vue:8` imports `palettes/usePalettePorts`. Full list from
`grep -rn "from \"../../palettes\|from \"../../../palettes" demo/{workbenches,scenes,shell,picker}`.)

**Consequence, measured.** The card's action surface is 16 optional emits; each host re-declares the
handler table by hand:

| host | bound / 16 | bound emits |
|---|---|---|
| `demo/palettes/BrowsePane.vue:92-117` | **15/16** | click, delete, save, vote, rename, editColor, addColor, feature, adminDelete, setVisibility, fork, versions, flag, editTags, export |
| `demo/palettes/PalettesPane.vue:82-96` | **6/16** | click, delete, publish, rename, editColor, export |
| `demo/workbenches/extract/ExtractWorkbench.vue:145-155` | **4/16** | click, save, rename, addColor |
| `demo/workbenches/mix/MixSourceSelector.vue:264-267` | **0/16** | — |

(computed by extracting the `defineEmits` keys from `PaletteCard.vue:200-218` and testing each
kebab/camel form against the `<PaletteCard …>` tag body in each host.)

`PaletteCardMenu` gates items on `paletteKind` / `isOwned` / `isAdmin` **only** — never on whether
the host can service the action. So in `MixSourceSelector` the rendered menu offers Publish, Rename,
Export ×5 and **Delete** for a `saved` palette, and every one of them is an emit into the void: Vue
delivers an unlistened emit nowhere. A user pressing "Delete" in the Mix source list gets silence.
Same for Export in Extract (`export` unbound) and for `publish` in BrowsePane (unbound there — the
one gap in 15/16).

**Second-order structural damage in the same call site.** `MixSourceSelector.vue:246-267` wraps the
card in a native `<button>`:

```html
<button type="button" :aria-pressed="isPaletteSelected(palette.slug)" … @click="togglePalette(palette)">
    <PaletteCard :palette="palette" :css-color="''" />
</button>
```

`PaletteCard.vue:96-104` renders `<Button icon-only aria-label="Palette menu">` inside that. The HTML
Standard's content model for `button` is "Phrasing content, but there must be no interactive content
descendant" — so this is a spec violation whose runtime behaviour is that opening the menu also
toggles palette selection (the inner click bubbles to the outer button). It exists *because* the card
gives a foreign feature no way to say "presentation only, no actions".

**Mechanism.** Wrong direction of dependency. The card is a *palettes-feature* component that three
features must render, so its action surface was made optional-everything and pushed outward as 16
emits. Optionality is the disease: the component cannot know, and does not ask, whether an action is
serviceable, so it renders controls it cannot honour.

**Cure.** Split presentation from capability (see §4 lattice):
1. A presentational `shared/ui/SwatchCard.vue` that knows `colors: readonly string[]`, a title slot,
   a meta slot, a trailing-action slot and an expandable-body slot — **zero** `Palette` knowledge,
   zero actions, so `workbenches/mix` and `workbenches/extract` consume it directly and the
   cross-feature edge disappears.
2. `palettes/browser/card/PaletteCard.vue` binds a `Palette` DTO + the injected `LIBRARY_PORT_KEY` /
   `BROWSE_PORT_KEY` port (the ports already exist — `usePalettePorts.ts:138-192`) to that shell. The
   menu is built from a **capability list the port supplies**, so an unserviceable action is not
   rendered rather than rendered dead. Emits collapse from 16 to `click` (or nothing).

---

### L-4 · MAJOR — the menu↔card action bus is an untyped string channel with a silent-drop default; it already carries one orphan

`PaletteCardMenu.vue:225` declares `action: [action: string]`. `PaletteCard.vue:293-319` receives it
into a `Record<string, () => void>` and drops unknown keys:

```ts
const fn = actions[action];
if (!fn) return;          // PaletteCard.vue:315-316
```

Measured coupling between the two halves (extracted from the two files):

```
menu emits (17): adminDelete,delete,editTags,exportCSS,exportJSON,exportPNG,exportSVG,exportTailwind,
                 feature,flag,fork,makePrivate,makePublic,publish,rename,save,versions
card handles (18): … + copyAll
emitted but UNHANDLED: []
handled but NEVER emitted: [ 'copyAll' ]
```

`copyAll` (`PaletteCard.vue:294`) is dead: `grep -rn "copyAll" demo/` returns exactly that one line.
A "copy all colors" menu item was removed and nothing — not tsc, not eslint, not review — noticed the
orphaned handler, because the channel is `string`.

**Mechanism.** God-module symptom expressed as a stringly-typed bus: the 18-entry dispatch table in
the root file *is* the god module, merely relocated from a `switch` into an object literal. The
compiler cannot relate the two halves.

**Cure.** Delete the bus. In the capability model (§4) the menu receives
`actions: readonly CardAction[]` where `CardAction = { id: string; label: string; icon: Component;
disabled?: boolean; run: () => void }` and renders `v-for="a in actions"` with `@select="a.run()"`.
The card no longer dispatches strings, no orphan can exist, unserviceable actions are absent from the
array rather than silently dropped, and `PaletteCardMenu`'s 228 lines of `v-if` policy collapse into
a list renderer whose policy lives once, in the port.

---

### L-5 · MAJOR — feedback state is owned by the card but driven by an imperative `defineExpose` handle harvested through `(el: any)`, and the handle has metastasised into a composable's dependency contract

`PaletteCard.vue:233-244`:

```ts
const feedbackMessage = ref(""); const feedbackVariant = ref<"success"|"error">("success"); const feedbackVisible = ref(false);
function showFeedback(message: string, variant: "success" | "error") { … }
defineExpose({ showFeedback });
```

Callers:

```
demo/palettes/BrowsePane.vue:94:   :ref="(el: any) => el && (cardRefs[palette.slug] = el)"
demo/palettes/BrowsePane.vue:230:  card.showFeedback("Saved!", "success");
demo/palettes/BrowsePane.vue:239:  card.showFeedback(result.message, "error");
demo/palettes/BrowsePane.vue:249:  cardRefs[palette.slug]?.showFeedback(result.message, result.success ? "success" : "error");
demo/palettes/BrowsePane.vue:264:  cardRefs[palette.slug]?.showFeedback(message, "error"),
demo/palettes/PalettesPane.vue:84:  :ref="(el: any) => el && (cardRefs[palette.id] = el)"
demo/palettes/PalettesPane.vue:207: card.showFeedback(result.message, result.success ? "success" : "error");
```

and the contract has leaked into a composable —
`demo/palettes/browser/dialog/composables/useDialogBrowseActions.ts:36-44`:

```ts
/** F2: host-supplied surface for a failed fork. `BrowsePane` routes this onto
 *  the palette card's `showFeedback` (the same surface `onSave`/`onDeleteOwned` use). */
onForkError?: (palette: Palette, message: string) => void;
```

**Mechanism.** Ownership is upside-down: the *pane* knows the outcome of every mutation; the *card*
owns the display state for it. Bridging that requires an imperative handle, a per-row `reactive`
map of component instances, and two `any` casts that erase the instance type Vue would otherwise
give. The map is also never pruned — `cardRefs[slug]` entries for removed palettes are retained
(the `el && …` guard means the unmount callback with `el === null` never deletes).

**Cure.** Make it data. The panes already hold the operation result; hoist it into the port
(`browsePort.feedback: Ref<Record<string, {message, variant} | null>>` or a per-row field on the row
model) and pass `:feedback="pm.feedback.value[palette.slug] ?? null"` down. `ActionFeedback` becomes
a pure function of props with `v-model:visible` removed entirely (the port clears it on a timer, or
the chip's own `autoDismissMs` emits one `dismiss`). Then `defineExpose` dies, both `(el: any)`
casts die, `cardRefs` dies, and `onForkError?` collapses into a normal port write.

---

### L-6 · MAJOR — the six-file split is not along seams: the root keeps all the state and the children are markup shards with pass-through props

Measured shape of the decomposition:

| file | props | emits | own state | verdict |
|---|---|---|---|---|
| `PaletteCard.vue` | 10 | 16 | 4 refs + 3 composables (`useHoverPopover`, `useHeightTransition`, `useLiquidPress`) + the 18-entry dispatch table | the god module |
| `PaletteCardSwatches.vue` | **8** | **8** | **0** | markup shard: 6 of 8 props are the root's interaction state |
| `PaletteCardMenu.vue` | 5 | 2 | 1 computed + `useApiClient()` | real seam, wrong policy home (L-3/L-4) |
| `PaletteCardMeta.vue` | 1 | 1 | 0 | real seam (pure presentational) |
| `PaletteRenameInput.vue` | 1 | 2 | 2 | real seam |
| `ActionFeedback.vue` | 4 | 1 | 1 timer | real seam, wrong ownership (L-5) |

`PaletteCardSwatches` is the proof. Its props are `colors, isLocal, displaySlug, safeFirstColor,
openPopoverIndex, canHover, floatingStyle, swatchClass` (`PaletteCardSwatches.vue:75-84`) and it
re-emits eight events that the root immediately turns back into state writes
(`PaletteCard.vue:139-157`). Four of those props (`openPopoverIndex`, `canHover`, `floatingStyle`)
plus four of the emits (`hover`, `leave`, `cancelLeave`, `popoverTouch`) exist **only** because the
root calls `useHoverPopover()` (`PaletteCard.vue:246-255`) on behalf of the child. The child is the
expandable region; the popover belongs to the expandable region; the composable already exists and
is already called standalone by a sibling (`useSwatchActions.ts:30-40` calls `useHoverPopover()`
itself). The seam was cut *through* the state instead of *around* it.

The one force that pushed the state up is real and should be named: `useHeightTransition`'s
`onBeforeCollapse` closes the open popover (`PaletteCard.vue:276-278`). That is an argument for
moving **both** into the child, not for hoisting one into the parent.

`PaletteCard.vue`'s own template also still carries the metadata row, the title, the featured badge,
the count badge, the drag handle, the rename transition and the swatch transition — six children and
the root is still 364 lines, 15.5 KB, the largest file in the folder by 1.6×.

**Cure.** Re-cut on the three real seams the DOM already has:
`PaletteCardHeader` (drag handle + title/rename + badges + meta + menu trigger),
`PaletteCardBody` (the expandable region: owns `useHoverPopover` **and** `useHeightTransition`,
receives `colors`/`expanded`, emits only the three semantic swatch intents `addColor`/`editColor`
/`copyColor`), and the root, which then owns only `press`, `expanded` and the palette DTO. Prop count
on the body drops 8→3; emits 8→3; the root loses 4 refs and one composable.

---

### L-7 · MAJOR — a hand-rolled icon-button recipe is duplicated 16× (4× inside this folder) beside the glass-ui `Button` atom the same component uses

`PaletteCard.vue:93-104` already carries the ratified cure, in a comment:

> "S.W5-4: 3rd copy of the hand-rolled icon-trigger recipe dies onto the glass-ui atom; the sm square
> also cures the ~24px touch target."

Then the identical recipe survives untouched in its own siblings —
`PaletteCardSwatches.vue:14, 41-62` (×4), `PaletteCardMeta.vue:45`, `PaletteRenameInput.vue:20, 26`:

```html
class="p-1.5 rounded-sm hover:bg-accent active:scale-95 active:bg-accent/70 transition-colors
       cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
```

Measured:

```
$ grep -ro "active:bg-accent/70 transition-colors" demo --include="*.vue" | wc -l
16
$ grep -rl "active:bg-accent/70" demo --include="*.vue"
demo/palettes/browser/slug/PaletteSlugBar.vue
demo/palettes/browser/card/PaletteCard/PaletteCardMeta.vue
demo/palettes/browser/card/CurrentPaletteEditor.vue
demo/palettes/browser/card/PaletteCard/PaletteRenameInput.vue
demo/palettes/browser/card/PaletteCard/PaletteCardSwatches.vue
demo/palettes/browser/admin/AdminTagsPanel.vue
```

**Mechanism.** Dual path for one concept (icon-only ghost button): the producer atom
(`Button icon-only variant="ghost"`) and a 10-utility per-instance fork living side by side inside a
single component folder. Edict 4 (variants belong in glass-ui) and edict 5 (root-level styling, never
per-instance overrides) are both broken, and the fork is where the audit's tap-target defects breed —
`p-1.5` + `w-4 h-4` is a 26 px target, below the 44 px floor the visual audit measures.

**Cure.** One substitution, no new component: every one of the 16 sites becomes
`<Button icon-only variant="ghost" size="sm" :aria-label="…">`. If a smaller square is genuinely
needed for the swatch popover row, it is a **glass-ui `size="xs"` variant** (producer-side, one
place), never a local class list. This deletes ~160 characters × 16 and moves the focus-ring and
press choreography onto the producer register the card already trusts for its menu trigger.

---

### L-8 · MAJOR — two `slugify` implementations own one concept, in the same feature, both reachable from the card's Export item, with measurably different output

`demo/palettes/export.ts:9-11`:

```ts
function slugify(name: string): string {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
```

`demo/palettes/utils.ts:3-12` (the one the store mints ids with, via `createSlug`):

```ts
function slugify(str: string): string {
    return str.normalize("NFKD").replace(/[̀-ͯ]/g, "").trim().toLowerCase()
        .replace(/[^a-z0-9 -]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
}
```

Measured divergence:

```
$ node -e "…"   # both implementations, verbatim
"Café Noir!"    export.ts=> "caf-noir"     utils.ts=> "cafe-noir"
"Ω palette"     export.ts=> "palette"      utils.ts=> "-palette"
```

Path from the card: `PaletteCard.vue:308-312` (`export` emit) → `BrowsePane.vue:324` /
`PalettesPane.vue:211` `usePaletteExport()` → `usePaletteExport.ts:15-19` → `export.ts` `slugify`.
So a palette whose stored slug is `cafe-noir` downloads as `caf-noir.json` and its CSS custom
properties are named `--palette-caf-noir-0`.

*Correction to the brief's named suspect:* there is no `src/export/serializers` in this tree
(`ls src/` → `color css easing.ts foundation quantize.ts subpaths transform value.ts`), so the
"`demo/palettes/export.ts` + `usePaletteExport.ts` vs `export/serializers`" duplication is stale.
The live duplication is the `slugify` pair above. `usePaletteExport.ts` itself is a 27-line
`switch` around `export.ts` — one thin layer, one consumer shape, not a god module; its only sin is
`catch { console.warn }` (`usePaletteExport.ts:21-23`), which swallows a failed export with no user
signal, on a card that has a whole `ActionFeedback` chip available.

**Cure.** One `slug.ts` in `palettes/` exporting `slugify` (the NFKD form — it is strictly better)
and `createSlug`. `export.ts` imports it. Its leading-`-` bug for non-Latin input
(`"Ω palette"` → `"-palette"`) is fixed once, in the one home.

---

### L-9 · MINOR — a bespoke JS height animation with hardcoded durations, and a `scrollIntoView` side effect, inside a feature composable

`useHeightTransition.ts:1-10` admits the fork in its own header comment: "bespoke height-transition
durations (no exact glass-ui canon match — 350ms sits between `--duration-normal` 300ms and
`--duration-slow` 450ms…)". It writes inline `style.transition` strings, forces reflow three times
(`:32, :56, :63`), and at `:48` does:

```ts
htmlEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
```

A card's expand transition scrolling the document is a feature reaching into the shell's scroll
ownership. `PaletteCard` is thus running three motion mechanisms at once: the producer register
(`useLiquidPress` + `cartoon-surface`, `PaletteCard.vue:263-267`), the named CSS families
(`vj-morph` / `vj-celebrate` with geometry vars, `PaletteCard.vue:112, 358-363`), and this JS one.
Animations are never deleted (edict 6) — this is a **move**: the collapse belongs in glass-ui as a
`Collapse`/`disclosure` motion primitive on the canon clock, or in CSS with the family idiom the same
file already uses twice; the `scrollIntoView` belongs to the pane that owns scroll, behind the
existing `@click` intent.

### L-10 · MINOR — two prop idioms and two `v-model` idioms inside one folder (edict 7)

`PaletteCard.vue:182-198` uses `withDefaults(defineProps<…>(), {…})` and then `props.palette`,
`props.cssColor` throughout (`:226, :230, :231, :286, :294-312`). Its four siblings use the Vue 3.5
reactive destructure (`PaletteCardMenu.vue:206`, `PaletteCardMeta.vue:61`,
`PaletteRenameInput.vue:39`). Same folder, same day, two idioms. Likewise the card hand-rolls two
two-way bindings that `defineModel` owns: `:menu-open` + `@update-open`
(`PaletteCard.vue:86-89` ↔ `PaletteCardMenu.vue:226`) and `:visible` + `@update:visible`
(`PaletteCard.vue:126-127` ↔ `ActionFeedback.vue:33-35`). Cure: `const { palette, layout = "default",
swatchClass = "w-9 h-9 sm:w-10 sm:h-10" } = defineProps<…>()` in the root, and `defineModel<boolean>("open")`
in the menu — the latter also removes one prop and one emit from L-6's table.

### L-11 · MINOR — `ActionFeedback`'s timer is never cleared on unmount

`ActionFeedback.vue:37-47` holds `let timer` and clears it only on the next `visible` change. A card
unmounted while the chip is up (delete a palette, re-sort the wall, navigate) leaves a 2.5 s timer
holding the closure and firing an emit at a dead component. Its sibling `useLeaveTimer.ts` is the
correct shape but also lacks disposal. Cure: `onScopeDispose(cancel)` in `useLeaveTimer`, and let
`ActionFeedback` use `useLeaveTimer` instead of its own `setTimeout` — one timer home for the folder.

### L-12 · MINOR — ownership records point at modules deleted three tranches ago

`useHoverPopover.ts:6-9`: "Used by PaletteDialog (current swatches) and PaletteCard" — `PaletteDialog`
was excised at T.W0-3/CC-6 (`demo/DESIGN.md:253`, `demo/styles/foundation.css:487`), and
`demo/palettes/constants.ts:6` still cites `PaletteDialog.vue:403`. In the same chain,
`useDialogBrowseActions` has exactly one caller (`BrowsePane.vue:261`) and its `modalStack?` branch
(`:38, :77-78`) has **zero** — a dead optional dependency kept for a "dialog host" that no longer
exists, in a folder still named `dialog/`. Legacy residue (edict 2). Cure: delete `modalStack`, fold
the single-caller composable into `BrowsePane` or rename the folder to what it now is, and fix the
two stale citations.

### L-13 · INFO — the visual audit has zero coverage of this component

All 60 captures rendered the card's hosts **empty**. `REPORT.json`, `safari-desktop-light /#/palettes`:
`bodyTextLength: 237`, and its eight `smallTapTargets` are dock/slug/slider elements — no card
element appears. The screenshot
`docs/tranches/V/megatranche/audit/visual/shots/safari-desktop-light/browse.png` shows
"The commons is unreachable. / Failed to load palettes" beside "· EMPTY PLATE · / No saved palettes
yet." So the audit's `0` for `pageErrors`, `horizontalOverflow` and `blankOrNearBlank` on
`/#/palettes`, `/#/browse`, `/#/mix` is a **false negative for PaletteCard** — the component was
never on screen. Any future capture pass must seed `localStorage['color-palettes']` (and a stubbed
`/colors/api/palettes`) before it can claim to have audited the card. Note that L-1 means such a
seed must be chosen deliberately: seeding an alpha'd color reproduces the pane crash instead.

### L-14 · INFO (cross-axis, blocking this axis' live probes) — the route rewrites itself, and it writes `oklch(none …)` into its own URL

Observed repeatedly while driving the live server: `goto("http://localhost:9000/#/mix")` settles at
`/#/extract`, then `/#/atmosphere`, then `/#/`; a later read showed the URL had become
`http://localhost:9000/#/?space=oklch&color=oklch(none%200.2%2030)` with the page title
`oklch(none 0.2 30) — Color Picker`. Two consequences for this seat: (a) I could not hold `/#/mix`
long enough to photograph the nested-button behaviour of L-3 (that finding therefore rests on the
HTML content-model spec plus the source, not a screenshot); (b) `oklch(none …)` travelling through
the app's own URL is a live hazard for the ink path of L-1 — `demo/color-session/ink.ts:47` throws
`"Ink color is missing lightness"` for exactly `L === "none"`. Belongs to the shell/router seat, but
it must be fixed before any card probe can be trusted.

---

## 3. What I checked and found sound (the negative proof)

- **Published-surface hygiene:** no file in the folder imports `@mkbabb/value.js` deeply, no `@src/*`,
  no `dist/*`, no path alias. `vite.config.ts:33-53` generates the self-alias set from
  `package.json#exports`, and the demo's `@…` aliases were killed at W43 (RF-15) — every specifier in
  these six files is either relative-to-physical-home or a bare published specifier. A real consumer
  could write all of them except the three `demo/ui/*` barrels (L-2).
- **`verbatimModuleSyntax`:** every type-only import is `import type` / inline `type`. Zero defects.
- **Injection seams:** `PaletteCardMenu` reads API availability through the injected client
  (`useApiClient()`, `PaletteCardMenu.vue:216`), not a module singleton — the S.W2 W2-4 posture holds.
- **The three-`useDark` suspect is cured:** `grep -rn "useGlobalDark\|useDark(" demo/` shows a single
  store, glass-ui's `useGlobalDark`, at all six consumers. No local dark fork survives.
- **`ActionBarLayer`'s `useLayerTransition` reimplementation** does not touch this component or its
  composables (`grep` over the folder: no reference).
- **`PaletteColorStrip`** does no color math (`PaletteColorStrip.vue:47-60` is pure percentage
  arithmetic), so the card's swatch rendering carries no second color pipeline.
- **Scoped styles** are minimal and both blocks are geometry/hue only (`PaletteCard.vue:343-363`,
  `ActionFeedback.vue:53-57`); no `!important`, no `:deep(` reach (the `.featured-badge__icon`
  wrapper is the documented cure for the old `:deep(svg)`).

---

## 4. The greenfield lattice (what I would build today, no legacy)

```text
shared/ui/
  SwatchCard.vue          # presentational only: colors: readonly string[], slots
                          #   #title #meta #actions #body, `expanded` prop,
                          #   producer press/cartoon register, no DTO, no emits but `toggle`
  ActionChip.vue          # the success/error chip, props-only, timer via useLeaveTimer
  (icon buttons: NONE — glass-ui `Button icon-only` is the atom, size xs added producer-side)

palettes/
  slug.ts                 # THE one slugify + createSlug          (kills L-8)
  export.ts               # serializers, importing slug.ts
  card/
    PaletteCard.vue       # binds Palette DTO + injected port → SwatchCard
    PaletteCardHeader.vue # drag handle, title/rename, badges, meta chips, menu trigger
    PaletteCardBody.vue   # expandable region: OWNS useHoverPopover + the collapse motion
    PaletteCardMenu.vue   # renders `actions: readonly CardAction[]`; no policy, no strings
    useCardActions.ts     # port → CardAction[] (label/icon/disabled/run), the ONE policy home

color-session/ink.ts      # TOTAL: certifyAccentInk never throws on dynamic input   (kills L-1)
demo/ui/                  # DELETED (19 forwarding dirs)                            (kills L-2)
```

Direction of every edge: `feature → shared / color-session / platform / published packages`. The
cross-feature edges `workbenches/{mix,extract} → palettes/browser/card` are **gone** — those hosts
render `shared/ui/SwatchCard` with their own bindings, which is what they actually wanted (Mix wanted
a selectable swatch tile; Extract wanted a preview with save/rename). Nobody renders a Delete button
they cannot honour.

Net effect, counted against today's tree: −19 directories (`demo/ui`), −16 hand-rolled button
recipes, −1 dispatch table (18 entries), −1 `defineExpose` + 2 `any` casts + 2 `cardRefs` maps,
−1 duplicate `slugify`, −13 of 16 emits on the card, −5 pass-through props on the body, −1 bespoke JS
motion module. Added: one presentational component and one `useCardActions.ts` — both of which
replace more code than they introduce, and neither of which is a wrapper or a new `shared/` dir
(`demo/shared/ui/` already exists and already hosts `EmptyState.vue` and `PaneHeader.vue`).

---

## 5. Probe log

Live server `http://localhost:9000` (Chrome via Playwright MCP), read-only except `localStorage`
seeding in the MCP's isolated profile. Snapshots/consoles under the gitignored
`.playwright-mcp/` (`.gitignore:31`).

| # | action | result |
|---|---|---|
| 1 | `goto /#/mix` (profile's own persisted state) | pane error boundary: `color_non_finite` |
| 2 | dump `localStorage` | `color-picker` held `{"inputColor":"lab(92% 88.8 20 / 82.7%)"}` — the app's own alpha'd persisted color |
| 3 | `localStorage.clear()`, reload | boots clean (gradient pane renders, no boundary) |
| 4 | seed `color-palettes` with `lab(92% 88.8 20 / 82.7%)`, reload `/#/palettes` | boundary `color_non_finite`, `articles: 0` |
| 5 | seed with in-gamut `lab(50% 20 10 / 82.7%)`, reload | boundary `color_non_finite`, `articles: 0` |
| 6 | seed with `#e11d48`/`#0ea5e9`, reload | no boundary |
| 7 | attempts to hold `/#/mix` for the nested-button probe | URL drifted `/#/mix → /#/extract → /#/atmosphere → /#/ → /#/?space=oklch&color=oklch(none 0.2 30)` (L-14); probe abandoned |
| 8 | `node` against `dist/subpaths/{color,css}.js` | `safeAccentColor` returns `ERR color_invalid_input` for every alpha<1 accent, `OK` for `#e11d48` |

No file under `src/`, `demo/`, `api/`, `test/`, `e2e/`, `docs/tranches/V/vnext/`, `scripts/dev/dev.sh`
or any `INBOX.md` was modified. This report is the only artifact written.

---

## 6. Ranked docket

| id | severity | one line |
|---|---|---|
| L-1 | **BLOCKER** | `certifyAccentInk` throws on the library's typed Result; one alpha'd palette color destroys the pane (reproduced) |
| L-2 | MAJOR | card imports glass-ui through 19 prohibited one-line forwarding dirs while importing it directly 4 lines away |
| L-3 | MAJOR | cross-feature consumption + 0/16, 4/16, 6/16 host wiring ⇒ menu controls that provably do nothing; card nested inside a `<button>` |
| L-4 | MAJOR | untyped string action bus with silent-drop default; `copyAll` orphan proves the hole |
| L-5 | MAJOR | feedback owned by the card, driven by `defineExpose` + `(el: any)` ref maps in two panes and one composable contract |
| L-6 | MAJOR | six-file split cuts through the state: `PaletteCardSwatches` = 8 props / 8 emits / 0 state |
| L-7 | MAJOR | 16 hand-rolled icon-button recipes (4 in-folder) beside the glass-ui atom the same file uses |
| L-8 | MAJOR | two `slugify` homes, measured divergence (`caf-noir` vs `cafe-noir`) on the card's Export path |
| L-9 | MINOR | bespoke JS height motion + `scrollIntoView` inside a feature composable; third motion mechanism in one component |
| L-10 | MINOR | two prop idioms and two hand-rolled `v-model`s in one folder (edict 7) |
| L-11 | MINOR | `ActionFeedback` timer never disposed on unmount |
| L-12 | MINOR | ownership docs cite `PaletteDialog` (excised at T.W0-3); `modalStack?` branch has zero callers |
| L-13 | INFO | visual audit rendered every card host empty — zero coverage, false-negative greens |
| L-14 | INFO | route rewrites itself and emits `oklch(none …)` into its own URL; blocks live card probes |
