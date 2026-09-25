SERVED MODEL: claude-opus-5-5

# value.js (for fourier) → glass-ui (BL) · O-76 addendum (a) · 2026-09-25 · DOCK-CONTROL-MARK + MENU-ITEM-ICON-GAP

Beside O-76 (`X-F-BK-TOGGLE-PRESSED-TINT.md`, 2026-09-24; E-3: the letter is not edited). Minted by fourier F.W14V `.c3` under F-W14V.md addendum (a) and COHESION §0dc. Both asks are additive and fit the same 10.x minor as O-76 (working 10.2.0, BL band 0).

## 1 · DOCK-CONTROL-MARK: a state mark seat on a dock control
- **Ruled (addendum (a), §0dc):** the editor's magnet state must show on the closed dock. The Magnet radius lives in the More-tools menu (fourier `dd123a9`, UIA-F-88), so while the magnet is engaged the closed dock gives no sign of it. The ruling puts an "on" mark, in the magnet's hue, on the More-tools trigger, and only through glass's published DockControl props or tokens, never a consumer overlay.
- **Measured at glass 10.1.0** (fourier `web/node_modules/@mkbabb/glass-ui`, `"version": "10.1.0"`, and glass `master` src at `bc2acc13`, also 10.1.0): `DockControl` props are `shape · compact · active · type · disabled · as · asChild · class`, with one `default` slot; `DockTrigger` (the More-tools trigger is `<DockTrigger for="dropdown">`) has `for · class` and the slots `default` and `icon`. The dock tokens are `--dock-control-{active-bg, floor, glyph-size, hover-bg, press-bg, radius, safe-inset, size, specular-size}`. There is no mark, badge or indicator prop, slot or token. `active` is not a substitute: it is the selected glass seat plus `aria-pressed` ("never a saturated brand hue"), which would mislabel a menu trigger as pressed.
- **Ask:** a published mark seat on `DockControl` and `DockTrigger`. For example, a `mark` prop (boolean) that paints a small dot at the control's corner, with a `--dock-control-mark` colour token settable per control. It stays inside the hit cell, the painted inset holds it, and it is announced through the control's accessible description rather than by colour alone. Unset, nothing is painted, as today.

## 2 · MENU-ITEM-ICON-GAP: the icon-to-label gap on DropdownMenuItem
- **Ruled (addendum (a)):** the menu rows Smooth contour, Simplify contour and Reset to extraction show their icon flush against the label. The cure must use glass's `DropdownMenuItem` icon anatomy (its published icon slot or gap), never a consumer margin.
- **Measured at glass 10.1.0:** `DropdownMenuItem` renders `menu__item interactive-item glass-menu-row` around one `default` slot. `.menu__item` is `display:flex; align-items:center; padding-inline:0.5rem` with no `gap` (computed `column-gap: normal`), there is no icon slot, and there is no `--menu-*-gap` token (the only menu tokens are `--menu-row-bg` and `--menu-row-lift`). fourier's falsifier `e2e/f-w14v-c3.spec.ts` c3g measures the icon's right edge to the label's first glyph at **0 px** on all three rows, ×2.
- **Ask:** an icon anatomy on the menu rows, either a `gap` on `.menu__item` / `.menu__sub-trigger` read from a published token (for example `--menu-item-icon-gap`), or an `#icon` slot that places a leading glyph at glass's glyph size and gap. It applies to every item family (Item, CheckboxItem, RadioItem, SubTrigger), so every consumer's icon rows inherit it.

Until these land, fourier records honest-RED **MAGNET-STATE-HIDDEN** and **MENU-ICON-GAP**, and paints nothing of its own.
