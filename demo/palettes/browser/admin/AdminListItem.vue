<template>
    <!-- Admin list item — primary/secondary hierarchy per Ag-13 (A.W3).
         Swatch slot: sized as a 8×8 leading visual (w-8 h-8 expected).
         Content slot: wrap two lines — primary with text-small, secondary
         with text-caption text-muted-foreground. Actions slot: unchanged. -->
    <!-- S.W5-12 (F-1): min-w-0 on the ROW ITSELF — the row is a grid item,
         and its min-width:auto automatic minimum resolves to the flex row's
         min-content (the un-breakable nowrap spans), blowing the track to
         ~850px at 390. Zeroing it lets the inner min-w-0 content column
         actually truncate. -->
    <div class="flex items-center gap-3 px-3 py-2.5 rounded-md border border-card-edge min-w-0">
        <!-- Leading swatch — sized as a 8×8 visual anchor -->
        <div class="shrink-0 w-8 h-8 flex items-center justify-center">
            <slot name="swatch" />
        </div>
        <!-- Content: primary + secondary lines via slot -->
        <div class="flex-1 min-w-0 overflow-hidden flex flex-col gap-0.5">
            <slot name="content" />
        </div>
        <div class="flex items-center gap-1.5 shrink-0">
            <slot name="actions" />
        </div>
    </div>
</template>
