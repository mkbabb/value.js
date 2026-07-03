# CRIT · pass2 dispatch-homes

**Critic**: Pass-2 · **Date**: 2026-07-02 · **Target**: `docs/tranches/R/audit/pass2/dispatch-homes.md`
**Verdict**: AMEND — 1 load-bearing defect (contract-doc pointer ownership); PART B + the fixture-half of PART A are airtight.
**Convergence**: 88%

---

## What I verified live (all citations hold)

### PART A — A.0 isolation fact — CONFIRMED
- `grep -rn "readFileSync|fourier|J-diff-shape|../.." api/test/` returns **only** the two docstring citations the doc names (`api/test/envelope.test.ts:9`, `api/test/conformance/diff.test.ts:5-6`). No `readFile`/JSON import of any fourier artifact. The suite binds by transcription. ✓
- `diff.test.ts` asserts the exact four-field envelope: `expect(Object.keys(body).sort()).toEqual(["fromHash","identical","ops","toHash"])` (~line 145), `identical === false`, hashes `=== computeAtomSetHash(...)`, op set `["added","changed"]`. Matches the doc's §2.4 claim. ✓
- **A.0's central claim — value.js's api CI has ZERO cross-repo filesystem reads — is TRUE**, and the "moving the doc is inert to value.js" reasoning is sound.

### PART A — path grounding — MORE ACCURATE THAN SYNTHESIS
- `J-diff-shape.md` physically lives at `fourier-analysis/docs/tranches/J/design/J-diff-shape.md` — exactly the dispatch-homes citation. SYNTHESIS §5:140 miscites it as `.../B/coordination/`; the dispatch-homes doc silently corrects this. Good.

### PART B — producer sites — ALL CONFIRMED
- `vite.style-assets.ts:307` = `const compImport = '@import "./components.css";';` ✓
- `:308` idempotency guard `if (indexSrc.includes(compImport)) return;` ✓
- `:366` generic fold emitter `folds.map((f) => \`@import "${f}";\`)` ✓
- `DEFERRED_FOLDS` (in `src/styles/critical-partition.mjs:102`) = `["../glass-ui.css", "./components.css"]` — so the doc's crucial correctness catch (layer `./components.css` ONLY; **do NOT** layer the SFC-fold `../glass-ui.css`) is real and load-bearing. ✓
- `src/styles/index.css` does NOT import components.css (only tailwindcss/tw-animate + `@source`); the import is build-emitted. Doc's "not in source, build-emitted" correction of the proto is CORRECT. ✓
- `dist/styles/index.css:258` = `@import "./components.css";`; `dist/styles/deferred.css:33` = same. Both emission paths confirmed unlayered. ✓
- Zero-collateral on `dist/styles/components.css` (53056 B ≈ 53 KB): `@utility` **0**, `@layer` **0**, `@theme` **1** (line 2 = the header comment "...independently from glass-ui's native @theme so a bare consumer..." — a comment word, not a block, as claimed), `@property` **1** (registers globally regardless of layer). ✓
- glass-ui `4.2.0`, branch `tranche/BG` live — the "dispatch NOW to the executing BG agent" premise is current. ✓ kf 5.1.0 not load-bearing here.

### mustFix discharge
- **§5 #9** (demote fixture location to Q9 tradeoff; value.js lands; rescope R.W6 to "add fixture rows to the existing probe") — **DISCHARGED** by A.1 + A.3. Not paraphrased away: the doc lands rows in-tree, reads locally, and gives explicit rescope wording.
- **§5 #11** (R.W2 gate: cascade cure is external glass-ui relay; R.W2 lands boot fix + confirms defect; add D8-1 to §7 relay letter; decide timing) — **DISCHARGED** by B.1/B.2/B.3/B.4.
- **§6.1 dissent** (weigh test-isolation, not dev-checkout) — honored explicitly in A.0/A.1.

---

## DEFECT (must fix before ratification)

### D1 — the CONSTELLATION.md pointer is NOT a "value.js-side, unilateral, in-scope" edit; CONSTELLATION.md lives in fourier's tree

`CONSTELLATION.md` exists at exactly one location: **`/Users/mkbabb/Programming/fourier-analysis/docs/constellation/CONSTELLATION.md`** — inside the **fourier-analysis** tree. There is no CONSTELLATION.md in value.js.

The doc repeatedly mischaracterizes editing it:
- A.3 net: *"R.W6 executes the pointer (**a value.js-side edit to CONSTELLATION.md — in-scope, unilateral, cheap**)"* — false on all three: it is a **fourier-tree** edit, not value.js-side; not unilateral by the doc's own logic (below).
- A.3 Gate: *"CONSTELLATION.md pointer present"* — gates a value.js wave (R.W6) on a **fourier-tree write**, reintroducing the exact cross-repo coupling the fixture half (A.1) works to avoid.
- Summary table: "pointer added" with no acknowledgment of whose tree receives it.

The decision's whole spine is the asymmetry *"pointer = cheap unilateral value.js edit; relocation = bilateral, needs fourier's concurrence → BOOK to FN-7."* But the pointer target sits in **the same tree as** the doc being relocated. By the doc's own reasoning (A.3: relocation "requires fourier's concurrence … a bilateral artifact"), a write into `fourier-analysis/docs/constellation/CONSTELLATION.md` is **equally** a fourier-tree / co-decision action — not something R.W6 can claim as a unilateral, in-value.js-scope deliverable. Under the binding precept the main trees (incl. fourier-analysis) are read-only to R lanes; the pointer, as specced, is a cross-repo write mislabeled as in-scope.

**Fix (either):**
1. Reclassify the CONSTELLATION.md pointer as a **constellation-governance / fourier-tree action** — book it alongside the relocation to fourier-N/FN-7 (it lands where the doc lands), and let R.W6's actual **value.js-side** deliverable be an artifact in value.js's OWN tree (e.g., a one-line "bilateral contract-of-record" note in value.js's R docs, or lean on the existing `diff.test.ts` docstring that already names J-diff-shape §3/§4 as the binding source). Then the R.W6 gate depends only on value.js-tree state; OR
2. If constellation convention treats CONSTELLATION.md as a shared index any repo may append to, **say so explicitly and drop the "value.js-side" framing** — call it a constellation-index edit, note it touches fourier's tree, and reconcile it with the read-only-main-trees precept (why this write is permitted where relocation is booked). As written the doc asserts unilateral value.js ownership of a file it does not own.

This does not touch PART B or the fixture half — the fixture disposition (value.js lands in-tree, read locally; fourier owns its reader via FN-6; currency by paired invariants) is fully sound and verified. Only the contract-DOC sub-decision's mechanics are wrong.

---

## Minor (not blocking)
- A.1 leaves "co-located `diff-envelope.fixtures.json` **or** inline rows" open. Acceptable — both are in-tree local reads and honor the rescope — but the R.W6 wording (A.3) should pick one so the gate is unambiguous.
- B.3 idempotency: the `:308` guard uses the NEW `compImport` string, so idempotency holds on clean rebuilds (dist regenerated). Fine as stated; no action.

---

## Bottom line
Two of the three dispositions (wire-envelope fixture; D8-1 cascade relay) are verified to the digit and ratifiable. The contract-doc pointer rests on a false premise about CONSTELLATION.md's location and ownership — a genuine precept/scope error that must be corrected. Convergence 88%; mustFix non-empty, so <95 by rule.
