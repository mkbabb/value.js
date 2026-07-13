# Hardening — lane `h-wave-w6-w7` (T.W6 + T.W7)

Adversarial re-verification of `waves/T.W6.md` + `waves/T.W7.md` against their specs-of-record
(`audit/SYNTHESIS.md §3`/§4, `T.md §4`/§7.2/§12), the handed `docs/tranches/S/waves/S.W8.md`, and
the LIVE demo tree (post-move symbol homes). Charge: re-verify W6's amended 8-item/4-lane writer
map (totality + disjointness); the Q5/Q12 both-paths plumbing; the W0-1 byte-preserved claim; W7 =
S.W8-intact + the T payload (diff); the L20+GAP-L5 TOGETHER law + RP-2 gate note.

**Verdict**: totality of the W6 map is SOUND (G{1,2}·E{3}·D{4,6,7,8}·N{5} = all 8, no double-write);
the L20+GAP-L5 TOGETHER law + RP-2 note are THOROUGHLY plumbed (P-3 / hard-gate-4 / no-workaround /
triumvirate / commit-plan — five reinforcing statements, "third tranche" count correct against S.W3
origin); Q5 both-paths carried with file homes. But TWO must-fix defects break disjointness and the
Q12 both-paths requirement, plus four should-fix seams in the S→T carry and the retirement naming.

---

## MUSTFIX-1 — W6-4's O-13 slim must edit boot-chain files that W6 §File bounds forbids touching

**Severity**: MUSTFIX
**Location**: `waves/T.W6.md:84` (Lane D file bounds) vs `:99` (Do-NOT-touch list); `:56` (W6-4 dies-set)

W6-4's R1 slim (line 56) DELETES `resolveViewAccentTokens` · `PRIMARY_VIEW_SHIFTS` · `PRIMARY_VIEW_IDS`.
Live-tree homes (post-W1 colocation into `app/composables/boot/` per SYNTHESIS §5.1:425 + T.W2:86):
- `resolveViewAccentTokens` → `demo/@/lib/view-accents.ts:210` → moves to `boot/view-accents.ts`
- `PRIMARY_VIEW_SHIFTS` (`useViewAccents.ts:55`) + `PRIMARY_VIEW_IDS` (`useViewAccents.ts:50`) → `boot/useViewAccents.ts`

T.W2:86 makes `useViewAccents` + `view-accents` W2's single-writer boot surface; SYNTHESIS §5.1:425
names them "the W2 subject." W6.md:84 lists "view-accents (the O-13 slim, same commit)" as a **Lane D
writable file**, but W6.md:99 forbids "the boot chain (W2's, closed)" — which, after the MOVE-MAP,
**contains those exact files**. The doc places the O-13 slim's targets on BOTH the writable list and
the forbidden list. Second facet: Lane D bounds name only "view-accents" (singular = the lib), but the
slim also edits `useViewAccents.ts` (the composable, where `PRIMARY_VIEW_SHIFTS`/`_IDS` live) — an
unnamed boot file. A lane agent reading "Do NOT touch the boot chain" HALTS on the O-13 slim, or a
reviewer flags the slim as a boot-chain violation. W2 is round-2-closed so there is no live-writer
collision — this is a pure doc self-contradiction, but it blocks the AT-RISK O-13 same-commit slim.

**Amendment**: carve the O-13 slim OUT of the boot-chain prohibition explicitly — e.g. line 99:
"…the boot chain (W2's, closed) **EXCEPT the O-13 view-accents slim: Lane D deletes
`resolveViewAccentTokens` from `boot/view-accents.ts` + `PRIMARY_VIEW_SHIFTS`/`_IDS` from
`boot/useViewAccents.ts`, same commit as the T-10 excise; the R1 SURVIVES set
(`resolveViewAccent`/`resolveSealInk`/`@property` sweep/WCAG math) is preserved byte-identical**…".
Name `useViewAccents.ts` alongside `view-accents.ts` in the Lane D file-bounds row (line 84).

---

## MUSTFIX-2 — the Q12 alternative (fitted ring) has NO landing site; the both-paths thread is dropped in the live routing

**Severity**: MUSTFIX (the exact "does the doc carry both paths?" charge)
**Location**: `waves/T.W6.md:177` (§BOOKS promise) vs `T.md §7.2` (live routing) + `waves/T.W7.md:70` (P-7)

Q12 default = **ABROGATE** at the seal (fully plumbed: W6-7 line 59, goal line 29, no-workaround
135-137). The alternative = "consume the fitted producer ring on the wax (once P5 ships)" (T.md §12
Q12). W6.md:177 promises: "the fitted-ring alternative **consumes it at W7 only if Q12 rules that
arm**." But:
- **T.md §7.2** (declared the authoritative live routing that "supersedes S/FINAL.md §5") has NO
  seal-ring consume row. Its only P5 row is "W4-4 interim seal-recipe **letter ring** → the P5
  **letter-rail primitive**" — a DIFFERENT P5 rung (the dock view-select rail, not the wax solid-ring
  register).
- **W7.md P-7 (line 70)** carries the same "W4-4 seal-recipe letter ring → P5 letter-rail primitive"
  and no seal solid-ring consume. W7 §BOOKS ("every §7.2 row fires here") therefore fires nothing for
  the seal ring, because §7.2 books nothing.

If the owner rules the Q12 alternative, the fitted ring never lands — a silent partial. (The R9
die-rim cure in W6-7 lands regardless, so the visible defect is fixed either way; but the ALTERNATIVE
path is genuinely unhomed, whereas the Q5 alternative — letterform-ramp — has a home in the same Lane
D chip module.) The book lives ONLY in W6 §BOOKS prose, never in the routing table or the executing
wave.

**Amendment**: add a T.md §7.2 row — "Q12-alternative fitted seal-ring → the P5 WatercolorDot
solid-ring register | P5 lands **AND** Q12 rules the fitted arm | booked swap; fires at W7" — and
carry a conditional row in W7.md P-7 ("iff Q12 ruled the fitted arm: consume the P5 solid-ring
register on the wax; else the register stays the standing-law book only").

---

## SHOULDFIX-3 — W7 mis-paths its own standing spec as `waves/S.W8.md` (×5); the file is `S/waves/S.W8.md`

**Severity**: SHOULDFIX
**Location**: `waves/T.W7.md:11, 33, 52, 178` (+ title/prose)

W7 is 100% predicated on executing `S.W8.md` INTACT and cites it 5× as bare `waves/S.W8.md`. From
`docs/tranches/T/waves/T.W7.md`, that relative path resolves to `docs/tranches/T/waves/S.W8.md` —
**which does not exist**. The file is `docs/tranches/S/waves/S.W8.md`. The SAME W7 header (line 14,
181) correctly uses the tranche-prefixed `S/FINAL.md §5`; the corpus elsewhere writes the full
`docs/tranches/S/waves/S.W1.md` (t-precepts-recap:462). So the convention exists and W7 breaks it for
its load-bearing spec-of-record. A reader/agent following the cite lands nowhere.

**Amendment**: replace every `waves/S.W8.md` in W7 with `S/waves/S.W8.md` (matching the `S/FINAL.md`
convention already in the same file). Fix SYNTHESIS §3 T.W7 (`SYNTHESIS.md:350`) the same way — it is
the source of the W7 transcription and carries the same bare `waves/S.W8.md`.

---

## SHOULDFIX-4 — R5 retirement names only "9%/12%" but W6-1's R5 band recalibrates FIVE values (edge 45/65 + stripe 1.25px)

**Severity**: SHOULDFIX
**Location**: `T.md:304` (R5 "What RETIRES") vs `waves/T.W6.md:53` (W6-1) / `SYNTHESIS.md:340`

R5 (T.md §4) is classed "RECALIBRATION (intensity only)" and its "What RETIRES" column names exactly
"the 9%/12% intensity values." But the W6-1 R5 band is "(22%/28%/45%/65%/1.25px)" and the anchor
"9%→22% fg / 12%→28% bg / edge 45%/65% / 1.25px" changes FIVE values. Verified against the live tree
(`style.css:254-261`): `--gamut-hatch` 9%→22% and `--gamut-hatch-paper` 12%→28% ARE the named 9%/12%;
but `--gamut-edge` **28%→45%** (line 254) and `--gamut-edge-paper` **50%→65%** (line 258) plus the
stripe width (→1.25px) are ALSO recalibrated and are NOT named in R5's retirement column. The §4
preamble mandates "each is RETIRED BY NAME so no future audit 'restores' it" — naming 2 of 5 changed
values leaves the edge (28%/50%) values un-retired, exactly the restore-hazard §4 exists to prevent.

**Amendment**: expand R5's "What RETIRES" to the full band — "the 9%/12% hatch **+ the 28%/50% edge +
the stripe-width** intensity values (the whole subtle-register band)" — so every value the W6-1 recal
overwrites is named-retired.

---

## SHOULDFIX-5 — "S.W8 INTACT" imports S-wave-numbered producer-gap rows that are stale in T and never marked superseded

**Severity**: SHOULDFIX
**Location**: `waves/T.W7.md:52` ("execute `waves/S.W8.md §Scope` as written") vs `S/waves/S.W8.md:43-45`

S.W8 §Scope's second half is a producer-gap paragraph whose rows carry **S-wave attributions**: "L2
dark L band ≤0.42 (**W6-2/W6-3**) · L4 luma truth + the S-20 π re-check (**W7-3**) · L1 Safari aurora
(**W6-5**) · any L3/L5/L9/L10/L11 rows **W3/W5/W6** recorded" + "the §7.1 hard-gate map fallbacks." In
T those wave numbers mean different things (T.W6-2 = gradient instrument, T.W6-5 = generate verb,
there is no T.W7-3; T §7.1 = "inherited S books"). W7's PP-11 escape ("site list re-derived against
the MOVE-MAP") fixes FILE paths, not wave-number reinterpretation. W7's P-6 re-derives the GAP set as
GAP-ARM/GAP-L2/GAP-L5 — and note the **L-number collision**: S.W8's "L2 dark L band" ≠ T's "GAP-L2
variance atoms." So "execute §Scope as written" pulls S-context rows a T walker could conflate, and
the doc never says the S producer-gap paragraph is superseded by P-6.

**Amendment**: Segment-1 (line 52) should scope the INTACT execution to the **18-specifier walk only**
and add: "the S.W8 §Scope producer-gap paragraph (its S-wave-numbered L2/L4/L1 fallbacks + the §7.1
reference) is **S-context and SUPERSEDED by the T GAP re-verify in P-6**; do not re-derive S wave
numbers." (This is what the doc already does in spirit; make it explicit so the "as written" clause
does not import stale cross-refs.)

---

## SHOULDFIX-6 — "the W0-1 contract" is ambiguous: it is the S-inherited seed-rider-1, not T.W0-1 (packet dispatch)

**Severity**: SHOULDFIX
**Location**: `waves/T.W6.md:18, 37, 58, 72, 119, 131` ("the W0-1 contract byte-preserved", ×6)

W6-6 references "the W0-1 contract" six times as the misconfigured-state contract (transport latch,
synchronous `DevMisconfigError`, loud `console.error`, misconfigured ≠ unavailable). Per R10
(`T.md:309`) this is "**W0-1 seed-rider-1** (DevMisconfigBanner, App.vue:115)" — the S-inherited
S.W0-1 seed-rider. But in T's OWN numbering, **T.W0-1 = "Dispatch the E-2 packet series"**
(`T.W0.md:40`), an unrelated item. W6-6 drops the "seed-rider-1" qualifier, so "the W0-1 contract"
reads ambiguously against T.W0-1; a reader must trace to R10 to disambiguate. The byte-preserved claim
itself is sound and gated (Hard-gate-7 "R10 survives set verified live") — this is naming clarity,
not a logic defect.

**Amendment**: on first W6-6 use, write "the **W0-1 seed-rider-1** contract (R10; the S-inherited
DevMisconfig transport, not T.W0-1)" so the cross-tranche reference is unambiguous.

---

## NOTE-7 — "Q10 stands" (W6.md:133) is written as certain

The §No-workaround prohibition "Q10 stands: the Tools/Login live-accent CHROME is out of scope" reads
as a settled fact, though line 9's spec-of-record clause ("Q5/Q10/Q12 outcomes … as ratified — the
ratification record wins over the defaults quoted below") correctly subordinates it to the owner's
ruling. If the owner picks the Q10 alternative (extend the ink law to chrome), W6-4's nav voice
changes and this prohibition inverts. Recommend: "Q10 stands **(default; if the ratification record
rules the alternative, the ink law extends to chrome and this prohibition lifts)**." Both-paths for
Q10 are carried by the §12 reference; only the prose tone presumes the default.

## NOTE-8 — the style.css read-only callout under-describes the R1 survives region

W6.md:90-91's intra-wave clause names only "the surviving accent @223-224" as read-only, but the R1
survives set is the whole `--accent-view` registration + `@property` sweep (`style.css:157-224`).
Disjointness still holds (Lane G writes only @254-261, disjoint from 157-224), so this is descriptive,
not a collision — but the read-only region should be stated as @157-224 to match the survives set.

## NOTE-9 — W7 renames SYNTHESIS's "alpha-checker" MARKER to "A6 backdrop-filter:none MARKER"

SYNTHESIS §3 T.W7 (`:358`) says "alpha-checker + .underline-tabs MARKER retire-checks (legacy-sweep
**F7/F6**)"; W7 P-8 (`:71`) says ".underline-tabs … + the **A6 backdrop-filter:none** MARKER … F6/F7."
Verified consistent: t-legacy-sweep F7 = "alpha-checker `backdrop-filter` MARKER" (`style.css:486-501`)
= the demo-side workaround for the A6 minifier-drops-`backdrop-filter:none` bug, so alpha-checker ≡ A6
(F7) and .underline-tabs = F6 in both. The name-drift (alpha-checker → A6) is faithful but could
confuse; recommend W7 write "the alpha-checker / A6 `backdrop-filter:none` MARKER (F7)" to bind the two
names.

---

## Cross-checks that PASSED (recorded for the clean-bill evidence)

- **W6 map totality**: G{W6-1,W6-2}·E{W6-3}·D{W6-4,W6-6,W6-7,W6-8}·N{W6-5} = all 8 items, each once,
  no double-assignment. The AMENDED-AT-PASS-2 "W6-1 was unassigned" gap is closed (→ Lane G). Matches
  SYNTHESIS §3 T.W6 (`:333-337`) verbatim.
- **W6 file disjointness (non-boot)**: style.css region-split (G@254-261 write; D survives-set
  read-only) is genuinely disjoint from the @property sweep @157-224; `GenerateControls.vue`
  single-writer with the T-17-chip route-through-Lane-N clause; Dock.vue/GradientStopEditor.vue
  cross-wave (W5) coordinations recorded in both logs. Only the view-accents/boot conflict (MUSTFIX-1)
  breaks disjointness.
- **Q5 both-paths**: W6-4 carries default (data-strip chip) + alternative (letterform-ramp
  `background-clip:text`), both landing in the same Lane D STRIP/RAMP chip module; §12 reference wins.
- **W0-1 byte-preserved claim**: R10's survives set is transcribed faithfully into W6-6 + Hard-gate-7;
  the claim is behaviorally coherent (the contract logic is untouched; only the banner FORM dies) and
  gate-verified live. Sound (modulo the naming ambiguity, SHOULDFIX-6).
- **W7 = S.W8 payload diff**: the 18-specifier walk (incl. GooBlob→`Blob` rename BY NAME, no alias) is
  faithfully carried; the T payload P1–P9 matches SYNTHESIS §3 T.W7 (`:349-359`) with P-9 (O-16 R1 +
  W5 Tranche-B state) legitimately sourced from T.md §7.2. The booked interim swaps (W3-1/W3-3/W3-4/
  W4-4/W6-3) fire with in-commit interim deletion; O-8 goes live; MARKER retire-checks F6/F7 present.
- **L20+GAP-L5 TOGETHER + RP-2**: plumbed in FIVE places (P-3, Hard-gate-4, No-workaround, Triumvirate,
  Commit-plan — "one commit, the TOGETHER law made structural"). "the re-baseline carries a third
  tranche" count is correct: RP-2 born S.W3 (`S/FINAL.md:111`, "on-record re-baseline from W3"), stood
  at S close (1st tranche), T is the 2nd, an un-cleared partial carries to a 3rd.

---

**Counts**: MUSTFIX 2 · SHOULDFIX 4 · NOTE 3.
