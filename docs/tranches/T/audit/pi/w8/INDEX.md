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
