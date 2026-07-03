# pass2 · dispatch-homes — the two cross-repo disposition packets

**Lane**: Pass-2 dispatch-homes (seeds 7 + 9) · **Date**: 2026-07-02 · **Branch**: `tranche-q` @ `e80b359` (1.2.0)
**AMENDED AT PASS 3** (2026-07-02, lane L1-spec-v3, discharging M4 / CRIT-dispatch D1): the CONSTELLATION.md pointer is corrected from "value.js-side, unilateral" to a **fourier-tree write** (the file exists only at `fourier-analysis/docs/constellation/CONSTELLATION.md` — verified this pass) **booked to FN-7 alongside the relocation**; value.js's in-tree R.W6 deliverable is a **contract-of-record note** (the `diff.test.ts:5-6` docstring already binds `J-diff-shape.md` §3/§4); the R.W6 gate is **rescoped to value.js-tree state only**; the fixture form is committed to **inline rows in `diff.test.ts`**. Re-verified against the live tree.
**Charter**: PART A (q9-home) resolve §11-Q9 for BOTH artifacts (contract doc + wire-envelope fixture); PART B (cascade-relay) decide D8-1 producer-fix dispatch timing + draft the relay text.
**Binds**: PASS1-VERDICT §5 #9/#11, §6.1, §7 seeds 7/9 · SYNTHESIS §5/§7/§11-Q9 · proto-golden-vectors §6 · proto-boot-cascade §3.

---

## PART A — §11-Q9: the two homes

### A.0 The decisive fact (verified this pass)

value.js's api conformance suite has **ZERO cross-repo filesystem reads**. `grep` over `api/test/` for `fourier`, sibling-relative paths, `readFileSync`, or `.json` imports returns **only comment-level citations** — `api/test/conformance/diff.test.ts:5-6` and `api/test/envelope.test.ts:9` name `J-diff-shape.md` in **docstrings**, never in a `readFile`/`import`. The probe **binds to the contract by transcription**: it re-encodes §3/§4's rules as `expect(...)` assertions (`diff.test.ts:122-153` asserts the exact four-field envelope `{fromHash,identical,ops,toHash}`, the closed op triple, presence rules, and `identical == (ops.length==0)`), and cites the doc as the source of those rules. **The doc's physical location is technically inert to value.js's test isolation** — moving it, or not, changes nothing that value.js compiles or reads.

This is the existing, proven, isolation-preserving pattern, and it is the frame for both sub-decisions. It also confirms PASS1-VERDICT §6.1's differential: the isolation that bites is **value.js's api CI running without fourier checked out** (CI, isolated clones) — not dev-checkout fragility (already assumed by `file:` deps).

### A.1 The wire-envelope FIXTURE → **value.js-LANDS, in-tree, read locally**

**Decision**: value.js lands the fixture rows as **inline rows inside its own `api/test/conformance/diff.test.ts` probe** (M4 — the form is committed to inline rows, not a co-located JSON file: it keeps the vectors adjacent to the `expect(...)` assertions that transcribe §3/§4, and avoids a second artifact to keep current). value.js reads **only its own local copy**. This is the SYNTHESIS §5/FN-6 default ("value.js lands the fixture") made **isolation-safe**, and it honors PASS1-VERDICT §5 #9 (rescope R.W6 to "add fixture rows to the existing probe").

**Why not proto-golden-vectors §6's recommendation** (single fixture file in `fourier-analysis/docs/tranches/J/design/`, read by value.js via relative sibling path): it would introduce the **first cross-repo filesystem read** into value.js's api CI — the exact isolation breach PASS1-VERDICT §5 #9 flagged ("over-decides Q9") and §6.1 named ("the api test suite must run where fourier may not be checked out"). PASS1 already demoted that recommendation to a Q9 tradeoff; this packet resolves the tradeoff **against** the sibling-read.

**The "don't duplicate" objection is answered by the same mechanism that already governs the contract doc.** proto §6 warned against duplicating the fixture ("re-creates the two-documents-that-disagree drift"). But the source of truth is the **contract doc** (`J-diff-shape.md` §3/§4), which is *already* not shared as a file — it is transcribed into each repo's probe and guarded by an **invariant**, not by a shared file. The fixture is a projection of that contract, so it follows the same discipline: each repo owns its rows in-tree; currency is held by the **paired contract-currency invariants** (value.js R.W6 inv — any change to `atomdiff.ts`/`hash.ts`/`PaletteVersion`/URN catalog re-verifies the twin + updates CONFORMANCE-MATRIX; fourier FN-5, its mirror). Duplication-with-invariant-guard is **not drift** — it is the constellation's existing, working pattern for the contract itself. A shared fixture *file* would buy a single canonical vector set at the cost of one suite's CI isolation; transcription buys the same coverage with zero isolation cost. The isolation mandate is the binding constraint (PASS1 §6.1), so transcription wins.

**fourier's side is fourier's call.** FN-6 ("value.js lands the fixture; fourier wires the reader") is satisfied by value.js landing its rows in-tree. fourier's FN-6 reader strategy — vendor a copy (recommended: preserves fourier's own isolation, symmetric with this decision) vs sibling-read value.js's copy — is fourier-owned and guarded by FN-5. **value.js neither dictates it nor reads from fourier's tree.**

**The fixture rows** (the 5 envelope vectors, from proto §6, transcribed against §3/§4):
`changed-scalar` · `added-before-absent` (added has only `after`) · `removed-after-absent` (removed has only `before`) · `identical-empty-ops` (`ops:[]` never null; `identical:true`) · `reorder-degrades-to-changed` (no `moved` op — the closed triple). Each carries a repo-tagged `atomValues` payload asserted per-repo against its own schema only (§6), never cross-asserted.

### A.2 The contract DOC → **in-tree contract-of-record note (value.js); the CONSTELLATION.md pointer + relocation both BOOKED to FN-7** *(corrected at pass 3, M4)*

**Decision**: leave `J-diff-shape.md` physically where it is (`fourier-analysis/docs/tranches/J/design/J-diff-shape.md`). value.js's **own** R.W6 contract-of-record deliverable is **in its own tree**: a one-line note (in the R docs) naming `J-diff-shape.md` §3/§4 as the bilateral contract, backed by the existing in-tree binding at `api/test/conformance/diff.test.ts:5-6` (the probe's docstring already cites the doc §3/§4 as its source of rules). The **CONSTELLATION.md pointer** that elevates the doc as bilateral-at-the-index is a **fourier-tree write** and **books to FN-7 alongside the relocation**. Do **not** physically relocate the doc, and do **not** treat the pointer as an R.W6 value.js deliverable.

**Why the pointer is a fourier-tree write, not a value.js-unilateral edit** *(the pass-2 error, CRIT-dispatch D1)*:
- **`CONSTELLATION.md` exists at exactly one location — `fourier-analysis/docs/constellation/CONSTELLATION.md`** (re-verified this pass: `find` over value.js returns no such file). value.js cannot edit it without writing into a sibling main tree — the exact **read-only-main-trees** breach the R precepts forbid. The pass-2 "a value.js-side edit … in-scope, unilateral, cheap" framing was wrong: there is no value.js-side `CONSTELLATION.md` to edit.
- The doc's own **asymmetry logic** — a *bilateral* artifact's neutral-home move requires fourier's concurrence — applies with **identical force** to a bilateral index entry naming it. Authoring the pointer is as much a co-decision as the relocation, and it lands **where the doc lands**. That is exactly **FN-7** ("co-decide the contract-doc neutral home"); the pointer rides it.
- value.js binds to the doc by **transcription** (A.0) — its location is technically inert to value.js, and the in-tree contract-of-record note carries the "reads as fourier-local" answer **within value.js's own tree** at zero cross-repo cost, holding the binding until FN-7 lands the pointer.

**Net**: R.W6's value.js work is **the in-tree contract-of-record note + the inline fixture rows + the recorded invariant** — all value.js-tree-local. The CONSTELLATION.md pointer and the physical relocation are **paired fourier-tree writes booked to FN-7**; neither gates R.W6, and the in-tree note makes both non-urgent.

### A.3 R.W6 rescope (wording)

- **DROP** "golden-vector fixture (shape + byte-parity)" and any shared-hash framing (byte-parity refuted by proto §2–3: float-repr `1.0`↔`1` + negative-zero are irreducible; the set-hash constructions differ structurally — 64-hex pipe-join vs 16-hex JSON-array).
- **REPLACE** with *(M4 wording)*: *"Add the 5 wire-envelope shape-fixture rows as **inline rows in the existing `api/test/conformance/diff.test.ts` probe** (in-tree, read locally), transcribed against `J-diff-shape.md` §3/§4; record the contract-currency invariant; author value.js's **in-tree contract-of-record note** naming `J-diff-shape.md` §3/§4 as binding (the `diff.test.ts:5-6` docstring already carries it); paired-author the fourier-N charter (FN-1..7), FN-6 wiring fourier's own reader, FN-7 booking **both** the doc-relocation co-decision **and the CONSTELLATION.md pointer** (both fourier-tree writes)."*
- **Gate (value.js-tree state only, M4)**: value.js's `diff.test.ts` probe asserts the 5 **inline** rows against §3/§4 green (no sibling checkout required); the in-tree contract-of-record note present; invariant recorded. The CONSTELLATION.md pointer and the fourier-N charter are fourier-tree paired-authoring work, **not** value.js-local gate conditions. **Gates on nothing outside this repo.**

---

## PART B — cascade-relay: dispatch the D8-1 producer fix

### B.0 Producer site + zero-collateral, verified this pass

The proto cited `glass-ui/src/styles/index.css:258 → @import "./components.css" layer(components);`. **That line is not in the source** — `src/styles/index.css` (161–226) imports the cascade partials and ends with `@source "../*.js"`; it never imports `components.css`. The `@import "./components.css";` is **build-emitted** into `dist/styles/index.css` by `vite.style-assets.ts`. Precise producer sites:

1. **`vite.style-assets.ts:307`** — `const compImport = '@import "./components.css";';` (the `emitComponentUtilities` fold into `dist/styles/index.css`; lands at dist line 258, the monolith `/styles` path the demo consumes via `style.css:52`).
2. **`vite.style-assets.ts:366`** — `buildSubset`'s generic fold emitter `folds.map((f) => \`@import "${f}";\`)`, where `./components.css ∈ DEFERRED_FOLDS`, writes the **same unlayered import into `dist/styles/deferred.css:33`** (the critical/deferred split path). Confirmed live: `dist/styles/deferred.css:33` = `@import "./components.css";`.

So the fix is conceptually one line (the `layer(components)` wrapper on the components.css import) but must apply at **both** emission sites — else split-consumers stay broken. The SFC-fold `../glass-ui.css` (`:441`, `DEFERRED_FOLDS` member) **must NOT** be layered — it carries scoped component CSS across many layers.

**Zero-collateral, verified against the actual layered artifact** (`dist/styles/components.css`, 53 KB): `@utility` count **0**; the single `@theme` hit is the **header comment** (line 2, "glass-ui's native @theme so a bare consumer"), **not** a `@theme {}` block; `@layer` count **0**; the one `@property` token sits inside the minified bare-utility dump and `@property` registers **globally regardless of `@layer`** (layer-agnostic per spec). The proto's faithful simulation already applied exactly `layer(components)` to this file → clean compile, dual-pane `visibleCount 2` at 1440, glass surfaces intact, Fraunces `document.fonts.check` true, zero errors (`scratchpad/CURED-1440.png`). Collateral is empirically discharged.

### B.1 Timing decision → **DISPATCH NOW to the executing BG agent**

**A live agent is on glass-ui today**: `glass-ui` is on branch `tranche/BG` with active WS5 commits (`cc80418a`/`42fc375d`/…, all `[paint-pending]`). BG owns `src/` (the producer surface) per SYNTHESIS §7's routing.

**Fold-into-R.W7 inverts the dependency order.** R.W2's dual-pane gate ("renders at 1440 **without** the w6a shim", SYNTHESIS §3.1) depends on this producer fix (proto §3.3: "R.W2 cannot honestly retire the w6a shim" until glass-ui ships `layer(components)`). R.W7 is the **close** wave. Folding a gate-bearing dependency into the close-wave letter means the **entire R design body (W3 instrument, W4 suffusion) runs on the load-bearing w6a shim** — design waves built atop a cascade the shim is faking correct. That is backwards: the cascade must be honest **under** the design, not patched at close.

**The `file:` pin policy makes early dispatch free to consume.** value.js floats on `file:../glass-ui` (SYNTHESIS §3.4, ratified-stance pin policy). The moment BG rebuilds `dist/` with the fix, value.js picks it up on its next dev/build — **no version ceremony, no 5.0.0 wait, no registry pin to discharge**. Early dispatch costs BG one small mechanical edit and unblocks R.W2's honesty immediately.

**Verdict**: dispatch the D8-1 ask to BG **now**, as a standalone relay item (B.3). The R.W7 close letter still **records** it (verify-at-consume line, B.4), but the ask does not wait for R.W7.

### B.2 R.W2 gate re-scope (the no-shim gate goes external)

Split R.W2's dual-pane gate into two, per proto §3.3:

- **INTERNAL (hard gate, value.js-only, blocks R.W2):** the boot fix (the `vite.config.ts` array-form regex alias, proto §1.3) green across all four vite modes (per seed-2 boot-blast-radius); the 1440 dual-pane defect **and** its D8-1 cascade root **confirmed** by an in-tree CSSOM probe; the `.w6a-audit*.mjs` + `mix-1440-snapshot.md` scratch swept from the tree (R.W0 hygiene). R.W2 **confirms the defect + owns the boot fix**; it does **not** own the cascade cure.
- **EXTERNAL (booked, does NOT block R.W2 completion):** the no-shim **render** gate — "dual-pane renders at 1440 without the w6a shim" — retires the w6a shim **when glass-ui's `layer(components)` dist lands**, verified by re-running the 1440 dual-pane probe against the rebuilt `file:../glass-ui` dist. Until then the shim stays load-bearing **behind this book**, not behind value.js work. Given BG is live and the fix is mechanical, the window is short.

### B.3 Relay item — DISPATCH NOW (direct to BG; route: BG owns `src/`)

> **D8-1 · glass-ui ships component utilities UNLAYERED — cures the consumer 1440 dual-pane blank. Priority HIGH; one mechanical edit; zero collateral.**
>
> **Defect (consumer-side, proven live under 4.2.0):** `dist/styles/components.css` (53 KB of bare Tailwind utilities — `.hidden{display:none}`, `.flex{display:flex}`, …) is `@import`-ed **unlayered** into both `dist/styles/index.css` (line ~258) and `dist/styles/deferred.css:33`. Unlayered rules beat **all** `@layer`'d rules, so glass-ui's `.hidden` annihilates a Tailwind-v4 consumer's own *layered* responsive `lg:flex`/`lg:block`. In value.js's demo both `.pane-wrapper`s resolve `display:none` at 1440 → blank dual-pane; only a `!important` shim (`.w6a-audit.mjs`) makes them render.
>
> **Fix (producer, in `vite.style-assets.ts`):** wrap **only** the `components.css` import in Tailwind's built-in `components` layer (already ordered before `utilities`, so no standalone `@layer` order statement is needed — which avoids the Tailwind-v4 `@utility text-mono-small` registration break that every demo-side and order-statement cure trips). Apply at **both** emission sites:
> - `:307` — `const compImport = '@import "./components.css" layer(components);';`
> - the `buildSubset` deferred fold (`:366`, `DEFERRED_FOLDS`) — emit `./components.css` as `@import "./components.css" layer(components);`. **Do NOT** layer the SFC-fold `../glass-ui.css` (it carries scoped CSS across many layers).
> The idempotency guard at `:308` (`indexSrc.includes(compImport)`) continues to hold against the new string.
>
> **Zero collateral (verified):** `dist/styles/components.css` has **0** `@utility` and **0** real `@theme` (the one `@theme` token is a header-comment word); `@property` registers globally regardless of layer. Proven end-to-end by a faithful vendored simulation of the whole `dist/styles` tree with exactly this change: clean compile, dual-pane `visibleCount 2` at 1440, glass surfaces + Fraunces intact, zero page errors.
>
> **Why now, not the 5.0.0 cut:** value.js consumes glass-ui via `file:../glass-ui`; the fix lands the moment you rebuild `dist/`, with no version event. It unblocks value.js R.W2's honest retirement of the `.w6a` shim, which otherwise blocks the entire R design body. Ride it in the current BG cut.

### B.4 Relay item — RECORD in the R.W7 close letter (SYNTHESIS §7)

Add to the §7 relay letter as a **verify-at-consume** entry (not a fresh ask if B.3 already landed):

> **§7.7 · D8-1 `layer(components)` — VERIFY landed.** Dispatched early to BG (pass-2 cascade-relay). On the next `file:../glass-ui` dist rebuild carrying it, re-run the 1440 dual-pane probe, **delete the `.w6a-audit` shim**, and confirm `visibleCount 2` with no `!important`. If not yet landed at R.W7, carry the B.3 ask forward here.

---

## Summary of dispositions

| Item | Decision | Home / Channel |
|---|---|---|
| Wire-envelope fixture | value.js LANDS, in-tree, read locally; transcribed vs §3/§4; fourier owns its own reader (FN-6) | **inline rows in `api/test/conformance/diff.test.ts`** (M4) |
| Contract doc | value.js authors an **in-tree contract-of-record note**; the CONSTELLATION.md pointer + relocation are fourier-tree writes **BOOKED to FN-7** (M4) | doc stays at `fourier .../J/design/J-diff-shape.md`; pointer authored at FN-7 |
| Fixture currency | paired contract-currency invariants (value.js R.W6 inv + fourier FN-5) — NOT a shared file | both repos |
| D8-1 producer fix | DISPATCH NOW to live BG agent (two emission sites in `vite.style-assets.ts`); record verify-at-consume in R.W7 | glass-ui `tranche/BG` |
| R.W2 dual-pane gate | split INTERNAL (hard, value.js-only: boot fix + defect/root confirm) / EXTERNAL (booked: no-shim render gate) | R.W2 spec |
