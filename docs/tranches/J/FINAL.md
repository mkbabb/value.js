# J — FINAL (WAVE-D cohort CORE: atom-diff + publish)

**Disposition**: the value.js-J **cohort CORE is EXECUTED + GREEN**. J was authored planning-only, retired-and-folded at K.W0, then **re-activated by the constellation** (`fourier-analysis/docs/constellation/CONSTELLATION.md §3/§4`, authored 2026-06-02 by the fourier hub) as the value.js half of the only synchronized cross-repo work — the WAVE-D atom-diff + publish, paired with fourier-J. This `FINAL.md` records the execution. The broader glass-ui mandates stay K's; the cohort closes **paired with fourier-J**.

**Authority**: `CONSTELLATION.md §3/§4` (the value.js arm: "tranche J, W0→W5") + the 2026-06-02 user mandate. **Mode**: execution (`inv-16` — write only value.js; gate on own green CI).

---

## §0 — Green CI (inv-27: green-means-green, this repo)

Cited from this session's local runs (the gates `node.js.yml`'s "Backend tests (api/)" job + the `ci.yml` library gates mirror):

| Gate | Result |
|---|---|
| `cd api && npx tsc --noEmit` | **clean** (0 errors; `exactOptionalPropertyTypes` + `verbatimModuleSyntax` strict) |
| `cd api && npm test` (vitest + mongodb-memory-server) | **140 / 140 passed, 25 files** (was 119 / 22 at W0 baseline → **+21 J tests**) |
| root `npm run lint` (eslint, `--max-warnings=0`; covers `api/` + tests) | **exit 0** |
| library `src/` proof:* + build | **unaffected** — zero `src/` edits (W0 KILLED VAL-9 / BOOKED VAL-1 → no library code) |
| CHANGELOG gate (`api/src/` touched ⇒ CHANGELOG required) | **satisfied** (`[Unreleased] — J` entry) |

`inv-16` attestation: every changed/new path is under `value.js/` (`api/`, `docs/`, `CHANGELOG.md`); **zero** writes to `fourier-analysis/` or any sibling; **zero** library `src/` edits.

---

## §1 — Plan vs. actual (the §4 arm, W0→W5)

| Wave | Plan | Actual |
|---|---|---|
| **W0** — reconcile + terminal verdicts | re-confirm green; record VAL-9/VAL-1/CH-6 | **DONE.** Tree reconciled: the fourier contract mis-cited value.js prose as shipped — `diff.ts`/`atomdiff`/`remix`/`publish`/the visibility-filter did **not** exist → this was a BUILD, not a reconcile. Verdicts §2. |
| **W2** — atom-diff CORE | the WAVE-D core | **GREEN.** `hash.ts` `computeAtomHash`/`computeAtomSetHash`; NEW `api/src/lib/crud/atomdiff.ts` (canonical name); `PaletteVersion.atomDiff`; `forkPalette`→`remixPalette` (fork = remix-with-empty-diff, ONE path); NEW `services/palette/diff.ts` (chain-guard inv-J-1); `POST /:slug/remix`; `GET /:slug/diff`; `formatPalette` +`atomSetHash`. |
| **W1c** — publish/visibility | the in-place flag-flip half | **GREEN.** NEW `services/palette/visibility.ts` (`setVisibility` + the inv-I-2 guard's first live caller); NEW `POST /:slug/{publish,unpublish}`; the **[P0]** `crud-list.ts` `visibility:"public"` filter; `formatPalette` +`published`. |
| **W3** — demo diff render | CSS Custom Highlight | **BOOKED** (§3 — gated on demo-green = K.W2; the demo build is RED on glass-ui `dist` coupling at HEAD, my K.W0 finding). |
| **W4** — VAL ship-or-book + I-tail | discharge | **W0 verdicts recorded (§2); Idempotency-Key store BOOKED** (§3 — optional per J.W1c §5.5). |
| **W5** — close | FINAL + cohort | **this doc.** Cohort closes paired with fourier-J. |

**Build-time reconciliation to the canonical contracts** (the `J.W1-palette-remix.md` substrate said `lib/crud/remix` / `diff.ts` / a 6-field body): the module is the canonical **`atomdiff`** at `api/src/lib/crud/atomdiff.ts`; the wire body is the four-field `{fromHash,toHash,ops,identical}` (the redundant `fromSetHash`/`toSetHash` were never built — `fromHash`/`toHash` ARE the set-hashes, J-diff-shape §2.4).

---

## §2 — W0 terminal verdicts (no perpetual punts — the J-deep-audit demand)

| Item | Carry | Verdict | Rationale / trigger |
|---|---|---|---|
| **VAL-9** `spring()→LinearStop[]` emitter | chronic A→J | **KILL** | Lifting to value.js adds a THIRD home; `keyframes.js` owns the emitter and glass-ui's `--spring-*` regenerate from it. No de-dup is won. Recorded, not shipped. |
| **VAL-1** OKLab aurora-LUT | chronic A→J | **BOOK + kill-date** | Substrate-without-consumer is binary. Gated on glass-ui `deriveAurora()` adoption + a 2nd consumer. **Trigger**: fires at K.W4 (aurora-derive); if not live by **K.W4 close**, KILL. The conversion math (`src/units/color/conversions/oklab.ts`) already exists — no library code now. |
| **CH-6** `TooltipContent variant="mono"` | **6-tranche** glass-ui chronic | **UNBLOCKED → K.W3 ship-or-kill** | The blocker ("glass-ui owns the API; no peer-authorship") DISSOLVED at K.W0 (paired-authorship opened the glass-ui boundary). It is now a normal gated item (one of K's "8 carried asks"), **not** a 7th book. |

---

## §3 — Booked residuals (E5: blocker · smallest-unblock · trigger)

- **J.W3 — demo CSS-Custom-Highlight diff render** (`PaletteDiff.vue`). *Blocker*: the demo build is RED at HEAD (glass-ui `dist/` ships zero `.d.ts` → vue-tsc TS7016 coupling — the K.W0 finding). *Smallest unblock*: K.W2 substrate-restoration (source-resolve glass-ui per inv-K-4 / the dist-dts cohort prereq). *Trigger*: **dispatch at K.W2 close** (demo green). The backend `/diff` it consumes is shipped + green.
- **J.W4 — Idempotency-Key replay store** (`api/src/middleware/idempotency.ts` + repo). *Blocker*: none — it is **optional** for publish (J.W1c §5.5: If-Match already gives the publish idempotency; the same-row no-op gives state idempotency). *Smallest unblock*: a 24h replay collection + middleware. *Trigger*: ship when a write path needs key-level replay beyond If-Match, or at the next CRUD tranche; **not** required for the cohort CORE.
- **I-tail** (per-repo conformance suite, `id`-field hard-removal, per-call-site `ifMatch`/`idempotencyKey`): the `/diff` + publish conformance probes (`test/conformance/diff.test.ts`, `test/routes/palettes-publish.test.ts`) are the per-repo suite for THIS surface; the remaining I-tail items carry to a successor CRUD tranche.

---

## §4 — Invariants honored (adversarially verified — 6/6)

- **inv-J-1** (single-parent linear): `/diff` is a chain diff; a divergent pair → **422** (`UnprocessableEntityError`, new — fills the 412↔428 gap; distinct from a 400 malformed-param). Verified end-to-end through the route.
- **inv-J-2** (derived projection, no new store): `atomDiff` is a field on the existing `PaletteVersion`; `/diff` recomputes on demand. Zero new collections.
- **inv-I-2** (visibility transition guard): `assertVisibilityTransition` is the guard's **first live caller** (was dead-authored I→J).
- **H1** (cross-collection `withTransaction`): `remixPalette` inherits `forkPalette`'s wrapped site (coverage doc row 2 updated); publish is single-collection (correctly un-wrapped).
- **NO-LEGACY**: `forkPalette` is a semantic delegate of `remixPalette` (one path); zero `@deprecated`/`as any`/`as unknown as`/`@ts-ignore` added.
- **inv-16**: §0.

---

## §5 — Cohort close (value.js-J ↔ fourier-J, glass-ui hub)

value.js-J's `/diff` envelope is byte-isomorphic to `J-diff-shape §3/§4` (asserted by `test/conformance/diff.test.ts` against the shape doc, **never** against fourier's output — J-diff-shape §6). publish conforms to `J.W1c §6` (symmetric envelope + derived `published`; the one legitimate per-repo difference is the private-state name `private` and the `unpublish` landing `private`). **The cross-repo parity verdict is the lead's** (the fourier session): "both probes pass §3/§4." value.js-J is **green and parity-ready**; the cohort closes paired when fourier-J cites its own green run (`CONSTELLATION.md §6` step 3). The **fourier source boundary stays closed** throughout (inv-I-1 carries).
