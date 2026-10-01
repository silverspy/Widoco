# Embedded WebVOWL JavaScript and converter feature audit

## Outcome

The embedded viewer is **not free of vulnerabilities**. Two independently
reproduced DOM XSS entry points allow ontology metadata or a crafted viewer URL
to execute JavaScript. A vulnerable Lodash prototype-pollution primitive is also
present in the bundle, although an attacker-controlled normal UI path to that
primitive was not demonstrated. These findings were not fixed during this audit.

The previous zero-advisory result applies to the resolved Java dependencies and
the packaged Java bytecode only. It does not describe the security of the viewer.
No critical JavaScript vulnerability was established by this audit; two XSS
findings are assessed as high priority. This is a targeted source and browser
audit, not a guarantee that no other vulnerabilities exist.

The tested converter limitations are real, but already exist in the original
WIDOCO converter. Nineteen identical ontology scenarios were run against each
actual JAR, then repeated with URN term IRIs. The feature summaries match after
normalizing the order of set-valued attribute/type arrays. This does not establish
equivalence for every OWL expression or large ontology.

## Scope and evidence

Audit performed on 2026-10-01. Database results are point-in-time matches.

Audited integration revision: `7b5f628f1188b7d02359bfe6f4413f7c68a81afa`.
Baseline WIDOCO revision: `4fc48c92c3d731cc723749206aaac2d05d00cc6d`.
Viewer: WebVOWL 1.1.7, D3 3.5.17, Lodash Core banner 4.17.15 plus embedded
modular `lodash/array` code. The three JavaScript files are byte-identical to the
baseline. Their SHA-256 hashes also match the JavaScript resources extracted from
the final WIDOCO JAR. See [source inventory](evidence/js-audit/javascript-inventory.json)
and [packaged inventory](evidence/js-audit/packaged-javascript-inventory.json).

Browser probes used Edge 154.0.4258.37, the actual static assets, and intercepted
local JSON loading. External HTTP requests were blocked. All eight scenarios
completed without uncaught browser exceptions. Canary payloads only set a window
variable or prototype property; they do not exfiltrate data or change files.

## Security findings

### JS-01: ontology metadata DOM XSS (high priority, confirmed)

`webvowl.app.js:6421-6437` assigns metadata to `innerHTML`, including version,
author, IRI, title and description. The unsafe updater runs during normal graph
loading, even though another metadata updater uses safer text assignment.

A real OWL ontology with `owl:versionInfo` equal to
`<img src=x onerror=window.__auditExecuted=1>` was converted by the new Java
library. Loading its unmodified JSON in the shipped viewer executed the canary
automatically. A clean fixture with injected metadata also reproduced execution
in normal and editor modes. See [generated JSON](evidence/js-audit/generated-xss-canary.json),
[round-trip results](evidence/js-audit/browser-roundtrip-audit.json) and
[isolated browser scenarios](evidence/js-audit/browser-js-audit.json).

Impact depends on the publication origin. A static HTTP deployment can execute
attacker-supplied script with that origin's browser permissions. A backend server
is not required for the bug. This is an inherited viewer defect, not a new Java
dependency regression.

Required correction: render metadata as text (`textContent` or D3 `.text()`),
including editor mode, and test hostile OWL literals through the complete
conversion/publication path. If formatted descriptions are an explicit product
requirement, use a maintained sanitizer with a narrow allowlist instead of raw
HTML assignment.

### JS-02: hash URL DOM XSS (high priority, confirmed)

`webvowl.app.js:8461-8473` decodes the `#url=` input and adds it to a loading
message. `append_message` writes that message with `innerHTML` at line 4196.
Opening the viewer with `#url=` followed by the URL-encoded payload
`<img src=x onerror=window.__auditExecuted=4>` executes the canary before a remote
ontology can load. No remote service or successful network response is needed.

This is independently reproduced by the `hash-url` scenario in both browser
result files. Similar message sinks exist for other loading/error paths; those
paths were inspected but were not all individually exercised.

Required correction: validate URL schemes and construct loading/error messages
with text nodes. Keep intentional formatting in separate fixed DOM elements.
Treat dropped filenames, remote responses and IRI conversion status as untrusted.

### JS-03: vulnerable bundled Lodash primitive (high library advisory)

An OSV query for npm `lodash@4.17.15` returned six advisories: three high and three
moderate. Queries for `lodash.core@4.17.15` and `d3@3.5.17` returned no matches.
These package queries are insufficient by themselves to assess a custom bundle.
See [raw queries](evidence/js-audit/js-osv.json) and
[advisory records](evidence/js-audit/js-advisory-details.json).

The bundle contains `zipObjectDeep` (webpack module 312) and an unguarded `baseSet`
(module 313), matching [GHSA-p6mc-m468-83gw](https://github.com/advisories/GHSA-p6mc-m468-83gw).
Exposing webpack's internal require in the test harness and invoking the actual
bundled function with `['__proto__.auditPolluted']` and `[true]` polluted
`Object.prototype`. Only the bootstrap was instrumented; the library function
was not modified. This proves vulnerable code is shipped, not exploitability
through ordinary ontology input. A normal JSON prototype-input probe did not
pollute the prototype. The application call observed in the modular array import
uses `intersection`, not `zipObjectDeep`.

The six advisory matches are **not six confirmed exploitable application flaws**.
Template injection advisories require APIs not demonstrated here; denial-of-service
and unset/omit advisories were not dynamically exploited. Nevertheless, the
vulnerable primitive should be removed. Rebuild with maintained patched modules,
or replace the small required array operations and eliminate unused vulnerable
code. Validate actual bundled bytes, not merely an updated version banner.

### Additional hardening findings

- A `javascript:` ontology IRI survives as the `#about` link's `href`. Execution
  through that link was not established in this browser. Allow only intended
  schemes for external links and protect new-window links.
- Search labels reach `innerHTML` at line 5377. A short SVG label inserts an SVG
  element into the result list, but its event canary did not execute in the clean
  fixture. This is confirmed HTML injection, not a second proven search XSS.
- The shipped page has no Content Security Policy. A suitable policy can reduce
  impact, but cannot replace output encoding and safe URL handling. Account for
  the existing inline initializer and autonomous static deployment.
- No D3 advisory match does not prove this old version or all embedded modules
  are safe. No exhaustive dependency provenance, browser denial-of-service or
  deployment-specific authorization assessment was performed.

## Are the converter limitations real?

The old `de.uni_stuttgart.vis.vowl.owl2vowl.Owl2Vowl` and new
`it.gov.innovazione.owl2vowl.Owl2Vowl` were instantiated through the same reflected
constructor with identical OWLAPI ontology fixtures in separate JVMs. Both used
`getJsonAsString()`. This tests the actual bundled converters rather than inferring
behavior from comments. [Comparison](evidence/js-audit/feature-comparison.json),
[old results](evidence/js-audit/features-old/results.json),
[new results](evidence/js-audit/features-new/results.json).

| Feature | Original converter | Integrated converter | Assessment |
| --- | --- | --- | --- |
| Named `someValuesFrom` / `allValuesFrom` fillers | Restriction emitted | Restriction emitted | Preserved in the two cases tested |
| Anonymous intersection filler for some/all | Restriction omitted | Restriction omitted | Existing information loss; other anonymous forms not exhaustively tested |
| Positive unqualified object exact/min/max cardinality (2) | Value emitted | Value emitted | Preserved |
| Positive data exact/min/max cardinality (2) | Value emitted | Value emitted | Preserved |
| Object/data exact/min/max cardinality zero | Cardinality fields omitted | Cardinality fields omitted | Shared defect; exact/max zero lose a meaningful constraint; min zero is tautological |
| Qualified object exact/min/max cardinality (2, named filler) | Cardinality fields omitted | Cardinality fields omitted | Shared information loss |
| Caller ontology remains in its manager | Yes | Yes | Preserved in every scenario |
| Term IRIs `urn:audit:Person`, without `/` or `#` | Empty graph | Empty graph | Shared parsing defect; exception logged internally rather than surfaced |

There are 19 HTTP-IRI cases per converter and 19 further URN cases per converter,
76 conversions in total. The URN runs produce zero classes and properties in all
cases, with `StringIndexOutOfBoundsException` during IRI preprocessing. This is a
separate shared defect, not a limitation of OWLAPI or the legality of URN IRIs.
See [URN comparison](evidence/js-audit/urn-feature-comparison.json) and the
preserved `features-*-urn` JSON/logs.

The viewer itself can display zero when supplied as the string `"0"` in the JSON:
browser tests show `0`, `0..*` and `*..0` after adding the missing field, whereas
the unchanged converter output shows no cardinality labels. See
[browser cardinality results](evidence/js-audit/browser-cardinality-audit.json).
This localizes this defect to conversion; it does not validate a production fix.

Earlier integration tests separately cover named classes, object/data properties
and a local ontology import. Imports were not compared again in this additional
19-case probe. Qualified data cardinalities, nested combinations, remote imports,
inconsistent axioms and large ontology performance remain outside this audit.

## Reproduction

Prerequisites: JDK 11 or later, Node.js with Playwright available to `require`,
installed Microsoft Edge, the compiled integration JAR, and the baseline JAR from
WIDOCO revision `4fc48c92c3d731cc723749206aaac2d05d00cc6d`. Build instructions and
Java security scans remain in [REPORT.md](REPORT.md). From the repository root:

```powershell
$env:NODE_PATH = 'C:/path/to/node_modules'
./scripts/security/reproduce-viewer-audit.ps1 -OldJar 'C:/baseline/JAR/widoco-1.4.26-jar-with-dependencies.jar'
```

The script compiles both Java probes against the integration JAR, runs old/new
conversion fixtures in separate JVMs, compares summaries, generates the metadata
canary through Java, and runs all browser scenarios. Outputs go to
`target/viewer-audit`. The browser harness intentionally reproduces existing
defects; a successful process exit does **not** mean those defects are absent.
Review the execution markers and prototype-pollution fields in the JSON outputs.

To regenerate the package advisory queries (the package order corresponds to the
three rows in the preserved OSV response):

```powershell
$queries = @{queries = @(
  @{package = @{ecosystem = 'npm'; name = 'lodash'}; version = '4.17.15'},
  @{package = @{ecosystem = 'npm'; name = 'lodash.core'}; version = '4.17.15'},
  @{package = @{ecosystem = 'npm'; name = 'd3'}; version = '3.5.17'}
)}
Invoke-RestMethod -Method Post -Uri 'https://api.osv.dev/v1/querybatch' -ContentType 'application/json' -Body ($queries | ConvertTo-Json -Depth 8) | ConvertTo-Json -Depth 20 | Set-Content target/viewer-audit/js-osv.json
node scripts/security/javascript-inventory.mjs src/main/resources/webvowl_1.1.7_patched C:/baseline/src/main/resources/webvowl_1.1.7_patched target/viewer-audit/javascript-inventory.json
```

No production assets, converter behavior or dependency versions were changed in
this follow-up. Correcting JS-01 and JS-02 is necessary before treating generated
documentation from untrusted ontologies as safe. After correction, negative
regression assertions must replace the canary execution expectations, followed
by a fresh build and inspection of the final JAR's embedded viewer.
