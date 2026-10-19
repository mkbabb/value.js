import { readFileSync } from "node:fs";
import base from "/Users/mkbabb/Programming/value.js/vite.config.ts";
const TARGET = "/Users/mkbabb/Programming/value.js/demo/shell/PaneSlot.vue";
const NEEDLE = '<Transition\n        :name="transitionName"';
const HOOKS = `<Transition
        mode="out-in"
        :name="transitionName"
        @leave="(el) => __log('leave')"
        @after-leave="(el) => __log('afterLeave')"
        @leave-cancelled="(el) => __log('leaveCancelled')"
        @enter="(el) => __log('enter')"
        @after-enter="(el) => __log('afterEnter')"
        @enter-cancelled="(el) => __log('enterCancelled')"`;
const SCRIPT_NEEDLE = "const liveComponent = shallowRef(component);";
const SCRIPT_INJECT = `const liveComponent = shallowRef(component);
const __log = (ev) => { (window.__w5t ??= []).push([Math.round(performance.now()), ev, liveKey.value, componentKey]); };
watch(() => componentKey, (k) => __log("keyIn:" + k), { flush: "sync" });
watch(liveComponent, () => __log("liveCommit:" + liveKey.value), { flush: "sync" });`;
const inject = {
    name: "w5t-diag", enforce: "pre",
    load(id) {
        if (id.includes("?") || id !== TARGET) return null;
        let code = readFileSync(id, "utf8");
        if (code.split(NEEDLE).length !== 2 || code.split(SCRIPT_NEEDLE).length !== 2) throw new Error("needle drift");
        code = code.replace(NEEDLE, HOOKS).replace(SCRIPT_NEEDLE, SCRIPT_INJECT);
        return { code, map: null };
    },
};
export default (env) => { const c = typeof base === "function" ? base(env) : base; return { ...c, plugins: [inject, ...(c.plugins ?? [])] }; };
