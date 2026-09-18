# WL — Library evolution (lane, parallel post-W43)

**Absorbs:** registry families RF-17 (KF covenant §B/§C/§D/§E/§I) and RF-27 (atlas/SCI SCI-1/2/3),
plus the KF↔value bilateral-formation covenant (RF-19).
**Depends-on:** W43 (settled src tree). A parallel LANE, not a blocking wave — runs alongside
W44/W45; never waits on glass. Nothing here touches immutable Value 4.0.0; every row targets the
NEXT value cut (4.1.x additive or 5.0.0 breaking).
**Named refs (L3, ≤2):** `V-PRIME.md` (§2 WL row, L6/L7) · `audit/REFORMATION-2026-07-16.md`
(RF-16 comms-map landing paths, RF-17/RF-19/RF-27 row evidence). Landing paths are inlined below.
**Worktree:** docs/coordination worktree — this lane DECIDES and writes bilateral letters; it lands
no library source (a shipped decision opens its own future implementation wave on the next cut).

## What this lane is

A per-row DECIDE ledger over the sibling library-evolution inputs. Each row resolves to exactly one
of **ship-4.1** (additive, non-breaking minor), **ship-5.0** (breaking → next major), or
**decline-with-rationale**. The lane CLOSES only when every row carries a decision AND its verdict
has returned in the bilateral letter to the requesting sibling (L7: relay-SENT is never a terminal
state — the letter must land). Confirmed-shipped rows still owe an explicit "already in 4.0.0" answer.

## Current state (born-open; why this lane exists)

The sibling asks are live, UNANSWERED obligations against the next value cut. keyframes.js runs its
own V-formation in parallel (RF-19: same 32-agent charge; their `docs/tranches/V/` holds
`KF-TO-VALUEJS-U.md` §B–§I and expects a reciprocal `VALUEJS-*` letter). atlas/sci-report crossed
cleanly to value-4 (one round, four commits, zero shims) and returned three ranked findings that
target the NEXT cut. RF-16 tables 9 open cross-repo obligations; none of the 8 rows below has a
written verdict or a landed return letter today — that is the falsifiable RED this lane clears. No
row may reopen immutable 4.0.0; 4.1.x is additive-only, 5.0.0 is the breaking bucket.

## DECIDE table

### KF covenant (RF-17) — from `KF-TO-VALUEJS-U.md` §B–§I

| Row | Ask | Evidence / state today | Options |
|---|---|---|---|
| **§B** `parseTimingFunction` on `/easing` | KF wants the timing-function parser reachable | ALREADY SHIPPED: `/css` exports `parseTimingFunction` (`src/subpaths/css.ts`); `/easing` is parser-free by ARCHITECTURE §2 (`linearEasing` consumes the numeric used-value type, imports no `/css` AST) | verify + answer: confirm `/css` ownership is the covenant answer; **decline** moving it to `/easing` (parser-free boundary) |
| **§C** `unflattenObject` | KF asks whether the authored-plain unflatten API ships | ARCHITECTURE §2: `plain-vars.ts`/`PlainProjection`/authored-plain `unflatten` all DISAPPEAR; keyframes owns the SoA `InterpSlot` | **decline-with-rationale** (concept deleted; keyframes owns projection) — or ship-5.0 if a real consumer survives the census |
| **§D** diagnostics taxonomy | diagnostics-bearing parse + layout-tracking taxonomy | `ParseResult<T>` diagnostics protocol + `isLayoutTrackingUnit` closed table already in 4.0.0 (`/css`, `/value`) | verify + answer: confirm the shipped taxonomy; **ship-4.1** only if KF needs an additional exported code |
| **§E** `CSSPropertyDescriptor` rename (KF-7) | rename bare `PropertyDescriptor`→`CSSPropertyDescriptor` (breaking) | ALREADY DONE: 4.0.0 `/css` exports `CSSPropertyDescriptor`; bare name absent (ARCHITECTURE §2) | verify + answer: confirm shipped in 4.0.0; the breaking rename already landed — no 5.0 needed |
| **§I** D-GAP-6 (the sole survivor of D-GAP-1/5/6) | bezier data sampler / `cubicBezierToSVG` — neither in any 4.0.0 d.ts nor formally declined in any ledger | The V-era KF packet (`coordination/keyframes-inbox-2026-07-17-v-formation.md` §3, INBOX I-6) SUPERSEDES the U-era gap cites: **D-GAP-1 (quart/quint bezierPresets) DELIVERED in 4.0.0** — accepted with thanks, no row owed; **D-GAP-5 retired-superseded** by KF themselves (no public flatten post `./units` removal) — ACK only; D-GAP-6 is the ONE live ship-or-decline request (KF keeps local curve-data authoring meanwhile; nothing blocks). Their W12 records the answer | ONE ruling: ship-4.1 / ship-5.0 / **decline-with-rationale**; the verdict letter also ACKs D-GAP-1/5 closure + records the FAM-14 negative result (no Value-4 registry gap — all five scene errors keyframes-side) |

### Atlas / SCI-report (RF-27) — from `ATLAS-INBOUND-2026-07-16-consumer-crossing-report.md` §1

| Row | Ask | Evidence / state today | Options |
|---|---|---|---|
| **SCI-1** `mixColorsInto` zero-alloc | `mixColorsInto`/`toRgba8-into` did NOT survive to 4.0.0; SCI's densest canvas tier mixes ~3,243 marks/frame allocating each mix | zero-alloc into-variant gone; `mixColors` returns `Result<Color<S>,…>` (allocates) | **ship-4.1** an into-variant (`mixColorsInto`/`toRgba8Into`) OR bless a documented hot-path idiom (decline the API, answer with the blessed pattern) |
| **SCI-2** clamp-option vs consumer-clamp | `mixColors` ERRORS on `progress ∉ [0,1]`; SCI clamps consumer-side | ARCHITECTURE §2: `mixColors` rejects out-of-`[0,1]` progress by contract | **rule** it: add an explicit clamp option (ship-4.1) OR bless consumer-clamp as the law (decline, with the rationale that raw-by-contract is intentional) |
| **SCI-3** validated-literal `CubicBezier` | fallible `CubicBezier` makes compile-time-constant curves pay `Result` ceremony at module init | `CubicBezier(x1,y1,x2,y2): Result<EasingFunction,EasingIssue>` (ARCHITECTURE §2) | **ship-4.1** a validated-literal/branded path OR bless an unwrap-at-init idiom (decline, answer with the pattern) |

Notes carried census-only (no ask): ESM-only/no-require and `/easing`-vs-`/math` placement.

## Work

1. For each of the 8 rows: gather the file:line evidence against the settled 4.0.0 surface (the src
   tree after W43), pick exactly one option, and write a one-paragraph rationale. Confirmed-shipped
   rows (§B/§D/§E) still get an explicit answer paragraph.
2. Where a row ships, it names the target cut (4.1.x or 5.0.0) and defers the implementation to that
   cut's own wave — WL lands no library source, only the decision.
3. Author and SEND the DECIDE-verdict return letters at the ADOPTED landing conventions
   (DISPOSITIONS §3 + INBOX O-2 are the convention of record; RF-16's older root-path forms are
   superseded):
   - **keyframes:** `../keyframes.js/docs/tranches/V/coordination/VALUEJS-INBOUND-YYYY-MM-DD-<topic>.md`
     (their `<SENDER>-INBOUND-*`-in-`coordination/` grammar — the path their INBOUND-LEDGER
     sweeps). The formation exchange was ALREADY SENT (O-2, 2026-07-17) answering their
     `keyframes-inbox-2026-07-17-v-formation.md` / `-v-execution-open.md`; WL sends ONLY the
     covenant DECIDE verdicts (§B/§C/§D/§E/§I incl. the D-GAP-6 ship-or-decline + the
     D-GAP-1/5 closure ACKs + the FAM-14 record) — do not re-send the exchange.
   - **atlas/SCI:** value writes
     `sci-report/atlas/docs/tranches/P/coordination/YYYY-MM-DD-<topic>.md` (monorepo path — atlas is
     NOT a standalone repo; sci-report routes only via atlas).
4. The FIRST WL verdict letter also carries, as single rows: (a) RF-18's census-split
   recommendation (the ff-only FACT went out in O-2 §4.1; W40 sends nothing — this is the one
   remaining piece, sent once, never re-sent unprompted); (b) the RF-16 discrepancy question
   (standalone atlas pins value `^3.1.0` vs the monorepo P-tranche claiming the value-4 crossing
   landed) — in the ATLAS letter, not the keyframes one.
5. **RF-29 B10 hygiene note (recorded, not scheduled):** the 17 `as unknown as` tuple casts in
   v4 color math are won't-fix against immutable 4.0.0; IF any WL row ships a cut that touches
   those files, the cut's implementation tightens the casts it touches in passing — no dedicated
   work item exists.

## Completion evidence (falsifiable)

- All 8 DECIDE rows (§B/§C/§D/§E/§I + SCI-1/2/3) carry exactly one verdict (ship-4.1 / ship-5.0 /
  decline) with a written rationale; no row left "consider/later" (E9 terminal-verb law).
- Each shipped row names its target cut and defers implementation to that cut — WL touches no
  `src/` file.
- The bilateral letters EXIST on disk at the RF-16 landing paths (keyframes active-tranche dir +
  `sci-report/atlas/docs/tranches/P/coordination/`), each returning its row's verdict; the KF↔value
  reciprocal pair (RF-19) is present.
- The RF-18 ff-only recommendation (if not already landed by W40's letter) and the RF-16
  atlas-pin discrepancy each have a letter row; the B10 hygiene note is recorded.

## Discharges

RF-17 (KF covenant, per-row DECIDE) · RF-27 (atlas/SCI SCI-1/2/3) · the RF-19 bilateral-formation
exchange. Backs L6 (design/library evolution routes through the owner) and L7 (bilateral coordination
letters; relay-sent is not terminal — the letter must land).
