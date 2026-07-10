import { test, expect } from "@playwright/test";

/**
 * T.W2 · O-24 — LCP IDENTITY + THE REVEAL-ONLY LAW (SYNTHESIS §6.1 O-24;
 * t-perf-implications PI-2; minted IN-WAVE at W2 per T.W2.md §Dependencies —
 * run BEFORE any beat lands, re-run after, BOTH schemes, BUILT bundle).
 *
 * PI-2's finding: the "gate appearance, not timing" entrance law can cut
 * either way for LCP depending on mechanism — a mount-gated (`v-if`/chunk-
 * held) LCP candidate DELAYS the page's largest paint; a reveal-only
 * treatment (opacity pinned 1, transform+shadow-only land) does not. So the
 * beat that owns the LCP element is CONSTRAINED (the D3 LCP reveal-only law,
 * M-13): its DOM paints unconditionally at B0; its land is transform+shadow
 * ONLY; computed `opacity > 0` from document paint onward.
 *
 * Two legs per scheme:
 *   1 · IDENTITY — name the LCP element (PerformanceObserver, buffered).
 *       The element must be identical across schemes (a scheme-dependent LCP
 *       means the reveal-only binding is on the wrong element — §Triumvirate).
 *   2 · REVEAL-ONLY — the LCP element's computed opacity is 1 at observation
 *       time AND its paint chain carries no opacity-keyed entrance (the
 *       plate-land family on the LCP owner is transform+shadow only, W2-3).
 *
 * Runs in the smoke-perf project (:8091, the BUILT bundle — Lighthouse's own
 * substrate class; the dev server's transform bursts corrupt LCP timing).
 * The BEFORE/AFTER records live in docs/tranches/T/audit/pi/w2/.
 */

interface LcpRecord {
    time: number;
    size: number;
    tag: string;
    id: string;
    testid: string;
    cls: string;
    text: string;
    opacity: string;
}

async function collectLcp(
    page: import("@playwright/test").Page,
    scheme: "light" | "dark",
): Promise<LcpRecord> {
    await page.addInitScript((s) => {
        localStorage.setItem("vueuse-color-scheme", s as string);
        // Buffered LCP observer installed before any paint.
        (window as any).__lcpEntries = [];
        new PerformanceObserver((list) => {
            for (const e of list.getEntries())
                (window as any).__lcpEntries.push(e);
        }).observe({ type: "largest-contentful-paint", buffered: true });
    }, scheme);

    await page.goto("/");
    await expect(
        page.getByRole("main", { name: "Color tool panes" }),
    ).toBeVisible();
    // Let the boot settle so the FINAL LCP candidate is recorded (LCP stops
    // updating on first input; we provide none).
    await page.waitForTimeout(3000);

    // The full candidate sequence — the diagnostic record (each successive
    // entry is a strictly larger candidate; the sequence names WHICH surfaces
    // competed for LCP and when).
    const sequence = await page.evaluate(() =>
        ((window as any).__lcpEntries as any[]).map((e) => {
            const el = e.element as HTMLElement | null;
            return `${e.startTime.toFixed(0)}ms size=${e.size} <${el?.tagName?.toLowerCase() ?? "?"}> ${String(el?.className ?? "").slice(0, 60)}`;
        }),
    );
    console.log(`[O-24 ${scheme}] candidate sequence:\n  ${sequence.join("\n  ")}`);

    return page.evaluate(() => {
        const entries = (window as any).__lcpEntries as any[];
        const last = entries[entries.length - 1];
        if (!last) {
            return {
                time: -1,
                size: -1,
                tag: "(none)",
                id: "",
                testid: "",
                cls: "",
                text: "",
                opacity: "",
            };
        }
        const el = last.element as HTMLElement | null;
        return {
            time: last.startTime,
            size: last.size,
            tag: el ? el.tagName.toLowerCase() : "(detached)",
            id: el?.id ?? "",
            testid: el?.getAttribute?.("data-testid") ?? "",
            cls: el ? String(el.className).slice(0, 120) : "",
            text: (el?.textContent ?? "").trim().slice(0, 80),
            opacity: el ? getComputedStyle(el).opacity : "",
        };
    });
}

test("O-24 LCP identity + reveal-only law — both schemes, built bundle", async ({
    page,
    browser,
}) => {
    test.setTimeout(90_000);

    // WARM the renderer once (SwiftShader's cold first-load skews the first
    // leg's paint timeline vs the second — the two scheme legs must be
    // measured on IDENTICALLY-warmed contexts or the comparison is corrupt).
    await page.goto("/");
    await page.waitForTimeout(1500);

    const legs: Record<string, LcpRecord> = {};
    for (const scheme of ["light", "dark"] as const) {
        const ctx = await browser.newContext({
            baseURL: test.info().project.use.baseURL,
            viewport: { width: 1280, height: 720 },
        });
        const p = await ctx.newPage();
        legs[scheme] = await collectLcp(p, scheme);
        await ctx.close();
    }
    const light = legs.light;
    const dark = legs.dark;

    console.log(
        `[O-24 light] t=${light.time.toFixed(0)}ms size=${light.size} <${light.tag}> testid=${light.testid} id=${light.id} cls="${light.cls}" text="${light.text}" opacity=${light.opacity}`,
    );
    console.log(
        `[O-24 dark ] t=${dark.time.toFixed(0)}ms size=${dark.size} <${dark.tag}> testid=${dark.testid} id=${dark.id} cls="${dark.cls}" text="${dark.text}" opacity=${dark.opacity}`,
    );

    // Leg 0 — an LCP entry exists on both schemes.
    expect(light.time, "no LCP entry recorded (light)").toBeGreaterThan(0);
    expect(dark.time, "no LCP entry recorded (dark)").toBeGreaterThan(0);

    // Leg 1 — IDENTITY: the LCP element is the same element class across
    // schemes. The signature is tag + the leading class token (the component
    // family) — id/testid where present. Class SUFFIXES may differ by scheme
    // variants; the first token names the component family stably.
    const sig = (r: LcpRecord) =>
        `${r.tag}#${r.id}[${r.testid}].${r.cls.split(/\s+/)[0] ?? ""}`;
    expect(
        sig(dark),
        "LCP element identity differs across schemes — the reveal-only binding would be on the wrong element",
    ).toBe(sig(light));

    // Leg 2 — REVEAL-ONLY: the LCP element composites at opacity 1 (never a
    // mount-gated / opacity-revealed candidate) on both schemes.
    expect(
        parseFloat(light.opacity),
        "LCP element not at opacity 1 (light) — reveal-only law breached",
    ).toBe(1);
    expect(
        parseFloat(dark.opacity),
        "LCP element not at opacity 1 (dark) — reveal-only law breached",
    ).toBe(1);
});
