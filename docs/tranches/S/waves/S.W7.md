# S.W7 — DOCK + SHELL (Fable; S-5/S-7/S-8 + the accent system)

**Name**: W7 — Dock + shell (the wax seal + one chromatic voice)
**Opens after**: S.W1 + S.W3 (its only dependency edges) — enters at round 4, **after BOTH round-3 lanes (W5 ∥ W6) close: a round barrier, NOT a W5/W6→W7 edge** (`S.md §3.1`, verbatim).
**Spec of record**: `audit/SYNTHESIS.md §3.9` (items W7-1..W7-7 + the verification preamble) · the §7.1 hard-gate map (L4 → W7-3) · Q4 outcome from `S.md §12`.
**Agents**: ≤4 — Fable + frontend-design (seal / mobile-fit / accents+luma / furniture+dedup), π archives light/dark × collapsed/expanded.
**Hard gate**: composite (§Hard gate) — collapsed dock renders dot + inked icon (no text/chevron) at every viewport · 390px overflow trigger reachable · all 9 view accents ≥3:1 post-gamut-map incl. achromatic picks · view-switch beat sequenced · π quadrant confirms the seal↔trigger handoff.
**Status**: PENDING-RATIFICATION.

---

## §Goal criterion

The collapsed dock becomes the wax seal; the mobile dock fits; the shell's light scheme stops
coin-flipping to mud; navigation speaks one gamut-guarded chromatic voice. (SYNTHESIS §3.9
Goal, verbatim.)

## §Completion criterion

The collapsed dock renders dot + inked icon (no text/chevron) at every viewport; the 390px
overflow trigger reachable; all 9 view accents ≥3:1 post-gamut-map incl. achromatic picks;
view-switch beat sequenced (no settle-into-stall); π archives — the light/dark ×
collapsed/expanded quadrant must confirm the W7-1 seal↔trigger chromatic handoff reads
intentional, not jarring. **W7-3/W7-6/W7-7 verify through the π-archive review DELIBERATELY**
(the §6.1 correct-sized instrument for this finding class — a design decision, not an exemption
from close-time verification). (SYNTHESIS §3.9, verbatim.)

---

## §Scope (SYNTHESIS §3.9 item table, transcribed verbatim — anchors + evidence lanes intact)

| # | Item | Anchors | Evidence lane |
|---|---|---|---|
| W7-1 | **The wax seal** (S-8): WatercolorDot in the live color filling the circle + the view icon inked over it (ink/foreground — the dot IS the accent, per the lane's own ruling that `--accent-view` is wrong for the ICON), `vj-morph` keyed by view; label span + chevron DELETED, icon un-gated from `sm:hidden`; gold treatment when `isAdminMode` (the collapsed dock currently carries zero admin identity). **Chromatic reconciliation with W7-4 — the morph clause** (design intent; existing-surface claims live-verified at pass 3 — the seal and the expanded trigger speak different sources, so the collapse/expand morph gets a DESIGNED handoff, never an accidental hue slide): the seal's hairline rim ADOPTS `--accent-view` — the continuity carrier the expanded trigger's ring will ALSO wear under W7-4. What exists TODAY, verified against the live trees (glass-ui HEAD `c03ab942`): the demo sets `--dock-ring` to the LIVE safeAccent on the trigger (`DockViewSelect.vue:55`), but that custom property has NO consumer anywhere in the producer src or dist — the trigger ring is itself to-be-built (the demo seam re-wired to `--accent-view` + the producer consume verified or asked), not an existing surface; the collapsed dot already paints the live color (`Dock.vue:218`), and the collapsed icon currently paints `--accent-view` (`Dock.vue:225`) — the ink-icon ruling above retires that. The DESIGN: the wax (the dot fill) keeps speaking live, the icon moves to ink, and across the `vj-morph` the rim is the continuity carrier — it is designed to grow into the expanded trigger's `--accent-view` ring, one hue held the whole way; the live-color wax exits WITH the seal under the morph's cross-fade and re-appears only where live accent legitimately speaks (Tools/Login chrome, per W7-4's voice map). No single element ever animates live→view-hue. The light/dark × collapsed/expanded π quadrant (Completion) confirms the handoff reads intentional | `Dock.vue:217-230` | design-dock-shell P0-1; design-admin F-5; legacy-sweep-components F5 |
| W7-2 | **Mobile dock fit** (S-7): the main-layer composition cut at <sm (segmented control icon-or-shorter as a root-level variant; a separator pair dropped); the ⋮ overflow trigger (dark toggle + share) back inside the aperture; producer ask — `dock-scroll-x` overflow must fail visibly, never silently clip (letter L13); `clampLabel` RE-ESCALATED as a hard ask (7+ tranches; the Ad-18 workaround must not spread) | `Dock.vue:137-211`; `DockViewSelect.vue:49-51` | design-dock-shell P0-2; glassui-consume-map F1 |
| W7-3 | **Luma truth** (the P0-3 coin flip): producer cure — the backdrop sampler must never resolve luma 0 from an unreadable WebGL canvas (letter L4); demo threads `backgroundCanvas` consistently; NO consumer shim. This finding contaminates S-20 and every dark-legibility report — re-verify those π archives after the cure; an L4 miss in-window → record + re-verify at W8 (the §7.1 hard-gate map) | glass-ui `useGlassBackdropLuminance` | design-dock-shell P0-3 |
| W7-4 | **Gamut-guarded per-view accents** (the eat-your-own-dogfood fix): rotate hue THEN gamut-map to the cusp + re-guard L via the library (`gamut.ts` + `contrast.ts`), written as 9 static tokens per accent change; low-C floor so the axis survives achromatic picks (today mix 2.74:1, generate 2.77:1 fail the 3:1 graphics floor; all 9 rotations collapse to one gray at C≈0); ONE dock voice — trigger speaks `--accent-view`, menu items speak THEIR OWN view hues (the menu becomes the navigation's color-wheel legend), Tools/Login stay live-accent; the rainbow menu one-off dies (with Q4) | `style.css:166-177`; `DockViewSelect.vue:55,87,97` | design-dock-shell P1-4/-5 |
| W7-5 | **View-select sequencing** (S-9's beat half): dock settle + icon morph first (cheap), pane mount deferred a frame behind the travel; the moment must never land into a 254.7ms frame (consumes W3-4's deferral mechanics). Wave-close verification asserts the FULL swap, not only the newly-cheap first frame — the deferred mount's cost lands in frame 2+ and still counts against the §6.2 view-switch long-task ≤50ms row (the ≤100ms first-frame gate re-sequences the beat; it must not be validated by watching only the part that got cheap) | `Dock.vue:84-91`; PaneSlot | design-dock-shell P1-6 |
| W7-6 | **Dock furniture** (S-5 anchor): `@mbabb` onto a non-transforming mono utility; Login/Profile onto glass-ui Button; the Tools chevron-that-isn't-a-dropdown resolved (real popover or layer-swap affordance); Tools load-order flicker cured; the unowned idle `#/gradient→#/browse` navigation investigated + the collapsed-layer pointer-interception fixed (clicks misdirect to navigation today) | `ProfileSection.vue:42-47,84-101`; `Dock.vue:153-175`; design-gradient P1-12 | design-dock-shell P1-8/-9; design-gradient P1-12 |
| W7-7 | **Shell dedup**: `.gold-shimmer-icon` lifted to `utils.css` (byte-identical twins); the 3 gold-shimmer recipes consolidated (letter L15 evaluates ONE producer primitive); dark-scheme aurora inversion closes via W6-2 (cross-ref, not a second fix) | `Dock.vue:238`; god-module §2.1/2.2 | god-module-dry-census |

## §Triumvirate dispatch

Mandatory on:

- **bounds expansion**: any `../glass-ui` write (L4's sampler, L13's overflow, L8's clampLabel,
  L15's shimmer primitive are producer-owned); any `src/` write (W7-4 CONSUMES `gamut.ts` +
  `contrast.ts` — a missing capability is a W1 defect);
- **non-local gate failures**: any 9-accent contrast row unfixable by the low-C floor + cusp
  mapping (the token math premise wrong — re-derive with the library, never hand-tune 9
  literals); the seal↔trigger handoff reading JARRING in the π quadrant (design re-call inside
  the wave — the morph clause is intent, not a fixed recipe); the idle `#/gradient→#/browse`
  navigation proving un-attributable after investigation (record honestly — never a speculative
  patch);
- **loop halt**: the third iteration of any pointer-interception diagnostic loop halts and
  routes.

## §File bounds · disjointness · worktrees

| Unit | Files | Access |
|---|---|---|
| seal (W7-1) | `Dock.vue:217-230` (collapsed layer) | modify |
| mobile fit (W7-2) | `Dock.vue:137-211` · `DockViewSelect.vue:49-51` | modify |
| accents + luma (W7-3, W7-4) | `demo/@/styles/style.css:166-177` · `DockViewSelect.vue:55,87,97` · the accent-token resolver home · `backgroundCanvas` threading sites | modify |
| furniture + dedup (W7-5, W7-6, W7-7) | `Dock.vue:84-91,153-175,238` · `ProfileSection.vue` · `utils.css` · PaneSlot deferral consume | modify |

`Dock.vue` is shared across units — ONE writer for `Dock.vue` (fold the seal/mobile/furniture
hunks into a sequenced queue), or sub-wave sequencing; never parallel writers. Do NOT touch:
`../glass-ui`, `src/`, `api/`, pane content trees (W5's), atmosphere derive (W6's),
`docs/precepts/`.

## §Hard gate (verbatim-faithful to SYNTHESIS §3.9)

1. Collapsed dock renders dot + inked icon (NO text, NO chevron) at every viewport; gold
   identity under `isAdminMode`.
2. The 390px overflow trigger reachable (⋮ inside the aperture; nothing silently clipped).
3. All 9 view accents ≥3:1 post-gamut-map, INCLUDING achromatic picks (the low-C floor holds;
   probe at C≈0); ONE dock voice per the W7-4 map; the rainbow menu one-off dead (Q4).
4. View-switch beat sequenced: first frame ≤100ms AND the FULL swap's long task ≤50ms (frame
   2+ counts — never validated on only the newly-cheap half).
5. π archives light/dark × collapsed/expanded — the quadrant confirms the seal↔trigger
   chromatic handoff reads intentional; W7-3/W7-6/W7-7 verified through the π review
   (deliberate; recorded in the review artefact).
6. Luma truth: `backgroundCanvas` threaded consistently; the L4 producer cure verified, or the
   miss recorded as the producer-gap row (re-verify at W8) — the S-20 π archives re-checked
   after the cure.
7. `npm run lint` 0 · `npm run typecheck` 0 · `npm test` green · e2e 5-project green.

## §No-workaround prohibitions (binding)

- **NO consumer shim for luma** (W7-3, verbatim) — the sampler cure is the producer's (L4).
- **The Ad-18 `clampLabel` workaround must not spread** (W7-2 — L8 is RE-ESCALATED as a hard
  ask; no new demo truncation hacks).
- **No element ever animates live→view-hue** (the W7-1 morph law).
- **No hand-tuned accent literals** — the 9 tokens are library-derived (gamut-map + contrast
  guard), written per accent change.

## §Format + lint cadence

`npm run lint` + `npm run typecheck` + `npm test` after each unit batch and before close;
`npx playwright test` (5-project incl. the frame-budget specs) before close; the accent
contrast probe (9 views × achromatic + chromatic picks) after W7-4 and at close.

## §Verification artefacts (π lane)

Saved at close (cited in `PROGRESS.md`): **π paired archives — light/dark × collapsed/expanded**
(baseline + close + DELTA; the handoff-reads-intentional review note; the W7-3/6/7 π-review
records); the 9-accent contrast table (pre/post gamut-map, incl. C≈0); the full-swap frame
trace (first frame + frame-2+ long tasks); the idle-navigation investigation record; per-unit
commit hashes.

## §Commit plan

W7-4 accents (the token resolver — own commit with body); W7-1 seal (commit with body — the
flagship moment; the morph handoff described in the body); W7-2 mobile fit; W7-5 sequencing
(consumes W3-4 mechanics); W7-6 furniture (row-scoped); W7-7 dedup; π + status commit at close.

## §Dependencies

- **Depends on**: S.W1 (gamut-guarded accents via `gamut.ts`/`contrast.ts`) + S.W3 (W3-4's
  deferral mechanics; W3-7's mechanism decision consumed at W7-4's per-view tokens). Round
  barrier: enters only after W5 ∥ W6 both close.
- **Blocks**: S.W9.

## §BOOKS opened/serviced (books-never-gates)

- **L4 (luma) / L8 (clampLabel) / L13 (dock overflow) / L15 (shimmer primitive)** — letter
  items; L4 carries the hard-gate-map hedge (miss → producer-gap row + W8 re-verify).
- **S-3 letter-rail** — if W4-5 fired it, the dock-fission DECIDE trigger is watched from here
  (the rail evaluate rides W8's walk).

## §Evidence packets consumed

`audit/lanes/design-dock-shell.md` · `audit/lanes/design-admin.md` F-5 ·
`audit/lanes/legacy-sweep-demo-components.md` F5/F6 · `audit/lanes/god-module-dry-census.md`
§2.1/2.2 · `audit/lanes/glassui-consume-map.md` F1 · `audit/lanes/design-gradient.md` P1-12 ·
`letters/GLASSUI-S-ASKS.md` L4/L8/L13/L15.

## §Hand-off

S.W9 closes the tranche on this wave: the π quadrant + accent table feed the close
reconciliation; the producer-gap rows (if any) ride to W8's adopt walk and W9's book
re-verification. The wax-seal grammar + one-voice accent map become standing register law for
successors.
