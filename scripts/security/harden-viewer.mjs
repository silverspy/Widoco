// Reproduce the viewer patch from the exact baseline bundles, without a server.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
const [baseline, destination] = process.argv.slice(2);
function read(name, expected) {
  const bytes = fs.readFileSync(path.join(baseline,'js',name));
  assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),expected,'Unexpected baseline '+name);
  return bytes.toString('utf8').replace(/\r\n/g,'\n');
}
function replaceOnce(source, from, to) {
  assert.equal(source.split(from).length,2,'Expected one patch location: '+from);
  return source.replace(from,to);
}
let core = read('webvowl.js','ba0ff783c1742c5ad1a8af26b8ed32abadaebd60b07805860dc600526281cc94');
let app = read('webvowl.app.js','694ad5fe698707b5e2b471f3e781224d3fac1811b6538ecf6ca6386caf767ec1');
// The application imports unescape but never calls it. Remove its complete
// dependency closure, rather than leaving obsolete Lodash code in the payload.
app = replaceOnce(app,'var unescape = __webpack_require__(330);','');
const appHelpers = '/***/ 91:'+app.split('/***/ 91:')[1].split('/***/ 319:')[0];
app = replaceOnce(app,appHelpers,'/* Unused Lodash helper modules removed. */\n');
const appUnescape = '/***/ 330:'+app.split('/***/ 330:')[1].split('/***/ 333:')[0];
app = replaceOnce(app,appUnescape,'/* Unused Lodash unescape modules removed. */\n');
assert(!/__webpack_require__\((?:91|92|93|94|95|96|103|104|112|154|219|220|330|331|332)\)/.test(app));
// Only graph shallow cloning and external-color lookup used the Core build.
core = replaceOnce(core,'/* 58 */'+core.split('/* 58 */')[1].split('/* 59 */')[0],`/* 58 */
/***/ (function(module) {
  // Native replacements for the two operations used by WebVOWL.
  module.exports = {
    clone: function(value) {
      if (Array.isArray(value)) return value.slice();
      if (!value || typeof value !== "object") return value;
      var copy = {};
      Object.keys(value).forEach(function(key) {
        Object.defineProperty(copy,key,{value:value[key],enumerable:true,writable:true,configurable:true});
      });
      return copy;
    },
    find: function(values, predicate) {
      return values.filter(function(value) { return value.type === predicate.type; })[0];
    }
  };
/***/ }),
`);
core = replaceOnce(core,'var _ = __webpack_require__(84);','');
core = replaceOnce(core,'return _.intersection(property.domain().links(), property.range().links()).length === 1;',`var rangeLinks = property.range().links();
    var shared = property.domain().links().filter(function(link, index, links) {
      return links.indexOf(link) === index && rangeLinks.indexOf(link) !== -1;
    });
    return shared.length === 1;`);
// Preserve webpack array indices while physically removing all unused array
// modules, including zipObjectDeep/baseSet/baseUnset and their dependencies.
const unused = '/* 84 */'+core.split('/* 84 */')[1].split('/* 315 */')[0];
core = replaceOnce(core,unused,'/* Unused Lodash modules 84 through 314 removed. */\n'+Array.from({length:231},()=> 'undefined,\n').join(''));
for (const id of [58,84]) {
  // No references to removed array-module IDs may remain in live modules.
  if (id===84) assert(!/__webpack_require__\((?:8[4-9]|9\d|[12]\d\d|30\d|31[0-4])\)/.test(core));
}
const helper = `// External ontology links must not accept executable or local-file schemes.
webvowl.safeExternalUrl = function(value) {
  if (typeof value !== "string" || !/^https?:\\/\\//i.test(value)) return null;
  try {
    var url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:" ? url.href : null;
  } catch (error) { return null; }
};
`;
app = helper + app;
app = replaceOnce(app,'div.node().innerHTML = msg;','div.text(msg).style("white-space", "pre-wrap");');
app = replaceOnce(app,'var oldText = htmlCollection[lastItem].innerHTML;\n\t      htmlCollection[lastItem].innerHTML = oldText + msg;', 'htmlCollection[lastItem].appendChild(document.createTextNode(msg));');
app = replaceOnce(app,'bp.node().innerHTML = msg;','bp.text(msg).style("white-space", "pre-wrap");');
app = replaceOnce(app,'d3.select("#currentLoadingStep").node().innerHTML = msg;','d3.select("#currentLoadingStep").text(msg);');
app = replaceOnce(app,'liForToken.node().innerHTML = tokenMessage.replace(/\\n/g, "<br>");','liForToken.text(tokenMessage).style("white-space", "pre-wrap");');
app = replaceOnce(app,'liForToken.node().innerHTML += "<br>";','liForToken.node().appendChild(document.createTextNode("\\n"));');
app = replaceOnce(app,'searchEntryNode.node().innerHTML = croppedText;','searchEntryNode.text(croppedText);');
for (const field of ['title','iri','version','author','description']) {
  // Replace metadata sinks, preserving the normal/editor update entry points.
  app = app.replaceAll('innerHTML = generalMetaObj.'+field, 'textContent = generalMetaObj.'+field);
}
app = replaceOnce(app,'d3.select("#title").node().value = languageTools.textInLanguage(generalMetaObj.title, preferredLanguage);','d3.select("#title").text(languageTools.textInLanguage(generalMetaObj.title, preferredLanguage));');
app = replaceOnce(app,'d3.select("#description").node().innerHTML = languageTools.textInLanguage(generalMetaObj.description, preferredLanguage);','d3.select("#description").text(languageTools.textInLanguage(generalMetaObj.description, preferredLanguage));');
app = replaceOnce(app,'d3.select("#about").node().href = generalMetaObj.iri;','d3.select("#about").attr("href", webvowl.safeExternalUrl(generalMetaObj.iri)).attr("rel", "noopener noreferrer");');
app = replaceOnce(app,'.attr("href", ontologyInfo.iri).attr("target", "_blank")','.attr("href", webvowl.safeExternalUrl(ontologyInfo.iri)).attr("target", "_blank").attr("rel", "noopener noreferrer")');
app = replaceOnce(app,'.attr("href", iri)\n\t        .attr("title", iri)', '.attr("href", webvowl.safeExternalUrl(iri))\n        .attr("rel", "noopener noreferrer")\n\t        .attr("title", iri)');
// Warning dialogs can include ontology-derived values as well.
for (const variable of ['header','reason','action']) app = app.replaceAll('innerHTML = '+variable+';', 'textContent = '+variable+';');
app = replaceOnce(app,'d3.select("#" + identifier).node().innerHTML = elementDescription + element.innerHTML;','d3.select("#" + identifier).text(elementDescription + element.textContent);');
app = replaceOnce(app,'d3.select("#" + identifier).node().title = element.innerHTML;','d3.select("#" + identifier).node().title = element.textContent;');
// Reject non-HTTP JSON URLs before starting any remote loader request.
app = replaceOnce(app,'var filename = decodeURIComponent(fileName.slice("url=".length));',`var filename = decodeURIComponent(fileName.slice("url=".length));
    if (!webvowl.safeExternalUrl(filename)) {
      ontologyMenu.append_message("Invalid JSON URL: " + filename);
      loadingModule.setErrorMode();
      return;
    }`);
// Fixed loading markup is replaced at its call sites, never by parsing user HTML.
app = app.replace(/(append_(?:message|bulletPoint|message_toLastBulletPoint)\("[^"\n]*)(<br>)([^"\n]*"\))/g,(_,a,b,c)=>a+'\\n'+c);
app = app.replace(/(append_(?:message|bulletPoint|message_toLastBulletPoint)\("[^"\n]*)<span[^>]*>([^"\n]*?)<\/span>([^"\n]*"\))/g,(_,a,b,c)=>a+b+c);
fs.mkdirSync(path.join(destination,'js'),{recursive:true});
fs.writeFileSync(path.join(destination,'js/webvowl.js'),core);
fs.writeFileSync(path.join(destination,'js/webvowl.app.js'),app);
let index = fs.readFileSync(path.join(baseline,'index.html'),'utf8').replace(/\r\n/g,'\n');
index = replaceOnce(index,'<meta charset="utf-8" />',`<meta charset="utf-8" />
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; connect-src 'self' https: http: data: blob:; object-src 'none'; base-uri 'none'; form-action 'none'; frame-src 'none'" />`);
index = replaceOnce(index,'<script>\n        window.onload = webvowl.app().initialize;\n    </script>','<script src="js/webvowl.init.js"></script>');
fs.writeFileSync(path.join(destination,'index.html'),index);
fs.writeFileSync(path.join(destination,'js/webvowl.init.js'),'// Static viewer initialization; no inline script is required.\nwindow.onload = webvowl.app().initialize;\n');
console.log('Hardened viewer bundles generated from verified baseline.');
