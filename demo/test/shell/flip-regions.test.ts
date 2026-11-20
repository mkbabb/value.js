/**
 * The FORTIETH order, B-1: the commit's FLIP reads once and writes once.
 *
 * `flipRegions` runs inside every pane commit. On a 4x phone its interleaved
 * reads and writes (a transition reset, a rect, a forced restart, the plate's
 * computed `clip-path`) forced 110-453 ms of style and layout in one task. The
 * contract measured here, on a stand-in layout:
 *   - after the mutate, the layout reads form ONE run: no write falls between
 *     two reads, so the browser lays the page out once;
 *   - no region's computed style is read per commit (the clock is read once);
 *   - the travel runs through the Web Animations API on `translate`, from the
 *     drawn offset to rest, and leaves no inline translate or transition.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { flipRegions } from "../../shell/flipRegions";

type Op = "read" | "write";

let log: Op[] = [];
const seats = new Map<Element, { left: number; top: number; width: number; height: number }>();
const animations: { el: Element; frames: Keyframe[] }[] = [];

function rect(r: { left: number; top: number; width: number; height: number }): DOMRect {
    return {
        ...r,
        x: r.left,
        y: r.top,
        right: r.left + r.width,
        bottom: r.top + r.height,
        toJSON: () => r,
    } as DOMRect;
}

function scene(): { container: HTMLElement; stage: HTMLElement; inspector: HTMLElement } {
    const container = document.createElement("div");
    const stage = document.createElement("div");
    const inspector = document.createElement("div");
    for (const [w, role] of [
        [stage, "stage"],
        [inspector, "inspector"],
    ] as const) {
        w.className = `pane-wrapper pane-wrapper--${role}`;
        const plate = document.createElement("div");
        plate.className = "glass-resting";
        w.append(plate);
        container.append(w);
    }
    document.body.append(container);
    seats.set(stage, { left: 12, top: 100, width: 366, height: 564 });
    seats.set(inspector, { left: 12, top: 680, width: 366, height: 420 });
    return { container, stage, inspector };
}

beforeEach(() => {
    log = [];
    animations.length = 0;
    vi.stubGlobal("matchMedia", (q: string) => ({ matches: false, media: q }) as MediaQueryList);
    const getComputedStyle = window.getComputedStyle.bind(window);
    vi.spyOn(window, "getComputedStyle").mockImplementation((el, pseudo) => {
        log.push("read");
        return getComputedStyle(el, pseudo);
    });
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function (this: HTMLElement) {
        log.push("read");
        return rect(seats.get(this) ?? { left: 0, top: 0, width: 0, height: 0 });
    });
    const setProperty = CSSStyleDeclaration.prototype.setProperty;
    vi.spyOn(CSSStyleDeclaration.prototype, "setProperty").mockImplementation(function (
        this: CSSStyleDeclaration,
        ...args: Parameters<CSSStyleDeclaration["setProperty"]>
    ) {
        log.push("write");
        return setProperty.apply(this, args);
    });
    const removeProperty = CSSStyleDeclaration.prototype.removeProperty;
    vi.spyOn(CSSStyleDeclaration.prototype, "removeProperty").mockImplementation(function (
        this: CSSStyleDeclaration,
        prop: string,
    ) {
        log.push("write");
        return removeProperty.call(this, prop);
    });
    (HTMLElement.prototype as unknown as { animate: unknown }).animate = function (
        this: HTMLElement,
        frames: Keyframe[],
    ) {
        log.push("write");
        animations.push({ el: this, frames });
        return { cancel() {}, finished: new Promise(() => {}) } as unknown as Animation;
    };
});

afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    delete (HTMLElement.prototype as unknown as { animate?: unknown }).animate;
    document.body.replaceChildren();
    seats.clear();
});

/** The ops logged after the mutate, as runs of one kind ("read", "write", "read" = two layouts). */
function runs(ops: Op[]): Op[] {
    return ops.filter((op, i) => i === 0 || ops[i - 1] !== op);
}

describe("flipRegions — one read, one write (FORTIETH B-1)", () => {
    it("reads every seat in one run after the commit, and only then writes", async () => {
        const { container, stage, inspector } = scene();
        let mark = 0;
        await flipRegions(container, () => {
            // the commit reorders the column: the subject first, the picker below
            seats.set(stage, { left: 12, top: 540, width: 366, height: 564 });
            seats.set(inspector, { left: 12, top: 100, width: 366, height: 420 });
            mark = log.length;
        });
        const after = log.slice(mark);
        const reads = runs(after).filter((op) => op === "read").length;
        expect(reads, `ops after the commit: ${runs(after).join(" → ")}`).toBe(1);
        expect(after[after.length - 1], "the commit ends on a write").toBe("write");
    });

    it("reads no region's computed style per commit", async () => {
        const { container, stage } = scene();
        const computed = () => vi.mocked(window.getComputedStyle).mock.calls.length;
        await flipRegions(container, () => seats.set(stage, { left: 12, top: 300, width: 366, height: 564 }));
        const once = computed();
        await flipRegions(container, () => seats.set(stage, { left: 12, top: 100, width: 366, height: 564 }));
        expect(once, "the first commit reads the clock at most once").toBeLessThanOrEqual(1);
        expect(computed() - once, "a later commit reads no computed style").toBe(0);
    });

    it("travels by the Web Animations API on translate, from the drawn offset to rest", async () => {
        const { container, stage, inspector } = scene();
        await flipRegions(container, () => {
            seats.set(stage, { left: 12, top: 540, width: 366, height: 564 });
            seats.set(inspector, { left: 12, top: 100, width: 366, height: 420 });
        });
        const stageTravel = animations.find((a) => a.el === stage);
        expect(stageTravel?.frames.map((f) => f.translate)).toEqual(["0px -440px", "0px 0px"]);
        const inspectorTravel = animations.find((a) => a.el === inspector);
        expect(inspectorTravel?.frames.map((f) => f.translate)).toEqual(["0px 580px", "0px 0px"]);
        for (const w of [stage, inspector]) {
            expect(w.style.translate, "no inline translate").toBe("");
            expect(w.style.transition, "no inline transition").toBe("");
        }
    });

    it("a region that did not move is not written", async () => {
        const { container } = scene();
        let mark = 0;
        await flipRegions(container, () => {
            mark = log.length;
        });
        expect(animations).toHaveLength(0);
        expect(log.slice(mark).filter((op) => op === "write")).toHaveLength(0);
    });
});
