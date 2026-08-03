#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const validatorPath = fileURLToPath(import.meta.url);
const here = dirname(validatorPath);
const graphPath = resolve(
  here,
  "../coordination/CONSTELLATION-MEGATRANCHE-DAG-2026-07-29.json",
);
const graphBytes = readFileSync(graphPath);
const graph = JSON.parse(graphBytes.toString("utf8"));
const evidenceFromFile = (path, subjectCoordinate) => ({
  path,
  sha256: createHash("sha256").update(readFileSync(path)).digest("hex"),
  subjectCoordinate,
});
const graphEvidence = evidenceFromFile(
  graphPath,
  "validator-selftest@current-graph",
);
const validatorEvidence = evidenceFromFile(
  validatorPath,
  "validator-selftest@current-validator",
);
const markdownEvidence = evidenceFromFile(
  resolve(
    here,
    "../coordination/CONSTELLATION-MEGATRANCHE-DAG-2026-07-29.md",
  ),
  "validator-selftest@current-dag-markdown",
);
const sha = /^[0-9a-f]{64}$/;
const exactCoverageBindings = {
  "V.form.P1": "1d6df52abdd89dcc2e56b0aaaca6cc7d4a516eb5e8493dd4547adeebd070dd85",
  "V.form.P2": "1d6df52abdd89dcc2e56b0aaaca6cc7d4a516eb5e8493dd4547adeebd070dd85",
  "V.form.P3": "1d6df52abdd89dcc2e56b0aaaca6cc7d4a516eb5e8493dd4547adeebd070dd85",
  "V.form.cleanA": "1d6df52abdd89dcc2e56b0aaaca6cc7d4a516eb5e8493dd4547adeebd070dd85",
  "V.form.cleanB": "1d6df52abdd89dcc2e56b0aaaca6cc7d4a516eb5e8493dd4547adeebd070dd85",
  "V.form.admission": "1d6df52abdd89dcc2e56b0aaaca6cc7d4a516eb5e8493dd4547adeebd070dd85",
  "K.form.P1": "8da4afca0f9a7940c2ed05bc92c2aece5c3e073a8b470f72bb9da65884966d52",
  "K.form.P2": "6e022cf731fb0683e6be46c64c91a8ed3d9f333b5f4dce429518990626ca4e24",
  "K.form.P3": "10cc59300a0ca97244a9f102cf954e5a05f8221d30edff07af30122ecad2fed6",
};
const exactCoverageAuthorityFiles = {
  "value-full-subject": {
    path: "/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/cross-repo/VALUE-FORMATION-ADMISSION-BINDING-2026-07-29.json",
    sha256: "a27d72a4aac639995f45959aa4086b423db04c5b633b45b1eccfa3140baa44ad",
    denominatorPath: "/Users/mkbabb/.codex/worktrees/7e28/value.js/docs/tranches/V/megatranche/formation/full-subject/FULL-FAMILY-DENOMINATOR-2026-07-29.json",
    denominatorSha256: "1d6df52abdd89dcc2e56b0aaaca6cc7d4a516eb5e8493dd4547adeebd070dd85",
    nodes: [
      "V.form.P1",
      "V.form.P2",
      "V.form.P3",
      "V.form.cleanA",
      "V.form.cleanB",
      "V.form.admission",
    ],
  },
  "keyframes-full-subject": {
    path: "/Users/mkbabb/.codex/worktrees/9167/keyframes.js/docs/tranches/W/prototypes/PASS-REPLAY-LEDGER.md",
    sha256: "9a050f476a5a99bb20c673d3ef056183e4859993ca954679f51cce9143bceada",
    nodes: ["K.form.P1", "K.form.P2", "K.form.P3"],
  },
};
const valueFormationBinding = JSON.parse(
  readFileSync(exactCoverageAuthorityFiles["value-full-subject"].path, "utf8"),
);
const exactRequiredSatisfiedInputs = {
  "V.form.cleanA": [
    "V.form.P3",
    "V.form.packet-post-CA01",
  ],
  "V.form.cleanB": [
    "V.form.cleanA",
  ],
  "V.form.admission": [
    "V.form.cleanB",
  ],
  "F.form.P3": [
    "F.form.P2",
    "F.proto.R2a-reseal-b-sol",
    "F.proto.inventory-a2-sol",
    "F.record.N-P3-sol",
  ],
  "X.constellation.cleanA": [
    "P.form.admission",
    "V.form.admission",
    "K.form.admission",
    "F.form.admission",
  ],
};

const requiredEdges = [
  ["P.form.P1", "P.form.P2"],
  ["P.form.P2", "P.form.P3"],
  ["P.form.P3", "P.form.prototype-proof-10x"],
  ["P.form.prototype-proof-10x", "P.form.cleanA"],
  ["P.form.cleanA", "P.form.cleanB"],
  ["P.form.cleanB", "P.form.admission"],
  ["P.exec.PB1-order-ack", "P.exec.private-freeze"],
  ["V.form.P1", "V.form.P2"],
  ["V.form.P2", "V.form.P3"],
  ["V.form.P3", "V.form.cleanA"],
  ["V.form.packet-post-CA01", "V.form.cleanA"],
  ["V.form.cleanA", "V.form.cleanB"],
  ["V.form.cleanB", "V.form.admission"],
  ["K.form.P1", "K.form.P2"],
  ["K.form.P2", "K.form.P3"],
  ["K.form.P3", "K.form.cleanA"],
  ["K.form.cleanA", "K.form.cleanB"],
  ["K.form.cleanB", "K.form.admission"],
  ["F.form.P1", "F.form.P2"],
  ["F.form.P2", "F.form.P3"],
  ["F.proto.inventory-a1-sol", "F.proto.inventory-a2-luna"],
  ["F.proto.inventory-a2-luna", "F.proto.inventory-a2-sol"],
  ["F.proto.inventory-a2-sol", "F.form.P3"],
  ["F.proto.R2a-reseal-sol", "F.proto.R2a-reseal-b-luna"],
  ["F.proto.R2a-reseal-b-luna", "F.proto.R2a-reseal-b-sol"],
  ["F.proto.R2a-reseal-b-sol", "F.form.P3"],
  ["F.form.P3", "F.form.cleanA"],
  ["F.form.cleanA", "F.form.cleanB"],
  ["F.form.cleanB", "F.form.admission"],
  ["V.L1.candidate", "V.L2.candidate"],
  ["V.L2.candidate", "V.L3.candidate"],
  ["V.L2.candidate", "V.L5.candidate"],
  ["V.L5.candidate", "V.L4.candidate"],
  ["V.F0", "V.L1"],
  ["V.L1", "V.L2"],
  ["V.L2", "V.L3"],
  ["V.L2", "V.L5"],
  ["V.L5", "V.L4"],
  ["V.L3", "V.L6"],
  ["V.L4", "V.L6"],
  ["V.A3", "V.U4"],
  ["V.U3", "V.H1"],
  ["V.L1.candidate", "K.W2"],
  ["V.L2.candidate", "K.W2"],
  ["V.L3.candidate", "K.W2"],
  ["V.L4.candidate", "K.W2"],
  ["V.L5.candidate", "K.W2"],
  ["F.W2.U4", "F.W1.U5"],
  ["F.W1.U5", "F.W1.close"],
  ["F.W11.U2", "F.W6"],
  ["K.W3", "K.W3.tier-pack"],
  ["K.W10", "K.W10.integrated-pack"],
  ["K.W10.integrated-pack", "K.W10.atlas-crater"],
  ["K.W10.atlas-crater", "K.W10.close"],
  ["P.exec.value-rebind", "P.exec.bbnf-receipt"],
  ["V.L6.css-path-abi-freeze", "P.exec.bbnf-receipt"],
  ["P.form.admission", "X.constellation.cleanA"],
  ["V.form.admission", "X.constellation.cleanA"],
  ["K.form.admission", "X.constellation.cleanA"],
  ["F.form.admission", "X.constellation.cleanA"],
  ["X.constellation.cleanA", "X.constellation.cleanB"],
  ["X.constellation.cleanB", "X.constellation.rehash"],
  ["X.constellation.rehash", "X.formation-close"],
];

const forbiddenEdges = [
  ["V.A3", "V.H1"],
  ["F.W11", "F.W6"],
  ["P.exec.consumer-proof", "P.form.prototype-proof-10x"],
  ["P.exec.PB1-order-ack", "P.exec.candidate-pack"],
  ["V.L5", "V.L6"],
  ["K.W3.tier-pack", "K.W10.demo-crater"],
  ["K.W3.tier-pack", "K.W10.glass-crater"],
  ["K.W3.tier-pack", "K.W10.atlas-crater"],
  ["K.W3.tier-pack", "K.W10.slides-crater"],
];

function validate(candidate) {
  const errors = [];
  const ids = new Set();
  const nodes = new Map();
  const requiredNodeFields = candidate.nodeContract?.required ?? [];
  const allowedStates = new Set(candidate.nodeContract?.states ?? []);
  const allowedDispositions = new Set(
    candidate.nodeContract?.terminalDispositions ?? [],
  );

  if (candidate.schemaVersion !== 2) errors.push("schemaVersion must be 2");
  if (candidate.mode !== "tranche-development-only") {
    errors.push("mode must remain tranche-development-only");
  }
  if (
    JSON.stringify(candidate.coverageBindings) !==
    JSON.stringify(exactCoverageBindings)
  ) {
    errors.push("coverage binding authority differs from the exact contract");
  }
  if (
    JSON.stringify(candidate.coverageAuthorityFiles) !==
    JSON.stringify(exactCoverageAuthorityFiles)
  ) {
    errors.push("coverage authority files differ from the exact contract");
  }
  for (const authority of Object.values(exactCoverageAuthorityFiles)) {
    try {
      const actual = createHash("sha256")
        .update(readFileSync(authority.path))
        .digest("hex");
      if (actual !== authority.sha256) {
        errors.push(`coverage authority bytes do not match ${authority.path}`);
      }
    } catch {
      errors.push(`coverage authority path is unreadable ${authority.path}`);
    }
  }
  const valueAuthority = candidate.coverageAuthorityFiles?.["value-full-subject"];
  if (
    JSON.stringify(valueFormationBinding.coveredNodes) !==
    JSON.stringify(valueAuthority?.nodes)
  ) {
    errors.push("Value coverage membership differs from its binding manifest");
  }
  if (
    valueFormationBinding.denominator?.path !== valueAuthority?.denominatorPath ||
    valueFormationBinding.denominator?.sha256 !==
      valueAuthority?.denominatorSha256 ||
    valueFormationBinding.denominator?.familyCount !== 18
  ) {
    errors.push("Value denominator authority differs from its binding manifest");
  }
  try {
    const denominatorBytes = readFileSync(valueAuthority.denominatorPath);
    const denominatorHash = createHash("sha256")
      .update(denominatorBytes)
      .digest("hex");
    const denominator = JSON.parse(denominatorBytes.toString("utf8"));
    if (
      denominatorHash !== valueAuthority.denominatorSha256 ||
      denominator.families?.length !== valueFormationBinding.denominator.familyCount
    ) {
      errors.push("Value denominator bytes or family count drifted");
    }
  } catch {
    errors.push("Value denominator authority is unreadable");
  }
  for (const node of candidate.nodes ?? []) {
    if (ids.has(node.id)) errors.push(`duplicate node ${node.id}`);
    ids.add(node.id);
    nodes.set(node.id, node);
    for (const field of requiredNodeFields) {
      if (!(field in node)) errors.push(`${node.id} misses ${field}`);
    }
    if (!allowedStates.has(node.state)) {
      errors.push(`${node.id} has invalid state ${node.state}`);
    }
    if (!allowedDispositions.has(node.terminalDisposition)) {
      errors.push(`${node.id} has invalid disposition`);
    }
    if (node.state === "satisfied") {
      if (!node.evidenceRefs?.length) {
        errors.push(`${node.id} is satisfied without evidence`);
      }
      for (const evidence of node.evidenceRefs ?? []) {
        if (!sha.test(evidence.sha256 ?? "")) {
          errors.push(`${node.id} has invalid evidence hash`);
        }
        if (
          typeof evidence.subjectCoordinate !== "string" ||
          !evidence.subjectCoordinate.trim()
        ) {
          errors.push(`${node.id} has no evidence subject coordinate`);
        }
        if (typeof evidence.path !== "string" || !evidence.path.startsWith("/")) {
          errors.push(`${node.id} has invalid evidence path`);
          continue;
        }
        try {
          const actual = createHash("sha256")
            .update(readFileSync(evidence.path))
            .digest("hex");
          if (actual !== evidence.sha256) {
            errors.push(`${node.id} evidence bytes do not match ${evidence.path}`);
          }
        } catch {
          errors.push(`${node.id} evidence path is unreadable ${evidence.path}`);
        }
      }
    }
    const boundCoverage = exactCoverageBindings[node.id];
    if (
      node.state === "satisfied" &&
      boundCoverage &&
      node.coverageManifestSha256 !== boundCoverage
    ) {
      errors.push(`${node.id} drifts from bound coverage manifest`);
    }
    if (node.artifact) {
      for (const field of candidate.artifactContract?.required ?? []) {
        if (!(field in node.artifact)) {
          errors.push(`${node.id} artifact misses ${field}`);
        }
      }
      if (node.state === "satisfied") {
        for (const field of candidate.artifactContract?.required ?? []) {
          if (node.artifact[field] === null || node.artifact[field] === "") {
            errors.push(`${node.id} satisfied artifact misses ${field}`);
          }
        }
      }
    }
    if (node.receipt) {
      for (const field of candidate.receiptContract?.required ?? []) {
        if (!(field in node.receipt)) {
          errors.push(`${node.id} receipt misses ${field}`);
        }
      }
      if (node.state === "satisfied") {
        for (const field of candidate.receiptContract?.required ?? []) {
          if (node.receipt[field] === null || node.receipt[field] === "") {
            errors.push(`${node.id} satisfied receipt misses ${field}`);
          }
        }
      }
    }
  }
  for (const [id, expected] of Object.entries(exactRequiredSatisfiedInputs)) {
    if (
      JSON.stringify(nodes.get(id)?.requiredSatisfiedInputs) !==
      JSON.stringify(expected)
    ) {
      errors.push(`${id} required satisfied input authority differs`);
    }
  }
  for (const id of ["V.form.cleanB", "V.form.admission"]) {
    const actual = nodes.get(id);
    const expected = valueFormationBinding.nodes?.[id];
    for (const field of [
      "evidenceRefs",
      "predecessorEvidenceSha256",
      "coverageManifestSha256",
      "requiredSatisfiedInputs",
      "credit",
    ]) {
      if (JSON.stringify(actual?.[field]) !== JSON.stringify(expected?.[field])) {
        errors.push(`${id} exact ${field} differs from binding manifest`);
      }
    }
  }
  const nonReplayTypes = new Set([
    "full-subject-pass",
    "fresh-clean-audit",
    "repository-admission",
    "final-evidence-rehash",
    "constellation-close",
  ]);
  const primaryEvidenceOwners = new Map();
  for (const node of candidate.nodes ?? []) {
    if (node.state !== "satisfied" || !nonReplayTypes.has(node.type)) continue;
    const primary = node.evidenceRefs?.[0]?.sha256;
    if (!primary) continue;
    const prior = primaryEvidenceOwners.get(primary);
    if (prior) {
      errors.push(`${node.id} reuses primary evidence from ${prior}`);
    } else {
      primaryEvidenceOwners.set(primary, node.id);
    }
  }

  const edgeKeys = new Set();
  const pairs = new Set();
  const outgoing = new Map([...ids].map((id) => [id, []]));
  const incoming = new Map([...ids].map((id) => [id, []]));
  for (const edge of candidate.edges ?? []) {
    if (!ids.has(edge.from) || !ids.has(edge.to)) {
      errors.push(`dangling edge ${edge.from} -> ${edge.to}`);
      continue;
    }
    const edgeKey = `${edge.from}->${edge.to}:${edge.type}`;
    if (edgeKeys.has(edgeKey)) errors.push(`duplicate edge ${edgeKey}`);
    edgeKeys.add(edgeKey);
    pairs.add(`${edge.from}->${edge.to}`);
    outgoing.get(edge.from).push(edge.to);
    incoming.get(edge.to).push(edge.from);
    const source = nodes.get(edge.from);
    const target = nodes.get(edge.to);
    if (
      ["rejected", "superseded"].includes(source.state) &&
      edge.type !== "non-satisfying-evidence"
    ) {
      errors.push(`${source.id} supplies positive edge ${edge.type}`);
    }
    if (
      source.phase === "execution" &&
      target.phase === "formation" &&
      target.id.includes(".form.")
    ) {
      errors.push(`execution feeds formation: ${edge.from} -> ${edge.to}`);
    }
  }

  for (const [from, to] of requiredEdges) {
    if (!pairs.has(`${from}->${to}`)) errors.push(`missing ${from} -> ${to}`);
  }
  for (const [from, to] of forbiddenEdges) {
    if (pairs.has(`${from}->${to}`)) errors.push(`forbidden ${from} -> ${to}`);
  }
  for (const target of candidate.nodes ?? []) {
    const requiredInputs = target.requiredSatisfiedInputs ?? [];
    if (!Array.isArray(requiredInputs)) {
      errors.push(`${target.id} requiredSatisfiedInputs must be an array`);
      continue;
    }
    if (new Set(requiredInputs).size !== requiredInputs.length) {
      errors.push(`${target.id} has duplicate required satisfied inputs`);
    }
    for (const sourceId of requiredInputs) {
      if (!nodes.has(sourceId)) {
        errors.push(`${target.id} requires missing input ${sourceId}`);
      } else if (!pairs.has(`${sourceId}->${target.id}`)) {
        errors.push(`${target.id} requires unconnected input ${sourceId}`);
      } else if (
        target.state === "satisfied" &&
        nodes.get(sourceId)?.state !== "satisfied"
      ) {
        errors.push(`${target.id} satisfied before required input ${sourceId}`);
      }
    }
  }
  for (const node of candidate.nodes ?? []) {
    if (
      node.state === "satisfied" &&
      node.type === "full-subject-pass" &&
      !exactCoverageBindings[node.id]
    ) {
      errors.push(`${node.id} has no exact coverage binding`);
    }
  }

  const formationAdmissions = [
    "P.form.admission",
    "V.form.admission",
    "K.form.admission",
    "F.form.admission",
  ];
  const cleanAInputs = new Set(incoming.get("X.constellation.cleanA") ?? []);
  if (
    formationAdmissions.some((id) => !cleanAInputs.has(id)) ||
    cleanAInputs.size !== formationAdmissions.length
  ) {
    errors.push("constellation Clean A has wrong repository inputs");
  }
  const rootInputs = incoming.get("X.formation-close") ?? [];
  if (
    rootInputs.length !== 1 ||
    rootInputs[0] !== "X.constellation.rehash"
  ) {
    errors.push("root close must receive only the final rehash");
  }

  const orderedTypes = new Set([
    "ordered-formation",
    "post-absorption",
    "prototype-admission",
    "repository-admission",
    "root-close",
  ]);
  for (const edge of candidate.edges ?? []) {
    if (!orderedTypes.has(edge.type)) continue;
    const source = nodes.get(edge.from);
    const target = nodes.get(edge.to);
    if (target?.state !== "satisfied") continue;
    if (source?.state !== "satisfied") {
      errors.push(`${target.id} satisfied before ${source.id}`);
      continue;
    }
    const predecessorOutput = source.evidenceRefs?.[0]?.sha256;
    if (!sha.test(source.coverageManifestSha256 ?? "")) {
      errors.push(`${source.id} lacks satisfied coverage hash`);
    }
    if (target.predecessorEvidenceSha256 !== predecessorOutput) {
      errors.push(`${target.id} does not bind ${source.id}`);
    }
    if (!sha.test(target.coverageManifestSha256 ?? "")) {
      errors.push(`${target.id} lacks coverage hash`);
    }
  }

  const visitState = new Map();
  const stack = [];
  function visit(id) {
    visitState.set(id, 1);
    stack.push(id);
    for (const next of outgoing.get(id) ?? []) {
      if (visitState.get(next) === 1) {
        errors.push(`cycle ${[...stack, next].join(" -> ")}`);
      } else if (!visitState.has(next)) {
        visit(next);
      }
    }
    stack.pop();
    visitState.set(id, 2);
  }
  for (const id of ids) if (!visitState.has(id)) visit(id);

  const w3 = nodes.get("K.W3.tier-pack")?.artifact?.tarballSha256;
  const w10 = nodes.get("K.W10.integrated-pack")?.artifact?.tarballSha256;
  if (w3 && w10 && w3 === w10) {
    errors.push("W3 and W10 reuse one pack identity");
  }

  const tuple = nodes.get("A.fourier-tuple");
  if (tuple?.state === "satisfied") {
    if (!sha.test(tuple.tupleManifestSha256 ?? "")) {
      errors.push("satisfied Fourier tuple misses manifest hash");
    }
    for (const memberId of tuple.memberArtifactIds ?? []) {
      if (nodes.get(memberId)?.state !== "satisfied") {
        errors.push(`Fourier tuple has unresolved member ${memberId}`);
      }
    }
  }

  const expectedReceipts = {
    "P.exec.value-css-receipt": ["value", "P.exec.candidate-pack", "parse-that"],
    "P.exec.json-receipt": [
      "parse-that-json-consumer",
      "P.exec.candidate-pack",
      "parse-that",
    ],
    "P.exec.value-rebind": ["value", "P.exec.release", "parse-that"],
    "P.exec.bbnf-receipt": ["bbnf", "P.exec.release", "parse-that"],
    "K.atlas-delta-receipt": [
      "keyframes",
      "K.W10.integrated-pack",
      "sci-atlas",
    ],
  };
  for (const [id, expected] of Object.entries(expectedReceipts)) {
    const receipt = nodes.get(id)?.receipt;
    const actual = [
      receipt?.issuerRepo,
      receipt?.subjectArtifactId,
      receipt?.recipientRepo,
    ];
    if (actual.some((value, index) => value !== expected[index])) {
      errors.push(`${id} has wrong issuer/subject/recipient`);
    }
  }

  if (JSON.stringify(candidate.nodes).includes("Value W3")) {
    errors.push("stale Value W3 prerequisite");
  }
  if ((candidate.wrongAnswerMutants ?? []).length !== 29) {
    errors.push("wrong-answer mutant inventory must contain 29 rows");
  }
  return errors;
}

const clone = () => structuredClone(graph);
const mutations = [];
function expectReject(id, mutate) {
  const candidate = clone();
  mutate(candidate);
  const errors = validate(candidate);
  if (!errors.length) throw new Error(`${id} was falsely accepted`);
  mutations.push({ id, rejected: true, firstError: errors[0] });
}
const node = (candidate, id) =>
  candidate.nodes.find((entry) => entry.id === id);
const removeEdge = (candidate, from, to) => {
  candidate.edges = candidate.edges.filter(
    (edge) => edge.from !== from || edge.to !== to,
  );
};

const baseErrors = validate(graph);
if (baseErrors.length) {
  console.error(JSON.stringify({ ok: false, baseErrors }, null, 2));
  process.exit(1);
}

expectReject("M01", (g) => {
  node(g, "V.form.admission").evidenceRefs = [];
});
expectReject("M02", (g) => {
  const p2 = node(g, "V.form.P2");
  p2.predecessorEvidenceSha256 = "d".repeat(64);
});
expectReject("M03", (g) => {
  const cleanA = node(g, "K.form.cleanA");
  const cleanB = node(g, "K.form.cleanB");
  cleanA.state = cleanB.state = "satisfied";
  cleanA.evidenceRefs = [graphEvidence];
  cleanB.evidenceRefs = [validatorEvidence];
  cleanA.predecessorEvidenceSha256 =
    node(g, "K.form.P3").evidenceRefs[0].sha256;
  cleanA.coverageManifestSha256 = "b".repeat(64);
  cleanB.coverageManifestSha256 = "c".repeat(64);
  cleanB.predecessorEvidenceSha256 = "d".repeat(64);
});
expectReject("M04", (g) => {
  g.edges.push({
    from: "P.exec.consumer-proof",
    to: "P.form.prototype-proof-10x",
    type: "prototype-admission",
  });
});
expectReject("M05", (g) => {
  g.edges.push({
    from: "P.exec.PB1-order-ack",
    to: "P.exec.candidate-pack",
    type: "exact-sha-consumption",
  });
});
expectReject("M06", (g) => {
  removeEdge(g, "V.L4.candidate", "K.W2");
});
expectReject("M07", (g) => {
  removeEdge(g, "F.W11.U2", "F.W6");
  g.edges.push({ from: "F.W11", to: "F.W6", type: "depends" });
});
expectReject("M08", (g) => {
  node(g, "K.W3.tier-pack").artifact.tarballSha256 = "a".repeat(64);
  node(g, "K.W10.integrated-pack").artifact.tarballSha256 = "a".repeat(64);
});
expectReject("M09", (g) => {
  const receipt = node(g, "P.exec.value-css-receipt").receipt;
  [receipt.issuerRepo, receipt.recipientRepo] = [
    receipt.recipientRepo,
    receipt.issuerRepo,
  ];
});
expectReject("M10", (g) => {
  node(g, "A.fourier-tuple").state = "satisfied";
  node(g, "A.fourier-tuple").evidenceRefs = [graphEvidence];
});
expectReject("M11", (g) => {
  node(g, "P.exec.bbnf-receipt").receipt.condition = "Value W3";
});
expectReject("M12", (g) => {
  removeEdge(g, "K.W10.atlas-crater", "K.W10.close");
});
expectReject("M13", (g) => {
  const root = node(g, "X.formation-close");
  root.state = "satisfied";
  root.evidenceRefs = [graphEvidence];
});
expectReject("M14", (g) => {
  g.edges.push({
    from: "V.form.prior-cleanB",
    to: "V.form.admission",
    type: "repository-admission",
  });
});
expectReject("M15", (g) => {
  const p1 = node(g, "F.form.P1");
  const p2 = node(g, "F.form.P2");
  const p3 = node(g, "F.form.P3");
  p1.state = p2.state = p3.state = "satisfied";
  p1.evidenceRefs = [graphEvidence];
  p1.coverageManifestSha256 = "b".repeat(64);
  p2.evidenceRefs = [validatorEvidence];
  p2.predecessorEvidenceSha256 = graphEvidence.sha256;
  p2.coverageManifestSha256 = "b".repeat(64);
  p3.evidenceRefs = [markdownEvidence];
  p3.predecessorEvidenceSha256 = validatorEvidence.sha256;
  p3.coverageManifestSha256 = "b".repeat(64);
});
expectReject("M16", (g) => {
  removeEdge(g, "V.L5.candidate", "V.L4.candidate");
  g.edges.push({ from: "V.L5", to: "V.L6", type: "depends" });
});
expectReject("M17", (g) => {
  node(g, "V.form.P2").coverageManifestSha256 = "f".repeat(64);
});
expectReject("M18", (g) => {
  node(g, "F.record.N-P3-sol").evidenceRefs[0].path =
    "/tmp/nonexistent-constellation-evidence";
});
expectReject("M19", (g) => {
  delete node(g, "F.form.P3").requiredSatisfiedInputs;
});
expectReject("M20", (g) => {
  const p1 = node(g, "V.form.P1");
  const p2 = node(g, "V.form.P2");
  p2.evidenceRefs = p1.evidenceRefs;
  p2.predecessorEvidenceSha256 = p1.evidenceRefs[0].sha256;
});
expectReject("M21", (g) => {
  delete g.coverageAuthorityFiles["value-full-subject"];
});
expectReject("M22", (g) => {
  node(g, "V.form.cleanB").predecessorEvidenceSha256 = "a".repeat(64);
});
expectReject("M23", (g) => {
  node(g, "V.form.admission").coverageManifestSha256 = "b".repeat(64);
});
expectReject("M24", (g) => {
  node(g, "V.form.cleanB").requiredSatisfiedInputs = [];
});
expectReject("M25", (g) => {
  node(g, "V.form.cleanB").evidenceRefs.pop();
});
expectReject("M26", (g) => {
  node(g, "V.form.admission").evidenceRefs = [
    node(g, "V.form.cleanB").evidenceRefs[2],
  ];
});
expectReject("M27", (g) => {
  node(g, "V.form.admission").credit.execution = true;
});
expectReject("M28", (g) => {
  node(g, "V.form.admission").predecessorEvidenceSha256 = "c".repeat(64);
});
expectReject("M29", (g) => {
  node(g, "V.form.admission").requiredSatisfiedInputs = [];
});

console.log(
  JSON.stringify(
    {
      ok: true,
      graphPath,
      nodes: graph.nodes.length,
      edges: graph.edges.length,
      mutants: mutations,
    },
    null,
    2,
  ),
);
