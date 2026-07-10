# h-refine-console — REFINEMENT (design): T-5 plate+console · T-10/T-17 chip grammar · T-13/T-19 shadow-palette motion grammar

**Lane class**: hardening / refinement-design (zero product-code, zero corpus edits — findings only;
the amend pass owns folding). **Frontend-design bar governs every proposed amendment (E-6).**
**Substrate**: `tranche-t` @ `6563e53`.
**Product under audit**: the three design-spec clusters as they govern — **T-5** `SYNTHESIS §2 D5` +
`§3 W4-4/W4-3` + `T.md §2 D5/§12 Q4` + `waves/T.W4.md` (item 61, gates, prohibitions) + `P5`
(letter + §4) on the evidence of `t-sliders-hierarchy.md`; **T-10/T-17** `SYNTHESIS §1.2 rows
T-10/T-17` + `§3 W6-4` + `§12 Q5/Q10` + `waves/T.W6.md` (Lane D, file bounds, gates) on
`t-nav-dropdowns.md`; **T-13/T-19** `SYNTHESIS §2 D9` + `§3 W3-2` + `§6.1 O-9` + `waves/T.W3.md`
+ `§1.1 R7` on `t-shadow-palette.md`.
**Method**: (a) re-judge each spec at the frontend-design bar by composing the specified design
against the owner shots (`t-2000-41`, `t-2001-51`, `t-2007-15/18`, `t-2004-32`, `t-2005-53`,
`t-2008-34` — read from disk) and the live tree at HEAD (`ComponentSliders.vue`,
`SpectrumPlateCaption.vue`, `MixConfigBar.vue`, `GradientVisualizer.vue`, `AuroraPane.vue`,
`PaletteCardSkeleton.vue`, `EmptyState.vue`, `ExtractWorkbench.vue`, `MixSourceSelector.vue` —
line-verified this session); (b) verify BOTH Q-poles are carried wherever a Q rides the spec
(Q4 · Q5 · Q10 · Q12-adjacency); (c) walk each spec as an implementing writer would and mark every
spot where the writer stalls, mints unratified taste, or lands a gate-green regression.
**Non-duplication**: cross-cites and does NOT re-report `h-q-table` F2 (Q5 default vs owner word) /
F3 (silent re-cut class) / F4 (C3 un-ratified) / F6 (Q4 multi-part), `h-refine-doctrine` F-10 (WELL
sizing bracket) / N-2 (D9 breath amplitude), `h-wave-w6-w7` MUSTFIX-1 (O-13 slim bounds) + the
Q12-alternative booking hole, `h-packets` H-PKT-6 (P5's `38d83e4` cite). Every finding below is
net-new or an explicitly-marked complement.

**Bottom line**: all three clusters are strong design writing — D5's two-zone anatomy (bound the
ground, then the ink is computable) and D9's motion-axis re-cut (still = empty; motion = work) are
the corpus's cleanest gestalt arguments, and the T-17 truth law (byte-identity previews) is exactly
right. But the T-17 consume set is mis-routed at the file level in W6 (one wrong file, two unrouted
files — implementing lanes halt or violate bounds as written), and D9's load-bearing axis is
un-gated while the very register it orders consumed **ships breathing** (live-verified) — the exact
resurrection path of the twice-killed lie would pass O-9 green today. 2 MUSTFIX · 8 SHOULDFIX ·
5 NOTE, then §Q-POLES (the verification the lane was charged with) and §CLEAN.

---

## F-1 — MUSTFIX — W6's file bounds mis-route the T-17 chip consumes: the mix Selects are attributed to the WRONG file, and two consume surfaces (gradient, aurora-admin) have NO routed writer

**Evidence.** The T-17 consume set, per the governing evidence lane (`t-nav-dropdowns.md` F6/F7):
gradient Space/Hue Selects at `GradientVisualizer.vue:178-224`; mix Space/Hue Selects at
**`MixConfigBar.vue:56-84,92-100`**; AuroraPane's admin harmony Select as a STRIP family member
(`AuroraPane.vue:120-122`). All three live-verified at HEAD this session (`MixConfigBar.vue:56/:73`
Space+Hue Selects; `GradientVisualizer.vue:178+` Type/Space/Hue; `AuroraPane.vue:~115` harmony).
The wave doc's Lane D file row (`T.W6.md:84`) instead lists **`MixSourceSelector.vue` "(W6-7
verify; T-17 mix-Select chip consume)"** — but `MixSourceSelector.vue` contains **zero Selects**
(grep-verified; its only import in that family is `EmptyState`); the mix Selects are in
`MixConfigBar.vue`, which appears in NO lane's file table. `GradientVisualizer.vue` is Lane G's
file (`:82`), but Lane G's items (W6-1 netting, W6-2 instrument) carry no chip-consume content and
the one intra-wave routing clause (`:87-91`) names only `GenerateControls.vue` → Lane N.
`AuroraPane.vue` appears nowhere in W6. Under the wave's binding single-writer + Do-NOT-touch
discipline, a Lane D writer implementing T-17 either edits un-enumerated files (bounds violation)
or halts; the mix consume as written would be attempted against a file with nothing to consume.
(`h-wave-w6-w7` verified the map's *item* totality and praised the Lane-N clause — the *file*-level
consume set was not checked; this is net-new.)
**Corpus locations**: `waves/T.W6.md:84` (Lane D row) · `:82` (Lane G row) · `:87-91` (intra-wave
clause) · `audit/lanes/t-nav-dropdowns.md:159-161, 20 (F7 AuroraPane clause)`.
**Proposed amendment** (three edits to `T.W6.md`): (1) Lane D's row: strike the T-17 parenthetical
from `MixSourceSelector.vue` (it stays for the W6-7 verify only) and add **`MixConfigBar.vue`
(T-17 mix Space/Hue RAMP consume)**; (2) extend the intra-wave clause: *"`GradientVisualizer.vue`
has ONE writer — Lane G; T-17's gradient Space/Hue RAMP consume routes through Lane G's queue
(Lane D authors the chip module + spec), the exact GenerateControls/Lane-N shape"*; (3) add
**`AuroraPane.vue` (T-17 STRIP family member, admin harmony — t-nav F7)** to Lane D's row (it is
claimed by no other lane or wave), or explicitly defer it with a booked row if the amend pass
judges the admin surface out of W6's round.

## F-2 — MUSTFIX — O-9 has no MOTION leg, and the `specimen` register the spec orders consumed SHIPS BREATHING — the twice-killed loading-lie resurrection would pass the gate green

**Evidence.** D9's entire reconciliation (the owner's material overrule vs the S doctrine's
surviving semantics) hangs on the motion axis: *"true empty = STILL dashed ghost … STILL — motion
promises work; empty promises nothing"* (`t-shadow-palette.md:153`, transcribed at
`SYNTHESIS.md:214-220` / `T.md:198-204` / `T.W3.md:49`). O-9 as minted gates only presence +
semantics: *"zero-result ⇒ ghost present + `aria-hidden` + caption"* (`SYNTHESIS.md:507`,
`T.W3.md:117-119`) — no stillness predicate. Meanwhile the live register W3-2 is ordered to
consume (*"the `specimen` register FINALLY consumed"*) is **not still by construction**:
`PaletteCardSkeleton.vue:88` (live at HEAD) computes `blockVariant = variant === "developing" ?
"shimmer" : "breath"` — i.e. `shadow` AND **`specimen` both breathe** (the component's own comment:
*"`shadow`/`specimen` breathe (the 6s known-imminent rung)"*). A W3-2 writer who consumes the
register as shipped lands a ghost that breathes at true-empty rest — the exact "motion promising
work that isn't happening" the S wave killed twice (`e43601c`/`a34d20f`) and the owner then
overruled on material — and O-9 passes it (ghost present, aria-hidden, caption seated). This is
the proxy-predicate failure shape by the corpus's own definition (lesson 14): the gate samples
presence/aria and proxies away the axis the whole grammar is cut on.
**Corpus locations**: `audit/SYNTHESIS.md:507` (O-9 row) · `waves/T.W3.md:49, 117-119` ·
`T.md:198-204` · live `PaletteCardSkeleton.vue:79-107`.
**Proposed amendment**: (1) the O-9 row gains the motion leg: *"+ MOTION per species: the
true-empty ghost's computed animation is **none** (still at rest; response-motion on paired-CTA
hover only); breath/shimmer appear only under their species' state predicates; all species still
under PRM"*; (2) the W3-2 item row gains one clause: *"ShadowPalette consumes the `specimen` INK
recipe but NOT the host breath — the register's motion is re-cut still for the true-empty species
(the shipped `blockVariant` maps specimen→breath and must not be inherited)"*.

## F-3 — SHOULDFIX — Q4's console row: the alternative pole is under-carried and under-priced, and W4-4/W3 transcribe the default as already settled

**Evidence.** Both poles exist in the table (`T.md §12 Q4` / `SYNTHESIS §8`): default = rung-2
WELL; alternative = "the owner-literal quiet-GLASS console card (re-admits glass-in-plate)". But:
(a) the wave transcriptions speak in settled voice — `T.W4.md:61`: *"**C5 settles the material**:
rung-2 WELL, opaque tone-step, NO blur (the Q4 owner-word re-cut)"* — naming the re-cut without
the live alternative, and W4's header lacks the hedge W6's header carries verbatim (*"the
ratification record wins over the defaults quoted below"*, `T.W6.md:9-11`); if the owner rules the
quiet-glass arm, W4-4's binding item text contradicts the ruling on its face. (b) The alternative's
PRICE is stated nowhere in the Q4 row: D5's own load-bearing argument (*"Bounding the ground is
what makes the ink computable — one gestalt, not three patches"*, from t-sliders F-4) means the
quiet-glass arm un-bounds the console ground — the W4-4 gate's *"O-18 … fed the console's tier
lightness"* (`T.W4.md:112-114`) has no static referent under glass-over-live-field, and the D6
contract must then thread live composited lightness. An owner ruling on the row sees "re-admits
glass-in-plate" but not that the alternative re-opens the exact contrast fault (measured 1.01:1
dark, the T-5 defect itself) the WELL closes by construction. Both-poles carriage is my lane's
charge; the poles are present but of unequal quality (contrast `h-q-table` F6, which covers Q4's
multi-part bundling — this is the pole-quality/wave-transcription half).
**Corpus locations**: `T.md:516` / `SYNTHESIS.md:575` (Q4 cell) · `waves/T.W4.md:11 (header), 61,
112-114` · `waves/T.W3.md:64-68`.
**Proposed amendment**: (1) W4's header gains W6's parenthetical: *"Q3/Q11/Q4-console outcomes
from `T.md §12` **as ratified (the ratification record wins over the defaults quoted below)**"*;
(2) W4-4's item text: *"the console material per the Q4 ratified row — default rung-2 WELL (C5);
if the quiet-glass arm is ruled, the O-18 referent re-prices to live composited lightness (the D6
atmosphere thread) and the gate text updates with it"*; (3) Q4's alternative cell appends the
price: *"(re-admits glass-in-plate AND un-bounds the console ground — certified ink must thread
live composited lightness; the WELL's determinism is what makes T-5's contrast cure closed-form)"*.

## F-4 — SHOULDFIX — the console's accent ring: chromatic chrome absent from the C3 exception ledger, justified by a three-scale continuity sentence whose first scale R9 retires, against Q10's own "ONE chromatic naming point" rationale

**Evidence.** Three governing texts pull in three directions on the same 1px of hue:
(a) D5/W4-4 mint the letter-rail ring in `--accent-view` — *"seal-rim recipe turned portrait …
the same carrier at three scales (seal rim → trigger ring → letter-rail ring)"* (D5;
`t-sliders-hierarchy.md` F-3). (b) R9/Q12 (default ABROGATE) retire the seal rim AND *"the
'hairline as continuity carrier' clause"* (`T.md §4 R9`) — the first scale of D5's three-scale
sentence is dead under the corpus's own default, leaving the design's stated precedent chain
broken (the recipe survives only as a copied formula; after W6-7 the letter-rail is its sole
consumer). (c) The C3 law encoded at W3-1 (*"color appears only as color DATA; chrome/material/
type are neutral"*) carries an exception ledger that does NOT include any ring: *"ramps, dots,
strips, netting, field, blob, Palettes-rainbow, admin-gold"* (`SYNTHESIS §1.2 T-24 row`,
`T.md:117-118`, encoded in DESIGN.md at W3-1 — one round BEFORE W4-4 lands the ring). A W8
critique pass enforcing C3-as-encoded flags the console ring as un-sanctioned chromatic chrome;
meanwhile Q10's default cell defends the accent chrome as *"the dock's one chromatic naming
point"* — a scarcity argument D5 dilutes by adding a second location (the console is channel
navigation, not view navigation; `--accent-view` semantically names the VIEW). At the design bar
the micro-dock conceit is charming, but the corpus must pick its story: either the accent-ring
family is a named ledger exception (and Q10's "one point" text widens honestly), or the rail ring
speaks a neutral hairline (`--card-edge` family) with the WatercolorDot as the zone's only live
color — which C3 itself half-argues. (Complementary to `h-q-table` F4 — C3's un-ratified status;
this is the internal-inconsistency + design-tension half, specific to the W4-4 ring.)
**Corpus locations**: `SYNTHESIS.md §2 D5 (:173-183), §1.2 T-24 row` · `T.md:157-166 (D5), §4 R9`
· `waves/T.W4.md:61, 146-147` · `waves/T.W3.md:62-64` (the ledger encode).
**Proposed amendment**: (1) add to the C3 exception ledger by name: *"the `--accent-view`
navigation-ring family (expanded-trigger ring + the W4-4 letter-rail enclosure; the seal rim
struck per R9/Q12)"* — or rule the rail neutral; either way (2) re-cut D5's precedent sentence to
the two surviving scales (trigger ring → letter-rail), citing R9; (3) if the amend pass judges
the dilution real, present *accent-rail vs neutral-rail* as a named W8 bracket (both poles: the
three-scale family sentence vs Q10's scarcity counterweight).

## F-5 — SHOULDFIX — the Extract processing state's species is contradicted inside D9's own sources; W3-2 inherits without resolving

**Evidence.** The species table (`t-shadow-palette.md:150-157`, transcribed into D9): known-imminent
**(local compute)** = `shadow` register, 6s breath; **network wait** = `developing` shimmer. But
the same lane's per-surface spec (`:184-188`) writes: *"`isProcessing` swaps ghost → **`developing`
skeleton** in place"* — Extract's quantization is LOCAL compute (the quantize worker), so the
table says shadow-breath while §3(a) says developing-shimmer. The lane's own census agrees with
the table against its §3(a): *"default `shadow` ×1 (`ExtractWorkbench.vue:89`, processing-gated)"*
(F-3) — live-verified at HEAD: the processing skeleton mounts with NO variant prop (= `shadow`)
under a `key="developing"` (the key name is the confusion fossilized). D9/W3-2 transcribe the four
species without assigning Extract-processing to one; an implementing writer meets two answers.
**Corpus locations**: `audit/lanes/t-shadow-palette.md:150-157 vs :184-188` · `waves/T.W3.md:49`
· `SYNTHESIS.md:214-220`.
**Proposed amendment** (one sentence in the W3-2 row): *"Extract's `isProcessing` state is the
**known-imminent species** (`shadow` register, breath) — local compute, per the species table; the
§3(a) word 'developing' and the shipped `key="developing"` are superseded (developing = network
hosts only: Browse/BrowseTab)"* — or, if the amend pass prefers perceptual work-signaling for
worker rounds, rule `developing` explicitly; ONE answer either way.

## F-6 — SHOULDFIX — T-19's "in ALL cases" is narrowed by the error-exemption with no ratification touch-point — a third member of h-q-table F3's silent-re-cut class

**Evidence.** The owner (mandate §0/T-19): *"This should display a shadow palette instead **in all
cases**."* D9's rule: *"Error states are exempt (error ≠ empty stands … plain register untouched)"*
(`t-shadow-palette.md:139-141`, transcribed D9/W3-2 gate: *"error states UNTOUCHED"*). The
narrowing is almost certainly right (the owner's shot is an empty state; PR-4 is standing product
law), but it is an owner-word re-cut of exactly the class lesson 15 says must *"surface for
ratification, never settle silently"* — and `h-q-table` F3 already established the corpus applies
that law unevenly (its two members: blob z, boot fade; this is a third, un-reported there). No Q
rides D9 at all — the one spec cluster in my scope with zero ratification touch-points.
**Corpus locations**: `SYNTHESIS.md:214-220` · `T.md:198-204` · `waves/T.W3.md:117-119` ·
`MANDATE-2026-07-06.md:45 (T-19 line)`.
**Proposed amendment**: one rider line in the ratification package (annexed to the Q-table or the
W8 cover sheet, beside F3's two): *"T-19 'in all cases' is read as all EMPTY permutations
(first-visit, deletion-to-zero, tab/filter); error states keep the plain register (PR-4) — flagged
as an owner-word narrowing for explicit assent."*

## F-7 — SHOULDFIX — bare S-era Q-numbers circulate in binding T text whose own table reuses the numbers: R7's "Q6" and R3/§6.2's "Q7"

**Evidence.** T's Q-table is Q1–Q17 fresh (Q6 = E-7 depth · Q7 = packet timing). The binding
retirement ledger and budget text cite S-era Qs bare: **R7** — *"T-13/T-19 vs S.W5-6 F1/F2/F3 +
**Q6**"* and RETIRES-column *"**Q6's** true-empty-ONLY scope"* (`SYNTHESIS.md §1.1 R7` =
`T.md §4 R7`) — that Q6 is **S's** (S.W5 "Q6 true-empty"); a reader resolving it against
`T.md §12` gets "E-7 depth", nonsense in context, or worse reads T-Q6 as partially retired.
Same class: **R3**'s SURVIVES *"**Q7** full presence"* + `SYNTHESIS §6.2`/`T.md §6` *"the 390 blob
perf gate (**Q7**) HARD"* + `T.W4.md:144-145` *"**Q7** full presence + the slot-owned token
SURVIVE"* — all S-Q7 (blob full-presence), colliding with T-Q7 (packet timing). E-3 reads the
RETIRES/SURVIVES columns literally; referential ambiguity in that ledger is not cosmetic. (No
sibling lane reports this; grep-verified across `hardening/`.)
**Corpus locations**: `SYNTHESIS.md:56 (R7), 52 (R3), 530 (§6.2)` · `T.md:306 (R7), 302 (R3),
352-353 (§6)` · `waves/T.W4.md:144-145`.
**Proposed amendment**: prefix the S-era citations at the named spots — *"S-Q6"*, *"S-Q7 (S's
blob full-presence ruling)"* — one word per site; optionally a standing convention line in T.md §12's
header (*"bare Q-numbers in this corpus are T's; S-era rulings are cited S-Q<n>"*).

## F-8 — SHOULDFIX — the Q5 chip's no-palette FALLBACK is unsized and under-delivers both poles: an analogous fan is neither "rainbow" nor data

**Evidence.** Q5's default chip: *"the user's current palette when present, **else the derived
guarded fan**"*. The fan, per the authoring lane (`t-nav-dropdowns.md` F3.1), is *"the
accent-derived **analogous** fan"* — under the T-26 bracket that is a 24–64° spread: five near-
neighbor hues of the current accent. For the first-visit/no-palette user (exactly the cold state
the owner audits from), the Palettes row then wears a narrow single-family smear — not the owner's
"rainbow" (the letterform pole's whole claim), and not data either (no palette exists; it is
decoration derived from chrome state, which the chip's OWN justifying law, C3 color-as-DATA,
does not cover). `h-q-table` F2 (MUSTFIX) covers the default-vs-owner-word inversion at the row
level; this is the net-new content half: even INSIDE the chip arm, the fallback content is a
sub-decision nobody sized, and it is the arm most users will actually see first. Rider: O-14's
truth law names referents for the T-17 chips (*"vs `generatePalette`/`mixColors`"*) but none for
the T-10 Palettes chip — the fallback fan has no named library function to be byte-identical TO.
**Corpus locations**: `T.md:517` / `SYNTHESIS.md:576` (Q5 cell) · `audit/lanes/t-nav-dropdowns.md:97-104`
· `SYNTHESIS.md:512 (O-14)` · `waves/T.W6.md:56, 108-110`.
**Proposed amendment**: size the fallback in the Q5 cell (and t-nav F3.1's transcription):
either *"a full-wheel 5-stop sample (72° steps through the guarded pipeline — the destination is
ALL of color; honestly a rainbow)"* or *"no chip without a palette — the row falls back to the
letterform arm/plain ink"*; present the choice inside the Q5 ratification row (it moves the
first-visit read). Name the chip's O-14 referent: *"Palettes chip stops ≡ the user's saved palette
bytes when present, else ≡ the named fallback resolver's output"*.

## F-9 — SHOULDFIX — the dispatch protocol never encodes the ratified Q outcomes into Q-sensitive packet rows; P5's "ONE ring contract" ships enumerating a seal rim that Q12's default abrogates

**Evidence.** The letter dispatches AT ratification (W0-1, post-ruling) — yet its protocol
(`GLASSUI-T-ASKS.md:111-126`, steps 1–5) re-stamps HEAD and re-verifies cites but has **no step
encoding the just-ratified outcomes** into the rows they change. Concretely: P5 asks the producer
for *"the ONE ring contract (**seal rim** + `--dock-ring` L13 + letter-rail)"* — under Q12's
default (ABROGATE) the seal has no rim; the producer would size a three-consumer unification for
a contract T itself leaves with two members (the solid-ring register stays either way, as the
standing law). Under the Q12 alternative, the row is right as written. Similarly the Q5 outcome
colors what the P7 description-lane contract note must protect (chip vs letterform changes
nothing producer-side — worth one clause saying so, or the producer may wait on it).
(`h-wave-w6-w7` covered the Q12-alternative's missing consume BOOK; `h-packets` H-PKT-6 covered
P5's cite provenance — this is the outbound-letter-text half, net-new.)
**Corpus locations**: `letters/GLASSUI-T-ASKS.md:56 (P5), 111-126 (protocol)` · `SYNTHESIS.md §4
P5` · `T.md §12 Q12`.
**Proposed amendment**: protocol step 6: *"before transmitting, re-cut Q-sensitive rows to the
ratified outcomes — P5's ring-contract membership per Q12 (default: `--dock-ring` + letter-rail;
the seal-rim leg only if the fitted arm ruled), and a one-line note that the P7 description-lane
contract is Q5-outcome-independent"* — and annotate P5's row now with *"(seal-rim leg
Q12-conditional)"* so the pre-dispatch text is honest on its face.

## F-10 — SHOULDFIX — the spectrum-plate caption (the owner-photographed t-2001-51 instance) is in NO wave item's named route: measured 3.84/3.36:1 with a cure that exists only lane-side

**Evidence.** The binding shot map (`SYNTHESIS §1.0`, validated by `h-mandate-trace`) fixes
`t-2001-51` = the spectrum-plate caption (*"GAMUT LENS — DISPLAY-P3/SRGB · CUSP …"*,
`SpectrumPlateCaption.vue` — live at `controls/`), measured **3.84:1 light / 3.36:1 dark vs the
4.5:1 small-text floor** (`t-sliders-hierarchy.md §1`, re-verified by h-evidence-design-1's
sibling numbers). The cure exists in the lane (F-5: *"annotations + plate caption move onto the
F-1 `ink-muted` rung — no alpha, certified"*), but no wave item names the site: W3-5 routes
*"the unguarded sites (A11Y-F2)"* (menus) + nutrition label + readout fracs + ParseEcho — the
caption is none of those classes (it is scheme-fixed `--muted-foreground` on a live-tinted plate,
a third class); W4-4's O-18 gate covers *"captions on the WELL ground"* (the plate caption sits on
the PLATE, outside the console); W4-3 owns the channel strip (the sliders' bottom area, T-4's
other half). O-18's population *intent* covers it — but the S failure shape the oracle exists to
repair is exactly "named-site-not-population," and every gate-level enumeration omits this
owner-photographed site.
**Corpus locations**: `waves/T.W3.md:52 (W3-5 row)` · `waves/T.W4.md:60-61, 112-114` ·
`SYNTHESIS.md:39 (§1.0), 516 (O-18)` · `audit/lanes/t-sliders-hierarchy.md §1 row 3, F-5`.
**Proposed amendment**: name it once — add *"the spectrum-plate caption (`SpectrumPlateCaption`,
the t-2001-51 instance) joins the `ink-muted` rung"* to W3-5's routed-sites list (its cure is the
D6 contract, W3's), and add "plate caption" to the O-18 enumeration's example set so the census
population provably contains the shot the owner took.

---

## NOTES

**N-1 · NOTE — D5's glyph law is compressed to the lab exemplar.** D5/W4-4 say *"`L a b α` glyphs
kill the A-collision"* — the collision is lab-class-only; the console serves all 17 spaces. The
lane's own law is general (*"the column speaks each channel's true glyph"*, F-5). Transcribe the
general law with lab as the exemplar (*"each channel's true glyph, per-space — e.g. `L a b α`"*)
so a literal writer doesn't stamp lab glyphs across HSV/XYZ rows.

**N-2 · NOTE — the console chassis-persistence law lives only lane-side.** t-sliders F-4 ¶2: the
entrance stagger *"must re-key the ROWS only — the console card and ring are persistent chassis,
never re-mounted scenery."* No W4-4 gate or item clause carries it; a writer re-mounting the
console per space-change passes every gate and lands a T-14-family pop on each space switch. Pull
the one-line law into the W4-4 row.

**N-3 · NOTE — ghost double-speak on restored surfaces.** `EmptyState.vue:30-32` (live) already
renders a dot-scale ghost row (three `WatercolorDot variant="ghost"`); D9 lifts the dashed
vocabulary to card scale on the SAME surfaces (the owner shot t-2008-34 shows the dots above
"· NOTHING TO MIX ·" today). Unstated whether the dot row retires, folds into `ShadowPalette`, or
co-renders (two ghost registers at two scales double-speak the same absence). One sentence in
W3-2: the caption plate sheds its dot-ghost row wherever the card-scale ghost seats.

**N-4 · NOTE — STRIP segment sliver at high counts.** The chip is one golden plate (~2.618rem);
generate previews ride `count.value` (5–12 per t-nav F5) → ~3.5px segments at 12. Readable as
"multi-hued" but not as data. Name a floor in the chip module spec (e.g. preview segments cap at
~7 with the chip honest about truncation, or width steps up one token past count 8) — a taste
knob a writer will otherwise mint (the h-refine-doctrine N-2 save-the-writer pattern).

**N-5 · NOTE — the grid-host ghost count is unpinned.** Extract's ghost rides k (live) and Mix's
is 2 (the count IS the copy) — both designed; `PaletteCardGrid`'s four hosts get *"shadow palettes
in the grid cells"* with no count. Name a default (e.g. 3 — the pre-S mix precedent, one visual
sentence) in the W3-2 row.

---

## §Q-POLES — the carriage verification (the lane's standing charge)

| Q | Rides | Default pole | Alternative pole | Verdict |
|---|---|---|---|---|
| Q4 (console) | T-5 / D5 / W4-4 | present everywhere | present in the TABLE only; wave docs speak settled ("C5 settles"); price omitted | **F-3** (carried, unequal quality) |
| Q5 (Palettes form) | T-10 / W6-4 | present | present at table + W6-4 item row + Lane D module (both arms share a home) | CLEAN at carriage (content: F-8; row-level inversion: h-q-table F2) |
| Q10 (chrome scope) | T-10 adjacency | present | present; W6 header's "ratified outcome wins" hedge covers the categorical prohibition text | CLEAN (the Q10-alt contradiction with W6-4 prose is h-wave-w6-w7's, not re-reported) |
| Q12 (adjacent via P5/W4-4 ring) | T-5's ring + P5 | present | present; the alternative arm's consume book is h-wave-w6-w7's finding; the letter text is **F-9** | carried |
| D9 (T-13/T-19) | — | **no Q rides the cluster at all** | — | **F-6** (the one owner-word narrowing with zero ratification touch-points) |

## §CLEAN — positively verified (recorded so the amend pass doesn't over-fix)

- **D5's two-zone anatomy** (specimen plate / console) is the right cut at the design bar: it
  names the register, reuses the landed dock state-ladder + quiet/well vocabulary, and the
  bound-the-ground→computable-ink argument is the corpus's best single design sentence. The WELL
  default over glass-in-plate is correct (D1's thesis; glass-on-glass is the generic-layering
  disease). Touch rung (≥44px <lg), roving-tabindex carryover, ONE-active-indicator, and the
  interim-ring booked swap (P5, §7.2 row) are all present and correctly gated.
- **The W4 forced order** places the console AFTER the seat/readout band settles — the C1
  reconciliation holds for this cluster; W4-3's channel strip rides the console leg in the same
  file family (no writer conflict).
- **T-17's truth law (O-14 byte-identity, "a lying preview is worse than none")** is exactly
  right, as is the restraint table (which menus get NO chips), the triggers-stay-text rule (menus
  preview, triggers name — the "in proportion" half), and the description-lane placement with the
  producer contract reduced to a survival note (P7) rather than an ask. Chip proportion
  (em-height, φ² width, inset hairline, `aria-hidden`, PRM-neutral static paint) is fully valued
  in the lane; the wave cites it as its evidence packet.
- **D9's motion-axis re-cut** is the corpus's cleanest overrule reconciliation: the owner's
  material returns, the S semantics survive (aria split gated in O-9), the dashed-vs-solid edge
  distinction is load-bearing and stated, and the Extract live-k ghost (the instrument showing its
  output shape before any input) is genuinely first-rate instrument design. F-2/F-5 are repairs to
  its gate and one species assignment, not to the grammar.
- **R7's survives-column discipline** (error ≠ empty; never announce absent work) is intact
  through every transcription (SYNTHESIS → T.md → W3.md), and W6's boundary note correctly forbids
  W6 re-minting D9 registers.
- **The Palettes-rainbow ledger entry** in C3's exception list is form-agnostic (survives either
  Q5 arm); O-13's slim-same-commit discipline and the R1 survives set are consistently quoted at
  every level for T-10.
