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
            class="w-fit h-fit font-bold italic text-2xl p-0 m-0 border-none self-end focus:outline-none focus:ring-0 focus:ring-transparent bg-transparent select-none"
        >
            <SelectValue class="w-full" />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup class="fira-code">
                <SelectItem
                    class="text-xl"
                    v-for="space in Object.keys(COLOR_SPACE_RANGES)"
                    :value="space"
                >{{ COLOR_SPACE_NAMES[space] }}</SelectItem>
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
import {
    COLOR_SPACE_NAMES,
    COLOR_SPACE_RANGES,
} from "@src/units/color/constants";

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
