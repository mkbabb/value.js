# CHALLENGE-D · `demo/shell/dock/menus/ProfileSection.vue` — the design is defective

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, the tier this
seat was explicitly spawned with. Declared, not inherited.

Scope law honoured: I wrote only under
`docs/tranches/V/megatranche/audit/components/shell-dock-profilesection/`. No source file was
edited. Probes were read-only navigations plus one transient, self-removing DOM injection used to
settle a cascade question (D-5); it was removed in the same evaluate.

---

## Verdict

**DEFECTIVE.** The component is not a "profile section" — it is two unrelated dock regions in one
file that between them own the account identity, a product action (Share color), an outbound
vanity link, and **the application's only theme control**, all gated behind `lg:` and all
duplicated by hand in a second file. On the visual axis it fails on the frame that ships: the
Login trigger's *certified* ink measures **3.43:1** against the pixels actually behind it, the
GitHub row renders as a **broken two-line item** in every scheme on desktop and mobile, the admin
identity's gold shimmer is **cascade-dead while its infinite animation keeps running**, and one
glyph in a three-row menu is **16 × 24 px** because the `aspect-square` class written to prevent
exactly that is inert.

The deep defect is one habit, repeated: **this component states its design intentions in classes,
inline styles and props that the design system does not read.** `variant="outline"`,
`variant="ghost"`, `border-color`, `font-display`, `aspect-square`, `as-child` — six declared
intentions, six no-ops, all six shipped, several of them inside comments that congratulate the file
for having retired precisely this class of dead declaration (`P9-R4 (Q10)`, lines 103–110). The
cure is not more patches. It is to stop hand-assembling dock furniture out of page primitives and
consume the vocabulary glass-ui 7 actually exposes.

Strongest defect: **D-1** — the ink whose whole apparatus exists to guarantee contrast measures
3.43:1 on the shipped capture, because the certifier models the dock band and the glyph sits on the
button's own wash.

---

## Evidence conventions

- Screens: `docs/tranches/V/megatranche/audit/visual/shots/<matrix>/picker.png` (Safari/WebKit,
  1440×900 @2×, and the state matrices at 1440×900 @1×).
- Live probes: `http://localhost:9000/#/`, WebKit and Chromium via Playwright 1.60.0, viewport
  1440×900 @2×. Scripts in the session scratchpad
  (`PSD-probe2/3.mjs`, `PSD-shot2.mjs`, `PSD-html.mjs`, `PSD-icon.mjs`).
- Crops kept beside this report: `evidence-dock-light-3x.png`, `evidence-dock-dark-3x.png`,
  `evidence-mbabb-menu-light.png`, `evidence-mbabb-menu-dark.png`, `evidence-rtl-wordmark.png`,
  `evidence-zoom200-dock.png`, `evidence-avatar-offline.png`.
- Contrast is computed from the captured PNG: ink = the 0.5th luminance percentile inside the
  glyph band (99.5th in dark), ground = the 90th (10th in dark), WCAG 2.x relative-luminance
  formula.

---

## D-1 · BLOCKER — the *certified* trigger ink measures 3.43:1 on the shipped frame

The file's opening comment (lines 22–31) is the design promise:

> "the live-color identity keeps its voice but wears CERTIFIED ink … each ink certifies against
> the surface it actually composites over."

It does not. Measured on `shots/safari-desktop-light/picker.png`, the region of the Login label
(x 768–834 CSS, y 30–50 CSS):

```
LIGHT Login   ink=(170, 0, 67)   L=0.0895   ground=(200,167,172) L=0.4290   contrast=3.43:1
LIGHT @mbabb  ink=(59, 49, 51)   L=0.0337   ground=(200,168,172) L=0.4326   contrast=5.77:1
DARK  Login   ink=(255,236,238)  L=0.8742   ground=(112, 88, 80) L=0.1100   contrast=5.78:1
DARK  @mbabb  ink=(212,205,202)  L=0.6192   ground=(112, 88, 80) L=0.1100   contrast=4.18:1
```

`(170,0,67)` is exactly the computed `color: oklch(0.470927 0.188343 9.834023)` on the button, so
the sample is the ink itself, not an antialiased edge. Type is **16.4 px / 700** — bold below
18.66 px is *normal* text under WCAG 1.4.3, so the floor is 4.5:1. **3.43:1 fails.** The dark
scheme fails on the other control: `@mbabb` at 16.4 px / 500 measures **4.18:1**.

The mechanism is a missing layer. `useSafeAccentFn("chrome")` resolves its referent from
`.glass-dock`'s background (`useContrastSafeColor.ts:151–153`) composited over the ambient — one
alpha layer. The glyph actually composites over **two**: the dock band *and* the button's own
`glass-wash` capsule, measured `background-color: oklab(0.721325 0.00492 0.010865 / 0.6)`. The
resulting ground is `(200,167,172)`, 0.09 relative luminance darker than the band `(246,169,194)`,
i.e. the certifier is walking the ink to clear a surface that is not there.

This exact failure class is already diagnosed *in the same file's dependency*, for the veil:

> `useContrastSafeColor.ts:154–169` — "the veil is an IN-PLATE fixture … **TWO alpha layers** …
> A per-layer OKLab-L linear mix diverges past the certification headroom at two stacked layers
> (probed live: **4.30:1 measured vs the 5.75 walked target**)."

The veil got a mounted-element probe. The dock trigger — same two-layer topology — never did.

**Canon.** `VISUAL-CONSTITUTION.md §4.1`: "Text, focus, boundaries and state meet their rendered
contrast on the actual material tier; **a token name is not evidence**."
`PROPORTION-AUDIT.md §5.8`: "Real rendered relation wins over token intent."

**Cross-ref.** CHALLENGE-C `C-5` and CHALLENGE-L `L-1` report that the `chrome` probe is *dead*
(`.glass-dock` α=0) and silently degenerates to the static model. That is the same wound from the
code axis; this is the rendered consequence, with the number. Both hold: even a *working* probe
omits the button's own wash.

**Cure (gestalt, not patch).** Delete the wash from under the accent ink rather than teaching the
certifier about it. glass-ui 7's `emphasis="quiet"` renders `background: transparent; box-shadow:
none` (`components/button/styles.css`) — the glyph then composites directly on the one surface the
`chrome` rung already models, the referent becomes true by construction, and the control gains the
real hover it currently lacks (D-17). Only if the wash must stay does the second cure apply: a
`chrome-trigger` `InkSurface` probed off the *mounted* button, the identical idiom `veil` already
uses. One rule for the whole system: **an ink's referent is the mounted element's own painted
stack, never a modelled tier.**

---

## D-2 · BLOCKER — the GitHub row renders as a broken two-line item, every scheme, both twins

Open the `@mbabb` menu. `evidence-mbabb-menu-light.png` / `-dark.png`: "Share color" is one line
with its glyph inline; **"GitHub" puts the octocat on line 1 and the word on line 2**, flush to the
row's left padding instead of the text column its neighbours share.

Rendered DOM (`PSD-html.mjs`):

```html
<div role="menuitem" tabindex="-1" class="dropdown-menu__item … text-small gap-2 cursor-pointer">
  <a href="https://github.com/mkbabb/value.js" target="_blank" class="no-underline text-foreground">
    <svg class="w-3.5 h-3.5" …>…</svg> GitHub
  </a>
</div>
```

`as-child` (line 158) was **not** honoured: the anchor did not become the item, it became a child
of it. Computed: row `display:flex; gap:8px; width 200.6`, anchor `display:block; width 53.6;
height 36.9`. A 53.6 px block cannot hold a 14 px glyph plus " GitHub ", so it wraps.

Geometry, offsets measured within each row:

| row | icon x/y | text x/y | row height |
|---|---|---|---|
| Share color | 8 / 15 | 30 / 12.4 | 44.0 |
| **GitHub** | **8 / 6** | **8 / 21.9** | **48.9** |
| Dark mode | 8 / 10 | 32 / 12.4 | 44.0 |

The icon and the text are on different lines (Δy = 15.9 px) and the text column is off by 22–24 px.
Mobile is worse: the same row measures **55.4 px against 44 px siblings**
(`PSD-shot2.mjs`, iPhone 14).

Second defect in the same DOM: a focusable `<a href>` nested inside `[role="menuitem"][tabindex="-1"]`.
A menu item must not contain focusable descendants — the anchor is Tab-reachable inside a widget
whose focus model is arrow-key roving, so keyboard focus can leave the menu's own order.

**Canon.** `VISUAL-CONSTITUTION.md §5` — one action grammar; `§4.1` — role and name are explicit.

**Cure.** A link row is a link: use the producer's supported `as="a"` on the item (glass-ui's
Button/Primitive pair exposes `as`), so exactly one element carries `role="menuitem"`, the href and
the row layout. And the octocat should be one icon the system owns — today it is a 700-byte `<path>`
duplicated byte-for-byte in `ProfileSection.vue:161` and `MobileMenuDropdown.vue:95` (D-13),
`fill: rgb(28,25,23)` solid among 2 px-stroke outline siblings.

---

## D-3 · MAJOR — `variant` is not glass-ui 7 vocabulary; the action and the wordmark are the same material

glass-ui 7.0.0's `Button` props are `emphasis | tone | size | iconOnly | loading | type | disabled |
class | asChild | as` (`dist/button-Bu9F4uU6.js`). **There is no `variant`.** The emphasis
vocabulary is `primary | secondary | quiet | text`; there is no `outline` and no `ghost`.

Rendered DOM proves the fall-through — `variant` lands on the element as a literal, invalid HTML
attribute and both controls resolve to the *same* default:

```html
<button data-emphasis="secondary" data-tone="neutral" data-size="xs" … variant="outline"  …>Login</button>
<button data-emphasis="secondary" data-tone="neutral" data-size="xs" … variant="ghost"    …>@mbabb</button>
```

Consequence, measured: the two controls are materially **identical** —
`background-color: oklab(0.721325 0.00492 0.010865 / 0.6)`, byte-identical 7-part `box-shadow`,
`border-radius: 9999px` on both. The only differences are the ones this file hand-sets:
`font-bold` and an inline `color`.

So the design says "an account action and an author credit are the same weight." In the band they
read exactly that way (`evidence-dock-light-3x.png`): two equal capsules, equal fill, equal shadow,
adjacent.

`emphasis="quiet"` is precisely what the wordmark wanted, and it already ships the hover the file
hand-rolls in classes (`hover:text-foreground hover:underline underline-offset-4`, line 138):

```css
.button[data-emphasis="quiet"] { background: transparent; box-shadow: none; color: var(--muted-foreground); }
.button[data-emphasis="quiet"]:hover:not(:disabled,[aria-disabled="true"]) {
  background: color-mix(in oklab, var(--foreground) 8%, transparent); color: var(--foreground); }
```

`--muted-foreground` is floor-raised in `demo/styles/foundation.css` — so `emphasis="quiet"` also
retires D-10's `text-foreground/70` and its 4.18:1 dark failure in the same stroke.

**Canon.** Owner edict 4 (glass-ui is the design system; reuse existing component-type names) and
edict 5 (style at the root, not per instance). `VISUAL-CONSTITUTION.md §3.8`: "Supporting fixtures
do not compete with [the protagonist] through equal size or equal shadow."

**Cross-ref.** CHALLENGE-C `C-2` reports the dead prop from the code axis (103 sites in `demo/`).
The design consequence — one emphasis tier for two different jobs — is this row.

---

## D-4 · MAJOR — the accent `border-color` binding is dead, in the comment that says it was retired

Lines 103–110 diagnose, correctly, that the accent was cascade-dead because "the outline variant
paints its border via inset highlight shadows (`border: none 0px`), so the width never survived",
and announce the cure: "Re-land the accent on the channels the variant ACTUALLY paints — the
certified chrome-rung ink (text + icon)."

The very next lines re-bind the channel that was just declared dead:

- `ProfileSection.vue:63` — `:style="{ color: triggerInk, borderColor: triggerInk }"`
- `ProfileSection.vue:115` — identical

Measured on the live button: `border-style: none`, `border-width: 0px`,
`border-color: oklch(0.470927 0.188343 9.834023)`. The inline style ships to the client
(`style="… color: oklch(…); border-color: oklch(…)"`) and paints nothing.

**Cure.** Delete `borderColor` from both bindings. Better: delete both bindings — see D-1's cure,
where the ink becomes a producer token on a quiet trigger rather than an inline per-instance paint
(edict 5).

---

## D-5 · MAJOR — the admin identity's gold shimmer is invisible, and its infinite animation runs anyway

`ProfileSection.vue:96`:

```html
<span class="slug-pill … gold-shimmer" style="border-color: var(--color-gold); color: var(--color-gold)">
```

glass-ui's `.gold-shimmer` (`dist/styles/utilities/base-misc.css`) is a text-clipped gradient:
`background: linear-gradient(…); background-clip: text; color: transparent;` plus, under
`@media (prefers-reduced-motion: no-preference)`, `animation: metal-shimmer-sweep var(--duration-shimmer) linear infinite`.

An inline `color` beats any author-layer rule. Measured live (transient injection of the two
spellings, removed in the same evaluate):

```
with inline color (= line 96) : color = oklch(0.751 0.147 84.199997)   animationName = metal-shimmer-sweep
without inline color          : color = rgba(0, 0, 0, 0)               animationName = metal-shimmer-sweep
```

So the glyphs paint **opaque gold on top of the clipped gradient**: the shimmer is entirely hidden,
while `metal-shimmer-sweep` keeps animating `background-position` on a text-clipped gradient
forever, in the dock, for as long as an admin session is open. Decoration that cannot be seen and
compositing work that cannot be justified.

The two sibling consumers get it right — `DockViewSelect.vue:135` (`<span class="gold-shimmer">Admin</span>`)
and `PaletteCard.vue:64` (`gold-shimmer` + `border-gold`) set no inline `color`. This site is the
only one that kills it.

**Canon.** `PROPORTION-AUDIT.md §5.5`: "A small icon/mark is either data, status, labeled action,
drag affordance, focus/selection register **or removed**. Decorative controls … are forbidden."
Owner edict 6 keeps animations — it does not sanction an animation nobody can see.

**Cure.** Drop the inline `color`, keep `border-gold` as a class (the PaletteCard idiom), and let
the producer's one metal register own the ink. Same edit removes the per-instance override.

---

## D-6 · MAJOR — the theme glyph is 16 × 24; `aspect-square` is inert

Measured, inside the open menu (`PSD-icon.mjs`):

| glyph | class | width | height | `aspect-ratio` | `fill` |
|---|---|---|---|---|---|
| Share2 | `w-3.5 h-3.5` | 14 | 14 | auto | none, stroke 2 |
| octocat | `w-3.5 h-3.5` | 14 | 14 | auto | **solid** `rgb(28,25,23)` |
| Sun/Moon | `aspect-square w-4` | **16** | **24** | `1 / 1` | none, stroke 2 |

`aspect-ratio: 1/1` computes but is ignored: lucide's SVG carries `width="24" height="24"` as
presentation attributes; `w-4` overrides the width to 16 px and nothing overrides the height, so the
height stays definite at 24 px and the aspect ratio is discarded. The class written to keep the
glyph square is the one thing that cannot make it square.

Visible consequence in `evidence-mbabb-menu-light.png`: the sun is conspicuously larger and taller
than its two neighbours, its optical centre sits 4 px above theirs (`iconY` 10 vs 15 / 6), and one
of the three icons is a solid mark among hairline outlines.

**Canon.** `PROPORTION-AUDIT.md §5.7`: "Visual glyph size, operable target size and layout
reservation are separate quantities." §5.8: measured rects, not token intent.

**Cure.** Stop setting glyph size per instance at all. glass-ui already owns it:
`.button > svg:not([class*="size-"]) { inline-size: var(--ui-glyph); block-size: var(--ui-glyph) }`.
The menu row wants the same treatment — one `--ui-glyph` rung for every icon in the dock's menus,
zero `w-3.5 h-3.5`/`aspect-square w-4` per-instance sizes (there are 9 of them in this file).

---

## D-7 · MAJOR — Dark mode is a toggle shipped as a command; the state exists only as an aria-hidden glyph

`role="menuitem"`, `aria-checked: null` (measured). The theme's on/off truth is carried by
`<Moon v-if="isDark" aria-hidden="true">` / `<Sun v-else aria-hidden="true">` and nothing else — a
glyph explicitly hidden from assistive tech, in a row whose only text is the invariant "Dark mode".
So the row's accessible rendering is identical in both states.

`demo/ui/dropdown-menu/index.ts` re-exports **`DropdownMenuCheckboxItem`** from glass-ui. It is
unused in this repo's dock.

The W44 comment (lines 169–173) frames the gap as glass-ui's: "Glass 7's DarkModeToggle is a native
interactive theme command (no `passive` mode)". True, and beside the point — the row does not want a
nested toggle, it wants to *be* a checkbox item, which the design system already ships. Mark M1 is
asking for the wrong primitive.

**Canon.** `VISUAL-CONSTITUTION.md §4.1`: "Selected, failed, pending, withdrawn and disabled states
are never color-only. Role, accessible name, **state/value** and associated error/status are explicit."

**Cross-ref.** CHALLENGE-C `C-4`, same conclusion from the code axis.

---

## D-8 · MAJOR — two copy actions in one menu, one of them has no state at all

- **Share color** (line 154) swaps `Share2 → Check` and "Share color" → "Copied!" off `linkCopied`
  (`App.vue:363`, derived from `linkCopyStatus === "success"`).
- **Copy slug** (line 77) emits `copySlug` → `Dock.vue:62` → `SlugEditLayer.vue:68–70`:

```ts
function onCopySlug() {
    if (pm.userSlug.value) void writeClipboard(pm.userSlug.value);
}
```

Fire-and-forget: no success state, no failure state, the rejection explicitly discarded with `void`.
The row also carries `@select.prevent`, so the menu stays open — the user clicks and watches a menu
that visibly does nothing. Clipboard denial, an insecure context, an empty slug: all silent.

Same menu, same verb, two different state designs; the one attached to the user's *own identity* is
the one with none.

**Canon.** `VISUAL-CONSTITUTION.md §5`: "Persistent operation state stays with the entity/workspace.
A transient flourish may celebrate success but never carries the only truth." `PROPORTION-AUDIT.md`
PR-08: "Pending/failure/export/recovery truth only transient → **ADD-AFFORDANCE**."

**Cure.** One copy affordance with one result state, shared by both rows (and by every other copy
seat in the shell) — not two hand-rolled treatments in one 60-line template.

---

## D-9 · MAJOR — the most destructive row is the quietest, with no confirmation and no undo

Row order and weight, logged in:

| row | ink | consequence |
|---|---|---|
| Copy slug | normal | reversible |
| Switch account | normal | reversible |
| Logout | normal | reversible (log back in) |
| **Regenerate slug** | `text-muted-foreground` (de-emphasised) | **destroys the user's identity** |

`pm.onRegenerateSlug()` fires on a single click. No confirm step, no undo, no pending state, no
result state, and the row is painted *quieter* than the reversible ones above it — an inversion of
consequence and emphasis. glass-ui exposes `tone="destructive"` on its action vocabulary; the design
system's danger register is available and unused.

**Canon.** `VISUAL-CONSTITUTION.md §7 (Admin)`: "dangerous confirmation"; `PROPORTION-AUDIT.md` PR-11.

**Cross-ref.** CHALLENGE-C `C-3` measures the same seat from the failure-path side.

---

## D-10 · MAJOR — the closed type matrix is broken in four places, three families in one band

Measured computed type (Chromium, `nav.dock-band`):

| control | family | size | weight |
|---|---|---|---|
| Home | Fraunces | 16.4 px | 400 |
| Tools | Plus Jakarta Sans | 18.608 px | 400 |
| **Login / Profile** | **Fira Code** | 16.4 px | **700** |
| **@mbabb** | **Fira Code** | 16.4 px | 500 |

`VISUAL-CONSTITUTION.md §4` is explicit and closed: control or label → `text-small`, **Plus Jakarta
Sans, non-bold**; `text-mono-small` (Fira Code) is reserved for "value, code, or provenance"; "This
matrix is closed across all eighteen compositions" with exactly one exception, P019's Picker pair.
"Login" and "Profile" are control labels. They are mono, and bold.

Consequences that are visible rather than doctrinal (`evidence-dock-light-3x.png`): at 16.4 px/700
in a monospaced face, **"Login" is the heaviest label in the entire dock** — heavier than the
primary navigation it sits beside. The band's typographic hierarchy is inverted: the least-used
control shouts, the route selector whispers.

Two more matrix breaks inside the menu:

- The tagline "Color space picker & converter" is **11 px Fraunces italic** (`text-micro`, line 150).
  `text-micro` appears nowhere in §4's matrix; help/prose is `text-prose`. 11 px italic serif over a
  translucent ground is the least legible text this component ships.
- `min-w-menu font-display` on `DropdownMenuContent` (lines 70 and 143) — see D-11.

**Cure.** Control labels take `text-small`. If the dock wants a mono voice for identity, that is a
*constitution amendment*, argued once in §4, not four unilateral class choices in one file.

---

## D-11 · MAJOR — `font-display` on the menu is a dead class; the panel renders three families

Measured on the live menu content:

```
class     = "dropdown-menu-content dropdown-menu__content glass-reveal glass-floating min-w-menu font-display"
fontFamily = "Fira Code"
--dropdown-menu-font = "Fira Code", "Fira Code Fallback", "Fira Mono", monospace
```

glass-ui's `components/_shared/menu.css` sets `font-family: var(--dropdown-menu-font, inherit)` —
the producer owns the menu's family through a **token**, and it wins. The `font-display` class on
the content is inert at all three sites (`ProfileSection.vue:70`, `:143`, `MobileMenuDropdown.vue:43`).

The rendered panel (215 × 223 px) therefore carries three type families at once: Fira Code
container and handle, Plus Jakarta Sans rows (`text-small`), Fraunces italic tagline
(`text-micro`) — visible in `evidence-mbabb-menu-light.png`.

**Cure.** Set `--dropdown-menu-font` once, at the shell root, for every dock menu. Delete the class
from all three sites. (Owner edict 5: root-level styling, never per-instance overrides — the token
*is* the root.)

---

## D-12 · MAJOR — the avatar's failure state was never designed

`Avatar` + `AvatarImage`, no `AvatarFallback` (lines 145–147; twin at `MobileMenuDropdown.vue:80–82`).
Probe with `avatars.githubusercontent.com` blocked, menu re-opened:

```
img:       { complete: true, naturalWidth: 0, display: "none" }
avatarBox: { w: 28, h: 28, backgroundColor: "rgba(0, 0, 0, 0)", text: "" }
hasFallback: false
```

A 28 × 28 fully transparent hole where the identity mark should be, leaving the handle and tagline
hanging off nothing (`evidence-avatar-offline.png`). `AvatarFallback` is exported by glass-ui and
re-exported at `demo/ui/avatar/index.ts:1`. It is never used.

Also a design decision worth naming: the application's chrome makes a **third-party network
request** (`https://avatars.githubusercontent.com/u/2848617?v=4`) every time this menu opens, for a
decorative mark. The identity of the app's dock depends on GitHub being reachable.

**Cross-ref.** CHALLENGE-C `C-8` (same seat, code axis). Measurements above are this seat's.

---

## D-13 · MAJOR — two hand-maintained copies of one menu, already drifted, and one device crosses the seam

`ProfileSection.vue` (`hidden lg:flex`, lines 48 and 127) and `MobileMenuDropdown.vue`
(`lg:hidden`, line 38) are two implementations of one menu. Duplicated verbatim: the 700-byte
octocat `<path>`, the avatar/handle/tagline block, the Share-color row, the Dark-mode row **and its
six-line comment**.

Measured drift, three ways:

| state | desktop (`ProfileSection`) | mobile (`MobileMenuDropdown`) |
|---|---|---|
| admin, no slug | gold pill **in the band**, `--color-gold`, `gold-shimmer` (`:96`) | muted pill **inside the menu**, `--muted-foreground`, no shimmer (`:67`) |
| logged in | `DropdownMenuSeparator` before "Regenerate slug" (`:86`) | **no separator** (`:60→:61`) |
| logged out | a Login **button in the band** (`:111`) | a Login **row inside the ⋮ menu** (`:71`) |

One state — "I am an administrator" — has two different identities depending on viewport width.

And a single device crosses that seam: `shots/zoom-200-desktop/picker.png` is the WCAG 1.4.4 reflow
arm (720 CSS px @2×). `evidence-zoom200-dock.png` shows the dock at 200 % zoom as
`Home ⌄ | Picker About | ⋮` — **the entire ProfileSection is gone**, account affordance and theme
control with it, replaced by the *other* twin's overflow menu. `STATES.json` confirms the nodes are
present-but-hidden (body text still contains "Login  @mbabb"). A desktop user who zooms to 200 %
does not get a responsive variant of this component; they get a different component with a different
admin identity.

**Canon.** `VISUAL-CONSTITUTION.md §3.7`: "Spacing is container-scaled from glass-ui tokens. **No
desktop-tight/mobile-airy fork and no breakpoint pile.**" `§3.6`: mobile is one sequence beneath
*the same* top dock.

**Cross-ref.** CHALLENGE-C `C-9`, CHALLENGE-L `L-6`. This seat adds the 200 %-zoom arm, where the
drift becomes a same-device defect rather than a cross-device one.

**Cure.** One menu component, one content model, two presentations chosen by a container query —
not two files.

---

## D-14 · MAJOR — RTL renders the wordmark as `mbabb@`

`shots/rtl-desktop/picker.png`, crop at `evidence-rtl-wordmark.png`: the dock reads
`mbabb@ | Login ⇥ | ← Tools 🖌 | Home ⌄`. The `@` — a bidi-neutral character — has reordered to the
end of the string. The app's author mark is corrupted the moment the document direction flips.

The same applies to `pm.userSlug.value` in the slug pill (line 75) and to the handle link
(line 149): none is isolated.

**Canon.** `VISUAL-CONSTITUTION.md §6.1`: "CSS strings, hex, slugs, IDs and provenance render in
**LTR-isolated spans** inside RTL prose." `§5.2`, last row: "CSS direction keywords, physical axes,
code, hex, **slug**, ID … preserve the declared physical/domain meaning."

Secondary, same capture: the `LogIn` glyph is a physical right-pointing arrow that does not mirror,
while its position does — in RTL the composite `Login →]` reads as *leaving*.

**Cure.** One `<bdi>` (or `dir="ltr"`) primitive for every handle/slug/ID rendering in the shell —
this is exactly the "provenance" species the constitution already legislates, so it belongs in the
shared idiom, not in three ad-hoc spans.

---

## D-15 · MAJOR — a desaturated slab inside a chromatic capsule, and the boundary is stated three times

Pixel scan of `shots/safari-desktop-light/picker.png` across the band at y = 40.5 CSS:

```
band                    (246,169,194)   chromatic
… separator @ x=746.5   (211,147,167)   1px
Login border box        x 757.7 → 844.2   (capsule ring + shadow)
Login wash slab         x 767.5 → 834.0   (200,167,172)   desaturated neutral
… separator @ x=854.0   (211,149,166)   1px
@mbabb wash slab        x 877.0 → 933.5   (200,168,172)
```

Two facts follow. First, the wash is a **neutral grey over a saturated pink band** — measured
chroma collapses from a pink at `(246,169,194)` to `(200,167,172)`, near-neutral. On a chromatic
ground that reads as dirt, not glass; it is the single ugliest thing in the band and it is what makes
the two right-hand pills look smudged in `evidence-dock-light-3x.png`.

Second, one control states its boundary **three times**: the capsule ring at 757.7/844.2, the wash
slab edge ~10 px inside it at 767.5/834.0, and a `DockSeparator` on each side (lines 49 and 123).

**Canon.** `VISUAL-CONSTITUTION.md §2`: "One surface has one tier. **An inner card is not
automatically another pane of glass.** Glass earns its blur by revealing live content; otherwise it
is a neutral well." `PROPORTION-AUDIT.md` PR-05 / §5.4: "A divider is retained only when grouping
would be ambiguous without it. **Spacing plus material already expressing the same boundary makes the
line duplicative.**"

**Cure.** `emphasis="quiet"` removes the wash (D-1, D-3) and the inner boundary with it; the
capsule's own ring plus the band's gap already separate the controls, so both `DockSeparator`s go.
That is one edit that closes D-1, D-3, D-15 and D-16 together.

---

## D-16 · MAJOR — seat-height break and off-centre separators: the band's rhythm fails at this component

Measured seat geometry in `nav.dock-band` (Chromium, 1440 px):

| seat | x | width | **height** |
|---|---|---:|---:|
| Home | 496.3 | 106.9 | **32** |
| Tools | 626.2 | 104.5 | **32** |
| Login | 757.7 | 86.5 | **28** |
| @mbabb | 867.2 | 76.6 | **28** |

The two seats this component owns are 4 px shorter than every other seat in the same band — 87.5 %
of the dock's control height — so the band's silhouette steps down at its right end. `size="xs"` is
a valid glass-ui size (`--control-h-xs`); it is simply the *wrong rung* for a dock seat, where the
dock's own trigger family is `--control-h-*` one step up.

Separator placement, from the pixel scan (line positions are exact, 1 px):

| separator | air on the left | air on the right |
|---|---:|---:|
| before Login (x 746.5) | **15.8 px** (from Tools) | **10.2 px** (to Login) |
| after Login (x 854.0) | **9.8 px** (from Login) | **12.2 px** (to @mbabb) |

Neither line is centred in its own gap, and the two asymmetries point in **opposite** directions —
the artefact of nesting this component's local `gap-1` inside the dock layer's own gap. At a 1 px
hairline these 3–5 px errors are the difference between a ruled band and a wobbly one.

**Canon.** `PROPORTION-AUDIT.md §1`: "Every element earns its scale, interval, boundary and
material from its job relative to the local protagonist"; §5.8: measured rects decide.

---

## D-17 · MINOR — two adjacent controls, two hover languages, one of them 1.3 px

Measured rest → hover (real pointer, Chromium):

| control | color | background | scale | underline |
|---|---|---|---|---|
| Login | `oklch(0.4712 …)` → **unchanged** | unchanged | 1 → 1.015 | none |
| @mbabb | `oklab(0 0 0 / 0.7)` → `rgb(0,0,0)` | unchanged | 1 → 1.015 | none → **underline** |

Login's entire hover affordance is a 1.5 % scale — **1.3 px of growth on an 86.5 px pill**. It has
no colour or background response because the inline `color` (D-4) pins the ink and
`emphasis="secondary"` ships no hover rule; only `quiet` does. Its neighbour, 23 px away, gets ink
*and* an underline. Same band, same instant, two different statements about what "interactive" means.

---

## D-18 · MINOR — the file is four components wearing one name

`ProfileSection.vue` renders **two** sibling roots (lines 48 and 127) and owns four unrelated jobs:

1. account identity + account actions (Profile / Login / admin),
2. **Share color** — a product action about the user's colour, not about the author,
3. an outbound GitHub link and an author credit,
4. **the application's only theme control**.

Consequences that are design consequences, not tidiness: the theme control — a global system
preference — is discoverable only by opening a personal vanity menu; it exists only at `lg:` in this
file and only inside `⋮` in the twin; and "Share color", the one row here a colour-picker user
actually wants, is filed under someone's name. Two roots also mean the parent cannot position the
account block and the author block independently — they are welded by import order.

**Canon.** Owner edict 1 (focused modules with real encapsulation); `VISUAL-CONSTITUTION.md §7
(Shell/dock)` — "Direct route changes keep its full navigation identity", the dock's regions are
enumerated by job.

**Cure.** Three components: `DockAccount`, `DockAuthor`, and a `DockThemeControl` that is a
first-class dock seat (its own `DropdownMenuCheckboxItem`, or a dock control) rather than the last
row of a credit menu.

---

## D-19 · MINOR — one seat, two identities for tooling

`data-o18="profile-trigger"` (line 64) is on the logged-in trigger only. The logged-out Login
trigger (line 111) — the same seat, the same position, the same material — has no hook. Any probe
that keys on `[data-o18="profile-trigger"]` silently measures nothing for the state most visitors
are in. (The visual matrix confirms: all 60 captures are the logged-out state.)

---

## D-20 · INFO — states this component can enter that were never designed

Enumerated against the challenge list. `—` = not applicable to this component.

| state | designed? | evidence |
|---|---|---|
| empty (no session) | yes — Login button | `:102–121` |
| populated (slug) | partial — the trigger says **"Profile"**, not the identity; the slug is hidden behind a click, while the admin and logged-out states both put their identity in the band | `:59–68` |
| admin | **broken** — shimmer dead, twin-divergent, and there is **no logout affordance at all** for an admin without a slug | D-5, D-13 |
| loading / pending | **no** — logout, regenerate and copy are async with no pending state; glass-ui's `Button` ships `loading` and it is unused | D-8, D-9 |
| error | **no** — no failure path for logout / regenerate / copy / avatar | D-8, D-12 |
| disabled | **no** — offline or unauthenticated-API is indistinguishable from healthy | — |
| hovered | inconsistent | D-17 |
| focused | producer ring only, `:focus-visible` verified true, ring hue = the trigger's own ink | probe |
| pressed / active | producer `tap-squish` only | — |
| selected | — | — |
| dragging | — | — |
| overflowing / truncated | `whitespace-nowrap` on every label; a long slug in the pill (`:73–75`) has no truncation rule | `:75` |
| RTL | **broken** — `mbabb@` | D-14 |
| reduced-motion | **OK** — the only animation present (`gold-shimmer`) is producer-gated behind `prefers-reduced-motion: no-preference`; `.button { transition: none }` under reduce | glass-ui CSS |
| forced-colors | acceptable — inline inks are overridden by the UA; the admin state survives because the word "admin" carries it, not the gold | `shots/forced-colors-desktop/picker.png` |
| zoom 200 % | **the component does not exist** | D-13 |

---

## Motion

The component declares **no motion of its own** — no keyframes, no transitions, no
`--animation-slide-*`. Owner edict 6 is therefore satisfied vacuously; nothing was deleted.

Two motion observations belong to it anyway:

1. It **hosts** an infinite producer animation that paints nothing (D-5). Reduced-motion is
   respected, so the defect is waste and dead decoration, not an accessibility failure.
2. The `linkCopied` swap (`Share2 → Check`, "Share color" → "Copied!", line 155–156) is an
   instantaneous state change with no effect curve, in a design system that specifies one
   (`VISUAL-CONSTITUTION.md §6`: "Color/opacity effects use the corresponding short effect curve").
   The panel does not reflow on the swap — the tagline (148.6 px) governs the content width, not
   the row — so this is a polish gap, not a layout defect.

The producer's `scale 1 → 1.015` hover animates `scale`, which is compositor-only. No property this
component touches forces layout.

---

## Negative proofs — what I attacked and could not break

1. **Horizontal overflow**: `overflowX = 0` on all 60 captures in `REPORT.json`, including the
   390 px mobile arms and the 200 % zoom arm. The band never scrolls the page.
2. **Page errors**: `pageErrors = 0` across the matrix; the only console error on `/#/` is
   `WebGL: context lost` (HeroBlob, not this component).
3. **Reduced motion**: verified in glass-ui's compiled CSS — `.gold-shimmer`'s animation is inside
   `@media (prefers-reduced-motion: no-preference)` and `.button` drops its transition under
   `reduce`. Nothing this component adds escapes that gate.
4. **Tap targets**: 28 × 86.5 and 28 × 76.6 clear WCAG 2.5.8's 24 px AA minimum, and neither appears
   in the audit's `smallTapTargets` rows for `/#/`. (They fail 2.5.5 AAA's 44 px, which the tranche
   does not adopt.)
5. **Menu reflow on the copy flourish**: the panel is 214.6 px wide, governed by the 148.6 px
   tagline plus the 28 px avatar — the "Share color" → "Copied!" text swap cannot resize it.
6. **Focus visibility**: `:focus-visible` matches on both triggers in Chromium and the producer's
   `focus-ring` box-shadow appears (`color(srgb 0.6655 0.0001 0.2617 / 0.3)`). WebKit's 12-Tab row
   in `STATES.json` shows `body` because macOS Full Keyboard Access is off — the harness's own
   MT-F022 note — so I did not score a focus gap from WebKit.
7. **`verbatimModuleSyntax`**: every import in the file is a value import; there is no type-only
   import to mis-declare. No violation.
8. **Forced colors**: the admin state does not become colour-only when the inline gold is
   overridden — the literal word "admin" carries it.

---

## The single architectural transposition

Every BLOCKER and most MAJORs collapse into one move. Today the file builds dock furniture out of
page primitives and then corrects them with per-instance classes, inline styles, and props from a
design system two majors old. The transposition:

1. **Consume glass-ui 7's real vocabulary.** `emphasis="quiet"` for the wordmark, the dock's own
   trigger family for the account seat, `DropdownMenuCheckboxItem` for Dark mode, `as="a"` for the
   link row, `AvatarFallback` for the avatar, `tone="destructive"` for the destructive row,
   `--ui-glyph` for icon size, `--dropdown-menu-font` for the menu family. Every one of these
   already exists. Eight declared intentions stop being classes the cascade ignores and become
   props the producer reads.
2. **Delete the wash under the accent ink**, and the ink's referent becomes true by construction —
   D-1 closes without teaching the certifier anything, and D-15's slab and D-3's material collision
   close with it.
3. **One menu, one content model, two presentations** — the twin dies, the drift dies, the 200 %
   zoom seam dies.
4. **Split the file by job** — account, author, theme — so the app's theme control stops living in
   a credit menu.

What must *not* happen: another round of comment-annotated patches on inline styles. The file
already contains a comment announcing the retirement of a cascade-dead accent (lines 103–110) three
lines above a live cascade-dead accent (D-4). That is the shape of the failure, and it is a design
process defect as much as a design defect.

---

## Ranked

| ID | Severity | One line |
|---|---|---|
| D-1 | BLOCKER | the certified trigger ink measures **3.43:1** on the shipped light frame — the referent omits the button's own wash |
| D-2 | BLOCKER | the GitHub row renders as a **broken two-line item** in every scheme, both twins; a focusable `<a>` nests inside a `menuitem` |
| D-3 | MAJOR | `variant="outline"`/`"ghost"` are not glass-ui 7 API — action and wordmark render as identical material |
| D-4 | MAJOR | the accent `border-color` binding is dead (`border-style: none`), inside the comment that says it was retired |
| D-5 | MAJOR | the admin gold shimmer is cascade-dead while `metal-shimmer-sweep` runs forever |
| D-6 | MAJOR | the theme glyph is **16 × 24**; `aspect-square` is inert; solid mark among outline icons |
| D-7 | MAJOR | Dark mode is a checkbox shipped as `role="menuitem"`, `aria-checked` null, state in an aria-hidden glyph |
| D-8 | MAJOR | two copy actions, one state design — Copy slug is `void writeClipboard()`, silent on success and failure |
| D-9 | MAJOR | Regenerate slug destroys identity with no confirm, no undo, and the quietest ink in the menu |
| D-10 | MAJOR | control labels are Fira Code **700** — §4's closed matrix says Plus Jakarta, non-bold; three families in the band |
| D-11 | MAJOR | `font-display` on the menu is a dead class (3 sites) — the producer's `--dropdown-menu-font` owns it |
| D-12 | MAJOR | no `AvatarFallback` — a 28 × 28 transparent hole offline; third-party fetch from the app chrome |
| D-13 | MAJOR | two hand-maintained twins, drifted three ways; at 200 % zoom one device crosses the seam |
| D-14 | MAJOR | RTL renders the wordmark as **`mbabb@`**; no LTR isolation on wordmark, handle or slug |
| D-15 | MAJOR | a desaturated grey slab inside a chromatic capsule; the boundary is stated three times |
| D-16 | MAJOR | 28 px seats in a 32 px band; both separators off-centre, in opposite directions |
| D-17 | MINOR | two adjacent controls, two hover languages — Login's is 1.3 px of scale |
| D-18 | MINOR | one file, two roots, four jobs — the app's only theme control lives in a credit menu |
| D-19 | MINOR | `data-o18` on the logged-in trigger only; the shipped state has no hook |
| D-20 | INFO | loading, error, disabled, truncation and the admin-logout path were never designed |
