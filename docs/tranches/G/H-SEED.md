# H-SEED — predecessor-authored forward-carry ledger

**Authored by**: tranche G, at G close (2026-05-22), per `audit/G-PEER-SPEEDTEST §7.1 FOLD-S3` (mirrors speedtest's `AL-SEED.md` shape).
**For**: tranche H (value.js's seventh tranche), whenever it opens.
**Status**: seed only — H is not open. This doc is the carry-forward substrate H's opening audit consumes.

This is a *seed*, not a plan. H's own opening audit (the canonical 6-agent invocation) is authoritative; this ledger exists so nothing G knew is lost between tranches.

---

## §1 — Tranche state at G close

- **value.js**: `master` @ the G merge commit; tagged `v0.9.0`. Branch `tranche-g` merged `--no-ff` + deleted.
- **Gates at G close**: vue-tsc 0 · vitest 1584/34 · api vitest 106/21 · lint 0 · build clean (`dist/value.js` 125,496 B) · gh-pages clean · all 8 proof scripts exit 0 · bench L8 11.00× / DIRECT_PATHS 4.49× / nameParser 39.34×.
- **Corpus invariants** (now codified by proof scripts): `as any` 0 · `as unknown as` 4 · `@ts-ignore` 0 · `@deprecated` 0.
- **Architecture**: `src/units/color/` is 9 focused modules (`conversions/` cluster + `dispatch.ts`); no god-module remains in `src/`.
- **Precept submodule**: `68d9b20` — unchanged since tranche D.

---

## §2 — Carry-forward asks (sharpened TIME-BOUND triggers)

Per G1 ("relay before ratification"), every item below was relayed to + ratified by the user during G.W0. All triggers are TIME-BOUND — no vague "later".

| # | Ask | Owner | (c) re-check trigger |
|---|---|---|---|
| 1 | 8 glass-ui primitive asks — Metaballs API additions (renegotiated, `Q.md §2.1`); Aurora derive helpers; BlobDot; SelectTrigger size; DockSelectTrigger clampLabel; TooltipContent variant="mono"; Button size="icon-sm"; Tabs variant="underline" | glass-ui (peer-authorship) | Re-check at glass-ui's next non-AK tranche-open. |
| 2 | Metaballs ask — value.js is the **sole-identified-consumer** of `glass-ui/MetaballCanvas` | glass-ui + speedtest AL | Re-check at speedtest AL ratification (open/close) OR glass-ui's next non-AK tranche-open. value.js becomes the deciding consumer voice on publisher-retirement. |
| 3 | Contract-v2 §2.1 — glass-ui font-inlining in `dist/glass-ui.css` | glass-ui (peer-authorship) | Re-check at glass-ui's `dist/glass-ui.css` next-publish (currently 0 `@font-face`). Until non-zero, value.js cannot retire `siblingFsAllowTransient`. |
| 4 | keyframes.js precept-pin drift (`458c2d1` vs upstream `68d9b20`) | keyframes.js (peer) | Re-check at keyframes.js maintainer's next submodule-rebase signal. |
| 5 | keyframes.js peer commit `470814e` push status (R11) | user decision | **User-ratified LEAVE LOCAL** at G.W0. Re-check at the next keyframes.js work-window. |

CW Phase-2 is INFORMATIONAL only — speedtest does not consume value.js (`Q.md §4.1`); the "value.js participation" framing is retired.

---

## §3 — H-target investigation prompts

Concrete prompts for H's opening audit to weigh — not commitments:

1. **Rolldown `//#region` marker strip.** The library bundle carries ~+314 B of per-module source-navigation comment markers (an artefact of the G.W1 1→9-module decomposition). A `vite.config.ts` / `rolldownOptions` setting may strip them. Build-config territory — was out of G's wave bounds. Low value, low risk; a clean H micro-transposition.
2. **`bench/` provenance hygiene.** `bench/color2-direct-paths.mjs` cited `src/units/color/utils.ts:NNN` line numbers; G.W4 doc-drift repointed them to the decomposed modules. H should consider whether bench provenance comments should cite line numbers at all (they drift every refactor) — perhaps cite module + symbol only.
3. **`as unknown as` = 4.** G retired `as any` to 0 but left 4 genuine irreducible `as unknown as` boundary casts (DOM `CSSStyleDeclaration`, post-guard narrowing, the XYZ-hub dispatch, a clone-reinterpret). H could investigate whether a typed `XYZ_FUNCTIONS` mapped-type (the same idiom G.W2 Lane B applied to `DIRECT_PATHS`) retires the XYZ-hub cast — and whether an `as-unknown-as` budget proof script is worth codifying.
4. **`Color<T>` `[key: string]: any` index signature.** G.W2 Lane C kept it (INTERNAL decision — structurally unavoidable given heterogeneous members + the demo's dynamic indexing). H could investigate whether a deeper `Color` restructure (e.g. channels in a typed sub-record) removes the need for a string index entirely.
5. **`useMetaballRenderer.ts` → `@mkbabb/glass-ui/metaballs` migration.** `MetaballCanvas` is a live published surface (`Q.md §2.1.2`). The demo's local WebGL2 renderer could migrate once the 4-5 OPEN Metaballs sub-asks ship.

---

## §4 — Invariant inheritance for H

H inherits, verbatim, every invariant G honored:

- **G1** — relay before ratification (the canonical close-honesty + carry-forward discipline).
- **G2** — `as any` ≤ 5 in `src/` (codified by `proof:as-any-budget` — H must keep it green).
- **G3** — no god module; focused modules ≤ 350 LoC.
- **G4** — invariants are codified as runtime proof scripts, not review-dependent.
- **F1-F4** — no deferrals; no legacy code; cross-repo write boundary (explicit + bounded); tranche-discipline back-references.
- **E1-E5, D1-D7, precept invariants 30-33** — all HOLD at G close (G.W4 Lane 4 verified).
- The 8 proof scripts (`proof:resolution`, `proof:dts-layout`, `proof:no-deprecated`, `proof:no-ts-ignore`, `proof:as-any-budget`, `proof:codemod-publication`, `proof:no-deep`, `proof:no-bare-builtins`) are now the runtime contract — H must keep every one green and may add more.

---

## §5 — Cross-repo state for H

| Repo | HEAD at G close | Note for H |
|---|---|---|
| glass-ui | `3822f48` (origin `4b16de7`; 38 commits unpushed — chronic) | +5 commits in the G window — glass-ui's own AK-tranche work. Primitive-expansion asks OPEN. |
| keyframes.js | `470814e` (origin `2183f32`; 14 commits unpushed) | F.W2 codemod LOCAL-ONLY. R11 = LEAVE LOCAL (user-ratified). |
| speedtest | tranche AK opened/ratified | Does NOT consume value.js. Watch AL for the Metaballs publisher-retirement decision. |
| fourier-analysis | `926ca6a` (109-file dirty tree) | Constellation freezer — chronic; not actionable. |
| docs/precepts | `68d9b20` | Unchanged since D. Re-check upstream at H open. |

**Zero cross-repo writes occurred in the G window** — F3's boundary held. H inherits the same default: ZERO cross-repo writes unless explicitly authorized + bounded.

---

## §6 — Retired items (do NOT re-open)

- **Playwright environmental flake class** (RM-1) — retired at G.W0 (user-ratified). `smoke-admin` parallel-load flakiness + `smoke-safari` missing-local-WebKit are documented-environmental, not code regressions. CI installs WebKit + uses the addInitScript admin fixture. Do not re-audit as a defect.
- **CW Phase-2 value.js participation** — retired; speedtest does not consume value.js.
- **`color/utils.ts`** — deleted at G.W1; do not resurrect a god-module. New conversion code goes in the relevant `conversions/*.ts` focused module.

---

## §7 — Open questions for H's opening audit

1. Is there a remaining god-module risk anywhere in `demo/` (G audited `src/`; `demo/` was only spot-checked)?
2. Should `as unknown as` get its own budget proof script (G codified `as any` but not `as unknown as`)?
3. Has glass-ui's contraction posture inverted? If yes, the 8 primitive asks become fileable.
4. Does the api/ surface have an analogous decomposition candidate to `color/utils.ts` (G audited but found none > 400 LoC)?

---

## §8 — Authority

This seed is pinned by: `docs/tranches/G/FINAL.md` (the G close report) + `coordination/Q.md` (the cross-repo manifest, §7 refreshed at G close) + `audit/G-PEER-SPEEDTEST §7.1` (the FOLD-S3 origin) + `audit/G.W4-close-lane-1..7-*.md` (the 7 close-audit deliverables). H's own opening audit supersedes this seed wherever they differ — this is a starting point, not a constraint.
