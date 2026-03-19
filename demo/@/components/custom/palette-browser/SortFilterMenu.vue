<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <button class="p-0.5 rounded-sm hover:bg-accent/50 transition-colors cursor-pointer shrink-0">
                <EllipsisVertical class="w-4 h-4 text-muted-foreground" />
            </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" class="w-48 fraunces">
            <DropdownMenuRadioGroup
                :model-value="sort"
                @update:model-value="(v: any) => $emit('update:sort', v as string)"
            >
                <DropdownMenuRadioItem value="newest" class="text-sm cursor-pointer gap-2">
                    <Clock class="w-3.5 h-3.5" />
                    Newest first
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="popular" class="text-sm cursor-pointer gap-2">
                    <TrendingUp class="w-3.5 h-3.5" />
                    Most popular
                </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
        </DropdownMenuContent>
    </DropdownMenu>
</template>

<script setup lang="ts">
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { EllipsisVertical, Clock, TrendingUp } from "lucide-vue-next";

defineProps<{
    sort: "newest" | "popular";
}>();

defineEmits<{
    "update:sort": [value: string];
}>();
</script>
