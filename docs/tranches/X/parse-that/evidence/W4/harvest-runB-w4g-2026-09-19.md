SERVED MODEL: claude-opus-5[1m]

# X.P.W4.g — THE `DEFECT-LEDGER.md` APPEND, BY THE §0p RUN-B SYMLINK (2026-09-19)

COHESION **§0ab** bullet 1, final sentence: *"`.g` performs the **`DEFECT-LEDGER.md` append** by the
§0p procedure's run B (the script's write through the symlink, never a hand's)."* §0p / **F-e11 ·
K.7(i)** names the harvester's 143-file spillage and its wholesale `DEFECT-LEDGER.md` rewrite a MAJOR
defect owed to X-W11's HARVEST; until cured, every harvest runs **from a scratch mirror with the
script symlinked**. `.f` ran A only and left the append as a residual, because the registry row was
in no grant of its unit. It is in this one.

**Not one byte of this file's subject was typed.** The ledger's new bytes are the harvester's own
output, delivered through a symlink; this unit's hands never opened it.

## The instrument, unmodified — measured before it ran

⟨cmd⟩ `shasum -a 256 docs/tranches/V/megatranche/workflows/harvest-journals.mjs` →
**`77a6e04c20674f1575891ac9f3daa8421491fc2ec98bd784dc61b4563c978a28`** — byte-for-byte the sha `.f`
recorded, so the two seats ran the same program.
⟨cmd⟩ `git log --oneline -1 -- …/harvest-journals.mjs` → **`c0078d96`**.
⟨cmd⟩ `git status --porcelain -- docs/tranches/V/megatranche/workflows/` → **0 lines**.

## Run A — the CONTROL: a fresh mirror, script symlinked, ledger NOT symlinked

The mirror holds only `docs/tranches/V/megatranche/registry/harvest/` and a symlink to the script.
⟨cmd⟩ `cd <mirrorA> && node harvest-journals.mjs` → **EXIT=0**, *"harvested 3354 agent results · 7837
defects"*. ⟨cmd⟩ `ls <mirrorA>/…/registry/harvest | wc -l` → **167** files — **the spillage,
contained in the mirror**, which is the whole point of the procedure. The mirror's own
`DEFECT-LEDGER.md`: **120,340** lines.

## The write is LOSS-FREE — proven before it was allowed to reach the repo

A regenerating emitter can silently destroy banked evidence (E-3), so run A's product was diffed
against the repo's committed ledger BEFORE run B was permitted to touch it.

⟨cmd⟩ `diff <repo ledger> <mirrorA ledger>` → **`<` lines: 1 · `>` lines: 153**. The single removed
line is the **census sentence** (`**7813 defects** … BLOCKER 915 · MAJOR 3245 …`), replaced by its
successor (`7837 defects` · `BLOCKER 916` · `HIGH 152` · `CRITICAL 30`). **No defect row is removed.**
It is a true modify-append plus the one line whose job is to state the total.

## Run B — a SECOND fresh mirror, with `DEFECT-LEDGER.md` symlinked into the repo

⟨cmd⟩ `ls -l <mirrorB>/docs/tranches/V/megatranche/registry/DEFECT-LEDGER.md` →
`lrwxr-xr-x … -> /Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/registry/DEFECT-LEDGER.md`

| reading | BEFORE run B | AFTER run B |
|---|---|---|
| sha256 | `54fd8c713e964a30…` | **`9573d226530f131a…`** |
| bytes | 10,560,195 | **10,561,092** |
| lines | 120,188 | **120,340** |
| `git status --porcelain` on the path | clean | ` M …/DEFECT-LEDGER.md` |

⟨cmd⟩ `cd <mirrorB> && node harvest-journals.mjs` → **EXIT=0**.
⟨cmd⟩ `diff -q <mirrorA ledger> <repo ledger>` → **silent: run A ≡ run B, byte-identical.** The
harvester is idempotent over settled journals, and the two independent runs agree, which is what
makes this an append and not a roll of the dice.
⟨cmd⟩ `git diff --numstat` → **`153  1`** — the same 153/1 the loss-free check predicted, now in the
repo's own index.
⟨cmd⟩ `git status --porcelain -- docs/tranches/V/megatranche/registry/` → **exactly one line**, the
ledger. **The 167 harvest JSONs stayed in mirror B.** F-e11's spillage did not reach the repo.

## Residual, named rather than smoothed — and NOT hand-cured

⟨cmd⟩ `git diff --check` over the new bytes reports **trailing whitespace on 48 added lines**, every
one of the shape ``### `` ·  · `` followed by `**Defect.** ` — harvester rows emitted from result
records whose id, severity and file fields are empty. This is **F-e11's own family**: a rewriting
emitter that authors malformed rows. It is **left exactly as the script wrote it**, because §0ab
grants this file to the harvester's write and to nothing else — a hand's tidy here would be the very
substitution the ruling forbids. Owner: **X-W11's HARVEST (§0k HG-7)**, beside F-e11 and K.7(i).
