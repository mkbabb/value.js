# CHALLENGE-C — `demo/shell/dock/ColorInput.vue` — implementation is defective

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, matching the
explicit Opus 5 declaration this seat was spawned with. Seat is declared, not inherited.

- Repository: `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
- Subject: `demo/shell/dock/ColorInput.vue` (377 lines), area `demo/shell`.
- Sole consumer: `demo/shell/dock/layers/ActionBarLayer.vue:115`.
- Verdict: **DEFECTIVE** — 18 findings, 9 MAJOR, 1 of which is a phantom-CSS-class regression the
  repo's own `LESSONS-LEARNED.md` already names by class.
- No source edits were made. No file outside this directory was written.

---

## 0. What was actually run (evidence provenance)

| # | Instrument | What it decided |
|---|---|---|
| P1 | `npx vitest run` against `parseCssColor` with 11 hand-built inputs | MT-F001 confirmed **+ a 9th throwing input** the record does not list |
| P2 | `@vue/compiler-sfc` `compileStyle()` on this SFC | the `crown-appear` animation is **dead** |
| P3 | whole-repo + whole-`node_modules` grep for `.btn-interactive` | the class is defined **nowhere** |
| P4 | Live Playwright/CDP against `http://localhost:9000/#/` | nameless button, 24×24 tap target, select-all-on-focus, MT-F001 user-visible outcome, missing `aria-invalid`/`aria-live` |
| P5 | `npx vitest run` driving `useColorParsing` (this component's parse path) with fake timers | first-invalid suppression, `previousInvalid` latch, shared-debounce cancellation, 2000 ms latency, boundary inputs |
| P6 | `docs/tranches/V/megatranche/audit/visual/REPORT.json` row for `safari-desktop-light /#/` | `namelessButtons: 1` — attributed to this component |

Probe scripts lived in the session scratchpad, not the repo. One transient probe was copied into
`test/tmp-probe/` for P1 and removed in the same session (`rm -rf .../test/tmp-probe` — pasted below).

---

## 1. The MT-F001 question, answered

**Question posed to this seat:** does this component guard the `parseCssColor` TypeError, swallow it,
or crash?

**Answer: it SWALLOWS it, and mislabels it as a user error, 2000 ms late.**

### 1a. The library defect, re-confirmed and widened (P1)

```
$ npx vitest run test/tmp-probe/probe.test.ts --reporter=basic
THROW "oklch()"    TypeError: Cannot read properties of undefined (reading 'replace')
THROW "rgb()"      TypeError: Cannot read properties of undefined (reading 'replace')
THROW "hsl()"      TypeError: Cannot read properties of undefined (reading 'replace')
THROW "lab()"      TypeError: Cannot read properties of undefined (reading 'replace')
THROW "lch()"      TypeError: Cannot read properties of undefined (reading 'replace')
THROW "color()"    TypeError: Cannot read properties of undefined (reading 'replace')
THROW "oklab()"    TypeError: Cannot read properties of undefined (reading 'replace')
THROW "hsl(  )"    TypeError: Cannot read properties of undefined (reading 'replace')
OK   "oklch("     ok=false
OK   "rgb(,)"     ok=false
THROW "hwb()"      TypeError: Cannot read properties of undefined (reading 'replace')
```

`src/css/grammar.ts:181` — `splitTopLevel(body, "/")` returns `[]` for an empty body, so
`slash[0]!` is `undefined` and the non-null assertion is false:

```ts
const components = splitTopLevel(slash[0]!.replace(/,/g, " "), "space");
```

**New fact for the MT-F001 record: `hwb()` throws too — nine inputs, not eight.** The declared set
omits it. Note also that `oklch(` (unbalanced, no `)`) correctly returns `ok:false` — so the
"type `oklch(` then `)`" scenario is precisely the transition from a well-behaved failure to a throw.

### 1b. Where the throw lands (code path)

```
ColorInput.vue:199  parseAndSetColorDebounced(text)      // @input, 2000 ms trailing
  → useColorParsing.ts:92  debounce(parseAndSetColor, 2000)
  → useColorParsing.ts:63  try { parseColor(input) }
  → useColorParsing.ts:26  parsePickerColor(source.trim().toLowerCase())
  → picker-color.ts:110    parseCssColor(source.trim())   ← THROWS TypeError
  → useColorParsing.ts:84  catch { previousInvalid = input; if (!initialParse) flashParseError(); }
```

The `catch` on line 84 has **no binding and no discrimination**. It cannot tell
`PickerColorError("Invalid CSS color")` — a legitimate parse failure raised on the Result contract at
`picker-color.ts:112` — from a `TypeError` raised by a false non-null assertion inside the library.
Both become the string "not a valid color".

### 1c. What the user actually sees (P4, live at `http://localhost:9000/#/`)

Reproduction: navigate to `http://localhost:9000/#/?space=oklch&color=oklch(0.7%200.15%20200)`, open
the dock action bar → colour input, focus the field, replace its contents with `oklch()`.

```json
{
  "before": "oklch(70% 0.15 200deg)",
  "t0_immediate":     { "badge": false, "errCls": false,
                        "border": "oklab(0.738718 -0.0664458 -0.00957768)", "errs": [] },
  "t1_afterDebounce": { "badge": true, "badgeText": "not a valid color", "errCls": true,
                        "border": "rgb(219, 36, 36)", "text": "oklch()",
                        "stillFocused": true, "errs": [] }
}
```

`errs` was populated by a live `window.onerror` + `console.error`/`console.warn` interceptor
installed before the input. **It is empty.** So:

- No page error, no console error, no console warning. The TypeError is fully absorbed.
- For **~2000 ms after the user stops typing there is zero feedback** — no border change, no badge.
- Then the border goes `rgb(219,36,36)` and a badge reading **"not a valid color"** pops in.
- The message is a lie about the cause: `oklch()` is indeed not a valid colour, but the *same*
  message is what a library crash produces, so a real crash is indistinguishable from a typo. The
  next such library defect will be invisible to every operator and every gate.

This is a direct violation of owner edict 2 (**no masking fallbacks**): a bare `catch {}` over a
call whose documented contract is `Result`-returning is a mask, and it is currently masking a live
BLOCKER.

---

## 2. Findings

Severity: **MAJOR** = user-visible wrong behaviour or a broken owner edict with a live instance.
**MINOR** = real defect, bounded blast radius. **INFO** = recorded fact / labelled hypothesis.

---

### C-1 · MAJOR · the parse path masks a TypeError as a user error, 2000 ms late

**Evidence:** §1 above. `demo/color-session/useColorParsing.ts:84`, `demo/shell/dock/ColorInput.vue:199`.
**Reproduction:** as in §1c — pasted measurement.
**Mechanism:** undiscriminated `catch {}` over a `Result`-contract API + a 2000 ms trailing debounce
on the only feedback channel.
**Cure (gestalt, not patch):** the field's parse channel should consume the `Result` directly, never
an exception. `parsePickerColor` throwing at all is the transposition error — `useColorParsing`
should call `parseCssColor` and branch on `result.ok`, surfacing `result.diagnostics` as the field's
message, and let a genuine `TypeError` propagate to the app error boundary where it is *visible*.
The component then renders diagnostics instead of a hardcoded string. (The `grammar.ts:181`
`slash[0]!` fix itself is MT-F001's, outside this seat's write scope.)

---

### C-2 · MAJOR · `.btn-interactive` is a PHANTOM CLASS — both send buttons have no hover, press, focus, or disabled affordance

`ColorInput.vue:69` and `:78` both carry `class="send-btn btn-interactive"`. The component's own
scoped-style comment (lines 327–334) asserts the atom supplies the interaction legs:

> the bespoke transform-on-bezier hover/press recipe … is RETIRED onto the producer
> `btn-interactive` atom (template class): the scale longhand rides `--transition-liquid-spatial` at
> the spring's OWN clock, press/hover magnitudes + focus ring + disabled opacity are the house
> registers. This block keeps ONLY the seat geometry

**Evidence (P3):**

```
$ grep -rn "\.btn-interactive" --include="*.css" --include="*.vue" --include="*.ts" \
      --include="*.js" --exclude-dir=node_modules .
--- (empty = undefined in repo source) ---
$ grep -rl "btn-interactive" node_modules/
--- (empty = undefined by every dependency) ---
```

The string does not occur in **any file** of `@mkbabb/glass-ui@7.0.0` (verified version
`7.0.0`), nor in `demo/styles/`, nor anywhere in `node_modules`. Confirmed live too: `.send-btn`'s
scoped block (lines 335–346) contains only `position/right/top/transform/padding/border-radius/cursor`
plus `:disabled { cursor: not-allowed }`.

**Consequences, all live:**
- No hover response, no press feedback, **no focus ring** on the only submit control.
- **No disabled dimming.** In propose mode `:disabled="!proposedName.trim() || proposing"` renders a
  button that looks identical to an enabled one (`cursor: not-allowed` is the sole cue, invisible to
  touch and to anyone not hovering).
- The bespoke recipe that *did* work was deleted, not moved → **owner edict 6 violated**
  ("animations are never deleted, only moved or tokenized"). The comment documents the deletion.
- **Owner edict 4 mis-applied**: the refactor believed it was reusing a producer atom; the producer
  had already retired it.

**The repo already knows this failure by name.** `docs/precepts/instructions/LESSONS-LEARNED.md:603`:

> substrate `b0debec` (D.W2.D "delete zero-site orphans" — retired `.rainbow-vivid` +
> `.rainbow-pastel` + **`.btn-interactive`** under a false zero-site verdict …)

**Blast radius beyond this component** (same phantom class): `demo/palettes/browser/card/CurrentPaletteEditor.vue:75, :78, :100`, and `demo/DESIGN.md:237,:247` still document it as landed.

**Vacuous-gate rider:** the lesson names `scripts/proof-phantom-classes.mjs` as the mechanical gate.
That script does not exist in this repo (`ls scripts/ | grep -i phantom` → empty; `grep -n phantom
package.json .github/workflows/*.yml` → empty). The `proof:*` idiom was retired by owner order.
So a phantom class rides in with **zero** mechanical detection and zero test coverage.
**Cure:** the interaction legs belong in glass-ui as a real, exported atom (edict 4). Until the
producer ships it, the seat must not reference a class it cannot resolve — and the deletion of the
working recipe must be reverted, not left dangling.

---

### C-3 · MAJOR · the Crown's `crown-appear` animation is DEAD — scoped-keyframes renaming vs. an inline `animation:`

`ColorInput.vue:37-39` sets the animation as an **inline template style**:

```html
style="animation: crown-appear var(--duration-panel) var(--ease-decelerate) forwards;"
```

while `@keyframes crown-appear` is declared inside `<style scoped>` (lines 369–376).
`@vue/compiler-sfc` renames keyframes in scoped blocks and rewrites `animation` references **within
that same stylesheet only**. Inline template styles are not rewritten.

**Evidence (P2):**

```
$ node -e "…compileStyle({source, id:'data-v-55dadc03', scoped:true})…"
scoped = true
KEYFRAMES DECLARED: [ '@keyframes input-mode-flash-55dadc03', '@keyframes crown-appear-55dadc03' ]
ANIMATION REFS   : [ 'animation: input-mode-flash-55dadc03 var(--duration-slow) var(--ease-decelerate);' ]
--- TEMPLATE inline animation reference ---
animation: crown-appear var(--duration-panel) var(--ease-decelerate) forwards
```

`crown-appear` resolves to nothing → the animation-name is an unknown ident → the declaration is
ignored. The Crown never animates in. The `:key="crownKey"` on line 34 exists **solely** to
re-trigger this animation when the matched custom name changes (`crownKey` is
`currentColorMeta?.name ?? ""`, `useColorNameResolution.ts:64`) — so the re-trigger mechanism is dead
too, and the 8-line `@keyframes crown-appear` block (lines 369–376) is unreachable CSS.
Contrast `.color-input-mode-flash` (line 313), which references its keyframes from *inside* the
scoped block and therefore works — the same file contains the working and broken idiom side by side.
**Edict 6 violated in effect:** an animation that exists in source and never plays.
**Cure:** move the animation onto a scoped class (`.crown-appear`) applied via `:class`, so the
declaration and the keyframes live in the same rewritten stylesheet — matching the working
`.color-input-mode-flash` idiom two rules above it.

---

### C-4 · MAJOR (a11y) · the send button is the SOLE nameless button on route `/#/`

**Evidence (P4, live):**

```json
"sendBtn": {
  "accName": "(NONE)",
  "type": "(none → implicit type=submit)",
  "w": 24, "h": 24,
  "svgAriaHidden": "(unset)",
  "html": "<button data-v-55dadc03=\"\" class=\"send-btn btn-interactive\"><svg …>"
},
"namelessButtons": [ "send-btn btn-interactive" ]
```

**Attribution to the visual REPORT (P6):** `REPORT.json` → `safari-desktop-light /#/` →
`"a11y": { "namelessButtons": 1 }`, and `REPORT.md:95` lists `safari-desktop-light /#/: 1`. The live
DOM enumeration returns exactly one nameless button and it is **this component's**. This is this
component's entire contribution to the route-`/#/` nameless-button count, and it is 100% of it.

Detail:
- No `aria-label`, no `title`, no text content. `<ArrowRight>` renders a bare `<svg>` with
  `aria-hidden` **unset**, so the accessible name is empty in every browser.
- No `type` attribute → implicit `type="submit"`. Latent today (no ancestor `<form>`), a live
  regression the moment the dock is ever wrapped in one.
- **Tap target measured 24.0 × 24.0** — exactly at the WCAG 2.2 SC 2.5.8 (AA) floor, zero margin, and
  well below the 44×44 of SC 2.5.5 / Apple HIG. The arithmetic checks out against CSS
  (`padding: .25rem` = 4px + `w-4` = 16px + 4px = 24px), which validates the same arithmetic for the
  propose-mode branch: line 73 renders `<Loader2 class="w-3.5 h-3.5">` = 14px → 4+14+4 = **22×22,
  below the 24px floor**, i.e. the button *shrinks under the 2.5.8 minimum while a submit is in flight*.

**Cure:** name both buttons (`aria-label="Apply color"` / `"Submit proposed name"`), `aria-hidden`
the icons, add `type="button"`, and give the seat a fixed ≥24px box that does not depend on the icon
currently rendered.

---

### C-5 · MAJOR (a11y) · a rejected colour is never announced — no `aria-invalid`, no live region, WCAG 3.3.1 fail

**Evidence (P4, live, same probe):**

```json
"input": { "tag": "SPAN", "role": "textbox", "ariaLabel": "Enter a CSS color",
           "ariaMultiline": null, "tabindex": null,
           "ariaInvalid": null, "ariaDescribedby": null, "w": 301.9, "h": 45.9 },
"liveRegionsInDock": [ "off", "off", "off", "off" ]
```

Measured **while `parseError` was true** (`t1_afterDebounce.errCls: true`, `badge: true`).

- `aria-invalid` is never set, so AT reports the field as valid while it is visibly red.
- The badge is a bare `<span class="error-badge">` (line 87) — no `role="alert"`, no `aria-live`, and
  `pointer-events: none` (line 360). It is not referenced by `aria-describedby`.
- Every live region present on the page is `aria-live="off"`.

A screen-reader or magnifier user types an invalid colour and receives **no signal of any kind** that
it was rejected — and because the rejection is silent for 2000 ms (C-1) and sometimes silent forever
(C-6, C-7), there is no sighted fallback either.
**Cure:** bind `:aria-invalid="parseError && !proposeMode"` on the textbox, give the badge
`role="status"` (it is a transient, non-interrupting beat) and wire `aria-describedby` to it, and
announce the parse diagnostic rather than a fixed string.

---

### C-6 · MAJOR · the FIRST invalid input a user types produces no error at all

`useColorParsing.ts:49-89`: `initialParse` starts `true` and is cleared in a `finally` that runs on
**every** call, valid or not. `flashParseError()` is gated on `!initialParse`.

**Evidence (P5, pasted):**

```
A. parseError after 1st invalid input = false
A. parseError after 2nd invalid input = true
```

The suppression is only harmless when some other caller consumes the first invocation. It does not
always: `useColorPersistence.ts:69-74` calls `parseAndSetColor(storedInput)` only when
`hadPersistedColor` is true (`localStorage.getItem(COLOR_STORE_KEY) !== null`, line 55). **On a cold
load in a fresh profile — no persisted colour, no URL colour — the user's first typo is swallowed
entirely: no red border, no badge, no colour change, nothing.**
**Reproduction:** the pasted P5 harness constructs exactly that state (`createDefaultColorModel()`,
no persistence call) and the first invalid input yields `parseError === false`.
**Cure:** the suppression is compensating for a boot-time call that should not be running through the
*user-input* path at all. Boot restore should use a non-flashing `restoreColor()` entry point; the
user-input path then has no "first call is special" state to carry, and `initialParse` disappears.

---

### C-7 · MAJOR · retyping the same invalid text is silent FOREVER (`previousInvalid` latch)

`useColorParsing.ts:62`: `if (!input || input === previousInvalid) return;` — set on every failure
(line 85), and never cleared on the "same colour, no-op" success branch (lines 69–72).

**Evidence (P5, pasted):**

```
B. flash on 1st 'zzz' = true
B. after 2s expiry       = false
B. flash on retyped 'zzz'= false (expected true, got false => latched)
```

**User-visible sequence:** type `zzz` → red border + badge → wait 2 s for the badge to expire →
select-all, retype `zzz` (or paste the same string, or hit the send arrow again) → **nothing
happens.** No error, no change, no acknowledgement. The user's natural recovery move — retry the
thing that just failed to see the message again — is the one input the component is guaranteed to
ignore. Pressing the send arrow (`onSubmitColor`, line 213) hits the same latch.
**Cure:** the latch exists to suppress duplicate work from a debounce firing on unchanged text; that
is the debounce's job, not a persistent invalid-input memo. Drop `previousInvalid`; make the error
state a function of the last parse *result*, not of a remembered string.

---

### C-8 · MAJOR · the debounce is an app-wide singleton; another component's unmount silently discards this component's pending parse

`useColorParsing.ts:92` creates `parseAndSetColorDebounced` **once** per `useColorParsing()` call, and
`useColorPipeline` is instantiated exactly once (`demo/color-picker/App.vue:245`) and provided
app-wide (`App.vue:257`). So `ColorInput.vue:199` and `demo/picker/ColorPicker.vue:212` share **one
timer**. And `ColorPicker.vue:383` cancels it on its own unmount:

```ts
onUnmounted(() => {
    window.removeEventListener("keydown", handleKeydown);
    if (parseAndSetColorDebounced.cancel) parseAndSetColorDebounced.cancel();
```

**Evidence (P5, pasted):**

```
C. inputColor before = red | after = red
```

(The harness armed the shared debounce with `"rebeccapurple"`, called `.cancel()` as ColorPicker's
unmount does, advanced 5000 ms — the typed colour was **lost**.)

**User-visible sequence:** type a colour into the dock field, then switch view/route within 2 s
(entirely natural — the dock is the *global* chrome and the picker pane unmounts on route change).
The typed colour silently never applies. No error; the field snaps back to the old value (C-9).
Symmetrically, ColorInput **never** cancels on its own unmount — a pending parse fires after this
component is gone, mutating global colour state from a dead component.
**Cure:** the debounce belongs to the *input widget*, not to the shared pipeline. The pipeline should
expose only the synchronous `parseAndSetColor`; each field owns its own debounce and cancels it in
its own `onBeforeUnmount`. One timer shared by two independent text fields is the architectural
error; `.cancel()` from a third party is only its symptom.

---

### C-9 · MAJOR · 2000 ms debounce on a live-preview colour field, plus a blur snap-back that fights it

**Evidence (P5, pasted — exact latency):**

```
D. at 1999ms inputColor = red
D. at 2001ms inputColor = rebeccapurple
```

Corroborated live (P4): at t≈0 after input, `badge: false`; at t≈2600 ms, `badge: true`.

2000 ms is the debounce constant for a field whose whole purpose is live colour preview, and it is
*also* the lifetime of the error flash (`useColorParsing.ts:57`), so error visibility and input
latency are the same number by coincidence rather than design.

**The blur interaction (MECHANISM-DERIVED — reproduction: NONE in-browser; the dock's own
route-drift, C-18, prevented completing the visual timeline):** `onInputBlur` (lines 183–193)
unconditionally repaints `innerText = formattedCurrentColor.value` — the **old** model value — while
the 2000 ms debounce is still armed with the typed text. The pending parse then fires, the model
changes, and the `watch(formattedCurrentColor)` (lines 270–274) repaints again because the field is
no longer focused. Net: the field shows the *old* value for up to ~1.8 s after the user leaves it,
then the whole app's colour jumps. The mechanism is closed over three cited code paths and one
measured constant; only the pixel timeline is unverified.
**Cure:** commit-on-blur. `onInputBlur` should flush the pending parse (not cancel it, not repaint
over it), and the debounce should be ~150–250 ms for a preview field.

---

### C-10 · MAJOR (a11y) · the focus indicator is user-chosen colour with the UA ring deleted — it can be invisible

`ColorInput.vue:16` puts `focus-visible:outline-none` on the textbox, removing the UA focus ring.
The only replacement is lines 162–166:

```ts
const inputStyle = computed(() => {
    if (!proposeMode && parseError.value) return { borderColor: "var(--destructive)" };
    if (inputIsFocused.value) return { borderColor: cssColor.value };
    return undefined;
});
```

The focus indicator **is the colour the user is currently editing**. Measured live at focus:
`"border": "oklab(0.738718 -0.0664458 -0.00957768)"` — the live colour, not a token.

The unfocused border is `var(--input)` (line 295). Any colour the user picks that is close to
`var(--input)` — or close to the pane plate behind it — yields a focus state visually identical to
the unfocused state. This is not a hypothetical edge: the picker exists to let the user reach every
colour, including that one. WCAG 2.4.7 (Focus Visible) and 2.4.11 (Focus Appearance) both fail on the
reachable subset.
**Cure:** keep a token-driven focus ring (glass-ui's house focus register) as the indicator and use
the live colour for a *secondary* decorative leg only. A focus indicator whose contrast is a function
of user content is not an indicator.

---

### C-11 · MINOR · the error badge paints over the send button — the submit control is obscured exactly when it is needed

`.send-btn { position: absolute; right: 0.25rem; … }` (line 335, measured 24 px wide, so it occupies
right 4 px → 28 px) and `.error-badge { position: absolute; right: 0.5rem; … }` (line 348) with
`white-space: nowrap` and text "not a valid color". The badge is later in DOM order (line 87 vs 67/76)
and both are `position: absolute` with no `z-index`, so the badge paints on top.

The badge is `pointer-events: none` (line 360) so the button still *works* — but it is invisible
under the badge for the full 2000 ms of the error flash. The user is told their input is wrong and
simultaneously has the only "try again" affordance hidden.
**Reproduction:** implied by the live measurement (`badge: true` while the 24×24 button is at
`right: .25rem`); not separately screenshotted.
**Cure:** the error message does not belong stacked on the action seat. Put it below the field (or in
the popover, where `ParseEchoReadout` already lives) as a described-by region — which C-5 needs anyway.

---

### C-12 · MAJOR (test truth) · zero behavioural coverage, and the one spec that touches it cites a test file that does not exist

**No unit test mentions this component:**

```
$ grep -rln "ColorInput\|color-input" test e2e
e2e/smoke/oracles/o10d-display-voice-census.spec.ts
```

That single hit asserts **only typography of the hover popover's title**
(`o10d-display-voice-census.spec.ts:367-381`): `fontFamily` matches `DISPLAY_FACE` and
`fontWeight <= 500`. Nothing about parsing, error state, submission, the crown, or the buttons.

**The false attestation.** `e2e/smoke/flows/color-propose.spec.ts:21-25` states:

> The cycle-state assertion here proves the propose pathway is wired; the contenteditable submission
> has unit coverage in `test/parsing/extract.test.ts` via the underlying `submitProposedName` handler.

```
$ ls -R test/parsing
timeline
test/parsing/timeline:
parsing-easing.test.ts
$ grep -rn "submitProposedName\|proposeColorName" test/
(no output)
$ find . -name "extract*.test.ts" -not -path "*/node_modules/*"
(no output)
```

`test/parsing/extract.test.ts` **does not exist anywhere in the repo**, and `submitProposedName` is
referenced by no test. A coverage claim that cannot be satisfied is worse than an admitted gap: it
retires the follow-up.

**The exact mutations that keep the whole suite green** (this is the vacuous-gate statement):
- make `onInputKeydown` a no-op → Enter stops applying colours. Green.
- delete both `<button class="send-btn">` elements entirely. Green.
- delete the `parseError` badge and the `color-input-error` class. Green.
- delete the `watch(formattedCurrentColor)` sync (lines 270–274) → the field goes permanently stale
  against the model. Green.
- delete `submitProposedName`'s body → proposing a name silently does nothing. Green.
- (already true in `master`) reference an undefined `.btn-interactive`; reference an unrenamed
  `crown-appear`. Green.

The only mutations the suite catches are: renaming `aria-label="Enter a CSS color"` (o10d's locator),
changing the popover title's font, and changing the toggle-cycle labels in the *parent*.
**Cure:** a component test that drives the contenteditable — Enter and send-arrow submit, the invalid
path, the propose path with a stubbed transport failure — plus an axe/name assertion on the buttons.
The false coverage note must be deleted, not amended.

---

### C-13 · MINOR · dead surface: an unread prop, two unread injections, and an exposed method with no caller

```
$ for t in editTarget cssColorOpaque canProposeName copyAndSetInputColor; do … done
=== editTarget ===            139:    editTarget: EditTarget | null;         ← declared, never read
=== cssColorOpaque ===        146:    cssColorOpaque,                        ← injected, never read
=== canProposeName ===        150:    canProposeName,                        ← injected, never read
=== copyAndSetInputColor ===  219:const copyAndSetInputColor = () => {   285:    copyAndSetInputColor,
```

- **`editTarget`** is a declared, typed prop that is never destructured and never referenced. It
  forces `import type { EditTarget }` (line 134) and is threaded from
  `ActionBarLayer.vue:118` ← `Dock.vue:156` ← the scene, purely to be discarded. `EDIT_TARGET_KEY`
  already exists (`color-session/keys.ts:15`) for anyone who genuinely needs it.
- **`cssColorOpaque` / `canProposeName`** are pulled off the injected pipeline and unused —
  `canProposeName` is exactly what should gate propose mode, and it is imported and ignored while the
  *parent* consults it instead (`ActionBarLayer.vue:37`).
- **`copyAndSetInputColor`** (lines 219–223) is defined and exposed (line 285) with **no caller
  anywhere**: `ActionBarLayer.vue:28` assigns `colorInputRef` and never reads it, and
  `defineExpose({ currentToggleIcon, toolbarMode, cycleToolbarMode })` (line 96) does not forward it.
  The whole `defineExpose` block (lines 282–288: `focus`, `inputIsFocused`, `copyAndSetInputColor`,
  `onSubmitColor`, `submitProposedName`) has **zero** consumers.
- **Dual import path to the same package (edict 2).** Line 117 imports `writeClipboard` from
  `@mkbabb/glass-ui` directly; lines 118–129 import `Popover`/`Tooltip`/`Separator` from
  `../../ui/popover|tooltip|separator`, which are pure one-line re-exports of the *same* package
  (`demo/ui/popover/index.ts`: `export { Popover, PopoverTrigger, PopoverContent } from
  "@mkbabb/glass-ui";`). Two specifiers for one producer in one file. The `writeClipboard` import
  exists **solely to serve dead code**.

**Cure:** delete the prop, the two unread injections, `copyAndSetInputColor`, the
`writeClipboard` import, and the entire `defineExpose` block. A component whose imperative API has no
callers should not have one.

---

### C-14 · MINOR · a failed name proposal is silent, and laundered through `catch (e: any)`

`ColorInput.vue:230-247`:

```ts
} catch (e: any) {
    console.warn("[ColorInput] Failed to propose name:", e?.message);
} finally {
    proposing.value = false;
}
```

On network failure, auth failure, or a duplicate name, the spinner stops, the typed name stays in the
field, and **the user is told nothing** — the only signal is a `console.warn` they will never see.
There is no live region (C-5) and no error affordance in propose mode at all (`parseError` is
explicitly suppressed there: lines 19, 87, 163 all gate on `!proposeMode`). `await
session.ensureSession()` (line 234) is inside the same undiscriminated catch, so an expired session
is indistinguishable from a rejected name.
`e: any` also defeats `strict` — the repo's record shows `as any` driven to 0 in `api/`; this is the
same laundering in the demo tree.
**Cure:** type the catch as `unknown`, discriminate the transport error (`ApiUnavailableError` is
already exported at `demo/platform/transport/availability`, and `useCustomColorNames.ts:50` already
discriminates on it), and render the outcome in the same described-by region C-5 introduces.

---

### C-15 · MINOR · uncleaned timer and rAF in the propose-mode watcher

`ColorInput.vue:252-267`:

```ts
watch(() => proposeMode, (propose) => {
    modeTransition.value = true;
    setTimeout(() => { modeTransition.value = false; }, 300);          // never cleared
    …
    requestAnimationFrame(() => inputColorRef.value?.focus());          // never cancelled
```

- The `setTimeout` handle is discarded. Toggling propose mode twice within 300 ms lets the first
  timer clear the flag while the second flash is mid-animation, truncating it.
- Neither the timeout nor the rAF is torn down on unmount, so both fire against a dead component
  (harmless today because both bodies are `?.`-guarded or write a discarded ref — but this component
  *is* unmounted on dock layer change and route change).
- This is not the PRM-RAF epidemic (no unbounded loop; a single-shot rAF), and it is correctly used
  to defer focus past the DOM write — the defect is only the missing teardown.

**Cure:** a small `useTimeoutFn`-style guard or an `onBeforeUnmount` that clears both handles; the
flash itself is better expressed as a CSS transition keyed off a class than as a JS-timed ref.

---

### C-16 · MINOR · six imperative `innerText` writes across three sources of truth, and select-all-on-focus destroys caret placement

The field's text has **three** authorities — the DOM's `innerText`, `model.inputColor`, and the
computed `formattedCurrentColor` — reconciled by six hand-written imperative assignments:

| line | site |
|---|---|
| 191 | `onInputBlur` — unconditional snap-back |
| 240 | `submitProposedName` success |
| 260 | propose-mode watch (clear) |
| 265 | propose-mode watch (restore) |
| 272 | `watch(formattedCurrentColor)` — guarded by `!inputIsFocused` |
| 278 | `onMounted` |

Each is guarded differently (`!proposeMode`, `!inputIsFocused`, `if (inputColorRef.value)`), and the
guards are what C-9's blur race lives in. Owner edict 7's `shallowRef`-as-synchronous-cache lesson is
the same lesson one layer down: a single reactive source with one render path, not N imperative
writers.

A second-order consequence, measured live: `onInputFocus` calls `selectAll()` (lines 168–182) on
**every** focus.

```json
"selectionAfterFocus": "oklch(70% 0.15 200deg)"
```

The entire value is selected on focus, so **clicking into the middle of `oklch(70% 0.15 200deg)` to
edit one channel is not possible** — the click focuses, the handler selects all, and the next
keystroke replaces the whole value. For a field whose values are 20+ characters of structured
syntax, that is the common editing gesture. The `selection?.toString() === target.innerText` early-out
(line 174) does not help: it only skips when everything is *already* selected.
**Cure:** select-all on keyboard focus (Tab) only, not on pointer focus — or drop it and rely on the
snap-back. And collapse the six writers into one `v-text`-style render path fed by a single
`shallowRef` the input owns.

---

### C-17 · INFO (HYPOTHESIS — no mobile probe run) · on coarse pointers the hover Popover becomes a click Popover that will steal focus from the field

`ColorInput.vue:3-8` configures `<Popover trigger="hover" :open-delay="300">` around the *whole*
input row. Decompiled from the installed producer
(`node_modules/@mkbabb/glass-ui/dist/popover-BQGYXZyO.js`, version `7.0.0`):

```js
let _ = typeof window < "u" && typeof window.matchMedia == "function"
        && window.matchMedia("(pointer: coarse)").matches,
    v = i(() => n.trigger === "hover" && !_);
…
return v.value ? (… HoverCardRoot with open-delay/close-delay …)
              : (… PopoverRoot, trigger prop IGNORED — click-triggered …);
```

On a fine pointer this is a HoverCard (which reka-ui also opens on focus, so keyboard users do reach
the "Enter a color" help and the `ParseEchoReadout` gamut verdict). On a **coarse** pointer `v` is
false and it degrades to a **click-triggered `PopoverRoot`** — so tapping the colour field on mobile
opens a popover, and reka-ui's `PopoverContent` auto-focuses its content on open. The predicted
consequence is that the popover steals focus from the contenteditable the user just tapped, i.e. the
field is not typeable on touch.

Labelled a **hypothesis**: I did not emulate a coarse pointer (the dock's route drift, C-18, consumed
the browser budget). The mechanism and the producer source are cited; the outcome is not measured.
Rider (producer-side, relay material): `_` is captured **once** as a `let` at setup, not a reactive
`matchMedia` listener, so the branch never re-evaluates when pointer capability changes.
**Cure regardless of the hypothesis:** a text input should not be a popover trigger. Anchor the help
popover to a dedicated affordance, or to the field's *label*, never to its editable surface.

---

### C-18 · INFO (not this component; recorded because it blocked live testing)

While probing, the picker route walked the view-select list on its own, with no input between calls
and `document.activeElement === button[aria-label="Select view"]`:

```
#/  →  #/mix  →  #/extract  →  #/generate  →  #/gradient  →  #/blob  →  #/admin/users  →  #/palettes
```

Measured: navigate to `#/`, `await sleep(3500)`, then read → `{ before: { hash: "#/palettes",
active: "BUTTON/Select view" } }`. With the pointer parked over `main` instead of the dock, the hash
was stable across 6 × 700 ms samples (`marks: ["#/","#/","#/","#/","#/","#/"]`), which localises it
to the dock's hover-opened view Select swallowing/committing subsequent activations.

Separately, a **programmatic** `document.querySelector('button[aria-label="Toggle action bar"]').click()`
twice produced `#/?space=oklch&color=oklch(none%200.2%2030)` — the *random colour* action, with the
identical value both times (`oklch(none 0.2 30)`, a powerless-lightness colour), suggesting
`demo/color-session/prng.ts` seeds `generateRandomColor` deterministically per load.

Both belong to `demo/shell/dock/Dock.vue` / `DockViewSelect.vue`, not to `ColorInput.vue`. Handing
them to whichever seat owns the dock.

---

## 3. Boundary and error-path sweep (P5)

```
E. "oklch(NaN 0 0)"        -> no throw | parseError = true
E. "rgb(Infinity 0 0)"     -> no throw | parseError = true
E. "oklch(-0 -0 -0)"       -> no throw | parseError = false   (parsed; negative zero handled)
E. "rgb(1e400 0 0)"        -> no throw | parseError = true
E. "hsl(1e999deg 50% 50%)" -> no throw | parseError = true
E. "#fffffffffffffff…"(4k) -> no throw | parseError = true
E. "oklch(0 0 0 / )"       -> no throw | parseError = false
```

No boundary input escapes as an exception **through this component** — but only because the
undiscriminated `catch` of C-1 absorbs everything, including the nine library TypeErrors. That is the
negative result to read carefully: the boundary sweep is clean *for the same reason the BLOCKER is
invisible*. Empty input is short-circuited at `useColorParsing.ts:62` (`if (!input …) return`), so a
cleared field is a silent no-op rather than a reset — consistent with C-7's silence class.

`role="textbox"` with `contenteditable` accepts pasted newlines (Enter is `preventDefault`ed at line
203, paste is not), and `innerText` then carries `\n` into the parser, which fails — another route
into C-7's latch. `aria-multiline` is unset, which is correct-by-default for `role=textbox`.

---

## 4. Owner-edict compliance

| Edict | Verdict | Evidence |
|---|---|---|
| 1 · No god modules | **PASS** | 377 lines, one concern; the parse engine lives in `useColorParsing` |
| 2 · No legacy / no masking fallbacks | **FAIL** | C-1 (bare `catch` masking a TypeError); C-13 (dual glass-ui import path; dead exposed API) |
| 3 · KISS, no contrivance | **FAIL (soft)** | C-16 (six imperative writers over three sources of truth) |
| 4 · Glass-ui is the design system | **FAIL** | C-2 (`.btn-interactive` does not exist in `@mkbabb/glass-ui@7.0.0`) |
| 5 · Root-level styling | **FAIL (soft)** | C-3 (per-instance inline `style="animation: …"` on the Crown — and it is dead *because* it is per-instance) |
| 6 · Animations never deleted | **FAIL** | C-2 (working hover/press recipe retired onto a phantom); C-3 (`crown-appear` never plays) |
| 7 · Idiomatic Vue 3.5 | **PARTIAL** | `useTemplateRef` ✓, reactive props destructure ✓; but C-16 hand-rolls the binding the edict's `shallowRef` lesson exists to prevent |
| 8 · `verbatimModuleSyntax` | **PASS** | `import type { EditTarget }` (line 134) is the only type-only import and is correctly marked |

---

## 5. Strongest defect

**The component's only error channel is provably silent in two reproducible states, and when it does
speak it mislabels a live library crash as a user typo.**

- C-6: the **first** invalid input after a cold load raises nothing (`parseError = false`, measured).
- C-7: **any retyped** invalid input raises nothing, forever (`previousInvalid` latch, measured).
- C-1: when it does fire, it fires 2000 ms late (measured 1999/2001 ms) with the fixed string "not a
  valid color" — the same string a `TypeError` from `src/css/grammar.ts:181` produces, which is how
  MT-F001 has been able to sit in the shipping path with zero console output and zero page errors.

The strongest *static* proofs are C-2 and C-3: two visual contracts the source documents at length
and that provably do not execute — a phantom producer class (`.btn-interactive`, absent from the repo
and from every dependency) and a scoped-keyframes animation referenced by an unrenamed name.

---

## 6. Negative results (things checked and found sound)

Recorded so the next seat does not re-spend the budget:

- **No `defineModel` anywhere in this component** — the stale-round-trip hazard does not apply. The
  analogous defect here is C-16's imperative `innerText` reconciliation, not `defineModel`.
- **No `ValueUnit` wrapping** — the component never constructs colour values; it hands strings to
  `parseAndSetColor`. No accumulation site.
- **No `stableHue` handling in this component** — the oklch→HSV low-chroma hue-drift guard is
  correctly located in `useColorParsing.ts:39-46` and `:76-83`, both with `try/catch` retaining the
  last deliberate hue and a `s*v > 0.01` powerless-colour gate. Sound.
- **No reka-ui slider** — no pointer-capture leak surface.
- **No rAF loop** — one single-shot `requestAnimationFrame` (line 262), correctly used to defer focus
  past a DOM write. Not a PRM-RAF site. (Teardown is missing: C-15.)
- **No WebGL** — the `"WebGL: context lost."` console error on `/#/` in `REPORT.json` is the
  `HeroBlob`/`GooBlob` surface, not this component.
- **`verbatimModuleSyntax`** — clean.
- **`demo/ui/{popover,tooltip,separator}`** are one-line re-export barrels of `@mkbabb/glass-ui`, not
  local reimplementations, so edict 4 is structurally honoured at the import site (the finding in
  C-13 is the *dual* path within one file, not a local component).
- **Boundary inputs** raise no unhandled exception through this path (§3) — with the caveat that this
  is a consequence of C-1's over-broad catch, not of validation.
- **`overflowX: 0`** on `/#/` in every one of the four capture matrices (`REPORT.json`); the
  `mask-image` fade + `text-ellipsis whitespace-nowrap` on the field (lines 16, 300–306) contain the
  long-value overflow correctly, and the mask is cleared on `:focus` (lines 303–306) so a focused
  user can see the tail. That part of the implementation is careful and right.

---

*Seat: CHALLENGE-C · implementation. Written under
`docs/tranches/V/megatranche/audit/components/shell-dock-colorinput/`. No files outside this
directory were created or modified.*
