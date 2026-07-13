# V · pass-1 research — Family 2: GRAPH-PROJECTION

**Researcher id**: `p1-graph-projection` · **family**: 2 (GRAPH-PROJECTION) · **pass**: 1 · **date**: 2026-07-13
**Charter**: falsify/establish the four pass-1 gaps in `DESIGN-CAMPAIGN.md §3` row 2 —
(a) madge/dep-cruiser reliability across the `@`-alias+subpath graph; (b) the true dead-code census;
(c) the cycle inventory (src+demo); (d) fan-in ranking for god-module carve lines. Plus the charter's
named risk: does graph-count contradict the T3 "≥2 UNRELATED families" earned-promotion rule.

> **PROVENANCE NOTE (must read).** The orchestrator spawned this agent with UNSUBSTITUTED template
> variables (`${x.id}`, `${x.family}`, `${x.focus}` arrived literal). No pass-1 assignment, no
> `pass-1/` dir, no sibling research files existed on disk. I self-selected **Family 2** because its
> four gaps are the ones answerable RIGHT NOW with hard tool-measured numbers (the deliverable's whole
> premise), and because the import DAG is the substrate every other family also queries (leak census →
> F3, born-RED cycle gates → F5, blast radius → F6). Filename is descriptive (not the literal
> `${x.id}.md`) to avoid colliding with any sibling that made a different choice. Everything below RAN;
> no numbers are estimated.

---

## 0 · Tooling + exact reproduction (all from repo root, `tranche-u`)

Neither `madge` nor `dependency-cruiser` is installed (`node_modules/.bin`: NONE). Both fetch via `npx`.
node v26.0.0 / npm 11.12.1.

```
# src (pure TS) — cycles / orphans / graph
npx --yes madge@8.0.0 --extensions ts --ts-config tsconfig.lib.json --circular src/
npx --yes madge@8.0.0 --extensions ts --ts-config tsconfig.lib.json --orphans  src/
npx --yes madge@8.0.0 --extensions ts --ts-config tsconfig.lib.json --json     src/

# demo (.vue + @-aliases) — MUST exclude the file: sibling worktree or counts inflate
EXC='(node_modules|\.claude/worktrees|dist/)'
npx --yes madge@8.0.0 --extensions ts,vue --ts-config tsconfig.demo.json --exclude "$EXC" --circular demo/
```

The load-bearing runtime-vs-type-only split is NOT obtainable from either tool out of the box (see §1);
it comes from a deterministic ~90-line scanner. Its essential kernel (reproduces every §2 number):

```js
// scan.mjs — run: node scan.mjs src   (no deps, no network)
import {readFileSync,readdirSync,statSync,existsSync} from "node:fs";
import {join,dirname,resolve,relative} from "node:path";
const files=[]; (function w(d){for(const e of readdirSync(d)){const p=join(d,e);const s=statSync(p);
  s.isDirectory()?w(p):(/\.ts$/.test(e)&&!/\.d\.ts$/.test(e)&&files.push(p));}})(process.argv[2]||"src");
const RE=/(?:import|export)\s+([\s\S]*?)\s+from\s+["']([^"']+)["']/g;
const res=(f,s)=>{if(!s.startsWith("."))return null;const b=resolve(dirname(f),s);
  for(const c of [b+".ts",join(b,"index.ts"),b])if(existsSync(c)&&statSync(c).isFile())return relative(".",c);return null;};
const typeOnly=cl=>{cl=cl.trim();if(cl.startsWith("type "))return true;const br=cl.match(/\{([\s\S]*)\}/);
  if(br){if(cl.slice(0,cl.indexOf("{")).replace(/,$/,"").trim())return false;
  const ps=br[1].split(",").map(x=>x.trim()).filter(Boolean);return ps.length>0&&ps.every(p=>/^type\s/.test(p));}return false;};
const A={},R={}; for(const f of files){A[f]=new Set();R[f]=new Set();}
for(const f of files){const src=readFileSync(f,"utf8");let m;RE.lastIndex=0;
  while((m=RE.exec(src))){const r=res(f,m[2]);if(!r||!(r in A))continue;A[f].add(r);if(!typeOnly(m[1]))R[f].add(r);}}
// Tarjan SCC over R (runtime) and A (all) → the §2 numbers; fan-in = count of incoming R-edges.
```

---

## 1 · Gap (a) — tool reliability: NEITHER tool answers the load-bearing question out of the box

| tool | resolves `@`-alias + `.vue` + subpaths? | speed | the disqualifying gaps |
|---|---|---|---|
| **madge 8.0.0** | YES via `--ts-config` (demo `@components/*`… resolved; physical `demo/@/` renders as `@/`) | src 451ms / demo 1.2s | 4 over-report classes ↓ |
| **dependency-cruiser 18.1.0** | only with a full config file | slower | CLI-flag mode is BROKEN for TS (↓) |

**madge's four over-report classes (each measured):**
1. **`--orphans` flags package ENTRY POINTS as dead.** src orphans = 11, but 8 of them are roots:
   `index.ts` + the 7 `subpaths/*.ts` (the package.json `exports` surface). Naive orphan→delete would
   nuke the public API. (`units/color/conversions/index.ts`, `parsing/timeline/index.ts` are the only
   real candidates — see §3.)
2. **No `import type` distinction → cycle count inflated.** madge counts type edges (erased at build)
   as real. src: 17 of 309 edges are type-only; dropping them shrinks the cyclic node set from **30 → 20**.
3. **Reports cyclic PATHS, not SCCs.** madge says "**23 circular dependencies**" in src — those 23 are
   distinct *paths* inside just **2** strongly-connected components. It over-states the problem **~11.5×**.
4. **Follows `file:` deps into sibling worktrees.** Unfiltered demo = **29** cycles; excluding
   `.claude/worktrees/glass-ui-pinned/` → **16**. The `--exclude` is mandatory, not optional.

**dependency-cruiser is worse for this repo despite being "type-aware":** in CLI-flag mode
(`--no-config --ts-config …`) every extensionless relative import reports `couldNotResolve: true` and
`dependencyTypes: ["unknown"]` — so its one advantage (type-only detection) is UNAVAILABLE. A bare-dir
arg cruises **0** modules; a `src/**/*.ts` glob over-follows into node_modules (**306** "modules" vs the
real **72**). It needs a committed `.dependency-cruiser.cjs` (tsConfig + enhancedResolveOptions) to be
trustworthy — a setup cost, not a one-liner.

**VERDICT (gap a):** madge = the fast TRIAGE layer (cycles/fan-in), but its raw numbers must be
deflated by classes 1–4. dependency-cruiser = only worth it WITH a config investment. The authoritative
runtime-cycle + dead-code answer for value.js comes from the ~90-line deterministic scanner (§0), which
should be the source of truth if this family is adopted. **This directly warns Family 5 (STRANGLER):
a `proof:barrel-cycle` gate wired to raw madge would fire 23 RED for 2 real tangles and would block on
build-erased type cycles — it must run on runtime edges only.**

---

## 2 · Gap (c) — the cycle inventory (the load-bearing finding)

### src/ — 2 runtime SCCs, not 23 (scanner-authoritative)

```
files 72 · edges: all 309 / runtime 292 / type-only 17
SCC(size>1) all-edges: 2 comps / 30 nodes
SCC(size>1) RUNTIME:   2 comps / 20 nodes
```

- **SCC #1 — the 16-node COLOR tangle** (runtime): `base · contrast · dispatch · index · mix ·
  normalize · spaces` + 8 conversions (`cylindrical · direct · hex · ictcp · jzazbz · kelvin · lab ·
  oklab · xyz-extended`). **Tranche-K's "acyclic color topology" goal is NOT met at runtime.**
- **SCC #2 — the 4-node PARSING tangle**: `parsing/color/{color, index, relative-color}.ts` +
  `parsing/units.ts`.

**The concrete carve line (graph-derived, not decreed).** The color SCC is glued by **11 `from ".."`
imports inside `conversions/*.ts`** (`..` = the aggregating `units/color/index.ts` barrel) + `2 from
"../dispatch"`. The imported symbols are pure space CLASSES — e.g. `cylindrical.ts` pulls
`{HSLColor,HSVColor,HWBColor,RGBColor,XYZColor} from ".."`, `oklab.ts` pulls
`{ch,LABColor,OKLABColor,OKLCHColor,XYZColor} from ".."`. Those classes are DEFINED in `spaces.ts` /
`base.ts`; conversions reach the barrel out of laziness, and the barrel re-exports `contrast → normalize
→ dispatch → conversions`, closing the loop. **Carve = redirect the 11 `from ".."` → `from "../spaces"`
(+ `../base`), and move the `ch<T>` helper off `index.ts` to a kind-named sibling (`channel.ts`).** That
single edge-redirect breaks the 16-node SCC — and it IS glass-ui's own PURE-RE-EXPORT-ONLY barrel +
own-runtime-sibling law (`STRUCTURE-SPEC §2.1`). So on src, GRAPH-PROJECTION and CONSTELLATION-CONFORM
converge on the identical fix, reached by two different derivations.

### demo/ — 16 cycle-paths ≈ 5 SCCs, one dominant PATTERN

The 16 filtered paths collapse to ~5 tangles: color-picker barrel/keys/pipeline (paths 1–8),
palette-manager↔admin (9–12), gradient composables (15–16), + two pure **barrel-membership** cycles:
`Dock.vue ↔ dock/index.ts` (13) and `markdown/index.ts ↔ Markdown.vue` (14). **The dominant root cause
is barrel-membership** (a component imports its own feature `index.ts`, which re-exports it) **+
global-bucket back-edges** (`composables/color/keys.ts`, `usePaletteManager`, `useAdminUsers` reaching
DOWN into feature components). Both are exactly what the graph-projection colocation move dissolves:
colocate the back-referencing global INTO its feature, and forbid component→own-barrel self-imports.

---

## 3 · Gap (b) — the true dead-code census

**src/: 70/72 files reachable from package entries** (`index.ts` + `subpaths/*`). The 2 unreachable:

| file | verdict | evidence |
|---|---|---|
| `parsing/timeline/index.ts` | **TRULY DEAD** — delete | 0 consumers anywhere (src imports `parsing/timeline/{easing,scroll-timeline}` DIRECTLY, never the barrel; grep across src/test/e2e/demo/subpaths = 0 barrel refs; the CLAUDE.md structure doc lists it as an "index barrel" but nothing consumes it) |
| `units/color/conversions/index.ts` | **NOT dead — test-only-alive** | 0 src consumers BUT 3 test files import it (`test/units/color/…` via `@src/units/color/conversions`). Graph-blind deletion would break tests. |

The second row IS the family's severest-failure-mode in the wild: **a src-only import graph is blind to
the test graph.** Any GRAPH-PROJECTION dead-code sweep must union src+test+e2e reachability, or it deletes
live test-support surfaces.

**demo/: 267 nodes, 8 zero-consumer** — these are entry roots (`main.ts`, `App.vue`, router, test specs),
NOT dead code. Zero-consumer in demo requires root-filtering before any deletion; raw count is a
false-positive class (same as src orphans).

---

## 4 · Gap (d) — fan-in ranking (the god-module carve + kernel-vs-colocate lines)

**src top runtime fan-in** (carve/kernel hubs): `units/color/constants.ts` **22** · `units/color/index.ts`
**21** · `math.ts` **18** · `units/index.ts` **17** · `parsing/utils.ts` / `units/color/matrix.ts` **11** ·
`units/color/dispatch.ts` / `utils.ts` **10**. The color-system hubs (`index` 21, `dispatch` 10,
`constants` 22, `matrix` 11) confirm §2's SCC center — the carve target is the same node cluster.

**demo top fan-in** (kernel candidates by measurement): `lib/palette/types.ts` **42** · `keys.ts` **26** ·
`ui/button/index.ts` **22** (vendored, fenced) · `usePaletteManager.ts` **22** · `color-picker/index.ts`
**21** · `lib/palette/api/index.ts` **15** · `useContrastSafeColor.ts` **11**. This **corroborates
portfolio A1's hand-picked kernel** (`keys`, `useContrastSafeColor`, `usePaletteManager`) with a measured
ranking — AND surfaces a hub A1 missed: **`lib/palette/types.ts` is the #1 demo hub at 42 consumers**, a
cross-cutting type module that belongs in a kernel/types home (a point where GRAPH-PROJECTION and
Family 4 TYPE-ONTOLOGY agree).

---

## 5 · The charter's named risk — does graph-count contradict the T3 "≥2 UNRELATED families" rule? YES.

**The single-consumer heuristic ("1 consumer → colocate INTO it") has a measured false-positive class.**
src: 11 single-consumer files, but **2 (`units/interpolate.ts`, `units/normalize.ts`) have `index.ts`
(the package barrel) as their SOLE consumer** — they are PUBLIC API LEAVES, not colocation candidates.
demo: **161 of 267 nodes are single-consumer**, but a large fraction have their own FEATURE BARREL as the
sole consumer (the barrel-membership relation from §2) — again not a "fold into consumer" signal.

So the pure graph CANNOT run the placement rule blind: it counts EDGES, not concept-relatedness, and it
cannot tell "colocate into consumer" from "this is an export leaf" or "this is a barrel member." **The
graph must be pre-filtered to exclude (i) package entry points and (ii) barrel index.ts nodes before
single-consumer detection is trustworthy.** This confirms the portfolio's stated failure mode
(graph-blindness to conceptual cohesion) with numbers, and confirms the charter's suspicion: raw graph
count DOES contradict T3 — T3 asks "≥2 UNRELATED families," a semantic judgment the DAG cannot supply.

---

## 6 · Family verdict + hand-offs

- **GRAPH-PROJECTION is a strong DIAGNOSTIC substrate, a weak sole AUTHORITY.** It produces the exact,
  reproducible carve/dead/cycle numbers no other family can (§2–§4), but its placement decree needs a
  human/semantic filter (§5) — i.e. it COMPOSES under a shape-family (F1/F3), it does not replace one.
- **What it hands the other passes**: the 2-SCC runtime cycle inventory + the concrete color-SCC carve
  (redirect 11 `from ".."` + move `ch`) → feeds F1's `STRUCTURE-SPEC §2.1` alignment and any F6 codemod;
  the dead-barrel list (`parsing/timeline/index.ts` delete; `conversions/index.ts` keep-as-test-surface)
  → D4 hygiene; the measured fan-in kernel (`types.ts` 42, `keys` 26, `usePaletteManager` 22,
  `useContrastSafeColor` 11) → F3's kernel-size question.
- **What it warns**: a `proof:barrel-cycle` gate (F5) MUST run on runtime edges only (else 23 RED for
  2 tangles); dead-code sweeps MUST union src+test reachability (else delete `conversions/index.ts`);
  single-consumer colocation MUST exclude entry+barrel nodes (else mis-colocate public leaves).

**Open for pass-2** (measured, not yet done here): (i) demo SCC decomposition to exact component sets
(I have the 16 paths, not the Tarjan SCC grouping for `.vue`); (ii) whether the color-SCC carve actually
compiles green (needs the isolated-worktree prototype — SPEC-ONLY here); (iii) src+test+e2e UNIONED
reachability for a defensible full dead-code census.
