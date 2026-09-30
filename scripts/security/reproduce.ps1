param(
    [string]$Maven = 'mvn.cmd',
    [string]$Python = 'python',
    [string]$Repository = "$env:USERPROFILE/.m2/repository"
)
$ErrorActionPreference = 'Stop'
$projectRoot = (Resolve-Path "$PSScriptRoot/../..").Path
Set-Location $projectRoot
& $Maven -B -f build-reactor/pom.xml "-Dmaven.repo.local=$Repository" clean verify org.apache.maven.plugins:maven-dependency-plugin:3.8.1:tree '-DoutputFile=dependency-tree.txt'
if ($LASTEXITCODE -ne 0) { throw 'Build or tests failed' }
New-Item -ItemType Directory -Force target/security | Out-Null
node scripts/security/tree-inventory.mjs dependency-tree.txt target/security/resolved-artifacts.json
if ($LASTEXITCODE -ne 0) { throw 'Dependency inventory failed' }
& $Python scripts/security/jar-inventory.py JAR/widoco-1.4.26-jar-with-dependencies.jar target/security/jar.json --assert-clean
if ($LASTEXITCODE -ne 0) { throw 'Forbidden bytecode remains' }
& $Python scripts/security/audit-packaged-classes.py JAR/widoco-1.4.26-jar-with-dependencies.jar target/security/resolved-artifacts.json $Repository target/security/bytecode-provenance.json owl2vowl-core/target/owl2vowl-core-1.0.0-teamdigitale-5cdef094.jar
if ($LASTEXITCODE -ne 0) { throw 'Packaged bytecode provenance verification failed' }
node scripts/security/scan-osv.mjs target/security/resolved-artifacts.json target/security/resolved-osv.json --fail-on-vulnerability
if ($LASTEXITCODE -ne 0) { throw 'Resolved dependency vulnerability scan failed' }
node scripts/security/scan-osv.mjs target/security/jar-artifacts.json target/security/jar-osv.json --fail-on-vulnerability
if ($LASTEXITCODE -ne 0) { throw 'Packaged JAR vulnerability scan failed' }

# Convert the test's HTTP ontology identifier to a local import document path.
$importUri = ([Uri](Resolve-Path owl2vowl-core/target/imported.owl).Path).AbsoluteUri
$fixture = (Get-Content owl2vowl-core/target/main.owl -Raw).Replace('rdf:resource="https://example.org/imported"', ('rdf:resource="' + $importUri + '"'))
$fixture | Set-Content target/security/cli-input.owl -Encoding utf8
& "$env:JAVA_HOME/bin/java.exe" '-Djava.awt.headless=true' -jar JAR/widoco-1.4.26-jar-with-dependencies.jar -ontFile target/security/cli-input.owl -outFolder target/security/documentation -rewriteAll -webVowl -lang en -includeImportedOntologies
if ($LASTEXITCODE -ne 0 -or -not (Test-Path target/security/documentation/webvowl/data/ontology.json)) { throw 'CLI documentation generation failed' }
# Optional browser check: npm install playwright locally first; Edge is used.
$env:REQUIRE_OFFLINE = '1'
node scripts/security/browser-smoke.cjs target/security/documentation/webvowl target/security/documentation/webvowl/data/ontology.json target/security/browser
if ($LASTEXITCODE -ne 0) { throw 'Offline browser rendering failed' }
