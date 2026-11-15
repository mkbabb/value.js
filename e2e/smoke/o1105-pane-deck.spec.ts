import { test, expect, type Page } from "@playwright/test";
import { detectRenderer, isSoftwareGL } from "./perf/frame-budget";

/**
 * O1105 transitions-value (owner order 2026-11-05: "should not fade in and out
 * unless necessary and stacked with a card swapping animation for the value
 * views"), re-stated for O16's dealt cards (owner 2026-11-13: "The current card
 * transition animation is a bit too expensive and transitons the height--make
 * the cards swap in and out from the left and right sides, like playing cards
 * sort of."; demo/DESIGN.md §5.7), read every animation frame.
 *
 * Per hop, sampled from the input until the swap has been still for 600 ms:
 *   · U1 — a region's block size is never 0 and never the SUM of two
 *     co-mounted panes, and at most one pane is in flow (the leaver is out of
 *     flow). No frame shows two cards of one region above half strength
 *     (P0a rule 4: the dealt card's fade waits for the leaver's).
 *   · D1 — the dealt card arrives from the side the move names: from the
 *     right (+x) on a forward hop, from the left (−x) on a back hop.
 *   · U2 — the document never scrolls sideways (`scrollWidth ≤ innerWidth`);
 *     on the dual → single hop the survivor's plate (tracked by identity)
 *     never steps by more than a quarter of its whole travel in one frame; a
 *     pane returned from the KeepAlive cache (A → B → A) rests at its region's
 *     origin with no transform.
 *   · G9 — the row's split travels (the stage region's width never covers
 *     more than 60 % of a >100 px travel in one 60 Hz frame, unless the row's
 *     own transition of that property started); the scene's HEIGHT does not
 *     tween (O16: no `height` transition runs on `.pane-container`); a leaver
 *     keeps the block size it was drawn at.
 */

type Kid = { id: number; op: number; pos: string; h: number; leave: boolean; edge: number | null; tx: number; dir: string | null };
type Region = { role: string; oh: number; kids: Kid[] };
type Sample = { t: number; sw: number; iw: number; ph: number; w: Region[]; stw: number | null; tr: string[] };

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
        // The row's own transitions, as they start: `transitionrun` fires when
        // the style change creates one, however few frames a starved runner
        // then draws of it.
        const runs = new Set<string>();
        const row = document.querySelector<HTMLElement>(".pane-container")!;
        const onRun = (e: TransitionEvent) => {
            if (e.target === row) runs.add(e.propertyName);
        };
        row.addEventListener("transitionrun", onRun);
        const read = () => ({
            t: performance.now(),
            tr: [...runs],
            sw: document.documentElement.scrollWidth,
            iw: window.innerWidth,
            ph: document.querySelector<HTMLElement>(".pane-container")!.getBoundingClientRect().height,
            stw: document.querySelector<HTMLElement>(".pane-wrapper--stage")?.getBoundingClientRect().width ?? null,
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
                    tx: new DOMMatrixReadOnly(getComputedStyle(k).transform).m41,
                    dir: k.getAttribute("data-scene-direction"),
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
        row.removeEventListener("transitionrun", onRun);
        return out;
    }, hash);
}

function deckFaults(samples: Sample[]) {
    const faults: string[] = [];
    // the first sideways offset each entering card is drawn at, by identity
    const dealt = new Map<number, { tx: number; dir: string | null }>();
    for (const s of samples) {
        if (s.sw > s.iw) faults.push(`scrollWidth ${s.sw} > ${s.iw}`);
        for (const w of s.w) {
            if (w.oh === 0) faults.push(`${w.role}: block size 0`);
            if (w.kids.filter((k) => k.pos !== "absolute").length > 1) faults.push(`${w.role}: two panes in flow`);
            if (w.kids.length > 1 && w.kids.every((k) => k.h > 40) && w.oh >= w.kids.reduce((a, k) => a + k.h, 0) - 2)
                faults.push(`${w.role}: block size is the sum of two panes`);
            if (w.kids.length > 1 && w.kids.filter((k) => k.op > 0.5).length > 1)
                faults.push(`${w.role}: two cards above half strength`);
            for (const k of w.kids)
                if (w.kids.length > 1 && !k.leave && !dealt.has(k.id) && Math.abs(k.tx) >= 1)
                    dealt.set(k.id, { tx: k.tx, dir: k.dir });
        }
    }
    for (const { tx, dir } of dealt.values())
        if ((dir === "back" ? -1 : 1) * tx < 0) faults.push(`a ${dir ?? "forward"} card was dealt from ${tx < 0 ? "the left" : "the right"} (${tx.toFixed(0)} px)`);
    return [...new Set(faults)];
}

/** G9: the row's split travels, the scene's height does not tween; a leaver keeps its drawn block size. */
function sizeFaults(samples: Sample[]) {
    const faults: string[] = [];
    // A size row travels when the row's own transition carries it. Read per
    // frame, a snap is a discontinuity at any frame rate, but a starved
    // runner's 300–900 ms frames draw a travel as two values too, so the frame
    // reading names a candidate, and the row faults only when no transition of
    // that property started on the row during the hop.
    const last = samples[samples.length - 1]!;
    // O16: the scene's height is never tweened (the owner named it the expense).
    if (last.tr.includes("height")) faults.push("pane-container height transitioned");
    // the width step is scaled to one 60 Hz frame of elapsed time, as
    // `plateSteps` is
    const ws = samples.filter((s) => s.stw != null).map((s) => [s.t, s.stw!] as const);
    const xs = ws.map(([, x]) => x);
    const travel = xs.length ? Math.max(...xs) - Math.min(...xs) : 0;
    let step = 0;
    for (let i = 1; i < ws.length; i++) {
        const dt = Math.max(1000 / 60, ws[i]![0] - ws[i - 1]![0]);
        step = Math.max(step, (Math.abs(ws[i]![1] - ws[i - 1]![1]) * (1000 / 60)) / dt);
    }
    if (travel > 100 && step > 0.6 * travel && !last.tr.includes("grid-template-columns"))
        faults.push(`stage width stepped ${step.toFixed(0)} of ${travel.toFixed(0)} px in one frame (no split transition)`);
    const drawn = new Map<number, number>();
    for (const s of samples)
        for (const w of s.w)
            for (const k of w.kids) {
                if (!k.leave) drawn.set(k.id, k.h);
                // 48 px of slack: the row's split may still be travelling between
                // the last in-flow frame and the leave (an unroll is thousands)
                else if (drawn.has(k.id) && k.h > drawn.get(k.id)! + 48) faults.push(`${w.role}: leaver grew ${drawn.get(k.id)} → ${k.h}`);
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
    test(`O1105 deck · ${width}: dealt cards — no empty or summed region, one card at strength, dealt from the move's side, no side scroll, no height tween`, async ({ page }) => {
        test.setTimeout(180_000);
        await page.setViewportSize({ width, height });
        await page.goto("/#/");
        await expect(page.locator(".pane-wrapper--inspector")).toBeVisible({ timeout: 60_000 });
        await page.waitForLoadState("networkidle", { timeout: 60_000 }).catch(() => {});
        await page.waitForTimeout(1500);

        for (const hash of ["#/palettes", "#/mix", "#/gradient"]) {
            const samples = await hop(page, hash);
            expect(deckFaults(samples), `${width} → ${hash}`).toEqual([]);
            expect(sizeFaults(samples), `${width} → ${hash} (G9)`).toEqual([]);
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
                // The rest origin is the region's own centring of its pane: 0
                // for a pane that fills its region, half the slack for one
                // that caps its measure (O1109: About takes the picker's).
                const kr = k.getBoundingClientRect();
                const wr = w.getBoundingClientRect();
                return { kids: w.children.length, transform: cs.transform, position: cs.position, dx: kr.left - wr.left - (wr.width - kr.width) / 2, wrapper: w.getAttribute("style") ?? "" };
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
