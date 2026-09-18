import { convertColor, hsv } from "/Users/mkbabb/Programming/value.js/src/color/index.ts";
const H = 35.2;
const rows: string[] = [];
for (const v of [1, 0.8, 0.6, 0.4, 0.2]) {
  const cols: string[] = [];
  for (const s of [0, 0.2, 0.4, 0.6, 0.8, 1]) {
    const c = hsv(H, s, v, 1);
    if (!c.ok) { cols.push("ERR"); continue; }
    const k = convertColor(c.value, "kelvin");
    cols.push(k.ok ? String((k.value as any).channels[0]).padStart(6) : "ERR");
  }
  rows.push(`v=${v.toFixed(1)} | ${cols.join(" ")}`);
}
console.log("       |      s=0    0.2    0.4    0.6    0.8    1.0");
console.log(rows.join("\n"));
// how many DISTINCT kelvin values over a 21x21 plate sweep?
const set = new Set<number>();
for (let i = 0; i <= 20; i++) for (let j = 0; j <= 20; j++) {
  const c = hsv(H, i / 20, j / 20, 1);
  if (!c.ok) continue;
  const k = convertColor(c.value, "kelvin");
  if (k.ok) set.add((k.value as any).channels[0]);
}
console.log(`distinct kelvin values over a 21x21 (s,v) sweep at h=${H}: ${set.size} ->`, [...set].sort((a,b)=>a-b).slice(0,20));
