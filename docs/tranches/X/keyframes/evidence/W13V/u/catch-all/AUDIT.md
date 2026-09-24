SERVED MODEL: claude-opus-5-5

# The catch-all route — visited and audited (G-W13V-u3; COHESION §0ca)

**Route**: `demo/app/scene/router.ts:31` `{ path: "/:pathMatch(.*)*", redirect: "/" }` — every unknown hash path lands on Home (by design: the route list is generated from `allScenes`; a stale deep-link such as the folded `#/starting-style` "falls to the catch-all redirect home", `router.ts:17-21`).
**Instrument**: `visit.mjs` (8 links × {1440 light, 1440 dark, 390 light}, a frame at t+100 ms and settled per link) — run1 (the killed `.u` seat, dev), run2-dev and run3-gh (`.u2`); `r404.mjs` (4 cold routes, fresh context each).

| # | link | lands | observation | disposition |
|---|---|---|---|---|
| CA-1 | `#/nope`, `#/starting-style`, `#/cube/extra`, `#/%E2%9C%93` | `#/`, Home, hero + cube | Home renders whole at 1440 (both themes) and 390; the frames match the home route's own | conforms (the router's stated intent) |
| CA-2 | every link, cold | — | **one console error on every dev load: `404 /assets/icons/favicon.svg`** — the favicon href climbed out of the Vite root | **UIA-KF-227, CURED** (kf `11704ae8`): icon 200, 0 responses ≥ 400, dev ×2 + gh ×2 |
| CA-3 | `#/CUBE` | Cube scene; hash stays `#/CUBE` | vue-router matches case-insensitively and does not canonicalise; the scene and its dock are correct | LOW, observation — no user-visible defect; not booked |
| CA-4 | `#//` | Home; hash stays `#//` | renders Home | LOW, observation — not booked |
| CA-5 | `#/nope?anim=Matrix` | `#/?anim=Matrix` | the query survives the redirect onto Home, where `anim` names no Home animation; nothing breaks | LOW, observation — not booked |
| CA-6 | `#/nope?state=MTIz` | `#/` | the router guard strips `state` and restores nothing (a non-state payload) — silently, which is right for a URL load | conforms |
| CA-7 | all | focus on `BODY` after landing | the same as a direct `#/` load | conforms (Home's own focus model) |

**No unknown-route notice** is shown — an unknown link lands on Home silently. The router states this as its design (a removed scene id falls home); a "not found" notice would be a new feature, not a defect cure, so none is invented here.
