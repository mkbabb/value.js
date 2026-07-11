# T.W6.5 · Lane M record — the mechanical set (rows 11–13)

**Lane**: M (single-writer: the 10 root-barrel import sites · the boot beat files
(B2/B4 seam, W2 re-opened by writ) · the pane-card recipe). **Branch**:
`t-w6.5-lane-m` (worktree wf_cb72cb21-e13-6, cut from `tranche-t` @ `db1e3c9` —
the ROUND-4-SEALED head). **Date**: 2026-07-11.
**Commits**: `6a8458b` (row 12 codemod) · `4eadc78` (row 13a yield) · `53e72b9`
(row 13b forensic + settle-gate) · `b64c52d` (row 11 carrier) · `45dfa5f`
(row 11b prefix cure) · `5cc5eee` (row 13c — the O-11 gate-4 fixture settles
the full overture; bar unchanged).
**Probe artifacts**: scratchpad (session-local, gitignored by convention) —
`profile-before.txt` / `profile-after-v2.txt` / `rim-probe-v2.txt` +
`t45v2-{dark,light}-{cured,old}.png` + `t45adv-*` / `t45wk-*` (adversarial +
WebKit frames). Every number below is reproducible from the commands named
inline (`lane-m-profile.mjs` / `lane-m-rim-probe2.mjs` / `rim-adversarial.mjs`
/ `rim-webkit.mjs`, run against `serve-built.mjs` on lane ports 8672/8673).

---

## Row 12 — the 10 root-barrel imports → re-homed (grep ZERO) + THE HONEST MEASUREMENT

**Landed** (`6a8458b`): all 10 `from "@mkbabb/value.js"` sites re-homed — 7
`debounce` sites onto the demo's one `debounce` (`demo/@/utils/utils.ts`;
trailing-edge + `.cancel()`, semantics identical, the unused `immediate:false`
third arg dropped at 6 call sites) · 3 rAF sites (SpectrumCanvas ·
useGamutOverlay · PerceivedSpacePlate) onto the native window globals (the
library wrapper delegates to them in every browser; the standing in-tree
pattern). **`grep -rn 'from "@mkbabb/value.js"' demo/` = 0** — structural: no
future root-barrel creep can re-eager the library tail.

**The gate's first leg, measured honestly (the eager-graph proof)** — full
eager JS closure (entry + modulepreload + static-import closure, gzip -9):

| | before (`db1e3c9`) | after (`6a8458b`) |
|---|---|---|
| index | 188,302 | 188,343 |
| glass-ui | 111,296 | 111,296 |
| grammar chunk (`useDocumentVisibility-*`) | 35,925 | 35,705 |
| lucide/prng/runtime | 2,219 | 2,222 |
| **TOTAL** | **337,742** | **337,566 (−176 B)** |

**The t33-research §4.2 "32.3 KiB gz scroll-timeline chunk" is a CHUNK-NAME
misattribution**: the chunk (named `scroll-timeline-*` at `aa115cc`, renamed
`useDocumentVisibility-*` by round-4 chunking) is the WHOLE parse-that + CSS
grammar core (probed: `oklch(`/`kelvin`/`steps(`/`cubic-bezier` AND the
scroll-timeline markers all in the one chunk). It is held eager by the
`/parsing` SUBPATH — `boot/hydrate.ts`'s synchronous URL-color parse (W2-1's
born-hydrated law) legitimately needs the grammar at boot — NOT by the root
barrel. The dead weight inside it is only the scroll()/view() grammar TAIL,
re-exported by `src/subpaths/parsing.ts` (library-side; `src/` +
`src/subpaths/` are build-frozen this wave, W1 move-map).
**ROUTE (named, no silent drop)**: the library-side split of the
scroll-timeline tail out of the `/parsing` subpath chunk is a W7 dead-payload
abrogation candidate (it belongs beside the L20/GAP-L5/About-KaTeX payload
rows; a src-barrels change → triumvirate per the wave's dispatch rule). The
row's demo-side half is COMPLETE; the byte claim could not honestly
materialize demo-side at the round-4 tree.

## Row 13 — B2/B4 de-coincidence (the forensic overturned the premise; the settle-gate lands the cure)

**The chunk-block forensic** (probe `probe-noblob.mjs`: route-abort
`HeroBlob-*.js`, re-profile): with the blob chunk blocked, the post-b2 wall
VANISHES (`longtasks: 179ms@36` only). **The ~505ms (research) / 841ms (this
instrument) wall is the BLOB ENGINE MOUNT alone** — one indivisible
producer-engine init task (WebGL2 context + shader compile), not an
aurora-arm + blob coincidence. A yield cannot split one task, and row 13a's
rAF+rIC micro-hop measurably didn't (the idle callback fired in the gap
BEFORE the mount task began; wall unchanged).

**What the demo owns is PLACEMENT** (`53e72b9`): synchronous-with-b2, the wall
landed ~30ms into the field's 0.9s derive-in — freezing the arrival fade
mid-flight (the owner's "particularly on load" felt face). B4 now settle-gates
on the derive-in transition (state check via `getAnimations` on
`.atmosphere-canvas` — the standing noteLeftPlateSettled/useDockArrival idiom;
finite document-timeline only, the WebKit ScrollTimeline lesson) + an idle
slice. Never a timer; PRM synchronous (instant-states law 5); O-4's B2 < B4
strictly preserved.

**Measured (the §4 profile re-run, same instrument, owner URL)**:

| | BEFORE `db1e3c9` | AFTER `53e72b9` |
|---|---|---|
| 1× marks | b2@950 · b4@955 | b2@705 · b4@1648 |
| 1× long tasks in the derive-in window [b2, b2+950] | **841ms@+32 (fade frozen)** | **NONE** |
| 1× blob-mount task | 841ms | 425ms (no fade contention) |
| 1× TBT-proxy | 950ms | 470ms |
| 4× marks | b2@2615 · b4@2671 | b2@1462 · b4@2406 |
| 4× long tasks in the derive-in window | **833ms@+138** | **NONE** |
| 4× TBT-proxy | 2624ms | 1013ms |

The task's SIZE stays the ledgered W7 row (L20 eager-config/lazy-engine +
GAP-L5 halves — P9/P1 packets); cited, not re-routed. T-39's gates stay
W7/W9 (this is a demo-now PI-1 contribution, below).

**Oracle interaction (row 13c, `5cc5eee`)**: moving B4 to the post-arrival
beat shifted the blob's one-time MOUNT layout into O-11 gate 4's traced
scrub window (bisected: green at `db1e3c9`, red at the lane head — 10
Layout events vs the ≤5 bar, deterministic). The mount is exactly the
"legitimate one-time layout, not scroll-driven animation" class the spec's
own warm-up rationale names, so the FIXTURE now settles the full overture
(b4 mark + blob canvas attached) before the warm-up scrub; **the ≤5
assertion bar is unchanged** — fixture/intent alignment, never a
weakening. O-11 6/6 green post-fix. O-5 boot-pacing stays honestly RED on
the eager wall (`test.fail()` intact — re-verified: 333ms spike = 13.3×
median, the RP-2 task, unchanged by this lane).

## Row 11 — T-45: the oversampled-blur carrier (landed + proven LOSSLESS; the §6.8 repro is structurally dead post-T-31)

**Landed** (`b64c52d` + `45dfa5f`): the pane-card recipe moves the
`backdrop-filter` onto an oversampling carrier on the card's DIRECT WRAPPER
seat (`style.css` — `.pane-wrapper:has(> .glass-resting)::before` + the
one-deep wrapper-div arm for the picker/Extract/Config structures; the card's
own filter dies where the carrier speaks). Inset `−2×blur`, output clipped by
`clip-path: inset(2R round --radius-card)` — the wrapper seat (not the card's
own pseudo) because the producer ladder claims both card pseudos AND the
scroller cards can't carry a static blur layer. Token-first
(`--glass-blur-resting`), every producer escape inherited; `clip-path` clips
hit-testing (no pointer interception); `:has()`-supports-guarded as a pair.
Engagement PROBED live on the built bundle (carrier bf = the live token
recipe `blur(8px) saturate(1.3) brightness(1.14)`, card bf = none, both seat
arms). Row 11b: the backdrop-filter is authored UNPREFIXED only — the
hand-written pair collapsed to `-webkit-` alone under the demo's own
minifier (the spectrum-range MARKER's exact bug class), probed and cured.

**The §6.8 bisection re-run (both schemes, frames archived)** — the honest
finding, stated plainly:

1. **Cured ↔ old parity is total** on the round-4 tree: per-edge inner-band
   diff ≤ 1/255 per channel (Chromium) and **0** (WebKit), both schemes,
   interior byte-stable — INCLUDING under a synthesized adversarial backdrop
   (a hard white/black checker crossing the card edge). The carrier is
   visually LOSSLESS — zero regression risk, GPU-layer-count neutral (2
   carriers replace 2 card filters).
2. **The rim does not reproduce in EITHER state** at this head: the §6.8
   repro ran at `aa115cc` (pre-round-4), where the pane cards' top edges sat
   under/beside the FIXED dock band — a glass-over-glass backdrop-root
   overlap. **T-31's dock-atop band law (`d8f1f1`, landed in round 4, AFTER
   the owner's audited head `25924d1`) dissolved that precondition
   structurally.** Neither engine probed edge-clamps visibly on the current
   composition.
3. The carrier therefore stands as the CLASS GUARD (owner colors and field
   compositions are unbounded; the cure is correct-by-construction for
   edge-clamping engines and future layout drift) and as the BOOKED-SWAP
   interim: the producer root cure is the **P3-family rider — ALREADY BOOKED
   BY NAME** (`letters/GLASSUI-T-ASKS.md §P3/P10 riders`, relayed `92136ab5`
   on glass-ui `tranche/BG`, walked at W7 verify-at-cut). The demo block dies
   the day it lands.

Disambiguation upheld: shot-9's stepped right edge is the cartoon CASTER
(deliberate) — untouched.

## Gates (Lane M, §Hard gate 5 — per-leg verdicts)

| Leg | Verdict |
|---|---|
| demo root-barrel grep zero | **PASS** (0 hits) |
| scroll-timeline chunk absent from eager | **MISS-RECORDED-HONESTLY** — not achievable demo-side at this tree (the chunk = the boot-required grammar core held by `/parsing`; the name was the research's misattribution). Library-side tail-split routed to W7 by name. No gate weakened. |
| b2/b4 longtask split on the §4 profile re-run (before/after archived) | **PASS (re-grounded)** — the wall is forensically the blob mount alone; the derive-in window now carries ZERO long tasks (was 841/833ms), the mount task itself shrank ~2×, TBT-proxy halved. Before/after + the chunk-block forensic archived. |
| T-45 rim-gone frames both schemes (§6.8 probe re-run green) | **PASS-WITH-FINDING** — frames both schemes archived: no rim CURED (and none OLD — the repro precondition died with T-31, the causal chain named); the cure engagement probed; parity proven lossless in Chromium AND WebKit under adversarial backdrops. |
| P3-family rider BOOKED by name | **PASS** (pre-booked by the triumvirate: §P3/P10 riders, `92136ab5`; this lane cites, never re-books) |
| lint 0 · typecheck 0 · vitest | **PASS** (0 · 0 · 2222/2222) |
| e2e all-project | **PASS** — clean full 6-project run at the lane head (`5cc5eee`, lane ports 8674/8675): **146 passed / 2 skipped / exit 0** (9.3m; the 2 skips = O-3 headed-GPU; the three standing born-RED producer legs O-16-R1 / O-5 / O-26 carried by design via `test.fail()`, never weakened — O-5 re-verified red on the eager wall, untouched by this lane). A first contended run (this lane's own probes + a sibling lane's suite overlapping) flaked 4 perf-project boot waits + surfaced the REAL O-11 gate-4 interaction (row 13c above); the perf project re-ran green in isolation (5 passed) before the clean full run confirmed everything together. |

## PI-1 contribution (T-39 demo-now; never a gate re-route)

Recorded in `pi1-delta-ledger.md` (the Lane M row): local-instrument
TBT-proxy 950→470 (1×) / 2624→1013 (4×) from the arrival re-choreography +
mount-task shrink; eager JS −176 B gz (the payload half did not materialize —
misattribution, above). LCP expectation on CI: FLAT (no eager movers landed);
TBT: possible improvement inside the known cliff-variance band. The CI
3-sample spread appends at the wave-close/W7 LHCI run per the append
protocol; budgets adjudicate at W7/W9, unchanged.
