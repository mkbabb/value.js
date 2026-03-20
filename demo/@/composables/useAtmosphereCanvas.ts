import { onBeforeUnmount, onMounted, watch, type Ref, type ShallowRef } from "vue";

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

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const l = (max + min) / 2;
    if (max === min) return [0, 0, l];
    const d = max - min;
    const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    let h = 0;
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
    return [h, s, l];
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
    if (s === 0) { const v = Math.round(l * 255); return [v, v, v]; }
    const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1; if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    return [
        Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
        Math.round(hue2rgb(p, q, h) * 255),
        Math.round(hue2rgb(p, q, h - 1 / 3) * 255),
    ];
}

function shiftHue(rgb: [number, number, number], degrees: number, satDelta: number, lightDelta: number): [number, number, number] {
    const [h, s, l] = rgbToHsl(rgb[0], rgb[1], rgb[2]);
    return hslToRgb(
        ((h + degrees / 360) % 1 + 1) % 1,
        clamp(s + satDelta, 0, 1),
        clamp(l + lightDelta, 0, 1),
    );
}

/** Mix two RGB colors by t (0 = a, 1 = b). */
function mixRgb(a: [number, number, number], b: [number, number, number], t: number): [number, number, number] {
    return [
        Math.round(a[0] + (b[0] - a[0]) * t),
        Math.round(a[1] + (b[1] - a[1]) * t),
        Math.round(a[2] + (b[2] - a[2]) * t),
    ];
}

function rgba(r: number, g: number, b: number, a: number): string {
    return `rgba(${r},${g},${b},${a})`;
}

// ── Composable ──

export function useAtmosphereCanvas(
    canvasRef: Ref<HTMLCanvasElement | null> | ShallowRef<HTMLCanvasElement | null>,
    cssColor: Ref<string>,
) {
    let frame = 0;
    let observer: ResizeObserver | null = null;
    let surfaceRgb: [number, number, number] = [255, 255, 255];
    let blobColors: Array<[number, number, number]> = [];
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

    function isDark(): boolean {
        return document.documentElement.classList.contains("dark");
    }

    function updatePalette(css: string) {
        const colorRgb = cssToRgb(css);
        const dark = isDark();

        // Surface: gently tinted toward the current color
        const anchor: [number, number, number] = dark ? [75, 75, 80] : [255, 255, 255];
        surfaceRgb = mixRgb(anchor, colorRgb, dark ? 0.65 : 0.35);

        // Blobs: many small variations of the actual color
        blobColors = [
            colorRgb,                                      // the color itself
            shiftHue(colorRgb, 15, 0.05, 0.08),           // warm, slightly lighter
            shiftHue(colorRgb, -20, 0.03, -0.10),         // cool, slightly darker
            shiftHue(colorRgb, 35, -0.03, 0.14),          // warm shift
            shiftHue(colorRgb, -40, 0.10, -0.18),         // cool, saturated
            shiftHue(colorRgb, 55, 0.0, 0.05),            // accent
            shiftHue(colorRgb, -10, 0.08, 0.06),          // near-hue warm
            shiftHue(colorRgb, 80, -0.05, -0.08),         // far accent
            shiftHue(colorRgb, -55, 0.06, 0.12),          // complementary hint
            shiftHue(colorRgb, 40, 0.12, -0.12),          // saturated shift
        ];
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

        const speed = 0.5;
        const blur = 60 * blurScale;

        const render = (now: number) => {
            if (!running) return;

            const w = canvas.clientWidth;
            const h = canvas.clientHeight;
            if (w === 0 || h === 0) {
                frame = requestAnimationFrame(render);
                return;
            }

            const t = now * 0.001 * motionScale * speed;
            const dim = Math.max(w, h);
            const count = blobColors.length;

            // Surface fill: muted half-tint of the color
            ctx.globalAlpha = 1;
            ctx.globalCompositeOperation = "source-over";
            ctx.filter = "none";
            ctx.fillStyle = rgba(surfaceRgb[0], surfaceRgb[1], surfaceRgb[2], 1);
            ctx.fillRect(0, 0, w, h);

            // Blobs: full-color variations orbiting across the surface
            ctx.save();
            ctx.filter = `blur(${blur}px) saturate(140%)`;

            for (let i = 0; i < count; i++) {
                const c = blobColors[i]!;
                const r = dim * (0.18 + i * 0.025);
                const phase = i * (Math.PI * 2 / count);
                const orbitX = w * 0.25;
                const orbitY = h * 0.2;
                const x = w * 0.5 + Math.sin(t * (0.4 + i * 0.15) + phase) * orbitX + Math.cos(t * 0.2 + i) * orbitX * 0.5;
                const y = h * 0.5 + Math.cos(t * (0.35 + i * 0.12) + phase) * orbitY + Math.sin(t * 0.18 + i) * orbitY * 0.6;

                const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
                grad.addColorStop(0, rgba(c[0], c[1], c[2], 0.4));
                grad.addColorStop(0.2, rgba(c[0], c[1], c[2], 0.25));
                grad.addColorStop(0.45, rgba(c[0], c[1], c[2], 0.1));
                grad.addColorStop(0.7, rgba(c[0], c[1], c[2], 0.03));
                grad.addColorStop(1, rgba(c[0], c[1], c[2], 0));

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

    // Re-derive palette when dark mode toggles
    if (typeof window !== "undefined") {
        const mo = new MutationObserver(() => updatePalette(cssColor.value));
        mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
        onBeforeUnmount(() => mo.disconnect());
    }

    onMounted(() => start());

    watch(canvasRef, (el) => {
        if (el && !running) start();
    });

    onBeforeUnmount(() => stop());
}
