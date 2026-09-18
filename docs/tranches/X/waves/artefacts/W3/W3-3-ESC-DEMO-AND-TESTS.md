SERVED MODEL: claude-opus-5[1m]

# `ESC-W3.3-DEMO-WRITE-CONTRACT` (a §3a TRIUMVIRATE TRIGGER) and `ESC-W3.3-PRECONDITION-TESTS`

**Returned by** X-W3 unit `X.W3.3` (X.A3 · **G-9** · **G-10**), 2026-09-18.
**Status**: RETURNED, not taken. No byte outside this unit's writable set was written.

---

## 1. The trigger, quoted, and the measurement that fires it

`W3.md` **§3a Triumvirate Dispatch** (`:103-106`) names this exact condition as **mandatory**,
not optional:

> **Non-local-edit-recoverable hard-gate failures** — … the `Idempotency-Key` requirement
> (G-10) **breaking an existing consumer of `POST /:slug/fork`**.

⟨cmd⟩ `grep -rn "idempotencyKey\|ifMatch" demo/palettes/api/versions.ts` → **0 hits.**

The demo's two calls send neither header (`demo/palettes/api/versions.ts:34-51`):

```ts
export function revertPalette(slug: string, hash: string): Promise<Palette> {
    return request(`/palettes/${encodeURIComponent(slug)}/revert`, {
        method: "POST",
        body: JSON.stringify({ hash }),
    });
}

export function forkPalette(slug: string, name?: string, forkSlug?: string): Promise<Palette> {
    return request(`/palettes/${encodeURIComponent(slug)}/fork`, {
        method: "POST",
        body: JSON.stringify({ name, slug: forkSlug }),
    });
}
```

Under this unit's cure, **both break** on the live surface:

| consumer | call site | before | after |
|---|---|---|---|
| version-drawer revert | `demo/palettes/BrowsePane.vue:279` → `useVersionHistory.ts:88-90` → `api/versions.ts:34` | `200` | **`400`** (no key) — and `428` once a key is added, until `If-Match` is too |
| fork | `useVersionHistory.ts:97-103` → `api/versions.ts:43` | `201` | **`400`** (no key) |

**Why it is not locally recoverable.** `demo/palettes/api/*.ts` is in **no** X-W3 unit's writable
set, and the fold records the exclusion deliberately — `X-W3-FOLD.md` §BoundsDelta, *"Not
proposed, deliberately"* (`:704-708`), lists `demo/palettes/api/*.ts` under F-23's declined
deadline. The wave's §4 File Bounds does not carry the file either. So the cure that the spec
orders at the api bytes cannot be completed at the client by any seat of this wave.

**What this seat did instead of bending.** The api cure is landed exactly as specified (absent
key → `400`; revert absent `If-Match` → `428`), because the spec governs and a
requirement that exempts the one client that does not satisfy it is not a requirement. The break
is measured, named, and handed up with its hunks. No allowlist, no user-agent exemption, no
"warn-only" mode, no grace window — each would be the masking fallback the standing law forbids.

## 2. The client hunks, exactly

### 2.1 `demo/palettes/api/versions.ts`

```diff
+import { paletteETag } from "./palettes";
+
-export function revertPalette(slug: string, hash: string): Promise<Palette> {
+export function revertPalette(
+    slug: string,
+    hash: string,
+    ifMatch: string,
+): Promise<Palette> {
     return request(`/palettes/${encodeURIComponent(slug)}/revert`, {
         method: "POST",
+        ifMatch,
+        idempotencyKey: crypto.randomUUID(),
         body: JSON.stringify({ hash }),
     });
 }

 export function forkPalette(
     slug: string,
     name?: string,
     forkSlug?: string,
 ): Promise<Palette> {
     return request(`/palettes/${encodeURIComponent(slug)}/fork`, {
         method: "POST",
+        idempotencyKey: crypto.randomUUID(),
         body: JSON.stringify({ name, slug: forkSlug }),
     });
 }
```

`RequestOptions` already carries both fields (`demo/platform/transport/client.ts:96-101`) and
already emits the headers (`:111-116`) — nothing in the transport needs to change.

### 2.2 The validator has to be threaded, and the palette is already in hand

`demo/palettes/useVersionHistory.ts:88-95` and `demo/palettes/BrowsePane.vue:277-284`:

```diff
-    async function revert(slug: string, hash: string): Promise<Palette | undefined> {
+    async function revert(
+        slug: string,
+        hash: string,
+        ifMatch: string,
+    ): Promise<Palette | undefined> {
         try {
-            return await revertPalette(slug, hash);
+            return await revertPalette(slug, hash, ifMatch);

@@ BrowsePane.vue onRevert @@
-    const updated = await pm.versions.revert(versionPalette.value.slug, hash);
+    const updated = await pm.versions.revert(
+        versionPalette.value.slug,
+        hash,
+        paletteETag(versionPalette.value),
+    );
```

`versionPalette` holds the palette the drawer was opened on (`BrowsePane.vue:270-275`), so the
validator is a captured read — the shape `TagEditPopover.vue:74` already uses for PATCH, and the
one `WRITE-CONTRACT.md §4` asks the client to converge on. **Do not** default it to `"*"`: that is
deviation (2) in the canon, and it turns the fence back off.

### 2.3 Not fixed by these hunks (recorded so the ruling seat sees the whole shape)

`WRITE-CONTRACT.md §4`'s deviations (1), (3) and (4) — the leaf-owned `paletteETag`
re-implementation, the discarded PATCH response, and the stale `updatedAt` re-cache — are the
same class and live in the same files. They are **not** this escalation's ask; they are recorded
in canon for the wave that owns `demo/palettes/**` (X-W7, per fold §CrossEdges §A/§E).

## 3. `ESC-W3.3-PRECONDITION-TESTS` — two api test rows that encode the OLD contract

Both files are in `W3.md` §4 (`modify`) and in **another unit's** writable set, so neither was
touched — not even in the working tree.

⟨cmd⟩ `cd api && npm test` → `Test Files 3 failed | 37 passed (40)` ·
`Tests 3 failed | 241 passed (244)`. One of the three is inherited (X.W3.2's
`ESC-W3.2-PAYLOAD-ADDRESSED-TESTS`, `palette-forks.test.ts`); the other two are these.

### 3.1 `palette-versions.test.ts:315-320` (X.W3.2's file) — `expected 428 to be 404`

G-6's wire row reverts across an object boundary and asserts `404`. With G-9 landed the request
never reaches the join: it carries no `If-Match`, so it is refused `428` first. The row's
PREDICATE is untouched — it just has to satisfy the new precondition to reach the byte it
measures:

```diff
+import { paletteETag } from "../etag.js";
@@ :315-319 @@
         const res = await app.request("/palettes/a/revert", {
             method: "POST",
-            headers: jsonAlice,
+            headers: { ...jsonAlice, "If-Match": paletteETag(before!) },
             body: JSON.stringify({ hash: bHash }),
         });
```

`before` is read at `:307`, one statement above. (`Idempotency-Key` is **not** needed: that test
app mounts the routes without the global middleware — ⟨cmd⟩
`grep -rln "idempotency" api/src/modules/palette/__tests__/*.test.ts` → **1 file, this unit's
own** — the 3 matching LINES are all inside it, and no other palette test mounts the
middleware.)

### 3.2 `palettes-forks.test.ts:145-169` — `expected 428 to be 200`

This row was ALREADY red at this unit's open, for X.W3.2's reason (it addresses the revert by
`currentHash`, a payload identity). It stays red, now reporting `428` instead of `404`. Its full
repair needs all three of X.W3.2's hunk, the new `If-Match`, and the new status:

```diff
+        const etag1 = (await app.request("/palettes/source", { method: "GET" }))
+            .headers.get("ETag") ?? "";
+        const rows = await services.repositories.paletteVersions.findByPaletteSlug(
+            "source", 0, 10,
+        );
+        const firstRelease = rows[rows.length - 1]!._id;   // X.W3.2: address the RELEASE
         const revert = await app.request("/palettes/source/revert", {
             method: "POST",
-            headers: jsonAlice,
-            body: JSON.stringify({ hash: firstHash }),
+            headers: { ...jsonAlice, "If-Match": etag1 },
+            body: JSON.stringify({ hash: firstRelease }),
         });
-        expect(revert.status).toBe(200);
+        expect(revert.status).toBe(201);
```

(The test's title — *"REVERT → 200"* — becomes false with it; the row is X.W3.4's file to
rename.) Both shapes are already measured GREEN in this unit's own spec
(`palette-write-contract.test.ts`, the G-9 "current If-Match proceeds" row and both G-11 rows),
so the ruling seat is not handed an unproven patch.

## 4. What is asked

1. A **triumvirate** (research + plan augment + redress), per §3a — this seat may not be
   redispatched alone on it.
2. A named owner for §2 (`demo/palettes/api/versions.ts` + the two threading hunks) — a bounds
   grant to a successor unit, or an X-W7 row that lands before the api cut reaches a deployed
   client.
3. A named owner for §3's two rows (both files are already in `W3.md` §4).
