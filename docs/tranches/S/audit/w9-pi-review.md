# S.W9 — π tranche-level reconciliation (the non-authoring review)

**Reviewer**: independent close reviewer — authored NOTHING in tranche S's waves (the
§3.11 / oracle-slate requirement: "the π matrix reviewed by a NON-authoring agent").
**Date**: 2026-07-06. **Reviewed at**: `tranche-q` @ `fe935c0` (the W9 probes+sweeps
commit; working tree clean at capture).
**Scope**: the standing π matrix end-to-end — the seven wave archives
`audit/pi/{w3,w4,w5a,w5b,w5c,w6,w7}-{before,after}/` (manifests + DELTAs + committed
webm) — cross-checked against the LIVE tree at close by regenerating spot-check shots
through the **committed harnesses themselves**, unmodified.

**Method**: a disposable `vite --port 4991 --strictPort` dev server
(`VITE_API_URL=http://localhost:59999`, the unreachable-loopback convention — the
demo's origin-honest `unavailable` state; the owner's :9000 never touched). All six
harnesses re-run cold against it: `pi-w7` (16 shots), `pi-capture` (34), `pi-baseline`
(4 quadrants: 13-frame cold cadences + live + blob + webm), `pi-motion` (3 families,
40 frames + 3 videos), `pi-w5c` (20 + webm), `pi-w5b` (36 + mix-motion), `pi-w5a`
(60, route-mocked) — **167 static shots + 5 videos, every harness exit-clean**. One
anomaly (§4) was counter-probed on the built `gh-pages` bundle (static :4186 — the
w5b/w5c archives' own serve convention) before classification. Regenerated frames live
in the session scratchpad only; nothing under `pi/` was overwritten.

---

## §1 Archive integrity (the committed record)

All seven before/after pairs are present and complete: per-wave `manifest.json` both
halves; a DELTA.md in every after; the durable motion record committed as webm (w3
drag/view-switch/mix ×2 halves; w5b mix-motion ×2; w5c gradient-interactions ×2; w6
cold-entrance ×4 quadrants ×2 halves). The R/S binary-hygiene convention held: PNGs
self-ignore, and the only committed PNGs are the sixteen `w6-after/ruling-shots/*` —
the sanctioned §2.1 pull-back evidence, deliberately in git as the owner-ruling record.
The harnesses are durable and honest: every one re-ran at close, months of tree churn
later, without edits — the manifests I produced differ from the archived ones **only
in `capturedAt`/`base`** (verified byte-level for w7). That is the π convention doing
exactly what it was built for.

One honesty defect *in the harness*, named for the successor: `pi-w5b.mjs`'s
`uploadSpecimen` swallows its developed-plate wait
(`.waitFor(...).catch(() => {})`) — a shot proceeds silently when the plate never
mounts. That swallow is precisely what let the §4 finding hide in a green harness run;
the wait should hard-fail (it is the state the shot exists to record).

## §2 The eight close-state claims, live-verified

- **Title grammar (W4-1/S-1)** — HOLDS. The picker plate title is the bare
  Fraunces-italic space name + safeAccent ink + the small caret, seated directly on
  the field — no capsule, no eyebrow counter; the About header composes the SAME
  component inline ("About the color spaces, *Lab* ⌄"). Verified in both hosts, both
  schemes, 3 viewports (34/34 pi-capture shots).
- **The 32rem cards (owner ruling, card-width)** — HOLDS, numerically: the w5c
  harness's live `cardGeometry` reads width **512px** (= 32rem) at wide-1440, 489.6px
  at laptop-1024, 358px (the `max-w-md` carve-out) at 390 — the ruling's chosen
  geometry exactly. The plate reads as an instrument card, ~200px true margin each
  side at 1440; the About Components rows hold one line.
- **The checkerboard (owner ruling, alpha-checker)** — HOLDS. The `--alpha-checker`
  ground reads under every alpha ramp in every regenerated picker shot, light AND
  dark (dark gets the dark-material two-tone by construction); transparent end
  reveals it crisply, opaque end covers it. Verified at the picker alpha row across
  w4/w6/w7/w3-mix shots; the gradient-editor surfaces carry the same one token.
- **The webbing at device resolution (variance-webbing ruling §1.2)** — HOLDS. The
  gradient L×C plate's out-of-gamut hatch renders crisp at dpr 2 (the pi-w5c harness
  captures at deviceScaleFactor 2) — registered 45° lines, no 1x-canvas staircase;
  the picker plate's gamut-lens hatch reads equally crisp in the 1440 shots. The
  device-pixel snap law re-measures live: every `cardGeometry` row `y × 2 ∈ ℤ`
  (85.5 / 94.5 / 91 — the laptop row's archived fractional-y cure value exactly).
- **The analogous field + entrance (W6 + the pull-back)** — HOLDS. Cold `frame-t0016`
  (both viewports × schemes) already paints the fully derived seed-family field for
  the `oklch(0.72 0.19 145)` URL seed — no hot-pink, no theme-paper flash, no scheme
  snap at any cadence point. The field walks anchor±28° (olive → green → mint): the
  §1.1 calibration of record, matching `ruling-shots/judged-analog070-*` — the
  gate-time `w6-after/live/*.png` triad walk is correctly superseded by the DELTA's
  PULL-BACK addendum (a reader must read the addenda to the end; the record is
  coherent, layered, not contradictory). The dark field remains light-band material —
  the recorded **GAP-L2** producer row, unchanged, riding W8; the 390 blob breaks the
  TOP edge only (the hand-scale arm as specified); the bead carries attached
  drip/spout satellites, not ≥2 detached — the recorded **GAP-L5** row, unchanged.
- **The seal + one-voice accents (W7)** — HOLDS. 16/16 shots reproduce; the wax seal
  at rest is dot + inked view icon + `--accent-view` hairline rim, zero text/chevron;
  the view-select menu is the color-wheel legend (per-view gamut-guarded hues);
  Tools/Login hold the live accent; `@mbabb` lowercase mono; "Tools →". The PRM
  triplet re-measures the **identical 44/58/44 px** boxes — the recorded PRM-expand
  producer gap stands precisely as archived (numbers, not pixels). The admin gold
  voice reads on the admin fixture shots (gold shield seal + gold `admin` chip).
- **The PaneHeader band (W4)** — HOLDS. The About sticky band collapses to a single
  composed title line under scroll; the "Detailed Guide heading reads through the
  translucent band" residue reproduces exactly as the w4 DELTA's *named* residue —
  recorded taste-note, not drift.
- **The mix convergence (W3-6 / Q10)** — HOLDS, frame-for-frame: the RESULT plate
  seeds the dashed `[data-mix-target]` ghost well the moment the run starts; drops
  converge AT the plate (t0400); the pool settles and the result inks in with the
  **exact archived readout** `oklab(0.9532 0.2685 0.0465 / 1)` + copy/save/reset;
  zero spinner rows anywhere in the 16-frame series. The one clock holds.

Beyond the eight: the W5a browse/palettes/admin grammar re-verifies live (glass
cards, no hard header edge at rest, differentiated search placeholders, the
`· EMPTY PLATE ·` specimen register on TRUE empty, "The roster is unreachable." +
Fira detail + real Retry in the PLAIN error register — error ≠ empty holds); the W5b
mix-tab true-empty (`· NOTHING TO MIX ·`) holds — no eternal skeleton; the W7-2
mobile dock fit holds (no "Pa"/"Mi x" pill clipping in any 390 shot — the w5b-noted
residue was cured by W7-2 as recorded).

## §3 The one-instrument judgment

Judged end-to-end, the tranche's design story COHERES. The register the waves call
"the editorial instrument" is legible as ONE voice across every surface I drove: the
display-voice Fraunces titles doing structural work (the space name IS the title IS
the selector); Fira for every machine truth (readouts, seeds, error details, the
`GAMUT LENS — DISPLAY-P3 / SRGB` plate annotations); the specimen-plate register
reserved for TRUE empty and the plain register for errors; the checker as quiet
instrument ground rather than pattern feature; the hatch/contour/cusp speaking the
same token ink on the picker lens and the gradient plate (one home, `gamut-ink`);
the WatercolorDot idiom carrying the same material from the view-select legend dots
to the wax seal to the mix ghost well; the per-view accent derivation making the
navigation a color-wheel legend instead of N hand-picked hues; and the atmosphere
answering the pick everywhere (field, blob, thumb inks, dock wax) without shouting
over the cards. The historical layering inside the archives — W6 gate shots showing
the pre-W7 uppercase `@MBABB` and the superseded triad field — reconciles cleanly
through the later waves' own records; nothing in the live tree contradicts a wave's
final close-state claim on the SHIPPED artifact.

## §4 The drift-class finding (named, routed — not patched)

**PI-DRIFT-1 — the extract developed plate never mounts on the DEV vehicle at close
HEAD.** On the fresh dev server, uploading a specimen to `/#/extract` quantizes
correctly (the k-slider ramp paints the extracted `oklch` stops — the state is
provably live) but the developed plate — the `% of the image` dominant stat + the
weight-carrying PaletteCard — **never enters the DOM**: no skeleton, no error line,
no page error, no unhandled rejection, 15 s waits, and a follow-up k-nudge
re-quantize cannot recover it (probed three independent ways). The IDENTICAL flow on
the built `gh-pages` bundle renders the plate correctly (`hasOfTheImage: true`) —
the shipped instrument is healthy. The mechanism class is already root-caused in
this repo: Vue 3.5's `mode="out-in"` machinery under vite DEV strands the incoming
element after the leave completes (`afterLeave → instance.update()` never fires) —
the R.W3 close blocker, cured at `PaneSlot.vue` by dropping `out-in`, whose in-file
comment documents it verbatim. **Eight** `mode="out-in"` sites survive in `demo/`
(`ExtractWorkbench.vue:88` — this finding's site — plus `MixResultDisplay.vue:57`,
`ImageDropZone.vue:36`, `MixPane.vue:106`, `PaletteSlugBar.vue:4`,
`DockViewSelect.vue:72`, `Dock.vue:262`, `ActionBarLayer.vue:110`; the mix-result
site did NOT strand in this session's runs — the wedge is sequence-dependent).
Classification: a **dev-vehicle instrument-truth defect**, not a shipped-surface
regression — and structurally invisible to the archives, since every extract-state
capture (w5b before AND after) ran on the built bundle. It is exactly the class the
drift review exists to catch: a wave's after-archive cannot show it, and the harness
swallow (§1) hides it. Per `waves/S.W9.md §File bounds` this routes to a report row,
never a W9 patch: **a demo fix lane should apply the PaneSlot precedent (drop
`out-in` or re-choreograph) at least to `ExtractWorkbench.vue:88`, and audit the
other seven sites** — natural cargo for the successor tranche alongside RP-1's
demo cohesion lane.

Lesser notes, none gate-bearing: (a) the w6 archive requires reading the DELTA's two
addenda to reach the state of record (gate verdict → recalibration → pull-back) —
coherent but easy to misread if truncated; recommend the successor's FINAL.md books
table cite the pull-back addendum directly. (b) My regenerated w6 cold quadrants
paint fully by t0016 where the archive describes progressive fill to ~t0380 — a
machine-load difference in the same direction as the claim (faster), not drift.
(c) The `pi-w5b` harness swallow (§1) should become a hard wait when the successor
next runs it.

## §5 Verdict

**COHERES_WITH_NOTES.** The standing π matrix is a truthful, reproducible record of
the tranche; every one of the eight named close-state claims re-verifies against the
live tree at close on the archives' own terms; the recorded producer gaps (GAP-L2,
GAP-L5, PRM-expand) re-measure exactly as archived rather than having silently
drifted; and the one live divergence found (PI-DRIFT-1) is a dev-vehicle defect of a
known, root-caused class — named, bounded, evidence-chained, and routed to a fix
lane, with the shipped instrument verified healthy on the built bundle.
