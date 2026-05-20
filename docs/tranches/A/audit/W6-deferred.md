# A.W6 — Formal re-scope: glass-ui blob/aurora APIs unshipped

**Wave**: A.W6 (blob/aurora idiomatic abstraction — conditional).
**Disposition**: re-scoped per `A.md §9` / `waves/W6.md` Conditionality.
**Executed at**: B.W0 Lane B, 2026-05-19.
**Verified against**: glass-ui HEAD `e2e5303` (post-Q-close — Q closed at `4b16de7`, v1.9.2).

## Verdict

A.W6 was conditional on glass-ui shipping the metaballs/aurora API surface its
two lanes consume. That surface is **not shipped**. A.W6 re-scopes; no demo code
is written; the duplication is documented here and routed to a named successor.

## Re-verification (B.W0 Lane B)

Re-checked the three load-bearing gaps against glass-ui's current HEAD `e2e5303`
— not just the Q-close snapshot `4b16de7`. All confirm `coordination/Q.md §2a`:

| API the wave needs | glass-ui state | Proof |
|---|---|---|
| metaballs `positionSource` per-frame hook + pointer input + per-blob opacity + colour perturbation | NOT SHIPPED | `grep -rln 'positionSource\|pointerUniform\|perBlobOpacity' glass-ui/src` → 0 |
| Aurora `deriveAuroraPalette(baseColor, opts)` | NOT SHIPPED | `grep -rln 'deriveAuroraPalette' glass-ui/src` → 0 |
| `BlobDot` organic-dot primitive | NOT SHIPPED | `grep -rln 'BlobDot' glass-ui/src` → 0 |

glass-ui's two post-Q commits (`ecd0679` aurora lazy-arm, `e2e5303` Safari
post-paint fix) are internal perf/correctness fixes — no new public API. Q's
wave plan never scheduled the W6 extension set; Q has closed; the surface will
not appear on glass-ui's Q timeline.

> Adjacent finding (not A.W6 scope): glass-ui `ce5aad8` shipped a "contract-v2"
> that **abrogates the `development` dev-resolution condition** (glass-ui v1.9.3),
> diverging from precept invariant 30 as value.js pinned it at `3c32fae`. This is
> a B.W3 invariant-30 audit concern, filed there — not a W6 matter. Recorded here
> only because the same re-verification surfaced it.

## What this means for the demo (the inheritance)

A.W0's A-key-3 guard already landed (the null-canvas RAF race is fixed). The demo
boots, the blob renders, the atmosphere renders. What stays unabstracted:

- **`useMetaballRenderer.ts` (333 lines) stays in full.** `audit/HARDEN-4` corrected
  the deletable count to ~200 lines — the WebGL lifecycle boilerplate. The other
  ~130 lines (the mood-coupled per-frame HSV perturbation, the `smin` body
  silhouette, the `POS_SCALE` overflow-canvas contract) were always going to
  survive as the demo's `positionSource` callback, not as deleted code. With no
  hook to feed, the whole file stays. The `metaball.{frag,vert}.glsl` shaders stay.
- **`WatercolorDot.vue` + `useWatercolorBlob.ts` stay demo-local.** No `BlobDot`
  primitive to migrate the 11 consumers onto.
- **`AuroraPane.vue` keeps its honest "under rework" state** and the atmosphere
  keeps W0's static `AuroraConfig` — no `deriveAuroraPalette` to make the
  atmosphere track the picker colour. The W0 "pane under rework" deferral persists.
- **`ConfigSliderPane.vue`** (the W4 BlobPane+AuroraPane merge) stays demo-local;
  it was a W6 Lane B item to migrate it onto glass-ui's `./configurator` surface.
  That sub-item is *not* glass-ui-blocked (the `./configurator` surface already
  ships) — it is re-routed below as the one independently-actionable residual.
- The duplicated WebGL lifecycle (demo metaballs vs glass-ui `useMetaballs`)
  remains. It is duplication, not breakage.

## Precept §10 — wire before retire

`useMetaballRenderer.ts` is fully wired and correct — it is duplicative of
glass-ui's `useMetaballs`, not dead. Precept §10 ("wire before retire") forbids
deleting a wired, working consumer ahead of its replacement. Retirement is
correctly gated on glass-ui shipping the `positionSource` hook. Re-scoping — not
deleting — is the precept-correct close-state.

## Named successors (zero silent deferral — invariant A5)

| Residual | Destination |
|---|---|
| metaballs `positionSource` + pointer + per-blob opacity + perturbation; Aurora `deriveAuroraPalette`; `BlobDot` primitive | **glass-ui successor tranche** — the API additions are glass-ui's to ship (filed: `coordination/Q.md §3`, 3 of the 7 standing rows) |
| The demo-side blob/aurora abstraction (delete `useMetaballRenderer.ts`'s lifecycle half; route through the glass-ui hook; picker-derived atmosphere) | **A value.js demo-abstraction tranche, opened once glass-ui ships.** Not value.js tranche C — C is concretely scoped as the palette-CRUD / fourier cohort tranche (`docs/tranches/C/C.md`) and does not own blob/aurora. |
| `ConfigSliderPane` → glass-ui `./configurator` adoption (NOT glass-ui-blocked) | **value.js tranche B is the natural home** but B's scope is fixed (close-A + simplify); recorded here as a small, unblocked follow-up for the same demo-abstraction tranche. |

## Close-state

A.W6 is **closed by re-scope**. The demo boots and the A-key-3 guard holds
(`waves/W6.md` Hard gate item 2 — "a valid close-state under invariant A5").
No `audit/W6-playwright/` re-probe is produced: no demo code changed, and B.W0
Lane A's `audit/W5-playwright/` boot probe (3 viewports × light+dark, 0 console
errors) is the current runtime evidence for the unchanged blob/atmosphere.
