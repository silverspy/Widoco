import fs from 'node:fs';
import assert from 'node:assert/strict';
const [oldPath,newPath,output] = process.argv.slice(2);
const before = JSON.parse(fs.readFileSync(oldPath,'utf8'));
const after = JSON.parse(fs.readFileSync(newPath,'utf8'));
// VOWL attribute/type arrays describe sets; their serialization order varies.
for (const rows of [before,after]) {
  for (const row of rows) {
    row.propertyTypes.sort();
    for (const property of row.propertyAttributes) property.attributes?.sort();
  }
}
assert.deepEqual(after,before,'Converter feature summaries differ');
const result = {cases:before.length,identicalAfterSetNormalization:true,scenarios:before.map(row=>row.scenario)};
fs.writeFileSync(output,JSON.stringify(result,null,2));
console.log(JSON.stringify(result));
