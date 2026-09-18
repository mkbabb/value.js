# CHALLENGE-C — `demo/shell/dock/ColorInput.vue` — implementation is defective

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]` (1M-context variant) — matching
the explicit Opus 5 declaration this seat was spawned with. Seat declared, not inherited.

- Repository: `/Users/mkbabb/Programming/value.js`, branch `tranche-u`.
- HEAD at spawn: `c654824e`. HEAD at audit time: `9bcd5d91` — two docs-only commits landed under me;
  no `demo/` source byte moved.
- Subject: `demo/shell/dock/ColorInput.vue`, 377 lines (`wc -l` = 377). Sole consumer:
  `demo/shell/dock/layers/ActionBarLayer.vue:115`.
- No source edits. Nothing outside this directory written.

```
$ git log --oneline -3
9bcd5d91 docs(V·mail): row O-11..O-15 + O-10a; bank the packet seat's receipts and path deviations
c0078d96 docs(V·megatranche): durability checkpoint — 9 apotheoses, registries, laws, probes, workflows, resume recipes
c654824e docs(V·mail): land I-11/I-12 — the vnext kickoff prompt + context packets (r2 true-Fable); the mega-tranche formation opens
```

## Status of this file — ROUND 2, superseding

A prior CHALLENGE-C report (also Opus 5, 2026-07-24, 18 findings) already occupied this path. **It has
been preserved byte-for-byte at `challenge-C-implementation.round1.md` in this same directory** and is
not superseded in the sense of being discarded — every one of its findings is carried forward below
with an independent verification verdict. This file is the round-2 authority because it raises the
severity ceiling: round 1 topped out at MAJOR; round 2 lands **two BLOCKERs**, one of which round 1
reached the doorway of and explicitly could not reproduce.

## Verdict

**DEFECTIVE.** 25 live findings — 2 BLOCKER, 12 MAJOR, 8 MINOR, 3 INFO (7 new in round 2, 18 carried
and verified from round 1).

**Strongest defect (new, and it is the strongest in either round):**

> **The send button is structurally incapable of submitting what the user typed.** `onInputBlur`
> overwrites the field with the canonical colour; the UA fires `blur` on mousedown and `click` on
> mouseup; `onSubmitColor` then reads the already-overwritten DOM. Every press re-submits the colour
> that was already active. Measured end-to-end in the live app.

Round 1's answer to the MT-F001 question — **it SWALLOWS**, and mislabels a library `TypeError` as a
user typo — is re-confirmed by an independent instrument and stands unchanged.

---

## Part I — ROUND-2 FINDINGS (new)

### R2-1 · BLOCKER · The send button can never submit typed text

`onInputBlur` (`ColorInput.vue:183-193`) repaints the field unconditionally:

```ts
const onInputBlur = () => {
    inputIsFocused.value = false;
    if (!proposeMode && inputColorRef.value) {
        inputColorRef.value.innerText = formattedCurrentColor.value;   // :191
    }
};
```

`onSubmitColor` (`:213-217`) reads that same node back:

```ts
const onSubmitColor = () => {
    if (inputColorRef.value) parseAndSetColor(inputColorRef.value.innerText);   // :215
};
```

The UA moves focus on **mousedown** and fires `click` on **mouseup**. Pressing the send button
therefore runs `onInputBlur` *first* — destroying the user's text — and `onSubmitColor` *second*,
which submits the colour that was already active.

**Reproduction (live, `http://localhost:9000/#/`, dock → Toggle action bar → Open color input):**

```json
{ "committed":  "rgb(255 0 0)",     // model colour before the edit
  "typed":      "rebeccapurple",    // what the user typed (@input dispatched)
  "afterBlur":  "rgb(255 0 0)",     // <- onInputBlur wiped it   (mousedown leg)
  "afterSend":  "rgb(255 0 0)" }    // <- onSubmitColor re-submitted the OLD colour (mouseup leg)
```

The full sequence took **292 ms** — far inside the 2000 ms debounce — so nothing else had committed.

What the user experiences, in order:
1. Click send within 2 s of typing → **nothing happens**. `parseAndSetColor` short-circuits on
   `serialize(converted) === serialize(model.value.color)` (`useColorParsing.ts:69`), so there is not
   even an error to notice.
2. The *still-armed* debounce then fires at t+2000 ms and applies the typed colour anyway — so the
   colour changes about two seconds after the button appeared to be dead. The control reads as both
   broken and flaky.
3. There is no state in which the button does its stated job: before 2 s it submits the stale value,
   after 2 s it re-submits what the debounce already applied.

**Relation to round 1.** Round 1 C-9 identified the blur snap-back mechanism, labelled it
`MECHANISM-DERIVED — reproduction: NONE`, and drew a weaker consequence ("the field shows the old
value for up to ~1.8 s, then the app's colour jumps"). It did not carry the mechanism into
`onSubmitColor`. Round 2 supplies the reproduction and the sharper consequence: **round 1's C-9
should be read at BLOCKER, not MAJOR.**

**Cure (gestalt).** The contenteditable must stop being the source of truth. Hold the draft in a local
`shallowRef<string>` written by `@input`, render *from* it, and let `blur` decide only whether to
*discard* the draft — never to rewrite a DOM node that a pending click is about to read.
`onSubmitColor` then reads the ref and the blur/click ordering becomes irrelevant. This is the same
synchronous-local-cache idiom edict 7 already mandates for the `defineModel` round-trip; the hazard
class is identical, only the async hop differs. It also collapses round 1's C-16 (six imperative
`innerText` writers over three sources of truth) in the same stroke — the two findings have one cure.

---

### R2-2 · BLOCKER · The pending parse is never cancelled: an abandoned edit overwrites a later, deliberate commit

`parseAndSetColorDebounced = debounce(parseAndSetColor, 2000)` (`useColorParsing.ts:92`); `debounce`
returns a `.cancel()` (`demo/shared/utils.ts:36-41`). **`ColorInput.vue` never calls it — not on blur,
not on Enter, not on send, not on propose-mode switch, not on unmount. The component has no
`onUnmounted`/`onBeforeUnmount` at all** (`grep` → no matches).

The sibling consumer of the identical API does:

```
demo/picker/ColorPicker.vue:383:    if (parseAndSetColorDebounced.cancel) parseAndSetColorDebounced.cancel();
```

so the omission is demonstrated, not stylistic.

**Reproduction** (`npx vite-node`, driving the real `useColorParsing` with real timers):

```
--- C: the abandoned-edit race (blur never cancels the 2000ms debounce) ---
C1 committed #abcdef             parseError=false color=rgb(171 205 239)
C2 after committing #00ff00      parseError=false color=rgb(0 255 0)
C3 2.3s later, nothing touched   parseError=false color=rgb(255 0 0)   <- the abandoned 'red' won
```

The user typed `red`, abandoned it, deliberately chose green by another surface (swatch, slider, URL),
and **2.3 s later the colour silently became red.** `onInputBlur` makes it worse by design: it
repaints the field to the canonical colour, *showing* the user their edit was discarded while the
commit is still armed.

Post-unmount variant: `Dock.vue:153` (`<DockLayer v-if="hasAnyActionBar">`) and `:156`
(`<ActionBarLayer v-if="actionBar" …>`) mean this component really is unmounted on layer/route change.
A pending debounce then mutates the global colour model from a destroyed component.

**Compounding with round 1 C-8** (the debounce is an app-wide singleton on the shared pipeline): the
*only* `.cancel()` in the application is owned by `ColorPicker`'s lifetime. So the pending parse of
this component is cancelled by the wrong component's unmount and by nothing else — cancelled when it
should fire, and firing when it should be cancelled. Two findings, one broken ownership.

**Cure.** One owner for "there is a pending commit". Fold the debounce into the draft-`shallowRef` of
R2-1 so the pending state is visible reactive state rather than a hidden timer, and give it the
component's lifetime.

---

### R2-3 · MAJOR · `contenteditable` is `true`, not `plaintext-only` — a rich paste blows the dock row open

Measured live: `contenteditable=""` (i.e. `true`). Performing exactly the operation a UA performs for
a rich paste into `contenteditable=true`:

```json
{ "contenteditableAttr": "\"\"",
  "insertHTMLAccepted": true,
  "innerHTML": "<b style=\"color:red;font-size:32px\">re</b><span style=\"background:yellow\">d</span>",
  "childElementCount": 2,
  "innerText": "red",
  "firstChildFontSize": "32px",
  "inputHeightPx": 66 }
```

The control went from its measured resting **45.9 px to 66 px** — a 44 % blow-out of a dock row — and
now holds foreign markup with foreign inline styles. Copying a colour value out of any styled page (a
docs table, a Figma panel, a CSS snippet on a blog) does this.

In colour mode the damage is transient — `onInputBlur`'s `innerText` setter replaces the children —
but **in propose mode the blur repaint is explicitly skipped** (`:190`, `if (!proposeMode …)`), so the
pollution persists for the whole propose session, and `proposedName` is fed from the polluted node.

Round 1 §3 noted that pasted *newlines* reach the parser; the markup channel and the geometric
consequence are new.

**Cure.** `contenteditable="plaintext-only"` — the exact semantic the component wants, supported by
Chrome/Safari/Firefox 125+, and it removes the sanitisation question entirely.

---

### R2-4 · MAJOR · Propose-mode success desyncs the field from its own model, and the comment describing the cure is false

```ts
async function submitProposedName() {                       // ColorInput.vue:230
    …
    await proposeColorName(proposedName.value.trim().toLowerCase(), cssStr);
    proposedName.value = "";                                // :237
    // Signal parent to exit propose mode                   // :238  <- nothing is signalled
    if (inputColorRef.value) {
        inputColorRef.value.innerText = formattedCurrentColor.value;   // :240
    }
```

1. **Nothing is signalled.** The component declares no `defineEmits` at all. The parent's
   `colorInputRef` (`ActionBarLayer.vue:28`) is assigned at `:116` and **never dereferenced**;
   `toolbarMode` (`:30`) is only ever changed by `cycleToolbarMode`. The app stays in propose mode
   after a successful proposal.
2. **State desync.** `proposedName` is cleared to `""`, then the *visible field* is filled with a
   colour serialization. Programmatic `innerText` fires no `input` event, so `proposedName` stays
   `""`. The button is `:disabled="!proposedName.trim() || proposing"` (`:70`) → the user is left
   looking at a **filled field above a permanently dead button**, with a colour string sitting in the
   propose field being offered as a colour *name*.

Round 1 C-13 caught the dead expose and C-14 the silent *failure* path; the success path was not
examined.

**Cure.** `const emit = defineEmits<{ proposed: [] }>()`, and let the parent own the mode — it already
owns `toolbarMode`. The field's text must come from the same single reactive source as R2-1, so
clearing the model clears the field by construction rather than by a second imperative write.

---

### R2-5 · MINOR · The mode-flash timer is a hardcoded desync of the token it drives

```ts
setTimeout(() => { modeTransition.value = false; }, 300);   // ColorInput.vue:256
```
```css
.color-input-mode-flash { animation: input-mode-flash var(--duration-slow) var(--ease-decelerate); }
```

`--duration-slow: 0.45s` — pasted from
`node_modules/@mkbabb/glass-ui/dist/styles/tokens/scheme-motion.css` — i.e. **450 ms**. The class is
removed at **300 ms = 66.7 %** of the declared duration, so the animation is cancelled before it
completes. `demo/DESIGN.md:212` names `--duration-slow` as this animation's token, so the JS literal
contradicts the design record as well as the CSS.

This sharpens round 1 C-15 (which caught the missing teardown but not the numeric desync).

**Cure.** Drive the flash off `animationend`, or read the token. A hardcoded duplicate of a design
token is a second source of truth.

---

### R2-6 · MINOR · Three of four imports route through one-line re-export shims of the package the fourth import names directly

```ts
import { writeClipboard } from "@mkbabb/glass-ui";                              // :117 — direct
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";     // :118-122
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../ui/tooltip"; // :123-128
import { Separator } from "../../ui/separator";                                 // :129
```
```
$ cat demo/ui/popover/index.ts
export { Popover, PopoverTrigger, PopoverContent } from "@mkbabb/glass-ui";
$ cat demo/ui/tooltip/index.ts
export { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@mkbabb/glass-ui";
$ cat demo/ui/separator/index.ts
export { Separator } from "@mkbabb/glass-ui";
```

Migration aliases — edict 2. In the same dock row `ActionBarLayer.vue:8` imports
`@mkbabb/glass-ui/dock` directly and renders a glass `DockSeparator` beside this file's shim-routed
`Separator`.

**Scope, honestly stated:** 18 such `demo/ui/*/index.ts` shims exist repo-wide and 7 files import
`ui/popover`, so this is systemic residue, not this component's invention. Round 1 §6 correctly
recorded the barrels as *not* local reimplementations; round 2 adds that a barrel over the same
package imported directly two lines above is still an alias. **Route the sweep; do not patch here.**

---

### R2-7 · MINOR · `oklch(0.5 0.1 250 / )` is accepted — an empty alpha after the slash parses as a valid colour

```
$ npx vite-node scratchpad/probe.ts
"oklch(0.5 0.1 250 / )" -> OK
```

CSS Color 4 requires an `<alpha-value>` after the `/`. The same `slash[…]` handling that produces
MT-F001's throw on `slash[0]` produces a false *accept* on `slash[1]`: `alphaToken(slash[1]?.trim())`
(`src/css/grammar.ts:180`) treats the empty string as absent rather than as a syntax error. Round 1's
sweep recorded `"oklch(0 0 0 / )" -> parseError = false` without naming it a spec violation.

Not this component's defect — recorded here because it is the *adjacent* half of MT-F001 and the
repair for one should cover the other. **This is a `src/css/grammar.ts` finding; route to the library
seat.**

---

## Part II — MT-F001, re-answered by an independent instrument

**It swallows. No crash reaches the user, and no crash reaches telemetry either.**

```
$ npx vite-node scratchpad/probe.ts        # direct against @mkbabb/value.js/css
"oklch("               -> ERR-RESULT       (well-behaved failure)
"oklch()"              -> THROW TypeError Cannot read properties of undefined (reading 'replace')
"rgb()" "hsl(  )" "lab()" "lch()" "color()" "oklab()" "oklch(  )" -> THROW TypeError …
```

Path: `ColorInput.vue:194 onInputInput` → `:199 parseAndSetColorDebounced` →
`useColorParsing.ts:60 parseAndSetColor` → `:64 parseColor` → `picker-color.ts:110 parsePickerColor`
→ `parseCssColor` → `src/css/grammar.ts:181` `splitTopLevel(slash[0]!.replace(…))` where `slash` is
`[]` and the `!` is a lie.

Live, in the app:

```json
{ "afterDebounce": { "badge": true, "badgeText": "not a valid color",
                     "inputClass": true, "pageErrors": [] },
  "afterEnter":    { "badge": true, "pageErrors": [], "text": "oklch()" } }
```

`pageErrors` was collected by a `window.onerror` + `unhandledrejection` interceptor installed before
the input. **Empty.** The user sees a small red *"not a valid color"* pill for two seconds — byte-
identical to what a plain typo produces. The `catch` at `useColorParsing.ts:84` has no binding and no
discrimination, so `PickerColorError` (the typed, diagnostics-carrying failure raised on the Result
contract at `picker-color.ts:112`) and a library `TypeError` are rendered the same. Edict 2, no
masking fallbacks; and this mask is currently hiding a live BLOCKER.

**Cure.** Narrow the catch — `catch (e) { if (!(e instanceof PickerColorError)) throw e; … }`. A
genuine syntax rejection stays a quiet inline error; anything else reaches `window.onerror`, where
MT-F001 would have been caught on day one. `ParseEchoReadout` (`ColorInput.vue:109`) is the natural
home for the `diagnostics` the catch currently discards.

---

## Part III — ROUND-1 CARRY LEDGER (all 18, independently verified)

Verdicts are round 2's own, from round 2's instruments. `challenge-C-implementation.round1.md` holds
the full evidence for each.

| # | Round-1 finding | Round-2 verdict | Round-2 note |
|---|---|---|---|
| C-1 | bare `catch` masks a `TypeError` as a user error, 2000 ms late | **CONFIRMED** (re-run on `vite-node` + live interceptor) | severity holds MAJOR; it is the *invisibility mechanism* for the BLOCKER, not the BLOCKER |
| C-2 | `.btn-interactive` is a phantom class | **CONFIRMED, independently** | `grep -rn "\.btn-interactive" demo/ src/` → empty; `grep -rl "btn-interactive" node_modules/@mkbabb/glass-ui/dist/` → empty. Both send buttons have no hover/press/focus/disabled register |
| C-3 | `crown-appear` is a dead animation | **CONFIRMED by a different instrument** | round 1 used `compileStyle()`; round 2 scanned every live stylesheet: the only keyframes present are `crown-appear-55dadc03` and `input-mode-flash-55dadc03`, while `ColorInput.vue:38` references the unprefixed `crown-appear` from an inline style Vue does not rewrite. `grep -rn crown-appear demo/ glass-ui/styles/` finds no other definition. `demo/DESIGN.md:213` documents an animation that has never run |
| C-4 | the send button is the sole nameless button on `/#/` | **CONFIRMED** | live: `{"btnAria":{"label":null,"text":"","title":null},"sendBtn":{"w":24,"h":24}}`. See the withdrawal note below — I tried to break this attribution and could not |
| C-5 | rejected colour never announced (no `aria-invalid`/live region) | **CONFIRMED** | live: `{"inputAria":{"invalid":null,"describedby":null},"badgeAria":{"role":null,"live":null}}`. WCAG 3.3.1 Level A |
| C-6 | the first invalid input produces no error at all | **CONFIRMED** | `vite-node`: `after parseAndSetColor("oklch()") parseError=false`; `initialParse` is spent by the user's own first attempt (`useColorParsing.ts:86,88`) |
| C-7 | retyping the same invalid text is silent forever | **CONFIRMED, and sharpened** | `B1 'nope-1' parseError=true` → `B2 after 2.1s parseError=false` → `B3 retry 'nope-1' parseError=false`. The ordinary loop (type bad colour → badge times out → press Enter again to see why) yields **nothing** |
| C-8 | the debounce is an app-wide singleton; another component's unmount discards this one's pending parse | **CONFIRMED, and compounded** | `ColorPicker.vue:383` owns the only `.cancel()` in the app; this component owns none. See R2-2 — cancelled by the wrong lifetime, never by the right one |
| C-9 | 2000 ms debounce + blur snap-back that fights it (reproduction: NONE) | **CONFIRMED, REPRODUCED, and ESCALATED to BLOCKER** | see R2-1: the mechanism does not merely delay the display, it makes the send button structurally incapable of its function |
| C-10 | focus indicator is the user-chosen colour with the UA ring deleted | **CONFIRMED by code** (`:16` `focus-visible:outline-none`; `:162-166` `borderColor: cssColor.value`) | not re-measured live; round 1's measurement stands |
| C-11 | the error badge paints over the send button | **CONFIRMED by geometry** | `.send-btn { right: .25rem }` measured 24 px wide → occupies right 4–28 px; `.error-badge { right: .5rem }` with `white-space: nowrap` and the string "not a valid color" is far wider than 20 px, is later in DOM order (`:87` vs `:67`/`:76`), and neither carries `z-index`. Overlap is forced |
| C-12 | zero behavioural coverage + a cited test file that does not exist | **CONFIRMED** | `grep -rn "Enter a CSS color" e2e/` → one hit, `o10d-display-voice-census.spec.ts:370`, a font-face census that hovers the field and never types. `ls test/parsing/` → `timeline` only; `grep -rn submitProposedName test/ e2e/` → only the docblock at `color-propose.spec.ts:24` that claims the coverage. See the mutation below |
| C-13 | dead surface: unread prop, two unread injections, exposed method with no caller | **CONFIRMED** | `editTarget` `:139`; `cssColorOpaque` `:146`; `canProposeName` `:150`; `defineExpose` `:282-288`; `grep -rn "copyAndSetInputColor\|onSubmitColor\|inputIsFocused" demo/ \| grep -v ColorInput.vue` → empty. Rider: `void writeClipboard(color)` (`:222`) discards a `Promise<CopyResult>` whose own docblock says the discriminated result exists precisely so callers own their feedback (`glass-ui/dist/composables/dom/useClipboard.d.ts:33-37`) |
| C-14 | a failed proposal is silent, laundered through `catch (e: any)` | **CONFIRMED** | `:242-243`. On this dev server every proposal fails — console carries `[value.js] value.js dev is MISCONFIGURED … every palette request will be blocked` — and the user is told nothing. `catch (e: any)` is an explicit escape from `strict`'s `useUnknownInCatchVariables` |
| C-15 | uncleaned timer and rAF in the propose-mode watcher | **CONFIRMED, sharpened by R2-5** | plus the 300 ms/450 ms token desync |
| C-16 | six imperative `innerText` writers; select-all-on-focus destroys caret placement | **CONFIRMED** | and R2-1 shows the writers are not merely inelegant — writer `:191` is what breaks the submit control. One cure serves both |
| C-17 | coarse-pointer hover-Popover hypothesis | **STILL A HYPOTHESIS** — not tested in round 2 | round 2 adds a *keyboard* leg that needs no probe: `trigger="hover"` means the help copy, the serialized colour and the whole `ParseEchoReadout` are unreachable without a pointer, and the field carries no `aria-describedby` to them |
| C-18 | dock route-drift blocked live testing | **CONFIRMED, and worse in round 2** | the dev server was being hot-reloaded by concurrent sessions throughout: a long `[vite] Failed to reload` list including `demo/shell/dock/ColorInput.vue` itself, plus a `vite-error-overlay` mid-run, plus synthetic clicks on `[aria-label="Toggle action bar"]` landing on `/#/palettes` and `/#/gradient`. Every round-2 measurement was therefore taken inside a **single** `evaluate` call to keep it self-consistent |

### Withdrawn round-2 hypothesis (recorded so nobody re-litigates it)

I formed the hypothesis that the visual census cannot see this component — the dock boots with the
action bar collapsed and I measured the component's layer carrying `inert` at rest — which would have
made round 1's C-4 attribution wrong. **It is wrong; round 1 is right.** The census's visibility
predicate is purely geometric:

```js
// docs/tranches/V/megatranche/audit/visual/capture.mjs:83-86
const vis = (el) => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
```

and I measured the at-rest field at `233.2 × 45.9` with its 24 × 24 button laid out. An `inert` layer
is still boxed, so the nameless button *is* counted. Consistently, the button measures exactly
`24 × 24` and the tap-target filter is `w < 24 || h < 24`, so its absence from `smallTapTargets` is
also correct. **Hypothesis withdrawn; C-4 confirmed.**

---

## Part IV — Test truth: the exact mutation that keeps the suite green

```
$ grep -rn "Enter a CSS color" e2e/
e2e/smoke/oracles/o10d-display-voice-census.spec.ts:370
```

That is the only test in the repository that touches this component, and it uses the input purely as
a hover target to census the popover title's `font-family` and `font-weight` (`:367-380`). It never
types, never submits, never asserts a colour changed. `e2e/smoke/flows/color-propose.spec.ts` asserts
only the *toggle button's* aria-label in `ActionBarLayer` and never reaches ColorInput.

**The mutation:** delete the entire handler wiring — `@keydown`, `@input`, `@focus`, `@blur`, and both
`<button>` elements — leaving the `<span aria-label="Enter a CSS color">` and the Popover. `o10d`
still finds a hoverable span and still reads the popover title; `color-propose` never touched any of
it. **A colour input that accepts no input and commits nothing passes the full suite.**

And the gate documents coverage it does not have (`color-propose.spec.ts:22-24`): *"the contenteditable
submission has unit coverage in `test/parsing/extract.test.ts` via the underlying `submitProposedName`
handler."* `ls test/parsing/` → `timeline` only. No test anywhere names `submitProposedName` or
`proposeColorName`. A coverage claim with nothing behind it is the worst kind of vacuous gate, because
it tells the next reader to stop looking.

Lint cannot help either: `eslint.config.js:70` disables `@typescript-eslint/no-explicit-any` and
`:153` disables `vue/no-unused-vars` — which is exactly why C-13's dead surface and C-14's
`catch (e: any)` survive.

---

## Part V — Negative results (checked, sound; do not re-spend the budget)

- **PRM-RAF epidemic** — one single-shot `requestAnimationFrame` (`:262`), optional-chained, correctly
  used to defer focus past a DOM write. No loop. **Clean** (teardown missing → C-15).
- **WebGL** — none here; the `"WebGL: context lost."` console error on `/#/` in `REPORT.json` is the
  HeroBlob surface.
- **`ValueUnit` nesting accumulation** — the component never constructs colour values; it hands
  strings to `parseAndSetColor`. No accumulation site.
- **`defineModel` stale reads** — none in this component. R2-1 is the same hazard *class* reached by a
  different route: DOM-as-source-of-truth instead of a synchronous local cache.
- **oklch→HSV hue drift / `stableHue`** — correctly located in `useColorParsing.ts:39-46` and
  `:76-83`, both gating on `s*v > 0.01` and retaining the last deliberate hue in `catch`. **Sound.**
- **reka-ui slider pointer-capture** — no slider here. N/A.
- **`verbatimModuleSyntax`** — `import type { EditTarget }` (`:134`) is the only type-only import and
  is correctly marked. **PASS** (the import is dead — C-13).
- **Boundary inputs through this path** — `rgb(0 0 0)`, `rgb(255 255 255)`, `oklch(0 0 0)`,
  `oklch(none none none)`, `#000`, `rgb(-0 -0 -0)` parse; `rgb(NaN NaN NaN)` and `rgb(1e400 0 0)`
  raise `PickerColorError` and are handled. No boundary crash of this component's making — with round
  1's correct caveat that the sweep is clean *for the same reason the BLOCKER is invisible*.
- **Horizontal overflow** — `overflowX: 0` on `/#/` in all four capture matrices (`REPORT.json`); the
  `mask-image` fade plus `text-ellipsis whitespace-nowrap` (`:16`, `:300-306`) contain long values,
  and the mask is cleared on `:focus` (`:303-306`) so a focused user sees the tail. **This part is
  careful and right.**

## Part VI — Owner-edict compliance (round 2)

| Edict | Verdict | Evidence |
|---|---|---|
| 1 · No god modules | **PASS** | 377 lines, one concern; the parse engine lives in `useColorParsing` |
| 2 · No legacy / no masking fallbacks | **FAIL** | C-1 (bare `catch` masking a `TypeError`); C-13 (dead exposed API); R2-6 (three shim-routed imports beside a direct one) |
| 3 · KISS, no contrivance | **FAIL** | C-16 + R2-1: six imperative writers over three sources of truth, one of which breaks the submit control |
| 4 · Glass-ui is the design system | **FAIL** | C-2 — `.btn-interactive` exists in neither the repo nor `@mkbabb/glass-ui@7.0.0` |
| 5 · Root-level styling | **FAIL** | four per-instance inline overrides: `:22` (`borderColor`), `:37-39` (the dead `animation`), `:74`/`:81` (`{ stroke: safeAccent }`); the error state has two style owners (`:19` class + `:163` inline) |
| 6 · Animations never deleted | **FAIL** | C-2 (a working hover/press recipe retired onto a phantom) and C-3 (`crown-appear` has never played) |
| 7 · Idiomatic Vue 3.5 | **FAIL** (round 1 said PARTIAL) | `useTemplateRef` ✓ and reactive props destructure ✓, but R2-1 shows the missing `shallowRef` cache is not a style point — it is the BLOCKER |
| 8 · `verbatimModuleSyntax` | **PASS** | `:134` |

## Reproduction assets

Throwaway probes, session scratchpad only, never written into the repo:

- `…/scratchpad/probe.ts` — MT-F001 across the eight declared inputs plus the `/ )` false-accept,
  direct against `@mkbabb/value.js/css`.
- `…/scratchpad/parseprobe.ts` — first-invalid silence + the boundary sweep, driving the real
  `useColorParsing`.
- `…/scratchpad/parseprobe2.ts` — the `previousInvalid` latch after flash-timeout, and R2-2's
  abandoned-edit race, with real timers.

Run: `npx vite-node --config vite.config.ts <path>`.

Live probes were read-only against `http://localhost:9000`, each measurement taken inside a single
`evaluate` call for the reason given in C-18.

---

*Seat: CHALLENGE-C · implementation · ROUND 2. Round 1 preserved verbatim at
`challenge-C-implementation.round1.md`. Written only under
`docs/tranches/V/megatranche/audit/components/shell-dock-colorinput/`; no file outside this directory
was created or modified.*
