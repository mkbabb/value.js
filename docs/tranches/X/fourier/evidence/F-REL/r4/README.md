SERVED MODEL: claude-opus-5-5

# F-REL.r4 — evidence (2026-10-19, ESCALATED: no export, no delete performed)

Status lines and response codes only. No token value was read or printed (none exists to read).

| Probe (2026-10-19 ~17:00-17:06Z) | Result |
|---|---|
| fourier `.env` `grep -c '^ADMIN_TOKEN=.'` | `0` |
| fourier `.env.example:34` | `ADMIN_TOKEN=dev` (dev sentinel only) |
| shell env `${ADMIN_TOKEN:+set}` | empty |
| `~/.zshrc ~/.zprofile ~/.zshenv ~/.bashrc ~/.profile`, `~/.fourier-frel`, `~/.dev-logs/frel` grep `ADMIN_TOKEN=` | no file |
| `gh secret list` (fourier-analysis) | `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_API_TOKEN` only |
| macOS keychain `security find-generic-password -s fourier` | item not found |
| fourier `.deploy/` | `edge/README.md` only |
| `ssh -p 1022 mbabb@34.197.214.67` (x2, 25 s connect timeout) | `connect ... port 1022: Operation timed out` |
| `nc -z -w 8 34.197.214.67 1022` / `22` / `443` | rc 1 / rc 1 / rc 0 (only HTTPS reachable) |
| `~/.ssh/config` alias `mbabb.fridayinstitute.net` (Port 1022) | `Could not resolve hostname` |
| `GET https://api.fourier.babb.dev/api/health` | `200` |
| `GET https://api.fourier.babb.dev/api/admin/verify` (no token) | `503` `{"detail":"Admin not configured"}` |

Reading of the 503 (fourier `dc30e5e`, `api/dependencies.py:265`): `admin_required` raises 503
"Admin not configured" when `settings.admin_token` is empty, BEFORE it reads the `Authorization`
header (L266; a wrong token is 403 at L269). So the production API process has NO admin token
configured: every `/api/admin/*` call, including `DELETE /api/admin/visualizations/<slug>?hard=true`,
is 503 for every caller. There is no token on the host to read.

Second measured gap: the admin router (`api/routers/admin.py`) has no per-slug GET
(`@admin_router.get` = `/verify`, `/stats`, `/users`, `/flagged`, `/audit` only), so the
"admin GET -> JSON export" step has no API surface either; the public GET of a private draft is `404`.

Five slugs untouched: mighty-drawing-umber-zebra, rich-pouring-mango-salmon,
ember-pouring-ebony-raccoon, zen-etching-onyx-jackal, frozen-skating-copper-crow.
