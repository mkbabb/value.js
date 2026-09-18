#!/usr/bin/env node
import assert from "node:assert/strict";
import {execFileSync,spawnSync} from "node:child_process";
import {existsSync,mkdirSync,mkdtempSync,readFileSync,readdirSync,rmSync,writeFileSync} from "node:fs";
import {tmpdir} from "node:os";
import {dirname,join,relative,resolve} from "node:path";
import {fileURLToPath} from "node:url";

const root=dirname(dirname(fileURLToPath(import.meta.url))),repo=resolve(root,"../../../../../.."),prefix=relative(repo,root).replaceAll("\\","/"),moduleAuthority="docs/tranches/V/vnext/CSS-MODULE-ISOMORPHISM.json";
const walk=(dir)=>readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(join(dir,e.name)):[join(dir,e.name)]);
function structuralCheck(directory=root){
  const manifest=JSON.parse(readFileSync(join(directory,"package.json"))),lock=JSON.parse(readFileSync(join(directory,"package-lock.json"))),receipt=JSON.parse(readFileSync(join(directory,"proof/package-receipt.json"))),sources=walk(join(directory,"src")).map(p=>readFileSync(p,"utf8")).join("\n"),testFiles=walk(join(directory,"test")).filter(p=>p.endsWith(".test.ts")).sort(),tests=testFiles.reduce((n,p)=>n+(readFileSync(p,"utf8").match(/\btest\s*\(/g)?.length??0),0);
  assert.deepEqual(manifest.dependencies,{"@mkbabb/parse-that":"1.0.0"});assert.equal(lock.packages["node_modules/@mkbabb/parse-that"].version,"1.0.0");assert.equal(lock.packages["node_modules/@mkbabb/parse-that"].integrity,receipt.dist.integrity);assert.equal(lock.packages["node_modules/@mkbabb/parse-that"].resolved,receipt.dist.tarball);assert.equal(tests,17);assert.doesNotMatch(sources,/@mkbabb\/parse-that\//);assert.equal(existsSync(join(directory,"node_modules")),false);return {tests,testFiles};
}
function parseTapSummary(output,expected=17){
  const lines=output.replace(/\r\n?/g,"\n").split("\n"),plans=lines.flatMap(line=>{const match=/^1\.\.([0-9]+)$/.exec(line);return match?[Number(match[1])]:[]}),results=lines.flatMap(line=>{const match=/^ok ([1-9][0-9]*) - /.exec(line);return match?[Number(match[1])]:[]}),fact=(name)=>{const values=lines.flatMap(line=>{const match=new RegExp(`^# ${name} ([0-9]+)$`).exec(line);return match?[Number(match[1])]:[]});assert.equal(values.length,1,`TAP ${name} fact`);return values[0]};
  assert.deepEqual(plans,[expected],"TAP top-level plan");assert.deepEqual(results,Array.from({length:expected},(_,index)=>index+1),"TAP top-level results");assert.equal(fact("tests"),expected);assert.equal(fact("pass"),expected);for(const name of ["fail","cancelled","skipped","todo"])assert.equal(fact(name),0,`TAP ${name}`);return expected;
}
if(process.argv[2]==="--selftest"){const {tests}=structuralCheck(),wrong=`TAP version 13\n${Array.from({length:16},(_,index)=>`ok ${index+1} - hostile`).join("\n")}\n1..16\n# tests 16\n# pass 16\n# fail 0\n# cancelled 0\n# skipped 0\n# todo 0\n`;assert.throws(()=>parseTapSummary(wrong,17));process.stdout.write(`${JSON.stringify({schema:"c14-committed-reproduction-selftest/2",status:"PASS",registry_spec:"@mkbabb/parse-that@1.0.0",tests,hostile_wrong_count:1,node_modules_retained:false})}\n`);}
else{
  const commit=process.argv[2]??"HEAD";if(process.argv.length>3)throw Error("usage: reproduce-from-commit.mjs [--selftest|<commit>]");
  const resolved=execFileSync("git",["rev-parse","--verify",`${commit}^{commit}`],{cwd:repo,encoding:"utf8"}).trim(),files=execFileSync("git",["ls-tree","-r","--name-only",resolved,"--",prefix,moduleAuthority],{cwd:repo,encoding:"utf8"}).trim().split("\n").filter(Boolean);assert.ok(files.includes(`${prefix}/package-lock.json`),"commit does not contain C14 exact-lock prototype");assert.ok(files.includes(moduleAuthority),"commit does not contain C14 module authority");
  const temporary=mkdtempSync(join(tmpdir(),"c14-committed-reproduction-")),staging=join(temporary,"repo"),copy=join(staging,prefix);
  try{for(const path of files){const destination=join(staging,path);mkdirSync(dirname(destination),{recursive:true});writeFileSync(destination,execFileSync("git",["show",`${resolved}:${path}`],{cwd:repo,maxBuffer:64*1024*1024}));}const {tests,testFiles}=structuralCheck(copy),run=(command,args)=>{const result=spawnSync(command,args,{cwd:copy,encoding:"utf8",maxBuffer:64*1024*1024,env:{...process.env,NO_COLOR:"1",FORCE_COLOR:"0"}});if(result.status!==0)throw Error(`${command} ${args.join(" ")} failed: ${(result.stderr||result.stdout).trim()}`);return result.stdout};run("npm",["ci"]);run("npm",["run","check"]);const output=run(process.execPath,["--import","tsx","--test","--test-reporter=tap",...testFiles.map(path=>relative(copy,path))]);parseTapSummary(output,tests);run("npm",["run","proof"]);process.stdout.write(`${JSON.stringify({schema:"c14-committed-reproduction/2",status:"PASS",commit:resolved,registry_spec:"@mkbabb/parse-that@1.0.0",tests,checks:["npm ci","check","test:tap","package-receipt","module-isomorphism"],temporary_removed:true})}\n`);}finally{rmSync(temporary,{recursive:true,force:true});}
}
