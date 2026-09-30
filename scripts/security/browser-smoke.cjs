const fs = require('node:fs');
const path = require('node:path');
const {pathToFileURL} = require('node:url');
const {chromium} = require('playwright');
(async () => {
  const [source, json, output] = process.argv.slice(2);
  const browser = await chromium.launch({channel:'msedge', headless:true});
  const page = await browser.newPage({viewport:{width:1400,height:1000}});
  const errors = [], requests = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('request', r => requests.push(r.url()));
  await page.route(/^https?:/, route => route.abort());
  // Test unchanged static assets with the generated JSON. Fulfil local file XHR
  // in the test harness because browsers restrict file:// XHR by default.
  await page.route('**/data/*.json', route => {
    if (route.request().url().endsWith('/ontology.json')) return route.fulfill({contentType:'application/json',body:fs.readFileSync(json,'utf8')});
    const file = path.join(source,'data',path.basename(route.request().url()));
    return fs.existsSync(file) ? route.fulfill({contentType:'application/json',body:fs.readFileSync(file,'utf8')}) : route.abort();
  });
  await page.goto(pathToFileURL(path.resolve(source,'index.html')).href + '#ontology');
  await page.waitForFunction(() => document.querySelectorAll('svg .node').length >= 3, {timeout:20000});
  await page.waitForTimeout(2000);
  const result = await page.evaluate(() => ({nodes:document.querySelectorAll('svg .node').length,labels:document.querySelectorAll('svg .label').length,text:[...document.querySelectorAll('svg')].map(s => s.textContent).join('\n')}));
  result.errors=errors; result.networkRequests=requests.filter(u=>/^https?:/.test(u)); result.browser=browser.version();
  fs.writeFileSync(output+'.json', JSON.stringify(result,null,2));
  await page.screenshot({path:output+'.png',fullPage:true});
  await browser.close();
  console.log(JSON.stringify(result));
  if(errors.length || !result.text.includes('Person') || !result.text.includes('External')) process.exit(1);
  if(process.env.REQUIRE_OFFLINE === '1' && result.networkRequests.length) process.exit(1);
})().catch(e => {console.error(e);process.exit(1)});
