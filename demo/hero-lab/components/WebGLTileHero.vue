<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from "vue";

import { createFpsReporter, getMotionScale, getVisualCapabilityProfile, hexToRgbUnit } from "../lib/helpers";
import type { HeroPalettePreset, TileHeroConfig } from "../lib/types";

const props = defineProps<{
    config: TileHeroConfig;
    palette: HeroPalettePreset;
}>();

const emit = defineEmits<{
    fps: [value: number];
}>();

const canvasRef = ref<HTMLCanvasElement | null>(null);

let cleanup: (() => void) | null = null;

function mountScene() {
    cleanup?.();

    const canvas = canvasRef.value;
    if (!canvas) {
        return;
    }

    const gl = canvas.getContext("webgl", {
        alpha: true,
        antialias: true,
        premultipliedAlpha: true,
    });

    if (!gl) {
        return;
    }

    const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(
        vertexShader,
        `
        attribute vec2 aPosition;
        varying vec2 vUv;

        void main() {
            vUv = 0.5 * (aPosition + 1.0);
            gl_Position = vec4(aPosition, 0.0, 1.0);
        }
    `,
    );
    gl.compileShader(vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(
        fragmentShader,
        `
        precision mediump float;

        varying vec2 vUv;
        uniform vec2 uResolution;
        uniform float uTime;
        uniform float uTileSize;
        uniform float uIntensity;
        uniform float uSpeed;
        uniform float uBands;
        uniform float uPatternDensity;
        uniform float uDitherStrength;
        uniform float uRevealSpeed;
        uniform vec3 uSurface;
        uniform vec3 uSurfaceAlt;
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        uniform vec3 uColorC;
        uniform vec3 uColorD;

        float hash(vec2 p) {
            return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
        }

        float bayer4(vec2 cell) {
            vec2 p = mod(cell, 4.0);
            if (p.y < 0.5) {
                if (p.x < 0.5) return 0.0 / 15.0;
                if (p.x < 1.5) return 8.0 / 15.0;
                if (p.x < 2.5) return 2.0 / 15.0;
                return 10.0 / 15.0;
            }
            if (p.y < 1.5) {
                if (p.x < 0.5) return 12.0 / 15.0;
                if (p.x < 1.5) return 4.0 / 15.0;
                if (p.x < 2.5) return 14.0 / 15.0;
                return 6.0 / 15.0;
            }
            if (p.y < 2.5) {
                if (p.x < 0.5) return 3.0 / 15.0;
                if (p.x < 1.5) return 11.0 / 15.0;
                if (p.x < 2.5) return 1.0 / 15.0;
                return 9.0 / 15.0;
            }
            if (p.x < 0.5) return 15.0 / 15.0;
            if (p.x < 1.5) return 7.0 / 15.0;
            if (p.x < 2.5) return 13.0 / 15.0;
            return 5.0 / 15.0;
        }

        float cellRank(vec2 cell) {
            if (cell.x == 1.0 && cell.y == 1.0) return 0.0;
            if (cell.x == 1.0 && cell.y == 0.0) return 1.0;
            if (cell.x == 1.0 && cell.y == 2.0) return 2.0;
            if (cell.x == 0.0 && cell.y == 1.0) return 3.0;
            if (cell.x == 2.0 && cell.y == 1.0) return 4.0;
            if (cell.x == 0.0 && cell.y == 0.0) return 5.0;
            if (cell.x == 2.0 && cell.y == 2.0) return 6.0;
            if (cell.x == 2.0 && cell.y == 0.0) return 7.0;
            return 8.0;
        }

        vec3 sampleGradient(float t) {
            if (t < 0.333) {
                return mix(uColorA, uColorB, t / 0.333);
            }

            if (t < 0.666) {
                return mix(uColorB, uColorC, (t - 0.333) / 0.333);
            }

            return mix(uColorC, uColorD, (t - 0.666) / 0.334);
        }

        void main() {
            vec2 pixel = vec2(max(uTileSize, 6.0)) / uResolution;
            vec2 gridUv = floor(vUv / pixel);
            vec2 snapped = gridUv * pixel;
            vec2 center = snapped + pixel * 0.5;
            vec2 local = fract(vUv / pixel) - 0.5;
            vec2 micro = floor((fract(vUv / pixel) * 3.0));
            float t = uTime * uSpeed * 0.75;
            float waveA = sin(center.x * 11.0 + t * 1.65);
            float waveB = cos(center.y * 9.5 - t * 1.25);
            float waveC = sin((center.x + center.y) * 16.0 - t * 0.55);
            float waveD = cos((center.x - center.y) * 13.0 + t * 1.5);
            float grain = hash(gridUv * 0.73 + floor(t * 2.0)) - 0.5;
            float field = 0.5 + (waveA + waveB + waveC * 0.8 + waveD * 0.65) * 0.14 * uIntensity + grain * 0.08;
            field = clamp(field, 0.0, 1.0);
            float sweep = fract(uTime * 0.09 * uSpeed * uRevealSpeed + center.x * 0.95 + center.y * 0.34);
            float reveal = clamp(0.24 + smoothstep(0.04, 0.24, sweep) * 0.58 + (1.0 - smoothstep(0.62, 0.95, sweep)) * 0.16, 0.0, 1.0);
            float bands = max(uBands, 3.0);
            float band = clamp(floor(field * (bands - 1.0) + (bayer4(gridUv) - 0.5) * uDitherStrength + reveal * 0.35 + 0.5), 0.0, bands - 1.0);
            float quantized = band / max(bands - 1.0, 1.0);
            float fillCount = clamp((quantized * 0.82 + reveal * 0.18) * 9.0 * clamp(uPatternDensity, 0.35, 1.0), 0.0, 9.0);
            float pattern = 1.0 - step(fillCount, cellRank(micro));

            float edge = smoothstep(0.47, 0.38, max(abs(local.x), abs(local.y)));
            float bevel = smoothstep(0.42, 0.02, max(abs(local.x), abs(local.y)));
            float highlight = smoothstep(-0.48, 0.35, local.x + local.y);
            vec3 bg = mix(uSurface, uSurfaceAlt, vUv.y * 0.9 + quantized * 0.08);
            vec3 tileBase = mix(bg, sampleGradient(quantized * 0.72 + 0.08), edge * (0.18 + reveal * 0.16));
            vec3 tileInk = sampleGradient(clamp(quantized * 0.94 + reveal * 0.12, 0.0, 1.0));
            tileInk += bevel * highlight * 0.08;
            vec3 color = tileBase;
            color = mix(color, tileInk, pattern * edge * (0.25 + reveal * 0.7));
            color += edge * 0.02;

            gl_FragColor = vec4(color, 1.0);
        }
    `,
    );
    gl.compileShader(fragmentShader);

    const program = gl.createProgram()!;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
            -1, -1,
            1, -1,
            -1, 1,
            -1, 1,
            1, -1,
            1, 1,
        ]),
        gl.STATIC_DRAW,
    );

    const positionAttribute = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(positionAttribute);
    gl.vertexAttribPointer(positionAttribute, 2, gl.FLOAT, false, 0, 0);

    const resolutionUniform = gl.getUniformLocation(program, "uResolution");
    const timeUniform = gl.getUniformLocation(program, "uTime");
    const tileSizeUniform = gl.getUniformLocation(program, "uTileSize");
    const intensityUniform = gl.getUniformLocation(program, "uIntensity");
    const speedUniform = gl.getUniformLocation(program, "uSpeed");
    const bandsUniform = gl.getUniformLocation(program, "uBands");
    const patternDensityUniform = gl.getUniformLocation(program, "uPatternDensity");
    const ditherStrengthUniform = gl.getUniformLocation(program, "uDitherStrength");
    const revealSpeedUniform = gl.getUniformLocation(program, "uRevealSpeed");
    const surfaceUniform = gl.getUniformLocation(program, "uSurface");
    const surfaceAltUniform = gl.getUniformLocation(program, "uSurfaceAlt");
    const colorAUniform = gl.getUniformLocation(program, "uColorA");
    const colorBUniform = gl.getUniformLocation(program, "uColorB");
    const colorCUniform = gl.getUniformLocation(program, "uColorC");
    const colorDUniform = gl.getUniformLocation(program, "uColorD");

    const resize = () => {
        const { clientWidth, clientHeight } = canvas;
        const dpr = Math.min(window.devicePixelRatio || 1, getVisualCapabilityProfile().dprMax);
        canvas.width = Math.max(1, Math.floor(clientWidth * dpr));
        canvas.height = Math.max(1, Math.floor(clientHeight * dpr));
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniform2f(resolutionUniform, canvas.width, canvas.height);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    const motionScale = getMotionScale(props.config.reducedMotion);
    const reportFps = createFpsReporter((value) => emit("fps", value));
    let frame = 0;

    const render = (now: number) => {
        reportFps();

        gl.uniform1f(timeUniform, now * 0.001 * motionScale);
        gl.uniform1f(tileSizeUniform, props.config.tileSize);
        gl.uniform1f(intensityUniform, props.config.intensity);
        gl.uniform1f(speedUniform, props.config.speed * motionScale);
        gl.uniform1f(bandsUniform, props.config.bands);
        gl.uniform1f(patternDensityUniform, props.config.patternDensity);
        gl.uniform1f(ditherStrengthUniform, props.config.ditherStrength);
        gl.uniform1f(revealSpeedUniform, props.config.revealSpeed);

        gl.uniform3fv(surfaceUniform, hexToRgbUnit(props.palette.surface));
        gl.uniform3fv(surfaceAltUniform, hexToRgbUnit(props.palette.surfaceAlt));
        gl.uniform3fv(colorAUniform, hexToRgbUnit(props.palette.tileStops[0]));
        gl.uniform3fv(colorBUniform, hexToRgbUnit(props.palette.tileStops[1]));
        gl.uniform3fv(colorCUniform, hexToRgbUnit(props.palette.tileStops[2]));
        gl.uniform3fv(colorDUniform, hexToRgbUnit(props.palette.tileStops[3]));

        gl.drawArrays(gl.TRIANGLES, 0, 6);
        frame = requestAnimationFrame(render);
    };

    frame = requestAnimationFrame(render);

    cleanup = () => {
        cancelAnimationFrame(frame);
        observer.disconnect();
        gl.deleteBuffer(buffer);
        gl.deleteProgram(program);
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
    };
}

onMounted(mountScene);
onBeforeUnmount(() => cleanup?.());
watch(
    () => [props.config, props.palette] as const,
    () => {
        mountScene();
    },
    { deep: true },
);
</script>

<template>
    <canvas ref="canvasRef" class="hero-canvas" />
</template>
