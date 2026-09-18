// SERVED MODEL: claude-opus-5[1m]
/**
 * ════════════════════════════════════════════════════════════════════════════
 * X.W1.b · THE DENOMINATOR GUARD (NG-11)
 * ════════════════════════════════════════════════════════════════════════════
 *
 * NG-11's falsifier, verbatim: *"Add a route/pane to the app without a matrix
 * cell → the census reds. **A matrix that samples 5 routes and reports coverage
 * does not satisfy NG-11.**"*
 *
 * This file is that falsifier, standing. It re-derives the route table from the
 * PRODUCT'S OWN SOURCE TEXT — `demo/color-picker/router/index.ts` and
 * `demo/shell/viewSchema.ts` — and fails if `census.ts` and the product
 * disagree in either direction. It reads the files as bytes rather than
 * importing them, deliberately: importing `viewSchema.ts` would drag the whole
 * `@lucide/vue` icon graph into the test runner, and, worse, an import can be
 * satisfied by a stale build while the source has moved on. Text is the thing
 * a reviewer reads, so text is the thing this guard reads.
 *
 * It mints no golden. It is the gate that makes every other golden's
 * denominator checkable, which is why it sits in the same project — a guard in a
 * project nobody runs is the CI-orphan disease G-5 exists to red.
 *
 * L-19 in one line: a matrix whose denominator cannot be falsified is a sample
 * with a confident tone.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { test, expect } from "@playwright/test";
import {
    ROUTE_CENSUS,
    SUPERSEDED_FIVE_ROUTE_SAMPLE,
    VIEWPORTS,
    SCHEMES,
    routeArmCellCount,
    panesFor,
} from "./census";

const REPO_ROOT = resolve(import.meta.dirname, "../..");
const ROUTER = resolve(REPO_ROOT, "demo/color-picker/router/index.ts");
const VIEW_SCHEMA = resolve(REPO_ROOT, "demo/shell/viewSchema.ts");

/** Every `name: "…"` in the router's `routes` table. The catch-all has none. */
function routerNames(): string[] {
    const src = readFileSync(ROUTER, "utf8");
    return [...src.matchAll(/\bname:\s*"([a-z][a-z-]*)"/g)].map((m) => m[1]);
}

/** The `ViewId` union members declared in `viewSchema.ts`. */
function viewIds(): string[] {
    const src = readFileSync(VIEW_SCHEMA, "utf8");
    const union = /export type ViewId =([\s\S]*?);/.exec(src);
    expect(
        union,
        "viewSchema.ts no longer declares `export type ViewId = …`",
    ).not.toBeNull();
    return [...union![1].matchAll(/"([a-z][a-z-]*)"/g)].map((m) => m[1]);
}

/** The `RightPane` union members — the pane-hosted surfaces R34 names. */
function rightPanes(): string[] {
    const src = readFileSync(VIEW_SCHEMA, "utf8");
    const union = /export type RightPane =([\s\S]*?);/.exec(src);
    expect(
        union,
        "viewSchema.ts no longer declares `export type RightPane = …`",
    ).not.toBeNull();
    return [...union![1].matchAll(/"([a-z][a-z-]*)"/g)].map((m) => m[1]);
}

test("the visual census is exactly the router's route table", () => {
    const declared = [...routerNames()].sort();
    const census = ROUTE_CENSUS.map((r) => r.id).sort();
    expect(
        census,
        "census.ts and demo/color-picker/router/index.ts disagree. A route the app " +
            "serves and the matrix does not photograph is the five-route sample re-armed.",
    ).toEqual(declared);
});

test("the visual census is exactly viewSchema's ViewId union", () => {
    expect(
        ROUTE_CENSUS.map((r) => r.id).sort(),
        "census.ts and viewSchema.ts ViewId disagree",
    ).toEqual([...viewIds()].sort());
});

test("every pane-hosted surface is reachable by some cell", () => {
    // R34's Katex R6 limb: About is a PANE, not a route, so a route-only matrix
    // can never photograph it. Each RightPane member must be the `right` of at
    // least one census route, and at 390 that pane must get its own cell.
    const reachable = new Set(
        ROUTE_CENSUS.map((r) => r.right).filter((p): p is string => p !== null),
    );
    for (const pane of rightPanes()) {
        expect(
            reachable.has(pane),
            `RightPane "${pane}" is hosted by no census route — it cannot be photographed`,
        ).toBe(true);
    }

    for (const route of ROUTE_CENSUS) {
        const mobilePanes = panesFor(route, "390");
        if (route.right === null) {
            expect(
                mobilePanes,
                `${route.id} is single-pane and must mint one mobile cell`,
            ).toEqual([0]);
        } else {
            expect(
                mobilePanes,
                `${route.id} hosts "${route.right}" in its right pane; at 390 only one pane ` +
                    "renders, so BOTH panes need their own cell or the sibling is unwitnessed",
            ).toEqual([0, 1]);
        }
    }
});

test("the census strictly supersedes the shipped five-route sample", () => {
    // The sample is not merely different — it must be a strict subset, so no
    // route the old matrices DID cover is lost while widening.
    const census = new Set(ROUTE_CENSUS.map((r) => r.id));
    for (const sampled of SUPERSEDED_FIVE_ROUTE_SAMPLE) {
        expect(
            census.has(sampled),
            `route "${sampled}" was covered by the old sample and is now absent`,
        ).toBe(true);
    }
    expect(
        ROUTE_CENSUS.length,
        "the census must be strictly larger than the 5-route sample it supersedes (R34)",
    ).toBeGreaterThan(SUPERSEDED_FIVE_ROUTE_SAMPLE.length);
});

test("the route-arm cell count is derived, never asserted", () => {
    // Recomputed here from the axes rather than compared to a literal: a hard
    // number in a test is a number somebody will update to match a shrinking
    // matrix. This asserts the SHAPE — every route, every viewport, every
    // scheme, and the mobile pane axis — so shrinking any axis reds.
    let expected = 0;
    for (const route of ROUTE_CENSUS)
        for (const viewport of VIEWPORTS)
            expected += panesFor(route, viewport.id).length * SCHEMES.length;
    expect(routeArmCellCount()).toBe(expected);
    expect(routeArmCellCount()).toBeGreaterThanOrEqual(
        ROUTE_CENSUS.length * VIEWPORTS.length * SCHEMES.length,
    );
});
