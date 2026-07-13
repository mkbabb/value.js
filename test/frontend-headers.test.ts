import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// ─────────────────────────────────────────────────────────────────────────────
// U.W-SEC · G-SEC-4 (U-F39 `frontend-missing-security-headers`) — born-RED
// repo-artefact gate.
//
// The Cloudflare-Pages demo origin (color.babb.dev) served HTML with only
// `x-content-type-options` — no CSP/HSTS/X-Frame-Options — while the api origin
// (api.color.babb.dev, `api/apache-vhost.conf:52-59`) already sets a full suite.
// The idiomatic CF-Pages primitive for the gap is a `public/_headers` file (the
// build root copies `public/`, so a `_headers` there is the honored locus).
//
// This gate is the REPO ARTEFACT: it asserts `demo/color-picker/public/_headers`
// EXISTS and declares the three named transport/policy headers (CSP + HSTS +
// X-Frame-Options), with a CSP that is DERIVED from the demo's real resource
// graph (self + the api origin for the palette fetch), NOT a copy of the api's
// `default-src 'none'` (which would break the app).
//
// Born-RED today (no `_headers` file). It flips GREEN when the file lands.
//
// The LIVE confirmation — a GET to color.babb.dev showing the headers on the
// wire — is DEPLOY-DEPENDENT and is NOT asserted here: it is owner-attested at
// deploy and BOOKED to U.W-CLOSE / U-F61 (never a headless false-green).
//
// Modelled on the fs-artefact tests `test/dts-published-surface.test.ts` /
// `test/docs-source-snippets.test.ts` (readFileSync/existsSync against a tracked
// repo file). vitest runs from the repository root (the vitest.config home).
// ─────────────────────────────────────────────────────────────────────────────

const repoRoot = process.cwd();
const headersPath = path.resolve(
    repoRoot,
    "demo/color-picker/public/_headers",
);

describe("U-F39 · frontend CF-Pages security-header suite (G-SEC-4)", () => {
    it("the `demo/color-picker/public/_headers` artefact exists", () => {
        expect(
            existsSync(headersPath),
            "demo/color-picker/public/_headers must exist — the honored CF-Pages locus",
        ).toBe(true);
    });

    describe("declares the frontend suite at api-origin parity", () => {
        // Read lazily inside the block so the missing-file case fails on the
        // existence assertion above with a clean message (not an ENOENT throw).
        const text = existsSync(headersPath)
            ? readFileSync(headersPath, "utf8")
            : "";

        it("declares Content-Security-Policy (the three named headers · 1/3)", () => {
            expect(text).toMatch(/^\s*Content-Security-Policy:/im);
        });

        it("declares Strict-Transport-Security / HSTS (2/3)", () => {
            expect(text).toMatch(/^\s*Strict-Transport-Security:/im);
        });

        it("declares X-Frame-Options (3/3)", () => {
            expect(text).toMatch(/^\s*X-Frame-Options:/im);
        });

        it("HSTS mirrors the api referent (max-age=63072000; includeSubDomains)", () => {
            expect(text).toMatch(
                /Strict-Transport-Security:\s*max-age=63072000;\s*includeSubDomains/i,
            );
        });

        it("X-Frame-Options denies framing (api-origin parity: DENY)", () => {
            expect(text).toMatch(/X-Frame-Options:\s*DENY/i);
        });

        it("the CSP is DERIVED, not the api's `default-src 'none'` copy", () => {
            // The api endpoint serves `default-src 'none'` — correct for a JSON
            // origin, fatal for the demo. The frontend CSP directive must NOT
            // carry it. Scope to the Content-Security-Policy header VALUE (the
            // explanatory `#` comment above cites the api's directive for
            // contrast — the whole-file text is not the assertion subject).
            const csp = /Content-Security-Policy:\s*(.+)/i.exec(text)?.[1] ?? "";
            expect(csp).not.toMatch(/default-src\s+'none'/i);
        });

        it("the CSP wires the real resource graph: self + the api origin in connect-src", () => {
            // The palette fetch targets https://api.color.babb.dev (client.ts:36).
            // The CSP must permit it, or every palette request is CSP-blocked.
            const csp = /Content-Security-Policy:\s*(.+)/i.exec(text)?.[1] ?? "";
            expect(csp).toMatch(/connect-src[^;]*'self'/i);
            expect(csp).toMatch(
                /connect-src[^;]*https:\/\/api\.color\.babb\.dev/i,
            );
        });

        it("the CSP refuses framing (frame-ancestors 'none' — X-Frame-Options parity)", () => {
            expect(text).toMatch(/frame-ancestors\s+'none'/i);
        });

        it("uses the CF-Pages `_headers` syntax (a `/*` path block)", () => {
            expect(text).toMatch(/^\/\*/m);
        });
    });
});
