import json,sys; d=json.load(open(sys.argv[1]))
for site,L in d.items():
  for cn,C in L['cells'].items():
    print(site,cn,C['bundle'],C['error'])
    for i,rep in enumerate(C['reps']):
      for ph,v in rep.items():
        if 'error' in v: print(' ',i+1,ph,'ERR',v['error'][:150]); continue
        print(f"  r{i+1} {ph:11} fr={v['frames']} mf={v['morphFrames']} maxDt={v['maxDt']} p50={v['p50Dt']} >20={v['framesOver20ms']} W={v['paintW']['start']}->{v['paintW']['end']} [{v['paintW']['min']},{v['paintW']['max']}] H={v['block']} step={v['maxWidthStepPx']}@{v['maxWidthStepAtMs']} fracD={v['widthStepFracOfDelta']} fracR={v['widthStepFracOfRange']} rAfter={v['radiusChangesAfterSettle']} jump={v['settleRadiusJumpPx']} NU={v['nonUniformFrames']}(c{v['nonUniformCornerFrames']}/e{v['ellipticalFrames']}/m{v['nonUniformDuringMorph']}) sx=[{v['scale']['sxMin']},{v['scale']['sxMax']}] rest={v['restRadius']['end']}")
