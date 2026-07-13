/**
 * G-SEC-2 (U-F37 · db-trust-boundary) — the DB config must tell the truth.
 *
 * A pure static-artefact parse (no MongoDB, no network): reads the three
 * config files off disk and asserts two config-truth invariants.
 *
 * (a) CONFIG-TRUTH — no `.env.example` `MONGO_*` var may go unreferenced by
 *     `compose.yaml`. Either every declared `MONGO_*` var is wired into the
 *     compose (a real credential), OR zero `MONGO_*` vars are declared. The
 *     forbidden middle — advertising creds the compose never consumes — is the
 *     config-truth lie (registry §12/§15/§19: `.env.example` advertised 4
 *     `MONGO_ROOT_*`/`MONGO_*` vars `compose.yaml` never wires).
 *
 * (b) MONGO-DISCIPLINE DIVERGENCE — the prod compose diverges from the precept
 *     `docs/precepts/infra/domains.md §The Mongo discipline` (SCRAM-SHA-256 +
 *     restricted bind, "Never 0.0.0.0"). That divergence must be honest: either
 *     SCRAM is WIRED (compose carries `--auth`/`--keyFile` AND `MONGODB_URI`
 *     carries credentials) OR a WRITTEN justified-residual exists in
 *     `api/CLAUDE.md` (the bounded internal-bridge posture recorded as an
 *     explicit documented divergence — never a silent divergence + false
 *     `.env.example` comment).
 *
 * BORN-RED (E-3): authored to FAIL against the pre-cure tree (4 unwired
 * `MONGO_*` vars; no SCRAM; no residual). Flips GREEN at the U-F37 cure —
 * delete the unwired vars + the false comment, write the residual (path b, the
 * prod-safe repo-side election; SCRAM-wire remains the owner's deploy-time call
 * per U.W-SEC §BOOKS).
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const read = (rel: string): string =>
    readFileSync(fileURLToPath(new URL(rel, import.meta.url)), "utf8");

const ENV_EXAMPLE = read("../.env.example");
const COMPOSE = read("../compose.yaml");
const API_CLAUDE = read("../CLAUDE.md");

/** The stable marker the U-F37 residual section writes into `api/CLAUDE.md`. */
const RESIDUAL_MARKER = "Mongo-discipline justified-residual (U-F37)";

/** Parse `.env.example` for declared keys matching /^MONGO_/ (skip comments). */
function declaredMongoVars(env: string): string[] {
    const keys: string[] = [];
    for (const raw of env.split(/\r?\n/)) {
        const line = raw.trim();
        if (line === "" || line.startsWith("#")) continue;
        const key = /^(MONGO_[A-Z0-9_]+)\s*=/.exec(line)?.[1];
        if (key) keys.push(key);
    }
    return keys;
}

describe("G-SEC-2 · U-F37 · DB config tells the truth", () => {
    it("(a) config-truth: every declared MONGO_* var is wired by compose.yaml, or none is declared", () => {
        const declared = declaredMongoVars(ENV_EXAMPLE);
        // A var is "wired" iff compose.yaml references its name (as ${VAR} or
        // an environment key). Unreferenced declared creds are the lie.
        const unreferenced = declared.filter((key) => !COMPOSE.includes(key));
        expect(unreferenced).toEqual([]);
    });

    it("(b) mongo-discipline divergence is honest: SCRAM wired OR a written justified-residual", () => {
        // SCRAM wired: compose runs mongod with --auth/--keyFile AND MONGODB_URI
        // carries credentials (mongodb://user:pass@host).
        const scramFlag = /--auth\b|--keyFile\b/.test(COMPOSE);
        const uriHasCreds = /mongodb:\/\/[^@\s/]+:[^@\s/]+@/.test(COMPOSE);
        const scramWired = scramFlag && uriHasCreds;

        // OR: the justified-residual is written into api/CLAUDE.md.
        const residualWritten = API_CLAUDE.includes(RESIDUAL_MARKER);

        expect(scramWired || residualWritten).toBe(true);
    });
});
