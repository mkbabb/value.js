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
            :style="{ color: cssColor }"
            class="w-fit h-fit italic text-2xl p-0 m-0 border-none rounded-none self-end bg-transparent shadow-none ring-0 ring-offset-0 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 select-none"
        >
            <SelectValue class="w-full" />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup class="fira-code">
                <SelectItem
                    class="!pl-7 !pr-3 py-1.5 text-xl !rounded-lg"
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
import { DISPLAY_COLOR_SPACE_NAMES } from ".";

defineProps<{
    modelValue: string;
    cssColor: string;
}>();

const openModel = defineModel<boolean>("open", { required: true });

const emit = defineEmits<{
    "update:modelValue": [value: string];
    "update:selectRef": [el: any];
}>();
</script>
