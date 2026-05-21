# F.W1 Lane C — Zero-Consumer shadcn-vue Vendor Sweep

**Date**: 2026-05-21
**Branch**: tranche-f
**Dispatch HEAD**: bdfecf2 (F.W0 close)
**Scope** (per `docs/tranches/F/waves/F.W1.md` Lane C, F-AUDIT-5 §1, VENDOR-POLICY.md): delete zero-consumer subdirs in `demo/@/components/ui/`.

## Sub-gate verdict: PASS

- vue-tsc errors: 118 → **0** (drop of 118)
- `demo/@/components/ui/` files: 165 → 22 (-143)
- `demo/@/components/ui/` size: 676 KiB → 88 KiB (-588 KiB)
- 29 zero-consumer subdirs deleted
- build (library + gh-pages) clean
- vitest 1584/34 unchanged
- lint exit 0

## Enumeration table

Consumer count = imports of the form `from "@/components/ui/<subdir>..."` or `from "@components/ui/<subdir>..."` outside the subdir itself, across `demo/`, `src/`, `api/`. Transitive = importing subdir is another ui/ subdir.

| Subdir | Direct | Transitive | Verdict | Action |
|---|---:|---|---|---|
| accordion | 0 | from auto-form (also 0) | ZERO-CONSUMER | DELETED |
| alert | 2 | — | CONSUMED-DIRECT | kept |
| alert-dialog | 0 | none | ZERO-CONSUMER | DELETED |
| aspect-ratio | 0 | none | ZERO-CONSUMER | DELETED |
| auto-form | 0 | none (docs only) | ZERO-CONSUMER | DELETED |
| avatar | 2 | — | CONSUMED-DIRECT | kept |
| badge | 10 | — | CONSUMED-DIRECT | kept |
| breadcrumb | 0 | none | ZERO-CONSUMER | DELETED |
| button | 24 | — | CONSUMED-DIRECT | kept |
| calendar | 0 | from auto-form (also 0) | ZERO-CONSUMER | DELETED |
| card | 13 | — | CONSUMED-DIRECT | kept |
| carousel | 0 | none | ZERO-CONSUMER | DELETED |
| chart | 0 | from chart-* (all also 0) | ZERO-CONSUMER | DELETED |
| chart-area | 0 | none | ZERO-CONSUMER | DELETED |
| chart-bar | 0 | none | ZERO-CONSUMER | DELETED |
| chart-donut | 0 | none | ZERO-CONSUMER | DELETED |
| chart-line | 0 | none | ZERO-CONSUMER | DELETED |
| checkbox | 2 | — | CONSUMED-DIRECT | kept |
| collapsible | 1 | — | CONSUMED-DIRECT | kept |
| command | 0 | none | ZERO-CONSUMER | DELETED |
| context-menu | 0 | none | ZERO-CONSUMER | DELETED |
| dialog | 4 | — | CONSUMED-DIRECT | kept |
| drawer | 0 | none | ZERO-CONSUMER | DELETED |
| dropdown-menu | 5 | — | CONSUMED-DIRECT | kept |
| form | 0 | from auto-form (also 0) (note 1) | ZERO-CONSUMER | DELETED |
| hover-card | 3 | — | CONSUMED-DIRECT | kept |
| input | 3 | — | CONSUMED-DIRECT | kept |
| label | 1 | — | CONSUMED-DIRECT | kept |
| menubar | 0 | none | ZERO-CONSUMER | DELETED |
| navigation-menu | 0 | none | ZERO-CONSUMER | DELETED |
| number-field | 0 | none | ZERO-CONSUMER | DELETED |
| pagination | 0 | none | ZERO-CONSUMER | DELETED |
| pin-input | 0 | none | ZERO-CONSUMER | DELETED |
| popover | 5 | — | CONSUMED-DIRECT | kept |
| progress | 0 | none | ZERO-CONSUMER | DELETED |
| radio-group | 2 | — | CONSUMED-DIRECT | kept |
| range-calendar | 0 | none | ZERO-CONSUMER | DELETED |
| resizable | 0 | none | ZERO-CONSUMER | DELETED |
| select | 7 | — | CONSUMED-DIRECT | kept |
| separator | 3 | — | CONSUMED-DIRECT | kept |
| sheet | 1 | — | CONSUMED-DIRECT | kept |
| skeleton | 1 | — | CONSUMED-DIRECT | kept |
| slider | 5 | — | CONSUMED-DIRECT | kept |
| switch | 1 | — | CONSUMED-DIRECT | kept |
| tabs | 8 | — | CONSUMED-DIRECT | kept |
| tags-input | 0 | none | ZERO-CONSUMER | DELETED |
| textarea | 0 | from auto-form (also 0) | ZERO-CONSUMER | DELETED |
| toggle | 0 | none | ZERO-CONSUMER | DELETED |
| toggle-group | 0 | none | ZERO-CONSUMER | DELETED |
| tooltip | 6 | — | CONSUMED-DIRECT | kept |
| v-calendar | 0 | none (docs only) | ZERO-CONSUMER | DELETED |

**Total**: 51 subdirs → 22 consumed-direct, 29 zero-consumer deleted.

### Note 1 — `form/` ambiguity resolution

Initial broad grep found 17 refs to `ui/form`. Investigation:
- 10 were `auto-form/AutoForm*.vue` files referencing `@/components/ui/form` (intra-vendor) — auto-form has zero direct consumers, so transitively zero.
- 2 were `input/index.ts` and `textarea/index.ts` containing `from "@mkbabb/glass-ui/forms"` — substring `ui/forms` matched the pattern but is a glass-ui import, NOT a shadcn `ui/form` import. False positive.
- 5 were docs-only refs.

Verdict: `form/` is truly zero-consumer. Deleted.

## Pre/post vue-tsc

```
pre  (F.W0 close, bdfecf2): 118 errors
post (F.W1 Lane C):           0 errors
delta:                       -118
```

All 118 pre-deletion errors were in the 29 deleted subdirs (sum verified via per-subdir `grep -c "demo/@/components/ui/$subdir/" /tmp/vue-tsc-pre.txt`). Authored code under `demo/@/components/custom/` and elsewhere produced zero errors.

### Per-deleted-subdir vue-tsc + file count

| Subdir | Files | vue-tsc errors |
|---|---:|---:|
| accordion | 1 | 0 |
| alert-dialog | 10 | 6 |
| aspect-ratio | 2 | 1 |
| auto-form | 16 | 32 |
| breadcrumb | 8 | 0 |
| calendar | 13 | 15 |
| carousel | 8 | 2 |
| chart | 6 | 4 |
| chart-area | 2 | 1 |
| chart-bar | 2 | 1 |
| chart-donut | 2 | 2 |
| chart-line | 2 | 1 |
| command | 1 | 0 |
| context-menu | 1 | 0 |
| drawer | 1 | 0 |
| form | 8 | 1 |
| menubar | 16 | 12 |
| navigation-menu | 9 | 8 |
| number-field | 1 | 0 |
| pagination | 6 | 9 |
| pin-input | 5 | 4 |
| progress | 1 | 0 |
| range-calendar | 13 | 15 |
| resizable | 3 | 2 |
| tags-input | 1 | 0 |
| textarea | 1 | 0 |
| toggle | 1 | 0 |
| toggle-group | 1 | 0 |
| v-calendar | 2 | 2 |
| **TOTAL** | **143** | **118** |

## Size delta on `demo/@/components/ui/`

| Metric | Pre | Post | Delta |
|---|---:|---:|---:|
| file count | 165 | 22 | -143 |
| size (KiB, `du -sk`) | 676 | 88 | -588 |
| subdir count | 51 | 22 | -29 |

## Verification matrix

| Gate | Result | Notes |
|---|---|---|
| `npx vue-tsc --noEmit` | 0 errors | down from 118 |
| `npm run build` | clean | `dist/value.js` 124.98 kB; built in 846ms |
| `npm run gh-pages` | clean | demo bundles built; built in 1.09s; no missing-module errors |
| `npx vitest run` | 1584 passed / 34 files | unchanged from F.W0 close |
| `npm run lint` | exit 0 | `eslint . --max-warnings=0` |

## VENDOR-POLICY.md update

Applied:
- Added "Successor lane executed (F.W1 Lane C)" header callout.
- Added "Current state (post-F.W1 Lane C)" section: vue-tsc gate now 0, 22 remaining subdirs, 88 KiB.
- Added deleted-subdirs table (29 rows) with file count, vue-tsc errors, and rationale.
- Demoted the historical 126-error breakdown to "Historical context (E.W4 Lane C — superseded by deletion)".
- Updated "Successor lanes" to mark this lane DONE and reference this audit doc.

## Sub-gate verdict

**PASS** — All gates green. Deletion was clean (no consumer breakage). vue-tsc gate may now be tightened from 118 (F.W0 close) to **0** in CI. The Option-3 "ACCEPT + DOCUMENT" posture is preserved for the 22 remaining consumed subdirs (zero vue-tsc errors today — but the policy framework remains in place in case a future shadcn-vue regeneration reintroduces noise in a consumed subdir).
