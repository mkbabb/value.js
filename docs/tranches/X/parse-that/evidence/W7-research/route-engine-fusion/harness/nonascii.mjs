// SERVED MODEL: claude-opus-5-5
// The 4 parseCssValue(s) mismatches: stock vs fusion vs the retired hand parser, side by side.
import { readFileSync } from "node:fs";
import { armFns } from "./common.mjs";
const eq = JSON.parse(readFileSync(new URL("../out/equiv.json", import.meta.url)));
const srcs = eq.arms["fx-fused"].parseCssValue.samples.map((x) => x.s);
const [st, fx, rt] = [await armFns("stock"), await armFns("fx-fused"), await armFns("retired")];
for (const s of srcs) console.log(JSON.stringify(s), "\n stock  ", JSON.stringify(st.parseCssValue(s).diagnostics?.[0] ?? "ok"), "\n fusion ", JSON.stringify(fx.parseCssValue(s).diagnostics?.[0] ?? "ok"), "\n retired", JSON.stringify(rt.parseCssValue(s).diagnostics?.[0] ?? "ok"));
