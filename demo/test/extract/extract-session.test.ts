/**
 * X.W7.g3 · the XP-EXTRACT session cluster — measured on the real session.
 *
 *   · EY-12 — the session lives ABOVE any one mount: a breakpoint-crossing
 *     remount (the region swap) re-attaches to the same image, palette, k and
 *     overlay instead of destroying them.
 *   · EY-23 / R-24 — the preview is an object URL of the user's own File (no
 *     base64 re-encode), revoked when a later file replaces it.
 *   · R-30 — the decoded pixel buffer is TRANSFERRED to the worker, not copied.
 *
 * Stubs sit only at the platform boundary jsdom lacks: the decoder
 * (`createImageBitmap` / `OffscreenCanvas`), the object-URL registry, and the
 * worker (an in-thread echo of the real message contract).
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { defineComponent, h, nextTick } from "vue";
import { flushPromises, mount } from "@vue/test-utils";

const worker = vi.hoisted(() => ({
    transfers: [] as ArrayBuffer[][],
    /** The result palette the echo returns (null = the one-colour default). */
    palette: null as { color: unknown; population: number }[] | null,
}));

vi.mock("../../workbenches/extract/quantize-worker?worker", () => ({
    default: class {
        onmessage: ((e: MessageEvent) => void) | null = null;
        onerror: (() => void) | null = null;
        postMessage(req: { id: number }, transfer: ArrayBuffer[]) {
            worker.transfers.push(transfer);
            const color = { space: "oklch", channels: [0.6, 0.1, 30], alpha: 1 };
            queueMicrotask(() =>
                this.onmessage?.({
                    data: { id: req.id, type: "result", palette: worker.palette ?? [{ color, population: 4 }] },
                } as MessageEvent),
            );
        }
        terminate() {}
    },
}));

const decodedBuffers: ArrayBuffer[] = [];
const urls = { minted: [] as string[], revoked: [] as string[] };

beforeEach(() => {
    vi.resetModules();
    worker.transfers = [];
    worker.palette = null;
    urls.minted = [];
    urls.revoked = [];
    let n = 0;
    URL.createObjectURL = vi.fn(() => {
        const u = `blob:test/${++n}`;
        urls.minted.push(u);
        return u;
    });
    URL.revokeObjectURL = vi.fn((u: string) => void urls.revoked.push(u));
    const data = new Uint8ClampedArray(16).fill(200);
    vi.stubGlobal("createImageBitmap", async () => ({ width: 2, height: 2, close() {} }));
    vi.stubGlobal(
        "OffscreenCanvas",
        class {
            constructor(
                public width: number,
                public height: number,
            ) {}
            getContext() {
                return {
                    drawImage() {},
                    getImageData: () => {
                        const d = new Uint8ClampedArray(data);
                        decodedBuffers.push(d.buffer);
                        return { data: d };
                    },
                };
            }
        },
    );
});

afterEach(() => {
    vi.unstubAllGlobals();
});

async function holder() {
    const { useExtractSession } = await import(
        "../../workbenches/extract/composables/useExtractSession"
    );
    let session!: ReturnType<typeof useExtractSession>;
    const Host = defineComponent({
        setup() {
            session = useExtractSession();
            return () => h("div");
        },
    });
    return { Host, get: () => session };
}

const png = () => new File([new Uint8Array([1, 2, 3])], "a.png", { type: "image/png" });

describe("extract session", () => {
    it("EY-12: a remount re-attaches to the same session (image, palette, k, overlay)", async () => {
        const { Host, get } = await holder();
        const first = mount(Host);
        get().onKChange(7);
        await get().onFile(png());
        await flushPromises();
        get().eyedropperOpen.value = true;
        const before = {
            preview: get().previewUrl.value,
            palette: get().extractedPalette.value?.colors.length,
        };
        expect(before.preview).toMatch(/^blob:/);
        expect(before.palette).toBe(1);

        // the region swap: the old mount leaves, a new one arrives
        first.unmount();
        mount(Host);
        await nextTick();
        expect(get().previewUrl.value).toBe(before.preview);
        expect(get().extractedPalette.value?.colors.length).toBe(1);
        expect(get().colorCount.value).toBe(7);
        expect(get().eyedropperOpen.value).toBe(true);
    });

    it("EY-23 / R-24: the preview is an object URL, revoked when a later file replaces it", async () => {
        const { Host, get } = await holder();
        mount(Host);
        await get().onFile(png());
        await flushPromises();
        const firstUrl = get().previewUrl.value;
        await get().onFile(png());
        await flushPromises();
        expect(urls.minted).toHaveLength(2);
        expect(urls.revoked).toEqual([firstUrl]);
        expect(get().previewUrl.value).toBe(urls.minted[1]);
    });

    it("R-30: the decoded buffer is transferred, never copied first", async () => {
        const { Host, get } = await holder();
        mount(Host);
        await get().onFile(png());
        await flushPromises();
        expect(worker.transfers).toHaveLength(1);
        const [buffer] = worker.transfers[0]!;
        // a transferred buffer is the decoder's own: 2×2×4 bytes, the same object
        expect(buffer!.byteLength).toBe(16);
        expect(buffer).toBe(decodedBuffers.at(-1));
    });

    it("EC-10: the k rail paints the returned palette as hard bands, and reads null before a run", async () => {
        worker.palette = [
            { color: { space: "oklch", channels: [0.6, 0.1, 30], alpha: 1 }, population: 4 },
            { color: { space: "oklch", channels: [0.4, 0.12, 200], alpha: 1 }, population: 3 },
            { color: { space: "oklch", channels: [0.8, 0.05, 90], alpha: 1 }, population: 2 },
        ];
        const { Host, get } = await holder();
        mount(Host);
        // the empty arm: no colour token, no gradient — the rail shows only its ink
        expect(get().kSliderGradient.value).toBeNull();
        await get().onFile(png());
        await flushPromises();
        const colors = get().extractedPalette.value!.colors.map((c) => c.css);
        expect(colors).toHaveLength(3);
        // one equal band per returned colour; each band opens where the last closed
        expect(get().kSliderGradient.value).toBe(
            `linear-gradient(to right, ${colors[0]} 0% 33.3333%, ${colors[1]} 33.3333% 66.6667%, ${colors[2]} 66.6667% 100%)`,
        );
    });
});
