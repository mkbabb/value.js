<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <button class="p-0.5 rounded-sm hover:bg-accent/50 transition-colors cursor-pointer shrink-0">
                <EllipsisVertical class="w-4 h-4 text-muted-foreground" />
            </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" class="w-48 font-display">
            <DropdownMenuLabel class="text-xs">Sort</DropdownMenuLabel>
            <DropdownMenuRadioGroup
                :model-value="sort"
                @update:model-value="(v: any) => $emit('update:sort', v as string)"
            >
                <DropdownMenuRadioItem value="newest" class="text-sm cursor-pointer gap-2">
                    <Clock class="w-3.5 h-3.5" />
                    Newest first
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="slug" class="text-sm cursor-pointer gap-2">
                    <ArrowDownAZ class="w-3.5 h-3.5" />
                    Alphabetical
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="palettes" class="text-sm cursor-pointer gap-2">
                    <Palette class="w-3.5 h-3.5" />
                    Most palettes
                </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
        </DropdownMenuContent>
    </DropdownMenu>
</template>

<script setup lang="ts">
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { EllipsisVertical, Clock, ArrowDownAZ, Palette } from "lucide-vue-next";

defineProps<{
    sort: "slug" | "newest" | "palettes";
}>();

defineEmits<{
    "update:sort": [value: string];
}>();
</script>
