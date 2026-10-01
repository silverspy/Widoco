# Standalone OWL2VOWL core

Source: [Team Digitale converter at revision
`5cdef0946423a8a813a58f5c9b478467f68cbd9d`](https://github.com/teamdigitale/dati-semantic-WebVOWL/tree/5cdef0946423a8a813a58f5c9b478467f68cbd9d).

The Java converter sources are vendored for reproducible builds. `ServerMain.java`
and the `server` package are excluded entirely. No frontend build, Spring Boot,
Tomcat, web endpoint or background process is required. The public entry points
remain `it.gov.innovazione.owl2vowl.Owl2Vowl(OWLOntology)` and
`getJsonAsString()`.

Local modifications:

- Maven library packaging and Java 11 compilation with `--release 11`.
- Explicit dependencies, patched Jackson/Log4j/HTTP client versions and no server
  dependency management or suppression file.
- HTTP bundles pulled in by OWLAPI/jsonld-java are aligned in this module's POM,
  so standalone consumers do not depend on WIDOCO's version overrides. CI scans
  the converter dependency graph separately from WIDOCO's graph.
- `OntologyConverter` marks caller-supplied ontologies as borrowed, so cleanup
  does not remove them from their OWLAPI manager.
- Converter version metadata and ontology regression tests.
- Annotation pre-parsing visits annotation assertions only, avoiding a caught
  `ClassCastException` for every ordinary OWL axiom.

From the repository root, build both projects with
`mvn -f build-reactor/pom.xml clean verify`, or install this library separately
with `mvn -f owl2vowl-core/pom.xml install` before using the root POM.

The converter still does not render qualified object cardinalities, anonymous
restriction fillers or cardinality zero correctly. Positive, unqualified
cardinalities are covered by assertions. Do not treat WebVOWL as a complete OWL
reasoner or a lossless OWL representation. See the security report for scope and
evidence. MIT license retained in `LICENSE` and in the packaged license resource.
