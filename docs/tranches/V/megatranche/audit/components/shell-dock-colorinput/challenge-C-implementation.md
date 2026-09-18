# CHALLENGE-C — `demo/shell/dock/ColorInput.vue` — implementation is defective

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context variant —
matching the explicit Opus 5 declaration this seat was spawned with. Seat declared, not inherited.

- Repository: `/Users/mkbabb/Programming/value.js`, branch `tranche-u`.
- HEAD declared at spawn: `c654824e`. HEAD at audit time: `7cae8bd0` — docs-only commits landed under
  me; `wc -l demo/shell/dock/ColorInput.vue` = **377**, unchanged, and no `demo/` byte moved.
- Subject: `demo/shell/dock/ColorInput.vue`. Sole consumer: `demo/shell/dock/layers/ActionBarLayer.vue:115`.
- No source edits. Nothing written outside
  `docs/tranches/V/megatranche/audit/components/shell-dock-colorinput/`.

## Status of this file — ROUND 3

Two prior CHALLENGE-C reports occupied this path. Both are preserved **byte-for-byte** beside it:

| file | round | findings | ceiling |
|---|---|---|---|
| `challenge-C-implementation.round1.md` | 1 (2026-07-24) | 18 | MAJOR |
| `challenge-C-implementation.round2.md` | 2 (2026-07-27, preserved by me) | 25 | 2 × BLOCKER |
| **this file** | **3** | **9 new + 25 carried** | **3 × BLOCKER** |

Round 3 does three things rounds 1 and 2 did not:

1. **Opens a defect class neither round touched** — the *custom-colour-name* leg. Round 1 and round 2
   both audited the field as a CSS-string box. It is not: `formattedCurrentColor` can return a
   user-proposed *name*, and the component writes that name into the field at five sites and reads it
   back at three. The round-trip is broken. That is R3-1, and it is the strongest defect in any round.
2. **Attacks the carried findings instead of restating them.** I tried to break R2-1 (the send-button
   BLOCKER) on the theory that it is a Chromium-only focus artefact. **The refutation failed across
   three engines** — see §IV. A failed refutation is worth more than a repetition, and R2-1 is now a
   cross-engine measured result rather than a single-engine one.
3. **Supplies a differential attribution for C-4** (the nameless button) that neither round had: the
   visual census counts `namelessButtons: 1` on exactly the two matrices where this component renders
   and `0` on the two where it does not.

## Verdict

**DEFECTIVE.** **3 BLOCKER · 16 MAJOR · 10 MINOR · 5 INFO.**

**Strongest defect — R3-1, new:**

> **The field's own canonical text is not accepted by its own parser.** The moment a colour has an
> approved custom name, `formattedCurrentColor` becomes that name; the component paints it into the
> contenteditable; and Enter / the send button / a blur-then-Enter feed it straight back into
> `parseAndSetColor`, which rejects it. The user is shown **“not a valid color”** for content they
> never typed — content the application authored. The crown icon is the *signal* that the field is now
> unsubmittable. Reproduced end-to-end against the real composables.

**MT-F001, answered by a third independent instrument: it SWALLOWS.** No crash reaches the user and
none reaches telemetry. The user sees a red pill byte-identical to a plain typo. §II.

---

# Part I — ROUND-3 FINDINGS

### R3-1 · BLOCKER · The custom-name round-trip is broken: the app's own canonical text fails the app's own parser

**Mechanism.** `formattedCurrentColor` is not a CSS string. It is a *name-or-CSS* union:

```ts
// demo/color-session/useColorNameResolution.ts:31-46
const formattedCurrentColor = computed(() => {
    const colorString = currentXYZString.value;
    if (colorString) {
        const customName = findCustomName(colorString);
        if (customName) return customName;          // <- an arbitrary user-proposed name
    }
    if (selectedDisplaySpace.value === "hex") return colorToHexString(model.value.color);
    return serializePickerColor(currentPhysicalColor.value);
});
```

`findCustomName` (`useCustomColorNames.ts:61-66`) resolves against a demo-side `Map` populated from
`GET /colors/approved`. **Those names are never registered with the parser.**
`grep -rn "registerColorNames" src/ demo/ api/src` returns exactly one hit — a *comment* at
`useCustomColorNames.ts:46` — and `parseCssColor`'s only name table is the frozen 148-entry
`NAMED_COLORS` (`src/css/grammar.ts:31,265`; `src/css/named-colors.ts:1`).

ColorInput writes that union into the DOM at **five** sites and reads it back at **three**:

| writes `formattedCurrentColor` into the field | reads the field into `parseAndSetColor` |
|---|---|
| `:191` `onInputBlur` | `:208` `onInputKeydown` (Enter) |
| `:240` `submitProposedName` success | `:215` `onSubmitColor` (send button) |
| `:265` propose-mode exit | `:199` `onInputInput` (debounced, on any edit) |
| `:272` the `formattedCurrentColor` watch | |
| `:278` `onMounted` | |

**Reproduction** — the real `useCustomColorNames` + `useColorNameResolution` + `useColorParsing`,
driven under vitest with only `globalThis.fetch` stubbed. Both stub names are legal under the
server's own zod schema (`api/src/modules/color/schema.ts:8-19`, `/^[a-z][a-z0-9-]*$/`, 1..50), so
nothing here leans on a validation hole that does not exist:

```
$ VITE_API_URL=http://127.0.0.1:9/api npx vitest run --config .../probe.vitest.config.ts

--- B: round-trip ---
model colour         : rgb(20 60 200)
formattedCurrentColor: "babb-blue"   <- what ColorInput paints into the field
crown meta           : {"id":"1","name":"babb-blue","css":"rgb(20 60 200)","status":"approved",…}
parseCssColor(displayed).ok : false
after re-submitting the displayed text -> parseError = true
model colour now     : rgb(20 60 200)
```

**What the user experiences.** They land on a colour that someone named. The crown appears. They press
Enter — or the send button, or they click away and come back and press Enter — on text they did not
author and have not edited. They get a red **“not a valid color”** badge accusing them of a typo.
There is no state in which this is not true: *every* approved name that is not one of the 148 CSS
keywords fails, and naming colours is the entire point of the feature.

It compounds every other finding in the file. `previousInvalid` (`useColorParsing.ts:49,84`) latches
on the name, so the second press is silent (C-7). The badge lands on top of the text (R3-4). And R2-1
guarantees the send button re-reads whatever `onInputBlur` just wrote — which, here, is the
unparseable name.

**Cure (gestalt).** Split the union. `formattedCurrentColor` is doing two jobs — *the label a human
reads* and *the value a machine round-trips* — and the component needs both, separately. Give the
pipeline a `canonicalCssColor` (always `serializePickerColor`) alongside `displayLabel`, render the
label, and submit/seed the canonical. The name then becomes what it always should have been:
presentation, like the crown tooltip beside it. A second, cheaper repair that does *not* fix the class:
teach `parseAndSetColor` to consult `findCustomName` in reverse before failing — but that leaves two
name authorities and re-opens R3-2.

---

### R3-2 · MAJOR · An approved name that collides with a CSS keyword silently rewrites the user's colour

`ColorInput.vue:236` performs **no validation** before proposing:

```ts
await proposeColorName(proposedName.value.trim().toLowerCase(), cssStr);
```

The only client-side guard in the component is `:disabled="!proposedName.trim() || proposing"`
(`:70`) — non-emptiness. The server's schema (`api/src/modules/color/schema.ts:8-19`) checks *shape*
(`/^[a-z][a-z0-9-]*$/`, ≤50) and the repository checks *uniqueness against other proposals*
(`service/proposals.ts:38-41`). **Nothing anywhere checks the 148 CSS keywords.** `red`, `tomato`,
`seagreen`, `rebeccapurple` are all legal proposals.

**Reproduction** (same harness; approved name `red` → `rgb(0 128 0)`):

```
--- C: collision ---
model colour         : rgb(0 128 0)
formattedCurrentColor: "red"
after re-submit      : rgb(255 0 0)   <- was rgb(0 128 0)
parseError           : false
```

The colour changed and **nothing was reported**. This is the same round-trip as R3-1 with the failure
mode inverted: R3-1 errors loudly on valid content, R3-2 corrupts silently.

It needs no bad actor. A moderator approving `tomato` for a nice tomato-ish red that is not exactly
`#FF6347` is doing their job correctly; the corruption follows automatically.

**Cure.** One line of shared domain truth: reject any proposal whose lowercased name is a key of
`NAMED_COLORS`. It belongs in the zod schema (authoritative) **and** mirrored in the component so the
user learns before the round-trip, not after. **Route the server half to the API seat.**

---

### R3-3 · MAJOR · A 100 ms debounce leaves the displayed name, the crown, and `canProposeName` reporting the *previous* colour

```ts
// useColorNameResolution.ts:25-30
const recomputeXYZ = debounce(() => {
    currentXYZString.value = serializePickerColor(convertPickerColor(model.value.color, "xyz"));
}, 100);
watch(() => model.value.color, () => recomputeXYZ(), { immediate: true });
```

`currentXYZString` is the sole input to **three** exported computeds — `formattedCurrentColor`,
`currentColorMeta`, `canProposeName` — and it trails the model by 100 ms. The model itself is
synchronous (`useColorPipeline.ts:71` — “the ONE ref — synchronous; derivations recompute now”). So
every colour commit opens a 100 ms window in which the name layer describes the colour before last.

**Reproduction:**

```
--- D: stale window ---
t0    displayed: "babb-blue"    crown: babb-blue  canPropose: false
t+0   model: rgb(255 0 0)  displayed: "babb-blue"  crown: babb-blue  canPropose: false   <- STALE
t+150 model: rgb(255 0 0)  displayed: "rgb(255 0 0)"  crown: null     canPropose: true
```

Three live consequences, all in this component's blast radius:

1. **`onInputBlur` (`:191`) writes `formattedCurrentColor.value` unconditionally.** A blur landing
   inside the window paints the *previous* colour's name into the field — which is then unparseable
   (R3-1) or wrong (R3-2). The `formattedCurrentColor` watch (`:270`) repairs it 100 ms later **only
   if the field is unfocused**; while focused it is skipped by design (`:271`), so a focused user is
   left holding stale text indefinitely.
2. **The crown and its tooltip** (`:30-59` — name, contributor, css) describe the wrong colour for
   100 ms after every change, and `:key="crownKey"` re-mounts it on the correction.
3. **`canProposeName` gates the toggle's behaviour and its accessible name** —
   `ActionBarLayer.vue:38,45,131`. A user who changes colour and immediately presses the toggle is
   routed by a stale predicate: into propose-mode for a colour that already has a name, or out of it
   for one that needs one. The button's own `aria-label` is stale in the same window.

**Cure.** The debounce buys one `convertPickerColor(..., "xyz")` per 100 ms and costs the name layer
its coherence with the model. Make the xyz key a plain `computed` on `model.value.color` — it is one
matrix conversion, on the same tick the pipeline already recomputes `cssColor`, `cssColorOpaque`,
`HSVCurrentColor` and the whole slider-gradient set synchronously. If the conversion ever measures
hot, memoise on the colour identity; do not desynchronise it.

---

### R3-4 · MAJOR · The error badge lands on the text it is complaining about

Measured live (controlled capture, `frames/probe-1.json`, `B-f001-light.afterEnter`, after typing
`oklch()` and pressing Enter):

```json
{ "badgeRect": { "x": 682.1, "y": 31.4, "w": 101, "h": 18.4 },
  "sendRect":  { "x": 763.1, "y": 28.5, "w": 24,  "h": 24 },
  "overlapPx2": 367.5, "sendAreaPx2": 576,
  "badgeStyles": { "role": null, "ariaLive": null, "id": "", "zIndex": "auto", "pointerEvents": "none" },
  "inputAria": { "invalid": null, "describedby": null } }
```

367.5 / 576 = **63.8 % of the send button occluded** — that is round-1 C-11, now with a number. The
new part is the *text*. The field is `text-align: center` with `padding: 12px / 36px`
(`probe-1.json` `A-rest-light.styles`), so its glyphs are centred at `contentBoxCentreX: 714` — which
is **inside the badge's span of 682.1 → 783.1**. The badge is centred on the text by construction.

`frames/B-f001-error.png` (read directly) shows the result: of `oklch()` only the leading `o` survives;
the rest is behind a red pill. **The user is told their input is invalid and simultaneously prevented
from seeing what they typed.**

Neither element carries `z-index` and the badge is later in DOM order (`:87` vs `:67`/`:76`), so paint
order is forced — this is not a stacking accident that some other theme escapes.

Rider, same measurement: `role: null`, `aria-live: null`, `id: ""`, `aria-invalid: null`,
`aria-describedby: null`. The rejection is announced to nobody (C-5, WCAG 3.3.1 Level A) *and* hidden
from everybody.

**Cure.** The error is a property of the field, not a floating chip: put it below the row as a
`role="status"` line wired to `aria-describedby`, and set `aria-invalid` on the textbox. The dock row
already grows and shrinks (R3-6) — one more line is within its existing motion budget.

---

### R3-5 · MAJOR · A machine-syntax field with every UA text-assist left at its human-prose default

Measured (`probe-1.json` `A-rest-light.attrs`):

```json
{ "spellcheck": null, "autocapitalize": null, "autocorrect": null,
  "inputmode": null, "enterkeyhint": null, "ariaMultiline": null,
  "contenteditable": "", "role": "textbox", "ariaLabel": "Enter a CSS color", "tabIndex": -1 }
```

Every one is unset, and the UA defaults for `contenteditable` are the *prose* defaults, not the
*code* defaults:

- `spellcheck` inherits `true` → the browser red-squiggles `oklch`, `hwb`, `rebeccapurple`,
  `display-p3` — permanent noise under a field whose only real error signal is also red (R3-4).
- `autocapitalize` defaults to `sentences` on touch keyboards → the first glyph is capitalised.
  Survivable only because `parseAndSetColor` lowercases (`useColorParsing.ts:60`) — an accident, not a
  design.
- `autocorrect`/smart-substitution is on → `color(display-p3 …)`'s hyphen is a smart-dash candidate and
  a double space becomes `. `. **Neither is recoverable by lowercasing**, and both land in a parser
  whose failure message is "not a valid color".
- `inputmode`/`enterkeyhint` unset → a touch user gets the prose keyboard and a “return” key on a
  field whose Enter is a commit (`:203-211`).
- `aria-multiline` unset on `role="textbox"` → AT must guess; the field is single-line by CSS
  (`white-space: nowrap`) and by handler (`Enter` is `preventDefault`ed).

Note the mitigating measurement, recorded honestly: `probe-2.json` `G-mobile` reports the component
`{"present": false, "missing": true}` on the mobile matrix, and `REPORT.json` shows the mobile `/#/`
tree at 228 elements against desktop's 1738. **There is currently no CSS-colour text entry on mobile
at all**, so the touch-keyboard legs above are latent rather than shipping. They are still defects of
this implementation — the attributes are free, and the desktop spellcheck leg is live today.

**Cure.** `contenteditable="plaintext-only" spellcheck="false" autocapitalize="off" autocorrect="off"
inputmode="text" enterkeyhint="go" aria-multiline="false"`. `plaintext-only` also closes R2-3 (the
rich-paste blow-out) in the same attribute.

---

### R3-6 · MAJOR · The whole dock relayouts on every keystroke

Measured (`frames/probe-3.json`, `typingReflow`, 13 characters typed one at a time):

```json
{ "inputWidths": [61.5, 72.9, 84.3, 95.8, 107.2, 118.7, 130.1, 141.6, 153, 164.5, 175.9, 187.4, 198.8],
  "dockWidths":  [179.5, 190.9, 202.3, 213.8, 225.2, 236.7, 248.1, 259.6, 271, 282.5, 293.9, 305.4, 316.8],
  "inputWidthSpan": 137.3, "dockWidthSpan": 137.3 }
```

The dock's width tracks the field's **1:1** — `137.3 px` of growth over 13 keystrokes, `11.4 px` per
character, in lockstep. The field declares no intrinsic width bound: `class="color-input w-full block …"`
(`:16`) on a `contenteditable` inside `ColorInput`'s `div.grid.grid-cols-1` (`:2`), inside
`ActionBarLayer`'s `div.dock-layer-grid.flex-1` (`:98`). `w-full` against a shrink-to-fit chain
resolves to the content's max-content width, and the `min-w-0` on the `<ColorInput>` tag
(`ActionBarLayer.vue:118`) caps the *minimum*, never the maximum.

Every character therefore relayouts and repaints the dock — a `backdrop-filter` glass surface with a
crossfade layer group above it. It is also a usability defect independent of cost: the send button the
user is aiming at slides 11.4 px right per character, and the dock's neighbours are pushed with it.

**Attribution, stated precisely:** the measurement is the D-seat's, taken today under controlled
conditions; the mechanism is read from source and is this component's — the field is the only element
in the chain that declares a content-driven width.

**Cure.** Give the field a fixed inline size in `ch` (its font is already `Fira Code`, monospace —
`probe-1.json` `A-rest-light.styles.fontFamily`) and let it scroll internally. The `text-ellipsis` +
`mask-image` machinery at `:16,300-306` already exists to handle overflow; it is currently never
exercised at rest because the box grows instead.

---

### R3-7 · MINOR · The resting mask erases the field's right border and fades the send arrow into the page ground

```css
/* ColorInput.vue:299-302 */
--input-action-width: 2.5rem;
mask-image: linear-gradient(to right, black calc(100% - var(--input-action-width)), transparent 100%);
```

Measured resolved value: `linear-gradient(to right, rgb(0,0,0) calc(100% - 40px), rgba(0,0,0,0) 100%)`
over a box with `borderWidth: 1px`, `borderColor: rgb(198,180,159)` (`probe-1.json` `A-rest-light.styles`).

A mask applies to the element's whole rendering — background, **border**, box-shadow. Reading
`frames/A-rest-light.png` directly: the white field dissolves into the pink page across its right
40 px, the **right border and both right corner radii are gone**, and the box reads as unclosed. The
send arrow — stroked with the live accent (`:74`,`:81`, `inlineStyle: "stroke: oklch(0.471 0.188 9.83)"`,
a pink) — sits in the middle of that dissolve, i.e. **a pink glyph on a background fading to pink**.

`.color-input:focus` clears the mask (`:303-306`), and `frames/C-overflow-dark.png` confirms the focused
box is whole and legible. So the defect is exclusively in the resting state — which is the state the
entire visual census captured and the state the user reads before deciding to interact.

Round 2 assessed this block as "careful and right" (Part V, horizontal overflow). The overflow
*containment* is right; the mask's collateral on the border and the accent glyph is not.

**Cure.** The mask exists to hint that content continues under the action zone. Scope it to the text,
not the box: a `::after` gradient overlay inside the padding box leaves border, radii and the sibling
button untouched. Or drop it — R3-6's fix makes the field a fixed-width scroller, where the ellipsis
alone carries the same signal.

---

### R3-8 · MINOR · Whether the user's first invalid input reports at all depends on how the page booted

`useColorParsing.ts:50,86,88`: `initialParse` starts `true` and suppresses the first failure's flash.
The only thing that consumes it is `restoreFromStorage` → `parseAndSetColor(storedInput)`
(`useColorPersistence.ts:73`), and that is gated:

```ts
// demo/color-picker/App.vue:378
if (!appliedFromUrl && hydration.source !== "url") restoreFromStorage();
```

with `useColorPersistence.ts:68` short-circuiting again when `hadPersistedColor` is false. Boot
`hydrate.ts:100-127` builds the model directly and never calls `parseAndSetColor`. So:

| boot path | `initialParse` at first user input | first bad input |
|---|---|---|
| URL carries a colour | `true` | **silent** |
| first-ever visit (no URL, no storage) | `true` | **silent** |
| returning visit, no URL colour | `false` | flashes |

And the app writes the colour into its own URL — every observed load in this session landed on
`…/#/?color=%23abcdef` or `…/#/?space=lab&color=…` (`REPORT.json` `/#/` `probe.url`, all four
matrices). **The silent branch is the dominant one.**

This sharpens round-1 C-6 from "the first invalid input produces no error" to something worse for
diagnosis: *whether an error appears at all is a function of localStorage and URL state the user
cannot see.* A bug report that says "it showed nothing" and one that says "it flashed red" can be the
same build.

**Cure.** Delete `initialParse`. Its job — don't flash red at a user who has not typed yet — is
already done correctly by callers: the boot paths that seed the model do not go through
`parseAndSetColor` at all any more (`hydrate.ts`), and the one that does (`restoreFromStorage`) is
restoring a value the user themselves last committed. A latch that survives boot to eat the user's
first real error is a masking fallback (edict 2).

---

### R3-9 · MINOR · `findCustomName` is a linear scan on three hot computeds and every palette swatch

```ts
// useCustomColorNames.ts:61-66
function findCustomName(xyzString: string): string | undefined {
    for (const [name, xyz] of normalizedCustomNames.value) {
        if (xyz === xyzString) return name;
    }
    return undefined;
}
```

An `O(n)` walk of a `Map` keyed the wrong way round — `name → xyz`, scanned by value. Callers:
`formattedCurrentColor`, `currentColorMeta`, `canProposeName` (three scans per invalidation) and
`savedColorLabel` (`useColorNameResolution.ts:48-53`), which is called **once per saved swatch**.
`getApprovedColorNames` accepts `limit` up to 500 (`api/src/modules/color/schema.ts:27`) and the demo
passes none (`color-names.ts:23-31`), so the registry is server-sized.

Verified live: `findCustomName(xyz) = "babb-blue"` (probe §E) — correct, just linear.

Not currently hot, because R3-3's 100 ms debounce caps invalidations at ~10/s. **Fixing R3-3 as
prescribed removes that accidental cap**, so the two must be repaired together.

**Cure.** Build the inverse index (`xyz → name`) in the same loop that builds
`normalizedCustomNames` (`useCustomColorNames.ts:20-33`). One extra `Map.set`, `O(1)` lookups, and
the collision case becomes visible at build time — which is where R3-2 wants to be caught.

---

# Part II — MT-F001, answered by a third instrument

**It swallows. Nothing reaches the user but a generic typo pill, and nothing reaches telemetry.**

The library leg, re-measured directly against `src/css/index`:

```
--- A: parseCssColor ---
"oklch()"                -> THROW TypeError: Cannot read properties of undefined (reading 'replace')
"rgb()"                  -> THROW TypeError: …
"hsl()"                  -> THROW TypeError: …
"lab()"                  -> THROW TypeError: …
"lch()"                  -> THROW TypeError: …
"color()"                -> THROW TypeError: …
"oklab()"                -> THROW TypeError: …
"hsl(  )"                -> THROW TypeError: …
"oklch("                 -> ERR-RESULT              (well-behaved failure)
"oklch(0.5 0.1 250 / )"  -> OK                      (a spec violation — R2-7, carried)
"oklch(0.5 0.1 250)"     -> OK
```

Site confirmed by reading:

```ts
// src/css/grammar.ts:176-180
const slash = splitTopLevel(body, "/");
if (slash.length > 2) return failure(source);
const alpha = alphaToken(slash[1]?.trim());              // <- optional-chained, correct
if (alpha === null) return failure(source, "css_syntax", ["alpha"]);
const components = splitTopLevel(slash[0]!.replace(/,/g, " "), "space");   // <- `!` is a lie
```

`slash[1]` is guarded with `?.`; `slash[0]` is asserted with `!`. On an empty body `splitTopLevel`
returns `[]` and the assertion is false. The two adjacent indices of the same array are handled with
opposite rigour, one line apart.

Path through this component:
`ColorInput.vue:194 onInputInput` → `:199 parseAndSetColorDebounced` → `useColorParsing.ts:60
parseAndSetColor` → `:64 parseColor` → `picker-color.ts:110 parsePickerColor` → `parseCssColor` →
throw. Also reachable synchronously via `:208` (Enter) and `:215` (send).

The live leg, controlled capture (`frames/probe-1.json` `B-f001-light`, `frames/B-f001-error.png`,
`frames/B-f001-after2s.png`):

```json
{ "afterType":  { "text": "oklch()", "badge": false },
  "afterEnter": { "badgeText": "not a valid color",
                  "inputBorder": "rgb(219, 36, 36)",
                  "inputBoxShadow": "color(srgb 0.86 0.14 0.14 / 0.25) 0px 0px 0px 2px" },
  "after2s":    { "badge": false, "text": "oklch()", "border": "lab(92 88.8 20 / 0.827)" },
  "pageErrors": [] }
```

**`pageErrors: []`.** A `TypeError` from a shipped library was converted into an accusation of user
error by this:

```ts
// useColorParsing.ts:84-87
} catch {
    previousInvalid = input;
    if (!initialParse) flashParseError();
}
```

A bare `catch` with no binding and no discrimination. `PickerColorError` — the typed failure that
carries `result.diagnostics` (`picker-color.ts:96-112`) — and a library `TypeError` are rendered
identically. Edict 2 forbids masking fallbacks; this mask has been hiding a live BLOCKER.

And `after2s` is the tail nobody has written down: once the badge times out, the **invalid text
remains in the field** with the border returned to the ordinary focus colour. `previousInvalid` is now
latched to `"oklch()"`, so `input === previousInvalid` short-circuits at `useColorParsing.ts:61` and
pressing Enter again produces **nothing at all** — no error, no commit, no motion. The field's final
resting state after MT-F001 is *indistinguishable from a field that is working*.

**Cure.** Narrow the catch: `catch (e) { if (!(e instanceof PickerColorError)) throw e; … }`. A genuine
syntax rejection stays a quiet inline error; anything else reaches `window.onerror`, where MT-F001
would have surfaced on day one. `ParseEchoReadout` (`:109`) — which already renders `astEcho` and
`gamutVerdict` from the same pipeline — is the natural home for the `diagnostics` the catch discards.
**The library-side `!` is a `src/css/grammar.ts` repair; route to the library seat.**

---

# Part III — CARRY LEDGER (rounds 1 + 2, with round-3 verdicts)

Verdicts are round 3's own. `challenge-C-implementation.round1.md` and `.round2.md` hold the full
evidence for each.

## Round 2 (7 findings)

| # | Round-2 finding | R3 verdict | Round-3 note |
|---|---|---|---|
| R2-1 | send button can never submit typed text | **CONFIRMED — and generalised to all three engines** | I tried to break this and failed. See §IV. `frames/probe-3.json` adds that the button has no hover/press/focus register at all, so there is not even a pressed-state cue while it misfires |
| R2-2 | pending debounce never cancelled | **CONFIRMED, both legs** | `grep -n "onUnmounted\|onBeforeUnmount\|clearTimeout\|cancel()" demo/shell/dock/ColorInput.vue` → **no output whatsoever**. The unmount leg is real: `Dock.vue:153` `<DockLayer v-if="hasAnyActionBar">` and `:156` `<ActionBarLayer v-if="actionBar" …>`. The only `.cancel()` in the app remains `ColorPicker.vue:383` |
| R2-3 | `contenteditable=true` admits rich paste | **CONFIRMED, with a picture** | `frames/D-paste.png` read directly: "red" rendered as large bold green, the dock row visibly blown open. Subsumed by R3-5's cure (`plaintext-only`) |
| R2-4 | propose-mode success desyncs field from model; the "signal parent" comment is false | **CONFIRMED** | no `defineEmits` in the file; `ActionBarLayer.vue:28` `colorInputRef` assigned at `:116`, never dereferenced. R3-1 adds that `:240` writes a value that may be an unparseable name |
| R2-5 | 300 ms JS timer vs `--duration-slow` 450 ms | **CONFIRMED** | `:256` vs `:313`; carried unchanged |
| R2-6 | three imports routed through re-export shims of the package the fourth names directly | **CONFIRMED — systemic, route the sweep** | `demo/ui/{popover,tooltip,separator}/index.ts` are one-line re-exports of `@mkbabb/glass-ui`; 18 such shims repo-wide. Do not patch here |
| R2-7 | `oklch(0.5 0.1 250 / )` accepted — empty alpha after `/` | **CONFIRMED** (§II sweep, `-> OK`) | the adjacent half of MT-F001: `slash[1]` false-accepts where `slash[0]` throws. **`src/css/grammar.ts` — route to the library seat** |

## Round 1 (18 findings)

| # | Round-1 finding | R3 verdict | Round-3 note |
|---|---|---|---|
| C-1 | bare `catch` masks a `TypeError` as user error | **CONFIRMED** | §II; and the `after2s` tail is new — the masked state ends *indistinguishable from working* |
| C-2 | `.btn-interactive` is a phantom class | **CONFIRMED — now empirically, not by grep** | `frames/probe-3.json` `sendStates`: rest, hover, active and focus are **byte-identical** (`opacity:1`, `scale:none`, `transform:matrix(1,0,0,1,0,-12)`, `boxShadow:none`, `outlineStyle:none`), with `hoverDelta:false` and `focusRing:false`. Round 1 proved the class does not exist; this proves the *behaviour* does not exist |
| C-3 | `crown-appear` is a dead animation | **CONFIRMED** | `frames/probe-1.json` `crownKeyframeNames: ["crown-appear-55dadc03"]` — the only definition is scope-hashed, while `:38`'s inline `animation: crown-appear …` names the unhashed identifier Vue does not rewrite in inline styles |
| C-4 | the send button is the sole nameless button on `/#/` | **CONFIRMED — with a differential attribution neither round had** | `REPORT.json`: `namelessButtons: 1` on `safari-desktop-light` **and** `safari-desktop-dark`; `0` on `safari-mobile-light` **and** `safari-mobile-dark`. `frames/probe-2.json` `G-mobile` shows this component `{"present": false, "missing": true}` on mobile. The count is 1 exactly where it renders and 0 exactly where it does not. `probe-1.json` `sendStyles`: `ariaLabel:null, title:null, textContent:"", typeAttr:null` |
| C-5 | rejected colour never announced | **CONFIRMED** | `probe-1.json`: `inputAria {invalid:null, describedby:null}`, `badgeStyles {role:null, ariaLive:null, id:""}`. WCAG 3.3.1 Level A. Folded into R3-4's cure |
| C-6 | the first invalid input produces no error | **CONFIRMED and SHARPENED → R3-8** | not always — it depends on the boot path, and the dominant path is the silent one. Gate located at `App.vue:378` |
| C-7 | retyping the same invalid text is silent forever | **CONFIRMED** | `useColorParsing.ts:49,61,84`. R3-1 makes it worse: the latch can capture the app's *own* canonical text |
| C-8 | the debounce is an app-wide singleton | **CONFIRMED** | `useColorParsing.ts:92` inside `useColorPipeline`, one instance, injected. Compounds R2-2 |
| C-9 | 2000 ms debounce + blur snap-back (reproduction: NONE in r1) | **CONFIRMED — reproduced by r2, generalised by r3** | escalated to BLOCKER at R2-1; §IV establishes it holds in Chromium, WebKit and Firefox |
| C-10 | focus indicator is the user's own colour, UA ring deleted | **CONFIRMED** | `:16` `focus-visible:outline-none`, `:162-166` `borderColor: cssColor.value`. `frames/C-focus-dark.png` / `C-overflow-dark.png` show the focused border taking the colour. A user who picks a low-contrast colour deletes their own focus indicator |
| C-11 | the error badge paints over the send button | **CONFIRMED, quantified, and widened → R3-4** | 63.8 % of the button, and ~all but the first glyph of the text |
| C-12 | zero behavioural coverage + a cited test file that does not exist | **CONFIRMED independently** | §V |
| C-13 | dead surface: unread prop, unread injections, uncalled exposed methods | **CONFIRMED** | `editTarget` `:139` never read; `cssColorOpaque` `:146` and `canProposeName` `:150` destructured and unused; `defineExpose` `:282-288` — `grep -rn "copyAndSetInputColor\|onSubmitColor\|inputIsFocused" demo/ \| grep -v ColorInput.vue` → empty |
| C-14 | a failed proposal is silent, laundered through `catch (e: any)` | **CONFIRMED, and now with a named cause** | `:242-243`. R3-2 supplies the concrete rejection this swallows: the server's `/^[a-z][a-z0-9-]*$/` 400s any name with a space or capital, and the component neither mirrors the rule nor reports the failure. `catch (e: any)` is an explicit escape from `strict`'s `useUnknownInCatchVariables` |
| C-15 | uncleaned timer and rAF in the propose-mode watcher | **CONFIRMED** | `:256`, `:262`; and the file has no teardown of any kind (see R2-2) |
| C-16 | six imperative `innerText` writers; select-all-on-focus destroys caret placement | **CONFIRMED and EXTENDED** | R3-1 shows the writers do not merely fight each other — they write a value from a *different type* (a name, not CSS) into a box that is read back as CSS |
| C-17 | coarse-pointer hover-Popover | **STILL A HYPOTHESIS** | not tested in round 3 either. The keyboard leg round 2 added stands on code: `trigger="hover"` (`:4`) with no `aria-describedby` from the field means the help copy, the serialized colour and `ParseEchoReadout` are pointer-only. `frames/probe-2.json` `H-kbd-type-popover.tabWalk` confirms the field *is* tab-reachable (13 steps), so the content is reachable-adjacent but never announced |
| C-18 | dock route-drift blocked live testing | **CONFIRMED, and worse in round 3** | §VI |

---

# Part IV — The refutation I attempted, and its failure

**Hypothesis.** R2-1 (send button can never submit) rests on `blur` firing before `click`. That
depends on the UA focusing a `<button>` on `mousedown` — which **Chromium does and macOS
WebKit/Firefox classically do not**. Round 2 measured in Chromium. The repo's visual gate is Safari.
If the ordering were Chromium-only, R2-1's severity would be wrong *and* the gate's blindness would be
a separate finding.

**Test.** A 12-line static page reproducing the exact three-part shape — a `contenteditable` whose
`blur` handler overwrites its own text, and a sibling `<button>` whose `click` handler reads it —
driven by a real click in all three engines:

```
$ node scratchpad/blurorder.mjs

=== chromium (148.0.7778.96) ===
   typed  activeEl=ce
   mousedown activeEl=ce
   BLUR   read="typed-value" -> overwrite
   CLICK  read="CANONICAL"  <- this is what onSubmitColor submits

=== webkit (26.4) ===          … identical ordering, identical reads
=== firefox (150.0.2) ===      … identical ordering, identical reads
```

**Result: hypothesis refuted.** In all three engines `blur` fires — and the overwrite lands — before
`click` reads. Note `mousedown activeEl=ce`: WebKit and Firefox indeed do *not* focus the button, but
they blur the contenteditable anyway. The distinction I was relying on does not exist for this shape.

**R2-1 is upheld and strengthened**: it is not a Chromium artefact, it is universal, and the send
button is structurally incapable of submitting typed text in every browser the product ships to.

---

# Part V — Test truth: the exact mutation that keeps the suite green

Verified independently of rounds 1 and 2:

```
$ grep -rln "ColorInput\|Enter a CSS color\|Propose a color name" e2e/ test/
e2e/smoke/oracles/o10d-display-voice-census.spec.ts

$ grep -rn "submitProposedName\|proposeColorName" e2e/ test/
e2e/smoke/flows/color-propose.spec.ts:24: * `submitProposedName` handler.     <- a comment

$ ls test/parsing/
timeline
```

One test in the repository touches this component, and it hovers the field to census the popover
title's font. `e2e/smoke/flows/color-propose.spec.ts` asserts only the *toggle button's* accessible
name in `ActionBarLayer` and never reaches ColorInput.

**The mutation:** delete `@keydown`, `@input`, `@focus`, `@blur` and both `<button>` elements, leaving
the `<span aria-label="Enter a CSS color">` and the Popover. `o10d` still finds a hoverable span and
still reads the popover title; `color-propose` never touched any of it. **A colour input that accepts
no input and commits nothing passes the full suite.**

Worse, the gate documents coverage that does not exist (`color-propose.spec.ts:22-24`):

> *"the contenteditable submission has unit coverage in `test/parsing/extract.test.ts` via the
> underlying `submitProposedName` handler."*

`test/parsing/` contains `timeline` and nothing else; no file in the repository names
`submitProposedName` or `proposeColorName` outside that sentence. A coverage claim with nothing behind
it is the worst kind of vacuous gate — it instructs the next reader to stop looking.

Lint cannot compensate: `eslint.config.js:70` disables `@typescript-eslint/no-explicit-any` and `:153`
disables `vue/no-unused-vars` — precisely the two rules that would have caught C-13's dead surface and
C-14's `catch (e: any)`.

**The test this component actually needs**, and which would have caught R3-1 on the day the naming
feature landed, is one property: *for every colour the model can hold,
`parseAndSetColor(formattedCurrentColor.value)` must be a no-op.* Two lines. It fails today.

---

# Part VI — Live-probe conditions (recorded so the next seat does not re-spend the budget)

The dev server at `http://localhost:9000` is **contended and not safe to drive**. In round 3:

- Synthetic clicks on `[aria-label="Toggle action bar"]` left the page on `/#/gradient` and then on
  `/#/browse`; `elementFromPoint` at the toggle's own centre returned a different element
  (`toggleTopHit=false`).
- The page navigated **cross-port**, from `http://localhost:9000/index.html#/` to
  `http://localhost:9010/#/browse`, twice, mid-`evaluate`. `lsof` confirms two dev servers:
  `node 93401 … TCP *:9000` and `node 16625 … TCP *:9010`.
- `.color-input` was never present in any state I could reach through the toggle.

Round 3's live evidence therefore comes from **controlled captures already on disk** —
`frames/probe-1.json`, `probe-2.json`, `probe-3.json` and the PNG frames beside them (2026-07-27
13:30), plus `docs/tranches/V/megatranche/audit/visual/REPORT.json`. Every number quoted above is
attributed to its file. Nothing is inferred from a contended read.

This is round-1 C-18 and round-2's amplification of it, now with a root cause: **two dev servers on
9000 and 9010, and at least one other agent driving the same browser.** Any seat that needs a live
probe should stand up its own server on an unused port first.

---

# Part VII — Negative results (checked, sound; do not re-spend)

- **PRM-RAF epidemic** — one single-shot `requestAnimationFrame` (`:262`), optional-chained, deferring
  a focus past a DOM write. No loop, no continuous frame work. **Clean** as to the epidemic (teardown
  missing → C-15).
- **WebGL** — none in this component. `"WebGL: context lost."` on `/#/` (`REPORT.json`,
  `safari-desktop-light` only) is the HeroBlob surface.
- **`ValueUnit` nesting accumulation** — this component constructs no colour values; it hands strings
  to `parseAndSetColor`. No accumulation site.
- **`defineModel` stale reads** — no `defineModel` here. R3-3 and R2-1 are the same *hazard class*
  reached by two different routes (a debounced derivation, and DOM-as-source-of-truth). Edict 7's
  `shallowRef` cure applies to both.
- **oklch→HSV hue drift / `stableHue`** — `useColorParsing.ts:39-46` and `:76-83` both gate on
  `s*v > 0.01` and retain the last deliberate hue in `catch`; `useColorPipeline.ts:80-96` refreshes
  only on external-origin writes via the `lastWrittenModel` sentinel. **Sound.**
- **reka-ui slider pointer-capture** — no slider here. N/A.
- **`verbatimModuleSyntax`** — `import type { EditTarget }` (`:134`) is the file's only type-only
  import and is correctly marked. **PASS** (the import is dead — C-13).
- **`vj-celebrate`** — I suspected the `Transition name` at `:86` might be undefined. It is not:
  `demo/styles/animations.css:142-165` defines the full enter/leave family, and `.error-badge`
  correctly supplies `--vj-celebrate-y: -50%` / `--vj-celebrate-scale: 0.85` to match its resting
  transform. **Sound; hypothesis withdrawn.**
- **`text-gold` / `--color-gold`** — I suspected the Crown's Tailwind colour utility might not resolve.
  It does: `--color-gold: #D4AF37` and `--color-gold-light: #F5E6A3` are declared inside the `@theme`
  block opened at `demo/styles/foundation.css:94`, so `text-gold` is generated. **Sound; hypothesis
  withdrawn.**
- **Horizontal overflow** — `overflowX: 0` on `/#/` in all four capture matrices (`REPORT.json`). The
  containment machinery is correct; its *resting collateral* is R3-7, a different defect.
- **Boundary inputs** — `rgb(0 0 0)`, `rgb(255 255 255)`, `oklch(0 0 0)`, `oklch(none none none)`,
  `#000`, `rgb(-0 -0 -0)` parse; `rgb(NaN NaN NaN)` and `rgb(1e400 0 0)` raise `PickerColorError` and
  are handled. No boundary crash of this component's making — with round 1's correct caveat that the
  sweep reads clean *for the same reason the BLOCKER is invisible* (§II).

---

# Part VIII — Owner-edict compliance

| Edict | Verdict | Evidence |
|---|---|---|
| 1 · No god modules | **PASS** | 377 lines, one concern; the parse engine lives in `useColorParsing`, naming in `useColorNameResolution` |
| 2 · No legacy / no masking fallbacks | **FAIL** | C-1 (bare `catch` masking a `TypeError`); R3-8 (`initialParse` eats the user's first real error); C-13 (dead exposed API); R2-6 (three shim-routed imports beside a direct one) |
| 3 · KISS, no contrivance | **FAIL** | C-16 + R2-1 + R3-1: six imperative writers over three sources of truth, one of which breaks the submit control and one of which writes the wrong *type* |
| 4 · Glass-ui is the design system | **FAIL** | C-2 — `.btn-interactive` exists in neither the repo nor `@mkbabb/glass-ui@7.0.0`, and `probe-3.json` measures the resulting no-op |
| 5 · Root-level styling | **FAIL** | four per-instance inline overrides: `:22` (`borderColor`), `:37-39` (the dead `animation`), `:74`/`:81` (`{ stroke: safeAccent }`); the error state has two style owners (`:19` class + `:163` inline) |
| 6 · Animations never deleted | **FAIL** | C-2 (a working hover/press recipe retired onto a phantom) and C-3 (`crown-appear` has never played) |
| 7 · Idiomatic Vue 3.5 | **FAIL** | `useTemplateRef` ✓, reactive props destructure ✓ — but R2-1 and R3-1 show the missing synchronous local cache is the BLOCKER mechanism, not a style point |
| 8 · `verbatimModuleSyntax` | **PASS** | `:134` |

---

## Reproduction assets

Committed beside this report (both inside this seat's directory; no source file touched):

- **`roundtrip.probe.ts`** — R3-1 / R3-2 / R3-3 / R3-9 and the §II MT-F001 sweep. Drives the real
  `useCustomColorNames`, `useColorNameResolution` and `useColorParsing` by relative import; the only
  stub is `globalThis.fetch`.
- **`probe.vitest.config.ts`** — the round-1 harness, reused unchanged.

```
$ VITE_API_URL=http://127.0.0.1:9/api npx vitest run \
    --config docs/tranches/V/megatranche/audit/components/shell-dock-colorinput/probe.vitest.config.ts
Test Files  2 passed (2)   Tests  10 passed (10)
```

(`VITE_API_URL` is set only to keep the transport's dev-misconfig latch —
`demo/platform/transport/availability.ts:110-115` — from short-circuiting the stubbed fetch.)

Session-scratchpad only, not written into the repo:

- `scratchpad/blurorder.html` + `blurorder.mjs` — the §IV three-engine blur/click ordering test.

Live evidence is read from the controlled captures already on disk (`frames/probe-{1,2,3}.json`,
`frames/*.png`, `audit/visual/REPORT.json`) for the reason given in §VI.

---

*Seat: CHALLENGE-C · implementation · ROUND 3. Rounds 1 and 2 preserved verbatim at
`challenge-C-implementation.round1.md` and `challenge-C-implementation.round2.md`. Written only under
`docs/tranches/V/megatranche/audit/components/shell-dock-colorinput/`; no file outside this directory
was created or modified.*
