// R-10 witness: resolve glass-ui's runtime `@mkbabb/value.js/*` imports through the gh-pages
// (production demo) config's plugin container — command "build", mode "gh-pages". Node-only, no browser.
import { resolveConfig } from "/Users/mkbabb/Programming/value.js/node_modules/vite/dist/node/index.js";
const root = "/Users/mkbabb/Programming/value.js";
const out = {};
try {
  const cfg = await resolveConfig({ root, mode: "gh-pages", configFile: root + "/vite.config.ts" }, "build", "gh-pages");
  out.aliases = (cfg.resolve.alias || []).filter((a) => /value/.test(String(a.find))).map((a) => [String(a.find), a.replacement]);
} catch (e) { out.cfgErr = String(e.message).slice(0, 300); }
console.log(JSON.stringify(out, null, 1));
