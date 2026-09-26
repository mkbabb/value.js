<template>
    <div class="flex items-center gap-1.5">
        <Popover>
            <PopoverTrigger as-child>
                <!-- X.W12U.s2 · UIA-V-118 · V-310: the filter glyph, on the glass
                     sm square (no h/w override), seated inside the search bar. -->
                <Button
                    icon-only
                    size="sm"
                    :aria-label="activeFilterCount > 0 ? `Filters, ${activeFilterCount} active` : 'Filters'"
                    class="relative"
                >
                    <ListFilter class="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                    <span
                        v-if="activeFilterCount > 0"
                        class="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-micro font-bold text-primary-foreground"
                    >
                        {{ activeFilterCount }}
                    </span>
                </Button>
            </PopoverTrigger>

            <!-- X.W12U.s2 · UIA-V-32 (consumer half; A2-VA-L2-1 at 844×390):
                 the panel is shrunk to fit rather than scrolled — Sort is one
                 glass ToggleGroup row, Featured and every tag are glass
                 selectable Chips in one wrapping set (no nested 112 px
                 scroller), and the glass overlay pad and width are not
                 overridden. The plate's own block cap is the glass half (O-59). -->
            <PopoverContent align="end">
                <div class="filter-panel">
                    <!-- Sort -->
                    <section class="filter-section" aria-labelledby="browse-filter-sort">
                        <div id="browse-filter-sort" class="section-label">Sort</div>
                        <ToggleGroup
                            type="single"
                            size="sm"
                            aria-labelledby="browse-filter-sort"
                            :model-value="sort"
                            @update:model-value="onSortPick"
                        >
                            <ToggleGroupItem v-for="opt in sortOptions" :key="opt.value" :value="opt.value">
                                {{ opt.label }}
                            </ToggleGroupItem>
                        </ToggleGroup>
                    </section>

                    <!-- Curation tier + tags: one set of toggles -->
                    <section class="filter-section" aria-labelledby="browse-filter-show">
                        <div id="browse-filter-show" class="section-label">Show</div>
                        <div class="flex flex-wrap gap-1.5">
                            <Chip
                                mode="selectable"
                                size="sm"
                                :model-value="tier === 'featured'"
                                @update:model-value="(on: boolean) => $emit('update:tier', on ? 'featured' : '')"
                            >
                                <Award class="h-3.5 w-3.5" aria-hidden="true" />
                                Featured
                            </Chip>
                        </div>
                        <TagChipSet
                            v-if="availableTags.length > 0"
                            class="mt-2"
                            label="Tags"
                            :tags="availableTags"
                            :selected="selectedTags"
                            @toggle="(name: string) => toggleTag(name)"
                        />
                    </section>

                    <!-- Find by Color -->
                    <section class="filter-section" aria-labelledby="browse-filter-color">
                        <div id="browse-filter-color" class="section-label">Find by Color</div>
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
                    </section>

                    <!-- Clear all -->
                    <Button
                        v-if="activeFilterCount > 0"
                        size="xs"
                        emphasis="text"
                        class="self-start"
                        @click="onClearAll"
                    >
                        <X class="h-3.5 w-3.5" aria-hidden="true" />
                        Clear all filters
                    </Button>
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
import TagChipSet from "./TagChipSet.vue";
import { Chip } from "@mkbabb/glass-ui/chip";
import { ToggleGroup, ToggleGroupItem } from "@mkbabb/glass-ui/toggle-group";
import {
    ListFilter,
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

const { sort, tier, selectedTags, availableTags, colorActive = false } = defineProps<{
    sort: string;
    tier: string;
    selectedTags: string[];
    availableTags: Tag[];
    /** The host owns the colour query (X.W12U.s2 · UIA-V-122: it can clear it
     *  from the empty wall), so whether one is active is read, not kept here. */
    colorActive?: boolean;
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
    { value: "newest", label: "Newest" },
    { value: "popular", label: "Popular" },
    { value: "most-forked", label: "Most forked" },
];

/** A single-choice ToggleGroup may be emptied by re-pressing the held item;
 *  the wall always has an order, so only a named choice is taken. */
function onSortPick(v: unknown) {
    if (typeof v === "string" && v) emit("update:sort", v);
}

const colorText = ref("");
const pickerHex = ref("#4488cc");
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
    emit("colorSearch", lab.L, lab.a, lab.b);
}

const activeFilterCount = computed(() => {
    let count = 0;
    if (tier) count++;
    count += selectedTags.length;
    if (colorActive) count++;
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
            emit("colorSearch", lab.L, lab.a, lab.b);
    } finally {
        searching.value = false;
    }
}

function onClearAll() {
    colorText.value = "";
    colorError.value = "";
    emit("clearColorSearch");
    emit("clearFilters");
}
</script>

<style scoped>
@reference "../../../styles/foundation.css";

.filter-panel { display: flex; flex-direction: column; gap: 0.875rem; }
.filter-section > .section-label { margin-bottom: 0.375rem; }
</style>
