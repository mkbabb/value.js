SERVED MODEL: claude-opus-5[1m]

# KF.W4 — `import-graph-census.md` (LAW A's execution-time artefact)

**Wave** X.KF.W4 · **Unit** KF.W4.a · **Gate** G-KFW4-1 · **Dated** 2026-09-17
**Substrate** `/Users/mkbabb/Programming/keyframes.js`, branch `master`, `origin/master` = `55e9bf0d`
(= `81a56990` + KF.W1's one docs commit; COHESION §0j.C KF-WRITE (b)).

Scope of THIS seat's entry: **the TWELFTH act** — the `demo/**` type-surface row, whose repoint subject
set does not exist until G-1 runs, so its census is written **here, from `vue-tsc-inventory.json`, before
the first file under that row is opened for writing** (spec §Artefacts; its absence at that moment is a
triumvirate trigger). The eleven acts whose censuses are pasted in §Bounds belong to units `.b` and `.c`;
this file records only the **deltas** this seat re-measured, plus the twelfth act's own census.
Every command below was executed read-only at this seat's clock and is pasted with its output.

---

## A · The twelfth act — `demo/**` type-surface repoints, enumerated from G-1's dated inventory

`vue-tsc-inventory.json` (this seat, `npx vue-tsc --noEmit -p tsconfig.json`, exit 2, RUN1 == RUN2)
banks **64 diagnostics over 24 files — 63 in `demo/**`, 1 in `src/`** (F-1's untracked residue, routed to
the orchestrator, untouched here).

**The repoint subject set is derived, not assumed**: of the 63 demo diagnostics, exactly **ONE** names a
module specifier — the rest are annotations, guards and type declarations, which move no import edge
(*"a prose deletion moves no edge; a specifier, a binding, an allowlist entry or an ambient declaration
does"*, §Bounds LAW A scope receipt). The specifier-bearing rows, by diagnostic code:

| code | count | moves an edge? |
|---|---|---|
| `TS2307` (module not found) | **1** — `demo/components/instrument/keyframes/CSSCodeEditor.vue(54,16)` | **YES — censused below** |
| `TS2379` · `TS2339` · `TS2322` · `TS2345` · `TS2532` · `TS18048` · `TS2554` · `TS2769` · `TS2314` · `TS4104` | 62 | no — annotation / guard / declaration only |

*(The inventory's 64th row is `src/animation/group/composite-storage.ts(2,32) TS2307` — F-1's untracked
file. It is in no §Bounds row, is not opened, and is therefore not an act of this wave.)*

### A.1 · The one repoint — `monaco-editor/esm/vs/editor/editor.api` (KF-CE-11)

**(1) Specifier census — every spelling and alias root.**

⟨`git grep -nE "monaco-editor" -- demo/ src/ test/ scripts/ vite.config.ts tsconfig.json`⟩ →

```
demo/components/instrument/keyframes/CSSCodeEditor.vue:21://   • the namespace `import("monaco-editor")`, AND
demo/components/instrument/keyframes/CSSCodeEditor.vue:31:import type * as Monaco from "monaco-editor";
demo/components/instrument/keyframes/CSSCodeEditor.vue:54:        import("monaco-editor/esm/vs/editor/editor.api"),
demo/components/instrument/keyframes/CSSCodeEditor.vue:57:        import("monaco-editor/esm/vs/editor/editor.worker?worker"),
demo/components/instrument/keyframes/CSSCodeEditor.vue:58:        import("monaco-editor/esm/vs/language/css/css.worker?worker"),
```

**5 hits, ONE file.** `:21` is prose (non-import context, not counted). `:31` is a type-only namespace
import that resolves GREEN today (the `"."` export condition). `:57`/`:58` resolve GREEN through
`vite/client`'s ambient `*?worker`. **The consumer set of the failing specifier is exactly one site.**

**(2) Symbol census — each hit resolved to its own specifier.** The dynamic import at `:54` binds `m`
(destructured at `:59`), consumed at `:70`/`:71` (`m.editor.defineTheme`), `:72` (`m.languages.register`)
and `:73` (`monaco = m`, whose declared type at `:49` is `typeof Monaco` — i.e. the `:31` type import).
**The module's runtime identity and its type identity are already two different specifiers in this file,
by the file's own design** (`:29-30`: *"The TYPE side stays static (`import type`) — erased under
`verbatimModuleSyntax`, no runtime edge"*).

**(3) Why the specifier fails, measured at the package rather than guessed.**

⟨`node -e 'const p=require("./node_modules/monaco-editor/package.json"); …'`⟩ →
`version 0.55.1` · `types undefined` ·
`exports {".":{"types":"./esm/vs/editor/editor.main.d.ts","import":"./esm/vs/editor/editor.main.js","require":"./min/vs/editor/editor.main.js"},"./*":"./*"}`

⟨`ls node_modules/monaco-editor/esm/vs/editor/editor.api.d.ts`⟩ → **present**
⟨`ls node_modules/monaco-editor/esm/vs/editor/editor.api.js`⟩ → **present**

The subpath pattern `"./*": "./*"` maps the specifier to the target **`./esm/vs/editor/editor.api`
literally** — a path with no extension, which is not a file. Under `moduleResolution: "bundler"`
(`tsconfig.json:5`) TypeScript resolves an exports-map target exactly and does not substitute an
extension for it, so the module is unresolvable **to the type-checker only**; Vite/Rolldown resolves it
at build because its own resolver appends the extension. **The defect is the specifier, not the package
and not the checker.**

**(4) The cure, and its edge.** The specifier is written the way the package's own exports map can
resolve it — `monaco-editor/esm/vs/editor/editor.api` → **`monaco-editor/esm/vs/editor/editor.api.js`**.
`"./*": "./*"` then yields `./esm/vs/editor/editor.api.js`, which exists, and whose sibling
`editor.api.d.ts` supplies the types.

**CONSUMER-SET DELTA = ∅ — the repoint moves NO edge.** Both spellings name **the same file on disk**
(`node_modules/monaco-editor/esm/vs/editor/editor.api.js`); the import stays dynamic, stays inside the
same `Promise.all` boot, and lands in the same `vendor-monaco` chunk. No module is added to or removed
from the graph, no chunk boundary moves, and no runtime expression's value changes — which is what makes
this an R-10 **import specifier** act and not a behavioural one. The alternatives were measured and
rejected by name: repointing to the bare `"monaco-editor"` root would resolve `"."` →
`editor.main.js`, a **different module** that registers every language (a runtime and bundle change, out
of R-10's reach); a `@ts-expect-error` would be a suppression, which standing law classes as a masking
defect.

### A.2 · Non-members, named so the enumeration is falsifiable

The other 62 demo rows change annotations (`TS2379`, `TS2322`, `TS2345`, `TS4104`), add guards
(`TS2532`, `TS18048`), or add/extend a type declaration (`TS2339` on `SceneExposedApi`,
`StoredAnimationGroupControlOptions`, `KeyframeSelector`; `TS2314` on `CSSKeyframesAnimation`). **None
adds, removes or repoints an import specifier**, and each is cured in the file the diagnostic names or in
the type-declaration module that file already imports. A row that could not be cured type-only would be a
triumvirate trigger (R-10), not a licence to widen this census.

---

## B · Deltas against the §Bounds censuses this seat re-measured

**B.1 · `demo/env.d.ts` — the SHIM act (§Bounds row `demo/env.d.ts`).** Re-run at the tree of execution:

| census | §Bounds figure | this seat | delta |
|---|---|---|---|
| ⟨`git grep -n 'declare module "\*.vue"' origin/master -- .`⟩ | 1 declaration + 1 prose | `demo/env.d.ts:3` (declaration) · `tsconfig.test.json:12` (prose) | **none** |
| ⟨`git grep -nE 'from "[^"]*\.vue"' origin/master -- demo/ \| wc -l`⟩ | 62 | **62** | **none** |
| ⟨`git grep -nE 'from "[^"]*\.vue"' origin/master -- test/ \| wc -l`⟩ | 0 | **0** | **none** |
| ⟨`git ls-tree -r --name-only origin/master \| grep -c '\.vue$'`⟩ | 58 | **58** | **none** |
| ⟨`git show origin/master:tsconfig.test.json`⟩ include | `["test/", "bench/", "demo/env.d.ts"]` | `"include": ["test/", "bench/", "demo/env.d.ts"]` (`:17`) | **none** |

**The census's own consequence is what selects the branch**: `check`'s second leg
(`tsc --noEmit -p tsconfig.test.json`) includes `demo/env.d.ts` and plain `tsc` cannot parse an SFC, so
the block is **NARROWED, never deleted** — the branch the tree admits, chosen before the field opened.
`tsconfig.test.json` is not in §Bounds and is **not touched**; the narrowing leaves its `:12-15` prose
true (the file still *"carries the ambient `declare module "*.vue"` / `"*.svg?component"` shims"*), so no
triumvirate trigger fires.

**B.2 · No other §Bounds census is this unit's.** The `−monaco-themes` delete (`.b`), the
`.dependency-cruiser.cjs` allowlist repoint (`.b`), `leaves-parity.test.ts` (`.c`), `_boundTimeline`
(`.c`), `load-engine.ts:65` (`.c`), `easing-serialize.ts:71-73` (`.c`), `constants/types.ts` (`.e`),
`font-roles.json` (`.d`) and the K3 demo sites (`.c`) are enumerated here **only to declare that this
seat wrote no byte of any of them**.
