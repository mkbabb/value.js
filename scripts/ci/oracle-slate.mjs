#!/usr/bin/env node
// SERVED MODEL: claude-opus-5[1m]
/**
 * X-W1 · X.W1.a — THE ORACLE SLATE (G-5, widened by fold R2 / R47 / R48 / R50).
 *
 * W1.md's G-5 asks for one predicate: *"`scripts/ci/oracle-slate.mjs` fails
 * when a Playwright project has no CI job"*. The fold widens it three ways and
 * mints a fourth, each from a measured witness:
 *
 *   A · PROJECT ORPHANS  (G-5 as written)      — a project no workflow runs.
 *   B · FILE ORPHANS     (R50 / NG-1 arm 2)    — a tracked spec collected by
 *       ZERO projects. Every project can have a job while a whole spec subtree
 *       is reachable by no project × engine cell: `smoke-safari`'s `testDir` is
 *       the disjoint `./e2e/smoke/safari`, so nothing under `oracles/` is ever
 *       run on WebKit. A project-level slate cannot see that.
 *   C · ENGINE HOLES     (R50)                 — a subtree the corpus routes
 *       engine-specific rows against that a named engine collects zero files
 *       from.
 *   D · DUPLICATE ORDINALS (R47 / NG-14)       — the oracle ordinal is used as
 *       an IDENTITY across the corpus (records cite "o22", "o27" bare). A
 *       duplicate makes every such citation ambiguous and makes this slate
 *       un-auditable by name.
 *   E · DEAD REFERENCES  (R2 / NG-1 arm 1)     — a locator, class, attribute or
 *       filesystem path a tracked spec names that resolves to NOTHING. These
 *       are RED-by-construction independently of any product defect, and they
 *       are why a HARD `e2e-smoke` job would red master on day one for
 *       non-product reasons (R1's SEQUENCING LOCK).
 *   F · LINT CAPABILITY  (R48 / NG-15)         — every `files:` glob in
 *       `eslint.config.js` matches at least one tracked file. Today the
 *       module-lattice rules glob the deleted `demo/@` tree, so every one of
 *       them is dead while `--max-warnings=0` reports green. The glob CURE is
 *       X-W8's (`eslint.config.js` is its carve); the CAPABILITY assertion is
 *       W1's, and this is it.
 *
 * DESIGN NOTE — no grep-theatre. A and B read Playwright's OWN collection
 * (`playwright test --list --reporter=json`) and the config module itself, not
 * a regex over the config text, so the slate cannot disagree with the runner.
 * E's extractor only ever judges LITERAL strings; anything it cannot decide is
 * reported as UNCHECKABLE and counted, never silently passed and never
 * allowlisted.
 *
 *   node scripts/ci/oracle-slate.mjs            # human report, exit 1 on any finding
 *   node scripts/ci/oracle-slate.mjs --json     # machine report
 *
 * Exit codes: 0 clean · 1 findings · 2 the slate itself could not run.
 */
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const JSON_MODE = process.argv.includes("--json");

/** Subtrees the corpus routes engine-specific rows against → the engines owed. */
const ENGINE_ROUTED_SUBTREES = [
    // PH-4: *"the oracles subtree is structurally unreachable from any WebKit
    // project"*, while the corpus books WebKit-specific rows against oracles by
    // ordinal. Until a WebKit project collects them, C reds.
    { subtree: "e2e/smoke/oracles/", engines: ["webkit"] },
];

/** The workflow files that may satisfy a project's CI-job obligation. */
const WORKFLOWS = [".github/workflows/ci.yml"];

const findings = [];
/**
 * ROUTED findings: real, measured, named on every run — and NOT this wave's to
 * cure. `eslint.config.js` is X-W8's `modify-carve` (fold R48's BOUNDARY LOCK),
 * so X-W1 owns the `lint` script and its CI job while the glob cure is X-W8's.
 * A routed finding is printed in full and carried in `--json`; it does not
 * decide this slate's exit code, because a gate that reds a wave for another
 * wave's defect makes G-17 (master green) unreachable and gets switched off.
 * This is NOT an allowlist — nothing is exempted, every member is named every
 * run — and it is NOT `continue-on-error` — no gate of THIS wave is softened.
 */
const routed = [];
const notes = [];
function fail(section, message, detail) {
    findings.push({ section, message, ...(detail ? { detail } : {}) });
}
function route(section, owner, message, detail) {
    routed.push({ section, owner, message, ...(detail ? { detail } : {}) });
}

// ── helpers ─────────────────────────────────────────────────────────────────

function git(...args) {
    return execFileSync("git", args, { cwd: ROOT, encoding: "utf8" });
}

function trackedFiles() {
    return git("ls-files", "-z").split("\0").filter(Boolean);
}

/** Minimal glob → RegExp, enough for eslint `files:` globs (`**`, `*`, `{a,b}`). */
function globToRegExp(glob) {
    let out = "";
    for (let i = 0; i < glob.length; i++) {
        const ch = glob[i];
        if (ch === "*") {
            if (glob[i + 1] === "*") {
                // `**/` swallows zero or more path segments.
                if (glob[i + 2] === "/") {
                    out += "(?:[^/]*\\/)*";
                    i += 2;
                } else {
                    out += ".*";
                    i += 1;
                }
            } else {
                out += "[^/]*";
            }
        } else if (ch === "?") out += "[^/]";
        else if (ch === "{") out += "(?:";
        else if (ch === "}") out += ")";
        else if (ch === ",") out += "|";
        else if ("\\^$.|+()[]".includes(ch)) out += "\\" + ch;
        else out += ch;
    }
    return new RegExp("^" + out + "$");
}

function listProjectFiles(configPath, projectName) {
    const args = ["playwright", "test", "--list", "--reporter=json"];
    if (configPath) args.push("-c", configPath);
    if (projectName) args.push(`--project=${projectName}`);
    const raw = execFileSync("npx", args, {
        cwd: ROOT,
        encoding: "utf8",
        maxBuffer: 64 * 1024 * 1024,
        stdio: ["ignore", "pipe", "pipe"],
    });
    const start = raw.indexOf("{");
    const report = JSON.parse(raw.slice(start));
    // `suite.file` is relative to `config.rootDir`, NOT to the repo root — and
    // this config's `rootDir` is `e2e/`, so a naive comparison against
    // `git ls-files` reports every spec as an orphan. Re-root here.
    const rootDir = report.config?.rootDir ?? ROOT;
    const files = new Set();
    const walk = (suites) => {
        for (const s of suites ?? []) {
            if (s.file) files.add(relative(ROOT, resolve(rootDir, s.file)));
            walk(s.suites);
        }
    };
    walk(report.suites);
    return files;
}

// ── A · project orphans ─────────────────────────────────────────────────────

const configs = [
    { path: null, label: "playwright.config.ts", module: "./playwright.config.ts" },
];

const projectEngines = new Map();
const projectDirs = new Map();
const allProjects = [];

for (const cfg of configs) {
    let mod;
    try {
        mod = await import(new URL(cfg.module, `file://${ROOT}/`).href);
    } catch (err) {
        console.error(`oracle-slate: cannot load ${cfg.label}: ${err.message}`);
        process.exit(2);
    }
    for (const p of mod.default.projects ?? []) {
        allProjects.push(p.name);
        projectDirs.set(p.name, p.testDir ?? mod.default.testDir ?? ".");
        const use = p.use ?? {};
        projectEngines.set(
            p.name,
            use.browserName ?? use.defaultBrowserType ?? "chromium",
        );
    }
}

const workflowText = WORKFLOWS.map((w) => {
    const abs = join(ROOT, w);
    return existsSync(abs) ? readFileSync(abs, "utf8") : "";
}).join("\n");

const invokedProjects = new Set(
    [...workflowText.matchAll(/--project=([A-Za-z0-9_-]+)/g)].map((m) => m[1]),
);

for (const name of allProjects) {
    if (!invokedProjects.has(name)) {
        fail(
            "A · PROJECT ORPHAN",
            `Playwright project "${name}" is named by no CI job`,
            `no \`--project=${name}\` in ${WORKFLOWS.join(", ")}`,
        );
    }
}
for (const name of invokedProjects) {
    if (!allProjects.includes(name)) {
        fail(
            "A · PROJECT ORPHAN (reverse)",
            `CI invokes --project=${name}, which no config declares`,
        );
    }
}

// ── B · file orphans ────────────────────────────────────────────────────────

const trackedSpecs = trackedFiles().filter(
    (f) => f.startsWith("e2e/") && f.endsWith(".spec.ts"),
);

const collectedByProject = new Map();
let collectedUnion = new Set();
for (const name of allProjects) {
    let files;
    try {
        files = listProjectFiles(null, name);
    } catch (err) {
        console.error(
            `oracle-slate: collection failed for project "${name}": ${err.message}`,
        );
        process.exit(2);
    }
    collectedByProject.set(name, files);
    collectedUnion = new Set([...collectedUnion, ...files]);
}

const collectedRel = collectedUnion;

for (const spec of trackedSpecs) {
    if (!collectedRel.has(spec)) {
        fail(
            "B · FILE ORPHAN",
            `tracked spec collected by ZERO projects: ${spec}`,
            "every project has a job and this file still runs nowhere (R50)",
        );
    }
}

// ── C · engine holes ────────────────────────────────────────────────────────

for (const { subtree, engines } of ENGINE_ROUTED_SUBTREES) {
    for (const engine of engines) {
        const projectsOnEngine = allProjects.filter(
            (n) => projectEngines.get(n) === engine,
        );
        const reached = projectsOnEngine.some((n) =>
            [...(collectedByProject.get(n) ?? [])].some((f) => f.startsWith(subtree)),
        );
        if (!reached) {
            fail(
                "C · ENGINE HOLE",
                `no ${engine} project collects any file from ${subtree}`,
                `${engine} projects: ${projectsOnEngine.join(", ") || "(none)"}`,
            );
        }
    }
}

// ── D · duplicate oracle ordinals ───────────────────────────────────────────

/**
 * The predicate is SHARPER than "two files, one ordinal", and deliberately so.
 * `o10d` is claimed by two files — `oracles/o10d-display-voice-census.spec.ts`
 * and `admin/o10d-admin-title-voice.spec.ts` — and that is NOT R47's defect: it
 * is ONE oracle over two populations, split because the admin half only mounts
 * behind admin auth, and each file's own test titles say `O-10d`. R47's defect
 * is two DIFFERENT oracles wearing one ordinal, which is what makes a bare
 * corpus citation ("o22", "o27") ambiguous.
 *
 * So the identity is read from each spec's DECLARED oracle token, not from its
 * filename: files that agree are one oracle; files that disagree are the
 * collision. Nothing is allowlisted — the rule is measured from the files.
 */
const byOrdinal = new Map();
for (const spec of trackedSpecs) {
    const base = spec.slice(spec.lastIndexOf("/") + 1);
    const m = /^(o\d+[a-z]*)-/.exec(base);
    if (!m) continue;
    const key = m[1];
    if (!byOrdinal.has(key)) byOrdinal.set(key, []);
    byOrdinal.get(key).push(spec);
}
for (const [ordinal, files] of byOrdinal) {
    if (files.length < 2) continue;
    const declared = files.map((f) => {
        const text = readFileSync(join(ROOT, f), "utf8");
        const tokens = new Set(
            [...text.matchAll(/\bO-(\d+[a-z]*)\b/gi)].map((x) => x[1].toLowerCase()),
        );
        return { file: f, declares: tokens.has(ordinal.slice(1)) };
    });
    const agreeing = declared.filter((d) => d.declares);
    if (agreeing.length === files.length) {
        notes.push(
            `D · ordinal "${ordinal}" is one oracle over ${files.length} files, each declaring it: ` +
                files.join(" · "),
        );
        continue;
    }
    fail(
        "D · DUPLICATE ORDINAL",
        `oracle ordinal "${ordinal}" is claimed by ${files.length} specs that do not declare one oracle`,
        files
            .map((f, i) => `${f} (${declared[i].declares ? "declares" : "SILENT"})`)
            .join(" · "),
    );
}

// ── E · dead references ─────────────────────────────────────────────────────

/**
 * The haystack a spec's literal may legitimately resolve into: the product
 * source, the installed producer's shipped bytes, and the e2e tree's own
 * fixtures (a fixture may mint a hook a spec then reads).
 */
function readHaystack(includeE2e) {
    const parts = [];
    const push = (abs) => {
        try {
            parts.push(readFileSync(abs, "utf8"));
        } catch {
            /* unreadable — contributes nothing */
        }
    };
    for (const f of trackedFiles()) {
        if (
            f.startsWith("demo/") &&
            /\.(vue|ts|css|html)$/.test(f) &&
            !f.startsWith("demo/test/")
        ) {
            push(join(ROOT, f));
        }
    }
    const glass = join(ROOT, "node_modules/@mkbabb/glass-ui/dist");
    if (existsSync(glass)) {
        for (const entry of execFileSync("find", [glass, "-type", "f"], {
            encoding: "utf8",
            maxBuffer: 64 * 1024 * 1024,
        })
            .split("\n")
            .filter((p) => /\.(js|css)$/.test(p))) {
            push(entry);
        }
    }
    // The e2e tree itself, SPEC FILES INCLUDED: a spec that mocks a route mints
    // the very row whose accessible name it then queries ("Approve color name
    // <minted>"), so that name legitimately resolves into test data rather than
    // into product source. Excluding specs would report 23 such names as dead.
    if (includeE2e) {
        for (const f of trackedFiles()) {
            if (f.startsWith("e2e/") && f.endsWith(".ts")) push(join(ROOT, f));
        }
    }
    return parts.join("\n");
}

/**
 * TWO haystacks, deliberately.
 *
 * A CSS class or a `data-` attribute is a PRODUCT fact: if it exists only
 * inside the spec that binds it, it is dead — so `PRODUCT` excludes `e2e/`, or
 * `o22-status-lamp.spec.ts`'s own mention of `.dev-misconfig-banner` would
 * vouch for the selector it is the sole survivor of.
 *
 * An accessible NAME may legitimately come from test data a fixture mints
 * (`"Approve color name <minted>"`), so `WITH_TESTDATA` includes the e2e tree.
 */
const PRODUCT = readHaystack(false);
const WITH_TESTDATA = readHaystack(true);
let uncheckable = 0;
let checked = 0;

const E_SOURCES = trackedFiles().filter(
    (f) => f.startsWith("e2e/") && f.endsWith(".ts"),
);

/**
 * A reference inside a COMMENT is not a binding. The census reads what the
 * runner would execute, so block comments and whole-line `//` comments are
 * removed first — otherwise a deletion rationale that names the dead locator it
 * removed (which is exactly what R2 requires a rationale to do) would keep
 * reporting the finding it cured. Trailing `//` on a code line is left alone:
 * stripping it needs a real tokenizer, and leaving it can only ADD findings,
 * never hide one.
 */
function executableSource(text) {
    return text
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .split("\n")
        .filter((line) => !/^\s*\/\//.test(line))
        .join("\n");
}

for (const rel of E_SOURCES) {
    const abs = join(ROOT, rel);
    const src = executableSource(readFileSync(abs, "utf8"));

    // E1 · literal filesystem paths the spec dereferences.
    for (const m of src.matchAll(
        /new URL\(\s*"([^"]+)"\s*,\s*import\.meta\.url\s*\)/g,
    )) {
        const target = resolve(dirname(abs), m[1]);
        checked++;
        if (!existsSync(target)) {
            fail(
                "E · DEAD PATH",
                `${rel} dereferences a path that does not exist: ${m[1]}`,
                `resolved: ${relative(ROOT, target)}`,
            );
        }
    }

    // E2 · literal single-class locators.
    for (const m of src.matchAll(
        /(?:\.locator|querySelectorAll|querySelector)\(\s*"(\.[A-Za-z][A-Za-z0-9_-]*)"\s*\)/g,
    )) {
        const cls = m[1].slice(1);
        checked++;
        if (!new RegExp(`\\b${cls.replace(/[-]/g, "\\-")}\\b`).test(PRODUCT)) {
            fail(
                "E · DEAD CLASS",
                `${rel} binds ".${cls}", which appears in no product or producer byte`,
            );
        }
    }

    // E3 · literal attribute selectors.
    for (const m of src.matchAll(/\[\s*(data-[a-z0-9-]+)\s*(?:[\]=])/g)) {
        const attr = m[1];
        checked++;
        const camel = attr
            .replace(/^data-/, "")
            .replace(/-([a-z])/g, (_, c) => c.toUpperCase());
        if (!PRODUCT.includes(attr) && !new RegExp(`\\b${camel}\\b`).test(PRODUCT)) {
            fail(
                "E · DEAD ATTRIBUTE",
                `${rel} binds [${attr}], which appears in no product or producer byte`,
            );
        }
    }

    // E5 · literal test ids. `data-testid` is the repo's stable-binding idiom
    // (fold R25: *"bind by a stable test id, not role-and-hope"*), so a test id
    // that exists in no product byte is a dead binding of the purest kind.
    for (const m of src.matchAll(/getByTestId\(\s*"([^"]+)"\s*\)/g)) {
        const id = m[1];
        checked++;
        if (!PRODUCT.includes(id)) {
            fail(
                "E · DEAD TEST ID",
                `${rel} binds getByTestId("${id}"), which appears in no product or producer byte`,
            );
        }
    }

    // E4 · literal accessible names.
    for (const m of src.matchAll(/name:\s*"([^"]{4,})"/g)) {
        const name = m[1];
        checked++;
        if (!WITH_TESTDATA.includes(name)) {
            fail(
                "E · DEAD ACCESSIBLE NAME",
                `${rel} queries the accessible name "${name}", which appears in no product or producer byte`,
            );
        }
    }
    // Template / regex / variable locators the extractor cannot decide.
    uncheckable += [...src.matchAll(/name:\s*(?:`|\/|[A-Za-z_$])/g)].length;
}

notes.push(
    "E · a STATIC census. A locator whose literal EXISTS in product source but " +
        "is unreachable at runtime (an `aria-label` dropped by a producer " +
        "component's `inheritAttrs: false`) is not decidable here — that class " +
        "is caught by G-3's classified run.",
);
notes.push(
    `E · ${checked} literal references checked · ${uncheckable} dynamic (template/regex/variable) references are UNCHECKABLE by this instrument and are reported, not exempted`,
);

// ── F · lint capability ─────────────────────────────────────────────────────

const eslintPath = join(ROOT, "eslint.config.js");
if (existsSync(eslintPath) && statSync(eslintPath).isFile()) {
    const text = readFileSync(eslintPath, "utf8");
    const tracked = trackedFiles();
    const globs = new Set();
    for (const block of text.matchAll(/files:\s*\[([\s\S]*?)\]/g)) {
        for (const g of block[1].matchAll(/"([^"]+)"/g)) globs.add(g[1]);
    }
    for (const glob of globs) {
        // A glob with NO literal directory prefix (`**/*.tsx`) is a LANGUAGE
        // declaration, not a claim that a path exists; judging it would make
        // this section noise and get the section switched off. A glob that
        // names a directory (`demo/@/lib/**/*.ts`) IS a path claim, and a
        // rule attached to an absent directory can never fire.
        const prefix = glob.slice(
            0,
            glob.search(/[*?{]/) === -1 ? glob.length : glob.search(/[*?{]/),
        );
        const dir = prefix.replace(/[^/]*$/, "").replace(/\/$/, "");
        if (!dir) continue;
        const re = globToRegExp(glob);
        if (!tracked.some((f) => re.test(f))) {
            route(
                "F · DEAD LINT GLOB",
                "X-W8 (eslint.config.js is its modify-carve — fold R48 BOUNDARY LOCK)",
                `eslint.config.js globs "${glob}", whose directory "${dir}" does not exist`,
                "the rule attached to it can never fire; `--max-warnings=0` reports green over nothing",
            );
        }
    }
    notes.push(
        `F · ${globs.size} eslint \`files:\` globs read; only path-claiming globs are judged`,
    );
}

// ── report ──────────────────────────────────────────────────────────────────

if (JSON_MODE) {
    console.log(
        JSON.stringify(
            {
                ok: findings.length === 0,
                routed,
                projects: allProjects,
                trackedSpecs: trackedSpecs.length,
                collected: collectedRel.size,
                findings,
                notes,
            },
            null,
            2,
        ),
    );
} else {
    console.log("ORACLE SLATE — X-W1 G-5 (R2 · R47 · R48 · R50)");
    console.log(
        `  projects declared : ${allProjects.length} (${allProjects.join(", ")})`,
    );
    console.log(`  projects invoked  : ${[...invokedProjects].join(", ") || "(none)"}`);
    console.log(`  tracked e2e specs : ${trackedSpecs.length}`);
    console.log(`  collected by ≥1   : ${collectedRel.size}`);
    for (const n of notes) console.log(`  ${n}`);
    console.log("");
    if (routed.length > 0) {
        console.log(`ROUTED — ${routed.length} measured, NOT this wave's to cure`);
        for (const r of routed) {
            console.log(`  · [${r.section}] ${r.message}`);
            console.log(`      owner: ${r.owner}`);
        }
        console.log("");
    }
    if (findings.length === 0) {
        console.log(
            `SLATE CLEAN — 0 findings${routed.length ? ` (${routed.length} routed, named above)` : ""}`,
        );
    } else {
        const bySection = new Map();
        for (const f of findings) {
            if (!bySection.has(f.section)) bySection.set(f.section, []);
            bySection.get(f.section).push(f);
        }
        for (const [section, rows] of bySection) {
            console.log(`${section} — ${rows.length}`);
            for (const r of rows) {
                console.log(`  · ${r.message}`);
                if (r.detail) console.log(`      ${r.detail}`);
            }
        }
        console.log("");
        console.log(`SLATE RED — ${findings.length} finding(s)`);
    }
}

process.exit(findings.length === 0 ? 0 : 1);
