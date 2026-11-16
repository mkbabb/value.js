/**
 * urlState — each view's state in the address (owner, 15 Nov 2026: "Each page
 * should have state defined in the URL").
 *
 * Two halves: the codecs round-trip every value they accept and refuse what
 * they do not; and the bindings, over a real router, omit defaults, push a
 * discrete change, replace a continuous one, re-apply on Back, reopen a deep
 * link, and drop a pane's keys when the view no longer seats it.
 */
import { afterEach, describe, expect, it } from "vitest";
import { defineComponent, nextTick, ref, type Ref } from "vue";
import { mount, type VueWrapper } from "@vue/test-utils";
import { createMemoryHistory, createRouter, type Router } from "vue-router";

import {
    configCodec,
    configHistory,
    configOverrides,
    configState,
    cssColorCodec,
    enumCodec,
    hueMethodCodec,
    interpolationSpaceCodec,
    listCodec,
    nullableCodec,
    numberCodec,
    queryForView,
    REPLACE_MS,
    textCodec,
    useUrlState,
    type ConfigField,
    type UrlCodec,
} from "../../shell/urlState";
import { useViewManager } from "../../shell/useViewManager";
import { stopsCodec, stopsHistory } from "../../workbenches/gradient/model/stopsUrl";
import { seededStops } from "../../workbenches/gradient/composables/useGradientModel";
import { seedLiteral } from "../../workbenches/gradient/composables/useGradientCSS";

function roundTrip<T>(codec: UrlCodec<T>, value: T): T | undefined {
    return codec.parse(codec.format(value));
}

describe("codecs", () => {
    it("enum: accepts its members, refuses the rest", () => {
        const c = enumCodec(["linear", "radial", "conic"] as const);
        expect(roundTrip(c, "radial")).toBe("radial");
        expect(c.parse("spiral")).toBeUndefined();
    });

    it("number: clamps, rounds to its places, refuses non-numbers", () => {
        const c = numberCodec(0, 1.5, 2);
        expect(roundTrip(c, 0.5)).toBe(0.5);
        expect(c.parse("9")).toBe(1.5);
        expect(c.parse("0.12345")).toBe(0.12);
        expect(c.parse("abc")).toBeUndefined();
        expect(c.parse("")).toBeUndefined();
        expect(numberCodec(1, 12).parse("7.6")).toBe(8);
    });

    it("text, nullable and list", () => {
        expect(roundTrip(textCodec(10), "sunset")).toBe("sunset");
        expect(textCodec(3).parse("toolong")).toBeUndefined();
        const n = nullableCodec(textCodec());
        expect(roundTrip(n, null)).toBeNull();
        expect(roundTrip(n, "srv:abc")).toBe("srv:abc");
        const l = listCodec(textCodec(40), ",");
        expect(roundTrip(l, ["warm", "pastel"])).toEqual(["warm", "pastel"]);
        expect(roundTrip(l, [])).toEqual([]);
        expect(listCodec(numberCodec(0, 9)).parse("1|x")).toBeUndefined();
    });

    it("css colour: a colour that parses, nothing else", () => {
        expect(roundTrip(cssColorCodec, "oklch(73% 0.185 2)")).toBe("oklch(73% 0.185 2)");
        expect(roundTrip(cssColorCodec, "#ff8800")).toBe("#ff8800");
        expect(cssColorCodec.parse("not-a-colour")).toBeUndefined();
        expect(cssColorCodec.parse("red|blue")).toBeUndefined();
    });

    it("interpolation space and hue method", () => {
        expect(roundTrip(interpolationSpaceCodec, "oklab")).toBe("oklab");
        expect(interpolationSpaceCodec.parse("nope")).toBeUndefined();
        expect(roundTrip(hueMethodCodec, "longer")).toBe("longer");
    });

    it("config: only overrides are printed; a retired field is ignored, a bad value refused", () => {
        const fields: ConfigField[] = [
            { path: "harmony", values: ["analogous", "triad"] },
            { path: "zones.count", min: 1, max: 6, places: 0 },
            { path: "noise", min: 0, max: 1, places: 2 },
        ];
        const defaults = { harmony: "analogous", zones: { count: 6 }, noise: 0.5 };
        const target = { harmony: "triad", zones: { count: 6 }, noise: 0.25 };
        const overrides = configOverrides(target, defaults, fields);
        expect(overrides).toEqual({ harmony: "triad", noise: 0.25 });
        const c = configCodec(fields);
        expect(c.format(overrides)).toBe("harmony:triad,noise:0.25");
        expect(roundTrip(c, overrides)).toEqual(overrides);
        expect(c.parse("gone.field:3,noise:0.25")).toEqual({ noise: 0.25 });
        expect(c.parse("harmony:spiral")).toBeUndefined();

        // The state ref writes every listed field: an absent one to its default.
        const live = { harmony: "triad", zones: { count: 3 }, noise: 0.9 };
        const state = configState(live, defaults, fields);
        state.value = { noise: 0.1 };
        expect(live).toEqual({ harmony: "analogous", zones: { count: 6 }, noise: 0.1 });

        // A select's change is a step; a slider's is not.
        const history = configHistory(fields);
        expect(history("noise:0.2", "noise:0.3")).toBe("replace");
        expect(history(undefined, "harmony:triad")).toBe("push");
    });

    it("gradient stops: colour, position and easing survive the round trip", () => {
        const [a, b, c] = ["oklch(0.75 0.15 145)", "oklch(0.7 0.1 200)", "oklch(0.65 0.18 265)"].map(seedLiteral);
        const raw = `${a}@0~b:0.42,0,0.58,1|${b}@40.5~s:4,jump-start|${c}@100`;
        const stops = stopsCodec.parse(raw)!;
        expect(stops.map((s) => [s.cssColor, s.position, s.easing.mode])).toEqual([
            [a, 0, "bezier"],
            [b, 40.5, "steps"],
            [c, 100, "bezier"],
        ]);
        // A colour in another spelling settles on the model's one dialect.
        expect(stopsCodec.parse("oklch(0.75 0.15 145)@0|red@100")![0]!.cssColor).toBe(a);
        expect(stops[0]!.easing.css).toBe("cubic-bezier(0.42, 0, 0.58, 1)");
        expect(stops[1]!.easing.css).toBe("steps(4, jump-start)");
        expect(stops[1]!.easing.fn(0.1)).toBeCloseTo(0.25);
        expect(new Set(stops.map((s) => s.id)).size).toBe(3);
        expect(stopsCodec.format(stops)).toBe(raw);
        // The seeded pair prints without easing (linear).
        expect(stopsCodec.format(seededStops())).not.toContain("~");
        expect(roundTrip(stopsCodec, seededStops())!.length).toBe(2);
        // One stop is not a gradient; a bad colour or easing refuses the set.
        expect(stopsCodec.parse("red@0")).toBeUndefined();
        expect(stopsCodec.parse("red@0|nope@100")).toBeUndefined();
        expect(stopsCodec.parse("red@0~b:2,0,1,1|blue@100")).toBeUndefined();
        // Stops come back in position order.
        expect(stopsCodec.parse("blue@100|red@0")!.map((s) => s.cssColor)).toEqual(["red", "blue"].map(seedLiteral));
        // Moving a stop replaces; adding one pushes.
        expect(stopsHistory("red@0|blue@100", "red@0|blue@90")).toBe("replace");
        expect(stopsHistory("red@0|blue@100", "red@0|lime@50|blue@100")).toBe("push");
        expect(stopsHistory(undefined, "red@0|lime@50|blue@100")).toBe("push");
    });
});

// ── Bindings over a real router ─────────────────────────────────────────────

const Blank = defineComponent({ render: () => null });

function makeRouter(): Router {
    return createRouter({
        history: createMemoryHistory(),
        routes: [
            { path: "/", name: "picker", component: Blank },
            { path: "/gradient", name: "gradient", component: Blank },
            { path: "/generate", name: "generate", component: Blank },
        ],
    });
}

interface Harness {
    router: Router;
    type: Ref<string>;
    angle: Ref<number>;
    switchView: (id: "picker" | "gradient" | "generate") => void;
    wrapper: VueWrapper;
}

const mounted: VueWrapper[] = [];
afterEach(() => {
    for (const w of mounted.splice(0)) w.unmount();
});

async function harness(at: string): Promise<Harness> {
    const router = makeRouter();
    await router.push(at);
    await router.isReady();
    const type = ref("linear");
    const angle = ref(90);
    let switchView!: Harness["switchView"];
    const App = defineComponent({
        setup() {
            switchView = useViewManager().switchView;
            useUrlState(["gradient"], [
                { key: "gt", state: type, codec: enumCodec(["linear", "radial", "conic"]), fallback: () => "linear", history: "push" },
                { key: "ga", state: angle, codec: numberCodec(0, 360), fallback: () => 90, history: "replace" },
            ]);
            return () => null;
        },
    });
    const wrapper = mount(App, { global: { plugins: [router] } });
    mounted.push(wrapper);
    await settle();
    return { router, type, angle, switchView, wrapper };
}

const settle = async (ms = 0) => {
    await new Promise((r) => setTimeout(r, ms));
    await nextTick();
    await new Promise((r) => setTimeout(r, 0));
    await nextTick();
};

describe("useUrlState over a router", () => {
    it("omits defaults; a discrete change pushes, a continuous one replaces", async () => {
        const { router, type, angle } = await harness("/gradient");
        expect(router.currentRoute.value.fullPath).toBe("/gradient");

        type.value = "radial";
        await settle();
        expect(router.currentRoute.value.query).toEqual({ gt: "radial" });

        angle.value = 45;
        angle.value = 50;
        await settle();
        expect(router.currentRoute.value.query.ga).toBeUndefined(); // waiting on the replace
        await settle(REPLACE_MS + 20);
        expect(router.currentRoute.value.query).toEqual({ gt: "radial", ga: "50" });

        // The angle REPLACED the radial entry, so one Back undoes the type and the angle.
        router.back();
        await settle(20);
        expect(router.currentRoute.value.fullPath).toBe("/gradient");
        expect(type.value).toBe("linear");
        expect(angle.value).toBe(90);

        router.forward();
        await settle(20);
        expect(type.value).toBe("radial");
        expect(angle.value).toBe(50);
    });

    it("a deep link applies on creation, and a mangled value reads as the default", async () => {
        const { type, angle, router } = await harness("/gradient?gt=conic&ga=999&color=red");
        expect(type.value).toBe("conic");
        expect(angle.value).toBe(360); // clamped
        const bad = await harness("/gradient?gt=spiral&ga=12");
        expect(bad.type.value).toBe("linear");
        expect(bad.angle.value).toBe(12);
        expect(router.currentRoute.value.query.color).toBe("red");
    });

    it("a view switch drops the pane's keys, keeps the colour, and Back restores the pane", async () => {
        const { router, type, switchView } = await harness("/gradient?gt=radial&color=red");
        switchView("generate");
        await settle(20);
        expect(router.currentRoute.value.name).toBe("generate");
        expect(router.currentRoute.value.query).toEqual({ color: "red" });

        // While Generate is up, the gradient's state is not in the address.
        type.value = "conic";
        await settle(20);
        expect(router.currentRoute.value.query.gt).toBeUndefined();

        // Returning by the dock writes the pane's live state.
        switchView("gradient");
        await settle(20);
        expect(router.currentRoute.value.query).toEqual({ color: "red", gt: "conic" });

        // Back to Generate, Back again to the radial entry.
        router.back();
        await settle(20);
        router.back();
        await settle(20);
        expect(router.currentRoute.value.name).toBe("gradient");
        expect(type.value).toBe("radial");
    });

    it("queryForView leaves undeclared keys alone", async () => {
        await harness("/gradient?gt=radial&debug=1");
        expect(queryForView("picker", { gt: "radial", debug: "1", color: "red" })).toEqual({
            debug: "1",
            color: "red",
        });
    });
});
