const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const {chromium}=require('playwright');
(async()=>{
  const [html,output]=process.argv.slice(2);
  const browser=await chromium.launch({channel:process.env.PLAYWRIGHT_CHANNEL||'msedge',headless:true});
  const page=await browser.newPage();
  await page.route(/^https?:/,r=>r.abort());
  await page.goto(pathToFileURL(path.resolve(html)).href);
  await page.waitForTimeout(600);
  const result=await page.evaluate(()=>{
    let metadata=null;
    try {metadata=JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent)}catch(e){}
    return {executed:window.__metadataMarker,images:document.querySelectorAll('img[src=x]').length,
      executableLinks:document.querySelectorAll('a[href^="javascript:"]').length,jsonLdParsed:!!metadata,
      metadataName:metadata?.name,titleText:document.querySelector('h1')?.textContent};
  });
  result.browser=browser.version();
  fs.writeFileSync(output,JSON.stringify(result,null,2));console.log(JSON.stringify(result));
  if(process.argv.includes('--assert-safe')) {
    assert.equal(result.executed,0);assert.equal(result.images,0);assert.equal(result.executableLinks,0);assert.equal(result.jsonLdParsed,true);
    assert.equal(result.metadataName,result.titleText,'Metadata was discarded or changed');
  }
  await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
