<template>
    <div class="hero-lab-page">
        <div class="hero-lab-shell">
            <header class="hero-lab-header">
                <div class="hero-lab-header__copy">
                    <p class="hero-lab-kicker">Hero Lab</p>
                    <h1 class="hero-lab-title">Shader, canvas, and CSS studies for pseudo-ASCII tile waves.</h1>
                    <p class="hero-lab-subtitle">
                        A standalone demo app for exploring Almanac-style procedural heroes in the repo’s existing visual language.
                    </p>
                </div>

                <div class="hero-lab-header__actions">
                    <Badge variant="outline">Reka + shad-style UI</Badge>
                    <Badge variant="secondary">Glass + shadow tokens</Badge>
                    <DarkModeToggle class="hero-lab-dark-toggle" />
                </div>
            </header>

            <section class="hero-lab-notes">
                <Card class="hero-lab-note-card hero-lab-note-card--glass">
                    <CardHeader>
                        <CardTitle class="hero-lab-note-title">What’s in the lab</CardTitle>
                        <CardDescription>
                            The tile tab compares three rendering backends for pseudo-ASCII writing motion. The atmosphere tab compares three ways to build blurred ambient color fields.
                        </CardDescription>
                    </CardHeader>
                </Card>

                <Card class="hero-lab-note-card">
                    <CardHeader>
                        <CardTitle class="hero-lab-note-title">Controls</CardTitle>
                        <CardDescription>
                            Each panel gets its own palette, speed, intensity, density, and reveal controls so the visual differences stay obvious.
                        </CardDescription>
                    </CardHeader>
                </Card>
            </section>

            <Tabs default-value="tile" class="hero-lab-tabs">
                <div class="hero-lab-tabs__rail">
                    <TabsList class="hero-lab-tabs__list">
                        <TabsTrigger value="tile" class="hero-lab-tabs__trigger">Tile Field Studies</TabsTrigger>
                        <TabsTrigger value="atmosphere" class="hero-lab-tabs__trigger">Blurred Atmospheres</TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="tile" class="hero-lab-tabs__content">
                    <section class="hero-lab-grid">
                        <HeroPanel
                            title="WebGL Tile Wave"
                            description="GPU-driven banding, dithering, and square micro-patterns."
                            renderer="WebGL"
                            complexity="High"
                            kind="tile"
                            :hero="WebGLTileHero"
                            :config="tileConfigs.webgl"
                        />
                        <HeroPanel
                            title="Canvas Tile Wave"
                            description="2D pseudo-ASCII tiles rendered from the same shared field."
                            renderer="Canvas 2D"
                            complexity="Medium"
                            kind="tile"
                            :hero="CanvasTileHero"
                            :config="tileConfigs.canvas"
                        />
                        <HeroPanel
                            title="CSS Tile Wave"
                            description="DOM tiles with keyed transforms and square fragment patterns."
                            renderer="CSS + keyframes.js"
                            complexity="Low"
                            kind="tile"
                            :hero="CssTileHero"
                            :config="tileConfigs.css"
                        />
                    </section>
                </TabsContent>

                <TabsContent value="atmosphere" class="hero-lab-tabs__content">
                    <section class="hero-lab-grid">
                        <HeroPanel
                            title="WebGL Atmosphere"
                            description="Soft shader-space blobs with built-in drift and vignette."
                            renderer="WebGL"
                            complexity="High"
                            kind="atmosphere"
                            :hero="WebGLAtmosphereHero"
                            :config="atmosphereConfigs.webgl"
                        />
                        <HeroPanel
                            title="Canvas Atmosphere"
                            description="Blurred 2D gradients composited as drifting color fog."
                            renderer="Canvas 2D"
                            complexity="Medium"
                            kind="atmosphere"
                            :hero="CanvasAtmosphereHero"
                            :config="atmosphereConfigs.canvas"
                        />
                        <HeroPanel
                            title="CSS Atmosphere"
                            description="KISS gradient blobs animated with keyframes.js."
                            renderer="CSS + keyframes.js"
                            complexity="Low"
                            kind="atmosphere"
                            :hero="CssAtmosphereHero"
                            :config="atmosphereConfigs.css"
                        />
                    </section>
                </TabsContent>
            </Tabs>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

import { DarkModeToggle, useGlobalDark } from "@components/custom/dark-mode-toggle";
import { Badge } from "@components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";

import CanvasAtmosphereHero from "./components/CanvasAtmosphereHero.vue";
import CanvasTileHero from "./components/CanvasTileHero.vue";
import CssAtmosphereHero from "./components/CssAtmosphereHero.vue";
import CssTileHero from "./components/CssTileHero.vue";
import HeroPanel from "./components/HeroPanel.vue";
import WebGLAtmosphereHero from "./components/WebGLAtmosphereHero.vue";
import WebGLTileHero from "./components/WebGLTileHero.vue";
import type { AtmosphereHeroConfig, TileHeroConfig } from "./lib/types";

import "@styles/style.css";
import "./hero-lab.css";

useGlobalDark();

const tileConfigs = reactive<Record<string, TileHeroConfig>>({
    webgl: {
        paletteId: "ember-glass",
        speed: 1,
        intensity: 1,
        reducedMotion: false,
        tileSize: 22,
        bands: 6,
        patternDensity: 0.92,
        ditherStrength: 0.7,
        revealSpeed: 1.1,
    },
    canvas: {
        paletteId: "sea-glass",
        speed: 0.95,
        intensity: 1.05,
        reducedMotion: false,
        tileSize: 20,
        bands: 6,
        patternDensity: 0.88,
        ditherStrength: 0.62,
        revealSpeed: 0.95,
    },
    css: {
        paletteId: "citrine-mist",
        speed: 0.85,
        intensity: 0.9,
        reducedMotion: false,
        tileSize: 18,
        bands: 5,
        patternDensity: 0.76,
        ditherStrength: 0.5,
        revealSpeed: 0.82,
    },
});

const atmosphereConfigs = reactive<Record<string, AtmosphereHeroConfig>>({
    webgl: {
        paletteId: "night-studio",
        speed: 1,
        intensity: 1,
        reducedMotion: false,
        blurRadius: 48,
        blobCount: 4,
    },
    canvas: {
        paletteId: "ember-glass",
        speed: 0.9,
        intensity: 1.15,
        reducedMotion: false,
        blurRadius: 42,
        blobCount: 5,
    },
    css: {
        paletteId: "sea-glass",
        speed: 0.75,
        intensity: 0.95,
        reducedMotion: false,
        blurRadius: 36,
        blobCount: 4,
    },
});
</script>
