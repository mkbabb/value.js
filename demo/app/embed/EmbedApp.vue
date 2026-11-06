<template>
    <main ref="sliceRoot" class="embed-slice" :data-slice="route.slice ?? 'none'">
        <EmbedPicker
            v-if="route.slice === 'picker' && stops"
            :stops="stops"
            @color="(css) => bridge.post({ type: 'color', css })"
        />
        <EmbedGradient v-else-if="route.slice === 'gradient' && stops" :stops="stops" />
    </main>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, onScopeDispose, provide, shallowRef, useTemplateRef, watch } from "vue";
import { useGlobalDark } from "@mkbabb/glass-ui/dark";
import { INK_AMBIENT_KEY, INK_PLATE_REFERENT_KEY } from "../../color-session/keys";
import { createEmbedBridge, type Scheme } from "./bridge";
import { parseSliceRoute, type SliceStop } from "./params";
import EmbedPicker from "./EmbedPicker.vue";
import EmbedGradient from "./EmbedGradient.vue";

const route = parseSliceRoute(window.location.hash);
const bridge = createEmbedBridge(window);
onScopeDispose(() => bridge.dispose());

// The scheme is the host's: the pre-paint script stamped it from the hash, and
// the glass dark store (which every glass surface reads) is set to it before
// the first render.
const { isDark } = useGlobalDark();
const scheme = (): Scheme => (isDark.value ? "dark" : "light");
if (route.scheme) isDark.value = route.scheme === "dark";

// The certified inks are walked against the host's own ground: daraksha's
// vellum (L 0.965) or night (L 0.175).
const groundLightness = computed(() => (isDark.value ? 0.175 : 0.965));
provide(INK_AMBIENT_KEY, groundLightness);
provide(INK_PLATE_REFERENT_KEY, groundLightness);

// A host flip lands on the next frame, crossfaded where the platform can, and
// is acknowledged once the flip is in the DOM.
const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;
bridge.onSetTheme((next) => {
    requestAnimationFrame(async () => {
        const apply = async () => {
            isDark.value = next === "dark";
            await nextTick();
        };
        type ViewTransitionDoc = Document & {
            startViewTransition?: (cb: () => Promise<void>) => {
                updateCallbackDone: Promise<void>;
                ready: Promise<void>;
                finished: Promise<void>;
            };
        };
        const doc = document as ViewTransitionDoc;
        if (scheme() !== next && doc.startViewTransition && !reducedMotion) {
            // A flip the platform aborts (the frame resized or hidden mid-flip)
            // rejects `ready` with InvalidStateError; the flip itself still
            // lands, so every promise the transition hands back is settled here.
            const flip = doc.startViewTransition(apply);
            flip.ready.catch(() => undefined);
            flip.finished.catch(() => undefined);
            await flip.updateCallbackDone.catch(() => undefined);
        } else {
            await apply();
        }
        bridge.post({ type: "theme", scheme: next });
    });
});

// The palette: inline stops, or a palette slug read from the palette API. A
// slug that cannot be read leaves the app's own opening colour.
const stops = shallowRef<SliceStop[] | null>(
    route.palette.kind === "stops" ? route.palette.stops : route.palette.kind === "none" ? [] : null,
);
if (route.palette.kind === "slug") {
    const { slug } = route.palette;
    void (async () => {
        try {
            const [{ initApiEnvironment }, { BASE_URL }, { getPalette }] = await Promise.all([
                import("../../platform/transport/availability"),
                import("../../platform/transport/client"),
                import("../../palettes/api/palettes"),
            ]);
            initApiEnvironment(BASE_URL);
            const palette = await getPalette(slug);
            stops.value = palette.colors.map((c) => (c.name ? { css: c.css, name: c.name } : { css: c.css }));
        } catch {
            console.info(`[value.js embed] palette "${slug}" could not be read`);
            stops.value = [];
        }
    })();
}

// `ready` once the slice has painted with its faces loaded: the host reveals
// the frame on it.
const sliceRoot = useTemplateRef<HTMLElement>("sliceRoot");
const announceReady = async () => {
    await nextTick();
    await document.fonts?.ready;
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    const el = sliceRoot.value;
    if (!el || !route.slice) return;
    const box = el.getBoundingClientRect();
    bridge.post({
        type: "ready",
        slice: route.slice,
        scheme: scheme(),
        width: Math.round(box.width),
        height: Math.ceil(box.height),
    });
    bridge.observeSize(el);
};

onMounted(() => {
    const stop = watch(
        stops,
        (resolved) => {
            if (!resolved) return;
            queueMicrotask(() => stop());
            void announceReady();
        },
        { immediate: true },
    );
});
</script>
