# G-ADOPT-2 / G-ADOPT-3 — born-RED evidence + π/DELTA obligations (U.W-ADOPT Lane B)

**Lane**: U.W-ADOPT Lane B (producer-visual bi-acceptance). **Gates**: G-ADOPT-2 (U-F4 PRM-dock) +
G-ADOPT-3 (U-F13-producer edge-clip). **Both born-RED, producer-gated** — the cure is glass-ui-side;
value.js has NO source edit to make (E-3). Both flip ONLY at the owner-gated glass-ui 5.0.0 cut.

**Probe-parsimony decision (owner edict — context economy):** the RED of both gates is established by
(a) **source-mechanism verification** in BOTH the pinned preview `2e559f7a` AND the real glass-ui HEAD
`8b0f9acc` (the `file:` dep the local demo resolves — verified live this lane) + (b) the **registry
R-1 LIVE-PROBED + §10 CONFIRMED** state. A fresh live re-probe on port 8910 would (1) require booting
the full dev stack, (2) re-confirm a CONFIRMED RED, (3) that value.js CANNOT flip (producer-only), and
(4) whose binding attestation is OWNER (U-F54), not headless. The headless width+reachability re-probe
remains AVAILABLE (headless-trustworthy per R-1) and its GREEN execution is booked to the fired cut —
but ARMING a born-RED does not require re-running a CONFIRMED, uncurable-by-value.js RED. No server was
running on :8910; the stack was not booted.

---

## G-ADOPT-2 — U-F4 PRM-dock BI-acceptance · **born-RED**

**Gate definition:** under `prefers-reduced-motion: reduce`, drive the demo dock across views (port
8910); assert **dock width > 44px AND ≥ 19/20 nav+action controls reachable**.

**RED evidence (born-RED NOW):**
- **Source-mechanism (verified live, cite by BLOCK):** `../glass-ui` `src/styles/dock/morph.css` —
  the `[data-morphing]:not([data-pane-swap])` arm derives `--dock-expand-t: var(--dock-morph-t)` for
  `.glass-dock.expanded` / `.glass-dock.always-expanded`. Under PRM the spring settles instantly but
  `[data-morphing]` latches ON with `--dock-morph-t` frozen at **0**, so `--dock-expand-t` resolves 0 →
  the **collapsed 44px pill on every desktop view**. Verified present at BOTH glass-ui HEAD `8b0f9acc`
  AND the pinned preview `2e559f7a` (the two-selector block at :70–73 in both; the operative static
  endpoint `--dock-expand-t: 1` @ :49 is OVERRIDDEN by the frozen-clock arm). Anchor-drift record:
  `../producer-bi/relay-spec.md §The verified morph.css ANCHOR DRIFT`.
- **Registry (CONFIRMED):** §1 LIVE-PROBED (empty 44px pill, 19/20 nav+action controls clipped, NO
  hover/click/keyboard recovery — width stays 44px through all interactions); §10 R-1 SHARPENED, A
  stands (behavior CONFIRMED, ships in dist; mechanism corrected to PRODUCER-ONLY, `overture.css` a RED
  HERRING, demo EXONERATED); §23 R-1 SOUND. Desktop-viewport-specific (`always-expanded=false`; mobile
  degrades to 244px, not empty).
- **Control-count ground for the DELTA:** the demo dock renders ~20 nav+action controls when expanded
  (registry: 19/20 clipped under the defect); the demo dock family (`DockIconButton` / `DockTabButton`
  / `DockSelectTrigger` / `DockDropdownTrigger`) is the referent → the 1/20 → 20/20 reachable-control
  DELTA is grounded.

**Trustworthiness split (U-F54):**
- The **width + reachability** probe (width > 44px; ≥ 19/20 reachable) is **HEADLESS-TRUSTWORTHY**
  (R-1 retired the confound → producer-only; a headless PRM emulation reads the 44px-vs-expanded box
  honestly). This half may flip GREEN on a headless runner at the cut.
- The **visual "reads-correct-when-expanded"** confirmation is **OWNER-ATTESTED** (π-frame; the
  registry logged a headless false-red here — the `overture.css` red herring). Filed as annex row
  **OA-B1** (`../producer-bi/uf54-annex-rows.md`).

**Flip condition:** PRODUCER-ONLY. Flips only when glass-ui ships `prm-dock-arm-static-expanded-fallback`
at 5.0.0 (relay-spec §Constraint #1). value.js has NO cure to make (E-3 forbids a demo override).

**π/DELTA obligation:**

| π-frame (before → after) | DELTA measurement | Attestation |
|---|---|---|
| PRM dock = 44px empty pill, 1/20 controls reachable → PRM dock expanded, controls reachable + reads-correct | dock-width Δ (44px → expanded-width px) + reachable-control Δ (1/20 → 20/20) | **owner-attested** (visual "reads-correct" half) + headless-trustworthy width probe (post-R-1) |

---

## G-ADOPT-3 — U-F13-producer edge-clip · **born-RED against a real-GPU/owner frame + RELAY**

**Gate definition:** on a **REAL-GPU or OWNER-attested frame** (NEVER headless — U-F54; the PRM
confound already demonstrated a false-red here), assert EDGE-item dock focus rings render **un-shaved
(≡ interior-item ring pixel-coverage)**.

**RED evidence (born-RED NOW):**
- **Source-mechanism (verified live, cite by BLOCK):** `../glass-ui` `src/styles/dock/overflow.css` —
  the `mask-image: linear-gradient(...)` block reads the `--fade-start` / `--fade-end` customs (the
  `gl-fade-start-in` / `gl-fade-end-out` keyframes, the `<FadingScroll>` mask family). When neither
  fade is active, the 0px-fade transparent stop (`black var(--fade-start, 0px)` at BOTH inline edges)
  antialiases the outermost pixel column → shaves flush/edge items' focus-ring arcs. Verified present
  at BOTH glass-ui HEAD `8b0f9acc` AND the pinned preview `2e559f7a`. The `overflow-clip-margin:
  var(--dock-control-safe-inset)` (the 80%-of-cell plate inset) is a PARTIAL mitigation that does NOT
  close the mask edge-antialias.
- **Registry (CONFIRMED, milder read):** §2 rows T-36 · T-52 (producer clip/fade-mask shaves EDGE
  items' rings only — interior rings full); §21 (the milder read after the U-F4 PRM confound was
  retired — the earlier total-shave read WAS that confound). The focus ring is the U-F25 focus-
  affordance a11y class (WCAG 2.4.7).

**Trustworthiness (U-F54):** NO headless-trustworthy half. The edge-ring pixel-coverage read is
**real-GPU / owner ONLY** — the PRM confound already produced a false-red on this exact surface. This
gate is ARMED as an OWNER-ATTEST annex row (**OA-B2**, `../producer-bi/uf54-annex-rows.md`) — it is
NOT headless-asserted, and NO headless green is claimed.

**Flip condition:** PRODUCER-ONLY, BI-acceptance, RELAYED. Flips only when glass-ui ships
`dock-edge-clip-fade-mask-focus-ring-honesty` at 5.0.0 (relay-spec §Constraint #2). The demo Tools
box-model half is NOT this gate (CENSUS-GREEN, interior ring → U.W-VISUAL). value.js has NO cure (E-3).

**π/DELTA obligation:**

| π-frame (before → after) | DELTA measurement | Attestation |
|---|---|---|
| edge-item focus ring shaved by clip/fade-mask → edge ring un-shaved ≡ interior ring | edge-ring pixel-coverage Δ (clipped arc → full arc, ≡ interior-item coverage) | **real-GPU / owner-attested frame** (U-F54 annex — NEVER headless) |

---

## §Summary

- **No VISUAL claim in this lane is gated by a headless assertion.** The two visual gates (U-F4 reads-
  correct, U-F13-producer edge-ring) ride the U-F54 owner-attested annex (OA-B1, OA-B2).
- **Both gates are ARMED born-RED**, independent of the cut (PP-16). They flip only at the producer
  glass-ui 5.0.0 cut; value.js has no source edit.
- **v5 trigger UNFIRED** at this filing (`git -C ../glass-ui tag --list 'v5*'` EMPTY; HEAD `8b0f9acc`
  branch `tranche/BI`). If v5 tags mid-lane, this lane REPORTS — it does not act.
