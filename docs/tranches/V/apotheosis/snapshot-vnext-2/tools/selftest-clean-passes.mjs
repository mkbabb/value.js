#!/usr/bin/env node
import {createHash} from "node:crypto";
import {canonicalize,parseJsonStrict} from "./json-contract.mjs";
import {cleanPassFixture,validateCleanPassManifest} from "./validate-clean-passes.mjs";
const hash=s=>createHash("sha256").update(s).digest("hex"),manifestHash=m=>(m=structuredClone(m),delete m.manifest_hash,hash(canonicalize(m)));
const mutateArtifact=(state,kind,mutate,encode)=>{const actor=state.manifest.passes[0].critic_a,path=actor[kind].path,old=state.files.get(path),value=parseJsonStrict(old.source);mutate(value);const source=encode?encode(canonicalize(value)):canonicalize(value),stored={path:old.path,bytes:Buffer.byteLength(source),sha256:hash(source),source};state.files.set(path,stored);actor[kind]={path,bytes:stored.bytes,sha256:stored.sha256}};
const a=(kind,mutate,encode)=>(state)=>mutateArtifact(state,kind,mutate,encode),epoch="node docs/tranches/V/vnext/tools/corpus-epoch.mjs",noop=()=>{};
const mutations=[
 s=>s.manifest.passes.pop(),a("report",v=>delete v.commands),a("report",v=>delete v.evidence),a("report",v=>delete v.owners),a("report",noop,v=>` ${v}`),a("report",noop,v=>`${v}\n`),
 s=>s.manifest.passes[0].critic_a.prompt_sha256="b".repeat(64),s=>{const x=s.manifest.passes[0].critic_a,p=s.files.get(x.prompt.path);p.source=p.source.replace("Audit formation","Claim formation");p.bytes=Buffer.byteLength(p.source);p.sha256=hash(p.source);x.prompt={path:x.prompt.path,bytes:p.bytes,sha256:p.sha256}},
 a("assignment",v=>v.served_model="gpt-5.6-terra"),a("report",v=>v.served_effort="high"),a("report",v=>v.coverage.reverse()),a("report",v=>v.role="critic_b"),
 a("report",v=>{v.findings=[{id:"F",locator:"docs/tranches/V/vnext/FORMATION-CLEAN-PASS-PROTOCOL.md:1",mechanism:"live defect",observation:"hostile probe exposed a live defect",owner:"root"}];v.owners=["root"]}),
 a("report",v=>v.orphan_demands=["live"]),a("report",v=>v.unsupported_claims=["live"]),s=>s.manifest.passes[0].adjudicator.input_report_sha256.reverse(),a("assignment",noop,v=>`\n${v}`),s=>s.manifest.passes[0].critic_a.report.bytes++,a("report",v=>v.commands[0].exit_code=1),s=>s.manifest.passes[1].predecessor_adjudication_sha256="b".repeat(64),a("assignment",v=>v.spawn_result_status="pending"),a("report",v=>v.verdict="NOT_CLEAN"),a("report",v=>v.coverage[0].command=epoch),a("report",v=>v.coverage[0].locator="checked"),a("report",v=>v.coverage[0].observation="checked"),a("report",v=>v.commands[1].exit_code=1),a("report",v=>v.coverage[1].command=v.coverage[0].command),a("report",v=>v.schema="vnext-clean-pass-report/1"),a("report",v=>v.extra=true),a("report",v=>delete v.commands[1].locator),a("report",v=>v.evidence[0].observation="different concrete observation")
];
const valid=cleanPassFixture(),baseline=validateCleanPassManifest(valid.manifest,valid);if(baseline.length)throw Error(`fixture: ${baseline.join(";")}`);
for(let i=0;i<mutations.length;i++){const state=cleanPassFixture();mutations[i](state);state.manifest.manifest_hash=manifestHash(state.manifest);let errors;try{errors=validateCleanPassManifest(state.manifest,state)}catch(error){throw Error(`mutation ${i+1} crashed: ${error.message}`)}if(!errors.length)throw Error(`mutation ${i+1} survived`)}
process.stdout.write(`${JSON.stringify({schema:"vnext-clean-pass-selftest/3",status:"complete",mutations:mutations.length})}\n`);
