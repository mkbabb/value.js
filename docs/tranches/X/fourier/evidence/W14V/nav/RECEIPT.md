# F.W14V `.nav` + `.dm` — receipt

The authority is F-W14V.md addendum (e), COHESION §0dw (`.nav`), and addendum (f), COHESION §0dx (`.dm`). The seat ran on claude-opus-5-5. The fourier commit is **`79ea9f6`**.

## What changed
- **`.nav`**: in `web/src/components/layout/AppDock.vue`, the `inlineNav` `(min-width: 1024px)` query and the `<nav v-if="inlineNav">` `DockControl shape="tab"` branch were deleted, along with the doc comment's F-151 bullet. The one `DockTrigger for="dropdown"` `nav-trigger` menu, used as glass publishes it, now renders at every width. F-231 and X-5 still hold: the menu is non-modal, the current section is in the accessible name, the trigger shows the glyph plus chevron below 24rem, and a route outside the five claims no section.
- **`.dm`**: in `web/src/components/layout/DarkModeToggle.vue`, glass's `.dock-icon-button > svg` was sizing the morph glyph to `--dock-icon-glyph` (20 px), while the section and account glyphs are 24 px. The control now sets glass's own hook to glass's `--icon-xl` (1.5rem). The morph glyph and its identity colour are unchanged.

## Falsifiers (`web/e2e/f-w14v-nav.spec.ts`)
| falsifier | before bytes | after |
|---|---|---|
| nav, 1440: exactly 1 `.nav-trigger`, 0 `nav[aria-label=Sections]`, 0 inline section links | RED ×2 (0 triggers) | GREEN ×2 |
| dm, 1440 and 390: morph glyph bbox = section glyph bbox = account glyph bbox | RED ×2 (20×20 vs 24×24) | GREEN ×2 |

## Owner-ruling re-baselines (§0bt; none deleted)
- `f-w14u-shell.spec.ts` s151 now runs at 1440, 1024, 768 and 390, and each old assertion has a new counterpart:
  - The `nav Sections` row was asserted visible; now it is asserted to have count 0.
  - Five links were asserted visible; now the menu's five menuitems are.
  - `aria-current` was checked on the Gallery link; now it is checked on the Gallery menuitem.
  - The Navigate trigger was asserted to have count 0; now it must have exactly 1.
  - A link click moved `aria-current` to Equation. Now the case is a keyboard round trip: Enter opens the menu, Escape closes it and focus returns to the trigger, Enter on the Equation item navigates, and the Equation menuitem carries `aria-current`.
- `shell-header.spec.ts`: "names the current section and lists every route" and "actually navigates, and re-names itself" ran at 390 only. Both now run at 1440, 1024, 768 and 390, with their assertions unchanged.

## Gates
- `vue-tsc`: 0 errors.
- vitest: 20 files, 116 passed.
- The touched e2e specs (f-w14v-nav, shell-header, f-w14u-shell): 39/39 ×2 at :3100. One run in between, made while the machine's load average was about 100, lost 9 cases to `page.goto` `ERR_ABORTED` timeouts. At `--workers=3` the specs were green ×2.

## Served at :3100 (dock band and open menu)
Measured in every cell: 1 trigger, 0 Sections rows, and morph = section = account = 24×24.
- `after-dock-{light,dark}-{1440,390}.png`
- `after-menu-{light,dark}-{1440,390}.png`

## Open
- The menu's current row carries `aria-current` but has no visible paint in the frames. That paint is glass's half (O-59, UIA-F-128), unchanged by this unit.
- The dock's glyph token `--dock-icon-glyph` (20 px) is not what glass's trigger and tab faces render at: the lucide glyphs keep their intrinsic 24 px. `.dm` matches the siblings' measured box, which is glass's `--icon-xl` rung. Whether the glyph token and those faces should converge is glass's question, and no relay has been written.
- `f-w14v-au0.spec.ts`'s `openIf(".nav-trigger", "inline Sections nav at this width")` skip-text is now unreachable. It is a census walk, not an assertion, and belongs to another seat, so it was left alone.
