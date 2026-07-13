# V · pass-1 · PROTOTYPE — Family 2 · GRAPH-PROJECTION

**Pass 1 · PROTOTYPE · 2026-07-13 · prototyper: pass-1 F2 prototyper (opus, model declared).**
Ran in an isolated worktree (`wf_cb377abc-406-11`, `npm ci` fresh) against `tranche-u`. Discharges
the four demonstrations `spec-f2.md §6` demanded. **Every number below RAN**; nothing is estimated.
Mutations happened only in the worktree and are NEVER merged — the deliverable is this evidence.

> **Assignment-recovery note.** The orchestration spawned this prototyper with `${x.id}`/`${x.family}`/
> `${x.brief}` **un-interpolated** (literal placeholders) — the same defect both F2 researchers recorded.
> This batch is one lane-triple (worktrees `-10/-11/-12`); I am the middle lane. With no recoverable
> routing I committed to **Family 2** — the only family whose §6 brief is a fully-RUNNABLE carve+measure
> (the deliverable's whole premise), so a possibly-misrouted lane still yields the substrate every family
> consumes. File named descriptively to survive any sibling filename collision.

---

## §0 Headline (what the run changed vs the spec)

The prototype **confirms F2 as a diagnostic substrate** and **refutes the spec's confident carve** on two
independent, measured counts:

1. **The scanner the spec calls "the authoritative source of truth" has a comment-false-positive bug.**
   Its regex counts ``import { RGBColor } from "."`` *examples inside JSDoc/line comments* (present in
   `base.ts`, `spaces.ts`, `index.ts`) as real edges. Fixing it (strip comments before matching) shrinks
   the color runtime SCC from the research's **16 → the true 14** (`base`, `spaces` were phantom members).
2. **The color-SCC carve COMPILES GREEN BUT FAILS AT RUNTIME.** The spec's §6.2 evidence bar ("`npm run
   typecheck` exit 0 + Tarjan → the 16-node SCC is GONE") is **insufficient**: the carve passes `tsc`
   (EXIT=0) yet breaks **2 runtime tests** (`color2` RGB↔LAB, RGB↔XYZ) via a module-init-order regression —
   the barrel cycle was *load-bearing* for the `XYZ_FUNCTIONS` registry's eval order. And the SCC is **not
   "GONE"**: barrel-purity evicts the barrel but leaves a **residual 5-node `gamutMap` SCC** the spec missed.

Net: F2's placement decree is a strong INPUT that **must be gated by a runtime probe** (spec §7/§8, now
concrete). The mechanical import-redirect is *unsafe as a standalone move* here.

---

## §1 · Reproducible substrate (spec §6.1 — DONE)

Deterministic scanner `scan.mjs` (worktree root; ~110 lines, no deps, no network), extended from the p1
kernel with Tarjan SCC (runtime **and** all-edge), fan-in over runtime edges, union-entry reachability,
**and comment-stripping** (the §0.1 fix). Run: `node scan.mjs src --entries="…"`.

**src baseline (comment-corrected):**
```
files 72 · edges all/runtime/type = 302/284/103
runtime SCC: 2 comps / 18 nodes
  SCC#1 (14): contrast · dispatch · index · mix · normalize + 9 conversions
              (cylindrical direct hex ictcp jzazbz kelvin lab oklab xyz-extended)
  SCC#2 (4):  parsing/color/{color,index,relative-color} + parsing/units
top runtime fan-in: units/color/index.ts 21 · math.ts 18 · units/color/constants.ts 17 ·
                    units/index.ts 16 · parsing/utils.ts 11 · units/color/matrix.ts 11
```
- The 4-node **parsing SCC** and the top fan-in reproduce `p1`/`f2` exactly.
- The **color SCC is 14, not 16.** Diff vs research: `base.ts`+`spaces.ts` dropped out. They were pulled
  in only by the scanner matching ``… from "."`` inside their own doc-comments (base.ts:13, spaces.ts:7,
  index.ts:9). They are correct DAG **leaves** (spaces→base→{utils,constants}; neither imports the barrel).
  **This corrects the shared substrate: any F2 gate wired to the uncorrected scanner over-reports the SCC
  by 2 and mis-blames the two leaf modules.**

**demo corroboration** (`madge@8.0.0 --extensions ts,vue --ts-config tsconfig.demo.json --exclude
'(node_modules|\.claude/worktrees|dist/)' --circular demo/`): **16 cycle-paths**, matching the research —
dominant pattern = barrel-membership (`Dock.vue↔dock/index.ts`, `markdown/index.ts↔Markdown.vue`) +
global-bucket back-edges (`usePaletteManager→useAdminUsers→palette-browser/admin`) + the gradient knot.
(The relative-only `scan.mjs` is src-authoritative; demo needs madge's alias resolver, already established.)

Substrate JSON emitted to `/tmp/f2-src-substrate.json` (regenerable from `scan.mjs`).

---

## §2 · The color-SCC carve (spec §6.2) — RAN in three measured stages

Carve codemod `carve.mjs` (worktree root, reproducible): redirects barrel imports to concrete siblings —
space classes → `spaces.ts`, `Color/ch/setChannel/channelOf` → `base.ts` (this IS glass-ui STRUCTURE-SPEC
§2.1). `git checkout src/` between stages. Runtime SCC re-measured with the corrected scanner each time.

| stage | what redirects | files / sites | color SCC | `tsc -p tsconfig.lib.json` | full `vitest run` |
|---|---|---|---|---|---|
| baseline | — | — | **14 nodes** | EXIT 0 | 74 files / 2241 pass |
| **A** | conversions `from ".."` only (**the spec's exact prescription**) | 9 / 16 | **9 nodes** (−5) | **EXIT 0** | **2 FAIL** / 2239 pass |
| **B** | conversions + `dispatch` + `contrast` + `mix` + `normalize` `from "."` | 13 / 27 | **5 nodes** (−9) | **EXIT 0** | **2 FAIL** / 2239 pass |

Three findings, each measured:

**(a) The spec's "11 edges" is INCOMPLETE.** The color barrel is imported as a *value* not only by the 9
conversions but also by **`dispatch`, `contrast`, `mix`, `normalize`** (`from "."`). Stage A (conversions
only) drops the SCC 14→9 — it detaches `hex/ictcp/jzazbz/lab/oklab` but leaves `index` and the four core
modules cycling. Only Stage B (the full 13-file barrel-purity set) **evicts `index.ts` + `contrast` + `mix`
+ `normalize` from the cycle** (the real §2.1 win, 14→5).

**(b) The SCC is NOT "GONE" — a residual 5-node `gamutMap` SCC survives.** Stage B leaves
`{dispatch, direct, xyz-extended, cylindrical, kelvin}` strongly connected, glued **not by the barrel** but
by `gamutMap`: `dispatch` imports the conversion functions (`dispatch.ts:32–66`) while `conversions/direct.ts:31`
and `conversions/xyz-extended.ts:42` import `gamutMap` back from `../dispatch`. This is a **semantic** cycle
(gamut-mapping intrinsically converts colors; conversion intrinsically gamut-maps), not a lazy barrel import.
Barrel-purity cannot touch it — it needs DI/late-binding (exactly what `dispatch` already does for `color2`
via `registerColorConverters`). **This refutes spec §6.2's "the 16-node SCC is GONE."** (Handed to F6/pass-2.)

**(c) COMPILES GREEN, FAILS AT RUNTIME — the load-bearing refutation.** Both Stage A and Stage B pass
`tsc` (EXIT 0) but break the **same 2 tests** in `test/units/color/conversions/color-conversions.test.ts`:
```
× color2 > should convert RGB to LAB and back
× color2 > should convert RGB to XYZ and back
   Error: Unknown target color space: "rgb"   (dispatch.ts:207, getXyzFromFn → XYZ_FUNCTIONS["rgb"] undefined)
```
Root cause: the `XYZ_FUNCTIONS`/`DIRECT_PATHS` registry (`dispatch.ts:111`) resolves conversion-function
bindings at module-eval time; the **barrel cycle was silently enforcing an eval order** under which those
bindings were initialized before the registry read them. Redirecting the leaves off the barrel changes the
eval order → a binding is in TDZ/undefined when the registry is built → the `"rgb"` path is missing.
**The spec's evidence bar (`typecheck exit 0 + Tarjan`) would have PASSED this broken carve.** This is
Family 2's own §7 weakness ("graph-blindness to CONCEPTUAL/runtime semantics") made concrete and
reproducible: the import DAG cannot see that the cycle carries an initialization contract.

**Disposition:** the color-SCC carve is real and desirable (barrel purity + −9 SCC nodes), but it is **NOT a
mechanical import-redirect** — it must be co-landed with an order-independent registry (lazy registration or
an explicit eval-order entrypoint) and gated by the `color2` runtime suite, never by typecheck alone. This is
the "architectural transposition, not a workaround" the owner's edict names — and precisely why F2 **composes
under a shape-family, it does not replace one** (spec §8, now empirically load-bearing).

---

## §3 · Dead-code (spec §6.3 + §6.4) — RAN, CONFIRMED (one count corrected)

**§6.3 — delete `parsing/timeline/index.ts`:** `git rm` it → `tsc -p tsconfig.lib.json` **EXIT 0** →
`vitest run` **74 files / 2241 tests pass**. Genuinely dead (0 importers anywhere; product+tests import the
leaves `timeline/{easing,scroll-timeline}` directly). **CONFIRMED.**

**§6.4 — the union-entry correction (the family's severest failure mode):**
```
product-only reachability (8 public entries, all-edges): 70/72 reachable
DEAD under product-only: [ parsing/timeline/index.ts , units/color/conversions/index.ts ]
```
- `parsing/timeline/index.ts` — **0 barrel importers** across test/e2e/demo/subpaths (the grep hits are
  `"scroll-timeline"` *strings* in assertions, not imports) → dead in `{product ∪ test}` too → **delete**.
- `units/color/conversions/index.ts` — **7 test consumers** (`color-conversions`, `color-roundtrip`,
  `color-hdr-spaces`, `color-jzazbz`, `srgb-transfer-darkband`, `gamut-boundary`, `docs-source-snippets`)
  → the union **SPARES it**. **Method CONFIRMED; count corrected: 7 test files, not the research's 3.**

A product-only sweep would delete a live test surface. The reliable dead-code verdict = reachability from
`{product ∪ test ∪ e2e ∪ build}`, exactly as the spec demands.

---

## §4 · Honest frictions (what did NOT go clean)

- **The scanner I inherited was wrong.** I had to fix it (comment-strip) before any SCC number was
  trustworthy — the substrate every family was told to consume shipped a +2 SCC inflation. Lesson: a
  "~90-line deterministic scanner" is not automatically authoritative; it needs its own test.
- **`tsc` green is a false comfort for cycle-carves.** The single most important thing the run proved is
  that the spec's stated evidence bar could not have caught the regression it introduces.
- **Scope honesty:** I did NOT attempt to make the registry order-independent (that is a real refactor with
  behavior risk, pass-2/F6 territory) — I MEASURED that the carve needs it. The `gamutMap` residual is
  reported, not fixed.
- **demo SCC** was corroborated via madge (16 cycles), not the relative-only scanner — the scanner is
  src-authoritative by construction; demo's `@`-alias graph needs the resolver the research already wired.

## §5 · Reproduction

```
# in an isolated worktree, npm ci, then from repo root:
node scan.mjs src --entries="src/index.ts,src/subpaths/color.ts,…,src/subpaths/units.ts"   # substrate
node carve.mjs A   # spec's conversions-only carve      → node scan.mjs src  → 9-node SCC
git checkout src/ && node carve.mjs B   # full barrel-purity → 5-node SCC (index evicted)
npx tsc --noEmit -p tsconfig.lib.json   # EXIT 0 at every stage
npx vitest run test/units/color/conversions/color-conversions.test.ts   # 2 FAIL under A and B
git checkout src/ && git rm src/parsing/timeline/index.ts && npx vitest run   # 2241 pass — dead confirmed
```
`scan.mjs` + `carve.mjs` live in the worktree (evidence artifacts, never merged).

## §6 · Verdict for Family 2 (updated by the run)

F2 delivered exactly the reproducible carve/dead/cycle/fan-in numbers no other family can — **and then its
own prototype proved its placement decree unsafe to apply blind.** The color-SCC carve is correct in
direction (glass-ui §2.1, −9 SCC nodes, barrel evicted) but (i) needs 4 more files than the spec named,
(ii) leaves a semantic `gamutMap` residual, and (iii) **regresses runtime behavior that typecheck cannot
see**. F2 is confirmed as the measurement substrate for a shape-family (F1/F3) under a mandatory runtime
gate — never the sole authority. The dead-`timeline`-barrel delete + the 7-consumer `conversions/index.ts`
spare are clean, cross-validated D4 wins usable by any family.
