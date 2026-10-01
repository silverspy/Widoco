const fs = require('node:fs');
const path = require('node:path');
const {pathToFileURL} = require('node:url');
const {chromium} = require('playwright');
(async () => {
  const [assets, fixtures, output] = process.argv.slice(2);
  const browser = await chromium.launch({channel:process.env.PLAYWRIGHT_CHANNEL, headless:true});
  const results = [];
  for (const kind of ['exact','min','max']) {
    for (const injected of [false,true]) {
      const json = JSON.parse(fs.readFileSync(path.join(fixtures,`object-${kind}-zero.json`),'utf8'));
      const field = kind === 'exact' ? 'cardinality' : `${kind}Cardinality`;
      if (injected) json.propertyAttribute.find(p=>p.iri.endsWith('#property'))[field] = '0';
      const page = await browser.newPage();
      await page.route(/^https?:/,r=>r.abort());
      await page.route('**/data/ontology.json',r=>r.fulfill({contentType:'application/json',body:JSON.stringify(json)}));
      await page.goto(pathToFileURL(path.resolve(assets,'index.html')).href+'#ontology');
      await page.waitForFunction(()=>document.querySelectorAll('svg .node').length>0);
      await page.waitForTimeout(400);
      const text = await page.locator('svg text.cardinality').allTextContents();
      results.push({kind,injectedZeroField:injected,cardinalityText:text});
      await page.close();
    }
  }
  fs.writeFileSync(output,JSON.stringify({browser:browser.version(),results},null,2));
  console.log(JSON.stringify(results));
  await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
