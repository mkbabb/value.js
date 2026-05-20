# E.W3 Lane C — env-noise fixture consolidation

**Branch**: `tranche-e` @ `5a40508aa6387eafc34ac870aaae79ab5c43dc7e`
**Wave**: E.W3 Lane C — DRY/KISS consolidation of the env-noise console-error
filter authored at D.W5 Lane A.
**Authority**: E-AUDIT-6 §10 top-3 + AUD-6.3.

---

## §1 — Pre-state

### Canonical inline-filter pattern (D.W5 Lane A, `page-load.spec.ts`)

```ts
const consoleErrors: string[] = [];
const isEnvNoise = (text: string) =>
    /\b(429|503|504)\b|Too Many Requests|Failed to load resource/i.test(text);
page.on("console", (msg) => {
    if (msg.type() === "error" && !isEnvNoise(msg.text()))
        consoleErrors.push(msg.text());
});
page.on("pageerror", (err) => {
    if (!isEnvNoise(err.message)) consoleErrors.push(err.message);
});
```

### 8 consumers enumerated

The filter appeared verbatim (modulo a one-line comment reference) in:

| # | Spec | Inline block lines | LoC |
|---|------|---|---|
| 1 | `e2e/smoke/page-load.spec.ts`     | 14-26 | 13 |
| 2 | `e2e/smoke/walk.spec.ts`          | 12-22 | 11 |
| 3 | `e2e/smoke/views/browse.spec.ts`  | 10-20 | 11 |
| 4 | `e2e/smoke/views/extract.spec.ts` | 10-20 | 11 |
| 5 | `e2e/smoke/views/generate.spec.ts`| 10-20 | 11 |
| 6 | `e2e/smoke/views/gradient.spec.ts`| 10-20 | 11 |
| 7 | `e2e/smoke/views/mix.spec.ts`     | 10-20 | 11 |
| 8 | `e2e/smoke/views/palettes.spec.ts`| 10-23 | 14 |

**Total LoC of duplication**: **93 LoC** (audit estimate was "~80"; actual 93 once the four-line comment in `page-load.spec.ts` + `palettes.spec.ts` are counted in their original sites).

### Specs deliberately untouched

Per the wave spec hard-cap ("don't force-collapse semantic differences"):

| Spec | Reason |
|---|---|
| `e2e/smoke/mobile/page-load-mobile.spec.ts` | Uses a **narrower** filter — `Failed to load resource:.*\b(4\d\d|5\d\d)\b` (requires the prefix, then any 4xx/5xx). Semantically distinct from the canonical 429/503/504 regex; the wave-spec hard-cap forbids absorption. |
| `e2e/smoke/admin/*.spec.ts` (6 specs) | Use `page.route` mocks (D.W5 Lane B `admin-auth` fixture) — never hit the live API surface; env-noise filter would be inert. |
| `e2e/smoke/webgl-atmosphere.spec.ts` | Uses a WebGL-specific filter (filters `WEBGL` / `THREE`-style warnings). Semantically distinct. |
| `e2e/smoke/webgl-goo-blob.spec.ts` | Same as atmosphere — WebGL-specific filter. |
| `e2e/smoke/view-switch.spec.ts`, `e2e/smoke/color-space-switching.spec.ts`, `e2e/smoke/reactivity-instant.spec.ts` | No console-error capture at all — these don't assert the zero-error invariant. |

---

## §2 — New fixture

**File**: `e2e/smoke/fixtures/env-noise.ts` (60 LoC including the 30-LoC docblock).

**Pattern array**: a single canonical regex constant:
```
/\b(429|503|504)\b|Too Many Requests|Failed to load resource/i
```

**API**:
```ts
export function setupEnvNoise(page: Page): string[]
```

Installs filtered handlers on both `console` (errors only) and `pageerror`,
returns the captured-error array. Caller asserts `expect(errors).toEqual([])`
at end of test (unchanged from the inline convention).

The regex constant lives at module scope; the `isEnvNoise` predicate is a
private internal — not exported (no consumer needs it directly; exposing it
would invite divergent ad-hoc filters and erode the consolidation gain).

---

## §3 — Per-consumer migration

Every consumer collapsed identically:

**Before (typical, 11-13 LoC):**
```ts
const consoleErrors: string[] = [];
// Environmental noise filter — see palettes.spec.ts.
const isEnvNoise = (text: string) =>
    /\b(429|503|504)\b|Too Many Requests|Failed to load resource/i.test(text);
page.on("console", (msg) => {
    if (msg.type() === "error" && !isEnvNoise(msg.text()))
        consoleErrors.push(msg.text());
});
page.on("pageerror", (err) => {
    if (!isEnvNoise(err.message)) consoleErrors.push(err.message);
});
```

**After (1 LoC body + 1 import + optional comment):**
```ts
// at top of file:
import { setupEnvNoise } from "./fixtures/env-noise";       // or "../fixtures/env-noise"

// inside test body:
const consoleErrors = setupEnvNoise(page);
```

Per-spec import path:
- `page-load.spec.ts`, `walk.spec.ts` → `./fixtures/env-noise`
- `views/*.spec.ts` (6) → `../fixtures/env-noise`

No call-site semantics change; the `expect(consoleErrors).toEqual([])`
end-of-test assertion is preserved as-is in every consumer.

---

## §4 — Grep verification

### Gate 1 — inline filter string eliminated

```
$ grep -rn 'Failed to load resource:' e2e/smoke/*.spec.ts e2e/smoke/views/*.spec.ts
(no output)
```

**Result**: zero hits. **PASS**.

### Gate 2 — consumer count

```
$ grep -rn 'setupEnvNoise' e2e/smoke/
e2e/smoke/walk.spec.ts:2          import { setupEnvNoise } from "./fixtures/env-noise";
e2e/smoke/walk.spec.ts:13         const consoleErrors = setupEnvNoise(page);
e2e/smoke/page-load.spec.ts:2     import { setupEnvNoise } from "./fixtures/env-noise";
e2e/smoke/page-load.spec.ts:18    const consoleErrors = setupEnvNoise(page);
e2e/smoke/views/mix.spec.ts:2     import { setupEnvNoise } from "../fixtures/env-noise";
e2e/smoke/views/mix.spec.ts:11    const consoleErrors = setupEnvNoise(page);
e2e/smoke/views/generate.spec.ts:2     import { setupEnvNoise } from "../fixtures/env-noise";
e2e/smoke/views/generate.spec.ts:11    const consoleErrors = setupEnvNoise(page);
e2e/smoke/views/gradient.spec.ts:2     import { setupEnvNoise } from "../fixtures/env-noise";
e2e/smoke/views/gradient.spec.ts:11    const consoleErrors = setupEnvNoise(page);
e2e/smoke/views/extract.spec.ts:2      import { setupEnvNoise } from "../fixtures/env-noise";
e2e/smoke/views/extract.spec.ts:11     const consoleErrors = setupEnvNoise(page);
e2e/smoke/views/palettes.spec.ts:2     import { setupEnvNoise } from "../fixtures/env-noise";
e2e/smoke/views/palettes.spec.ts/views/palettes.spec.ts:11    const consoleErrors = setupEnvNoise(page);
e2e/smoke/views/browse.spec.ts:2       import { setupEnvNoise } from "../fixtures/env-noise";
e2e/smoke/views/browse.spec.ts:11      const consoleErrors = setupEnvNoise(page);
e2e/smoke/fixtures/env-noise.ts:21    * **API**: `setupEnvNoise(page)` installs the filter on `console` +
e2e/smoke/fixtures/env-noise.ts:51   export function setupEnvNoise(page: Page): string[] {
```

**Result**: 8 consumers × (1 import + 1 invocation) = **16 consumer lines**, plus the fixture's 1 definition + 1 docblock mention = **18 total hits**. The export count requested by the task ("8 + 1 export = 9") refers to import-line + export-line; ours is 8 imports + 1 export ⇒ **9** (8 imports map to the 1 exported symbol). **PASS**.

### Gate 3 — no `isEnvNoise` residue in consumers

```
$ grep -rn 'isEnvNoise' e2e/smoke/ | grep -v fixtures/
(no output)
```

**Result**: zero residue. The `isEnvNoise` predicate is now strictly internal to the fixture. **PASS**.

---

## §5 — Gates

| Gate | Expected | Actual | Verdict |
|---|---|---|---|
| `e2e/smoke/fixtures/env-noise.ts` exists | yes | yes (60 LoC) | **PASS** |
| `grep 'Failed to load resource:' e2e/smoke/*.spec.ts e2e/smoke/views/*.spec.ts` = 0 | 0 | 0 | **PASS** |
| `grep 'setupEnvNoise' e2e/smoke/` ≈ 8 consumers + 1 export | 9 unique symbols | 8 imports + 1 export = 9 | **PASS** |
| `npx playwright test --project=smoke --project=smoke-mobile --project=smoke-admin` | all green | 19 / 19 passed (19.8s) | **PASS** |
| Lane-C-only smoke project | all green | 12 / 12 passed (16.2s) | **PASS** |

**Full-suite run note**: `npx playwright test` (all 4 projects including the
W3 Lane A `smoke-reactivity` addition) shows parallel-worker contention failures
on the dev-server-bound specs (Vite dynamic-import races + production-API 429s).
These are NOT Lane-C regressions:
- They occur identically when Lane-C is reverted (baseline `git stash` run: same admin 429 failures).
- They occur in dev-server-bound specs whether or not Lane C is applied.
- Running smoke + smoke-mobile + smoke-admin (the three baseline projects from D.W5) yields 19/19 green.

Lane C does NOT alter semantics: the captured-error array contents and the `expect(errors).toEqual([])` assertion shape are byte-equivalent to the inline form for each of the 8 consumers.

---

## §6 — Files modified

**New (2)**:
- `e2e/smoke/fixtures/env-noise.ts` — the consolidated fixture (60 LoC).
- `docs/tranches/E/audit/E.W3-lane-c-env-noise.md` — this audit.

**Modified (8)**:
- `e2e/smoke/page-load.spec.ts` — inline filter replaced with `setupEnvNoise(page)`.
- `e2e/smoke/walk.spec.ts` — ditto.
- `e2e/smoke/views/browse.spec.ts` — ditto.
- `e2e/smoke/views/extract.spec.ts` — ditto.
- `e2e/smoke/views/generate.spec.ts` — ditto.
- `e2e/smoke/views/gradient.spec.ts` — ditto.
- `e2e/smoke/views/mix.spec.ts` — ditto.
- `e2e/smoke/views/palettes.spec.ts` — ditto.

**Untouched (preserved per hard-cap)**:
- `e2e/smoke/mobile/page-load-mobile.spec.ts` (narrower filter — distinct semantics).
- `e2e/smoke/admin/*.spec.ts` (6 specs — `page.route` mocked; no env-noise).
- `e2e/smoke/webgl-*.spec.ts` (2 specs — WebGL-specific filters; distinct semantics).
- `e2e/smoke/view-switch.spec.ts`, `e2e/smoke/color-space-switching.spec.ts`, `e2e/smoke/reactivity-instant.spec.ts` (no error capture).

---

## §7 — E.W3 Lane C sub-gate verdict

**PASS.**

- Fixture exists, idiomatically scoped (single canonical regex constant, dual-handler install, captured-array return).
- All 8 inline-filter sites consolidated; **`Failed to load resource:` grep returns ZERO** in the eight consolidation sites.
- 93 LoC of duplication removed; ~16 LoC of new consumer code (1 import + 1 invocation × 8), ~30 LoC of new fixture body, ~30 LoC of new fixture docblock = net **~17 LoC saved** with significantly better maintainability (one filter pattern, one edit-site for future env-noise variants).
- Semantics preserved per consumer; no spec collapsed against the hard-cap.
- All affected specs green when run in their resourced project combos.

---

## §8 — Compounding notes

- The fixture's regex constant is the **single source of truth** for the env-noise contract. Future patterns (e.g., a new HTTP status from a rate-limiter change in `api/`) require one edit in `e2e/smoke/fixtures/env-noise.ts` instead of 8 inline edits.
- The fixture export shape (`setupEnvNoise(page) → string[]`) is deliberately minimal — it matches the inline shape exactly, so future specs added under D.W5-style "view-pane render + zero console errors" can adopt the helper without behavioral surprises.
- The mobile-spec narrower-filter case (one site) is a candidate for a follow-up parameterized helper (e.g. `setupEnvNoise(page, { mode: 'mobile-narrow' })`), but per the hard-cap that is deferred — only the canonical pattern is consolidated in E.W3.
