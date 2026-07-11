# pi/w8 — the T.W8 probe-artefact home (pass 2: boot/atmosphere/blob · config population · motion)

Probe instruments + log are COMMITTED; the PNG frame series are gitignored-by-class on-disk
(the standing owner-screenshots convention — the package assembler and the owner read them
from disk). Produced by `w8-pass2-probe.mjs` + `w8-pass2-probe-resume.mjs` (headed real GPU,
ANGLE Metal / M5 Max; lane ports 8610/8611) at head `5e4f1f6`, 2026-07-11.

| Path | What it is |
|---|---|
| `boot/{cold,returning}-{light,dark}/f<offset>ms.png` | **THE BOOT SCREENCAST** (the W8 package deliverable) — compositor-true CDP frame series on the BUILT bundle; offsets sit on the page's `timeOrigin` clock, so frames pair 1:1 with the overture beat marks in the log |
| `motion/<scheme>-<hop>/f<offset>ms.png` | **THE T-48 MID-FLIGHT CAPTURES** — 8 real pane swaps (Home→Gradient→Mix→Browse→Home × both schemes); the freeze pair of record is `light-browse-to-home/f00648ms.png` → `f01004ms.png` (a 356ms held pose) |
| `blob/seat-{light,dark}-dpr2.png` | The crisp-bead seat crops (the R7+C-3 bracket's eye-material, post-R2) |
| `config/*.png` | ConfigSliderPane population shots — both views × both schemes @1440, the 390 pair, and the mobile pane-cycle proof (`blob-light-390-cycled.png`) |
| `field/neutral-{light,dark}.png` | The R3 whisper-floor frames (neutral seed, settled field) |
| `w8-pass2-probe-log.txt` | The log of record — beat marks, settle reads, O-26 headed numbers, blob backing/park/hover, config ink/track/rung numbers, motion pacing + trace |

The pass record these feed: `../../w8-certification/passes/boot-atmosphere-blob.p1.md`.

## Pass 7 (gradient — rail + envelope plate)

Produced by `w8-pass7-probe.mjs` (headed real GPU; lane ports 8660/8661) at head
`71ae027` (product tree ≡ `5e4f1f6`), 2026-07-11. Log of record: `w8-pass7-probe-log.txt`
(rail/rung/plate geometry, O-19 composited netting vs floors, usability drive incl. the
deselect probe, BUILT terminal truth).

| Path | What it is |
|---|---|
| `gradient/dev-{1440,768,390}-{light,dark}-{full,instrument}.png` | The 6-cell sweep — full frames + instrument crops (plate + rail + rung row) |
| `gradient/dev-1440-{light,dark}-{hover-ghost,three-stops,slice-pinned,conic-tile}.png` | The usability-drive states (add ghost · 3-stop + remove chip · pinned slice · conic tile) |
| `gradient/built-1440-{light,dark}-full.png` | The BUILT-bundle terminal-truth frames |

The pass record these feed: `../../w8-certification/passes/gradient.p1.md`.

## Pass 9 (dock + nav + menus)

Produced by `dock/w8-dock-probe{,-leg2,-leg3,-leg3b}.mjs` (headed real GPU; lane ports
8680/8681) at head `571f8d0` (product tree ≡ `5e4f1f6`), 2026-07-11. Log of record:
`dock/w8-dock-probe-log.txt` (Tools box-model, seal wax↔field OKLab/WCAG at two seeds, ramp
token trace + label pixel truth, T-52 clip forensic, T-57 band arithmetic, tabs geometry,
menu censuses).

| Path | What it is |
|---|---|
| `dock/{1440,768,390}-{light,dark}-dock-rest.png` | The 6-cell dock-at-rest matrix |
| `dock/1440-{light,dark}-{view-menu,letterforms-menu,preset-menu,harmony-menu,mbabb-menu}.png` + `{768,390}-*-view-menu.png` + `390-*-mobile-menu.png` | The menu-voice census frames (T-10/T-40/T-17) |
| `dock/1440-{light,dark}-{seal-zoom,seal-pale-zoom,dock-collapsed}.png` | The T-37 seal figure/ground pairs (owner seed + adversarial pale) |
| `dock/1440-{light,dark}-t52-{gradient-trigger,trigger-hover,trigger-focus}-zoom.png` | The T-52 flush-clip forensic states |
| `dock/1440-{light,dark}-{tools-hover-zoom,actionbar-layer,login-zoom}.png` · `{768,390}-*-tabs-zoom.png` | T-36/T-29 whole-paint · T-57 layer states · Q10 Login · T-20 tabs |

The pass record these feed: `../../w8-certification/passes/dock-nav-menus.p1.md`.
