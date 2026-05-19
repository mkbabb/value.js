# B.W1 Lane C — phantom-class + phantom-token strip

Retired-class/token registry for value.js (this project has no
`.retired-classes.txt`; this doc IS the registry). Operates under precept
invariants 32 (phantom-class) and 33 (dead-code corpus grep).

## Retirement 1 — `.floating-panel-item` (phantom class)

### Pre-strip grep proof (invariant 33)

`grep -rn 'floating-panel-item' demo/ src/ /Users/mkbabb/Programming/glass-ui/src/`:

```
demo/@/components/custom/palette-browser/CurrentPaletteEditor.vue:44  (HTML comment)
demo/@/components/custom/palette-browser/CurrentPaletteEditor.vue:47  <button class="floating-panel-item ...">
demo/@/components/custom/palette-browser/CurrentPaletteEditor.vue:50  <button class="floating-panel-item ...">
demo/@/components/custom/palette-browser/CurrentPaletteEditor.vue:53  <button class="floating-panel-item ...">
demo/@/components/custom/palette-browser/PaletteCard.vue:181          (HTML comment)
demo/@/components/custom/palette-browser/PaletteCard.vue:184          <button class="floating-panel-item ...">
demo/@/components/custom/palette-browser/PaletteCard.vue:187          <button class="floating-panel-item ...">
demo/@/components/custom/palette-browser/PaletteCard.vue:190          <button class="floating-panel-item ...">
glass-ui/src/styles/index.css:41   ` *   8. floating-panel.css — .floating-panel + .floating-panel-item.`
```

**Verdict — phantom class.** No `.floating-panel-item {` CSS rule exists in
`demo/`, `src/`, or `glass-ui/src/`. The single glass-ui hit
(`index.css:41`) is a stale prose line inside a file-index block comment, not a
selector. `glass-ui/src/styles/floating-panel.css` defines `.floating-panel`
only — never `.floating-panel-item`. The six buttons already carry the full
Tailwind four-state contract (`hover:bg-accent` / `active:scale-95` +
`active:bg-accent/70` / `focus-visible:ring-2`); the class contributed nothing.

### Stripped sites (6 consumer callsites)

Spec estimated "~7"; the corpus has exactly 6 live `class=` callsites (3 + 3).
The `floating-panel-item` token was removed from each `class=` attribute; all
other utilities on each element were left intact. The two HTML comments that
existed solely to explain the phantom class (referencing
`floating-panel.css` + HARDEN-4 §2/§5.3) were also retired as they are now
stale; the adjacent `W5-a11y` comments were preserved.

| # | File | Line (pre-strip) | Element |
|---|------|------------------|---------|
| 1 | `demo/@/components/custom/palette-browser/CurrentPaletteEditor.vue` | 47 | Edit-color `<button>` |
| 2 | `demo/@/components/custom/palette-browser/CurrentPaletteEditor.vue` | 50 | Copy-color `<button>` |
| 3 | `demo/@/components/custom/palette-browser/CurrentPaletteEditor.vue` | 53 | Remove-color `<button>` |
| 4 | `demo/@/components/custom/palette-browser/PaletteCard.vue` | 184 | Add-color `<button>` |
| 5 | `demo/@/components/custom/palette-browser/PaletteCard.vue` | 187 | Edit-color `<button>` |
| 6 | `demo/@/components/custom/palette-browser/PaletteCard.vue` | 190 | Copy-color `<button>` |

### Post-strip grep proof

`grep -rn 'floating-panel-item' demo/` → no output, exit code 1 (zero matches).

## Retirement 2 — `--animation-slide-md` (phantom token)

### Pre-strip grep proof (invariant 33)

`grep -rn 'animation-slide' demo/ src/ /Users/mkbabb/Programming/glass-ui/src/`:

```
demo/@/components/custom/palette-browser/PaletteCard.vue:413  transform: translateY(calc(-1 * var(--animation-slide-md)));
demo/@/components/custom/palette-browser/PaletteCard.vue:422  transform: translateY(calc(-1 * var(--animation-slide-md)));
```

Two references, zero definitions. No `--animation-slide-md`, `-sm`, or `-lg`
custom property is declared in any `.css` file across `demo/`, `src/`, or
`glass-ui/src/` (`grep -rn 'animation-slide' --include='*.css'` → empty). The
MEMORY note claiming these tokens live in `style.css :root` is stale.

### Disposition — replace with literal (declaration is load-bearing)

The two references sit in `.rename-slide-enter-from` / `.rename-slide-leave-to`
(`PaletteCard.vue:411`, `:420`), the keyframe-less Vue `<Transition
name="rename-slide">` for the palette-rename input. The transition is **visibly
load-bearing**: `.rename-slide-*-active` animate `opacity`, `transform`, and
`max-height` together. With `--animation-slide-md` undefined,
`calc(-1 * var(--animation-slide-md))` resolves to an invalid value, so the
browser drops the entire `transform` declaration — the slide currently
collapses with opacity + height only, no vertical motion.

Smallest correct change: keep both declarations, replace
`var(--animation-slide-md)` with the intended literal **`0.5rem`**, applied as
`translateY(-0.5rem)` (the `calc(-1 * …)` wrapper is no longer needed). `0.5rem`
is a conventional "md" small-slide offset and is proportionate to the sibling
`max-height: 3rem` collapse in the same transition group. Stripping the
declaration was rejected — the transition is real UI, not inert.

Both sites carry an inline `B.W1-C` comment recording the phantom origin.

## Retirement 3 — none: `Markdown.vue` `rounded-2xl` (documented exception)

`demo/@/components/custom/markdown/Markdown.vue` applies `rounded-2xl` at two
sites within its scoped `.markdown-body` rules:

- `pre { @apply bg-muted rounded-2xl … }` — code block (line ~176)
- `img { @apply max-w-full h-auto rounded-2xl … }` — image (line ~209)

These are **content elements** (rendered Markdown body), not UI surfaces, so the
W3 surface-radius sweep does not apply. **No change made.** Each site now carries
an inline exception comment, and `docs/tranches/A/audit/W3-conventions.md` §8
records both as standing radius exceptions.

## Validation

`npx vue-tsc --noEmit 2>&1 | grep -c 'error TS'` — see Lane C return summary;
gate is ≤ 243 (unchanged by this lane — strips are template/CSS-only).

## Sub-gate C

> floating-panel-item stripped from all 7 sites (grep proof of zero);
> --animation-slide-md phantom reference resolved (grep proof); both retirements
> recorded in the audit doc; Markdown residuals documented inline; vue-tsc
> unchanged.

Note: the live consumer count is 6 `class=` callsites, not 7 — the spec's "~7"
was an estimate. All 6 stripped; post-strip grep returns zero.
