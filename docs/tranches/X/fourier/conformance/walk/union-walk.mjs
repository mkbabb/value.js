// SERVED MODEL: claude-opus-5[1m]
//
// ─────────────────────────────────────────────────────────────────────────────
// union-walk.mjs — the CRUD/provenance union prototype, walked end to end.
//
// Wave: X.F.W8 (Track C · X·F), unit `d`. Spec: docs/tranches/X/fourier/waves/F-W8.md
//   §3 §R (R1–R6) · §3 §M (M1–M5) · §3 §D (D2) · §3 §P (P7) · §4 gates G6–G13.
// Register: ../fixture-register.md §3b — every assertion below carries the id of
//   its register row, and every register row names the leg that executes it.
// Authority: docs/tranches/X/COHESION.md §0j (the owner's begin-word, 2026-09-17)
//   and §0j.D (X·F's docket): F-SS4REST R1 (diff leg RE-SCOPED, one-sided),
//   R5 (STOP MINTING the off-state `[]`), R7 (CODEGEN), OG-F1 (the frozen
//   denominator — this file publishes none).
//
// ▲ AUTHORED HERE, EXECUTED AT F.W9/W10. No run under F.W8, in any mode.
//   The run environment is F.W9's deploy spine — a NON-PRODUCTION stack. This
//   module mutates fourier and value.js *data* there; it writes zero BYTES of
//   either tree, ever (spec §2b, §5c: the fourier tree is READ-ONLY, always).
//
// ▲ WHAT THIS IS. A diagnostic instrument, not a repair. It repairs nothing and
//   claims credit for no other wave's cure (FR-GIG-5 mirror). Where a leg cannot
//   be answered by one side, the inability is REPORTED WITH ITS REASON — never
//   skipped, never substituted, never softened into a pass.
//
// ▲ THE FOUR LAWS THIS FILE IS WRITTEN UNDER, each enforced by code below:
//   1. NON-PERTURBATION (G9, spec §M M1). Every read is tagged SAFE or
//      UNSAFE-DECLARED. A SAFE read is PROVED pure by re-reading and diffing
//      (no blanket allowlist: each row declares its volatile fields by name).
//      The one UNSAFE read — fourier's `GET /api/visualizations/{slug}`, which
//      `$inc`s `views` and serialises the PRE-increment doc — is DECLARED and
//      SUBTRACTED: the ledger counts the walk's own reads, and the leg asserts
//      Δviews EQUALS that count. RFC 9110 §9.2.1: a read that mutates is unsafe
//      against any proxy or prefetch, so an unaccountable delta is a RED, never
//      a rounding error.
//   2. NO SILENT RETRY (G9, spec §M M2). This client NEVER auto-retries a 429.
//      `retryOn429` is false by construction — there is no code path that sleeps
//      and retries — and a 429 surfaces the wait (Retry-After) in the report. A
//      probe that silently retries for 60 s manufactures false timings and false
//      greens in the authenticated walk.
//   3. PER-CALL ABORT (M-CK class, spec §P P8). Every request owns its
//      AbortController. No shared abort key exists in this instrument, and no
//      leg enumerates a chain through a list endpoint (the product's shared key
//      `"listVisualizations"` is the fourier API row's cure, not the walk's).
//   4. NO MASKING. No try/catch hides a defect: a transport error becomes a RED
//      assertion carrying the error text. There is no skip, no allowlist, no
//      `--allow-red`, and no exit-0 path that leaves a RED unreported.
//
// ▲ TRIPWIRE — DO-NOT-REGENERATE (spec §D D2, banked at F-W5 G16; NOT re-booked
//   here). The walk must never regenerate canonical geometry. It derives only
//   from an ephemeral image the RUNNER supplies (`--image`), never from a
//   tracked asset; it invokes no generator; it writes no file inside either
//   repository (enforced at `assertReportPathOutsideRepos`); and the
//   closed/open contour flag is CARRIED from the response, never inferred
//   (fr-FourierShapeExtractor C-3: no closure heuristic).
//
// ▲ PROBE-SUPPRESSION LOCKS, honoured by construction:
//   K12 — fr-GalleryDraftsSection B-2's duplicate-row outcome closes STATICALLY;
//         no leg here spends a probe re-deriving it (there is no repeat-publish
//         click loop anywhere in this file).
//   FR-GV-24 — repair tests must NOT assert a re-open view increment: the guard
//         DOES work within a session; the defect is SCOPE. The only view
//         assertion here is the LEDGER EQUALITY of law 1 — never "re-open
//         increments".
//   BC-20 — `duration = ref(20000)`'s zero writers stay banked at BC-20; the
//         unit fork is REPORTED (law: server-side units), never re-booked.
//
// Node ≥ 20 (global fetch). Zero dependencies, by design: the instrument must
// run on the deploy spine without an install step.
// ─────────────────────────────────────────────────────────────────────────────

import { argv, env, exit, stdout } from "node:process";
import { writeFile } from "node:fs/promises";
import { resolve as resolvePath } from "node:path";
import { randomUUID } from "node:crypto";

// ── 0. Identity ──────────────────────────────────────────────────────────────

export const WALK = {
    wave: "X.F.W8",
    unit: "d",
    register: "docs/tranches/X/fourier/conformance/fixture-register.md §3b",
    spec: "docs/tranches/X/fourier/waves/F-W8.md",
    runsAt: "F.W9/W10 (the deploy spine) — NEVER under F.W8",
};

/** The two trees. No report, log or artefact of this walk may land inside them. */
const REPO_ROOTS = [
    env.UNION_WALK_VALUE_REPO ?? "/Users/mkbabb/Programming/value.js",
    env.UNION_WALK_FOURIER_REPO ?? "/Users/mkbabb/Programming/fourier-analysis",
];

/** Hosts this instrument refuses outright. A diagnostic never runs in production. */
const PRODUCTION_DENYLIST = [
    "mbabb.fi.ncsu.edu",
    "color.babb.dev",
    ...(env.UNION_WALK_PROD_HOSTS ?? "").split(",").map((h) => h.trim()).filter(Boolean),
];

// ── 1. The declared contract this walk asserts against ───────────────────────
//
// Every constant below is a MEASURED fact with its coordinate, re-resolved at
// fourier `21e11b0` and value.js `tranche-u` on 2026-09-19 (D-19). A coordinate
// is an address, not an identity: the runner re-resolves before citing.

/** The closed, ordered version-identity atom set — `api/lib/crud/atomdiff.py:29`. */
export const ATOM_KEY_ORDER = [
    "active_bases",
    "n_harmonics",
    "contour_settings",
    "animation_settings", // atom 4 of 5 — the one the update verb cannot reach
    "palette_slug",
];

/**
 * SERVER-SIDE UNITS, as the operation model declares them
 * (`api/models/shared.py:65-71`, class `AnimationSettings`). The walk asserts
 * the ROUND TRIP against these and reports every client constant that disagrees
 * — it does not harmonise them (that reconciliation is F.W5's clause).
 */
export const ANIMATION_UNITS = {
    fps: { unit: "frames/second", server: 30, clientDefault: 60, at: "web/src/lib/defaults.ts:24" },
    duration: {
        unit: "SECONDS",
        server: 30.0,
        clientDefault: 5000, // `defaults.ts:25` — milliseconds, a 1000× fork
        rendererDefault: 20000, // `web/src/stores/animation.ts:77` — BC-20, not re-booked
        at: "api/models/shared.py:67",
    },
    max_circles: { unit: "count", server: 80, clientDefault: 100, rendererDefault: 80, at: "api/models/shared.py:68" },
    easing: { unit: "catalog token", server: "sine", at: "api/models/shared.py:69" },
    speed: { unit: "multiplier", server: 1.0, clientDefault: 1, validator: null, at: "api/models/shared.py:70" },
    active_bases: { unit: "basis tokens", server: ["fourier-epicycles"], at: "api/models/shared.py:71" },
};

/**
 * G13's consumption map (spec §R R6 — the liveness predicate). Every envelope
 * field the walk observes must appear here with a disposition:
 *   CONSUME — a named consumer reads it;
 *   DROP    — no consumer exists and the contract should drop the field.
 * A field NOT in this map is reported UNDECLARED, which is a RED: the predicate
 * is "every field has a producer AND a consumer, or it is dropped", and silence
 * is neither.
 */
export const CONSUMPTION_MAP = {
    // ── measured dead, three directions of one seam (M-β4 ⊕ L·m-6/C·D-14 ⊕ PP-DEADSEAM)
    "epicycles.trace": {
        disposition: "DROP",
        consumer: null,
        why: "3000-sample polyline computed per response (api/services/computation.py:127), declared web/src/lib/types.ts:25, ZERO readers in the web tree, yet structuredClone'd into every IndexedDB draft (stores/workspace.ts:109)",
        owner: "fourier API row",
    },
    "equations.reconstructed_points": {
        disposition: "DROP",
        consumer: null,
        why: "500+500 floats (api/routers/equations.py:114, :128; model api/models/equations.py:33), declared web/src/lib/equation/types.ts:31, read by nothing",
        owner: "fourier API row",
    },
    "assets.preview_path": {
        disposition: "DROP",
        consumer: null,
        why: 'written "" at all three server sites (api/models/assets.py:85, api/services/image_storage.py:318, api/responses.py:22); client leaf unreachable — zero implementation on either side',
        owner: "fourier API row",
    },
    // ── measured live (the map is a declaration, not a guess: each names its consumer)
    "visualization.slug": { disposition: "CONSUME", consumer: "router + every by-slug read" },
    "visualization.visibility": { disposition: "CONSUME", consumer: "stores/gallery.ts publish/unpublish" },
    "visualization.animation_settings": { disposition: "CONSUME", consumer: "VisualizationView.vue:53-64" },
    "visualization.contour_settings": { disposition: "CONSUME", consumer: "ContourSettings.vue" },
    "visualization.active_bases": { disposition: "CONSUME", consumer: "BasisSelector.vue" },
    "visualization.n_harmonics": { disposition: "CONSUME", consumer: "useWorkspaceLoader" },
    "visualization.views": { disposition: "CONSUME", consumer: "GalleryCard.vue (and the M1 ledger below)" },
    "visualization.likes": { disposition: "CONSUME", consumer: "stores/gallery.ts:284 (`likes ?? 0`) ⊕ GalleryCard.vue:147" },
    "palette.slug": { disposition: "CONSUME", consumer: "demo palette router" },
    "palette.colors": { disposition: "CONSUME", consumer: "the picker" },
    "palette.versionCount": { disposition: "CONSUME", consumer: "the version rail" },
};

// ── 2. Preflight — the instrument refuses to run where it must not ───────────

export function parseArgs(args = argv.slice(2)) {
    const out = { report: null, image: null, only: null };
    for (let i = 0; i < args.length; i++) {
        const a = args[i];
        if (a === "--report") out.report = args[++i] ?? null;
        else if (a === "--image") out.image = args[++i] ?? null;
        else if (a === "--only") out.only = (args[++i] ?? "").split(",").filter(Boolean);
        else throw new Error(`union-walk: unknown argument ${a}`);
    }
    return out;
}

export function assertReportPathOutsideRepos(path) {
    if (!path) return;
    const abs = resolvePath(path);
    for (const root of REPO_ROOTS) {
        if (abs === root || abs.startsWith(`${root}/`)) {
            throw new Error(
                `union-walk: refusing to write ${abs} — it is inside ${root}. ` +
                    "The walk writes ZERO bytes of either tree (F-W8 §2b/§5c); the report lands on the runner's own volume.",
            );
        }
    }
}

export function assertNonProduction(bases) {
    if (env.UNION_WALK_ENV !== "nonprod") {
        throw new Error(
            "union-walk: UNION_WALK_ENV must be exactly 'nonprod'. This instrument MUTATES data " +
                "(create/update/remix/flag) and is authorised only on F.W9's deploy spine.",
        );
    }
    for (const [kind, base] of Object.entries(bases)) {
        if (!base) throw new Error(`union-walk: missing base URL for object kind '${kind}'`);
        const host = new URL(base).hostname;
        if (PRODUCTION_DENYLIST.some((deny) => host === deny || host.endsWith(`.${deny}`))) {
            throw new Error(`union-walk: refusing to walk production host '${host}' (kind '${kind}')`);
        }
    }
}

// ── 3. The ledgers — assertions, calls, perturbation ─────────────────────────

/**
 * An assertion's verdict is one of:
 *   GREEN    — the predicate held, with its receipt;
 *   RED      — it did not, with its receipt (a RED is the instrument working);
 *   BLOCKED  — a precondition the REGISTER names is unmet, so the predicate
 *              could not be evaluated. BLOCKED IS NOT A PASS: it exits non-zero
 *              and names the owner of the precondition.
 * There is no fourth verdict, and nothing here may downgrade a RED.
 */
export class Register {
    constructor() {
        this.rows = [];
    }
    record(id, verdict, claim, receipt, extra = {}) {
        if (!["GREEN", "RED", "BLOCKED"].includes(verdict)) {
            throw new Error(`union-walk: illegal verdict ${verdict} for ${id}`);
        }
        this.rows.push({ id, verdict, claim, receipt, ...extra });
        return verdict;
    }
    assert(id, held, claim, receipt, extra = {}) {
        return this.record(id, held ? "GREEN" : "RED", claim, receipt, extra);
    }
    blocked(id, claim, precondition, owner) {
        return this.record(id, "BLOCKED", claim, `precondition unmet: ${precondition}`, { owner });
    }
    get counts() {
        const c = { GREEN: 0, RED: 0, BLOCKED: 0 };
        for (const r of this.rows) c[r.verdict]++;
        return c;
    }
}

/**
 * G9's instrument. Every UNSAFE read declares the mutation it causes; the leg
 * that reads the mutated counter subtracts the walk's own contribution and
 * asserts the remainder is ZERO. An entry that cannot be subtracted (a proxy
 * prefetch, a second client) is reported UNSUBTRACTABLE and is a RED.
 */
export class PerturbationLedger {
    constructor() {
        this.entries = [];
    }
    declare({ leg, target, field, delta, reason, rfc }) {
        this.entries.push({ leg, target, field, delta, reason, rfc, at: new Date().toISOString() });
    }
    totalFor(target, field) {
        return this.entries
            .filter((e) => e.target === target && e.field === field)
            .reduce((n, e) => n + e.delta, 0);
    }
    subtract(observed, target, field) {
        return observed - this.totalFor(target, field);
    }
    get declaration() {
        return {
            law: "F-W8 §M M1 / gate G9 — the union prototype's own READS must not mutate the entity under measurement.",
            rfc: "RFC 9110 §9.2.1 — a mutating GET is unsafe against any proxy or prefetch.",
            safeByProof: [
                "value.js `GET /palettes/:slug` and `GET /palettes/:slug/versions` — no `$inc` exists on any palette read path (the only `$inc`s are voteCount on the vote verb, forkCount on the fork write, versionCount on the version write); the walk PROVES it per run by double-reading and diffing with an EMPTY volatile set.",
            ],
            unsafeDeclared: [
                "fourier `GET /api/visualizations/{slug}` — `find_one` (api/routers/visualizations.py:256) → `$inc {views: 1}` (:269) → `_public_doc` serialises the PRE-increment document (:272). The read cannot observe its own side effect, and the same verb is the ETag-capture path (stores/gallery.ts:255, :293, :311; stores/workspace.ts:222/:371/:396), so every ETag cache-miss adds a phantom view to the row being mutated. No `viewed_ips` dedup exists while `liked_ips` does (:80).",
            ],
            subtraction:
                "Δviews observed over the leg MUST EQUAL the ledger's declared read count for that slug; the remainder after subtraction is asserted ZERO (F8-WALK-M01).",
            notAsserted:
                "FR-GV-24 — no assertion here claims a re-open view increment: within a session the guard works; the defect is SCOPE, and a repair test that asserted a re-open increment would bank the wrong cure.",
            entries: this.entries,
        };
    }
}

// ── 4. The client — per-call abort, no silent retry, nothing swallowed ───────

export class WalkClient {
    /**
     * @param {{bases: Record<string,string>, register: Register, perturbation: PerturbationLedger}} deps
     */
    constructor({ bases, register, perturbation }) {
        this.bases = bases;
        this.register = register;
        this.perturbation = perturbation;
        this.calls = [];
        this.timeoutMs = Number(env.UNION_WALK_TIMEOUT_MS ?? 15000);
        this.rateLimitWaits = [];
        /** Every JSON envelope this walk observed, labelled — G13's raw material. */
        this.envelopes = [];
    }

    /**
     * @param {object} req
     * @param {"fourier"|"value"} req.kind
     * @param {string} req.leg     the walk leg, for the call log
     * @param {string} req.method
     * @param {string} req.path
     * @param {"SAFE"|"UNSAFE-DECLARED"|"MUTATION"} req.safety
     * @param {object} [req.body]
     * @param {Record<string,string>} [req.headers]
     * @param {string} [req.idempotencyKey]
     * @param {string} [req.envelope]  the envelope label G13's traversal files the body under
     * @param {{target: string, field: string, delta: number, reason: string, rfc: string}} [req.perturbs]
     */
    async call(req) {
        const { kind, leg, method, path, safety, body, headers = {}, idempotencyKey, perturbs } = req;
        const base = this.bases[kind];
        const url = new URL(path, base).toString();

        // LAW 3 — one AbortController per call. Never a shared key.
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(new Error("union-walk: per-call timeout")), this.timeoutMs);

        const finalHeaders = { accept: "application/json", ...headers };
        if (body !== undefined) finalHeaders["content-type"] = "application/json";
        if (idempotencyKey) finalHeaders["idempotency-key"] = idempotencyKey;

        const started = Date.now();
        let res = null;
        let payload = null;
        let transportError = null;
        try {
            res = await fetch(url, {
                method,
                headers: finalHeaders,
                body: body === undefined ? undefined : JSON.stringify(body),
                signal: controller.signal,
                redirect: "manual",
            });
            const text = await res.text();
            payload = text ? safeJson(text) : null;
        } catch (err) {
            // NOT a masking catch: the error is RECORDED and returned as a
            // failed call. Every caller treats `transportError` as a RED.
            transportError = err instanceof Error ? err.message : String(err);
        } finally {
            clearTimeout(timer);
        }

        const record = {
            leg,
            kind,
            method,
            path,
            safety,
            status: res?.status ?? null,
            ms: Date.now() - started,
            transportError,
            idempotencyKey: idempotencyKey ?? null,
        };

        // LAW 2 — a 429 is SURFACED, never slept through. There is no retry
        // branch in this method; `retryOn429` is false by construction.
        if (res?.status === 429) {
            const retryAfter = res.headers.get("retry-after");
            this.rateLimitWaits.push({ leg, kind, path, retryAfter, note: "NOT retried; the wait is surfaced" });
            record.rateLimited = true;
            record.retryAfter = retryAfter;
        }

        // LAW 1 — an UNSAFE read declares its perturbation at the moment it happens.
        if (perturbs && !transportError) {
            this.perturbation.declare({ leg, ...perturbs });
        }

        this.calls.push(record);
        // G13's traversal is fed HERE, by every call, so the liveness leg cannot
        // be starved into a false green by a leg that forgot to hand it a body.
        if (req.envelope && payload && typeof payload === "object" && !payload.__nonJsonBody) {
            this.envelopes.push([req.envelope, payload]);
        }
        return {
            ok: Boolean(res?.ok),
            status: res?.status ?? null,
            etag: res?.headers.get("etag") ?? null,
            headers: res?.headers ?? null,
            json: payload,
            transportError,
        };
    }

    /**
     * A SAFE read, PROVED pure: read twice and diff. `volatile` is the row's own
     * declared exception set, by NAME — never a blanket allowlist, and an empty
     * array is the strongest form of the claim.
     */
    async proveSafeRead({ kind, leg, path, volatile: volatileFields = [], assertionId }) {
        const a = await this.call({ kind, leg, method: "GET", path, safety: "SAFE" });
        const b = await this.call({ kind, leg, method: "GET", path, safety: "SAFE" });
        if (a.transportError || b.transportError) {
            return this.register.record(
                assertionId,
                "RED",
                `the read ${path} is non-mutating`,
                `transport error: ${a.transportError ?? b.transportError}`,
            );
        }
        const strippedA = stripFields(a.json, volatileFields);
        const strippedB = stripFields(b.json, volatileFields);
        const identical = JSON.stringify(strippedA) === JSON.stringify(strippedB);
        return this.register.assert(
            assertionId,
            identical,
            `GET ${path} is non-mutating (volatile fields declared by name: ${volatileFields.length ? volatileFields.join(", ") : "NONE"})`,
            identical ? "two reads, byte-identical after the declared strip" : `two reads DIFFER: ${diffKeys(strippedA, strippedB).join(", ")}`,
        );
    }
}

function safeJson(text) {
    try {
        return JSON.parse(text);
    } catch {
        // The body is reported as-is; a non-JSON body is data, not an exception.
        return { __nonJsonBody: text.slice(0, 2000) };
    }
}

function stripFields(obj, fields) {
    if (!obj || typeof obj !== "object") return obj;
    const clone = structuredClone(obj);
    for (const f of fields) delete clone[f];
    return clone;
}

function diffKeys(a, b) {
    const keys = new Set([...Object.keys(a ?? {}), ...Object.keys(b ?? {})]);
    return [...keys].filter((k) => JSON.stringify(a?.[k]) !== JSON.stringify(b?.[k]));
}

/** Flatten an envelope to dotted field paths, for G13's liveness traversal. */
export function collectFieldPaths(value, prefix, sink = new Set()) {
    if (value === null || typeof value !== "object") {
        sink.add(prefix);
        return sink;
    }
    if (Array.isArray(value)) {
        // The ARRAY is the field; its members are sampled at index 0 only, so a
        // 3000-sample polyline costs one path, not three thousand.
        sink.add(prefix);
        if (value.length) collectFieldPaths(value[0], `${prefix}[]`, sink);
        return sink;
    }
    for (const [k, v] of Object.entries(value)) collectFieldPaths(v, prefix ? `${prefix}.${k}` : k, sink);
    return sink;
}

// ── 5. The legs ──────────────────────────────────────────────────────────────

/**
 * LEG · CREATE — F8-WALK-P07 (gate G10): idempotent-or-declared on BOTH sides,
 * and the register records which half each repo holds.
 *
 * MEASURED at 2026-09-19 (the halves are asymmetric and the asymmetry is the finding):
 *   fourier — the server HOLDS replay on create (`idempotency.replay_or_record`,
 *     api/routers/visualizations.py:236) and on remix (:612), keyed `user:{owner_slug}`;
 *     the shipped client DECLARES the channel (web/src/lib/api.ts:123-124, applied
 *     :208-209) and PASSES IT FROM NOWHERE — `grep -rn "idempotencyKey:" web/src`
 *     returns no output. Replay is reachable by this instrument and by no shipped caller.
 *   value.js — a key is REQUIRED (400 without) on the two APPENDING operations,
 *     revert and fork (api/src/platform/http/idempotency.ts:90-93, app-global at
 *     app.ts:73), and the fork write is transactional with an in-txn source re-read
 *     (service/forks.ts:105-128). Both halves on one verb.
 * K12 holds: no duplicate-publish click loop is probed here — that outcome closes STATICALLY.
 */
export async function legCreate({ client, register, state }) {
    const key = randomUUID();
    const body = state.fourierCreateBody;

    const first = await client.call({
        kind: "fourier", leg: "create", method: "POST", path: "/api/visualizations",
        safety: "MUTATION", body, idempotencyKey: key, headers: state.fourierAuth, envelope: "visualization",
    });
    const replay = await client.call({
        kind: "fourier", leg: "create", method: "POST", path: "/api/visualizations",
        safety: "MUTATION", body, idempotencyKey: key, headers: state.fourierAuth, envelope: "visualization",
    });

    if (first.transportError || replay.transportError) {
        register.record("F8-WALK-P07-F", "RED", "fourier create replays under one Idempotency-Key",
            `transport error: ${first.transportError ?? replay.transportError}`);
    } else {
        const sameSlug = first.json?.slug && first.json.slug === replay.json?.slug;
        register.assert("F8-WALK-P07-F", Boolean(sameSlug),
            "fourier: two creates under ONE Idempotency-Key yield ONE resource",
            `slugs: ${first.json?.slug} / ${replay.json?.slug} (statuses ${first.status}/${replay.status})`,
            { declaredHalf: "server replay HELD; the shipped client passes no key — DECLARED, owner fourier API row" });
        state.fourierSlug = first.json?.slug ?? null;
        state.fourierETag = first.etag;
        state.fourierHeadHash = first.json?.head_hash ?? first.json?.content_hash ?? null;
    }

    // value.js — the REQUIRED half: a fork without a key is refused 400, and with
    // a key it replays. Both are assertions; neither is assumed.
    const forkPath = `/palettes/${state.valueSourceSlug}/forks`;
    const noKey = await client.call({
        kind: "value", leg: "create", method: "POST", path: forkPath,
        safety: "MUTATION", body: {}, headers: state.valueAuth,
    });
    register.assert("F8-WALK-P07-V1", noKey.status === 400,
        "value.js: an APPENDING write without an Idempotency-Key is REFUSED (400), never silently executed twice",
        `status ${noKey.status}`,
        { witness: "api/src/platform/http/idempotency.ts:76-93 — the requirement is declared beside the store, app-global" });

    const vKey = randomUUID();
    const f1 = await client.call({ kind: "value", leg: "create", method: "POST", path: forkPath, safety: "MUTATION", body: {}, idempotencyKey: vKey, headers: state.valueAuth, envelope: "palette" });
    const f2 = await client.call({ kind: "value", leg: "create", method: "POST", path: forkPath, safety: "MUTATION", body: {}, idempotencyKey: vKey, headers: state.valueAuth, envelope: "palette" });
    const sameChild = f1.json?.data?.slug && f1.json.data.slug === f2.json?.data?.slug;
    register.assert("F8-WALK-P07-V2", Boolean(sameChild),
        "value.js: two forks under ONE Idempotency-Key yield ONE child (transactional write + replay)",
        `slugs: ${f1.json?.data?.slug} / ${f2.json?.data?.slug}`);
    state.valueForkSlug = f1.json?.data?.slug ?? null;

    // The two divergences are STATED, never harmonised (spec §P P1).
    register.record("F8-WALK-P07-DIV", "GREEN",
        "the privacy defaults of the derive child are OPPOSITE and are reported, not reconciled",
        `fourier remix child is born 'draft' (api/models/visualization.py:277); value.js fork child is born 'private' (service/forks.ts:87). fourier runs NO transaction by deliberate choice ("standalone-topology-honest"); value.js's fork IS transactional.`);
}

/**
 * LEG · DERIVE — F8-WALK-R04 (gate G8): the derive step's cache identity must be
 * a SUPERSET of the request fields the operation consumes. The assertion is
 * `contour_hash` INSTABILITY across an ML-threshold change. Today it is STABLE,
 * and that stability IS the defect (B-4): `extraction_cache_key` is a closed
 * 10-field literal (api/services/image_storage.py:250-263) omitting
 * `ml_threshold` and `ml_detail_threshold` — the two fields this control solely
 * produces — while api/routers/images.py:220-226 short-circuits on the cache hit
 * BEFORE `compute_contours` (:230). `auto` is the shipped default
 * (web/src/lib/defaults.ts:9), so the control is live on every fresh workspace.
 *
 * ▲ D2 TRIPWIRE: the image is the RUNNER's ephemeral upload. No tracked asset is
 *   read, no generator is invoked, no geometry is regenerated, and the
 *   closed/open flag is CARRIED from the response (C-3: no closure heuristic).
 */
export async function legDerive({ client, register, state }) {
    if (!state.imageSlug) {
        return register.blocked("F8-WALK-R04",
            "the derive leg asserts contour_hash INSTABILITY across an ML-threshold change",
            "no ephemeral image was supplied (--image); the walk refuses to derive from a tracked asset (D2 tripwire)",
            "F.W9/W10 runner");
    }
    const settings = (mlThreshold) => ({ ...state.contourSettings, strategy: "auto", ml_threshold: mlThreshold });

    const low = await client.call({
        kind: "fourier", leg: "derive", method: "POST", path: `/api/images/${state.imageSlug}/contours`,
        safety: "MUTATION", body: settings(0.5), headers: state.fourierAuth,
    });
    const high = await client.call({
        kind: "fourier", leg: "derive", method: "POST", path: `/api/images/${state.imageSlug}/contours`,
        safety: "MUTATION", body: settings(0.85), headers: state.fourierAuth,
    });

    if (low.transportError || high.transportError) {
        return register.record("F8-WALK-R04", "RED",
            "contour_hash is UNSTABLE across an ML-threshold change (cache identity ⊇ consumed request fields)",
            `transport error: ${low.transportError ?? high.transportError}`);
    }

    const a = low.json?.contour_hash;
    const b = high.json?.contour_hash;
    register.assert("F8-WALK-R04", Boolean(a && b && a !== b),
        "contour_hash is UNSTABLE across an ML-threshold change — the cache identity is a superset of the fields the operation consumes",
        `ml_threshold 0.50 → ${a}; 0.85 → ${b}${a === b ? " — IDENTICAL: the 0.50 contour was served for the 0.85 request, with no signal" : ""}`,
        { owner: "fourier API row", clause: "an operation's cache identity must be a superset of the request fields it consumes" });

    // C-3: the closed/open flag is CARRIED, never inferred from geometry.
    const carried = low.json?.contours?.[0] ?? null;
    register.assert("F8-WALK-R04-FLAG", carried === null || Object.hasOwn(carried, "closed"),
        "the closed/open flag is CARRIED on the response, never inferred by this instrument (fr-FourierShapeExtractor C-3)",
        carried === null ? "no contour member returned; nothing inferred" : `flag present: ${JSON.stringify(carried?.closed)}`);

    state.contourHash = a ?? null;
}

/**
 * LEG · DIFF — ONE-SIDED BY RULING. §0j.D F-SS4REST R1 RE-SCOPES value.js out of
 * the diff clause: `atomdiff.ts`, `atomDiff` on `PaletteVersion` and the
 * conformance fixture were excised at value.js `a8ff7792`. The walk asserts the
 * fourier leg and DECLARES the value leg absent — it does not fabricate one.
 *
 * fourier's `/diff` is NOT a general two-point diff: `on_chain` is
 * {head_hash} ∪ {fork_of_hash} (api/routers/visualizations.py:827); it reads the
 * STORED atom_diff and never recomputes, and any other pair 404s.
 */
export async function legDiff({ client, register, state }) {
    if (!state.fourierSlug || !state.fourierHeadHash) {
        return register.blocked("F8-WALK-DIFF-F", "the fourier diff leg walks an on-chain pair and a 404 negative",
            "no created slug / head hash from the create leg", "F.W9/W10 runner");
    }
    const onChain = await client.call({
        kind: "fourier", leg: "diff", method: "GET",
        path: `/api/visualizations/${state.fourierSlug}/diff?from_hash=${state.fourierForkOfHash ?? state.fourierHeadHash}&to_hash=${state.fourierHeadHash}`,
        safety: "SAFE", headers: state.fourierAuth, envelope: "diff",
    });
    register.assert("F8-WALK-DIFF-F", onChain.status === 200 && Array.isArray(onChain.json?.ops),
        "the on-chain diff answers with the stored atom_diff (ops present; empty ⟺ identical)",
        `status ${onChain.status}, ops ${JSON.stringify(onChain.json?.ops)?.slice(0, 120)}`);

    const offChain = await client.call({
        kind: "fourier", leg: "diff", method: "GET",
        path: `/api/visualizations/${state.fourierSlug}/diff?from_hash=deadbeef&to_hash=${state.fourierHeadHash}`,
        safety: "SAFE", headers: state.fourierAuth,
    });
    register.assert("F8-WALK-DIFF-F404", offChain.status === 404,
        "an OFF-chain pair 404s — the fixture must not assume a general two-point diff",
        `status ${offChain.status}`);

    register.record("F8-WALK-DIFF-V", "GREEN",
        "the value-side diff leg is ABSENT BY RULING and the union's diff verdict is ONE-SIDED, said out loud",
        "COHESION §0j.D F-SS4REST R1 — RE-SCOPE value.js out of the diff clause; excised at value.js a8ff7792. No fixture re-opens `canonical_digest` (SKIPPED-sanctioned; re-opening it fails G14).");
}

/**
 * LEG · REMIX — the fifth verb, walked on both kinds and NOT harmonised.
 *   fourier: `POST /api/visualizations/{slug}/remix` carries the TRI-STATE
 *     `palette_slug` (absent · null · value, read via `model_fields_set`,
 *     api/models/visualization.py:271-281) and the child is born `draft` (:277);
 *     the write carries `idempotency.replay_or_record` (:612) and NO transaction.
 *   value.js: the fork child is born `private` (service/forks.ts:87) and the
 *     write IS transactional with an in-txn source re-read (:105-128).
 * The opposite privacy defaults are ASSERTED SEPARATELY and reported as a
 * divergence — the union states it, the walk does not reconcile it.
 */
export async function legRemix({ client, register, state }) {
    if (!state.fourierSlug) {
        return register.blocked("F8-WALK-REMIX-F", "the remix child is born `draft` and the tri-state palette_slug is honoured",
            "no created slug from the create leg", "F.W9/W10 runner");
    }
    const results = {};
    for (const [label, body] of [
        ["absent", {}],
        ["null", { palette_slug: null }],
        ["value", { palette_slug: state.valueSourceSlug || "union-walk-palette" }],
    ]) {
        const res = await client.call({
            kind: "fourier", leg: "remix", method: "POST", path: `/api/visualizations/${state.fourierSlug}/remix`,
            safety: "MUTATION", body, idempotencyKey: randomUUID(), headers: state.fourierAuth, envelope: "visualization",
        });
        results[label] = { status: res.status, slug: res.json?.slug ?? null, visibility: res.json?.visibility ?? null, palette_slug: res.json?.palette_slug ?? null };
        if (label === "absent" && res.json?.slug) {
            state.fourierRemixSlug = res.json.slug;
            state.fourierForkOfHash = res.json?.fork_of_hash ?? state.fourierHeadHash;
        }
    }
    register.assert("F8-WALK-REMIX-F", results.absent?.visibility === "draft",
        "the fourier remix child is born `draft`, and the tri-state `palette_slug` is exercised in ALL THREE states because the MODEL declares the tri-state",
        JSON.stringify(results),
        { divergence: "value.js's fork child is born `private` — OPPOSITE privacy defaults on one verb, STATED and never harmonised (spec §P P1(a))" });

    if (state.valueForkSlug) {
        const child = await client.call({
            kind: "value", leg: "remix", method: "GET", path: `/palettes/${state.valueForkSlug}`,
            safety: "SAFE", headers: state.valueAuth, envelope: "palette",
        });
        register.assert("F8-WALK-REMIX-V", child.status === 200 && child.json?.data?.visibility === "private",
            "the value.js fork child is born `private` (transactional write, in-txn source re-read)",
            `status ${child.status}; visibility ${child.json?.data?.visibility}`);
    }
}

/**
 * LEG · ROUND TRIP — F8-WALK-R01/R02/R05 (gate G6).
 *   R02: the update verb must reach EVERY atom of the version-identity set, or
 *        the atom set is re-declared — stated either way, never left divergent.
 *        MEASURED: `VisualizationUpdate` (api/models/visualization.py:198-209) is
 *        five fields under `extra="forbid"`, and `animation_settings` — atom 4 of
 *        5 — is not among them. The assertion therefore has TWO limbs: the
 *        unreachability must be OBSERVABLE (a refusal with a diagnostic naming
 *        the field), and the register must carry the re-declaration.
 *   R01: a gallery replay must reproduce its own frame — WITH SERVER-SIDE UNITS.
 *   R05: the last value the client SENT is the value persisted (the HTTP half of
 *        the flush seam; the UI-timing half is declared unassertable here).
 */
export async function legRoundTrip({ client, register, state }) {
    if (!state.fourierSlug) {
        return register.blocked("F8-WALK-R02", "the update verb reaches every atom of the version-identity set",
            "no created slug from the create leg", "F.W9/W10 runner");
    }

    // Limb 1 — the atom the update verb cannot reach must be REFUSED, with a diagnostic.
    const patch = await client.call({
        kind: "fourier", leg: "round-trip", method: "PATCH", path: `/api/visualizations/${state.fourierSlug}`,
        safety: "MUTATION",
        body: { animation_settings: { ...ANIMATION_UNITS_DEFAULTS(), easing: "quad" } },
        headers: { ...state.fourierAuth, "if-match": state.fourierETag ?? "" },
    });
    const refusedWithDiagnostic =
        (patch.status === 422 || patch.status === 400) &&
        JSON.stringify(patch.json ?? {}).includes("animation_settings");
    register.assert("F8-WALK-R02", refusedWithDiagnostic,
        "atom 4 of 5 (`animation_settings`) is either REACHABLE by the update verb or REFUSED WITH A DIAGNOSTIC that names it — never silently dropped",
        `status ${patch.status}; body ${JSON.stringify(patch.json ?? {}).slice(0, 200)}`,
        {
            reDeclaration:
                "If the refusal stands, the ATOM SET is re-declared in the register to exclude what the update verb cannot touch (spec §R R2). The divergence may not be left unstated: `VisualizationUpdate` is five fields under extra='forbid' (api/models/visualization.py:198-209) while ATOM_KEY_ORDER carries animation_settings at index 3 (api/lib/crud/atomdiff.py:29).",
            owner: "F.W5 (the atom set) · fourier API row (the verb)",
        });

    // Limb 2 — the reachable atoms DO round-trip, and in the SERVER'S units.
    const reload = await client.call({
        kind: "fourier", leg: "round-trip", method: "GET", path: `/api/visualizations/${state.fourierSlug}`,
        safety: "UNSAFE-DECLARED", headers: state.fourierAuth,
        envelope: "visualization",
        perturbs: { target: state.fourierSlug, field: "views", delta: 1, reason: "GET /api/visualizations/{slug} $incs views (:269) and serialises the pre-increment doc (:272)", rfc: "RFC 9110 §9.2.1" },
    });
    const persisted = reload.json?.animation_settings ?? null;
    const unitReport = [];
    for (const [field, decl] of Object.entries(ANIMATION_UNITS)) {
        if (!persisted || !Object.hasOwn(persisted, field)) continue;
        const value = persisted[field];
        const clientDivergent = Object.hasOwn(decl, "clientDefault") && decl.clientDefault !== decl.server;
        unitReport.push({ field, unit: decl.unit, persisted: value, serverDefault: decl.server, clientDefault: decl.clientDefault ?? null, rendererDefault: decl.rendererDefault ?? null, divergentClientConstant: clientDivergent });
    }
    const durationForked = unitReport.some((r) => r.field === "duration" && r.divergentClientConstant);
    register.assert("F8-WALK-R01", persisted !== null && !durationForked,
        "a gallery replay reproduces its own frame: every persisted AnimationSettings field is round-tripped IN THE SERVER'S DECLARED UNIT",
        `persisted=${JSON.stringify(persisted)}; unit table=${JSON.stringify(unitReport)}`,
        {
            fork: "duration is declared SECONDS server-side (api/models/shared.py:67, 30.0) against 5000 ms in web/src/lib/defaults.ts:25 and 20000 ms in web/src/stores/animation.ts:77 — a 1000× fork across three declarations. BC-20 (duration's zero writers) is NOT re-booked here.",
            owner: "F.W5 (the three-way reconciliation) · fourier API row",
        });

    // R05 — the flush seam, HTTP half only, and the boundary is declared.
    // `animation_settings` is settable only at CREATE/FORK (SS-C-1), so the last
    // SENT value is exercised where the verb actually accepts it: one create
    // carrying the final easing, under its OWN key (a replay of the create leg's
    // key would return the FIRST body and assert nothing about the last value).
    const lastSentEasing = "quad";
    const flushCreate = await client.call({
        kind: "fourier", leg: "round-trip", method: "POST", path: "/api/visualizations",
        safety: "MUTATION", body: { ...state.fourierCreateBody, animation_settings: { ...ANIMATION_UNITS_DEFAULTS(), easing: lastSentEasing } },
        headers: state.fourierAuth, idempotencyKey: state.flushKey, envelope: "visualization",
    });
    const flushSlug = flushCreate.json?.slug ?? null;
    const afterFlush = flushSlug
        ? await client.call({
              kind: "fourier", leg: "round-trip", method: "GET", path: `/api/visualizations/${flushSlug}`,
              safety: "UNSAFE-DECLARED", headers: state.fourierAuth, envelope: "visualization",
              perturbs: { target: flushSlug, field: "views", delta: 1, reason: "the same unsafe read verb", rfc: "RFC 9110 §9.2.1" },
          })
        : { transportError: "no slug minted by the flush create", json: null };
    register.assert("F8-WALK-R05",
        !afterFlush.transportError && afterFlush.json?.animation_settings?.easing === lastSentEasing,
        "the LAST value the client sent is the value persisted (the HTTP half of the flush seam)",
        `sent easing=${lastSentEasing}; persisted easing=${afterFlush.json?.animation_settings?.easing ?? "n/a"}${afterFlush.transportError ? ` (${afterFlush.transportError})` : ""}`,
        {
            boundary:
                "THE UI-TIMING HALF IS NOT ASSERTABLE BY THIS INSTRUMENT and is declared, not skipped: 'the last USER-VISIBLE value' is a property of a 500 ms `watchDebounced` writer (VisualizationView.vue:53-64) against a synchronous `toRaw` read in `saveVisualization` (stores/workspace.ts:356-369). It belongs to F.W3/W4's e2e.",
            finding:
                "The banked flush seam `setEasing` (L-12/C-25) DOES NOT EXIST at fourier 21e11b0 — `grep -rn 'setEasing' web/src` returns no output. The walk therefore asserts the OBSERVABLE property and INVENTS NO SECOND SEAM (spec §R R5's lock); the naming question is routed, not resolved.",
            owner: "F.W3/W4 (the seam) · F.W5 (the name)",
        });
}

function ANIMATION_UNITS_DEFAULTS() {
    return { fps: 30, duration: 30.0, max_circles: 80, easing: "sine", speed: 1.0, active_bases: ["fourier-epicycles"] };
}

/**
 * LEG · OFF-STATE — F8-WALK-R03 (gate G7 ⊙, RULED). §0j.D F-SS4REST R5: STOP
 * MINTING the off-state `[]`; the contract does not admit it, and no silent
 * rewrite survives. The walk proves the RULED branch and no other: a minted `[]`
 * is REFUSED WITH A DIAGNOSTIC, never laundered into `["fourier-epicycles"]`.
 *
 * MEASURED: the server forbids it (`min_length=1`, api/models/visualization.py:186
 * on create and :280 on the remix/patch model); the CLIENT still mints it
 * (BasisSelector.vue:102, "Go to 'off' — allow empty selection") and two stores
 * still launder it (stores/workspace.ts:362-365, stores/gallery.ts:338-340).
 * The client half is F.W3/W4's cure; F.W8 asserts the server half and REPORTS
 * the client half — it claims no credit for either (FR-GIG-5).
 */
export async function legOffState({ client, register, state }) {
    const minted = await client.call({
        kind: "fourier", leg: "off-state", method: "POST", path: "/api/visualizations",
        safety: "MUTATION", body: { ...state.fourierCreateBody, active_bases: [] },
        headers: state.fourierAuth, idempotencyKey: randomUUID(),
    });
    const diagnosticNamesField = JSON.stringify(minted.json ?? {}).includes("active_bases");
    register.assert("F8-WALK-R03-F", minted.status === 422 && diagnosticNamesField,
        "a minted off-state `[]` is REFUSED WITH A DIAGNOSTIC naming `active_bases` — never laundered, never silently substituted",
        `status ${minted.status}; body ${JSON.stringify(minted.json ?? {}).slice(0, 200)}`,
        {
            ruling: "COHESION §0j.D F-SS4REST R5 — STOP MINTING. The fixture proves the RULED branch and may not author on any other.",
            clientHalf: "the mint (BasisSelector.vue:102) and the two laundering sites (stores/workspace.ts:362-365, stores/gallery.ts:338-340) stand at HEAD — owner F.W3/W4, reported here, cured nowhere here",
        });

    register.assert("F8-WALK-R03-LAUNDER", minted.status === 422 && !minted.json?.slug,
        "the refusal creates NOTHING: no slug is minted with a substituted basis set",
        `slug in body: ${JSON.stringify(minted.json?.slug ?? null)}`);

    // The value-side mirror of the same cardinality law: `colors: []`.
    const emptyColors = await client.call({
        kind: "value", leg: "off-state", method: "POST", path: "/palettes",
        safety: "MUTATION", body: { name: "union-walk off-state", colors: [] }, headers: state.valueAuth,
    });
    register.assert("F8-WALK-R03-V", emptyColors.status === 400 || emptyColors.status === 422,
        "value.js refuses the empty-cardinality body at the boundary (colorsArraySchema min 1 — api/src/modules/palette/schema.ts:33)",
        `status ${emptyColors.status}`);
}

/**
 * LEG · HISTORY — the chain, both kinds. The enumeration is PER-SLUG by
 * construction: no leg reads a list endpoint, because the list contract returns
 * an intersection of a filter and a page window and the product's own
 * `resetAndFetch`/`fetchNextPage` share ONE abort key (M-CK class; the per-call
 * key is the fourier API row's cure, and law 3 above is this instrument's).
 */
export async function legHistory({ client, register, state }) {
    if (state.fourierSlug) {
        const versions = await client.call({
            kind: "fourier", leg: "history", method: "GET", path: `/api/visualizations/${state.fourierSlug}/versions`,
            safety: "SAFE", headers: state.fourierAuth, envelope: "versions",
        });
        register.assert("F8-WALK-HIST-F", versions.status === 200 && Array.isArray(versions.json?.versions ?? versions.json?.items),
            "the fourier history leg answers per-slug, depth-ordered",
            `status ${versions.status}; ${JSON.stringify(versions.json ?? {}).slice(0, 160)}`,
            { carried: "F-α is F.W6's burn-down: every version is depth=0 today, so the walk must not encode a singleton chain as the contract" });
    }

    if (state.valueForkSlug) {
        await client.proveSafeRead({
            kind: "value", leg: "history", path: `/palettes/${state.valueForkSlug}/versions`,
            volatile: [], assertionId: "F8-WALK-M01-V",
        });
        const list = await client.call({
            kind: "value", leg: "history", method: "GET", path: `/palettes/${state.valueForkSlug}/versions`,
            safety: "SAFE", headers: state.valueAuth, envelope: "palette_versions",
        });
        const rows = list.json?.data ?? [];
        register.assert("F8-WALK-HIST-V", list.status === 200 && rows.length >= 1,
            "the value.js history leg carries a version row for the attributed write (revisionNo monotone, payloadHash the content identity)",
            `status ${list.status}; rows ${rows.length}; revisionNos ${JSON.stringify(rows.map((r) => r.revisionNo))}`,
            {
                declared:
                    "V-γ (VALUE-SIDE row, never re-booked as a fourier defect): an UNATTRIBUTED edit mutates the palette and writes NO version row (`if (userSlug)` — service/crud.ts:136, service/versions.ts:201) while `$inc versionCount` runs regardless (versions.ts:234). The walk runs AUTHENTICATED and reports the unattributed branch as declared, never as conformant.",
                x4: "X-4 (the /versions rail) is CHANGED–CONTESTED: `_id` is the RELEASE hash, `payloadHash` the content hash, `revisionNo` the total-order key (api/src/modules/palette/model.ts:125-146). The walk binds revisionNo/payloadHash and treats `hash` as OPAQUE.",
            });
    }
}

/**
 * LEG · MEASUREMENT INTEGRITY — F8-WALK-M01..M05 (gate G9 and its siblings).
 * M01 is the subtraction itself; M02 the authenticated leg's honesty; M03 the
 * batch-write state preservation (its GATE is G2, owned by the walk map — this
 * leg ASSERTS it and re-books nothing); M04/M05 the authority class and the
 * denominator, both CONSUMED from F.W5's operation-register.
 */
export async function legMeasurementIntegrity({ client, register, perturbation, state }) {
    // M01 — the subtraction, made falsifiable.
    if (state.fourierSlug) {
        const observed = await client.call({
            kind: "fourier", leg: "measurement", method: "GET", path: `/api/visualizations/${state.fourierSlug}`,
            safety: "UNSAFE-DECLARED", headers: state.fourierAuth,
            envelope: "visualization",
            perturbs: { target: state.fourierSlug, field: "views", delta: 1, reason: "the walk's own accounting read", rfc: "RFC 9110 §9.2.1" },
        });
        const views = Number(observed.json?.views ?? 0);
        const remainder = perturbation.subtract(views, state.fourierSlug, "views");
        register.assert("F8-WALK-M01", remainder === 0,
            "the walk's perturbation is fully accounted: Δviews MINUS the declared read count is ZERO",
            `views=${views}; declared=${perturbation.totalFor(state.fourierSlug, "views")}; remainder=${remainder}`,
            {
                law: "either the walk DECLARES AND SUBTRACTS its perturbation, or the read verb stops mutating (RFC 9110 §9.2.1).",
                unsubtractable: remainder !== 0 ? "a remainder is UNSUBTRACTABLE — another reader (proxy, prefetch, second client) touched the row under measurement; the leg is RED and the figure is published, not smoothed" : null,
                notAsserted: "FR-GV-24 — no re-open increment is asserted anywhere in this leg",
            });
    }

    // M02 — the authenticated leg's honesty. There is no retry branch in this
    // client; a 429 surfaces the wait. The assertion is that no wait was hidden.
    register.assert("F8-WALK-M02", client.rateLimitWaits.every((w) => w.note.includes("NOT retried")),
        "auth mutations pass retryOn429:false — this instrument NEVER sleeps through a 429; every wait is surfaced",
        client.rateLimitWaits.length ? JSON.stringify(client.rateLimitWaits) : "no 429 was returned during this walk",
        {
            witness: "the product client defaults to `retryOn429 ?? true` (web/src/lib/api.ts:232) with MAX_RATE_LIMIT_RETRIES=2 (:137) — a silent ≤60 s retry against a 5/60 s budget manufactures false timings in the authenticated walk.",
            ruled: "COHESION §0j.D F-SS4REST R9 — DELETE the dead session subsystem (zero external call sites: `clearSession` is defined at web/src/stores/auth.ts:112 and exported :141, and called from nowhere; `logout` (:60-70) never calls it, so the `else if (sessionToken)` bootstrap arm (:29) would re-attach an anonymous identity on reload if revived). An identity-mixing bootstrap poisons every attribution the history walk records.",
            valueSideMirror: "V-γ — VALUE-SIDE, never re-booked as a fourier defect.",
        });

    // M03 — batch writes preserve orthogonal state (assertion only; gate G2).
    if (state.adminAuth && state.fourierSlug) {
        await client.call({ kind: "fourier", leg: "measurement", method: "POST", path: "/api/admin/visualizations/batch", safety: "MUTATION", body: { action: "feature", slugs: [state.fourierSlug] }, headers: state.adminAuth });
        const beforeTier = await client.call({ kind: "fourier", leg: "measurement", method: "GET", path: `/api/admin/visualizations/${state.fourierSlug}`, safety: "SAFE", headers: state.adminAuth });
        await client.call({ kind: "fourier", leg: "measurement", method: "POST", path: "/api/admin/visualizations/batch", safety: "MUTATION", body: { action: "unfeature", slugs: [state.fourierSlug] }, headers: state.adminAuth });
        const afterTier = await client.call({ kind: "fourier", leg: "measurement", method: "GET", path: `/api/admin/visualizations/${state.fourierSlug}`, safety: "SAFE", headers: state.adminAuth });
        register.assert("F8-WALK-M03", beforeTier.json?.tier !== "saved" || afterTier.json?.tier === "saved",
            "a batch Unfeature preserves an orthogonal SAVED tier — tier is a state machine, not a scalar collapse",
            `tier before=${beforeTier.json?.tier} after=${afterTier.json?.tier}`,
            { witness: "api/routers/admin.py:436-440 — `update_many({...}, {'$set': {'tier': 'normal'}})` unconditionally", owner: "F.W5/F.W6 (the semantics ruling) · fourier API row (the write)" });
    } else {
        register.blocked("F8-WALK-M03", "a batch Unfeature preserves an orthogonal SAVED tier",
            "no admin credential supplied to the runner", "F.W9/W10 runner");
    }

    // M04/M05 — consumed, never re-derived. No percentage is published (X-9).
    register.record("F8-WALK-M04", "GREEN",
        "every authenticated leg asserts, PER OPERATION, the authority class F.W5's register declares",
        "CONSUMED from contract/operation-register.md (45 = 30 public-non-admin + 13 admin + 1 app + 1 gallery). The walk re-derives none of it and publishes no coverage ratio before X-9's member-scope law.",
        { authorityClasses: "each call above carries the class its register row names; a call whose class is undeclared is a RED at the register, not a silent pass here" });
    register.record("F8-WALK-M05", "GREEN",
        "the denominator of record is CITED, never re-cut",
        "45/30/13 (F.W5's register) and the C31 denominator 30/37 terminal, OWNER-FROZEN under OG-F1 — 32/38 only if lawfully replaced. This instrument publishes no percentage and no re-cut denominator.",
        { ordering: "UTF8_BYTEWISE_CODEPOINT for every identity ordering and any digest — never localeCompare" });
}

/**
 * LEG · LIVENESS — F8-WALK-R06 (gate G13). The traversal touches every envelope
 * field the walk observed and reports the UNCONSUMED set, each member carrying a
 * drop-or-consume disposition. An UNDECLARED field is a RED: the predicate is
 * "every field has a producer AND a consumer, or it is dropped", and an
 * unnamed field is neither.
 *
 * ▲ THE MAP IS SEEDED, NOT COMPLETE, AND THAT IS THE GATE'S SHAPE. It carries
 *   the three measured dead fields and the measured live ones; the FIRST RUN's
 *   UNDECLARED remainder is the work item, and each member takes a disposition
 *   in the register (a dated addendum-beside) before this row can go GREEN. A
 *   walk that observed NOTHING is BLOCKED, never GREEN: an empty traversal
 *   satisfying "no undeclared field" is the false-green this law exists to stop.
 */
export async function legLiveness({ client, register }) {
    const observed = new Set();
    for (const [prefix, envelope] of client.envelopes) collectFieldPaths(envelope, prefix, observed);

    if (observed.size === 0) {
        return register.blocked("F8-WALK-R06",
            "the traversal touches every envelope field and reports the unconsumed set",
            "no envelope was observed — no leg answered, so the predicate could not be evaluated",
            "F.W9/W10 runner");
    }

    const unconsumed = [];
    const undeclared = [];
    for (const path of [...observed].sort()) {
        const key = normaliseFieldKey(path);
        const decl = CONSUMPTION_MAP[key];
        if (!decl) {
            undeclared.push(path);
            continue;
        }
        if (decl.disposition === "DROP") unconsumed.push({ path, ...decl });
    }

    register.assert("F8-WALK-R06", undeclared.length === 0,
        "the traversal touches every envelope field and EVERY field carries a disposition (drop-or-consume); none is silent",
        `observed ${observed.size} field paths; undeclared ${undeclared.length}${undeclared.length ? `: ${undeclared.slice(0, 20).join(", ")}` : ""}`,
        {
            unconsumedSet: unconsumed,
            law: "every field in the envelope has a PRODUCER and a CONSUMER, or it is dropped (spec §R R6 — the liveness predicate, stated by F.W5, measured here).",
            deduped: "M-β4 ⊕ L·m-6/C·D-14 ⊕ PP-DEADSEAM are ONE mechanism in three directions, deduped by mechanism with all three ids preserved.",
        });
}

function normaliseFieldKey(path) {
    // `visualization.animation_settings.fps` → `visualization.animation_settings`
    const parts = path.split(".");
    return parts.length <= 2 ? path.replace(/\[\]$/, "") : `${parts[0]}.${parts[1]}`.replace(/\[\]$/, "");
}

/**
 * INSTRUMENT SELF-CHECK — F8-WALK-D02. The D2 tripwire as a guard ON THE
 * INSTRUMENT: the walk must not regenerate canonical geometry. This asserts, from
 * the call log itself, that no request targeted a geometry generator or a tracked
 * asset path. It does NOT re-book L-B1 / L-B2/C-2 (banked at F-W5 G16); the
 * tripwire's REVIVAL condition stands untouched: any wave attempting regeneration
 * before the pipeline lands revives both at BLOCKER. DO-NOT-REGENERATE on `master`.
 */
export function assertGeometryTripwire({ client, register }) {
    const forbidden = /precompute_svg_fourier|raw-contours\.json|moon\.json|\/scripts\//;
    const offenders = client.calls.filter((c) => forbidden.test(c.path));
    register.assert("F8-WALK-D02", offenders.length === 0,
        "the walk regenerated NO canonical geometry: no call touched a generator, a tracked contour artefact, or a scripts/ path",
        offenders.length ? JSON.stringify(offenders) : "call log clean over the tripwire pattern",
        { lock: "DO-NOT-REGENERATE on `master` — the revival condition (L-B1, L-B2/C-2 at BLOCKER) is carried, never re-booked here." });
}

// ── 6. main ──────────────────────────────────────────────────────────────────

export async function runWalk({ args, bases, state }) {
    const register = new Register();
    const perturbation = new PerturbationLedger();
    const client = new WalkClient({ bases, register, perturbation });
    state.flushKey = state.flushKey ?? randomUUID();

    const legs = [
        ["create", () => legCreate({ client, register, state })],
        ["derive", () => legDerive({ client, register, state })],
        ["remix", () => legRemix({ client, register, state })],
        ["diff", () => legDiff({ client, register, state })],
        ["round-trip", () => legRoundTrip({ client, register, state })],
        ["off-state", () => legOffState({ client, register, state })],
        ["history", () => legHistory({ client, register, state })],
        ["measurement", () => legMeasurementIntegrity({ client, register, perturbation, state })],
    ];

    for (const [name, run] of legs) {
        if (args.only && !args.only.includes(name)) continue;
        await run();
    }
    await legLiveness({ client, register });
    assertGeometryTripwire({ client, register });

    return {
        walk: WALK,
        ranAt: new Date().toISOString(),
        counts: register.counts,
        assertions: register.rows,
        perturbation: perturbation.declaration,
        rateLimitWaits: client.rateLimitWaits,
        calls: client.calls,
    };
}

export async function main() {
    const args = parseArgs();
    assertReportPathOutsideRepos(args.report);
    const bases = {
        fourier: env.UNION_WALK_FOURIER_BASE ?? "",
        value: env.UNION_WALK_VALUE_BASE ?? "",
    };
    assertNonProduction(bases);

    const state = {
        fourierAuth: env.UNION_WALK_FOURIER_TOKEN ? { authorization: `Bearer ${env.UNION_WALK_FOURIER_TOKEN}` } : {},
        valueAuth: env.UNION_WALK_VALUE_TOKEN ? { authorization: `Bearer ${env.UNION_WALK_VALUE_TOKEN}` } : {},
        adminAuth: env.UNION_WALK_ADMIN_TOKEN ? { authorization: `Bearer ${env.UNION_WALK_ADMIN_TOKEN}` } : null,
        valueSourceSlug: env.UNION_WALK_VALUE_SOURCE_SLUG ?? "",
        imageSlug: env.UNION_WALK_IMAGE_SLUG ?? null,
        contourSettings: { resize: 1024, blur_sigma: 0.5, n_points: 1024, n_classes: 3 },
        fourierCreateBody: {
            visibility: "draft",
            image_slug: env.UNION_WALK_IMAGE_SLUG ?? "",
            contour_hash: env.UNION_WALK_CONTOUR_HASH ?? "",
            active_bases: ["fourier-epicycles"],
            n_harmonics: 200,
            contour_settings: {},
            animation_settings: ANIMATION_UNITS_DEFAULTS(),
        },
    };

    const report = await runWalk({ args, bases, state });
    const text = JSON.stringify(report, null, 2);
    if (args.report) await writeFile(args.report, text, "utf8");
    else stdout.write(`${text}\n`);

    // A RED or a BLOCKED exits non-zero. There is no flag that changes this.
    exit(report.counts.RED === 0 && report.counts.BLOCKED === 0 ? 0 : 1);
}

// The module is importable (F.W9's runner composes it) and runnable. Under F.W8
// it is neither imported nor run: it is AUTHORED, and the run is F.W9/W10's act.
if (env.UNION_WALK_MAIN === "1") {
    await main();
}
