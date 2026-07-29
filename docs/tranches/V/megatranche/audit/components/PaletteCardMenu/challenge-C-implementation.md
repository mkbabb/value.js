# CHALLENGE-C — `PaletteCardMenu.vue` implementation audit (pass 3)

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context variant. That
is the tier this seat was explicitly spawned with; it is declared, not inherited.

- Subject: `demo/palettes/browser/card/PaletteCard/PaletteCardMenu.vue` (228 lines, area `palettes`)
- Repo: `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`
- Date: 2026-07-28
- Verdict: **DEFECTIVE** — 2 BLOCKER, 9 MAJOR, 7 MINOR, 4 INFO
- Prior passes preserved verbatim:
  `challenge-C-implementation.pass-1-2026-07-28.md`,
  `challenge-C-implementation.pass-2-2026-07-28.md` (md5 `f9f32a2f520b19ef1c47c966693bb8f5`, identical
  to the file this pass replaced).
- This pass re-tested the two pass-2 BLOCKERs from scratch against the live build. **C2-1 reproduced
  independently** (5 → 5 on `/#/mix`, 5 → 4 on `/#/palettes`, same run, same build). **C2-2
  reproduced twice more** and its *scope corrected*. Six findings below are new; two are corrections
  to pass 2 that change how the mega-tranche should scope the cure.

---

## Executive summary

Pass 1 found the logic wrong in three places. Pass 2 found that the wrongness does not stop at the
file: three of five hosts never bind the actions the menu offers, so twenty-two item instances are
inert. Pass 3 went at what neither pass measured — **what the component actually renders**. The
answer is that the designed register does not ship:

**The "K-INV5 small-caps register" that this file's own comments name three times renders as plain
uppercase.** The inline `font-variant: small-caps` is dead on arrival, cancelled by the sibling
`text-mono-caption` utility's `text-transform: uppercase`, which consumes the lowercase letters
before small capitals can be synthesised from them. Measured on the shipped span: 55.266 px with the
declaration, 55.266 px without it. Remove the uppercase utility and the same declaration moves the
box to 39.094 px — so it is not that small caps are unsupported; it is that this component asked for
them behind a utility that had already destroyed their input. Two inline `style=` attributes, three
prose comments, one ratified design token — and nothing on screen.

Two more rendering defects sit beside it: the Export submenu ships a **different typographic voice**
than the menu it descends from (italic vs upright, measured), and on a 390 px viewport it **covers
its own trigger and the `Delete` item** with 14,395 px² of overlap.

| id | severity | one line | status |
|---|---|---|---|
| **C2-1** | **BLOCKER** | 22 menu-item instances at 3 of 5 hosts are inert — `Delete` on `/#/mix` leaves the store at 5/5 while the same click on `/#/palettes` takes it 5 → 4 | **RE-REPRODUCED** independently |
| **C2-2** | **BLOCKER** | `@click.prevent` (`:108`) kills the Export submenu on **pointer** input — synthetic mouse click AND real iPhone-14 `tap()` both leave it closed | **CONFIRMED ×2, scope corrected** (see C3-7) |
| **C3-1** | **MAJOR** | the K-INV5 small-caps register is **inert** — `font-variant: small-caps` cancelled by `text-mono-caption`'s `text-transform: uppercase`; measured 55.266 px = 55.266 px | **NEW** |
| **C3-2** | **MAJOR** | every trigger on the page has the same accessible name (6 cards → 6 × `"Palette menu"`) and the only disambiguator sits in a role-less `generic` that `role="menu"` may not own | **NEW** |
| **C3-3** | **MAJOR** | the submenu renders **italic** while its parent menu renders upright — `class="text-caption"` (`:112`) contributes a font-style and not the size it was reached for | **NEW** |
| **C3-4** | **MAJOR** | at 390 px the Export submenu (301.4 × 243) occludes its parent by 150.1 × 95.9 px, hiding the `Export` row it descends from and the `Delete` item, pinned flush to `x = 0` | **NEW** |
| **C2-3** | MAJOR | Export writes attacker-controlled markup to disk; 0-colour palette fails silently | pass-2, source re-verified |
| **C2-4** | MAJOR | `apiOffline` misses `misconfigured`; the running dev server is in exactly that state | pass-2, re-observed live |
| **C2-5** | MAJOR | an `unlisted` palette renders byte-identical to a public one | pass-2, + **C3-5** cheapens the cure |
| **C2-6** | MAJOR | `Rename` holds focus for 212 ms then loses it to reka's restore | pass-2 |
| **C2-7** | MAJOR | `<button>` inside `<button>` at every `/#/mix` row (5 cards → 5 nested) | pass-2, re-measured |
| **C2-8** | MAJOR | vacuous gate — no component-test infrastructure at all | pass-2, **count corrected** (C3-8) |
| **C3-5** | MINOR | the API already emits the correct `published` boolean and the client already types it; **zero** consumers in `demo/`, and the component re-derives it wrong | **NEW** |
| **C3-6** | MINOR | `.fira-code` is a demo-local fork of a glass-ui `@utility` of the same name — measured as a strict subset, therefore dead | **NEW** |
| C2-9 | MINOR | the annotation folds into the accessible name — and it is **three** items, not two (`Versions 3` is the third) | pass-2, extended |
| C2-10 | MINOR | the latch gates 2 of ~9 network-bound actions | pass-2 |
| C2-11 | MINOR | enum→boolean collapse twice (`visibility`, `tier`) | pass-2 |
| C2-12 | MINOR | the "register" is two copy-pasted per-instance overrides | pass-2, **and they are no-ops** (C3-1) |
| C2-13 | MINOR | pressing the trigger squashes the whole card | pass-2 |
| C2-14 | MINOR | owner `Delete` is unconfirmed; re-measured `confirmDialogs: 0` | pass-2, re-measured |
| **C3-7** | INFO | correction: the submenu **is** keyboard-operable (Enter/Space/ArrowRight); C2-2 is pointer-only | **NEW** |
| **C3-8** | INFO | correction: e2e asserts on **6** items, not 2 — but the a11y gate's name leg is *non-empty only*, which is why C3-2 and C2-9 are green | **NEW** |
| C2-15 | INFO | the modal lock is applied to `<body>` while the scroll container is an inner div | pass-2 |
| C2-16 | INFO | the Safari visual sweep captured zero PaletteCards | pass-2 |

---

## C3-1 — MAJOR: the K-INV5 small-caps register does not render

### The claim the file makes about itself

`PaletteCardMenu.vue:24-26`

```
K-INV5: a tripped availability latch disables the doomed action and NAMES the degraded state
in-register (small-caps annotation, not a toast).
```

`:42-47`

```
the CURRENT state annotated in the K-INV5 small-caps register
```

and the mechanism, twice — `:35-39` and `:56-59`:

```html
<span class="ml-auto fira-code text-mono-caption opacity-55 tracking-wide"
      style="font-variant: small-caps">offline</span>
```

### The mechanism that kills it

`node_modules/@mkbabb/glass-ui/dist/styles/typography/utilities.css`:

```css
@utility text-mono-caption {
    font-family: var(--font-mono);
    font-size: var(--type-caption);
    letter-spacing: var(--type-tracking-caps);
    text-transform: uppercase;      /* ← */
}
```

CSS Text 3 §2.1 runs `text-transform` during text transformation, *before* glyph selection; CSS
Fonts 4 §6.4 synthesises small capitals from **lowercase** letters. By the time
`font-variant-caps: small-caps` is consulted there are no lowercase letters left. The declaration
cannot do anything.

### Measurement — on the shipped element, not a mock

Probe `evidence/pass-3/pcm-p3-b.mjs`. The LAN-host + stubbed-feed technique (pass-2's) renders a real
owned-remote menu, whose visibility item carries the annotation unconditionally (`:56-59`). The probe
reads the live span, then clones it three times, neutralising exactly one property per clone:

```
::B1_realAnnotation {
 "annotationTextContent": "public",
 "inlineStyle": "font-variant: small-caps;",
 "className": "ml-auto fira-code text-mono-caption opacity-55 tracking-wide",
 "computed": { "textTransform": "uppercase",
               "fontVariant": "small-caps", "fontVariantCaps": "small-caps",
               "fontSize": "14.384px" },
 "widths": {
   "asShipped_smallCapsPlusUppercase": 55.266,
   "smallCapsRemoved_uppercaseKept":   55.266,   ← identical: the declaration does nothing
   "uppercaseRemoved_smallCapsKept":   39.094,   ← the declaration IS capable of an effect
   "bothRemoved":                      55.266
 },
 "smallCapsIsInert": true,
 "smallCapsWouldMatterWithoutUppercase": true }
```

The engine reports `font-variant-caps: small-caps` as computed — the declaration is *applied* and
*inert*, which is why no lint, no type, no gate and no eye caught it.

### Synthetic control — isolating `text-mono-caption` as the cause

Same probe, four spans built from the shipped class list, text `"offline"`:

```
::B1_syntheticControl
 withUppercaseUtility     small-caps ON  → 64.469   OFF → 64.469   (Δ = 0)
 withoutUppercaseUtility  small-caps ON  → 59.266   OFF → 83.391   (Δ = 24.125)
```

Removing one class from the recipe restores a 24 px difference. `text-mono-caption` is the cause;
nothing else in the recipe matters.

*(Note on method: the width test works here only because synthesised small caps scale the glyph
advance. `bothRemoved == asShipped` at 55.266 is a monospace artefact — `public` and `PUBLIC` are six
glyphs either way in Fira Code — and is not evidence of anything. The two decisive pairs are
`asShipped` vs `smallCapsRemoved` and `uppercaseRemoved` vs `bothRemoved`.)*

### Corroboration from the accessible name

```
::B3_axMenuItems ["Save","Make private PUBLIC","Remix","Rename","Edit Tags","Versions 3","Export","Delete"]
```

Chrome's ACCNAME reads the *transformed* text. `PUBLIC` in the AX name is the uppercase transform
speaking. Pass 2 recorded the same string as an a11y defect (C2-9) without noticing it is also the
receipt for this one.

### Why it outranks the other new rows

C2-12 called these two spans a per-instance styling duplication (edict 5) — true, and the seat filed
it MINOR because the *register* was assumed to work. It does not. This is a designed, named,
ratified, thrice-commented affordance that has never once rendered. The register is not
mis-located; it is absent.

### Cure

`text-mono-caption` and `font-variant: small-caps` are two different answers to the same design
question ("a quiet capitals voice") and they are mutually exclusive by construction. Pick one, and
put it in glass-ui where C2-12 already says the register belongs:

```css
/* glass-ui — the degraded-state annotation register, one definition */
@utility text-annotation {
    font-family: var(--font-mono);
    font-size: var(--type-caption);
    letter-spacing: var(--type-tracking-caps);
    font-variant-caps: small-caps;   /* NOT text-transform: uppercase */
    /* … opacity/tracking that the two copy-pasted recipes carry today */
}
```

Then this file's two spans become `<span class="ml-auto text-annotation">offline</span>` — the inline
`style=` dies, C2-12 dies with it, and the `aria-hidden` C2-9 wants has one place to live. If the
owner in fact wants uppercase, then delete both `style="font-variant: small-caps"` attributes and
every comment that names a small-caps register, because the shipped design is uppercase and the prose
is describing something that does not exist.

---

## C3-2 — MAJOR: six identical accessible names, and the disambiguator is in a node `role="menu"` may not own

### Measured — trigger names

Probe `pcm-p3-a.mjs`, `/#/palettes`, 6 seeded palettes:

```
::A2_duplicateNames [["Palette menu", 6], ["Palettes", 2]]
```

Probe `pcm-p3-b.mjs`, `/#/browse`, 2 stubbed remote palettes:

```
::B2_browse_duplicateNames { "cards": 2, "dupes": [["0 votes, click to vote",2], ["Palette menu",2]] }
```

One name per card, and the count is exactly the card count. `PaletteCard.vue:100` writes the literal:

```html
<Button icon-only variant="ghost" size="sm" aria-label="Palette menu" class="shrink-0">
```

A screen-reader user pulling the button list off `/#/palettes` gets *"Palette menu, button"* six
times with nothing to choose between them.

### Measured — where the palette name actually goes

`PaletteCardMenu.vue:9-11` puts the disambiguator in a `DropdownMenuLabel`. That primitive is a plain
div — `node_modules/reka-ui/dist/Menu/MenuLabel.js`:

```js
props: { asChild: …, as: { type: null, required: false, default: "div" } },
…
createBlock(unref(Primitive), mergeProps(props, { id: unref(groupContext).id || void 0 }), …)
```

no `role`, no `aria-*`. CDP `Accessibility.getFullAXTree` over the open menu (probe `pcm-p3-a.mjs`):

```
::A3_menuAXSubtree [
 { "d":0, "role":"menu",       "name":"Palette menu" },
 { "d":1, "role":"generic",    "name":"" },                ← DropdownMenuLabel
 { "d":2, "role":"StaticText", "name":"Probe Palette 0" }, ← the only disambiguator, 2 levels down
 { "d":1, "role":"separator",  "name":"" },
 { "d":1, "role":"menuitem",   "name":"Publish" },
 …
]
::A8_menuShape { "menuAttrs": { "role":"menu", "ariaLabel": null,
                                "ariaLabelledby": "reka-dropdown-menu-trigger-v-1-2" } }
```

Two facts follow. First, the menu's own accessible name is resolved from the trigger — so it is
`"Palette menu"` too, for all six. Second, WAI-ARIA 1.2 §menu lists Required Owned Elements as
`group`, `menu`, `menuitem`, `menuitemcheckbox`, `menuitemradio`, `separator`; a `generic` is not
among them, which is the `aria-required-children` class. AT in menu-navigation mode walks owned
menuitems — the `StaticText` under a disallowed `generic` is precisely the node that mode skips.

The visual REPORT cannot see this: its metric is `namelessButtons` (`/#/palettes` desktop = 1, mobile
= 0), and these buttons all *have* names. So does the repo's own gate — see C3-8.

### Cure

Name the trigger for the thing it operates on and give the menu the same name, once, at the seam that
already knows the palette:

```html
<!-- PaletteCard.vue, the trigger slot -->
<Button icon-only variant="ghost" size="sm" :aria-label="`Palette menu: ${palette.name}`">
```
```html
<!-- PaletteCardMenu.vue :7 -->
<DropdownMenuContent align="end" :aria-label="`${palette.name} actions`" …>
```

The `DropdownMenuLabel` then stays as the *visual* header it is, and can be `aria-hidden="true"`
alongside C2-9's annotation fix — one decision, three defects.

---

## C3-3 — MAJOR: the submenu speaks in a different voice from the menu it descends from

`PaletteCardMenu.vue:7` and `:112` — one component, two type classes:

```html
<DropdownMenuContent align="end" class="w-48 text-small">
…
<DropdownMenuSubContent class="text-caption">
```

glass-ui defines them as two different *voices*, not two sizes
(`node_modules/@mkbabb/glass-ui/dist/styles/typography/semantic.css`):

```css
@utility text-small   { font-family: var(--font-text); font-size: var(--type-small);
                        line-height: var(--type-leading-small); font-weight: 400; }
@utility text-caption { font-family: var(--font-text); font-size: var(--type-caption);
                        line-height: var(--type-leading-caption);
                        font-style: italic;            /* ← */ font-weight: 400; }
```

### Measured (probe `pcm-p3-d.mjs`, desktop 1440, submenu opened by keyboard)

```
::D1_typographySplit
 parent  surface  cls "… w-48 text-small"        fontStyle "normal"  fontSize "16.4px"
         Publish  Fira Code  normal  16.4px  line-height 22.96px
         Rename   Fira Code  normal  16.4px  line-height 22.96px
         Export   Fira Code  normal  16.4px  line-height 22.96px
         Delete   Fira Code  normal  16.4px  line-height 22.96px

 sub     surface  cls "… text-caption"           fontStyle "italic"  fontSize "14.384px"
         JSON                    Fira Code  ITALIC  16.4px  line-height 21.32px
         CSS Custom Properties   Fira Code  ITALIC  16.4px  line-height 21.32px
         Tailwind Config         Fira Code  ITALIC  16.4px  line-height 21.32px
         SVG Swatch              Fira Code  ITALIC  16.4px  line-height 21.32px
         PNG Swatch              Fira Code  ITALIC  16.4px  line-height 21.32px
```

The item recipe re-declares `font-size` (both surfaces land on 16.4 px), so **the one thing
`text-caption` was reached for — a smaller size — never arrives at the items**. What *does* inherit
is `font-style: italic` and a 1.64 px line-height difference. Five export items therefore render in
an italic voice that appears nowhere else in the menu.

Screenshot: `evidence/pass-3/mobile-submenu.png` — `JSON` / `CSS Custom Properties` / `Tailwind
Config` are visibly oblique; `Publish` / `Rename` directly above them are upright.

This is the exact shape edict 5 forbids: a type decision taken per-instance, on a glass-ui primitive,
with a class chosen for one of its properties and shipped for a different one.

**Cure:** delete `class="text-caption"` from `:112`. The submenu then inherits the family voice from
the item recipe, which is what every other menu in the app does. If the export list genuinely wants a
quieter register, that is a `DropdownMenuSubContent` variant in glass-ui, not a type utility bolted
on at one call site.

---

## C3-4 — MAJOR: on a phone the Export submenu covers its own trigger and the `Delete` item

Probe `pcm-p3-c.mjs`, `devices["iPhone 14"]`, `hasTouch: true`, viewport 390 × 664 CSS px.

```
::C2_menuPlusSubmenu
 menu     id reka-dropdown-menu-content-v-0-6  side "top"  align "end"
          x 151.3  y 235.7   w 192    h 245.6   right 343.3  bottom 481.2
          items: Publish / Rename / Export / Delete   (178 × 44 each)

 submenu  id reka-menu-sub-content-v-0-11      side "left" align "start"
          x 0      y 385.3   w 301.4  h 243     right 301.4  bottom 628.3
          items: JSON / CSS Custom Properties / Tailwind Config / SVG Swatch / PNG Swatch (287 × 44)

 overlap  { "xPx": 150.1, "yPx": 95.9, "area": 14395 }
 horizontalOverflow false
```

- The submenu is **301.4 px on a 390 px viewport** — 77 % of the screen — because it has no width and
  sizes to `"CSS Custom Properties"`, while the parent is pinned at `w-48` (192 px).
- Floating-ui shifts it to `x = 0`, flush against the viewport edge: no `collision-padding` anywhere
  on either surface.
- The 150.1 × 95.9 px overlap covers the parent's y-range 385.3 → 481.2, i.e. **the `Export` row the
  submenu descends from and the `Delete` item below it**. A submenu that hides its own anchor gives
  the user no way to see what they opened or to close it by re-tapping the trigger.

The screenshot makes it plain (`evidence/pass-3/mobile-submenu.png`): the chevron of the `Export`
row survives as a `>` peeking past the submenu's right edge, and the `Delete` trash glyph is a ghost
behind translucent glass. The submenu's `backgroundColor` is `oklab(… / 0.808)` over
`backdrop-filter: blur(11px)`, so the card's teal and pink swatches read straight through
`SVG Swatch` and `PNG Swatch`.

None of this is reachable by touch in the shipped build (C2-2), which is why it has never been seen —
I had to open the submenu by keyboard to photograph it. **Fixing C2-2 without fixing C3-4 ships this
to every phone user.** They are one work item, not two.

**Cure:** the two surfaces must be one system — a width on the sub-content that matches its parent
(or a parent that sizes to content), `:collision-padding="8"`, and on narrow viewports the flat
alternative every mobile menu uses: no submenu at all, an `Export` group inline in the parent, which
also deletes the `@click.prevent` line and C2-2 with it. That is a strict simplification: the
`<DropdownMenuSub>` family (`:107-130`) is the demo's only sub-menu and it is the only thing
`DropdownMenuSubTrigger` is used for (`grep -rn "DropdownMenuSubTrigger" demo` → three hits, all in
this file).

---

## C3-5 — MINOR: the correct boolean is already on the wire, already typed, and unread

C2-5 is right that `isPublic = palette.visibility !== "private"` (`:222`) mislabels `unlisted`. What
pass 2 missed is that the client does not have to derive it at all.

`api/src/modules/palette/format.ts:86` — every remote palette ships with the answer:

```ts
published: rest.visibility === "public",
```

`demo/palettes/types.ts:50-52` types it, and the doc comment says exactly what this component needed:

```ts
/**
 * J.W1c derived convenience emitted by the API (`formatPalette`): true ⟺
 * `visibility === "public"`. NEVER a persisted column — computed read-time.
 */
published?: boolean;
```

Consumers:

```
$ grep -rn "published" demo/palettes
demo/palettes/types.ts:52:    published?: boolean;
```

One hit — the declaration. **Zero readers in the entire demo.** A field was added to the wire, typed
on the client with a comment explaining the invariant, and then the one component that needed it
hand-rolled the predicate and got it wrong.

This is edict-2 shaped (two derivations of one truth, one of them wrong) and it makes C2-5's cure
cheaper than pass 2 proposed: not `=== "public"` — `palette.published`. The three-state display C2-5
asks for still wants `visibility` for the annotation, so the honest shape is
`published` for the boolean question and `visibility` for the state label, which is exactly the
`state display + transition` transposition C2-5 recommends.

---

## C3-6 — MINOR: `.fira-code` is a demo-local fork of a glass-ui utility, and it is dead

The annotation spans (`:37`, `:57`) use `fira-code`. There are two definitions of it.

Measured at runtime (probe `pcm-p3-a.mjs`, walking `document.styleSheets`):

```
::A4_firaCodeCascade rules [
 { "layer": "(unlayered)",      "sel": ".fira-code", "css": "font-family: var(--font-mono);" },
 { "layer": "@layer utilities", "sel": ".fira-code",
   "css": "font-family: var(--font-mono); font-feature-settings: \"liga\", \"calt\";" }
]
::A4_firaCodeCascade computed  fira-code → fontFeatureSettings "\"calt\", \"liga\""
```

- unlayered copy: `demo/styles/utils.css:9-11`, imported at `demo/color-picker/App.vue:199`
- layered original: `node_modules/@mkbabb/glass-ui/dist/styles/typography/utilities.css`

The demo copy is a strict subset — same `font-family`, no `font-feature-settings` — so it changes
nothing (the computed value still resolves to glass-ui's `"calt","liga"`, because the fork declares
no competing value). It is dead weight, not a regression. But `demo/DESIGN.md:55` still presents it
as live design surface:

> Project-specific font aliases (`utils.css:4-11`) expose `.fraunces` + `.fira-code`

`fira-code` is not project-specific any more; glass-ui owns it. Edict 2 (no dual paths) and edict 4
(glass-ui is the design system) both point at deletion. **Cure:** delete `demo/styles/utils.css:9-11`
and the `.fira-code` half of `DESIGN.md:55`. (I did not check `.fraunces`; it is out of this seat's
scope.)

---

## C3-7 — INFO (correction to C2-2): the submenu **is** keyboard-operable; the defect is pointer-only

Pass 1 and pass 2 both framed C2-2 as "the Export submenu is unreachable". Pass 2 measured touch vs
mouse-hover and closed causality on `defaultPrevented`. It did not test the keyboard, and the source
says the keyboard takes a different path.

`node_modules/reka-ui/dist/Menu/utils.js:17-19`

```js
const SUB_OPEN_KEYS = { ltr: [...SELECTION_KEYS, "ArrowRight"], rtl: [...SELECTION_KEYS, "ArrowLeft"] };
// SELECTION_KEYS = ["Enter", " "]
```

`node_modules/reka-ui/dist/Menu/MenuSubTrigger.js` — `handleKeyDown` opens the submenu **directly**,
never via `.click()`, so `@click.prevent` cannot reach it:

```js
async function handleKeyDown(event) {
    if (props.disabled || (isTypingAhead && event.key === " ")) return;
    if (SUB_OPEN_KEYS[rootContext.dir.value].includes(event.key)) {
        menuContext.onOpenChange(true);
        await nextTick();
        menuContext.content.value?.focus();
        event.preventDefault();
    }
}
```

Live (probe `pcm-p3-a.mjs`): trigger focused → `Enter` → `ArrowDown ×2` to `Export` → `Enter`:

```
::A5_keyboardWalk ["Publish","Rename","Export"]
::A5_afterEnterOnExport {
 "menus": 2,
 "items": ["Publish","Rename","Export","Delete","JSON","CSS Custom Properties","Tailwind Config","SVG Swatch","PNG Swatch"],
 "activeElement": "menuitem:JSON" }
::A5_afterArrowDownInSub { "activeElement": "CSS Custom Properties", "role": "menuitem" }
```

Fully operable. So C2-2's correct statement is narrower and, in one respect, worse:

**Two new pointer reproductions.** Desktop, a synthetic mouse click with the hover timer cleared
first (probe `pcm-p3-a.mjs`):

```
::A6_clickOnSubTrigger { "menusBefore": 1, "menusAfter": 1,
                         "ariaExpanded": "false", "dataState": "closed" }
```

iPhone 14 emulation, a real Playwright `tap()` (probe `pcm-p3-c.mjs`):

```
::C3_touchTapOnExport { "menusBefore": 1, "menusAfter": 1,
  "subState": { "ariaExpanded": "false", "dataState": "closed",
                "hasChevronAffordance": true, "childSvgCount": 2 } }
```

`childSvgCount: 2` is the new datum: the sub-trigger renders **two** icons — the `Download` glyph the
template writes at `:109`, and glass-ui's chevron. The chevron is the platform's promise that
something opens here. On touch the component makes that promise and cannot keep it. A mouse user who
*clicks* rather than dwells gets the same nothing, and because reka's `onClick` bails before its own
`event.currentTarget?.focus()` line, the click does not even leave them on the item.

Disposition: C2-2 stays a BLOCKER, but the fix must be described as *pointer activation*, and the
touch cure has to be C3-4's flat list, not merely deleting the modifier.

---

## C3-8 — INFO (correction to C2-8): six e2e items, not two — and the a11y gate cannot see C3-2 or C2-9

Pass 2's infrastructure claim is **confirmed**:

```
$ grep -rn "@vue/test-utils" test demo e2e
(no output)
$ grep -rln "mount(" test demo/test
(no output)
```

Its coverage count is **wrong**. Six specs open this menu and six *distinct items* are asserted:

```
e2e/smoke/flows/palette-edit.spec.ts:48        getByRole("menuitem", { name: /Rename/ })
e2e/smoke/flows/palette-delete.spec.ts:48      getByRole("menuitem", { name: /^Delete$/ })
e2e/smoke/flows/palette-fork.spec.ts:48        getByRole("menuitem", { name: /Remix/ })
e2e/smoke/flows/palette-flag.spec.ts:44        getByRole("menuitem", { name: /Report/ })
e2e/smoke/admin/flows/palette-feature.spec.ts:48  getByRole("menuitem", { name: /^Feature$/ })
e2e/smoke/oracles/o10d-…census.spec.ts:328     getByRole("menuitem", { name: /Versions/ })
```

Uncovered: `Save`, `Publish`, `makePublic`, `makePrivate`, `editTags`, `adminDelete`, and all five
Export items — 11 of 17, including every path C2-3, C2-4 and C2-5 live on.

```
$ grep -rn "SVG Swatch\|PNG Swatch\|Tailwind Config\|CSS Custom Properties\|exportJSON" e2e src test
(no output)
```

The sharper correction is *why the a11y defects are green*. `e2e/smoke/admin/fixtures/a11y-battery.ts`
is a real, live, four-leg WCAG battery over this surface. Its accessible-name leg (`:14-17`, `:78-105`)
asserts **non-empty**:

```
1. accessible-name — every VISIBLE operable control … resolves a NON-EMPTY accessible name
```

`"Palette menu"` × 6 is non-empty. `"Make private PUBLIC"` is non-empty. `"Versions 3"` is non-empty.
There is no leg for name uniqueness and no leg for name-matches-the-verb, so the battery is a green
gate over both C3-2 and C2-9 by construction.

### Exact mutations that keep every gate green (pass-2's list, re-verified, plus three)

1. Delete `:107-130` — the entire `<DropdownMenuSub>` family. Nothing references it. All green.
2. `const isPublic = computed(() => true)` — no test renders the other branch.
3. `const apiOffline = computed(() => false)` — no test degrades the latch.
4. **Delete both `style="font-variant: small-caps"` attributes** — provably no rendered difference
   (C3-1). All green.
5. **Change `:9`'s `DropdownMenuLabel` to render nothing** — the palette name is asserted nowhere.
6. **Delete `class="text-caption"` from `:112`** — this one is a *fix*, and no gate would notice
   either way.

---

## Pass-1 / pass-2 findings re-tested this pass

| id | what I did | outcome |
|---|---|---|
| **C2-1** dead actions | re-ran with a fresh 5-palette seed, subject + control in one run (`pcm-p3-e.mjs`) | **REPRODUCED.** `/#/mix`: `storeBefore 5 → storeAfter 5`, `cards 5`, `menus 0` (the menu closed, so the user believes it worked), no console line beyond the standing misconfig warning. `/#/palettes` control: `5 → 4`, `cards 4`. |
| **C2-2** `@click.prevent` | two new pointer reproductions + a keyboard test | **CONFIRMED, scope corrected** → C3-7 |
| C2-3 export injection | source re-read: `demo/palettes/export.ts:66` `fill="${c.css}"` and `:73` `>${palette.name}<` are raw interpolations; `exportAsPNG:84` re-serialises the same string | **CONFIRMED on source.** I did not re-run pass-2's hostile-payload download; its probe and captured file body stand. |
| C2-4 `misconfigured` | observed live on this session's server | **CONFIRMED** — `::consoleSinceStart` still carries `"[value.js] value.js dev is MISCONFIGURED: http://localhost:9000 has no VITE_API_URL …"`, and `Publish` renders with `ariaDisabled: null` |
| C2-5 `unlisted` | source + C3-5 | **CONFIRMED**, cure cheapened |
| C2-6 rename focus race | source re-read: `PaletteCard.vue:317` `if (action !== "rename") menuOpen.value = false` guards a branch whose handler `startRenaming()` (`:280-283`) sets `menuOpen.value = false` on line 1 | **CONFIRMED** (dead guard); pass-2's 212 ms trace stands |
| C2-7 nested interactive | re-measured at a different seed size | **CONFIRMED, scales 1:1** — `::E0_mixState { cards: 5, nestedButtons: 5, triggers: 5 }`. `MixSourceSelector.vue:246-268`: `<button v-for …><PaletteCard … /></button>`, no handlers bound. |
| C2-8 vacuous gate | re-ran the greps | **infrastructure claim CONFIRMED, count corrected** → C3-8 |
| C2-9 annotation in the name | AX re-read | **CONFIRMED and extended to three items** — `"Make private PUBLIC"`, `"Publish OFFLINE"` (pass 2), and `"Versions 3"` (`::B3_axMenuItems`), the third from `:101`'s count span |
| C2-11 `tier` collapse | source | **CONFIRMED** — `:159-161`, `types.ts:42` is 3-state |
| C2-12 per-instance overrides | source + C3-1 | **CONFIRMED and upgraded** — the overrides are also no-ops |
| C2-14 unconfirmed delete | re-measured | **CONFIRMED** — `::E3_deleteOnPalettes_CONTROL { storeBefore 5, storeAfter 4, confirmDialogs: 0 }` |
| C2-16 no visual coverage | REPORT.json re-read | **CONFIRMED** — `/#/palettes` desktop `namelessButtons: 1`, mobile `0`; no `Palette menu` row in any of the 8 matrices |

---

## Negative results this pass (probed, found sound — do not re-litigate)

| claim | measurement | verdict |
|---|---|---|
| the trigger's `as-child` forwarding drops ARIA onto the wrong node | `::A1_triggerAttrs` → `BUTTON` with `aria-haspopup="menu"`, `aria-expanded="true"`, `aria-controls="reka-dropdown-menu-content-v-1-8"`, `data-state="open"`, `id`, `type="button"`, `36×36` | **correct** |
| the palette name is absent from the AX tree entirely | `::A3_paletteNameReachable true` — it is present, as `StaticText` under a `generic` | **present but unreachable in menu mode** (C3-2) |
| a disabled item can be activated by keyboard because the handler is `@click`, not `@select` | `MenuItem.js` keydown guards `if (_ctx.disabled …) return` before `event.currentTarget?.click()`, and `handleSelect` guards `!props.disabled`; reka also sets `pointer-events: none` via `data-disabled` | **guarded** |
| `@click` items double-fire (reka's `onPointerup` synthesises a second click) | `MenuItem.js` — `onPointerdown` sets `isPointerDownRef = true`, `onPointerup` synthesises only `if (!isPointerDownRef.value)`; a normal press-release on the item fires exactly one click | **single fire** |
| the item list can render empty for some `kind × isOwned × isAdmin` | enumerated all six reachable combinations from `demo/palettes/utils.ts:18` (`"temporary" \| "saved" \| "remote"`) — the smallest set is `temporary` → Save / Rename / Export | **never empty** |
| `PaletteCardGrid` keys by index, so an open menu migrates to another palette on re-sort | `BrowsePane.vue:98` `:key="palette.slug"`, `PalettesPane.vue:84` `:key="palette.id"` | **keyed by identity** |
| `isOwned` is true for everyone when logged out (`undefined === undefined`) | `useUserAuth.ts:31,61` — `slugRef` is `ref<string \| null>(safeGetItem(…))`, so `pm.userSlug.value` is `null`, and `palette.userSlug` is `undefined`; `undefined === null` is false | **sound** |
| opening the menu inside `/#/mix`'s selection `<button>` flips the selection | `::E1_selectionOnMenuOpen` — `pressedBefore` and `pressedAfterOpen` identical (`["false","false","true","false","true", …]`); `PaletteCard.vue:82` `@click.stop` holds | **sound** (the nesting is still C2-7) |
| the menu or submenu causes horizontal page overflow on mobile | `::C1_menuOnly` / `::C2_menuPlusSubmenu` → `docScrollW 390`, `innerW 390`, `horizontalOverflow false`; both surfaces `overflowsRight/Left/Bottom: false` | **no page overflow** (the occlusion is C3-4) |
| tap targets below the 24 px floor | `::A8_menuShape` items `178 × 44`; `::C2` submenu items `287 × 44`; trigger `36 × 36` desktop | **PASS** |
| `verbatimModuleSyntax` (edict 8) | `:177` `import type { Palette }`, `:178` `import type { PaletteKind }`; every other import is a value import | **PASS** |
| god module (edict 1) | 228 lines, 2 computeds, no local state, one job | **PASS** |
| the six known local hazards | no `defineModel`, no oklch/HSV, no `ValueUnit` wrapping, no slider pointer-capture, no WebGL, no parsing in this file | **none present** |
| page errors attributable to this component | `::pageErrors []` / `::errs []` across all five pass-3 probe runs | **PASS** |

---

## Strongest defect

**C2-1 remains the strongest, and I reproduced it independently** — a destructive verb that silently
does nothing, `5 → 5` on `/#/mix` against `5 → 4` on `/#/palettes` in the same run on the same build,
with `menus: 0` afterwards so the dismissal itself reads as success.

**Of the six new rows, C3-1 is the strongest**, and it is the one I would put in front of the owner
first, because it is a different *kind* of failure than anything the first two passes found. C2-1 and
C2-2 are wiring: something was supposed to be connected and is not. C3-1 is a design decision that
was ratified, named `K-INV5`, commented three times in this file, given a token vocabulary, carried
through two tranches of prose — and has never once rendered a single small capital. `55.266 px`
with the declaration; `55.266 px` without it; `39.094 px` if you remove the utility standing in
front of it. Every gate in the repo is green on it, and *would stay green if the declaration were
deleted*, because nothing in this codebase can currently assert what a component looks like. That is
the mega-tranche's real exposure: the audit trail proves the design was decided, and the pixels prove
it was never delivered.

---

## Probe artefacts (all new this pass)

Under `docs/tranches/V/megatranche/audit/components/PaletteCardMenu/evidence/pass-3/`:

| file | what it decides |
|---|---|
| `pcm-p3-a.mjs` / `-results.json` | trigger ARIA forwarding; duplicate-name census; the open menu's AX subtree; the `.fira-code` cascade dump; keyboard reach of the submenu; a synthetic mouse click on the sub-trigger; menu geometry |
| `pcm-p3-b.mjs` / `-results.json` | **C3-1** — the shipped annotation span measured against three single-property clones, plus a four-span synthetic control; the AX names of a real owned-remote menu |
| `pcm-p3-c.mjs` / `-results.json` | iPhone-14 geometry: menu + submenu rects, overlap area, viewport overflow; a real `tap()` on the sub-trigger |
| `pcm-p3-d.mjs` / `-results.json` | **C3-3** — computed typography of every item on both surfaces, plus the two utilities in isolation |
| `pcm-p3-e.mjs` / `-results.json` | independent re-reproduction of **C2-1** with a matched control; `/#/mix` nested-button count; selection-state isolation |
| `mobile-menu.png`, `mobile-submenu.png` | the 390 px surfaces — C3-3's italic split and C3-4's occlusion, both visible |

Reproduce with the dev server up: `node docs/tranches/V/megatranche/audit/components/PaletteCardMenu/evidence/pass-3/pcm-p3-<a|c|d|e>.mjs`.
`pcm-p3-b.mjs` needs the LAN host (`PROBE_HOST=http://<lan-ip>:9000`, default `http://192.168.1.166:9000`)
because `localhost` is `misconfigured` (`demo/platform/transport/availability.ts:106-110`), which
short-circuits the transport before any request is issued and makes `page.route()` stubbing
impossible.

No file under `src/`, `demo/`, `api/`, `test/`, `e2e/`, `docs/tranches/V/vnext/`, `scripts/dev/dev.sh`
or any `INBOX.md` was modified. The only repo writes are this report, the preserved
`challenge-C-implementation.pass-2-2026-07-28.md`, and `evidence/pass-3/`.
