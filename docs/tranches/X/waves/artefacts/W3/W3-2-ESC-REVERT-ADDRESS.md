SERVED MODEL: claude-opus-5[1m]

# `ESC-W3.2-PAYLOAD-ADDRESSED-TESTS` — returned by X.W3.2, not taken

**Date**: 2026-09-18 · **Unit**: X.W3.2 (Membership join, X.A2) · **Wave**: X-W3 · **Track A**
**Cure at**: `9b3e6923` (commit 2) · `0324197e` (commit 3) · `6e5b6e32` (naming correction)

## The measured fact

G-7 splits one value that used to do two jobs. Before this unit,
`palette_versions._id` **was** `computeContentHash(name, colors)` — payload identity **was**
membership identity, which is the content-addressed door between palettes that G-5 and G-6
(P0) exist to shut. After the cure, `_id` is the **release** hash and the content identity is
the row's new `payloadHash` field.

Two **existing** tests address a version row by the palette's `currentHash` — i.e. by its
**payload** identity. Both are green only because of the conflation the wave removes, and both
therefore go RED at the cure. They are the wave's only two collateral reds:

⟨cmd⟩ `cd api && npm test` (double-run, byte-identical) →
`Test Files 2 failed | 37 passed (39)` · `Tests 2 failed | 227 passed (229)`

| # | file:line | what it does | why it reds |
|---|---|---|---|
| 1 | `api/src/modules/palette/__tests__/palette-forks.test.ts:68-71` | `paletteVersions.findByHash(palette.currentHash)` to fetch the fork child's version row | `currentHash` is a **payload** hash; `_id` is now a **release** hash, so the by-id lookup returns `null` and `childVersion?.forkedFromHash` is `undefined` |
| 2 | `api/src/modules/palette/__tests__/palettes-forks.test.ts:147-163` | reads `currentHash` off the detail envelope and `POST /:slug/revert { hash: firstHash }` | revert now resolves its source revision with the joined read `{_id: hash, paletteSlug}` (G-6), so a payload hash resolves to nothing → `404` |

**Neither is a product path.** The demo reverts only by the version-list `hash`
⟨cmd⟩ `grep -rn "revert(" demo/ --include="*.ts" --include="*.vue"` → `useVersionHistory.ts:88`
(the definition) and `BrowsePane.vue:279` (`pm.versions.revert(slug, hash)`), whose `hash`
comes from `listVersions` → `data[].hash` → `_id`. No shipped client addresses a revision by
`currentHash`.

## Why this is returned and not written

`W3.md` §4 lists both files as **modify** for the WAVE, but this unit's writable set is the
seven paths of `W3.md` §5 `### X.W3.2` (`:214-216`). Both files belong to **X.W3.4** under the
wave-open unit plan (`execution/A/X-W3.md`, Group 4). A write there by this seat is an
**ESCALATION under the standing law — stop and return it** — so neither file was touched, not
even in the working tree.

## Why the cure was not bent to keep them green

The only in-bounds way to keep both rows green is to let a revision be addressed by its
**payload** hash again — a second, joined `$or` arm on `payloadHash`. That is rejected:

- `§3 Scope 3` prescribes the filter literally: `{ _id: hash, paletteSlug: slug }`; `§5` says
  revert "uses **the same** joined read". A second address is a substitution, not the cure.
- After the split `payloadHash` is **not unique within a palette** — a revert re-releases an
  older payload — so a payload-addressed revision read is genuinely ambiguous.
- Re-admitting payload addressing is re-admitting the conflation G-7 exists to kill. It would
  read GREEN while the defect stood: the masking shape the standing law forbids.

## The exact bytes owed (one hunk each) — NOT applied

Both shapes are already **measured green in this unit's own spec**, so the ruling seat is not
being handed an unproven patch: row *"G-6: the owner's own prior revision still reverts"*
reverts by a row's `_id` read out of `findByPaletteSlug`, and row *"G-7: revisionNo is
first-class…"* fetches `data[].hash` off the live `/versions` envelope. Only the two edits
below are outstanding.

**1 — `api/src/modules/palette/__tests__/palette-forks.test.ts:68-70`**

```diff
-        const childVersion = await services.repositories.paletteVersions.findByHash(
-            palette.currentHash as string,
-        );
+        const childVersion =
+            await services.repositories.paletteVersions.findHeadByPaletteSlug(
+                palette.slug,
+            );
```

The assertion on the next line (`forkedFromHash` === the source's `currentHash`) is **unchanged
and still true**: `forkedFromHash` remains a payload reference and still records the fork edge.
`findHeadByPaletteSlug` is the palette's own head release — resolving the child's row by
MEMBERSHIP rather than by a hash, which is the same correction the service layer took.

**2 — `api/src/modules/palette/__tests__/palettes-forks.test.ts:147-151`**

```diff
         const get0 = await app.request("/palettes/source", { method: "GET" });
         const etag0 = get0.headers.get("ETag") ?? "";
-        const get0Body = (await get0.json()) as { currentHash: string };
-        const firstHash = get0Body.currentHash;
+        const list0 = await app.request("/palettes/source/versions", { headers: alice });
+        const list0Body = (await list0.json()) as { data: Array<{ hash: string }> };
+        const firstHash = list0Body.data[0]?.hash as string;
```

`etag0` is still read from the detail response and still used by the PATCH below; only the
revision **address** changes, from the payload hash to the release id the version list emits —
which is what the shipped client already sends.

## A third out-of-bounds byte, measured and returned with it — `ESC-W3.2-FIXTURE-TYPE`

`api/src/modules/palette/__tests__/paletteVersion.test.ts:7-21`'s `makeVersion` factory is
annotated `: PaletteVersion` and builds the literal by hand. `PaletteVersion` now requires
`payloadHash` and `revisionNo`, so that literal is **type-incomplete**. Measured, not assumed:

⟨cmd⟩ `npx tsc --noEmit --strict --target ES2022 --module Node16 --moduleResolution Node16 --lib ES2022 --exactOptionalPropertyTypes --verbatimModuleSyntax --skipLibCheck --esModuleInterop --types node src/modules/palette/__tests__/paletteVersion.test.ts`
→ `error TS2322 … Property 'payloadHash' is optional … but required in type 'PaletteVersion'`

**No gate reads it today**: ⟨cmd⟩ `api/tsconfig.json` `"exclude": ["node_modules", "dist",
"src/**/__tests__/**"]` — the api program does not include its own `__tests__`, and vitest
transpiles with esbuild without checking types. The file runs and **passes** in the suite. The
fields were kept **required** rather than optional because post-migration every row carries
them; making them optional to spare an un-typechecked fixture would put slack in the model to
keep a test quiet. The file is in **no** unit's writable set in this wave (it is not in
`W3.md` §4 at all), so the two lines are returned:

```diff
         paletteSlug: "p1",
         createdAt: new Date(),
+        payloadHash: "payload-1",
+        revisionNo: 1,
         rootHash: "hash-1",
```

## Standing until ruled

The api suite carries **exactly these two reds** and no others. Every other row of the 39-file
suite is green, `npx tsc --noEmit -p api/tsconfig.json` is exit 0, and the repo-root
`npm run typecheck` is exit 0. X.W3.2's own gates G-5 · G-6 · G-7 are GREEN with L-19
falsifiers (`W3-2-falsifiers.txt`).
