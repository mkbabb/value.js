// SERVED MODEL: claude-opus-5-5
/**
 * X.W11.lck (COHESION §0gy.8, R16-9) — the unit lock for `.cut`'s second cut
 * (`b14ed7945`, `useOverture.ts`: the shell-settle read waits two frames).
 *
 * The cut moved `document.getAnimations()` out of the mount task to two
 * frames past it, claiming the same settled result: `data-shell-settled`
 * lands once every `overture-shell-settle` CSS animation has finished
 * (fulfilled or cancelled), never before, and at once when the first route
 * change begins. This lock asserts that result, so the same assertions pass
 * on the bytes before the cut (`b14ed7945^`, the read at mount) and after it
 * (HEAD, the read two frames on):
 *
 *  - while any settle runs, the root is not retired, across many frames;
 *  - the last settle's end retires it (a cancelled settle counts as ended);
 *  - an animation that is not the settle (another CSS animation, or a
 *    script animation that carries the same name) never holds the retire;
 *  - a route change retires at once, settles still running;
 *  - a document whose first view is not the shell never retires by the read.
 *
 * jsdom has no Web Animations: `document.getAnimations`, `CSSAnimation` and
 * the frame clock are stubbed, and frames are stepped by hand.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { computed, createApp, defineComponent, h, nextTick, reactive } from "vue";

const route = reactive({ name: "picker" as string });
vi.mock("vue-router", () => ({ useRoute: () => route }));

import { useOverture } from "../../app/composables/boot/useOverture";

class FakeCSSAnimation {
    finished: Promise<unknown>;
    end!: () => void;
    cancel!: () => void;
    constructor(public animationName: string) {
        this.finished = new Promise((resolve, reject) => {
            this.end = () => resolve(this);
            this.cancel = () => reject(new DOMException("cancelled", "AbortError"));
        });
        // A cancel the composable awaits through allSettled is never unhandled.
        this.finished.catch(() => {});
    }
}

let frames: FrameRequestCallback[] = [];
let running: object[] = [];
const root = document.documentElement;
const settled = () => root.hasAttribute("data-shell-settled");

async function step(n: number) {
    for (let i = 0; i < n; i++) {
        const due = frames;
        frames = [];
        for (const cb of due) cb(performance.now());
        await Promise.resolve();
        await nextTick();
    }
    // Let `allSettled(...).then(retire)` drain.
    for (let i = 0; i < 4; i++) await Promise.resolve();
}

function mountOverture() {
    const host = document.createElement("div");
    document.body.appendChild(host);
    const app = createApp(
        defineComponent({
            setup() {
                useOverture(computed(() => false));
                return () => h("span");
            },
        }),
    );
    app.mount(host);
    return () => {
        app.unmount();
        host.remove();
    };
}

beforeEach(() => {
    frames = [];
    running = [];
    route.name = "picker";
    root.removeAttribute("data-shell-settled");
    root.dataset.firstView = "shell";
    vi.stubGlobal("CSSAnimation", FakeCSSAnimation);
    vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) => {
        frames.push(cb);
        return frames.length;
    });
    vi.stubGlobal("matchMedia", (q: string) => ({
        matches: false,
        media: q,
        addEventListener() {},
        removeEventListener() {},
    }));
    (document as { getAnimations?: () => object[] }).getAnimations = () =>
        running.slice();
});

afterEach(() => {
    vi.unstubAllGlobals();
    delete (document as { getAnimations?: unknown }).getAnimations;
    root.removeAttribute("data-shell-settled");
    delete root.dataset.firstView;
});

describe("overture shell settle (X.W11.lck, §0gy.8: the .cut read, same settled result)", () => {
    it("retires only once every settle has ended, across many frames", async () => {
        const a = new FakeCSSAnimation("overture-shell-settle");
        const b = new FakeCSSAnimation("overture-shell-settle");
        running = [a, b];
        const unmount = mountOverture();
        await step(8);
        expect(settled()).toBe(false);
        a.end();
        await step(2);
        expect(settled()).toBe(false);
        b.end();
        await step(2);
        expect(settled()).toBe(true);
        unmount();
    });

    it("a cancelled settle counts as ended", async () => {
        const a = new FakeCSSAnimation("overture-shell-settle");
        const b = new FakeCSSAnimation("overture-shell-settle");
        running = [a, b];
        const unmount = mountOverture();
        await step(4);
        a.cancel();
        await step(2);
        expect(settled()).toBe(false);
        b.end();
        await step(2);
        expect(settled()).toBe(true);
        unmount();
    });

    it("an animation that is not the settle never holds the retire", async () => {
        const settle = new FakeCSSAnimation("overture-shell-settle");
        const other = new FakeCSSAnimation("vj-enter");
        const scripted = {
            animationName: "overture-shell-settle",
            finished: new Promise(() => {}),
        };
        running = [settle, other, scripted];
        const unmount = mountOverture();
        await step(4);
        expect(settled()).toBe(false);
        settle.end();
        await step(2);
        expect(settled()).toBe(true);
        unmount();
    });

    it("a route change retires at once, settles still running", async () => {
        running = [new FakeCSSAnimation("overture-shell-settle")];
        const unmount = mountOverture();
        await step(2);
        expect(settled()).toBe(false);
        route.name = "gradient";
        expect(settled()).toBe(true);
        unmount();
    });

    it("a first view that is not the shell never retires by the read", async () => {
        root.dataset.firstView = "route";
        const a = new FakeCSSAnimation("overture-shell-settle");
        running = [a];
        const unmount = mountOverture();
        await step(4);
        a.end();
        await step(4);
        expect(settled()).toBe(false);
        unmount();
    });
});
