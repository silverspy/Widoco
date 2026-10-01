# OWL2VOWL replacement: security and feasibility report

## Result and scope

**Follow-up viewer audit:** the Java zero-advisory result below does not cover
JavaScript. [JS_AND_FEATURE_AUDIT.md](JS_AND_FEATURE_AUDIT.md) reproduces two
inherited DOM XSS entry points and a vulnerable bundled Lodash primitive. It also
compares the old/new actual converters: the tested limitations already existed
in the original converter. These viewer findings remain unpatched.

The integration is a working, server-free Java library extraction from Team
Digitale, not a dependency on its Spring Boot WAR. WIDOCO still writes static
WebVOWL assets and `webvowl/data/ontology.json`. Both source builds and the actual
shaded JAR were tested. No suppression or vulnerability exclusion was used in
the independent scans.

**This is an integration attempt with known converter limitations, not complete
OWL feature validation or a claim that WIDOCO has no security defects.** Qualified
object cardinalities, zero cardinalities and anonymous restriction fillers remain
unsupported by the converter. Positive unqualified cardinalities, named classes,
object/data properties, existential/universal restrictions and a local import
were verified. Docker execution and Java 17 were not tested locally.

Sources inspected before integration:

- WIDOCO: [dgarijo/Widoco](https://github.com/dgarijo/Widoco/tree/4fc48c92c3d731cc723749206aaac2d05d00cc6d), version 1.4.26.
- Converter: [teamdigitale/dati-semantic-WebVOWL](https://github.com/teamdigitale/dati-semantic-WebVOWL/tree/5cdef0946423a8a813a58f5c9b478467f68cbd9d).

The personal fork is `silverspy/Widoco`; the integration branch is
`replace-owl2vowl-with-teamdigitale-core`.

## Security analysis performed first

Maven resolved the baseline WIDOCO graph, and Gradle resolved the unmodified
fork's `runtimeClasspath`. Every exact Maven coordinate, including transitives,
was queried through the [OSV API](https://google.github.io/osv.dev/api/). Advisory
records were downloaded, not merely counted by a UI. The preserved JSON snapshots
contain query timestamps, package versions, severities, aliases and affected
ranges. These results are point-in-time database matches; they do not prove each
advisory is exploitable in WIDOCO's execution path.

| Graph | Resolved artifacts | Affected artifacts | Unique advisories | Critical | High | Moderate | Low |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Original WIDOCO, including test scope | 95 | 26 | 155 | 14 | 76 | 56 | 9 |
| Unmodified Team Digitale WAR runtime | 91 | 11 | 52 | 6 | 17 | 24 | 5 |
| Corrected isolated core, including test scope | 61 | 0 | 0 | 0 | 0 | 0 | 0 |
| Final WIDOCO, including test scope | 67 | 0 | 0 | 0 | 0 | 0 | 0 |

An advisory affecting several artifacts is counted once in the unique/severity
columns. The WAR is a different application surface, so its totals are not an
apples-to-apples estimate of WIDOCO exploitability. In particular, server endpoint
advisories do not demonstrate that WIDOCO runs an HTTP listener.

### Initial problems and required corrections

| Component | Original WIDOCO | Unmodified fork | Integrated core / final WIDOCO |
| --- | --- | --- | --- |
| Jackson 1 | `jackson-mapper-asl:1.9.13` and `jackson-core-asl:1.9.13` | Removed; uses Jackson 2 | Artifact and `org/codehaus/jackson/` bytecode absent |
| Generic Collections | ServiceMix `collections-generic:4.01_1` | Removed; uses JDK collections | Artifact and `org/apache/commons/collections15/` bytecode absent |
| Jackson 2 | core 2.9.10, databind 2.9.10.7 | 2.19.4, still vulnerable | BOM 2.18.11, no OSV matches at scan time |
| Log4j | API 2.7 | API/core 2.24.3, still vulnerable | API + SLF4J bridge 2.25.5; no Log4j Core |
| Spring / Tomcat | Boot 1.5.6, Spring 4.3.10, Tomcat 8.5.16 | Boot 3.5.10, Spring 6.2.15, Tomcat 10.1.50; advisories remain | No server sources, artifacts or bytecode |
| Commons IO / Lang | IO 2.5, Lang 3.6 | IO 2.18.0, Lang 3.18.0 | IO 2.18.0, Lang 3.18.0 |
| Guava | 30.0-jre | 33.4.0-jre | 33.4.0-jre |
| HTTP client | 4.5.10, also bundled in OSGi artifacts | 4.5.13 | All HTTP client/OSGi modules 4.5.14; HTTP core modules 4.4.16 |
| XML transformation | Saxon 9.4 brings old JDOM/Xerces/Xalan/dom4j | Not a WAR dependency | Saxon 10.9 removes that obsolete transitive stack |
| Maven model / Plexus | Model 3.9.0, Plexus 3.4.2 | Not a WAR dependency | Model 3.9.11 + explicit Plexus 3.6.1 security fix |

The initial Jackson 1 findings are
[CVE-2019-10202](https://github.com/advisories/GHSA-c27h-mcmw-48hv)
and [CVE-2019-10172](https://github.com/advisories/GHSA-r6j9-8759-g62w).
The ServiceMix generic collections bundle matches
[CVE-2015-7501](https://github.com/advisories/GHSA-fjq5-5j5f-mvxh), a critical
deserialization advisory. Removing only an artifact name would be insufficient:
the relevant classes were checked in the actual JAR.

The fork itself is **not a sufficient security fix**. Its Jackson 2.19.4 has high
severity polymorphic validation and denial-of-service advisories, among others;
for example [GHSA-rmj7-2vxq-3g9f](https://github.com/advisories/GHSA-rmj7-2vxq-3g9f).
Its Log4j Core also retains
[CVE-2025-68161](https://github.com/advisories/GHSA-vc5p-v9hr-52mj).
The fork's Gradle build disables Dependency-Check during `build`, configures
`failOnError=false`, and suppresses that Log4j CVE. These settings were not copied.
The corrected core uses patched Jackson/Log4j APIs, excludes Log4j Core, and does
not bring server dependencies into WIDOCO.

Plexus 3.6.0 remained vulnerable even after upgrading Maven Model. Inspection of
the first integrated JAR exposed
[CVE-2025-67030](https://github.com/advisories/GHSA-6fmv-xxpf-w3cw);
the final build explicitly pins the fixed 3.6.1 release.

### Converter dependencies versus server dependencies

The converter uses OWLAPI, Jackson serialization, Commons IO/Lang, Guava,
Log4j API through an SLF4J bridge, and Jakarta annotations. OWLAPI brings RDF4J,
JSON-LD, HTTP client, Caffeine and other transitives: they are included in the
scans, not assumed safe because they are indirect.

Spring Boot, Spring MVC, embedded Tomcat, servlet endpoints, Micrometer and the
Log4j server logging implementation belong to the WAR. `ServerMain.java` and the
entire `server` package were excluded from the isolated test and are not vendored
in the final library. No frontend from the fork is substituted: the existing
WIDOCO WebVOWL 1.1.7 assets are retained. Their Google Fonts import was removed;
the browser test requires zero HTTP requests for the final generated page.

## Feasibility and integration

The fork declares Java 21 and OWLAPI 5.1.1. Its actual converter source successfully
compiled with `--release 11` against **WIDOCO's OWLAPI 5.1.18**. Both Java 11 and
Java 21 ran the tests without `--add-opens`. This avoids importing Boot's dependency
management or downgrading WIDOCO's OWLAPI.

The source confirms these interfaces:

```java
new it.gov.innovazione.owl2vowl.Owl2Vowl(ontology).getJsonAsString();
```

`DiagramGeneration` writes the returned string as UTF-8, creating its parent
directory, at the unchanged `webvowl/data/ontology.json` path. A Maven reactor
builds the extracted `owl2vowl-core` library and WIDOCO together. The core has an
explicit POM, pinned source provenance, version resource and packaged MIT license.
README, CI, Docker build and JitPack configuration use the reactor.

Two converter defects were corrected: cleanup no longer removes a caller-owned
ontology from its OWLAPI manager, and annotation pre-parsing no longer attempts
to cast ordinary axioms to annotation assertions. The caller-ownership regression
is exercised by converting the same ontology twice and saving it after conversion.

## Effective validation

| Check | Result |
| --- | --- |
| Original WIDOCO build | 22 existing tests pass; shaded JAR produced |
| Isolated corrected core | Compilation and conversion assertions pass; no Spring/server classpath |
| Final Java 11 reactor | 23 WIDOCO tests + 1 core test pass, no skipped tests |
| Final Java 21 reactor | Same 24 tests pass, no skipped tests; `--release 11` |
| `DiagramGeneration` | Exact output location, UTF-8 label, directory creation, preserved manager and repeated conversion pass |
| Ontology fixture | Person/Child classes, datatype/object properties, inheritance, named some/all restrictions, exact=2/min=1/max=3 and locally mapped import pass |
| Packaged CLI | Actual shaded JAR generates English static documentation and WebVOWL from the fixture with a local import |
| Browser | Headless Microsoft Edge renders the generated graph, properties and cardinality labels without JavaScript exceptions |
| Offline assets | Final WebVOWL browser run has zero HTTP requests; no conversion endpoint is needed |
| Forbidden namespaces | Jackson 1, generic collections, Spring, Tomcat, original OWL2VOWL and Log4j Core absent |
| Bytecode provenance | 14,327 packaged dependency classes match resolved input JARs; no mismatch, missing artifact or unexplained class |
| Final resolved-graph OSV scan | 67 artifacts, zero matched advisories |
| Final JAR metadata OSV scan | 59 artifact records, zero matched advisories |

The baseline JAR has 623 Jackson 1 classes, 386 generic collections classes,
4,738 Spring classes, 660 Catalina classes and 122 Coyote classes. The final JAR
has zero in each namespace. This is removal of implementation bytecode, not an
alert suppression or metadata deletion. Bytecode hashes are compared against
the resolved input dependencies to detect obsolete copies inside bundled JARs.

JAR metadata alone is incomplete: some dependencies omit their Maven metadata or
use bundled packaging. Therefore the 59-record packaged scan is supplemented by
the full dependency graph and bytecode provenance checks. The baseline metadata
scan returns fewer advisories than its complete graph; it must not replace the
graph result in the comparison.

## Reproduction

Requirements: JDK 11 or 21, Maven 3.9+, Node.js with `fetch` support, Python 3,
and Microsoft Edge plus Playwright for the browser check. From the repository root:

```powershell
# JAVA_HOME must identify the JDK to test.
mvn -B -f build-reactor/pom.xml clean verify
# Install the browser test dependency outside Maven's cleaned output directory.
npm install --prefix .browser-tools playwright
$env:NODE_PATH = (Resolve-Path .browser-tools/node_modules).Path
./scripts/security/reproduce.ps1
```

`reproduce.ps1` runs the build, dependency tree, packaged namespace check, bytecode
comparison, two OSV scans, CLI generation and browser rendering. It fails on a
scan/network error, any matched advisory, remaining forbidden bytecode or browser
failure. It saves raw results in `target/security`. OSV needs internet access;
the browser itself blocks external requests. `.browser-tools` is ignored by Git
and is outside Maven's cleaned `target` directory.

For the before comparison, check out the pinned original WIDOCO revision, run
`mvn -B clean verify dependency:tree -DoutputFile=dependency-tree.txt`, then use the
same `tree-inventory.mjs`, `jar-inventory.py` and `scan-osv.mjs` scripts. Omit
`--assert-clean` and `--fail-on-vulnerability` for that deliberately vulnerable
baseline. For the fork, run its Gradle wrapper with the archived
`dependency-inventory.gradle` init script and `writeSecurityInventory`, then scan
the output inventory. Keep scans separate from `build`; that build disables its
own security analysis.

## Evidence, limits and remaining work

Raw dependency trees, OSV responses, build/test logs, packaged inventory and
bytecode comparison are retained in `evidence/`. The final JAR SHA-256 is recorded
in `evidence/final-jar.json`. The generated JSON and browser screenshot are included
so the result can be reviewed without running a service.

- The initial qualified-cardinality fixture failed: those fields are omitted by
  explicit unsupported-filler guards in the converter. Cardinality zero is also
  omitted by its serializer. These remain feature blockers for users needing
  those representations; positive unqualified cardinalities are the validated
  subset. Anonymous fillers and broader OWL expressivity are not validated.
- The preserved WebVOWL frontend was functionally tested, not comprehensively
  audited for JavaScript security. OSV scans here cover the Java dependency graph.
- Local imports were tested. Arbitrary remote imports, large ontologies, missing
  imports and hostile ontology input require additional tests. Existing WIDOCO
  security tests were run, but they are not an exhaustive parser security review.
- Some existing tests fetch public ontologies, so the full legacy suite is not
  completely offline. Documentation viewing and the new conversion fixture
  require no additional service.
- CI is configured for Java 11/17/21 with unsuppressed scans; local results do not
  establish that GitHub Actions passed. Docker and JitPack configuration changes
  have not been independently executed.

The delivered branch should remain an integration attempt until those limitations
are accepted or addressed. No release, deployment or upstream merge was performed.
