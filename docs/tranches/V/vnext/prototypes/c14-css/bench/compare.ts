import { performance } from "node:perf_hooks";
import { createHash } from "node:crypto";
import { readFileSync, readdirSync } from "node:fs";
import { arch, platform, release } from "node:os";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { parseStylesheet } from "../src/css/api.js";

interface Adapter {
  parseStylesheet(source: string): unknown;
}

interface BenchResult {
  readonly status: "MEASURED" | "ABSENT" | "INVALID";
  readonly reason?: string;
  readonly median_ms?: number;
  readonly warmup_iterations?: number;
  readonly iterations_per_sample?: number;
  readonly sample_count?: number;
  readonly samples_ms?: readonly number[];
  readonly checksum?: number;
}

const corpus = [
  ".a { color: oklch(62.8% .257 29.23 / 85%); }",
  ".b:hover { animation-timing-function: cubic-bezier(.25, .1, .25, 1); }",
  ".c { color: oklch(80% .1 250); animation-timing-function: cubic-bezier(.4, 0, .2, 1); }",
] as const;
const expected = [
  "1322ef3c84d7c9b9ef2f0b26c019d72af761233703c826dc7b2e8fdf8eb8b714",
  "76f17ff2aa3889bc85a09abed42f14a4af5752fc8ecc8c7e39f7cee40e8d353b",
  "6ddcad53cd3a0f9cc07ab36e4a62742a936ae3f9314b52d5c87ad14a1d8a876d",
] as const;
const sha256 = (value: string | Buffer) => createHash("sha256").update(value).digest("hex");
const successful = (value: unknown): value is { readonly ok: true } =>
  typeof value === "object" && value !== null && (value as { ok?: unknown }).ok === true;

const root = dirname(dirname(fileURLToPath(import.meta.url)));
function sourceFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? sourceFiles(path) : [path];
  });
}
const subjectRows = [join(root, "package.json"), join(root, "package-lock.json"), ...sourceFiles(join(root, "src"))]
  .sort((left, right) => relative(root, left) < relative(root, right) ? -1 : 1)
  .map((path) => `${sha256(readFileSync(path))}\t${relative(root, path)}\n`)
  .join("");

async function loadAdapter(specifier: string | undefined): Promise<Adapter | null> {
  if (!specifier) return null;
  const candidate = await import(specifier) as Partial<Adapter>;
  return typeof candidate.parseStylesheet === "function" ? candidate as Adapter : null;
}

function measure(adapter: Adapter): BenchResult {
  for (const [index, source] of corpus.entries()) {
    const result = adapter.parseStylesheet(source);
    if (!successful(result) || sha256(JSON.stringify(result)) !== expected[index]) {
      return { status: "INVALID", reason: `semantic W0 mismatch at corpus case ${index}` };
    }
  }
  const warmupIterations = 250;
  for (let index = 0; index < warmupIterations; index += 1) {
    if (!successful(adapter.parseStylesheet(corpus[index % corpus.length]!))) {
      return { status: "INVALID", reason: "unsuccessful W0 warmup parse" };
    }
  }
  const samples: number[] = [];
  let checksum = 0;
  const iterationsPerSample = 1_000;
  for (let sample = 0; sample < 11; sample += 1) {
    const started = performance.now();
    for (let index = 0; index < iterationsPerSample; index += 1) {
      const result = adapter.parseStylesheet(corpus[index % corpus.length]!);
      if (!successful(result)) return { status: "INVALID", reason: "unsuccessful W0 measured parse" };
      checksum += 1;
    }
    samples.push(performance.now() - started);
  }
  const ordered = [...samples].sort((left, right) => left - right);
  return {
    status: "MEASURED",
    warmup_iterations: warmupIterations,
    iterations_per_sample: iterationsPerSample,
    sample_count: samples.length,
    samples_ms: samples,
    median_ms: ordered[5]!,
    checksum,
  };
}

async function optional(label: string, specifier: string | undefined): Promise<[string, BenchResult]> {
  if (!specifier) return [label, { status: "ABSENT", reason: `${label} adapter URL not supplied` }];
  try {
    const adapter = await loadAdapter(specifier);
    return adapter
      ? [label, measure(adapter)]
      : [label, { status: "INVALID", reason: "adapter does not export parseStylesheet(source)" }];
  } catch (error) {
    return [label, { status: "INVALID", reason: error instanceof Error ? error.message : String(error) }];
  }
}

const entries = await Promise.all([
  optional("current", process.env.C14_CURRENT_ADAPTER),
  optional("historical", process.env.C14_HISTORICAL_ADAPTER),
]);
const results = Object.fromEntries(entries);
results.c14 = measure({ parseStylesheet });
console.log(JSON.stringify({
  schema: "c14-isolated-benchmark/2",
  command: "npm run bench",
  runtime: {
    node: process.version,
    v8: process.versions.v8,
    os: platform(),
    os_release: release(),
    arch: arch(),
  },
  comparability: "current/historical only when explicitly supplied; ABSENT earns no credit",
  corpus: {
    cases: corpus.length,
    sha256: sha256(JSON.stringify(corpus)),
    expected_result_sha256: expected,
  },
  runner_sha256: sha256(readFileSync(fileURLToPath(import.meta.url))),
  subject_sha256: sha256(subjectRows),
  results,
}, null, 2));
