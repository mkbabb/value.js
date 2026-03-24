<template>
    <CardTitle
        class="flex h-fit text-4xl w-full m-0 p-0 focus-visible:outline-none gap-x-2 flex-wrap font-normal"
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
                    :class="[
                        'font-normal focus-visible:outline-none',
                        formatted[component]?.monospace && 'fira-code',
                    ]"
                    @input="
                        (e) => {
                            const text = (e.target as any).innerText.trim();
                            emit('input', text, component);
                        }
                    "
                >{{ formatValue(formatted[component]) }}</span>
                <span
                    v-if="formatted[component]?.unit"
                    class="font-normal italic text-lg"
                >{{ formatted[component].unit }}</span
                ><span class="inline font-normal">{{
                    ix !== colorComponents.length - 1 ? "," : ""
                }}</span>
            </div>
        </template>
    </CardTitle>
</template>

<script setup lang="ts">
import { CardTitle } from "@components/ui/card";

export interface ComponentFormat {
    value: number | string;
    unit?: string;
    monospace?: boolean;
}

defineProps<{
    colorComponents: [string, any][];
    formatted: Record<string, ComponentFormat>;
}>();

const emit = defineEmits<{
    update: [value: number, component: string];
    input: [text: string, component: string];
}>();

function formatValue(fmt: ComponentFormat | undefined): string {
    if (!fmt) return "";
    if (typeof fmt.value === "string") return fmt.value;
    return fmt.value
        .toFixed(1)
        .replace(/\.0$/, "")
        .replace(/^-0$/, "0");
}
</script>
