SERVED MODEL: claude-opus-5[1m]

# X.KF.W4 REPAIR 1 — the three escalations, each with the measurement that produces it

**Seat** X.KF.W4 **REPAIR 1** (round 1, dispatched against `## Check 1`'s register) ·
**Dated** 2026-09-17 · **Substrate** `/Users/mkbabb/Programming/keyframes.js`, branch `master`,
opened at ⟨`git rev-parse --short=8 HEAD`⟩ → **`3e81f500`** = ⟨`… origin/master`⟩, ⟨`git rev-list
--left-right --count origin/master...HEAD`⟩ → `0  0`.
**E-3**: a dated addendum-beside. No byte of `KF-W4.md`'s pre-existing text, of the adjudicated
registry, of any `conformance/` artefact or of any prior evidence file is edited by this file. The
one spec write this seat performed is itself an addendum-beside, appended below `KF-W4.md`'s final
rule and ruled by COHESION **§0m.1 F-10** / **KF-CB-29 (ii)**.

**Every figure here was produced by this seat's own command at the settled bytes and double-run.**

---

## E-1 · G-KFW4-5 / R-2 — the retirement needs FIVE loci; §0m.1 F-10 widened TWO

### What was ruled

COHESION §0m.1, verbatim: *"**F-10 — R-2's reverse-map retirement** needs `constants/types.ts:57-62`
(`Easing = {fn, css?}`) and `defaults.ts:85` (the nameless default easing): **KF.W4's §Bounds are
widened by dated E-3 addendum at KF-W4.md to those two loci**, and the default easing gains a name so
a bare retirement cannot make default-easing serialization throw."*

The two loci are granted, at `KF-W4.md`'s §Bounds ADDENDUM (this seat, rows **A-1** and **A-2**).
**They are not sufficient, and the insufficiency is measured, not argued.**

### The measurement — the cure shape executed end-to-end as a PROBE, then reverted

R-2's shape is fixed by the ruling's own words: *"the name travels **with** the serialized easing
record; identity is **never** re-derived from function identity."* So `serializeEasing` must read the
NAME off the record. For a record to carry one, the **producers** must put it there. This seat built
the whole shape and ran the suite against it (applied with `python3` in-place edits, measured, then
restored with a pathspec `git checkout --`; no `git stash`, no `reset`):

| # | locus | what the cure does there | in this wave's bounds? |
|---|---|---|---|
| 1 | `src/animation/constants/types.ts` — the `Easing` interface | gains `name?: string` | **YES** — §0m.1 F-10, granted at A-1 |
| 2 | `src/animation/constants/defaults.ts:85` | `{ fn: easeInOutCubic, name: "easeInOutCubic" }` | **YES** — §0m.1 F-10, granted at A-2 |
| 3 | `src/animation/compile/easing/option.ts:65` | `resolveEasingOption` carries the name it was handed — **the heavy-surface production path, and the one that matters** | **NO** — in no unit's writable set, and not in §0m.1's widening |
| 4 | `src/animation/easing.ts:95` | `resolveEasing(name)` carries it across the light boundary | **NO** — `.e` holds this file for **`:44` prose only** |
| 5 | `src/animation/engine/css/animation.ts:222` | the `fromString` per-stop path carries `tfText` | **NO** — `.c` holds this file for the **`_boundTimeline`** carve only |
| 6 | `src/animation/compile/emit/easing-serialize.ts:71-73` | the `.find` is REPLACED by the record read | **YES** — §Bounds L65 |
| 7 | `src/animation/compile/easing/registry.ts` | exports `isRegistryName` (a MEMBERSHIP predicate, not an inverse map — an inverse map would be the same act memoised, which R-2 forbids by name) | carve is `:30-34` · `:36` · `:43`; a new export is **outside it** |
| 8 | `test/compile/easing-identity.test.ts` `:80` · `:128` | the fixture passes the RECORD, not `{ fn }` | **YES** — `.c`'s create row, whole file |
| 9 | `test/compile/value4-easing-contract.test.ts:42` | one line: `serializeEasing(resolveEasingOption(…))` instead of `serializeEasing({ fn })` | **NO** — in no unit's writable set |

### Result 1 — the cure WORKS, whole

With all nine spent, double-run: ⟨`npx vitest run --project library`⟩ → **`Test Files 99 passed | 5
skipped (104)` · `Tests 1124 passed | 1 expected fail | 14 skipped (1139)`** and ⟨`npx vitest run
--project demo`⟩ → **`30 passed (30)` · `191 passed (191)`** — **byte-identical to the baseline this
seat measured before touching anything**, with the `.find` gone and `serializeEasing` reading
`easing.name`. One residual `tsc` diagnostic remains inside locus 5
(`animation.ts(222,17)` TS2322 — `exactOptionalPropertyTypes` rejects `name: string | undefined` for
an optional `name?`), cured by a conditional spread **at that same locus**, so it adds no file to the
ask. **The retirement is not hard. It is out of reach.**

### Result 2 — the two granted loci ALONE are not merely insufficient, they are destructive

With loci 1, 2, 6, 7 spent and **the producers left alone** (i.e. exactly what F-10's widening
authorizes), double-run: ⟨`npx vitest run --project library`⟩ →
**`Test Files 2 failed | 97 passed | 5 skipped (104)` · `Tests 42 failed | 1082 passed`**, partitioned
by this seat with `--reporter=json`:

| file | failed assertions | in bounds? |
|---|---|---|
| `test/compile/easing-identity.test.ts` | **41** (`:80` ×40 — the `it.each(registryNames)` round-trip — plus `:128`) | **YES**, curable here by locus 8 |
| `test/compile/value4-easing-contract.test.ts` | **1** (`:42`) | **NO** |

**One out-of-bounds assertion stands between a RED gate and a GREEN one.** `value4-easing-contract`
`:40-43` reads `resolveEasingOption("timingFunction", "ease-out-cubic")**.fn**` — it deliberately
strips the record down to its callable and then expects the serializer to recover the name. It is,
precisely, the assertion that CODIFIES the defect R-2 retires, and its title says so: *"keeps stable
named identities for faithful CSS serialization."* Its cure is to pass the record.

### Why no substitute was invented

§Bounds L65's own operative finding governs: *"Retiring the `.find` **without** the name-carrying
record reds five test files and silently converts nine registry names into throws."* This seat
measured where the `.find` is actually consulted — instrumenting it and running the library suite —
and the answer is the whole emit tier: `format.ts` **4338** consultations, `easing-serialize.ts`
2299 (its own recursion), `options.ts` 557, `backward.ts` 178, `densify.ts` 35, `entry.ts` 2.
A `Map`-keyed inverse, a name stamped on the function object, and a second parameter threaded through
the seventeen call sites are each **the same act at a different address**, and R-2 rules out the
injective-wrapper dodge by name. The `.find` therefore stands **verbatim** at `:71-73`
(⟨`sed -n '71,73p'`⟩ re-read after the probe was reverted) and **G-KFW4-5 stays RED**.

### The ask, minimal

Widen KF.W4's §Bounds — or a named successor's — by **four loci**: `compile/easing/option.ts:65` ·
`easing.ts:95` · `engine/css/animation.ts:222` · `test/compile/value4-easing-contract.test.ts:42`
(plus the `registry.ts` membership predicate, if that file's carve is read strictly). The
already-granted A-1/A-2 then complete it, and the receipt above says what lands: the reverse-map
retired, 1124 + 191 green, no curve moved, the `bezierPresets` fence untouched.

---

## E-2 · KF-CB-29 — the ruled cure LANDED, and it surfaced 10 sites that are all out of bounds

Commit **`0c52152a`**. §0m.1 ruled candidate (ii) and this seat executed it exactly: `CssEasingLiteral`
declared in `constants/types.ts` (in bounds), `| string` replaced by it, and the **single type-only
token** at `compile/emit/css-text.ts:30` narrowing `serializeTimingFunction`'s return (granted at A-3).

**What it cured, measured double-run**: ⟨`npx tsc --noEmit -p tsconfig.lib.json | grep -c 'error TS'`⟩
→ **3 → 3**. The 14 library diagnostics a bare deletion produces — 13 in the SHIPPED preset catalogue
plus `engine/css/metadata.ts:63` — are **all** cured, exactly as the `.e` escalation predicted.
⟨`npx vitest run --project library`⟩ **1124 passed** and ⟨`--project demo`⟩ **191 passed**: zero
runtime change. **G-KFW4-13's RED limb is GONE** — ⟨`npx tsc --noEmit -p tsconfig.test.json | grep -c
TS2578`⟩ → **0** (it was `timing-function-names.test.ts(139,13)`), with runtime **44 passed (44)**.

**What it surfaced.** A type that no longer accepts every string reddens every site that hands it
one. Diffed by this seat between HEAD bytes and the cure (`comm` over sorted diagnostic lists):
**10 distinct sites over 8 files, and every one is outside this wave's writable sets.**

| # | site | shape | the one-line cure |
|---|---|---|---|
| 1 | `demo/components/instrument/keyframes/composables/useKeyframeOps.ts(81,13)` | TS2322 `string` → the union | type the source as `CssEasingLiteral` |
| 2 | `demo/components/instrument/transport/channel-controls/composables/useTimingFunctionEditor.ts(177,9)` | TS2322 | same |
| 3 | `demo/scenes/easing/useEasingDemo.ts(294,13)` | TS2322 | type `cssValue` as `CssEasingLiteral` |
| 4 | `demo/scenes/easing/useEasingDemo.ts(310,43)` | TS2345 | rides cure 3 |
| 5 | `test/compile/diagnostics-channel.test.ts(94,51)` | TS2345 `"definitely-not-an-easing"` | `// @ts-expect-error` — **the wave's own sanctioned idiom**, the one `timing-function-names.test.ts:139` uses |
| 6 | `test/compile/value4-easing-contract.test.ts(13,58)` | TS2345 `string` | same |
| 7 | `test/compile/value4-easing-contract.test.ts(37,60)` | TS2345 `"not-an-easing"` | same |
| 8 | `test/engine/strict-options.test.ts(55,45)` | TS2345 `"bogus-easing"` | same |
| 9 | `test/engine/w0-crashes.test.ts(207,17)` | TS2322 `"not-a-real-easing"` | same |
| 10 | `test/waapi/waapi-lifecycle.test.ts(241,45)` | TS2345 `"not-a-real-easing"` | same |

Six of the ten are **negative tests that deliberately pass an invalid easing string to assert a
runtime throw.** They were green only because the `| string` arm made every string typecheck — which
is the defect, arriving at its true consumers. None is a regression this cure introduced; each is a
type-level lie this cure stopped telling. **Net effect on the composite gate**, double-run:
`check` leg 1 `vue-tsc` **30 → 34**, leg 2 `tsc -p tsconfig.test.json` **17 → 24** (+8 new, −1 the
cured TS2578), leg 3 **PASS**; `check:lib` — **the pre-existing blocking merge step — is UNCHANGED at
3**, so no CI step regressed.

**The honest alternative, named and rejected**: leaving `| string` standing would have left
G-KFW4-13 RED over a cure the owner had already ruled, which is D-2's own complaint. Softening the
cure (`| string` behind a conditional type, an `any` at the ten sites, a `@ts-nocheck`) is masking and
is forbidden. So the cure landed and its consequences are routed by id.

---

## E-3 · G-KFW4-7 — 1 of 9 cured in bounds, 8 routed, exactly as §0m.1's own conditional prescribes

§0m.1: *"G-KFW4-7's nine false attributions are **cured by the repair seat if in bounds, else routed
with receipts.**"* Measured double-run: ⟨`node scripts/gates/census.mjs --clause provenance`⟩ →
**9 → 8** after commit `8af4b8c9`.

| # | row | file's bounds status | routed to |
|---|---|---|---|
| **1** | `test/compile/timing-function-names.test.ts:16` `bounceInEase` PHANTOM | **IN BOUNDS** — `.e`'s create row, whole file | **CURED** at `8af4b8c9` |
| 2 | `src/animation/compile/emit/backward/backward.ts:296` `serializeScrollOptions` | file is `.c`'s, carve is **`:30` · `:32` · `:47`** only; `:296` is outside it | KF.W5 (the `src/` successor) |
| 3–5 | `src/animation/compile/emit/format/options.ts:10` · `:81` · `:148` | file is in **no** unit's writable set | KF.W5 |
| 6 | `src/animation/constants/types.ts:9` `timingFunctions` | file is `.e`'s, carve is `:25` · `:27` · `:195`; §0m.1 widened it to the `Easing` interface. `:9` — a stale header claim about a `keyof typeof` query that no longer exists — is outside both | KF.W5 |
| 7–8 | `test/engine/computed-resolution.test.ts:23` · `:50` | file is in **no** unit's writable set | KF.W5 |
| 9 | `test/fixtures/compile/scroll-driven.css:6` | file is in **no** unit's writable set | KF.W5 |

All eight are **one-clause prose rewords**, none touches a runtime byte, and all eight sit in `src/`
or `test/` files a later library wave already opens. The gate stays **RED** and the RED is now
**relieved by the ruling's own else-branch** rather than unrelieved.
