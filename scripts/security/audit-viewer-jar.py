"""Check the actual packaged viewer and extract its bytes for browser tests."""
import hashlib
import json
import re
import sys
import zipfile
from pathlib import Path

jar, source, output, extracted = map(Path, sys.argv[1:5])
rows = []
with zipfile.ZipFile(jar) as archive:
    prefix = 'webvowl_1.1.7_patched/'
    for name in archive.namelist():
        if name.startswith(prefix) and not name.endswith('/'):
            relative = name[len(prefix):]
            target = extracted / relative
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_bytes(archive.read(name))
    for name in ['index.html','js/d3.min.js','js/webvowl.js','js/webvowl.app.js','js/webvowl.init.js']:
        data = archive.read(prefix + name)
        original = (source / name).read_bytes()
        assert data == original, f'Packaged viewer differs from source: {name}'
        rows.append({'name':name,'bytes':len(data),'sha256':hashlib.sha256(data).hexdigest(),'matchesSource':True})
core = (extracted / 'js/webvowl.js').read_text(encoding='utf-8')
app = (extracted / 'js/webvowl.app.js').read_text(encoding='utf-8')
for marker in ['zipObjectDeep','function baseSet(', 'function baseUnset(', 'Lodash (Custom Build)', "VERSION = '4.17.15'"]:
    assert marker not in core + app, f'Obsolete library code remains: {marker}'
assert not re.search(r'__webpack_require__\((?:8[4-9]|9\d|[12]\d\d|30\d|31[0-4])\)', core)
assert not re.search(r'innerHTML\s*=\s*(?:msg|croppedText|generalMetaObj\.)', app)
assert 'safeExternalUrl' in app
index = (extracted / 'index.html').read_text(encoding='utf-8')
assert 'Content-Security-Policy' in index and "script-src 'self'" in index
assert not re.search(r'<script\s*>', index)
result = {'jarSha256':hashlib.sha256(jar.read_bytes()).hexdigest(),'files':rows,
          'obsoleteLodashCodeAbsent':True,'knownUnsafeSinksAbsent':True,'externalInitializer':True,'scriptCspPresent':True}
output.parent.mkdir(parents=True,exist_ok=True)
output.write_text(json.dumps(result,indent=2),encoding='utf-8')
print('Packaged viewer matches source; obsolete Lodash code and known unsafe sinks absent.')
