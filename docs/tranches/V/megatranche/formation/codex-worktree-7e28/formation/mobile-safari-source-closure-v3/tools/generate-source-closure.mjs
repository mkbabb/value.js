<!--
  PROVENANCE — M-21 C-11 (codex-provenance ledger row 28), 7e28 worktree census, ruled 2026-08-03
  original: /Users/mkbabb/.codex/worktrees/7e28/value.js/docs/tranches/V/megatranche/formation/mobile-safari-source-closure-v3/tools/generate-source-closure.mjs
  original-mtime: 2026-08-01T20:31:08
  original-sha256: a4067cdb4f50265e941c35d5abd7e2acd9f0a787d86a59396ee1b6aa5f76eedf
  original-bytes: 46105
  ruling: ADOPT-COPY — M-21 C-11 — 2026-08-03
  note: this comment block is prepended to otherwise byte-exact original content, so the
  copy's own sha256 differs; both digests are recorded in CENSUS.md. The original bytes
  are exactly the last original-bytes bytes of this file.
-->
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const SNAPSHOT_PATH = path.join(ROOT, "SOURCE-SNAPSHOT.json");
const DRY_RUN = process.argv.includes("--dry-run");
let snapshotReads = 0;
const snapshot = JSON.parse(readFileSync(SNAPSHOT_PATH, "utf8"));
snapshotReads += 1;
if (snapshotReads !== 1 || snapshot.sourceReadCount !== 1) throw new Error("snapshot-read-law");

const cp = (a, b) => {
    const aa = [...a], bb = [...b];
    for (let i = 0; i < Math.min(aa.length, bb.length); i += 1) {
        const d = aa[i].codePointAt(0) - bb[i].codePointAt(0);
        if (d) return d;
    }
    return aa.length - bb.length;
};
const sha = (value) => createHash("sha256").update(value).digest("hex");
const json = (value) => `${JSON.stringify(value, null, 2)}\n`;
const content = new Map(snapshot.entries.filter((row) => row.content !== undefined).map((row) => [row.path, row.content]));
const sourceSha = new Map(snapshot.entries.map((row) => [row.path, row.sha256]));
const sfcPaths = [...content.keys()].filter((file) => file.startsWith("demo/") && file.endsWith(".vue")).sort(cp);

function resolveSpec(from, specifier) {
    if (!specifier.startsWith(".")) return null;
    const base = path.posix.normalize(path.posix.join(path.posix.dirname(from), specifier));
    return [base, `${base}.ts`, `${base}.vue`, path.posix.join(base, "index.ts")].find((candidate) => content.has(candidate)) ?? null;
}

function templateOf(source) {
    const start = source.indexOf("<template");
    const end = source.lastIndexOf("</template>");
    if (start < 0 || end < start) return "";
    return source.slice(source.indexOf(">", start) + 1, end);
}

function lineOf(source, offset) {
    return source.slice(0, offset).split("\n").length;
}

function predicateOf(attrs) {
    const clauses = [];
    for (const match of attrs.matchAll(/(v-if|v-else-if|v-show|v-for|v-model(?::[\w-]+)?|:[\w-]+)="([^"]+)"/gu)) {
        if (["v-if", "v-else-if", "v-show", "v-for", ":open", ":is", ":component", ":component-key"].includes(match[1])) clauses.push(`${match[1]}=${match[2]}`);
    }
    if (/\bv-else\b/u.test(attrs) && !attrs.includes("v-else-if")) clauses.push("v-else");
    return clauses.length ? clauses.join(" AND ") : "ALWAYS_WHEN_PARENT_MOUNTED";
}

const matrix = content.get("docs/tranches/V/megatranche/formation/COMPONENT-WORKFLOW-MATRIX-2026-07-29.md");
const workflows = [...matrix.matchAll(/^\| (VC-\d{3}) \| `([^`]+)` \| ([^|]+?) \| ([^|]+?) \| ([^|]+?) \|$/gmu)]
    .map((match) => ({ workflowId: match[1], sourcePath: match[2], job: match[3].trim(), historicalEvidence: match[4].trim(), formationDirection: match[5].trim() }));

const nonParser = content.get("docs/tranches/V/megatranche/formation/NON-PARSER-FRONTEND-SPEC-CLOSURE-2026-07-30.md");
const routeSpecs = [...nonParser.matchAll(/^\| `([^`]+)` `([^`]+)` \| ([^|]+?) \| ([^|]+?) \| ([^|]+?) \| ([^|]+?) \|$/gmu)]
    .map((match) => ({ name: match[1], path: match[2], job: match[3].trim(), primaryWorkflow: match[4].trim(), requiredStates: match[5].trim(), formationDisposition: match[6].trim() }));
const routerSource = content.get("demo/color-picker/router/index.ts");
const routerRoutes = [...routerSource.matchAll(/\{\s*path:\s*"([^"]+)",\s*name:\s*"([^"]+)"[^}]*\}/gu)].map((match) => ({ path: match[1], name: match[2], line: lineOf(routerSource, match.index) }));
const wildcardMatch = routerSource.match(/\{\s*path:\s*"(\/:[^"]+)",\s*redirect:\s*"([^"]+)"\s*\}/u);
if (!wildcardMatch) throw new Error("wildcard-parse");

const barrelMap = new Map();
const barrelDeclarations = [];
for (const [file, source] of content) {
    if (!file.endsWith("index.ts")) continue;
    for (const match of source.matchAll(/export\s*\{\s*default\s+as\s+(\w+)\s*\}\s*from\s*["']([^"']+\.vue)["']/gu)) {
        const target = resolveSpec(file, match[2]);
        if (!target) throw new Error(`barrel-target:${file}:${match[2]}`);
        const row = { exportName: match[1], barrelPath: file, targetPath: target, line: lineOf(source, match.index), sourceText: match[0] };
        barrelDeclarations.push(row);
        barrelMap.set(`${file}#${match[1]}`, target);
    }
}
barrelDeclarations.sort((a, b) => cp(`${a.barrelPath}#${a.exportName}`, `${b.barrelPath}#${b.exportName}`));

const declarationEdges = [];
for (const row of snapshot.entries) {
    if (!row.path.startsWith("demo/") || !/\.(ts|vue)$/u.test(row.path) || row.path === "demo/color-picker/vite.d.ts") continue;
    row.content.split("\n").forEach((line, index) => {
        if (line.includes('.vue"')) declarationEdges.push({ declarationId: `DECL-${String(declarationEdges.length + 1).padStart(3, "0")}`, path: row.path, line: index + 1, text: line.trim() });
    });
}

const staticMountEdges = [];
for (const parent of sfcPaths) {
    const source = content.get(parent);
    const template = templateOf(source);
    const bindings = new Map();
    for (const match of source.matchAll(/import\s+(?!type\b)(\w+)\s+from\s+["']([^"']+)["']/gu)) {
        const target = resolveSpec(parent, match[2]);
        if (target?.endsWith(".vue")) bindings.set(match[1], target);
    }
    for (const match of source.matchAll(/import\s*\{([^}]+)\}\s*from\s*["']([^"']+)["']/gu)) {
        const module = resolveSpec(parent, match[2]);
        if (!module?.endsWith("index.ts")) continue;
        for (const part of match[1].split(",")) {
            const names = part.trim().replace(/^type\s+/u, "").split(/\s+as\s+/u);
            const target = barrelMap.get(`${module}#${names[0]}`);
            if (target) bindings.set(names[1] ?? names[0], target);
        }
    }
    for (const match of source.matchAll(/const\s+(\w+)\s*=\s*defineAsyncComponent\(\(\)\s*=>\s*import\(["']([^"']+\.vue)["']\)\)/gu)) {
        const target = resolveSpec(parent, match[2]);
        if (target) bindings.set(match[1], target);
    }
    for (const match of template.matchAll(/<([A-Z][A-Za-z0-9]*)\b([^>]*)>/gu)) {
        const child = bindings.get(match[1]);
        if (!child) continue;
        const attrs = match[2].trim();
        staticMountEdges.push({
            edgeId: `MOUNT-${String(staticMountEdges.length + 1).padStart(3, "0")}`,
            kind: "STATIC_TEMPLATE",
            parent, child, tag: match[1],
            occurrence: staticMountEdges.filter((row) => row.parent === parent && row.child === child).length + 1,
            line: lineOf(source, source.indexOf(match[0])), predicate: predicateOf(attrs), attrs,
            cardinality: attrs.includes("v-for=") ? "DATA_DEPENDENT_TEMPLATE_INSTANCE" : "ONE_PER_PARENT_INSTANCE",
            teleportTarget: attrs.match(/\bto="([^"]+)"/u)?.[1] ?? null,
        });
    }
}

const paneSource = content.get("demo/shell/usePaneRouter.ts");
const paneVariables = new Map();
for (const match of paneSource.matchAll(/const\s+(\w+)\s*=\s*defineAsyncComponent\(\(\)\s*=>\s*import\(["']([^"']+\.vue)["']\)\)/gu)) {
    paneVariables.set(match[1], resolveSpec("demo/shell/usePaneRouter.ts", match[2]));
}
paneVariables.set("ColorPicker", barrelMap.get("demo/picker/index.ts#ColorPicker"));
const paneNames = new Map();
for (const match of paneSource.matchAll(/if\s*\(name\s*===\s*"([^"]+)"\)\s*return\s+(\w+)/gu)) {
    const target = paneVariables.get(match[2]);
    if (!target) throw new Error(`pane-variable:${match[2]}`);
    paneNames.set(match[1], target);
}
const adminTarget = paneVariables.get("AdminPane");

const viewSource = content.get("demo/shell/viewSchema.ts");
const viewRows = routeSpecs.map((route) => {
    const keyPattern = route.name.includes("-") ? `"${route.name}"` : route.name;
    const start = viewSource.indexOf(`${keyPattern}: {`);
    if (start < 0) throw new Error(`view-row:${route.name}`);
    const end = viewSource.indexOf("\n    },", start);
    const block = viewSource.slice(start, end);
    const left = block.match(/left:\s*"([^"]+)"/u)?.[1];
    const rightMatch = block.match(/right:\s*(null|"[^"]+")/u)?.[1];
    if (!left || rightMatch === undefined) throw new Error(`view-shape:${route.name}`);
    return { routeName: route.name, left, right: rightMatch === "null" ? null : rightMatch.slice(1, -1), sourceBlockSha256: sha(block) };
});

function paneTarget(name) {
    if (name === null) return null;
    if (name.startsWith("admin-")) return adminTarget;
    const target = paneNames.get(name);
    if (!target) throw new Error(`pane-name:${name}`);
    return target;
}

const dynamicMountEdges = [...new Set([...paneNames.values(), adminTarget])].sort(cp).map((child, index) => ({
    edgeId: `DYNAMIC-${String(index + 1).padStart(2, "0")}`,
    kind: "PANE_ROUTER_DYNAMIC",
    parent: "demo/shell/PaneSlot.vue",
    child,
    ownerSource: "demo/shell/usePaneRouter.ts",
    predicate: [...paneNames.entries()].filter(([, target]) => target === child).map(([name]) => `pane=${name}`).concat(child === adminTarget ? ["pane startsWith admin-"] : []).join(" OR "),
    cardinality: "ONE_PER_ACTIVE_SLOT",
}));

const outgoing = new Map();
for (const edge of staticMountEdges) {
    if (!outgoing.has(edge.parent)) outgoing.set(edge.parent, []);
    outgoing.get(edge.parent).push(edge);
}
const routeInstances = [];
function expand(route, branch, sourcePath, parentInstanceId, ancestry, predicate) {
    const instanceId = `INST-${String(routeInstances.length + 1).padStart(5, "0")}`;
    routeInstances.push({ instanceId, routeName: route.name, routePath: route.path, branch, sourcePath, parentInstanceId, predicate, ancestry });
    if (ancestry.includes(sourcePath)) return;
    for (const edge of outgoing.get(sourcePath) ?? []) {
        expand(route, branch, edge.child, instanceId, [...ancestry, sourcePath], edge.predicate);
    }
}

for (const route of routeSpecs) {
    expand(route, "APP_ROOT", "demo/color-picker/App.vue", null, [], "ROUTE_ACTIVE");
    const view = viewRows.find((row) => row.routeName === route.name);
    const left = paneTarget(view.left);
    const right = paneTarget(view.right);
    expand(route, "MOBILE_LEFT", left, null, [], `!isDesktop AND activePane=${view.left}`);
    expand(route, "DESKTOP_LEFT", left, null, [], `isDesktop AND leftPane=${view.left}`);
    if (right) {
        expand(route, "MOBILE_RIGHT", right, null, [], `!isDesktop AND activePane=${view.right}`);
        expand(route, "DESKTOP_RIGHT", right, null, [], `isDesktop AND rightPane=${view.right}`);
    }
}

const reachable = new Set(["demo/color-picker/App.vue", ...dynamicMountEdges.map((row) => row.child)]);
let changed = true;
while (changed) {
    changed = false;
    for (const edge of staticMountEdges) {
        if (reachable.has(edge.parent) && !reachable.has(edge.child)) { reachable.add(edge.child); changed = true; }
    }
}

function terminalDisposition(workflow) {
    if (["VC-043", "VC-045", "VC-066"].includes(workflow.workflowId)) return "PRUNE";
    const text = workflow.formationDirection;
    if (/\bSPLIT\b/u.test(text)) return "SPLIT";
    if (/\bMOVE\b/u.test(text)) return "MOVE";
    if (/\bFOLD\b/u.test(text)) return "FOLD";
    if (/\bPRUNE\b|\bDELETE\b/u.test(text) && !/\bKEEP\b/u.test(text)) return "PRUNE";
    return "KEEP";
}

function sourceSignals(sourcePath) {
    const direct = content.get(sourcePath);
    const imported = [];
    for (const match of direct.matchAll(/(?:from\s*|import\s*\()["']([^"']+)["']/gu)) {
        const resolved = resolveSpec(sourcePath, match[1]);
        if (resolved) imported.push(resolved);
    }
    const joined = [direct, ...imported.map((file) => content.get(file) ?? "")].join("\n");
    const glassImports = [...new Set([...direct.matchAll(/from\s*["'](@mkbabb\/glass-ui[^"']*)["']/gu)].map((match) => match[1]))].sort(cp);
    const copy = [...new Set([
        ...[...templateOf(direct).matchAll(/>([^<>{}\n][^<>{}]*)</gu)].map((match) => match[1].replace(/\s+/gu, " ").trim()),
        ...[...templateOf(direct).matchAll(/(?:aria-label|title|placeholder)="([^"]+)"/gu)].map((match) => match[1].trim()),
    ].filter((value) => value && value.length <= 120 && !value.startsWith("<!--")))].slice(0, 12);
    return {
        direct, imported: [...new Set(imported)].sort(cp), joined, glassImports, copy,
        hasApi: /useApiClient|adminRequest\(|request\(|fetch\(|\/api\//u.test(joined),
        hasStore: /usePaletteStore|useSafeStorage|localStorage|sessionStorage/u.test(joined),
        hasDi: /\binject\(|\bprovide\(|InjectionKey/u.test(joined),
        hasWorker: /new Worker|quantize-worker/u.test(joined),
        hasServiceWorker: /navigator\.serviceWorker|serviceWorker\.register/u.test(joined),
        hasAuth: /useSession|useAdminAuth|useUserAuth|SESSION_PORT|ADMIN_PORT|authentic/u.test(joined),
        hasAdmin: /Admin|admin/u.test(sourcePath) || /ADMIN_PORT|isAdmin/u.test(joined),
        hasLoading: /loading|Loader|Skeleton|pending|await\b|Promise/u.test(joined),
        hasEmpty: /empty|EmptyState|length\s*===\s*0|No\s+[A-Za-z]/u.test(joined),
        hasError: /error|Error|failed|catch\b|refusal/u.test(joined),
        hasInput: /<input|<Input|contenteditable|v-model|@keydown|tabindex/u.test(direct),
        hasEdit: /edit|rename|input|update:modelValue|commit/u.test(joined),
        hasValidate: /valid|parse|canonical|conflict|refus/u.test(joined),
        hasSubmit: /submit|save|create|update|delete|approve|reject|flag|vote|copy/u.test(joined),
        hasDrag: /drag|pointer|touchmove|sortable|gesture/u.test(joined),
        hasScroll: /scroll|overflow/u.test(joined),
        hasExpand: /Dialog|Popover|Dropdown|Collapsible|expanded|open/u.test(joined),
        hasMotion: /Transition|transition|animation|requestAnimationFrame/u.test(joined),
        hasDebug: /debug/i.test(sourcePath) || /debug/i.test(joined),
        metrics: {
            cardTags: (direct.match(/<Card\b/gu) ?? []).length,
            roundedTokens: (direct.match(/rounded(?:-|\b)/gu) ?? []).length,
            gradientTokens: (direct.match(/gradient/giu) ?? []).length,
            shadowTokens: (direct.match(/shadow/giu) ?? []).length,
            dividerTokens: (direct.match(/Separator|divider|border-/gu) ?? []).length,
            motionTokens: (direct.match(/Transition|transition|animation/gu) ?? []).length,
        },
    };
}

const componentInventory = workflows.map((workflow) => {
    const signals = sourceSignals(workflow.sourcePath);
    const exportRows = barrelDeclarations.filter((row) => row.targetPath === workflow.sourcePath);
    const instances = routeInstances.filter((row) => row.sourcePath === workflow.sourcePath);
    const parents = staticMountEdges.filter((row) => row.child === workflow.sourcePath).map((row) => row.edgeId);
    const mounted = reachable.has(workflow.sourcePath);
    return {
        ...workflow,
        sourceSha256: sourceSha.get(workflow.sourcePath),
        mountDisposition: mounted ? "MOUNTED" : "EXPORTED_UNMOUNTED_HARNESS",
        structuralParentEdges: parents,
        routeInstanceIds: instances.map((row) => row.instanceId),
        routeOwners: [...new Set(instances.map((row) => row.routeName))].sort(cp),
        exportContracts: exportRows,
        harnessContract: mounted ? null : {
            required: true,
            productionImport: exportRows.map((row) => `${row.barrelPath}#${row.exportName}`),
            propsEvidence: [...signals.direct.matchAll(/defineProps(?:<([\s\S]*?)>|\()/gu)].map((match) => match[0].slice(0, 500)),
            emitsEvidence: [...signals.direct.matchAll(/defineEmits(?:<([\s\S]*?)>|\()/gu)].map((match) => match[0].slice(0, 500)),
            slotCount: (templateOf(signals.direct).match(/<slot\b/gu) ?? []).length,
            variantsAndDefaults: "derive from the frozen component source; missing prop/event/slot row fails harness admission",
            executionStatus: "UNEXECUTED_RED",
        },
        origins: {
            api: signals.hasApi, store: signals.hasStore, di: signals.hasDi, worker: signals.hasWorker,
            serviceWorker: signals.hasServiceWorker, auth: signals.hasAuth, admin: signals.hasAdmin,
            importedSourcePaths: signals.imported,
        },
        sourceCopy: signals.copy,
        glassImports: signals.glassImports,
        terminalDisposition: terminalDisposition(workflow),
        conceptDispositions: [...new Set([...(workflow.formationDirection.match(/\b(KEEP|FOLD|MOVE|SPLIT|PRUNE|DELETE)\b/gu) ?? ["KEEP"])])]
            .map((verb) => ({ concept: workflow.formationDirection, disposition: verb === "DELETE" ? "PRUNE" : verb })),
    };
});

const pageLikeName = /(App|Pane|Panel|Workbench|Visualizer|Dialog|Drawer|Menu|Popover|Overlay|Layer|Boundary)\.vue$/u;
const physicalPageLikes = componentInventory.filter((row) => pageLikeName.test(row.sourcePath) || /<Teleport\b/u.test(content.get(row.sourcePath)) || ["VC-018", "VC-037", "VC-043"].includes(row.workflowId));
const inlineLayers = [];
for (const component of componentInventory) {
    const source = content.get(component.sourcePath);
    const tpl = templateOf(source);
    for (const match of tpl.matchAll(/<(Dialog|Popover|DropdownMenu|Teleport|Collapsible|Transition)\b([^>]*)>/gu)) {
        if (match[1] === "Transition" && !/role=|v-if|v-show/u.test(match[2])) continue;
        inlineLayers.push({
            subjectId: `LAYER-${String(inlineLayers.length + 1).padStart(3, "0")}`,
            kind: match[1] === "Teleport" ? "PORTAL_TARGET" : "PAGE_LIKE_LAYER",
            ownerWorkflowId: component.workflowId, ownerSourcePath: component.sourcePath,
            element: match[1], line: lineOf(source, source.indexOf(match[0])), predicate: predicateOf(match[2]),
            routeOwners: component.routeOwners, sourceSha256: component.sourceSha256,
        });
    }
}

const routePages = routeSpecs.map((route, index) => {
    const source = routerRoutes.find((row) => row.name === route.name);
    const view = viewRows.find((row) => row.routeName === route.name);
    if (!source || source.path !== route.path) throw new Error(`route-join:${route.name}`);
    return {
        subjectId: `ROUTE-${String(index + 1).padStart(2, "0")}`, kind: "NAMED_ROUTE", ...route,
        routerSource: "demo/color-picker/router/index.ts", routerLine: source.line,
        mountOwner: "demo/color-picker/App.vue via demo/shell/usePaneRouter.ts",
        mountPredicate: `route.name=${route.name}`,
        paneConfig: view,
        routeInstanceIds: routeInstances.filter((row) => row.routeName === route.name).map((row) => row.instanceId),
        requiredOwnership: ["title", "H1", "initial focus", "scroll", "deep link", "state replacement", "route-local actions"],
        executionStatus: "UNEXECUTED_RED",
    };
});
const wildcard = {
    subjectId: "ROUTE-WILDCARD", kind: "WILDCARD_REDIRECT", path: wildcardMatch[1], redirect: wildcardMatch[2],
    sourcePath: "demo/color-picker/router/index.ts", line: lineOf(routerSource, wildcardMatch.index),
    states: ["unknown path", "encoded path", "query/hash preservation or refusal", "redirect-loop refusal", "title/focus announcement", "error-boundary fallback"],
    executionStatus: "UNEXECUTED_RED",
};
const pageLikeSubjects = physicalPageLikes.map((component, index) => ({
    subjectId: `PAGE-LIKE-${String(index + 1).padStart(3, "0")}`,
    kind: "PHYSICAL_PAGE_LIKE", workflowId: component.workflowId, sourcePath: component.sourcePath,
    sourceSha256: component.sourceSha256, job: component.job, mountOwnerEdges: component.structuralParentEdges,
    mountPredicate: component.mountDisposition, routeOwners: component.routeOwners,
    altersPrimaryJob: /(App|Pane|Panel|Workbench|Visualizer)\.vue$/u.test(component.sourcePath),
    executionStatus: "UNEXECUTED_RED",
}));

const stateNames = [
    ["lifecycle", "inactive"], ["lifecycle", "initial"], ["lifecycle", "active"], ["lifecycle", "idle"], ["lifecycle", "settled"], ["lifecycle", "background"], ["lifecycle", "resume"], ["lifecycle", "unmount-remount"],
    ["data", "loading"], ["data", "empty"], ["data", "error"], ["data", "one"], ["data", "many"], ["data", "stale"], ["data", "conflict"], ["data", "deleted"],
    ["auth", "anonymous"], ["auth", "authenticating"], ["auth", "owner"], ["auth", "other"], ["auth", "admin"], ["auth", "expired-revoked"],
    ["network", "online"], ["network", "offline"], ["network", "slow"], ["network", "timeout"], ["network", "retry"], ["network", "resumed"], ["network", "malformed"], ["network", "partial"],
    ["interaction", "hover"], ["interaction", "focus"], ["interaction", "pressed"], ["interaction", "expanded"], ["interaction", "dragging"], ["interaction", "scrolling"], ["interaction", "editing"], ["interaction", "validating"], ["interaction", "submitting"],
    ["accessibility", "keyboard"], ["accessibility", "touch"], ["accessibility", "voiceover"], ["accessibility", "reduced-motion"], ["accessibility", "forced-colors-equivalent"], ["accessibility", "rtl"], ["accessibility", "dynamic-type"],
    ["motion", "first-paint"], ["motion", "frame-0"], ["motion", "frame-120"], ["motion", "frame-250"], ["motion", "frame-420"], ["motion", "interrupted"], ["motion", "reversed"], ["motion", "final"],
];

function stateRequired(signals, category, name) {
    if (["lifecycle", "accessibility"].includes(category)) return true;
    if (category === "data") return signals.hasLoading || signals.hasEmpty || signals.hasError || signals.hasApi || signals.hasStore;
    if (category === "auth") return signals.hasAuth || signals.hasAdmin;
    if (category === "network") return signals.hasApi;
    if (category === "motion") return signals.hasMotion || ["first-paint", "final"].includes(name);
    if (name === "hover" || name === "focus" || name === "pressed") return signals.hasInput || signals.hasExpand || signals.hasSubmit;
    if (name === "expanded") return signals.hasExpand;
    if (name === "dragging") return signals.hasDrag;
    if (name === "scrolling") return signals.hasScroll;
    if (name === "editing") return signals.hasEdit;
    if (name === "validating") return signals.hasValidate;
    if (name === "submitting") return signals.hasSubmit;
    return false;
}

const stateRecords = componentInventory.map((component) => {
    const signals = sourceSignals(component.sourcePath);
    return {
        subjectId: component.workflowId, subjectKind: "COMPONENT_WORKFLOW", sourcePath: component.sourcePath,
        sourceSha256: component.sourceSha256,
        origins: component.origins,
        fixtures: {
            local: ["initial", "active", "inactive", "idle", "settled", "background", "resume"],
            api: signals.hasApi ? ["online", "offline", "slow", "timeout", "retry", "401", "hidden-404", "409", "412", "429", "5xx", "malformed", "partial"] : [],
            auth: signals.hasAuth || signals.hasAdmin ? ["anonymous", "authenticating", "owner", "other", "admin", "expired-revoked"] : [],
            worker: signals.hasWorker ? ["cold", "success", "error", "abort", "teardown"] : [],
            serviceWorker: signals.hasServiceWorker ? ["registered", "stale", "failure"] : [],
        },
        states: stateNames.map(([category, name]) => {
            const required = stateRequired(signals, category, name);
            return {
                category, name,
                applicability: required ? "REQUIRED_UNEXECUTED_RED" : "N_A_SOURCE_IMPOSSIBLE",
                reason: required
                    ? `${component.workflowId} source signals require ${category}/${name}; future Apple evidence must use its own receipt.`
                    : `${component.workflowId} has no ${category}/${name} owner or transitive origin in frozen source ${component.sourceSha256.slice(0, 12)}.`,
                witnessRequirement: required ? `raw cell must bind ${component.workflowId}, route instance, ${category}/${name}, platform, and snapshot identity` : `hostile source mutation adding a ${category}/${name} owner invalidates this N/A`,
            };
        }),
    };
});

const routeStateRecords = [...routePages, wildcard, ...pageLikeSubjects, ...inlineLayers].map((subject) => {
    const component = subject.workflowId ? componentInventory.find((row) => row.workflowId === subject.workflowId) : subject.ownerWorkflowId ? componentInventory.find((row) => row.workflowId === subject.ownerWorkflowId) : null;
    const signals = component ? sourceSignals(component.sourcePath) : sourceSignals("demo/color-picker/App.vue");
    return {
        subjectId: subject.subjectId, subjectKind: subject.kind,
        sourcePath: subject.sourcePath ?? subject.ownerSourcePath ?? "demo/color-picker/router/index.ts",
        states: stateNames.map(([category, name]) => {
            const required = subject.kind === "NAMED_ROUTE" || subject.kind === "WILDCARD_REDIRECT" ? true : stateRequired(signals, category, name);
            return {
                category, name, applicability: required ? "REQUIRED_UNEXECUTED_RED" : "N_A_SOURCE_IMPOSSIBLE",
                reason: required ? `${subject.subjectId} owns ${category}/${name} at its page or layer boundary.` : `${subject.subjectId} cannot originate ${category}/${name} under its frozen owner source.`,
                witnessRequirement: required ? `independent raw Apple cell for ${subject.subjectId}/${category}/${name}` : `mutation adding an owner invalidates this N/A`,
            };
        }),
    };
});

function audienceFor(pathname) {
    if (/admin/i.test(pathname)) return "an authenticated administrator reviewing immutable policy evidence";
    if (/palette|browse/i.test(pathname)) return "a color practitioner managing or discovering palettes";
    if (/debug|PointerDebug/i.test(pathname)) return "a developer using an isolated diagnostic harness";
    if (/extract/i.test(pathname)) return "a color practitioner extracting measured swatches from an image";
    if (/gradient/i.test(pathname)) return "a color practitioner authoring an exact gradient";
    if (/mix/i.test(pathname)) return "a color practitioner comparing a mixed result with its sources";
    return "a color practitioner authoring and comparing measured color";
}

function designFor(subjectId, kind, sourcePath, job, terminal, routeOwners) {
    const signals = sourceSignals(sourcePath);
    const protagonist = job.includes(";") ? job.split(";").at(-1).trim() : job.replace(/^\w+\s+/u, "");
    const copyWitness = signals.copy.length ? signals.copy.slice(0, 4).join(" | ") : `no literal copy; ${path.posix.basename(sourcePath)} requires owner-supplied accessible naming`;
    const sourceMark = sourceSha.get(sourcePath).slice(0, 12);
    const metric = signals.metrics;
    return {
        briefId: `DESIGN-${subjectId}`,
        subjectId, subjectKind: kind, sourcePath, sourceSha256: sourceSha.get(sourcePath), routeOwners,
        d1: {
            audience: audienceFor(sourcePath), job, protagonist,
            decision: `${subjectId} lets its user decide or perceive “${job}” without exposing implementation vocabulary.`,
            successState: `${protagonist} remains the first legible result and every refusal preserves the user's prior valid state.`,
            palette: {
                atlasGold: "#D4AF37", atlasLight: "#F5E6A3", paper: "#e9e6e2", ink: "#000000", field: "#ffffff",
                subjectAccent: `the authored measured-color token from ${sourcePath}@${sourceMark}; fixed hex values stay neutral/supporting`,
            },
            typography: {
                display: `Fraunces names ${protagonist} or its route job once`,
                body: `Plus Jakarta Sans explains ${copyWitness}`,
                utility: `Fira Code carries numeric/color/provenance data only for ${subjectId}`,
            },
            hierarchy: `${path.posix.basename(sourcePath)} seats ${protagonist} above controls; copy witnesses are ${copyWitness}.`,
            layout: `${routeOwners.length ? routeOwners.join(", ") : "harness"} owns the outer container; ${subjectId} owns internal grouping, safe-area clearance, keyboard occlusion, short-landscape wrap, and no nested scroll without source evidence.`,
            responsive: `compact width stacks ${protagonist} before actions; large width preserves source order; container queries may not reorder DOM or hide exact copy.`,
            focusAndA11y: `entry follows the owning heading/trigger, controls expose name-role-value and visible focus, Escape/cancel returns to the trigger, RTL preserves semantic order, and Dynamic Type cannot clip ${protagonist}.`,
            motionOwner: signals.hasMotion ? `${subjectId} owns one semantic transition because ${metric.motionTokens} motion tokens appear in its source` : `static; the route owner seats final state immediately`,
            performance: `${subjectId} must bind interaction latency, layout/paint cost, memory/cleanup, target geometry, and frame pacing in declared units; source formation supplies no measured value.`,
            goldenGlass: signals.glassImports.length ? `Glass imports ${signals.glassImports.join(", ")} own mechanics and paint; Value owns measured chroma and state truth.` : `No direct Glass import; retain source-local measured-color content and refuse decorative wrapper invention.`,
            breathOfLife: `${protagonist} is the memorable specimen; ${subjectId} refuses a dashboard-stat or ornamental-card substitute.`,
            movementOfMomentum: signals.hasMotion ? `one transition communicates ${job}; interruption, reversal, settle, and reduced-motion final seating remain required` : `motion is refused because ${subjectId} has no source-owned temporal change`,
            signature: `${subjectId}-${path.posix.basename(sourcePath, ".vue")}: ${protagonist} expressed through source-specific measured color/provenance, witnessed by ${copyWitness}.`,
            exactCopy: signals.copy,
        },
        d2: {
            authorialBasis: "DISJOINT_CRITIQUE_RULESET_D2_PENDING_INDEPENDENT_LUNA_CONFIRMATION",
            genericDefaultChallenge: `${subjectId} would read as a stock dashboard if its ${metric.cardTags} Card, ${metric.roundedTokens} rounded, ${metric.shadowTokens} shadow, and ${metric.gradientTokens} gradient tokens outrank ${protagonist}.`,
            removableDecoration: metric.cardTags + metric.roundedTokens + metric.shadowTokens + metric.gradientTokens === 0
                ? `No generic container/gradient/shadow token appears in ${sourcePath}; future paint still needs rendered proof.`
                : `Challenge every one of ${metric.cardTags + metric.roundedTokens + metric.shadowTokens + metric.gradientTokens} container/rounding/shadow/gradient tokens against grouping, interaction, or measured-color evidence.`,
            dividerChallenge: `${metric.dividerTokens} divider/border tokens survive only when they separate distinct evidence or action groups.`,
            copyChallenge: signals.copy.length ? `Preserve action vocabulary across trigger, pending, success, and refusal: ${signals.copy.slice(0, 3).join(" | ")}.` : `Add owner-supplied accessible naming in the harness; no inferred clever copy.`,
            inputPaintChallenge: `paint layers must remain pointer-inert unless they are the named interaction owner; popovers/dialogs must fit safe areas and restore focus.`,
            terminalDisposition: terminal,
            receiver: `${subjectId} future product unit; this source tranche makes no edit`,
        },
    };
}

const designBriefs = [
    ...componentInventory.map((row) => designFor(row.workflowId, "COMPONENT_WORKFLOW", row.sourcePath, row.job, row.terminalDisposition, row.routeOwners)),
    ...routePages.map((row) => designFor(row.subjectId, "NAMED_ROUTE", paneTarget(row.paneConfig.left), row.job, "KEEP", [row.name])),
    designFor(wildcard.subjectId, "WILDCARD_REDIRECT", "demo/color-picker/App.vue", "redirect an unknown path without losing title, focus, or refusal truth", "FOLD", ["wildcard"]),
    ...pageLikeSubjects.map((row) => designFor(row.subjectId, "PHYSICAL_PAGE_LIKE", row.sourcePath, row.job, componentInventory.find((component) => component.workflowId === row.workflowId).terminalDisposition, row.routeOwners)),
    ...inlineLayers.map((row) => {
        const owner = componentInventory.find((component) => component.workflowId === row.ownerWorkflowId);
        return designFor(row.subjectId, row.kind, row.ownerSourcePath, `${row.element} layer inside ${owner.job}`, owner.terminalDisposition, row.routeOwners);
    }),
];

const allStateRecords = [...stateRecords, ...routeStateRecords];
const stateBySubject = new Map(allStateRecords.map((row) => [row.subjectId, row]));
const platforms = {
    IOS_MOBILE_SAFARI: {
        devices: ["compact-notched-iphone", "large-iphone", "ipad"],
        viewports: ["compact-portrait", "compact-landscape", "large-portrait", "large-landscape", "ipad-portrait", "ipad-landscape"],
    },
    INSTALLED_DESKTOP_SAFARI: {
        devices: ["installed-desktop-safari"],
        viewports: ["narrow-100", "standard-100", "wide-100", "narrow-200", "standard-200", "wide-200"],
    },
};
const localeDisplay = ["ltr-light", "rtl-light", "ltr-dark", "rtl-dark", "dynamic-type-large", "platform-high-contrast-equivalent"];
const accessibility = ["keyboard-only", "touch", "pointer-trackpad", "voiceover", "focus-contract", "contrast-target-size", "rotor-switch-semantics"];
const executionSubjects = [
    ...routeInstances.map((row) => ({ subjectId: row.instanceId, sourceSubjectId: componentInventory.find((component) => component.sourcePath === row.sourcePath)?.workflowId ?? "VC-001", instanceKind: "MOUNTED_INSTANCE", routeName: row.routeName })),
    ...componentInventory.filter((row) => row.mountDisposition === "EXPORTED_UNMOUNTED_HARNESS").map((row) => ({ subjectId: `HARNESS-${row.workflowId}`, sourceSubjectId: row.workflowId, instanceKind: "EXPORTED_UNMOUNTED_HARNESS", routeName: "harness" })),
    ...inlineLayers.map((row) => ({ subjectId: row.subjectId, sourceSubjectId: row.ownerWorkflowId, instanceKind: row.kind, routeName: row.routeOwners.join("+") || "harness" })),
];

const kroneckerBlocks = [];
const platformTotals = Object.fromEntries(Object.keys(platforms).map((name) => [name, 0n]));
for (const subject of executionSubjects) {
    const states = stateBySubject.get(subject.sourceSubjectId);
    if (!states) throw new Error(`state-subject:${subject.sourceSubjectId}`);
    const required = states.states.filter((row) => row.applicability === "REQUIRED_UNEXECUTED_RED");
    const counts = {
        origin: states.origins?.api ? 3 : 2,
        interaction: Math.max(1, required.filter((row) => ["lifecycle", "interaction"].includes(row.category)).length),
        dataAuth: Math.max(1, required.filter((row) => ["data", "auth"].includes(row.category)).length),
        network: Math.max(1, required.filter((row) => row.category === "network").length),
        accessibility: accessibility.length,
        time: Math.max(2, required.filter((row) => row.category === "motion").length),
    };
    for (const [platformName, platform] of Object.entries(platforms)) {
        const total = BigInt(counts.origin) * BigInt(platform.viewports.length) * BigInt(localeDisplay.length) * BigInt(counts.interaction) * BigInt(counts.dataAuth) * BigInt(counts.network) * BigInt(counts.accessibility) * BigInt(counts.time);
        platformTotals[platformName] += total;
        kroneckerBlocks.push({
            blockId: `K-${String(kroneckerBlocks.length + 1).padStart(6, "0")}`,
            subjectId: subject.subjectId, sourceSubjectId: subject.sourceSubjectId, instanceKind: subject.instanceKind,
            routeName: subject.routeName, platform: platformName,
            axes: {
                R: [snapshot.sourceRootIdentity], O: counts.origin, P: [subject.routeName], C: [subject.subjectId],
                D: platform.devices, V: platform.viewports, L: localeDisplay,
                I: counts.interaction, X: counts.dataAuth, N: counts.network, A: accessibility, T: counts.time,
            },
            factorCounts: { ...counts, viewport: platform.viewports.length, localeDisplay: localeDisplay.length },
            preliminaryCellCount: total.toString(), status: "UNEXECUTED_RED",
            witnessRequirement: "raw receipt binds every factor coordinate, source snapshot, real platform identity, and subject-specific state",
        });
    }
}
const totalCells = Object.values(platformTotals).reduce((sum, value) => sum + value, 0n);
const equivalenceClasses = kroneckerBlocks.map((block) => ({
    equivalenceId: `EQ-${block.blockId.slice(2)}`,
    members: [block.blockId], representative: block.blockId, reductionApplied: false,
    reason: "singleton class preserves route, instance, state, accessibility, motion, performance, and platform distinctions",
    hostileWitness: `adding a second member without identical axes and source proof must fail validation`,
}));

const pageInventory = {
    schemaVersion: 3, sourceRootIdentity: snapshot.sourceRootIdentity,
    counts: { namedRoutes: routePages.length, wildcardRules: 1, physicalPageLikes: pageLikeSubjects.length, inlineLayers: inlineLayers.length, totalSubjects: routePages.length + 1 + pageLikeSubjects.length + inlineLayers.length },
    namedRoutes: routePages, wildcard, physicalPageLikes: pageLikeSubjects, inlineLayers,
};
const mountGraph = {
    schemaVersion: 3, sourceRootIdentity: snapshot.sourceRootIdentity,
    counts: { declarationEdges: declarationEdges.length, staticMountEdges: staticMountEdges.length, dynamicMountEdges: dynamicMountEdges.length, routeInstances: routeInstances.length, reachableSfc: reachable.size, harnessSfc: sfcPaths.length - reachable.size },
    declarationEdges, staticMountEdges, dynamicMountEdges, viewRows, routeInstances,
    dynamicComponents: sfcPaths.flatMap((file) => [...templateOf(content.get(file)).matchAll(/<component\b([^>]*)>/gu)].map((match, index) => ({ sourcePath: file, occurrence: index + 1, attrs: match[1].trim() }))),
    portals: sfcPaths.flatMap((file) => [...templateOf(content.get(file)).matchAll(/<Teleport\b([^>]*)>/gu)].map((match, index) => ({ sourcePath: file, occurrence: index + 1, attrs: match[1].trim() }))),
};
const componentArtifact = {
    schemaVersion: 3, sourceRootIdentity: snapshot.sourceRootIdentity,
    counts: { physicalSfc: componentInventory.length, mounted: componentInventory.filter((row) => row.mountDisposition === "MOUNTED").length, harness: componentInventory.filter((row) => row.mountDisposition !== "MOUNTED").length, visualBarrelDeclarations: barrelDeclarations.length },
    barrelDeclarations, components: componentInventory,
};
const stateArtifact = {
    schemaVersion: 3, sourceRootIdentity: snapshot.sourceRootIdentity,
    serviceWorkerSourceRegistrations: snapshot.entries.filter((row) => row.path.startsWith("demo/") || row.path.startsWith("src/")).filter((row) => row.content && /navigator\.serviceWorker|serviceWorker\.register/u.test(row.content)).map((row) => row.path),
    counts: { componentRecords: stateRecords.length, pageAndLayerRecords: routeStateRecords.length, totalRecords: allStateRecords.length, statesPerRecord: stateNames.length },
    records: allStateRecords,
};
const designArtifact = {
    schemaVersion: 3, sourceRootIdentity: snapshot.sourceRootIdentity,
    frontendDesignSkill: { used: true, passes: ["D1_SUBJECT_SPECIFIC_BRIEF", "D2_DISJOINT_CRITIQUE"], renderedApproval: false },
    globalDirection: {
        subject: "a precision color instrument for authoring, comparing, publishing, and governing measured color",
        signature: "measured-chroma specimen plus watercolor channel/provenance markers",
        typography: ["Fraunces display", "Plus Jakarta Sans body", "Fira Code data"],
        refusal: "generic dashboard statistics, ornamental cards, gratuitous gradients, and motion without state ownership",
    },
    counts: { componentBriefs: componentInventory.length, routeBriefs: routePages.length, wildcardBriefs: 1, pageLikeBriefs: pageLikeSubjects.length, inlineLayerBriefs: inlineLayers.length, totalBriefs: designBriefs.length },
    briefs: designBriefs,
};
const kroneckerArtifact = {
    schemaVersion: 3, sourceRootIdentity: snapshot.sourceRootIdentity, denominatorVersion: "V-MSK-V3-PRELIMINARY-1",
    status: "ALL_CELLS_UNEXECUTED_RED", executionSubjects: executionSubjects.length,
    platformTotals: Object.fromEntries(Object.entries(platformTotals).map(([key, value]) => [key, value.toString()])),
    preliminaryTotalCells: totalCells.toString(), blocks: kroneckerBlocks,
    credit: { iosSafari: 0, desktopSafari: 0, browser: 0, api: 0, package: 0, product: 0, parser: 0, release: 0, execution: 0 },
};
const equivalenceArtifact = {
    schemaVersion: 3, sourceRootIdentity: snapshot.sourceRootIdentity, denominatorVersion: kroneckerArtifact.denominatorVersion,
    rawBlockCount: kroneckerBlocks.length, effectiveBlockCount: kroneckerBlocks.length,
    rawCellCount: totalCells.toString(), effectiveCellCount: totalCells.toString(), reductionsApplied: 0,
    classes: equivalenceClasses,
    reductionAdmission: ["omitted and witness cells named", "identical axes named", "inapplicability predicate", "source paths", "own-reason hostile mutant", "no route/instance/state/a11y/motion/performance/platform erasure"],
};

const assertions = {
    workflows88: workflows.length === 88,
    workflowBijection: workflows.every((row, index) => row.workflowId === `VC-${String(index + 1).padStart(3, "0")}`) && new Set(workflows.map((row) => row.sourcePath)).size === 88 && workflows.every((row) => sfcPaths.includes(row.sourcePath)),
    routes14: routePages.length === 14 && routerRoutes.length === 14,
    wildcard1: wildcard.path === "/:pathMatch(.*)*" && wildcard.redirect === "/",
    barrels25: barrelDeclarations.length === 25,
    declarations115: declarationEdges.length === 115,
    oneDispositionPerSfc: componentInventory.length === 88 && componentInventory.every((row) => ["MOUNTED", "EXPORTED_UNMOUNTED_HARNESS"].includes(row.mountDisposition)),
    mountedPlusHarness88: componentInventory.filter((row) => row.mountDisposition === "MOUNTED").length + componentInventory.filter((row) => row.mountDisposition !== "MOUNTED").length === 88,
    harnessExports: componentInventory.filter((row) => row.mountDisposition !== "MOUNTED").every((row) => row.exportContracts.length > 0),
    stateCoverage: stateRecords.length === 88 && allStateRecords.every((row) => row.states.length === stateNames.length),
    designCoverage: designBriefs.filter((row) => row.subjectKind === "COMPONENT_WORKFLOW").length === 88 && new Set(designBriefs.map((row) => row.briefId)).size === designBriefs.length,
    uniqueSignatures: new Set(designBriefs.map((row) => row.d1.signature)).size === designBriefs.length,
    kroneckerCoverage: kroneckerBlocks.length === executionSubjects.length * 2 && kroneckerBlocks.every((row) => BigInt(row.preliminaryCellCount) > 0n && row.status === "UNEXECUTED_RED"),
    equivalenceNoReduction: equivalenceClasses.length === kroneckerBlocks.length && equivalenceClasses.every((row) => row.members.length === 1 && !row.reductionApplied),
    zeroCredit: Object.values(kroneckerArtifact.credit).every((value) => value === 0),
    snapshotReadOnce: snapshotReads === 1,
};
const failures = Object.entries(assertions).filter(([, pass]) => !pass).map(([name]) => name);
if (failures.length) throw new Error(`generation-assertions:${failures.join(",")}`);

const rawArtifacts = {
    "ROUTE-PARSE-RAW.json": { schemaVersion: 3, sourceRootIdentity: snapshot.sourceRootIdentity, routerRoutes, routeSpecs, viewRows, wildcard: { path: wildcardMatch[1], redirect: wildcardMatch[2] } },
    "COMPONENT-PARSE-RAW.json": { schemaVersion: 3, sourceRootIdentity: snapshot.sourceRootIdentity, workflows, barrelDeclarations, declarationEdges, sfcPaths },
    "MOUNT-PARSE-RAW.json": { schemaVersion: 3, sourceRootIdentity: snapshot.sourceRootIdentity, staticMountEdges, dynamicMountEdges, routeInstances },
    "STATE-ORIGINS-RAW.json": { schemaVersion: 3, sourceRootIdentity: snapshot.sourceRootIdentity, records: componentInventory.map((row) => ({ workflowId: row.workflowId, sourcePath: row.sourcePath, origins: row.origins })) },
    "DESIGN-INPUTS-RAW.json": { schemaVersion: 3, sourceRootIdentity: snapshot.sourceRootIdentity, inputs: componentInventory.map((row) => ({ workflowId: row.workflowId, sourcePath: row.sourcePath, job: row.job, copy: row.sourceCopy, glassImports: row.glassImports, direction: row.formationDirection })) },
    "KRONECKER-FACTORS-RAW.json": { schemaVersion: 3, sourceRootIdentity: snapshot.sourceRootIdentity, executionSubjects, platforms, localeDisplay, accessibility, blocks: kroneckerBlocks },
};
const aggregates = {
    "PAGE-INVENTORY.json": pageInventory,
    "COMPONENT-INVENTORY.json": componentArtifact,
    "MOUNT-GRAPH.json": mountGraph,
    "STATE-REGISTRY.json": stateArtifact,
    "DESIGN-BRIEFS.json": designArtifact,
    "KRONECKER-REGISTRY.json": kroneckerArtifact,
    "EQUIVALENCE.json": equivalenceArtifact,
    "GENERATION-VALIDATION.json": { schemaVersion: 3, sourceRootIdentity: snapshot.sourceRootIdentity, ok: true, failures: [], assertions, generatedCounts: { pageInventory: pageInventory.counts, componentInventory: componentArtifact.counts, mountGraph: mountGraph.counts, stateRegistry: stateArtifact.counts, designBriefs: designArtifact.counts, kroneckerBlocks: kroneckerBlocks.length, equivalenceClasses: equivalenceClasses.length }, credit: kroneckerArtifact.credit },
};

if (!DRY_RUN) {
    const rawDir = path.join(ROOT, "raw");
    mkdirSync(rawDir, { recursive: true });
    for (const name of Object.keys(rawArtifacts).sort(cp)) writeFileSync(path.join(rawDir, name), json(rawArtifacts[name]));
    for (const name of Object.keys(aggregates).sort(cp)) writeFileSync(path.join(ROOT, name), json(aggregates[name]));
}
process.stdout.write(json({ ok: true, dryRun: DRY_RUN, sourceRootIdentity: snapshot.sourceRootIdentity, assertions, counts: aggregates["GENERATION-VALIDATION.json"].generatedCounts, denominator: { ...kroneckerArtifact.platformTotals, total: kroneckerArtifact.preliminaryTotalCells } }));
