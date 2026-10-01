param(
    [string]$Python = 'python',
    [string]$Jar = 'JAR/widoco-1.4.26-jar-with-dependencies.jar',
    [string]$Output = 'target/security/viewer'
)
$ErrorActionPreference = 'Stop'
function Run-ViewerCheck([string]$Executable, [string[]]$Arguments) {
    & $Executable @Arguments
    if ($LASTEXITCODE -ne 0) { throw "Viewer check failed: $Executable" }
}
New-Item -ItemType Directory -Force -Path "$Output/classes" | Out-Null
$Output = (Resolve-Path -LiteralPath $Output).Path
$Jar = (Resolve-Path -LiteralPath $Jar).Path
Run-ViewerCheck $Python @('scripts/security/audit-viewer-jar.py',$Jar,'src/main/resources/webvowl_1.1.7_patched',"$Output/jar-viewer.json","$Output/assets")
Run-ViewerCheck javac @('--release','11','-cp',$Jar,'-d',"$Output/classes",'scripts/security/ConverterMetadataProbe.java','scripts/security/DocumentationMetadataProbe.java')
Run-ViewerCheck java @('-cp',("$Output/classes"+[IO.Path]::PathSeparator+$Jar),'ConverterMetadataProbe','it.gov.innovazione.owl2vowl.Owl2Vowl',"$Output/canary.json")
foreach ($fixture in @('doc/security/owl2vowl/evidence/ontology.json',"$Output/canary.json")) {
    $name = if ($fixture.EndsWith('canary.json')) {'roundtrip'} else {'clean'}
    Run-ViewerCheck node @('scripts/security/browser-audit.cjs',"$Output/assets",$fixture,"$Output/$name-csp.json",'--assert-safe')
    Run-ViewerCheck node @('scripts/security/browser-audit.cjs',"$Output/assets",$fixture,"$Output/$name-no-csp.json",'--assert-safe','--disable-csp')
}
Run-ViewerCheck node @('scripts/security/browser-native-regression.cjs',"$Output/assets",'doc/security/owl2vowl/evidence/ontology.json',"$Output/native-regression.json")
Run-ViewerCheck java @('-cp',("$Output/classes"+[IO.Path]::PathSeparator+$Jar),'DocumentationMetadataProbe',"$Output/metadata.html")
Run-ViewerCheck node @('scripts/security/browser-metadata-security.cjs',"$Output/metadata.html","$Output/metadata-browser.json",'--assert-safe')
Write-Host 'Packaged viewer checks passed: known attacks blocked, removed code absent, graph operations and exports preserved.'
