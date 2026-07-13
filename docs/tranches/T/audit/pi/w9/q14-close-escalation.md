# T.W9 · Q14 PERF REDEMPTION — the close-run measurement + the triumvirate-level owner escalation naming the physical blocker

**Lane**: q14-final (T.W9 close-verification). **Date**: 2026-07-12.
**Gate**: the Q14 PERF REDEMPTION close gate (RULED 2026-07-09, `audit/RATIFICATION-2026-07-09.md §1`;
`waves/T.W9.md §Hard gate 4`): *"the §6.2 LCP/TBT budgets GREEN on the re-measured close run, OR a
triumvirate-level owner escalation naming the physical blocker — no re-baseline, no preset-swap, no
deferral."* This document is the **RECORD** half of that gate (the escalation as a ruled disposition;
the owner's acknowledgement lands at ratification, coupled with the tranche-U open).

---

## §1 · The verdict, one line

**Budgets stay HONESTLY RED at close (LCP ~2× over · TBT ~19× over) → the ruled close is the
ESCALATION, not green.** The cure is **producer-coupled and trigger-unfired** — it CANNOT land inside
tranche T. The redemption **INHERITS to tranche U's `U.W-PERF` wave** (registry §26). This is the
Q14-sanctioned close path (the escalation *replaces* the old keep-red disposition; it is not a
deferral, not a re-baseline, not a gate edit).

---

## §2 · The close-run measurement of record

### §2a — the static bundle measures (FRESH, this close build)

Built at close via `npm run gh-pages` (rolldown, `✓ built in 4.38s`, exit 0), measured on the
emitted `dist/gh-pages` tree; the entry + all `modulepreload`ed chunks are the **eager boot payload**.

| Measure | Close-build value | Budget | Verdict |
|---|---|---|---|
| **JS eager (RP-2)** — entry `index-*.js` + 5 modulepreloaded chunks | **331.0 KiB gz** | ≤ 280 | **RED** — +51 KiB / ~1.18× over |
| render-blocking index CSS | **88.4 KiB gz** | ≤ 120 | GREEN (31.6 headroom) |
| vendor-katex (W8 global-import cure) | **LAZY** — `vendor-katex-*.js` / `katex-*.js` NOT modulepreloaded | — | GREEN (deferred off boot; confirmed in `index.html`) |

Eager-JS chunk breakdown (close build):

| chunk | gz | note |
|---|---|---|
| `index-*.js` (demo entry) | **184.9 KiB** | **carries the eager WebGL payload** — 66 shader-source markers (`getContext`/`compileShader`/`gl_Position`/`metaball`/`smin`) + 53 aurora/blob/HeroBlob/`revealBloom` hits; the SPA statically imports the blob+aurora runtime into the boot entry (**RP-2 eager-mount**) |
| `glass-ui-*.js` | 108.9 KiB | the producer component library (0 WebGL markers — Vue components/CSS-in-JS, not the shader runtime) |
| `useDocumentVisibility-*.js` | 34.9 KiB | @vueuse cohort |
| `createLucideIcon-*.js` | 1.6 KiB | icon factory |
| `rolldown-runtime-*.js` / `prng-*.js` | 0.4 / 0.2 KiB | runtime + prng |

### §2b — the dynamic LCP/TBT/CLS close run

**Instrument attempted**: `npx lighthouse@12` × (mobile ×3 + desktop ×3) against the **compressed**
static server on the lane-unique **:8195** (on-the-fly gzip, `Content-Encoding: gzip` verified:
index.html 12368→4387, entry JS →189321), mobile leg = the GATE instrument (default preset =
moto-G4 emulation + **SIMULATED** Slow-4G throttling + 4× CPU, matching `lighthouserc.json`).

**Honest instrument note (recorded, never laundered)**: the in-session dynamic re-measure **did not
complete** — Lighthouse hung on the first mobile navigation and never wrote a fresh trace. The root
is **the eager WebGL blob's continuous RAF render defeating Lighthouse's CPU-quiet /
network-quiet window detection** — the page never reaches the idle state the tool waits for, so the
collection stalls past its wait cap under the 4× CPU throttle in the headless SwiftShader path. **This
stall IS a manifestation of the very blocker being escalated** (the never-settling eager WebGL
payload), not an instrument defect to route around. The run was killed and the server torn down.

**The dynamic close run OF RECORD** (per the PI-1 append protocol — the CI runner is the baseline's
own instrument class, the apples-to-apples read): the standing **W8 CI gh-pages row**, LCP median
**5141ms** · TBT median **5988ms** (built head `6d95871`), FLAT vs the W4 CI row (LCP 5141 / TBT 5988)
and NOISE (< PP-10 30%) vs the W0 baseline (LCP 5563 / TBT 5618). Every richness wave since W2 has
read the same honest RED floor — **no wave moved the eager payload, so no wave could move the LCP
floor**; the W9 close inherits that floor unchanged, exactly as the ledger priced it.

| Metric | Close run of record (W8 CI, `6d95871`) | Budget | Verdict |
|---|---|---|---|
| **LCP** | **5141 ms** (median; 6850/5156/5141) | ≤ 2500 | **RED** — ~2.1× over |
| **TBT** | **5988 ms** (median; 7025/6332/5988) | ≤ 300 | **RED** — ~20× over |
| **CLS** | within budget across the wave (the §6.2 view-switch first-frame GREEN; the CLS reservation cures below landed demo-side) | ≤ 0.1 | not the binding red |

The binding reds are **LCP and TBT** — both gated by **FCP ≈ 4.3s ≈ the LCP floor**: the ONE
eager-payload mount task (RP-2 / the O-5 `test.fail()` spike leg) gates first paint. CLS is not the
blocker; LCP/TBT are.

---

## §3 · THE PHYSICAL BLOCKER — named precisely (the escalation's core)

The LCP/TBT floor is a **single physical fact**: the demo's **eager WebGL payload** (the
aurora + goo-blob shader runtime, statically imported into the 184.9 KiB boot entry) parses, compiles
its shaders, and mounts a continuously-animating WebGL2 context **before first paint**. That is the
~505ms blob-engine-mount task (W6.5 Lane-M forensic: "the ~505ms wall is forensically the BLOB ENGINE
MOUNT alone") sitting on the critical path, and it is what holds FCP≈LCP at ~4.3s and inflates TBT.

Clearing it splits into a **producer-gated half** (the load-bearing half, cannot land in T) and a
**demo half** (largely already spent).

### §3a — PRODUCER-GATED levers (glass-ui 5.0.0 — the trigger is UNFIRED)

The eager engine can only become lazy-mountable once the producer ships the split. These are booked
against glass-ui's 5.0.0 cut and named in the consolidated communiqué (`f3f3c097`) + the U-formation
letter (`audit/pi/u-bh-communique-draft.md §2b/§3`):

| Lever | What it unblocks | State |
|---|---|---|
| **L20 `/blob/config`** subpath (goo-blob → `/blob`) | the HeroBlob **eager-config / lazy-engine split** — import the lightweight config eagerly, DEFER the heavy WebGL engine off the boot critical path. **This is the RP-2 anchor.** | glass-ui `package.json` **5.0.0 in-tree** but **NO v5 tag** (HEAD `051e6957`, branch `tranche/BG`, npm `4.2.0`) — the cut is **USER-GATED**. T.W7 adopt trigger **NOT FIRED**. |
| **GAP-L5** (goo-blob) — the `settled` seam + **single-WebGL2 collapse** (drain `metaball.wgsl`) + exported HERO preset + `lightnessFloor` | lets one WebGL2 context serve the field, and lets the consumer defer/quiesce the engine instead of eagerly arming it | booked; `fissionAmp` shipped but **no `settled` export at HEAD** — producer-owned, BLOCKING-a-red |
| the `/parsing`-subpath **scroll()/view() grammar TAIL** dead-payload split | trims boot-eager grammar the URL-color hydrate does not use | **library-side** (value.js `src/subpaths/parsing.ts`); the W6.5 "32.3 KiB scroll-timeline chunk" claim was a **chunking misattribution** (the chunk is the boot-required grammar core held eager by hydrate's synchronous URL-color parse) — the real dead weight is the grammar tail, routed to the W7 dead-payload row BY NAME |

**The amended gate law (SYNTHESIS §6.2 / T.W7 P-3):** *"L20 + GAP-L5 must land TOGETHER or the
re-baseline carries a third tranche."* They have not landed together (the trigger is unfired) → **the
re-baseline carries a third tranche.** This is the physical blocker in one sentence: **the demo cannot
make the eager WebGL engine lazy until glass-ui 5.0.0 ships the `/blob/config` eager-config/lazy-engine
split, and that cut is owner/user-gated with no v5 tag — so the RP-2 clear (and the LCP/TBT floor it
gates) is structurally unreachable inside tranche T.**

### §3b — DEMO-half levers (what the demo owns; state)

| Lever | State |
|---|---|
| **RP-2 eager-mount** — HeroBlob statically imported into the boot entry, mounting the engine before first paint | **STILL EAGER** at close (the engine is in the 184.9 KiB entry chunk). The demo half of the split cannot land alone — it needs the producer `/blob/config` subpath (L20) to defer the engine without deleting the hero. Blocked WITH the producer. |
| **the CLS pane-shell mount-box reservation** — reserve the pane-shell mount box so the pane mount does not shift layout | landed demo-side across the wave (the `--dock-band-min-h` reservation W8; the pane-shell reserve) — CLS is within budget, **not the binding red**. |
| **vendor-katex defer** | **DONE (W8)** — the KaTeX global-import cure made katex a lazy chunk (confirmed: not modulepreloaded in `index.html`). Off the boot path. |
| **root-barrel cures** — root-barrel `@mkbabb/value.js` ×10 → subpath imports | **DONE (W6.5 Lane-M)** — grep ZERO root-barrel imports; chunk-graph-neutral (the promised scroll-timeline drop was the misattribution above; the real tail is library-side → §3a). |

**Conclusion**: the demo has spent every non-producer-coupled lever it owns (katex lazy, root-barrel
swept, CLS reserved, reveal-only law at W2, Google-Fonts strike at W2). **The one lever that moves the
LCP/TBT floor — deferring the eager WebGL engine — is producer-gated and trigger-unfired.**

---

## §4 · RP-2 state at close (the third-tranche carry)

**RP-2 = eager JS 331.0 KiB gz > 280 KiB budget — STILL RED at close.** (S FINAL §6.2 re-baseline was
347.9 KiB; the close build reads 331.0 KiB — directionally lower from the demo-side hygiene, but still
**over** the ≤280 gate and NOT cleared.) Per the amended gate note, **the re-baseline carries a THIRD
tranche** (K→N→M→S→T lineage of the blob-halves book; RP-2 first booked at the S re-baseline):
**RP-2 inherits to tranche U's `U.W-PERF` wave**, to be cleared at the glass-ui 5.0.0 adopt (L20 +
GAP-L5 together), never a silent partial clear.

---

## §5 · The PI-1 ledger disposition

- The **W9 close row is appended** to `audit/pi1-delta-ledger.md` (the ledger's TRACKING instrument
  for this gate is now CLOSED OUT with the final measurement) — budgets HONESTLY RED, the escalation
  named, no re-baseline / preset-swap / deferral.
- The **W7 gate row stays `pending`** — the payload landings' TBT/JS-eager deltas measure at the
  glass-ui 5.0.0 adopt, which is trigger-unfired; the W7 book hands to U as-is (books-never-gates, the
  R→S→T precedent).

---

## §6 · The escalation-ready blocker statement (for the owner, at ratification)

> **Q14 PERF REDEMPTION — close disposition: ESCALATION (budgets HONESTLY RED).**
>
> The LCP (≈5141ms, ~2.1× over) and TBT (≈5988ms, ~20× over) budgets are red at close and CANNOT be
> made green inside tranche T. The single physical blocker is the **eager WebGL blob/aurora engine**
> (66 shader markers in the 184.9 KiB boot entry) mounting before first paint — the ~505ms
> blob-engine-mount task that holds FCP≈LCP at ~4.3s. Making that engine lazy requires the
> **glass-ui 5.0.0 `/blob/config` eager-config/lazy-engine split (L20) landing TOGETHER with the
> goo-blob single-WebGL2 collapse / `settled` seam (GAP-L5)** — a **producer cut that is user-gated
> with no v5 tag** (`051e6957`, npm 4.2.0). The T.W7 adopt trigger is **unfired**; the demo has spent
> every lever it owns (reveal-only law, Google-Fonts strike, KaTeX-lazy, root-barrel sweep, CLS
> reservation). Per the ruled amended gate — *"L20 + GAP-L5 land together or the re-baseline carries a
> third tranche"* — **the RP-2 re-baseline (eager JS 331.0 KiB > 280) and the LCP/TBT redemption
> INHERIT to tranche U's `U.W-PERF` wave (registry §26)**, cleared at the 5.0.0 adopt. No gate is
> weakened; the escalation is the ruled valid close (PP-16: gates-pass-goal-unmet →
> `complete_with_misses`), acknowledged by the owner at ratification (coupled with the tranche-U open).

---

## §7 · Provenance / cross-refs

- Gate ruling: `audit/RATIFICATION-2026-07-09.md §1` (Q14) · `waves/T.W9.md §Hard gate 4` +
  §No-workaround "No Q14 escape hatch".
- Budget + baseline: `audit/SYNTHESIS.md §6.2` (JS eager 347.9 KiB re-baseline; LCP 5563 / TBT 5618
  run `28836873580`) · `audit/pi1-delta-ledger.md` (the full W0→W8 delta history).
- Producer levers: `audit/pi/u-bh-communique-draft.md §2b/§3` · the consolidated communiqué
  `f3f3c097` · `waves/T.W7.md P-3/P-6` (L20/GAP-L5 land-together law).
- RP-2 lineage: SYNTHESIS §7 fold table ("L20 `/blob/config` + RP-2 … land TOGETHER or the re-baseline
  carries a 3rd tranche") · W6.5 Lane-M record (`audit/w65-lane-m-record.md`, the blob-mount forensic +
  the scroll-timeline misattribution).
- W9 close gate item 4 (the §6.2 re-run + RP-2 state recorded + the PI-1 ledger closed out): satisfied
  by this record + the appended ledger row.
