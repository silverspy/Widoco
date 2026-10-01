import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Properties;
import widoco.Configuration;
import widoco.Constants;
import widoco.entities.Agent;

/** Render real metadata templates with harmless script-termination canaries. */
public class DocumentationMetadataProbe {
    public static void main(String[] args) throws Exception {
        Configuration c = new Configuration();
        String payload = "</script><img src=x onerror=window.__metadataMarker=1>";
        c.getMainOntology().setTitle(payload);
        c.getMainOntology().setRevision(payload);
        c.getMainOntology().setDescription(payload);
        c.setAbstractSection(payload);
        c.getMainOntology().getCreators().add(new Agent(payload,"javascript:window.__metadataMarker=2",null,null,null));
        c.getMainOntology().getSources().add(payload);
        c.getMainOntology().getSeeAlso().add("javascript:window.__metadataMarker=2");
        Properties language = new Properties();
        language.setProperty(Constants.LANG_LICENSE_IF_NULL,"License");
        language.setProperty(Constants.LANG_LICENSE_URL_IF_NULL,"https://example.org/license");
        String html = "<!DOCTYPE html><html><head><meta charset=\"utf-8\"><script>window.__metadataMarker=0</script>"
                + Constants.getJSONLDSnippet(c) + "</head><body>"
                + Constants.getHeadSection(c,language)
                + Constants.getAbstractSection(payload,c,new Properties())
                + Constants.getDescriptionSectionTitleAndPlaceHolder(c,new Properties())
                + "</body></html>";
        Files.writeString(Paths.get(args[0]),html,StandardCharsets.UTF_8);
    }
}
