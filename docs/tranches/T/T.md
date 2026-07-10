# T — The owner-mandate design tranche: material · type · boot · colocation · packets

**Tranche letter**: T — value.js's sixteenth tranche (arc A..S → T). S closed 2026-07-06
`complete_with_misses` (3.0.0 + 3.1.0 published; 23 books handed via `S/FINAL.md §5`); the owner
probed the S build live the same evening and delivered ~24 findings with 21 screenshots, then four
addenda (T-25..T-29 + E-7), plus the colocation grand edict. The 36-lane audit fleet root-caused
all of it against the live tree (`audit/lanes/`, 37 lane docs). [AMENDED-AT-HARDENING —
h-mandate-trace H-3, the counts reconciled once: the mandate asked for "32 agents"; the fleet
delivered 36 lanes across 37 lane docs (the plan-audit lane split in two) — the ask was exceeded,
not missed; "36-lane fleet" is the canonical phrasing.]

**One-line thesis** (SYNTHESIS, verbatim): *S built to a moving target and certified taste by
proxy; T re-aims at the owner's target, retires the old specs by name, replaces taste-by-proxy
with taste-by-ratification, mints the population/real-path oracles S lacked, and executes the
colocation grand edict as the structural spine.* The 24+5 owner findings are not fresh defects —
they are the long-deferred design body finally getting its execution tranche, plus a Class-B set
of owner reversals of gate-green S work that must be encoded as SPEC RETIREMENTS (§4), never
re-litigated as bugs.

**Substrate**: branch `tranche-t` @ `b7526e5` = master `cc4f4fa` (tag `tranche-s-close`); source
tree byte-identical across `cc4f4fa`/`5bb2d59`/HEAD (docs-only delta, re-verified by
t-plan-audit-1/2 + t-deferred-census). value.js **3.1.0** on the registry (`latest`). Producer
read-only: `../glass-ui` @ `19ddbd71` (`tranche/BG`, labelled 4.2.0 → 5.0.0; the consumed dist is
a gitignored local build ~1 day stale — G-CUR-1; the branch had already moved to `fa948297` by
corpus authoring and stood at `6605e1dd` at corpus completion 2026-07-09 — the re-stamp
discipline exists for exactly this) · `../keyframes.js` @
`5addc4a` · CI stays pinned to `tranche/BG` (R.W7 `102b37b`) until the 5.0.0 master landing.

**The spec of record**: `audit/SYNTHESIS.md` **AS-AMENDED (pass-2, `2a38c11`)** — self-contained
and governing. This charter distills and transcribes it; where the two could ever diverge, **the
spec wins** — and above BOTH, `MANDATE-2026-07-06.md §0` + addenda §0.1–§0.4 are **VERBATIM LAW**
and win over every lane, the synthesis, and this charter.

**Mode**: **DEVELOPMENT ONLY — awaiting the §12 owner ratification (the 19-row slate: Q1–Q18 with
Q11a/Q11b — CHANGED-AT-HARDENING from Q1–Q17).** "This is NOT an
implementation phase. Tranche development only." The corpus STOPS at the ratification gate; waves
dispatch only post-ratification (E-6). The dispatch gate is CLOSED (`PROGRESS.md`).

**Goal criterion.** The app the owner probed on 2026-07-06 — with its 24+5 findings — becomes the
app those findings describe as intended: every finding landed at its root or explicitly
booked/killed with rationale; the E-1 colocation grand edict executed total (§5.4 of the spec);
the E-2 packet series dispatched inside the open freeze windows; the retired specs never
restored; taste certified by OWNER RATIFICATION, not proxy.

**Completion criterion.** `FINAL.md` reconciles the finding→item map (SYNTHESIS §1) row-by-row,
zero drops; all wave gates evidence-backed; the O-1..O-26 oracle slate green (honest
EXPECTED-REDs recorded with their packet cites); budgets per the §6.2 disposition (Q14); every
book re-probed live; master merged + tagged. The PP-16 naming law binds:
gates-pass-goal-unmet closes `complete_with_misses`.

**Binding disciplines** (SYNTHESIS header, carried): mandate §0 + addenda are the ceiling ·
cross-lane contradictions resolved against the LIVE tree before elevation (t-contradictions §4's
reconciliation ledger governs: C1→W4's single-writer knot · C2→Q9 · C3→the T-24 law + ledger ·
C4→W2's internal order · C5→the console is a WELL · C6→one curve family) · producer-owned items
route to packets/adopt-books, never demo forks · books never gates (PP-5) · paired
goal/completion at tranche + wave + item level · NO legacy/workarounds/fallbacks (E-3) · Fable +
frontend-design for all design lanes · **T touches ZERO glass-ui/keyframes files** (the
foreign-tree fence; E-2 speaks in packets) · LEAN authoring.

---

## §1 — The mandate binding

**Precedence chain**: `MANDATE-2026-07-06.md §0` + addenda §0.1–§0.4 (verbatim owner text) →
`audit/SYNTHESIS.md` as-amended pass-2 (`2a38c11`) → this charter → the wave docs. Downstream
never overrides upstream; the owner's §12 rulings, once encoded, join the top.

**The finding index** (mandate §1 T-1..T-24 + addenda T-25..T-29; the full finding→wave-item map
with anchors, evidence lanes, and gate shapes is SYNTHESIS §1.2 — the map of record). Routing
digest:

T-1→W2-1/W2-2(+P1) · T-2→W4-1(+P10) · T-3→W3-1(+P3) · T-4→W4-3 · T-5→W4-4(+P5) · T-6→W6-1 ·
T-7→W4-2 · T-8→W4-5+W2-4(+P6) · T-9→W6-6+W1-api+W9(X1) · T-10→W6-4 · T-11→W3-1 · T-12→W3-3(+P3) ·
T-13→W3-2+W3-1 · T-14→W5(+P2) · T-15→W4-6 · T-16→W6-5 · T-17→W6-4 · T-18→W3-1 · T-19→W3-2 ·
T-20→P4+W7 · T-21→W6-2+W1-src · T-22→W6-3(+P7) · T-23→W3-4→W4-7(+P3) · T-24→W3-1+the C3 law ·
T-25→W2(+P1) · T-26→W2-5(+P1) · T-27→W2-1..3(+P1) · T-28→W6-7(+P5) · T-29→W6-8.
Fleet finds: MOB-1/MOB-2→W1-demo · CC-1→P8+W3 · A11Y-F1..F4→W3-5 · LEG-1..9→W0(+W1 moves) ·
PI-1..6→attached per wave · DOC-1..13→W0-4+W9.

**The shot-map corrections are BINDING** (SYNTHESIS §1.0 — the mandate's map was best-effort;
three lanes independently re-derived and converged on a contiguous **+1 mislabel** across
`t-2002-09` → `t-2004-32`): `t-2002-09` = T-7 readout (+T-6 sliver) · `t-2002-52` = T-8 blob
burial + T-2 + T-3 · `t-2004-10` = T-9 banner · `t-2004-32` = T-10 nav legend · `t-2004-55`
re-anchors T-11 · `t-2000-41` = T-5 · `t-2001-51` = the spectrum plate caption · `t-2000-27` =
the picker's gamut-lens caption strip. Every anchor in the corpus uses the corrected map.

**The edict index** (mandate §2, binding on this corpus):

- **E-1 THE COLOCATION GRAND EDICT** — all file directories, recursive: components colocated with
  sub-components/composables/skeletons/constants/styles; truly module/global-level composables in
  a `composables/` dir at their level; long-running dirs broken into common modules and
  encapsulated; the backend the same, abstracted befittingly. → §5 pointer (SYNTHESIS §5, incl.
  the §5.4 totality proof).
- **E-2** Full glass-ui audit → REQUEST PACKETS against the most recent glass-ui + forthcoming
  BG/BH; all component-level items at the ROOT (glass-ui or herein). → `letters/GLASSUI-T-ASKS.md`.
- **E-3** NO quick solutions, NO workarounds — idiomatic, gestalt approaches; architectural
  transpositions for elegance/simplicity/performance **above all** [AMENDED-AT-HARDENING —
  h-mandate-trace H-2: the owner's paramount intensifier restored; Q14's budget adjudication
  weighs it] necessary and desirable. NO legacy code.
- **E-4** ALL deferred items — chronic and recent — delineated and FOLDED INTO THIS TRANCHE. → §5.
- **E-5** ALL owner prompts/requests hitherto recapped and verified addressed (t-prompts-recap).
- **E-6** Process: Fable + the frontend-design plugin for all design; opus/sonnet fanout; batches
  of three; development only, ratification-gated. → §8.
- **E-7 THE HARDENING/CRITIQUE STAGE** — a dedicated LATE wave (→ T.W8): per-surface critique
  passes + remediation lanes + a final tranche-level taste certification, before close.

---

## §2 — The design doctrine (SYNTHESIS §2, transcribed; each move carries its evidence + what it retires)

**D1 · THE FOUR-RUNG MATERIAL LADDER** — *glass earns its blur by floating over live content; a
surface that sits IN a plate is a tone of the plate, not a second pane of glass.*
Rungs: **1 PLATE** (the picker's exact register: `tier="resting"` + cartoon stamp + grain — all 9
pane cards join) · **2 WELL** (opaque tone-step of the plate, NO backdrop-blur — the markdown
`bg-muted` pattern generalized; producer rung P3) · **3 CHROME** (true floating glass, as shipped)
· **4 STAGE** (named near-black pair `--stage`/`--on-stage-chrome`). Evidence: t-card-material
§1-§3 (9 alphas over one aurora = a hue ladder; the physics: α spread IS hue spread); the
mechanical census (t-card-color-census) stamps every site to a rung (§4 there is the deployment
table of record, with CC-2's mint-count correction). RETIRES: S-20 `bg-card/75` as species; the 6
parallel well mints; raw `bg-black`/`bg-white`; the 7th bespoke header recipe (CC-3). Corollary
(T-24): with rungs 1-2 in place every in-view surface ≥ ~0.7 effective alpha of ONE neutral family
— the hue fork dies by construction. The **C3 LAW** rides this: color = data only; the complete
sanctioned-exception ledger is SYNTHESIS §1.2 T-24's row (ramps, dots, strips, netting, field,
blob, Palettes-rainbow, admin-gold, + the `--accent-view` navigation-ring family — the seal rim
struck per R9/Q12). [AMENDED-AT-HARDENING: the law + ledger + the neutral-family FORM (warm
cream/brown + stone-ink vs the owner-literal gray/white/black) now ride **Q18** — the owner's
"white/black" (T-10) + "gray/black/white" (T-24) were re-cut to warm neutrals with no Q, a
lesson-15 violation surfaced by h-owner-words F1. The rung-2 WELL tone-step gains its bracket:
[6%, 10%] `--foreground` into `--card`, oklab, default 8% — the P3 sizing spec.] Mobile frame:
every rung judged at 390 over the aurora's brightest band (t-mobile F-8 — the stricter reading
sets the floor).

**D2 · THE ×φ TYPE RECALIBRATION** — "1.5× on our golden scale" = **one full golden rung = two
token steps** (×1.618, an OWNER-WORD RE-CUT of the literal 1.5 — ratified via Q11, never assumed
[AMENDED-AT-PASS-2]) (|ln1.5−lnφ| < |ln1.5−ln√φ|; t-title-typography §1 — every landing is an
exact shipped token, no new values): picker title display-1→display-3 (41.89→67.78px @1440) · pane
title heading→display-1 (25.89→41.89, phones floor-pinned = deliberate no-op) · readout
display-2→display-4-class rung (33.77→54.64 @32rem). Weight 400 carried ON the trigger's own class
list (kills the About-700 inheritance bug). The readout becomes a CONTIGUOUS TUPLE: intrinsic
cells, tuple-level anti-reflow re-earned by (i) REAL tabular figures — **self-host Fraunces with a
verified `tnum`** (the Google-served face silently lacks it; the declared `tabular-nums` is a
no-op — F5) and (ii) per-space LOCKED line counts (F6's table; per-space integer least-counts are
REQUIRED at the phone band, t-mobile F-4). PaletteCard + every title surface joins the display
voice (population sweep, non-italic for user-data names). RETIRES: R4's set + the "ride the
producer control rung" premise (P10 asks the token station so the demo never shadows font-size).

**D3 · THE ONE BOOT OVERTURE** — *hydrate → derive → commit; order by gating, not by timing; work
defers, appearance composes; one material from t0.* [AMENDED-AT-HARDENING — the D3 body is
re-authored in the spec of record (SYNTHESIS §2 D3, as-hardened); this transcription carries the
headlines:] The five laws + beats **B0/B1/B3/B4** of t-load-sync §3 are adopted verbatim (B0
ground · B1 plates, ONE plate-land family incl. the dock arriving AS the pill · B3 instrument ·
B4 blob goo-EMERGES); **B2 is superseded** — derive-in 0.9s decelerate over its OWN gradient
ground, gate `isArmed ∧ dock-plate-landed` (620ms), settled ≤1.6s (bracket [1.4, 1.7]s, the Q2
annex). **Law 4 → the named beat-gating DAG**: B1 hydration-committed ∧ mount · B2 as above ·
B3 left-plate-landed · B4 B3-complete ∧ B2-started ∧ chunk-resolved; O-4 asserts B0 < B1 <
{B2, B3} < B4 ∧ B2-start < B4-start. The color half (t-aurora-boot §2.1): the persisted ground
becomes the derived-palette GRADIENT (not the deepest stop — kills the dark-slab + luminance
leap) as a **FIXED template over registered per-stop properties `--saved-bg-0..3`** (persist
STOPS, never a gradient string; scheme+version-guarded); hydration-first kills the GAP-ARM demo
half AND the latent pink flash (F-3); like-with-like crossfade cannot desaturate (F-4); per-stop
200ms OKLab transitions give discrete picks their ground move; fonts are struck from the timeline
(self-hosted, preloaded — LS-6) with the **bounded ink gate** (`document.fonts.ready` ∨ 300ms cap
→ metric-compatible fallback; never an UNTUNED fallback, never a swap-reflow). The **LCP
reveal-only law** (PI-2), DEFINED: the LCP element's paint chain holds `opacity > 0` from B0; the
LCP-owning plate's land is **transform + shadow ONLY** (opacity pinned 1); O-24 asserts identity
AND first-paint-time ≤ B1-start + 1 frame. T-27's "slow" is answered as CADENCE (settle moves
~1.0s → [1.4, 1.7]s BY DESIGN — the Q2 annex, W8 screencasts). RETIRES: the five-clock smear, the
About pop, the dock mount-morph, the Google-Fonts network actor, the seeded-session gate as
evidence.

**D4 · THE LIVING FIELD INSIDE THE BRACKET** — the T-26 target (Q2 default, t-aurora-boot §2.2):
chroma-adaptive wide-analogous fan + ONE counterpoint stop + energy 0.76 + structure (softmaxBeta
4) + tempo (breath 26s, drift ×1.6) + `vividness = smoothstep(0.02, 0.10, seedC)` (gray picks keep
a sage whisper, never marigold) + dark `lBand` via the L2 atom. Perceptibility gates (= slate row
**O-26**, metricized [AMENDED-AT-HARDENING]): 2s glance-pair sub-JND (<2/255); 10s window shows
unmistakable migration (≥4/255 mid-C); 60s never repeats (no two 5s-apart window pairs <1/255).
The drag path is byte-identical (the app's best living moment). Pointer work is SEQUENCED after
the producer honesty fix (two of three axes are dead shader paths on smooth — F-10). The bracket
is the SIZING SPEC handed to the producer atoms (P1).

**D5 · THE PLATE + CONSOLE GESTALT (sliders)** — the picker's content region resolves into the
**specimen plate** (spectrum + caption) and the **console** (letter-rail + sliders): a rung-2 WELL
sub-card (C5 settles it — opaque tone-step, no blur; NOT "quiet glass"; an OWNER-WORD RE-CUT of
"a little glass card" — surfaced for ratification via Q4, never settled silently
[AMENDED-AT-PASS-2]), the letter column a vertical micro-dock ring in `--accent-view` (seal-rim
recipe turned portrait; producer letter-rail primitive = P5, demo interim sanctioned), letters
speak INK (the channel-color conceit retires — degenerate by construction), the WatercolorDot ring
stays the ONE live-color voice, `L a b α` glyphs kill the A-collision, the channel strip gives
every row its live meter (T-4). Bounding the ground is what makes the ink computable — one
gestalt, not three patches (t-sliders F-4).

**D6 · THE INK-ON-TIER CERTIFIED-CONTRAST CONTRACT** — *the referent is a property of the surface
the text sits on, never a global constant.* Retire `BG_LIGHTNESS_DARK/LIGHT`; thread the
atmosphere's live derived-lightness (page ambient) and each tier's known composited lightness
(named surfaces) into the ONE guard family (`safeAccentColor`/`wcagContrastRatio` — the library
already takes `bgL`; every consumer feeds it a lie today). De-emphasis becomes a floor-clamped
rung of certified ink, never post-hoc opacity (the guard-then-alpha class dies). The in-repo
exemplar is `resolveSealInk`/`--seal-ink`, generalized. Producer stake: tiers publish effective
lightness (P3/P5 contract row). Evidence: t-a11y-contrast F-1..F-4 (measured ≤1.28:1 unguarded
menus; guarded-but-under-corrected 1.44:1). RETIRES: the two constants, per-site guards, opacity
de-emphasis.

**D7 · THE LIQUID-EASING FAMILY, STRUCTURAL** — the two-channel law (spatial = spring at ITS OWN
clock; effects = bezier) becomes inherited, not per-site: cards adopt the producer cartoon
register (`<Card surface="cartoon">`/atoms), interactive scales ride `--transition-liquid-spatial`,
the pane swap moves to `--spring-snappy` @ its own clock with the exit strictly shorter, collapse
legs re-cut compositor-only (GATED on PKT-3 — never retimed on layout properties, PI-5), skeleton→
content settles through `vj-morph`. The P0 is producer-root: the dist theme emission clobbers
every consumer's `@theme` motion alias (PKT-1) — NO demo cascade arms-race. The KEEP set (F6) is
canon: do not re-litigate. RETIRES: the dead W3-5 alias premise, spring-on-generic-clock,
`max-height` morphs (upon PKT-3), the 150ms generic-web register.

**D8 · THE SEAT (blob placement law v3)** — a PAPERWEIGHT ON THE PLATE: wrapper flush to the plate
corner (`--blob-seat`, default 0), ONE `cqi` footprint formula at every viewport (the 8rem hand arm
and the corner-break law die), containment identity (orbit-reach 0.49 ≤ 0.5 ⇒ no clip/no dock
collision/no seam skewer BY CONSTRUCTION, all three mobile bands collapse to one composition —
t-mobile F-3), `--z-ornament` = top of the CONTENT stack (chrome stays above; the two readings of
"all" never conflict in paint — **PROVISIONAL, for ratification via Q3b** [AMENDED-AT-HARDENING:
the authoring lane asked for this ratification; the synthesis had dropped the ask]), depth via
contact shadow + sheen (genesis open-Q9 now WANTED), the ink law = |ΔL(bead, plate)| ≥ **floor ∈
[0.12, 0.20] OKLab L, default 0.15** [AMENDED-AT-HARDENING — the "named threshold" finally named;
also the F9.R1 `lightnessFloor` sizing spec], closed-form (inside the 12ms drag headroom — PI-3).
The hover/morph score is the 7-beat table (t-blob-hero §3), demo beats now, engine floors via P6.

**D9 · THE SHADOW-PALETTE STATE GRAMMAR** — *wherever absent content is a palette, the empty state
displays the ghost of the artifact at the artifact's own scale, in ALL cases; the text plate
captions, never substitutes.* Four species on the MOTION axis: true-empty = STILL dashed ghost
(`specimen` ink, finally consumed) · known-imminent = shadow breath · network = developing shimmer
· error = plain register (untouched). Semantics split: ghost `aria-hidden`, caption carries AT —
the S loading-lie cure survives the material's return. One `ShadowPalette` species, colocated with
the card family; the dashed edge lifts dot→card scale.

**D10 · COLOCATION IS THE DIRECTORY LAW** (E-1) — SYNTHESIS §5. The keystone insight (t-coloc-src
§0/§2): the library's public contract is a NAME SET (8 exports keys), not a file tree — and the
demo must **dogfood the published surface** (23 deep `@src/` specifiers incl. 5 un-exported
conversion primitives pierce the barrier today). The backend transposes to modules/ + platform/
(move-only; the L boundary laws survive verbatim). The demo tree goes recursive per the two
in-repo exemplars (`ImageEyedropper/`, `PaletteDialog/`); the module tier re-homes BY DOMAIN (the
reactive-vs-pure split dissolves); the App shell gets a home (the boot chain becomes legible as
`app/composables/boot/` — the exact subsystem W2 edits).

---

## §3 — The wave DAG, rounds, and intra-round laws

**The DAG** (SYNTHESIS §3, verbatim):

```
T.W0 → T.W1 → { T.W2 · T.W3 } → T.W4 → { T.W5 · T.W6 } → T.W8 → T.W9
T.W7 (the 5.0.0 ADOPT) — trigger-gated on the glass-ui BG/BH joint cut; FLOATS into whatever
round is current when it fires; NOT on the critical path (PP-5: books never gates — its
non-firing inside T's window is not a miss). T.W8 runs only after every design wave closes.
```

Rounds: **0**: W0 · **1**: W1 (three single-writer lanes demo ∥ api ∥ src) · **2**: W2 ∥ W3 ·
**3**: W4 · **4**: W5 ∥ W6 · **5**: W8 · **close**: W9 · **trigger**: W7 floats.

W2 and W3 parallelize (disjoint surfaces: boot chain vs materials); W4 REQUIRES W3 (the
console/ink/seat composite against the settled ladder) and consumes W2's settled boot (T-23's
veil is judged over the true field); W5/W6 parallelize (motion tokens vs feature surfaces).

**THE COLOCATION SEQUENCING DECISION** (Q1 — default: **RESTRUCTURE FIRST, as W1, before every
design wave**): the design waves author substantial NEW code that E-1 demands be BORN colocated;
the restructure is mechanical + hard-gated (suites green · O-23 bundle-diff ±2% · PP-8 caps
sweep) and depends on NO producer window; landing it last would move every design wave's
freshly-landed files a second time. Costs + mitigations: W1 emits a committed **MOVE-MAP** (old
path → new path, one table) and each design wave re-derives its anchors at wave-open (PP-11);
strict wave ordering satisfies the CL-lane note — W1 CLOSES before W2 opens; nothing moves
concurrently. The alternative (restructure last) is preserved as Q1's live alternative.

### §3.1 The wave slate

Per-wave paired goal/completion, item tables (file:line anchors + evidence lanes + gate shapes),
triumvirate dispatch, file bounds, and evidence packets live in the wave docs; the spec wins.

| Wave | Title | Doc | Publishes | Gate summary |
|---|---|---|---|---|
| **T.W0** | SUBSTRATE · ORACLE FLOOR · PACKET DISPATCH (W0-1..W0-6) | `waves/T.W0.md` | — | packets dispatched + acked-or-recorded (P9 named FIRST); oracle floor green-or-born-RED-by-design (O-1..O-5, O-16, O-7 scaffold — MUST precede W2); proof:* split per Q13 (`test:dist` CI-wired); legacy grep-zero on the named set; doc-truth pre-E-1 set landed; O-25 + `--ring` pre-migration |
| **T.W1** | THE COLOCATION GRAND RESTRUCTURE (W1-demo · W1-api · W1-src) | `waves/T.W1.md` | Q15 promotions = expected semver-MINOR additions | MOVE-MAP committed; suites + e2e green; O-23 bundle-diff flat ±2% per named chunk; PP-8 caps recomputed post-move; ZERO re-export shims at old paths; MOB-1 witness gate (both panes reachable at 1024×1366) + MOB-2; api 224-class suite green post-TA-4; dts surface additive-only (the §5.3 FORBIDS ledger) |
| **T.W2** | THE BOOT OVERTURE + THE LIVING FIELD (W2-1..W2-5; T-1/25/26/27 demo halves, GAP-ARM-hedged — NOT blocked on P1) | `waves/T.W2.md` | — | O-1 color-truth · O-2 real-hydration · O-3 headed-GPU re-run · O-4 order-invariance under 6× throttle · O-5 pacing · O-6 bracket test + the O-26 perceptibility gates · O-24 LCP identity; owner eye-judge frames archived |
| **T.W3** | THE MATERIAL LADDER · NEUTRALS · INK (W3-1..W3-5) | `waves/T.W3.md` | — | O-7 census green (rung membership, both schemes, all panes + fixtures) + 390-frame; O-9 all-cases; O-11 gates 1-6; O-18 population contrast census; CSS tripwire ≤120 KiB gz |
| **T.W4** | THE PICKER RECOMPOSITION (the C1 knot — ONE wave, single-writer, forced order) | `waves/T.W4.md` | — | O-10a-d type locks; O-12 blob-seat set (PI-4 same-commit law); O-11 gates 1+3 re-run over the settled band; meter presence; ONE active indicator; height gate @900px; CSS tripwire |
| **T.W5** | MOTION LIQUID (T-14; PI-5 two-tranche split) | `waves/T.W5.md` | — | O-16 computed-cascade census (owned rows green; R1 row honest EXPECTED-RED w/ PKT-1 cite); view-switch ≤100ms re-run; the KEEP set (F6) untouched; Tranche B strictly PKT-3-gated; CSS tripwire |
| **T.W6** | SURFACES & SHELL (W6-1..W6-8; parallel lanes per the single-writer map) | `waves/T.W6.md` | — | O-13 slim same-commit + O-14 byte-identity; O-15a/b; O-17; O-19; O-20; O-21; O-22 (W0-1 contract byte-preserved) |
| **T.W7** | THE ADOPT EVENT (= S.W8 handed intact; trigger-gated, floats) | `waves/T.W7.md` | — | the verify-at-cut ledger (letter §) walked row-by-row against a REBUILT dist + stamped HEAD; `^4→^5`; L17/L20+RP-2 re-measure; every GAP re-verify; the booked interim swaps fire; O-8 goes live; suites + O-slate green |
| **T.W8** | E-7 THE HARDENING/CRITIQUE WAVE (depth = Q6) | `waves/T.W8.md` | — | per-surface Fable+frontend-design critique (batches of 3, coherence PRE-FILTER only) → remediation lanes → ONE owner taste-certification package (annotated frames per surface, both schemes, 3 viewports + boot screencast); **the owner's verdict is the gate**; full oracle slate + budgets + fresh Lighthouse delta |
| **T.W9** | CLOSE (the S close machinery inherited unchanged) | `waves/T.W9.md` | — | zero-drop ledger walk · every book re-probed live · repo-wide sweeps · budgets re-measured · doc rewrites unblocked (demo/api CLAUDE.md pattern-level; TA-6 index-count reconcile; src Structure → module-boundary contracts) · X1/X2 restated verbatim w/ firing ops · spec-status recheck · PP-16 |

### §3.2 Single-writer laws (VERBATIM — binding on every dispatcher)

- **W1** — three single-writer lanes, disjoint trees: **W1-demo** / **W1-api** / **W1-src**.
  W1-demo migration order (churn-minimizing): DROP/dissolve → contained features
  (gradient/mix/extractor, 0–2 external edges) → palette-browser behind HARDENED BARRELS (the 9
  external deep edges insulated FIRST) → the color-domain atomic codemod LAST (keys ~24 sites).
  W1-src order: the demo-dogfood keystone FIRST (§5.3 item 1) · the **L1 Normalized/Display
  brand decision sequenced LAST** (boolean-literal-param + conditional-return-type, ~58
  callsites). Barrels are **named re-exports only, never `export *`** (PI-6).
- **W2 ∥ W3** — disjoint surfaces: boot chain vs materials. W2 single-writer:
  `app/composables/boot/*` + `App.vue` + `index.html`. W3 single-writer: the tier tokens +
  `PaneHeader.vue`. Intra-W2: **W2-5 (T-26 calibration) is SEQUENCED after W2-1** (C4); the
  pointer retune is DEFERRED until P1's honesty fix lands (F-10).
- **W4 — THE C1 KNOT** (t-contradictions C1): ONE wave, single-writer, **forced order**:
  **(1) W4-1 titles ×φ → (2) W4-2 readout tuple (reservation re-scope FIRST at the phone band —
  t-mobile F-4.4) → (3) W4-5 SEAT (reservation re-derives; T-7's freed band is the seat's) →
  (4) W4-4 console + W4-7 veil re-derive against the settled band.** Files: `ColorPicker.vue` ·
  `ColorComponentDisplay/` · `ComponentSliders/` · `readoutReservation.ts` · `PaneHeader.vue`
  (geometry only) · `HeroBlob/`.
- **W5 ∥ W6** — motion tokens vs feature surfaces. **W6 single-writer map, total over all 8
  items** [AMENDED-AT-PASS-2 — W6-1 was unassigned]: **gradient tree** = W6-1 + W6-2 (the
  netting's re-judge surface IS the W3 gradient plate; `style.css` regions disjoint — netting
  @254-261 vs the surviving accent @223-224, t-nav-dropdowns:123) · **easing editor** = W6-3 ·
  **dock+nav** = W6-4/W6-6/W6-7/W6-8 · **generate** = W6-5.
- **Every wave**: lane worktrees cut from the **wave head** [AMENDED-AT-HARDENING — h-dag D-6];
  PP-8 repo-wide sweep (caps recomputed
  post-move · legacy grep · as-any ledger regenerated) in EVERY wave gate; per-wave Lighthouse
  delta recorded (PI-1); the §6.2 CSS-byte tripwire REDS W3/W4/W5 at >120 KiB gz.

---

## §4 — The spec-retirement ledger R1–R11 (SYNTHESIS §1.1, transcribed with cross-refs resolved — E-3 binds)

Every row is a ratified S spec/ruling/π-certification the owner reversed. Each is RETIRED BY NAME
so no future audit "restores" it. Class labels per plan-audit-2 §0 (A defect-in-green-gate ·
B owner overrule · C recorded miss · D scope gap). [AMENDED-AT-HARDENING — h-overrule-ledger F-1:
**7 rows mandate-§3-listed / 4 corpus-added**; R6 is the fourth §3-omission; bare S-era Q-numbers
are prefixed **S-Q** (h-refine-console F-7).]

| # | Finding vs landed spec | Precise class | What RETIRES | What SURVIVES (E-3 must not over-delete) |
|---|---|---|---|---|
| R1 | **T-10 vs W7-4** color-wheel-legend menu (`DockViewSelect.vue:41-45`, `33ba703`) | OVERRULE, **PARTIAL** | `entryAccent` per-row hue + `resolveViewAccentTokens`/`PRIMARY_VIEW_SHIFTS`/`PRIMARY_VIEW_IDS` (sole consumer dies) + the dot column | `resolveViewAccent` (current view), `resolveSealInk`, `--accent-view` trigger/ring/`--primary`, the `@property` sweep, the WCAG math |
| R2 | **T-23 vs the W5-2 rider** zero-at-rest veil (`PaneHeader.vue:76`; `w5a-after/DELTA.md:25`) | RECALIBRATION of an over-rotated cure (NOT a flip-flop — t-header-shading §1) | the `opacity:0`-at-rest clause; "material earns existence by scroll" | the FEATHER (the band-killer), the scroll modulation. DELTA.md:25 + the S.W5 rider row get supersession annotations (record repair) |
| R3 | **T-8 vs W6-4** corner-break/overflow law (`ColorPicker.vue:344-375`, `d843ae7`) | OVERRULE **+A** (the burial W6-4 claimed to kill persisted at the About host — shot t-2002-52) | center-on-radius-origin + ≥25%-overflow-per-broken-edge + the <lg 8rem hand arm | S-Q7 full presence · slot-owned anchor/footprint token · the reservation mechanism (re-derived) |
| R4 | **T-2/T-7 vs W4-1/W4-2** (`ColorSpaceSelector.vue:35` `size="audacious"`; `ColorComponentDisplay.vue:12` full-span) | T-2 RECALIBRATION **+ a latent BUG** (About host inherits weight **700** — S-21 broken on the weight axis, t-title-typography F2); T-7 OVERRULE | the audacious-rung size BASIS; the full-span + per-cell `ch` reservation; the W4-2 gate text "Lab inks ONE line at 1440" | the four-state ink grammar, the card-lock GOAL (re-earned at tuple/line level), the specimen catalog rows |
| R5 | **T-6 vs W5-8** "subtle" webbing register (`style.css:254-261`, `gamut-ink.ts:29-36`) | RECALIBRATION (intensity only — the cleanest of the set) | the 9%/12% intensity values | the ONE-home facility, the DPR raster, the token architecture (the ruling-6 cures stack, unopposed) |
| R6 | **T-26 vs rulings 3+6** (analogous/0.7, `panes/keys.ts:46-47`, `fe30d68`) | THIRD calibration — the bracket CLOSES: (analogous±28°, 0.7) too muted ← target → (triad, 0.82) too strong | both point values as targets | the derive mechanism. **The bracket becomes the producer sizing spec** (packet P1). **BLOCKED-FOR-HONEST-JUDGMENT on the GAP-ARM demo-half cure** (C4) |
| R7 | **T-13/T-19 vs S.W5-6 F1/F2/F3 + S-Q6** (kills `e43601c`+`a34d20f`; the `specimen` register shipped ZERO consumers) | OVERRULE-on-material, UPHOLD-on-semantics (unlisted by mandate §3) | the material amputation; S-Q6's true-empty-ONLY scope for palette-shaped surfaces | "never announce work that isn't happening" (F-5 aria split); error ≠ empty; the loading-lie cure — re-cut on the MOTION axis (D9) |
| R8 | **T-3/T-11/T-18/T-24 vs W5-2/S-20** `bg-card/75` as "the one card species" | OVERRULE of a DEFINITION (unlisted) | the S-20 species definition | the one-species GOAL — re-grounded at the picker's `resting`+cartoon rung (D1) |
| R9 | **T-28 vs W7-1's π-certified "INTENTIONAL" rim** (`Dock.vue:330-338`, `96a12ed`) | OVERRULE of a taste certification (unlisted) + A (rim on the WRONG element — geometric parent circle vs seeded organic wax, crosses +1.5px / gaps −2.5px by construction) | the `.dock-seal` die-rim + gold border override; the "hairline as continuity carrier" clause | the wax + inked-glyph identity; W7-1's continuity re-carried by the GLYPH; the `--dock-ring` on the geometric expanded trigger |
| R10 | **T-9 vs W0-1 seed-rider-1** (DevMisconfigBanner, `App.vue:115`) | OVERRULE of PRESENTATION only | the banner FORM (fixed red bar, z-9999, dock-overlapping) | the ENTIRE W0-1 contract: transport latch, synchronous `DevMisconfigError`, loud `console.error`, misconfigured ≠ unavailable, REJECTED-localhost-CORS |
| R11 | **T-1 vs GAP-ARM + W6-1** | **NOT an overrule** — FOLD-FORWARD (C, producer replay) + NEW BUG (A, demo hydration order, un-recorded by S) + SCOPE-WHOLE (D, boot quality). Mis-filing it as taste would bury a live prod defect | — | W6-1's entrance clause, RESTATED over the terminal state (material-invariance of the load, LS-8) |

**Class census** (plan-audit-2 §8.6): B/overrule = T-2, T-6, T-7, T-8(seam), T-10/17, T-23, T-26 +
seams in T-13/T-28 · A/green-gate-defect = T-3/11/18/24, T-5(contrast), T-12, T-13/19(dead code),
T-14, T-15, T-16, T-21, T-28(geometry), T-29 + F12's demo half · C/recorded = T-20, the producer
halves of T-8/T-26, GAP-* · D/scope-whole = T-4, T-22, T-27-quality. The A-set indicts the S
**verification method** (named-site-not-population; proxy predicates) → the §6 oracle slate exists
to fix it; the B-set indicts nothing — it is taste evolution, encoded above.

---

## §5 — The E-4 fold table (pointer) + CHRONIC flags

The deferred fold table of record — every S book + census row → its T home, with dispositions —
is **SYNTHESIS §7** (from t-deferred-census, re-verified live). It is transcribed operationally
into the §7 BOOKS table below; the colocation program it rides is **SYNTHESIS §5** (§5.1 demo ·
§5.2 api · §5.3 src incl. the FORBIDS ledger · §5.4 the E-1 totality proof).

**CHRONIC rows** (≥2 tranches, flagged by name — E-4's "chronically deferred" set): the glass-ui
5.0.0 adopt event (~10 tranches) · CI un-pin from `tranche/BG` · L17 GooBlob→`Blob` rename ·
GAP-L5 blob halves (K→N→M→S→T) · **X1** prod-api deploy (2nd carry; publish/unpublish 404-broken
for real users — never a silent 3rd re-book) · **X2** NCSU alias (the OLDEST owner order) ·
`Color.try()` · S.H3 Pratt · the `proof:*` carry (the off-ledger headline — the doc-claimed
retirement that never completed → W0-2) · **the EasingPicker SelectTrigger accessible-name
contract (CHRONIC R→S→T — named in P7; folds before the W0-1 dispatch)** · **the `/easing`
17th-subpath GAP-3 verify-watch (CHRONIC)** [AMENDED-AT-HARDENING — h-books-folds SF-1/SF-2: the
two flags restored; the chronic census delineates 15, not 13] · the
FN-7/kf-resolveEasing/CH-10/CH-13/R8-23/R-5/R-10
spec/cross-repo set (W9 recheck; no fired-but-unnoticed trigger, re-verified). The
discharged-in-S set (srgb decode, ICtCp/Jzazbz, raytrace, vue-router 5, parse-that re-pin,
K-INV5, [2.0.0] entry) is NOT re-folded — recorded for zero-drop only.

**Classes considered, no items minted** [AMENDED-AT-HARDENING — h-gaps G-10: absence reads as
judgment, not blindness; promote any row the owner elevates at ratification]:

| Class | Disposition |
|---|---|
| i18n (`lang="en"`) | DECLINED — single-author app |
| print/PDF of palettes | DECLINED — export exists; no print-stylesheet demand |
| color-vision-deficiency tooling | DECLINED-as-defect — a plausible owner FEATURE ask on a color product, not a T item |
| `forced-colors` / `prefers-contrast` / `prefers-reduced-transparency` | DECLINED-with-note — the cheapest-ever moment to thread `prefers-contrast: more` is W3-5's one guard family; noted there, not mandated |
| zoom-200% / text-scaling reflow | DECLINED — no owner finding; the W8 roster's viewport matrix is the standing probe |
| runtime-error containment (app-level `errorHandler`) | DECLINED for W1 (VERDICT §5-D3 — churn inside the move wave); a named W8 roster row ("thrown-error state") judges the class |

---

## §6 — The oracle slate + carried budgets (pointer)

**The slate of record is SYNTHESIS §6.1** (O-1..O-26 [AMENDED-AT-HARDENING: +O-26 aurora perceptibility — render, not atoms]; each mint names the axis it must NOT proxy
away — the two S failure shapes were **named-site-not-population** and **proxy-predicates**, and
every mint is one of those two repairs). The boot set (O-1..O-5, O-16, O-7 scaffold) mints at W0
and MUST precede W2 and E-7 (plan-audit-1 F3/F4); each is born-RED against today's tree where the
defect is live (honest reds recorded). O-13 is the one AT-RISK row: it SLIMS same-commit as T-10.

**Budgets carried** (SYNTHESIS §6.2): JS eager **347.9 KiB gz** vs ≤280 — **RP-2 re-baseline
stands**, cleared only at W7 (L20 + GAP-L5 together) · CSS ≤120 (86.5, headroom 33.5) with the
**per-wave TRIPWIRE** (W3/W4/W5 each re-measure at their gate and RED at >120) · frame budgets
(drag ≤20 · view ≤100 · idle ≤13 · 0 long tasks; drag headroom 12ms bounds the W4 ink-law solve) ·
the 390 blob perf gate (S-Q7) HARD · **Lighthouse run of record `28836873580`: LCP 5563ms (~2.2×
over) · TBT 5618ms (~19× over) — HONESTLY RED, no gate weakened**; disposition = Q14 (budgets stay
red + the PI-1 per-wave delta ledger until the owner adjudicates budget/preset pairing at W8/W9).
Suites at synthesis: vitest 2158/68 green · playwright 38/39 + 1 known contention-class flake
(gradient drag — re-judged when W6-2's geometry lands) · api 224/37 + tsc 0.

---

## §7 — The BOOKS table (supersedes `S/FINAL.md §5` as the live routing — S's record is closed history, do not edit it)

Books, never gates (PP-5) — no wave gate reads this table except the named EXPECTED-RED rows,
which carry their packet cites in the gate itself.

### §7.1 Inherited S books, as routed (SYNTHESIS §7)

| Book | Owner | T home | Disposition |
|---|---|---|---|
| glass-ui 5.0.0 adopt event (**CHRONIC**) | producer | **W7** | = S.W8 intact; trigger-gated (PP-5) |
| CI un-pin from tranche/BG (**CHRONIC**) · L17 `Blob` rename (**CHRONIC**) | producer/repo | W7 | at the cut |
| GAP-ARM (prod-visible) | **joint** | P1 + **W2-1** (demo half) + W7 re-verify | BOTH halves fold; the demo half is NOT producer-gated |
| GAP-L2 variance atoms | producer | P1 (sized by the T-26 bracket) + W7 | the bracket is the spec |
| GAP-L5 blob halves (**CHRONIC** K→N→M→S→T) | joint | P6 + W4-5/W2-4 demo + W7 | rows A-E appended |
| PRM-expand (keyframes) | producer | KF note (in the T letter) + W7 re-verify | re-confirmed live 2026-07-07 |
| L20 `/blob/config` + GAP-L5 + **RP-2** | producer+demo | P9 + W7 | **L20 + GAP-L5 + RP-2 land TOGETHER** or the re-baseline carries a 3rd tranche [AMENDED-AT-HARDENING — matches W7 P-3 + census §6] |
| GLASSUI-S-ASKS L2..L16 open set | producer | P1/P3/P7 (**re-asked BY NAME** — the W-DESHADCN fold delivered none) + W7 walk | **L8 = 5th booking, ESCALATED** |
| S-3 letter-rail (FIRED) | joint | **P5** (upgraded to MANDATED by T-5) + W4-4 interim | do not wait on the book |
| **X1 prod api deploy** (**CHRONIC**, 2nd carry) | **maintainer-on-host** | W9 residual + O-25 | firing op restated verbatim; never a silent 3rd re-book |
| **X2 NCSU alias** (**CHRONIC**, the oldest owner order) | maintainer-on-VPN | W9 residual | on-VPN op |
| the Normalized/Display brand (**L1**; S's "W2-3" book, RENAMED — T's W2-3 is the OVERTURE) | src | **W1-src** (last item) | the decision-doc redesign, ~58 callsites |
| `Color.try()` (**CHRONIC**) | src | PARK | re-justify only if a parsing wave opens (12 try-wraps ≠ the bar) |
| S.H3 Pratt (**CHRONIC**) | src/parse-that | KEEP-DORMANT | re-justified — folding it would be contrivance; fires if parse-that presents |
| dup-`useDark` · PI-DRIFT-1 (+10 `out-in` sites, pi-w5b hard-fail rider) | demo | **W1-demo cargo** | |
| `/remix`+`/diff` api-hygiene (TA-4 — the stored `atomDiff` is WRITE-ONLY to the schema) | api | **W1-api**, inside the module move | Q8 |
| `usePaletteStore` migration | demo | DORMANT | fires on first `version` bump past 1 |
| `proof:*` carry (**CHRONIC**) | repo | **W0-2** | Q13 split (retain-reclassify **5** → `test:dist` incl. `subpath-budget` [AMENDED-AT-HARDENING — M-16]; excise **7** + favicon script + `globals` devDep) |
| doc-truth set (DOC-1..13) | docs | W0-4 (pre-E-1-safe) + W9 rewrites | E-1 orphans demo/api CLAUDE.md as DOCUMENTS — full rewrites post-restructure, not diffs |
| oracle-floor blindness (F3/F4) | demo | **W0-5** | MUST precede W2 and E-7 |
| FN-7 · kf `resolveEasing` · CH-10/CH-13/R8-23/R-5/R-10 (**CHRONIC**) | cross-repo | W9 KEEP-BOOKED + spec-status recheck | no fired-but-unnoticed trigger (re-verified) |
| Discharged-in-S set | — | NOT re-folded | recorded for zero-drop |

### §7.2 T-minted books (the producer-consume swap set + watches)

| Book | Trigger | Disposition |
|---|---|---|
| W3-1 interim demo `--well-bg` → the P3 WELL rung | P3 lands | booked swap; fires at W7 (or earlier if the file:-pin surfaces it) |
| W3-3 interim search seat → the P3 seated field-chrome rung | P3 lands | booked swap |
| W3-4 demo feather carried → the P3 rest-floor + bottom-feather knobs | P3 lands | booked swap; the F3 layout-animation fork retires onto the producer scroll grammar |
| W4-4 interim seal-recipe letter ring → the P5 letter-rail primitive | P5 lands | booked swap |
| W4-5 wall-clock park → park-only-from-`settled` (P6 seam) | P6 lands | booked swap |
| W2-4 emerge beat on the FSM's existing `emerging` state → the P6 **row-F arrival pose** [AMENDED-AT-HARDENING — M-14: the book pointed at a P6 row that did not exist; row F is now authored in the letter as an OPTIONAL upgrade, the FSM `emerging` state the sanctioned interim] | P6 row-F lands | booked swap |
| W2-3 dock `transitionend` reveal veil → the P7 **arrive-expanded hook** (`morph-settled` event/attr or mount-at-pill) [AMENDED-AT-HARDENING — M-14: the ownership map's second dropped producer ask, now in P7-L13; the interim is a recorded booked-interim, not a workaround] | P7 arrive-expanded lands | booked swap |
| **Q12-ALTERNATIVE (conditional)**: the fitted seal-ring → the P5 solid-ring register consumed on the wax [AMENDED-AT-HARDENING — M-6: the alternative arm had no landing site] | P5 lands AND Q12 rules the fitted arm | conditional consume; fires at W7 (the W7 P-7 conditional row) |
| W6-3 regex-driven autoplay → deleted the day P7's declarative `autoplay`/`playing` door lands | P7 lands | booked deletion |
| O-16 R1 row (bare-utility default) **EXPECTED-RED** | PKT-1 lands | goes live the day it lands; the red carries the packet cite, never weakened |
| W5 Tranche B (R6/R7 compositor collapses) | PKT-3 lands | left untouched, never retimed on layout props, until then (PI-5) |
| `.underline-tabs` MARKER (`style.css:476-484`) + A6 `backdrop-filter:none` MARKER retire-checks | P7 base-Tabs `underline` variant ships or PaletteDialog migrates; P8 minifier fix | retire-checks at W7 (legacy-sweep F6/F7) |
| `/easing` 17th-subpath GAP-3 verify-watch | the WS12 export regen | P9-J3 row [AMENDED-AT-PASS-2] |
| `easing.ts` @643 | — | watch-only (§5.3: do NOT over-restructure) |
| Q16 candidates: `EmptyState` + the picker action controls | the producer's ≥2-consumer call | flagged in the letter; until answered `EmptyState` lifts to a shared demo atom, the action controls stay picker exports via the hardened barrel |

**Cross-repo dispatches**: `letters/GLASSUI-T-ASKS.md` (P1–P10 + the KF note) — AUTHORED,
**dispatched AT ratification (W0-1)**; the dispatcher re-stamps the verified producer HEAD
(`<RE-STAMP AT DISPATCH>` placeholder in the letter); P9 named FIRST (W-1/W-2 are OPEN but LAST).
fourier / parse-that: nothing new on T's account.

---

## §8 — Process laws (E-6 · E-7 · the precept slate)

- **E-6 (verbatim law)**: core model for orchestration, design, synthesis — **all design routed
  through Fable + the frontend-design plugin**; defer to Opus or Sonnet for workflow fanout;
  **batches of three agents in parallel** (rate-limit walls); development only,
  ratification-gated.
- **E-7**: T.W8 is the standing late-stage hardening/critique wave — per-surface Fable +
  frontend-design critique passes as a coherence PRE-FILTER only; **the terminal taste authority
  is OWNER RATIFICATION** (the S taste-by-proxy disease must not recur); every taste axis
  presented as a BRACKET with both poles named, never a point value.
- **Per-wave standing gates**: PP-8 repo-wide sweep (caps recomputed post-move · legacy grep ·
  as-any ledger regenerated · `*.log` residue grep [AMENDED-AT-HARDENING — h-gaps G-12]) in EVERY
  wave gate · PI-1 per-wave Lighthouse delta recorded · the
  §6.2 CSS-byte tripwire REDS W3/W4/W5 at >120 KiB gz · PP-11 wave-open re-anchoring against the
  W1 MOVE-MAP (every lane re-derives its `file:line` anchors at wave-open) · the §3.2
  single-writer laws · π-class visual evidence per design wave, assembled into the W8 owner
  package · **the §Recovery rider** (below) carried by every wave doc — the wave-close seam-audit
  is a gate step · **the tool-artefact grep** `grep -rnE '</?(content|invoke|parameter|antml)'`
  over the wave's touched docs MUST be empty before any docs commit (the committed-tool-XML
  partial-completion class `git diff --check` cannot see — M-1; three such seams shipped during
  T's own authoring).
- **THE §RECOVERY RIDER (STANDING WAVE LAW — PP-14/PP-15 operationalized; M-29/h-exec-recovery)**
  [AMENDED-AT-HARDENING]: E-6's batches-of-three is the PREVENTION half (fewer walls); this is the
  CURE half — a wall WILL fall anyway, and every wave doc carries a §Recovery section binding
  every dispatch AND resume. The four-step completion-brief protocol: **(1) AUDIT THE PARTIAL** —
  on resume read, in order: `git status --porcelain` + `git diff` of the dying lane's tree (the
  uncommitted delta IS the partial); `git log` since the wave head (the committed rows are the
  recovery-clean ground — §Commit plan is the journal-of-record); the lane journal (scratchpad
  notes + the dying agent's last observation); the wave's §Scope table (last-done vs next).
  RE-VERIFY every substrate anchor, sibling-lane presence claim, and producer HEAD-stamp against
  the CURRENT tree — the dying agent's cited state is a hint, never inherited (PP-11; the
  plan-audit-2 frozen-claim class). NEVER `git commit` the dying tree sight-unseen. **(2) WRITE
  THE PATCH BRIEF** — `docs/tranches/T/audit/recovery/T.W<n>-<lane>-brief-<date>.md`: LANDED (by
  hash) · IN-FLIGHT (coherent-and-finishable OR a half-step to DISCARD) · the last observation ·
  the NEXT work-order. **(3) RESUME FROM THE WORK-ORDER, not from scratch** — same lane, same
  §Lane-order/§Forced-order; resume the harness run where a handle exists
  (`resumeFromRunId`-class), else the brief is the continuity; a half-step that cannot finish
  coherently is DISCARDED and re-driven, never committed as-is (E-3). **(4) SEAM-AUDIT AT WAVE
  CLOSE (a §Hard-gate row)** — tool-artefact grep empty · substrate/sibling claims re-verified
  against the current tree · every recovery/verify assertion NAMES its command + output (never a
  bare "audited, found faithful" — the PROGRESS.md:108 over-claim class) · `git worktree list` =
  the wave's expected lanes only · the wave's own structural invariant re-checked as a
  partial-detector (the per-wave §Recovery deltas in each wave doc). A wave that recovers a
  partial it cannot fully finish NAMES the residual (PP-16), never silently reconciled to green.
- **The foreign-tree fence**: T touches ZERO glass-ui/keyframes files; E-2 speaks in packets;
  PRM-expand routes to keyframes, never the glass-ui letter (the consolidation law).
- **The precept slate** (t-precepts-recap §A–§E, lifted; the full text + provenance is the lane
  doc — binding as written there). The §E compact ledger, verbatim:

| ID | Precept (one line) | Kind |
|---|---|---|
| PP-1 | No workarounds — gestalt-only, transposition welcome | process |
| PP-2 | No fallbacks — the honest failure state | process |
| PP-3 | No legacy — migrate at the root, no shim | process |
| PP-4 | Breaking changes fine — cut the major | process |
| PP-5 | Books, never gates — qualified [AMENDED-AT-HARDENING — h-precepts HP-3]: no gate reads books as pass/fail; named EXPECTED-RED rows appear in gates as honest-red RECORDS with packet cites | process |
| PP-6 | Certify in the amended tree | process |
| PP-7 | Never silently regolden | process |
| **PP-8** | **Repo-wide sweep in EVERY wave gate** (NEW, S-minted) | process |
| **PP-9** | **Integration-row MET cites the integrated surface** (NEW, S-minted) | process |
| PP-10 | Bounded numbers + recorded baselines | process |
| PP-11 | Resolve against the live tree; HEAD-stamp producer claims | process |
| PP-12 | Test comments are not filings | process |
| PP-13 | The gate judges the recalibrated bar | process |
| PP-14 | Lane-death recovery — finish from the journal | process |
| PP-15 | Harness waits must hard-fail | process |
| PP-16 | The naming law — misses named, never silently reconciled | process |
| PR-1 | No god modules — demo ≤400 / api ≤350 / src cohesion-ledger | product |
| PR-2 | Root-fix at the producer (glass-ui or herein) | product |
| PR-3 | Zero per-instance overrides — token at the root | product |
| PR-4 | Error ≠ empty (loading ≠ empty) | product |
| PR-5 | One ink for type; hue on color-data surfaces | product |
| PR-6 | Minimize `as any` / `as unknown as`; count regenerable | product |
| PR-7 | Preserve animations — move/tokenize, never delete | product |
| PR-8 | Named exports only; colocation is the directory law | product |

---

## §9 — Lessons carried (S §13 unamended + the T-development additions)

**S §13 carries whole** (the R lessons ride inside it). [AMENDED-AT-HARDENING — h-precepts HP-2,
the bridging clause: `S/FINAL.md §7`'s S-execution lesson tier maps onto the precept slate —
integration-verification → PP-9 · recalibrated-bar → PP-13 · lane-death recovery → PP-14/§8's
rider · repo-wide sweeps → PP-8 · harness waits → PP-15 · single-writer contention → §3.2.] The
numbered carry: 1 resolve contradictions against the LIVE
tree · 2 wave-green ≠ repo-green (→ PP-8) · 3 producer drift is a designed-for condition
(HEAD-stamps) · 4 books discharge silently unless re-checked (→ W9 re-probe) · 5 test comments
are not filings · 6 lane-death recovery from the journal · 7 shared-browser contention corrupts
probes · 8 bounded numbers + recorded baselines · 9 present-tense producer claims carry a
HEAD-stamp or are phrased as intent · 10 census claims propagate — spot-verify at the consuming
clause · 11 "Breaking changes are fine: always" — cut the major.

**T-development additions**:

12. **Taste-by-proxy is the disease; taste-by-ratification is the cure.** A non-authoring Fable
    review is a coherence pre-filter, never a taste terminal — W7-1's π-certified "INTENTIONAL"
    rim was overruled by the owner within a day (R9). The owner is the terminal authority; W8's
    package presents brackets, not points.
13. **An owner overrule of gate-green work is a SPEC RETIREMENT, encoded by name (§4)** — never
    re-litigated as a bug, never "restored" by a future audit, and never over-deleted (each row
    names what SURVIVES).
14. **The S verification failure shapes were named-site-not-population and proxy-predicates.**
    Every T oracle mint (§6) names which of the two it repairs; a gate that samples one named
    site or asserts a proxy (draw-call counts, token-level checks under a dist clobber) is not a
    gate.
15. **Owner-word re-cuts surface for ratification, never settle silently** (pass-2 law;
    [AMENDED-AT-HARDENING — h-owner-words F1/F2: the example set expanded to the FULL census —
    the old three-item list was itself an undercount]): the complete re-cut census — T-5 "little
    glass card" → WELL (rides **Q4**) · T-2 "1.5×" → ×φ (rides **Q11a**) · T-10 "rainbow" → chip
    (**Q5** LEADS with the owner-verbatim reading) · T-8 "higher z than all" → content-top
    (**Q3b**) · T-10/T-24 "white/black"+"gray/black/white" → warm neutrals (**Q18**) · T-19 "in
    all cases" → all EMPTY permutations (the §12 rider annex, flagged for assent) · E-1 "wildly
    re-structured" → bounded whole-tree re-shape (reconciled in SYNTHESIS §5.4, no Q — the
    engineering reading argued in place). The re-cut is argued in the table the owner rules on.
16. **The shot-map is best-effort — forensics re-derives shot↔finding by READING the images**
    (the +1 mislabel across `t-2002-09`→`t-2004-32` survived into the mandate; three lanes caught
    it independently).
17. **Delivery ≠ disposition.** A producer ask fold-claimed to another workstream (W-DESHADCN)
    is re-asked BY NAME until verified landed at HEAD; L8 reached its 5th booking this way.
18. **Class findings before routing them** (A/B/C/D): the A-set indicts the verification method,
    the B-set indicts nothing, the C/D-sets route to their owners. Mis-filing a bug as taste
    buries a live prod defect (R11).

---

## §12 — THE RATIFICATION TABLE (SYNTHESIS §8 as-hardened, transcribed VERBATIM — the gate the owner rules on)

Every OPEN decision; **DEFAULT = the synthesis's recommendation**. The dispatch gate stays CLOSED
until every row is ruled; the owner's verbatim rulings will be encoded in a
`audit/RATIFICATION-<date>.md` whose §0 wins over everything (the S precedent). Ratifying Q11a
ratifies ×φ (D2); ratifying Q4 settles the console WELL (D5); ratifying Q18 settles the C3 law +
the neutral family (D1). [CHANGED-AT-HARDENING — the slate is **19 rows** (was Q1–Q17): Q11 split
into Q11a/Q11b, Q3b + Q18 added, Q5's DEFAULT re-cut owner-verbatim-first, Q15's set corrected to
7 — every changed row is marked in the table below so the owner sees the deltas.]

| Q | Question | DEFAULT (why) | Live alternatives |
|---|---|---|---|
| **Q1** | Colocation sequencing: restructure before or after the design waves? | **BEFORE (W1)** — new design code is born colocated; the restructure is mechanical + hard-gated; MOVE-MAP + wave-open re-anchoring absorb the stale-cite cost (§3) | (a) AFTER the design waves (anchors stay live; new code moves twice); (b) interleaved per-surface (maximum churn — rejected) |
| **Q2** | The T-26 in-bracket landing point (see the Q2 ANNEX below — boot fade + settle, disclosed) | the D4/t-aurora spec: chroma-adaptive hueSpread [24°,64°] · energy **0.76** · ONE counterpoint stop (+165°, 0.6×C) · softmaxBeta 4 · breath 26s — a full composition inside the bracket, judged by eye across green/warm/neutral seeds AFTER W2-1; the Q2-NOW (demo knobs) / Q2-FULL (P1-gated, W7 re-judge) split marked at W2-5 | energy-only step (0.74–0.78, no counterpoint — safer, may under-deliver "noticeable"); wider fan only; defer the counterpoint to a second calibration |
| **Q3** | The blob seat: flush or corner-kiss? | **flush** (`--blob-seat: 0`) — containment identity holds by construction; the knob stays for the in-wave taste pass; the CORNER is confirmed here too: anchor top-right, the mass pulled inward — the relative reading of "down and to the left" (t-blob-hero argues it; h-owner-words N1) | small negative seat (a trace of corner break) — re-admits partial overflow; must re-prove no-clip at 390 |
| **Q3b** [CHANGED-AT-HARDENING — NEW; the authoring lane wrote "Interpretation note FOR RATIFICATION" and the synthesis dropped the ask — h-mandate-trace H-1 ≡ h-q-table F3(a) ≡ h-owner-words F2.2] | The blob z-order: what does the owner's "higher z than all" (T-8) mean? | **content-stack top, chrome above** (`--z-ornament` = top of the CONTENT stack; the dock/menus stay above) — immaterial under the flush seat (the two readings never conflict in paint), and chrome-under-ornament would break every menu | true top-of-all (the blob paints OVER the dock and menus — the literal reading) |
| **Q4** | Material-ladder rung assignments needing taste sign-off — **(rule per-surface; the alternatives are independent — the four assignments are separable)** [ANNOTATED-AT-HARDENING — h-q-table F6] | the t-card-material §3 + census §4 table; specifically: gradient perceived-space plate DROPS to well (the nested double-stamp dies) · eyedropper overlay stays chrome · PaletteCard = well · the sliders console = rung-2 WELL (an owner-word re-cut — the owner said "a little glass card"; D1 cuts a card-in-a-plate as a tone, not a second glass — AMENDED-AT-PASS-2) | keep the perceived-space plate at full cartoon (2 protagonists per pane — against the shadow budget); PaletteCard at a mid-rung; the owner-literal quiet-GLASS console card (re-admits glass-in-plate **AND un-bounds the console ground — certified ink must then thread live composited lightness; the WELL's determinism is what makes T-5's contrast cure closed-form** [ANNOTATED-AT-HARDENING — h-refine-console F-3: the alternative's price stated]) |
| **Q5** [CHANGED-AT-HARDENING — h-q-table F2: the old DEFAULT recommended the un-ratified C3 re-cut AGAINST the owner's literal "Only Palettes should be rainbow", and the chip may not even read as rainbow — 5 saved blues render 5 blues] | The Palettes rainbow form (T-10) | **The owner-verbatim GUARDED LETTERFORM RAMP presented FIRST/co-equal**: `background-clip:text` on a derived + contrast-guarded ramp (the accessible descendant of the pre-S `pastel-rainbow-text` the owner remembers; encoded as a sanctioned C3-ledger exception if picked). **The data-strip chip is the C3-motivated re-cut the owner may decline**: a 5-segment miniature palette (the user's current palette when present) — color-as-DATA, unifies T-10 with T-17. The contrast guard binds either way. The chip's no-palette fallback has two arms, ruled inside this row [h-refine-console F-8]: a full-wheel 5-stop sample (72° steps through the guarded pipeline — honestly a rainbow) vs no-chip-without-a-palette (fall to the letterform/plain ink); the chip's O-14 referent: stops ≡ the saved palette bytes when present, else ≡ the named fallback resolver's output | (the two arms above ARE the row's alternatives — the ruling picks letterform vs chip, and if chip, the fallback arm) |
| **Q6** | E-7 depth | ONE late wave (W8): per-surface critique passes (batches of 3) → remediation lanes → ONE owner certification package; owner = terminal authority, brackets not points | two-stage (a mid-tranche checkpoint after W4 + the close pass) — catches drift earlier, costs a wave |
| **Q7** | Packet-dispatch timing | **at ratification (W0-1), immediately** — WS12/B4e are OPEN but are the LAST window; the W-3 behavior packets unblock T's own waves via the file:-pin; P9 named first | hold until the BG frontier quiets **(alt precluded by the one-migration edict — a missed W-1/W-2 is a post-5.0.0 second break event; recorded for completeness, not genuinely live** [ANNOTATED-AT-HARDENING — h-q-table F5]) |
| **Q8** | The api-hygiene excision depth | **full TA-4**: routes + services + validation + meta rows + the fork↔remix fold + drop `PaletteVersion.atomDiff` + `lib/crud/atomdiff.ts` (KEEP `computeAtomSetHash`); inside W1-api | routes-only **(alt precluded by E-3 — it leaves the write-only column, the exact violation TA-4 proved reaches the schema; recorded for completeness** [ANNOTATED-AT-HARDENING — h-q-table F5]) |
| **Q9** | Header material authority (C2) — **the bracket's UNIT fixed** [ANNOTATED-AT-HARDENING — h-refine-doctrine F-9]: **the ratified frame is the EFFECT bracket — rest adds 27–39% card material over the wash plate** (= 0.45–0.65 of the stuck 60%-`--card` veil); the interim demo veil tunes inside it directly; the producer rest-floor knob (P3) is ACCEPTED iff the `quiet`-rung rest composites inside the SAME bracket; O-11 gate-3's ink floor referent = the D6/O-18 certified rung | **the ladder** — rest = quiet-derived fill inside the eye bracket [0.45, 0.65 of the veil], stuck = floating+tint rung-climb; feather at every state; expressed AS ladder rungs, not an off-ladder alpha fade | the independent `veil-surface` alpha-fade (re-mints the off-ladder-material class T-CM-4 indicts) |
| **Q10** [ANNOTATED-AT-HARDENING: now the SCOPE sub-clause of Q18 — rule them together] | Does Tools/Login live-accent CHROME fall under "the rest white/black"? | **NO** — the owner's line is menu-scoped; chrome keeps the live accent (W7-4's surviving voice map); ruled here rather than silently widened | extend the ink law to chrome (kills the dock's one chromatic naming point — the white/black menu's counterweight) |
| **Q11a** [CHANGED-AT-HARDENING — h-q-table F1: the old Q11 bundled the ×φ SIZE re-cut of the owner's explicit "1.5×" with unrelated line-lock mechanics — one answer forced across two axes, the owner's own number buried under a mechanics title] | **The ×φ size reading** — the D2 owner-word re-cut of the literal "1.5× on our golden scale", governing the picker title, the pane titles, AND the readout (T-2 + T-7) | **×φ** (two token steps = ×1.618; \|ln1.5−lnφ\|=0.076 < \|ln1.5−ln√φ\|=0.165 — every landing an exact shipped token) | the literal ×1.5 (mints a non-token size off the golden scale the owner invoked); one step √φ≈1.27 (under-delivers the owner's size intent) |
| **Q11b** [CHANGED-AT-HARDENING — the mechanics half of the old Q11] | Readout line-lock levers (T-7 at the ruled size) | levers **1+2** (per-space integer least-counts + the fit clamp), lever **3** for lab-class (honest 2-line locks; ictcp/jzazbz 2-line at <sm); lever 1 is REQUIRED at 390 | blanket 2-line everywhere; hold lab at 1-decimal one-line via fit-down ~×1.08 |
| **Q12** | T-28: abrogate vs fitted ring | **ABROGATE at the seal** — wax + glyph already carry identity; a third concentric boundary at 40px is over-drawing, and the geometric one can never fit; the producer solid-ring register (P5) becomes the standing law for any future ring | consume the fitted producer ring on the wax (once P5 ships) — a ring, correctly seated **(the alternative arm now has a landing site: the §7.2 conditional row + the W7 P-7 conditional — the row is honest, no re-rule needed** [ANNOTATED-AT-HARDENING — M-6]) |
| **Q13** | The proof:* split | legacy-sweep F5: retain-reclassify 4 dist-behavioral gates into CI-wired `test:dist`; excise 8 + the favicon script; CLAUDE.md names which batch retired. **[ANNOTATED-AT-HARDENING — if M-16's retain-5/excise-7 is taken (the `proof:subpath-budget` bundle-trace folds into `test:dist` as the 5th gate, giving the W1-src parse-that-free invariant its asserted home), the split arithmetic updates 4→5 retained; default unchanged in kind]** | excise all 12 (simplest; loses real dist-level round-trip/perf coverage vitest doesn't reach) |
| **Q14** | The Lighthouse LCP/TBT record disposition — **the adjudication weighs the owner's own paramount framing: E-3 names "elegance, simplicity, and performance ABOVE ALL"** [ANNOTATED-AT-HARDENING — h-mandate-trace H-2: the one axis left red-and-deferred carries the owner's strongest intensifier] | keep the budgets RED + the per-wave delta ledger; adjudicate budget/preset pairing WITH the owner at W8/W9 (lab-mobile field thresholds on a KaTeX+WebGL SPA may be mis-paired — but TBT 19× is also a real payload finding RP-2/L20 partially answers) | re-baseline now (premature — no delta history yet); desktop preset now (loses the mobile signal) |
| **Q15** [CHANGED-AT-HARDENING — h-wave-w0-w1 M2: the live demo leaks SEVEN symbols with no public home, not 5; the count is regenerable] | The **7** leaked conversion primitives' citizenship (src §2) | **promote** the genuinely-useful leaves (`linearToSrgb`, `hsl2rgb`, `oklch2xyz`/`xyz2rgb`, `hex2rgb`, **+ `getColorSpaceBound` (5 sites) + `oklabToLinearSRGBInto` (2 hot-paint sites — squarely this row's own per-pixel rationale)**) into the `/color` subpath + index with a MIGRATION note — they are real API the demo proved demand for; additions the additive-only gate permits | keep internal; the demo re-derives via `color2()` (slower on hot paint paths — the gamut overlay samples per-pixel) |
| **Q16** | `EmptyState` + picker action controls: glass-ui primitives? | flag both in the packet letter as CANDIDATES (producer's call); until answered, `EmptyState` lifts to a shared demo atom, the action controls stay picker exports consumed via the hardened barrel | force the producer ask now (pre-empts the producer's own ≥2-consumer bar) |
| **Q17** | Backend naming + test policy | `modules/` + `platform/`; colocated `__tests__/` per module + a NAMED `test/conformance/` exception (contract suites) | `features/`+`core/`; full colocation including conformance |
| **Q18** [CHANGED-AT-HARDENING — NEW; h-owner-words F1 + h-q-table F4: the C3 law + its whole exception ledger is corpus-invented doctrine overriding several owner findings, and the owner's literal "white/black" (T-10) + "gray/black/white" (T-24) land as WARM neutrals with raw #fff/#000 refused — the tranche's largest surface class, previously with no Q] | **The C3 law + the neutral family**: ratify (a) "color appears only as color DATA; chrome/material/type are neutral" AND (b) its COMPLETE sanctioned-exception ledger — ramps · dots · palette strips/chips · gamut netting · aurora field · blob · Palettes-rainbow (per Q5's ruled form) · admin-gold · **the `--accent-view` navigation-ring family (expanded-trigger ring + the W4-4 letter-rail; the seal rim struck per R9/Q12)** [h-refine-console F-4] — AND (c) the neutral family's FORM. **Q10 becomes this row's scope sub-clause** (does Tools/Login chrome fall under "the rest white/black"? — ruled NO by its own row) | FORM default: **the house WARM cream/brown family + stone-ink `rgb(28,25,23)`/`rgb(233,230,226)`** (matches the app's existing atmosphere/`--card` tone; raw #fff/#000 only inside color-math ramps) | the owner-literal **neutral-gray/white/black family** (per the owner's own words "gray", "white", "black"); or strike any ledger row (e.g. rule the letter-rail ring neutral — the accent-vs-neutral rail is optionally a W8 bracket) |

**ANNEX — Q2 (boot fade + settle; disclosed per lesson 15** [h-q-table F3(b) + h-refine-overture
F-10]**)**: the T-27 re-cut runs partly OPPOSITE the owner's literal "too slow" — the field fade
DOUBLED 0.45→0.9s (the design's position: "slow" was the freeze/pile-up, not the fade; the 0.45s
fade completed before the eye registered the ground), and total settle moves ~1.0s → a **[1.4,
1.7]s bracket BY DESIGN** (perceived speed is cadence-coherence, not wall-clock). Presented AS a
bracket in the W8 package with before/after screencasts side-by-side; ruling Q2 with this annex
ratifies the position.

**ANNEX — rider lines for explicit owner assent** [h-refine-console F-6 · h-q-table F7]:
(i) **T-19 "in all cases"** is read as all EMPTY permutations (first-visit, deletion-to-zero,
tab/filter); error states keep the plain register (PR-4) — an owner-word narrowing, flagged.
(ii) **Fraunces self-host**: if self-hosting is REFUSED, the readout digits re-voice to Fira Code
— that fallback becomes a ruling, not an implementer's call (t-title-typography F5).

---

*Provenance: this charter transcribes `audit/SYNTHESIS.md` as-amended (pass-2, `2a38c11`); the
synthesis cites its authoring lanes, and the lanes carry the `file:line` evidence + live-probe
records. `MANDATE-2026-07-06.md §0` + addenda remain the ceiling over all of it.*
