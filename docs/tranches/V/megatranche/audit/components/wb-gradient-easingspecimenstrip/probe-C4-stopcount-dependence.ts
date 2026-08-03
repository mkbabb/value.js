import { CubicBezier } from "@mkbabb/value.js/easing";
const fn = (CubicBezier(0, 0, 1, 1.2) as any).value;
for (const [stops, n] of [[2, 32], [3, 16], [4, 11], [5, 8], [9, 4]] as const) {
    let max = -Infinity;
    for (let k = 0; k <= n; k++) max = Math.max(max, fn(k / n));
    console.log(`stops=${stops} → stepsPerInterval=${n}: grid max = ${max.toFixed(6)}  → ${max > 1 ? "PANE DIES" : "survives"}`);
}
