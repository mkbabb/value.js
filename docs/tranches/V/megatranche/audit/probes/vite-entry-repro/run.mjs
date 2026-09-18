import { build } from "vite";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { resolve } from "node:path";
const HERE = import.meta.dirname;
for (const v of ["inline", "external"]) {
  const root = resolve(HERE, v);
  console.log(`\n=== variant: ${v} ===`);
  try {
    await build({ root, base: "./", logLevel: "warn", build: { outDir: "out", emptyOutDir: true } });
  } catch (e) { console.log("BUILD ERROR:", String(e).slice(0, 400)); continue; }
  const adir = resolve(root, "out/assets");
  if (!existsSync(adir)) { console.log("no assets dir"); continue; }
  for (const f of readdirSync(adir).filter(f => f.endsWith(".js"))) {
    const b = readFileSync(resolve(adir, f));
    console.log(`  ${String(b.length).padStart(7)} bytes  ${f}   BOOTED-marker=${/BOOTED/.test(b.toString()) ? "YES" : "NO"}`);
  }
  const html = readFileSync(resolve(root, "out/index.html"), "utf8");
  console.log("  script tags:", (html.match(/<script[^>]*>/g) || []).join(" | "));
}
