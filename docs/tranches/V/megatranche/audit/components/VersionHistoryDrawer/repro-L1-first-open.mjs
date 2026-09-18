// CHALLENGE-L · L1 reproduction — the first-open blank drawer.
//
// Mirrors, exactly, the BrowsePane.vue ↔ VersionHistoryDrawer.vue seam:
//   BrowsePane.vue:272-275  onVersions() sets versionPalette AND versionDrawerOpen
//                           in the SAME synchronous tick.
//   BrowsePane.vue:157-159  <VersionHistoryDrawer v-if="versionPalette" :open="versionDrawerOpen">
//   VersionHistoryDrawer.vue:158-167  watch(() => open, …)   ← NOT immediate
//
// Run: node docs/tranches/V/megatranche/audit/components/VersionHistoryDrawer/repro-L1-first-open.mjs
import { JSDOM } from "jsdom";
const dom = new JSDOM("<!doctype html><div id=app></div>");
globalThis.window = dom.window;
globalThis.document = dom.window.document;
globalThis.SVGElement = dom.window.SVGElement;
globalThis.Element = dom.window.Element;
globalThis.Node = dom.window.Node;

const { createApp, h, ref, watch, defineComponent, nextTick } = await import("vue");

let loadCalls = 0;

// ── the child: the EXACT trigger shape of VersionHistoryDrawer.vue ───────────
const Drawer = defineComponent({
    props: { open: Boolean, paletteSlug: String },
    setup(props) {
        watch(
            () => props.open,
            (isOpen) => {
                if (isOpen && props.paletteSlug) loadCalls++; // ← loadVersions()
            },
        );
        return () => h("div", "drawer");
    },
});

// ── the parent: the EXACT mount shape of BrowsePane.vue ─────────────────────
const versionPalette = ref(null);
const versionDrawerOpen = ref(false);

const Parent = defineComponent({
    setup() {
        return () =>
            versionPalette.value
                ? h(Drawer, {
                      open: versionDrawerOpen.value,
                      paletteSlug: versionPalette.value.slug,
                  })
                : null;
    },
});

createApp(Parent).mount(document.getElementById("app"));

// onVersions(palette) — BrowsePane.vue:272
versionPalette.value = { slug: "demo-slug" };
versionDrawerOpen.value = true;
await nextTick();
console.log("after FIRST open  → loadVersions calls =", loadCalls, "(expected 1)");

// user closes
versionDrawerOpen.value = false;
await nextTick();

// user re-opens the SAME palette
versionDrawerOpen.value = true;
await nextTick();
console.log("after SECOND open → loadVersions calls =", loadCalls, "(expected 2)");

process.exit(loadCalls === 2 ? 0 : 1);
