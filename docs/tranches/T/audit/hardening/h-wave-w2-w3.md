# h-wave-w2-w3 — WAVE HARDENING of T.W2 + T.W3

**Lane**: `h-wave-w2-w3` (adversarial wave-doc hardening). **Product under audit**:
`docs/tranches/T/waves/T.W2.md` (the boot overture) + `T.W3.md` (the material ladder · neutrals ·
ink) against their spec-of-record (`audit/SYNTHESIS.md §2/§3/§6.1/§6.2`, `t-contradictions C2/C3/C4/C5`,
`t-a11y-contrast F-1..F-4`, `t-card-color-census §4`, `t-search-tabs`, `t-header-shading §4`), the
MANDATE (§0 verbatim law), and the LIVE TREE @ HEAD `6aad512`. **Charge**: every gate row executable
cold · every anchor live (the S-era cap cures moved the boot/ink anchors — verify) · the C4 sequencing
(T-26 after W2-1) enforced · the W3 ladder deployment table vs the census · the CSS tripwire rider
present · the ink-on-tier oracle (O-18) ownable · writer maps TOTAL and non-contradictory.

**Method**: I re-derived the W2-1 hydration anchors against `App.vue` @HEAD, traced the full
`BG_LIGHTNESS_DARK/LIGHT` consumer set against the W2/W3 single-writer partition, grepped the O-18
mint against the W0 oracle slate, resolved the W3-3 `.input-bar` anchor to its real repo path, and
walked the W2-4 HeroBlob surface against W2's own do-not-touch list.

**Verdict**: the W2-1 hydration-first anchors are **LIVE and faithful**, C4 is faithfully (and
redundantly) encoded, the CSS tripwire rider is verbatim-present with a verified baseline, and the
W3-1 ladder table reconciles with the census. But **one MUSTFIX seam is structural**: W3-5's
ink-on-tier cure (A11Y-F1) cannot be landed within W3-5's stated bounds because its root repair lives
in W2's EXCLUSIVE boot chain — and W2/W3 are declared parallel-disjoint. Three SHOULDFIX writer-map /
anchor defects follow. Ranked most-severe first.

---

## MUSTFIX

### M1 — W3-5's ink-on-tier cure (A11Y-F1) is un-landable within its bounds: the root repair is in W2's EXCLUSIVE boot chain, yet the two waves are declared parallel-disjoint

**Severity**: MUSTFIX. **Location**: `T.W3.md:52` (W3-5 item) + `T.W3.md:103` (W3-5 file bounds) +
`T.W3.md:108` (do-not-touch boot chain) + `T.W3.md:126-129` (hard gate 5, "`BG_LIGHTNESS_DARK/LIGHT`
gone (grep)") + `T.W3.md:180` ("Runs parallel with T.W2 (disjoint single-writer surfaces)") +
`T.W3.md:176-177` (§Dependencies — omits W2) vs `SYNTHESIS.md:112` (A11Y-F1 → W3-5) + `t-a11y-contrast.md:70-76`
(the F-1 cure direction) + `T.W2.md:86,91` (W2's boot single-writer set).

**The contradiction.** W3-5 owns the D6 ink-on-tier contract and its hard gate #5 demands
"`BG_LIGHTNESS_DARK/LIGHT` gone (grep)" repo-wide. The a11y lane's F-1 cure (`t-a11y-contrast.md:73-76`)
is explicit that the ONLY correct repair threads **the atmosphere composable's own derived-lightness**
into the guard: *"the atmosphere composable (`useAtmosphere`, threaded through `useAtmosphereBoot.ts`)…
Retire the two hardcoded constants; thread the atmosphere's own derived-lightness… into
`useContrastSafeColor`."* But `useAtmosphere`/`useAtmosphereBoot`/`useViewAccents` are the CL-5 boot
unit — **W2's single-writer surface** (`T.W2.md:86,91`: "`app/composables/boot/*`… useAtmosphere ·
useViewAccents"), and W3 explicitly forbids touching it (`T.W3.md:108`: "Do NOT touch: … the boot chain
(W2's — parallel wave)"). Three concrete legs, all live @HEAD:

1. **`useViewAccents.ts` (a W2 boot file) CONSUMES both constants** — `:41-43` imports
   `BG_LIGHTNESS_DARK`/`BG_LIGHTNESS_LIGHT` from `./useContrastSafeColor`; `:72`
   `const bgL = () => (isDark.value ? BG_LIGHTNESS_DARK : BG_LIGHTNESS_LIGHT)`. The grep-clean gate #5
   **cannot close** while this consumer survives — and W3-5 may not edit it (it is `app/composables/boot/*`).
2. **`useAtmosphere` exposes NO derived-lightness to thread** — @HEAD it returns exactly
   `{ auroraCssGradient, auroraArrived }` (`useAtmosphere.ts:228`; `useAtmosphereBoot.ts:93` re-returns
   the same pair). The F-1 cure therefore requires ADDING a `derivedLightness` computed to `useAtmosphere`
   — a W2 boot-file write W3-5 cannot make.
3. **The parallelism claim is false at this seam** — `T.W3.md:180` asserts "disjoint single-writer
   surfaces," and `T.W3.md:176-177` §Dependencies lists only T.W1/T.W0/Q4/Q9 with **no W2 dependency at
   all**. The ink contract has a hard data + edit dependency on W2's boot chain that neither the
   disjointness note, the dependency list, nor the §Hand-off reconciles.

**Failure for a cold agent**: a W3-5 verifier threads tier-lightness on the sites it owns, then runs the
gate-5 grep, finds `BG_LIGHTNESS_*` still live in `useViewAccents` (a forbidden W2 file), and cannot
close — and to do the F-1 "atmosphere-lightness threaded" half at all it must add a computed to
`useAtmosphere`, another forbidden W2 file. It is stalled at a cross-wave boundary the corpus never drew.

**Proposed amendment**: either (a) **re-sequence W3-5 to run AFTER W2** (drop it from the parallel set),
add a W2 item/hand-off that PUBLISHES the atmosphere derived-lightness computed AND retires the boot-side
constant consumers (`useViewAccents`), and have W3-5 consume the published computed; or (b) **move the
atmosphere-lightness exposure + `useViewAccents` rewire into W2's scope** (W2 hands W3-5 a constant-free
boot chain + a `derivedLightness` source via §Hand-off), scoping W3-5's grep gate to the demo consumer
sites it actually owns; or (c) if W3-5 threads only TIER-lightness (which it owns) with the
atmosphere-lightness/global-constant retirement deferred to a coordinated cross-wave step, then
gate-5's "`BG_LIGHTNESS gone (grep)`" must be re-scoped off W3-5-alone. Whichever path — add the W2↔W3-5
ink dependency to `T.W3.md §Dependencies` and correct the "disjoint" claim at `:180`.

---

## SHOULDFIX

### S1 — `useMarkdownColors.ts` carries an UNLISTED local duplicate of `BG_LIGHTNESS`; the a11y census's "every consumer feeds useContrastSafeColor.ts:17-18" is false, and gate-5's grep fails on it regardless of M1

**Severity**: SHOULDFIX. **Location**: `T.W3.md:52` (W3-5 routed-site list: "menus, nutrition label,
readout fracs, ParseEcho") + `T.W3.md:129` (grep gate) vs `t-a11y-contrast.md:36-38` (the census's
"every consumer … feeds … `useContrastSafeColor.ts:17-18`" claim) and the live tree.

`demo/@/components/custom/markdown/composables/useMarkdownColors.ts` **redeclares the false constants
locally** — `:7` `const BG_LIGHTNESS_DARK = 0.15;` `:8` `const BG_LIGHTNESS_LIGHT = 0.97;` — and feeds
them straight into the guard at `:35` (`const bgL = isDark.value ? BG_LIGHTNESS_DARK : BG_LIGHTNESS_LIGHT;`
→ `computeSafeAccent(L, C, H, bgL, 0.35)`). This is a textbook D6 ink-on-tier violation (a false global
referent guarding markdown heading ink), on a surface neither the a11y F-1 census nor W3-5's routed-site
list enumerates. Because it is a SHADOW copy (not imported from `useContrastSafeColor`), it also
**falsifies the a11y lane's own root-cause claim** that "every consumer without exception feeds this
parameter … (`useContrastSafeColor.ts:17-18`)." A gate-5 grep for `BG_LIGHTNESS_DARK/LIGHT` finds this
site regardless of how M1 is resolved.

**Proposed amendment**: add `useMarkdownColors.ts` (the markdown heading-ink path) to W3-5's routed-site
list, and correct `t-a11y-contrast F-1` to note the local shadow-copy site so "retire repo-wide" is a
complete inventory, not an under-count.

### S2 — W2-4's "HeroBlob reveal wiring" grant contradicts W2's own do-not-touch (picker knot files) and the single-writer set

**Severity**: SHOULDFIX. **Location**: `T.W2.md:88` (W2-4 file bounds: "the B4 trigger site +
`HeroBlob` reveal wiring … modify") vs `T.W2.md:91-93` (single-writer = "`app/composables/boot/*` +
`App.vue` + `index.html`"; "Do NOT touch: … the picker knot files (W4's)") + `T.W3.md:108` (W4's knot
files enumerated: "… `HeroBlob/`").

`HeroBlob` is **not** in W2's declared single-writer set: it is defined at
`demo/@/components/custom/color-picker/visual/HeroBlob.vue` and mounted inside `ColorPicker.vue:66` —
both W4 picker-knot files (the "Do NOT touch: the picker knot files (W4's)" class, with `HeroBlob/`
named in `T.W3.md:108`). `App.vue` contains **zero** `HeroBlob` references (grep-confirmed), so the B4
trigger + reveal wiring cannot land shell-side as written. W2-4 therefore grants MODIFY on a surface
W2's own do-not-touch forbids. (W2 precedes W4, so this is a self-inconsistency, not a concurrent
collision — but a cold W2-4 agent cannot tell whether HeroBlob's reveal wiring is in-bounds.)

**Proposed amendment**: name the EXACT reveal seam W2-4 may touch and carve it out of the "picker knot
files" prohibition — either "the boot chain provides a B4 emerge signal (e.g. off `auroraArrived`);
`HeroBlob`'s CONSUME of it is a W4 line, deferred" (keeps W2 shell-only), or explicitly add the HeroBlob
reveal-trigger lines to W2-4's writer scope with a "W4 takes the seat/geometry later" hand-off note.
Reconcile the single-writer set line (`T.W2.md:91`) with the W2-4 row either way.

### S3 — W3-3's search-seat anchor `components.css:205-228` is a glass-ui PRODUCER file with the `glass-ui/` prefix stripped (reads as a nonexistent demo file; ownership flips demo↔producer)

**Severity**: SHOULDFIX. **Location**: `T.W3.md:50` (W3-3 anchor: "`.input-bar` floating-bound
(`components.css:205-228`); 24rem cap … baked `--font-mono` (T-12)") vs `t-search-tabs.md:37,90,117`
(the lane's OWN cite: "`glass-ui/src/styles/utilities/components.css:205-228`") and the live tree.

No `components.css` exists anywhere in the value.js repo (`find . -name components.css` = empty). The
`.input-bar` recipe is a **glass-ui producer file**, verified live at
`../glass-ui/src/styles/utilities/components.css:205` (`.input-bar { … max-width: var(--max-width-input);
font-family: var(--font-mono, monospace) }`). The wave-doc anchor abbreviated the path to
`components.css:205-228`, dropping the `glass-ui/src/styles/utilities/` prefix — so it reads as a demo
surface, when it is a producer one whose changes are P3/ASK-B/ASK-C packet asks (`t-search-tabs.md:220-221`),
NOT a demo write. Two live corroborations that this is producer-rooted: (1) the ONLY demo `.input-bar`
consumer @HEAD is `PaletteRenameInput.vue` (the rename field, per `DESIGN.md:88`) — **not** the search
field; (2) the search field is the glass-ui `Input` pill (`SearchFilterBar.vue:88` + the S.W5-3 comment
at `:83`), its chrome producer-owned. W3-3's file bounds (`T.W3.md:104`: "`.input-bar` consumers on
panes") correctly point at the demo consumer, but the evidence anchor mislabels the recipe's home.

**Proposed amendment**: restore the full producer path in the anchor —
`glass-ui/src/styles/utilities/components.css:205-228` (recipe: producer P3; 24rem cap `:223`; mono
`:235`) — and state that W3-3's DEMO scope is the interim consumer override/opt-in (the register law's
demo half), with the recipe change riding ASK-B/ASK-C → P3. This mirrors the W2-1 producer anchor's own
`../glass-ui` framing (which W2 gets right).

---

## NOTE

### N1 — W3 §Dependencies over-attributes "O-18's census shape" to T.W0; O-18 is born in W3

`T.W3.md:177` claims "Depends on: … T.W0 (the O-7 scaffold; **O-18's census shape**)." But W0-5's oracle
mints are exactly O-1..O-5/O-16/O-7-scaffold (`T.W0.md:44,89,109`); **O-18 does not appear in `T.W0.md`
at all** (grep-confirmed). Per `SYNTHESIS.md:516`, O-18's provenance is "accent-contrast-guard
**generalized** | **W3**" — it is BORN in W3, generalizing the existing adjacent-only
`accent-contrast-guard.spec.ts` (which `t-a11y-contrast.md:249-252` proves has grep-confirmed zero
coverage of the real consumer sites). The oracle IS fully specified and ownable (SYNTHESIS §6.1 + hard
gate #5), so this is loose attribution, not a blocker — strike "O-18's census shape" from the W0
dependency (or reword to "the census-oracle SHAPE the O-7 scaffold establishes; O-18 mints in-wave").

### N2 — W2 file-bounds cite the post-W1 boot home while the anchor table is pre-W1

`T.W2.md:86,91` cite the single-writer surface as `app/composables/boot/*` (the W1-created CL-5 home),
while the anchor table header (`T.W2.md:46`) states "Anchors below are pre-W1 (as-audited) coordinates."
At HEAD the boot files still live at `demo/@/composables/color/{useAtmosphereBoot,useAtmosphere,
useViewAccents}` + `lib/view-accents.ts` — the move is W1's (verified in `t-coloc-composables-lib.md:190-191`
+ `T.W1.md:48`). Consistent under the PP-11 re-derivation clause, but a one-word "(post-W1 path)" tag on
the file-bounds row would spare a cold agent the `find` round-trip. (This mirrors the W3-4 anchor, which
correctly reads live: `PaneHeader.vue:76` `opacity: 0` at rest + the feathered `::before` mask
survive — verified LIVE.)

---

## Cleared checks (verified faithful — recorded so the clean bill carries evidence)

- **W2-1 hydration anchors LIVE @HEAD** — `App.vue:181` (`useColorPipeline` creation) · `:221`
  (`useAtmosphereBoot(...)` call — the DERIVATION wiring) · `:298-299` (`useColorUrl` + `if
  (!appliedFromUrl) restoreFromStorage()` — the HYDRATION). The derivation (221) is wired BEFORE the
  hydration (299): this IS the "derive-before-hydrate" defect W2-1 transposes. Anchor faithful, target real.
- **C4 sequencing (T-26 after W2-1) enforced + redundant** — encoded four times: `T.W2.md:12`
  (Agents "W2-5 strictly after W2-1 (C4)"), `:19-20`, `:54` (W2-5 row "SEQUENCED after W2-1 (C4)"), and
  echoed in the Q2 ratification row (`T.md:514` "judged by eye … AFTER W2-1"). Faithful to
  `t-contradictions.md:364-379,430` ("T-26 sequenced AFTER GAP-ARM cure"); the demo-half cure at W2-1 is
  the honest-judgment precondition, the producer half re-verified at W7.
- **CSS tripwire rider present + faithful** — `T.W3.md:21,37,130-132` transcribe `SYNTHESIS.md §6.2`
  (`:528` "CSS ≤120 (86.5, headroom 33.5) … per-wave TRIPWIRE (AMENDED-AT-PASS-2) … RED the wave at
  >120"). Baseline verified: `t-perf-implications.md:34` `index-*.css` = 88,590 B gz = 86.5 KiB; 86.5 +
  33.5 = 120. Arithmetic holds.
- **W3-1 ladder table reconciles with the census** — `t-card-color-census §4` (`:268`) = rung-1 "10
  (A1-A10) = every pane host + picker"; W3-1's "9 pane cards join" (`T.W3.md:48,54`) = the 9 non-picker
  panes joining the picker's rung → 10 total. Consistent. Well-mint count: CC-2 (`:172-183`) = "unchanged
  at 6"; W3-1 gate "the 6 well mints dead (grep)" matches. Anchor "§4 (deployment table of record, CC-2
  correction)" accurate.
- **O-18 spec ownable** — `SYNTHESIS.md:516` + `T.W3.md:126-129` fully specify the 1×1-canvas resolver
  over the ACTUAL consumer selectors (slug pills, readout fracs, graph nodes, channel letters, captions),
  both schemes; the a11y lane proves the existing guard-leaf tests share the stale referent and "cannot
  see this by construction" — so O-18 is a real new oracle, buildable by W3-5 (only the W0 attribution is
  loose — N1).
- **W3 anchors spot-checked LIVE** — `AboutPane.vue:3` `tier="wash"` (✓) · `ColorPicker.vue:6`
  `tier="resting"` (✓) · `PaneHeader.vue:76` `opacity:0`-at-rest + `::before` feather mask (✓, R2 target
  real) · `useContrastSafeColor.ts:17-18` `BG_LIGHTNESS 0.15/0.97` (✓) · `PaletteCardSkeleton.vue:82`
  `variant: "shadow" | "specimen" | "developing"` with the `specimen` register shipping ZERO consumers
  (grep: only `variant="developing"` is passed — `BrowsePane.vue:111`, `ExtractWorkbench.vue` key
  "developing"; the "specimen register FINALLY consumed" premise holds) · `panes/keys.ts:46-47`
  `harmony:"analogous"` / `colorEnergy:0.7` (the R6 bracket LOW end — faithful).
- **Q2 values match W2-5** — `T.md:514` Q2 default = "hueSpread [24°,64°] · energy 0.76 · ONE counterpoint
  stop (+165°, 0.6×C) · softmaxBeta 4 · breath 26s" ≡ the W2-5 composition (`T.W2.md:54`). Ratified frame
  present; W2-5's calibration is anchored to a real Q row.

## Recovery-readiness verdict

W2's hydration-first spine and W3's ladder table are cold-resumable: anchors are live, C4 is enforced,
the tripwire and O-18 are ownable. The ONE structural blocker is **M1** — W3-5's ink contract has an
un-drawn hard dependency on W2's exclusive boot chain, so a cold W3-5 agent stalls at a cross-wave
boundary (the grep gate can't close; the atmosphere-lightness source can't be threaded). Fix M1 (draw
the W2↔W3-5 ink dependency, either by re-sequencing or by moving the boot-side retirement into W2) plus
the S1 markdown-duplicate inventory miss, and the ink half of W3 becomes executable. S2/S3 are
writer-map/anchor hygiene that will misdirect but not hard-block.
