# N.W4-EDGE — vhost refresh (W4.E) + CI-gated CF-Pages deploy (W4.F)

**Lane**: W4-EDGE (the host/CI edge half of N.W4 — the deferred W4.E + the orthogonal W4.F)
**Branch**: `tranche-f-handoff` · **Date**: 2026-06-11
**Status**: **GREEN** — both artifacts authored; all three gates pass.
**Ownership**: `api/apache-vhost.conf` (refresh), `.github/workflows/deploy-pages.yml` (NEW).

The W4-artifact lane (e62567a) folded W4.E + W4.F to this lane (its report §"Out of lane
scope"). No commit/push (the lead integrates). Sibling repos read-only (the glass-ui dist was
already healthy — 551 `.d.ts`, `segmented-tabs.css` present — so NO rebuild was needed).

---

## W4.E — vhost refresh (`api/apache-vhost.conf`)

The committed vhost was **stale on three axes**, all from the retired NCSU `mbabb.fi.ncsu.edu/colors/`
path-prefix topology:

1. **Port**: proxied `localhost:3100` — but `api/compose.yaml` binds the api at `127.0.0.1:8130`
   (`127.0.0.1:8130:3000`). **Fixed → `http://127.0.0.1:8130/`.**
2. **Path topology**: it was a `/colors/` sub-path proxy (`ProxyPass /colors/ …`). The api is now
   its OWN subdomain origin (`api.color.babb.dev`), so the proxy is **root-pathed** (`/ → :8130/`).
3. **No `<VirtualHost>` envelope / no `ServerName`**: it was an include-fragment for someone else's
   `<VirtualHost>`. It is now a self-contained `<VirtualHost *:443>` with `ServerName
   api.color.babb.dev`, `SSLEngine on` (the spine's wildcard `*.babb.dev` cert), and per-origin
   error/access logs — the modern spine-subdomain idiom.

The security-header block (HSTS, CSP `default-src 'none'`, nosniff, frame DENY, Permissions-Policy)
and the `X-Forwarded-*` headers (which `middleware/ip.ts` reads, trust-proxy-gated) were preserved
verbatim — they were already correct.

### THE DEC-9 RECORD (recorded honestly, in the vhost AND here)

DEC-9 declared the NCSU alias `mbabb.fi.ncsu.edu/colors/` **RETIRED**. The N.W4 verification (V3)
found that claim **FALSE on the wire**: the alias is ALIVE and byte-identical to
`api.color.babb.dev` (same upstream, same rate-limit pool).

**This lane CANNOT retire it.** The NCSU alias lives in the **NCSU box's** Apache config — a
different host, not this repo. There is no edit to `api/apache-vhost.conf` that removes it. The
honest disposition, recorded as a header comment in the vhost: **retirement is an ON-HOST action
item for the N.W8 deploy ceremony** — remove the `mbabb.fi.ncsu.edu/colors/` proxy block from the
NCSU host's vhost (and let its DNS/cert lapse) once `color.babb.dev` is confirmed serving
HEAD-lineage code. Until then, both origins answer. I say this plainly: I did not retire it; I
recorded the on-host action item.

---

## W4.F — `.github/workflows/deploy-pages.yml` (NEW; Ask 5 / DEC-5)

CI-gated Cloudflare Pages deploy of the demo SPA. The shape is the constellation
verified-deploy-of-record idiom (mirrors the sibling `../keyframes.js/.github/workflows/deploy-pages.yml`
reference), adapted for value.js's `file:`-linked glass-ui posture.

### Trigger + gate (the idiomatic `workflow_run` shape)

```yaml
on:
  workflow_run:
    workflows: ["CI"]        # exact `name:` of .github/workflows/ci.yml
    types: [completed]
  workflow_dispatch: {}
```

The deploy job's `if` is the **triple gate**: `workflow_dispatch` OR (`conclusion == 'success'`
AND `head_branch == 'master'` AND `event == 'push'`). A red CI, a non-master branch, or a PR-run
never ships the live site. Every green-CI master push re-ships (no path filter — a master push
should always re-publish; the keyframes reference notes the prior tip-commit `git diff` filter
silently skipped docs-tip pushes that changed the demo).

The checkout uses `ref: ${{ github.event.workflow_run.head_sha || github.sha }}` so the deploy
builds the EXACT SHA CI proved green (not a possibly-advanced branch tip).

### glass-ui resolution (the value.js-specific divergence from the keyframes reference)

keyframes consumes glass-ui from the **registry** (`npm ci` installs it). value.js still pins
`@mkbabb/glass-ui: file:../glass-ui` (N.md §3: "Hold `file:../glass-ui` through W5"; the registry
pin → inv-N-6 at W9). So this workflow **checks out `mkbabb/glass-ui` and builds its dist** before
`npm ci` + the demo build — the SAME precondition the CI `lighthouse` + `boot-smoke` jobs satisfy
(ci.yml lines 232-246, 274-292). It then builds value.js's own dist (the `@mkbabb/value.js` →
`dist/value.js` self-alias target, mechanism-C) before `npm run gh-pages`.

### Deploy

```yaml
- uses: cloudflare/wrangler-action@v3
  with:
    apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
    accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
    command: >-
      pages deploy dist/gh-pages
      --project-name=color --branch=main --commit-dirty=true
```

`dist/gh-pages` is the exact `outDir` from `vite.config.ts` gh-pages mode. Secrets are consumed via
`${{ secrets.* }}`, never inlined. No deploy fires now — the wire fires at W8 (the workflow ships
on the master merge; the first real run is the next green-CI master push).

### The CF Pages project — READ-ONLY check (no first-run creation needed)

`npx wrangler pages project list` (read-only) shows the project **ALREADY EXISTS**, named **`color`**
(`color-enw.pages.dev` / `color.babb.dev`) — alongside the sibling single-word names `keyframes`,
`fourier`, `sudoku`. So `--project-name=color` deploys into the existing project; **no first-run
creation**. (Per DEC-5 the demo domain is `color.babb.dev`; the project name follows the sibling
single-word convention, NOT `color-babb-dev`. The built `dist/gh-pages/CNAME` is `color.babb.dev` —
consistent.)

---

## Gates (all GREEN)

1. **YAML parses** — `python3 -c "yaml.safe_load(...)"` on `deploy-pages.yml` → PARSES OK; structure
   verified (`name: deploy-pages`; `on: [workflow_run, workflow_dispatch]`; the single `deploy` job;
   the triple-gate `if`; the `cloudflare/wrangler-action@v3` step).
2. **gh-pages build green locally** — `npm run gh-pages` → **EXIT=0**, `✓ built in 1.22s`,
   `dist/gh-pages/{index.html, assets/ (117 entries), CNAME=color.babb.dev, robots.txt}` emitted.
   (First run red on a STALE vite dep-optimizer cache that held a CONCURRENT lane's pre-migration
   `../composables/useLayerTransition` dock import — NOT my files, which are infra-only and not in
   the build graph. `rm -rf node_modules/.vite` + rebuild → green. That dock migration is another
   N.W5 lane's in-flight working-tree edit; glass-ui 3.13.0 dist DOES export `useLayerTransition`
   from `./dock`, so it resolves once the cache is cold — exactly the boot-smoke `vite --force`
   contract.)
3. **vhost port == compose port** — **BOTH 8130.** vhost: `ProxyPass / http://127.0.0.1:8130/`.
   compose: `ports: ["127.0.0.1:8130:3000"]`. Stated explicitly: **8130 == 8130.**

## Files

- `api/apache-vhost.conf` — refreshed: `:3100`→`:8130`, `/colors/` path-prefix → root-pathed
  `api.color.babb.dev` subdomain `<VirtualHost *:443>`; security headers preserved; DEC-9 NCSU-alias
  disposition recorded as an N.W8 on-host action item.
- `.github/workflows/deploy-pages.yml` (NEW) — CI-gated (`workflow_run` on `"CI"` + triple gate) CF
  Pages deploy of the demo to the existing `color` project via `cloudflare/wrangler-action@v3`.

## Out of lane scope (recorded honestly)

- **The wire deploy itself** — no `wrangler pages deploy` run now; the workflow fires on the next
  green-CI master push (W8). No origin push, no manual CF deploy this lane.
- **NCSU-alias retirement** — an on-host NCSU-box action (W8), not retirable from this repo (above).
- **The concurrent dock `useLayerTransition` migration** — another N.W5 lane's in-flight edit
  surfaced as a stale-cache build flap; not this lane's file (I did not touch the dock tree). The
  cold-cache build is green; the lead integrating the dock lane should confirm the warm-cache path.
