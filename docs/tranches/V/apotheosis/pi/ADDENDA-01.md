# V·π ADDENDA-01 — full CSS L4 · parser hardening · BBNF coordination (2026-07-20)

**Authority: owner 2026-07-20** — *"a general hardening of the parse-that based
parser, CSS L4 full implementation, and full coordination with the in-progress
BBNF codex agent."* Per **E-3** (`HANDOFF.md §1`) this is a formal scope change,
not an ad-hoc patch: its Phase-B wave set will be designed by the **triumvirate**
(research → harden → addenda-write, dispatched on the owner's begin-word), then
**twice-challenged**, then **gestalt-analyzed**, and **owner-ratified before any
Phase-B code executes**. Nothing here is running yet.

## §1 — Two phases

- **Phase A** (RATIFIED, `PI.md` W0–W7): the frozen 52-export /css surface —
  the proof-gate totality. Unchanged; executes now.
- **Phase B** (this addenda): **full CSS L4.** The 14 Surface-3 growth gaps
  that `PI.md §2e` DEFERRED to the megatranche V-registry are **pulled into π**
  — the megatranche then *consumes* a complete L4 parser instead of building
  one (extends the collision letter's SUPERSEDED-BY-CONSUMPTION to the full L4
  surface).

**Gaps pulled DEFERRED → Phase-B (the triumvirate waves & sequences these):**

| gap (coverage.md §3) | was | Phase-B home (proposed; triumvirate finalizes) |
|---|---|---|
| relative-color / color-mix / light-dark / contrast-color | V17/V19/V20 | color-L4 wave (extends W2) |
| `spring()` easing | V25 | easing-L4 (extends W3) |
| filter functions + `url()`, shapes, shadow | V23 | filter/shape wave (generic CssCall) |
| calc/math (operators, min/max/clamp, stepped/trig/exp) | V04/V05 | math wave (typed calc tree) |
| gradients & image union (radial/conic/repeating, `<image>`) | V21/V22 | image wave (generic CssCall) |
| keyframes/timeline/trigger depth | V28 | timeline-L4 (extends W3/W5) |
| media/container/supports conditions | V08 | at-rule-conditions (extends W5) |
| typed declarations / value matcher | V04/V09 | typed-value wave |
| typed selectors | V07 | selector wave |
| at-rule recovery | V09 | recovery (extends W5) |
| CSS-Syntax-L3 tokenizer | V03 | tokenizer foundation (may re-anchor the lexeme layer) |
| full transform + motion path | V24C/V24M | transform wave |
| unit algebra / typed unit classes | V05 | unit-algebra (extends W1) |
| substitution var/env/attr typed | V06 | substitution wave (extends W1/W4) |

These are largely **independent grammar modules** over W1's `numUnit`/generic
`CssCall` and W2's color core → **wide parallel fan-out** (expedite lever,
`HANDOFF.md §3`). Owner reviews the finalized wave set + cost before Phase-B
code.

## §2 — Parser hardening (cross-cutting rung, all waves)

The **R1 crash class generalized** into a standing robustness discipline:
- every /css entry is **no-throw** (returns `ok:false`, never throws) on ANY
  input — empty bodies, truncation, unbalanced delimiters, adversarial nesting;
- a **hostile/fuzz corpus per door** (H's born-RED fixture banks + generated
  mutations) is part of each wave's gate;
- **exhaustive ParseIssue-code fidelity**: every error path emits the
  spec-correct code, parity with live except the R1–R12 corrections;
- a dedicated hardening sweep at close (Phase-A W6 + a Phase-B analog).

This is E-2/E-4 work — direct implementation + oracle/fuzz verification, not a
new gate ceremony.

## §3 — BBNF coordination (owner-authorized; lifts the value-side no-contact)

Letter: `../../coordination/value-inbox-2026-07-20-bbnf-coordination.md`. The
upstream SK-V25 formation self-imposed a no-contact boundary; the **owner, who
drives both tracks, lifts it from the value side and directs active
coordination**. Substance — a **shared CSS-L4 exchange**: the spec corpus, the
grammar/AST decisions, the **R6–R12 spec-corrections**, and conformance test
vectors, so the TS mirror and the Rust bbnf engine **agree on L4 semantics**
and neither re-derives the other's conformance set. The byte-class
`StructuralIndex` idea is reimplemented TS-side **only after the perf floor is
met grammar-side** (still no engine import; still no-contact on parse-that
*source*). Owner bridges dispatch (the codex is under its own no-contact and
may not poll value's outbox).

## §4 — Governance

Phase B inherits **E-1..E-5** whole. The megatranche collision notice
(`value-inbox-2026-07-20-pi-minitranche-notice.md`) is hereby extended: the
SUPERSEDED-BY-CONSUMPTION set now covers the **full CSS L4 /css surface**, not
only the frozen 52-export subset. Nothing here authorizes megatranche execution
of any other band; π remains the sole authorized execution.

— the union-apotheosis program (root session), 2026-07-20.
