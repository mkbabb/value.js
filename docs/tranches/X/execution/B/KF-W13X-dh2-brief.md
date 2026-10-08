SERVED MODEL: claude-opus-5-5

# KF.W13X.dh2 — design brief: the Sequence view (UIA-KF-098 remaining limb · UIA-KF-317 motion-preview limb)

Authority: KF-W13.md addendum (f) `.dh2` (`:560-569`), the method of addendum (e) `.dh` (`:551-558`); COHESION §0ek (X-DS canon: flatter, refined, no ornament or motion without meaning), §0dm (identity colours, type and motion kept), §0ei (headless real Chrome). Written 2026-10-08 from served frames of the before bytes (kf `debc81bc`, own worktree `keyframes-wt-W13X-dh2`, `vite --force` on :5841, glass `10.1.0`): `docs/tranches/X/keyframes/evidence/W13X/dh2/frames/before-r1-sequence-{1440,1024,390}-{light,dark}.png`.

## What the before frames show

- **1440 / 1024.** The Timeline pane (left rail) is a glass `ConfiguratorLayer` "Stagger": its header carries the re-time Reset (quiet, icon-only) and the collapse chevron; the body is a caption (`5 items · 1940 ms`) over the lanes (master clock scrub, five re-time handles, the playhead). The stage card (right) is the glass `Card`: a `SceneStageHeader` row with the display title "Sequence", one clock readout, and **the Reel button** at the row's end; under it the five lanes (index, rail, traveller).
- **390.** The pane is the bottom sheet (Stagger header in peek). The stage card's header is cramped: **the title's box is squeezed to 33 px while its text is 82 px**, so "Sequence" is painted over "CLOCK" — the Reel button (115 px with its label) takes the room the title needs.
- **Re-time (UIA-KF-317).** With the master parked (at rest or at the end), a keyboard step or a drag on a lane handle moves the handle and the lane's bar in the pane, and the stage traveller does not move at all (`--ball-p` constant over 1.4 s): the new offset has no motion until Play. The handle's active state already landed (`9769b10f`, `data-dragging`); only the preview limb is open.

## The hierarchy

| view | primary | secondary | tertiary |
|---|---|---|---|
| Stage card | the five lanes and their travellers (the subject) — glass `Card`, the lanes are the scene's own drawing | the stage header: title (display register) and the one clock readout — `SceneStageHeader` (the existing seat) | the lane index (`text-mono-caption`) |
| Timeline pane | the lanes with their re-time handles and the clock scrub (the editor) — `SequenceLanes` inside glass `ConfiguratorLayer` | the layer's header verbs: **Reel** and **Reset**, one register (glass `Button` `emphasis="quiet"` `size="sm"` `icon-only`) in the layer's `#actions` slot | the `items · ms` caption (`text-caption`, muted) |

Rulings this brief makes:

1. **The reel leaves the stage (UIA-KF-098's remaining limb).** The audit's fix: "Move the reel into the transport or controls … the card becomes a pure stage". The reel is a verb on the sequence's items, the same family as Reset, so it joins Reset in the Stagger layer's `#actions` — a glass `Button` (quiet, `sm`, icon-only with `aria-label` and `title`, the Clapperboard glyph), keeping its `loading` contract (`aria-busy`, the busy glyph, suppressed activation) as its running state. No new wrapper: the pane's source contract gains the two reel members (`playReel`, `isReeling`) beside `reset`. The hidden typed "reel" trigger stays as it is. The stage header keeps the title and the one readout; its `#aside` slot is left empty.
2. **The retimed row moves (UIA-KF-317's preview limb).** When a re-time settles (a keyboard step, or a drag released), the retimed row's own traveller runs its new run once on the stage: from its master pose back to the origin, across its run on the row's own glide curve, and back to its master pose. It uses the engine's public keyframes path, as the reel does (no hand-rolled clock), so the stage ends exactly where the master clock puts it. It is feedback motion with meaning (§0ek), and it declines under `prefers-reduced-motion`, as the reel does. Only the retimed row moves; any scrub, play, reset, reel or newer re-time cancels it.
3. **Kept (§0dm):** the lane tones, the display title face, the reel's overshoot wave, the row glide. No colour, type or motion is removed.

## Predicates (served, headless real Chrome; `dh2/dh2.mjs`)

/#/sequence at 1440×900, 1024×768 and 390×844, light and dark (6 cells × 5 predicates = 30 readings):

- **D1 pure stage:** `.seq-target` holds 0 visible controls (`button`, `[role=button]`, `[role=slider]`).
- **D2 reel homed:** exactly one visible Reel control in the document; it is a sibling of the pane's Reset in the same header slot, the same height (±1 px), centred on the same line (±2 px), outside the stage card, and hit-tests as itself.
- **D3 one-line header:** the stage header's children share one line (centres ±4 px); no text run in it is ellipsized or overflows its own box; no two text runs overlap.
- **D4 preview on a key re-time:** master parked, row 3's handle takes ArrowRight; row 3's stage traveller reads ≥ 5 distinct `--ball-p` values over 1.4 s and ends within 0.02 of its pose before the step; row 1's traveller does not move.
- **D5 preview on release:** row 4's handle is dragged 24 px and released; row 4's traveller reads ≥ 5 distinct values over 1.4 s and ends within 0.02 of its pose at release.

BEFORE (kf `debc81bc`): ⟨`node dh2.mjs http://localhost:5841/ before-r1 frames`⟩ and `before-r2` → **TOTAL 4/30 GREEN** both runs (D3 GREEN at 1440/1024 ×4, RED at 390 ×2; D1, D2, D4, D5 RED at all 6 cells). The bar: 30/30 GREEN ×2 on dev and ×2 on the gh-pages build.

## Addendum (same seat, same day): the before bytes moved under the seat

X-DS pass 7 committed kf `7ea959f0` (12:30) while this unit was in flight. It replaced the stage header's glass `Metric` with the `.stage-readout` anatomy and so cured the 390 title/readout overlap on its own. The before reading was re-taken at the new head and is the one of record: ⟨`node dh2.mjs http://localhost:5841/ before-7ea-r{1,2}`⟩ → **TOTAL 6/30 GREEN** on both runs (D3 GREEN at all 6 cells; D1, D2, D4 and D5 RED at all 6). The `debc81bc` reading above (4/30) is kept as the first reading. The cure was re-based onto `7ea959f0` and the after readings are taken on those bytes. The X-DS hunks were never staged or edited by this seat.
