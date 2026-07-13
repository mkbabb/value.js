# U.W-A11Y AUTHED — close note (U-F56 · U-F58 error-a11y half · BR-9)

The driven-live gestalt + a11y pass over the **authenticated + populated** surface
that the T campaign never drove (registry §16: the whole audit ran on the
empty-plate + unauthenticated GETs). Census pointer `static-zd3-admin` (*"admin
never-filed pass + thrown-error a11y half → U.W-A11Y (U-F56 · U-F58)"*,
`w-visual-close-artefacts.md:73`) is **DISCHARGED** here.

## The journey driven (all against the honest fixtures — addInitScript auth +
route-mock, the smoke-admin seam; NO prod target)

login (authed identity menu) → save/publish RESULT surface (populated palette-card
grid) → admin moderation (populated users / names / flagged) → populated browse
wall. The a11y **battery** (accessible-name · target-size ≥24px fine · contrast
record · keyboard-operability) ran over EACH populated state.

## BR-9 (born-RED coverage) — RED → GREEN

Battery passes over **5 populated states** (was: 0 — uncovered):

| Populated state | Battery result |
|---|---|
| authed identity menu (`ProfileSection`, the login entry) | PASS — items named, keyboard-reachable (ArrowDown → menuitem) |
| populated browse wall (50-card grid) | PASS — cards/menus named, no sub-24px, controlsChecked > 25 |
| admin Users (populated) | PASS |
| admin Names (populated, incl. the F-1 long-string row) | PASS |
| admin Flagged (populated) | PASS |

Spec of record: `e2e/smoke/admin/a11y-authed-{admin,user}.spec.ts` (smoke-admin
project — joins CI via the dir glob) + `fixtures/a11y-battery.ts` (the
computed-over-live-surface battery). Isolated run config: `authed.config.ts`
(:8824). **7/7 green.**

## Defects found in the driven journey → cured (2, both born-RED first)

1. **BR-9 keyboard-operability — the admin user-row EXPANDER** (`AdminUsersPanel.vue`).
   The expand-to-palettes affordance was a bare clickable `<div>` (role:null,
   tabindex:null, focusable:false) with NO other keyboard path to a user's
   palettes — WCAG 2.1.1 (Keyboard) fail. **Cured**: when interactive
   (`paletteCount > 0`) the row is a real disclosure button — `role=button` +
   `tabindex=0` + `aria-expanded` + Enter/Space (`onRowKeydown`, guarded
   `target === currentTarget` so a keydown on the nested Palettes/Delete buttons
   never toggles the row). A 0-palette row stays inert (never a dead tab stop).
   Born-RED spec `a11y-authed-admin.spec.ts:68` RED→GREEN.

2. **U-F58 thrown-error a11y half — no focus-managed / announced error boundary**
   (`App.vue` white-screened on a pane render throw). An induced broken
   `/admin/users` envelope (a null slug → `slugHead(null)` throws in the v-for
   render) produced a silent dead plate — no `role=alert`, no focus move, no
   recovery. **Cured**: `demo/@/components/common/ErrorBoundary.vue` — an
   `onErrorCaptured` boundary (returns false, owns the failure) wrapping the
   pane-container in `App.vue`; on catch it paints a `role=alert` +
   `aria-live=assertive` surface, moves focus INTO it (`tabindex=-1` +
   `nextTick focus()`), and offers a real "Try again" recovery button. Never a
   silent white-screen. Born-RED spec `a11y-authed-admin.spec.ts:108` RED→GREEN.

## π-frames + DELTA (`docs/tranches/U/audit/w-a11y/pi/`)

`authed-{login,admin,browse}-{light,dark}.png` + `error-boundary-{light,dark}.png`
(8 frames, both schemes, captured headless — a11y is deterministic). Capture:
`pi-capture.spec.ts` / `pi-capture.config.ts` (isolated, NOT CI-wired).

- **DELTA (BR-9)**: a11y-battery pass-count over populated states **0 (uncovered)
  → 5 (all pass)**; **defects-found → cured = 2/2**.
- **DELTA (U-F58)**: error surface **silent white-screen → role=alert +
  aria-live=assertive + focus-managed + recovery button**.

## Dispositions of every modality touched here

| Item | Disposition |
|---|---|
| BR-9 admin-row keyboard-operability | **CURED** (demo, `AdminUsersPanel.vue`) |
| U-F58 thrown-error a11y half (focus + announce) | **CURED** (demo, new `ErrorBoundary.vue` + `App.vue` wire) |
| U-F58 error-detail sub-3:1 CONTRAST (2.72:1 residue) | **COORDINATED, not double-cured** — U-F26's lane owns the error-detail contrast token. The new boundary threads the certified `--ink-muted` de-emphasis rung (the same rung EmptyState's error `detail` rides) so it adds NO new sub-floor debt; its PRIMARY announced text uses `--foreground` (safe). Coordination observation: the boundary composites over the AURORA ground (it replaces the whole pane grid, so there is no card plate) — if U-F26 wants to certify this exact surface, its referent is the aurora, not a resting card plate. Legible in both schemes by eye. |
| thrown-error PERCEPTUAL micro-chrome gestalt | **ROUTED → U.W-VISUAL W8-inheritance census** (not mine, per §U-F58) |
| broader fault-injection resilience | **OUT-OF-SCOPE (recorded)** — one induced error over the authed surface is the a11y half; general fault injection is not this lane's |
| long-session / memory | already **FOLD → U.W-PERF** (§U-F58, not re-decided here) |
| save/publish surface a11y | **COVERED by the populated-browse battery** (the PaletteCard grid is the shared component; publish menu items are text-labeled DropdownMenuItems, statically confirmed) — no separate fixture built (probe-parsimony; the π obligation is exactly login/admin/browse) |

## E-2 RELAY

Demo-only cures (`ErrorBoundary.vue`, `AdminUsersPanel.vue`, `App.vue`) — glass-ui
tree untouched (PINNED). **No NEW producer-primitive a11y defect surfaced** in the
driven authed/populated surface beyond the already-relayed set (the dock-nav
target-size + forced-colors/focus-outline producer asks in the landed A11Y-wave
BH addendum). The modality lane owns the single BH addendum; this lane adds NO new
producer ask.

## OA-2 (owner-attested — FLAGGED for the owner)

The authed + populated surface reads as a **coherent gestalt** (my eye): the admin
Users panel (certified-accent slug pills, count badges, quiet-at-rest destructive
actions), the populated browse wall (color-strip cards, vote counts, "…" menus),
the identity menu (labeled items), and the NEW error boundary (quiet CircleAlert
glyph, Fraunces statement, Fira machine-truth on the muted rung, real recovery
button — matches EmptyState's error register). Awaits the owner's terminal verdict
(lesson 12). Frames: the 8 π-frames above.

## pi-path FLAG

The wave doc §π says `audit/pi/w-a11y/`; the lane task directs `audit/w-a11y/pi/`.
**The live tree already uses `audit/w-a11y/pi/`** (the sibling U-F25/F26/F57 frames
are committed there), so this lane used `audit/w-a11y/pi/` — the wave-doc §π path
is the discrepancy. Flagged for the doc's next correction.
