SERVED MODEL: claude-opus-5[1m]

# `ESC-W3.3-CAS-CALLERS` — the fence is built and the three writes that need it are out of bounds

**Returned by** X-W3 unit `X.W3.3` (X.A3 · **G-8**), 2026-09-18.
**Status**: RETURNED, not taken. No byte outside this unit's writable set was written.
**Also carried here**: `ESC-W3.3-REVERT-RETURNS-RELEASE` (§4) — same file, same ruling seat.

---

## 1. What the spec says, and what the bytes say

`W3.md` §5 `### X.W3.3` (`:223-226`):

> `repository/palette.ts:107-115` `update()` returns `UpdateResult` instead of
> `.then(() => undefined)` and takes the ETag-bearing predicate in its filter; **callers assert
> `matchedCount === 1` and map `0` → `412`**.

The first clause is landed at this unit's own bytes (`repository/palette.ts:137-146` +
`etag.ts:56-78`). The second names **callers** — and the spec's `Files` list for this unit
(`:231-233`) contains no service file, because it reads the routes as the callers. They are not.
Measured:

⟨cmd⟩ `grep -rn "palettes.update(" api/src --include="*.ts" | grep -v __tests__`

```
api/src/modules/admin/service/palettes.ts:56          (admin feature/demote — class 9, X.W3.6's surface)
api/src/modules/admin/service/palettes.ts:84          (admin delete)
api/src/modules/palette/service/crud.ts:224           ← PATCH
api/src/modules/palette/service/crud.ts:262           (fork-count recompute — not an ETag'd write)
api/src/modules/palette/service/versions.ts:215       ← revert
api/src/modules/palette/service/visibility.ts:174     ← publish / unpublish
```

Routes never touch a repository (`inv-L-5`, restated at `routes/crud.ts:92`), so the three
writes G-8 names happen in three **service** files. All three are in the WAVE's §4 File Bounds
as `modify`, and **none is in `X.W3.3`'s writable set**. Their owners in this wave's unit plan
(`execution/A/X-W3.md` §Unit plan): `service/crud.ts` → `X.W3.1` (closed) · `service/versions.ts`
→ `X.W3.1`, `X.W3.2` (both closed) · `service/visibility.ts` → `X.W3.1` (closed) and **`X.W3.5`,
which has not yet run** — so §2.3 has a live candidate owner and §2.1/§2.2 have none. Writing
them here would be an out-of-bounds write; bending the cure so the gate reads green without them
would be worse.

**So G-8 is reported RED, with its mechanism built and its wiring returned.** The repository
API is not dead apparatus: it is exercised by five rows of
`__tests__/palette-write-contract.test.ts`, and its docstring names this escalation so no
reader mistakes it for an unused method.

## 2. The hunks, exactly

Each is two edits: pass the already-read palette as the fourth argument, and read the result.

### 2.1 `api/src/modules/palette/service/crud.ts` — PATCH

```diff
@@ imports @@
+import { assertFenceHeld } from "../etag.js";

@@ patchPalette, :224 @@
-        await services.repositories.palettes.update(slug, { $set }, session);
+        assertFenceHeld(
+            await services.repositories.palettes.update(slug, { $set }, session, palette),
+        );
```

`palette` is the document this function already read or was handed (`:180-182`,
`input.palette ?? (await …findBySlug(slug))`) — the same doc the route validated `If-Match`
against (`routes/crud.ts:120-123`), which is what makes this a fence and not a second read.

### 2.2 `api/src/modules/palette/service/versions.ts` — revert

```diff
@@ imports @@
+import { assertFenceHeld } from "../etag.js";

@@ revertToVersion, :215-229 @@
-        await services.repositories.palettes.update(
-            slug,
-            {
-                $set: { … },
-                $inc: { versionCount: 1 },
-            },
-            session,
-        );
+        assertFenceHeld(
+            await services.repositories.palettes.update(
+                slug,
+                {
+                    $set: { … },
+                    $inc: { versionCount: 1 },
+                },
+                session,
+                palette,
+            ),
+        );
```

`palette` is read at `:175`, before the transaction. The throw happens **inside**
`withTransaction`, so the release row inserted at `:201-213` is rolled back with it — a lost
race leaves neither half. That is the property the wrapper exists for, and it is why the
assertion belongs inside the block rather than after it.

### 2.3 `api/src/modules/palette/service/visibility.ts` — publish / unpublish

```diff
@@ imports @@
+import { assertFenceHeld } from "../etag.js";

@@ setVisibility, :174-176 @@
-    await services.repositories.palettes.update(slug, {
-        $set: { visibility: target, updatedAt: new Date() },
-    });
+    assertFenceHeld(
+        await services.repositories.palettes.update(
+            slug,
+            { $set: { visibility: target, updatedAt: new Date() } },
+            undefined,
+            palette,
+        ),
+    );
```

`palette` is read at `:161`. This write is single-collection and deliberately un-transacted
(`:150-154` docstring), so the fence is the whole of its concurrency control.

## 3. The gate row this unlocks

`W3.md` §6 **G-8**: *"Revert / PATCH / publish assert `matchedCount === 1`; a concurrent write
between read and write yields `412`, not a silent overwrite."*

With §2 landed, the wire arm is a three-row spec (one per verb): read the palette, land a
concurrent write from a second connection, then issue the PATCH/publish/revert with the now-stale
`If-Match` → `412`, and the concurrent writer's bytes stand. Those rows are **not** authored in
this unit's spec file: a test that must fail until someone else's bytes land is not a born-RED
gate, it is a red suite, and the wave has enough honest reds already.

## 4. `ESC-W3.3-REVERT-RETURNS-RELEASE` — the same file, a smaller owing

`G-11` requires the revert response to CARRY the appended revision (fold §CrossEdges §B). The
release is created inside `revertToVersion` (`service/versions.ts:201-213`), which returns
`{ palette }` only — so the route re-reads the palette's head to find what the service just
appended (`routes/versions.ts:114-115`, emitted at `:122-128`). That read is correct — the head
IS the appended release (`listVersions` sorts `{revisionNo: -1, _id: -1}`) — but it is a second
round-trip and it is racy
under a concurrent second revert — a race §2.2's fence is what would close.

```diff
@@ service/versions.ts — RevertOutput @@
 export interface RevertOutput {
     palette: WithId<Palette>;
+    /** The release this revert appended — the identity the 201 carries (G-11). */
+    revision: PaletteVersion;
 }
```

`createVersionRecord` already returns the release hash (`:97`); the row it inserted is in hand at
`:81-96`. Returning it is a handful of lines in a file this unit may not write.

## 5. What this escalation does NOT ask for

It does not ask to widen `W3.md` §4 — all three files are already in it. It asks the ruling seat
to name **which unit or successor** lands §2 (and, optionally, §4), and to note that until then
this wave must not report G-8 closed. It does not touch
`docs/tranches/V/vnext/api-contract.source.json` (FROZEN, D-7), and it proposes no new gate.
