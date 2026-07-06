<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <!-- S.W5-4: the triplicated hand-rolled icon-trigger recipe dies
                 onto the sanctioned glass-ui atom (+ the missing name). -->
            <Button
                icon-only
                variant="ghost"
                size="xs"
                aria-label="Sort users"
                class="shrink-0"
            >
                <EllipsisVertical class="w-4 h-4 text-muted-foreground" aria-hidden="true" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" class="w-48 font-display">
            <DropdownMenuLabel class="text-micro">Sort</DropdownMenuLabel>
            <DropdownMenuRadioGroup
                :model-value="sort"
                @update:model-value="(v: any) => $emit('update:sort', v as string)"
            >
                <DropdownMenuRadioItem value="newest" class="text-small cursor-pointer gap-2">
                    <Clock class="w-3.5 h-3.5" />
                    Newest first
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="slug" class="text-small cursor-pointer gap-2">
                    <ArrowDownAZ class="w-3.5 h-3.5" />
                    Alphabetical
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="palettes" class="text-small cursor-pointer gap-2">
                    <Palette class="w-3.5 h-3.5" />
                    Most palettes
                </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
        </DropdownMenuContent>
    </DropdownMenu>
</template>

<script setup lang="ts">
import { Button } from "@components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { EllipsisVertical, Clock, ArrowDownAZ, Palette } from "@lucide/vue";

defineProps<{
    sort: "slug" | "newest" | "palettes";
}>();

defineEmits<{
    "update:sort": [value: string];
}>();
</script>
