# J — palette REMIX + atom-diff layer; chronic-deferred VAL-9/VAL-1 re-gate; the I-tail conformance close

**Tranche letter**: J — value.js's eighth tranche; the WAVE-D (palette-side) author of the constellation REMIX pattern.
**Predecessor close**: I — CRUD-CONTRACT v2.0.0 conformance (`docs/tranches/I/FINAL.md`; CLOSED 2026-05-28; Scenario A paired close with fourier-E).
**Cohort**: **cross-repo, cohort-anchored.** value.js-J authors the canonical `lib/crud/remix` REMIX pattern (palette side); fourier-J adopts the same pattern (viz side, where it lifts the whole fork+version+provenance substrate value.js already ships). Close together OR named-successor. Cross-repo source boundary preserved (inv-I-1 carries: value.js-J commits never touch fourier source).
**Opened**: 2026-06-02 (per the constellation WAVE-D mandate at `docs/constellation/next/audit/A3-fourier-valuejs.md §4`).
**Authored seed**: `docs/constellation/next/audit/A3-fourier-valuejs.md §5.2` (the value.js-J sketch) + §4 (the CRUD/REMIX gap as the WAVE-D NEED).
**Mode**: planning-only at open. W0 audit + W1 design are DEV; W2+ are IMPL and dispatch only after the W0 ≥2-consumer re-gate verdict + user ratification.

## §0 — Goal criterion and completion criterion (paired)

**Goal criterion (the aim).** value.js-I closed CRUD-CONTRACT v2 conformance: the palette-server ships fork + version-DAG + provenance + revert. It does NOT ship an **atom-diff** layer — `/provenance` answers "who did this descend from", not "*what changed* between this and its parent". J adds the REMIX + atom-diff layer (the WAVE-D headline) and re-gates the two chronically-deferred foundational edges (VAL-9, VAL-1) that have survived G→H→I unexecuted, then closes the I-tail conformance deferrals.

The atom-diff layer is the canonical pattern fourier's viz-server mirrors. Its CORE shape:
- **palette atoms** = `PaletteColor[]` (each `{ css, name?, position }` a content-addressable atom);
- **per-atom set-hash** — an order-independent set-hash over per-atom content hashes, so two palettes with the same colors (any array order) dedup;
- **remix** = fork + a RECORDED atom-diff (`{ op: added|removed|changed, atomKey, before?, after? }[]`);
- **diff-bearing provenance edge** — the one genuinely new persisted shape: `{ fromHash, toHash, atomDiff }`;
- a read-only **`GET /:slug/diff?from={hash}`** endpoint (idempotent, ETag-able, cacheable);
- the git-like diff render in the demo via the **CSS Custom Highlight API**.

KISS: single-parent linear provenance, no CRDT, no three-way merge, no DAG. A remix descends from exactly one source-version.

**Completion criterion (the evidence).** The close holds when:

- **J.W2 (REMIX core)**: `POST /palettes/:slug/remix` (the body is a full new color-bag OR a recorded change-set) creates the child via the existing fork machinery AND persists the atom-diff on the version/fork edge; `GET /palettes/:slug/diff?from={hash}` returns `{ fromHash, toHash, atomDiff }` for any two versions on the single-parent chain; the diff is computed by per-atom content-hashing + set-differencing the two color-bags; `forkPalette` is re-expressed as the diff-recording `remixPalette` (the `forkOf` slug edge gains a `forkAtomDiff` payload); the response formatter exposes the atom-set-hash; the diff endpoint carries an ETag + `application/json`; problem+json on 404/422; the conformance probe asserts diff symmetry (`diff(A→B)` is the inverse of `diff(B→A)`).
- **J.W3 (diff render)**: the demo BrowsePane palette-detail renders the atom-diff via CSS Custom Highlight ranges (changed/added/removed swatches highlighted), feature-detected behind `CSS.highlights` with a wrapper-span fallback ≤20 LOC.
- **J.W1 (VAL-9 re-gate)**: the `spring()→LinearStop[]` emitter ships ONLY if the W0 re-check confirms ≥2 live consumers at HEAD; otherwise it stays booked (the verdict is recorded, not the artifact). The W0 finding (glass-ui's `scripts/regen-spring-tokens.mjs` already imports `springLinearStops` from `@mkbabb/keyframes.js`) is the gate evidence.
- **J.W4 (VAL-1 re-gate + I-tail)**: VAL-1 (OKLab aurora-LUT) ships ONLY if glass-ui's `deriveAurora()` adoption + a 2nd consumer are live at the W0 re-check; otherwise booked. The Idempotency-Key API-side replay store + the per-repo conformance suite at `api/test/conformance/` land green.
- **J.W2-perf**: the demo BrowsePane adopts `scheduler.yield()` (feature-detected) on the palette-extraction hot path + `content-visibility` on the palette grid (the chronic content-visibility application gap, G3 in the audit).
- **Cohort**: fourier-J adopts the `lib/crud/remix` pattern (viz atoms) OR a named successor is recorded; the cross-repo `/diff` shape parity is verified (same envelope, atom-enumeration parameterized).

The §6 hard-gate list is the binding ledger.

## §1 — Thesis

The constellation's WAVE-D observation (`A3 §4`): both repos already carry CRUD-CONTRACT v2, but the **remix substrate is asymmetric**. value.js ships content-hash dedup (`Palette.currentHash`, `PaletteVersion._id = hash`), a version DAG (`palette_versions` with `parentHash`/`forkedFromHash`/`rootHash`/`depth`), a fork endpoint (`POST /:slug/fork`), provenance (`GET /:slug/provenance`), and revert (`POST /:slug/revert`). **Neither repo ships an atom-level diff** over the atomic items of the artifact.

The KISS observation that makes a git-like model tractable: a palette is a **small, flat, content-addressable bag of named items** (`PaletteColor[]`). A "diff" is a set of per-atom ops computed by content-hashing each atom and set-differencing the two bags — no Merkle tree, no three-way merge, no rebase. Remix is always parent→child, single-parent, linear. That is the KISS line.

J is the value.js side of WAVE-D: it EXTENDS the existing fork machinery with the atom-diff layer (fourier INHERITS the whole substrate it lacks, separately, in fourier-J). The pattern is authored once and adopted twice (color atoms here, config atoms there) — exactly how CRUD-CONTRACT v2 already lives in both repos as parallel `lib/crud` modules. **No shared package, no codegen** (inv-I-1 / no-shared-codegen). The atom-set differs; the diff is parameterized over "how to enumerate + key the atoms"; everything else (the remix edge, diff persistence, the two endpoints) is identical.

Around the headline, J re-gates the two chronic foundational edges with binary discipline (substrate-without-consumer is binary) and discharges the I-tail conformance deferrals the I-close named-forwarded.

## §2 — Invariants (new in J)

J inherits all prior value.js invariants (A through I), including **inv-I-1 cross-repo source boundary** and **inv-I-2 visibility transition guard discipline**. J adds **two new invariants by name**:

- **inv-J-1 — Single-parent linear remix provenance.** A remix descends from exactly one source-version. No DAG merges, no three-way merge, no rebase, no CRDT. Testable gate: every `palette_versions` row has at most one diff-bearing inbound edge; the `getProvenance` walk stays a chain (the existing ≤50 cycle-guard carries). This is the KISS guardrail the constellation names (`A3 §4.4`).
- **inv-J-2 — Atom-diff is a derived projection, not a new store.** The atom-diff is a JSON payload on the existing fork/version edge — MongoDB documents, the existing repositories, the existing `withTransaction` cross-collection discipline. No new storage engine, no new collection beyond the diff payload field on `palette_versions`. The `GET /:slug/diff` endpoint recomputes-or-reads the diff; it never owns a separate persisted graph. Testable gate: `git grep "createCollection\|new collection"` on J commits returns zero new collection names.

## §3 — Wave schedule

| Wave | Disposition | Contents |
|---|---|---|
| **J.W0** | **DEV** (audit) | Open + 6-agent audit + chronic-deferred ledger intake. Re-confirm A–I green at HEAD. **Re-check the VAL-9 / VAL-1 ≥2-consumer triggers** against glass-ui's AQ aurora/spring state (the binary gate). Capture the baseline: the existing fork/version/provenance/hash machinery (`services/palette/{forks,versions}.ts`, `hash.ts`, `models.ts`), the I-tail deferral ledger (Idempotency-Key store, conformance suite), and the WebMCP/G5 adjacency (booked, not a wave). |
| **J.W1** | **DEV** (design) | **The CORE spec** — `design/J.W1-palette-remix.md`. The atom-set-hash, the `remixPalette` operation, the diff-bearing provenance edge shape, the `/diff?from=` endpoint contract, the CSS Custom Highlight render, the parameterization seam fourier-J adopts. Also re-gate-verdict for VAL-9 + VAL-1 (ship-or-book, recorded with evidence). **This is the DEV/IMPL boundary** — nothing below dispatches until W0+W1 land + the re-gate verdicts + user ratification. |
| **J.W2** | **IMPL** | **WAVE-D core (palette atom-diff)** + the BrowsePane perf leaf. `forkPalette → remixPalette` records the `PaletteColor[]` atom-diff on the edge; `POST /:slug/remix`; `GET /:slug/diff?from={hash}`; the atom-set-hash in the formatter; the conformance probe (diff symmetry + dedup). Folded perf: `scheduler.yield()` (feature-detected) on the demo palette-extraction hot path + `content-visibility` on the BrowsePane palette grid (W1/W2 modern-web spine; the chronic content-visibility application gap). |
| **J.W3** | **IMPL** | **The diff-viewer consumer (G6).** The demo palette-detail renders the atom-diff via the **CSS Custom Highlight API** (changed/added/removed ranges), feature-detected behind `CSS.highlights` with a ≤20 LOC wrapper-span fallback. The W3 modern-web spine (forms/a11y) is REFUTED-in-record below — the diff render is read-only and carries no new form surface; a11y is the highlight render's `role`/`aria` on the swatch list only. |
| **J.W4** | **IMPL** | **VAL-9 / VAL-1 ship-or-book discharge + I-tail conformance close.** VAL-9 emitter ships IFF the W0 re-gate verdict is ≥2-consumer-met (else booked). VAL-1 OKLab aurora-LUT ships IFF glass-ui `deriveAurora()` + a 2nd consumer are live (else booked). The Idempotency-Key API-side replay store + the per-repo conformance suite at `api/test/conformance/` land green (the I-tail). |
| **J.W5** | **DEV** (close) | Close + WAVE-D cohort coordination with fourier-J. `FINAL.md`; paired-close OR named-successor; cross-repo `/diff` shape parity verified (same envelope; atom-enumeration parameterized). Overfitting audit: every J artifact carries ≥2 consumers, a demo, or is not shipped. |

The **DEV/IMPL boundary** sits between J.W1 and J.W2. W0 (audit) + W1 (design) are research-first; W2-W4 are directly-executed against the W1 CORE spec; W5 is the close ceremony.

## §4 — Modern-web spine mapping (6-wave canonical)

J maps onto the canonical modern-web spine only where a real, consumer-backed lever exists. The inapplicable spine-waves are REFUTED-in-record (no invented waves):

| Spine wave | Lever | J disposition |
|---|---|---|
| **W1 — perf / INP** | `scheduler.yield()` on the demo BrowsePane palette-extraction hot path (G1 in the audit — the highest-ROI remaining perf lever; named in fourier-I's ι tail, never touched by value.js). Baseline: `scheduler.yield` is Newly → feature-detected fallback ≤20 LOC (`scheduler.postTask` or `await new Promise(setTimeout)`). | **FOLDED into J.W2.** |
| **W2 — CWV / content-visibility** | `content-visibility` on the BrowsePane palette grid (G3 — glass-ui ships `.deferred-section`; fourier applied it to the paper window; value.js's BrowsePane/palette grid did NOT adopt it. One utility, an unapplied consumer. Widely-Baseline). | **FOLDED into J.W2.** |
| **W3 — forms / a11y** | The diff-viewer is read-only; it adds no form surface. The only a11y obligation is `role`/`aria` on the highlight swatch list (a leaf of J.W3, not a wave). | **REFUTED as a standalone wave** (no new form surface; the I-tranche already closed the CRUD form/envelope a11y). Folded as a J.W3 render leaf. |
| **W4 — CSS-platform** | The **CSS Custom Highlight API** for the diff render (G6 — the natural diff-viewer primitive; ranges over wrapper spans). | **FOLDED into J.W3** (this is the platform lever; it is the diff-render mechanism, not a separate wave). |
| **W5 — motion / VT** | No route-morph or shared-element motion is in scope for the palette-diff feature. The I-tranche's envelopes are not motion-bearing. | **REFUTED** (no consumer-backed motion lever; inventing a VT wave for a JSON diff would be overfit). |
| **W6 — security / PWA** | The I-tail Idempotency-Key replay store is the security-adjacent lever (replay protection). No new PWA/passkey surface (passkeys remain a named residual — no app owns a credential surface, per `A3 §2`). | **PARTIAL — Idempotency-Key FOLDED into J.W4** (the I-tail). PWA/passkeys REFUTED (no consumer surface). |

## §5 — Critical files and ownership

| Surface | Files | Owning wave |
|---|---|---|
| Atom-set-hash | `api/src/hash.ts` (ADD `computeAtomHash` + `computeAtomSetHash` alongside `computeContentHash`) | J.W2 |
| Atom-diff core | `api/src/services/palette/diff.ts` (NEW — `diffAtoms(before, after)` parameterized over atom-enumeration + atom-keying; the `lib/crud/remix` pattern seam) | J.W2 |
| Remix operation | `api/src/services/palette/forks.ts` (`forkPalette → remixPalette`: record the atom-diff on the edge) | J.W2 |
| Diff edge persistence | `api/src/models.ts` (`PaletteVersion.atomDiff?: AtomDiffOp[]` — the one new persisted field; the diff-bearing edge), `api/src/repositories/paletteVersion.ts` | J.W2 |
| Remix + diff routes | `api/src/routes/palettes/forks.ts` (`POST /:slug/remix`), `api/src/routes/palettes/diff.ts` (NEW — `GET /:slug/diff?from={hash}`) | J.W2 |
| Formatter | `api/src/format/palette.ts` (expose the atom-set-hash) | J.W2 |
| Diff ETag | `api/src/middleware/etag.ts` (the diff endpoint is ETag-able off `{fromHash, toHash}`) | J.W2 |
| Conformance | `api/test/conformance/diff.test.ts` (diff symmetry + dedup + single-parent) | J.W2 + J.W4 |
| BrowsePane perf | `demo/@/components/.../BrowsePane.vue` + the palette-extraction composable (`scheduler.yield()` + `content-visibility`) | J.W2 |
| Diff render | `demo/@/components/.../PaletteDiff.vue` (NEW — CSS Custom Highlight render + ≤20 LOC fallback) | J.W3 |
| VAL-9 emitter | `src/easing.ts` (ADD `spring(...)→LinearStop[]` emitter alongside `cssLinear`) — **IFF ≥2-consumer-gate met** | J.W4 (gated) |
| VAL-1 LUT | `src/units/color/conversions/oklab.ts` (thin sampling layer) — **IFF glass-ui `deriveAurora()` + 2nd consumer live** | J.W4 (gated) |
| Idempotency store | `api/src/middleware/idempotency.ts` (NEW) + `api/src/repositories/idempotency.ts` (24h replay) | J.W4 |
| Conformance suite | `api/test/conformance/*.test.ts` (the per-repo suite I-close deferred) | J.W4 |

The per-wave design doc + this table govern; `design/J.W1-palette-remix.md` is the binding CORE spec for the W2/W3 surfaces.

## §6 — Hard gates (completion criterion)

- **J.W1**: the CORE spec landed (`design/J.W1-palette-remix.md`); the VAL-9 + VAL-1 re-gate verdicts recorded with evidence; the fourier-J parameterization seam specified.
- **J.W2**: `POST /:slug/remix` creates the child + persists the atom-diff (cross-collection `withTransaction`, session-threaded); `GET /:slug/diff?from={hash}` returns `{fromHash, toHash, atomDiff}` with an ETag; the diff is computed by per-atom set-differencing; `diff(A→B)` is the inverse of `diff(B→A)` (symmetry probe green); two color-bags with identical atoms in different array order produce an empty diff (dedup probe green); BrowsePane adopts `scheduler.yield()` (feature-detected) + `content-visibility`; `pnpm test` green; `pnpm build` clean.
- **J.W3**: the demo palette-detail renders the atom-diff via CSS Custom Highlight ranges; the `CSS.highlights` feature-detect has a ≤20 LOC wrapper-span fallback; the swatch list carries the diff `role`/`aria` leaf.
- **J.W4**: VAL-9 emitter shipped XOR booked-with-recorded-verdict; VAL-1 LUT shipped XOR booked-with-recorded-verdict; Idempotency-Key API-side replay store live (24h window; replay returns the stored response); per-repo conformance suite at `api/test/conformance/` green.
- **Cohort**: fourier-J adopts the `lib/crud/remix` pattern (viz atoms) OR a named successor recorded; cross-repo `/diff` envelope parity verified.
- **Overfitting**: every J artifact carries ≥2 consumers, a demo, or is not shipped (VAL-1/VAL-9 are the binary-gated cases; WAVE-D is ≥2-consumer by construction — both repos).
- Smoke probe at startup asserts the diff-edge schema invariant.

**Invalid hard gates** (rejected): a shared cross-repo remix package or codegen (inv-I-1 / inv-16); a CRDT or three-way merge (inv-J-1); a separate diff graph store (inv-J-2); shipping VAL-1/VAL-9 without the ≥2-consumer gate met (substrate-without-consumer is binary).

## §7 — Cross-tranche debt and explicit deferrals

**Inherited from value.js-I close (the named-residuals at `I/FINAL.md §5`):**
- Idempotency-Key API-side replay store — **FOLD → J.W4** (plumbing LIVE on both consumers since I; server store lands here).
- Per-repo conformance suite at `api/test/conformance/` — **FOLD → J.W4** (T7 cross-repo probe was LIVE at fourier-E; the per-repo suite lands here).
- Per-call-site `ifMatch` / `idempotencyKey` adoption on demo callers — **FOLD → J.W4** (bounded; lands alongside the replay store).
- `id` field hard-removal from the palette response envelope — **carry; named-forward to a J.W4 sub-item OR value.js-K** (held for backward-compat through the I.W4 transition; drop scheduled after a consumer audit confirms no consumer reads `palette.id`).

**Inherited from the constellation chronic-deferred ledger (`A3 §2`):**
- **VAL-9** `spring()→LinearStop[]` emitter — **FOLD → J.W4, binary-gated.** W0 evidence: glass-ui's `scripts/regen-spring-tokens.mjs` already imports `springLinearStops` from `@mkbabb/keyframes.js`; keyframes.js owns the emitter privately; glass-ui's `--spring-*` tokens regenerate from it. The ≥2-consumer question is whether LIFTING the emitter to value.js de-dups keyframes ⇄ glass-ui at HEAD (keyframes spring-emission core + glass-ui `--spring-*`). If the re-check confirms both consume the value.js emitter, ship; else book (the half that exists — `cssLinear` consumer — is the easy half).
- **VAL-1** OKLab aurora-LUT — **FOLD → J.W4, binary-gated.** The conversion math is done (`src/units/color/conversions/oklab.ts`; `models.ts` persists `oklabColors: OklabTriple[]`). The LUT is a thin sampling layer. Gated on glass-ui actually adopting `deriveAurora()` (speedtest AS-GU-1) + a 2nd consumer. Substrate-without-consumer is binary — do NOT ship until glass-ui's aurora consumes it.

**Booked as residuals (NOT waves):**
- **G5 WebMCP agentic tools** (`create-palette`, `remix-palette`, `diff-palettes` as `navigator.modelContext.registerTool` with `readOnlyHint` on the diff/provenance reads) — Early-Preview (Chromium 146 + flag). **Booked as a J-residual / WAVE-D adjacency.** It is the design CONSTRAINT, not a wave: the REMIX API is designed agent-legibly (atomic, composable, distinct tools; descriptive validation errors for retries; secure backend through the API layer). The W1 CORE spec records this constraint; no tool ships in J.
- **G2 `fetchLater()` analytics** — Limited support; progressive-only behind detection, current `navigator.sendBeacon` default. **Booked — no value.js consumer surface earns it in J** (low-effort leaf; named-forward).
- **G4 Summarizer / Writer** (a palette blurb for `proposed_names` / `slugWords`) — Limited → progressive-only behind `Summarizer.availability()`. **Demo-or-drop; booked unless a J.W3 demo surface earns it** (overfitting risk: speculative substrate without a real consumer).
- **passkeys** — no app owns a credential surface (`A3 §2`). **Booked — named residual.**

**Deferred out of J (potential successors):**
- Three-way merge / DAG remix — out-of-scope by inv-J-1 (KISS). Fires only if a real collaborative-edit consumer surfaces (it does not).
- Multi-replica palette-api — out-of-scope (inv-12 KISS, carried from I).

## §8 — Brittleness window

J plans NO brittleness window. Each wave is reversible at its own boundary:

```yaml
breaking_changes_during_wave: NO
suspended_gates: none
restoration_wave: N/A — J plans no brittleness window
reason: every wave is additive. W2 adds remixPalette + /remix + /diff +
        the atomDiff edge field (the existing forkPalette path is preserved
        and re-expressed, not removed — fork is remix-with-empty-diff). W3
        is a demo-only render (feature-detected; fallback present). W4 ships
        VAL-9/VAL-1 only behind a met ≥2-consumer gate (else no-op book) and
        the Idempotency-Key store is opt-in (no legacy client breaks). The
        atom-diff edge is a soft schema add (PaletteVersion.atomDiff optional).
```

## §9 — Cohort coordination (value.js-J + fourier-J)

The WAVE-D cross-cut (`A3 §5`): the `lib/crud/remix` pattern is authored once (here — atom-enumeration + diff-persistence + the `remix`/`diff` endpoints), adopted twice (color atoms here; config atoms in fourier-J). **No shared package, no codegen** (inv-I-1 / no-shared-codegen). The single new persisted shape is the **diff-bearing provenance edge** (`{ fromHash, toHash, atomDiff }`).

Cohort discipline:
- **value.js-J** owns: `api/src/**`, `api/test/**`, `demo/@/**`, `src/easing.ts` + `src/units/color/conversions/oklab.ts` (the gated VAL-9/VAL-1 edges), `docs/tranches/J/**`.
- **fourier-J** owns: its viz-server fork+version+provenance substrate (lifted from value.js's proven shape) + the config-atom adoption + `docs/tranches/J/**` (fourier side).
- **Shared** (the documentation seam): the WAVE-D pattern shape in this CORE spec + the CRUD-CONTRACT v2 contract (carried from I) + the `palette_slug` FK clause.
- **Asymmetric starting point**: value.js EXTENDS (the atom-diff layer onto existing fork machinery); fourier INHERITS (the whole fork+version+provenance substrate it lacks). Symmetric close: both expose `GET /:slug/diff?from=` with the same envelope.
- **Cohort closure**: J (value.js) + J (fourier) close together (paired FINAL.md + cross-repo `/diff` shape-parity probe) OR explicit named successor.

The cross-repo source boundary holds (inv-I-1, carried): value.js-J commits never touch fourier; fourier-J commits never write `value.js/**`. Testable gate: `git log --name-only` on J commits returns zero `fourier-analysis/` paths.

## §10 — Successor

J's successor is named at J.W5 close. Candidate carries: the `id` field hard-removal (if not discharged at J.W4); the G5 WebMCP tool surface (when Chromium ships it stable); G2 `fetchLater()` / G4 Summarizer (if a real consumer surface earns them); VAL-9/VAL-1 (if still booked at J close — re-check at the next glass-ui aurora/spring tranche-open).

## §11 — Mode + authority

Planning-only at open. The W0 6-lane audit is the substrate basis; the W1 CORE spec (`design/J.W1-palette-remix.md`) is the binding design. W2+ dispatches only after W0+W1 land + the VAL-9/VAL-1 re-gate verdicts + user ratification.

Plan substrate: this `J.md` + `PROGRESS.md` (status board) + `design/J.W1-palette-remix.md` (the CORE spec) + the W0 audit deliverables (authored at open) + the per-wave specs under `waves/`.
