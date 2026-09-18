# Arm A — Parse Program Compliance Audit (of the Codex V-next formation)

**Lens:** PARSE PROGRAM COMPLIANCE — L1 §2, P1, E-C1/E-C12/E-C14/E-C15 (+ E-L1-S2.*, E-P1.*, E-P2.2-R-PARSER/R-SPRING-GRAMMAR/R-HDR, E-P3.4-5, E-P5.3).
**Snapshot graded:** `/Users/mkbabb/.claude/jobs/9e7dadd0/tmp/apotheosis/snapshot-vnext` (frozen 2026-07-19 21:29).
**Primary artifacts read fully:** `PARSER-CSS-COLOR.md`; `waves/P-V.md` (P00–P07, V03–V29T); `DISPOSITIONS.md` parser table; `PROMPT-RECAP.md` parser rows; corpus greps for `164343c1`, `src/parsing`, `css-parse-perf`, `PT-E`.
**Method note:** grep-verified the two load-bearing absences below (`164343c1` = 0 hits; `src/parsing`/`resurrect` = 0 hits corpus-wide).

---

## VERDICT SUMMARY

The formation is **strongly compliant on the readoption axis** (parse-that as published, immutable, no republish, all internal novelty routed external) and **strongly compliant on spec breadth** (the July-2026 CSS census exceeds the edict). It **diverges materially on the RESTORATION axis**: it silently drops the mandated `164343c1^` resurrection recipe and the deposed-bench regression witness, re-architecting R-PARSER as a *greenfield* handwritten BBNF-mirror that is **externally blocked** on an unfrozen GPT SK-V25 BBNF campaign, and it never produces the C14-mandated prototype+benchmark **NOW**. Two designated owner-decision rows (spring() grammar, HDR) were unilaterally foreclosed.

---

## CORRECT (recorded with equal rigor)

### C-1 — parse-that readopted as published 1.0.0, immutable, never republished — CORRECT (exceeds)
- **Edict:** E-C1 / E-C15 / E-P1.6 / E-L1-S2.3 — leveraged as published, no novelty, no publish >1.1.
- **Evidence:** `PARSER-CSS-COLOR.md:7-9` "Published `@mkbabb/parse-that@1.0.0` supplies the immutable parser-combinator substrate … This tranche never alters or republishes it."; `:21-22` "This tranche does not perform the clean-breaking parse-that reset … C10 leaves 1.0.0 unchanged and unpublished." Wave P04 mission "Freeze the sole parse-that `no-rc` receipt"; gate "signed `unchanged-1.0.0-no-republish` receipt" (`waves/P-V.md:68`). P07 "unconditional C10 no-republish instruction" (`:71`). `DISPOSITIONS.md:9` "parse-that release | **No release**".
- **Note:** the formation adopts the STRICTER `unchanged-1.0.0-no-republish` (zero source mutation) rather than C1's "minor fixes only if needed." This is tighter than our binding canon (matrix Finding F4) but SAFE, because any needed fix routes external (see C-2). Not a violation.
- **Severity:** n/a (compliant).

### C-2 — all parse-that-internal novelty OUT OF SCOPE, routed external — CORRECT
- **Edict:** E-P1.3 / E-P1.6 / E-C1 — Tape/SoA, Pratt, new combinators, result-model, package topology out of scope; needs route as PT-E letters.
- **Evidence:** `DISPOSITIONS.md:10-16` route New-run/result-model, Tape/SoA, Pratt, Diagnostics/recovery, Core/entry/module-format, BBNF host/emitter each to **PT-E/BBNF handoff** with "no local repair." `waves/P-V.md` P02 "route each without creating a Value-owned parse-that patch branch"; P03 banks packets under `parse-that/docs/tranches/B/`. `PARSER-CSS-COLOR.md:64-65` "Package representation … new combinators, Tape/SoA, and Pratt work are outside V-next." Handoff carrier `coordination/BBNF-PARSE-THAT-MAJOR-HANDOFF.md`.
- **Severity:** n/a (compliant).

### C-3 — standing PT-E letter carried with per-ask disposition — CORRECT
- **Edict:** E-P5.3 — the PT-E letter (diagnostics HIGH / inference MED / Pratt-dormant) rowed with a disposition per ask.
- **Evidence:** `DISPOSITIONS.md:14` diagnostics/recovery → bank+route; `:10` new result model / RunContext (inference substrate) → route externally; `:13` Pratt → route externally. Live coordination stream `coordination/pt-e-bbnf-live-coordination-v2.json` + frozen `pt-e-bbnf-handoff-v1.yaml`.
- **Severity:** n/a (compliant).

### C-4 — no re-contest of the seat; regex retired unconditionally — CORRECT
- **Edict:** E-L1-S2.2 — restoration framing, "no wave re-contests the seat."
- **Evidence:** V03 born-RED witness "The current `/css` implementation fails valid, malformed, recovery, Unicode, pathological, serializer, value-ingest or traced keyframes-ingest partitions" (`waves/P-V.md:82`) — the regex parser is condemned wholesale and replaced; no parse-that-vs-custom head-to-head wave exists. `PARSER-CSS-COLOR.md:15` "No … dual parser … may land."
- **Severity:** n/a (compliant).

### C-5 — spec-completeness census vs July-2026 CSS — CORRECT (exceeds)
- **Edict:** E-L1-S2.6 broadened by E-C12 (entire July-2026 CSS incl. experimental + CSSOM + WAAPI + keyframes/animation/timeline/stylesheet, DOM-congruent typed values).
- **Evidence:** V01 `standards-lock.json` "CSSWG/Snapshot normative closure, at-risk allowlist, curated Webref … WPT" (`waves/P-V.md:80`); V02 total facts/support/feature-matrix join over "at-rule/descriptor/property/selector/type/function/unit/alias/shorthand/WebIDL inventory" (`:81`); CSSOM V10I/V10S/V10D; Typed OM V11; color V12–V22; easing/animation/timeline/triggers V25/V26/V27/V28; V29 closes "every feature operation cell." Named restores present: `color-mix()` (V17), relative-color `from` (V14), `contrast-color()` (V20).
- **Severity:** n/a (compliant; breadth is the corpus's strongest parser-program alignment).

### C-6 — dual BBNF + parse-that TS definition exists as a topology — CORRECT-partial
- **Edict:** E-C14 — parser defined BOTH in idiomatic BBNF (split sub-grammars via bbnf module facilities) AND as parse-that L4 impl in `src/css/`.
- **Evidence:** `PARSER-CSS-COLOR.md:334-351` — 15 BBNF L4 modules (`grammar/css/l4/*.bbnf`) ↔ 15 handwritten `src/css/grammar/l4/*.ts` peers, "each TypeScript peer … handwritten with published parse-that 1.0.0 combinators," bound by `CSS-MODULE-ISOMORPHISM.json`. The dual-definition SHAPE is faithfully specified.
- **Severity:** the shape is correct; the "prototyped and benchmarked NOW" clause of C14 is NOT met — see WRONG W-3 (which is why this is CORRECT-partial, not fully CORRECT).

---

## WRONG / PARTIAL / MISSING

### W-1 — the `164343c1^:src/parsing/` RESTORATION recipe is silently dropped — WRONG
- **Edict-matrix rows:** E-L1-S2.4, E-P2.2-R-PARSER, E-L1-S2.2 (P1).
- **Test:** "An R-PARSER wave cites the `164343c1^` recipe … resurrect the deposed tree … modernized to the v4 `/css` surface (signatures frozen)."
- **Evidence:** corpus-wide grep `164343c1` = **0 hits**; `src/parsing` = **0 hits**; `resurrect`/`deposed`/`combinator incumbent` = **0 hits** in any wave/spec. R-PARSER is realized as V03, whose deliverable is "byte-identical complete `src/css/grammar/**` mirror … **from P01**" (`waves/P-V.md:82`) where P01 is "an exact handwritten TypeScript parse-that-combinator mirror of every runtime BBNF CSS module" (`:65`) — i.e. authored fresh from the external BBNF union, NOT restored from the deposed measured incumbent.
- **Why it matters:** the charter's explicit method ("'Proper parse-that adoption' = RESTORATION of the deposed incumbent … the head-to-head has never been run") and addendum-2's "deep archaeology … the ill-defined and slow parser" are replaced by greenfield authorship with no owner-decision row acknowledging the deviation — a silent drop under E-L1-S7.1. The v4 signature-freeze *sub-clause* IS honored (V03 "Frozen v4 signatures/corpora"; six-key `./css` export freeze, `PARSER-CSS-COLOR.md:623`), so this is a partial-within-WRONG: the freeze survives, the restoration source does not.
- **Fair counterweight:** authoring fresh from canonical BBNF plausibly serves E-C14 ("idiomatic … leveraging the full parse-that facility suite") BETTER than modernizing a year-old tree. The design has merit; the **procedure** (dropping a named recipe + its regression baseline without an owner row) is the defect.
- **Severity:** P1 (material — a named charter recipe dropped, archaeological continuity + regression baseline lost).

### W-2 — the value-OWNED CSS parser spine is externally BLOCKED on an unfrozen GPT campaign — WRONG
- **Edict-matrix rows:** E-C1 / E-P1.6 (external routing was scoped to parse-that-INTERNAL work, not the value parser) + E-C16 isolation risk (P1).
- **Evidence:** `PARSER-CSS-COLOR.md:375-385` "the union is not yet frozen and its T/U evidence remains isolated. **Therefore P01 cannot execute from the 15-file formation snapshot.**" P01 deps "P00, V01, V02" and P00 gate "after—not before—the active CSS union closes" (`waves/P-V.md:64`). `P01-INDEPENDENT-AUTHORSHIP.json` state **`born_red`**, **0 authors** (README/inventory §Appendix). `PARSER-CSS-COLOR.md:364-373` the SK-V25 union "currently assays 84 specifications … RED observations, not authority … remain open."
- **Why it matters:** the charter's restoration was **self-contained** (a git recipe that EXISTS NOW). The formation converted value's OWN CSS parser (V03→V04→…→V29→V29T, the entire spine) into a hard downstream of an actively-moving external GPT-5.6 BBNF fleet whose terminal freeze does not exist. E-C1 authorized routing parse-that *substrate* novelty external — not gating value's parser authorship on external completion. This injects the exact "close-class lie" risk (blocked-work presented as formed) the charter warns against, and couples the tranche to a fleet the isolation law (E-C16) treats as read-only/uncontrolled.
- **Severity:** P1 (material — structural fragility beyond charter; the parser spine cannot begin until an external, unfrozen artifact lands).

### W-3 — C14's "prototyped and benchmarked NOW" is not satisfied — MISSING
- **Edict-matrix row:** E-C14 (P1).
- **Test:** "a prototype + benchmark is produced in THIS formation (execution deferred to the tranche)."
- **Evidence:** `P01-INDEPENDENT-AUTHORSHIP.json` is "intentionally `born_red`: it contains zero author receipts" (`PARSER-CSS-COLOR.md:407-410`); "Formation does not pretend those future artifacts or sessions exist." No prototype parser and no benchmark run exist in the corpus — all authorship is deferred behind the P00 external-freeze gate (W-2). The formation produced the dual-definition *topology* (C-6) but no *prototype/benchmark* as C14 mandates NOW.
- **Severity:** P1 (a specific formation-phase owner mandate — build+benchmark the prototype now — went undone; the block in W-2 is the proximate cause).

### W-4 — bench NOT resurrected as regression witness; no one-time regex baseline — PARTIAL
- **Edict-matrix rows:** E-L1-S2.5, E-P3.4-5 (P1).
- **Test:** "resurrect the bench corpus (`164343c1^:bench/css-parse-perf.mjs`) + portable ratio gate (MB/s + ns/call + co-scaling), born-RED until it meets the gate; measure the retiring regex parser ONCE for the record."
- **Evidence:** `css-parse-perf` appears **nowhere** in `waves/P-V.md` or `VALUE-TARGET-PATHS.json` (grep). No `bench/` resurrection wave; no one-time regex-parser measurement row. What exists is forward-only: V03 "co-scaling benchmark" (`waves/P-V.md:82`) and P05 "statistical latency/throughput … over the exact P01 corpus" against the **published 1.0.0** control (`:69`). The recorded ratio recipe (MB/s + ns/call + co-scaling) and the born-RED regression-witness framing against the deposed baseline are absent.
- **Severity:** P1 (the "regression WITNESS" purpose — proving the restored parser is not slower than the measured incumbent — is unbuilt; a forward co-scaling budget is a weaker substitute).

### W-5 — spring() grammar owner-decision unilaterally foreclosed — PARTIAL/WRONG
- **Edict-matrix row:** E-P2.2-R-SPRING-GRAMMAR (P2).
- **Test:** "A decision row for spring() grammar ownership citing K F6.6; solver ownership not re-opened; **no wave pre-empts the decision.**"
- **Evidence:** `PARSER-CSS-COLOR.md:90` "CSS `spring()` does not exist." V25 exclusion "No CSS `spring()`. Historical spring grammar is tombstoned; keyframes may compile programmatic spring to bounded standard `linear()`" (`waves/P-V.md:113`). The edict designated this an **OPEN** value-vs-kf ownership decision "leaning value (CSS-spec territory)"; the formation converted it into a settled tombstone.
- **Why it matters:** factually spring() is genuinely not in the CSS spec, so the disposition is defensible — but the owner reserved this as a decision row, and the formation removed value's grammar claim without surfacing it for the owner (foreclosing an E-P2.2 row).
- **Severity:** P2 (procedurally forecloses a designated owner-decision; factually grounded).

### W-6 — HDR restore owner-decision pre-empted by implementation — PARTIAL
- **Edict-matrix row:** E-P2.2-R-HDR (P2).
- **Test:** "An owner-decision docket row for HDR restore; **no wave pre-empts the decision.**"
- **Evidence:** V19 "Implement the exact HDR/extended/profile inventory … Pinned HDR spaces/functions/limits … ICtCp/Jz/Rec.2100/HDR rows" (`waves/P-V.md:104`). The 11-day HDR parse drop (ictcp()/jzazbz()) is thus RESTORED-by-fiat rather than presented as the "owner decides vs the CSS-native-only law" row the edict mandated.
- **Why it matters:** arguably subsumed by E-C12 (full spec coverage), but the edict specifically flagged HDR as an owner-decision; implementing it without the decision row is a pre-emption.
- **Severity:** P2 (defensible under C12 breadth, but the designated decision row is absent).

---

## CROSS-CUTTING OBSERVATION (not a scored row)

The parser program's compliance profile is **inverted from the charter's intent**: the charter framed the parser as the LOW-risk, self-contained half (restore an existing measured tree + its bench, contest nothing) while the color program carried the novel engineering. The formation instead made the parser the **highest-risk, externally-gated, un-prototyped** band (P00/P01 born_red, blocked on an unfrozen external fleet, zero authors, no bench baseline) while faithfully executing the readoption/no-republish discipline. The apotheosis should preserve the formation's readoption rigor (C-1..C-5) and its dual-definition topology (C-6), but restore the charter's **self-contained restoration path** (`164343c1^:src/parsing/` + `164343c1^:bench/css-parse-perf.mjs`) as the un-blocked spine, using the BBNF isomorphism as an *additive* C14 definition rather than the *sole, externally-gated* source of the parser.
