/**
 * G-SEC-5 (U-F67 · api-hono-advisory) — the api runtime carries no reachable
 * hono advisory.
 *
 * A pure static-artefact parse (no MongoDB, no network, no `npm audit` shell-
 * out): reads `api/package-lock.json` off disk, extracts the RESOLVED `hono`
 * version, and asserts it is at or above the patched security floor. This is
 * the deterministic, network-free form of the gate (the registry-preferred
 * idiom over shelling out to `npm audit --omit=dev --json`, which needs the
 * advisory DB and a network round-trip).
 *
 * THE REACHABLE ADVISORY (registry §17 · U.W-SEC §Scope Cluster 4): the api
 * mounts `app.use("*", bodyLimit({ maxSize: 64 * 1024 }))` (`src/app.ts:54`,
 * `hono/body-limit` imported at `src/app.ts:12`) — the exact surface of the
 * bodyLimit-bypass class:
 *   - GHSA-9vqf-7f2p-gf9v — bodyLimit() bypass for chunked / unknown-length
 *     requests — LIVE-REACHABLE on this generic `@hono/node-server` app,
 *     first patched in hono 4.12.16.
 * The other bodyLimit advisory (GHSA-rv63-4mwf-qqc2 — AWS Lambda understating
 * Content-Length) is UNREACHABLE (no Lambda adapter; this is node-server), as
 * are the serveStatic / toSSG / hono-cors CVEs (none of those surfaces in use).
 *
 * THE FLOOR — 4.12.25: `npm audit --omit=dev` reports the aggregate hono
 * advisory range as `<=4.12.24`, so 4.12.25 is the version at which the api's
 * production dependency surface reports ZERO hono advisories. That floor
 * necessarily clears the reachable bodyLimit-bypass (fixed earlier, at
 * 4.12.16). Pinning the gate to the audit-clean floor (rather than only the
 * one reachable fix) ties this deterministic version check to the §Goal
 * criterion's `npm audit --omit=dev` clean state.
 *
 * IN-RANGE (E-3 — bump in range, don't pin around): the caret `^4.7.0`
 * (`package.json:18`) already admits 4.12.x; the floor and the resolved bump
 * both stay `< 5.0.0` (no major cut, no API change — every 4.12.x is patch).
 *
 * BORN-RED: authored to FAIL against the pre-cure tree (lock resolved
 * `hono@4.12.2` < 4.12.25). Flips GREEN at the U-F67 cure — the in-range bump
 * to the patched hono + lock refresh.
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

/** The patched security floor: the version at which `npm audit --omit=dev`
 *  reports zero hono advisories (aggregate range `<=4.12.24`). Necessarily
 *  clears the reachable bodyLimit-bypass GHSA-9vqf-7f2p-gf9v (fixed 4.12.16). */
const HONO_PATCHED_FLOOR = "4.12.25";

/** Parse a plain `major.minor.patch` release string into a numeric tuple. The
 *  hono lock entries are always plain releases (no prerelease/build metadata),
 *  so a three-field split is exact and dependency-free. */
function parseVersion(v: string): [number, number, number] {
    const parts = v.split(".");
    if (parts.length !== 3) {
        throw new Error(`unexpected hono version shape: ${v}`);
    }
    const nums = parts.map((p) => {
        const n = Number(p);
        if (!Number.isInteger(n) || n < 0) {
            throw new Error(`non-numeric hono version segment in ${v}: ${p}`);
        }
        return n;
    });
    return [nums[0]!, nums[1]!, nums[2]!];
}

/** `a >= b` on `major.minor.patch` tuples (semver precedence, releases only). */
function gte(a: string, b: string): boolean {
    const av = parseVersion(a);
    const bv = parseVersion(b);
    for (let i = 0; i < 3; i++) {
        if (av[i]! > bv[i]!) return true;
        if (av[i]! < bv[i]!) return false;
    }
    return true;
}

const lockPath = fileURLToPath(new URL("../package-lock.json", import.meta.url));

interface LockEntry {
    version?: string;
}
interface Lock {
    packages?: Record<string, LockEntry>;
}

function resolvedHonoVersion(): string {
    const lock = JSON.parse(readFileSync(lockPath, "utf8")) as Lock;
    const entry = lock.packages?.["node_modules/hono"];
    if (!entry?.version) {
        throw new Error(
            "package-lock.json has no node_modules/hono entry — cannot verify the advisory floor",
        );
    }
    return entry.version;
}

describe("G-SEC-5 · U-F67 — hono runtime carries no reachable advisory", () => {
    it("resolves hono at or above the patched security floor (bodyLimit-bypass class cleared)", () => {
        const resolved = resolvedHonoVersion();

        // The tuple comparator is total on release strings; guards the parse.
        expect(parseVersion(resolved)).toHaveLength(3);

        expect(
            gte(resolved, HONO_PATCHED_FLOOR),
            `resolved hono@${resolved} is below the patched floor ${HONO_PATCHED_FLOOR} ` +
                `— the reachable bodyLimit-bypass (GHSA-9vqf-7f2p-gf9v, mounted at src/app.ts:54) ` +
                `is LIVE; bump hono in-range (< 5.0.0) and refresh package-lock.json`,
        ).toBe(true);
    });

    it("keeps the bump in-range (< 5.0.0 — no major cut)", () => {
        const [major] = parseVersion(resolvedHonoVersion());
        expect(major).toBe(4);
    });
});
