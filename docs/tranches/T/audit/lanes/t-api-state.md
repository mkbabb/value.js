# Lane t-api-state — THE T BACKEND SLATE

**Fleet**: Tranche T DEVELOPMENT (2026-07-06 owner mandate).
**Substrate**: branch `tranche-t` @ `1e31b5e` (= master `cc4f4fa`, the S close).
**Charge**: the backend-state audit behind T-9's *"why does the backend not work
hereof?"* + the api books — (a) the precise dev/prod backend truth, (b) the
`/remix`+`/diff` api-hygiene deferral scoped for T, (c) full api/ health (suite,
envelope currency vs the demo wrappers post-W5-13, drift).
**Method**: source read + **live probes** of `api.color.babb.dev`, the deploy
webhook, and the NCSU alias (2026-07-07 ~05:47 UTC); api suite + typecheck run
locally against `mongodb-memory-server`. This is DEVELOPMENT — zero product-code
changes; the cures below are directions, not patches.

> **One-line thesis**: T-9's *"backend not working"* is not one thing — it is
> THREE strata that the T corpus must split. (1) On **dev `:9000`** the backend
> CORS-dies against prod **by design** (the W0-1 honest-dev contract) → that is
> the banner the owner wants gone. (2) On the **deployed `color.babb.dev`** the
> backend is UP but **stale I-era** (7 live markers) → `publish`/`unpublish` 404
> is a **real user-facing break on the live site**, fixed only by X1. (3) The
> `/remix`+`/diff` **api-hygiene deferral is deeper than recorded** — the whole
> atom-diff apparatus is **write-only legacy**. The api CODE itself is healthy
> (224/224, typecheck 0, envelope in sync with the demo).

---

## §0 — Evidence ledger (live probes, 2026-07-07 ~05:47 UTC)

| Probe | Result | Reads as |
|---|---|---|
| `GET api.color.babb.dev/` | `200 {"status":"ok","service":"palette-api"}` | api process UP |
| `GET /health` | `404 problem+json` | meta router (N.W4.D) NOT deployed |
| `GET /openapi.json` | `404` | meta router NOT deployed |
| `GET /docs` | `404` | meta router NOT deployed |
| `GET /palettes?limit=1` | `200`, real data | reads WORK on prod |
| `POST /palettes/__nope__/fork` (no session) | `401 auth-required` | **route EXISTS** — demo fork works |
| `POST /palettes/__nope__/remix` | `404 not_found` | **route ABSENT** (pre-J.W2) |
| `POST /palettes/__nope__/publish` | `404 not_found` | **route ABSENT** (pre-J.W1c) |
| `POST /palettes/__nope__/unpublish` | `404 not_found` | **route ABSENT** |
| `GET /palettes/__nope__/versions` | `200 {data:[]}` | route exists |
| `GET /palettes/__nope__/provenance` | `200 []` | route exists |
| `GET /palettes/__nope__/diff?from=x` | `404 not_found` | **route ABSENT** |
| 404 envelope `type` field | `urn:palette-api:problem:not_found` | **pre-N.W3.H** (HEAD emits `urn:contract:not-found`) |
| `/palettes[0]` envelope keys | includes `status` + `id`; **lacks** `published`, `atomSetHash` | **pre-L** (`status` excised) + **pre-K.W2** (`id`/`_id` removal) |
| CORS preflight `Origin: http://localhost:9000` | `204`, `ACAO: https://color.babb.dev` | localhost NOT in allow-list (fixed, non-reflected) |
| CORS preflight `Origin: https://color.babb.dev` | `204`, `ACAO: https://color.babb.dev` | only the deployed origin admitted |
| `deploy.babb.dev/hooks/value-js` | `404` | **X1 webhook STILL unregistered** |
| `mbabb.fi.ncsu.edu/colors/` | `200` (no redirect) | **X2 alias STILL live** |

Local suite (branch `tranche-t`, `mongodb-memory-server`): `api npm test` → **224
passed / 37 files** (exit 0, 23.5s); `api npx tsc --noEmit` → **exit 0**.

The full prod envelope keyset (live):
`colors, createdAt, currentHash, deletedAt, forkCount, forkOf, forkOfHash, id,
isLocal, name, oklabColors, slug, status, tags, tier, updatedAt, userSlug,
versionCount, visibility, voteCount, voted`.

---

## §1 — Findings

### TA-1 — T-9's "backend not working" is THREE strata; the T corpus must split them (FRAME)

**Evidence**: the owner audited the live S build on `:9000` (mandate §Substrate)
and wrote *"This banner should be removed. And why does the backend not work
hereof? [t-2004-32]"*. Three independent, separately-owned facts sit under that
one sentence, proven by the §0 ledger:

1. **Dev `:9000` CORS-death (BY DESIGN)** — the DevMisconfigBanner. Demo-owned,
   actionable now (→ TA-2).
2. **Deployed prod stale I-era** — `publish`/`unpublish` 404 is a live break.
   Maintainer-owned (X1), not agent-actionable (→ TA-3).
3. **The `/remix`+`/diff` write-only apparatus** — api-root hygiene, agent-
   actionable in T (→ TA-4).

**Root-cause**: the fetch layer collapses CORS-refusal, network-down, and
route-404 into indistinguishable failures, so *one* symptom ("features don't
round-trip") has three unrelated causes. Conflating them is the disease
(`t-contradictions` calls the same class "taste-by-proxy"; here it is
"backend-by-proxy").

**Owner**: joint (routing decision for the T plan).
**Cure direction**: the T plan must carry T-9 as a **three-lane fold**, not one
row — the demo banner cure (TA-2), the X1 maintainer op restated as *the backend
half of T-9* (TA-3), and the api-hygiene excision (TA-4). This matches
`t-deferred-census` C1's ruling ("T must split T-9's two halves") and extends it
to a THIRD (the hygiene apparatus). Do NOT let the visible banner cure imply the
backend question is answered — it is the smallest of the three.

---

### TA-2 — Dev `:9000` is CORS-dead BY DESIGN; the banner to remove is `DevMisconfigBanner` (the W0-1 honest-dev affordance)

**Evidence**:
- `demo/@/lib/palette/api/client.ts:36-37` — `DEFAULT_REMOTE_API_URL =
  "https://api.color.babb.dev"`; `BASE_URL = VITE_API_URL ?? DEFAULT`. Bare
  `dev:web-only` has no `VITE_API_URL` → BASE_URL = the cross-origin prod api.
- Live CORS proof (§0): prod returns a **fixed** `ACAO: https://color.babb.dev`
  for *every* origin — a `localhost:9000` preflight is answered `204` but with a
  non-matching ACAO, so the browser blocks the response. Every palette request on
  `:9000` preflight-dies.
- `demo/@/lib/palette/api/availability.ts:112-164` — `detectDevMisconfig` fires
  on the exact triad (unset `VITE_API_URL` + loopback origin + cross-origin
  BASE_URL) → `apiAvailability = "misconfigured"` + a loud `console.error`.
- The **banner** = `demo/@/components/custom/palette-browser/DevMisconfigBanner.vue`,
  App-mounted at `demo/color-picker/App.vue:115` — a `position:fixed; top:0;
  z-index:9999` full-width **destructive-red bar** (`background: var(--destructive)`),
  gated `v-if="isDev && misconfigured"`. There is ALSO a smaller in-editor chip,
  `ApiOfflineChip.vue` (the `misconfig` register), rendered inside
  `CurrentPaletteEditor`.

**Root-cause**: the S.W0 W0-1 seed added the always-mounted top banner as a
*safety belt* ("`ApiOfflineChip` only mounts once a palette is saved, so the
misconfig state is not guaranteed visible at first paint" — DevMisconfigBanner
comment). Its correctness is not in question; its **register is wrong** — a
full-bleed emergency-red bar over the instrument reads as a product defect, which
is precisely what the owner flagged. The state is WORKING AS DESIGNED; the
*affordance* is too loud and mis-placed.

**Owner**: demo.
**Cure direction (gestalt, not a delete)**: the mandate's own T-9 words are
"REMOVE the banner … the UX must communicate this without a banner." So the cure
is a **register transposition, not a deletion of the signal** (E-3 forbids
losing the honest state):
- Retire the fixed red bar (`DevMisconfigBanner.vue` App-mount) as a surface.
- Fold its guarantee into the **instrument's own idiom** — the `ApiOfflineChip`
  register already exists (a Fira-Code small-caps status lamp). Promote the
  misconfig lamp to a **dock/status-line seat** that is present at first paint
  (not gated on a saved palette), so the honest `misconfigured`/`unavailable`
  states live where the instrument's other status glyphs live, not as a
  page-spanning alarm.
- Keep the load-bearing `console.error` (the dev-facing truth) untouched.
- This dovetails with T-16 (the "strange bottom-left corner element") and the
  `t-misc-elements` lane — the status register wants ONE home, decided jointly.

---

### TA-3 — The deployed `color.babb.dev` runs STALE I-era prod; `publish`/`unpublish` 404 is a REAL live-site break (the backend half of T-9)

**Evidence** (all live, §0): prod is materially older than HEAD, dated by **7
converging markers**:

| Marker (live prod) | Era floor | HEAD behavior |
|---|---|---|
| envelope emits legacy `status` | **pre-L** | L excised `status`; canonical is `(visibility, tier)` |
| envelope emits `id` (Mongo `_id`) | **pre-K.W2** | K.W2/R.W2 id-removal (K-PALID); HEAD strips `_id`, emits NO `id` |
| envelope LACKS `published`, `atomSetHash` | **pre-J** | J.W1c `published` + J.W2 `atomSetHash` |
| `POST /publish`, `/unpublish` → 404 | **pre-J.W1c** | shipped verbs |
| `POST /remix`, `GET /diff` → 404 | **pre-J.W2** | shipped routes |
| 404 `type = urn:palette-api:problem:not_found` | **pre-N.W3.H** | HEAD emits `urn:contract:not-found` |
| `/health`,`/openapi.json`,`/docs` → 404 | **pre-N.W4.D** | HEAD mounts the meta router |

Net: prod ≈ **I-era** (I.W1 `visibility`/`tier` + I.W2 `deletedAt` PRESENT; J/K/L/N
ABSENT) — sharpening the S FINAL §5/§8 "STILL I-era" claim to a dated floor.

**The live consequence** — the deployed frontend (`color.babb.dev`, Cloudflare
Pages) targets this prod api by default (`BASE_URL`). Against I-era prod:
- **WORKS**: browse/list/get (`200` real data), `fork` (`401` = route present),
  `versions`, `provenance`, vote/flag, sessions, colors, create/patch. The
  envelope is a forward-compatible **superset** — the demo reads `visibility`/
  `tier` (present) and ignores the extra `status`, so reads never crash.
- **BROKEN ON THE LIVE SITE**: **`publish` / `unpublish`**. The demo's
  `publishPalette` → `POST /:slug/publish` and `unpublishPalette` →
  `POST /:slug/unpublish` (`demo/@/lib/palette/api/palettes.ts:112-135`, the
  W5-13 · F-4 Q1 visibility verbs) hit a **404** on prod → `ApiProblem` is
  thrown → any user who tries to make a palette public on `color.babb.dev` gets a
  failure. On prod the DevMisconfigBanner never mounts (`import.meta.env.DEV`
  gate), so the break is a **silent per-action error**, not a banner.
- **Envelope degradation**: prod omits `published` + `atomSetHash`; the demo
  types them optional (`types.ts:49,56`), so no crash, but any UI that reads
  `palette.published` sees `undefined` (→ everything reads unpublished) and
  atom-set dedup hints are absent.

**Root-cause**: **X1** — the `deploy.babb.dev/hooks/value-js` webhook is
unregistered (live `404`), so no `master` push has ever landed post-I code on the
host. This is a two-tranche chronic carry (R.W7 → S → T).

**Owner**: maintainer (op is on-host: register the hook, push `master`; exact
steps in S `FINAL.md §8.1` / R `FINAL.md §7`). Un-actionable by agents by
construction.
**Cure direction**: fold into **T-CLOSE as the named backend-half of T-9** (per
`t-deferred-census` C1), with the *new, sharper* framing that this is not merely
"prod is old" but "**the shipped publish feature is 404-broken for real users
until the redeploy**." T should also add a **standing prod-lineage assert** — a
CI/boot probe that compares `GET /` (or a `/health` lineage stamp once deployed)
against the expected build so the *next* stale-prod window is caught by an oracle,
not by an owner eyeball 6 months later. (Interacts with `t-ci-lighthouse-record`.)

---

### TA-4 — The `/remix`+`/diff` api-hygiene deferral is DEEPER than recorded: the atom-diff apparatus is WRITE-ONLY legacy

**Evidence** (source trace, branch `tranche-t`):
- **Demo consumes neither** `/remix` nor `/diff` — grep of `demo/@/lib/palette/`
  finds only doc-comment references; the sole live fork/version verb is
  `forkPalette` → `POST /:slug/fork` (`api/versions.ts:43-48`, used by
  `useVersionHistory.ts:103`). The K-W3DIFF alt-exit was TAKEN demo-side at W5-13.
- The physical api surface still lives:
  - route `POST /:slug/remix` — `api/src/routes/palettes/forks.ts:62-97`
  - route `GET /:slug/diff` — `api/src/routes/palettes/diff.ts` (whole `diffRouter`,
    mounted `routes/palettes/index.ts:39`)
  - service `computePaletteDiff` — `api/src/services/palette/diff.ts` (**consumer
    grep: ZERO besides its own route** — dies with the route)
  - service `remixPalette` — `api/src/services/palette/forks.ts:50`
  - validation `remixPaletteBody` — `api/src/validation/palette.ts:70` (consumed
    ONLY by the remix route)
  - meta-catalog entries — `api/src/routes/meta-routes.ts:45,48`
  - engine `api/src/lib/crud/atomdiff.ts` (`diffAtoms`/`DiffResponse`/`AtomDiffOp`)
  - tests `api/test/conformance/diff.test.ts` (371 LoC), `api/test/services/palette-remix.test.ts` (104 LoC)

**The load-bearing discovery — the stored atom-diff has NO reader:**
- `forkPalette` is *"the zero-change special case of `remixPalette`"* — it
  **delegates**: `forks.ts:181 const { palette } = await remixPalette(...)` with
  no `colors`. So `/fork` (LIVE, demo-consumed) depends on `remixPalette`.
  `remixPalette` cannot be raw-deleted.
- `remixPalette` computes `atomDiff = diffAtoms(...)` (`forks.ts:76`) and persists
  it on the child version record (`versions.ts:80 atomDiff: input.atomDiff ?? null`;
  typed `models.ts:172` + `versions.ts:31`).
- **Reader grep for `.atomDiff` across `api/src` returns ONLY the write site**
  (`versions.ts:80`). The versions route + `format/palette.ts` do NOT expose it.
  Even `/diff` never read the stored value — `computePaletteDiff` **recomputes**
  from `colors` (`diff.ts:85`). ⟹ the persisted `PaletteVersion.atomDiff` column
  is **write-only** and always was.

**Root-cause**: J.W2 shipped an atom-diff *feature* (remix + diff + a stored diff
column) whose read side (`/diff`) was retired demo-side at W5-13 but whose write
side was left in place. The result is exactly the E-3 legacy the mandate forbids —
a column written on every fork and read by nothing, plus two dead HTTP verbs. The
S FINAL recorded it as "delete the physical routes"; the deferred-census H3 got
closer ("do not leave write-only `atomDiff`"); the live trace proves the write-only
smell reaches the **version schema**, not just the routes.

**Owner**: api (`src`-backend).
**Cure direction (gestalt excision + fold, NOT a raw `rm`)** — a spec, sequenced
so `/fork` never breaks:
1. **Delete the two dead HTTP routes** — `POST /:slug/remix` (forks.ts route) and
   the whole `GET /:slug/diff` router (unmount from `palettes/index.ts`).
2. **Delete their route-only leaves** — `computePaletteDiff` + `services/palette/diff.ts`;
   `remixPaletteBody` (validation); the two meta-catalog rows; `conformance/diff.test.ts`.
3. **Collapse the fork↔remix duality** — fold `remixPalette` back INTO
   `forkPalette` (fork is now the only caller and always passes empty `colors`);
   excise the `colors`-diff branch. This kills the write-only `atomDiff` **at its
   source** and honors the L-era "one code path, no dead branches" closure.
4. **Excise the write-only apparatus** — drop `PaletteVersion.atomDiff`
   (`models.ts:172` + write `versions.ts:80` + type `versions.ts:31`) and
   `lib/crud/atomdiff.ts` (`diffAtoms`/`DiffResponse`/`AtomDiffOp`), all dead
   after step 3. **KEEP** `computeAtomSetHash` (`hash.ts:45`) — it is the
   colors-only dedup fingerprint (`atomSetHash`), independent of `diffAtoms`
   (only a doc-comment references the latter) and still emitted by `formatPalette`.
5. **Migration note** — existing `palette_versions` docs carry an inert
   `atomDiff` field; forward-safe to leave orphaned or `$unset` in a soft-delete-
   style migration, and to drop from the `assertMigrationsApplied` probe. No
   reader means no data risk.
6. **Ride the E-1 backend colocation transposition** (§0 owner text: "similar
   treatment … for all backend files") — do this excision as part of the
   `t-coloc-backend` package-by-feature move, not a separate pass, so the
   `palette/` domain module lands already free of the dead apparatus.

---

### TA-5 — Envelope currency: the CODE↔CODE envelope is IN SYNC (W5-13 · F-7); the only drift is prod↔HEAD (stale), not a demo defect

**Evidence**:
- HEAD `formatPalette` (`api/src/format/palette.ts:19-48`) emits
  `{name, slug, colors, oklabColors, tags, voteCount, userSlug, visibility, tier,
  deletedAt, createdAt, updatedAt, currentHash, forkOf, forkOfHash, forkCount,
  versionCount, published, atomSetHash, isLocal, voted}` — **no legacy `status`,
  no `id`** (K-PALID slug-identity).
- Demo `Palette` type (`demo/@/lib/palette/types.ts:14-64`) reads exactly those:
  `visibility`, `tier`, `published` (W5-13 · F-7 explicitly typed "so consumers
  get compile-time coverage"), `deletedAt`, `atomSetHash`, `voted`. The wrappers
  and the formatter agree field-for-field.
- The **error** envelope is likewise in sync: `envelope.test.ts` asserts the RFC
  7807 `application/problem+json` shape with N.W3.H `urn:contract:*` URNs, and the
  demo parses it via `ApiProblem.from` (`client.ts:121`, tolerant of any `type`).

**Root-cause / verdict**: there is **no code-level envelope drift** to cure. The
"backend not working" signal has *no* contribution from an envelope mismatch in
the shipped code. The ONLY mismatch is temporal — prod (I-era) emits a superset
(`status` + `id`) and a subset (no `published`/`atomSetHash`) relative to HEAD —
which is a **redeploy problem (TA-3/X1), not a contract problem**.

**Owner**: src (informational — no change).
**Cure direction**: none required for the contract. T should merely record that
the demo's forward-compat (all new fields optional) is what keeps the stale-prod
site from hard-crashing — a property to preserve, not a bug to fix.

---

### TA-6 — api/ CODE health is GREEN: 224/224 suite, typecheck 0, L-invariants intact

**Evidence** (branch `tranche-t`): `api npm test` → **224 passed / 37 files**
(exit 0); `api npx tsc --noEmit` → **exit 0**. The suite spans conformance
(crud/diff/idempotency), repositories (×9), routes (×7), and services (×15),
against ephemeral `mongodb-memory-server`. The L closure holds structurally:
`as any = 0`, `as unknown as = 1` (the policy-commented `server.close()` handle,
`index.ts:189`), typed `ApiError` boundary, no legacy palette fields in `src`,
routes-call-services-not-repositories.

**Root-cause / verdict**: the api **code** is healthy; the T backend work is
NOT a correctness-repair effort. The three real items are the deploy staleness
(TA-3, maintainer), the write-only hygiene (TA-4, api), and the dev-banner
register (TA-2, demo). One doc-truth nit: the api CLAUDE.md still says "26
indexes" while the demo/root CLAUDE.md says "27" — a stale count worth
reconciling during the E-1 backend pass (not a functional issue).

**Owner**: src (verify-only) + a doc reconcile.
**Cure direction**: carry the api suite + typecheck as a green gate through T; the
TA-4 excision must land the suite still green (the `diff.test.ts` deletion is
part of the scope, the fork-path coverage in `palette-remix.test.ts` survives and
should be re-homed onto `forkPalette`).

---

### TA-7 — X1/X2 are BOTH still open on the wire; T must carry them as named residuals with a firing op, not drops

**Evidence** (live, §0): `deploy.babb.dev/hooks/value-js` → `404` (X1 webhook
still unregistered); `mbabb.fi.ncsu.edu/colors/` → `200`, no redirect (X2 alias
still answering). Both confirmed against S `FINAL.md §8.1-8.2`.

**Root-cause**: both ops require the maintainer on-host (X1: hook registration +
`master` push) or on the NCSU VPN (X2: remove the `/colors/` proxy block,
`api/apache-vhost.conf:19-27`). Neither is agent-actionable.

**Owner**: maintainer.
**Cure direction**: fold both into **T-CLOSE** as recorded residuals with the
exact firing op restated (not silently carried) — X1 because it *is* TA-3 (the
live publish break), X2 because the owner's standing "no ncsu alias" order remains
unmet. `t-deferred-census` already routes these; this lane confirms them live and
binds X1 to the T-9 backend answer so the residual is not mistaken for cosmetic.

---

## §2 — What the T corpus should DO with this slate

| # | Item | Owner | T home | Actionable in T? |
|---|---|---|---|---|
| TA-2 | Retire the fixed red DevMisconfigBanner; re-home the misconfig lamp into the instrument's status register | demo | a demo cohesion wave (with T-16 / `t-misc-elements`) | **YES** |
| TA-3 | The deployed publish/unpublish 404 = the backend half of T-9; add a prod-lineage assert | maintainer (+ src for the oracle) | T-CLOSE residual + a CI/boot lineage probe | op NO (maintainer); oracle YES |
| TA-4 | Excise the write-only atom-diff apparatus (`/remix`+`/diff` routes → fork↔remix fold → drop `version.atomDiff` + `atomdiff.ts`) | api (src-backend) | ride the E-1 `t-coloc-backend` transposition | **YES** |
| TA-5 | Envelope in sync — record forward-compat as a property to preserve | src | note only | n/a |
| TA-6 | Keep api suite (224) + typecheck (0) green through the TA-4 excision | src | every T api wave gate | **YES** |
| TA-7 | X1 + X2 still open live — carry with the firing op | maintainer | T-CLOSE | op NO |

**The single sentence for the owner's question** — *"why does the backend not
work hereof?"*: on the dev `:9000` build it is **supposed** not to work (it
CORS-dies against a prod api whose allow-list is `color.babb.dev` only — the
banner is that honest state, and it should say so from the instrument's status
line, not a red bar); on the **live** `color.babb.dev` the backend DOES work for
reads and fork/save but **the publish button is 404-broken** because prod is
running I-era code that predates the publish verb — and that only unbreaks when
the maintainer registers the deploy webhook and pushes `master` (X1).

---

## §3 — Interactions / cross-lane

- **T-9** (mandate): this lane supplies the backend half; the banner-removal half
  is TA-2 (demo).
- **`t-deferred-census`** C1 (X1 = backend half of T-9) + H3 (`/remix`+`/diff`
  hygiene): TA-3 and TA-4 confirm + sharpen both with live evidence; TA-4 proves
  the hygiene reaches the version schema (write-only column), deeper than H3's
  "write-only `atomDiff`" note.
- **`t-coloc-backend`** (E-1): TA-4's excision should land inside the
  package-by-feature `palette/` domain move, not as a standalone pass.
- **`t-ci-lighthouse-record`**: TA-3's prod-lineage assert is a CI/oracle addition.
- **S `FINAL.md` §5/§8**: this lane's live probes confirm the "prod STILL I-era"
  + X1 + X2 rows and date the prod floor precisely (7 markers).
