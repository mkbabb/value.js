/**
 * useImageSampler — image-loading + pixel-sampling concern for ImageEyedropper.
 *
 * Owns the ONE image canvas, the loaded image dimensions, and the
 * `sampleAt(rx, ry)` + `viewportToImage(rx, ry)` operations.
 *
 * X.W7.g3 (EY-23): the visible canvas IS the sampled canvas. Its former
 * native-resolution offscreen twin held a second full copy of the image that
 * only the sampler and the loupe read — both now read the visible one, which
 * is created with `willReadFrequently`, so the image is retained once. The shell wires
 * the gesture composable's panX/panY/zoom refs in via the `getTransform`
 * accessor.
 *
 * Extracted from `ImageEyedropper.vue` at D.W3 Lane A (De §2.4 split).
 */
import { ref, type Ref } from "vue";
import type { SpaceId } from "@mkbabb/value.js/color";
import { parseCssColor } from "@mkbabb/value.js/css";
import {
    CSS_PICKER_SPACES,
    convertPickerColor,
    serializePickerColor,
    type PickerColor,
} from "../../../../color-session/picker-color";

export type DisplayColorSpace = SpaceId | "hex";

export interface ImageSamplerDeps {
    /** The visible canvas: painted once, then read by the sampler and the loupe. */
    canvasRef: Readonly<Ref<HTMLCanvasElement | null>>;
    /** Returns the current pan + zoom transform from the gesture composable. */
    getTransform: () => { panX: number; panY: number; zoom: number };
    /** Display color space for the sampled-color readout. */
    colorSpace: () => DisplayColorSpace;
}

function formatHex(r: number, g: number, b: number): string {
    const hex = (v: number) => v.toString(16).padStart(2, "0");
    return `#${hex(r)}${hex(g)}${hex(b)}`;
}

/** Product readout for the four spaces that deliberately have no CSS spelling. */
function formatLibraryColor(color: PickerColor): string {
    const channels = color.channels.map((channel) => channel === "none"
        ? channel
        : Number(channel.toFixed(4)).toString());
    const alpha = color.alpha === 1 ? "" : ` · α ${color.alpha}`;
    return `${color.space.toUpperCase()} ${channels.join(" · ")}${alpha}`;
}

/**
 * The photo, decoded once (color-40 N-5). `decode()` runs off the main thread
 * before the draw (a bare `drawImage` decoded a 12 MP photo synchronously,
 * 273 ms at 4x), and the last photo is kept, so opening the eyedropper again
 * on the same photo decodes nothing.
 */
let lastDecoded: { url: string; img: Promise<HTMLImageElement> } | null = null;
function decodedImage(url: string): Promise<HTMLImageElement> {
    if (lastDecoded?.url === url) return lastDecoded.img;
    const img = new Promise<HTMLImageElement>((resolve, reject) => {
        const el = new Image();
        el.crossOrigin = "anonymous";
        el.onload = () => resolve(typeof el.decode === "function" ? el.decode().then(() => el, () => el) : el);
        el.onerror = reject;
        el.src = url;
    });
    lastDecoded = { url, img };
    img.catch(() => {
        if (lastDecoded?.img === img) lastDecoded = null;
    });
    return img;
}

export function useImageSampler(deps: ImageSamplerDeps) {
    /** The visible canvas's 2D context, readable (null until an image is painted). */
    let ctx: CanvasRenderingContext2D | null = null;

    const imgWidth = ref(0);
    const imgHeight = ref(0);
    const imageLoaded = ref(false);

    function formatInColorSpace(hex: string): string {
        const space = deps.colorSpace();
        if (space === "hex") return hex;
        const parsed = parseCssColor(hex);
        if (!parsed.ok) {
            throw new Error(`[ImageSampler] generated hex failed to parse: ${parsed.diagnostics[0].code}`);
        }
        const converted = convertPickerColor(parsed.value, space);
        return CSS_PICKER_SPACES.has(space)
            ? serializePickerColor(converted)
            : formatLibraryColor(converted);
    }

    async function loadImage(imageUrl: string) {
        const img = await decodedImage(imageUrl);

        imgWidth.value = img.naturalWidth;
        imgHeight.value = img.naturalHeight;

        const canvas = deps.canvasRef.value;
        if (!canvas) return;
        canvas.width = imgWidth.value;
        canvas.height = imgHeight.value;
        ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return;
        ctx.drawImage(img, 0, 0);

        imageLoaded.value = true;
    }

    function dispose() {
        ctx = null;
        imageLoaded.value = false;
    }

    function viewportToImage(rx: number, ry: number) {
        const { panX, panY, zoom } = deps.getTransform();
        return {
            ix: Math.floor((rx - panX) / zoom),
            iy: Math.floor((ry - panY) / zoom),
        };
    }

    /**
     * The colour at a viewport point. `footprint` is the side, in source px, of
     * the square that is averaged (color-40 N-4: the lens's reticle; one source pixel
     * of a fitted 12 MP photo is noise). The point is clamped to the image.
     */
    function sampleAt(rx: number, ry: number, footprint = 1) {
        if (!ctx) return null;
        const w = imgWidth.value;
        const h = imgHeight.value;
        if (!w || !h) return null;
        const raw = viewportToImage(rx, ry);
        const ix = Math.min(w - 1, Math.max(0, raw.ix));
        const iy = Math.min(h - 1, Math.max(0, raw.iy));
        const n = Math.max(1, Math.min(128, Math.round(footprint)));
        const half = Math.floor(n / 2);
        const x0 = Math.max(0, ix - half);
        const y0 = Math.max(0, iy - half);
        const sw = Math.min(w - x0, n);
        const sh = Math.min(h - y0, n);
        const data = ctx.getImageData(x0, y0, sw, sh).data;
        let r = 0;
        let g = 0;
        let b = 0;
        const count = sw * sh;
        for (let i = 0; i < count; i++) {
            r += data[i * 4] ?? 0;
            g += data[i * 4 + 1] ?? 0;
            b += data[i * 4 + 2] ?? 0;
        }
        const hex = formatHex(Math.round(r / count), Math.round(g / count), Math.round(b / count));
        return { hex, formatted: formatInColorSpace(hex) };
    }

    /** The painted image canvas, for the loupe (null until an image is painted). */
    function getImageCanvas(): HTMLCanvasElement | null {
        return ctx ? ctx.canvas : null;
    }

    return {
        // state
        imgWidth,
        imgHeight,
        imageLoaded,
        // ops
        loadImage,
        dispose,
        viewportToImage,
        sampleAt,
        formatInColorSpace,
        getImageCanvas,
    };
}
