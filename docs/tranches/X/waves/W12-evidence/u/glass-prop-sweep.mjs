// SERVED MODEL: claude-opus-5-5
// X.W12.u1 G-2 sweep: every attribute bound on a glass-ui component in demo/**/*.vue
// that the INSTALLED glass component does not declare as a prop or emit. Such a
// binding is a fallthrough attribute; a glass prop name among them is a dead binding.
// Usage: node docs/tranches/X/waves/W12-evidence/u/glass-prop-sweep.mjs [--all]
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { parse } from "@vue/compiler-sfc";

const ROOT = new URL("../../../../../../", import.meta.url).pathname;
const ALL = process.argv.includes("--all");
const walk = (d) => readdirSync(d).flatMap((n) => {
  const p = join(d, n);
  return statSync(p).isDirectory() ? walk(p) : p.endsWith(".vue") ? [p] : [];
});
const camel = (s) => s.replace(/-(\w)/g, (_, c) => c.toUpperCase());
const pascal = (s) => camel(s).replace(/^\w/, (c) => c.toUpperCase());
// Native/global attributes that legitimately fall through to the root element.
const NATIVE = /^(aria-|data-|on[A-Z]|class$|style$|key$|ref$|id$|role$|tabindex$|tabIndex$|title$|name$|type$|placeholder$|autocomplete$|inputmode$|inputMode$|href$|target$|rel$|for$|lang$|dir$|hidden$|draggable$|spellcheck$|autofocus$|min$|max$|step$|required$|readonly$|readOnly$|disabled$|value$|src$|alt$|width$|height$|enterkeyhint$|autocapitalize$|pattern$|maxlength$|minlength$|accept$|multiple$|download$|slot$|is$|vShow$|inert$)/;
const modCache = new Map();
const load = async (spec) => {
  if (!modCache.has(spec)) modCache.set(spec, await import(spec).catch(() => ({})));
  return modCache.get(spec);
};
const declared = (c) => {
  const keys = new Set();
  let cur = c;
  for (let i = 0; cur && i < 4; i++) {
    const p = cur.props; if (Array.isArray(p)) p.forEach((k) => keys.add(camel(k))); else if (p) Object.keys(p).forEach((k) => keys.add(camel(k)));
    const e = cur.emits; if (Array.isArray(e)) e.forEach((k) => keys.add("on" + pascal(k))); else if (e) Object.keys(e).forEach((k) => keys.add("on" + pascal(k)));
    cur = cur.extends;
  }
  return keys;
};
const rows = [];
for (const file of walk(join(ROOT, "demo")).sort()) {
  const src = readFileSync(file, "utf8");
  const { descriptor } = parse(src, { filename: file });
  if (!descriptor.template) continue;
  const script = (descriptor.scriptSetup?.content ?? "") + (descriptor.script?.content ?? "");
  const local = new Map();
  for (const m of script.matchAll(/import\s+(?!type\b)\{([^}]*)\}\s+from\s+["'](@mkbabb\/glass-ui[^"']*)["']/g)) {
    for (const part of m[1].split(",")) {
      const t = part.trim(); if (!t || t.startsWith("type ")) continue;
      const [imp, as] = t.split(/\s+as\s+/); local.set((as ?? imp).trim(), { spec: m[2], name: imp.trim() });
    }
  }
  // Relative barrels (demo/ui/*/index.ts) that re-export glass components.
  const names = (list, into, val) => {
    for (const part of list.split(",")) {
      const t = part.trim(); if (!t || t.startsWith("type ")) continue;
      const [imp, as] = t.split(/\s+as\s+/); into(imp.trim(), (as ?? imp).trim(), val);
    }
  };
  for (const m of script.matchAll(/import\s+(?!type\b)\{([^}]*)\}\s+from\s+["'](\.[^"']*)["']/g)) {
    const base = join(file, "..", m[2]);
    const idx = [base + ".ts", join(base, "index.ts")].find((p) => { try { return statSync(p).isFile(); } catch { return false; } });
    if (!idx) continue;
    const reexp = new Map();
    for (const r of readFileSync(idx, "utf8").matchAll(/export\s+\{([^}]*)\}\s+from\s+["'](@mkbabb\/glass-ui[^"']*)["']/g))
      names(r[1], (imp, as, spec) => reexp.set(as, { spec, name: imp }), r[2]);
    names(m[1], (imp, as) => { if (reexp.has(imp)) local.set(as, reexp.get(imp)); });
  }
  if (!local.size) continue;
  const visit = async (node) => {
    if (node.type === 1) {
      const key = local.has(node.tag) ? node.tag : local.has(pascal(node.tag)) ? pascal(node.tag) : null;
      if (key) {
        const { spec, name } = local.get(key);
        const comp = (await load(spec))[name];
        if (comp && typeof comp === "object" && (comp.props || comp.setup || comp.render)) {
          const decl = declared(comp);
          for (const p of node.props) {
            let attr = null;
            if (p.type === 6) attr = p.name;
            else if (p.type === 7 && p.name === "bind" && p.arg?.isStatic) attr = p.arg.content;
            else if (p.type === 7 && p.name === "model") attr = p.arg?.isStatic ? p.arg.content : "modelValue";
            if (!attr) continue;
            const c = camel(attr);
            if (decl.has(c) || decl.has(attr)) continue;
            if (!ALL && NATIVE.test(attr)) continue;
            rows.push(`${file.slice(ROOT.length)}:${p.loc.start.line}\t<${node.tag}> (${spec}#${name})\t${attr}`);
          }
        }
      }
    }
    for (const ch of node.children ?? []) await visit(ch);
    if (node.branches) for (const b of node.branches) await visit(b);
  };
  await visit(descriptor.template.ast);
}
for (const r of rows) console.log(r);
console.log(`TOTAL ${rows.length}`);
