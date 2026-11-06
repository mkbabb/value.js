import { test, expect, type Page } from "@playwright/test";
import { detectRenderer, isSoftwareGL } from "./perf/frame-budget";

/**
 * O1105 transitions-value (owner order 2026-11-05: "should not fade in and out
 * unless necessary and stacked with a card swapping animation for the value
 * views"; demo/DESIGN.md §5.7) — THE STACKED DECK, read every animation frame.
 *
 * Per hop, sampled from the input until the swap has been still for 600 ms:
 *   · U1 — a region's block size is never 0 and never the SUM of two
 *     co-mounted panes, and at most one pane is in flow (the leaver is out of
 *     flow). An in-flow card's opacity is 1 on every frame; a leaver's drops
 *     below 0.98 only in the final fifth of its leave (the 0.9 cut).
 *   · U2 — the document never scrolls sideways (`scrollWidth ≤ innerWidth`);
 *     on the dual → single hop the survivor's plate (tracked by identity)
 *     never steps by more than a quarter of its whole travel in one frame
 *     (before: one step of 100 %); a pane returned from the KeepAlive cache (A → B → A) rests at
 *     its region's origin with no transform.
 * The before arm (out-in, opacity-led) is RED on U1's opacity rows and on U2's
 * plate step (428 px in one frame at 1440); the record is the lane's `~/.dev-logs/o1105/transitions-value`.
 */

type Kid = { id: number; op: number; pos: string; h: number; leave: boolean; edge: number | null };
type Region = { role: string; oh: number; kids: Kid[] };
type Sample = { t: number; sw: number; iw: number; w: Region[] };

async function hop(page: Page, hash: string): Promise<Sample[]> {
    return page.evaluate(async (hash) => {
        const ids = ((window as unknown as { __deckIds?: WeakMap<Element, number> }).__deckIds ??= new WeakMap());
        const idOf = (el: Element) => {
            if (!ids.has(el)) ids.set(el, Math.random());
            return ids.get(el)!;
        };
        // the plate's DRAWN inline-end edge: its box less the clip it wears
        const edgeOf = (k: Element) => {
            const card = k.matches(".glass-resting") ? k : k.querySelector(":scope > .glass-resting");
            if (!card) return null;
            const m = /inset\(\S+ (-?[\d.]+)px/.exec(getComputedStyle(card).clipPath);
            return card.getBoundingClientRect().right - Math.max(0, m ? Number(m[1]) : 0);
        };
        const frame = () => new Promise((r) => requestAnimationFrame(r));
        const read = () => ({
            t: performance.now(),
            sw: document.documentElement.scrollWidth,
            iw: window.innerWidth,
            w: [...document.querySelectorAll<HTMLElement>(".pane-container > .pane-wrapper")].map((w) => ({
                role: /pane-wrapper--(\w+)/.exec(w.className)?.[1] ?? "",
                oh: w.offsetHeight,
                kids: [...w.children].map((k) => ({
                    id: idOf(k),
                    op: Number(getComputedStyle(k).opacity),
                    pos: getComputedStyle(k).position,
                    h: (k as HTMLElement).offsetHeight,
                    leave: k.classList.contains("vj-enter-leave-active"),
                    edge: edgeOf(k),
                })),
            })),
        });
        const out = [read()];
        location.hash = hash;
        let still = performance.now();
        let prev = JSON.stringify(out[0]!.w);
        while (performance.now() - still < 600 && out.length < 600) {
            await frame();
            const s = read();
            const sig = JSON.stringify(s.w);
            if (sig !== prev) still = performance.now();
            prev = sig;
            out.push(s);
        }
        return out;
    }, hash);
}

function deckFaults(samples: Sample[]) {
    const faults: string[] = [];
    const leaves = new Map<number, [number, number][]>();
    for (const s of samples) {
        if (s.sw > s.iw) faults.push(`scrollWidth ${s.sw} > ${s.iw}`);
        for (const w of s.w) {
            if (w.oh === 0) faults.push(`${w.role}: block size 0`);
            if (w.kids.filter((k) => k.pos !== "absolute").length > 1) faults.push(`${w.role}: two panes in flow`);
            if (w.kids.length > 1 && w.kids.every((k) => k.h > 40) && w.oh >= w.kids.reduce((a, k) => a + k.h, 0) - 2)
                faults.push(`${w.role}: block size is the sum of two panes`);
            for (const k of w.kids) {
                if (!k.leave && k.op < 0.999) faults.push(`${w.role}: in-flow card opacity ${k.op}`);
                if (k.leave) leaves.set(k.id, [...(leaves.get(k.id) ?? []), [s.t, k.op]]);
            }
        }
    }
    // A leaver's opacity is cut only over the last 10 % of its leave: any frame
    // below 0.98 lies in the final fifth of its sampled life (one frame of slack).
    for (const frames of leaves.values()) {
        const t0 = frames[0]![0];
        const span = frames[frames.length - 1]![0] - t0;
        const early = frames.filter(([t, op]) => op < 0.98 && t - t0 < 0.8 * span - 17);
        if (early.length) faults.push(`leaver faded early (${early.length} frames, from ${Math.round(early[0]![0] - t0)} ms of ${Math.round(span)})`);
    }
    return [...new Set(faults)];
}

/**
 * Per plate (by identity): its whole travel and its largest single-frame step,
 * the step scaled to one 60 Hz frame of elapsed time (a 50 ms frame on a
 * software rasteriser is frame production, which the perf gates own; a JUMP is
 * a discontinuity at any frame rate).
 */
function plateSteps(samples: Sample[], role: string) {
    const edges = new Map<number, [number, number][]>();
    for (const s of samples)
        for (const k of s.w.find((w) => w.role === role)?.kids ?? [])
            if (k.edge != null) edges.set(k.id, [...(edges.get(k.id) ?? []), [s.t, k.edge]]);
    return [...edges.values()].map((e) => {
        let step = 0;
        for (let i = 1; i < e.length; i++) {
            const dt = Math.max(1000 / 60, e[i]![0] - e[i - 1]![0]);
            step = Math.max(step, (Math.abs(e[i]![1] - e[i - 1]![1]) * (1000 / 60)) / dt);
        }
        const xs = e.map(([, x]) => x);
        return { travel: Math.max(...xs) - Math.min(...xs), step };
    });
}

for (const [width, height] of [
    [1440, 900],
    [390, 844],
] as const) {
    test(`O1105 deck · ${width}: stacked card swap — no empty or summed region, opacity held, no side scroll`, async ({ page }) => {
        test.setTimeout(180_000);
        await page.setViewportSize({ width, height });
        await page.goto("/#/");
        await expect(page.locator(".pane-wrapper--inspector")).toBeVisible({ timeout: 60_000 });
        await page.waitForLoadState("networkidle", { timeout: 60_000 }).catch(() => {});
        await page.waitForTimeout(1500);

        for (const hash of ["#/palettes", "#/mix", "#/gradient"]) {
            const faults = deckFaults(await hop(page, hash));
            expect(faults, `${width} → ${hash}`).toEqual([]);
        }
        // dual → single: the survivor's plate opens; it never jumps.
        const single = await hop(page, "#/atmosphere");
        expect(deckFaults(single), `${width} → atmosphere`).toEqual([]);
        // The plate-step row is a frame-production reading: on a software
        // rasteriser (the dev `smoke` cell) it is banked, not asserted
        // (§0gp.2, the od19-pane-swap form); its gate is the real-GPU cell.
        const soft = isSoftwareGL(await detectRenderer(page));
        if (width === 1440 && soft) console.log(`[o1105-deck] plate steps (informational, software GL): ${JSON.stringify(plateSteps(single, "stage"))}`);
        if (width === 1440 && !soft) {
            // every stage plate that travels opens; none jumps (before: the old
            // plate widened 428 px in one frame, step = travel)
            for (const p of plateSteps(single, "stage").filter((q) => q.travel > 100))
                expect(p.step / p.travel, `plate edge step ${p.step.toFixed(1)} of ${p.travel.toFixed(1)} px`).toBeLessThanOrEqual(0.25);
        }
        // A → B → A: the cached pane comes back at rest.
        for (const hash of ["#/", "#/mix", "#/"]) expect(deckFaults(await hop(page, hash)), `${width} → ${hash}`).toEqual([]);
        const rest = await page.evaluate(() =>
            [...document.querySelectorAll<HTMLElement>(".pane-container > .pane-wrapper")].map((w) => {
                const k = w.firstElementChild as HTMLElement;
                const cs = getComputedStyle(k);
                return { kids: w.children.length, transform: cs.transform, position: cs.position, dx: k.getBoundingClientRect().left - w.getBoundingClientRect().left, wrapper: w.getAttribute("style") ?? "" };
            }),
        );
        for (const r of rest) {
            expect(r.kids).toBe(1);
            expect(r.transform).toBe("none");
            expect(r.position).not.toBe("absolute");
            expect(Math.abs(r.dx)).toBeLessThan(1);
            expect(r.wrapper).not.toMatch(/translate|clip/);
        }
    });
}
