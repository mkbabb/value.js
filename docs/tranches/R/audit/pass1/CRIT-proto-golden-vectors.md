# CRIT — proto-golden-vectors

**Critic verdict**: The central thesis is **CORRECT, well-grounded, and important** — a shared-*hash* golden file is impossible (float-repr + set-hash construction) and contract-forbidden (J-diff-shape §6); the right R.W6 deliverable is a wire-*shape* conformance fixture. Every load-bearing citation checks out and the prototype reproduces byte-for-byte. Three refinements keep it from 100: a fixture-location recommendation that pre-decides an OPEN ratification question (§11-Q9) and contradicts SYNTHESIS §5, one overstated "self-bug" claim, and an under-cite of the existing probe that already proves the thesis.

**Convergence: 89%.**

---

## What I verified (all CONFIRMED)

**Factual grounding — every citation live-checked:**
- `hash.ts:8/26/45` — `computeContentHash` / `computeAtomHash` / `computeAtomSetHash`; the set-hash uses `.map("<pos>:<64hex>").sort().join("|")` — bespoke pipe-join, full 64-hex per-atom. ✓ (`api/src/hash.ts:45-49`)
- fourier `atomdiff.py:109` `[:16]`, `:112` `set_hash = canonical_digest(sorted(...))`, `canonical_digest.py:40-47` (`sort_keys=True`, `separators=(",",":")`, no `ensure_ascii=False`). ✓
- Contract §1 (two layers), §2.4 (`fromHash`/`toHash` ARE the set-hashes), **§6 BINDING** ("NOT by asserting one repo's output against the other repo's output"). ✓ (`fourier-analysis/docs/tranches/J/design/J-diff-shape.md:256`)
- Wire envelope `{fromHash,toHash,ops,identical}` + `AtomDiffOpKind = "added"|"removed"|"changed"` + presence rules + `atomKey:number`. ✓ (`api/src/lib/crud/atomdiff.ts:25,37-40`; `diff.ts:5`)

**Prototype reproduces exactly** (`scratchpad/pass1/proto/`, files present, re-ran under Node): `compare.mjs` → `{actual:8, sorted-vs-ascii:10, sorted-vs-utf8:13}` / 15, matching the doc's table to the integer; `sethash_demo.mjs` → 64hex vs 16hex, pipe-join `0b889a29…` vs JSON-array `955a02e0…` DIFFER; v06 float + v15 neg-zero survive every alignment combo. Findings A/B/C are sound.

**R4 §4 refutation is well-targeted, not a strawman.** R4 §4 literally says "verify the canonical-JSON serializers are byte-identical first (**they must be, for the wire twins to match**)" (`R4-FOURIER.md:288-290`). That parenthetical is factually WRONG and the proto correctly kills it: the wire twins match on SHAPE (§6), hashes are repo-local by construction, so serializer byte-identity is NOT a precondition for the twins to match. The SYNTHESIS §10 work-order row (line 220) carries the same false premise; the proto refutes both. Good catch — this is the proto's real value-add over the corpus.

**Strong corroboration the proto under-uses:** `api/test/conformance/diff.test.ts` ALREADY exists and its docstring already binds "against …J-diff-shape.md §3/§4 — NOT against fourier's output (§6)." The §6 discipline the proto recommends is *already implemented in-tree today*. This makes the thesis even stronger than the doc claims (R.W6 = add fixture rows to an existing, already-correct probe) — see mustFix #3.

**Staleness: immune.** The item lives entirely in `api/` CRUD (hash.ts / atomdiff.ts / the J-diff contract). glass-ui 4.2.0/BG-executing and kf 5.1.0 touch none of it. No stale pins, no moved anchors. Good.

---

## mustFix

### 1 (MODERATE) — the fixture-location recommendation pre-decides OPEN §11-Q9 and contradicts SYNTHESIS §5/FN-6
§6 of the proto hard-recommends the fixture live in **fourier's tree** (`fourier-analysis/docs/tranches/J/design/diff-envelope.fixtures.json`) with value.js's test reading it "by relative sibling path." Two problems:
- **It contradicts the synthesis.** SYNTHESIS §5 (line 95) says the fixture is "**landed in value.js tests** + paired-authored into fourier's"; FN-6 (line 157) says "**value.js lands the fixture**; fourier wires the reader." The proto silently relocates the home to fourier's tree — the opposite ownership.
- **It pre-empts a ratification question.** §11-**Q9** is explicitly OPEN ("R.W6 relocates … vs CONSTELLATION.md pointer vs leave to fourier-N"). Q9 is about the contract *doc*; the proto extends it to the *fixture* and decides it. A cross-repo relative-path *runtime file read* (`../../fourier-analysis/…` from a vitest file) is materially more fragile than the doc citation it analogizes to — it breaks the moment repos aren't checked out as siblings, and there is no such runtime read today (diff.test.ts hardcodes §3/§4 assertions; it does not parse the doc).
- **Fix**: demote §6's location to a *tradeoff presented for Q9*, not a recommendation; note that the existing diff.test.ts already owns §3/§4 assertions in value.js's tree, so "fixture lands in value.js, fourier reads a copy/pointer" is the KISS default the synthesis already chose. Don't have value.js's test suite acquire a cross-repo runtime path dependency.

### 2 (MINOR) — Finding A#1 "latent value.js self-bug" is overstated
The insertion-order reliance is NOT runtime-reachable: `computeContentHash`/`computeAtomHash` build their projection objects with **hardcoded inline key order** from typed args (`hash.ts:9-15,27-30`); no caller supplies the object. It is a *refactor-time fragility* (a future edit that reorders keys would silently change the hash), not a live bug, and not something a `canonicalDigest` refactor "kills" so much as "immunizes." Reword "latent self-bug" → "a key-order fragility a future edit could trip." The recommendation (optional 3→1 refactor) stands on code-reduction/KISS merit alone; it doesn't need an inflated bug to justify it.

### 3 (MINOR) — under-cites the existing conformance probe (completeness)
The proto's §7.2 says "wire both probes' readers (value.js `diff.test.ts`; fourier `test_crud_lib_atomdiff.py`)" as if greenfield. `api/test/conformance/diff.test.ts` already IS the §3/§4-not-sibling probe (its docstring states exactly the §6 discipline). Citing it would (a) corroborate the thesis with in-tree evidence and (b) correctly scope R.W6 as "add fixture vectors to the existing probe," shrinking the deliverable and removing the "wire the reader" framing that reads as new infrastructure.

---

## Not-fixes (challenged, held)
- **Findings A#3/#4 (float/neg-zero irreducibility)** are technically correct but *academic* for real data — value.js atoms never flow through Python, so the material never actually collides. Finding **B alone** (set-hash construction) already kills the shared-hash file structurally. The proto acknowledges B is the structural kill, so this is fine as belt-and-suspenders; no change required.
- **The 8/10/13-of-15 metric** is a function of an adversarial fixture, not a real-world divergence rate. The proto uses it as illustration, not as a claim about production data — acceptable.
- **Precept fidelity**: no legacy/workaround/god-module/design-system-bypass. The optional hash.ts 3→1 refactor is KISS-aligned (mirrors fourier's already-shipped cleanup), correctly flagged OPTIONAL + value.js-internal + non-gating. Clean.
- **Over-scoping**: the item stays in value.js's `api/`; the one cross-repo reach (fixture into fourier's tree) is the mustFix #1 concern, not a separate finding.

---

## Verdict
Ratifiable thesis, reproducible evidence, staleness-immune. Fix the fixture-location over-decision (defer to Q9, honor SYNTHESIS §5's "lands in value.js"), soften the "self-bug," and cite the existing probe. Then it's 100.
