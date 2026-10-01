"""Hash and extract all actual packaged JavaScript, not just the WebVOWL viewer."""
import hashlib
import json
import sys
import zipfile
from pathlib import Path

jar, source, output, extracted = map(Path,sys.argv[1:5])
rows=[]
with zipfile.ZipFile(jar) as archive:
    for name in archive.namelist():
        if not name.endswith('.js'):
            continue
        data=archive.read(name)
        original=source/name
        assert original.is_file(), f'Unidentified JavaScript in JAR: {name}'
        assert data==original.read_bytes(), f'Packaged JavaScript differs from source: {name}'
        target=(extracted/name).resolve()
        assert extracted.resolve() in target.parents, 'Unsafe archive path'
        target.parent.mkdir(parents=True,exist_ok=True)
        target.write_bytes(data)
        rows.append({'name':name,'bytes':len(data),'sha256':hashlib.sha256(data).hexdigest(),'matchesSource':True})
output.parent.mkdir(parents=True,exist_ok=True)
output.write_text(json.dumps({'jarSha256':hashlib.sha256(jar.read_bytes()).hexdigest(),'javascript':rows},indent=2),encoding='utf-8')
print(f'{len(rows)} packaged JavaScript files identified and matched to source.')
