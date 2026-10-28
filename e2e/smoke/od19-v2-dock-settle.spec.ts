/**
 * OD19-V2 (consumer half, packet P4) — the vj-settle beat never compounds with
 * glass's dock width morph.
 *
 * Before: Dock.vue re-armed `.dock-settle` (vj-settle, scale 1 → 1.03 → 1) on
 * the dock HOST on the view-change tick, so the host carried a scale on the
 * same frames glass ran its own `[data-morphing]` width morph — two transforms
 * on one plate. The cure keeps the beat (preserve-animations edict) but arms it
 * only once `.glass-dock` has left `[data-morphing]`, and seats it on the seal /
 * view trigger, never on the host.
 *
 * The geometry trace, per rAF across a view switch at 1440 and 390:
 *   - no frame where `.glass-dock[data-morphing]` and the host carries a transform;
 *   - every vj-settle start lands on the trigger or the seal, with no morph live;
 *   - the beat still plays (it is kept, not deleted);
 *   - the plate's centre x drifts ≤ 1 px.
 */
import { test, expect, type Page } from "@playwright/test";

interface Frame {
    t: number;
    morphing: boolean;
    hostTransform: string;
    hostScale: string;
    cx: number;
}
interface SettleStart {
    t: number;
    morphing: boolean;
    onHost: boolean;
    seat: string | null;
}

async function openHome(page: Page) {
    await page.goto("/#/", { waitUntil: "load", timeout: 60_000 });
    await page.locator(".glass-dock").first().waitFor({ timeout: 30_000 });
    await page.locator(".dock-crossfade .dock-face.is-active").first().waitFor({ timeout: 30_000 });
    await expect(page.locator(".glass-dock[data-morphing]")).toHaveCount(0, { timeout: 15_000 });
    await page.waitForTimeout(1_200);
}

/** Switch view by hash and trace the dock per animation frame for `ms`. */
async function traceViewSwitch(page: Page, hash: string, ms: number) {
    return page.evaluate(
        ({ hash, ms }) =>
            new Promise<{ frames: Frame[]; settles: SettleStart[] }>((resolve) => {
                const dock = document.querySelector<HTMLElement>(".glass-dock")!;
                const host = dock.parentElement!;
                const frames: Frame[] = [];
                const settles: SettleStart[] = [];
                const t0 = performance.now();
                const onStart = (e: AnimationEvent) => {
                    if (e.animationName !== "vj-settle") return;
                    const el = e.target as HTMLElement;
                    settles.push({
                        t: Math.round(performance.now() - t0),
                        morphing: dock.hasAttribute("data-morphing"),
                        onHost: el === host,
                        seat: el.closest(".view-select-trigger") ? "trigger" : el.closest(".dock-seal") ? "seal" : null,
                    });
                };
                document.addEventListener("animationstart", onStart, true);
                const tick = () => {
                    const cs = getComputedStyle(host);
                    const r = dock.getBoundingClientRect();
                    frames.push({
                        t: Math.round(performance.now() - t0),
                        morphing: dock.hasAttribute("data-morphing"),
                        hostTransform: cs.transform,
                        hostScale: cs.scale,
                        cx: r.left + r.width / 2,
                    });
                    if (performance.now() - t0 < ms) requestAnimationFrame(tick);
                    else {
                        document.removeEventListener("animationstart", onStart, true);
                        resolve({ frames, settles });
                    }
                };
                requestAnimationFrame(tick);
                location.hash = hash;
            }),
        { hash, ms },
    );
}

for (const width of [1440, 390]) {
    test(`OD19-V2: the view-switch settle never rides glass's morph on the host (${width})`, async ({ browser, baseURL }) => {
        test.setTimeout(120_000);
        const ctx = await browser.newContext({
            ...(baseURL ? { baseURL } : {}),
            viewport: { width, height: width === 390 ? 844 : 900 },
            colorScheme: "dark",
        });
        try {
            const page = await ctx.newPage();
            await openHome(page);
            const { frames, settles } = await traceViewSwitch(page, "#/gradient", 2_400);
            const compounded = frames.filter(
                (f) => f.morphing && ((f.hostTransform !== "none" && f.hostTransform !== "") || (f.hostScale !== "none" && f.hostScale !== "")),
            );
            const cxs = frames.map((f) => f.cx);
            const drift = Math.max(...cxs) - Math.min(...cxs);
            console.log(
                JSON.stringify({
                    width,
                    frames: frames.length,
                    morphingFrames: frames.filter((f) => f.morphing).length,
                    hostTransformFrames: frames.filter((f) => f.hostTransform !== "none").length,
                    compounded: compounded.length,
                    settles,
                    drift,
                }),
            );
            expect(compounded, "no host transform while .glass-dock[data-morphing]").toEqual([]);
            expect(frames.filter((f) => f.hostTransform !== "none"), "the settle never scales the dock host").toEqual([]);
            expect(settles.length, "the vj-settle beat is kept").toBeGreaterThanOrEqual(1);
            for (const s of settles) {
                expect(s.onHost, "vj-settle is not seated on the dock host").toBe(false);
                expect(s.seat, "vj-settle is seated on the view trigger or the seal").not.toBeNull();
                expect(s.morphing, "vj-settle arms only after the dock leaves [data-morphing]").toBe(false);
            }
            expect(drift, "plate centre-x drift across the switch").toBeLessThanOrEqual(1);
        } finally {
            await ctx.close();
        }
    });
}
