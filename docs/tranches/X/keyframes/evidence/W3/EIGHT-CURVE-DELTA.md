SERVED MODEL: claude-opus-5-5

# KF.W3 · G-KF3-6 — the 8-curve delta at the repin, measured kf-side (2026-11-02, unit `.c3`)

Subject: O-11 §D2 (value → keyframes, 2026-07-27, `value-inbox-2026-07-27-library-band-r1-widened-k1-k4.md:191-215`; re-delivered exec-visible by O-21; restated at the 4.1 cut notice O-34 `keyframes-inbox-2026-09-18-value-4.1-cut-notice.md:146-180`). Coordinates: `@mkbabb/value.js@4.0.0` (packed sha1 `ccb962e592fb42e6602fc2bb6afbfb1763788b9d`) vs `@mkbabb/value.js@4.1.0` (packed sha1 `d488535c9bfc747e318895417c28a753a3b7b3d6` = OP-1's registry sha; `cmp` of its `dist/subpaths/easing.js` against kf's installed copy → identical). kf `HEAD` `bc37f98f` (pin `package.json:71` `"4.1.0"`).

## §1 Method (re-runnable)

⟨`npm pack @mkbabb/value.js@4.0.0 @mkbabb/value.js@4.1.0`⟩ into a scratch dir, untar each, then `node delta.mjs <v400> <v410>` (the script, verbatim; columns: name · max|Δ| · argmax t · f(0.5) at 4.0.0 · f(0.5) at 4.1.0):

```js
const [a, b] = process.argv.slice(2);
const A = await import(a + "/package/dist/subpaths/easing.js");
const B = await import(b + "/package/dist/subpaths/easing.js");
const ka = Object.keys(A.bezierPresets).sort(), kb = Object.keys(B.bezierPresets).sort();
console.log("bezierPresets keys 4.0.0", ka.length, "4.1.0", kb.length, "identical", JSON.stringify(ka) === JSON.stringify(kb));
console.log("added", kb.filter(k => !ka.includes(k)).join(",") || "-", "removed", ka.filter(k => !kb.includes(k)).join(",") || "-");
const N = 1001;
const rows = [];
for (const n of ka) {
  const ea = A.easing(n), eb = B.easing(n);
  if (!ea.ok || !eb.ok) { rows.push([n, "NOT-OK", ea.ok, eb.ok]); continue; }
  let m = 0, at = 0;
  for (let i = 0; i < N; i++) { const t = i / (N - 1); const d = Math.abs(ea.value(t) - eb.value(t)); if (d > m) { m = d; at = t; } }
  rows.push([n, m, at, ea.value(0.5), eb.value(0.5)]);
}
rows.sort((x, y) => (typeof y[1] === "number" ? y[1] : 9) - (typeof x[1] === "number" ? x[1] : 9));
for (const r of rows) console.log(r[0], typeof r[1] === "number" ? r[1].toExponential(3) : r[1], typeof r[2] === "number" ? r[2].toFixed(3) : r[2], typeof r[3] === "number" ? r[3].toFixed(6) : r[3], typeof r[4] === "number" ? r[4].toFixed(6) : r[4]);
console.log("changed(>1e-9)", rows.filter(r => typeof r[1] === "number" && r[1] > 1e-9).length);
```

Run ×2, outputs `cmp`-identical.

## §2 The `bezierPresets` key set (the fence's input)

→ `bezierPresets keys 4.0.0 30 4.1.0 30 identical true` · `added - removed -`. **Key set byte-identical across the bump** (30 keys, sorted lists `JSON.stringify`-equal) — so neither fence leg fires: no removal (no boot `throw`), no addition (no silent widening of kf's public registry).

## §3 The eight curves, `max|Δ|` over 1001 samples, 4.0.0 vs 4.1.0

| name | max\|Δ\| (measured) | argmax t | f(0.5) @ 4.0.0 | f(0.5) @ 4.1.0 | O-11 §D2 declared |
|---|---|---|---|---|---|
| `ease-out-circ` | **1.923e-1** | 0.173 | 0.958586 | 0.866025 | 1.923e-1 |
| `ease-in-expo` | 6.930e-2 | 0.825 | 0.037197 | 0.031250 | 6.930e-2 |
| `ease-in-circ` | 4.489e-2 | 0.842 | 0.118665 | 0.133975 | 4.489e-2 |
| `ease-in-quad` | 4.157e-2 | 0.831 | 0.255993 | 0.250000 | 4.157e-2 |
| `ease-in-cubic` | 3.162e-2 | 0.855 | 0.145268 | 0.125000 | 3.162e-2 |
| `ease-out-sine` | 3.082e-2 | 0.572 | 0.735739 | 0.707107 | 3.082e-2 |
| `ease-in-sine` | 3.038e-2 | 0.843 | 0.291220 | 0.292893 | 3.038e-2 |
| `ease-out-quad` | 2.520e-2 | 0.397 | 0.771323 | 0.750000 | 2.520e-2 |

`changed(>1e-9)` → **8**; the other **22** keys print `0.000e+0` (unchanged to the bit at every sample). **All 8 agree with O-11 §D2's declared figures to the printed 4 significant digits**, and the 4.0.0 `f(0.5)` column equals the cut notice's (O-34 §D2) table exactly. The 4.1.0 `f(0.5)` values are the analytic closed forms (e.g. `ease-out-circ` `√(1-(t-1)²)` → `0.866025`; `ease-in-quad` `t²` → `0.25`; `ease-in-cubic` → `0.125`; `ease-out-sine` `sin(πt/2)` → `0.707107`), i.e. the RD-5 restoration landed as declared. **The 8 ∩ `bezierPresets` = 8 of 8** (⟨`node fence.mjs <kf node_modules/@mkbabb/value.js>`⟩ ×2 → `eight∩bezierPresets 8`), so every changed curve is an entry of kf's `timingFunctionEntries`.

## §4 The boot fence survives at 4.1.0

Fence = `src/animation/compile/easing/registry.ts` `:27-31` `registryNames` (`...Object.keys(bezierPresets)` `:28` + `"ease-in-bounce"` + the 9 `DIRECT_NAMES` `:15-25`) consumed at module top level by `timingFunctionEntries` `:54-65`, whose `:60-62` throws `value.js rejected its own easing …` on any `!ok`. (Spec anchors `:31` / `:37-48` / `:43-46` at `81a56990` drifted to these at `HEAD`; intent unchanged.)
- ⟨`node fence.mjs <kf node_modules/@mkbabb/value.js>`⟩ ×2 → `registryNames 40 rejected 0` — every one of the 40 names resolves `ok` at 4.1.0: the initializer cannot throw.
- The real module evaluated at 4.1.0 through kf's own tests ⟨`guarded --timeout 10 -- npx vitest run --maxWorkers=2 test/compile/easing-identity.test.ts test/orchestration/orchestration-api.test.ts`⟩ ×2 → `Test Files 2 passed (2)` · `Tests 59 passed (59)`; ⟨… `test/_root/public-surface.test.ts test/compile/timing-function-names.test.ts`⟩ ×2 → `Test Files 2 passed (2)` · `Tests 51 passed (51)`.
- **`registry.ts` touched: NO.** The delta forces no byte there: the key set is identical (no fence leg fires), and the 8 shape changes ride through `easing(name)` unchanged in kf's code — kf's registry hands out the analytic curve under the name that denotes it, which is the declared intent. Name hygiene is KF.W4's; the `:51-52` scheduled memo deletion is not forced by the delta (residual, §6).

## §5 The DECLINED discriminant

O-11 §D2 (`:209-211`): value.js *"considered shipping an `approximated: boolean` discriminant on the ok arm instead and **declined it**: a discriminant labels the wrong curve rather than curing it, and `ease-out-circ` denotes the analytic curve."* kf-side reading: **ACKNOWLEDGED, no dissent.** kf consumes no such field and needs none; the 4.1.0 `easing()` ok arm carries no `approximated` key (⟨`grep -c approximated node_modules/@mkbabb/value.js/dist/subpaths/easing.d.ts`⟩ → 0).

## §6 Residuals (not this gate's)

- `registry.ts:33-53` docblock describes **4.0.0's** un-memoised `easing()` and schedules the memo's deletion *"in KF.W3's repin commit"*; the repin (`.c1`, `c18a9bd9`) landed without it. Not forced by the 8-curve delta ⇒ not touched under this unit's lock; routed to the orchestrator.
- Demo blast radius, re-measured (spec §B.3 named `TimingFunctionPanel.vue` / `EasingSidebar.vue` consumers at `81a56990`): ⟨`git grep -n bezierPresets -- demo`⟩ at kf `HEAD` → **5 comment lines, 0 code reads** (`useTimingFunctionEditor.ts:336`, `useEasingPickerSeat.ts:30/:99`, `EasingSidebar.vue:148/:151`) — the demo's catalogue is its own `NAMED_EASING_BEZIER` (KF-SS3 / KF-ES-3), and `EasingSidebar.vue:148` notes glass-ui's bezier catalogue is value.js `bezierPresets` (30 keys, unchanged per §2). The demo reaches the 8 changed shapes only through kf's registry by name; the change is planned and declared before the bump.
