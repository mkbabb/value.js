# T.W8 · critique pass — ADMIN (the five views + auth/profile flows) · p1 (round 1 of ≤3)

**Filed**: 2026-07-12 · Fable + frontend-design · **PROBE-ONLY coherence PRE-FILTER**
(no authoring; no taste certified — a pass verdict is "coherent with the doctrine" or a
filed row, NEVER "beautiful"; lesson 12. Taste is the OWNER's.)
**Branch/head**: `tranche-t` @ `9efe3d1` at filing (probed at `c8799fd`; every commit between
is a sibling W8 pass's docs/audit-only churn, so the probed demo tree is unchanged). The probed
product tree is the same admin source the owner has audited through §0.6/§0.7 (no admin-named
owner row exists — see below).
**Surface**: the FIVE admin views BY NAME — `admin-users` · `admin-names` · `admin-audit` ·
`admin-flagged` · `admin-tags` — plus the auth/profile flows (the dock ProfileSection:
admin gold pill / Profile dropdown / @mbabb menu / Login entry). The h-gaps **G-11**
least-covered-by-design surface class; no design wave re-authored these, so they are judged
CRITIQUE-FRESH against the same doctrine every other surface met.
**Spec of record**: `waves/T.W8.md` §Scope-1 (admin named in the census) · `SYNTHESIS.md §2`
D1–D10 · `MANDATE-2026-07-06.md` §0 (T-24 · T-3/T-11/T-18) + §0.6 (T-41 · T-44 skeleton
discipline; T-35 the accent-ink population) · `RATIFICATION-2026-07-09.md`.
**Owner verbatim (the governing CROSS-CUTTING orders — no owner line names an admin view
individually, so the law is the cross-cutting set)**: T-24 "Do a full audit of all glass
card areas to use consistent gray/black/white colors" · T-41/t33-audit-07 "these shadow
palettes … do not shimmer properly as a proper skeleton — should not be displayed herein" +
t33-audit-08 "bring that iconset with the dashes back" · T-35/t33-audit-03 "Many of the text
items that SHOULD be the current contrast friendly color are not … delineate all".
**Pass inputs**: the W3-1 four-rung material ladder (D1) · the O-18 contrast census (extended
here to admin rows/pills/labels/readouts at the owner reference color) · the T-41 skeleton
discipline (the AdminListSkeleton is the surface to judge: it must shimmer as a PROPER
skeleton OR show the true empty state) · `w45-checkpoint/ROWS.md` + `w65-close-artefacts.md`
(no admin-named brackets).
**Anchors re-derived via `w1-move-map.md`**:
`custom/palette-browser/admin/{AdminUsersPanel,AdminNamesPanel,AdminAuditPanel,AdminFlaggedPanel,AdminTagsPanel,AdminListItem,AdminListSkeleton,PaginationBar}.vue`
· `custom/panes/AdminPane.vue` + `PaneHeader.vue` · `common/EmptyState.vue` ·
`composables/auth/{useAdminAuth,useUserAuth,useSession}.ts` ·
`custom/dock/menus/ProfileSection.vue` (the auth/profile chrome) · skeleton primitive:
`@mkbabb/glass-ui/skeleton` (`variant`/`surface`) + `demo/@/styles/utils.css`
`.skeleton-ink-register`.

---

## §1 Method (the O-3 probe class — live drive, real engine, dpr 2, headed)

- **Serve**: lane-unique ports, the owner's `:9000` untouched — **VJS_E2E_PORT=8690** (bare
  vite dev, `VITE_API_URL=http://localhost:8690`, the inv-K-5 same-origin seam so the
  designed `misconfigured` latch never fires and the mock envelopes reach the panels) ·
  **PERF_PORT=8691** reserved. The smoke-admin `addInitScript` fixture is reproduced
  in-probe (`e2e/smoke/admin/fixtures/admin-{auth,populated}.ts`): the admin token seeded
  pre-boot, the `**/admin/**` + `**/sessions` routes answered POPULATED / EMPTY / ERROR(500)
  / LOADING(12s-hold) per leg — the mock is sufficient for a probe-only visual critique
  (§Scope-1's own allowance).
- **Cells**: each of the five views × {populated, empty, error} × schemes {light, dark};
  populated at 1440×900 · 768×1024 · 390×844 (dpr 2), the state legs at 1440; a loading
  freeze (12s route hold) at 1440 ×2 schemes; the auth/profile dropdowns at 1440 ×2.
  Deep-link `#/admin/<view>`; the O-18 leg re-drives at the owner reference color
  `lab(40.39% 52.94 47.26 / 82.7%)`.
- **Measures**: the pane-card composited material (rung, backdrop, α) vs the picker/pane
  register; admin-row backgrounds/borders; the muted-ink token per scheme; the skeleton
  element's live `animation-name`/`duration`/`surface` (breath vs shimmer); an O-18
  contrast pass over the secondary readouts (analytical composite: plate oklab over the
  measured body α-composited, WCAG against the ink token — the pixel census OOM-thrashed the
  headed WebGL context, so the ratios below are the analytical proxy, flagged as such).
- **Frames**: `docs/tranches/T/audit/pi/w8/admin/` (gitignored PNGs on-disk, the standing
  convention): `<view>-<vp>-<scheme>-<mode>.png` (58 frames) · `users-1440-<scheme>-loading.png`
  · `dock-admin-<scheme>.png` · `mbabb-menu-<scheme>.png` · `dock-loggedout-<scheme>.png`.
  Instruments + logs (committed): `pi/w8/w8-pass10-admin-probe.mjs` + `-log.txt` ·
  `pi/w8/w8-pass10-admin-o18.mjs` + `-log.txt`.

---

## §2 COHERENCE VERDICT — **COHERENT with the doctrine** (pre-filter passes; three typed rows for the owner)

The admin surface + auth/profile flows are the least-designed surface class in the tranche,
yet they read as first-class members of the picker/pane register. The heavy lifting was done
by the S.W5 / T.W3–W5 lane work already in the tree (the D1 ladder, the D9 state grammar, the
D2 voice, the D6 accent ink, the W5-12 mobile-overflow cure); this pass finds NO structural
break of the doctrine and three axes to route.

**D1 · THE FOUR-RUNG LADDER + T-24 NEUTRAL FAMILY — GREEN by eye + measurement.** All five
admin views render inside `AdminPane.vue`'s `Card tier="resting"` — the D1 rung-1 PLATE, the
picker's exact register. Measured composited plate is **byte-identical across all five views**
and identical to the `My Palettes` card beside it: light `oklab(0.8845 0.0054 0.0127 / 0.678)`,
dark `oklab(0.3628 0.0101 0.0172 / 0.7424)` — a low-chroma warm-neutral (the D1 cream/brown
family, NOT a hue fork), `backdrop-filter` inherited from the Card. Row edges = `border-card-edge`
(light `oklab(0.216 …/0.12)`, dark `oklab(0.925 …/0.12)`), rows themselves transparent over the
plate; the tag-chip wells are `bg-muted/30` (the WELL tone-step). One card species, one neutral
family — T-24's corollary holds by construction. Frames: `*-1440-{light,dark}-populated.png`.

**D9 · THE STATE GRAMMAR + T-41 SKELETON DISCIPLINE — GREEN.** The three species are present,
correct, and DISTINCT on every view (the exact discipline T-41 demanded, applied to the admin
loading surface): (1) LOADING → `AdminListSkeleton` row-shaped shadows (leading swatch +
primary/secondary lines + trailing lozenge), appearing ONLY during load — a genuine loading
register, never filler masquerading as content; (2) TRUE-EMPTY → `EmptyState` with the dashed
WatercolorDot ghost trio + Fira eyebrow + Fraunces line (`· NO TAGS MINTED ·` / `· roster clear ·`
/ `· ledger clear ·`), the very dashes iconset the owner ordered restored (t33-audit-08),
identical to the `My Palettes` empty plate; (3) ERROR → `EmptyState variant="error"` plain
register (CircleAlert glyph + Fraunces failure line + Fira machine truth + real Retry, no
ghosts). The T-41 "shimmer properly as a PROPER skeleton OR show the true empty state" clause is
satisfied — the loading state is a real skeleton and the empty state is a true empty. The one
open axis is the loading register's CHOICE (breath vs shimmer) — Row A-1, a taste bracket.
Frames: `*-1440-*-empty.png` · `*-1440-*-error.png` · `users-1440-*-loading.png`.

**D2 · TYPE VOICE — GREEN.** View titles are Fraunces display (`Users` / `Names` / `Audit Log`
/ `Flagged` / `Tags`), descriptions italic display, count badges `text-mono-small`; the palette
NAME in Flagged is display-voice non-italic (T-15 population sweep); machine strings (css
literals, targets, slugs, timestamps) are Fira readouts (F-9). Consistent with the pane register.

**D6 / O-18 · ACCENT INK — GREEN; secondary muted rung — Row A-2.** The identity-bearing
accent text (slug-pills, the profile trigger) threads `safeAccentColor` per surface (the
`useSafeAccentFn("chrome")`/`("floating")` split in ProfileSection; the `slug-pill` `:style`
in the panels) — D6-certified, measured live. The de-emphasis SECONDARY readouts, however, ride
the GLOBAL `text-muted-foreground` token, not a per-surface certified ink; the analytical proxy
puts them at ~3.72:1 in light on the composited plate (the AA-large band, under 4.5:1 for the
small type they actually are) — Row A-2. NOTE: this is app-wide (every pane's secondary text on
the resting plate), admin merely the census-extension surface.

**AUTH / PROFILE — GREEN.** Admin-authenticated → the gold-shimmer `admin` pill (measured
`oklch(0.751 0.147 84.2)` light / `oklch(0.784 0.143 86)` dark, on-band chrome). Logged-in-user
→ the Profile dropdown (Copy slug / Switch account / Logout / Regenerate). Logged-out → the
outlined `Login` entry (opens SlugEditLayer). The `@mbabb` wordmark menu (avatar + Share / GitHub
/ Dark mode) reads as a clean floating chrome dropdown. Frames: `dock-admin-*` · `mbabb-menu-*`
· `dock-loggedout-*`.

**MOBILE (390) — GREEN.** The W5-12 F-1 min-width-chain cure holds: the deliberately
pathological proposed-name (`A Very Long Proposed Color Name…`) + the wide `color(display-p3 …)`
literal both truncate, and approve/reject stay ON-card (the flow that was inoperable pre-fix).
Frame: `names-390-light-populated.png`.

**Minor observation (not a row)**: the admin filter chrome varies across views — `SearchBar`
(glass search pill) on users/names, plain `Input` pills on audit/tags, none on flagged. Each is
contextually justified (search-a-list vs filter-by-field vs create-form vs none); noted for the
owner's eye, not filed.

---

## §3 TYPED ROWS (typed by class per RF-8: taste → package BRACKET · defect → booked row · producer → letter)

| # | Class | Finding | Anchor | Route |
|---|---|---|---|---|
| **A-1** | **taste → package BRACKET** | The loading-skeleton REGISTER. The owner's T-41 word was "shimmer **properly** as a proper skeleton"; the `AdminListSkeleton` (and its shared-recipe sibling `PaletteCardSkeleton`) ship `variant="breath"` — a 6s opacity-only swell (0.55→0.95), which in a still frame reads as flat pale blocks and which PRM parks fully static. glass-ui offers a true `shimmer` register (a 1.5s traveling gradient sweep) on the same primitive. Structurally the breath is a valid, glass-ui-sanctioned loading register (so this is NOT a defect — the T-41 discipline is met), but whether "breath" satisfies the owner's literal "shimmer properly" is the OWNER's call. **NOTE: app-wide** (one recipe, both schemes), not admin-specific. | `AdminListSkeleton.vue:13-18` (`variant="breath"`) + `AdminTagsPanel.vue:57-64` + the shared `PaletteCardSkeleton`; primitive `@mkbabb/glass-ui/skeleton` | **Package bracket.** Poles (each a reproducible state): **breath** (calm / "known-imminent, the surface is alive", the LANDED default — `variant="breath"`, measured `animation:skeleton-breath-cycle 6s`, `surface=glass`) ← target → **shimmer** (unmistakable travel, "watch the bar load" — swap to `variant="shimmer"`, the 1.5s transform sweep). Landed default = breath; bulk-approve or rule per the owner's word. |
| **A-2** | **defect near-miss → O-18 census extension (booked, W8 oracle)** | The admin SECONDARY de-emphasis readouts (css literals, audit targets, timestamps, slug-readouts, tag section-labels, toolbar counts, pane descriptions) use the GLOBAL `text-muted-foreground`, NOT the D6 per-surface certified ink. Analytical proxy (plate `oklab 0.8845/α0.678` composited over the measured body): **light ≈ 3.72:1** (AA-large band, under 4.5:1 for the small/caption type it is); **dark ≈ 5.42:1** (pass). De-emphasis rung, and **app-wide** — admin is the census-extension surface, the same class as T-35 "delineate all". The pixel census must confirm against the live aurora (which varies spatially; the proxy is the flat-body mid-tone). | `AdminAuditPanel.vue:70,76` · `AdminNamesPanel.vue:52,102` · `AdminFlaggedPanel.vue:76` · `AdminTagsPanel.vue:87` (`.section-label`) · `PaneHeader` description | **Booked O-18 row** for the W8 oracle census: formally pixel-sample the muted-secondary population at the owner reference color, both schemes; if confirmed, the D6 ink-on-tier contract extends to the muted de-emphasis rung on the resting plate (floor-clamped certified ink, not the global token). Graded: proxy, light-only, de-emphasis — a flag for the census, not a certified fail. |
| **A-3** | **defect minor → booked row** | The LOADING toolbar count lies: while `loading`, `AdminUsersPanel` renders `0 users` (and the pane header `Badge` shows `0`) directly above three loading skeletons, because `totalUsers`/`adminCount` = `pm.adminUsers.value.length` = 0 before the data arrives. A count asserting "0" over a "data incoming" skeleton is a small self-contradiction. | `AdminUsersPanel.vue:6-10` (toolbar count) + `AdminPane.vue:117-125` (`adminCount` badge) | **Booked row.** Cure: suppress the count (render nothing / a dash) while `loading` is true, so the count speaks only once the roster resolves. Low severity, one-file. |

**Loop state**: pass_1 filed. No row contradicts a ratified §12 ruling or a §4 retirement (no
triumvirate HALT). Rows route to remediation_1 by class: A-1 → the package bracket roster
(owner-ruled, app-wide skeleton register — coordinate with any picker/palettes pass that
touches the shared skeleton recipe); A-2 → the W8 O-18 oracle census (booked, app-wide D6
population); A-3 → a one-file remediation lane (`AdminUsersPanel.vue`/`AdminPane.vue`). Nothing
here demands a producer (glass-ui) edit — the skeleton primitive already ships both registers;
the choice is the demo's `variant` prop. pass_2 (if the owner rules the bracket / the census
confirms) re-judges against the landed state; ≤3 then route by class.

---

## §4 Frame index (the pre-filter evidence set — `docs/tranches/T/audit/pi/w8/admin/`)

- **Populated, all views ×3 viewports ×2 schemes** (30): `{users,names,audit,flagged,tags}-{1440,768,390}-{light,dark}-populated.png`.
- **True-empty ×2 schemes** (10): `{…}-1440-{light,dark}-empty.png`.
- **Error(500) ×2 schemes** (10): `{…}-1440-{light,dark}-error.png`.
- **Loading freeze** (2): `users-1440-{light,dark}-loading.png` (the `skeleton-breath` register frozen).
- **Auth/profile** (6): `dock-admin-{light,dark}.png` · `mbabb-menu-{light,dark}.png` · `dock-loggedout-{light,dark}.png`.
- **Measurement logs**: `../w8-pass10-admin-probe-log.txt` (material/skeleton/pill) · `../w8-pass10-admin-o18-log.txt` (contrast leg; note the pixel-census OOM caveat — the §3 A-2 ratio is the analytical proxy in `scratchpad/contrast.mjs`, transcribed).
