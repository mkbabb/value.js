# W0-7 — vue-router 4 → 5 scope probe

**Item**: S.W0 W0-7 (deferred-books-census §2 — the K-W5RT book; Q11 RATIFIED-AS-SPECED).
**Date**: 2026-07-05 · **Mode**: scope probe (read-only). The migration itself lands **W2-7**.
**Verdict**: **LANDS at W2-7** (both Q11 de-scope bounds cleared) — a **near-zero, code-free version bump**.

---

## §1 Trigger state

| Field | Value |
|---|---|
| Book | K-W5RT (vue-router 4→5), age ≈ 8 tranches; trigger **FIRED 2026-05-28** (v5 GA), unactioned ≈ 5 weeks at census |
| `npm view vue-router dist-tags.latest` | **5.1.0** |
| value.js pin | `package.json` → `"vue-router": "^4.6.4"` (installed 4.6.4) |

## §2 Actual usage surface (the whole of it)

vue-router is consumed in **3 files** + one install site — no more:

| Site | Symbols used |
|---|---|
| `demo/@/router/index.ts` | `createRouter`, `createWebHashHistory`, type `RouteRecordRaw`; a flat `routes` array (path/name/`component`(Stub)/`meta.admin`/`redirect`); catch-all `/:pathMatch(.*)*` |
| `demo/@/composables/useViewManager.ts` | `useRouter`, `useRoute`; `router.isReady()`, `router.push({ name, query })`, `route.name`, `route.query` |
| `demo/@/components/custom/color-picker/composables/useColorUrl.ts` | `useRouter`, `useRoute`; `router.replace({ query })`, `route.query.space/color` |
| `demo/color-picker/index.html` | `app.use(router)` (the standard install) |

Router-specific lines total **well under 100** (of ~224 LoC across the 3 files). The demo does **not** use `<router-view>` for rendering — routes drive `useViewManager.currentView`, which drives the pane layout (App.vue). It uses **hash history** (`createWebHashHistory`, for GitHub-Pages-class static hosting).

**NOT used** (the classes the Q11 de-scope bound names as non-mechanical): experimental **typed routes**, **data loaders**, **memory-history** semantics, `unplugin-vue-router` / file-based routing, per-route navigation guards, `addRoute`/dynamic routing, `RouteLocationNormalized` typing, `<RouterView>`/`<RouterLink>` slot APIs.

## §3 vue-router 5 nature + breaking-change surface (verified against the official migration guide)

vue-router **5 is a transition release** that merges `unplugin-vue-router` (file-based routing) **into core** — opt-in via a new `createFileRouter()` helper. The classic `createRouter` API stays **fully supported, unchanged**.

> "If you're using Vue Router 4 **without** unplugin-vue-router, there are **no breaking changes** — you can upgrade without any code modifications." — the official v4→v5 migration guide.

- **The single documented breaking change**: the **IIFE** build no longer bundles `@vue/devtools-api` (upgraded to v8, no IIFE build). value.js consumes vue-router as an **ESM** dependency through Vite — the IIFE build is never in the graph, so this exception **does not apply**.
- Every symbol value.js uses (`createRouter`, `createWebHashHistory`, `useRoute`, `useRouter`, `router.push`/`replace`/`isReady`, `route.query`/`name`, `RouteRecordRaw`) is **unchanged** in v5.
- (Forward note: **vue-router 6** will be ESM-only + remove deprecated APIs — a future book, out of S's scope. v5 is the interim step.)

## §4 Q11 de-scope bound applied

The Q11 objective bound (`S.md §12`): *book it instead* if the probe finds **> 1 breaking-change class requiring non-mechanical rewrites** (typed routes / data loaders / memory-history) **OR** an **estimated migration diff > 300 LoC**; under both bounds it lands.

| Bound | Measured | Result |
|---|---|---|
| non-mechanical-rewrite classes | **0** (value.js uses none of typed-routes / data-loaders / memory-history; standard v4 API only) | under bound |
| estimated migration diff | **~1 line** — the `package.json` pin `^4.6.4` → `^5.x` + lockfile refresh; **0 code LoC** | ≪ 300 LoC |

**Both bounds cleared → the migration LANDS at W2-7 (not booked).**

## §5 W2-7 recipe (hand-off)

1. Bump `package.json` `"vue-router": "^4.6.4"` → `"^5.1.0"` (or `"^5.0.0"`); `npm install` to refresh the lockfile.
2. **No source changes** — the 3 consuming files + the `index.html` install stay byte-identical.
3. Verify: `npm run typecheck` (the `RouteRecordRaw` type + `useRoute`/`useRouter` inference resolve against v5's `.d.ts`), `npm run lint`, `npx playwright test` (the view-switch / hash-URL smoke flows exercise `router.push`/`replace`/`isReady` live), `npm run boot-smoke` (the app mounts + `app.use(router)` installs cleanly). Any residual (unlikely) is a genuine v5 finding, recorded then.
4. Do **not** adopt `createFileRouter()` / file-based routing in W2-7 — that is a design change, not a migration; the classic route table stays.

## Sources

- [Migrating to Vue Router 5 — official guide](https://router.vuejs.org/guide/migration/v4-to-v5)
- [Vue Router 5: File-Based Routing into Core with No Breaking Changes — InfoQ](https://www.infoq.com/news/2026/03/vue-router-5/)
- `npm view vue-router dist-tags` → `latest: 5.1.0` (probed 2026-07-05)
