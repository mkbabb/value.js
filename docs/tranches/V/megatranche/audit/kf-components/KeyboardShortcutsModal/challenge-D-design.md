claude-opus-5[1m]

# CHALLENGE · `KeyboardShortcutsModal.vue` · axis **D — DESIGN**

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/shell/KeyboardShortcutsModal.vue` (69 lines, no `<style>` block)
**Mode:** static, read-only, source-derived. No installs, no dev server, no browser tooling. Livable-only claims are marked **UNPROVEN-NEEDS-LIVE** for the SS-13 visual audit.
**Tree:** keyframes.js working tree read 2026-08-05; glass-ui `7.0.0` as installed in `node_modules` (see F-1 caveat, §6).

**Tally: 18 defects · 2 blockers · 5 superlatives.**

---

## 0. Reading log

Read whole: the target; `EditorShell.vue` (sole host; owns `shortcutsOpen`, registers `?` at `:190`, mounts the modal at `:106`); `useControlsKeyboardShortcuts.ts` (the other 18 registrations, `:50–71`); glass-ui `keyboard.js` (dispatcher + `formatComboParts`/`formatCombo`/`isMac`), `composables/keyboard/useKeyboardShortcuts.d.ts`, `dialog-BKSTfmIQ.js` + the five `dialog/*.d.ts` + `dialog/placement.css`, `styles/utilities/base-misc.css` (`.kbd`, `.scroll-gutter-stable`, `.fading-scroll--y`), `styles/typography/{scale,semantic,utilities}.css`, `styles/glass/ladder.css`, `styles/utilities/a11y-overrides.css`, `class-names-Cpy5eaBk.js`, `fading-scroll-DKsoe_vh.js`; `reka-ui/dist/DismissableLayer/DismissableLayer.js`; demo law: `DESIGN.md`, `styles/design-idioms.css`, `styles/layout.css`, `styles/font-roles.json`; siblings `CSSPasteDialog.vue`, `KeyframesAddDialog.vue`, `ControlsPaneWrapper.css`. Cascade-order questions were settled against the built sheet `dist/gh-pages/assets/index-CL_QYCiO.css` (built 2026-07-16 — **stale** vs HEAD 07-28, so used only for utility emission order, never for a behavioural claim).

**Hitherto corpus folded:** `docs/tranches/V/megatranche/formation/keyframes/lane-frontend.md` — shadow census `S-1..S-8`, phantom-dep `F-1`, token census §6.3, the component table row `69 | KeyboardShortcutsModal.vue | G`, and the import trace at `:120`. Corroborated at S-3/S-5 below; **contradicted explicitly at §5 (X-1)**.

**Prior-pass fold.** A previous D-axis draft occupied this path (2026-08-04, 20 defects / 1 blocker). This pass supersedes it. Two of its finds are distinct from mine and are retained with credit — the glyph-only `<kbd>` chips (now **D-8**) and the `.kbd` forced-colors note (now **D-18**) — and one of its "design ruling" items is escalated to a blocker on new evidence (**D-2**). Its D-1 and mine coincide independently.

---

## 1. Hypotheses that DIED against the tree

L-18 cuts both ways. Five plausible-looking defects are **false**; banking them would be worse than missing them.

| # | Hypothesis | Why it is FALSE |
|---|---|---|
| K-1 | `{{ shortcut.options.label }}` (`:22`) is unguarded and `label?` is optional → blank rows. | `useRegisteredShortcuts` returns the `labeled` computed = `[...t].filter(e => e.options.label)` (`keyboard.js`, the `v` global-state factory). Unlabeled **and** empty-string labels never reach the component. **DEAD.** |
| K-2 | `cn` cannot dedupe glass-ui's default `text-subheading` against the override `text-body` → both font-sizes ship; winner decided by cascade luck. | glass-ui ships its **own** `cn` carrying an explicit custom-scale group: `["font-size", /^text-(micro\|small\|caption\|body\|prose\|admin-label\|heading\|subheading\|title\|display…)$/]` (`class-names-Cpy5eaBk.js`). `text-subheading`/`text-body` share a group key → last wins → `text-body`. Same for the description's `text-sm` vs `text-small`. **DEAD** (→ S-4). |
| K-3 | `text-body` sets `font-weight:400`, `font-medium` is a *different* `cn` group, so the title's weight is ambiguous. | Settled by emission order: full `.text-body{…font-weight:400}` at byte 213879 of the built sheet, `.font-medium{…}` at 218602 — later, equal specificity, wins. The title renders at 500 as authored. **DEAD.** |
| K-4 | `transition-colors` (`:19`) carries no `prefers-reduced-motion` guard, unlike the demo's 13 other PRM sites. | `glass-ui/dist/styles/utilities/a11y-overrides.css` ships a **global** `@media (prefers-reduced-motion: reduce)` block clamping `transition-duration` → `0.1s` and `animation-duration` → `0.01ms` on `*:not([data-allow-motion])`; `DialogContent`'s motion axis independently forces `full → reduced` and degrades `stage: scale|immersive → dim`. A local block would be redundant noise. **DEAD** (→ S-2). |
| K-5 | `text-muted-foreground` on 10px uppercase headings fails WCAG 1.4.3; compute the ratio. | **Not decidable from tokens.** On `.glass-floating` the ladder rebinds `--muted-foreground → var(--on-glass-muted)` through a `clamp()` driven by the **runtime-sampled** `--glass-backdrop-luma`, plus a `contrast-color(var(--card))` branch under `@supports`. The system explicitly targets `--glass-tint-strength-aa`. **NOT CLAIMED — UNPROVEN-NEEDS-LIVE.** SS-13 should measure it; I will not fabricate a ratio from a backdrop-dependent chain. |

---

## 2. The measurement that drives half the findings

**19 labeled shortcuts exist** — 1 at `EditorShell.vue:190`, 18 at `useControlsKeyboardShortcuts.ts:50–71` — matching the host's own "19-shortcut registry" prose (`EditorShell.vue:28`). Four groups, in `Map` insertion order (`:58–63`): **General** (1) → **Playback** (9) → **Navigation** (5) → **Actions** (4).

Rendered body height, every value read from source, at a 1440 × 1080 CSS viewport:

| part | derivation | px |
|---|---|---|
| row content | `flex items-center`; `text-small` = `clamp(0.875rem, 0.8rem + 0.25vw, 1.25rem)` → 16.4px × leading 1.4 = 22.96 — but `.kbd{min-height:1.5rem}` dominates | 24 |
| row box | + `py-1.5` = 0.375rem × 2 | **36** |
| 19 rows | 19 × 36 | 684 |
| intra-group gaps | `grid gap-1` (`:15`); 0+8+4+3 = 15 × 4px | 60 |
| 4 headings | `--type-admin-label` 0.625rem × `line-height:1` = 10px, + `mb-2` 8px | 72 |
| inter-group gaps | `grid gap-4` (`:10`); 3 × 16px | 48 |
| **total content** | | **864** |
| **available** | `max-h-[var(--panel-max-h)]` = `60dvh` = 0.6 × 1080 | **648** |

**The list overflows its port by 216px — six row-equivalents — on a standard desktop.** Cumulative offsets: General ends at 54px, Playback at 444px, Navigation at 674px. The cut therefore lands **26px inside the Navigation group**, which means the **entire `Actions` group — `Copy CSS`, `Delete keyframe`, `Undo`, `Redo`, i.e. every authoring and destructive binding in the application — is below the fold at first paint.** On a 900px window the cap is 540px and nine rows are hidden.

*Falsifier for the whole measurement:* a live `scrollHeight` under 648px on the `:10` element, or a labeled-shortcut count below ~14. Both contradicted by source. The exact px are **UNPROVEN-NEEDS-LIVE**; the **sign of the inequality is source-certain** — 864 vs 648 leaves a 33% margin that no plausible font-metric or line-height slop closes.

---

## 3. Findings

### D-1 · **BLOCKER** · The overflowing list is a keyboard-unreachable scroll port — in the keyboard-shortcuts dialog
`KeyboardShortcutsModal.vue:10`

```
<div class="grid gap-4 max-h-[var(--panel-max-h)] overflow-y-auto pr-1">
```

A scroll container with **no `tabindex`**, **no `role`**, **no accessible name**, and **zero focusable descendants** — `:11–33` are `div`/`h3`/`span`/`kbd` throughout. This is axe-core's `scrollable-region-focusable` rule verbatim, and WCAG 2.2 **SC 2.1.1 Keyboard (Level A)**: scrolling is functionality, and functionality must be keyboard-operable.

The escape hatches all fail on inspection:

* reka's `FocusScope` moves focus into `DialogContent` on open; the sole tabbable candidate in the subtree is glass-ui's close-X (`dialog-BKSTfmIQ.js`, the `showClose` branch — `class="focus-ring absolute right-(--overlay-pad-inline) top-(--overlay-pad-block) …"` with an `sr-only` "Close"). That button is a **sibling** of the scroll port, not a descendant.
* Browsers scroll the nearest scrollable **ancestor of the focused element**. The port is not an ancestor of the X; `DialogContent` itself has no overflow (its `scroll` prop defaults `false` and is not passed — see D-6); `body` is scroll-locked by reka. So arrows/PageDown/Home/End scroll nothing.
* `Space`, the last plain-browser fallback, is **globally intercepted with `preventDefault: true`** while the modal is open (`useControlsKeyboardShortcuts.ts:50` — see D-2).

Consequence: a keyboard-only, switch, or screen-reader user of a **keyboard shortcuts reference** reads shortcuts 1–15 and is permanently denied 16–19 — the Actions group, which is where the destructive bindings live (§2).

The remedy ships in the design system and is **already consumed once in this tree**: `<FadingScroll axis="y" aria-labelledby="…">` (`glass-ui/dist/fading-scroll-DKsoe_vh.js`) renders `tabindex="0"`, `role="region"` when named, RTL-normalised `scrollLeft` across all three browser conventions, and the edge feather — used at `demo/scenes/easing/EasingTarget.vue:137`. One import retires D-1, D-5 and D-15.

*Falsifier:* (a) a live focus trace showing a browser scrolling a **non-ancestor** scroller — no engine does this; (b) `[data-slot="dialog-content"]` acquiring `overflow:auto` from a stylesheet — `placement.css` sets overflow on **no** selector, and the `center` placement emits no `data-placement` attribute to hook; (c) the list not overflowing — refuted in §2.

---

### D-2 · **BLOCKER** · Every global shortcut stays live while the reference is open — including the destructive `Delete`
`KeyboardShortcutsModal.vue:2–3` (no guard) · `useControlsKeyboardShortcuts.ts:51,65,70–71` · `reka-ui/dist/DismissableLayer/DismissableLayer.js:72–77`

glass-ui's dispatcher binds `keydown`/`keyup` on **`window`** (`keyboard.js`: `useEventListener(window, "keydown", …)`) and suppresses a shortcut only when `e.target` is an input/textarea/select/contenteditable/Monaco node (the `f()` predicate). A modal dialog is none of those, and the registry exposes no "modal open" gate. The component installs no defence of its own.

reka's dismissal path is `onKeyStroke("Escape", …)` — non-capturing, on the same event path, and it calls **neither `stopPropagation()` nor `preventDefault()`**; it only *reads* `event.defaultPrevented` before emitting `dismiss`. Both handlers therefore fire, glass-ui's first (its window listeners were installed at `EditorShell` setup, before the layer mounted).

Live consequences while the shortcuts panel is open and focus sits on the close button:

| key | user expectation | what actually happens |
|---|---|---|
| `Escape` | dismiss the panel | `reset()` stops and rewinds the animation (`:51`) **and then** the panel dismisses |
| `Space` | scroll the list — the only remaining affordance after D-1 | play/pause toggles; `preventDefault:true` swallows the scroll (`:50`) |
| `Delete` | nothing | **the selected keyframe is destroyed** (`:65`) |
| `Mod+Z` / `Mod+Shift+Z` | nothing | undo/redo mutate the timeline (`:70–71`) |
| `[` `]` `1` `2` `3` `R` `Home` `End` | nothing | scene, tab and playhead all change behind the scrim |

A reference panel that mutates the document it is documenting — while the user is *reading the very row that describes the key they pressed* — is the sharpest defect on this file, and it is aggravated by the copy at `:7`, which explicitly invites a keypress.

*Falsifier:* a live keydown trace with the modal open showing exactly one handler firing; or evidence that reka's `hideOthers`/`inert` suppresses `window`-level listeners — it does not, it sets `aria-hidden` and `pointer-events`, never listener registration.

*Scope honesty:* the **fix** most likely belongs upstream (a registry-level `suspendShortcuts()`, or an `open`-gated guard in `EditorShell`), and is a glass-ui-relay candidate under the standing BH edict. The modal is the manifestation site and ships no mitigation, which is why it is charged here.

---

### D-3 · **MAJOR** · The typographic hierarchy is inverted, and the title is demoted off the system's φ ladder
`:5` (`text-body font-medium`) · `:12` (`text-admin-label`) · `:21` (`text-small`)

glass-ui's scale is deliberately φ-stepped (`typography/scale.css`): `--type-subheading: 1.272rem` (√φ), `--type-heading: 1.618rem` (φ), `--type-title: 2.058rem` (φ^1.5). `DialogTitle` ships `text-subheading` by default (`dialog-BKSTfmIQ.js`). This component overrides it **down** to `text-body`.

| element | class | resolved size | ratio vs row label |
|---|---|---|---|
| title `:5` | `text-body` | `clamp(1rem, 0.92rem + 0.27vw, 1.375rem)` | **1.14×** narrow, **1.10×** wide |
| description `:6` | `text-small` | `clamp(0.875rem, 0.8rem + 0.25vw, 1.25rem)` | 1.00× |
| row label `:21` | `text-small` | same | 1.00× |
| **group heading `:12`** | `text-admin-label` | **0.625rem, FIXED** | **0.71× narrow, 0.50× wide** |

Two separable failures:

1. **The title barely outranks its own list items** — 1.10–1.14×, against the system's designed 1.45× (`--type-subheading / --type-small` at the narrow end). The φ step the scale exists to establish is discarded by one class swap, with no rationale comment.
2. **The headings are smaller than the content they organise.** At 1440px the group label is 10px against 16.4px rows; on a 2560px display, 10px against ~19px — **half**. Because `--type-admin-label` is a *fixed* rem while `--type-small` is `vw`-clamped, **the inversion widens as the display grows**. A structural heading rendered in the smallest register the system owns is an inverted hierarchy in the plain Aristotelian sense: the part that orders the whole is subordinated to the parts it orders.

Tree corroboration — this file is the **outlier among its own siblings**. Three dialogs, three unrelated title rungs, and only this one goes *below* the shipped default:

| dialog | title rung | description rung |
|---|---|---|
| `KeyframesAddDialog.vue:24,26` | `text-heading` (1.618rem) | `text-subheading` |
| `CSSPasteDialog.vue:11,12` | `text-subheading` (the default, restated) | `text-body` |
| **this file `:5,6`** | **`text-body`** | **`text-small`** |

*Falsifier:* a design ruling that dialog titles ride `text-body`, or a comment at `:5` explaining the demotion. `DESIGN.md` governs *families* (§1) and *token homes* (§6) and names no title contract; grep finds no such rule. Also killed if `--type-admin-label` were viewport-scaled — `scale.css` shows it is not.

---

### D-4 · **MAJOR** · The group headings violate the demo's own written Mono-as-data law
`:12` · `demo/DESIGN.md:26–29` · `demo/styles/font-roles.json` (`monoAllowedSelectors`, `_monoContract`)

`DESIGN.md` §1: *"**Mono-as-data.** Fira Code is reserved for literals, tabular-number readouts, code/keyboard content, and explicitly marked identifiers (`data-register="code"`). It is never a general UI voice."* The manifest states the enforcement rule verbatim: *"**A new demo-authored mono UI label reds the census.**"*

`text-admin-label` sets `font-family: var(--font-mono)` (`typography/semantic.css`). The `<h3>` at `:12` is a **demo-authored UI label** in the mono voice and matches **none** of the 15 `monoAllowedSelectors` — not `code`, `kbd`, `pre`, `[class*='tabular-nums']`, `[data-register='code']`, `.code-token`, `[data-slot='select-trigger']`, `[data-testid='easing-picker']`, `.metric-badge`. Clause (d) — *"a glass-ui-**OWNED** data voice consumed **as-shipped**"* — does not cover it: its enumerated exceptions are the SelectTrigger value default, MetricBadge, and EasingPicker, all cases where the demo *consumes* a vendor-rendered leaf, not cases where the demo *applies* a vendor utility to its own markup.

Aggravating: **the named witness no longer exists.** `DESIGN.md:29` asserts "`proof:font-census` is its witness", but `package.json:50–51` ships only `proof:publish` and `proof:owner-golden`, and `scripts/gates/` contains only `surface/` and `visual/`. The law is documented and unenforced. A second blind spot compounds it: the census was a **desktop sweep of the 7 scenes**, and this modal is portalled and rendered only while open — its mono leaves were plausibly never measured even when the gate lived.

**Honesty / scope — this is not component-unique.** `text-admin-label` appears in 9 demo files; `MbabbMenu.vue:12,50,65` uses it for descriptive prose that is equally unsanctioned. What *is* unique here: of those nine sites, **this is the only one that uses the smallest, mono, uppercase register as a structural heading** — every other is a badge, a hint, or a numeric input. Remediation belongs to a tree sweep; the register *choice* belongs to this file.

*Falsifier:* `text-admin-label` being added to `monoAllowedSelectors`, an owner ruling widening clause (d) to "any glass-ui mono utility", or a `data-register="code"` marking at `:12` (absent).

---

### D-5 · **MAJOR** · A scroll port with no boundary affordance and a 4px fake gutter
`:10`

`overflow-y-auto pr-1` is the entire scroll treatment. Three separable misses:

1. **No overflow signal.** Nothing fades, shadows, or otherwise marks that 216px of content (§2) continues below. On macOS/iOS the overlay scrollbar is invisible until a gesture begins, so at rest the list simply stops mid-row with no cue. With D-1 there is then no *discoverable* path to the Actions group at all.
2. **`pr-1` is not a gutter.** 0.25rem = 4px against a classic always-visible scrollbar of 15–17px on Windows/Linux — roughly a quarter of what is needed, so text runs under the bar. And with `scrollbar-gutter` unset, overlay-scrollbar platforms **reflow the list horizontally** the instant the bar materialises.
3. **Both remedies ship, unused.** `glass-ui/dist/styles/utilities/base-misc.css` defines `.scroll-gutter-stable { scrollbar-gutter: stable; }` and `.fading-scroll--y` (mask-image feather + scroll-driven `[data-fade-start]/[data-fade-end]` keyframes). The demo additionally owns `--mask-fade: 2.5rem` (`design-idioms.css:49`) as its single-sourced feather magnitude, applies the same idiom at `ControlsPaneWrapper.css:53–72`, and already consumes `<FadingScroll>` at `EasingTarget.vue:137`.

This is a **glass-ui-first** conformance miss (`feedback_glass_ui_first_class`) of the same shape as lane-frontend's `S-3`/`S-4`/`S-7` "shipped-but-hand-rolled" rows, at prop/utility granularity rather than component granularity.

*Falsifier:* a live render showing a visible scrollbar or an edge fade on `:10`, or a `scrollbar-gutter` declaration reaching it from any sheet — `grep -rn "scrollbar-gutter" demo/` returns nothing.

---

### D-6 · **MAJOR** · No viewport clamp on the dialog: below ~313 CSS px of height, content is lost with no scroll owner
`:3` — `<DialogContent class="max-w-md">`, `scroll` not passed

`DialogContent`'s base class string is `fixed left-1/2 top-1/2 … -translate-x-1/2 -translate-y-1/2` with **no** max-height; the `max-h-[calc(100dvh-2rem)] overflow-y-auto` clamp is gated behind the `scroll` prop (`dialog-BKSTfmIQ.js`, the `Y` computed), which defaults `false`. `placement.css` adds nothing for `center` (which emits no `data-placement`). So:

```
H_dialog = 2·(1.5rem × 1.272)  [py, φ-derived]  = 61.1px
         + header                               ≈ 48px   (title 16 + gap-y-1.5 6 + description line ≥ 26 — the inline-flex .kbd min-height 24 dominating)
         + gap-4                                = 16px
         + min(864, 0.60 · H_viewport)
```

Overflow when `125.1 + 0.6·H > H` → **`H < 313 CSS px`**. Because the box is `-translate-y-1/2` centred and nothing above it scrolls (`body` scroll-locked), the excess is clipped symmetrically off **both** viewport edges and is **unrecoverable by any input**.

Scope stated precisely, because overclaiming here would be easy:

* **WCAG 1.4.4 Resize Text @200% PASSES** — an 800px window at 200% yields 400 CSS px > 313. I am **not** claiming a 1.4.4 failure.
* **Fails at ≥350% zoom on a 1080px display** (270 CSS px at 400%) and **at ≥300% on an 800px window** (267 CSS px) — i.e. it fails at the 400% setting SC 1.4.10 Reflow is conventionally audited at.
* Landscape phones sit **within ~7px** of the threshold (iPhone-5-class landscape ≈ 320 CSS px). Passing by 2% is not a design margin.

Note the correct fix is `scroll` **plus** the D-1/D-5 inner `FadingScroll` port — `scroll` alone would scroll the header away with the body.

*Falsifier:* any stylesheet giving `[data-slot="dialog-content"]` a max-height in the centred case (grepped: none), or a live 400%-zoom capture showing the dialog fully within the viewport.

---

### D-7 · **MAJOR** · Label↔keys pairing is not expressed semantically
`:16–31`

A shortcut list is a term/definition structure, built here from four nested `div`s: no `<dl>/<dt>/<dd>`, no `role="list"`/`listitem`, no `aria-labelledby` binding a `<kbd>` group to its label, and no association between an `<h3>` group heading and its rows (no `<section aria-labelledby>`, no `role="group"`).

AT consequence: the 19 pairs are announced as an undifferentiated run — "Play / Pause Space Stop animation Esc Reset animation R …" — with no boundary between a label and its keys, or between one shortcut and the next. Multi-key combos degrade further (D-8, D-11). For the one component whose entire purpose is to be *read*, the reading order carries none of its structure.

*Falsifier:* an AT transcript showing correct pairing from the flat DOM — no engine infers term/definition from `justify-between`; or a ruling that reference lists need no `<dl>` semantics. The file **does** get heading levels right (S-4); the semantic care stops exactly one level too high.

---

### D-8 · **MAJOR** · The keycaps are bare glyphs with no accessible text
`:25–29` (retained from the 2026-08-04 pass, re-derived)

`formatComboParts` (`keyboard.js`, the `p()` mapper) emits **pure symbols** on Mac: `⌘` `⇧` `⌥` `⌃` `␣` `⌫`, plus `←` `→` `↑` `↓` `↵` on all platforms. Each lands as the sole text node of a `<kbd>` with no `aria-label`, no `title`, and no `sr-only` twin.

Screen readers announce these inconsistently and often uselessly — `⌘` (U+2318) is literally "place of interest sign", `␣` (U+2423) "open box", `⌫` (U+232B) "erase to the left". So "Play / Pause · ␣" may be announced as "Play / Pause, open box", and "Copy CSS · ⌘S" as "Copy CSS, place of interest sign, S". The visible glyph is exactly right for sighted users; there is simply no text alternative behind it.

This is not glass-ui's fault by omission — the producer also exports `formatCombo`, whose join rule is platform-aware and whose output ("`⌘S`" / "`Ctrl+S`") is at least a single token. A one-line `:aria-label` per chip, or an `sr-only` spelled twin per row, closes it.

*Falsifier:* an AT transcript announcing the glyphs correctly on both VoiceOver and NVDA, or a `speak-as`/`aria-label` reaching `:25–29` from any sheet or directive (none present). Also softened — not killed — if the row label alone were judged sufficient: it is not, because the label names the *action*, never the *key*, which is the entire payload of this component.

---

### D-9 · **MAJOR** · A hover affordance that promises interactivity the rows do not have
`:19` — `hover:bg-muted/50 transition-colors rounded-md`

Every row lights a rounded plate on hover. The rows are not clickable (no `@click`), not focusable (no `tabindex`), not activatable (no `role`), carry no `cursor-pointer`, and expose no action anywhere in the component. The one gesture the affordance implies — "click to run this shortcut" — would in fact be a genuinely good feature here, which makes the highlight a *lie* rather than a shortfall. The `rounded-md` + `px-2` plate is the demo's interactive-row idiom, compounding the misread.

*Falsifier:* a click handler, `role`, or cursor rule reaching `:19` from any sheet (none in the file; nothing in `demo/styles/*.css` targets this subtree); or a stated convention that reference rows carry hover feedback as reading-position tracking — in which case the honest primitive is a row-striping or `:hover` rule with a rationale comment, not a button-shaped plate.

---

### D-10 · **MINOR** · The group heading hangs 8px left of the rows it labels
`:12` (no inline padding) vs `:19` (`px-2` = 0.5rem)

Within the same ~400px content column the `<h3>` text box starts at x = 0 while every row label starts at x = 8px — a ragged left edge repeated four times down the panel. No optical justification is available: the heading is uppercase mono with `--type-tracking-caps`, so it carries *more* left side-bearing than the Jakarta body rows, meaning the optical correction pushes the same direction as the mechanical one.

*Falsifier:* a hanging-label convention evidenced elsewhere in the tree or in `DESIGN.md` §5's idiom catalogue — grep finds no other heading/row pair with asymmetric inline padding, and the catalogue names no such recipe. Rated MINOR precisely because "outdented section label" is a defensible if undocumented house style; the certain defect is the *silence*, not certainly the geometry.

---

### D-11 · **MINOR** · Multi-key combos lose their separator off-Mac; `formatCombo`/`isMac` ship unused
`:24–29`

`formatComboParts("Mod+Shift+Z")` returns `["⌘","⇧","Z"]` on Mac and `["Ctrl","Shift","Z"]` elsewhere. The sibling export `formatCombo` exists precisely to encode the platform join rule — `m(e).join(o ? "" : "+")`, i.e. **`+` off-Mac, nothing on Mac** — and `isMac` is exported for exactly this branch. The component takes the parts and joins them with `flex gap-0.5` (2px) and nothing else, so the universal `Ctrl+Shift+Z` convention silently degrades to three floating caps on Windows/Linux. With D-8 the AT rendering is three unrelated words.

Separately, `gap-0.5` = 0.125rem is the only sub-step gap in the file and sits off the system's 0.25rem rhythm.

*Falsifier:* a design ruling that keycap chips replace the `+` glyph on all platforms — glass-ui's own `formatCombo` argues the opposite; or evidence that `gap-0.5` is a sanctioned rung (it is a lone occurrence in the `shell/` cluster).

---

### D-12 · **MINOR** · `--panel-max-h` is a mobile-panel token conscripted to cap a centred modal
`:10` · `demo/styles/design-idioms.css:46,48`

The token's own definition comment reads *"`--panel-max-h` caps **mobile panels**"*, value `60dvh`. Its only other consumer is `AnimationControlsGroup.vue:85`, inside the mobile drawer branch. This modal is a centred desktop-and-mobile dialog on an unrelated geometry axis.

Two costs: (1) retuning the mobile pane silently resizes this modal and moves the D-6 overflow threshold; (2) `DESIGN.md` §6 partitions token homes **by concern**, and this reuse couples two concerns through one length. This is the flat-namespace hazard lane-frontend §6.3 flagged (98 unprefixed demo tokens, `--kf-*` count = 0) — showing up as a **semantic** collision rather than a name collision.

*Falsifier:* a comment or ruling generalising `--panel-max-h` to "any bounded content column"; the definition comment says the opposite. MINOR because the *value* (60dvh) is defensible — the *binding* is not.

---

### D-13 · **MINOR** · The description prose is wrong-nouned, self-duplicating, and incomplete
`:7` — "Press `?` to toggle this panel"

Not trite, not cliché — the copy is admirably plain and I decline to invent a prose defect where none exists. Three concrete faults remain:

* **"panel."** This is a modal `Dialog` with a scrim, a focus trap and Escape dismissal. The tree reserves "panel" for the docked controls surface (`--panel-max-h`, `ControlsPaneWrapper`, the mobile pane). Calling a modal a panel muddies a term used precisely everywhere else.
* **Self-duplicating.** The `General` group renders a row reading exactly `Show shortcuts` / `?` (`EditorShell.vue:190`) roughly 20px below this sentence. The description restates the first list item in different words.
* **Incomplete in both directions.** It omits the other way *in* — the header `<Button aria-label="Show keyboard shortcuts">` at `EditorShell.vue:31–42`, added expressly to break "the discoverability paradox" per the comment at `:24–30` — and every way *out* (Esc, the close X, click-outside).

*Falsifier:* a copy ruling adopting "panel" as the general overlay noun, or removal of the `?` registration's label so the row stops duplicating.

---

### D-14 · **MINOR** · Viewport-clamped type inside a fixed-width box
`:3` (`max-w-md`) vs `:5,6,21`

`max-w-md` is a **constant** 28rem; `--type-small` and `--type-body` are `vw`-clamped. The measure therefore does not scale with the type it holds: at 320px viewport the label is 14px in a ~272px column; at 2560px it is ~19.2px in a 400px column — a ~40% drift in the type-to-measure ratio, in the wrong direction for a dialog, which (unlike a page) has no reason to respond to viewport width at all.

The system offers the right tool: the `@container` idiom already governs `.text-pane-title` (`typography/utilities.css`). A fixed-width modal wants container-relative or fixed type.

*Falsifier:* a measured line-count constant across the range (contradicted by the clamp arithmetic), or a ruling that all `--type-*` rungs are viewport-clamped by design regardless of container — true of the *scale*, but that is precisely the argument for not using clamped rungs inside a fixed box.

---

### D-15 · **INFO** · RTL: `pr-1` is physical — recorded, **not charged** to this component
`:10`

`pr-1` should be `pe-1` so the gutter follows writing direction; in RTL the scrollbar moves to the inline-start and the reserved space lands on the wrong side. **However:** `grep -rn "dir=\|rtl" demo/` returns zero hits tree-wide, and nine other demo sites use physical `pl-*`/`pr-*` (`ChannelControls.vue:17,39`, `RibbonBar.vue:2`, `TransportDock.vue:76`, `ChannelOptions.vue:244,262`). This file is **consistent with the tree**, so it is not a component-specific regression. Logged for the RTL sweep — a tree-level decision. (Note `<FadingScroll>` already normalises RTL `scrollLeft` across all three browser conventions: another argument for D-1's remedy.)

*Falsifier:* the demo declaring an RTL locale — it does not — which would immediately promote this to MINOR.

---

### D-16 · **INFO** · No empty branch (unreachable in the shipped host)
`:11`

An empty `groupedShortcuts` renders a header floating over a zero-height body with no message. This **cannot occur in the shipped app**: `EditorShell.vue:190` registers `?` unconditionally at setup and never unregisters, so `General` always holds ≥1 row. The gap is reachable only by mounting the modal outside `EditorShell` — possible, since it is exported from `shell/index.ts`. Recorded, not charged.

*Falsifier:* a host that mounts the modal without registering a shortcut — none exists today.

---

### D-17 · **INFO** · The one instruction the panel gives is unavailable to the audience most likely to need it
`:7`

"Press `?`" is unactionable on touch. The host correctly compensates with a visible header button (`EditorShell.vue:31–42`, explicitly rationalised as breaking "the discoverability paradox"), so the *entry* path is covered — but the panel's own copy, read on a phone, instructs an impossible gesture and names no alternative. Cheap fix: name the header control, or branch the copy on coarse pointer.

*Falsifier:* a media-query branch or alternate copy path in the file — none.

---

### D-18 · **INFO / producer-side** · `.kbd` loses its keycap modelling under forced-colors
`:7,25–29` → `glass-ui/dist/styles/utilities/base-misc.css` (retained from the 2026-08-04 pass)

Under `@media (forced-colors: active)` the UA drops `box-shadow` and overrides `background`/`border-color`, so `.kbd`'s `--muted` plate and its `0 1px 0 1px` keycap lip both vanish; the caps survive only via the forced border. glass-ui's own `a11y-overrides.css` forced-colors block covers focus rings, `.hairline-accent` and `.glass-dock` — but not `.kbd`. The caps remain **distinguishable** (the border is forced visible), so this is INFO, not a defect of legibility.

*Falsifier:* a forced-colors capture showing the chips indistinguishable from surrounding text (the border argues otherwise). **Producer-side** — belongs in the active glass-ui BH inbox under the standing relay edict, not in a keyframes.js wave.

---

## 4. Superlatives (L-18, both ways)

### S-1 · The keycap treatment is exactly right, on **two** independent laws
`:7,25–29` use `class="kbd"` — glass-ui's shipped utility (`base-misc.css`: `min-height/min-width: 1.5rem`, `--font-mono`, `--type-micro`, `--muted` plate, `--border` rim, a 1px keycap lip that degrades cleanly behind `@supports (color: color-mix(...))`). No bespoke keycap CSS, no local token, no fork — the exact inverse of lane-frontend `S-1` (`KfPillTabs`, 217 forked lines over a rationale three majors stale). **And** `kbd` is an explicitly enumerated member of `monoAllowedSelectors` in `font-roles.json`, so the mono voice here is *sanctioned data*, not a stray. Passing both the glass-ui-first law and the Mono-as-data law with one class is a genuinely good call — and it throws D-4 into relief: the author knew the mono contract for the chips and missed it for the headings.

*Falsifier:* a local `.kbd` redefinition shadowing the utility — `grep -rn "kbd" demo/ --include="*.css"` returns nothing; the only four `kbd` hits in the entire demo are the four in this file.

### S-2 · PRM is delegated honestly, and the delegation is correct
The file contains zero motion code and zero `@media (prefers-reduced-motion)` blocks — and that is the **right** answer, not an omission. `a11y-overrides.css` clamps `transition-duration`/`animation-duration` globally under reduce; `DialogContent`'s motion axis independently forces `full → reduced` and degrades `stage: scale|immersive → dim` (`dialog-BKSTfmIQ.js`, the `D` computed). The single `transition-colors` at `:19` is a colour fade — non-vestibular — and is clamped regardless. Against the 13 demo sites that hand-roll a local PRM block (lane-frontend §6.5), this component correctly declines to add a fourteenth.

*Falsifier:* a motion property escaping the global clamp (e.g. `@keyframes` under `[data-allow-motion]`) — none present.

### S-3 · Zero bespoke surface; the flat-namespace hazard is not fed
No `<style>` block, no scoped CSS, no locally-minted custom property, no `--kf-*` (of which the tree has zero — lane-frontend §6.3), no raw `z-[N]`, no hex literal, no `px` literal, no direct `reka-ui` import. Every visual decision routes through a glass-ui utility or a demo token that already has a documented home. For a 69-line component with this much surface, that is disciplined — and it means **every finding above is a composition defect, fixable without writing a line of CSS.**

*Falsifier:* an arbitrary-value class hiding a raw literal. The only bracket class is `max-h-[var(--panel-max-h)]`, which routes to a token — its *binding* is D-12, its *form* is correct.

### S-4 · Heading semantics and state ownership are both correct
reka's `DialogTitle` renders `<h2>`; the group headings at `:12` are `<h3>` — correct nesting, no skipped level, no `<div role="heading">`. `defineModel<boolean>('open', { required: true })` (`:53`) makes open-state a single owned source with **no local shadow ref** — precisely the `defineModel`/`shallowRef` trap the project memory records, avoided here. And glass-ui's `cn` correctly types the custom `--type-*` scale as a font-size conflict group, so every override at `:5,6` resolves deterministically rather than by cascade luck (see K-2/K-3).

*Falsifier:* an `<h1>`/`<h4>` elsewhere in the dialog subtree, or a local `ref` shadowing `open` — neither exists.

### S-5 · The grouping is derived, not enumerated
`:57–67` folds `options.group ?? "General"` over the live registry, so a `registerShortcut(...)` added **anywhere** in the app self-publishes into this panel with no edit here — the registry is the single source of truth and this file is a pure projection of it. The `?? "General"` default degrades an un-grouped registration to a sane bucket rather than an empty heading. Proximity spacing is also right: heading→items `mb-2` (8px) is strictly tighter than group→group `gap-4` (16px), so the Gestalt grouping reads even where the *size* hierarchy does not (D-3).

*Falsifier:* a hardcoded group order or label list — none; the only ordering is `Map` insertion order following registration order.

---

## 5. Contradiction of the hitherto corpus

**X-1 · lane-frontend row 69** files this component under category **G** — "*shortcuts modal — `Dialog*` + `useRegisteredShortcuts`/`formatComboParts`*" — with **no** shadow-census id (`S-n`). On the **library-consumption** axis that classification is correct and I affirm it (S-1, S-3).

But the census asked *which primitives are imported*, never *whether the imported primitives were used to their contract*. On that reading this file carries **four shipped-but-unused affordances**: `DialogContent`'s `scroll` prop (D-6), the whole `FadingScroll` component (D-1, D-5, D-15), `.scroll-gutter-stable` (D-5), and `formatCombo`/`isMac` (D-11). That is the same defect *shape* as `S-3`/`S-4`/`S-7` ("glass-ui ships it, the demo hand-rolls it") at prop/utility granularity rather than component granularity.

**Recommendation: the shadow census wants a second axis** — not only "is a bespoke component shadowing a shipped one" but "**is a shipped component being consumed below its contract**". By that axis this file earns an entry it does not currently have, and it is likely not alone.

**X-2 · lane-frontend §6.3** reports the `--kf-*` namespace absent and the flat token namespace as "a collision surface worth a lane of its own". **D-12 is the first worked example of the cost** — and notably it is *not* a name collision (`--panel-max-h` is unique) but a **semantic** one: a token whose documented scope ("mobile panels") is silently exceeded, coupling two geometries through one length. The lane §6.3 asks for should scope tokens by *concern*, not merely prefix them.

---

## 6. Standing-law notes

* **F-1 inherited, not re-litigated.** Every glass-ui fact above is sourced from the **installed** `node_modules/@mkbabb/glass-ui/dist/` @ 7.0.0. lane-frontend `F-1` establishes that this copy is absent from both `package.json` and `package-lock.json`, so **none of the primitive behaviour asserted here is reproducible from a clean `npm ci`.** Every remedy inherits F-1 as a hard prerequisite.
* **Glass-ui relay.** D-18 (`.kbd` forced-colors), D-8 (a `formatComboParts` consumer contract for text alternatives) and the D-2 fix (a registry-level modal gate) are **producer-side** and belong in the active glass-ui BH inbox under the standing relay edict — not in a keyframes.js wave.
* **Stale-artifact discipline.** `dist/gh-pages/assets/index-CL_QYCiO.css` is dated 2026-07-16 against HEAD 07-28. It was used **only** to settle utility emission order (K-2/K-3) — a Tailwind-version property, not a tree property — and never as evidence for any behavioural or geometric claim.
* **Write scope honoured.** This file is the **only** write. No file in `keyframes.js`, in glass-ui, or in any other repo was created, mutated or executed; no installs, no dev servers, no browser tooling.

---

## 7. Ledger

| id | sev | one line | file:line |
|---|---|---|---|
| D-1 | **BLOCKER** | overflowing list is a keyboard-unreachable scroll port (WCAG 2.1.1 / `scrollable-region-focusable`) | `:10` |
| D-2 | **BLOCKER** | global shortcuts stay live while the modal is open — incl. destructive `Delete` | `:2–3`; `useControlsKeyboardShortcuts.ts:51,65,70–71` |
| D-3 | MAJOR | hierarchy inverted (headings 0.50–0.71× rows, widening with viewport); title demoted off the φ ladder; outlier vs 2 siblings | `:5,12,21` |
| D-4 | MAJOR | mono UI heading violates the demo's own Mono-as-data contract; the named witness gate no longer exists | `:12`; `font-roles.json` |
| D-5 | MAJOR | no scroll-boundary affordance; `pr-1` is a 4px fake gutter; `.fading-scroll--y`/`.scroll-gutter-stable` shipped-unused | `:10` |
| D-6 | MAJOR | `scroll` prop unused → dialog exceeds viewport below ~313 CSS px, no scroll owner (fails @400% zoom; passes 1.4.4 @200%) | `:3` |
| D-7 | MAJOR | label↔keys pairing has no semantics (`<dl>`/roles/aria all absent) | `:16–31` |
| D-8 | MAJOR | keycaps are bare glyphs (`⌘ ⇧ ␣ ⌫`) with no text alternative | `:25–29` |
| D-9 | MAJOR | hover plate promises interactivity the rows do not have | `:19` |
| D-10 | MINOR | group heading hangs 8px left of its rows | `:12` vs `:19` |
| D-11 | MINOR | no `+` separator off-Mac; `formatCombo`/`isMac` unused; `gap-0.5` off-rhythm | `:24–29` |
| D-12 | MINOR | `--panel-max-h` (a mobile-panel token) caps a centred modal | `:10` |
| D-13 | MINOR | "panel" for a dialog; duplicates the row 20px below; omits the other in/out paths | `:7` |
| D-14 | MINOR | viewport-clamped type inside a fixed-width box (~40% measure drift) | `:3` vs `:5,6,21` |
| D-15 | INFO | `pr-1` physical (RTL) — tree-wide precedent, not charged | `:10` |
| D-16 | INFO | no empty branch; unreachable in the shipped host | `:11` |
| D-17 | INFO | "Press ?" unactionable on touch; header button covers entry, copy does not | `:7` |
| D-18 | INFO | `.kbd` keycap modelling lost under forced-colors — producer-side relay | `:25–29` |
| S-1 | ✦ | `.kbd` is the shipped utility **and** a sanctioned mono selector — both laws passed | `:7,25–29` |
| S-2 | ✦ | PRM delegated honestly to the system's global clamp + motion axis; no redundant local block | file-wide |
| S-3 | ✦ | zero bespoke CSS/tokens/literals; feeds nothing to the flat-namespace hazard | file-wide |
| S-4 | ✦ | correct h2→h3 nesting; `defineModel` with no shadow ref; deterministic `cn` overrides | `:12,53` |
| S-5 | ✦ | grouping derived from the live registry; `?? "General"` degrades safely; proximity spacing correct | `:57–67` |

**Cheapest high-value repair (informational — no source was touched):** replace `:10` with `<FadingScroll axis="y" aria-labelledby="…">` and pass `scroll` on `:3`. That single composition change retires D-1, D-5, D-6 and D-15 using only primitives already installed and already consumed elsewhere in this tree. D-2 and D-8 need producer-side motion. The remaining MAJORs (D-3, D-4, D-7, D-9) are class swaps and one element rename.

The shape of the file is worth naming plainly: **this component fails almost entirely by under-delegating one notch further into a design system it otherwise consumes cleanly.** It forked nothing (S-3), it minted nothing (S-3), it honoured the mono law where it is hardest to notice (S-1) and the motion law by correctly doing nothing (S-2). Its two blockers are both *absences* — an attribute and a guard — and both land squarely on the one population the component exists to serve.

---

*Written read-only. Every livable-only claim is marked UNPROVEN-NEEDS-LIVE; every other claim, superlatives included, carries its falsifier.*
