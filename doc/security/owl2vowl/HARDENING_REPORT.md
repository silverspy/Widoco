# Packaged WIDOCO and static frontend hardening

**Subsequent Trivy audit:** [TRIVY_REPORT.md](TRIVY_REPORT.md) supersedes this
recorded artifact's frontend status and hash. Trivy detected an additional HIGH
issue in the legacy OOPS jQuery resource; that resource has since been replaced
and the new artifact rebuilt and tested. The numbers below describe the earlier
artifact and its original scans, not the latest Trivy result.

## Acceptance criterion and result

The requested criterion is **no detected HIGH or CRITICAL vulnerabilities**, rather
than a guarantee that software contains no security defects. The checks below
meet that criterion on the tested artifact as of 2026-10-01. No advisory was
suppressed, excluded, or reclassified to obtain this result. The deployment
environment's scanner is unknown; its runtime assessment is still required for
that environment's acceptance. Its operating system, JVM, HTTP host, and policies
are outside this artifact assessment.

Tested artifact: `JAR/widoco-1.4.26-jar-with-dependencies.jar`.

SHA-256: `27140e0bb6617ef6b01a990d96ae588e08053c0d12c1dc8182c25863cd02a432`.

| Scope | Before | Delivered artifact |
| --- | --- | --- |
| Original Java dependency graph | 155 unique OSV advisories: 14 critical, 76 high, 56 moderate, 9 low | 67 resolved coordinates: zero OSV advisories |
| Unmodified Team Digitale WAR | 52 unique advisories: 6 critical, 17 high, 24 moderate, 5 low | Server dependencies excluded from standalone converter |
| Packaged Java dependencies | Vulnerable Jackson 1 and Collections 15 present in original | 59 normalized Maven metadata coordinates: zero OSV advisories; 14,327 dependency classes match resolved artifacts |
| WebVOWL custom bundle | Two reproduced DOM XSS entry points; vulnerable Lodash primitive physically present | Tested attacks blocked; obsolete Lodash modules physically removed |
| Main documentation metadata | Actual original JAR executes script-termination canary; JSON-LD invalid | Actual final JAR preserves literal text, valid JSON-LD, no execution or executable links |
| Marked | CDN dependency 18.0.1 affected by HIGH GHSA-6v9c-7cg6-27q7 | Local 18.0.2: zero OSV advisories |
| Identified packaged frontend versions | Separate historical audit, not a complete comparable baseline count | 20 unique advisories: **0 critical, 0 high, 16 moderate, 4 low, 0 unclassified** |

Java baseline details and converter extraction evidence are in [REPORT.md](REPORT.md).
Historical viewer attacks and converter limitations are in
[JS_AND_FEATURE_AUDIT.md](JS_AND_FEATURE_AUDIT.md). They describe the earlier,
unpatched revision; the evidence in [evidence/hardening](evidence/hardening)
describes this correction.

## Changes actually shipped

* Remove the bundled Lodash Core implementation and modules 84–314 from WebVOWL;
  preserve webpack module positions with empty slots. Replace the used shallow
  clone, predicate search and object-reference intersection with small native
  implementations. Remove the app's unused Lodash unescape dependency closure.
  Vulnerable `zipObjectDeep`, `baseSet` and `baseUnset` code is absent, rather than
  left behind an input-validation wrapper. WebVOWL's version remains visible.
* Render metadata, search labels, progress and error messages as text. Validate
  external viewer links and conversion URLs against HTTP/HTTPS schemes. Add a
  CSP and external initialization script. Repeat attack tests with the CSP
  deliberately removed, demonstrating that source fixes block the tested attacks.
* Serialize schema.org JSON-LD with Jackson and escape HTML delimiters as JSON
  Unicode escapes. Encode metadata at HTML output sites, including agents,
  descriptions, namespace tables, source links and download links; reject
  executable URL schemes. Preserve original values in the RDF model/output.
* Ship local jQuery 3.7.1, Marked 18.0.2, DOMPurify 3.4.16 and Mermaid 11.16.1.
  Sanitize parsed Markdown using the HTML profile and use Mermaid's strict
  security mode. Encode TOC labels and use native ID lookup for hash navigation.
  Remove Google Fonts imports; retain system font fallbacks.
* Keep the Java library converter and static `webvowl/data/ontology.json` output.
  No Spring Boot, servlet server, or new conversion service is introduced.

All 14 JavaScript resources in the actual shaded JAR have been inventoried,
extracted and compared byte-for-byte with source resources. The Java checks also
reject Jackson 1, Collections 15, Spring, Tomcat/Coyote and Log4j Core bytecode.

## Remaining advisories and scanner coverage

The frontend inventory explicitly includes DOMPurify **3.4.0 embedded inside the
published Mermaid bundle**, as well as the separate 3.4.16 sanitizer. The former
has moderate/low advisories and is not disguised as 3.4.16. Legacy OOPS jQuery
1.11.0 and Bootstrap 3.0.3 resources also remain inventoried. The 20 unique
advisories and their precise affected components are retained in
[frontend-osv.json](evidence/hardening/frontend-osv.json), including full advisory
details. There are no HIGH, CRITICAL or UNKNOWN severity entries in that result.

Retire.js 5.7.0 scanned the resources extracted from the final JAR with a HIGH
failure threshold. It reports remaining medium/low issues and exits successfully.
It failed to identify Lodash in the original custom webpack bundle: a scanner
blind spot, not evidence that the original library was safe. Physical-code checks
and browser tests supplement library detection. The final scan does not use
Retire's `--includeOsv` option, whose asynchronous output produced premature empty
results during investigation; OSV queries are run independently.

The npm installation graph for obtaining vendor files reported zero advisories,
but that graph does not describe all code inside published bundles. It is not
used to substitute for the packaged inventory or to claim zero frontend issues.
Future database changes or a scanner using a different severity mapping can
change acceptance. The CI frontend gate fails on HIGH, CRITICAL and unclassified
advisories; the Java gate fails on any OSV advisory.

## Effective tests and compatibility

* Full clean Maven reactor compilation and verification: **26 tests passed**
  (25 WIDOCO, one converter), no failures or skips. Local build uses JDK 21 with
  Java 11 compatibility. The actual delivered JAR also generates documentation
  under Java 11. GitHub CI builds and scans Java 11, 17 and 21.
* Actual packaged viewer: **32 browser attack scenarios** across clean input and
  real Java-converted ontology metadata, with and without CSP. No script canary,
  prototype pollution, unexpected injected element or browser error occurs.
* Ten native replacement regression assertions pass, including shallow cloning,
  prototype safety, gradient lookup and parallel-link handling. JSON and SVG
  downloads succeed and contain the expected ontology data.
* Actual original/final JAR metadata comparison using the same fixture: original
  executes the canary, creates ten injected images and two executable links, and
  emits invalid JSON-LD; fixed emits none and parses JSON-LD while retaining the
  literal title. This test does not rely on CSP.
* Both default separate-section documentation and Java 11 unified custom-style
  documentation pass browser tests for Markdown formatting, hostile HTML and
  URLs, TOC labels, hash navigation, Marked whitespace processing, and Mermaid
  SVG rendering. Edge 154.0.4258.37 is the tested browser.
* Offline WebVOWL rendering passes. Main documentation functions with all remote
  requests blocked. Six optional Shields badge images still attempt remote
  loads; no external active script, stylesheet or XHR is required in these
  tests. Local section XHR is fulfilled from generated files by the harness.
  Serve static files normally when the browser disallows `file:` XHR.

Historical converter tests cover classes, object/data properties, named
existential/universal restrictions, positive unqualified cardinalities and
imports. The replacement does not remedy inherited omissions for meaningful
zero max/exact cardinalities, qualified cardinalities, anonymous intersection
fillers, or the tested plain URN parsing case. The prior paired converter results
remain applicable: no semantic converter changes were made by this hardening.

Intentional display changes: metadata is literal text; executable URLs are
blocked; Markdown HTML is sanitized, including removal of raw SVG/MathML and
unsafe attributes. Ordinary Markdown, Mermaid diagrams, WebVOWL graphs and
exports remain tested. This is targeted validation, not exhaustive functional
coverage or proof that every injection site in WIDOCO has been audited.

## Reproduction

Use Windows PowerShell, JDK 11 or newer, Maven, Node.js, Python 3, Edge and
Playwright available to Node. Set `JAVA_HOME` and include its `bin` in `PATH`.
Run from the repository root; network access is required for dependency/advisory
retrieval. No server is required by the converter.

```powershell
# Install browser and scanner tools in a disposable local directory.
npm install --prefix .browser-tools playwright retire@5.7.0
$env:NODE_PATH = (Resolve-Path .browser-tools/node_modules).Path
./scripts/security/reproduce.ps1 -Maven mvn.cmd -Python python

# Independent signature scan of assets extracted from that exact JAR.
./.browser-tools/node_modules/.bin/retire.cmd `
  --path target/security/frontend-assets --severity high --deep --nocache `
  --verbose --outputformat json --outputpath target/security/frontend-retire.json
if ($LASTEXITCODE -ne 0) { throw 'Frontend scanner rejected the artifact' }

# Second documentation mode, executed with the selected JVM.
& "$env:JAVA_HOME/bin/java.exe" '-Djava.awt.headless=true' `
  -jar JAR/widoco-1.4.26-jar-with-dependencies.jar `
  -ontFile target/security/cli-input.owl -outFolder target/security/unified-documentation `
  -rewriteAll -webVowl -lang en -includeImportedOntologies -useCustomStyle -uniteSections
if ($LASTEXITCODE -ne 0) { throw 'Unified documentation generation failed' }
node scripts/security/browser-documentation-security.cjs `
  target/security/unified-documentation target/security/unified-documentation-security.json
```

`reproduce.ps1` compiles, tests, checks resolved dependencies, validates actual
packaged bytecode and JS provenance, scans Java and frontend advisories, generates
documentation and runs the browser checks. Raw recorded outputs and build logs
are committed under `evidence/hardening`. JAR timestamps can change its hash on a
new build; repeat all packaged checks on the artifact actually deployed.
