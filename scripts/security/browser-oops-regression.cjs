const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const {pathToFileURL} = require('node:url');
const {chromium} = require('playwright');

(async () => {
  const [html, assets, output] = process.argv.slice(2);
  const browser = await chromium.launch({channel:'msedge', headless:true});
  try {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.route(/^https?:/, r => r.abort());
    await page.route('**/evaluation/**', r => {
      const name = path.basename(new URL(r.request().url()).pathname);
      if (!name.endsWith('.js')) return r.fulfill({body:''});
      return r.fulfill({contentType:'application/javascript', body:fs.readFileSync(path.resolve(assets,'oops/js',name))});
    });
    await page.goto(pathToFileURL(path.resolve(html)).href);
    await page.waitForFunction(() => typeof jQuery === 'function' && document.querySelector('#tablesorter-demo').config);
    assert.equal(await page.evaluate(() => jQuery.fn.jquery), '3.7.1');
    await page.locator('#tablesorter-demo th').click();
    await page.waitForFunction(() => document.querySelector('#tablesorter-demo tbody tr td').textContent === 'Alpha');
    await page.evaluate(() => jQuery('#audit-panel').collapse('show'));
    await page.waitForFunction(() => document.querySelector('#audit-panel').classList.contains('in'));
    await page.evaluate(() => jQuery('#audit-panel').collapse('hide'));
    await page.waitForFunction(() => !document.querySelector('#audit-panel').classList.contains('in') && !document.querySelector('#audit-panel').classList.contains('collapsing'));
    assert.deepEqual(errors, []);
    const result = {jquery:'3.7.1', tableSorted:true, panelOpenedAndClosed:true, errors, browser:browser.version()};
    fs.writeFileSync(output, JSON.stringify(result,null,2));
    console.log(JSON.stringify(result));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
