SERVED MODEL: claude-fable-5-1
# G20 — CLOSURE, BOTH SOURCES · run at the frozen operand by unit `f` (2026-09-18)

**Seat**: F.W1 unit `f` (successor seat; the first `f` seat was killed by the 2026-09-18 host restart). This seat authored neither `waves/F-W1.md` nor unit `a`'s bytes (G20's two-key falsifier, R4-4). **Instrument**: `evidence/w1/g20-join.mjs` — **INHERITED** from the killed seat, read whole, judged against §3 G20's four detector arms, and kept with ONE correction: its line 2 carried a `#!/usr/bin/env node` shebang *below* the mandatory line-1 `SERVED MODEL` comment, which is a `SyntaxError` under ESM — the file as inherited **could not run** (⟨cmd⟩ `node g20-join.mjs …` → `SyntaxError: Invalid or unexpected token` at `:2`, twice). The shebang line was deleted; no other byte of the instrument changed. The detector it implements is the canonical's RETAINED derivation — the `(record, id)` PAIR join over §6·R4's paste against the spec **minus** that paste (`:550-614`, so the paste cannot green itself) — and it re-cuts no denominator.

## Operands, pinned at run time (double-run)

| operand | ⟨cmd⟩ | output (run 1 · run 2) |
|---|---|---|
| canonical digest | `shasum -a 256 conformance/CENSUS-CANONICAL.md \| cut -c1-12` | **`f44362757458`** · **`f44362757458`** |
| roster lines | `awk '/^### F\.W1 — /{f=1;next} f&&/^### F\.W2 /{exit} f&&/^- /{print}' CENSUS-CANONICAL.md \| wc -l` | **65** |
| roster rows (per-record parentheticals summed) | the spec's own awk at §6·R4 | **330** |
| roster ids (backtick delimiters ÷ 2) | `… \| tr -cd '\140' \| wc -c` | **660** ⇒ 330 |
| paste bounds at the true bytes | `sed -n '549p;550p;614p;615p' waves/F-W1.md` | `:549` blank · `:550` `- **fr-AdminAuditLog** (3)…` · `:614` `- **fr-VisualizationView** (4)…` · `:615` `#### §6·R4a` |
| paste ⟷ roster | `awk 'NR>=550 && NR<=614' waves/F-W1.md \| diff - roster.txt` | differs ONLY by the E6-3 strike annotations (`~~· \`K-n\`~~ <sub>…TERMINAL…</sub>`) on 21 lines; **every live id set is byte-identical** (65 lines both sides) |
| spec minus paste | `awk 'NR<550 \|\| NR>614' waves/F-W1.md` | **811** lines |
| carry rows | `## §Rows` … `## §Gates` bullets of `carry/F-W1-CARRY.md` | **105** |

## The run (⟨cmd⟩ `node evidence/w1/g20-join.mjs <scratch> docs/tranches/X/fourier`, twice — outputs byte-identical, `diff` → ∅)

```
LEG (b) — pairs 330 · records 65 · canonical §1 tokens indexed 2147
  RECORD-QUALIFIED: 235
  TOKEN-UNIQUE (present; the token is homed by exactly one canonical record): 60
  HOMONYM-TAIL (present; token carried by ≥2 canonical records — read the cell): 34
  ESCAPES (absent by bytes outside the paste): 1
    ESCAPE fr-ExportModal R2-1
FABRICATION CHECK — spec-booked (record,id) claims at §6·R5 + §2·R4a/b: 56; not homed F.W1 by the canonical: 20
LEG (a) — carry ids 105 · found in spec 104 · missing 1
    CARRY-MISS `.dock-separator` RE-CLASSED OUT of the break table
```

## Leg (a) — the carry direction: **105 / 105 → ∅** (GREEN)

The instrument's one miss is a tokenizer limit, not a spec absence: the carry row's "id" is prose (``\`.dock-separator\` RE-CLASSED OUT of the break table``). The spec carries it at **§5** (*"`.dock-separator` as a version-forced touch (K-8/R-10) | KILL, load-bearing … F.W1 must NOT budget it"*) and at **§6** (*"`.dock-separator` kill (K-8/R-10) → §5"*) — ⟨cmd⟩ `grep -c 'dock-separator' waves/F-W1.md` → **3**. Reverse direction: the 104 tokenized hits plus this one = 105; no spec-minted row exists (every §2/§5 row cites a carry id; every §2·Rn/§6·R5 row cites a banked `fr-*` id).

## Leg (b) — the registry direction: **328 / 330 booked-or-cited · 2 ESCAPES · 0 FABRICATIONS** → **RED by two named rows**

**The 34-pair homonym tail, read cell by cell** (the join's "first work", §6·R4a). Each pair's own row was pulled from its adjudicated record and set against the spec cell that carries the token. **32 resolve to a cell that was always about that record's row**; **1 is an escape-by-reading**; 1 is double-listed (`R2-2` ×2, one row each).

| verdict | pairs |
|---|---|
| **BOOKED by identity cell** (the record's row IS the §2 identity or a named member of it) | `fr-AdminAuditLog AA-2` (WU-C) · `fr-BasisSelector B-2` (WU-I `B-2 (--slider-scrub-*)`) · `fr-BasisSelector m-21` (WU-I) · `fr-CanvasControlsDock D-7` (WU-G Popover union: *"D-7 and C-13 die WITH the union"*) · `fr-CoefficientsSpectrum M-16` (WU-A) · `fr-ContourEditorCanvas C-11` (WU-K `R-18 / C-11 / FR-CP-15`) · `fr-ContourSettings m-17` (WU-S NWO-1 member) · `fr-ContourSettings K-11` (WU-G *"K-11 scope note carried"*) · `fr-FourierShapeExtractor D-13` (WU-P `FR-COB-16 / D-13 …`) · `fr-FourierShapeExtractor C-13` (WU-L `C-13 (pencil-boil raw TS)`) · `fr-FourierShapeExtractor C-16` (WU-L `C-15+C-16`) · `fr-FunctionInput D-13` (G4 blocks `D-13/D-18`) · `fr-GalleryCard K-5` (WU-E *"Kill carried (K-5)"*) · `fr-GalleryDraftsSection M-6` (WU-P rest-state tone) · `fr-GalleryDraftsSection m-2` (WU-H) · `fr-InfoCard R2-2` (WU-A version-conditional LAW) · `fr-MorphShapePreview D-20` · `fr-MorphShapePreview D-26` (WU-O `D-18/C-13 · D-20 · D-26`) · `fr-PaperSearchInput D-M1` (WU-P re-inks) · `fr-PaperView C-15` · `fr-PaperView C-19` (WU-L manifest pass) — **21** |
| **CITED by carried fold** (the record's own row says "folds by reference to …", and that identity is a §2 cell) | `fr-AppHeader C-19` → WU-E `D-1/BC-1/C-1` · `fr-BasisSelector C-4` → WU-E `D-2/BC-5/C-3` · `fr-CoefficientsSpectrum C-6` → WU-N lucide census + WU-L `C-3` · `fr-EqCoefficientsPanel D/B-2` → WU-F `B-1`/G10 · `fr-EqCoefficientsPanel D/M-8` → WU-F `B-1` (*"Witness-ordering lock (D/M-8)"*) · `fr-FourierShapeExtractor SC-3` → WU-A `M-16` / NWO-2 (hash-not-version) · `fr-FunctionInput D-12` → `AA-2` · `fr-GalleryCard D-4` → WU-E `D-2` · `fr-GalleryCard D-8` → `AA-2` · `fr-GalleryInfiniteGrid C-6` → WU-E `D-1` via `fr-App B-1` · `fr-GlassTimeline R2-2` → WU-I `MPC-21 / BR-1` (killed as a re-book) · `fr-MorphShapePreview D-11` → §2·R4b `FMD-12` — **12** |
| **ESCAPE by reading** | **`fr-ContourSettings M-4`** — the spec's `M-4` tokens (WU-P `FR-AFP-16 / M-4 / …`, §6·R4c) are `fr-GalleryDraftsSection`/toast rows; this record's `M-4` (the literal `h-10` on `SelectTrigger :211` deleting `h-(--control-h-md)` and the coarse-pointer clamp) has **no F.W1 cell**. The record's own arrow is *"**→ F.W3/W4** (delete the override band; the cn seam itself is m-17)"* — the canonical's F.W1 home rests on the mention-line *"F.W1/F.W3 must not carry D's five-row table as fact"*. **Disposition offered, not made**: either a §2·R6 CITED row (held F.W3/W4, beside `m-17`) or a canonical errata re-home; both are the spec/census seat's acts — this seat re-homes nothing (R4-10) — **1** |

**The one escape by bytes — `fr-ExportModal R2-1`.** The record's `R2-1` is the ruling row that SUSTAINS `K-16` (D-M3's WCAG 2.5.8 headline killed on two independent grounds: the Equivalent exception and the Spacing exception). The spec's §2·R2a.1 cell (`:361`) carries that kill's SUBSTANCE — ⟨cmd⟩ `sed -n 361p waves/F-W1.md | grep -o '2\.5\.8 \*\*headline\*\* is KILLED on two independent grounds'` → matches — but never the **token**: ⟨cmd⟩ `grep -n 'R2-1\b' spec-nopaste.md | grep -v 'R2-1-LAW'` → **∅**. Under arm (iv) the booking test is the pair, so this is an ESCAPE: **folded by substance, unnamed**. Cure = one CITED token in §2·R2a.1's cell (``fr-ExportModal R2-1`` beside `K-16`). **Not this seat's write** — `waves/F-W1.md` is outside unit `f`'s writable set; returned to the spec seat, sized at one token.

**Fabrication check — 0 fabrications.** The instrument's regex catches every `| **\`fr-X ID…\`** |` and `| \`fr-X\` **\`ID\`** |` row, i.e. BOOKED *and* CITED *and* STRUCK rows alike, so its 20 "NOT-F.W1" hits were read one by one for their disposition verb on the row itself: `FR-TT-24` · `M-TL` · `D·D-M3` · `FR-COB-28` · `FR-CP-33` · `m-6` · `m-7` · `FR-NP-6` — **CITED / non-debt** at §2·R4a `:443`; `fr-SliderControl R-14` (both spellings) — **CITED**, converted from a booking at §2·R5a `:426`; `D·D-5` · `FR-USB-10` · `M-1` · `PP-NOSHADOW` · `FR-CP-21` — **CITED, held F.W3/F.W4** (`:266` · `:414` · `:341` · `:449` · `:797`); `K-20` · `K-24` — **DISPOSED, NOT BOOKED** (§2·R3a/b headings struck per E6-3); `fr-AdminFlaggedPanel K1` — **struck in place** at §6·R5 `:650` (*"the canonical now reads … TERMINAL (∅)"*); `fr-EquationView vue-tsc` — **STRUCK E5-6**, disposed as a canonical amendment at §6·R5's tail; `fr-ExportModal D-M3` — a RULED adoption (R2-3d.1) whose canonical row is `∅`, disposed at §6·R5 as *"the 24th … a canonical amendment"* — a **canonical-amendment ask on the record, not a wave fabrication**. Not one of the 20 is a BOOKING of a row the canonical homes elsewhere.

## Verdict

- **Leg (a)**: GREEN — 105/105 both directions.
- **Leg (b)**: **RED, honestly, by TWO named rows** (`fr-ExportModal R2-1` absent by bytes · `fr-ContourSettings M-4` present only as a homonym), **0 fabrications**, against the prior runs PASS-1 15 · PASS-2 11 · PASS-3 5 · PASS-5 24 escapes. The figure is DERIVED at this run from the frozen operand — no check file was consulted as an operand; the FAIL-by-construction clause did not fire; the detector was not re-cut (the tiering is a publication of the retained join, and the homonym tail was resolved by reading, re-grading no record and re-homing no id).
- **What GREEN needs**: two rows in `waves/F-W1.md` (one CITED token; one CITED-or-errata row), each a spec/census-seat act. No product byte, no gate re-definition.
- No verification verb is stamped here.

**Self-count**: no figure above counts this file or any live sibling; the counts are of the STAMPED canonical at `f44362757458`, of the frozen carry, and of the spec at its settled bytes (`:550-614` as read at this run).
