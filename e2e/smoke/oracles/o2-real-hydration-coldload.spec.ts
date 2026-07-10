import { test, expect } from "@playwright/test";
import {
    instrumentWebglDraws,
    canvasPresents,
    ATMOSPHERE_TESTID,
} from "../fixtures/webgl-appearance";
import { cssColorToHex } from "../fixtures/frame-diff";

/**
 * T.W0 W0-5 · O-2 — REAL-HYDRATION COLD-LOAD (SYNTHESIS §6.1 O-2).
 *
 * The S-era `atmosphere-cold-load.spec.ts` seeds the session with
 * `addInitScript` — it asserts the DERIVE, but MASKS the natural
 * `restoreFromStorage`/`useColorUrl` hydration ordering (an injected pre-mount
 * localStorage is not the path a returning user drives; T-1's out-of-sync
 * arrival lives in exactly that ordering). O-2 drives the REAL path: a first
 * visit persists through the APP's own write-through, then a bare reload
 * restores from that persisted state with NO injected seed.
 *
 * ── ARMED AT W2-1 (the ordering law): beyond the settled restore, the spec
 *    now asserts the WRITER ORDER — an init-script MutationObserver records
 *    every value `--saved-bg` ever carries across the returning boot, and the
 *    sequence must contain ONLY the persisted material. Under the pre-W2-1
 *    tree the atmosphere's immediate watches derived from the DEFAULT-seeded
 *    frame ref before hydration ran, double-writing persisted → default →
 *    persisted (t-aurora-boot F-3, the latent flash) — that intermediate
 *    default write REDS this leg. Hydration-before-derivation kills it
 *    structurally (boot/hydrate + the useAtmosphere writer-order fix).
 */

const SEED = "oklch(0.7 0.18 145)"; // vivid green, hue ≈ 145°

// Registered `<color>` tokens compute to `rgb(…)` — normalize to hex.
async function savedBg(page: import("@playwright/test").Page): Promise<string> {
    const raw = await page.evaluate(() =>
        getComputedStyle(document.documentElement)
            .getPropertyValue("--saved-bg")
            .trim(),
    );
    return cssColorToHex(raw) ?? raw;
}

test("O-2 real-hydration — a returning-user bare reload restores the derived field via the natural path", async ({
    page,
}) => {
    test.setTimeout(30_000);
    await instrumentWebglDraws(page);

    // ── FIRST VISIT at the seed URL — the app derives + persists through its OWN
    //    write-through (no addInitScript seed; this IS the natural write path).
    await page.goto("/#/?space=oklch&color=" + encodeURIComponent(SEED));
    await expect(
        page.getByRole("main", { name: "Color tool panes" }),
    ).toBeVisible();
    // Wait for BOTH debounced write-throughs to land: the boot GROUND record
    // (color-picker-ground — the atmosphere sink's W2-2 {stops,scheme,
    // deriveVersion} shape) AND the color store (color-picker.inputColor —
    // the seed hydration restores from). A real returning user comes back
    // long after both writes; navigating between them fabricates a
    // half-persisted session no user ever has.
    const groundBase = () =>
        page.evaluate(() => {
            try {
                const rec = JSON.parse(
                    localStorage.getItem("color-picker-ground") ?? "null",
                ) as { stops?: string[] } | null;
                return rec?.stops?.[0] ?? null;
            } catch {
                return null;
            }
        });
    await expect.poll(groundBase, { timeout: 8000 }).toMatch(/^#[0-9a-f]{6}$/i);
    await expect
        .poll(
            () =>
                page.evaluate(() => {
                    try {
                        const raw = localStorage.getItem("color-picker");
                        if (!raw) return "";
                        return String(
                            (JSON.parse(raw) as { inputColor?: string })
                                .inputColor ?? "",
                        );
                    } catch {
                        return "";
                    }
                }),
            { timeout: 8000 },
        )
        .toContain("145"); // the seed's hue landed in the persisted projection
    const persisted = await groundBase();

    // ── RETURNING-USER COLD LOAD: reload at the BARE root (no URL colour) so the
    //    ONLY source is the persisted localStorage — the real restoreFromStorage
    //    path, never an injected pre-mount seed. The W2-1 writer-order observer
    //    rides in via addInitScript (runs before any page script): it records
    //    EVERY value `--saved-bg` carries, so an intermediate default-material
    //    write (the F-3 flash class) is caught even though no frame paints it.
    await page.addInitScript(() => {
        const w = window as unknown as { __savedBgTrace: string[] };
        w.__savedBgTrace = [];
        const push = () => {
            const v = document.documentElement?.style
                .getPropertyValue("--saved-bg")
                .trim();
            const trace = w.__savedBgTrace;
            if (v && trace[trace.length - 1] !== v) trace.push(v);
        };
        // Observe the DOCUMENT node with subtree — documentElement does not
        // exist yet at init-script time (observing it directly throws and the
        // init script dies silently = a vacuous trace, the PP-15 class).
        new MutationObserver(push).observe(document, {
            attributes: true,
            attributeFilter: ["style"],
            subtree: true,
        });
        document.addEventListener("DOMContentLoaded", push);
    });
    await page.goto("/");
    await expect(
        page.getByRole("main", { name: "Color tool panes" }),
    ).toBeVisible();

    // The boot material settles on the SAME persisted derived stop (a hex, never
    // a raw session string) — hydration drove the derived field, not a default.
    await expect.poll(() => savedBg(page), { timeout: 8000 }).toMatch(/^#[0-9a-f]{6}$/i);
    const restored = await savedBg(page);
    console.log(`[O-2] persisted=${persisted} restored --saved-bg=${restored}`);
    expect(restored, "returning-user reload restores the persisted derived stop").toBe(
        persisted,
    );

    // ── ARMED AT W2-1 — THE WRITER-ORDER LEG: across the whole returning boot,
    //    `--saved-bg` must never have carried anything but the persisted
    //    material (hydration precedes derivation; the F-3 intermediate default
    //    write is structurally dead, not merely unpainted).
    const trace = await page.evaluate(
        () => (window as unknown as { __savedBgTrace: string[] }).__savedBgTrace,
    );
    console.log(`[O-2] --saved-bg write trace: [${trace.join(" → ")}]`);
    // The instrument must have SEEN the boot write — an empty trace is a dead
    // observer, not a clean boot (PP-15: a swallowed wait hides the defect).
    expect(trace.length, "the --saved-bg trace is empty — the observer never armed").toBeGreaterThan(0);
    for (const v of trace) {
        expect(
            v,
            `--saved-bg carried a non-persisted material "${v}" during boot (trace: ${trace.join(" → ")}) — the F-3 default-write class; hydration must precede derivation`,
        ).toBe(persisted);
    }

    // The field PRESENTS on the natural cold load (honest to both render paths).
    const present = await canvasPresents(page, ATMOSPHERE_TESTID);
    expect(
        present.cssPlaceholder || present.draws > 0,
        `field absent on natural cold load (cssPlaceholder=${present.cssPlaceholder}, draws=${present.draws})`,
    ).toBe(true);
});
