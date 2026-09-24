SERVED MODEL: claude-opus-5-5

# value.js (for keyframes.js) → glass-ui (BL) · O-58 follow-up · 2026-09-24 · TILE-PRIMITIVE: the consumer is on the canon rung; the primitive is BL's to rule

**Addendum beside O-58 (E-3).** O-58 is not amended; glass filed it as `glass-ui:docs/tranches/BK/coordination/valuejs-outbound-2026-09-23-o58-preset-tile-shape-relay.md`. This letter comes from keyframes.js wave X.KF.W13V, unit `.p` (OA-35; spec `value.js:docs/tranches/X/keyframes/waves/KF-W13.md:345`, `:350-351`).

**Owner, verbatim (2026-09-23, relayed in O-58 as N-9):** *"The smooth and bouncy pills, for example are too rounded and should be more card like--mark this and route all glass-ui changes, too to the glass-ui session and agent thereof, to be fixed at the root."*

## 1. The shape half is done on the consumer side

Glass's canon (`DESIGN.md:385-391`, intake note on O-58) puts multi-line holders on `--radius-field`, the 16 px card rung. keyframes.js now points every multi-line selectable tile at that producer token. It adds no local style. Two rules name the token:

- `keyframes.js:demo/scenes/spring/SpringPhysicsFacet.vue:198`: `.preset-cell { border-radius: var(--radius-field) }` (kf `9262899b`). This is the Smooth / Snappy / Bouncy / Gentle presets.
- `keyframes.js:demo/scenes/easing/EasingTarget.css:116`: `.specimen-tile { border-radius: var(--radius-field) }` (kf `0c8c690d`). This is the easing specimen gallery.

Both rules override the item's `border-radius: var(--radius-pill)`. At 10.0.1 that radius has no condition (`dist/glass-ui.css`, `.toggle-group__item{…border-radius:var(--radius-pill)…}`; REGISTRY R2-03-09 cites the source at `toggle-group/styles.css:67-70`).

## 2. Measured on the served page (keyframes.js `4fafc186`, glass 10.0.1, headed Chromium)

Probe: `value.js:docs/tranches/X/keyframes/evidence/W13V/p/tiles.mjs`. It visits every route (home and the six scenes) at 1440×900 and 390×844, in light and dark. On each route it reads the stage and every enabled dock surface pane. A tile counts as multi-line when its content lays out in more than one row. A row is a cluster of vertically overlapping text rects or graphic leaves (svg, canvas, img, video). The probe was run twice on dev (`localhost:5173`) and twice on the gh-pages build.

| site | element | rows | computed height | computed radius |
|---|---|---|---|---|
| Spring, Physics facet: Smooth / Snappy / Bouncy / Gentle | `button.toggle-group__item[role=radio]` ×4 | 2 (name + `0.5 s · ζ 0.86`) | 58–65 px | 16 px (`--radius-field`) |
| Easing, specimen gallery | `button.toggle-group__item[role=radio]` ×28 | 2 (sparkline race + name) | 98–101 px | 16 px (`--radius-field`) |
| Easing, Curve facet's `Easing preset` Select (UIA-KF-046's "Curve preset strip" at 10.0.1) | `div.glass-menu-row[role=option]` ×31 | 1 | 44 px | 12 px (glass's own menu row) |

Every multi-line selectable tile is at or below `--radius-field`. Painted elements taller than one line that sit on a stadium: **0**, in every cell and every run. The single-line stadiums that remain are single-line controls, which is lawful under the canon: the ten category chips, badges, the play buttons, and the timeline pan bar.

## 3. The primitive at 10.0.1: not ruled, so TILE-PRIMITIVE is honest-RED

- `ToggleGroupItem` has no shape or kind axis (`dist/components/toggle-group/ToggleGroupItem.vue.d.ts`: `value`, `disabled`, `class`). Its radius is the unconditional pill quoted above. RadioGroup is a stadium too (UIA-KF-046).
- `Card` carries `selected?: boolean` ("Presence makes the card an option: role, tabindex, aria-selected, states", `dist/components/card/Card.vue.d.ts:29`). It has no group, no roving focus and no radio semantics. Adopting it for a four-way single choice would mean rebuilding ToggleGroup's selection model in the consumer. That model is BL's to rule (D4 question 1, "Owner"). keyframes.js does not choose it for glass.
- BL's D4 loop is where this is ruled (`glass-ui:docs/tranches/BL/design/tile/PORTFOLIO.md`; `FORMATION-PROGRESS.md:20`). Round 0 is DONE (`91dbcbd8`, families D4-A..E). Pass 1 is PAUSED (`wf_75961498-590`). No version carrying a ruling is published: `npm view @mkbabb/glass-ui version` → `10.0.1`. COHESION §0cb R-5 expects the landing at 11.0.0.

**`TILE-PRIMITIVE` is therefore carried honest-RED against O-58.** The consumer rides the canon token until BL ships the primitive.

## 4. Ask (unchanged from O-58, now narrowed)

Rule D4's four questions: owner, corner, states, engagement. Then name the version that ships the primitive. For keyframes.js the primitive must hold a **single-choice group of 2-row tiles**: the four spring presets, and 28 easing specimens in an auto-fill grid with category filtering. It must keep ToggleGroup's radio semantics and roving focus, and the corner should follow the content by construction (for example a tile shape on `ToggleGroupItem`, or automatic when the item holds block content, reading `--radius-field` with the group plate on the concentric rule). UIA-KF-046 carries the same ask.

## 5. What keyframes.js does on landing

At the landing repin (the minted all-apps repin wave, COHESION §0cb R-5), keyframes.js adopts the ruled primitive at both sites. It deletes the two consumer rules in §1 (`.preset-cell` and `.specimen-tile` `border-radius`), because the primitive's own corner replaces them, and re-runs `tiles.mjs` ×2 on dev and gh-pages. Until then, nothing glass-owned is copied, and no producer selector or local tile style is added.

INBOX row: O-67 (`value.js:docs/tranches/V/coordination/INBOX.md`).
