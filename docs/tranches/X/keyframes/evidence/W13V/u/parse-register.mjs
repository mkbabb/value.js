// SERVED MODEL: claude-opus-5-5 — parse UI-AUDIT-keyframes.md into rows.json
import fs from "node:fs";
const src = fs.readFileSync(new URL("../../../../audit/UI-AUDIT-keyframes.md", import.meta.url), "utf8");
const lines = src.split("\n");
const rows = []; let cur = null;
for (const l of lines) {
  const m = l.match(/^\*\*UIA-KF-(\d+) · (\w+) · (.*?)\*\*\s*(.*)$/);
  if (m) { cur = { id: +m[1], sev: m[2], title: m[3], tags: m[4], f: {} }; rows.push(cur); continue; }
  if (/^## /.test(l)) { cur = null; continue; }
  const f = cur && l.match(/^- \*(\w+):\*\s*(.*)$/);
  if (f) cur.f[f[1].toLowerCase()] = f[2];
}
for (const r of rows) { const o = r.f.owner || ""; r.owner = /^GLASS\+CONSUMER/.test(o) ? "GLASS+CONSUMER" : /^GLASS/.test(o) ? "GLASS" : /^CONSUMER \(pin\)/.test(o) ? "CONSUMER(pin)" : /^CONSUMER/.test(o) ? "CONSUMER" : /^VALUE/.test(o) ? "VALUE.JS" : "?"; r.hasFrame = /png|jpg|webm|json/.test(r.f.frame || ""); }
fs.writeFileSync(new URL("./rows.json", import.meta.url), JSON.stringify(rows, null, 1));
const c = {}; for (const r of rows) c[r.owner] = (c[r.owner] || 0) + 1;
const s = {}; for (const r of rows) s[r.sev] = (s[r.sev] || 0) + 1;
console.log("rows", rows.length, "unique", new Set(rows.map(r => r.id)).size, "max", Math.max(...rows.map(r => r.id)));
console.log("owner", JSON.stringify(c)); console.log("sev", JSON.stringify(s));
console.log("noFrame", rows.filter(r => !r.hasFrame).map(r => r.id).join(","));
