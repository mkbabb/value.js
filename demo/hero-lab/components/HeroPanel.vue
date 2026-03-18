<script setup lang="ts">
import { computed, reactive, ref, watch, type Component } from "vue";

import { Badge } from "@components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card";

import { HERO_PALETTES } from "../lib/palettes";
import { createHeroBackground } from "../lib/helpers";
import type { AtmosphereHeroConfig, TileHeroConfig } from "../lib/types";
import HeroControls from "./HeroControls.vue";

const props = defineProps<{
    title: string;
    description: string;
    renderer: string;
    complexity: string;
    kind: "tile" | "atmosphere";
    hero: Component;
    config: TileHeroConfig | AtmosphereHeroConfig;
}>();

const localConfig = reactive({ ...props.config });
const fps = ref(0);

watch(
    () => props.config,
    (nextConfig) => {
        Object.assign(localConfig, nextConfig);
    },
    { deep: true },
);

const palette = computed(
    () =>
        HERO_PALETTES.find((candidate) => candidate.id === localConfig.paletteId) ??
        HERO_PALETTES[0]!,
);

const heroStyle = computed(() => ({
    background: createHeroBackground(palette.value),
    boxShadow: `inset 0 1px 0 rgba(255,255,255,0.65), 0 22px 48px ${palette.value.shadow}`,
}));
</script>

<template>
    <Card class="hero-panel">
        <CardHeader class="hero-panel__header">
            <div class="hero-panel__title-row">
                <div>
                    <CardTitle class="hero-panel__title">{{ title }}</CardTitle>
                    <CardDescription class="hero-panel__description">
                        {{ description }}
                    </CardDescription>
                </div>

                <div class="hero-panel__badges">
                    <Badge variant="outline">{{ renderer }}</Badge>
                    <Badge variant="secondary">{{ complexity }}</Badge>
                    <Badge variant="outline">{{ fps }} fps</Badge>
                </div>
            </div>
        </CardHeader>

        <CardContent class="hero-panel__body">
            <div class="hero-panel__viewport" :style="heroStyle">
                <component
                    :is="hero"
                    :config="localConfig"
                    :palette="palette"
                    @fps="(value: number) => { fps = value; }"
                />
            </div>

            <HeroControls
                :kind="kind"
                :model-value="localConfig"
                @update:model-value="(value) => Object.assign(localConfig, value)"
            />
        </CardContent>
    </Card>
</template>
