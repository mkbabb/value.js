<template>
    <div class="flex items-center gap-1.5">
        <Popover>
            <PopoverTrigger as-child>
                <Button icon-only aria-label="Filters" class="relative h-8 w-8">
                    <EllipsisVertical class="h-4 w-4 text-muted-foreground" />
                    <span
                        v-if="activeFilterCount > 0"
                        class="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-micro font-bold text-primary-foreground"
                    >
                        {{ activeFilterCount }}
                    </span>
                </Button>
            </PopoverTrigger>

            <PopoverContent align="end" class="w-60 p-0">
                <div class="flex flex-col divide-y divide-border">
                    <!-- Sort -->
                    <div class="filter-section">
                        <div class="section-label">Sort</div>
                        <RadioGroup :model-value="sort" @update:model-value="(v) => $emit('update:sort', String(v))">
                            <label v-for="opt in sortOptions" :key="opt.value" class="filter-option">
                                <RadioGroupItem :value="opt.value" class="shrink-0" />
                                <component :is="opt.icon" class="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                                <span>{{ opt.label }}</span>
                            </label>
                        </RadioGroup>
                    </div>

                    <!-- Curation tier -->
                    <div class="filter-section">
                        <div class="section-label">Tier</div>
                        <RadioGroup :model-value="tier" @update:model-value="(v) => $emit('update:tier', String(v))">
                            <label class="filter-option">
                                <RadioGroupItem value="" class="shrink-0" />
                                <span>All</span>
                            </label>
                            <label class="filter-option">
                                <RadioGroupItem value="featured" class="shrink-0" />
                                <Award class="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                                <span>Featured</span>
                            </label>
                        </RadioGroup>
                    </div>

                    <!-- Tags -->
                    <div v-if="availableTags.length > 0" class="filter-section">
                        <div class="section-label">Tags</div>
                        <div class="max-h-28 overflow-y-auto scrollbar-thin flex flex-col gap-0.5">
                            <label v-for="tag in availableTags" :key="tag.name" class="filter-option">
                                <Checkbox
                                    :model-value="selectedTags.includes(tag.name)"
                                    @update:model-value="toggleTag(tag.name)"
                                    class="shrink-0"
                                />
                                <span>{{ tag.name }}</span>
                            </label>
                        </div>
                    </div>

                    <!-- Find by Color -->
                    <div class="filter-section">
                        <div class="section-label">Find by Color</div>
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
                                    <!-- W5-a11y: swatch trigger needs accessible name -->
                                    <button
                                        class="block h-7 w-7 rounded-full border-2 border-border shadow-cartoon-sm cursor-pointer transition-shadow hover:shadow-cartoon-md shrink-0 focus-ring"
                                        :style="{ backgroundColor: pickerHex }"
                                        :aria-label="`Open color picker, current color ${pickerHex}`"
                                    />
                                </template>
                            </MiniColorPicker>
                            <!-- Text input with inline search button.
                                 S.W5-3 (S-17): the glass-ui Input pill — a
                                 CSS-literal readout field, so it keeps the
                                 Fira voice via class (font only, no chrome
                                 fork). -->
                            <div class="relative flex-1 min-w-0">
                                <Input
                                    v-model="colorText"
                                    type="text"
                                    size="sm"
                                    placeholder="#hex, hsl(...)"
                                    aria-label="Search by CSS color"
                                    :aria-invalid="colorError ? true : undefined"
                                    :aria-describedby="colorError ? colorErrorId : undefined"
                                    class="w-full pr-16 font-mono truncate"
                                    @keydown.enter="applyColorSearch"
                                    @update:model-value="colorError = ''"
                                />
                                <button
                                    :disabled="searching"
                                    class="absolute right-1 top-1/2 -translate-y-1/2 h-6 px-2 rounded-full text-micro text-muted-foreground hover:text-foreground bg-muted/50 hover:bg-muted transition-colors duration-fast cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
                                    @click="applyColorSearch"
                                >
                                    <Loader2 v-if="searching" class="h-3 w-3 animate-spin" />
                                    <span v-else>Search</span>
                                </button>
                            </div>
                        </div>
                        <!-- X.W12U.s2 · UIA-V-33: a query the parser refuses is said
                             under the field, and nothing is searched. -->
                        <p
                            v-if="colorError"
                            :id="colorErrorId"
                            role="alert"
                            class="mt-1.5 text-caption text-destructive"
                        >
                            {{ colorError }}
                        </p>
                    </div>

                    <!-- Clear all -->
                    <div v-if="activeFilterCount > 0" class="px-3 py-2">
                        <Button
                            size="xs"
                            class="w-full text-small text-muted-foreground"
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
import { ref, computed, useId } from "vue";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../../../ui/popover";
import MiniColorPicker from "./MiniColorPicker.vue";
import { RadioGroup, RadioGroupItem } from "../../../ui/radio-group";
import { Checkbox } from "../../../ui/checkbox";
import {
    EllipsisVertical,
    Clock,
    TrendingUp,
    GitFork,
    Award,
    X,
    Loader2,
} from "@lucide/vue";
import type { Tag } from "../../types";
import { parseCssColor } from "@mkbabb/value.js/css";
import type { AnyColor } from "@mkbabb/value.js/color";
import {
    convertPickerColor,
    parsePickerColor,
    pickerColorToHex,
} from "../../../color-session/picker-color";

const { sort, tier, selectedTags, availableTags } = defineProps<{
    sort: string;
    tier: string;
    selectedTags: string[];
    availableTags: Tag[];
}>();

const emit = defineEmits<{
    "update:sort": [value: string];
    "update:tier": [value: string];
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
const searching = ref(false);
const colorError = ref("");
const colorErrorId = useId();

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
    if (tier) count++;
    count += selectedTags.length;
    if (colorSearchActive.value) count++;
    return count;
});

function toggleTag(name: string) {
    const current = [...selectedTags];
    const idx = current.indexOf(name);
    if (idx >= 0) current.splice(idx, 1);
    else current.push(name);
    emit("update:selectedTags", current);
}

function hexToOklab(hex: string): { L: number; a: number; b: number } {
    return colorToOklab(parsePickerColor(hex));
}

function colorToOklab(color: AnyColor): { L: number; a: number; b: number } {
    const [L, a, b] = convertPickerColor(color, "oklab").channels;
    if (L === "none" || a === "none" || b === "none") {
        throw new Error("Color produced missing OKLab channels");
    }
    return { L, a, b };
}

/**
 * X.W12U.s2 · UIA-V-33: the typed field takes any CSS colour its placeholder
 * advertises (hex, hsl(), oklch(), a named colour …), parsed by the library.
 * A refused query is said on the field and emits nothing; an accepted one
 * moves the swatch to the colour being searched. An empty field searches the
 * swatch's colour.
 */
async function applyColorSearch() {
    if (searching.value) return;
    const text = colorText.value.trim();
    let color: AnyColor | null = null;
    if (text) {
        const parsed = parseCssColor(text);
        if (!parsed.ok) {
            colorError.value = `“${text}” is not a CSS color.`;
            return;
        }
        color = parsed.value;
        pickerHex.value = pickerColorToHex(color).slice(0, 7);
    }
    colorError.value = "";
    searching.value = true;
    try {
        const lab = color ? colorToOklab(color) : hexToOklab(pickerHex.value);
        colorSearchActive.value = true;
        emit("colorSearch", lab.L, lab.a, lab.b);
    } finally {
        searching.value = false;
    }
}

function onClearAll() {
    colorSearchActive.value = false;
    colorText.value = "";
    colorError.value = "";
    emit("clearColorSearch");
    emit("clearFilters");
}
</script>

<style scoped>
@reference "../../../styles/foundation.css";

.filter-section { padding: 0.75rem; }
.filter-section > .section-label { margin-bottom: 0.375rem; }
.filter-option {
    display: flex; align-items: center; gap: 0.5rem;
    padding: 0.25rem 0.5rem;
    font-family: var(--font-serif); font-size: var(--type-small);
    line-height: var(--leading-small); cursor: pointer;
    border-radius: var(--radius-md);
    transition: background-color var(--duration-fast) var(--ease-standard);
}
.filter-option:hover { background-color: color-mix(in srgb, var(--accent) 50%, transparent); }
</style>
