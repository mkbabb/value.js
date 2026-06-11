# N.W1.D — e2e back to green baseline (impl lane report)

**Lane:** W1.D · **Branch:** `tranche-f-handoff` · **Date:** 2026-06-11
**Ownership (strict):** `e2e/**` and `playwright.config.*` — spec/fixture fixes ONLY. Do NOT
change demo app code, src, or the glass-ui sibling.
**Mandate:** the HEAD `0-passed-of-37` was the boot-break; the Fix lanes (W1.A imports, W1.C
mechanism-C) restored part of the boot. Run the suite, triage every failure, fix stale
selectors/fixtures idiomatically, and disposition any TRUE app defect honestly to its owning wave.

---

## §0 — Verdict (one paragraph)

**The e2e suite is selector-correct for the post-W1 world; I changed nothing under `e2e/**` or
`playwright.config.*` because no spec or fixture is stale.** The suite is **BLOCKED on two boot
defects, neither in this lane's ownership and neither an e2e concern**: (1) an **upstream glass-ui
dist-CSS-incompleteness** (`segmented-tabs.css` never copied into glass-ui's `dist/`) that
white-screens the demo behind a Vite CSS error overlay — the exact blocker W1-GATE already
diagnosed, still live; and (2) a **`RGBColor` temporal-dead-zone (TDZ) crash** at
`src/parsing/color.ts` — a circular-import init-order fragility in value.js's source module graph,
exposed by the demo's `@src` source-resolution and **masked in the bundled `dist/value.js`** (a
direct `node` import of the dist resolves `RGBColor` fine; the demo's unbundled vite-served source
graph hits the TDZ at module-eval). Both are upstream of the suite — the specs drive the same demo
app, so they all fail with the identical root cause until the boot is restored. **No green
baseline is achievable from `e2e/**` alone.** I verified the selector contract survives the W1.A
gestalt rename + the W1.C reka-ui bump so that, the moment the boot is unblocked, the suite is
genuinely green (no latent stale-selector debt hiding behind the boot-break).

---

## §1 — Suite run (the measurement)

### Run 1 — as-found (warm vite cache, HEAD working tree)

`npx playwright test` (all 5 projects): **36 failed, 1 did not run** (37 total). Every failure is
the same shape — the shell never renders:

```
Locator: getByRole('main', { name: 'Color tool panes' })  → element(s) not found
```

The error-context page-snapshots confirm the single root cause verbatim, e.g.
`test-results/views-generate-…/error-context.md`:

```
- generic [ref=e4]: "[plugin:vite:css] [postcss] ENOENT: no such file or directory,
   open '../components/custom/tabs/segmented-tabs.css'"
- generic [ref=e5]: /Users/mkbabb/Programming/value.js/demo/@/styles/style.css:undefined:null
```

This is **Defect 1** (the glass-ui dist CSS gap). The demo white-screens behind a Vite error
overlay; no spec can reach any UI.

### Run 2 — with Defect 1 transiently neutralized (triage-only, fully reverted)

To learn whether Defect 1 was the *only* blocker (and to validate selectors against a real boot),
I transiently replicated what a correct glass-ui build would emit: `cp` glass-ui's **existing**
`src/components/custom/tabs/segmented-tabs.css` → its `dist/.../segmented-tabs.css` (the file the
dangling `@import` expects; the dist is a gitignored artifact). **I removed this copy at lane
end — the sibling is restored to its as-found state (verified `ls` → GONE).** I touched no value.js
working-tree file for this.

Result: **2 passed, 34 failed** (was 0 passed). The CSS overlay cleared, but the failures changed
shape from "white-screen" to "interaction timeout" — the app now *mounts the error overlay's
absence* but still does not render its content, because of **Defect 2**.

### Boot probes (headless Chromium, cold dep-optimizer cache, fresh `dist/value.js`)

With Defect 1 neutralized I drove a direct boot probe. The shell never mounts:

```
APP_CHILDREN: 0
MAIN_VISIBLE: false
VIEWSELECT_VISIBLE: false
PAGEERROR: Cannot access 'RGBColor' before initialization
  STACK: at http://localhost:8090/@fs/.../value.js/src/parsing/color.ts:212:9
```

That is **Defect 2** — a runtime TDZ on the `RGBColor` class binding, fired while the demo's
`@src` source graph evaluates `src/parsing/color.ts`. `#app` has **0** children → the whole app is
dead → every `getByRole('main')` / `combobox` / `option` assertion times out. This is the true
cause of all 34 post-CSS failures.

---

## §2 — Defect 1: glass-ui dist-CSS-incompleteness (the boot CSS overlay)

**Status:** upstream glass-ui (READ-ONLY); the demo consume-site is `demo/@/styles/style.css:23`
(W5/styling ownership) — **outside this lane**. Identical to W1-GATE's BLOCKED finding; **still
live at HEAD** (verified today).

**Mechanism (traced conclusively):**
- `demo/@/styles/style.css:23` → `@import "@mkbabb/glass-ui/styles"` → glass-ui
  `dist/styles/index.css`.
- `dist/styles/index.css:148` → `@import "../components/custom/tabs/segmented-tabs.css"` →
  `dist/components/custom/tabs/segmented-tabs.css`.
- That file **does not exist in dist**. glass-ui's build plugin `vite.style-assets.ts`
  (`publishStyleAssets`) does `cpSync(src/styles → dist/styles)` **only** — it never copies
  `src/components/**/*.css`. So the verbatim-copied `@import` on line 148 dangles. (`find
  dist/components -name '*.css' | wc -l` = **0**.)
- The **bundled** export `@mkbabb/glass-ui/styles.css` (`dist/glass-ui.css`, imported at
  `style.css:24`) **does carry** the rules (`grep -oiE '\.segmented-(band|cell|track|dot)'` →
  4 hits). So the SegmentedTabs *styling* is available via the second import; only the **raw
  `./styles` barrel's dangling `@import`** white-screens the demo. The defect is one dangling
  line, not missing styling.

**Disposition (glass-ui-owned ask, §8 cohort class):** glass-ui's build must either (preferred)
drop the now-redundant `@import "../components/custom/tabs/segmented-tabs.css"` from its published
`src/styles/index.css` (the bundle already carries those rules), or copy `src/components/**/*.css`
into `dist/components/**` so the raw barrel resolves. **It is NOT fixable from `value.js`** —
the only value.js-side touchpoint is `style.css:23` (W5 ownership), and editing it to paper over
the dangling import would be a workaround that re-introduces exactly the silent-CSS failure mode
inv-N-10 exists to defeat. **This lane will not touch it.** It is the lead's precondition to clear
(a corrected glass-ui dist), exactly as N.md §1 / W1-GATE name.

---

## §3 — Defect 2: `RGBColor` TDZ at `src/parsing/color.ts` (the runtime boot crash) — NEW, not seen before

**Status:** value.js source/demo boot defect — **outside this lane** (`src/**` + the demo's
`@src` resolution; an init-order/circular-import concern, owned by the library/boot substrate, not
e2e). **This is a NEW blocker that emerges only after Defect 1 is neutralized** — W1-GATE never
reached it because the CSS overlay short-circuited the boot first.

**Symptom:** `PAGEERROR: Cannot access 'RGBColor' before initialization`, stack at
`src/parsing/color.ts` (source-mapped). `#app` mounts **0** children — total app death.

**Mechanism (established by elimination):**
- The TDZ is a **circular-import init-order fragility**. `src/parsing/CLAUDE.md` documents the
  cycle: `units.ts ↔ color.ts` (broken by `Parser.lazy()` for *parsers*), and `color.ts` further
  imports the color **classes** (`RGBColor`, …) from `../units/color` and `color2/hex2rgb/
  mixColors` from `../units/color/dispatch`, which itself imports `RGBColor` from the
  `units/color/index` barrel. `color.ts` has **eager** (module-eval-time) class references in its
  top-level constant tables (`COLOR_FUNCTION_SPACES` / the `CONSTRUCTORS` map, lines ~216–226 —
  *pre-existing*, not added today). When the demo's `@src` graph evaluates `color.ts` before
  `units/color/index.ts` has finished initializing the class declarations, the eager reference
  hits the TDZ.
- **It is graph-ordering-specific, not a hard cycle break:** a direct `node` import of the built
  `dist/value.js` resolves `RGBColor` to a `function` with **no** error (rollup hoists/reorders
  the bundle), and **vitest** (which transforms `src/` via vite) imports the barrel **without**
  the TDZ — its entry-eval order differs from the demo's. The fault surfaces only on the demo's
  unbundled vite-*serve* module graph (the `@src` source-resolution path, distinct from the
  `@mkbabb/value.js` → `dist/value.js` self-alias glass-ui uses).
- **I could not safely bisect which of today's concurrent sibling src edits *triggers* the
  specific eval order** (W7 touched `parsing/color.ts` + `units/color/{dispatch,constants,index}.ts`;
  W2 touched `parsing/color.ts`; the diffs add no *new* top-level eager class reference — the
  W7 `light-dark()`/`currentColor` additions use `Parser.lazy(() => Value)`, correctly deferred;
  the new `dispatch.ts` `RGB_GAMUT_SPACES`/`CHROMA_SEARCH_STEPS` consts are string-Set/number, not
  class refs; `constants.ts` only imports `./matrix`). A controlled revert would require stashing
  src files that **concurrent in-flight lanes are actively editing** (HMR churn observed live in
  the vite log) — too disruptive to attempt from an e2e lane. The trigger is most plausibly an
  *import-order shift* from the barrel/export-list reshuffles, surfacing a latent fragility, but I
  did not prove the precise edit.

**Disposition:** this is a **library/demo boot defect** that the W1 boot-truth substrate must
own — it is precisely the class inv-N-1's boot-smoke is designed to catch (mount + console-clean
on a cold cache). The honest fix is to **break the eager class reference in the circular chain**
(e.g. make `color.ts`'s constructor tables lazy, or restructure the
`color.ts ↔ dispatch.ts ↔ units/color/index.ts` import topology so no module references a class
binding at another's module-eval time). That is an **N.W1 boot-substrate / W2.C parser-root**
concern (both touch `src/parsing/color.ts` and the color module graph), **not an e2e spec fix.**
I am flagging it to the lead as a **second, independent W1 precondition** beyond the glass-ui CSS:
*the demo must boot console-clean on the demo's own `@src` graph, not merely import cleanly in
node/vitest.* Until both Defect 1 and Defect 2 are cleared, the e2e suite cannot reach green.

> Note: 8 vitest unit tests also fail at HEAD — all in `test/color-emit.test.ts`
> (`toAnimationString` B1/B2/B4). These are **W7's in-progress feature tests** (the keyframes
> egress-emit slice), unrelated to the boot or to e2e. They belong to N.W7 (in_progress), not this
> lane. (1654 pass / 8 fail / 39 files.)

---

## §4 — Selector triage (the part this lane IS responsible for) — NO changes needed

I audited every spec against the two W1 mechanism changes the brief flagged, to ensure no stale
selector hides behind the boot-break. **All clear; zero spec/fixture edits.**

### (a) W1.A carousel → `role="tablist"` rail (ComponentSliders.vue)

The W1.A gestalt replaced the (never-existent) `GlassCarousel` label rail with a semantic
`role="tablist"` column. **No spec selects on the carousel, rail, tablist, or channel-letter
column** (`grep -rniE 'carousel|label.?rail|tablist|role.?tab' e2e/` → only a *comment* in
`reactivity-instant.spec.ts:140` plus its real selector `getByRole("slider", { name: "L
channel" })`, which targets the **slider**, not the rail). The gestalt change is invisible to the
suite. **No stale selector.**

### (b) W1.A `BouncyTabs` → `SegmentedTabs` (×2: MixSourceSelector, PaneSegmentedControl)

The mobile-walk spec asserts the segmented-control options carry **`aria-pressed`** (e.g.
`walk.spec.ts:94`). I verified against glass-ui's source markup
(`src/components/custom/tabs/SegmentedTabs.vue:379–410`): for `variant="pill"` (and `"segmented"`),
`isUnderline` is **false**, so each option renders a `<button>` with `:aria-pressed` — **identical
to the old `BouncyTabs` DOM contract**. Only `variant="underline"` switches to `role="tab"` +
`aria-selected`; the demo uses `variant="pill"` at **both** sites (verified
`PaneSegmentedControl.vue:7`, `MixSourceSelector.vue:105`). **The `aria-pressed` selectors are
correct; no stale selector.**

### (c) W1.C reka-ui `^2.0.0 → ^2.9` (the K-era dock view-select dropdown blocker)

The brief asked whether the K-era booked blocker (the dock view-select dropdown, attributed to a
reka 2.8.2/2.9.7 *skew* → dual reka-ui instances) is now unblocked. Versions today: **top-level
reka-ui 2.9.9**, **glass-ui's nested reka-ui 2.9.7** — both 2.9.x, collapsed to one instance by
the W1.C `resolve.dedupe`. The K-era root cause (a *major-minor* 2.8↔2.9 mismatch across two live
instances) is structurally gone. **The view-switch/page-load specs already use the documented
`force: true` click** to bypass the dock's collapsed-summary overlay (`view-switch.spec.ts:21`),
which is correct regardless. **I could not execute the dropdown-open interaction to 100%
confirm** because Defect 2 (the TDZ) kills the app before the combobox is operable — that final
confirmation must be re-run once the boot is restored. **No selector change is warranted now**;
the spec is correct, and the dedupe should resolve the skew.

### (d) Non-semantic selectors (the only non-role/label locators)

`grep` for `locator('.')`/`locator('#')`/`getByTestId` across `e2e/`: the **only** non-role
selectors are `getByTestId("atmosphere-canvas")` (`App.vue:10`) and `getByTestId
("goo-blob-canvas")` (`GooBlob.vue:8`) on the WebGL canvases — both **present in the current
(pre-W5) demo source**, so valid now. **Forward note for N.W5.A:** when W5 deletes the goo-blob
fork and consumes `@mkbabb/glass-ui/goo-blob`, the 4 `getByTestId("goo-blob-canvas")` refs
(`webgl-goo-blob.spec.ts:41,51`, `safari/sustained-30s.spec.ts:108,188`) will break unless the
consumed component carries that test-id — W5 must preserve the `data-testid` or update these specs.
Not actionable this lane (the fork is live at HEAD).

### (e) Phantom classes

No spec references any W5.E phantom class (`stagger-children`/`dashed-well`/`pastel-rainbow-text`/
`glass-elevated`) — `grep` → 0. The suite is decoupled from the styling-debt waves.

---

## §5 — Why this lane changes nothing under its ownership

Per the lane rules ("for any TRUE pre-existing app defect — not boot, not selector — record it
honestly"; "if an app bug blocks a spec, document it precisely"): **both blockers are boot defects,
not spec/selector defects.** The specs are demonstrably correct for the post-W1 DOM. Editing any
spec or `playwright.config.*` to "go green" would either be a no-op (the selectors are already
right) or a workaround masking a real boot-break — against the standing NO-workarounds mandate, and
outside the suite's job (the suite's *value* is that it fails loudly when the app is dead, which is
exactly what inv-N-1 wants). The correct lane output is **BLOCKED with both root causes named and
dispositioned to their owners.**

---

## §6 — Gate commands run + observed output (audit trail)

| # | Command | Observed |
|---|---|---|
| 1 | `find node_modules/@mkbabb/glass-ui/dist -name '*.d.ts' \| wc -l` | 71 top-level (551 total) — dts-complete |
| 2 | `ls dist/components/custom/tabs/*.css` (glass-ui) | **none** — no component CSS in dist (Defect 1) |
| 3 | `grep -c segmented-tabs dist/styles/index.css` (glass-ui) | line 148 dangling `@import` present |
| 4 | `grep -oiE '\.segmented-(band\|cell\|track)' dist/glass-ui.css` | 3 — the **bundle** carries the rules |
| 5 | `npx playwright test` (as-found, warm cache) | **36 failed, 1 did not run** — all = Defect 1 CSS overlay |
| 6 | error-context page-snapshot (`views-generate-…`) | verbatim `segmented-tabs.css` ENOENT overlay |
| 7 | transient `cp` glass-ui `src/.../segmented-tabs.css` → `dist/.../` (triage-only) | Defect 1 neutralized |
| 8 | `npm run build` (fresh `dist/value.js`) | exit 0; `dist/value.js 131.82 kB` |
| 9 | `node -e import('./dist/value.js')` | `RGBColor` is `function` — **dist import is clean (no TDZ)** |
| 10 | cold-cache vite + headless boot probe | `APP_CHILDREN: 0`; `PAGEERROR: Cannot access 'RGBColor' before initialization` @ `src/parsing/color.ts` (Defect 2) |
| 11 | `npx playwright test` (Defect 1 neutralized) | **2 passed, 34 failed** — the 34 = Defect 2 TDZ |
| 12 | `npx vitest run` | 1654 passed / **8 failed** (all `test/color-emit.test.ts` = W7 in-progress, unrelated) |
| 13 | `node -e reka-ui version` (top-level / glass-ui nested) | **2.9.9** / **2.9.7** — both 2.9.x, deduped |
| 14 | `grep -rniE 'carousel\|tablist\|bouncy\|segmented\|phantom-classes' e2e/` | only comments + correct `aria-pressed`/slider selectors |
| 15 | cleanup: `rm` transient glass-ui dist CSS copy; `kill` probe server | sibling restored (verified GONE); no stray files in value.js tree |

---

## §7 — Files touched

**None** under `e2e/**` or `playwright.config.*` — the specs are selector-correct; the blockers are
boot defects in other ownership domains. (Transient triage artifacts — a glass-ui dist CSS copy and
throwaway `.mjs` probes — were all removed; `git status` shows zero stray files in the value.js
working tree from this lane.)

---

## §8 — Required unblocks (the two preconditions, to their owners)

1. **glass-ui dist CSS self-sufficiency** (Defect 1; glass-ui-owned, §8 cohort) — drop the
   redundant `@import` on glass-ui `src/styles/index.css:148` (the bundle already carries the
   rules), or copy `src/components/**/*.css` → `dist/components/**`. Then re-link the local dist.
2. **`RGBColor` TDZ break** (Defect 2; N.W1 boot-substrate / W2.C parser-root) — break the eager
   color-class reference in the `color.ts ↔ dispatch.ts ↔ units/color/index.ts` circular chain so
   the demo's `@src` graph mounts console-clean (not merely imports cleanly in node/vitest). This
   is the substrate that inv-N-1's boot-smoke must turn green.

After **both** land and the local dist is fresh, **re-run `npx playwright test`** — the specs are
already correct (verified §4), so the suite should reach green with no further e2e change; the one
item to re-confirm at that point is the dock view-select dropdown-open (§4c), which the boot-break
prevented from a live test this pass.

**No git commit/push performed (the lead integrates).**
