import json, sys

def extract(path, out):
    with open(path) as f, open(out, 'w') as o:
        for i, line in enumerate(f):
            try:
                d = json.loads(line)
            except Exception:
                continue
            if d.get('type') != 'user':
                continue
            if d.get('isMeta'):
                continue
            msg = d.get('message', {})
            content = msg.get('content')
            texts = []
            if isinstance(content, str):
                texts.append(content)
            elif isinstance(content, list):
                for c in content:
                    if isinstance(c, dict) and c.get('type') == 'text':
                        texts.append(c.get('text',''))
            if not texts:
                continue
            t = '\n'.join(texts)
            # skip tool results / system-injected
            if t.startswith('<local-command') or t.startswith('<command-name') or t.startswith('Caveat:'):
                continue
            ts = d.get('timestamp','?')
            o.write(f"\n===== MSG line={i} ts={ts} =====\n{t}\n")

extract(sys.argv[1], sys.argv[2])
