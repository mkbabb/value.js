<!--
    <ActionToolbar> — RETIRED FROM THE RENDER PATH at X-W4 · X.W4.d (CC-043),
    and NOT deletable inside this wave's bounds. Recorded here so the next
    reader does not mistake a pinned file for a live one.

    WHAT HAPPENED. This SFC was the colour scene's hardcoded five-seat row, and
    it was one of the TWO rival action rows the Dock chose between with
    `v-if="actionBar"` / `v-else-if="genericBar"` — the priority that let the
    picker's bar suppress whichever scene bar stood beside it. D1 admits exactly
    one render path, so the five seats became DATA on the one contract
    (`SceneActionToken` `color.*`, built in `shell/usePaneRouter.ts`) and the one
    row that renders them is `layers/GenericActionBar.vue`. Nothing imports this
    file any more.

    WHY IT IS STILL HERE, measured rather than assumed.
      · `W4.md` §4 grants this unit `modify` on this path, not `delete` — and the
        tranche treats `delete` as its own access word (COHESION §0k.3 S-5 grants
        it by dated addendum where a wave needs it).
      · `test/picker-blob-config.test.ts:50-51` READS THIS FILE'S SOURCE and
        pins two occurrence counts in it ("leaves Copy solely in the action
        region", V.W20). `W4.md:175` puts `test/**` on the Do-NOT-touch list, so
        the assertions cannot move with the seats they describe. Emptying this
        file reds that suite; writing the pinned strings back as a comment would
        make a live test permanently vacuous. Neither is a lawful act here.

    THE ONE-LINE REPAIR, for the wave that owns both surfaces: delete this file
    and re-anchor those two assertions onto the contract's home
    (`demo/shell/usePaneRouter.ts`, where the `color.copy` seat now lives) in the
    SAME change. Until then this is a tracked, named residual — never a live
    component, and never a second render path.
-->
<template>
    <div class="flex items-center justify-around flex-1">
        <ActionButton
            :icon="RotateCcw"
            hover-key="reset"
            :active-hover="activeHover"
            title="Reset color"
            description="Click to reset to the default color."
            icon-class="hover:-rotate-180 duration-normal"
            :css-color-opaque="cssColorOpaque"
            rotate-on-click
            @action="emit('reset')"
            @update:active-hover="(v) => (activeHover = v)"
        />
        <ActionButton
            :icon="Copy"
            hover-key="copy"
            :active-hover="activeHover"
            title="Copy color"
            description="Click to copy the current color to the clipboard."
            :css-color-opaque="cssColorOpaque"
            @action="emit('copy')"
            @update:active-hover="(v) => (activeHover = v)"
        />
        <ActionButton
            :icon="Dices"
            hover-key="random"
            :active-hover="activeHover"
            title="Random color"
            description="Click to generate a random color."
            :css-color-opaque="cssColorOpaque"
            @action="emit('random')"
            @update:active-hover="(v) => (activeHover = v)"
        />
        <ActionButton
            :icon="Palette"
            hover-key="browse"
            :active-hover="activeHover"
            title="Palettes"
            description="Save, browse, and publish color palettes."
            :disabled="isEditing"
            :css-color-opaque="cssColorOpaque"
            :active-style="
                paletteActive ? { stroke: cssColorOpaque, strokeWidth: '2' } : {}
            "
            @action="emit('openPalette')"
            @update:active-hover="(v) => (activeHover = v)"
        />
        <ActionButton
            :icon="Camera"
            hover-key="extract"
            :active-hover="activeHover"
            title="Extract palette"
            description="Open image palette extraction from a photo or camera."
            :disabled="isEditing"
            :css-color-opaque="cssColorOpaque"
            @action="emit('openExtract')"
            @update:active-hover="(v) => (activeHover = v)"
        />
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Dices, Copy, RotateCcw, Palette, Camera } from "@lucide/vue";
import ActionButton from "./ActionButton.vue";

defineProps<{
    cssColorOpaque: string;
    canProposeName: boolean;
    isEditing: boolean;
    paletteActive: boolean;
}>();

const emit = defineEmits<{
    reset: [];
    copy: [];
    random: [];
    openPalette: [];
    openExtract: [];
}>();

const activeHover = ref<string | null>(null);

function clearHover() {
    activeHover.value = null;
}

defineExpose({ clearHover });
</script>
