import fs from 'node:fs';
import {randomUUID} from 'node:crypto';

const [inventoryPath, output] = process.argv.slice(2);
if (!inventoryPath || !output) throw new Error('Usage: node java-sbom.mjs PACKAGED_INVENTORY OUTPUT');
const inventory = JSON.parse(fs.readFileSync(inventoryPath, 'utf8'));
const components = inventory.map(({group, artifact, version}) => ({
  type:'library', group, name:artifact, version,
  'bom-ref':`pkg:maven/${group}/${artifact}@${version}`,
  purl:`pkg:maven/${group}/${artifact}@${version}`
}));
fs.writeFileSync(output, JSON.stringify({
  bomFormat:'CycloneDX', specVersion:'1.5', serialNumber:`urn:uuid:${randomUUID()}`,
  version:1, metadata:{timestamp:new Date().toISOString()}, components
}, null, 2));
console.log(`Recorded ${components.length} packaged Java coordinates`);
