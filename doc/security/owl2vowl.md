# OWL2VOWL dependency replacement

This addresses [issue #825](https://github.com/dgarijo/Widoco/issues/825), which
reports `jackson-mapper-asl` and `collections-generic` in the shaded WIDOCO JAR.

The replacement is `com.github.silverspy:owl2vowl-core:1.0.1`, obtained from
JitPack. Its [source and release](https://github.com/silverspy/owl2vowl-core/releases/tag/1.0.1)
derive from Team Digitale's converter at commit
`5cdef0946423a8a813a58f5c9b478467f68cbd9d`. The MIT license is retained in the
library. It requires Java 11 and OWLAPI 5.1.18, contains no Spring Boot or server,
and preserves caller-owned ontologies during cleanup.

`DiagramGeneration` passes the existing OWLAPI model to the converter and writes
UTF-8 JSON to `webvowl/data/ontology.json`. The converter is a released dependency;
its sources and build modules are maintained outside WIDOCO.

## Validation

Build with Maven 3.9.11 and JDK 11 or newer:

```sh
mvn --batch-mode clean verify org.apache.maven.plugins:maven-dependency-plugin:3.8.1:tree -DoutputFile=dependency-tree.txt
mkdir -p target/security
node scripts/security/tree-inventory.mjs dependency-tree.txt target/security/resolved-artifacts.json
python scripts/security/jar-inventory.py JAR/widoco-1.4.26-jar-with-dependencies.jar target/security/jar.json --assert-clean
python scripts/security/audit-packaged-classes.py JAR/widoco-1.4.26-jar-with-dependencies.jar target/security/resolved-artifacts.json "$HOME/.m2/repository" target/security/bytecode-provenance.json
node scripts/security/scan-osv.mjs target/security/resolved-artifacts.json target/security/resolved-osv.json --fail-on-vulnerability
node scripts/security/scan-osv.mjs target/security/jar-artifacts.json target/security/jar-osv.json --fail-on-vulnerability
```

CI tests Java 11, 17 and 21. It scans the actual JAR with Trivy `rootfs`, rather
than `fs`, and scans Maven manifests separately. Reports retain every severity;
no advisories are suppressed. The check rejects HIGH, CRITICAL and unclassified
findings, and requires Trivy to identify Java packages. CI artifacts include the
scanned JAR, its SHA-256 and scanner/database versions. Bytecode checks verify
dependency provenance and the absence of obsolete Java namespaces.

The diagram regression checks UTF-8 labels, repeated conversion and preservation
of the caller's ontology. The library tests classes, object/data properties,
named restrictions, positive unqualified cardinalities and local imports.
Paired old/new tests cover 19 scenarios with HTTP and plain URN identifiers;
their normalized conversion summaries agree. The full investigation is retained
in [the audit snapshot](https://github.com/silverspy/Widoco/tree/ef7c3d56751c856364f72b72fb85302cb7e1d394/doc/security/owl2vowl).

## Limits and maintenance

Qualified cardinalities, zero max/exact cardinalities, anonymous intersection
fillers and the tested plain URN form remain incomplete in both converters.
WebVOWL is not a lossless OWL representation or a reasoner.

The separate repository owner maintains dependency updates and releases on a
best-effort basis. WIDOCO still needs to follow those releases and scan its own
final JAR. Released artifacts can be mirrored in an organization's Maven
repository when direct JitPack access is unavailable.

These checks concern Java dependencies. The embedded JavaScript has separate
known security issues; frontend remediation is retained in the
[full integration branch](https://github.com/silverspy/Widoco/tree/replace-owl2vowl-with-teamdigitale-core).
It is still needed for an application-wide zero-HIGH/CRITICAL policy. Deployment
images and their OS/JVM packages also require their own scan.

The unchanged viewer still requests a Google Fonts stylesheet. A browser check
renders the generated graph with HTTP(S) requests blocked, but the Java-only
change does not remove that existing external font reference.
