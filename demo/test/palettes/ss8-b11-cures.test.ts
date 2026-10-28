/**
 * SS-8 · B11-browse-search-dialogs — the marker cure falsifier (SS8-0309's
 * focus falsifier is a live one: `e2e/smoke/flows/palette-flag.spec.ts`).
 *
 *   · SS8-0319 / SS8-0323 (MiniColorPicker, MCP-16's X-W7 rider): the markers
 *     wore a fixed white border + black/40 ring that read 1.27-2.86:1 on light
 *     fields. Each marker's ring must clear WCAG 1.4.11's 3:1 against the
 *     field under it, at every field the instrument can paint.
 */
import { afterEach, describe, expect, it } from "vitest";
import { flushPromises, mount, type VueWrapper } from "@vue/test-utils";
import MiniColorPicker from "../../palettes/browser/search/MiniColorPicker.vue";

const mounted: VueWrapper[] = [];
afterEach(() => {
    while (mounted.length) mounted.pop()!.unmount();
    document.body.innerHTML = "";
});

const settle = async () => {
    await flushPromises();
    await new Promise((r) => setTimeout(r, 20));
    await flushPromises();
};

// ── SS8-0319 / SS8-0323 ─────────────────────────────────────────────────────

type RGB = [number, number, number];

function hsvToRgb(h: number, s: number, v: number): RGB {
    const f = (n: number) => {
        const k = (n + h / 60) % 6;
        return v - v * s * Math.max(0, Math.min(k, 4 - k, 1));
    };
    return [f(5) * 255, f(3) * 255, f(1) * 255];
}

function parseColor(css: string): RGB {
    const hex = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(css.trim());
    if (hex) return [parseInt(hex[1]!, 16), parseInt(hex[2]!, 16), parseInt(hex[3]!, 16)];
    const rgb = /rgba?\(\s*([\d.]+)[ ,]+([\d.]+)[ ,]+([\d.]+)/.exec(css);
    if (rgb) return [Number(rgb[1]), Number(rgb[2]), Number(rgb[3])];
    const hsl = /hsl\(\s*([\d.]+)/.exec(css);
    if (hsl) return hsvToRgb(Number(hsl[1]), 1, 1); // hsl(h, 100%, 50%) ≡ hsv(h, 1, 1)
    throw new Error(`unparsed colour: ${css}`);
}

function luminance([r, g, b]: RGB): number {
    const lin = (c: number) => {
        const x = c / 255;
        return x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function contrast(a: RGB, b: RGB): number {
    const [la, lb] = [luminance(a), luminance(b)];
    return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

/** The ring a marker paints: its inline ink, else the shipped `border-white`. */
function ringInk(el: HTMLElement): RGB {
    if (el.style.borderColor) return parseColor(el.style.borderColor);
    if (el.classList.contains("border-white")) return [255, 255, 255];
    throw new Error("marker paints no ring");
}

async function markers(hex: string) {
    const w = mount(MiniColorPicker, { props: { open: true, hex }, attachTo: document.body });
    mounted.push(w);
    await settle();
    const canvas = document.querySelector<HTMLElement>(".sv-canvas")!;
    const thumb = canvas.querySelector<HTMLElement>(":scope > div")!;
    const handle = canvas.nextElementSibling!.querySelector<HTMLElement>(":scope > div")!;
    return { thumb, handle };
}

// The packet's three located fields (default, light, hue-60 light), then a sweep
// of the plate's saturated rim, its pale corner and its dark floor.
const FIELDS = [
    "#4488cc",
    "#ceddeb",
    "#e5e5ac",
    ...Array.from({ length: 24 }, (_, i) => i * 15).flatMap((h) =>
        (
            [
                [1, 1],
                [0.15, 0.95],
                [0.6, 0.35],
            ] as const
        ).map(([s, v]) => {
            const rgb = hsvToRgb(h, s, v).map((c) => Math.round(c));
            return `#${rgb.map((c) => c.toString(16).padStart(2, "0")).join("")}`;
        }),
    ),
];

describe("SS8-0319 / SS8-0323 · MiniColorPicker markers clear 3:1 against their field", () => {
    it.each(FIELDS)("thumb and rail handle at %s", async (hex) => {
        const { thumb, handle } = await markers(hex);
        // The thumb sits on the plate at its own colour: the field under it IS the fill.
        const field = parseColor(thumb.style.background || thumb.style.backgroundColor);
        expect(contrast(ringInk(thumb), field)).toBeGreaterThanOrEqual(3);
        // The rail under the handle is the hue's pure colour (the handle's fill).
        const rail = parseColor(handle.style.background || handle.style.backgroundColor);
        expect(contrast(ringInk(handle), rail)).toBeGreaterThanOrEqual(3);
    });
});
