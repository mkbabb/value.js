/**
 * Mixing animation — multi-section fill effect.
 *
 * Each selected color fills a section of the canvas from a random corner,
 * growing as a rounded rectangle toward center. Colors layer and blend
 * via canvas blur. The final mixed color suffuses the area, then shrinks
 * into the center where the result swatch appears.
 *
 * Phases:
 * 1. **gathering** — sections grow from random corners (staggered)
 * 2. **mixing** — all sections merge into the mixed color
 * 3. **revealing** — filled area shrinks to swatch-sized rect at center
 */

import { watch, onBeforeUnmount } from "vue";
import type { Ref } from "vue";
import type { AnimationPhase } from "./useMixingState";

interface FillSection {
    color: [number, number, number];
    originX: number; // 0 or 1 (which corner)
    originY: number; // 0 or 1
    progress: number;
    alpha: number;
    entryDelay: number;
}

function cssToRgb(css: string): [number, number, number] {
    if (typeof document === "undefined") return [128, 128, 128];
    const el = document.createElement("div");
    el.style.color = css;
    el.style.display = "none";
    document.body.appendChild(el);
    const computed = getComputedStyle(el).color;
    document.body.removeChild(el);
    const match = computed.match(/\d+/g);
    if (match && match.length >= 3) {
        return [parseInt(match[0]!), parseInt(match[1]!), parseInt(match[2]!)];
    }
    return [128, 128, 128];
}

function rgba(r: number, g: number, b: number, a: number): string {
    return `rgba(${r},${g},${b},${a.toFixed(3)})`;
}

function easeOutCubic(t: number): number {
    return 1 - Math.pow(1 - t, 3);
}

function easeInQuad(t: number): number {
    return t * t;
}

function lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
}

// Random corner assignment: distribute sections to different corners
const CORNERS: [number, number][] = [[0, 0], [1, 0], [1, 1], [0, 1]];

export function useMixingAnimation(
    canvasRef: Ref<HTMLCanvasElement | null>,
    colorCSSList: Ref<string[]>,
    phase: Ref<AnimationPhase>,
) {
    let frame: number | null = null;
    let sections: FillSection[] = [];
    let phaseStartTime = 0;
    let running = false;

    const FILL_DURATION = 1800;
    const SUFFUSE_DURATION = 600;
    const SHRINK_DURATION = 600;
    const STAGGER = 200;

    function createSections(colors: string[]): FillSection[] {
        return colors.map((css, i) => {
            const corner = CORNERS[i % CORNERS.length]!;
            return {
                color: cssToRgb(css),
                originX: corner[0],
                originY: corner[1],
                progress: 0,
                alpha: 0,
                entryDelay: i * STAGGER,
            };
        });
    }

    function render(now: number) {
        if (!running) return;
        const canvas = canvasRef.value;
        if (!canvas) { frame = requestAnimationFrame(render); return; }
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        if (w === 0 || h === 0) { frame = requestAnimationFrame(render); return; }

        const dpr = window.devicePixelRatio || 2;
        if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        const elapsed = now - phaseStartTime;
        const currentPhase = phase.value;

        ctx.clearRect(0, 0, w, h);

        if (currentPhase === "idle" || currentPhase === "done") {
            if (currentPhase === "done") { running = false; return; }
            frame = requestAnimationFrame(render);
            return;
        }

        ctx.save();
        ctx.filter = "blur(16px) saturate(120%)";

        const maxDim = Math.max(w, h) * 1.6;

        if (currentPhase === "gathering") {
            // Each section grows from its corner
            for (const sec of sections) {
                const t = Math.max(0, Math.min(1, (elapsed - sec.entryDelay) / FILL_DURATION));
                if (t <= 0) continue;
                const eased = easeOutCubic(t);

                sec.progress = eased;
                sec.alpha = Math.min(eased * 1.2, 0.92);

                const size = eased * maxDim;
                const cornerX = sec.originX * w;
                const cornerY = sec.originY * h;
                const cx = lerp(cornerX, w / 2, eased * 0.6);
                const cy = lerp(cornerY, h / 2, eased * 0.6);
                const radius = size * 0.25;

                const [r, g, b] = sec.color;
                ctx.fillStyle = rgba(r, g, b, sec.alpha);
                ctx.beginPath();
                ctx.roundRect(cx - size / 2, cy - size / 2, size, size, radius);
                ctx.fill();
            }
        } else if (currentPhase === "mixing") {
            // All sections suffuse — draw single merged rect fading to mixed color
            const t = Math.max(0, Math.min(1, elapsed / SUFFUSE_DURATION));
            const eased = easeOutCubic(t);

            // Draw all sections at their final positions, fading
            for (const sec of sections) {
                const size = maxDim;
                const cx = w / 2;
                const cy = h / 2;
                const radius = size * 0.25;
                const [r, g, b] = sec.color;

                ctx.fillStyle = rgba(r, g, b, 0.92 * (1 - eased * 0.5));
                ctx.beginPath();
                ctx.roundRect(cx - size / 2, cy - size / 2, size, size, radius);
                ctx.fill();
            }

            // Overlay mixed color fading in
            if (sections.length > 0) {
                const avgR = Math.round(sections.reduce((s, sec) => s + sec.color[0], 0) / sections.length);
                const avgG = Math.round(sections.reduce((s, sec) => s + sec.color[1], 0) / sections.length);
                const avgB = Math.round(sections.reduce((s, sec) => s + sec.color[2], 0) / sections.length);

                ctx.fillStyle = rgba(avgR, avgG, avgB, eased * 0.95);
                ctx.beginPath();
                ctx.roundRect(-w * 0.1, -h * 0.1, w * 1.2, h * 1.2, 0);
                ctx.fill();
            }
        } else if (currentPhase === "revealing") {
            // Shrink from full area to swatch-sized rect at center
            const t = Math.max(0, Math.min(1, elapsed / SHRINK_DURATION));
            const eased = easeInQuad(t);

            if (sections.length > 0) {
                const avgR = Math.round(sections.reduce((s, sec) => s + sec.color[0], 0) / sections.length);
                const avgG = Math.round(sections.reduce((s, sec) => s + sec.color[1], 0) / sections.length);
                const avgB = Math.round(sections.reduce((s, sec) => s + sec.color[2], 0) / sections.length);

                const fullW = w * 1.2;
                const fullH = h * 1.2;
                const targetSize = 48;
                const currentW = lerp(fullW, targetSize, eased);
                const currentH = lerp(fullH, targetSize, eased);
                const cx = lerp(-w * 0.1, (w - targetSize) / 2, eased);
                const cy = lerp(-h * 0.1, (h - targetSize) / 2, eased);
                const radius = lerp(0, 12, eased);
                const alpha = lerp(0.95, 0, eased);

                ctx.fillStyle = rgba(avgR, avgG, avgB, alpha);
                ctx.beginPath();
                ctx.roundRect(cx, cy, currentW, currentH, radius);
                ctx.fill();
            }
        }

        ctx.restore();
        frame = requestAnimationFrame(render);
    }

    function start() {
        sections = createSections(colorCSSList.value);
        phaseStartTime = performance.now();
        running = true;
        frame = requestAnimationFrame(render);
    }

    function stop() {
        running = false;
        if (frame != null) {
            cancelAnimationFrame(frame);
            frame = null;
        }
    }

    watch(phase, (newPhase, oldPhase) => {
        if (newPhase === "gathering" && oldPhase === "idle") {
            start();
        } else if (newPhase !== oldPhase && newPhase !== "idle" && newPhase !== "done") {
            phaseStartTime = performance.now();
        } else if (newPhase === "idle") {
            stop();
            const canvas = canvasRef.value;
            if (canvas) {
                const ctx = canvas.getContext("2d");
                if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        }
    });

    onBeforeUnmount(() => stop());

    return { start, stop };
}
