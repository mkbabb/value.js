# CHALLENGE-D (round 2) — `GradientCodeEditor.vue` · the design is flawed

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, 1M context) — the tier this seat was
explicitly spawned with. Declared, observed, not inherited.

---

## 0. Seat, subject, and relationship to round 1

| | |
|---|---|
| **Subject** | `demo/workbenches/gradient/GradientVisualizer/GradientCodeEditor.vue` (117 lines) |
| **Mount site** | `demo/workbenches/gradient/GradientVisualizer/GradientVisualizer.vue:258–262` (the `CSS` region) |
| **Route** | `/#/gradient` — the only route it appears on |
| **HEAD** | `c654824e`, branch `tranche-u` |
| **Canon read** | `docs/tranches/V/PROPORTION-AUDIT.md`, `VISUAL-CONSTITUTION.md`, `PALETTE-CONTRACT.md` |
| **Frames read (vision)** | `audit/visual/shots/safari-{desktop,mobile}-{light,dark}/gradient.png`, `shots/forced-colors-desktop/gradient.png`, `owner-marked/OM-13-easing-readout-not-glass-input.png` |
| **Live probes** | Playwright/Chromium read-only against `http://localhost:9000/#/gradient`, 1512×?, 1440×900 and 390×844; every number below is pasted tool output |
| **Writes** | only under `docs/tranches/V/megatranche/audit/components/wb-gradient-codeeditor/`. No `src/`, `demo/`, `api/`, `test/`, `e2e/`, `vnext/`, `dev.sh` or `INBOX.md` touched |

**A round-1 D seat already ran this component.** Its report is preserved verbatim at
`challenge-D-design-r1-2026-07-28.md` (D-1 … D-14). This round-2 report is **additive**: §2 carries
six defects round 1 did not find, §3 states which round-1 findings I independently re-measured and
confirmed at HEAD, and where my measurement is the stronger witness I say so. I do not restate
round 1's evidence as my own.

**Round-1 findings I could not test and therefore neither confirm nor dispute:** D-3's
`visiblePx: 0` verdict clipping (my probes ran at a viewport where the CSS section was scrolled into
view), D-2's Pillow pixel-contrast numbers, D-14's error-screen ink.

---

## 1. Verdict

**DEFECTIVE.** Round 1's two BLOCKERs stand at HEAD — I re-reproduced the MT-F001 panel destruction
deterministically at two viewports, and re-measured the dead `glass-wash` plate with a control
experiment. On top of them this round adds **one MAJOR that neither round found and that is visible
in the default state with no interaction at all**: the section labelled `CSS` displays a
**74-character** artifact and its Copy control writes a **2 115-character, 33-stop** one.

The design's root error is a single mistaken premise repeated at four seams: *this component treats
declarations as outcomes.* It declares `glass-wash` and gets no plate. It declares
`focus-visible:ring-ring/40` and gets opaque black. It declares "the user's text is never destroyed"
and destroys it. It declares a section named `CSS` and copies a different CSS. Every one of those is
a place where the design was written down and never confronted with its own render.

---

## 2. New findings — not in round 1

### D2-1 · **MAJOR** · The `CSS` section shows one artifact and copies another (74 chars vs 2 115)

One `<h3>CSS</h3>` and one Copy control (`GradientVisualizer.vue:252–257`) sit immediately above this
editor. They do not refer to the same string. Measured live, **default state, no interaction, identity
(`linear`) easing**:

```
editorShows_simpleCSS:
  "linear-gradient(90deg, oklch(0.75 0.15 145) 0%, oklch(0.65 0.18 265) 100%)"

copyButtonCopies_coalescedCSS:
  "linear-gradient(90deg, oklch(75% 0.15 145deg) 0.00%,
    oklch(74.687500147402% 0.150937499558 148.749998231174deg) 3.13%,
    oklch(74.374999138455% 0.151875002585 152.500010338541deg) 6.25%,
    … 29 more stops …
    oklch(65% 0.18 265deg) 100.00%)"

identical: false
simpleLen: 74        coalescedLen: 2115        coalescedStopCount: 33
```

**Mechanism.** The editor is bound to `simpleCSS` (`GradientVisualizer.vue:258–262`); Copy writes
`coalescedCSS` (`:127–129`), as does the render tile (`:223–225`).
`useGradientCSS.ts:325–326` computes them from two different serializers, and
`serializeCoalescedGradient` (`useGradientCSS.ts:281–305`) **always** resamples through
`sampleCoalescedStops` — so the two disagree for every gradient with ≥ 2 stops, *including* one whose
every interval is the identity easing, where they are semantically the same gradient.

**Why this is a design defect and not an implementation slip.** Three distinct jobs — *readout of
record*, *editable buffer*, *render-faithful export* — were collapsed into one region with one noun
and one action, and the substitution is silent: there is no label, no toggle, no disclosure, no
count. A user who reads the editor, presses the adjacent Copy, and pastes into their stylesheet gets
2 115 characters they never saw. `PROPORTION-AUDIT.md §5.10` — *"Readout and editing are separate
jobs"* — is breached in a way §5.10 did not even anticipate: a third job is hiding inside the action
slot. `VISUAL-CONSTITUTION.md §5` — *"Commit uses one glass-ui action set. Secondary verbs disclose
within that same instrument"* — a silent substitution is the opposite of disclosure.

Two aggravations: the coalesced string carries **12-decimal floats** (`74.687500147402%`), which is
the owner's OM-14 value-formatting mark landing on the one artifact the user actually takes away; and
33 stops for an identity easing is pure noise — the resampler does not check whether coalescing
changes anything.

**Cure (gestalt).** The visible buffer is the artifact of record and Copy copies **what is shown**.
If a baked export is genuinely wanted it is a *second, named* artifact in the same action set
("Copy baked CSS · 33 stops"), and the serializer returns `simpleCSS` unchanged when every interval
is linear.

---

### D2-2 · **MAJOR** · The focus ring reproduces *both* U-F25 deaths the house recipe was written to cure

Round 1's D-11 correctly flags "box-shadow-only, no forced-colors fallback". The forensics are worse
than that, and the repository already documents this exact failure by name.

`demo/styles/focus-ring.css:8–15` — the house recipe, stating its own cause of death:

> *"The U-F25 defect had TWO deaths: (1) an inline `boxShadow` on the control **CLOBBERED**
> Tailwind's `focus-visible:ring-2` box-shadow layer, and (2) the `--ring`/`--color-ring` token it
> reached resolved **EMPTY** — so even an un-clobbered ring painted nothing."*

`GradientCodeEditor.vue:93` ships `outline-none focus-visible:ring-2 focus-visible:ring-ring/40`
*and* an inline `style` transition on `box-shadow` (`:95–97`). Measured on the live element:

```
--color-ring:       ""                                        // death (2): the token IS empty
--tw-ring-shadow:   "0 0 0 calc(2px + 0px) currentcolor"

box-shadow @rest:   oklab(…/0.3) 0 1px 0 0 inset, oklab(…/0.18) -1px 0 0 0 inset,
                    color(srgb …/0.06) 0 -1px 0 0 inset, color(srgb …/0.04) 1px 0 0 0 inset,
                    color(srgb …/0.06) 0 2px 8px 0, rgba(255,255,255,0.25) 0 0.5px 0 0 inset
                    // six layers: the glass rim + drop

box-shadow @focus:  rgba(0,0,0,0) 0 0 0 0, rgba(0,0,0,0) 0 0 0 0, rgba(0,0,0,0) 0 0 0 0,
                    rgb(28, 25, 23) 0px 0px 0px 2px, rgba(0,0,0,0) 0 0 0 0

outline @focus:     "rgb(0, 95, 204) none 1px"                 // `none` — nothing paints
focusEqualsBlur:    false      activeIsEditor: true
```

Three measured defects in one reading:

1. **The declared colour does not render.** `ring-ring/40` needs `--color-ring`; it is empty, so the
   utility falls through to `currentcolor` — **opaque ink `rgb(28,25,23)` at 100 %**, not a 40 %-alpha
   ring. The design that was written and the design that ships are different designs.
2. **The material is destroyed by focusing.** The six-layer glass shadow stack is replaced by
   transparent zeros plus one flat ring. The surface's material *disappears the instant the user
   touches it* — and because `:95–97` transitions `box-shadow` at `--duration-normal` (measured
   `0.3s`), it does so as a 300 ms dissolve. Death (1), polarity reversed: here the ring clobbers the
   material.
3. **Forced colors leaves no indicator at all.** `focus-ring.css:31` requires *"a forced-colors
   `outline` fallback (box-shadow is stripped in WHCM)"*. There is none, and `outline-none` removes
   the UA default. `VISUAL-CONSTITUTION.md §4.1`: *"Focus remains visibly distinct from selection in
   both schemes, **forced colors** and reduced transparency."*

The tracked `shots/forced-colors-desktop/gradient.png` cannot adjudicate this: I read it and it is
not monochrome — WebKit did not honour the emulation — so the matrix contains **no forced-colors
truth for this route at all**.

**Cure.** Compose the house recipe's three-line form (`focus-ring.css:29–31`,
`--focus-ring-inner`/`--focus-ring-outer`) *with* the material shadow, plus the forced-colors
`outline`. Better: delete the hand-rolled focus story together with the hand-rolled field (D-7 r1 /
D2-6 below) — the producer's field control owns it.

---

### D2-3 · **MAJOR** · `word-break: break-all` splits the literal `145` into `14` / `5` — measured, in the default state

Round 1's D-9 argues this as a MINOR. It is measurable and it is worse than argued. Per-character
`Range` rects over the live default buffer (viewport 1512, editor 462 px wide):

```
{ "width": 462, "lineCount": 2,
  "lines": [ "linear-gradient(90deg, oklch(0.75 0.15 14",
             "5) 0%, oklch(0.65 0.18 265) 100%)" ] }
```

The OKLCH hue `145` is broken across the line as `14` / `5`. A reader scanning line 1 sees the value
`14`. The `.hljs-number` crayon (measured `oklch(0.49 0.12 78)`) is painted across **both**
fragments, so the syntax colouring actively affirms the false reading — the one mechanism that exists
to make code legible is recruited into the misreading.

This is not an edge case: it is the **shipped default content at a normal desktop width**, before the
user does anything. And the plate never widens — measured `rect.width` is **324 px at both 1440×900
and 390×844**, so at the panel's own narrower widths every `oklch(…)` is a break candidate at every
glyph.

`word-break: break-all` is the CJK / opaque-URL tool. CSS is a token language whose atoms are
identifiers and numeric literals; breaking inside one destroys meaning. **Cure:**
`word-break: normal; overflow-wrap: anywhere` (breaks only where no other opportunity exists), or an
honest horizontal scroll. A code specimen never breaks inside a literal.

---

### D2-4 · **MINOR** · Ad-hoc, mistimed motion: 0.3 s where the producer's own field uses 0.2 s

`:95–97` authors the state transition inline:

```html
:style="{ transition: `border-color var(--duration-normal) var(--ease-standard),
                       box-shadow  var(--duration-normal) var(--ease-standard)` }"
```

Measured tokens: `--duration-normal: 0.3s`, `--duration-fast: 0.2s`. glass-ui's own field control
uses the **fast** rung for the identical border/shadow state change — from the shipped
`node_modules/@mkbabb/glass-ui/dist/glass-ui.css`:

```css
.input-pill { … transition: background-color var(--duration-fast) var(--ease-standard),
                            border-color var(--duration-fast) var(--ease-standard),
                            box-shadow var(--duration… }
```

So the editor animates a colour/boundary change at **1.5× the design system's field timing**.
`VISUAL-CONSTITUTION.md §6`: *"Color/opacity effects use the corresponding short effect curve."*

Placement is wrong too: an inline `style` is the highest-specificity authoring surface in the
document, spent here on a declarative token pair that belongs in a class — and it is the precise
shape `focus-ring.css:14–15` warns against (*"the cascade half of the cure — hoisting the material
shadow off the inline style so the ring COMPOSES with it"*), which is how D2-2 (2) happens.

**Reduced motion is not this component's doing.** It survives only because
`demo/styles/animations.css:184–192` blanket-sets `transition-duration: 0.01ms !important` on `*`.
The component contributes no `prefers-reduced-motion` handling of its own. Nothing layout-forcing is
animated (`border-color`, `box-shadow` only) — that part is sound.

---

### D2-5 · **MINOR** · A CSS-string surface with no LTR isolation

Measured with `dir="rtl"` set on `<html>` (removed immediately after):

```
ltr: { direction: "ltr", textAlign: "start", dirAttr: null }
rtl: { direction: "rtl", textAlign: "start",
       boxLeft: 790, boxRight: 1252, firstCharLeft: 821 }
```

The element carries **no `dir` attribute and no `unicode-bidi` isolation**, so the buffer's paragraph
direction flips with the document and the CSS punctuation (`(` `)` `,` `%`) becomes subject to bidi
reordering.

`VISUAL-CONSTITUTION.md §6.1`: *"CSS strings, hex, slugs, IDs and provenance | render in
**LTR-isolated** spans inside RTL prose."* §5.2's terminal row: *"CSS direction keywords, physical
axes, code, hex, slug, ID | preserve the declared physical/domain meaning … inside an **LTR-isolated
value**."* Nothing above the component supplies it either — `demo/color-picker/index.html:11`
hard-codes `dir="ltr"` at the document, annotated as *"RTL mechanical readiness"*, which is exactly
the readiness this component would break.

---

### D2-6 · **MINOR** · The consumer overrides the producer's own border — the per-instance override, measured

Round 1's D-7 establishes the hand-rolled-field family (MT-F037's shape). One concrete override
inside it is worth naming on its own because it is owner edict 5 in its purest form.

`.glass-wash` declares its own border (from the shipped `glass-ui.css`):
`.glass-wash { … --glass-border-rung: var(--glass-border-wash); border: 1px solid var(--glass-border-acce…`

`:93–94` adds Tailwind `border` plus `border-border/40` / `border-destructive` on top. Measured
winner on the live element:

```
edBorderColor:        "oklab(0.779404 0.0118501 0.0342689 / 0.4)"   // the consumer's border-border/40
--glass-border-wash:  "color-mix(in srgb, light-dark(hsl(24 10% 10%), hsl(30 14% 90%)) 4%, transparent)"
```

The producer's border rung never renders at this site. Owner edict 5: *"Style changes at
shadcn/glass root component level, not per-instance overrides."*

**Glass-forward ask (BJ/BH relay), consolidated with r1 D-7 and owner mark OM-13/MT-F037.** I
censused the installed dist as the mark instructs:

```
$ ls node_modules/@mkbabb/glass-ui@7.0.0/dist | grep -iE "input|field|text|form"
Input-9BlLluik.js
field-control.css_vue_type_style_index_0_src_true_lang-CeLay9Tk.js
forms.d.ts / forms.js
fourier-field.d.ts / labeled-field.d.ts / number-field.d.ts
useTextHighlight-mfwNIC1f.js

$ cat dist/forms.d.ts
export * from "./components/input";
export * from "./components/textarea";
export * from "./components/combobox";
export { useUserInvalidAria, … } from "./composables/dom/useUserInvalidAria";
export type { ControlSize } from "./components/_shared";
```

`TextareaProps` (`dist/components/textarea/types.d.ts`) already carries `invalid`, `placeholder`,
`readonly`, `disabled`, `size: ControlSize`, `rows`, `resize` — every state this component gets
wrong is a prop on the producer's primitive. What glass-ui does **not** have is a code-bearing
field: no highlight variant, no icon-trailing code row; `useTextHighlight` is a motion/reveal
composable (`dist/composables/motion/reveal/useTextHighlight.d.ts`), not a syntax surface. Per the
owner mark's own rule that is a **marked glass-forward ask, never a local restyle**:

> glass-ui `forms` gains a code-bearing field **inside the existing `Textarea`/`Input` family** —
> reusing those component-type names, not inventing one — with (a) `invalid` wired through
> `useUserInvalidAria`, (b) a trailing action slot for in-row icon controls (the OM-13 shape: copy +
> tune), (c) an opt-in externally-supplied highlighted view where the **plate** belongs to the field
> and the **ink** to the consumer's theme, and (d) the house dual-contrast focus ring with its
> forced-colors outline. Radius/height/material resolve from `ControlSize`, which collapses the
> three-radius incoherence below into one rung.

---

## 3. Round-1 findings independently re-measured at HEAD

| r1 ID | Claim | My independent measurement | Status |
|---|---|---|---|
| **D-1** | Typing `oklch()` destroys the workbench | see below — reproduced at 1440×900 **and** 390×844 | **CONFIRMED** |
| **D-2** | The specimen well paints nothing | control experiment below | **CONFIRMED**, with the cascade cause isolated |
| **D-4** | Highlighting is dead while the editor is used | inserting into the `.hljs-number` span leaves `145abc` rendered `oklch(0.49 0.12 78)`; `onInput` (`:59–62`) never calls `render`; `:72` re-renders on blur **only** `if (!hasError.value)`, so a rejected buffer keeps wrong colours indefinitely | **CONFIRMED + extended** |
| **D-6** | The empty state was never designed | exact state below | **CONFIRMED** |
| **D-3** (partial) | Failure signal is colour-only / unassociated | `aria-invalid: "true"`, `aria-describedby: null`, `aria-errormessage: null`, `verdictRole: "status"` | **CONFIRMED** (I could not reproduce the `visiblePx: 0` clipping; my probes had the section scrolled into view) |
| **D-8** | Off-grammar geometry | `border-radius: 8px` measured (`--radius-lg: 0.5rem`) against `--radius-card: 1rem`; `min-h-[5rem] max-h-[12rem]` are magic reaches | **CONFIRMED** |
| **D-11** | Focus is box-shadow-only, no WHCM fallback | superseded by **D2-2**, which adds the empty-token and material-destruction halves | **CONFIRMED + superseded** |

### 3.1 D-1 re-reproduction — the blocker, at two viewports

`gradientParse.ts:92–94` is the unguarded seam:

```ts
function isColorToken(token: string): boolean {
    return parseCssColor(token).ok;
}
```

Path: `GradientCodeEditor.vue:55–62` (`debounce`, 500 ms, `demo/shared/utils.ts:29–34`) →
`GradientVisualizer.vue:102–108` → `useGradientModel.ts:158–160` → `gradientParse.ts:191` → `:92`.
The throw is raised inside a detached `setTimeout` callback, so it can never reach the verdict path
that `:16–25` designs; it reaches the pane error boundary instead.

Type `linear-gradient(90deg, oklch(), blue)`, wait out the debounce:

```
// 1440×900
{ "hasEd": false,
  "bodyText": "→\nTools\nadmin\n@mbabb\ndev misconfigured — run `npm run dev`\n\nThis panel hit an
               unexpected error.\n\nCannot read properties of undefined (reading 'replace')\n\nTry again" }

// 390×844
{ "vw": 390, "rectBefore": {"w":324,"h":94}, "hasEdAfter": false,
  "bodyAfter": "→\nGradient\nPalettes\n\nThis panel hit an unexpected error.\n\nCannot read
                properties of undefined (reading 'replace')\n\nTry again" }
```

Also reached from a keystroke *sequence*: after `linear-gradient(90deg, oklch()  , blue)` the element
detached mid-probe — `getComputedStyle(ed).borderColor` returned `""` and every later fragment I
typed went into a dead node with no feedback whatsoever.

**The user loses the whole workbench and their authored text**, against the component's own written
contract at `:38–40` (*"A failed parse keeps the user's text verbatim alongside the verdict — WIP is
never destroyed"*) and `PROPORTION-AUDIT.md` PR-08 (*"Pending/failure/export/recovery truth only
transient → **ADD-AFFORDANCE**: Persistent entity status/recovery"*).

**Design-level cure, not a `try/catch`.** A catch at the call site manufactures a mystery verdict.
The editor needs one explicit machine — `empty | pending | applied | rejected(reason) |
oracle-failed(diagnostic)` — where `gradientParse` is the **only** place the library oracle is
touched, behind an adapter that is total by construction (the ruled parser-band candidate already
is). The `oracle-failed` arm is a designed state with its own copy and it never destroys the buffer.

### 3.2 D-2 re-measurement — a control experiment, and the cascade cause

Measured on the live editor:

```
edBg: "rgba(0, 0, 0, 0)"      edBackdrop: "none"
```

**Control** — a bare `<div class="glass-wash">` injected as a sibling in the *same* container, same
frame, removed immediately after:

```
control: { bg: "oklab(0.881504 0.0054135 0.0126841 / 0.328)", backdrop: "none",
           borderColor: "oklab(0.216128 0.00350075 0.00518669 / 0.04)",
           borderWidth: "1px", radius: "0px" }
```

The sibling gets a plate; the editor does not. **Cause, isolated:** the co-applied `.hljs` class
declares `background: transparent` at `demo/styles/hljs.css:56–60` **unlayered**, and unlayered
declarations beat every cascade layer — glass-ui's `.glass-wash { background: var(--glass-plate-tinted) }`
lives in `@layer components`. The ink class silently nulls the material class.

Two consequences beyond r1's contrast numbers:

- `hljs.css:13–15` states the intended division of labour — *"INK ONLY. The theme paints no
  background — the surface belongs to the plate (Markdown.vue's `pre`, **the editor's glass wash**)"*.
  The shipped cascade inverts it: the ink class is the one that wins the background.
- `hljs.css:21–33` re-guarded three token colours **for the rung-2 well** (`--well-bg` = card 92 % +
  fg 8 %) and reports *"comment 5.33/5.04, string 4.99, number 4.91, keyword 4.91, entity/title 5.41
  (light)"*. Measured paint chain behind this editor: transparent → transparent → transparent →
  `glass-resting card` at `oklab(0.928268 0.00554796 0.0132111 / 0.664)` over the live aurora field.
  **The certified ratios were measured on a ground this site does not have**, and the actual ground
  varies with the user's seed colour — so no contrast figure is guaranteed here at all. That is a
  governance defect, not just a number: the guard cannot be maintained because the surface is not
  fixed.

`VISUAL-CONSTITUTION.md §2` names the tier this surface is supposed to be — *"Specimen well | image,
curve, palette or **code artifact** | opaque/quiet neutral stage"* — and §2 continues *"Glass earns
its blur by revealing live content; otherwise it is a neutral well."* Measured `backdrop-filter:
none`. It earns nothing and it is not a well.

### 3.3 D-6 re-measurement — empty renders as invalid

Clear the field (select-all + delete — an ordinary "start over"):

```
emptyState: { verdict: "not a <type>-gradient(…) function",
              ariaInvalid: "true",
              borderColor: "oklab(0.582853 0.184163 0.0969849 / 0.941033)",   // destructive
              height: 80, innerHTML: "",
              ariaDescribedby: null, ariaErrormessage: null }
```

An 80 px blank box with a full-strength destructive border and an error sentence, for a user who has
made no error, with `innerHTML` literally `""` — no placeholder, no invitation, no recovery of the
last applied value. `empty` was never enumerated; it falls through to `rejected` because
`parseGradientCSS("")` rejects at `gradientParse.ts:194–197`. The codebase already knows empty is its
own species — `VISUAL-CONSTITUTION.md §7` requires *"A true empty invitation content-hugs its
text/action"* for the palette field — and this surface does not.

### 3.4 A coverage fact worth recording

Reading the four tracked route captures: desktop light **and** dark show the `CSS` heading and the
editor's **first text line only**, clipped by the frame's bottom edge; both mobile captures stop
inside the Easing section and never reach the CSS region. `REPORT.json`'s `/#/gradient` row is clean
(`overflowX 0`, `main 1`, 0 page errors, 0 console errors) and its six small tap targets and one
nameless button belong to other components. **The route matrix contributes zero pixels of this
component's body, error, focus, empty or overflow states** — which is exactly how a component this
defective passes a route-level audit, and why every claim above is a live probe.

---

## 4. State-coverage ledger (consolidated, r1 + r2)

| State | Designed? | Evidence |
|---|---|---|
| populated (default) | **partial** | renders, but splits `145` → `14`/`5` (D2-3) |
| empty | **NO** | rendered as invalid; no placeholder (r1 D-6 / §3.3) |
| loading / pending | **NO** | no busy state; stale verdict shown as current through the 500 ms debounce (r1 D-5) |
| error — modelled rejection | **yes** | destructive border + one-line Fira verdict (`:107–114`) — the one well-designed state |
| error — oracle throw | **NO** | panel destroyed, text lost (r1 D-1 / §3.1) |
| disabled | **NO** | inexpressible on `contenteditable`; `TextareaProps.disabled` exists |
| readonly | **NO** | inexpressible; `TextareaProps.readonly` exists |
| focused | **broken** | ring is opaque `currentcolor`, material stack destroyed (D2-2) |
| hovered | **NO** | no hover treatment on an editable surface |
| active / pressed | n/a | not a button |
| selected | n/a | — |
| dragging (text drop) | **NO** | fires `input`, otherwise unhandled |
| overflowing (> 12 rem) | **NO** | `overflow-y-auto scrollbar-thin` with no edge/affordance/announcement; the verdict `<p>` sits **outside** the scroll box, so a long buffer scrolls independently of its own error. Measured at rest `scrollHeight 92 === clientHeight 92` — never exercised |
| truncated | n/a | wraps instead — badly (D2-3) |
| RTL | **NO** | no `dir`, no isolation; direction flips with the document (D2-5) |
| reduced-motion | **inherited only** | global `!important` guard at `animations.css:184–192`; nothing local (D2-4) |
| forced-colors | **NO** | `outline-none` + box-shadow-only ring ⇒ no focus indicator; matrix has no forced-colors truth for this route (D2-2) |
| zoom 200 % | **untested** | not covered by the matrix (§3.4); inline size measured fixed at 324 px across a 3.7× viewport range |
| light / dark | **partial** | ink flips via `.dark`; the ground is nulled in **both** (§3.2) |

**11 of 19 states unhandled or broken.** The two states a code editor spends most of its life in —
*empty* and *mid-token* — are the two handled worst.

---

## 5. Proportion and seat law

- **`PROPORTION-AUDIT.md §5.8`** — *"Real rendered relation wins over token intent … token presence
  alone cannot close a row."* `glass-wash` is present in the class list and absent from the render
  (§3.2); `ring-ring/40` is present in the class list and renders as opaque ink (D2-2). This
  component is a two-instance proof of exactly the failure §5.8 exists to forbid.
- **`PROPORTION-AUDIT.md §5.10`** — *"Readout and editing are separate jobs."* Breached in a new
  way: readout, editing **and export** occupy one region with one noun and one action (D2-1).
- **`PROPORTION-AUDIT.md §5.13` / `VISUAL-CONSTITUTION.md §4`** — type role matrix: *"value, code, or
  provenance | `text-mono-small` … | Fira Code"*. **SATISFIED** — measured
  `font-family: "Fira Code", "Fira Code Fallback", "Fira Mono", monospace`, `font-size: 14px`,
  `line-height: 22.75px`. The `:104–106` comment correctly refuses the uppercase `mono-caption`
  eyebrow for case-sensitive code. This is the component's best decision and it should survive any
  rework.
- **`PROPORTION-AUDIT.md` PR-05 / `VISUAL-CONSTITUTION.md §4.2`** — the P122 workbench boundary
  inventory is `[]` / `reserve="none"`. A *field* border is not a chassis divider, so the hairline is
  admissible — but it is authored as a per-instance override of the producer's border rather than
  resolved from a field rung (D2-6).
- **`VISUAL-CONSTITUTION.md §3.1`, Gradient row** — *"spectral meniscus preview | stop and **code
  inspector** | preview, stops, **code/action** | `InstrumentChassis`; no nested stage Card."* The
  code inspector is a *named, first-class third* of this route's declared argument. It is currently
  the third with no material, no empty state, no honest export and a crash path — and, per §3.4, the
  third nobody has ever photographed.
- **`VISUAL-CONSTITUTION.md §2`, three code/value surfaces in one column** — editor `rounded-lg`
  (8 px measured) + nulled `glass-wash` + `border-border/40`; easing readout
  (`GradientEasingEditor.vue:176`) `rounded-md` + `bg-well` + no border; render tile
  (`GradientVisualizer.vue:223`) `rounded-card` (16 px measured, `--radius-card: 1rem`) +
  `border-card-edge`. Three radii, three grounds, three border idioms, for three specimens of one
  family inside one 462 px optical bench — the owner has already marked this twice on this route
  (`OM-4-easing-radius-incoherence.png`, `OM-13-easing-readout-not-glass-input.png`); the code editor
  is the third instance and the only one that also *loses* its ground. Affordance placement disagrees
  too: the easing readout carries copy/tune **in-row**; this editor's Copy is hoisted to the section
  header. Same species, two grammars.
- **`PALETTE-CONTRACT.md`** — read in full. No palette entity, Card tuple, `aria-pressed` seat or
  WatercolorDot is involved; **no clause binds this component.** Recorded so the negative is proved
  rather than assumed.

---

## 6. What the design gets right (the negative, proved)

1. **The verdict *idea*** is right and rare: model-or-reject with a one-line reason, no silent
   partial apply, the user's text never rewritten mid-thought (`:34–40`, `gradientParse.ts` module
   header). The failure is that a total contract was built on a partial oracle — not that the
   contract is wrong. It should be kept and completed, not replaced.
2. **The focus truce** (`:75–79`) genuinely solves caret theft: model→editor writes gated on
   `focused` is the correct architecture for a controlled `contenteditable`.
3. **Type jurisdiction is correct and defended in prose** — measured Fira Code 14 px, with an
   explicit, correct refusal of the uppercase caption token (`:104–106`).
4. **Vue 3.5 idiom is correct** — `useTemplateRef` (`:31`), reactive props destructure with default
   (`:16`), typed `defineEmits` (`:27–29`). `verbatimModuleSyntax` respected: all four imports are
   runtime values, so no `import type` is owed. No god module (117 lines, one job), no legacy shim,
   no dual path, no back-compat alias.
5. **Animations were tokenized, not deleted** — `--duration-normal` / `--ease-standard`. The rung and
   the placement are wrong (D2-4) but nothing was destroyed, and no layout-forcing property is
   animated.
6. **The dead theme-swap really was killed** — `:10–14`'s claim checks out: no `#hljs-gradient-theme`
   head injection, no JS theme store, one static CSS source.
7. **Route-level hygiene holds** — this component contributes no horizontal overflow, no console
   error and no page error to `/#/gradient` (`REPORT.json`).

---

## 7. Ranked cure order

1. **r1 D-1 / §3.1** — total parse port + a designed `oracle-failed` state. Nothing else on this
   surface is worth doing while a keystroke can delete the workbench.
2. **D2-6 / r1 D-7** — raise the glass-forward ask for a code-bearing field in glass-ui `forms`. It
   subsumes §3.2 (plate), D2-2 (focus), §3.3 (empty), r1 D-3 (associated error), r1 D-8 (radius) and
   the three-radius incoherence into producer-owned rungs.
3. **D2-1** — Copy copies what is shown; baked export becomes a named second artifact.
4. **D2-3** — stop breaking literals.
5. **r1 D-4 / §3 table** — overlay idiom, so highlighting is live and honest instead of absent.
6. **D2-4, D2-5**, then the remainder in file order.

---

## 8. Register

| ID | Severity | Defect | Mechanism family |
|---|---|---|---|
| r1 D-1 / §3.1 | **BLOCKER** | `oklch()` mid-typing destroys the workbench and the user's text | partial oracle behind a total contract |
| r1 D-2 / §3.2 | **BLOCKER** | declared `glass-wash` plate paints nothing; certified contrast guard does not apply here | declaration ≠ render (cascade) |
| **D2-1** | **MAJOR** | `CSS` section shows 74 chars, Copy writes 2 115 chars / 33 stops | three jobs in one region |
| **D2-2** | **MAJOR** | focus ring is opaque `currentcolor`, destroys the material stack, absent in WHCM | declaration ≠ render (empty token) + inline-style clobber |
| **D2-3** | **MAJOR** | `break-all` splits `145` into `14`/`5` in the default state | prose typography applied to a token language |
| r1 D-3 | MAJOR | verdict born off-screen; error unassociated (`aria-errormessage: null`) | failure state placed outside the field anatomy |
| r1 D-4 | MAJOR | highlighting dead while focused; never restored after a rejection | trade resolved by deleting the feature |
| r1 D-5 | MAJOR | no pending state; error lies ≥ 480 ms | state machine missing an arm |
| r1 D-6 / §3.3 | MAJOR | empty rendered as invalid | state never enumerated |
| r1 D-7 / **D2-6** | MAJOR | hand-rolled field; producer border overridden per-instance | design-system boundary |
| r1 D-8 | MINOR | `rounded-lg` + two magic reaches; three radii in one column | off-grammar geometry |
| **D2-4** | MINOR | 0.3 s where the producer's field uses 0.2 s; inline-style motion | ad-hoc motion |
| **D2-5** | MINOR | no LTR isolation on a CSS-string surface | direction jurisdiction |
| r1 D-10 | MINOR | copy affordance outside the field | affordance placement |
| r1 D-13 | INFO | `innerHTML` sink in the highlight fallback | (also: `innerHTML` assignment at `:52` is not a UA editing transaction, so the blur re-render should break native undo — **hypothesis**, mechanism certain, key sequence not driven) |

**No source edits land from this formation.** This file and
`challenge-D-design-r1-2026-07-28.md` are the whole deliverable.
