import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const [assets, baseline, output] = process.argv.slice(2);
const rows = ['d3.min.js','webvowl.js','webvowl.app.js'].map(name=>{
  const current=fs.readFileSync(path.join(assets,'js',name));
  const original=fs.readFileSync(path.join(baseline,'js',name));
  return {name,bytes:current.length,sha256:crypto.createHash('sha256').update(current).digest('hex'),identicalToBaseline:current.equals(original)};
});
const source=fs.readFileSync(path.join(assets,'js/webvowl.js'),'utf8');
const d3=fs.readFileSync(path.join(assets,'js/d3.min.js'),'utf8');
const result={webvowl:source.match(/webvowl.version = "([0-9.]+)"/)?.[1],lodashCore:source.match(/var VERSION = '([0-9.]+)'/)?.[1],d3:d3.match(/version:"([0-9.]+)"/)?.[1],files:rows};
fs.writeFileSync(output,JSON.stringify(result,null,2));
console.log(JSON.stringify(result));
