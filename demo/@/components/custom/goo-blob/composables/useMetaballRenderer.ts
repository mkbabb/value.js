import { watch, onUnmounted, type Ref } from "vue";
import { compileShader, linkProgram, createQuadVAO, getUniforms } from "@lib/animation/webgl-utils";
import vertSource from "../shaders/metaball.vert.glsl?raw";
import fragSource from "../shaders/metaball.frag.glsl?raw";
import type { BlobConfig } from "../types";
import type { useBlobMood } from "./useBlobMood";
import type { useBlobPointer } from "./useBlobPointer";
import type { useBlobSatellites } from "./useBlobSatellites";

const MAX_SATS = 4;

/**
 * Canvas is CSS-sized 1.6x its layout wrapper (see GooBlob.vue). Positions
 * are in [-0.5, 0.5] normalized space mapped to canvas UVs. To make the
 * layout footprint represent the "visible blob region" and have the extra
 * 60% of canvas serve as overflow margin for satellite orbits, scale all
 * length-like uniforms by 1/1.6 = 0.625.
 */
const POS_SCALE = 1 / 1.6;

const UNIFORM_NAMES = [
    "uResolution",
    "uTime",
    "uBaseColor",
    "uPointer",
    "uPointerActive",
    "uPointerAttraction",
    "uPointerStrength",
    "uBodyRadius",
    "uPulsePhase",
    "uPulseAmp",
    "uNoiseAmp",
    "uNoiseFreq",
    "uNoiseSpeed",
    "uSmoothK",
    "uHueRange",
    "uSatShift",
    "uBrightnessShift",
    "uColorNoiseFreq",
    "uColorNoiseSpeed",
    "uSatCount",
] as const;

// Resolve any CSS color string (lab, oklch, hsl, hex, rgb, ...) to [0,1] RGB
const resolverCtx = (() => {
    if (typeof document === "undefined") return null;
    const c = document.createElement("canvas");
    c.width = 1;
    c.height = 1;
    return c.getContext("2d", { willReadFrequently: true });
})();

function cssColorToRgb(color: string): [number, number, number] {
    if (!resolverCtx) return [0.5, 0.5, 0.5];
    resolverCtx.clearRect(0, 0, 1, 1);
    resolverCtx.fillStyle = color;
    resolverCtx.fillRect(0, 0, 1, 1);
    const d = resolverCtx.getImageData(0, 0, 1, 1).data;
    return [d[0]! / 255, d[1]! / 255, d[2]! / 255];
}

export interface UseMetaballRendererOptions {
    canvasRef: Ref<HTMLCanvasElement | null>;
    color: Ref<string>;
    mood: ReturnType<typeof useBlobMood>;
    pointer: ReturnType<typeof useBlobPointer>;
    satellites: ReturnType<typeof useBlobSatellites>;
    config: BlobConfig;
}

export function useMetaballRenderer(options: UseMetaballRendererOptions) {
    const { canvasRef, color, mood, pointer, satellites, config } = options;

    const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    let gl: WebGL2RenderingContext | null = null;
    let program: WebGLProgram | null = null;
    let vao: WebGLVertexArrayObject | null = null;
    let buffer: WebGLBuffer | null = null;
    type Loc = WebGLUniformLocation | null;
    let uniforms: Record<(typeof UNIFORM_NAMES)[number], Loc> = {} as never;
    let satPosLocs: Loc[] = [];
    let satRadLocs: Loc[] = [];
    let satOpLocs: Loc[] = [];
    let rafId: number | null = null;
    let paused = false;
    let tabHidden = false;
    let destroyed = false;
    let startTime = 0;
    let lastFrameTime = 0;
    let observer: ResizeObserver | null = null;

    function initGL(canvas: HTMLCanvasElement) {
        const ctx = canvas.getContext("webgl2", {
            alpha: true,
            premultipliedAlpha: true,
            antialias: false,
            preserveDrawingBuffer: false,
        });
        if (!ctx) {
            console.warn("WebGL2 not available");
            return false;
        }
        gl = ctx;

        const vert = compileShader(gl, gl.VERTEX_SHADER, vertSource);
        const frag = compileShader(gl, gl.FRAGMENT_SHADER, fragSource);
        program = linkProgram(gl, vert, frag);
        gl.deleteShader(vert);
        gl.deleteShader(frag);

        const quad = createQuadVAO(gl, program);
        vao = quad.vao;
        buffer = quad.buffer;

        gl.useProgram(program);
        uniforms = getUniforms(gl, program, UNIFORM_NAMES);

        satPosLocs = [];
        satRadLocs = [];
        satOpLocs = [];
        for (let i = 0; i < MAX_SATS; i++) {
            satPosLocs.push(gl.getUniformLocation(program, `uSatPos[${i}]`));
            satRadLocs.push(gl.getUniformLocation(program, `uSatRadius[${i}]`));
            satOpLocs.push(gl.getUniformLocation(program, `uSatOpacity[${i}]`));
        }

        gl.enable(gl.BLEND);
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

        resize(canvas);
        return true;
    }

    function resize(canvas: HTMLCanvasElement) {
        if (!gl) return;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        // Size from actual rendered element, not config — blob fills its container
        const cssW = canvas.clientWidth || config.canvasSize;
        const cssH = canvas.clientHeight || config.canvasSize;
        const w = Math.round(cssW * dpr);
        const h = Math.round(cssH * dpr);
        if (canvas.width !== w || canvas.height !== h) {
            canvas.width = w;
            canvas.height = h;
        }
        gl.viewport(0, 0, w, h);
    }

    function render(now: number) {
        if (destroyed) return;
        if (paused || tabHidden) {
            rafId = requestAnimationFrame(render);
            return;
        }

        if (!startTime) startTime = now;
        const dt = lastFrameTime ? now - lastFrameTime : 16;
        lastFrameTime = now;
        const time = (now - startTime) / 1000;

        mood.tick(dt);
        pointer.tick();
        satellites.tick(now, mood.params.value);

        if (!gl || !program) {
            rafId = requestAnimationFrame(render);
            return;
        }

        const params = mood.params.value;
        const rgb = cssColorToRgb(color.value);

        gl.useProgram(program);
        gl.bindVertexArray(vao);

        // The RAF frame can outrun destroy(): cancelAnimationFrame does not
        // stop a frame already dequeued and executing. A null canvas here
        // means the component tore down mid-frame — end the loop, do not
        // reschedule.
        const canvas = canvasRef.value;
        if (!canvas) return;

        gl.uniform2f(uniforms.uResolution, canvas.width, canvas.height);
        gl.uniform1f(uniforms.uTime, time);
        gl.uniform3f(uniforms.uBaseColor, rgb[0], rgb[1], rgb[2]);

        // Pointer
        const ptr = pointer.pointer.value;
        gl.uniform2f(uniforms.uPointer, ptr.x * 0.5 * POS_SCALE, ptr.y * 0.5 * POS_SCALE);
        gl.uniform1f(uniforms.uPointerActive, pointer.active.value ? 1.0 : 0.0);
        gl.uniform1f(uniforms.uPointerAttraction, config.pointerAttraction + params.pointerAttraction);
        gl.uniform1f(uniforms.uPointerStrength, config.pointerStrength * POS_SCALE);

        // Body — config is the base, mood params modulate
        gl.uniform1f(uniforms.uBodyRadius, config.bodyRadius * POS_SCALE);
        gl.uniform1f(uniforms.uPulsePhase, time * config.pulseFreq * params.pulseFreq * Math.PI * 2);
        gl.uniform1f(uniforms.uPulseAmp, config.pulseAmp * params.pulseAmp / 0.015 * POS_SCALE); // normalize to idle baseline

        // Surface noise — config controls shape, mood scales amplitude
        gl.uniform1f(uniforms.uNoiseAmp, config.noiseAmp * params.noiseAmp / 0.025 * POS_SCALE);
        gl.uniform1f(uniforms.uNoiseFreq, config.noiseFreq);
        gl.uniform1f(uniforms.uNoiseSpeed, config.noiseSpeed);

        // Gooey
        gl.uniform1f(uniforms.uSmoothK, config.smoothK * params.smoothK / 0.22 * POS_SCALE);

        // Color perturbation
        gl.uniform1f(uniforms.uHueRange, config.hueRange + params.hueRange);
        gl.uniform1f(uniforms.uSatShift, config.satShift + params.satShift);
        gl.uniform1f(uniforms.uBrightnessShift, config.brightnessShift + params.brightnessShift);
        gl.uniform1f(uniforms.uColorNoiseFreq, config.colorNoiseFreq);
        gl.uniform1f(uniforms.uColorNoiseSpeed, config.colorNoiseSpeed);

        // Satellites
        const sats = satellites.sources;
        gl.uniform1i(uniforms.uSatCount, sats.length);
        for (let i = 0; i < MAX_SATS; i++) {
            const posLoc = satPosLocs[i] ?? null;
            const radLoc = satRadLocs[i] ?? null;
            const opLoc = satOpLocs[i] ?? null;
            const sat = sats[i];
            if (sat) {
                gl.uniform2f(posLoc, sat.x * POS_SCALE, sat.y * POS_SCALE);
                gl.uniform1f(radLoc, sat.radius * POS_SCALE);
                gl.uniform1f(opLoc, sat.opacity);
            } else {
                gl.uniform2f(posLoc, 0, 0);
                gl.uniform1f(radLoc, 0);
                gl.uniform1f(opLoc, 0);
            }
        }

        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        gl.bindVertexArray(null);

        if (!prefersReducedMotion) {
            rafId = requestAnimationFrame(render);
        }
    }

    function onVisibilityChange() {
        tabHidden = document.hidden;
    }

    function start() {
        const canvas = canvasRef.value;
        if (!canvas) return;
        if (!initGL(canvas)) return;

        observer = new ResizeObserver(() => {
            if (canvasRef.value) resize(canvasRef.value);
        });
        observer.observe(canvas);

        canvas.addEventListener("webglcontextlost", onContextLost);
        canvas.addEventListener("webglcontextrestored", onContextRestored);
        document.addEventListener("visibilitychange", onVisibilityChange);
        tabHidden = document.hidden;

        startTime = 0;
        lastFrameTime = 0;

        if (prefersReducedMotion) {
            requestAnimationFrame((now) => render(now));
        } else {
            rafId = requestAnimationFrame(render);
        }
    }

    function onContextLost(e: Event) {
        e.preventDefault();
        if (rafId !== null) {
            cancelAnimationFrame(rafId);
            rafId = null;
        }
    }

    function onContextRestored() {
        const canvas = canvasRef.value;
        if (canvas && !destroyed) {
            if (initGL(canvas)) {
                startTime = 0;
                lastFrameTime = 0;
                rafId = requestAnimationFrame(render);
            }
        }
    }

    function destroy() {
        destroyed = true;
        if (rafId !== null) {
            cancelAnimationFrame(rafId);
            rafId = null;
        }
        observer?.disconnect();
        document.removeEventListener("visibilitychange", onVisibilityChange);
        const canvas = canvasRef.value;
        if (canvas) {
            canvas.removeEventListener("webglcontextlost", onContextLost);
            canvas.removeEventListener("webglcontextrestored", onContextRestored);
        }
        if (gl) {
            if (buffer) gl.deleteBuffer(buffer);
            if (vao) gl.deleteVertexArray(vao);
            if (program) gl.deleteProgram(program);
            gl = null;
        }
    }

    watch(canvasRef, (canvas) => {
        if (canvas && !destroyed) start();
    }, { immediate: true });

    if (prefersReducedMotion) {
        watch(color, () => {
            if (canvasRef.value && gl) {
                requestAnimationFrame((now) => render(now));
            }
        });
    }

    onUnmounted(destroy);

    return {
        pause: () => { paused = true; },
        resume: () => { paused = false; },
    };
}
