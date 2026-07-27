# Tranche V — Post-U Audit

Findings are grouped by mechanism. Differently worded symptoms sharing a cause are one family.

## A1. Terminality laundering

U accepted `STILL-BOOKED`, `complete_with_misses`, `DECISION-PENDING-OWNER`, relay records, and owner-attested visual rows at close. The close-ledger script treats those words as terminal evidence. Three `test.fail()` tripwires remain armed. V retires the status machinery in W4 and either builds the product behavior or names an external trigger in `DISPOSITION-LEDGER.md`.

## A2. Optical Bench not yet realized

The live browser still shows an unconditional equal-column companion card, flat/muddy control plates, Generate's pill plus two bare glyph registers, a dense generic Atmosphere/Blob form, and route states in which the dock visually collapses to one icon. T-31, T-33/T-51/T-59, T-41/T-44, T-46/T-47, T-49, T-54/T-55/T-56, and T-61 remain product-shaped asks despite U relay/attestation rows. W18–W29 own them.

## A3. Public identity is a credential

`loginSession` accepts only the public slug and mints a session after existence lookup (`api/src/modules/session/service/auth.ts:101-147`). Palette responses expose the slug. This is account takeover by design, not a polish item. W10 separates principal, public handle, recovery credential, and named admin authority.

## A4. Authorization is not a domain invariant

Direct palette detail checks deletion but not visibility (`api/src/modules/palette/service/crud.ts:44-68`); history, fork, and provenance routes do not share one policy. Private resources are therefore reachable through secondary facilities. W11 builds one policy predicate across every read and mutation.

## A5. Hash identity and ETag semantics are false

The strong ETag is `currentHash` or `updatedAt` (`api/src/modules/palette/etag.ts:22-25`), while the content hash excludes metadata/lifecycle. The route reads, checks, then writes. Version `_id` is a global content digest and `createVersionRecord` reuses any existing hash (`service/versions.ts:38-74`), collapsing identical content across palettes. W11–W12 separate handle generation, workspace revision, release identity, and content digest, with database CAS.

## A6. Operations are not durable

Idempotency is process-local and does not reserve before execution; the client creates a new key per invocation. Delete can decrement a parent twice. Vote membership and count update separately. The reaper addresses mutable slugs. W13 makes commands durable and social edges authoritative under transactions.

## A7. Catalog continuation and owner inventory lie

Filtered pagination can return `{data:[], hasMore:true, nextCursor:null}` after advancing the scan. `/mine` excludes deleted objects, making restore undiscoverable. `unlisted` has no writer. W14 builds query-bound scanned cursors and W15/W22 expose Drafts, Private, Published, and Trash.

## A8. Modularization is path movement, not a DAG

`242/248` demo TS/Vue files remain under `demo/@`; hundreds of aliases remain in demo/assets/tests. TypeScript probes find a 14-module color SCC and a four-module parsing/color SCC, parent/self-barrel imports, late global registration, dynamic `Color` indexing, and DOM state inside pure values. Since tranche-T-close, product logic grew materially while rename detection found almost no true moves. W5–W9 build the physical topology and final-object DAG; reduction is judged by concepts/edges/net authored logic.

## A9. Public and consumer surfaces are dual

The root facade and seven subpath facades duplicate about 1,008 authored lines, and a custom parity gate preserves the duplication. Keyframes and glass-ui still have real root consumers. Meanwhile value.js is silently installed from a pinned Claude worktree and therefore misses the completed-BI/v6 surface changes such as ConfirmDialog, Sheet, HoverCard, ToggleChip, and old Dock names. W7/W17 perform a packed, atomic capability-entry cut with no compatibility root.

## A10. First paint still pays for inactive renderers

The initial JS graph is about 342KiB gzip and the standing mobile LCP is roughly 4.9–5.1s. `useAtmosphere` statically imports `/aurora`; Blob config still enters through the full `/blob` surface despite BI's tiny `/blob-config` seam. Dialog barrels and broad demo side effects retain inactive facilities. W28/W29/W31 make the CSS ground the permanent substrate, move renderer code behind causal boundaries, and use actual lab Web Vitals rather than a parser ratio proxy.

## A11. Accessibility coverage is declarative, not operable

Palette card expansion/reorder and hover swatch actions are not keyboard-equivalent; editable values use `contenteditable`; the spectrum is `role=img`; route changes do not establish heading/focus/announcement; small controls, `overflow:hidden`, physical left/right rules, and 390px-only checks do not establish 320px, 400% zoom, keyboard-open mobile, or RTL parity. W30 owns complete product journeys.

## A12. Evidence is not reproducible

T audit imagery is about 1.7GiB/3,467 files with only a tiny tracked subset; ignored U frames are cited by tracked close documents. Sixteen non-primary worktrees consume about 11GiB; most are ancestor/dirty residue. Root PNG litter and stale docs remain. W4 removes the carrying weight; W32 tracks only decisive π/DELTA frames and W33 verifies them from a clean checkout.

## A13. Security/platform residuals escaped the tidy module story

Mongo runs without an authenticated application role; a shared admin token and omnipotent impersonation remain; audit is fail-open; delete cascades have a cap; cron configuration permits invalid grace values and replica duplication; runtime startup instructs operators to retrieve deleted migration code. W10 rebuilds trust, composition, audit, maintenance leases/batches, and the fresh-schema cut.

## A14. Tooling accumulation is itself a product cost

Custom gates, CI scripts, benches, and plugins total thousands of lines. Some parse comments/Markdown, one benchmark crashes, and the font/source plugins encode alternate build paths. W4 removes the proof theater; W6 and W31 replace the two live plugin responsibilities with ordinary product architecture.

## A15. Per-pane PASS launders whole-product proportion

The current card grammar gives empty companions, renderer seats, titles, numbers, dividers, ornaments and touch footprints comparable layout authority regardless of their jobs. The supplied Lab crop makes the mechanism plain: a Blob-derived title minimum creates a vast label→headline void, `Lab` competes with the numeric specimen, and a timid painted Blob consumes a large reservation. Five Admin routes also spend half the main on an unrelated Palettes companion. `OPTICAL-BENCH-COMPOSITIONS.md` decides all eighteen product compositions; `PROPORTION-AUDIT.md` gives every repeated element species a terminal relation; W18–W29 implement and W32 challenges the gestalt. PR-01…03 freeze the exact `1/√φ` type relation, title gap and fixed-footprint painted-mass increase.

## A16. A route census without a wire and cut contract is not CRUD truth

The 52-route inventory originally decided names while leaving request bodies, query closure, cursors, response items, replay values, secret roles, authority cardinality and legacy row mapping to implementation. That permits a nominally complete API whose retries mutate twice, lists leak or skip, close scans the database, exports serialize mutable state, and private legacy palettes survive inaccessible. `PALETTE-WIRE-CONTRACT.md` closes the 50-route target; the Domain fixes permanent replay tuples, bounded authority, O(1) lifecycle, provenance privacy and safe export snapshots; §7 maps all nine source collections deterministically or rejects the whole candidate. W10–W16 and W22–W24 own execution.

## A17. Normalized ingress cannot certify a raw namespace law

Cloudflare's HTTP path collapses information before the no-alias predicate and its fixed boundary response cannot emit the one UUIDv7 Problem contract. V does not weaken either law or add an app fallback. D29 retires that rail: non-proxying DNS reaches a dual-stack L4 TCP load balancer with PROXY v2, then redundant private NGINX+njs/QuickJS TLS edges whose sole catch-all dispatcher reads the original request-target buffer before routing, serves the same-origin SPA/API, signs the private Hono origin and fully settles cookie-changing responses. W16 proves the local contract; W33 proves native IPv4/IPv6 and byte-on-wire behavior.

## Audit verdict

U is not terminal. Its landed fixes remain credited, but its relay, owner-attest, trigger-gated, and decision-pending tails are not re-booked: each is now either built in W4–W33, banked behind a named external trigger, or retired.
