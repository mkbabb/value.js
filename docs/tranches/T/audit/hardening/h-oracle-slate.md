# h-oracle-slate — hardening the O-1..O-25 oracle slate

**Lane class**: hardening / adversarial (zero product-code, zero corpus edits — findings only).
**Substrate**: `tranche-t` @ `fb330bb`. **Product under audit**: the oracle slate `SYNTHESIS.md
§6.1` (`:497-523`), its wave/gate wiring across `§1.2` + `§3` + the `waves/T.W*.md` gate docs +
`T.md §3`, and its source lane `audit/lanes/t-oracle-gaps.md`. **Method**: for each of O-1..O-25 —
(a) well-defined predicate? (b) population-scoped, not named-site (the S failure shape #1)? (c)
non-proxy (S failure shape #2)? (d) assigned to a WAVE **and** a live gate row? (e) implementable
with the standing harness (vitest / the 5-project Playwright smoke fleet / CDP / 1×1-canvas resolver
/ CSSOM walk / PerformanceObserver / build-diff)? Plus the two charged special checks: is the
AT-RISK **O-13 slim-with-T-10** law present? and — **hunt findings with NO oracle.**

**Bottom line**: the slate is structurally sound — 25 sequential oracles, no gaps/dupes; every
D-move (D1-D10) and every T-# (T-1..T-29) + fleet find (MOB/CC/A11Y/LEG/PI/DOC) carries a gate
shape; the born-RED mint discipline (W0-5) and per-wave mint-at-your-own-gate pattern are coherent;
the AT-RISK **O-13 census is present AND thoroughly enforced** (SAME-COMMIT repeated 6× in T.W6,
survives/dies column explicit — see §CLEAN below). But the slate's **own stated purpose — "each
names the axis it must NOT proxy away"** — is violated on the tranche's single highest-value visual
mandate: the aurora "noticeable" proof is gated only by an un-numbered prose gate whose numbered
slate-oracle (O-6) is an atom-envelope PROXY the known-broken shader can pass while the render stays
invisible. That is **F-1 (MUSTFIX)**. Three SHOULDFIX + two NOTE follow.

---

## F-1 — MUSTFIX — the perceptibility gates are the non-proxy oracle for T-25/T-26 but sit OUTSIDE the numbered slate, are UN-MINTED, and O-6 (their numbered stand-in) PROXIES the exact axis they exist to prove

**The defect.** The owner's central boot complaint is T-25/T-27 ("aurora on load", "loading too
gray / slow / jittery") and T-26 ("the variance bracket closes — design INSIDE" = *make it
noticeable*). The **non-proxy** predicate for "noticeable" is the **perceptibility gates**,
transcribed verbatim: *2s glance-pair sub-JND · 10s window shows unmistakable migration (≥4/255
mid-C) · 60s never repeats* (`SYNTHESIS.md:168`, `T.W2.md:56-57`, `T.md:152`). They are bound to a
gate row (`W2-5`: "O-6 bracket test **+ the perceptibility gates**", `SYNTHESIS.md:296` /
`T.W2.md:54`) and to T-25 (`SYNTHESIS.md:99`: "O-3 + O-5 pacing **+ the perceptibility gates**").

But three structural facts make them a seam:

1. **No O-number.** The slate `§6.1` (`:497-523`) enumerates O-1..O-25; the perceptibility gates
   appear in NONE of them. O-5 = pacing/jitter (a DIFFERENT axis: smoothness, not visibility). O-6
   = "Bracket resolver test … atom resolution lands inside the bracket envelope — **pure
   function**" (`SYNTHESIS.md:504`) — an INPUT-side check (atoms in [24°,64°]/energy 0.76), not the
   OUTPUT-side render.
2. **O-6 proxies the very axis.** O-6 GREEN ⇏ perceptibility: the fleet already found "pointer axes
   2-of-3 structurally DEAD on smooth" + "breath ±3.25% sub-perceptual" + "neutral seeds = stills
   (diff 1.17-1.78/255)" (`SYNTHESIS.md:99`, t-aurora-boot F-7..F-11). A broken shader yields
   in-bracket atoms (O-6 green) with a sub-JND render (perceptibility RED). So the slate's numbered
   oracle for T-26 is an atom-envelope **proxy** for "the field visibly migrates" — precisely S
   failure shape #2, on the flagship item, in a slate whose header promises the opposite.
3. **Un-minted + drop-risk.** W0-5's mint set is O-1,O-2,O-3,O-4,O-5,O-16,O-7-scaffold
   (`T.W0.md:44,89,107-109`) — the perceptibility gates are NOT minted there, and no other wave
   charters them as a standing spec (they read as "owner eye-judge frames archived", sitting one
   clause away at `T.W2.md:54` — inviting the eye-only reading that IS the S taste-by-proxy
   disease). Every downstream O-slate walk keys on the numbering: W7 "suites **+ O-slate green**",
   W8 "**The full oracle slate** + budgets", W9's book walk. If "O-slate" = O-1..O-25, the
   perceptibility gates are outside it and can be silently dropped at close. (They are ALSO reached
   via a dangling "(§2.3)" pointer — the sibling h-synthesis-corpus-diff caught the pointer typo but
   not this oracle-structure defect.)

**Why MUSTFIX, not SHOULDFIX.** They ARE implementable with the standing harness (frame-diff at
t=0/2s/10s via `page.screenshot` + luma delta; the 60s no-repeat is within reach of the same
`smoke-safari` "sustained-30s context-loss probe" class the config already runs) — so there is no
technical reason they remain un-numbered eye-judge prose. The cost of the gap is that the tranche's
headline visual promise ("the aurora is finally noticeable") is certifiable only by an
un-enumerated gate whose numbered proxy the known-broken shader passes. This is the exact seam the
owner's charge names.

**Proposed amendment.** Add a numbered slate row — **O-6b (or O-26): Aurora perceptibility (render,
not atoms)** — "settle-stamped frame-diff on the live field: 2s pair sub-JND · 10s ≥4/255 mid-C
migration · 60s no-repeat; both schemes; distinct from O-5 (jitter) and O-6 (atom envelope)", shape
`live component / frame-diff`, wave `W2`. Add it to the **W0-5 born-RED mint set** (it is born-RED
today by construction — F-7..F-11) and to the W2-5 / T-25 / T-26 gate rows in place of the bare
prose "the perceptibility gates". Corpus locations: `SYNTHESIS.md:504` (insert after O-6),
`SYNTHESIS.md:99,296`, `T.W0.md:44`, `T.W2.md:54`, `T.md:253`.

---

## F-2 — SHOULDFIX — the ×φ TYPE RECALIBRATION (D2 / T-2 / T-7) has NO computed-size oracle; O-10a gates host-CONSISTENCY, not that the size EQUALS the golden token — a wrong-but-consistent size ships green

**The defect.** D2 is a load-bearing owner mandate ("titles → 1.5× on our golden scale" → ×φ, two
token steps; `SYNTHESIS.md:137-149`) and D2 states its own mechanically-checkable law: *"every
landing is an exact shipped token, **no new values**"*. Yet **O-10** (`SYNTHESIS.md:508`) gates:
(a) host-**independence** — computed family/style/size/WEIGHT **identical across hosts**; (b)
per-space line-count; (c) tnum digit-advance; (d) display-voice family census. None of the four
asserts that a title surface's computed `font-size` **equals its D2-assigned token** (e.g. picker
title = `display-3` 67.78px @1440, pane title = `display-1` 41.89px). O-10a makes host-DIVERGENCE
the red condition — so a regression that reverts every title to the OLD size, or picks the wrong
golden step, but does so CONSISTENTLY across hosts, passes O-10a. The W4-1 gate
(`SYNTHESIS.md:317`) adds only "height gate @900px" (an overflow constraint) + "mobile matrix" —
neither pins the φ value.

**Non-proxy read.** O-10a is a genuine oracle for the T-2 weight-inheritance bug, but for the *size*
axis it proxies "titles are golden-scaled" with "titles are host-consistent" — two different axes.
The ×φ landing is owner-ratified via Q11, so eye-judge at E-7 is defensible as the TASTE call; but
D2's own "exact shipped token, no new values" law is a hard mechanical invariant that deserves a
cheap standing guard, not eyeball-only.

**Proposed amendment.** Extend O-10 with a sub-clause **(e): computed-font-size token census** —
each title surface (`ColorSpaceSelector`, `PaneHeader`, `PaletteCard`, the readout tuple) resolves
`getComputedStyle().fontSize` to its D2-assigned token value within ε, across the breakpoint set.
Cheapest possible (CSSOM read, no canvas). Corpus location: `SYNTHESIS.md:508` (O-10 row),
`SYNTHESIS.md:317` (W4-1 gate), `T.W4.md` W4-1 gate.

---

## F-3 — SHOULDFIX — O-3 "headed real-GPU" probe: the "CI wiring" (T.W0:89) + "hard gate green" (T.W2:21/37) framing collides with real-GPU-not-in-CI; the run-owner/cadence is unstated → the F4 hand-run-snapshot disease the slate exists to cure

**The defect.** O-3 is a "**Headed real-GPU** cold-load probe (LS-7)" whose `§6.1` shape column is
honestly "**gate annex**" (`SYNTHESIS.md:501`) and which T.W2:116 calls "the W0 **annex** re-run".
But two other statements treat it as an automated CI gate: W0-5's build row —
"**CI wiring** for the annex/probes" (`T.W0.md:89`) — and W2's Hard-gate composite, which lists
O-3 inline with O-1/O-2/O-4/O-5 as a green-required item (`T.W2.md:21,37,115`; `T.md:253`). CI is
headless **SwiftShader** — the standing harness has NO real GPU (the suite's own frame-budget specs
gate tight numbers "only on real GPU", generous ceiling on SwiftShader; t-oracle-gaps §0;
plan-audit-1 **F4**: "the tight number is a hand-run snapshot, not a schedule"). A real-GPU pixel
probe therefore cannot be a standing CI pass/fail: it either (a) **degrades to SwiftShader** and
becomes a duplicate of O-1 (losing the real-GPU axis that is O-3's sole reason to exist separate
from O-1), or (b) requires a **manual headed run** on GPU hardware — which is exactly the F4
permanence gap the slate was minted to repair. The corpus never names WHO runs the headed probe or
on what cadence, so the W2/W7/W8 "hard gate green" on O-3 is either unenforceable-in-CI or a silent
O-1 duplicate. Secondary: O-3's "screencast-**judged** order" clause (`T.W2.md:115`) is an eyeball
predicate that duplicates the already-automated **O-4 order-invariance** — the order axis is
machine-gated by O-4, so O-3's order clause is redundant-by-eyeball.

**Proposed amendment.** State explicitly in `§6.1` O-3 + the W2 gate that O-3 is an
**owner/headed-attested annex, NOT a CI pass/fail** (O-1 carries the CI-automatable pixel-truth on
SwiftShader); name the run-owner (owner headed machine) and cadence (once per W2/W7/W8 close,
recorded as an attestation row, not a green tick); and drop the "screencast-judged order" clause in
favour of a pointer to O-4. Corpus locations: `SYNTHESIS.md:501`, `T.W0.md:89`, `T.W2.md:21,37,115`.

---

## F-4 — SHOULDFIX — the perf-rider oracles (PI-1..6) are routed to a NON-EXISTENT §6.3; §6 has only §6.1 (slate) + §6.2 (budgets)

**The defect.** The §1.2 fleet-find table routes the perf riders to a home section that does not
exist: *"| PI-1..6 | the perf riders: cost ledger; LCP reveal-only law; hover budget; mobile-gate
re-derivation + timing fixture; T-14 two-tranche split; coloc bundle-diff | attached to their waves
| **§6.3** |"* (`SYNTHESIS.md:115`). But `§6 ORACLES + BUDGETS` contains only **§6.1** (the slate,
`:495`) and **§6.2** (budgets, `:525`) — there is no §6.3 (verified: the next header is `## §7` at
`:539`). This matters for the oracle slate specifically because these riders ARE oracle content:
PI-2 (LCP reveal-only) = **O-24**, PI-3 (hover budget) + PI-4 (mobile-gate re-derivation + timing
fixture) = **O-12**, PI-6 (coloc bundle-diff) = **O-23**. An implementer following the §1.2 pointer
to locate the perf-oracle spec lands nowhere. (Distinct from the sibling h-synthesis-corpus-diff
finding, which enumerated only the dangling **§2.x** refs — §2.7/§2.1/§2.3 — not this §6.3 one; same
class, different site, un-claimed.)

**Proposed amendment.** Repoint the §1.2 PI row from "§6.3" to the actual homes — the LCP/hover/
mobile/bundle riders → their O-numbers (O-24/O-12/O-23) in §6.1 and the budget riders → §6.2 — OR
author a real §6.3 collecting the PI riders. Corpus location: `SYNTHESIS.md:115`.

---

## F-5 — NOTE — O-16 computed-cascade is a fixed-4-surface SAMPLE, not the full "interactive surfaces" population (fit-for-purpose for the GLOBAL dist clobber; a sample for LOCAL overrides)

O-16 (`SYNTHESIS.md:514`; lane §2.10) is scoped "for a **fixed list** of interactive surfaces (card
hover, slider thumb, dock icon, pane swap)". The slate elsewhere (O-7/O-11/O-18) is a true
population census; O-16 is a curated sample of 4 surface classes. This is ADEQUATE for its stated
purpose — the P0 it guards is the **global** dist `:root` 150ms clobber (`components.css`, ~46
sites; T-14/PKT-1), which any one of the 4 surfaces catches. But a *local* per-surface override
regression on a 5th interactive surface not in the list would pass O-16. Since the oracle's charter
is "the ONLY oracle class that catches a dist **clobber**" (global), the sample is fit-for-purpose;
flagged only so the wave author does not later mistake O-16 for a full interactive-surface census.
No amendment required; optionally note the "global-clobber-scoped, not full-population" intent
inline at `SYNTHESIS.md:514`.

---

## F-6 — NOTE — O-8 (Tabs geometry) is W7-only / trigger-gated; if the 5.0.0 cut does not fire, T-20 has NO standing oracle for T's span (honest, producer-owned)

O-8 (`SYNTHESIS.md:506`) is the ONLY oracle for T-20 (tabs double-trim) and is scoped "W7 (post-P4)"
— it "goes live" only at the adopt event (`SYNTHESIS.md:356`), which is trigger-gated on the BG/BH
joint 5.0.0 cut (CHRONIC ~10 tranches UNFIRED; S.W8 precedent). T-20 is **producer-owned**
(`SYNTHESIS.md:94`), so a producer-gated-only oracle is honest — but it means the tabs-pilling axis
has zero standing coverage across the entire T span if the cut slips, and the tranche closes
`complete_with_misses` with that hole. The lane's own §2.3 mint is a `boundingBox` congruence spec
that COULD run against the current demo tabs before adopt; the slate chose not to. Flagged for the
close-walk so O-8's non-firing is recorded as a known coverage gap, not silently assumed green. No
amendment required; the wave author may optionally add an interim demo-tabs geometry watch pre-adopt.

---

## CLEAN (verified, no finding)

- **O-13 slim-with-T-10 (the charged AT-RISK check) — PRESENT and thoroughly enforced.** Slate row
  `SYNTHESIS.md:511`; W6-4 gate + hard-gate + numbered gate-item all say **SAME-COMMIT** (repeated
  6× across `T.W6.md:17,34,56,106,153,161`, incl. "[ONE commit]"); the survives/dies column is fully
  explicit (`entryAccent`/`resolveViewAccentTokens`/`PRIMARY_VIEW_SHIFTS`/`PRIMARY_VIEW_IDS`/dot
  column DIE; `resolveViewAccent`/`resolveSealInk`/`--accent-view`/WCAG math SURVIVE, `T.W6.md:56`);
  item 106 restates the AT-RISK rationale ("else it certifies dead code or breaks on a deleted
  export"). The one-AT-RISK-row census holds: I checked the other cure sites that touch existing
  standing specs — `webgl-appearance` (O-1) and `atmosphere-cold-load` (O-2) are "**repaired**"
  in-place (`SYNTHESIS.md:499-500,20`), i.e. edited not duplicated, so no coexisting-green-proxy
  seam; `webgl-goo-blob.spec.ts` is KEPT + extended by O-12, not deleted; no second AT-RISK row was
  missed.
- **Numbering integrity**: O-1..O-25 sequential, no gap, no duplicate, in both `SYNTHESIS.md §6.1`
  and `T.md §3` (every O-# appears ≥1× in T.md; no oracle dropped from the charter gate-shape
  column).
- **Every D-move + T-# + fleet-find carries a gate shape**: D1→O-7, D2→O-10 (size gap = F-2),
  D3→O-1/2/3/4/24, D4→O-6/O-5/perceptibility (= F-1), D5→O-18/O-7, D6→O-18, D7→O-16/O-17, D8→O-12,
  D9→O-9, D10→O-23; T-1..T-29 each row of §1.2 names its O-# (verified line-by-line); fleet finds
  MOB/CC/A11Y/LEG/PI/DOC each carry a gate (PI's home = F-4).
- **Mint discipline coherent**: W0-5 mints the boot set born-RED (O-1,2,3,4,5,16,7-scaffold); each
  later wave mints its own gated specs at its gate (W3 → O-7/O-9; W4 → O-10/O-12; W6 → the
  O-13..O-22 spec batch, `T.W6.md:147`); each oracle's wave column in §6.1 matches its gate-row
  wave. O-5 and O-3 (which the terse §3 summary omits) ARE wired into W2's Hard-gate composite +
  numbered gate list (`T.W2.md:21,37,115,118`) and T.md §3 — no unwired oracle.
- **O-24 (LCP identity)** is fully wired (W2-3 gate + W2 hard gate `T.W2.md:23,38,52,105-106`) —
  verified after an initial false-negative in my own grep filter (do not trust a `-v "O-2[0-9]"`
  filter; it eats O-24).

---

## Method notes
- Every claim is a corpus `file:line` cite at `tranche-t` @ `fb330bb`; zero product-code, zero
  corpus edits (findings-only per the hardening charge). No dev server was booted (this lane is a
  spec-structure audit, not a live probe).
- Overlap discipline: F-1's dangling-pointer aspect and the perceptibility "(§2.3)" typo are already
  in h-synthesis-corpus-diff; I report only the ORACLE-STRUCTURE defect (un-numbered non-proxy gate
  + O-6 proxy + un-minted), which that lane did not reach. F-4's §6.3 is the same dangling-ref CLASS
  as that lane's §2.x findings but a different, un-claimed site.
