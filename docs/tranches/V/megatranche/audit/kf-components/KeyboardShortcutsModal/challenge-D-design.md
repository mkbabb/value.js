claude-opus-5[1m]

# CHALLENGE · `KeyboardShortcutsModal.vue` · axis D (DESIGN)

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/shell/KeyboardShortcutsModal.vue` (69 lines, no `<style>` block)
**Mode:** static, read-only. No installs, no dev server, no browser. Livable-only claims are marked **UNPROVEN-NEEDS-LIVE** for the SS-13 visual audit.
**Corpus folded:** `docs/tranches/V/megatranche/formation/keyframes/lane-frontend.md` (shadow census S-1..S-8, phantom-dep F-1). This component is named there at §4 (`69 | KeyboardShortcutsModal.vue | G`) and §3.2 (import line `:48-51`) but was never assessed on design. No contradiction with the lane is asserted; two corroborations are cited inline (F-1, S-3/S-6 idiom).

**Tally: 20 defects · 1 blocker · 6 superlatives.**

---

## 0. What the component is, as built

19 shortcuts reach it at runtime — 18 from `useControlsKeyboardShortcuts.ts:50–71`, 1 from `EditorShell.vue:190` — across 4 groups (General 1, Playback 9, Navigation 5, Actions 4). It renders them as a header + a single scrolling grid of `label ··· <kbd>` rows inside a glass `Dialog`. It is the only surface in the app that documents the keyboard layer, and its audience is by construction keyboard users.

That framing is what makes D-1 and D-2 blocking rather than cosmetic: the two hardest defects both land on the exact population the component exists to serve.

---

## 1. BLOCKER

### D-1 · The shortcut list is a scroll container that no keyboard can reach — **BLOCKER**

`KeyboardShortcutsModal.vue:10`

```
<div class="grid gap-4 max-h-[var(--panel-max-h)] overflow-y-auto pr-1">
```

`overflow-y-auto`, no `tabindex="0"`, no `role`, no accessible name. WCAG 2.1.1 (Level A) requires all functionality — scrolling included — to be operable from a keyboard; a scroll container that is neither focusable nor contains a focusable descendant cannot be scrolled by keyboard at all. This is axe-core's `scrollable-region-focusable` rule verbatim.

There is nothing focusable *inside* the region either. Every descendant is a `<div>`, `<span>`, `<h3>` or `<kbd>` — `KeyboardShortcutsModal.vue:11–31`. Reka's `DialogContent` autofocuses the close `<button>` (`dialog-BKSTfmIQ.js`, the `showClose` branch renders `DialogClose` with `class="focus-ring absolute right-(--overlay-pad-inline) top-(--overlay-pad-block) …"` and an `sr-only` "Close"), which sits *outside* the scroll box. So `Tab` from the open dialog cycles one button and returns; arrow keys and PageDown reach no scrollable focus context.

**The region always overflows.** Measured against the shipped tokens, not assumed:

| block | arithmetic | px |
|---|---|---|
| row height | `py-1.5` = 6+6, content = `max(text-small line, .kbd min-height 1.5rem)` = 24 | 36 |
| row gap | `grid gap-1` (`:15`) | 4 |
| group heading | `--type-admin-label: 0.625rem` @ `line-height: 1` + `mb-2` (`:12`) | 10 + 8 |
| General (1 row) | 18 + 36 | 54 |
| Playback (9 rows) | 18 + 9·36 + 8·4 | 374 |
| Navigation (5 rows) | 18 + 5·36 + 4·4 | 214 |
| Actions (4 rows) | 18 + 4·36 + 3·4 | 174 |
| inter-group `gap-4` ×3 (`:10`) | 3·16 | 48 |
| **content total** | | **864** |

Cap is `--panel-max-h: 60dvh` (`demo/styles/design-idioms.css:48`). 864 px = 60dvh only when the viewport is **1440 px tall**. Every realistic viewport therefore scrolls, and the amount hidden is large: at a 900 px-tall display the cap is 540 px and **324 px (≈ 9 rows, the whole tail of Playback plus Navigation and Actions) is unreachable without a mouse wheel or trackpad**.

`.kbd` geometry sourced from `node_modules/@mkbabb/glass-ui/dist/styles/utilities/base-misc.css` (`min-height: 1.5rem; min-width: 1.5rem; padding: 0 .375rem; font-size: var(--type-micro)`), reachable via `styles/index.css → ./utilities.css → ./utilities/base-misc.css` — verified, the class is live, not phantom.

**Falsifier:** open the modal, `Tab` to the close button, then press `↓`/`PageDown` and observe the list scroll — or find any focusable element inside `[data-slot="dialog-content"] > div.overflow-y-auto`. Either observation kills this claim. Equally: if the rendered content height is ≤ `60dvh` at a common viewport, the "always overflows" half dies (the a11y half survives regardless, but drops to MAJOR).

---

## 2. MAJOR

### D-2 · Symbol-only key chips carry no accessible text — **MAJOR**

`KeyboardShortcutsModal.vue:25–29` renders each part of `formatComboParts(shortcut.raw)` as a bare `<kbd class="kbd">{{ part }}</kbd>`. No `aria-label`, no `title`, no visually-hidden twin.

The glyph table is `node_modules/@mkbabb/glass-ui/dist/keyboard.js`, function `p()`. On macOS (`isMac`, same file) the modal's 19 rows render these as their *entire* content:

| raw | rendered chip(s) | what a screen reader gets |
|---|---|---|
| `Space` | `␣` U+2423 OPEN BOX | "open box" / silence |
| `Delete` | `⌫` U+232B | "erase to the left" / silence |
| `Mod+S` | `⌘` `S` | varies by SR/voice |
| `Mod+Shift+Z` | `⌘` `⇧` `Z` | `⇧` U+21E7 = "upwards white arrow" |
| `ArrowLeft` | `←` | "leftwards arrow" |
| `Escape` | `Esc` | fine |

Seven of the ten glyph branches in `p()` emit non-alphabetic characters whose announcement is voice-and-vendor dependent. The row's only other content is the label `<span>` (`:21–23`), which names the *action* ("Play / Pause") and never the *key*. A screen-reader user therefore receives the full list of what the app can do and no reliable statement of how to do any of it — which is the entire payload of the component.

**Falsifier:** run VoiceOver/NVDA over the open modal and hear `␣`/`⌫`/`⇧` announced as "space", "delete", "shift". If the SR glyph tables cover them, this drops to MINOR (the visual-only case would remain).

### D-3 · Non-Mac combos lose the `+` join that glass-ui's own formatter mandates — **MAJOR**

The producer ships two formatters side by side in `keyboard.js`:

```
function m(e) { return e.split("+").map(p); }          // formatComboParts
function h(e) { return m(e).join(o ? "" : "+"); }      // formatCombo
```

`h` (`formatCombo`) encodes the platform rule explicitly: **Mac joins with the empty string (`⌘⇧Z` reads as one glyph run), every other platform joins with a literal `+`.** The modal calls `m` (`formatComboParts`, imported at `:50`) and supplies its own separator — `class="flex gap-0.5"` (`:24`), i.e. **2 px of whitespace**.

On Windows/Linux this turns `Mod+Shift+Z` into three word-chips `Ctrl` `Shift` `Z` separated by 2 px with no operator, which reads as a *sequence* ("press Ctrl, then Shift, then Z") rather than a *chord*. The distinction is exactly what `+` disambiguates, and the library states the rule; the consumer overrides it without stating why.

**Falsifier:** load the demo on a non-Mac UA and see a `+` between chips, or find prose in the repo electing the chip idiom over `formatCombo` for non-Mac. Either kills it. (On Mac the chip idiom is defensible and this finding does not apply.)

### D-4 · `DialogContent`'s `scroll` axis is left at its `false` default, so the dialog has no viewport bound — **MAJOR**

`node_modules/@mkbabb/glass-ui/dist/components/dialog/DialogContent.vue.d.ts` documents the prop:

> ```
> /**
>  * Bound the dialog to the viewport and make its content the single vertical
>  * scroll owner.
>  */
> scroll?: boolean;
> ```

and the runtime confirms the default and the effect (`dialog-BKSTfmIQ.js`):

```
scroll: { type: Boolean, default: !1 },
…
Y = a(() => d.scroll ? g.value ? "max-h-[calc(100dvh-2rem)] overflow-y-auto" : "overflow-y-auto" : "")
```

`KeyboardShortcutsModal.vue:3` passes only `class="max-w-md"`. With `scroll` false, `Y` is the empty string — **no `max-height` is applied to the dialog at any level.** The centered base class is `K = "fixed left-1/2 top-1/2 z-modal grid w-full max-w-lg gap-4 [--overlay-pad-inline:--spacing(6)] [--overlay-pad-block:calc(var(--overlay-pad-inline)*1.272)] px-… py-…"` — width-bounded, height-unbounded, `position: fixed`, translated `-50% -50%`.

The consumer's inner `max-h-[var(--panel-max-h)]` clamps **only the list**, not the chrome. Dialog height therefore resolves to:

```
H_dialog = padding-block 2×30.5 + header ≈56 + gap-4 16 + 0.60·dvh
         ≈ 133px + 0.60·dvh
```

(`--overlay-pad-inline` = `--spacing(6)` = 24 px; `--overlay-pad-block` = 24 × 1.272 = 30.5 px.)

`H_dialog > dvh` whenever `133 + 0.6H > H`, i.e. **below ≈ 333 px of viewport height** the dialog exceeds the viewport. Because it is centred by translate, the overflow spills off *both* edges — the top of the `<h2>` title and the bottom of the last row clip simultaneously — and since `position: fixed` with no `overflow` and reka's body scroll-lock, **neither is recoverable by scrolling.** Landscape phones at 320 px (iPhone SE class) and split-screen/short browser windows sit inside that band.

The primitive exists to prevent precisely this and is one boolean away.

**Falsifier:** at 568×320, read `document.querySelector('[data-slot="dialog-content"]').getBoundingClientRect()` — if `top ≥ 0` and `bottom ≤ 320`, the claim dies. Also dies if some ancestor style not in `placement.css`/`K` imposes a max-height.

### D-5 · `--panel-max-h` is a mobile-panel token, borrowed for a desktop modal — **MAJOR (token misuse)**

Two independent in-repo authorities say what this token is for.

`demo/styles/design-idioms.css:46–48`:
> `--rail-width` is the DERIVED rail track … **`--panel-max-h` caps mobile panels**; `--mask-fade` the fade.

`demo/DESIGN.md:136`:
> The U.B styles pass moves … the **geometry strays (`--rail-width`, `--panel-max-h`, `--mask-fade`) out of `design-idioms.css`**

So the modal (a) consumes a token whose written contract scopes it to mobile panels, at every breakpoint, in a centred desktop dialog; and (b) couples itself to a token its own design doc has already scheduled for relocation. The only other consumer honours the stated scope — `AnimationControlsGroup.vue:85` applies `max-h-[var(--panel-max-h)]` inside a mobile-branch ternary.

The consequence is not merely nominal: a *panel* is bottom-anchored and clipped by the viewport edge, so 60dvh is a sane cap for it. A *centred modal* is clipped at both ends, which is what makes D-4 bite. The token was chosen for its number, not its meaning.

**Falsifier:** find a comment or ruling electing `--panel-max-h` as the shared modal cap, or show `AnimationControlsGroup.vue:85` applies it unconditionally at all breakpoints (making it a general token in practice).

### D-6 · A 19-row term/definition table rendered as anonymous `div`s — **MAJOR (semantics)**

`KeyboardShortcutsModal.vue:11–31` is, structurally, a definition list: group → (action term, key definition)*. It renders as `div > div > (span, div > kbd*)` with the group `<h3>` a *sibling* of the row container (`:12` vs `:15`), not an ancestor or an `aria-labelledby` target.

Consequences, all decidable from the markup:

1. **No list semantics.** A screen reader gets no "list of 9 items" cue, no item count, no item boundaries. The user cannot know how many Playback shortcuts exist or when the group ends.
2. **No term↔definition association.** The `<span>` label and the `<kbd>` group are siblings under a `flex justify-between` — visually paired by *position only*. Nothing programmatic ties "Play / Pause" to `␣`. Under linearised reading (SR, reader-mode, forced-colors, narrow viewport) that pairing is the only thing holding the component's meaning together, and it is not encoded.
3. **Group headings float free.** `<h3>{{ group }}</h3>` (`:12–14`) is followed by, not associated with, `<div class="grid gap-1">`. `<section aria-labelledby>` or `<dl>`/`<dt>`/`<dd>` would encode it; nothing does.

`<dl>` with `<dt>`/`<dd>` is the native fit and costs no styling — `display: grid` on a `<dl>` behaves identically to the current `div`.

**Falsifier:** show that reka or glass-ui injects list/`aria-owns` semantics onto `DialogContent` descendants (grep of `dialog-BKSTfmIQ.js` shows it injects only `data-slot`, `data-surface`, `data-placement`, `data-scroll`, `data-reveal`, `data-motion`, `data-spring` — none semantic), or produce an SR transcript announcing item counts.

---

## 3. MINOR

### D-7 · `pr-1` is a physical property — the scrollbar gutter lands on the wrong side in RTL — MINOR

`KeyboardShortcutsModal.vue:10` uses `pr-1` as a scrollbar allowance. Under `dir="rtl"` the scrollbar moves to the inline-start edge while `padding-right` stays put: the gutter is reserved where there is no scrollbar and absent where there is. `pe-1` is the logical equivalent, and the rest of the component is already logical-property-clean (`justify-between`, `items-center`, `gap-*` all flip correctly), so this is the single RTL break in the file.

Independently, glass-ui ships the intended mechanism — `.scroll-gutter-stable { scrollbar-gutter: stable; }` in `styles/utilities/base-misc.css`, the same file that defines `.kbd` this component already relies on.

**Falsifier:** the demo never renders under RTL and declares so (no `dir` handling anywhere would make this theoretical, though still wrong-by-construction), or `pr-1` serves some other purpose than gutter.

### D-8 · 4 px is not a scrollbar gutter — MINOR

`pr-1` = `0.25rem` = **4 px**. A classic (non-overlay) scrollbar is 15–17 px on Windows and on macOS with "Show scroll bars: Always". The reserved gutter under-serves it by ~11–13 px, so the scrollbar overlays the right edge of the `<kbd>` chips — which are `justify-between`-pushed hard against that edge (`:19`, `:24`). The chips are the highest-value pixels in the component.

**Falsifier:** measure the right-edge overlap on Windows Chrome with overlay scrollbars disabled; if the chips clear the scrollbar, the claim dies. (On macOS overlay scrollbars it will not reproduce — this is a platform-conditional defect, hence MINOR not MAJOR.)

### D-9 · Non-interactive rows carry an interactive affordance — MINOR (false affordance)

`KeyboardShortcutsModal.vue:19`:

```
class="flex items-center justify-between py-1.5 px-2 rounded-md hover:bg-muted/50 transition-colors"
```

`hover:bg-muted/50` + `transition-colors` + `rounded-md` is the row-button idiom. The row has no `@click`, no `role`, no `tabindex`, no `cursor-pointer`, and nothing to activate — it is a static table row. In a panel that lists *actions*, highlighting each action on hover reads as "click to run it", and nothing happens. The mismatch is worse here than in a generic list because the content is literally a menu of commands.

**Falsifier:** a click handler or `v-on` binding elsewhere in the render tree (none exists in the file), or a stated design intent for hover-as-reading-aid.

### D-10 · `text-body font-medium` is an unresolved cascade race, not a merge — MINOR

`KeyboardShortcutsModal.vue:5`: `<DialogTitle class="text-body font-medium">`.

`text-body` is not a font-size utility here — glass-ui defines it as a full semantic utility in `styles/typography/semantic.css`:

```
@utility text-body { font-family: var(--font-text); font-size: var(--type-body);
  line-height: var(--type-leading-body); font-weight: 400; text-wrap: pretty; }
```

It **hard-sets `font-weight: 400`**, directly contradicting `font-medium` (500). glass-ui's own class merger does not catch it — `class-names-Cpy5eaBk.js` puts them in *different* conflict groups:

```
["font-size",   /^text-(micro|small|caption|body|prose|admin-label|…)$/],
["font-weight", /^font-(thin|extralight|light|normal|medium|semibold|bold|…)$/],
```

so both classes survive into the emitted string and the winner is decided by source order in the compiled sheet, not by author intent. (Note also `theme/bridges.css` publishes `@theme inline { --text-body: var(--type-body); … }`, so `text-body` is *additionally* resolvable as a bare font-size utility — glass-ui's own precompiled `styles/components.css` contains `.text-small{font-size:var(--type-small)}`, i.e. the bridge form, proving both resolutions are live in the ecosystem.) Either way the author asked for a weight the utility denies.

**Falsifier:** `getComputedStyle($0).fontWeight === "500"` on the rendered `<h2>` proves `font-medium` wins and the race is benign in practice — the latent conflict remains but drops to INFO. **UNPROVEN-NEEDS-LIVE** for which side wins.

### D-11 · Heading/body proportion inverts, and worsens monotonically with viewport width — MINOR (Aristotelian)

Group heading (`:12`) is `text-admin-label`; row labels (`:21`) are `text-small`. From `styles/typography/scale.css`:

```
--type-admin-label: 0.625rem                                  /* FIXED */
--type-small:       clamp(0.875rem, 0.8rem + 0.25vw, 1.25rem) /* FLUID */
```

| viewport | heading | row label | ratio |
|---|---|---|---|
| 1024 px | 10 px | 15.4 px | 0.65 |
| 1440 px | 10 px | 18.6 px | 0.54 |
| ≥ 1900 px | 10 px | 20 px | **0.50** |

The heading is half the size of the content it heads at the clamp ceiling, and the gap *widens* as the display grows because one term scales with `vw` and the other does not. The eyebrow-label idiom (uppercase, `--type-tracking-caps`, `font-weight: 500`, mono — all from `@utility text-admin-label`) legitimately carries hierarchy at a small size, so this is not wrong per se; what is wrong is that the relationship is **not held constant** — the design decision is made by the viewport, not the designer. `--type-caption` or `--type-micro` (also fixed) would preserve the ratio; a `clamp`-matched pairing would preserve the intent.

Secondary: `text-admin-label` is named for admin chrome. This is a user-facing modal, not the admin dock.

**Falsifier:** show `--type-admin-label` is itself fluid in some scope (it is not — single `:root` declaration in `scale.css`), or a ruling electing the admin token for public surfaces.

### D-12 · The scroll region has no edge affordance, in a repo that already owns two — MINOR

With ~324 px of content hidden below the fold at a 900 px viewport (§D-1), the only signal that content continues is the scrollbar — which is an overlay (invisible at rest) on macOS and iOS, the demo's primary platforms. There is no fade, no mask, no gradient, no "N more" count.

The repo has both mechanisms already in hand:
- glass-ui `FadingScroll` with a vertical axis, used in this very demo at `demo/scenes/easing/EasingTarget.vue:76` (`<FadingScroll axis="y" class="specimen-drawer min-h-0 w-full flex-1">`) — a direct precedent for a scrolling list inside a bounded surface;
- the demo's own `--mask-fade: 2.5rem` token (`design-idioms.css:49`), minted for exactly this and consumed at `ChannelControls.vue:439`.

This corroborates lane-frontend §3.1's utilisation figure (21/73 subpaths reached) from a new angle: `/fading-scroll` *is* one of the 21 reached subpaths, so the idiom is established in-tree and simply not applied here.

**Falsifier:** the region does not overflow (killed by D-1's arithmetic), or overlay scrollbars are shown persistently in the target environment.

### D-13 · Chip gap is smaller than the chip's own bevel — MINOR

`.kbd` (`base-misc.css`) carries `box-shadow: 0 1px 0 1px color-mix(in srgb, var(--border) 30%, transparent)` — offset-y 1, blur 0, **spread 1**, so the shadow extends **1 px horizontally past each edge**. The chips are separated by `gap-0.5` = **2 px** (`:24`).

2 − 1 − 1 = **0 px of clear space** between adjacent chips' painted extents. `⌘` and `⇧` in `Mod+Shift+Z` render as one continuous bevelled slab rather than two keys — which is precisely the perceptual distinction the chip idiom exists to make, and which D-3 already erodes by dropping the `+`. The two defects compound: no operator glyph *and* no visible gap.

**Falsifier:** screenshot two adjacent chips at 2× and measure clear pixels between the shadow extents; ≥ 1 px kills it. Also dies if the shadow's `color-mix` at 30% is too faint to read as an edge at all (in which case the bevel is decorative-only and the finding is moot). **UNPROVEN-NEEDS-LIVE** for the perceptual half.

### D-14 · The cheat-sheet leaves every key it documents armed against the hidden app — MINOR (state coverage)

The global dispatcher in `keyboard.js` has no modal/overlay guard:

```
function _(e, t, n) {
  let r = g(n) ? [...e].reverse() : e;
  for (let e of r) if ((e.options.event ?? "keydown") === t && d(n, e.combo)
      && !(!e.options.allowInInput && f(n.target))) { … e.handler(n); return; }
}
```

`f()` skips only `INPUT`/`TEXTAREA`/`SELECT`/`contenteditable`/`.monaco-editor`. The dialog content is none of those, so with the modal open:

- `Space` → fires `Play / Pause` (`useControlsKeyboardShortcuts.ts:50`, `preventDefault: true`) against a stage the user cannot see. If focus is on the close `<button>`, `Space` *also* activates it — one keypress, two effects, one of them invisible.
- `Escape` → reka's `DismissableLayer` closes the dialog **and** `Stop animation` fires (`:51`; note `g()` reverses the list for Escape, so the last-registered Escape handler wins — here there is only one).
- `Mod+S`, `Delete`, `Mod+Z` → Copy CSS / Delete keyframe / Undo, all mutating hidden state.

A shortcuts reference is the single surface most likely to be *tried*: the user reads "Delete keyframe · ⌫", presses it to see what happens, and it happens — to content behind a scrim. There is no "try it" affordance and no suppression. Either would be a coherent design; neither is chosen.

Filed MINOR rather than MAJOR because it is arguably behaviour-axis, and because a defensible design *could* elect live pass-through — but then the modal owes the user a statement that it is doing so, and none is present.

**Falsifier:** a `disableOutsidePointerEvents`/inert/guard path that suppresses the registry while a dialog is open (none found in `keyboard.js` or `dialog-BKSTfmIQ.js`), or an explicit ruling electing live pass-through.

### D-15 · Description copy is imprecise and incomplete — MINOR (prose)

`KeyboardShortcutsModal.vue:6–8`:

> Press `?` to toggle this panel

Three problems, small each:

1. **"panel"** — it is a modal dialog (`role="dialog"`, `aria-modal`, scrim, focus trap, `--z-modal`). The demo uses "panel" elsewhere for the *non-modal* controls pane (`ControlsPaneWrapper`, `LayerConfigPanel`, `--panel-max-h`), so the word is already spoken for by a different thing.
2. **"toggle"** — developer register. From inside the open dialog the user-facing verb is "close"/"dismiss".
3. **Incomplete.** It is the only dismissal instruction the component gives, and it names the *least* discoverable of the three available (`?`, `Esc`, the X). `Esc` in particular has a side effect here (D-14) and goes unmentioned.

Not trite and not cliché — this is plain, unpadded copy with no AI-tell, which is to its credit. It is simply the wrong noun and one instruction short.

**Falsifier:** a glossary or DESIGN.md clause electing "panel" as the demo's generic overlay noun. (`demo/DESIGN.md` §7 governs `.stage-legend` affordance prose and does not cover overlay nomenclature.)

---

## 4. INFO

### D-16 · Empty / loading / error states are uncovered — INFO

`groupedShortcuts` (`:57–67`) over an empty `shortcuts.value` yields an empty `Map`; `v-for` (`:11`) renders nothing. The result is a titled, described, close-buttoned dialog wrapped around **blank space** — with `gap-4` and 30.5 px padding still reserved, so it is a visibly empty box, not a degenerate one.

Reachability is narrow but non-zero: `useControlsKeyboardShortcuts` is called from `AnimationControlsGroup`, which lane-frontend §7.2/§8 records as async-registered; `EditorShell.vue:190` registers `Show shortcuts` in its own `setup`, so a floor of 1 row normally holds. But `registerShortcut` auto-unregisters on scope dispose (`keyboard.js`: `t() && n(l)`), so any host that mounts the modal outside `EditorShell`'s scope — the standalone playground path the props at `EditorShell.vue` §`extraTabs` prose describes — reaches the empty render.

No loading state is needed (the registry is synchronous) and no error state is possible (no I/O). So the honest scope of this finding is the empty case only.

**Falsifier:** prove no host can mount `KeyboardShortcutsModal` with an empty registry.

### D-17 · Fixed `max-w-md` against fluid type shrinks the measure as displays grow — INFO

`max-w-md` (`:3`) = 28 rem = **448 px, fixed**. Row labels are `text-small` = `clamp(0.875rem, 0.8rem + 0.25vw, 1.25rem)`, **fluid**. Content box = 448 − 2×24 = 400 px.

| viewport | label size | measure (approx. chars at ~0.5em avg) |
|---|---|---|
| 1024 px | 15.4 px | ~52 |
| ≥ 1900 px | 20 px | ~40 |

The longest labels — "Scrub forward (large)", "Previous animation" — plus a 2-chip group at 24 px min-width each begin competing for the same 400 px as the type grows. `flex` will shrink the `<span>` and wrap it, at which point `items-center` (`:19`) vertically centres the chips against a two-line label and the row's 36 px rhythm breaks.

Note this also overrides the primitive's own `max-w-lg` (512 px) from `K` — the merge resolves it correctly (both match the `["max-width", /^max-w-/]` group in `class-names-Cpy5eaBk.js`, so `max-w-md` wins cleanly), but the consumer chose *narrower* than the system default in the one component whose rows are widest.

**Falsifier:** measure the longest row at 1920 px; if no wrap occurs the claim is cosmetic-only. **UNPROVEN-NEEDS-LIVE.**

### D-18 · The inline `<kbd>` inflates the description's line box — INFO

`:7` places `<kbd class="kbd">?</kbd>` inline inside a `text-small` line. `.kbd` is `display: inline-flex; min-height: 1.5rem` (24 px) with internal `line-height: 1`, sitting in a line whose natural box is ~15–20 px. The line box must grow to 24 px+, and inline-flex baseline synthesis shifts the surrounding text relative to the chip.

The same chip in the *rows* (`:25–29`) is a flex item in a 24 px-tall row, where it fits exactly — so the defect is specific to the inline use in the description, and is the reason row height is 36 px rather than the type's natural rhythm.

**Falsifier:** measure the description's rendered line-height against a `?`-free control. **UNPROVEN-NEEDS-LIVE.**

### D-19 · Description-chip contrast clears AA by 0.39 — INFO (thin margin, and unproven on glass)

The `<kbd>` at `:7` inherits `text-muted-foreground` from `DialogDescription` (`:6`) and paints on `.kbd`'s `background: var(--muted)`. Computed from `styles/tokens/light-dark.css` (`--muted: --neutral-1`, `--muted-foreground: --neutral-5`) in the light arm:

- fg `hsl(30 22% 40%)` → L = 0.14397
- bg `hsl(38 26% 95%)` → L = 0.89923
- **ratio = 4.89 : 1** — passes AA (4.5:1), margin 0.39.

At `--type-micro` = 0.6875 rem = **11 px**, this is the smallest text in the component sitting on the thinnest contrast margin.

More importantly the margin is **not what actually ships**: `DialogContent` sets `--glass-bg-rung: var(--glass-bg-dialog)` (`dialog-BKSTfmIQ.js`, the `te` style object) and glass-ui rebinds `--muted-foreground` per surface — five distinct declarations exist (`var(--on-glass-muted)`, `var(--on-glass-muted-strong)`, `contrast-color(var(--card))`, `var(--foreground)`, `var(--neutral-5)`). On a translucent dialog over `HeroAurora`'s animated backdrop the effective ratio is backdrop-dependent and **not statically decidable**. I decline to assert a number for the shipping path.

**UNPROVEN-NEEDS-LIVE** — sample the composited ratio over the aurora at several hues.

### D-20 · Under `forced-colors`, the chips flatten into the prose — INFO

`.kbd`'s entire visual identity is `background: var(--muted)`, `border: 1px solid var(--border)`, and the bevel `box-shadow`. In forced-colors mode the UA overrides `background-color` and `border-color` to system colours and **drops `box-shadow` entirely**. What survives is a 1 px border of `ButtonBorder` around monospace text at 11 px — the key/label distinction collapses to a font change.

glass-ui's forced-colors block (`styles/accessibility.css`) covers only aria-state elements (`[aria-selected]`, `[data-state=checked]`, `[aria-invalid]` …) and does not reach `.kbd`. Nothing in the demo compensates. Because D-6 leaves the row's term↔definition pairing purely positional, forced-colors removes the *last* non-positional cue distinguishing key from action.

Mitigation would live in glass-ui, not here (`.kbd` is the producer's class) — so this is a **relay item for the glass-ui BH inbox** under the standing relay edict, not a fix this component can own alone.

**Falsifier:** render under Windows High Contrast and observe the chips remaining distinguishable.

---

## 5. SUPERLATIVES (L-18, running the other way)

### SUP-1 · Heading order is correct, and correct by delegation rather than by luck

`DialogTitle` resolves to reka's `DialogTitle`, whose default element is `h2` (`node_modules/reka-ui/dist/Dialog/DialogTitle.js:17` → `default: "h2"`). The group headings at `:12` are `<h3>`. h2 → h3, no skipped level, no `<div role="heading">`, no hardcoded `<h1>`. The author reached for the semantic level *below* whatever the primitive emits and got it right without pinning it.

**Falsifier:** an `as` override upstream changing `DialogTitle`'s element (none passed at `:5`).

### SUP-2 · `aria-labelledby` / `aria-describedby` are earned for free

Using `DialogTitle` + `DialogDescription` (`:5`, `:6`) rather than a hand-rolled `<h2>`/`<p>` means reka wires `aria-labelledby` and `aria-describedby` onto the dialog automatically. A large fraction of hand-built modals in the wild ship an unnamed `role="dialog"`; this one cannot, structurally. The `DialogDescription` in particular is optional and frequently skipped — its presence means the dialog announces its own dismissal key on open.

**Falsifier:** inspect the rendered `[role="dialog"]` for the two attributes.

### SUP-3 · The unguarded `{{ shortcut.options.label }}` cannot render blank — the primitive already guarantees it

`:22` renders `shortcut.options.label` with no `v-if` and no fallback, and `ShortcutOptions.label` is **optional** (`useKeyboardShortcuts.d.ts`: `label?: string`). That reads like a latent empty-row defect. It is not — `useRegisteredShortcuts()` returns the *filtered* projection:

```
labeled: e(() => (n.value, [...t].filter((e) => e.options.label)))
```

(`keyboard.js`). Unlabeled shortcuts never enter the list. The author picked the composable that already enforces the invariant instead of re-checking it downstream — the guard is absent because it is unnecessary, which is the right reason for a guard to be absent. **I withdrew a drafted defect on this line after reading the runtime.**

**Falsifier:** an unlabeled shortcut appearing in `useRegisteredShortcuts()` output.

### SUP-4 · Motion is `prefers-reduced-motion`-honest with zero local guards

The component has no `<style>` block and one motion class (`transition-colors`, `:19`) — and it is covered. `styles/utilities/a11y-overrides.css`:

```
@media (prefers-reduced-motion: reduce) {
  *:not([data-allow-motion]) { animation-duration: .01ms !important; animation-iteration-count: 1 !important; }
  *:not([data-allow-motion]) { transition-duration: .1s !important;
    transition-property: opacity, color, background-color, border-color, box-shadow !important; }
}
```

and the dialog's own entrance is governed by the `motion` axis, whose contract states "PRM forces `full → reduced` regardless (a11y absolute)" (`DialogContent.vue.d.ts`). Set against lane-frontend §6.5 — which found PRM coverage across the demo "conscientious but **inconsistent in mechanism**", three different query idioms across 13 sites — this component's answer is the best one available: *delegate and add nothing*. Zero sites, full coverage.

**Falsifier:** confirm `a11y-overrides.css` is reachable — it is: `styles/index.css → ./accessibility.css → ./utilities/a11y-overrides.css`, verified.

### SUP-5 · The label colour choice is contrast-safe on both theme arms

`text-muted-foreground` (`:6`, `:12`) against `--background`, computed from `tokens/light-dark.css`:

| arm | fg | bg | ratio |
|---|---|---|---|
| light | `--neutral-5` `hsl(30 22% 40%)`, L=0.14397 | `--neutral-0` `hsl(40 30% 98%)`, L=0.96015 | **5.21 : 1** |
| dark | `--neutral-5` `hsl(34 14% 62%)`, L=0.35877 | `--neutral-0` `hsl(24 9% 4%)`, L=0.003096 | **7.70 : 1** |

Both clear AA (4.5:1) on the flat token path, and the dark arm clears AAA. `muted-foreground` is the token most often over-reached-for into failure; here it holds on both arms with margin. (Scope: this is the flat path — the glass path remains D-19's UNPROVEN item.)

**Falsifier:** recompute the WCAG relative-luminance chain; or show the flat path is never taken.

### SUP-6 · Zero bespoke chrome — this is the counter-example to lane-frontend's shadow census

lane-frontend §5 indicts the demo for 1 385 lines of glass-ui-shadowing bespoke work (S-1 `KfPillTabs` 217 lines forked over a rationale three majors stale; S-3 timeline cluster 666; S-4/S-5/S-6/S-7 a further 502). This component is the inverse: **69 lines, no `<style>` block, no local `cn()`, no vendored primitive, no reka import.** Every visual affordance is drawn from the producer — `Dialog*` for the shell, `.kbd` for the chips, the `--type-*` scale for the type, `--muted*` for the colour, `formatComboParts` for the platform layer.

The defects above are almost entirely *under*-delegation of one more notch (D-4 `scroll`, D-12 `FadingScroll`, D-3 `formatCombo`, D-7 `.scroll-gutter-stable`) — the failure mode of a component that is already 90 % on-system, not of one that forked. On the bespoke-vs-glass sub-axis this is the strongest file in the `shell/` cluster.

**Falsifier:** a `<style>` block, a local primitive, or a direct `reka-ui` import in the file — none present (69 lines read whole).

---

## 6. Standing-law notes

- **F-1 corroborated, not re-litigated.** Every glass-ui fact above is sourced from `/Users/mkbabb/Programming/keyframes.js/node_modules/@mkbabb/glass-ui/dist/` @ 7.0.0 — the installed copy. lane-frontend F-1 establishes that this copy is undeclared in `package.json` and absent from `package-lock.json`, so **none of the primitive behaviour asserted here is reproducible from a clean `npm ci`.** Every remedy below inherits F-1 as a hard prerequisite.
- **Glass-ui relay.** D-20 (`.kbd` forced-colors) and, arguably, D-3 (whether `formatComboParts` consumers should be handed a separator) are producer-side concerns and belong in the active glass-ui BH inbox under the standing relay edict — not in a keyframes.js wave.
- **Write scope honoured.** This file is the only write. No file in `keyframes.js`, `glass-ui`, or any other repo was created, mutated, or executed; no installs, no dev servers, no browser tooling.

## 7. Fix order, cheapest-first

| # | finding | change | cost |
|---|---|---|---|
| 1 | D-1 | `tabindex="0"` + `role="group"` + `aria-label` on `:10` | 1 line |
| 2 | D-4 | pass `scroll` on `DialogContent` (`:3`) | 1 word |
| 3 | D-7 | `pr-1` → `pe-1`, or `.scroll-gutter-stable` | 1 word |
| 4 | D-9 | drop `hover:bg-muted/50 transition-colors` (`:19`) | 1 deletion |
| 5 | D-15 | "panel" → "dialog"; add the `Esc` hint (`:7`) | 1 line |
| 6 | D-3 / D-13 | `+` separator between chips on non-Mac; widen `gap-0.5` → `gap-1` | 2 lines |
| 7 | D-2 | `<kbd :aria-label="…">` or an `sr-only` twin per chip | ~4 lines |
| 8 | D-5 / D-11 | mint a modal-scoped cap; pair the heading token to the body clamp | tokens |
| 9 | D-6 | `<dl>`/`<dt>`/`<dd>` + `<section aria-labelledby>` per group | ~8 lines |
| 10 | D-12 | wrap the list in `<FadingScroll axis="y">` | 2 lines |
| 11 | D-14 | suppress or annotate the live registry while open | design ruling |

D-1 through D-6 — the blocker and all five MAJORs — are together **under 15 lines**. The component is close to right; it is stopped short of it in six places.
