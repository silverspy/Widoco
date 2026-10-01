# Trivy follow-up audit

## Scope and correction

The deployment scanner was subsequently identified as Trivy. An effective scan
with **Trivy 0.74.0** found a HIGH issue that the previous OSV scan did not report:
`NSWG-ECO-328`, jQuery 1.11.0, severity source `nodejs-security-wg`. The old copy
was used by the static OOPS evaluation page. Therefore the earlier zero-HIGH
statement was specific to the scanners previously run, and did not demonstrate
Trivy acceptance.

The old resource is now removed from the packaged assets, replaced with the
official jQuery 3.7.1 distribution already used in the main documentation. The
evaluation template loads `evaluation/jquery-3.7.1.js`; the frontend inventory
records both actual copies of the same version. No advisory is suppressed or
reclassified. The actual evaluation template passes browser tests for table
sorting and Bootstrap collapse panels with the replacement.

Local rebuilt JAR (browser tests and packaged inventory scans):
`JAR/widoco-1.4.26-jar-with-dependencies.jar`.

SHA-256: `23c82de7a9d1f54b0e6d2b33ba942f7e25ad43123aacd73c89af22f850bdff83`.

**Native Trivy validation is also complete.** The dedicated
[successful CI run](https://github.com/silverspy/Widoco/actions/runs/36850560381)
builds and natively scans a Java 11 JAR from commit
`dcf1aa2f4ea5ff8eafe00de45467719de92e5b65`. The
[widoco-trivy-audit artifact](https://github.com/silverspy/Widoco/actions/runs/36850560381/artifacts/11156015329)
contains that exact JAR, its `sha256.txt`, database/version information and full
unfiltered JSON reports. Use this artifact for the JAR directly validated by
native Trivy. Its build timestamps and line endings can differ from the local
JAR above; the two hashes must not be conflated. The artifact ZIP digest is
`6c5e03054c58e2c19babc6231073979d270d5faf518d214284232fcd1654d24b`.

## Recorded results

| Trivy target | Results |
| --- | --- |
| Previous packaged frontend inventory | 21 findings: **1 HIGH**, 16 MEDIUM, 4 LOW; zero CRITICAL |
| Corrected packaged frontend inventory | **0 HIGH, 0 CRITICAL**; 13 MEDIUM, 4 LOW; seven identified component/version pairs |
| Final source manifests | Zero findings: reactor POM 126 packages, converter POM 59, WIDOCO POM 66; these counts overlap |
| Final packaged Java inventory | Zero findings across 59 Maven coordinates extracted from the actual final JAR |
| Native JAR artifact analysis in CI | **Zero findings**, including zero HIGH/CRITICAL; actual Java package detection is checked before accepting the report |

The vulnerability database used for the recorded successful scans was updated
at **2026-10-01T07:23:35.748678538Z**. Full unfiltered JSON results, logs, explicit
CycloneDX inventories and summaries are stored under [evidence/trivy](evidence/trivy).
The HIGH/CRITICAL Trivy gate (`--severity HIGH,CRITICAL --exit-code 1`) returns
**1 for the previous frontend and 0 for the replacement**. The full reports also
retain all medium and low alerts. Unknown severity causes the reproduction
summary gate to fail.

The 17 remaining frontend advisories concern Bootstrap 3.0.3 and DOMPurify 3.4.0
inside Mermaid's published bundle. They remain inventoried. The standalone
DOMPurify sanitizer is 3.4.16; it does not change the embedded Mermaid version.
The current OSV frontend scan also records 17 unique moderate/low advisories.

## Coverage and failures explicitly accounted for

Trivy's filesystem mode inspects source manifests, whereas JAR analysis requires
its `rootfs` or image mode. An initial `fs` scan on the JAR returned no packages;
that empty output is not evidence of a clean JAR. The reproduction script checks
that a native JAR scan actually identifies Java packages. See the official
[language coverage table](https://trivy.dev/docs/latest/guide/coverage/language/)
and [Java support](https://trivy.dev/docs/latest/guide/coverage/language/java/).

Trivy does not directly infer every dependency in arbitrary JavaScript bundles.
The frontend scan uses an explicit CycloneDX inventory of the versions present
in the actual resources, including nested DOMPurify. That SBOM is distinct from
an npm installation graph. The Java SBOM is generated from the actual packaged
Maven metadata. All 14 packaged JS files still match their source byte-for-byte,
and all 14,327 dependency classes match resolved JARs. These provenance checks
supplement, rather than replace, vulnerability scans.

The first source scan was blocked by Maven Central HTTP 429. It succeeds after
pointing Trivy's Maven settings at the populated local cache and adding the
locally built converter POM/JAR. No transitive dependencies were intentionally
skipped to bypass that failure. The first native JAR attempt failed when the
default Java DB mirror closed its HTTP/2 connection; the official GitHub registry
retry also failed with a protocol error while downloading the 975,559,142-byte
database layer. Native validation subsequently succeeds in the dedicated `trivy`
CI job, which builds and uploads the actual scanned JAR plus unfiltered reports.
[ci-job.log](evidence/trivy/ci-job.log) and
[ci-results.json](evidence/trivy/ci-results.json) record the successful run and
counts. Failed and empty scans are not included in successful counts.

Full Maven clean compilation and verification now pass: **26 tests**, no failures
or skips. The initial rerun failed on the legacy HTTP W3C ontology test URL;
using its direct HTTPS endpoint restores the same download test. Packaged
security checks, 32 viewer attack scenarios, graph/export regressions,
documentation Markdown/Mermaid tests and the new OOPS browser checks pass.
The final code also passes all Java 11/17/21 CI test and security jobs.

This audit covers application vulnerabilities in the recorded artifacts and
inventories. It does not scan a deployed Docker image, its OS/JVM packages,
secrets, or infrastructure configuration. The environment's precise Trivy
version, scan target and policy still need to match the deployment acceptance
check. It is not a statement that no findings of any severity remain.

## Reproduction

Use Trivy 0.74.0 or record the actual version/database timestamps, and run the
existing build/security reproduction first. Install the local converter into
the Maven repository used by Trivy; otherwise it may request the unpublished
artifact from Maven Central. Trivy reads Maven `settings.xml` and can use the
same populated repository as the build.

```powershell
./scripts/security/reproduce.ps1 -Maven mvn.cmd -Python python
mvn.cmd -B -f build-reactor/pom.xml install
./scripts/security/scan-trivy.ps1 -Trivy trivy -Cache target/trivy-cache
```

Equivalent native artifact command, with no ignore file exclusions:

```powershell
New-Item -ItemType Directory -Force target/security/trivy | Out-Null
Set-Content target/security/trivy/empty.trivyignore '' -NoNewline
trivy rootfs --scanners vuln --detection-priority comprehensive --list-all-pkgs `
  --ignorefile target/security/trivy/empty.trivyignore --no-progress --timeout 15m `
  --format json --output target/security/trivy/final-jar.json `
  JAR/widoco-1.4.26-jar-with-dependencies.jar

# If the default Java DB mirror fails, repeat with:
# --java-db-repository ghcr.io/aquasecurity/trivy-java-db:1
```

`scan-trivy.ps1` writes full reports and fails for HIGH, CRITICAL or UNKNOWN
findings, scanner errors, or a native JAR report identifying no Java packages.
It never uses `--ignore-unfixed`. Re-scan the exact artifact/image deployed;
rebuilding can change the JAR hash even without a dependency change.

