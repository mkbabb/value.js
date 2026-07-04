# Legacy/workaround/fallback sweep — `demo/@/composables/**`, `demo/@/lib/**`, `demo/color-picker/**`, `vite.config.ts`, `scripts/`

Scope: every file under the five globs, read in full or by targeted grep, cross-checked
against a live probe of the running dev server (`localhost:9000`, PID 88836,
started `npx vite --port 9000` — bare, no `VITE_API_URL`) and the live prod API
(`https://api.color.babb.dev`). AUDIT ONLY — no edits made.

## Convergent confirmation (not a new finding — corroborates `api-broken-rootcause.md`)

Independently reproduced the same chain that lane `api-broken-rootcause.md` already
roots-caused in full: the live `:9000` dev server has no `VITE_API_URL`, so
`demo/@/lib/palette/api/client.ts:35` (`BASE_URL = import.meta.env.VITE_API_URL ??
DEFAULT_REMOTE_API_URL`) falls through to prod `https://api.color.babb.dev`. Verified
live:

```
curl -H 'Origin: http://localhost:9000' -D- https://api.color.babb.dev/palettes?limit=1
  -> HTTP 200, but Access-Control-Allow-Origin: https://color.babb.dev (fixed, ignores
     the request Origin — api/src/middleware/cors.ts:24-30's documented "fall back to
     the first allowed origin" branch)
```

A browser fetch() from `:9000` is blocked by this CORS mismatch and rejects with a
`TypeError` indistinguishable from a real outage, which trips the availability latch
(`demo/@/lib/palette/api/availability.ts`) to `unavailable` — every backend-dependent
surface (browse/vote/rename/delete/publish/color-name lookup) then silently degrades
to "backend offline — working locally," which is very likely the substance of S-11.
The other lane's report carries the full mechanism + fix options; **I did not
re-litigate it**, only confirmed it holds from the composables/lib side (`client.ts`,
`availability.ts`) and note the availability latch itself (`availability.ts`) is
well-designed and NOT the defect — it is doing exactly what its own doc-comment says
(K-INV5, R.W3-adjudicated): trip on network-level failure, short-circuit repeat
doomed requests, admit one recovery probe after cooldown. ROOT-ROUTING: **api** (CORS
allow-list) + **value.js demo/scripts** (the `npm run dev` vs `scripts/dev.sh`
discovery gap) — same as the other lane's verdict.

---

## P1 — `ColorModel.savedColors` typed as `Array<ParsedColorUnit | any>` collapses to `any[]`, forcing 4 redundant `as any` casts

**File**: `demo/@/components/custom/color-picker/index.ts:33`

```ts
export type ColorModel = {
    ...
    savedColors: Array<ParsedColorUnit | any>;
};
```

A union with `any` collapses to `any` under TS's type system — the field is
effectively `any[]`, not `Array<ParsedColorUnit>`. This directly forced 4 sites to
either redundantly re-cast an already-`any` value or accept an implicit `any`
parameter, all doing the exact same `normalizeColorUnit(c, true, false)` call whose
signature (`src/units/color/normalize.ts:57`) wants exactly `ParsedColorUnit`
(`ValueUnit<Color<ValueUnit<number>>, "color">`) — the type IS known and correct at
every call site, the field declaration is simply wrong:

- `demo/@/composables/color/useAppColorModel.ts:35,55,91` — `normalizeColorUnit(c as any, true, false)` ×3
- `demo/@/composables/palette/usePaletteManagerWiring.ts:58` — `savedColors.findIndex((c: any) => { ... })`

**Failure scenario**: this is the ONE typed alias for what a "saved color" is anywhere
in the app; because it is silently `any`, a future consumer can push any shape into
`savedColors` (a `string`, a `PaletteColor`, `undefined`) and `tsc`/`vue-tsc` will
never catch it — the failure only surfaces at runtime inside `normalizeColorUnit`
(a thrown error deep in library code, at a call site with no context about which
`savedColors` entry was malformed).

**ROOT-ROUTING**: value.js demo. Fix: `savedColors: ParsedColorUnit[]`, then delete
all 4 `as any` / `(c: any)` sites — they become no-ops once the field is correctly
typed. This is exactly the class of hole the root `CLAUDE.md` "Minimize `as any`"
discipline exists to prevent (the `src/` 0-`as any` count is measured; `demo/` is not
currently measured, but the same policy language ("prefer typed narrowing") is
repo-wide, and this is a >0-effort, byte-for-byte trivial fix).

## P1 — `useSlugMigration.ts` status-code string-matching is dead code; the typed `ApiProblem.status` it should use already exists

**File**: `demo/@/composables/palette/useSlugMigration.ts:76-82`

```ts
} catch (e: any) {
    const msg = e?.message ?? "";
    if (msg.includes("409")) slugBarRef.value?.setError("Already signed in as this slug.");
    else if (msg.includes("404")) slugBarRef.value?.setError("Slug not found.");
    else if (msg.includes("429")) slugBarRef.value?.setError("Too many attempts.");
    else slugBarRef.value?.setError(msg || "Login failed");
}
```

`e` here is (in practice) an `ApiProblem` thrown by `client.ts`'s `request()`
(`demo/@/lib/palette/api/api-problem.ts`), whose `.message` is set from the
constructor to the RFC 7807 `title` field, NOT a string containing the numeric HTTP
status. Traced to the server: for the exact three cases this code tries to detect,
`api/src/services/session/auth.ts:121` throws `ConflictError("Already logged in as
this user")` (409), `:130`/`:175` throw `NotFoundError("User not found")` (404), and
`api/src/middleware/rate-limit.ts:97,106` throws `RateLimitError()` → default message
`"Rate limit exceeded"` (429). **None of these three message strings contains "409",
"404", or "429"** — confirmed by reading the exact throw sites, not by inference. Every
branch here is unreachable; the code always falls to the generic `else`, so a user
switching to an already-claimed slug sees the raw server title ("Already logged in as
this user") instead of the friendlier authored copy ("Already signed in as this
slug."), and likewise for the 404/429 cases. `api-problem.ts`'s own doc-comment and
`api/src/errors/index.ts:44-45` explicitly name the correct idiom: "the demo's
`ApiProblem` branches on HTTP status, never on the literal `type` string" — i.e. this
file should be doing `e instanceof ApiProblem ? e.status : undefined` against a
numeric `409`/`404`/`429`, exactly like the pattern the codebase's own docs prescribe
and that `client.ts`/`api-problem.ts` were built to support.

**ROOT-ROUTING**: value.js demo. Fix: `import { ApiProblem } from "@lib/palette/api"`
(already re-exported from `client.ts:141`), branch on `e instanceof ApiProblem ?
e.status : undefined` instead of substring-matching `e.message`.

## P2 — Two unbounded `setTimeout` retry-poll loops with no cap, timeout, or unmount cleanup

**File**: `demo/@/composables/palette/usePaletteManagerWiring.ts`

- `emitAddColor`'s catch-all fallback (`:74-83`, `tryAdd`) and `emitStartEdit`
  (`:92-99`, `tryStartEdit`) both poll `colorPickerRef.value` every 50 ms via
  self-rescheduling `setTimeout`, with **no attempt cap, no overall timeout, and no
  cleanup if the owning component unmounts before `colorPickerRef` resolves**. If the
  `ColorPicker` instance is ever permanently absent for the current pane/layout (e.g.
  a future mobile layout that doesn't mount it, or the ref never binds due to an
  unrelated regression), these loops run forever, each retaining a closure over
  `css`/`target` — a genuine (if narrow) timer leak, and a silent one: nothing ever
  logs or surfaces "gave up waiting for the color picker."
- `emitAddColor`'s outer `try { ... } catch { tryAdd loop }` (`:51-84`) also wraps
  the entire color-add logic (parse, normalize, dedupe-scan, model mutation) in one
  catch, so a genuine bug anywhere in that block (not just "picker not mounted yet")
  silently falls through to the same infinite-retry path instead of surfacing.

**ROOT-ROUTING**: value.js demo. Fix: cap both polls at a bounded attempt count /
deadline (mirroring the pattern already used correctly elsewhere in this same repo,
e.g. `scripts/dev.sh`'s `wait_sibling_first_pass` — bounded loop + an explicit
give-up log line), and narrow `emitAddColor`'s catch to the specific "ref not yet
mounted" condition rather than swallowing all failures identically.

## P2 — `useCustomColorNames.ts` outer catch is broader than its own justification

**File**: `demo/@/components/custom/color-picker/composables/useCustomColorNames.ts:45-53`

The composable's inv-K-5 doc-comment justifies silence specifically for "a
failed/absent read" (i.e. network absence) so the e2e zero-console-errors gate holds
with no backend. But the `try` block it wraps (`:20-44`) also contains the entire
name-registration loop — a schema change in the approved-names response shape, a
`registerColorNames`/`Map` bug, or any other genuine programming error in that ~24-line
block is caught by the exact same silent `catch {}` and reported identically to "no
backend was there." This conflates two very different failure classes (an
environmental absence vs. a code defect) under one undiagnosable silence, with zero
`import.meta.env.DEV`-gated diagnostic even in local development. The narrower inner
`catch` at `:36-38` (per-entry CSS parse failure) is correctly scoped and not at
issue.

**ROOT-ROUTING**: value.js demo. Fix: keep the outer catch's product behavior (silent
in production, per inv-K-5's e2e contract) but distinguish "no backend reachable"
(swallow, matches the adjudicated contract) from any other thrown shape (at minimum
`console.debug` gated on `import.meta.env.DEV`, so local development doesn't
experience the exact same undiagnosable silence the user's own dev-server session
just did for a different reason).

## P3 — `usePaletteStore.ts`'s storage deserializer silently discards all local palettes on any parse/shape mismatch

**File**: `demo/@/composables/palette/usePaletteStore.ts:14-24`

```ts
read(raw: string): PaletteStore {
    try {
        const parsed = JSON.parse(raw);
        if (!parsed || typeof parsed.version !== "number") {
            return defaultStore;
        }
        return parsed;
    } catch {
        return defaultStore;
    }
},
```

Any JSON-parse failure OR any stored value whose `version` isn't a `number` silently
returns `{ version: 1, palettes: [] }` — i.e. every locally saved palette a user has
ever created is silently dropped, with no user-facing signal, no migration path, and
no distinction between "corrupted storage" and "an older/newer schema version that
could have been migrated." Currently low-risk because `version` has never been bumped
past `1` since introduction (verified: the literal `1` is the only value written
anywhere in the tree), so this is a **latent** landmine, not an active bug — but the
shape is exactly the "silently discard on any mismatch, no migration, no signal"
pattern the sweep is watching for, and it will fire the day a `version: 2` schema
change ships without a companion migration branch here.

**ROOT-ROUTING**: value.js demo. No action needed now; flag as a wave-item for
whichever wave next touches the local palette schema — add a version-keyed migration
branch (or at minimum a `console.warn` in dev) instead of a silent reset-to-empty.

## Not findings — verified clean

- **`scripts/boot-smoke.mjs`, `scripts/abrogation-sweep.mjs`, `scripts/dev.sh`,
  `scripts/deploy.sh`, `scripts/deploy-hook.sh`** — every fallback/allow-list is
  narrow, announced (non-silent `note`/`log` lines), and documented with the specific
  historical failure it defeats (dep-optimizer cache silencer, glass-ui exports-map
  drift, docker→native mongod fallback, etc). No masking found; these are the
  legitimate "at-the-root" structural gates the project's own precepts call for.
- **`vite.config.ts`'s value.js self-alias + `dedupe` + `server.fs.allow`
  widening** — each is doc-commented with the exact defect it was cut to fix
  (the `@mkbabb/value.js/math` "Not a directory" break, the dual-Vue-instance
  Teleport `insertBefore` NotFoundError, glass-ui's font-asset relative-`url()`
  walk). Legitimate, not workarounds.
- **The API-availability latch** (`availability.ts`) — deliberate, documented,
  adjudicated (R.W3 K-INV5); correct behavior, not a legacy shim.
- **`useAtmosphere.ts`'s picker-color → aurora-seed / blob-palette wiring** — traced
  end-to-end (`cssColorOpaque` computed → `watch(..., {immediate:true})` → `
  auroraAtoms.seed = css` / `blobConfig.color.paletteStops = deriveBlobPalette(...)`)
  and it is correctly reactive; `glass-ui`'s `deriveAurora` (`../glass-ui/src/
  components/custom/aurora/composables/color.ts:222+`) does vary L, C, AND hue (via
  `harmony`/`hueSpread`) from the seed, not just lightness. If **S-18** ("aurora does
  not update from the current color at all") still reproduces, the defect is most
  likely in glass-ui's `useAurora`/`resolveRenderMode` internals or perceptual
  parameter defaults (weak `chromaFalloff`/`hueSpread` magnitudes), not in this
  composable's wiring. ROOT-ROUTING for S-18 if it reproduces: **glass-ui producer**,
  not value.js demo — recommend the S-tranche's aurora-focused lane
  (`aurora-derive-audit.md`) make the final call with a live before/after screenshot
  probe, which is outside this lane's file scope.
- **`useUserAuth.ts`, `useSession.ts`, `useSafeStorage.ts`, `dateFormat.ts`,
  `usePaletteActions.ts`, `useTagEdit.ts`, `useBrowsePalettes.ts`,
  `usePaletteManager.ts`, `quantize-worker.ts`, `color-utils.ts`** — all silent
  catches found are narrow, single-purpose, and either documented or self-evidently
  best-effort (session revoke on logout, mid-grey color-parse fallback matching a
  documented prior resolver's behavior, ISO-date format fallback). No masking of
  genuine defects found.
- **VITE_* env branching** — exactly one site (`client.ts:35`), single documented
  purpose (test-endpoint DI), no scattered ad-hoc branches elsewhere in the swept
  tree.

## Candidate wave-items (this lane)

1. Type `ColorModel.savedColors` as `ParsedColorUnit[]`; delete the 4 downstream
   `as any` sites (P1, trivial).
2. `useSlugMigration.ts`: replace `msg.includes("409"/"404"/"429")` with `e
   instanceof ApiProblem` + numeric `.status` branching (P1, trivial, restores
   the 3 authored user-facing error messages that currently never show).
3. Bound the `tryAdd`/`tryStartEdit` polling loops in `usePaletteManagerWiring.ts`
   with a max-attempt/deadline + give-up log; narrow `emitAddColor`'s catch scope
   (P2).
4. `useCustomColorNames.ts`: dev-gated diagnostic on the outer catch, distinguishing
   "no backend" from "malformed response / code defect" (P2).
5. `usePaletteStore.ts`: version-keyed migration branch (or dev warn) instead of
   silent reset-to-empty on schema mismatch (P3, latent — book for the wave that
   next bumps the local schema version).
