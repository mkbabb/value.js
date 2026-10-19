SERVED MODEL: claude-opus-5[1m]

# NG-13 — packed-surface exported-equality, and deploy currency

**NG-13** (`X-W1-FOLD.md:892`): *"Packed-surface exported-equality + deploy currency."* Its
falsifier is unusual and binding: *"A byte-equality assertion reds on the known-private `_2` delta —
**that is the gate failing for the wrong reason, and is itself an NG-13 failure**."*

**R41's DISSENT is binding on the gate's shape** (`X-W1-FOLD.md:705-708`): the drift sub-claim is
KILLED at MC-K8 — *"the delta is private `_2` declarations"* — therefore **the gate asserts
EXPORTED-SURFACE equality, never byte equality**. This unit measured both, so the distinction is a
reading of the bytes rather than a repetition of the ruling.

## Half A — the packed surface verifies

`W1.md` §File Bounds grants this unit `scripts/ci/verify-packed-surface.mjs` as **execute, no
write**, and R39's ROUTING LOCK names it *"the packed-vs-checkout surface's owner"*. In CI it runs
from `ci.yml`'s `pack producer bytes` step — which on the master run **never executed** (the
`producer` job dies four steps earlier at `npm run lint`; see `g17-g19-landing-2026-09-18.md`). So it
was run here directly, with the tarball name derived by **ci.yml's own expression**:

⟨cmd⟩ `node -p "const p=require('./package.json'); p.name.replace(/^@/,'').replace('/','-')+'-'+p.version+'.tgz'"`
→ `mkbabb-value.js-4.0.0.tgz`

⟨cmd⟩ `npm pack --ignore-scripts --pack-destination <scratchpad>` → `37205` B
*(`--pack-destination` differs from ci.yml's bare `npm pack`, and only so that no `.tgz` is left
untracked in the repo; ⟨cmd⟩ `git status --porcelain --untracked-files=all -- '*.tgz'` → empty.)*

⟨cmd⟩ `node scripts/ci/verify-packed-surface.mjs <tarball>` →

```
{"runtime":{"color":23,"value":1,"css":19,"easing":16,"math":9,"transform":9,"quantize":2},"strictTypes":62}
```
⟨cmd⟩ `… >/dev/null 2>&1; echo $?` → **0**

**79 runtime exports across the 7 subpaths, 62 strict type declarations, exit 0.** The oracle asserts
the export map and the per-entry exported NAMES (`:86` unexpected export map · `:116` `/${entry}
exports ${names}` · `:127` a forbidden specifier resolving) — it is an exported-surface instrument by
construction, never a byte comparator.

**This is also G-17's decisive collateral finding**: the single cause `W1.md:317` permits a master
red to have — the `pack producer bytes` step — is **GREEN when actually run**. The master red is
entirely elsewhere.

## Half A′ — exported equality WHILE the bytes differ (R41 re-derived, not cited)

R41's subject is the local build against the published 4.0.0. R41 also records that *"the repo
installs itself from the public registry into its own repo's `node_modules`"*, which makes that
published copy locally readable. Confirmed at this seat:

⟨cmd⟩ `node -e '…\.package-lock\.json…resolved'` →
`https://registry.npmjs.org/@mkbabb/value.js/-/value.js-4.0.0.tgz`, version **4.0.0**.

| `dist/subpaths/css.d.ts` | lines | bytes | `^export` | `_2` declarations |
|---|---|---|---|---|
| local build | **382** | 12490 | **53** | **25** |
| registry 4.0.0 (`node_modules/@mkbabb/value.js/…`) | **350** | 10910 | **53** | **0** |

- ⟨cmd⟩ sha256 comparison → **the bytes DIFFER.**
- ⟨cmd⟩ `diff <(grep -oE '^export [^;]*' local | sort) <(… registry | sort)` → **IDENTICAL, 0
  differences.** Stronger than R41's count: not merely 53 = 53, but the same 53 exported
  declarations.
- The whole delta is the **private `_2` rollup-dts collision artifact**: 25 occurrences locally, 0 in
  the published copy.

**Therefore NG-13's half A is GREEN and its shape is vindicated by measurement**: a byte-equality
gate would red here on 25 private declarations that no consumer can name — the manufactured failure
R41's dissent and NG-13's own falsifier both forbid.

**SELF-COUNT note (E-3, correction beside, not a rewrite).** R41 records *"383 vs 351 lines"*; this
seat's ⟨cmd⟩ `wc -l` reads **382 vs 350** — lower by exactly one on both sides, the ordinary
`wc -l`-counts-newlines convention difference. The substance (equal `^export`, unequal bytes,
`_2`-only delta) is unchanged, and this line publishes **this seat's own measurement**, not the
fold's.

**R39's half, re-measured**: ⟨cmd⟩ `ls dist/` → **no `dist/index.d.ts`** (ENOENT stands);
⟨cmd⟩ `ls dist/subpaths | wc -l` → **14 entries = 7 `.js`/`.d.ts` pairs**, with no `parsing` and no
`units`. Both of R39's cells reproduce.

## Half B — deploy currency: RED

The second conjunct is R38's, and it fails. Production serves a **2026-07-06 build of value.js
3.1.0**, 73 days stale, built against a **linked sibling** glass-ui rather than the registry — the
full measurement is in `g20-r38-prod-epoch-2026-09-18.md`. No deploy ran at this unit, because the
`deploy-pages` push arm is gated on a green master `ci` that did not open.

## Verdict

**NG-13 — SPLIT, recorded as such rather than rounded either way.**

| conjunct | verdict | basis |
|---|---|---|
| packed-surface exported-equality | **GREEN** | `verify-packed-surface.mjs` exit 0; `^export` 53 = 53 with identical name sets; byte delta = 25 private `_2` declarations only |
| deploy currency | **RED** | production is 73 days stale at value 3.1.0 (R38); rides G-19/G-20 |

The exported-equality half is claimable now. **The currency half is NOT claimed** and routes with
G-19 / G-20 to the escalation this unit returns.
