import { parseCssColor } from "./cand-s-spec/index";
import { parseCssColor as live } from "../../../../../../src/css/grammar";
for (const s of ["hsl(none, 50%, 50%)", "hsl(none 50% 50%)", "hsla(none, 50%, 50%, 0.5)"]) {
  const m = parseCssColor(s); let l: string; try { l = live(s).ok ? "ACCEPT" : "REJECT"; } catch { l = "THROW"; }
  console.log(s.padEnd(30), "mine=", m.ok ? "ACCEPT" : "REJECT", " live=", l);
}
