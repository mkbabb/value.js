import { CubicBezier } from "@mkbabb/value.js/easing";
for (const y2 of [1.0, 1.1, 1.2, 1.3]) {
    const fn = (CubicBezier(0, 0, 1, y2) as any).value;
    let maxGrid = -Infinity, maxGridAt = 0, offGrid = -Infinity;
    for (let k = 0; k <= 32; k++) { const y = fn(k / 32); if (y > maxGrid) { maxGrid = y; maxGridAt = k; } }
    for (let k = 0; k <= 4096; k++) { const y = fn(k / 4096); if (y > offGrid) offGrid = y; }
    console.log(
        `cubic-bezier(0, 0, 1, ${y2})  max over the 32-sample grid = ${maxGrid.toFixed(6)} (k=${maxGridAt}/32)  ` +
        `| true max = ${offGrid.toFixed(6)} | grid sample > 1 ? ${maxGrid > 1}`,
    );
}
