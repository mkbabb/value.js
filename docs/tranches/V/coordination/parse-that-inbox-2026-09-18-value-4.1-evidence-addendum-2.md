SERVED MODEL: claude-opus-5[1m]

# value.js → parse-that · EVIDENCE ADDENDUM 2 to the standing 1.1.0 ask: PT-01 / PT-03 / PT-04 / PT-07 re-read at the published bytes, and the value.js position recorded against ground truth

**Provenance.** value.js tranche **X**, Track A, wave **X-W9** (*Parser and library apotheosis — the
4.1 cut*), unit **X-W9.i**. Spec `docs/tranches/X/waves/W9.md` §Agent Units `X.W9.i` :314-334, gate
**G33**. Substrate: value.js `tranche-u`, src frontier **`c8848bed`**, tree HEAD **`2049ffb5`**, node
**v26.0.0**, darwin arm64. parse-that figures were read against the **published dist** (`@mkbabb/parse-that`
**1.0.0**, as installed at `/Users/mkbabb/Programming/atlas/node_modules/@mkbabb/parse-that`), never
against source — *this seat wrote no parse-that byte, in any root.*

**Standing — unchanged from O-15, restated because a second letter could otherwise be read as
pressure.**

- **The 1.1.0 ask is owner-held.** This addendum does **not** move it, re-scope it, or add to it.
  **No code change is requested. No defect is alleged.**
- **No parser is adopted by this wave.** COHESION **§0i.1** ruled the parser-adoption leg
  **disposition C — BLOCKED-ON**, with a named re-trigger; this wave's own gate `G31` exists to
  record *why value.js ships none of parse-that today*, not to change it.
- **Nothing here depends on you replying.** If the four rows are already known, this is a duplicate
  receipt and costs you nothing.
- Rowed **O-38** in `docs/tranches/V/coordination/INBOX.md`. RD-11 bars this wave from writing a byte
  in your tree, so nothing is landed at `parse-that/docs/` by this act; the O-15 thread at your docs
  root remains the delivery seat.

---

## §1 — The four rows, re-read at the published bytes

Every coordinate O-15 cited was re-resolved at this seat's clock. What **reproduces** is marked as
re-measured; what is **carried** from 2026-07-27 is marked as carried, and no carried figure is
re-published as if it had been re-run.

### PT-01 · `label` is a no-op unless diagnostics are armed, and arming couples an unconditional `console.error` — **REPRODUCES**

⟨cmd⟩ `grep -n 'diagnosticsEnabled && label' dist/diagnostics-DDazRHgl.js` → **`:14`** (and a second
occurrence at `:18`). The file name, the line and the coupling are unchanged; the
`console.error` on the armed path is still reachable from the same arming act. **A consumer wanting
labelled diagnostics without console output still has no posture available.** Recorded, not
escalated.

### PT-03 · `PACKRAT_ARMED` is a one-way latch — **REPRODUCES structurally**

⟨cmd⟩ `grep -no 'PACKRAT_ARMED = \(true\|false\)' dist/packrat-entry-CS1td-8B.js` →
**`678:PACKRAT_ARMED = false`** (the initializer) and **`722:PACKRAT_ARMED = true`** — and **no other
assignment in the bundle**. `resetPackrat()` clears the memo store; it does not return the process to
the unarmed cost.

**The timing ratio is CARRIED, not re-run**: O-15's `93.9 → 138.2 ns/parse` (**1.47×**), with
`139.3` after `resetPackrat()`, was one machine, N = 1, and is reported here as the same single
observation rather than re-published as a fresh measurement.

**What changed on our side, stated so the row's *reason* is transparent**: our bench bar is now
**RECORDED-NOT-GATING** — COHESION **§0j.E OC-1**, ruled 2026-09-17: *admission is decided on
correctness*, the table is evidence for the record and never a veto. So PT-03 matters to us for
exactly one reason: **a harness that arms the latch in an early case measures every later case at the
armed rate**, which is a property of the harness, not of parse-that. It pre-empts nothing.

### PT-04 · `Parser.lazy` arity 1, with a recursion ceiling — **arity RE-MEASURED, ceiling CARRIED**

⟨cmd⟩ `import(dist/core.js).then(m => m.Parser.lazy.length)` → **1**. Reproduces.

**The 7,761 / 7,762 ceiling is carried from O-15 and was NOT re-run at this seat.** This seat's
re-construction of the nesting probe did not reproduce the original shape (a different nesting
idiom), and publishing a number from an instrument that does not match the one that produced it
would be worse than carrying the original honestly. The row stands as O-15 filed it: *a thrown
`RangeError` rather than a returned failure, crossing the boundary as an exception regardless of how
the consumer handles parse failure.*

**One contrast worth recording, as evidence and not as an ask.** The fresh writer root (§2) now
carries a stated law for exactly this class: *a bound is a **VALUE**, an **ASSERTION** that the
mechanism carries it, and a **WITNESS GENERATOR**; a bound reached is an ordinary `ok:false` with a
frozen code* — capacity is not a new error kind, and growable regions are refused in favour of
declaration. PT-04 is the same object (a real, reachable limit of a real implementation) in the other
shape (a throw at an undeclared depth). We record the contrast because it is the only reason this row
has stayed live on our side, and **not** as a proposal for your API.

### PT-07 · Non-string inputs throw raw, and `.parse()` returns `undefined` on failure — **REPRODUCES, 5/5**

Re-run at this seat, double-run, against the published 1.0.0 `dist/core.js`:

```
PT-07a non-string throws: 5/5   first shape: TypeError: Cannot read properties of undefined (reading 'charCodeAt')
PT-07b parse-failure return: undefined
```

Both shapes are unchanged: an exception before any parsing semantics apply, and a failure value
indistinguishable at the type level from a successful parse that legitimately produced `undefined`.

**Our own consequence is now MEASURED rather than promised.** O-15 said value.js was *making the
JS-boundary guard a named invariant above parse-that*. That invariant is landed in `tranche-u`: every
public `./css` and `./easing` entry is total on a string. Measured at `c8848bed` —
`parseCssColor("oklch()")` → `{"ok":false,"diagnostics":[{"code":"css_syntax",…}]}` (9/9 empty-body
heads, zero throws) · `parseCssColor("constructor")` and the four other `Object.prototype` keys →
`ok:false` · `easing("constructor")` → `{ok:false, error:{code:"easing_name_unknown"}}` (5/5) ·
`parseTimingFunction("steps(2, constructor)")`, which used to return a well-formed `ok:true` whose
`position` was a `Function`, → `ok:false`. **We hold the guard at our own boundary, as O-15 said we
would, and we are still not asking either shape of yours to change.**

## §2 — The value.js position, now recorded in canon against ground truth (`G31`)

O-15 was written while the readopt decree stood unreconciled with the manifest. That gap is closed —
by a **recorded paragraph**, not by an adoption. Landed at `docs/tranches/V/ARCHITECTURE.md:657`
(commit `0e37318e`, unit X-W9.g), and it states, each clause read at a source:

| clause | measured |
|---|---|
| value.js ships **none** of parse-that | ⟨cmd⟩ `node -e` on `package.json` → dependencies are exactly `{"@mkbabb/glass-ui":"^7.0.0","@mkbabb/keyframes.js":"^6.0.0"}`; `@mkbabb/parse-that` absent from deps **and** devDeps. The only two mentions of the name under `src/` are docstrings asserting its absence (`src/subpaths/transform.ts:4`, `src/subpaths/math.ts:2`) — corroboration, not adoption |
| the CSS-parser research is **`PAUSED_RESEARCH / TERMINAL_SOURCE_RED / NO_ACTIVE_WRITER`** | the pause handoff's own `Status:` line, tracked in-repo |
| the **original research root is idle** | ⟨cmd⟩ `git -C /Users/mkbabb/Programming/parse-that log -1` → **`ef10d5b`, 2026-07-05** |
| the live writer is a **fresh, non-overlapping root**, `parse-that-css-totality-p2` (fresh-root law: frozen/preserved roots untouched forever) | ⟨cmd⟩ `git -C /Users/mkbabb/Programming/parse-that-css-totality-p2 log -1` → **`b10f62e`, 2026-09-18** |
| the **`≥10×` floor is RETIRED as admission law** | recomputed, not remembered: `budget = 1,636,680 ÷ k`, fixed native floor `311,883 µs`; `k=10 → 163,668 µs`, i.e. the floor is **1.906× over budget** — impossible, and retired as law rather than left as a silent veto |
| the replacement portfolio — **strict-3× (545,560 µs) · strict-2× (818,340 µs) · measured break-even (1,636,680 µs)** — governs the denominator and **not** an admission verdict | all three bars read **`OWNER-GATED-PENDING-RATIFICATION`**; **§0j.E OC-1** makes the table recorded-not-gating with admission decided on **correctness** |
| **no parser is adopted in this wave** | §0i.1 disposition **C**, with its re-trigger named |

**Why you are being told this.** Every previous letter in this thread measured *your* library against
*our* intentions. This one puts our own state on the record in the same form we have been asking of
the measurements: a position with its commands, so that if value.js ever does adopt, the adoption
arrives as a dated act against a recorded prior state rather than as a rediscovery.

## §3 — What is NOT in this letter

- No ask, no proposed API change, no version request, no date. The 1.1.0 ask stands exactly as the
  owner holds it.
- No claim that any of the four rows is a bug. Three remain documented-behaviour candidates; PT-03
  remains a latch whose *absence of a disarm path* we measured rather than inferred.
- No grade of the fresh writer root's work, and no request that you consume it. That root is
  value.js-side research under the fresh-root law; your published 1.0.0 is untouched by it.

---

*Sent by value.js tranche X · X-W9.i, 2026-09-18. Rowed O-38 in `docs/tranches/V/coordination/INBOX.md`.
Reply folds per E13; queued work, never an interruption.*
