import java.nio.file.*;
import java.nio.charset.StandardCharsets;
import org.semanticweb.owlapi.apibinding.OWLManager;
import org.semanticweb.owlapi.model.*;

/** Produces a real converter JSON from an ontology with harmless XSS canaries. */
public class ConverterMetadataProbe {
    public static void main(String[] args) throws Exception {
        OWLOntologyManager manager = OWLManager.createOWLOntologyManager();
        OWLDataFactory f = manager.getOWLDataFactory();
        OWLOntology ontology = manager.createOntology(IRI.create("https://example.org/audit"));
        OWLClass person = f.getOWLClass(IRI.create("https://example.org/audit#Person"));
        OWLClass target = f.getOWLClass(IRI.create("https://example.org/audit#Target"));
        manager.addAxiom(ontology, f.getOWLDeclarationAxiom(person));
        manager.addAxiom(ontology, f.getOWLSubClassOfAxiom(person,target));
        String payload = "<img src=x onerror=window.__auditExecuted=1>";
        OWLAnnotationProperty version = f.getOWLAnnotationProperty(IRI.create("http://www.w3.org/2002/07/owl#versionInfo"));
        manager.applyChange(new AddOntologyAnnotation(ontology, f.getOWLAnnotation(version,f.getOWLLiteral(payload))));
        manager.addAxiom(ontology,f.getOWLAnnotationAssertionAxiom(f.getRDFSLabel(),person.getIRI(),f.getOWLLiteral("<svg onload=a=2>")));
        Class<?> entry = Class.forName(args[0]);
        Object converter = entry.getConstructor(OWLOntology.class).newInstance(ontology);
        String json = (String)entry.getMethod("getJsonAsString").invoke(converter);
        Files.writeString(Paths.get(args[1]),json,StandardCharsets.UTF_8);
    }
}
