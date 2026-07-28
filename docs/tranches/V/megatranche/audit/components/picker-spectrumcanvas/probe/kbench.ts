import { convertColor, hsv } from "/Users/mkbabb/Programming/value.js/src/color/index.ts";

const r = hsv(200, 0.6, 0.7, 1);
if (!r.ok) throw new Error("hsv failed");
const c = r.value;
convertColor(c, "kelvin");
const N = 20;
let t0 = performance.now();
for (let i = 0; i < N; i++) convertColor(c, "kelvin");
let t1 = performance.now();
console.log(`hsv->kelvin: ${((t1 - t0) / N).toFixed(3)} ms/op (n=${N})`);

t0 = performance.now();
for (let i = 0; i < 2000; i++) convertColor(c, "oklch");
t1 = performance.now();
console.log(`hsv->oklch:  ${((t1 - t0) / 2000).toFixed(4)} ms/op (n=2000)`);

const kr = convertColor(c, "kelvin");
if (!kr.ok) throw new Error("kelvin convert failed: " + JSON.stringify(kr));
const k = kr.value;
console.log("kelvin color:", JSON.stringify(k));
t0 = performance.now();
for (let i = 0; i < N; i++) {
  const h = convertColor(k, "hsv");
  if (!h.ok) throw new Error("back");
  convertColor(h.value, "kelvin");
}
t1 = performance.now();
console.log(`spectrum drag frame in kelvin space: ${((t1 - t0) / N).toFixed(3)} ms/frame (n=${N})`);
