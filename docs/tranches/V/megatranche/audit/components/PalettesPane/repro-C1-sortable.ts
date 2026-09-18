/**
 * CHALLENGE-C repro C-1/C-2 — PalettesPane drag-to-reorder.
 *
 * Audit artifact ONLY. Not part of the build, not in any vitest include glob
 * (`test/**` + `demo/test/**`). Run with:
 *
 *   npx vite-node docs/tranches/V/megatranche/audit/components/PalettesPane/repro-C1-sortable.ts
 *
 * It drives the REAL modules: the real `moveArrayElement` (vueuse's default
 * `onUpdate` that `useSortable` installs), the real `useFilteredList`, the real
 * `reorderPalettes` from `usePaletteStore`, and a VERBATIM copy of the `onEnd`
 * body from `demo/palettes/PalettesPane.vue:187-196`.
 */

// ── minimal browser stubs so `useStorage` binds a real (in-memory) Storage ──
class MemStorage {
    private m = new Map<string, string>();
    get length() { return this.m.size; }
    key(i: number) { return [...this.m.keys()][i] ?? null; }
    getItem(k: string) { return this.m.get(k) ?? null; }
    setItem(k: string, v: string) { this.m.set(k, String(v)); }
    removeItem(k: string) { this.m.delete(k); }
    clear() { this.m.clear(); }
}
const g = globalThis as any;
g.localStorage = new MemStorage();
g.addEventListener = () => {};
g.removeEventListener = () => {};
g.document = { addEventListener: () => {}, removeEventListener: () => {}, visibilityState: "visible" };
g.window = g;
g.crypto ??= { randomUUID: () => Math.random().toString(36).slice(2) };

const { ref, nextTick } = await import("vue");
// VERBATIM from node_modules/@vueuse/integrations/dist/useSortable.js (the
// `moveArrayElement` vueuse installs as its DEFAULT `onUpdate` handler). Copied
// rather than imported because importing that module pulls in sortablejs, which
// needs a real DOM at import time. `e` is passed null here: the `e != null`
// branch only reverts the DOM nodes, it does not touch the array math.
function moveArrayElement(list: any, from: number, to: number) {
    const _valueIsRef = false; // isRef(list) — list is a plain array here
    const array = list;
    if (to >= 0 && to < array.length) {
        const element = array.splice(from, 1)[0];
        nextTick(() => {
            array.splice(to, 0, element);
            if (_valueIsRef) list.value = array;
        });
    }
}
const { useFilteredList } = await import("/Users/mkbabb/Programming/value.js/demo/palettes/useFilteredList");
const { usePaletteStore } = await import("/Users/mkbabb/Programming/value.js/demo/palettes/usePaletteStore");

const { createPalette, savedPalettes, reorderPalettes, store } = usePaletteStore();

const names = ["Alpha", "Bravo", "Charlie", "Delta"];
// createPalette unshifts, so create in reverse for A,B,C,D display order
for (const n of [...names].reverse()) createPalette(n, [{ css: "#000", position: 0 }]);

const searchQuery = ref("");
const filteredSaved = useFilteredList(savedPalettes as any, searchQuery, (p: any, q: string) =>
    p.name.toLowerCase().includes(q) || p.slug.includes(q),
);

const show = (label: string) =>
    console.log(label.padEnd(34), store.value.palettes.map((p: any) => p.name).join(" "));

// ── EXACT PalettesPane wiring: the list handed to useSortable is a SNAPSHOT ──
const sortableList = filteredSaved.value; //  PalettesPane.vue:183 `pm.filteredSaved.value`

function onEnd(evt: { oldIndex: number | null; newIndex: number | null }) {
    // verbatim from PalettesPane.vue:187-196
    if (evt.oldIndex == null || evt.newIndex == null) return;
    if (evt.oldIndex === evt.newIndex) return;
    const ids = filteredSaved.value.map((p: any) => p.id);
    const [moved] = ids.splice(evt.oldIndex, 1);
    if (moved) {
        ids.splice(evt.newIndex, 0, moved);
        reorderPalettes(ids as string[]);
    }
}

/** Sortable dispatches `update` (→ vueuse default onUpdate) then `end`, same stack. */
async function drag(oldIndex: number, newIndex: number) {
    moveArrayElement(sortableList as any, oldIndex, newIndex); // vueuse default onUpdate
    onEnd({ oldIndex, newIndex });                                          // our onEnd
    await nextTick();
}

console.log("=== C-1 · first drag after mount, no search ===");
show("initial:");
console.log("identity(list === filteredSaved.value):", sortableList === filteredSaved.value);
console.log("drag Alpha (0) -> index 2 ; expected: Bravo Charlie Alpha Delta");
await drag(0, 2);
show("ACTUAL:");

console.log("\n=== C-2 · reorder while a search filter is active ===");
// rebuild a clean store
store.value.palettes = [];
for (const n of [...names].reverse()) createPalette(n, [{ css: "#000", position: 0 }]);
show("initial:");
searchQuery.value = "a"; // matches Alpha, Bravo, Charlie, Delta? -> check
console.log("filtered by 'a':", filteredSaved.value.map((p: any) => p.name).join(" "));
searchQuery.value = "ar"; // Charlie only? show which
console.log("filtered by 'ar':", filteredSaved.value.map((p: any) => p.name).join(" "));
searchQuery.value = "l"; // Alpha, Charlie, Delta
console.log("filtered by 'l':", filteredSaved.value.map((p: any) => p.name).join(" "));
console.log("drag filtered[0] -> filtered[1] (Alpha below Charlie); Bravo must NOT move");
await drag(0, 1);
show("ACTUAL (store order):");
searchQuery.value = "";
show("after clearing search:");
