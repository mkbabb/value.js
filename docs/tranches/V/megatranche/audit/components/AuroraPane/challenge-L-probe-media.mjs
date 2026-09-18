import { resolveAtoms, DEFAULT_AURORA_CONFIG } from "@mkbabb/glass-ui/aurora";
const ALL = ["smooth","pastel","watercolor","oil","crayon","vangogh","oil-pastel","kuwahara","metal","metal-gradient"];
const DEMO = ["smooth","pastel","watercolor","oil","crayon","vangogh","oil-pastel"];
console.log("glass-ui AuroraMedium union size:", ALL.length, "| AuroraPane MEDIA size:", DEMO.length);
console.log("MISSING FROM PANE:", ALL.filter(m => !DEMO.includes(m)).join(", "));
for (const kind of ALL) {
  try {
    const cfg = resolveAtoms({ seed: "#4488cc", harmony: "analogous", colorEnergy: 0.76, zones:{count:6,arrangement:"scattered"}, noise:0.5, medium: { kind }, motion:"drifting" });
    console.log(`  ${kind.padEnd(15)} -> resolved medium=${cfg.medium}  strokeMode=${cfg.strokeMode ?? "-"}  reachable=YES`);
  } catch (e) {
    console.log(`  ${kind.padEnd(15)} -> THREW ${e.message}`);
  }
}
