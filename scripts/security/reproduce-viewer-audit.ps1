param(
    [Parameter(Mandatory=$true)][string]$OldJar,
    [string]$NewJar = 'JAR/widoco-1.4.26-jar-with-dependencies.jar',
    [string]$Output = 'target/viewer-audit'
)
$ErrorActionPreference = 'Stop'
function Run-AuditCommand([string]$Executable, [string[]]$Arguments) {
    & $Executable @Arguments
    if ($LASTEXITCODE -ne 0) { throw "Audit command failed: $Executable" }
}
$OldJar = (Resolve-Path -LiteralPath $OldJar).Path
$NewJar = (Resolve-Path -LiteralPath $NewJar).Path
New-Item -ItemType Directory -Force -Path "$Output/classes" | Out-Null
$Output = (Resolve-Path -LiteralPath $Output).Path
$classes = "$Output/classes"
$separator = [IO.Path]::PathSeparator
$oldClass = 'de.uni_stuttgart.vis.vowl.owl2vowl.Owl2Vowl'
$newClass = 'it.gov.innovazione.owl2vowl.Owl2Vowl'
$assets = 'src/main/resources/webvowl_1.1.7_patched'
Run-AuditCommand javac @('--release','11','-cp',$NewJar,'-d',$classes,'scripts/security/ConverterFeatureProbe.java','scripts/security/ConverterMetadataProbe.java')
foreach ($variant in @('old','new')) {
    $jar = if ($variant -eq 'old') {$OldJar} else {$NewJar}
    $entry = if ($variant -eq 'old') {$oldClass} else {$newClass}
    Run-AuditCommand java @('-cp',"$classes$separator$jar",'ConverterFeatureProbe',$entry,"$Output/features-$variant")
    Run-AuditCommand java @('-cp',"$classes$separator$jar",'ConverterFeatureProbe',$entry,"$Output/features-$variant-urn",'urn:audit:')
}
Run-AuditCommand node @('scripts/security/compare-feature-probes.mjs',"$Output/features-old/results.json","$Output/features-new/results.json","$Output/feature-comparison.json")
Run-AuditCommand node @('scripts/security/compare-feature-probes.mjs',"$Output/features-old-urn/results.json","$Output/features-new-urn/results.json","$Output/urn-feature-comparison.json")
Run-AuditCommand java @('-cp',"$classes$separator$NewJar",'ConverterMetadataProbe',$newClass,"$Output/generated-xss-canary.json")
Run-AuditCommand node @('scripts/security/browser-audit.cjs',$assets,'doc/security/owl2vowl/evidence/ontology.json',"$Output/browser-js-audit.json",'--assert-safe')
Run-AuditCommand node @('scripts/security/browser-audit.cjs',$assets,"$Output/generated-xss-canary.json","$Output/browser-roundtrip-audit.json",'--assert-safe')
Run-AuditCommand node @('scripts/security/browser-cardinality-audit.cjs',$assets,"$Output/features-new","$Output/browser-cardinality-audit.json")
Write-Host "Feature audit and corrected-viewer regression evidence saved to $Output."
