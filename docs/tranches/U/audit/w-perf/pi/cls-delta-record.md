# U.W-PERF · U-F16 — the CLS cure π/DELTA record (G-PERF-1 + G-PERF-4)

**Instrument** (parity, registry §10 — load-bearing): `@lhci/cli@0.14 collect`,
compressed `staticDistDir=./dist/gh-pages`, Lighthouse mobile default (w412
dpr1.75, 4× CPU, simulated slow-4G), 3 runs, `--settings.maxWaitForLoad=45000`
(the U-F3 eager-WebGL-RAF hang bound — CLS accrues at mount, before the
CPU-quiet window matters, so the bounded run reads CLS cleanly; no hang this
session). **NOT** an uncompressed static serve (the ~2.2× inflation artifact).

## The DELTA (born-RED → GREEN)

| Metric | BEFORE (pre-cure) | AFTER (cured) | Budget | Verdict |
|---|---|---|---|---|
| **CLS** | **0.2146** (0.2146/0.2146/0.2146) | **0.0010** (0.0010/0.0010/0.0010) | ≤ 0.1 | **RED → GREEN** (−99.5%) |
| LCP | 4929 (5018/4929/4926) | 4936 (4942/4936/4926) | ≤ 2500 | RED, FLAT (U-F3 producer-gated escalate — untouched) |
| TBT | 168 | 188 | ≤ 300 | GREEN, FLAT |
| FCP | 4354 | 4354 | — | FLAT |

CLS is deterministic (three identical runs both before and after) — a mobile-only
structural reflow, exactly as registry §10 CONFIRMED+sharpened. LCP/TBT FLAT: the
CLS-only cure moves NO eager payload (chunk-graph-neutral).

## The filmstrip (the shift, per-frame — the machine-precise record)

A purpose-built rAF-sampler probe (mobile 412×915 dpr1.75, 4× CPU + slow-4G, the
Lighthouse regime) captured the plate subtree height every frame from nav start.
The transient is a ~240ms window right after first paint (the reflow is invisible
under fast network — 0 shifts unthrottled; it only manifests when the plate paints
before its sub-resources settle).

**BEFORE — the plate mounts, then SHIFTS:**

```
t=9427ms  card=631  header=188  spectrum=164  figcaption.plate-caption=32   ← first paint (caption WRAPPED 2 lines)
t=9513ms  card=617  header=188  spectrum=164  figcaption.plate-caption=18   ← −14px: caption collapses as Fira Code applies
t=9659ms  card=613  header=184  spectrum=160  figcaption.plate-caption=14   ← settled (1 line) + a ~4px display-font settle
```
layout-shift entry: `Δ=0.1732 @9532ms` — sources `.pane-shell`/`.pane-container`/
`.pane-wrapper--left`, `h:631→617`, `y:179→186` (the whole centred plate re-seats).
Subtree-diff attribution: the −18px traces cleanly to `figure > figcaption.plate-caption`
(32→14) — every ancestor (card, CardContent, figure) inherits exactly that Δ.

**AFTER — the plate mounts at its settled box, NO shift:**

```
layout-shift total (probe): 0.0003 — the plate no longer moves (a lone 15px meter-span settle)
settled plate: y=199 h=613   ← IDENTICAL to the pre-cure settled box (U-F76 reserve-only)
```

## The cure (E-3 architectural — reserve-at-mount, Pole A at the true source)

`.plate-caption { flex-wrap: nowrap; overflow: hidden }` + the shrinkable lens span
(`SpectrumPlateCaption.vue`). The caption is a one-line instrument register BY DESIGN
(probed single-line at 360/390/412/1440 — spanΣ 255px ≤ capW 300–469px). The former
`flex-wrap: wrap` let the wider generic-monospace fallback wrap the caption to two
lines during the boot font transient (self-hosted Fira Code arrives after first
paint); locking it to one line RESERVES the settled box from frame one. **Not a
min-height nudge** — a single-line lock that eliminates the reflow at its source.

## The pole NOT taken (bracket rationale)

- **Pole B — `content-visibility: auto` + `contain-intrinsic-size`** — REJECTED:
  `contain-intrinsic-size` only takes effect while the element's content is being
  SKIPPED (off-screen `content-visibility:auto`). The picker plate is the
  above-the-fold primary content — it always renders, so the intrinsic size is
  ignored and Pole B reserves nothing here. Pole A (reserve the caption's settled
  geometry at the source) is the idiomatic fit for an on-screen element.
- **A plate-level `min-height` reservation** — REJECTED (and E-3-forbidden): the
  plate mounts TALLER (631) and shrinks (613), so a floor cannot prevent the
  shrink; and a fixed plate height would be viewport-brittle and would move the
  settled box. The reflow had to be cured at its SOURCE (the caption wrap), not
  papered over the plate.

## G-PERF-4 — the U-F76 settle-guard (reserve-only, box NOT moved)

- Settled `.pane-shell > :first-child` bounding rect **IDENTICAL** before/after:
  `y=199 h=613`.
- Mount guards **o10/o11/o21 = 16/16 PASS** (post-cure) — zero mount-box regression;
  the settled box U.W-VISUAL/U.W-A11Y handed forward is reserved, never reseated.

## Frames

`cls-{before,after}-final-lhci.jpg` + `cls-{before,after}-film-{mid,end}.jpg` — the
LHCI-instrument settled render (both schemes show the clean single-line caption
"GAMUT LENS — DISPLAY-P3 / SRGB"). The transient 2-line state is a ~90ms window
captured NUMERICALLY above (the per-frame timeline is the precise filmstrip; a
screenshot cannot reliably hit the sub-100ms window — recorded honestly).
