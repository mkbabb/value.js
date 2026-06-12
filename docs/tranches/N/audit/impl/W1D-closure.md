# N.W1.D — e2e green-baseline closure (the gate, third attempt)

**Lane:** W1.D-closure · **Branch:** `tranche-f-handoff` · **Date:** 2026-06-12
**Charter gate:** `e2e = green baseline` (all 5 Playwright projects).
**Ownership (strict):** `e2e/**` + `playwright.config.*` — spec/fixture fixes
ONLY (real-user interactions, no `force:true` masks, no arbitrary timeouts).
Any residual that is a TRUE app defect is documented (file:line + live-probe
evidence + owning wave), NOT fixed in app code.

**Predecessors:** the boot was fixed at W1 (imports gestalt + mechanism-C), the
`RGBColor` TDZ at W7.A, the SwiftShader harness at the W2 gate, and the two app
defects (Defect-A aurora-GL hang, Defect-B dock-open) by the N.W5 remediation
lanes (`W5-defectA.md` / `W5-defectB.md`). This lane runs the suite on that
restored substrate, triages everything the now-booting app newly exposes, and
drives it to green.

---

## §0 — Verdict

**GREEN.** Static gates all clean; the full Playwright suite is **37 passed /
0 failed across all 5 projects**, zero flaky, zero retries. I fixed **8 e2e
files** (1 fixture + 7 specs) — all genuine stale-selector / stale-fixture
defects revealed for the first time now that the app boots far enough to render
the panes (every prior W1.D attempt was boot-blocked at `0-passed`, so this
debt was never visible). Two residuals are dispositioned to their owning waves
with live-probe evidence: a **direct-hash-route pane-hydration defect** (worked
around in-spec via the real-user dock path) and a non-fatal **`availableTags`
prop-shape `console.warn`** under the e2e data-stub. Neither blocks the gate.

---

## §1 — Static gates (recorded)

| gate | command | result |
|---|---|---|
| typecheck | `npm run typecheck` | **0** (vue-tsc lib + demo) |
| lint | `npm run lint` | **0** (`eslint . --max-warnings=0`; covers `e2e/**`) |
| unit | `npx vitest run` | **1709 passed / 41 files** (the 8 W7 keyframes-emit fails the prior W1D doc noted are resolved at 0.12.0) |
| boot-smoke | `npm run boot-smoke` | **PASS** — demo mounts, console clean, cold dep-optimizer cache |

> e2e specs are not under the typecheck tsconfigs (lib + demo only); eslint
> lints `e2e/**` (0) and Playwright's own TS transpile + a clean suite run is
> the spec type-validity proof.

---

## §2 — e2e suite (the gate) — full per-project tally

`npx playwright test` (all 5 projects, SwiftShader harness, warm webServer on
:8090):

| project | passed | failed | notes |
|---|---|---|---|
| **smoke** | **20** | 0 | desktop Chromium incl. WebGL atmosphere + goo-blob + view-anchors |
| **smoke-admin** | **12** | 0 | admin views via `addInitScript` mock fixture |
| **smoke-mobile** | **2** | 0 | Pixel-7 layout probe |
| **smoke-reactivity** | **2** | 0 | slider-keyboard + spectrum-drag instant-update (workers:1) |
| **smoke-safari** | **1** | 0 | iPhone-14 WebKit sustained-30s context-loss probe |
| **TOTAL** | **37** | **0** | **0 flaky, 0 retries, 0 did-not-run** |

### As-found (before this lane's spec fixes)

The first full run on the restored boot was **25 passed / 12 failed**. The
boot, the aurora-GL hang, and the dock-open were all already fixed — the
mobile/reactivity/safari/webgl specs were green from the start, proving
Defect-A and Defect-B are genuinely closed. The 12 failures were the previously
boot-masked spec/fixture debt, in two mechanism classes (below).

---

## §3 — Triage: the 12 as-found failures → root causes → fixes

Every failure was diagnosed by **live headless probe** (real SwiftShader launch
flags, same-origin `VITE_API_URL` to mirror `playwright.config.ts`), not guessed
from the trace. Three mechanism classes, all in `e2e/**`:

### Class 1 — greedy API-mock glob swallowed a Vite source module (6 specs)

`e2e/smoke/fixtures/user-auth.ts` mocked `page.route("**/palettes**", …)`. That
glob also matched the demo's **own source module**
`/@fs/…/demo/@/lib/palette/api/palettes.ts` (created by the H.W3 `api.ts`→9-module
decomposition) and fulfilled the JS module with a JSON body. The browser then
threw `Failed to load module script: Expected a JavaScript-or-Wasm module
script…`, `#app` stayed at **0 children**, and `main` never mounted.

- **Live proof:** logging every URL the glob intercepted returned exactly
  `/@fs/…/demo/@/lib/palette/api/palettes.ts`; with the glob tightened, `main`
  mounts and the API stub still fires for real `/palettes` requests.
- **Specs hit:** `palette-{save,edit,delete,flag,fork}.spec.ts`,
  `vote-toggle.spec.ts` (all use `userTest`).
- **Fix:** replaced the glob with an `isPaletteApi(url)` URL-predicate that
  matches the `/palettes` REST path component and excludes any Vite source
  namespace (`/@fs/`, `/@id/`, `/@vite/`, `/node_modules/`) or module extension
  (`.ts/.vue/.js/…`). Latent since H.W3; only visible now that the app boots.

### Class 2 — the dual-pane `.last()` heuristic inverted (5 specs)

The demo mounts each pane in two responsive layout slots; the off-breakpoint
copy is `display:none` inside `.pane-wrapper.hidden`. Specs targeted the visible
desktop copy with a positional `.last()`, on the stale assumption "the mobile
copy renders first, so `.last()` is the visible desktop one." Live probe at
1280×720: the **visible** copy is now index **0**; the hidden copy is the
**last**. So `.last()` resolved a `display:none` element → `toBeVisible`/`fill`/
`click` timed out.

- **Live proof:** per affected view, exactly one visible input/button (no hidden
  ancestor) at index 0 and one `display:none` copy at the last index.
- **Specs hit:** `views/palettes.spec.ts`, `admin/admin-names.spec.ts`,
  `admin/admin-users.spec.ts`, `admin/flows/tag-create.spec.ts`,
  `admin/flows/tag-delete.spec.ts`.
- **Fix:** `.last()` → `.filter({ visible: true })` — selects whichever copy is
  actually rendered, robust to DOM-order flips across the responsive wrappers
  (more correct than `.last()` and more robust than `.first()`). For
  `tag-delete`'s `opacity-0` group-hover delete button, `{ visible: true }`
  still resolves the visible-pane copy (Playwright treats `opacity:0` as visible;
  the hidden pane's copy has a zero box from the `display:none` ancestor) and the
  existing `dispatchEvent("click")` idiom is unchanged.

### Class 3 — Browse view needed deterministic data (1 spec)

`views/browse.spec.ts` asserts the `PaletteCardGrid` (`role="list"`) is visible,
but `BrowsePane` renders that grid only on a successful palette fetch; on a fetch
failure it renders the "Failed to load palettes / Tap to retry" state. Under e2e
the API base is pinned same-origin (`VITE_API_URL=http://localhost:8090`,
inv-K-5, to kill the production CORS preflight), so the `/palettes` GET resolves
to the SPA `index.html` (HTML, not JSON) → the browse store reads a load FAILURE
→ error state, no grid. The browse-targeting flow specs pass because they mock
`/palettes`; `browse.spec.ts` alone relied on live data.

- **Live proof:** `main.innerText` = "Browse | … | Failed to load palettes |
  Tap to retry"; the single `role="list"` present is `display:none` (w:0).
- **Fix:** added a path-scoped `page.route` returning a shape-correct empty
  envelope so `browseError` never sets and the grid (`role="list"`) mounts
  deterministically — the same mock idiom every data-touching spec in the suite
  already uses. Console stays clean (empty envelope, no error).

### The `palette-save` second-order fix (real-user nav)

After the Class-1 glob fix, `palette-save.spec.ts` reached `main` but still
could not find a visible "Add current color" button. Live probe established
this is NOT a selector issue — see §4 Residual #1. The legitimate real-user fix:
navigate to the Palettes pane via the dock view-select (`openView`) instead of
the `page.goto("/#/palettes")` direct-hash shortcut. Probed end-to-end via the
dock the editor renders visibly and the save persists (`color-palettes.palettes`
length → 1). The dock is the actual user path to the pane; direct hash typing is
a test shortcut, so this is a real-signal fix, not a mask.

---

## §4 — Residual app defects (dispositioned, NOT fixed here)

### Residual #1 — direct-hash boot leaves the Palettes pane in the hidden slot

**Owning wave:** N.W1 boot/pane-router substrate (or W6.B first-paint).
**Status:** real app defect; worked around in-spec via the real-user dock path.

A cold `page.goto("/#/palettes")` (no prior view-switch) mounts the Palettes
pane's `CurrentPaletteEditor` **only** in the off-breakpoint `display:none`
slot — there is no visible desktop copy until a view-switch event fires.

**Live proof (same URL, two nav paths, 1280×720 desktop):**

| nav path | "Add current color" button | search input |
|---|---|---|
| `goto("/#/palettes")` direct | **HIDDEN** | **HIDDEN** |
| `goto("/")` then dock → Palettes | **VISIBLE** | **VISIBLE** |

The asymmetry is view-specific: `goto("/#/browse")` direct renders `BrowsePane`
VISIBLE (so the browse-flow specs pass on direct nav). The `usePaneRouter` /
`useViewManager` desktop-slot assignment does not hydrate the visible slot for
the Palettes view on a cold direct-hash boot; the dock switch populates it.
**App code owner:** `demo/@/composables/usePaneRouter.ts` +
`demo/@/composables/useViewManager.ts` (pane-slot hydration on cold hash-route
boot). Not fixed here (app code, outside lane ownership); the spec now uses the
real-user dock nav, which is correct independent of the defect.

### Residual #2 — `availableTags` prop-shape `console.warn` under the e2e stub

**Owning wave:** N.W3 (CRUD/contract honesty) or the demo tags-data path.
**Status:** non-fatal warning; does NOT trip any `consoleErrors` assertion (it
is `console.warn`, not `console.error`) and blocks no flow. Suite is green.

Under the admin-tags e2e mock the tags read resolves to an Object rather than a
`Tag[]`, so `SearchFilterBar`'s `availableTags: Tag[]` prop logs
`[Vue warn] Invalid prop: type check failed for prop "availableTags". Expected
Array, got Object` (20× across the admin run). Chain:
`demo/@/components/custom/panes/BrowsePane.vue:135`
(`availableTags = computed(() => pm.tagEdit.allTags.value)`) →
`SearchFilterBar.vue:145` (`availableTags: Tag[]`). The defect is the tags-data
shape (`pm.tagEdit.allTags.value` is not always an array under the stubbed
read); the demo should coerce/guard the tags read to an array. App code, warn
only — flagged, not fixed.

---

## §5 — Files touched (this lane, all `e2e/**`)

| file | change | class |
|---|---|---|
| `e2e/smoke/fixtures/user-auth.ts` | `**/palettes**` glob → `isPaletteApi` URL-predicate (excludes Vite source modules) | 1 |
| `e2e/smoke/flows/palette-save.spec.ts` | direct-hash nav → `openView` dock path; `.last()` → `{ visible: true }` | 1 + R#1 |
| `e2e/smoke/views/browse.spec.ts` | add path-scoped `/palettes` empty-envelope mock so the grid mounts | 3 |
| `e2e/smoke/views/palettes.spec.ts` | search-input `.last()` → `{ visible: true }` | 2 |
| `e2e/smoke/admin/admin-names.spec.ts` | heading + search `.last()` → `{ visible: true }` | 2 |
| `e2e/smoke/admin/admin-users.spec.ts` | heading + search `.last()` → `{ visible: true }` | 2 |
| `e2e/smoke/admin/flows/tag-create.spec.ts` | name/category/button `.last()` → `{ visible: true }` | 2 |
| `e2e/smoke/admin/flows/tag-delete.spec.ts` | pill-text + delete-button `.last()` → `{ visible: true }` | 2 |

> The other 11 `e2e/**` working-tree edits + the new `e2e/smoke/fixtures/dock.ts`
> are the N.W5 lanes' prior `force:true`→`openView` migration, already in the
> tree before this lane — not mine.

**Cleanup:** all live-probe `.mjs` scripts written during triage were removed
(`git status` shows no stray `.probe*`/`.mjs` artifacts in the value.js tree).
The pre-existing untracked `$OUT` file is an unrelated stale audit artifact
(DIVE-2, dated Jun 3) — left untouched. **No git commit/push** (the lead
integrates). No `src/`, `demo/` app code, or `../glass-ui` source touched.

---

## §6 — Gate commands + observed (audit trail)

| # | command | observed |
|---|---|---|
| 1 | `npm run typecheck` | **0** |
| 2 | `npm run lint` | **0** |
| 3 | `npx vitest run` | **1709 passed / 41 files** |
| 4 | `npm run boot-smoke` | **PASS** (cold cache, console clean) |
| 5 | `npx playwright test` (as-found) | **25 passed / 12 failed** |
| 6 | live probe: greedy-glob intercepts | `/@fs/…/api/palettes.ts` (Class 1 confirmed) |
| 7 | live probe: dual-pane visibility | visible copy = index 0, hidden = last (Class 2 confirmed) |
| 8 | live probe: browse content | "Failed to load palettes" + hidden `role=list` (Class 3 confirmed) |
| 9 | live probe: `/#/palettes` direct vs dock | direct = HIDDEN editor, dock = VISIBLE (Residual #1) |
| 10 | targeted re-runs (8 fixed specs) | all PASS |
| 11 | `npx playwright test` (post-fix, full) | **37 passed / 0 failed / 0 flaky** |
| 12 | static gates re-run post-edit | typecheck 0 · lint 0 · boot-smoke PASS |

---

## §7 — Disposition / hand-off

- **Charter gate `e2e = green baseline`: MET.** 37/37 across all 5 projects,
  zero flaky/retry, on the restored boot + SwiftShader harness.
- **Residual #1** (direct-hash Palettes pane-hydration) → N.W1 boot/pane-router
  substrate (or W6.B first-paint); `usePaneRouter.ts` / `useViewManager.ts`.
  Worked around in-spec via the real-user dock nav (not a mask — the dock is the
  user path); the app behavior is still worth fixing for direct-link robustness.
- **Residual #2** (`availableTags` prop-shape warn) → N.W3 / demo tags-data
  path; coerce `pm.tagEdit.allTags` to an array at `BrowsePane.vue:135`. Warn
  only, suite green.
- Defect-A (aurora-GL) and Defect-B (dock-open) are confirmed CLOSED by the
  green mobile/reactivity/safari/webgl + view-switch specs on the SwiftShader
  config — no residual flake attributable to either.
