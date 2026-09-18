import { computed, type Ref, type ComputedRef } from "vue";

export function useFilteredList<T>(
    items: Ref<T[]>,
    searchQuery: Ref<string>,
    predicate: (item: T, query: string) => boolean,
): ComputedRef<T[]> {
    return computed(() => {
        const q = searchQuery.value.toLowerCase();
        if (!q) return items.value;
        return items.value.filter((item) => predicate(item, q));
    });
}
