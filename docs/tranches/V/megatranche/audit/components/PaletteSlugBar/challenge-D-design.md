# CHALLENGE-D — `PaletteSlugBar.vue` · design axis

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context arm. This is
the tier this seat was spawned with, declared explicitly in the seat brief, not inherited from a
parent session. Not Fable, not Sonnet, not Haiku.

Subject: `demo/palettes/browser/slug/PaletteSlugBar.vue` (243 lines).
Base: `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
Prior run of this seat preserved verbatim at `./challenge-D-design.run-1.md`.
Probes reproduced in `./probes/` (see §9 for exact invocations).

---

## 0. Verdict

**DEFECTIVE — BLOCKER.**

The premise handed to this seat was "the design is wrong." The finding is narrower and worse: **this
component has no design, because it has no place.** Two independent facts establish it, and every
other defect below is a consequence of them.

1. **It renders on zero routes.** There is no `<PaletteSlugBar` tag anywhere in the tree. Its only
   remaining references are a barrel re-export and a *type-only* import.
2. **The ratified topology says its job belongs somewhere else.** `VISUAL-CONSTITUTION.md:222` —
   *"Account is one modal side Dialog opened from the Dock, not a route chassis or second main. It
   owns registration/recovery when signed out and identity, recovery-credential rotation and logout
   when active."* An inline identity/login/logout bar sitting in the `My Palettes` pane header is
   neither the Dock nor the Dialog. It is constitutionally homeless.

The most damaging consequence is **D-2**: the component's login form **cannot submit**. Its
`@submit.prevent` handler is bound to an `<input type="search">` — an element that can never receive
a `submit` event — because glass-ui 7.0.0's `SearchBar` is `inheritAttrs: false` and spreads `$attrs`
onto its inner input rather than its root. The `<form>` therefore has *no* submit listener, so a real
browser performs an **unprevented native form submission** and reloads the SPA. That regression
landed in the glass-7 adoption commit `f2c8f565` and has never been observed, because the component
it broke is not on screen anywhere.

This is the shape of the whole file: a login journey that rotted in the dark. Fourteen findings
follow; nine are reproduced with pasted output or measured numbers.

---

## 1. Visual truth first

### 1.1 The instruction, and the honest answer

The brief says: open the Safari captures for this component's routes, desktop and mobile, light and
dark, and say what is ugly. I did. **The component appears in none of them, because it is on no
route.** Reporting "it looks fine" would be the false negative this seat exists to prevent; so the
visual section is a *negative* proof plus what actually occupies the space.

| capture read | what the identity region actually contains |
|---|---|
| `visual/shots/safari-desktop-light/palettes.png` | `My Palettes` (Fraunces, pastel `Palettes`), the italic sub-line, `Search your palettes…`, the dashed `Start a new palette` tray, the `EMPTY PLATE` mark, `No saved palettes yet.` **No slug pill, no identity row, no account affordance inside the pane.** The only account control on screen is the dock's `Login` pill — that is `demo/shell/dock/menus/ProfileSection.vue:111`, a different component. |
| `visual/shots/safari-mobile-dark/palettes.png` | Same pane, single column, dark plate. **No account affordance visible at all.** It is folded behind the dock's vertical `⋮` (`MobileMenuDropdown.vue`). |

Both images were read directly (I have vision; I looked). The desktop capture also confirms the
horizontal-overflow column in `REPORT.md:120` — `/#/palettes` overflowX = 0 — so nothing this
component would have contributed is visible in the measured page either.

### 1.2 The measured absence, from the audit's own data

```
$ grep -rn "PaletteSlugBar" --include="*.vue" --include="*.ts" . | grep -v node_modules | grep -v docs/tranches
demo/palettes/useSlugMigration.ts:6:import type { PaletteSlugBar } from "./browser/slug";
demo/palettes/useSlugMigration.ts:30:    const slugBarRef = ref<InstanceType<typeof PaletteSlugBar> | null>(null);
demo/palettes/browser/index.ts:44:export { PaletteSlugBar } from "./slug";
demo/palettes/browser/slug/index.ts:3:export { default as PaletteSlugBar } from "./PaletteSlugBar.vue";
```

Four hits. Two are barrels. One is `import type` — it contributes **no runtime import**, so the
component is not even in the bundle graph through it. The fourth is a template ref declared for a
component that is never rendered.

```
$ grep -c "PaletteSlugBar\|slug-pill" docs/tranches/V/megatranche/audit/visual/STATES.json
0
```

```
$ git log --oneline -5 -- demo/palettes/browser/slug/PaletteSlugBar.vue
f2c8f565 feat(v-w44)!: adopt @mkbabb/glass-ui 7.0.0 across the demo consumer surface
a61094e3 feat(v-w43b3)!: home the feature UI trees; demo/@ dies (D-c)
```

The file was *modernised* to glass-ui 7 (`f2c8f565`, 2026-07-17) after its host had already gone. It
has been maintained as live code for eleven days while being unreachable.

### 1.3 The design that *did* ship, three times over

The job this component claims is discharged by three live siblings, in the Dock, where the
constitution puts it:

| live component | what it owns | primitives |
|---|---|---|
| `demo/shell/dock/menus/ProfileSection.vue` | desktop identity: `Profile` trigger, slug pill, Copy/Switch/Logout/Regenerate | glass-ui `Button`, `DropdownMenu*`, `DockSeparator`, **`useSafeAccentFn`** |
| `demo/shell/dock/layers/SlugEditLayer.vue` | the slug/token entry form as a dock *layer* | glass-ui `DockControl`, `DockSeparator`, `useTemplateRef` |
| `demo/shell/dock/menus/MobileMenuDropdown.vue` | the same identity folded into `⋮` on coarse pointers | `slug-pill` + dock menu rows |

So the design question is not "is this bar pretty." It is: **why does a fourth, divergent,
unreachable implementation of the account surface exist at all?** Every finding below is a place
where the orphan drifted away from the three that ship.

---

## 2. D-1 · BLOCKER — the component contradicts the ratified topology and has no render path

**Defect.** An inline account bar in a route pane is not an admitted composition. The constitution
enumerates the eighteen compositions and assigns Account to *one modal side Dialog opened from the
Dock* (`VISUAL-CONSTITUTION.md:222`), with `W23` owning the rendered composition. It further closes
the member-route inventory (`§3.1`, line 58) and gives `Library / My Palettes` the region budget
`owner-state selector, library, selected inspector` — no identity row. `PROPORTION-AUDIT.md §5.2`:
*"A card has one protagonist, one identity line, and at most one persistent action/status region."*
This bar adds a **second, unrelated identity line** (the user's slug) above the pane's real identity
line (`My Palettes`), inside the same header block (measured host: `DIV.pane-header.px-4.sm:px-6`).

**Evidence.** `VISUAL-CONSTITUTION.md:222`, `:44-45`, `:58`; `PROPORTION-AUDIT.md:67` (§5.2);
grep output in §1.2; screenshots in §1.1.

**Reproduction.** `grep -rn "<PaletteSlugBar" demo/` → 0 results. Load `http://localhost:9000/#/palettes`
in any matrix and the identity region is absent (see the two captures).

**Mechanism.** The composition was authored before the topology was ratified, its host was deleted
at `a61094e3`, and nothing structural noticed: a barrel export keeps the module "used", and the one
remaining consumer reference is `import type`, which TypeScript erases. There is no gate that fails
on "exported, never rendered."

**Cure (architectural, not a patch).** Delete the file, `demo/palettes/browser/slug/`, and
`demo/palettes/browser/index.ts:44`. Move the *one* thing worth keeping — an authored error surface
for failed sign-in (see D-3) — into the constitution's Account Dialog under `W23`, where the Dock
already hosts the trigger. Do not "re-home" the bar; the bar is the defect.

---

## 3. D-2 · BLOCKER — the login form cannot submit; the glass-7 migration silently severed it

**Defect.** `PaletteSlugBar.vue:5-15` binds the submit handler on the `SearchBar` component:

```
<SearchBar v-if="slugEditMode" ref="searchBarRef" key="slug-edit" tag="form"
    v-model="slugInput" :icon="LogIn" placeholder="enter slug..."
    @submit.prevent="onSlugSwitch"
    @keydown.escape.stop="slugEditMode = false">
```

glass-ui 7.0.0's `SearchBar` is `inheritAttrs: false` and merges `$attrs` (minus `class`) onto its
inner `<input type="search">`, not onto the root element that `tag="form"` produces:

```
# node_modules/@mkbabb/glass-ui/dist/search.js — SearchBar definition
inheritAttrs: !1,
__name: "SearchBar",
...
b("input", w({ ref_key: "inputRef", ref: s, type: "search" }, o.value, {   /* o.value = $attrs minus class */
    value: e.modelValue, placeholder: e.placeholder, class: "input-bar-field",
    onInput: ... }), null, 16, Q),
```

So `onSubmit` lands on an `<input>`. An `<input>` never fires `submit`. The `<form>` has **no submit
listener at all**, so the browser's default action for the `submit` event — navigation — is never
prevented.

**Evidence / reproduction** (`probes/submit.test.ts`, `probes/submit2.test.ts`):

```
[dom] form tag = FORM  input type = search
[dom] form attrs = data-v-e6a0327e,class,data-surface
[dom] input attrs = type,placeholder,class,value
[A] submit on <form> -> switchSlug emitted = null
[B] submit on <input> -> switchSlug emitted = [["brave-amber-quiet-fox",false]]

[btn0] type="submit" aria-label="Sign in with slug" disabled=""
[btn1] type="button" aria-label="Cancel slug edit" disabled=null
[slot] buttons render inside <form>? = 2
Error: Not implemented: HTMLFormElement.prototype.requestSubmit
[click] clicking control 0 (the intended submit)…
[click] switchSlug emitted = null
[click] slugEditMode still true = true
```

`[A]` dispatches a real cancelable `submit` on the `<form>` — **nothing fires**. That is proof of
absence of a form listener (Vue attaches via `addEventListener`, so attribute absence alone would
not be). `[B]` dispatches `submit` directly on the input — the handler fires, proving where the
binding actually went. `[C]` clicks the genuine `type="submit"` button that renders inside the form:
jsdom stops at `requestSubmit`, and `switchSlug` is still unemitted, edit mode still open.

**Real-browser consequence** (mechanism, from the HTML spec rather than a probe): `requestSubmit` /
Enter fires `submit` on the `<form>`; with no listener nothing calls `preventDefault()`; the form has
no `action`, so the default action is a GET navigation to the current URL. The hash-routed SPA
reloads and the typed slug is discarded. There is no path by which `onSlugSwitch` runs.

**Mechanism.** The component previously hand-rolled its own `<form>` + `<input>`; `f2c8f565` swapped
in the producer's `SearchBar` for casing. `SearchBar`'s attribute-forwarding contract makes it a
*field*, not a *form host*, but it accepts `tag="form"` without objecting, so the consumer's
`@submit` silently relocates. Typechecking cannot catch it: `onSubmit` is a legal fall-through attr.
The live sibling `SlugEditLayer.vue:76-79` writes a **real `<form @submit.prevent>`** with a plain
`<input>` and is therefore correct — the orphan is the only site that adopted `SearchBar` for a form.

**Cure.** The producer contract is the defect surface: `SearchBar` should either refuse `tag="form"`
or route non-input listeners to its root (a glass-ui BH/BI relay item, per the standing edict). At
the value.js altitude, the composition is wrong anyway — a *search* field is not the idiom for a
credential entry (see D-9). The Account Dialog should own a real `<form>` with a real
`<input autocomplete=…>`, exactly as `SlugEditLayer` already does.

---

## 4. D-3 · MAJOR — the failure state collides, clips, and is announced to nobody

Three independent defects in one four-line element (`PaletteSlugBar.vue:124-126`):

```
<p v-if="slugError" class="absolute left-0 -bottom-4 text-mono-small text-destructive whitespace-nowrap">
```

### 4.a It overlaps the following content by 8px at every viewport

Measured in the **real cascade** on the live dev server, with the bar's exact class string hosted
inside `main` and a 40px block placed after it (`probes/geom.mjs`):

```
### desktop-1440 (viewport 1440x900)   errOverlapsFollowing: 8   errOverflowsBarBox: 16
### mobile-390  (viewport 390x844)     errOverlapsFollowing: 8   errOverflowsBarBox: 16
### narrow-320  (viewport 320x640)     errOverlapsFollowing: 8   errOverflowsBarBox: 16
```

Arithmetic: the root reserves `min-h-9` (36px) and `mb-2` (8px measured `marginBottom: "8px"`); the
error is `absolute` with `bottom: -1rem` (−16px) and a 19.59px line box. It therefore ends **16px**
below the bar's border box while only **8px** of margin exists — an 8px overlap, invariant across
all three arms. `PROPORTION-AUDIT.md §5.3`: *"Renderer, icon or touch footprints may reserve
collision space only on the axis where collision exists."* Here the collision axis is reserved at
half the required amount.

### 4.b A real server message is 758px wide inside a 286px host, and is silently clipped

`PaletteSlugBar.vue:221` — `else slugError.value = msg || "Login failed"` — puts an **arbitrary
server string** into an absolutely-positioned `whitespace-nowrap` element. Measured against the
component's actual historical host, the `My Palettes` `pane-header` (`probes/geom2.mjs`):

```
### desktop-1440 { hostTag: "DIV.pane-header.px-4.sm:px-6", hostWidth: 510,
  shortErrW: 312.88, shortErrOverflowsHost: -173.13,
  longErrW: 888.13,  longErrOverflowsHost:  402.13, longErrOverflowsViewport: 202.13 }
### narrow-320   { hostTag: "DIV.pane-header.px-4.sm:px-6", hostWidth: 286,
  shortErrW: 267.08, shortErrOverflowsHost:   -2.92,
  longErrW: 758.16, longErrOverflowsHost:  488.16, longErrOverflowsViewport: 471.16 }
```

Two things to read here. First, the *shortest authored* message —
`"Already signed in as this slug."` — fits its host at 320px with **2.92px of slack**: one character
of copy revision and the shipped string bleeds. Second, the realistic API title (the API's own words,
e.g. `"Rate limit exceeded: too many sign-in attempts…"`) measures **758px in a 286px host — 488px
of overflow, 471px past the viewport.** `document.scrollWidth` stayed at 320, so an ancestor clips
it: the user is shown a *truncated* error and the actionable half is discarded. `whitespace-nowrap`
makes wrapping — the one thing that would fix it — impossible by construction.

### 4.c It is a color-only failure state with no role, no live region, no association

`probes/mount.test.ts`:

```
[error] exists = true  attrs = {"data-v-e6a0327e":"","class":"absolute left-0 -bottom-4 text-mono-small text-destructive whitespace-nowrap"}
[error] tree has role=alert|status = false
[error] tree has aria-live = false
[error] tree has aria-invalid = false
[error] tree has aria-describedby = false
```

`VISUAL-CONSTITUTION.md:83` — *"Selected, failed, pending, withdrawn and disabled states are never
color-only. Role, accessible name, state/value and associated error/status are explicit."* This
error is `text-destructive` and nothing else: no icon, no role, no `aria-live`, no `aria-invalid` on
the field, no `aria-describedby` linking field to message. In forced-colors mode
`text-destructive` is overridden to the system text color, so the *only* signal disappears entirely.
`/palettes` was never captured in the forced-colors matrix (see D-14), so this has never been seen.

**Cure.** The error belongs in normal flow beneath the field, wrapping, `role="alert"`, with
`aria-invalid` + `aria-describedby` on the input, and copy authored by the app rather than passed
through from the transport. That is the Account Dialog's job under `W23`, with `W15` supplying auth
state — `PROPORTION-AUDIT.md` PR-08 already owns exactly this row (*"Pending/failure/export/recovery
truth only transient → ADD-AFFORDANCE, Primary W23"*).

---

## 5. D-4 · MAJOR — the slug pill wears raw uncertified ink; 82–93% of picks fail the app's own floor

**Defect.** `PaletteSlugBar.vue:47-52` paints the live picked color straight onto text and border:

```
<span class="slug-pill cursor-help" :style="{ color: cssColorOpaque, borderColor: cssColorOpaque }">
```

The repo *already fixed this exact bug elsewhere and documented it*. `ProfileSection.vue:22-31`:

> `D6 (T.W3-5 / A11Y-F2): the live-color identity keeps its voice but wears CERTIFIED ink — the raw
> pick as text/border measured ≤1.28:1 on the real menu ground for roughly half of all picks per
> scheme.`

Nine sites consume `useSafeAccentFn`; `PaletteSlugBar` is not one of them:

```
$ grep -rln "useSafeAccentFn" demo/
demo/workbenches/gradient/GradientVisualizer/easing/useSpecimenRows.ts
demo/workbenches/extract/ExtractControls.vue
demo/scenes/about/ColorNutritionLabel.vue
demo/shell/dock/menus/MobileMenuDropdown.vue
demo/shell/dock/menus/ProfileSection.vue
demo/color-session/useContrastSafeColor.ts
demo/color-session/keys.ts
demo/color-picker/composables/boot/useAtmosphereBoot.ts
demo/palettes/browser/card/PaletteCard/PaletteCard.vue
```

**Measured** — `probes/ink-sweep.test.ts` sweeps 1728 realistic picks (L 0.35→0.95 × C 0.05→0.30 ×
H 0…345/15°), computes WCAG 2.x contrast independently of the app's own predicate, and asks the app's
own `certifyAccentInk` whether it would move each one. Surface = the `resting` plate rung the pill
sits on, via the app's own `resolveSurfaceLightness`. Floor = the app's own
`TEXT_CONTRAST_FLOOR + CERTIFY_HEADROOM` = **5.75**.

```
[SWEEP light-ambient-0.75] restingL=0.8955 n=1728 fail(<5.75)=1421 (82.2%) median=2.60:1 worst=1.00:1 @ oklch(0.90 0.05 45)
[SWEEP light-ambient-0.75] certifyAccentInk would MOVE 1621/1728 (93.8%)
[SWEEP light-ambient-0.51] restingL=0.8115 n=1728 fail(<5.75)=1610 (93.2%) median=1.98:1 worst=1.00:1 @ oklch(0.80 0.10 195)
[SWEEP light-ambient-0.51] certifyAccentInk would MOVE 1685/1728 (97.5%)
[SWEEP dark-ambient-0.35]  restingL=0.3103 n=1728 fail(<5.75)=1193 (69.0%) median=3.71:1 worst=1.04:1 @ oklch(0.35 0.25 270)
[SWEEP dark-ambient-0.35]  certifyAccentInk would MOVE 1534/1728 (88.8%)
[SWEEP dark-ambient-0.22]  restingL=0.2739 n=1728 fail(<5.75)=1104 (63.9%) median=4.20:1 worst=1.17:1 @ oklch(0.35 0.25 270)
[SWEEP dark-ambient-0.22]  certifyAccentInk would MOVE 1506/1728 (87.2%)

[CASE] plate L=0.8955
[CASE] RAW  oklch(0.80 0.15 60)  -> 1.42:1  (PaletteSlugBar.vue:49)
[CASE] CERT oklch(44.480782728642% 0.10431327346 60deg) -> 5.75:1  (ProfileSection.vue:31)
```

Median contrast for the pill on a light plate is **1.98–2.60:1**; the worst cases are **1.00:1** —
literally invisible. An ordinary warm pick renders the user's own identity at **1.42:1** where the
certified path gives **5.75:1**. And this ink is the border too, so the pill's *boundary* vanishes
with the text, taking the "pill" reading with it. The dark scheme is better but still fails 64–69%.

Corroborated live: the geometry probe read the pill's computed style back as
`color: "oklch(0.8 0.15 60)"` — the raw value, unmodified, in the real cascade.

`VISUAL-CONSTITUTION.md:82` — *"Text, focus, boundaries and state meet their rendered contrast on the
actual material tier; a token name is not evidence."*

**Cure.** There is no new mechanism to invent: `useSafeAccentFn("resting")` exists, is the ratified
D6 idiom, and is already wired at nine sites. The orphan simply never received the fix — which is
precisely what happens to code no one can see.

---

## 6. D-5 · MAJOR — hover-only help on a non-focusable `<span>`, with the producer's hover-intent delay overridden to zero

**Defect.** `PaletteSlugBar.vue:45-60` wraps the pill in `<Popover trigger="hover" :close-delay="0"
:open-delay="300">` and makes the trigger a bare `<span class="slug-pill cursor-help">`.

**Measured** (`probes/mount.test.ts`) — the rendered trigger:

```
[trigger] tag = SPAN
[trigger] tabindex = null
[trigger] role = null
[trigger] aria-label = null
[trigger] aria-expanded = null
[trigger] all attrs = {"data-v-e6a0327e":"","class":"slug-pill cursor-help","data-state":"closed",
                       "data-grace-area-trigger":"","style":"color: oklch(0.8 0.15 60); border-color: oklch(0.8 0.15 60);"}
```

No `tabindex`, no `role`, no accessible name, no `aria-expanded`. `as-child` forwards `data-state`
and handlers but does not synthesize focusability. Consequences:

- **Keyboard:** the "Your slug — This is your unique identity…" explanation is unreachable. It is the
  only place the app explains what a slug *is*.
- **Touch:** glass-ui's Popover is pointer-adaptive — `popover-BQGYXZyO.js` computes
  `matchMedia("(pointer: coarse)").matches` and, on coarse pointers, falls back from the hover root
  to the **click** root. So on mobile the `<span>` becomes an *operable control* with no role, no
  name, and no focus — `PROPORTION-AUDIT.md §5.5`: *"Decorative controls and operable ornaments
  without names are forbidden."*
- **Hover intent:** the producer's default is 150ms, deliberately —

  ```
  $ grep -rn "closeDelay" node_modules/@mkbabb/glass-ui/dist/*.js
  node_modules/@mkbabb/glass-ui/dist/popover-BQGYXZyO.js:23:  closeDelay: { default: 150 },
  ```

  The component overrides it to **0**. With a `sideOffset` gap between trigger and content, moving
  the pointer toward the panel to read it dismisses it. A 300ms wait to open and a 0ms dismissal is
  a hostile pairing, and it is a **per-instance override of a producer-tuned default** — the edict-5
  failure mode in its exact form.

This is `PROPORTION-AUDIT.md` **PR-07** named verbatim: *"Hover-only/unlabeled controls and invisible
drag state → ADD-AFFORDANCE / REMOVE."*

**Cure.** PR-07's disposition ordering applies — *"Subtraction precedes explanation"* (§5.6). A slug
does not need a hover essay next to it; the Account Dialog is where identity is explained, once, as
prose. If a trigger survives, it is a named `<button>` and it keeps the producer's delays.

---

## 7. D-6 · MAJOR — every operable target is under the audit harness's own floor

Measured in the real cascade (`probes/geom.mjs`), invariant across 1440 / 390 / 320:

| control | source | measured | floor |
|---|---|---|---|
| three-dot account menu | `:84` `p-1` + `w-3.5 h-3.5` | **22.00 × 22.00** | < 24 (harness), ≪ 44 (touch) |
| `Login` pill | `:71-78` `px-3 py-1 text-mono-small` | 89.08 × **29.59** | ≪ 44 (touch) |
| slug pill (hover trigger, click on coarse) | `:47` `.slug-pill` = `px-2 py-0.5` | 198.94 × **25.59** | ≪ 44 (touch) |

The audit's own harness defines the floor it fails: `visual/capture.mjs` —
`.filter((m) => m.w < 24 || m.h < 24)`. The three-dot trigger is 22×22 and would be counted as a
`smallTapTargets` defect on any route that rendered it. The component is the only reason it never
was.

`PROPORTION-AUDIT.md` **PR-12** owns this family — *"Touch padding bloats/misaligns visual glyphs →
TIGHTEN, Primary W18"* — and §5.7 gives the cure precisely: *"Visual glyph size, operable target
size and layout reservation are separate quantities. Accessibility floors do not require bloated
visible chrome."* The 14px glyph is right; the seat must grow invisibly, not the pill.

---

## 8. Remaining findings

### D-7 · MAJOR — the pending state is structurally unrenderable, and would be frozen if it weren't

`onSlugSwitch` (`:198-225`) sets `slugSwitching = true`, and its `try` block contains **zero
`await`s** — measured:

```
[unused] awaits inside onSlugSwitch try-block = 0
```

`emit("switchSlug", …)` is synchronous; the host's handler (`useSlugMigration.onSlugSwitch`) is
async and un-awaited. Then `:215` sets `slugEditMode = false`, unmounting the form, and `finally`
resets `slugSwitching = false` — all in one synchronous block. So the `Loader2` spinner at `:26` and
the `aria-label="Signing in…"` at `:24` can never be observed. DOM-driven confirmation
(`probes/pending.test.ts`) samples the spinner across every microtask and macrotask boundary around
a real submit:

```
[dom] spinner presence timeline = before-submit:false  sync-after-trigger:false  microtask-1:false
                                  microtask-2:false  after-await-trigger:false  after-nextTick:false
                                  after-macrotask:false
```

And even if it were reachable, the global reduced-motion guard freezes it (`demo/styles/animations.css:183-192`):

```
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
```

`animate-spin` becomes a static circle glyph, `aria-hidden="true"`, sitting where an arrow was —
indistinguishable from the idle state. `VISUAL-CONSTITUTION.md:83`: pending is *"never color-only"*
and here it is not even color. **A designed state that no user can ever see is a design defect, not
dead code.**

### D-8 · MAJOR — dead legacy error-branching, plus auth normalization forked byte-for-byte

`:216-221` branches on HTTP-status *substrings* of an exception message:

```
if (msg.includes("409")) slugError.value = "Already signed in as this slug.";
else if (msg.includes("404")) slugError.value = "Slug not found.";
```

The repo already ruled this mechanism broken and replaced it. `useSlugMigration.ts:78-87`:

> `S.W2 W2-6: branch on the typed ApiProblem.status, not .message substrings — the server titles
> ("Already logged in as this user", "User not found", "Rate limit exceeded") never contain
> "409"/"404"/"429", so those branches matched nothing and the authored copy below never showed.`

`PaletteSlugBar` still carries the superseded version. It is also unreachable twice over: `emit` is
synchronous and cannot throw an `ApiProblem`, so the `catch` never runs at all. Two live spellings of
one decision = the **no-legacy-code** edict violated in its canonical form (dual path, masking
fallback, superseded mechanism retained).

Worse, the credential normalizer is duplicated verbatim:

```
$ diff <(sed -n '184,196p' demo/palettes/browser/slug/PaletteSlugBar.vue) \
       <(sed -n '25,37p'  demo/shell/dock/layers/SlugEditLayer.vue) && echo IDENTICAL
IDENTICAL: looksLikeSlug + normalizeTokenInput duplicated byte-for-byte
```

`looksLikeSlug` (the slug grammar) and `normalizeTokenInput` (the `ADMIN_TOKEN=…` / quote-stripping
admin-secret unwrapper) exist twice, in two files, in two trees. Admin-token parsing is the last
place in this app that should be forked.

### D-9 · MAJOR — a credential typed into a search field, with no mobile input hygiene

The rendered input carries exactly four attributes:

```
[dom] input attrs = type,placeholder,class,value
```

`type` is `"search"` — hardcoded by the producer (`search.js`: `b("input", w({… type: "search"}, …)`),
not choosable by the consumer. Consequences for a field that accepts an **admin secret token**
(`normalizeTokenInput` explicitly parses `ADMIN_TOKEN=<secret>`):

- no `autocomplete` → the UA is free to persist the value; `type="search"` specifically feeds
  datalist/search history, in plaintext.
- no `autocapitalize` → iOS Safari capitalizes the first character by default. The slug path
  survives (`:204` lowercases), but the **admin path does not**: `:213` forwards
  `normalizeTokenInput(raw)` with original casing. A correct token typed on iPhone fails, with no
  diagnosis (and, per D-3c, no announced error).
- no `autocorrect` / `spellcheck=false` / `inputmode` → autocorrect is live on a
  hyphen-delimited four-word slug.
- The placeholder says `"enter slug..."` (`:12`) while the parser accepts admin tokens. The live
  sibling says `"enter slug or token..."` (`SlugEditLayer.vue:84`). The orphan's copy contradicts its
  own grammar.

`VISUAL-CONSTITUTION.md §5` — *"every spatial action has a keyboard/numeric equivalent"* and §4.1's
explicit-state law both assume the field states what it accepts.

### D-10 · MINOR — motion is ad hoc: two press scales, one untokenized transition, one magic delay

- Two press amplitudes in one component: `active:scale-95` (`:73`, `:84`) and `active:scale-[0.98]`
  (`:91`, `:98`, `:106`, `:113`). `scale-[0.98]` is an arbitrary-value escape hatch — a magic number.
- `:73` uses bare `transition-colors` (Tailwind's default 150ms); `:84`/`:91`/`:98`/`:106`/`:113` use
  `transition-colors duration-fast`. Two timing idioms, same component, same interaction.
- In every case the transition property list is **colors only**, so the `scale` press is an
  untransitioned snap. `VISUAL-CONSTITUTION.md:139` — *"Spatial continuity uses one producer-owned
  glass-ui spring register."* A raw un-eased transform is not that register.
- `:176-181` gates the mode swap on a hardcoded `setTimeout(…, 50)` with the comment *"Delay to let
  the Popover fully close"*. `--duration-fast` is **0.2s = 200ms** (glass-ui `:root`), so 50ms does
  not cover the exit it claims to wait for; and under `prefers-reduced-motion` transitions collapse
  to 0.01ms, making the 50ms pure dead latency before focus lands. Motion timing coupled by a
  magic number, in the wrong direction, PRM-unaware.

The `vj-morph` family usage itself is **correct** and worth saying so: `name="vj-morph"
mode="out-in"` is the ratified family for one-surface-new-content (`animations.css:70-74` names
"slug bar" explicitly), it is globally PRM-guarded, it animates `opacity`/`transform`/`max-height`
rather than layout-forcing geometry, and the scoped block correctly declines to re-parameterise it.
This is the one axis where the file obeys the canon.

### D-11 · MINOR — type jurisdiction violated in both directions

`VISUAL-CONSTITUTION.md §4` closes the type matrix: *control or label → `text-small`, Plus Jakarta
Sans, non-bold*; *value/code/provenance → `text-mono-small`*; *prose/help → `text-prose`*.

- `:73` renders the control label **"Login"** as `text-mono-small font-bold` — Fira Code, bold.
  Measured live: `login: { fs: "14px", ff: "\"Fira Code\"" }`. A verb is not provenance. (The slug
  *itself* in `text-mono-small` is correct — that is a value.)
- `:56` renders the help paragraph as `text-caption`. `text-caption` is a real glass-ui utility but
  **not an admitted semantic role** in the closed matrix; help copy is `text-prose`.
- `PROPORTION-AUDIT.md §5.13` restates the same matrix as law, so this is doubly cited.

### D-12 · MINOR — dead public API surface

```
[unused] 'hasSavedPalettes' occurrences outside its declaration = 0
[unused] emit("copy") call sites = 0  / $emit('copy') = 0
[unused] declared emits = copy DECLARED
```

- `hasSavedPalettes: boolean` is a **required** prop (`:150`, no `?`) with zero uses. Every
  hypothetical host is compelled to compute and pass a value that is discarded.
- `copy: []` is declared in `defineEmits` (`:155`) and never emitted. The component instead calls
  `writeClipboard` itself (`:169`), so the host can never observe, announce, or confirm the copy —
  which is why the live `ProfileSection.vue:77` emits `copySlug` upward instead. The declared event
  is a promise the component does not keep.
- `:205` declares `const isAdmin = !looksLikeSlug(normalized)` inside `onSlugSwitch`, **shadowing
  the destructured prop `isAdmin`** from `:147`. One identifier, two meanings, one function apart.

### D-13 · MINOR — reaches past the design system, then styles per instance

- **Four hand-rolled menu rows.** `:89-118` repeats a ~110-character utility string four times to
  hand-build dropdown items inside a `Popover`:
  `class="flex items-center gap-2 px-3 py-1.5 text-small font-display rounded-sm hover:bg-accent active:scale-[0.98] active:bg-accent/70 transition-colors duration-fast cursor-pointer w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"`.
  glass-ui already ships `DropdownMenu`, `DropdownMenuContent`, `DropdownMenuItem`,
  `DropdownMenuLabel`, `DropdownMenuSeparator`, and the **live sibling uses them**
  (`ProfileSection.vue:70-90`, where each row is `<DropdownMenuItem class="text-small gap-2
  cursor-pointer">`). Edict 4 (glass-ui is the design system, reuse existing component-type names)
  and edict 5 (style at the root, not per instance) are both violated by the same four lines. A
  `Popover` is also the wrong *semantic* primitive for a command menu — the trigger even declares
  `aria-haspopup="dialog"` (`:84`) for what is a menu.
- **Two idioms for one recipe.** The admin pill uses Tailwind color utilities
  (`text-muted-foreground border-muted-foreground`, `:65`); the live sibling uses inline custom
  properties (`style="border-color: var(--muted-foreground); color: var(--muted-foreground)"`,
  `MobileMenuDropdown.vue:67`). `.slug-pill` is a shared recipe in `demo/styles/foundation.css:585`
  whose comment states *"Consumers set `color` / `border-color` per-instance via :style"* — so the
  orphan diverges from the recipe's own documented contract.
- **The shared recipe carries a forced-colors rider the orphan never tested.**
  `foundation.css:746` bumps `.slug-pill` to `border-width: 2px` under
  `prefers-reduced-transparency`. Untested here (D-14).

### D-14 · INFO — zero state coverage in every state matrix

```
$ ls visual/shots/forced-colors-desktop/ visual/shots/rtl-desktop/ visual/shots/zoom-200-desktop/
forced-colors-desktop: adminusers.png blob.png browse.png gradient.png picker.png
rtl-desktop:           adminusers.png blob.png browse.png gradient.png picker-postload.png picker.png
zoom-200-desktop:      adminusers.png blob.png browse.png gradient.png picker.png
```

`/palettes` is absent from all three. Combined with `STATES.json` = 0 hits and the component's
absence from all 60 Safari captures, the coverage table is:

| state | designed? | observed? |
|---|---|---|
| populated (slug), admin, logged-out, edit-mode, menu-open | yes | **never, anywhere** |
| loading / pending | authored, **unrenderable** (D-7) | never |
| error | authored, colliding + clipped + unannounced (D-3) | never |
| disabled | yes (`:23`, measured `disabled=""`) | never |
| focused | **no** — the pill trigger cannot take focus (D-5) | never |
| hovered | yes, with a 0ms dismissal (D-5) | never |
| pressed | yes, at two inconsistent amplitudes, untransitioned (D-10) | never |
| overflowing / truncated | **no** — `whitespace-nowrap` on an absolute box (D-3b) | never |
| RTL | **no** — `left-0` is a physical inset; the slug needs LTR isolation per §6.1 | never |
| reduced-motion | inherited guard; freezes the pending glyph (D-7) | never |
| forced-colors | **no** — the error's only signal is `text-destructive` (D-3c) | never |
| reduced-transparency | recipe rider at `foundation.css:746`, untested | never |
| zoom 200% / 400% | `--type-small` is a `vw` clamp; `-bottom-4` is fixed rem — the 8px collision worsens as text grows | never |
| empty | n/a | — |

Eleven interaction states designed, **zero ever rendered.** Note `left-0` at `:124` and
`align="end"` at `:88`: `VISUAL-CONSTITUTION.md §6.1` requires *"logical inline/block direction
follows the document"* for chrome and *"CSS strings, hex, slugs, IDs and provenance render in
LTR-isolated spans inside RTL prose"* — the physical `left-0` and the un-isolated slug both fail
that, unobserved.

### Adjacent, not mine — flagged for the library-heading seat

In `safari-desktop-light/palettes.png` the `Palettes` substring of `My Palettes` renders with the
pastel-rainbow identity; in `safari-mobile-dark/palettes.png` it reads as the same cream as `My`.
`VISUAL-CONSTITUTION.md:23` requires *"Both coordinates render in light and dark."* This belongs to
the Library-heading owner (W22), not to this component. Recorded as a cross-reference only.

---

## 9. Reproductions

All probes live at `docs/tranches/V/megatranche/audit/components/PaletteSlugBar/probes/`. Run from
the repo root with the dev server up at `http://localhost:9000`:

```
# D-4, the ink sweep (set environment to "node" in the config for this one)
npx vitest run --testTimeout=60000 --config probes/vitest.config.ts probes/ink-sweep.test.ts

# D-2 / D-3c / D-5 / D-7 / D-12, jsdom mount probes
npx vitest run --testTimeout=60000 --config probes/vitest.config.ts probes/submit.test.ts
npx vitest run --testTimeout=60000 --config probes/vitest.config.ts probes/submit2.test.ts
npx vitest run --testTimeout=60000 --config probes/vitest.config.ts probes/mount.test.ts
npx vitest run --testTimeout=60000 --config probes/vitest.config.ts probes/pending.test.ts

# D-3a / D-3b / D-6, real-cascade geometry against the live dev server
node probes/geom.mjs
node probes/geom2.mjs
```

`probes/vitest.config.ts` points `test.include` at the session scratchpad; repoint it at `probes/`
to run the copies in place. The geometry probes inject the component's exact class strings into the
live page — they never mutate the source tree. **No source edits landed from this seat.**

---

## 10. Disposition

| id | severity | defect | family |
|---|---|---|---|
| D-1 | BLOCKER | no render path; contradicts the Account-Dialog topology | orphaned composition |
| D-2 | BLOCKER | `@submit` bound to `<input>` by `SearchBar`'s `inheritAttrs:false`; form submits natively | producer-contract misuse |
| D-3 | MAJOR | error state: 8px collision, 488px clip, no role/live/association | unowned failure surface |
| D-4 | MAJOR | raw uncertified accent ink; 82–93% of picks below the 5.75 floor | missed D6 certification |
| D-5 | MAJOR | hover-only help on a non-focusable span; producer delay overridden to 0 | PR-07 |
| D-6 | MAJOR | 22×22 / 29.59px targets under the harness's own 24px floor | PR-12 |
| D-7 | MAJOR | pending state unrenderable, and PRM-frozen if it weren't | unreachable designed state |
| D-8 | MAJOR | superseded substring error-branching retained; auth normalizer forked byte-for-byte | legacy dual path |
| D-9 | MAJOR | admin secret in a `type="search"` field; no autocomplete/autocapitalize; iOS breaks the admin path | credential hygiene |
| D-10 | MINOR | two press scales, one untokenized transition, a 50ms magic delay | ad-hoc motion |
| D-11 | MINOR | mono+bold on a control label; `text-caption` for help prose | closed type matrix |
| D-12 | MINOR | required-but-unused prop; declared-but-never-emitted `copy`; shadowed `isAdmin` | dead public surface |
| D-13 | MINOR | four hand-rolled dropdown rows; two idioms for one pill recipe | design-system boundary |
| D-14 | INFO | zero coverage in the forced-colors / RTL / zoom-200 / STATES matrices | unobserved by construction |

**Recommended cure — one move, not fourteen patches.** Delete
`demo/palettes/browser/slug/` and the `demo/palettes/browser/index.ts:44` re-export. Retire
`slugBarRef` from `useSlugMigration.ts` (it is returned at `:121` but not even re-exported by
`usePalettePorts.ts`, which forwards only `onRegenerateSlug`/`onSlugSwitch` — so its four
`setError` calls at `:84-87` are already writing to `null`). Fold the one genuinely missing
affordance — a wrapping, `role="alert"`, field-associated sign-in error with app-authored copy —
into the constitution's single Account Dialog under `W23`, with `W15` supplying auth state, and
lift `looksLikeSlug`/`normalizeTokenInput` to one owner that both the Dialog and `SlugEditLayer`
consume.

The lesson generalises past this file: **the repo has no gate that fails on "exported, typechecks,
never rendered."** D-2, D-4, D-7 and D-8 are each a fix that landed everywhere except here, or a
regression that landed only here. Every one of them was invisible for the same reason. A
render-reachability census belongs in the mega-tranche's born-RED set.
