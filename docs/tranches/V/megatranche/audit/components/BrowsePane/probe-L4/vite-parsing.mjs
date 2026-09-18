import { createServer } from "vite";
import { readFileSync } from "fs";
import path from "path";
const ROOT = "/Users/mkbabb/Programming/value.js";
const PKG = JSON.parse(readFileSync(path.join(ROOT,"package.json"),"utf8"));
const alias = Object.entries(PKG.exports).map(([sp, c]) => {
  const spec = "@mkbabb/value.js" + sp.slice(1);
  return { find: new RegExp("^" + spec.replace(/[.*+?^${}()|[\]\\]/g,"\\$&") + "$"),
           replacement: path.resolve(ROOT, c.import) };
});
console.log("generated alias count =", alias.length, "| covers /parsing?",
  alias.some(a => a.find.test("@mkbabb/value.js/parsing")));
const s = await createServer({ configFile:false, root:ROOT, resolve:{alias}, server:{middlewareMode:true} });
for (const id of ["@mkbabb/value.js/parsing","@mkbabb/value.js/color"]) {
  try { const r = await s.pluginContainer.resolveId(id, path.join(ROOT,"demo/palettes/BrowsePane.vue")); console.log(id,"=>", r?r.id:"NULL (unresolved)"); }
  catch(e){ console.log(id,"=> ERROR:", e.message.split("\n")[0]); }
}
await s.close();
