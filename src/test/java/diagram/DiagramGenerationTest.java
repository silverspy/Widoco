package diagram;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import org.junit.Test;
import org.semanticweb.owlapi.apibinding.OWLManager;
import org.semanticweb.owlapi.model.*;
import widoco.Configuration;
import widoco.entities.Ontology;
import static org.junit.Assert.*;

public class DiagramGenerationTest {
    @Test public void writesUtf8JsonAndPreservesCallerOntology() throws Exception {
        OWLOntologyManager manager = OWLManager.createOWLOntologyManager();
        OWLOntology model = manager.createOntology(IRI.create("https://example.org/diagram"));
        OWLDataFactory factory = manager.getOWLDataFactory();
        OWLClass type = factory.getOWLClass(IRI.create("https://example.org/diagram#Person"));
        manager.addAxiom(model, factory.getOWLDeclarationAxiom(type));
        manager.addAxiom(model, factory.getOWLAnnotationAssertionAxiom(factory.getRDFSLabel(), type.getIRI(), factory.getOWLLiteral("Person — café", "en")));
        Configuration configuration = new Configuration();
        Ontology ontology = new Ontology();
        ontology.setMainOntology(model);
        ontology.setMainOntologyManager(manager);
        configuration.setMainOntology(ontology);
        Path folder = Path.of("target/diagram-test");
        DiagramGeneration.generateOntologyDiagram(folder.toString(), configuration);
        String json = Files.readString(folder.resolve("webvowl/data/ontology.json"), StandardCharsets.UTF_8);
        assertTrue(json.contains("Person — café"));
        assertTrue(json.contains("https://example.org/diagram#Person"));
        assertSame(manager, model.getOWLOntologyManager());
        DiagramGeneration.generateOntologyDiagram(folder.toString(), configuration);
        assertEquals(json, Files.readString(folder.resolve("webvowl/data/ontology.json"), StandardCharsets.UTF_8));
    }
}
