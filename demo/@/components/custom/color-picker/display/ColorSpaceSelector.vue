<template>
    <Select
        :ref="(el) => { emit('update:selectRef', el); }"
        v-model:open="openModel"
        :model-value="modelValue"
        @update:model-value="
            (colorSpace: any) => {
                emit('update:modelValue', colorSpace);
                openModel = false;
            }
        "
    >
        <SelectTrigger
            variant="ghost"
            :style="{ color: safeAccent, fontFamily: 'var(--font-display)' }"
            class="w-fit h-fit italic text-3xl sm:text-4xl tracking-tight p-0 m-0 self-end focus:outline-none select-none"
        >
            <SelectValue class="w-full" />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup class="fira-code">
                <SelectItem
                    class="pl-7 pr-3 py-1.5 text-lg"
                    v-for="[space, name] in Object.entries(DISPLAY_COLOR_SPACE_NAMES)"
                    :value="space"
                    hide-indicator
                >
                    <span class="flex items-center gap-2">
                        <span
                            class="inline-block w-2 h-2 rounded-full shrink-0 transition-colors"
                            :style="{ backgroundColor: modelValue === space ? cssColor : 'transparent' }"
                        ></span>
                        <span :class="modelValue === space ? 'font-semibold' : ''">{{ name }}</span>
                    </span>
                </SelectItem>
            </SelectGroup>
        </SelectContent>
    </Select>
</template>

<script setup lang="ts">
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@components/ui/select";
import { inject } from "vue";
import { DISPLAY_COLOR_SPACE_NAMES } from "..";
import { SAFE_ACCENT_KEY } from "../keys";

defineProps<{
    modelValue: string;
    cssColor: string;
}>();

const safeAccent = inject(SAFE_ACCENT_KEY)!;

const openModel = defineModel<boolean>("open", { required: true });

const emit = defineEmits<{
    "update:modelValue": [value: string];
    "update:selectRef": [el: any];
}>();
</script>
