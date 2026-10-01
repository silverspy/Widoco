const fs = require('node:fs');
const path = require('node:path');
const {pathToFileURL} = require('node:url');
const {chromium} = require('playwright');
const assert = require('node:assert/strict');
(async () => {
  const [assets, fixture, output] = process.argv.slice(2);
  const base = JSON.parse(fs.readFileSync(fixture,'utf8'));
  const assertSafe = process.argv.includes('--assert-safe');
  const disableCsp = process.argv.includes('--disable-csp');
  const browser = await chromium.launch({channel:process.env.PLAYWRIGHT_CHANNEL,headless:true});
  const results = [];
  for (const scenario of ['input-unmodified','metadata-view','metadata-editor','search-label','hash-url','unsafe-link','prototype-input','bundled-prototype-api']) {
    const json = structuredClone(base);
    const payload = '<img src=x onerror="window.__auditExecuted=1">';
    if (scenario.startsWith('metadata')) {
      json.header.title={en:payload}; json.header.description={en:payload}; json.header.version=payload; json.header.author=payload;
    }
    if (scenario==='search-label') json.classAttribute[0].label={'IRI-based':'<svg onload=a=2>'};
    if (scenario==='unsafe-link') json.header.iri='javascript:window.__auditExecuted=3';
    if (scenario==='prototype-input') json.header=JSON.parse('{"__proto__":{"auditPolluted":true},"constructor":{"prototype":{"auditPolluted":true}},"iri":"https://example.org/main"}');
    const page = await browser.newPage();
    const errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.addInitScript(()=>{window.__auditExecuted=0;window.a=0});
    await page.route(/^https?:/,r=>r.abort());
    await page.route('**/data/ontology.json',r=>r.fulfill({contentType:'application/json',body:JSON.stringify(json)}));
    if(disableCsp) await page.route('**/index.html',r=>r.fulfill({contentType:'text/html',body:fs.readFileSync(path.join(assets,'index.html'),'utf8').replace(/<meta http-equiv="Content-Security-Policy"[^>]*>/,'')}));
    if(scenario==='bundled-prototype-api') await page.route('**/js/webvowl.js',r=> {
      const source=fs.readFileSync(path.join(assets,'js/webvowl.js'),'utf8');
      const marker='return __webpack_require__(0);';
      if(!source.includes(marker)) throw new Error('Webpack instrumentation point missing');
      return r.fulfill({contentType:'application/javascript',body:source.replace(marker,'globalThis.__auditWebpackRequire=__webpack_require__; '+marker)});
    });
    const hash=scenario==='hash-url' ? '#url='+encodeURIComponent('<img src=x onerror=window.__auditExecuted=4>') : '#ontology';
    await page.goto(pathToFileURL(path.resolve(assets,'index.html')).href+hash);
    if(scenario==='hash-url' && assertSafe) await page.waitForFunction(()=>document.querySelector('#bulletPoint_container')?.textContent.includes('Invalid JSON URL'),null,{timeout:5000});
    else if(scenario==='hash-url') await page.waitForFunction(()=>window.__auditExecuted===4,null,{timeout:5000});
    else await page.waitForFunction(()=>document.querySelectorAll('svg .node').length>0,null,{timeout:15000});
    await page.waitForTimeout(300);
    const before = await page.evaluate(()=>window.__auditExecuted);
    if(scenario==='metadata-editor') {
      // Use the shipped hash option to enter editor mode through normal UI initialization.
      await page.goto(pathToFileURL(path.resolve(assets,'index.html')).href+'#opts=editorMode=true;#ontology');
      await page.waitForTimeout(1000);
    }
    if(scenario==='search-label') await page.locator('#search-input-text').fill('svg');
    if(scenario==='bundled-prototype-api') {
      const present = await page.evaluate(()=>typeof window.__auditWebpackRequire.m[312]==='function');
      if(assertSafe) assert.equal(present,false,'Vulnerable Lodash module is still present');
      else await page.evaluate(()=>window.__auditWebpackRequire(312)(['__proto__.auditPolluted'],[true]));
    }
    await page.waitForTimeout(400);
    const after = await page.evaluate(()=>({executed:window.__auditExecuted||window.a,prototypePolluted:({}).auditPolluted===true,aboutHref:document.querySelector('#about')?.getAttribute('href'),injectedElements:document.querySelectorAll('img[src="x"],svg[onload]').length}));
    results.push({scenario,before,...after,errors});
    if(assertSafe) {
      assert.equal(before,0,scenario+': execution during load');
      assert.equal(after.executed,0,scenario+': script execution');
      assert.equal(after.prototypePolluted,false,scenario+': prototype pollution');
      assert.equal(after.injectedElements,0,scenario+': HTML injection');
      assert.deepEqual(errors,[],scenario+': browser errors');
      if(scenario==='unsafe-link') assert.equal(after.aboutHref,null,'Executable link survives');
      if(scenario.startsWith('metadata')) assert((await page.locator('#version').textContent()).includes('<img'),'Metadata was dropped instead of rendered as text');
      if(scenario==='search-label') assert((await page.locator('#m_search').textContent()).includes('<svg'),'Search label was lost');
    }
    await page.close();
  }
  fs.writeFileSync(output,JSON.stringify({browser:browser.version(),assertSafe,disableCsp,results},null,2));
  console.log(JSON.stringify(results));
  await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
