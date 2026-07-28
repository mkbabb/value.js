import { ref, isReactive, isProxy } from "vue";
// Simulate the exact shape: currentDoc.value = await module()  where module() is a dynamic import()
const ns = await import("./demo/scenes/about/markdown/index.ts").catch(() => null);
// index.ts is TS — cannot be imported by node. Use a real ESM instead.
const real = await import("./node_modules/@mkbabb/glass-ui/dist/dark.js").catch(e => ({__err:String(e).slice(0,120)}));
console.log("dynamic-import namespace isExtensible:", Object.isExtensible(real));
console.log("isFrozen:", Object.isFrozen(real));
const r = ref(real);
console.log("ref(ns).value isReactive:", isReactive(r.value), "isProxy:", isProxy(r.value));
console.log("ref(ns).value === ns  :", r.value === real);
// contrast: a PLAIN object (what a non-namespace module-shaped value would be)
const plain = { default: { name: "Doc", render(){} } };
const r2 = ref(plain);
console.log("--- plain object control ---");
console.log("ref(plain).value isReactive:", isReactive(r2.value));
console.log("ref(plain).value.default isReactive:", isReactive(r2.value.default));
