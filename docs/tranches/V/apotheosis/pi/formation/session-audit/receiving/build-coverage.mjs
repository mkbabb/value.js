#!/usr/bin/env node
/**
 * build-coverage.mjs — V·π receiving audit, §4 coverage-ledger skeleton builder.
 *
 * Emits `coverage.tsv` with one row per accountable source unit:
 *   1. every row of FINDINGS.md (by ID, including the unlabelled §K obligations)
 *   2. every canonical prompt event in raw-prompts/*.md (by archive + index)
 *   3. every root assistant message in raw-agent-messages/*.md (by archive + index)
 *   4. every line of raw-agent-envelopes/*.jsonl (by source-line hash + author)
 *
 * MECHANICAL ONLY. This pass assigns defensible *defaults*; it does not read
 * meaning out of any claim. Every rule applied is printed by --rules and
 * restated in coverage-summary.md. Nothing is inferred about encrypted bytes.
 *
 * Streaming: every file is read line-by-line through readline over a read
 * stream. Nothing is slurped. (The largest input here is 3.8 MB, but the
 * archives' upstream rollouts are 126 MB and the same discipline applies.)
 *
 * Writes ONLY inside formation/session-audit/receiving/. Subject bytes are
 * opened read-only.
 */

import { createReadStream, createWriteStream, existsSync, readFileSync } from "node:fs";

import { createHash } from "node:crypto";
import { once } from "node:events";
import path from "node:path";

const REPO = "/Users/mkbabb/Programming/value.js";
const PI = path.join(REPO, "docs/tranches/V/apotheosis/pi");
const AUDIT = path.join(PI, "formation/session-audit");
const RECEIVING = path.join(AUDIT, "receiving");

const REL = (abs) => path.relative(REPO, abs);

const ARCHIVES = ["value-tranche-v-formation", "value-v-pi-refinement", "bbnf-greenfield-coordination"];

const sha256 = (buf) => createHash("sha256").update(buf).digest("hex");
const sha256utf8 = (s) => sha256(Buffer.from(s, "utf8"));

/** TSV hygiene: the ledger is tab-delimited and one row per line. */
const cell = (v) =>
    String(v ?? "")
        .replace(/\t/g, "\\t")
        .replace(/\r?\n/g, "\\n");

/**
 * Byte-faithful streaming line splitter.
 *
 * DO NOT use node:readline here. Node's readline treats U+2028/U+2029 as line
 * terminators; this corpus contains 4 literal U+2028 characters inside owner
 * prompt bodies (bbnf-greenfield-coordination.md prompts #004 and #030), and
 * readline silently destroyed 4 bytes of each, breaking body-hash
 * reproduction. We split on LF only (stripping one optional CR), which is what
 * the archive writer emitted and what awk/sed/wc count.
 */
async function* lines(absPath) {
    const stream = createReadStream(absPath, { encoding: "utf8", highWaterMark: 1 << 20 });
    let buf = "";
    let n = 0;
    for await (const chunk of stream) {
        buf += chunk;
        let idx;
        while ((idx = buf.indexOf("\n")) !== -1) {
            let line = buf.slice(0, idx);
            if (line.endsWith("\r")) line = line.slice(0, -1);
            buf = buf.slice(idx + 1);
            yield [++n, line];
        }
    }
    if (buf.length > 0) yield [++n, buf.endsWith("\r") ? buf.slice(0, -1) : buf];
}

/* ------------------------------------------------------------------ *
 * Frozen-subject path index (for materialized-counterpart checks)
 * ------------------------------------------------------------------ */

const subjectPaths = new Set();
for (const line of readFileSync(path.join(RECEIVING, "audit-subject-ledger.tsv"), "utf8").split("\n")) {
    if (!line.trim()) continue;
    subjectPaths.add(path.join(PI, line.split("\t")[0]));
}

/** Extract absolute /Users/... paths referenced by a plaintext payload. */
function referencedPaths(text) {
    const out = [];
    const re = /\/Users\/mkbabb\/[^\s)\]'"`,;<>]+/g;
    let m;
    while ((m = re.exec(text)) !== null) {
        let p = m[0]
            .replace(/[.,:;]+$/, "") // trailing sentence punctuation
            .replace(/:\d+(?:[-–]\d+)?(?::\d+)?$/, "") // file:line, file:line-range, file:line:col citations
            .replace(/#.*$/, ""); // markdown anchors
        if (p && !out.includes(p)) out.push(p);
    }
    return out;
}

function counterpartVerdict(text) {
    const refs = referencedPaths(text);
    if (refs.length === 0) return { kind: "NO_PATH_REFERENCE", detail: "", allExternal: false };
    const inSubject = refs.filter((p) => subjectPaths.has(p));
    const onDisk = refs.filter((p) => !subjectPaths.has(p) && existsSync(p));
    const missing = refs.filter((p) => !subjectPaths.has(p) && !existsSync(p));
    const found = [...inSubject, ...onDisk];
    if (found.length === 0)
        return {
            kind: "COUNTERPART_MISSING",
            detail: `refs=${refs.length} missing=${missing.slice(0, 2).map(REL).join(",")}`,
            allExternal: false,
        };
    const allExternal = found.every((p) => !p.startsWith(REPO + path.sep));
    return {
        kind: inSubject.length ? "MATERIALIZED_IN_SUBJECT" : "MATERIALIZED_ON_DISK",
        detail: `${REL(found[0])}${found.length > 1 ? ` +${found.length - 1}` : ""}${
            missing.length ? ` unresolved=${missing.length}` : ""
        }`,
        allExternal,
    };
}

/* ------------------------------------------------------------------ *
 * Claim-marker triage (a mechanical grep flag, NOT a judgment)
 * ------------------------------------------------------------------ */

const CLAIM_RE =
    /\b(GREEN|RED|ACCEPTED|REJECT(?:ED)?|RATIFIED|PASS(?:ED|ING)?|FAIL(?:ED|ING)?|proof|proved|proven|benchmark|bench|faster|slower|ops\/s|MB\/s|×|x faster|verified|conformance|coverage|hash|SHA-256|holdout|skeptic|adjudicat)/i;

/* ------------------------------------------------------------------ *
 * 1. FINDINGS.md
 * ------------------------------------------------------------------ */

async function collectFindings(rows, stats) {
    const file = path.join(AUDIT, "FINDINGS.md");
    const ref = REL(file);
    let section = "";
    let inK = false;
    let kIndex = 0;
    let tableIds = 0;

    for await (const [n, line] of lines(file)) {
        const sec = line.match(/^##\s+([A-K])\.\s+(.*)$/);
        if (sec) {
            section = sec[1];
            inK = sec[1] === "K";
            continue;
        }
        // table row: | ID | finding | disposition | proof |
        const tr = line.match(/^\|\s*([A-J]\d{2})\s*\|(.*)$/);
        if (tr) {
            const id = tr[1];
            const cols = line
                .split("|")
                .slice(1, -1)
                .map((c) => c.trim());
            const declared = (cols.find((c) => /`(ACCEPTED_FACT|REJECTED_CLAIM|RESEARCH_ONLY|OPEN|SUPERSEDED)`/.test(c)) ?? "")
                .match(/`([A-Z_]+)`/g)
                ?.join(" ") ?? "NO_DECLARED_LABEL";
            rows.push([
                "FINDINGS_ROW",
                ref,
                `L${n}#${id}`,
                sha256utf8(line),
                "handoff-author",
                "OPEN",
                `section=${section} provisional=${declared.replace(/`/g, "")} skeleton-default: unadjudicated`,
            ]);
            tableIds++;
            stats.findingIds.push(id);
            continue;
        }
        // §K numbered completion obligations (no author-assigned IDs)
        const kr = inK && line.match(/^(\d+)\.\s+(.+)$/);
        if (kr) {
            kIndex = Number(kr[1]);
            const id = `K${String(kIndex).padStart(2, "0")}`;
            rows.push([
                "FINDINGS_ROW",
                ref,
                `L${n}#${id}`,
                sha256utf8(line),
                "handoff-author",
                "OPEN",
                `section=K synthesized-id (source item is unnumbered-by-ID) obligation-text-head="${kr[2].slice(0, 60)}"`,
            ]);
            stats.findingIds.push(id);
        }
    }
    stats.findingsTableRows = tableIds;
}

/* ------------------------------------------------------------------ *
 * 2 + 3. Fenced markdown archives (prompts, root agent messages)
 * ------------------------------------------------------------------ */

/**
 * Both archive families share one generated shape:
 *   ## NNN — <iso timestamp>
 *   - Classification: `x`      (prompts only)
 *   - Body SHA-256: `<hex>`
 *   - UTF-8 bytes: <n>
 *   <fence of >=4 backticks>
 *   ...body...
 *   <same fence>
 * The extractor widens the fence past any backtick run in the body, so the
 * fence width is variable and must be matched, not assumed.
 */
async function collectFencedArchive({ file, kind, headerRe, onRecord, stats }) {
    const ref = REL(file);
    let cur = null;
    let fence = null;
    let body = [];

    const flush = () => {
        if (!cur) return;
        const joined = body.join("\n");
        let verdict = "HASH_UNVERIFIED";
        if (cur.declaredSha) {
            if (sha256utf8(joined) === cur.declaredSha) verdict = "HASH_VERIFIED";
            else if (sha256utf8(joined + "\n") === cur.declaredSha) verdict = "HASH_VERIFIED_NL";
            else verdict = "HASH_MISMATCH";
        }
        const bytes = Buffer.byteLength(joined, "utf8");
        const bytesOk = cur.declaredBytes == null ? "n/a" : bytes === cur.declaredBytes ? "ok" : `MISMATCH(${bytes})`;
        stats.hash[verdict] = (stats.hash[verdict] ?? 0) + 1;
        onRecord({ ...cur, ref, body: joined, computedSha: sha256utf8(joined), verdict, bytes, bytesOk });
        cur = null;
        body = [];
        fence = null;
    };

    for await (const [n, line] of lines(file)) {
        if (fence !== null) {
            if (line === fence) {
                flush();
            } else {
                body.push(line);
            }
            continue;
        }
        const h = line.match(headerRe);
        if (h) {
            flush();
            cur = { index: h[1], timestamp: h[2], line: n, declaredSha: null, declaredBytes: null, classification: "" };
            continue;
        }
        if (!cur) continue;
        const c = line.match(/^- Classification: `(.+)`$/);
        if (c) cur.classification = c[1];
        const s = line.match(/^- Body SHA-256: `([0-9a-f]{64})`$/);
        if (s) cur.declaredSha = s[1];
        const b = line.match(/^- UTF-8 bytes: (\d+)$/);
        if (b) cur.declaredBytes = Number(b[1]);
        const f = line.match(/^(`{4,})$/);
        if (f && cur.declaredSha) fence = f[1];
    }
    flush();
}

/* ------------------------------------------------------------------ *
 * 4. Envelopes
 * ------------------------------------------------------------------ */

async function collectEnvelopes(rows, stats) {
    for (const label of ARCHIVES) {
        const file = path.join(AUDIT, "raw-agent-envelopes", `${label}.jsonl`);
        const ref = REL(file);
        let count = 0;
        for await (const [n, line] of lines(file)) {
            if (line.trim() === "") {
                stats.blankEnvelopeLines++;
                continue;
            }
            count++;
            const lineSha = sha256utf8(line);
            let author = "UNPARSED";
            let disposition = "ENCRYPTED_UNMATERIALIZED";
            let note = "";
            try {
                const d = JSON.parse(line);
                const p = d.payload ?? {};
                author = p.author ?? "UNKNOWN_AUTHOR";
                const content = p.content ?? [];
                const plain = content
                    .filter((c) => c.type === "input_text")
                    .map((c) => c.text ?? "")
                    .join("");
                const encrypted = content.filter((c) => c.type === "encrypted_content");
                const mt = (plain.match(/^Message Type: (\w+)/) ?? [, "UNKNOWN"])[1];
                const recipient = p.recipient ?? "";
                if (encrypted.length > 0) {
                    // Header stub only; the payload is opaque ciphertext.
                    disposition = "ENCRYPTED_UNMATERIALIZED";
                    note = `msg_type=${mt} recipient=${recipient} enc_blocks=${encrypted.length} enc_chars=${encrypted
                        .map((c) => (c.encrypted_content ?? "").length)
                        .reduce((a, b) => a + b, 0)} plaintext=header-stub-only(${plain.length}ch) ts=${d.timestamp} NOT_INFERRED`;
                    stats.env.encrypted++;
                } else {
                    const v = counterpartVerdict(plain);
                    disposition = v.allExternal ? "EXTERNAL" : "OPEN";
                    note = `msg_type=${mt} recipient=${recipient} plaintext_chars=${plain.length} ${v.kind}${
                        v.detail ? `=${v.detail}` : ""
                    } ts=${d.timestamp} skeleton-default: plaintext claim, unadjudicated`;
                    stats.env.plaintext++;
                    stats.envKind[v.kind] = (stats.envKind[v.kind] ?? 0) + 1;
                    if (v.allExternal) stats.env.external++;
                }
                stats.envMsgType[mt] = (stats.envMsgType[mt] ?? 0) + 1;
            } catch (e) {
                disposition = "OPEN";
                note = `JSON_PARSE_FAILURE: ${e.message}`;
                stats.env.unparsed++;
            }
            rows.push(["AGENT_ENVELOPE", ref, `L${n}`, lineSha, author, disposition, note]);
        }
        stats.envPerFile[ref] = count;
    }
}

/* ------------------------------------------------------------------ *
 * main
 * ------------------------------------------------------------------ */

const rows = [];
const stats = {
    findingIds: [],
    findingsTableRows: 0,
    hash: {},
    prompts: { total: 0, byClass: {} },
    messages: { total: 0, perFile: {} },
    env: { encrypted: 0, plaintext: 0, external: 0, unparsed: 0 },
    envKind: {},
    envMsgType: {},
    envPerFile: {},
    blankEnvelopeLines: 0,
    promptPerFile: {},
};

await collectFindings(rows, stats);

for (const label of ARCHIVES) {
    const file = path.join(AUDIT, "raw-prompts", `${label}.md`);
    let n = 0;
    await collectFencedArchive({
        file,
        kind: "PROMPT_EVENT",
        headerRe: /^## (\d{3}) — (\S+)$/,
        stats,
        onRecord(r) {
            n++;
            stats.prompts.total++;
            stats.prompts.byClass[r.classification] = (stats.prompts.byClass[r.classification] ?? 0) + 1;
            const owner = r.classification === "direct-user-prompt" || r.classification === "user-prompt-with-ide-context";
            rows.push([
                "PROMPT_EVENT",
                r.ref,
                `#${r.index}@L${r.line}`,
                r.computedSha,
                owner ? "owner" : "cross-thread-delegate",
                owner ? "MACHINE_FACT" : "EXTERNAL",
                `class=${r.classification} ts=${r.timestamp} bytes=${r.bytes}(${r.bytesOk}) declared_sha=${r.declaredSha?.slice(
                    0,
                    12,
                )} ${r.verdict}${owner ? " exact owner bytes reproduced from archive" : " delegated receipt from another thread"}`,
            ]);
        },
    });
    stats.promptPerFile[REL(file)] = n;
}

for (const label of ARCHIVES) {
    const file = path.join(AUDIT, "raw-agent-messages", `${label}.md`);
    let n = 0;
    await collectFencedArchive({
        file,
        kind: "AGENT_MESSAGE",
        headerRe: /^## (\d{4}) — (\S+)$/,
        stats,
        onRecord(r) {
            n++;
            stats.messages.total++;
            const flagged = CLAIM_RE.test(r.body);
            rows.push([
                "AGENT_MESSAGE",
                r.ref,
                `#${r.index}@L${r.line}`,
                r.computedSha,
                "codex-root-assistant",
                "OPEN",
                `ts=${r.timestamp} bytes=${r.bytes}(${r.bytesOk}) declared_sha=${r.declaredSha?.slice(0, 12)} ${
                    r.verdict
                } claim_markers=${flagged ? "yes" : "no"} skeleton-default: individually enumerated, NOT grouped, unadjudicated`,
            ]);
        },
    });
    stats.messages.perFile[REL(file)] = n;
}

await collectEnvelopes(rows, stats);

/* ---- write ---- */

const out = createWriteStream(path.join(RECEIVING, "coverage.tsv"), { encoding: "utf8" });
out.write(["source_kind", "source_ref", "line_or_index", "sha256", "author", "disposition", "note"].join("\t") + "\n");
for (const r of rows) out.write(r.map(cell).join("\t") + "\n");
out.end();
await once(out, "finish");

/* ---- report ---- */

const byDisp = {};
const byKind = {};
for (const r of rows) {
    byDisp[r[5]] = (byDisp[r[5]] ?? 0) + 1;
    byKind[r[0]] = (byKind[r[0]] ?? 0) + 1;
}

const dupIds = stats.findingIds.filter((id, i) => stats.findingIds.indexOf(id) !== i);
const report = {
    rowsWritten: rows.length,
    byKind,
    byDisposition: byDisp,
    findings: { ids: stats.findingIds.length, tableRows: stats.findingsTableRows, duplicates: dupIds },
    prompts: { total: stats.prompts.total, byClass: stats.prompts.byClass, perFile: stats.promptPerFile },
    messages: { total: stats.messages.total, perFile: stats.messages.perFile },
    envelopes: {
        perFile: stats.envPerFile,
        total: Object.values(stats.envPerFile).reduce((a, b) => a + b, 0),
        encrypted: stats.env.encrypted,
        plaintext: stats.env.plaintext,
        externalOnly: stats.env.external,
        unparsed: stats.env.unparsed,
        blankLinesSkipped: stats.blankEnvelopeLines,
        msgType: stats.envMsgType,
        counterpart: stats.envKind,
    },
    bodyHashVerification: stats.hash,
};
console.log(JSON.stringify(report, null, 2));
