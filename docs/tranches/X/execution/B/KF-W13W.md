SERVED MODEL: claude-opus-5-5

# X.KF.W13W — execution record (the tracking ball rides the curve + OA-57/58/61/64/66/68)

**Spec of record**: `docs/tranches/X/keyframes/waves/KF-W13.md` — `## KF.W13W — the tracking ball rides the curve` (`:445-469`, COHESION §0co) · `## KF.W13W — ADDENDUM 2026-09-24 (COHESION §0cq)` (`:471-499`) · `## ADDENDUM 2026-09-24 — OA-66/OA-67 (COHESION §0cs)` (`:501-502`) · `## ADDENDUM 2026-09-24 — OA-68 (COHESION §0ct)` (`:504-505`). **Authority**: the owner, verbatim (2026-09-24): *"with all the easing curves and simulators, the tracking ball must be on the curve itself--mark and ecoute-moi"*; frame `keyframes/evidence/W13U/owner-2026-09-24-ball-on-curve.png` (and `owner-2026-09-24-easing-picker.png`, `audit/owner-2026-09-24-collapsed-dock.png`). **Rulings cited (never re-opened)**: §0co (OA-56, the wave minted) · §0cq (OA-57/58/61/64 join; OA-63 every glass half relayed — O-65 DOCK-COLLAPSED-FORM) · §0cr (O-65 registered) · §0cs (O-66 GLASS-SELECT-GREY, consumer call sites only) · §0ct (O-67 SIDE-DOCK-EDGE, consumer clip only) · §0cw (Track B order: KF.W13V → KF.W13W → KF.W13X) · §0bt (ADJACENT-LINE RULE) · §0j (begin-word; publish/push authorized). **Model**: Opus 5.5, every seat (spec line `:447`; owner 2026-09-23 Opus-only).

## Open

**Date**: 2026-09-24 (sitting of record 2026-09-17, the owner's begin-word, COHESION §0j). Seat 0, Track B, `claude-opus-5-5`.

**Mode**: FRESH OPEN — ⟨`grep -n "^| KF.W13W" LEDGER.md`⟩ → `QUEUED 2026-09-24 (after KF.W13V)`; ⟨`ls execution/B/ | grep W13W`⟩ → none. No unit commits exist.

**Crash-recovery sweep** — ⟨`git -C keyframes.js status --porcelain`⟩ → 2 untracked value.js inbound mail packets (`docs/tranches/V/coordination/VALUEJS-INBOUND-2026-07-24-*`, `-2026-07-27-*`; standing, outside every writable set), **0 paths under `demo/**` or `test/demo/**`**. keyframes HEAD = origin/master = `a939e7d6` (KF.W13V `.s2`). value.js: 0 dirty paths under `execution/B/KF-W13W*` or `keyframes/evidence/W13W/**`; `scripts/dev/dev.sh` untouched.

**Preconditions ("Opens after: KF.W13V", `:447`)**:
- ⟨`grep -n "^| KF.W13V" LEDGER.md`⟩ → `:61` **CLOSED 2026-09-17 (honest-RED: TILE-PRIMITIVE · B7 SPECULAR-REST · SHEET-POSITION)** ⟵ RESUME 2 CHECK 1 CONFORMANT-HONEST-RED (event log `:777`). MET.
- The spec's named artefacts: the owner frames ⟨`ls keyframes/evidence/W13U/ | grep 2026-09-24`⟩ → `owner-2026-09-24-ball-on-curve.png` · `owner-2026-09-24-easing-picker.png` (both present). MET.
- Track B order §0cw: KF.W13V (`.s2` kf `a939e7d6` + close) → **KF.W13W** → KF.W13X. MET.

**E13 Step-0 mail sweep** — ⟨`ls -dt ../glass-ui/docs/tranches/*/ | head -2`⟩ → `BL/` newest, then `BK/` (BL has no `coordination/`; BK/coordination remains glass's mail path). ⟨`find <path> -maxdepth 1 -type f -newer INBOX.md`⟩ over value V/ · V/coordination · glass BK/coordination · glass BL · keyframes V/coordination · atlas P/coordination → **1 file**: `glass-ui/docs/tranches/BL/FORMATION-PROGRESS.md` (glass's internal formation cursor, `2b72324a` "D2-B ADVANCE conditional…"; not a letter, not addressed to value.js). **0 unrowed addressed to value.js · 0 UNREAD in scope.** Sweep line appended to `INBOX.md`.

## Baseline

The spec authors no literal §Gates commands for KF.W13W; its gates are stated as laws (`:449-455`, `:467`, `:486`, `:489`, `:495`, `:497`). The BEFORE baseline banks (a) the repo gates every unit must hold, (b) one served-page reading of the headline site under the `.v` law, and (c) static census proxies for each unit. The full per-site served falsifier is `.c`'s act (it must read RED at these pre-cure bytes on every census site before `.b` lands).

| gate | command (read-only, keyframes `a939e7d6`) | run 1 | run 2 | verdict |
|---|---|---|---|---|
| repo: typecheck + structure | `npm run check` | EXIT 0 (vue-tsc ×2 + proof:structure PASS 0 violations) | EXIT 0 | GREEN (standing) |
| repo: demo unit tests | `npm run test:demo` | 77/77 files · 565/565 · EXIT 0 | run 2: 3 files / 2 tests FAILED + 4 skipped, EXIT 1 (timeouts under 4-track host load: `transport-icon-spin` hook 10 s, `hero-wave-pause` 5 s, `typing-dots-engine-seam` no inline opacity); run 3: 77/77 · 565/565 · EXIT 0 | GREEN (standing; run-2 load flake banked, not a W13W row) |
| G-W13W-v (headline site: easing gallery tiles, 1440, light, headed) | `node evidence/W13W/open/probe-gallery-ball-on-curve.mjs` (ball centre vs nearest point of the tile's `path`, 401-point polyline in screen px, 12 samples × every tile) | 28 tiles · 336 samples · **336 over 1.5 px** · max 17.6 px | — | **RED** (born-RED as the law requires) |
| G-W13W-b proxy (a rail under a ball) | `grep -rnE 'class="[^"]*(progress-rail\|tile-rail\|\brail\b)' demo --include='*.vue'` | 12 rail sites | — | RED (rails remain under balls) |
| G-W13W-e proxy (eye toggles) | `grep -rnE '\bEye(Off)?\b' demo --include='*.vue' --include='*.ts'` | 3 distinct sites (`StartingStyleTarget.vue:67` · `SpringScene.vue:228` · `PlaybackRibbon.vue:127`) | — | RED (more than one component) |

⟨`node probe-gallery-ball-on-curve.mjs before-easing-gallery-1440-light.png`⟩ →
```
{"tiles":28,"samples":336,"over1_5px":336,"maxDistPx":17.6,"firstRow":[14.6,15,16.5,13,16.4,16.5,13.3,16.4,16.3,12.4,16.4,16.4,10.2,16.6,16.3,16.5,4.8,16.6,16.5,2.1,16.5,17.3,6.1,17.6,3.9,8.3,7,16.6]}
```
Frame: `keyframes/evidence/W13W/open/before-easing-gallery-1440-light.png`. The few near-zero distances (2.1, 3.9, 4.8 px) are tiles whose curve happens to cross mid-height at that instant — the rail geometry, not the law.

⟨ball / rail census proxy⟩ → rails: `EasingMini.vue:60` · `EasingTarget.vue:143` · `SequenceMini.vue:72` · `SpringTarget.vue:109,135,196,241` · `SequenceTarget.vue:128` · `SequenceLanes.vue:28,47` · `AnimationVisualizer.vue:31` · `PlaybackRibbon.vue:24`; balls: `EasingMini.vue:62` · `EasingTarget.vue:146` · `SequenceMini.vue:81` · `SequenceTarget.vue:137` · `SpringTarget.vue:161,199,244` · `SpringMini.vue:81` · `SequenceLanes.vue:29`. (Proxy only — `.c` rules which are curve/trace sites under the law and which are time rails that stay subordinate, `:455`.)

⟨picker sites⟩ → `EasingTarget.vue` (gallery `specimen-tile`) · `EasingSidebar.vue` · `TimingFunctionPanel.vue` + `useEasingPickerSeat.ts` (Controls-pane picker, via `ChannelOptions.vue`).

## Unit plan

**Order** (spec `:456` "Units, strictly serial" · `:477` "New units, which run after `.v` and serially"; orchestrator note §0cq): `.c` → `.b` → `.v` → `.p` → `.e` → `.m` → `.d`. Seven groups of one; at most one unit live; no two units ever share a live modify path. ESCALATED units do not halt the wave. Every seat Opus 5.5 (`:447`).

**Writable set, every unit** (spec **Bounds** `:468`): keyframes.js `demo/**` (modify) · `test/demo/**` (additive) · value.js `docs/tranches/X/execution/B/KF-W13W.md` (the unit's receipt, appended under `## Unit receipts`) · value.js `docs/tranches/X/keyframes/evidence/W13W/<unit>/**`. ADJACENT-LINE RULE (§0bt) applies inside keyframes.js only. **Never**: glass-ui (O-65 · O-66 · O-67 relay only; OA-63), package pins, `src/**` of keyframes, `scripts/dev/dev.sh`.

**Locks binding every unit**: one shared curve-to-point primitive (`.b`) — no second geometry, no separate rail, no mid-height track (`:454`); a rail stays only as a subordinate progress cue, never under the ball (`:455`); no copied producer selector, no local copy of a glass surface (§0cq OA-63, §0cr); no test.skip / allowlist / try-catch mask; pathspec commits with the `Claude-Session` trailer; `npm run check` EXIT 0 + `npm run test:demo` GREEN after each unit's last commit; `git diff --check` per commit; kf pushes to origin/master (authorized §0j).

| # | unit | model | spec sections | gates it turns |
|---|---|---|---|---|
| 1 | `KF.W13W.c` census | opus | `:449-462` (the law + `.c`) | G-W13W-c: census table (every curve/trace site with a moving marker, grep + served) · the served falsifier authored and RED ×2 at `a939e7d6` bytes on EVERY site |
| 2 | `KF.W13W.b` the cure at the root | opus | `:449-455`, `:463` | G-W13W-b: every census site on the one primitive; ball from the same function as the stroke; overshoot beyond [0,1] followed; steps jump; PRM = ball on curve at rest; 0 balls on a rail |
| 3 | `KF.W13W.v` served verification | opus | `:464-467` | G-W13W-v: headed, 1440 + 390, light + dark, ≥12 samples/site, every sample ≤1.5 CSS px, ×2; RED-before (from `.c`) + GREEN-after frames |
| 4 | `KF.W13W.p` easing picker hierarchy (OA-58) | opus | `:478-484`; `:501-502` (O-66) | G-W13W-p: one picker component at all three sites · one glass segmented/tabs filter · divider · family headers on "All" · one tile idiom on `--radius-field`, name untruncated · selection by ink + ring · GLASS-SELECT-GREY consumer call sites cured, honest-RED otherwise |
| 5 | `KF.W13W.e` one floating eye toggle (OA-61) | opus | `:485-490` | G-W13W-e: census → one component, every duplicate retired · top-right, absolutely positioned · animated cross-fade+scale on the engine's easing, PRM instant · toggling moves every other box by 0 px, headed, 1440 + 390 |
| 6 | `KF.W13W.m` keyframes mobile (OA-64) | opus | `:491-496` | G-W13W-m: controls + panes at 390 and 430, portrait + landscape, every scene, both themes: inline centre within 1 px of viewport centre · edges on the gutter · 0 horizontal overflow · KF.W13R Sheet/Drawer detents hold |
| 7 | `KF.W13W.d` collapsed dock, consumer half (OA-57) | opus | `:497-499`; `:504-505` (O-67) | G-W13W-d: served collapsed state read, consumer cause cured · honest-RED DOCK-COLLAPSED-FORM (O-65) · side/canvas docks read both themes, consumer clip cured, honest-RED SIDE-DOCK-EDGE (O-67) |

### Briefs (each ≤700 chars)

- **`.c`** — Census every plot with a moving marker: easing gallery tiles + scene plot (`EasingTarget.vue`), picker trigger + dropdown previews (§0bi OA-31; `TimingFunctionPanel.vue`/`useEasingPickerSeat.ts`), Spring trace/`linear()`/sweep (`SpringTarget.vue`, `SpringTrace.vue`, `useSweepScene.ts`), Sequence rails (`SequenceTarget.vue`, `SequenceLanes.vue`), dock minis (`EasingMini`/`SpringMini`/`SequenceMini`), plus grep + served finds. Rule each: curve/trace (law) vs time rail (subordinate). Author ONE served falsifier (ball centre vs rendered path, ≥12 samples/site, 1.5 px) in `evidence/W13W/c/`; run it RED ×2 on EVERY site at `a939e7d6`; frames before. Test-only kf bytes, if any. Receipt.
- **`.b`** — Build ONE shared curve-to-point primitive/composable in `demo/**` (the function that yields the path `d` also yields `(x(p), y(p))` in the plot's own coordinates). Move every `.c` site onto it; delete each mid-height rail under a ball and its CSS (a rail survives only as a subordinate cue, never under the ball). Overshoot (back/elastic/spring) followed outside [0,1] within plot bounds; steps jump; simulators ride the trace at sim time; PRM = ball on curve at rest. Unit tests in `test/demo/` (born-RED then GREEN). One commit per meaning; check + test:demo ×2; push.
- **`.v`** — Re-run `.c`'s falsifier on the served page (dev, headed; gh-pages build if the record requires), 1440 + 390, light + dark, every census site, ≥12 samples/cycle, ×2: every sample ≤1.5 CSS px. Cite `.c`'s RED-before; capture after frames to `evidence/W13W/v/`. A RED site returns to `.b`'s primitive at cause (no per-site offset). Verification seat: kf bytes only if a site fails and the cure is at the primitive. Receipt.
- **`.p`** — Census every easing picker (gallery, dropdown, Controls-pane picker) → ONE component. Hierarchy: family filter as one glass segmented/Tabs control (consume glass's exported seam; no loose stadium pills); divider; per-family sections with type-scale headers when "All"; one tile idiom on `--radius-field` (curve + ball on the curve from `.b`, name beneath, never truncated); selected = ink + ring, not a grey plate. Check Select call sites for a consumer grey class/dead `variant` (§0cs) — cure locally; else honest-RED GLASS-SELECT-GREY. Served frames before/after 1440 + 390; tests; check + test:demo ×2.
- **`.e`** — Census every hide/show preview control (today `StartingStyleTarget.vue:67`, `SpringScene.vue:228`, `PlaybackRibbon.vue:127` + served). Build ONE shared eye/eye-off toggle, mounted in every view's top-right, absolutely positioned (out of flow); show/hide animated by cross-fade + scale on the keyframes engine's own easing; PRM toggles instantly. Retire every duplicate onto it (KISS/DRY). Gate: served, headed, 1440 + 390 — toggling moves every other element's box by 0 px (rect diff over all visible elements), ×2. Tests; frames; check + test:demo ×2.
- **`.m`** — Served census at 390×844, 844×390, 430×932, 932×430, every scene, light + dark: controls and panes' inline centre within 1 px of the viewport centre, edges on the page gutter, `scrollWidth` ≤ `clientWidth`, KF.W13R Sheet/Drawer detents intact. Frames before (RED) → cure at the layout root in `demo/**` (no per-scene offsets, no glass override) → after ×2. Tests where a unit seam exists; check + test:demo ×2.
- **`.d`** — Read the collapsed dock on the served page (1440 + 390, both themes; frame `audit/owner-2026-09-24-collapsed-dock.png`: progress track + count "1" spill, × loose). Cure any consumer cause in keyframes (slot content, sizing, ancestor clip) via glass's exported seams; the plate-wrap is O-65 — record honest-RED DOCK-COLLAPSED-FORM. Read every side/canvas dock both themes (§0ct): cure only a consumer clip/crowding (e.g. a missing gutter); record honest-RED SIDE-DOCK-EDGE (O-67). Never override the dock. Frames; check + test:demo ×2.

## Unit receipts

