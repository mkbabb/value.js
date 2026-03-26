import { ref, onMounted, onUnmounted, type Ref } from "vue";

export interface InfiniteScrollOptions {
    /** Ref to the sentinel element that triggers loading when visible */
    sentinel: Ref<HTMLElement | null>;
    /** Called when the sentinel enters the viewport */
    loadMore: () => Promise<void>;
    /** Whether there are more items to load */
    hasMore: Ref<boolean>;
    /** Root margin for the IntersectionObserver */
    rootMargin?: string;
}

/**
 * Composable for infinite scroll via IntersectionObserver.
 * Watches a sentinel element and calls `loadMore` when it becomes visible.
 * Includes a generation counter to prevent stale appends.
 */
export function useInfiniteScroll(options: InfiniteScrollOptions) {
    const loading = ref(false);
    const error = ref<string | null>(null);
    const generation = ref(0);
    let observer: IntersectionObserver | null = null;

    async function handleIntersect(entries: IntersectionObserverEntry[]) {
        const entry = entries[0];
        if (!entry?.isIntersecting || loading.value || !options.hasMore.value) return;

        const gen = ++generation.value;
        loading.value = true;
        error.value = null;

        try {
            await options.loadMore();
            // If generation changed during the await, this was superseded
            if (gen !== generation.value) return;
        } catch (e) {
            if (gen !== generation.value) return;
            error.value = e instanceof Error ? e.message : "Failed to load more";
        } finally {
            if (gen === generation.value) {
                loading.value = false;
            }
        }
    }

    function observe() {
        cleanup();
        const el = options.sentinel.value;
        if (!el) return;

        observer = new IntersectionObserver(handleIntersect, {
            rootMargin: options.rootMargin ?? "200px",
        });
        observer.observe(el);
    }

    function cleanup() {
        if (observer) {
            observer.disconnect();
            observer = null;
        }
    }

    /** Reset the generation counter (invalidates in-flight loads) */
    function reset() {
        generation.value++;
        error.value = null;
    }

    onMounted(observe);
    onUnmounted(cleanup);

    return { loading, error, generation, reset, observe };
}
