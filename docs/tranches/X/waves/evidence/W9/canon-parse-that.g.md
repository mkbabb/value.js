SERVED MODEL: `claude-opus-5[1m]`

# X-W9.g — canon-truth diff and the parse-that reconciliation (G30 · G31)

Measured 2026-09-18 on `tranche-u`, substrate `4147e478` (X-W9.d's last commit), node v26.0.0,
darwin arm64. Every count below is read from the settled bytes and **double-run**. Docs-only unit:
the only product-tree commands are read-only.

---

## 1. G30 — canon cites no non-existent tree

**Gate command** (§Hard Gate, verbatim): `grep -rn 'src/parsing' docs/tranches/V/ARCHITECTURE.md`

| | reading |
|---|---|
| **BEFORE** | **RED** — 1 hit, at `:657`, citing `src/parsing/stylesheet/serialize.ts`, `src/parsing/animation-shorthand.ts`, `src/parsing/units.ts` |
| **AFTER** | **GREEN** — exit 1 (no match); `grep -c` → **0** (double-run **0**) |

### Ground truth the citations were measured against

```
⟨cmd⟩ ls -d src/parsing                                        → No such file or directory
⟨cmd⟩ find . -name '*.bbnf' -not -path './node_modules/*' | wc -l → 0
⟨cmd⟩ test -f src/css/grammar.ts                                → YES   (the CSS grammar value ships)
⟨cmd⟩ test -f src/css/rules.ts && test -f src/css/serialize.ts  → YES   (X-W9.d's split products)
```

### The four named helpers, measured in both trees

The paragraph claimed "exactly four text-only helpers transpose once into" Keyframes' emit tree,
sourced from three files in a directory that does not exist. The transposition is **already done**,
and the count is **three**, not four:

| symbol | value.js `src/` | `../keyframes.js/src` |
|---|---|---|
| `serializeStylesheetItem` | **absent** | `animation/compile/emit/css-text.ts` — `export const`, **1** definition |
| `reverseAnimationShorthand` | **absent** | `animation/compile/emit/css-text.ts` — `export const`, **1** definition |
| `reverseCSSTime` | **absent** | `animation/compile/emit/css-text.ts` — `export const`, **1** definition |
| `formatCSS` | **absent** | **absent as a bare name**; nearest surviving symbol is `formatCSSKeyframeString` in `animation/compile/emit/format/format.ts` |

```
⟨cmd⟩ grep -rn 'serializeStylesheetItem\|reverseAnimationShorthand\|reverseCSSTime\|formatCSS' src/ | wc -l
      → 0   (double-run 0)
⟨cmd⟩ grep -rn 'formatCSS\b' ../keyframes.js/src | grep -v formatCSSKeyframeString
      → (no output)
```

So *"no forwarding export survives"* was already true at the bytes; what was false was the three
value-side source paths and the count. Both are corrected in place.

### The rest of `:657` was verified true, not rewritten

The "not 4.0 exports" roster is canon that still holds, so it is preserved verbatim. Spot-check of
eight of its names against the built `dist/subpaths/*.d.ts`:

```
serializeStylesheet 0 · serializeDeclaration 0 · stylesheetToString 0 · parseCSSPercent 0
evaluateMathFunction 0 · CSS_WIDE_KEYWORDS 0 · CSSParseError 0 · registerColorNames 0
```

---

## 2. G31 — parse-that position recorded against ground truth

**Gate command** (§Hard Gate, verbatim): `node -e` on `package.json` dependencies + the recorded
paragraph.

| | reading |
|---|---|
| **BEFORE** | **RED** — the manifest state is as the spec banked it, and **no paragraph records it**; the readopt decree stood unreconciled |
| **AFTER** | **GREEN** — the paragraph exists at `ARCHITECTURE.md:657` and states exactly the measured manifest; **no parser is adopted** |

```
⟨cmd⟩ node -e '…' (double-run, byte-identical)
  dependencies={"@mkbabb/glass-ui":"^7.0.0","@mkbabb/keyframes.js":"^6.0.0"}
  parse-that in deps=false | in devDeps=false
⟨cmd⟩ grep -c '{"@mkbabb/glass-ui":"\^7.0.0","@mkbabb/keyframes.js":"\^6.0.0"}' docs/tranches/V/ARCHITECTURE.md
      → 1     (the recorded paragraph quotes the manifest exactly)
⟨cmd⟩ git diff --stat -- package.json package-lock.json src/
      → (empty)   — this unit moved no manifest and no src byte
```

The only two mentions of the name under `src/` are the subpath docstrings asserting its absence
(`src/subpaths/transform.ts:4` *"zero parsing, zero parse-that"*, `src/subpaths/math.ts:2`
*"parse-that-FREE"*) — corroboration, not adoption.

### The position, and where each clause was read

| clause recorded | source read (tracked, in-repo unless noted) |
|---|---|
| `PAUSED_RESEARCH / TERMINAL_SOURCE_RED / NO_ACTIVE_WRITER` | `docs/tranches/V/megatranche/coordination/PARSER-CSS-PAUSE-HANDOFF-2026-08-02.md`, its `Status:` line — verbatim, `git ls-files` **TRACKED** |
| original research root is idle | `git -C ../parse-that log -1` → **`ef10d5b` 2026-07-05** (double-run identical) |
| fresh writer root `parse-that-css-totality-p2`, fresh-root law | `docs/tranches/V/megatranche/CONSTELLATION-COMMISSION-2026-08-03.md` §2's parse-that block (M-22): *"a **FRESH, non-overlapping writer root** (fresh-root law; frozen/preserved roots untouched forever)"* |
| that root is the live writer | `git -C ../parse-that-css-totality-p2 log -1` → **`b10f62e` 2026-09-18** (double-run identical) |
| `≥10×` retired as admission law | M-22 §2 *"The ≥10x floor is retired as active admission law"*; `docs/tranches/X/parse-that/evidence/W1/BAR-LEDGER-2026-09-17.md` §2.4 row `historical 10×` → **RETIRED AS LAW** |
| the replacement portfolio | same BAR-LEDGER §2.4 — strict-3× · strict-2× · measured break-even |
| **none of the three is ratified** | same BAR-LEDGER §2.4 `bar` cells → **`OWNER-GATED-PENDING-RATIFICATION`** ×3; `COHESION.md` **§0j.E OC-1** — *"the bench table is RECORDED-NOT-GATING"*, admission decided on correctness |
| no adoption here | `COHESION.md` **§0i.1** — disposition **C**, `BLOCKED-ON` + re-trigger (X.P.W4's RC-P evaluator TRUE at a dated run); **A** is the payload that fires then |

### Arithmetic of every published figure (recomputed, not remembered)

`budget = 1,636,680 ÷ k`; fixed native floor `311,883 µs`.

```
k=10 → 163,668 µs   floor/budget = 1.906×   → RETIRED AS LAW
k=3  → 545,560 µs                            → OWNER-GATED-PENDING-RATIFICATION
k=2  → 818,340 µs                            → OWNER-GATED-PENDING-RATIFICATION
k=1  → 1,636,680 µs                          → OWNER-GATED-PENDING-RATIFICATION
```

`1,870,633 µs` is **not** published here: `P4-EVIDENCE-REPLAY.json` was measured **absent** at this
wave's open, so the figure and its 311,661 / 623,434 headrooms stay uncitable (G28's rule, CC-097).

---

## 3. Two corrections the spec's own sentence needed at the bytes

Recorded rather than silently applied (METHOD: drifted anchors get INTENT at the true bytes).

1. **"the replacement portfolio … governing"** — at true bytes the portfolio governs the
   *denominator every budget restates against*, and **governs no admission verdict**: all three of
   its bars read `OWNER-GATED-PENDING-RATIFICATION`, and §0j.E OC-1 (ruled 2026-09-17, after this
   spec was authored 2026-08-03) makes the bench table RECORDED-NOT-GATING with admission decided on
   **correctness**. The recorded paragraph says exactly that, and says the portfolio is not a bar.
2. **"exactly four text-only helpers"** — measured **three**; `formatCSS` resolves in neither tree.
   The paragraph records three and names the nearest surviving Keyframes symbol.

## 4. Bounds and locks honoured

- **Zero line delta.** `wc -l` **975 → 975**; `git diff --numstat` → **1 1**; the sole hunk header is
  `@@ -657 +657 @@`. X-W8's cap sentence is byte-identical and **still at `:943-945`**, so `W8.md:373`'s
  `ARCHITECTURE.md:944` coordinate and this spec's own Do-NOT-touch citation both stay true. A carve
  that inflated the file would have manufactured the very class G30 convicts.
- **X-W8 lock**: its ledger row was re-read immediately before the edit → `planned` (not OPEN).
- `git diff --check` → exit **0**. No formatter is configured for `docs/**` and none was introduced.
