package widoco;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Properties;
import org.junit.Test;
import widoco.entities.Agent;
import static org.junit.Assert.*;

public class MetadataSecurityTest {
    @Test public void jsonLdCannotTerminateScriptAndRetainsMetadata() throws Exception {
        Configuration c = new Configuration();
        String payload = "</script><img src=x onerror=window.metadataExecuted=1>\"\\";
        c.getMainOntology().setTitle(payload);
        c.setAbstractSection(payload);
        c.getMainOntology().getCreators().add(new Agent(payload,"https://example.org/author",null,null,null));
        String snippet = Constants.getJSONLDSnippet(c);
        assertEquals(1, snippet.split("</script>",-1).length-1);
        assertFalse(snippet.contains("<img"));
        JsonNode json = new ObjectMapper().readTree(snippet.substring(snippet.indexOf('>',snippet.indexOf("<script"))+1,snippet.indexOf("</script>")));
        assertEquals(payload,json.get("name").asText());
        assertEquals(payload,json.get("headline").asText());
        assertEquals(payload,json.get("author").get(0).get("name").asText());
    }

    @Test public void htmlMetadataIsTextAndExecutableLinksAreRejected() {
        Configuration c = new Configuration();
        String payload="<img src=x onerror=window.metadataExecuted=1>";
        c.getMainOntology().setTitle(payload);
        c.getMainOntology().setRevision(payload);
        c.getMainOntology().setDescription(payload);
        c.getMainOntology().getCreators().add(new Agent(payload,"javascript:alert(1)",null,null,null));
        c.getMainOntology().getSources().add(payload);
        c.getMainOntology().getSeeAlso().add("javascript:alert(1)");
        Properties language=new Properties();
        language.setProperty(Constants.LANG_LICENSE_IF_NULL,"License");
        language.setProperty(Constants.LANG_LICENSE_URL_IF_NULL,"https://example.org/license");
        String head=Constants.getHeadSection(c,language);
        assertFalse(head.contains(payload));
        assertTrue(head.contains("&lt;img"));
        assertFalse(head.contains("href=\"javascript:"));
        assertFalse(Constants.getAbstractSection(payload,c,new Properties()).contains(payload));
        assertFalse(Constants.getDescriptionSectionTitleAndPlaceHolder(c,new Properties()).contains(payload));
    }
}
