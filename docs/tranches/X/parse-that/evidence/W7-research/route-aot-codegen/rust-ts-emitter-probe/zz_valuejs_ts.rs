use bbnf::pipeline::{CompileOutput, CompileRequest, CompileTarget, PipelineOptions, compile_grammar_request};
#[test]
fn valuejs_ts() {
    let grammar = std::fs::read_to_string("../../valuejs.bbnf").unwrap();
    let request = CompileRequest { options: PipelineOptions::default(), target: CompileTarget::Ts };
    match compile_grammar_request(&grammar, &request) {
        Ok(CompileOutput::Ts(src)) => { std::fs::write("../../valuejs.generated.ts", &src).unwrap(); eprintln!("OK {} bytes", src.len()); }
        Ok(_) => panic!("non-TS output"),
        Err(e) => { std::fs::write("../../valuejs.error.txt", format!("{e:?}")).unwrap(); panic!("compile error: {e:?}"); }
    }
}
