"""Compare packaged bytecode against resolved dependency artifacts (not only metadata)."""
import hashlib
import json
import sys
import zipfile
from pathlib import Path

jar, inventory, repository, output = map(Path, sys.argv[1:5])
reactor_core = Path(sys.argv[5]) if len(sys.argv) > 5 else None
with zipfile.ZipFile(jar) as archive:
    packaged = {n:hashlib.sha256(archive.read(n)).hexdigest() for n in archive.namelist()
                if n.endswith('.class') and not n.startswith('META-INF/versions/') and not n.endswith('module-info.class')}
origins = {}
missing_artifacts = []
for dep in json.loads(inventory.read_text(encoding='utf-8-sig')):
    if dep.get('scope') not in ('compile','runtime'):
        continue
    artifact = repository.joinpath(*dep['group'].split('.'), dep['artifact'], dep['version'], f"{dep['artifact']}-{dep['version']}.jar")
    if reactor_core and dep['artifact'] == 'owl2vowl-core' and dep['group'] == 'it.gov.innovazione':
        artifact = reactor_core
    if not artifact.exists():
        missing_artifacts.append(f"{dep['group']}:{dep['artifact']}:{dep['version']}")
        continue
    with zipfile.ZipFile(artifact) as archive:
        for name in archive.namelist():
            if name in packaged:
                origins.setdefault(name, set()).add(hashlib.sha256(archive.read(name)).hexdigest())
mismatches = [name for name, hashes in origins.items() if packaged[name] not in hashes]
unattributed = [n for n in packaged if n not in origins and not n.startswith(('diagram/', 'widoco/', 'lode/', 'oops/', 'diff/', 'licensius/'))]
result = {'jar':jar.name, 'checkedClasses':len(origins), 'mismatches':mismatches,
          'missingArtifacts':missing_artifacts, 'unattributedClasses':unattributed}
output.write_text(json.dumps(result,indent=2),encoding='utf-8')
print(json.dumps(result))
if mismatches or missing_artifacts or unattributed:
    raise SystemExit('Packaged bytecode provenance verification failed')
