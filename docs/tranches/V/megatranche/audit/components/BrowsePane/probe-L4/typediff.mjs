import { readFileSync } from "fs";
const demo = readFileSync("demo/palettes/types.ts","utf8");
const fmt  = readFileSync("api/src/modules/palette/format.ts","utf8");
function fields(src, iface){
  const m = src.match(new RegExp("interface "+iface+"\\s*\\{([\\s\\S]*?)\\n\\}"));
  const body = m[1];
  const out = {};
  for (const line of body.split("\n")) {
    const f = line.match(/^\s{4}([a-zA-Z_]+)(\??):\s*(.+?);\s*$/);
    if (f) out[f[1]] = { optional: f[2] === "?", type: f[3] };
  }
  return out;
}
const D = fields(demo, "Palette");
const F = fields(fmt, "FormattedPalette");
const keys = [...new Set([...Object.keys(F), ...Object.keys(D)])].sort();
let diverge = 0;
console.log("| field | server FormattedPalette | demo Palette | verdict |");
console.log("|---|---|---|---|");
for (const k of keys) {
  const f = F[k], d = D[k];
  const fs_ = f ? (f.optional?"?: ":": ")+f.type : "—";
  const ds = d ? (d.optional?"?: ":": ")+d.type : "—";
  let v = "same";
  if (!f || !d) v = "**only one side**";
  else if (f.optional !== d.optional) v = "**optionality differs**";
  else if (f.type.replace(/Palette\["\w+"\]/,"") !== d.type) v = "**type differs**";
  if (v !== "same") diverge++;
  console.log(`| \`${k}\` | \`${fs_}\` | \`${ds}\` | ${v} |`);
}
console.log("\nDIVERGENT:", diverge, "of", keys.length);
