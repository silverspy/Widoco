const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const {pathToFileURL} = require('node:url');
const {chromium} = require('playwright');
(async () => {
  const [assets,fixture,output] = process.argv.slice(2);
  const browser = await chromium.launch({channel:process.env.PLAYWRIGHT_CHANNEL,headless:true});
  const page = await browser.newPage();
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.route(/^https?:/,r=>r.abort());
  await page.route('**/data/ontology.json',r=>r.fulfill({contentType:'application/json',body:fs.readFileSync(fixture,'utf8')}));
  await page.route('**/js/webvowl.js',r=>r.fulfill({contentType:'application/javascript',body:fs.readFileSync(path.join(assets,'js/webvowl.js'),'utf8').replace('return __webpack_require__(0);','window.__nativeRequire=__webpack_require__; return __webpack_require__(0);')}));
  await page.goto(pathToFileURL(path.resolve(assets,'index.html')).href+'#ontology');
  await page.waitForFunction(()=>document.querySelectorAll('svg .node').length>=3);
  const result = await page.evaluate(()=>{
    const utils=window.__nativeRequire(58);
    const original=JSON.parse('{"__proto__":{"nativePolluted":true},"nodes":[1],"properties":[2]}');
    const copy=utils.clone(original);
    const array=[1,2];
    const modes=[{type:'same',range:[1]},{type:'gradient',range:[2]}];
    const a={},b={};
    function pin(domain,range) {
      let count=0;
      const property=Object.assign(Object.create(window.__nativeRequire(42).prototype),{domain:()=>({links:()=>domain}),range:()=>({links:()=>range}),inverse:()=>null,pinned:()=>false,drawPin:()=>count++});
      const tool=window.__nativeRequire(83)();
      tool.enabled(true);
      d3.event={defaultPrevented:false};
      tool.handle(property,true);
      d3.event=null;
      return count;
    }
    const blocked=['javascript:alert(1)','data:text/html,test','file:///tmp/test','https:\\evil.test','\nJaVaScRiPt:alert(1)',null,{}];
    return {cloneIsShallow:copy!==original && copy.nodes===original.nodes,
      clonePrototypeSafe:Object.getPrototypeOf(copy)===Object.prototype && !({}).nativePolluted && Object.hasOwn(copy,'__proto__'),
      arrayCopied:utils.clone(array)!==array && utils.clone(array).join(',')==='1,2',
      gradientLookup:utils.find(modes,{type:'gradient'})===modes[1],
      singleLinkNotPinned:pin([a],[a])===0,parallelLinksPinned:pin([a,b],[a,b])===1,duplicatesDeduplicated:pin([a,a],[a])===0,
      unsafeSchemesBlocked:blocked.every(url=>webvowl.safeExternalUrl(url)===null),
      httpsLinkPreserved:webvowl.safeExternalUrl('https://example.org/test')==='https://example.org/test',
      obsoleteModulesAbsent:Array.from({length:231},(_,i)=>i+84).every(id=>window.__nativeRequire.m[id]===undefined),
      nodes:document.querySelectorAll('svg .node').length};
  });
  for(const [name,value] of Object.entries(result)) if(name!=='nodes') assert.equal(value,true,name);
  result.exports=[];
  for(const id of ['exportJson','exportSvg']) {
    const downloadReady=page.waitForEvent('download');
    await page.locator('#'+id).evaluate(link=>link.click());
    const download=await downloadReady;
    const filename=await download.path();
    const contents=fs.readFileSync(filename,'utf8');
    if(id==='exportJson') assert(JSON.parse(contents).class.length>0,'JSON export lost classes');
    else assert(contents.includes('<svg') && contents.includes('Person'),'SVG export lost graph');
    result.exports.push({id,name:download.suggestedFilename(),bytes:contents.length});
  }
  assert.deepEqual(errors,[],'Browser exceptions');
  fs.writeFileSync(output,JSON.stringify({browser:browser.version(),...result,errors},null,2));
  console.log(JSON.stringify(result));
  await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
