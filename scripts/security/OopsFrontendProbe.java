import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import widoco.Configuration;
import widoco.Constants;

/** Generate the actual evaluation template without calling the OOPS service. */
public class OopsFrontendProbe {
    public static void main(String[] args) throws Exception {
        Configuration c = new Configuration();
        c.getMainOntology().setTitle("OOPS frontend regression");
        c.getMainOntology().setNamespaceURI("https://example.org/ontology");
        String content = "<table id=\"tablesorter-demo\"><thead><tr><th>Name</th></tr></thead>"
                + "<tbody><tr><td>Zeta</td></tr><tr><td>Alpha</td></tr></tbody></table>"
                + "<div id=\"audit-panel\" class=\"collapse\">Pitfall details</div>";
        Files.writeString(Paths.get(args[0]), Constants.getEvaluationText(content, c), StandardCharsets.UTF_8);
    }
}
