const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const {pathToFileURL,fileURLToPath}=require('node:url');
const {chromium}=require('playwright');
(async()=>{
  const [folder,output]=process.argv.slice(2);
  const browser=await chromium.launch({channel:process.env.PLAYWRIGHT_CHANNEL,headless:true});
  const page=await browser.newPage();
  const errors=[],network=[],activeNetwork=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('request',r=>{if(/^https?:/.test(r.url())){network.push(r.url());if(r.resourceType()!=='image')activeNetwork.push(r.url())}});
  await page.route(/^https?:/,r=>r.abort());
  // Fulfil local-file section XHR; no HTTP service is required by the artifact.
  await page.route('**/sections/**',r=>{
    const file=fileURLToPath(new URL(r.request().url()));
    return r.fulfill({contentType:'text/html',body:fs.readFileSync(file,'utf8')});
  });
  await page.goto(pathToFileURL(path.resolve(folder,'index-en.html')).href);
  await page.waitForFunction(()=>typeof loadHash==='function' && document.querySelectorAll('#toc a').length>0);
  const result=await page.evaluate(async()=>{
    window.__docAuditExecuted=0;
    const host=document.createElement('div');host.id='security-regression';document.body.appendChild(host);
    const markdown=document.createElement('div');markdown.className='markdown';
    markdown.textContent='**Preserved Markdown**\n\n<img src=x onerror="window.__docAuditExecuted=1">\n\n[bad](javascript:window.__docAuditExecuted=2)\n\n```mermaid\ngraph TD; A[Person]-->B[Target]\n```';
    host.appendChild(markdown);
    const heading=document.createElement('h2');heading.className='list';heading.id='audit-heading';
    heading.textContent='<img src=x onerror="window.__docAuditExecuted=3">';host.appendChild(heading);
    history.replaceState(null,'','#'+encodeURIComponent('<img src=x onerror=window.__docAuditExecuted=4>'));
    loadHash();
    const started=performance.now();
    marked.parse('\t\v\n');
    return {jquery:jQuery.fn.jquery,dompurify:DOMPurify.version,
      markedWhitespaceCompleted:performance.now()-started<1000,
      strongText:host.querySelector('strong')?.textContent,
      dangerousAttributes:host.querySelectorAll('[onerror],[onload],a[href^="javascript:"]').length,
      tocInjectedElements:document.querySelectorAll('#toc img[src=x]').length};
  });
  await page.waitForFunction(()=>document.querySelector('#security-regression svg')!==null,null,{timeout:15000});
  result.mermaidRendered=await page.locator('#security-regression svg').count()>0;
  result.executed=await page.evaluate(()=>window.__docAuditExecuted);
  result.errors=errors;result.networkRequests=network;result.externalActiveRequests=activeNetwork;result.browser=browser.version();
  assert.equal(result.jquery,'3.7.1');assert.equal(result.dompurify,'3.4.16');
  assert.equal(result.markedWhitespaceCompleted,true);assert.equal(result.strongText,'Preserved Markdown');
  assert.equal(result.dangerousAttributes,0);assert.equal(result.tocInjectedElements,0);assert.equal(result.executed,0);
  assert.deepEqual(errors,[]);assert.deepEqual(activeNetwork,[],'External executable/content dependency');
  fs.writeFileSync(output,JSON.stringify(result,null,2));console.log(JSON.stringify(result));
  await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
