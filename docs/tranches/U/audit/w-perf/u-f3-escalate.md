# U-F3 · Q14 LCP REDEMPTION — the structural fact handed to the owner (the DISEASE/RP-2 escalate)

**Wave**: U.W-PERF · **Lane**: perf-lcp-escalate (the U-F3 escalate) · **Family**: U-F3
(`q14-perf-redemption-uncloseable`) ONLY · **Date**: 2026-07-13 · **Mode**: DOCS-ONLY, planning-record;
this document **decides nothing** — it presents the structural fact and BOTH bracket poles for the
owner's ruling.

**Gate**: G-PERF-3 (`U.W-PERF §Hard gate`) — mobile LCP ≤ 2500 at the LHCI ratified instrument, born
**ARMED-RED**. This document is the **RECORD half** of that gate: the escalate as a ruled disposition,
not a green flip and not a deferral.

**Precedence chain** (restated; downstream never overrides upstream): the owner's verbatim Q14 ruling
(`RATIFICATION-2026-07-09.md §1`: *"Accept no failures — divine a proper and idiomatic fix. No
compromises."*) → `audit/registry.md §1/§10/§26` → `U.md` → `U.W-PERF.md` → this lane record. Above
all, the owner's word: **the gate is NOT edited — no re-baseline, no preset-swap, no deferral** (E-3).

---

## §1 · The verdict, one line

**Mobile LCP stays HONESTLY RED at the ratified instrument (~4919 local / 5141 CI vs the ≤ 2500 budget,
~2× over) → G-PERF-3 is the DECIDED escalate, not green.** Value.js has spent every idiomatic lever it
owns; the residual is the **producer payload half** (RP-2 331.0 KiB JS-eager), and that lever is gated
on the **UNFIRED glass-ui 5.0.0 adopt** — structurally unreachable by value.js alone inside this window.
The disease-row law is satisfied by presenting the owner the fact + both poles (§5), independent of
whether the producer cut fires in-window. **No gate is weakened.**

---

## §2 · Every in-scope value.js cure has LANDED (the library has spent its levers)

The Q14 redemption splits into a **paint/reveal chain** (value.js owns) and a **payload floor**
(producer owns). The value.js-side chain is COMPLETE — each cure measured and attributed in the PI-1
delta ledger (`docs/tranches/T/audit/pi1-delta-ledger.md`, the tracking instrument of record):

| # | Landed cure | Wave / ledger row | Measured effect (at the LHCI instrument) |
|---|---|---|---|
| 1 | **Reveal-only law** — the LCP element (the picker plate) reveals with opacity pinned to its settled box, not gated behind the animation | W2 (ledger `:43`) | O-24 built-bundle **light 2484 → 2128 ms (−14%)**, same-instrument before/after; LCP identity converged on the picker plate (both schemes, opacity pinned 1) |
| 2 | **Google-Fonts strike** — self-hosted; **0 cross-origin font requests** | W2 (ledger `:43`) | zero blocking cross-origin font round-trips on the critical path |
| 3 | **Hydration-first** — the SPA hydrates before the deferred richness mounts | W2 (ledger `:43`) | the paint no longer waits on the full component tree |
| 4 | **KaTeX lazy** — the global-import cure made katex a lazy chunk, off the boot path | W8 (ledger `:49`; W9 close `:51`) | `vendor-katex-*.js` **not modulepreloaded** (confirmed in `index.html`) |
| 5 | **Root-barrel ×10 → subpaths** — `@mkbabb/value.js` root-barrel imports swept to subpath imports | W6.5 Lane-M (ledger `:47`) | grep ZERO root-barrel imports; chunk-graph-neutral |
| 6 | **CLS pane-shell / `--dock-band-min-h` reservation** — the mount box reserved so the pane mount does not shift layout | W8 (ledger `:49`; W9 close `:51`) | CLS within budget — **not the binding red** (LCP is) |

**The read (ledger `:43`, `:51`):** the reveal-only cure DID land and proved its −14% same-instrument
delta — but **LCP ≈ FCP**: the paint is gated on first paint, not on the reveal. FCP ≈ **4.3 s** ≈ the
LCP floor. The reveal cure cannot reach a floor that is set by the eager payload's parse/compile/mount
before first paint. **Every non-producer-coupled lever the demo owns is spent.**

---

## §3 · The residual is the PRODUCER PAYLOAD HALF — the physical blocker, named

The LCP floor is a **single physical fact**: the demo's **eager WebGL blob/aurora engine** (the aurora
+ goo-blob shader runtime) is statically imported into the **184.9 KiB boot entry** (`index-*.js`) and
parses, compiles its shaders, and mounts a continuously-animating WebGL2 context **before first paint**.
That is the **~505 ms blob-engine-mount task** (the W6.5 Lane-M forensic: *"the ~505ms wall is
forensically the BLOB ENGINE MOUNT alone"*, ledger `:47`) sitting on the critical path, holding
FCP ≈ LCP at ~4.3 s.

**The eager-JS payload at the T close-of-record** (`T/FINAL.md §3`:227 / §5:291; W9 close `:51`):

| Chunk | gz | Note |
|---|---|---|
| `index-*.js` (demo entry) | **184.9 KiB** | **carries the eager WebGL payload** — 66 shader-source markers + 53 aurora/blob/HeroBlob/`revealBloom` hits; the SPA statically imports the blob+aurora runtime into the boot entry (**RP-2 eager-mount**) |
| `glass-ui-*.js` | 108.9 KiB | producer component library (0 WebGL markers) |
| `useDocumentVisibility-*.js` | 34.9 KiB | @vueuse cohort |
| `createLucideIcon-*.js` | 1.6 KiB | icon factory |
| `rolldown-runtime-*.js` / `prng-*.js` | 0.6 KiB | runtime + prng |
| **RP-2 total** | **331.0 KiB gz** | vs the **≤ 280** budget — **RED**, +51 KiB / ~1.18× over |

**RP-2 = eager JS 331.0 KiB gz > 280** — the T close-of-record (`T/FINAL.md §3`:208, `:227`; §5:291).
The 347.9 KiB figure was the superseded S re-baseline (directionally lower, NOT cleared); RP-2 now rides
its **THIRD tranche** (the blob-halves book lineage → the disease row).

**The LCP reading at the ratified instrument** (§7 for provenance): **~4919 ms local / 5141 ms CI** vs
the `lighthouserc.json:13` budget **2500** → **~2× over, RED**. **Instrument parity noted** (registry
§10): this is the reconciled read at the LHCI ratified instrument (compressed `staticDistDir`, mobile +
simulate) — **NOT** the false **11085 ms** uncompressed-serve artifact (~2.2× inflated, wrong
transport), which R-1 corrected.

---

## §4 · Gated on the UNFIRED glass-ui 5.0.0 adopt (the levers are already dispatched)

The eager engine becomes lazy-mountable **only once the producer ships the split** — value.js cannot
make the WebGL engine lazy without deleting the hero, and a demo-side shader fork is fence-forbidden
(glass-ui-first). The producer levers are **ALREADY DISPATCHED** in the landed formation communiqué;
this wave cites them **BY NAME, authoring no new addendum** (M1 / E-2 — the value.js-side record IS the
gate; an ack is a bonus, never waited on).

**Communiqué of record** (READ-ONLY; cited by PATH + ROW NAMES, never by SHA line-integers into the
concurrently-moving foreign tree):
`../glass-ui/docs/tranches/BH/coordination/valuejs-inbox-2026-07-12-u-formation.md`

| Producer lever (cited by name) | Communiqué row | What it unblocks |
|---|---|---|
| **L20 `/blob/config`** subpath (goo-blob → `/blob`) | §3 (the 5.0.0 + parseCSSValue-reshape co-land) | the HeroBlob **eager-config / lazy-engine split** — import the lightweight config eagerly, DEFER the heavy WebGL engine off the boot critical path. **This is the RP-2 anchor.** |
| **GAP-L5** (goo-blob) — the `settled` seam + **single-WebGL2 collapse** + HERO preset + `lightnessFloor` | §2b (T-producer reds carried forward; the GAP-L5 row) | lets one WebGL2 context serve the field and lets the consumer defer/quiesce the engine instead of eagerly arming it; anchors the Q14 RP-2 clear |
| the `/parsing`-subpath **scroll()/view() grammar TAIL** dead-payload split | (library-side; T.W6.5 Lane-M row, ledger `:47`) | trims boot-eager grammar the URL-color hydrate does not use — the *only* residual lever value.js itself owns, but chunk-graph-minor next to the engine defer |
| **the `mixColors` convention coupling** (spectrum-walk / backward-color) | §1 (freshest, most urgent) | NOT a PERF surface — flagged for completeness; its RELAY is U.W-LIB / U.W-ADOPT's, not this wave's (PERF touches no color-convention surface) |

**The amended gate law** (SYNTHESIS §6.2 / T.W7 P-3): *"L20 + GAP-L5 must land TOGETHER or the
re-baseline carries a third tranche."* They have not landed together (the trigger is unfired) → the
re-baseline carries a third tranche. **The blocker in one sentence:** the demo cannot make the eager
WebGL engine lazy until glass-ui 5.0.0 ships the `/blob/config` eager-config / lazy-engine split, and
that cut is **user-gated with no v5 tag** — so the RP-2 clear (and the LCP floor it gates) is
structurally unreachable by value.js alone.

**Adopt state, verified live (2026-07-13):** `git -C ../glass-ui tag --list 'v5*'` is **EMPTY** — no
v5 tag. The 5.0.0 is 5.0.0-in-tree (npm still `4.2.0`), **USER-GATED**; the T.W7 / U.W-ADOPT adopt
trigger is **UNFIRED**. So the RP-2 producer payload cut **CANNOT land in-window** as this record is
filed → G-PERF-3 stays ARMED-RED and U-F3 is a PURE escalate this wave.

**SHA-drift note** (mirroring the A11Y-close discipline, `w-a11y-close-artefacts.md §Boot-drift note`):
the communiqué file LANDED at glass-ui HEAD `17e0f522` (registry §29 / §28.3 RELAY DISCHARGED); its own
dispatch-stamp records the T-producer state `051e6957`; the live glass-ui HEAD has since advanced to
**`9feed5e1`** (a co-land preview notice). This lane cites the communiqué by PATH + row names precisely
because the foreign tree moves — no SHA line-integer is threaded into it. No new addendum is authored.

---

## §5 · THE ESCALATE BRACKET — the owner's ruling (this lane DECIDES NOTHING)

The disease-row law hands the owner the fact and BOTH poles; it does not permit a unilateral re-scope.
Both poles are presented; the owner rules.

### Pole A — cut-in-window

The producer payload cut lands **inside U's window** at the glass-ui 5.0.0 adopt (U.W-ADOPT fires):
L20 `/blob/config` eager-config/lazy-engine split + GAP-L5 single-WebGL2 collapse / `settled` seam land
together, the demo defers the eager WebGL engine off the boot critical path, RP-2 clears ≤ 280, FCP
drops off the ~4.3 s eager-mount floor. **G-PERF-3 flips GREEN at the same instrument** (LHCI,
compressed static-dir, mobile + simulate). PERF (Lane 1) **measures + records** the delta in the PI-1
ledger (the after π-frame + the RED→GREEN DELTA, `U.W-PERF §π/DELTA obligations`).

### Pole B — owner-ruled re-scope

The owner rules a **documented physical-blocker escalation** in the PI-1 W9 row — the triumvirate-level
owner escalation the ledger already reserves (`pi1-delta-ledger.md:19-20`, `:51`). The LCP stays
HONESTLY RED, the blocker is **NAMED, not swallowed**; **no gate is weakened, no re-baseline, no
preset-swap, no deferral** (Q14 verbatim). The escalate is the ruled valid close (PP-16 →
`complete_with_misses`).

**The disease-row LAW is satisfied by the DECISION** (escalate HERE, with the structural fact filed +
the payload lever BI-acceptance-relayed by name), **independent of whether the cut fires in-window**.
Neither pole edits the gate.

---

## §6 · G-PERF-3 ARMED-RED declaration + the W9/U.W-CLOSE booking (by name)

**G-PERF-3 — mobile LCP ≤ 2500 (LHCI ratified instrument): born ARMED-RED, stays RED this wave.** It
flips GREEN **ONLY** when (a) the adopt-gated producer payload cut lands in-window (Pole A) **OR**
(b) the owner rules a documented re-scope (Pole B). **NEVER by a gate edit** — `lighthouserc.json:13`
budget 2500 is untouched (this lane does not open that file). The escalate is a **DECISION, not a
flip**: the gate is satisfied-as-decided the moment U-F3 is filed with the structural fact + the
by-name-relayed lever + the booking below.

**Booked BY NAME to W9 / U.W-CLOSE** (`U.W-PERF §BOOKS`; the close gate is GREEN-or-escalation,
`U.md §Mission`, registry §26 "W9's Q14 inherits U-F3/F14/F16"):
- **the Q14 LCP adjudication** → W9 / U.W-CLOSE (the close ledger flags the LCP as attested/escalated);
- **the cut-execution residual** (if the producer cut does not fire in-window) → U.W-CLOSE, closing
  **`complete_with_misses`** (PP-16).

**Never re-booked to a successor tranche** — the disease-row law binds: U-F3 is **DECIDED HERE**. If the
adopt fires within U, Pole A resolves it in-tranche; if not, Pole B is the ruled in-tranche close. The
RP-2 payload lever's *landing* rides U.W-ADOPT's BI-acceptance (already dispatched), but the DECISION on
U-F3 does not ride out of U.

---

## §7 · The LCP reading cited + its provenance (single-run discipline honored)

**No second LHCI was run** (probe-parsimony, owner edict 2026-07-12). Lane 1 (perf-cls) runs the LHCI
instrument; its captured artefacts under `docs/tranches/U/audit/w-perf/pi/` were **ABSENT** at this
filing (the lanes run concurrently). Per the lane instruction, this record therefore cites **registry
§10's reconciled numbers with their provenance** — not a duplicate run:

- **LCP ~4919 ms local / 5141 ms CI** vs the ≤ 2500 budget (~2× over, RED). Registry §10 (line 144)
  phrases the local read as ~4951 ms; the **W2 local-lab LHCI median is 4919** (`pi1-delta-ledger.md:43`,
  the 3-sample spread 5812/4907/**4919**) — the same reconciled read within the run-spread. Both agree
  on the CI median **5141** (`:44` W2/W3 CI confirm 6138/5152/5151; `:45`/`:49`/`:51` W4/W8/W9 close
  median 6850/5156/**5141**).
- **Provenance — the R-1 uncompressed-serve reconciliation** (registry §10): the round-1 **11085 ms**
  mobile LCP was an uncompressed-serve artifact (~2.2× inflated, wrong transport). At the true gate
  instrument (LHCI, compressed `staticDistDir`, mobile + simulate) the read is ~4919 local / 5141 CI.
  Direction (producer-coupled, uncloseable by value.js alone) **STANDS**; magnitude WEAKENED
  (11085 → ~5141) but still ~2× over the budget. **A number measured off-instrument is not a gate
  reading.**
- **The blob-RAF hang is itself the escalated blocker's manifestation** (ledger `:51`; the T.W9
  close-escalation §2b): the in-session dynamic re-measure at T close hung because the eager WebGL blob's
  continuous RAF render defeats Lighthouse's CPU-quiet window detection under 4× throttle — the page
  never settles. This lane does **not** re-attempt that run; the never-settling eager payload is the very
  fact being escalated.

---

## §8 · PI-1 W9-row HANDOFF (single-writer bridge — the CLOSE scribe appends this)

This lane does **not** write `pi1-delta-ledger.md` (Lane 1 owns it; the ledger's schema-extension —
e.g. U-F16's CLS row/column — is Lane 1's). This is the **exact row content** for the CLOSE scribe to
append to the ledger's U-side close, in the existing 6-column schema (`Wave | Run | LCP | TBT | Δ vs
baseline | Notes`):

> | Wave | Run (id / sha) | LCP (ms) | TBT (ms) | Δ vs baseline | Notes |
> |------|----------------|----------|----------|---------------|-------|
> | **U.W-PERF / U.W-CLOSE (U-F3 escalate — the tranche-U inheritance close)** | dynamic run-of-record = the standing W8 CI gh-pages row `6d95871` (LHCI compressed, mobile+simulate); ~4919 local / 5141 CI reconciled (registry §10 / R-1); **no fresh LHCI run** — probe-parsimony, and the blob-RAF hang is the escalated blocker's own manifestation | **5141** (6850/5156/5141) — the CI floor, unchanged (~4919 local); ≤ 2500 budget → **RED ~2× over** | **5988** (7025/6332/5988) — CI floor unchanged; the 2-core CI-only red is re-homed to U-F61 → G-CLOSE-3 (local TBT 187 GREEN) | LCP FLAT vs T-W4/W8/W9 (NOISE < PP-10 30%) — no wave moved the eager payload, so no wave moved the floor | **G-PERF-3 ESCALATE (the ruled valid close; `w-perf/u-f3-escalate.md`).** Every in-scope value.js cure spent (reveal-only law W2 −14% O-24 · Google-Fonts strike W2 · hydration-first W2 · KaTeX-lazy W8 · root-barrel ×10→subpaths W6.5 · CLS `--dock-band-min-h` reservation W8, within budget/not the binding red). Residual = the **producer payload half**: **RP-2 331.0 KiB gz JS-eager > 280** (the eager WebGL blob/aurora engine in the 184.9 KiB boot entry mounts before first paint — the ~505ms blob-engine-mount task; FCP ≈ 4.3s ≈ LCP floor). **PRODUCER-GATED, unfired:** glass-ui 5.0.0 L20 `/blob/config` eager-config/lazy-engine split (RP-2 anchor) + GAP-L5 single-WebGL2/`settled` seam — *"land TOGETHER or the re-baseline carries a third tranche"*; **no v5 tag** (`git -C ../glass-ui tag --list 'v5*'` EMPTY 2026-07-13), USER-GATED, adopt UNFIRED → cannot land in-window. Levers already dispatched by name in the communiqué (`valuejs-inbox-2026-07-12-u-formation.md` §3 co-land / §2b GAP-L5), no new addendum. **Escalate bracket presented (owner rules): Pole A cut-in-window flips G-PERF-3 GREEN; Pole B owner-ruled re-scope (this row).** No gate weakened, no re-baseline, no preset-swap, no deferral (Q14 verbatim). DECIDED here (disease-row law) — NOT re-booked to a successor tranche. PP-16 → `complete_with_misses`. |

**Note for the scribe**: if U-F16's arm-2 CLS-column extension lands first (Lane 1's write), append the
CLS cell **≤ 0.1 (within budget — not the binding red; LCP is)** to this row in the extended schema.
The LCP/TBT cells above are the U-F3 escalate's authoritative content.

---

## §9 · Provenance / cross-refs

- **Gate ruling**: `RATIFICATION-2026-07-09.md §1` (Q14 verbatim — no re-baseline, no deferral) ·
  `U.W-PERF.md §Hard gate` (G-PERF-3 ARMED-RED) · `U.W-PERF.md §Scope U-F3` (the escalate bracket).
- **The registry of record**: `registry.md §1` (the U-F3 row) · `§10` (the R-1/verify verdict —
  U-F3 magnitude WEAKENED, direction STANDS; the 11085→5141 instrument-parity reconciliation) · `§26`
  (W9's Q14 inherits U-F3/F14/F16) · `§28.3`/`§29` (RELAY DISCHARGED at glass-ui `17e0f522`).
- **The tracking instrument**: `pi1-delta-ledger.md` — the value.js-side cures with row cites (W2 `:43`,
  W2/W3 `:44`, W4 `:45`, W6.5 Lane-M `:47`, W8 `:49`) + the T-tranche W9 close-escalation row (`:51`)
  this record inherits. The ledger's W9-row append protocol (`:53-59`) is the single-writer bridge (§8).
- **The T close-of-record**: `T/FINAL.md §3`:208/`:227` (RP-2 331.0 KiB > 280) / §5:291 · the T.W9
  close-escalation (`T/audit/pi/w9/q14-close-escalation.md` — the sister document; §3 the physical
  blocker, §3a the producer levers, §4 the RP-2 third-tranche carry).
- **The producer levers (already dispatched, cited by name — no new addendum)**: the communiqué
  `../glass-ui/docs/tranches/BH/coordination/valuejs-inbox-2026-07-12-u-formation.md` (§3 the 5.0.0 +
  parseCSSValue-reshape co-land · §2b GAP-L5 · §1 the mixColors-convention coupling). Landed at
  glass-ui HEAD `17e0f522`; live HEAD advanced to `9feed5e1` (SHA-drift flagged, §4).
- **Instrument parity** (load-bearing): every G-PERF-3 number is a reading at the LHCI ratified
  instrument (`lighthouserc.json`, compressed `staticDistDir`, mobile+simulate) — NEVER the uncompressed
  11085 ms artifact. The dist perf gate `proof:perf-target` (U-F14, Lane 2) is a DIFFERENT instrument
  (Node bench vs LHCI) — never conflated with the CWV budget.

---

**Restated, one line**: value.js has spent every idiomatic LCP lever it owns (§2); the residual is the
producer payload half (§3), gated on the unfired glass-ui 5.0.0 adopt (§4); G-PERF-3 is ARMED-RED and
the escalate is the DECIDED terminal state (§6), with both bracket poles presented to the owner (§5) and
the W9-row content handed to the close scribe (§8). This lane decides nothing; the owner rules.
