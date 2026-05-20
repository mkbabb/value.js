/**
 * E.W3 Lane C — env-noise console-error filter (shared fixture).
 *
 * Consolidates the inline filter authored at D.W5 Lane A
 * (`page-load.spec.ts`) that 8 smoke specs duplicated verbatim
 * (~80 LoC of copy-paste; see `E-AUDIT-6 §10 + AUD-6.3`).
 *
 * **What this filters**: HTTP 4xx/5xx surfacing as console errors when
 * the demo's shared production palette API is hit under parallel-worker
 * load — the live server's rate limiter throws 429/503/504, which the
 * browser logs as "Failed to load resource: …". These are network
 * conditions, NOT value.js code paths, and would otherwise flake the
 * `expect(consoleErrors).toEqual([])` invariant the specs assert.
 *
 * **Scope (binding)**: only the specs that exercise the production API
 * surface (top-level + views/*). The mobile spec uses a narrower variant
 * (4xx/5xx HTTP-code-only) and the admin specs use `page.route` mocks so
 * they never hit the live API — neither needs this helper, per the
 * E.W3 Lane C hard cap (do not force-collapse semantic differences).
 *
 * **API**: `setupEnvNoise(page)` installs the filter on `console` +
 * `pageerror` and returns the captured-error array. The caller asserts
 * `expect(errors).toEqual([])` at end of test.
 */
import type { Page, ConsoleMessage } from "@playwright/test";

/**
 * Canonical env-noise pattern (from D.W5 Lane A, `page-load.spec.ts`).
 *
 * Matches:
 * - HTTP 429 (Too Many Requests), 503 (Service Unavailable), 504 (Gateway Timeout)
 *   as standalone word-boundary numbers in the console-error string.
 * - The literal "Too Many Requests" phrase (some browsers log the reason).
 * - The "Failed to load resource" prefix the browser emits for any sub-resource
 *   load failure (the umbrella category — covers the cases above and CORS/network
 *   timeouts that originate at the live API surface).
 *
 * Case-insensitive to absorb browser-vendor casing differences.
 */
const ENV_NOISE_REGEX = /\b(429|503|504)\b|Too Many Requests|Failed to load resource/i;

const isEnvNoise = (text: string): boolean => ENV_NOISE_REGEX.test(text);

/**
 * Install the env-noise filter on `page`'s `console` + `pageerror` events.
 *
 * Returns the captured-error array. Mutates over the lifetime of the test;
 * the caller asserts emptiness in the final `expect` (typically the last
 * statement of the test body, matching the D.W5 Lane A convention).
 */
export function setupEnvNoise(page: Page): string[] {
    const consoleErrors: string[] = [];
    page.on("console", (msg: ConsoleMessage) => {
        if (msg.type() === "error" && !isEnvNoise(msg.text()))
            consoleErrors.push(msg.text());
    });
    page.on("pageerror", (err: Error) => {
        if (!isEnvNoise(err.message)) consoleErrors.push(err.message);
    });
    return consoleErrors;
}
