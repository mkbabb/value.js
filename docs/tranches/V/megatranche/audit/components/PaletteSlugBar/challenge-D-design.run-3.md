# CHALLENGE-D — `PaletteSlugBar.vue` · design axis · run-3

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`. This is the tier
this seat was spawned with, declared explicitly in the seat brief. Not inherited, not Fable, not
Sonnet, not Haiku. An undeclared seat is a DEFECT; this one is declared.

Subject: `demo/palettes/browser/slug/PaletteSlugBar.vue` (243 lines, area `palettes`).
Base: `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
Prior runs preserved verbatim at `./challenge-D-design.run-1.md` and `./challenge-D-design.run-2.md`.
Probes for this run: `./probes/psb-probe.mjs`, `psb-probe2.mjs`, `psb-probe3.mjs`, `psb-ground.mjs`,
`psb-ink.mjs`, `psb-submit2.mjs`.

**Scope law honoured.** I wrote only under
`docs/tranches/V/megatranche/audit/components/PaletteSlugBar/`. No file under `src/`, `demo/`,
`api/`, `test/`, `e2e/`, `docs/tranches/V/vnext/`, `scripts/dev/dev.sh` or any `INBOX.md` was
edited. Browser work was read-only navigation plus transient, self-removing DOM injection inside a
single `evaluate` (the injected node is removed before the evaluate returns).

---

## 0. Verdict

**DEFECTIVE — BLOCKER.**

I was told to assume the design is wrong and not to start by looking for reasons it is fine. Working
from that premise independently, I reached the same terminal finding the two prior runs reached, by
different routes: **this component has no design because it has no place.** It renders on zero
routes; the account surface it duplicates already ships three times over elsewhere; and the ratified
topology assigns that surface to a different housing entirely.

This run's job was not to restate fourteen findings. It was to **attack them** — confirm what
survives independent evidence, upgrade what was under-proved, add what was missed, and kill what
would have been a false positive. Result:

| | count | detail |
|---|---:|---|
| **Confirmed independently** | 2 BLOCKERs | D-1, D-2 — re-derived from scratch, not read off the prior report |
| **Upgraded PLAUSIBLE → CONFIRMED** | 1 | **D-2**: the prior run could only argue the real-browser consequence "from the HTML spec rather than a probe" (jsdom died at `requestSubmit`). I reproduced the actual navigation in WebKit. |
| **New findings** | 4 | D-15 (elevated-contrast opt-out), D-16 (focus ring below 1.4.11), D-17 (slug not LTR-isolated), D-18 (dead `resetEditMode`) |
| **Negative proofs — false findings killed** | 2 | N-1 (the morph does *not* jump), N-2 (`outline-none` does *not* kill the forced-colors focus outline) |
| **Convergent by different method** | 1 | D-4 raw-ink contrast, re-measured against a differently-sampled ground at a different threshold |

**Strongest defect: D-2.** The login form cannot submit, and in a real browser the attempt performs
an unprevented native GET submission that reloads the SPA and discards the typed credential. The
prior run identified the cause correctly but could not demonstrate the consequence. It is now
demonstrated.

---

## 1. What this run did differently

The premise "the design is flawed" is only useful if the seat can be surprised. So I deliberately
did **not** read the prior reports until after I had formed my own findings from the source, the
canon, the captures and live probes. I read them at the end, to diff. That ordering is why §4's two
negative proofs exist: both are traps I walked into myself before measuring, and both would have
shipped as confident false findings from a code-read alone.

Evidence conventions:

- **Captures**: `docs/tranches/V/megatranche/audit/visual/shots/<matrix>/palettes.png`, Safari/WebKit,
  desktop 2880×1800 and mobile, light and dark. Read as images.
- **Live**: `http://localhost:9000`, WebKit and Chromium via Playwright, viewport 1440×900 @2×.
- **Contrast**: WCAG 2.x relative luminance; grounds sampled from the shipped PNGs by canvas
  `getImageData` over a 700×60 px region of the Library pane interior.
- **Injection**: PaletteSlugBar's markup is copied **verbatim** from the SFC (line ranges cited per
  probe) into the live cascade, measured, and removed in the same `evaluate`.

---

## 2. Confirmations — independently re-derived

### 2.1 D-1 · BLOCKER — the component renders nowhere, and the topology says it should not exist

**Static.** An exhaustive case-insensitive search over the whole tree finds no render site:

```
$ grep -rniE "PaletteSlugBar|palette-slug-bar|SlugBar|slug-bar" --exclude-dir=node_modules --exclude-dir=.git .
demo/palettes/useSlugMigration.ts:6:import type { PaletteSlugBar } from "./browser/slug";
demo/palettes/useSlugMigration.ts:30:    const slugBarRef = ref<InstanceType<typeof PaletteSlugBar> | null>(null);
demo/palettes/browser/index.ts:44:export { PaletteSlugBar } from "./slug";
demo/palettes/browser/slug/index.ts:3:export { default as PaletteSlugBar } from "./PaletteSlugBar.vue";
(remainder: CHANGELOG + docs/tranches/* only)
```

Two barrels, one `import type` (no runtime edge), one ref for a component that is never rendered.
I closed the two remaining escape hatches a grep for the tag name would miss — dynamic
`<component :is>` and render-function mounting:

```
$ grep -rnE ':is="[A-Za-z]*Slug|h\(\s*PaletteSlugBar' demo/ | grep -v node_modules
(no output — the 7 `<component :is>` sites in demo/ are all Lucide icon swaps)
```

**Live DOM** (`probes/psb-probe.mjs`, WebKit, `/#/palettes`, 3.5 s settle). The three accessible
names unique to this file — verified unique by grep — are absent, and so is every `.slug-pill`:

```
PRESENCE {
  "accountMenu": 0,          // [aria-label="Account menu"]      — PaletteSlugBar.vue:84
  "cancelSlugEdit": 0,       // [aria-label="Cancel slug edit"]  — PaletteSlugBar.vue:35
  "signInWithSlug": 0,       // [aria-label="Sign in with slug"] — PaletteSlugBar.vue:24
  "slugPillsTotal": 0,
  "slugPillsInMain": 0,
  "mainText": "Lab\n92.0\n%\n,\n88.8\n,\n20.0\nL\na\nb\nα\n…\nMy Palettes\n\nSave, organize, and
               share your colors.\n\nStart a new palette\n\n· EMPTY PLATE ·\n\nNo saved palet"
}
```

**Visual.** I read `safari-desktop-light/palettes.png` and `safari-mobile-dark/palettes.png`
directly. The Library pane runs `My Palettes` → italic sub-line → `Search your palettes…` → dashed
`Start a new palette` tray → `EMPTY PLATE` mark → `No saved palettes yet.` There is no identity row,
no slug pill, no account affordance anywhere inside the pane, in either scheme or either form
factor. The only account control on screen is the dock's `Login` pill, which is
`demo/shell/dock/menus/ProfileSection.vue:111` — a different component. Across the audit's full
4 × 15 = 60-capture matrix this component appears zero times.

**Topology.** `VISUAL-CONSTITUTION.md:222`:

> "Account is one modal side Dialog opened from the Dock, not a route chassis or second main. It owns
> registration/recovery when signed out and identity, recovery-credential rotation and logout when
> active."

An inline identity/login/logout/regenerate bar in the `My Palettes` pane header is neither the Dock
nor the Dialog. Reviving it as-authored would be a constitutional violation, so there is no version
of "fix its design" that terminates anywhere but deletion.

**The design that did ship, three times.** `SlugEditLayer.vue` (dock edit layer), `ProfileSection.vue`
(desktop dock menu) and `MobileMenuDropdown.vue` (mobile dock menu) each own a slice of the same
surface. And the domain rule — *is this string a slug or an admin token?* — is forked byte-for-byte:

```
$ diff <(sed -n '184,196p' demo/palettes/browser/slug/PaletteSlugBar.vue) \
       <(sed -n '25,37p'   demo/shell/dock/layers/SlugEditLayer.vue) && echo IDENTICAL
IDENTICAL — verbatim duplicate of the slug/admin classification rule
```

An authentication classification rule living verbatim in two presentational components is not a
styling defect; it is the absence of an owner. It belongs in `demo/platform/auth/`.

**Corollary — the error channel is unreachable at the port, not just on screen.** `slugBarRef` is
created at `useSlugMigration.ts:30`, returned at `:121`, and **never bound to any template ref**;
`usePalettePorts.ts:133-134` forwards only `onRegenerateSlug` and `onSlugSwitch`, so the ref is not
even re-exported. All four `setError` calls at `useSlugMigration.ts:84-87` therefore write to
`null`, permanently. The component's only designed failure state cannot fire even in principle.

---

### 2.2 D-2 · BLOCKER — the login form cannot submit · **PLAUSIBLE → CONFIRMED**

`PaletteSlugBar.vue:5-15` binds the submit handler on the `SearchBar` *component*:

```
<SearchBar v-if="slugEditMode" ref="searchBarRef" key="slug-edit" tag="form"
    v-model="slugInput" :icon="LogIn" placeholder="enter slug..."
    @submit.prevent="onSlugSwitch"
    @keydown.escape.stop="slugEditMode = false">
```

**Cause — read from the compiled producer myself**, not taken on report:

```
$ grep -o "inheritAttrs[^,}]*" node_modules/@mkbabb/glass-ui/dist/search.js
inheritAttrs: !1
```

```js
// node_modules/@mkbabb/glass-ui/dist/search.js — the SearchBar definition
$ = C({ inheritAttrs: !1, __name: "SearchBar",
  props: { modelValue, placeholder, icon, tag: { default: "div" }, size, surface, variant },
  setup(e, { expose: n, emit: r }) {
    let i = r, a = P(),                            // a = useAttrs()
        o = g(() => { let { class: e, ...t } = a; return t; }),   // o = $attrs MINUS class
        s = O(null);
    return n({ inputRef: s }), (n, r) => (D(), _(j(e.tag), {
        class: E(...), "data-surface": e.surface           // ← the ROOT gets class + data-surface ONLY
    }, { default: L(() => [
        …icon…,
        b("input", w({ ref_key: "inputRef", ref: s, type: "search" },
                     o.value,                              // ← every other attr lands on the INPUT
                     { value: …, placeholder: …, class: "input-bar-field", onInput: … }), …),
        A(n.$slots, "default")
    ]) }));
  }});
```

`onSubmit` is in `o.value`. It is attached to an `<input type="search">`. An `<input>` never fires
`submit`; `submit` fires on the `<form>` and bubbles *up*, never down. The `<form>` root therefore
carries **no submit listener at all**, and nothing calls `preventDefault()`.

**Consequence — the gap this run closes.** The prior run stated the real-browser outcome as
"mechanism, from the HTML spec rather than a probe", because jsdom threw
`Not implemented: HTMLFormElement.prototype.requestSubmit`. I ran it in WebKit against the live app,
two arms identical but for listener placement (`probes/psb-submit2.mjs`):

```
===== listener-on-FORM (what the author wrote) =====
{ "handlerRuns": 1,
  "formStillPresent": true,
  "url": "http://localhost:9000/#/palettes?space=lab&color=lab(92%25+88.8+20+/+82.7%25)" }
main-frame navigations after Enter: []

===== listener-on-INPUT (what SearchBar produces) =====
{ "handlerRuns": "gone (page navigated)",
  "formStillPresent": false,
  "url": "http://localhost:9000/?#/palettes?space=lab&color=lab(92%25+88.8+20+/+82.7%25)" }
main-frame navigations after Enter: [
  "http://localhost:9000/#/palettes?space=lab&color=lab(...)",
  "http://localhost:9000/?#/palettes?space=lab&color=lab(...)",
  "http://localhost:9000/?#/palettes?space=lab&color=lab(...)",
  "http://localhost:9000/?#/palettes?space=lab&color=lab(...)"]
```

The interposed `?` in arm B is the signature of a native GET form submission to the current URL. The
handler never ran, three main-frame navigations were recorded, the SPA reloaded, and the DOM under
test was destroyed. In arm A — the same markup with the listener where the author believed it was —
the handler runs once and nothing navigates.

**Verdict on D-2: CONFIRMED.** Enter or a click on the `type="submit"` button reloads the app and
discards the typed slug. There is no path by which `onSlugSwitch` runs.

**Mechanism.** `f2c8f565` (the glass-7 adoption) swapped a hand-rolled `<form>` + `<input>` for the
producer's `SearchBar`. `SearchBar` is a *field*, not a *form host*, but it accepts `tag="form"`
without objecting, so the consumer's `@submit` silently relocated. Typecheck cannot see it:
`onSubmit` is a legal fall-through attr. The live sibling `SlugEditLayer.vue:76-79` writes a real
`<form @submit.prevent>` around a plain `<input>` and is correct. This orphan is the only site that
adopted `SearchBar` as a form. **Producer-relay item** under the standing glass-ui BH/BI edict:
`SearchBar` should either refuse `tag="form"` or route non-input listeners to its root.

---

### 2.3 D-4 · convergent by a different method — the pill wears raw uncertified ink

`PaletteSlugBar.vue:49` paints the identity pill with the raw live pick:

```
:style="{ color: cssColorOpaque, borderColor: cssColorOpaque }"
```

Every other live consumer of an accent-on-surface routes through the repo's own certifier:

```
$ grep -rn "useSafeAccentFn" demo/ | grep -v node_modules
demo/workbenches/gradient/GradientVisualizer/easing/useSpecimenRows.ts:40  ("resting")
demo/workbenches/extract/ExtractControls.vue:118                          ("resting")
demo/scenes/about/ColorNutritionLabel.vue:199                             ("resting")
demo/shell/dock/menus/MobileMenuDropdown.vue:23                           ("floating")
demo/shell/dock/menus/ProfileSection.vue:28-29                            ("chrome", "floating")
demo/palettes/browser/card/PaletteCard/PaletteCard.vue:229                ("well")
```

`ProfileSection.vue:22-31` names the exact hazard this file still carries:

> "the raw pick as text/border measured ≤1.28:1 on the real menu ground for roughly half of all picks
> per scheme."

I re-measured independently. Grounds sampled from the shipped `/palettes` captures over a 700×60 px
Library-pane region (`probes/psb-ground.mjs`): light `rgb(228,218,210)`, dark `rgb(74,62,54)`. Ink
resolved through a canvas 2D context — the repo's own CSS-color-resolver idiom — over a 32-point
sweep of the picker's operating band (`probes/psb-ink.mjs`):

```
oklch(0.60 0.15 180)   rgb(0,156,132)    light=  2.51:1  dark=  2.99:1
oklch(0.72 0.15 135)   rgb(122,185,83)   light=  1.72:1  dark=  4.37:1
oklch(0.85 0.15 180)   rgb(34,237,209)   light=  1.08:1  dark=  6.94:1
oklch(0.45 0.15 180)   rgb(0,109,88)     light=  4.58:1  dark=  1.64:1
…
n=32
below 4.5:1 (WCAG AA text) on the LIGHT library pane: 24/32 = 75%
below 4.5:1 on the DARK  library pane: 23/32 = 72%
below 3.0:1 (WCAG 1.4.11 border/non-text) in EITHER scheme: 32/32 = 100%
```

Different ground sample, different threshold, different resolver from the prior run's 82–93% figure —
same conclusion. Note the last line: because the same value paints **both** `color` and
`border-color`, and the pill must read in both schemes, **every** point in the sweep fails the 3:1
non-text floor in at least one scheme. The certified path already exists and is consumed six times;
this file simply does not call it.

---

### 2.4 Confirmed without restatement

Independently reproduced, and already correctly recorded in run-2 — no new evidence needed here:

- **D-3** — the error `<p>` (`:124`) is `absolute … -bottom-4 whitespace-nowrap`. Measured
  (`probes/psb-probe.mjs`): `errOverflowPx: 16.00` past the bar's own box against `margin-bottom: 8px`
  → an 8 px collision into following content; the message box measures 312.88 px wide for a 29-char
  string with `white-space: nowrap`; no `role="alert"`, no `aria-live`, no `aria-describedby` or
  `aria-invalid` binding to the field. A color-only failure state.
- **D-5** — hover-only help on a non-focusable `<span class="slug-pill cursor-help">` (`:47-52`).
  Measured `pillTabbable: -1`, `pillRole: null` (`probes/psb-probe3.mjs`). `PROPORTION-AUDIT` PR-07.
- **D-6** — target size. Measured `dots: 22 × 22` CSS px (`p-1` + a 14 px glyph), against WCAG 2.2
  SC 2.5.8's 24 × 24 minimum.
- **D-8, D-10, D-11, D-12, D-13** — dead substring error-branching (`msg.includes("409")` at `:218`,
  the exact pattern `useSlugMigration.ts:78-82` documents as already fixed, on a `catch` around a
  synchronous `emit` that cannot throw an HTTP-shaped error); the untokenized 50 ms `setTimeout` at
  `:176`; `text-mono-small font-bold` on a control label; the unused `hasSavedPalettes` prop and
  never-emitted `copy` event; four hand-rolled `<button>` rows inside a `Popover` where glass-ui's
  `DropdownMenu` — already consumed by the live sibling, and shipping a typeahead engine, `disabled`
  and cancellable `select` — is the design system's menu.

---

## 3. New findings

### D-15 · MAJOR — the hand-rolled Login pill opts out of the root-level elevated-contrast law

`foundation.css:745-750` raises operable-chrome borders once, at the root, for elevated contrast:

```css
@media (prefers-contrast: more) {
    .console-well, .app-layout .glass-resting, .app-layout .console-well,
    .slug-pill, [role="tab"] { border-width: 2px; }
}
```

`.slug-pill` is in that list. The Login button at `:71-78` is not — it hand-rolls its own pill out of
utilities (`px-3 py-1 rounded-full border border-primary/30`) instead of consuming the recipe. The
penalty is measurable. Chromium, `contrast: "more"`, authored markup injected verbatim
(`probes/psb-probe2.mjs`):

```
prefers-contrast:more
  pill  : borderWidth "2px"   borderColor oklch(0.7 0.18 20)                 ← root bump applied
  login : borderWidth "1px"   borderColor oklab(0.514617 0.0879612 0.104213 / 0.3)   ← opted out
```

Two pills, same bar, same semantic weight; under elevated contrast one thickens to 2 px full-ink and
the other stays a 1 px, 30 %-alpha hairline. This is precisely the failure mode owner edict 5 exists
to prevent: styling per instance instead of at the root means the root's later laws cannot reach you.
`VISUAL-CONSTITUTION.md:82` — "Text, focus, boundaries and state meet their rendered contrast on the
actual material tier; a token name is not evidence."

**Cure.** The Login control is a `.slug-pill`-shaped affordance; it should be the glass-ui `Button`
the live sibling already uses (`ProfileSection.vue:111` — `variant="outline" size="xs"`), not a
utility reconstruction.

---

### D-16 · MINOR — the focus indicator computes below WCAG 1.4.11 on the measured pane ground

All six operable seats in the file share one focus idiom:
`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40` (`:73`, `:84`, `:91`,
`:98`, `:106`, `:113`). The token resolves live (`probes/psb-probe3.mjs`):

```
WebKit light : --ring = rgb(28, 25, 23)
WebKit dark  : --ring = rgb(233, 230, 226)
```

Composited at the authored 40 % alpha over the Library-pane grounds measured in §2.3
(`probes/psb-ground.mjs`):

```
light: ring=28,25,23    ground=228,218,210  composite=[148,141,135]  contrast=2.38:1
dark : ring=233,230,226 ground=74,62,54     composite=[138,129,123]  contrast=2.71:1
                                                   (WCAG 2.x SC 1.4.11 requires 3.0)
```

**Labelled precisely: this is a computed projection, not a photographed frame** — the component does
not render, so the composite is derived from the real token, the real authored alpha and the real
sampled ground rather than sampled from a shipped pixel. The 40 % alpha is the whole cause: at 100 %
the same token clears the bar comfortably in both schemes. `VISUAL-CONSTITUTION.md:84` requires focus
to remain "visibly distinct from selection in both schemes, forced colors and reduced transparency."
This idiom is not local to this file, so the cure belongs to whichever wave owns the focus register,
not to a per-file patch.

---

### D-17 · MINOR — the slug is not LTR-isolated

`VISUAL-CONSTITUTION.md §6.1` is explicit:

> "CSS strings, hex, slugs, IDs and provenance | render in LTR-isolated spans inside RTL prose"

Measured on the authored pill in the live cascade (`probes/psb-probe.mjs`, `psb-probe3.mjs`):

```
pill: { unicodeBidi: "normal", direction: "ltr" }
```

`unicode-bidi: normal` is the absence of isolation. `index.html` currently pins `dir="ltr"`
document-wide, which is why nothing is visibly wrong today — but that attribute is described in its
own source comment as the RTL *seam*, deliberately established so `dir="rtl"` flips the document. The
moment it does, an un-isolated slug reorders its hyphen-separated segments against the surrounding
prose. The `.slug-pill` recipe (`foundation.css:585-587`) is the right owner: isolation belongs in
the shared recipe, once, not at each of its five call sites.

---

### D-18 · INFO — `resetEditMode` is exposed and never called

`defineExpose({ slugEditMode, setError, resetEditMode })` at `:236`. `resetEditMode` (`:231-234`)
occurs exactly twice in the file — its definition and that expose — and zero times anywhere else:

```
$ grep -rn "resetEditMode" --exclude-dir=node_modules --exclude-dir=.git .
demo/palettes/browser/slug/PaletteSlugBar.vue:231:function resetEditMode() {
demo/palettes/browser/slug/PaletteSlugBar.vue:236:defineExpose({ slugEditMode, setError, resetEditMode });
```

This completes run-2's D-12 dead-surface list: of the component's public surface, one prop
(`hasSavedPalettes`) is never read, one emit (`copy`) is never emitted, and one of three exposed
members is never called — while a second (`setError`) is called only through a ref that is
permanently `null` (§2.1). The scoped `<style>` block (`:239-243`) contains a `@reference` and a
comment and no rules.

---

## 4. Negative proofs — two false findings this run killed

The brief warns that a state never designed is a design defect. The inverse trap is equally real: a
state that *looks* undesigned from the source and is in fact handled at the root. I walked into both
of these from a code read and had to be corrected by measurement. Recording them so a later seat does
not re-file them.

### N-1 — the `vj-morph` swap does **not** jump

`<Transition name="vj-morph" mode="out-in">` (`:4`) swaps between a pill branch and a Login-button
branch that are visibly different sizes. `out-in` means the outgoing element is fully removed before
the incoming one mounts, so an unequal-height pair produces a collapse-and-grow. Measured heights of
the two authored branches in the live cascade (`probes/psb-probe.mjs`):

```
root  (pill branch)  h = 36.00   minHeight "36px"    pill  h = 28.94
root2 (login branch) h = 36.00   minHeight "auto"    login h = 32.94
branchDeltaPx = 0.00
```

The `min-h-9` on the bar root absorbs both branches. **Not a defect.** The bar height is stable
across the swap.

### N-2 — `focus-visible:outline-none` does **not** kill the forced-colors focus outline

Every operable seat writes `focus-visible:outline-none`, and `foundation.css:700-721` supplies the
Windows-High-Contrast focus affordance through a **zero-specificity** `:where(...)` selector:

```css
:where(a[href], button, [role="button"], …, [tabindex]:not([tabindex="-1"])):focus-visible {
    outline: 2px solid Highlight;
    outline-offset: 2px;
}
```

Specificity reasoning predicts a defect: `.focus-visible\:outline-none:focus-visible` is (0,2,0);
`:where(button):focus-visible` is (0,1,0). The component should win and blank the outline, and since
`ring-*` is a `box-shadow` — which does not paint in forced colors — focus would vanish entirely.
Measured instead, Chromium `forcedColors: "active"` (`probes/psb-probe2.mjs`):

```
dots    : outline "solid 2px rgba(5, 0, 73, 0.8)"   boxShadow "none"
login   : outline "solid 2px rgba(5, 0, 73, 0.8)"   boxShadow "none"
menurow : outline "solid 2px rgba(5, 0, 73, 0.8)"   boxShadow "none"
```

The root outline wins on all three species. **Mechanism:** the `foundation.css` rule is *unlayered*,
and unlayered declarations beat every `@layer` regardless of specificity; Tailwind's `outline-none`
utility lives in `@layer utilities` and therefore loses. **Not a defect** — and a genuinely good piece
of design in the foundation, since it holds against consumers that opt out by hand. Specificity alone
gets this wrong; only measurement gets it right.

Also verified sound and not filed: `prefers-reduced-motion` is neutralized globally at
`demo/styles/animations.css:184-193` (`transition-duration: 0.01ms !important` on `*`), so the morph
resolves directly to final geometry per `VISUAL-CONSTITUTION.md:144`; the `active:scale-*` presses
animate `transform`, which is compositor-only and forces no layout (their defect is that
`transition-property` omits `transform` entirely, so the scale snaps — that is run-2's D-10, an
ad-hoc-motion finding, not a layout-thrash one); and the audit's `horizontalOverflow` is 0 on every
`/palettes` capture, to which this component contributes nothing because it renders nothing.

---

## 5. Disposition

Run-2's D-1…D-14 stand. This run adds D-15…D-18, upgrades D-2 to CONFIRMED, and records N-1/N-2 as
proved-sound.

| ID | Severity | Defect | Mechanism family | This run |
|---|---|---|---|---|
| D-1 | BLOCKER | zero render path; contradicts the Account-Dialog topology (`VISUAL-CONSTITUTION.md:222`); auth rule forked byte-for-byte; `slugBarRef` permanently `null` | orphaned composition | confirmed independently |
| D-2 | BLOCKER | `@submit` lands on `<input>` via `SearchBar`'s `inheritAttrs:false`; real WebKit run performs a native GET submission and reloads the SPA | producer-contract misuse | **PLAUSIBLE → CONFIRMED** |
| D-3 | MAJOR | error state: 16 px overflow / 8 px collision, `nowrap` clip, no role / live region / field association | unowned failure surface | confirmed |
| D-4 | MAJOR | raw uncertified accent ink: 75 % / 72 % below AA, 100 % below 3:1 in one scheme | missed D6 certification | convergent, new method |
| D-5 | MAJOR | hover-only help on a non-focusable `<span>` (`tabIndex −1`) | PR-07 | confirmed |
| D-6 | MAJOR | 22 × 22 px operable target vs SC 2.5.8's 24 × 24 | PR-12 | confirmed |
| D-7 | MAJOR | pending state structurally unrenderable | unreachable designed state | run-2 |
| D-8 | MAJOR | superseded substring error-branching on a `catch` that cannot fire | legacy dual path | confirmed |
| D-9 | MAJOR | admin secret typed into `type="search"`; no input hygiene | credential hygiene | run-2 |
| D-10 | MINOR | two press scales with no `transform` in `transition-property`; 50 ms magic delay | ad-hoc motion | confirmed |
| D-11 | MINOR | Fira Code + bold on a control label vs the closed §4 matrix | closed type matrix | confirmed |
| D-12 | MINOR | unused prop, never-emitted `copy` | dead public surface | confirmed |
| D-13 | MINOR | four hand-rolled rows in a `Popover` where `DropdownMenu` exists and is consumed next door | design-system boundary | confirmed |
| D-14 | INFO | zero coverage in forced-colors / RTL / zoom-200 / STATES matrices | unobserved by construction | confirmed |
| **D-15** | **MAJOR** | hand-rolled Login pill opts out of the root `prefers-contrast: more` border bump — 1 px @ 30 % α beside a 2 px sibling | per-instance override defeats root law | **new** |
| **D-16** | **MINOR** | `ring-ring/40` computes 2.38:1 light / 2.71:1 dark vs SC 1.4.11's 3.0 | focus register | **new** |
| **D-17** | **MINOR** | slug pill `unicode-bidi: normal` — not LTR-isolated per §6.1 | bidi isolation | **new** |
| **D-18** | **INFO** | `resetEditMode` exposed, zero call sites | dead public surface | **new** |
| N-1 | — | branch heights equal at 36.00 px; the `out-in` morph does not jump | — | **proved sound** |
| N-2 | — | unlayered `:where()` WHCM outline beats the layered `outline-none`; forced-colors focus survives | — | **proved sound** |

### Recommended cure — one architectural move, not eighteen patches

Delete `demo/palettes/browser/slug/`, the `demo/palettes/browser/index.ts:44` re-export, and
`useSlugMigration.ts`'s `slugBarRef` (`:6`, `:30`, `:84-87`, `:121`) — the last of which is already
writing to `null`. Lift `looksLikeSlug` / `normalizeTokenInput` into `demo/platform/auth/` as the one
owner both the Dialog and `SlugEditLayer` consume, killing the byte-for-byte fork. Route the sign-in
failure to the **port** — a `slugError` on `sessionPort` — rather than to a component-instance
handle, so the error renders wherever the account surface lives instead of depending on a ref that
must be manually threaded. Then build the constitution's single Account Dialog under W23 (with W15
supplying auth state), where D-3 through D-13 and D-15 through D-17 are solved once, correctly, on a
surface that is actually on screen.

Two items escape this file and must be relayed rather than deleted with it:

- **glass-ui (BH/BI relay, standing edict):** `SearchBar` accepts `tag="form"` while forwarding all
  non-`class` attrs to its inner input, so any consumer's `@submit` silently relocates and the form
  submits natively. It should refuse `tag="form"` or route non-input listeners to its root.
- **Focus register (D-16) and bidi isolation (D-17):** both idioms are repo-wide, not local. D-17's
  natural home is the shared `.slug-pill` recipe at `foundation.css:585-587`.

The generalisable lesson is unchanged from run-2 and worth restating because this run re-derived it
blind: **the repo has no gate that fails on "exported, typechecks, renders nowhere."** A 243-line
component carrying a BLOCKER-severity broken login path survived a glass-7 migration, a full 60-shot
Safari matrix, and two prior audits — because nothing ever asked whether it was mounted.

---

## 6. Reproductions

All probes are in `./probes/`. Dev server at `http://localhost:9000` must be live. None writes to the
repo; DOM injections are removed inside the same `evaluate`.

| Probe | Establishes |
|---|---|
| `psb-probe.mjs` | D-1 live absence (`PRESENCE` all zero); authored geometry — `dots 22×22`, `errOverflowPx 16.00`, `branchDeltaPx 0.00` (N-1); computed type roles |
| `psb-probe2.mjs` | D-15 (`prefers-contrast: more`, 2 px vs 1 px); N-2 (`forcedColors: active`, `outline: solid 2px Highlight` on all three species) |
| `psb-probe3.mjs` | D-5 (`pillTabbable −1`), D-17 (`unicode-bidi: normal`), the live `--ring` token per scheme |
| `psb-ground.mjs` | Library-pane grounds sampled from the shipped captures; D-16 focus-ring composite math |
| `psb-ink.mjs` | D-4 — 32-point ink sweep vs the measured grounds; 75 % / 72 % / 100 % failure rates |
| `psb-submit2.mjs` | **D-2 CONFIRMED** — two-arm WebKit run; listener-on-input produces a native GET submission, 3 main-frame navigations, DOM destroyed |

Static commands quoted inline in §2.1 (exhaustive reference grep, dynamic-component grep, the
`sed`/`diff` byte-comparison of the forked auth normalizer) and §3 (`resetEditMode` grep).
