import { createHash } from "node:crypto";
import { readFileSync, statSync } from "node:fs";
import { basename, resolve } from "node:path";

const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
const byteSort = (left, right) => Buffer.from(left).compare(Buffer.from(right));

function argumentsFrom(argv) {
    const result = new Map();
    for (let index = 0; index < argv.length; index += 2) {
        const flag = argv[index];
        const value = argv[index + 1];
        if (!flag?.startsWith("--") || value === undefined) {
            throw new Error("usage: classify-complement.mjs --source-root <pinned-tree> --universe <json> --seed <json>");
        }
        result.set(flag.slice(2), value);
    }
    return result;
}

const classifications = {
    HISTORICAL_SNAPSHOT_OR_META_INDEX: `
        css-2007 css-2010 css-2015 css-2017 css-2018 css-2020 css-2021
        css-2022 css-2023 css-2024 css-2025 indexes
    `,
    CANDIDATE_EXCLUDE_SUPERSEDED_OBSOLETE_OR_NON_LANGUAGE: `
        css-color-3 css-mobile css-module css-page-template-1 css-preslev-1
        css-print css-scoping-1 css-shaders-1 css-shadow-parts-1 css-template-1
        css-tv matrix selectors-nonelement-1
    `,
    NORMATIVE_DEPENDENCY_CANDIDATE: `
        css-anchor-position-1 css-borders-4 css-box-4 css-break-4 css-display-4
        css-fonts-5 css-gaps-1 css-images-5 css-inline-3 css-mixins-1
        css-overflow-3 css-overflow-4 css-page-3 css-pseudo-4 css-regions-1
        css-ruby-1 css-scroll-snap-2 css-shadow-1 css-sizing-4 css-text-4
        css-text-decor-4 css-transitions-2 css-ui-4 fill-stroke-3 selectors-5
        web-animations-2
    `,
    LATER_LEVEL_OR_EXPERIMENTAL_LANGUAGE_CANDIDATE: `
        compositing-2 css-anchor-position-2 css-backgrounds-4 css-cascade-6
        css-color-6 css-color-hdr-1 css-conditional-values-1 css-contain-3
        css-content-3 css-egg-1 css-exclusions-1 css-extensions-1 css-flexbox-2
        css-forms-1 css-gcpm-3 css-gcpm-4 css-grid-3 css-highlight-api-1
        css-image-animation-1 css-line-grid-1 css-link-params-1 css-multicol-2
        css-navigation-1 css-overflow-5 css-overscroll-1 css-page-4
        css-page-floats-3 css-position-4 css-rhythm-1 css-round-display-1
        css-shapes-2 css-size-adjust-1 css-spatial-nav-1 css-tables-3
        css-view-transitions-2 css-viewport-1 filter-effects-2
        pointer-animations-1
    `,
    GENUINELY_UNRESOLVED_RED: `
        css-cascade-3 css-text-5 web-animations-css-integration
    `,
};

const classificationByDirectory = new Map();
for (const [classification, words] of Object.entries(classifications)) {
    for (const directory of words.trim().split(/\s+/)) {
        if (classificationByDirectory.has(directory)) {
            throw new Error(`duplicate classification: ${directory}`);
        }
        classificationByDirectory.set(directory, classification);
    }
}

const dependencyEvidence = {
    "css-anchor-position-1": ["css-position-3", "[[css-anchor-position-1#position-area]]"],
    "css-borders-4": ["css-break-3", "spec:css-borders-4;"],
    "css-box-4": ["css-view-transitions-1", "spec:css-box-4;"],
    "css-break-4": ["css-backgrounds-3", "spec:css-break-4;"],
    "css-display-4": ["selectors-4", "spec:css-display-4;"],
    "css-fonts-5": ["filter-effects-1", "spec:css-fonts-5;"],
    "css-gaps-1": ["css-align-3", "[[!CSS-GAPS-1]]"],
    "css-images-5": ["css-images-4", "[[css-images-5]]"],
    "css-inline-3": ["css-2026", "[[!CSS-INLINE-3]]"],
    "css-mixins-1": ["css-values-5", "spec:css-mixins-1;"],
    "css-overflow-3": ["css-text-3", "[[!CSS-OVERFLOW-3]]"],
    "css-overflow-4": ["css-conditional-5", "[[CSS-OVERFLOW-4]]"],
    "css-page-3": ["css-display-3", "[[!CSS-PAGE-3]]"],
    "css-pseudo-4": ["css-2026", "[[!CSS-PSEUDO-4]]"],
    "css-regions-1": ["css-contain-1", "[[CSS-REGIONS-1]] has details"],
    "css-ruby-1": ["css-display-3", "[[!CSS-RUBY-1]]"],
    "css-scroll-snap-2": ["css-conditional-5", "spec:css-scroll-snap-2;"],
    "css-sizing-4": ["css-2026", "[[!CSS-SIZING-4]]"],
    "css-text-4": ["css-2026", "[[!CSS-TEXT-4]]"],
    "css-text-decor-4": ["css-2026", "[[!CSS-TEXT-DECOR-4]]"],
    "css-transitions-2": ["web-animations-1", "spec: css-transitions-2"],
    "css-ui-4": ["css-2026", "[[CSS-UI-4]]"],
    "fill-stroke-3": ["css-masking-1", "spec:fill-stroke-3;"],
    "selectors-5": ["selectors-4", "spec:selectors-5;"],
    "web-animations-2": ["css-values-5", "[[!WEB-ANIMATIONS-2]]"],
};

const exclusionEvidence = {
    "css-color-3": ["CSS Color Module Level 3", "Seed already contains CSS Color Levels 4 and 5; retain Level 3 provenance but treat its lower-level source as a candidate superseded operation source."],
    "css-mobile": ["This profile is obsolete.", "Pinned source marks the profile abandoned and obsolete."],
    "css-module": ["CSS Foo Module Level 1", "Repository drafting template with placeholder foo/bar/baz language, not a CSS specification."],
    "css-page-template-1": ["should not be considered to be part of CSS", "Pinned source is an unofficial draft not adopted by the Working Group and expressly outside CSS."],
    "css-preslev-1": ["At this time, the CSS Working Group does not envisage", "Pinned status says no further work and no Recommendation is planned."],
    "css-print": ["This profile is obsolete.", "Pinned source marks the print profile abandoned and obsolete."],
    "css-scoping-1": ["Moved to CSS Shadow Module Level 1", "Redirect-only source; its target is separately classified as a dependency candidate."],
    "css-shaders-1": ["not being actively maintained", "Pinned warning says not to use this source for implementation and routes the subject to Filter Effects."],
    "css-shadow-parts-1": ["Merged into CSS Shadow Module Level 1", "Redirect-only source merged into the separately classified CSS Shadow module."],
    "css-template-1": ["not expected to become a W3C Recommendation", "Pinned Note is an ideas repository whose contents may migrate to other modules."],
    "css-tv": ["At this time, the CSS Working Group does not", "Pinned status says no further work and no Recommendation is planned."],
    matrix: ["Work Status: abandoned", "Abandoned DOMMatrix API note that points to seeded Geometry Level 1 for the newer API."],
    "selectors-nonelement-1": ["not intended to be used in CSS", "Pinned source defines a non-CSS query language for other host environments."],
};

const unresolvedEvidence = {
    "css-cascade-3": ["css-display-3", "[[!CSS-CASCADE-3]]", "Seed roots cite Level 3 normatively while also containing Levels 4 and 5; the pinned packet has not sealed a supersession/occurrence rule."],
    "css-text-5": ["css-text-5", "Level: 4", "Directory/title say CSS Text Level 5 but the pinned metadata says Level 4, so identity and level routing remain RED."],
    "web-animations-css-integration": ["web-animations-css-integration", "intended to be incorporated into Level 2", "Pinned source states an intended migration into Animations/Transitions Level 2 but does not establish that migration as completed."],
};

const specialDependencyEvidence = {
    "css-shadow-1": [
        ["animation-triggers-1", "[[!CSS-SCOPING-1]]"],
        ["css-scoping-1", "Moved to CSS Shadow Module Level 1"],
    ],
};

function sourceLines(source) {
    return source.split(/\r?\n/);
}

function exactEvidence(sourceByDirectory, directory, needle, kind) {
    const source = sourceByDirectory.get(directory);
    if (source === undefined) throw new Error(`evidence source is absent: ${directory}`);
    const lines = sourceLines(source.text);
    const lineIndex = lines.findIndex((line) => line.includes(needle));
    if (lineIndex < 0) throw new Error(`evidence needle is absent: ${directory}: ${needle}`);
    return {
        kind,
        exact_path: source.entry.exact_path,
        sha256_raw_source: source.entry.sha256_raw_source,
        line: lineIndex + 1,
        fact: needle,
    };
}

function metadata(source) {
    const lines = sourceLines(source);
    const keys = ["Title", "Shortname", "Level", "Status", "Work Status"];
    const result = {};
    for (const key of keys) {
        const matcher = new RegExp(`^${key.replace(" ", "\\s+")}:\\s*(.*)$`, "i");
        const lineIndex = lines.findIndex((line) => matcher.test(line));
        if (lineIndex < 0) continue;
        const match = matcher.exec(lines[lineIndex]);
        result[key.toLowerCase().replace(" ", "_")] = {
            value: match[1].trim() || "none",
            line: lineIndex + 1,
        };
    }
    if (result.title === undefined) {
        const lineIndex = lines.findIndex((line) => /<title>[^<]+<\/title>/i.test(line));
        if (lineIndex >= 0) {
            result.title = {
                value: /<title>([^<]+)<\/title>/i.exec(lines[lineIndex])[1].trim(),
                line: lineIndex + 1,
            };
        }
    }
    if (result.title === undefined) {
        const lineIndex = lines.findIndex((line) => /<h1[^>]*>[^<]+<\/h1>/i.test(line));
        if (lineIndex >= 0) {
            result.title = {
                value: /<h1[^>]*>([^<]+)<\/h1>/i.exec(lines[lineIndex])[1].trim(),
                line: lineIndex + 1,
            };
        }
    }
    return result;
}

function languageSignals(source) {
    const count = (pattern) => [...source.matchAll(pattern)].length;
    return {
        property_or_descriptor_definition_markers: count(/\b(?:propdef|descdef)\b/gi),
        grammar_production_markers: count(/class=["'][^"']*\bprod\b[^"']*["']/gi),
        at_rule_tokens: new Set([...source.matchAll(/(^|[^\w-])@([a-z][a-z0-9-]*)/gim)].map((match) => match[2])).size,
        css_function_tokens: new Set([...source.matchAll(/\b([a-z][a-z0-9-]*)\(\)/gim)].map((match) => match[1])).size,
    };
}

function titleOf(meta, directory) {
    return meta.title?.value ?? directory;
}

function classificationReason(classification, entry, meta, signals) {
    const title = titleOf(meta, entry.directory);
    if (classification === "HISTORICAL_SNAPSHOT_OR_META_INDEX") {
        return entry.directory === "indexes"
            ? "Pinned CSS-wide term index; retain as provenance/discovery evidence, not as a normative operation source."
            : `${title} is a historical snapshot that aggregates specification membership; retain provenance, but extract operations from the member specifications.`;
    }
    if (classification === "CANDIDATE_EXCLUDE_SUPERSEDED_OBSOLETE_OR_NON_LANGUAGE") {
        return exclusionEvidence[entry.directory][1];
    }
    if (classification === "NORMATIVE_DEPENDENCY_CANDIDATE") {
        return `${title} is outside the 76-root seed but a seeded source imports, cites, or redirects to one of its definitions. It requires occurrence-level review before inclusion or exclusion.`;
    }
    if (classification === "LATER_LEVEL_OR_EXPERIMENTAL_LANGUAGE_CANDIDATE") {
        const markerCount = Object.values(signals).reduce((sum, value) => sum + value, 0);
        return `${title} is outside the seed, is not terminally excluded by its pinned bytes, and exposes ${markerCount} mechanical parser-surface marker(s). Route it to later/experimental occurrence review; this is not inclusion credit.`;
    }
    return unresolvedEvidence[entry.directory][2];
}

function evidenceFor(classification, entry, sourceByDirectory, meta) {
    if (classification === "HISTORICAL_SNAPSHOT_OR_META_INDEX") {
        return [{
            kind: entry.directory === "indexes" ? "PINNED_META_INDEX_IDENTITY" : "PINNED_SNAPSHOT_IDENTITY",
            exact_path: entry.exact_path,
            sha256_raw_source: entry.sha256_raw_source,
            line: meta.title?.line ?? 1,
            fact: meta.title?.value ?? entry.directory,
        }];
    }
    if (classification === "CANDIDATE_EXCLUDE_SUPERSEDED_OBSOLETE_OR_NON_LANGUAGE") {
        const [needle] = exclusionEvidence[entry.directory];
        return [exactEvidence(sourceByDirectory, entry.directory, needle, "PINNED_TERMINAL_OR_SUPERSESSION_EVIDENCE")];
    }
    if (classification === "NORMATIVE_DEPENDENCY_CANDIDATE") {
        if (entry.directory in specialDependencyEvidence) {
            return specialDependencyEvidence[entry.directory].map(([directory, needle]) =>
                exactEvidence(sourceByDirectory, directory, needle, "PINNED_DEPENDENCY_REDIRECT_CHAIN"));
        }
        const [directory, needle] = dependencyEvidence[entry.directory];
        return [exactEvidence(sourceByDirectory, directory, needle, "PINNED_SEED_DEPENDENCY_EDGE")];
    }
    if (classification === "LATER_LEVEL_OR_EXPERIMENTAL_LANGUAGE_CANDIDATE") {
        return [{
            kind: "PINNED_MODULE_IDENTITY_AND_MECHANICAL_LANGUAGE_SIGNALS",
            exact_path: entry.exact_path,
            sha256_raw_source: entry.sha256_raw_source,
            line: meta.title?.line ?? 1,
            fact: meta.title?.value ?? entry.directory,
        }];
    }
    const [directory, needle] = unresolvedEvidence[entry.directory];
    return [exactEvidence(sourceByDirectory, directory, needle, "PINNED_CONFLICT_OR_INCOMPLETE_MIGRATION")];
}

const args = argumentsFrom(process.argv.slice(2));
const sourceRoot = resolve(args.get("source-root") ?? "");
const universeFile = resolve(args.get("universe") ?? "");
const seedFile = resolve(args.get("seed") ?? "");
if (!sourceRoot || !universeFile || !seedFile) throw new Error("all arguments are required");

const universeBytes = readFileSync(universeFile);
const seedBytes = readFileSync(seedFile);
const universe = JSON.parse(universeBytes.toString("utf8"));
const seed = JSON.parse(seedBytes.toString("utf8"));
if (universe.verified_commit !== seed.verified_commit) throw new Error("commit identity mismatch");
if (universe.verified_commit_tree !== seed.verified_commit_tree) throw new Error("tree identity mismatch");
if (universe.seed_manifest_sha256 !== sha256(seedBytes)) throw new Error("seed raw hash mismatch");

const sourceByDirectory = new Map();
const hashFailures = [];
for (const entry of universe.sources) {
    const exactFile = resolve(sourceRoot, entry.exact_path);
    const bytes = readFileSync(exactFile);
    const actualHash = sha256(bytes);
    const actualBytes = statSync(exactFile).size;
    if (actualHash !== entry.sha256_raw_source || actualBytes !== entry.raw_source_bytes) {
        hashFailures.push({ directory: entry.directory, actualHash, actualBytes });
    }
    sourceByDirectory.set(entry.directory, { entry, text: bytes.toString("utf8") });
}
if (hashFailures.length !== 0) throw new Error(`pinned source mismatch: ${JSON.stringify(hashFailures)}`);

const complement = universe.sources.filter((entry) => !entry.root_seed_membership);
const complementDirectories = new Set(complement.map((entry) => entry.directory));
const unknownClassifications = [...classificationByDirectory.keys()].filter((directory) => !complementDirectories.has(directory));
const unclassified = complement.filter((entry) => !classificationByDirectory.has(entry.directory));
if (unknownClassifications.length !== 0 || unclassified.length !== 0) {
    throw new Error(`classification is not bijective: ${JSON.stringify({ unknownClassifications, unclassified })}`);
}

const entries = complement
    .map((entry) => {
        const classification = classificationByDirectory.get(entry.directory);
        const source = sourceByDirectory.get(entry.directory).text;
        const meta = metadata(source);
        const signals = languageSignals(source);
        return {
            directory: entry.directory,
            exact_path: entry.exact_path,
            source_format: entry.source_format,
            git_blob_oid_sha1: entry.git_blob_oid_sha1,
            sha256_raw_source: entry.sha256_raw_source,
            raw_source_bytes: entry.raw_source_bytes,
            metadata: meta,
            mechanical_language_signals_non_credit: signals,
            classification,
            reason: classificationReason(classification, entry, meta, signals),
            evidence: evidenceFor(classification, entry, sourceByDirectory, meta),
        };
    })
    .sort((left, right) => byteSort(left.directory, right.directory));

const countByClassification = {};
for (const classification of Object.keys(classifications)) {
    countByClassification[classification] = entries.filter((entry) => entry.classification === classification).length;
}

const payload = {
    schema_version: "value.pi.css-source-complement-classification/v1",
    authority_status: "RESEARCH_CLASSIFICATION_ONLY_DENOMINATOR_NOT_CLOSED",
    verified_commit: universe.verified_commit,
    verified_commit_tree: universe.verified_commit_tree,
    source_universe_sha256: sha256(universeBytes),
    source_universe_content_digest_sha256: universe.content_digest_sha256,
    seed_manifest_sha256: sha256(seedBytes),
    seed_manifest_content_digest: seed.manifest_content_digest,
    method: {
        source_authority: "Exact Overview source bytes at the pinned CSSWG commit; no current-web substitution.",
        precedence: [
            "historical snapshot/meta index",
            "explicit terminal/superseded/non-language exclusion candidate",
            "seed dependency candidate",
            "later-level/experimental language candidate",
            "genuinely unresolved RED",
        ],
        caveat: "Classification routes sources to later operation-level closure work. It grants no source inclusion/exclusion, parser, conformance, or production credit.",
    },
    counts: {
        source_universe: universe.sources.length,
        seed_members: universe.sources.length - complement.length,
        complement_classified: entries.length,
        by_classification: countByClassification,
        unresolved_red: countByClassification.GENUINELY_UNRESOLVED_RED,
    },
    verification: {
        all_168_pinned_sources_hash_and_byte_verified: true,
        complement_bijection_exactly_once: entries.length === complement.length && classificationByDirectory.size === complement.length,
        hash_or_byte_failures: 0,
        canonical_order: "directory sorted by raw UTF-8 bytes",
    },
    unresolved_red: entries
        .filter((entry) => entry.classification === "GENUINELY_UNRESOLVED_RED")
        .map((entry) => ({ directory: entry.directory, exact_path: entry.exact_path, reason: entry.reason })),
    entries,
};
const contentDigest = sha256(Buffer.from(JSON.stringify(payload), "utf8"));
process.stdout.write(`${JSON.stringify({
    ...payload,
    content_digest_sha256: contentDigest,
    content_digest_method: "SHA-256 of compact UTF-8 JSON.stringify(payload) before these two digest fields are appended",
}, null, 2)}\n`);
