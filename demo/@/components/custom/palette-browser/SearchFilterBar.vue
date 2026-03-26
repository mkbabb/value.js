<template>
    <div class="flex items-center gap-1.5">
        <DropdownMenu>
            <DropdownMenuTrigger as-child>
                <button
                    class="relative flex h-8 w-8 items-center justify-center bg-transparent border-none cursor-pointer focus-visible:outline-none"
                >
                    <EllipsisVertical class="h-4 w-4 text-muted-foreground" />
                    <span
                        v-if="activeFilterCount > 0"
                        class="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground"
                    >
                        {{ activeFilterCount }}
                    </span>
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" class="w-56">
                <!-- Sort -->
                <DropdownMenuLabel class="section-label text-muted-foreground">
                    Sort
                </DropdownMenuLabel>
                <DropdownMenuRadioGroup :model-value="sort" @update:model-value="$emit('update:sort', $event)">
                    <DropdownMenuRadioItem value="newest">
                        <Clock class="mr-2 h-3.5 w-3.5" /> Newest
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="popular">
                        <TrendingUp class="mr-2 h-3.5 w-3.5" /> Most Popular
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="most-forked">
                        <GitFork class="mr-2 h-3.5 w-3.5" /> Most Forked
                    </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>

                <DropdownMenuSeparator />

                <!-- Status -->
                <DropdownMenuLabel class="section-label text-muted-foreground">
                    Status
                </DropdownMenuLabel>
                <DropdownMenuRadioGroup :model-value="status" @update:model-value="$emit('update:status', $event)">
                    <DropdownMenuRadioItem value="">All</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="featured">
                        <Award class="mr-2 h-3.5 w-3.5" /> Featured
                    </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>

                <!-- Tags -->
                <template v-if="availableTags.length > 0">
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel class="section-label text-muted-foreground">
                        Tags
                    </DropdownMenuLabel>
                    <div class="max-h-32 overflow-y-auto px-2 py-1">
                        <label
                            v-for="tag in availableTags"
                            :key="tag.name"
                            class="flex cursor-pointer items-center gap-2 rounded px-1 py-0.5 text-mono-small hover:bg-accent/50"
                        >
                            <input
                                type="checkbox"
                                :checked="selectedTags.includes(tag.name)"
                                class="rounded border-input"
                                @change="toggleTag(tag.name)"
                            />
                            {{ tag.name }}
                        </label>
                    </div>
                </template>

                <!-- Color search -->
                <DropdownMenuSeparator />
                <DropdownMenuLabel class="section-label text-muted-foreground">
                    Find by Color
                </DropdownMenuLabel>
                <div class="px-2 py-1.5 flex flex-col gap-1.5" @click.stop>
                    <div class="flex items-center gap-2">
                        <!-- Native color picker (mini swatch) -->
                        <label class="relative shrink-0 cursor-pointer">
                            <input
                                :value="pickerHex"
                                type="color"
                                class="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                                @input="onPickerInput($event)"
                            />
                            <span
                                class="block h-7 w-7 rounded-full border border-input"
                                :style="{ backgroundColor: previewColor }"
                            />
                        </label>
                        <!-- CSS color text input with inline dot preview -->
                        <div class="relative flex-1">
                            <span
                                class="absolute left-2 top-1/2 -translate-y-1/2 block h-3 w-3 rounded-full border border-input/50"
                                :style="{ backgroundColor: previewColor }"
                            />
                            <input
                                v-model="colorText"
                                type="text"
                                placeholder="#4488cc or hsl(210,60%,50%)"
                                class="h-7 w-full rounded-md border border-input bg-background pl-7 pr-2 font-mono-code text-caption focus:outline-none focus:ring-1 focus:ring-ring"
                                @keydown.enter="applyColorSearch"
                            />
                        </div>
                    </div>
                    <div class="flex items-center gap-1.5">
                        <Button
                            v-if="!colorSearchActive"
                            variant="outline"
                            size="sm"
                            class="h-6 px-2.5 text-micro flex-1"
                            @click="applyColorSearch"
                        >
                            Search
                        </Button>
                        <Button
                            v-if="colorSearchActive"
                            variant="ghost"
                            size="sm"
                            class="h-6 px-2 text-micro"
                            @click="clearColorSearch"
                        >
                            <X class="h-3 w-3 mr-1" /> Clear
                        </Button>
                    </div>
                </div>

                <!-- Clear all -->
                <template v-if="activeFilterCount > 0">
                    <DropdownMenuSeparator />
                    <DropdownMenuItem @click="$emit('clearFilters')">
                        <X class="mr-2 h-3.5 w-3.5" />
                        Clear all filters
                    </DropdownMenuItem>
                </template>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { Button } from "@components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import {
    EllipsisVertical,
    Clock,
    TrendingUp,
    GitFork,
    Award,
    X,
} from "lucide-vue-next";
import type { Tag } from "@lib/palette/types";

const props = defineProps<{
    sort: string;
    status: string;
    selectedTags: string[];
    availableTags: Tag[];
}>();

const emit = defineEmits<{
    "update:sort": [value: string];
    "update:status": [value: string];
    "update:selectedTags": [value: string[]];
    clearFilters: [];
    colorSearch: [L: number, a: number, b: number];
    clearColorSearch: [];
}>();

const colorText = ref("#4488cc");
const pickerHex = ref("#4488cc");
const colorSearchActive = ref(false);

/** Preview color — try to parse the text input, fall back to the picker hex */
const previewColor = computed(() => {
    const t = colorText.value.trim();
    if (!t) return pickerHex.value;
    // Validate: hex, rgb(), hsl(), oklch(), named colors
    if (/^#[0-9a-f]{3,8}$/i.test(t)) return t;
    if (/^(rgb|hsl|oklch|oklab|lab|lch)\(/i.test(t)) return t;
    // Try as CSS color name
    return t;
});

function onPickerInput(event: Event) {
    const hex = (event.target as HTMLInputElement).value;
    pickerHex.value = hex;
    colorText.value = hex;
}

const activeFilterCount = computed(() => {
    let count = 0;
    if (props.status) count++;
    count += props.selectedTags.length;
    if (colorSearchActive.value) count++;
    return count;
});

function toggleTag(name: string) {
    const current = [...props.selectedTags];
    const idx = current.indexOf(name);
    if (idx >= 0) current.splice(idx, 1);
    else current.push(name);
    emit("update:selectedTags", current);
}

function hexToOklab(hex: string): { L: number; a: number; b: number } {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    const lin = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
    const lr = lin(r), lg = lin(g), lb = lin(b);
    const l_ = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
    const m_ = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
    const s_ = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
    return {
        L: 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_,
        a: 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_,
        b: 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_,
    };
}

function applyColorSearch() {
    // Try hex first, then fall back to treating as hex if it starts with #
    const text = colorText.value.trim();
    const hex = text.startsWith("#") ? text : pickerHex.value;
    const lab = hexToOklab(hex);
    colorSearchActive.value = true;
    emit("colorSearch", lab.L, lab.a, lab.b);
}

function clearColorSearch() {
    colorSearchActive.value = false;
    emit("clearColorSearch");
}
</script>
