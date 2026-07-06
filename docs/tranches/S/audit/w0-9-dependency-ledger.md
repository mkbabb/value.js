# W0-9 — dependency-excision ledger

**Item**: S.W0 W0-9 (RATIFICATION §2.4 — Q3 broadening: "Excise all legacy code **and dependencies**").
**Date**: 2026-07-05 · **Model**: the R-era keyframes-devDep analysis (justify by a LIVE consumer — direct import OR structural peer-provision — or excise).
**Rule**: `package.json` `§3.4` `file:` pin policy is **NOT reopened** (glass-ui + keyframes.js stay `file:`, deliberately). Public-surface (`dependencies`) excisions ride the **W1 3.0.0 by-name MIGRATION table** (§2.1); dev-dependency excisions land in-wave.

---

## §1 Excised in-wave (11 devDependencies — zero consumer, whole trees orphaned by the F.W1 `ui/` sweep)

Each verified zero-import across the entire tracked tree (`src/`, `demo/` incl. the shadcn-vue `ui/`, `test/`, configs) — a `git grep` for the real import specifier returned zero; none is a structural peer of a used integration. The consuming shadcn-vue components were swept at F.W1 Lane C (165 → 22 `ui/` files), leaving these feature-libs dangling.

| Excised | What it was | Zero-consumer evidence |
|---|---|---|
| `@unovis/ts` | charting core | 0 imports; no chart surface in the demo (drags a large d3-* transitive tree) |
| `@unovis/vue` | charting Vue bindings | 0 imports |
| `v-calendar` | date-picker | 0 imports |
| `embla-carousel-vue` | carousel engine | 0 imports (the `ui/carousel` consumer was swept) |
| `vaul-vue` | drawer primitive | 0 imports (the `ui/drawer` consumer was swept) |
| `vee-validate` | form-validation runtime | 0 imports (the `ui/form` consumer was swept) |
| `@vee-validate/zod` | vee-validate↔zod bridge | 0 imports (dies with vee-validate; **`zod` itself stays** — 13 live consumers) |
| `@iconify-json/radix-icons` | icon JSON set | 0 imports (the demo's icons are `@lucide/vue`, 50 consumers) |
| `@iconify/vue` | iconify Vue component | 0 imports |
| `class-variance-authority` | `cva` variant builder | 0 real imports — the sole `cva` mention is a stale COMMENT in `ui/alert/index.ts` describing what it USED to be before B.W2 converted it to a glass-ui re-export |
| `@tailwindcss/cli` | Tailwind standalone CLI | 0 invokers (no script / CI / dev.sh runs it); the real Tailwind integration is `@tailwindcss/postcss`, imported in `vite.config.ts:9,64` — KEPT |

**Validation (post-excision, a clean `npm install` reconciled the lock against the committed base: −4212 / +1469 lines, net −2743):** `npm run typecheck` 0 · `npm run lint` 0 · `npm run build` (library) 0 · `npm run gh-pages` (demo — the tailwind gate) 0 · `npx vitest run` 1998/1998 · `npx playwright test` 38/38 (5 projects incl. smoke-safari on WebKit). The demo builds with none of the 11 present → confirmed dead. No public surface touched (all devDependencies).

## §2 KEEP — the non-obvious justifications (a direct import isn't the only justification)

| Dep | Justification |
|---|---|
| `sortablejs` + `@types/sortablejs` | **NO direct import**, but a LIVE structural peer: `PalettesPane.vue:96` consumes `@vueuse/integrations/useSortable`, whose engine IS `sortablejs` (the keyframes-devDep pattern). `@vueuse/integrations` is used for `useSortable` only, so this is the one peer it needs. |
| `@types/katex` | `katex@0.16` ships **no** own `.d.ts`; it is the type-provider for the 18 live `katex` consumers. |
| `prettier` (peerDependency, optional) | the CSS serializer (`formatCSS` dynamic import); externalized N.W7.B (kept out of the tarball). |
| `@mkbabb/glass-ui` · `@mkbabb/keyframes.js` (`file:`) | KEPT by the ratified `§3.4` pin policy (paired-authorship). keyframes is NOT phantom — it provisions glass-ui's keyframes peer + its dist is a live `/math` subpath consumer. **Policy not reopened.** |
| `@tailwindcss/postcss` · `tailwindcss` | the live Tailwind-v4 integration (`vite.config.ts`). |
| `clsx` + `tailwind-merge` | the `cn()` util (`demo/@/utils/utils.ts`). |
| `tw-animate-css` | `demo/@/styles/style.css`. |
| `highlight.js` (code highlight) · `katex` (math) · `unplugin-vue-markdown` (`.md` loader) | the docs/markdown surface. |
| `@vueuse/core` (11) · `@lucide/vue` (50) · `reka-ui` · `vue` · `zod` (13) | core live consumers. |
| build/test tooling: `vite`, `vite-plugin-dts`, `@vitejs/plugin-vue`, `vitest`, `jsdom`, `@vue/test-utils`, `@playwright/test`, `typescript`, `vue-tsc`, `eslint` + `@typescript-eslint/*` + `eslint-plugin-vue` + `vue-eslint-parser` + `globals`, `@types/node` | the build/lint/type/test ladder. |
| `vue-router` | the demo router (W0-7 — v5 migration lands W2-7). |

## §3 Public-surface excision candidate → routed to the W1 3.0.0 MIGRATION table

**`@mkbabb/value.js: ^1.0.2` — the SELF-DEPENDENCY in `dependencies`.** value.js declares a **runtime dependency on an old major of ITSELF**. This forces a stale registry self-install (`node_modules/@mkbabb/value.js@1.0.2`) that `vite.config.ts`'s generated self-alias exists precisely to **OVERRIDE** (its comment: "The alias's TRUE job is to OVERRIDE that stale self-install"). It is legacy cruft:

- **Not needed by the library build** (`src/` uses relative imports).
- **Not needed by the demo build** (vite aliases every `@mkbabb/value.js[/subpath]` specifier — glass-ui's + keyframes' dist consumers included — to THIS repo's freshly-built `dist/`, generated from `package.json#exports`).
- **Harmful to published consumers** (a package self-depending on an older major → a nested stale self-install).

**Entanglement**: the dormant retired-idiom `scripts/proof-subpath-*.mjs` node-import `@mkbabb/value.js` (via node resolution → the self-install), so removing the self-dep must be paired with retiring/repointing those scripts.

**Disposition — DO NOT land in W0** (it is a `dependencies`/public-surface change; landing it on the 2.0.x line would be a stealth surface change). **ROUTE to the W1 3.0.0 cut** (the major that already carries logerp + color-soa removals): remove the self-dep, repoint or excise the `proof-subpath-*.mjs` scripts, and list it by name on the 3.0.0 MIGRATION table (§2.1). Removing it is not "breaking" for any real consumer (no consumer relies on value.js self-depending) — but it is a published-`dependencies` change, so the major cut is its correct home.

## §4 Summary

- **11 devDependencies excised in-wave** (all validated green); package-lock shrank ~2.7k lines (net).
- **Every remaining dep justified** by a live consumer (direct import or structural peer-provision) or the ratified `§3.4` `file:` pin policy.
- **1 public-surface excision** (`@mkbabb/value.js` self-dep) **handed to the W1 3.0.0 MIGRATION table** — NOT landed in W0.
- Final: `dependencies` 2 · `peerDependencies` 1 · `devDependencies` 37.
