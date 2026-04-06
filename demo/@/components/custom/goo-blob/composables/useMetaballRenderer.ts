import { watch, onUnmounted, type Ref } from "vue";
import { compileShader, linkProgram, createQuadVAO, getUniforms } from "@lib/animation/webgl-utils";
import vertSource from "../shaders/metaball.vert.glsl?raw";
import fragSource from "../shaders/metaball.frag.glsl?raw";
import type { useBlobMood } from "./useBlobMood";
import type { useBlobPointer } from "./useBlobPointer";
import type { useBlobSatellites } from "./useBlobSatellites";

const MAX_SATS = 4;

const UNIFORM_NAMES = [
    "uResolution",
    "uTime",
    "uBaseColor",
    "uPointer",
    "uPointerActive",
    "uPointerAttraction",
    "uBodyRadius",
    "uPulsePhase",
    "uPulseAmp",
    "uNoiseAmp",
    "uSmoothK",
    "uHueRange",
    "uSatShift",
    "uBrightnessShift",
    "uSatCount",
] as const;

function hexToRgb(hex: string): [number, number, number] {
    const raw = hex.replace("#", "");
    if (raw.length === 3) {
        const r = parseInt(raw[0] + raw[0], 16) / 255;
        const g = parseInt(raw[1] + raw[1], 16) / 255;
        const b = parseInt(raw[2] + raw[2], 16) / 255;
        return [r, g, b];
    }
    return [
        parseInt(raw.slice(0, 2), 16) / 255,
        parseInt(raw.slice(2, 4), 16) / 255,
        parseInt(raw.slice(4, 6), 16) / 255,
    ];
}

function cssColorToRgb(color: string): [number, number, number] {
    if (color.startsWith("#")) return hexToRgb(color);
    // Parse rgb(r, g, b) or rgba(r, g, b, a)
    const match = color.match(/rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/);
    if (match) {
        return [
            parseFloat(match[1]) / 255,
            parseFloat(match[2]) / 255,
            parseFloat(match[3]) / 255,
        ];
    }
    return [0.5, 0.5, 0.5];
}

export interface UseMetaballRendererOptions {
    canvasRef: Ref<HTMLCanvasElement | null>;
    color: Ref<string>;
    mood: ReturnType<typeof useBlobMood>;
    pointer: ReturnType<typeof useBlobPointer>;
    satellites: ReturnType<typeof useBlobSatellites>;
    size?: number;
    bodyRadius?: number;
}

export function useMetaballRenderer(options: UseMetaballRendererOptions) {
    const {
        canvasRef,
        color,
        mood,
        pointer,
        satellites,
        size = 150,
        bodyRadius = 0.18,
    } = options;

    const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    let gl: WebGL2RenderingContext | null = null;
    let program: WebGLProgram | null = null;
    let vao: WebGLVertexArrayObject | null = null;
    let buffer: WebGLBuffer | null = null;
    let uniforms: Record<string, WebGLUniformLocation | null> = {};
    let satPosLocs: (WebGLUniformLocation | null)[] = [];
    let satRadLocs: (WebGLUniformLocation | null)[] = [];
    let satOpLocs: (WebGLUniformLocation | null)[] = [];
    let rafId: number | null = null;
    let paused = false;
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

        // Array uniform locations
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
        const w = Math.round(size * dpr);
        const h = w;
        if (canvas.width !== w || canvas.height !== h) {
            canvas.width = w;
            canvas.height = h;
        }
        gl.viewport(0, 0, w, h);
    }

    function render(now: number) {
        if (destroyed) return;
        if (paused) {
            rafId = requestAnimationFrame(render);
            return;
        }

        if (!startTime) startTime = now;
        const dt = lastFrameTime ? now - lastFrameTime : 16;
        lastFrameTime = now;
        const time = (now - startTime) / 1000;

        // Tick subsystems
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

        // Global uniforms
        const canvas = canvasRef.value!;
        gl.uniform2f(uniforms.uResolution, canvas.width, canvas.height);
        gl.uniform1f(uniforms.uTime, time);
        gl.uniform3f(uniforms.uBaseColor, rgb[0], rgb[1], rgb[2]);

        // Pointer
        const ptr = pointer.pointer.value;
        gl.uniform2f(uniforms.uPointer, ptr.x * 0.5, ptr.y * 0.5);
        gl.uniform1f(uniforms.uPointerActive, pointer.active.value ? 1.0 : 0.0);
        gl.uniform1f(uniforms.uPointerAttraction, params.pointerAttraction);

        // Body
        gl.uniform1f(uniforms.uBodyRadius, bodyRadius);

        // Mood-driven
        gl.uniform1f(uniforms.uPulsePhase, time * params.pulseFreq * Math.PI * 2);
        gl.uniform1f(uniforms.uPulseAmp, params.pulseAmp);
        gl.uniform1f(uniforms.uNoiseAmp, params.noiseAmp);
        gl.uniform1f(uniforms.uSmoothK, params.smoothK);
        gl.uniform1f(uniforms.uHueRange, params.hueRange);
        gl.uniform1f(uniforms.uSatShift, params.satShift);
        gl.uniform1f(uniforms.uBrightnessShift, params.brightnessShift);

        // Satellites
        const sats = satellites.sources;
        gl.uniform1i(uniforms.uSatCount, sats.length);
        for (let i = 0; i < MAX_SATS; i++) {
            if (i < sats.length) {
                gl.uniform2f(satPosLocs[i], sats[i].x, sats[i].y);
                gl.uniform1f(satRadLocs[i], sats[i].radius);
                gl.uniform1f(satOpLocs[i], sats[i].opacity);
            } else {
                gl.uniform2f(satPosLocs[i], 0, 0);
                gl.uniform1f(satRadLocs[i], 0);
                gl.uniform1f(satOpLocs[i], 0);
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

        startTime = 0;
        lastFrameTime = 0;

        if (prefersReducedMotion) {
            // Single static frame
            requestAnimationFrame((now) => {
                render(now);
            });
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

    // Start when canvas becomes available
    watch(canvasRef, (canvas) => {
        if (canvas && !destroyed) start();
    }, { immediate: true });

    // Re-render on color change in reduced-motion mode
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
