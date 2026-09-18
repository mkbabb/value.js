# CHALLENGE-C — `demo/workbenches/extract/ImageDropZone.vue` — implementation · **PASS 2**

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, the model this
seat was spawned with. Declared, not inherited.

---

## Standing on pass 1

A prior CHALLENGE-C pass exists and is preserved verbatim at
`challenge-C-implementation.pass1-2026-07-28-prior.md`. It is good work. I confirm its headline
finding independently and **do not re-litigate or double-count it**:

| Pass-1 | Status after pass 2 |
|---|---|
| **C1** drop-to-upload fails — `dragenter` never cancelled | **UPHELD.** Not re-measured (pass 1's CDP `Input.dispatchDragEvent` method is stronger than anything I ran). It also **invalidated my own first method** — see *Methodology correction* below. |
| **C2** drag highlight strobes | **UPHELD + independently reproduced** (my §M-5) |
| **C3** `openFilePicker()` re-enters through the root → Upload opens the eyedropper | **UPHELD.** Independently consistent: I measured one file chooser per activation (`3` choosers for 3 activations), which matches pass 1's point that the recursion is *bounded* while the duplicate *event* is not. |
| **C4** two intake paths, divergent validation; silent rejection | **UPHELD + ESCALATED** — see **P2-1**, which carries the same file two steps further than pass 1 did |
| **C5** no live region | **UPHELD** (my `liveRegionText` probe agrees) |
| **C6** `role="button"` + `tabindex="-1"` (dup of ledger D2-11) | **UPHELD + new positive control** — see **P2-3** |
| Test truth / vacuous gate | **UPHELD + reproduced by deletion** — see **P2-4** |

This pass reports **six findings pass 1 did not make**, of which one is a MAJOR that changes what
the component is understood to do wrong.

---

## Verdict

**DEFECTIVE.** Pass 1 established that the zone cannot *receive* an image. Pass 2 establishes that
when it does receive one — by the picker, by a still-pointer drop, by replace-over-preview, all three
of which pass 1 measured as working — **it renders the wrong picture**. A portrait image is displayed
at **9.32 % of itself**, measured, while the palette strip beside it is computed from 100 % of it, so
the instrument contradicts itself on one screen. And the undecodable-file path pass 1 stopped at one
uncaught page error continues, on the next click, into a **second** uncaught page error and an
eyedropper opened over a never-sized 300×150 canvas inviting the user to "Tap to sample".

---

## Methodology correction (pass 1 forced this, and it matters)

My first probes dispatched **synthesised** `new DragEvent("drop", { dataTransfer })` directly at the
zone. Those bypass Chromium's drag controller entirely, so they cannot see pass-1's C1 — and indeed
my synthetic drops "succeeded" where real ones do not. **Any conclusion resting only on a synthetic
DragEvent is unsound**, and I have discarded those.

Every headline finding below was therefore **re-reproduced through the picker path with real files
on disk** (`page.locator(...).setInputFiles(...)`), which pass 1's P2 already proves is a live,
reachable code path — and which `ExtractControls`'s Upload button drives as the *primary* intake
(`ExtractWorkbench.vue:230-232` → `ImageDropZone.vue:81-83`). No synthetic drag event is load-bearing
for P2-1 or P2-2.

**Probe ledger** (`pass2-probe/`, run with `node <script>` from that directory; the dev server must be
live at `:9000`). All runs used **isolated** Chromium instances, not the shared MCP browser — two
early runs against the shared browser returned `/#/generate` and `/#/admin/tags` because other seats
were navigating it concurrently, and were discarded.

| script | what it decides | synthetic drag? |
|---|---|---|
| `dz-picker.mjs` | **P2-1, P2-2** — portrait / landscape / corrupt, real files via `setInputFiles` | **no** |
| `mkfiles.mjs` | generates `portrait.png` (120×900), `landscape.png` (900×120); `broken.png` is 16 bytes of valid-header-plus-garbage | — |
| `dz-probe2.mjs` | **P2-3** — keyboard vs pointer on the sample action; focus after open | yes (state setup only) |
| `dz-probe3.mjs` | **P2-4** — which element the e2e locator resolves to; the deletion mutation | no |
| `dz-probe8.mjs` | **P2-1** escalation — the second page error, eyedropper canvas size | yes (state setup only) |
| `dz-probe9.mjs` | **P2-3** control — empty-state keyboard works; chooser counts | no |
| `dz-probe5.mjs`, `dz-probe6.mjs` | **P2-6** — focus ring, `min-h` collision | no |

---

## P2-1 · **BLOCKER** · ESCALATES pass-1 C4 · the undecodable file does not stop at one page error

Pass 1 (C4) took a `text/plain` file through the picker and measured
`newPageErrors: ["InvalidStateError: The source image could not be decoded."]` with `errorLine: null`.
Correct. **It stopped there.** The user does not.

### First, the same result with a real on-disk file, worst case

`pass2-probe/broken.png` is 16 bytes: a valid PNG magic header followed by garbage. Every OS and
every browser reports it as `image/png`, so it passes `onDrop`'s MIME guard *and* the picker's
`accept="image/*"`. `node pass2-probe/dz-picker.mjs`:

```json
=== broken.png (valid header, garbage bytes) (picker path, real file) ===
{ "zoneLabel": "Image preview area, tap to sample colors",
  "zoneTabindex": "-1",
  "natural": [0, 0],
  "destructiveLines": [],
  "dominant": null }
pageErrors: ["PAGEERROR: The source image could not be decoded."]
```

The zone commits to its developed identity — label rewritten to advertise sampling, `tabindex` to
`-1`, dashed border replaced by `border-transparent` (`:14`) so it no longer *looks* like a drop
target — around an image of literally zero pixels, with `destructiveLines: []`. See
`evidence-broken-image-state.png`: a blank plate carrying the bare words *"Uploaded image"*, which is
Chromium rendering the `alt` of a broken `<img>`, and which no assistive technology will ever read
(**P2-5**).

### Then the next click, which pass 1 did not take

The component has just told the user, in its own `aria-label`, to tap it. `node pass2-probe/dz-probe8.mjs`:

```json
{ "eyedropperOpened": true,
  "overlayText": "Tap to sample",
  "canvasSize": [300, 150],
  "rejections": ["The source image could not be decoded.", "[object Event]"] }
--- page/console errors ---
[ "PAGEERROR: The source image could not be decoded.", "PAGEERROR: Event" ]
```

`ImageEyedropper` opens over nothing. Its canvas is **300×150** — the HTML default, never sized,
because the source never decoded. A **second** uncaught page error is raised. The overlay says "Tap
to sample" over a blank grey rectangle, `ExtractControls` is hidden behind it, and there is no route
back through this component: `tabindex="-1"` (pass-1 C6) locks keyboard users out, and a pointer
click is what opened the overlay in the first place.

### Why the chain has no catch anywhere

`onDrop`/`onFileSelected` emit → `ExtractWorkbench.vue:234-237` `await session.onFile(file)` from an
**unawaited** async handler → `useExtractSession.ts:164-168` sets `previewDataUrl` **before any
decode** → `useExtractSession.ts:153-157` calls `quantizeFromFile(...)` **unawaited and uncaught** →
`useImageQuantize.ts:18-19` `createImageBitmap(file)` rejects. `error.value` is only ever written
inside `useImageQuantize.ts:80-99`, which is downstream of the rejection and never reached. So the
error channel `ExtractWorkbench.vue:80-85` renders is *structurally* unreachable from this failure.

### Audit consequence

`docs/tranches/V/megatranche/audit/visual/REPORT.md` records `pageErrors: 0` for `/#/extract` in all
four Safari matrices. True only because the capture never fed the component a file. **Two uncaught
page errors are one gesture away from a route certified clean.**

### Cure

Pass-1 C4's cure (one intake boundary) is right but insufficient — a type check would not have caught
`broken.png`, because its type is honest. **The bytes must be the authority.** Decode first, commit
second:

```ts
async function accept(file: File | undefined) {
    if (!file) return;
    try { (await createImageBitmap(file)).close(); }
    catch { emit("reject", `${file.name} is not a readable image.`); return; }
    emit("file", file);
}
```

routed into the destructive line the workbench already renders. This subsumes pass-1 C4's cure, kills
the silent-rejection half of it, and removes nothing: `useImageQuantize` performs this decode anyway.

---

## P2-2 · **MAJOR** · **NEW** · `object-contain` is inert; a portrait preview shows 9.32 % of the image

Not in pass 1. This is the finding that changes the picture.

### Mechanism

`ImageDropZone.vue:41`:

```html
<img v-if="preview" :key="preview" :src="preview"
     class="w-full h-full object-contain rounded-xl" alt="Uploaded image" />
```

`h-full` is `height: 100%`. Its containing block is the zone root, whose height is **indefinite** —
`flex flex-col items-center justify-center` with `min-h-[140px]` (line 9) plus
`min-h-[180px] max-h-[min(320px,40dvh)]` from `ExtractWorkbench.vue:20`. A percentage height against
an indefinite parent height resolves to `auto`. The `<img>` therefore takes its **intrinsic aspect
ratio at full width**, blows past the container's `max-height`, and is guillotined by
`overflow-hidden` (line 8). `object-fit: contain` never fires — there is nothing for it to contain,
because the box itself is the wrong size.

### Reproduction — real 120×900 PNG through the picker

`node pass2-probe/dz-picker.mjs`:

```json
=== portrait 120x900 (picker path, real file) ===
{ "natural": [120, 900],
  "zoneBox": [462, 320],
  "imgBox": [458, 3435],
  "imgComputedHeight": "3435px",
  "objectFit": "contain",
  "visibleFraction": 0.0932,
  "destructiveLines": [],
  "dominant": "36% of the image" }
pageErrors: []
```

458 × (900 / 120) = **3435** — exact. **9.32 %** of the image is visible; 1557 px above and 1558 px
below the frame are discarded (`dz-probe.mjs`: `imgTopVsZoneTop: -1557`,
`imgBottomVsZoneBottom: 1558`). The source PNG carries the words **TOP** and **BOT** burned into its
first and last 40 px; neither appears in `evidence-tall-image-crop.png`.

### The defect is bidirectional, and the control proves the box is simply never right

Same probe, a 900×120 landscape source:

```json
=== landscape 900x120 (control) ===
{ "zoneBox": [462, 180], "imgBox": [458, 61], "visibleFraction": 2.9478 }
```

61 px of image inside a 180-px zone — **34 % of the plate used**, the rest empty. So: tall images
overflow the box by 1073 %, wide images under-fill it by 66 %, and `object-contain` — the one
declaration whose entire job is to reconcile those two cases — is doing nothing in either direction.
The zone's height is decided by a `min-h`/`max-h` pair that has never met the image.

**This is why it survived**: every demo asset, every screenshot in the visual audit, and every
hand-test image is landscape, where the failure reads as ordinary letterboxing.

### Why it is worse than a cosmetic clip

`evidence-tall-image-crop.png`: the zone renders a flat green→cyan band while the palette strip
directly beneath it renders green, magenta, violet, cyan and black — the quantizer saw the whole hue
wheel. **The preview and the palette visibly disagree on the same screen**, and the dominance readout
says "36 % of the image" about an image the user is being shown 9 % of. The corner tag then invites
them to *sample* it, and `ImageEyedropper` samples the full source — so a sampled colour can have no
counterpart anywhere in the visible preview. The specimen lies, which is precisely the thing the
component's own header comment (`:3-5`, *"the specimen never lies"*) claims it will not do.

### Cure

Bound the image by the box instead of asking it to fill one that has no definite size:

```html
class="max-w-full max-h-[min(320px,40dvh)] w-auto object-contain"
```

`max-height` with a definite length works regardless of the parent's indefiniteness, `w-auto` lets
the aspect ratio hold, and the flex centring already in place does the rest — the `overflow-hidden`
then has nothing to clip. One class list, no new abstraction, and the `max-h` literal moves off the
consumer (`ExtractWorkbench.vue:19-21`) onto the element it actually governs, which is where a
root-level style belongs (edict 5).

---

## P2-3 · MAJOR · **new positive control** on pass-1 C6 / ledger D2-11

Pass 1 measured `pickerOpenedByKeyboard: false` and correctly called `role="button"` +
`tabindex="-1"` an authoring error. Two additions that sharpen it from "the keyboard does nothing"
to "the action exists and is pointer-only":

**(a) The action is real, and only the mouse can reach it.** `node pass2-probe/dz-probe2.mjs`,
image loaded:

```json
{ "overlayBefore": 0,
  "overlayAfterKeyboard": 0, "tapToSampleAfterKeyboard": false,
  "overlayAfterClick": 1,    "tapToSampleAfterClick": true,
  "activeElementAfterOpen": "BODY.relative" }
```

Enter **and** Space: overlay count stays 0. A pointer click: overlay count 1, "Tap to sample"
appears. This is a **WCAG 2.1.1 (Keyboard, Level A)** failure on a functioning feature, not a missing
feature — and `activeElementAfterOpen: "BODY"` shows focus is never moved into the overlay that just
covered the pane.

**(b) The author knew how; the empty state proves it.** `node pass2-probe/dz-probe9.mjs`:

```
filechoosers after Enter: 1
filechoosers after Enter+Space: 2
scrollY after Space: 0
filechoosers after a mouse click: 3
```

One chooser per activation, `.prevent` (`:22`) correctly suppressing the Space-scroll, and no
double-open (the HTML *click-in-progress* flag bounds pass-1 C3's re-entrancy at one chooser). **The
keyboard path is implemented correctly in the one state where it is redundant, and switched off in
the one state where it is the only way in.**

---

## P2-4 · MAJOR · **reproduces pass-1's vacuous gate by executing the mutation**

Pass 1 named the mutation. I ran it. `node pass2-probe/dz-probe3.mjs`:

```
matches for /Upload image/i inside <main>: 2
  0 {"tag":"DIV","role":"button","aria":"Upload image, click to browse or drop an image here",…}
  1 {"tag":"BUTTON","role":null,"aria":null,"title":"Upload image","cls":"dock-icon-button …"}
after DELETING ImageDropZone from the DOM, walk.spec's assertion:
  matches: 1  .last() visible: true
```

`e2e/smoke/walk.spec.ts:78-81` is the only test in the repo that names this component, and `.last()`
resolves to `ExtractControls.vue:40-46`'s `DockControl` (accessible name from `title`), never to the
drop zone. **Mutation executed: remove the component from the DOM entirely → the assertion still
finds a match, still visible, still green.** Every finding in both passes is invisible to the suite.

Two one-line cures: pin the locator to a phrase only this component owns
(`{ name: /drop an image here/i }`), and add the two gates that would have been born RED —
(i) feed `broken.png`, assert a destructive line appears **and** `pageErrors === 0`; (ii) feed
`portrait.png`, assert `img.height <= zone.height`. Both fixtures are already in `pass2-probe/`.

---

## P2-5 · MINOR · **NEW** · `alt="Uploaded image"` is unreachable — `button` forces presentational children

WAI-ARIA 1.2, `button` role: **"Children Presentational: True"** — user agents remove the accessible
descendants of a `role="button"` from the accessibility tree. The root is `role="button"` (`:18`)
with an `aria-label` (`:20`), so the `<img alt="Uploaded image">` (`:42`) contributes nothing: the
name is the label and the image is stripped.

This is dead weight in the healthy state and **actively harmful in P2-1's state**: measured
`imgAlt: "Uploaded image"` alongside `imgNatural: [0, 0]`, with no destructive line and no live
region (pass-1 C5). The alt text is the *only* signal distinguishing a good preview from a broken
one, and ARIA has already discarded it — so to a screen-reader user the two states are **byte-for-byte
identical**: same role, same name, same everything.

(It is also content-free — "Uploaded image" restates the element type. Under a cure it should carry
the file name.)

---

## P2-6 · MINOR · **NEW** · the corner affordance is dead on touch, dead to AT, and dead code on focus

`ImageDropZone.vue:56-61`:

```html
class="… opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
aria-hidden="true"
```

The tag renders only when `preview` is truthy — and in the sole consumer
`preview` truthy ⇒ `:disable-click="!!session.previewDataUrl.value"` truthy ⇒ `tabindex="-1"`. A
`tabindex="-1"` element is never keyboard-focused, so the group can never match `:focus-visible`:
**`group-focus-visible:opacity-100` is unreachable in every state in which the tag exists.**
Measured (`dz-probe.mjs`): `D_cornerTag: { "text": "sample", "opacity": "0", "ariaHidden": "true" }`.

Consequence: **on touch there is no hover**, so the only hint that the preview has silently become a
*sampling* surface is never rendered; `aria-hidden="true"` removes it from AT as well; and the
`aria-label` uses the word "tap" to describe an action touch users get no affordance for and keyboard
users cannot perform at all (P2-3). The three matrices that matter — touch, keyboard, AT — each get
nothing.

Two further arms are **dead code** for the same reason: `'replace'` (`:61`) and `'Replace image,
click or drop a new image'` (`:20`) require `preview && !disableClick`, which the sole consumer makes
unreachable.

---

## P2-7 · MINOR · **NEW** · a base64 data URL where an object URL is the idiom

`useExtractSession.ts:29-36 / 166` reads every file with `FileReader.readAsDataURL`; the result lands
on `:src` (`:39`), on `:key` (`:38`), and is passed on to `ImageEyedropper`
(`ExtractWorkbench.vue:175`). Measured inflation (`dz-probe7.mjs`): `fileBytes: 8915` →
`dataUrlChars: 11910` = **1.336×**.

For a routine 4 MB phone photo that is a ~5.4 MB JS string held live in a `ref`, written into a DOM
attribute, used as a Vue `:key` (string-compared on every re-render of the `<Transition>`), and
handed as a prop to a second component — against ~60 bytes for `URL.createObjectURL`. The write lives
in the composable, but this component consumes it three ways; recorded here so the fix is not
orphaned.

---

## P2-8 · INFO · **NEW** · three token / utility discipline slips, measured

**(a) `rounded-xl` on the preview image** (`:41`). The project's panel-radius token is
`rounded-panel` (6 `.vue` files under `demo/`); `rounded-xl` appears in **2**
(`ImageDropZone.vue`, `MixResultDisplay.vue`). A raw scale value where a token exists — *and*
redundant, since the root already carries `rounded-panel overflow-hidden` (`:8`) and clips it.

**(b) duplicated, unmerged `min-h`.** `node pass2-probe/dz-probe6.mjs`:

```json
{ "classList": "… overflow-hidden min-h-[140px] cursor-pointer … min-h-[180px] max-h-[min(320px,40dvh)]",
  "computedMinHeight": "180px" }
```

Both `min-h-[140px]` (own) and `min-h-[180px]` (consumer) land on one element. The intended value
wins **by stylesheet emission order, not by authorship**. `demo/shared/utils.ts:4` exports `cn`
(clsx + tailwind-merge) and **zero** `.vue` files under `demo/` use it — a codebase-wide pattern, not
this component's invention, flagged here because this is where the collision is live and where a
future Tailwind ordering change silently shrinks the drop target by 40 px.

**(c) the certified focus ring is not composed.** `demo/styles/focus-ring.css` defines the U-F25
dual-contrast recipe (`--focus-ring-inner` / `--focus-ring-outer`) for "every keyboard-operable
control". This one does not compose it. `node pass2-probe/dz-probe5.mjs`:

```json
{ "focusVisible": true, "outline": "rgb(28, 25, 23) auto 3px", "boxShadow": "none" }
```

That is the **UA default** ring. `demo/styles/foundation.css:703-720` does cover
`[role="button"]:focus-visible`, but that block is inside `@media (forced-colors: active)`
(opens at `:678`) — so in the normal register the only keyboard affordance on the zone is a browser
default whose contrast against the dashed pink plate is unverified.

---

## Root cause, and the one transposition that closes seven findings

Pass-1 C3 named it as overloading. Making the count explicit: **one `<div role="button" tabindex>`
carries browse + drop + sample**, and the third is not even its own — it arrives as a fallthrough
`@click` from `ExtractWorkbench.vue:25`. One node holds one role, one name and one tabindex, so the
component must **time-multiplex three affordances through `disableClick`** — and that multiplexing
*is* pass-1 C3 and C6, and *is* P2-3, P2-5 and P2-6 in this pass.

Separation costs no new file, no new directory, no wrapper (edict 3 holds):

- the zone becomes a plain `<div>` — drop target only: `@dragenter.prevent` (pass-1 C1),
  `@dragover.prevent`, `@drop.prevent`, `pointer-events: none` on its children (pass-1 C1/C2). No
  role, no tabindex, no aria-label;
- **browse** becomes a real `<button>` — the placeholder block at `:46-51` already *is* that element;
  giving it the `<button>` tag yields tab stop, Enter/Space, focus ring and correct role for free;
- **sample** becomes a real `<button class="absolute inset-0">` rendered when `preview` is set,
  owning the eyedropper action directly instead of receiving a parent's fallthrough click. The corner
  tag becomes its visible label and stops being `aria-hidden`;
- move the `<input type="file">` out of any click surface (pass-1 C3), at which point `defineExpose`
  (`:85`) and the `dropZoneRef` reach-through (`ExtractWorkbench.vue:222`, `:230-232`) can retire —
  the workbench owns the input and stops calling into a child instance.

That single transposition closes pass-1 C1, C2, C3, C6 and pass-2 P2-3, P2-5, P2-6. **P2-1 and P2-2
are independent of it** and need their own two cures (decode-before-commit; bound the image box) —
both one-liners, neither adding a module.

---

## Standing-edict check

| Edict | Status |
|---|---|
| 1. No god modules | **PASS** — 114 lines, one file, no accretion |
| 2. No legacy code | **FAIL** — two intake paths with divergent rules (pass-1 C4 / P2-1) is a dual path |
| 3. KISS, no contrivance | **PASS** — invents no dir, no wrapper; the proposed cures add none either |
| 4. Glass-ui is the design system | **PASS** — nothing minted locally. *Note, not a finding*: a drop zone with preview + edge affordance is a `glass-ui@^7.0.0` primitive candidate |
| 5. Root-level styling | **FAIL (P2-8a, P2-2)** — `rounded-xl` is a per-instance radius override on a child the container already clips; the height clamp that governs the image lives on the consumer, not the element |
| 6. Animations never deleted | **PASS** — `vj-morph` is the shared family (`demo/styles/animations.css:70-122`); the scoped block holds only the `.plate-ink` token |
| 7. Idiomatic Vue 3.5 | **PARTIAL** — `useTemplateRef` correct (`:78`); props undestructured against both siblings (`ExtractControls.vue:103`, `ExtractWorkbench.vue:204`). Confirms pass-1 C7. No `defineModel`, so the stale-read hazard does not apply |
| 8. `verbatimModuleSyntax` | **PASS** — only value imports; no type-only import to mark |

---

## Known-hazard sweep

| Hazard | Present? | Evidence |
|---|---|---|
| `defineModel` stale reads | No | No `defineModel`; `dragging` is a plain `ref` (`:79`) |
| oklch→HSV hue drift / `stableHue` | No | No colour maths in this file |
| `ValueUnit` nesting accumulation | No | No `ValueUnit` construction |
| reka-ui pointer-capture leak | No | No slider, no pointer capture taken |
| Ungated rAF (PRM-RAF) | No | Zero rAF. (`ExtractWorkbench.vue:249` has one *one-shot* `await new Promise(requestAnimationFrame)` — not a loop) |
| WebGL context loss / eager boot | No | No WebGL. `REPORT.md`'s `WebGL: context lost` is on `/#/`, not `/#/extract` |
| `parseCssColor` crash class | No | No parsing — but the file has **its own** crash class (P2-1), and it produces *two* uncaught page errors, not one |
| Leaked listeners / observers / growth | No | Template-bound listeners only, torn down with the node; no timers, observers, or accumulating collections |

**Negative-proof note.** Pass 1's negative results 1–6 are all independently consistent with mine and
I do not restate them. One I can add positive evidence for: the `/#/extract`
`namelessButtons: 3` in `REPORT.json` are **not** this component — Playwright's role engine resolves
the zone by its `aria-label`, while the three unnamed nodes are `ExtractControls`' `DockControl`s,
which carry `title` only and are missed by the capture script's name test
(`visual/capture.mjs:102-105` checks `aria-label || aria-labelledby || textContent`, never `title`).
The zone measures 462×180 empty / 462×320 developed — neither a small tap target nor a nameless
button.

---

## Strongest defect of this pass

**P2-2.** Pass 1 owns the strongest statement about the component's *input*; this is the strongest
about its *output*. A component whose stated contract is *"the specimen never lies"* (`:3`) shows
**9.32 %** of a portrait photograph, centred and silently guillotined, next to a palette computed
from all of it and a readout claiming "36 % of the image" — three elements on one plate describing
three different pictures. The declaration meant to prevent exactly this, `object-contain`, is present
and inert, because `h-full` against an indefinite parent resolves to `auto` and the box was never the
size anyone believed it was.

---

## Files

- Subject: `/Users/mkbabb/Programming/value.js/demo/workbenches/extract/ImageDropZone.vue`
- Consumer: `/Users/mkbabb/Programming/value.js/demo/workbenches/extract/ExtractWorkbench.vue`
- Chain: `.../extract/composables/useExtractSession.ts`, `.../extract/composables/useImageQuantize.ts`
- Gate: `/Users/mkbabb/Programming/value.js/e2e/smoke/walk.spec.ts:78-81`
- Pass 1, preserved: `challenge-C-implementation.pass1-2026-07-28-prior.md`
- Evidence images: `evidence-tall-image-crop.png` (P2-2), `evidence-broken-image-state.png` (P2-1)
- Probes + fixtures: `pass2-probe/` (`dz-picker.mjs`, `dz-probe2/3/5/6/8/9.mjs`, `mkfiles.mjs`,
  `portrait.png`, `landscape.png`, `broken.png`)

**No source edits were made. This formation lands none.**
