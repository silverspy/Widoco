# Standalone OWL2VOWL core

Source: https://github.com/teamdigitale/dati-semantic-WebVOWL
Revision: `5cdef0946423a8a813a58f5c9b478467f68cbd9d`.

The Java converter sources are vendored for reproducible builds. `ServerMain.java`
and the `server` package are excluded entirely. No frontend build, Spring Boot,
Tomcat, web endpoint or background process is required. The public entry points
remain `it.gov.innovazione.owl2vowl.Owl2Vowl(OWLOntology)` and
`getJsonAsString()`.

Local modifications:

- Maven library packaging and Java 11 compilation with `--release 11`.
- Explicit dependencies, patched Jackson/Log4j/HTTP client versions and no server
  dependency management or suppression file.
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
