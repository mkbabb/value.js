# h-seam-plan-audit-2 — HARDENING seam audit of `t-plan-audit-2.md`

**Lane**: `h-seam-plan-audit-2` (T hardening / adversarial re-verification) · **Substrate**: `tranche-t`
@ `2db417e` · **Product under audit**: `docs/tranches/T/audit/lanes/t-plan-audit-2.md` (756 lines,
committed `4196b50` — a lane **COMPLETED FROM A PARTIAL** after its pass-1 died on a session limit
UNCOMMITTED; pass-2 wrote §2.1/§3.1/§8 + three matrix rows).

**Charge**: independently re-verify the file's load-bearing claims against the live tree + S-close
records (goal-vs-landed for S W4–W7 + W9); hunt truncated sections, claims without evidence, coverage
gaps vs its declared W4·W5·W6·W7·W9 scope. Adversarial posture: a clean bill requires evidence.

**Bottom line**: the file's forensic CORE holds up under adversarial re-verification — **every plan-side
line cite, every landed-side source cite, every S-close verdict, the F22 dist-clobber mechanism, and the
§3.1 shot-map correction verified TRUE** (§A). No truncation: the header's three promised sections
(§2.1/§3.1/§8) are all present and non-stubbed. The defects are at the **seam** the recovery froze — a
substrate-state claim about the companion lane that is now false (MF/SF ledger below), plus four
completeness NOTEs. **0 MUSTFIX · 1 SHOULDFIX · 5 NOTES.**

---

## §A — What I independently re-verified TRUE (the evidence for the clean core)

This is not "absence of alarm" — each was read from the live tree or the disk this pass:

1. **Plan-side line cites — ALL EXACT.** `S.W4.md:31` (W4-1 `size="audacious"` rung), `:32` (W4-2
   "readout spans the full header"), `:35` (W4-5 rail→SegmentedTabs, conceit-retired, verify-or-book),
   `:37`/`:38` (W4-7 `font-display` ×9 / W4-8 "letterforms speak ONE ink"); `S.W5.md:42` (W5-2 rider,
   "hard edge DEAD at rest" verbatim), `:45` (Q6 true-empty-only), `:46` (W5-6 recomposition/F8), `:48`
   (W5-8 webbing facility), `:49` (W5-9 ramp strip / L7); `S.W6.md:35` (W6-1 cold-boot), `:38` (W6-4
   corner-break ≥25% overflow "kills the About-card burial"); `S.W7.md:35` (W7-1 rim adopts
   `--accent-view`, "reads intentional"), `:38` (W7-4 color-wheel-legend, "rainbow menu one-off dies"),
   `:40` (W7-6 Tools chevron). Every row sits on the exact cited line.

2. **Landed-side source cites — ALL EXACT.** `ColorSpaceSelector.vue:35` `size="audacious"` + `:37`
   `font-display italic`; `ColorComponentDisplay.vue:12` `flex … w-full … gap-x-3 flex-wrap` + `:21`
   `${readoutCh}ch`; `ComponentSliders.vue:36/49-51/88-94` (caption/range/hover-jailed value);
   `PaneHeader.vue:76` `opacity:0` at rest; `panes/keys.ts:46-47` `analogous`/`0.7` + the
   "W6-3 triad/0.82 overshoot lost the seed's identity" comment (`:24`, verified present);
   `DockViewSelect.vue:44` `var(--accent-view-${id})` + admin=gold; `PaletteCard.vue:49` `text-subheading`;
   `GenerateControls.vue:106-108/111/116` toolbar comment/`primary-audacious`/Regenerate; `style.css:119`
   `--default-transition-duration: var(--duration-fast)`.

3. **S-close verdicts — MATCH `S/FINAL.md`.** W4 `complete` "taste bar MET"; W5 `complete` (same-day cap
   cure); W6 `complete_with_misses` (GAP-L2, GAP-L5, row-9, mid-gate recalibration); W7
   `complete_with_misses` (one miss = PRM-expand, producer-rooted; handoff "INTENTIONAL"); W9
   `complete_with_misses` (zero-drop §10 ledger, live book re-probes, caps/legacy/as-any sweeps,
   COHERES_WITH_NOTES). All accurate.

4. **F22 dist-clobber MECHANISM — CONFIRMED (I nearly filed a false-positive against it).** A grep of
   `dist/styles/components.css` shows the `:root` block has **no `@layer`** — which superficially looks
   like the audit's "inside `layer(components)`" claim is wrong. It is NOT: the layer assignment lives on
   the parent `@import` in **`node_modules/@mkbabb/glass-ui/dist/styles/index.css:1`** —
   `@import "./components.css" layer(components)` — and the demo pulls exactly that file
   (`style.css:52` `@import "@mkbabb/glass-ui/styles"` → package `"./styles": "./dist/styles/index.css"`).
   The consumer alias sits in `@theme` (Tailwind's lowest `theme` layer), so **layer order theme <
   components → the producer's 150ms literal out-cascades** — the audit's story is right to the letter.

5. **§3.1 shot-map correction — CONFIRMED against the actual image.** I read
   `owner-screenshots/t-2002-52.png` from disk: it is unambiguously the **blob** (a red sphere clipping
   over the "Abo…" title, lower-left quadrant behind the About card) — NOT the readout. The mandate maps
   T-7→`t-2002-52` (MANDATE line 114); the audit's re-home to T-8 is correct AND already adopted by
   `audit/SYNTHESIS.md §0` (lines 35-37: `t-2002-52` = T-8 blob · `t-2004-32` = T-10 nav legend). Three
   lanes concur; the correction is sound.

6. **Structural spot-checks — CONFIRMED.** `GenerateControls.vue`: `<PaletteCard/>` self-closes (`:104`)
   and the Regenerate `<div>` (`:109`) is a **sibling below it** in the flex column — F21's "landed
   OUTSIDE the plate" is structurally true (I read the template, did not merely inherit t-misc-elements).
   `variant="shadow"`/`ShadowPalette` in `demo/` = **0** (F9 zero-consumer, §8.4 spot-claim holds).
   `.cartoon-surface` in `demo/` = **0** (F22's "zero cartoon-surface" holds). No truncation: file ends
   cleanly at §8.7; all pass-1 in-body corrections (F4 cross-ref, F5 range-caption ID, F9 Q6 clause) are
   present as the completion note claims.

---

## §B — Findings

### SF-1 · SHOULDFIX · The companion-lane note is STALE: `t-plan-audit-1.md` is declared "NOT present / do not cite as extant" but it IS landed

- **Corpus location**: `t-plan-audit-2.md` header lines **31-32** (*"`t-plan-audit-1.md` (W0–W3) …
  NOT YET LANDED in the tree at this head (do not cite it as extant)"*) and §8.2 line **670-671**
  (*"`t-plan-audit-1.md` (W0–W3 companion) confirmed **NOT present** on disk — the draft's
  do-not-cite-as-extant note holds"*).
- **Evidence**: `t-plan-audit-1.md` IS on disk (29,729 bytes) and was committed at **`385c2d2`**, which
  is the parent of t-plan-audit-2's own completion commit **`4196b50`** — i.e. the W0–W3 companion had
  ALREADY landed *before* t-plan-audit-2 was committed. Its header confirms it is the disjoint W0·W1·W2·W3
  partner. So §8.2's "confirmed NOT present on disk" was **false at commit time** and is doubly false at
  the current head (`2db417e`).
- **Why load-bearing**: this is the exact "completed-from-partial froze an earlier substrate moment" seam
  the mandate warns of. A synthesis reader following the instruction "do not cite it as extant" would
  under-rely on an existing, landed W0–W3 audit — leaving the W3/W4 boundary (notably T-14, which
  part-2 folds despite its W3-5 root) apparently unpartnered when it is in fact covered.
- **Proposed amendment**: the amend pass replaces the header + §8.2 companion note with the true state —
  `t-plan-audit-1.md` IS landed (`385c2d2`), IS the W0–W3 companion, and part-1/part-2 together achieve
  the zero-drop W0–W9 mapping; cite it as extant.

### NOTE-2 · F7/T-23 CLASS-B framing omits the Safari/Firefox always-on-at-rest fallback

- **Corpus location**: §2 **F7** (lines 186-200) + the §6 matrix row T-23 (line 592) + §8.3 (line 689):
  the finding states categorically the band is *"`opacity:0` at rest … the exact inverse of the rider's
  gate,"* pure CLASS-B.
- **Evidence**: `PaneHeader.vue:60-64` (the source comment above the `::before` rule) documents that
  engines **without** scroll-driven animations resolve the `0s` fill-both animation to its **END state —
  the always-on veil, still feathered**. So on Safari + Firefox the band **is shaded at rest** (precisely
  what T-23 asks for); the `opacity:0`-at-rest defect is **Chromium-only**.
- **Why it matters**: the pure CLASS-B ("owner reverses a correctly-realized spec") framing is only
  exact on Chromium. The cure direction (invert the gate to a rest-floor alpha) must **preserve** the
  non-Chromium always-on path, not merely flip the Chromium scroll gate — else T regresses Safari.
- **Proposed amendment**: F7 gains one clause noting the non-scroll-timeline always-on fallback (band
  already shaded at rest on Safari/Firefox) so the cure re-earns it as constitutive material on ALL
  engines, not just Chromium.

### NOTE-3 · Load-bearing sibling-lane quantities are inherited, not re-verified — the F22 "46 callsites / 37 files" blast number did not reconcile with a quick probe

- **Corpus location**: §2.1 **F22** (lines 324-325) *"37 files / ~46 bare `transition-*` callsites"*;
  §2 F6 (line 165) *"9 distinct alphas"*; §1 F3 (line 111) *"1.01:1 dark-mode letter contrast."* §8.4
  honestly lists these lanes as cited-not-re-derived.
- **Evidence**: a narrow independent grep (`transition-(all|colors|transform|opacity|shadow)` over
  `demo/@`) returned **~21 files**, not 37 — likely a pattern-width difference (the audit's number is
  t-transitions-liquid's, counting `transition:` CSS + more suffixes), but the gap did not reconcile in a
  quick probe. The 46-callsite figure is the one **sizing F22's P0 blast radius**.
- **Why it matters**: the audit discloses the inheritance (no hidden defect), but the single number that
  drives F22's "single biggest not-liquid contributor / P0" framing is the least-verified. For the
  adversarial charge this is the residual soft spot.
- **Proposed amendment**: the amend pass spot-reconciles the 37/46 against t-transitions-liquid's actual
  enumeration (and F6's 9-alpha census against t-card-material) before the P0 sizing is treated as fact
  by the synthesis.

### NOTE-4 · §8.3's F22 evidence pointer cites the file with the literal, not the file with the layer clause

- **Corpus location**: §8.3 line **693-694**: *"F22/T-14 `style.css:119` alias + dist `components.css`
  150ms clobber ✓ (grep -c = 1)."*
- **Evidence**: the grep on `components.css` confirms only the **150ms literal**; the load-bearing
  **`layer(components)`** half of the mechanism is evidenced in `dist/styles/index.css:1`
  (`@import "./components.css" layer(components)`), which §8.3 does not cite. The §2.1 body prose IS
  correct (§A.4); only the evidence trail points at the wrong file.
- **Proposed amendment**: extend the §8.3 F22 cite to name `dist/styles/index.css:1` as the source of the
  layer-assignment half, so a future re-verifier lands on the file that actually carries the clobber
  mechanism.

### NOTE-5 · S.W8 is silently omitted from the "back-half waves" scope without stating it was the unfired 5.0.0-adopt trigger

- **Corpus location**: the title (line 1) and scope (§0) declare "S waves W4·W5·W6·W7·W9" — W8 is absent
  with no explanation.
- **Evidence**: `S/FINAL.md:46` — S.W8 (5.0.0 adopt) is **"NOT DISPATCHED — trigger never fired"**
  (registry `latest=4.2.0`, no v5 tag). So there is genuinely nothing landed to plan-vs-land for W8; the
  skip is **correct**, just **unstated**.
- **Proposed amendment**: a one-line scope note ("W8 = the trigger-gated 5.0.0 adopt, UNFIRED in S's
  window per FINAL.md §5 — nothing landed, so out of a plan-vs-landed audit; it hands to T's own adopt
  trigger intact") closes the transparency gap a reader would otherwise hit.

### NOTE-6 · The "~24 findings" figure is a loose approximation against a 28-mapped ledger

- **Corpus location**: §0 line 51 and §5 line 531 both cite *"~24 findings"*; the §8.5 ledger maps
  **T-1..T-29 minus T-9 = 28** in-scope T-numbers (collapsed to F1–F22 findings).
- **Evidence**: the "~" makes this rhetorical, not a hard count; several T-numbers share one finding
  (T-3/11/18/24→F6; T-1/25/27→F12), so "~24" is a defensible middle estimate between 22 findings and 28
  T-numbers. No correction strictly needed — flagged only so the amend pass does not treat "24" as a
  precise oracle if it ever becomes a gate input.

---

## §C — Coverage-completeness verdict (my scope)

- **Zero-drop over W4–W7 + W9**: confirmed. The §8.5 ledger maps all 29 mandate T-findings; T-9 is the
  single explicit out-of-scope (W0-1, part-1's lane) with its shot + UX owner recorded. No W4–W7/W9
  owner surface is unmapped.
- **W3/W4 boundary (T-14)**: the fold of T-14 into part-2 (despite its W3-5 alias root) is justified in
  the file (owner-felt surface = the W5 card population; cure = the same F6/T-24 card-decision seam);
  once SF-1 is applied, part-1 genuinely partners it at the W3 root.
- **No truncation / no stubbed sections**: §2.1 (F20–F22), §3.1 (shot-map), §8 (verification trail) all
  present and substantive; the header is truthful about them.

**Net**: `t-plan-audit-2.md` is a strong, largely-verified artefact whose only real seam is the frozen
companion-note substrate claim (SF-1). The taxonomy, the class assignments, and the F18 verification-
method thesis rest on cites that all check out.
