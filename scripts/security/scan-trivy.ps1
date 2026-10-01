param(
    [string]$Trivy = 'trivy',
    [string]$Python = 'python',
    [string]$Cache = 'target/trivy-cache',
    [string]$Output = 'target/security/trivy'
)
$ErrorActionPreference = 'Stop'
$projectRoot = (Resolve-Path "$PSScriptRoot/../..").Path
Set-Location $projectRoot
New-Item -ItemType Directory -Force $Output | Out-Null
$ignore = "$Output/empty.trivyignore"
Set-Content -LiteralPath $ignore -Value '' -NoNewline
$common = @('--cache-dir', $Cache, '--scanners', 'vuln', '--detection-priority', 'comprehensive',
    '--ignorefile', $ignore, '--list-all-pkgs', '--no-progress', '--timeout', '15m', '--format', 'json')
& $Trivy --version
if ($LASTEXITCODE -ne 0) { throw 'Trivy is unavailable' }
# JAR analysis is enabled by rootfs; filesystem mode does not inspect JARs.
& $Trivy rootfs @common --output "$Output/final-jar.json" JAR/widoco-1.4.26-jar-with-dependencies.jar
if ($LASTEXITCODE -ne 0) { throw 'Packaged JAR scan failed' }
& $Trivy fs @common --output "$Output/source.json" .
if ($LASTEXITCODE -ne 0) { throw 'Source scan failed; populate the Maven cache including the locally built converter' }
& $Python "$PSScriptRoot/audit-frontend-jar.py" JAR/widoco-1.4.26-jar-with-dependencies.jar src/main/resources "$Output/frontend-provenance.json" "$Output/frontend-assets"
if ($LASTEXITCODE -ne 0) { throw 'Packaged frontend differs from source' }
node "$PSScriptRoot/frontend-sbom.mjs" "$PSScriptRoot/frontend-components.json" "$Output/frontend.cdx.json"
if ($LASTEXITCODE -ne 0) { throw 'Frontend SBOM generation failed' }
& $Trivy sbom @common --output "$Output/frontend.json" "$Output/frontend.cdx.json"
if ($LASTEXITCODE -ne 0) { throw 'Frontend scan failed' }
node "$PSScriptRoot/summarize-trivy.mjs" "$Output/summary.json" "$Output/final-jar.json" "$Output/source.json" "$Output/frontend.json"
if ($LASTEXITCODE -ne 0) { throw 'Trivy found high, critical or unknown findings' }
$jarReport = Get-Content "$Output/final-jar.json" -Raw | ConvertFrom-Json
if (-not ($jarReport.Results | Where-Object { $_.Type -eq 'jar' -and $_.Packages.Count -gt 0 })) {
    throw 'Trivy did not identify any Java packages in the actual JAR'
}
Get-FileHash -Algorithm SHA256 JAR/widoco-1.4.26-jar-with-dependencies.jar | Format-List | Out-String | Set-Content "$Output/sha256.txt"
& $Trivy --cache-dir $Cache --version | Set-Content "$Output/version.txt"
if ($LASTEXITCODE -ne 0) { throw 'Unable to record scanner/database versions' }
