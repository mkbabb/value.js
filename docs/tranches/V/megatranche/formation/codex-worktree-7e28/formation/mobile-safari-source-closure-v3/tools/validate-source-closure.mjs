<!--
  PROVENANCE — M-21 C-11 (codex-provenance ledger row 28), 7e28 worktree census, ruled 2026-08-03
  original: /Users/mkbabb/.codex/worktrees/7e28/value.js/docs/tranches/V/megatranche/formation/mobile-safari-source-closure-v3/tools/validate-source-closure.mjs
  original-mtime: 2026-08-01T20:33:02
  original-sha256: 811d96ee9a87a294795c9374942f2f30b28752b9a7b8bd6e5fe47a2da732f755
  original-bytes: 12050
  ruling: ADOPT-COPY — M-21 C-11 — 2026-08-03
  note: this comment block is prepended to otherwise byte-exact original content, so the
  copy's own sha256 differs; both digests are recorded in CENSUS.md. The original bytes
  are exactly the last original-bytes bytes of this file.
-->
import { createHash } from "node:crypto";
import { readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const DRY_RUN = process.argv.includes("--dry-run");
const sha = (value) => createHash("sha256").update(value).digest("hex");
const json = (value) => `${JSON.stringify(value, null, 2)}\n`;
const readJson = (name) => JSON.parse(readFileSync(path.join(ROOT, name), "utf8"));

let snapshotReads = 0;
const snapshot = readJson("SOURCE-SNAPSHOT.json");
snapshotReads += 1;
const page = readJson("PAGE-INVENTORY.json");
const components = readJson("COMPONENT-INVENTORY.json");
const mount = readJson("MOUNT-GRAPH.json");
const states = readJson("STATE-REGISTRY.json");
const designs = readJson("DESIGN-BRIEFS.json");
const kronecker = readJson("KRONECKER-REGISTRY.json");
const equivalence = readJson("EQUIVALENCE.json");
const generation = readJson("GENERATION-VALIDATION.json");

const failures = [];
const check = (name, pass, detail = null) => {
    if (!pass) failures.push({ name, detail });
};
const allSameSource = [page, components, mount, states, designs, kronecker, equivalence, generation]
    .every((artifact) => artifact.sourceRootIdentity === snapshot.sourceRootIdentity);

check("snapshot-read-once", snapshotReads === 1);
check("source-coordinate", snapshot.sourceRootIdentity === "49d4692e83462ebe11bd1bbf96b1f27e54a97834dc22a115ef1820a2345a5f23");
check("entry-coordinate", snapshot.authenticatedEntry.path === "demo/color-picker/index.html" && snapshot.authenticatedEntry.sha256 === "c8d073bda8d6dee378c7f05e6b9365364ddf742563f0650225ad2aaaf2935a0d");
check("authority-join", allSameSource);
check("root-replay", snapshot.rootChecksumReplay.passed === 6 && snapshot.rootChecksumReplay.total === 6);
check("snapshot-denominators", snapshot.sourceCounts.vueSfc === 88 && snapshot.sourceCounts.vueDeclarationEdges === 115 && snapshot.sourceCounts.visualBarrelDeclarations === 25 && snapshot.sourceCounts.unresolvedDrift === 0);

check("routes", page.counts.namedRoutes === 14 && page.namedRoutes.length === 14 && new Set(page.namedRoutes.map((row) => row.name)).size === 14);
check("route-paths", new Set(page.namedRoutes.map((row) => row.path)).size === 14);
check("wildcard", page.wildcard.path === "/:pathMatch(.*)*" && page.wildcard.redirect === "/");
check("page-like-bijection", page.counts.physicalPageLikes === page.physicalPageLikes.length && page.counts.inlineLayers === page.inlineLayers.length && page.counts.totalSubjects === page.namedRoutes.length + 1 + page.physicalPageLikes.length + page.inlineLayers.length);
check("page-subject-ids", new Set([...page.namedRoutes, page.wildcard, ...page.physicalPageLikes, ...page.inlineLayers].map((row) => row.subjectId)).size === page.counts.totalSubjects);

check("components-88", components.components.length === 88 && components.counts.physicalSfc === 88);
check("workflow-sequence", components.components.every((row, index) => row.workflowId === `VC-${String(index + 1).padStart(3, "0")}`));
check("physical-path-bijection", new Set(components.components.map((row) => row.sourcePath)).size === 88);
check("mount-disposition", components.components.every((row) => ["MOUNTED", "EXPORTED_UNMOUNTED_HARNESS"].includes(row.mountDisposition)));
check("mounted-harness-sum", components.counts.mounted + components.counts.harness === 88 && components.counts.mounted === 86 && components.counts.harness === 2);
check("harness-exact", JSON.stringify(components.components.filter((row) => row.mountDisposition !== "MOUNTED").map((row) => row.workflowId)) === JSON.stringify(["VC-036", "VC-049"]));
check("harness-export-contract", components.components.filter((row) => row.mountDisposition !== "MOUNTED").every((row) => row.exportContracts.length === 1 && row.harnessContract.required && row.harnessContract.executionStatus === "UNEXECUTED_RED"));
check("barrels-25", components.barrelDeclarations.length === 25 && new Set(components.barrelDeclarations.map((row) => `${row.barrelPath}#${row.exportName}`)).size === 25);
check("barrel-target-join", components.barrelDeclarations.every((row) => components.components.some((component) => component.sourcePath === row.targetPath)));
check("terminal-verbs", components.components.every((row) => ["KEEP", "FOLD", "MOVE", "SPLIT", "PRUNE"].includes(row.terminalDisposition)));

const sfcSet = new Set(components.components.map((row) => row.sourcePath));
check("declaration-floor", mount.declarationEdges.length === 115 && mount.counts.declarationEdges === 115);
check("static-edge-join", mount.staticMountEdges.length === 126 && mount.staticMountEdges.every((row) => sfcSet.has(row.parent) && sfcSet.has(row.child)));
check("dynamic-edge-join", mount.dynamicMountEdges.length === 11 && mount.dynamicMountEdges.every((row) => sfcSet.has(row.parent) && sfcSet.has(row.child)));
check("route-instances", mount.routeInstances.length === 1272 && new Set(mount.routeInstances.map((row) => row.instanceId)).size === 1272);
check("route-instance-owner", mount.routeInstances.every((row) => page.namedRoutes.some((route) => route.name === row.routeName) && sfcSet.has(row.sourcePath)));
check("every-route-mounted", page.namedRoutes.every((route) => mount.routeInstances.some((row) => row.routeName === route.name && row.sourcePath === "demo/color-picker/App.vue")));
check("portal-census", mount.portals.length === 2);
check("reachable-plus-harness", mount.counts.reachableSfc + mount.counts.harnessSfc === 88 && mount.counts.reachableSfc === 86);

check("state-record-count", states.records.length === 157 && states.counts.componentRecords === 88 && states.counts.pageAndLayerRecords === 69);
check("state-subject-bijection", new Set(states.records.map((row) => row.subjectId)).size === 157);
check("state-row-shape", states.records.every((row) => row.states.length === 54 && row.states.every((state) => ["REQUIRED_UNEXECUTED_RED", "N_A_SOURCE_IMPOSSIBLE"].includes(state.applicability) && state.reason && state.witnessRequirement)));
check("service-worker-truth", states.serviceWorkerSourceRegistrations.length === 0);
check("component-state-coverage", components.components.every((row) => states.records.some((record) => record.subjectId === row.workflowId)));

check("design-count", designs.briefs.length === 157 && designs.counts.componentBriefs === 88 && designs.counts.routeBriefs === 14 && designs.counts.wildcardBriefs === 1);
check("frontend-design-bound", designs.frontendDesignSkill.used === true && designs.frontendDesignSkill.renderedApproval === false);
check("design-subject-bijection", new Set(designs.briefs.map((row) => row.subjectId)).size === 157);
check("component-design-coverage", components.components.every((row) => designs.briefs.some((brief) => brief.subjectId === row.workflowId && brief.subjectKind === "COMPONENT_WORKFLOW")));
check("design-two-pass", designs.briefs.every((row) => row.d1 && row.d2 && row.d1.job && row.d1.protagonist && row.d1.signature && row.d1.goldenGlass && row.d1.breathOfLife && row.d1.movementOfMomentum && row.d2.genericDefaultChallenge && row.d2.removableDecoration && row.d2.terminalDisposition));
check("design-signature-unique", new Set(designs.briefs.map((row) => row.d1.signature)).size === 157);
check("design-no-generic-copy", designs.briefs.every((row) => row.d1.signature.includes(row.subjectId) && row.d2.genericDefaultChallenge.includes(row.subjectId)));
check("design-terminal-verbs", designs.briefs.every((row) => ["KEEP", "FOLD", "MOVE", "SPLIT", "PRUNE"].includes(row.d2.terminalDisposition)));

check("kronecker-block-count", kronecker.blocks.length === 2590 && kronecker.executionSubjects === 1295);
check("kronecker-status", kronecker.status === "ALL_CELLS_UNEXECUTED_RED" && kronecker.blocks.every((row) => row.status === "UNEXECUTED_RED"));
const recomputedPlatform = { IOS_MOBILE_SAFARI: 0n, INSTALLED_DESKTOP_SAFARI: 0n };
for (const block of kronecker.blocks) {
    const counts = block.factorCounts;
    const recomputed = BigInt(counts.origin) * BigInt(counts.viewport) * BigInt(counts.localeDisplay) * BigInt(counts.interaction) * BigInt(counts.dataAuth) * BigInt(counts.network) * BigInt(counts.accessibility) * BigInt(counts.time);
    check(`block-formula:${block.blockId}`, recomputed.toString() === block.preliminaryCellCount);
    recomputedPlatform[block.platform] += recomputed;
}
const recomputedTotal = Object.values(recomputedPlatform).reduce((sum, value) => sum + value, 0n);
check("platform-denominators", Object.entries(recomputedPlatform).every(([key, value]) => kronecker.platformTotals[key] === value.toString()));
check("total-denominator", kronecker.preliminaryTotalCells === recomputedTotal.toString() && kronecker.preliminaryTotalCells === "3219211296");
check("all-credit-zero", Object.values(kronecker.credit).every((value) => value === 0));

check("equivalence-version", equivalence.denominatorVersion === kronecker.denominatorVersion);
check("equivalence-bijection", equivalence.classes.length === kronecker.blocks.length && new Set(equivalence.classes.map((row) => row.representative)).size === kronecker.blocks.length);
check("no-reductions", equivalence.reductionsApplied === 0 && equivalence.rawCellCount === equivalence.effectiveCellCount && equivalence.classes.every((row) => row.members.length === 1 && !row.reductionApplied));
check("equivalence-count", equivalence.rawCellCount === kronecker.preliminaryTotalCells && equivalence.effectiveBlockCount === kronecker.blocks.length);

const rawNames = ["SOURCE-READ-RAW.json", "ROUTE-PARSE-RAW.json", "COMPONENT-PARSE-RAW.json", "MOUNT-PARSE-RAW.json", "STATE-ORIGINS-RAW.json", "DESIGN-INPUTS-RAW.json", "KRONECKER-FACTORS-RAW.json"];
const aggregateNames = ["PAGE-INVENTORY.json", "COMPONENT-INVENTORY.json", "MOUNT-GRAPH.json", "STATE-REGISTRY.json", "DESIGN-BRIEFS.json", "KRONECKER-REGISTRY.json", "EQUIVALENCE.json", "GENERATION-VALIDATION.json"];
const latestRaw = Math.max(...rawNames.map((name) => statSync(path.join(ROOT, "raw", name)).mtimeMs));
const earliestAggregate = Math.min(...aggregateNames.map((name) => statSync(path.join(ROOT, name)).mtimeMs));
check("raw-first", latestRaw <= earliestAggregate, { latestRaw, earliestAggregate });
check("generation-validator", generation.ok === true && generation.failures.length === 0 && Object.values(generation.assertions).every(Boolean));

const inspectedFiles = ["SOURCE-SNAPSHOT.json", ...aggregateNames, ...rawNames.map((name) => `raw/${name}`)].map((name) => {
    const bytes = readFileSync(path.join(ROOT, name));
    const stats = statSync(path.join(ROOT, name));
    return { path: name, sha256: sha(bytes), bytes: stats.size, mode: (stats.mode & 0o7777).toString(8).padStart(4, "0"), nlink: stats.nlink };
});
const result = {
    schemaVersion: 3,
    validator: "V-MSK-V3-INDEPENDENT-JOIN-VALIDATOR",
    ok: failures.length === 0,
    failures,
    sourceRootIdentity: snapshot.sourceRootIdentity,
    inspectedFiles,
    counts: {
        routes: page.namedRoutes.length, wildcard: 1, pageSubjects: page.counts.totalSubjects,
        components: components.components.length, mounted: components.counts.mounted, harness: components.counts.harness,
        declarationEdges: mount.declarationEdges.length, staticMountEdges: mount.staticMountEdges.length,
        dynamicMountEdges: mount.dynamicMountEdges.length, routeInstances: mount.routeInstances.length,
        stateRecords: states.records.length, designBriefs: designs.briefs.length,
        kroneckerBlocks: kronecker.blocks.length, equivalenceClasses: equivalence.classes.length,
    },
    denominator: { platforms: kronecker.platformTotals, total: kronecker.preliminaryTotalCells },
    credit: kronecker.credit,
};
if (failures.length) throw new Error(`validation:${failures.map((row) => row.name).join(",")}`);

if (!DRY_RUN) {
    writeFileSync(path.join(ROOT, "raw", "VALIDATOR-RAW.json"), json(result));
    writeFileSync(path.join(ROOT, "VALIDATION.json"), json(result));
}
process.stdout.write(json({ ...result, inspectedFiles: undefined, dryRun: DRY_RUN }));
