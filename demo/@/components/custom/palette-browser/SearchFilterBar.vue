<template>
    <div class="flex items-center gap-1.5">
        <Popover>
            <PopoverTrigger as-child>
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
            </PopoverTrigger>

            <PopoverContent align="end" class="w-60 p-0">
                <div class="flex flex-col divide-y divide-border">
                    <!-- Sort -->
                    <div class="px-3 py-2.5">
                        <div class="section-label mb-1.5">Sort</div>
                        <RadioGroup :model-value="sort" @update:model-value="$emit('update:sort', $event)">
                            <label
                                v-for="opt in sortOptions"
                                :key="opt.value"
                                class="flex items-center gap-2 rounded-md px-2 py-1 text-small cursor-pointer hover:bg-accent/50 transition-colors"
                            >
                                <RadioGroupItem :value="opt.value" class="shrink-0" />
                                <component :is="opt.icon" class="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                                <span>{{ opt.label }}</span>
                            </label>
                        </RadioGroup>
                    </div>

                    <!-- Status -->
                    <div class="px-3 py-2.5">
                        <div class="section-label mb-1.5">Status</div>
                        <RadioGroup :model-value="status" @update:model-value="$emit('update:status', $event)">
                            <label class="flex items-center gap-2 rounded-md px-2 py-1 text-small cursor-pointer hover:bg-accent/50 transition-colors">
                                <RadioGroupItem value="" class="shrink-0" />
                                <span>All</span>
                            </label>
                            <label class="flex items-center gap-2 rounded-md px-2 py-1 text-small cursor-pointer hover:bg-accent/50 transition-colors">
                                <RadioGroupItem value="featured" class="shrink-0" />
                                <Award class="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                                <span>Featured</span>
                            </label>
                        </RadioGroup>
                    </div>

                    <!-- Tags -->
                    <div v-if="availableTags.length > 0" class="px-3 py-2.5">
                        <div class="section-label mb-1.5">Tags</div>
                        <div class="max-h-28 overflow-y-auto flex flex-col gap-0.5">
                            <label
                                v-for="tag in availableTags"
                                :key="tag.name"
                                class="flex items-center gap-2 rounded-md px-2 py-1 text-small cursor-pointer hover:bg-accent/50 transition-colors"
                            >
                                <Checkbox
                                    :checked="selectedTags.includes(tag.name)"
                                    @update:checked="toggleTag(tag.name)"
                                    class="shrink-0"
                                />
                                <span>{{ tag.name }}</span>
                            </label>
                        </div>
                    </div>

                    <!-- Find by Color -->
                    <div class="px-3 py-2.5">
                        <div class="section-label mb-1.5">Find by Color</div>
                        <div class="flex items-center gap-1.5">
                            <!-- Mini color picker trigger swatch -->
                            <MiniColorPicker
                                :open="miniPickerOpen"
                                :hex="pickerHex"
                                @update:open="miniPickerOpen = $event"
                                @update:hex="onPickerHexUpdate"
                                @search="applyColorSearchFromPicker"
                            >
                                <template #trigger>
                                    <button
                                        class="block h-7 w-7 rounded-full border-2 border-border shadow-cartoon-sm cursor-pointer transition-shadow hover:shadow-cartoon-md shrink-0"
                                        :style="{ backgroundColor: pickerHex }"
                                    />
                                </template>
                            </MiniColorPicker>
                            <!-- Text input with inline search button -->
                            <div class="relative flex-1 min-w-0">
                                <input
                                    v-model="colorText"
                                    type="text"
                                    placeholder="#hex, hsl(...)"
                                    class="h-7 w-full rounded-md border border-input bg-background pl-2 pr-14 font-mono-code text-caption truncate focus:outline-none focus:ring-1 focus:ring-ring"
                                    @keydown.enter="applyColorSearch"
                                />
                                <button
                                    class="absolute right-0.5 top-0.5 h-6 px-2 rounded text-micro text-muted-foreground hover:text-foreground bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                                    @click="applyColorSearch"
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Clear all -->
                    <div v-if="activeFilterCount > 0" class="px-3 py-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            class="h-7 w-full text-small text-muted-foreground"
                            @click="onClearAll"
                        >
                            <X class="h-3.5 w-3.5 mr-1.5" />
                            Clear all filters
                        </Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { Button } from "@components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui/popover";
import MiniColorPicker from "./MiniColorPicker.vue";
import { RadioGroup, RadioGroupItem } from "@components/ui/radio-group";
import { Checkbox } from "@components/ui/checkbox";
import {
    EllipsisVertical,
    Clock,
    TrendingUp,
    GitFork,
    Award,
    X,
} from "lucide-vue-next";
import type { Tag } from "@lib/palette/types";
import { srgbToOKLab } from "@src/units/color/gamut";
import { hex2rgb } from "@src/units/color/utils";

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

const sortOptions = [
    { value: "newest", label: "Newest", icon: Clock },
    { value: "popular", label: "Most Popular", icon: TrendingUp },
    { value: "most-forked", label: "Most Forked", icon: GitFork },
];

const colorText = ref("");
const pickerHex = ref("#4488cc");
const colorSearchActive = ref(false);
const miniPickerOpen = ref(false);

function onPickerHexUpdate(hex: string) {
    pickerHex.value = hex;
    colorText.value = hex;
}

function applyColorSearchFromPicker(hex: string) {
    pickerHex.value = hex;
    colorText.value = hex;
    miniPickerOpen.value = false;
    const lab = hexToOklab(hex);
    colorSearchActive.value = true;
    emit("colorSearch", lab.L, lab.a, lab.b);
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
    const rgb = hex2rgb(hex);
    const [L, a, b] = srgbToOKLab(rgb.r, rgb.g, rgb.b);
    return { L, a, b };
}

function applyColorSearch() {
    const text = colorText.value.trim();
    const hex = text.startsWith("#") && /^#[0-9a-f]{6}$/i.test(text) ? text : pickerHex.value;
    const lab = hexToOklab(hex);
    colorSearchActive.value = true;
    emit("colorSearch", lab.L, lab.a, lab.b);
}

function onClearAll() {
    colorSearchActive.value = false;
    colorText.value = "";
    emit("clearColorSearch");
    emit("clearFilters");
}
</script>
