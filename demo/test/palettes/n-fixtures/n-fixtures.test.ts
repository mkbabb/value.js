/**
 * X.W7.c — G10, the N-fixture battery (W7.md §6 G10; G8 tag truth rides it).
 *
 * Every assertion is against the fixture's OWN N, so a regression names the
 * boundary it broke. Colors 0,1,2,5,50,200,201 · tags 0,1,2,3,10,11. The mounted
 * surfaces are the shipped SFCs: `PaletteSpecimen` (the counts), the
 * `PaletteColorStrip` it draws, `PaletteCardMeta` (tags + the `+N` reveal), and
 * the certified PNG serializer the export path ships (N-invariant raster).
 * Layout-bearing clauses (no overflow, height law) are the browser suite's
 * (`palette-card-layout.test.ts`) — jsdom has no layout.
 */
import { afterEach, describe, expect, it } from "vitest";
import { mount, type VueWrapper } from "@vue/test-utils";
import { nextTick } from "vue";
import PaletteSpecimen from "../../../palettes/browser/card/PaletteSpecimen.vue";
import PaletteCardMeta from "../../../palettes/browser/card/PaletteCard/PaletteCardMeta.vue";
import { captureSnapshot } from "../../../palettes/export/capture";
import { serializePng } from "../../../palettes/export/png";
import { COLOR_NS, TAG_NS, fixtureColors, fixturePalette, fixtureTags } from "./fixtures";

const mounted: VueWrapper[] = [];
afterEach(() => {
    while (mounted.length) mounted.pop()!.unmount();
    document.body.innerHTML = "";
});

function track<T extends VueWrapper>(w: T): T {
    mounted.push(w);
    return w;
}

describe("G10 · colors — the displayed count and the strip equal N", () => {
    for (const n of COLOR_NS) {
        it(`N_colors = ${n}`, () => {
            const palette = fixturePalette({ colors: fixtureColors(n) });
            const w = track(mount(PaletteSpecimen, { props: { palette } }));
            expect(w.get('[data-count="colors"]').text()).toBe(String(n));

            const strip = w.get("[data-color-strip]");
            const bands = strip.findAll("[data-band]");
            if (n < 100) {
                // One band per colour, every band a share of the strip (flex
                // grow = weight, basis 0) — nothing sized past 100%.
                expect(bands).toHaveLength(n);
                for (const [i, band] of bands.entries()) {
                    const style = band.attributes("style") ?? "";
                    expect(style).toMatch(/flex: 1 1 0/);
                    expect(style).not.toMatch(/width:/);
                    expect((band.element as HTMLElement).style.backgroundColor).not.toBe("");
                    expect(i).toBeLessThan(n);
                }
            } else {
                // Past the legibility threshold the strip SUMMARIZES — and the
                // summary still carries every one of the N colours.
                expect(bands).toHaveLength(0);
                expect(strip.attributes("data-summary")).toBe("true");
                const image = (strip.element as HTMLElement).style.backgroundImage;
                const stops = image.match(/hsl\(/g) ?? [];
                expect(stops).toHaveLength(n);
            }
        });
    }

    it("weighted bands keep the documented 8% floor as a real min size (PCS-1)", () => {
        const colors = fixtureColors(5).map((c, i) => ({ ...c, weight: i === 0 ? 1 : 1000 }));
        const w = track(mount(PaletteSpecimen, { props: { palette: fixturePalette({ colors }) } }));
        const first = w.findAll("[data-band]")[0]!.element as HTMLElement;
        expect(first.style.flex).toBe("1 1 0px");
        expect(first.style.minWidth).toBe("8%");
    });
});

describe("G8 · G10 · tags — every tag is reachable, and +N counts what it hides", () => {
    for (const n of TAG_NS) {
        it(`N_tags = ${n}`, async () => {
            const tags = fixtureTags(n, 30);
            const palette = fixturePalette({ tags });
            const w = track(mount(PaletteCardMeta, { props: { palette }, attachTo: document.body }));

            const chips = w.findAll("[data-tag-chip]").map((c) => c.attributes("title"));
            // Chips render the leading tags in order, each titled with its full
            // string (the 9ch truncation never loses the name).
            expect(chips).toEqual(tags.slice(0, chips.length));

            const more = w.find("[data-tag-more]");
            if (n === 0) {
                expect(more.exists()).toBe(false);
                return;
            }
            expect(more.attributes("aria-label")).toBe(`Show all ${n} tags`);
            // One `+N` label per declared band: band k renders k chips.
            const labels = more.findAll(".palette-meta__band").map((b) => b.text());
            expect(labels).toEqual(
                [0, 1, 2, 3].map((k) => (n - Math.min(k, n) > 0 ? `+${n - Math.min(k, n)}` : "")),
            );

            // The reveal: the +N chip opens the WHOLE set.
            await more.trigger("click");
            await nextTick();
            const revealed = Array.from(document.body.querySelectorAll("[data-tag-all]")).map(
                (li) => li.textContent,
            );
            expect(revealed).toEqual(tags);
        });
    }
});

describe("G10 · the export raster is N-invariant", () => {
    function ihdr(bytes: Uint8Array): [number, number] {
        const dv = new DataView(bytes.buffer, bytes.byteOffset);
        return [dv.getUint32(16, false), dv.getUint32(20, false)];
    }

    for (const n of COLOR_NS) {
        it(`N_colors = ${n}`, async () => {
            // A device draft — the export source a local palette carries.
            const captured = await captureSnapshot(
                fixturePalette({ colors: fixtureColors(n), isLocal: true, id: "fixture-draft" }),
            );
            if (n === 0 || n > 50) {
                // Outside the server's 1..50 bound the export refuses LOUDLY —
                // never a blank or a null blob.
                expect(captured.ok).toBe(false);
                if (!captured.ok) {
                    expect(captured.failureCode).toBe(n === 0 ? "snapshot_empty" : "snapshot_over_cap");
                }
                return;
            }
            expect(captured.ok).toBe(true);
            if (!captured.ok) return;
            const png = serializePng(captured.snapshot);
            expect(png.ok).toBe(true);
            if (png.ok) expect(ihdr(png.bytes)).toEqual([1200, 240]);
        });
    }
});
