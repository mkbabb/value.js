<template>
    <CardTitle
        class="flex h-fit text-4xl w-full m-0 p-0 focus-visible:outline-none gap-x-2 flex-wrap"
    >
        <template
            v-for="([component, value], ix) in colorComponents"
            :key="component"
        >
            <div>
                <span
                    contenteditable="true"
                    role="textbox"
                    :aria-label="`${component} component value`"
                    class="font-semibold focus-visible:outline-none"
                    @input="
                        (e) => {
                            const v = parseFloat((e.target as any).innerText);
                            if (!Number.isNaN(v)) emit('update', v, component);
                        }
                    "
                >{{
                    formatted[component].value
                        .toFixed(1)
                        .replace(/\.0$/, '')
                        .replace(/^-0$/, '0')
                }}
                </span>
                <span
                    v-if="formatted[component].unit !== ''"
                    class="font-normal italic text-lg"
                >
                    {{ formatted[component].unit }}</span
                ><span class="inline font-normal">{{
                    ix !== colorComponents.length - 1 ? "," : ""
                }}</span>
            </div>
        </template>
    </CardTitle>
</template>

<script setup lang="ts">
import { CardTitle } from "@components/ui/card";

defineProps<{
    colorComponents: [string, number][];
    formatted: Record<string, { value: number; unit: string }>;
}>();

const emit = defineEmits<{
    update: [value: number, component: string];
}>();
</script>
