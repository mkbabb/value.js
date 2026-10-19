SERVED MODEL: `claude-opus-5[1m]`

# G5's last four — `src/css/timeline.ts`, cured at Repair 2

**ESC-W9a-TIMELINE-NNA relieved in bounds.** X-W9.a retired 90 of G5's 94 non-null assertions
(`grammar.ts` 72 → 0, `stylesheet.ts` 18 → 0) and raised the remaining four as an escalation
because `src/css/timeline.ts` sat outside **that unit's** writable set. It has never been outside
the **wave's**: `W9.md` §File Bounds `:81` reads `| `src/css/timeline.ts` | modify |`. The repair
seat's writable set is the wave's §File Bounds, so the file needed no bounds expansion — only a
writer. This is that writer.

## Ownership, measured before the write

```
⟨cmd⟩ grep -rn 'src/css/timeline' docs/tranches/X/waves/*.md
        → docs/tranches/X/waves/W9.md:81   | `src/css/timeline.ts` | modify |      (sole hit)
⟨cmd⟩ git log --oneline -8 -- src/css/timeline.ts
        → 6aca8602 feat(v-w43a)!: god-module seam splits css/syntax + css/timeline
          (one commit, V·W43a; no X-W9 unit and no sibling X wave has touched it)
⟨cmd⟩ git status --porcelain -- src/                                  → empty
⟨cmd⟩ grep -n 'File Bounds' -A40 docs/tranches/X/execution/D/X-P-W3.md | grep 'src/css'
        → "`typescript/src/css/**` is already create/modify for this wave"
          — Track D (X·P) writes the parse-that tree's `typescript/src/css/**`, NOT this repo's
```

No unit holds `modify` on the path, so §Disjointness' *"no two units hold `modify` on the same
path at the same time"* is satisfied by measurement rather than by intent.

## The four sites and the cure idiom

The idiom is **X-W9.a's own**, not a new one — from `97ab3991`'s body: *"every `match(...)` result
is destructured and tested"*, and the narrowing is carried in the type instead of asserted.

| site | was | is |
|---|---|---|
| `:23:36` | `const scroll = input.match(/^scroll\((.*)\)$/i); if (scroll) { … scroll[1]!` | `const scrollBody = input.match(…)?.[1]; if (scrollBody !== undefined) { … scrollBody` |
| `:38:36` | `const view = input.match(/^view\((.*)\)$/i); if (view) { … view[1]!` | `const viewBody = input.match(…)?.[1]; if (viewBody !== undefined) { … viewBody` |
| `:71:51` | `rangeBoundary(splitTopLevel(comma[0]!, "space"))` | `const [commaStart, commaEnd] = comma; if (commaStart !== undefined && commaEnd !== undefined)` |
| `:72:49` | `rangeBoundary(splitTopLevel(comma[1]!, "space"))` | same destructure |

**Why each is equivalence, not a narrowing of behaviour.** In both `scroll(…)` and `view(…)` the
capture group is `(.*)`, which matches the empty string, so group 1 is a `string` on **every**
truthy match and `undefined` on **every** null match — `body !== undefined` is exactly the old
`if (match)`. For the range pair, the `comma.length > 2` refusal on the line above leaves only
lengths 0, 1 and 2, so *"both halves are present"* is exactly the old `comma.length === 2`
(`splitTopLevel` yields no `undefined` element; an empty half is `""`, which is `!== undefined`).
**No assertion was replaced by a cast, no branch was added, and no failure path changed its
`ParseResult`.**

## Differential proof — old bytes vs cured bytes, same corpus

Both trees bundled with `esbuild` from a scratch copy of `src/`, the old one carrying
`git show HEAD:src/css/timeline.ts` verbatim (⟨cmd⟩ `diff` against the HEAD blob → silent):

```
⟨cmd⟩ node <scratch>/diffprobe.mjs        →  cases 156 · divergences 0     exit 0
⟨cmd⟩ node <scratch>/diffprobe.mjs (again) →  byte-identical (diff -q silent)
```

156 cases: `parseAnimationTimeline` over 127 inputs (`auto` · `none` · dashed-idents · bare
`scroll` / `view` · unbalanced bodies · 28 bodies × 4 case-and-function spellings, including
`__proto__`, `constructor`, `toString`, empty and whitespace bodies), `parseAnimationRange` over
22 (bare and doubled commas, empty halves, 1–3 token runs, prototype keys), and
`serializeTimelineOptions` over 7 option shapes. Every case compared as `OK <json>` or
`THROW <ctor> <message>`, so a divergence in **either** direction — a new throw or a silenced one —
would have printed.

## Gate re-readings

```
⟨cmd⟩ npx eslint 'src/css/**/*.ts' --rule '{"@typescript-eslint/no-non-null-assertion":"error"}'
        → run A: 0 problems, exit 0 · run B: 0 problems, exit 0        G5  4 → 0   RED → GREEN
⟨cmd⟩ npx vitest run test/v4-css-public.test.ts     → 6 passed (6)     (the timeline entries' own file)
⟨cmd⟩ npx vitest run                                → Test Files 4 failed | 32 passed (36)
                                                       Tests 13 failed | 600 passed (613)   ×2, unmoved
⟨cmd⟩ npm run typecheck                             → exit 2, 1 error, ×2 — the same out-of-bounds
                                                       carrier test/v4-css-emerging.test.ts(12,10) TS2459
⟨cmd⟩ npm run lint                                  → 55 problems, 0 carriers outside docs/tranches/**
⟨cmd⟩ grep -c '^declare ' dist/subpaths/*.d.ts      → sum 20 (css 6 · value 6 · quantize 6 · easing 2)
⟨cmd⟩ grep -o '_2' dist/subpaths/css.d.ts | wc -l   → 60; grep -c → 26
⟨cmd⟩ find src -name '*.ts' -exec wc -l {} + | sort -rn | head -2 | tail -1  → 672 src/transform/path.ts
```

G13, G14 and G16 are **unmoved** across the rebuild this cure forced, so no dist-reading gate moved
sideways under it. The 13 RED tests split exactly as before — `v4-css-emerging` 10 · `v4-c1` 1 ·
`spectrum-luma` 1 (inherited) · `reka-binding-idiom` 1 (inherited) — so this cure caused none of
them and relieved none of them.

## What this does NOT relieve

**D-8 stands.** G5 is green *under the explicit `--rule` flag*; the rule object is still absent from
`eslint.config.js`, so the crash **shape** is still not prevented in-tree. That write is
`X-W9.f`'s alone (§Disjointness §4a: *"X-W9.f is the sole writer"*) and §Commit Plan row 9 binds it
into the cut commit, which may not be split — and X-W9.f is precondition-blocked while X-W4 reads
`OPEN`. Curing the four instances is the half of §Archaeology guardrail 4 that was reachable; the
guardrail itself rides **ESC-W9R1-SEQUENCING**.
