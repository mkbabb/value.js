# S · design-assay lane — ADMIN views (dock admin mode → users / names / audit / flagged / tags)

**Date**: 2026-07-04 · **Repo**: value.js @ `c5aa091` (branch `tranche-q`) · **Mode**: AUDIT ONLY
**Method**: live probes against the dev server at `http://localhost:9000` via Playwright (Chromium), admin entered by the e2e fixture idiom (`localStorage["palette-admin-token"]` seeded via `addInitScript`, admin API surface route-mocked with BOTH populated and empty envelopes — the checked-in fixture at `e2e/smoke/admin/fixtures/admin-auth.ts` only ever serves EMPTY envelopes, see F-14). Matrix: 5 admin views × {light, dark} × {1440×900, 390×844} + empty-state pass + dock states + interaction probes. All numbers below are measured from the live DOM.

**Evidence** (session scratchpad, `/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/daa7c418-d0bc-4d88-913c-27283e6345eb/scratchpad/shots/`):
`admin-{users,names,audit,flagged,tags}-{light,dark}-{1440,390}.png` (20), `admin-*-empty-light-1440.png` (5), `dock-admin-select-open-{light,dark}.png`, `dock-user-select-open-admin-authed-light.png`, `dock-admin-collapsed-light.png`, `admin-users-expanded-light-1440.png`, `admin-names-approved-light-1440.png`, `dialog-after-{400ms,2400ms}.png`, `dom-probe-6s.png`. Each finding names its shots.

The register under assay: the editorial instrument — Fraunces display voice, Fira readout, cartoon-offset shadow, ink+grain, specimen-plate empty states, the gold accent as the ONE admin identity (viewSchema.ts:82-84: "admin identity is the gold accent, not a hue turn").

---

## P0

### F-1 · Names moderation actions are clipped off-card (desktop) and fully unreachable (mobile)

**Measured** (live DOM, `[role=tabpanel] .grid > div` rows vs the pane Card):

| viewport | card right edge | row right edge | Approve btn right | Reject btn right |
|---|---|---|---|---|
| 1440×900 | 711 px | 761.3 px | 710.3 px | **748.3 px (clipped)** |
| 390×844 | 374 px | 670.1 px | **619.1 px (off-card)** | **657.1 px (off-card)** |

The pane Card is `overflow-x-hidden` (`AdminPane.vue:2`), so there is no scroll path to the buttons: on a phone the **entire pending-names moderation flow is inoperable** — approve/reject live ~250 px past the card edge. On desktop the Reject half of every pair is swallowed. Shots: `admin-names-light-1440.png` (rows visibly punching through the card edge, lone ✓ at the rim), `admin-names-light-390.png` (no buttons at all).

**Root** (measured via computed-style chain probe): the Tabs root `class="w-full grid gap-3 pb-3"` (`AdminNamesPanel.vue:5`) reports width 645 px but grid track `720.266px`; the TabsContent (`class="mt-3"`, display:block) is a grid item with `min-width:auto`, so the nowrap `truncate` spans' full-line min-content (the un-breakable "a very long proposed color name…" + `color(display-p3 0.2 0.7 0.4)`) propagates up as the track floor — `min-w-0` exists inside `AdminListItem.vue:11` but the chain is broken ABOVE it, at the TabsContent grid item. The approved tab (1 button, shorter strings) happens to fit (`admin-names-approved-light-1440.png`), which is why the defect reads as intermittent.

**Route**: value.js demo. The honest fix is one with F-4: replace the raw reka-ui Tabs assembly with the glass-ui Tabs primitive (per `feedback_glass_ui_first_class.md` / S-21); if any interim class fix is proposed instead, it's `min-w-0` on the TabsContent item — but the raw-primitive substitution is the root.

### F-2 · Local dev has NO working admin (or palette) API, and the failure is silently costumed as success (S-11 root cause)

**Measured** (boot probe, no mocks): every API call from `localhost:9000` goes to the **production spine** — `BASE_URL = import.meta.env.VITE_API_URL ?? DEFAULT_REMOTE_API_URL` (`demo/@/lib/palette/api/client.ts:34-35`) resolves to `https://api.color.babb.dev`, whose CORS answers `Access-Control-Allow-Origin: https://color.babb.dev` → **every request dies at preflight** (`net::ERR_FAILED` on `/colors/approved`, `/admin/users?...`, logged verbatim in the probe).

The kicker is the second half: `useAdminUsers.loadAdminUsers` catches the `ApiUnavailableError` and emits `console.warn("Failed to load users: …")` — then the panel renders **"No users found."** (`admin-users-empty-light-1440.png` is pixel-identical to the backend-down state). Backend-unreachable and genuinely-empty are indistinguishable in EVERY admin panel: an admin with a dead API sees "No flagged palettes." and reasonably concludes the moderation queue is clear. This is the silent-handling precept violated at the moderation surface, where the cost is trust.

**Route**: split —
- value.js demo: dev-time `BASE_URL` must not silently target the prod spine from a foreign origin (dev default → local api container, or an explicit loud unconfigured state);
- value.js demo: error state ≠ empty state — the panels must render an explicit "backend unreachable" plate (the EmptyState component already takes eyebrow/hint slots; a failure variant is one prop);
- api (decision): whether `localhost` origins belong in the CORS allowlist for the spine. NO fallback chains — one configured target, loud failure otherwise.

---

## P1

### F-3 · Dark mode is illegible over the un-darkened aurora: 1.39:1 measured contrast

**Measured**: in dark mode, `text-muted-foreground` resolves to `rgb(195,185,172)`; the aurora canvas CSS-gradient stops are `rgb(179,114,144) / rgb(223,142,167) / rgb(255,176,180) / rgb(255,208,200)` — **byte-identical to light mode** (the derive ignores the scheme entirely). Light-gray Fira over the lightest stop = **1.39:1** (WCAG AA needs 4.5:1). The wash-tier admin cards are translucent, so the pink field bleeds straight through the card body: audit timestamps and target lines vanish mid-card (`admin-audit-dark-390.png` — the first entry's timestamp is functionally invisible), flag details and dates likewise (`admin-flagged-dark-1440.png`).

**Root**: `useAtmosphere.ts` calls `deriveAurora(css)` bare (`demo/@/composables/color/useAtmosphere.ts:88`, gradient at `:72`) — but glass-ui's `deriveAurora` ALREADY accepts `scheme` and `lBand` options (`glass-ui/src/components/custom/aurora/composables/color.ts:238-239`). The consumer never passes them and never re-derives on scheme flip. This is also the structural half of S-18 (aurora doesn't respond in H/C either — one derive call is where all of it lands).

**Route**: value.js demo (`useAtmosphere.ts`: pass `scheme` from `useGlobalDark`, re-derive on flip). No glass-ui change needed — the producer API is already there.

### F-4 · AdminNamesPanel ships RAW unstyled reka-ui Tabs — generic furniture at the moderation core

`AdminNamesPanel.vue:78` imports `TabsRoot/TabsList/TabsTrigger/TabsContent` from **`reka-ui` directly**; the TabsList renders `class="w-full"` with computed `display:block` (measured) — no rail, no fill, no active affordance. Visual result (`admin-names-light-1440.png`, `-390.png`): the Clock/CheckCircle icons wrap onto their own line ABOVE the "Pending"/"Approved" labels; the active tab is marked by nothing but font-weight luck. The in-file comment ("Ag-12: Tabs normalized to filled TabsList") describes styling that is not there. Six more raw-reka Tabs imports sit in the PaletteDialog tree (`PaletteDialog.vue:179`, `PaletteControlsBar.vue:74`, `PaletteSavedTab.vue:59`, `PaletteAdminTabs.vue:38`, `PaletteBrowseTab.vue:63`, `ImagePaletteExtractor.vue:17`) — same family, assayed here only where it broke.

**Route**: glass-ui-first (S-21 + `feedback_glass_ui_first_class.md`): consume the glass-ui Tabs at every one of these sites; kill the per-file raw assembly. This also carries F-1's fix.

### F-5 · The collapsed dock is broken furniture (S-8 confirmed on desktop, 3 reproductions)

After any pane interaction + the 5 s collapse delay, the dock collapses to a ~48 px circle with the view label **clipped to "Us…"/"N…" overlapping the WatercolorDot** — reproduced in `admin-users-expanded-light-1440.png`, `admin-names-approved-light-1440.png`, `dialog-after-2400ms.png`. Code root: the collapsed slot renders dot + **text label** (`hidden sm:inline`) + chevron (`Dock.vue:217-230`) — exactly what S-8 orders replaced with dot + ICON, no text. Adjacent rot in the same file: `.gold-shimmer-icon` at `Dock.vue:238` is a **dead selector** (no template consumer), and `DockViewSelect.vue:128`'s comment "matches the class used in Dock.vue collapsed slot" is therefore a lie; the collapsed state carries **zero admin identity** (no gold anywhere) — in admin mode the collapsed dock is indistinguishable from user mode.

**Route**: value.js demo (`Dock.vue` collapsed template → WatercolorDot + view icon, gold treatment when `isAdminMode`; delete the dead selector); glass-ui producer only if the collapsed fit-content sizing itself proves wrong once the text is gone.

### F-6 · Dead admin furniture: the AdminPanel quartet is orphaned (~245 LoC), one file a duplicate

`AdminPanel.vue` has **zero importers** (repo-wide grep); with it die its only consumers `AdminAuthGate.vue` (53), `AdminColorQueue.vue` (49), `AdminPaletteOps.vue` (58) — the dialog-era admin surface superseded by the pane views. `AdminColorQueue.vue` is a near-line-for-line duplicate of AdminNamesPanel's pending list (same AdminListItem/swatch/approve-reject grammar) — a DRY violation preserved in amber. S-12's excision order applies squarely.

**Route**: value.js demo — delete all four (verify AdminAuthGate has no other consumer at excision time; the admin login path lives elsewhere).

### F-7 · Hand-rolled square inputs in Audit + Tags panels — off-register, one measurably clipped (S-17)

`AdminAuditPanel.vue` (Action…/Target… filters) and `AdminTagsPanel.vue` (Tag name…/Category… creators) hand-roll `<input class="h-7 … rounded-input border border-input bg-background …">` — 4 sites, square-cornered generic chrome sitting directly under glass-ui SearchBar pills (shots: `admin-audit-light-1440.png`, `admin-tags-light-1440.png`). The Tags category input (`w-28`) **clips its own placeholder to "Category ."** (measured in shot). Meanwhile `demo/@/components/ui/input/index.ts` already re-exports the glass-ui Input. Also disproportionate: tag-name input spans ~5× the category input.

**Route**: value.js demo — swap all 4 to the glass-ui Input (root component level per S-21/`feedback_root_styling.md`); size the pair honestly.

### F-8 · Danger grammar: hidden shift-click bypass, shouting red columns, equal-weight destructive/neutral pairs

- **Shift-click silently bypasses the confirm dialog** for BOTH "delete all palettes" and "delete user" (`AdminUsersPanel.vue:237-239, 252-254`) — an invisible, undocumented, un-undoable fast path on the two most destructive actions in the app. No affordance advertises it; a shift-clicking power user and a shift-holding accident are the same event.
- Every user row carries an always-red `variant="destructive"` circle (`AdminUsersPanel.vue:81-89`) — 5 rows = 5 red beacons; the destructive affordance is the most visually dominant element of the list (hierarchy inversion; `admin-users-light-1440.png`). Same per-row red in Names/Flagged.
- Flagged rows: neutral "Dismiss" and destructive trash sit adjacent at identical size/weight (`AdminFlaggedPanel.vue` header row; `admin-flagged-light-1440.png`).
- 0-palette users still render a disabled "Palettes" delete button — superfluous furniture (`admin-users-light-390.png`).
- The ConfirmDialog itself is GOOD when it arrives (Fraunces "Delete user?", mono body, slug pill, red action — `dialog-after-2400ms.png`) — the grammar to keep.

**Route**: value.js demo — excise the shift-click special-case (precept: no special-cases); quiet the per-row destructive (ink-at-rest, red-on-hover/focus); weight Dismiss vs delete asymmetrically; drop disabled delete buttons for empty users.

### F-9 · Technical readouts set in italic display type — the instrument's own values off-register

`text-caption` is **italic text-face** (`glass-ui/src/styles/typography/semantic.css:210-216`). The admin panels set CSS color strings and machine targets in it: proposal css lines (`AdminNamesPanel.vue` content slots — "oklch(92% 0.03 220)" in italics, `admin-names-light-1440.png`), audit target lines (`AdminAuditPanel.vue` secondary line). Flagged flag-details correctly use `text-mono-small` — so the SAME semantic slot (secondary machine-string) is italic-serif in two panels and Fira in the third. In a color-science atlas, a CSS literal is a readout: Fira, never italic.

**Route**: value.js demo — `text-caption` → `text-mono-small`/`text-mono-caption` on machine-string lines in AdminNamesPanel + AdminAuditPanel (AdminListItem's doc comment should stop prescribing `text-caption` for the secondary line when it's a value).

### F-10 · "@MBABB" — S-5 confirmed, root found

Source is lowercase `@mbabb` (`ProfileSection.vue:100`) but the trigger class `text-mono-caption` bakes `text-transform: uppercase` (`glass-ui/src/styles/typography/utilities.css:42-47` — deliberately, it's the eyebrow register). Wrong register for a handle: it's an identifier, not an eyebrow. Visible in every dock shot.

**Route**: value.js demo — use a non-transforming mono class on the handle trigger (glass-ui utility stays as-is; it's canon for eyebrows).

---

## P2

### F-11 · Empty-state grammar: the plate conceit self-cheapens, and one panel defects from it entirely

- "· EMPTY PLATE ·" prints **twice simultaneously** on every empty admin view (admin pane + My Palettes pane, e.g. `admin-users-empty-light-1440.png`) — the same eyebrow everywhere turns the specimen-plate conceit into template boilerplate (S-12 family). Candidate: per-context eyebrows ("· no specimens pinned ·", "· ledger clear ·"…) or eyebrow only on the primary pane.
- `AdminFlaggedPanel.vue` bypasses EmptyState with a literal grey italic `"No flagged palettes."` — the exact "grey italic apology" `EmptyState.vue`'s own header comment forbids. The only admin panel off the system.
- Flagged rows with `palette: null` (deleted palette) render a bare slug with an empty swatch strip and no marker (`admin-flagged-light-1440.png`, "deleted-palette-slug" row) — silent null-handling; say "palette deleted" explicitly.

**Route**: value.js demo.

### F-12 · Admin taxonomy + identity seams

- **Atmosphere and Blob live in the admin view list** (`useDockAdminMode.ts:27`) — tuning panes mixed into a moderation menu (`dock-admin-select-open-light.png`); taxonomy muddle, and the accent story splits (admin = gold, but these two are hue-turn views).
- **Asymmetric watch**: landing on `#/atmosphere` flips `isAdminMode` true, landing on `#/blob` does not (`useDockAdminMode.ts:51-55` checks `view === "atmosphere"` only, while both sit in `adminViews`) — same-class views, different behavior.
- The admin trigger ring stays picker-pink (`--dock-ring: safeAccent`, `DockViewSelect.vue:55`) while the icon goes gold — split identity on the one control that declares mode.
- The Names pane header badge shows pending+approved summed (`AdminPane.vue:110` — "5" over tabs reading 3 / 2): a number that matches neither visible list.
- Audit toolbar shows a naked `12` (`AdminAuditPanel.vue` total) — unit-less count next to labeled counts elsewhere ("5 users · 2 empty", "2 flagged").
- Dead imports `Shield, Tag` at `AdminPane.vue:67`.

**Route**: value.js demo, all.

### F-13 · Loading + truncation grammar

- All 5 panels' loading state is a bare centered `Loader2` spin — the generic-AI spinner, while the browse surface owns a skeleton/shimmer system (S-10's family). Admin lists should load as skeleton rows in the same grammar.
- Mobile slug pills truncate to identity-destroying stubs: both prune candidates render as `empty-ghost…` (`admin-users-light-390.png`) — two indistinguishable rows, each with a delete button. Middle-truncate or give the tail priority.

**Route**: value.js demo.

### F-14 · Test blind spot: the admin e2e surface only ever sees empty envelopes

`e2e/smoke/admin/fixtures/admin-auth.ts:25-26` serves `{data: []}`/`[]` for everything; `admin-walk.spec.ts` asserts heading visibility only. F-1 (overflow), F-4 (broken tabs), F-13 (truncation) are all **structurally invisible** to the suite — every admin defect in this report co-exists with a green 38/38. Populated-fixture admin specs (long-string rows included) are the regression fence for this lane's fixes.

**Route**: value.js demo (e2e).

---

## Candidate wave-items

| # | Item | Carries |
|---|---|---|
| W-A | Glass-ui Tabs adoption sweep (7 raw-reka sites) + min-width chain audit of the admin list grammar | F-1, F-4 |
| W-B | Dev API truth: local BASE_URL policy + explicit backend-unreachable plate in all admin panels (error ≠ empty) | F-2 |
| W-C | `deriveAurora` scheme-aware re-derive on dark flip (consumer passes `scheme`/`lBand`; re-run on `useGlobalDark`) | F-3, half of S-18 |
| W-D | Collapsed dock re-cut: dot + icon, no text; gold identity in admin; dead-selector excision | F-5, S-8 |
| W-E | Dead-code excision: AdminPanel quartet (+ dead imports) | F-6, F-12 |
| W-F | Admin chrome on-register pass: glass-ui Inputs ×4, mono readouts, danger-grammar quieting, shift-click excision, empty/loading grammar, taxonomy seams | F-7..F-13 |
| W-G | Populated-fixture admin e2e specs (overflow + tabs + truncation fences) | F-14 |

The good bones, for the record: the Users list row grammar (slug-pill + count + actions) is genuinely of the register; the ConfirmDialog composition is right; the Flagged panel's information hierarchy (swatches → name → owner → reason badges → dates) is the best table grammar in the admin set; the gold "admin" pill + shield trigger read correctly when expanded. The lane's work is excision and consistency, not reinvention.
