import fs from 'node:fs';
const [inventoryPath,output]=process.argv.slice(2);
const inventory=JSON.parse(fs.readFileSync(inventoryPath,'utf8'));
const response=await fetch('https://api.osv.dev/v1/querybatch',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({queries:inventory.map(({name,version})=>({package:{ecosystem:'npm',name},version}))})});
if(!response.ok) throw new Error('OSV query failed: '+response.status);
const batch=await response.json();
const ids=[...new Set(batch.results.flatMap(row=>(row.vulns||[]).map(v=>v.id)))];
const details=await Promise.all(ids.map(async id=>{
  const r=await fetch('https://api.osv.dev/v1/vulns/'+id);
  if(!r.ok) throw new Error('OSV advisory failed: '+id);
  return r.json();
}));
const counts={CRITICAL:0,HIGH:0,MODERATE:0,LOW:0,UNKNOWN:0};
for(const advisory of details) counts[Object.hasOwn(counts,advisory.database_specific?.severity)?advisory.database_specific.severity:'UNKNOWN']++;
fs.writeFileSync(output,JSON.stringify({queriedAt:new Date().toISOString(),source:'https://api.osv.dev',inventory:inventory.map((row,i)=>({...row,vulnerabilities:batch.results[i].vulns||[]})),counts,details},null,2));
console.log(JSON.stringify({components:inventory.length,advisories:ids.length,...counts}));
if(counts.HIGH || counts.CRITICAL || counts.UNKNOWN) process.exitCode=1;
