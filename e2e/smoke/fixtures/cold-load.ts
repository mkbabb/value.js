import { expect } from "@playwright/test";
import type { Page } from "@playwright/test";

/**
 * THE COLD-LOAD WITNESS (owner 2026-11-16, the motion law: "nothing changes
 * instantly, in or out"). A cold load must paint the linked scene in its first
 * contentful frame and never move it after. Before the cure the app mounted on
 * the router alone, so at 390 the eager picker painted first, and the routed
 * pane then arrived above it and pushed it out of the viewport (CLS 0.51 to
 * 0.67 on `/#/mix`, `/#/palettes`, `/#/blob`); on `/` the shell painted About
 * without its chunk's sheet and re-laid it at hydration (CLS 0.11 at 1440).
 *
 * The witness is installed before the document loads. It records every
 * `layout-shift` entry, the `first-contentful-paint` time, and, on every
 * animation frame, each region of the scene: the pane it shows, its box
 * height, whether it holds a pane, and whether that pane is a loading plate.
 */

/** Each routed scene and the pane each of its regions must show. */
export const SCENES: readonly {
    hash: string;
    panes: Readonly<Record<string, string>>;
}[] = [
    { hash: "#/", panes: { stage: "color-picker", inspector: "about" } },
    { hash: "#/palettes", panes: { stage: "color-picker", inspector: "palettes" } },
    { hash: "#/browse", panes: { stage: "browse", inspector: "palettes" } },
    { hash: "#/extract", panes: { stage: "extract", inspector: "palettes" } },
    { hash: "#/mix", panes: { stage: "color-picker", inspector: "mix" } },
    { hash: "#/generate", panes: { stage: "generate", inspector: "palettes" } },
    { hash: "#/gradient", panes: { stage: "gradient", inspector: "palettes" } },
    { hash: "#/atmosphere", panes: { stage: "atmosphere" } },
    { hash: "#/blob", panes: { stage: "color-picker", inspector: "blob" } },
    { hash: "#/no-such-place", panes: { stage: "not-found" } },
];

/** The ceiling on a cold load's summed layout shift, every route. */
export const COLD_LOAD_CLS_MAX = 0.05;

/**
 * How long the scene is watched once it is whole, mounted, and last moved, for
 * late content (a chunk's sheet, a page of palettes) that moves it. The
 * prerendered shell is whole from its first frame, long before it hydrates,
 * so the window opens at the later of the three.
 */
const QUIET_MS = 1500;

interface RegionSample {
    role: string;
    shown: string | null;
    height: number;
    filled: boolean;
    plate: boolean;
}

interface FrameSample {
    t: number;
    regions: RegionSample[];
}

interface ColdLoadRecord {
    shifts: { t: number; value: number; sources: string[] }[];
    fcp: number | null;
    frames: FrameSample[];
    /** The first frame every region held a pane. */
    wholeAt: number | null;
    /** The first frame the app was mounted (a hydrated shell is whole before it). */
    mountedAt: number | null;
}

/** Install the witness. MUST run before `page.goto`. */
export async function installColdLoadWitness(page: Page): Promise<void> {
    await page.addInitScript(() => {
        const record = {
            shifts: [] as { t: number; value: number; sources: string[] }[],
            fcp: null as number | null,
            frames: [] as { t: number; regions: unknown[] }[],
            wholeAt: null as number | null,
            mountedAt: null as number | null,
        };
        (window as unknown as { __coldLoad: typeof record }).__coldLoad = record;
        new PerformanceObserver((list) => {
            for (const entry of list.getEntries() as (PerformanceEntry & {
                value: number;
                sources?: { node?: Node | null }[];
            })[]) {
                record.shifts.push({
                    t: Math.round(entry.startTime),
                    value: entry.value,
                    sources: (entry.sources ?? []).map((s) =>
                        s.node instanceof Element
                            ? `${s.node.tagName.toLowerCase()}.${s.node.className}`.slice(
                                  0,
                                  120,
                              )
                            : String(s.node?.nodeName),
                    ),
                });
            }
        }).observe({ type: "layout-shift", buffered: true });
        new PerformanceObserver((list) => {
            for (const entry of list.getEntries())
                if (entry.name === "first-contentful-paint")
                    record.fcp = entry.startTime;
        }).observe({ type: "paint", buffered: true });
        let last = "";
        const sample = () => {
            const regions = [
                ...document.querySelectorAll(".pane-container > .pane-wrapper"),
            ].map((wrapper) => ({
                role: (/pane-wrapper--(\w+)/.exec(wrapper.className) ?? [])[1] ?? "",
                shown: wrapper.getAttribute("data-shown"),
                height: Math.round(wrapper.getBoundingClientRect().height),
                filled: wrapper.firstElementChild !== null,
                plate: wrapper.querySelector(".pane-plate") !== null,
            }));
            const signature = JSON.stringify(regions);
            if (signature !== last)
                record.frames.push({ t: performance.now(), regions });
            last = signature;
            if (
                record.wholeAt === null &&
                regions.length > 0 &&
                regions.every((r) => r.height > 0 && r.filled && !r.plate)
            )
                record.wholeAt = performance.now();
            if (
                record.mountedAt === null &&
                "__vue_app__" in (document.getElementById("app") ?? {})
            )
                record.mountedAt = performance.now();
            requestAnimationFrame(sample);
        };
        requestAnimationFrame(sample);
    });
}

/**
 * Load `scene` cold and assert the motion law's two halves: the first frame
 * with any pane in it already holds every region of the linked scene (and
 * that frame is the first contentful paint), and the summed layout shift
 * stays under `COLD_LOAD_CLS_MAX` while the scene is watched.
 */
export async function expectColdLoadSettled(
    page: Page,
    scene: (typeof SCENES)[number],
): Promise<void> {
    await page.goto(`/${scene.hash}`);
    await page.waitForFunction(
        (quiet) => {
            const record = (window as unknown as { __coldLoad?: ColdLoadRecord })
                .__coldLoad;
            if (record?.wholeAt == null || record.mountedAt == null) return false;
            const lastShift = record.shifts.at(-1)?.t ?? 0;
            return (
                performance.now() -
                    Math.max(record.wholeAt, record.mountedAt, lastShift) >
                quiet
            );
        },
        QUIET_MS,
        { timeout: 25_000 },
    );
    const record = await page.evaluate(
        () => (window as unknown as { __coldLoad: ColdLoadRecord }).__coldLoad,
    );

    const roles = Object.keys(scene.panes);
    const first = record.frames.findIndex((f) => f.regions.some((r) => r.height > 0));
    const firstFrame = record.frames.at(first);
    expect(first >= 0 && firstFrame, "no frame ever painted a pane").toBeTruthy();
    for (const frame of record.frames.slice(first)) {
        const seen = Object.fromEntries(frame.regions.map((r) => [r.role, r]));
        for (const role of roles) {
            const region = seen[role];
            expect(
                region !== undefined &&
                    region.shown === scene.panes[role] &&
                    region.height > 0 &&
                    region.filled &&
                    !region.plate,
                `${scene.hash}: at ${Math.round(frame.t)} ms the ${role} region was ` +
                    JSON.stringify(region ?? null) +
                    `, not the ${scene.panes[role]} pane`,
            ).toBe(true);
        }
    }
    // Where the engine reports it, the first contentful paint is that frame,
    // not an earlier one. The smoke-mobile lane (Pixel 7 on SwiftShader)
    // emits `first-paint` only (measured: no `first-contentful-paint` entry on
    // any route), so the per-frame read above is the witness there; where the
    // entry exists both hold.
    if (record.fcp !== null && firstFrame)
        expect(
            firstFrame.t,
            `${scene.hash}: something painted contentfully before the scene`,
        ).toBeLessThanOrEqual(record.fcp);

    const cls = record.shifts.reduce((sum, s) => sum + s.value, 0);
    expect(
        cls,
        `${scene.hash}: cold-load CLS ${cls.toFixed(4)}: ` +
            JSON.stringify(record.shifts.filter((s) => s.value >= 0.001)),
    ).toBeLessThan(COLD_LOAD_CLS_MAX);
}
