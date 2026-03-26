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
                            <!-- Inline text + search -->
                            <input
                                v-model="colorText"
                                type="text"
                                placeholder="#hex, hsl(...)"
                                class="h-7 flex-1 min-w-0 rounded-md border border-input bg-background px-2 font-mono-code text-caption focus:outline-none focus:ring-1 focus:ring-ring"
                                @keydown.enter="applyColorSearch"
                            />
                            <Button
                                variant="outline"
                                size="sm"
                                class="h-7 px-2.5 text-micro shrink-0"
                                @click="applyColorSearch"
                            >
                                Search
                            </Button>
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
