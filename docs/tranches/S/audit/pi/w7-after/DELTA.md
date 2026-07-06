# π DELTA — S.W7 dock + shell (w7-before → w7-after)

Captured with the standing `pi-w7.mjs` harness (same 16-shot matrix, same
commit-adjacent method; after-run against the W7 working tree at the W7-7
commit). PNGs self-ignore per the R/S binary-hygiene convention; regenerate by
re-running the harness at this commit.

## The quadrant (hard-gate row 5) — light/dark × collapsed/expanded

| state | before | after |
|---|---|---|
| collapsed (1440, both schemes) | dot + TRUNCATED "Ho" text painted over the dot + chevron; icon never painted ≥sm | **the wax seal**: live-color WatercolorDot filling the circle, view icon inked in `--seal-ink` over it, hairline `--accent-view` rim; NO text, NO chevron; summary sw/cw 40/40 (was 70/40) |
| expanded + view-select open (1440 + 390, both schemes) | per-view icon vs live-pink ring/Tools (two voices); gray menu dots; rainbow Palettes one-off (already dead pre-W7) | ONE voice: trigger icon + ring speak `--accent-view`; every menu entry's dot + icon speak THEIR OWN gamut-guarded view hue (the color-wheel legend); Tools/Login stay live-accent |
| furniture (1440, both schemes) | "@MBABB" eyebrow'd uppercase; Tools with a chevron that opens nothing | lowercase mono `@mbabb` wordmark; "Tools →" layer-swap affordance (mirrors the in-layer ArrowLeft); glass-ui Buttons (S.W5-4) |

**Handoff review (the row-5 judgment)**: the seal↔trigger chromatic handoff
reads INTENTIONAL — the rim and the ring are the same `--accent-view` carrier
at two weights (60% hairline → full trigger ring), the wax exits with the
collapsed layer under the producer cross-fade, and the live color re-enters
only on Tools/Login chrome. Verified live during W7-1: a view switch while
collapsed turns the rim (pink→blue at gradient) and stamps the new icon while
the wax binding never changes — no element animates live→view-hue.

**W7-3 / W7-6 / W7-7 π-review records (the deliberate §6.1 instrument)**:
- W7-3 (luma truth): the light-scheme quadrant shows cream/pink plates on all
  four light shots — no mud-flip frame in the after-set; the dock band buckets
  consistently with its field (the L4 producer cure verified landed at
  `7549772`; the title-ink residual stays that commit's routed record).
- W7-6: furniture shots confirm the @mbabb case + Tools affordance + no
  boot-grow flicker frame; the investigation records live at
  `audit/w7-furniture-records.md` (PRM producer-gap + idle-nav NO-REPRO +
  interception cured-upstream).
- W7-7: the admin gold voice is the ONE producer metal register in all shots
  that paint it (menu Shield/Admin entry; the seal's gold arm live-verified at
  W7-1 via `#/admin/users`).

## The PRM record (numbers, not pixels)

`prm-stuck-after-tap` before AND after: box 44×64 (light + dark identical) —
the producer defect stands (keyframes.js `springPlay` PRM arm; full
root-cause + one-line cure at `audit/w7-furniture-records.md §1`); the W7
gap-row re-verifies at W8. The demo-side PRM surfaces (seal stamp cross-fade,
segmented control, slot transitions) degrade correctly via the two-tier guard.

## The W7-5 full-swap trace (hard-gate row 4)

Built bundle (`dist/gh-pages` via serve-built), real GPU (Apple M5 Max, ANGLE
Metal), picker→Gradient through the real view-select flow:
**first post-click frame 7.8 ms** (≤100 gate) · **long tasks across the whole
swap window: NONE, max 0 ms** (≤50 gate — frame 2+ counted; the deferred mount
never crossed the threshold). The standing `smoke-perf` view-switch spec
passes on its software-GL arm in the same tree (66.7 ms / 84 ms, under the
documented SOFT_CEIL protocol ceilings).
