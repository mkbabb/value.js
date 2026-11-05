// usage: node batch-probe.mjs <phase> — r1 then r2 of each falsifier, sequential (one browser at a time).
import { spawnSync } from "node:child_process";
import fs from "node:fs";
const P = process.argv[2]; const L = process.env.HOME + "/.dev-logs/x-0hr2";
const only = (process.env.ONLY || "od11,layout").split(",");
for (const r of ["r1", "r2"]) for (const k of only) {
  const res = spawnSync("node", [`${L}/${k}-probe.mjs`, `${P}-${r}`], { encoding: "utf8", env: process.env });
  fs.writeFileSync(`${L}/${k}-${P}-${r}.log`, (res.stdout || "") + (res.stderr || ""));
  console.log(`${k} ${P}-${r} rc=${res.status}`);
}
console.log("DONE");
