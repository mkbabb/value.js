import { ref, computed, h, defineComponent } from "vue";
import { renderToString } from "@vue/server-renderer";
import { createSSRApp } from "vue";

const warns = [];
const orig = console.warn; console.warn = (...a) => warns.push(a.join(" "));

const Doc = defineComponent({ name: "Doc", render: () => h("div", { class: "markdown-body" }, "hi") });

// EXACT Markdown.vue shape, but with a module() that resolves a PLAIN object —
// which `DocModule = () => Promise<{ default: any }>` fully permits.
const Host = defineComponent({
  async setup() {
    const currentDoc = ref(null);                        // Markdown.vue:55  — ref, not shallowRef
    currentDoc.value = await (async () => ({ default: Doc }))();   // Markdown.vue:60
    const markdownContent = computed(() => currentDoc.value?.default ?? null); // :64-67
    return () => h(markdownContent.value);               // <component :is="markdownContent" />
  },
});
const html = await renderToString(createSSRApp(Host));
console.warn = orig;
console.log("rendered:", html);
console.log("warn count:", warns.length);
warns.forEach(w => console.log("WARN:", w.slice(0, 200)));
