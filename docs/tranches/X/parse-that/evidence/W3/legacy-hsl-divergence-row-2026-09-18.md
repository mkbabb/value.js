SERVED MODEL: claude-opus-5[1m]

# X.P.W3.g — ESC-g1: the legacy-`hsl()` divergence row, DRAFTED AND MEASURED, NOT LANDED

Dated evidence banked **beside** (E-3). This file lands **no** row: it holds the row's six fields,
already measured, so the seat that receives the grant can land it without re-deriving anything.

## 1. Why it is not landed — the bounds, measured at the bytes

`.g`'s writable set admits `test/css-equivalence/lib/ledger.mjs` ("the divergence row's SOURCE
table") and **not** `test/css-equivalence/emit-divergence-ledger.mjs`. `ledger.mjs` exports exactly
five row families, and every one of the five is closed to this row **by its own authority**, not by
preference:

| family | export | why this row cannot join it |
|---|---|---|
| §1 ADJUDICATED | `ADJUDICATIONS` | lives in `test/css-totality/lib/adjudications.mjs` — `.a`'s file, outside `.g`'s set. *"An author cannot adjudicate his own union."* |
| §2 PRESERVED DISSENT | `DISSENTS` | the emitter hard-codes the heading `"## §2 The four preserved DISSENTS"` (`emit-divergence-ledger.mjs:205`) and `equivalence.test.ts:117` **asserts that exact string is present**. A fifth row publishes a heading that contradicts its own census. The family's authority is also wrong: `W3.md` §2c routes exactly four `parser-band.md` dissents here **by name**. |
| §3 REGRESSION FIXTURE | `FIXTURES` | `fixtureAnchorsPresent()` reads `GATE-VERDICT.md` and `equivalence.test.ts:153` asserts **every** fixture's anchor is found there. `GATE-VERDICT.md` is IMMUTABLE evidence and carries no anchor for this subject: ⟨cmd⟩ `grep -n 'hsl' GATE-VERDICT.md` → **one** line, `33:` — `` `parseCssColor("oklch()")` (and `rgb()`, `hsl()`, `lab()`, `color()`, `rgba()`) `` — which is **R1's empty-body list**, a different defect. Borrowing it would attribute R1's authority to a row R1 does not cover. The heading also hard-codes `"## §3 R1–R5"`. |
| §4 LABEL SURFACE | `LABEL_ROW` | a single object, emitted as one row; it holds no second. |
| §5 DECLARED COVERAGE NARROWING | `narrowingRows()` | generated from `UNREALIZED_ENTRIES` × the pinned barrel. This row is not a narrowing — the entry IS realized. |

Landing it honestly therefore needs a **sixth family** in `emit-divergence-ledger.mjs` (or the §2/§3
headings and §0's prose made count-driven), which is a §3a **file-bound expansion** and is returned
rather than taken.

**This is not a new finding — it is a standing route.** `.e` reached the same wall and wrote it into
the ledger's own §6.1, which this unit re-appended verbatim after the re-emission (F-e7):

> *"Neither input is in any ledger row; this is exactly the 'unrowed intentional difference' G-7
> counts as a defect. Returned as **F-e2** for a `.d`-emitted row at **X.P.W4**, not hand-added
> here"*

`.g` confirms `.e`'s measurement at its own clock and adds the fields.

## 2. The row, measured (⟨cmd⟩ `node docs/tranches/X/parse-that/evidence/W3/dimension-token-2026-09-18.mjs`)

| field | value |
|---|---|
| **id** | `SP-1` (proposed — the first row of a §-family for this wave's own spec-cited divergences) |
| **title** | `<legacy-hsl-syntax>` admits no `<number>`: the incumbent mis-accepts `hsl(120, 50, 50)` |
| **input(s)** | `"hsl(120, 50, 50)"` · `"hsl(120, 50%, 50)"` |
| **incumbent** | **ACCEPTS** `hsl(120, 50, 50)` → `{space:"hsl", channels:[120,50,50], alpha:1}` — and the channels are unscaled, so the row carries the PB-03 100× defect a second time. `hsl(120, 50%, 50)` → `{hsl,[120,0.5,50]}`. |
| **candidate** | **REJECTS** both, identically in BOTH lowerings: `ok:false css_syntax [11,16) expected ["<percent-sign>"] actual ", 50)"`. |
| **spec citation** | css-color-4 §7.1 — `<legacy-hsl-syntax> = hsl( <hue>, <percentage>, <percentage>, <alpha-value>? )`. The legacy comma form admits **no** `<number>` for saturation or lightness; only `<modern-hsl-syntax>` does (`[<percentage> \| <number> \| none]`). The candidate's rejection is spec-correct and the incumbent's acceptance is an R-class mis-accept. |
| **adjudication** | SPEC-CORRECT, and the candidate is REQUIRED to differ. Routed by `.e` (ledger §6.1) to X.P.W4 for a `.d`-emitted row; `.g` re-measured it and drafted the fields. It is **not** created by `.g`'s cure — ⟨cmd⟩ the pre-cure probe already read `ok:false css_syntax ["<percent-sign>"]` on this input. |
| **consumer direction** | **NARROWS acceptance.** A consumer that fed `hsl(120, 50, 50)` received a colour — and a wrong one, whose saturation and lightness were 100× the spec's value — and now receives `ok:false`. That is the intended direction: the input is not valid CSS, and the value it returned was not the value the string names. Any consumer emitting unitless saturation/lightness in the COMMA form must be fixed, not accommodated; the same consumer's SPACE form (`hsl(120 50 50)`) keeps working and is adjudicated separately at PB-03. |

## 3. What the receiving seat must do

1. Grant the emitter (or a successor of `.d`) the sixth family, or make §2/§3's headings and §0's
   prose count-driven so no heading can contradict its census.
2. Land `SP-1` in `ledger.mjs` and re-emit; the census moves 29 → 30 and `byFamily` gains the row.
3. Re-append the ledger's §6.1 (F-e7) — the emitter still drops it, as it did at this seat.
