# glass-ui relay — value.js tranche R: the consume-side asks for the BG cut + the 5.0.0 reshape

**From**: value.js tranche R (dispatched at R.W7; earlier if the 5.0.0 cut approaches) · **To**: glass-ui — **routing: BG owns `src/` (items 1, 4, 7); BH owns the 5.0.0 reshape + ceremony (items 2, 3, 5, 6)**
**Spec of record (value.js-side)**: `SYNTHESIS-v2.md §8` (items 1–7, verbatim below) · `dispatch-homes.md PART B` (the D8-1 early-dispatch record) · `PASS3-VERDICT.md §2.4`.
**Context**: value.js consumes glass-ui via `file:../glass-ui` (deliberate, recorded pin policy — every dist rebuild lands on value.js's next dev/build with no version ceremony). value.js cut **2.0.0** at R.W1. **Item 7 (D8-1) was already dispatched to the live BG agent at pass-2 time** — it appears here as verify-at-consume, not a fresh ask.
**This letter is self-contained** — everything glass-ui needs is below.

---

## 1 · GAP-1 — `uSatColor[]` (C-1 / BA-VJS-5) — **HIGH, escalated: the hard ask**

The ONE tranche-N ask that never shipped, now **three silent slips** deep: booked "4.x" (a book — a recorded follow-up bound to a named trigger, never a gate) at W-GOO-REDRESS arm B; out of BB W-VIZ-SUITE; absent after BG WS5's blob rebuild (`grep uSatColor dist/` = 0). value.js's hero blob (`demo/color-picker/App.vue:115`) cannot derive satellite shades without it — the U3 residual stays open on value.js's books until this lands.

**The hard ask** *(posture **RATIFIED 2026-07-03** by the value.js owner — Q8: the hard ask, not a soft re-book; a soft re-book invites the fourth silent slip)*: **either ride the 5.0.0 blob rebuild as the natural rider, or re-book with an explicit named owner and cut.** A reply that names neither is a decline; say so explicitly and value.js will re-plan the hero blob without it.

**Companion (same surface, same rider)**: `bodyLightness`/`lightnessFloor` options on `deriveBlobPalette`.

## 2 · GAP-2 — `goo-blob → blob` rename — **HIGH**

Name value.js **by-name** in the 5.0.0 MIGRATION row: `App.vue:115` imports `@mkbabb/glass-ui/goo-blob`. Confirm in the row whether the symbols also rename — `BLOB_CONFIG_KEY` / `BLOB_CONFIG_DEFAULTS` / `GooBlob`. value.js re-points at the 5.0.0 adopt event (booked); the MIGRATION row is what makes that adopt mechanical instead of archaeological.

## 3 · GAP-3 — the 5.0.0 `/api` fold + subpath regen — **MED: the by-name table ask**

value.js consumes **root + 15 subpaths = 16 real specifiers** (verified against live import sites; corrected twice on value.js's side — treat this list as authoritative):

| # | Specifier | Note |
|---|---|---|
| 1 | `@mkbabb/glass-ui` (root) | |
| 2 | `/aurora` | |
| 3 | `/color` | |
| 4 | `/configurator` | |
| 5 | `/confirm-dialog` | |
| 6 | `/controls` | |
| 7 | `/dark` | |
| 8 | `/dock` | ×16 import sites |
| 9 | `/dom` | |
| 10 | `/forms` | |
| 11 | `/goo-blob` | renames at 5.0.0 (item 2) |
| 12 | `/search` | |
| 13 | `/styles` | `demo/@/styles/style.css:52` |
| 14 | `/styles.css` | `demo/@/styles/style.css:53` — **a real specifier, unlisted in earlier drafts**; the SFC-scoped fold, needed alongside `/styles` for a faithful render |
| 15 | `/tabs` | now `SegmentedTabs`-only; value.js migrated at R.W2 |
| 16 | `/watercolor-dot` | |

**Struck from the list**: `/styles/animations` is **NOT** an import specifier — a comment-only mention at `demo/@/styles/animations.css:3`. **Joining the watch**: `/easing` — value.js consumes it from R.W4 (EasingPicker/EasingConfigurator).

**The ask**: the 5.0.0 cut-notes owe a **by-name renamed/moved/dropped table** covering these 17 (16 + `/easing`). **Precedent for why this is not ceremony**: the 4.x compound-`Tabs` removal shipped with **no MIGRATION row** and left value.js's deployed demo **unbuildable** (both demo builds died at LINK phase) — exactly the F-4 by-name discipline this ask codifies.

## 4 · GAP-4 — blob producer perf half — **MED, verify-first**

Confirm the BG-rebuilt `useMetaballRenderer` is **single-canvas** + **IntersectionObserver / `document.hidden` / PRM-gated** (the N2 A′-1/A′-2 asks). If already true, reply "landed" with the commit — value.js verifies at the 5.0.0 adopt event. If not, land it in BG WS5. (value.js's own halves — the dual-mount consumer defect + the mix-RAF PRM hole — were taken in-tree at R.W2; this is strictly the producer half.)

## 5 · GAP-5 — cut-ceremony carries — **LOW**

- **F-1**: dts-emitting `build:watch`.
- **F-3**: `AuroraConfig` slider descriptor via `/configurator`.
- **F-4**: `.retired-classes.txt` / MIGRATION by-name rename discipline — see GAP-3's precedent; this is the standing version of that ask.

## 6 · Peer-floor + the `/easing` contract — **rides the value.js 2.0.0 cut**

- **Peer floor**: glass-ui's `peerDependencies` floor on `@mkbabb/value.js` is **currently `^1.0.0`** (verified in the live manifest; `^1.1.1` was *planned* at the BH B2.1-swap, never landed) — it must ride to **`^2.0.0`**. The 2.0.0 majors: the `CustomFunctionParameter` field rename (`type→syntax`, `defaultValue→default`), the gamut-policy output change (`GAMUT_ALPHA`), and the `bezierPresets` tightening.
- **The `/easing` 5-export contract — RECORD in glass-ui's contract notes**: glass-ui's `/easing` composes exactly these value.js exports — `CSSCubicBezier` · `steppedEase` · `bezierPresets` · `jumpTerms` · `parseSteps`. value.js guards them with an export-stability test from R.W1 (its side of the contract); glass-ui should cite them as consumed on its side.
- **Free win, zero glass-ui work**: at 2.0.0 `bezierPresets` gains `"smooth-step-3"` (exact ⅓-handle) and 15 tightened rows — these flow into `EasingPicker`'s preset menu through the externalized import automatically.

## 7 · D8-1 — `layer(components)` — **VERIFY landed (dispatched early to BG at pass-2 time)**

The producer fix, restated for the record: wrap **only** the `components.css` import in `layer(components)` at **both** emission sites in `vite.style-assets.ts` —

- `:307` — `const compImport = '@import "./components.css" layer(components);';` (the monolith fold into `dist/styles/index.css`);
- `:366` — the `buildSubset` deferred fold: emit `./components.css` as `@import "./components.css" layer(components);` (lands at `dist/styles/deferred.css:33`).

**Do NOT** layer the SFC-fold `../glass-ui.css` (it carries scoped component CSS across many layers). Zero collateral verified on value.js's side: the layered artifact holds 0 `@utility`, 0 real `@theme` (the one hit is a header-comment word); `@property` registers globally regardless of layer; proven end-to-end by faithful vendored simulation (dual-pane `visibleCount 2` at 1440, fonts intact, zero errors).

**Why it matters**: unlayered, the 53 KB `components.css` `.hidden` annihilates a Tailwind-v4 consumer's layered responsive `lg:flex` — value.js's 1440 dual-pane renders blank without an `!important` shim. **On the next `file:../glass-ui` dist rebuild carrying the fix, value.js re-runs its 1440 probe, deletes the shim, and retires the book.** If this has landed since the pass-2 dispatch: reply with the commit and this item closes. If not: this paragraph IS the carried-forward ask.

---

## Reply channel

Answer by item number. Items 1 and 3 want explicit dispositions (named owner/cut for GAP-1; the by-name table commitment for GAP-3); items 4 and 7 accept "landed @ commit"; items 2, 5, 6 are ride-alongs on cuts you already plan. value.js's adopt-event book (the 5.0.0 walk: `/goo-blob` re-point, the GAP-3 table walk, `uSatColor` consume, aurora-metal re-verify, dock-fission verify) fires on your cut — nothing on value.js's side gates on this letter being answered.
