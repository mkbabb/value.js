import { CubicBezier, bezierPresets } from "@mkbabb/value.js/easing";
for (const name of ["ease-in-back", "ease-out-back", "ease-in-out-back", "ease-out-circ", "ease-in-out-expo"]) {
    const q = (bezierPresets as any)[name];
    const r = CubicBezier(q[0], q[1], q[2], q[3]) as any;
    const fn = r.value;
    const mid = fn(0.5);
    let outOfRange: number[] = [];
    for (let i = 0; i <= 64; i++) {
        const t = i / 64;
        const y = fn(t);
        if (y < 0 || y > 1) outOfRange.push(+t.toFixed(3));
    }
    console.log(
        `${name.padEnd(18)} fn(0.5)=${mid.toFixed(6).padStart(10)}  midInRange=${mid >= 0 && mid <= 1}  #t-out-of-[0,1]=${outOfRange.length}  firstOut=${outOfRange[0] ?? "-"}`,
    );
}
