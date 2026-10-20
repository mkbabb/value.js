<template>
    <!-- S.W5 Lane A / W5-1 + F-13: the admin list-row shadow — the SAME
         muted-ink loading register as PaletteCardSkeleton (one recipe, both
         schemes), shaped as the AdminListItem row grammar (leading swatch +
         primary/secondary lines + trailing action lozenge). Replaces the
         generic centered `Loader2` spinner in every admin panel. -->
    <div
        data-slot="admin-list-skeleton"
        class="skeleton-ink-register flex items-center gap-3 px-3 py-2.5 rounded-md border border-card-edge"
        aria-hidden="true"
    >
        <Skeleton class="w-8 h-8 rounded-full shrink-0" />
        <!-- SS8-0487: the column is the live text stack's — one line box of
             each row type (`text-small` over `text-mono-small`, `gap-0.5`),
             each bar centred in its own line, so the swap keeps the column. -->
        <div class="flex-1 min-w-0 flex flex-col gap-0.5">
            <div class="text-small h-lh flex items-center">
                <Skeleton class="h-3.5 w-36 max-w-[60%] rounded-md" />
            </div>
            <div class="text-mono-small h-lh flex items-center">
                <Skeleton class="h-3 w-24 max-w-[40%] rounded-md" />
            </div>
        </div>
        <Skeleton class="h-7 w-14 rounded-full shrink-0" />
    </div>
</template>

<script setup lang="ts">
import { Skeleton } from "@mkbabb/glass-ui";
</script>
