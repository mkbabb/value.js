# π DELTA — S.W5 Lane A (browse / palettes / admin grammar)

Paired archives: `w5a-before/` (61 shots, captured 2026-07-06T02:05Z) →
`w5a-after/` (60 shots, this dir). Same harness (`../pi-w5a.mjs`), same
route-mocked fixtures, §6.1 matrix (mobile-390 / laptop-1024 / wide-1440 ×
light/dark) + the five lane-owned states (browse-loading · browse-error ·
browse-scrolled · admin-down · card-menu). PNGs self-ignore (`.gitignore
*.png`); harness + manifests + this DELTA are the committed record.

**Honesty note on the baseline**: the prior lane session died mid-W5-1 with
the skeleton/AdminListSkeleton partials already in-tree, so `w5a-before`'s
`browse-loading`/admin loading shots show the NEW skeleton grammar, not the
three pre-wave `Loader2` spinners. The pre-wave spinner record lives in the
S audit lane (`audit/lanes/design-browse-palettes.md` §S-10 + its evidence
dir); this pair's before→after carries every OTHER row. The W5-1 state is
additionally pinned by e2e (`browse-loading.spec.ts` — plates present, zero
visible spinners, wall develops to page 1).

## Per-item rows

| Item | State (shots) | before → after |
|---|---|---|
| W5-1 loading grammar | `browse-loading--*` | Developing plates in the ONE muted-ink register (`.skeleton-ink-register`, opaque SHADOW blocks — the `ec1b200` family, both schemes); card-shaped shells match PaletteCard by construction; `loadingMore` appends plates. Admin lists load as row/chip shadows (`admin-*` under their loading window). Zero spinners on any browse surface. |
| W5-2 card species | `browse--*`, `palettes--*` | Saved/browse cards now `bg-card/75 + blur` glass (before: opaque cream punching a hole in the plate); `.dashed-well` ("Start a new palette") joined the cartoon family — dashed edge + chip cartoon rung, recessed-tray inset shadow dead. Three sibling surfaces, one depth grammar. |
| **W5-2 FORENSICS RIDER** | `browse--*` (rest) vs `browse-scrolled--*` | **The hard edge is DEAD at rest, light + dark** — the header paints nothing at scroll-top (before: a static `bg-card/60` olive band terminating in a hard box edge over the field-floor ellipse cores). Under scroll (`browse-scrolled`) the veil earns its surface on the `--pane-scroll` timeline with a 14px feathered bottom — no box edge in either scheme. **[SUPERSEDED at T.W3-4 (owner T-23, t-2010-19, 2026-07-06): the zero-at-rest clause is RETIRED — the rest state now carries a constitutive veil floor (Q9 effect bracket, 27–39% added card material). The FEATHER — the band-killer, this rider's structural half — SURVIVES at every state; the 07-05 no-band ruling and T-23's shaded-at-rest ruling hold simultaneously (t-header-shading §1: a recalibration of an over-rotated cure, not a flip-flop). The "paints nothing at scroll-top" gate line no longer describes the tree; O-11 gates 1–6 are the successor lock.]** |
| W5-3 inputs | `palettes--*`, `admin-audit--*`, `admin-tags--*` | One input species: producer pills everywhere. CurrentPaletteEditor's override list (incl. the suppressed focus ring) dead; admin's 4 square h-7 wells → `<Input size="sm">` pills (the Category placeholder no longer clips); rename bar field on `.input-bar-field`. |
| W5-4 triggers | `browse--*` (card row), `card-menu--*` | The triplicated hand-rolled icon-button recipe → `<Button iconOnly variant="ghost">`; sort menus named; card menu trigger sm square (touch-target cure). |
| W5-5 error ≠ empty | `admin-down--*`, `browse-error--*` | **The P0 silently-costumed state is dead**: backend-down renders "The roster is unreachable." + Fira machine detail + a real Retry Button (before: pixel-identical to "No users found."). Error plates speak the PLAIN register (Q6: no eyebrow, no ghost dots, no second invitation); browse-error dropped "· signal lost ·" + the mis-planted DockIconButton. TRUE-EMPTY keeps the specimen plate with per-context eyebrows (roster clear / queue clear / ledger clear / nothing flagged / no tags minted / none pinned) — the "· EMPTY PLATE ·" twice-on-screen duplication is gone. Eyebrow `/70` double-attenuation dropped (dark-mode legibility). |
| W5-12 admin | `admin-names--mobile-*` (the F-1 gate shot) | Approve/reject FULLY on-card at 390 with the long-string stressor row (before: ~250px off-card, moderation inoperable); raw reka Tabs → glass-ui SegmentedTabs with counts in the tab labels; per-row destructive quieted to ink-at-rest; Dismiss/delete asymmetric; disabled-delete gone; machine strings in Fira; slug pills tail-priority truncate. Fenced by `admin-populated.spec.ts` (390px, `toBeInViewport ratio:1`, approve click-through). |
| Q1 visibility | `card-menu--*` | The owned-card menu carries the designed visibility verb (Publish / Make private) with the CURRENT state annotated small-caps (public/private/offline). |
| Load-more | `browse--*` (below the wall) | "More from the commons" outline affordance under the wall; pages append as developing plates; retires with the cursor (e2e: 50 → 62). |

## W5-7 superfluity rows (before → after)

| Row | before | after |
|---|---|---|
| Rainbow recipe (Q4 EXCISE) | `.pastel-rainbow-text` on My-Palettes heading / dock entry / dialog header (≈1.1–1.5:1 over the light wash) | ink at all 3 sites; recipe deleted at its utils.css root (`palettes--*`, `browse--*` header) |
| "1 colors" | `1 colors` | `1 color` (`palettes-one-color--wide`) |
| Triple count | header Badge + toolbar "3 palettes" + per-card badges | toolbar line excised; header Badge canonical (`palettes--*`) |
| Delete-all | always-red filled circle (highest-chroma element on the pane) | quiet ghost, red on hover/focus, named (`palettes--*`) |
| Twin search placeholders | "Search palettes..." ×2 side-by-side | "Search the commons..." / "Search your palettes..." (`browse--*`) |
| Audit naked count | `12` | `12 entries` (`admin-audit--*`) |
| Names badge sum | pending+approved (matched neither list) | the actionable pending count (`admin-names--*`) |
| Title-during-rename | name rendered twice while renaming | title hidden while the input is open (code row; not in a static shot) |

## Gate verdicts (this lane's slice)

- π paired archives per page: **MET** (this pair + the baseline-honesty note).
- 3 `Loader2` browse sites dead + skeletons at Browse/dialog/admin: **MET** (grep + e2e + shots).
- Zero hand-rolled text `<input>` in Lane A pages: **MET** — repo-wide residuals recorded for their owners: `SlugEditLayer.vue:81` (dock — W7's per §File bounds), `ImageDropZone.vue:23` (hidden `type="file"`, not a text-input site).
- Admin populated-fixture specs green, moderation operable at 390, shift-click gone: **MET** (smoke-admin 15/15).
- W5-7 per-lane rows: **MET** (table above).
- Q1 designed surface + browse pages past 50: **MET** (menu verb + pagination e2e).
