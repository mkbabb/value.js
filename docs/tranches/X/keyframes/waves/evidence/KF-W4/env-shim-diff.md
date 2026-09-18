SERVED MODEL: claude-opus-5[1m]

# KF.W4 — `env-shim-diff.md` (G-KFW4-1's shim act, measured)

**Wave** X.KF.W4 · **Unit** KF.W4.a · **Dated** 2026-09-17 · **Commit** keyframes.js `5388907b`
**Substrate** `/Users/mkbabb/Programming/keyframes.js` @ `origin/master 55e9bf0d`.

The gate's falsifier: *"fails equally if `demo/env.d.ts:3-7`'s `DefineComponent<{},{},any>` survives —
a green run with the shim standing is the no-op this gate exists to prevent."*

## 1 · The branch the tree admits — chosen from the census, not at the keyboard

§Bounds' LAW A census for this row says the verb is **"Retired *or* narrowed"** and that the census is
what selects the branch. Re-measured at the tree of execution (all four figures reproduce; see
`import-graph-census.md` §B.1): **1 declaration site · 62 specifiers over 58 SFCs · 0 test-side
specifiers · `tsconfig.test.json` include = `["test/", "bench/", "demo/env.d.ts"]`**.

**DELETE is excluded by measurement**: `check`'s second leg is `tsc --noEmit -p tsconfig.test.json`,
that program includes this very file, and plain `tsc` cannot parse an SFC — so deleting the block reds
leg 2 on every test-side `demo/scenes/**` barrel that re-exports an SFC. **NARROW is the branch**, and
it leaves `tsconfig.test.json:12-15`'s prose true (the file still carries both ambient shims), so the
declared triumvirate trigger for touching that out-of-bounds file **did not fire**.

## 2 · The diff, pasted from the commit

⟨`git show 5388907b -- demo/env.d.ts`⟩ →

```diff
 /// <reference types="vite/client" />
 
+// The `*.vue` ambient shim is NARROWED, not deleted (X.KF.W4 G-KFW4-1). `check`'s
+// first leg is now `vue-tsc`, which parses every SFC and resolves it to its REAL
+// type — this block is shadowed there. It survives for the ONE program that cannot
+// parse an SFC: `check`'s second leg, `tsc --noEmit -p tsconfig.test.json`, whose
+// include list carries this file so a `demo/scenes/**` barrel that re-exports an
+// SFC (e.g. `cube/orbital-drag` → `OrbitalDrag.vue`) stays resolvable. The old
+// third argument `any` made every property of every re-exported SFC unchecked in
+// that program; `unknown` states what plain `tsc` can honestly know instead.
 declare module "*.vue" {
     import type { DefineComponent } from "vue";
-    const component: DefineComponent<{}, {}, any>;
+    const component: DefineComponent<
+        Record<string, unknown>,
+        Record<string, unknown>,
+        unknown
+    >;
     export default component;
 }
```

**The `any` is gone from the `*.vue` block — the falsifier's exact subject.** The
`*.svg?component` block at the file's foot is **NOT this row's carve** (`:3-7`) and is left byte-exact;
it is recorded here so its survival is a declared outcome rather than an oversight.

## 3 · The act's own falsifiers, re-run

| check | command | reading |
|---|---|---|
| leg 2 still green after the narrowing | ⟨`npx tsc --noEmit -p tsconfig.test.json`⟩ | **exit 0, 0 `error TS`** (double-run) |
| the shim no longer says `any` | ⟨`grep -c 'DefineComponent<{}, {}, any>' demo/env.d.ts`⟩ | **1** — the `*.svg?component` block alone, outside the carve |
| the demo still builds (the block is a type artefact; nothing emitted) | ⟨`npx vite build --mode gh-pages`⟩ | **exit 0** |
| the demo lane still passes | ⟨`npx vitest run --project demo`⟩ | **27 files / 155 tests passed** |

## 4 · What the narrowing does NOT claim

`vue-tsc` resolves every `.vue` import to its real SFC type, so in leg 1 this block is **shadowed, not
consulted** — the 63 demo diagnostics the day-one inventory banks are proof of that (they are real SFC
prop/template errors, which an `any`-shimmed program could not have produced). The narrowing's effect is
confined to leg 2's plain-`tsc` program, where it replaces an unchecked `any` surface with `unknown`.
The gate's substance — *a `.vue` file can fail a build* — is leg 1's, and it is the `vue-tsc`
substitution that delivers it.
