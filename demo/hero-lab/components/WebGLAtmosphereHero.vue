<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from "vue";

import { createFpsReporter, getMotionScale, getVisualCapabilityProfile, hexToRgbUnit } from "../lib/helpers";
import type { AtmosphereHeroConfig, HeroPalettePreset } from "../lib/types";

const props = defineProps<{
    config: AtmosphereHeroConfig;
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

    const gl = canvas.getContext("webgl", { alpha: true, antialias: true });
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
        uniform float uIntensity;
        uniform float uSpeed;
        uniform float uBlur;
        uniform vec3 uSurface;
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        uniform vec3 uColorC;
        uniform vec3 uColorD;

        float hash(vec2 p) {
            return fract(sin(dot(p, vec2(91.3, 19.7))) * 43758.5453);
        }

        float blob(vec2 uv, vec2 center, float radius) {
            float dist = distance(uv, center);
            return exp(-(dist * dist) / max(radius, 0.0001));
        }

        void main() {
            float t = uTime * uSpeed;
            vec2 uv = vUv;
            vec2 drift = vec2(
                sin(uv.y * 4.0 + t * 0.3),
                cos(uv.x * 3.0 - t * 0.25)
            ) * 0.028 * uIntensity;
            uv += drift;

            float blur = mix(0.05, 0.22, clamp(uBlur / 90.0, 0.0, 1.0));

            float layerA = blob(uv, vec2(0.23 + sin(t * 0.4) * 0.08, 0.32 + cos(t * 0.25) * 0.07), blur * 1.0);
            float layerB = blob(uv, vec2(0.74 + cos(t * 0.33) * 0.08, 0.38 + sin(t * 0.44) * 0.08), blur * 1.25);
            float layerC = blob(uv, vec2(0.48 + sin(t * 0.22) * 0.1, 0.74 + cos(t * 0.29) * 0.06), blur * 1.55);
            float layerD = blob(uv, vec2(0.58 + cos(t * 0.52) * 0.06, 0.14 + sin(t * 0.35) * 0.04), blur * 0.85);

            vec3 color = uSurface;
            color += uColorA * layerA * 0.85;
            color += uColorB * layerB * 0.72;
            color += uColorC * layerC * 0.9;
            color += uColorD * layerD * 0.55;

            float vignette = smoothstep(1.15, 0.12, distance(vUv, vec2(0.5)));
            color *= mix(0.9, 1.08, vignette);

            float grain = (hash(gl_FragCoord.xy + floor(t * 12.0)) - 0.5) * 0.03;
            color += grain;
            color = clamp(color, 0.0, 1.0);

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
    const intensityUniform = gl.getUniformLocation(program, "uIntensity");
    const speedUniform = gl.getUniformLocation(program, "uSpeed");
    const blurUniform = gl.getUniformLocation(program, "uBlur");
    const surfaceUniform = gl.getUniformLocation(program, "uSurface");
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
    const quality = getVisualCapabilityProfile();
    const reportFps = createFpsReporter((value) => emit("fps", value));
    let frame = 0;

    const render = (now: number) => {
        reportFps();

        gl.uniform1f(timeUniform, now * 0.001 * motionScale);
        gl.uniform1f(intensityUniform, props.config.intensity);
        gl.uniform1f(speedUniform, props.config.speed * motionScale);
        gl.uniform1f(blurUniform, props.config.blurRadius * quality.blurScale);
        gl.uniform3fv(surfaceUniform, hexToRgbUnit(props.palette.surface));
        gl.uniform3fv(colorAUniform, hexToRgbUnit(props.palette.atmosphereStops[0]));
        gl.uniform3fv(colorBUniform, hexToRgbUnit(props.palette.atmosphereStops[1]));
        gl.uniform3fv(colorCUniform, hexToRgbUnit(props.palette.atmosphereStops[2]));
        gl.uniform3fv(colorDUniform, hexToRgbUnit(props.palette.atmosphereStops[3]));

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
