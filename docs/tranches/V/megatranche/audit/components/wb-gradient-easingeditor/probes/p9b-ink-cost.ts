import { certifyAccentInk } from "../../../../../../../../demo/color-session/ink";
const t0 = performance.now();
const N = 200;
for (let i = 0; i < N; i++) certifyAccentInk(`oklch(0.7 0.165 ${205 + i * 0.01})`, 0.85);
const total = performance.now() - t0;
console.log(`certifyAccentInk × ${N} (distinct inputs): total ${total.toFixed(1)} ms  → ${(total / N).toFixed(3)} ms/call`);
const t1 = performance.now();
for (let i = 0; i < N; i++) certifyAccentInk("oklch(0.7 0.165 205)", 0.85);
const t2 = performance.now() - t1;
console.log(`certifyAccentInk × ${N} (SAME input):      total ${t2.toFixed(1)} ms  → ${(t2 / N).toFixed(3)} ms/call  (memoized? ${t2 < total / 5})`);
// the real shape: a new midpoint every tick, one per interval
const t3 = performance.now();
for (let tick = 0; tick < 60; tick++) for (let row = 0; row < 5; row++) certifyAccentInk(`oklch(0.7 0.165 ${205 + tick * 0.5 + row})`, 0.85);
console.log(`60 ticks × 5 rows: ${(performance.now() - t3).toFixed(1)} ms total → ${((performance.now() - t3) / 60).toFixed(2)} ms per tick`);
