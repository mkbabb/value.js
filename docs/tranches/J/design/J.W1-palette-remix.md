# J.W1 — palette REMIX + atom-diff layer (the CORE spec)

**Wave**: J.W1 (DEV / design). **Disposition**: the binding design for the J.W2/J.W3 IMPL surfaces.
**Predecessor substrate**: value.js-I ships fork + version-DAG + provenance + revert (`api/src/services/palette/{forks,versions}.ts`, `hash.ts`, `models.ts`).
**The gap it closes** (`A3 §4`): `/provenance` is a node-chain ("who did this descend from"); it does NOT answer "*what changed*". J adds the atom-diff layer.
**Cross-repo role**: this is the canonical `lib/crud/remix` pattern fourier-J adopts (config atoms) — authored once, adopted twice. No shared package, no codegen (inv-I-1).

---

## 1. The atoms (what gets diffed — this is the whole design)

A palette is a **small, flat, content-addressable bag of named items**. The diffable unit is the color stop:

```ts
// api/src/models.ts (existing)
export interface PaletteColor {
    css: string;
    name?: string | undefined;
    position: number;
}
```

The KISS observation (`A3 §4.2`): because the bag is small + flat + content-addressable, a git-like diff is tractable **without a Merkle tree**. A diff is a set of per-atom ops computed by content-hashing each atom and set-differencing the two bags. No three-way merge, no rebase, no DAG — remix is always parent→child, single-parent, linear (inv-J-1).

**Atom keying** is the one design choice that determines diff quality. Two candidate keys:

| Key | Semantics | Failure mode |
|---|---|---|
| `position` | a stop at slot N is "the same stop" across versions | a re-order reads as N changes (every stop at a moved slot looks "changed") |
| content (`css`) | a color value is "the same atom" regardless of slot | a recolor at a fixed slot reads as remove+add, not "changed" |

**Decision — keyed by `position`, with a content-equality short-circuit.** The atom KEY is `position` (the stable identity of a stop in the ladder); the atom HASH is over `(css, name)`. The diff is computed as:
1. Set-difference the two bags by `position` → positions only in `before` are `removed`; only in `after` are `added`; in both are candidates for `changed`.
2. For a position in both, compare the atom-hash → equal hashes elide (no op); differing hashes emit `changed` with `before`/`after`.

This makes a recolor-at-a-slot a single `changed` op (the common remix), an append a single `added`, a deletion a single `removed`. A full re-order (rare) degrades to changed-ops, which is honest. This keying is the **parameterization seam** fourier-J overrides (its atoms key by config-atom name, not `position`).

---

## 2. The atom-set-hash (per-atom + order-independent set-hash)

Today `hash.ts` content-hashes the WHOLE palette (`computeContentHash(name, colors)`). WAVE-D NARROWS this to per-atom so a diff is cheap and dedup is order-independent.

```ts
// api/src/hash.ts (NEW — alongside the existing computeContentHash)

/** Content hash of a single atom. Order-independent within the atom:
 * canonicalize (css, name) but NOT position — position is the KEY, not content. */
export function computeAtomHash(atom: PaletteColor): string {
    const canonical = JSON.stringify({
        css: atom.css.trim().toLowerCase(),
        name: (atom.name ?? "").trim().toLowerCase(),
    });
    return createHash("sha256").update(canonical).digest("hex");
}

/** Order-independent set-hash over the bag's per-atom hashes keyed by position.
 * Two palettes with the same atoms (any array order) produce the same set-hash. */
export function computeAtomSetHash(atoms: PaletteColor[]): string {
    // Sort by position so array order is irrelevant; fold (position, atomHash).
    const entries = atoms
        .map((a) => `${Math.round(a.position * 1e6) / 1e6}:${computeAtomHash(a)}`)
        .sort();
    return createHash("sha256").update(entries.join("|")).digest("hex");
}
```

**Relationship to the existing `currentHash`.** `computeContentHash(name, colors)` stays the palette identity (it folds `name`, which the set-hash deliberately omits). `computeAtomSetHash` is the **colors-only** fingerprint: two palettes with identical colors but different names share a set-hash, dedup at the atom layer, and diff to empty. The version `_id` remains `computeContentHash` (no migration); the set-hash is an additive projection exposed in the formatter and used by the diff engine.

**Dedup property (the conformance gate).** `computeAtomSetHash(A) === computeAtomSetHash(B)` ⟺ `diffAtoms(A, B)` is empty — including when A and B carry the same colors in different array order. The J.W2 conformance probe asserts both directions.

---

## 3. The atom-diff (`diffAtoms`)

```ts
// api/src/services/palette/diff.ts (NEW — the lib/crud/remix pattern core)

export type AtomDiffOpKind = "added" | "removed" | "changed";

export interface AtomDiffOp {
    op: AtomDiffOpKind;
    /** The atom key — the stop position. fourier-J overrides this to a config-atom name. */
    atomKey: number;
    /** Present for `removed` + `changed`. */
    before?: PaletteColor;
    /** Present for `added` + `changed`. */
    after?: PaletteColor;
}

export interface AtomDiff {
    fromHash: string;      // source-version content-hash
    toHash: string;        // target-version content-hash
    fromSetHash: string;   // source atom-set-hash
    toSetHash: string;     // target atom-set-hash
    ops: AtomDiffOp[];     // empty ⟺ atom-set-equal
}

/** Pure, deterministic set-difference. Parameterized for fourier-J reuse via
 * (enumerate, key, hash) — the palette binding is the default. */
export function diffAtoms(before: PaletteColor[], after: PaletteColor[]): AtomDiffOp[] {
    const byKeyBefore = new Map(before.map((a) => [a.position, a]));
    const byKeyAfter = new Map(after.map((a) => [a.position, a]));
    const ops: AtomDiffOp[] = [];

    for (const [key, b] of byKeyBefore) {
        const a = byKeyAfter.get(key);
        if (!a) ops.push({ op: "removed", atomKey: key, before: b });
        else if (computeAtomHash(a) !== computeAtomHash(b))
            ops.push({ op: "changed", atomKey: key, before: b, after: a });
        // equal hash → no op
    }
    for (const [key, a] of byKeyAfter) {
        if (!byKeyBefore.has(key)) ops.push({ op: "added", atomKey: key, after: a });
    }
    return ops.sort((x, y) => x.atomKey - y.atomKey);
}
```

**Symmetry (the conformance gate).** `diffAtoms(A, B)` is the inverse of `diffAtoms(B, A)`: `added`↔`removed` swap, `changed` swaps `before`↔`after`, key set is identical. The probe asserts inversion.

### 3.1 The parameterization seam (fourier-J adopts this)

`diffAtoms` is the palette binding of a generic 3-function shape. fourier-J overrides the same shape for config atoms (`active_bases[]`, `n_harmonics`, `contour_settings`, ...):

```ts
// the generic shape both repos instantiate (NOT a shared package — copied + bound per repo)
interface AtomCodec<Atom, Key> {
    enumerate(payload: unknown): Atom[];   // palette: colors; fourier: config-atom list
    key(atom: Atom): Key;                  // palette: position; fourier: atom name
    hash(atom: Atom): string;              // palette: computeAtomHash; fourier: stable-stringify
}
```

The endpoint shape, the diff-bearing edge, and the persistence are IDENTICAL across repos; only the codec differs. This is exactly how CRUD-CONTRACT v2 lives in both repos as parallel `lib/crud` — the pattern, not the package.

---

## 4. The diff-bearing provenance edge (the one new persisted shape)

Today the version edge (`PaletteVersion`) carries `parentHash`/`forkedFromHash` but NOT what-changed. WAVE-D attaches the diff to the edge:

```ts
// api/src/models.ts — PaletteVersion (ADD one optional field)
export interface PaletteVersion {
    _id: string;            // content-hash (UNCHANGED)
    name: string;
    colors: PaletteColor[];
    parentHash: string | null;
    forkedFromHash: string | null;
    authorSlug: string;
    paletteSlug: string;
    createdAt: Date;
    rootHash: string;
    depth: number;
    /** J.W2 — the atom-diff from this version's parent (parentHash ?? forkedFromHash)
     * to THIS version. `null`/absent for a root version (no parent). The diff-
     * bearing provenance edge: { from: parentHash, to: _id, ops: atomDiff }. */
    atomDiff?: AtomDiffOp[] | null;
}
```

**Why on the version, not a new collection** (inv-J-2): the version row IS the edge target — its `parentHash` is the edge source. Persisting `atomDiff` on the row makes the edge self-describing with zero new collection, zero new index beyond the existing `parentHash` lookups, and it rides the existing `createVersionRecord` write path inside the existing `withTransaction`. A root version (no parent) has `atomDiff: null`.

**Soft schema add.** The field is optional; existing version rows (pre-J) carry no `atomDiff` and read as `null`. No migration is required for correctness — the diff endpoint recomputes on demand (§6) when the stored diff is absent. A backfill is OPTIONAL (J.W2 may backfill the live chain for cache warmth; it is not a correctness gate).

---

## 5. `remixPalette` (fork + recorded atom-diff)

`forkPalette` (`api/src/services/palette/forks.ts`) becomes the diff-recording `remixPalette`. The cross-collection `withTransaction` discipline is UNCHANGED (insert child + version + bump parent fork-count, in-txn source re-read closing the race); the delta is: the child version records the atom-diff from the source.

```
POST /palettes/:slug/remix          (auth required; the source is :slug)
body (all optional):
  { name?, slug?, colors? }
  - colors ABSENT  → a plain fork (diff is empty; remix-with-no-change; the
                     existing forkPalette behaviour, preserved)
  - colors PRESENT → the remix payload; server diffs colors against source.colors,
                     persists the child with the new colors + the recorded atomDiff
→ 201 { ...formattedPalette, atomSetHash, remixedFrom: { slug, hash }, atomDiff }
```

Semantics:
1. Fetch source (`:slug`); 404 if absent (outside the txn — fail fast).
2. `targetColors = body.colors ?? source.colors`; validate (length, css).
3. `ops = diffAtoms(source.colors, targetColors)`.
4. In `withTransaction` (unchanged shape): re-read source under session-isolation (race-close); insert child palette (`forkOf = :slug`, `forkOfHash = source.currentHash`, `currentHash = computeContentHash(name, targetColors)`); `createVersionRecord({ ..., colors: targetColors, forkedFromHash: source.currentHash, atomDiff: ops })`; `incrementForkCount(:slug)`.
5. Return the formatted child + `atomSetHash` + `remixedFrom` + `atomDiff`.

**`fork` is `remix` with an empty diff.** The existing `POST /:slug/fork` route is PRESERVED (no breaking change) and re-expressed as `remixPalette({ colors: undefined })` — a remix that records an empty `atomDiff`. There is one code path; `fork` is its zero-change special case. This keeps the I-tranche fork contract intact while the new `remix` route is purely additive (NO-legacy: no shim, one path).

---

## 6. `GET /:slug/diff?from={hash}` (the read-only diff endpoint)

The operation a diff-viewer (§7) and a future WebMCP `readOnlyHint` tool (G5 residual) both consume. Idempotent, ETag-able, cacheable.

```
GET /palettes/:slug/diff?from={hash}[&to={hash}]
  - from: REQUIRED — a version content-hash on :slug's single-parent chain
  - to:   OPTIONAL — defaults to the palette's currentHash (the live version)
→ 200 application/json
   {
     fromHash, toHash,
     fromSetHash, toSetHash,
     ops: AtomDiffOp[],
     identical: boolean        // ops.length === 0
   }
   ETag: "<fromHash>:<toHash>"   // strong validator; the diff is immutable per pair
  errors (problem+json, RFC 7807, per the I.W4 envelope):
   404 — :slug not found, OR from/to hash not a version of :slug
   422 — from/to are not on the same single-parent chain (inv-J-1 guard)
```

**Compute strategy (read-or-recompute).** If `to` is the live version and the stored `version.atomDiff` already records the from→to edge directly (the common case: `from === parentHash`), return it. Otherwise FETCH both versions by hash (`paletteVersions.findByHash`) and `diffAtoms(fromVersion.colors, toVersion.colors)` — a pure recompute, no persistence. This keeps `/diff` answerable for ANY two versions on the chain (not just adjacent edges) without persisting an O(n²) edge set (inv-J-2: derived projection, not a new store).

**Single-parent guard (inv-J-1).** Before recomputing, verify `from` is an ancestor of `to` on the `parentHash` chain (or vice-versa) — a walk bounded by the existing depth (≤50). If neither is an ancestor of the other (they are on divergent forks), return 422 with a problem+json detail. This enforces the KISS line: `/diff` is a chain-diff, never a merge-base computation.

**ETag + cache.** The diff for a `(fromHash, toHash)` pair is immutable (content-hashes are stable), so the ETag is `"<fromHash>:<toHash>"` and the response is `Cache-Control: public, max-age` safe. `If-None-Match` → 304. This reuses `api/src/middleware/etag.ts` (the I.W4 helper) with a pair-derived validator rather than `paletteETag`.

---

## 7. The diff render — CSS Custom Highlight API (G6, J.W3)

The consumer render of "these 2 colors changed, this 1 was added" uses the **CSS Custom Highlight API** (`A3 §3 G6`) — ranges over wrapper spans, the natural diff-viewer primitive.

```
demo/@/components/.../PaletteDiff.vue   (NEW)
```

- Render the target palette's swatch ladder; for each `AtomDiffOp`, register a `Range` over the swatch element(s) and add it to a named `Highlight`:
  - `changed` → `::highlight(diff-changed)` (amber underlay)
  - `added` → `::highlight(diff-added)` (green underlay)
  - `removed` → render a ghost swatch slot + `::highlight(diff-removed)` (red strike)
- The `::highlight()` pseudo-element styling lives in a demo stylesheet (NOT shipped from the library — this is a demo consumer).

**Baseline policy.** `CSS.highlights` is **Newly** → feature-detected with a ≤20 LOC fallback:

```ts
if ("highlights" in CSS) { /* register Ranges into CSS.highlights */ }
else { /* fallback: wrap changed/added swatches in <span class="diff-*"> */ }
```

The fallback is wrapper-spans with the same three classes the `::highlight()` rules mirror — visually equivalent, progressively enhanced. Per inv-29 (progressive-enhancement-floor, inherited).

**a11y leaf (the REFUTED-W3-as-a-wave residue).** The swatch list carries the diff semantics for AT: each diffed swatch gets `aria-label` ("color #RRGGBB added" / "changed from X to Y" / "removed"); the highlight is decorative reinforcement, not the sole signal. No new form surface (the diff is read-only) — this is the entire W3-spine obligation, a leaf not a wave.

---

## 8. The agent-legibility constraint (G5 WebMCP — booked, not shipped)

`A3 §4.5 + §3 G5`: WebMCP (`navigator.modelContext.registerTool`) is Early-Preview (Chromium 146 + flag) — **booked as a J-residual, not a wave**. But it is the DESIGN CONSTRAINT on the shapes above. The REMIX API is authored agent-legibly so a future tool surface (`create-palette`, `remix-palette`, `diff-palettes`) wraps it with zero re-shaping:

- **Atomic + composable + distinct.** `remix` and `diff` are separate operations with separate routes; `diff` is pure-read (`readOnlyHint`-eligible); `remix` is the sole write.
- **Descriptive validation errors for retries.** Every 4xx is problem+json (RFC 7807, the I.W4 envelope) with a `detail` an agent can read and correct (e.g. "from/to not on the same chain" → the agent picks a valid ancestor).
- **Secure backend through the API layer.** The tool would call the same `POST /:slug/remix` / `GET /:slug/diff` — no privileged side-channel; auth + ownership middleware unchanged.

No tool ships in J. The constraint shapes the API so it ships later with no rework.

---

## 9. Surface inventory (J.W2 + J.W3 build targets)

| # | Surface | File | New / extend | Consumers (overfitting check) |
|---|---|---|---|---|
| 1 | `computeAtomHash` + `computeAtomSetHash` | `api/src/hash.ts` | NEW | diff engine + formatter + conformance probe (≥2) |
| 2 | `diffAtoms` + `AtomDiff*` types | `api/src/services/palette/diff.ts` | NEW | `remixPalette` + `/diff` route + conformance + fourier-J pattern source (≥2) |
| 3 | `PaletteVersion.atomDiff` | `api/src/models.ts` | EXTEND (optional field) | `createVersionRecord` + `/diff` (≥2) |
| 4 | `remixPalette` | `api/src/services/palette/forks.ts` | EXTEND (`forkPalette` re-expressed) | `/remix` route + the preserved `/fork` route (≥2) |
| 5 | `POST /:slug/remix` | `api/src/routes/palettes/forks.ts` | NEW | demo remix UI + WebMCP residual (the demo is the J consumer) |
| 6 | `GET /:slug/diff?from=` | `api/src/routes/palettes/diff.ts` | NEW | `PaletteDiff.vue` + conformance + WebMCP residual (≥2) |
| 7 | atom-set-hash in response | `api/src/format/palette.ts` | EXTEND | demo dedup hint + diff render (≥2) |
| 8 | `PaletteDiff.vue` | `demo/@/components/...` | NEW | the demo (a demo consumer — overfitting-clean) |
| 9 | diff-symmetry + dedup probe | `api/test/conformance/diff.test.ts` | NEW | the test IS the consumer |

Every artifact carries ≥2 consumers OR is a demo OR is a test — overfitting-clean by construction (WAVE-D is ≥2-consumer because both repos adopt the pattern).

---

## 10. KISS guardrails (what this spec must NOT become — `A3 §4.4`)

- **No three-way merge, no rebase, no DAG** (inv-J-1). `/diff` is a chain-diff; divergent forks → 422.
- **No new storage engine** (inv-J-2). The diff is a JSON payload on the existing version edge; `/diff` recomputes for non-adjacent pairs.
- **No CRDT.** Palettes are forked-then-remixed, not collaboratively edited.
- **No shared cross-repo package, no codegen** (inv-I-1). The pattern is copied + bound per repo via the `AtomCodec` shape; only the codec differs.
- **`fork` is `remix` with an empty diff** — one code path, no legacy shim.
- **VAL-1 / VAL-9 are NOT in this spec.** They are the separately-gated chronic edges (J.W4, binary ≥2-consumer gate); the REMIX layer does not depend on them.
