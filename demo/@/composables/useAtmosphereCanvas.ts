import {
    onBeforeUnmount,
    onMounted,
    reactive,
    watch,
    type Ref,
    type ShallowRef,
} from "vue";

// ── Local utilities ──

function clamp(v: number, lo: number, hi: number) {
    return Math.min(hi, Math.max(lo, v));
}

/** Resolve any CSS color string → [r, g, b] via a 1×1 canvas. */
function cssToRgb(css: string): [number, number, number] {
    if (!cssToRgb._ctx) {
        const c = document.createElement("canvas");
        c.width = c.height = 1;
        cssToRgb._ctx = c.getContext("2d", { willReadFrequently: true })!;
    }
    const ctx = cssToRgb._ctx;
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = "#808080";
    ctx.fillStyle = css;
    ctx.fillRect(0, 0, 1, 1);
    const d = ctx.getImageData(0, 0, 1, 1).data;
    return [d[0]!, d[1]!, d[2]!];
}
cssToRgb._ctx = null as CanvasRenderingContext2D | null;

function rgba(r: number, g: number, b: number, a: number): string {
    return `rgba(${r},${g},${b},${a})`;
}

// ── sRGB ↔ OKLCH ──

function srgbToLinear(x: number): number {
    return x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
}

function linearToSrgb(x: number): number {
    return x <= 0.0031308 ? 12.92 * x : 1.055 * x ** (1 / 2.4) - 0.055;
}

function rgbToOklch(r: number, g: number, b: number): [number, number, number] {
    const lr = srgbToLinear(r / 255);
    const lg = srgbToLinear(g / 255);
    const lb = srgbToLinear(b / 255);

    const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
    const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
    const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lb + 0.6299787005 * lb);

    const L = 0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s;
    const a = 1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s;
    const bVal = 0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s;

    const C = Math.sqrt(a * a + bVal * bVal);
    const H = ((Math.atan2(bVal, a) * 180) / Math.PI + 360) % 360;
    return [L, C, H];
}

function oklchToRgb(L: number, C: number, H: number): [number, number, number] {
    const hRad = (H * Math.PI) / 180;
    const a = C * Math.cos(hRad);
    const b = C * Math.sin(hRad);

    const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
    const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
    const s_ = L - 0.0894841775 * a - 1.2914855480 * b;

    const lr = 4.0767416621 * l_ ** 3 - 3.3077115913 * m_ ** 3 + 0.2309699292 * s_ ** 3;
    const lg = -1.2684380046 * l_ ** 3 + 2.6097574011 * m_ ** 3 - 0.3413193965 * s_ ** 3;
    const lb = -0.0041960863 * l_ ** 3 - 0.7034186147 * m_ ** 3 + 1.7076147010 * s_ ** 3;

    return [
        Math.round(clamp(linearToSrgb(lr), 0, 1) * 255),
        Math.round(clamp(linearToSrgb(lg), 0, 1) * 255),
        Math.round(clamp(linearToSrgb(lb), 0, 1) * 255),
    ];
}

// ── Config type ──

export interface AtmosphereConfig {
    /** Background opacity (0–1) */
    bgAlpha: number;
    /** Blur radius in px */
    blur: number;
    /** Animation speed multiplier */
    speed: number;
    /** Number of blobs to render */
    blobCount: number;
    /** Base radius as fraction of max(w,h) */
    blobBaseRadius: number;
    /** Radius increment per blob index */
    blobRadiusStep: number;
    /** Small blob radius multiplier (vs large) */
    smallRadiusScale: number;
    /** Peak alpha for large blobs */
    peakAlphaLarge: number;
    /** Peak alpha for small blobs */
    peakAlphaSmall: number;
    /** L shift magnitude for large blobs */
    lShiftLarge: number;
    /** L shift magnitude for small blobs */
    lShiftSmall: number;
    /** Hue shift for large blobs (degrees) */
    hueShiftLarge: number;
    /** Hue shift for small blobs (degrees) */
    hueShiftSmall: number;
    /** Orbit X amplitude as fraction of width */
    orbitX: number;
    /** Orbit Y amplitude as fraction of height */
    orbitY: number;
    /** Gradient stop 2 position (0–1) */
    gradStop2: number;
    /** Gradient stop 3 position (0–1) */
    gradStop3: number;
    /** Gradient stop 4 (fade-out) position (0–1) */
    gradStop4: number;
}

export const DEFAULT_ATMOSPHERE_CONFIG: AtmosphereConfig = {
    bgAlpha: 0.75,
    blur: 13,
    speed: 0.65,
    blobCount: 10,
    blobBaseRadius: 0.16,
    blobRadiusStep: 0.03,
    smallRadiusScale: 0.60,
    peakAlphaLarge: 0.80,
    peakAlphaSmall: 0.60,
    lShiftLarge: 0.15,
    lShiftSmall: 0.10,
    hueShiftLarge: 25,
    hueShiftSmall: 55,
    orbitX: 0.30,
    orbitY: 0.20,
    gradStop2: 0.30,
    gradStop3: 0.60,
    gradStop4: 1.00,
};

// ── Composable ──

export function useAtmosphereCanvas(
    canvasRef: Ref<HTMLCanvasElement | null> | ShallowRef<HTMLCanvasElement | null>,
    cssColor: Ref<string>,
    config?: AtmosphereConfig,
) {
    const cfg = config ?? reactive({ ...DEFAULT_ATMOSPHERE_CONFIG });

    let frame = 0;
    let observer: ResizeObserver | null = null;
    let surfaceRgb: [number, number, number] = [255, 255, 255];
    let baseOklch: [number, number, number] = [0.5, 0.1, 0];
    let running = false;

    const reducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const motionScale = reducedMotion ? 0.22 : 1;

    const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
    const isSafari = /Safari/i.test(ua) && !/Chrom(e|ium)|Android/i.test(ua);
    const isLowPower = (navigator?.hardwareConcurrency ?? 8) <= 4;
    const dprMax = isSafari || isLowPower ? 1.6 : 2;
    const blurScale = isSafari || isLowPower ? 0.82 : 1;

    function updatePalette(css: string) {
        const rgb = cssToRgb(css);
        surfaceRgb = rgb;
        baseOklch = rgbToOklch(rgb[0], rgb[1], rgb[2]);
    }

    /** Build blob colors on-the-fly from current config + base OKLCH. */
    function buildBlobColors(): Array<[number, number, number]> {
        const [L, C, H] = baseOklch;
        const count = cfg.blobCount;
        const colors: Array<[number, number, number]> = [];

        for (let i = 0; i < count; i++) {
            const isSmall = i >= Math.ceil(count / 2);
            const lShift = isSmall ? cfg.lShiftSmall : cfg.lShiftLarge;
            const hShift = isSmall ? cfg.hueShiftSmall : cfg.hueShiftLarge;

            // Alternate +/- for L, spread hue evenly
            const sign = i % 2 === 0 ? 1 : -1;
            const lAmount = lShift * (0.5 + (i / count) * 0.5) * sign;
            const hAmount = hShift * ((i + 1) / count) * (i % 3 === 0 ? -1 : 1);

            colors.push(
                oklchToRgb(
                    clamp(L + lAmount, 0, 1),
                    C,
                    (H + hAmount + 360) % 360,
                ),
            );
        }
        return colors;
    }

    function stop() {
        running = false;
        cancelAnimationFrame(frame);
        observer?.disconnect();
        observer = null;
    }

    function start() {
        stop();

        const canvas = canvasRef.value;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        running = true;

        const resize = () => {
            const w = canvas.clientWidth;
            const h = canvas.clientHeight;
            if (w === 0 || h === 0) return;
            const dpr = Math.min(window.devicePixelRatio || 1, dprMax);
            canvas.width = Math.floor(w * dpr);
            canvas.height = Math.floor(h * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        resize();
        observer = new ResizeObserver(resize);
        observer.observe(canvas);

        updatePalette(cssColor.value);

        const render = (now: number) => {
            if (!running) return;

            const w = canvas.clientWidth;
            const h = canvas.clientHeight;
            if (w === 0 || h === 0) {
                frame = requestAnimationFrame(render);
                return;
            }

            const t = now * 0.001 * motionScale * cfg.speed;
            const dim = Math.max(w, h);
            const blobColors = buildBlobColors();
            const count = blobColors.length;
            const blur = cfg.blur * blurScale;

            // Surface fill
            ctx.globalAlpha = cfg.bgAlpha;
            ctx.globalCompositeOperation = "source-over";
            ctx.filter = "none";
            ctx.fillStyle = rgba(surfaceRgb[0], surfaceRgb[1], surfaceRgb[2], 1);
            ctx.fillRect(0, 0, w, h);

            // Blobs
            ctx.globalAlpha = 1;
            ctx.save();
            ctx.filter = `blur(${blur}px) saturate(140%)`;

            for (let i = 0; i < count; i++) {
                const c = blobColors[i]!;
                const isSmall = i >= Math.ceil(count / 2);
                const r = dim * (isSmall
                    ? cfg.blobBaseRadius * cfg.smallRadiusScale + i * cfg.blobRadiusStep * 0.5
                    : cfg.blobBaseRadius + i * cfg.blobRadiusStep);
                const phase = i * ((Math.PI * 2) / count);
                const ox = w * cfg.orbitX;
                const oy = h * cfg.orbitY;
                const x =
                    w * 0.5 +
                    Math.sin(t * (0.4 + i * 0.15) + phase) * ox +
                    Math.cos(t * 0.2 + i) * ox * 0.5;
                const y =
                    h * 0.5 +
                    Math.cos(t * (0.35 + i * 0.12) + phase) * oy +
                    Math.sin(t * 0.18 + i) * oy * 0.6;

                const peakAlpha = isSmall ? cfg.peakAlphaSmall : cfg.peakAlphaLarge;
                const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
                grad.addColorStop(0, rgba(c[0], c[1], c[2], peakAlpha));
                grad.addColorStop(cfg.gradStop2, rgba(c[0], c[1], c[2], peakAlpha * 0.6));
                grad.addColorStop(cfg.gradStop3, rgba(c[0], c[1], c[2], peakAlpha * 0.2));
                grad.addColorStop(cfg.gradStop4, rgba(c[0], c[1], c[2], 0));

                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(x, y, r, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.restore();
            frame = requestAnimationFrame(render);
        };

        frame = requestAnimationFrame(render);
    }

    watch(cssColor, (css) => updatePalette(css));

    if (typeof window !== "undefined") {
        const mo = new MutationObserver(() => updatePalette(cssColor.value));
        mo.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });
        onBeforeUnmount(() => mo.disconnect());
    }

    onMounted(() => start());

    watch(canvasRef, (el) => {
        if (el && !running) start();
    });

    onBeforeUnmount(() => stop());

    return cfg;
}
