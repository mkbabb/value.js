# A.W3 — Design-token conventions (binding for all W3 lanes)

Shared rules for the W3 type-scale / radius / shadow / hierarchy sweep. Every W3
agent reads this plus its slice of `research/Ac-design-tokens-hierarchy.md`.

## 1 — φ type-scale mapping (Ac-1)

glass-ui ships a golden-ratio type scale as `@utility text-*`. Map raw Tailwind
size keywords to the φ utility **by the element's semantic role**, not blindly:

| Raw Tailwind | φ utility | Role |
|---|---|---|
| `text-xs` | `text-caption` | small captions, labels |
| `text-xs` (tiny descriptor) | `text-micro` | sub-caption descriptor text |
| `text-sm` | `text-small` | secondary body text |
| `text-base` | `text-body` | body text |
| `text-lg` | `text-prose` | large body / lead text |
| `text-lg` (heading) | `text-subheading` | a light heading register |
| `text-xl` | `text-subheading` | subheadings |
| `text-2xl` | `text-heading` | section headings |
| `text-3xl` | `text-title` | page/card titles |
| `text-4xl`/`text-5xl` | `text-display` / `text-display-2` | display type |

Caveats — do NOT blind-replace:
- The φ body utilities (`text-small`/`text-body`/`text-prose`) carry
  `font-family: var(--font-serif)` and φ-tuned leading. If a raw size sits on
  text that must stay monospace, use `text-mono-small` / `text-mono-caption`
  instead. If it must stay sans, leave the raw size and record it as a
  documented exception in the lane proof doc.
- The W3 gate is "heading/body/caption roles resolve to φ utilities; raw sizes
  reduced to documented exceptions" — not zero raw sizes. Exceptions are fine
  when recorded with a one-line reason.
- `text-2xs` and `font-mono-code` were already resolved in W1 — they should not
  appear; if you find a residual, replace per W1 (`text-micro` / `fira-code`).

## 2 — Border-radius semantic aliases (Ac-8)

Standardize role-bearing radii on the semantic aliases. Tailwind v4 generates a
`rounded-{alias}` utility from each `--radius-{alias}` token, so prefer the
plain utility; the `rounded-[var(--radius-…)]` arbitrary form is acceptable but
verbose.

| Surface role | Use |
|---|---|
| card surface | `rounded-card` (= `--radius-card`) |
| modal / dialog | `rounded-dialog` |
| panel | `rounded-panel` |
| text input | `rounded-input` |
| button | `rounded-button` |
| pill / badge | `rounded-badge` or `rounded-full` |

`rounded-2xl` on a card → `rounded-card`. `rounded-2xl` on an input →
`rounded-input`. Raw `rounded-sm`/`rounded-xl`/`rounded-md` on a role-bearing
surface → the matching alias. Leave radii inside scoped CSS that already use
`--radius-*` tokens. Leave `rounded-full` on genuine pills.

## 3 — Shadow routing (Ac-7)

The orchestrator has already consolidated the shadow tokens in `style.css`:
`--shadow-card` / `--shadow-card-hover` now route through `--shadow-cartoon*`
(the demo's pop-art identity shadow); one cartoon language. For W3 SFC work:

- Hand-rolled `box-shadow` literals in scoped CSS that reimplement a glass-ui
  rung → route through the token: a 25/50/-12 dialog drop → `var(--shadow-2xl)`
  or `var(--shadow-modal)`; a generic soft drop → `var(--shadow-md)` /
  `var(--shadow-sm)`.
- Raw `rgba(0,0,0,…)` shadow literals → a `--shadow-color`-based `color-mix`,
  so the shadow responds to dark mode.
- A genuinely unique inset/directional shadow with no glass-ui token is a
  legitimate one-off — keep it, but make it read `--shadow-color`.
- Some shadow fixes already landed in W2 (SpectrumCanvas Ab-19, PaletteDialog
  Ab-2) — skip those, do not re-touch.

## 4 — Ac-12 normalization decisions (binding)

- **Tabs**: normalize the two palette-dialog tab strips to ONE treatment — the
  filled `TabsList` pill (glass-ui default). Drop `underline-tabs` from
  `AdminNamesPanel`'s `Tabs`. (The `.underline-tabs` class itself stays in
  `style.css` only if a non-admin consumer remains; the admin lane reports
  whether any consumer is left.)
- **Dropdown items**: every `DropdownMenuItem` uses `text-small gap-2
  cursor-pointer` — consistent gap, consistent cursor.
- **Descriptor sub-text**: the dropdown-option descriptor is
  `text-micro text-muted-foreground` — one utility, one opacity (drop the
  `/50`, `/60` opacity variants).
- **Count indicator**: a count beside a heading uses
  `Badge variant="secondary"` with `text-mono-small` — the bare `<span>` count
  forms adopt the Badge.

## 5 — `.slug-pill` (Ac-11)

`style.css` now defines `.slug-pill` (`@apply text-mono-small font-bold px-2
py-0.5 rounded-full border`). The slug-pill consumers (dock menus, admin users
panel, slug bar) replace their copy-pasted utility cluster with the
`slug-pill` class, keeping their per-instance `:style` `color`/`border-color`.

## 6 — Hierarchy (Ac-9, Ac-10)

- `ColorNutritionLabel.vue` — rebuild the flat `text-2xl font-normal` /
  `text-sm` ladder into a real cascade: section headings → `text-subheading`
  (drop the `font-normal` weight override), component-name emphasis →
  `text-body`, body → `text-small`.
- `font-normal` (Ac-10) — where it cancels a heading's intended weight, drop it
  and use the φ heading utility's own weight. Where the thin-large poster look
  is deliberate (e.g. `ColorComponentDisplay`'s big numeral), use a
  `text-display-*` utility (φ-scaled, thin by design) instead of `text-4xl
  font-normal`.

## 7 — Verification

Each lane: `vue-tsc` error count must not exceed 246. No state-mutating git.
Do not run `npm run build`. The orchestrator runs the Playwright re-probe
(light + dark) at wave close.

## 8 — Standing radius exceptions (B.W1-C)

`rounded-2xl` is a surface-radius token; the radius sweep targets surface
elements. `Markdown.vue` retains `rounded-2xl` on its `pre code` block and on
`img` — these are **content elements** (rendered Markdown body), not UI
surfaces, so the surface-radius rule does not apply. Both sites carry an inline
exception comment. These two are documented standing exceptions; do not flag in
future radius audits. See `docs/tranches/B/audit/B.W1-floating-panel-item.md`.
