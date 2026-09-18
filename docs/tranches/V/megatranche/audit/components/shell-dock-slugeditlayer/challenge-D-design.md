# CHALLENGE-D — `demo/shell/dock/layers/SlugEditLayer.vue` — the design is wrong

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, 1M context), the tier this seat was
explicitly spawned with. Declared, not inherited.

---

## Verdict

**DEFECTIVE.** Three BLOCKERs, five MAJORs, four MINORs.

The premise handed to this seat was that the design is wrong. It is worse than wrong: **this
component was never designed at all.** It is a fragment of an older, better surface
(`PaletteSlugBar.vue`) transplanted into the dock with its field primitive, its error region, its
state-bearing accessible names and its content-fitted placeholder left behind. Every one of the
defects below is a thing the donor surface got right and the transplant dropped.

The single strongest defect: **a user who types a slug and presses the arrow gets absolutely
nothing** — no error, no confirmation, no pending state. The layer closes, the "Login" button is
still there, and no copy anywhere in the document says why. Reproduced live below.

---

## Method and what decided each claim

Every geometric and stylistic number below is a **live measurement** against the running dev
server at `http://localhost:9000`, driven by Playwright WebKit (matching the tranche's Safari
capture matrix) and Chromium (for tab order, `:focus-visible`, forced-colors and CSS zoom, which
WebKit emulates poorly or not at all). Probe scripts and captured frames:

```
/private/tmp/claude-504/.../scratchpad/probe-slug.mjs      geometry + a11y + long-value, 5 arms
/private/tmp/claude-504/.../scratchpad/probe2.mjs          error path, spinner, tab, escape, mobile
/private/tmp/claude-504/.../scratchpad/slug-probe3.mjs     chromium focus/forced-colors/zoom/RTL
/private/tmp/claude-504/.../scratchpad/slug-probe5.mjs     focus handoff, ring pixel proof
/private/tmp/claude-504/.../scratchpad/slug-probe6.mjs     idle auto-collapse
/private/tmp/claude-504/.../scratchpad/slug-probe7.mjs     320px aperture hit-test
/private/tmp/claude-504/.../scratchpad/shots/*.png         28 frames, all four schemes/arms
```

The tranche's own visual audit (`docs/tranches/V/megatranche/audit/visual/REPORT.json`) never
captures this component in its **active** state — it is inert on every route in that run, which is
why the shots under `audit/visual/shots/` show only the main dock layer. The rows that mention it
(`{"w":160,"h":23,"tag":"input","label":""}`, three 22×22 buttons) are the *inert* layer's
geometry, leaking through the tap-target probe's nonzero-rect filter
(`audit/visual/capture.mjs:83-98`). I therefore drove the layer open by hand on every arm. This
matches finding L-10 of the sibling library seat.

Canon read in full before judging: `docs/tranches/V/VISUAL-CONSTITUTION.md`,
`docs/tranches/V/PROPORTION-AUDIT.md`, `docs/tranches/V/PALETTE-CONTRACT.md`.

---

## Visual truth first

### Desktop 1440 × 900, light — `shots/desktop-light-slug-active.png`

The dock reads, verbatim:

```
→]  enter slug or to  →  │  ↻  ✕
```

Three things are wrong in that one line and all three are visible without a ruler.

1. **The label is cut off mid-word.** The placeholder is `enter slug or token...`
   (`SlugEditLayer.vue:84`). What renders is `enter slug or to`. The placeholder is this field's
   *only* label — there is no `<label>`, no `aria-label`, no `aria-labelledby`, no `id`
   (measured: `{"ariaLabel":null,"id":"","hasLabelEl":false,"labelledBy":null}`). So the sole
   naming affordance is truncated in every arm tested.

2. **There is no field.** No border, no fill, no underline, no focus ring. Measured:
   `border-width: 0px`, `background-color: rgba(0,0,0,0)`, `outline-style: none`,
   `box-shadow: none`. The user cannot see where the input begins or ends; the placeholder floats
   in the dock as if it were a label for the arrow next to it.

3. **The submit control does not read as a control.** At rest and disabled it is a 14px muted
   glyph at opacity 0.5, inline in the same 6px rhythm as the text run. Optically it belongs to
   the sentence, not to the button set.

### Desktop 1440 × 900, dark — `shots/desktop-dark-slug-active.png`

Identical truncation. Dark mode is not separately broken here — the neutral pole holds and the ink
inverts correctly — but it is not separately *designed* either: nothing in this component varies by
scheme, because nothing in this component is styled at all beyond eight Tailwind utilities.

### Mobile 390 × 844, dark — `shots/mobile-dark-slug-active.png`

`enter slug or toker` — truncated again, at a different point. The pill now spans nearly the whole
width and abuts the status lamp.

### 320 × 720 — `shots/narrow-320-slug-active.png`

The pill ends after the submit arrow and the separator. **The `↻` and `✕` controls are not
rendered inside the visible aperture at all.** See D-4.

### The truncation is arithmetic, not bad luck

Fira Code's advance is `0.6em`. Measured `font-size: 16.4px` desktop → 9.84 px/char;
`w-40` = 10rem = **160px** measured. `enter slug or token...` is 22 characters = **216.5px**. The
field is 56.5px — 5.7 characters — too narrow *for its own placeholder*.

| arm | font-size | px/char | chars that fit | predicted render | measured render |
|---|---|---|---|---|---|
| 1440 desktop | 16.4px | 9.84 | ⌊160/9.84⌋ = 16 | `enter slug or to` | `enter slug or to` ✓ |
| 390 mobile | 14px | 8.40 | ⌊160/8.40⌋ = 19 | `enter slug or toker` | `enter slug or toker` ✓ |

The model predicts the exact clipped string on both arms. `w-40` was chosen without anyone ever
holding it up against the string it has to hold. The donor surface got this right:
`PaletteSlugBar.vue:12` uses `enter slug...` — 13 characters, which fits.

---

## Findings

### D-1 — BLOCKER — the failure state does not exist: a rejected login says nothing, anywhere

**Reproduction (exact, run live):** open `http://localhost:9000/` at 1440×900 → click `Login` →
type `brave-swift-red-fox` → click `Switch to slug` → wait 2.5s.

```
post-submit: {
 "alerts": ["dev misconfigured — run `npm run dev`"],      ← the status lamp, unrelated
 "liveRegions": ["off:92.0%","off:88.8","off:20.0","off:82.7%"],  ← the picker channel readouts
 "errorCopyVisible": [],                                    ← NOTHING
 "slugLayerStillActive": false,                             ← the layer closed
 "inputValue": "",
 "loginButtonStillThere": true                              ← still signed out
}
```

The user is returned to a dock that looks exactly as it did before they started, still signed out,
with no statement of what happened. Four independent breaks stack to produce this:

1. **`slugError` is never rendered.** It is declared (`SlugEditLayer.vue:13`) and written in four
   places (`:49`, `:59`, `:60`, `:61`, `:62`) and appears **zero times** in the template
   (`:75-119`). An error region was never drawn.
2. **The catch block is unreachable.** `pm.onSlugSwitch(...)` at `:54` is not awaited, and
   `useSlugMigration.ts:51-89` catches its own failures internally. Nothing can throw
   synchronously into `:57`.
3. **The real error copy is posted to a component that is not mounted.**
   `useSlugMigration.ts:84-87` routes 409/404/429/other into `slugBarRef.value?.setError(...)`.
   `grep -rn "PaletteSlugBar" demo` returns **no template usage** — the component is exported from
   two barrels and rendered nowhere. `slugBarRef` is permanently `null`; all four branches are
   silent no-ops.
4. **The layer closes before the outcome is known.** `:56` sets `slugEditMode = false`
   synchronously, in the same tick the request is fired. Even if an error region existed, its host
   is gone by the time there is anything to say.

The only component in the repository that renders login-error copy is the dead twin
(`PaletteSlugBar.vue:124-125`: `<p v-if="slugError" class="… text-destructive …">`).

**Canon violated.** `VISUAL-CONSTITUTION.md §4.1`: "Selected, failed, pending, withdrawn and
disabled states are never color-only. Role, accessible name, state/value and associated
**error/status are explicit**." `§5`: "Persistent operation state stays with the entity/workspace.
A transient flourish may celebrate success but never carries the only truth." Here the truth is
not even transient — it is absent. `PROPORTION-AUDIT.md` PR-08 ("Pending/failure/export/recovery
truth only transient → **ADD-AFFORDANCE**, Primary W23") owns this row and it is still open.

The sibling library seat reaches the same conclusion by a different route (L-2); this seat adds
the live reproduction and the constitutional ownership.

**Cure.** Not a patch. The error region, the pending region and the field belong to one owned
composition, and the constitution already says which one — see *The gestalt cure* below. The
minimum honest repair inside the current shape is: `await` the port, keep the layer mounted until
the port resolves, render one `role="status"` region under the field, and delete
`useSlugMigration`'s `slugBarRef` limb entirely so there is exactly one error owner.

---

### D-2 — BLOCKER — the dock collapses out from under the user mid-edit, and eats the input

`Dock.vue:86` defines the dock's open-hold as
`actionBarLayerActive || anyEditActive || isAnyOpen`. **`slugEditMode` is not one of the
drivers.** `Dock.vue:132` sets `:collapse-delay="5000"`. So the 5-second idle timer runs while a
person is reading a truncated placeholder and typing a four-word slug.

**Reproduction:** 1440×900 → `Login` → type `brave-swift-red-fox` → move the pointer away from the
dock → do nothing.

```
t=0ms     {"slugFaceActive":true,  "faceOpacity":"1", "groupW":285, "sealVisible":false}
t=4000ms  {"slugFaceActive":true,  "faceOpacity":"1", "groupW":285, "sealVisible":false}
t=6000ms  {"slugFaceActive":false, "faceOpacity":"0", "groupW":56,  "sealVisible":true}
```

Between 4s and 6s the dock collapses to the 56px wax seal. The face goes `opacity:0` **and
`inert`** (measured on inactive faces: `{"inert":true,"ariaHidden":"true"}`), so focus is expelled
from the field the user was typing in. `Dock.vue:76` then clears `slugEditMode` — the authors knew
the collapse happens and wrote a cleanup for it rather than a hold. Re-opening runs
`onStartSlugEdit()` (`SlugEditLayer.vue:16-23`), whose first statement is
`slugInput.value = ""`. **The typed slug is discarded.**

Desktop only: `:always-expanded="!isDesktop"` (`Dock.vue:132`) exempts mobile — measured, 8s idle
at 390 and 320 leaves the layer active with its value intact.

**Canon violated.** `VISUAL-CONSTITUTION.md §5`: "Tuning is continuous and interruptible" — a
timer that destroys in-progress input is neither. `§7 Shell`: "The dock is its own top band, fully
visible, focusable…". A focusable band that unmounts its focused descendant on a wall-clock timer
is a container that does not know what it contains.

**Cure.** A text-entry layer is a hold. The producer already exposes exactly the right primitive —
`GlassDock`'s ref-counted `keepOpen()/release()` pair, which `Dock.vue:87` already drives. The
predicate at `Dock.vue:86` is missing one disjunct. That is the whole repair, and it is one word
long. That this was never noticed is the finding: **nobody ever sat in front of this component and
typed slowly.**

---

### D-3 — BLOCKER — the field is optically absent, in every state, including focus

Measured on the input, settled, both engines:

| property | value | consequence |
|---|---|---|
| `border-width` | `0px` | no boundary |
| `background-color` | `rgba(0,0,0,0)` | no fill |
| `outline-style` | `none` | UA focus ring suppressed |
| `box-shadow` | `none` | no replacement ring |
| `::before` / `::after` `content` | `none` / `none` | no pseudo-element ring |
| `min-height` | `auto`, padding `0` | height = line-box only: **22.9px** desktop, **19.6px** mobile |
| `:focus-visible` | `true` | the browser *knows* it is focused; nothing paints |

Pixel proof: `shots/input-unfocused.png` and `shots/input-focused.png` are the same 388×80 crop
with focus blurred vs. focused after an 800ms settle. They are visually identical. The webkit
round of the same test returns `{"same":true,"activeIsInput":true}` — the pre-focus and
post-focus computed style snapshots are byte-identical.

For contrast, the *next* control in tab order, `Select color space`, paints a real ring:
`box-shadow: color(srgb 0.6655 0.0001 0.2617 / 0.3) 0 0 0 2px`. The three `DockControl`s in this
component also paint a proper ring (verified by pixel:
`shots/ring-unfocused.png` vs `shots/ring-focused.png`). **The input is the only focusable element
in this layer with no focus affordance at all** — because `outline-none` was hand-written on it
(`SlugEditLayer.vue:85`) with nothing put back.

**Canon violated.** `VISUAL-CONSTITUTION.md §4.1`: "Focus remains visibly distinct from selection
in both schemes, forced colors and reduced transparency." WCAG 2.4.7 (AA) outright.

The height is the other half. `22.9px` and `19.6px` are not chosen numbers — they are
`line-height` with no padding and no `min-height`. The control's size is a typographic accident.
On the 390 arm the computed `font-size` is **14px**; iOS Safari auto-zooms the viewport on focus
for any input under 16px. *(That last consequence is a platform rule, not something I reproduced
on hardware — labelled as such.)*

---

### D-4 — MAJOR — at 320px the escape hatch is rendered outside the aperture

Canon names 320px as a binding observation arm (`VISUAL-CONSTITUTION.md §3.2`,
`PROPORTION-AUDIT.md §2`: "1440px, 390px, 320px, and actual 400% … zoom"). Measured there, layer
active:

```
vw = 320
submit  rect 234.0 … 257.4   centre 245.7  hit → form.flex        (disabled ⇒ pointer-events:none)
regen   rect 284.4 … 307.8   centre 296.1  hit → nav.dock-band    ← the BAND, not the button
cancel  rect 314.8 … 338.1   centre 326.4  hit → null             ← centre is off-screen
                                            insideViewport: false
scroll host: .dock-layer--full  scrollWidth 295  clientWidth 234   ← 61px beyond the port
```

`document.elementFromPoint()` at the Cancel control's own geometric centre returns `null`; at the
Regenerate control's centre it returns the band *behind* it. Both are recoverable only by
discovering a horizontal swipe inside a 46px-tall glass pill. The producer's overflow track does
engage (`[data-dock-overflow]` present), so this is a graceful degradation rather than a hard
trap — but it is a degradation of the **only** exit control on a touch device, where there is no
`Escape` key (`SlugEditLayer.vue:86` is the sole other dismissal) and where the dock never
auto-collapses (`always-expanded="!isDesktop"`).

The 390 arm is already over: `scrollWidth 295` vs `clientWidth 290`. **The composition does not
fit the reference mobile aperture**, let alone the narrow one. Layer intrinsic widths, measured at
`max-content`: mobile-edit 160.1 · **slug-edit 285** · action-bar 302 · main 447.5. The slug layer
is the second-widest thing the dock ever has to hold, and it is the only one that also has to hold
a caret.

---

### D-5 — MAJOR — the open transition drops focus on the floor (desktop), and close never restores it

`onStartSlugEdit` (`:16-23`) sets the mode and focuses the input on `nextTick`. Measured, desktop,
after clicking `Login`:

```
C. desktop focus @50ms:   {"active":"div[]","isInput":false}
C. desktop focus @300ms:  {"active":"div[]","isInput":false}
C. desktop focus @1000ms: {"active":"div[]","isInput":false}
```

Focus never reaches the field. It comes to rest on an **unnamed `<div>`** — the dock face
container. `nextTick` fires while the incoming face is still `inert` (the crossfade's inert phase),
so `.focus()` is a silent no-op and nothing retries. The mobile path works
(`B. mobile focus @100ms: {"isInput":true}`) because the dropdown's own close/restore sequence
happens to land after the face settles. **Same component, opposite outcome, by accident of timing.**

Close is worse. `Escape` (`:86`) sets `slugEditMode = false` and nothing else:

```
after Escape: {"active":"div[HomeToolsPickerAbout]", "isBody":false, "layerActive":false}
```

Focus is again dumped on a container div, not returned to the `Login` button that opened the layer.

**Canon violated.** `VISUAL-CONSTITUTION.md §5.1`, the overlay row: "producer initial-focus rule on
open; **exact connected opener on close**, otherwise the nearest surviving owning action." This
layer behaves as an overlay (it makes every sibling control `inert` + `aria-hidden`) while
implementing none of the overlay focus contract. `docs/tranches/A/audit/HARDEN-5-coverage-gaps.md:45`
booked this against `SlugEditLayer.vue:21` — "No focus trap, no focus restore-on-close" — and it
is still open.

---

### D-6 — MAJOR — one undifferentiated field carries two authorities, and renders the elevated one in plaintext

The placeholder says `enter slug or token...`. The discriminator is
`looksLikeSlug()` (`:25-27`) — a four-word-lowercase regex. **Anything that is not four
hyphenated lowercase words is treated as an admin token** (`:46`, `:54`). There is no mode
selector, no state indication, no differentiated affordance, and no confirmation of which
authority you just asserted.

`shots/desktop-light-slug-long.png` shows the consequence: after typing
`ADMIN_TOKEN=a-very-long-administrative-secret-token-value-…` the dock band renders

```
→]  ADMIN_TOKEN=a-ve  →  │  ↻  ✕
```

The secret is `type="text"` (measured), unmasked, in the persistent top band of the page, with no
`autocomplete`, no `spellcheck="false"`, no `inputmode`, no `name` (all measured `null`). It is
also silently truncated at 160px with no ellipsis, no fade and no boundary —
`scrollWidth 749 / clientWidth 160` — so the operator cannot visually verify what they pasted.

**Canon violated.** `VISUAL-CONSTITUTION.md §7 About and Admin`: "**Elevated authority is
communicated by labeling and scope**, not by a fourth visual system." Here it is communicated by
nothing whatsoever. `§7 Account and storage recovery`: "secret retention temporarily replaces its
action region" — a designed treatment for secrets exists in canon and this surface ignores it.

---

### D-7 — MAJOR — `compact` discards the producer's own hit-cell guarantee on a coarse pointer

All three controls pass `compact` (`:92`, `:105`, `:113`). Glass-ui 7.0.0's own documentation for
that prop (`node_modules/@mkbabb/glass-ui/dist/components/dock/DockControl.vue.d.ts`) is explicit
about what the default gives you and what `compact` takes away:

> "ONE FACE, the folded safe-inset. … the painted plate insets via the dock-scoped
> `--dock-control-safe-inset` fold, while the **HIT CELL stays the full `--dock-control-size`
> (≥44px on coarse via the density clamp)** — hit box ≠ paint box."
>
> `compact?: boolean` — "Compact icon variant: **auto-sized instead of fixed square**."

The producer has already solved the exact problem `PROPORTION-AUDIT.md` PR-12 names — "Visual
glyph size, operable target size and layout reservation are separate quantities. Accessibility
floors do not require bloated visible chrome" — by separating paint box from hit box. `compact`
opts out of that separation and collapses the hit cell onto the paint box. Measured result:

| arm | measured | producer default would give |
|---|---|---|
| 1440 desktop | 22.0 × 22.0 | `--dock-control-size` (fixed square) |
| 390 / 320 touch | **23.3 × 23.3** | **≥44px** (coarse density clamp) |

On a touch device this component ships targets at **53% of the producer's own coarse floor**, and
at 47% of the Apple HIG 44pt / Android 48dp design floors.

**Honest scoping of MT-F004.** The workflow brief frames these as "below the 24×24 minimum". The
sibling library seat (L-4, §263-275) correctly observes that WCAG 2.5.8's *spacing exception*
rescues the AA conformance claim: measured centre-to-centre distances are 47 / 28 px desktop and
50.4 / 30.4 px mobile, all ≥ 24. I concur — **MT-F004 is not a WCAG AA failure at this site.** The
design defect is different and survives that correction intact: the component defeats a guarantee
its own design system publishes, on the pointer class where it matters most.

Provenance: this exact site was ruled twice and executed zero times.
`docs/tranches/N/audit/lanes2/D5.md:50` names "Slug-edit layer buttons | **22×22**"; `:92` rules
they "move to `DockIconButton compact` minimum 28px"; `docs/tranches/N/waves/N.W17.md:371` schedules
"hit-target floor on the 22/24px bespoke sites (the slug-edit + trigger ⋮ controls …— D5 WO-D5-2)".
Two tranches later the measurement is unchanged.

**Cure.** Delete the word `compact` three times. The producer's default *is* the design.

---

### D-8 — MAJOR — the pending state cannot render, and the disabled state is opacity-only

**Pending.** `:97` renders `<Loader2 v-if="slugSwitching" class="… animate-spin" />`. It can never
appear. `:42` sets `slugSwitching = true`; `:54` fires an un-awaited promise; `:64` sets it back
to `false` — all inside one synchronous execution, with no `await` between. Vue never paints
between those two writes. Measured with a `MutationObserver` armed across the whole submit:

```
spinner observed during submit: {"sawSpinner":false,"spinnersNow":0}
```

A designed state that is structurally unreachable is a design defect, not a bug: the affordance
exists in the source purely as reassurance to whoever read the diff.

**Disabled.** Measured, disabled vs. enabled submit:

```
disabled: {opacity:"0.5", color:"color(srgb 0 0 0 / 0.8)", bg:"rgba(0,0,0,0)", boxShadow:"none", cursor:"default"}
enabled:  {opacity:"1",   color:"color(srgb 0 0 0 / 0.8)", bg:"rgba(0,0,0,0)",                   cursor:"pointer"}
```

The *entire* rendered difference between "you may proceed" and "you may not" is **alpha 0.5 vs
1.0**. No shape change, no boundary change, no icon change. `VISUAL-CONSTITUTION.md §4.1`:
"Selected, failed, pending, withdrawn and **disabled** states are never color-only." An opacity
attenuation is the degenerate case of color-only. It also survives forced-colors unchanged
(measured: `opacity: "0.5"` with `forced-color-adjust: auto` — opacity is not a forced-colors
property), so the one mode designed to rescue color-only states does not rescue this one.

---

### D-9 — MINOR — RTL: the arrow does not mirror and the slug is not direction-isolated

Measured with `dir="rtl"` on the document root, layer active, value `brave-swift-red-fox`:

```
{"direction":"rtl","textAlign":"start","unicodeBidi":"normal",
 "loginIcon":{x:846.5}, "input":{x:680.5,right:840.5}, "submit":{x:652.5}, "cancel":{x:577.5}}
```

The *row* mirrors correctly — that part is sound, and is the producer's flex doing its job. Two
things do not:

1. The submit glyph is `ArrowRight` (`:98`), a hard-coded physical direction. In an RTL layout a
   right-pointing arrow reads as "back", not "proceed". The leading `LogIn` glyph (`:80`) is also
   a right-pointing arrow, so the mirrored row shows two right-arrows meaning "backwards" and
   "login".
2. The field itself computes `direction: rtl`, `unicode-bidi: normal`, with no `dir="ltr"` and no
   isolation. `VISUAL-CONSTITUTION.md §6.1` is explicit: "CSS strings, hex, **slugs**, IDs and
   provenance | render in **LTR-isolated** spans inside RTL prose", and §5.2's last row: "CSS
   direction keywords, physical axes, code, hex, **slug**, ID | preserve the declared
   physical/domain meaning".

---

### D-10 — MINOR — under forced colors the field disappears entirely

Chromium `forcedColors: "active"`, layer active, measured on the input:

```
{"color":"rgb(0,0,0)", "bg":"rgba(255,255,255,0)", "border":"none 0px rgb(0,0,0)",
 "opacity":"1", "forcedColorAdjust":"auto"}
```

Forced-colors mode normally rescues a text field by forcing its border to the system `ButtonBorder`
colour. `border-none` (`:85`) removes the border *box*, so there is nothing for the forced palette
to paint. In Windows High Contrast the slug field is an unmarked run of text on the band, with no
boundary, no fill and (per D-3) no focus ring. `VISUAL-CONSTITUTION.md §4.1`: "Focus remains
visibly distinct from selection in both schemes, **forced colors** and reduced transparency."

---

### D-11 — MINOR — register incoherence: four glyph scales, two identical arrows, two "Cancel"s

Measured glyph boxes inside this one 210px form: `LogIn` **16×16** (`:80`, `w-4`), then
`ArrowRight` / `RefreshCw` / `X` all **14×14** (`:98`, `:109`, `:117`, `w-3.5`). Two icon scales
in one row of five elements, with no semantic distinction to justify the step — the 16px one is
decoration and the 14px ones are actions, which is the ratio backwards.

Across the dock's four layers the scale ladder is: **14** (this layer) · **20** (`Dock.vue:143-144`,
`w-5`, the mobile-edit layer) · **24** (`Dock.vue:154`, `w-6`, the action-bar Back). Switching
layers changes the icon scale by 71% with no change of meaning. `PROPORTION-AUDIT.md §5.8`: "Real
rendered relation wins over token intent. Adjacent rungs, measured rects and ink gaps appear in
DELTA."

Two right-pointing arrows sit 170px apart in the same row meaning different things ("this is a
login field" / "submit this login").

And the accessible names collide across layers: this layer's `aria-label="Cancel"` (`:114`) sits
in the same dock as `aria-label="Cancel edit"` (`Dock.vue:144`). "Cancel" alone does not say what
it cancels. The donor surface said `Cancel slug edit` (`PaletteSlugBar.vue:35`) and made the submit
name state-bearing: `:aria-label="slugSwitching ? 'Signing in…' : 'Sign in with slug'"` (`:24`).
Both refinements were dropped in the transplant.

---

### D-12 — MINOR — the design-system boundary is crossed at the field, and the crossing was booked twice

`SlugEditLayer.vue:85`:

```
class="text-mono-small bg-transparent border-none outline-none w-40 min-w-0 placeholder:text-muted-foreground"
```

Eight utilities hand-rolling a field primitive that ships in the design system. `demo/ui/input/index.ts`
is a one-line re-export of glass-ui's `Input` from `@mkbabb/glass-ui/forms`, and four demo surfaces
already consume it (`AdminTagsPanel.vue:115`, `AdminAuditPanel.vue:97`,
`CurrentPaletteEditor.vue:174`, `SearchFilterBar.vue:130`). The donor twin uses a composed
`SearchBar` with an `:icon` slot (`PaletteSlugBar.vue:5-11`) — i.e. exactly this component's
composition, already solved at the root.

This is owner edict 4 (glass-ui is the design system) and edict 5 (style at the root, never
per-instance) in one line — and `border-none outline-none` is precisely the per-instance override
that produced D-3 and D-10.

It was booked twice and never closed:
`docs/tranches/S/audit/lanes/glassui-consume-map.md:165` ("6 other text-input sites hand-roll a raw
`<input>` with bespoke Tailwind … which is exactly why they render un-rounded / off-system … 
`dock/layers/SlugEditLayer.vue:81`") and `:208` (P1: migrate onto `<Input>`).
`docs/tranches/S/audit/pi/w5a-after/DELTA.md:50` records it as a deferred residual: "`SlugEditLayer.vue:81`
(dock — W7's per §File bounds)". W7 came and went.

Related, same line: `SlugEditLayer.vue:57-62` catches `e: any` and branches on `msg.includes("409")`
/ `"404"` / `"429"` — the exact idiom `useSlugMigration.ts:78-82` documents as **already proven
dead** ("the server titles … never contain '409'/'404'/'429', so those branches matched nothing and
the authored copy below never showed"). The corrected form was written next door and this copy was
left carrying the disease. Owner edict 2 (no legacy code).

---

### D-13 — MAJOR — the surface is a constitutional orphan: canon assigns this job to a Dialog

`VISUAL-CONSTITUTION.md §7 Account and storage recovery`, in full:

> "**Account is one modal side Dialog opened from the Dock**, not a route chassis or second main.
> It owns registration/recovery when signed out and identity, recovery-credential rotation and
> logout when active; secret retention temporarily replaces its action region and never becomes a
> nested Card/Dialog. **W23 owns the rendered composition and journey** while W15 supplies
> auth/outbox state."

Sign-in is Account's job, Account is a Dialog, and the composition is W23's. This component is a
*dock layer* doing Account's job — which is why every one of D-1, D-3, D-5, D-6 and D-8 exists.
Those are not five independent oversights; they are five things a Dialog gives you for free and a
46px-tall inert-able strip of navigation chrome cannot:

| what the state needs | Dialog gives it | this dock layer |
|---|---|---|
| room for an error region under the field | yes | D-1: nowhere to put it, so it was never drawn |
| a real field with boundary + focus ring | yes (glass-ui `Input`) | D-3: hand-rolled to invisibility |
| producer initial-focus + opener restore | yes | D-5: focus lands on an anonymous div |
| a masked/scoped region for a secret | §7 "secret retention temporarily replaces its action region" | D-6: plaintext in the top band |
| persistence while a request is in flight | yes | D-2/D-8: 5s timer kills it; spinner cannot paint |
| room for its own placeholder | yes | 160px, 22 characters, truncated |

Meanwhile the layer costs the dock its whole identity for the duration: activating it marks every
sibling face `inert` + `aria-hidden="true"` (measured), so while signing in the user has no route
selector, no Tools, no profile. `VISUAL-CONSTITUTION.md §7 Shell`: "The dock is its own top band,
fully visible, focusable, and clipped by neither mask nor card. **Direct route changes keep its
full navigation identity.**"

---

## State coverage — the full enumeration

A state that was never designed is a design defect. Sixteen states, seven of them unhandled.

| # | state | designed? | evidence |
|---|---|---|---|
| 1 | **empty** (no input) | partial | submit disabled at opacity 0.5 only (D-8); placeholder truncated (D-3) |
| 2 | **populated** | **no** | no field boundary, so a value is indistinguishable from a placeholder (D-3) |
| 3 | **pending / loading** | **NO — unreachable** | `sawSpinner:false`; sync try/finally (D-8) |
| 4 | **error** | **NO — absent** | `errorCopyVisible: []`; `slugError` never in template (D-1) |
| 5 | **success** | **no** | layer closes; no confirmation of identity switch |
| 6 | **disabled** (submit) | opacity-only | violates §4.1 (D-8) |
| 7 | **focused** (input) | **NO** | focused ≡ unfocused, pixel-identical (D-3) |
| 8 | **focused** (buttons) | yes | 2px ring measured, `ring-focused.png` |
| 9 | **hovered** | yes | `bg: color(srgb 0.994 0.96 0.926 / 0.65)` — producer glass-capsule |
| 10 | **active / pressed** | yes | producer spring press |
| 11 | **selected** | n/a | no selection semantics here |
| 12 | **dragging** | n/a | — |
| 13 | **overflowing / truncated** | **NO** | placeholder truncates in all arms; a 749px token clips at 160px with no ellipsis, fade or affordance (D-3, D-6) |
| 14 | **RTL** | partial | row mirrors; arrow does not; slug not LTR-isolated (D-9) |
| 15 | **reduced-motion** | yes (globally) | see Motion |
| 16 | **forced-colors** | **NO** | field has no boundary to force (D-10) |
| 17 | **zoom 200%** | yes | input 320×45.9, controls 44×44, `overflowX: 0` — see Negative results |
| 18 | **container collapse mid-edit** | **NO** | not a state anyone considered (D-2) |

---

## Motion

The component declares exactly one animation: `animate-spin` on `Loader2` (`:97`).

- **Tokenized?** No — it is Tailwind's stock `spin`, not one of the tranche's
  `--animation-slide-sm/md/lg` or the `vj-*` morph family the rest of the dock uses
  (`Dock.vue:276` `Transition name="vj-morph"`, `Dock.vue:301` `vj-settle`).
- **`prefers-reduced-motion`?** Handled, but by a global rule rather than by this component.
  Measured with `reducedMotion: "reduce"`, probing the exact class inside the dock subtree:
  `{"prm":true,"animationName":"spin","animationDuration":"1e-05s","animationIterationCount":"1"}`
  — the app-wide PRM guard collapses it to a single 10µs iteration. Sound.
- **Layout-forcing property?** No — `spin` is transform-only. Sound.
- **Reachable?** No (D-8). The one piece of motion this component owns can never play.

The layer's *arrival* motion is entirely the producer's `dock-crossfade`. That is correct and
edict-6 compliant — nothing was deleted here. The finding is the inverse: the component contributes
no motion of its own to a state change that badly needs one (D-1 — a failure that produces zero
visual delta is the strongest possible argument for a designed error beat).

---

## Proportion and seat law

Judged against `PROPORTION-AUDIT.md` §5 and its register.

| law | verdict |
|---|---|
| §5.5 "A small icon/mark is either data, status, labeled action, drag affordance, focus/selection register or removed. **Decorative controls and operable ornaments without names are forbidden**" | **FAIL.** The `LogIn` glyph (`:80`) is decoration at 16×16 — larger than the three actions beside it — and is not `aria-hidden`. Measured live: both glyphs in the form return `{"ariaHidden":null,"role":null}`. The donor twin sets `aria-hidden="true"` on all three of its glyphs (`PaletteSlugBar.vue:26,27,38`). |
| §5.7 "Visual glyph size, operable target size and layout reservation are separate quantities" | **FAIL** — `compact` collapses them (D-7). |
| §5.8 "Real rendered relation wins over token intent" | **FAIL** — four glyph scales across four dock layers (D-11). |
| §5.10 "Readout and editing are separate jobs" | pass — this is an editor only. |
| PR-07 "Hover-only/unlabeled controls … ADD-AFFORDANCE" | **FAIL** — the input is unlabeled (D-3). |
| PR-08 "Pending/failure/export/recovery truth only transient → ADD-AFFORDANCE" | **FAIL, worse than the row states** — not transient, absent (D-1). |
| PR-12 "Touch padding bloats/misaligns visual glyphs → TIGHTEN … Invisible/seat geometry preserves target floor while optics follow rung" | **FAIL** — the seat geometry does not preserve the floor (D-7). |
| PR-16 "Dock's … unlabeled … controls have no explicit purpose/state law" | related — this layer adds three more, one of them a nameless field. |

Rhythm, measured: the form's internal gap is 6px (`gap-1.5`) and the parent `DockLayer`'s gap is
also 6px — **consistent, sound.** Separator-flanked gap 25px (6 + 13 + 6). Vertical centring is
correct (`items-center`; glyph y=33.4 within a 22px button at y=29.4 → 4px inset, symmetric). The
row's *micro*-rhythm is the one thing about this component that was actually built to a system.

---

## Negative results — checked, and SOUND

Recorded so a later seat does not re-litigate them.

1. **The inert layer does not leak into the a11y tree.** Inactive `.dock-face` measures
   `{"inert":true,"ariaHidden":"true","opacity":"0","pointerEvents":"none"}` and
   `checkVisibility({checkOpacity:true}) === false`. The slug controls appearing in every row of
   `audit/visual/REPORT.json` are an artifact of that harness's nonzero-rect filter, not a live
   defect.
2. **The hidden layer does not inflate the dock.** Intrinsic `max-content` widths: slug 285 vs.
   main 447.5; the group measures 447.5. The main layer governs.
3. **Tab order inside the active layer is correct.** Chromium walk from the filled input:
   `Switch to slug` → `Generate new slug` → `Cancel` → out. All three `:focus-visible` with a
   painted 2px ring.
4. **200% zoom is sound.** `document.documentElement.style.zoom = 2`: input 320×45.9, submit and
   cancel 44×44 each, `overflowX: 0`. The component scales in rem and gains a proper touch target
   at zoom — which is quiet proof that the 22px default is a *choice*, not a constraint.
5. **`prefers-reduced-motion` is honoured** (globally). See Motion.
6. **Mobile focus handoff works** (`isInput: true` at 100/400/1200ms) — the failure is
   desktop-only, which is what makes it a design defect rather than a platform limit.
7. **Mobile does not auto-collapse** (`always-expanded="!isDesktop"`); D-2 is desktop-only.
8. **No console or page errors** are produced by this component in any arm (`pageErrors: []`).
9. **Type role is correct.** `text-mono-small` / Fira Code on a slug is the right jurisdiction —
   `VISUAL-CONSTITUTION.md §4`: "value, code, or provenance | `text-mono-small` | Fira Code".
10. **`useTemplateRef` is used idiomatically** (`:14`), and every type-only import is `import type`
    — edicts 7 and 8 are satisfied. (`:57` `catch (e: any)` is a separate matter — see D-12.)

---

## The gestalt cure

**Do not repair this component. Retire it.**

The constitution already names the destination and the owner: `§7 Account and storage recovery` —
"Account is one modal side Dialog opened from the Dock … W23 owns the rendered composition and
journey while W15 supplies auth/outbox state." The transposition is:

1. **The dock keeps one control: `Login` / the slug pill.** It opens the Account Dialog. The dock
   layer, `DockLayerGroup`'s `slug-edit` face, `Dock.vue`'s `slugEditRef`/`onStartSlugEdit`/
   `onCopySlug` round-trip and the `activeLayer` branch for it all die together. The dock stops
   pretending to be a form host and goes back to being navigation that "keeps its full navigation
   identity."
2. **The Dialog composes the field from glass-ui**, as the dead twin already does: `SearchBar` or
   `Input` with an `:icon`, a real boundary, the producer focus ring, a fitted label
   (`Slug or admin token` as a *label*, not a truncated placeholder), and room for the value.
   Six of the twelve findings above evaporate at this step because they are all "the dock has no
   room".
3. **Two authorities become two affordances.** Slug sign-in and admin-token elevation are
   different acts with different consequences; canon says elevated authority is communicated by
   labeling and scope. The token path gets a masked field and its own scoped region.
4. **One error owner.** The Dialog renders `role="status"` under the field; `useSlugMigration`'s
   `slugBarRef` limb and its four `?.setError` no-ops are deleted; `PaletteSlugBar.vue` — a
   component rendered by nothing — is deleted with them. There is then exactly one surface, one
   error region, one accessible name per control, and the `409/404/429` copy that has never once
   been shown to a human finally has a place to appear.
5. **Pending becomes real** by awaiting the port, which the Dialog can afford to do because it
   does not evaporate on a 5-second timer.
6. **If, and only if, the dock layer survives owner review**, the three sub-repairs are each one
   word: delete `compact` ×3 (D-7); add `slugEditMode` to `Dock.vue:86`'s `shouldKeepOpen`
   disjunction (D-2); replace the raw `<input>` with `<Input>` (D-3, D-10, D-12).

The through-line of every finding in this report: **the donor surface, `PaletteSlugBar.vue`, is
better designed in six separate respects than the thing that replaced it, and it is not mounted.**
The best version of this component in the repository is dead code, and the shipping version is the
one nobody looked at.

---

## Evidence index

| claim | evidence |
|---|---|
| placeholder truncation, all arms | `shots/desktop-{light,dark}-slug-active.png`, `mobile-{light,dark}-slug-active.png`, `narrow-320-slug-active.png` + the advance-width table above |
| no field boundary / no focus ring | `shots/input-unfocused.png` ≡ `shots/input-focused.png`; computed `outline-style:none`, `box-shadow:none`, `border-width:0px`, `::before/::after content:none` |
| buttons *do* ring (scoping D-3) | `shots/ring-unfocused.png` vs `shots/ring-focused.png` |
| silent failure | probe2 §A4 output, quoted in D-1 |
| spinner unreachable | probe2 §A5 `{"sawSpinner":false}` |
| auto-collapse data loss | slug-probe6 t=0…10000ms table |
| desktop focus drop | slug-probe5 §C |
| escape does not restore | probe2 §A3 |
| 320px aperture | slug-probe7 §320px hit-test |
| touch target 23.3px | probe-slug mobile arms; `DockControl.vue.d.ts` producer quote |
| plaintext secret | `shots/desktop-light-slug-long.png`; `scrollW 749 / clientW 160` |
| forced colors | slug-probe3 §5 |
| RTL | slug-probe3 §7 |
| PRM | slug-probe3 §8 |
| zoom 200% | slug-probe3 §6 |
| dead twin | `grep -rn "PaletteSlugBar" demo` → barrels only, no template usage |
