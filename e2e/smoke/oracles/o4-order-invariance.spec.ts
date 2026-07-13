import { test, expect } from "@playwright/test";

/**
 * T.W0 W0-5 · O-4 — ORDER-INVARIANCE (SYNTHESIS §6.1 O-4; §3 T.W2-3 gate).
 * ARMED AT W2-3 (the overture landed the beat surface this oracle reserves).
 *
 * The overture's beat marks must hold ORDER under a 6× CPU throttle — the
 * order is GATED (each beat opens on a named predicate), so throttling may
 * stretch the clock but can never reshuffle the beats. The named DAG
 * (D3 [M-10]):
 *
 *     B0 < B1 < {B2, B3} < B4   ∧   B2-start < B4-start
 *
 * B2 and B3 are MUTUALLY UNORDERED by design (the instrument never waits on
 * the GPU; the field never waits on the left plate). The marks:
 *   overture:b0 — index.html boot script (the ground)
 *   overture:b1 — App mount (hydration-committed ∧ mount)
 *   overture:b2 — field derive-in start (isArmed ∧ dock-plate-landed)
 *   overture:b3 — instrument (left-plate-landed)
 *   overture:b4 — ornament emerge (B3-complete ∧ B2-started ∧ chunk)
 *
 * PRM-OFF leg (§Hard-gate 5b: this is the choreography leg; the PRM-ON
 * instant-states leg rides the O-3 headed annex).
 */

async function collectMarks(
    page: import("@playwright/test").Page,
): Promise<Record<string, number>> {
    return page.evaluate(() =>
        Object.fromEntries(
            performance
                .getEntriesByType("mark")
                .filter((m) => m.name.startsWith("overture:"))
                .map((m) => [m.name, m.startTime]),
        ),
    );
}

for (const throttle of [1, 6]) {
    test(`O-4 order-invariance — beat marks hold the DAG order at ${throttle}× CPU`, async ({
        page,
    }) => {
        test.setTimeout(60_000);
        const cdp = await page.context().newCDPSession(page);
        await cdp.send("Emulation.setCPUThrottlingRate", { rate: throttle });

        await page.goto("/");
        await expect(
            page.getByRole("main", { name: "Color tool panes" }),
        ).toBeVisible();

        // Wait for the FULL overture (B4 = the ornament's emerge) — gated
        // polling on the mark's existence, never a fixed sleep.
        await expect
            .poll(async () => Object.keys(await collectMarks(page)).length, {
                timeout: 30_000,
            })
            .toBeGreaterThanOrEqual(5);

        const marks = await collectMarks(page);
        console.log(
            `[O-4 ${throttle}×] ${Object.entries(marks)
                .sort((a, b) => a[1] - b[1])
                .map(([n, t]) => `${n.slice(9)}@${t.toFixed(0)}ms`)
                .join(" → ")}`,
        );

        for (const name of ["b0", "b1", "b2", "b3", "b4"]) {
            expect(
                marks[`overture:${name}`],
                `beat mark overture:${name} missing`,
            ).toBeDefined();
        }
        const b0 = marks["overture:b0"]!;
        const b1 = marks["overture:b1"]!;
        const b2 = marks["overture:b2"]!;
        const b3 = marks["overture:b3"]!;
        const b4 = marks["overture:b4"]!;

        // THE DAG: B0 < B1 < {B2, B3} < B4 ∧ B2-start < B4-start.
        expect(b0, "B0 must precede B1").toBeLessThan(b1);
        expect(b1, "B1 must precede B2").toBeLessThan(b2);
        expect(b1, "B1 must precede B3").toBeLessThan(b3);
        expect(b2, "B2 must precede B4").toBeLessThan(b4);
        expect(b3, "B3 must precede B4").toBeLessThan(b4);
        // (B2 vs B3: mutually unordered by design — deliberately unasserted.)
    });
}
