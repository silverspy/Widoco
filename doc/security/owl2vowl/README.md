# Converter replacement and security checks

WIDOCO uses the Java converter from
[Team Digitale's WebVOWL fork](https://github.com/teamdigitale/dati-semantic-WebVOWL/tree/5cdef0946423a8a813a58f5c9b478467f68cbd9d),
copied into `owl2vowl-core` with its MIT license. The module contains no Spring
Boot or HTTP server. `DiagramGeneration` passes the existing OWLAPI ontology to
`Owl2Vowl` and writes its JSON to `webvowl/data/ontology.json` as before.

The extraction fixes cleanup of caller-owned ontologies and annotation parsing.
The dependencies are pinned to the versions used in the successful scans.
Jackson 1, Collections 15, Spring, Tomcat and Log4j Core are absent from the
packaged JAR. The library source and its small local changes are described in
[owl2vowl-core/README.md](../../../owl2vowl-core/README.md).

This is a tested local-module prototype. The proposed integration would publish
the converter from a separate repository and use a released Maven dependency.
That release, its maintainer and publishing coordinates still need to be agreed;
the external-library integration has not yet been validated. Frontend hardening
can be submitted separately from the converter replacement.

## Static viewer and documentation

The embedded WebVOWL bundles no longer contain obsolete Lodash modules. Native
operations replace the three utilities actually used. Metadata, search labels
and loading messages are rendered as text; external URLs are checked. A CSP
supplements these fixes, which are also tested without CSP.

JSON-LD is serialized as JSON and encoded for its HTML script element. HTML
metadata is escaped at output sites, and parsed Markdown is sanitized. The local
assets are jQuery 3.7.1, Marked 18.0.2, DOMPurify 3.4.16 and Mermaid 11.16.1.
OOPS uses the same jQuery version. Markdown, Mermaid, WebVOWL and JSON/SVG exports
remain supported. Unsafe markup and executable URLs are intentionally filtered.

## Validation and limits

The recorded Trivy 0.74.0 scan reports zero findings for the Java JAR and source
manifests. The explicit packaged frontend inventory has **zero HIGH/CRITICAL
findings**, but **13 MEDIUM and four LOW findings** remain in Bootstrap 3.0.3 and
DOMPurify 3.4.0 inside Mermaid. The separately loaded DOMPurify version does not
replace that nested copy. No findings are suppressed or reclassified.

[The audited JAR and full reports](https://github.com/silverspy/Widoco/actions/runs/36889227047/artifacts/11175796651)
include the artifact's SHA-256 and scanner/database versions. The Java tests pass
on Java 11, 17 and 21. Browser checks cover ontology conversion, metadata attacks,
prototype pollution, links, Markdown/Mermaid, exports and OOPS sorting/collapse.
The CI builds and scans a fresh JAR, retaining all severity levels in its reports
and rejecting HIGH, CRITICAL or unclassified findings. A deployment image and its
OS/JVM packages need their own scan.

Paired tests against the original converter cover 19 ontology scenarios, also
repeated with URNs. Classes, properties, imports, named some/all restrictions and
positive unqualified cardinalities agree. Qualified cardinalities, meaningful
zero max/exact cardinalities, anonymous intersection fillers and the tested plain
URN form remain incomplete in both converters. WebVOWL is not a lossless OWL
representation. These omissions were not introduced by the replacement.

Detailed before/after results and investigation logs are preserved in the
[immutable audit snapshot](https://github.com/silverspy/Widoco/tree/ef7c3d56751c856364f72b72fb85302cb7e1d394/doc/security/owl2vowl).
They are kept out of the current review diff; new reports belong in `target`,
not in the source tree.

## Reproduce

Build both Maven projects from the repository root:

```sh
mvn -f build-reactor/pom.xml clean install
```

For the browser checks, install Playwright locally and make it available to Node.
The harness uses Chromium by default; set `PLAYWRIGHT_CHANNEL=msedge` to use an
existing Edge installation instead. On Windows, set `JAVA_HOME` and run:

```powershell
npm install --prefix .browser-tools playwright
npx --prefix .browser-tools playwright install chromium
$env:NODE_PATH = (Resolve-Path .browser-tools/node_modules).Path
./scripts/security/reproduce.ps1 -Maven mvn.cmd -Python python
./scripts/security/scan-trivy.ps1 -Trivy trivy
```

The first script builds, tests, checks bytecode/resource provenance, scans OSV and
runs browser regressions. The second scans the actual JAR with Trivy `rootfs`,
source manifests with `fs`, and the explicit frontend inventory with `sbom`.
Trivy's `fs` mode alone does not scan JAR contents or identify every bundled JS
dependency. The CI runs the native Trivy checks on Linux as well.

To repeat the old/new feature comparison, pass the original shaded JAR to
`scripts/security/reproduce-viewer-audit.ps1 -OldJar <path>`. The pinned
`scripts/security/harden-viewer.mjs` can reproduce the viewer changes from the
original bundles. Licenses for copied frontend distributions are retained here.
