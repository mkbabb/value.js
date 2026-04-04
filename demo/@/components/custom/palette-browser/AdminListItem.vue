<template>
    <div class="flex items-center gap-3 px-3 py-2 rounded-[var(--radius-md)] border border-border">
        <slot name="swatch" />
        <div class="flex-1 min-w-0 overflow-hidden">
            <slot name="content" />
        </div>
        <div class="flex items-center gap-1.5 shrink-0">
            <slot name="actions" />
        </div>
    </div>
</template>
